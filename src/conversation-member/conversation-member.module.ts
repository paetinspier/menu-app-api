import { Module } from '@nestjs/common';
import { ConversationMemberController } from './conversation-member.controller';
import { ConversationMemberService } from './conversation-member.service';
import { ConversationMemberRepository } from './models/conversation-member.repository';

@Module({
    controllers: [ConversationMemberController],
    providers: [ConversationMemberService, ConversationMemberRepository],
    exports: [ConversationMemberService]
})
export class ConversationMemberModule {}
