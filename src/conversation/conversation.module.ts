import { Module } from '@nestjs/common';
import { Conversation } from './models/conversation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { UserService } from 'src/user/user.service';
import { MessageService } from 'src/message/message.service';
import { ConversationMemberService } from 'src/conversation-member/conversation-member.service';
import { ConversationMember } from 'src/conversation-member/models/conversation-member.entity';
import { Message } from 'src/message/models/message.entity';
import { User } from 'src/user/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, ConversationMember, Message, User])],
  exports: [TypeOrmModule],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
