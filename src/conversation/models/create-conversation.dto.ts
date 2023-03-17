import { IsNotEmpty } from 'class-validator';
import { ConversationMember } from 'src/conversation-member/models/conversation-member.entity';

export class CreateConversationDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    menuUrl: string;
  
    @IsNotEmpty()
    members: string[];
}