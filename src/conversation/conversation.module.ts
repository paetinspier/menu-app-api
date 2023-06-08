import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { ConversationRepository } from './models/conversation.repository';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from 'src/user/user.module';
import { ConversationMemberModule } from 'src/conversation-member/conversation-member.module';

@Module({
  exports: [ConversationService],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
  imports: [DatabaseModule, UserModule, ConversationMemberModule]
})
export class ConversationModule {}
