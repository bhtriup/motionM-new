import {Controller, Get, Render} from '@nestjs/common';
import {FriendsService} from "./friends.service";

@Controller('friends')
export class FriendsController {
  constructor(private friendService: FriendsService) {}

  @Get()
  @Render('pages/index')
  index() {

  }
}
