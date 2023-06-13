import {Controller, Get, Post, Render, UseGuards} from '@nestjs/common';
import {RoomService} from './room.service';
import {AuthGuard} from '@nestjs/passport';
import {RoomEntity} from './entity/room.entity';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('/exist')
  @UseGuards(AuthGuard('jwt'))
  async checkRoomInfo(): Promise<RoomEntity[]> {
    const roomList = this.roomService.getRoomList();

    return roomList;
  }

  @Get('/read')
  @Render('pages/chatroom/readmember')
  chatRead() {
    // 채팅방 읽음 멤버
  }

  @Get('/setting')
  @Render('pages/chatroom/chatinfoset')
  getSetting() {
    // 채팅방 정보 설정
  }
}
