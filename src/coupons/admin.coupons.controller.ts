import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ValidationPipe } from '../validation/validation.pipe';
import { Roles, Permission } from '../auth/access.decorator';
import { EnumPermission, EnumRoles } from '../enums/access';

@Roles(EnumRoles.ADMIN)
@Controller({ path: 'coupons', host: process.env['DOMAIN_ADMIN'] })
export class AdminCouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @ApiBody({ type: CreateCouponDto })
  @Permission(EnumPermission.COUPON_CREATE)
  @Post()
  create(@Body(new ValidationPipe()) createCouponDto: CreateCouponDto) {
    console.log('123123123', createCouponDto);
    return this.couponsService.create(createCouponDto);
  }

  @Permission(EnumPermission.COUPON_READ)
  @Get()
  findAll() {
    return 'localhost admin';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(+id);
  }
}
