import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './models/conversation.entity';
import { Repository, In } from 'typeorm';
import { CreateConversationDto } from './models/create-conversation.dto';
import { User } from 'src/user/models/user.entity';
import { ConversationMember } from 'src/conversation-member/models/conversation-member.entity';
import { Message } from 'src/message/models/message.entity';
import { CreateMessageDto } from './models/create-message.dto';

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
  ) {}

  async createConversation(
    createConvoDto: CreateConversationDto,
    userUid: string,
  ): Promise<Conversation> {
    try {
      // get the admin user (user who created the conversation)
      const user = await this.usersRepository.findOne({
        where: {
          uid: userUid,
        },
      });


      const conversation = new Conversation();
      conversation.name = createConvoDto.name;
      conversation.menu_url = createConvoDto.menuUrl;
      const savedConversation = await this.conversationsRepository.save(conversation);

      const member = new ConversationMember();
      member.user = user;
  
      for(const m of createConvoDto.members){
        const member = new ConversationMember();
        member.user = await this.usersRepository.findOne({where: {uid: m}});
        member.conversation = savedConversation
        await this.conversationMembersRepository.save(member)
      }
  
      return savedConversation;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createConversationMember(
    conversation: Conversation,
    user: User,
  ): Promise<ConversationMember> {
    const member = this.conversationMembersRepository.create({
      user,
      conversation,
    });

    return this.conversationMembersRepository.save(member);
  }

  async addMemeber(
    conversation_id: number,
    userUid: string,
  ): Promise<Conversation> {
    const user = await this.usersRepository.findOne({
      where: {
        uid: userUid,
      },
    });
    const conversation = await this.conversationsRepository.findOne({
      where: {
        id: conversation_id,
      },
    });

    conversation.members = [
      await this.createConversationMember(conversation, user),
    ];

    return this.conversationsRepository.save(conversation);
  }

  async removeConversationMember(conversation_id: number, userUid: string) {
    const conversation = await this.conversationsRepository.findOne({
      where: {
        id: conversation_id,
      },
    });

    conversation.members.filter((member) => member.user.uid != userUid);

    return this.conversationsRepository.save(conversation);
  }

  async getConversationsForUser(userUid: string): Promise<Conversation[]> {
    const user = await this.usersRepository.findOne({
      where: { uid: userUid },
    });
    if(!user){
        throw new NotFoundException(`User with ID ${userUid} not found`);
    }

    const conversationMembers = user.conversationMembers;
    const conversationIds = conversationMembers.map((member) => member.conversation.id);

    return this.conversationsRepository.find({
        where: { id: In(conversationIds) },
        relations: ['members', 'members.user', 'messages', 'messages.sender'],
      });
  }

  async getConversationMembers(conversation_id: number): Promise<ConversationMember[]> {
    const conversation = await this.conversationsRepository.findOne({
        where: {
          id: conversation_id,
        },
      });

    return conversation.members;
  }

  async getConversationMessages(conversation_id: number): Promise<Message[]> {
    const conversation = await this.conversationsRepository.findOne({
        where: {
          id: conversation_id,
        },
      });

      return conversation.messages;
  }

  async sendMessage(conversation_id: number, newMessage: CreateMessageDto) {
    const conversation = await this.conversationsRepository.findOne({
        where: {
            id: conversation_id
        }
    });

    const user = await this.usersRepository.findOne({
        where: {
            uid: newMessage.senderId
        }
    })


    const message = this.messageRepository.create(newMessage)

    conversation.messages.push(message)
  }

  async createMessage(user: User, conversation: Conversation): Promise<Message>{
    const message = this.messageRepository.create({
        conversation
    });
    return message
  }
}

