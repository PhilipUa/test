import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponSchema } from './schemas/coupons.schema';
import { AdminCouponsController } from './admin.coupons.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'coupons', schema: CouponSchema }],
      'common',
    ),
  ],
  controllers: [AdminCouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
