import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');

  app.use(compression());

  app.enableCors({
    origin: (origin, cb) => {
      if (AppModule.isDev) {
        cb(null, '*');
        return;
      }
      const allowedOrigins = (process.env.CORS_ORIGINS || '').split(' ');
      if (allowedOrigins.indexOf(origin) > -1) {
        cb(null, origin);
      } else {
        cb(new Error('Origin not allowed'));
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  const GLOBAL_PREFIX = '/api';
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Elyk4ruM APIs')
    .setDescription('The Elyk4ruM API description')
    .setVersion('1.0')
    .addTag('elyk4rum')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(AppModule.port);
  logger.log('Server started on ' + (await app.getUrl()));
}
bootstrap();
