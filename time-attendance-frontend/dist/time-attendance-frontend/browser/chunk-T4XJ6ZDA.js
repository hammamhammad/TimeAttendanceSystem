import {
  environment
} from "./chunk-ZTCQ26FY.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/workflows/workflows.service.ts
var _WorkflowsService = class _WorkflowsService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/workflows`;
  /**
   * Get workflow definitions with pagination and filtering
   */
  getWorkflowDefinitions(page = 1, pageSize = 10, entityType, branchId, isActive) {
    let params = new HttpParams().set("page", page.toString()).set("pageSize", pageSize.toString());
    if (entityType !== null && entityType !== void 0) {
      params = params.set("entityType", entityType);
    }
    if (branchId !== null && branchId !== void 0) {
      params = params.set("branchId", branchId.toString());
    }
    if (isActive !== null && isActive !== void 0) {
      params = params.set("isActive", isActive.toString());
    }
    return this.http.get(this.baseUrl, { params }).pipe(map((response) => response.value));
  }
  /**
   * Get a single workflow definition by ID
   */
  getWorkflowDefinitionById(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((response) => response.value));
  }
  /**
   * Create a new workflow definition
   */
  createWorkflowDefinition(request) {
    return this.http.post(this.baseUrl, request).pipe(map((response) => response.value));
  }
  /**
   * Update an existing workflow definition
   */
  updateWorkflowDefinition(id, request) {
    return this.http.put(`${this.baseUrl}/${id}`, request).pipe(map((response) => response.value));
  }
  /**
   * Delete a workflow definition (soft delete)
   */
  deleteWorkflowDefinition(id) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(map((response) => response.value));
  }
  /**
   * Activate a workflow definition
   */
  activateWorkflowDefinition(id) {
    return this.http.post(`${this.baseUrl}/${id}/activate`, {}).pipe(map((response) => response.value));
  }
  /**
   * Deactivate a workflow definition
   */
  deactivateWorkflowDefinition(id) {
    return this.http.post(`${this.baseUrl}/${id}/deactivate`, {}).pipe(map((response) => response.value));
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
      "AttendanceCorrection": "Attendance Correction"
    };
    return displayNames[entityType] || entityType;
  }
  /**
   * Get all entity types for dropdown
   */
  getEntityTypes() {
    return [
      { value: "Vacation", label: "Vacation Request" },
      { value: "Excuse", label: "Excuse Request" },
      { value: "RemoteWork", label: "Remote Work Request" },
      { value: "Overtime", label: "Overtime Request" },
      { value: "Timesheet", label: "Timesheet" },
      { value: "AttendanceCorrection", label: "Attendance Correction" }
    ];
  }
};
__name(_WorkflowsService, "WorkflowsService");
__publicField(_WorkflowsService, "\u0275fac", /* @__PURE__ */ __name(function WorkflowsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _WorkflowsService)();
}, "WorkflowsService_Factory"));
__publicField(_WorkflowsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WorkflowsService, factory: _WorkflowsService.\u0275fac, providedIn: "root" }));
var WorkflowsService = _WorkflowsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkflowsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  WorkflowsService
};
//# sourceMappingURL=chunk-T4XJ6ZDA.js.map
