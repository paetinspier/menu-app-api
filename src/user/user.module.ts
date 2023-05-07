import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [DatabaseModule]
})
export class UserModule {}
