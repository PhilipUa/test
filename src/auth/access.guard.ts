import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessService } from './access.service';
import { EnumPermission, EnumRoles } from '../enums/access';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessService: AccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<EnumRoles[]>('roles', context.getClass());
    const permissions = this.reflector.get<EnumPermission[]>(
      'permissions',
      context.getHandler(),
    );
    let can = false;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    can = await this.accessService.checkAccess(user, roles, permissions);
    return can;
  }
}
