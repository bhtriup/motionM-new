import { DataSource } from 'typeorm';
import { RoomEntity } from './entity/room.entity';

export const roomProviders = [
  {
    provide: 'ROOM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoomEntity),
    inject: ['DATA_SOURCE'],
  },
];
