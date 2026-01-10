import {
  ExcusePoliciesService
} from "./chunk-FWTWBCN6.js";
import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
import {
  FormSectionComponent
} from "./chunk-JTLHOQFH.js";
import {
  BranchesService
} from "./chunk-Z44KTAEC.js";
import "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
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
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
  ActivatedRoute,
  Router,
  RouterModule
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  Component,
  Subject,
  inject,
  setClassMetadata,
  signal,
  switchMap,
  takeUntil,
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
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/settings/excuse-policies/edit-excuse-policy/edit-excuse-policy.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function EditExcusePolicyComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
__name(EditExcusePolicyComponent_Conditional_1_Template, "EditExcusePolicyComponent_Conditional_1_Template");
function EditExcusePolicyComponent_Conditional_2_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r3 = ctx.$implicit;
    \u0275\u0275property("ngValue", branch_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(branch_r3.name);
  }
}
__name(EditExcusePolicyComponent_Conditional_2_For_13_Template, "EditExcusePolicyComponent_Conditional_2_For_13_Template");
function EditExcusePolicyComponent_Conditional_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.validationErrors()["maxPersonalExcusesPerMonth"]);
  }
}
__name(EditExcusePolicyComponent_Conditional_2_Conditional_22_Template, "EditExcusePolicyComponent_Conditional_2_Conditional_22_Template");
function EditExcusePolicyComponent_Conditional_2_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.validationErrors()["maxPersonalExcuseHoursPerMonth"]);
  }
}
__name(EditExcusePolicyComponent_Conditional_2_Conditional_29_Template, "EditExcusePolicyComponent_Conditional_2_Conditional_29_Template");
function EditExcusePolicyComponent_Conditional_2_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.validationErrors()["maxPersonalExcuseHoursPerDay"]);
  }
}
__name(EditExcusePolicyComponent_Conditional_2_Conditional_38_Template, "EditExcusePolicyComponent_Conditional_2_Conditional_38_Template");
function EditExcusePolicyComponent_Conditional_2_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.validationErrors()["maxHoursPerExcuse"]);
  }
}
__name(EditExcusePolicyComponent_Conditional_2_Conditional_45_Template, "EditExcusePolicyComponent_Conditional_2_Conditional_45_Template");
function EditExcusePolicyComponent_Conditional_2_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.validationErrors()["minimumExcuseDuration"]);
  }
}
__name(EditExcusePolicyComponent_Conditional_2_Conditional_52_Template, "EditExcusePolicyComponent_Conditional_2_Conditional_52_Template");
function EditExcusePolicyComponent_Conditional_2_Conditional_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 40);
  }
}
__name(EditExcusePolicyComponent_Conditional_2_Conditional_97_Template, "EditExcusePolicyComponent_Conditional_2_Conditional_97_Template");
function EditExcusePolicyComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "app-form-header", 2);
    \u0275\u0275elementStart(1, "form", 3, 0);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    }, "EditExcusePolicyComponent_Conditional_2_Template_form_ngSubmit_1_listener"));
    \u0275\u0275elementStart(3, "div", 4)(4, "div", 5)(5, "app-form-section", 6)(6, "div", 7)(7, "label", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 9);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.branchId, $event) || (ctx_r1.policyForm.branchId = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_select_ngModelChange_9_listener"));
    \u0275\u0275elementStart(10, "option", 10);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, EditExcusePolicyComponent_Conditional_2_For_13_Template, 2, 2, "option", 10, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 11);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "div", 12)(17, "app-form-section", 6)(18, "div", 7)(19, "label", 13);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.maxPersonalExcusesPerMonth, $event) || (ctx_r1.policyForm.maxPersonalExcusesPerMonth = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_21_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(22, EditExcusePolicyComponent_Conditional_2_Conditional_22_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(23, "div", 11);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 7)(26, "label", 16);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.maxPersonalExcuseHoursPerMonth, $event) || (ctx_r1.policyForm.maxPersonalExcuseHoursPerMonth = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_28_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(29, EditExcusePolicyComponent_Conditional_2_Conditional_29_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(30, "div", 11);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "div", 12)(33, "app-form-section", 6)(34, "div", 7)(35, "label", 18);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.maxPersonalExcuseHoursPerDay, $event) || (ctx_r1.policyForm.maxPersonalExcuseHoursPerDay = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_37_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(38, EditExcusePolicyComponent_Conditional_2_Conditional_38_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(39, "div", 11);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 7)(42, "label", 20);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.maxHoursPerExcuse, $event) || (ctx_r1.policyForm.maxHoursPerExcuse = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_44_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(45, EditExcusePolicyComponent_Conditional_2_Conditional_45_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(46, "div", 11);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 7)(49, "label", 22);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.minimumExcuseDuration, $event) || (ctx_r1.policyForm.minimumExcuseDuration = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_51_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(52, EditExcusePolicyComponent_Conditional_2_Conditional_52_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(53, "div", 11);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(55, "div", 5)(56, "app-form-section", 6)(57, "div", 4)(58, "div", 24)(59, "div", 25)(60, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.requiresApproval, $event) || (ctx_r1.policyForm.requiresApproval = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_60_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "label", 27);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "div", 11);
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 24)(66, "div", 25)(67, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_67_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.allowPartialHourExcuses, $event) || (ctx_r1.policyForm.allowPartialHourExcuses = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_67_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "label", 29);
    \u0275\u0275text(69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "div", 11);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 24)(73, "div", 25)(74, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_74_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.allowSelfServiceRequests, $event) || (ctx_r1.policyForm.allowSelfServiceRequests = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_74_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "label", 31);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(77, "div", 11);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 24)(80, "label", 32);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_82_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.maxRetroactiveDays, $event) || (ctx_r1.policyForm.maxRetroactiveDays = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_82_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div", 11);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "div", 24)(86, "div", 25)(87, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_87_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.policyForm.isActive, $event) || (ctx_r1.policyForm.isActive = $event);
      return \u0275\u0275resetView($event);
    }, "EditExcusePolicyComponent_Conditional_2_Template_input_ngModelChange_87_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "label", 35);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(90, "div", 11);
    \u0275\u0275text(91);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(92, "div", 36)(93, "div", 37)(94, "button", 38);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_2_Template_button_click_94_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancel());
    }, "EditExcusePolicyComponent_Conditional_2_Template_button_click_94_listener"));
    \u0275\u0275text(95);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "button", 39);
    \u0275\u0275conditionalCreate(97, EditExcusePolicyComponent_Conditional_2_Conditional_97_Template, 1, 0, "span", 40);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r1.t("excuse_policies.edit_policy"))("entityId", ctx_r1.policyId() ?? void 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("title", ctx_r1.t("excuse_policies.scope_configuration"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.branch"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.branchId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.organization_wide"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.branches());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.branch_help"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r1.t("excuse_policies.monthly_limits"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_personal_excuses_per_month"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.maxPersonalExcusesPerMonth);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.validationErrors()["maxPersonalExcusesPerMonth"] ? 22 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_excuses_month_help"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_personal_excuse_hours_per_month"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.maxPersonalExcuseHoursPerMonth);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.validationErrors()["maxPersonalExcuseHoursPerMonth"] ? 29 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_hours_month_help"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r1.t("excuse_policies.time_limits"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_personal_excuse_hours_per_day"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.maxPersonalExcuseHoursPerDay);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.validationErrors()["maxPersonalExcuseHoursPerDay"] ? 38 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_hours_day_help"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_hours_per_excuse"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.maxHoursPerExcuse);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.validationErrors()["maxHoursPerExcuse"] ? 45 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_hours_per_excuse_help"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.minimum_duration"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.minimumExcuseDuration);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.validationErrors()["minimumExcuseDuration"] ? 52 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.minimum_duration_help"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r1.t("excuse_policies.policy_options"));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.requiresApproval);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("excuse_policies.requires_approval"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.requires_approval_help"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.allowPartialHourExcuses);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("excuse_policies.allow_partial_hours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.allow_partial_hours_help"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.allowSelfServiceRequests);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("excuse_policies.allow_self_service"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.allow_self_service_help"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_retroactive_days"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.maxRetroactiveDays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.max_retroactive_days_help"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.policyForm.isActive);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("excuse_policies.is_active"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("excuse_policies.is_active_help"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.submitting() ? 97 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("common.save"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_2_Template, "EditExcusePolicyComponent_Conditional_2_Template");
var _EditExcusePolicyComponent = class _EditExcusePolicyComponent {
  excusePoliciesService = inject(ExcusePoliciesService);
  branchesService = inject(BranchesService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  destroy$ = new Subject();
  i18n = inject(I18nService);
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  policyId = signal(null, ...ngDevMode ? [{ debugName: "policyId" }] : []);
  // Form state
  policyForm = {
    id: 0,
    branchId: null,
    maxPersonalExcusesPerMonth: 5,
    maxPersonalExcuseHoursPerMonth: 8,
    maxPersonalExcuseHoursPerDay: 4,
    maxHoursPerExcuse: 2,
    requiresApproval: true,
    allowPartialHourExcuses: true,
    minimumExcuseDuration: 0.5,
    maxRetroactiveDays: 7,
    allowSelfServiceRequests: true,
    isActive: true
  };
  // Validation errors
  validationErrors = signal({}, ...ngDevMode ? [{ debugName: "validationErrors" }] : []);
  ngOnInit() {
    this.loadBranches();
    this.loadPolicy();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
  loadPolicy() {
    this.loading.set(true);
    this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap((params) => {
      const id = Number(params.get("id"));
      if (!id || id <= 0) {
        this.notificationService.error(this.t("app.error"), this.t("excuse_policies.errors.load_failed"));
        this.router.navigate(["/settings/excuse-policies"]);
        throw new Error("Invalid excuse policy ID");
      }
      this.policyId.set(id);
      return this.excusePoliciesService.getExcusePolicyById(id);
    })).subscribe({
      next: /* @__PURE__ */ __name((policy) => {
        this.loading.set(false);
        this.policyForm = {
          id: policy.id,
          branchId: policy.branchId,
          maxPersonalExcusesPerMonth: policy.maxPersonalExcusesPerMonth,
          maxPersonalExcuseHoursPerMonth: policy.maxPersonalExcuseHoursPerMonth,
          maxPersonalExcuseHoursPerDay: policy.maxPersonalExcuseHoursPerDay,
          maxHoursPerExcuse: policy.maxHoursPerExcuse,
          requiresApproval: policy.requiresApproval,
          allowPartialHourExcuses: policy.allowPartialHourExcuses,
          minimumExcuseDuration: policy.minimumExcuseDuration,
          maxRetroactiveDays: policy.maxRetroactiveDays,
          allowSelfServiceRequests: policy.allowSelfServiceRequests,
          isActive: policy.isActive
        };
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        console.error("Failed to load excuse policy:", error);
        this.notificationService.error(this.t("app.error"), this.t("excuse_policies.errors.load_failed"));
        this.router.navigate(["/settings/excuse-policies"]);
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
      id: this.policyForm.id,
      branchId: this.policyForm.branchId,
      maxPersonalExcusesPerMonth: this.policyForm.maxPersonalExcusesPerMonth,
      maxPersonalExcuseHoursPerMonth: this.policyForm.maxPersonalExcuseHoursPerMonth,
      maxPersonalExcuseHoursPerDay: this.policyForm.maxPersonalExcuseHoursPerDay,
      maxHoursPerExcuse: this.policyForm.maxHoursPerExcuse,
      requiresApproval: this.policyForm.requiresApproval,
      allowPartialHourExcuses: this.policyForm.allowPartialHourExcuses,
      minimumExcuseDuration: this.policyForm.minimumExcuseDuration,
      maxRetroactiveDays: this.policyForm.maxRetroactiveDays,
      allowSelfServiceRequests: this.policyForm.allowSelfServiceRequests,
      isActive: this.policyForm.isActive
    };
    this.excusePoliciesService.updateExcusePolicy(this.policyForm.id, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.submitting.set(false);
        this.notificationService.success(this.t("app.success"), this.t("excuse_policies.update_success"));
        this.router.navigate(["/settings/excuse-policies", this.policyForm.id, "view"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.submitting.set(false);
        console.error("Failed to update excuse policy:", error);
        let errorMessage = this.t("excuse_policies.update_error");
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
    this.router.navigate(["/settings/excuse-policies", this.policyForm.id, "view"]);
  }
};
__name(_EditExcusePolicyComponent, "EditExcusePolicyComponent");
__publicField(_EditExcusePolicyComponent, "\u0275fac", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditExcusePolicyComponent)();
}, "EditExcusePolicyComponent_Factory"));
__publicField(_EditExcusePolicyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditExcusePolicyComponent, selectors: [["app-edit-excuse-policy"]], decls: 3, vars: 2, consts: [["policyFormRef", "ngForm"], [1, "container-fluid"], ["mode", "edit", "moduleName", "excuse_policies", "moduleRoute", "settings/excuse-policies", 3, "title", "entityId"], [3, "ngSubmit"], [1, "row"], [1, "col-md-12", "mb-4"], [3, "title"], [1, "mb-3"], ["for", "branchId", 1, "form-label"], ["id", "branchId", "name", "branchId", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "form-text"], [1, "col-md-6", "mb-4"], ["for", "maxExcusesMonth", 1, "form-label"], ["type", "number", "id", "maxExcusesMonth", "name", "maxExcusesMonth", "min", "1", "max", "100", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "text-danger", "small", "mt-1"], ["for", "maxHoursMonth", 1, "form-label"], ["type", "number", "id", "maxHoursMonth", "name", "maxHoursMonth", "min", "0.5", "step", "0.5", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "maxHoursDay", 1, "form-label"], ["type", "number", "id", "maxHoursDay", "name", "maxHoursDay", "min", "0.5", "step", "0.5", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "maxHoursPerExcuse", 1, "form-label"], ["type", "number", "id", "maxHoursPerExcuse", "name", "maxHoursPerExcuse", "min", "0.5", "step", "0.5", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "minimumDuration", 1, "form-label"], ["type", "number", "id", "minimumDuration", "name", "minimumDuration", "min", "0.5", "step", "0.5", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-md-6", "mb-3"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "requiresApproval", "name", "requiresApproval", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "requiresApproval", 1, "form-check-label"], ["type", "checkbox", "id", "allowPartialHours", "name", "allowPartialHours", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "allowPartialHours", 1, "form-check-label"], ["type", "checkbox", "id", "allowSelfService", "name", "allowSelfService", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "allowSelfService", 1, "form-check-label"], ["for", "maxRetroactiveDays", 1, "form-label"], ["type", "number", "id", "maxRetroactiveDays", "name", "maxRetroactiveDays", "min", "0", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "id", "isActive", "name", "isActive", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "isActive", 1, "form-check-label"], [1, "col-12"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: /* @__PURE__ */ __name(function EditExcusePolicyComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, EditExcusePolicyComponent_Conditional_1_Template, 1, 0, "app-loading-spinner");
    \u0275\u0275conditionalCreate(2, EditExcusePolicyComponent_Conditional_2_Template, 99, 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() ? 2 : -1);
  }
}, "EditExcusePolicyComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, RouterModule, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent], styles: ["\n\n.container-fluid[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.card[_ngcontent-%COMP%] {\n  border: 1px solid #dee2e6;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dee2e6;\n  padding: 0.75rem 1rem;\n}\n.card-header[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=edit-excuse-policy.component.css.map */"] }));
var EditExcusePolicyComponent = _EditExcusePolicyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditExcusePolicyComponent, [{
    type: Component,
    args: [{ selector: "app-edit-excuse-policy", standalone: true, imports: [FormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent], template: `<div class="container-fluid">\r
  @if (loading()) {\r
    <app-loading-spinner></app-loading-spinner>\r
  }\r
\r
  @if (!loading()) {\r
    <app-form-header\r
      mode="edit"\r
      [title]="t('excuse_policies.edit_policy')"\r
      [entityId]="policyId() ?? undefined"\r
      moduleName="excuse_policies"\r
      moduleRoute="settings/excuse-policies">\r
    </app-form-header>\r
\r
    <form #policyFormRef="ngForm" (ngSubmit)="onSubmit()">\r
    <div class="row">\r
      <!-- Scope Configuration -->\r
      <div class="col-md-12 mb-4">\r
        <app-form-section [title]="t('excuse_policies.scope_configuration')">\r
            <div class="mb-3">\r
              <label for="branchId" class="form-label">{{ t('excuse_policies.branch') }}</label>\r
              <select id="branchId" class="form-select" [(ngModel)]="policyForm.branchId" name="branchId">\r
                <option [ngValue]="null">{{ t('excuse_policies.organization_wide') }}</option>\r
                @for (branch of branches(); track branch.id) {\r
                  <option [ngValue]="branch.id">{{ branch.name }}</option>\r
                }\r
              </select>\r
              <div class="form-text">{{ t('excuse_policies.branch_help') }}</div>\r
            </div>\r
        </app-form-section>\r
      </div>\r
\r
      <!-- Monthly Limits -->\r
      <div class="col-md-6 mb-4">\r
        <app-form-section [title]="t('excuse_policies.monthly_limits')">\r
            <div class="mb-3">\r
              <label for="maxExcusesMonth" class="form-label">{{ t('excuse_policies.max_personal_excuses_per_month') }}</label>\r
              <input\r
                type="number"\r
                id="maxExcusesMonth"\r
                class="form-control"\r
                [(ngModel)]="policyForm.maxPersonalExcusesPerMonth"\r
                name="maxExcusesMonth"\r
                min="1"\r
                max="100"\r
                required>\r
              @if (validationErrors()['maxPersonalExcusesPerMonth']) {\r
                <div class="text-danger small mt-1">{{ validationErrors()['maxPersonalExcusesPerMonth'] }}</div>\r
              }\r
              <div class="form-text">{{ t('excuse_policies.max_excuses_month_help') }}</div>\r
            </div>\r
            <div class="mb-3">\r
              <label for="maxHoursMonth" class="form-label">{{ t('excuse_policies.max_personal_excuse_hours_per_month') }}</label>\r
              <input\r
                type="number"\r
                id="maxHoursMonth"\r
                class="form-control"\r
                [(ngModel)]="policyForm.maxPersonalExcuseHoursPerMonth"\r
                name="maxHoursMonth"\r
                min="0.5"\r
                step="0.5"\r
                required>\r
              @if (validationErrors()['maxPersonalExcuseHoursPerMonth']) {\r
                <div class="text-danger small mt-1">{{ validationErrors()['maxPersonalExcuseHoursPerMonth'] }}</div>\r
              }\r
              <div class="form-text">{{ t('excuse_policies.max_hours_month_help') }}</div>\r
            </div>\r
        </app-form-section>\r
      </div>\r
\r
      <!-- Time Limits -->\r
      <div class="col-md-6 mb-4">\r
        <app-form-section [title]="t('excuse_policies.time_limits')">\r
            <div class="mb-3">\r
              <label for="maxHoursDay" class="form-label">{{ t('excuse_policies.max_personal_excuse_hours_per_day') }}</label>\r
              <input\r
                type="number"\r
                id="maxHoursDay"\r
                class="form-control"\r
                [(ngModel)]="policyForm.maxPersonalExcuseHoursPerDay"\r
                name="maxHoursDay"\r
                min="0.5"\r
                step="0.5"\r
                required>\r
              @if (validationErrors()['maxPersonalExcuseHoursPerDay']) {\r
                <div class="text-danger small mt-1">{{ validationErrors()['maxPersonalExcuseHoursPerDay'] }}</div>\r
              }\r
              <div class="form-text">{{ t('excuse_policies.max_hours_day_help') }}</div>\r
            </div>\r
            <div class="mb-3">\r
              <label for="maxHoursPerExcuse" class="form-label">{{ t('excuse_policies.max_hours_per_excuse') }}</label>\r
              <input\r
                type="number"\r
                id="maxHoursPerExcuse"\r
                class="form-control"\r
                [(ngModel)]="policyForm.maxHoursPerExcuse"\r
                name="maxHoursPerExcuse"\r
                min="0.5"\r
                step="0.5"\r
                required>\r
              @if (validationErrors()['maxHoursPerExcuse']) {\r
                <div class="text-danger small mt-1">{{ validationErrors()['maxHoursPerExcuse'] }}</div>\r
              }\r
              <div class="form-text">{{ t('excuse_policies.max_hours_per_excuse_help') }}</div>\r
            </div>\r
            <div class="mb-3">\r
              <label for="minimumDuration" class="form-label">{{ t('excuse_policies.minimum_duration') }}</label>\r
              <input\r
                type="number"\r
                id="minimumDuration"\r
                class="form-control"\r
                [(ngModel)]="policyForm.minimumExcuseDuration"\r
                name="minimumDuration"\r
                min="0.5"\r
                step="0.5"\r
                required>\r
              @if (validationErrors()['minimumExcuseDuration']) {\r
                <div class="text-danger small mt-1">{{ validationErrors()['minimumExcuseDuration'] }}</div>\r
              }\r
              <div class="form-text">{{ t('excuse_policies.minimum_duration_help') }}</div>\r
            </div>\r
        </app-form-section>\r
      </div>\r
\r
      <!-- Policy Options -->\r
      <div class="col-md-12 mb-4">\r
        <app-form-section [title]="t('excuse_policies.policy_options')">\r
            <div class="row">\r
              <div class="col-md-6 mb-3">\r
                <div class="form-check form-switch">\r
                  <input\r
                    type="checkbox"\r
                    class="form-check-input"\r
                    id="requiresApproval"\r
                    [(ngModel)]="policyForm.requiresApproval"\r
                    name="requiresApproval">\r
                  <label class="form-check-label" for="requiresApproval">\r
                    {{ t('excuse_policies.requires_approval') }}\r
                  </label>\r
                </div>\r
                <div class="form-text">{{ t('excuse_policies.requires_approval_help') }}</div>\r
              </div>\r
              <div class="col-md-6 mb-3">\r
                <div class="form-check form-switch">\r
                  <input\r
                    type="checkbox"\r
                    class="form-check-input"\r
                    id="allowPartialHours"\r
                    [(ngModel)]="policyForm.allowPartialHourExcuses"\r
                    name="allowPartialHours">\r
                  <label class="form-check-label" for="allowPartialHours">\r
                    {{ t('excuse_policies.allow_partial_hours') }}\r
                  </label>\r
                </div>\r
                <div class="form-text">{{ t('excuse_policies.allow_partial_hours_help') }}</div>\r
              </div>\r
              <div class="col-md-6 mb-3">\r
                <div class="form-check form-switch">\r
                  <input\r
                    type="checkbox"\r
                    class="form-check-input"\r
                    id="allowSelfService"\r
                    [(ngModel)]="policyForm.allowSelfServiceRequests"\r
                    name="allowSelfService">\r
                  <label class="form-check-label" for="allowSelfService">\r
                    {{ t('excuse_policies.allow_self_service') }}\r
                  </label>\r
                </div>\r
                <div class="form-text">{{ t('excuse_policies.allow_self_service_help') }}</div>\r
              </div>\r
              <div class="col-md-6 mb-3">\r
                <label for="maxRetroactiveDays" class="form-label">{{ t('excuse_policies.max_retroactive_days') }}</label>\r
                <input\r
                  type="number"\r
                  id="maxRetroactiveDays"\r
                  class="form-control"\r
                  [(ngModel)]="policyForm.maxRetroactiveDays"\r
                  name="maxRetroactiveDays"\r
                  min="0"\r
                  required>\r
                <div class="form-text">{{ t('excuse_policies.max_retroactive_days_help') }}</div>\r
              </div>\r
              <div class="col-md-6 mb-3">\r
                <div class="form-check form-switch">\r
                  <input\r
                    type="checkbox"\r
                    class="form-check-input"\r
                    id="isActive"\r
                    [(ngModel)]="policyForm.isActive"\r
                    name="isActive">\r
                  <label class="form-check-label" for="isActive">\r
                    {{ t('excuse_policies.is_active') }}\r
                  </label>\r
                </div>\r
                <div class="form-text">{{ t('excuse_policies.is_active_help') }}</div>\r
              </div>\r
            </div>\r
        </app-form-section>\r
      </div>\r
\r
      <!-- Form Actions -->\r
      <div class="col-12">\r
        <div class="d-flex justify-content-end gap-2">\r
          <button type="button" class="btn btn-outline-secondary" (click)="onCancel()" [disabled]="submitting()">\r
            {{ t('common.cancel') }}\r
          </button>\r
          <button type="submit" class="btn btn-primary" [disabled]="submitting()">\r
            @if (submitting()) {\r
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
            }\r
            {{ t('common.save') }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
    </form>\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/settings/excuse-policies/edit-excuse-policy/edit-excuse-policy.component.css */\n.container-fluid {\n  padding: 1.5rem;\n}\n.card {\n  border: 1px solid #dee2e6;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-header {\n  border-bottom: 1px solid #dee2e6;\n  padding: 0.75rem 1rem;\n}\n.card-header h6 {\n  font-weight: 600;\n  color: #495057;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=edit-excuse-policy.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditExcusePolicyComponent, { className: "EditExcusePolicyComponent", filePath: "src/app/pages/settings/excuse-policies/edit-excuse-policy/edit-excuse-policy.component.ts", lineNumber: 22 });
})();
export {
  EditExcusePolicyComponent
};
//# sourceMappingURL=chunk-RN5HSYLN.js.map
