import { Column, Table } from '@wwwouter/typed-knex';
import { Conversation } from './conversation';

@Table('conversation')
export class ConversationEntity {
  @Column({ primary: true })
  id: number;
  @Column()
  title: string;
  @Column()
  menu_url: string;
  @Column()
  created_at: string;

  static fromConversation(convo: Conversation): ConversationEntity {
    let entity = new ConversationEntity();
    entity.created_at = convo.created_at;
    entity.menu_url = convo.menu_url;
    entity.title = convo.title;

    return entity;
  }
}
