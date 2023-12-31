import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoomUserEntity } from './entity/room.user.entity';
import { getNow } from '../common/constant/function';

@Injectable()
export class RoomUserService {
  constructor(
    @Inject('ROOM_USER_REPOSITORY')
    private readonly roomUserRepository: Repository<RoomUserEntity>,
  ) {}

  async saveRoomUser(roomIdx: number, userId: string) {
    const roomUser: RoomUserEntity = await this.roomUserRepository.findOne({
      where: {
        roomIdx,
        userId,
      },
    });

    roomUser.lastEnterDt = getNow();

    await this.roomUserRepository.save(roomUser);
  }
}
