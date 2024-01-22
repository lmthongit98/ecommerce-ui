import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {CouponApplyDto} from "../dtos/coupon/coupon.apply.dto";


@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  calculateCouponValue(couponApplyDto: CouponApplyDto): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons/apply`;
    return this.http.post<number>(url, couponApplyDto);
  }

}
