import {
  environment
} from "./chunk-5UND7ZIG.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/departments/departments.service.ts
var _DepartmentsService = class _DepartmentsService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/departments`;
  getDepartments(filter = {}) {
    let params = new HttpParams();
    if (filter.branchId !== void 0 && filter.branchId !== null) {
      params = params.set("branchId", filter.branchId.toString());
    }
    if (filter.includeTree !== void 0) {
      params = params.set("includeTree", filter.includeTree.toString());
    }
    if (filter.isActive !== void 0) {
      params = params.set("isActive", filter.isActive.toString());
    }
    if (filter.search) {
      params = params.set("search", filter.search);
    }
    if (filter.parentDepartmentId !== void 0) {
      params = params.set("parentDepartmentId", filter.parentDepartmentId.toString());
    }
    if (filter.includeInactive !== void 0) {
      params = params.set("includeInactive", filter.includeInactive.toString());
    }
    return this.http.get(this.baseUrl, { params });
  }
  getDepartmentTree(branchId) {
    return this.getDepartments({
      branchId,
      includeTree: true,
      isActive: true
    });
  }
  getDepartmentById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createDepartment(department) {
    return this.http.post(this.baseUrl, department);
  }
  updateDepartment(id, department) {
    return this.http.put(`${this.baseUrl}/${id}`, department);
  }
  deleteDepartment(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  // Helper method to flatten tree structure for table view
  flattenDepartmentTree(departments) {
    const result = [];
    const flatten = /* @__PURE__ */ __name((items, level = 0) => {
      for (const item of items) {
        result.push(__spreadProps(__spreadValues({}, item), { level }));
        if (item.children && item.children.length > 0) {
          flatten(item.children, level + 1);
        }
      }
    }, "flatten");
    flatten(departments);
    return result;
  }
  // Helper method to build department path
  buildDepartmentPath(departmentId, allDepartments) {
    const department = allDepartments.find((d) => d.id === departmentId);
    if (!department)
      return "";
    if (!department.parentDepartmentId) {
      return department.name;
    }
    const parentPath = this.buildDepartmentPath(department.parentDepartmentId, allDepartments);
    return `${parentPath} > ${department.name}`;
  }
};
__name(_DepartmentsService, "DepartmentsService");
__publicField(_DepartmentsService, "\u0275fac", /* @__PURE__ */ __name(function DepartmentsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DepartmentsService)();
}, "DepartmentsService_Factory"));
__publicField(_DepartmentsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DepartmentsService, factory: _DepartmentsService.\u0275fac, providedIn: "root" }));
var DepartmentsService = _DepartmentsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DepartmentsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  DepartmentsService
};
//# sourceMappingURL=chunk-ZEREPA2X.js.map
