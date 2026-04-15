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

  /**
   * Explicit recalculation of a Processed period. Previous (non-finalized) records are soft-deleted;
   * new ones are produced using the current effective configuration.
   */
  recalculatePeriod(id: number): Observable<PayrollPeriod> {
    return this.http.post<PayrollPeriod>(`${this.apiUrl}/${id}/recalculate`, {});
  }

  /** Audit history for a period: one row per run (initial, recalc, finalization, cancellation). */
  getRunAudit(periodId: number): Observable<PayrollRunAuditEntry[]> {
    return this.http.get<PayrollRunAuditEntry[]>(`${this.apiUrl}/${periodId}/run-audit`);
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

/** A single payroll-run audit entry returned by GET /{id}/run-audit. */
export interface PayrollRunAuditEntry {
  id: number;
  /** Backend enum: 1=InitialProcess, 2=Recalculation, 3=Adjustment, 4=Finalization, 5=Cancellation */
  runType: number;
  /** Backend enum: 1=Running, 2=Completed, 3=Failed, 4=CompletedWithWarnings */
  status: number;
  startedAtUtc: string;
  completedAtUtc?: string;
  triggeredByUsername?: string;
  employeesProcessed: number;
  employeesFailed: number;
  employeesSkipped: number;
  warningCount: number;
  warningsJson?: string;
  errorsJson?: string;
}
