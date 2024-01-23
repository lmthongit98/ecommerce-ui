export interface CouponResponseDto {
  id: number
  code: string;
  discountPercentage: number;
  expiryDate: string;
  active: boolean;
  couponConditions: CouponConditionDto[];
}

interface CouponConditionDto {
  attribute: string;
  operator: string;
  value: string;
}
