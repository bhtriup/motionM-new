import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomEntity } from './entity/room.entity';
import { User } from '../user/user.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('room')
@UseGuards(AuthGuard)
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('/list')
  async getRoomList(@User() user): Promise<RoomEntity[]> {
    const { ykiho, id } = user;

    // 로그인 정보
    const roomList = await this.roomService.getRoomList(id);

    return roomList;
  }

  @Post('/exist')
  async checkRoomInfo(): Promise<RoomEntity[]> {
    // const roomList = this.roomService.getRoomList();
    //
    // return roomList;
    return [];
  }
}
