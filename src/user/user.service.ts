import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(id: number): Promise<any> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createUser(userReq: UserModel): Promise<any> {
	try {
		const newUser = this.usersRepository.create(userReq);
    	return await this.usersRepository.save(newUser);
	} catch (error) {
		console.log(error);
		throw error
	}
    
  }
}
