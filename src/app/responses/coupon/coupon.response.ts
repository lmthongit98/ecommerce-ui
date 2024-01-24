export interface CouponResponseDto {
  id: number
  code: string;
  discountPercentage: number;
  expiryDate: Date;
  active: boolean;
  couponConditions: CouponConditionDto[];
}

interface CouponConditionDto {
  attribute: string;
  operator: string;
  value: string;
}
