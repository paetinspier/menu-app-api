import { MessageEntity } from "./message.entity";


export class Message{
    id?: number;
    content: string;
    conversation_id: number;
    sender_id: number;
    deleted: boolean;
    created_at: string;

    static fromEntity(entity: MessageEntity): Message{
        let message = new Message();
        message.id = entity.id;
        message.content = entity.content;
        message.sender_id = entity.sender_id;
        message.deleted = entity.deleted;
        message.created_at = entity.created_at;

        return message;
    }
}