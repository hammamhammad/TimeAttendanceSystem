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

// src/app/pages/roles/roles.service.ts
var _RolesService = class _RolesService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/roles`;
  permissionsUrl = `${environment.apiUrl}/api/v1/permissions`;
  getRoles(includePermissions = false) {
    let httpParams = new HttpParams();
    if (includePermissions) {
      httpParams = httpParams.set("includePermissions", "true");
    }
    return this.http.get(this.baseUrl, { params: httpParams });
  }
  getRoleById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getPermissions(group) {
    let httpParams = new HttpParams();
    if (group) {
      httpParams = httpParams.set("group", group);
    }
    return this.http.get(this.permissionsUrl, { params: httpParams }).pipe(map((groups) => {
      return groups.flatMap((group2) => group2.permissions);
    }));
  }
  getGroupedPermissions(group) {
    let httpParams = new HttpParams();
    if (group) {
      httpParams = httpParams.set("group", group);
    }
    return this.http.get(this.permissionsUrl, { params: httpParams });
  }
  assignPermissionToRole(roleId, request) {
    return this.http.post(`${this.baseUrl}/${roleId}/permissions`, request);
  }
  removePermissionFromRole(roleId, permissionId) {
    return this.http.delete(`${this.baseUrl}/${roleId}/permissions/${permissionId}`);
  }
  createRole(roleData) {
    return this.http.post(this.baseUrl, roleData);
  }
  updateRole(roleId, roleData) {
    return this.http.put(`${this.baseUrl}/${roleId}`, roleData);
  }
  deleteRole(roleId) {
    return this.http.delete(`${this.baseUrl}/${roleId}`);
  }
};
__name(_RolesService, "RolesService");
__publicField(_RolesService, "\u0275fac", /* @__PURE__ */ __name(function RolesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RolesService)();
}, "RolesService_Factory"));
__publicField(_RolesService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RolesService, factory: _RolesService.\u0275fac, providedIn: "root" }));
var RolesService = _RolesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  RolesService
};
//# sourceMappingURL=chunk-VGYB4IQS.js.map
