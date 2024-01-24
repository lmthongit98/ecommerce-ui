import {Component, inject, OnInit} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {CouponDto} from "../../../../dtos/coupon/coupon.insert.dto";
import {CouponService} from "../../../../services/coupon.service";
import {AttributeDto} from "../../../../responses/coupon/attribute.dto";
import {ApiErrorResponse} from "../../../../responses/generic.response";
import {of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-coupon-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './coupon-create.component.html',
  styleUrl: './coupon-create.component.scss'
})
export class CouponCreateComponent implements OnInit {

  couponForm: FormGroup;
  coupon: CouponDto = {
    code: '',
    discountPercentage: 0,
    expiryDate: new Date(),
    active: false,
    conditions: []
  }
  attributes: AttributeDto[] = [];
  operators: string[] = [];

  couponService = inject(CouponService);
  private toastr = inject(ToastrService);
  constructor() {
    this.couponForm = new FormGroup({
      code: new FormControl(this.coupon.code, [Validators.required]),
      discountPercentage: new FormControl(this.coupon.discountPercentage, [Validators.required, Validators.min(0)]),
      expiryDate: new FormControl(this.coupon.expiryDate, [Validators.required]),
      active: new FormControl(this.coupon.active),
      conditions: new FormArray([])
    });
    this.coupon.conditions = [];
  }

  ngOnInit(): void {
    this.getAttributes();
    this.getOperators();
  }

  get conditions(): FormArray {
    return this.couponForm.get('conditions') as FormArray;
  }

  addCondition() {
    const conditionGroup = new FormGroup({
      attribute: new FormControl(this.attributes[0]?.code, [Validators.required]),
      operator: new FormControl(this.operators?.[0], [Validators.required]),
      value: new FormControl('', [Validators.required])
    });
    this.conditions.push(conditionGroup);
  }

  removeCondition(index: number) {
    this.conditions.removeAt(index);
  }

  createCoupon() {
    if (this.couponForm.valid) {
      this.coupon = this.couponForm.value;
      this.couponService.createCoupon(this.coupon).subscribe({
        next: (response: any) => {
          this.toastr.success('Coupon created successfully!');
          this.couponForm.reset();
        },
        error: (err: ApiErrorResponse) => {
          console.log(err);
          this.toastr.error(err.description || 'An unexpected error occurred.');
        }
      })
    }
  }

  private getAttributes() {
    this.couponService.getAttributes().subscribe({
      next: (attributes) => {
        this.attributes = attributes;
      },
      error: (err: ApiErrorResponse) => {
        console.log(err.description)
      }
    })
  }

  private getOperators() {
    this.couponService.getOperators().subscribe({
      next: (operators) => {
        this.operators = operators;
      },
      error: (err: ApiErrorResponse) => {
        console.log(err.description)
      }
    })
  }

}
