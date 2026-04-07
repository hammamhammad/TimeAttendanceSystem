import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LeaveEncashment, EligibleLeaveType } from '../../shared/models/leave-encashment.model';

interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveEncashmentService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/leave-encashments`;

  getAll(params?: any): Observable<PagedResponse<LeaveEncashment>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<PagedResponse<LeaveEncashment>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<LeaveEncashment> {
    return this.http.get<LeaveEncashment>(`${this.baseUrl}/${id}`);
  }

  getEligible(employeeId: number): Observable<EligibleLeaveType[]> {
    return this.http.get<EligibleLeaveType[]>(`${this.baseUrl}/eligible/${employeeId}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  approve(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/approve`, {});
  }

  reject(id: number, notes: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/reject`, { notes });
  }
}
