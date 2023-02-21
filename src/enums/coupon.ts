export enum EnumCouponStatus {
  ARCHIVED = 'archived',
  ACTIVE = 'active',
  DISABLED = 'disabled',
  USED = 'used',
}

export enum EnumCouponActions {
  CREATE_SUBSCRIPTION = 'create_subscription',
  MANUAL = 'manual',
}

export enum EnumCouponApplies {
  SUBSCRIPTION = 'subscription',
  PRODUCT = 'product',
  VARIATION = 'variation',
  DOSE = 'dose',
  ADDON = 'addon',
}

export enum EnumCouponPeriodTypes {
  ONE_TIME = 'one_time',
  CUSTOM = 'custom',
  FOREVER = 'forever',
}

export enum EnumCouponTypes {
  FIXED_AMOUNT = 'fixedAmount',
  PERCENTAGE = 'percentage',
  FINAL_PRICE = 'finalPrice',
}
