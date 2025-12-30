import {
  ReportsService
} from "./chunk-VSOJRQQ2.js";
import {
  StatCardComponent
} from "./chunk-ACI7L5XM.js";
import {
  PageHeaderComponent
} from "./chunk-DKGFJHVQ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-CVUMC7BN.js";
import "./chunk-ZTCQ26FY.js";
import {
  CommonModule,
  Component,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/reports/leave-report.ts
var _c0 = /* @__PURE__ */ __name((a0, a1, a2) => ({ "bg-success-subtle text-success": a0, "bg-warning-subtle text-warning": a1, "bg-danger-subtle text-danger": a2 }), "_c0");
function LeaveReportComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "span", 16);
    \u0275\u0275text(3, "Loading...");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 17);
    \u0275\u0275text(5, "Loading report data...");
    \u0275\u0275elementEnd()();
  }
}
__name(LeaveReportComponent_div_21_Template, "LeaveReportComponent_div_21_Template");
function LeaveReportComponent_div_22_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 33)(3, "span", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td")(8, "span", 36);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 37);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td")(19, "span", 38);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td", 39);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r1.employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.departmentName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.leaveType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 10, item_r1.startDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 13, item_r1.endDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.totalDays);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(16, _c0, item_r1.status === "Approved", item_r1.status === "Pending", item_r1.status === "Rejected"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.status, " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", item_r1.reason || "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.reason || "-", " ");
  }
}
__name(LeaveReportComponent_div_22_tr_29_Template, "LeaveReportComponent_div_22_tr_29_Template");
function LeaveReportComponent_div_22_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 40);
    \u0275\u0275element(2, "i", 41);
    \u0275\u0275text(3, " No leave requests found for this period. ");
    \u0275\u0275elementEnd()();
  }
}
__name(LeaveReportComponent_div_22_tr_30_Template, "LeaveReportComponent_div_22_tr_30_Template");
function LeaveReportComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20);
    \u0275\u0275element(3, "app-stat-card", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20);
    \u0275\u0275element(5, "app-stat-card", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 23)(7, "div", 24)(8, "h5", 25);
    \u0275\u0275text(9, "Leave Requests");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 26)(11, "table", 27)(12, "thead", 28)(13, "tr")(14, "th", 29);
    \u0275\u0275text(15, "Employee");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 29);
    \u0275\u0275text(17, "Leave Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 29);
    \u0275\u0275text(19, "Start Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 29);
    \u0275\u0275text(21, "End Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 30);
    \u0275\u0275text(23, "Days");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 29);
    \u0275\u0275text(25, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 29);
    \u0275\u0275text(27, "Reason");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "tbody");
    \u0275\u0275template(29, LeaveReportComponent_div_22_tr_29_Template, 23, 20, "tr", 31)(30, LeaveReportComponent_div_22_tr_30_Template, 4, 0, "tr", 32);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.report().totalRequests)("borderAccent", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r1.report().totalApprovedDays)("borderAccent", true);
    \u0275\u0275advance(24);
    \u0275\u0275property("ngForOf", (tmp_5_0 = ctx_r1.report()) == null ? null : tmp_5_0.items);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_6_0 = ctx_r1.report()) == null ? null : tmp_6_0.items == null ? null : tmp_6_0.items.length) === 0);
  }
}
__name(LeaveReportComponent_div_22_Template, "LeaveReportComponent_div_22_Template");
function LeaveReportComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43);
    \u0275\u0275element(2, "i", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h5");
    \u0275\u0275text(4, "No Report Generated");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, 'Select a date range and click "Generate Report" to view data.');
    \u0275\u0275elementEnd()();
  }
}
__name(LeaveReportComponent_div_23_Template, "LeaveReportComponent_div_23_Template");
var _LeaveReportComponent = class _LeaveReportComponent {
  reportsService = inject(ReportsService);
  filter = signal({
    fromDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    toDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  }, ...ngDevMode ? [{ debugName: "filter" }] : []);
  report = signal(null, ...ngDevMode ? [{ debugName: "report" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  updateFilter(key, value) {
    this.filter.update((f) => __spreadProps(__spreadValues({}, f), { [key]: value }));
  }
  loadReport() {
    this.loading.set(true);
    this.reportsService.getLeaveReport(this.filter()).subscribe({
      next: /* @__PURE__ */ __name((data) => {
        this.report.set(data);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((err) => {
        console.error(err);
        this.loading.set(false);
      }, "error")
    });
  }
  getStatusClass(status) {
    switch (status) {
      case "Approved":
        return "badge-success";
      case "Rejected":
        return "badge-error";
      case "Pending":
        return "badge-warning";
      default:
        return "badge-ghost";
    }
  }
};
__name(_LeaveReportComponent, "LeaveReportComponent");
__publicField(_LeaveReportComponent, "\u0275fac", /* @__PURE__ */ __name(function LeaveReportComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LeaveReportComponent)();
}, "LeaveReportComponent_Factory"));
__publicField(_LeaveReportComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeaveReportComponent, selectors: [["app-leave-report"]], decls: 24, vars: 7, consts: [[1, "container-fluid", "px-4", "py-4"], ["title", "Leave Report", "subtitle", "Analyze employee leave requests and balances"], [1, "card", "border-0", "shadow-sm", "mb-4"], [1, "card-body"], [1, "row", "g-3", "align-items-end"], [1, "col-md-3"], [1, "form-label"], ["type", "date", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Optional", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", "w-100", 3, "click", "disabled"], [1, "fas", "fa-search", "me-2"], ["class", "text-center py-5", 4, "ngIf"], ["class", "animate__animated animate__fadeIn", 4, "ngIf"], ["class", "text-center py-5 text-muted", 4, "ngIf"], [1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "text-muted", "mt-2"], [1, "animate__animated", "animate__fadeIn"], [1, "row", "g-4", "mb-4"], [1, "col-md-6", "col-lg-3"], ["label", "Total Requests", "icon", "fas fa-file-alt", "variant", "primary", 3, "value", "borderAccent"], ["label", "Approved Days", "icon", "fas fa-calendar-check", "variant", "success", 3, "value", "borderAccent"], [1, "card", "border-0", "shadow-sm"], [1, "card-header", "bg-transparent", "py-3"], [1, "mb-0"], [1, "table-responsive"], [1, "table", "table-hover", "align-middle", "mb-0"], [1, "bg-light"], [1, "border-0"], [1, "border-0", "text-center"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "d-flex", "flex-column"], [1, "fw-medium"], [1, "text-muted"], [1, "badge", "bg-light", "text-dark", "border"], [1, "text-center"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "text-truncate", 2, "max-width", "200px", 3, "title"], ["colspan", "7", 1, "text-center", "py-5", "text-muted"], [1, "fas", "fa-inbox", "fa-2x", "mb-3", "d-block"], [1, "text-center", "py-5", "text-muted"], [1, "mb-3"], [1, "fas", "fa-clipboard-list", "fa-3x", "text-light-emphasis"]], template: /* @__PURE__ */ __name(function LeaveReportComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "label", 6);
    \u0275\u0275text(7, "From Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 7);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveReportComponent_Template_input_ngModelChange_8_listener($event) {
      return ctx.updateFilter("fromDate", $event);
    }, "LeaveReportComponent_Template_input_ngModelChange_8_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 5)(10, "label", 6);
    \u0275\u0275text(11, "To Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 7);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveReportComponent_Template_input_ngModelChange_12_listener($event) {
      return ctx.updateFilter("toDate", $event);
    }, "LeaveReportComponent_Template_input_ngModelChange_12_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 5)(14, "label", 6);
    \u0275\u0275text(15, "Employee ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 8);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveReportComponent_Template_input_ngModelChange_16_listener($event) {
      return ctx.updateFilter("employeeId", $event);
    }, "LeaveReportComponent_Template_input_ngModelChange_16_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 5)(18, "button", 9);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveReportComponent_Template_button_click_18_listener() {
      return ctx.loadReport();
    }, "LeaveReportComponent_Template_button_click_18_listener"));
    \u0275\u0275element(19, "i", 10);
    \u0275\u0275text(20, " Generate Report ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(21, LeaveReportComponent_div_21_Template, 6, 0, "div", 11)(22, LeaveReportComponent_div_22_Template, 31, 6, "div", 12)(23, LeaveReportComponent_div_23_Template, 7, 0, "div", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275property("ngModel", ctx.filter().fromDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx.filter().toDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx.filter().employeeId);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.report() && !ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.report() && !ctx.loading());
  }
}, "LeaveReportComponent_Template"), dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, PageHeaderComponent, StatCardComponent, DatePipe], encapsulation: 2 }));
var LeaveReportComponent = _LeaveReportComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeaveReportComponent, [{
    type: Component,
    args: [{ selector: "app-leave-report", standalone: true, imports: [CommonModule, FormsModule, PageHeaderComponent, StatCardComponent], template: `<div class="container-fluid px-4 py-4">\r
    <app-page-header title="Leave Report" subtitle="Analyze employee leave requests and balances"></app-page-header>\r
\r
    <!-- Filter Section -->\r
    <div class="card border-0 shadow-sm mb-4">\r
        <div class="card-body">\r
            <div class="row g-3 align-items-end">\r
                <div class="col-md-3">\r
                    <label class="form-label">From Date</label>\r
                    <input type="date" class="form-control" [ngModel]="filter().fromDate"\r
                        (ngModelChange)="updateFilter('fromDate', $event)">\r
                </div>\r
                <div class="col-md-3">\r
                    <label class="form-label">To Date</label>\r
                    <input type="date" class="form-control" [ngModel]="filter().toDate"\r
                        (ngModelChange)="updateFilter('toDate', $event)">\r
                </div>\r
                <div class="col-md-3">\r
                    <label class="form-label">Employee ID</label>\r
                    <input type="text" class="form-control" placeholder="Optional" [ngModel]="filter().employeeId"\r
                        (ngModelChange)="updateFilter('employeeId', $event)">\r
                </div>\r
                <div class="col-md-3">\r
                    <button class="btn btn-primary w-100" (click)="loadReport()" [disabled]="loading()">\r
                        <i class="fas fa-search me-2"></i> Generate Report\r
                    </button>\r
                </div>\r
            </div>\r
        </div>\r
    </div>\r
\r
    <!-- Loading State -->\r
    <div *ngIf="loading()" class="text-center py-5">\r
        <div class="spinner-border text-primary" role="status">\r
            <span class="visually-hidden">Loading...</span>\r
        </div>\r
        <p class="text-muted mt-2">Loading report data...</p>\r
    </div>\r
\r
    <!-- Report Content -->\r
    <div *ngIf="report() && !loading()" class="animate__animated animate__fadeIn">\r
\r
        <!-- Stats Row -->\r
        <div class="row g-4 mb-4">\r
            <div class="col-md-6 col-lg-3">\r
                <app-stat-card label="Total Requests" [value]="report()!.totalRequests" icon="fas fa-file-alt"\r
                    variant="primary" [borderAccent]="true">\r
                </app-stat-card>\r
            </div>\r
            <div class="col-md-6 col-lg-3">\r
                <app-stat-card label="Approved Days" [value]="report()!.totalApprovedDays" icon="fas fa-calendar-check"\r
                    variant="success" [borderAccent]="true">\r
                </app-stat-card>\r
            </div>\r
        </div>\r
\r
        <!-- Results Table -->\r
        <div class="card border-0 shadow-sm">\r
            <div class="card-header bg-transparent py-3">\r
                <h5 class="mb-0">Leave Requests</h5>\r
            </div>\r
            <div class="table-responsive">\r
                <table class="table table-hover align-middle mb-0">\r
                    <thead class="bg-light">\r
                        <tr>\r
                            <th class="border-0">Employee</th>\r
                            <th class="border-0">Leave Type</th>\r
                            <th class="border-0">Start Date</th>\r
                            <th class="border-0">End Date</th>\r
                            <th class="border-0 text-center">Days</th>\r
                            <th class="border-0">Status</th>\r
                            <th class="border-0">Reason</th>\r
                        </tr>\r
                    </thead>\r
                    <tbody>\r
                        <tr *ngFor="let item of report()?.items">\r
                            <td>\r
                                <div class="d-flex flex-column">\r
                                    <span class="fw-medium">{{ item.employeeName }}</span>\r
                                    <small class="text-muted">{{ item.departmentName }}</small>\r
                                </div>\r
                            </td>\r
                            <td><span class="badge bg-light text-dark border">{{ item.leaveType }}</span></td>\r
                            <td>{{ item.startDate | date:'mediumDate' }}</td>\r
                            <td>{{ item.endDate | date:'mediumDate' }}</td>\r
                            <td class="text-center">{{ item.totalDays }}</td>\r
                            <td>\r
                                <span class="badge rounded-pill" [ngClass]="{\r
                    'bg-success-subtle text-success': item.status === 'Approved',\r
                    'bg-warning-subtle text-warning': item.status === 'Pending',\r
                    'bg-danger-subtle text-danger': item.status === 'Rejected'\r
                  }">\r
                                    {{ item.status }}\r
                                </span>\r
                            </td>\r
                            <td class="text-truncate" style="max-width: 200px;" [title]="item.reason || ''">\r
                                {{ item.reason || '-' }}\r
                            </td>\r
                        </tr>\r
                        <tr *ngIf="report()?.items?.length === 0">\r
                            <td colspan="7" class="text-center py-5 text-muted">\r
                                <i class="fas fa-inbox fa-2x mb-3 d-block"></i>\r
                                No leave requests found for this period.\r
                            </td>\r
                        </tr>\r
                    </tbody>\r
                </table>\r
            </div>\r
        </div>\r
\r
    </div>\r
\r
    <!-- Empty State -->\r
    <div *ngIf="!report() && !loading()" class="text-center py-5 text-muted">\r
        <div class="mb-3">\r
            <i class="fas fa-clipboard-list fa-3x text-light-emphasis"></i>\r
        </div>\r
        <h5>No Report Generated</h5>\r
        <p>Select a date range and click "Generate Report" to view data.</p>\r
    </div>\r
</div>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeaveReportComponent, { className: "LeaveReportComponent", filePath: "src/app/pages/reports/leave-report.ts", lineNumber: 16 });
})();
export {
  LeaveReportComponent
};
//# sourceMappingURL=chunk-JMIKHR3A.js.map
