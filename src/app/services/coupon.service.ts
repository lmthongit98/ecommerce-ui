import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  calculateCouponValue(couponCode: string, totalAmount: number): Observable<number> {
    const url = `${this.apiBaseUrl}/coupons/calculate`;
    const params = new HttpParams()
      .set('couponCode', couponCode)
      .set('totalAmount', totalAmount.toString());

    return this.http.get<number>(url, { params });
  }

}
