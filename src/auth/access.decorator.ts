import { SetMetadata } from '@nestjs/common';
import { EnumPermission, EnumRoles } from '../enums/access';

export const PERMISSION_KEY = 'permissions';
export const Permission = (...permissions: EnumPermission[]) =>
  SetMetadata(PERMISSION_KEY, permissions);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EnumRoles[]) => SetMetadata(ROLES_KEY, roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
