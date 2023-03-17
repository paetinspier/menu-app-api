import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import entities from 'src';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/models/user.entity';
import { ConversationController } from './conversation/conversation.controller';
import { ConversationService } from './conversation/conversation.service';
import { ConversationModule } from './conversation/conversation.module';
import { ConversationMemberController } from './conversation-member/conversation-member.controller';
import { ConversationMemberService } from './conversation-member/conversation-member.service';
import { ConversationMemberModule } from './conversation-member/conversation-member.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
    ConversationModule,
    ConversationMemberModule
  ],
  controllers: [AppController, UserController, ConversationController, ConversationMemberController],
  providers: [AppService, UserService, ConversationService, ConversationMemberService],
})
export class AppModule {}
