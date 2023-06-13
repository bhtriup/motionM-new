import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 로그인 회원 정보
   * @param idx
   * @param userId
   */
  async getUser(idx: number, userId: string): Promise<UserEntity> {
    // const user = await this.userRepository
    //   .createQueryBuilder('user')
    //   .select([
    //     'user.idx',
    //     'user.userId',
    //     'user.userNm',
    //     'user.userStatus',
    //     't.codeNm',
    //     'pa.codeNm',
    //     'po.codeNm',
    //   ])
    //   .leftJoin('user.team', 't')
    //   .leftJoin('user.part', 'pa')
    //   .leftJoin('user.position', 'po')
    //   .where('user.idx = :idx', { idx })
    //   .where('user.userId = :userId', { userId })
    //   .getOne();
    //
    // return user;

    const user = await this.userRepository.findOne({
      where: {
        ykiho: '22222222',
        userId: '정은지',
      },
    });
    return user;
  }

  /**
   * 로그인 회원 상태 변경
   * @param idx
   */
  async setUserOnline(idx: number, status: number): Promise<void> {
    // await this.userRepository.update(idx, { userStatus: status });
  }
}
