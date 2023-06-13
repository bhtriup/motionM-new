import { Scope } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { REQUEST } from '@nestjs/core';

export const databaseProviders = [
  {
    // 이 부분에서 provide에 CONNECTION이라는 값이 들어가게 됩니다.
    provide: 'DATA_SOURCE',
    scope: Scope.REQUEST,
    inject: [REQUEST, DatabaseService],
    useFactory: (request, databaseService: DatabaseService) => {
      const ykiho = request.ykiho;
      const type = request.type;

      if (ykiho) {
        return databaseService.getDBDataSource(ykiho, type);
      }
      return null;
    },
  },
];
