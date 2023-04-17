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
    @Body() createConvoDto: CreateConversationDto
  ): Promise<any> {
    return this.conversationService.createConversation(createConvoDto);
  }

  // Retrieve all the conversations for a user
  @Get('/users/:uid')
  getConversationsForUser(@Param('uid') uid: string): Promise<Conversation[]> {
    return this.conversationService.getConversationsForUser(uid);
  }

  // Retrieve all the messages for a conversation
  @Get('/:id/messages')
  getConversationMessages(@Param('id') id: number): Promise<Message[]> {
    return this.conversationService.getConversationMessages(id);
  }
  // Send a message to a conversation
  @Post('sendMessage')
  sendMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<any> {
    return this.conversationService.sendMessage(createMessageDto);
  }
}
