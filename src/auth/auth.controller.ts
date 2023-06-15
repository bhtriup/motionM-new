import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserRO } from '../user/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

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

    // 토큰 발급
    const token = await this.generateJWT(_user);

    const { ykiho, userId, userNm } = _user;
    const user = { ykiho, userId, userNm, token };

    return { user };
  }

  private async generateJWT(user: UserEntity) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const payload = {
      ykiho: user.ykiho,
      id: user.userId,
      name: user.userNm,
      exp: exp.getTime() / 1000,
    };

    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  }
}
