import { Controller, Get, Render } from '@nestjs/common';

@Controller('front/friend')
export class FriendController {
  /**
   * 로그인 화면
   */
  @Get('/')
  @Render('pages/index')
  index() {}
}
