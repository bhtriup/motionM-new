import { Scope } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { REQUEST } from '@nestjs/core';

export const databaseProviders = [
  {
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
