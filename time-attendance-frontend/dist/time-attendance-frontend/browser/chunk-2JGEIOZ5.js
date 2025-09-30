import {
  ExcuseStatus
} from "./chunk-MMUPQRFG.js";
import {
  environment
} from "./chunk-5UND7ZIG.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  Observable,
  catchError,
  finalize,
  of,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/employee-excuses/employee-excuses.service.ts
var _EmployeeExcusesService = class _EmployeeExcusesService {
  http;
  apiUrl = `${environment.apiUrl}/api/v1/employee-excuses`;
  // Signals for state management
  employeeExcuses = signal([], ...ngDevMode ? [{ debugName: "employeeExcuses" }] : []);
  pagedResult = signal(null, ...ngDevMode ? [{ debugName: "pagedResult" }] : []);
  statistics = signal(null, ...ngDevMode ? [{ debugName: "statistics" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  constructor(http) {
    this.http = http;
  }
  /**
   * Get employee excuses with filtering and pagination
   */
  getEmployeeExcuses(params = {}) {
    this.loading.set(true);
    this.error.set(null);
    let httpParams = new HttpParams();
    if (params.page)
      httpParams = httpParams.set("pageNumber", params.page.toString());
    if (params.pageSize)
      httpParams = httpParams.set("pageSize", params.pageSize.toString());
    if (params.employeeId)
      httpParams = httpParams.set("employeeId", params.employeeId.toString());
    if (params.branchId)
      httpParams = httpParams.set("branchId", params.branchId.toString());
    if (params.status)
      httpParams = httpParams.set("approvalStatus", params.status);
    if (params.fromDate)
      httpParams = httpParams.set("startDate", params.fromDate);
    if (params.toDate)
      httpParams = httpParams.set("endDate", params.toDate);
    return this.http.get(this.apiUrl, { params: httpParams }).pipe(tap((apiResponse) => {
      const result = apiResponse.isSuccess ? apiResponse.value : { items: [], totalCount: 0, pageNumber: 1, pageSize: 10, totalPages: 0 };
      const mappedItems = (result.items || []).map((item) => __spreadProps(__spreadValues({}, item), {
        status: this.mapApprovalStatusToExcuseStatus(item.approvalStatus || item.approvalStatusDisplay),
        submissionDate: item.createdAtUtc,
        departmentName: item.departmentName || "",
        branchName: item.branchName || ""
      }));
      this.employeeExcuses.set(mappedItems);
      this.pagedResult.set({
        items: mappedItems,
        totalCount: result.totalCount || 0,
        page: result.pageNumber || 1,
        pageSize: result.pageSize || 10,
        totalPages: result.totalPages || 0
      });
    }), catchError((error) => {
      this.error.set("Failed to load employee excuses");
      console.error("Error loading employee excuses:", error);
      return of({
        items: [],
        totalCount: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0
      });
    }), finalize(() => this.loading.set(false)));
  }
  /**
   * Get employee excuse by ID
   */
  getEmployeeExcuseById(id) {
    this.loading.set(true);
    this.error.set(null);
    return new Observable((observer) => {
      this.http.get(`${this.apiUrl}/${id}`).pipe(catchError((error) => {
        this.error.set("Failed to load employee excuse details");
        console.error("Error loading employee excuse:", error);
        observer.next(null);
        observer.complete();
        return of(null);
      }), finalize(() => this.loading.set(false))).subscribe((apiResponse) => {
        if (apiResponse && apiResponse.isSuccess && apiResponse.value) {
          const item = apiResponse.value;
          const mappedItem = {
            id: item.id,
            employeeId: item.employeeId,
            employeeName: item.employeeName || "",
            employeeNumber: item.employeeNumber || "",
            departmentName: item.departmentName || "",
            branchName: item.branchName || "",
            excuseDate: item.excuseDate,
            excuseType: item.excuseType,
            startTime: item.startTime,
            endTime: item.endTime,
            durationHours: item.durationHours || 0,
            reason: item.reason || "",
            status: this.mapApprovalStatusToExcuseStatus(item.approvalStatus || item.approvalStatusDisplay),
            submissionDate: item.createdAtUtc,
            reviewDate: item.reviewedAtUtc,
            reviewerId: item.reviewedByUserId,
            reviewerName: item.reviewerName,
            reviewerComments: item.reviewerComments,
            attachmentUrl: item.attachmentUrl,
            isWithinPolicy: true,
            policyViolationReason: void 0
          };
          observer.next(mappedItem);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }
  /**
   * Create new employee excuse request
   */
  createEmployeeExcuse(request) {
    this.loading.set(true);
    this.error.set(null);
    const formData = new FormData();
    formData.append("employeeId", request.employeeId.toString());
    formData.append("excuseDate", request.excuseDate);
    formData.append("startTime", request.startTime);
    formData.append("endTime", request.endTime);
    formData.append("reason", request.reason);
    formData.append("excuseType", request.excuseType || "PersonalExcuse");
    if (request.attachmentFile) {
      formData.append("attachmentFile", request.attachmentFile);
    }
    return this.http.post(this.apiUrl, formData).pipe(tap(() => {
      this.refreshCurrentList();
    }), catchError((error) => {
      this.error.set("Failed to create employee excuse request");
      console.error("Error creating employee excuse:", error);
      throw error;
    }), finalize(() => this.loading.set(false)));
  }
  /**
   * Update employee excuse request
   */
  updateEmployeeExcuse(id, request) {
    this.loading.set(true);
    this.error.set(null);
    const formData = new FormData();
    formData.append("excuseDate", request.excuseDate);
    formData.append("excuseType", request.excuseType || "PersonalExcuse");
    formData.append("startTime", request.startTime);
    formData.append("endTime", request.endTime);
    formData.append("reason", request.reason);
    formData.append("approvalStatus", request.approvalStatus || "Pending");
    if (request.reviewerComments) {
      formData.append("reviewerComments", request.reviewerComments);
    }
    if (request.attachmentFile) {
      formData.append("attachmentFile", request.attachmentFile);
    }
    return this.http.put(`${this.apiUrl}/${id}`, formData).pipe(tap(() => {
      this.refreshCurrentList();
    }), catchError((error) => {
      this.error.set("Failed to update employee excuse request");
      console.error("Error updating employee excuse:", error);
      throw error;
    }), finalize(() => this.loading.set(false)));
  }
  /**
   * Review employee excuse (approve/reject)
   */
  reviewEmployeeExcuse(id, request) {
    this.loading.set(true);
    this.error.set(null);
    return this.http.post(`${this.apiUrl}/${id}/review`, request).pipe(tap(() => {
      this.refreshCurrentList();
    }), catchError((error) => {
      this.error.set("Failed to review employee excuse");
      console.error("Error reviewing employee excuse:", error);
      throw error;
    }), finalize(() => this.loading.set(false)));
  }
  /**
   * Cancel employee excuse request
   */
  cancelEmployeeExcuse(id) {
    this.loading.set(true);
    this.error.set(null);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(tap(() => {
      this.refreshCurrentList();
    }), catchError((error) => {
      this.error.set("Failed to cancel employee excuse");
      console.error("Error cancelling employee excuse:", error);
      throw error;
    }), finalize(() => this.loading.set(false)));
  }
  /**
   * Get employee excuse statistics
   */
  getEmployeeExcuseStatistics(employeeId) {
    this.loading.set(true);
    this.error.set(null);
    let httpParams = new HttpParams();
    if (employeeId) {
      httpParams = httpParams.set("employeeId", employeeId.toString());
    }
    return this.http.get(`${this.apiUrl}/statistics`, { params: httpParams }).pipe(tap((stats) => {
      this.statistics.set(stats);
    }), catchError((error) => {
      this.error.set("Failed to load employee excuse statistics");
      console.error("Error loading statistics:", error);
      return of({
        totalRequests: 0,
        pendingRequests: 0,
        approvedRequests: 0,
        rejectedRequests: 0,
        currentMonthHours: 0,
        remainingMonthlyHours: 0,
        monthlyLimit: 0
      });
    }), finalize(() => this.loading.set(false)));
  }
  /**
   * Download attachment file
   */
  downloadAttachment(id) {
    return this.http.get(`${this.apiUrl}/${id}/attachment`, {
      responseType: "blob"
    }).pipe(catchError((error) => {
      this.error.set("Failed to download attachment");
      console.error("Error downloading attachment:", error);
      throw error;
    }));
  }
  /**
   * Get available excuse statuses for filtering
   */
  getExcuseStatuses() {
    return Object.values(ExcuseStatus);
  }
  /**
   * Refresh the current list (used after mutations)
   */
  refreshCurrentList() {
    const currentResult = this.pagedResult();
    if (currentResult) {
      this.getEmployeeExcuses({
        page: currentResult.page,
        pageSize: currentResult.pageSize
      }).subscribe();
    } else {
      this.getEmployeeExcuses({
        page: 1,
        pageSize: 10
      }).subscribe();
    }
  }
  /**
   * Get employees dropdown for selection
   */
  getEmployeesDropdown() {
    return this.http.get(`${environment.apiUrl}/api/v1/employees/dropdown`).pipe(catchError((error) => {
      console.error("Error loading employees dropdown:", error);
      return of([]);
    }));
  }
  /**
   * Get departments dropdown for filtering
   */
  getDepartmentsDropdown() {
    return this.http.get(`${environment.apiUrl}/api/v1/departments/dropdown`).pipe(catchError((error) => {
      console.error("Error loading departments dropdown:", error);
      return of([]);
    }));
  }
  /**
   * Get branches dropdown for filtering
   */
  getBranchesDropdown() {
    return this.http.get(`${environment.apiUrl}/api/v1/branches/dropdown`).pipe(catchError((error) => {
      console.error("Error loading branches dropdown:", error);
      return of([]);
    }));
  }
  /**
   * Validate excuse request parameters
   */
  validateExcuse(request) {
    this.loading.set(true);
    this.error.set(null);
    const validationRequest = {
      EmployeeId: request.employeeId,
      ExcuseDate: request.excuseDate,
      ExcuseType: request.excuseType,
      StartTime: request.startTime,
      EndTime: request.endTime
    };
    return this.http.post(`${this.apiUrl}/validate`, validationRequest).pipe(catchError((error) => {
      this.error.set("Failed to validate excuse request");
      console.error("Error validating excuse:", error);
      throw error;
    }), finalize(() => this.loading.set(false)));
  }
  /**
   * Map API ApprovalStatus to frontend ExcuseStatus
   */
  mapApprovalStatusToExcuseStatus(apiStatus) {
    const statusStr = typeof apiStatus === "string" ? apiStatus : String(apiStatus);
    switch (statusStr) {
      case "1":
      case "Pending":
        return ExcuseStatus.Pending;
      case "2":
      case "Approved":
        return ExcuseStatus.Approved;
      case "3":
      case "Rejected":
        return ExcuseStatus.Rejected;
      case "4":
      case "Cancelled":
        return ExcuseStatus.Cancelled;
      default:
        return ExcuseStatus.Pending;
    }
  }
  /**
   * Clear all state
   */
  clearState() {
    this.employeeExcuses.set([]);
    this.pagedResult.set(null);
    this.statistics.set(null);
    this.loading.set(false);
    this.error.set(null);
  }
};
__name(_EmployeeExcusesService, "EmployeeExcusesService");
__publicField(_EmployeeExcusesService, "\u0275fac", /* @__PURE__ */ __name(function EmployeeExcusesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmployeeExcusesService)(\u0275\u0275inject(HttpClient));
}, "EmployeeExcusesService_Factory"));
__publicField(_EmployeeExcusesService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmployeeExcusesService, factory: _EmployeeExcusesService.\u0275fac, providedIn: "root" }));
var EmployeeExcusesService = _EmployeeExcusesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeExcusesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  EmployeeExcusesService
};
//# sourceMappingURL=chunk-2JGEIOZ5.js.map
