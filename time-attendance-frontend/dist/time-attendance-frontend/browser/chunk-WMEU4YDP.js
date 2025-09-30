import {
  environment
} from "./chunk-5UND7ZIG.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/employees/employees.service.ts
var _EmployeesService = class _EmployeesService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/employees`;
  branchesUrl = `${environment.apiUrl}/api/v1/branches`;
  departmentsUrl = `${environment.apiUrl}/api/v1/departments`;
  getEmployees(filter = {}) {
    let httpParams = new HttpParams();
    if (filter.page)
      httpParams = httpParams.set("page", filter.page.toString());
    if (filter.pageSize)
      httpParams = httpParams.set("pageSize", filter.pageSize.toString());
    if (filter.search)
      httpParams = httpParams.set("search", filter.search);
    if (filter.branchId)
      httpParams = httpParams.set("branchId", filter.branchId.toString());
    if (filter.departmentId)
      httpParams = httpParams.set("departmentId", filter.departmentId.toString());
    if (filter.managerId)
      httpParams = httpParams.set("managerId", filter.managerId.toString());
    if (filter.isActive !== void 0)
      httpParams = httpParams.set("isActive", filter.isActive.toString());
    if (filter.employmentStatus)
      httpParams = httpParams.set("employmentStatus", filter.employmentStatus);
    return this.http.get(this.baseUrl, { params: httpParams });
  }
  getEmployeeById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getCurrentEmployee() {
    return this.http.get(`${this.baseUrl}/current`);
  }
  createEmployee(request) {
    return this.http.post(this.baseUrl, request);
  }
  updateEmployee(id, request) {
    return this.http.put(`${this.baseUrl}/${id}`, request);
  }
  deleteEmployee(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateEmployeeShift(employeeId, request) {
    return this.http.post(`${this.baseUrl}/${employeeId}/shift`, request);
  }
  changeEmployeeShift(shiftData) {
    return this.http.post(`${this.baseUrl}/${shiftData.employeeId}/change-shift`, shiftData);
  }
  // Helper methods for dropdowns
  getBranches() {
    let httpParams = new HttpParams().set("page", "1").set("pageSize", "100").set("isActive", "true");
    return this.http.get(this.branchesUrl, { params: httpParams });
  }
  getDepartments(branchId) {
    let httpParams = new HttpParams();
    if (branchId) {
      httpParams = httpParams.set("branchId", branchId.toString());
    }
    return this.http.get(this.departmentsUrl, { params: httpParams });
  }
  getEmployeesForSelection(branchId) {
    let httpParams = new HttpParams().set("page", "1").set("pageSize", "1000").set("isActive", "true");
    if (branchId) {
      httpParams = httpParams.set("branchId", branchId.toString());
    }
    return this.http.get(this.baseUrl, { params: httpParams }).pipe(map((result) => result.items.map((emp) => ({
      id: emp.id,
      name: emp.fullName,
      employeeNumber: emp.employeeNumber
    }))));
  }
  getEmployeesDropdown() {
    return this.http.get(`${this.baseUrl}/dropdown`);
  }
  getManagers(branchId) {
    let httpParams = new HttpParams().set("page", "1").set("pageSize", "1000").set("isActive", "true");
    if (branchId) {
      httpParams = httpParams.set("branchId", branchId.toString());
    }
    return this.http.get(this.baseUrl, { params: httpParams }).pipe(map((result) => result.items.map((emp) => ({
      id: emp.id,
      name: emp.fullName,
      employeeNumber: emp.employeeNumber
    }))));
  }
};
__name(_EmployeesService, "EmployeesService");
__publicField(_EmployeesService, "\u0275fac", /* @__PURE__ */ __name(function EmployeesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmployeesService)();
}, "EmployeesService_Factory"));
__publicField(_EmployeesService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmployeesService, factory: _EmployeesService.\u0275fac, providedIn: "root" }));
var EmployeesService = _EmployeesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  EmployeesService
};
//# sourceMappingURL=chunk-WMEU4YDP.js.map
