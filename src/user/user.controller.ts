import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './user.decorator';
import { converProfileImage } from '../common/constant/function';

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

    // 이미지 변환
    if (userInfo.profile)
      userInfo.profile = converProfileImage(userInfo.profile);

    return userInfo;
  }

  @Get('/list')
  async getUserList(@User() user): Promise<UserEntity[]> {
    const { ykiho, id } = user;

    // 직원 목록
    const userList = await this.userService.getUserList(ykiho, id);

    userList.forEach(function (item) {
      if (item.profile) item.profile = converProfileImage(item.profile);
      else item.profile = '';
    });

    return userList;
  }

  @Get('/in-room')
  async getUserListInRoom(
    @User() user,
    @Query('userIds') userIds: string,
  ): Promise<UserEntity[]> {
    const { ykiho, id } = user;
    const userIdsArr = userIds.split(',');

    // 직원 목록
    const userList = await this.userService.getUserListInRoom(
      ykiho,
      id,
      userIdsArr,
    );

    userList.forEach(function (item) {
      if (item.profile) item.profile = converProfileImage(item.profile);
      else item.profile = '';
    });

    return userList;
  }
}
