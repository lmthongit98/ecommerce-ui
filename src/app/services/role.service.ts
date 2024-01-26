import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RoleResponse} from "../responses/role/role.response.dto";
import {RoleDto} from "../dtos/role/role.dto";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiGetRoles = `${environment.apiBaseUrl}/roles`;

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<RoleResponse[]> {
    return this.http.get<RoleResponse[]>(this.apiGetRoles);
  }

  getRoleById(id: number): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.apiGetRoles}/${id}`);
  }

  updateRoleById(id: number, roleUpdate: RoleDto): Observable<RoleResponse> {
    return this.http.put<RoleResponse>(`${this.apiGetRoles}/${id}`, roleUpdate);
  }

}
