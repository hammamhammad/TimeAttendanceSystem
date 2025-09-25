import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OvertimeConfigurationsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/overtime-configurations`;

  getOvertimeConfigurations(): Observable<OvertimeConfiguration[]> {
    return this.http.get<PaginatedResponse<OvertimeConfiguration>>(this.baseUrl)
      .pipe(
        map(response => response.items)
      );
  }

  getOvertimeConfigurationById(id: number): Observable<OvertimeConfiguration> {
    return this.http.get<OvertimeConfiguration>(`${this.baseUrl}/${id}`);
  }

  createOvertimeConfiguration(request: CreateOvertimeConfigurationRequest): Observable<OvertimeConfiguration> {
    return this.http.post<OvertimeConfiguration>(this.baseUrl, request);
  }

  updateOvertimeConfiguration(id: number, request: UpdateOvertimeConfigurationRequest): Observable<OvertimeConfiguration> {
    return this.http.put<OvertimeConfiguration>(`${this.baseUrl}/${id}`, request);
  }

  activateOvertimeConfiguration(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activate`, {});
  }

  deactivateOvertimeConfiguration(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/deactivate`, {});
  }

  deleteOvertimeConfiguration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export interface OvertimeConfiguration {
  id: number;
  enablePreShiftOvertime: boolean;
  enablePostShiftOvertime: boolean;
  normalDayRate: number;
  publicHolidayRate: number;
  offDayRate: number;
  minimumOvertimeMinutes: number;
  considerFlexibleTime: boolean;
  maxPreShiftOvertimeHours: number;
  maxPostShiftOvertimeHours: number;
  requireApproval: boolean;
  overtimeGracePeriodMinutes: number;
  weekendAsOffDay: boolean;
  roundingIntervalMinutes: number;
  policyNotes: string;
  isActive: boolean;
  effectiveFromDate: string;
  effectiveToDate?: string;
  createdAtUtc: string;
  createdBy: string;
  updatedAtUtc?: string;
  updatedBy?: string;
}

export interface CreateOvertimeConfigurationRequest {
  enablePreShiftOvertime: boolean;
  enablePostShiftOvertime: boolean;
  normalDayRate: number;
  publicHolidayRate: number;
  offDayRate: number;
  minimumOvertimeMinutes: number;
  considerFlexibleTime: boolean;
  maxPreShiftOvertimeHours: number;
  maxPostShiftOvertimeHours: number;
  requireApproval: boolean;
  overtimeGracePeriodMinutes: number;
  weekendAsOffDay: boolean;
  roundingIntervalMinutes: number;
  policyNotes: string;
  effectiveFromDate: string;
  effectiveToDate?: string;
}

export interface UpdateOvertimeConfigurationRequest {
  enablePreShiftOvertime: boolean;
  enablePostShiftOvertime: boolean;
  normalDayRate: number;
  publicHolidayRate: number;
  offDayRate: number;
  minimumOvertimeMinutes: number;
  considerFlexibleTime: boolean;
  maxPreShiftOvertimeHours: number;
  maxPostShiftOvertimeHours: number;
  requireApproval: boolean;
  overtimeGracePeriodMinutes: number;
  weekendAsOffDay: boolean;
  roundingIntervalMinutes: number;
  policyNotes: string;
  effectiveFromDate: string;
  effectiveToDate?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}