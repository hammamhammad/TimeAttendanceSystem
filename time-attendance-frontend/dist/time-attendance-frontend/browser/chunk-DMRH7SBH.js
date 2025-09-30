import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  ExcusePoliciesService
} from "./chunk-X6RX6YJF.js";
import "./chunk-DKGIYIS4.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/excuse-policies/create-excuse-policy/create-excuse-policy.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function CreateExcusePolicyComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r1 = ctx.$implicit;
    \u0275\u0275property("value", branch_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(branch_r1.name);
  }
}
__name(CreateExcusePolicyComponent_For_15_Template, "CreateExcusePolicyComponent_For_15_Template");
function CreateExcusePolicyComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("branchId"), " ");
  }
}
__name(CreateExcusePolicyComponent_Conditional_16_Template, "CreateExcusePolicyComponent_Conditional_16_Template");
function CreateExcusePolicyComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("maxPersonalExcusesPerMonth"), " ");
  }
}
__name(CreateExcusePolicyComponent_Conditional_27_Template, "CreateExcusePolicyComponent_Conditional_27_Template");
function CreateExcusePolicyComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("maxPersonalExcuseHoursPerMonth"), " ");
  }
}
__name(CreateExcusePolicyComponent_Conditional_32_Template, "CreateExcusePolicyComponent_Conditional_32_Template");
function CreateExcusePolicyComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("maxPersonalExcuseHoursPerDay"), " ");
  }
}
__name(CreateExcusePolicyComponent_Conditional_41_Template, "CreateExcusePolicyComponent_Conditional_41_Template");
function CreateExcusePolicyComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("maxHoursPerExcuse"), " ");
  }
}
__name(CreateExcusePolicyComponent_Conditional_46_Template, "CreateExcusePolicyComponent_Conditional_46_Template");
function CreateExcusePolicyComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("maxRetroactiveDays"), " ");
  }
}
__name(CreateExcusePolicyComponent_Conditional_52_Template, "CreateExcusePolicyComponent_Conditional_52_Template");
function CreateExcusePolicyComponent_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 41);
  }
}
__name(CreateExcusePolicyComponent_Conditional_89_Template, "CreateExcusePolicyComponent_Conditional_89_Template");
function CreateExcusePolicyComponent_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 42);
  }
}
__name(CreateExcusePolicyComponent_Conditional_90_Template, "CreateExcusePolicyComponent_Conditional_90_Template");
var _CreateExcusePolicyComponent = class _CreateExcusePolicyComponent {
  formBuilder = inject(FormBuilder);
  excusePoliciesService = inject(ExcusePoliciesService);
  router = inject(Router);
  // private branchesService = inject(BranchesService);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  // Form
  excusePolicyForm;
  // Default values
  defaultValues = {
    maxPersonalExcusesPerMonth: 4,
    maxPersonalExcuseHoursPerMonth: 8,
    maxPersonalExcuseHoursPerDay: 2,
    maxHoursPerExcuse: 4,
    requiresApproval: true,
    allowPartialHourExcuses: true,
    maxRetroactiveDays: 7,
    allowSelfServiceRequests: true
  };
  ngOnInit() {
    this.initializeForm();
    this.loadBranches();
  }
  t(key) {
    return this.i18n.t(key);
  }
  initializeForm() {
    this.excusePolicyForm = this.formBuilder.group({
      branchId: [null],
      maxPersonalExcusesPerMonth: [
        this.defaultValues.maxPersonalExcusesPerMonth,
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      maxPersonalExcuseHoursPerMonth: [
        this.defaultValues.maxPersonalExcuseHoursPerMonth,
        [Validators.required, Validators.min(0), Validators.max(744)]
        // Max hours in a month
      ],
      maxPersonalExcuseHoursPerDay: [
        this.defaultValues.maxPersonalExcuseHoursPerDay,
        [Validators.required, Validators.min(0), Validators.max(24)]
      ],
      maxHoursPerExcuse: [
        this.defaultValues.maxHoursPerExcuse,
        [Validators.required, Validators.min(0.5), Validators.max(24)]
      ],
      requiresApproval: [this.defaultValues.requiresApproval],
      allowPartialHourExcuses: [this.defaultValues.allowPartialHourExcuses],
      maxRetroactiveDays: [
        this.defaultValues.maxRetroactiveDays,
        [Validators.required, Validators.min(0), Validators.max(365)]
      ],
      allowSelfServiceRequests: [this.defaultValues.allowSelfServiceRequests]
    });
  }
  loadBranches() {
    this.availableBranches.set([
      { id: 1, name: "Main Branch" },
      { id: 2, name: "Secondary Branch" }
    ]);
  }
  goBack() {
    this.router.navigate(["/settings/excuse-policies"]);
  }
  resetForm() {
    this.excusePolicyForm.reset();
    this.initializeForm();
    this.submitting.set(false);
  }
  onSubmit() {
    if (this.excusePolicyForm.valid) {
      const formValue = this.excusePolicyForm.value;
      const request = {
        branchId: formValue.branchId || null,
        maxPersonalExcusesPerMonth: formValue.maxPersonalExcusesPerMonth,
        maxPersonalExcuseHoursPerMonth: formValue.maxPersonalExcuseHoursPerMonth,
        maxPersonalExcuseHoursPerDay: formValue.maxPersonalExcuseHoursPerDay,
        maxHoursPerExcuse: formValue.maxHoursPerExcuse,
        requiresApproval: formValue.requiresApproval,
        allowPartialHourExcuses: formValue.allowPartialHourExcuses,
        maxRetroactiveDays: formValue.maxRetroactiveDays,
        allowSelfServiceRequests: formValue.allowSelfServiceRequests
      };
      this.submitting.set(true);
      this.excusePoliciesService.createExcusePolicy(request).subscribe({
        next: /* @__PURE__ */ __name(() => {
          this.submitting.set(false);
          this.notificationService.success(this.t("excuse_policies.create_success"));
          this.goBack();
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Failed to create excuse policy:", error);
          this.submitting.set(false);
          this.notificationService.error(this.t("excuse_policies.create_error"));
        }, "error")
      });
    } else {
      this.markFormGroupTouched();
    }
  }
  markFormGroupTouched() {
    Object.keys(this.excusePolicyForm.controls).forEach((key) => {
      const control = this.excusePolicyForm.get(key);
      control?.markAsTouched();
    });
  }
  isFieldInvalid(fieldName) {
    const field = this.excusePolicyForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  getFieldError(fieldName) {
    const field = this.excusePolicyForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors["required"]) {
        return this.t("validation.required");
      }
      if (field.errors["min"]) {
        const minValue = field.errors["min"].min;
        return this.i18n.t("validation.min_value").replace("{min}", minValue);
      }
      if (field.errors["max"]) {
        const maxValue = field.errors["max"].max;
        return this.i18n.t("validation.max_value").replace("{max}", maxValue);
      }
    }
    return "";
  }
  // Helper methods for template
  getBranchDisplayName(branchId) {
    if (!branchId) {
      return this.t("excuse_policies.organization_wide");
    }
    const branch = this.availableBranches().find((b) => b.id === branchId);
    return branch ? branch.name : "";
  }
};
__name(_CreateExcusePolicyComponent, "CreateExcusePolicyComponent");
__publicField(_CreateExcusePolicyComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateExcusePolicyComponent)();
}, "CreateExcusePolicyComponent_Factory"));
__publicField(_CreateExcusePolicyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateExcusePolicyComponent, selectors: [["app-create-excuse-policy"]], decls: 92, vars: 48, consts: [[1, "create-excuse-policy-page"], ["mode", "create", "moduleName", "excuse-policies", "moduleRoute", "excuse-policies", 3, "title", "loading"], [1, "card"], [1, "card-body"], [3, "ngSubmit", "formGroup"], [1, "row", "mb-4"], [1, "col-md-12"], ["for", "branchId", 1, "form-label"], [1, "text-muted", "ms-1"], ["id", "branchId", "formControlName", "branchId", 1, "form-select"], [3, "value"], [1, "invalid-feedback"], [1, "form-text", "text-muted"], [1, "mb-3", "text-primary", "border-bottom", "pb-2"], [1, "fas", "fa-calendar-alt", "me-2"], [1, "col-md-6", "mb-3"], ["for", "maxPersonalExcusesPerMonth", 1, "form-label"], ["type", "number", "id", "maxPersonalExcusesPerMonth", "formControlName", "maxPersonalExcusesPerMonth", "min", "0", "max", "100", "step", "1", 1, "form-control"], ["for", "maxPersonalExcuseHoursPerMonth", 1, "form-label"], ["type", "number", "id", "maxPersonalExcuseHoursPerMonth", "formControlName", "maxPersonalExcuseHoursPerMonth", "min", "0", "max", "744", "step", "0.5", 1, "form-control"], [1, "fas", "fa-clock", "me-2"], ["for", "maxPersonalExcuseHoursPerDay", 1, "form-label"], ["type", "number", "id", "maxPersonalExcuseHoursPerDay", "formControlName", "maxPersonalExcuseHoursPerDay", "min", "0", "max", "24", "step", "0.5", 1, "form-control"], ["for", "maxHoursPerExcuse", 1, "form-label"], ["type", "number", "id", "maxHoursPerExcuse", "formControlName", "maxHoursPerExcuse", "min", "0.5", "max", "24", "step", "0.5", 1, "form-control"], ["for", "maxRetroactiveDays", 1, "form-label"], ["type", "number", "id", "maxRetroactiveDays", "formControlName", "maxRetroactiveDays", "min", "0", "max", "365", "step", "1", 1, "form-control"], [1, "fas", "fa-cogs", "me-2"], [1, "form-check"], ["type", "checkbox", "id", "requiresApproval", "formControlName", "requiresApproval", 1, "form-check-input"], ["for", "requiresApproval", 1, "form-check-label"], ["type", "checkbox", "id", "allowPartialHourExcuses", "formControlName", "allowPartialHourExcuses", 1, "form-check-input"], ["for", "allowPartialHourExcuses", 1, "form-check-label"], ["type", "checkbox", "id", "allowSelfServiceRequests", "formControlName", "allowSelfServiceRequests", 1, "form-check-input"], ["for", "allowSelfServiceRequests", 1, "form-check-label"], [1, "d-flex", "justify-content-end", "gap-2", "pt-3", "border-top"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "disabled"], [1, "fas", "fa-refresh", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-save", "me-2"]], template: /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "form", 4);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_form_ngSubmit_4_listener() {
      return ctx.onSubmit();
    }, "CreateExcusePolicyComponent_Template_form_ngSubmit_4_listener"));
    \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "label", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "small", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "select", 9)(12, "option", 10);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(14, CreateExcusePolicyComponent_For_15_Template, 2, 2, "option", 10, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, CreateExcusePolicyComponent_Conditional_16_Template, 2, 1, "div", 11);
    \u0275\u0275elementStart(17, "small", 12);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "h5", 13);
    \u0275\u0275element(20, "i", 14);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 5)(23, "div", 15)(24, "label", 16);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 17);
    \u0275\u0275conditionalCreate(27, CreateExcusePolicyComponent_Conditional_27_Template, 2, 1, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 15)(29, "label", 18);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 19);
    \u0275\u0275conditionalCreate(32, CreateExcusePolicyComponent_Conditional_32_Template, 2, 1, "div", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "h5", 13);
    \u0275\u0275element(34, "i", 20);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 5)(37, "div", 15)(38, "label", 21);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "input", 22);
    \u0275\u0275conditionalCreate(41, CreateExcusePolicyComponent_Conditional_41_Template, 2, 1, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 15)(43, "label", 23);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275element(45, "input", 24);
    \u0275\u0275conditionalCreate(46, CreateExcusePolicyComponent_Conditional_46_Template, 2, 1, "div", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 5)(48, "div", 15)(49, "label", 25);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "input", 26);
    \u0275\u0275conditionalCreate(52, CreateExcusePolicyComponent_Conditional_52_Template, 2, 1, "div", 11);
    \u0275\u0275elementStart(53, "small", 12);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "h5", 13);
    \u0275\u0275element(56, "i", 27);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 5)(59, "div", 15)(60, "div", 28);
    \u0275\u0275element(61, "input", 29);
    \u0275\u0275elementStart(62, "label", 30);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "small", 12);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 15)(67, "div", 28);
    \u0275\u0275element(68, "input", 31);
    \u0275\u0275elementStart(69, "label", 32);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "small", 12);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(73, "div", 5)(74, "div", 15)(75, "div", 28);
    \u0275\u0275element(76, "input", 33);
    \u0275\u0275elementStart(77, "label", 34);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "small", 12);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(81, "div", 35)(82, "button", 36);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_button_click_82_listener() {
      return ctx.goBack();
    }, "CreateExcusePolicyComponent_Template_button_click_82_listener"));
    \u0275\u0275element(83, "i", 37);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "button", 38);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_button_click_85_listener() {
      return ctx.resetForm();
    }, "CreateExcusePolicyComponent_Template_button_click_85_listener"));
    \u0275\u0275element(86, "i", 39);
    \u0275\u0275text(87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "button", 40);
    \u0275\u0275conditionalCreate(89, CreateExcusePolicyComponent_Conditional_89_Template, 1, 0, "span", 41)(90, CreateExcusePolicyComponent_Conditional_90_Template, 1, 0, "i", 42);
    \u0275\u0275text(91);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("excuse_policies.create_policy"))("loading", ctx.submitting());
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx.excusePolicyForm);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.branch"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx.t("common.optional"), ")");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("branchId"));
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.organization_wide"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.availableBranches());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.isFieldInvalid("branchId") ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.branch_help"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.monthly_limits"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.max_excuses_month"), " * ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("maxPersonalExcusesPerMonth"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("maxPersonalExcusesPerMonth") ? 27 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.max_hours_month"), " * ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("maxPersonalExcuseHoursPerMonth"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("maxPersonalExcuseHoursPerMonth") ? 32 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.time_limits"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.max_hours_day"), " * ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("maxPersonalExcuseHoursPerDay"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("maxPersonalExcuseHoursPerDay") ? 41 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.max_hours_per_excuse"), " * ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("maxHoursPerExcuse"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("maxHoursPerExcuse") ? 46 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.max_retroactive_days"), " * ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("maxRetroactiveDays"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("maxRetroactiveDays") ? 52 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.max_retroactive_days_help"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.policy_options"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.requires_approval"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.requires_approval_help"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.allow_partial_hours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.allow_partial_hours_help"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.allow_self_service"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.allow_self_service_help"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.reset"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.submitting() || ctx.excusePolicyForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 89 : 90);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.create_policy"), " ");
  }
}, "CreateExcusePolicyComponent_Template"), dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, ReactiveFormsModule, FormGroupDirective, FormControlName, FormHeaderComponent], styles: ["\n\n.create-excuse-policy-page[_ngcontent-%COMP%] {\n  padding: 1rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\nh5[_ngcontent-%COMP%] {\n  color: var(--bs-primary);\n  font-weight: 600;\n}\n.border-bottom[_ngcontent-%COMP%] {\n  border-color: var(--bs-border-color) !important;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--bs-primary);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.form-check[_ngcontent-%COMP%] {\n  padding-left: 1.5rem;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  font-weight: 500;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  opacity: 0.9;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary);\n  border-color: var(--bs-secondary);\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: var(--bs-danger);\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: var(--bs-danger);\n}\n@media (max-width: 768px) {\n  .create-excuse-policy-page[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .row[_ngcontent-%COMP%]   .col-md-6[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n  .d-flex.gap-2[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem !important;\n  }\n  .d-flex.gap-2[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.row[_ngcontent-%COMP%]    + .row[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.fas[_ngcontent-%COMP%] {\n  color: var(--bs-primary);\n}\n.text-muted[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.mb-3[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0 !important;\n}\n/*# sourceMappingURL=create-excuse-policy.component.css.map */"] }));
var CreateExcusePolicyComponent = _CreateExcusePolicyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateExcusePolicyComponent, [{
    type: Component,
    args: [{ selector: "app-create-excuse-policy", standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, FormHeaderComponent], template: `<div class="create-excuse-policy-page">\r
  <!-- Page Header -->\r
  <app-form-header\r
    mode="create"\r
    [title]="t('excuse_policies.create_policy')"\r
    moduleName="excuse-policies"\r
    moduleRoute="excuse-policies"\r
    [loading]="submitting()">\r
  </app-form-header>\r
\r
  <!-- Main Form Card -->\r
  <div class="card">\r
    <div class="card-body">\r
      <form [formGroup]="excusePolicyForm" (ngSubmit)="onSubmit()">\r
        <!-- Branch Selection -->\r
        <div class="row mb-4">\r
          <div class="col-md-12">\r
            <label for="branchId" class="form-label">\r
              {{ t('excuse_policies.branch') }}\r
              <small class="text-muted ms-1">({{ t('common.optional') }})</small>\r
            </label>\r
            <select\r
              id="branchId"\r
              class="form-select"\r
              formControlName="branchId"\r
              [class.is-invalid]="isFieldInvalid('branchId')"\r
            >\r
              <option [value]="null">{{ t('excuse_policies.organization_wide') }}</option>\r
              @for (branch of availableBranches(); track branch.id) {\r
                <option [value]="branch.id">{{ branch.name }}</option>\r
              }\r
            </select>\r
            @if (isFieldInvalid('branchId')) {\r
              <div class="invalid-feedback">\r
                {{ getFieldError('branchId') }}\r
              </div>\r
            }\r
            <small class="form-text text-muted">\r
              {{ t('excuse_policies.branch_help') }}\r
            </small>\r
          </div>\r
        </div>\r
\r
        <!-- Monthly Limits -->\r
        <h5 class="mb-3 text-primary border-bottom pb-2">\r
          <i class="fas fa-calendar-alt me-2"></i>\r
          {{ t('excuse_policies.monthly_limits') }}\r
        </h5>\r
\r
        <div class="row mb-4">\r
          <div class="col-md-6 mb-3">\r
            <label for="maxPersonalExcusesPerMonth" class="form-label">\r
              {{ t('excuse_policies.max_excuses_month') }} *\r
            </label>\r
            <input\r
              type="number"\r
              id="maxPersonalExcusesPerMonth"\r
              class="form-control"\r
              formControlName="maxPersonalExcusesPerMonth"\r
              [class.is-invalid]="isFieldInvalid('maxPersonalExcusesPerMonth')"\r
              min="0"\r
              max="100"\r
              step="1"\r
            />\r
            @if (isFieldInvalid('maxPersonalExcusesPerMonth')) {\r
              <div class="invalid-feedback">\r
                {{ getFieldError('maxPersonalExcusesPerMonth') }}\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="col-md-6 mb-3">\r
            <label for="maxPersonalExcuseHoursPerMonth" class="form-label">\r
              {{ t('excuse_policies.max_hours_month') }} *\r
            </label>\r
            <input\r
              type="number"\r
              id="maxPersonalExcuseHoursPerMonth"\r
              class="form-control"\r
              formControlName="maxPersonalExcuseHoursPerMonth"\r
              [class.is-invalid]="isFieldInvalid('maxPersonalExcuseHoursPerMonth')"\r
              min="0"\r
              max="744"\r
              step="0.5"\r
            />\r
            @if (isFieldInvalid('maxPersonalExcuseHoursPerMonth')) {\r
              <div class="invalid-feedback">\r
                {{ getFieldError('maxPersonalExcuseHoursPerMonth') }}\r
              </div>\r
            }\r
          </div>\r
        </div>\r
\r
        <!-- Daily and Per-Excuse Limits -->\r
        <h5 class="mb-3 text-primary border-bottom pb-2">\r
          <i class="fas fa-clock me-2"></i>\r
          {{ t('excuse_policies.time_limits') }}\r
        </h5>\r
\r
        <div class="row mb-4">\r
          <div class="col-md-6 mb-3">\r
            <label for="maxPersonalExcuseHoursPerDay" class="form-label">\r
              {{ t('excuse_policies.max_hours_day') }} *\r
            </label>\r
            <input\r
              type="number"\r
              id="maxPersonalExcuseHoursPerDay"\r
              class="form-control"\r
              formControlName="maxPersonalExcuseHoursPerDay"\r
              [class.is-invalid]="isFieldInvalid('maxPersonalExcuseHoursPerDay')"\r
              min="0"\r
              max="24"\r
              step="0.5"\r
            />\r
            @if (isFieldInvalid('maxPersonalExcuseHoursPerDay')) {\r
              <div class="invalid-feedback">\r
                {{ getFieldError('maxPersonalExcuseHoursPerDay') }}\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="col-md-6 mb-3">\r
            <label for="maxHoursPerExcuse" class="form-label">\r
              {{ t('excuse_policies.max_hours_per_excuse') }} *\r
            </label>\r
            <input\r
              type="number"\r
              id="maxHoursPerExcuse"\r
              class="form-control"\r
              formControlName="maxHoursPerExcuse"\r
              [class.is-invalid]="isFieldInvalid('maxHoursPerExcuse')"\r
              min="0.5"\r
              max="24"\r
              step="0.5"\r
            />\r
            @if (isFieldInvalid('maxHoursPerExcuse')) {\r
              <div class="invalid-feedback">\r
                {{ getFieldError('maxHoursPerExcuse') }}\r
              </div>\r
            }\r
          </div>\r
        </div>\r
\r
        <!-- Retroactive Settings -->\r
        <div class="row mb-4">\r
          <div class="col-md-6 mb-3">\r
            <label for="maxRetroactiveDays" class="form-label">\r
              {{ t('excuse_policies.max_retroactive_days') }} *\r
            </label>\r
            <input\r
              type="number"\r
              id="maxRetroactiveDays"\r
              class="form-control"\r
              formControlName="maxRetroactiveDays"\r
              [class.is-invalid]="isFieldInvalid('maxRetroactiveDays')"\r
              min="0"\r
              max="365"\r
              step="1"\r
            />\r
            @if (isFieldInvalid('maxRetroactiveDays')) {\r
              <div class="invalid-feedback">\r
                {{ getFieldError('maxRetroactiveDays') }}\r
              </div>\r
            }\r
            <small class="form-text text-muted">\r
              {{ t('excuse_policies.max_retroactive_days_help') }}\r
            </small>\r
          </div>\r
        </div>\r
\r
        <!-- Policy Options -->\r
        <h5 class="mb-3 text-primary border-bottom pb-2">\r
          <i class="fas fa-cogs me-2"></i>\r
          {{ t('excuse_policies.policy_options') }}\r
        </h5>\r
\r
        <div class="row mb-4">\r
          <div class="col-md-6 mb-3">\r
            <div class="form-check">\r
              <input\r
                class="form-check-input"\r
                type="checkbox"\r
                id="requiresApproval"\r
                formControlName="requiresApproval"\r
              />\r
              <label class="form-check-label" for="requiresApproval">\r
                {{ t('excuse_policies.requires_approval') }}\r
              </label>\r
            </div>\r
            <small class="form-text text-muted">\r
              {{ t('excuse_policies.requires_approval_help') }}\r
            </small>\r
          </div>\r
\r
          <div class="col-md-6 mb-3">\r
            <div class="form-check">\r
              <input\r
                class="form-check-input"\r
                type="checkbox"\r
                id="allowPartialHourExcuses"\r
                formControlName="allowPartialHourExcuses"\r
              />\r
              <label class="form-check-label" for="allowPartialHourExcuses">\r
                {{ t('excuse_policies.allow_partial_hours') }}\r
              </label>\r
            </div>\r
            <small class="form-text text-muted">\r
              {{ t('excuse_policies.allow_partial_hours_help') }}\r
            </small>\r
          </div>\r
        </div>\r
\r
        <div class="row mb-4">\r
          <div class="col-md-6 mb-3">\r
            <div class="form-check">\r
              <input\r
                class="form-check-input"\r
                type="checkbox"\r
                id="allowSelfServiceRequests"\r
                formControlName="allowSelfServiceRequests"\r
              />\r
              <label class="form-check-label" for="allowSelfServiceRequests">\r
                {{ t('excuse_policies.allow_self_service') }}\r
              </label>\r
            </div>\r
            <small class="form-text text-muted">\r
              {{ t('excuse_policies.allow_self_service_help') }}\r
            </small>\r
          </div>\r
        </div>\r
\r
        <!-- Form Actions -->\r
        <div class="d-flex justify-content-end gap-2 pt-3 border-top">\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            (click)="goBack()"\r
            [disabled]="submitting()">\r
            <i class="fas fa-times me-2"></i>\r
            {{ t('common.cancel') }}\r
          </button>\r
\r
          <button\r
            type="button"\r
            class="btn btn-outline-primary"\r
            (click)="resetForm()"\r
            [disabled]="submitting()">\r
            <i class="fas fa-refresh me-2"></i>\r
            {{ t('common.reset') }}\r
          </button>\r
\r
          <button\r
            type="submit"\r
            class="btn btn-primary"\r
            [disabled]="submitting() || excusePolicyForm.invalid">\r
            @if (submitting()) {\r
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
            } @else {\r
              <i class="fas fa-save me-2"></i>\r
            }\r
            {{ t('excuse_policies.create_policy') }}\r
          </button>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
</div>`, styles: ["/* src/app/pages/excuse-policies/create-excuse-policy/create-excuse-policy.component.css */\n.create-excuse-policy-page {\n  padding: 1rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\nh5 {\n  color: var(--bs-primary);\n  font-weight: 600;\n}\n.border-bottom {\n  border-color: var(--bs-border-color) !important;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: var(--bs-primary);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-text {\n  font-size: 0.875rem;\n}\n.form-check {\n  padding-left: 1.5rem;\n}\n.form-check-input:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn {\n  border-radius: 0.375rem;\n  font-weight: 500;\n}\n.btn-primary {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  opacity: 0.9;\n}\n.btn-secondary {\n  background-color: var(--bs-secondary);\n  border-color: var(--bs-secondary);\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.is-invalid {\n  border-color: var(--bs-danger);\n}\n.invalid-feedback {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: var(--bs-danger);\n}\n@media (max-width: 768px) {\n  .create-excuse-policy-page {\n    padding: 0.5rem;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .row .col-md-6 {\n    margin-bottom: 1rem;\n  }\n  .d-flex.gap-2 {\n    flex-direction: column;\n    gap: 0.5rem !important;\n  }\n  .d-flex.gap-2 .btn {\n    width: 100%;\n  }\n}\n.row + .row {\n  margin-top: 0;\n}\n.fas {\n  color: var(--bs-primary);\n}\n.text-muted {\n  font-size: 0.875rem;\n}\n.mb-3:last-child {\n  margin-bottom: 0 !important;\n}\n/*# sourceMappingURL=create-excuse-policy.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateExcusePolicyComponent, { className: "CreateExcusePolicyComponent", filePath: "src/app/pages/excuse-policies/create-excuse-policy/create-excuse-policy.component.ts", lineNumber: 24 });
})();
export {
  CreateExcusePolicyComponent
};
//# sourceMappingURL=chunk-DMRH7SBH.js.map
