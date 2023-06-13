import { DataSource } from 'typeorm';
import { Connection } from 'mysql2';
import * as config from 'config';
import { UserEntity } from '../user/entity/user.entity';
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
    if (this.dataSources[ykiho]) {
      const dataSource = this.dataSources[ykiho];
      return Promise.resolve(
        dataSource.isInitialized ? dataSource : dataSource.initialize(),
      );
    }

    const masterDB = config.get('master-db');

    const masterConn: Connection = await mysql.createConnection({
      host: masterDB.host,
      user: masterDB.username,
      password: masterDB.password,
      database: masterDB.database,
      port: masterDB.port,
    });

    const [rows]: any = await masterConn.execute(
      `SELECT IP, ID, PASSWORD, NAME, PORT FROM MASTER_DB.DB_INFO where ykiho = ? and item = ? `,
      [ykiho, 0],
    );
    masterConn.end();

    const dbInfo = rows[0];

    const newDataSource = new DataSource({
      type: 'mysql',
      host: dbInfo.IP,
      port: 3306,
      username: dbInfo.ID,
      password: dbInfo.PASSWORD,
      database: dbInfo.NAME,
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [UserEntity],
      synchronize: false, // 이거 건들지 마세요
    });

    this.dataSources[ykiho] = newDataSource;

    return Promise.resolve(newDataSource.initialize());
  }
}
