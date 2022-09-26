import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getConfig() {
    return {
      clientId: this.config.get<string>('auth0.clientId'),
      domain: this.config.get<string>('auth0.domain'),
      audience: this.config.get<string>('auth0.audience'),
    };
  }
}
