import {
  environment
} from "./chunk-TNEZPYQG.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/shifts/shifts.service.ts
var _ShiftsService = class _ShiftsService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/shifts`;
  getShifts(page = 1, pageSize = 10, search) {
    let httpParams = new HttpParams().set("page", page.toString()).set("pageSize", pageSize.toString());
    if (search) {
      httpParams = httpParams.set("search", search);
    }
    return this.http.get(this.baseUrl, { params: httpParams });
  }
  getShiftById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createShift(shift) {
    return this.http.post(this.baseUrl, shift);
  }
  updateShift(id, shift) {
    return this.http.put(`${this.baseUrl}/${id}`, shift);
  }
  deleteShift(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getDefaultShift() {
    return this.http.get(`${this.baseUrl}/default`);
  }
  setDefaultShift(id, forceReplace = false) {
    const params = new HttpParams().set("forceReplace", forceReplace.toString());
    return this.http.post(`${this.baseUrl}/${id}/set-default`, {}, { params });
  }
};
__name(_ShiftsService, "ShiftsService");
__publicField(_ShiftsService, "\u0275fac", /* @__PURE__ */ __name(function ShiftsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ShiftsService)();
}, "ShiftsService_Factory"));
__publicField(_ShiftsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ShiftsService, factory: _ShiftsService.\u0275fac, providedIn: "root" }));
var ShiftsService = _ShiftsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShiftsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ShiftsService
};
//# sourceMappingURL=chunk-QRFVLUN5.js.map
