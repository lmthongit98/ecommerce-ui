import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {AuthService} from "../services/auth.service";
import {RefreshTokenDTO} from "../dtos/user/refresh.token.dto";
import {RefreshTokenResponse} from "../responses/user/refresh.token.response";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // for avoiding entering an infinite loop
  private isRefreshing = false;

  constructor(private tokenService: StorageService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getAccessToken();
    if (token) {
      req = this.setToken(req, token);
      return next.handle(req).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status == 401 && this.tokenService.getRefreshToken()) {
            return this.handleAuthorizationError(req, next);
          } else {
            return throwError(error);
          }
        })
      )
    } else {
      return next.handle(req);
    }
  }

  private setToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }

  private handleAuthorizationError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      const refreshToken = this.tokenService.getRefreshToken();
      const refreshTokenDto = new RefreshTokenDTO(refreshToken);
      return this.authService.getRefreshToken(refreshTokenDto).pipe(
        switchMap((response: RefreshTokenResponse) => {
          this.isRefreshing = false;
          const {accessToken, refreshToken} = response;
          this.tokenService.setAccessToken(accessToken)
          this.tokenService.setRefreshToken(refreshToken);
          return next.handle(this.setToken(request, accessToken));
        })
      );
    } else {
      return next.handle(request);
    }
  }

}
