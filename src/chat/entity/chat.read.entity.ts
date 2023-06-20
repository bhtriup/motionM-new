import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ChatEntity } from './chat.entity';

@Entity('MSG_READ', { name: 'read' })
export class ChatReadEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'ROOM_IDX' })
  roomIdx: number;

  @Column({ name: 'MSG_IDX' })
  msgIdx: number;

  @Column({ name: 'READ_HISTORY' })
  readIds: string;

  @OneToOne(() => ChatEntity, (chat) => chat.read)
  @JoinColumn([{ name: 'MSG_IDX' }])
  chat: ChatEntity;
}
