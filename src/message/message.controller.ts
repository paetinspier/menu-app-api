import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './models/message';
import { MessageEntity } from './models/message.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  public async createMessage(@Body() message: Message): Promise<any> {
    try {
      const res = await this.messageService.createMessage(message);

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('conversation-messages/:id')
  public async getConvoMessages(@Param() params): Promise<MessageEntity[]> {
    try {
      const res = await this.messageService.getConversationMessages(params.id);

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('users-conversation-messages/:userId/:conversationId')
  public async getUsersConvoMessages(@Param() params): Promise<MessageEntity[]> {
    try {
      const res = await this.messageService.getUserMessagesByConversation(params.userId, params.conversationId);

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('delete/:id')
  public async softDeleteMessage(@Param() params): Promise<void> {
    try{
      const res = await this.messageService.deleteMessage(params.id);
    }catch (error){
      console.log(error);
    }
  }
}
