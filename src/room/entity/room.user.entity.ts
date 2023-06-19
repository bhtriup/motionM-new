import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { RoomEntity } from './room.entity';

@Entity('ROOM_USER', { name: 'roomUsers' })
export class RoomUserEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'ROOM_IDX' })
  roomIdx: number;

  @Column({ name: 'USER_ID' })
  userId: string;

  @ManyToOne((type) => RoomEntity, (room) => room.users)
  @JoinColumn([{ name: 'ROOM_IDX' }])
  room!: RoomEntity;
}
