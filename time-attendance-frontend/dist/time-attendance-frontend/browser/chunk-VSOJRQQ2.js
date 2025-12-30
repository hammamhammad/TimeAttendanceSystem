import {
  environment
} from "./chunk-ZTCQ26FY.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/reports/reports.service.ts
var _ReportsService = class _ReportsService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/api/v1/Reports`;
  getAttendanceReport(filter) {
    let params = new HttpParams().set("from", filter.fromDate).set("to", filter.toDate);
    if (filter.branchId)
      params = params.set("branchId", filter.branchId);
    if (filter.departmentId)
      params = params.set("departmentId", filter.departmentId);
    if (filter.employeeId)
      params = params.set("employeeId", filter.employeeId);
    return this.http.get(`${this.apiUrl}/attendance`, { params });
  }
  exportAttendanceReport(filter) {
    let params = new HttpParams().set("from", filter.fromDate).set("to", filter.toDate);
    if (filter.branchId)
      params = params.set("branchId", filter.branchId);
    if (filter.departmentId)
      params = params.set("departmentId", filter.departmentId);
    if (filter.employeeId)
      params = params.set("employeeId", filter.employeeId);
    return this.http.get(`${this.apiUrl}/attendance/export`, { params, responseType: "blob" });
  }
  getLeaveReport(filter) {
    let params = new HttpParams().set("from", filter.fromDate).set("to", filter.toDate);
    if (filter.branchId)
      params = params.set("branchId", filter.branchId);
    if (filter.departmentId)
      params = params.set("departmentId", filter.departmentId);
    if (filter.employeeId)
      params = params.set("employeeId", filter.employeeId);
    return this.http.get(`${this.apiUrl}/leaves`, { params });
  }
};
__name(_ReportsService, "ReportsService");
__publicField(_ReportsService, "\u0275fac", /* @__PURE__ */ __name(function ReportsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReportsService)();
}, "ReportsService_Factory"));
__publicField(_ReportsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportsService, factory: _ReportsService.\u0275fac, providedIn: "root" }));
var ReportsService = _ReportsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ReportsService
};
//# sourceMappingURL=chunk-VSOJRQQ2.js.map
