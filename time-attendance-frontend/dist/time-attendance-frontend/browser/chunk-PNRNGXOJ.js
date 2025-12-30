import {
  LeaveBalanceService
} from "./chunk-WL4EZF3O.js";
import {
  FormHeaderComponent
} from "./chunk-KM5VSJTZ.js";
import {
  SearchableSelectComponent
} from "./chunk-YPZLTOXZ.js";
import {
  FormSectionComponent
} from "./chunk-I3BAAGQQ.js";
import {
  VacationTypesService
} from "./chunk-5ZTOQBVY.js";
import {
  EmployeesService
} from "./chunk-IR2IKZBB.js";
import "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-GSKH2KOG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MaxLengthValidator,
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
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import "./chunk-HZ2IZU2F.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/leave-balances/leave-entitlement-form/leave-entitlement-form.component.ts
function LeaveEntitlementFormComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r0.i18n.t("common.loading"))("centered", true);
  }
}
__name(LeaveEntitlementFormComponent_Conditional_2_Template, "LeaveEntitlementFormComponent_Conditional_2_Template");
function LeaveEntitlementFormComponent_Conditional_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("errors.fieldRequired"), " ");
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_Conditional_12_Template, "LeaveEntitlementFormComponent_Conditional_3_Conditional_12_Template");
function LeaveEntitlementFormComponent_Conditional_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("errors.fieldRequired"), " ");
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_Conditional_19_Template, "LeaveEntitlementFormComponent_Conditional_3_Conditional_19_Template");
function LeaveEntitlementFormComponent_Conditional_3_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const year_r3 = ctx.$implicit;
    \u0275\u0275property("value", year_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(year_r3);
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_For_27_Template, "LeaveEntitlementFormComponent_Conditional_3_For_27_Template");
function LeaveEntitlementFormComponent_Conditional_3_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("errors.invalidYear"), " ");
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_Conditional_28_Template, "LeaveEntitlementFormComponent_Conditional_3_Conditional_28_Template");
function LeaveEntitlementFormComponent_Conditional_3_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("errors.invalidDays"), " ");
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_Conditional_35_Template, "LeaveEntitlementFormComponent_Conditional_3_Conditional_35_Template");
function LeaveEntitlementFormComponent_Conditional_3_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("errors.invalidDays"), " ");
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_Conditional_44_Template, "LeaveEntitlementFormComponent_Conditional_3_Conditional_44_Template");
function LeaveEntitlementFormComponent_Conditional_3_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("errors.invalidDays"), " ");
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_Conditional_51_Template, "LeaveEntitlementFormComponent_Conditional_3_Conditional_51_Template");
function LeaveEntitlementFormComponent_Conditional_3_Conditional_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("errors.notesTooLong"), " ");
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_Conditional_82_Template, "LeaveEntitlementFormComponent_Conditional_3_Conditional_82_Template");
function LeaveEntitlementFormComponent_Conditional_3_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 40);
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_Conditional_89_Template, "LeaveEntitlementFormComponent_Conditional_3_Conditional_89_Template");
function LeaveEntitlementFormComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "form", 5);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function LeaveEntitlementFormComponent_Conditional_3_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "LeaveEntitlementFormComponent_Conditional_3_Template_form_ngSubmit_2_listener"));
    \u0275\u0275elementStart(3, "div", 6)(4, "div", 7)(5, "app-form-section", 8)(6, "div", 9)(7, "label", 10);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 11);
    \u0275\u0275text(10, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(11, "app-searchable-select", 12);
    \u0275\u0275conditionalCreate(12, LeaveEntitlementFormComponent_Conditional_3_Conditional_12_Template, 2, 1, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 9)(14, "label", 14);
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "span", 11);
    \u0275\u0275text(17, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(18, "app-searchable-select", 15);
    \u0275\u0275conditionalCreate(19, LeaveEntitlementFormComponent_Conditional_3_Conditional_19_Template, 2, 1, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 9)(21, "label", 16);
    \u0275\u0275text(22);
    \u0275\u0275elementStart(23, "span", 11);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "select", 17);
    \u0275\u0275repeaterCreate(26, LeaveEntitlementFormComponent_Conditional_3_For_27_Template, 2, 2, "option", 18, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, LeaveEntitlementFormComponent_Conditional_3_Conditional_28_Template, 2, 1, "div", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 9)(30, "label", 20);
    \u0275\u0275text(31);
    \u0275\u0275elementStart(32, "span", 11);
    \u0275\u0275text(33, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(34, "input", 21);
    \u0275\u0275conditionalCreate(35, LeaveEntitlementFormComponent_Conditional_3_Conditional_35_Template, 2, 1, "div", 19);
    \u0275\u0275elementStart(36, "div", 22);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(38, "div", 7)(39, "app-form-section", 8)(40, "div", 9)(41, "label", 23);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "input", 24);
    \u0275\u0275listener("blur", /* @__PURE__ */ __name(function LeaveEntitlementFormComponent_Conditional_3_Template_input_blur_43_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.validateMaxCarryOver());
    }, "LeaveEntitlementFormComponent_Conditional_3_Template_input_blur_43_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(44, LeaveEntitlementFormComponent_Conditional_3_Conditional_44_Template, 2, 1, "div", 19);
    \u0275\u0275elementStart(45, "div", 22);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 9)(48, "label", 25);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd();
    \u0275\u0275element(50, "input", 26);
    \u0275\u0275conditionalCreate(51, LeaveEntitlementFormComponent_Conditional_3_Conditional_51_Template, 2, 1, "div", 19);
    \u0275\u0275elementStart(52, "div", 22);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 9)(55, "div", 27);
    \u0275\u0275element(56, "input", 28);
    \u0275\u0275elementStart(57, "label", 29);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 22);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(61, "app-form-section", 8)(62, "div", 6)(63, "div", 7)(64, "div", 9)(65, "label", 30);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd();
    \u0275\u0275element(67, "input", 31);
    \u0275\u0275elementStart(68, "div", 22);
    \u0275\u0275text(69);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(70, "div", 7)(71, "div", 9)(72, "label", 32);
    \u0275\u0275text(73);
    \u0275\u0275elementEnd();
    \u0275\u0275element(74, "input", 33);
    \u0275\u0275elementStart(75, "div", 22);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(77, "app-form-section", 8)(78, "div", 9)(79, "label", 34);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd();
    \u0275\u0275element(81, "textarea", 35);
    \u0275\u0275conditionalCreate(82, LeaveEntitlementFormComponent_Conditional_3_Conditional_82_Template, 2, 1, "div", 19);
    \u0275\u0275elementStart(83, "small", 36);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(85, "div", 37)(86, "button", 38);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveEntitlementFormComponent_Conditional_3_Template_button_click_86_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "LeaveEntitlementFormComponent_Conditional_3_Template_button_click_86_listener"));
    \u0275\u0275text(87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "button", 39);
    \u0275\u0275conditionalCreate(89, LeaveEntitlementFormComponent_Conditional_3_Conditional_89_Template, 1, 0, "span", 40);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_13_0;
    let tmp_15_0;
    let tmp_18_0;
    let tmp_20_0;
    let tmp_21_0;
    let tmp_26_0;
    let tmp_27_0;
    let tmp_30_0;
    let tmp_32_0;
    let tmp_45_0;
    let tmp_47_0;
    let tmp_48_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.entitlementForm);
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r0.i18n.t("leaveBalance.basicInformation"))("description", ctx_r0.i18n.t("leaveBalance.basicInformationDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.employee"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.employees())("placeholder", ctx_r0.i18n.t("leaveBalance.selectEmployee"))("disabled", ctx_r0.isEditMode());
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_8_0 = ctx_r0.entitlementForm.get("employeeId")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r0.entitlementForm.get("employeeId")) == null ? null : tmp_8_0.touched) ? 12 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("vacationTypes.vacationType"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.vacationTypes())("placeholder", ctx_r0.i18n.t("leaveBalance.selectVacationType"))("disabled", ctx_r0.isEditMode());
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_13_0 = ctx_r0.entitlementForm.get("vacationTypeId")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx_r0.entitlementForm.get("vacationTypeId")) == null ? null : tmp_13_0.touched) ? 19 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("leaveBalance.year"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ((tmp_15_0 = ctx_r0.entitlementForm.get("year")) == null ? null : tmp_15_0.invalid) && ((tmp_15_0 = ctx_r0.entitlementForm.get("year")) == null ? null : tmp_15_0.touched));
    \u0275\u0275attribute("disabled", ctx_r0.isEditMode() ? true : null);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableYears());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_18_0 = ctx_r0.entitlementForm.get("year")) == null ? null : tmp_18_0.invalid) && ((tmp_18_0 = ctx_r0.entitlementForm.get("year")) == null ? null : tmp_18_0.touched) ? 28 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("leaveBalance.annualDays"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ((tmp_20_0 = ctx_r0.entitlementForm.get("annualDays")) == null ? null : tmp_20_0.invalid) && ((tmp_20_0 = ctx_r0.entitlementForm.get("annualDays")) == null ? null : tmp_20_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_21_0 = ctx_r0.entitlementForm.get("annualDays")) == null ? null : tmp_21_0.invalid) && ((tmp_21_0 = ctx_r0.entitlementForm.get("annualDays")) == null ? null : tmp_21_0.touched) ? 35 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("leaveBalance.annualDaysHelp"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("leaveBalance.carryOverConfiguration"))("description", ctx_r0.i18n.t("leaveBalance.carryOverConfigurationDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("leaveBalance.carryOverDays"), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ((tmp_26_0 = ctx_r0.entitlementForm.get("carryOverDays")) == null ? null : tmp_26_0.invalid) && ((tmp_26_0 = ctx_r0.entitlementForm.get("carryOverDays")) == null ? null : tmp_26_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_27_0 = ctx_r0.entitlementForm.get("carryOverDays")) == null ? null : tmp_27_0.invalid) && ((tmp_27_0 = ctx_r0.entitlementForm.get("carryOverDays")) == null ? null : tmp_27_0.touched) ? 44 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("leaveBalance.carryOverDaysHelp"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("leaveBalance.maxCarryOverDays"), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ((tmp_30_0 = ctx_r0.entitlementForm.get("maxCarryOverDays")) == null ? null : tmp_30_0.invalid) && ((tmp_30_0 = ctx_r0.entitlementForm.get("maxCarryOverDays")) == null ? null : tmp_30_0.touched));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("common.unlimited"));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_32_0 = ctx_r0.entitlementForm.get("maxCarryOverDays")) == null ? null : tmp_32_0.invalid) && ((tmp_32_0 = ctx_r0.entitlementForm.get("maxCarryOverDays")) == null ? null : tmp_32_0.touched) ? 51 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("leaveBalance.maxCarryOverDaysHelp"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("leaveBalance.expiresAtYearEnd"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("leaveBalance.expiresAtYearEndHelp"));
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("leaveBalance.effectiveDates"))("description", ctx_r0.i18n.t("leaveBalance.effectiveDatesDescription"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("leaveBalance.effectiveStartDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("leaveBalance.effectiveStartDateHelp"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("leaveBalance.effectiveEndDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("leaveBalance.effectiveEndDateHelp"));
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("common.notes"))("description", ctx_r0.i18n.t("leaveBalance.notesDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.notes"), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ((tmp_45_0 = ctx_r0.entitlementForm.get("notes")) == null ? null : tmp_45_0.invalid) && ((tmp_45_0 = ctx_r0.entitlementForm.get("notes")) == null ? null : tmp_45_0.touched));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("leaveBalance.notesPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_47_0 = ctx_r0.entitlementForm.get("notes")) == null ? null : tmp_47_0.invalid) && ((tmp_47_0 = ctx_r0.entitlementForm.get("notes")) == null ? null : tmp_47_0.touched) ? 82 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ((tmp_48_0 = ctx_r0.entitlementForm.get("notes")) == null ? null : tmp_48_0.value == null ? null : tmp_48_0.value.length) || 0, " / 500 ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.submitting() || ctx_r0.entitlementForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.submitting() ? 89 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getSubmitButtonLabel(), " ");
  }
}
__name(LeaveEntitlementFormComponent_Conditional_3_Template, "LeaveEntitlementFormComponent_Conditional_3_Template");
var _LeaveEntitlementFormComponent = class _LeaveEntitlementFormComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  leaveBalanceService = inject(LeaveBalanceService);
  employeesService = inject(EmployeesService);
  vacationTypesService = inject(VacationTypesService);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  // State
  entitlementId = signal(null, ...ngDevMode ? [{ debugName: "entitlementId" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  isEditMode = computed(() => this.entitlementId() !== null, ...ngDevMode ? [{ debugName: "isEditMode" }] : []);
  // Form options
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : []);
  vacationTypes = signal([], ...ngDevMode ? [{ debugName: "vacationTypes" }] : []);
  availableYears = signal([], ...ngDevMode ? [{ debugName: "availableYears" }] : []);
  // Form
  entitlementForm;
  constructor() {
    this.entitlementForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      vacationTypeId: [null, [Validators.required]],
      year: [(/* @__PURE__ */ new Date()).getFullYear(), [Validators.required, Validators.min(2e3), Validators.max(2100)]],
      annualDays: [0, [Validators.required, Validators.min(0), Validators.max(365)]],
      carryOverDays: [0, [Validators.min(0), Validators.max(365)]],
      maxCarryOverDays: [null, [Validators.min(0), Validators.max(365)]],
      expiresAtYearEnd: [true, [Validators.required]],
      effectiveStartDate: [null],
      effectiveEndDate: [null],
      notes: ["", [Validators.maxLength(500)]]
    });
  }
  ngOnInit() {
    this.generateAvailableYears();
    this.loadFormOptions();
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.entitlementId.set(+id);
        this.loadEntitlement(+id);
      }
    });
  }
  /**
   * Generates list of available years (current year ± 5 years).
   */
  generateAvailableYears() {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const years = [];
    for (let i = -5; i <= 5; i++) {
      years.push(currentYear + i);
    }
    this.availableYears.set(years);
  }
  /**
   * Loads form options (employees and vacation types).
   */
  loadFormOptions() {
    this.employeesService.getEmployees({ pageSize: 1e3 }).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.employees.set(result.items.map((emp) => ({
          value: emp.id,
          label: `${emp.employeeNumber} - ${emp.fullName}`
        })));
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load employees", error);
        this.notificationService.error(this.i18n.t("errors.loadEmployeesFailed"));
      }, "error")
    });
    this.vacationTypesService.getVacationTypes({ pageSize: 1e3 }).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.vacationTypes.set(result.items.map((vt) => ({
          value: vt.id,
          label: vt.name
        })));
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load vacation types", error);
        this.notificationService.error(this.i18n.t("errors.loadVacationTypesFailed"));
      }, "error")
    });
  }
  /**
   * Loads existing entitlement for editing.
   */
  loadEntitlement(id) {
    this.loading.set(true);
    setTimeout(() => {
      const sampleEntitlement = {
        employeeId: 1,
        vacationTypeId: 1,
        year: (/* @__PURE__ */ new Date()).getFullYear(),
        annualDays: 30,
        carryOverDays: 5,
        maxCarryOverDays: 10,
        expiresAtYearEnd: false,
        effectiveStartDate: `${(/* @__PURE__ */ new Date()).getFullYear()}-01-01`,
        effectiveEndDate: `${(/* @__PURE__ */ new Date()).getFullYear()}-12-31`,
        notes: "Standard annual leave entitlement"
      };
      this.entitlementForm.patchValue(sampleEntitlement);
      this.loading.set(false);
    }, 500);
  }
  /**
   * Handles form submission.
   */
  onSubmit() {
    if (this.entitlementForm.invalid) {
      this.entitlementForm.markAllAsTouched();
      this.notificationService.error(this.i18n.t("errors.formValidationFailed"));
      return;
    }
    this.submitting.set(true);
    const request = {
      employeeId: this.entitlementForm.value.employeeId,
      vacationTypeId: this.entitlementForm.value.vacationTypeId,
      year: this.entitlementForm.value.year,
      annualDays: this.entitlementForm.value.annualDays,
      carryOverDays: this.entitlementForm.value.carryOverDays || 0,
      maxCarryOverDays: this.entitlementForm.value.maxCarryOverDays,
      expiresAtYearEnd: this.entitlementForm.value.expiresAtYearEnd,
      effectiveStartDate: this.entitlementForm.value.effectiveStartDate,
      effectiveEndDate: this.entitlementForm.value.effectiveEndDate,
      notes: this.entitlementForm.value.notes || null
    };
    this.leaveBalanceService.setLeaveEntitlement(request).subscribe({
      next: /* @__PURE__ */ __name((entitlementId) => {
        this.submitting.set(false);
        const successMessage = this.isEditMode() ? this.i18n.t("leaveBalance.entitlementUpdated") : this.i18n.t("leaveBalance.entitlementCreated");
        this.notificationService.success(successMessage);
        this.router.navigate(["/settings/leave-entitlements"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.submitting.set(false);
        const errorMessage = error.error?.message || this.i18n.t("errors.operationFailed");
        this.notificationService.error(errorMessage);
      }, "error")
    });
  }
  /**
   * Cancels form and navigates back.
   */
  onCancel() {
    this.router.navigate(["/settings/leave-entitlements"]);
  }
  /**
   * Gets page title based on mode.
   */
  getPageTitle() {
    return this.isEditMode() ? this.i18n.t("leaveBalance.editEntitlement") : this.i18n.t("leaveBalance.createEntitlement");
  }
  /**
   * Gets submit button label based on mode.
   */
  getSubmitButtonLabel() {
    return this.isEditMode() ? this.i18n.t("common.update") : this.i18n.t("common.create");
  }
  /**
   * Validates max carry-over days against carry-over days.
   */
  validateMaxCarryOver() {
    const carryOver = this.entitlementForm.value.carryOverDays;
    const maxCarryOver = this.entitlementForm.value.maxCarryOverDays;
    if (maxCarryOver !== null && maxCarryOver < carryOver) {
      this.entitlementForm.patchValue({
        maxCarryOverDays: carryOver
      });
    }
  }
};
__name(_LeaveEntitlementFormComponent, "LeaveEntitlementFormComponent");
__publicField(_LeaveEntitlementFormComponent, "\u0275fac", /* @__PURE__ */ __name(function LeaveEntitlementFormComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LeaveEntitlementFormComponent)();
}, "LeaveEntitlementFormComponent_Factory"));
__publicField(_LeaveEntitlementFormComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeaveEntitlementFormComponent, selectors: [["app-leave-entitlement-form"]], decls: 4, vars: 8, consts: [[1, "container-fluid"], [3, "title", "subtitle", "mode", "moduleName", "moduleRoute", "entityId", "loading"], [3, "message", "centered"], [1, "card"], [1, "card-body"], [3, "ngSubmit", "formGroup"], [1, "row"], [1, "col-md-6"], [3, "title", "description"], [1, "mb-3"], ["for", "employeeId", 1, "form-label"], [1, "text-danger"], ["formControlName", "employeeId", 3, "options", "placeholder", "disabled"], [1, "text-danger", "small", "mt-1"], ["for", "vacationTypeId", 1, "form-label"], ["formControlName", "vacationTypeId", 3, "options", "placeholder", "disabled"], ["for", "year", 1, "form-label"], ["id", "year", "formControlName", "year", 1, "form-select"], [3, "value"], [1, "invalid-feedback"], ["for", "annualDays", 1, "form-label"], ["type", "number", "id", "annualDays", "formControlName", "annualDays", "min", "0", "max", "365", "step", "0.5", "placeholder", "30", 1, "form-control"], [1, "form-text"], ["for", "carryOverDays", 1, "form-label"], ["type", "number", "id", "carryOverDays", "formControlName", "carryOverDays", "min", "0", "max", "365", "step", "0.5", "placeholder", "0", 1, "form-control", 3, "blur"], ["for", "maxCarryOverDays", 1, "form-label"], ["type", "number", "id", "maxCarryOverDays", "formControlName", "maxCarryOverDays", "min", "0", "max", "365", "step", "0.5", 1, "form-control", 3, "placeholder"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "expiresAtYearEnd", "formControlName", "expiresAtYearEnd", 1, "form-check-input"], ["for", "expiresAtYearEnd", 1, "form-check-label"], ["for", "effectiveStartDate", 1, "form-label"], ["type", "date", "id", "effectiveStartDate", "formControlName", "effectiveStartDate", 1, "form-control"], ["for", "effectiveEndDate", 1, "form-label"], ["type", "date", "id", "effectiveEndDate", "formControlName", "effectiveEndDate", 1, "form-control"], ["for", "notes", 1, "form-label"], ["id", "notes", "formControlName", "notes", "rows", "4", "maxlength", "500", 1, "form-control", 3, "placeholder"], [1, "text-muted"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: /* @__PURE__ */ __name(function LeaveEntitlementFormComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, LeaveEntitlementFormComponent_Conditional_2_Template, 1, 2, "app-loading-spinner", 2)(3, LeaveEntitlementFormComponent_Conditional_3_Template, 91, 57, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.getPageTitle())("subtitle", ctx.i18n.t("leaveBalance.entitlementFormDescription"))("mode", ctx.isEditMode() ? "edit" : "create")("moduleName", "leaveBalance")("moduleRoute", "settings/leave-entitlements")("entityId", ctx.entitlementId() ?? void 0)("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : 3);
  }
}, "LeaveEntitlementFormComponent_Template"), dependencies: [
  ReactiveFormsModule,
  \u0275NgNoValidate,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DefaultValueAccessor,
  NumberValueAccessor,
  CheckboxControlValueAccessor,
  SelectControlValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  MaxLengthValidator,
  MinValidator,
  MaxValidator,
  FormGroupDirective,
  FormControlName,
  FormHeaderComponent,
  FormSectionComponent,
  SearchableSelectComponent,
  LoadingSpinnerComponent
], styles: ["\n\n.container-fluid[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.row[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.g-3[_ngcontent-%COMP%] {\n  --bs-gutter-x: 1rem;\n  --bs-gutter-y: 1rem;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  border: 1px solid #ced4da;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.form-control[_ngcontent-%COMP%]:disabled, \n.form-select[_ngcontent-%COMP%]:disabled {\n  background-color: #e9ecef;\n  opacity: 1;\n}\n.form-control[type=number][_ngcontent-%COMP%] {\n  -moz-appearance: textfield;\n}\n.form-control[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button, \n.form-control[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.form-check-input[_ngcontent-%COMP%] {\n  cursor: pointer;\n  width: 2.5rem;\n  height: 1.25rem;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-weight: 400;\n  color: #495057;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: #28a745;\n  border-color: #28a745;\n}\ntextarea.form-control[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 100px;\n}\n.text-muted[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6c757d !important;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  padding: 0.5rem 1.25rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.65;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #0056b3;\n  border-color: #004085;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #6c757d;\n  color: #fff;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n  border-width: 0.125rem;\n}\n.gap-2[_ngcontent-%COMP%] {\n  gap: 0.5rem;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n}\nsmall.text-muted[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.25rem;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .col-md-4[_ngcontent-%COMP%], \n   .col-md-6[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .d-flex.gap-2[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=leave-entitlement-form.component.css.map */"] }));
var LeaveEntitlementFormComponent = _LeaveEntitlementFormComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeaveEntitlementFormComponent, [{
    type: Component,
    args: [{ selector: "app-leave-entitlement-form", standalone: true, imports: [
      ReactiveFormsModule,
      FormHeaderComponent,
      FormSectionComponent,
      SearchableSelectComponent,
      LoadingSpinnerComponent
    ], template: `<div class="container-fluid">\r
  <!-- Form Header -->\r
  <app-form-header\r
    [title]="getPageTitle()"\r
    [subtitle]="i18n.t('leaveBalance.entitlementFormDescription')"\r
    [mode]="isEditMode() ? 'edit' : 'create'"\r
    [moduleName]="'leaveBalance'"\r
    [moduleRoute]="'settings/leave-entitlements'"\r
    [entityId]="entitlementId() ?? undefined"\r
    [loading]="submitting()">\r
  </app-form-header>\r
\r
  @if (loading()) {\r
    <app-loading-spinner\r
      [message]="i18n.t('common.loading')"\r
      [centered]="true">\r
    </app-loading-spinner>\r
  } @else {\r
    <!-- Form Card -->\r
    <div class="card">\r
      <div class="card-body">\r
        <form [formGroup]="entitlementForm" (ngSubmit)="onSubmit()">\r
          <div class="row">\r
            <!-- Basic Information Section -->\r
            <div class="col-md-6">\r
              <app-form-section\r
                [title]="i18n.t('leaveBalance.basicInformation')"\r
                [description]="i18n.t('leaveBalance.basicInformationDescription')">\r
                <!-- Employee Selection -->\r
                <div class="mb-3">\r
                  <label for="employeeId" class="form-label">\r
                    {{ i18n.t('employees.employee') }}\r
                    <span class="text-danger">*</span>\r
                  </label>\r
                  <app-searchable-select\r
                    formControlName="employeeId"\r
                    [options]="employees()"\r
                    [placeholder]="i18n.t('leaveBalance.selectEmployee')"\r
                    [disabled]="isEditMode()">\r
                  </app-searchable-select>\r
                  @if (entitlementForm.get('employeeId')?.invalid && entitlementForm.get('employeeId')?.touched) {\r
                    <div class="text-danger small mt-1">\r
                      {{ i18n.t('errors.fieldRequired') }}\r
                    </div>\r
                  }\r
                </div>\r
\r
                <!-- Vacation Type Selection -->\r
                <div class="mb-3">\r
                  <label for="vacationTypeId" class="form-label">\r
                    {{ i18n.t('vacationTypes.vacationType') }}\r
                    <span class="text-danger">*</span>\r
                  </label>\r
                  <app-searchable-select\r
                    formControlName="vacationTypeId"\r
                    [options]="vacationTypes()"\r
                    [placeholder]="i18n.t('leaveBalance.selectVacationType')"\r
                    [disabled]="isEditMode()">\r
                  </app-searchable-select>\r
                  @if (entitlementForm.get('vacationTypeId')?.invalid && entitlementForm.get('vacationTypeId')?.touched) {\r
                    <div class="text-danger small mt-1">\r
                      {{ i18n.t('errors.fieldRequired') }}\r
                    </div>\r
                  }\r
                </div>\r
\r
                <!-- Year -->\r
                <div class="mb-3">\r
                  <label for="year" class="form-label">\r
                    {{ i18n.t('leaveBalance.year') }}\r
                    <span class="text-danger">*</span>\r
                  </label>\r
                  <select\r
                    id="year"\r
                    class="form-select"\r
                    formControlName="year"\r
                    [class.is-invalid]="entitlementForm.get('year')?.invalid && entitlementForm.get('year')?.touched"\r
                    [attr.disabled]="isEditMode() ? true : null">\r
                    @for (year of availableYears(); track year) {\r
                      <option [value]="year">{{ year }}</option>\r
                    }\r
                  </select>\r
                  @if (entitlementForm.get('year')?.invalid && entitlementForm.get('year')?.touched) {\r
                    <div class="invalid-feedback">\r
                      {{ i18n.t('errors.invalidYear') }}\r
                    </div>\r
                  }\r
                </div>\r
\r
                <!-- Annual Days -->\r
                <div class="mb-3">\r
                  <label for="annualDays" class="form-label">\r
                    {{ i18n.t('leaveBalance.annualDays') }}\r
                    <span class="text-danger">*</span>\r
                  </label>\r
                  <input\r
                    type="number"\r
                    id="annualDays"\r
                    class="form-control"\r
                    formControlName="annualDays"\r
                    [class.is-invalid]="entitlementForm.get('annualDays')?.invalid && entitlementForm.get('annualDays')?.touched"\r
                    min="0"\r
                    max="365"\r
                    step="0.5"\r
                    placeholder="30">\r
                  @if (entitlementForm.get('annualDays')?.invalid && entitlementForm.get('annualDays')?.touched) {\r
                    <div class="invalid-feedback">\r
                      {{ i18n.t('errors.invalidDays') }}\r
                    </div>\r
                  }\r
                  <div class="form-text">{{ i18n.t('leaveBalance.annualDaysHelp') }}</div>\r
                </div>\r
              </app-form-section>\r
            </div>\r
\r
            <!-- Carry-Over Configuration Section -->\r
            <div class="col-md-6">\r
              <app-form-section\r
                [title]="i18n.t('leaveBalance.carryOverConfiguration')"\r
                [description]="i18n.t('leaveBalance.carryOverConfigurationDescription')">\r
                <!-- Carry Over Days -->\r
                <div class="mb-3">\r
                  <label for="carryOverDays" class="form-label">\r
                    {{ i18n.t('leaveBalance.carryOverDays') }}\r
                  </label>\r
                  <input\r
                    type="number"\r
                    id="carryOverDays"\r
                    class="form-control"\r
                    formControlName="carryOverDays"\r
                    [class.is-invalid]="entitlementForm.get('carryOverDays')?.invalid && entitlementForm.get('carryOverDays')?.touched"\r
                    min="0"\r
                    max="365"\r
                    step="0.5"\r
                    placeholder="0"\r
                    (blur)="validateMaxCarryOver()">\r
                  @if (entitlementForm.get('carryOverDays')?.invalid && entitlementForm.get('carryOverDays')?.touched) {\r
                    <div class="invalid-feedback">\r
                      {{ i18n.t('errors.invalidDays') }}\r
                    </div>\r
                  }\r
                  <div class="form-text">{{ i18n.t('leaveBalance.carryOverDaysHelp') }}</div>\r
                </div>\r
\r
                <!-- Max Carry Over Days -->\r
                <div class="mb-3">\r
                  <label for="maxCarryOverDays" class="form-label">\r
                    {{ i18n.t('leaveBalance.maxCarryOverDays') }}\r
                  </label>\r
                  <input\r
                    type="number"\r
                    id="maxCarryOverDays"\r
                    class="form-control"\r
                    formControlName="maxCarryOverDays"\r
                    [class.is-invalid]="entitlementForm.get('maxCarryOverDays')?.invalid && entitlementForm.get('maxCarryOverDays')?.touched"\r
                    min="0"\r
                    max="365"\r
                    step="0.5"\r
                    [placeholder]="i18n.t('common.unlimited')">\r
                  @if (entitlementForm.get('maxCarryOverDays')?.invalid && entitlementForm.get('maxCarryOverDays')?.touched) {\r
                    <div class="invalid-feedback">\r
                      {{ i18n.t('errors.invalidDays') }}\r
                    </div>\r
                  }\r
                  <div class="form-text">{{ i18n.t('leaveBalance.maxCarryOverDaysHelp') }}</div>\r
                </div>\r
\r
                <!-- Expires At Year End -->\r
                <div class="mb-3">\r
                  <div class="form-check form-switch">\r
                    <input\r
                      class="form-check-input"\r
                      type="checkbox"\r
                      id="expiresAtYearEnd"\r
                      formControlName="expiresAtYearEnd">\r
                    <label class="form-check-label" for="expiresAtYearEnd">\r
                      {{ i18n.t('leaveBalance.expiresAtYearEnd') }}\r
                    </label>\r
                  </div>\r
                  <div class="form-text">{{ i18n.t('leaveBalance.expiresAtYearEndHelp') }}</div>\r
                </div>\r
              </app-form-section>\r
            </div>\r
          </div>\r
\r
          <!-- Effective Dates Section -->\r
          <app-form-section\r
            [title]="i18n.t('leaveBalance.effectiveDates')"\r
            [description]="i18n.t('leaveBalance.effectiveDatesDescription')">\r
            <div class="row">\r
              <div class="col-md-6">\r
                <!-- Effective Start Date -->\r
                <div class="mb-3">\r
                  <label for="effectiveStartDate" class="form-label">\r
                    {{ i18n.t('leaveBalance.effectiveStartDate') }}\r
                  </label>\r
                  <input\r
                    type="date"\r
                    id="effectiveStartDate"\r
                    class="form-control"\r
                    formControlName="effectiveStartDate">\r
                  <div class="form-text">{{ i18n.t('leaveBalance.effectiveStartDateHelp') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-md-6">\r
                <!-- Effective End Date -->\r
                <div class="mb-3">\r
                  <label for="effectiveEndDate" class="form-label">\r
                    {{ i18n.t('leaveBalance.effectiveEndDate') }}\r
                  </label>\r
                  <input\r
                    type="date"\r
                    id="effectiveEndDate"\r
                    class="form-control"\r
                    formControlName="effectiveEndDate">\r
                  <div class="form-text">{{ i18n.t('leaveBalance.effectiveEndDateHelp') }}</div>\r
                </div>\r
              </div>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Notes Section -->\r
          <app-form-section\r
            [title]="i18n.t('common.notes')"\r
            [description]="i18n.t('leaveBalance.notesDescription')">\r
            <div class="mb-3">\r
              <label for="notes" class="form-label">\r
                {{ i18n.t('common.notes') }}\r
              </label>\r
              <textarea\r
                id="notes"\r
                class="form-control"\r
                formControlName="notes"\r
                rows="4"\r
                maxlength="500"\r
                [class.is-invalid]="entitlementForm.get('notes')?.invalid && entitlementForm.get('notes')?.touched"\r
                [placeholder]="i18n.t('leaveBalance.notesPlaceholder')"></textarea>\r
              @if (entitlementForm.get('notes')?.invalid && entitlementForm.get('notes')?.touched) {\r
                <div class="invalid-feedback">\r
                  {{ i18n.t('errors.notesTooLong') }}\r
                </div>\r
              }\r
              <small class="text-muted">\r
                {{ entitlementForm.get('notes')?.value?.length || 0 }} / 500\r
              </small>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Form Actions -->\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button\r
              type="button"\r
              class="btn btn-outline-secondary"\r
              (click)="onCancel()"\r
              [disabled]="submitting()">\r
              {{ i18n.t('common.cancel') }}\r
            </button>\r
            <button\r
              type="submit"\r
              class="btn btn-primary"\r
              [disabled]="submitting() || entitlementForm.invalid">\r
              @if (submitting()) {\r
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
              }\r
              {{ getSubmitButtonLabel() }}\r
            </button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/settings/leave-balances/leave-entitlement-form/leave-entitlement-form.component.css */\n.container-fluid {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.row {\n  margin-bottom: 0;\n}\n.g-3 {\n  --bs-gutter-x: 1rem;\n  --bs-gutter-y: 1rem;\n}\n.form-control,\n.form-select {\n  border-radius: 0.375rem;\n  border: 1px solid #ced4da;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.form-control:disabled,\n.form-select:disabled {\n  background-color: #e9ecef;\n  opacity: 1;\n}\n.form-control[type=number] {\n  -moz-appearance: textfield;\n}\n.form-control[type=number]::-webkit-outer-spin-button,\n.form-control[type=number]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.form-check-input {\n  cursor: pointer;\n  width: 2.5rem;\n  height: 1.25rem;\n}\n.form-check-label {\n  cursor: pointer;\n  font-weight: 400;\n  color: #495057;\n}\n.form-check-input:checked {\n  background-color: #28a745;\n  border-color: #28a745;\n}\ntextarea.form-control {\n  resize: vertical;\n  min-height: 100px;\n}\n.text-muted {\n  font-size: 0.875rem;\n  color: #6c757d !important;\n}\n.btn {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  padding: 0.5rem 1.25rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn:disabled {\n  cursor: not-allowed;\n  opacity: 0.65;\n}\n.btn-primary {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.btn-primary:hover:not(:disabled) {\n  background-color: #0056b3;\n  border-color: #004085;\n}\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary:hover:not(:disabled) {\n  background-color: #6c757d;\n  color: #fff;\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n  border-width: 0.125rem;\n}\n.gap-2 {\n  gap: 0.5rem;\n}\n.spinner-border {\n  width: 3rem;\n  height: 3rem;\n}\nsmall.text-muted {\n  display: block;\n  margin-top: 0.25rem;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding: 1rem;\n  }\n  .col-md-4,\n  .col-md-6 {\n    width: 100%;\n  }\n  .d-flex.gap-2 {\n    flex-direction: column;\n  }\n  .btn {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=leave-entitlement-form.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeaveEntitlementFormComponent, { className: "LeaveEntitlementFormComponent", filePath: "src/app/pages/settings/leave-balances/leave-entitlement-form/leave-entitlement-form.component.ts", lineNumber: 33 });
})();
export {
  LeaveEntitlementFormComponent
};
//# sourceMappingURL=chunk-PNRNGXOJ.js.map
