import {
  RemoteWorkPoliciesService
} from "./chunk-EGHINQUX.js";
import {
  SectionCardComponent
} from "./chunk-OAYY6FJW.js";
import {
  DefinitionListComponent
} from "./chunk-I7HA6QL2.js";
import {
  DataTableComponent
} from "./chunk-7JZQN7NK.js";
import {
  UnifiedFilterComponent
} from "./chunk-THHKOIOG.js";
import "./chunk-5ZV3Z4IV.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
import "./chunk-DS3UNCKJ.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-7XYWDBYG.js";
import {
  ConfirmationService
} from "./chunk-NUNE7G5P.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import "./chunk-GSKH2KOG.js";
import {
  PageHeaderComponent
} from "./chunk-DKGFJHVQ.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
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
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  ViewChild,
  inject,
  output,
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
  ɵɵloadQuery,
  ɵɵnextContext,
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
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/remote-work-policy/remote-work-policy-modal/remote-work-policy-modal.component.ts
var _c0 = ["modalElement"];
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function RemoteWorkPolicyModalComponent_Conditional_9_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "label", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 15);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.maxConsecutiveDays"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentPolicy().maxConsecutiveDays);
  }
}
__name(RemoteWorkPolicyModalComponent_Conditional_9_Conditional_37_Template, "RemoteWorkPolicyModalComponent_Conditional_9_Conditional_37_Template");
function RemoteWorkPolicyModalComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 13)(2, "label", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 13)(7, "h6", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 17)(10, "label", 14);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 15);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 17)(15, "label", 14);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 15);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 17)(20, "label", 14);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 15);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 18)(25, "h6", 16);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 19)(28, "label", 14);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 15);
    \u0275\u0275element(31, "app-status-badge", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 19)(33, "label", 14);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 15);
    \u0275\u0275element(36, "app-status-badge", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(37, RemoteWorkPolicyModalComponent_Conditional_9_Conditional_37_Template, 5, 2, "div", 19);
    \u0275\u0275elementStart(38, "div", 19)(39, "label", 14);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "p", 15);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 18)(44, "h6", 16);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 19)(47, "label", 14);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "p", 15);
    \u0275\u0275element(50, "app-status-badge", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 19)(52, "label", 14);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 15);
    \u0275\u0275element(55, "app-status-badge", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 18)(57, "label", 14);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "p", 15);
    \u0275\u0275element(60, "app-status-badge", 20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.branch"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getBranchName((tmp_3_0 = ctx_r1.currentPolicy()) == null ? null : tmp_3_0.branchId));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.quotas"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.maxDaysPerWeek"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentPolicy().maxDaysPerWeek || ctx_r1.i18n.t("common.unlimited"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.maxDaysPerMonth"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentPolicy().maxDaysPerMonth || ctx_r1.i18n.t("common.unlimited"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.maxDaysPerYear"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentPolicy().maxDaysPerYear || ctx_r1.i18n.t("common.unlimited"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.rules"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.requiresManagerApproval"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r1.currentPolicy().requiresManagerApproval ? ctx_r1.i18n.t("common.yes") : ctx_r1.i18n.t("common.no"))("variant", ctx_r1.currentPolicy().requiresManagerApproval ? "warning" : "secondary");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.allowConsecutiveDays"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r1.currentPolicy().allowConsecutiveDays ? ctx_r1.i18n.t("common.yes") : ctx_r1.i18n.t("common.no"))("variant", ctx_r1.currentPolicy().allowConsecutiveDays ? "success" : "secondary");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.currentPolicy().allowConsecutiveDays && ctx_r1.currentPolicy().maxConsecutiveDays ? 37 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.minAdvanceNoticeDays"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.currentPolicy().minAdvanceNoticeDays || 0, " ", ctx_r1.i18n.t("common.days"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.attendanceSettings"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.countForOvertime"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r1.currentPolicy().countForOvertime ? ctx_r1.i18n.t("common.yes") : ctx_r1.i18n.t("common.no"))("variant", ctx_r1.currentPolicy().countForOvertime ? "success" : "secondary");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.enforceShiftTimes"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r1.currentPolicy().enforceShiftTimes ? ctx_r1.i18n.t("common.yes") : ctx_r1.i18n.t("common.no"))("variant", ctx_r1.currentPolicy().enforceShiftTimes ? "warning" : "secondary");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.status"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r1.currentPolicy().isActive ? ctx_r1.i18n.t("common.active") : ctx_r1.i18n.t("common.inactive"))("variant", ctx_r1.currentPolicy().isActive ? "success" : "secondary");
  }
}
__name(RemoteWorkPolicyModalComponent_Conditional_9_Template, "RemoteWorkPolicyModalComponent_Conditional_9_Template");
function RemoteWorkPolicyModalComponent_Conditional_10_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", branch_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(branch_r4.name);
  }
}
__name(RemoteWorkPolicyModalComponent_Conditional_10_For_11_Template, "RemoteWorkPolicyModalComponent_Conditional_10_For_11_Template");
function RemoteWorkPolicyModalComponent_Conditional_10_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("validation.required"));
  }
}
__name(RemoteWorkPolicyModalComponent_Conditional_10_Conditional_12_Template, "RemoteWorkPolicyModalComponent_Conditional_10_Conditional_12_Template");
function RemoteWorkPolicyModalComponent_Conditional_10_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "label", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.maxConsecutiveDays"));
  }
}
__name(RemoteWorkPolicyModalComponent_Conditional_10_Conditional_41_Template, "RemoteWorkPolicyModalComponent_Conditional_10_Conditional_41_Template");
function RemoteWorkPolicyModalComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 21);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function RemoteWorkPolicyModalComponent_Conditional_10_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    }, "RemoteWorkPolicyModalComponent_Conditional_10_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 13)(3, "label", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "span", 23);
    \u0275\u0275text(6, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "select", 24)(8, "option", 25);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(10, RemoteWorkPolicyModalComponent_Conditional_10_For_11_Template, 2, 2, "option", 25, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, RemoteWorkPolicyModalComponent_Conditional_10_Conditional_12_Template, 2, 1, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 18)(14, "h6", 16);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 17)(17, "label", 27);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 17)(21, "label", 29);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 17)(25, "label", 31);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "input", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 18)(29, "h6", 16);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 19)(32, "div", 33);
    \u0275\u0275element(33, "input", 34);
    \u0275\u0275elementStart(34, "label", 35);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 19)(37, "div", 33);
    \u0275\u0275element(38, "input", 36);
    \u0275\u0275elementStart(39, "label", 37);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(41, RemoteWorkPolicyModalComponent_Conditional_10_Conditional_41_Template, 4, 1, "div", 19);
    \u0275\u0275elementStart(42, "div", 19)(43, "label", 38);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275element(45, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 18)(47, "h6", 16);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 19)(50, "div", 33);
    \u0275\u0275element(51, "input", 40);
    \u0275\u0275elementStart(52, "label", 41);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(54, "div", 19)(55, "div", 33);
    \u0275\u0275element(56, "input", 42);
    \u0275\u0275elementStart(57, "label", 43);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 18)(60, "div", 33);
    \u0275\u0275element(61, "input", 44);
    \u0275\u0275elementStart(62, "label", 45);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.policyForm);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.policy.branch"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r1.hasError("branchId", "required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.select"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.availableBranches());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasError("branchId", "required") ? 12 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.quotas"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.maxDaysPerWeek"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r1.i18n.t("common.unlimited"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.maxDaysPerMonth"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r1.i18n.t("common.unlimited"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.maxDaysPerYear"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r1.i18n.t("common.unlimited"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.rules"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.policy.requiresManagerApproval"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.policy.allowConsecutiveDays"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.getFieldValue("allowConsecutiveDays") ? 41 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.minAdvanceNoticeDays"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.policy.attendanceSettings"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.policy.countForOvertime"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.policy.enforceShiftTimes"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.active"), " ");
  }
}
__name(RemoteWorkPolicyModalComponent_Conditional_10_Template, "RemoteWorkPolicyModalComponent_Conditional_10_Template");
function RemoteWorkPolicyModalComponent_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 49);
  }
}
__name(RemoteWorkPolicyModalComponent_Conditional_14_Conditional_1_Template, "RemoteWorkPolicyModalComponent_Conditional_14_Conditional_1_Template");
function RemoteWorkPolicyModalComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function RemoteWorkPolicyModalComponent_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    }, "RemoteWorkPolicyModalComponent_Conditional_14_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, RemoteWorkPolicyModalComponent_Conditional_14_Conditional_1_Template, 1, 0, "span", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.submitting() || ctx_r1.policyForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.submitting() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalMode() === "create" ? ctx_r1.i18n.t("common.create") : ctx_r1.i18n.t("common.save"), " ");
  }
}
__name(RemoteWorkPolicyModalComponent_Conditional_14_Template, "RemoteWorkPolicyModalComponent_Conditional_14_Template");
var _RemoteWorkPolicyModalComponent = class _RemoteWorkPolicyModalComponent {
  fb = inject(FormBuilder);
  remoteWorkPoliciesService = inject(RemoteWorkPoliciesService);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  modalElement;
  // Output events
  policyCreated = output();
  policyUpdated = output();
  // Signals
  modalMode = signal("create", ...ngDevMode ? [{ debugName: "modalMode" }] : []);
  currentPolicy = signal(null, ...ngDevMode ? [{ debugName: "currentPolicy" }] : []);
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  // Form
  policyForm;
  modalInstance;
  ngOnInit() {
    this.initializeForm();
    this.loadBranches();
  }
  /**
   * Initialize the reactive form
   */
  initializeForm() {
    this.policyForm = this.fb.group({
      branchId: [null, [Validators.required]],
      maxDaysPerWeek: [null, [Validators.min(1), Validators.max(7)]],
      maxDaysPerMonth: [null, [Validators.min(1), Validators.max(31)]],
      maxDaysPerYear: [null, [Validators.min(1), Validators.max(365)]],
      requiresManagerApproval: [false],
      allowConsecutiveDays: [true],
      maxConsecutiveDays: [null, [Validators.min(1), Validators.max(31)]],
      minAdvanceNoticeDays: [null, [Validators.min(0), Validators.max(90)]],
      blackoutPeriods: [""],
      countForOvertime: [true],
      enforceShiftTimes: [false],
      isActive: [true]
    });
  }
  /**
   * Load available branches
   */
  loadBranches() {
    this.availableBranches.set([
      { id: 1, name: "Main Branch" },
      { id: 2, name: "Secondary Branch" }
    ]);
  }
  /**
   * Open the modal in specified mode
   */
  openModal(policy, mode = "create") {
    this.modalMode.set(mode);
    this.currentPolicy.set(policy || null);
    if (mode === "create") {
      this.policyForm.reset({
        requiresManagerApproval: false,
        allowConsecutiveDays: true,
        countForOvertime: true,
        enforceShiftTimes: false,
        isActive: true
      });
      this.policyForm.enable();
    } else if (mode === "edit" && policy) {
      this.policyForm.patchValue({
        branchId: policy.branchId,
        maxDaysPerWeek: policy.maxDaysPerWeek,
        maxDaysPerMonth: policy.maxDaysPerMonth,
        maxDaysPerYear: policy.maxDaysPerYear,
        requiresManagerApproval: policy.requiresManagerApproval,
        allowConsecutiveDays: policy.allowConsecutiveDays,
        maxConsecutiveDays: policy.maxConsecutiveDays,
        minAdvanceNoticeDays: policy.minAdvanceNoticeDays,
        blackoutPeriods: policy.blackoutPeriods,
        countForOvertime: policy.countForOvertime,
        enforceShiftTimes: policy.enforceShiftTimes,
        isActive: policy.isActive
      });
      this.policyForm.enable();
    } else if (mode === "view" && policy) {
      this.policyForm.patchValue({
        branchId: policy.branchId,
        maxDaysPerWeek: policy.maxDaysPerWeek,
        maxDaysPerMonth: policy.maxDaysPerMonth,
        maxDaysPerYear: policy.maxDaysPerYear,
        requiresManagerApproval: policy.requiresManagerApproval,
        allowConsecutiveDays: policy.allowConsecutiveDays,
        maxConsecutiveDays: policy.maxConsecutiveDays,
        minAdvanceNoticeDays: policy.minAdvanceNoticeDays,
        blackoutPeriods: policy.blackoutPeriods,
        countForOvertime: policy.countForOvertime,
        enforceShiftTimes: policy.enforceShiftTimes,
        isActive: policy.isActive
      });
      this.policyForm.disable();
    }
    this.showModal();
  }
  /**
   * Show Bootstrap modal
   */
  showModal() {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
      this.modalInstance.show();
    }
  }
  /**
   * Hide Bootstrap modal
   */
  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
  /**
   * Handle form submission
   */
  onSubmit() {
    if (this.policyForm.invalid) {
      this.markFormGroupTouched(this.policyForm);
      return;
    }
    this.submitting.set(true);
    const formValue = this.policyForm.value;
    if (this.modalMode() === "create") {
      this.createPolicy(formValue);
    } else if (this.modalMode() === "edit") {
      this.updatePolicy(formValue);
    }
  }
  /**
   * Create new policy
   */
  createPolicy(formValue) {
    this.remoteWorkPoliciesService.create(formValue).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notificationService.success(this.i18n.t("remoteWork.policy.success.created"));
        this.submitting.set(false);
        this.closeModal();
        this.policyCreated.emit();
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to create remote work policy:", error);
        this.notificationService.error(this.i18n.t("remoteWork.policy.errors.create_failed"));
        this.submitting.set(false);
      }, "error")
    });
  }
  /**
   * Update existing policy
   */
  updatePolicy(formValue) {
    const policyId = this.currentPolicy()?.id;
    if (!policyId)
      return;
    this.remoteWorkPoliciesService.update(policyId, formValue).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notificationService.success(this.i18n.t("remoteWork.policy.success.updated"));
        this.submitting.set(false);
        this.closeModal();
        this.policyUpdated.emit();
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to update remote work policy:", error);
        this.notificationService.error(this.i18n.t("remoteWork.policy.errors.update_failed"));
        this.submitting.set(false);
      }, "error")
    });
  }
  /**
   * Mark all form fields as touched to trigger validation
   */
  markFormGroupTouched(formGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
  /**
   * Get modal title based on mode
   */
  getModalTitle() {
    switch (this.modalMode()) {
      case "create":
        return this.i18n.t("remoteWork.policy.create");
      case "edit":
        return this.i18n.t("remoteWork.policy.edit");
      case "view":
        return this.i18n.t("remoteWork.policy.view");
      default:
        return "";
    }
  }
  /**
   * Check if form field has error
   */
  hasError(fieldName, errorType) {
    const field = this.policyForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }
  /**
   * Get field value
   */
  getFieldValue(fieldName) {
    return this.policyForm.get(fieldName)?.value;
  }
  /**
   * Get branch name by ID
   */
  getBranchName(branchId) {
    if (!branchId)
      return "";
    return this.availableBranches().find((b) => b.id === branchId)?.name || "";
  }
};
__name(_RemoteWorkPolicyModalComponent, "RemoteWorkPolicyModalComponent");
__publicField(_RemoteWorkPolicyModalComponent, "\u0275fac", /* @__PURE__ */ __name(function RemoteWorkPolicyModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RemoteWorkPolicyModalComponent)();
}, "RemoteWorkPolicyModalComponent_Factory"));
__publicField(_RemoteWorkPolicyModalComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RemoteWorkPolicyModalComponent, selectors: [["app-remote-work-policy-modal"]], viewQuery: /* @__PURE__ */ __name(function RemoteWorkPolicyModalComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c0, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.modalElement = _t.first);
  }
}, "RemoteWorkPolicyModalComponent_Query"), outputs: { policyCreated: "policyCreated", policyUpdated: "policyUpdated" }, decls: 15, vars: 5, consts: [["modalElement", ""], ["tabindex", "-1", "aria-labelledby", "policyModalLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], ["id", "policyModalLabel", 1, "modal-title"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "row", "g-3"], [3, "formGroup"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled"], [1, "col-12"], [1, "form-label", "fw-bold"], [1, "mb-0"], [1, "border-bottom", "pb-2"], [1, "col-md-4"], [1, "col-12", "mt-4"], [1, "col-md-6"], [3, "status", "variant"], [3, "ngSubmit", "formGroup"], ["for", "branchId", 1, "form-label"], [1, "text-danger"], ["id", "branchId", "formControlName", "branchId", 1, "form-select"], [3, "ngValue"], [1, "invalid-feedback"], ["for", "maxDaysPerWeek", 1, "form-label"], ["type", "number", "id", "maxDaysPerWeek", "formControlName", "maxDaysPerWeek", "min", "1", "max", "7", 1, "form-control", 3, "placeholder"], ["for", "maxDaysPerMonth", 1, "form-label"], ["type", "number", "id", "maxDaysPerMonth", "formControlName", "maxDaysPerMonth", "min", "1", "max", "31", 1, "form-control", 3, "placeholder"], ["for", "maxDaysPerYear", 1, "form-label"], ["type", "number", "id", "maxDaysPerYear", "formControlName", "maxDaysPerYear", "min", "1", "max", "365", 1, "form-control", 3, "placeholder"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "requiresManagerApproval", "formControlName", "requiresManagerApproval", 1, "form-check-input"], ["for", "requiresManagerApproval", 1, "form-check-label"], ["type", "checkbox", "id", "allowConsecutiveDays", "formControlName", "allowConsecutiveDays", 1, "form-check-input"], ["for", "allowConsecutiveDays", 1, "form-check-label"], ["for", "minAdvanceNoticeDays", 1, "form-label"], ["type", "number", "id", "minAdvanceNoticeDays", "formControlName", "minAdvanceNoticeDays", "min", "0", "max", "90", 1, "form-control"], ["type", "checkbox", "id", "countForOvertime", "formControlName", "countForOvertime", 1, "form-check-input"], ["for", "countForOvertime", 1, "form-check-label"], ["type", "checkbox", "id", "enforceShiftTimes", "formControlName", "enforceShiftTimes", 1, "form-check-input"], ["for", "enforceShiftTimes", 1, "form-check-label"], ["type", "checkbox", "id", "isActive", "formControlName", "isActive", 1, "form-check-input"], ["for", "isActive", 1, "form-check-label"], ["for", "maxConsecutiveDays", 1, "form-label"], ["type", "number", "id", "maxConsecutiveDays", "formControlName", "maxConsecutiveDays", "min", "1", "max", "31", 1, "form-control"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: /* @__PURE__ */ __name(function RemoteWorkPolicyModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1, 0)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h5", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 6);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function RemoteWorkPolicyModalComponent_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.closeModal());
    }, "RemoteWorkPolicyModalComponent_Template_button_click_7_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 7);
    \u0275\u0275conditionalCreate(9, RemoteWorkPolicyModalComponent_Conditional_9_Template, 61, 30, "div", 8)(10, RemoteWorkPolicyModalComponent_Conditional_10_Template, 64, 23, "form", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 10)(12, "button", 11);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function RemoteWorkPolicyModalComponent_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.closeModal());
    }, "RemoteWorkPolicyModalComponent_Template_button_click_12_listener"));
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, RemoteWorkPolicyModalComponent_Conditional_14_Template, 3, 3, "button", 12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.getModalTitle());
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx.i18n.t("common.close"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.modalMode() === "view" && ctx.currentPolicy() ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.close"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.modalMode() !== "view" ? 14 : -1);
  }
}, "RemoteWorkPolicyModalComponent_Template"), dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName, StatusBadgeComponent], styles: ["\n\n/*# sourceMappingURL=remote-work-policy-modal.component.css.map */"] }));
var RemoteWorkPolicyModalComponent = _RemoteWorkPolicyModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RemoteWorkPolicyModalComponent, [{
    type: Component,
    args: [{ selector: "app-remote-work-policy-modal", standalone: true, imports: [
      ReactiveFormsModule,
      StatusBadgeComponent,
      DefinitionListComponent
    ], template: `<div class="modal fade" #modalElement tabindex="-1" aria-labelledby="policyModalLabel" aria-hidden="true">\r
  <div class="modal-dialog modal-lg">\r
    <div class="modal-content">\r
      <div class="modal-header">\r
        <h5 class="modal-title" id="policyModalLabel">{{ getModalTitle() }}</h5>\r
        <button type="button" class="btn-close" [attr.aria-label]="i18n.t('common.close')" (click)="closeModal()"></button>\r
      </div>\r
\r
      <div class="modal-body">\r
        @if (modalMode() === 'view' && currentPolicy()) {\r
          <!-- View Mode -->\r
          <div class="row g-3">\r
            <!-- Branch -->\r
            <div class="col-12">\r
              <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.branch') }}</label>\r
              <p class="mb-0">{{ getBranchName(currentPolicy()?.branchId) }}</p>\r
            </div>\r
\r
            <!-- Quotas Section -->\r
            <div class="col-12">\r
              <h6 class="border-bottom pb-2">{{ i18n.t('remoteWork.policy.quotas') }}</h6>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.maxDaysPerWeek') }}</label>\r
              <p class="mb-0">{{ currentPolicy()!.maxDaysPerWeek || i18n.t('common.unlimited') }}</p>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.maxDaysPerMonth') }}</label>\r
              <p class="mb-0">{{ currentPolicy()!.maxDaysPerMonth || i18n.t('common.unlimited') }}</p>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.maxDaysPerYear') }}</label>\r
              <p class="mb-0">{{ currentPolicy()!.maxDaysPerYear || i18n.t('common.unlimited') }}</p>\r
            </div>\r
\r
            <!-- Rules Section -->\r
            <div class="col-12 mt-4">\r
              <h6 class="border-bottom pb-2">{{ i18n.t('remoteWork.policy.rules') }}</h6>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.requiresManagerApproval') }}</label>\r
              <p class="mb-0">\r
                <app-status-badge\r
                  [status]="currentPolicy()!.requiresManagerApproval ? i18n.t('common.yes') : i18n.t('common.no')"\r
                  [variant]="currentPolicy()!.requiresManagerApproval ? 'warning' : 'secondary'">\r
                </app-status-badge>\r
              </p>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.allowConsecutiveDays') }}</label>\r
              <p class="mb-0">\r
                <app-status-badge\r
                  [status]="currentPolicy()!.allowConsecutiveDays ? i18n.t('common.yes') : i18n.t('common.no')"\r
                  [variant]="currentPolicy()!.allowConsecutiveDays ? 'success' : 'secondary'">\r
                </app-status-badge>\r
              </p>\r
            </div>\r
\r
            @if (!currentPolicy()!.allowConsecutiveDays && currentPolicy()!.maxConsecutiveDays) {\r
              <div class="col-md-6">\r
                <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.maxConsecutiveDays') }}</label>\r
                <p class="mb-0">{{ currentPolicy()!.maxConsecutiveDays }}</p>\r
              </div>\r
            }\r
\r
            <div class="col-md-6">\r
              <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.minAdvanceNoticeDays') }}</label>\r
              <p class="mb-0">{{ currentPolicy()!.minAdvanceNoticeDays || 0 }} {{ i18n.t('common.days') }}</p>\r
            </div>\r
\r
            <!-- Attendance Section -->\r
            <div class="col-12 mt-4">\r
              <h6 class="border-bottom pb-2">{{ i18n.t('remoteWork.policy.attendanceSettings') }}</h6>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.countForOvertime') }}</label>\r
              <p class="mb-0">\r
                <app-status-badge\r
                  [status]="currentPolicy()!.countForOvertime ? i18n.t('common.yes') : i18n.t('common.no')"\r
                  [variant]="currentPolicy()!.countForOvertime ? 'success' : 'secondary'">\r
                </app-status-badge>\r
              </p>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label class="form-label fw-bold">{{ i18n.t('remoteWork.policy.enforceShiftTimes') }}</label>\r
              <p class="mb-0">\r
                <app-status-badge\r
                  [status]="currentPolicy()!.enforceShiftTimes ? i18n.t('common.yes') : i18n.t('common.no')"\r
                  [variant]="currentPolicy()!.enforceShiftTimes ? 'warning' : 'secondary'">\r
                </app-status-badge>\r
              </p>\r
            </div>\r
\r
            <!-- Status -->\r
            <div class="col-12 mt-4">\r
              <label class="form-label fw-bold">{{ i18n.t('common.status') }}</label>\r
              <p class="mb-0">\r
                <app-status-badge\r
                  [status]="currentPolicy()!.isActive ? i18n.t('common.active') : i18n.t('common.inactive')"\r
                  [variant]="currentPolicy()!.isActive ? 'success' : 'secondary'">\r
                </app-status-badge>\r
              </p>\r
            </div>\r
          </div>\r
        } @else {\r
          <!-- Create/Edit Mode -->\r
          <form [formGroup]="policyForm" (ngSubmit)="onSubmit()">\r
            <div class="row g-3">\r
              <!-- Branch -->\r
              <div class="col-12">\r
                <label for="branchId" class="form-label">\r
                  {{ i18n.t('remoteWork.policy.branch') }} <span class="text-danger">*</span>\r
                </label>\r
                <select\r
                  id="branchId"\r
                  class="form-select"\r
                  formControlName="branchId"\r
                  [class.is-invalid]="hasError('branchId', 'required')">\r
                  <option [ngValue]="null">{{ i18n.t('common.select') }}</option>\r
                  @for (branch of availableBranches(); track branch.id) {\r
                    <option [ngValue]="branch.id">{{ branch.name }}</option>\r
                  }\r
                </select>\r
                @if (hasError('branchId', 'required')) {\r
                  <div class="invalid-feedback">{{ i18n.t('validation.required') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Quotas Section -->\r
              <div class="col-12 mt-4">\r
                <h6 class="border-bottom pb-2">{{ i18n.t('remoteWork.policy.quotas') }}</h6>\r
              </div>\r
\r
              <div class="col-md-4">\r
                <label for="maxDaysPerWeek" class="form-label">{{ i18n.t('remoteWork.policy.maxDaysPerWeek') }}</label>\r
                <input\r
                  type="number"\r
                  id="maxDaysPerWeek"\r
                  class="form-control"\r
                  formControlName="maxDaysPerWeek"\r
                  min="1"\r
                  max="7"\r
                  [placeholder]="i18n.t('common.unlimited')">\r
              </div>\r
\r
              <div class="col-md-4">\r
                <label for="maxDaysPerMonth" class="form-label">{{ i18n.t('remoteWork.policy.maxDaysPerMonth') }}</label>\r
                <input\r
                  type="number"\r
                  id="maxDaysPerMonth"\r
                  class="form-control"\r
                  formControlName="maxDaysPerMonth"\r
                  min="1"\r
                  max="31"\r
                  [placeholder]="i18n.t('common.unlimited')">\r
              </div>\r
\r
              <div class="col-md-4">\r
                <label for="maxDaysPerYear" class="form-label">{{ i18n.t('remoteWork.policy.maxDaysPerYear') }}</label>\r
                <input\r
                  type="number"\r
                  id="maxDaysPerYear"\r
                  class="form-control"\r
                  formControlName="maxDaysPerYear"\r
                  min="1"\r
                  max="365"\r
                  [placeholder]="i18n.t('common.unlimited')">\r
              </div>\r
\r
              <!-- Rules Section -->\r
              <div class="col-12 mt-4">\r
                <h6 class="border-bottom pb-2">{{ i18n.t('remoteWork.policy.rules') }}</h6>\r
              </div>\r
\r
              <div class="col-md-6">\r
                <div class="form-check form-switch">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="requiresManagerApproval"\r
                    formControlName="requiresManagerApproval">\r
                  <label class="form-check-label" for="requiresManagerApproval">\r
                    {{ i18n.t('remoteWork.policy.requiresManagerApproval') }}\r
                  </label>\r
                </div>\r
              </div>\r
\r
              <div class="col-md-6">\r
                <div class="form-check form-switch">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="allowConsecutiveDays"\r
                    formControlName="allowConsecutiveDays">\r
                  <label class="form-check-label" for="allowConsecutiveDays">\r
                    {{ i18n.t('remoteWork.policy.allowConsecutiveDays') }}\r
                  </label>\r
                </div>\r
              </div>\r
\r
              @if (!getFieldValue('allowConsecutiveDays')) {\r
                <div class="col-md-6">\r
                  <label for="maxConsecutiveDays" class="form-label">{{ i18n.t('remoteWork.policy.maxConsecutiveDays') }}</label>\r
                  <input\r
                    type="number"\r
                    id="maxConsecutiveDays"\r
                    class="form-control"\r
                    formControlName="maxConsecutiveDays"\r
                    min="1"\r
                    max="31">\r
                </div>\r
              }\r
\r
              <div class="col-md-6">\r
                <label for="minAdvanceNoticeDays" class="form-label">{{ i18n.t('remoteWork.policy.minAdvanceNoticeDays') }}</label>\r
                <input\r
                  type="number"\r
                  id="minAdvanceNoticeDays"\r
                  class="form-control"\r
                  formControlName="minAdvanceNoticeDays"\r
                  min="0"\r
                  max="90">\r
              </div>\r
\r
              <!-- Attendance Section -->\r
              <div class="col-12 mt-4">\r
                <h6 class="border-bottom pb-2">{{ i18n.t('remoteWork.policy.attendanceSettings') }}</h6>\r
              </div>\r
\r
              <div class="col-md-6">\r
                <div class="form-check form-switch">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="countForOvertime"\r
                    formControlName="countForOvertime">\r
                  <label class="form-check-label" for="countForOvertime">\r
                    {{ i18n.t('remoteWork.policy.countForOvertime') }}\r
                  </label>\r
                </div>\r
              </div>\r
\r
              <div class="col-md-6">\r
                <div class="form-check form-switch">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="enforceShiftTimes"\r
                    formControlName="enforceShiftTimes">\r
                  <label class="form-check-label" for="enforceShiftTimes">\r
                    {{ i18n.t('remoteWork.policy.enforceShiftTimes') }}\r
                  </label>\r
                </div>\r
              </div>\r
\r
              <!-- Status -->\r
              <div class="col-12 mt-4">\r
                <div class="form-check form-switch">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="isActive"\r
                    formControlName="isActive">\r
                  <label class="form-check-label" for="isActive">\r
                    {{ i18n.t('common.active') }}\r
                  </label>\r
                </div>\r
              </div>\r
            </div>\r
          </form>\r
        }\r
      </div>\r
\r
      <div class="modal-footer">\r
        <button type="button" class="btn btn-secondary" (click)="closeModal()">\r
          {{ i18n.t('common.close') }}\r
        </button>\r
        @if (modalMode() !== 'view') {\r
          <button\r
            type="button"\r
            class="btn btn-primary"\r
            (click)="onSubmit()"\r
            [disabled]="submitting() || policyForm.invalid">\r
            @if (submitting()) {\r
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
            }\r
            {{ modalMode() === 'create' ? i18n.t('common.create') : i18n.t('common.save') }}\r
          </button>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/pages/settings/remote-work-policy/remote-work-policy-modal/remote-work-policy-modal.component.css */\n/*# sourceMappingURL=remote-work-policy-modal.component.css.map */\n"] }]
  }], null, { modalElement: [{
    type: ViewChild,
    args: ["modalElement"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RemoteWorkPolicyModalComponent, { className: "RemoteWorkPolicyModalComponent", filePath: "src/app/pages/settings/remote-work-policy/remote-work-policy-modal/remote-work-policy-modal.component.ts", lineNumber: 31 });
})();

// src/app/pages/settings/remote-work-policy/remote-work-policy-list/remote-work-policy-list.component.ts
var _c02 = /* @__PURE__ */ __name(() => [], "_c0");
function RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" ", item_r2.branchName || "Branch " + item_r2.branchId, " ");
  }
}
__name(RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Conditional_0_Template, "RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Conditional_0_Template");
function RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.i18n.t("remoteWork.policy.company_wide"), " ");
  }
}
__name(RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Conditional_1_Template, "RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Conditional_1_Template");
function RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Conditional_0_Template, 1, 1)(1, RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Conditional_1_Template, 1, 1);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(item_r2.branchId ? 0 : 1);
  }
}
__name(RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Template, "RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Template");
function RemoteWorkPolicyListComponent_ng_template_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatQuotas(item_r2), " ");
  }
}
__name(RemoteWorkPolicyListComponent_ng_template_5_Conditional_1_Template, "RemoteWorkPolicyListComponent_ng_template_5_Conditional_1_Template");
function RemoteWorkPolicyListComponent_ng_template_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", item_r2.requiresManagerApproval ? ctx_r2.i18n.t("common.required") : ctx_r2.i18n.t("common.automatic"), " ");
  }
}
__name(RemoteWorkPolicyListComponent_ng_template_5_Conditional_2_Template, "RemoteWorkPolicyListComponent_ng_template_5_Conditional_2_Template");
function RemoteWorkPolicyListComponent_ng_template_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-status-badge", 7);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("status", item_r2.isActive ? "active" : "inactive")("label", item_r2.isActive ? ctx_r2.i18n.t("common.active") : ctx_r2.i18n.t("common.inactive"));
  }
}
__name(RemoteWorkPolicyListComponent_ng_template_5_Conditional_3_Template, "RemoteWorkPolicyListComponent_ng_template_5_Conditional_3_Template");
function RemoteWorkPolicyListComponent_ng_template_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const item_r2 = ctx_r3.$implicit;
    const column_r5 = ctx_r3.column;
    \u0275\u0275textInterpolate1(" ", item_r2[column_r5.key], " ");
  }
}
__name(RemoteWorkPolicyListComponent_ng_template_5_Conditional_4_Template, "RemoteWorkPolicyListComponent_ng_template_5_Conditional_4_Template");
function RemoteWorkPolicyListComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RemoteWorkPolicyListComponent_ng_template_5_Conditional_0_Template, 2, 1)(1, RemoteWorkPolicyListComponent_ng_template_5_Conditional_1_Template, 1, 1)(2, RemoteWorkPolicyListComponent_ng_template_5_Conditional_2_Template, 1, 1)(3, RemoteWorkPolicyListComponent_ng_template_5_Conditional_3_Template, 1, 2, "app-status-badge", 7)(4, RemoteWorkPolicyListComponent_ng_template_5_Conditional_4_Template, 1, 1);
  }
  if (rf & 2) {
    const column_r5 = ctx.column;
    \u0275\u0275conditional(column_r5.key === "branchName" ? 0 : column_r5.key === "quotas" ? 1 : column_r5.key === "requiresManagerApproval" ? 2 : column_r5.key === "isActive" ? 3 : 4);
  }
}
__name(RemoteWorkPolicyListComponent_ng_template_5_Template, "RemoteWorkPolicyListComponent_ng_template_5_Template");
var _RemoteWorkPolicyListComponent = class _RemoteWorkPolicyListComponent {
  service = inject(RemoteWorkPoliciesService);
  router = inject(Router);
  notification = inject(NotificationService);
  confirmation = inject(ConfirmationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  policyModal;
  policies = signal([], ...ngDevMode ? [{ debugName: "policies" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  // Table configuration
  tableColumns = [
    { key: "branchName", label: this.i18n.t("remoteWork.policy.branch"), sortable: true, width: "20%" },
    { key: "quotas", label: this.i18n.t("remoteWork.policy.quotas"), width: "25%" },
    { key: "requiresManagerApproval", label: this.i18n.t("remoteWork.policy.managerApproval"), width: "20%" },
    { key: "isActive", label: this.i18n.t("common.status"), width: "15%" }
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
      key: "activate",
      label: this.i18n.t("common.activate"),
      icon: "fa-play",
      color: "success",
      condition: /* @__PURE__ */ __name((policy) => !policy.isActive && this.permissionService.has("remoteWork.policy.update"), "condition")
    },
    {
      key: "deactivate",
      label: this.i18n.t("common.deactivate"),
      icon: "fa-pause",
      color: "warning",
      condition: /* @__PURE__ */ __name((policy) => policy.isActive && this.permissionService.has("remoteWork.policy.update"), "condition")
    },
    {
      key: "edit",
      label: this.i18n.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has("remoteWork.policy.update"), "condition")
    },
    {
      key: "delete",
      label: this.i18n.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name((policy) => !policy.isActive && this.permissionService.has("remoteWork.policy.delete"), "condition")
    }
  ];
  ngOnInit() {
    this.loadPolicies();
  }
  loadPolicies() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: /* @__PURE__ */ __name((policies) => {
        this.policies.set(policies);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.notification.error(this.i18n.t("remoteWork.policy.loadError"));
        this.loading.set(false);
      }, "error")
    });
  }
  onView(policy) {
    this.router.navigate(["/settings/remote-work-policy", policy.id, "view"]);
  }
  onEdit(policy) {
    this.router.navigate(["/settings/remote-work-policy", policy.id, "edit"]);
  }
  onDelete(policy) {
    this.confirmation.confirm({
      title: this.i18n.t("remoteWork.policy.deleteConfirm"),
      message: this.i18n.t("remoteWork.policy.deleteMessage"),
      confirmText: this.i18n.t("common.yes"),
      cancelText: this.i18n.t("common.no")
    }).then((result) => {
      if (result.confirmed) {
        this.service.delete(policy.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notification.success(this.i18n.t("remoteWork.policy.success.deleted"));
            this.loadPolicies();
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notification.error(this.i18n.t("remoteWork.policy.errors.delete_failed"));
          }, "error")
        });
      }
    });
  }
  onActivate(policy) {
    this.confirmation.confirm({
      title: this.i18n.t("remoteWork.policy.activate_policy"),
      message: this.i18n.t("remoteWork.policy.confirm_activate"),
      confirmText: this.i18n.t("common.activate"),
      cancelText: this.i18n.t("common.cancel"),
      confirmButtonClass: "btn-success",
      icon: "fa-play",
      iconClass: "text-success"
    }).then((result) => {
      if (result.confirmed) {
        this.service.toggleStatus(policy.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notification.success(this.i18n.t("remoteWork.policy.success.activated"));
            this.loadPolicies();
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notification.error(this.i18n.t("remoteWork.policy.errors.toggle_failed"));
          }, "error")
        });
      }
    });
  }
  onDeactivate(policy) {
    this.confirmation.confirm({
      title: this.i18n.t("remoteWork.policy.deactivate_policy"),
      message: this.i18n.t("remoteWork.policy.confirm_deactivate"),
      confirmText: this.i18n.t("common.deactivate"),
      cancelText: this.i18n.t("common.cancel"),
      confirmButtonClass: "btn-warning",
      icon: "fa-pause",
      iconClass: "text-warning"
    }).then((result) => {
      if (result.confirmed) {
        this.service.toggleStatus(policy.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notification.success(this.i18n.t("remoteWork.policy.success.deactivated"));
            this.loadPolicies();
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notification.error(this.i18n.t("remoteWork.policy.errors.toggle_failed"));
          }, "error")
        });
      }
    });
  }
  onCreate() {
    this.router.navigate(["/settings/remote-work-policy/create"]);
  }
  onPolicyCreated() {
    this.loadPolicies();
  }
  onPolicyUpdated() {
    this.loadPolicies();
  }
  // Handle table action events
  onTableAction(event) {
    switch (event.action) {
      case "view":
        this.onView(event.item);
        break;
      case "activate":
        this.onActivate(event.item);
        break;
      case "deactivate":
        this.onDeactivate(event.item);
        break;
      case "edit":
        this.onEdit(event.item);
        break;
      case "delete":
        this.onDelete(event.item);
        break;
    }
  }
  // Format quotas for display
  formatQuotas(item) {
    const quotas = [];
    if (item.maxDaysPerWeek)
      quotas.push(`${item.maxDaysPerWeek}/${this.i18n.t("common.week")}`);
    if (item.maxDaysPerMonth)
      quotas.push(`${item.maxDaysPerMonth}/${this.i18n.t("common.month")}`);
    if (item.maxDaysPerYear)
      quotas.push(`${item.maxDaysPerYear}/${this.i18n.t("common.year")}`);
    return quotas.length > 0 ? quotas.join(", ") : "-";
  }
};
__name(_RemoteWorkPolicyListComponent, "RemoteWorkPolicyListComponent");
__publicField(_RemoteWorkPolicyListComponent, "\u0275fac", /* @__PURE__ */ __name(function RemoteWorkPolicyListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RemoteWorkPolicyListComponent)();
}, "RemoteWorkPolicyListComponent_Factory"));
__publicField(_RemoteWorkPolicyListComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RemoteWorkPolicyListComponent, selectors: [["app-remote-work-policy-list"]], viewQuery: /* @__PURE__ */ __name(function RemoteWorkPolicyListComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(RemoteWorkPolicyModalComponent, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.policyModal = _t.first);
  }
}, "RemoteWorkPolicyListComponent_Query"), decls: 8, vars: 12, consts: [["cellTemplate", ""], [1, "app-list-page"], [3, "title"], ["moduleName", "remote-work-policy", 3, "add", "refresh", "refreshing"], [3, "title", "showHeader", "bodyClass"], [3, "actionClick", "data", "columns", "actions", "loading", "emptyTitle", "emptyMessage"], [3, "policyCreated", "policyUpdated"], [3, "status", "label"]], template: /* @__PURE__ */ __name(function RemoteWorkPolicyListComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-page-header", 2);
    \u0275\u0275elementStart(2, "app-unified-filter", 3);
    \u0275\u0275listener("add", /* @__PURE__ */ __name(function RemoteWorkPolicyListComponent_Template_app_unified_filter_add_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onCreate());
    }, "RemoteWorkPolicyListComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function RemoteWorkPolicyListComponent_Template_app_unified_filter_refresh_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.loadPolicies());
    }, "RemoteWorkPolicyListComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-section-card", 4)(4, "app-data-table", 5);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function RemoteWorkPolicyListComponent_Template_app_data_table_actionClick_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onTableAction($event));
    }, "RemoteWorkPolicyListComponent_Template_app_data_table_actionClick_4_listener"));
    \u0275\u0275template(5, RemoteWorkPolicyListComponent_ng_template_5_Template, 5, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "app-remote-work-policy-modal", 6);
    \u0275\u0275listener("policyCreated", /* @__PURE__ */ __name(function RemoteWorkPolicyListComponent_Template_app_remote_work_policy_modal_policyCreated_7_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPolicyCreated());
    }, "RemoteWorkPolicyListComponent_Template_app_remote_work_policy_modal_policyCreated_7_listener"))("policyUpdated", /* @__PURE__ */ __name(function RemoteWorkPolicyListComponent_Template_app_remote_work_policy_modal_policyUpdated_7_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPolicyUpdated());
    }, "RemoteWorkPolicyListComponent_Template_app_remote_work_policy_modal_policyUpdated_7_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("remoteWork.policy.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("remoteWork.policy.title"))("showHeader", false)("bodyClass", "p-0");
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx.policies() || \u0275\u0275pureFunction0(11, _c02))("columns", ctx.tableColumns)("actions", ctx.tableActions)("loading", ctx.loading)("emptyTitle", ctx.i18n.t("remoteWork.policy.noData"))("emptyMessage", ctx.i18n.t("remoteWork.policy.noDataMessage"));
  }
}, "RemoteWorkPolicyListComponent_Template"), dependencies: [
  RemoteWorkPolicyModalComponent,
  DataTableComponent,
  PageHeaderComponent,
  StatusBadgeComponent,
  UnifiedFilterComponent,
  SectionCardComponent
], styles: ["\n\n/*# sourceMappingURL=remote-work-policy-list.component.css.map */"] }));
var RemoteWorkPolicyListComponent = _RemoteWorkPolicyListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RemoteWorkPolicyListComponent, [{
    type: Component,
    args: [{ selector: "app-remote-work-policy-list", standalone: true, imports: [
      RemoteWorkPolicyModalComponent,
      DataTableComponent,
      PageHeaderComponent,
      StatusBadgeComponent,
      UnifiedFilterComponent,
      SectionCardComponent
    ], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="i18n.t('remoteWork.policy.title')">\r
  </app-page-header>\r
\r
  <!-- Unified Filter Component -->\r
  <app-unified-filter\r
    moduleName="remote-work-policy"\r
    [refreshing]="loading()"\r
    (add)="onCreate()"\r
    (refresh)="loadPolicies()">\r
  </app-unified-filter>\r
\r
  <!-- Remote Work Policies Table -->\r
  <app-section-card\r
    [title]="i18n.t('remoteWork.policy.title')"\r
    [showHeader]="false"\r
    [bodyClass]="'p-0'">\r
    <app-data-table\r
      [data]="policies() || []"\r
      [columns]="tableColumns"\r
      [actions]="tableActions"\r
      [loading]="loading"\r
      [emptyTitle]="i18n.t('remoteWork.policy.noData')"\r
      [emptyMessage]="i18n.t('remoteWork.policy.noDataMessage')"\r
      (actionClick)="onTableAction($event)">\r
      <!-- Custom cell template -->\r
      <ng-template #cellTemplate let-item let-column="column">\r
        @if (column.key === 'branchName') {\r
          @if (item.branchId) {\r
            {{ item.branchName || 'Branch ' + item.branchId }}\r
          } @else {\r
            {{ i18n.t('remoteWork.policy.company_wide') }}\r
          }\r
        } @else if (column.key === 'quotas') {\r
          {{ formatQuotas(item) }}\r
        } @else if (column.key === 'requiresManagerApproval') {\r
          {{ item.requiresManagerApproval ? i18n.t('common.required') : i18n.t('common.automatic') }}\r
        } @else if (column.key === 'isActive') {\r
          <app-status-badge\r
            [status]="item.isActive ? 'active' : 'inactive'"\r
            [label]="item.isActive ? i18n.t('common.active') : i18n.t('common.inactive')">\r
          </app-status-badge>\r
        } @else {\r
          {{ item[column.key] }}\r
        }\r
      </ng-template>\r
    </app-data-table>\r
  </app-section-card>\r
\r
  <!-- Policy Modal -->\r
  <app-remote-work-policy-modal\r
    (policyCreated)="onPolicyCreated()"\r
    (policyUpdated)="onPolicyUpdated()"\r
  />\r
</div>\r
`, styles: ["/* src/app/pages/settings/remote-work-policy/remote-work-policy-list/remote-work-policy-list.component.css */\n/*# sourceMappingURL=remote-work-policy-list.component.css.map */\n"] }]
  }], null, { policyModal: [{
    type: ViewChild,
    args: [RemoteWorkPolicyModalComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RemoteWorkPolicyListComponent, { className: "RemoteWorkPolicyListComponent", filePath: "src/app/pages/settings/remote-work-policy/remote-work-policy-list/remote-work-policy-list.component.ts", lineNumber: 31 });
})();
export {
  RemoteWorkPolicyListComponent
};
//# sourceMappingURL=chunk-IRLI62UQ.js.map
