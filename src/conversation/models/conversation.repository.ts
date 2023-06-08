import { DatabaseService } from '../../database/database.service';
import { ConversationEntity } from './conversation.entity';

export class ConversationRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async insertConversation(
    conversationEntity: ConversationEntity,
  ): Promise<ConversationEntity> {
    try {
      const result = await this.databaseService.knex
        .query(ConversationEntity)
        .insertItemWithReturning(conversationEntity);

      if (result.id) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationById(
    conversationId: number,
  ): Promise<ConversationEntity> {
    try {
      const result = await this.databaseService.knex
        .query(ConversationEntity)
        .where('id', conversationId)
        .getSingleOrNull();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationsByIdList(
    conversationIds: number[],
  ): Promise<ConversationEntity[]> {
    try {
      const result = await this.databaseService.knex
        .query(ConversationEntity)
        .whereIn('id', conversationIds)
        .getMany();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteConversation(conversationId: number): Promise<void> {
    try {
      const result = await this.databaseService.knex
        .query(ConversationEntity)
        .where('id', conversationId)
        .del();
    } catch (error) {
      console.log(error);
    }
  }
}
