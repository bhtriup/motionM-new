import { DataSource } from 'typeorm';
import DataSourceManager from './database.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  async getDBDataSource(ykiho: string, type: string): Promise<DataSource> {
    return DataSourceManager.getInstance().getDBDataSource(ykiho, type);
  }
}
