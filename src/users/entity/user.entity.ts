import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Entity('USER_INFO')
// @Entity('user')
export class User {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'USER_ID' })
  userId: string;

  @Column({ name: 'USER_NM' })
  userNm: string;

  @Column({ name: 'USER_PW' })
  userPw: string;

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
