import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 회원 정보 얻기
   * @param userId
   */
  @Get('/:userId')
  async getUser(@Param('userId') userId): Promise<UserEntity> {
    const userInfo = await this.userService.getUser(userId);

    return userInfo;
  }
}
