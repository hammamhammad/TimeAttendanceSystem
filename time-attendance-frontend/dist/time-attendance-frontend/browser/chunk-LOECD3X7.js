import {
  ShiftAssignmentStatus,
  ShiftAssignmentType
} from "./chunk-ICLZUHFB.js";
import {
  environment
} from "./chunk-ZTCQ26FY.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/core/services/shift-assignment.service.ts
var _ShiftAssignmentService = class _ShiftAssignmentService {
  http;
  apiUrl = `${environment.apiUrl}/api/v1/shift-assignments`;
  constructor(http) {
    this.http = http;
  }
  /**
   * Get paginated list of shift assignments with optional filtering
   */
  getShiftAssignments(params) {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page !== void 0) {
        httpParams = httpParams.set("page", params.page.toString());
      }
      if (params.pageSize !== void 0) {
        httpParams = httpParams.set("pageSize", params.pageSize.toString());
      }
      if (params.search) {
        httpParams = httpParams.set("search", params.search);
      }
      if (params.assignmentType !== void 0) {
        httpParams = httpParams.set("assignmentType", params.assignmentType.toString());
      }
      if (params.employeeId !== void 0) {
        httpParams = httpParams.set("employeeId", params.employeeId.toString());
      }
      if (params.departmentId !== void 0) {
        httpParams = httpParams.set("departmentId", params.departmentId.toString());
      }
      if (params.branchId !== void 0) {
        httpParams = httpParams.set("branchId", params.branchId.toString());
      }
      if (params.shiftId !== void 0) {
        httpParams = httpParams.set("shiftId", params.shiftId.toString());
      }
      if (params.status !== void 0) {
        httpParams = httpParams.set("status", params.status.toString());
      }
      if (params.effectiveFrom) {
        httpParams = httpParams.set("effectiveFrom", params.effectiveFrom);
      }
      if (params.effectiveTo) {
        httpParams = httpParams.set("effectiveTo", params.effectiveTo);
      }
      if (params.currentlyActive !== void 0) {
        httpParams = httpParams.set("currentlyActive", params.currentlyActive.toString());
      }
      if (params.minPriority !== void 0) {
        httpParams = httpParams.set("minPriority", params.minPriority.toString());
      }
      if (params.maxPriority !== void 0) {
        httpParams = httpParams.set("maxPriority", params.maxPriority.toString());
      }
    }
    return this.http.get(this.apiUrl, { params: httpParams });
  }
  /**
   * Get a specific shift assignment by ID
   */
  getShiftAssignmentById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  /**
   * Create a new shift assignment
   */
  createShiftAssignment(request) {
    return this.http.post(this.apiUrl, request);
  }
  /**
   * Update an existing shift assignment
   */
  updateShiftAssignment(id, request) {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }
  /**
   * Delete a shift assignment
   */
  deleteShiftAssignment(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  /**
   * Get assignment creation options (assignment types, statuses, etc.)
   */
  getAssignmentOptions() {
    return this.http.get(`${this.apiUrl}/options`);
  }
  /**
   * Get display text for assignment type
   */
  getAssignmentTypeDisplay(type) {
    switch (type) {
      case ShiftAssignmentType.Employee:
        return "Employee";
      case ShiftAssignmentType.Department:
        return "Department";
      case ShiftAssignmentType.Branch:
        return "Branch";
      default:
        return "Unknown";
    }
  }
  /**
   * Get display text for assignment status
   */
  getStatusDisplay(status) {
    switch (status) {
      case ShiftAssignmentStatus.Pending:
        return "Pending";
      case ShiftAssignmentStatus.Active:
        return "Active";
      case ShiftAssignmentStatus.Inactive:
        return "Inactive";
      case ShiftAssignmentStatus.Expired:
        return "Expired";
      case ShiftAssignmentStatus.Cancelled:
        return "Cancelled";
      default:
        return "Unknown";
    }
  }
  /**
   * Get CSS class for status badge
   */
  getStatusBadgeClass(status) {
    switch (status) {
      case ShiftAssignmentStatus.Pending:
        return "badge-warning";
      case ShiftAssignmentStatus.Active:
        return "badge-success";
      case ShiftAssignmentStatus.Inactive:
        return "badge-secondary";
      case ShiftAssignmentStatus.Expired:
        return "badge-danger";
      case ShiftAssignmentStatus.Cancelled:
        return "badge-dark";
      default:
        return "badge-light";
    }
  }
  /**
   * Format date for display
   */
  formatDate(dateString) {
    if (!dateString)
      return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  /**
   * Check if an assignment is currently active
   */
  isCurrentlyActive(assignment) {
    const now = /* @__PURE__ */ new Date();
    const effectiveDate = new Date(assignment.effectiveDate);
    const endDate = assignment.endDate ? new Date(assignment.endDate) : null;
    return assignment.status === ShiftAssignmentStatus.Active && effectiveDate <= now && (!endDate || endDate >= now);
  }
};
__name(_ShiftAssignmentService, "ShiftAssignmentService");
__publicField(_ShiftAssignmentService, "\u0275fac", /* @__PURE__ */ __name(function ShiftAssignmentService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ShiftAssignmentService)(\u0275\u0275inject(HttpClient));
}, "ShiftAssignmentService_Factory"));
__publicField(_ShiftAssignmentService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ShiftAssignmentService, factory: _ShiftAssignmentService.\u0275fac, providedIn: "root" }));
var ShiftAssignmentService = _ShiftAssignmentService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShiftAssignmentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ShiftAssignmentService
};
//# sourceMappingURL=chunk-LOECD3X7.js.map
