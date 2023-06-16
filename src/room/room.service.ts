import { Inject, Injectable } from '@nestjs/common';
import { RoomEntity } from './entity/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOM_REPOSITORY')
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async getRoomList(): Promise<RoomEntity[]> {
    const myRoomList = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'roomUsers')
      .getMany();

    return myRoomList;
  }
}
