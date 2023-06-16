import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { roomProviders } from './room.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  // imports: [TypeOrmModule.forFeature([RoomUserEntity, RoomEntity])],
  controllers: [RoomController],
  providers: [...roomProviders, RoomService, JwtService],
})
export class RoomModule {}
