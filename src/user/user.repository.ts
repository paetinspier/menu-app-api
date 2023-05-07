import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from './models/user.entity';
import { User } from './models/user';

export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async insertUser(entity: UserEntity): Promise<number> {
    try {
      const result = await this.databaseService.knex
        .query(UserEntity)
        .insertItemWithReturning(entity, ['id']);

      if (result) {
        return result.id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserById(userId: number): Promise<UserEntity> {
    try {
      const result = await this.databaseService.knex
        .query(UserEntity)
        .where('id', userId)
        .getSingleOrNull();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUsersByIdList(userIds: number[]): Promise<UserEntity[]> {
    try {
      const result = await this.databaseService.knex
        .query(UserEntity)
        .whereIn('id', userIds)
        .getMany();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserByUid(userUid: string): Promise<UserEntity> {
    try {
      const result = await this.databaseService.knex
        .query(UserEntity)
        .where('uid', userUid)
        .getSingleOrNull();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUsersByUidList(usersUids: string[]): Promise<UserEntity[]> {
    try {
      const result = await this.databaseService.knex
        .query(UserEntity)
        .whereIn('uid', usersUids)
        .getMany();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const result = await this.databaseService.knex
        .query(UserEntity)
        .where('email', email)
        .getSingleOrNull();

      return result;
    } catch (err) {
      console.error(err);
    }
  }

  public async getUserByName(name: string): Promise<UserEntity[]> {
    try {
      const result = await this.databaseService.knex
        .query(UserEntity)
        .where('name', 'ilike', `%${name}%`)
        .where('isActive', true)
        .getMany();

      return result;
    } catch (err) {
      console.error(err);
    }
  }

  public async updateUserProfile(user: User, userId: number): Promise<void> {
    try {
      const result = await this.databaseService.knex
        .query(UserEntity)
        .where('id', userId)
        .updateItem({
          name: user.name,
          email: user.email,
          isActive: user.isActive,
        });

    } catch (error) {
      console.log(error);
    }
  }

  public async updateUserEmail(userId: number, email: string): Promise<void> {
    try {
      await this.databaseService.knex
        .query(UserEntity)
        .where('id', userId)
        .updateItem({
          email: email,
        });
    } catch (err) {
      console.error(err);
    }
  }

  public async activateUser(userId: number): Promise<void> {
    try {
      await this.databaseService.knex
        .query(UserEntity)
        .where('id', userId)
        .updateItem({ isActive: true });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    try {
      await this.databaseService.knex
        .query(UserEntity)
        .where('id', userId)
        .updateItem({ isActive: false });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
