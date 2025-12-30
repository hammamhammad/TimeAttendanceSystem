import {
  ExcusePoliciesService
} from "./chunk-XDAIG4PW.js";
import {
  FormHeaderComponent
} from "./chunk-KM5VSJTZ.js";
import {
  FormSectionComponent
} from "./chunk-I3BAAGQQ.js";
import {
  BranchesService
} from "./chunk-VA62FO4C.js";
import "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import "./chunk-HZ2IZU2F.js";
import {
  Router,
  RouterModule
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/excuse-policies/create-excuse-policy/create-excuse-policy.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function CreateExcusePolicyComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r2 = ctx.$implicit;
    \u0275\u0275property("ngValue", branch_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(branch_r2.name);
  }
}
__name(CreateExcusePolicyComponent_For_14_Template, "CreateExcusePolicyComponent_For_14_Template");
function CreateExcusePolicyComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.validationErrors()["maxPersonalExcusesPerMonth"]);
  }
}
__name(CreateExcusePolicyComponent_Conditional_23_Template, "CreateExcusePolicyComponent_Conditional_23_Template");
function CreateExcusePolicyComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.validationErrors()["maxPersonalExcuseHoursPerMonth"]);
  }
}
__name(CreateExcusePolicyComponent_Conditional_30_Template, "CreateExcusePolicyComponent_Conditional_30_Template");
function CreateExcusePolicyComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.validationErrors()["maxPersonalExcuseHoursPerDay"]);
  }
}
__name(CreateExcusePolicyComponent_Conditional_39_Template, "CreateExcusePolicyComponent_Conditional_39_Template");
function CreateExcusePolicyComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.validationErrors()["maxHoursPerExcuse"]);
  }
}
__name(CreateExcusePolicyComponent_Conditional_46_Template, "CreateExcusePolicyComponent_Conditional_46_Template");
function CreateExcusePolicyComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.validationErrors()["minimumExcuseDuration"]);
  }
}
__name(CreateExcusePolicyComponent_Conditional_53_Template, "CreateExcusePolicyComponent_Conditional_53_Template");
function CreateExcusePolicyComponent_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 38);
  }
}
__name(CreateExcusePolicyComponent_Conditional_91_Template, "CreateExcusePolicyComponent_Conditional_91_Template");
var _CreateExcusePolicyComponent = class _CreateExcusePolicyComponent {
  excusePoliciesService = inject(ExcusePoliciesService);
  branchesService = inject(BranchesService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  // Signals for state management
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  // Form state with default values
  policyForm = {
    branchId: null,
    maxPersonalExcusesPerMonth: 5,
    maxPersonalExcuseHoursPerMonth: 8,
    maxPersonalExcuseHoursPerDay: 4,
    maxHoursPerExcuse: 2,
    requiresApproval: true,
    allowPartialHourExcuses: true,
    minimumExcuseDuration: 0.5,
    maxRetroactiveDays: 7,
    allowSelfServiceRequests: true
  };
  // Validation errors
  validationErrors = signal({}, ...ngDevMode ? [{ debugName: "validationErrors" }] : []);
  ngOnInit() {
    this.loadBranches();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadBranches() {
    this.branchesService.getBranches(1, 1e3).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.branches.set(result.items);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
      }, "error")
    });
  }
  validateForm() {
    const errors = {};
    if (this.policyForm.maxPersonalExcusesPerMonth <= 0 || this.policyForm.maxPersonalExcusesPerMonth > 100) {
      errors["maxPersonalExcusesPerMonth"] = this.t("excuse_policies.validation.excusesPerMonthRange");
    }
    if (this.policyForm.maxPersonalExcuseHoursPerMonth <= 0 || this.policyForm.maxPersonalExcuseHoursPerMonth > 744) {
      errors["maxPersonalExcuseHoursPerMonth"] = this.t("excuse_policies.validation.hoursPerMonthRange");
    }
    if (this.policyForm.maxPersonalExcuseHoursPerDay <= 0 || this.policyForm.maxPersonalExcuseHoursPerDay > 24) {
      errors["maxPersonalExcuseHoursPerDay"] = this.t("excuse_policies.validation.hoursPerDayRange");
    }
    if (this.policyForm.maxHoursPerExcuse <= 0) {
      errors["maxHoursPerExcuse"] = this.t("validation.min");
    }
    if (this.policyForm.minimumExcuseDuration <= 0) {
      errors["minimumExcuseDuration"] = this.t("validation.min");
    }
    if (this.policyForm.maxPersonalExcuseHoursPerDay > this.policyForm.maxPersonalExcuseHoursPerMonth) {
      errors["maxPersonalExcuseHoursPerDay"] = this.t("excuse_policies.validation.dailyExceedsMonthly");
    }
    if (this.policyForm.maxHoursPerExcuse > this.policyForm.maxPersonalExcuseHoursPerDay) {
      errors["maxHoursPerExcuse"] = this.t("excuse_policies.validation.excuseExceedsDaily");
    }
    if (this.policyForm.minimumExcuseDuration > this.policyForm.maxHoursPerExcuse) {
      errors["minimumExcuseDuration"] = this.t("excuse_policies.validation.minimumExceedsMaximum");
    }
    this.validationErrors.set(errors);
    return Object.keys(errors).length === 0;
  }
  onSubmit() {
    if (!this.validateForm()) {
      this.notificationService.error(this.t("app.error"), this.t("excuse_policies.validation.pleaseFix"));
      return;
    }
    this.submitting.set(true);
    const request = {
      branchId: this.policyForm.branchId,
      maxPersonalExcusesPerMonth: this.policyForm.maxPersonalExcusesPerMonth,
      maxPersonalExcuseHoursPerMonth: this.policyForm.maxPersonalExcuseHoursPerMonth,
      maxPersonalExcuseHoursPerDay: this.policyForm.maxPersonalExcuseHoursPerDay,
      maxHoursPerExcuse: this.policyForm.maxHoursPerExcuse,
      requiresApproval: this.policyForm.requiresApproval,
      allowPartialHourExcuses: this.policyForm.allowPartialHourExcuses,
      minimumExcuseDuration: this.policyForm.minimumExcuseDuration,
      maxRetroactiveDays: this.policyForm.maxRetroactiveDays,
      allowSelfServiceRequests: this.policyForm.allowSelfServiceRequests
    };
    this.excusePoliciesService.createExcusePolicy(request).subscribe({
      next: /* @__PURE__ */ __name((id) => {
        this.submitting.set(false);
        this.notificationService.success(this.t("app.success"), this.t("excuse_policies.create_success"));
        this.router.navigate(["/settings/excuse-policies", id, "view"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.submitting.set(false);
        console.error("Failed to create excuse policy:", error);
        let errorMessage = this.t("excuse_policies.create_error");
        if (error?.error?.error) {
          errorMessage = error.error.error;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        this.notificationService.error(this.t("app.error"), errorMessage);
      }, "error")
    });
  }
  onCancel() {
    this.router.navigate(["/settings/excuse-policies"]);
  }
};
__name(_CreateExcusePolicyComponent, "CreateExcusePolicyComponent");
__publicField(_CreateExcusePolicyComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateExcusePolicyComponent)();
}, "CreateExcusePolicyComponent_Factory"));
__publicField(_CreateExcusePolicyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateExcusePolicyComponent, selectors: [["app-create-excuse-policy"]], decls: 93, vars: 47, consts: [["policyFormRef", "ngForm"], [1, "container-fluid"], ["mode", "create", "moduleName", "excuse_policies", "moduleRoute", "settings/excuse-policies", 3, "title"], [3, "ngSubmit"], [1, "row"], [1, "col-md-12", "mb-4"], [3, "title"], [1, "mb-3"], ["for", "branchId", 1, "form-label"], ["id", "branchId", "name", "branchId", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "form-text"], [1, "col-md-6", "mb-4"], ["for", "maxExcusesMonth", 1, "form-label"], ["type", "number", "id", "maxExcusesMonth", "name", "maxExcusesMonth", "min", "1", "max", "100", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "text-danger", "small", "mt-1"], ["for", "maxHoursMonth", 1, "form-label"], ["type", "number", "id", "maxHoursMonth", "name", "maxHoursMonth", "min", "0.5", "step", "0.5", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "maxHoursDay", 1, "form-label"], ["type", "number", "id", "maxHoursDay", "name", "maxHoursDay", "min", "0.5", "step", "0.5", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "maxHoursPerExcuse", 1, "form-label"], ["type", "number", "id", "maxHoursPerExcuse", "name", "maxHoursPerExcuse", "min", "0.5", "step", "0.5", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "minimumDuration", 1, "form-label"], ["type", "number", "id", "minimumDuration", "name", "minimumDuration", "min", "0.5", "step", "0.5", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-md-6", "mb-3"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "requiresApproval", "name", "requiresApproval", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "requiresApproval", 1, "form-check-label"], ["type", "checkbox", "id", "allowPartialHours", "name", "allowPartialHours", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "allowPartialHours", 1, "form-check-label"], ["type", "checkbox", "id", "allowSelfService", "name", "allowSelfService", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "allowSelfService", 1, "form-check-label"], ["for", "maxRetroactiveDays", 1, "form-label"], ["type", "number", "id", "maxRetroactiveDays", "name", "maxRetroactiveDays", "min", "0", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-12"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-form-header", 2);
    \u0275\u0275elementStart(2, "form", 3, 0);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSubmit());
    }, "CreateExcusePolicyComponent_Template_form_ngSubmit_2_listener"));
    \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "app-form-section", 6)(7, "div", 7)(8, "label", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "select", 9);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_select_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.branchId, $event) || (ctx.policyForm.branchId = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_select_ngModelChange_10_listener"));
    \u0275\u0275elementStart(11, "option", 10);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, CreateExcusePolicyComponent_For_14_Template, 2, 2, "option", 10, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 11);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 12)(18, "app-form-section", 6)(19, "div", 7)(20, "label", 13);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.maxPersonalExcusesPerMonth, $event) || (ctx.policyForm.maxPersonalExcusesPerMonth = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_input_ngModelChange_22_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, CreateExcusePolicyComponent_Conditional_23_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(24, "div", 11);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 7)(27, "label", 16);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.maxPersonalExcuseHoursPerMonth, $event) || (ctx.policyForm.maxPersonalExcuseHoursPerMonth = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_input_ngModelChange_29_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(30, CreateExcusePolicyComponent_Conditional_30_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(31, "div", 11);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 12)(34, "app-form-section", 6)(35, "div", 7)(36, "label", 18);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.maxPersonalExcuseHoursPerDay, $event) || (ctx.policyForm.maxPersonalExcuseHoursPerDay = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_input_ngModelChange_38_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(39, CreateExcusePolicyComponent_Conditional_39_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(40, "div", 11);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 7)(43, "label", 20);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_input_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.maxHoursPerExcuse, $event) || (ctx.policyForm.maxHoursPerExcuse = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_input_ngModelChange_45_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(46, CreateExcusePolicyComponent_Conditional_46_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(47, "div", 11);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 7)(50, "label", 22);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_input_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.minimumExcuseDuration, $event) || (ctx.policyForm.minimumExcuseDuration = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_input_ngModelChange_52_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(53, CreateExcusePolicyComponent_Conditional_53_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(54, "div", 11);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "div", 5)(57, "app-form-section", 6)(58, "div", 4)(59, "div", 24)(60, "div", 25)(61, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.requiresApproval, $event) || (ctx.policyForm.requiresApproval = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_input_ngModelChange_61_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "label", 27);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 11);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 24)(67, "div", 25)(68, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_input_ngModelChange_68_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.allowPartialHourExcuses, $event) || (ctx.policyForm.allowPartialHourExcuses = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_input_ngModelChange_68_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "label", 29);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 11);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 24)(74, "div", 25)(75, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_input_ngModelChange_75_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.allowSelfServiceRequests, $event) || (ctx.policyForm.allowSelfServiceRequests = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_input_ngModelChange_75_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "label", 31);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 11);
    \u0275\u0275text(79);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "div", 24)(81, "label", 32);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_input_ngModelChange_83_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.policyForm.maxRetroactiveDays, $event) || (ctx.policyForm.maxRetroactiveDays = $event);
      return \u0275\u0275resetView($event);
    }, "CreateExcusePolicyComponent_Template_input_ngModelChange_83_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 11);
    \u0275\u0275text(85);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(86, "div", 34)(87, "div", 35)(88, "button", 36);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateExcusePolicyComponent_Template_button_click_88_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onCancel());
    }, "CreateExcusePolicyComponent_Template_button_click_88_listener"));
    \u0275\u0275text(89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "button", 37);
    \u0275\u0275conditionalCreate(91, CreateExcusePolicyComponent_Conditional_91_Template, 1, 0, "span", 38);
    \u0275\u0275text(92);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("excuse_policies.create_policy"));
    \u0275\u0275advance(5);
    \u0275\u0275property("title", ctx.t("excuse_policies.scope_configuration"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.branch"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.branchId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.organization_wide"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.branches());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.branch_help"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx.t("excuse_policies.monthly_limits"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_personal_excuses_per_month"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.maxPersonalExcusesPerMonth);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.validationErrors()["maxPersonalExcusesPerMonth"] ? 23 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_excuses_month_help"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_personal_excuse_hours_per_month"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.maxPersonalExcuseHoursPerMonth);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.validationErrors()["maxPersonalExcuseHoursPerMonth"] ? 30 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_hours_month_help"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx.t("excuse_policies.time_limits"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_personal_excuse_hours_per_day"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.maxPersonalExcuseHoursPerDay);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.validationErrors()["maxPersonalExcuseHoursPerDay"] ? 39 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_hours_day_help"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_hours_per_excuse"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.maxHoursPerExcuse);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.validationErrors()["maxHoursPerExcuse"] ? 46 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_hours_per_excuse_help"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.minimum_duration"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.minimumExcuseDuration);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.validationErrors()["minimumExcuseDuration"] ? 53 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.minimum_duration_help"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx.t("excuse_policies.policy_options"));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.requiresApproval);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.requires_approval"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.requires_approval_help"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.allowPartialHourExcuses);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.allow_partial_hours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.allow_partial_hours_help"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.allowSelfServiceRequests);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("excuse_policies.allow_self_service"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.allow_self_service_help"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_retroactive_days"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.policyForm.maxRetroactiveDays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("excuse_policies.max_retroactive_days_help"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 91 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("common.save"), " ");
  }
}, "CreateExcusePolicyComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, RouterModule, FormHeaderComponent, FormSectionComponent], styles: ["\n\n.container-fluid[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.card[_ngcontent-%COMP%] {\n  border: 1px solid #dee2e6;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dee2e6;\n  padding: 0.75rem 1rem;\n}\n.card-header[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=create-excuse-policy.component.css.map */"] }));
var CreateExcusePolicyComponent = _CreateExcusePolicyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateExcusePolicyComponent, [{
    type: Component,
    args: [{ selector: "app-create-excuse-policy", standalone: true, imports: [FormsModule, RouterModule, FormHeaderComponent, FormSectionComponent], template: `<div class="container-fluid">
  <app-form-header
    mode="create"
    [title]="t('excuse_policies.create_policy')"
    moduleName="excuse_policies"
    moduleRoute="settings/excuse-policies">
  </app-form-header>

  <form #policyFormRef="ngForm" (ngSubmit)="onSubmit()">
    <div class="row">
      <!-- Scope Configuration -->
      <div class="col-md-12 mb-4">
        <app-form-section [title]="t('excuse_policies.scope_configuration')">
            <div class="mb-3">
              <label for="branchId" class="form-label">{{ t('excuse_policies.branch') }}</label>
              <select id="branchId" class="form-select" [(ngModel)]="policyForm.branchId" name="branchId">
                <option [ngValue]="null">{{ t('excuse_policies.organization_wide') }}</option>
                @for (branch of branches(); track branch.id) {
                  <option [ngValue]="branch.id">{{ branch.name }}</option>
                }
              </select>
              <div class="form-text">{{ t('excuse_policies.branch_help') }}</div>
            </div>
        </app-form-section>
      </div>

      <!-- Monthly Limits -->
      <div class="col-md-6 mb-4">
        <app-form-section [title]="t('excuse_policies.monthly_limits')">
            <div class="mb-3">
              <label for="maxExcusesMonth" class="form-label">{{ t('excuse_policies.max_personal_excuses_per_month') }}</label>
              <input
                type="number"
                id="maxExcusesMonth"
                class="form-control"
                [(ngModel)]="policyForm.maxPersonalExcusesPerMonth"
                name="maxExcusesMonth"
                min="1"
                max="100"
                required>
              @if (validationErrors()['maxPersonalExcusesPerMonth']) {
                <div class="text-danger small mt-1">{{ validationErrors()['maxPersonalExcusesPerMonth'] }}</div>
              }
              <div class="form-text">{{ t('excuse_policies.max_excuses_month_help') }}</div>
            </div>
            <div class="mb-3">
              <label for="maxHoursMonth" class="form-label">{{ t('excuse_policies.max_personal_excuse_hours_per_month') }}</label>
              <input
                type="number"
                id="maxHoursMonth"
                class="form-control"
                [(ngModel)]="policyForm.maxPersonalExcuseHoursPerMonth"
                name="maxHoursMonth"
                min="0.5"
                step="0.5"
                required>
              @if (validationErrors()['maxPersonalExcuseHoursPerMonth']) {
                <div class="text-danger small mt-1">{{ validationErrors()['maxPersonalExcuseHoursPerMonth'] }}</div>
              }
              <div class="form-text">{{ t('excuse_policies.max_hours_month_help') }}</div>
            </div>
        </app-form-section>
      </div>

      <!-- Time Limits -->
      <div class="col-md-6 mb-4">
        <app-form-section [title]="t('excuse_policies.time_limits')">
            <div class="mb-3">
              <label for="maxHoursDay" class="form-label">{{ t('excuse_policies.max_personal_excuse_hours_per_day') }}</label>
              <input
                type="number"
                id="maxHoursDay"
                class="form-control"
                [(ngModel)]="policyForm.maxPersonalExcuseHoursPerDay"
                name="maxHoursDay"
                min="0.5"
                step="0.5"
                required>
              @if (validationErrors()['maxPersonalExcuseHoursPerDay']) {
                <div class="text-danger small mt-1">{{ validationErrors()['maxPersonalExcuseHoursPerDay'] }}</div>
              }
              <div class="form-text">{{ t('excuse_policies.max_hours_day_help') }}</div>
            </div>
            <div class="mb-3">
              <label for="maxHoursPerExcuse" class="form-label">{{ t('excuse_policies.max_hours_per_excuse') }}</label>
              <input
                type="number"
                id="maxHoursPerExcuse"
                class="form-control"
                [(ngModel)]="policyForm.maxHoursPerExcuse"
                name="maxHoursPerExcuse"
                min="0.5"
                step="0.5"
                required>
              @if (validationErrors()['maxHoursPerExcuse']) {
                <div class="text-danger small mt-1">{{ validationErrors()['maxHoursPerExcuse'] }}</div>
              }
              <div class="form-text">{{ t('excuse_policies.max_hours_per_excuse_help') }}</div>
            </div>
            <div class="mb-3">
              <label for="minimumDuration" class="form-label">{{ t('excuse_policies.minimum_duration') }}</label>
              <input
                type="number"
                id="minimumDuration"
                class="form-control"
                [(ngModel)]="policyForm.minimumExcuseDuration"
                name="minimumDuration"
                min="0.5"
                step="0.5"
                required>
              @if (validationErrors()['minimumExcuseDuration']) {
                <div class="text-danger small mt-1">{{ validationErrors()['minimumExcuseDuration'] }}</div>
              }
              <div class="form-text">{{ t('excuse_policies.minimum_duration_help') }}</div>
            </div>
        </app-form-section>
      </div>

      <!-- Policy Options -->
      <div class="col-md-12 mb-4">
        <app-form-section [title]="t('excuse_policies.policy_options')">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-check form-switch">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="requiresApproval"
                    [(ngModel)]="policyForm.requiresApproval"
                    name="requiresApproval">
                  <label class="form-check-label" for="requiresApproval">
                    {{ t('excuse_policies.requires_approval') }}
                  </label>
                </div>
                <div class="form-text">{{ t('excuse_policies.requires_approval_help') }}</div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-check form-switch">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="allowPartialHours"
                    [(ngModel)]="policyForm.allowPartialHourExcuses"
                    name="allowPartialHours">
                  <label class="form-check-label" for="allowPartialHours">
                    {{ t('excuse_policies.allow_partial_hours') }}
                  </label>
                </div>
                <div class="form-text">{{ t('excuse_policies.allow_partial_hours_help') }}</div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-check form-switch">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="allowSelfService"
                    [(ngModel)]="policyForm.allowSelfServiceRequests"
                    name="allowSelfService">
                  <label class="form-check-label" for="allowSelfService">
                    {{ t('excuse_policies.allow_self_service') }}
                  </label>
                </div>
                <div class="form-text">{{ t('excuse_policies.allow_self_service_help') }}</div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="maxRetroactiveDays" class="form-label">{{ t('excuse_policies.max_retroactive_days') }}</label>
                <input
                  type="number"
                  id="maxRetroactiveDays"
                  class="form-control"
                  [(ngModel)]="policyForm.maxRetroactiveDays"
                  name="maxRetroactiveDays"
                  min="0"
                  required>
                <div class="form-text">{{ t('excuse_policies.max_retroactive_days_help') }}</div>
              </div>
            </div>
        </app-form-section>
      </div>

      <!-- Form Actions -->
      <div class="col-12">
        <div class="d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-secondary" (click)="onCancel()" [disabled]="submitting()">
            {{ t('common.cancel') }}
          </button>
          <button type="submit" class="btn btn-primary" [disabled]="submitting()">
            @if (submitting()) {
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            }
            {{ t('common.save') }}
          </button>
        </div>
      </div>
    </div>
  </form>
</div>
`, styles: ["/* src/app/pages/settings/excuse-policies/create-excuse-policy/create-excuse-policy.component.css */\n.container-fluid {\n  padding: 1.5rem;\n}\n.card {\n  border: 1px solid #dee2e6;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-header {\n  border-bottom: 1px solid #dee2e6;\n  padding: 0.75rem 1rem;\n}\n.card-header h6 {\n  font-weight: 600;\n  color: #495057;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=create-excuse-policy.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateExcusePolicyComponent, { className: "CreateExcusePolicyComponent", filePath: "src/app/pages/settings/excuse-policies/create-excuse-policy/create-excuse-policy.component.ts", lineNumber: 20 });
})();
export {
  CreateExcusePolicyComponent
};
//# sourceMappingURL=chunk-A3ENWKTZ.js.map
