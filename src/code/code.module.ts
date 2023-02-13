import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeDetailEntity } from './code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CodeDetailEntity])],
})
export class CodeModule {}
