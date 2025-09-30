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

// src/app/pages/vacation-types/vacation-types.service.ts
var _VacationTypesService = class _VacationTypesService {
  http;
  baseUrl = `${environment.apiUrl}/api/v1/vacation-types`;
  // Signals for state management
  _vacationTypes = signal([], ...ngDevMode ? [{ debugName: "_vacationTypes" }] : []);
  _pagedResult = signal(null, ...ngDevMode ? [{ debugName: "_pagedResult" }] : []);
  _loading = signal(false, ...ngDevMode ? [{ debugName: "_loading" }] : []);
  _error = signal(null, ...ngDevMode ? [{ debugName: "_error" }] : []);
  _selectedVacationType = signal(null, ...ngDevMode ? [{ debugName: "_selectedVacationType" }] : []);
  _currentFilter = signal({}, ...ngDevMode ? [{ debugName: "_currentFilter" }] : []);
  // Public readonly signals
  vacationTypes = this._vacationTypes.asReadonly();
  pagedResult = this._pagedResult.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  selectedVacationType = this._selectedVacationType.asReadonly();
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
  // Filtered vacation types based on current filter
  filteredVacationTypes = computed(() => {
    const types = this._vacationTypes();
    const filter = this._currentFilter();
    if (!filter)
      return types;
    return types.filter((vacationType) => {
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        const matchesName = vacationType.name.toLowerCase().includes(searchLower);
        const matchesArabicName = vacationType.nameAr?.toLowerCase().includes(searchLower) ?? false;
        if (!matchesName && !matchesArabicName)
          return false;
      }
      if (filter.branchId !== void 0 && vacationType.branchId !== filter.branchId) {
        return false;
      }
      if (filter.isActive !== void 0 && vacationType.isActive !== filter.isActive) {
        return false;
      }
      return true;
    });
  }, ...ngDevMode ? [{ debugName: "filteredVacationTypes" }] : []);
  constructor(http) {
    this.http = http;
  }
  /**
   * Retrieves vacation types with optional filtering and pagination
   */
  getVacationTypes(params = {}) {
    this._loading.set(true);
    this._error.set(null);
    let httpParams = new HttpParams();
    if (params.page)
      httpParams = httpParams.set("page", params.page.toString());
    if (params.pageSize)
      httpParams = httpParams.set("pageSize", params.pageSize.toString());
    if (params.search)
      httpParams = httpParams.set("search", params.search);
    if (params.branchId)
      httpParams = httpParams.set("branchId", params.branchId.toString());
    if (params.isActive !== void 0)
      httpParams = httpParams.set("isActive", params.isActive.toString());
    return this.http.get(this.baseUrl, { params: httpParams }).pipe(tap((result) => {
      this._pagedResult.set(result);
      this._vacationTypes.set(result.items);
      this._loading.set(false);
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set("Failed to load vacation types");
      console.error("Error loading vacation types:", error);
      return throwError(() => error);
    }));
  }
  /**
   * Retrieves a specific vacation type by ID
   */
  getVacationTypeById(id, includeStatistics = false) {
    this._loading.set(true);
    this._error.set(null);
    let httpParams = new HttpParams();
    if (includeStatistics) {
      httpParams = httpParams.set("includeStatistics", "true");
    }
    return this.http.get(`${this.baseUrl}/${id}`, { params: httpParams }).pipe(tap((vacationType) => {
      this._selectedVacationType.set(vacationType);
      this._loading.set(false);
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set("Failed to load vacation type details");
      console.error("Error loading vacation type:", error);
      return throwError(() => error);
    }));
  }
  /**
   * Creates a new vacation type
   */
  createVacationType(request) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.post(this.baseUrl, request).pipe(tap(() => {
      this._loading.set(false);
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set("Failed to create vacation type");
      console.error("Error creating vacation type:", error);
      return throwError(() => error);
    }));
  }
  /**
   * Updates an existing vacation type
   */
  updateVacationType(id, request) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.put(`${this.baseUrl}/${id}`, request).pipe(tap(() => {
      this._loading.set(false);
      const currentTypes = this._vacationTypes();
      const updatedTypes = currentTypes.map((vt) => vt.id === id ? __spreadProps(__spreadValues(__spreadValues({}, vt), request), { modifiedAtUtc: (/* @__PURE__ */ new Date()).toISOString() }) : vt);
      this._vacationTypes.set(updatedTypes);
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set("Failed to update vacation type");
      console.error("Error updating vacation type:", error);
      return throwError(() => error);
    }));
  }
  /**
   * Deletes a vacation type
   */
  deleteVacationType(id) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(tap(() => {
      this._loading.set(false);
      const currentTypes = this._vacationTypes();
      const filteredTypes = currentTypes.filter((vt) => vt.id !== id);
      this._vacationTypes.set(filteredTypes);
      const currentResult = this._pagedResult();
      if (currentResult) {
        this._pagedResult.set(__spreadProps(__spreadValues({}, currentResult), {
          items: filteredTypes,
          totalCount: currentResult.totalCount - 1
        }));
      }
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set("Failed to delete vacation type");
      console.error("Error deleting vacation type:", error);
      return throwError(() => error);
    }));
  }
  /**
   * Toggles the active status of a vacation type
   */
  toggleVacationTypeStatus(id) {
    this._loading.set(true);
    this._error.set(null);
    return this.http.patch(`${this.baseUrl}/${id}/toggle-status`, {}).pipe(tap(() => {
      this._loading.set(false);
      const currentTypes = this._vacationTypes();
      const updatedTypes = currentTypes.map((vt) => vt.id === id ? __spreadProps(__spreadValues({}, vt), { isActive: !vt.isActive, modifiedAtUtc: (/* @__PURE__ */ new Date()).toISOString() }) : vt);
      this._vacationTypes.set(updatedTypes);
    }), catchError((error) => {
      this._loading.set(false);
      this._error.set("Failed to toggle vacation type status");
      console.error("Error toggling vacation type status:", error);
      return throwError(() => error);
    }));
  }
  /**
   * Updates the current filter
   */
  updateFilter(filter) {
    this._currentFilter.set(filter);
  }
  /**
   * Clears the current filter
   */
  clearFilter() {
    this._currentFilter.set({});
  }
  /**
   * Clears the selected vacation type
   */
  clearSelectedVacationType() {
    this._selectedVacationType.set(null);
  }
  /**
   * Clears any error state
   */
  clearError() {
    this._error.set(null);
  }
  /**
   * Gets all branches for vacation type forms
   */
  getBranches() {
    const params = new HttpParams().set("pageSize", "1000").set("isActive", "true");
    return this.http.get(`${environment.apiUrl}/api/v1/branches`, { params }).pipe(map((result) => result.items || []), catchError((error) => {
      console.error("Error loading branches:", error);
      return throwError(() => error);
    }));
  }
};
__name(_VacationTypesService, "VacationTypesService");
__publicField(_VacationTypesService, "\u0275fac", /* @__PURE__ */ __name(function VacationTypesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _VacationTypesService)(\u0275\u0275inject(HttpClient));
}, "VacationTypesService_Factory"));
__publicField(_VacationTypesService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VacationTypesService, factory: _VacationTypesService.\u0275fac, providedIn: "root" }));
var VacationTypesService = _VacationTypesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VacationTypesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  VacationTypesService
};
//# sourceMappingURL=chunk-SVB2YIGO.js.map
