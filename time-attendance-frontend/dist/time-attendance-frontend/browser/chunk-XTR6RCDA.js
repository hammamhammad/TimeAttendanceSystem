import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import {
  environment
} from "./chunk-TNEZPYQG.js";
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
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/employee-vacations/employee-vacations.service.ts
var _EmployeeVacationsService = class _EmployeeVacationsService {
  http;
  notificationService;
  apiUrl = `${environment.apiUrl}/api/v1/employee-vacations`;
  // Signal-based state management
  _vacations = signal([], ...ngDevMode ? [{ debugName: "_vacations" }] : []);
  _loading = signal(false, ...ngDevMode ? [{ debugName: "_loading" }] : []);
  _error = signal(null, ...ngDevMode ? [{ debugName: "_error" }] : []);
  _pagedResult = signal(null, ...ngDevMode ? [{ debugName: "_pagedResult" }] : []);
  // Read-only signals for external consumption
  vacations = this._vacations.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  pagedResult = this._pagedResult.asReadonly();
  // Computed signals for derived state
  totalPages = signal(() => {
    const result = this._pagedResult();
    if (!result || result.pageSize === 0)
      return 1;
    return Math.ceil(result.totalCount / result.pageSize);
  }, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  hasNextPage = signal(() => {
    const result = this._pagedResult();
    return result ? result.page < this.totalPages()() : false;
  }, ...ngDevMode ? [{ debugName: "hasNextPage" }] : []);
  hasPreviousPage = signal(() => {
    const result = this._pagedResult();
    return result ? result.page > 1 : false;
  }, ...ngDevMode ? [{ debugName: "hasPreviousPage" }] : []);
  constructor(http, notificationService) {
    this.http = http;
    this.notificationService = notificationService;
  }
  /**
   * Retrieves employee vacation records with filtering and pagination.
   */
  getVacations(params) {
    this._loading.set(true);
    this._error.set(null);
    let httpParams = new HttpParams();
    if (params) {
      if (params.employeeId)
        httpParams = httpParams.set("employeeId", params.employeeId.toString());
      if (params.vacationTypeId)
        httpParams = httpParams.set("vacationTypeId", params.vacationTypeId.toString());
      if (params.startDate)
        httpParams = httpParams.set("startDate", params.startDate.toISOString());
      if (params.endDate)
        httpParams = httpParams.set("endDate", params.endDate.toISOString());
      if (params.isApproved !== void 0)
        httpParams = httpParams.set("isApproved", params.isApproved.toString());
      if (params.isCurrentlyActive !== void 0)
        httpParams = httpParams.set("isCurrentlyActive", params.isCurrentlyActive.toString());
      if (params.isUpcoming !== void 0)
        httpParams = httpParams.set("isUpcoming", params.isUpcoming.toString());
      if (params.searchTerm)
        httpParams = httpParams.set("searchTerm", params.searchTerm);
      if (params.page)
        httpParams = httpParams.set("page", params.page.toString());
      if (params.pageSize)
        httpParams = httpParams.set("pageSize", params.pageSize.toString());
      if (params.sortBy)
        httpParams = httpParams.set("sortBy", params.sortBy);
      if (params.sortDescending)
        httpParams = httpParams.set("sortDescending", params.sortDescending.toString());
    }
    return this.http.get(this.apiUrl, { params: httpParams }).pipe(map((result) => __spreadProps(__spreadValues({}, result), {
      items: result.items.map((item) => this.transformDates(item))
    })), tap((result) => {
      this._vacations.set(result.items);
      this._pagedResult.set(result);
      this._loading.set(false);
    }), catchError((error) => {
      this._error.set(error.error?.message || "Failed to load vacations");
      this._loading.set(false);
      this.notificationService.error("Failed to load employee vacations");
      return throwError(() => error);
    }));
  }
  /**
   * Retrieves a specific employee vacation by ID.
   */
  getVacationById(id) {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(map((vacation) => this.transformDates(vacation)), catchError((error) => {
      this.notificationService.error("Failed to load vacation details");
      return throwError(() => error);
    }));
  }
  /**
   * Creates a new employee vacation record.
   */
  createVacation(request) {
    this._loading.set(true);
    return this.http.post(this.apiUrl, request).pipe(tap((vacationId) => {
      this._loading.set(false);
      this.notificationService.success("Vacation created successfully");
      this.refreshVacations();
    }), catchError((error) => {
      this._loading.set(false);
      const errorMessage = error.error?.message || "Failed to create vacation";
      this._error.set(errorMessage);
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    }));
  }
  /**
   * Updates an existing employee vacation record.
   */
  updateVacation(id, request) {
    this._loading.set(true);
    return this.http.put(`${this.apiUrl}/${id}`, request).pipe(tap(() => {
      this._loading.set(false);
      this.notificationService.success("Vacation updated successfully");
      this.refreshVacations();
    }), catchError((error) => {
      this._loading.set(false);
      const errorMessage = error.error?.message || "Failed to update vacation";
      this._error.set(errorMessage);
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    }));
  }
  /**
   * Deletes an employee vacation record.
   */
  deleteVacation(id) {
    this._loading.set(true);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(tap(() => {
      this._loading.set(false);
      this.notificationService.success("Vacation deleted successfully");
      const currentVacations = this._vacations();
      this._vacations.set(currentVacations.filter((v) => v.id !== id));
      const currentResult = this._pagedResult();
      if (currentResult) {
        this._pagedResult.set(__spreadProps(__spreadValues({}, currentResult), {
          totalCount: currentResult.totalCount - 1
        }));
      }
    }), catchError((error) => {
      this._loading.set(false);
      const errorMessage = error.error?.message || "Failed to delete vacation";
      this._error.set(errorMessage);
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    }));
  }
  /**
   * Toggles the approval status of a vacation record.
   */
  toggleVacationStatus(id) {
    return this.http.patch(`${this.apiUrl}/${id}/toggle-status`, {}).pipe(tap(() => {
      this.notificationService.success("Vacation status updated successfully");
      const currentVacations = this._vacations();
      const updatedVacations = currentVacations.map((v) => v.id === id ? __spreadProps(__spreadValues({}, v), { isApproved: !v.isApproved }) : v);
      this._vacations.set(updatedVacations);
    }), catchError((error) => {
      const errorMessage = error.error?.message || "Failed to update vacation status";
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    }));
  }
  /**
   * Retrieves vacation calendar data for display.
   */
  getVacationCalendar(startDate, endDate, employeeIds) {
    let params = new HttpParams().set("startDate", startDate.toISOString()).set("endDate", endDate.toISOString());
    if (employeeIds && employeeIds.length > 0) {
      employeeIds.forEach((id) => {
        params = params.append("employeeIds", id.toString());
      });
    }
    return this.http.get(`${this.apiUrl}/calendar`, { params }).pipe(map((items) => items.map((item) => __spreadProps(__spreadValues({}, item), {
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate)
    }))), catchError((error) => {
      this.notificationService.error("Failed to load vacation calendar");
      return throwError(() => error);
    }));
  }
  /**
   * Checks for vacation conflicts for a given employee and date range.
   */
  checkVacationConflicts(employeeId, startDate, endDate, excludeId) {
    return this.getVacations({ employeeId }).pipe(map((result) => {
      const conflictingVacations = result.items.filter((vacation) => {
        if (excludeId && vacation.id === excludeId) {
          return false;
        }
        return vacation.startDate <= endDate && vacation.endDate >= startDate;
      });
      return {
        hasConflict: conflictingVacations.length > 0,
        conflictingVacations,
        message: conflictingVacations.length > 0 ? `Found ${conflictingVacations.length} overlapping vacation(s)` : "No conflicts found"
      };
    }));
  }
  /**
   * Refreshes the current vacation list without changing filters.
   */
  refreshVacations() {
    const currentResult = this._pagedResult();
    if (currentResult) {
      this.getVacations({
        page: currentResult.page,
        pageSize: currentResult.pageSize
      }).subscribe();
    } else {
      this.getVacations().subscribe();
    }
  }
  /**
   * Clears all vacation data and resets state.
   */
  clearVacations() {
    this._vacations.set([]);
    this._pagedResult.set(null);
    this._error.set(null);
  }
  /**
   * Transforms date strings to Date objects in vacation data.
   */
  transformDates(vacation) {
    return __spreadProps(__spreadValues({}, vacation), {
      startDate: new Date(vacation.startDate),
      endDate: new Date(vacation.endDate),
      createdAtUtc: new Date(vacation.createdAtUtc),
      modifiedAtUtc: vacation.modifiedAtUtc ? new Date(vacation.modifiedAtUtc) : void 0
    });
  }
  /**
   * Applies filters to the vacation list.
   */
  applyFilters(filters) {
    const currentResult = this._pagedResult();
    this.getVacations(__spreadProps(__spreadValues({}, filters), {
      page: 1,
      // Reset to first page when applying filters
      pageSize: currentResult?.pageSize || 20
    })).subscribe();
  }
  /**
   * Changes the page size and refreshes data.
   */
  changePageSize(newPageSize) {
    this.getVacations({
      page: 1,
      // Reset to first page when changing page size
      pageSize: newPageSize
    }).subscribe();
  }
  /**
   * Navigates to a specific page.
   */
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages()()) {
      const currentResult = this._pagedResult();
      this.getVacations({
        page,
        pageSize: currentResult?.pageSize || 20
      }).subscribe();
    }
  }
  /**
   * Gets vacation summary statistics for dashboard/reporting.
   */
  getVacationStatistics(filters) {
    return this.getVacations(__spreadProps(__spreadValues({}, filters), { pageSize: 1e3 })).pipe(map((result) => {
      const vacations = result.items;
      const totalVacations = vacations.length;
      const approvedVacations = vacations.filter((v) => v.isApproved).length;
      const activeVacations = vacations.filter((v) => v.isCurrentlyActive).length;
      const upcomingVacations = vacations.filter((v) => v.isUpcoming).length;
      const totalDays = vacations.reduce((sum, v) => sum + v.totalDays, 0);
      return {
        totalVacations,
        approvedVacations,
        pendingVacations: totalVacations - approvedVacations,
        activeVacations,
        upcomingVacations,
        totalDays,
        averageDaysPerVacation: totalVacations > 0 ? Math.round(totalDays / totalVacations * 10) / 10 : 0
      };
    }));
  }
  /**
   * Gets available employees for filtering
   */
  getEmployees() {
    return this.http.get(`${environment.apiUrl}/api/v1/employees/dropdown`).pipe(catchError((error) => {
      this.notificationService.error("Failed to load employees");
      return throwError(() => error);
    }));
  }
  /**
   * Gets available vacation types for filtering
   */
  getVacationTypes() {
    return this.http.get(`${environment.apiUrl}/api/v1/vacation-types/dropdown`).pipe(catchError((error) => {
      this.notificationService.error("Failed to load vacation types");
      return throwError(() => error);
    }));
  }
  /**
   * Gets available branches for bulk assignment
   */
  getBranches() {
    return this.http.get(`${environment.apiUrl}/api/v1/branches/dropdown`).pipe(catchError((error) => {
      this.notificationService.error("Failed to load branches");
      return throwError(() => error);
    }));
  }
  /**
   * Gets available departments for bulk assignment
   */
  getDepartments() {
    return this.http.get(`${environment.apiUrl}/api/v1/departments/dropdown`).pipe(catchError((error) => {
      this.notificationService.error("Failed to load departments");
      return throwError(() => error);
    }));
  }
  /**
   * Gets employee count preview for bulk assignment
   */
  getEmployeeCountPreview(request) {
    let params = new HttpParams().set("assignmentType", request.assignmentType.toString());
    if (request.branchId) {
      params = params.set("branchId", request.branchId.toString());
    }
    if (request.departmentId) {
      params = params.set("departmentId", request.departmentId.toString());
    }
    return this.http.get(`${environment.apiUrl}/api/v1/employees/count-preview`, { params }).pipe(map((response) => response.count), catchError((error) => {
      this.notificationService.error("Failed to load employee count preview");
      return throwError(() => error);
    }));
  }
  /**
   * Creates bulk vacation assignments
   */
  createBulkVacations(request) {
    this._loading.set(true);
    return this.http.post(`${this.apiUrl}/bulk`, request).pipe(map((response) => response.value), tap(() => {
      this._loading.set(false);
      this.refreshVacations();
    }), catchError((error) => {
      this._loading.set(false);
      const errorMessage = error.error?.message || "Failed to create bulk vacations";
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    }));
  }
};
__name(_EmployeeVacationsService, "EmployeeVacationsService");
__publicField(_EmployeeVacationsService, "\u0275fac", /* @__PURE__ */ __name(function EmployeeVacationsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmployeeVacationsService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(NotificationService));
}, "EmployeeVacationsService_Factory"));
__publicField(_EmployeeVacationsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmployeeVacationsService, factory: _EmployeeVacationsService.\u0275fac, providedIn: "root" }));
var EmployeeVacationsService = _EmployeeVacationsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeVacationsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: NotificationService }], null);
})();

export {
  EmployeeVacationsService
};
//# sourceMappingURL=chunk-XTR6RCDA.js.map
