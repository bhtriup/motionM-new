import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { chatProviders } from './chat.provider';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [...chatProviders, ChatService, JwtService, ChatGateway],
})
export class ChatModule {}
