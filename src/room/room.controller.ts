import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomEntity } from './entity/room.entity';
import { User } from '../user/user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ChatService } from '../chat/chat.service';

@Controller('room')
@UseGuards(AuthGuard)
export class RoomController {
  constructor(
    private roomService: RoomService,
    private chatService: ChatService,
  ) {}

  @Get('/list')
  async getRoomList(@User() user): Promise<RoomEntity[]> {
    const { ykiho, id } = user;

    // 채팅방 목록
    const roomList = await this.roomService.getRoomList(id);

    for (const room of roomList) {
      const user = room.users[0];
      const unreadChatCount = await this.chatService.getUnreadChatCount(
        id,
        room.idx,
        user.lastEnterDt,
      );

      room.unreadCount = unreadChatCount;
    }

    return roomList;
  }

  @Get('/check/:roomIdx')
  async isMyRoom(@User() user, @Param('roomIdx') roomIdx: string) {
    // 채팅방화면
    const { ykiho, id } = user;

    const isMyRoom = await this.roomService.isMyRoom(roomIdx, id);

    return {
      isMyRoom,
    };
  }

  @Get('/:roomIdx')
  async getRoomInfo(
    @User() user,
    @Param('roomIdx') roomIdx: string,
  ): Promise<RoomEntity> {
    // 채팅방화면
    const { ykiho, id } = user;

    const roomInfo = await this.roomService.getRoomInfo(roomIdx, id);

    return roomInfo;
  }
}
