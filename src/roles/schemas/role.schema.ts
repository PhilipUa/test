import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EnumPermission } from '../../enums/access';

export type RoleDocument = Role & Document;

@Schema({ timestamps: {}, autoIndex: false })
export class Role {
  @Prop({ required: true, unique: true, dropDups: true })
  name: string;

  @Prop({ required: true })
  permissions: EnumPermission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
