import { DataSource } from 'typeorm';
import { Connection } from 'mysql2';
import * as config from 'config';
import { UserEntity } from '../user/entity/user.entity';
import { RoomEntity } from '../room/entity/room.entity';
import { RoomUserEntity } from '../room/entity/room.user.entity';
import { DB_TYPE } from '../common/constant/constant';
const mysql = require('mysql2/promise');

export default class DataSourceManager {
  private static instance: DataSourceManager;

  private dataSources: { [key: string]: DataSource };

  private constructor() {
    this.dataSources = {};
  }

  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager();
    }

    return DataSourceManager.instance;
  }

  async getDBDataSource(ykiho: string, type: string): Promise<DataSource> {
    const key = this.getKey(ykiho, type);

    if (this.dataSources[key]) {
      const dataSource = this.dataSources[key];
      return Promise.resolve(
        dataSource.isInitialized ? dataSource : dataSource.initialize(),
      );
    }

    const masterDB = config.get('master-db');
    const logging = config.get('logging');

    const masterConn: Connection = await mysql.createConnection({
      host: masterDB.host,
      user: masterDB.username,
      password: masterDB.password,
      database: masterDB.database,
      port: masterDB.port,
    });

    const [rows]: any = await masterConn.execute(
      `SELECT IP, ID, PASSWORD, NAME, PORT FROM MASTER_DB.DB_INFO where ykiho = ? and item = ? `,
      [ykiho, type],
    );
    masterConn.end();

    const dbInfo = rows[0];

    let entities = [];
    if (DB_TYPE.user == type) entities = [UserEntity];
    else entities = [RoomEntity, RoomUserEntity];

    const newDataSource = new DataSource({
      type: 'mysql',
      host: dbInfo.IP,
      port: 3306,
      username: dbInfo.ID,
      password: dbInfo.PASSWORD,
      database: dbInfo.NAME,
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: entities,
      logging: logging,
      synchronize: false, // 이거 건들지 마세요. 큰일남
    });

    this.dataSources[key] = newDataSource;

    return Promise.resolve(newDataSource.initialize());
  }

  private getKey(ykiho: string, type: string) {
    return ykiho + '-' + type;
  }
}
