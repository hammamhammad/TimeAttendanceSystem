import {
  environment
} from "./chunk-5UND7ZIG.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/users/users.service.ts
var _UsersService = class _UsersService {
  http;
  baseUrl = `${environment.apiUrl}/api/v1/users`;
  constructor(http) {
    this.http = http;
  }
  getUsers(filter = {}) {
    let params = new HttpParams();
    if (filter.page)
      params = params.set("page", filter.page.toString());
    if (filter.pageSize)
      params = params.set("pageSize", filter.pageSize.toString());
    if (filter.search)
      params = params.set("search", filter.search);
    if (filter.branchId)
      params = params.set("branchId", filter.branchId.toString());
    if (filter.roleId)
      params = params.set("roleId", filter.roleId.toString());
    if (filter.isActive !== void 0)
      params = params.set("isActive", filter.isActive.toString());
    return this.http.get(this.baseUrl, { params });
  }
  getUserById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createUser(request) {
    return this.http.post(this.baseUrl, request);
  }
  updateUser(id, request) {
    return this.http.put(`${this.baseUrl}/${id}`, request);
  }
  deleteUser(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  assignRole(userId, request) {
    return this.http.post(`${this.baseUrl}/${userId}/roles`, request);
  }
  removeRole(userId, roleId) {
    return this.http.delete(`${this.baseUrl}/${userId}/roles/${roleId}`);
  }
  assignBranch(userId, request) {
    return this.http.post(`${this.baseUrl}/${userId}/branches`, request);
  }
  getRoles() {
    return this.http.get(`${environment.apiUrl}/api/v1/roles`).pipe(map((response) => {
      console.log("Roles API response:", response);
      if (Array.isArray(response)) {
        return response;
      }
      if (response && response.value && Array.isArray(response.value)) {
        return response.value;
      }
      if (response && response.items && Array.isArray(response.items)) {
        return response.items;
      }
      console.warn("Unexpected roles response format:", response);
      return [];
    }));
  }
  getBranches() {
    const params = new HttpParams().set("pageSize", "1000").set("isActive", "true");
    return this.http.get(`${environment.apiUrl}/api/v1/branches`, { params }).pipe(map((result) => result.items || []));
  }
};
__name(_UsersService, "UsersService");
__publicField(_UsersService, "\u0275fac", /* @__PURE__ */ __name(function UsersService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UsersService)(\u0275\u0275inject(HttpClient));
}, "UsersService_Factory"));
__publicField(_UsersService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsersService, factory: _UsersService.\u0275fac, providedIn: "root" }));
var UsersService = _UsersService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  UsersService
};
//# sourceMappingURL=chunk-LZOHW3WQ.js.map
