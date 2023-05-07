import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Conversation } from './models/conversation';
import { ConversationEntity } from './models/conversation.entity';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('create')
  public async createConversation(
    @Body() body: { conversation: Conversation; emails: string[] },
  ): Promise<ConversationEntity> {
    try {
      const convo = await this.conversationService.createConversation(
        body.conversation,
        body.emails,
      );

      return convo;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('userId/:id')
  public async getUsersConversationsById(@Param() params): Promise<ConversationEntity[]> {
    try {
        const convos = await this.conversationService.getConversationsByUserId(params.id);

        return convos;
    } catch (error) {
        console.log(error);
    }
  }

  @Get('userId/:uid')
  public async getUsersConversationsByUid(@Param() params): Promise<ConversationEntity[]> {
    try {
        const convos = await this.conversationService.getConversationsByUserUid(params.uid);

        return convos;
    } catch (error) {
        console.log(error);
    }
  }
}
