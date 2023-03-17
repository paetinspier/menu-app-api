import { Conversation } from 'src/conversation/models/conversation.entity';
import { User } from 'src/user/models/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class ConversationMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.members)
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.conversationMembers)
  user: User;
}