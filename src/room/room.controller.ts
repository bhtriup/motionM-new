import { Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from '@nestjs/passport';
import { RoomEntity } from './entity/room.entity';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('/exist')
  @UseGuards(AuthGuard('jwt'))
  async checkRoomInfo(): Promise<RoomEntity[]> {
    const roomList = this.roomService.getRoomList();

    return roomList;
  }
}
