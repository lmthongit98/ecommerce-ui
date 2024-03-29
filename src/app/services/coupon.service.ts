import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CouponApplyDto} from "../dtos/coupon/coupon.apply.dto";
import {AttributeDto} from "../responses/coupon/attribute.dto";
import {CouponDto} from "../dtos/coupon/coupon.insert.dto";
import {CouponResponseDto} from "../responses/coupon/coupon.response";


@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiBaseUrl = environment.apiBaseUrl;

  private http = inject(HttpClient);


  createCoupon(couponDto: CouponDto): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons`;
    return this.http.post<any>(url, couponDto);
  }

  updateCoupon(id: number, couponDto: CouponDto): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons/${id}`;
    return this.http.put<any>(url, couponDto);
  }

  getCouponDetails(id: number): Observable<CouponResponseDto> {
    const url = `${this.apiBaseUrl}/coupons/${id}`;
    return this.http.get<CouponResponseDto>(url);
  }


  calculateCouponValue(couponApplyDto: CouponApplyDto): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons/apply`;
    return this.http.post<any>(url, couponApplyDto);
  }

  getAttributes(): Observable<AttributeDto[]> {
    const url = `${this.apiBaseUrl}/coupons/attributes`;
    return this.http.get<AttributeDto[]>(url);
  }

  getOperators(): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons/operators`;
    return this.http.get<any>(url);
  }

  getCoupons(): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons`;
    return this.http.get<any>(url);
  }

  deleteCouponById(id: number) {
    const url = `${this.apiBaseUrl}/coupons/${id}`;
    return this.http.delete<CouponResponseDto>(url);
  }
}
