import { Column, Table } from "@wwwouter/typed-knex";
import { ConversationMember } from "./conversation-member";


@Table('conversation_member')
export class ConversationMemberEntity {
    @Column({ primary: true })
    id: number;
    @Column()
    conversation_id: number;
    @Column()
    user_id: number;

    static fromConversationMember(convoMember: ConversationMember): ConversationMemberEntity{
        let entity = new ConversationMemberEntity();

        entity.conversation_id = convoMember.conversation_id;
        entity.user_id = convoMember.user_id;

        return entity;
    }
}