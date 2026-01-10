import {
  EmployeeVacationsService
} from "./chunk-XTR6RCDA.js";
import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
import {
  SearchableSelectComponent
} from "./chunk-2D23Y7U6.js";
import {
  FormSectionComponent
} from "./chunk-JTLHOQFH.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  CheckboxControlValueAccessor,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/employee-vacations/edit-employee-vacation/edit-employee-vacation.component.ts
function EditEmployeeVacationComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("employee_vacations.loading_details"))("variant", "primary")("centered", true);
  }
}
__name(EditEmployeeVacationComponent_Conditional_2_Template, "EditEmployeeVacationComponent_Conditional_2_Template");
function EditEmployeeVacationComponent_Conditional_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("vacationTypeId"), " ");
  }
}
__name(EditEmployeeVacationComponent_Conditional_3_Conditional_11_Template, "EditEmployeeVacationComponent_Conditional_3_Conditional_11_Template");
function EditEmployeeVacationComponent_Conditional_3_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("startDate"), " ");
  }
}
__name(EditEmployeeVacationComponent_Conditional_3_Conditional_26_Template, "EditEmployeeVacationComponent_Conditional_3_Conditional_26_Template");
function EditEmployeeVacationComponent_Conditional_3_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("endDate"), " ");
  }
}
__name(EditEmployeeVacationComponent_Conditional_3_Conditional_33_Template, "EditEmployeeVacationComponent_Conditional_3_Conditional_33_Template");
function EditEmployeeVacationComponent_Conditional_3_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 43);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.saving"), " ");
  }
}
__name(EditEmployeeVacationComponent_Conditional_3_Conditional_48_Template, "EditEmployeeVacationComponent_Conditional_3_Conditional_48_Template");
function EditEmployeeVacationComponent_Conditional_3_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 44);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.save"), " ");
  }
}
__name(EditEmployeeVacationComponent_Conditional_3_Conditional_49_Template, "EditEmployeeVacationComponent_Conditional_3_Conditional_49_Template");
function EditEmployeeVacationComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 5)(2, "form", 6);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditEmployeeVacationComponent_Conditional_3_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "EditEmployeeVacationComponent_Conditional_3_Template_form_ngSubmit_2_listener"));
    \u0275\u0275elementStart(3, "app-form-section", 7)(4, "div", 3)(5, "div", 8)(6, "label", 9);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "span", 10);
    \u0275\u0275text(9, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(10, "app-searchable-select", 11);
    \u0275\u0275conditionalCreate(11, EditEmployeeVacationComponent_Conditional_3_Conditional_11_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 8)(13, "label", 13);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 14);
    \u0275\u0275element(16, "input", 15);
    \u0275\u0275elementStart(17, "label", 16);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "div", 3)(20, "div", 8)(21, "label", 17);
    \u0275\u0275text(22);
    \u0275\u0275elementStart(23, "span", 10);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(25, "input", 18);
    \u0275\u0275conditionalCreate(26, EditEmployeeVacationComponent_Conditional_3_Conditional_26_Template, 2, 1, "div", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 8)(28, "label", 20);
    \u0275\u0275text(29);
    \u0275\u0275elementStart(30, "span", 10);
    \u0275\u0275text(31, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(32, "input", 21);
    \u0275\u0275conditionalCreate(33, EditEmployeeVacationComponent_Conditional_3_Conditional_33_Template, 2, 1, "div", 19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "app-form-section", 7)(35, "div", 22)(36, "label", 23);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "textarea", 24);
    \u0275\u0275text(39, "                  ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 25)(41, "button", 26);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditEmployeeVacationComponent_Conditional_3_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditEmployeeVacationComponent_Conditional_3_Template_button_click_41_listener"));
    \u0275\u0275element(42, "i", 27);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 28);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditEmployeeVacationComponent_Conditional_3_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onReset());
    }, "EditEmployeeVacationComponent_Conditional_3_Template_button_click_44_listener"));
    \u0275\u0275element(45, "i", 29);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "button", 30);
    \u0275\u0275conditionalCreate(48, EditEmployeeVacationComponent_Conditional_3_Conditional_48_Template, 2, 1)(49, EditEmployeeVacationComponent_Conditional_3_Conditional_49_Template, 2, 1);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(50, "div", 31)(51, "div", 32)(52, "div", 33)(53, "h6", 34);
    \u0275\u0275element(54, "i", 35);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 36)(57, "p", 37);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "ul", 38)(60, "li", 39);
    \u0275\u0275element(61, "i", 40);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "li", 39);
    \u0275\u0275element(64, "i", 41);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "li");
    \u0275\u0275element(67, "i", 42);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.vacationForm);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("employee_vacations.required_information"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.vacationType"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.vacationTypeOptions)("placeholder", ctx_r0.i18n.t("employee_vacations.placeholders.select_vacation_type"))("isInvalid", ctx_r0.isFieldInvalid("vacationTypeId"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("vacationTypeId") ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.approval_status"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.is_approved"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.startDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("startDate"));
    \u0275\u0275property("disabled", ctx_r0.saving())("placeholder", ctx_r0.i18n.t("employee_vacations.placeholders.select_start_date"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("startDate") ? 26 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.endDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("endDate"));
    \u0275\u0275property("disabled", ctx_r0.saving())("placeholder", ctx_r0.i18n.t("employee_vacations.placeholders.select_end_date"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("endDate") ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("employee_vacations.additional_information"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.notes"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving())("placeholder", ctx_r0.i18n.t("employee_vacations.placeholders.enter_notes"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.reset"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.vacationForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 48 : 49);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.help"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.help.edit_instructions"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.help.required_fields"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.help.date_validation"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.help.approval_info"), " ");
  }
}
__name(EditEmployeeVacationComponent_Conditional_3_Template, "EditEmployeeVacationComponent_Conditional_3_Template");
var _EditEmployeeVacationComponent = class _EditEmployeeVacationComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  employeeVacationsService = inject(EmployeeVacationsService);
  i18n = inject(I18nService);
  // State
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  currentVacation = signal(null, ...ngDevMode ? [{ debugName: "currentVacation" }] : []);
  vacationId = null;
  // Form
  vacationForm;
  // Available options
  vacationTypes = signal([], ...ngDevMode ? [{ debugName: "vacationTypes" }] : []);
  // Computed properties for searchable select options
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
    this.loadVacationTypes();
    this.loadVacation();
  }
  /**
   * Create reactive form
   */
  createForm() {
    return this.fb.group({
      vacationTypeId: [null, [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      isApproved: [false],
      notes: [""]
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
   * Load vacation for editing
   */
  loadVacation() {
    const vacationIdParam = this.route.snapshot.paramMap.get("id");
    if (!vacationIdParam) {
      this.router.navigate(["/employee-vacations"]);
      return;
    }
    this.vacationId = +vacationIdParam;
    this.loading.set(true);
    this.employeeVacationsService.getVacationById(this.vacationId).subscribe({
      next: /* @__PURE__ */ __name((vacation) => {
        this.currentVacation.set(vacation);
        this.populateForm(vacation);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load vacation:", error);
        this.notificationService.error(this.i18n.t("employee_vacations.errors.load_failed"));
        this.loading.set(false);
        this.router.navigate(["/employee-vacations"]);
      }, "error")
    });
  }
  /**
   * Populate form with vacation data
   */
  populateForm(vacation) {
    this.vacationForm.patchValue({
      vacationTypeId: vacation.vacationTypeId,
      startDate: this.formatDateForInput(vacation.startDate),
      endDate: this.formatDateForInput(vacation.endDate),
      isApproved: vacation.isApproved,
      notes: vacation.notes || ""
    });
  }
  /**
   * Format date for HTML input
   */
  formatDateForInput(date) {
    if (!date)
      return "";
    const d = new Date(date);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  /**
   * Handle form submission
   */
  onSubmit() {
    if (this.vacationForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    const vacation = this.currentVacation();
    if (!vacation)
      return;
    this.saving.set(true);
    const formValue = this.vacationForm.value;
    const request = {
      vacationTypeId: formValue.vacationTypeId,
      startDate: new Date(formValue.startDate),
      endDate: new Date(formValue.endDate),
      isApproved: formValue.isApproved,
      notes: formValue.notes || void 0
    };
    this.employeeVacationsService.updateVacation(vacation.id, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t("employee_vacations.success.updated"));
        this.router.navigate(["/employee-vacations", vacation.id, "view"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.saving.set(false);
        console.error("Failed to update vacation:", error);
        this.notificationService.error(this.i18n.t("employee_vacations.errors.update_failed"));
      }, "error")
    });
  }
  /**
   * Cancel and navigate back
   */
  onCancel() {
    const vacation = this.currentVacation();
    if (vacation) {
      this.router.navigate(["/employee-vacations", vacation.id, "view"]);
    } else {
      this.router.navigate(["/employee-vacations"]);
    }
  }
  /**
   * Reset form to original values
   */
  onReset() {
    const vacation = this.currentVacation();
    if (vacation) {
      this.populateForm(vacation);
    }
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
   * Get employee name for display
   */
  getEmployeeName() {
    return this.currentVacation()?.employeeName || "";
  }
  /**
   * Get form mode for FormHeaderComponent
   */
  getFormMode() {
    return "edit";
  }
  /**
   * Get vacation ID for FormHeaderComponent
   */
  getVacationId() {
    return this.vacationId || void 0;
  }
};
__name(_EditEmployeeVacationComponent, "EditEmployeeVacationComponent");
__publicField(_EditEmployeeVacationComponent, "\u0275fac", /* @__PURE__ */ __name(function EditEmployeeVacationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditEmployeeVacationComponent)();
}, "EditEmployeeVacationComponent_Factory"));
__publicField(_EditEmployeeVacationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditEmployeeVacationComponent, selectors: [["app-edit-employee-vacation"]], decls: 4, vars: 6, consts: [[1, "container-fluid"], ["moduleName", "employee-vacations", "moduleRoute", "employee-vacations", 3, "mode", "title", "entityId", "loading"], [1, "text-center", "py-5"], [1, "row"], [3, "message", "variant", "centered"], [1, "col-lg-8"], [3, "ngSubmit", "formGroup"], [3, "title"], [1, "col-md-6", "mb-3"], ["for", "vacationTypeId", 1, "form-label"], [1, "text-danger"], ["id", "vacationTypeId", "formControlName", "vacationTypeId", 3, "options", "placeholder", "isInvalid"], [1, "invalid-feedback", "d-block"], [1, "form-label"], [1, "form-check"], ["type", "checkbox", "id", "isApproved", "formControlName", "isApproved", 1, "form-check-input"], ["for", "isApproved", 1, "form-check-label"], ["for", "startDate", 1, "form-label"], ["type", "date", "id", "startDate", "formControlName", "startDate", 1, "form-control", 3, "disabled", "placeholder"], [1, "invalid-feedback"], ["for", "endDate", 1, "form-label"], ["type", "date", "id", "endDate", "formControlName", "endDate", 1, "form-control", 3, "disabled", "placeholder"], [1, "mb-3"], ["for", "notes", 1, "form-label"], ["id", "notes", "formControlName", "notes", "rows", "4", 1, "form-control", 3, "disabled", "placeholder"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fas", "fa-undo", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "col-lg-4"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-info-circle", "me-2"], [1, "card-body"], [1, "card-text", "small", "text-muted", "mb-2"], [1, "list-unstyled", "small", "text-muted", "mb-0"], [1, "mb-1"], [1, "fas", "fa-check-circle", "text-success", "me-1"], [1, "fas", "fa-calendar", "text-info", "me-1"], [1, "fas", "fa-shield-alt", "text-warning", "me-1"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-save", "me-2"]], template: /* @__PURE__ */ __name(function EditEmployeeVacationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, EditEmployeeVacationComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, EditEmployeeVacationComponent_Conditional_3_Template, 69, 36, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("mode", ctx.getFormMode())("title", ctx.i18n.t("employee_vacations.edit_vacation"))("entityId", ctx.getVacationId())("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.currentVacation() ? 3 : -1);
  }
}, "EditEmployeeVacationComponent_Template"), dependencies: [
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  CheckboxControlValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  FormGroupDirective,
  FormControlName,
  SearchableSelectComponent,
  FormHeaderComponent,
  FormSectionComponent,
  LoadingSpinnerComponent
], styles: ["\n\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control[_ngcontent-%COMP%]:disabled, \n.form-select[_ngcontent-%COMP%]:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  font-weight: 400;\n  cursor: pointer;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 0.5rem;\n}\n.help-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .help-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .btn[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n  .btn[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 0;\n  }\n}\n/*# sourceMappingURL=edit-employee-vacation.component.css.map */"] }));
var EditEmployeeVacationComponent = _EditEmployeeVacationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditEmployeeVacationComponent, [{
    type: Component,
    args: [{ selector: "app-edit-employee-vacation", standalone: true, imports: [
      FormsModule,
      ReactiveFormsModule,
      SearchableSelectComponent,
      FormHeaderComponent,
      FormSectionComponent,
      LoadingSpinnerComponent,
      StatusBadgeComponent
    ], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <app-form-header\r
    [mode]="getFormMode()"\r
    [title]="i18n.t('employee_vacations.edit_vacation')"\r
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
        [message]="i18n.t('employee_vacations.loading_details')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Main Form Content -->\r
  @if (!loading() && currentVacation()) {\r
    <div class="row">\r
      <!-- Main Content -->\r
      <div class="col-lg-8">\r
        <form [formGroup]="vacationForm" (ngSubmit)="onSubmit()">\r
          <!-- Required Information Section -->\r
          <app-form-section [title]="i18n.t('employee_vacations.required_information')">\r
            <div class="row">\r
                  <!-- Vacation Type -->\r
                  <div class="col-md-6 mb-3">\r
                    <label for="vacationTypeId" class="form-label">\r
                      {{ i18n.t('fields.vacationType') }} <span class="text-danger">*</span>\r
                    </label>\r
                    <app-searchable-select\r
                      id="vacationTypeId"\r
                      formControlName="vacationTypeId"\r
                      [options]="vacationTypeOptions"\r
                      [placeholder]="i18n.t('employee_vacations.placeholders.select_vacation_type')"\r
                      [isInvalid]="isFieldInvalid('vacationTypeId')">\r
                    </app-searchable-select>\r
                    @if (hasError('vacationTypeId')) {\r
                      <div class="invalid-feedback d-block">\r
                        {{ getErrorMessage('vacationTypeId') }}\r
                      </div>\r
                    }\r
                  </div>\r
\r
                  <!-- Approval Status -->\r
                  <div class="col-md-6 mb-3">\r
                    <label class="form-label">{{ i18n.t('employee_vacations.approval_status') }}</label>\r
                    <div class="form-check">\r
                      <input\r
                        type="checkbox"\r
                        id="isApproved"\r
                        formControlName="isApproved"\r
                        class="form-check-input">\r
                      <label for="isApproved" class="form-check-label">\r
                        {{ i18n.t('employee_vacations.is_approved') }}\r
                      </label>\r
                    </div>\r
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
                      formControlName="startDate"\r
                      class="form-control"\r
                      [class.is-invalid]="isFieldInvalid('startDate')"\r
                      [disabled]="saving()"\r
                      [placeholder]="i18n.t('employee_vacations.placeholders.select_start_date')">\r
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
                      formControlName="endDate"\r
                      class="form-control"\r
                      [class.is-invalid]="isFieldInvalid('endDate')"\r
                      [disabled]="saving()"\r
                      [placeholder]="i18n.t('employee_vacations.placeholders.select_end_date')">\r
                    @if (hasError('endDate')) {\r
                      <div class="invalid-feedback">\r
                        {{ getErrorMessage('endDate') }}\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
          </app-form-section>\r
\r
          <!-- Additional Information Section -->\r
          <app-form-section [title]="i18n.t('employee_vacations.additional_information')">\r
            <!-- Notes -->\r
                <div class="mb-3">\r
                  <label for="notes" class="form-label">\r
                    {{ i18n.t('fields.notes') }}\r
                  </label>\r
                  <textarea\r
                    id="notes"\r
                    formControlName="notes"\r
                    class="form-control"\r
                    rows="4"\r
                    [disabled]="saving()"\r
                    [placeholder]="i18n.t('employee_vacations.placeholders.enter_notes')">\r
                  </textarea>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Submit Section -->\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button\r
              type="button"\r
              class="btn btn-outline-danger"\r
              (click)="onCancel()"\r
              [disabled]="saving()">\r
              <i class="fas fa-times me-2"></i>\r
              {{ i18n.t('common.cancel') }}\r
            </button>\r
\r
            <button\r
              type="button"\r
              class="btn btn-outline-secondary"\r
              (click)="onReset()"\r
              [disabled]="saving()">\r
              <i class="fas fa-undo me-2"></i>\r
              {{ i18n.t('common.reset') }}\r
            </button>\r
\r
            <button\r
              type="submit"\r
              class="btn btn-primary"\r
              [disabled]="vacationForm.invalid || saving()">\r
              @if (saving()) {\r
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
                {{ i18n.t('common.saving') }}\r
              } @else {\r
                <i class="fas fa-save me-2"></i>\r
                {{ i18n.t('common.save') }}\r
              }\r
            </button>\r
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
              {{ i18n.t('common.help') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
            <p class="card-text small text-muted mb-2">\r
              {{ i18n.t('employee_vacations.help.edit_instructions') }}\r
            </p>\r
            <ul class="list-unstyled small text-muted mb-0">\r
              <li class="mb-1">\r
                <i class="fas fa-check-circle text-success me-1"></i>\r
                {{ i18n.t('employee_vacations.help.required_fields') }}\r
              </li>\r
              <li class="mb-1">\r
                <i class="fas fa-calendar text-info me-1"></i>\r
                {{ i18n.t('employee_vacations.help.date_validation') }}\r
              </li>\r
              <li>\r
                <i class="fas fa-shield-alt text-warning me-1"></i>\r
                {{ i18n.t('employee_vacations.help.approval_info') }}\r
              </li>\r
            </ul>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/employee-vacations/edit-employee-vacation/edit-employee-vacation.component.css */\n.form-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control:disabled,\n.form-select:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback {\n  font-size: 0.875rem;\n}\n.form-check-label {\n  font-weight: 400;\n  cursor: pointer;\n}\n.form-check-input:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.card-title {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group .btn {\n  border-radius: 0.375rem;\n}\n.btn-group .btn:not(:last-child) {\n  margin-right: 0.5rem;\n}\n.help-card {\n  position: sticky;\n  top: 1rem;\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .help-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .btn {\n    margin-bottom: 0.5rem;\n  }\n  .btn:last-child {\n    margin-bottom: 0;\n  }\n}\n/*# sourceMappingURL=edit-employee-vacation.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditEmployeeVacationComponent, { className: "EditEmployeeVacationComponent", filePath: "src/app/pages/employee-vacations/edit-employee-vacation/edit-employee-vacation.component.ts", lineNumber: 30 });
})();
export {
  EditEmployeeVacationComponent
};
//# sourceMappingURL=chunk-EN3UE6HZ.js.map
