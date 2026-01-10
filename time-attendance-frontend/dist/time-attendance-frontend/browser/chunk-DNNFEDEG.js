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

// src/app/core/services/remote-work-policies.service.ts
var _RemoteWorkPoliciesService = class _RemoteWorkPoliciesService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/api/v1/RemoteWorkPolicies`;
  getAll(branchId, isActive) {
    let params = new HttpParams();
    if (branchId) {
      params = params.set("branchId", branchId.toString());
    }
    if (isActive !== void 0) {
      params = params.set("isActive", isActive.toString());
    }
    return this.http.get(this.apiUrl, { params });
  }
  getById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  create(request) {
    return this.http.post(this.apiUrl, request);
  }
  update(id, request) {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }
  delete(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  toggleStatus(id) {
    return this.http.post(`${this.apiUrl}/${id}/toggle-status`, {});
  }
};
__name(_RemoteWorkPoliciesService, "RemoteWorkPoliciesService");
__publicField(_RemoteWorkPoliciesService, "\u0275fac", /* @__PURE__ */ __name(function RemoteWorkPoliciesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RemoteWorkPoliciesService)();
}, "RemoteWorkPoliciesService_Factory"));
__publicField(_RemoteWorkPoliciesService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RemoteWorkPoliciesService, factory: _RemoteWorkPoliciesService.\u0275fac, providedIn: "root" }));
var RemoteWorkPoliciesService = _RemoteWorkPoliciesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RemoteWorkPoliciesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  RemoteWorkPoliciesService
};
//# sourceMappingURL=chunk-DNNFEDEG.js.map
