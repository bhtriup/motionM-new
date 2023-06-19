import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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

  @Get('/:roomIdx')
  async isMyRoom(@User() user, @Param('roomIdx') roomIdx: string) {
    // 채팅방화면
    const { ykiho, id } = user;

    const isMyRoom = await this.roomService.isMyRoom(roomIdx, id);

    return {
      isMyRoom,
    };
  }
}
