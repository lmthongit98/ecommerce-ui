import {Injectable} from '@angular/core';
import {LoginDTO} from "../dtos/user/login.dto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HttpUtilService} from "./http.util.service";
import {environment} from "../../environments/environment";
import {RefreshTokenDTO} from "../dtos/user/refresh.token.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginApi = `${environment.apiBaseUrl}/auth/login`;

  private refreshTokenApi = `${environment.apiBaseUrl}/auth/refreshToken`;


  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService,
  ) {
  }


  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }


  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.loginApi, loginDTO, this.apiConfig);
  }

  getRefreshToken(refreshToken: RefreshTokenDTO): Observable<any> {
    return this.http.post(this.refreshTokenApi, refreshToken, this.apiConfig);
  }

}
