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
    const list = await this.userRepository.find({
      select: {
        idx: true,
        userId: true,
        userNm: true,
      },
      relations: ['team', 'part', 'position'],
      where: {
        idx: Not(Equal(userIdx)),
      },
      order: {
        userNm: 'ASC',
        idx: 'ASC',
      },
    });

    return list;
  }
}
