import { DatabaseService } from 'src/database/database.service';
import { MessageEntity } from './message.entity';

export class MessageRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async insertMessage(entity: MessageEntity): Promise<any> {
    try {
      const result = await this.databaseService.knex
        .query(MessageEntity)
        .insertItemWithReturning(entity, ['id']);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationMessagesByUserId(
    userId: number,
    conversationId: number,
  ): Promise<MessageEntity[]> {
    try {
      const result = await this.databaseService.knex
        .query(MessageEntity)
        .where('sender_id', userId)
        .andWhere('conversation_id', conversationId)
        .getMany();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationMessagesById(
    conversationId: number,
  ): Promise<MessageEntity[]> {
    try {
      const result = await this.databaseService.knex
        .query(MessageEntity)
        .where('conversation_id', conversationId)
        .getMany();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteMessage(messageId: number): Promise<void> {
    try {
      const result = await this.databaseService.knex
        .query(MessageEntity)
        .where('id', messageId)
        .updateItem({
          deleted: true,
        });
    } catch (error) {
      console.log(error);
    }
  }
}
