import {
  OvertimeConfigurationsService
} from "./chunk-U3ZJ45W7.js";
import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  ConfirmationService
} from "./chunk-OJL2NUV4.js";
import "./chunk-DKGIYIS4.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  Router,
  RouterModule,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-54H4HALB.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/overtime/create-overtime-configuration/create-overtime-configuration.component.ts
function CreateOvertimeConfigurationComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "i", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_2_Template, "CreateOvertimeConfigurationComponent_Conditional_2_Template");
function CreateOvertimeConfigurationComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("general"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_32_Template, "CreateOvertimeConfigurationComponent_Conditional_32_Template");
function CreateOvertimeConfigurationComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("normalDayRate"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_50_Template, "CreateOvertimeConfigurationComponent_Conditional_50_Template");
function CreateOvertimeConfigurationComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("publicHolidayRate"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_63_Template, "CreateOvertimeConfigurationComponent_Conditional_63_Template");
function CreateOvertimeConfigurationComponent_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("offDayRate"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_76_Template, "CreateOvertimeConfigurationComponent_Conditional_76_Template");
function CreateOvertimeConfigurationComponent_Conditional_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("maxPreShiftOvertimeHours"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_94_Template, "CreateOvertimeConfigurationComponent_Conditional_94_Template");
function CreateOvertimeConfigurationComponent_Conditional_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("maxPostShiftOvertimeHours"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_105_Template, "CreateOvertimeConfigurationComponent_Conditional_105_Template");
function CreateOvertimeConfigurationComponent_Conditional_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("minimumOvertimeMinutes"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_123_Template, "CreateOvertimeConfigurationComponent_Conditional_123_Template");
function CreateOvertimeConfigurationComponent_Conditional_134_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("overtimeGracePeriodMinutes"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_134_Template, "CreateOvertimeConfigurationComponent_Conditional_134_Template");
function CreateOvertimeConfigurationComponent_Conditional_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("roundingIntervalMinutes"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_145_Template, "CreateOvertimeConfigurationComponent_Conditional_145_Template");
function CreateOvertimeConfigurationComponent_Conditional_191_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("effectiveFromDate"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_191_Template, "CreateOvertimeConfigurationComponent_Conditional_191_Template");
function CreateOvertimeConfigurationComponent_Conditional_198_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("effectiveToDate"));
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_198_Template, "CreateOvertimeConfigurationComponent_Conditional_198_Template");
function CreateOvertimeConfigurationComponent_Conditional_218_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 65);
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_218_Template, "CreateOvertimeConfigurationComponent_Conditional_218_Template");
function CreateOvertimeConfigurationComponent_Conditional_219_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 66);
  }
}
__name(CreateOvertimeConfigurationComponent_Conditional_219_Template, "CreateOvertimeConfigurationComponent_Conditional_219_Template");
var _CreateOvertimeConfigurationComponent = class _CreateOvertimeConfigurationComponent {
  overtimeService = inject(OvertimeConfigurationsService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Form state with default values
  configForm = {
    enablePreShiftOvertime: false,
    enablePostShiftOvertime: true,
    normalDayRate: 1.5,
    publicHolidayRate: 2,
    offDayRate: 1.5,
    minimumOvertimeMinutes: 15,
    considerFlexibleTime: true,
    maxPreShiftOvertimeHours: 2,
    maxPostShiftOvertimeHours: 4,
    requireApproval: false,
    overtimeGracePeriodMinutes: 5,
    weekendAsOffDay: true,
    roundingIntervalMinutes: 15,
    policyNotes: "",
    effectiveFromDate: this.getTodayDate(),
    effectiveToDate: ""
  };
  // Validation errors
  validationErrors = signal({}, ...ngDevMode ? [{ debugName: "validationErrors" }] : []);
  ngOnInit() {
  }
  t(key) {
    return this.i18n.t(key);
  }
  getTodayDate() {
    const today = /* @__PURE__ */ new Date();
    return today.toISOString().split("T")[0];
  }
  validateForm() {
    const errors = {};
    if (!this.configForm.effectiveFromDate) {
      errors["effectiveFromDate"] = this.t("settings.overtime.validation.effectiveFromRequired");
    }
    if (this.configForm.normalDayRate <= 0) {
      errors["normalDayRate"] = this.t("settings.overtime.validation.ratePositive");
    }
    if (this.configForm.publicHolidayRate <= 0) {
      errors["publicHolidayRate"] = this.t("settings.overtime.validation.ratePositive");
    }
    if (this.configForm.offDayRate <= 0) {
      errors["offDayRate"] = this.t("settings.overtime.validation.ratePositive");
    }
    if (this.configForm.minimumOvertimeMinutes < 0) {
      errors["minimumOvertimeMinutes"] = this.t("settings.overtime.validation.minimumOvertimePositive");
    }
    if (this.configForm.overtimeGracePeriodMinutes < 0) {
      errors["overtimeGracePeriodMinutes"] = this.t("settings.overtime.validation.gracePeriodPositive");
    }
    if (this.configForm.roundingIntervalMinutes <= 0) {
      errors["roundingIntervalMinutes"] = this.t("settings.overtime.validation.roundingIntervalPositive");
    }
    if (this.configForm.maxPreShiftOvertimeHours < 0) {
      errors["maxPreShiftOvertimeHours"] = this.t("settings.overtime.validation.maxHoursPositive");
    }
    if (this.configForm.maxPostShiftOvertimeHours < 0) {
      errors["maxPostShiftOvertimeHours"] = this.t("settings.overtime.validation.maxHoursPositive");
    }
    if (this.configForm.effectiveToDate && this.configForm.effectiveFromDate) {
      const fromDate = new Date(this.configForm.effectiveFromDate);
      const toDate = new Date(this.configForm.effectiveToDate);
      if (toDate <= fromDate) {
        errors["effectiveToDate"] = this.t("settings.overtime.validation.effectiveToAfterFrom");
      }
    }
    if (!this.configForm.enablePreShiftOvertime && !this.configForm.enablePostShiftOvertime) {
      errors["general"] = this.t("settings.overtime.validation.atLeastOneOvertimeType");
    }
    this.validationErrors.set(errors);
    return Object.keys(errors).length === 0;
  }
  hasError(field) {
    return !!this.validationErrors()[field];
  }
  getError(field) {
    return this.validationErrors()[field] || "";
  }
  onSubmit() {
    if (!this.validateForm()) {
      this.error.set(this.t("settings.overtime.validation.pleaseFix"));
      return;
    }
    this.submitting.set(true);
    this.error.set(null);
    const request = {
      enablePreShiftOvertime: this.configForm.enablePreShiftOvertime,
      enablePostShiftOvertime: this.configForm.enablePostShiftOvertime,
      normalDayRate: this.configForm.normalDayRate,
      publicHolidayRate: this.configForm.publicHolidayRate,
      offDayRate: this.configForm.offDayRate,
      minimumOvertimeMinutes: this.configForm.minimumOvertimeMinutes,
      considerFlexibleTime: this.configForm.considerFlexibleTime,
      maxPreShiftOvertimeHours: this.configForm.maxPreShiftOvertimeHours,
      maxPostShiftOvertimeHours: this.configForm.maxPostShiftOvertimeHours,
      requireApproval: this.configForm.requireApproval,
      overtimeGracePeriodMinutes: this.configForm.overtimeGracePeriodMinutes,
      weekendAsOffDay: this.configForm.weekendAsOffDay,
      roundingIntervalMinutes: this.configForm.roundingIntervalMinutes,
      policyNotes: this.configForm.policyNotes.trim(),
      effectiveFromDate: this.configForm.effectiveFromDate,
      effectiveToDate: this.configForm.effectiveToDate || void 0
    };
    this.overtimeService.createOvertimeConfiguration(request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notificationService.success(this.t("app.success"), this.t("settings.overtime.policyCreatedSuccessfully"));
        this.router.navigate(["/settings/overtime"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to create overtime configuration:", error);
        this.submitting.set(false);
        if (error.status === 400 && error.error?.errors) {
          this.validationErrors.set(error.error.errors);
          this.error.set(this.t("settings.overtime.validation.serverErrors"));
        } else {
          this.error.set(this.t("errors.server"));
          this.notificationService.error(this.t("app.error"), this.t("errors.server"));
        }
      }, "error")
    });
  }
  onCancel() {
    return __async(this, null, function* () {
      const hasChanges = this.hasFormChanges();
      if (hasChanges) {
        const result = yield this.confirmationService.confirm({
          title: this.t("common.unsavedChanges"),
          message: this.t("common.unsavedChangesMessage"),
          confirmText: this.t("common.discard"),
          cancelText: this.t("common.stay"),
          confirmButtonClass: "btn-warning",
          icon: "fa-exclamation-triangle",
          iconClass: "text-warning"
        });
        if (!result.confirmed) {
          return;
        }
      }
      this.router.navigate(["/settings/overtime"]);
    });
  }
  hasFormChanges() {
    const defaults = {
      enablePreShiftOvertime: false,
      enablePostShiftOvertime: true,
      normalDayRate: 1.5,
      publicHolidayRate: 2,
      offDayRate: 1.5,
      minimumOvertimeMinutes: 15,
      considerFlexibleTime: true,
      maxPreShiftOvertimeHours: 2,
      maxPostShiftOvertimeHours: 4,
      requireApproval: false,
      overtimeGracePeriodMinutes: 5,
      weekendAsOffDay: true,
      roundingIntervalMinutes: 15,
      policyNotes: "",
      effectiveFromDate: this.getTodayDate(),
      effectiveToDate: ""
    };
    return JSON.stringify(this.configForm) !== JSON.stringify(defaults);
  }
  onReset() {
    this.configForm = {
      enablePreShiftOvertime: false,
      enablePostShiftOvertime: true,
      normalDayRate: 1.5,
      publicHolidayRate: 2,
      offDayRate: 1.5,
      minimumOvertimeMinutes: 15,
      considerFlexibleTime: true,
      maxPreShiftOvertimeHours: 2,
      maxPostShiftOvertimeHours: 4,
      requireApproval: false,
      overtimeGracePeriodMinutes: 5,
      weekendAsOffDay: true,
      roundingIntervalMinutes: 15,
      policyNotes: "",
      effectiveFromDate: this.getTodayDate(),
      effectiveToDate: ""
    };
    this.validationErrors.set({});
    this.error.set(null);
  }
  // Helper method to check if input is valid
  isFieldInvalid(field) {
    return this.hasError(field);
  }
  // Helper method to get input classes
  getFieldClasses(field) {
    const baseClasses = "form-control";
    return this.isFieldInvalid(field) ? `${baseClasses} is-invalid` : baseClasses;
  }
};
__name(_CreateOvertimeConfigurationComponent, "CreateOvertimeConfigurationComponent");
__publicField(_CreateOvertimeConfigurationComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateOvertimeConfigurationComponent)();
}, "CreateOvertimeConfigurationComponent_Factory"));
__publicField(_CreateOvertimeConfigurationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateOvertimeConfigurationComponent, selectors: [["app-create-overtime-configuration"]], decls: 221, vars: 98, consts: [["formRef", "ngForm"], [1, "container-fluid"], ["mode", "create", "moduleName", "settings", "moduleRoute", "settings/overtime", 3, "title", "loading"], ["role", "alert", 1, "alert", "alert-danger"], [3, "ngSubmit"], [1, "row"], [1, "col-lg-8"], [1, "card", "mb-4"], [1, "card-header"], [1, "mb-0"], [1, "fa-solid", "fa-clock", "me-2"], [1, "card-body"], [1, "col-md-6"], [1, "form-check", "mb-3"], ["type", "checkbox", "id", "enablePreShiftOvertime", "name", "enablePreShiftOvertime", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "enablePreShiftOvertime", 1, "form-check-label"], [1, "text-muted"], ["type", "checkbox", "id", "enablePostShiftOvertime", "name", "enablePostShiftOvertime", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "enablePostShiftOvertime", 1, "form-check-label"], [1, "text-danger", "small"], [1, "fa-solid", "fa-percentage", "me-2"], [1, "col-md-4"], [1, "mb-3"], ["for", "normalDayRate", 1, "form-label"], [1, "text-danger"], [1, "input-group"], ["type", "number", "id", "normalDayRate", "name", "normalDayRate", "step", "0.1", "min", "1", "required", "", 3, "ngModelChange", "ngModel"], [1, "input-group-text"], [1, "invalid-feedback", "d-block"], [1, "form-text"], ["for", "publicHolidayRate", 1, "form-label"], ["type", "number", "id", "publicHolidayRate", "name", "publicHolidayRate", "step", "0.1", "min", "1", "required", "", 3, "ngModelChange", "ngModel"], ["for", "offDayRate", 1, "form-label"], ["type", "number", "id", "offDayRate", "name", "offDayRate", "step", "0.1", "min", "1", "required", "", 3, "ngModelChange", "ngModel"], [1, "fa-solid", "fa-hourglass-half", "me-2"], ["for", "maxPreShiftOvertimeHours", 1, "form-label"], ["type", "number", "id", "maxPreShiftOvertimeHours", "name", "maxPreShiftOvertimeHours", "step", "0.5", "min", "0", 3, "ngModelChange", "ngModel"], ["for", "maxPostShiftOvertimeHours", 1, "form-label"], ["type", "number", "id", "maxPostShiftOvertimeHours", "name", "maxPostShiftOvertimeHours", "step", "0.5", "min", "0", 3, "ngModelChange", "ngModel"], [1, "fa-solid", "fa-calculator", "me-2"], ["for", "minimumOvertimeMinutes", 1, "form-label"], ["type", "number", "id", "minimumOvertimeMinutes", "name", "minimumOvertimeMinutes", "min", "0", 3, "ngModelChange", "ngModel"], ["for", "overtimeGracePeriodMinutes", 1, "form-label"], ["type", "number", "id", "overtimeGracePeriodMinutes", "name", "overtimeGracePeriodMinutes", "min", "0", 3, "ngModelChange", "ngModel"], ["for", "roundingIntervalMinutes", 1, "form-label"], ["type", "number", "id", "roundingIntervalMinutes", "name", "roundingIntervalMinutes", "min", "1", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "id", "considerFlexibleTime", "name", "considerFlexibleTime", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "considerFlexibleTime", 1, "form-check-label"], ["type", "checkbox", "id", "weekendAsOffDay", "name", "weekendAsOffDay", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "weekendAsOffDay", 1, "form-check-label"], [1, "fa-solid", "fa-sticky-note", "me-2"], ["for", "policyNotes", 1, "form-label"], ["id", "policyNotes", "name", "policyNotes", "rows", "4", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], [1, "col-lg-4"], [1, "fa-solid", "fa-calendar", "me-2"], ["for", "effectiveFromDate", 1, "form-label"], ["type", "date", "id", "effectiveFromDate", "name", "effectiveFromDate", "required", "", 3, "ngModelChange", "ngModel"], ["for", "effectiveToDate", 1, "form-label"], ["type", "date", "id", "effectiveToDate", "name", "effectiveToDate", 3, "ngModelChange", "ngModel"], [1, "fa-solid", "fa-cogs", "me-2"], ["type", "checkbox", "id", "requireApproval", "name", "requireApproval", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "requireApproval", 1, "form-check-label"], [1, "card"], [1, "d-grid", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "fa-solid", "fa-spinner", "fa-spin", "me-2"], [1, "fa-solid", "fa-save", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-form-header", 2);
    \u0275\u0275conditionalCreate(2, CreateOvertimeConfigurationComponent_Conditional_2_Template, 3, 1, "div", 3);
    \u0275\u0275elementStart(3, "form", 4, 0);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSubmit());
    }, "CreateOvertimeConfigurationComponent_Template_form_ngSubmit_3_listener"));
    \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "h5", 9);
    \u0275\u0275element(10, "i", 10);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 11)(13, "div", 5)(14, "div", 12)(15, "div", 13)(16, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.enablePreShiftOvertime, $event) || (ctx.configForm.enablePreShiftOvertime = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_16_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "label", 15)(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "br");
    \u0275\u0275elementStart(21, "small", 16);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "div", 12)(24, "div", 13)(25, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.enablePostShiftOvertime, $event) || (ctx.configForm.enablePostShiftOvertime = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_25_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "label", 18)(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "br");
    \u0275\u0275elementStart(30, "small", 16);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(32, CreateOvertimeConfigurationComponent_Conditional_32_Template, 2, 1, "div", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 7)(34, "div", 8)(35, "h5", 9);
    \u0275\u0275element(36, "i", 20);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 11)(39, "div", 5)(40, "div", 21)(41, "div", 22)(42, "label", 23);
    \u0275\u0275text(43);
    \u0275\u0275elementStart(44, "span", 24);
    \u0275\u0275text(45, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 25)(47, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.normalDayRate, $event) || (ctx.configForm.normalDayRate = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_47_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 27);
    \u0275\u0275text(49, "x");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(50, CreateOvertimeConfigurationComponent_Conditional_50_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(51, "div", 29);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 21)(54, "div", 22)(55, "label", 30);
    \u0275\u0275text(56);
    \u0275\u0275elementStart(57, "span", 24);
    \u0275\u0275text(58, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 25)(60, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.publicHolidayRate, $event) || (ctx.configForm.publicHolidayRate = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_60_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "span", 27);
    \u0275\u0275text(62, "x");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(63, CreateOvertimeConfigurationComponent_Conditional_63_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(64, "div", 29);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(66, "div", 21)(67, "div", 22)(68, "label", 32);
    \u0275\u0275text(69);
    \u0275\u0275elementStart(70, "span", 24);
    \u0275\u0275text(71, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 25)(73, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_73_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.offDayRate, $event) || (ctx.configForm.offDayRate = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_73_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "span", 27);
    \u0275\u0275text(75, "x");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(76, CreateOvertimeConfigurationComponent_Conditional_76_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(77, "div", 29);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(79, "div", 7)(80, "div", 8)(81, "h5", 9);
    \u0275\u0275element(82, "i", 34);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "div", 11)(85, "div", 5)(86, "div", 12)(87, "div", 22)(88, "label", 35);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "div", 25)(91, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_91_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.maxPreShiftOvertimeHours, $event) || (ctx.configForm.maxPreShiftOvertimeHours = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_91_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "span", 27);
    \u0275\u0275text(93);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(94, CreateOvertimeConfigurationComponent_Conditional_94_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(95, "div", 29);
    \u0275\u0275text(96);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(97, "div", 12)(98, "div", 22)(99, "label", 37);
    \u0275\u0275text(100);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "div", 25)(102, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_102_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.maxPostShiftOvertimeHours, $event) || (ctx.configForm.maxPostShiftOvertimeHours = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_102_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "span", 27);
    \u0275\u0275text(104);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(105, CreateOvertimeConfigurationComponent_Conditional_105_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(106, "div", 29);
    \u0275\u0275text(107);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(108, "div", 7)(109, "div", 8)(110, "h5", 9);
    \u0275\u0275element(111, "i", 39);
    \u0275\u0275text(112);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(113, "div", 11)(114, "div", 5)(115, "div", 21)(116, "div", 22)(117, "label", 40);
    \u0275\u0275text(118);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "div", 25)(120, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_120_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.minimumOvertimeMinutes, $event) || (ctx.configForm.minimumOvertimeMinutes = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_120_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(121, "span", 27);
    \u0275\u0275text(122);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(123, CreateOvertimeConfigurationComponent_Conditional_123_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(124, "div", 29);
    \u0275\u0275text(125);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(126, "div", 21)(127, "div", 22)(128, "label", 42);
    \u0275\u0275text(129);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(130, "div", 25)(131, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_131_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.overtimeGracePeriodMinutes, $event) || (ctx.configForm.overtimeGracePeriodMinutes = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_131_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(132, "span", 27);
    \u0275\u0275text(133);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(134, CreateOvertimeConfigurationComponent_Conditional_134_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(135, "div", 29);
    \u0275\u0275text(136);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(137, "div", 21)(138, "div", 22)(139, "label", 44);
    \u0275\u0275text(140);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(141, "div", 25)(142, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_142_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.roundingIntervalMinutes, $event) || (ctx.configForm.roundingIntervalMinutes = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_142_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(143, "span", 27);
    \u0275\u0275text(144);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(145, CreateOvertimeConfigurationComponent_Conditional_145_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(146, "div", 29);
    \u0275\u0275text(147);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(148, "div", 5)(149, "div", 12)(150, "div", 13)(151, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_151_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.considerFlexibleTime, $event) || (ctx.configForm.considerFlexibleTime = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_151_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(152, "label", 47);
    \u0275\u0275text(153);
    \u0275\u0275element(154, "br");
    \u0275\u0275elementStart(155, "small", 16);
    \u0275\u0275text(156);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(157, "div", 12)(158, "div", 13)(159, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_159_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.weekendAsOffDay, $event) || (ctx.configForm.weekendAsOffDay = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_159_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(160, "label", 49);
    \u0275\u0275text(161);
    \u0275\u0275element(162, "br");
    \u0275\u0275elementStart(163, "small", 16);
    \u0275\u0275text(164);
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(165, "div", 7)(166, "div", 8)(167, "h5", 9);
    \u0275\u0275element(168, "i", 50);
    \u0275\u0275text(169);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(170, "div", 11)(171, "div", 22)(172, "label", 51);
    \u0275\u0275text(173);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(174, "textarea", 52);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_textarea_ngModelChange_174_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.policyNotes, $event) || (ctx.configForm.policyNotes = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_textarea_ngModelChange_174_listener"));
    \u0275\u0275text(175, "              ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(176, "div", 29);
    \u0275\u0275text(177);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(178, "div", 53)(179, "div", 7)(180, "div", 8)(181, "h5", 9);
    \u0275\u0275element(182, "i", 54);
    \u0275\u0275text(183);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(184, "div", 11)(185, "div", 22)(186, "label", 55);
    \u0275\u0275text(187);
    \u0275\u0275elementStart(188, "span", 24);
    \u0275\u0275text(189, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(190, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_190_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.effectiveFromDate, $event) || (ctx.configForm.effectiveFromDate = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_190_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(191, CreateOvertimeConfigurationComponent_Conditional_191_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(192, "div", 29);
    \u0275\u0275text(193);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(194, "div", 22)(195, "label", 57);
    \u0275\u0275text(196);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(197, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_197_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.effectiveToDate, $event) || (ctx.configForm.effectiveToDate = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_197_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(198, CreateOvertimeConfigurationComponent_Conditional_198_Template, 2, 1, "div", 28);
    \u0275\u0275elementStart(199, "div", 29);
    \u0275\u0275text(200);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(201, "div", 7)(202, "div", 8)(203, "h5", 9);
    \u0275\u0275element(204, "i", 59);
    \u0275\u0275text(205);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(206, "div", 11)(207, "div", 13)(208, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateOvertimeConfigurationComponent_Template_input_ngModelChange_208_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.configForm.requireApproval, $event) || (ctx.configForm.requireApproval = $event);
      return \u0275\u0275resetView($event);
    }, "CreateOvertimeConfigurationComponent_Template_input_ngModelChange_208_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(209, "label", 61);
    \u0275\u0275text(210);
    \u0275\u0275element(211, "br");
    \u0275\u0275elementStart(212, "small", 16);
    \u0275\u0275text(213);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(214, "div", 62)(215, "div", 11)(216, "div", 63)(217, "button", 64);
    \u0275\u0275conditionalCreate(218, CreateOvertimeConfigurationComponent_Conditional_218_Template, 1, 0, "i", 65)(219, CreateOvertimeConfigurationComponent_Conditional_219_Template, 1, 0, "i", 66);
    \u0275\u0275text(220);
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("settings.overtime.createPolicy"))("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 2 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.overtimeTypes"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.enablePreShiftOvertime);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.enablePreShift"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.enablePreShiftDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.enablePostShiftOvertime);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.enablePostShift"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.enablePostShiftDescription"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("general") ? 32 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.overtimeRates"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.normalDayRate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx.getFieldClasses("normalDayRate"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.normalDayRate);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.hasError("normalDayRate") ? 50 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.normalDayRateDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.publicHolidayRate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx.getFieldClasses("publicHolidayRate"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.publicHolidayRate);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.hasError("publicHolidayRate") ? 63 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.publicHolidayRateDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.offDayRate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx.getFieldClasses("offDayRate"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.offDayRate);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.hasError("offDayRate") ? 76 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.offDayRateDescription"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.overtimeLimits"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.maxPreShiftHours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx.getFieldClasses("maxPreShiftOvertimeHours"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.maxPreShiftOvertimeHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.hours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("maxPreShiftOvertimeHours") ? 94 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.maxPreShiftHoursDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.maxPostShiftHours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx.getFieldClasses("maxPostShiftOvertimeHours"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.maxPostShiftOvertimeHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.hours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("maxPostShiftOvertimeHours") ? 105 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.maxPostShiftHoursDescription"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.calculationSettings"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.minimumOvertimeMinutes"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx.getFieldClasses("minimumOvertimeMinutes"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.minimumOvertimeMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.minutes"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("minimumOvertimeMinutes") ? 123 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.minimumOvertimeMinutesDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.gracePeriodMinutes"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx.getFieldClasses("overtimeGracePeriodMinutes"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.overtimeGracePeriodMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.minutes"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("overtimeGracePeriodMinutes") ? 134 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.gracePeriodMinutesDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.roundingIntervalMinutes"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx.getFieldClasses("roundingIntervalMinutes"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.roundingIntervalMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.minutes"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("roundingIntervalMinutes") ? 145 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.roundingIntervalMinutesDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.considerFlexibleTime);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.considerFlexibleTime"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.considerFlexibleTimeDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.weekendAsOffDay);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.weekendAsOffDay"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.weekendAsOffDayDescription"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.policyNotes"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.policyNotesLabel"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.policyNotes);
    \u0275\u0275property("placeholder", ctx.t("settings.overtime.policyNotesPlaceholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.policyNotesDescription"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.effectivePeriod"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.effectiveFrom"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx.getFieldClasses("effectiveFromDate"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.effectiveFromDate);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("effectiveFromDate") ? 191 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.effectiveFromDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.effectiveTo"), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx.getFieldClasses("effectiveToDate"));
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.effectiveToDate);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasError("effectiveToDate") ? 198 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.effectiveToDescription"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.additionalSettings"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.configForm.requireApproval);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.overtime.requireApproval"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.requireApprovalDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 218 : 219);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.submitting() ? ctx.t("common.saving") : ctx.t("settings.overtime.createPolicy"), " ");
  }
}, "CreateOvertimeConfigurationComponent_Template"), dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, NgModel, NgForm, RouterModule, FormHeaderComponent], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transition: all 0.15s ease-in-out;\n}\n.card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n  padding: 1rem 1.25rem;\n}\n.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  color: #495057;\n  font-weight: 600;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  border: 1px solid #dee2e6;\n  transition: all 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n}\n.form-control.is-invalid[_ngcontent-%COMP%]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n.input-group[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  overflow: hidden;\n}\n.input-group-text[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n  color: #6c757d;\n}\n.form-check-input[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6c757d;\n  margin-top: 0.25rem;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #dc3545;\n  margin-top: 0.25rem;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n  font-weight: 500;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  transform: none;\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  border: none;\n  margin-bottom: 1.5rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8d7da 0%,\n      #f1aeb5 100%);\n  color: #721c24;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #dc3545 !important;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.fa-spinner[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 992px) {\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media (max-width: 768px) {\n  .card[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n  .row[_ngcontent-%COMP%]   .col-md-4[_ngcontent-%COMP%], \n   .row[_ngcontent-%COMP%]   .col-md-6[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.form-check[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border: 1px solid #e9ecef;\n  border-radius: 0.375rem;\n  background-color: #f8f9fa;\n  transition: all 0.15s ease-in-out;\n}\n.form-check[_ngcontent-%COMP%]:hover {\n  background-color: #e9ecef;\n}\n.form-check-input[_ngcontent-%COMP%]:checked    + .form-check-label[_ngcontent-%COMP%] {\n  color: #0d6efd;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0d6efd 0%,\n      #0b5ed7 100%);\n  border: none;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #0b5ed7 0%,\n      #0a58ca 100%);\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  border-color: #6c757d;\n  color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #5c636a;\n  border-color: #565e64;\n}\n.fa-solid[_ngcontent-%COMP%] {\n  margin-right: 0.25rem;\n}\n.text-danger[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n/*# sourceMappingURL=create-overtime-configuration.component.css.map */"] }));
var CreateOvertimeConfigurationComponent = _CreateOvertimeConfigurationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateOvertimeConfigurationComponent, [{
    type: Component,
    args: [{ selector: "app-create-overtime-configuration", standalone: true, imports: [CommonModule, FormsModule, RouterModule, FormHeaderComponent], template: `<div class="container-fluid">\r
  <!-- Header Section -->\r
  <app-form-header\r
    mode="create"\r
    [title]="t('settings.overtime.createPolicy')"\r
    moduleName="settings"\r
    moduleRoute="settings/overtime"\r
    [loading]="submitting()">\r
  </app-form-header>\r
\r
  <!-- Error Alert -->\r
  @if (error()) {\r
    <div class="alert alert-danger" role="alert">\r
      <i class="fa-solid fa-exclamation-triangle me-2"></i>\r
      {{ error() }}\r
    </div>\r
  }\r
\r
  <!-- Form -->\r
  <form (ngSubmit)="onSubmit()" #formRef="ngForm">\r
    <div class="row">\r
      <!-- Main Configuration -->\r
      <div class="col-lg-8">\r
        <!-- Overtime Types Section -->\r
        <div class="card mb-4">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-clock me-2"></i>\r
              {{ t('settings.overtime.overtimeTypes') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row">\r
              <div class="col-md-6">\r
                <div class="form-check mb-3">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="enablePreShiftOvertime"\r
                    [(ngModel)]="configForm.enablePreShiftOvertime"\r
                    name="enablePreShiftOvertime">\r
                  <label class="form-check-label" for="enablePreShiftOvertime">\r
                    <strong>{{ t('settings.overtime.enablePreShift') }}</strong>\r
                    <br>\r
                    <small class="text-muted">{{ t('settings.overtime.enablePreShiftDescription') }}</small>\r
                  </label>\r
                </div>\r
              </div>\r
              <div class="col-md-6">\r
                <div class="form-check mb-3">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="enablePostShiftOvertime"\r
                    [(ngModel)]="configForm.enablePostShiftOvertime"\r
                    name="enablePostShiftOvertime">\r
                  <label class="form-check-label" for="enablePostShiftOvertime">\r
                    <strong>{{ t('settings.overtime.enablePostShift') }}</strong>\r
                    <br>\r
                    <small class="text-muted">{{ t('settings.overtime.enablePostShiftDescription') }}</small>\r
                  </label>\r
                </div>\r
              </div>\r
            </div>\r
            @if (hasError('general')) {\r
              <div class="text-danger small">{{ getError('general') }}</div>\r
            }\r
          </div>\r
        </div>\r
\r
        <!-- Overtime Rates Section -->\r
        <div class="card mb-4">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-percentage me-2"></i>\r
              {{ t('settings.overtime.overtimeRates') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row">\r
              <div class="col-md-4">\r
                <div class="mb-3">\r
                  <label for="normalDayRate" class="form-label">\r
                    {{ t('settings.overtime.normalDayRate') }} <span class="text-danger">*</span>\r
                  </label>\r
                  <div class="input-group">\r
                    <input\r
                      type="number"\r
                      [class]="getFieldClasses('normalDayRate')"\r
                      id="normalDayRate"\r
                      [(ngModel)]="configForm.normalDayRate"\r
                      name="normalDayRate"\r
                      step="0.1"\r
                      min="1"\r
                      required>\r
                    <span class="input-group-text">x</span>\r
                  </div>\r
                  @if (hasError('normalDayRate')) {\r
                    <div class="invalid-feedback d-block">{{ getError('normalDayRate') }}</div>\r
                  }\r
                  <div class="form-text">{{ t('settings.overtime.normalDayRateDescription') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-4">\r
                <div class="mb-3">\r
                  <label for="publicHolidayRate" class="form-label">\r
                    {{ t('settings.overtime.publicHolidayRate') }} <span class="text-danger">*</span>\r
                  </label>\r
                  <div class="input-group">\r
                    <input\r
                      type="number"\r
                      [class]="getFieldClasses('publicHolidayRate')"\r
                      id="publicHolidayRate"\r
                      [(ngModel)]="configForm.publicHolidayRate"\r
                      name="publicHolidayRate"\r
                      step="0.1"\r
                      min="1"\r
                      required>\r
                    <span class="input-group-text">x</span>\r
                  </div>\r
                  @if (hasError('publicHolidayRate')) {\r
                    <div class="invalid-feedback d-block">{{ getError('publicHolidayRate') }}</div>\r
                  }\r
                  <div class="form-text">{{ t('settings.overtime.publicHolidayRateDescription') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-4">\r
                <div class="mb-3">\r
                  <label for="offDayRate" class="form-label">\r
                    {{ t('settings.overtime.offDayRate') }} <span class="text-danger">*</span>\r
                  </label>\r
                  <div class="input-group">\r
                    <input\r
                      type="number"\r
                      [class]="getFieldClasses('offDayRate')"\r
                      id="offDayRate"\r
                      [(ngModel)]="configForm.offDayRate"\r
                      name="offDayRate"\r
                      step="0.1"\r
                      min="1"\r
                      required>\r
                    <span class="input-group-text">x</span>\r
                  </div>\r
                  @if (hasError('offDayRate')) {\r
                    <div class="invalid-feedback d-block">{{ getError('offDayRate') }}</div>\r
                  }\r
                  <div class="form-text">{{ t('settings.overtime.offDayRateDescription') }}</div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Overtime Limits Section -->\r
        <div class="card mb-4">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-hourglass-half me-2"></i>\r
              {{ t('settings.overtime.overtimeLimits') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row">\r
              <div class="col-md-6">\r
                <div class="mb-3">\r
                  <label for="maxPreShiftOvertimeHours" class="form-label">\r
                    {{ t('settings.overtime.maxPreShiftHours') }}\r
                  </label>\r
                  <div class="input-group">\r
                    <input\r
                      type="number"\r
                      [class]="getFieldClasses('maxPreShiftOvertimeHours')"\r
                      id="maxPreShiftOvertimeHours"\r
                      [(ngModel)]="configForm.maxPreShiftOvertimeHours"\r
                      name="maxPreShiftOvertimeHours"\r
                      step="0.5"\r
                      min="0">\r
                    <span class="input-group-text">{{ t('common.hours') }}</span>\r
                  </div>\r
                  @if (hasError('maxPreShiftOvertimeHours')) {\r
                    <div class="invalid-feedback d-block">{{ getError('maxPreShiftOvertimeHours') }}</div>\r
                  }\r
                  <div class="form-text">{{ t('settings.overtime.maxPreShiftHoursDescription') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-6">\r
                <div class="mb-3">\r
                  <label for="maxPostShiftOvertimeHours" class="form-label">\r
                    {{ t('settings.overtime.maxPostShiftHours') }}\r
                  </label>\r
                  <div class="input-group">\r
                    <input\r
                      type="number"\r
                      [class]="getFieldClasses('maxPostShiftOvertimeHours')"\r
                      id="maxPostShiftOvertimeHours"\r
                      [(ngModel)]="configForm.maxPostShiftOvertimeHours"\r
                      name="maxPostShiftOvertimeHours"\r
                      step="0.5"\r
                      min="0">\r
                    <span class="input-group-text">{{ t('common.hours') }}</span>\r
                  </div>\r
                  @if (hasError('maxPostShiftOvertimeHours')) {\r
                    <div class="invalid-feedback d-block">{{ getError('maxPostShiftOvertimeHours') }}</div>\r
                  }\r
                  <div class="form-text">{{ t('settings.overtime.maxPostShiftHoursDescription') }}</div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Calculation Settings Section -->\r
        <div class="card mb-4">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-calculator me-2"></i>\r
              {{ t('settings.overtime.calculationSettings') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row">\r
              <div class="col-md-4">\r
                <div class="mb-3">\r
                  <label for="minimumOvertimeMinutes" class="form-label">\r
                    {{ t('settings.overtime.minimumOvertimeMinutes') }}\r
                  </label>\r
                  <div class="input-group">\r
                    <input\r
                      type="number"\r
                      [class]="getFieldClasses('minimumOvertimeMinutes')"\r
                      id="minimumOvertimeMinutes"\r
                      [(ngModel)]="configForm.minimumOvertimeMinutes"\r
                      name="minimumOvertimeMinutes"\r
                      min="0">\r
                    <span class="input-group-text">{{ t('common.minutes') }}</span>\r
                  </div>\r
                  @if (hasError('minimumOvertimeMinutes')) {\r
                    <div class="invalid-feedback d-block">{{ getError('minimumOvertimeMinutes') }}</div>\r
                  }\r
                  <div class="form-text">{{ t('settings.overtime.minimumOvertimeMinutesDescription') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-4">\r
                <div class="mb-3">\r
                  <label for="overtimeGracePeriodMinutes" class="form-label">\r
                    {{ t('settings.overtime.gracePeriodMinutes') }}\r
                  </label>\r
                  <div class="input-group">\r
                    <input\r
                      type="number"\r
                      [class]="getFieldClasses('overtimeGracePeriodMinutes')"\r
                      id="overtimeGracePeriodMinutes"\r
                      [(ngModel)]="configForm.overtimeGracePeriodMinutes"\r
                      name="overtimeGracePeriodMinutes"\r
                      min="0">\r
                    <span class="input-group-text">{{ t('common.minutes') }}</span>\r
                  </div>\r
                  @if (hasError('overtimeGracePeriodMinutes')) {\r
                    <div class="invalid-feedback d-block">{{ getError('overtimeGracePeriodMinutes') }}</div>\r
                  }\r
                  <div class="form-text">{{ t('settings.overtime.gracePeriodMinutesDescription') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-4">\r
                <div class="mb-3">\r
                  <label for="roundingIntervalMinutes" class="form-label">\r
                    {{ t('settings.overtime.roundingIntervalMinutes') }}\r
                  </label>\r
                  <div class="input-group">\r
                    <input\r
                      type="number"\r
                      [class]="getFieldClasses('roundingIntervalMinutes')"\r
                      id="roundingIntervalMinutes"\r
                      [(ngModel)]="configForm.roundingIntervalMinutes"\r
                      name="roundingIntervalMinutes"\r
                      min="1">\r
                    <span class="input-group-text">{{ t('common.minutes') }}</span>\r
                  </div>\r
                  @if (hasError('roundingIntervalMinutes')) {\r
                    <div class="invalid-feedback d-block">{{ getError('roundingIntervalMinutes') }}</div>\r
                  }\r
                  <div class="form-text">{{ t('settings.overtime.roundingIntervalMinutesDescription') }}</div>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <div class="row">\r
              <div class="col-md-6">\r
                <div class="form-check mb-3">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="considerFlexibleTime"\r
                    [(ngModel)]="configForm.considerFlexibleTime"\r
                    name="considerFlexibleTime">\r
                  <label class="form-check-label" for="considerFlexibleTime">\r
                    {{ t('settings.overtime.considerFlexibleTime') }}\r
                    <br>\r
                    <small class="text-muted">{{ t('settings.overtime.considerFlexibleTimeDescription') }}</small>\r
                  </label>\r
                </div>\r
              </div>\r
              <div class="col-md-6">\r
                <div class="form-check mb-3">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="weekendAsOffDay"\r
                    [(ngModel)]="configForm.weekendAsOffDay"\r
                    name="weekendAsOffDay">\r
                  <label class="form-check-label" for="weekendAsOffDay">\r
                    {{ t('settings.overtime.weekendAsOffDay') }}\r
                    <br>\r
                    <small class="text-muted">{{ t('settings.overtime.weekendAsOffDayDescription') }}</small>\r
                  </label>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Policy Notes Section -->\r
        <div class="card mb-4">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-sticky-note me-2"></i>\r
              {{ t('settings.overtime.policyNotes') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="mb-3">\r
              <label for="policyNotes" class="form-label">\r
                {{ t('settings.overtime.policyNotesLabel') }}\r
              </label>\r
              <textarea\r
                class="form-control"\r
                id="policyNotes"\r
                [(ngModel)]="configForm.policyNotes"\r
                name="policyNotes"\r
                rows="4"\r
                [placeholder]="t('settings.overtime.policyNotesPlaceholder')">\r
              </textarea>\r
              <div class="form-text">{{ t('settings.overtime.policyNotesDescription') }}</div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Sidebar -->\r
      <div class="col-lg-4">\r
        <!-- Effective Period Section -->\r
        <div class="card mb-4">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-calendar me-2"></i>\r
              {{ t('settings.overtime.effectivePeriod') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="mb-3">\r
              <label for="effectiveFromDate" class="form-label">\r
                {{ t('settings.overtime.effectiveFrom') }} <span class="text-danger">*</span>\r
              </label>\r
              <input\r
                type="date"\r
                [class]="getFieldClasses('effectiveFromDate')"\r
                id="effectiveFromDate"\r
                [(ngModel)]="configForm.effectiveFromDate"\r
                name="effectiveFromDate"\r
                required>\r
              @if (hasError('effectiveFromDate')) {\r
                <div class="invalid-feedback d-block">{{ getError('effectiveFromDate') }}</div>\r
              }\r
              <div class="form-text">{{ t('settings.overtime.effectiveFromDescription') }}</div>\r
            </div>\r
            <div class="mb-3">\r
              <label for="effectiveToDate" class="form-label">\r
                {{ t('settings.overtime.effectiveTo') }}\r
              </label>\r
              <input\r
                type="date"\r
                [class]="getFieldClasses('effectiveToDate')"\r
                id="effectiveToDate"\r
                [(ngModel)]="configForm.effectiveToDate"\r
                name="effectiveToDate">\r
              @if (hasError('effectiveToDate')) {\r
                <div class="invalid-feedback d-block">{{ getError('effectiveToDate') }}</div>\r
              }\r
              <div class="form-text">{{ t('settings.overtime.effectiveToDescription') }}</div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Additional Settings Section -->\r
        <div class="card mb-4">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-cogs me-2"></i>\r
              {{ t('settings.overtime.additionalSettings') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="form-check mb-3">\r
              <input\r
                class="form-check-input"\r
                type="checkbox"\r
                id="requireApproval"\r
                [(ngModel)]="configForm.requireApproval"\r
                name="requireApproval">\r
              <label class="form-check-label" for="requireApproval">\r
                {{ t('settings.overtime.requireApproval') }}\r
                <br>\r
                <small class="text-muted">{{ t('settings.overtime.requireApprovalDescription') }}</small>\r
              </label>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Submit Section -->\r
        <div class="card">\r
          <div class="card-body">\r
            <div class="d-grid gap-2">\r
              <button\r
                type="submit"\r
                class="btn btn-primary"\r
                [disabled]="submitting()">\r
                @if (submitting()) {\r
                  <i class="fa-solid fa-spinner fa-spin me-2"></i>\r
                } @else {\r
                  <i class="fa-solid fa-save me-2"></i>\r
                }\r
                {{ submitting() ? t('common.saving') : t('settings.overtime.createPolicy') }}\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </form>\r
</div>`, styles: ["/* src/app/pages/settings/overtime/create-overtime-configuration/create-overtime-configuration.component.css */\n.card {\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transition: all 0.15s ease-in-out;\n}\n.card:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.card-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n  padding: 1rem 1.25rem;\n}\n.card-header h5 {\n  color: #495057;\n  font-weight: 600;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control {\n  border-radius: 0.375rem;\n  border: 1px solid #dee2e6;\n  transition: all 0.15s ease-in-out;\n}\n.form-control:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-control.is-invalid {\n  border-color: #dc3545;\n}\n.form-control.is-invalid:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n.input-group {\n  border-radius: 0.375rem;\n  overflow: hidden;\n}\n.input-group-text {\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n  color: #6c757d;\n}\n.form-check-input {\n  margin-top: 0.25rem;\n}\n.form-check-label {\n  cursor: pointer;\n}\n.form-text {\n  font-size: 0.875rem;\n  color: #6c757d;\n  margin-top: 0.25rem;\n}\n.invalid-feedback {\n  font-size: 0.875rem;\n  color: #dc3545;\n  margin-top: 0.25rem;\n}\n.btn {\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n  font-weight: 500;\n}\n.btn:hover {\n  transform: translateY(-1px);\n}\n.btn:disabled {\n  transform: none;\n}\n.alert {\n  border-radius: 0.5rem;\n  border: none;\n  margin-bottom: 1.5rem;\n}\n.alert-danger {\n  background:\n    linear-gradient(\n      135deg,\n      #f8d7da 0%,\n      #f1aeb5 100%);\n  color: #721c24;\n}\n.text-danger {\n  color: #dc3545 !important;\n}\n.text-muted {\n  color: #6c757d !important;\n}\n.fa-spinner {\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 992px) {\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between .btn {\n    width: 100%;\n  }\n}\n@media (max-width: 768px) {\n  .card {\n    margin-bottom: 1rem;\n  }\n  .row .col-md-4,\n  .row .col-md-6 {\n    margin-bottom: 1rem;\n  }\n}\n.card-body {\n  padding: 1.25rem;\n}\n.form-check {\n  padding: 0.75rem;\n  border: 1px solid #e9ecef;\n  border-radius: 0.375rem;\n  background-color: #f8f9fa;\n  transition: all 0.15s ease-in-out;\n}\n.form-check:hover {\n  background-color: #e9ecef;\n}\n.form-check-input:checked + .form-check-label {\n  color: #0d6efd;\n}\n.form-control:focus,\n.form-select:focus {\n  outline: none;\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #0d6efd 0%,\n      #0b5ed7 100%);\n  border: none;\n}\n.btn-primary:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #0b5ed7 0%,\n      #0a58ca 100%);\n}\n.btn-outline-secondary {\n  border-color: #6c757d;\n  color: #6c757d;\n}\n.btn-outline-secondary:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-secondary {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-secondary:hover {\n  background-color: #5c636a;\n  border-color: #565e64;\n}\n.fa-solid {\n  margin-right: 0.25rem;\n}\n.text-danger {\n  font-weight: 600;\n}\n/*# sourceMappingURL=create-overtime-configuration.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateOvertimeConfigurationComponent, { className: "CreateOvertimeConfigurationComponent", filePath: "src/app/pages/settings/overtime/create-overtime-configuration/create-overtime-configuration.component.ts", lineNumber: 18 });
})();
export {
  CreateOvertimeConfigurationComponent
};
//# sourceMappingURL=chunk-E7GROBJ5.js.map
