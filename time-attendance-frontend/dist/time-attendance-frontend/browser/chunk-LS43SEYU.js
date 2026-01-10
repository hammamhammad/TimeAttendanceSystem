import {
  ReportsService
} from "./chunk-5NQTVG2W.js";
import {
  StatCardComponent
} from "./chunk-QZJD2L6F.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-GYSVNBR7.js";
import "./chunk-TNEZPYQG.js";
import {
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
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
  ɵɵpureFunction5,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/reports/attendance-report.ts
var _c0 = /* @__PURE__ */ __name((a0, a1, a2, a3, a4) => ({ "bg-success-subtle text-success": a0, "bg-danger-subtle text-danger": a1, "bg-warning-subtle text-warning": a2, "bg-info-subtle text-info": a3, "bg-secondary-subtle text-secondary": a4 }), "_c0");
function AttendanceReportComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "span", 19);
    \u0275\u0275text(3, "Loading...");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 20);
    \u0275\u0275text(5, "Loading report data...");
    \u0275\u0275elementEnd()();
  }
}
__name(AttendanceReportComponent_div_24_Template, "AttendanceReportComponent_div_24_Template");
function AttendanceReportComponent_div_25_tr_39_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.lateMinutes);
  }
}
__name(AttendanceReportComponent_div_25_tr_39_span_20_Template, "AttendanceReportComponent_div_25_tr_39_span_20_Template");
function AttendanceReportComponent_div_25_tr_39_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
__name(AttendanceReportComponent_div_25_tr_39_span_21_Template, "AttendanceReportComponent_div_25_tr_39_span_21_Template");
function AttendanceReportComponent_div_25_tr_39_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(2, 2, item_r1.weeklyTotalHours, "1.1-1"), " / ", item_r1.weeklyRequiredHours, " ");
  }
}
__name(AttendanceReportComponent_div_25_tr_39_span_23_Template, "AttendanceReportComponent_div_25_tr_39_span_23_Template");
function AttendanceReportComponent_div_25_tr_39_span_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" +", \u0275\u0275pipeBind2(2, 1, item_r1.weeklyOvertimeHours, "1.1-1"), " ");
  }
}
__name(AttendanceReportComponent_div_25_tr_39_span_25_Template, "AttendanceReportComponent_div_25_tr_39_span_25_Template");
function AttendanceReportComponent_div_25_tr_39_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" -", \u0275\u0275pipeBind2(2, 1, item_r1.weeklyShortageHours, "1.1-1"), " ");
  }
}
__name(AttendanceReportComponent_div_25_tr_39_span_26_Template, "AttendanceReportComponent_div_25_tr_39_span_26_Template");
function AttendanceReportComponent_div_25_tr_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td")(5, "div", 38)(6, "span", 39);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small", 40);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 41);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 41);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 42);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 43);
    \u0275\u0275template(20, AttendanceReportComponent_div_25_tr_39_span_20_Template, 2, 1, "span", 44)(21, AttendanceReportComponent_div_25_tr_39_span_21_Template, 2, 0, "span", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 43);
    \u0275\u0275template(23, AttendanceReportComponent_div_25_tr_39_span_23_Template, 3, 5, "span", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "td", 43);
    \u0275\u0275template(25, AttendanceReportComponent_div_25_tr_39_span_25_Template, 3, 4, "span", 47)(26, AttendanceReportComponent_div_25_tr_39_span_26_Template, 3, 4, "span", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "td")(28, "span", 48);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 14, item_r1.date, "mediumDate"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r1.employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.departmentName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.shiftName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.checkIn || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.checkOut || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 17, item_r1.workedHours, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", item_r1.lateMinutes > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r1.lateMinutes === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r1.weeklyRequiredHours);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (item_r1.weeklyOvertimeHours ?? 0) > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (item_r1.weeklyShortageHours ?? 0) > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(20, _c0, item_r1.status === "Present", item_r1.status === "Absent", item_r1.status === "Late", item_r1.status === "OnLeave", item_r1.status === "Holiday"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.status, " ");
  }
}
__name(AttendanceReportComponent_div_25_tr_39_Template, "AttendanceReportComponent_div_25_tr_39_Template");
function AttendanceReportComponent_div_25_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 52);
    \u0275\u0275element(2, "i", 53);
    \u0275\u0275text(3, " No attendance records found for this period. ");
    \u0275\u0275elementEnd()();
  }
}
__name(AttendanceReportComponent_div_25_tr_40_Template, "AttendanceReportComponent_div_25_tr_40_Template");
function AttendanceReportComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "div", 23);
    \u0275\u0275element(3, "app-stat-card", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 23);
    \u0275\u0275element(5, "app-stat-card", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275element(7, "app-stat-card", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 23);
    \u0275\u0275element(9, "app-stat-card", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 28)(11, "div", 29)(12, "h5", 30);
    \u0275\u0275text(13, "Attendance Records");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 31)(15, "table", 32)(16, "thead", 33)(17, "tr")(18, "th", 34);
    \u0275\u0275text(19, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 34);
    \u0275\u0275text(21, "Employee");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 34);
    \u0275\u0275text(23, "Shift");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 34);
    \u0275\u0275text(25, "Check In");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 34);
    \u0275\u0275text(27, "Check Out");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "th", 35);
    \u0275\u0275text(29, "Worked (Hrs)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "th", 35);
    \u0275\u0275text(31, "Late (Min)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "th", 35);
    \u0275\u0275text(33, "Weekly Hrs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "th", 35);
    \u0275\u0275text(35, "Weekly OT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "th", 34);
    \u0275\u0275text(37, "Status");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "tbody");
    \u0275\u0275template(39, AttendanceReportComponent_div_25_tr_39_Template, 30, 26, "tr", 36)(40, AttendanceReportComponent_div_25_tr_40_Template, 4, 0, "tr", 37);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_9_0;
    let tmp_10_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.report().totalDays)("borderAccent", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r1.report().totalPresent)("borderAccent", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r1.report().totalLate)("borderAccent", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r1.report().totalAbsent)("borderAccent", true);
    \u0275\u0275advance(30);
    \u0275\u0275property("ngForOf", (tmp_9_0 = ctx_r1.report()) == null ? null : tmp_9_0.items);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_10_0 = ctx_r1.report()) == null ? null : tmp_10_0.items == null ? null : tmp_10_0.items.length) === 0);
  }
}
__name(AttendanceReportComponent_div_25_Template, "AttendanceReportComponent_div_25_Template");
function AttendanceReportComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 55);
    \u0275\u0275element(2, "i", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h5");
    \u0275\u0275text(4, "No Report Generated");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, 'Select a date range and click "Generate Report" to view data.');
    \u0275\u0275elementEnd()();
  }
}
__name(AttendanceReportComponent_div_26_Template, "AttendanceReportComponent_div_26_Template");
var _AttendanceReportComponent = class _AttendanceReportComponent {
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
    this.reportsService.getAttendanceReport(this.filter()).subscribe({
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
  exportReport() {
    this.loading.set(true);
    this.reportsService.exportAttendanceReport(this.filter()).subscribe({
      next: /* @__PURE__ */ __name((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `attendance-report-${this.filter().fromDate}-${this.filter().toDate}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
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
      case "Present":
        return "badge-success";
      case "Absent":
        return "badge-error";
      case "Late":
        return "badge-warning";
      case "OnLeave":
        return "badge-info";
      default:
        return "badge-ghost";
    }
  }
};
__name(_AttendanceReportComponent, "AttendanceReportComponent");
__publicField(_AttendanceReportComponent, "\u0275fac", /* @__PURE__ */ __name(function AttendanceReportComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AttendanceReportComponent)();
}, "AttendanceReportComponent_Factory"));
__publicField(_AttendanceReportComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttendanceReportComponent, selectors: [["app-attendance-report"]], decls: 27, vars: 8, consts: [[1, "container-fluid", "px-4", "py-4"], ["title", "Attendance Report", "subtitle", "Daily attendance records and summaries"], [1, "card", "border-0", "shadow-sm", "mb-4"], [1, "card-body"], [1, "row", "g-3", "align-items-end"], [1, "col-md-3"], [1, "form-label"], ["type", "date", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Optional", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "d-flex", "gap-2"], [1, "btn", "btn-primary", "flex-grow-1", 3, "click", "disabled"], [1, "fas", "fa-search", "me-1"], [1, "btn", "btn-outline-success", 3, "click", "disabled"], [1, "fas", "fa-file-csv"], ["class", "text-center py-5", 4, "ngIf"], ["class", "animate__animated animate__fadeIn", 4, "ngIf"], ["class", "text-center py-5 text-muted", 4, "ngIf"], [1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "text-muted", "mt-2"], [1, "animate__animated", "animate__fadeIn"], [1, "row", "g-4", "mb-4"], [1, "col-md-6", "col-lg-3"], ["label", "Total Days", "icon", "fas fa-calendar-day", "variant", "primary", 3, "value", "borderAccent"], ["label", "Present", "icon", "fas fa-user-check", "variant", "success", 3, "value", "borderAccent"], ["label", "Late", "icon", "fas fa-clock", "variant", "warning", 3, "value", "borderAccent"], ["label", "Absent", "icon", "fas fa-user-times", "variant", "danger", 3, "value", "borderAccent"], [1, "card", "border-0", "shadow-sm"], [1, "card-header", "bg-transparent", "py-3"], [1, "mb-0"], [1, "table-responsive"], [1, "table", "table-hover", "align-middle", "mb-0"], [1, "bg-light"], [1, "border-0"], [1, "border-0", "text-center"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "d-flex", "flex-column"], [1, "fw-medium"], [1, "text-muted"], [1, "text-nowrap"], [1, "text-center", "font-monospace"], [1, "text-center"], ["class", "text-danger fw-bold", 4, "ngIf"], ["class", "text-muted", 4, "ngIf"], ["class", "badge bg-light text-dark border", 4, "ngIf"], ["class", "text-success fw-bold", 4, "ngIf"], [1, "badge", "rounded-pill", 3, "ngClass"], [1, "text-danger", "fw-bold"], [1, "badge", "bg-light", "text-dark", "border"], [1, "text-success", "fw-bold"], ["colspan", "8", 1, "text-center", "py-5", "text-muted"], [1, "fas", "fa-inbox", "fa-2x", "mb-3", "d-block"], [1, "text-center", "py-5", "text-muted"], [1, "mb-3"], [1, "fas", "fa-chart-bar", "fa-3x", "text-light-emphasis"]], template: /* @__PURE__ */ __name(function AttendanceReportComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "label", 6);
    \u0275\u0275text(7, "From Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 7);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AttendanceReportComponent_Template_input_ngModelChange_8_listener($event) {
      return ctx.updateFilter("fromDate", $event);
    }, "AttendanceReportComponent_Template_input_ngModelChange_8_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 5)(10, "label", 6);
    \u0275\u0275text(11, "To Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 7);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AttendanceReportComponent_Template_input_ngModelChange_12_listener($event) {
      return ctx.updateFilter("toDate", $event);
    }, "AttendanceReportComponent_Template_input_ngModelChange_12_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 5)(14, "label", 6);
    \u0275\u0275text(15, "Employee ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 8);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AttendanceReportComponent_Template_input_ngModelChange_16_listener($event) {
      return ctx.updateFilter("employeeId", $event);
    }, "AttendanceReportComponent_Template_input_ngModelChange_16_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 5)(18, "div", 9)(19, "button", 10);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AttendanceReportComponent_Template_button_click_19_listener() {
      return ctx.loadReport();
    }, "AttendanceReportComponent_Template_button_click_19_listener"));
    \u0275\u0275element(20, "i", 11);
    \u0275\u0275text(21, " Generate ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 12);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AttendanceReportComponent_Template_button_click_22_listener() {
      return ctx.exportReport();
    }, "AttendanceReportComponent_Template_button_click_22_listener"));
    \u0275\u0275element(23, "i", 13);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275template(24, AttendanceReportComponent_div_24_Template, 6, 0, "div", 14)(25, AttendanceReportComponent_div_25_Template, 41, 10, "div", 15)(26, AttendanceReportComponent_div_26_Template, 7, 0, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275property("ngModel", ctx.filter().fromDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx.filter().toDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx.filter().employeeId);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx.loading() || !ctx.report());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.report() && !ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.report() && !ctx.loading());
  }
}, "AttendanceReportComponent_Template"), dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, PageHeaderComponent, StatCardComponent, DecimalPipe, DatePipe], encapsulation: 2 }));
var AttendanceReportComponent = _AttendanceReportComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttendanceReportComponent, [{
    type: Component,
    args: [{ selector: "app-attendance-report", standalone: true, imports: [CommonModule, FormsModule, PageHeaderComponent, StatCardComponent], template: `<div class="container-fluid px-4 py-4">\r
    <app-page-header title="Attendance Report" subtitle="Daily attendance records and summaries"></app-page-header>\r
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
                    <div class="d-flex gap-2">\r
                        <button class="btn btn-primary flex-grow-1" (click)="loadReport()" [disabled]="loading()">\r
                            <i class="fas fa-search me-1"></i> Generate\r
                        </button>\r
                        <button class="btn btn-outline-success" (click)="exportReport()"\r
                            [disabled]="loading() || !report()">\r
                            <i class="fas fa-file-csv"></i>\r
                        </button>\r
                    </div>\r
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
                <app-stat-card label="Total Days" [value]="report()!.totalDays" icon="fas fa-calendar-day"\r
                    variant="primary" [borderAccent]="true">\r
                </app-stat-card>\r
            </div>\r
            <div class="col-md-6 col-lg-3">\r
                <app-stat-card label="Present" [value]="report()!.totalPresent" icon="fas fa-user-check"\r
                    variant="success" [borderAccent]="true">\r
                </app-stat-card>\r
            </div>\r
            <div class="col-md-6 col-lg-3">\r
                <app-stat-card label="Late" [value]="report()!.totalLate" icon="fas fa-clock" variant="warning"\r
                    [borderAccent]="true">\r
                </app-stat-card>\r
            </div>\r
            <div class="col-md-6 col-lg-3">\r
                <app-stat-card label="Absent" [value]="report()!.totalAbsent" icon="fas fa-user-times" variant="danger"\r
                    [borderAccent]="true">\r
                </app-stat-card>\r
            </div>\r
        </div>\r
\r
        <!-- Results Table -->\r
        <div class="card border-0 shadow-sm">\r
            <div class="card-header bg-transparent py-3">\r
                <h5 class="mb-0">Attendance Records</h5>\r
            </div>\r
            <div class="table-responsive">\r
                <table class="table table-hover align-middle mb-0">\r
                    <thead class="bg-light">\r
                        <tr>\r
                            <th class="border-0">Date</th>\r
                            <th class="border-0">Employee</th>\r
                            <th class="border-0">Shift</th>\r
                            <th class="border-0">Check In</th>\r
                            <th class="border-0">Check Out</th>\r
                            <th class="border-0 text-center">Worked (Hrs)</th>\r
                            <th class="border-0 text-center">Late (Min)</th>\r
                            <th class="border-0 text-center">Weekly Hrs</th>\r
                            <th class="border-0 text-center">Weekly OT</th>\r
                            <th class="border-0">Status</th>\r
                        </tr>\r
                    </thead>\r
                    <tbody>\r
                        <tr *ngFor="let item of report()?.items">\r
                            <td>{{ item.date | date:'mediumDate' }}</td>\r
                            <td>\r
                                <div class="d-flex flex-column">\r
                                    <span class="fw-medium">{{ item.employeeName }}</span>\r
                                    <small class="text-muted">{{ item.departmentName }}</small>\r
                                </div>\r
                            </td>\r
                            <td>{{ item.shiftName }}</td>\r
                            <td class="text-nowrap">{{ item.checkIn || '-' }}</td>\r
                            <td class="text-nowrap">{{ item.checkOut || '-' }}</td>\r
                            <td class="text-center font-monospace">{{ item.workedHours | number:'1.2-2' }}</td>\r
                            <td class="text-center">\r
                                <span *ngIf="item.lateMinutes > 0" class="text-danger fw-bold">{{ item.lateMinutes\r
                                    }}</span>\r
                                <span *ngIf="item.lateMinutes === 0" class="text-muted">-</span>\r
                            </td>\r
                            <td class="text-center">\r
                                <span *ngIf="item.weeklyRequiredHours" class="badge bg-light text-dark border">\r
                                    {{ item.weeklyTotalHours | number:'1.1-1' }} / {{ item.weeklyRequiredHours }}\r
                                </span>\r
                            </td>\r
                            <td class="text-center">\r
                                <span *ngIf="(item.weeklyOvertimeHours ?? 0) > 0" class="text-success fw-bold">\r
                                    +{{ item.weeklyOvertimeHours | number:'1.1-1' }}\r
                                </span>\r
                                <span *ngIf="(item.weeklyShortageHours ?? 0) > 0" class="text-danger fw-bold">\r
                                    -{{ item.weeklyShortageHours | number:'1.1-1' }}\r
                                </span>\r
                            </td>\r
                            <td>\r
                                <span class="badge rounded-pill" [ngClass]="{\r
                    'bg-success-subtle text-success': item.status === 'Present',\r
                    'bg-danger-subtle text-danger': item.status === 'Absent',\r
                    'bg-warning-subtle text-warning': item.status === 'Late',\r
                    'bg-info-subtle text-info': item.status === 'OnLeave',\r
                    'bg-secondary-subtle text-secondary': item.status === 'Holiday'\r
                  }">\r
                                    {{ item.status }}\r
                                </span>\r
                            </td>\r
                        </tr>\r
                        <tr *ngIf="report()?.items?.length === 0">\r
                            <td colspan="8" class="text-center py-5 text-muted">\r
                                <i class="fas fa-inbox fa-2x mb-3 d-block"></i>\r
                                No attendance records found for this period.\r
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
            <i class="fas fa-chart-bar fa-3x text-light-emphasis"></i>\r
        </div>\r
        <h5>No Report Generated</h5>\r
        <p>Select a date range and click "Generate Report" to view data.</p>\r
    </div>\r
</div>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttendanceReportComponent, { className: "AttendanceReportComponent", filePath: "src/app/pages/reports/attendance-report.ts", lineNumber: 16 });
})();
export {
  AttendanceReportComponent
};
//# sourceMappingURL=chunk-LS43SEYU.js.map
