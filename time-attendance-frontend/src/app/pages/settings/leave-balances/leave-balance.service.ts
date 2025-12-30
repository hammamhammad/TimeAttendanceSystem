import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import {
  LeaveBalance,
  LeaveBalanceSummary,
  LeaveTransaction,
  LeaveEntitlement,
  SetLeaveEntitlementRequest,
  ProcessMonthlyAccrualRequest,
  AdjustLeaveBalanceRequest,
  LeaveTransactionHistoryParams,
  PagedResult
} from '../../../shared/models/leave-balance.model';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';

/**
 * Service for managing leave balance and accrual operations.
 * Provides comprehensive leave management with balance tracking, entitlements, and transaction history.
 */
@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/leave-balances`;

  // Signal-based state management
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _currentBalance = signal<LeaveBalance | null>(null);
  private readonly _balanceSummary = signal<LeaveBalanceSummary | null>(null);
  private readonly _transactions = signal<LeaveTransaction[]>([]);
  private readonly _transactionsPagedResult = signal<PagedResult<LeaveTransaction> | null>(null);

  // Read-only signals for external consumption
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly currentBalance = this._currentBalance.asReadonly();
  readonly balanceSummary = this._balanceSummary.asReadonly();
  readonly transactions = this._transactions.asReadonly();
  readonly transactionsPagedResult = this._transactionsPagedResult.asReadonly();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  /**
   * Retrieves leave balance for a specific employee, vacation type, and year.
   * GET /api/v1/leave-balances/employee/{employeeId}/vacation-type/{vacationTypeId}/year/{year}
   */
  getEmployeeLeaveBalance(
    employeeId: number,
    vacationTypeId: number,
    year: number
  ): Observable<LeaveBalance | null> {
    this._loading.set(true);
    this._error.set(null);

    return this.http
      .get<LeaveBalance | null>(`${this.apiUrl}/employee/${employeeId}/vacation-type/${vacationTypeId}/year/${year}`)
      .pipe(
        map(balance => balance ? this.transformBalanceDates(balance) : null),
        tap(balance => {
          this._currentBalance.set(balance);
          this._loading.set(false);
        }),
        catchError(error => {
          this._error.set(error.error?.message || 'Failed to load leave balance');
          this._loading.set(false);
          this.notificationService.error('Failed to load leave balance');
          return throwError(() => error);
        })
      );
  }

  /**
   * Retrieves complete balance summary for an employee across all vacation types.
   * GET /api/v1/leave-balances/employee/{employeeId}/summary/{year}
   */
  getLeaveBalanceSummary(employeeId: number, year: number): Observable<LeaveBalanceSummary> {
    this._loading.set(true);
    this._error.set(null);

    return this.http
      .get<LeaveBalanceSummary>(`${this.apiUrl}/employee/${employeeId}/summary/${year}`)
      .pipe(
        map(summary => this.transformSummaryDates(summary)),
        tap(summary => {
          this._balanceSummary.set(summary);
          this._loading.set(false);
        }),
        catchError(error => {
          this._error.set(error.error?.message || 'Failed to load balance summary');
          this._loading.set(false);
          this.notificationService.error('Failed to load balance summary');
          return throwError(() => error);
        })
      );
  }

  /**
   * Retrieves paginated leave transaction history for an employee.
   * GET /api/v1/leave-balances/employee/{employeeId}/transactions
   */
  getLeaveTransactionHistory(
    params: LeaveTransactionHistoryParams
  ): Observable<PagedResult<LeaveTransaction>> {
    this._loading.set(true);
    this._error.set(null);

    let httpParams = new HttpParams();

    if (params.vacationTypeId) {
      httpParams = httpParams.set('vacationTypeId', params.vacationTypeId.toString());
    }
    if (params.year) {
      httpParams = httpParams.set('year', params.year.toString());
    }
    if (params.pageNumber) {
      httpParams = httpParams.set('pageNumber', params.pageNumber.toString());
    }
    if (params.pageSize) {
      httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }

    return this.http
      .get<PagedResult<LeaveTransaction>>(
        `${this.apiUrl}/employee/${params.employeeId}/transactions`,
        { params: httpParams }
      )
      .pipe(
        map(result => ({
          ...result,
          items: result.items.map(transaction => this.transformTransactionDates(transaction))
        })),
        tap(result => {
          this._transactions.set(result.items);
          this._transactionsPagedResult.set(result);
          this._loading.set(false);
        }),
        catchError(error => {
          this._error.set(error.error?.message || 'Failed to load transaction history');
          this._loading.set(false);
          this.notificationService.error('Failed to load transaction history');
          return throwError(() => error);
        })
      );
  }

  /**
   * Sets or updates leave entitlement for an employee.
   * POST /api/v1/leave-balances/entitlements
   * Requires: LeaveEntitlementManagement policy
   */
  setLeaveEntitlement(request: SetLeaveEntitlementRequest): Observable<number> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<number>(`${this.apiUrl}/entitlements`, request).pipe(
      tap(entitlementId => {
        this._loading.set(false);
        this.notificationService.success('Leave entitlement set successfully');
      }),
      catchError(error => {
        this._loading.set(false);
        const errorMessage = error.error?.message || 'Failed to set leave entitlement';
        this._error.set(errorMessage);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Processes monthly leave accrual for employees.
   * POST /api/v1/leave-balances/accrual/process-monthly
   * Requires: LeaveAccrualManagement policy
   */
  processMonthlyAccrual(request: ProcessMonthlyAccrualRequest): Observable<number> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<number>(`${this.apiUrl}/accrual/process-monthly`, request).pipe(
      tap(employeesProcessed => {
        this._loading.set(false);
        this.notificationService.success(
          `Monthly accrual processed successfully for ${employeesProcessed} employee(s)`
        );
      }),
      catchError(error => {
        this._loading.set(false);
        const errorMessage = error.error?.message || 'Failed to process monthly accrual';
        this._error.set(errorMessage);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Manually adjusts leave balance for an employee.
   * POST /api/v1/leave-balances/adjustments
   * Requires: LeaveBalanceAdjustment policy
   */
  adjustLeaveBalance(request: AdjustLeaveBalanceRequest): Observable<boolean> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<boolean>(`${this.apiUrl}/adjustments`, request).pipe(
      tap(() => {
        this._loading.set(false);
        this.notificationService.success('Leave balance adjusted successfully');
        // Refresh balance summary if available
        const summary = this._balanceSummary();
        if (summary && summary.employeeId === request.employeeId) {
          this.getLeaveBalanceSummary(request.employeeId, request.year).subscribe();
        }
      }),
      catchError(error => {
        this._loading.set(false);
        const errorMessage = error.error?.message || 'Failed to adjust leave balance';
        this._error.set(errorMessage);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Gets current year for balance queries.
   */
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Clears all cached balance data.
   */
  clearBalanceData(): void {
    this._currentBalance.set(null);
    this._balanceSummary.set(null);
    this._transactions.set([]);
    this._transactionsPagedResult.set(null);
    this._error.set(null);
  }

  /**
   * Refreshes the current balance summary without changing parameters.
   */
  refreshBalanceSummary(): void {
    const summary = this._balanceSummary();
    if (summary) {
      this.getLeaveBalanceSummary(summary.employeeId, summary.year).subscribe();
    }
  }

  /**
   * Transforms date strings to Date objects in balance data.
   */
  private transformBalanceDates(balance: LeaveBalance): LeaveBalance {
    return {
      ...balance,
      effectiveStartDate: balance.effectiveStartDate || null,
      effectiveEndDate: balance.effectiveEndDate || null,
      lastAccrualDate: balance.lastAccrualDate || null
    };
  }

  /**
   * Transforms date strings to Date objects in balance summary.
   */
  private transformSummaryDates(summary: LeaveBalanceSummary): LeaveBalanceSummary {
    return {
      ...summary,
      vacationTypeBalances: summary.vacationTypeBalances.map(vtb => ({
        ...vtb,
        lastAccrualDate: vtb.lastAccrualDate || null
      }))
    };
  }

  /**
   * Transforms date strings to Date objects in transaction data.
   */
  private transformTransactionDates(transaction: LeaveTransaction): LeaveTransaction {
    return {
      ...transaction,
      transactionDate: transaction.transactionDate
    };
  }

  /**
   * Navigates to a specific page in transaction history.
   */
  goToTransactionPage(employeeId: number, page: number): void {
    const currentResult = this._transactionsPagedResult();
    if (currentResult && page >= 1 && page <= currentResult.totalPages) {
      const currentParams: LeaveTransactionHistoryParams = {
        employeeId,
        pageNumber: page,
        pageSize: currentResult.pageSize
      };
      this.getLeaveTransactionHistory(currentParams).subscribe();
    }
  }

  /**
   * Changes page size for transaction history.
   */
  changeTransactionPageSize(employeeId: number, newPageSize: number): void {
    const params: LeaveTransactionHistoryParams = {
      employeeId,
      pageNumber: 1,
      pageSize: newPageSize
    };
    this.getLeaveTransactionHistory(params).subscribe();
  }
}
