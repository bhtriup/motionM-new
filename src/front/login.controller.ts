import { Controller, Get, Render } from '@nestjs/common';

@Controller('front')
export class LoginController {
  /**
   * 로그인 화면
   */
  @Get('/login')
  @Render('pages/login')
  logIn() {}
}
