import { Inject, Injectable } from '@nestjs/common';
import { RoomEntity } from './entity/room.entity';
import { Repository } from 'typeorm';

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
}
