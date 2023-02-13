import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * TODO: 다시해야함
   */
  async getFriendList(): Promise<UserEntity[]> {
    const list = await this.userRepository.find({
      select: {
        idx: true,
        userId: true,
        userNm: true,
      },
      relations: ['team', 'part', 'position'],
    });

    return list;
  }
}
