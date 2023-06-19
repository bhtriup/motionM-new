import { AfterLoad, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoomUserEntity } from './room.user.entity';

@Entity('CHAT_ROOM', { name: 'rooms' })
export class RoomEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'CHAT_NAME' })
  chatNm: string;

  @Column({ name: 'USER_COUNT' })
  userCount: number;

  @Column({ name: 'LAST_MSG' })
  lastMsg: string;

  @Column({ name: 'LAST_MSG_TIME' })
  lastMsgTime: string;

  unreadCount: number;

  @OneToMany((type) => RoomUserEntity, (roomUser) => roomUser.room)
  users!: RoomUserEntity[];

  @AfterLoad()
  updateCounters() {
    if (this.unreadCount === undefined) this.unreadCount = 0;
  }
}
