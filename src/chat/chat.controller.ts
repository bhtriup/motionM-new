import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ChatService } from './chat.service';
import { User } from '../user/user.decorator';
import { getOffset } from '../common/constant/function';
import { ChatEntity } from './entity/chat.entity';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  private readonly limit = 20;

  constructor(private chatService: ChatService) {}

  @Get('/list')
  async getChatList(
    @User() user,
    @Query('roomIdx') roomIdx: number,
    @Query('page') page: number,
  ): Promise<ChatEntity[]> {
    const offset = getOffset(page, this.limit);
    // 로그인 정보
    const chatList = await this.chatService.getChatList(
      roomIdx,
      offset,
      this.limit,
    );

    return chatList;
  }
}
