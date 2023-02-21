import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CognitoVerify } from './jwt-verify';
import { passportJwtSecret } from 'jwks-rsa';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly cognitoVerify: CognitoVerify,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env['AWS_COGNITO_ISSUER']}/.well-known/jwks.json`,
      }),
      passReqToCallback: true,
      issuer: process.env['AWS_COGNITO_ISSUER'],
      algoritms: ['RS256'],
    });
  }

  public async validate(
    request: any,
    payload: any,
    done: (err: Error | null, result: UserDocument | null) => void,
  ) {
    const token = request.headers['authorization'].substring(
      7,
      request.headers['authorization'].length,
    );
    const userInfo = await this.cognitoVerify.handler({ token });
    if (!userInfo) {
      return done(new UnauthorizedException(), null);
    }
    return userInfo;
  }
}
