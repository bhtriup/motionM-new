import { Controller, Get, Render } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/room-list')
  @Render('pages/chatlist/chatlist')
  chatRoomList() {
    // 채팅방 목록
  }

  @Get('/room')
  @Render('pages/chatroom/chatroom')
  chatRoom() {
    // 채팅방화면
  }

  @Get('/info')
  @Render('pages/chatroom/chatinfo')
  chatInfo() {
    // 채팅방 정보
  }

  @Get('/edit')
  @Render('pages/chatroom/chatedit')
  chatEdit() {
    // 채팅방 편집
  }

  @Get('/new')
  @Render('pages/chatroom/newchat')
  chatNew() {
    // 채팅방 만들기
  }

  @Get('/search')
  @Render('pages/chatroom/chatdatesearch')
  chatDateSearch() {
    // 채팅방날짜이동
  }
}
