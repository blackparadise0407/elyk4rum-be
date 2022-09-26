import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');

  const GLOBAL_PREFIX = '/api';
  app.setGlobalPrefix(GLOBAL_PREFIX);

  await app.listen(AppModule.port);
  logger.log('Server started on ' + (await app.getUrl()));
}
bootstrap();
