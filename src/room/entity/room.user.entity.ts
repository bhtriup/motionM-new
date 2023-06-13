import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoomEntity } from './room.entity';

@Entity('ROOM_USER', { name: 'roomUsers' })
export class RoomUserEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'ROOM_IDX' })
  roomIdx: number;

  @Column({ name: 'USER_IDX' })
  userIdx: number;

  @ManyToOne(() => RoomEntity)
  @JoinColumn([{ name: 'ROOM_IDX', referencedColumnName: 'idx' }])
  roomEntity: RoomEntity;
}
