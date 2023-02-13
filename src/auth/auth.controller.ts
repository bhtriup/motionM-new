import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Render,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserRO } from '../user/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Render('pages/login')
  logIn() {
    // 로그인화면
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.authService.findOne(loginUserDto);

    if (!_user) {
      const errors = { User: 'not found' };
      throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.generateJWT(_user);
    const { idx, userId, userNm } = _user;
    const user = { idx, userId, userNm, token };

    return { user };
  }
}
