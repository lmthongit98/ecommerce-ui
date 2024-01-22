import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './coupon-admin.component.html',
  styleUrl: './coupon-admin.component.scss'
})
export class CouponAdminComponent {

  private router = inject(Router);

  createCoupon() {
    this.router.navigate(['/admin/coupons/create']);
  }

  updateCoupon(id: number) {
    this.router.navigate(['/admin/coupons/update/1']);
  }
}
