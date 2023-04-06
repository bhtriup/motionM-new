import { Controller, Get, Render } from '@nestjs/common';

@Controller('setting')
export class SettingController {
  @Get('')
  @Render('pages/setting/setting')
  getSetting() {
    // 채팅방 읽음 멤버
  }
}
