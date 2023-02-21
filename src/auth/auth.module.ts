import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CognitoVerify } from './jwt-verify';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    RolesModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AccessService, JwtStrategy, CognitoVerify],
  exports: [AccessService, JwtStrategy],
})
export class AuthModule {}
