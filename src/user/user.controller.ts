import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './user.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 회원 정보 얻기
   */
  // @Get('/:userId')
  @Get('/info')
  async getUser(@User() user): Promise<UserEntity> {
    const { ykiho, id } = user;

    // 로그인 정보
    const userInfo = await this.userService.getUser(ykiho, id);

    return userInfo;
  }

  @Get('/list')
  async getUserList(@User() user): Promise<UserEntity[]> {
    const { ykiho, id } = user;

    // 직원 목록
    const userList = await this.userService.getUserList(ykiho, id);

    return userList;
  }
}
