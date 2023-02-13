import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * TODO: 다시해야함
   */
  async getFriendList(): Promise<User[]> {
    const qb = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.idx', 'user.userId', 'user.userNm'])
      .orderBy('user.USER_NM', 'ASC');

    const list = await qb.getMany();

    return list;
  }
}
