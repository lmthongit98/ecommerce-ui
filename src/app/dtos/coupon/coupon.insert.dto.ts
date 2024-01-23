export interface CouponDto {
  couponCode: string;
  discountAmount: number;
  expiryDate: Date;
  active: boolean;
  conditions: ConditionDto[];

}

export interface ConditionDto {
  attributeType: string;
  attribute: string;
  operator: string;
  value: string | number | Date;
}
