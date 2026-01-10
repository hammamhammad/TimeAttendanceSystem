import {
  environment
} from "./chunk-TNEZPYQG.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/approvals/approvals.service.ts
var _ApprovalsService = class _ApprovalsService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/approvals`;
  /**
   * Get pending approvals for current user
   */
  getPendingApprovals(page = 1, pageSize = 10, entityType, isOverdue) {
    let params = new HttpParams().set("page", page.toString()).set("pageSize", pageSize.toString());
    if (entityType !== null && entityType !== void 0) {
      params = params.set("entityType", entityType);
    }
    if (isOverdue !== null && isOverdue !== void 0) {
      params = params.set("isOverdue", isOverdue.toString());
    }
    return this.http.get(`${this.baseUrl}/pending`, { params }).pipe(map((response) => response.value));
  }
  /**
   * Get approval history for current user
   */
  getApprovalHistory(filters) {
    let params = new HttpParams().set("page", filters.page.toString()).set("pageSize", filters.pageSize.toString());
    if (filters.entityType) {
      params = params.set("entityType", filters.entityType);
    }
    if (filters.action) {
      params = params.set("action", filters.action);
    }
    if (filters.dateFrom) {
      params = params.set("dateFrom", filters.dateFrom);
    }
    if (filters.dateTo) {
      params = params.set("dateTo", filters.dateTo);
    }
    return this.http.get(`${this.baseUrl}/history`, { params }).pipe(map((response) => response.value));
  }
  /**
   * Approve a workflow step
   */
  approveStep(workflowInstanceId, request) {
    return this.http.post(`${this.baseUrl}/${workflowInstanceId}/approve`, request).pipe(map(() => void 0));
  }
  /**
   * Reject a workflow step
   */
  rejectStep(workflowInstanceId, request) {
    return this.http.post(`${this.baseUrl}/${workflowInstanceId}/reject`, request).pipe(map(() => void 0));
  }
  /**
   * Delegate a workflow step to another user
   */
  delegateStep(workflowInstanceId, request) {
    return this.http.post(`${this.baseUrl}/${workflowInstanceId}/delegate`, request).pipe(map(() => void 0));
  }
  /**
   * Cancel a workflow
   */
  cancelWorkflow(workflowInstanceId, reason) {
    return this.http.post(`${this.baseUrl}/${workflowInstanceId}/cancel`, { reason }).pipe(map(() => void 0));
  }
  /**
   * Create a new approval delegation
   */
  createDelegation(request) {
    return this.http.post(`${this.baseUrl}/delegations`, request).pipe(map((response) => response.value));
  }
  /**
   * Delete an approval delegation
   */
  deleteDelegation(id) {
    return this.http.delete(`${this.baseUrl}/delegations/${id}`).pipe(map(() => void 0));
  }
  /**
   * Get entity type display name
   */
  getEntityTypeDisplayName(entityType) {
    const displayNames = {
      "Vacation": "Vacation Request",
      "Excuse": "Excuse Request",
      "RemoteWork": "Remote Work Request",
      "Overtime": "Overtime Request",
      "Timesheet": "Timesheet",
      "AttendanceCorrection": "Attendance Correction",
      "FingerprintRequest": "Fingerprint Request"
    };
    return displayNames[entityType] || entityType;
  }
  /**
   * Get action display name
   */
  getActionDisplayName(action) {
    const displayNames = {
      "Approved": "Approved",
      "Rejected": "Rejected",
      "Delegated": "Delegated",
      "Skipped": "Skipped",
      "TimedOut": "Timed Out"
    };
    return displayNames[action] || action;
  }
  /**
   * Get action badge class
   */
  getActionBadgeClass(action) {
    const classes = {
      "Approved": "bg-success",
      "Rejected": "bg-danger",
      "Delegated": "bg-info",
      "Skipped": "bg-secondary",
      "TimedOut": "bg-warning text-dark"
    };
    return classes[action] || "bg-secondary";
  }
};
__name(_ApprovalsService, "ApprovalsService");
__publicField(_ApprovalsService, "\u0275fac", /* @__PURE__ */ __name(function ApprovalsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ApprovalsService)();
}, "ApprovalsService_Factory"));
__publicField(_ApprovalsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApprovalsService, factory: _ApprovalsService.\u0275fac, providedIn: "root" }));
var ApprovalsService = _ApprovalsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApprovalsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ApprovalsService
};
//# sourceMappingURL=chunk-HGEE4NK5.js.map
