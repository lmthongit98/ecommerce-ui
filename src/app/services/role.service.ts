import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {GroupedPermissions, RoleResponse} from "../responses/role/role.response.dto";
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

  createRole(roleUpdate: RoleDto): Observable<RoleResponse> {
    return this.http.post<RoleResponse>(this.apiGetRoles, roleUpdate);
  }

  getGroupedPermission(): Observable<GroupedPermissions> {
    return this.http.get<GroupedPermissions>(`${this.apiGetRoles}/permissions`);
  }

}
