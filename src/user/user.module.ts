import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './user.repository';

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [DatabaseModule]
})
export class UserModule {}
