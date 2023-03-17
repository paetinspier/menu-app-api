import { ConversationMember } from 'src/conversation-member/models/conversation-member.entity';
import { Conversation } from 'src/conversation/models/conversation.entity';
import { Message } from 'src/message/models/message.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  uid: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ConversationMember, (conversationMember: ConversationMember) => conversationMember.user)
  conversationMembers: ConversationMember[];

  @OneToMany(() => Message, (message: Message) => message.user)
  messages: Message[];
}