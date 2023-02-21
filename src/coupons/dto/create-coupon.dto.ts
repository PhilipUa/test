import { Allow, IsEnum, IsNumber, IsString, IsDefined } from 'class-validator';
import { EnumCouponTypes, EnumCouponActions } from '../../enums/coupon';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @Allow()
  @IsString()
  @ApiProperty()
  invoiceNotes: string;

  @IsString()
  @IsEnum(EnumCouponTypes)
  @ApiProperty({ enum: EnumCouponTypes })
  discountType: string;

  @IsNumber()
  @IsDefined()
  @ApiProperty()
  discountValue: number;

  @IsString()
  @IsEnum(EnumCouponActions)
  @ApiProperty({ enum: EnumCouponActions })
  action: string;

  // appliesTo:
}
