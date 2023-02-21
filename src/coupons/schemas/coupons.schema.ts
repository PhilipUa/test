import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  EnumCouponActions,
  EnumCouponApplies,
  EnumCouponPeriodTypes,
  EnumCouponStatus,
  EnumCouponTypes,
} from '../../enums/coupon';
import { EnumSubscriptionBillingFrequency } from '../../enums/subscription';

@Schema()
export class Applies {
  @Prop({ enum: EnumCouponApplies })
  appliesObjType: string;

  @Prop()
  appliesObjId: mongoose.Schema.Types.ObjectId;

  @Prop({
    enum: EnumSubscriptionBillingFrequency,
    default: EnumSubscriptionBillingFrequency.MONTHLY,
  })
  frequencyOfDelivery: string[];

  @Prop()
  frequencyOfReception: number;
}

export type CouponDocument = Coupon & Document;

@Schema({ timestamps: {}, autoIndex: false })
export class Coupon {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  invoiceNotes: string;

  @Prop({ enum: EnumCouponTypes, default: EnumCouponTypes.FIXED_AMOUNT })
  discountType: string;

  @Prop({ default: 0 })
  discountValue: number;

  @Prop({ default: 0 })
  redemptionCount: number;

  @Prop({
    enum: EnumCouponActions,
    default: EnumCouponActions.CREATE_SUBSCRIPTION,
  })
  action: string;

  @Prop({ enum: EnumCouponStatus, default: EnumCouponStatus.DISABLED })
  status: string;

  @Prop({ enum: EnumCouponPeriodTypes })
  periodType: string;

  @Prop()
  startedAt: Date;

  @Prop()
  expiredAt: Date;

  @Prop()
  usingPeriodsCount: number;

  @Prop()
  maximumRedemptions: number;

  @Prop()
  appliesTo: Applies[];
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
