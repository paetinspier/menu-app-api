import { Injectable } from '@nestjs/common';
import { MessageRepository } from './models/message.repository';
import { Message } from './models/message';
import { MessageEntity } from './models/message.entity';

@Injectable()
export class MessageService {
  constructor(private readonly repo: MessageRepository) {}

  public async createMessage(message: Message): Promise<any> {
    try {
      const result = await this.repo.insertMessage(
        MessageEntity.fromMessage(message),
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationMessages(
    conversationId: number,
  ): Promise<MessageEntity[]> {
    try {
      const result = await this.repo.getConversationMessagesById(
        conversationId,
      );

      return result;
    } catch (error) {}
  }

  public async getUserMessagesByConversation(
    userId: number,
    conversationId: number,
  ): Promise<MessageEntity[]> {
    try {
      const result = await this.repo.getConversationMessagesByUserId(
        userId,
        conversationId,
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteMessage(messageId: number): Promise<void>{
    try {
        const result = await this.repo.deleteMessage(messageId);
    } catch (error) {
        console.log(error);
    }
  }
}
