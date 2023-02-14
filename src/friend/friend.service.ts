import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Equal, Not, Repository } from 'typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * TODO: 다시해야함 - 나를 뺀 친구 목록
   */
  async getFriendList(userIdx: number): Promise<UserEntity[]> {
    const list = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.idx',
        'user.userId',
        'user.userNm',
        'user.userStatus',
        't.codeNm',
        'pa.codeNm',
        'po.codeNm',
      ])
      .leftJoin('user.team', 't')
      .leftJoin('user.part', 'pa')
      .leftJoin('user.position', 'po')
      .where('user.idx <> :idx', { idx: userIdx })
      .orderBy({ 'user.userNm': 'ASC', 'user.idx': 'ASC' })
      .getMany();

    return list;
  }
}
