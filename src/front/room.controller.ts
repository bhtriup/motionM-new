import { Controller, Get, Render } from '@nestjs/common';

@Controller('front/room')
export class RoomController {
  @Get('/list')
  @Render('pages/chatlist/chatlist')
  chatRoomList() {
    // 채팅방 목록
  }

  @Get('/')
  @Render('pages/chatroom/chatroom')
  chatRoom() {
    // 채팅방화면
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
