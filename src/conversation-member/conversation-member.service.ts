import { Injectable } from '@nestjs/common';
import { ConversationMemberRepository } from './models/conversation-member.repository';
import { ConversationMember } from './models/conversation-member';
import { ConversationMemberEntity } from './models/conversation-member.entity';

@Injectable()
export class ConversationMemberService {
  constructor(private readonly repo: ConversationMemberRepository) {}

  public async createConvoMember(
    conversationMember: ConversationMember,
  ): Promise<any> {
    try {
      const result = await this.repo.insert(
        ConversationMemberEntity.fromConversationMember(conversationMember),
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationMembers(
    conversaationId: number,
  ): Promise<ConversationMemberEntity[]> {
    try {
      const result = await this.repo.getConversationMembersByConversationId(
        conversaationId,
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationMembersByUserId(
    userId: number,
  ): Promise<ConversationMemberEntity[]> {
    try {
      const result = await this.repo.getConversationMembersByUserId(userId);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
