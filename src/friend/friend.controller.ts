import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../user/entity/user.entity';
import { User } from '../user/user.decorator';

@Controller('friend')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Get('/')
  @Render('pages/index')
  index() {}

  @Get('/list')
  @UseGuards(AuthGuard('jwt'))
  async getFriendList(@User() user: UserEntity): Promise<UserEntity[]> {
    const userIdx = user.idx;
    return await this.friendService.getFriendList(userIdx);
  }

  @Get('/profile')
  @Render('pages/profileview/profileview')
  viewProfile() {}

  @Get('/profile/image')
  @Render('pages/profileview/profileimgview')
  viewProfileImage() {}
}
