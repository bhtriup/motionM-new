import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { LoginController } from './login.controller';

@Module({
  imports: [],
  controllers: [LoginController, FriendController],
})
export class FrontModule {}
