import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomUserEntity } from './entity/room.user.entity';
import { RoomEntity } from './entity/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomUserEntity, RoomEntity])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
