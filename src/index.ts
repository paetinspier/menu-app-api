
import { ConversationMember } from "./conversation-member/models/conversation-member.entity";
import { Conversation } from "./conversation/models/conversation.entity";
import { Message } from "./message/models/message.entity";
import { User } from "./user/models/user.entity";

const entities = [Message, User, Conversation, ConversationMember];

export { Message }
export default entities;