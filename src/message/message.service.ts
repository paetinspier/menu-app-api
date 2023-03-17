import { Injectable } from '@nestjs/common';
import { Message } from './models/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from './models/message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  createMessage(createMessageDto: MessageDto){
    const newMessage = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(newMessage);
  }

  findMessageById(id: number) {
    return this.messageRepository.findOneBy({ id: id });
  }

}
