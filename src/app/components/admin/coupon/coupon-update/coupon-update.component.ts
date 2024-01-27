import {Component, inject} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CouponDto} from "../../../../dtos/coupon/coupon.insert.dto";
import {AttributeDto} from "../../../../responses/coupon/attribute.dto";
import {CouponService} from "../../../../services/coupon.service";
import {ToastrService} from "ngx-toastr";
import {ApiErrorResponse} from "../../../../responses/generic.response";
import {ActivatedRoute} from "@angular/router";
import {CouponResponseDto} from "../../../../responses/coupon/coupon.response";

@Component({
  selector: 'app-coupon-update',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './coupon-update.component.html',
  styleUrl: './coupon-update.component.scss'
})
export class CouponUpdateComponent {
  couponForm: FormGroup;
  coupon!: CouponDto
  attributes: AttributeDto[] = [];
  operators: string[] = [];
  couponId = 0;

  couponService = inject(CouponService);
  private toastr = inject(ToastrService);
  route = inject(ActivatedRoute);


  constructor() {
    this.couponForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      discountPercentage: new FormControl(0, [Validators.required, Validators.min(0)]),
      expiryDate: new FormControl('', [Validators.required]),
      active: new FormControl(false),
      conditions: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.getCouponDetails();
    this.getAttributes();
    this.getOperators();
  }

  private getCouponDetails() {
    this.route.paramMap.subscribe(params => {
      this.couponId = Number(params.get('id'));
      this.couponService.getCouponDetails(this.couponId).subscribe({
        next: (response) => {
          this.updateForm(response);
        },
        error: (err: ApiErrorResponse) => {
          console.log(err);
          this.toastr.error(err.description || 'An unexpected error occurred.');
        }
      })
    });
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

  updateCoupon() {
    if (!this.couponForm.valid) {
      return;
    }
    this.coupon = this.couponForm.value;
    this.couponService.updateCoupon(this.couponId, this.coupon).subscribe({
      next: (response: any) => {
        this.toastr.success('Coupon updated successfully!');
      },
      error: (err: ApiErrorResponse) => {
        console.log(err);
        this.toastr.error(err.description || 'An unexpected error occurred.');
      }
    })
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

  private updateForm(coupon: CouponResponseDto) {
    this.couponForm.patchValue({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      expiryDate: this.convertDateToISO(coupon.expiryDate),
      active: coupon.active,
    })
    coupon.conditions.forEach(condition => {
      const conditionGroup = new FormGroup({
        attribute: new FormControl(condition.attribute, [Validators.required]),
        operator: new FormControl(condition.operator, [Validators.required]),
        value: new FormControl(condition.value, [Validators.required])
      });
      this.conditions.push(conditionGroup);
    })
  }

  private convertDateToISO(date: string) {
    const parts = date.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    throw new Error('Invalid date format');
  }


}
