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
import { UserService } from '../user/user.service';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * 로그인 화면
   */
  @Get('/login')
  @Render('pages/login')
  logIn() {
    // 로그인화면
  }

  /**
   * 로그인 처리
   */
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.authService.findOne(loginUserDto);

    if (!_user) {
      const errors = { User: 'not found' };
      throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);
    }

    // 로그인 상태 변경
    // await this.userService.setUserOnline(_user.idx, OnlineStatusCode.On);

    // 토큰 발급
    const token = await this.generateJWT(_user);

    const { ykiho, userId, userNm } = _user;
    const user = { ykiho, userId, userNm, token };

    return { user };
  }

  /**
   * 로그아웃 처리
   * @param user
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/logout')
  async logout(@User() user: UserEntity): Promise<void> {
    // const userIdx = user.idx;
    // await this.userService.setUserOnline(userIdx, OnlineStatusCode.OFF);
  }

  private async generateJWT(user: UserEntity) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const payload = {
      // idx: user.idx,
      id: user.userId,
      name: user.userNm,
      exp: exp.getTime() / 1000,
    };

    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  }
}
