import {Controller, Get, Render} from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('login')
  @Render('pages/login')
  logIn() {

  }
}
