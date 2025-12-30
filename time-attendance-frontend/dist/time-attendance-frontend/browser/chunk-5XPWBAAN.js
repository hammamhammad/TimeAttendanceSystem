import {
  WorkflowsService
} from "./chunk-T4XJ6ZDA.js";
import {
  SearchableSelectComponent
} from "./chunk-YPZLTOXZ.js";
import {
  BranchesService
} from "./chunk-VA62FO4C.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  FormsModule,
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
  Router,
  RouterLink
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
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/workflows/workflow-form/workflow-form.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
function WorkflowFormComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 7)(2, "div", 8)(3, "span", 9);
    \u0275\u0275text(4, "Loading...");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.t("app.loading"));
  }
}
__name(WorkflowFormComponent_Conditional_7_Template, "WorkflowFormComponent_Conditional_7_Template");
function WorkflowFormComponent_Conditional_8_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.name_required"));
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_13_Template, "WorkflowFormComponent_Conditional_8_Conditional_13_Template");
function WorkflowFormComponent_Conditional_8_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r3 = ctx.$implicit;
    \u0275\u0275property("value", type_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r3.label);
  }
}
__name(WorkflowFormComponent_Conditional_8_For_25_Template, "WorkflowFormComponent_Conditional_8_For_25_Template");
function WorkflowFormComponent_Conditional_8_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function WorkflowFormComponent_Conditional_8_Conditional_53_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addStep());
    }, "WorkflowFormComponent_Conditional_8_Conditional_53_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.add_step"), " ");
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_53_Template, "WorkflowFormComponent_Conditional_8_Conditional_53_Template");
function WorkflowFormComponent_Conditional_8_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.no_steps"), " ");
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_55_Template, "WorkflowFormComponent_Conditional_8_Conditional_55_Template");
function WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    let tmp_14_0;
    const step_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" : ", (tmp_14_0 = step_r5.get("name")) == null ? null : tmp_14_0.value, " ");
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_4_Template, "WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_4_Template");
function WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "button", 57);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const \u0275$index_135_r7 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.moveStepUp(\u0275$index_135_r7));
    }, "WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template_button_click_1_listener"));
    \u0275\u0275element(2, "i", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 57);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const \u0275$index_135_r7 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.moveStepDown(\u0275$index_135_r7));
    }, "WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template_button_click_3_listener"));
    \u0275\u0275element(4, "i", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 60);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const \u0275$index_135_r7 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeStep(\u0275$index_135_r7));
    }, "WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template_button_click_5_listener"));
    \u0275\u0275element(6, "i", 61);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const \u0275$index_135_r7 = \u0275\u0275nextContext().$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("title", \u0275\u0275interpolate(ctx_r0.t("workflows.move_up")))("disabled", \u0275$index_135_r7 === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", \u0275\u0275interpolate(ctx_r0.t("workflows.move_down")))("disabled", \u0275$index_135_r7 === ctx_r0.stepsArray.length - 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", \u0275\u0275interpolate(ctx_r0.t("workflows.remove_step")));
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template, "WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template");
function WorkflowFormComponent_Conditional_8_Conditional_56_For_2_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r8 = ctx.$implicit;
    \u0275\u0275property("value", type_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r8.label);
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_56_For_2_For_25_Template, "WorkflowFormComponent_Conditional_8_Conditional_56_For_2_For_25_Template");
function WorkflowFormComponent_Conditional_8_Conditional_56_For_2_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r9 = ctx.$implicit;
    \u0275\u0275property("value", type_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r9.label);
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_56_For_2_For_33_Template, "WorkflowFormComponent_Conditional_8_Conditional_56_For_2_For_33_Template");
function WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44)(2, "span", 45);
    \u0275\u0275text(3);
    \u0275\u0275conditionalCreate(4, WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_4_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Conditional_5_Template, 7, 8, "div", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 15)(7, "div", 16)(8, "div", 17)(9, "label", 18);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span", 19);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(13, "input", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 17)(15, "label", 18);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 17)(19, "label", 18);
    \u0275\u0275text(20);
    \u0275\u0275elementStart(21, "span", 19);
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "select", 47);
    \u0275\u0275repeaterCreate(24, WorkflowFormComponent_Conditional_8_Conditional_56_For_2_For_25_Template, 2, 2, "option", 24, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 17)(27, "label", 18);
    \u0275\u0275text(28);
    \u0275\u0275elementStart(29, "span", 19);
    \u0275\u0275text(30, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "select", 48);
    \u0275\u0275repeaterCreate(32, WorkflowFormComponent_Conditional_8_Conditional_56_For_2_For_33_Template, 2, 2, "option", 24, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 17)(35, "label", 18);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275element(37, "input", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 17)(39, "label", 18);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "textarea", 50);
    \u0275\u0275text(42, "                        ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 30)(44, "div", 16)(45, "div", 51)(46, "div", 52);
    \u0275\u0275element(47, "input", 53);
    \u0275\u0275elementStart(48, "label", 54);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "div", 51)(51, "div", 52);
    \u0275\u0275element(52, "input", 55);
    \u0275\u0275elementStart(53, "label", 54);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "div", 51)(56, "div", 52);
    \u0275\u0275element(57, "input", 56);
    \u0275\u0275elementStart(58, "label", 54);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const step_r5 = ctx.$implicit;
    const \u0275$index_135_r7 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("formGroupName", \u0275$index_135_r7);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r0.t("workflows.step"), " ", \u0275$index_135_r7 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_15_0 = step_r5.get("name")) == null ? null : tmp_15_0.value) ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isViewMode() ? 5 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.step_name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isStepFieldInvalid(\u0275$index_135_r7, "name"));
    \u0275\u0275property("placeholder", ctx_r0.t("workflows.step_name_placeholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.step_name_ar"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.t("workflows.step_name_ar_placeholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.step_type"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.stepTypes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.approver_type"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.approverTypes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.timeout_hours"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.t("workflows.timeout_hours_placeholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.approver_instructions"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.t("workflows.approver_instructions_placeholder"));
    \u0275\u0275advance(6);
    \u0275\u0275property("id", "allowDelegation_" + \u0275$index_135_r7);
    \u0275\u0275advance();
    \u0275\u0275property("for", "allowDelegation_" + \u0275$index_135_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.allow_delegation"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "notifyOnAction_" + \u0275$index_135_r7);
    \u0275\u0275advance();
    \u0275\u0275property("for", "notifyOnAction_" + \u0275$index_135_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.notify_on_action"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "requireCommentsOnReject_" + \u0275$index_135_r7);
    \u0275\u0275advance();
    \u0275\u0275property("for", "requireCommentsOnReject_" + \u0275$index_135_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.require_comments_reject"), " ");
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Template, "WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Template");
function WorkflowFormComponent_Conditional_8_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275repeaterCreate(1, WorkflowFormComponent_Conditional_8_Conditional_56_For_2_Template, 60, 26, "div", 43, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.stepsArray.controls);
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_56_Template, "WorkflowFormComponent_Conditional_8_Conditional_56_Template");
function WorkflowFormComponent_Conditional_8_Conditional_57_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 64);
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_57_Conditional_4_Template, "WorkflowFormComponent_Conditional_8_Conditional_57_Conditional_4_Template");
function WorkflowFormComponent_Conditional_8_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "button", 62);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function WorkflowFormComponent_Conditional_8_Conditional_57_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "WorkflowFormComponent_Conditional_8_Conditional_57_Template_button_click_1_listener"));
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 63);
    \u0275\u0275conditionalCreate(4, WorkflowFormComponent_Conditional_8_Conditional_57_Conditional_4_Template, 1, 0, "span", 64);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isEditMode() ? ctx_r0.t("common.update") : ctx_r0.t("common.create"), " ");
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_57_Template, "WorkflowFormComponent_Conditional_8_Conditional_57_Template");
function WorkflowFormComponent_Conditional_8_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "button", 65);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function WorkflowFormComponent_Conditional_8_Conditional_58_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "WorkflowFormComponent_Conditional_8_Conditional_58_Template_button_click_1_listener"));
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.back"), " ");
  }
}
__name(WorkflowFormComponent_Conditional_8_Conditional_58_Template, "WorkflowFormComponent_Conditional_8_Conditional_58_Template");
function WorkflowFormComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 11);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function WorkflowFormComponent_Conditional_8_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "WorkflowFormComponent_Conditional_8_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "div", 12)(2, "div", 13)(3, "h5", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 15)(6, "div", 16)(7, "div", 17)(8, "label", 18);
    \u0275\u0275text(9);
    \u0275\u0275elementStart(10, "span", 19);
    \u0275\u0275text(11, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(12, "input", 20);
    \u0275\u0275conditionalCreate(13, WorkflowFormComponent_Conditional_8_Conditional_13_Template, 2, 1, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 17)(15, "label", 18);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 17)(19, "label", 18);
    \u0275\u0275text(20);
    \u0275\u0275elementStart(21, "span", 19);
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "select", 23);
    \u0275\u0275repeaterCreate(24, WorkflowFormComponent_Conditional_8_For_25_Template, 2, 2, "option", 24, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 17)(27, "label", 18);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "app-searchable-select", 25);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function WorkflowFormComponent_Conditional_8_Template_app_searchable_select_selectionChange_29_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBranchSelectionChange($event));
    }, "WorkflowFormComponent_Conditional_8_Template_app_searchable_select_selectionChange_29_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "small", 26);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 27)(33, "label", 18);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "textarea", 28);
    \u0275\u0275text(36, "              ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 27)(38, "label", 18);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "textarea", 29);
    \u0275\u0275text(41, "              ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 30)(43, "div", 31);
    \u0275\u0275element(44, "input", 32);
    \u0275\u0275elementStart(45, "label", 33);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "small", 34);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(49, "div", 12)(50, "div", 35)(51, "h5", 14);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(53, WorkflowFormComponent_Conditional_8_Conditional_53_Template, 3, 1, "button", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 15);
    \u0275\u0275conditionalCreate(55, WorkflowFormComponent_Conditional_8_Conditional_55_Template, 2, 1, "div", 37)(56, WorkflowFormComponent_Conditional_8_Conditional_56_Template, 3, 0, "div", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(57, WorkflowFormComponent_Conditional_8_Conditional_57_Template, 6, 5, "div", 39)(58, WorkflowFormComponent_Conditional_8_Conditional_58_Template, 3, 1, "div", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_14_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.basic_info"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("name"));
    \u0275\u0275property("placeholder", ctx_r0.t("workflows.name_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("name") ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.name_ar"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.t("workflows.name_ar_placeholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.entity_type"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("entityType"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.entityTypes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.branch"));
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx_r0.branchSelectOptions())("value", ((tmp_14_0 = ctx_r0.form.get("branchId")) == null ? null : tmp_14_0.value == null ? null : tmp_14_0.value.toString()) || "")("placeholder", ctx_r0.t("workflows.branch_placeholder"))("searchable", true)("clearable", true)("disabled", ctx_r0.isViewMode());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.branch_hint"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.description"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.t("workflows.description_placeholder"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.description_ar"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.t("workflows.description_ar_placeholder"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("workflows.is_default"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.is_default_hint"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.steps"));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isViewMode() ? 53 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.stepsArray.length === 0 ? 55 : 56);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r0.isViewMode() ? 57 : 58);
  }
}
__name(WorkflowFormComponent_Conditional_8_Template, "WorkflowFormComponent_Conditional_8_Template");
var _WorkflowFormComponent = class _WorkflowFormComponent {
  workflowsService = inject(WorkflowsService);
  branchesService = inject(BranchesService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Component state
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  isEditMode = signal(false, ...ngDevMode ? [{ debugName: "isEditMode" }] : []);
  isViewMode = signal(false, ...ngDevMode ? [{ debugName: "isViewMode" }] : []);
  workflowId = signal(null, ...ngDevMode ? [{ debugName: "workflowId" }] : []);
  workflow = signal(null, ...ngDevMode ? [{ debugName: "workflow" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  // Branch select options for searchable select
  branchSelectOptions = computed(() => {
    return this.branches().map((branch) => ({
      value: branch.id.toString(),
      label: branch.name
    }));
  }, ...ngDevMode ? [{ debugName: "branchSelectOptions" }] : []);
  // Form
  form;
  // Dropdown options
  entityTypes = this.workflowsService.getEntityTypes();
  stepTypes = [
    { value: "Approval", label: "Approval" },
    { value: "Notification", label: "Notification" },
    { value: "Validation", label: "Validation" },
    { value: "Condition", label: "Condition" }
  ];
  approverTypes = [
    { value: "DirectManager", label: "Direct Manager" },
    { value: "DepartmentHead", label: "Department Head" },
    { value: "Role", label: "Specific Role" },
    { value: "SpecificUser", label: "Specific User" }
  ];
  // Page title
  pageTitle = computed(() => {
    if (this.isViewMode())
      return this.t("workflows.view_workflow");
    if (this.isEditMode())
      return this.t("workflows.edit_workflow");
    return this.t("workflows.create_workflow");
  }, ...ngDevMode ? [{ debugName: "pageTitle" }] : []);
  ngOnInit() {
    this.initForm();
    this.loadBranches();
    this.checkRouteParams();
  }
  t(key) {
    return this.i18n.t(key);
  }
  initForm() {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(255)]],
      nameAr: ["", [Validators.maxLength(255)]],
      description: ["", [Validators.maxLength(1e3)]],
      descriptionAr: ["", [Validators.maxLength(1e3)]],
      entityType: ["Vacation", Validators.required],
      branchId: [null],
      isDefault: [false],
      steps: this.fb.array([])
    });
  }
  loadBranches() {
    this.branchesService.getBranchesForDropdown().subscribe({
      next: /* @__PURE__ */ __name((branches) => {
        this.branches.set(branches);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
      }, "error")
    });
  }
  onBranchSelectionChange(value) {
    const branchId = value ? parseInt(value, 10) : null;
    this.form.patchValue({ branchId });
  }
  get stepsArray() {
    return this.form.get("steps");
  }
  checkRouteParams() {
    const id = this.route.snapshot.paramMap.get("id");
    const path = this.route.snapshot.url.map((s) => s.path).join("/");
    if (id) {
      this.workflowId.set(parseInt(id, 10));
      if (path.includes("view")) {
        this.isViewMode.set(true);
      } else if (path.includes("edit")) {
        this.isEditMode.set(true);
      }
      this.loadWorkflow();
    } else {
      this.addStep();
    }
  }
  loadWorkflow() {
    const id = this.workflowId();
    if (!id)
      return;
    this.loading.set(true);
    this.workflowsService.getWorkflowDefinitionById(id).subscribe({
      next: /* @__PURE__ */ __name((workflow) => {
        this.workflow.set(workflow);
        this.populateForm(workflow);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load workflow:", error);
        this.loading.set(false);
        this.notificationService.error(this.t("app.error"), this.t("workflows.load_error"));
        this.router.navigate(["/settings/workflows"]);
      }, "error")
    });
  }
  populateForm(workflow) {
    this.form.patchValue({
      name: workflow.name,
      nameAr: workflow.nameAr,
      description: workflow.description,
      descriptionAr: workflow.descriptionAr,
      entityType: workflow.entityType,
      branchId: workflow.branchId,
      isDefault: workflow.isDefault
    });
    while (this.stepsArray.length) {
      this.stepsArray.removeAt(0);
    }
    workflow.steps.sort((a, b) => a.stepOrder - b.stepOrder).forEach((step) => this.addStep(step));
    if (this.isViewMode()) {
      this.form.disable();
    }
  }
  addStep(step) {
    const stepGroup = this.fb.group({
      stepOrder: [step?.stepOrder ?? this.stepsArray.length + 1],
      name: [step?.name ?? "", [Validators.required, Validators.maxLength(255)]],
      nameAr: [step?.nameAr ?? "", [Validators.maxLength(255)]],
      stepType: [step?.stepType ?? "Approval", Validators.required],
      approverType: [step?.approverType ?? "DirectManager", Validators.required],
      approverRoleId: [step?.approverRoleId],
      approverUserId: [step?.approverUserId],
      conditionJson: [step?.conditionJson],
      timeoutHours: [step?.timeoutHours],
      allowDelegation: [step?.allowDelegation ?? true],
      notifyOnAction: [step?.notifyOnAction ?? true],
      notifyRequesterOnReach: [step?.notifyRequesterOnReach ?? true],
      approverInstructions: [step?.approverInstructions],
      approverInstructionsAr: [step?.approverInstructionsAr],
      requireCommentsOnApprove: [step?.requireCommentsOnApprove ?? false],
      requireCommentsOnReject: [step?.requireCommentsOnReject ?? true]
    });
    this.stepsArray.push(stepGroup);
  }
  removeStep(index) {
    this.stepsArray.removeAt(index);
    this.stepsArray.controls.forEach((control, i) => {
      control.patchValue({ stepOrder: i + 1 });
    });
  }
  moveStepUp(index) {
    if (index === 0)
      return;
    const steps = this.stepsArray;
    const current = steps.at(index);
    steps.removeAt(index);
    steps.insert(index - 1, current);
    steps.controls.forEach((control, i) => {
      control.patchValue({ stepOrder: i + 1 });
    });
  }
  moveStepDown(index) {
    if (index === this.stepsArray.length - 1)
      return;
    const steps = this.stepsArray;
    const current = steps.at(index);
    steps.removeAt(index);
    steps.insert(index + 1, current);
    steps.controls.forEach((control, i) => {
      control.patchValue({ stepOrder: i + 1 });
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.warning(this.t("app.validationError"), this.t("app.checkForm"));
      return;
    }
    this.saving.set(true);
    const formValue = this.form.value;
    const steps = formValue.steps.map((step) => ({
      stepOrder: step.stepOrder,
      name: step.name,
      nameAr: step.nameAr || void 0,
      stepType: step.stepType,
      approverType: step.approverType,
      approverRoleId: step.approverRoleId || void 0,
      approverUserId: step.approverUserId || void 0,
      conditionJson: step.conditionJson || void 0,
      timeoutHours: step.timeoutHours || void 0,
      allowDelegation: step.allowDelegation,
      notifyOnAction: step.notifyOnAction,
      notifyRequesterOnReach: step.notifyRequesterOnReach,
      approverInstructions: step.approverInstructions || void 0,
      approverInstructionsAr: step.approverInstructionsAr || void 0,
      requireCommentsOnApprove: step.requireCommentsOnApprove,
      requireCommentsOnReject: step.requireCommentsOnReject
    }));
    if (this.isEditMode() && this.workflowId()) {
      const request = {
        name: formValue.name,
        nameAr: formValue.nameAr || void 0,
        description: formValue.description || void 0,
        descriptionAr: formValue.descriptionAr || void 0,
        isDefault: formValue.isDefault,
        steps
      };
      this.workflowsService.updateWorkflowDefinition(this.workflowId(), request).subscribe({
        next: /* @__PURE__ */ __name(() => {
          this.saving.set(false);
          this.notificationService.success(this.t("app.success"), this.t("workflows.update_success"));
          this.router.navigate(["/settings/workflows"]);
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Failed to update workflow:", error);
          this.saving.set(false);
          this.notificationService.error(this.t("app.error"), this.t("workflows.update_error"));
        }, "error")
      });
    } else {
      const request = {
        name: formValue.name,
        nameAr: formValue.nameAr || void 0,
        description: formValue.description || void 0,
        descriptionAr: formValue.descriptionAr || void 0,
        entityType: formValue.entityType,
        branchId: formValue.branchId || void 0,
        isDefault: formValue.isDefault,
        steps
      };
      this.workflowsService.createWorkflowDefinition(request).subscribe({
        next: /* @__PURE__ */ __name(() => {
          this.saving.set(false);
          this.notificationService.success(this.t("app.success"), this.t("workflows.create_success"));
          this.router.navigate(["/settings/workflows"]);
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Failed to create workflow:", error);
          this.saving.set(false);
          this.notificationService.error(this.t("app.error"), this.t("workflows.create_error"));
        }, "error")
      });
    }
  }
  onCancel() {
    this.router.navigate(["/settings/workflows"]);
  }
  isFieldInvalid(fieldName) {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
  isStepFieldInvalid(stepIndex, fieldName) {
    const step = this.stepsArray.at(stepIndex);
    const field = step?.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
};
__name(_WorkflowFormComponent, "WorkflowFormComponent");
__publicField(_WorkflowFormComponent, "\u0275fac", /* @__PURE__ */ __name(function WorkflowFormComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _WorkflowFormComponent)();
}, "WorkflowFormComponent_Factory"));
__publicField(_WorkflowFormComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WorkflowFormComponent, selectors: [["app-workflow-form"]], decls: 9, vars: 3, consts: [[1, "container-fluid", "py-4"], [1, "d-flex", "align-items-center", "mb-4"], ["type", "button", "routerLink", "/settings/workflows", 1, "btn", "btn-outline-secondary", "me-3"], [1, "fa-solid", "fa-arrow-left", "me-1"], [1, "h3", "mb-0"], [1, "card"], [3, "formGroup"], [1, "card-body", "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-3", "text-muted"], [3, "ngSubmit", "formGroup"], [1, "card", "mb-4"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "card-body"], [1, "row"], [1, "col-md-6", "mb-3"], [1, "form-label"], [1, "text-danger"], ["type", "text", "formControlName", "name", 1, "form-control", 3, "placeholder"], [1, "invalid-feedback"], ["type", "text", "formControlName", "nameAr", "dir", "rtl", 1, "form-control", 3, "placeholder"], ["formControlName", "entityType", 1, "form-select"], [3, "value"], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable", "disabled"], [1, "text-muted"], [1, "col-12", "mb-3"], ["formControlName", "description", "rows", "2", 1, "form-control", 3, "placeholder"], ["formControlName", "descriptionAr", "rows", "2", "dir", "rtl", 1, "form-control", 3, "placeholder"], [1, "col-12"], [1, "form-check"], ["type", "checkbox", "id", "isDefault", "formControlName", "isDefault", 1, "form-check-input"], ["for", "isDefault", 1, "form-check-label"], [1, "d-block", "text-muted"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], ["type", "button", 1, "btn", "btn-sm", "btn-primary"], [1, "alert", "alert-info"], ["formArrayName", "steps"], [1, "d-flex", "justify-content-end", "gap-2"], [1, "d-flex", "justify-content-end"], ["type", "button", 1, "btn", "btn-sm", "btn-primary", 3, "click"], [1, "fa-solid", "fa-plus", "me-1"], [1, "card", "mb-3", "border-primary", 3, "formGroupName"], [1, "card-header", "bg-primary", "bg-opacity-10", "d-flex", "justify-content-between", "align-items-center"], [1, "fw-bold"], [1, "btn-group", "btn-group-sm"], ["formControlName", "stepType", 1, "form-select"], ["formControlName", "approverType", 1, "form-select"], ["type", "number", "formControlName", "timeoutHours", "min", "0", 1, "form-control", 3, "placeholder"], ["formControlName", "approverInstructions", "rows", "2", 1, "form-control", 3, "placeholder"], [1, "col-md-4"], [1, "form-check", "mb-2"], ["type", "checkbox", "formControlName", "allowDelegation", 1, "form-check-input", 3, "id"], [1, "form-check-label", 3, "for"], ["type", "checkbox", "formControlName", "notifyOnAction", 1, "form-check-input", 3, "id"], ["type", "checkbox", "formControlName", "requireCommentsOnReject", 1, "form-check-input", 3, "id"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled", "title"], [1, "fa-solid", "fa-arrow-up"], [1, "fa-solid", "fa-arrow-down"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "title"], [1, "fa-solid", "fa-trash"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-1"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"]], template: /* @__PURE__ */ __name(function WorkflowFormComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
    \u0275\u0275element(3, "i", 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1", 4);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, WorkflowFormComponent_Conditional_7_Template, 7, 1, "div", 5)(8, WorkflowFormComponent_Conditional_8_Template, 59, 30, "form", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.back"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.pageTitle());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 7 : 8);
  }
}, "WorkflowFormComponent_Template"), dependencies: [
  FormsModule,
  \u0275NgNoValidate,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DefaultValueAccessor,
  NumberValueAccessor,
  CheckboxControlValueAccessor,
  SelectControlValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  MinValidator,
  ReactiveFormsModule,
  FormGroupDirective,
  FormControlName,
  FormGroupName,
  FormArrayName,
  RouterLink,
  SearchableSelectComponent
], styles: ["\n\n.card.border-primary[_ngcontent-%COMP%] {\n  border-width: 2px;\n}\n.card-header.bg-primary.bg-opacity-10[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(var(--bs-primary-rgb), 0.2);\n}\n.fw-bold[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.form-label[_ngcontent-%COMP%]   .text-danger[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n}\n.form-check[_ngcontent-%COMP%] {\n  padding-top: 0.25rem;\n}\ntextarea.form-control[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 60px;\n}\nsmall.text-muted[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n@media (max-width: 768px) {\n  .btn-group-sm[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .col-md-4[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%] {\n    margin-bottom: 0.75rem;\n  }\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.d-flex.justify-content-end.gap-2[_ngcontent-%COMP%] {\n  padding-top: 1rem;\n}\n/*# sourceMappingURL=workflow-form.component.css.map */"] }));
var WorkflowFormComponent = _WorkflowFormComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkflowFormComponent, [{
    type: Component,
    args: [{ selector: "app-workflow-form", standalone: true, imports: [
      FormsModule,
      ReactiveFormsModule,
      RouterLink,
      SearchableSelectComponent
    ], template: `<div class="container-fluid py-4">\r
  <!-- Page Header with Back Button -->\r
  <div class="d-flex align-items-center mb-4">\r
    <button\r
      type="button"\r
      class="btn btn-outline-secondary me-3"\r
      routerLink="/settings/workflows">\r
      <i class="fa-solid fa-arrow-left me-1"></i>\r
      {{ t('common.back') }}\r
    </button>\r
    <h1 class="h3 mb-0">{{ pageTitle() }}</h1>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="card">\r
      <div class="card-body text-center py-5">\r
        <div class="spinner-border text-primary" role="status">\r
          <span class="visually-hidden">Loading...</span>\r
        </div>\r
        <p class="mt-3 text-muted">{{ t('app.loading') }}</p>\r
      </div>\r
    </div>\r
  } @else {\r
    <form [formGroup]="form" (ngSubmit)="onSubmit()">\r
      <!-- Basic Information Section -->\r
      <div class="card mb-4">\r
        <div class="card-header">\r
          <h5 class="card-title mb-0">{{ t('workflows.basic_info') }}</h5>\r
        </div>\r
        <div class="card-body">\r
          <div class="row">\r
            <div class="col-md-6 mb-3">\r
              <label class="form-label">\r
                {{ t('workflows.name') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <input\r
                type="text"\r
                class="form-control"\r
                formControlName="name"\r
                [class.is-invalid]="isFieldInvalid('name')"\r
                [placeholder]="t('workflows.name_placeholder')">\r
              @if (isFieldInvalid('name')) {\r
                <div class="invalid-feedback">{{ t('workflows.name_required') }}</div>\r
              }\r
            </div>\r
\r
            <div class="col-md-6 mb-3">\r
              <label class="form-label">{{ t('workflows.name_ar') }}</label>\r
              <input\r
                type="text"\r
                class="form-control"\r
                formControlName="nameAr"\r
                dir="rtl"\r
                [placeholder]="t('workflows.name_ar_placeholder')">\r
            </div>\r
\r
            <div class="col-md-6 mb-3">\r
              <label class="form-label">\r
                {{ t('workflows.entity_type') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <select\r
                class="form-select"\r
                formControlName="entityType"\r
                [class.is-invalid]="isFieldInvalid('entityType')">\r
                @for (type of entityTypes; track type.value) {\r
                  <option [value]="type.value">{{ type.label }}</option>\r
                }\r
              </select>\r
            </div>\r
\r
            <div class="col-md-6 mb-3">\r
              <label class="form-label">{{ t('workflows.branch') }}</label>\r
              <app-searchable-select\r
                [options]="branchSelectOptions()"\r
                [value]="form.get('branchId')?.value?.toString() || ''"\r
                (selectionChange)="onBranchSelectionChange($event)"\r
                [placeholder]="t('workflows.branch_placeholder')"\r
                [searchable]="true"\r
                [clearable]="true"\r
                [disabled]="isViewMode()">\r
              </app-searchable-select>\r
              <small class="text-muted">{{ t('workflows.branch_hint') }}</small>\r
            </div>\r
\r
            <div class="col-12 mb-3">\r
              <label class="form-label">{{ t('workflows.description') }}</label>\r
              <textarea\r
                class="form-control"\r
                formControlName="description"\r
                rows="2"\r
                [placeholder]="t('workflows.description_placeholder')">\r
              </textarea>\r
            </div>\r
\r
            <div class="col-12 mb-3">\r
              <label class="form-label">{{ t('workflows.description_ar') }}</label>\r
              <textarea\r
                class="form-control"\r
                formControlName="descriptionAr"\r
                rows="2"\r
                dir="rtl"\r
                [placeholder]="t('workflows.description_ar_placeholder')">\r
              </textarea>\r
            </div>\r
\r
            <div class="col-12">\r
              <div class="form-check">\r
                <input\r
                  type="checkbox"\r
                  class="form-check-input"\r
                  id="isDefault"\r
                  formControlName="isDefault">\r
                <label class="form-check-label" for="isDefault">\r
                  {{ t('workflows.is_default') }}\r
                </label>\r
                <small class="d-block text-muted">{{ t('workflows.is_default_hint') }}</small>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Workflow Steps Section -->\r
      <div class="card mb-4">\r
        <div class="card-header d-flex justify-content-between align-items-center">\r
          <h5 class="card-title mb-0">{{ t('workflows.steps') }}</h5>\r
          @if (!isViewMode()) {\r
            <button\r
              type="button"\r
              class="btn btn-sm btn-primary"\r
              (click)="addStep()">\r
              <i class="fa-solid fa-plus me-1"></i>\r
              {{ t('workflows.add_step') }}\r
            </button>\r
          }\r
        </div>\r
        <div class="card-body">\r
          @if (stepsArray.length === 0) {\r
            <div class="alert alert-info">\r
              {{ t('workflows.no_steps') }}\r
            </div>\r
          } @else {\r
            <div formArrayName="steps">\r
              @for (step of stepsArray.controls; track $index; let i = $index) {\r
                <div class="card mb-3 border-primary" [formGroupName]="i">\r
                  <div class="card-header bg-primary bg-opacity-10 d-flex justify-content-between align-items-center">\r
                    <span class="fw-bold">\r
                      {{ t('workflows.step') }} {{ i + 1 }}\r
                      @if (step.get('name')?.value) {\r
                        : {{ step.get('name')?.value }}\r
                      }\r
                    </span>\r
                    @if (!isViewMode()) {\r
                      <div class="btn-group btn-group-sm">\r
                        <button\r
                          type="button"\r
                          class="btn btn-outline-secondary"\r
                          [disabled]="i === 0"\r
                          (click)="moveStepUp(i)"\r
                          title="{{ t('workflows.move_up') }}">\r
                          <i class="fa-solid fa-arrow-up"></i>\r
                        </button>\r
                        <button\r
                          type="button"\r
                          class="btn btn-outline-secondary"\r
                          [disabled]="i === stepsArray.length - 1"\r
                          (click)="moveStepDown(i)"\r
                          title="{{ t('workflows.move_down') }}">\r
                          <i class="fa-solid fa-arrow-down"></i>\r
                        </button>\r
                        <button\r
                          type="button"\r
                          class="btn btn-outline-danger"\r
                          (click)="removeStep(i)"\r
                          title="{{ t('workflows.remove_step') }}">\r
                          <i class="fa-solid fa-trash"></i>\r
                        </button>\r
                      </div>\r
                    }\r
                  </div>\r
                  <div class="card-body">\r
                    <div class="row">\r
                      <div class="col-md-6 mb-3">\r
                        <label class="form-label">\r
                          {{ t('workflows.step_name') }}\r
                          <span class="text-danger">*</span>\r
                        </label>\r
                        <input\r
                          type="text"\r
                          class="form-control"\r
                          formControlName="name"\r
                          [class.is-invalid]="isStepFieldInvalid(i, 'name')"\r
                          [placeholder]="t('workflows.step_name_placeholder')">\r
                      </div>\r
\r
                      <div class="col-md-6 mb-3">\r
                        <label class="form-label">{{ t('workflows.step_name_ar') }}</label>\r
                        <input\r
                          type="text"\r
                          class="form-control"\r
                          formControlName="nameAr"\r
                          dir="rtl"\r
                          [placeholder]="t('workflows.step_name_ar_placeholder')">\r
                      </div>\r
\r
                      <div class="col-md-6 mb-3">\r
                        <label class="form-label">\r
                          {{ t('workflows.step_type') }}\r
                          <span class="text-danger">*</span>\r
                        </label>\r
                        <select class="form-select" formControlName="stepType">\r
                          @for (type of stepTypes; track type.value) {\r
                            <option [value]="type.value">{{ type.label }}</option>\r
                          }\r
                        </select>\r
                      </div>\r
\r
                      <div class="col-md-6 mb-3">\r
                        <label class="form-label">\r
                          {{ t('workflows.approver_type') }}\r
                          <span class="text-danger">*</span>\r
                        </label>\r
                        <select class="form-select" formControlName="approverType">\r
                          @for (type of approverTypes; track type.value) {\r
                            <option [value]="type.value">{{ type.label }}</option>\r
                          }\r
                        </select>\r
                      </div>\r
\r
                      <div class="col-md-6 mb-3">\r
                        <label class="form-label">{{ t('workflows.timeout_hours') }}</label>\r
                        <input\r
                          type="number"\r
                          class="form-control"\r
                          formControlName="timeoutHours"\r
                          min="0"\r
                          [placeholder]="t('workflows.timeout_hours_placeholder')">\r
                      </div>\r
\r
                      <div class="col-md-6 mb-3">\r
                        <label class="form-label">{{ t('workflows.approver_instructions') }}</label>\r
                        <textarea\r
                          class="form-control"\r
                          formControlName="approverInstructions"\r
                          rows="2"\r
                          [placeholder]="t('workflows.approver_instructions_placeholder')">\r
                        </textarea>\r
                      </div>\r
\r
                      <div class="col-12">\r
                        <div class="row">\r
                          <div class="col-md-4">\r
                            <div class="form-check mb-2">\r
                              <input\r
                                type="checkbox"\r
                                class="form-check-input"\r
                                [id]="'allowDelegation_' + i"\r
                                formControlName="allowDelegation">\r
                              <label class="form-check-label" [for]="'allowDelegation_' + i">\r
                                {{ t('workflows.allow_delegation') }}\r
                              </label>\r
                            </div>\r
                          </div>\r
                          <div class="col-md-4">\r
                            <div class="form-check mb-2">\r
                              <input\r
                                type="checkbox"\r
                                class="form-check-input"\r
                                [id]="'notifyOnAction_' + i"\r
                                formControlName="notifyOnAction">\r
                              <label class="form-check-label" [for]="'notifyOnAction_' + i">\r
                                {{ t('workflows.notify_on_action') }}\r
                              </label>\r
                            </div>\r
                          </div>\r
                          <div class="col-md-4">\r
                            <div class="form-check mb-2">\r
                              <input\r
                                type="checkbox"\r
                                class="form-check-input"\r
                                [id]="'requireCommentsOnReject_' + i"\r
                                formControlName="requireCommentsOnReject">\r
                              <label class="form-check-label" [for]="'requireCommentsOnReject_' + i">\r
                                {{ t('workflows.require_comments_reject') }}\r
                              </label>\r
                            </div>\r
                          </div>\r
                        </div>\r
                      </div>\r
                    </div>\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
          }\r
        </div>\r
      </div>\r
\r
      <!-- Form Actions -->\r
      @if (!isViewMode()) {\r
        <div class="d-flex justify-content-end gap-2">\r
          <button\r
            type="button"\r
            class="btn btn-secondary"\r
            (click)="onCancel()"\r
            [disabled]="saving()">\r
            {{ t('common.cancel') }}\r
          </button>\r
          <button\r
            type="submit"\r
            class="btn btn-primary"\r
            [disabled]="saving()">\r
            @if (saving()) {\r
              <span class="spinner-border spinner-border-sm me-1"></span>\r
            }\r
            {{ isEditMode() ? t('common.update') : t('common.create') }}\r
          </button>\r
        </div>\r
      } @else {\r
        <div class="d-flex justify-content-end">\r
          <button\r
            type="button"\r
            class="btn btn-secondary"\r
            (click)="onCancel()">\r
            {{ t('common.back') }}\r
          </button>\r
        </div>\r
      }\r
    </form>\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/settings/workflows/workflow-form/workflow-form.component.css */\n.card.border-primary {\n  border-width: 2px;\n}\n.card-header.bg-primary.bg-opacity-10 {\n  border-bottom: 1px solid rgba(var(--bs-primary-rgb), 0.2);\n}\n.fw-bold {\n  font-size: 1rem;\n}\n.form-label {\n  font-weight: 500;\n}\n.form-label .text-danger {\n  font-weight: bold;\n}\n.btn-group-sm .btn {\n  padding: 0.25rem 0.5rem;\n}\n.form-check {\n  padding-top: 0.25rem;\n}\ntextarea.form-control {\n  resize: vertical;\n  min-height: 60px;\n}\nsmall.text-muted {\n  font-size: 0.875rem;\n}\n@media (max-width: 768px) {\n  .btn-group-sm {\n    flex-direction: column;\n  }\n  .col-md-4 .form-check {\n    margin-bottom: 0.75rem;\n  }\n}\n.spinner-border {\n  width: 2rem;\n  height: 2rem;\n}\n.d-flex.justify-content-end.gap-2 {\n  padding-top: 1rem;\n}\n/*# sourceMappingURL=workflow-form.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WorkflowFormComponent, { className: "WorkflowFormComponent", filePath: "src/app/pages/settings/workflows/workflow-form/workflow-form.component.ts", lineNumber: 35 });
})();
export {
  WorkflowFormComponent
};
//# sourceMappingURL=chunk-5XPWBAAN.js.map
