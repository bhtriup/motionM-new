import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  charset: dbConfig.charset,
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // entities: [path.join(__dirname, './entity/**/*.entity.{js,ts}')],
  autoLoadEntities: true,
  synchronize: false, // 서비스가 실행되고 데이터베이스가 연결될 때 항상 데이터베이스가 초기화 됨
  logging: false, // 쿼리로그
};
