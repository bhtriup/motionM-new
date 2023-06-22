import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ChatService } from './chat.service';
import { User } from '../user/user.decorator';
import { getOffset } from '../common/constant/function';
import { ChatEntity } from './entity/chat.entity';
import { ChatReadService } from './chat.read.service';
import { ChatReadEntity } from './entity/chat.read.entity';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  private readonly limit = 20;

  constructor(
    private chatService: ChatService,
    private chatReadService: ChatReadService,
  ) {}

  @Get('/list')
  async getChatList(
    @User() user,
    @Query('roomIdx') roomIdx: number,
    @Query('page') page: number,
  ): Promise<ChatEntity[]> {
    const offset = getOffset(page, this.limit);

    const chatList = await this.chatService.getChatList(
      roomIdx,
      offset,
      this.limit,
    );

    return chatList;
  }

  @Post('/read-all/:roomIdx')
  async readMsg(@User() user, @Param('roomIdx') roomIdx: number) {
    const { ykiho, id } = user;
    const chatIdArr = [];

    const readIds = await this.chatReadService.getMsgReadUser(roomIdx, id);

    if (readIds.length <= 0) return chatIdArr;

    for (const readId of readIds) {
      const read = new ChatReadEntity();
      read.idx = readId.idx;
      read.roomIdx = readId.roomIdx;
      read.msgIdx = readId.msgIdx;

      if (!readId.readIds) {
        // 읽음처리
        read.readIds = id;
        await this.chatReadService.setRead(read);

        await this.chatService.updateReadCount(read.msgIdx, 1);
        chatIdArr.push({ msgIdx: read.msgIdx, count: 1 });
        continue;
      }

      const readIdArr = readId.readIds.split(',');
      if (!readIdArr.includes(id)) {
        // 읽음처리
        readIdArr.push(id);
        read.readIds = readIdArr.join(',');

        await this.chatReadService.setRead(read);

        await this.chatService.updateReadCount(read.msgIdx, readIdArr.length);

        chatIdArr.push({ msgIdx: read.msgIdx, count: readIdArr.length });
      }
    }

    return chatIdArr;
  }
}
