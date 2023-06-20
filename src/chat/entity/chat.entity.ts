import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ChatReadEntity } from './chat.read.entity';

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

  @Column({ name: 'READ_COUNT' })
  readCount: number;

  @Column({ name: 'SEND_DT' })
  sendDt: string;

  @OneToOne(() => ChatReadEntity, (read) => read.chat)
  read!: ChatReadEntity;
}
