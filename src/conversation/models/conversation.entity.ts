import { ConversationMember } from 'src/conversation-member/models/conversation-member.entity';
import { Message } from 'src/message/models/message.entity';
import { User } from 'src/user/models/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany  } from 'typeorm'

@Entity()
export class Conversation{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    menu_url: string;

    @Column({ name: 'created_at', type: 'timestamp with time zone'})
    createdAt: Date;

    @OneToMany(() => ConversationMember, (member) => member.conversation)
  members: ConversationMember[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}