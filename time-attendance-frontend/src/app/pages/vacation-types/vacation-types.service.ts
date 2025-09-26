import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  VacationTypeDto,
  VacationTypeDetailDto,
  CreateVacationTypeRequest,
  UpdateVacationTypeRequest,
  VacationTypesQueryParams,
  VacationTypeFilter,
  PagedResult
} from '../../shared/models/vacation-type.model';

@Injectable({
  providedIn: 'root'
})
export class VacationTypesService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/vacation-types`;

  // Signals for state management
  private readonly _vacationTypes = signal<VacationTypeDto[]>([]);
  private readonly _pagedResult = signal<PagedResult<VacationTypeDto> | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _selectedVacationType = signal<VacationTypeDetailDto | null>(null);
  private readonly _currentFilter = signal<VacationTypeFilter>({});

  // Public readonly signals
  readonly vacationTypes = this._vacationTypes.asReadonly();
  readonly pagedResult = this._pagedResult.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly selectedVacationType = this._selectedVacationType.asReadonly();
  readonly currentFilter = this._currentFilter.asReadonly();

  // Computed signals
  readonly totalItems = computed(() => this._pagedResult()?.totalCount ?? 0);
  readonly totalPages = computed(() => {
    const result = this._pagedResult();
    if (!result || result.pageSize === 0) return 1;
    return Math.ceil(result.totalCount / result.pageSize);
  });
  readonly hasNextPage = computed(() => {
    const result = this._pagedResult();
    if (!result) return false;
    return result.page < this.totalPages();
  });
  readonly hasPreviousPage = computed(() => {
    const result = this._pagedResult();
    if (!result) return false;
    return result.page > 1;
  });

  // Filtered vacation types based on current filter
  readonly filteredVacationTypes = computed(() => {
    const types = this._vacationTypes();
    const filter = this._currentFilter();

    if (!filter) return types;

    return types.filter(vacationType => {
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        const matchesName = vacationType.name.toLowerCase().includes(searchLower);
        const matchesArabicName = vacationType.nameAr?.toLowerCase().includes(searchLower) ?? false;
        if (!matchesName && !matchesArabicName) return false;
      }

      if (filter.branchId !== undefined && vacationType.branchId !== filter.branchId) {
        return false;
      }

      if (filter.isActive !== undefined && vacationType.isActive !== filter.isActive) {
        return false;
      }


      return true;
    });
  });

  constructor(private http: HttpClient) {}

  /**
   * Retrieves vacation types with optional filtering and pagination
   */
  getVacationTypes(params: VacationTypesQueryParams = {}): Observable<PagedResult<VacationTypeDto>> {
    this._loading.set(true);
    this._error.set(null);

    let httpParams = new HttpParams();

    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.branchId) httpParams = httpParams.set('branchId', params.branchId.toString());
    if (params.isActive !== undefined) httpParams = httpParams.set('isActive', params.isActive.toString());

    return this.http.get<PagedResult<VacationTypeDto>>(this.baseUrl, { params: httpParams }).pipe(
      tap(result => {
        this._pagedResult.set(result);
        this._vacationTypes.set(result.items);
        this._loading.set(false);
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set('Failed to load vacation types');
        console.error('Error loading vacation types:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Retrieves a specific vacation type by ID
   */
  getVacationTypeById(id: number, includeStatistics: boolean = false): Observable<VacationTypeDetailDto> {
    this._loading.set(true);
    this._error.set(null);

    let httpParams = new HttpParams();
    if (includeStatistics) {
      httpParams = httpParams.set('includeStatistics', 'true');
    }

    return this.http.get<VacationTypeDetailDto>(`${this.baseUrl}/${id}`, { params: httpParams }).pipe(
      tap(vacationType => {
        this._selectedVacationType.set(vacationType);
        this._loading.set(false);
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set('Failed to load vacation type details');
        console.error('Error loading vacation type:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Creates a new vacation type
   */
  createVacationType(request: CreateVacationTypeRequest): Observable<{ id: number }> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<{ id: number }>(this.baseUrl, request).pipe(
      tap(() => {
        this._loading.set(false);
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set('Failed to create vacation type');
        console.error('Error creating vacation type:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Updates an existing vacation type
   */
  updateVacationType(id: number, request: UpdateVacationTypeRequest): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.put<void>(`${this.baseUrl}/${id}`, request).pipe(
      tap(() => {
        this._loading.set(false);
        // Update the vacation type in the local state if it exists
        const currentTypes = this._vacationTypes();
        const updatedTypes = currentTypes.map(vt =>
          vt.id === id ? { ...vt, ...request, modifiedAtUtc: new Date().toISOString() } : vt
        );
        this._vacationTypes.set(updatedTypes);
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set('Failed to update vacation type');
        console.error('Error updating vacation type:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Deletes a vacation type
   */
  deleteVacationType(id: number): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this._loading.set(false);
        // Remove the vacation type from local state
        const currentTypes = this._vacationTypes();
        const filteredTypes = currentTypes.filter(vt => vt.id !== id);
        this._vacationTypes.set(filteredTypes);

        // Update paged result
        const currentResult = this._pagedResult();
        if (currentResult) {
          this._pagedResult.set({
            ...currentResult,
            items: filteredTypes,
            totalCount: currentResult.totalCount - 1
          });
        }
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set('Failed to delete vacation type');
        console.error('Error deleting vacation type:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Toggles the active status of a vacation type
   */
  toggleVacationTypeStatus(id: number): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.patch<void>(`${this.baseUrl}/${id}/toggle-status`, {}).pipe(
      tap(() => {
        this._loading.set(false);
        // Toggle the status in local state
        const currentTypes = this._vacationTypes();
        const updatedTypes = currentTypes.map(vt =>
          vt.id === id ? { ...vt, isActive: !vt.isActive, modifiedAtUtc: new Date().toISOString() } : vt
        );
        this._vacationTypes.set(updatedTypes);
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set('Failed to toggle vacation type status');
        console.error('Error toggling vacation type status:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Updates the current filter
   */
  updateFilter(filter: VacationTypeFilter): void {
    this._currentFilter.set(filter);
  }

  /**
   * Clears the current filter
   */
  clearFilter(): void {
    this._currentFilter.set({});
  }

  /**
   * Clears the selected vacation type
   */
  clearSelectedVacationType(): void {
    this._selectedVacationType.set(null);
  }

  /**
   * Clears any error state
   */
  clearError(): void {
    this._error.set(null);
  }

  /**
   * Gets all branches for vacation type forms
   */
  getBranches(): Observable<any[]> {
    const params = new HttpParams()
      .set('pageSize', '1000')
      .set('isActive', 'true');

    return this.http.get<PagedResult<any>>(`${environment.apiUrl}/api/v1/branches`, { params })
      .pipe(
        map((result: PagedResult<any>) => result.items || []),
        catchError(error => {
          console.error('Error loading branches:', error);
          return throwError(() => error);
        })
      );
  }
}