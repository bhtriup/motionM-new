import { Controller, Get, Render } from '@nestjs/common';

@Controller('front/chat')
export class ChatController {
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
