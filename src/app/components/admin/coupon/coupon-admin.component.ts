import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {CouponService} from "../../../services/coupon.service";
import {CouponResponseDto} from "../../../responses/coupon/coupon.response";
import {GenericResponse} from "../../../responses/generic.response";
import {CommonModule} from "@angular/common";
import {ProductService} from "../../../services/product.service";
import {CartService} from "../../../services/cart.service";
import {of} from "rxjs";

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './coupon-admin.component.html',
  styleUrl: './coupon-admin.component.scss'
})
export class CouponAdminComponent implements OnInit {

  private router = inject(Router);

  private couponService = inject(CouponService);

  coupons: CouponResponseDto[] = [];

  ngOnInit(): void {
    this.getCoupons();
  }

  private getCoupons() {
    this.couponService.getCoupons().subscribe({
      next: (response) => {
        this.coupons = response.content;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }


  createCoupon() {
    this.router.navigate(['/admin/coupons/create']);
  }

  updateCoupon(id: number) {
    this.router.navigate([`/admin/coupons/update/${id}`]);
  }

  deleteCoupon(id: number) {

  }
}
