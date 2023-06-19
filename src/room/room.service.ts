import { Inject, Injectable } from '@nestjs/common';
import { RoomEntity } from './entity/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOM_REPOSITORY')
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async getRoomList(id: string): Promise<RoomEntity[]> {
    const myRoomList = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'roomUsers')
      .where('roomUsers.userId = :id', { id })
      .getMany();

    return myRoomList;
  }
}
