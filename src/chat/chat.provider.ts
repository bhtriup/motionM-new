import { DataSource } from 'typeorm';
import { ChatEntity } from './entity/chat.entity';

export const chatProviders = [
  {
    provide: 'CHAT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChatEntity),
    inject: ['DATA_SOURCE'],
  },
];
