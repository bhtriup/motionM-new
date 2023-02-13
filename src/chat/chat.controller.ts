import { Controller, Get, Render } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('')
  @Render('pages/chatroom/chatroom')
  chatRoom() {
    // 채팅방화면
  }
}
