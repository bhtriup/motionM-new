import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatEntity } from './entity/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject('ROOM_REPOSITORY')
    private readonly chatRepository: Repository<ChatEntity>,
  ) {}

  async getChatList(
    roomIdx: number,
    offset: number,
    limit: number,
  ): Promise<ChatEntity[]> {
    const chatList = await this.chatRepository
      .createQueryBuilder('chat')
      .where('chat.roomIdx = :roomIdx', { roomIdx })
      .take(limit) // limit
      .skip(offset) // offset
      .orderBy({ 'chat.sendDt': 'DESC' })
      .getMany();

    return chatList;
  }
}
