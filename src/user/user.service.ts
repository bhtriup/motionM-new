import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 로그인 회원 정보
   * @param idx
   * @param userId
   */
  async getUser(idx: number, userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      select: {
        idx: true,
        userId: true,
        userNm: true,
      },
      relations: ['team', 'part', 'position'],
      where: {
        idx,
        userId,
      },
    });

    return user;
  }

  /**
   * 로그인 회원 상태 변경
   * @param idx
   */
  async setUserOnline(idx: number, status: number): Promise<void> {
    await this.userRepository.update(idx, { userStatus: status });
  }
}
