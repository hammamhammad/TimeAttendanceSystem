import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  CompanySettingsDto,
  BranchSettingsOverrideDto,
  ResolvedSettingsDto
} from './company-configuration.models';

@Injectable({
  providedIn: 'root'
})
export class CompanyConfigurationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/company-configuration`;

  getCompanySettings(): Observable<CompanySettingsDto> {
    return this.http.get<CompanySettingsDto>(this.baseUrl);
  }

  updateCompanySettings(settings: Partial<CompanySettingsDto>): Observable<void> {
    return this.http.put<void>(this.baseUrl, settings);
  }

  getResolvedSettings(branchId?: number, departmentId?: number): Observable<ResolvedSettingsDto> {
    let params = new HttpParams();
    if (branchId) params = params.set('branchId', branchId.toString());
    if (departmentId) params = params.set('departmentId', departmentId.toString());
    return this.http.get<ResolvedSettingsDto>(`${this.baseUrl}/resolved`, { params });
  }

  getBranchOverrides(branchId: number): Observable<BranchSettingsOverrideDto> {
    return this.http.get<BranchSettingsOverrideDto>(`${this.baseUrl}/branches/${branchId}`);
  }

  updateBranchOverrides(branchId: number, overrides: Partial<BranchSettingsOverrideDto>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/branches/${branchId}`, { ...overrides, branchId });
  }

  resetBranchOverrides(branchId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/branches/${branchId}`);
  }
}
