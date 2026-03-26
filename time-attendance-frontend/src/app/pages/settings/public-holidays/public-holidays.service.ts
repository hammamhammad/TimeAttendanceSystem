import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { I18nService } from '../../../core/i18n/i18n.service';
import {
  PublicHoliday,
  CreatePublicHolidayRequest,
  UpdatePublicHolidayRequest,
  PublicHolidaysResponse,
  HolidayCalendarResponse,
  HolidayDateResponse,
  HolidayImportRequest,
  HolidayType,
  HolidayTemplate
} from '../../../shared/models/public-holiday.model';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidaysService {
  private http = inject(HttpClient);
  private i18n = inject(I18nService);
  private baseUrl = `${environment.apiUrl}/api/v1/public-holidays`;

  /**
   * Get paginated list of public holidays with filtering options
   */
  getPublicHolidays(
    page: number = 1,
    pageSize: number = 10,
    searchTerm?: string,
    year?: number,
    branchId?: number,
    holidayType?: HolidayType,
    isActive?: boolean,
    isNational?: boolean,
    countryCode?: string
  ): Observable<PublicHolidaysResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    if (year !== undefined) {
      params = params.set('year', year.toString());
    }
    if (branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    if (holidayType !== undefined) {
      params = params.set('holidayType', holidayType.toString());
    }
    if (isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }
    if (isNational !== undefined) {
      params = params.set('isNational', isNational.toString());
    }
    if (countryCode) {
      params = params.set('countryCode', countryCode);
    }

    return this.http.get<PublicHolidaysResponse>(this.baseUrl, { params });
  }

  /**
   * Get a specific public holiday by ID
   */
  getPublicHolidayById(id: number, includeConflicts: boolean = false, year?: number): Observable<PublicHoliday> {
    let params = new HttpParams();
    if (includeConflicts) {
      params = params.set('includeConflicts', 'true');
    }
    if (year !== undefined) {
      params = params.set('year', year.toString());
    }

    return this.http.get<PublicHoliday>(`${this.baseUrl}/${id}`, { params });
  }

  /**
   * Create a new public holiday
   */
  createPublicHoliday(request: CreatePublicHolidayRequest): Observable<PublicHoliday> {
    // Debug logging
    console.log('Creating public holiday with request:', request);
    console.log('Request URL:', this.baseUrl);
    console.log('Request payload (stringified):', JSON.stringify(request));

    return this.http.post<PublicHoliday>(this.baseUrl, request);
  }

  /**
   * Update an existing public holiday
   */
  updatePublicHoliday(id: number, request: UpdatePublicHolidayRequest): Observable<PublicHoliday> {
    return this.http.put<PublicHoliday>(`${this.baseUrl}/${id}`, request);
  }

  /**
   * Delete a public holiday
   */
  deletePublicHoliday(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get holiday calendar for a specific year
   */
  getHolidayCalendar(
    year: number,
    branchId?: number,
    includeInactive: boolean = false,
    format?: string
  ): Observable<HolidayCalendarResponse> {
    let params = new HttpParams();
    if (branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    if (includeInactive) {
      params = params.set('includeInactive', 'true');
    }
    if (format) {
      params = params.set('format', format);
    }

    return this.http.get<HolidayCalendarResponse>(`${this.baseUrl}/calendar/${year}`, { params });
  }

  /**
   * Get holidays for a specific month
   */
  getHolidayDates(year: number, month: number, branchId?: number): Observable<HolidayDateResponse[]> {
    let params = new HttpParams();
    if (branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }

    return this.http.get<HolidayDateResponse[]>(`${this.baseUrl}/dates/${year}/${month}`, { params });
  }

  /**
   * Import holiday template
   */
  importHolidayTemplate(request: HolidayImportRequest): Observable<PublicHoliday[]> {
    return this.http.post<PublicHoliday[]>(`${this.baseUrl}/import`, request);
  }

  /**
   * Export holidays for a specific year
   */
  exportHolidays(
    year: number,
    format: 'json' | 'csv' | 'ical' = 'json',
    branchId?: number,
    includeInactive: boolean = false
  ): Observable<Blob> {
    let params = new HttpParams()
      .set('format', format);

    if (branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    if (includeInactive) {
      params = params.set('includeInactive', 'true');
    }

    return this.http.get(`${this.baseUrl}/export/${year}`, {
      params,
      responseType: 'blob'
    });
  }

  /**
   * Check if a specific date is a holiday
   */
  isHoliday(date: string, branchId?: number): Observable<boolean> {
    let params = new HttpParams().set('date', date);
    if (branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }

    return this.http.get<boolean>(`${this.baseUrl}/is-holiday`, { params });
  }

  /**
   * Get available holiday templates
   */
  getAvailableTemplates(): HolidayTemplate[] {
    return [
      HolidayTemplate.USA_Federal,
      HolidayTemplate.UK_BankHolidays,
      HolidayTemplate.SaudiArabia_National
    ];
  }

  /**
   * Get holiday type options for UI
   */
  getHolidayTypes(): { value: HolidayType; label: string; description: string }[] {
    return [
      {
        value: HolidayType.OneTime,
        label: this.i18n.t('settings.holidays.types.oneTime'),
        description: this.i18n.t('settings.holidays.types.oneTime_description')
      },
      {
        value: HolidayType.Annual,
        label: this.i18n.t('settings.holidays.types.annual'),
        description: this.i18n.t('settings.holidays.types.annual_description')
      },
      {
        value: HolidayType.Monthly,
        label: this.i18n.t('settings.holidays.types.monthly'),
        description: this.i18n.t('settings.holidays.types.monthly_description')
      },
      {
        value: HolidayType.Floating,
        label: this.i18n.t('settings.holidays.types.floating'),
        description: this.i18n.t('settings.holidays.types.floating_description')
      }
    ];
  }

  /**
   * Get branches for dropdown selection
   */
  getBranches(): Observable<Array<{id: number, name: string}>> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/branches/all`).pipe(
      map(response => response.value as Array<{id: number, name: string}>),
      catchError(error => {
        console.error('Failed to load branches:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Validate holiday data before submission
   */
  validateHolidayData(request: CreatePublicHolidayRequest | UpdatePublicHolidayRequest): string[] {
    const errors: string[] = [];

    if (!request.name || request.name.trim().length === 0) {
      errors.push(this.i18n.t('settings.holidays.validation.nameRequired'));
    }

    if (request.holidayType === HolidayType.OneTime || request.holidayType === HolidayType.Annual) {
      if (!request.specificDate && (!request.month || !request.day)) {
        errors.push(this.i18n.t('settings.holidays.validation.specificDateOrMonthDayRequired'));
      }
    }

    if (request.holidayType === HolidayType.Floating) {
      if (!request.weekOfMonth || !request.dayOfWeek || !request.month) {
        errors.push(this.i18n.t('settings.holidays.validation.floatingFieldsRequired'));
      }
    }

    if (request.effectiveFromYear && request.effectiveToYear) {
      if (request.effectiveFromYear > request.effectiveToYear) {
        errors.push(this.i18n.t('settings.holidays.validation.invalidDateRange'));
      }
    }

    if (request.priority !== undefined && (request.priority < 1 || request.priority > 100)) {
      errors.push(this.i18n.t('settings.holidays.validation.priorityRange'));
    }

    return errors;
  }
}