import { Inject, Injectable } from '@nestjs/common';
import { RoomEntity } from './entity/room.entity';
import { Repository } from 'typeorm';
import { getNow } from '../common/constant/function';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOM_REPOSITORY')
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async getRoomList(userId: string): Promise<RoomEntity[]> {
    const myRoomList = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'roomUsers')
      .where('roomUsers.userId = :userId', { userId })
      .getMany();

    return myRoomList;
  }

  async isMyRoom(roomIdx: string, id: string): Promise<Boolean> {
    const myRoom = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'roomUsers')
      .where('roomUsers.userId = :id', { id })
      .andWhere('roomUsers.roomIdx = :roomIdx', { roomIdx })
      .getCount();

    if (myRoom <= 0) return false;

    return true;
  }

  async getRoomInfo(roomIdx: string, id: string): Promise<RoomEntity> {
    const roomInfo = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'roomUsers')
      .andWhere('roomUsers.roomIdx = :roomIdx', { roomIdx })
      .getOne();

    return roomInfo;
  }

  async updateLastMsg(idx: number, msg: string) {
    const room: RoomEntity = await this.roomRepository.findOne({
      where: {
        idx,
      },
    });

    room.lastMsg = msg;
    room.lastMsgTime = getNow();

    await this.roomRepository.save(room);
  }
}
