import { IsString, IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  conversationId: number;

  @IsNotEmpty()
  senderId: number;
}