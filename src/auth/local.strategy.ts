import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'userId',
      passwordField: 'userPw',
    });
  }

  async validate(userId: string, userPw: string): Promise<any> {
    if (!userId || !userPw) {
      return false;
    }

    return { userId, userPw };
  }
}
