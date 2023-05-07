import { ConversationEntity } from './conversation.entity';

export class Conversation {
  id?: number;
  title: string;
  menu_url: string;
  created_at: string;

  static fromEntity(entity: ConversationEntity): Conversation {
    let convo = new Conversation();
    convo.id = entity.id;
    convo.created_at = entity.created_at;
    convo.menu_url = entity.menu_url;
    convo.title = entity.title;

    return convo;
  }
}
