import {CartItemDTO} from "../order/cart.item.dto";

export class CouponApplyDto {
  couponCode: string;
  totalAmount: number;
  cartItems: CartItemDTO[]

  constructor(data: any) {
    this.couponCode = data.couponCode;
    this.totalAmount = data.totalAmount;
    this.cartItems = data.cartItems;
  }
}
