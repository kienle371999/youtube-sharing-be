import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ENV } from 'src/config/environment';
import { JWTPayload } from 'src/dto/request.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: ENV.JWT.JWT_SECRET,
    } as StrategyOptions);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(payload: JWTPayload) {
    return payload;
  }
}
