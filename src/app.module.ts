import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {typeOrmConfig} from "./configs/typeorm.config";
import { UsersModule } from './users/users.module';
import { OrganizationModule } from './organization/organization.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    OrganizationModule,
    FriendsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
