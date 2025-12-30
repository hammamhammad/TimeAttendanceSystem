import {
  FilterPanelComponent
} from "./chunk-XPMD3IPY.js";
import {
  AttendanceChartComponent,
  AttendanceSummaryCardComponent
} from "./chunk-I6UGWJFM.js";
import {
  AttendanceService
} from "./chunk-233LUQFN.js";
import {
  EmployeesService
} from "./chunk-IR2IKZBB.js";
import {
  DataTableComponent
} from "./chunk-7JZQN7NK.js";
import "./chunk-5ZV3Z4IV.js";
import {
  AttendanceStatus
} from "./chunk-7XYWDBYG.js";
import "./chunk-GSKH2KOG.js";
import {
  FormsModule
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  CommonModule,
  Component,
  DatePipe,
  Location,
  computed,
  effect,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/attendance/employee-detail/employee-attendance-detail.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.title, "_forTrack0");
function EmployeeAttendanceDetailComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 16)(3, "div", 17)(4, "h5", 5);
    \u0275\u0275element(5, "i", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 19)(8, "div", 20)(9, "div", 21)(10, "div", 22)(11, "label", 23);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 24);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 21)(16, "div", 22)(17, "label", 23);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 24);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 21)(22, "div", 22)(23, "label", 23);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 24);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 21)(28, "div", 22)(29, "label", 23);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 24);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_9_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.employee_information"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employee_number"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r0.employee()) == null ? null : tmp_3_0.employeeNumber);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.full_name"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_5_0 = ctx_r0.employee()) == null ? null : tmp_5_0.fullName);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.department"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_7_0 = ctx_r0.employee()) == null ? null : tmp_7_0.departmentName) || "--");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.branch"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_9_0 = ctx_r0.employee()) == null ? null : tmp_9_0.branchName) || "--");
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_16_Template, "EmployeeAttendanceDetailComponent_Conditional_16_Template");
function EmployeeAttendanceDetailComponent_Conditional_18_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275element(1, "app-attendance-summary-card", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const card_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("data", card_r2)("loading", ctx_r0.loading())("showProgress", !!card_r2.percentage)("clickable", !!card_r2.link);
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_18_For_2_Template, "EmployeeAttendanceDetailComponent_Conditional_18_For_2_Template");
function EmployeeAttendanceDetailComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275repeaterCreate(1, EmployeeAttendanceDetailComponent_Conditional_18_For_2_Template, 2, 4, "div", 25, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.summaryCards());
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_18_Template, "EmployeeAttendanceDetailComponent_Conditional_18_Template");
function EmployeeAttendanceDetailComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 27)(2, "div", 28)(3, "div", 29)(4, "h5", 5);
    \u0275\u0275element(5, "i", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 19);
    \u0275\u0275element(8, "app-attendance-chart", 31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 27)(10, "div", 28)(11, "div", 17)(12, "h5", 5);
    \u0275\u0275element(13, "i", 32);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 19)(16, "div", 33)(17, "div", 34)(18, "div", 35)(19, "h3", 36);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "small", 37);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 34)(24, "div", 35)(25, "h3", 38);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "small", 37);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 34)(30, "div", 35)(31, "h3", 39);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "small", 37);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 34)(36, "div", 35)(37, "h3", 40);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "small", 37);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(41, "div", 41)(42, "h6", 42);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 43)(45, "span", 37);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "strong");
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 43)(51, "span", 37);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "strong");
    \u0275\u0275text(54);
    \u0275\u0275pipe(55, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 43)(57, "span", 37);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "strong");
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.employee_history.attendance_distribution"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r0.attendanceChartData())("type", "doughnut")("height", 300)("loading", ctx_r0.loading());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.employee_history.performance_summary"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275classMap(ctx_r0.attendanceStats().attendanceRate >= 90 ? "text-success" : ctx_r0.attendanceStats().attendanceRate >= 75 ? "text-warning" : "text-danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.Math.round(ctx_r0.attendanceStats().attendanceRate), "% ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.attendance_rate"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.attendanceStats().totalDays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.employee_history.total_days"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.formatHours(ctx_r0.attendanceStats().totalWorkingHours));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.total_working_hours"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.formatLateTime(ctx_r0.attendanceStats().totalLateMinutes));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.total_late_time"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.period_information"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.filters.start_date"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(49, 23, ctx_r0.startDate(), "shortDate"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.filters.end_date"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(55, 26, ctx_r0.endDate(), "shortDate"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.avg_per_day"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatHours(ctx_r0.attendanceStats().avgWorkingHours));
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_19_Template, "EmployeeAttendanceDetailComponent_Conditional_19_Template");
function EmployeeAttendanceDetailComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 44)(2, "span", 45);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 46);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("app.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.messages.loading_employee_data"));
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_20_Template, "EmployeeAttendanceDetailComponent_Conditional_20_Template");
function EmployeeAttendanceDetailComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 47)(2, "div");
    \u0275\u0275element(3, "i", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 49);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Conditional_21_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.refresh());
    }, "EmployeeAttendanceDetailComponent_Conditional_21_Template_button_click_5_listener"));
    \u0275\u0275element(6, "i", 50);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("app.retry"), " ");
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_21_Template, "EmployeeAttendanceDetailComponent_Conditional_21_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "i", 56);
    \u0275\u0275elementStart(2, "h5", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 57);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_14_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadAttendanceData());
    }, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_14_Template_button_click_6_listener"));
    \u0275\u0275element(7, "i", 58);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.no_records"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.no_records_description"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("app.refresh"), " ");
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Conditional_14_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_14_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const value_r6 = ctx.value;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(value_r6);
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_3_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_3_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 68);
  }
  if (rf & 2) {
    const value_r7 = ctx.value;
    \u0275\u0275property("innerHTML", value_r7, \u0275\u0275sanitizeHtml);
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_6_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_6_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const value_r8 = ctx.value;
    \u0275\u0275classMap(value_r8 !== "--:--" ? "text-success fw-medium" : "text-muted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", value_r8, " ");
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_9_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_9_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const value_r9 = ctx.value;
    \u0275\u0275classMap(value_r9 !== "--:--" ? "text-danger fw-medium" : "text-muted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", value_r9, " ");
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_12_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_12_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const value_r10 = ctx.value;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(value_r10);
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_15_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_15_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const value_r11 = ctx.value;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(value_r11);
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_18_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_18_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const value_r12 = ctx.value;
    \u0275\u0275classMap(value_r12 !== "--" ? "text-warning fw-medium" : "text-muted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", value_r12, " ");
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_21_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_21_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "app-data-table", 59);
    \u0275\u0275listener("sortChange", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template_app_data_table_sortChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onSort($event));
    }, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template_app_data_table_sortChange_1_listener"))("actionClick", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template_app_data_table_actionClick_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onActionClick($event));
    }, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template_app_data_table_actionClick_1_listener"))("pageChange", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template_app_data_table_pageChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPageChange($event));
    }, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template_app_data_table_pageChange_1_listener"))("pageSizeChange", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template_app_data_table_pageSizeChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPageSizeChange($event));
    }, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template_app_data_table_pageSizeChange_1_listener"));
    \u0275\u0275elementContainerStart(2, 60);
    \u0275\u0275template(3, EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_3_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 61);
    \u0275\u0275template(6, EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_6_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 62);
    \u0275\u0275template(9, EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_9_Template, 2, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 63);
    \u0275\u0275template(12, EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_12_Template, 2, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 64);
    \u0275\u0275template(15, EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_15_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 65);
    \u0275\u0275template(18, EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_18_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 66);
    \u0275\u0275template(21, EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_ng_template_21_Template, 2, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r0.tableData())("columns", ctx_r0.tableColumns())("actions", ctx_r0.tableActions())("loading", ctx_r0.loading)("showPagination", true)("currentPage", ctx_r0.currentPage)("totalPages", ctx_r0.tableTotalPages)("totalItems", ctx_r0.tableTotalItems)("pageSize", ctx_r0.pageSize)("sortColumn", ctx_r0.sortColumn)("sortDirection", ctx_r0.sortDirection)("responsiveMode", "horizontal-scroll")("searchable", true)("exportable", true);
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template");
function EmployeeAttendanceDetailComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 17)(2, "div", 4)(3, "h5", 5);
    \u0275\u0275element(4, "i", 51);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 52)(7, "span", 53);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 54);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(13, "div", 55);
    \u0275\u0275conditionalCreate(14, EmployeeAttendanceDetailComponent_Conditional_22_Conditional_14_Template, 9, 3, "div", 13);
    \u0275\u0275conditionalCreate(15, EmployeeAttendanceDetailComponent_Conditional_22_Conditional_15_Template, 23, 14, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.attendance_history"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3(" ", ctx_r0.i18n.t("attendance.period"), ": ", \u0275\u0275pipeBind2(9, 8, ctx_r0.startDate(), "shortDate"), " - ", \u0275\u0275pipeBind2(10, 11, ctx_r0.endDate(), "shortDate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r0.filteredRecords().length, " ", ctx_r0.i18n.t("attendance.records"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.filteredRecords().length === 0 ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.filteredRecords().length > 0 ? 15 : -1);
  }
}
__name(EmployeeAttendanceDetailComponent_Conditional_22_Template, "EmployeeAttendanceDetailComponent_Conditional_22_Template");
var _EmployeeAttendanceDetailComponent = class _EmployeeAttendanceDetailComponent {
  attendanceService;
  employeesService;
  route;
  router;
  location;
  i18n;
  notificationService;
  employeeId = null;
  Math = Math;
  // Expose Math to template
  // Signals for reactive state management
  employee = signal(null, ...ngDevMode ? [{ debugName: "employee" }] : []);
  attendanceRecords = signal([], ...ngDevMode ? [{ debugName: "attendanceRecords" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Filter signals
  startDate = signal(this.getDefaultStartDate(), ...ngDevMode ? [{ debugName: "startDate" }] : []);
  endDate = signal(this.getDefaultEndDate(), ...ngDevMode ? [{ debugName: "endDate" }] : []);
  selectedStatus = signal(null, ...ngDevMode ? [{ debugName: "selectedStatus" }] : []);
  // Pagination and sorting signals
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  sortColumn = signal("attendanceDate", ...ngDevMode ? [{ debugName: "sortColumn" }] : []);
  sortDirection = signal("desc", ...ngDevMode ? [{ debugName: "sortDirection" }] : []);
  // Signals for data table component
  tableTotalPages = signal(1, ...ngDevMode ? [{ debugName: "tableTotalPages" }] : []);
  tableTotalItems = signal(0, ...ngDevMode ? [{ debugName: "tableTotalItems" }] : []);
  // Computed values
  filteredRecords = computed(() => {
    const records = this.attendanceRecords();
    const status = this.selectedStatus();
    return records.filter((record) => {
      const matchesStatus = status === null || record.status === status;
      return matchesStatus;
    });
  }, ...ngDevMode ? [{ debugName: "filteredRecords" }] : []);
  // Sorted records
  sortedRecords = computed(() => {
    const records = [...this.filteredRecords()];
    const column = this.sortColumn();
    const direction = this.sortDirection();
    if (!column)
      return records;
    return records.sort((a, b) => {
      let aValue = this.getValueForSorting(a, column);
      let bValue = this.getValueForSorting(b, column);
      if (aValue == null && bValue == null)
        return 0;
      if (aValue == null)
        return direction === "asc" ? 1 : -1;
      if (bValue == null)
        return direction === "asc" ? -1 : 1;
      if (typeof aValue === "string")
        aValue = aValue.toLowerCase();
      if (typeof bValue === "string")
        bValue = bValue.toLowerCase();
      if (aValue < bValue)
        return direction === "asc" ? -1 : 1;
      if (aValue > bValue)
        return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, ...ngDevMode ? [{ debugName: "sortedRecords" }] : []);
  // Pagination computed values
  totalItems = computed(() => this.sortedRecords().length, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()), ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Paginated records
  paginatedRecords = computed(() => {
    const records = this.sortedRecords();
    const page = this.currentPage();
    const size = this.pageSize();
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return records.slice(startIndex, endIndex);
  }, ...ngDevMode ? [{ debugName: "paginatedRecords" }] : []);
  // Attendance statistics computed
  attendanceStats = computed(() => {
    const records = this.filteredRecords();
    const totalDays = records.length;
    const presentDays = records.filter((r) => r.status === AttendanceStatus.Present || r.status === AttendanceStatus.Late || r.status === AttendanceStatus.Overtime).length;
    const absentDays = records.filter((r) => r.status === AttendanceStatus.Absent).length;
    const lateDays = records.filter((r) => r.status === AttendanceStatus.Late).length;
    const overtimeDays = records.filter((r) => r.status === AttendanceStatus.Overtime).length;
    const totalWorkingHours = records.reduce((sum, r) => sum + (r.workingHours || 0), 0);
    const avgWorkingHours = totalDays > 0 ? totalWorkingHours / totalDays : 0;
    const totalLateMinutes = records.reduce((sum, r) => sum + (r.lateMinutes || 0), 0);
    const attendanceRate = totalDays > 0 ? presentDays / totalDays * 100 : 0;
    return {
      totalDays,
      presentDays,
      absentDays,
      lateDays,
      overtimeDays,
      avgWorkingHours,
      totalWorkingHours,
      totalLateMinutes,
      attendanceRate
    };
  }, ...ngDevMode ? [{ debugName: "attendanceStats" }] : []);
  // Summary cards data
  summaryCards = computed(() => {
    const stats = this.attendanceStats();
    const employee = this.employee();
    return [
      {
        title: this.i18n.t("attendance.employee_history.total_days"),
        value: stats.totalDays,
        icon: "fa-solid fa-calendar",
        color: "primary",
        subtitle: this.i18n.t("attendance.employee_history.period_covered")
      },
      {
        title: this.i18n.t("attendance.status.present"),
        value: stats.presentDays,
        icon: "fa-solid fa-check-circle",
        color: "success",
        percentage: stats.totalDays > 0 ? Math.round(stats.presentDays / stats.totalDays * 100) : 0,
        maxValue: stats.totalDays
      },
      {
        title: this.i18n.t("attendance.status.absent"),
        value: stats.absentDays,
        icon: "fa-solid fa-times-circle",
        color: "danger",
        percentage: stats.totalDays > 0 ? Math.round(stats.absentDays / stats.totalDays * 100) : 0,
        maxValue: stats.totalDays
      },
      {
        title: this.i18n.t("attendance.status.late"),
        value: stats.lateDays,
        icon: "fa-solid fa-clock",
        color: "warning",
        percentage: stats.totalDays > 0 ? Math.round(stats.lateDays / stats.totalDays * 100) : 0,
        maxValue: stats.totalDays
      },
      {
        title: this.i18n.t("attendance.attendance_rate"),
        value: Math.round(stats.attendanceRate) + "%",
        icon: "fa-solid fa-percentage",
        color: stats.attendanceRate >= 90 ? "success" : stats.attendanceRate >= 75 ? "warning" : "danger",
        trend: {
          value: Math.round(stats.attendanceRate),
          isPositive: stats.attendanceRate >= 80,
          label: this.i18n.t("attendance.overall_performance")
        }
      },
      {
        title: this.i18n.t("attendance.total_working_hours"),
        value: this.formatHours(stats.totalWorkingHours),
        icon: "fa-solid fa-business-time",
        color: "info",
        subtitle: this.i18n.t("attendance.avg_per_day") + ": " + this.formatHours(stats.avgWorkingHours)
      }
    ];
  }, ...ngDevMode ? [{ debugName: "summaryCards" }] : []);
  // Chart data for attendance distribution
  attendanceChartData = computed(() => {
    const stats = this.attendanceStats();
    if (stats.totalDays === 0) {
      return { labels: [], datasets: [] };
    }
    return {
      labels: [
        this.i18n.t("attendance.status.present"),
        this.i18n.t("attendance.status.absent"),
        this.i18n.t("attendance.status.late"),
        this.i18n.t("attendance.status.overtime")
      ],
      datasets: [{
        label: this.i18n.t("attendance.employee_history.attendance_distribution"),
        data: [stats.presentDays, stats.absentDays, stats.lateDays, stats.overtimeDays],
        backgroundColor: ["#198754", "#dc3545", "#ffc107", "#0dcaf0"],
        borderColor: ["#146c43", "#b02a37", "#d39e00", "#0aa2c0"],
        borderWidth: 2
      }]
    };
  }, ...ngDevMode ? [{ debugName: "attendanceChartData" }] : []);
  // Constants for template
  AttendanceStatus = AttendanceStatus;
  availableStatuses = [
    { value: null, label: "attendance.filters.all_statuses" },
    { value: AttendanceStatus.Present, label: "attendance.status.present" },
    { value: AttendanceStatus.Absent, label: "attendance.status.absent" },
    { value: AttendanceStatus.Late, label: "attendance.status.late" },
    { value: AttendanceStatus.EarlyLeave, label: "attendance.status.early_leave" },
    { value: AttendanceStatus.OnLeave, label: "attendance.status.on_leave" },
    { value: AttendanceStatus.Overtime, label: "attendance.status.overtime" }
  ];
  // Filter configuration for FilterPanelComponent
  filterConfig = {
    dateRange: {
      enabled: true,
      startDate: this.getDefaultStartDate(),
      endDate: this.getDefaultEndDate()
    },
    status: {
      enabled: true,
      multiple: false,
      options: this.availableStatuses.map((s) => ({
        value: s.value,
        label: s.label
      }))
    }
  };
  // Data table configuration - using computed to avoid change detection issues
  tableColumns = computed(() => [
    { key: "attendanceDate", label: this.i18n.t("attendance.fields.date"), sortable: true, width: "120px" },
    { key: "status", label: this.i18n.t("attendance.fields.status"), sortable: true, width: "120px", align: "center", renderHtml: true },
    { key: "checkIn", label: this.i18n.t("attendance.fields.check_in"), sortable: false, width: "100px", align: "center" },
    { key: "checkOut", label: this.i18n.t("attendance.fields.check_out"), sortable: false, width: "100px", align: "center" },
    { key: "workingHours", label: this.i18n.t("attendance.fields.working_hours"), sortable: true, width: "120px", align: "center" },
    { key: "scheduledHours", label: this.i18n.t("attendance.fields.scheduled_hours"), sortable: true, width: "120px", align: "center" },
    { key: "lateMinutes", label: this.i18n.t("attendance.fields.total_late"), sortable: true, width: "100px", align: "center" }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "edit",
      label: this.i18n.t("attendance.actions.edit_record"),
      icon: "fa-edit",
      color: "secondary"
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  /**
   * Transform attendance records for data table - using computed to avoid refresh issues
   */
  tableData = computed(() => {
    return this.paginatedRecords().map((record) => __spreadProps(__spreadValues({}, record), {
      attendanceDate: this.formatDate(record.attendanceDate),
      status: this.formatStatusForTable(record.status),
      checkIn: this.formatTime(this.getCheckInTime(record)),
      checkOut: this.formatTime(this.getCheckOutTime(record)),
      workingHours: this.formatHours(record.workingHours),
      scheduledHours: this.formatHours(record.scheduledHours),
      lateMinutes: this.formatLateTime(record.lateMinutes)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  constructor(attendanceService, employeesService, route, router, location, i18n, notificationService) {
    this.attendanceService = attendanceService;
    this.employeesService = employeesService;
    this.route = route;
    this.router = router;
    this.location = location;
    this.i18n = i18n;
    this.notificationService = notificationService;
    this.employeeId = this.route.snapshot.paramMap.get("id") || this.route.snapshot.queryParamMap.get("employeeId");
    const year = this.route.snapshot.queryParamMap.get("year");
    const month = this.route.snapshot.queryParamMap.get("month");
    if (year && month) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      const formatDateString = /* @__PURE__ */ __name((date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      }, "formatDateString");
      this.startDate.set(formatDateString(startDate));
      this.endDate.set(formatDateString(endDate));
    }
    effect(() => {
      this.tableTotalPages.set(this.totalPages());
      this.tableTotalItems.set(this.totalItems());
    });
  }
  ngOnInit() {
    if (this.employeeId) {
      this.loadEmployeeData();
      this.loadAttendanceData();
    } else {
      this.error.set("Employee ID not found");
      this.loading.set(false);
    }
  }
  /**
   * Handle filter changes from FilterPanelComponent
   */
  onFilterChange(filters) {
    if (filters.dateRange) {
      if (filters.dateRange.startDate) {
        this.startDate.set(filters.dateRange.startDate);
      }
      if (filters.dateRange.endDate) {
        this.endDate.set(filters.dateRange.endDate);
      }
      this.loadAttendanceData();
    }
    if (filters["status"] !== void 0) {
      this.selectedStatus.set(filters["status"] ? Number(filters["status"]) : null);
    }
  }
  ngOnDestroy() {
  }
  /**
   * Load employee information
   */
  loadEmployeeData() {
    if (!this.employeeId)
      return;
    this.employeesService.getEmployeeById(parseInt(this.employeeId)).subscribe({
      next: /* @__PURE__ */ __name((employee) => {
        this.employee.set(employee);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading employee data:", error);
        this.error.set("Failed to load employee information");
      }, "error")
    });
  }
  /**
   * Load attendance data for the employee
   */
  loadAttendanceData() {
    if (!this.employeeId)
      return;
    this.loading.set(true);
    this.error.set(null);
    const startDate = this.startDate();
    const endDate = this.endDate();
    const employeeId = parseInt(this.employeeId);
    this.attendanceService.getEmployeeAttendanceHistoryComplete(employeeId, startDate, endDate).subscribe({
      next: /* @__PURE__ */ __name((records) => {
        this.attendanceRecords.set(records);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading attendance data:", error);
        this.error.set("Failed to load attendance records");
        this.loading.set(false);
        this.notificationService.error("Failed to load attendance records");
      }, "error")
    });
  }
  /**
   * Handle start date change
   */
  onStartDateChange(event) {
    const target = event.target;
    this.startDate.set(target.value);
  }
  /**
   * Handle end date change
   */
  onEndDateChange(event) {
    const target = event.target;
    this.endDate.set(target.value);
  }
  /**
   * Handle status filter change
   */
  onStatusChange(event) {
    const target = event.target;
    const value = target.value === "" ? null : parseInt(target.value);
    this.selectedStatus.set(value);
  }
  /**
   * Handle table sort event
   */
  onSort(event) {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
    this.currentPage.set(1);
  }
  /**
   * Handle page change event
   */
  onPageChange(page) {
    this.currentPage.set(page);
  }
  /**
   * Handle page size change event
   */
  onPageSizeChange(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }
  /**
   * Handle table action clicks
   */
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "edit":
        this.editAttendanceRecord(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  /**
   * Navigate to edit attendance record page
   */
  editAttendanceRecord(record) {
    this.router.navigate(["/attendance/edit", record.id]);
  }
  /**
   * Refresh data
   */
  refresh() {
    this.loadEmployeeData();
    this.loadAttendanceData();
  }
  /**
   * Go back to previous page
   */
  goBack() {
    this.location.back();
  }
  /**
   * Export attendance data
   */
  exportData() {
    const records = this.filteredRecords();
    if (records.length === 0) {
      this.notificationService.warning("No data to export");
      return;
    }
    const employee = this.employee();
    const csvContent = this.generateCSV(records);
    const filename = `employee-attendance-${employee?.employeeNumber || this.employeeId}-${this.startDate()}-${this.endDate()}.csv`;
    this.downloadCSV(csvContent, filename);
    this.notificationService.success("Data exported successfully");
  }
  /**
   * Get default start date (30 days ago)
   */
  getDefaultStartDate() {
    const date = /* @__PURE__ */ new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split("T")[0];
  }
  /**
   * Get default end date (today)
   */
  getDefaultEndDate() {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  /**
   * Get value for sorting
   */
  getValueForSorting(record, column) {
    switch (column) {
      case "attendanceDate":
        return record.attendanceDate;
      case "status":
        return record.status || 0;
      case "workingHours":
        return record.workingHours || 0;
      case "scheduledHours":
        return record.scheduledHours || 0;
      case "lateMinutes":
        return record.lateMinutes || 0;
      default:
        return record[column];
    }
  }
  /**
   * Calculate attendance rate percentage
   */
  getAttendanceRatePercentage() {
    return Math.round(this.attendanceStats().attendanceRate);
  }
  /**
   * Format date for display
   */
  formatDate(date) {
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return date;
    }
  }
  /**
   * Format time for display
   */
  formatTime(time) {
    if (!time)
      return "--:--";
    try {
      let timeToFormat = time;
      if (time.includes("T")) {
        const timePart = time.split("T")[1];
        timeToFormat = timePart.split("Z")[0];
      }
      if (timeToFormat.includes(":")) {
        const date = /* @__PURE__ */ new Date(`1970-01-01T${timeToFormat}`);
        if (!isNaN(date.getTime())) {
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          });
        }
      }
      return timeToFormat;
    } catch {
      return time || "--:--";
    }
  }
  /**
   * Get check-in time with fallback
   */
  getCheckInTime(record) {
    return record.checkInTime || record.actualCheckInTime || null;
  }
  /**
   * Get check-out time with fallback
   */
  getCheckOutTime(record) {
    return record.checkOutTime || record.actualCheckOutTime || null;
  }
  /**
   * Format hours (convert decimal hours to hours and minutes)
   */
  formatHours(hours) {
    if (!hours || hours === 0)
      return "0h 0m";
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (wholeHours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${wholeHours}h`;
    } else {
      return `${wholeHours}h ${minutes}m`;
    }
  }
  /**
   * Format late time from minutes
   */
  formatLateTime(lateMinutes) {
    if (!lateMinutes || lateMinutes === 0)
      return "--";
    const hours = Math.floor(lateMinutes / 60);
    const minutes = lateMinutes % 60;
    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }
  /**
   * Get status badge variant for attendance status
   */
  getStatusBadgeVariant(status) {
    switch (status) {
      case AttendanceStatus.Present:
        return "success";
      case AttendanceStatus.Absent:
      case AttendanceStatus.Incomplete:
        return "danger";
      case AttendanceStatus.Late:
      case AttendanceStatus.EarlyLeave:
      case AttendanceStatus.SickLeave:
        return "warning";
      case AttendanceStatus.OnLeave:
      case AttendanceStatus.OnDuty:
      case AttendanceStatus.Excused:
        return "info";
      case AttendanceStatus.Overtime:
      case AttendanceStatus.RemoteWork:
        return "primary";
      case AttendanceStatus.DayOff:
      case AttendanceStatus.Holiday:
      default:
        return "secondary";
    }
  }
  /**
   * Format status for table display with badge styling
   */
  formatStatusForTable(status) {
    const statusText = this.i18n.t(this.getStatusText(status));
    const variant = this.getStatusBadgeVariant(status);
    return `<span class="badge bg-${variant}">${statusText}</span>`;
  }
  /**
   * Get status text translation key
   */
  getStatusText(status) {
    switch (status) {
      case AttendanceStatus.Present:
        return "attendance.status.present";
      case AttendanceStatus.Absent:
        return "attendance.status.absent";
      case AttendanceStatus.Late:
        return "attendance.status.late";
      case AttendanceStatus.EarlyLeave:
        return "attendance.status.early_leave";
      case AttendanceStatus.OnLeave:
        return "attendance.status.on_leave";
      case AttendanceStatus.DayOff:
        return "attendance.status.day_off";
      case AttendanceStatus.Overtime:
        return "attendance.status.overtime";
      case AttendanceStatus.Incomplete:
        return "attendance.status.incomplete";
      case AttendanceStatus.Holiday:
        return "attendance.status.holiday";
      case AttendanceStatus.SickLeave:
        return "attendance.status.sick_leave";
      case AttendanceStatus.Pending:
        return "attendance.status.pending";
      case AttendanceStatus.OnDuty:
        return "attendance.status.on_duty";
      case AttendanceStatus.Excused:
        return "attendance.status.excused";
      case AttendanceStatus.RemoteWork:
        return "attendance.status.remote_work";
      default:
        return "attendance.status.pending";
    }
  }
  /**
   * Generate CSV content from records
   */
  generateCSV(records) {
    const employee = this.employee();
    const headers = [
      "Date",
      "Status",
      "Check In",
      "Check Out",
      "Working Hours",
      "Required Hours",
      "Late Minutes"
    ];
    const rows = records.map((record) => [
      this.formatDate(record.attendanceDate),
      this.i18n.t(this.getStatusText(record.status)),
      this.formatTime(this.getCheckInTime(record)),
      this.formatTime(this.getCheckOutTime(record)),
      this.formatHours(record.workingHours),
      this.formatHours(record.scheduledHours),
      this.formatLateTime(record.lateMinutes)
    ]);
    const csvHeader = `Employee Attendance Report
Employee: ${employee?.fullName || ""} (${employee?.employeeNumber || ""})
Period: ${this.startDate()} to ${this.endDate()}

`;
    const csvData = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    return csvHeader + csvData;
  }
  /**
   * Download CSV file
   */
  downloadCSV(content, filename) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== void 0) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
__name(_EmployeeAttendanceDetailComponent, "EmployeeAttendanceDetailComponent");
__publicField(_EmployeeAttendanceDetailComponent, "\u0275fac", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmployeeAttendanceDetailComponent)(\u0275\u0275directiveInject(AttendanceService), \u0275\u0275directiveInject(EmployeesService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(Location), \u0275\u0275directiveInject(I18nService), \u0275\u0275directiveInject(NotificationService));
}, "EmployeeAttendanceDetailComponent_Factory"));
__publicField(_EmployeeAttendanceDetailComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeeAttendanceDetailComponent, selectors: [["app-employee-attendance-detail"]], decls: 23, vars: 16, consts: [["cellTemplate", ""], [1, "container-fluid", "p-4"], [1, "row", "mb-4"], [1, "col-12"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "mb-0"], ["type", "button", 1, "btn", "btn-outline-primary", "me-2", 3, "click"], [1, "fa-solid", "fa-arrow-left", "me-2"], ["type", "button", 1, "btn", "btn-outline-secondary", "me-2", 3, "click", "disabled"], [1, "fa-solid", "fa-refresh", "me-2"], ["type", "button", 1, "btn", "btn-success", 3, "click", "disabled"], [1, "fa-solid", "fa-download", "me-2"], [1, "mb-4", 3, "filterChange", "config", "loading"], [1, "text-center", "py-5"], [1, "alert", "alert-danger"], [1, "card"], [1, "card", "employee-info-card"], [1, "card-header"], [1, "fa-solid", "fa-user", "me-2"], [1, "card-body"], [1, "row"], [1, "col-md-3"], [1, "info-item"], [1, "info-label"], [1, "info-value"], [1, "col-xl-2", "col-lg-4", "col-md-6", "mb-3"], [3, "data", "loading", "showProgress", "clickable"], [1, "col-lg-6", "mb-4"], [1, "card", "h-100"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "fa-solid", "fa-chart-pie", "me-2"], [3, "data", "type", "height", "loading"], [1, "fa-solid", "fa-chart-bar", "me-2"], [1, "row", "text-center"], [1, "col-6", "mb-3"], [1, "border", "rounded", "p-3"], [1, "mb-1"], [1, "text-muted"], [1, "text-primary", "mb-1"], [1, "text-info", "mb-1"], [1, "text-warning", "mb-1"], [1, "mt-3", "pt-3", "border-top"], [1, "mb-2"], [1, "d-flex", "justify-content-between", "text-sm"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-2", "text-muted"], [1, "d-flex", "justify-content-between", "align-items-start"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm", "ms-2", 3, "click"], [1, "fa-solid", "fa-refresh", "me-1"], [1, "fa-solid", "fa-table", "me-2"], [1, "d-flex", "align-items-center"], [1, "badge", "bg-light", "text-dark", "me-2"], [1, "badge", "bg-primary"], [1, "card-body", "p-0"], [1, "fa-solid", "fa-calendar-xmark", "fa-3x", "text-muted", "mb-3"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fa-solid", "fa-refresh"], [1, "table-hover", 3, "sortChange", "actionClick", "pageChange", "pageSizeChange", "data", "columns", "actions", "loading", "showPagination", "currentPage", "totalPages", "totalItems", "pageSize", "sortColumn", "sortDirection", "responsiveMode", "searchable", "exportable"], ["customCell", "attendanceDate"], ["customCell", "status"], ["customCell", "checkIn"], ["customCell", "checkOut"], ["customCell", "workingHours"], ["customCell", "scheduledHours"], ["customCell", "lateMinutes"], [1, "fw-medium"], [3, "innerHTML"], [1, "fw-medium", "text-primary"]], template: /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h2", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "button", 6);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Template_button_click_7_listener() {
      return ctx.goBack();
    }, "EmployeeAttendanceDetailComponent_Template_button_click_7_listener"));
    \u0275\u0275element(8, "i", 7);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Template_button_click_10_listener() {
      return ctx.refresh();
    }, "EmployeeAttendanceDetailComponent_Template_button_click_10_listener"));
    \u0275\u0275element(11, "i", 9);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 10);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Template_button_click_13_listener() {
      return ctx.exportData();
    }, "EmployeeAttendanceDetailComponent_Template_button_click_13_listener"));
    \u0275\u0275element(14, "i", 11);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(16, EmployeeAttendanceDetailComponent_Conditional_16_Template, 33, 9, "div", 2);
    \u0275\u0275elementStart(17, "app-filter-panel", 12);
    \u0275\u0275listener("filterChange", /* @__PURE__ */ __name(function EmployeeAttendanceDetailComponent_Template_app_filter_panel_filterChange_17_listener($event) {
      return ctx.onFilterChange($event);
    }, "EmployeeAttendanceDetailComponent_Template_app_filter_panel_filterChange_17_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, EmployeeAttendanceDetailComponent_Conditional_18_Template, 3, 0, "div", 2);
    \u0275\u0275conditionalCreate(19, EmployeeAttendanceDetailComponent_Conditional_19_Template, 61, 29, "div", 2);
    \u0275\u0275conditionalCreate(20, EmployeeAttendanceDetailComponent_Conditional_20_Template, 6, 2, "div", 13);
    \u0275\u0275conditionalCreate(21, EmployeeAttendanceDetailComponent_Conditional_21_Template, 8, 2, "div", 14);
    \u0275\u0275conditionalCreate(22, EmployeeAttendanceDetailComponent_Conditional_22_Template, 16, 14, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.employee_history.title"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("app.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-spin", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx.i18n.t("app.refresh"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading() || ctx.attendanceRecords().length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("attendance.actions.export_data"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.employee() && !ctx.loading() ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("config", ctx.filterConfig)("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.attendanceRecords().length > 0 ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.attendanceRecords().length > 0 ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 22 : -1);
  }
}, "EmployeeAttendanceDetailComponent_Template"), dependencies: [
  CommonModule,
  FormsModule,
  DataTableComponent,
  FilterPanelComponent,
  AttendanceChartComponent,
  AttendanceSummaryCardComponent,
  DatePipe
], styles: ['\n\n.employee-attendance-detail[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: calc(100vh - 120px);\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.page-title[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.employee-info-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  background: white;\n  overflow: hidden;\n}\n.employee-info-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);\n}\n.employee-info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #f8f9fa 100%);\n  border-bottom: 1px solid #f1f3f4;\n  border-radius: 16px 16px 0 0;\n  padding: 1.5rem 1.75rem;\n  position: relative;\n}\n.employee-info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 1.75rem;\n  right: 1.75rem;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  border-radius: 1px;\n}\n.employee-info-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.75rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #6c757d;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.info-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #495057;\n  font-weight: 500;\n}\n.stats-card[_ngcontent-%COMP%] {\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  border-radius: 16px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\n  border: none;\n  background: white;\n  overflow: hidden;\n  position: relative;\n}\n.stats-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.stats-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px) scale(1.02);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\n}\n.stats-card[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n}\n.icon-circle[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.table-responsive[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  overflow: visible;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  background: white;\n  margin-bottom: 2rem;\n}\n.table[_ngcontent-%COMP%]    > [_ngcontent-%COMP%]:not(caption)    > *[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  padding: 1.25rem 1rem;\n  border-bottom: 1px solid #f1f3f4;\n  vertical-align: middle;\n}\n.table-hover[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: all 0.3s ease;\n  border-left: 3px solid transparent;\n}\n.table-hover[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #f8f9ff 0%,\n      #ffffff 100%);\n  border-left-color: #0d6efd;\n  transform: translateX(2px);\n  box-shadow: 0 2px 8px rgba(13, 110, 253, 0.1);\n}\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border-top: none;\n  border-bottom: 2px solid #dee2e6;\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n  letter-spacing: 0.8px;\n  color: #495057;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 2px solid #e9ecef;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  padding: 0.75rem 1rem;\n  font-size: 0.9rem;\n  background: white;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #0d6efd;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08);\n  transform: translateY(-1px);\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.75rem;\n  font-size: 0.875rem;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  font-weight: 600;\n  padding: 0.75rem 1.5rem;\n  border: none;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  position: relative;\n  overflow: hidden;\n}\n.btn[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.4),\n      transparent);\n  transition: left 0.5s;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);\n}\n.btn[_ngcontent-%COMP%]:hover::before {\n  left: 100%;\n}\n.btn[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.btn-group-sm[_ngcontent-%COMP%]    > .btn[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  background: white;\n  overflow: hidden;\n}\n.card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);\n}\n.card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #f8f9fa 100%);\n  border-bottom: 1px solid #f1f3f4;\n  border-radius: 16px 16px 0 0;\n  padding: 1.5rem 1.75rem;\n  position: relative;\n}\n.card-header[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 1.75rem;\n  right: 1.75rem;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  border-radius: 1px;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.75rem;\n}\n.fa-calendar-xmark[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.border-success[_ngcontent-%COMP%] {\n  border-color: #198754 !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(25, 135, 84, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-danger[_ngcontent-%COMP%] {\n  border-color: #dc3545 !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(220, 53, 69, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-warning[_ngcontent-%COMP%] {\n  border-color: #fd7e14 !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(253, 126, 20, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-info[_ngcontent-%COMP%] {\n  border-color: #0dcaf0 !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(13, 202, 240, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-primary[_ngcontent-%COMP%] {\n  border-color: #0d6efd !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(13, 110, 253, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-secondary[_ngcontent-%COMP%] {\n  border-color: #6c757d !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(108, 117, 125, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.badge.bg-success[_ngcontent-%COMP%] {\n  background-color: #198754 !important;\n}\n.badge.bg-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n}\n.badge.bg-warning[_ngcontent-%COMP%] {\n  background-color: #fd7e14 !important;\n  color: white;\n}\n.badge.bg-info[_ngcontent-%COMP%] {\n  background-color: #0dcaf0 !important;\n  color: #000;\n}\n.badge.bg-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n}\n.badge.bg-primary[_ngcontent-%COMP%] {\n  background-color: #0d6efd !important;\n}\n@media (max-width: 768px) {\n  .employee-attendance-detail[_ngcontent-%COMP%] {\n    padding: 1rem;\n    background:\n      linear-gradient(\n        135deg,\n        #f8f9fa 0%,\n        #ffffff 100%);\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    text-align: center;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1.5rem;\n    align-items: center;\n  }\n  .stats-card[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n  .stats-card[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 0.5rem;\n  }\n  .stats-card[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%] {\n    margin: 0 auto 0.75rem;\n    width: 56px;\n    height: 56px;\n  }\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    border-radius: 8px;\n    margin: 0 -0.5rem;\n  }\n  .table[_ngcontent-%COMP%]    > [_ngcontent-%COMP%]:not(caption)    > *[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    padding: 0.75rem 0.5rem;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 0.5rem;\n  }\n  .btn-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n  .form-control[_ngcontent-%COMP%], \n   .form-select[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 1rem 1.25rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n  .employee-info-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%] {\n    row-gap: 1rem;\n  }\n}\n/*# sourceMappingURL=employee-attendance-detail.component.css.map */'] }));
var EmployeeAttendanceDetailComponent = _EmployeeAttendanceDetailComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeAttendanceDetailComponent, [{
    type: Component,
    args: [{ selector: "app-employee-attendance-detail", standalone: true, imports: [
      CommonModule,
      FormsModule,
      DataTableComponent,
      FilterPanelComponent,
      AttendanceChartComponent,
      AttendanceSummaryCardComponent
    ], template: `<div class="container-fluid p-4">\r
  <!-- Page Header -->\r
  <div class="row mb-4">\r
    <div class="col-12">\r
      <div class="d-flex justify-content-between align-items-center">\r
        <h2 class="mb-0">{{ i18n.t('attendance.employee_history.title') }}</h2>\r
        <div>\r
          <button\r
            type="button"\r
            class="btn btn-outline-primary me-2"\r
            (click)="goBack()">\r
            <i class="fa-solid fa-arrow-left me-2"></i>{{ i18n.t('app.back') }}\r
          </button>\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary me-2"\r
            (click)="refresh()"\r
            [disabled]="loading()">\r
            <i class="fa-solid fa-refresh me-2" [class.fa-spin]="loading()"></i>{{ i18n.t('app.refresh') }}\r
          </button>\r
          <button\r
            type="button"\r
            class="btn btn-success"\r
            (click)="exportData()"\r
            [disabled]="loading() || attendanceRecords().length === 0">\r
            <i class="fa-solid fa-download me-2"></i>{{ i18n.t('attendance.actions.export_data') }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Employee Info Card -->\r
  @if (employee() && !loading()) {\r
    <div class="row mb-4">\r
      <div class="col-12">\r
        <div class="card employee-info-card">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-user me-2"></i>\r
              {{ i18n.t('employees.employee_information') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row">\r
              <div class="col-md-3">\r
                <div class="info-item">\r
                  <label class="info-label">{{ i18n.t('employees.employee_number') }}</label>\r
                  <div class="info-value">{{ employee()?.employeeNumber }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-3">\r
                <div class="info-item">\r
                  <label class="info-label">{{ i18n.t('employees.full_name') }}</label>\r
                  <div class="info-value">{{ employee()?.fullName }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-3">\r
                <div class="info-item">\r
                  <label class="info-label">{{ i18n.t('employees.department') }}</label>\r
                  <div class="info-value">{{ employee()?.departmentName || '--' }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-3">\r
                <div class="info-item">\r
                  <label class="info-label">{{ i18n.t('employees.branch') }}</label>\r
                  <div class="info-value">{{ employee()?.branchName || '--' }}</div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Filter Panel -->\r
  <app-filter-panel\r
    [config]="filterConfig"\r
    [loading]="loading()"\r
    (filterChange)="onFilterChange($event)"\r
    class="mb-4">\r
  </app-filter-panel>\r
\r
  <!-- Summary Cards Row -->\r
  @if (!loading() && attendanceRecords().length > 0) {\r
    <div class="row mb-4">\r
      @for (card of summaryCards(); track card.title) {\r
        <div class="col-xl-2 col-lg-4 col-md-6 mb-3">\r
          <app-attendance-summary-card\r
            [data]="card"\r
            [loading]="loading()"\r
            [showProgress]="!!card.percentage"\r
            [clickable]="!!card.link">\r
          </app-attendance-summary-card>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- Charts and Analysis Row -->\r
  @if (!loading() && attendanceRecords().length > 0) {\r
    <div class="row mb-4">\r
      <!-- Attendance Distribution Chart -->\r
      <div class="col-lg-6 mb-4">\r
        <div class="card h-100">\r
          <div class="card-header d-flex justify-content-between align-items-center">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-chart-pie me-2"></i>\r
              {{ i18n.t('attendance.employee_history.attendance_distribution') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <app-attendance-chart\r
              [data]="attendanceChartData()"\r
              [type]="'doughnut'"\r
              [height]="300"\r
              [loading]="loading()">\r
            </app-attendance-chart>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Performance Summary -->\r
      <div class="col-lg-6 mb-4">\r
        <div class="card h-100">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-chart-bar me-2"></i>\r
              {{ i18n.t('attendance.employee_history.performance_summary') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row text-center">\r
              <div class="col-6 mb-3">\r
                <div class="border rounded p-3">\r
                  <h3 [class]="attendanceStats().attendanceRate >= 90 ? 'text-success' : attendanceStats().attendanceRate >= 75 ? 'text-warning' : 'text-danger'" class="mb-1">\r
                    {{ Math.round(attendanceStats().attendanceRate) }}%\r
                  </h3>\r
                  <small class="text-muted">{{ i18n.t('attendance.attendance_rate') }}</small>\r
                </div>\r
              </div>\r
              <div class="col-6 mb-3">\r
                <div class="border rounded p-3">\r
                  <h3 class="text-primary mb-1">{{ attendanceStats().totalDays }}</h3>\r
                  <small class="text-muted">{{ i18n.t('attendance.employee_history.total_days') }}</small>\r
                </div>\r
              </div>\r
              <div class="col-6 mb-3">\r
                <div class="border rounded p-3">\r
                  <h3 class="text-info mb-1">{{ formatHours(attendanceStats().totalWorkingHours) }}</h3>\r
                  <small class="text-muted">{{ i18n.t('attendance.total_working_hours') }}</small>\r
                </div>\r
              </div>\r
              <div class="col-6 mb-3">\r
                <div class="border rounded p-3">\r
                  <h3 class="text-warning mb-1">{{ formatLateTime(attendanceStats().totalLateMinutes) }}</h3>\r
                  <small class="text-muted">{{ i18n.t('attendance.total_late_time') }}</small>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Period Information -->\r
            <div class="mt-3 pt-3 border-top">\r
              <h6 class="mb-2">{{ i18n.t('attendance.period_information') }}</h6>\r
              <div class="d-flex justify-content-between text-sm">\r
                <span class="text-muted">{{ i18n.t('attendance.filters.start_date') }}:</span>\r
                <strong>{{ startDate() | date:'shortDate' }}</strong>\r
              </div>\r
              <div class="d-flex justify-content-between text-sm">\r
                <span class="text-muted">{{ i18n.t('attendance.filters.end_date') }}:</span>\r
                <strong>{{ endDate() | date:'shortDate' }}</strong>\r
              </div>\r
              <div class="d-flex justify-content-between text-sm">\r
                <span class="text-muted">{{ i18n.t('attendance.avg_per_day') }}:</span>\r
                <strong>{{ formatHours(attendanceStats().avgWorkingHours) }}</strong>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <div class="spinner-border text-primary" role="status">\r
        <span class="visually-hidden">{{ i18n.t('app.loading') }}</span>\r
      </div>\r
      <p class="mt-2 text-muted">{{ i18n.t('attendance.messages.loading_employee_data') }}</p>\r
    </div>\r
  }\r
\r
  <!-- Error State -->\r
  @if (error()) {\r
    <div class="alert alert-danger">\r
      <div class="d-flex justify-content-between align-items-start">\r
        <div>\r
          <i class="fa-solid fa-exclamation-triangle me-2"></i>\r
          {{ error() }}\r
        </div>\r
        <button\r
          type="button"\r
          class="btn btn-outline-danger btn-sm ms-2"\r
          (click)="refresh()">\r
          <i class="fa-solid fa-refresh me-1"></i>\r
          {{ i18n.t('app.retry') }}\r
        </button>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Data Table -->\r
  @if (!loading() && !error()) {\r
    <div class="card">\r
      <div class="card-header">\r
        <div class="d-flex justify-content-between align-items-center">\r
          <h5 class="mb-0">\r
            <i class="fa-solid fa-table me-2"></i>\r
            {{ i18n.t('attendance.attendance_history') }}\r
          </h5>\r
          <div class="d-flex align-items-center">\r
            <span class="badge bg-light text-dark me-2">\r
              {{ i18n.t('attendance.period') }}: {{ startDate() | date:'shortDate' }} - {{ endDate() | date:'shortDate' }}\r
            </span>\r
            <span class="badge bg-primary">{{ filteredRecords().length }} {{ i18n.t('attendance.records') }}</span>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="card-body p-0">\r
        <!-- No Records -->\r
        @if (filteredRecords().length === 0) {\r
          <div class="text-center py-5">\r
            <i class="fa-solid fa-calendar-xmark fa-3x text-muted mb-3"></i>\r
            <h5 class="text-muted">{{ i18n.t('attendance.no_records') }}</h5>\r
            <p class="text-muted">{{ i18n.t('attendance.no_records_description') }}</p>\r
            <button type="button" class="btn btn-primary" (click)="loadAttendanceData()">\r
              <i class="fa-solid fa-refresh"></i>\r
              {{ i18n.t('app.refresh') }}\r
            </button>\r
          </div>\r
        }\r
\r
        <!-- Data Table -->\r
        @if (filteredRecords().length > 0) {\r
          <div>\r
            <app-data-table\r
              [data]="tableData()"\r
              [columns]="tableColumns()"\r
              [actions]="tableActions()"\r
              [loading]="loading"\r
              [showPagination]="true"\r
              [currentPage]="currentPage"\r
              [totalPages]="tableTotalPages"\r
              [totalItems]="tableTotalItems"\r
              [pageSize]="pageSize"\r
              [sortColumn]="sortColumn"\r
              [sortDirection]="sortDirection"\r
              [responsiveMode]="'horizontal-scroll'"\r
              [searchable]="true"\r
              [exportable]="true"\r
              (sortChange)="onSort($event)"\r
              (actionClick)="onActionClick($event)"\r
              (pageChange)="onPageChange($event)"\r
              (pageSizeChange)="onPageSizeChange($event)"\r
              class="table-hover">\r
\r
              <!-- Custom cell templates for enhanced display -->\r
              <ng-container customCell="attendanceDate">\r
                <ng-template #cellTemplate let-value="value">\r
                  <span class="fw-medium">{{ value }}</span>\r
                </ng-template>\r
              </ng-container>\r
\r
              <ng-container customCell="status">\r
                <ng-template #cellTemplate let-value="value">\r
                  <div [innerHTML]="value"></div>\r
                </ng-template>\r
              </ng-container>\r
\r
              <ng-container customCell="checkIn">\r
                <ng-template #cellTemplate let-value="value">\r
                  <span [class]="value !== '--:--' ? 'text-success fw-medium' : 'text-muted'">\r
                    {{ value }}\r
                  </span>\r
                </ng-template>\r
              </ng-container>\r
\r
              <ng-container customCell="checkOut">\r
                <ng-template #cellTemplate let-value="value">\r
                  <span [class]="value !== '--:--' ? 'text-danger fw-medium' : 'text-muted'">\r
                    {{ value }}\r
                  </span>\r
                </ng-template>\r
              </ng-container>\r
\r
              <ng-container customCell="workingHours">\r
                <ng-template #cellTemplate let-value="value">\r
                  <span class="fw-medium text-primary">{{ value }}</span>\r
                </ng-template>\r
              </ng-container>\r
\r
              <ng-container customCell="scheduledHours">\r
                <ng-template #cellTemplate let-value="value">\r
                  <span class="text-muted">{{ value }}</span>\r
                </ng-template>\r
              </ng-container>\r
\r
              <ng-container customCell="lateMinutes">\r
                <ng-template #cellTemplate let-value="value">\r
                  <span [class]="value !== '--' ? 'text-warning fw-medium' : 'text-muted'">\r
                    {{ value }}\r
                  </span>\r
                </ng-template>\r
              </ng-container>\r
            </app-data-table>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  }\r
</div>`, styles: ['/* src/app/pages/attendance/employee-detail/employee-attendance-detail.component.css */\n.employee-attendance-detail {\n  padding: 1.5rem;\n  min-height: calc(100vh - 120px);\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.page-title {\n  color: #2c3e50;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.employee-info-card {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  background: white;\n  overflow: hidden;\n}\n.employee-info-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);\n}\n.employee-info-card .card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #f8f9fa 100%);\n  border-bottom: 1px solid #f1f3f4;\n  border-radius: 16px 16px 0 0;\n  padding: 1.5rem 1.75rem;\n  position: relative;\n}\n.employee-info-card .card-header::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 1.75rem;\n  right: 1.75rem;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  border-radius: 1px;\n}\n.employee-info-card .card-body {\n  padding: 1.75rem;\n}\n.info-item {\n  margin-bottom: 1rem;\n}\n.info-label {\n  font-weight: 600;\n  color: #6c757d;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.info-value {\n  font-size: 1rem;\n  color: #495057;\n  font-weight: 500;\n}\n.stats-card {\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  border-radius: 16px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\n  border: none;\n  background: white;\n  overflow: hidden;\n  position: relative;\n}\n.stats-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.stats-card:hover {\n  transform: translateY(-4px) scale(1.02);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\n}\n.stats-card:hover::before {\n  opacity: 1;\n}\n.icon-circle {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-circle i {\n  font-size: 1.2rem;\n}\n.table-responsive {\n  border-radius: 12px;\n  overflow: visible;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  background: white;\n  margin-bottom: 2rem;\n}\n.table > :not(caption) > * > * {\n  padding: 1.25rem 1rem;\n  border-bottom: 1px solid #f1f3f4;\n  vertical-align: middle;\n}\n.table-hover tbody tr {\n  transition: all 0.3s ease;\n  border-left: 3px solid transparent;\n}\n.table-hover tbody tr:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #f8f9ff 0%,\n      #ffffff 100%);\n  border-left-color: #0d6efd;\n  transform: translateX(2px);\n  box-shadow: 0 2px 8px rgba(13, 110, 253, 0.1);\n}\n.table thead th {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border-top: none;\n  border-bottom: 2px solid #dee2e6;\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n  letter-spacing: 0.8px;\n  color: #495057;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.form-control,\n.form-select {\n  border-radius: 12px;\n  border: 2px solid #e9ecef;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  padding: 0.75rem 1rem;\n  font-size: 0.9rem;\n  background: white;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #0d6efd;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08);\n  transform: translateY(-1px);\n}\n.form-label {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.75rem;\n  font-size: 0.875rem;\n}\n.btn {\n  border-radius: 12px;\n  font-weight: 600;\n  padding: 0.75rem 1.5rem;\n  border: none;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  position: relative;\n  overflow: hidden;\n}\n.btn::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.4),\n      transparent);\n  transition: left 0.5s;\n}\n.btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);\n}\n.btn:hover::before {\n  left: 100%;\n}\n.btn:active {\n  transform: translateY(0);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.card {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  background: white;\n  overflow: hidden;\n}\n.card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);\n}\n.card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #f8f9fa 100%);\n  border-bottom: 1px solid #f1f3f4;\n  border-radius: 16px 16px 0 0;\n  padding: 1.5rem 1.75rem;\n  position: relative;\n}\n.card-header::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 1.75rem;\n  right: 1.75rem;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  border-radius: 1px;\n}\n.card-body {\n  padding: 1.75rem;\n}\n.fa-calendar-xmark {\n  opacity: 0.5;\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.border-success {\n  border-color: #198754 !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(25, 135, 84, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-danger {\n  border-color: #dc3545 !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(220, 53, 69, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-warning {\n  border-color: #fd7e14 !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(253, 126, 20, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-info {\n  border-color: #0dcaf0 !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(13, 202, 240, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-primary {\n  border-color: #0d6efd !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(13, 110, 253, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-secondary {\n  border-color: #6c757d !important;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(108, 117, 125, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.badge.bg-success {\n  background-color: #198754 !important;\n}\n.badge.bg-danger {\n  background-color: #dc3545 !important;\n}\n.badge.bg-warning {\n  background-color: #fd7e14 !important;\n  color: white;\n}\n.badge.bg-info {\n  background-color: #0dcaf0 !important;\n  color: #000;\n}\n.badge.bg-secondary {\n  background-color: #6c757d !important;\n}\n.badge.bg-primary {\n  background-color: #0d6efd !important;\n}\n@media (max-width: 768px) {\n  .employee-attendance-detail {\n    padding: 1rem;\n    background:\n      linear-gradient(\n        135deg,\n        #f8f9fa 0%,\n        #ffffff 100%);\n  }\n  .page-title {\n    font-size: 1.5rem;\n    text-align: center;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1.5rem;\n    align-items: center;\n  }\n  .stats-card {\n    margin-bottom: 1rem;\n  }\n  .stats-card .d-flex {\n    flex-direction: column;\n    text-align: center;\n    gap: 0.5rem;\n  }\n  .stats-card .icon-circle {\n    margin: 0 auto 0.75rem;\n    width: 56px;\n    height: 56px;\n  }\n  .table-responsive {\n    font-size: 0.85rem;\n    border-radius: 8px;\n    margin: 0 -0.5rem;\n  }\n  .table > :not(caption) > * > * {\n    padding: 0.75rem 0.5rem;\n  }\n  .btn {\n    width: 100%;\n    margin-bottom: 0.5rem;\n  }\n  .btn-group {\n    flex-direction: column;\n    width: 100%;\n  }\n  .form-control,\n  .form-select {\n    font-size: 16px;\n  }\n  .card-header {\n    padding: 1rem 1.25rem;\n  }\n  .card-body {\n    padding: 1.25rem;\n  }\n  .employee-info-card .card-body .row {\n    row-gap: 1rem;\n  }\n}\n/*# sourceMappingURL=employee-attendance-detail.component.css.map */\n'] }]
  }], () => [{ type: AttendanceService }, { type: EmployeesService }, { type: ActivatedRoute }, { type: Router }, { type: Location }, { type: I18nService }, { type: NotificationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeeAttendanceDetailComponent, { className: "EmployeeAttendanceDetailComponent", filePath: "src/app/pages/attendance/employee-detail/employee-attendance-detail.component.ts", lineNumber: 46 });
})();
export {
  EmployeeAttendanceDetailComponent
};
//# sourceMappingURL=chunk-QMOQTXDD.js.map
