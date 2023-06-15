import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 로그인 회원 정보
   */
  async getUser(ykiho: string, userId: string): Promise<UserEntity> {
    const userInfo = await this.userRepository.findOne({
      where: {
        ykiho,
        userId,
      },
    });

    return userInfo;
  }

  async getUserList(ykiho: string, userId: string): Promise<UserEntity[]> {
    const userList = await this.userRepository.find({
      where: {
        ykiho,
        useYn: 1,
        userId: Not(userId),
      },
    });

    return userList;
  }
}
