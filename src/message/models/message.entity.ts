import { Column, Table } from "@wwwouter/typed-knex";
import { Message } from "./message";


@Table('message')
export class MessageEntity{
    @Column({ primary: true })
    id: number;
    @Column()
    content: string;
    @Column()
    conversation_id: number;
    @Column()
    sender_id: number;
    @Column()
    deleted: boolean;
    @Column()
    created_at: string;

    static fromMessage(message: Message): MessageEntity{
        let entity = new MessageEntity();
        entity.content = message.content;
        entity.conversation_id = message.conversation_id;
        entity.created_at = message.created_at;
        entity.deleted = message.deleted;
        entity.sender_id = message.sender_id;

        return entity;
    }
}