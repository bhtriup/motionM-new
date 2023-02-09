import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as config from 'config';
import * as expressLayouts from 'express-ejs-layouts';
import {NestExpressApplication} from "@nestjs/platform-express";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // app.use(expressLayouts);
  // app.set('layout', 'layouts/layout');

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
