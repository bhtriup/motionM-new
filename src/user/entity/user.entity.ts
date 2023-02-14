import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CodeDetailEntity } from '../../code/code.entity';

@Entity('USER_INFO')
export class UserEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'USER_ID' })
  userId: string;

  @Column({ name: 'USER_NM' })
  userNm: string;

  @Column({ name: 'USER_PW' })
  userPw: string;

  @Column({ name: 'USER_STATUS' })
  userStatus: number;

  @ManyToOne(() => CodeDetailEntity)
  @JoinColumn({ name: 'USER_TEAM' })
  team: CodeDetailEntity;

  @ManyToOne(() => CodeDetailEntity)
  @JoinColumn({ name: 'USER_PART' })
  part: CodeDetailEntity;

  @ManyToOne(() => CodeDetailEntity)
  @JoinColumn({ name: 'USER_POSITION' })
  position: CodeDetailEntity;

  @BeforeInsert()
  async hashPassword() {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(this.userPw, salt);

      this.userPw = hashedPassword;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
