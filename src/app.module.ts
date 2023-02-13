import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { FriendModule } from './friend/friend.module';
import { AuthModule } from './auth/auth.module';
import { CodeModule } from './code/code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    OrganizationModule,
    FriendModule,
    AuthModule,
    CodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
