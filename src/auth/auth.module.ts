import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { JwtStrategy } from '../user/jwt.strategy';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserService } from '../user/user.service';
import { userProviders } from '../user/user.provider';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    ...userProviders,
    JwtStrategy,
    LocalStrategy,
    AuthService,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
