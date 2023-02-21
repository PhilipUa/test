import { promisify } from 'util';
import * as Axios from 'axios';
import * as jsonwebtoken from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';

export interface ClaimVerifyRequest {
  readonly token?: string;
}

interface TokenHeader {
  kid: string;
  alg: string;
}
interface PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}
interface PublicKeyMeta {
  instance: PublicKey;
  pem: string;
}
interface PublicKeys {
  keys: PublicKey[];
}
interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}
interface Claim {
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  username: string;
  client_id: string;
}

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

@Injectable()
export class CognitoVerify {
  constructor(
    private usersService: UsersService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getPublicKeys() {
    let cacheKeys = await this.cacheManager.get('COGNITO_PUBLIC_KEYS');
    if (!cacheKeys) {
      const url = `${this.configService.get(
        'AWS_COGNITO_ISSUER',
      )}/.well-known/jwks.json`;
      const publicKeys = await Axios.default.get<PublicKeys>(url);
      cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
        const pem = jwkToPem(current);
        agg[current.kid] = { instance: current, pem };
        return agg;
      }, {} as MapOfKidToPublicKey);
      await this.cacheManager.set('COGNITO_PUBLIC_KEYS', cacheKeys);
      return cacheKeys;
    } else {
      return cacheKeys;
    }
  }

  async handler(request: ClaimVerifyRequest): Promise<UserDocument | null> {
    let result: UserDocument | null;
    try {
      const { token } = request;
      const tokenSections = (token || '').split('.');
      if (tokenSections.length < 2) {
        throw new Error('requested token is invalid');
      }
      const headerJSON = Buffer.from(tokenSections[0], 'base64').toString(
        'utf8',
      );
      const header = JSON.parse(headerJSON) as TokenHeader;
      const keys = await this.getPublicKeys();
      const key = keys[header.kid];
      if (key === undefined) {
        throw new Error('claim made for unknown kid');
      }
      const claim = (await verifyPromised(token, key.pem)) as Claim;
      const currentSeconds = Math.floor(new Date().valueOf() / 1000);
      if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
        throw new Error('claim is expired or invalid');
      }
      if (claim.iss !== this.configService.get('AWS_COGNITO_ISSUER')) {
        throw new Error('claim issuer is invalid');
      }
      if (claim.token_use !== 'access') {
        throw new Error('claim use is not access');
      }
      console.log(`claim confirmed for ${claim.username}`);
      result = await this.usersService.findOne({ sub: claim.username });
    } catch (error) {
      console.log('err ---', error);
      result = null;
    }
    return result;
  }
}
