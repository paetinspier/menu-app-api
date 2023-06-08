import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user';
import { UserEntity } from './models/user.entity';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}


    @Post('create')
    public async createUser(@Body() user: User): Promise<UserEntity>{
        try {
            const result = await this.userService.createAccount(user);

            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Get()
    public async getAllUsers(): Promise<User[]> {
        try {
            return await this.userService.getAllUsers();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get('/:id')
    public async getUserById(@Param() params): Promise<UserEntity>{
        try {
            if(!params.id){
                throw new BadRequestException('No id provided...');
            }

            const user = await this.userService.getUserById(params.id);
            return user;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get('/userUid/:uid')
    public async getUserByUid(@Param() params): Promise<UserEntity>{
        try {
            if(!params.uid){
                throw new BadRequestException('No uid provided...');
            }
            const user = await this.userService.getUserByUid(params.uid);
            return user
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }
}
