import {ConditionDto} from "../dtos/coupon/coupon.insert.dto";

export interface CouponModel {
  couponCode: string;
  discountAmount: number;
  expiryDate: Date;
  active: boolean;
  conditions: ConditionDto[];

}

export interface Condition {
  id: number;
  attributeType: string;
  attribute: string;
  operator: string;
  value: string | number | Date;
}
