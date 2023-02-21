import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDocument } from './schemas/role.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { EnumPermission } from '../enums/access';

@Injectable()
export class RolesService {
  constructor(@InjectModel('roles') private roleModel: Model<RoleDocument>) {}

  public async getPermissions(
    user: UserDocument,
  ): Promise<Set<EnumPermission | []>> {
    const roles = await this.roleModel
      .find({ name: { $in: user.roles } })
      .select('permissions');
    if (!Array.isArray(roles)) return new Set([]);
    const permissions = roles
      .map((item) => item.permissions)
      .reduce((pValue, cValue) => pValue.concat(cValue), []);
    return new Set(permissions);
  }
}
