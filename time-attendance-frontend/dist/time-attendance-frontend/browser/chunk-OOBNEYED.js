import {
  AttendanceService
} from "./chunk-233LUQFN.js";
import {
  ShiftType
} from "./chunk-ICLZUHFB.js";
import {
  ShiftsService
} from "./chunk-3L6JDBEN.js";
import {
  EmployeesService
} from "./chunk-IR2IKZBB.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
import {
  AttendanceStatus
} from "./chunk-7XYWDBYG.js";
import {
  PageHeaderComponent
} from "./chunk-DKGFJHVQ.js";
import {
  FormBuilder,
  ReactiveFormsModule
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  CommonModule,
  Component,
  DatePipe,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/attendance/daily-attendance-detail/daily-attendance-detail.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function DailyAttendanceDetailComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 4)(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
  }
}
__name(DailyAttendanceDetailComponent_Conditional_0_Template, "DailyAttendanceDetailComponent_Conditional_0_Template");
function DailyAttendanceDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "i", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(DailyAttendanceDetailComponent_Conditional_1_Template, "DailyAttendanceDetailComponent_Conditional_1_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_122_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 23)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "br");
    \u0275\u0275elementStart(5, "span", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.break_hours"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatHoursAsTime(ctx_r0.attendanceRecord().breakHours || 0));
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_122_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_122_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_130_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 23)(2, "div", 55)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ul", 56)(6, "li");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "li");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "li");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const shiftData_r3 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("shifts.fields.flexible_hours"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3("", ctx_r0.i18n.t("shifts.fields.flex_minutes_before"), ": ", shiftData_r3.flexMinutesBefore || 0, " ", ctx_r0.i18n.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r0.i18n.t("shifts.fields.flex_minutes_after"), ": ", shiftData_r3.flexMinutesAfter || 0, " ", ctx_r0.i18n.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r0.i18n.t("shifts.fields.grace_period"), ": ", shiftData_r3.gracePeriodMinutes || 0, " ", ctx_r0.i18n.t("common.minutes"));
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_130_Conditional_40_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_130_Conditional_40_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 47)(2, "div", 48)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "br");
    \u0275\u0275elementStart(6, "span", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 48)(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "br");
    \u0275\u0275elementStart(12, "span", 31);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 47)(15, "div", 48)(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "br");
    \u0275\u0275elementStart(19, "span", 52);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 48)(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "br");
    \u0275\u0275elementStart(25, "span", 53);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 47)(28, "div", 48)(29, "strong");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "br");
    \u0275\u0275elementStart(32, "span", 32);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 48)(35, "strong");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275element(37, "br");
    \u0275\u0275elementStart(38, "span", 54);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(40, DailyAttendanceDetailComponent_Conditional_2_Conditional_130_Conditional_40_Template, 12, 10, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const shiftData_r3 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("shifts.fields.name"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(shiftData_r3.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("shifts.fields.description"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(shiftData_r3.description || "--");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("shifts.fields.start_time"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.getShiftStartTime(shiftData_r3));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("shifts.fields.end_time"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.getShiftEndTime(shiftData_r3));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("shifts.fields.working_hours"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatHoursAsTime(shiftData_r3.requiredHours || 0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("shifts.fields.shift_type"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.getShiftTypeDisplay(shiftData_r3));
    \u0275\u0275advance();
    \u0275\u0275conditional(shiftData_r3.allowFlexibleHours ? 40 : -1);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_130_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_130_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "i", 57);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.daily_detail.no_shift_assigned"));
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_131_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_131_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_For_5_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "div", 23)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 65);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const vacation_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_vacations.fields.notes"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vacation_r4.notes);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_For_5_Conditional_32_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_For_5_Conditional_32_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 28)(2, "div", 29)(3, "div", 30)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "br");
    \u0275\u0275elementStart(7, "span", 32);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 30)(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "br");
    \u0275\u0275elementStart(13, "span", 31);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 36)(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "br");
    \u0275\u0275elementStart(19, "span", 33);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 36)(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "br")(25, "app-status-badge", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 36)(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "br");
    \u0275\u0275elementStart(30, "small", 31);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(32, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_For_5_Conditional_32_Template, 6, 2, "div", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const vacation_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("vacation_types.fields.name"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vacation_r4.vacationTypeName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_vacations.fields.period"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r0.formatDate(vacation_r4.startDate), " - ", ctx_r0.formatDate(vacation_r4.endDate), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_vacations.fields.duration"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", vacation_r4.durationDays, " ", vacation_r4.durationDays === 1 ? ctx_r0.i18n.t("common.dayUnit") : ctx_r0.i18n.t("common.days_text"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_vacations.fields.status"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275property("label", vacation_r4.isApproved ? ctx_r0.i18n.t("employee_vacations.approved") : ctx_r0.i18n.t("employee_vacations.pending"))("variant", vacation_r4.isApproved ? "success" : "warning")("icon", vacation_r4.isApproved ? "fas fa-check-circle" : "fas fa-hourglass-half");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("common.created_date"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(vacation_r4.createdAtUtc));
    \u0275\u0275advance();
    \u0275\u0275conditional(vacation_r4.notes ? 32 : -1);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_For_5_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_For_5_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "h6", 60);
    \u0275\u0275element(2, "i", 61);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_For_5_Template, 33, 15, "div", 62, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.vacations"), " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.leaveExcuseDetails().vacations);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275element(2, "br")(3, "app-status-badge", 63);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.fields.attachment"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275property("label", ctx_r0.i18n.t("employee_excuses.has_attachment"))("variant", "info")("icon", "fas fa-paperclip");
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_28_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_28_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_35_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "br");
    \u0275\u0275elementStart(1, "small", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const excuse_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(excuse_r5.approvedAt));
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_35_Conditional_6_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_35_Conditional_6_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "span", 52);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_35_Conditional_6_Template, 3, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const excuse_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.fields.approved_by"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(excuse_r5.approvedByName);
    \u0275\u0275advance();
    \u0275\u0275conditional(excuse_r5.approvedAt ? 6 : -1);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_35_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_35_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "div", 23)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 69);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const excuse_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.fields.rejection_reason"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(excuse_r5.rejectionReason);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_36_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_36_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "div", 23)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 65);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const excuse_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.fields.processing_notes"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(excuse_r5.processingNotes);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_37_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_37_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 28)(2, "div", 29)(3, "div", 30)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "br");
    \u0275\u0275elementStart(7, "span", 51);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 30)(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "br");
    \u0275\u0275elementStart(13, "span", 31);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 36)(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "br");
    \u0275\u0275elementStart(19, "span", 33);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 36)(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "br");
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 36);
    \u0275\u0275conditionalCreate(28, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_28_Template, 4, 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 64)(30, "div", 68)(31, "strong");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "p", 65);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(35, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_35_Template, 7, 3, "div", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(36, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_36_Template, 6, 2, "div", 64);
    \u0275\u0275conditionalCreate(37, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Conditional_37_Template, 6, 2, "div", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const excuse_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.fields.excuse_type"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(excuse_r5.excuseTypeDisplay);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.fields.time_period"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(excuse_r5.timeRangeDisplay);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.fields.duration"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(excuse_r5.durationDisplay);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.fields.status"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getApprovalStatusBadgeClass(excuse_r5.approvalStatusDisplay));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", excuse_r5.approvalStatusDisplay, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(excuse_r5.hasAttachment ? 28 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.fields.reason"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(excuse_r5.reason);
    \u0275\u0275advance();
    \u0275\u0275conditional(excuse_r5.approvedByName ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(excuse_r5.rejectionReason ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(excuse_r5.processingNotes ? 37 : -1);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "h6", 66);
    \u0275\u0275element(2, "i", 46);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_For_5_Template, 38, 16, "div", 67, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.excuses"), " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.leaveExcuseDetails().excuses);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275element(2, "br");
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const remoteWork_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.remote_work.time_period"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", remoteWork_r6.startTime, " - ", remoteWork_r6.endTime);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Conditional_16_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Conditional_16_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "div", 23)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 65);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const remoteWork_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.remote_work.notes"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(remoteWork_r6.notes);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Conditional_22_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Conditional_22_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 28)(2, "div", 29)(3, "div", 30)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "br");
    \u0275\u0275elementStart(7, "span", 33);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 30)(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "br");
    \u0275\u0275elementStart(13, "span", 31);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 30);
    \u0275\u0275conditionalCreate(16, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Conditional_16_Template, 5, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 30)(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "br")(21, "app-status-badge", 63);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(22, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Conditional_22_Template, 6, 2, "div", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const remoteWork_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.remote_work.work_type"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(remoteWork_r6.workType);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.remote_work.location"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(remoteWork_r6.workLocation);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(remoteWork_r6.startTime && remoteWork_r6.endTime ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.remote_work.status"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275property("label", remoteWork_r6.isApproved ? ctx_r0.i18n.t("attendance.remote_work.approved") : ctx_r0.i18n.t("attendance.remote_work.pending"))("variant", remoteWork_r6.isApproved ? "success" : "warning")("icon", remoteWork_r6.isApproved ? "fas fa-check-circle" : "fas fa-hourglass-half");
    \u0275\u0275advance();
    \u0275\u0275conditional(remoteWork_r6.notes ? 22 : -1);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "h6", 70);
    \u0275\u0275element(2, "i", 71);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_For_5_Template, 23, 10, "div", 72, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.remote_work"), " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.leaveExcuseDetails().remoteWork);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23)(2, "div", 24)(3, "div", 25)(4, "h5", 26);
    \u0275\u0275element(5, "i", 58);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 28);
    \u0275\u0275conditionalCreate(8, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_8_Template, 6, 1, "div", 59);
    \u0275\u0275conditionalCreate(9, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_9_Template, 6, 1, "div", 59);
    \u0275\u0275conditionalCreate(10, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Conditional_10_Template, 6, 1, "div", 59);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.leave_excuse_details"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_3_0 = ctx_r0.leaveExcuseDetails()) == null ? null : tmp_3_0.vacations) && ctx_r0.leaveExcuseDetails().vacations.length > 0 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_4_0 = ctx_r0.leaveExcuseDetails()) == null ? null : tmp_4_0.excuses) && ctx_r0.leaveExcuseDetails().excuses.length > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_5_0 = ctx_r0.leaveExcuseDetails()) == null ? null : tmp_5_0.remoteWork) && ctx_r0.leaveExcuseDetails().remoteWork.length > 0 ? 10 : -1);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "p", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.notes"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.attendanceRecord().notes);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_9_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_9_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br")(4, "app-status-badge", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.manual_override"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275property("label", ctx_r0.i18n.t("attendance.status.manual_override"))("variant", "warning")("icon", "fas fa-hand-paper");
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_10_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_10_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 23)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "br")(5, "app-status-badge", 63);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.approval_status"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275property("label", ctx_r0.attendanceRecord().isApproved ? ctx_r0.i18n.t("attendance.approved") : ctx_r0.i18n.t("attendance.pending_approval"))("variant", ctx_r0.attendanceRecord().isApproved ? "success" : "warning")("icon", ctx_r0.attendanceRecord().isApproved ? "fas fa-check-circle" : "fas fa-hourglass-half");
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_11_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_11_Template");
function DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 23)(2, "div", 24)(3, "div", 25)(4, "h5", 26);
    \u0275\u0275element(5, "i", 73);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 28)(8, "div", 29);
    \u0275\u0275conditionalCreate(9, DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_9_Template, 6, 2, "div", 68);
    \u0275\u0275conditionalCreate(10, DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_10_Template, 5, 4, "div", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Conditional_11_Template, 6, 4, "div", 29);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.additional_info"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.attendanceRecord().notes ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.attendanceRecord().isManualOverride ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.attendanceRecord().isApproved !== void 0 ? 11 : -1);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Template, "DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Template");
function DailyAttendanceDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-page-header", 7);
    \u0275\u0275elementStart(2, "div", 8)(3, "nav", 9)(4, "ol", 10)(5, "li", 11)(6, "a", 12);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "li", 11)(9, "a", 13);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "li", 14);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 15)(14, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceDetailComponent_Conditional_2_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onRefresh());
    }, "DailyAttendanceDetailComponent_Conditional_2_Template_button_click_14_listener"));
    \u0275\u0275element(15, "i", 17);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceDetailComponent_Conditional_2_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEdit());
    }, "DailyAttendanceDetailComponent_Conditional_2_Template_button_click_17_listener"));
    \u0275\u0275element(18, "i", 19);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 20);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceDetailComponent_Conditional_2_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBack());
    }, "DailyAttendanceDetailComponent_Conditional_2_Template_button_click_20_listener"));
    \u0275\u0275element(21, "i", 21);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 22)(24, "div", 23)(25, "div", 24)(26, "div", 25)(27, "h5", 26);
    \u0275\u0275element(28, "i", 27);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 28)(31, "div", 29)(32, "div", 30)(33, "strong");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "br");
    \u0275\u0275elementStart(36, "span", 31);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 30)(39, "strong");
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275element(41, "br");
    \u0275\u0275elementStart(42, "span", 32);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 30)(45, "strong");
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275element(47, "br");
    \u0275\u0275elementStart(48, "span", 31);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 30)(51, "strong");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275element(53, "br");
    \u0275\u0275elementStart(54, "span", 33);
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "date");
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(57, "div", 22)(58, "div", 23)(59, "div", 24)(60, "div", 25)(61, "h5", 26);
    \u0275\u0275element(62, "i", 34);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 28)(65, "div", 35)(66, "div", 36)(67, "div", 37)(68, "h6", 38);
    \u0275\u0275text(69);
    \u0275\u0275elementEnd();
    \u0275\u0275element(70, "app-status-badge", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 36)(72, "div", 37)(73, "h6", 38);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "div", 40);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "div", 36)(78, "div", 37)(79, "h6", 38);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "div", 41);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(83, "div", 36)(84, "div", 37)(85, "h6", 38);
    \u0275\u0275text(86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "div", 42);
    \u0275\u0275text(88);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(89, "div", 36)(90, "div", 37)(91, "h6", 38);
    \u0275\u0275text(92);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "div", 43);
    \u0275\u0275text(94);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(95, "div", 36)(96, "div", 37)(97, "h6", 38);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "div", 44);
    \u0275\u0275text(100);
    \u0275\u0275elementEnd()()()()()()()();
    \u0275\u0275elementStart(101, "div", 22)(102, "div", 45)(103, "div", 24)(104, "div", 25)(105, "h5", 26);
    \u0275\u0275element(106, "i", 46);
    \u0275\u0275text(107);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(108, "div", 28)(109, "div", 47)(110, "div", 48)(111, "strong");
    \u0275\u0275text(112);
    \u0275\u0275elementEnd();
    \u0275\u0275element(113, "br");
    \u0275\u0275elementStart(114, "span");
    \u0275\u0275text(115);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(116, "div", 48)(117, "strong");
    \u0275\u0275text(118);
    \u0275\u0275elementEnd();
    \u0275\u0275element(119, "br");
    \u0275\u0275elementStart(120, "span");
    \u0275\u0275text(121);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(122, DailyAttendanceDetailComponent_Conditional_2_Conditional_122_Template, 7, 2, "div", 29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(123, "div", 45)(124, "div", 24)(125, "div", 25)(126, "h5", 26);
    \u0275\u0275element(127, "i", 49);
    \u0275\u0275text(128);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(129, "div", 28);
    \u0275\u0275conditionalCreate(130, DailyAttendanceDetailComponent_Conditional_2_Conditional_130_Template, 41, 13, "div")(131, DailyAttendanceDetailComponent_Conditional_2_Conditional_131_Template, 4, 1, "div", 50);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(132, DailyAttendanceDetailComponent_Conditional_2_Conditional_132_Template, 11, 4, "div", 22);
    \u0275\u0275conditionalCreate(133, DailyAttendanceDetailComponent_Conditional_2_Conditional_133_Template, 12, 4, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_12_0;
    let tmp_14_0;
    let tmp_40_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("attendance.daily_detail.title"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.daily_view"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.title"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.refresh"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.actions.edit"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.back"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.employee_info"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employees.fields.employee_number"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_10_0 = ctx_r0.employee()) == null ? null : tmp_10_0.employeeNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employees.fields.full_name"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_12_0 = ctx_r0.employee()) == null ? null : tmp_12_0.fullName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employees.fields.department"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(((tmp_14_0 = ctx_r0.employee()) == null ? null : tmp_14_0.departmentName) || "--");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.attendance_date"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(56, 47, ctx_r0.attendanceDate, "fullDate"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.attendance_overview"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.status"));
    \u0275\u0275advance();
    \u0275\u0275property("status", ctx_r0.statusBadge().label)("variant", ctx_r0.statusBadge().variant);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.working_hours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatHoursAsTime(ctx_r0.attendanceRecord().workingHours || 0));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.overtime_hours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatHoursAsTime(ctx_r0.attendanceRecord().overtimeHours || 0));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.late_minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.attendanceRecord().lateMinutes || 0, " ", ctx_r0.i18n.t("common.minutes"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.early_leave_minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.attendanceRecord().earlyLeaveMinutes || 0, " ", ctx_r0.i18n.t("common.minutes"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.total_late"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.getTotalLateMinutes(), " ", ctx_r0.i18n.t("common.minutes"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.time_details"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.check_in_time"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.attendanceRecord().actualCheckInTime ? "text-success fw-bold" : "text-muted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatTime(ctx_r0.attendanceRecord().actualCheckInTime), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.check_out_time"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.attendanceRecord().actualCheckOutTime ? "text-info fw-bold" : "text-muted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatTime(ctx_r0.attendanceRecord().actualCheckOutTime), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.attendanceRecord().breakHours ? 122 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.daily_detail.shift_info"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_40_0 = ctx_r0.shift()) ? 130 : 131, tmp_40_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasLeaveExcuseData() ? 132 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.attendanceRecord().notes || ctx_r0.attendanceRecord().isApproved !== void 0 ? 133 : -1);
  }
}
__name(DailyAttendanceDetailComponent_Conditional_2_Template, "DailyAttendanceDetailComponent_Conditional_2_Template");
function DailyAttendanceDetailComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "i", 74);
    \u0275\u0275elementStart(2, "h5", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceDetailComponent_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBack());
    }, "DailyAttendanceDetailComponent_Conditional_3_Template_button_click_6_listener"));
    \u0275\u0275element(7, "i", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.daily_detail.no_data"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.daily_detail.no_data_description"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.back"), " ");
  }
}
__name(DailyAttendanceDetailComponent_Conditional_3_Template, "DailyAttendanceDetailComponent_Conditional_3_Template");
var _DailyAttendanceDetailComponent = class _DailyAttendanceDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  attendanceService = inject(AttendanceService);
  employeesService = inject(EmployeesService);
  shiftsService = inject(ShiftsService);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  attendanceRecord = signal(null, ...ngDevMode ? [{ debugName: "attendanceRecord" }] : []);
  employee = signal(null, ...ngDevMode ? [{ debugName: "employee" }] : []);
  shift = signal(null, ...ngDevMode ? [{ debugName: "shift" }] : []);
  leaveExcuseDetails = signal(null, ...ngDevMode ? [{ debugName: "leaveExcuseDetails" }] : []);
  // Route parameters
  employeeId;
  attendanceDate;
  // Computed properties for status badge
  statusBadge = computed(() => {
    const record = this.attendanceRecord();
    if (!record)
      return { label: "", variant: "secondary" };
    const status = record.status;
    let variant = "secondary";
    switch (status) {
      case AttendanceStatus.Present:
        variant = "success";
        break;
      case AttendanceStatus.Late:
        variant = "warning";
        break;
      case AttendanceStatus.Absent:
        variant = "danger";
        break;
      case AttendanceStatus.OnLeave:
        variant = "info";
        break;
      case AttendanceStatus.Holiday:
        variant = "info";
        break;
    }
    return {
      label: this.getStatusDisplayText(status),
      variant
    };
  }, ...ngDevMode ? [{ debugName: "statusBadge" }] : []);
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.employeeId = +params["employeeId"];
      this.attendanceDate = params["date"];
      this.loadData();
    });
  }
  loadData() {
    return __async(this, null, function* () {
      this.loading.set(true);
      this.error.set(null);
      try {
        const [employeeResponse, attendanceResponse, leaveExcuseResponse] = yield Promise.all([
          this.employeesService.getEmployeeById(this.employeeId).toPromise(),
          this.attendanceService.getEmployeeAttendanceRecord(this.employeeId, this.attendanceDate).toPromise(),
          this.attendanceService.getLeaveExcuseDetails(this.employeeId, this.attendanceDate).toPromise()
        ]);
        if (employeeResponse) {
          this.employee.set(employeeResponse);
        }
        if (attendanceResponse) {
          this.attendanceRecord.set(attendanceResponse);
        }
        if (leaveExcuseResponse) {
          this.leaveExcuseDetails.set(leaveExcuseResponse);
        }
      } catch (error) {
        console.error("Error loading attendance details:", error);
        this.error.set(this.i18n.t("attendance.errors.load_failed"));
        this.notificationService.error(this.i18n.t("attendance.errors.load_failed"));
      } finally {
        this.loading.set(false);
      }
    });
  }
  formatTime(time) {
    if (!time)
      return "--:--";
    const date = new Date(time);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }
  formatHoursAsTime(hours) {
    if (!hours || hours === 0)
      return "0:00";
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (minutes === 60) {
      return `${wholeHours + 1}:00`;
    }
    const minutesStr = minutes.toString().padStart(2, "0");
    return `${wholeHours}:${minutesStr}`;
  }
  getStatusBadgeClass(status) {
    switch (status) {
      case AttendanceStatus.Present:
        return "badge bg-success";
      case AttendanceStatus.Late:
        return "badge bg-warning";
      case AttendanceStatus.EarlyLeave:
        return "badge bg-info";
      case AttendanceStatus.Absent:
        return "badge bg-danger";
      case AttendanceStatus.Holiday:
        return "badge bg-secondary";
      case AttendanceStatus.OnLeave:
        return "badge bg-primary";
      default:
        return "badge bg-secondary";
    }
  }
  getStatusDisplayText(status) {
    const statusKey = typeof status === "number" ? status.toString() : String(status).toLowerCase();
    return this.i18n.t(`attendance.status.${statusKey}`);
  }
  onEdit() {
    const record = this.attendanceRecord();
    if (record) {
      this.router.navigate(["/attendance/edit", record.id]);
    }
  }
  onBack() {
    this.router.navigate(["/attendance/daily"], {
      queryParams: { date: this.attendanceDate }
    });
  }
  onRefresh() {
    this.loadData();
  }
  getTotalLateMinutes() {
    const record = this.attendanceRecord();
    if (!record)
      return 0;
    return (record.lateMinutes || 0) + (record.earlyLeaveMinutes || 0);
  }
  getShiftStartTime(shift) {
    if (!shift.shiftPeriods || shift.shiftPeriods.length === 0)
      return "--:--";
    return shift.shiftPeriods[0].startTime;
  }
  getShiftEndTime(shift) {
    if (!shift.shiftPeriods || shift.shiftPeriods.length === 0)
      return "--:--";
    const lastPeriod = shift.shiftPeriods[shift.shiftPeriods.length - 1];
    return lastPeriod.endTime;
  }
  getShiftTypeDisplay(shift) {
    return shift.shiftType === ShiftType.TimeBased ? "Time Based" : "Hours Only";
  }
  // Helper methods for leave/excuse details
  hasLeaveExcuseData() {
    const details = this.leaveExcuseDetails();
    return details?.hasLeaveExcuseData || false;
  }
  formatDate(date) {
    if (!date)
      return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  getApprovalStatusBadgeClass(status) {
    switch (status.toLowerCase()) {
      case "approved":
        return "badge bg-success";
      case "pending":
        return "badge bg-warning";
      case "rejected":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  }
};
__name(_DailyAttendanceDetailComponent, "DailyAttendanceDetailComponent");
__publicField(_DailyAttendanceDetailComponent, "\u0275fac", /* @__PURE__ */ __name(function DailyAttendanceDetailComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DailyAttendanceDetailComponent)();
}, "DailyAttendanceDetailComponent_Factory"));
__publicField(_DailyAttendanceDetailComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DailyAttendanceDetailComponent, selectors: [["app-daily-attendance-detail"]], decls: 4, vars: 4, consts: [[1, "d-flex", "justify-content-center", "align-items-center", 2, "min-height", "400px"], ["role", "alert", 1, "alert", "alert-danger"], [1, "container-fluid"], [1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "fas", "fa-exclamation-triangle", "me-2"], [3, "title"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb", "mb-0"], [1, "breadcrumb-item"], ["routerLink", "/attendance"], ["routerLink", "/attendance/daily"], ["aria-current", "page", 1, "breadcrumb-item", "active"], [1, "d-flex", "gap-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], [1, "fas", "fa-sync-alt", "me-2"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-edit", "me-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fas", "fa-arrow-left", "me-2"], [1, "row", "mb-4"], [1, "col-12"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-user", "me-2"], [1, "card-body"], [1, "row"], [1, "col-md-3"], [1, "text-muted"], [1, "text-primary", "fw-bold"], [1, "text-info", "fw-bold"], [1, "fas", "fa-chart-line", "me-2"], [1, "row", "text-center"], [1, "col-md-2"], [1, "border", "rounded", "p-3"], [1, "text-muted", "small", "mb-1"], [1, "fs-6", 3, "status", "variant"], [1, "fw-bold", "text-primary"], [1, "fw-bold", "text-success"], [1, "fw-bold", "text-warning"], [1, "fw-bold", "text-info"], [1, "fw-bold", "text-danger"], [1, "col-lg-6"], [1, "fas", "fa-clock", "me-2"], [1, "row", "mb-3"], [1, "col-6"], [1, "fas", "fa-calendar-clock", "me-2"], [1, "text-center", "text-muted", "py-3"], [1, "text-warning", "fw-bold"], [1, "text-success"], [1, "text-info"], [1, "text-warning"], [1, "alert", "alert-info"], [1, "mb-0", "mt-2"], [1, "fas", "fa-info-circle", "fa-2x", "mb-2"], [1, "fas", "fa-calendar-times", "me-2"], [1, "mb-4"], [1, "section-header", "vacation-header"], [1, "fas", "fa-plane", "me-2"], [1, "card", "leave-excuse-card", "vacation-card", "border-start", "border-primary", "border-3", "mb-3"], [3, "label", "variant", "icon"], [1, "row", "mt-2"], [1, "text-muted", "mb-0"], [1, "section-header", "excuse-header"], [1, "card", "leave-excuse-card", "excuse-card", "border-start", "border-warning", "border-3", "mb-3"], [1, "col-md-6"], [1, "text-danger", "mb-0"], [1, "section-header", "remote-work-header"], [1, "fas", "fa-home", "me-2"], [1, "card", "leave-excuse-card", "remote-work-card", "border-start", "border-info", "border-3", "mb-3"], [1, "fas", "fa-sticky-note", "me-2"], [1, "fas", "fa-exclamation-circle", "fa-3x", "text-muted", "mb-3"]], template: /* @__PURE__ */ __name(function DailyAttendanceDetailComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DailyAttendanceDetailComponent_Conditional_0_Template, 4, 1, "div", 0);
    \u0275\u0275conditionalCreate(1, DailyAttendanceDetailComponent_Conditional_1_Template, 3, 1, "div", 1);
    \u0275\u0275conditionalCreate(2, DailyAttendanceDetailComponent_Conditional_2_Template, 134, 50, "div", 2);
    \u0275\u0275conditionalCreate(3, DailyAttendanceDetailComponent_Conditional_3_Template, 9, 3, "div", 3);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.loading() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() && ctx.employee() && ctx.attendanceRecord() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() && (!ctx.employee() || !ctx.attendanceRecord()) ? 3 : -1);
  }
}, "DailyAttendanceDetailComponent_Template"), dependencies: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule, PageHeaderComponent, StatusBadgeComponent, DatePipe], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  border: 1px solid #e3e6f0;\n  border-radius: 0.5rem;\n  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fc;\n  border-bottom: 1px solid #e3e6f0;\n  padding: 1rem 1.25rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  color: #5a5c69;\n  font-weight: 600;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.5rem 0.75rem;\n}\n.border[_ngcontent-%COMP%] {\n  border-color: #e3e6f0 !important;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: #5a9bd4 !important;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #1cc88a !important;\n}\n.text-info[_ngcontent-%COMP%] {\n  color: #36b9cc !important;\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #f6c23e !important;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #e74a3b !important;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.35rem;\n  font-weight: 400;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #4e73df;\n  border-color: #4e73df;\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  color: #4e73df;\n  border-color: #4e73df;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #858796;\n  border-color: #858796;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n}\n.alert-info[_ngcontent-%COMP%] {\n  background-color: #d1ecf1;\n  border-color: #bee5eb;\n  color: #0c5460;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  background-color: transparent;\n  padding: 0;\n  margin-bottom: 0;\n}\n.breadcrumb-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #5a5c69;\n  text-decoration: none;\n}\n.breadcrumb-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #4e73df;\n  text-decoration: underline;\n}\n.breadcrumb-item.active[_ngcontent-%COMP%] {\n  color: #858796;\n}\n.fw-bold[_ngcontent-%COMP%] {\n  font-weight: 600 !important;\n}\n.fs-6[_ngcontent-%COMP%] {\n  font-size: 1rem !important;\n}\n.border-start[_ngcontent-%COMP%] {\n  border-left: 4px solid !important;\n}\n.border-3[_ngcontent-%COMP%] {\n  border-width: 3px !important;\n}\n.border-primary[_ngcontent-%COMP%] {\n  border-color: #4e73df !important;\n}\n.border-warning[_ngcontent-%COMP%] {\n  border-color: #f6c23e !important;\n}\n.border-info[_ngcontent-%COMP%] {\n  border-color: #36b9cc !important;\n}\n.leave-excuse-card[_ngcontent-%COMP%] {\n  transition: all 0.3s ease;\n  margin-bottom: 1rem;\n}\n.leave-excuse-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.25rem 2rem 0 rgba(58, 59, 69, 0.2);\n  transform: translateY(-2px);\n}\n.section-header[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #e3e6f0;\n  padding-bottom: 0.5rem;\n  margin-bottom: 1rem;\n  font-weight: 600;\n}\n.vacation-header[_ngcontent-%COMP%] {\n  color: #4e73df;\n}\n.excuse-header[_ngcontent-%COMP%] {\n  color: #f6c23e;\n}\n.remote-work-header[_ngcontent-%COMP%] {\n  color: #36b9cc;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #5a5c69;\n  margin-bottom: 0.25rem;\n}\n.detail-value[_ngcontent-%COMP%] {\n  color: #858796;\n  margin-bottom: 1rem;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  padding: 0.4rem 0.8rem;\n  border-radius: 0.25rem;\n  font-weight: 500;\n}\n.attachment-badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.3rem 0.6rem;\n}\n.vacation-card[_ngcontent-%COMP%] {\n  border-left-color: #4e73df;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fc 0%,\n      #e7f3ff 100%);\n}\n.excuse-card[_ngcontent-%COMP%] {\n  border-left-color: #f6c23e;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fc 0%,\n      #fff9e7 100%);\n}\n.remote-work-card[_ngcontent-%COMP%] {\n  border-left-color: #36b9cc;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fc 0%,\n      #e7fcff 100%);\n}\n@media (max-width: 768px) {\n  .leave-excuse-card[_ngcontent-%COMP%]   .col-md-3[_ngcontent-%COMP%], \n   .leave-excuse-card[_ngcontent-%COMP%]   .col-md-2[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n  .section-header[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n}\n/*# sourceMappingURL=daily-attendance-detail.component.css.map */"] }));
var DailyAttendanceDetailComponent = _DailyAttendanceDetailComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DailyAttendanceDetailComponent, [{
    type: Component,
    args: [{ selector: "app-daily-attendance-detail", standalone: true, imports: [CommonModule, RouterModule, ReactiveFormsModule, PageHeaderComponent, StatusBadgeComponent], template: `<!-- Loading State -->\r
@if (loading()) {\r
  <div class="d-flex justify-content-center align-items-center" style="min-height: 400px;">\r
    <div class="spinner-border text-primary" role="status">\r
      <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>\r
    </div>\r
  </div>\r
}\r
\r
<!-- Error State -->\r
@if (error()) {\r
  <div class="alert alert-danger" role="alert">\r
    <i class="fas fa-exclamation-triangle me-2"></i>\r
    {{ error() }}\r
  </div>\r
}\r
\r
<!-- Main Content -->\r
@if (!loading() && !error() && employee() && attendanceRecord()) {\r
  <div class="container-fluid">\r
    <!-- Page Header -->\r
    <app-page-header\r
      [title]="i18n.t('attendance.daily_detail.title')">\r
    </app-page-header>\r
\r
    <!-- Navigation and Controls -->\r
    <div class="d-flex justify-content-between align-items-center mb-4">\r
      <nav aria-label="breadcrumb">\r
        <ol class="breadcrumb mb-0">\r
          <li class="breadcrumb-item">\r
            <a routerLink="/attendance">{{ i18n.t('attendance.title') }}</a>\r
          </li>\r
          <li class="breadcrumb-item">\r
            <a routerLink="/attendance/daily">{{ i18n.t('attendance.daily_view') }}</a>\r
          </li>\r
          <li class="breadcrumb-item active" aria-current="page">\r
            {{ i18n.t('attendance.daily_detail.title') }}\r
          </li>\r
        </ol>\r
      </nav>\r
\r
      <div class="d-flex gap-2">\r
        <button type="button" class="btn btn-outline-primary" (click)="onRefresh()">\r
          <i class="fas fa-sync-alt me-2"></i>\r
          {{ i18n.t('common.refresh') }}\r
        </button>\r
        <button type="button" class="btn btn-primary" (click)="onEdit()">\r
          <i class="fas fa-edit me-2"></i>\r
          {{ i18n.t('attendance.actions.edit') }}\r
        </button>\r
        <button type="button" class="btn btn-outline-secondary" (click)="onBack()">\r
          <i class="fas fa-arrow-left me-2"></i>\r
          {{ i18n.t('common.back') }}\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Employee Information Card -->\r
    <div class="row mb-4">\r
      <div class="col-12">\r
        <div class="card">\r
          <div class="card-header">\r
            <h5 class="card-title mb-0">\r
              <i class="fas fa-user me-2"></i>\r
              {{ i18n.t('attendance.daily_detail.employee_info') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row">\r
              <div class="col-md-3">\r
                <strong>{{ i18n.t('employees.fields.employee_number') }}:</strong>\r
                <br>\r
                <span class="text-muted">{{ employee()?.employeeNumber }}</span>\r
              </div>\r
              <div class="col-md-3">\r
                <strong>{{ i18n.t('employees.fields.full_name') }}:</strong>\r
                <br>\r
                <span class="text-primary fw-bold">{{ employee()?.fullName }}</span>\r
              </div>\r
              <div class="col-md-3">\r
                <strong>{{ i18n.t('employees.fields.department') }}:</strong>\r
                <br>\r
                <span class="text-muted">{{ employee()?.departmentName || '--' }}</span>\r
              </div>\r
              <div class="col-md-3">\r
                <strong>{{ i18n.t('attendance.fields.attendance_date') }}:</strong>\r
                <br>\r
                <span class="text-info fw-bold">{{ attendanceDate | date: 'fullDate' }}</span>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Attendance Status Overview -->\r
    <div class="row mb-4">\r
      <div class="col-12">\r
        <div class="card">\r
          <div class="card-header">\r
            <h5 class="card-title mb-0">\r
              <i class="fas fa-chart-line me-2"></i>\r
              {{ i18n.t('attendance.daily_detail.attendance_overview') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row text-center">\r
              <div class="col-md-2">\r
                <div class="border rounded p-3">\r
                  <h6 class="text-muted small mb-1">{{ i18n.t('attendance.fields.status') }}</h6>\r
                  <app-status-badge\r
                    [status]="statusBadge().label"\r
                    [variant]="statusBadge().variant"\r
                    class="fs-6">\r
                  </app-status-badge>\r
                </div>\r
              </div>\r
              <div class="col-md-2">\r
                <div class="border rounded p-3">\r
                  <h6 class="text-muted small mb-1">{{ i18n.t('attendance.fields.working_hours') }}</h6>\r
                  <div class="fw-bold text-primary">{{ formatHoursAsTime(attendanceRecord()!.workingHours || 0) }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-2">\r
                <div class="border rounded p-3">\r
                  <h6 class="text-muted small mb-1">{{ i18n.t('attendance.fields.overtime_hours') }}</h6>\r
                  <div class="fw-bold text-success">{{ formatHoursAsTime(attendanceRecord()!.overtimeHours || 0) }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-2">\r
                <div class="border rounded p-3">\r
                  <h6 class="text-muted small mb-1">{{ i18n.t('attendance.fields.late_minutes') }}</h6>\r
                  <div class="fw-bold text-warning">{{ attendanceRecord()!.lateMinutes || 0 }} {{ i18n.t('common.minutes') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-2">\r
                <div class="border rounded p-3">\r
                  <h6 class="text-muted small mb-1">{{ i18n.t('attendance.fields.early_leave_minutes') }}</h6>\r
                  <div class="fw-bold text-info">{{ attendanceRecord()!.earlyLeaveMinutes || 0 }} {{ i18n.t('common.minutes') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-2">\r
                <div class="border rounded p-3">\r
                  <h6 class="text-muted small mb-1">{{ i18n.t('attendance.fields.total_late') }}</h6>\r
                  <div class="fw-bold text-danger">{{ getTotalLateMinutes() }} {{ i18n.t('common.minutes') }}</div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Time Details -->\r
    <div class="row mb-4">\r
      <div class="col-lg-6">\r
        <div class="card">\r
          <div class="card-header">\r
            <h5 class="card-title mb-0">\r
              <i class="fas fa-clock me-2"></i>\r
              {{ i18n.t('attendance.daily_detail.time_details') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row mb-3">\r
              <div class="col-6">\r
                <strong>{{ i18n.t('attendance.fields.check_in_time') }}:</strong>\r
                <br>\r
                <span [class]="attendanceRecord()!.actualCheckInTime ? 'text-success fw-bold' : 'text-muted'">\r
                  {{ formatTime(attendanceRecord()!.actualCheckInTime) }}\r
                </span>\r
              </div>\r
              <div class="col-6">\r
                <strong>{{ i18n.t('attendance.fields.check_out_time') }}:</strong>\r
                <br>\r
                <span [class]="attendanceRecord()!.actualCheckOutTime ? 'text-info fw-bold' : 'text-muted'">\r
                  {{ formatTime(attendanceRecord()!.actualCheckOutTime) }}\r
                </span>\r
              </div>\r
            </div>\r
            @if (attendanceRecord()!.breakHours) {\r
              <div class="row">\r
                <div class="col-12">\r
                  <strong>{{ i18n.t('attendance.fields.break_hours') }}:</strong>\r
                  <br>\r
                  <span class="text-warning fw-bold">{{ formatHoursAsTime(attendanceRecord()!.breakHours || 0) }}</span>\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Shift Information -->\r
      <div class="col-lg-6">\r
        <div class="card">\r
          <div class="card-header">\r
            <h5 class="card-title mb-0">\r
              <i class="fas fa-calendar-clock me-2"></i>\r
              {{ i18n.t('attendance.daily_detail.shift_info') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            @if (shift(); as shiftData) {\r
              <div>\r
                <div class="row mb-3">\r
                  <div class="col-6">\r
                    <strong>{{ i18n.t('shifts.fields.name') }}:</strong>\r
                    <br>\r
                    <span class="text-primary fw-bold">{{ shiftData.name }}</span>\r
                  </div>\r
                  <div class="col-6">\r
                    <strong>{{ i18n.t('shifts.fields.description') }}:</strong>\r
                    <br>\r
                    <span class="text-muted">{{ shiftData.description || '--' }}</span>\r
                  </div>\r
                </div>\r
                <div class="row mb-3">\r
                  <div class="col-6">\r
                    <strong>{{ i18n.t('shifts.fields.start_time') }}:</strong>\r
                    <br>\r
                    <span class="text-success">{{ getShiftStartTime(shiftData) }}</span>\r
                  </div>\r
                  <div class="col-6">\r
                    <strong>{{ i18n.t('shifts.fields.end_time') }}:</strong>\r
                    <br>\r
                    <span class="text-info">{{ getShiftEndTime(shiftData) }}</span>\r
                  </div>\r
                </div>\r
                <div class="row mb-3">\r
                  <div class="col-6">\r
                    <strong>{{ i18n.t('shifts.fields.working_hours') }}:</strong>\r
                    <br>\r
                    <span class="text-primary fw-bold">{{ formatHoursAsTime(shiftData.requiredHours || 0) }}</span>\r
                  </div>\r
                  <div class="col-6">\r
                    <strong>{{ i18n.t('shifts.fields.shift_type') }}:</strong>\r
                    <br>\r
                    <span class="text-warning">{{ getShiftTypeDisplay(shiftData) }}</span>\r
                  </div>\r
                </div>\r
                @if (shiftData.allowFlexibleHours) {\r
                  <div class="row">\r
                    <div class="col-12">\r
                      <div class="alert alert-info">\r
                        <strong>{{ i18n.t('shifts.fields.flexible_hours') }}:</strong>\r
                        <ul class="mb-0 mt-2">\r
                          <li>{{ i18n.t('shifts.fields.flex_minutes_before') }}: {{ shiftData.flexMinutesBefore || 0 }} {{ i18n.t('common.minutes') }}</li>\r
                          <li>{{ i18n.t('shifts.fields.flex_minutes_after') }}: {{ shiftData.flexMinutesAfter || 0 }} {{ i18n.t('common.minutes') }}</li>\r
                          <li>{{ i18n.t('shifts.fields.grace_period') }}: {{ shiftData.gracePeriodMinutes || 0 }} {{ i18n.t('common.minutes') }}</li>\r
                        </ul>\r
                      </div>\r
                    </div>\r
                  </div>\r
                }\r
              </div>\r
            } @else {\r
              <div class="text-center text-muted py-3">\r
                <i class="fas fa-info-circle fa-2x mb-2"></i>\r
                <p>{{ i18n.t('attendance.daily_detail.no_shift_assigned') }}</p>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Leave & Excuse Details -->\r
    @if (hasLeaveExcuseData()) {\r
      <div class="row mb-4">\r
        <div class="col-12">\r
          <div class="card">\r
            <div class="card-header">\r
              <h5 class="card-title mb-0">\r
                <i class="fas fa-calendar-times me-2"></i>\r
                {{ i18n.t('attendance.daily_detail.leave_excuse_details') }}\r
              </h5>\r
            </div>\r
            <div class="card-body">\r
              <!-- Employee Vacations -->\r
              @if (leaveExcuseDetails()?.vacations && leaveExcuseDetails()!.vacations.length > 0) {\r
                <div class="mb-4">\r
                  <h6 class="section-header vacation-header">\r
                    <i class="fas fa-plane me-2"></i>\r
                    {{ i18n.t('attendance.daily_detail.vacations') }}\r
                  </h6>\r
                  @for (vacation of leaveExcuseDetails()!.vacations; track vacation.id) {\r
                    <div class="card leave-excuse-card vacation-card border-start border-primary border-3 mb-3">\r
                      <div class="card-body">\r
                        <div class="row">\r
                          <div class="col-md-3">\r
                            <strong>{{ i18n.t('vacation_types.fields.name') }}:</strong>\r
                            <br>\r
                            <span class="text-primary fw-bold">{{ vacation.vacationTypeName }}</span>\r
                          </div>\r
                          <div class="col-md-3">\r
                            <strong>{{ i18n.t('employee_vacations.fields.period') }}:</strong>\r
                            <br>\r
                            <span class="text-muted">\r
                              {{ formatDate(vacation.startDate) }} - {{ formatDate(vacation.endDate) }}\r
                            </span>\r
                          </div>\r
                          <div class="col-md-2">\r
                            <strong>{{ i18n.t('employee_vacations.fields.duration') }}:</strong>\r
                            <br>\r
                            <span class="text-info fw-bold">{{ vacation.durationDays }} {{ vacation.durationDays === 1 ? i18n.t('common.dayUnit') : i18n.t('common.days_text') }}</span>\r
                          </div>\r
                          <div class="col-md-2">\r
                            <strong>{{ i18n.t('employee_vacations.fields.status') }}:</strong>\r
                            <br>\r
                            <app-status-badge\r
                              [label]="vacation.isApproved ? i18n.t('employee_vacations.approved') : i18n.t('employee_vacations.pending')"\r
                              [variant]="vacation.isApproved ? 'success' : 'warning'"\r
                              [icon]="vacation.isApproved ? 'fas fa-check-circle' : 'fas fa-hourglass-half'">\r
                            </app-status-badge>\r
                          </div>\r
                          <div class="col-md-2">\r
                            <strong>{{ i18n.t('common.created_date') }}:</strong>\r
                            <br>\r
                            <small class="text-muted">{{ formatDate(vacation.createdAtUtc) }}</small>\r
                          </div>\r
                        </div>\r
                        @if (vacation.notes) {\r
                          <div class="row mt-2">\r
                            <div class="col-12">\r
                              <strong>{{ i18n.t('employee_vacations.fields.notes') }}:</strong>\r
                              <p class="text-muted mb-0">{{ vacation.notes }}</p>\r
                            </div>\r
                          </div>\r
                        }\r
                      </div>\r
                    </div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- Employee Excuses -->\r
              @if (leaveExcuseDetails()?.excuses && leaveExcuseDetails()!.excuses.length > 0) {\r
                <div class="mb-4">\r
                  <h6 class="section-header excuse-header">\r
                    <i class="fas fa-clock me-2"></i>\r
                    {{ i18n.t('attendance.daily_detail.excuses') }}\r
                  </h6>\r
                  @for (excuse of leaveExcuseDetails()!.excuses; track excuse.id) {\r
                    <div class="card leave-excuse-card excuse-card border-start border-warning border-3 mb-3">\r
                      <div class="card-body">\r
                        <div class="row">\r
                          <div class="col-md-3">\r
                            <strong>{{ i18n.t('employee_excuses.fields.excuse_type') }}:</strong>\r
                            <br>\r
                            <span class="text-warning fw-bold">{{ excuse.excuseTypeDisplay }}</span>\r
                          </div>\r
                          <div class="col-md-3">\r
                            <strong>{{ i18n.t('employee_excuses.fields.time_period') }}:</strong>\r
                            <br>\r
                            <span class="text-muted">{{ excuse.timeRangeDisplay }}</span>\r
                          </div>\r
                          <div class="col-md-2">\r
                            <strong>{{ i18n.t('employee_excuses.fields.duration') }}:</strong>\r
                            <br>\r
                            <span class="text-info fw-bold">{{ excuse.durationDisplay }}</span>\r
                          </div>\r
                          <div class="col-md-2">\r
                            <strong>{{ i18n.t('employee_excuses.fields.status') }}:</strong>\r
                            <br>\r
                            <span [class]="getApprovalStatusBadgeClass(excuse.approvalStatusDisplay)">\r
                              {{ excuse.approvalStatusDisplay }}\r
                            </span>\r
                          </div>\r
                          <div class="col-md-2">\r
                            @if (excuse.hasAttachment) {\r
                              <strong>{{ i18n.t('employee_excuses.fields.attachment') }}:</strong>\r
                              <br>\r
                              <app-status-badge\r
                                [label]="i18n.t('employee_excuses.has_attachment')"\r
                                [variant]="'info'"\r
                                [icon]="'fas fa-paperclip'">\r
                              </app-status-badge>\r
                            }\r
                          </div>\r
                        </div>\r
                        <div class="row mt-2">\r
                          <div class="col-md-6">\r
                            <strong>{{ i18n.t('employee_excuses.fields.reason') }}:</strong>\r
                            <p class="text-muted mb-0">{{ excuse.reason }}</p>\r
                          </div>\r
                          @if (excuse.approvedByName) {\r
                            <div class="col-md-6">\r
                              <strong>{{ i18n.t('employee_excuses.fields.approved_by') }}:</strong>\r
                              <br>\r
                              <span class="text-success">{{ excuse.approvedByName }}</span>\r
                              @if (excuse.approvedAt) {\r
                                <br>\r
                                <small class="text-muted">{{ formatDate(excuse.approvedAt) }}</small>\r
                              }\r
                            </div>\r
                          }\r
                        </div>\r
                        @if (excuse.rejectionReason) {\r
                          <div class="row mt-2">\r
                            <div class="col-12">\r
                              <strong>{{ i18n.t('employee_excuses.fields.rejection_reason') }}:</strong>\r
                              <p class="text-danger mb-0">{{ excuse.rejectionReason }}</p>\r
                            </div>\r
                          </div>\r
                        }\r
                        @if (excuse.processingNotes) {\r
                          <div class="row mt-2">\r
                            <div class="col-12">\r
                              <strong>{{ i18n.t('employee_excuses.fields.processing_notes') }}:</strong>\r
                              <p class="text-muted mb-0">{{ excuse.processingNotes }}</p>\r
                            </div>\r
                          </div>\r
                        }\r
                      </div>\r
                    </div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- Remote Work (Future Implementation) -->\r
              @if (leaveExcuseDetails()?.remoteWork && leaveExcuseDetails()!.remoteWork.length > 0) {\r
                <div class="mb-4">\r
                  <h6 class="section-header remote-work-header">\r
                    <i class="fas fa-home me-2"></i>\r
                    {{ i18n.t('attendance.daily_detail.remote_work') }}\r
                  </h6>\r
                  @for (remoteWork of leaveExcuseDetails()!.remoteWork; track remoteWork.id) {\r
                    <div class="card leave-excuse-card remote-work-card border-start border-info border-3 mb-3">\r
                      <div class="card-body">\r
                        <div class="row">\r
                          <div class="col-md-3">\r
                            <strong>{{ i18n.t('attendance.remote_work.work_type') }}:</strong>\r
                            <br>\r
                            <span class="text-info fw-bold">{{ remoteWork.workType }}</span>\r
                          </div>\r
                          <div class="col-md-3">\r
                            <strong>{{ i18n.t('attendance.remote_work.location') }}:</strong>\r
                            <br>\r
                            <span class="text-muted">{{ remoteWork.workLocation }}</span>\r
                          </div>\r
                          <div class="col-md-3">\r
                            @if (remoteWork.startTime && remoteWork.endTime) {\r
                              <strong>{{ i18n.t('attendance.remote_work.time_period') }}:</strong>\r
                              <br>\r
                              <span class="text-muted">{{ remoteWork.startTime }} - {{ remoteWork.endTime }}</span>\r
                            }\r
                          </div>\r
                          <div class="col-md-3">\r
                            <strong>{{ i18n.t('attendance.remote_work.status') }}:</strong>\r
                            <br>\r
                            <app-status-badge\r
                              [label]="remoteWork.isApproved ? i18n.t('attendance.remote_work.approved') : i18n.t('attendance.remote_work.pending')"\r
                              [variant]="remoteWork.isApproved ? 'success' : 'warning'"\r
                              [icon]="remoteWork.isApproved ? 'fas fa-check-circle' : 'fas fa-hourglass-half'">\r
                            </app-status-badge>\r
                          </div>\r
                        </div>\r
                        @if (remoteWork.notes) {\r
                          <div class="row mt-2">\r
                            <div class="col-12">\r
                              <strong>{{ i18n.t('attendance.remote_work.notes') }}:</strong>\r
                              <p class="text-muted mb-0">{{ remoteWork.notes }}</p>\r
                            </div>\r
                          </div>\r
                        }\r
                      </div>\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- Additional Information -->\r
    @if (attendanceRecord()!.notes || attendanceRecord()!.isApproved !== undefined) {\r
      <div class="row">\r
        <div class="col-12">\r
          <div class="card">\r
            <div class="card-header">\r
              <h5 class="card-title mb-0">\r
                <i class="fas fa-sticky-note me-2"></i>\r
                {{ i18n.t('attendance.daily_detail.additional_info') }}\r
              </h5>\r
            </div>\r
            <div class="card-body">\r
              <div class="row">\r
                @if (attendanceRecord()!.notes) {\r
                  <div class="col-md-6">\r
                    <strong>{{ i18n.t('attendance.fields.notes') }}:</strong>\r
                    <br>\r
                    <p class="text-muted">{{ attendanceRecord()!.notes }}</p>\r
                  </div>\r
                }\r
                @if (attendanceRecord()!.isManualOverride) {\r
                  <div class="col-md-6">\r
                    <strong>{{ i18n.t('attendance.fields.manual_override') }}:</strong>\r
                    <br>\r
                    <app-status-badge\r
                      [label]="i18n.t('attendance.status.manual_override')"\r
                      [variant]="'warning'"\r
                      [icon]="'fas fa-hand-paper'">\r
                    </app-status-badge>\r
                  </div>\r
                }\r
              </div>\r
              @if (attendanceRecord()!.isApproved !== undefined) {\r
                <div class="row">\r
                  <div class="col-12">\r
                    <strong>{{ i18n.t('attendance.fields.approval_status') }}:</strong>\r
                    <br>\r
                    <app-status-badge\r
                      [label]="attendanceRecord()!.isApproved ? i18n.t('attendance.approved') : i18n.t('attendance.pending_approval')"\r
                      [variant]="attendanceRecord()!.isApproved ? 'success' : 'warning'"\r
                      [icon]="attendanceRecord()!.isApproved ? 'fas fa-check-circle' : 'fas fa-hourglass-half'">\r
                    </app-status-badge>\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
}\r
\r
<!-- No Data State -->\r
@if (!loading() && !error() && (!employee() || !attendanceRecord())) {\r
  <div class="text-center py-5">\r
    <i class="fas fa-exclamation-circle fa-3x text-muted mb-3"></i>\r
    <h5 class="text-muted">{{ i18n.t('attendance.daily_detail.no_data') }}</h5>\r
    <p class="text-muted">{{ i18n.t('attendance.daily_detail.no_data_description') }}</p>\r
    <button type="button" class="btn btn-primary" (click)="onBack()">\r
      <i class="fas fa-arrow-left me-2"></i>\r
      {{ i18n.t('common.back') }}\r
    </button>\r
  </div>\r
}`, styles: ["/* src/app/pages/attendance/daily-attendance-detail/daily-attendance-detail.component.css */\n.card {\n  border: 1px solid #e3e6f0;\n  border-radius: 0.5rem;\n  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);\n}\n.card-header {\n  background-color: #f8f9fc;\n  border-bottom: 1px solid #e3e6f0;\n  padding: 1rem 1.25rem;\n}\n.card-title {\n  color: #5a5c69;\n  font-weight: 600;\n}\n.badge {\n  font-size: 0.875rem;\n  padding: 0.5rem 0.75rem;\n}\n.border {\n  border-color: #e3e6f0 !important;\n}\n.text-primary {\n  color: #5a9bd4 !important;\n}\n.text-success {\n  color: #1cc88a !important;\n}\n.text-info {\n  color: #36b9cc !important;\n}\n.text-warning {\n  color: #f6c23e !important;\n}\n.text-danger {\n  color: #e74a3b !important;\n}\n.btn {\n  border-radius: 0.35rem;\n  font-weight: 400;\n}\n.btn-primary {\n  background-color: #4e73df;\n  border-color: #4e73df;\n}\n.btn-outline-primary {\n  color: #4e73df;\n  border-color: #4e73df;\n}\n.btn-outline-secondary {\n  color: #858796;\n  border-color: #858796;\n}\n.spinner-border {\n  width: 3rem;\n  height: 3rem;\n}\n.alert {\n  border-radius: 0.5rem;\n}\n.alert-info {\n  background-color: #d1ecf1;\n  border-color: #bee5eb;\n  color: #0c5460;\n}\n.breadcrumb {\n  background-color: transparent;\n  padding: 0;\n  margin-bottom: 0;\n}\n.breadcrumb-item a {\n  color: #5a5c69;\n  text-decoration: none;\n}\n.breadcrumb-item a:hover {\n  color: #4e73df;\n  text-decoration: underline;\n}\n.breadcrumb-item.active {\n  color: #858796;\n}\n.fw-bold {\n  font-weight: 600 !important;\n}\n.fs-6 {\n  font-size: 1rem !important;\n}\n.border-start {\n  border-left: 4px solid !important;\n}\n.border-3 {\n  border-width: 3px !important;\n}\n.border-primary {\n  border-color: #4e73df !important;\n}\n.border-warning {\n  border-color: #f6c23e !important;\n}\n.border-info {\n  border-color: #36b9cc !important;\n}\n.leave-excuse-card {\n  transition: all 0.3s ease;\n  margin-bottom: 1rem;\n}\n.leave-excuse-card:hover {\n  box-shadow: 0 0.25rem 2rem 0 rgba(58, 59, 69, 0.2);\n  transform: translateY(-2px);\n}\n.section-header {\n  border-bottom: 2px solid #e3e6f0;\n  padding-bottom: 0.5rem;\n  margin-bottom: 1rem;\n  font-weight: 600;\n}\n.vacation-header {\n  color: #4e73df;\n}\n.excuse-header {\n  color: #f6c23e;\n}\n.remote-work-header {\n  color: #36b9cc;\n}\n.detail-label {\n  font-weight: 600;\n  color: #5a5c69;\n  margin-bottom: 0.25rem;\n}\n.detail-value {\n  color: #858796;\n  margin-bottom: 1rem;\n}\n.status-badge {\n  font-size: 0.8rem;\n  padding: 0.4rem 0.8rem;\n  border-radius: 0.25rem;\n  font-weight: 500;\n}\n.attachment-badge {\n  font-size: 0.75rem;\n  padding: 0.3rem 0.6rem;\n}\n.vacation-card {\n  border-left-color: #4e73df;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fc 0%,\n      #e7f3ff 100%);\n}\n.excuse-card {\n  border-left-color: #f6c23e;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fc 0%,\n      #fff9e7 100%);\n}\n.remote-work-card {\n  border-left-color: #36b9cc;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fc 0%,\n      #e7fcff 100%);\n}\n@media (max-width: 768px) {\n  .leave-excuse-card .col-md-3,\n  .leave-excuse-card .col-md-2 {\n    margin-bottom: 1rem;\n  }\n  .section-header {\n    font-size: 1.1rem;\n  }\n}\n/*# sourceMappingURL=daily-attendance-detail.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DailyAttendanceDetailComponent, { className: "DailyAttendanceDetailComponent", filePath: "src/app/pages/attendance/daily-attendance-detail/daily-attendance-detail.component.ts", lineNumber: 25 });
})();
export {
  DailyAttendanceDetailComponent
};
//# sourceMappingURL=chunk-OOBNEYED.js.map
