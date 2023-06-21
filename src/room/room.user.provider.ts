import { DataSource } from 'typeorm';
import { RoomUserEntity } from './entity/room.user.entity';

export const roomUserProviders = [
  {
    provide: 'ROOM_USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoomUserEntity),
    inject: ['DATA_SOURCE'],
  },
];
