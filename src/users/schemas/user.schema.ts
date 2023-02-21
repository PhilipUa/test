import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EnumUserRole, EnumUserStatus } from '../../enums/user';
import bcrypt from 'bcryptjs';

@Schema()
class NotificationPreference {
  @Prop({ default: true })
  sms: boolean;

  @Prop({ default: true })
  email: boolean;

  @Prop({ default: true })
  receiveNewsBySMS: boolean;

  @Prop({ default: true })
  receiveNewsByEmail: boolean;
}

export type UserDocument = User & Document;

@Schema({ timestamps: {}, autoIndex: false })
export class User {
  @Prop()
  sub: string;

  @Prop({ unique: [true, 'This email registered in system already!'] })
  email: string;

  @Prop({ required: true, default: EnumUserRole.PATIENT })
  roles: string[];

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    select: false,
    set: (value) => {
      const saltRounds = 11;
      const salt = bcrypt.genSaltSync(saltRounds);
      return bcrypt.hashSync(value, salt);
    },
  })
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  phone: string;

  @Prop()
  lastVisit: Date;

  @Prop({
    enum: EnumUserStatus,
    default: EnumUserStatus.ACTIVE,
  })
  status: string;

  @Prop()
  notificationPreference: NotificationPreference;

  @Prop()
  doseSpotId: string;

  @Prop({ default: true })
  chatNoticeAlert: boolean;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  logs: mongoose.Schema.Types.Mixed[];

  getPermission: Function
}

export const UserSchema = SchemaFactory.createForClass(User);
