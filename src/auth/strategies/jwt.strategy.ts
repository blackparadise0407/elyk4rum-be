import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as JwksRsa from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: JwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.get<string>('auth0.domain') + '/.well-known/jwks.json',
      }),
      audience: config.get<string>('auth0.audience'),
      issuer: config.get<string>('auth0.domain') + '/',
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
