import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role, Permission, AssignPermissionRequest } from '../../shared/models/role.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/roles`;
  private permissionsUrl = `${environment.apiUrl}/api/v1/permissions`;

  getRoles(includePermissions: boolean = false): Observable<Role[]> {
    let httpParams = new HttpParams();
    if (includePermissions) {
      httpParams = httpParams.set('includePermissions', 'true');
    }
    return this.http.get<Role[]>(this.baseUrl, { params: httpParams });
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`);
  }

  getPermissions(group?: string): Observable<Permission[]> {
    let httpParams = new HttpParams();
    if (group) {
      httpParams = httpParams.set('group', group);
    }
    return this.http.get<PermissionGroupDto[]>(this.permissionsUrl, { params: httpParams })
      .pipe(
        map(groups => {
          // Flatten the grouped permissions into a single array
          return groups.flatMap(group => group.permissions);
        })
      );
  }

  getGroupedPermissions(group?: string): Observable<PermissionGroupDto[]> {
    let httpParams = new HttpParams();
    if (group) {
      httpParams = httpParams.set('group', group);
    }
    return this.http.get<PermissionGroupDto[]>(this.permissionsUrl, { params: httpParams });
  }

  assignPermissionToRole(roleId: number, request: AssignPermissionRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${roleId}/permissions`, request);
  }

  removePermissionFromRole(roleId: number, permissionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${roleId}/permissions/${permissionId}`);
  }

  createRole(roleData: CreateRoleRequest): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, roleData);
  }

  updateRole(roleId: number, roleData: UpdateRoleRequest): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/${roleId}`, roleData);
  }

  deleteRole(roleId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${roleId}`);
  }
}

export interface CreateRoleRequest {
  name: string;
  permissionIds: number[];
}

export interface UpdateRoleRequest {
  name: string;
  permissionIds: number[];
}

export interface PermissionGroupDto {
  group: string;
  permissions: Permission[];
}