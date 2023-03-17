import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './models/create-conversation.dto';
import { AddConversationMemberDto } from './models/add-conversation-member.dto';
import { CreateMessageDto } from './models/create-message.dto';
import { ConversationMember } from 'src/conversation-member/models/conversation-member.entity';
import { Conversation } from './models/conversation.entity';
import { Message } from 'src/message/models/message.entity';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  // Create a conversation
  @Post('create')
  async createConversation(
    @Body() createConvoDto: CreateConversationDto,
    userUid: string,
  ): Promise<any> {
    return this.conversationService.createConversation(createConvoDto, userUid);
  }
  // Add a user to a conversation
  @Post('/:id/addMember')
  async addConversationMember(
    @Param('id') id: number,
    @Body() addMemberDto: AddConversationMemberDto,
  ): Promise<any> {
    return await this.conversationService.addMemeber(id, addMemberDto.userUid);
  }
  // Remove a user from a conversation
  @Delete('/:id/members/:userId')
  removeConversationMember(
    @Param('id') id: number,
    @Param('userId') userId: string,
  ): Promise<any> {
    return this.conversationService.removeConversationMember(id, userId);
  }

  // Retrieve all the conversations for a user
  @Get('/users/:uid/conversations')
  getConversationsForUser(@Param('uid') uid: string): Promise<Conversation[]> {
    return this.conversationService.getConversationsForUser(uid);
  }
  // Retrieve a list of members for a conversation
  @Get('/:id/members')
  getConversationMembers(
    @Param('id') id: number,
  ): Promise<ConversationMember[]> {
    return this.conversationService.getConversationMembers(id);
  }

  // Retrieve all the messages for a conversation
  @Get('/:id/messages')
  getConversationMessages(@Param('id') id: number): Promise<Message[]> {
    return this.conversationService.getConversationMessages(id);
  }
  // Send a message to a conversation
  @Post('/conversations/:id/messages')
  sendMessage(
    @Param('id') id: number,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<any> {
    return this.conversationService.sendMessage(id, createMessageDto);
  }
}
