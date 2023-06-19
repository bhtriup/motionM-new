import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('MSG_INFO', { name: 'chat' })
export class ChatEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'ROOM_IDX' })
  roomIdx: number;

  @Column({ name: 'USER_ID' })
  userId: string;

  @Column({ name: 'MSG' })
  msg: string;

  @Column({ name: 'SEND_DT' })
  sendDt: string;
}
