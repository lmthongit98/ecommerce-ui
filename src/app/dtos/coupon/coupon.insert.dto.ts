export interface CouponDto {
  code: string;
  discountPercentage: number;
  expiryDate: Date;
  active: boolean;
  conditions: ConditionDto[];

}

export interface ConditionDto {
  attribute: string;
  operator: string;
  value: string;
}
