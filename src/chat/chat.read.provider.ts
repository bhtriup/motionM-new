import { DataSource } from 'typeorm';
import { ChatReadEntity } from './entity/chat.read.entity';

export const chatReadProviders = [
  {
    provide: 'CHAT_READ_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChatReadEntity),
    inject: ['DATA_SOURCE'],
  },
];
