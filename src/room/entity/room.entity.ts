import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoomUserEntity } from './room.user.entity';

@Entity('CHAT_ROOM', { name: 'rooms' })
export class RoomEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'CHAT_NAME' })
  chatNm: string;

  @Column({ name: 'USER_COUNT' })
  userCount: number;

  @Column({ name: 'UNREAD' })
  unreadCount: number;

  @Column({ name: 'LAST_MSG' })
  lastMsg: string;

  @Column({ name: 'LAST_MSG_TIME' })
  lastMsgTime: string;

  @ManyToOne(() => RoomUserEntity)
  // @JoinColumn([{ name: 'ROOM_IDX', referencedColumnName: 'IDX' }])
  users: RoomUserEntity[];
}
