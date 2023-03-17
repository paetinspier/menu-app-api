import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationMember } from './models/conversation-member.entity';
import { ConversationMemberController } from './conversation-member.controller';
import { ConversationMemberService } from './conversation-member.service';

@Module({
    imports: [TypeOrmModule.forFeature([ConversationMember])],
    controllers: [ConversationMemberController],
    providers: [ConversationMemberService]
})
export class ConversationMemberModule {}
