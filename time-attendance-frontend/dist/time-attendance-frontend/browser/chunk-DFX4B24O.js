import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  SearchableSelectComponent
} from "./chunk-YVOT2QSR.js";
import {
  FormSectionComponent
} from "./chunk-D5G6MELX.js";
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
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  ActivatedRoute,
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

// src/app/pages/excuse-policies/edit-excuse-policy/edit-excuse-policy.component.ts
function EditExcusePolicyComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 4)(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 6);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("excuse_policies.loading_details"));
  }
}
__name(EditExcusePolicyComponent_Conditional_2_Template, "EditExcusePolicyComponent_Conditional_2_Template");
function EditExcusePolicyComponent_Conditional_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("branchId"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Conditional_9_Template, "EditExcusePolicyComponent_Conditional_3_Conditional_9_Template");
function EditExcusePolicyComponent_Conditional_3_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("maxPersonalExcusesPerMonth"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Conditional_27_Template, "EditExcusePolicyComponent_Conditional_3_Conditional_27_Template");
function EditExcusePolicyComponent_Conditional_3_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("maxPersonalExcuseHoursPerMonth"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Conditional_34_Template, "EditExcusePolicyComponent_Conditional_3_Conditional_34_Template");
function EditExcusePolicyComponent_Conditional_3_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("maxPersonalExcuseHoursPerDay"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Conditional_41_Template, "EditExcusePolicyComponent_Conditional_3_Conditional_41_Template");
function EditExcusePolicyComponent_Conditional_3_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("maxHoursPerExcuse"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Conditional_48_Template, "EditExcusePolicyComponent_Conditional_3_Conditional_48_Template");
function EditExcusePolicyComponent_Conditional_3_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("minimumExcuseDuration"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Conditional_60_Template, "EditExcusePolicyComponent_Conditional_3_Conditional_60_Template");
function EditExcusePolicyComponent_Conditional_3_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("maxRetroactiveDays"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Conditional_70_Template, "EditExcusePolicyComponent_Conditional_3_Conditional_70_Template");
function EditExcusePolicyComponent_Conditional_3_Conditional_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 63);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.saving"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Conditional_103_Template, "EditExcusePolicyComponent_Conditional_3_Conditional_103_Template");
function EditExcusePolicyComponent_Conditional_3_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 64);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.save"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Conditional_104_Template, "EditExcusePolicyComponent_Conditional_3_Conditional_104_Template");
function EditExcusePolicyComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_3_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "EditExcusePolicyComponent_Conditional_3_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9)(3, "app-form-section", 10)(4, "div", 11)(5, "div", 12)(6, "label", 13);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "app-searchable-select", 14);
    \u0275\u0275conditionalCreate(9, EditExcusePolicyComponent_Conditional_3_Conditional_9_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(10, "div", 16);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 12)(13, "div", 17);
    \u0275\u0275element(14, "input", 18);
    \u0275\u0275elementStart(15, "label", 19);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 16);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "app-form-section", 10)(20, "div", 11)(21, "div", 12)(22, "label", 20);
    \u0275\u0275text(23);
    \u0275\u0275elementStart(24, "span", 21);
    \u0275\u0275text(25, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(26, "input", 22);
    \u0275\u0275conditionalCreate(27, EditExcusePolicyComponent_Conditional_3_Conditional_27_Template, 2, 1, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 12)(29, "label", 24);
    \u0275\u0275text(30);
    \u0275\u0275elementStart(31, "span", 21);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(33, "input", 25);
    \u0275\u0275conditionalCreate(34, EditExcusePolicyComponent_Conditional_3_Conditional_34_Template, 2, 1, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 12)(36, "label", 26);
    \u0275\u0275text(37);
    \u0275\u0275elementStart(38, "span", 21);
    \u0275\u0275text(39, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(40, "input", 27);
    \u0275\u0275conditionalCreate(41, EditExcusePolicyComponent_Conditional_3_Conditional_41_Template, 2, 1, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 12)(43, "label", 28);
    \u0275\u0275text(44);
    \u0275\u0275elementStart(45, "span", 21);
    \u0275\u0275text(46, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(47, "input", 29);
    \u0275\u0275conditionalCreate(48, EditExcusePolicyComponent_Conditional_3_Conditional_48_Template, 2, 1, "div", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(49, "app-form-section", 10)(50, "div", 11)(51, "div", 12)(52, "label", 30);
    \u0275\u0275text(53);
    \u0275\u0275elementStart(54, "span", 21);
    \u0275\u0275text(55, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 31);
    \u0275\u0275element(57, "input", 32);
    \u0275\u0275elementStart(58, "span", 33);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(60, EditExcusePolicyComponent_Conditional_3_Conditional_60_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div", 12)(62, "label", 34);
    \u0275\u0275text(63);
    \u0275\u0275elementStart(64, "span", 21);
    \u0275\u0275text(65, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 31);
    \u0275\u0275element(67, "input", 35);
    \u0275\u0275elementStart(68, "span", 33);
    \u0275\u0275text(69);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(70, EditExcusePolicyComponent_Conditional_3_Conditional_70_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "div", 36)(72, "div", 11)(73, "div", 12)(74, "div", 17);
    \u0275\u0275element(75, "input", 37);
    \u0275\u0275elementStart(76, "label", 38);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 16);
    \u0275\u0275text(79);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "div", 12)(81, "div", 17);
    \u0275\u0275element(82, "input", 39);
    \u0275\u0275elementStart(83, "label", 40);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "div", 16);
    \u0275\u0275text(86);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(87, "div", 12)(88, "div", 17);
    \u0275\u0275element(89, "input", 41);
    \u0275\u0275elementStart(90, "label", 42);
    \u0275\u0275text(91);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div", 16);
    \u0275\u0275text(93);
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(94, "div", 43)(95, "div", 44)(96, "div", 45)(97, "h6", 46);
    \u0275\u0275element(98, "i", 47);
    \u0275\u0275text(99);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(100, "div", 48)(101, "div", 49)(102, "button", 50);
    \u0275\u0275conditionalCreate(103, EditExcusePolicyComponent_Conditional_3_Conditional_103_Template, 2, 1)(104, EditExcusePolicyComponent_Conditional_3_Conditional_104_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "button", 51);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_3_Template_button_click_105_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onReset());
    }, "EditExcusePolicyComponent_Conditional_3_Template_button_click_105_listener"));
    \u0275\u0275element(106, "i", 52);
    \u0275\u0275text(107);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "button", 53);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Conditional_3_Template_button_click_108_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditExcusePolicyComponent_Conditional_3_Template_button_click_108_listener"));
    \u0275\u0275element(109, "i", 54);
    \u0275\u0275text(110);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(111, "div", 55)(112, "div", 45)(113, "h6", 46);
    \u0275\u0275element(114, "i", 56);
    \u0275\u0275text(115);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(116, "div", 48)(117, "p", 57);
    \u0275\u0275text(118);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "ul", 58)(120, "li", 59);
    \u0275\u0275element(121, "i", 60);
    \u0275\u0275text(122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(123, "li", 59);
    \u0275\u0275element(124, "i", 61);
    \u0275\u0275text(125);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(126, "li");
    \u0275\u0275element(127, "i", 62);
    \u0275\u0275text(128);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.policyForm);
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r0.i18n.t("excuse_policies.basic_information"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.branch"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx_r0.branchOptions)("placeholder", ctx_r0.i18n.t("excuse_policies.placeholders.select_branch"))("isInvalid", ctx_r0.isFieldInvalid("branchId"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("branchId") ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.help.branch_selection"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.is_active"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.help.policy_status"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("excuse_policies.excuse_limits"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.max_personal_excuses_per_month"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("maxPersonalExcusesPerMonth"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("excuse_policies.placeholders.enter_max_excuses"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("maxPersonalExcusesPerMonth") ? 27 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.max_personal_excuse_hours_per_month"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("maxPersonalExcuseHoursPerMonth"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("excuse_policies.placeholders.enter_max_hours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("maxPersonalExcuseHoursPerMonth") ? 34 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.max_personal_excuse_hours_per_day"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("maxPersonalExcuseHoursPerDay"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("excuse_policies.placeholders.enter_max_daily_hours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("maxPersonalExcuseHoursPerDay") ? 41 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.max_hours_per_excuse"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("maxHoursPerExcuse"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("excuse_policies.placeholders.enter_max_excuse_hours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("maxHoursPerExcuse") ? 48 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("excuse_policies.policy_settings"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.minimum_excuse_duration"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("minimumExcuseDuration"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("excuse_policies.placeholders.enter_min_duration"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.minutesUnit"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("minimumExcuseDuration") ? 60 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.max_retroactive_days"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("maxRetroactiveDays"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("excuse_policies.placeholders.enter_retroactive_days"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.daysUnit"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("maxRetroactiveDays") ? 70 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.requires_approval"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.help.requires_approval"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.allow_partial_hour_excuses"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.help.partial_hours"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.allow_self_service_requests"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.help.self_service"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.policyForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 103 : 104);
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
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.help.edit_instructions"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.help.required_fields"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.help.time_validation"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("excuse_policies.help.approval_info"), " ");
  }
}
__name(EditExcusePolicyComponent_Conditional_3_Template, "EditExcusePolicyComponent_Conditional_3_Template");
var _EditExcusePolicyComponent = class _EditExcusePolicyComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  excusePoliciesService = inject(ExcusePoliciesService);
  i18n = inject(I18nService);
  // State
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  currentPolicy = signal(null, ...ngDevMode ? [{ debugName: "currentPolicy" }] : []);
  policyId = null;
  // Form
  policyForm;
  // Available options
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  // Computed properties for searchable select options
  get branchOptions() {
    const options = [
      { value: null, label: this.i18n.t("common.all_branches") }
    ];
    return options.concat(this.branches().map((branch) => ({
      value: branch.id,
      label: branch.name
    })));
  }
  constructor() {
    this.policyForm = this.createForm();
  }
  ngOnInit() {
    this.loadBranches();
    this.loadPolicy();
  }
  /**
   * Create reactive form
   */
  createForm() {
    return this.fb.group({
      branchId: [null],
      maxPersonalExcusesPerMonth: [1, [Validators.required, Validators.min(0), Validators.max(31)]],
      maxPersonalExcuseHoursPerMonth: [8, [Validators.required, Validators.min(0), Validators.max(744)]],
      maxPersonalExcuseHoursPerDay: [2, [Validators.required, Validators.min(0), Validators.max(24)]],
      maxHoursPerExcuse: [2, [Validators.required, Validators.min(0), Validators.max(24)]],
      requiresApproval: [true],
      allowPartialHourExcuses: [false],
      minimumExcuseDuration: [15, [Validators.required, Validators.min(1), Validators.max(1440)]],
      maxRetroactiveDays: [7, [Validators.required, Validators.min(0), Validators.max(365)]],
      allowSelfServiceRequests: [true],
      isActive: [true]
    });
  }
  /**
   * Load branches for dropdown
   */
  loadBranches() {
    this.excusePoliciesService.getBranches().subscribe({
      next: /* @__PURE__ */ __name((branches) => {
        this.branches.set(branches);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
        this.notificationService.error(this.i18n.t("excuse_policies.errors.load_branches_failed"));
      }, "error")
    });
  }
  /**
   * Load policy for editing
   */
  loadPolicy() {
    const policyIdParam = this.route.snapshot.paramMap.get("id");
    if (!policyIdParam) {
      this.router.navigate(["/excuse-policies"]);
      return;
    }
    this.policyId = +policyIdParam;
    this.loading.set(true);
    this.excusePoliciesService.getExcusePolicyById(this.policyId).subscribe({
      next: /* @__PURE__ */ __name((policy) => {
        this.currentPolicy.set(policy);
        this.populateForm(policy);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load policy:", error);
        this.notificationService.error(this.i18n.t("excuse_policies.errors.load_failed"));
        this.loading.set(false);
        this.router.navigate(["/excuse-policies"]);
      }, "error")
    });
  }
  /**
   * Populate form with policy data
   */
  populateForm(policy) {
    this.policyForm.patchValue({
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
    });
  }
  /**
   * Handle form submission
   */
  onSubmit() {
    if (this.policyForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    const policy = this.currentPolicy();
    if (!policy)
      return;
    this.saving.set(true);
    const formValue = this.policyForm.value;
    const request = {
      id: policy.id,
      branchId: formValue.branchId,
      maxPersonalExcusesPerMonth: formValue.maxPersonalExcusesPerMonth,
      maxPersonalExcuseHoursPerMonth: formValue.maxPersonalExcuseHoursPerMonth,
      maxPersonalExcuseHoursPerDay: formValue.maxPersonalExcuseHoursPerDay,
      maxHoursPerExcuse: formValue.maxHoursPerExcuse,
      requiresApproval: formValue.requiresApproval,
      allowPartialHourExcuses: formValue.allowPartialHourExcuses,
      minimumExcuseDuration: formValue.minimumExcuseDuration,
      maxRetroactiveDays: formValue.maxRetroactiveDays,
      allowSelfServiceRequests: formValue.allowSelfServiceRequests,
      isActive: formValue.isActive
    };
    this.excusePoliciesService.updateExcusePolicy(policy.id, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t("excuse_policies.success.updated"));
        this.router.navigate(["/excuse-policies", policy.id, "view"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.saving.set(false);
        console.error("Failed to update policy:", error);
        this.notificationService.error(this.i18n.t("excuse_policies.errors.update_failed"));
      }, "error")
    });
  }
  /**
   * Cancel and navigate back
   */
  onCancel() {
    const policy = this.currentPolicy();
    if (policy) {
      this.router.navigate(["/excuse-policies", policy.id, "view"]);
    } else {
      this.router.navigate(["/excuse-policies"]);
    }
  }
  /**
   * Reset form to original values
   */
  onReset() {
    const policy = this.currentPolicy();
    if (policy) {
      this.populateForm(policy);
    }
  }
  /**
   * Mark all form fields as touched
   */
  markFormGroupTouched() {
    Object.keys(this.policyForm.controls).forEach((key) => {
      const control = this.policyForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
  /**
   * Check if form field has error
   */
  hasError(fieldName) {
    const field = this.policyForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  /**
   * Get error message for field
   */
  getErrorMessage(fieldName) {
    const field = this.policyForm.get(fieldName);
    if (!field || !field.errors)
      return "";
    if (field.errors["required"]) {
      return this.i18n.t("validation.required");
    }
    if (field.errors["min"]) {
      return this.i18n.t("validation.min_value") + " " + field.errors["min"].min;
    }
    if (field.errors["max"]) {
      return this.i18n.t("validation.max_value") + " " + field.errors["max"].max;
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
   * Get policy branch name for display
   */
  getPolicyBranchName() {
    return this.currentPolicy()?.branchName || this.i18n.t("common.all_branches");
  }
};
__name(_EditExcusePolicyComponent, "EditExcusePolicyComponent");
__publicField(_EditExcusePolicyComponent, "\u0275fac", /* @__PURE__ */ __name(function EditExcusePolicyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditExcusePolicyComponent)();
}, "EditExcusePolicyComponent_Factory"));
__publicField(_EditExcusePolicyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditExcusePolicyComponent, selectors: [["app-edit-excuse-policy"]], decls: 4, vars: 5, consts: [[1, "app-form-page"], ["mode", "edit", "moduleName", "excuse-policies", "moduleRoute", "excuse-policies", 3, "title", "entityId", "loading"], [1, "text-center", "py-5"], [3, "formGroup"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-3", "text-muted"], [3, "ngSubmit", "formGroup"], [1, "app-desktop-sidebar"], [1, "app-main-content"], [3, "title"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "branchId", 1, "form-label"], ["id", "branchId", "formControlName", "branchId", 3, "options", "placeholder", "isInvalid"], [1, "invalid-feedback", "d-block"], [1, "form-text"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "isActive", "formControlName", "isActive", 1, "form-check-input"], ["for", "isActive", 1, "form-check-label"], ["for", "maxPersonalExcusesPerMonth", 1, "form-label"], [1, "text-danger"], ["type", "number", "id", "maxPersonalExcusesPerMonth", "formControlName", "maxPersonalExcusesPerMonth", "min", "0", "max", "31", 1, "form-control", 3, "placeholder"], [1, "invalid-feedback"], ["for", "maxPersonalExcuseHoursPerMonth", 1, "form-label"], ["type", "number", "id", "maxPersonalExcuseHoursPerMonth", "formControlName", "maxPersonalExcuseHoursPerMonth", "min", "0", "max", "744", 1, "form-control", 3, "placeholder"], ["for", "maxPersonalExcuseHoursPerDay", 1, "form-label"], ["type", "number", "id", "maxPersonalExcuseHoursPerDay", "formControlName", "maxPersonalExcuseHoursPerDay", "min", "0", "max", "24", 1, "form-control", 3, "placeholder"], ["for", "maxHoursPerExcuse", 1, "form-label"], ["type", "number", "id", "maxHoursPerExcuse", "formControlName", "maxHoursPerExcuse", "min", "0", "max", "24", 1, "form-control", 3, "placeholder"], ["for", "minimumExcuseDuration", 1, "form-label"], [1, "input-group"], ["type", "number", "id", "minimumExcuseDuration", "formControlName", "minimumExcuseDuration", "min", "1", "max", "1440", 1, "form-control", 3, "placeholder"], [1, "input-group-text"], ["for", "maxRetroactiveDays", 1, "form-label"], ["type", "number", "id", "maxRetroactiveDays", "formControlName", "maxRetroactiveDays", "min", "0", "max", "365", 1, "form-control", 3, "placeholder"], [1, "col-12"], ["type", "checkbox", "id", "requiresApproval", "formControlName", "requiresApproval", 1, "form-check-input"], ["for", "requiresApproval", 1, "form-check-label"], ["type", "checkbox", "id", "allowPartialHourExcuses", "formControlName", "allowPartialHourExcuses", 1, "form-check-input"], ["for", "allowPartialHourExcuses", 1, "form-check-label"], ["type", "checkbox", "id", "allowSelfServiceRequests", "formControlName", "allowSelfServiceRequests", 1, "form-check-input"], ["for", "allowSelfServiceRequests", 1, "form-check-label"], [1, "app-sidebar-content"], [1, "card", "mb-3"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-cogs", "me-2"], [1, "card-body"], [1, "d-grid", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fas", "fa-undo", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], [1, "card"], [1, "fas", "fa-info-circle", "me-2"], [1, "card-text", "small", "text-muted", "mb-2"], [1, "list-unstyled", "small", "text-muted", "mb-0"], [1, "mb-1"], [1, "fas", "fa-check-circle", "text-success", "me-1"], [1, "fas", "fa-clock", "text-info", "me-1"], [1, "fas", "fa-shield-alt", "text-warning", "me-1"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-save", "me-2"]], template: /* @__PURE__ */ __name(function EditExcusePolicyComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, EditExcusePolicyComponent_Conditional_2_Template, 6, 2, "div", 2);
    \u0275\u0275conditionalCreate(3, EditExcusePolicyComponent_Conditional_3_Template, 129, 62, "form", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("excuse_policies.edit_policy"))("entityId", ctx.policyId || 0)("loading", ctx.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.currentPolicy() ? 3 : -1);
  }
}, "EditExcusePolicyComponent_Template"), dependencies: [
  CommonModule,
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NumberValueAccessor,
  CheckboxControlValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  MinValidator,
  MaxValidator,
  ReactiveFormsModule,
  FormGroupDirective,
  FormControlName,
  SearchableSelectComponent,
  FormHeaderComponent,
  FormSectionComponent
], styles: ["\n\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control[_ngcontent-%COMP%]:disabled, \n.form-select[_ngcontent-%COMP%]:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  font-weight: 400;\n  cursor: pointer;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 0.5rem;\n}\n.help-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.form-section[_ngcontent-%COMP%] {\n  background: var(--bs-white);\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  margin-bottom: 1.5rem;\n}\n.form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  background: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  padding: 1rem 1.5rem;\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.form-section[_ngcontent-%COMP%]   .section-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.input-group-text[_ngcontent-%COMP%] {\n  background-color: var(--bs-gray-100);\n  border-color: var(--bs-border-color);\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--bs-gray-500);\n  margin-top: 0.25rem;\n}\n.form-switch[_ngcontent-%COMP%] {\n  padding-left: 2.5rem;\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 1rem;\n  margin-left: -2.5rem;\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\ninput[type=number][_ngcontent-%COMP%] {\n  -moz-appearance: textfield;\n}\ninput[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button, \ninput[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .help-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .btn[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n  .btn[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 0;\n  }\n  .form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%], \n   .form-section[_ngcontent-%COMP%]   .section-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=edit-excuse-policy.component.css.map */"] }));
var EditExcusePolicyComponent = _EditExcusePolicyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditExcusePolicyComponent, [{
    type: Component,
    args: [{ selector: "app-edit-excuse-policy", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SearchableSelectComponent,
      FormHeaderComponent,
      FormSectionComponent
    ], template: `<div class="app-form-page">\r
  <app-form-header\r
    mode="edit"\r
    [title]="i18n.t('excuse_policies.edit_policy')"\r
    moduleName="excuse-policies"\r
    moduleRoute="excuse-policies"\r
    [entityId]="policyId || 0"\r
    [loading]="saving()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <div class="spinner-border text-primary" role="status">\r
        <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>\r
      </div>\r
      <p class="mt-3 text-muted">{{ i18n.t('excuse_policies.loading_details') }}</p>\r
    </div>\r
  }\r
\r
  <!-- Main Form Content -->\r
  @if (!loading() && currentPolicy()) {\r
    <form [formGroup]="policyForm" (ngSubmit)="onSubmit()">\r
      <div class="app-desktop-sidebar">\r
        <!-- Main Form Content -->\r
        <div class="app-main-content">\r
          <!-- Basic Information Section -->\r
          <app-form-section [title]="i18n.t('excuse_policies.basic_information')">\r
            <div class="row">\r
              <!-- Branch -->\r
              <div class="col-md-6 mb-3">\r
                <label for="branchId" class="form-label">\r
                  {{ i18n.t('fields.branch') }}\r
                </label>\r
                <app-searchable-select\r
                  id="branchId"\r
                  formControlName="branchId"\r
                  [options]="branchOptions"\r
                  [placeholder]="i18n.t('excuse_policies.placeholders.select_branch')"\r
                  [isInvalid]="isFieldInvalid('branchId')">\r
                </app-searchable-select>\r
                @if (hasError('branchId')) {\r
                  <div class="invalid-feedback d-block">\r
                    {{ getErrorMessage('branchId') }}\r
                  </div>\r
                }\r
                <div class="form-text">\r
                  {{ i18n.t('excuse_policies.help.branch_selection') }}\r
                </div>\r
              </div>\r
\r
              <!-- Status -->\r
              <div class="col-md-6 mb-3">\r
                <div class="form-check form-switch">\r
                  <input\r
                    type="checkbox"\r
                    id="isActive"\r
                    formControlName="isActive"\r
                    class="form-check-input">\r
                  <label for="isActive" class="form-check-label">\r
                    {{ i18n.t('excuse_policies.is_active') }}\r
                  </label>\r
                </div>\r
                <div class="form-text">\r
                  {{ i18n.t('excuse_policies.help.policy_status') }}\r
                </div>\r
              </div>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Limits Section -->\r
          <app-form-section [title]="i18n.t('excuse_policies.excuse_limits')">\r
            <div class="row">\r
              <!-- Max Personal Excuses Per Month -->\r
              <div class="col-md-6 mb-3">\r
                <label for="maxPersonalExcusesPerMonth" class="form-label">\r
                  {{ i18n.t('excuse_policies.max_personal_excuses_per_month') }} <span class="text-danger">*</span>\r
                </label>\r
                <input\r
                  type="number"\r
                  id="maxPersonalExcusesPerMonth"\r
                  formControlName="maxPersonalExcusesPerMonth"\r
                  class="form-control"\r
                  [class.is-invalid]="isFieldInvalid('maxPersonalExcusesPerMonth')"\r
                  min="0"\r
                  max="31"\r
                  [placeholder]="i18n.t('excuse_policies.placeholders.enter_max_excuses')">\r
                @if (hasError('maxPersonalExcusesPerMonth')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('maxPersonalExcusesPerMonth') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Max Personal Excuse Hours Per Month -->\r
              <div class="col-md-6 mb-3">\r
                <label for="maxPersonalExcuseHoursPerMonth" class="form-label">\r
                  {{ i18n.t('excuse_policies.max_personal_excuse_hours_per_month') }} <span class="text-danger">*</span>\r
                </label>\r
                <input\r
                  type="number"\r
                  id="maxPersonalExcuseHoursPerMonth"\r
                  formControlName="maxPersonalExcuseHoursPerMonth"\r
                  class="form-control"\r
                  [class.is-invalid]="isFieldInvalid('maxPersonalExcuseHoursPerMonth')"\r
                  min="0"\r
                  max="744"\r
                  [placeholder]="i18n.t('excuse_policies.placeholders.enter_max_hours')">\r
                @if (hasError('maxPersonalExcuseHoursPerMonth')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('maxPersonalExcuseHoursPerMonth') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Max Personal Excuse Hours Per Day -->\r
              <div class="col-md-6 mb-3">\r
                <label for="maxPersonalExcuseHoursPerDay" class="form-label">\r
                  {{ i18n.t('excuse_policies.max_personal_excuse_hours_per_day') }} <span class="text-danger">*</span>\r
                </label>\r
                <input\r
                  type="number"\r
                  id="maxPersonalExcuseHoursPerDay"\r
                  formControlName="maxPersonalExcuseHoursPerDay"\r
                  class="form-control"\r
                  [class.is-invalid]="isFieldInvalid('maxPersonalExcuseHoursPerDay')"\r
                  min="0"\r
                  max="24"\r
                  [placeholder]="i18n.t('excuse_policies.placeholders.enter_max_daily_hours')">\r
                @if (hasError('maxPersonalExcuseHoursPerDay')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('maxPersonalExcuseHoursPerDay') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Max Hours Per Excuse -->\r
              <div class="col-md-6 mb-3">\r
                <label for="maxHoursPerExcuse" class="form-label">\r
                  {{ i18n.t('excuse_policies.max_hours_per_excuse') }} <span class="text-danger">*</span>\r
                </label>\r
                <input\r
                  type="number"\r
                  id="maxHoursPerExcuse"\r
                  formControlName="maxHoursPerExcuse"\r
                  class="form-control"\r
                  [class.is-invalid]="isFieldInvalid('maxHoursPerExcuse')"\r
                  min="0"\r
                  max="24"\r
                  [placeholder]="i18n.t('excuse_policies.placeholders.enter_max_excuse_hours')">\r
                @if (hasError('maxHoursPerExcuse')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('maxHoursPerExcuse') }}\r
                  </div>\r
                }\r
              </div>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Settings Section -->\r
          <app-form-section [title]="i18n.t('excuse_policies.policy_settings')">\r
            <div class="row">\r
              <!-- Minimum Excuse Duration -->\r
              <div class="col-md-6 mb-3">\r
                <label for="minimumExcuseDuration" class="form-label">\r
                  {{ i18n.t('excuse_policies.minimum_excuse_duration') }} <span class="text-danger">*</span>\r
                </label>\r
                <div class="input-group">\r
                  <input\r
                    type="number"\r
                    id="minimumExcuseDuration"\r
                    formControlName="minimumExcuseDuration"\r
                    class="form-control"\r
                    [class.is-invalid]="isFieldInvalid('minimumExcuseDuration')"\r
                    min="1"\r
                    max="1440"\r
                    [placeholder]="i18n.t('excuse_policies.placeholders.enter_min_duration')">\r
                  <span class="input-group-text">{{ i18n.t('fields.minutesUnit') }}</span>\r
                </div>\r
                @if (hasError('minimumExcuseDuration')) {\r
                  <div class="invalid-feedback d-block">\r
                    {{ getErrorMessage('minimumExcuseDuration') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Max Retroactive Days -->\r
              <div class="col-md-6 mb-3">\r
                <label for="maxRetroactiveDays" class="form-label">\r
                  {{ i18n.t('excuse_policies.max_retroactive_days') }} <span class="text-danger">*</span>\r
                </label>\r
                <div class="input-group">\r
                  <input\r
                    type="number"\r
                    id="maxRetroactiveDays"\r
                    formControlName="maxRetroactiveDays"\r
                    class="form-control"\r
                    [class.is-invalid]="isFieldInvalid('maxRetroactiveDays')"\r
                    min="0"\r
                    max="365"\r
                    [placeholder]="i18n.t('excuse_policies.placeholders.enter_retroactive_days')">\r
                  <span class="input-group-text">{{ i18n.t('fields.daysUnit') }}</span>\r
                </div>\r
                @if (hasError('maxRetroactiveDays')) {\r
                  <div class="invalid-feedback d-block">\r
                    {{ getErrorMessage('maxRetroactiveDays') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Policy Toggles -->\r
              <div class="col-12">\r
                <div class="row">\r
                  <div class="col-md-6 mb-3">\r
                    <div class="form-check form-switch">\r
                      <input\r
                        type="checkbox"\r
                        id="requiresApproval"\r
                        formControlName="requiresApproval"\r
                        class="form-check-input">\r
                      <label for="requiresApproval" class="form-check-label">\r
                        {{ i18n.t('excuse_policies.requires_approval') }}\r
                      </label>\r
                    </div>\r
                    <div class="form-text">\r
                      {{ i18n.t('excuse_policies.help.requires_approval') }}\r
                    </div>\r
                  </div>\r
\r
                  <div class="col-md-6 mb-3">\r
                    <div class="form-check form-switch">\r
                      <input\r
                        type="checkbox"\r
                        id="allowPartialHourExcuses"\r
                        formControlName="allowPartialHourExcuses"\r
                        class="form-check-input">\r
                      <label for="allowPartialHourExcuses" class="form-check-label">\r
                        {{ i18n.t('excuse_policies.allow_partial_hour_excuses') }}\r
                      </label>\r
                    </div>\r
                    <div class="form-text">\r
                      {{ i18n.t('excuse_policies.help.partial_hours') }}\r
                    </div>\r
                  </div>\r
\r
                  <div class="col-md-6 mb-3">\r
                    <div class="form-check form-switch">\r
                      <input\r
                        type="checkbox"\r
                        id="allowSelfServiceRequests"\r
                        formControlName="allowSelfServiceRequests"\r
                        class="form-check-input">\r
                      <label for="allowSelfServiceRequests" class="form-check-label">\r
                        {{ i18n.t('excuse_policies.allow_self_service_requests') }}\r
                      </label>\r
                    </div>\r
                    <div class="form-text">\r
                      {{ i18n.t('excuse_policies.help.self_service') }}\r
                    </div>\r
                  </div>\r
                </div>\r
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
                  [disabled]="policyForm.invalid || saving()">\r
                  @if (saving()) {\r
                    <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    {{ i18n.t('common.saving') }}\r
                  } @else {\r
                    <i class="fas fa-save me-2"></i>\r
                    {{ i18n.t('common.save') }}\r
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
                {{ i18n.t('excuse_policies.help.edit_instructions') }}\r
              </p>\r
              <ul class="list-unstyled small text-muted mb-0">\r
                <li class="mb-1">\r
                  <i class="fas fa-check-circle text-success me-1"></i>\r
                  {{ i18n.t('excuse_policies.help.required_fields') }}\r
                </li>\r
                <li class="mb-1">\r
                  <i class="fas fa-clock text-info me-1"></i>\r
                  {{ i18n.t('excuse_policies.help.time_validation') }}\r
                </li>\r
                <li>\r
                  <i class="fas fa-shield-alt text-warning me-1"></i>\r
                  {{ i18n.t('excuse_policies.help.approval_info') }}\r
                </li>\r
              </ul>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </form>\r
  }\r
</div>`, styles: ["/* src/app/pages/excuse-policies/edit-excuse-policy/edit-excuse-policy.component.css */\n.form-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control:disabled,\n.form-select:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback {\n  font-size: 0.875rem;\n}\n.form-check-label {\n  font-weight: 400;\n  cursor: pointer;\n}\n.form-check-input:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.form-switch .form-check-input:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.card-title {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group .btn {\n  border-radius: 0.375rem;\n}\n.btn-group .btn:not(:last-child) {\n  margin-right: 0.5rem;\n}\n.help-card {\n  position: sticky;\n  top: 1rem;\n}\n.form-section {\n  background: var(--bs-white);\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  margin-bottom: 1.5rem;\n}\n.form-section .section-header {\n  background: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  padding: 1rem 1.5rem;\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.form-section .section-body {\n  padding: 1.5rem;\n}\n.input-group-text {\n  background-color: var(--bs-gray-100);\n  border-color: var(--bs-border-color);\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n}\n.form-text {\n  font-size: 0.8rem;\n  color: var(--bs-gray-500);\n  margin-top: 0.25rem;\n}\n.form-switch {\n  padding-left: 2.5rem;\n}\n.form-switch .form-check-input {\n  width: 2rem;\n  height: 1rem;\n  margin-left: -2.5rem;\n}\n.form-switch .form-check-label {\n  margin-left: 0.5rem;\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\ninput[type=number] {\n  -moz-appearance: textfield;\n}\ninput[type=number]::-webkit-outer-spin-button,\ninput[type=number]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .help-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .btn {\n    margin-bottom: 0.5rem;\n  }\n  .btn:last-child {\n    margin-bottom: 0;\n  }\n  .form-section .section-header,\n  .form-section .section-body {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=edit-excuse-policy.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditExcusePolicyComponent, { className: "EditExcusePolicyComponent", filePath: "src/app/pages/excuse-policies/edit-excuse-policy/edit-excuse-policy.component.ts", lineNumber: 27 });
})();
export {
  EditExcusePolicyComponent
};
//# sourceMappingURL=chunk-DFX4B24O.js.map
