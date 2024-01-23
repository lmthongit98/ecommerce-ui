import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CouponApplyDto} from "../dtos/coupon/coupon.apply.dto";
import {GenericResponse} from "../responses/generic.response";


@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiBaseUrl = environment.apiBaseUrl;

  private http = inject(HttpClient);

  calculateCouponValue(couponApplyDto: CouponApplyDto): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons/apply`;
    return this.http.post<any>(url, couponApplyDto);
  }

  getAttributes(): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons/attributes`;
    return this.http.get<any>(url);
  }

  getOperators(): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons/operator`;
    return this.http.get<any>(url);
  }

  getCoupons(): Observable<any> {
    const url = `${this.apiBaseUrl}/coupons`;
    return this.http.get<any>(url);
  }

}
