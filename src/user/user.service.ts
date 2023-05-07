import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './models/user';
import { UserEntity } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  public async createAccount(user: User): Promise<UserEntity> {
    try {
      const result = await this.repo.insertUser(UserEntity.fromUser(user));
      const createdUser = await this.repo.getUserById(result);
      return createdUser;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserById(userId: number): Promise<UserEntity> {
    try {
        const user = await this.repo.getUserById(userId);

        return user;
    } catch (error) {
        console.log(error);
    }
  }

    public async getUserByUid(userUid: string): Promise<UserEntity> {
    try {
        const user = await this.repo.getUserByUid(userUid);

        return user;
    } catch (error) {
        console.log(error);
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.repo.getUserByEmail(email);

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
