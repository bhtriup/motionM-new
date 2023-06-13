import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { mInfo } from '../common/constant/constant';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { ykiho } = mInfo;
    const { id } = payload;

    const user: UserEntity = await this.userRepository.findOne({
      where: {
        ykiho,
        userId: id,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.userPw;

    return user;
  }
}
