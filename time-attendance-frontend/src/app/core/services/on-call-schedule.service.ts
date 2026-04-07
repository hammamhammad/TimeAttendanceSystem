import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OnCallSchedule } from '../../shared/models/on-call-schedule.model';

interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class OnCallScheduleService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/on-call-schedules`;

  getAll(params?: any): Observable<PagedResponse<OnCallSchedule>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<PagedResponse<OnCallSchedule>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<OnCallSchedule> {
    return this.http.get<OnCallSchedule>(`${this.baseUrl}/${id}`);
  }

  getCurrent(params?: any): Observable<OnCallSchedule[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<OnCallSchedule[]>(`${this.baseUrl}/current`, { params: httpParams });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
