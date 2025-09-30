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

// src/app/pages/branches/branches.service.ts
var _BranchesService = class _BranchesService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/branches`;
  getBranches(page = 1, pageSize = 10, search, isActive) {
    let httpParams = new HttpParams().set("page", page.toString()).set("pageSize", pageSize.toString());
    if (search) {
      httpParams = httpParams.set("search", search);
    }
    if (isActive !== void 0) {
      httpParams = httpParams.set("isActive", isActive.toString());
    }
    return this.http.get(this.baseUrl, { params: httpParams });
  }
  createBranch(branch) {
    return this.http.post(this.baseUrl, branch);
  }
  updateBranch(id, branch) {
    return this.http.put(`${this.baseUrl}/${id}`, branch);
  }
  deleteBranch(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getBranchesForDropdown() {
    return this.http.get(`${this.baseUrl}?pageSize=100&isActive=true`).pipe(map((response) => response.items));
  }
};
__name(_BranchesService, "BranchesService");
__publicField(_BranchesService, "\u0275fac", /* @__PURE__ */ __name(function BranchesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BranchesService)();
}, "BranchesService_Factory"));
__publicField(_BranchesService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BranchesService, factory: _BranchesService.\u0275fac, providedIn: "root" }));
var BranchesService = _BranchesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  BranchesService
};
//# sourceMappingURL=chunk-GHUXGLMI.js.map
