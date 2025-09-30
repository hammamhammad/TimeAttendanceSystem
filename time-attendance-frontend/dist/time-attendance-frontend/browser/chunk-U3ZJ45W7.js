import {
  environment
} from "./chunk-5UND7ZIG.js";
import {
  HttpClient,
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

// src/app/pages/settings/overtime/overtime-configurations.service.ts
var _OvertimeConfigurationsService = class _OvertimeConfigurationsService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/overtime-configurations`;
  getOvertimeConfigurations() {
    return this.http.get(this.baseUrl).pipe(map((response) => response.items));
  }
  getOvertimeConfigurationById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createOvertimeConfiguration(request) {
    return this.http.post(this.baseUrl, request);
  }
  updateOvertimeConfiguration(id, request) {
    return this.http.put(`${this.baseUrl}/${id}`, request);
  }
  activateOvertimeConfiguration(id) {
    return this.http.patch(`${this.baseUrl}/${id}/activate`, {});
  }
  deactivateOvertimeConfiguration(id) {
    return this.http.patch(`${this.baseUrl}/${id}/deactivate`, {});
  }
  deleteOvertimeConfiguration(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
};
__name(_OvertimeConfigurationsService, "OvertimeConfigurationsService");
__publicField(_OvertimeConfigurationsService, "\u0275fac", /* @__PURE__ */ __name(function OvertimeConfigurationsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _OvertimeConfigurationsService)();
}, "OvertimeConfigurationsService_Factory"));
__publicField(_OvertimeConfigurationsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OvertimeConfigurationsService, factory: _OvertimeConfigurationsService.\u0275fac, providedIn: "root" }));
var OvertimeConfigurationsService = _OvertimeConfigurationsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OvertimeConfigurationsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  OvertimeConfigurationsService
};
//# sourceMappingURL=chunk-U3ZJ45W7.js.map
