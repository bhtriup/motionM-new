import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { roomProviders } from './room.provider';
import { JwtService } from '@nestjs/jwt';
import { chatProviders } from '../chat/chat.provider';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [],
  controllers: [RoomController],
  providers: [
    ...roomProviders,
    RoomService,
    ...chatProviders,
    ChatService,
    JwtService,
  ],
})
export class RoomModule {}
