import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { mInfo } from '../common/constant/constant';
const crypto = require('crypto');

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(UserEntity, 'USER_REPOSITORY')
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { userId, userPw } = loginUserDto;
    const { ykiho, type } = mInfo;

    const user = await this.userRepository.findOne({
      where: {
        ykiho,
        userId,
      },
    });

    if (!user) {
      return null;
    }

    const hashPwd = crypto.createHash('sha256').update(userPw).digest('hex');
    if (hashPwd == user.userPw) {
      return user;
    }

    return null;
  }
}
