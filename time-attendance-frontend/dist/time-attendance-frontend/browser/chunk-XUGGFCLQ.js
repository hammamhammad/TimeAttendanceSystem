import {
  AttendanceService
} from "./chunk-UR7BACYI.js";
import {
  ShiftAssignmentService
} from "./chunk-EXGLHUX7.js";
import {
  ShiftAssignmentStatus,
  ShiftAssignmentType
} from "./chunk-IP6EMSNR.js";
import {
  ShiftsService
} from "./chunk-VQOTGROE.js";
import {
  FormSectionComponent
} from "./chunk-JTLHOQFH.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  Component,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/attendance/change-attendance-shift/change-attendance-shift.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function ChangeAttendanceShiftComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 5)(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 7);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.loading_details"));
  }
}
__name(ChangeAttendanceShiftComponent_Conditional_2_Template, "ChangeAttendanceShiftComponent_Conditional_2_Template");
function ChangeAttendanceShiftComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "i", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(ChangeAttendanceShiftComponent_Conditional_3_Template, "ChangeAttendanceShiftComponent_Conditional_3_Template");
function ChangeAttendanceShiftComponent_Conditional_4_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275element(1, "i", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(ChangeAttendanceShiftComponent_Conditional_4_Conditional_26_Template, "ChangeAttendanceShiftComponent_Conditional_4_Conditional_26_Template");
function ChangeAttendanceShiftComponent_Conditional_4_For_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const shift_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", shift_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", shift_r3.name, " (", ctx_r0.getShiftTimeDisplay(shift_r3), ") ");
  }
}
__name(ChangeAttendanceShiftComponent_Conditional_4_For_37_Template, "ChangeAttendanceShiftComponent_Conditional_4_For_37_Template");
function ChangeAttendanceShiftComponent_Conditional_4_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("shiftId"), " ");
  }
}
__name(ChangeAttendanceShiftComponent_Conditional_4_Conditional_38_Template, "ChangeAttendanceShiftComponent_Conditional_4_Conditional_38_Template");
function ChangeAttendanceShiftComponent_Conditional_4_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 55);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.changing_shift"), " ");
  }
}
__name(ChangeAttendanceShiftComponent_Conditional_4_Conditional_56_Template, "ChangeAttendanceShiftComponent_Conditional_4_Conditional_56_Template");
function ChangeAttendanceShiftComponent_Conditional_4_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 56);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.change_shift"), " ");
  }
}
__name(ChangeAttendanceShiftComponent_Conditional_4_Conditional_57_Template, "ChangeAttendanceShiftComponent_Conditional_4_Conditional_57_Template");
function ChangeAttendanceShiftComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 9);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function ChangeAttendanceShiftComponent_Conditional_4_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "ChangeAttendanceShiftComponent_Conditional_4_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "div", 10)(2, "div", 11)(3, "app-form-section", 1)(4, "div", 12)(5, "div", 13)(6, "div", 14)(7, "div", 15);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "h6", 16);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 17);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(14, "app-form-section", 1)(15, "div", 18)(16, "div", 19)(17, "div", 20)(18, "div")(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 21);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "span", 22);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(25, "app-form-section", 1);
    \u0275\u0275conditionalCreate(26, ChangeAttendanceShiftComponent_Conditional_4_Conditional_26_Template, 3, 1, "div", 23);
    \u0275\u0275elementStart(27, "div", 24)(28, "div", 25)(29, "label", 26);
    \u0275\u0275text(30);
    \u0275\u0275elementStart(31, "span", 27);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "select", 28)(34, "option", 29);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(36, ChangeAttendanceShiftComponent_Conditional_4_For_37_Template, 2, 3, "option", 30, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(38, ChangeAttendanceShiftComponent_Conditional_4_Conditional_38_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 32)(40, "label", 33);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "textarea", 34);
    \u0275\u0275text(43, "                ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 35);
    \u0275\u0275element(45, "i", 36);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 37)(48, "div", 38)(49, "div", 39)(50, "h6", 40);
    \u0275\u0275element(51, "i", 41);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 42)(54, "div", 43)(55, "button", 44);
    \u0275\u0275conditionalCreate(56, ChangeAttendanceShiftComponent_Conditional_4_Conditional_56_Template, 2, 1)(57, ChangeAttendanceShiftComponent_Conditional_4_Conditional_57_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 45);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ChangeAttendanceShiftComponent_Conditional_4_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onReset());
    }, "ChangeAttendanceShiftComponent_Conditional_4_Template_button_click_58_listener"));
    \u0275\u0275element(59, "i", 46);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "button", 47);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ChangeAttendanceShiftComponent_Conditional_4_Template_button_click_61_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "ChangeAttendanceShiftComponent_Conditional_4_Template_button_click_61_listener"));
    \u0275\u0275element(62, "i", 48);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(64, "div", 49)(65, "div", 39)(66, "h6", 40);
    \u0275\u0275element(67, "i", 36);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "div", 42)(70, "p", 50);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "ul", 51)(73, "li", 16);
    \u0275\u0275element(74, "i", 52);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "li", 16);
    \u0275\u0275element(77, "i", 53);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "li");
    \u0275\u0275element(80, "i", 54);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.changeShiftForm);
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r0.i18n.t("attendance.employee_and_date"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getEmployeeInitials(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.attendanceRecord().employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.attendanceRecord().employeeNumber, " \u2022 ", ctx_r0.formatDate(ctx_r0.attendanceRecord().attendanceDate), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("attendance.current_shift"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.getCurrentShiftName());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getCurrentShiftTime(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.current"));
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("attendance.new_shift_assignment"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.error() ? 26 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.newShift"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("shiftId"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("attendance.placeholders.select_shift"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableShifts());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasError("shiftId") ? 38 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.notes"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("attendance.placeholders.shift_change_notes"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.shift_change_warning"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.changeShiftForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 56 : 57);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.reset"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.help"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.help.shift_change_instructions"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.help.select_new_shift"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.help.recalculation_note"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("attendance.help.optional_notes"), " ");
  }
}
__name(ChangeAttendanceShiftComponent_Conditional_4_Template, "ChangeAttendanceShiftComponent_Conditional_4_Template");
var _ChangeAttendanceShiftComponent = class _ChangeAttendanceShiftComponent {
  i18n = inject(I18nService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  attendanceService = inject(AttendanceService);
  shiftsService = inject(ShiftsService);
  shiftAssignmentService = inject(ShiftAssignmentService);
  notificationService = inject(NotificationService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  attendanceRecord = signal(null, ...ngDevMode ? [{ debugName: "attendanceRecord" }] : []);
  availableShifts = signal([], ...ngDevMode ? [{ debugName: "availableShifts" }] : []);
  currentShiftAssignment = signal(null, ...ngDevMode ? [{ debugName: "currentShiftAssignment" }] : []);
  currentShift = signal(null, ...ngDevMode ? [{ debugName: "currentShift" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  changeShiftForm;
  constructor() {
    this.changeShiftForm = this.fb.group({
      shiftId: ["", Validators.required],
      notes: [""]
    });
  }
  ngOnInit() {
    this.loadAttendanceRecord();
  }
  loadAttendanceRecord() {
    const attendanceId = this.route.snapshot.paramMap.get("attendanceId");
    if (!attendanceId) {
      this.router.navigate(["/attendance"]);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.attendanceService.getAttendanceById(+attendanceId).subscribe({
      next: /* @__PURE__ */ __name((record) => {
        this.attendanceRecord.set(record);
        this.loadShifts();
        this.loadCurrentShiftAssignment();
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load attendance record:", error);
        this.error.set(this.i18n.t("attendance.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  loadShifts() {
    this.shiftsService.getActiveShifts().subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.availableShifts.set(response.items);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load shifts:", error);
        this.notificationService.error(this.i18n.t("shifts.errors.load_failed"));
      }, "error")
    });
  }
  loadCurrentShiftAssignment() {
    const record = this.attendanceRecord();
    if (!record?.employeeId) {
      return;
    }
    this.shiftAssignmentService.getShiftAssignments({
      employeeId: record.employeeId,
      assignmentType: ShiftAssignmentType.Employee,
      status: ShiftAssignmentStatus.Active,
      currentlyActive: true,
      pageSize: 1
    }).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        if (response.items && response.items.length > 0) {
          const assignment = response.items[0];
          this.currentShiftAssignment.set(assignment);
          this.loadCurrentShiftDetails(assignment.shiftId);
        } else {
          this.currentShiftAssignment.set(null);
          this.currentShift.set(null);
        }
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load current shift assignment:", error);
        this.currentShiftAssignment.set(null);
        this.currentShift.set(null);
      }, "error")
    });
  }
  loadCurrentShiftDetails(shiftId) {
    this.shiftsService.getShiftById(shiftId).subscribe({
      next: /* @__PURE__ */ __name((shift) => {
        this.currentShift.set(shift);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load current shift details:", error);
        this.currentShift.set(null);
      }, "error")
    });
  }
  onSubmit() {
    if (this.changeShiftForm.invalid || !this.attendanceRecord()) {
      this.changeShiftForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set(null);
    const formValue = this.changeShiftForm.value;
    const record = this.attendanceRecord();
    const changeData = {
      attendanceId: record.id,
      shiftId: +formValue.shiftId,
      notes: formValue.notes || void 0
    };
    this.attendanceService.changeAttendanceShift(changeData).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notificationService.success(this.i18n.t("attendance.success.shift_changed"));
        this.router.navigate(["/attendance"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to change attendance shift:", error);
        this.error.set(this.i18n.t("attendance.errors.shift_change_failed"));
        this.saving.set(false);
      }, "error")
    });
  }
  onReset() {
    this.changeShiftForm.reset({
      shiftId: "",
      notes: ""
    });
    this.error.set(null);
  }
  onCancel() {
    this.router.navigate(["/attendance"]);
  }
  // Helper methods
  getEmployeeInitials() {
    const record = this.attendanceRecord();
    if (!record?.employeeName)
      return "";
    const nameParts = record.employeeName.split(" ");
    const first = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() : "";
    const last = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : "";
    return first + last;
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  getCurrentShiftName() {
    const shift = this.currentShift();
    return shift ? shift.name : this.i18n.t("attendance.no_shift_assigned");
  }
  getCurrentShiftTime() {
    const shift = this.currentShift();
    if (!shift)
      return "";
    if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
      const firstPeriod = shift.shiftPeriods[0];
      const lastPeriod = shift.shiftPeriods[shift.shiftPeriods.length - 1];
      return `${firstPeriod.startTime} - ${lastPeriod.endTime}`;
    }
    return this.i18n.t("shifts.time_not_specified");
  }
  getShiftTimeDisplay(shift) {
    if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
      const firstPeriod = shift.shiftPeriods[0];
      const lastPeriod = shift.shiftPeriods[shift.shiftPeriods.length - 1];
      return `${firstPeriod.startTime} - ${lastPeriod.endTime}`;
    }
    return this.i18n.t("shifts.time_not_specified");
  }
  // Form validation helpers
  isFieldInvalid(fieldName) {
    const field = this.changeShiftForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  hasError(fieldName) {
    return this.isFieldInvalid(fieldName);
  }
  getErrorMessage(fieldName) {
    const field = this.changeShiftForm.get(fieldName);
    if (!field || !field.errors)
      return "";
    if (field.errors["required"]) {
      return this.i18n.t("validation.required");
    }
    return "";
  }
};
__name(_ChangeAttendanceShiftComponent, "ChangeAttendanceShiftComponent");
__publicField(_ChangeAttendanceShiftComponent, "\u0275fac", /* @__PURE__ */ __name(function ChangeAttendanceShiftComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ChangeAttendanceShiftComponent)();
}, "ChangeAttendanceShiftComponent_Factory"));
__publicField(_ChangeAttendanceShiftComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangeAttendanceShiftComponent, selectors: [["app-change-attendance-shift"]], decls: 5, vars: 4, consts: [[1, "app-form-page"], [3, "title"], [1, "text-center", "py-5"], [1, "alert", "alert-danger"], [3, "formGroup"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-3", "text-muted"], [1, "fas", "fa-exclamation-triangle", "me-2"], [3, "ngSubmit", "formGroup"], [1, "app-desktop-sidebar"], [1, "app-main-content"], [1, "alert", "alert-info"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-3"], [1, "avatar-initial", "bg-primary", "text-white", "rounded-circle"], [1, "mb-1"], [1, "text-muted"], [1, "card", "bg-light"], [1, "card-body", "py-3"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "small", "text-muted", "mt-1"], [1, "badge", "bg-light", "text-dark", "border"], [1, "alert", "alert-danger", "mb-3"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "shiftId", 1, "form-label"], [1, "text-danger"], ["id", "shiftId", "formControlName", "shiftId", 1, "form-select"], ["value", ""], [3, "value"], [1, "invalid-feedback"], [1, "col-12", "mb-3"], ["for", "notes", 1, "form-label"], ["id", "notes", "formControlName", "notes", "rows", "4", 1, "form-control", 3, "placeholder"], [1, "alert", "alert-warning", "mt-3"], [1, "fas", "fa-info-circle", "me-2"], [1, "app-sidebar-content"], [1, "card", "mb-3"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-cogs", "me-2"], [1, "card-body"], [1, "d-grid", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fas", "fa-undo", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], [1, "card"], [1, "card-text", "small", "text-muted", "mb-2"], [1, "list-unstyled", "small", "text-muted", "mb-0"], [1, "fas", "fa-check-circle", "text-success", "me-1"], [1, "fas", "fa-calculator", "text-info", "me-1"], [1, "fas", "fa-sticky-note", "text-warning", "me-1"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-clock", "me-2"]], template: /* @__PURE__ */ __name(function ChangeAttendanceShiftComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275conditionalCreate(2, ChangeAttendanceShiftComponent_Conditional_2_Template, 6, 2, "div", 2);
    \u0275\u0275conditionalCreate(3, ChangeAttendanceShiftComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, ChangeAttendanceShiftComponent_Conditional_4_Template, 82, 32, "form", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("attendance.change_shift_title"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() && !ctx.loading() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.attendanceRecord() ? 4 : -1);
  }
}, "ChangeAttendanceShiftComponent_Template"), dependencies: [
  FormsModule,
  \u0275NgNoValidate,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DefaultValueAccessor,
  SelectControlValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  FormGroupDirective,
  FormControlName,
  PageHeaderComponent,
  FormSectionComponent
], styles: ["\n\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n}\n.avatar-initial[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 1rem;\n  font-weight: 600;\n}\n.alert-info[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--bs-info);\n}\n.card.bg-light[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n}\n.card.bg-light[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n}\n.alert-warning[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--bs-warning);\n}\n.form-control[_ngcontent-%COMP%]:invalid {\n  border-color: var(--bs-danger);\n}\n.form-control[_ngcontent-%COMP%]:valid {\n  border-color: var(--bs-success);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n@media (max-width: 768px) {\n  .avatar-sm[_ngcontent-%COMP%] {\n    width: 2rem;\n    height: 2rem;\n  }\n  .avatar-initial[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .alert-info[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .alert-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n}\n/*# sourceMappingURL=change-attendance-shift.component.css.map */"] }));
var ChangeAttendanceShiftComponent = _ChangeAttendanceShiftComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangeAttendanceShiftComponent, [{
    type: Component,
    args: [{ selector: "app-change-attendance-shift", standalone: true, imports: [
      FormsModule,
      ReactiveFormsModule,
      PageHeaderComponent,
      FormSectionComponent
    ], template: `<div class="app-form-page">\r
  <!-- Standardized Page Header -->\r
  <app-page-header\r
    [title]="i18n.t('attendance.change_shift_title')">\r
  </app-page-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <div class="spinner-border text-primary" role="status">\r
        <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>\r
      </div>\r
      <p class="mt-3 text-muted">{{ i18n.t('attendance.loading_details') }}</p>\r
    </div>\r
  }\r
\r
  <!-- Error State -->\r
  @if (error() && !loading()) {\r
    <div class="alert alert-danger">\r
      <i class="fas fa-exclamation-triangle me-2"></i>\r
      {{ error() }}\r
    </div>\r
  }\r
\r
  <!-- Main Form Content -->\r
  @if (!loading() && attendanceRecord()) {\r
    <form [formGroup]="changeShiftForm" (ngSubmit)="onSubmit()">\r
      <div class="app-desktop-sidebar">\r
        <!-- Main Form Content -->\r
        <div class="app-main-content">\r
          <!-- Employee and Date Information Section -->\r
          <app-form-section [title]="i18n.t('attendance.employee_and_date')">\r
            <div class="alert alert-info">\r
              <div class="d-flex align-items-center">\r
                <div class="avatar-sm me-3">\r
                  <div class="avatar-initial bg-primary text-white rounded-circle">\r
                    {{ getEmployeeInitials() }}\r
                  </div>\r
                </div>\r
                <div>\r
                  <h6 class="mb-1">{{ attendanceRecord()!.employeeName }}</h6>\r
                  <small class="text-muted">\r
                    {{ attendanceRecord()!.employeeNumber }} \u2022\r
                    {{ formatDate(attendanceRecord()!.attendanceDate) }}\r
                  </small>\r
                </div>\r
              </div>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Current Shift Section -->\r
          <app-form-section [title]="i18n.t('attendance.current_shift')">\r
            <div class="card bg-light">\r
              <div class="card-body py-3">\r
                <div class="d-flex justify-content-between align-items-center">\r
                  <div>\r
                    <strong>{{ getCurrentShiftName() }}</strong>\r
                    <div class="small text-muted mt-1">\r
                      {{ getCurrentShiftTime() }}\r
                    </div>\r
                  </div>\r
                  <span class="badge bg-light text-dark border">{{ i18n.t('common.current') }}</span>\r
                </div>\r
              </div>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Shift Change Form Section -->\r
          <app-form-section [title]="i18n.t('attendance.new_shift_assignment')">\r
            <!-- Global error message -->\r
            @if (error()) {\r
              <div class="alert alert-danger mb-3">\r
                <i class="fas fa-exclamation-triangle me-2"></i>\r
                {{ error() }}\r
              </div>\r
            }\r
\r
            <div class="row">\r
              <!-- New shift selection -->\r
              <div class="col-md-6 mb-3">\r
                <label for="shiftId" class="form-label">\r
                  {{ i18n.t('fields.newShift') }} <span class="text-danger">*</span>\r
                </label>\r
                <select\r
                  id="shiftId"\r
                  formControlName="shiftId"\r
                  class="form-select"\r
                  [class.is-invalid]="isFieldInvalid('shiftId')">\r
                  <option value="">{{ i18n.t('attendance.placeholders.select_shift') }}</option>\r
                  @for (shift of availableShifts(); track shift.id) {\r
                    <option [value]="shift.id">\r
                      {{ shift.name }} ({{ getShiftTimeDisplay(shift) }})\r
                    </option>\r
                  }\r
                </select>\r
                @if (hasError('shiftId')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('shiftId') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Notes -->\r
              <div class="col-12 mb-3">\r
                <label for="notes" class="form-label">\r
                  {{ i18n.t('fields.notes') }}\r
                </label>\r
                <textarea\r
                  id="notes"\r
                  formControlName="notes"\r
                  class="form-control"\r
                  rows="4"\r
                  [placeholder]="i18n.t('attendance.placeholders.shift_change_notes')">\r
                </textarea>\r
              </div>\r
            </div>\r
\r
            <!-- Warning message -->\r
            <div class="alert alert-warning mt-3">\r
              <i class="fas fa-info-circle me-2"></i>\r
              {{ i18n.t('attendance.shift_change_warning') }}\r
            </div>\r
          </app-form-section>\r
        </div>\r
\r
        <!-- Sidebar Actions -->\r
        <div class="app-sidebar-content">\r
          <!-- Form Actions Card -->\r
          <div class="card mb-3">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">\r
                <i class="fas fa-cogs me-2"></i>\r
                {{ i18n.t('common.actions') }}\r
              </h6>\r
            </div>\r
            <div class="card-body">\r
              <div class="d-grid gap-2">\r
                <!-- Save Button -->\r
                <button\r
                  type="submit"\r
                  class="btn btn-primary"\r
                  [disabled]="changeShiftForm.invalid || saving()">\r
                  @if (saving()) {\r
                    <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    {{ i18n.t('attendance.changing_shift') }}\r
                  } @else {\r
                    <i class="fas fa-clock me-2"></i>\r
                    {{ i18n.t('attendance.change_shift') }}\r
                  }\r
                </button>\r
\r
                <!-- Reset Button -->\r
                <button\r
                  type="button"\r
                  class="btn btn-outline-secondary"\r
                  (click)="onReset()"\r
                  [disabled]="saving()">\r
                  <i class="fas fa-undo me-2"></i>\r
                  {{ i18n.t('common.reset') }}\r
                </button>\r
\r
                <!-- Cancel Button -->\r
                <button\r
                  type="button"\r
                  class="btn btn-outline-danger"\r
                  (click)="onCancel()"\r
                  [disabled]="saving()">\r
                  <i class="fas fa-times me-2"></i>\r
                  {{ i18n.t('common.cancel') }}\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Help Card -->\r
          <div class="card">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">\r
                <i class="fas fa-info-circle me-2"></i>\r
                {{ i18n.t('common.help') }}\r
              </h6>\r
            </div>\r
            <div class="card-body">\r
              <p class="card-text small text-muted mb-2">\r
                {{ i18n.t('attendance.help.shift_change_instructions') }}\r
              </p>\r
              <ul class="list-unstyled small text-muted mb-0">\r
                <li class="mb-1">\r
                  <i class="fas fa-check-circle text-success me-1"></i>\r
                  {{ i18n.t('attendance.help.select_new_shift') }}\r
                </li>\r
                <li class="mb-1">\r
                  <i class="fas fa-calculator text-info me-1"></i>\r
                  {{ i18n.t('attendance.help.recalculation_note') }}\r
                </li>\r
                <li>\r
                  <i class="fas fa-sticky-note text-warning me-1"></i>\r
                  {{ i18n.t('attendance.help.optional_notes') }}\r
                </li>\r
              </ul>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </form>\r
  }\r
</div>`, styles: ["/* src/app/pages/attendance/change-attendance-shift/change-attendance-shift.component.css */\n.avatar-sm {\n  width: 2.5rem;\n  height: 2.5rem;\n}\n.avatar-initial {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 1rem;\n  font-weight: 600;\n}\n.alert-info {\n  border-left: 4px solid var(--bs-info);\n}\n.card.bg-light {\n  border: 1px solid #e9ecef;\n}\n.card.bg-light .card-body {\n  background-color: #f8f9fa;\n}\n.alert-warning {\n  border-left: 4px solid var(--bs-warning);\n}\n.form-control:invalid {\n  border-color: var(--bs-danger);\n}\n.form-control:valid {\n  border-color: var(--bs-success);\n}\n.btn-primary {\n  min-width: 120px;\n}\n@media (max-width: 768px) {\n  .avatar-sm {\n    width: 2rem;\n    height: 2rem;\n  }\n  .avatar-initial {\n    font-size: 0.875rem;\n  }\n  .alert-info h6 {\n    font-size: 1rem;\n  }\n  .alert-info small {\n    font-size: 0.8rem;\n  }\n}\n/*# sourceMappingURL=change-attendance-shift.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangeAttendanceShiftComponent, { className: "ChangeAttendanceShiftComponent", filePath: "src/app/pages/attendance/change-attendance-shift/change-attendance-shift.component.ts", lineNumber: 27 });
})();
export {
  ChangeAttendanceShiftComponent
};
//# sourceMappingURL=chunk-XUGGFCLQ.js.map
