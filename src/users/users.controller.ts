import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Render,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRO } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('login')
  @Render('pages/login')
  logIn() {
    // 로그인화면
  }

  @Post('login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.usersService.findOne(loginUserDto);

    if (!_user) {
      const errors = { User: 'not found' };
      throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);
    }

    const token = await this.usersService.generateJWT(_user);
    const { idx, userId, userNm } = _user;
    const user = { idx, userId, userNm, token };

    return { user };
  }

  // @Get('test')
  // async test() {
  //   const id = '정은지';
  //   const name = '정은지';
  //   const password = '1234';
  //
  //   const userData: CreateUserDto = {
  //     id,
  //     name,
  //     password,
  //   };
  //
  //   return await this.usersService.create(userData);
  // }
}
