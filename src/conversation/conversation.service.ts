import { Injectable } from '@nestjs/common';
import { ConversationRepository } from './models/conversation.repository';
import { Conversation } from './models/conversation';
import { ConversationEntity } from './models/conversation.entity';
import { ApiResponse } from 'src/models/api_response';
import { UserService } from 'src/user/user.service';
import { ConversationMemberService } from 'src/conversation-member/conversation-member.service';
import { ConversationMember } from 'src/conversation-member/models/conversation-member';

@Injectable()
export class ConversationService {
  constructor(
    private readonly repo: ConversationRepository,
    private readonly userService: UserService,
    private readonly cmService: ConversationMemberService,
  ) {}

  public async createConversation(
    conversation: Conversation,
    userEmails: string[],
  ): Promise<ConversationEntity> {
    try {
      // create conversation
      const result = await this.repo.insertConversation(
        ConversationEntity.fromConversation(conversation),
      );

      // get conversation users by email and store them
      userEmails.forEach(async (email) => {
        const user = await this.userService.getUserByEmail(email);
        const newMember = new ConversationMember();

        newMember.conversation_id = result.id;
        newMember.user_id = user.id;

        await this.cmService.createConvoMember(newMember);
      });

      return result
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationById(
    conversationId: number,
  ): Promise<ConversationEntity> {
    try {
      const result = await this.repo.getConversationById(conversationId);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationsByIdList(
    conversationIds: number[],
  ): Promise<ConversationEntity[]> {
    try {
      const result = await this.repo.getConversationsByIdList(conversationIds);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getConversationsByUserId(userId: number): Promise<ConversationEntity[]>{
	try {
        const convoMembers = await this.cmService.getConversationMembersByUserId(userId);

		const convos: ConversationEntity[] = [];
		convoMembers.forEach(async (member) => {
			const convo = await this.getConversationById(member.conversation_id);
			convos.push(convo);
		})

		return convos
    } catch (error) {
        console.log(error);
    }
  }

  public async getConversationsByUserUid(userUid: string): Promise<ConversationEntity[]>{
	try {
		const user = await this.userService.getUserByUid(userUid);
        const convoMembers = await this.cmService.getConversationMembersByUserId(user.id);

		const convos: ConversationEntity[] = [];
		convoMembers.forEach(async (member) => {
			const convo = await this.getConversationById(member.conversation_id);
			convos.push(convo);
		})

		return convos
    } catch (error) {
        console.log(error);
    }
  }

  public async deleteConversationById(
    conversationId: number,
  ): Promise<ApiResponse> {
    try {
      const result = await this.repo.deleteConversation(conversationId);

      return ApiResponse.success();
    } catch (error) {
      console.log(error);
    }
  }
}
