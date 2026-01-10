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

// src/app/core/services/remote-work-requests.service.ts
var _RemoteWorkRequestsService = class _RemoteWorkRequestsService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/api/v1/remote-work-requests`;
  getAll(employeeId, status, startDate, endDate) {
    let params = new HttpParams();
    if (employeeId) {
      params = params.set("employeeId", employeeId.toString());
    }
    if (status !== void 0) {
      params = params.set("status", status.toString());
    }
    if (startDate) {
      params = params.set("startDate", startDate);
    }
    if (endDate) {
      params = params.set("endDate", endDate);
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
  approve(request) {
    return this.http.patch(`${this.apiUrl}/${request.requestId}/approve`, request);
  }
  cancel(id) {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, {});
  }
};
__name(_RemoteWorkRequestsService, "RemoteWorkRequestsService");
__publicField(_RemoteWorkRequestsService, "\u0275fac", /* @__PURE__ */ __name(function RemoteWorkRequestsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RemoteWorkRequestsService)();
}, "RemoteWorkRequestsService_Factory"));
__publicField(_RemoteWorkRequestsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RemoteWorkRequestsService, factory: _RemoteWorkRequestsService.\u0275fac, providedIn: "root" }));
var RemoteWorkRequestsService = _RemoteWorkRequestsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RemoteWorkRequestsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/models/remote-work-request.model.ts
var RemoteWorkRequestStatus;
(function(RemoteWorkRequestStatus2) {
  RemoteWorkRequestStatus2[RemoteWorkRequestStatus2["Pending"] = 0] = "Pending";
  RemoteWorkRequestStatus2[RemoteWorkRequestStatus2["Approved"] = 1] = "Approved";
  RemoteWorkRequestStatus2[RemoteWorkRequestStatus2["Rejected"] = 2] = "Rejected";
  RemoteWorkRequestStatus2[RemoteWorkRequestStatus2["Cancelled"] = 3] = "Cancelled";
})(RemoteWorkRequestStatus || (RemoteWorkRequestStatus = {}));

export {
  RemoteWorkRequestsService,
  RemoteWorkRequestStatus
};
//# sourceMappingURL=chunk-P7VFNCII.js.map
