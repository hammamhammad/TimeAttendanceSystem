import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollReportService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/reports`;

  getSalaryRegister(payrollPeriodId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/salary-register`, {
      params: new HttpParams().set('payrollPeriodId', payrollPeriodId.toString())
    });
  }

  getDepartmentCost(year: number, month?: number, branchId?: number): Observable<any> {
    let params = new HttpParams().set('year', year.toString());
    if (month !== null && month !== undefined) {
      params = params.set('month', month.toString());
    }
    if (branchId !== null && branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    return this.http.get<any>(`${this.baseUrl}/department-cost`, { params });
  }

  getYtdEarnings(year: number, params?: any): Observable<any> {
    let httpParams = new HttpParams().set('year', year.toString());
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(`${this.baseUrl}/ytd-earnings`, { params: httpParams });
  }

  getContractExpiry(daysThreshold?: number, branchId?: number): Observable<any> {
    let params = new HttpParams();
    if (daysThreshold !== null && daysThreshold !== undefined) {
      params = params.set('daysThreshold', daysThreshold.toString());
    }
    if (branchId !== null && branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    return this.http.get<any>(`${this.baseUrl}/contract-expiry`, { params });
  }

  getDocumentExpiry(daysThreshold?: number, branchId?: number): Observable<any> {
    let params = new HttpParams();
    if (daysThreshold !== null && daysThreshold !== undefined) {
      params = params.set('daysThreshold', daysThreshold.toString());
    }
    if (branchId !== null && branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    return this.http.get<any>(`${this.baseUrl}/document-expiry`, { params });
  }

  getCertificationExpiry(daysThreshold?: number, branchId?: number): Observable<any> {
    let params = new HttpParams();
    if (daysThreshold !== null && daysThreshold !== undefined) {
      params = params.set('daysThreshold', daysThreshold.toString());
    }
    if (branchId !== null && branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    return this.http.get<any>(`${this.baseUrl}/certification-expiry`, { params });
  }

  getComplianceSummary(branchId?: number): Observable<any> {
    let params = new HttpParams();
    if (branchId !== null && branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    return this.http.get<any>(`${this.baseUrl}/compliance-summary`, { params });
  }
}
