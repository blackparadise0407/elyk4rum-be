import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configurations from './shared/configurations';
import { HttpLoggerMiddleware } from './shared/middlewares/http-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public static port: number;
  public static isDev: boolean;

  constructor(private config: ConfigService) {
    AppModule.port = this.config.get<number>('port');
    AppModule.isDev = process.env.NODE_ENV === 'development';
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
