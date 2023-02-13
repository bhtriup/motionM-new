import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import * as config from 'config';
import { JwtStrategy } from '../user/jwt.strategy';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtConfig.secret,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, LocalStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
