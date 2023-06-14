import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { JwtStrategy } from '../user/jwt.strategy';
import { AuthService } from './auth.service';
import { userProviders } from '../user/user.provider';
import { LocalStrategy } from './local.strategy';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [...userProviders, AuthService, JwtStrategy, LocalStrategy],
  // exports: [JwtStrategy, PassportModule, AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
