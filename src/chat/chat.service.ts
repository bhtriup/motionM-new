import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatEntity } from './entity/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHAT_REPOSITORY')
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

  async getUnreadChatCount(userId: string, roomIdx: number, date: string) {
    const qb = await this.chatRepository
      .createQueryBuilder('chat')
      .where('chat.roomIdx = :roomIdx', { roomIdx });

    if (date) qb.andWhere('chat.sendDt > :date', { date });

    const chatList = qb.getCount();

    return chatList;
  }
}
