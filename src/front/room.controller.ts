import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller('front/room')
export class RoomController {
  @Get('/list')
  @Render('pages/chat/chatList')
  chatRoomList() {
    // 채팅방 목록
  }

  @Get('/:roomIdx')
  @Render('pages/chat/chatRoom')
  chatRoom(@Param('roomIdx') roomIdx: string) {
    // 채팅방화면
    return {
      roomIdx,
    };
  }

  @Get('/read')
  @Render('pages/chat/readMember')
  chatRead() {
    // 채팅방 읽음 멤버
  }
}
