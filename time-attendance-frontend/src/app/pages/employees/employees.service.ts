import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  EmployeeDto,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeesFilter,
  PagedResult,
  BranchDto,
  DepartmentDto,
  EmployeeSelectOption
} from '../../shared/models/employee.model';
import { UpdateEmployeeShiftRequest } from '../../shared/models/shift.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/employees`;
  private branchesUrl = `${environment.apiUrl}/api/v1/branches`;
  private departmentsUrl = `${environment.apiUrl}/api/v1/departments`;

  getEmployees(filter: EmployeesFilter = {}): Observable<PagedResult<EmployeeDto>> {
    let httpParams = new HttpParams();
    
    if (filter.page) httpParams = httpParams.set('page', filter.page.toString());
    if (filter.pageSize) httpParams = httpParams.set('pageSize', filter.pageSize.toString());
    if (filter.search) httpParams = httpParams.set('search', filter.search);
    if (filter.branchId) httpParams = httpParams.set('branchId', filter.branchId.toString());
    if (filter.departmentId) httpParams = httpParams.set('departmentId', filter.departmentId.toString());
    if (filter.managerId) httpParams = httpParams.set('managerId', filter.managerId.toString());
    if (filter.isActive !== undefined) httpParams = httpParams.set('isActive', filter.isActive.toString());
    if (filter.employmentStatus) httpParams = httpParams.set('employmentStatus', filter.employmentStatus);

    return this.http.get<PagedResult<EmployeeDto>>(this.baseUrl, { params: httpParams });
  }

  getEmployeeById(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this.baseUrl}/${id}`);
  }

  createEmployee(request: CreateEmployeeRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.baseUrl, request);
  }

  updateEmployee(id: number, request: UpdateEmployeeRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, request);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateEmployeeShift(employeeId: number, request: UpdateEmployeeShiftRequest): Observable<{success: boolean, message: string}> {
    return this.http.post<{success: boolean, message: string}>(`${this.baseUrl}/${employeeId}/shift`, request);
  }

  // Helper methods for dropdowns
  getBranches(): Observable<PagedResult<BranchDto>> {
    let httpParams = new HttpParams()
      .set('page', '1')
      .set('pageSize', '100')
      .set('isActive', 'true');
    
    return this.http.get<PagedResult<BranchDto>>(this.branchesUrl, { params: httpParams });
  }

  getDepartments(branchId?: number): Observable<DepartmentDto[]> {
    let httpParams = new HttpParams();
    if (branchId) {
      httpParams = httpParams.set('branchId', branchId.toString());
    }
    
    return this.http.get<DepartmentDto[]>(this.departmentsUrl, { params: httpParams });
  }

  getEmployeesForSelection(branchId?: number): Observable<EmployeeSelectOption[]> {
    let httpParams = new HttpParams()
      .set('page', '1')
      .set('pageSize', '1000')
      .set('isActive', 'true');

    if (branchId) {
      httpParams = httpParams.set('branchId', branchId.toString());
    }

    return this.http.get<PagedResult<EmployeeDto>>(this.baseUrl, { params: httpParams })
      .pipe(
        map(result => result.items.map(emp => ({
          id: emp.id,
          name: emp.fullName,
          employeeNumber: emp.employeeNumber
        })))
      );
  }

  getManagers(branchId?: number): Observable<EmployeeSelectOption[]> {
    let httpParams = new HttpParams()
      .set('page', '1')
      .set('pageSize', '1000')
      .set('isActive', 'true');
    
    if (branchId) {
      httpParams = httpParams.set('branchId', branchId.toString());
    }
    
    return this.http.get<PagedResult<EmployeeDto>>(this.baseUrl, { params: httpParams })
      .pipe(
        map(result => result.items.map(emp => ({
          id: emp.id,
          name: emp.fullName,
          employeeNumber: emp.employeeNumber
        })))
      );
  }
}