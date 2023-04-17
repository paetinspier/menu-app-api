import { Module } from '@nestjs/common';
import { Conversation } from './models/conversation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { ConversationMember } from 'src/conversation-member/models/conversation-member.entity';
import { Message } from 'src/message/models/message.entity';
import { User } from 'src/user/models/user.entity';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, ConversationMember, Message, User]), WebsocketModule],
  exports: [TypeOrmModule, ConversationService],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
