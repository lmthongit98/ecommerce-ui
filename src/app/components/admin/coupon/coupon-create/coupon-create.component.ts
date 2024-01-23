import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConditionDto, CouponDto} from "../../../../dtos/coupon/coupon.insert.dto";

@Component({
  selector: 'app-coupon-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './coupon-create.component.html',
  styleUrl: './coupon-create.component.scss'
})
export class CouponCreateComponent {

  couponForm: FormGroup;
  coupon: CouponDto = {
    couponCode: '',
    discountAmount: 0,
    expiryDate: new Date(),
    active: false,
    conditions: []
  }
  constructor() {
    this.couponForm = new FormGroup({
      couponCode: new FormControl(this.coupon.couponCode, [Validators.required]),
      discountAmount: new FormControl(this.coupon.discountAmount, [Validators.required, Validators.min(0)]),
      expiryDate: new FormControl(this.coupon.expiryDate, [Validators.required]),
      active: new FormControl(this.coupon.active)
    });
    this.coupon.conditions = [];
  }

  addCondition() {
    const newCondition: ConditionDto = {
      attributeType: '',
      attribute: '',
      operator: '',
      value: ''
    };
    this.coupon.conditions.push(newCondition);
  }

  removeCondition(index: number) {
    this.coupon.conditions.splice(index, 1);
  }

  createCoupon() {
    if (this.couponForm.valid) {
      // TODO: Implement your service call to create the coupon here
      console.log('Creating coupon...', this.coupon);
    }
  }

}
