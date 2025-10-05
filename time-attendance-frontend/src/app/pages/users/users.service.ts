import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  UserDto,
  CreateUserRequest,
  UpdateUserRequest,
  AssignRoleRequest,
  AssignBranchRequest,
  PagedResult
} from '../../shared/models/user.model';
import { EmployeeDto } from '../../shared/models/employee.model';

export interface UsersFilter {
  page?: number;
  pageSize?: number;
  search?: string;
  branchId?: number;
  roleId?: number;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/users`;

  constructor(private http: HttpClient) {}

  getUsers(filter: UsersFilter = {}): Observable<PagedResult<UserDto>> {
    let params = new HttpParams();
    
    if (filter.page) params = params.set('page', filter.page.toString());
    if (filter.pageSize) params = params.set('pageSize', filter.pageSize.toString());
    if (filter.search) params = params.set('search', filter.search);
    if (filter.branchId) params = params.set('branchId', filter.branchId.toString());
    if (filter.roleId) params = params.set('roleId', filter.roleId.toString());
    if (filter.isActive !== undefined) params = params.set('isActive', filter.isActive.toString());

    return this.http.get<PagedResult<UserDto>>(this.baseUrl, { params });
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  createUser(request: CreateUserRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.baseUrl, request);
  }

  updateUser(id: number, request: UpdateUserRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, request);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  assignRole(userId: number, request: AssignRoleRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/roles`, request);
  }

  removeRole(userId: number, roleId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}/roles/${roleId}`);
  }

  assignBranch(userId: number, request: AssignBranchRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/branches`, request);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/v1/roles`).pipe(
      map((response: any) => {
        console.log('Roles API response:', response);
        // Handle different response structures
        if (Array.isArray(response)) {
          return response;
        }
        // If it's wrapped in a Result object, extract the value
        if (response && response.value && Array.isArray(response.value)) {
          return response.value;
        }
        // If it has an items property (paginated), use that
        if (response && response.items && Array.isArray(response.items)) {
          return response.items;
        }
        console.warn('Unexpected roles response format:', response);
        return [];
      })
    );
  }

  getBranches(): Observable<any[]> {
    // Get all branches with a large page size and only active branches
    const params = new HttpParams()
      .set('pageSize', '1000')
      .set('isActive', 'true');

    return this.http.get<PagedResult<any>>(`${environment.apiUrl}/api/v1/branches`, { params })
      .pipe(
        map((result: PagedResult<any>) => result.items || [])
      );
  }

  getAvailableEmployees(): Observable<EmployeeDto[]> {
    // Get all employees - in the future, this should filter out employees with existing user accounts
    const params = new HttpParams()
      .set('page', '1')
      .set('pageSize', '1000');

    return this.http.get<PagedResult<EmployeeDto>>(`${environment.apiUrl}/api/v1/employees`, { params })
      .pipe(
        map((result: PagedResult<EmployeeDto>) => result.items || [])
      );
  }
}