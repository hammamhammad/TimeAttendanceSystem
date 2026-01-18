import {
  SectionCardComponent
} from "./chunk-HMI65T4K.js";
import {
  VacationTypesService
} from "./chunk-ZC4UCEJS.js";
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
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MaxLengthValidator,
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
  DatePipe,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  computed,
  effect,
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
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/vacation-types/vacation-type-modal/vacation-type-modal.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function VacationTypeModalComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 6)(2, "div", 7)(3, "label", 8);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 9);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 10)(8, "label", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 9);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 10)(13, "label", 8);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 11);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 10)(18, "label", 8);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 9);
    \u0275\u0275element(21, "app-status-badge", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 10)(23, "label", 8);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p", 9);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "date");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.branch"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getBranchName() || ctx_r0.i18n.t("vacation_types.all_branches"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.name"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.vacationType == null ? null : ctx_r0.vacationType.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.name_ar"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r0.vacationType == null ? null : ctx_r0.vacationType.nameAr) || ctx_r0.i18n.t("common.not_specified"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.column_status"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", (ctx_r0.vacationType == null ? null : ctx_r0.vacationType.isActive) ? "active" : "inactive")("label", (ctx_r0.vacationType == null ? null : ctx_r0.vacationType.isActive) ? ctx_r0.i18n.t("common.active") : ctx_r0.i18n.t("common.inactive"))("showIcon", true);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.created_at"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(27, 12, ctx_r0.vacationType == null ? null : ctx_r0.vacationType.createdAtUtc, "medium"));
  }
}
__name(VacationTypeModalComponent_Conditional_2_Template, "VacationTypeModalComponent_Conditional_2_Template");
function VacationTypeModalComponent_Conditional_3_For_9_Template(rf, ctx) {
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
__name(VacationTypeModalComponent_Conditional_3_For_9_Template, "VacationTypeModalComponent_Conditional_3_For_9_Template");
function VacationTypeModalComponent_Conditional_3_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("branchId"), " ");
  }
}
__name(VacationTypeModalComponent_Conditional_3_Conditional_10_Template, "VacationTypeModalComponent_Conditional_3_Conditional_10_Template");
function VacationTypeModalComponent_Conditional_3_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("name"), " ");
  }
}
__name(VacationTypeModalComponent_Conditional_3_Conditional_15_Template, "VacationTypeModalComponent_Conditional_3_Conditional_15_Template");
function VacationTypeModalComponent_Conditional_3_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("nameAr"), " ");
  }
}
__name(VacationTypeModalComponent_Conditional_3_Conditional_20_Template, "VacationTypeModalComponent_Conditional_3_Conditional_20_Template");
function VacationTypeModalComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 13);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function VacationTypeModalComponent_Conditional_3_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "VacationTypeModalComponent_Conditional_3_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "div", 6)(2, "div", 7)(3, "label", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 15)(6, "option", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, VacationTypeModalComponent_Conditional_3_For_9_Template, 2, 2, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, VacationTypeModalComponent_Conditional_3_Conditional_10_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 10)(12, "label", 19);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 20);
    \u0275\u0275conditionalCreate(15, VacationTypeModalComponent_Conditional_3_Conditional_15_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 10)(17, "label", 14);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 21);
    \u0275\u0275conditionalCreate(20, VacationTypeModalComponent_Conditional_3_Conditional_20_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.branch"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasFieldError("branchId"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.all_branches"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableBranches());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasFieldError("branchId") ? 10 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.name"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasFieldError("name"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("vacation_types.name_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasFieldError("name") ? 15 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.name_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasFieldError("nameAr"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("vacation_types.name_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasFieldError("nameAr") ? 20 : -1);
  }
}
__name(VacationTypeModalComponent_Conditional_3_Template, "VacationTypeModalComponent_Conditional_3_Template");
function VacationTypeModalComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function VacationTypeModalComponent_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "VacationTypeModalComponent_Conditional_5_Template_button_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.close"), " ");
  }
}
__name(VacationTypeModalComponent_Conditional_5_Template, "VacationTypeModalComponent_Conditional_5_Template");
function VacationTypeModalComponent_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 25);
  }
}
__name(VacationTypeModalComponent_Conditional_6_Conditional_3_Template, "VacationTypeModalComponent_Conditional_6_Conditional_3_Template");
function VacationTypeModalComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function VacationTypeModalComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "VacationTypeModalComponent_Conditional_6_Template_button_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 24);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function VacationTypeModalComponent_Conditional_6_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "VacationTypeModalComponent_Conditional_6_Template_button_click_2_listener"));
    \u0275\u0275conditionalCreate(3, VacationTypeModalComponent_Conditional_6_Conditional_3_Template, 1, 0, "span", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r0.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.isFormValid() || ctx_r0.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.loading() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isEdit ? ctx_r0.i18n.t("common.update") : ctx_r0.i18n.t("common.create"), " ");
  }
}
__name(VacationTypeModalComponent_Conditional_6_Template, "VacationTypeModalComponent_Conditional_6_Template");
var _VacationTypeModalComponent = class _VacationTypeModalComponent {
  fb = inject(FormBuilder);
  vacationTypesService = inject(VacationTypesService);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  vacationType;
  isEdit = false;
  isView = false;
  isOpen = signal(false, ...ngDevMode ? [{ debugName: "isOpen" }] : []);
  modalClose = new EventEmitter();
  vacationTypeCreated = new EventEmitter();
  vacationTypeUpdated = new EventEmitter();
  // Form and state
  form;
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  formValid = signal(false, ...ngDevMode ? [{ debugName: "formValid" }] : []);
  formDirty = signal(false, ...ngDevMode ? [{ debugName: "formDirty" }] : []);
  // Computed signals for form validation
  isFormValid = computed(() => this.formValid(), ...ngDevMode ? [{ debugName: "isFormValid" }] : []);
  isDirty = computed(() => this.formDirty(), ...ngDevMode ? [{ debugName: "isDirty" }] : []);
  ngOnInit() {
    this.initializeForm();
    this.loadBranches();
  }
  ngOnDestroy() {
  }
  /**
   * Initialize the reactive form with validators
   */
  initializeForm() {
    this.form = this.fb.group({
      branchId: [null],
      name: ["", [Validators.required, Validators.maxLength(100)]],
      nameAr: ["", [Validators.maxLength(100)]]
    });
    this.formValid.set(this.form.valid);
    this.formDirty.set(this.form.dirty);
    this.form.statusChanges.subscribe(() => {
      this.formValid.set(this.form.valid);
    });
    this.form.valueChanges.subscribe(() => {
      this.formDirty.set(this.form.dirty);
    });
    if (this.isEdit && this.vacationType) {
      this.populateForm();
    }
  }
  /**
   * Populate form with existing vacation type data
   */
  populateForm() {
    if (!this.vacationType)
      return;
    this.form.patchValue({
      branchId: this.vacationType.branchId,
      name: this.vacationType.name,
      nameAr: this.vacationType.nameAr
    });
    this.formValid.set(this.form.valid);
    this.formDirty.set(this.form.dirty);
  }
  /**
   * Load available branches for the dropdown
   */
  loadBranches() {
    this.vacationTypesService.getBranches().subscribe({
      next: /* @__PURE__ */ __name((branches) => {
        this.availableBranches.set(branches);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
      }, "error")
    });
  }
  /**
   * Handle form submission
   */
  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.value;
    const requestData = {
      branchId: formValue.branchId || null,
      name: formValue.name.trim(),
      nameAr: formValue.nameAr?.trim() || void 0
    };
    this.loading.set(true);
    if (this.isEdit && this.vacationType) {
      this.vacationTypesService.updateVacationType(this.vacationType.id, requestData).subscribe({
        next: /* @__PURE__ */ __name(() => {
          this.loading.set(false);
          this.notificationService.success(this.i18n.t("vacation_types.success.updated"));
          this.vacationTypeUpdated.emit();
          this.closeModal();
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          this.loading.set(false);
          console.error("Failed to update vacation type:", error);
          if (error.error?.error) {
            this.notificationService.error(error.error.error);
          } else {
            this.notificationService.error(this.i18n.t("vacation_types.errors.update_failed"));
          }
        }, "error")
      });
    } else {
      this.vacationTypesService.createVacationType(requestData).subscribe({
        next: /* @__PURE__ */ __name(() => {
          this.loading.set(false);
          this.notificationService.success(this.i18n.t("vacation_types.success.created"));
          this.vacationTypeCreated.emit();
          this.closeModal();
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          this.loading.set(false);
          console.error("Failed to create vacation type:", error);
          if (error.error?.error) {
            this.notificationService.error(error.error.error);
          } else {
            this.notificationService.error(this.i18n.t("vacation_types.errors.create_failed"));
          }
        }, "error")
      });
    }
  }
  /**
   * Handle modal close
   */
  onCancel() {
    this.isOpen.set(false);
    this.form.reset();
    this.initializeForm();
    this.formValid.set(this.form.valid);
    this.formDirty.set(this.form.dirty);
    this.modalClose.emit();
  }
  /**
   * Get field error message
   */
  getFieldError(fieldName) {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched) {
      return null;
    }
    const errors = field.errors;
    if (errors["required"]) {
      return this.i18n.t("validation.field_required");
    }
    if (errors["maxlength"]) {
      return this.i18n.t("validation.max_length");
    }
    return this.i18n.t("validation.invalid_field");
  }
  /**
   * Check if field has error
   */
  hasFieldError(fieldName) {
    const field = this.form.get(fieldName);
    return !!(field && field.errors && field.touched);
  }
  /**
   * Open modal with vacation type data
   */
  openModal(vacationType, mode = "create") {
    this.vacationType = vacationType;
    this.isEdit = mode === "edit";
    this.isView = mode === "view";
    this.isOpen.set(true);
    if (!this.isView) {
      this.initializeForm();
    }
  }
  /**
   * Close modal
   */
  closeModal() {
    this.isOpen.set(false);
    if (!this.isView) {
      this.form.reset();
      this.initializeForm();
      this.formValid.set(this.form.valid);
      this.formDirty.set(this.form.dirty);
    }
    this.modalClose.emit();
  }
  /**
   * Get branch name by ID
   */
  getBranchName() {
    if (!this.vacationType?.branchId)
      return null;
    const branch = this.availableBranches().find((b) => b.id === this.vacationType?.branchId);
    return branch?.name || null;
  }
};
__name(_VacationTypeModalComponent, "VacationTypeModalComponent");
__publicField(_VacationTypeModalComponent, "\u0275fac", /* @__PURE__ */ __name(function VacationTypeModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _VacationTypeModalComponent)();
}, "VacationTypeModalComponent_Factory"));
__publicField(_VacationTypeModalComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VacationTypeModalComponent, selectors: [["app-vacation-type-modal"]], inputs: { vacationType: "vacationType", isEdit: "isEdit", isView: "isView", isOpen: "isOpen" }, outputs: { modalClose: "modalClose", vacationTypeCreated: "vacationTypeCreated", vacationTypeUpdated: "vacationTypeUpdated" }, decls: 7, vars: 6, consts: [[3, "close", "show", "title", "centered", "loading"], [1, "modal-body"], [1, "vacation-type-details"], [1, "vacation-type-form", 3, "formGroup"], ["modal-footer", "", 1, "d-flex", "gap-2", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary"], [1, "row"], [1, "col-md-12", "mb-3"], [1, "form-label", "fw-bold"], [1, "form-control-plaintext"], [1, "col-md-6", "mb-3"], ["dir", "rtl", 1, "form-control-plaintext"], [3, "status", "label", "showIcon"], [1, "vacation-type-form", 3, "ngSubmit", "formGroup"], [1, "form-label"], ["formControlName", "branchId", 1, "form-select"], ["value", ""], [3, "value"], [1, "invalid-feedback"], [1, "form-label", "required"], ["type", "text", "formControlName", "name", "maxlength", "100", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "nameAr", "maxlength", "100", "dir", "rtl", 1, "form-control", 3, "placeholder"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: /* @__PURE__ */ __name(function VacationTypeModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-modal-wrapper", 0);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function VacationTypeModalComponent_Template_app_modal_wrapper_close_0_listener() {
      return ctx.onCancel();
    }, "VacationTypeModalComponent_Template_app_modal_wrapper_close_0_listener"));
    \u0275\u0275elementStart(1, "div", 1);
    \u0275\u0275conditionalCreate(2, VacationTypeModalComponent_Conditional_2_Template, 28, 15, "div", 2)(3, VacationTypeModalComponent_Conditional_3_Template, 21, 16, "form", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275conditionalCreate(5, VacationTypeModalComponent_Conditional_5_Template, 2, 1, "button", 5)(6, VacationTypeModalComponent_Conditional_6_Template, 5, 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275property("show", ctx.isOpen())("title", ctx.isView ? ctx.i18n.t("vacation_types.view_details") : ctx.isEdit ? ctx.i18n.t("vacation_types.edit_vacation_type") : ctx.i18n.t("vacation_types.create_vacation_type"))("centered", true)("loading", ctx.loading());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.isView ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.isView ? 5 : 6);
  }
}, "VacationTypeModalComponent_Template"), dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, StatusBadgeComponent, ModalWrapperComponent, DatePipe], styles: ['\n\n.required[_ngcontent-%COMP%]::after {\n  content: " *";\n  color: red;\n}\n/*# sourceMappingURL=vacation-type-modal.component.css.map */'] }));
var VacationTypeModalComponent = _VacationTypeModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VacationTypeModalComponent, [{
    type: Component,
    args: [{ selector: "app-vacation-type-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, StatusBadgeComponent, ModalWrapperComponent], template: `
    <app-modal-wrapper
      [show]="isOpen()"
      [title]="isView ? i18n.t('vacation_types.view_details') : (isEdit ? i18n.t('vacation_types.edit_vacation_type') : i18n.t('vacation_types.create_vacation_type'))"
      [centered]="true"
      [loading]="loading()"
      (close)="onCancel()">

      <div class="modal-body">
            @if (isView) {
              <!-- View Mode - Read-only display -->
              <div class="vacation-type-details">
                <div class="row">
                  <!-- Branch -->
                  <div class="col-md-12 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.branch') }}</label>
                    <p class="form-control-plaintext">{{ getBranchName() || i18n.t('vacation_types.all_branches') }}</p>
                  </div>

                  <!-- Name -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.name') }}</label>
                    <p class="form-control-plaintext">{{ vacationType?.name }}</p>
                  </div>

                  <!-- Arabic Name -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.name_ar') }}</label>
                    <p class="form-control-plaintext" dir="rtl">{{ vacationType?.nameAr || i18n.t('common.not_specified') }}</p>
                  </div>

                  <!-- Status -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.column_status') }}</label>
                    <p class="form-control-plaintext">
                      <app-status-badge
                        [status]="vacationType?.isActive ? 'active' : 'inactive'"
                        [label]="vacationType?.isActive ? i18n.t('common.active') : i18n.t('common.inactive')"
                        [showIcon]="true">
                      </app-status-badge>
                    </p>
                  </div>

                  <!-- Created At -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.created_at') }}</label>
                    <p class="form-control-plaintext">{{ vacationType?.createdAtUtc | date:'medium' }}</p>
                  </div>
                </div>
              </div>
            } @else {
              <!-- Edit/Create Mode - Form -->
              <form [formGroup]="form" (ngSubmit)="onSubmit()" class="vacation-type-form">
                <div class="row">
                  <!-- Branch Selection -->
                  <div class="col-md-12 mb-3">
                    <label class="form-label">{{ i18n.t('vacation_types.branch') }}</label>
                    <select
                      class="form-select"
                      formControlName="branchId"
                      [class.is-invalid]="hasFieldError('branchId')"
                    >
                      <option value="">{{ i18n.t('vacation_types.all_branches') }}</option>
                      @for (branch of availableBranches(); track branch.id) {
                        <option [value]="branch.id">{{ branch.name }}</option>
                      }
                    </select>
                    @if (hasFieldError('branchId')) {
                      <div class="invalid-feedback">
                        {{ getFieldError('branchId') }}
                      </div>
                    }
                  </div>

                  <!-- Name -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label required">{{ i18n.t('vacation_types.name') }}</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="name"
                      [class.is-invalid]="hasFieldError('name')"
                      [placeholder]="i18n.t('vacation_types.name_placeholder')"
                      maxlength="100"
                    />
                    @if (hasFieldError('name')) {
                      <div class="invalid-feedback">
                        {{ getFieldError('name') }}
                      </div>
                    }
                  </div>

                  <!-- Arabic Name -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label">{{ i18n.t('vacation_types.name_ar') }}</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="nameAr"
                      [class.is-invalid]="hasFieldError('nameAr')"
                      [placeholder]="i18n.t('vacation_types.name_ar_placeholder')"
                      maxlength="100"
                      dir="rtl"
                    />
                    @if (hasFieldError('nameAr')) {
                      <div class="invalid-feedback">
                        {{ getFieldError('nameAr') }}
                      </div>
                    }
                  </div>
                </div>
              </form>
            }
      </div>

      <div modal-footer class="d-flex gap-2 justify-content-end">
        @if (isView) {
          <!-- View Mode - Only Close button -->
          <button
            type="button"
            class="btn btn-secondary"
            (click)="onCancel()"
          >
            {{ i18n.t('common.close') }}
          </button>
        } @else {
          <!-- Edit/Create Mode - Cancel and Save buttons -->
          <button
            type="button"
            class="btn btn-secondary"
            (click)="onCancel()"
            [disabled]="loading()"
          >
            {{ i18n.t('common.cancel') }}
          </button>

          <button
            type="button"
            class="btn btn-primary"
            (click)="onSubmit()"
            [disabled]="!isFormValid() || loading()"
          >
            @if (loading()) {
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            }
            {{ isEdit ? i18n.t('common.update') : i18n.t('common.create') }}
          </button>
        }
      </div>
    </app-modal-wrapper>
  `, styles: ['/* angular:styles/component:css;e8171b9692b96c7b745382622623e329ba5a7786594dd1848a83906d2e2959f7;D:/Work/TimeAttendanceSystem/time-attendance-frontend/src/app/pages/vacation-types/vacation-type-modal/vacation-type-modal.component.ts */\n.required::after {\n  content: " *";\n  color: red;\n}\n/*# sourceMappingURL=vacation-type-modal.component.css.map */\n'] }]
  }], null, { vacationType: [{
    type: Input
  }], isEdit: [{
    type: Input
  }], isView: [{
    type: Input
  }], isOpen: [{
    type: Input
  }], modalClose: [{
    type: Output
  }], vacationTypeCreated: [{
    type: Output
  }], vacationTypeUpdated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VacationTypeModalComponent, { className: "VacationTypeModalComponent", filePath: "src/app/pages/vacation-types/vacation-type-modal/vacation-type-modal.component.ts", lineNumber: 183 });
})();

// src/app/shared/components/error-alert/error-alert.component.ts
var _c0 = ["*"];
function ErrorAlertComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h5", 4);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
__name(ErrorAlertComponent_Conditional_5_Template, "ErrorAlertComponent_Conditional_5_Template");
function ErrorAlertComponent_Conditional_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 11)(1, "small", 12);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.details);
  }
}
__name(ErrorAlertComponent_Conditional_8_Conditional_4_Template, "ErrorAlertComponent_Conditional_8_Conditional_4_Template");
function ErrorAlertComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 6)(1, "button", 10);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function ErrorAlertComponent_Conditional_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleDetails());
    }, "ErrorAlertComponent_Conditional_8_Template_button_click_1_listener"));
    \u0275\u0275domElement(2, "i");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(4, ErrorAlertComponent_Conditional_8_Conditional_4_Template, 3, 1, "div", 11);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.detailsExpanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.detailsExpanded ? "Hide details" : "Show details", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.detailsExpanded ? 4 : -1);
  }
}
__name(ErrorAlertComponent_Conditional_8_Template, "ErrorAlertComponent_Conditional_8_Template");
function ErrorAlertComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 7)(1, "button", 13);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function ErrorAlertComponent_Conditional_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onRetry());
    }, "ErrorAlertComponent_Conditional_9_Template_button_click_1_listener"));
    \u0275\u0275domElement(2, "i", 14);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap("btn btn-sm btn-" + ctx_r0.variant);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.retryText, " ");
  }
}
__name(ErrorAlertComponent_Conditional_9_Template, "ErrorAlertComponent_Conditional_9_Template");
function ErrorAlertComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 15);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function ErrorAlertComponent_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDismiss());
    }, "ErrorAlertComponent_Conditional_12_Template_button_click_0_listener"));
    \u0275\u0275domElementEnd();
  }
}
__name(ErrorAlertComponent_Conditional_12_Template, "ErrorAlertComponent_Conditional_12_Template");
var _ErrorAlertComponent = class _ErrorAlertComponent {
  message = "An error occurred";
  title;
  icon = "fa-solid fa-exclamation-triangle";
  dismissible = true;
  showRetry = false;
  retryText = "Retry";
  details;
  // Additional error details
  showDetails = false;
  // Show/hide details toggle
  variant = "danger";
  dismiss = new EventEmitter();
  retry = new EventEmitter();
  detailsExpanded = false;
  onDismiss() {
    this.dismiss.emit();
  }
  onRetry() {
    this.retry.emit();
  }
  toggleDetails() {
    this.detailsExpanded = !this.detailsExpanded;
  }
  getAlertClasses() {
    const classes = ["alert"];
    classes.push(`alert-${this.variant}`);
    if (this.dismissible) {
      classes.push("alert-dismissible");
    }
    return classes.join(" ");
  }
};
__name(_ErrorAlertComponent, "ErrorAlertComponent");
__publicField(_ErrorAlertComponent, "\u0275fac", /* @__PURE__ */ __name(function ErrorAlertComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ErrorAlertComponent)();
}, "ErrorAlertComponent_Factory"));
__publicField(_ErrorAlertComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ErrorAlertComponent, selectors: [["app-error-alert"]], inputs: { message: "message", title: "title", icon: "icon", dismissible: "dismissible", showRetry: "showRetry", retryText: "retryText", details: "details", showDetails: "showDetails", variant: "variant" }, outputs: { dismiss: "dismiss", retry: "retry" }, ngContentSelectors: _c0, decls: 13, vars: 9, consts: [["role", "alert"], [1, "d-flex", "align-items-start"], [1, "alert-icon", "me-3"], [1, "flex-grow-1"], [1, "alert-heading", "mb-2"], [1, "alert-message"], [1, "alert-details", "mt-2"], [1, "alert-actions", "mt-3"], [1, "alert-custom-content", "mt-2"], ["type", "button", "aria-label", "Close", 1, "btn-close"], ["type", "button", 1, "btn", "btn-sm", "btn-link", "p-0", "text-decoration-none", 3, "click"], [1, "alert-details-content", "mt-2", "p-2", "bg-light", "rounded"], [1, "font-monospace"], ["type", "button", 3, "click"], [1, "fa-solid", "fa-refresh", "me-1"], ["type", "button", "aria-label", "Close", 1, "btn-close", 3, "click"]], template: /* @__PURE__ */ __name(function ErrorAlertComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef();
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275domElement(3, "i");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div", 3);
    \u0275\u0275conditionalCreate(5, ErrorAlertComponent_Conditional_5_Template, 2, 1, "h5", 4);
    \u0275\u0275domElementStart(6, "div", 5);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(8, ErrorAlertComponent_Conditional_8_Template, 5, 4, "div", 6);
    \u0275\u0275conditionalCreate(9, ErrorAlertComponent_Conditional_9_Template, 4, 3, "div", 7);
    \u0275\u0275domElementStart(10, "div", 8);
    \u0275\u0275projection(11);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(12, ErrorAlertComponent_Conditional_12_Template, 1, 0, "button", 9);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.getAlertClasses());
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx.icon + " fa-lg");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.title ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.message, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.details && ctx.showDetails ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showRetry ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.dismissible ? 12 : -1);
  }
}, "ErrorAlertComponent_Template"), styles: ["\n\n.alert[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.alert-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  line-height: 1;\n}\n.alert-heading[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.alert-message[_ngcontent-%COMP%] {\n  line-height: 1.5;\n}\n.alert-details[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n}\n.alert-details-content[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n  word-break: break-word;\n}\n.alert-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.btn-close[_ngcontent-%COMP%] {\n  align-self: flex-start;\n}\n.alert[_ngcontent-%COMP%] {\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  color: #842029;\n  background-color: #f8d7da;\n  border-color: #f5c2c7;\n}\n.alert-warning[_ngcontent-%COMP%] {\n  color: #664d03;\n  background-color: #fff3cd;\n  border-color: #ffecb5;\n}\n/*# sourceMappingURL=error-alert.component.css.map */"] }));
var ErrorAlertComponent = _ErrorAlertComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorAlertComponent, [{
    type: Component,
    args: [{ selector: "app-error-alert", standalone: true, imports: [], template: `<div [class]="getAlertClasses()" role="alert">\r
  <div class="d-flex align-items-start">\r
    <!-- Icon -->\r
    <div class="alert-icon me-3">\r
      <i [class]="icon + ' fa-lg'"></i>\r
    </div>\r
\r
    <!-- Content -->\r
    <div class="flex-grow-1">\r
      <!-- Title -->\r
      @if (title) {\r
        <h5 class="alert-heading mb-2">{{ title }}</h5>\r
      }\r
\r
      <!-- Message -->\r
      <div class="alert-message">\r
        {{ message }}\r
      </div>\r
\r
      <!-- Details (collapsible) -->\r
      @if (details && showDetails) {\r
        <div class="alert-details mt-2">\r
          <button\r
            type="button"\r
            class="btn btn-sm btn-link p-0 text-decoration-none"\r
            (click)="toggleDetails()">\r
            <i [class]="detailsExpanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>\r
            {{ detailsExpanded ? 'Hide details' : 'Show details' }}\r
          </button>\r
\r
          @if (detailsExpanded) {\r
            <div class="alert-details-content mt-2 p-2 bg-light rounded">\r
              <small class="font-monospace">{{ details }}</small>\r
            </div>\r
          }\r
        </div>\r
      }\r
\r
      <!-- Actions -->\r
      @if (showRetry) {\r
        <div class="alert-actions mt-3">\r
          <button\r
            type="button"\r
            [class]="'btn btn-sm btn-' + variant"\r
            (click)="onRetry()">\r
            <i class="fa-solid fa-refresh me-1"></i>\r
            {{ retryText }}\r
          </button>\r
        </div>\r
      }\r
\r
      <!-- Custom content slot -->\r
      <div class="alert-custom-content mt-2">\r
        <ng-content></ng-content>\r
      </div>\r
    </div>\r
\r
    <!-- Dismiss Button -->\r
    @if (dismissible) {\r
      <button\r
        type="button"\r
        class="btn-close"\r
        (click)="onDismiss()"\r
        aria-label="Close">\r
      </button>\r
    }\r
  </div>\r
</div>`, styles: ["/* src/app/shared/components/error-alert/error-alert.component.css */\n.alert {\n  margin-bottom: 1rem;\n}\n.alert-icon {\n  flex-shrink: 0;\n  line-height: 1;\n}\n.alert-heading {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.alert-message {\n  line-height: 1.5;\n}\n.alert-details {\n  margin-top: 0.75rem;\n}\n.alert-details-content {\n  max-height: 200px;\n  overflow-y: auto;\n  word-break: break-word;\n}\n.alert-actions {\n  display: flex;\n  gap: 0.5rem;\n}\n.btn-close {\n  align-self: flex-start;\n}\n.alert {\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n.alert-danger {\n  color: #842029;\n  background-color: #f8d7da;\n  border-color: #f5c2c7;\n}\n.alert-warning {\n  color: #664d03;\n  background-color: #fff3cd;\n  border-color: #ffecb5;\n}\n/*# sourceMappingURL=error-alert.component.css.map */\n"] }]
  }], null, { message: [{
    type: Input
  }], title: [{
    type: Input
  }], icon: [{
    type: Input
  }], dismissible: [{
    type: Input
  }], showRetry: [{
    type: Input
  }], retryText: [{
    type: Input
  }], details: [{
    type: Input
  }], showDetails: [{
    type: Input
  }], variant: [{
    type: Input
  }], dismiss: [{
    type: Output
  }], retry: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ErrorAlertComponent, { className: "ErrorAlertComponent", filePath: "src/app/shared/components/error-alert/error-alert.component.ts", lineNumber: 11 });
})();

// src/app/pages/vacation-types/vacation-types.component.ts
var _c02 = /* @__PURE__ */ __name(() => [], "_c0");
function VacationTypesComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-error-alert", 8);
    \u0275\u0275listener("retry", /* @__PURE__ */ __name(function VacationTypesComponent_Conditional_3_Template_app_error_alert_retry_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadVacationTypes());
    }, "VacationTypesComponent_Conditional_3_Template_app_error_alert_retry_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx)("showRetry", true)("retryText", ctx_r2.i18n.t("common.retry"));
  }
}
__name(VacationTypesComponent_Conditional_3_Template, "VacationTypesComponent_Conditional_3_Template");
function VacationTypesComponent_ng_template_6_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.nameAr);
  }
}
__name(VacationTypesComponent_ng_template_6_Conditional_0_Conditional_3_Template, "VacationTypesComponent_ng_template_6_Conditional_0_Conditional_3_Template");
function VacationTypesComponent_ng_template_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, VacationTypesComponent_ng_template_6_Conditional_0_Conditional_3_Template, 2, 1, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r4.nameAr ? 3 : -1);
  }
}
__name(VacationTypesComponent_ng_template_6_Conditional_0_Template, "VacationTypesComponent_ng_template_6_Conditional_0_Template");
function VacationTypesComponent_ng_template_6_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" ", item_r4.branchName || "Branch " + item_r4.branchId, " ");
  }
}
__name(VacationTypesComponent_ng_template_6_Conditional_1_Conditional_0_Template, "VacationTypesComponent_ng_template_6_Conditional_1_Conditional_0_Template");
function VacationTypesComponent_ng_template_6_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.i18n.t("common.company_wide"), " ");
  }
}
__name(VacationTypesComponent_ng_template_6_Conditional_1_Conditional_1_Template, "VacationTypesComponent_ng_template_6_Conditional_1_Conditional_1_Template");
function VacationTypesComponent_ng_template_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, VacationTypesComponent_ng_template_6_Conditional_1_Conditional_0_Template, 1, 1)(1, VacationTypesComponent_ng_template_6_Conditional_1_Conditional_1_Template, 1, 1);
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(item_r4.branchId ? 0 : 1);
  }
}
__name(VacationTypesComponent_ng_template_6_Conditional_1_Template, "VacationTypesComponent_ng_template_6_Conditional_1_Template");
function VacationTypesComponent_ng_template_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-status-badge", 9);
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("status", item_r4.isActive ? "active" : "inactive")("label", ctx_r2.getStatusText(item_r4.isActive));
  }
}
__name(VacationTypesComponent_ng_template_6_Conditional_2_Template, "VacationTypesComponent_ng_template_6_Conditional_2_Template");
function VacationTypesComponent_ng_template_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, item_r4.createdAtUtc, "short"), " ");
  }
}
__name(VacationTypesComponent_ng_template_6_Conditional_3_Template, "VacationTypesComponent_ng_template_6_Conditional_3_Template");
function VacationTypesComponent_ng_template_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    const item_r4 = ctx_r4.$implicit;
    const column_r6 = ctx_r4.column;
    \u0275\u0275textInterpolate1(" ", item_r4[column_r6.key], " ");
  }
}
__name(VacationTypesComponent_ng_template_6_Conditional_4_Template, "VacationTypesComponent_ng_template_6_Conditional_4_Template");
function VacationTypesComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, VacationTypesComponent_ng_template_6_Conditional_0_Template, 4, 2, "div")(1, VacationTypesComponent_ng_template_6_Conditional_1_Template, 2, 1)(2, VacationTypesComponent_ng_template_6_Conditional_2_Template, 1, 2, "app-status-badge", 9)(3, VacationTypesComponent_ng_template_6_Conditional_3_Template, 2, 4)(4, VacationTypesComponent_ng_template_6_Conditional_4_Template, 1, 1);
  }
  if (rf & 2) {
    const column_r6 = ctx.column;
    \u0275\u0275conditional(column_r6.key === "name" ? 0 : column_r6.key === "branchName" ? 1 : column_r6.key === "isActive" ? 2 : column_r6.key === "createdAtUtc" ? 3 : 4);
  }
}
__name(VacationTypesComponent_ng_template_6_Template, "VacationTypesComponent_ng_template_6_Template");
var _VacationTypesComponent = class _VacationTypesComponent {
  vacationTypesService = inject(VacationTypesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  vacationTypeModal;
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  selectedBranchId = signal(null, ...ngDevMode ? [{ debugName: "selectedBranchId" }] : []);
  selectedStatus = signal(null, ...ngDevMode ? [{ debugName: "selectedStatus" }] : []);
  // Available options for filters
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  // Service signals
  vacationTypes = this.vacationTypesService.vacationTypes;
  pagedResult = this.vacationTypesService.pagedResult;
  error = this.vacationTypesService.error;
  // Table configuration
  tableColumns = [
    { key: "name", label: this.i18n.t("vacation_types.name"), sortable: true, width: "30%" },
    { key: "branchName", label: this.i18n.t("vacation_types.branch"), sortable: true, width: "25%" },
    { key: "isActive", label: this.i18n.t("vacation_types.column_status"), width: "15%" },
    { key: "createdAtUtc", label: this.i18n.t("vacation_types.created_at"), sortable: true, width: "20%" }
  ];
  // Table actions configuration
  tableActions = [
    {
      key: "view",
      label: this.i18n.t("common.view"),
      icon: "fa-eye",
      color: "primary"
    },
    {
      key: "edit",
      label: this.i18n.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name((item) => this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE), "condition")
    },
    {
      key: "toggle",
      label: this.i18n.t("common.activate"),
      icon: "fa-check",
      color: "success",
      condition: /* @__PURE__ */ __name((item) => this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE) && !item.isActive, "condition")
    },
    {
      key: "toggle",
      label: this.i18n.t("common.deactivate"),
      icon: "fa-ban",
      color: "warning",
      condition: /* @__PURE__ */ __name((item) => this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE) && item.isActive, "condition")
    },
    {
      key: "delete",
      label: this.i18n.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name((item) => this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_DELETE), "condition")
    }
  ];
  // Permission constants
  PERMISSIONS = {
    VACATION_TYPE_READ: `${PermissionResources.VACATION_TYPE}.${PermissionActions.READ}`,
    VACATION_TYPE_CREATE: `${PermissionResources.VACATION_TYPE}.${PermissionActions.CREATE}`,
    VACATION_TYPE_UPDATE: `${PermissionResources.VACATION_TYPE}.${PermissionActions.UPDATE}`,
    VACATION_TYPE_DELETE: `${PermissionResources.VACATION_TYPE}.${PermissionActions.DELETE}`
  };
  // Computed signals
  totalItems = computed(() => this.pagedResult()?.totalCount ?? 0, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  totalPages = computed(() => {
    const result = this.pagedResult();
    if (!result || result.pageSize === 0)
      return 1;
    return Math.ceil(result.totalCount / result.pageSize);
  }, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Current filter as computed signal
  currentFilter = computed(() => ({
    search: this.searchTerm() || void 0,
    branchId: this.selectedBranchId() ?? void 0,
    isActive: this.selectedStatus() ?? void 0
  }), ...ngDevMode ? [{ debugName: "currentFilter" }] : []);
  // Math reference for template use
  Math = Math;
  constructor() {
    effect(() => {
      const filter = this.currentFilter();
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadVacationTypes(__spreadValues({
        page,
        pageSize: size
      }, filter));
    });
  }
  ngOnInit() {
    this.loadBranches();
    this.loadVacationTypes();
  }
  /**
   * Load vacation types with current filter and pagination
   */
  loadVacationTypes(params) {
    this.loading.set(true);
    const queryParams = __spreadValues(__spreadValues({
      page: this.currentPage(),
      pageSize: this.pageSize()
    }, this.currentFilter()), params);
    this.vacationTypesService.getVacationTypes(queryParams).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        this.notificationService.error(this.i18n.t("vacation_types.errors.load_failed"));
        console.error("Failed to load vacation types:", error);
      }, "error")
    });
  }
  /**
   * Load available branches for filtering
   */
  loadBranches() {
    this.vacationTypesService.getBranches().subscribe({
      next: /* @__PURE__ */ __name((branches) => {
        this.availableBranches.set(branches);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
        this.notificationService.error(this.i18n.t("branches.errors.load_failed"));
      }, "error")
    });
  }
  /**
   * Handle search input changes
   */
  onSearchChange(searchTerm) {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
  }
  /**
   * Handle search input changes from unified filter
   */
  onSearchTermChange(searchTerm) {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
  }
  /**
   * Handle filters change from unified filter component
   */
  onFiltersChange(filters) {
    if (filters.search !== void 0) {
      this.searchTerm.set(filters.search || "");
    }
    if (filters.branchId !== void 0) {
      const branchId = filters.branchId ? parseInt(filters.branchId) : null;
      this.selectedBranchId.set(branchId);
    }
    if (filters.isActive !== void 0) {
      const isActive = filters.isActive === "true" ? true : filters.isActive === "false" ? false : null;
      this.selectedStatus.set(isActive);
    }
    this.currentPage.set(1);
  }
  /**
   * Handle branch filter change
   */
  onBranchChange(branchId) {
    this.selectedBranchId.set(branchId);
    this.currentPage.set(1);
  }
  /**
   * Handle status filter change
   */
  onStatusChange(isActive) {
    this.selectedStatus.set(isActive);
    this.currentPage.set(1);
  }
  /**
   * Clear all filters
   */
  onClearFilters() {
    this.searchTerm.set("");
    this.selectedBranchId.set(null);
    this.selectedStatus.set(null);
    this.currentPage.set(1);
  }
  /**
   * Refresh data by clearing filters and reloading
   */
  onRefreshData() {
    this.onClearFilters();
    this.loadVacationTypes();
  }
  /**
   * Handle page change
   */
  onPageChange(page) {
    this.currentPage.set(page);
  }
  /**
   * Handle page size change
   */
  onPageSizeChange(pageSize) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
  }
  /**
   * Open create vacation type modal
   */
  onCreateVacationType() {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_CREATE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    this.vacationTypeModal.openModal(void 0, "create");
  }
  /**
   * View vacation type details
   */
  onViewVacationType(vacationType) {
    const vacationTypeDetail = __spreadProps(__spreadValues({}, vacationType), {
      canBeModified: true,
      canBeDeleted: true
    });
    this.vacationTypeModal.openModal(vacationTypeDetail, "view");
  }
  /**
   * Edit vacation type
   */
  onEditVacationType(vacationType) {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    const vacationTypeDetail = __spreadProps(__spreadValues({}, vacationType), {
      canBeModified: true,
      canBeDeleted: true
    });
    this.vacationTypeModal.openModal(vacationTypeDetail, "edit");
  }
  /**
   * Toggle vacation type status
   */
  onToggleStatus(vacationType) {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    const action = vacationType.isActive ? "deactivate" : "activate";
    const message = this.i18n.t(`vacation_types.confirm_${action}`).replace("{{name}}", vacationType.name);
    this.confirmationService.confirm({
      title: this.i18n.t(`vacation_types.${action}_vacation_type`),
      message,
      confirmText: this.i18n.t(`common.${action}`),
      cancelText: this.i18n.t("common.cancel")
    }).then((result) => {
      if (result.confirmed) {
        this.vacationTypesService.toggleVacationTypeStatus(vacationType.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            const successMessage = vacationType.isActive ? this.i18n.t("vacation_types.success.deactivated") : this.i18n.t("vacation_types.success.activated");
            this.notificationService.success(successMessage);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to toggle vacation type status:", error);
            this.notificationService.error(this.i18n.t("vacation_types.errors.status_toggle_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Delete vacation type
   */
  onDeleteVacationType(vacationType) {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_DELETE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    this.confirmationService.confirm({
      title: this.i18n.t("vacation_types.delete_vacation_type"),
      message: this.i18n.t("vacation_types.confirm_delete"),
      confirmText: this.i18n.t("common.delete"),
      cancelText: this.i18n.t("common.cancel"),
      confirmButtonClass: "btn-danger"
    }).then((result) => {
      if (result.confirmed) {
        this.vacationTypesService.deleteVacationType(vacationType.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("vacation_types.success.deleted"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete vacation type:", error);
            this.notificationService.error(this.i18n.t("vacation_types.errors.delete_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Handle table actions
   */
  onTableAction(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onViewVacationType(item);
        break;
      case "edit":
        this.onEditVacationType(item);
        break;
      case "toggle":
        this.onToggleStatus(item);
        break;
      case "delete":
        this.onDeleteVacationType(item);
        break;
    }
  }
  /**
   * Get badge class for status
   */
  getStatusBadgeClass(isActive) {
    return isActive ? "bg-success" : "bg-secondary";
  }
  /**
   * Get status text
   */
  getStatusText(isActive) {
    return isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive");
  }
  /**
   * Handle vacation type created
   */
  onVacationTypeCreated() {
    this.loadVacationTypes();
  }
  /**
   * Handle vacation type updated
   */
  onVacationTypeUpdated() {
    this.loadVacationTypes();
  }
};
__name(_VacationTypesComponent, "VacationTypesComponent");
__publicField(_VacationTypesComponent, "\u0275fac", /* @__PURE__ */ __name(function VacationTypesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _VacationTypesComponent)();
}, "VacationTypesComponent_Factory"));
__publicField(_VacationTypesComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VacationTypesComponent, selectors: [["app-vacation-types"]], viewQuery: /* @__PURE__ */ __name(function VacationTypesComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(VacationTypeModalComponent, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.vacationTypeModal = _t.first);
  }
}, "VacationTypesComponent_Query"), decls: 9, vars: 18, consts: [["cellTemplate", ""], [1, "app-list-page"], [3, "title"], ["moduleName", "vacation-types", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [3, "message", "showRetry", "retryText"], [3, "title", "showHeader", "bodyClass"], [3, "actionClick", "pageChange", "pageSizeChange", "data", "columns", "actions", "currentPage", "totalPages", "totalItems", "pageSize", "loading", "emptyTitle", "emptyMessage", "showPagination"], [3, "modalClose", "vacationTypeCreated", "vacationTypeUpdated"], [3, "retry", "message", "showRetry", "retryText"], [3, "status", "label"], [1, "fw-medium"], [1, "text-muted", "small"]], template: /* @__PURE__ */ __name(function VacationTypesComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-page-header", 2);
    \u0275\u0275elementStart(2, "app-unified-filter", 3);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSearchTermChange($event));
    }, "VacationTypesComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onFiltersChange($event));
    }, "VacationTypesComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_unified_filter_add_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onCreateVacationType());
    }, "VacationTypesComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_unified_filter_refresh_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onRefreshData());
    }, "VacationTypesComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, VacationTypesComponent_Conditional_3_Template, 1, 3, "app-error-alert", 4);
    \u0275\u0275elementStart(4, "app-section-card", 5)(5, "app-data-table", 6);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_data_table_actionClick_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onTableAction($event));
    }, "VacationTypesComponent_Template_app_data_table_actionClick_5_listener"))("pageChange", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_data_table_pageChange_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageChange($event));
    }, "VacationTypesComponent_Template_app_data_table_pageChange_5_listener"))("pageSizeChange", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_data_table_pageSizeChange_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageSizeChange($event));
    }, "VacationTypesComponent_Template_app_data_table_pageSizeChange_5_listener"));
    \u0275\u0275template(6, VacationTypesComponent_ng_template_6_Template, 5, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "app-vacation-type-modal", 7);
    \u0275\u0275listener("modalClose", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_vacation_type_modal_modalClose_8_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.loadVacationTypes());
    }, "VacationTypesComponent_Template_app_vacation_type_modal_modalClose_8_listener"))("vacationTypeCreated", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_vacation_type_modal_vacationTypeCreated_8_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onVacationTypeCreated());
    }, "VacationTypesComponent_Template_app_vacation_type_modal_vacationTypeCreated_8_listener"))("vacationTypeUpdated", /* @__PURE__ */ __name(function VacationTypesComponent_Template_app_vacation_type_modal_vacationTypeUpdated_8_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onVacationTypeUpdated());
    }, "VacationTypesComponent_Template_app_vacation_type_modal_vacationTypeUpdated_8_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("vacation_types.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx.error()) ? 3 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("vacation_types.title"))("showHeader", false)("bodyClass", "p-0");
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx.vacationTypes() || \u0275\u0275pureFunction0(17, _c02))("columns", ctx.tableColumns)("actions", ctx.tableActions)("currentPage", ctx.currentPage)("totalPages", ctx.totalPages)("totalItems", ctx.totalItems)("pageSize", ctx.pageSize)("loading", ctx.loading)("emptyTitle", ctx.i18n.t("vacation_types.no_vacation_types"))("emptyMessage", ctx.i18n.t("vacation_types.no_vacation_types_message"))("showPagination", true);
  }
}, "VacationTypesComponent_Template"), dependencies: [
  CommonModule,
  VacationTypeModalComponent,
  DataTableComponent,
  PageHeaderComponent,
  UnifiedFilterComponent,
  ErrorAlertComponent,
  SectionCardComponent,
  StatusBadgeComponent,
  DatePipe
], styles: ["\n\n.vacation-types-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.vacation-types-page[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-weight: 600;\n}\n.vacation-types-page[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.card[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border: 1px solid #ced4da;\n  border-radius: 6px;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.input-group-text[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border: 1px solid #ced4da;\n  color: #6c757d;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 6px;\n  font-weight: 500;\n  transition: all 0.15s ease-in-out;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #0056b3;\n  border-color: #0056b3;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  border-color: #6c757d;\n  color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: #fff;\n}\n.table[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n  font-weight: 600;\n  color: #495057;\n  padding: 1rem 0.75rem;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem 0.75rem;\n  vertical-align: middle;\n  border-bottom: 1px solid #f1f3f4;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.cursor-pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.vacation-type-color[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border-radius: 3px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  flex-shrink: 0;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  padding: 0.375rem 0.5rem;\n  border-radius: 4px;\n}\n.badge-success[_ngcontent-%COMP%] {\n  background-color: #28a745;\n  color: #fff;\n}\n.badge-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d;\n  color: #fff;\n}\n.badge-primary[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  color: #fff;\n}\n.badge-info[_ngcontent-%COMP%] {\n  background-color: #17a2b8;\n  color: #fff;\n}\n.badge-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107;\n  color: #212529;\n}\n.badge-light[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  color: #495057;\n  border: 1px solid #dee2e6;\n}\n.dropdown-menu[_ngcontent-%COMP%] {\n  border-radius: 6px;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border: 1px solid #e9ecef;\n}\n.dropdown-item[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  transition: background-color 0.15s ease-in-out;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.dropdown-item.text-danger[_ngcontent-%COMP%]:hover {\n  background-color: #f5c6cb;\n  color: #721c24;\n}\n.fa-check-circle[_ngcontent-%COMP%] {\n  color: #28a745 !important;\n}\n.fa-times-circle[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.fa-dollar-sign[_ngcontent-%COMP%] {\n  color: #28a745 !important;\n}\n.fa-ban[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.pagination[_ngcontent-%COMP%] {\n  --bs-pagination-border-radius: 6px;\n}\n.page-link[_ngcontent-%COMP%] {\n  border-radius: 6px;\n  margin: 0 2px;\n  border: 1px solid #dee2e6;\n  color: #007bff;\n}\n.page-link[_ngcontent-%COMP%]:hover {\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n.page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #6c757d;\n  background-color: #fff;\n  border-color: #dee2e6;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.fa-calendar-times[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 6px;\n  border: 1px solid transparent;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n  color: #721c24;\n}\n.text-muted[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n@media (max-width: 768px) {\n  .vacation-types-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .btn-group[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .dropdown-menu[_ngcontent-%COMP%] {\n    position: absolute !important;\n    transform: none !important;\n  }\n}\n@media (max-width: 576px) {\n  .vacation-types-page[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 0.5rem 0.25rem;\n  }\n  .badge[_ngcontent-%COMP%] {\n    font-size: 0.6875rem;\n    padding: 0.25rem 0.375rem;\n  }\n  .btn-sm[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in-out;\n}\n.table-responsive[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 6px;\n}\n.table-responsive[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 3px;\n}\n.table-responsive[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 3px;\n}\n.table-responsive[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n/*# sourceMappingURL=vacation-types.component.css.map */"] }));
var VacationTypesComponent = _VacationTypesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VacationTypesComponent, [{
    type: Component,
    args: [{ selector: "app-vacation-types", standalone: true, imports: [
      CommonModule,
      VacationTypeModalComponent,
      DataTableComponent,
      PageHeaderComponent,
      UnifiedFilterComponent,
      ErrorAlertComponent,
      SectionCardComponent,
      StatusBadgeComponent
    ], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="i18n.t('vacation_types.title')">\r
  </app-page-header>\r
\r
  <!-- Unified Filter Component -->\r
  <app-unified-filter\r
    moduleName="vacation-types"\r
    [refreshing]="loading()"\r
    (searchChange)="onSearchTermChange($event)"\r
    (filtersChange)="onFiltersChange($event)"\r
    (add)="onCreateVacationType()"\r
    (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- Error Message using ErrorAlertComponent -->\r
  @if (error(); as errorMessage) {\r
    <app-error-alert\r
      [message]="errorMessage"\r
      [showRetry]="true"\r
      [retryText]="i18n.t('common.retry')"\r
      (retry)="loadVacationTypes()">\r
    </app-error-alert>\r
  }\r
\r
  <!-- Vacation Types Table -->\r
  <app-section-card\r
    [title]="i18n.t('vacation_types.title')"\r
    [showHeader]="false"\r
    [bodyClass]="'p-0'">\r
    <app-data-table\r
      [data]="vacationTypes() || []"\r
      [columns]="tableColumns"\r
      [actions]="tableActions"\r
      [currentPage]="currentPage"\r
      [totalPages]="totalPages"\r
      [totalItems]="totalItems"\r
      [pageSize]="pageSize"\r
      [loading]="loading"\r
      [emptyTitle]="i18n.t('vacation_types.no_vacation_types')"\r
      [emptyMessage]="i18n.t('vacation_types.no_vacation_types_message')"\r
      [showPagination]="true"\r
      (actionClick)="onTableAction($event)"\r
      (pageChange)="onPageChange($event)"\r
      (pageSizeChange)="onPageSizeChange($event)"\r
    >\r
      <!-- Custom cell template for vacation type name -->\r
      <ng-template #cellTemplate let-item let-column="column">\r
        @if (column.key === 'name') {\r
          <div>\r
            <div class="fw-medium">{{ item.name }}</div>\r
            @if (item.nameAr) {\r
              <div class="text-muted small">{{ item.nameAr }}</div>\r
            }\r
          </div>\r
        } @else if (column.key === 'branchName') {\r
          @if (item.branchId) {\r
            {{ item.branchName || 'Branch ' + item.branchId }}\r
          } @else {\r
            {{ i18n.t('common.company_wide') }}\r
          }\r
        } @else if (column.key === 'isActive') {\r
          <app-status-badge\r
            [status]="item.isActive ? 'active' : 'inactive'"\r
            [label]="getStatusText(item.isActive)">\r
          </app-status-badge>\r
        } @else if (column.key === 'createdAtUtc') {\r
          {{ item.createdAtUtc | date:'short' }}\r
        } @else {\r
          {{ item[column.key] }}\r
        }\r
      </ng-template>\r
    </app-data-table>\r
  </app-section-card>\r
\r
  <!-- Vacation Type Modal -->\r
  <app-vacation-type-modal\r
    (modalClose)="loadVacationTypes()"\r
    (vacationTypeCreated)="onVacationTypeCreated()"\r
    (vacationTypeUpdated)="onVacationTypeUpdated()"\r
  ></app-vacation-type-modal>\r
</div>`, styles: ["/* src/app/pages/vacation-types/vacation-types.component.css */\n.vacation-types-page {\n  padding: 1.5rem;\n}\n.vacation-types-page h2 {\n  color: #2c3e50;\n  font-weight: 600;\n}\n.vacation-types-page .text-muted {\n  color: #6c757d !important;\n}\n.card {\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-body {\n  padding: 1.5rem;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control,\n.form-select {\n  border: 1px solid #ced4da;\n  border-radius: 6px;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.input-group-text {\n  background-color: #f8f9fa;\n  border: 1px solid #ced4da;\n  color: #6c757d;\n}\n.btn {\n  border-radius: 6px;\n  font-weight: 500;\n  transition: all 0.15s ease-in-out;\n}\n.btn-primary {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.btn-primary:hover {\n  background-color: #0056b3;\n  border-color: #0056b3;\n}\n.btn-outline-secondary {\n  border-color: #6c757d;\n  color: #6c757d;\n}\n.btn-outline-secondary:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: #fff;\n}\n.table {\n  margin-bottom: 0;\n}\n.table thead th {\n  background-color: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n  font-weight: 600;\n  color: #495057;\n  padding: 1rem 0.75rem;\n}\n.table tbody td {\n  padding: 1rem 0.75rem;\n  vertical-align: middle;\n  border-bottom: 1px solid #f1f3f4;\n}\n.table tbody tr:hover {\n  background-color: #f8f9fa;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.vacation-type-color {\n  width: 16px;\n  height: 16px;\n  border-radius: 3px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  flex-shrink: 0;\n}\n.badge {\n  font-size: 0.75rem;\n  font-weight: 500;\n  padding: 0.375rem 0.5rem;\n  border-radius: 4px;\n}\n.badge-success {\n  background-color: #28a745;\n  color: #fff;\n}\n.badge-secondary {\n  background-color: #6c757d;\n  color: #fff;\n}\n.badge-primary {\n  background-color: #007bff;\n  color: #fff;\n}\n.badge-info {\n  background-color: #17a2b8;\n  color: #fff;\n}\n.badge-warning {\n  background-color: #ffc107;\n  color: #212529;\n}\n.badge-light {\n  background-color: #f8f9fa;\n  color: #495057;\n  border: 1px solid #dee2e6;\n}\n.dropdown-menu {\n  border-radius: 6px;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border: 1px solid #e9ecef;\n}\n.dropdown-item {\n  padding: 0.5rem 1rem;\n  transition: background-color 0.15s ease-in-out;\n}\n.dropdown-item:hover {\n  background-color: #f8f9fa;\n}\n.dropdown-item.text-danger:hover {\n  background-color: #f5c6cb;\n  color: #721c24;\n}\n.fa-check-circle {\n  color: #28a745 !important;\n}\n.fa-times-circle {\n  color: #6c757d !important;\n}\n.fa-dollar-sign {\n  color: #28a745 !important;\n}\n.fa-ban {\n  color: #6c757d !important;\n}\n.pagination {\n  --bs-pagination-border-radius: 6px;\n}\n.page-link {\n  border-radius: 6px;\n  margin: 0 2px;\n  border: 1px solid #dee2e6;\n  color: #007bff;\n}\n.page-link:hover {\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n.page-item.active .page-link {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.page-item.disabled .page-link {\n  color: #6c757d;\n  background-color: #fff;\n  border-color: #dee2e6;\n}\n.spinner-border {\n  width: 2rem;\n  height: 2rem;\n}\n.fa-calendar-times {\n  opacity: 0.6;\n}\n.alert {\n  border-radius: 6px;\n  border: 1px solid transparent;\n}\n.alert-danger {\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n  color: #721c24;\n}\n.text-muted {\n  font-size: 0.875rem;\n}\n@media (max-width: 768px) {\n  .vacation-types-page {\n    padding: 1rem;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .table-responsive {\n    font-size: 0.875rem;\n  }\n  .btn-group {\n    position: static;\n  }\n  .dropdown-menu {\n    position: absolute !important;\n    transform: none !important;\n  }\n}\n@media (max-width: 576px) {\n  .vacation-types-page h2 {\n    font-size: 1.5rem;\n  }\n  .table thead th,\n  .table tbody td {\n    padding: 0.5rem 0.25rem;\n  }\n  .badge {\n    font-size: 0.6875rem;\n    padding: 0.25rem 0.375rem;\n  }\n  .btn-sm {\n    font-size: 0.75rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.table tbody tr {\n  animation: fadeIn 0.3s ease-in-out;\n}\n.table-responsive::-webkit-scrollbar {\n  height: 6px;\n}\n.table-responsive::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 3px;\n}\n.table-responsive::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 3px;\n}\n.table-responsive::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n/*# sourceMappingURL=vacation-types.component.css.map */\n"] }]
  }], () => [], { vacationTypeModal: [{
    type: ViewChild,
    args: [VacationTypeModalComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VacationTypesComponent, { className: "VacationTypesComponent", filePath: "src/app/pages/vacation-types/vacation-types.component.ts", lineNumber: 46 });
})();
export {
  VacationTypesComponent
};
//# sourceMappingURL=chunk-WG3RNEGP.js.map
