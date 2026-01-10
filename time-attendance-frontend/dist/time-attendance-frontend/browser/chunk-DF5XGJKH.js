import {
  ShiftsService
} from "./chunk-VQOTGROE.js";
import {
  FormSectionComponent
} from "./chunk-JTLHOQFH.js";
import {
  EmployeesService
} from "./chunk-5B6AVE4S.js";
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

// src/app/pages/employees/change-employee-shift/change-employee-shift.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function ChangeEmployeeShiftComponent_Conditional_2_Template(rf, ctx) {
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
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.loading_details"));
  }
}
__name(ChangeEmployeeShiftComponent_Conditional_2_Template, "ChangeEmployeeShiftComponent_Conditional_2_Template");
function ChangeEmployeeShiftComponent_Conditional_3_Template(rf, ctx) {
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
__name(ChangeEmployeeShiftComponent_Conditional_3_Template, "ChangeEmployeeShiftComponent_Conditional_3_Template");
function ChangeEmployeeShiftComponent_Conditional_4_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-form-section", 1)(1, "div", 52)(2, "div", 53)(3, "div", 54)(4, "div")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 55);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 56);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("employees.current_shift"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.employee().currentShiftName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getCurrentShiftDisplay(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.current"));
  }
}
__name(ChangeEmployeeShiftComponent_Conditional_4_Conditional_14_Template, "ChangeEmployeeShiftComponent_Conditional_4_Conditional_14_Template");
function ChangeEmployeeShiftComponent_Conditional_4_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
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
__name(ChangeEmployeeShiftComponent_Conditional_4_Conditional_16_Template, "ChangeEmployeeShiftComponent_Conditional_4_Conditional_16_Template");
function ChangeEmployeeShiftComponent_Conditional_4_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
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
__name(ChangeEmployeeShiftComponent_Conditional_4_For_27_Template, "ChangeEmployeeShiftComponent_Conditional_4_For_27_Template");
function ChangeEmployeeShiftComponent_Conditional_4_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("shiftId"), " ");
  }
}
__name(ChangeEmployeeShiftComponent_Conditional_4_Conditional_28_Template, "ChangeEmployeeShiftComponent_Conditional_4_Conditional_28_Template");
function ChangeEmployeeShiftComponent_Conditional_4_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("effectiveDate"), " ");
  }
}
__name(ChangeEmployeeShiftComponent_Conditional_4_Conditional_35_Template, "ChangeEmployeeShiftComponent_Conditional_4_Conditional_35_Template");
function ChangeEmployeeShiftComponent_Conditional_4_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 57);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.changing_shift"), " ");
  }
}
__name(ChangeEmployeeShiftComponent_Conditional_4_Conditional_52_Template, "ChangeEmployeeShiftComponent_Conditional_4_Conditional_52_Template");
function ChangeEmployeeShiftComponent_Conditional_4_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 58);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.change_shift"), " ");
  }
}
__name(ChangeEmployeeShiftComponent_Conditional_4_Conditional_53_Template, "ChangeEmployeeShiftComponent_Conditional_4_Conditional_53_Template");
function ChangeEmployeeShiftComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 9);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function ChangeEmployeeShiftComponent_Conditional_4_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "ChangeEmployeeShiftComponent_Conditional_4_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "div", 10)(2, "div", 11)(3, "app-form-section", 1)(4, "div", 12)(5, "div", 13)(6, "div", 14)(7, "div", 15);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "h6", 16);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 17);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(14, ChangeEmployeeShiftComponent_Conditional_4_Conditional_14_Template, 11, 4, "app-form-section", 1);
    \u0275\u0275elementStart(15, "app-form-section", 1);
    \u0275\u0275conditionalCreate(16, ChangeEmployeeShiftComponent_Conditional_4_Conditional_16_Template, 3, 1, "div", 18);
    \u0275\u0275elementStart(17, "div", 19)(18, "div", 20)(19, "label", 21);
    \u0275\u0275text(20);
    \u0275\u0275elementStart(21, "span", 22);
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "select", 23)(24, "option", 24);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(26, ChangeEmployeeShiftComponent_Conditional_4_For_27_Template, 2, 3, "option", 25, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, ChangeEmployeeShiftComponent_Conditional_4_Conditional_28_Template, 2, 1, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 20)(30, "label", 27);
    \u0275\u0275text(31);
    \u0275\u0275elementStart(32, "span", 22);
    \u0275\u0275text(33, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(34, "input", 28);
    \u0275\u0275conditionalCreate(35, ChangeEmployeeShiftComponent_Conditional_4_Conditional_35_Template, 2, 1, "div", 26);
    \u0275\u0275elementStart(36, "div", 29);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 30)(39, "label", 31);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "textarea", 32);
    \u0275\u0275text(42, "                ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(43, "div", 33)(44, "div", 34)(45, "div", 35)(46, "h6", 36);
    \u0275\u0275element(47, "i", 37);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 38)(50, "div", 39)(51, "button", 40);
    \u0275\u0275conditionalCreate(52, ChangeEmployeeShiftComponent_Conditional_4_Conditional_52_Template, 2, 1)(53, ChangeEmployeeShiftComponent_Conditional_4_Conditional_53_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "button", 41);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ChangeEmployeeShiftComponent_Conditional_4_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onReset());
    }, "ChangeEmployeeShiftComponent_Conditional_4_Template_button_click_54_listener"));
    \u0275\u0275element(55, "i", 42);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "button", 43);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ChangeEmployeeShiftComponent_Conditional_4_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "ChangeEmployeeShiftComponent_Conditional_4_Template_button_click_57_listener"));
    \u0275\u0275element(58, "i", 44);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(60, "div", 45)(61, "div", 35)(62, "h6", 36);
    \u0275\u0275element(63, "i", 46);
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 38)(66, "p", 47);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "ul", 48)(69, "li", 16);
    \u0275\u0275element(70, "i", 49);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "li", 16);
    \u0275\u0275element(73, "i", 50);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "li");
    \u0275\u0275element(76, "i", 51);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.changeShiftForm);
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r0.i18n.t("employees.employee_information"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getEmployeeInitials(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.employee().firstName, " ", ctx_r0.employee().lastName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.employee().departmentName, " - ", ctx_r0.employee().branchName);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.employee().currentShiftId ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("employees.new_shift_assignment"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.error() ? 16 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.newShift"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("shiftId"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.placeholders.select_shift"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableShifts());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasError("shiftId") ? 28 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.effectiveDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("effectiveDate"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("effectiveDate") ? 35 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.help.shift_advance_planning"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.notes"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.placeholders.shift_change_notes"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.changeShiftForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 52 : 53);
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
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.help.shift_change_instructions"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.help.select_new_shift"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.help.future_date_required"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.help.optional_notes"), " ");
  }
}
__name(ChangeEmployeeShiftComponent_Conditional_4_Template, "ChangeEmployeeShiftComponent_Conditional_4_Template");
var _ChangeEmployeeShiftComponent = class _ChangeEmployeeShiftComponent {
  i18n = inject(I18nService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  employeesService = inject(EmployeesService);
  shiftsService = inject(ShiftsService);
  notificationService = inject(NotificationService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  employee = signal(null, ...ngDevMode ? [{ debugName: "employee" }] : []);
  availableShifts = signal([], ...ngDevMode ? [{ debugName: "availableShifts" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  changeShiftForm;
  constructor() {
    const tomorrow = /* @__PURE__ */ new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.changeShiftForm = this.fb.group({
      shiftId: ["", Validators.required],
      effectiveDate: [tomorrow.toISOString().split("T")[0], this.futureDateValidator()],
      notes: [""]
    });
  }
  ngOnInit() {
    this.loadEmployeeDetails();
  }
  loadEmployeeDetails() {
    const employeeId = this.route.snapshot.paramMap.get("employeeId");
    if (!employeeId) {
      this.router.navigate(["/employees"]);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.employeesService.getEmployeeById(+employeeId).subscribe({
      next: /* @__PURE__ */ __name((employee) => {
        this.employee.set(employee);
        this.loadShifts();
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load employee details:", error);
        this.error.set(this.i18n.t("employees.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  loadShifts() {
    this.shiftsService.getActiveShifts().subscribe({
      next: /* @__PURE__ */ __name((response) => {
        let shifts = response.items;
        const currentEmployee = this.employee();
        if (currentEmployee?.currentShiftId) {
          shifts = shifts.filter((shift) => shift.id !== currentEmployee.currentShiftId);
        }
        this.availableShifts.set(shifts);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load shifts:", error);
        this.notificationService.error(this.i18n.t("shifts.errors.load_failed"));
      }, "error")
    });
  }
  futureDateValidator() {
    return (control) => {
      if (!control.value)
        return null;
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(control.value);
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate > today ? null : { futureDate: true };
    };
  }
  onSubmit() {
    if (this.changeShiftForm.invalid || !this.employee()) {
      this.changeShiftForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set(null);
    const formValue = this.changeShiftForm.value;
    const currentEmployee = this.employee();
    const shiftData = {
      employeeId: currentEmployee.id,
      shiftId: +formValue.shiftId,
      effectiveDate: formValue.effectiveDate,
      notes: formValue.notes || void 0
    };
    this.employeesService.changeEmployeeShift(shiftData).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notificationService.success(this.i18n.t("employees.success.shift_changed"));
        this.router.navigate(["/employees"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to change employee shift:", error);
        this.error.set(this.i18n.t("employees.errors.shift_change_failed"));
        this.saving.set(false);
      }, "error")
    });
  }
  onReset() {
    const tomorrow = /* @__PURE__ */ new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.changeShiftForm.reset({
      shiftId: "",
      effectiveDate: tomorrow.toISOString().split("T")[0],
      notes: ""
    });
    this.error.set(null);
  }
  onCancel() {
    this.router.navigate(["/employees"]);
  }
  // Helper methods
  getEmployeeInitials() {
    const emp = this.employee();
    if (!emp)
      return "";
    const first = emp.firstName ? emp.firstName.charAt(0).toUpperCase() : "";
    const last = emp.lastName ? emp.lastName.charAt(0).toUpperCase() : "";
    return first + last;
  }
  getCurrentShiftDisplay() {
    const emp = this.employee();
    if (!emp?.currentShiftName) {
      return this.i18n.t("employees.no_current_shift");
    }
    if (emp.currentShift?.startTime && emp.currentShift?.endTime) {
      return `${emp.currentShift.startTime} - ${emp.currentShift.endTime}`;
    }
    return emp.currentShiftName;
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
    if (field.errors["futureDate"]) {
      return this.i18n.t("employees.validation.future_date_required");
    }
    return "";
  }
};
__name(_ChangeEmployeeShiftComponent, "ChangeEmployeeShiftComponent");
__publicField(_ChangeEmployeeShiftComponent, "\u0275fac", /* @__PURE__ */ __name(function ChangeEmployeeShiftComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ChangeEmployeeShiftComponent)();
}, "ChangeEmployeeShiftComponent_Factory"));
__publicField(_ChangeEmployeeShiftComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangeEmployeeShiftComponent, selectors: [["app-change-employee-shift"]], decls: 5, vars: 4, consts: [[1, "app-form-page"], [3, "title"], [1, "text-center", "py-5"], [1, "alert", "alert-danger"], [3, "formGroup"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-3", "text-muted"], [1, "fas", "fa-exclamation-triangle", "me-2"], [3, "ngSubmit", "formGroup"], [1, "app-desktop-sidebar"], [1, "app-main-content"], [1, "alert", "alert-info"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-3"], [1, "avatar-initial", "bg-primary", "text-white", "rounded-circle"], [1, "mb-1"], [1, "text-muted"], [1, "alert", "alert-danger", "mb-3"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "shiftId", 1, "form-label"], [1, "text-danger"], ["id", "shiftId", "formControlName", "shiftId", 1, "form-select"], ["value", ""], [3, "value"], [1, "invalid-feedback"], ["for", "effectiveDate", 1, "form-label"], ["type", "date", "id", "effectiveDate", "formControlName", "effectiveDate", 1, "form-control"], [1, "form-text"], [1, "col-12", "mb-3"], ["for", "notes", 1, "form-label"], ["id", "notes", "formControlName", "notes", "rows", "4", 1, "form-control", 3, "placeholder"], [1, "app-sidebar-content"], [1, "card", "mb-3"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-cogs", "me-2"], [1, "card-body"], [1, "d-grid", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fas", "fa-undo", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], [1, "card"], [1, "fas", "fa-info-circle", "me-2"], [1, "card-text", "small", "text-muted", "mb-2"], [1, "list-unstyled", "small", "text-muted", "mb-0"], [1, "fas", "fa-check-circle", "text-success", "me-1"], [1, "fas", "fa-calendar", "text-info", "me-1"], [1, "fas", "fa-sticky-note", "text-warning", "me-1"], [1, "card", "bg-light"], [1, "card-body", "py-3"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "small", "text-muted", "mt-1"], [1, "badge", "bg-primary"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-clock", "me-2"]], template: /* @__PURE__ */ __name(function ChangeEmployeeShiftComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275conditionalCreate(2, ChangeEmployeeShiftComponent_Conditional_2_Template, 6, 2, "div", 2);
    \u0275\u0275conditionalCreate(3, ChangeEmployeeShiftComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, ChangeEmployeeShiftComponent_Conditional_4_Template, 78, 34, "form", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("employees.change_shift"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() && !ctx.loading() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.employee() ? 4 : -1);
  }
}, "ChangeEmployeeShiftComponent_Template"), dependencies: [
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
], styles: ["\n\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n}\n.avatar-initial[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 1rem;\n  font-weight: 600;\n}\n.alert-info[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--bs-info);\n}\n.card.bg-light[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n}\n.card.bg-light[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n}\n.form-control[_ngcontent-%COMP%]:invalid {\n  border-color: var(--bs-danger);\n}\n.form-control[_ngcontent-%COMP%]:valid {\n  border-color: var(--bs-success);\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6c757d;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n@media (max-width: 768px) {\n  .avatar-sm[_ngcontent-%COMP%] {\n    width: 2rem;\n    height: 2rem;\n  }\n  .avatar-initial[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .alert-info[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .alert-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n}\n/*# sourceMappingURL=change-employee-shift.component.css.map */"] }));
var ChangeEmployeeShiftComponent = _ChangeEmployeeShiftComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangeEmployeeShiftComponent, [{
    type: Component,
    args: [{ selector: "app-change-employee-shift", standalone: true, imports: [
      FormsModule,
      ReactiveFormsModule,
      PageHeaderComponent,
      FormSectionComponent
    ], template: `<div class="app-form-page">\r
  <!-- Standardized Page Header -->\r
  <app-page-header\r
    [title]="i18n.t('employees.change_shift')">\r
  </app-page-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <div class="spinner-border text-primary" role="status">\r
        <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>\r
      </div>\r
      <p class="mt-3 text-muted">{{ i18n.t('employees.loading_details') }}</p>\r
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
  @if (!loading() && employee()) {\r
    <form [formGroup]="changeShiftForm" (ngSubmit)="onSubmit()">\r
      <div class="app-desktop-sidebar">\r
        <!-- Main Form Content -->\r
        <div class="app-main-content">\r
          <!-- Employee Information Section -->\r
          <app-form-section [title]="i18n.t('employees.employee_information')">\r
            <div class="alert alert-info">\r
              <div class="d-flex align-items-center">\r
                <div class="avatar-sm me-3">\r
                  <div class="avatar-initial bg-primary text-white rounded-circle">\r
                    {{ getEmployeeInitials() }}\r
                  </div>\r
                </div>\r
                <div>\r
                  <h6 class="mb-1">{{ employee()!.firstName }} {{ employee()!.lastName }}</h6>\r
                  <small class="text-muted">{{ employee()!.departmentName }} - {{ employee()!.branchName }}</small>\r
                </div>\r
              </div>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Current Shift Section -->\r
          @if (employee()!.currentShiftId) {\r
            <app-form-section [title]="i18n.t('employees.current_shift')">\r
              <div class="card bg-light">\r
                <div class="card-body py-3">\r
                  <div class="d-flex justify-content-between align-items-center">\r
                    <div>\r
                      <strong>{{ employee()!.currentShiftName }}</strong>\r
                      <div class="small text-muted mt-1">\r
                        {{ getCurrentShiftDisplay() }}\r
                      </div>\r
                    </div>\r
                    <span class="badge bg-primary">{{ i18n.t('common.current') }}</span>\r
                  </div>\r
                </div>\r
              </div>\r
            </app-form-section>\r
          }\r
\r
          <!-- Shift Change Form Section -->\r
          <app-form-section [title]="i18n.t('employees.new_shift_assignment')">\r
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
                  <option value="">{{ i18n.t('employees.placeholders.select_shift') }}</option>\r
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
              <!-- Effective date -->\r
              <div class="col-md-6 mb-3">\r
                <label for="effectiveDate" class="form-label">\r
                  {{ i18n.t('fields.effectiveDate') }} <span class="text-danger">*</span>\r
                </label>\r
                <input\r
                  type="date"\r
                  id="effectiveDate"\r
                  formControlName="effectiveDate"\r
                  class="form-control"\r
                  [class.is-invalid]="isFieldInvalid('effectiveDate')">\r
                @if (hasError('effectiveDate')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('effectiveDate') }}\r
                  </div>\r
                }\r
                <div class="form-text">{{ i18n.t('employees.help.shift_advance_planning') }}</div>\r
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
                  [placeholder]="i18n.t('employees.placeholders.shift_change_notes')">\r
                </textarea>\r
              </div>\r
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
                    {{ i18n.t('employees.changing_shift') }}\r
                  } @else {\r
                    <i class="fas fa-clock me-2"></i>\r
                    {{ i18n.t('employees.change_shift') }}\r
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
                {{ i18n.t('employees.help.shift_change_instructions') }}\r
              </p>\r
              <ul class="list-unstyled small text-muted mb-0">\r
                <li class="mb-1">\r
                  <i class="fas fa-check-circle text-success me-1"></i>\r
                  {{ i18n.t('employees.help.select_new_shift') }}\r
                </li>\r
                <li class="mb-1">\r
                  <i class="fas fa-calendar text-info me-1"></i>\r
                  {{ i18n.t('employees.help.future_date_required') }}\r
                </li>\r
                <li>\r
                  <i class="fas fa-sticky-note text-warning me-1"></i>\r
                  {{ i18n.t('employees.help.optional_notes') }}\r
                </li>\r
              </ul>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </form>\r
  }\r
</div>`, styles: ["/* src/app/pages/employees/change-employee-shift/change-employee-shift.component.css */\n.avatar-sm {\n  width: 2.5rem;\n  height: 2.5rem;\n}\n.avatar-initial {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 1rem;\n  font-weight: 600;\n}\n.alert-info {\n  border-left: 4px solid var(--bs-info);\n}\n.card.bg-light {\n  border: 1px solid #e9ecef;\n}\n.card.bg-light .card-body {\n  background-color: #f8f9fa;\n}\n.form-control:invalid {\n  border-color: var(--bs-danger);\n}\n.form-control:valid {\n  border-color: var(--bs-success);\n}\n.form-text {\n  font-size: 0.875rem;\n  color: #6c757d;\n}\n.btn-primary {\n  min-width: 120px;\n}\n@media (max-width: 768px) {\n  .avatar-sm {\n    width: 2rem;\n    height: 2rem;\n  }\n  .avatar-initial {\n    font-size: 0.875rem;\n  }\n  .alert-info h6 {\n    font-size: 1rem;\n  }\n  .alert-info small {\n    font-size: 0.8rem;\n  }\n}\n/*# sourceMappingURL=change-employee-shift.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangeEmployeeShiftComponent, { className: "ChangeEmployeeShiftComponent", filePath: "src/app/pages/employees/change-employee-shift/change-employee-shift.component.ts", lineNumber: 26 });
})();
export {
  ChangeEmployeeShiftComponent
};
//# sourceMappingURL=chunk-DF5XGJKH.js.map
