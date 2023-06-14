import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    // const { ykiho } = mInfo;
    // const { id } = payload;
    //
    // const user: UserEntity = await this.userRepository.findOne({
    //   where: {
    //     ykiho,
    //     userId: id,
    //   },
    // });
    //
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    //
    // delete user.userPw;
    //
    // return user;

    return payload;
  }
}
