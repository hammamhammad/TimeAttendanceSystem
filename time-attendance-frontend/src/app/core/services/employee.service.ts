import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EmployeeDto, Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/employees`;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this.apiUrl}/${id}`);
  }
}