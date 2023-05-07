import { ConversationMemberEntity } from "./conversation-member.entity";


export class ConversationMember {
    id?: number;
    conversation_id: number;
    user_id: number;

    static fromEntity(enitity: ConversationMemberEntity): ConversationMember {
        let convoMember = new ConversationMember();

        convoMember.conversation_id = enitity.conversation_id;
        convoMember.id = enitity.id;
        convoMember.user_id = enitity.user_id;

        return convoMember;
    }
}