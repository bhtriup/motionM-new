import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
