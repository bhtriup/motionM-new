import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatReadEntity } from './entity/chat.read.entity';

@Injectable()
export class ChatReadService {
  constructor(
    @Inject('CHAT_READ_REPOSITORY')
    private readonly chatReadRepository: Repository<ChatReadEntity>,
  ) {}

  async getMsgReadUser(roomIdx: number, userId: string) {
    const readIds = await this.chatReadRepository
      .createQueryBuilder('read')
      .innerJoinAndSelect('read.chat', 'chat')
      .where('read.roomIdx = :roomIdx', { roomIdx })
      .andWhere('chat.userId <> :userId', { userId })
      .andWhere('(read.readIds NOT LIKE "%:userId%" OR read.readIds IS NULL)', {
        userId,
      })
      .getMany();

    return readIds;
  }

  async insertMsgRead(chatRead: ChatReadEntity) {
    return await this.chatReadRepository.insert(chatRead);
  }

  async setRead(read: ChatReadEntity) {
    await this.chatReadRepository.save(read);
  }
}
