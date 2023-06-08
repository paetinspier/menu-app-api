import { Module } from '@nestjs/common';
import { ConversationMemberController } from './conversation-member.controller';
import { ConversationMemberService } from './conversation-member.service';
import { ConversationMemberRepository } from './conversation-member.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    controllers: [ConversationMemberController],
    providers: [ConversationMemberService, ConversationMemberRepository],
    exports: [ConversationMemberService],
    imports: [DatabaseModule]
})
export class ConversationMemberModule {}
