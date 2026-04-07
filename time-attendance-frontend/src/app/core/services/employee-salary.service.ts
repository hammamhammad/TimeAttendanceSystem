import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  EmployeeSalary,
  AssignEmployeeSalaryRequest,
  EmployeeSalaryHistory
} from '../../shared/models/employee-salary.model';

@Injectable({ providedIn: 'root' })
export class EmployeeSalaryService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/employee-salaries`;
  private http = inject(HttpClient);

  getCurrent(employeeId: number): Observable<EmployeeSalary> {
    return this.http.get<EmployeeSalary>(`${this.apiUrl}/employee/${employeeId}/current`);
  }

  getHistory(employeeId: number, params?: any): Observable<EmployeeSalaryHistory> {
    return this.http.get<EmployeeSalaryHistory>(`${this.apiUrl}/employee/${employeeId}/history`, { params });
  }

  assign(request: AssignEmployeeSalaryRequest): Observable<EmployeeSalary> {
    return this.http.post<EmployeeSalary>(this.apiUrl, request);
  }

  getById(id: number): Observable<EmployeeSalary> {
    return this.http.get<EmployeeSalary>(`${this.apiUrl}/${id}`);
  }

  deactivate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/deactivate`, {});
  }
}
