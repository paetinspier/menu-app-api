import { Controller, Get, Post, Param, ParseIntPipe, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './models/message.model';


@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService){}

    @Get('id/:id')
    getMessageById(@Param('id', ParseIntPipe) id: number) {
        return this.messageService.findMessageById(id);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createMessage(@Body() createMessageDto: MessageDto){
        return this.messageService.createMessage(createMessageDto)
    }
}
