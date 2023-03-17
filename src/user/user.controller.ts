import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserModel } from './models/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getAllUsers(): Promise<User[]>{
        return await this.userService.findAll();
    }

    @Get(':id')
    async getOneUser(@Param() params): Promise<User>{
        return await this.userService.findOne(params)
    }

    @Post('create')
    async createUser(@Body() userDto: UserModel){
        return await this.userService.createUser(userDto);
    }

    @Delete('remove/:id')
    async removeUser(@Param() params){
        return await this.userService.remove(params);
    }
}
