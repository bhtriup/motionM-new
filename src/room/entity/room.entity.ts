import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CHAT_ROOM')
export class RoomEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'CHAT_NAME' })
  chatNm: string;

  @Column({ name: 'USER_COUNT' })
  userCount: number;
}
