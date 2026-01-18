import {
  EmployeeVacationsService
} from "./chunk-XTR6RCDA.js";
import {
  ModalWrapperComponent
} from "./chunk-EDTHBJ53.js";
import {
  DataTableComponent
} from "./chunk-JW5UYWPK.js";
import {
  UnifiedFilterComponent
} from "./chunk-KEVORF3C.js";
import "./chunk-NKWUQBPB.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import "./chunk-SKLP6OYI.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-XLGMY32C.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import {
  PermissionActions,
  PermissionResources
} from "./chunk-EVMJ7ILG.js";
import "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  RadioControlValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
  Router
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  NgClass,
  Output,
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
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
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

// src/app/pages/employee-vacations/bulk-vacation-modal/bulk-vacation-modal.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function BulkVacationModalComponent_Conditional_17_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r3 = ctx.$implicit;
    \u0275\u0275property("value", branch_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(branch_r3.name);
  }
}
__name(BulkVacationModalComponent_Conditional_17_For_7_Template, "BulkVacationModalComponent_Conditional_17_For_7_Template");
function BulkVacationModalComponent_Conditional_17_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getErrorMessage("branchId"), " ");
  }
}
__name(BulkVacationModalComponent_Conditional_17_Conditional_8_Template, "BulkVacationModalComponent_Conditional_17_Conditional_8_Template");
function BulkVacationModalComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "label", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 34);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function BulkVacationModalComponent_Conditional_17_Template_select_change_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTargetChange());
    }, "BulkVacationModalComponent_Conditional_17_Template_select_change_3_listener"));
    \u0275\u0275elementStart(4, "option", 16);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, BulkVacationModalComponent_Conditional_17_For_7_Template, 2, 2, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, BulkVacationModalComponent_Conditional_17_Conditional_8_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("employee_vacations.select_branch"), " *");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r1.hasError("branchId"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("employee_vacations.select_branch_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.branches());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasError("branchId") ? 8 : -1);
  }
}
__name(BulkVacationModalComponent_Conditional_17_Template, "BulkVacationModalComponent_Conditional_17_Template");
function BulkVacationModalComponent_Conditional_18_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const department_r5 = ctx.$implicit;
    \u0275\u0275property("value", department_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(department_r5.name);
  }
}
__name(BulkVacationModalComponent_Conditional_18_For_7_Template, "BulkVacationModalComponent_Conditional_18_For_7_Template");
function BulkVacationModalComponent_Conditional_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getErrorMessage("departmentId"), " ");
  }
}
__name(BulkVacationModalComponent_Conditional_18_Conditional_8_Template, "BulkVacationModalComponent_Conditional_18_Conditional_8_Template");
function BulkVacationModalComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "label", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 35);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function BulkVacationModalComponent_Conditional_18_Template_select_change_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTargetChange());
    }, "BulkVacationModalComponent_Conditional_18_Template_select_change_3_listener"));
    \u0275\u0275elementStart(4, "option", 16);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, BulkVacationModalComponent_Conditional_18_For_7_Template, 2, 2, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, BulkVacationModalComponent_Conditional_18_Conditional_8_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("employee_vacations.select_department"), " *");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r1.hasError("departmentId"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("employee_vacations.select_department_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.departments());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasError("departmentId") ? 8 : -1);
  }
}
__name(BulkVacationModalComponent_Conditional_18_Template, "BulkVacationModalComponent_Conditional_18_Template");
function BulkVacationModalComponent_Conditional_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 32);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("employee_vacations.loading_preview"));
  }
}
__name(BulkVacationModalComponent_Conditional_19_Conditional_2_Template, "BulkVacationModalComponent_Conditional_19_Conditional_2_Template");
function BulkVacationModalComponent_Conditional_19_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 37);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("employee_vacations.employees_affected").replace("{{count}}", (ctx_r1.previewEmployeeCount() || 0).toString()), " ");
  }
}
__name(BulkVacationModalComponent_Conditional_19_Conditional_3_Template, "BulkVacationModalComponent_Conditional_19_Conditional_3_Template");
function BulkVacationModalComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 36);
    \u0275\u0275conditionalCreate(2, BulkVacationModalComponent_Conditional_19_Conditional_2_Template, 3, 1)(3, BulkVacationModalComponent_Conditional_19_Conditional_3_Template, 3, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.loadingPreview() ? 2 : 3);
  }
}
__name(BulkVacationModalComponent_Conditional_19_Template, "BulkVacationModalComponent_Conditional_19_Template");
function BulkVacationModalComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vacationType_r6 = ctx.$implicit;
    \u0275\u0275property("value", vacationType_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(vacationType_r6.name);
  }
}
__name(BulkVacationModalComponent_For_28_Template, "BulkVacationModalComponent_For_28_Template");
function BulkVacationModalComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getErrorMessage("vacationTypeId"), " ");
  }
}
__name(BulkVacationModalComponent_Conditional_29_Template, "BulkVacationModalComponent_Conditional_29_Template");
function BulkVacationModalComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getErrorMessage("startDate"), " ");
  }
}
__name(BulkVacationModalComponent_Conditional_42_Template, "BulkVacationModalComponent_Conditional_42_Template");
function BulkVacationModalComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getErrorMessage("endDate"), " ");
  }
}
__name(BulkVacationModalComponent_Conditional_47_Template, "BulkVacationModalComponent_Conditional_47_Template");
function BulkVacationModalComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 32);
  }
}
__name(BulkVacationModalComponent_Conditional_66_Template, "BulkVacationModalComponent_Conditional_66_Template");
var BulkAssignmentType;
(function(BulkAssignmentType2) {
  BulkAssignmentType2[BulkAssignmentType2["Branch"] = 1] = "Branch";
  BulkAssignmentType2[BulkAssignmentType2["Department"] = 2] = "Department";
})(BulkAssignmentType || (BulkAssignmentType = {}));
var _BulkVacationModalComponent = class _BulkVacationModalComponent {
  fb = inject(FormBuilder);
  notificationService = inject(NotificationService);
  employeeVacationsService = inject(EmployeeVacationsService);
  i18n = inject(I18nService);
  modalClose = new EventEmitter();
  bulkVacationCreated = new EventEmitter();
  // Modal state
  isVisible = signal(false, ...ngDevMode ? [{ debugName: "isVisible" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  // Form
  bulkVacationForm;
  // Available options
  vacationTypes = signal([], ...ngDevMode ? [{ debugName: "vacationTypes" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  departments = signal([], ...ngDevMode ? [{ debugName: "departments" }] : []);
  // Preview data
  previewEmployeeCount = signal(null, ...ngDevMode ? [{ debugName: "previewEmployeeCount" }] : []);
  loadingPreview = signal(false, ...ngDevMode ? [{ debugName: "loadingPreview" }] : []);
  // Assignment types for template
  BulkAssignmentType = BulkAssignmentType;
  constructor() {
    this.bulkVacationForm = this.createForm();
  }
  ngOnInit() {
    this.loadVacationTypes();
    this.loadBranches();
    this.loadDepartments();
  }
  /**
   * Create reactive form
   */
  createForm() {
    return this.fb.group({
      vacationTypeId: [null, [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      assignmentType: [BulkAssignmentType.Branch, [Validators.required]],
      branchId: [null],
      departmentId: [null],
      isApproved: [true],
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
      }, "error")
    });
  }
  /**
   * Load branches for dropdown
   */
  loadBranches() {
    this.employeeVacationsService.getBranches().subscribe({
      next: /* @__PURE__ */ __name((branches) => {
        this.branches.set(branches);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
      }, "error")
    });
  }
  /**
   * Load departments for dropdown
   */
  loadDepartments() {
    this.employeeVacationsService.getDepartments().subscribe({
      next: /* @__PURE__ */ __name((departments) => {
        this.departments.set(departments);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load departments:", error);
      }, "error")
    });
  }
  /**
   * Open modal
   */
  openModal() {
    this.resetForm();
    this.previewEmployeeCount.set(null);
    this.isVisible.set(true);
  }
  /**
   * Close modal
   */
  closeModal() {
    this.isVisible.set(false);
    this.resetForm();
    this.modalClose.emit();
  }
  /**
   * Reset form to initial state
   */
  resetForm() {
    this.bulkVacationForm.reset({
      assignmentType: BulkAssignmentType.Branch,
      isApproved: true
    });
    this.previewEmployeeCount.set(null);
  }
  /**
   * Handle assignment type change
   */
  onAssignmentTypeChange() {
    const assignmentType = this.bulkVacationForm.get("assignmentType")?.value;
    this.bulkVacationForm.patchValue({
      branchId: null,
      departmentId: null
    });
    const branchControl = this.bulkVacationForm.get("branchId");
    const departmentControl = this.bulkVacationForm.get("departmentId");
    if (assignmentType === BulkAssignmentType.Branch) {
      branchControl?.setValidators([Validators.required]);
      departmentControl?.clearValidators();
    } else if (assignmentType === BulkAssignmentType.Department) {
      departmentControl?.setValidators([Validators.required]);
      branchControl?.clearValidators();
    }
    branchControl?.updateValueAndValidity();
    departmentControl?.updateValueAndValidity();
    this.previewEmployeeCount.set(null);
  }
  /**
   * Handle target change (branch or department)
   */
  onTargetChange() {
    this.updatePreview();
  }
  /**
   * Update employee count preview
   */
  updatePreview() {
    const formValue = this.bulkVacationForm.value;
    if (!this.isValidForPreview(formValue)) {
      this.previewEmployeeCount.set(null);
      return;
    }
    this.loadingPreview.set(true);
    const request = {
      assignmentType: formValue.assignmentType,
      branchId: formValue.assignmentType === BulkAssignmentType.Branch ? formValue.branchId : void 0,
      departmentId: formValue.assignmentType === BulkAssignmentType.Department ? formValue.departmentId : void 0
    };
    this.employeeVacationsService.getEmployeeCountPreview(request).subscribe({
      next: /* @__PURE__ */ __name((count) => {
        this.previewEmployeeCount.set(count);
        this.loadingPreview.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load preview:", error);
        this.previewEmployeeCount.set(null);
        this.loadingPreview.set(false);
      }, "error")
    });
  }
  /**
   * Check if form is valid for preview
   */
  isValidForPreview(formValue) {
    if (formValue.assignmentType === BulkAssignmentType.Branch) {
      return formValue.branchId != null;
    } else if (formValue.assignmentType === BulkAssignmentType.Department) {
      return formValue.departmentId != null;
    }
    return false;
  }
  /**
   * Submit form
   */
  onSubmit() {
    if (this.bulkVacationForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    this.submitting.set(true);
    const formValue = this.bulkVacationForm.value;
    const request = {
      vacationTypeId: formValue.vacationTypeId,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      assignmentType: formValue.assignmentType,
      branchId: formValue.assignmentType === BulkAssignmentType.Branch ? formValue.branchId : void 0,
      departmentId: formValue.assignmentType === BulkAssignmentType.Department ? formValue.departmentId : void 0,
      isApproved: formValue.isApproved,
      notes: formValue.notes || void 0
    };
    this.employeeVacationsService.createBulkVacations(request).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.submitting.set(false);
        this.handleBulkCreationResult(result);
        this.closeModal();
        this.bulkVacationCreated.emit();
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.submitting.set(false);
        const message = error.error?.message || this.i18n.t("employee_vacations.errors.bulk_create_failed");
        this.notificationService.error(this.i18n.t("app.error"), message);
      }, "error")
    });
  }
  /**
   * Handle bulk creation result and show appropriate notifications
   */
  handleBulkCreationResult(result) {
    if (result.isCompleteSuccess) {
      this.notificationService.success(this.i18n.t("app.success"), this.i18n.t("employee_vacations.bulk_create_success").replace("{{count}}", result.vacationsCreated.toString()));
    } else {
      this.notificationService.warning(this.i18n.t("app.partial_success"), this.i18n.t("employee_vacations.bulk_create_partial").replace("{{created}}", result.vacationsCreated.toString()).replace("{{skipped}}", result.employeesSkipped.toString()));
    }
  }
  /**
   * Mark all form controls as touched
   */
  markFormGroupTouched() {
    Object.keys(this.bulkVacationForm.controls).forEach((key) => {
      const control = this.bulkVacationForm.get(key);
      control?.markAsTouched();
    });
  }
  /**
   * Check if field has error
   */
  hasError(fieldName) {
    const field = this.bulkVacationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  /**
   * Get field error message
   */
  getErrorMessage(fieldName) {
    const field = this.bulkVacationForm.get(fieldName);
    if (field?.errors) {
      if (field.errors["required"]) {
        return this.i18n.t("validation.required");
      }
    }
    return "";
  }
  /**
   * Get assignment type display name
   */
  getAssignmentTypeName(type) {
    return type === BulkAssignmentType.Branch ? this.i18n.t("employee_vacations.branch") : this.i18n.t("employee_vacations.department");
  }
};
__name(_BulkVacationModalComponent, "BulkVacationModalComponent");
__publicField(_BulkVacationModalComponent, "\u0275fac", /* @__PURE__ */ __name(function BulkVacationModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BulkVacationModalComponent)();
}, "BulkVacationModalComponent_Factory"));
__publicField(_BulkVacationModalComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BulkVacationModalComponent, selectors: [["app-bulk-vacation-modal"]], outputs: { modalClose: "modalClose", bulkVacationCreated: "bulkVacationCreated" }, decls: 69, vars: 40, consts: [[3, "close", "show", "title", "size", "centered", "loading"], [1, "modal-body"], [3, "ngSubmit", "formGroup"], [1, "row", "mb-3"], [1, "col-12"], [1, "form-label"], ["role", "group", 1, "btn-group", "w-100"], ["type", "radio", "id", "assignmentType-branch", "formControlName", "assignmentType", 1, "btn-check", 3, "change", "value"], ["for", "assignmentType-branch", 1, "btn", "btn-outline-primary"], [1, "fas", "fa-building", "me-2"], ["type", "radio", "id", "assignmentType-department", "formControlName", "assignmentType", 1, "btn-check", 3, "change", "value"], ["for", "assignmentType-department", 1, "btn", "btn-outline-primary"], [1, "fas", "fa-sitemap", "me-2"], [1, "alert", "alert-info", "mb-3"], [1, "col-md-6"], ["formControlName", "vacationTypeId", 1, "form-select"], ["value", ""], [3, "value"], [1, "invalid-feedback"], [1, "form-check", "form-switch", "mt-2"], ["type", "checkbox", "id", "isApproved", "formControlName", "isApproved", 1, "form-check-input"], ["for", "isApproved", 1, "form-check-label"], ["type", "date", "formControlName", "startDate", 1, "form-control"], ["type", "date", "formControlName", "endDate", 1, "form-control"], ["rows", "3", "formControlName", "notes", 1, "form-control", 3, "placeholder"], [1, "alert", "alert-warning"], [1, "d-flex", "align-items-start"], [1, "fas", "fa-exclamation-triangle", "me-2", "mt-1"], [1, "mb-0", "mt-1"], ["modal-footer", "", 1, "d-flex", "gap-2", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-plus-circle", "me-2"], ["formControlName", "branchId", 1, "form-select", 3, "change"], ["formControlName", "departmentId", 1, "form-select", 3, "change"], [1, "d-flex", "align-items-center"], [1, "fas", "fa-info-circle", "me-2"]], template: /* @__PURE__ */ __name(function BulkVacationModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-modal-wrapper", 0);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function BulkVacationModalComponent_Template_app_modal_wrapper_close_0_listener() {
      return ctx.closeModal();
    }, "BulkVacationModalComponent_Template_app_modal_wrapper_close_0_listener"));
    \u0275\u0275elementStart(1, "div", 1)(2, "form", 2);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function BulkVacationModalComponent_Template_form_ngSubmit_2_listener() {
      return ctx.onSubmit();
    }, "BulkVacationModalComponent_Template_form_ngSubmit_2_listener"));
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "label", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 6)(8, "input", 7);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function BulkVacationModalComponent_Template_input_change_8_listener() {
      return ctx.onAssignmentTypeChange();
    }, "BulkVacationModalComponent_Template_input_change_8_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "label", 8);
    \u0275\u0275element(10, "i", 9);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 10);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function BulkVacationModalComponent_Template_input_change_12_listener() {
      return ctx.onAssignmentTypeChange();
    }, "BulkVacationModalComponent_Template_input_change_12_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "label", 11);
    \u0275\u0275element(14, "i", 12);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "div", 3);
    \u0275\u0275conditionalCreate(17, BulkVacationModalComponent_Conditional_17_Template, 9, 5, "div", 4);
    \u0275\u0275conditionalCreate(18, BulkVacationModalComponent_Conditional_18_Template, 9, 5, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, BulkVacationModalComponent_Conditional_19_Template, 4, 1, "div", 13);
    \u0275\u0275elementStart(20, "div", 3)(21, "div", 14)(22, "label", 5);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 15)(25, "option", 16);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(27, BulkVacationModalComponent_For_28_Template, 2, 2, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(29, BulkVacationModalComponent_Conditional_29_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 14)(31, "label", 5);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 19);
    \u0275\u0275element(34, "input", 20);
    \u0275\u0275elementStart(35, "label", 21);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(37, "div", 3)(38, "div", 14)(39, "label", 5);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275element(41, "input", 22);
    \u0275\u0275conditionalCreate(42, BulkVacationModalComponent_Conditional_42_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 14)(44, "label", 5);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275element(46, "input", 23);
    \u0275\u0275conditionalCreate(47, BulkVacationModalComponent_Conditional_47_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 3)(49, "div", 4)(50, "label", 5);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "textarea", 24);
    \u0275\u0275text(53, "                ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(54, "div", 25)(55, "div", 26);
    \u0275\u0275element(56, "i", 27);
    \u0275\u0275elementStart(57, "div")(58, "strong");
    \u0275\u0275text(59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "p", 28);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(62, "div", 29)(63, "button", 30);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function BulkVacationModalComponent_Template_button_click_63_listener() {
      return ctx.closeModal();
    }, "BulkVacationModalComponent_Template_button_click_63_listener"));
    \u0275\u0275text(64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "button", 31);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function BulkVacationModalComponent_Template_button_click_65_listener() {
      return ctx.onSubmit();
    }, "BulkVacationModalComponent_Template_button_click_65_listener"));
    \u0275\u0275conditionalCreate(66, BulkVacationModalComponent_Conditional_66_Template, 1, 0, "span", 32);
    \u0275\u0275element(67, "i", 33);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    \u0275\u0275property("show", ctx.isVisible())("title", ctx.i18n.t("employee_vacations.bulk_assignment"))("size", "lg")("centered", true)("loading", ctx.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx.bulkVacationForm);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("employee_vacations.assignment_type"), " *");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx.BulkAssignmentType.Branch);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("employee_vacations.branch"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx.BulkAssignmentType.Department);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("employee_vacations.department"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_11_0 = ctx.bulkVacationForm.get("assignmentType")) == null ? null : tmp_11_0.value) === ctx.BulkAssignmentType.Branch ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_12_0 = ctx.bulkVacationForm.get("assignmentType")) == null ? null : tmp_12_0.value) === ctx.BulkAssignmentType.Department ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.previewEmployeeCount() !== null || ctx.loadingPreview() ? 19 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("employee_vacations.vacation_type"), " *");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.hasError("vacationTypeId"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.i18n.t("employee_vacations.select_vacation_type"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.vacationTypes());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.hasError("vacationTypeId") ? 29 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("employee_vacations.approval_status"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("employee_vacations.auto_approve"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("employee_vacations.start_date"), " *");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.hasError("startDate"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("startDate") ? 42 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("employee_vacations.end_date"), " *");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.hasError("endDate"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("endDate") ? 47 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("employee_vacations.notes"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx.i18n.t("employee_vacations.notes_placeholder"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.i18n.t("employee_vacations.bulk_warning_title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.i18n.t("employee_vacations.bulk_warning_message"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.bulkVacationForm.invalid || ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 66 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("d-none", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("employee_vacations.create_bulk_vacations"), " ");
  }
}, "BulkVacationModalComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, ReactiveFormsModule, FormGroupDirective, FormControlName, ModalWrapperComponent], styles: ["\n\n.modal-content[_ngcontent-%COMP%] {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border: none;\n  border-radius: 0.5rem;\n}\n.modal-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-bottom: none;\n  border-radius: 0.5rem 0.5rem 0 0;\n  padding: 1.25rem 1.5rem;\n}\n.modal-header[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.modal-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {\n  filter: invert(1);\n  opacity: 0.8;\n}\n.modal-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e9ecef;\n  background-color: #f8f9fa;\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n  padding: 0.625rem 0.75rem;\n  font-size: 0.875rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #667eea;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.btn-group[_ngcontent-%COMP%]   .btn-check[_ngcontent-%COMP%]:checked    + .btn[_ngcontent-%COMP%] {\n  background-color: #667eea;\n  border-color: #667eea;\n  color: white;\n}\n.btn-group[_ngcontent-%COMP%]   .btn-outline-primary[_ngcontent-%COMP%] {\n  border-color: #667eea;\n  color: #667eea;\n  font-weight: 500;\n}\n.btn-group[_ngcontent-%COMP%]   .btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: #667eea;\n  border-color: #667eea;\n  color: white;\n}\n.alert[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.alert-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d1ecf1 0%,\n      #bee5eb 100%);\n  color: #0c5460;\n  border-left: 4px solid #17a2b8;\n}\n.alert-warning[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fff3cd 0%,\n      #ffeaa7 100%);\n  color: #856404;\n  border-left: 4px solid #ffc107;\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875em;\n  color: #dc3545;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: #667eea;\n  border-color: #667eea;\n}\n.form-check-input[_ngcontent-%COMP%]:focus {\n  border-color: #667eea;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  font-weight: 500;\n  padding: 0.625rem 1.25rem;\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #5a6fd8 0%,\n      #6a4190 100%);\n  transform: translateY(-1px);\n  box-shadow: 0 0.25rem 0.5rem rgba(102, 126, 234, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  background:\n    linear-gradient(\n      135deg,\n      #9ca3af 0%,\n      #a3a3a3 100%);\n  border: none;\n  cursor: not-allowed;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: white;\n  font-weight: 500;\n  padding: 0.625rem 1.25rem;\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #5a6268;\n  border-color: #545b62;\n  transform: translateY(-1px);\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.loading-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6c757d;\n  font-size: 0.875rem;\n}\n.preview-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #e3f2fd 0%,\n      #bbdefb 100%);\n  border: 1px solid #2196f3;\n  border-radius: 0.5rem;\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n}\n.preview-info[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  color: #2196f3;\n}\n@media (max-width: 768px) {\n  .modal-dialog[_ngcontent-%COMP%] {\n    margin: 1rem;\n    max-width: calc(100% - 2rem);\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    padding: 0.5rem 0.75rem;\n  }\n}\n.btn[_ngcontent-%COMP%]:focus {\n  outline: 2px solid #667eea;\n  outline-offset: 2px;\n}\n*[_ngcontent-%COMP%] {\n  transition: all 0.15s ease-in-out;\n}\n/*# sourceMappingURL=bulk-vacation-modal.component.css.map */"] }));
var BulkVacationModalComponent = _BulkVacationModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BulkVacationModalComponent, [{
    type: Component,
    args: [{ selector: "app-bulk-vacation-modal", standalone: true, imports: [FormsModule, ReactiveFormsModule, ModalWrapperComponent], template: `<app-modal-wrapper\r
  [show]="isVisible()"\r
  [title]="i18n.t('employee_vacations.bulk_assignment')"\r
  [size]="'lg'"\r
  [centered]="true"\r
  [loading]="submitting()"\r
  (close)="closeModal()">\r
\r
  <div class="modal-body">\r
    <form [formGroup]="bulkVacationForm" (ngSubmit)="onSubmit()">\r
\r
            <!-- Assignment Type Selection -->\r
            <div class="row mb-3">\r
              <div class="col-12">\r
                <label class="form-label">{{ i18n.t('employee_vacations.assignment_type') }} *</label>\r
                <div class="btn-group w-100" role="group">\r
                  <input\r
                    type="radio"\r
                    class="btn-check"\r
                    id="assignmentType-branch"\r
                    [value]="BulkAssignmentType.Branch"\r
                    formControlName="assignmentType"\r
                    (change)="onAssignmentTypeChange()">\r
                  <label class="btn btn-outline-primary" for="assignmentType-branch">\r
                    <i class="fas fa-building me-2"></i>\r
                    {{ i18n.t('employee_vacations.branch') }}\r
                  </label>\r
\r
                  <input\r
                    type="radio"\r
                    class="btn-check"\r
                    id="assignmentType-department"\r
                    [value]="BulkAssignmentType.Department"\r
                    formControlName="assignmentType"\r
                    (change)="onAssignmentTypeChange()">\r
                  <label class="btn btn-outline-primary" for="assignmentType-department">\r
                    <i class="fas fa-sitemap me-2"></i>\r
                    {{ i18n.t('employee_vacations.department') }}\r
                  </label>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Target Selection -->\r
            <div class="row mb-3">\r
              <!-- Branch Selection -->\r
              @if (bulkVacationForm.get('assignmentType')?.value === BulkAssignmentType.Branch) {\r
                <div class="col-12">\r
                  <label class="form-label">{{ i18n.t('employee_vacations.select_branch') }} *</label>\r
                  <select\r
                    class="form-select"\r
                    formControlName="branchId"\r
                    [class.is-invalid]="hasError('branchId')"\r
                    (change)="onTargetChange()">\r
                    <option value="">{{ i18n.t('employee_vacations.select_branch_placeholder') }}</option>\r
                    @for (branch of branches(); track branch.id) {\r
                      <option [value]="branch.id">{{ branch.name }}</option>\r
                    }\r
                  </select>\r
                  @if (hasError('branchId')) {\r
                    <div class="invalid-feedback">\r
                      {{ getErrorMessage('branchId') }}\r
                    </div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- Department Selection -->\r
              @if (bulkVacationForm.get('assignmentType')?.value === BulkAssignmentType.Department) {\r
                <div class="col-12">\r
                  <label class="form-label">{{ i18n.t('employee_vacations.select_department') }} *</label>\r
                  <select\r
                    class="form-select"\r
                    formControlName="departmentId"\r
                    [class.is-invalid]="hasError('departmentId')"\r
                    (change)="onTargetChange()">\r
                    <option value="">{{ i18n.t('employee_vacations.select_department_placeholder') }}</option>\r
                    @for (department of departments(); track department.id) {\r
                      <option [value]="department.id">{{ department.name }}</option>\r
                    }\r
                  </select>\r
                  @if (hasError('departmentId')) {\r
                    <div class="invalid-feedback">\r
                      {{ getErrorMessage('departmentId') }}\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
\r
            <!-- Employee Count Preview -->\r
            @if (previewEmployeeCount() !== null || loadingPreview()) {\r
              <div class="alert alert-info mb-3">\r
                <div class="d-flex align-items-center">\r
                  @if (loadingPreview()) {\r
                    <div class="spinner-border spinner-border-sm me-2" role="status"></div>\r
                    <span>{{ i18n.t('employee_vacations.loading_preview') }}</span>\r
                  } @else {\r
                    <i class="fas fa-info-circle me-2"></i>\r
                    <span>\r
                      {{ i18n.t('employee_vacations.employees_affected').replace('{{count}}', (previewEmployeeCount() || 0).toString()) }}\r
                    </span>\r
                  }\r
                </div>\r
              </div>\r
            }\r
\r
            <!-- Vacation Details -->\r
            <div class="row mb-3">\r
              <div class="col-md-6">\r
                <label class="form-label">{{ i18n.t('employee_vacations.vacation_type') }} *</label>\r
                <select\r
                  class="form-select"\r
                  formControlName="vacationTypeId"\r
                  [class.is-invalid]="hasError('vacationTypeId')">\r
                  <option value="">{{ i18n.t('employee_vacations.select_vacation_type') }}</option>\r
                  @for (vacationType of vacationTypes(); track vacationType.id) {\r
                    <option [value]="vacationType.id">{{ vacationType.name }}</option>\r
                  }\r
                </select>\r
                @if (hasError('vacationTypeId')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('vacationTypeId') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <div class="col-md-6">\r
                <label class="form-label">{{ i18n.t('employee_vacations.approval_status') }}</label>\r
                <div class="form-check form-switch mt-2">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="isApproved"\r
                    formControlName="isApproved">\r
                  <label class="form-check-label" for="isApproved">\r
                    {{ i18n.t('employee_vacations.auto_approve') }}\r
                  </label>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Date Range -->\r
            <div class="row mb-3">\r
              <div class="col-md-6">\r
                <label class="form-label">{{ i18n.t('employee_vacations.start_date') }} *</label>\r
                <input\r
                  type="date"\r
                  class="form-control"\r
                  formControlName="startDate"\r
                  [class.is-invalid]="hasError('startDate')">\r
                @if (hasError('startDate')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('startDate') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <div class="col-md-6">\r
                <label class="form-label">{{ i18n.t('employee_vacations.end_date') }} *</label>\r
                <input\r
                  type="date"\r
                  class="form-control"\r
                  formControlName="endDate"\r
                  [class.is-invalid]="hasError('endDate')">\r
                @if (hasError('endDate')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('endDate') }}\r
                  </div>\r
                }\r
              </div>\r
            </div>\r
\r
            <!-- Notes -->\r
            <div class="row mb-3">\r
              <div class="col-12">\r
                <label class="form-label">{{ i18n.t('employee_vacations.notes') }}</label>\r
                <textarea\r
                  class="form-control"\r
                  rows="3"\r
                  formControlName="notes"\r
                  [placeholder]="i18n.t('employee_vacations.notes_placeholder')">\r
                </textarea>\r
              </div>\r
            </div>\r
\r
            <!-- Warning Message -->\r
            <div class="alert alert-warning">\r
              <div class="d-flex align-items-start">\r
                <i class="fas fa-exclamation-triangle me-2 mt-1"></i>\r
                <div>\r
                  <strong>{{ i18n.t('employee_vacations.bulk_warning_title') }}</strong>\r
                  <p class="mb-0 mt-1">{{ i18n.t('employee_vacations.bulk_warning_message') }}</p>\r
                </div>\r
              </div>\r
            </div>\r
\r
    </form>\r
  </div>\r
\r
  <div modal-footer class="d-flex gap-2 justify-content-end">\r
    <button\r
      type="button"\r
      class="btn btn-secondary"\r
      [disabled]="submitting()"\r
      (click)="closeModal()">\r
      {{ i18n.t('common.cancel') }}\r
    </button>\r
\r
    <button\r
      type="submit"\r
      class="btn btn-primary"\r
      [disabled]="bulkVacationForm.invalid || submitting()"\r
      (click)="onSubmit()">\r
      @if (submitting()) {\r
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
      }\r
      <i class="fas fa-plus-circle me-2" [class.d-none]="submitting()"></i>\r
      {{ i18n.t('employee_vacations.create_bulk_vacations') }}\r
    </button>\r
  </div>\r
\r
</app-modal-wrapper>`, styles: ["/* src/app/pages/employee-vacations/bulk-vacation-modal/bulk-vacation-modal.component.css */\n.modal-content {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border: none;\n  border-radius: 0.5rem;\n}\n.modal-header {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-bottom: none;\n  border-radius: 0.5rem 0.5rem 0 0;\n  padding: 1.25rem 1.5rem;\n}\n.modal-header .modal-title {\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.modal-header .btn-close {\n  filter: invert(1);\n  opacity: 0.8;\n}\n.modal-header .btn-close:hover {\n  opacity: 1;\n}\n.modal-body {\n  padding: 1.5rem;\n}\n.modal-footer {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e9ecef;\n  background-color: #f8f9fa;\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control,\n.form-select {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n  padding: 0.625rem 0.75rem;\n  font-size: 0.875rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #667eea;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.btn-group .btn-check:checked + .btn {\n  background-color: #667eea;\n  border-color: #667eea;\n  color: white;\n}\n.btn-group .btn-outline-primary {\n  border-color: #667eea;\n  color: #667eea;\n  font-weight: 500;\n}\n.btn-group .btn-outline-primary:hover {\n  background-color: #667eea;\n  border-color: #667eea;\n  color: white;\n}\n.alert {\n  border: none;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.alert-info {\n  background:\n    linear-gradient(\n      135deg,\n      #d1ecf1 0%,\n      #bee5eb 100%);\n  color: #0c5460;\n  border-left: 4px solid #17a2b8;\n}\n.alert-warning {\n  background:\n    linear-gradient(\n      135deg,\n      #fff3cd 0%,\n      #ffeaa7 100%);\n  color: #856404;\n  border-left: 4px solid #ffc107;\n}\n.is-invalid {\n  border-color: #dc3545;\n}\n.invalid-feedback {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875em;\n  color: #dc3545;\n}\n.form-check-input:checked {\n  background-color: #667eea;\n  border-color: #667eea;\n}\n.form-check-input:focus {\n  border-color: #667eea;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  font-weight: 500;\n  padding: 0.625rem 1.25rem;\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn-primary:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #5a6fd8 0%,\n      #6a4190 100%);\n  transform: translateY(-1px);\n  box-shadow: 0 0.25rem 0.5rem rgba(102, 126, 234, 0.3);\n}\n.btn-primary:disabled {\n  background:\n    linear-gradient(\n      135deg,\n      #9ca3af 0%,\n      #a3a3a3 100%);\n  border: none;\n  cursor: not-allowed;\n}\n.btn-secondary {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: white;\n  font-weight: 500;\n  padding: 0.625rem 1.25rem;\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn-secondary:hover:not(:disabled) {\n  background-color: #5a6268;\n  border-color: #545b62;\n  transform: translateY(-1px);\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.loading-preview {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6c757d;\n  font-size: 0.875rem;\n}\n.preview-info {\n  background:\n    linear-gradient(\n      135deg,\n      #e3f2fd 0%,\n      #bbdefb 100%);\n  border: 1px solid #2196f3;\n  border-radius: 0.5rem;\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n}\n.preview-info .fas {\n  color: #2196f3;\n}\n@media (max-width: 768px) {\n  .modal-dialog {\n    margin: 1rem;\n    max-width: calc(100% - 2rem);\n  }\n  .modal-body {\n    padding: 1rem;\n  }\n  .modal-footer {\n    padding: 1rem;\n  }\n  .btn-group .btn {\n    font-size: 0.875rem;\n    padding: 0.5rem 0.75rem;\n  }\n}\n.btn:focus {\n  outline: 2px solid #667eea;\n  outline-offset: 2px;\n}\n* {\n  transition: all 0.15s ease-in-out;\n}\n/*# sourceMappingURL=bulk-vacation-modal.component.css.map */\n"] }]
  }], () => [], { modalClose: [{
    type: Output
  }], bulkVacationCreated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BulkVacationModalComponent, { className: "BulkVacationModalComponent", filePath: "src/app/pages/employee-vacations/bulk-vacation-modal/bulk-vacation-modal.component.ts", lineNumber: 46 });
})();

// src/app/pages/employee-vacations/employee-vacations.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
function EmployeeVacationsComponent_ng_template_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 12)(2, "div", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div")(5, "div", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const vacation_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getInitials(vacation_r2.employeeName), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(vacation_r2.employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vacation_r2.employeeNumber);
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_0_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_0_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vacation_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(vacation_r2.vacationTypeName);
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_1_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_1_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const vacation_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(vacation_r2.startDate), " ");
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_2_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_2_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const vacation_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(vacation_r2.endDate), " ");
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_3_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_3_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vacation_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", vacation_r2.totalDays, " ", vacation_r2.totalDays === 1 ? ctx_r2.i18n.t("common.day") : ctx_r2.i18n.t("common.days"), " ");
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_4_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_4_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-status-badge", 10);
  }
  if (rf & 2) {
    const vacation_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("status", vacation_r2.isApproved ? "success" : "warning")("label", vacation_r2.isApproved ? ctx_r2.i18n.t("employee_vacations.approved") : ctx_r2.i18n.t("employee_vacations.pending"));
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_5_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_5_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vacation_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.getCurrentStatusClass(vacation_r2));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getCurrentStatusLabel(vacation_r2), " ");
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_6_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_6_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const vacation_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" ", vacation_r2.notes, " ");
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_7_Conditional_0_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_7_Conditional_0_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_7_Conditional_1_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_7_Conditional_1_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EmployeeVacationsComponent_ng_template_4_Conditional_7_Conditional_0_Template, 1, 1)(1, EmployeeVacationsComponent_ng_template_4_Conditional_7_Conditional_1_Template, 2, 0, "span", 14);
  }
  if (rf & 2) {
    const vacation_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(vacation_r2.notes ? 0 : 1);
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_7_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_7_Template");
function EmployeeVacationsComponent_ng_template_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const vacation_r2 = ctx_r3.$implicit;
    const column_r5 = ctx_r3.column;
    \u0275\u0275textInterpolate1(" ", vacation_r2[column_r5.key], " ");
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Conditional_8_Template, "EmployeeVacationsComponent_ng_template_4_Conditional_8_Template");
function EmployeeVacationsComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EmployeeVacationsComponent_ng_template_4_Conditional_0_Template, 9, 3, "div", 7)(1, EmployeeVacationsComponent_ng_template_4_Conditional_1_Template, 2, 1, "span", 8)(2, EmployeeVacationsComponent_ng_template_4_Conditional_2_Template, 1, 1)(3, EmployeeVacationsComponent_ng_template_4_Conditional_3_Template, 1, 1)(4, EmployeeVacationsComponent_ng_template_4_Conditional_4_Template, 2, 2, "span", 9)(5, EmployeeVacationsComponent_ng_template_4_Conditional_5_Template, 1, 2, "app-status-badge", 10)(6, EmployeeVacationsComponent_ng_template_4_Conditional_6_Template, 2, 2, "span", 11)(7, EmployeeVacationsComponent_ng_template_4_Conditional_7_Template, 2, 1)(8, EmployeeVacationsComponent_ng_template_4_Conditional_8_Template, 1, 1);
  }
  if (rf & 2) {
    const column_r5 = ctx.column;
    \u0275\u0275conditional(column_r5.key === "employee" ? 0 : column_r5.key === "vacationType" ? 1 : column_r5.key === "startDate" ? 2 : column_r5.key === "endDate" ? 3 : column_r5.key === "totalDays" ? 4 : column_r5.key === "status" ? 5 : column_r5.key === "currentStatus" ? 6 : column_r5.key === "notes" ? 7 : 8);
  }
}
__name(EmployeeVacationsComponent_ng_template_4_Template, "EmployeeVacationsComponent_ng_template_4_Template");
var _EmployeeVacationsComponent = class _EmployeeVacationsComponent {
  employeeVacationsService = inject(EmployeeVacationsService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Signals for state management
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  currentFilters = signal({}, ...ngDevMode ? [{ debugName: "currentFilters" }] : []);
  // Service signals
  vacations = this.employeeVacationsService.vacations;
  loading = this.employeeVacationsService.loading;
  pagedResult = this.employeeVacationsService.pagedResult;
  // Computed signals
  totalItems = computed(() => this.pagedResult()?.totalCount ?? 0, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  totalPages = computed(() => {
    const result = this.pagedResult();
    if (!result || result.pageSize === 0)
      return 1;
    return Math.ceil(result.totalCount / result.pageSize);
  }, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Permission constants
  PERMISSIONS = {
    VACATION_READ: `${PermissionResources.VACATION}.${PermissionActions.READ}`,
    VACATION_CREATE: `${PermissionResources.VACATION}.${PermissionActions.CREATE}`,
    VACATION_UPDATE: `${PermissionResources.VACATION}.${PermissionActions.UPDATE}`,
    VACATION_DELETE: `${PermissionResources.VACATION}.${PermissionActions.DELETE}`,
    VACATION_BULK_CREATE: `${PermissionResources.VACATION}.${PermissionActions.BULK_CREATE}`
  };
  // Table configuration
  tableColumns = [
    {
      key: "employee",
      label: this.i18n.t("employee_vacations.employee"),
      sortable: true,
      width: "20%",
      priority: "high"
    },
    {
      key: "vacationType",
      label: this.i18n.t("employee_vacations.vacation_type"),
      sortable: true,
      width: "15%",
      priority: "high"
    },
    {
      key: "startDate",
      label: this.i18n.t("employee_vacations.start_date"),
      sortable: true,
      width: "12%",
      priority: "medium"
    },
    {
      key: "endDate",
      label: this.i18n.t("employee_vacations.end_date"),
      sortable: true,
      width: "12%",
      priority: "medium"
    },
    {
      key: "totalDays",
      label: this.i18n.t("employee_vacations.total_days"),
      sortable: true,
      width: "10%",
      align: "center",
      priority: "low"
    },
    {
      key: "status",
      label: this.i18n.t("employee_vacations.approval_status"),
      sortable: true,
      width: "12%",
      align: "center",
      priority: "high"
    },
    {
      key: "currentStatus",
      label: this.i18n.t("employee_vacations.current_status"),
      width: "12%",
      align: "center",
      priority: "low"
    },
    {
      key: "notes",
      label: this.i18n.t("employee_vacations.notes"),
      width: "15%",
      priority: "low"
    }
  ];
  // Table actions
  tableActions = computed(() => {
    const actions = [];
    if (this.permissionService.has(this.PERMISSIONS.VACATION_READ)) {
      actions.push({ key: "view", label: this.i18n.t("common.view"), icon: "fa-eye", color: "info" });
    }
    if (this.permissionService.has(this.PERMISSIONS.VACATION_UPDATE)) {
      actions.push({ key: "edit", label: this.i18n.t("common.edit"), icon: "fa-edit", color: "primary" });
      actions.push({ key: "toggleStatus", label: this.i18n.t("employee_vacations.toggle_status"), icon: "fa-toggle-on", color: "warning" });
    }
    if (this.permissionService.has(this.PERMISSIONS.VACATION_DELETE)) {
      actions.push({ key: "delete", label: this.i18n.t("common.delete"), icon: "fa-trash", color: "danger" });
    }
    return actions;
  }, ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  constructor() {
    this.loadVacations();
  }
  /**
   * Load employee vacations with current filter and pagination
   */
  loadVacations() {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_READ)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    const queryParams = __spreadValues({
      page: this.currentPage(),
      pageSize: this.pageSize()
    }, this.currentFilters());
    this.employeeVacationsService.getVacations(queryParams).subscribe({
      error: /* @__PURE__ */ __name((error) => {
        this.notificationService.error(this.i18n.t("employee_vacations.errors.load_failed"));
        console.error("Failed to load employee vacations:", error);
      }, "error")
    });
  }
  /**
   * Handle search and filter changes
   */
  onSearchChange(searchTerm) {
    this.currentFilters.update((filters) => __spreadProps(__spreadValues({}, filters), {
      searchTerm: searchTerm || void 0
    }));
    this.currentPage.set(1);
    this.loadVacations();
  }
  onFiltersChange(filters) {
    this.currentFilters.set(filters);
    this.currentPage.set(1);
    this.loadVacations();
  }
  onRefreshData() {
    this.currentFilters.set({});
    this.currentPage.set(1);
    this.loadVacations();
  }
  /**
   * Handle page changes
   */
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadVacations();
  }
  onPageSizeChange(pageSize) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadVacations();
  }
  /**
   * Navigate to create employee vacation page
   */
  onAddVacation() {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_CREATE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    this.router.navigate(["/employee-vacations/create"]);
  }
  /**
   * Navigate to view employee vacation details
   */
  onViewVacation(vacation) {
    this.router.navigate(["/employee-vacations", vacation.id, "view"]);
  }
  /**
   * Navigate to edit employee vacation
   */
  onEditVacation(vacation) {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_UPDATE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    this.router.navigate(["/employee-vacations", vacation.id, "edit"]);
  }
  /**
   * Toggle vacation approval status
   */
  onToggleStatus(vacation) {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_UPDATE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    const action = vacation.isApproved ? "reject" : "approve";
    const message = this.i18n.t(`employee_vacations.confirm_${action}`).replace("{{employee}}", vacation.employeeName);
    this.confirmationService.confirm({
      title: this.i18n.t(`employee_vacations.${action}_vacation`),
      message,
      confirmText: this.i18n.t(`common.${action}`),
      cancelText: this.i18n.t("common.cancel"),
      confirmButtonClass: action === "approve" ? "btn-success" : "btn-warning"
    }).then((result) => {
      if (result.confirmed) {
        this.employeeVacationsService.toggleVacationStatus(vacation.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            const successMessage = vacation.isApproved ? this.i18n.t("employee_vacations.success.rejected") : this.i18n.t("employee_vacations.success.approved");
            this.notificationService.success(successMessage);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to toggle vacation status:", error);
            this.notificationService.error(this.i18n.t("employee_vacations.errors.status_toggle_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Delete employee vacation
   */
  onDeleteVacation(vacation) {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_DELETE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    this.confirmationService.confirm({
      title: this.i18n.t("employee_vacations.delete_vacation"),
      message: this.i18n.t("employee_vacations.confirm_delete").replace("{{employee}}", vacation.employeeName),
      confirmText: this.i18n.t("common.delete"),
      cancelText: this.i18n.t("common.cancel"),
      confirmButtonClass: "btn-danger"
    }).then((result) => {
      if (result.confirmed) {
        this.employeeVacationsService.deleteVacation(vacation.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_vacations.success.deleted"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete vacation:", error);
            this.notificationService.error(this.i18n.t("employee_vacations.errors.delete_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Open bulk vacation assignment modal
   */
  onBulkAssignVacation() {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_BULK_CREATE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    this.router.navigate(["/employee-vacations/bulk-create"]);
  }
  /**
   * Handle bulk vacation created
   */
  onBulkVacationCreated() {
    this.loadVacations();
  }
  /**
   * Handle table actions
   */
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onViewVacation(item);
        break;
      case "edit":
        this.onEditVacation(item);
        break;
      case "delete":
        this.onDeleteVacation(item);
        break;
      case "toggleStatus":
        this.onToggleStatus(item);
        break;
    }
  }
  /**
   * Helper methods for cell formatting
   */
  getInitials(fullName) {
    if (!fullName)
      return "";
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length >= 2) {
      return nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  }
  getCurrentStatusLabel(vacation) {
    if (vacation.isCurrentlyActive) {
      return this.i18n.t("employee_vacations.active");
    } else if (vacation.isUpcoming) {
      return this.i18n.t("employee_vacations.upcoming");
    } else if (this.isVacationPeriodActive(vacation) && !vacation.isApproved) {
      return this.i18n.t("employee_vacations.pending");
    } else {
      return this.i18n.t("employee_vacations.past");
    }
  }
  getCurrentStatusClass(vacation) {
    if (vacation.isCurrentlyActive) {
      return "bg-success";
    } else if (vacation.isUpcoming) {
      return "bg-info";
    } else if (this.isVacationPeriodActive(vacation) && !vacation.isApproved) {
      return "bg-warning";
    } else {
      return "bg-light text-dark border";
    }
  }
  isVacationPeriodActive(vacation) {
    const today = /* @__PURE__ */ new Date();
    const startDate = new Date(vacation.startDate);
    const endDate = new Date(vacation.endDate);
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return startDate <= today && endDate >= today;
  }
  formatDate(date) {
    if (!date)
      return "";
    const d = new Date(date);
    return d.toLocaleDateString();
  }
};
__name(_EmployeeVacationsComponent, "EmployeeVacationsComponent");
__publicField(_EmployeeVacationsComponent, "\u0275fac", /* @__PURE__ */ __name(function EmployeeVacationsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmployeeVacationsComponent)();
}, "EmployeeVacationsComponent_Factory"));
__publicField(_EmployeeVacationsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeeVacationsComponent, selectors: [["app-employee-vacations"]], decls: 8, vars: 15, consts: [["cellTemplate", ""], ["bulkVacationModal", ""], [1, "app-list-page"], [3, "title"], ["moduleName", "employee-vacations", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [3, "actionClick", "pageChange", "pageSizeChange", "data", "columns", "actions", "currentPage", "totalPages", "totalItems", "pageSize", "loading", "emptyTitle", "emptyMessage", "showPagination", "responsiveMode"], [3, "bulkVacationCreated"], [1, "d-flex", "align-items-center"], [1, "fw-medium"], [1, "badge", "bg-secondary"], [3, "status", "label"], [1, "badge", 3, "ngClass"], [1, "avatar-sm", "me-2"], [1, "avatar-initial", "bg-primary", "text-white", "rounded-circle"], [1, "text-muted"]], template: /* @__PURE__ */ __name(function EmployeeVacationsComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-page-header", 3);
    \u0275\u0275elementStart(2, "app-unified-filter", 4);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function EmployeeVacationsComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSearchChange($event));
    }, "EmployeeVacationsComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function EmployeeVacationsComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onFiltersChange($event));
    }, "EmployeeVacationsComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function EmployeeVacationsComponent_Template_app_unified_filter_add_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onAddVacation());
    }, "EmployeeVacationsComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function EmployeeVacationsComponent_Template_app_unified_filter_refresh_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onRefreshData());
    }, "EmployeeVacationsComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-data-table", 5);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function EmployeeVacationsComponent_Template_app_data_table_actionClick_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onActionClick($event));
    }, "EmployeeVacationsComponent_Template_app_data_table_actionClick_3_listener"))("pageChange", /* @__PURE__ */ __name(function EmployeeVacationsComponent_Template_app_data_table_pageChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageChange($event));
    }, "EmployeeVacationsComponent_Template_app_data_table_pageChange_3_listener"))("pageSizeChange", /* @__PURE__ */ __name(function EmployeeVacationsComponent_Template_app_data_table_pageSizeChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageSizeChange($event));
    }, "EmployeeVacationsComponent_Template_app_data_table_pageSizeChange_3_listener"));
    \u0275\u0275template(4, EmployeeVacationsComponent_ng_template_4_Template, 9, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "app-bulk-vacation-modal", 6, 1);
    \u0275\u0275listener("bulkVacationCreated", /* @__PURE__ */ __name(function EmployeeVacationsComponent_Template_app_bulk_vacation_modal_bulkVacationCreated_6_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onBulkVacationCreated());
    }, "EmployeeVacationsComponent_Template_app_bulk_vacation_modal_bulkVacationCreated_6_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("employee_vacations.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx.vacations() || \u0275\u0275pureFunction0(14, _c0))("columns", ctx.tableColumns)("actions", ctx.tableActions())("currentPage", ctx.currentPage())("totalPages", ctx.totalPages())("totalItems", ctx.totalItems())("pageSize", ctx.pageSize())("loading", ctx.loading)("emptyTitle", ctx.i18n.t("employee_vacations.no_vacations_found"))("emptyMessage", ctx.i18n.t("employee_vacations.no_vacations_message"))("showPagination", true)("responsiveMode", "auto");
  }
}, "EmployeeVacationsComponent_Template"), dependencies: [
  CommonModule,
  NgClass,
  UnifiedFilterComponent,
  DataTableComponent,
  BulkVacationModalComponent,
  PageHeaderComponent,
  StatusBadgeComponent
], styles: ["\n\n.employee-vacations-page[_ngcontent-%COMP%] {\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-top: none;\n  font-weight: 600;\n  color: #495057;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n}\n.modal[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75em;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n}\n.pagination[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-bottom: 0;\n}\n.search-filters[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%], \n.search-filters[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n.vacation-status.approved[_ngcontent-%COMP%] {\n  color: #198754;\n}\n.vacation-status.pending[_ngcontent-%COMP%] {\n  color: #ffc107;\n}\n.vacation-status.active[_ngcontent-%COMP%] {\n  color: #0d6efd;\n}\n.vacation-status.upcoming[_ngcontent-%COMP%] {\n  color: #6f42c1;\n}\n.vacation-status.completed[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.avatar-initial[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 50%;\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  margin: 1.75rem auto;\n  max-width: 800px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\n}\n.modal-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  border-radius: 8px 8px 0 0;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-top: 1px solid #dee2e6;\n  border-radius: 0 0 8px 8px;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border-radius: 6px;\n  border: 1px solid #ced4da;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.form-control.is-invalid[_ngcontent-%COMP%], \n.form-select.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.875rem;\n  color: #dc3545;\n  margin-top: 0.25rem;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 6px;\n  font-weight: 500;\n  transition: all 0.15s ease-in-out;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #0056b3;\n  border-color: #0056b3;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #545b62;\n  border-color: #545b62;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #dc3545 !important;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.bg-success[_ngcontent-%COMP%] {\n  background-color: #28a745 !important;\n  color: white;\n}\n.bg-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107 !important;\n  color: #212529;\n}\n.bg-info[_ngcontent-%COMP%] {\n  background-color: #17a2b8 !important;\n  color: white;\n}\n.bg-light[_ngcontent-%COMP%] {\n  background-color: #f8f9fa !important;\n  color: #495057;\n}\n.bg-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n  color: white;\n}\n.bg-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n  color: white;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n@media (max-width: 768px) {\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.125rem 0.25rem;\n  }\n  .modal-lg[_ngcontent-%COMP%] {\n    max-width: 95%;\n  }\n  .avatar-sm[_ngcontent-%COMP%] {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n  .avatar-initial[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n}\n.modal.fade.show[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n}\n.modal-backdrop.fade.show[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=employee-vacations.component.css.map */"] }));
var EmployeeVacationsComponent = _EmployeeVacationsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeVacationsComponent, [{
    type: Component,
    args: [{ selector: "app-employee-vacations", standalone: true, imports: [
      CommonModule,
      UnifiedFilterComponent,
      DataTableComponent,
      BulkVacationModalComponent,
      PageHeaderComponent,
      StatusBadgeComponent
    ], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header [title]="i18n.t('employee_vacations.title')">\r
  </app-page-header>\r
\r
  <!-- Filters Component -->\r
  <app-unified-filter moduleName="employee-vacations" [refreshing]="loading()" (searchChange)="onSearchChange($event)"\r
    (filtersChange)="onFiltersChange($event)" (add)="onAddVacation()" (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- Employee Vacations Table -->\r
  <app-data-table [data]="vacations() || []" [columns]="tableColumns" [actions]="tableActions()"\r
    [currentPage]="currentPage()" [totalPages]="totalPages()" [totalItems]="totalItems()" [pageSize]="pageSize()"\r
    [loading]="loading" [emptyTitle]="i18n.t('employee_vacations.no_vacations_found')"\r
    [emptyMessage]="i18n.t('employee_vacations.no_vacations_message')" [showPagination]="true"\r
    [responsiveMode]="'auto'"\r
    (actionClick)="onActionClick($event)" (pageChange)="onPageChange($event)"\r
    (pageSizeChange)="onPageSizeChange($event)">\r
\r
    <!-- Custom cell template -->\r
    <ng-template #cellTemplate let-vacation let-column="column">\r
      @if (column.key === 'employee') {\r
      <div class="d-flex align-items-center">\r
        <div class="avatar-sm me-2">\r
          <div class="avatar-initial bg-primary text-white rounded-circle">\r
            {{ getInitials(vacation.employeeName) }}\r
          </div>\r
        </div>\r
        <div>\r
          <div class="fw-medium">{{ vacation.employeeName }}</div>\r
          <small class="text-muted">{{ vacation.employeeNumber }}</small>\r
        </div>\r
      </div>\r
      } @else if (column.key === 'vacationType') {\r
      <span class="fw-medium">{{ vacation.vacationTypeName }}</span>\r
      } @else if (column.key === 'startDate') {\r
      {{ formatDate(vacation.startDate) }}\r
      } @else if (column.key === 'endDate') {\r
      {{ formatDate(vacation.endDate) }}\r
      } @else if (column.key === 'totalDays') {\r
      <span class="badge bg-secondary">\r
        {{ vacation.totalDays }} {{ vacation.totalDays === 1 ? i18n.t('common.day') : i18n.t('common.days') }}\r
      </span>\r
      } @else if (column.key === 'status') {\r
      <app-status-badge [status]="vacation.isApproved ? 'success' : 'warning'"\r
        [label]="vacation.isApproved ? i18n.t('employee_vacations.approved') : i18n.t('employee_vacations.pending')">\r
      </app-status-badge>\r
      } @else if (column.key === 'currentStatus') {\r
      <span class="badge" [ngClass]="getCurrentStatusClass(vacation)">\r
        {{ getCurrentStatusLabel(vacation) }}\r
      </span>\r
      } @else if (column.key === 'notes') {\r
      @if (vacation.notes) {\r
      {{ vacation.notes }}\r
      } @else {\r
      <span class="text-muted">-</span>\r
      }\r
      } @else {\r
      {{ vacation[column.key] }}\r
      }\r
    </ng-template>\r
  </app-data-table>\r
\r
\r
  <!-- Bulk Vacation Modal Component -->\r
  <app-bulk-vacation-modal #bulkVacationModal (bulkVacationCreated)="onBulkVacationCreated()">\r
  </app-bulk-vacation-modal>\r
</div>`, styles: ["/* src/app/pages/employee-vacations/employee-vacations.component.css */\n.employee-vacations-page {\n}\n.table th {\n  background-color: #f8f9fa;\n  border-top: none;\n  font-weight: 600;\n  color: #495057;\n}\n.table td {\n  vertical-align: middle;\n}\n.btn-group-sm .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n}\n.modal {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.badge {\n  font-size: 0.75em;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n}\n.card-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n}\n.pagination {\n  margin-top: 1rem;\n  margin-bottom: 0;\n}\n.search-filters .form-control,\n.search-filters .form-select {\n  border-radius: 0.375rem;\n}\n.vacation-status.approved {\n  color: #198754;\n}\n.vacation-status.pending {\n  color: #ffc107;\n}\n.vacation-status.active {\n  color: #0d6efd;\n}\n.vacation-status.upcoming {\n  color: #6f42c1;\n}\n.vacation-status.completed {\n  color: #6c757d;\n}\n.avatar-sm {\n  width: 2rem;\n  height: 2rem;\n}\n.avatar-initial {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 50%;\n}\n.modal-dialog {\n  margin: 1.75rem auto;\n  max-width: 800px;\n}\n.modal-content {\n  border-radius: 8px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\n}\n.modal-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  border-radius: 8px 8px 0 0;\n}\n.modal-title {\n  font-weight: 600;\n  color: #2c3e50;\n}\n.modal-body {\n  padding: 2rem;\n}\n.modal-footer {\n  background-color: #f8f9fa;\n  border-top: 1px solid #dee2e6;\n  border-radius: 0 0 8px 8px;\n}\n.form-control,\n.form-select {\n  border-radius: 6px;\n  border: 1px solid #ced4da;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.form-control.is-invalid,\n.form-select.is-invalid {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.invalid-feedback {\n  display: block;\n  font-size: 0.875rem;\n  color: #dc3545;\n  margin-top: 0.25rem;\n}\n.btn {\n  border-radius: 6px;\n  font-weight: 500;\n  transition: all 0.15s ease-in-out;\n}\n.btn-primary {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.btn-primary:hover:not(:disabled) {\n  background-color: #0056b3;\n  border-color: #0056b3;\n}\n.btn-secondary {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-secondary:hover {\n  background-color: #545b62;\n  border-color: #545b62;\n}\n.btn:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n.text-danger {\n  color: #dc3545 !important;\n}\n.text-muted {\n  color: #6c757d !important;\n}\n.bg-success {\n  background-color: #28a745 !important;\n  color: white;\n}\n.bg-warning {\n  background-color: #ffc107 !important;\n  color: #212529;\n}\n.bg-info {\n  background-color: #17a2b8 !important;\n  color: white;\n}\n.bg-light {\n  background-color: #f8f9fa !important;\n  color: #495057;\n}\n.bg-secondary {\n  background-color: #6c757d !important;\n  color: white;\n}\n.bg-danger {\n  background-color: #dc3545 !important;\n  color: white;\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n@media (max-width: 768px) {\n  .table-responsive {\n    font-size: 0.875rem;\n  }\n  .btn-group-sm .btn {\n    padding: 0.125rem 0.25rem;\n  }\n  .modal-lg {\n    max-width: 95%;\n  }\n  .avatar-sm {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n  .avatar-initial {\n    font-size: 0.75rem;\n  }\n}\n.modal.fade.show {\n  animation: fadeIn 0.15s ease-out;\n}\n.modal-backdrop.fade.show {\n  animation: fadeIn 0.15s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=employee-vacations.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeeVacationsComponent, { className: "EmployeeVacationsComponent", filePath: "src/app/pages/employee-vacations/employee-vacations.component.ts", lineNumber: 31 });
})();
export {
  EmployeeVacationsComponent
};
//# sourceMappingURL=chunk-2VCTJK3U.js.map
