import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { FriendGateway } from './friend.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [FriendController],
  providers: [FriendService, FriendGateway],
})
export class FriendModule {}
