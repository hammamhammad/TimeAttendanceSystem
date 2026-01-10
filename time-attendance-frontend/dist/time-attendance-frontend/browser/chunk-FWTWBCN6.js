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

// src/app/pages/settings/excuse-policies/excuse-policies.service.ts
var _ExcusePoliciesService = class _ExcusePoliciesService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/excuse-policies`;
  /**
   * Get excuse policies with pagination and filtering
   */
  getExcusePolicies(pageNumber = 1, pageSize = 10, branchId, isActive) {
    let params = new HttpParams().set("pageNumber", pageNumber.toString()).set("pageSize", pageSize.toString());
    if (branchId !== null && branchId !== void 0) {
      params = params.set("branchId", branchId.toString());
    }
    if (isActive !== null && isActive !== void 0) {
      params = params.set("isActive", isActive.toString());
    }
    return this.http.get(this.baseUrl, { params }).pipe(map((response) => response.value));
  }
  /**
   * Get a single excuse policy by ID
   */
  getExcusePolicyById(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((response) => response.value));
  }
  /**
   * Create a new excuse policy
   */
  createExcusePolicy(request) {
    return this.http.post(this.baseUrl, request).pipe(map((response) => response.value));
  }
  /**
   * Update an existing excuse policy
   */
  updateExcusePolicy(id, request) {
    return this.http.put(`${this.baseUrl}/${id}`, request).pipe(map((response) => response.value));
  }
  /**
   * Toggle the active status of an excuse policy
   */
  toggleExcusePolicyStatus(id) {
    return this.http.patch(`${this.baseUrl}/${id}/toggle-status`, {}).pipe(map((response) => response.value));
  }
  /**
   * Delete an excuse policy (soft delete)
   */
  deleteExcusePolicy(id) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(map((response) => response.value));
  }
};
__name(_ExcusePoliciesService, "ExcusePoliciesService");
__publicField(_ExcusePoliciesService, "\u0275fac", /* @__PURE__ */ __name(function ExcusePoliciesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ExcusePoliciesService)();
}, "ExcusePoliciesService_Factory"));
__publicField(_ExcusePoliciesService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExcusePoliciesService, factory: _ExcusePoliciesService.\u0275fac, providedIn: "root" }));
var ExcusePoliciesService = _ExcusePoliciesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcusePoliciesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ExcusePoliciesService
};
//# sourceMappingURL=chunk-FWTWBCN6.js.map
