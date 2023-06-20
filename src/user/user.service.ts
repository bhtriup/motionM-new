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
    const userInfo = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.ykiho AS ykiho',
        'user.userId AS userId',
        'user.userNm AS userNm',
        'user.profile AS profile',
        'GET_CDNAME(user.ykiho, "CD0003", user.jobCd) AS job',
      ])
      .where('user.ykiho = :ykiho', { ykiho })
      .andWhere('user.useYn = 1')
      .andWhere('user.userId = :userId', { userId })
      .orderBy('user.userNm')
      .getRawOne();

    return userInfo;
  }

  async getUserList(ykiho: string, userId: string): Promise<UserEntity[]> {
    const userList = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.ykiho AS ykiho',
        'user.userId AS userId',
        'user.userNm AS userNm',
        'user.profile AS profile',
        'GET_CDNAME(user.ykiho, "CD0003", user.jobCd) AS job',
      ])
      .where('user.ykiho = :ykiho', { ykiho })
      .andWhere('user.useYn = 1')
      .andWhere('user.userId != :userId', { userId })
      .orderBy('user.userNm')
      .getRawMany();

    return userList;
  }

  async getUserListInRoom(
    ykiho: string,
    userId: string,
    userIds: string[],
  ): Promise<UserEntity[]> {
    const userList = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.ykiho AS ykiho',
        'user.userId AS userId',
        'user.userNm AS userNm',
        'user.profile AS profile',
        'GET_CDNAME(user.ykiho, "CD0003", user.jobCd) AS job',
      ])
      .where('user.ykiho = :ykiho', { ykiho })
      .andWhere('user.useYn = 1')
      .andWhere('user.userId IN (:...userIds) ', { userIds })
      .getRawMany();

    return userList;
  }
}
