import { Inject, Injectable } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'refresh_token';

  // private jwtHelperService = new JwtHelperService();
  localStorage?:Storage;

  constructor(@Inject(DOCUMENT) private document: Document){
    this.localStorage = document.defaultView?.localStorage;
  }
  //getter/setter
  getAccessToken():string {
    return this.localStorage?.getItem(this.ACCESS_TOKEN) ?? '';
  }
  setAccessToken(token: string): void {
    this.localStorage?.setItem(this.ACCESS_TOKEN, token);
  }

  setRefreshToken(token: string) {
    this.localStorage?.setItem(this.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string {
    return this.localStorage?.getItem(this.REFRESH_TOKEN) ?? '';
  }

  // getUserId(): number {
  //   let token = this.getToken();
  //   if (!token) {
  //     return 0;
  //   }
  //   let userObject = this.jwtHelperService.decodeToken(token);
  //   return 'userId' in userObject ? parseInt(userObject['userId']) : 0;
  // }


  removeToken(): void {
    this.localStorage?.removeItem(this.ACCESS_TOKEN);
  }
  removeAccessToken(): void {
    this.localStorage?.removeItem(this.ACCESS_TOKEN);
  }

  // isTokenExpired(): boolean {
  //   if(this.getToken() == null) {
  //     return false;
  //   }
  //   return this.jwtHelperService.isTokenExpired(this.getToken()!);
  // }
}
