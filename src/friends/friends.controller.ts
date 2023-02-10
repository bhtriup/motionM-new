import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entity/user.entity';

@Controller('friends')
export class FriendsController {
  constructor(private friendService: FriendsService) {}
  @Get('/')
  @Render('pages/index')
  index() {
    console.log('여기다');
  }

  @Get('/list')
  @UseGuards(AuthGuard('jwt'))
  async getFriendList(): Promise<User[]> {
    return await this.friendService.getFriendList();
  }
}
