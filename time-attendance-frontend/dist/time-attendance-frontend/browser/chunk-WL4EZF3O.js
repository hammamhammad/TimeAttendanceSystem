import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import {
  environment
} from "./chunk-ZTCQ26FY.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  catchError,
  map,
  setClassMetadata,
  signal,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/leave-balances/leave-balance.service.ts
var _LeaveBalanceService = class _LeaveBalanceService {
  http;
  notificationService;
  apiUrl = `${environment.apiUrl}/api/v1/leave-balances`;
  // Signal-based state management
  _loading = signal(false, ...ngDevMode ? [{ debugName: "_loading" }] : []);
  _error = signal(null, ...ngDevMode ? [{ debugName: "_error" }] : []);
  _currentBalance = signal(null, ...ngDevMode ? [{ debugName: "_currentBalance" }] : []);
  _balanceSummary = signal(null, ...ngDevMode ? [{ debugName: "_balanceSummary" }] : []);
  _transactions = signal([], ...ngDevMode ? [{ debugName: "_transactions" }] : []);
  _transactionsPagedResult = signal(null, ...ngDevMode ? [{ debugName: "_transactionsPagedResult" }] : []);
  // Read-only signals for external consumption
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  currentBalance = this._currentBalance.asReadonly();
  balanceSummary = this._balanceSummary.asReadonly();
  transactions = this._transactions.asReadonly();
  transactionsPagedResult = this._transactionsPagedResult.asReadonly();
  constructor(http, notificationService) {
    this.http = http;
    this.notificationService = notificationService;
  }
  /**
   * Retrieves leave balance for a specific employee, vacation type, and year.
   * GET /api/v1/leave-balances/employee/{employeeId}/vacation-type/{vacationTypeId}/year/{year}
   */
  getEmployeeLeaveBalance(employeeId, vacationTypeId, year) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.get(`${this.apiUrl}/employee/${employeeId}/vacation-type/${vacationTypeId}/year/${year}`).pipe(map((balance) => balance ? this.transformBalanceDates(balance) : null), tap((balance) => {
      this._currentBalance.set(balance);
      this._loading.set(false);
    }), catchError((error) => {
      this._error.set(error.error?.message || "Failed to load leave balance");
      this._loading.set(false);
      this.notificationService.error("Failed to load leave balance");
      return throwError(() => error);
    }));
  }
  /**
   * Retrieves complete balance summary for an employee across all vacation types.
   * GET /api/v1/leave-balances/employee/{employeeId}/summary/{year}
   */
  getLeaveBalanceSummary(employeeId, year) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.get(`${this.apiUrl}/employee/${employeeId}/summary/${year}`).pipe(map((summary) => this.transformSummaryDates(summary)), tap((summary) => {
      this._balanceSummary.set(summary);
      this._loading.set(false);
    }), catchError((error) => {
      this._error.set(error.error?.message || "Failed to load balance summary");
      this._loading.set(false);
      this.notificationService.error("Failed to load balance summary");
      return throwError(() => error);
    }));
  }
  /**
   * Retrieves paginated leave transaction history for an employee.
   * GET /api/v1/leave-balances/employee/{employeeId}/transactions
   */
  getLeaveTransactionHistory(params) {
    this._loading.set(true);
    this._error.set(null);
    let httpParams = new HttpParams();
    if (params.vacationTypeId) {
      httpParams = httpParams.set("vacationTypeId", params.vacationTypeId.toString());
    }
    if (params.year) {
      httpParams = httpParams.set("year", params.year.toString());
    }
    if (params.pageNumber) {
      httpParams = httpParams.set("pageNumber", params.pageNumber.toString());
    }
    if (params.pageSize) {
      httpParams = httpParams.set("pageSize", params.pageSize.toString());
    }
    return this.http.get(`${this.apiUrl}/employee/${params.employeeId}/transactions`, { params: httpParams }).pipe(map((result) => __spreadProps(__spreadValues({}, result), {
      items: result.items.map((transaction) => this.transformTransactionDates(transaction))
    })), tap((result) => {
      this._transactions.set(result.items);
      this._transactionsPagedResult.set(result);
      this._loading.set(false);
    }), catchError((error) => {
      this._error.set(error.error?.message || "Failed to load transaction history");
      this._loading.set(false);
      this.notificationService.error("Failed to load transaction history");
      return throwError(() => error);
    }));
  }
  /**
   * Sets or updates leave entitlement for an employee.
   * POST /api/v1/leave-balances/entitlements
   * Requires: LeaveEntitlementManagement policy
   */
  setLeaveEntitlement(request) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.post(`${this.apiUrl}/entitlements`, request).pipe(tap((entitlementId) => {
      this._loading.set(false);
      this.notificationService.success("Leave entitlement set successfully");
    }), catchError((error) => {
      this._loading.set(false);
      const errorMessage = error.error?.message || "Failed to set leave entitlement";
      this._error.set(errorMessage);
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    }));
  }
  /**
   * Processes monthly leave accrual for employees.
   * POST /api/v1/leave-balances/accrual/process-monthly
   * Requires: LeaveAccrualManagement policy
   */
  processMonthlyAccrual(request) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.post(`${this.apiUrl}/accrual/process-monthly`, request).pipe(tap((employeesProcessed) => {
      this._loading.set(false);
      this.notificationService.success(`Monthly accrual processed successfully for ${employeesProcessed} employee(s)`);
    }), catchError((error) => {
      this._loading.set(false);
      const errorMessage = error.error?.message || "Failed to process monthly accrual";
      this._error.set(errorMessage);
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    }));
  }
  /**
   * Manually adjusts leave balance for an employee.
   * POST /api/v1/leave-balances/adjustments
   * Requires: LeaveBalanceAdjustment policy
   */
  adjustLeaveBalance(request) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.post(`${this.apiUrl}/adjustments`, request).pipe(tap(() => {
      this._loading.set(false);
      this.notificationService.success("Leave balance adjusted successfully");
      const summary = this._balanceSummary();
      if (summary && summary.employeeId === request.employeeId) {
        this.getLeaveBalanceSummary(request.employeeId, request.year).subscribe();
      }
    }), catchError((error) => {
      this._loading.set(false);
      const errorMessage = error.error?.message || "Failed to adjust leave balance";
      this._error.set(errorMessage);
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    }));
  }
  /**
   * Gets current year for balance queries.
   */
  getCurrentYear() {
    return (/* @__PURE__ */ new Date()).getFullYear();
  }
  /**
   * Clears all cached balance data.
   */
  clearBalanceData() {
    this._currentBalance.set(null);
    this._balanceSummary.set(null);
    this._transactions.set([]);
    this._transactionsPagedResult.set(null);
    this._error.set(null);
  }
  /**
   * Refreshes the current balance summary without changing parameters.
   */
  refreshBalanceSummary() {
    const summary = this._balanceSummary();
    if (summary) {
      this.getLeaveBalanceSummary(summary.employeeId, summary.year).subscribe();
    }
  }
  /**
   * Transforms date strings to Date objects in balance data.
   */
  transformBalanceDates(balance) {
    return __spreadProps(__spreadValues({}, balance), {
      effectiveStartDate: balance.effectiveStartDate || null,
      effectiveEndDate: balance.effectiveEndDate || null,
      lastAccrualDate: balance.lastAccrualDate || null
    });
  }
  /**
   * Transforms date strings to Date objects in balance summary.
   */
  transformSummaryDates(summary) {
    return __spreadProps(__spreadValues({}, summary), {
      vacationTypeBalances: summary.vacationTypeBalances.map((vtb) => __spreadProps(__spreadValues({}, vtb), {
        lastAccrualDate: vtb.lastAccrualDate || null
      }))
    });
  }
  /**
   * Transforms date strings to Date objects in transaction data.
   */
  transformTransactionDates(transaction) {
    return __spreadProps(__spreadValues({}, transaction), {
      transactionDate: transaction.transactionDate
    });
  }
  /**
   * Navigates to a specific page in transaction history.
   */
  goToTransactionPage(employeeId, page) {
    const currentResult = this._transactionsPagedResult();
    if (currentResult && page >= 1 && page <= currentResult.totalPages) {
      const currentParams = {
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
  changeTransactionPageSize(employeeId, newPageSize) {
    const params = {
      employeeId,
      pageNumber: 1,
      pageSize: newPageSize
    };
    this.getLeaveTransactionHistory(params).subscribe();
  }
};
__name(_LeaveBalanceService, "LeaveBalanceService");
__publicField(_LeaveBalanceService, "\u0275fac", /* @__PURE__ */ __name(function LeaveBalanceService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LeaveBalanceService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(NotificationService));
}, "LeaveBalanceService_Factory"));
__publicField(_LeaveBalanceService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LeaveBalanceService, factory: _LeaveBalanceService.\u0275fac, providedIn: "root" }));
var LeaveBalanceService = _LeaveBalanceService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeaveBalanceService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: NotificationService }], null);
})();

export {
  LeaveBalanceService
};
//# sourceMappingURL=chunk-WL4EZF3O.js.map
