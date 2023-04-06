import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ROOM_USER')
export class RoomUserEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'ROOM_IDX' })
  roomIdx: number;

  @Column({ name: 'USER_IDX' })
  userIdx: number;
}
