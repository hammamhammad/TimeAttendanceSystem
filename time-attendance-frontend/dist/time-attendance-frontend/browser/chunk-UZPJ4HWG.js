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
  ActivatedRoute,
  CommonModule,
  Component,
  DatePipe,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-54H4HALB.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/overtime/edit-overtime-configuration/edit-overtime-configuration.component.ts
function EditOvertimeConfigurationComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275element(2, "i", 5);
    \u0275\u0275elementStart(3, "p", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("common.loading"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_2_Template, "EditOvertimeConfigurationComponent_Conditional_2_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.currentlyActive"), " ");
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_0_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_0_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "i", 73);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_1_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_1_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "i", 73);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.editActiveWarning"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.editActiveWarningMessage"), " ");
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_2_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_2_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("general"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_32_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_32_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("normalDayRate"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_50_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_50_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("publicHolidayRate"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_63_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_63_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("offDayRate"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_76_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_76_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("maxPreShiftOvertimeHours"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_94_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_94_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("maxPostShiftOvertimeHours"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_105_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_105_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("minimumOvertimeMinutes"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_123_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_123_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_134_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("overtimeGracePeriodMinutes"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_134_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_134_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("roundingIntervalMinutes"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_145_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_145_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "small", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.t("common.lastModified"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.originalConfig.updatedBy, " on ", \u0275\u0275pipeBind2(5, 3, ctx_r0.originalConfig.updatedAtUtc, "medium"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_12_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_12_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.active"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_17_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_17_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.inactive"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_18_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_18_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "h5", 15);
    \u0275\u0275element(3, "i", 74);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 17)(6, "div", 75)(7, "small", 6);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_12_Template, 6, 6, "div", 75);
    \u0275\u0275elementStart(13, "div", 75)(14, "small", 6);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div");
    \u0275\u0275conditionalCreate(17, EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_17_Template, 2, 1, "span", 76)(18, EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Conditional_18_Template, 2, 1, "span", 77);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.configurationInfo"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.t("common.created"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.originalConfig.createdBy, " on ", \u0275\u0275pipeBind2(11, 7, ctx_r0.originalConfig.createdAtUtc, "medium"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.originalConfig.updatedAtUtc ? 12 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.t("settings.overtime.status"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.originalConfig.isActive ? 17 : 18);
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_192_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("effectiveFromDate"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_192_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_192_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_199_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("effectiveToDate"));
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_199_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_199_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_219_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 70);
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_219_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_219_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Conditional_220_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 71);
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Conditional_220_Template, "EditOvertimeConfigurationComponent_Conditional_3_Conditional_220_Template");
function EditOvertimeConfigurationComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, EditOvertimeConfigurationComponent_Conditional_3_Conditional_0_Template, 3, 1, "div", 7);
    \u0275\u0275conditionalCreate(1, EditOvertimeConfigurationComponent_Conditional_3_Conditional_1_Template, 3, 1, "div", 8);
    \u0275\u0275conditionalCreate(2, EditOvertimeConfigurationComponent_Conditional_3_Conditional_2_Template, 5, 2, "div", 9);
    \u0275\u0275elementStart(3, "form", 10, 0);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_form_ngSubmit_3_listener"));
    \u0275\u0275elementStart(5, "div", 11)(6, "div", 12)(7, "div", 13)(8, "div", 14)(9, "h5", 15);
    \u0275\u0275element(10, "i", 16);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 17)(13, "div", 11)(14, "div", 18)(15, "div", 19)(16, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.enablePreShiftOvertime, $event) || (ctx_r0.configForm.enablePreShiftOvertime = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_16_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "label", 21)(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "br");
    \u0275\u0275elementStart(21, "small", 6);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "div", 18)(24, "div", 19)(25, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.enablePostShiftOvertime, $event) || (ctx_r0.configForm.enablePostShiftOvertime = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_25_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "label", 23)(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "br");
    \u0275\u0275elementStart(30, "small", 6);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(32, EditOvertimeConfigurationComponent_Conditional_3_Conditional_32_Template, 2, 1, "div", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 13)(34, "div", 14)(35, "h5", 15);
    \u0275\u0275element(36, "i", 25);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 17)(39, "div", 11)(40, "div", 26)(41, "div", 27)(42, "label", 28);
    \u0275\u0275text(43);
    \u0275\u0275elementStart(44, "span", 29);
    \u0275\u0275text(45, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 30)(47, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.normalDayRate, $event) || (ctx_r0.configForm.normalDayRate = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_47_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 32);
    \u0275\u0275text(49, "x");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(50, EditOvertimeConfigurationComponent_Conditional_3_Conditional_50_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(51, "div", 34);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 26)(54, "div", 27)(55, "label", 35);
    \u0275\u0275text(56);
    \u0275\u0275elementStart(57, "span", 29);
    \u0275\u0275text(58, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 30)(60, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.publicHolidayRate, $event) || (ctx_r0.configForm.publicHolidayRate = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_60_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "span", 32);
    \u0275\u0275text(62, "x");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(63, EditOvertimeConfigurationComponent_Conditional_3_Conditional_63_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(64, "div", 34);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(66, "div", 26)(67, "div", 27)(68, "label", 37);
    \u0275\u0275text(69);
    \u0275\u0275elementStart(70, "span", 29);
    \u0275\u0275text(71, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 30)(73, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_73_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.offDayRate, $event) || (ctx_r0.configForm.offDayRate = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_73_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "span", 32);
    \u0275\u0275text(75, "x");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(76, EditOvertimeConfigurationComponent_Conditional_3_Conditional_76_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(77, "div", 34);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(79, "div", 13)(80, "div", 14)(81, "h5", 15);
    \u0275\u0275element(82, "i", 39);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "div", 17)(85, "div", 11)(86, "div", 18)(87, "div", 27)(88, "label", 40);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "div", 30)(91, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_91_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.maxPreShiftOvertimeHours, $event) || (ctx_r0.configForm.maxPreShiftOvertimeHours = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_91_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "span", 32);
    \u0275\u0275text(93);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(94, EditOvertimeConfigurationComponent_Conditional_3_Conditional_94_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(95, "div", 34);
    \u0275\u0275text(96);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(97, "div", 18)(98, "div", 27)(99, "label", 42);
    \u0275\u0275text(100);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "div", 30)(102, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_102_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.maxPostShiftOvertimeHours, $event) || (ctx_r0.configForm.maxPostShiftOvertimeHours = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_102_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "span", 32);
    \u0275\u0275text(104);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(105, EditOvertimeConfigurationComponent_Conditional_3_Conditional_105_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(106, "div", 34);
    \u0275\u0275text(107);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(108, "div", 13)(109, "div", 14)(110, "h5", 15);
    \u0275\u0275element(111, "i", 44);
    \u0275\u0275text(112);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(113, "div", 17)(114, "div", 11)(115, "div", 26)(116, "div", 27)(117, "label", 45);
    \u0275\u0275text(118);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "div", 30)(120, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_120_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.minimumOvertimeMinutes, $event) || (ctx_r0.configForm.minimumOvertimeMinutes = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_120_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(121, "span", 32);
    \u0275\u0275text(122);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(123, EditOvertimeConfigurationComponent_Conditional_3_Conditional_123_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(124, "div", 34);
    \u0275\u0275text(125);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(126, "div", 26)(127, "div", 27)(128, "label", 47);
    \u0275\u0275text(129);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(130, "div", 30)(131, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_131_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.overtimeGracePeriodMinutes, $event) || (ctx_r0.configForm.overtimeGracePeriodMinutes = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_131_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(132, "span", 32);
    \u0275\u0275text(133);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(134, EditOvertimeConfigurationComponent_Conditional_3_Conditional_134_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(135, "div", 34);
    \u0275\u0275text(136);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(137, "div", 26)(138, "div", 27)(139, "label", 49);
    \u0275\u0275text(140);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(141, "div", 30)(142, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_142_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.roundingIntervalMinutes, $event) || (ctx_r0.configForm.roundingIntervalMinutes = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_142_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(143, "span", 32);
    \u0275\u0275text(144);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(145, EditOvertimeConfigurationComponent_Conditional_3_Conditional_145_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(146, "div", 34);
    \u0275\u0275text(147);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(148, "div", 11)(149, "div", 18)(150, "div", 19)(151, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_151_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.considerFlexibleTime, $event) || (ctx_r0.configForm.considerFlexibleTime = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_151_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(152, "label", 52);
    \u0275\u0275text(153);
    \u0275\u0275element(154, "br");
    \u0275\u0275elementStart(155, "small", 6);
    \u0275\u0275text(156);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(157, "div", 18)(158, "div", 19)(159, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_159_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.weekendAsOffDay, $event) || (ctx_r0.configForm.weekendAsOffDay = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_159_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(160, "label", 54);
    \u0275\u0275text(161);
    \u0275\u0275element(162, "br");
    \u0275\u0275elementStart(163, "small", 6);
    \u0275\u0275text(164);
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(165, "div", 13)(166, "div", 14)(167, "h5", 15);
    \u0275\u0275element(168, "i", 55);
    \u0275\u0275text(169);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(170, "div", 17)(171, "div", 27)(172, "label", 56);
    \u0275\u0275text(173);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(174, "textarea", 57);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_textarea_ngModelChange_174_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.policyNotes, $event) || (ctx_r0.configForm.policyNotes = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_textarea_ngModelChange_174_listener"));
    \u0275\u0275text(175, "                ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(176, "div", 34);
    \u0275\u0275text(177);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(178, "div", 58);
    \u0275\u0275conditionalCreate(179, EditOvertimeConfigurationComponent_Conditional_3_Conditional_179_Template, 19, 10, "div", 13);
    \u0275\u0275elementStart(180, "div", 13)(181, "div", 14)(182, "h5", 15);
    \u0275\u0275element(183, "i", 59);
    \u0275\u0275text(184);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(185, "div", 17)(186, "div", 27)(187, "label", 60);
    \u0275\u0275text(188);
    \u0275\u0275elementStart(189, "span", 29);
    \u0275\u0275text(190, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(191, "input", 61);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_191_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.effectiveFromDate, $event) || (ctx_r0.configForm.effectiveFromDate = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_191_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(192, EditOvertimeConfigurationComponent_Conditional_3_Conditional_192_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(193, "div", 34);
    \u0275\u0275text(194);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(195, "div", 27)(196, "label", 62);
    \u0275\u0275text(197);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(198, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_198_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.effectiveToDate, $event) || (ctx_r0.configForm.effectiveToDate = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_198_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(199, EditOvertimeConfigurationComponent_Conditional_3_Conditional_199_Template, 2, 1, "div", 33);
    \u0275\u0275elementStart(200, "div", 34);
    \u0275\u0275text(201);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(202, "div", 13)(203, "div", 14)(204, "h5", 15);
    \u0275\u0275element(205, "i", 64);
    \u0275\u0275text(206);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(207, "div", 17)(208, "div", 19)(209, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_209_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.configForm.requireApproval, $event) || (ctx_r0.configForm.requireApproval = $event);
      return \u0275\u0275resetView($event);
    }, "EditOvertimeConfigurationComponent_Conditional_3_Template_input_ngModelChange_209_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(210, "label", 66);
    \u0275\u0275text(211);
    \u0275\u0275element(212, "br");
    \u0275\u0275elementStart(213, "small", 6);
    \u0275\u0275text(214);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(215, "div", 67)(216, "div", 17)(217, "div", 68)(218, "button", 69);
    \u0275\u0275conditionalCreate(219, EditOvertimeConfigurationComponent_Conditional_3_Conditional_219_Template, 1, 0, "i", 70)(220, EditOvertimeConfigurationComponent_Conditional_3_Conditional_220_Template, 1, 0, "i", 71);
    \u0275\u0275text(221);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.isConfigurationActive() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.error() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isConfigurationActive() ? 2 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.overtimeTypes"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.enablePreShiftOvertime);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.enablePreShift"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.enablePreShiftDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.enablePostShiftOvertime);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.enablePostShift"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.enablePostShiftDescription"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("general") ? 32 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.overtimeRates"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.normalDayRate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r0.getFieldClasses("normalDayRate"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.normalDayRate);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.hasError("normalDayRate") ? 50 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.normalDayRateDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.publicHolidayRate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r0.getFieldClasses("publicHolidayRate"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.publicHolidayRate);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.hasError("publicHolidayRate") ? 63 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.publicHolidayRateDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.offDayRate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r0.getFieldClasses("offDayRate"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.offDayRate);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.hasError("offDayRate") ? 76 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.offDayRateDescription"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.overtimeLimits"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.maxPreShiftHours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getFieldClasses("maxPreShiftOvertimeHours"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.maxPreShiftOvertimeHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.hours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("maxPreShiftOvertimeHours") ? 94 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.maxPreShiftHoursDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.maxPostShiftHours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getFieldClasses("maxPostShiftOvertimeHours"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.maxPostShiftOvertimeHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.hours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("maxPostShiftOvertimeHours") ? 105 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.maxPostShiftHoursDescription"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.calculationSettings"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.minimumOvertimeMinutes"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getFieldClasses("minimumOvertimeMinutes"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.minimumOvertimeMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.minutes"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("minimumOvertimeMinutes") ? 123 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.minimumOvertimeMinutesDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.gracePeriodMinutes"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getFieldClasses("overtimeGracePeriodMinutes"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.overtimeGracePeriodMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.minutes"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("overtimeGracePeriodMinutes") ? 134 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.gracePeriodMinutesDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.roundingIntervalMinutes"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getFieldClasses("roundingIntervalMinutes"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.roundingIntervalMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.minutes"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("roundingIntervalMinutes") ? 145 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.roundingIntervalMinutesDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.considerFlexibleTime);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.considerFlexibleTime"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.considerFlexibleTimeDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.weekendAsOffDay);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.weekendAsOffDay"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.weekendAsOffDayDescription"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.policyNotes"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.policyNotesLabel"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.policyNotes);
    \u0275\u0275property("placeholder", ctx_r0.t("settings.overtime.policyNotesPlaceholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.policyNotesDescription"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.originalConfig ? 179 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.effectivePeriod"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.effectiveFrom"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r0.getFieldClasses("effectiveFromDate"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.effectiveFromDate);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("effectiveFromDate") ? 192 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.effectiveFromDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.effectiveTo"), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getFieldClasses("effectiveToDate"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.effectiveToDate);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("effectiveToDate") ? 199 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.effectiveToDescription"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.additionalSettings"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.configForm.requireApproval);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.overtime.requireApproval"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.overtime.requireApprovalDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.submitting() ? 219 : 220);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.submitting() ? ctx_r0.t("common.saving") : ctx_r0.t("settings.overtime.updatePolicy"), " ");
  }
}
__name(EditOvertimeConfigurationComponent_Conditional_3_Template, "EditOvertimeConfigurationComponent_Conditional_3_Template");
var _EditOvertimeConfigurationComponent = class _EditOvertimeConfigurationComponent {
  overtimeService = inject(OvertimeConfigurationsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Configuration ID and original data
  configurationId = 0;
  originalConfig = null;
  // Form state
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
    this.route.params.subscribe((params) => {
      this.configurationId = +params["id"];
      if (this.configurationId) {
        this.loadConfiguration();
      }
    });
  }
  t(key) {
    return this.i18n.t(key);
  }
  getTodayDate() {
    const today = /* @__PURE__ */ new Date();
    return today.toISOString().split("T")[0];
  }
  loadConfiguration() {
    this.loading.set(true);
    this.error.set(null);
    this.overtimeService.getOvertimeConfigurationById(this.configurationId).subscribe({
      next: /* @__PURE__ */ __name((config) => {
        this.originalConfig = config;
        this.populateForm(config);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load overtime configuration:", error);
        this.loading.set(false);
        if (error.status === 404) {
          this.error.set(this.t("settings.overtime.errors.configurationNotFound"));
          this.notificationService.error(this.t("app.error"), this.t("settings.overtime.errors.configurationNotFound"));
        } else {
          this.error.set(this.t("errors.server"));
          this.notificationService.error(this.t("app.error"), this.t("errors.server"));
        }
      }, "error")
    });
  }
  populateForm(config) {
    this.configForm = {
      enablePreShiftOvertime: config.enablePreShiftOvertime,
      enablePostShiftOvertime: config.enablePostShiftOvertime,
      normalDayRate: config.normalDayRate,
      publicHolidayRate: config.publicHolidayRate,
      offDayRate: config.offDayRate,
      minimumOvertimeMinutes: config.minimumOvertimeMinutes,
      considerFlexibleTime: config.considerFlexibleTime,
      maxPreShiftOvertimeHours: config.maxPreShiftOvertimeHours,
      maxPostShiftOvertimeHours: config.maxPostShiftOvertimeHours,
      requireApproval: config.requireApproval,
      overtimeGracePeriodMinutes: config.overtimeGracePeriodMinutes,
      weekendAsOffDay: config.weekendAsOffDay,
      roundingIntervalMinutes: config.roundingIntervalMinutes,
      policyNotes: config.policyNotes || "",
      effectiveFromDate: config.effectiveFromDate.split("T")[0],
      // Convert to date input format
      effectiveToDate: config.effectiveToDate ? config.effectiveToDate.split("T")[0] : ""
    };
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
    this.overtimeService.updateOvertimeConfiguration(this.configurationId, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notificationService.success(this.t("app.success"), this.t("settings.overtime.policyUpdatedSuccessfully"));
        this.router.navigate(["/settings/overtime"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to update overtime configuration:", error);
        this.submitting.set(false);
        if (error.status === 400 && error.error?.errors) {
          this.validationErrors.set(error.error.errors);
          this.error.set(this.t("settings.overtime.validation.serverErrors"));
        } else if (error.status === 404) {
          this.error.set(this.t("settings.overtime.errors.configurationNotFound"));
          this.notificationService.error(this.t("app.error"), this.t("settings.overtime.errors.configurationNotFound"));
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
    if (!this.originalConfig) {
      return false;
    }
    const original = {
      enablePreShiftOvertime: this.originalConfig.enablePreShiftOvertime,
      enablePostShiftOvertime: this.originalConfig.enablePostShiftOvertime,
      normalDayRate: this.originalConfig.normalDayRate,
      publicHolidayRate: this.originalConfig.publicHolidayRate,
      offDayRate: this.originalConfig.offDayRate,
      minimumOvertimeMinutes: this.originalConfig.minimumOvertimeMinutes,
      considerFlexibleTime: this.originalConfig.considerFlexibleTime,
      maxPreShiftOvertimeHours: this.originalConfig.maxPreShiftOvertimeHours,
      maxPostShiftOvertimeHours: this.originalConfig.maxPostShiftOvertimeHours,
      requireApproval: this.originalConfig.requireApproval,
      overtimeGracePeriodMinutes: this.originalConfig.overtimeGracePeriodMinutes,
      weekendAsOffDay: this.originalConfig.weekendAsOffDay,
      roundingIntervalMinutes: this.originalConfig.roundingIntervalMinutes,
      policyNotes: this.originalConfig.policyNotes || "",
      effectiveFromDate: this.originalConfig.effectiveFromDate.split("T")[0],
      effectiveToDate: this.originalConfig.effectiveToDate ? this.originalConfig.effectiveToDate.split("T")[0] : ""
    };
    return JSON.stringify(this.configForm) !== JSON.stringify(original);
  }
  onReset() {
    if (this.originalConfig) {
      this.populateForm(this.originalConfig);
      this.validationErrors.set({});
      this.error.set(null);
    }
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
  // Helper method to check if configuration is active (for UI warnings)
  isConfigurationActive() {
    return this.originalConfig?.isActive || false;
  }
};
__name(_EditOvertimeConfigurationComponent, "EditOvertimeConfigurationComponent");
__publicField(_EditOvertimeConfigurationComponent, "\u0275fac", /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditOvertimeConfigurationComponent)();
}, "EditOvertimeConfigurationComponent_Factory"));
__publicField(_EditOvertimeConfigurationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditOvertimeConfigurationComponent, selectors: [["app-edit-overtime-configuration"]], decls: 4, vars: 4, consts: [["formRef", "ngForm"], [1, "container-fluid"], ["mode", "edit", "moduleName", "settings", "moduleRoute", "settings/overtime", 3, "title", "entityId", "loading"], [1, "d-flex", "justify-content-center", "align-items-center", 2, "min-height", "200px"], [1, "text-center"], [1, "fa-solid", "fa-spinner", "fa-spin", "fs-2", "text-primary", "mb-3"], [1, "text-muted"], [1, "alert", "alert-success", "mb-4"], ["role", "alert", 1, "alert", "alert-danger"], ["role", "alert", 1, "alert", "alert-warning"], [3, "ngSubmit"], [1, "row"], [1, "col-lg-8"], [1, "card", "mb-4"], [1, "card-header"], [1, "mb-0"], [1, "fa-solid", "fa-clock", "me-2"], [1, "card-body"], [1, "col-md-6"], [1, "form-check", "mb-3"], ["type", "checkbox", "id", "enablePreShiftOvertime", "name", "enablePreShiftOvertime", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "enablePreShiftOvertime", 1, "form-check-label"], ["type", "checkbox", "id", "enablePostShiftOvertime", "name", "enablePostShiftOvertime", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "enablePostShiftOvertime", 1, "form-check-label"], [1, "text-danger", "small"], [1, "fa-solid", "fa-percentage", "me-2"], [1, "col-md-4"], [1, "mb-3"], ["for", "normalDayRate", 1, "form-label"], [1, "text-danger"], [1, "input-group"], ["type", "number", "id", "normalDayRate", "name", "normalDayRate", "step", "0.1", "min", "1", "required", "", 3, "ngModelChange", "ngModel"], [1, "input-group-text"], [1, "invalid-feedback", "d-block"], [1, "form-text"], ["for", "publicHolidayRate", 1, "form-label"], ["type", "number", "id", "publicHolidayRate", "name", "publicHolidayRate", "step", "0.1", "min", "1", "required", "", 3, "ngModelChange", "ngModel"], ["for", "offDayRate", 1, "form-label"], ["type", "number", "id", "offDayRate", "name", "offDayRate", "step", "0.1", "min", "1", "required", "", 3, "ngModelChange", "ngModel"], [1, "fa-solid", "fa-hourglass-half", "me-2"], ["for", "maxPreShiftOvertimeHours", 1, "form-label"], ["type", "number", "id", "maxPreShiftOvertimeHours", "name", "maxPreShiftOvertimeHours", "step", "0.5", "min", "0", 3, "ngModelChange", "ngModel"], ["for", "maxPostShiftOvertimeHours", 1, "form-label"], ["type", "number", "id", "maxPostShiftOvertimeHours", "name", "maxPostShiftOvertimeHours", "step", "0.5", "min", "0", 3, "ngModelChange", "ngModel"], [1, "fa-solid", "fa-calculator", "me-2"], ["for", "minimumOvertimeMinutes", 1, "form-label"], ["type", "number", "id", "minimumOvertimeMinutes", "name", "minimumOvertimeMinutes", "min", "0", 3, "ngModelChange", "ngModel"], ["for", "overtimeGracePeriodMinutes", 1, "form-label"], ["type", "number", "id", "overtimeGracePeriodMinutes", "name", "overtimeGracePeriodMinutes", "min", "0", 3, "ngModelChange", "ngModel"], ["for", "roundingIntervalMinutes", 1, "form-label"], ["type", "number", "id", "roundingIntervalMinutes", "name", "roundingIntervalMinutes", "min", "1", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "id", "considerFlexibleTime", "name", "considerFlexibleTime", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "considerFlexibleTime", 1, "form-check-label"], ["type", "checkbox", "id", "weekendAsOffDay", "name", "weekendAsOffDay", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "weekendAsOffDay", 1, "form-check-label"], [1, "fa-solid", "fa-sticky-note", "me-2"], ["for", "policyNotes", 1, "form-label"], ["id", "policyNotes", "name", "policyNotes", "rows", "4", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], [1, "col-lg-4"], [1, "fa-solid", "fa-calendar", "me-2"], ["for", "effectiveFromDate", 1, "form-label"], ["type", "date", "id", "effectiveFromDate", "name", "effectiveFromDate", "required", "", 3, "ngModelChange", "ngModel"], ["for", "effectiveToDate", 1, "form-label"], ["type", "date", "id", "effectiveToDate", "name", "effectiveToDate", 3, "ngModelChange", "ngModel"], [1, "fa-solid", "fa-cogs", "me-2"], ["type", "checkbox", "id", "requireApproval", "name", "requireApproval", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "requireApproval", 1, "form-check-label"], [1, "card"], [1, "d-grid", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "fa-solid", "fa-spinner", "fa-spin", "me-2"], [1, "fa-solid", "fa-save", "me-2"], [1, "fa-solid", "fa-check-circle", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "mb-2"], [1, "badge", "bg-success"], [1, "badge", "bg-light", "text-dark", "border"]], template: /* @__PURE__ */ __name(function EditOvertimeConfigurationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-form-header", 2);
    \u0275\u0275conditionalCreate(2, EditOvertimeConfigurationComponent_Conditional_2_Template, 5, 1, "div", 3)(3, EditOvertimeConfigurationComponent_Conditional_3_Template, 222, 99);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("settings.overtime.editPolicy"))("entityId", ctx.configurationId)("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : 3);
  }
}, "EditOvertimeConfigurationComponent_Template"), dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, NgModel, NgForm, RouterModule, FormHeaderComponent, DatePipe], styles: [`

.card[_ngcontent-%COMP%] {
  border: 1px solid #e9ecef;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: box-shadow 0.15s ease-in-out;
}
.card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.card-header[_ngcontent-%COMP%] {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 1.25rem;
}
.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {
  color: #495057;
  font-weight: 600;
}
.form-label[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}
.form-check-label[_ngcontent-%COMP%] {
  font-weight: 500;
}
.form-text[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.25rem;
}
.input-group-text[_ngcontent-%COMP%] {
  background-color: #f8f9fa;
  border-color: #ced4da;
  font-weight: 500;
}
.btn[_ngcontent-%COMP%] {
  font-weight: 500;
  padding: 0.5rem 1rem;
}
.alert[_ngcontent-%COMP%] {
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
}
.alert-warning[_ngcontent-%COMP%] {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
}
.alert-danger[_ngcontent-%COMP%] {
  background-color: #f8d7da;
  border-left: 4px solid #dc3545;
}
.badge[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35em 0.65em;
}
.text-danger[_ngcontent-%COMP%] {
  color: #dc3545 !important;
}
.text-muted[_ngcontent-%COMP%] {
  color: #6c757d !important;
}
.text-primary[_ngcontent-%COMP%] {
  color: #0d6efd !important;
}
.text-success[_ngcontent-%COMP%] {
  color: #198754 !important;
}
.text-warning[_ngcontent-%COMP%] {
  color: #ffc107 !important;
}
.fa-spinner[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.form-control.is-invalid[_ngcontent-%COMP%] {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath d='m5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.form-control.is-invalid[_ngcontent-%COMP%]:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
.invalid-feedback[_ngcontent-%COMP%] {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
}
@media (max-width: 768px) {
  .container-fluid[_ngcontent-%COMP%] {
    padding: 0.5rem;
  }
  .card-body[_ngcontent-%COMP%] {
    padding: 1rem;
  }
  .btn[_ngcontent-%COMP%] {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .d-flex.justify-content-between[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch !important;
  }
  .d-flex.justify-content-between[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }
}
.configuration-info[_ngcontent-%COMP%] {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
.configuration-info[_ngcontent-%COMP%]   .mb-2[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0 !important;
}
.alert-warning[_ngcontent-%COMP%]   .fa-exclamation-triangle[_ngcontent-%COMP%] {
  color: #856404;
}
.badge.bg-success[_ngcontent-%COMP%] {
  background-color: #198754 !important;
}
.badge.bg-secondary[_ngcontent-%COMP%] {
  background-color: #6c757d !important;
}
.fa-solid[_ngcontent-%COMP%] {
  width: 1em;
  text-align: center;
}
.form-section[_ngcontent-%COMP%] {
  margin-bottom: 2rem;
}
.form-section[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.col-lg-4[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {
  position: sticky;
  top: 2rem;
}
.form-control[_ngcontent-%COMP%]:focus, 
.form-check-input[_ngcontent-%COMP%]:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.form-control[_ngcontent-%COMP%]:disabled, 
.form-control[readonly][_ngcontent-%COMP%] {
  background-color: #e9ecef;
  opacity: 1;
}
.btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
.btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.card[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
}
.submitting[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
  pointer-events: none;
}
.submitting[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {
  opacity: 0.7;
}
/*# sourceMappingURL=edit-overtime-configuration.component.css.map */`] }));
var EditOvertimeConfigurationComponent = _EditOvertimeConfigurationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditOvertimeConfigurationComponent, [{
    type: Component,
    args: [{ selector: "app-edit-overtime-configuration", standalone: true, imports: [CommonModule, FormsModule, RouterModule, FormHeaderComponent], template: `<div class="container-fluid">\r
  <app-form-header\r
    mode="edit"\r
    [title]="t('settings.overtime.editPolicy')"\r
    moduleName="settings"\r
    moduleRoute="settings/overtime"\r
    [entityId]="configurationId"\r
    [loading]="submitting()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">\r
      <div class="text-center">\r
        <i class="fa-solid fa-spinner fa-spin fs-2 text-primary mb-3"></i>\r
        <p class="text-muted">{{ t('common.loading') }}</p>\r
      </div>\r
    </div>\r
  } @else {\r
    <!-- Active Configuration Badge -->\r
    @if (isConfigurationActive()) {\r
      <div class="alert alert-success mb-4">\r
        <i class="fa-solid fa-check-circle me-2"></i>\r
        {{ t('settings.overtime.currentlyActive') }}\r
      </div>\r
    }\r
\r
    <!-- Error Alert -->\r
    @if (error()) {\r
      <div class="alert alert-danger" role="alert">\r
        <i class="fa-solid fa-exclamation-triangle me-2"></i>\r
        {{ error() }}\r
      </div>\r
    }\r
\r
    <!-- Active Configuration Warning -->\r
    @if (isConfigurationActive()) {\r
      <div class="alert alert-warning" role="alert">\r
        <i class="fa-solid fa-exclamation-triangle me-2"></i>\r
        <strong>{{ t('settings.overtime.editActiveWarning') }}</strong>\r
        {{ t('settings.overtime.editActiveWarningMessage') }}\r
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
          <!-- Configuration Info -->\r
          @if (originalConfig) {\r
            <div class="card mb-4">\r
              <div class="card-header">\r
                <h5 class="mb-0">\r
                  <i class="fa-solid fa-info-circle me-2"></i>\r
                  {{ t('settings.overtime.configurationInfo') }}\r
                </h5>\r
              </div>\r
              <div class="card-body">\r
                <div class="mb-2">\r
                  <small class="text-muted">{{ t('common.created') }}:</small>\r
                  <div>{{ originalConfig.createdBy }} on {{ originalConfig.createdAtUtc | date:'medium' }}</div>\r
                </div>\r
                @if (originalConfig.updatedAtUtc) {\r
                  <div class="mb-2">\r
                    <small class="text-muted">{{ t('common.lastModified') }}:</small>\r
                    <div>{{ originalConfig.updatedBy }} on {{ originalConfig.updatedAtUtc | date:'medium' }}</div>\r
                  </div>\r
                }\r
                <div class="mb-2">\r
                  <small class="text-muted">{{ t('settings.overtime.status') }}:</small>\r
                  <div>\r
                    @if (originalConfig.isActive) {\r
                      <span class="badge bg-success">{{ t('settings.overtime.active') }}</span>\r
                    } @else {\r
                      <span class="badge bg-light text-dark border">{{ t('settings.overtime.inactive') }}</span>\r
                    }\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          }\r
\r
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
                  {{ submitting() ? t('common.saving') : t('settings.overtime.updatePolicy') }}\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </form>\r
  }\r
</div>`, styles: [`/* src/app/pages/settings/overtime/edit-overtime-configuration/edit-overtime-configuration.component.css */
.card {
  border: 1px solid #e9ecef;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: box-shadow 0.15s ease-in-out;
}
.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 1.25rem;
}
.card-header h5 {
  color: #495057;
  font-weight: 600;
}
.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}
.form-check-label {
  font-weight: 500;
}
.form-text {
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.25rem;
}
.input-group-text {
  background-color: #f8f9fa;
  border-color: #ced4da;
  font-weight: 500;
}
.btn {
  font-weight: 500;
  padding: 0.5rem 1rem;
}
.alert {
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
}
.alert-warning {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
}
.alert-danger {
  background-color: #f8d7da;
  border-left: 4px solid #dc3545;
}
.badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35em 0.65em;
}
.text-danger {
  color: #dc3545 !important;
}
.text-muted {
  color: #6c757d !important;
}
.text-primary {
  color: #0d6efd !important;
}
.text-success {
  color: #198754 !important;
}
.text-warning {
  color: #ffc107 !important;
}
.fa-spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.form-control.is-invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath d='m5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.form-control.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
.invalid-feedback {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
}
@media (max-width: 768px) {
  .container-fluid {
    padding: 0.5rem;
  }
  .card-body {
    padding: 1rem;
  }
  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .d-flex.justify-content-between {
    flex-direction: column;
    align-items: stretch !important;
  }
  .d-flex.justify-content-between > div:last-child {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }
}
.configuration-info {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
.configuration-info .mb-2:last-child {
  margin-bottom: 0 !important;
}
.alert-warning .fa-exclamation-triangle {
  color: #856404;
}
.badge.bg-success {
  background-color: #198754 !important;
}
.badge.bg-secondary {
  background-color: #6c757d !important;
}
.fa-solid {
  width: 1em;
  text-align: center;
}
.form-section {
  margin-bottom: 2rem;
}
.form-section:last-child {
  margin-bottom: 0;
}
.col-lg-4 .card {
  position: sticky;
  top: 2rem;
}
.form-control:focus,
.form-check-input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.form-control:disabled,
.form-control[readonly] {
  background-color: #e9ecef;
  opacity: 1;
}
.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.card:hover {
  transform: translateY(-2px);
}
.submitting .btn {
  pointer-events: none;
}
.submitting .form-control {
  opacity: 0.7;
}
/*# sourceMappingURL=edit-overtime-configuration.component.css.map */
`] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditOvertimeConfigurationComponent, { className: "EditOvertimeConfigurationComponent", filePath: "src/app/pages/settings/overtime/edit-overtime-configuration/edit-overtime-configuration.component.ts", lineNumber: 18 });
})();
export {
  EditOvertimeConfigurationComponent
};
//# sourceMappingURL=chunk-UZPJ4HWG.js.map
