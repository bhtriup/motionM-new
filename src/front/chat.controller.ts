import { Controller, Get, Render } from '@nestjs/common';

@Controller('front/chat')
export class ChatController {
  @Get('/info')
  @Render('pages/chat/chatInfo')
  chatInfo() {
    // 채팅방 정보
  }

  @Get('/edit')
  @Render('pages/chat/chatEdit')
  chatEdit() {
    // 채팅방 편집
  }

  @Get('/new')
  @Render('pages/chat/chatCreate')
  chatNew() {
    // 채팅방 만들기
  }

  @Get('/search')
  @Render('pages/chat/chatSearch')
  chatDateSearch() {
    // 채팅방날짜이동
  }
}
