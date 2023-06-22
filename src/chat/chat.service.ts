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

  async getChat(msgIdx: number): Promise<ChatEntity> {
    const chat = await this.chatRepository
      .createQueryBuilder('chat')
      .where('chat.idx = :msgIdx', { msgIdx })
      .getOne();

    return chat;
  }

  async getUnreadChatCount(userId: string, roomIdx: number, date: string) {
    const qb = await this.chatRepository
      .createQueryBuilder('chat')
      .where('chat.roomIdx = :roomIdx', { roomIdx });

    if (date) qb.andWhere('chat.sendDt > :date', { date });

    const chatList = qb.getCount();

    return chatList;
  }

  async updateReadCount(idx: number, readCount: number) {
    const chat: ChatEntity = await this.chatRepository.findOne({
      where: {
        idx,
      },
    });

    chat.readCount = readCount;

    await this.chatRepository.save(chat);
  }

  async insertMsg(chat: ChatEntity) {
    return await this.chatRepository.insert(chat);
  }
}
