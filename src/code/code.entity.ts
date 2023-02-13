import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CODE_DETAIL')
export class CodeDetailEntity {
  @PrimaryColumn({ name: 'IDX' })
  idx: number;

  @Column({ name: 'MST_IDX' })
  masterIdx: number;

  @Column({ name: 'BSE_CD_NM' })
  codeNm: string;
}
