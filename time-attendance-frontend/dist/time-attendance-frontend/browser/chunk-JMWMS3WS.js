import {
  EmployeeVacationsService
} from "./chunk-ICYSGLN7.js";
import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  SearchableSelectComponent
} from "./chunk-YVOT2QSR.js";
import {
  LoadingSpinnerComponent
} from "./chunk-WJCQS5EA.js";
import "./chunk-DKGIYIS4.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  Router,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/employee-vacations/create-employee-vacation/create-employee-vacation.component.ts
function CreateEmployeeVacationComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("employee_vacations.loading_data"))("variant", "primary")("centered", true);
  }
}
__name(CreateEmployeeVacationComponent_Conditional_2_Template, "CreateEmployeeVacationComponent_Conditional_2_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("employeeId"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_24_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_24_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("vacationTypeId"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_31_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_31_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("startDate"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_39_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_39_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("endDate"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_46_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_46_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 38);
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_61_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_61_Template");
function CreateEmployeeVacationComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 5)(2, "form", 6);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_form_ngSubmit_2_listener"));
    \u0275\u0275elementStart(3, "div", 7)(4, "div", 8)(5, "h5", 9)(6, "div", 10)(7, "div", 11)(8, "div", 12);
    \u0275\u0275element(9, "i", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "div", 14)(13, "div", 15)(14, "h6", 16);
    \u0275\u0275element(15, "i", 17);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 3)(18, "div", 18)(19, "label", 19);
    \u0275\u0275text(20);
    \u0275\u0275elementStart(21, "span", 20);
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "app-searchable-select", 21);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_app_searchable_select_selectionChange_23_listener($event) {
      let tmp_2_0;
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((tmp_2_0 = ctx_r0.vacationForm.get("employeeId")) == null ? null : tmp_2_0.setValue($event));
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_app_searchable_select_selectionChange_23_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, CreateEmployeeVacationComponent_Conditional_3_Conditional_24_Template, 2, 1, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 18)(26, "label", 23);
    \u0275\u0275text(27);
    \u0275\u0275elementStart(28, "span", 20);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "app-searchable-select", 21);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_app_searchable_select_selectionChange_30_listener($event) {
      let tmp_2_0;
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((tmp_2_0 = ctx_r0.vacationForm.get("vacationTypeId")) == null ? null : tmp_2_0.setValue($event));
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_app_searchable_select_selectionChange_30_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(31, CreateEmployeeVacationComponent_Conditional_3_Conditional_31_Template, 2, 1, "div", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 3)(33, "div", 18)(34, "label", 24);
    \u0275\u0275text(35);
    \u0275\u0275elementStart(36, "span", 20);
    \u0275\u0275text(37, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(38, "input", 25);
    \u0275\u0275conditionalCreate(39, CreateEmployeeVacationComponent_Conditional_3_Conditional_39_Template, 2, 1, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 18)(41, "label", 27);
    \u0275\u0275text(42);
    \u0275\u0275elementStart(43, "span", 20);
    \u0275\u0275text(44, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(45, "input", 28);
    \u0275\u0275conditionalCreate(46, CreateEmployeeVacationComponent_Conditional_3_Conditional_46_Template, 2, 1, "div", 26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 15)(48, "h6", 29);
    \u0275\u0275element(49, "i", 30);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 31)(52, "label", 32);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275element(54, "textarea", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 34)(56, "button", 35);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_button_click_56_listener"));
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 36);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onReset());
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_button_click_58_listener"));
    \u0275\u0275text(59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "button", 37);
    \u0275\u0275conditionalCreate(61, CreateEmployeeVacationComponent_Conditional_3_Conditional_61_Template, 1, 0, "span", 38);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(63, "div", 39)(64, "div", 7)(65, "div", 8)(66, "h6", 9);
    \u0275\u0275element(67, "i", 40);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "div", 14)(70, "p", 41);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "ul", 42)(73, "li");
    \u0275\u0275text(74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "li");
    \u0275\u0275text(76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "li");
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "li");
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    let tmp_13_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.vacationForm);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.vacation_information"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.required_information"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.employee"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.employeeOptions)("placeholder", ctx_r0.i18n.t("common.select_employee"))("value", (tmp_7_0 = ctx_r0.vacationForm.get("employeeId")) == null ? null : tmp_7_0.value)("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("employeeId") ? 24 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.vacationType"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.vacationTypeOptions)("placeholder", ctx_r0.i18n.t("common.select_vacation_type"))("value", (tmp_13_0 = ctx_r0.vacationForm.get("vacationTypeId")) == null ? null : tmp_13_0.value)("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("vacationTypeId") ? 31 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.startDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("startDate"));
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("startDate") ? 39 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.endDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("endDate"));
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("endDate") ? 46 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.additional_information"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.notes"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employee_vacations.notes_placeholder"))("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.reset"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.vacationForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 61 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.create_vacation"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.help_title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_text"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_select_employee"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_select_type"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_date_range"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_notes_optional"));
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Template, "CreateEmployeeVacationComponent_Conditional_3_Template");
var _CreateEmployeeVacationComponent = class _CreateEmployeeVacationComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  notificationService = inject(NotificationService);
  employeeVacationsService = inject(EmployeeVacationsService);
  i18n = inject(I18nService);
  // State
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  // Form
  vacationForm;
  // Available options
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : []);
  vacationTypes = signal([], ...ngDevMode ? [{ debugName: "vacationTypes" }] : []);
  // Computed properties for searchable select options
  get employeeOptions() {
    return this.employees().map((employee) => ({
      value: employee.id,
      label: employee.name
    }));
  }
  get vacationTypeOptions() {
    return this.vacationTypes().map((vacationType) => ({
      value: vacationType.id,
      label: vacationType.name
    }));
  }
  constructor() {
    this.vacationForm = this.createForm();
  }
  ngOnInit() {
    this.loadEmployees();
    this.loadVacationTypes();
  }
  /**
   * Create reactive form
   */
  createForm() {
    return this.fb.group({
      employeeId: [null, [Validators.required]],
      vacationTypeId: [null, [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      notes: [""]
    });
  }
  /**
   * Load employees for dropdown
   */
  loadEmployees() {
    this.loading.set(true);
    this.employeeVacationsService.getEmployees().subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.employees.set(employees);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load employees:", error);
        this.notificationService.error(this.i18n.t("employee_vacations.errors.load_employees_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  /**
   * Load vacation types for dropdown
   */
  loadVacationTypes() {
    this.employeeVacationsService.getVacationTypes().subscribe({
      next: /* @__PURE__ */ __name((vacationTypes) => {
        this.vacationTypes.set(vacationTypes);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load vacation types:", error);
        this.notificationService.error(this.i18n.t("employee_vacations.errors.load_vacation_types_failed"));
      }, "error")
    });
  }
  /**
   * Handle form submission
   */
  onSubmit() {
    if (this.vacationForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    this.saving.set(true);
    const formValue = this.vacationForm.value;
    const request = {
      employeeId: formValue.employeeId,
      vacationTypeId: formValue.vacationTypeId,
      startDate: new Date(formValue.startDate),
      endDate: new Date(formValue.endDate),
      notes: formValue.notes || void 0
    };
    this.employeeVacationsService.createVacation(request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t("employee_vacations.success.created"));
        this.router.navigate(["/employee-vacations"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.saving.set(false);
        console.error("Failed to create vacation:", error);
        this.notificationService.error(this.i18n.t("employee_vacations.errors.create_failed"));
      }, "error")
    });
  }
  /**
   * Cancel and navigate back
   */
  onCancel() {
    this.router.navigate(["/employee-vacations"]);
  }
  /**
   * Reset form
   */
  onReset() {
    this.vacationForm.reset();
  }
  /**
   * Mark all form fields as touched
   */
  markFormGroupTouched() {
    Object.keys(this.vacationForm.controls).forEach((key) => {
      const control = this.vacationForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
  /**
   * Check if form field has error
   */
  hasError(fieldName) {
    const field = this.vacationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  /**
   * Get error message for field
   */
  getErrorMessage(fieldName) {
    const field = this.vacationForm.get(fieldName);
    if (!field || !field.errors)
      return "";
    if (field.errors["required"]) {
      return this.i18n.t("validation.required");
    }
    return "";
  }
  /**
   * Check if field is invalid for styling
   */
  isFieldInvalid(fieldName) {
    return this.hasError(fieldName);
  }
  /**
   * Get form mode for FormHeaderComponent
   */
  getFormMode() {
    return "create";
  }
  /**
   * Get vacation ID for FormHeaderComponent
   */
  getVacationId() {
    return void 0;
  }
};
__name(_CreateEmployeeVacationComponent, "CreateEmployeeVacationComponent");
__publicField(_CreateEmployeeVacationComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateEmployeeVacationComponent)();
}, "CreateEmployeeVacationComponent_Factory"));
__publicField(_CreateEmployeeVacationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateEmployeeVacationComponent, selectors: [["app-create-employee-vacation"]], decls: 4, vars: 6, consts: [[1, "container-fluid"], ["moduleName", "employee-vacations", "moduleRoute", "employee-vacations", 3, "mode", "title", "entityId", "loading"], [1, "text-center", "py-5"], [1, "row"], [3, "message", "variant", "centered"], [1, "col-lg-8"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-3"], [1, "avatar-title", "bg-primary-subtle", "text-primary", "rounded-circle"], [1, "fas", "fa-calendar-alt"], [1, "card-body"], [1, "mb-4"], [1, "text-primary", "mb-3"], [1, "fa-solid", "fa-asterisk", "me-2"], [1, "col-md-6", "mb-3"], ["for", "employeeId", 1, "form-label"], [1, "text-danger"], [3, "selectionChange", "options", "placeholder", "value", "disabled"], [1, "invalid-feedback", "d-block"], ["for", "vacationTypeId", 1, "form-label"], ["for", "startDate", 1, "form-label"], ["type", "date", "id", "startDate", "formControlName", "startDate", 1, "form-control", 3, "disabled"], [1, "invalid-feedback"], ["for", "endDate", 1, "form-label"], ["type", "date", "id", "endDate", "formControlName", "endDate", 1, "form-control", 3, "disabled"], [1, "text-secondary", "mb-3"], [1, "fa-solid", "fa-list", "me-2"], [1, "mb-3"], ["for", "notes", 1, "form-label"], ["id", "notes", "rows", "3", "formControlName", "notes", 1, "form-control", 3, "placeholder", "disabled"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "col-lg-4"], [1, "fas", "fa-info-circle", "me-2"], [1, "small", "text-muted", "mb-2"], [1, "small", "text-muted", "mb-0"]], template: /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, CreateEmployeeVacationComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, CreateEmployeeVacationComponent_Conditional_3_Template, 81, 42, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("mode", ctx.getFormMode())("title", ctx.i18n.t("employee_vacations.create_vacation"))("entityId", ctx.getVacationId())("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() ? 3 : -1);
  }
}, "CreateEmployeeVacationComponent_Template"), dependencies: [
  CommonModule,
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  FormGroupDirective,
  FormControlName,
  SearchableSelectComponent,
  FormHeaderComponent,
  LoadingSpinnerComponent
], styles: ["\n\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control[_ngcontent-%COMP%]:disabled, \n.form-select[_ngcontent-%COMP%]:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.help-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 0.5rem;\n}\n@media (max-width: 768px) {\n  .d-flex.justify-content-end[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n  .btn[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 0;\n  }\n}\n/*# sourceMappingURL=create-employee-vacation.component.css.map */"] }));
var CreateEmployeeVacationComponent = _CreateEmployeeVacationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateEmployeeVacationComponent, [{
    type: Component,
    args: [{ selector: "app-create-employee-vacation", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SearchableSelectComponent,
      FormHeaderComponent,
      LoadingSpinnerComponent
    ], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <app-form-header\r
    [mode]="getFormMode()"\r
    [title]="i18n.t('employee_vacations.create_vacation')"\r
    moduleName="employee-vacations"\r
    moduleRoute="employee-vacations"\r
    [entityId]="getVacationId()"\r
    [loading]="loading()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('employee_vacations.loading_data')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Form Content -->\r
  @if (!loading()) {\r
    <div class="row">\r
      <!-- Main Content -->\r
      <div class="col-lg-8">\r
        <form [formGroup]="vacationForm" (ngSubmit)="onSubmit()" novalidate>\r
          <div class="card">\r
            <div class="card-header">\r
              <h5 class="card-title mb-0">\r
                <div class="d-flex align-items-center">\r
                  <div class="avatar-sm me-3">\r
                    <div class="avatar-title bg-primary-subtle text-primary rounded-circle">\r
                      <i class="fas fa-calendar-alt"></i>\r
                    </div>\r
                  </div>\r
                  <div>\r
                    {{ i18n.t('employee_vacations.vacation_information') }}\r
                  </div>\r
                </div>\r
              </h5>\r
            </div>\r
            <div class="card-body">\r
              <!-- Required Information Section -->\r
              <div class="mb-4">\r
                <h6 class="text-primary mb-3">\r
                  <i class="fa-solid fa-asterisk me-2"></i>\r
                  {{ i18n.t('employee_vacations.required_information') }}\r
                </h6>\r
                <div class="row">\r
                  <!-- Employee -->\r
                  <div class="col-md-6 mb-3">\r
                    <label for="employeeId" class="form-label">\r
                      {{ i18n.t('fields.employee') }} <span class="text-danger">*</span>\r
                    </label>\r
                    <app-searchable-select\r
                      [options]="employeeOptions"\r
                      [placeholder]="i18n.t('common.select_employee')"\r
                      [value]="vacationForm.get('employeeId')?.value"\r
                      [disabled]="saving()"\r
                      (selectionChange)="vacationForm.get('employeeId')?.setValue($event)"\r
                    ></app-searchable-select>\r
                    @if (hasError('employeeId')) {\r
                      <div class="invalid-feedback d-block">\r
                        {{ getErrorMessage('employeeId') }}\r
                      </div>\r
                    }\r
                  </div>\r
\r
                  <!-- Vacation Type -->\r
                  <div class="col-md-6 mb-3">\r
                    <label for="vacationTypeId" class="form-label">\r
                      {{ i18n.t('fields.vacationType') }} <span class="text-danger">*</span>\r
                    </label>\r
                    <app-searchable-select\r
                      [options]="vacationTypeOptions"\r
                      [placeholder]="i18n.t('common.select_vacation_type')"\r
                      [value]="vacationForm.get('vacationTypeId')?.value"\r
                      [disabled]="saving()"\r
                      (selectionChange)="vacationForm.get('vacationTypeId')?.setValue($event)"\r
                    ></app-searchable-select>\r
                    @if (hasError('vacationTypeId')) {\r
                      <div class="invalid-feedback d-block">\r
                        {{ getErrorMessage('vacationTypeId') }}\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
\r
                <div class="row">\r
                  <!-- Start Date -->\r
                  <div class="col-md-6 mb-3">\r
                    <label for="startDate" class="form-label">\r
                      {{ i18n.t('fields.startDate') }} <span class="text-danger">*</span>\r
                    </label>\r
                    <input\r
                      type="date"\r
                      id="startDate"\r
                      class="form-control"\r
                      formControlName="startDate"\r
                      [class.is-invalid]="isFieldInvalid('startDate')"\r
                      [disabled]="saving()"\r
                    />\r
                    @if (hasError('startDate')) {\r
                      <div class="invalid-feedback">\r
                        {{ getErrorMessage('startDate') }}\r
                      </div>\r
                    }\r
                  </div>\r
\r
                  <!-- End Date -->\r
                  <div class="col-md-6 mb-3">\r
                    <label for="endDate" class="form-label">\r
                      {{ i18n.t('fields.endDate') }} <span class="text-danger">*</span>\r
                    </label>\r
                    <input\r
                      type="date"\r
                      id="endDate"\r
                      class="form-control"\r
                      formControlName="endDate"\r
                      [class.is-invalid]="isFieldInvalid('endDate')"\r
                      [disabled]="saving()"\r
                    />\r
                    @if (hasError('endDate')) {\r
                      <div class="invalid-feedback">\r
                        {{ getErrorMessage('endDate') }}\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <!-- Additional Information Section -->\r
              <div class="mb-4">\r
                <h6 class="text-secondary mb-3">\r
                  <i class="fa-solid fa-list me-2"></i>\r
                  {{ i18n.t('employee_vacations.additional_information') }}\r
                </h6>\r
                <!-- Notes -->\r
                <div class="mb-3">\r
                  <label for="notes" class="form-label">{{ i18n.t('fields.notes') }}</label>\r
                  <textarea\r
                    id="notes"\r
                    class="form-control"\r
                    rows="3"\r
                    formControlName="notes"\r
                    [placeholder]="i18n.t('employee_vacations.notes_placeholder')"\r
                    [disabled]="saving()"\r
                  ></textarea>\r
                </div>\r
              </div>\r
\r
              <!-- Submit Section -->\r
              <div class="d-flex justify-content-end gap-2">\r
                <button\r
                  type="button"\r
                  class="btn btn-secondary"\r
                  (click)="onCancel()"\r
                  [disabled]="saving()"\r
                >\r
                  {{ i18n.t('common.cancel') }}\r
                </button>\r
\r
                <button\r
                  type="button"\r
                  class="btn btn-outline-secondary"\r
                  (click)="onReset()"\r
                  [disabled]="saving()"\r
                >\r
                  {{ i18n.t('common.reset') }}\r
                </button>\r
\r
                <button\r
                  type="submit"\r
                  class="btn btn-primary"\r
                  [disabled]="vacationForm.invalid || saving()"\r
                >\r
                  @if (saving()) {\r
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
                  }\r
                  {{ i18n.t('employee_vacations.create_vacation') }}\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </form>\r
      </div>\r
\r
      <!-- Sidebar -->\r
      <div class="col-lg-4">\r
        <!-- Help Card -->\r
        <div class="card">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">\r
              <i class="fas fa-info-circle me-2"></i>\r
              {{ i18n.t('employee_vacations.help_title') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
            <p class="small text-muted mb-2">{{ i18n.t('employee_vacations.help_text') }}</p>\r
            <ul class="small text-muted mb-0">\r
              <li>{{ i18n.t('employee_vacations.help_select_employee') }}</li>\r
              <li>{{ i18n.t('employee_vacations.help_select_type') }}</li>\r
              <li>{{ i18n.t('employee_vacations.help_date_range') }}</li>\r
              <li>{{ i18n.t('employee_vacations.help_notes_optional') }}</li>\r
            </ul>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/employee-vacations/create-employee-vacation/create-employee-vacation.component.css */\n.form-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control:disabled,\n.form-select:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback {\n  font-size: 0.875rem;\n}\n.help-card {\n  position: sticky;\n  top: 1rem;\n}\n.card-title {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group .btn {\n  border-radius: 0.375rem;\n}\n.btn-group .btn:not(:last-child) {\n  margin-right: 0.5rem;\n}\n@media (max-width: 768px) {\n  .d-flex.justify-content-end {\n    flex-direction: column;\n  }\n  .btn {\n    margin-bottom: 0.5rem;\n  }\n  .btn:last-child {\n    margin-bottom: 0;\n  }\n}\n/*# sourceMappingURL=create-employee-vacation.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateEmployeeVacationComponent, { className: "CreateEmployeeVacationComponent", filePath: "src/app/pages/employee-vacations/create-employee-vacation/create-employee-vacation.component.ts", lineNumber: 27 });
})();
export {
  CreateEmployeeVacationComponent
};
//# sourceMappingURL=chunk-JMWMS3WS.js.map
