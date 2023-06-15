import { Controller, Get, Render } from '@nestjs/common';

@Controller('front/friend')
export class FriendController {
  /**
   * 친구목록 화면
   */
  @Get('/')
  @Render('pages/index')
  index() {}

  @Get('/profile')
  @Render('pages/profileview/profileview')
  viewProfile() {}

  @Get('/profile/image')
  @Render('pages/profileview/profileimgview')
  viewProfileImage() {}
}
