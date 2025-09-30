import {
  environment
} from "./chunk-5UND7ZIG.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  catchError,
  computed,
  map,
  setClassMetadata,
  signal,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/excuse-policies/excuse-policies.service.ts
var _ExcusePoliciesService = class _ExcusePoliciesService {
  http;
  baseUrl = `${environment.apiUrl}/api/v1/excuse-policies`;
  // Signals for state management
  _excusePolicies = signal([], ...ngDevMode ? [{ debugName: "_excusePolicies" }] : []);
  _pagedResult = signal(null, ...ngDevMode ? [{ debugName: "_pagedResult" }] : []);
  _loading = signal(false, ...ngDevMode ? [{ debugName: "_loading" }] : []);
  _error = signal(null, ...ngDevMode ? [{ debugName: "_error" }] : []);
  _selectedExcusePolicy = signal(null, ...ngDevMode ? [{ debugName: "_selectedExcusePolicy" }] : []);
  _currentFilter = signal({}, ...ngDevMode ? [{ debugName: "_currentFilter" }] : []);
  // Public readonly signals
  excusePolicies = this._excusePolicies.asReadonly();
  pagedResult = this._pagedResult.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  selectedExcusePolicy = this._selectedExcusePolicy.asReadonly();
  currentFilter = this._currentFilter.asReadonly();
  // Computed signals
  totalItems = computed(() => this._pagedResult()?.totalCount ?? 0, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  totalPages = computed(() => {
    const result = this._pagedResult();
    if (!result || result.pageSize === 0)
      return 1;
    return Math.ceil(result.totalCount / result.pageSize);
  }, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  hasNextPage = computed(() => {
    const result = this._pagedResult();
    if (!result)
      return false;
    return result.page < this.totalPages();
  }, ...ngDevMode ? [{ debugName: "hasNextPage" }] : []);
  hasPreviousPage = computed(() => {
    const result = this._pagedResult();
    if (!result)
      return false;
    return result.page > 1;
  }, ...ngDevMode ? [{ debugName: "hasPreviousPage" }] : []);
  constructor(http) {
    this.http = http;
  }
  /**
   * Get paginated excuse policies
   */
  getExcusePolicies(params = {}) {
    this._loading.set(true);
    this._error.set(null);
    let httpParams = new HttpParams();
    if (params.page)
      httpParams = httpParams.set("pageNumber", params.page.toString());
    if (params.pageSize)
      httpParams = httpParams.set("pageSize", params.pageSize.toString());
    if (params.branchId)
      httpParams = httpParams.set("branchId", params.branchId.toString());
    if (params.isActive !== void 0)
      httpParams = httpParams.set("isActive", params.isActive.toString());
    return this.http.get(this.baseUrl, { params: httpParams }).pipe(map((response) => response.value), tap((result) => {
      this._pagedResult.set(result);
      this._excusePolicies.set(result.items);
      this._loading.set(false);
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set(error.message || "Failed to load excuse policies");
      return throwError(() => error);
    }));
  }
  /**
   * Get excuse policy by ID
   */
  getExcusePolicyById(id) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((response) => response.value), tap((excusePolicy) => {
      this._selectedExcusePolicy.set(excusePolicy);
      this._loading.set(false);
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set(error.error?.message || "Failed to load excuse policy");
      return throwError(() => error);
    }));
  }
  /**
   * Get branches for dropdown selection
   */
  getBranches() {
    return this.http.get(`${environment.apiUrl}/api/v1/branches/all`).pipe(map((response) => response.value), catchError((error) => {
      console.error("Failed to load branches:", error);
      return throwError(() => error);
    }));
  }
  /**
   * Create new excuse policy
   */
  createExcusePolicy(request) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.post(this.baseUrl, request).pipe(map((response) => response.value), tap(() => {
      this._loading.set(false);
      this.refreshCurrentPage();
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set(error.error?.message || "Failed to create excuse policy");
      return throwError(() => error);
    }));
  }
  /**
   * Update excuse policy
   */
  updateExcusePolicy(id, request) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.put(`${this.baseUrl}/${id}`, __spreadProps(__spreadValues({}, request), { id })).pipe(map((response) => response.value), tap(() => {
      this._loading.set(false);
      this.refreshCurrentPage();
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set(error.error?.message || "Failed to update excuse policy");
      return throwError(() => error);
    }));
  }
  /**
   * Toggle excuse policy status
   */
  toggleExcusePolicyStatus(id) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.patch(`${this.baseUrl}/${id}/toggle-status`, {}).pipe(map((response) => response.value), tap(() => {
      this._loading.set(false);
      this.refreshCurrentPage();
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set(error.error?.message || "Failed to toggle excuse policy status");
      return throwError(() => error);
    }));
  }
  /**
   * Delete excuse policy
   */
  deleteExcusePolicy(id) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(map((response) => response.value), tap(() => {
      this._loading.set(false);
      this.refreshCurrentPage();
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set(error.error?.message || "Failed to delete excuse policy");
      return throwError(() => error);
    }));
  }
  /**
   * Set current filter
   */
  setFilter(filter) {
    this._currentFilter.set(filter);
  }
  /**
   * Clear current filter
   */
  clearFilter() {
    this._currentFilter.set({});
  }
  /**
   * Set selected excuse policy
   */
  setSelectedExcusePolicy(excusePolicy) {
    this._selectedExcusePolicy.set(excusePolicy);
  }
  /**
   * Clear error state
   */
  clearError() {
    this._error.set(null);
  }
  /**
   * Refresh current page with current filter
   */
  refreshCurrentPage() {
    const currentResult = this._pagedResult();
    const currentFilter = this._currentFilter();
    if (currentResult) {
      const params = __spreadValues({
        page: currentResult.page,
        pageSize: currentResult.pageSize
      }, currentFilter);
      this.getExcusePolicies(params).subscribe();
    }
  }
  /**
   * Reset service state
   */
  reset() {
    this._excusePolicies.set([]);
    this._pagedResult.set(null);
    this._loading.set(false);
    this._error.set(null);
    this._selectedExcusePolicy.set(null);
    this._currentFilter.set({});
  }
};
__name(_ExcusePoliciesService, "ExcusePoliciesService");
__publicField(_ExcusePoliciesService, "\u0275fac", /* @__PURE__ */ __name(function ExcusePoliciesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ExcusePoliciesService)(\u0275\u0275inject(HttpClient));
}, "ExcusePoliciesService_Factory"));
__publicField(_ExcusePoliciesService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExcusePoliciesService, factory: _ExcusePoliciesService.\u0275fac, providedIn: "root" }));
var ExcusePoliciesService = _ExcusePoliciesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcusePoliciesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ExcusePoliciesService
};
//# sourceMappingURL=chunk-X6RX6YJF.js.map
