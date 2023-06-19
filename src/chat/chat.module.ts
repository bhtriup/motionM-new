import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { chatProviders } from './chat.provider';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [...chatProviders, ChatService, JwtService],
})
export class ChatModule {}
