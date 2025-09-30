import {
  AttendanceService
} from "./chunk-AQFSMIN5.js";
import {
  DefinitionListComponent
} from "./chunk-RISUZMFK.js";
import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  EmploymentStatus,
  Gender,
  WorkLocationType
} from "./chunk-TLKJPMWD.js";
import {
  EmptyStateComponent
} from "./chunk-A4RQO434.js";
import {
  EmployeesService
} from "./chunk-WMEU4YDP.js";
import {
  StatsGridComponent
} from "./chunk-TZ2SODGW.js";
import "./chunk-JLDQHPY3.js";
import {
  LoadingSpinnerComponent
} from "./chunk-WJCQS5EA.js";
import {
  HasPermissionDirective
} from "./chunk-4AGVDNDW.js";
import {
  StatusBadgeComponent
} from "./chunk-GFM52OPW.js";
import {
  AttendanceStatus
} from "./chunk-T6ZZRW4R.js";
import {
  PermissionActions,
  PermissionResources,
  PermissionService
} from "./chunk-DKGIYIS4.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import {
  FormsModule
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  Router,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/employees/view-employee/view-employee.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.attendanceDate, "_forTrack0");
var _forTrack1 = /* @__PURE__ */ __name(($index, $item) => $item.transactionTimeLocal, "_forTrack1");
function ViewEmployeeComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.t("common.loading"))("centered", true);
  }
}
__name(ViewEmployeeComponent_Conditional_2_Template, "ViewEmployeeComponent_Conditional_2_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-status-badge", 22);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("label", ctx_r0.employee().currentShiftName)("variant", "primary")("icon", "fas fa-clock");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_41_Template, "ViewEmployeeComponent_Conditional_3_Conditional_41_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("employees.no_shift_assigned"));
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_42_Template, "ViewEmployeeComponent_Conditional_3_Conditional_42_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "h6", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-status-badge", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.gender.title"));
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.getGenderLabel(ctx_r0.employee().gender))("variant", "light")("showIcon", false);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_43_Template, "ViewEmployeeComponent_Conditional_3_Conditional_43_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "small", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.first_name_ar"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r0.employee()) == null ? null : tmp_4_0.firstNameAr);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_5_Template, "ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_5_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "small", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.last_name_ar"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r0.employee()) == null ? null : tmp_4_0.lastNameAr);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_6_Template, "ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_6_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.job_title_ar"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r0.employee()) == null ? null : tmp_4_0.jobTitleAr);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_7_Template, "ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_7_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 8)(2, "h6", 9);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 15);
    \u0275\u0275conditionalCreate(5, ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_5_Template, 6, 2, "div", 52);
    \u0275\u0275conditionalCreate(6, ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_6_Template, 6, 2, "div", 52);
    \u0275\u0275conditionalCreate(7, ViewEmployeeComponent_Conditional_3_Conditional_49_Conditional_7_Template, 6, 2, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.arabic_names"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_3_0 = ctx_r0.employee()) == null ? null : tmp_3_0.firstNameAr) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_4_0 = ctx_r0.employee()) == null ? null : tmp_4_0.lastNameAr) ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_5_0 = ctx_r0.employee()) == null ? null : tmp_5_0.jobTitleAr) ? 7 : -1);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_49_Template, "ViewEmployeeComponent_Conditional_3_Conditional_49_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.deactivate"), " ");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_56_Template, "ViewEmployeeComponent_Conditional_3_Conditional_56_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.activate"), " ");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_57_Template, "ViewEmployeeComponent_Conditional_3_Conditional_57_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_101_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275element(1, "app-loading-spinner", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.t("attendance.messages.loading_data"))("variant", "primary")("centered", true);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_101_Conditional_1_Template, "ViewEmployeeComponent_Conditional_3_Conditional_101_Conditional_1_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_101_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 16)(2, "h6", 57);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 58)(5, "div", 59)(6, "span");
    \u0275\u0275element(7, "i", 60);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 61);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 59)(12, "span");
    \u0275\u0275element(13, "i", 62);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 63);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 59)(18, "span");
    \u0275\u0275element(19, "i", 64);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 65);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "div", 16)(24, "h6", 57);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 58)(27, "div", 59)(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 13);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 59)(33, "span");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 13);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 59)(38, "span");
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 13);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.statistics.attendance_breakdown"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("attendance.status.present"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.presentDays());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("attendance.status.absent"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.absentDays());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("attendance.status.late"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.lateDays());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.statistics.time_summary"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.stats.average_working_hours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.averageWorkingHours(), "h");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.stats.total_overtime_hours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.totalOvertimeHours(), "h");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.statistics.total_working_days"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.totalWorkingDays());
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_101_Conditional_2_Template, "ViewEmployeeComponent_Conditional_3_Conditional_101_Conditional_2_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275conditionalCreate(1, ViewEmployeeComponent_Conditional_3_Conditional_101_Conditional_1_Template, 2, 3, "div", 55)(2, ViewEmployeeComponent_Conditional_3_Conditional_101_Conditional_2_Template, 42, 14, "div", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.attendanceLoading() ? 1 : 2);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_101_Template, "ViewEmployeeComponent_Conditional_3_Conditional_101_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275element(1, "app-loading-spinner", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("variant", "primary")("centered", true);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_1_Template, "ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_1_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_2_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td")(11, "span", 13);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td")(17, "span", 14);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const record_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(record_r3.attendanceDate));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(record_r3.actualCheckInTime ? "text-success fw-medium" : "text-muted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatTime(record_r3.actualCheckInTime), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(record_r3.actualCheckOutTime ? "text-info fw-medium" : "text-muted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatTime(record_r3.actualCheckOutTime), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.calculateWorkDuration(record_r3.actualCheckInTime, record_r3.actualCheckOutTime), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getStatusBadgeClass(record_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("attendance.status." + record_r3.status.toString().toLowerCase()), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(record_r3.notes || "--");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_2_For_18_Template, "ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_2_For_18_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "table", 69)(2, "thead", 70)(3, "tr")(4, "th");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_2_For_18_Template, 19, 12, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.attendance_date"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.check_in_time"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.check_out_time"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.work_duration"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.status"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.notes"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.attendanceRecords());
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_2_Template, "ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_2_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 67);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("icon", "fa-solid fa-calendar-xmark")("title", ctx_r0.t("attendance.no_records"))("message", ctx_r0.t("attendance.no_records_description"));
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_3_Template, "ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_3_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275conditionalCreate(1, ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_1_Template, 2, 2, "div", 55)(2, ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_2_Template, 19, 6, "div", 66)(3, ViewEmployeeComponent_Conditional_3_Conditional_102_Conditional_3_Template, 1, 3, "app-empty-state", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.attendanceLoading() ? 1 : ctx_r0.attendanceRecords().length > 0 ? 2 : 3);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_102_Template, "ViewEmployeeComponent_Conditional_3_Conditional_102_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_1_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span", 14);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275element(13, "app-status-badge", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 14);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const transaction_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(transaction_r4.transactionTimeLocal));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatTime(transaction_r4.transactionTimeLocal));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getTransactionTypeBadgeClass(transaction_r4.transactionType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", transaction_r4.transactionTypeText, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(transaction_r4.location || "--");
    \u0275\u0275advance(2);
    \u0275\u0275property("label", transaction_r4.isManual ? ctx_r0.t("app.yes") : ctx_r0.t("app.no"))("variant", transaction_r4.isManual ? "warning" : "success")("icon", transaction_r4.isManual ? "fas fa-hand-paper" : "fas fa-fingerprint")("size", "sm");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(transaction_r4.notes || "--");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_1_For_16_Template, "ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_1_For_16_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "table", 69)(2, "thead", 70)(3, "tr")(4, "th");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_1_For_16_Template, 17, 11, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.datetime"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.transaction_type"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.location"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.manual"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.fields.notes"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.recentTransactions());
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_1_Template, "ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_1_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 67);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("icon", "fa-solid fa-list")("title", ctx_r0.t("attendance.no_transactions"))("message", ctx_r0.t("attendance.no_transactions_description"));
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_2_Template, "ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_2_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275conditionalCreate(1, ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_1_Template, 17, 5, "div", 66)(2, ViewEmployeeComponent_Conditional_3_Conditional_103_Conditional_2_Template, 1, 3, "app-empty-state", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.recentTransactions().length > 0 ? 1 : 2);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_103_Template, "ViewEmployeeComponent_Conditional_3_Conditional_103_Template");
function ViewEmployeeComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "div", 8)(4, "h5", 9)(5, "div", 10)(6, "div", 11)(7, "div", 12);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "div", 13);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 14);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(14, "div", 15)(15, "div", 5)(16, "div", 16);
    \u0275\u0275element(17, "app-definition-list", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 16);
    \u0275\u0275element(19, "app-definition-list", 17);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(20, "div", 18)(21, "div", 7)(22, "div", 8)(23, "h6", 9);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 15)(26, "div", 19)(27, "h6", 20);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "app-status-badge", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 19)(31, "h6", 20);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275element(33, "app-status-badge", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 19)(35, "h6", 20);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275element(37, "app-status-badge", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 19)(39, "h6", 20);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(41, ViewEmployeeComponent_Conditional_3_Conditional_41_Template, 1, 3, "app-status-badge", 22)(42, ViewEmployeeComponent_Conditional_3_Conditional_42_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(43, ViewEmployeeComponent_Conditional_3_Conditional_43_Template, 4, 4, "div", 19);
    \u0275\u0275elementStart(44, "div")(45, "h6", 20);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "small", 14);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(49, ViewEmployeeComponent_Conditional_3_Conditional_49_Template, 8, 4, "div", 23);
    \u0275\u0275elementStart(50, "div", 23)(51, "div", 8)(52, "h6", 9);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 15)(55, "div", 24);
    \u0275\u0275conditionalCreate(56, ViewEmployeeComponent_Conditional_3_Conditional_56_Template, 3, 1, "button", 25)(57, ViewEmployeeComponent_Conditional_3_Conditional_57_Template, 3, 1, "button", 26);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(58, "div", 27)(59, "div", 28)(60, "div", 7)(61, "div", 8)(62, "div", 29)(63, "h5", 9);
    \u0275\u0275element(64, "i", 30);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 31)(67, "input", 32);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Template_input_change_67_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDateRangeChange($event.target.value, ctx_r0.selectedDateRange().end));
    }, "ViewEmployeeComponent_Conditional_3_Template_input_change_67_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "span", 33);
    \u0275\u0275text(69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "input", 32);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Template_input_change_70_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDateRangeChange(ctx_r0.selectedDateRange().start, $event.target.value));
    }, "ViewEmployeeComponent_Conditional_3_Template_input_change_70_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "button", 34);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Template_button_click_71_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.exportAttendanceData());
    }, "ViewEmployeeComponent_Conditional_3_Template_button_click_71_listener"));
    \u0275\u0275element(72, "i", 35);
    \u0275\u0275text(73);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(74, "div", 15);
    \u0275\u0275element(75, "app-stats-grid", 36);
    \u0275\u0275elementStart(76, "div", 37)(77, "div", 28)(78, "div", 7)(79, "div", 38)(80, "h6", 39);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "div", 40)(83, "div", 41)(84, "span", 42);
    \u0275\u0275text(85);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(86, "app-status-badge", 22);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(87, "ul", 43)(88, "li", 44)(89, "button", 45);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Template_button_click_89_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setActiveTab("overview"));
    }, "ViewEmployeeComponent_Conditional_3_Template_button_click_89_listener"));
    \u0275\u0275element(90, "i", 46);
    \u0275\u0275text(91);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "li", 44)(93, "button", 45);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Template_button_click_93_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setActiveTab("records"));
    }, "ViewEmployeeComponent_Conditional_3_Template_button_click_93_listener"));
    \u0275\u0275element(94, "i", 47);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "li", 44)(97, "button", 45);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Template_button_click_97_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setActiveTab("transactions"));
    }, "ViewEmployeeComponent_Conditional_3_Template_button_click_97_listener"));
    \u0275\u0275element(98, "i", 48);
    \u0275\u0275text(99);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(100, "div", 49);
    \u0275\u0275conditionalCreate(101, ViewEmployeeComponent_Conditional_3_Conditional_101_Template, 3, 1, "div", 50);
    \u0275\u0275conditionalCreate(102, ViewEmployeeComponent_Conditional_3_Conditional_102_Template, 4, 1, "div", 50);
    \u0275\u0275conditionalCreate(103, ViewEmployeeComponent_Conditional_3_Conditional_103_Template, 3, 1, "div", 50);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_12_0;
    let tmp_22_0;
    let tmp_23_0;
    let tmp_26_0;
    let tmp_28_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate2(" ", (((tmp_1_0 = ctx_r0.employee()) == null ? null : tmp_1_0.firstName == null ? null : tmp_1_0.firstName.charAt(0)) || "") == null ? null : (((tmp_1_0 = tmp_1_0) == null ? null : tmp_1_0.firstName == null ? null : tmp_1_0.firstName.charAt(0)) || "").toUpperCase(), "", (((tmp_1_0 = ctx_r0.employee()) == null ? null : tmp_1_0.lastName == null ? null : tmp_1_0.lastName.charAt(0)) || "") == null ? null : (((tmp_1_0 = tmp_1_0) == null ? null : tmp_1_0.lastName == null ? null : tmp_1_0.lastName.charAt(0)) || "").toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r0.employee()) == null ? null : tmp_2_0.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r0.employee()) == null ? null : tmp_3_0.employeeNumber);
    \u0275\u0275advance(4);
    \u0275\u0275property("items", ctx_r0.basicInfoItems())("labelWidth", "5")("valueWidth", "7");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.employmentInfoItems())("labelWidth", "5")("valueWidth", "7");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.employment_details"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("common.status"));
    \u0275\u0275advance();
    \u0275\u0275property("status", ((tmp_12_0 = ctx_r0.employee()) == null ? null : tmp_12_0.isActive) ? "active" : "inactive");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.employment_status.title"));
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.getEmploymentStatusLabel(ctx_r0.employee().employmentStatus))("variant", "info")("icon", "fas fa-briefcase");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.work_location.title"));
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.getWorkLocationTypeLabel(ctx_r0.employee().workLocationType))("variant", "light")("icon", "fas fa-map-marker-alt");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.current_shift"));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_22_0 = ctx_r0.employee()) == null ? null : tmp_22_0.currentShiftName) ? 41 : 42);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_23_0 = ctx_r0.employee()) == null ? null : tmp_23_0.gender) ? 43 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.created_at"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(ctx_r0.employee().createdAtUtc));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_26_0 = ctx_r0.employee()) == null ? null : tmp_26_0.firstNameAr) || ((tmp_26_0 = ctx_r0.employee()) == null ? null : tmp_26_0.lastNameAr) || ((tmp_26_0 = ctx_r0.employee()) == null ? null : tmp_26_0.jobTitleAr) ? 49 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("common.actions"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(((tmp_28_0 = ctx_r0.employee()) == null ? null : tmp_28_0.isActive) ? 56 : 57);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("attendance.employee_detail"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r0.selectedDateRange().start);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.to"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.selectedDateRange().end);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.attendanceRecords().length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("attendance.actions.export_data"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("stats", ctx_r0.attendanceStats())("columns", 4)("loading", ctx_r0.attendanceLoading());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.t("attendance.stats.attendance_rate"));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("--progress", ctx_r0.attendanceRate() + "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.attendanceRate(), "%");
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.getPerformanceLabel(ctx_r0.attendanceRate()))("variant", ctx_r0.getPerformanceColor(ctx_r0.attendanceRate()))("icon", ctx_r0.attendanceRate() >= 95 ? "fas fa-star" : ctx_r0.attendanceRate() >= 90 ? "fas fa-thumbs-up" : ctx_r0.attendanceRate() >= 80 ? "fas fa-exclamation-triangle" : "fas fa-times-circle");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r0.activeTab() === "overview");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("attendance.statistics.overview"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.activeTab() === "records");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("attendance.statistics.records"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.activeTab() === "transactions");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("attendance.statistics.transactions"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.activeTab() === "overview" ? 101 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.activeTab() === "records" ? 102 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.activeTab() === "transactions" ? 103 : -1);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Template, "ViewEmployeeComponent_Conditional_3_Template");
function ViewEmployeeComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "i", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.t("employees.employee_not_found"), " ");
  }
}
__name(ViewEmployeeComponent_Conditional_4_Template, "ViewEmployeeComponent_Conditional_4_Template");
var _ViewEmployeeComponent = class _ViewEmployeeComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  employeesService = inject(EmployeesService);
  attendanceService = inject(AttendanceService);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  employee = signal(null, ...ngDevMode ? [{ debugName: "employee" }] : []);
  employeeId = 0;
  // Attendance-related signals
  attendanceLoading = signal(false, ...ngDevMode ? [{ debugName: "attendanceLoading" }] : []);
  attendanceRecords = signal([], ...ngDevMode ? [{ debugName: "attendanceRecords" }] : []);
  attendanceStatistics = signal(null, ...ngDevMode ? [{ debugName: "attendanceStatistics" }] : []);
  recentTransactions = signal([], ...ngDevMode ? [{ debugName: "recentTransactions" }] : []);
  selectedDateRange = signal({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
    end: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  }, ...ngDevMode ? [{ debugName: "selectedDateRange" }] : []);
  activeTab = signal("overview", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  // Computed values for attendance summary
  totalWorkingDays = computed(() => {
    const records = this.attendanceRecords();
    return records.length;
  }, ...ngDevMode ? [{ debugName: "totalWorkingDays" }] : []);
  presentDays = computed(() => {
    const records = this.attendanceRecords();
    return records.filter((r) => r.status === AttendanceStatus.Present).length;
  }, ...ngDevMode ? [{ debugName: "presentDays" }] : []);
  absentDays = computed(() => {
    const records = this.attendanceRecords();
    return records.filter((r) => r.status === AttendanceStatus.Absent).length;
  }, ...ngDevMode ? [{ debugName: "absentDays" }] : []);
  lateDays = computed(() => {
    const records = this.attendanceRecords();
    return records.filter((r) => r.status === AttendanceStatus.Late).length;
  }, ...ngDevMode ? [{ debugName: "lateDays" }] : []);
  attendanceRate = computed(() => {
    const total = this.totalWorkingDays();
    const present = this.presentDays();
    return total > 0 ? Math.round(present / total * 100) : 0;
  }, ...ngDevMode ? [{ debugName: "attendanceRate" }] : []);
  averageWorkingHours = computed(() => {
    const records = this.attendanceRecords();
    const workingRecords = records.filter((r) => r.workingHours > 0);
    if (workingRecords.length === 0)
      return 0;
    const total = workingRecords.reduce((sum, r) => sum + r.workingHours, 0);
    return Math.round(total / workingRecords.length * 10) / 10;
  }, ...ngDevMode ? [{ debugName: "averageWorkingHours" }] : []);
  totalOvertimeHours = computed(() => {
    const records = this.attendanceRecords();
    return Math.round(records.reduce((sum, r) => sum + r.overtimeHours, 0) * 10) / 10;
  }, ...ngDevMode ? [{ debugName: "totalOvertimeHours" }] : []);
  // Permission constants for use in template
  PERMISSIONS = {
    EMPLOYEE_UPDATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`,
    EMPLOYEE_DELETE: `${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`,
    EMPLOYEE_MANAGE: `${PermissionResources.EMPLOYEE}.${PermissionActions.MANAGE}`
  };
  ngOnInit() {
    this.employeeId = +this.route.snapshot.params["id"];
    if (this.employeeId) {
      this.loadEmployee();
      this.loadAttendanceData();
    } else {
      this.router.navigate(["/employees"]);
    }
  }
  loadEmployee() {
    this.loading.set(true);
    this.employeesService.getEmployeeById(this.employeeId).subscribe({
      next: /* @__PURE__ */ __name((employee) => {
        this.employee.set(employee);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.error.set("Failed to load employee");
        this.loading.set(false);
        console.error("Error loading employee:", error);
      }, "error")
    });
  }
  /**
   * Load attendance data for the employee
   */
  loadAttendanceData() {
    this.attendanceLoading.set(true);
    const dateRange = this.selectedDateRange();
    this.attendanceService.getEmployeeAttendanceRecords(this.employeeId, dateRange.start, dateRange.end).subscribe({
      next: /* @__PURE__ */ __name((records) => {
        this.attendanceRecords.set(records);
        this.attendanceLoading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading attendance records:", error);
        this.attendanceLoading.set(false);
      }, "error")
    });
    this.attendanceService.getEmployeeRecentTransactions(this.employeeId, 10).subscribe({
      next: /* @__PURE__ */ __name((transactions) => {
        this.recentTransactions.set(transactions);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading transactions:", error);
      }, "error")
    });
  }
  /**
   * Handle date range change
   */
  onDateRangeChange(start, end) {
    this.selectedDateRange.set({ start, end });
    this.loadAttendanceData();
  }
  /**
   * Change active tab
   */
  setActiveTab(tab) {
    this.activeTab.set(tab);
  }
  /**
   * Get status badge class
   */
  getStatusBadgeClass(status) {
    switch (status) {
      case AttendanceStatus.Present:
        return "badge bg-success";
      case AttendanceStatus.Absent:
        return "badge bg-danger";
      case AttendanceStatus.Late:
        return "badge bg-warning";
      case AttendanceStatus.EarlyLeave:
        return "badge bg-warning";
      case AttendanceStatus.OnLeave:
        return "badge bg-info";
      case AttendanceStatus.DayOff:
        return "badge bg-secondary";
      case AttendanceStatus.Overtime:
        return "badge bg-primary";
      default:
        return "badge bg-secondary";
    }
  }
  /**
   * Get transaction type badge class
   */
  getTransactionTypeBadgeClass(type) {
    switch (type) {
      case 0:
        return "badge bg-success";
      case 1:
        return "badge bg-danger";
      case 2:
        return "badge bg-warning";
      case 3:
        return "badge bg-info";
      case 4:
        return "badge bg-primary";
      default:
        return "badge bg-secondary";
    }
  }
  /**
   * Format time for display
   */
  formatTime(time) {
    if (!time)
      return "--:--";
    try {
      const date = /* @__PURE__ */ new Date(`1970-01-01T${time}`);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    } catch {
      return time;
    }
  }
  /**
   * Calculate work duration
   */
  calculateWorkDuration(checkIn, checkOut) {
    if (!checkIn || !checkOut)
      return "--";
    try {
      const start = /* @__PURE__ */ new Date(`1970-01-01T${checkIn}`);
      const end = /* @__PURE__ */ new Date(`1970-01-01T${checkOut}`);
      const diffMs = end.getTime() - start.getTime();
      const hours = Math.floor(diffMs / (1e3 * 60 * 60));
      const minutes = Math.floor(diffMs % (1e3 * 60 * 60) / (1e3 * 60));
      return `${hours}h ${minutes}m`;
    } catch {
      return "--";
    }
  }
  /**
   * Get performance color based on attendance rate
   */
  getPerformanceColor(rate) {
    if (rate >= 95)
      return "success";
    if (rate >= 90)
      return "primary";
    if (rate >= 80)
      return "warning";
    return "danger";
  }
  /**
   * Get performance label based on attendance rate
   */
  getPerformanceLabel(rate) {
    if (rate >= 95)
      return "Excellent";
    if (rate >= 90)
      return "Good";
    if (rate >= 80)
      return "Average";
    return "Needs Improvement";
  }
  /**
   * Export employee attendance data
   */
  exportAttendanceData() {
    const records = this.attendanceRecords();
    if (records.length === 0) {
      this.notificationService.warning("No attendance data to export");
      return;
    }
    const csvContent = this.generateAttendanceCSV(records);
    this.downloadCSV(csvContent, `employee-${this.employeeId}-attendance.csv`);
    this.notificationService.success("Attendance data exported successfully");
  }
  /**
   * Generate CSV content from attendance records
   */
  generateAttendanceCSV(records) {
    const headers = [
      "Date",
      "Status",
      "Check In",
      "Check Out",
      "Working Hours",
      "Break Hours",
      "Overtime Hours",
      "Notes"
    ];
    const rows = records.map((record) => [
      record.attendanceDate,
      this.getStatusText(record.status),
      this.formatTime(record.actualCheckInTime || null),
      this.formatTime(record.actualCheckOutTime || null),
      record.workingHours.toString(),
      record.breakHours.toString(),
      record.overtimeHours.toString(),
      record.notes || ""
    ]);
    return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
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
  /**
   * Get status text
   */
  getStatusText(status) {
    return this.i18n.t(`attendance.status.${status.toString().toLowerCase()}`);
  }
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
  getEmploymentStatusLabel(status) {
    return this.t(`employees.employment_status.${EmploymentStatus[status].toLowerCase()}`);
  }
  getGenderLabel(gender) {
    return this.t(`employees.gender.${Gender[gender].toLowerCase()}`);
  }
  getWorkLocationTypeLabel(type) {
    return this.t(`employees.work_location.${WorkLocationType[type].toLowerCase()}`);
  }
  t(key) {
    return this.i18n.t(key);
  }
  // Computed properties for definition lists
  basicInfoItems = computed(() => {
    const employee = this.employee();
    if (!employee)
      return [];
    return [
      { label: this.t("employees.employee_number"), value: employee.employeeNumber },
      { label: this.t("employees.first_name"), value: employee.firstName },
      { label: this.t("employees.last_name"), value: employee.lastName },
      { label: this.t("employees.email"), value: employee.email || "-" },
      { label: this.t("employees.phone"), value: employee.phone || "-" },
      { label: this.t("employees.national_id"), value: employee.nationalId || "-" }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoItems" }] : []);
  employmentInfoItems = computed(() => {
    const employee = this.employee();
    if (!employee)
      return [];
    const items = [
      { label: this.t("employees.job_title"), value: employee.jobTitle },
      { label: this.t("employees.branch"), value: employee.branchName },
      { label: this.t("employees.department"), value: employee.departmentName || "-" },
      { label: this.t("employees.manager"), value: employee.managerName || "-" },
      { label: this.t("employees.hire_date"), value: this.formatDate(employee.hireDate), type: "date" }
    ];
    if (employee.dateOfBirth) {
      items.push({
        label: this.t("employees.date_of_birth"),
        value: this.formatDate(employee.dateOfBirth),
        type: "date"
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "employmentInfoItems" }] : []);
  // Computed property for attendance stats grid
  attendanceStats = computed(() => {
    return [
      {
        label: this.t("attendance.statistics.total_working_days"),
        value: this.totalWorkingDays(),
        icon: "fa-solid fa-calendar",
        variant: "primary"
      },
      {
        label: this.t("attendance.stats.present_employees"),
        value: this.presentDays(),
        icon: "fa-solid fa-user-check",
        variant: "success",
        subtitle: `${this.attendanceRate()}% ${this.t("attendance.statistics.attendance_rate_short")}`
      },
      {
        label: this.t("attendance.stats.average_working_hours"),
        value: `${this.averageWorkingHours()}h`,
        icon: "fa-solid fa-business-time",
        variant: "warning",
        subtitle: `${this.totalOvertimeHours()}h ${this.t("attendance.statistics.total_overtime")}`
      },
      {
        label: this.t("attendance.stats.absent_employees"),
        value: this.absentDays(),
        icon: "fa-solid fa-user-times",
        variant: "danger",
        subtitle: `${this.lateDays()} ${this.t("attendance.statistics.late_days")}`
      }
    ];
  }, ...ngDevMode ? [{ debugName: "attendanceStats" }] : []);
};
__name(_ViewEmployeeComponent, "ViewEmployeeComponent");
__publicField(_ViewEmployeeComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewEmployeeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewEmployeeComponent)();
}, "ViewEmployeeComponent_Factory"));
__publicField(_ViewEmployeeComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewEmployeeComponent, selectors: [["app-view-employee"]], decls: 5, vars: 4, consts: [[1, "container-fluid"], ["mode", "view", "moduleName", "employees", "moduleRoute", "employees", 3, "title", "entityId", "loading"], [1, "d-flex", "justify-content-center", "py-5"], [1, "alert", "alert-danger"], [3, "message", "centered"], [1, "row"], [1, "col-lg-8"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-3"], [1, "avatar-title", "bg-primary-subtle", "text-primary", "rounded-circle"], [1, "fw-medium"], [1, "text-muted"], [1, "card-body"], [1, "col-md-6"], [3, "items", "labelWidth", "valueWidth"], [1, "col-lg-4"], [1, "mb-3"], [1, "fw-semibold"], [3, "status"], [3, "label", "variant", "icon"], [1, "card", "mt-3"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-outline-warning"], ["type", "button", 1, "btn", "btn-outline-success"], [1, "row", "mt-4"], [1, "col-12"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "fa-solid", "fa-calendar-check", "me-2"], [1, "d-flex", "gap-2"], ["type", "date", 1, "form-control", "form-control-sm", 2, "width", "auto", 3, "change", "value"], [1, "align-self-center"], ["type", "button", 1, "btn", "btn-success", "btn-sm", 3, "click", "disabled"], [1, "fa-solid", "fa-download"], [1, "mb-4", 3, "stats", "columns", "loading"], [1, "row", "mb-4"], [1, "card-body", "text-center"], [1, "card-title"], [1, "performance-circle", "mb-3"], [1, "circle-progress"], [1, "percentage"], ["role", "tablist", 1, "nav", "nav-tabs", "mb-3"], ["role", "presentation", 1, "nav-item"], ["type", "button", 1, "nav-link", 3, "click"], [1, "fa-solid", "fa-chart-pie", "me-2"], [1, "fa-solid", "fa-table", "me-2"], [1, "fa-solid", "fa-list", "me-2"], [1, "tab-content"], [1, "tab-pane", "fade", "show", "active"], [3, "label", "variant", "showIcon"], [1, "mb-2"], [1, "fa-solid", "fa-user-slash", "me-2"], [1, "fa-solid", "fa-user-check", "me-2"], [1, "text-center", "py-4"], [3, "message", "variant", "centered"], [1, "fw-semibold", "mb-3"], [1, "list-group", "list-group-flush"], [1, "list-group-item", "d-flex", "justify-content-between", "align-items-center"], [1, "fa-solid", "fa-user-check", "text-success", "me-2"], [1, "badge", "bg-success", "rounded-pill"], [1, "fa-solid", "fa-user-times", "text-danger", "me-2"], [1, "badge", "bg-danger", "rounded-pill"], [1, "fa-solid", "fa-clock", "text-warning", "me-2"], [1, "badge", "bg-warning", "rounded-pill"], [1, "table-responsive"], [3, "icon", "title", "message"], [3, "variant", "centered"], [1, "table", "table-hover"], [1, "table-light"], [3, "label", "variant", "icon", "size"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function ViewEmployeeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewEmployeeComponent_Conditional_2_Template, 2, 2, "div", 2)(3, ViewEmployeeComponent_Conditional_3_Template, 104, 57)(4, ViewEmployeeComponent_Conditional_4_Template, 3, 1, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("employees.view_details"))("entityId", ctx.employeeId)("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : ctx.employee() ? 3 : 4);
  }
}, "ViewEmployeeComponent_Template"), dependencies: [CommonModule, FormsModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, EmptyStateComponent, DefinitionListComponent, StatsGridComponent], styles: ['\n\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.icon-circle[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.performance-circle[_ngcontent-%COMP%] {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  margin: 0 auto;\n}\n.circle-progress[_ngcontent-%COMP%] {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  background:\n    conic-gradient(\n      #198754 0deg,\n      #198754 calc(var(--progress) * 3.6deg),\n      #e9ecef calc(var(--progress) * 3.6deg),\n      #e9ecef 360deg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  animation: _ngcontent-%COMP%_fadeIn 1s ease-in-out;\n}\n.circle-progress[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: white;\n}\n.percentage[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #198754;\n  z-index: 1;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@media (max-width: 768px) {\n  .performance-circle[_ngcontent-%COMP%] {\n    width: 100px;\n    height: 100px;\n  }\n  .circle-progress[_ngcontent-%COMP%] {\n    width: 100px;\n    height: 100px;\n  }\n  .circle-progress[_ngcontent-%COMP%]::before {\n    width: 70px;\n    height: 70px;\n  }\n  .percentage[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .icon-circle[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n  .icon-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n/*# sourceMappingURL=view-employee.component.css.map */'] }));
var ViewEmployeeComponent = _ViewEmployeeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewEmployeeComponent, [{
    type: Component,
    args: [{ selector: "app-view-employee", standalone: true, imports: [CommonModule, FormsModule, HasPermissionDirective, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, EmptyStateComponent, DefinitionListComponent, StatsGridComponent], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="t('employees.view_details')"\r
    moduleName="employees"\r
    moduleRoute="employees"\r
    [entityId]="employeeId"\r
    [loading]="loading()">\r
  </app-form-header>\r
\r
  @if (loading()) {\r
    <div class="d-flex justify-content-center py-5">\r
      <app-loading-spinner\r
        [message]="t('common.loading')"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  } @else if (employee()) {\r
    <!-- Employee Details -->\r
    <div class="row">\r
      <!-- Main Information Card -->\r
      <div class="col-lg-8">\r
        <div class="card">\r
          <div class="card-header">\r
            <h5 class="card-title mb-0">\r
              <div class="d-flex align-items-center">\r
                <div class="avatar-sm me-3">\r
                  <div class="avatar-title bg-primary-subtle text-primary rounded-circle">\r
                    {{ (employee()?.firstName?.charAt(0) || '')?.toUpperCase() }}{{ (employee()?.lastName?.charAt(0) || '')?.toUpperCase() }}\r
                  </div>\r
                </div>\r
                <div>\r
                  <div class="fw-medium">{{ employee()?.fullName }}</div>\r
                  <small class="text-muted">{{ employee()?.employeeNumber }}</small>\r
                </div>\r
              </div>\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row">\r
              <!-- Basic Information -->\r
              <div class="col-md-6">\r
                <app-definition-list\r
                  [items]="basicInfoItems()"\r
                  [labelWidth]="'5'"\r
                  [valueWidth]="'7'">\r
                </app-definition-list>\r
              </div>\r
\r
              <!-- Employment Information -->\r
              <div class="col-md-6">\r
                <app-definition-list\r
                  [items]="employmentInfoItems()"\r
                  [labelWidth]="'5'"\r
                  [valueWidth]="'7'">\r
                </app-definition-list>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Status and Details Card -->\r
      <div class="col-lg-4">\r
        <div class="card">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">{{ t('employees.employment_details') }}</h6>\r
          </div>\r
          <div class="card-body">\r
            <!-- Status -->\r
            <div class="mb-3">\r
              <h6 class="fw-semibold">{{ t('common.status') }}</h6>\r
              <app-status-badge\r
                [status]="employee()?.isActive ? 'active' : 'inactive'">\r
              </app-status-badge>\r
            </div>\r
            \r
            <!-- Employment Status -->\r
            <div class="mb-3">\r
              <h6 class="fw-semibold">{{ t('employees.employment_status.title') }}</h6>\r
              <app-status-badge\r
                [label]="getEmploymentStatusLabel(employee()!.employmentStatus)"\r
                [variant]="'info'"\r
                [icon]="'fas fa-briefcase'">\r
              </app-status-badge>\r
            </div>\r
\r
            <!-- Work Location -->\r
            <div class="mb-3">\r
              <h6 class="fw-semibold">{{ t('employees.work_location.title') }}</h6>\r
              <app-status-badge\r
                [label]="getWorkLocationTypeLabel(employee()!.workLocationType)"\r
                [variant]="'light'"\r
                [icon]="'fas fa-map-marker-alt'">\r
              </app-status-badge>\r
            </div>\r
\r
            <!-- Current Shift -->\r
            <div class="mb-3">\r
              <h6 class="fw-semibold">{{ t('employees.current_shift') }}</h6>\r
              @if (employee()?.currentShiftName) {\r
                <app-status-badge\r
                  [label]="employee()!.currentShiftName"\r
                  [variant]="'primary'"\r
                  [icon]="'fas fa-clock'">\r
                </app-status-badge>\r
              } @else {\r
                <span class="text-muted">{{ t('employees.no_shift_assigned') }}</span>\r
              }\r
            </div>\r
\r
            <!-- Gender -->\r
            @if (employee()?.gender) {\r
              <div class="mb-3">\r
                <h6 class="fw-semibold">{{ t('employees.gender.title') }}</h6>\r
                <app-status-badge\r
                  [label]="getGenderLabel(employee()!.gender!)"\r
                  [variant]="'light'"\r
                  [showIcon]="false">\r
                </app-status-badge>\r
              </div>\r
            }\r
\r
            <!-- Created Date -->\r
            <div>\r
              <h6 class="fw-semibold">{{ t('employees.created_at') }}</h6>\r
              <small class="text-muted">{{ formatDate(employee()!.createdAtUtc) }}</small>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Arabic Names Card (if available) -->\r
        @if (employee()?.firstNameAr || employee()?.lastNameAr || employee()?.jobTitleAr) {\r
          <div class="card mt-3">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">{{ t('employees.arabic_names') }}</h6>\r
            </div>\r
            <div class="card-body">\r
              @if (employee()?.firstNameAr) {\r
                <div class="mb-2">\r
                  <small class="text-muted">{{ t('employees.first_name_ar') }}</small><br>\r
                  <span>{{ employee()?.firstNameAr }}</span>\r
                </div>\r
              }\r
              @if (employee()?.lastNameAr) {\r
                <div class="mb-2">\r
                  <small class="text-muted">{{ t('employees.last_name_ar') }}</small><br>\r
                  <span>{{ employee()?.lastNameAr }}</span>\r
                </div>\r
              }\r
              @if (employee()?.jobTitleAr) {\r
                <div>\r
                  <small class="text-muted">{{ t('employees.job_title_ar') }}</small><br>\r
                  <span>{{ employee()?.jobTitleAr }}</span>\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Quick Actions Card -->\r
        <div class="card mt-3">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">{{ t('common.actions') }}</h6>\r
          </div>\r
          <div class="card-body">\r
            <div class="d-grid gap-2">\r
              @if (employee()?.isActive) {\r
                <button \r
                  type="button" \r
                  class="btn btn-outline-warning">\r
                  <i class="fa-solid fa-user-slash me-2"></i>\r
                  {{ t('employees.deactivate') }}\r
                </button>\r
              } @else {\r
                <button \r
                  type="button" \r
                  class="btn btn-outline-success">\r
                  <i class="fa-solid fa-user-check me-2"></i>\r
                  {{ t('employees.activate') }}\r
                </button>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Attendance Information Section -->\r
    <div class="row mt-4">\r
      <div class="col-12">\r
        <div class="card">\r
          <div class="card-header">\r
            <div class="d-flex justify-content-between align-items-center">\r
              <h5 class="card-title mb-0">\r
                <i class="fa-solid fa-calendar-check me-2"></i>\r
                {{ t('attendance.employee_detail') }}\r
              </h5>\r
              <div class="d-flex gap-2">\r
                <input\r
                  type="date"\r
                  class="form-control form-control-sm"\r
                  [value]="selectedDateRange().start"\r
                  (change)="onDateRangeChange($event.target.value, selectedDateRange().end)"\r
                  style="width: auto;">\r
                <span class="align-self-center">{{ t('common.to') }}</span>\r
                <input\r
                  type="date"\r
                  class="form-control form-control-sm"\r
                  [value]="selectedDateRange().end"\r
                  (change)="onDateRangeChange(selectedDateRange().start, $event.target.value)"\r
                  style="width: auto;">\r
                <button\r
                  type="button"\r
                  class="btn btn-success btn-sm"\r
                  (click)="exportAttendanceData()"\r
                  [disabled]="attendanceRecords().length === 0">\r
                  <i class="fa-solid fa-download"></i>\r
                  {{ t('attendance.actions.export_data') }}\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
          <div class="card-body">\r
            <!-- Attendance Summary Cards -->\r
            <app-stats-grid\r
              [stats]="attendanceStats()"\r
              [columns]="4"\r
              [loading]="attendanceLoading()"\r
              class="mb-4">\r
            </app-stats-grid>\r
\r
            <!-- Performance Indicator -->\r
            <div class="row mb-4">\r
              <div class="col-12">\r
                <div class="card">\r
                  <div class="card-body text-center">\r
                    <h6 class="card-title">{{ t('attendance.stats.attendance_rate') }}</h6>\r
                    <div class="performance-circle mb-3">\r
                      <div class="circle-progress" [style.--progress]="attendanceRate() + '%'">\r
                        <span class="percentage">{{ attendanceRate() }}%</span>\r
                      </div>\r
                    </div>\r
                    <app-status-badge\r
                      [label]="getPerformanceLabel(attendanceRate())"\r
                      [variant]="getPerformanceColor(attendanceRate())"\r
                      [icon]="attendanceRate() >= 95 ? 'fas fa-star' : attendanceRate() >= 90 ? 'fas fa-thumbs-up' : attendanceRate() >= 80 ? 'fas fa-exclamation-triangle' : 'fas fa-times-circle'">\r
                    </app-status-badge>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Attendance Tabs -->\r
            <ul class="nav nav-tabs mb-3" role="tablist">\r
              <li class="nav-item" role="presentation">\r
                <button\r
                  class="nav-link"\r
                  [class.active]="activeTab() === 'overview'"\r
                  (click)="setActiveTab('overview')"\r
                  type="button">\r
                  <i class="fa-solid fa-chart-pie me-2"></i>\r
                  {{ t('attendance.statistics.overview') }}\r
                </button>\r
              </li>\r
              <li class="nav-item" role="presentation">\r
                <button\r
                  class="nav-link"\r
                  [class.active]="activeTab() === 'records'"\r
                  (click)="setActiveTab('records')"\r
                  type="button">\r
                  <i class="fa-solid fa-table me-2"></i>\r
                  {{ t('attendance.statistics.records') }}\r
                </button>\r
              </li>\r
              <li class="nav-item" role="presentation">\r
                <button\r
                  class="nav-link"\r
                  [class.active]="activeTab() === 'transactions'"\r
                  (click)="setActiveTab('transactions')"\r
                  type="button">\r
                  <i class="fa-solid fa-list me-2"></i>\r
                  {{ t('attendance.statistics.transactions') }}\r
                </button>\r
              </li>\r
            </ul>\r
\r
            <!-- Tab Content -->\r
            <div class="tab-content">\r
              <!-- Overview Tab -->\r
              @if (activeTab() === 'overview') {\r
                <div class="tab-pane fade show active">\r
                @if (attendanceLoading()) {\r
                  <div class="text-center py-4">\r
                    <app-loading-spinner\r
                      [message]="t('attendance.messages.loading_data')"\r
                      [variant]="'primary'"\r
                      [centered]="true">\r
                    </app-loading-spinner>\r
                  </div>\r
                } @else {\r
                  <div class="row">\r
                    <div class="col-md-6">\r
                      <h6 class="fw-semibold mb-3">{{ t('attendance.statistics.attendance_breakdown') }}</h6>\r
                      <div class="list-group list-group-flush">\r
                        <div class="list-group-item d-flex justify-content-between align-items-center">\r
                          <span>\r
                            <i class="fa-solid fa-user-check text-success me-2"></i>\r
                            {{ t('attendance.status.present') }}\r
                          </span>\r
                          <span class="badge bg-success rounded-pill">{{ presentDays() }}</span>\r
                        </div>\r
                        <div class="list-group-item d-flex justify-content-between align-items-center">\r
                          <span>\r
                            <i class="fa-solid fa-user-times text-danger me-2"></i>\r
                            {{ t('attendance.status.absent') }}\r
                          </span>\r
                          <span class="badge bg-danger rounded-pill">{{ absentDays() }}</span>\r
                        </div>\r
                        <div class="list-group-item d-flex justify-content-between align-items-center">\r
                          <span>\r
                            <i class="fa-solid fa-clock text-warning me-2"></i>\r
                            {{ t('attendance.status.late') }}\r
                          </span>\r
                          <span class="badge bg-warning rounded-pill">{{ lateDays() }}</span>\r
                        </div>\r
                      </div>\r
                    </div>\r
                    <div class="col-md-6">\r
                      <h6 class="fw-semibold mb-3">{{ t('attendance.statistics.time_summary') }}</h6>\r
                      <div class="list-group list-group-flush">\r
                        <div class="list-group-item d-flex justify-content-between align-items-center">\r
                          <span>{{ t('attendance.stats.average_working_hours') }}</span>\r
                          <span class="fw-medium">{{ averageWorkingHours() }}h</span>\r
                        </div>\r
                        <div class="list-group-item d-flex justify-content-between align-items-center">\r
                          <span>{{ t('attendance.stats.total_overtime_hours') }}</span>\r
                          <span class="fw-medium">{{ totalOvertimeHours() }}h</span>\r
                        </div>\r
                        <div class="list-group-item d-flex justify-content-between align-items-center">\r
                          <span>{{ t('attendance.statistics.total_working_days') }}</span>\r
                          <span class="fw-medium">{{ totalWorkingDays() }}</span>\r
                        </div>\r
                      </div>\r
                    </div>\r
                  </div>\r
                }\r
                </div>\r
              }\r
\r
              <!-- Records Tab -->\r
              @if (activeTab() === 'records') {\r
                <div class="tab-pane fade show active">\r
                @if (attendanceLoading()) {\r
                  <div class="text-center py-4">\r
                    <app-loading-spinner\r
                      [variant]="'primary'"\r
                      [centered]="true">\r
                    </app-loading-spinner>\r
                  </div>\r
                } @else if (attendanceRecords().length > 0) {\r
                  <div class="table-responsive">\r
                    <table class="table table-hover">\r
                      <thead class="table-light">\r
                        <tr>\r
                          <th>{{ t('attendance.fields.attendance_date') }}</th>\r
                          <th>{{ t('attendance.fields.check_in_time') }}</th>\r
                          <th>{{ t('attendance.fields.check_out_time') }}</th>\r
                          <th>{{ t('attendance.fields.work_duration') }}</th>\r
                          <th>{{ t('attendance.fields.status') }}</th>\r
                          <th>{{ t('attendance.fields.notes') }}</th>\r
                        </tr>\r
                      </thead>\r
                      <tbody>\r
                        @for (record of attendanceRecords(); track record.attendanceDate) {\r
                          <tr>\r
                            <td>\r
                            <span class="fw-medium">{{ formatDate(record.attendanceDate) }}</span>\r
                          </td>\r
                          <td>\r
                            <span [class]="record.actualCheckInTime ? 'text-success fw-medium' : 'text-muted'">\r
                              {{ formatTime(record.actualCheckInTime) }}\r
                            </span>\r
                          </td>\r
                          <td>\r
                            <span [class]="record.actualCheckOutTime ? 'text-info fw-medium' : 'text-muted'">\r
                              {{ formatTime(record.actualCheckOutTime) }}\r
                            </span>\r
                          </td>\r
                          <td>\r
                            <span class="fw-medium">\r
                              {{ calculateWorkDuration(record.actualCheckInTime, record.actualCheckOutTime) }}\r
                            </span>\r
                          </td>\r
                          <td>\r
                            <span [class]="getStatusBadgeClass(record.status)">\r
                              {{ t('attendance.status.' + record.status.toString().toLowerCase()) }}\r
                            </span>\r
                          </td>\r
                          <td>\r
                            <span class="text-muted">{{ record.notes || '--' }}</span>\r
                          </td>\r
                          </tr>\r
                        }\r
                      </tbody>\r
                    </table>\r
                  </div>\r
                } @else {\r
                  <app-empty-state\r
                    [icon]="'fa-solid fa-calendar-xmark'"\r
                    [title]="t('attendance.no_records')"\r
                    [message]="t('attendance.no_records_description')">\r
                  </app-empty-state>\r
                }\r
                </div>\r
              }\r
\r
              <!-- Transactions Tab -->\r
              @if (activeTab() === 'transactions') {\r
                <div class="tab-pane fade show active">\r
                @if (recentTransactions().length > 0) {\r
                  <div class="table-responsive">\r
                    <table class="table table-hover">\r
                      <thead class="table-light">\r
                        <tr>\r
                          <th>{{ t('attendance.fields.datetime') }}</th>\r
                          <th>{{ t('attendance.fields.transaction_type') }}</th>\r
                          <th>{{ t('attendance.fields.location') }}</th>\r
                          <th>{{ t('attendance.fields.manual') }}</th>\r
                          <th>{{ t('attendance.fields.notes') }}</th>\r
                        </tr>\r
                      </thead>\r
                      <tbody>\r
                        @for (transaction of recentTransactions(); track transaction.transactionTimeLocal) {\r
                          <tr>\r
                            <td>\r
                            <div class="fw-medium">{{ formatDate(transaction.transactionTimeLocal) }}</div>\r
                            <small class="text-muted">{{ formatTime(transaction.transactionTimeLocal) }}</small>\r
                          </td>\r
                          <td>\r
                            <span [class]="getTransactionTypeBadgeClass(transaction.transactionType)">\r
                              {{ transaction.transactionTypeText }}\r
                            </span>\r
                          </td>\r
                          <td>\r
                            <span class="text-muted">{{ transaction.location || '--' }}</span>\r
                          </td>\r
                          <td>\r
                            <app-status-badge\r
                              [label]="transaction.isManual ? t('app.yes') : t('app.no')"\r
                              [variant]="transaction.isManual ? 'warning' : 'success'"\r
                              [icon]="transaction.isManual ? 'fas fa-hand-paper' : 'fas fa-fingerprint'"\r
                              [size]="'sm'">\r
                            </app-status-badge>\r
                          </td>\r
                          <td>\r
                            <span class="text-muted">{{ transaction.notes || '--' }}</span>\r
                          </td>\r
                          </tr>\r
                        }\r
                      </tbody>\r
                    </table>\r
                  </div>\r
                } @else {\r
                  <app-empty-state\r
                    [icon]="'fa-solid fa-list'"\r
                    [title]="t('attendance.no_transactions')"\r
                    [message]="t('attendance.no_transactions_description')">\r
                  </app-empty-state>\r
                }\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  } @else {\r
    <div class="alert alert-danger">\r
      <i class="fa-solid fa-exclamation-triangle me-2"></i>\r
      {{ error() || t('employees.employee_not_found') }}\r
    </div>\r
  }\r
</div>`, styles: ['/* src/app/pages/employees/view-employee/view-employee.component.css */\n.avatar-sm {\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.icon-circle {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-circle i {\n  font-size: 1.2rem;\n}\n.performance-circle {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  margin: 0 auto;\n}\n.circle-progress {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  background:\n    conic-gradient(\n      #198754 0deg,\n      #198754 calc(var(--progress) * 3.6deg),\n      #e9ecef calc(var(--progress) * 3.6deg),\n      #e9ecef 360deg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  animation: fadeIn 1s ease-in-out;\n}\n.circle-progress::before {\n  content: "";\n  position: absolute;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: white;\n}\n.percentage {\n  position: relative;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #198754;\n  z-index: 1;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@media (max-width: 768px) {\n  .performance-circle {\n    width: 100px;\n    height: 100px;\n  }\n  .circle-progress {\n    width: 100px;\n    height: 100px;\n  }\n  .circle-progress::before {\n    width: 70px;\n    height: 70px;\n  }\n  .percentage {\n    font-size: 1.2rem;\n  }\n  .icon-circle {\n    width: 40px;\n    height: 40px;\n  }\n  .icon-circle i {\n    font-size: 1rem;\n  }\n}\n/*# sourceMappingURL=view-employee.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewEmployeeComponent, { className: "ViewEmployeeComponent", filePath: "src/app/pages/employees/view-employee/view-employee.component.ts", lineNumber: 28 });
})();
export {
  ViewEmployeeComponent
};
//# sourceMappingURL=chunk-27PSSOLA.js.map
