import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CustomReportDefinition,
  ScheduledReport,
  DataSourceMetadata
} from '../../shared/models/custom-report.model';

interface PagedResponse<T> {
  items: T[];
  data?: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomReportService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/custom-reports`;

  getAll(params?: any): Observable<PagedResponse<CustomReportDefinition>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<PagedResponse<CustomReportDefinition>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<CustomReportDefinition> {
    return this.http.get<CustomReportDefinition>(`${this.baseUrl}/${id}`);
  }

  getDataSources(): Observable<DataSourceMetadata[]> {
    return this.http.get<DataSourceMetadata[]>(`${this.baseUrl}/data-sources`);
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

  // =====================
  // Scheduled Reports
  // =====================

  getSchedules(reportId: number): Observable<ScheduledReport[]> {
    return this.http.get<ScheduledReport[]>(`${this.baseUrl}/${reportId}/schedules`);
  }

  createSchedule(reportId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${reportId}/schedules`, data);
  }

  updateSchedule(scheduleId: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/v1/scheduled-reports/${scheduleId}`, data);
  }

  deleteSchedule(scheduleId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/v1/scheduled-reports/${scheduleId}`);
  }
}
