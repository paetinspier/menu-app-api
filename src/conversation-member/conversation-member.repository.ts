
import { DatabaseService } from 'src/database/database.service';
import { ConversationMemberEntity } from './models/conversation-member.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationMemberRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async insert(entity: ConversationMemberEntity): Promise<any> {
    try {
      const result = await this.databaseService.knex
        .query(ConversationMemberEntity)
        .insertItemWithReturning(entity, ['id']);

      if (result.id) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationMembersByConversationId(
    conversationId: number,
  ): Promise<ConversationMemberEntity[]> {
    try {
      const result = await this.databaseService.knex
        .query(ConversationMemberEntity)
        .where('conversation_id', conversationId)
        .getMany();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationMembersByUserId(
    userId: number,
  ): Promise<ConversationMemberEntity[]> {
    try {
      const result = await this.databaseService.knex
        .query(ConversationMemberEntity)
        .where('user_id', userId)
        .getMany();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
