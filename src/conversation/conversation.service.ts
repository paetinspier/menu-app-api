import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './models/conversation.entity';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './models/create-conversation.dto';
import { User } from 'src/user/models/user.entity';
import { ConversationMember } from 'src/conversation-member/models/conversation-member.entity';
import { Message } from 'src/message/models/message.entity';
import { CreateMessageDto } from './models/create-message.dto';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ConversationMember)
    private conversationMembersRepository: Repository<ConversationMember>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @Inject(forwardRef(() => WebsocketGateway))
    private websocketGateway: WebsocketGateway,
  ) {}

  async createConversation(
    createConvoDto: CreateConversationDto
  ): Promise<Conversation> {
    try {
      //create the conversation
      const conversation = new Conversation();
      //add convo name
      conversation.name = createConvoDto.name;
      //add convo menu
      conversation.menu_url = createConvoDto.menuUrl;
      //save convo
      const savedConversation = await this.conversationsRepository.save(conversation);


      // add all of the users to the member list
      for(const m of createConvoDto.members){
        const member = new ConversationMember();
        member.user = await this.usersRepository.findOne({where: {uid: m}});
        member.conversation = savedConversation
        await this.conversationMembersRepository.save(member)
      }

      this.websocketGateway.emitConversationUpdate(conversation.id);
  
      return savedConversation;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getConversationsForUser(userUid: string): Promise<Conversation[]> {
    try {
      const user = await this.usersRepository.findOne({
        where: { uid: userUid },
        relations: ['conversationMembers', 'conversationMembers.conversation'], // specify relations to prevent 'map' error
      });
  
      if (!user) {
        throw new NotFoundException(`User with ID ${userUid} not found`);
      }
  
      const conversations = user.conversationMembers.map((member) => member.conversation);
  
      return conversations;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getConversationMessages(conversation_id: number): Promise<Message[]> {
    const conversation = await this.conversationsRepository.findOne({
        where: {
          id: conversation_id,
        },
        relations: ['messages', 'messages.sender']
      });

      return conversation.messages;
  }

  async sendMessage(newMessage: CreateMessageDto) {
    try {
      const conversation = await this.conversationsRepository.findOne({
        where: {
          id: newMessage.conversationId
        }
      })
      const sender = await this.usersRepository.findOne({
        where: {
          uid: newMessage.senderId
        }
      })
      const message = new Message();
      message.content = newMessage.content;
      message.conversation = conversation;
      message.sender = sender;

      this.websocketGateway.emitConversationUpdate(conversation.id);
      
      return await this.messageRepository.save(message);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

