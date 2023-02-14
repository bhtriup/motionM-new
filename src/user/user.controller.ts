import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 회원 정보 얻기
   * @param userId
   */
  @Get('/:idx/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getUser(
    @Param('idx') idx,
    @Param('userId') userId,
  ): Promise<UserEntity> {
    const userInfo = await this.userService.getUser(idx, userId);

    return userInfo;
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
