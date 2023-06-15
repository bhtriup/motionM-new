import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { JwtService } from '@nestjs/jwt';
import { UserGateway } from './user.gateway';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...userProviders, UserService, JwtService, UserGateway],
})
export class UserModule {}
