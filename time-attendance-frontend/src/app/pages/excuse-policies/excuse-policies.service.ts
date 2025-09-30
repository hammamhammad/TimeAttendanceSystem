import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ExcusePolicyDto,
  CreateExcusePolicyRequest,
  UpdateExcusePolicyRequest,
  ExcusePoliciesQueryParams,
  ExcusePolicyFilter,
  PagedResult
} from '../../shared/models/excuse-policy.model';

@Injectable({
  providedIn: 'root'
})
export class ExcusePoliciesService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/excuse-policies`;

  // Signals for state management
  private readonly _excusePolicies = signal<ExcusePolicyDto[]>([]);
  private readonly _pagedResult = signal<PagedResult<ExcusePolicyDto> | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _selectedExcusePolicy = signal<ExcusePolicyDto | null>(null);
  private readonly _currentFilter = signal<ExcusePolicyFilter>({});

  // Public readonly signals
  readonly excusePolicies = this._excusePolicies.asReadonly();
  readonly pagedResult = this._pagedResult.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly selectedExcusePolicy = this._selectedExcusePolicy.asReadonly();
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

  constructor(private http: HttpClient) {}

  /**
   * Get paginated excuse policies
   */
  getExcusePolicies(params: ExcusePoliciesQueryParams = {}): Observable<PagedResult<ExcusePolicyDto>> {
    this._loading.set(true);
    this._error.set(null);

    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('pageNumber', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.branchId) httpParams = httpParams.set('branchId', params.branchId.toString());
    if (params.isActive !== undefined) httpParams = httpParams.set('isActive', params.isActive.toString());

    return this.http.get<any>(this.baseUrl, { params: httpParams }).pipe(
      map(response => response.value as PagedResult<ExcusePolicyDto>),
      tap(result => {
        this._pagedResult.set(result);
        this._excusePolicies.set(result.items);
        this._loading.set(false);
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set(error.message || 'Failed to load excuse policies');
        return throwError(() => error);
      })
    );
  }

  /**
   * Get excuse policy by ID
   */
  getExcusePolicyById(id: number): Observable<ExcusePolicyDto> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.value as ExcusePolicyDto),
      tap(excusePolicy => {
        this._selectedExcusePolicy.set(excusePolicy);
        this._loading.set(false);
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set(error.error?.message || 'Failed to load excuse policy');
        return throwError(() => error);
      })
    );
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
   * Create new excuse policy
   */
  createExcusePolicy(request: CreateExcusePolicyRequest): Observable<number> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<any>(this.baseUrl, request).pipe(
      map(response => response.value as number),
      tap(() => {
        this._loading.set(false);
        // Refresh the list after successful creation
        this.refreshCurrentPage();
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set(error.error?.message || 'Failed to create excuse policy');
        return throwError(() => error);
      })
    );
  }

  /**
   * Update excuse policy
   */
  updateExcusePolicy(id: number, request: UpdateExcusePolicyRequest): Observable<boolean> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.put<any>(`${this.baseUrl}/${id}`, { ...request, id }).pipe(
      map(response => response.value as boolean),
      tap(() => {
        this._loading.set(false);
        // Refresh the list after successful update
        this.refreshCurrentPage();
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set(error.error?.message || 'Failed to update excuse policy');
        return throwError(() => error);
      })
    );
  }

  /**
   * Toggle excuse policy status
   */
  toggleExcusePolicyStatus(id: number): Observable<boolean> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.patch<any>(`${this.baseUrl}/${id}/toggle-status`, {}).pipe(
      map(response => response.value as boolean),
      tap(() => {
        this._loading.set(false);
        // Refresh the list after successful toggle
        this.refreshCurrentPage();
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set(error.error?.message || 'Failed to toggle excuse policy status');
        return throwError(() => error);
      })
    );
  }

  /**
   * Delete excuse policy
   */
  deleteExcusePolicy(id: number): Observable<boolean> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.value as boolean),
      tap(() => {
        this._loading.set(false);
        // Refresh the list after successful deletion
        this.refreshCurrentPage();
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set(error.error?.message || 'Failed to delete excuse policy');
        return throwError(() => error);
      })
    );
  }

  /**
   * Set current filter
   */
  setFilter(filter: ExcusePolicyFilter): void {
    this._currentFilter.set(filter);
  }

  /**
   * Clear current filter
   */
  clearFilter(): void {
    this._currentFilter.set({});
  }

  /**
   * Set selected excuse policy
   */
  setSelectedExcusePolicy(excusePolicy: ExcusePolicyDto | null): void {
    this._selectedExcusePolicy.set(excusePolicy);
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this._error.set(null);
  }

  /**
   * Refresh current page with current filter
   */
  private refreshCurrentPage(): void {
    const currentResult = this._pagedResult();
    const currentFilter = this._currentFilter();

    if (currentResult) {
      const params: ExcusePoliciesQueryParams = {
        page: currentResult.page,
        pageSize: currentResult.pageSize,
        ...currentFilter
      };

      this.getExcusePolicies(params).subscribe();
    }
  }

  /**
   * Reset service state
   */
  reset(): void {
    this._excusePolicies.set([]);
    this._pagedResult.set(null);
    this._loading.set(false);
    this._error.set(null);
    this._selectedExcusePolicy.set(null);
    this._currentFilter.set({});
  }
}