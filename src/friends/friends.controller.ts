import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('friends')
@UseGuards(AuthGuard('jwt'))
export class FriendsController {
  constructor(private friendService: FriendsService) {}

  @Get('/')
  @Render('pages/index')
  index() {
    console.log('여기다');
  }
}
