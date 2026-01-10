import {
  AttendanceService
} from "./chunk-UR7BACYI.js";
import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
import {
  FormSectionComponent
} from "./chunk-JTLHOQFH.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import {
  AttendanceStatus
} from "./chunk-7XYWDBYG.js";
import "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/attendance/edit-attendance/edit-attendance.component.ts
function EditAttendanceComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 4)(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
  }
}
__name(EditAttendanceComponent_Conditional_2_Template, "EditAttendanceComponent_Conditional_2_Template");
function EditAttendanceComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
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
__name(EditAttendanceComponent_Conditional_3_Template, "EditAttendanceComponent_Conditional_3_Template");
function EditAttendanceComponent_Conditional_4_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getControlErrorMessage("actualCheckInTime"), " ");
  }
}
__name(EditAttendanceComponent_Conditional_4_Conditional_30_Template, "EditAttendanceComponent_Conditional_4_Conditional_30_Template");
function EditAttendanceComponent_Conditional_4_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getControlErrorMessage("actualCheckOutTime"), " ");
  }
}
__name(EditAttendanceComponent_Conditional_4_Conditional_38_Template, "EditAttendanceComponent_Conditional_4_Conditional_38_Template");
function EditAttendanceComponent_Conditional_4_Conditional_39_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getControlErrorMessage("breakHours"), " ");
  }
}
__name(EditAttendanceComponent_Conditional_4_Conditional_39_Conditional_6_Template, "EditAttendanceComponent_Conditional_4_Conditional_39_Conditional_6_Template");
function EditAttendanceComponent_Conditional_4_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "label", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 48);
    \u0275\u0275elementStart(4, "div", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, EditAttendanceComponent_Conditional_4_Conditional_39_Conditional_6_Template, 2, 1, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.fields.break_hours"), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasControlError("breakHours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", ctx_r0.i18n.t("attendance.edit.original"), ": ", ((tmp_4_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_4_0.breakHours) || 0, " ", ctx_r0.i18n.t("common.hours"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasControlError("breakHours") ? 6 : -1);
  }
}
__name(EditAttendanceComponent_Conditional_4_Conditional_39_Template, "EditAttendanceComponent_Conditional_4_Conditional_39_Template");
function EditAttendanceComponent_Conditional_4_Conditional_108_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getControlErrorMessage("notes"), " ");
  }
}
__name(EditAttendanceComponent_Conditional_4_Conditional_108_Template, "EditAttendanceComponent_Conditional_4_Conditional_108_Template");
function EditAttendanceComponent_Conditional_4_Conditional_117_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getControlErrorMessage("overrideNotes"), " ");
  }
}
__name(EditAttendanceComponent_Conditional_4_Conditional_117_Template, "EditAttendanceComponent_Conditional_4_Conditional_117_Template");
function EditAttendanceComponent_Conditional_4_Conditional_129_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 45);
  }
}
__name(EditAttendanceComponent_Conditional_4_Conditional_129_Template, "EditAttendanceComponent_Conditional_4_Conditional_129_Template");
function EditAttendanceComponent_Conditional_4_Conditional_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "span", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.edit.saving"));
  }
}
__name(EditAttendanceComponent_Conditional_4_Conditional_130_Template, "EditAttendanceComponent_Conditional_4_Conditional_130_Template");
function EditAttendanceComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "div", 9)(3, "div", 10)(4, "div", 11)(5, "div", 12)(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 12)(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 12)(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "app-status-badge", 13);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(18, "form", 14);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditAttendanceComponent_Conditional_4_Template_form_ngSubmit_18_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSave());
    }, "EditAttendanceComponent_Conditional_4_Template_form_ngSubmit_18_listener"));
    \u0275\u0275elementStart(19, "div", 11)(20, "div", 15)(21, "app-form-section", 16)(22, "div", 10)(23, "div", 17)(24, "label", 18);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 19);
    \u0275\u0275elementStart(27, "div", 20);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(30, EditAttendanceComponent_Conditional_4_Conditional_30_Template, 2, 1, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 17)(32, "label", 22);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275element(34, "input", 23);
    \u0275\u0275elementStart(35, "div", 20);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(38, EditAttendanceComponent_Conditional_4_Conditional_38_Template, 2, 1, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(39, EditAttendanceComponent_Conditional_4_Conditional_39_Template, 7, 7, "div", 17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 15)(41, "app-form-section", 16)(42, "div", 24)(43, "small", 25);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275element(45, "br");
    \u0275\u0275elementStart(46, "small", 26);
    \u0275\u0275text(47, "Uses backend business logic including flexible hours");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 10)(49, "div", 17)(50, "label", 27);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 28)(53, "strong");
    \u0275\u0275text(54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "small", 29);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(57, "div", 17)(58, "label", 27);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 28)(61, "strong");
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "small", 29);
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div", 17)(66, "label", 27);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 28)(69, "strong");
    \u0275\u0275text(70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "small", 29);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(73, "div", 17)(74, "label", 27);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "div", 28)(77, "strong");
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "small", 29);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(81, "div", 17)(82, "label", 27);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 30)(85, "strong", 31);
    \u0275\u0275text(86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "small", 29);
    \u0275\u0275text(88);
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(89, "div", 11)(90, "div", 8)(91, "app-form-section", 16)(92, "div", 10)(93, "div", 11)(94, "div", 32)(95, "div", 33);
    \u0275\u0275element(96, "input", 34);
    \u0275\u0275elementStart(97, "label", 35);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "div", 20);
    \u0275\u0275text(100);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(101, "div", 11)(102, "div", 32)(103, "div", 17)(104, "label", 36);
    \u0275\u0275text(105);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(106, "textarea", 37);
    \u0275\u0275text(107, "                    ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(108, EditAttendanceComponent_Conditional_4_Conditional_108_Template, 2, 1, "div", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(109, "div", 32)(110, "div", 17)(111, "label", 38);
    \u0275\u0275text(112);
    \u0275\u0275elementStart(113, "span", 39);
    \u0275\u0275text(114, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(115, "textarea", 40);
    \u0275\u0275text(116, "                    ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(117, EditAttendanceComponent_Conditional_4_Conditional_117_Template, 2, 1, "div", 21);
    \u0275\u0275elementStart(118, "div", 20);
    \u0275\u0275text(119);
    \u0275\u0275elementEnd()()()()()()()();
    \u0275\u0275elementStart(120, "div", 11)(121, "div", 8)(122, "div", 9)(123, "div", 10)(124, "div", 41)(125, "button", 42);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditAttendanceComponent_Conditional_4_Template_button_click_125_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditAttendanceComponent_Conditional_4_Template_button_click_125_listener"));
    \u0275\u0275element(126, "i", 43);
    \u0275\u0275text(127);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "button", 44);
    \u0275\u0275conditionalCreate(129, EditAttendanceComponent_Conditional_4_Conditional_129_Template, 1, 0, "i", 45);
    \u0275\u0275conditionalCreate(130, EditAttendanceComponent_Conditional_4_Conditional_130_Template, 3, 1, "div", 46);
    \u0275\u0275text(131);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_4_0;
    let tmp_12_0;
    let tmp_16_0;
    let tmp_23_0;
    let tmp_26_0;
    let tmp_29_0;
    let tmp_32_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.employee_name"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_2_0.employeeName, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.attendance_date"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(13, 69, (tmp_4_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_4_0.attendanceDate, "fullDate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("attendance.fields.status"), ":");
    \u0275\u0275advance();
    \u0275\u0275property("status", ctx_r0.statusBadge().label)("variant", ctx_r0.statusBadge().variant);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.editForm);
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r0.i18n.t("attendance.edit.basic_info"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.fields.check_in_time"), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasControlError("actualCheckInTime"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t("attendance.edit.original"), ": ", ((tmp_12_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_12_0.actualCheckInTime) ? \u0275\u0275pipeBind2(29, 72, (tmp_12_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_12_0.actualCheckInTime, "HH:mm") : "--:--", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasControlError("actualCheckInTime") ? 30 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.fields.check_out_time"), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasControlError("actualCheckOutTime"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t("attendance.edit.original"), ": ", ((tmp_16_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_16_0.actualCheckOutTime) ? \u0275\u0275pipeBind2(37, 75, (tmp_16_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_16_0.actualCheckOutTime, "HH:mm") : "--:--", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasControlError("actualCheckOutTime") ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftHasBreak() ? 39 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("attendance.edit.hours_calculations"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.edit.calculated_automatically"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.working_hours"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatHoursAsTime(ctx_r0.calculatedWorkingHours()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" (", ctx_r0.i18n.t("attendance.edit.original"), ": ", ctx_r0.formatHoursAsTime(((tmp_23_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_23_0.workingHours) || 0), ") ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.overtime_hours"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatHoursAsTime(ctx_r0.calculatedOvertimeHours()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" (", ctx_r0.i18n.t("attendance.edit.original"), ": ", ctx_r0.formatHoursAsTime(((tmp_26_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_26_0.overtimeHours) || 0), ") ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.late_minutes"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.calculatedLateMinutes(), " ", ctx_r0.i18n.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" (", ctx_r0.i18n.t("attendance.edit.original"), ": ", ((tmp_29_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_29_0.lateMinutes) || 0, " ", ctx_r0.i18n.t("common.minutes"), ") ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.early_leave_minutes"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.calculatedEarlyLeaveMinutes(), " ", ctx_r0.i18n.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" (", ctx_r0.i18n.t("attendance.edit.original"), ": ", ((tmp_32_0 = ctx_r0.attendanceRecord()) == null ? null : tmp_32_0.earlyLeaveMinutes) || 0, " ", ctx_r0.i18n.t("common.minutes"), ") ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.fields.total_late"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.totalLateMinutes(), " ", ctx_r0.i18n.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.edit.total_late_help"));
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r0.i18n.t("attendance.edit.notes"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.edit.approve_record"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.edit.approval_help"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.fields.notes"), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasControlError("notes"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("attendance.edit.notes_help"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasControlError("notes") ? 108 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.edit.override_notes"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasControlError("overrideNotes"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("attendance.edit.override_notes_help"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasControlError("overrideNotes") ? 117 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.edit.override_notes_help"), " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.edit.discard_changes"), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("loading", ctx_r0.saving());
    \u0275\u0275property("disabled", ctx_r0.saving() || ctx_r0.editForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.saving() ? 129 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 130 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? ctx_r0.i18n.t("attendance.edit.saving") : ctx_r0.i18n.t("attendance.edit.save_changes"), " ");
  }
}
__name(EditAttendanceComponent_Conditional_4_Template, "EditAttendanceComponent_Conditional_4_Template");
var _EditAttendanceComponent = class _EditAttendanceComponent {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  attendanceService = inject(AttendanceService);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  // Signals for reactive state management
  attendanceRecord = signal(null, ...ngDevMode ? [{ debugName: "attendanceRecord" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Form group for editing
  editForm;
  // Constants for template
  AttendanceStatus = AttendanceStatus;
  availableStatuses = [
    { value: AttendanceStatus.Present, label: "attendance.status.present" },
    { value: AttendanceStatus.Absent, label: "attendance.status.absent" },
    { value: AttendanceStatus.Late, label: "attendance.status.late" },
    { value: AttendanceStatus.EarlyLeave, label: "attendance.status.early_leave" },
    { value: AttendanceStatus.OnLeave, label: "attendance.status.on_leave" },
    { value: AttendanceStatus.DayOff, label: "attendance.status.day_off" },
    { value: AttendanceStatus.Overtime, label: "attendance.status.overtime" },
    { value: AttendanceStatus.Holiday, label: "attendance.status.holiday" },
    { value: AttendanceStatus.SickLeave, label: "attendance.status.sick_leave" }
  ];
  recordId = null;
  returnDate = null;
  // Additional signals for business rules
  shiftHasBreak = signal(false, ...ngDevMode ? [{ debugName: "shiftHasBreak" }] : []);
  calculatedStatus = signal(null, ...ngDevMode ? [{ debugName: "calculatedStatus" }] : []);
  calculatedWorkingHours = signal(0, ...ngDevMode ? [{ debugName: "calculatedWorkingHours" }] : []);
  calculatedOvertimeHours = signal(0, ...ngDevMode ? [{ debugName: "calculatedOvertimeHours" }] : []);
  calculatedLateMinutes = signal(0, ...ngDevMode ? [{ debugName: "calculatedLateMinutes" }] : []);
  calculatedEarlyLeaveMinutes = signal(0, ...ngDevMode ? [{ debugName: "calculatedEarlyLeaveMinutes" }] : []);
  totalLateMinutes = signal(0, ...ngDevMode ? [{ debugName: "totalLateMinutes" }] : []);
  /**
   * Computed property for status badge
   */
  statusBadge = computed(() => {
    const status = this.calculatedStatus();
    if (!status) {
      return { label: this.i18n.t("attendance.status.pending"), variant: "secondary" };
    }
    const label = this.i18n.t(this.getStatusText(status));
    switch (status) {
      case AttendanceStatus.Present:
        return { label, variant: "success" };
      case AttendanceStatus.Absent:
        return { label, variant: "danger" };
      case AttendanceStatus.Late:
      case AttendanceStatus.EarlyLeave:
      case AttendanceStatus.SickLeave:
        return { label, variant: "warning" };
      case AttendanceStatus.OnLeave:
        return { label, variant: "info" };
      case AttendanceStatus.Overtime:
        return { label, variant: "primary" };
      case AttendanceStatus.DayOff:
      case AttendanceStatus.Holiday:
      default:
        return { label, variant: "secondary" };
    }
  }, ...ngDevMode ? [{ debugName: "statusBadge" }] : []);
  constructor() {
    this.editForm = this.fb.group({
      actualCheckInTime: [""],
      actualCheckOutTime: [""],
      breakHours: [null, [Validators.min(0), Validators.max(24)]],
      // Conditionally visible
      isApproved: [false],
      notes: ["", [Validators.maxLength(1e3)]],
      overrideNotes: ["", [Validators.maxLength(500)]]
    });
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.recordId = parseInt(id, 10);
        this.loadAttendanceRecord(this.recordId);
      } else {
        this.error.set("Invalid attendance record ID");
        this.loading.set(false);
      }
    });
    this.route.queryParams.subscribe((params) => {
      this.returnDate = params["returnDate"] || null;
    });
  }
  /**
   * Load attendance record by ID
   */
  loadAttendanceRecord(recordId) {
    this.loading.set(true);
    this.error.set(null);
    this.attendanceService.getAttendanceRecordById(recordId).subscribe({
      next: /* @__PURE__ */ __name((record) => {
        this.attendanceRecord.set(record);
        this.populateForm(record);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading attendance record:", error);
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }, "error")
    });
  }
  /**
   * Populate form with existing record data
   */
  populateForm(record) {
    this.editForm.patchValue({
      actualCheckInTime: this.formatTimeForInput(record.actualCheckInTime),
      actualCheckOutTime: this.formatTimeForInput(record.actualCheckOutTime),
      breakHours: record.breakHours || null,
      isApproved: record.isApproved,
      notes: record.notes || "",
      overrideNotes: ""
    });
    this.calculatedStatus.set(record.status);
    this.calculatedWorkingHours.set(record.workingHours || 0);
    this.calculatedOvertimeHours.set(record.overtimeHours || 0);
    this.calculatedLateMinutes.set(record.lateMinutes || 0);
    this.calculatedEarlyLeaveMinutes.set(record.earlyLeaveMinutes || 0);
    this.calculateTotalLateMinutes(record);
    this.determineShiftBreakSettings(record);
  }
  /**
   * Determine if the employee's shift includes break time
   */
  determineShiftBreakSettings(record) {
    this.shiftHasBreak.set((record.breakHours || 0) > 0);
  }
  /**
   * Calculate total late minutes (late minutes + early leave minutes)
   */
  calculateTotalLateMinutes(record) {
    const lateMinutes = record.lateMinutes || 0;
    const earlyLeaveMinutes = record.earlyLeaveMinutes || 0;
    this.totalLateMinutes.set(lateMinutes + earlyLeaveMinutes);
  }
  /**
   * Calculate dependent fields based on check-in/check-out times
   * Uses backend calculation service for accurate business logic
   */
  calculateFields() {
    const record = this.attendanceRecord();
    if (!record)
      return;
    const checkInTime = this.editForm.get("actualCheckInTime")?.value;
    const checkOutTime = this.editForm.get("actualCheckOutTime")?.value;
    if (!checkInTime || !checkOutTime) {
      this.calculatedStatus.set(AttendanceStatus.Incomplete);
      this.calculatedWorkingHours.set(0);
      this.calculatedOvertimeHours.set(0);
      this.calculatedLateMinutes.set(0);
      this.calculatedEarlyLeaveMinutes.set(0);
      return;
    }
    this.calculateFieldsUsingBackend();
  }
  /**
   * Use backend calculation service to get accurate values
   * This ensures consistent business logic including flexible hours
   */
  calculateFieldsUsingBackend() {
    const record = this.attendanceRecord();
    if (!record || !this.recordId)
      return;
    const checkInTime = this.editForm.get("actualCheckInTime")?.value;
    const checkOutTime = this.editForm.get("actualCheckOutTime")?.value;
    if (!checkInTime || !checkOutTime)
      return;
    const request = {
      actualCheckInTime: this.convertTimeToDateTime(checkInTime),
      actualCheckOutTime: this.convertTimeToDateTime(checkOutTime),
      breakHours: this.editForm.get("breakHours")?.value || void 0
    };
  }
  /**
   * Format time string for HTML time input
   */
  formatTimeForInput(timeString) {
    if (!timeString)
      return "";
    try {
      let date;
      if (timeString.includes("T")) {
        date = new Date(timeString);
      } else {
        date = /* @__PURE__ */ new Date(`1970-01-01T${timeString}`);
      }
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch {
      return "";
    }
  }
  /**
   * Convert time string (HH:mm) to DateTime string for API
   */
  convertTimeToDateTime(timeString) {
    if (!timeString)
      return void 0;
    const record = this.attendanceRecord();
    if (!record)
      return void 0;
    try {
      const attendanceDate = new Date(record.attendanceDate);
      const year = attendanceDate.getFullYear();
      const month = (attendanceDate.getMonth() + 1).toString().padStart(2, "0");
      const day = attendanceDate.getDate().toString().padStart(2, "0");
      const dateTimeString = `${year}-${month}-${day}T${timeString}:00`;
      const testDate = new Date(dateTimeString);
      if (isNaN(testDate.getTime())) {
        return void 0;
      }
      return dateTimeString;
    } catch {
      return void 0;
    }
  }
  /**
   * Save attendance record changes
   */
  onSave() {
    if (this.editForm.invalid) {
      this.markFormGroupTouched(this.editForm);
      this.notificationService.error("Please fix validation errors before saving");
      return;
    }
    if (!this.recordId) {
      this.notificationService.error("Invalid record ID");
      return;
    }
    const formValue = this.editForm.value;
    if (this.hasManualOverrides(formValue) && !formValue.overrideNotes?.trim()) {
      this.notificationService.error("Override notes are required when making manual adjustments");
      return;
    }
    if (formValue.actualCheckInTime && formValue.actualCheckOutTime) {
      const checkInDateTime = this.convertTimeToDateTime(formValue.actualCheckInTime);
      const checkOutDateTime = this.convertTimeToDateTime(formValue.actualCheckOutTime);
      if (checkInDateTime && checkOutDateTime) {
        const checkIn = new Date(checkInDateTime);
        const checkOut = new Date(checkOutDateTime);
        if (checkOut <= checkIn) {
          this.notificationService.error("Check-out time must be after check-in time");
          return;
        }
      }
    }
    if (formValue.breakHours && formValue.breakHours < 0) {
      this.notificationService.error("Break hours cannot be negative");
      return;
    }
    this.saving.set(true);
    const request = {
      // Only send editable fields - calculated fields will be computed by backend
      actualCheckInTime: this.convertTimeToDateTime(formValue.actualCheckInTime),
      actualCheckOutTime: this.convertTimeToDateTime(formValue.actualCheckOutTime),
      breakHours: formValue.breakHours || void 0,
      isApproved: formValue.isApproved || void 0,
      notes: formValue.notes?.trim() || void 0,
      overrideNotes: formValue.overrideNotes?.trim() || void 0
    };
    this.attendanceService.updateAttendanceRecord(this.recordId, request).subscribe({
      next: /* @__PURE__ */ __name((updatedRecord) => {
        this.attendanceRecord.set(updatedRecord);
        this.saving.set(false);
        this.notificationService.success("Attendance record updated successfully");
        this.navigateBackToDailyAttendance();
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error updating attendance record:", error);
        this.saving.set(false);
        this.notificationService.error(this.getErrorMessage(error));
      }, "error")
    });
  }
  /**
   * Check if form has manual overrides
   */
  hasManualOverrides(formValue) {
    const originalRecord = this.attendanceRecord();
    if (!originalRecord)
      return false;
    return formValue.actualCheckInTime !== this.formatTimeForInput(originalRecord.actualCheckInTime) || formValue.actualCheckOutTime !== this.formatTimeForInput(originalRecord.actualCheckOutTime) || formValue.breakHours !== originalRecord.breakHours;
  }
  /**
   * Navigate back to daily attendance page with preserved date
   */
  navigateBackToDailyAttendance() {
    if (this.returnDate) {
      this.router.navigate(["/attendance/daily"], {
        queryParams: { date: this.returnDate }
      });
    } else {
      this.router.navigate(["/attendance/daily"]);
    }
  }
  /**
   * Cancel editing and go back
   */
  onCancel() {
    this.navigateBackToDailyAttendance();
  }
  /**
   * Reset form to original values
   */
  onReset() {
    const record = this.attendanceRecord();
    if (record) {
      this.populateForm(record);
      this.notificationService.info("Form reset to original values");
    }
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
      case AttendanceStatus.Holiday:
        return "attendance.status.holiday";
      case AttendanceStatus.SickLeave:
        return "attendance.status.sick_leave";
      default:
        return "attendance.status.pending";
    }
  }
  /**
   * Get status badge class
   */
  getStatusBadgeClass(status) {
    if (!status)
      return "badge bg-secondary";
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
      case AttendanceStatus.Holiday:
        return "badge bg-secondary";
      case AttendanceStatus.SickLeave:
        return "badge bg-warning";
      default:
        return "badge bg-secondary";
    }
  }
  /**
   * Get status display text
   */
  getStatusDisplayText(status) {
    if (!status)
      return this.i18n.t("attendance.status.pending");
    return this.i18n.t(this.getStatusText(status));
  }
  /**
   * Get error message from HTTP error
   */
  getErrorMessage(error) {
    if (error?.status === 403) {
      return "You do not have permission to edit attendance records";
    }
    if (error?.status === 404) {
      return "Attendance record not found";
    }
    if (error?.error && typeof error.error === "string") {
      return error.error;
    }
    if (error?.message) {
      return error.message;
    }
    return "An error occurred while processing your request";
  }
  /**
   * Mark all form controls as touched to show validation errors
   */
  markFormGroupTouched(formGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
  /**
   * Get form control error message
   */
  getControlErrorMessage(controlName) {
    const control = this.editForm.get(controlName);
    if (!control || !control.touched || !control.errors) {
      return "";
    }
    if (control.errors["required"]) {
      return `${controlName} is required`;
    }
    if (control.errors["min"]) {
      return `${controlName} must be greater than or equal to ${control.errors["min"].min}`;
    }
    if (control.errors["max"]) {
      return `${controlName} must be less than or equal to ${control.errors["max"].max}`;
    }
    if (control.errors["maxlength"]) {
      return `${controlName} cannot exceed ${control.errors["maxlength"].requiredLength} characters`;
    }
    return "Invalid value";
  }
  /**
   * Check if form control has error
   */
  hasControlError(controlName) {
    const control = this.editForm.get(controlName);
    return !!(control?.touched && control?.invalid);
  }
  /**
   * Format decimal hours to time format (H:MM)
   * Example: 7.983333 becomes "7:59"
   */
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
};
__name(_EditAttendanceComponent, "EditAttendanceComponent");
__publicField(_EditAttendanceComponent, "\u0275fac", /* @__PURE__ */ __name(function EditAttendanceComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditAttendanceComponent)();
}, "EditAttendanceComponent_Factory"));
__publicField(_EditAttendanceComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditAttendanceComponent, selectors: [["app-edit-attendance"]], decls: 5, vars: 6, consts: [[1, "container-fluid"], ["mode", "edit", "moduleName", "attendance", "moduleRoute", "attendance", 3, "title", "entityId", "loading"], [1, "d-flex", "justify-content-center", "align-items-center", 2, "min-height", "200px"], ["role", "alert", 1, "alert", "alert-danger"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "row", "mb-4"], [1, "col-12"], [1, "card"], [1, "card-body"], [1, "row"], [1, "col-md-4"], [3, "status", "variant"], [3, "ngSubmit", "formGroup"], [1, "col-lg-6"], [3, "title"], [1, "mb-3"], ["for", "actualCheckInTime", 1, "form-label"], ["type", "time", "id", "actualCheckInTime", "formControlName", "actualCheckInTime", 1, "form-control"], [1, "form-text"], [1, "invalid-feedback"], ["for", "actualCheckOutTime", 1, "form-label"], ["type", "time", "id", "actualCheckOutTime", "formControlName", "actualCheckOutTime", 1, "form-control"], [1, "card-header"], [1, "text-muted"], [1, "text-info"], [1, "form-label"], [1, "form-control-plaintext", "bg-light", "p-2", "rounded"], [1, "text-muted", "ms-2"], [1, "form-control-plaintext", "bg-warning", "bg-opacity-10", "p-2", "rounded", "border", "border-warning"], [1, "text-warning"], [1, "col-md-6"], [1, "form-check", "mb-3"], ["type", "checkbox", "id", "isApproved", "formControlName", "isApproved", 1, "form-check-input"], ["for", "isApproved", 1, "form-check-label"], ["for", "notes", 1, "form-label"], ["id", "notes", "formControlName", "notes", "rows", "3", 1, "form-control", 3, "placeholder"], ["for", "overrideNotes", 1, "form-label"], [1, "text-danger"], ["id", "overrideNotes", "formControlName", "overrideNotes", "rows", "3", 1, "form-control", 3, "placeholder"], [1, "d-flex", "justify-content-between"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fas", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "fas", "fa-save", "me-2"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], ["for", "breakHours", 1, "form-label"], ["type", "number", "id", "breakHours", "formControlName", "breakHours", "step", "0.1", 1, "form-control"]], template: /* @__PURE__ */ __name(function EditAttendanceComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, EditAttendanceComponent_Conditional_2_Template, 4, 1, "div", 2);
    \u0275\u0275conditionalCreate(3, EditAttendanceComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, EditAttendanceComponent_Conditional_4_Template, 132, 78);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("attendance.edit.title"))("entityId", ctx.recordId || 0)("loading", ctx.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() && ctx.attendanceRecord() ? 4 : -1);
  }
}, "EditAttendanceComponent_Template"), dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormHeaderComponent, FormSectionComponent, StatusBadgeComponent, DatePipe], styles: ['\n\n.card[_ngcontent-%COMP%] {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border: 1px solid rgba(0, 0, 0, 0.125);\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n}\n.card-title[_ngcontent-%COMP%] {\n  color: #495057;\n  font-weight: 600;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-text[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 0.875rem;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.375rem 0.75rem;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  background-color: transparent;\n  padding: 0;\n  margin-bottom: 0;\n}\n.breadcrumb-item[_ngcontent-%COMP%]    + .breadcrumb-item[_ngcontent-%COMP%]::before {\n  content: ">";\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-control.is-invalid[_ngcontent-%COMP%]:focus, \n.form-select.is-invalid[_ngcontent-%COMP%]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #0b5ed7;\n  border-color: #0a58ca;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n.d-flex.justify-content-center.align-items-center[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-radius: 0.375rem;\n}\n@media (max-width: 768px) {\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .row.mb-4[_ngcontent-%COMP%] {\n    margin-bottom: 1.5rem !important;\n  }\n  .col-md-3[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 0.5rem;\n  }\n}\n.fas[_ngcontent-%COMP%] {\n  color: #495057;\n}\n.card-header[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  color: #0d6efd;\n}\n.mb-3[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0 !important;\n}\n.badge.bg-success[_ngcontent-%COMP%] {\n  background-color: #198754 !important;\n}\n.badge.bg-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n}\n.badge.bg-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107 !important;\n  color: #000;\n}\n.badge.bg-info[_ngcontent-%COMP%] {\n  background-color: #0dcaf0 !important;\n  color: #000;\n}\n.badge.bg-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n}\n.badge.bg-primary[_ngcontent-%COMP%] {\n  background-color: #0d6efd !important;\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  color: #dc3545;\n  font-size: 0.875rem;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #dc3545 !important;\n}\n/*# sourceMappingURL=edit-attendance.component.css.map */'] }));
var EditAttendanceComponent = _EditAttendanceComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditAttendanceComponent, [{
    type: Component,
    args: [{ selector: "app-edit-attendance", standalone: true, imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent, StatusBadgeComponent], template: `<div class="container-fluid">\r
  <app-form-header\r
    mode="edit"\r
    [title]="i18n.t('attendance.edit.title')"\r
    moduleName="attendance"\r
    moduleRoute="attendance"\r
    [entityId]="recordId || 0"\r
    [loading]="saving()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">\r
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
  @if (!loading() && !error() && attendanceRecord()) {\r
\r
    <!-- Employee Information Card -->\r
    <div class="row mb-4">\r
      <div class="col-12">\r
        <div class="card">\r
          <div class="card-body">\r
            <div class="row">\r
              <div class="col-md-4">\r
                <strong>{{ i18n.t('attendance.fields.employee_name') }}:</strong>\r
                {{ attendanceRecord()?.employeeName }}\r
              </div>\r
              <div class="col-md-4">\r
                <strong>{{ i18n.t('attendance.fields.attendance_date') }}:</strong>\r
                {{ attendanceRecord()?.attendanceDate | date: 'fullDate' }}\r
              </div>\r
              <div class="col-md-4">\r
                <strong>{{ i18n.t('attendance.fields.status') }}:</strong>\r
                <app-status-badge\r
                  [status]="statusBadge().label"\r
                  [variant]="statusBadge().variant">\r
                </app-status-badge>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Edit Form -->\r
    <form [formGroup]="editForm" (ngSubmit)="onSave()">\r
      <div class="row">\r
        <!-- Editable Time Fields -->\r
        <div class="col-lg-6">\r
          <app-form-section [title]="i18n.t('attendance.edit.basic_info')">\r
            <div class="card-body">\r
              <!-- Check-in Time -->\r
              <div class="mb-3">\r
                <label for="actualCheckInTime" class="form-label">\r
                  {{ i18n.t('attendance.fields.check_in_time') }}\r
                </label>\r
                <input\r
                  type="time"\r
                  id="actualCheckInTime"\r
                  class="form-control"\r
                  formControlName="actualCheckInTime"\r
                  [class.is-invalid]="hasControlError('actualCheckInTime')">\r
                <div class="form-text">\r
                  {{ i18n.t('attendance.edit.original') }}:\r
                  {{ attendanceRecord()?.actualCheckInTime ? (attendanceRecord()?.actualCheckInTime | date: 'HH:mm') : '--:--' }}\r
                </div>\r
                @if (hasControlError('actualCheckInTime')) {\r
                  <div class="invalid-feedback">\r
                    {{ getControlErrorMessage('actualCheckInTime') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Check-out Time -->\r
              <div class="mb-3">\r
                <label for="actualCheckOutTime" class="form-label">\r
                  {{ i18n.t('attendance.fields.check_out_time') }}\r
                </label>\r
                <input\r
                  type="time"\r
                  id="actualCheckOutTime"\r
                  class="form-control"\r
                  formControlName="actualCheckOutTime"\r
                  [class.is-invalid]="hasControlError('actualCheckOutTime')">\r
                <div class="form-text">\r
                  {{ i18n.t('attendance.edit.original') }}:\r
                  {{ attendanceRecord()?.actualCheckOutTime ? (attendanceRecord()?.actualCheckOutTime | date: 'HH:mm') : '--:--' }}\r
                </div>\r
                @if (hasControlError('actualCheckOutTime')) {\r
                  <div class="invalid-feedback">\r
                    {{ getControlErrorMessage('actualCheckOutTime') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Break Hours - Only show if shift has break -->\r
              @if (shiftHasBreak()) {\r
                <div class="mb-3">\r
                  <label for="breakHours" class="form-label">\r
                    {{ i18n.t('attendance.fields.break_hours') }}\r
                  </label>\r
                  <input\r
                    type="number"\r
                    id="breakHours"\r
                    class="form-control"\r
                    formControlName="breakHours"\r
                    step="0.1"\r
                    [class.is-invalid]="hasControlError('breakHours')">\r
                  <div class="form-text">\r
                    {{ i18n.t('attendance.edit.original') }}: {{ attendanceRecord()?.breakHours || 0 }} {{ i18n.t('common.hours') }}\r
                  </div>\r
                  @if (hasControlError('breakHours')) {\r
                    <div class="invalid-feedback">\r
                      {{ getControlErrorMessage('breakHours') }}\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          </app-form-section>\r
        </div>\r
\r
        <!-- Calculated Fields (Read-only) -->\r
        <div class="col-lg-6">\r
          <app-form-section [title]="i18n.t('attendance.edit.hours_calculations')">\r
            <div class="card-header">\r
              <small class="text-muted">{{ i18n.t('attendance.edit.calculated_automatically') }}</small>\r
              <br>\r
              <small class="text-info">Uses backend business logic including flexible hours</small>\r
            </div>\r
            <div class="card-body">\r
              <!-- Calculated Working Hours -->\r
              <div class="mb-3">\r
                <label class="form-label">{{ i18n.t('attendance.fields.working_hours') }}</label>\r
                <div class="form-control-plaintext bg-light p-2 rounded">\r
                  <strong>{{ formatHoursAsTime(calculatedWorkingHours()) }}</strong>\r
                  <small class="text-muted ms-2">\r
                    ({{ i18n.t('attendance.edit.original') }}: {{ formatHoursAsTime(attendanceRecord()?.workingHours || 0) }})\r
                  </small>\r
                </div>\r
              </div>\r
\r
              <!-- Calculated Overtime Hours -->\r
              <div class="mb-3">\r
                <label class="form-label">{{ i18n.t('attendance.fields.overtime_hours') }}</label>\r
                <div class="form-control-plaintext bg-light p-2 rounded">\r
                  <strong>{{ formatHoursAsTime(calculatedOvertimeHours()) }}</strong>\r
                  <small class="text-muted ms-2">\r
                    ({{ i18n.t('attendance.edit.original') }}: {{ formatHoursAsTime(attendanceRecord()?.overtimeHours || 0) }})\r
                  </small>\r
                </div>\r
              </div>\r
\r
              <!-- Calculated Late Minutes -->\r
              <div class="mb-3">\r
                <label class="form-label">{{ i18n.t('attendance.fields.late_minutes') }}</label>\r
                <div class="form-control-plaintext bg-light p-2 rounded">\r
                  <strong>{{ calculatedLateMinutes() }} {{ i18n.t('common.minutes') }}</strong>\r
                  <small class="text-muted ms-2">\r
                    ({{ i18n.t('attendance.edit.original') }}: {{ attendanceRecord()?.lateMinutes || 0 }} {{ i18n.t('common.minutes') }})\r
                  </small>\r
                </div>\r
              </div>\r
\r
              <!-- Calculated Early Leave Minutes -->\r
              <div class="mb-3">\r
                <label class="form-label">{{ i18n.t('attendance.fields.early_leave_minutes') }}</label>\r
                <div class="form-control-plaintext bg-light p-2 rounded">\r
                  <strong>{{ calculatedEarlyLeaveMinutes() }} {{ i18n.t('common.minutes') }}</strong>\r
                  <small class="text-muted ms-2">\r
                    ({{ i18n.t('attendance.edit.original') }}: {{ attendanceRecord()?.earlyLeaveMinutes || 0 }} {{ i18n.t('common.minutes') }})\r
                  </small>\r
                </div>\r
              </div>\r
\r
              <!-- New Total Late Field -->\r
              <div class="mb-3">\r
                <label class="form-label">{{ i18n.t('attendance.fields.total_late') }}</label>\r
                <div class="form-control-plaintext bg-warning bg-opacity-10 p-2 rounded border border-warning">\r
                  <strong class="text-warning">{{ totalLateMinutes() }} {{ i18n.t('common.minutes') }}</strong>\r
                  <small class="text-muted ms-2">{{ i18n.t('attendance.edit.total_late_help') }}</small>\r
                </div>\r
              </div>\r
            </div>\r
          </app-form-section>\r
        </div>\r
      </div>\r
\r
      <!-- Notes and Approval Section -->\r
      <div class="row">\r
        <div class="col-12">\r
          <app-form-section [title]="i18n.t('attendance.edit.notes')">\r
            <div class="card-body">\r
              <div class="row">\r
                <!-- Approval -->\r
                <div class="col-md-6">\r
                  <div class="form-check mb-3">\r
                    <input\r
                      type="checkbox"\r
                      id="isApproved"\r
                      class="form-check-input"\r
                      formControlName="isApproved">\r
                    <label for="isApproved" class="form-check-label">\r
                      {{ i18n.t('attendance.edit.approve_record') }}\r
                    </label>\r
                    <div class="form-text">\r
                      {{ i18n.t('attendance.edit.approval_help') }}\r
                    </div>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div class="row">\r
                <!-- General Notes -->\r
                <div class="col-md-6">\r
                  <div class="mb-3">\r
                    <label for="notes" class="form-label">\r
                      {{ i18n.t('attendance.fields.notes') }}\r
                    </label>\r
                    <textarea\r
                      id="notes"\r
                      class="form-control"\r
                      formControlName="notes"\r
                      rows="3"\r
                      [class.is-invalid]="hasControlError('notes')"\r
                      [placeholder]="i18n.t('attendance.edit.notes_help')">\r
                    </textarea>\r
                    @if (hasControlError('notes')) {\r
                      <div class="invalid-feedback">\r
                        {{ getControlErrorMessage('notes') }}\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
\r
                <!-- Override Notes (Required) -->\r
                <div class="col-md-6">\r
                  <div class="mb-3">\r
                    <label for="overrideNotes" class="form-label">\r
                      {{ i18n.t('attendance.edit.override_notes') }}\r
                      <span class="text-danger">*</span>\r
                    </label>\r
                    <textarea\r
                      id="overrideNotes"\r
                      class="form-control"\r
                      formControlName="overrideNotes"\r
                      rows="3"\r
                      [class.is-invalid]="hasControlError('overrideNotes')"\r
                      [placeholder]="i18n.t('attendance.edit.override_notes_help')">\r
                    </textarea>\r
                    @if (hasControlError('overrideNotes')) {\r
                      <div class="invalid-feedback">\r
                        {{ getControlErrorMessage('overrideNotes') }}\r
                      </div>\r
                    }\r
                    <div class="form-text">\r
                      {{ i18n.t('attendance.edit.override_notes_help') }}\r
                    </div>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          </app-form-section>\r
        </div>\r
      </div>\r
\r
      <!-- Action Buttons -->\r
      <div class="row">\r
        <div class="col-12">\r
          <div class="card">\r
            <div class="card-body">\r
              <div class="d-flex justify-content-between">\r
                <button type="button" class="btn btn-outline-secondary" (click)="onCancel()">\r
                  <i class="fas fa-times me-2"></i>\r
                  {{ i18n.t('attendance.edit.discard_changes') }}\r
                </button>\r
                <button\r
                  type="submit"\r
                  class="btn btn-primary"\r
                  [disabled]="saving() || editForm.invalid"\r
                  [class.loading]="saving()">\r
                  @if (!saving()) {\r
                    <i class="fas fa-save me-2"></i>\r
                  }\r
                  @if (saving()) {\r
                    <div class="spinner-border spinner-border-sm me-2" role="status">\r
                      <span class="visually-hidden">{{ i18n.t('attendance.edit.saving') }}</span>\r
                    </div>\r
                  }\r
                  {{ saving() ? i18n.t('attendance.edit.saving') : i18n.t('attendance.edit.save_changes') }}\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </form>\r
  }\r
</div>`, styles: ['/* src/app/pages/attendance/edit-attendance/edit-attendance.component.css */\n.card {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border: 1px solid rgba(0, 0, 0, 0.125);\n}\n.card-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n}\n.card-title {\n  color: #495057;\n  font-weight: 600;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-text {\n  color: #6c757d;\n  font-size: 0.875rem;\n}\n.badge {\n  font-size: 0.75rem;\n  padding: 0.375rem 0.75rem;\n}\n.invalid-feedback {\n  display: block;\n}\n.breadcrumb {\n  background-color: transparent;\n  padding: 0;\n  margin-bottom: 0;\n}\n.breadcrumb-item + .breadcrumb-item::before {\n  content: ">";\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-control.is-invalid:focus,\n.form-select.is-invalid:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n.btn-primary {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-primary:hover {\n  background-color: #0b5ed7;\n  border-color: #0a58ca;\n}\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary:hover {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.alert {\n  border-radius: 0.375rem;\n}\n.d-flex.justify-content-center.align-items-center {\n  background-color: #f8f9fa;\n  border-radius: 0.375rem;\n}\n@media (max-width: 768px) {\n  .card-body {\n    padding: 1rem;\n  }\n  .row.mb-4 {\n    margin-bottom: 1.5rem !important;\n  }\n  .col-md-3 {\n    margin-bottom: 1rem;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between > div {\n    width: 100%;\n  }\n  .btn {\n    width: 100%;\n    margin-bottom: 0.5rem;\n  }\n}\n.fas {\n  color: #495057;\n}\n.card-header .fas {\n  color: #0d6efd;\n}\n.mb-3:last-child {\n  margin-bottom: 0 !important;\n}\n.badge.bg-success {\n  background-color: #198754 !important;\n}\n.badge.bg-danger {\n  background-color: #dc3545 !important;\n}\n.badge.bg-warning {\n  background-color: #ffc107 !important;\n  color: #000;\n}\n.badge.bg-info {\n  background-color: #0dcaf0 !important;\n  color: #000;\n}\n.badge.bg-secondary {\n  background-color: #6c757d !important;\n}\n.badge.bg-primary {\n  background-color: #0d6efd !important;\n}\n.is-invalid {\n  border-color: #dc3545;\n}\n.invalid-feedback {\n  color: #dc3545;\n  font-size: 0.875rem;\n}\n.text-danger {\n  color: #dc3545 !important;\n}\n/*# sourceMappingURL=edit-attendance.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditAttendanceComponent, { className: "EditAttendanceComponent", filePath: "src/app/pages/attendance/edit-attendance/edit-attendance.component.ts", lineNumber: 24 });
})();
export {
  EditAttendanceComponent
};
//# sourceMappingURL=chunk-OZ6ED2S3.js.map
