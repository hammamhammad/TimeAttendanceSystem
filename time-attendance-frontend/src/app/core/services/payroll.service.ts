import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PayrollPeriod,
  CreatePayrollPeriodRequest,
  PayrollRecord,
  PayrollSummary
} from '../../shared/models/payroll.model';

@Injectable({ providedIn: 'root' })
export class PayrollService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/payroll-periods`;
  private http = inject(HttpClient);

  getPeriods(params?: any): Observable<PayrollPeriod[]> {
    return this.http.get<PayrollPeriod[]>(this.apiUrl, { params });
  }

  getPeriodById(id: number): Observable<PayrollPeriod> {
    return this.http.get<PayrollPeriod>(`${this.apiUrl}/${id}`);
  }

  createPeriod(request: CreatePayrollPeriodRequest): Observable<PayrollPeriod> {
    return this.http.post<PayrollPeriod>(this.apiUrl, request);
  }

  processPeriod(id: number): Observable<PayrollPeriod> {
    return this.http.post<PayrollPeriod>(`${this.apiUrl}/${id}/process`, {});
  }

  approvePeriod(id: number): Observable<PayrollPeriod> {
    return this.http.post<PayrollPeriod>(`${this.apiUrl}/${id}/approve`, {});
  }

  markPaid(id: number): Observable<PayrollPeriod> {
    return this.http.post<PayrollPeriod>(`${this.apiUrl}/${id}/mark-paid`, {});
  }

  cancelPeriod(id: number): Observable<PayrollPeriod> {
    return this.http.post<PayrollPeriod>(`${this.apiUrl}/${id}/cancel`, {});
  }

  getRecords(periodId: number, params?: any): Observable<PayrollRecord[]> {
    return this.http.get<PayrollRecord[]>(`${this.apiUrl}/${periodId}/records`, { params });
  }

  getRecord(periodId: number, recordId: number): Observable<PayrollRecord> {
    return this.http.get<PayrollRecord>(`${this.apiUrl}/records/${recordId}`);
  }

  getSummary(periodId: number): Observable<PayrollSummary> {
    return this.http.get<PayrollSummary>(`${this.apiUrl}/${periodId}/summary`);
  }

  exportToCsv(periodId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${periodId}/export`, { responseType: 'blob' });
  }
}
