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
}
