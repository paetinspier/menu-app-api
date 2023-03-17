import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  conversationId: number;
}