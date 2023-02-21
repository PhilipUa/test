import { Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { UserDocument } from '../users/schemas/user.schema';
import { EnumPermission, EnumRoles } from '../enums/access';

@Injectable()
export class AccessService {
  constructor(private rolesService: RolesService) {}

  private matchPermission(
    userPermission: Set<EnumPermission | []>,
    permissions: EnumPermission[],
  ): boolean {
    let isAccess = false;
    permissions.forEach((permission) => {
      if (userPermission.has(permission)) isAccess = true;
    });
    return isAccess;
  }

  public async checkAccess(
    user: UserDocument,
    roles: EnumRoles[],
    permissions: EnumPermission[],
  ): Promise<boolean> {
    const userPermissions = await this.rolesService.getPermissions(user);
    const can =
      roles.some((role) => user.roles.includes(role)) ||
      this.matchPermission(userPermissions, permissions);

    return can;
  }
}
