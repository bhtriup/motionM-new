import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { LoginController } from './login.controller';
import { ChatController } from './chat.controller';
import { RoomController } from './room.controller';

@Module({
  imports: [],
  controllers: [
    LoginController,
    FriendController,
    // ChatController,
    RoomController,
  ],
})
export class FrontModule {}
