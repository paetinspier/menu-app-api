import { IsNotEmpty } from 'class-validator';

export class AddConversationMemberDto {
  @IsNotEmpty()
  userUid: string;
}