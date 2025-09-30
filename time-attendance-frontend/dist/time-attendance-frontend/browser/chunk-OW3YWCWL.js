import {
  ShiftType
} from "./chunk-ICLZUHFB.js";
import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  ShiftsService
} from "./chunk-BDBUQZLA.js";
import "./chunk-DKGIYIS4.js";
import "./chunk-IL4NCC2P.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  RadioControlValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  NgClass,
  Router,
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
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
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
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/shifts/create-shift/create-shift.component.ts
function CreateShiftComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "label", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 51)(6, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_46_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.shiftForm.requiredHours, $event) || (ctx_r2.shiftForm.requiredHours = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Conditional_46_Template_input_ngModelChange_6_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 53);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 49);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("shifts.requiredHours"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.shiftForm.requiredHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.hours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.help.requiredHours"));
  }
}
__name(CreateShiftComponent_Conditional_46_Template, "CreateShiftComponent_Conditional_46_Template");
function CreateShiftComponent_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.help.nightShiftDisabledHoursOnly"));
  }
}
__name(CreateShiftComponent_Conditional_98_Template, "CreateShiftComponent_Conditional_98_Template");
function CreateShiftComponent_Conditional_99_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 71);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_99_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.addShiftPeriod());
    }, "CreateShiftComponent_Conditional_99_Conditional_5_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.t("shifts.addPeriod"), " ");
  }
}
__name(CreateShiftComponent_Conditional_99_Conditional_5_Template, "CreateShiftComponent_Conditional_99_Conditional_5_Template");
function CreateShiftComponent_Conditional_99_For_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 81);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_99_For_8_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const $index_r7 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeShiftPeriod($index_r7));
    }, "CreateShiftComponent_Conditional_99_For_8_Conditional_9_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 82);
    \u0275\u0275elementEnd();
  }
}
__name(CreateShiftComponent_Conditional_99_For_8_Conditional_9_Template, "CreateShiftComponent_Conditional_99_For_8_Conditional_9_Template");
function CreateShiftComponent_Conditional_99_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "div", 73)(2, "span", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 74)(5, "span", 75);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 76);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, CreateShiftComponent_Conditional_99_For_8_Conditional_9_Template, 2, 0, "button", 77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 78)(11, "div", 2)(12, "div", 18)(13, "label", 79);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_99_For_8_Template_input_ngModelChange_15_listener($event) {
      const period_r8 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(period_r8.startTime, $event) || (period_r8.startTime = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Conditional_99_For_8_Template_input_ngModelChange_15_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 18)(17, "label", 79);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_99_For_8_Template_input_ngModelChange_19_listener($event) {
      const period_r8 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(period_r8.endTime, $event) || (period_r8.endTime = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Conditional_99_For_8_Template_input_ngModelChange_19_listener"));
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const period_r8 = ctx.$implicit;
    const $index_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r2.t("shifts.period"), " ", period_r8.periodOrder);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.isNightShift(period_r8.startTime, period_r8.endTime) ? "bg-info" : "bg-primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getPeriodTypeText(period_r8), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatHours(ctx_r2.calculatePeriodHours(period_r8.startTime, period_r8.endTime)));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.shiftForm.shiftPeriods.length > 1 ? 9 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.startTime"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", period_r8.startTime);
    \u0275\u0275property("name", "startTime_" + $index_r7);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.endTime"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", period_r8.endTime);
    \u0275\u0275property("name", "endTime_" + $index_r7);
  }
}
__name(CreateShiftComponent_Conditional_99_For_8_Template, "CreateShiftComponent_Conditional_99_For_8_Template");
function CreateShiftComponent_Conditional_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 3)(2, "div", 65)(3, "h5", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CreateShiftComponent_Conditional_99_Conditional_5_Template, 3, 1, "button", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "hr", 10);
    \u0275\u0275repeaterCreate(7, CreateShiftComponent_Conditional_99_For_8_Template, 20, 12, "div", 68, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(9, "div", 69);
    \u0275\u0275element(10, "i", 70);
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.periods"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.shiftForm.shiftPeriods.length < 2 ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.shiftForm.shiftPeriods);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r2.t("shifts.totalHours"), ": ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatHours(ctx_r2.getTotalShiftHours()));
  }
}
__name(CreateShiftComponent_Conditional_99_Template, "CreateShiftComponent_Conditional_99_Template");
function CreateShiftComponent_Conditional_112_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "label", 83);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 84);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_112_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.shiftForm.coreStart, $event) || (ctx_r2.shiftForm.coreStart = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Conditional_112_Template_input_ngModelChange_5_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 11)(7, "label", 85);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 13);
    \u0275\u0275text(10, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_112_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.shiftForm.coreEnd, $event) || (ctx_r2.shiftForm.coreEnd = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Conditional_112_Template_input_ngModelChange_11_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("shifts.coreStart"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.shiftForm.coreStart);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("shifts.coreEnd"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.shiftForm.coreEnd);
  }
}
__name(CreateShiftComponent_Conditional_112_Template, "CreateShiftComponent_Conditional_112_Template");
function CreateShiftComponent_Conditional_127_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.help.weeklyHoursCoreRequired"));
  }
}
__name(CreateShiftComponent_Conditional_127_Template, "CreateShiftComponent_Conditional_127_Template");
function CreateShiftComponent_Conditional_142_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.help.gracePeriodDisabledFlexible"));
  }
}
__name(CreateShiftComponent_Conditional_142_Conditional_9_Template, "CreateShiftComponent_Conditional_142_Conditional_9_Template");
function CreateShiftComponent_Conditional_142_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "label", 91);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 51)(4, "input", 92);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_142_Conditional_17_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.shiftForm.flexMinutesBefore, $event) || (ctx_r2.shiftForm.flexMinutesBefore = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Conditional_142_Conditional_17_Template_input_ngModelChange_4_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 49);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 11)(10, "label", 93);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 51)(13, "input", 94);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_142_Conditional_17_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.shiftForm.flexMinutesAfter, $event) || (ctx_r2.shiftForm.flexMinutesAfter = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Conditional_142_Conditional_17_Template_input_ngModelChange_13_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 53);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 49);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.flexMinutesBefore"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.shiftForm.flexMinutesBefore);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.help.flexBefore"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.flexMinutesAfter"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.shiftForm.flexMinutesAfter);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.help.flexAfter"));
  }
}
__name(CreateShiftComponent_Conditional_142_Conditional_17_Template, "CreateShiftComponent_Conditional_142_Conditional_17_Template");
function CreateShiftComponent_Conditional_142_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "label", 87);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 51)(4, "input", 88);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_142_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.shiftForm.gracePeriodMinutes, $event) || (ctx_r2.shiftForm.gracePeriodMinutes = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Conditional_142_Template_input_ngModelChange_4_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_142_Template_input_ngModelChange_4_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onGracePeriodChange());
    }, "CreateShiftComponent_Conditional_142_Template_input_ngModelChange_4_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 49);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, CreateShiftComponent_Conditional_142_Conditional_9_Template, 2, 1, "small", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 15)(11, "div", 46)(12, "input", 89);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_142_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.shiftForm.allowFlexibleHours, $event) || (ctx_r2.shiftForm.allowFlexibleHours = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Conditional_142_Template_input_ngModelChange_12_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function CreateShiftComponent_Conditional_142_Template_input_change_12_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFlexibleHoursChange());
    }, "CreateShiftComponent_Conditional_142_Template_input_change_12_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "label", 90);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 49);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, CreateShiftComponent_Conditional_142_Conditional_17_Template, 18, 8);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.gracePeriodMinutes"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.shiftForm.gracePeriodMinutes);
    \u0275\u0275property("disabled", ctx_r2.shiftForm.allowFlexibleHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.help.gracePeriod"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.shiftForm.allowFlexibleHours ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.shiftForm.allowFlexibleHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("shifts.allowFlexibleHours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("shifts.help.flexibleHours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.shiftForm.allowFlexibleHours ? 17 : -1);
  }
}
__name(CreateShiftComponent_Conditional_142_Template, "CreateShiftComponent_Conditional_142_Template");
function CreateShiftComponent_Conditional_143_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const error_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", error_r12);
  }
}
__name(CreateShiftComponent_Conditional_143_For_9_Template, "CreateShiftComponent_Conditional_143_For_9_Template");
function CreateShiftComponent_Conditional_143_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 3)(2, "div", 95)(3, "div", 96);
    \u0275\u0275element(4, "i", 97);
    \u0275\u0275elementStart(5, "div")(6, "h6", 98);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, CreateShiftComponent_Conditional_143_For_9_Template, 2, 1, "div", 99, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.t("common.validationErrors"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.getFormErrors());
  }
}
__name(CreateShiftComponent_Conditional_143_Template, "CreateShiftComponent_Conditional_143_Template");
function CreateShiftComponent_Conditional_151_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 100);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("shifts.loading.creating"), " ");
  }
}
__name(CreateShiftComponent_Conditional_151_Template, "CreateShiftComponent_Conditional_151_Template");
function CreateShiftComponent_Conditional_152_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 101);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.t("shifts.create"), " ");
  }
}
__name(CreateShiftComponent_Conditional_152_Template, "CreateShiftComponent_Conditional_152_Template");
var _CreateShiftComponent = class _CreateShiftComponent {
  shiftsService = inject(ShiftsService);
  router = inject(Router);
  i18n = inject(I18nService);
  // Enum references for template
  ShiftType = ShiftType;
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  // Form state
  shiftForm = {
    name: "",
    description: "",
    shiftType: ShiftType.TimeBased,
    requiredHours: void 0,
    isCheckInRequired: true,
    isAutoCheckOut: false,
    allowFlexibleHours: false,
    flexMinutesBefore: void 0,
    flexMinutesAfter: void 0,
    gracePeriodMinutes: void 0,
    // Extended Business Rules
    requiredWeeklyHours: void 0,
    hasCoreHours: false,
    coreStart: "",
    coreEnd: "",
    // Working Days (Monday-Friday by default)
    isSunday: false,
    isMonday: true,
    isTuesday: true,
    isWednesday: true,
    isThursday: true,
    isFriday: true,
    isSaturday: false,
    isNightShift: false,
    shiftPeriods: [
      {
        periodOrder: 1,
        startTime: "08:00",
        endTime: "17:00"
      }
    ]
  };
  ngOnInit() {
  }
  t(key) {
    return this.i18n.t(key);
  }
  // Shift Type Change Handler
  onShiftTypeChange() {
    if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      this.shiftForm.allowFlexibleHours = false;
      this.shiftForm.flexMinutesBefore = void 0;
      this.shiftForm.flexMinutesAfter = void 0;
      this.shiftForm.gracePeriodMinutes = void 0;
      this.shiftForm.shiftPeriods = [];
      this.shiftForm.isNightShift = false;
      if (!this.shiftForm.requiredHours) {
        this.shiftForm.requiredHours = 8;
      }
    } else {
      this.shiftForm.requiredHours = void 0;
      if (this.shiftForm.shiftPeriods.length === 0) {
        this.addShiftPeriod();
      }
    }
  }
  // Core Hours Change Handler
  onCoreHoursChange() {
    if (!this.shiftForm.hasCoreHours) {
      this.shiftForm.coreStart = "";
      this.shiftForm.coreEnd = "";
    } else {
      if (!this.shiftForm.coreStart)
        this.shiftForm.coreStart = "09:00";
      if (!this.shiftForm.coreEnd)
        this.shiftForm.coreEnd = "15:00";
    }
  }
  // Flexible Hours Change Handler
  onFlexibleHoursChange() {
    if (!this.shiftForm.allowFlexibleHours) {
      this.shiftForm.flexMinutesBefore = void 0;
      this.shiftForm.flexMinutesAfter = void 0;
    } else {
      this.shiftForm.gracePeriodMinutes = void 0;
    }
  }
  // Grace Period Change Handler
  onGracePeriodChange() {
    if (this.shiftForm.gracePeriodMinutes && this.shiftForm.gracePeriodMinutes > 0) {
      this.shiftForm.allowFlexibleHours = false;
      this.shiftForm.flexMinutesBefore = void 0;
      this.shiftForm.flexMinutesAfter = void 0;
    }
  }
  // Weekly Hours Change Handler
  onWeeklyHoursChange() {
    if (this.shiftForm.requiredWeeklyHours && this.shiftForm.requiredWeeklyHours > 0) {
      if (!this.shiftForm.hasCoreHours) {
        this.shiftForm.hasCoreHours = true;
        this.onCoreHoursChange();
      }
    }
  }
  // Night Shift Change Handler
  onNightShiftChange() {
    if (this.shiftForm.isNightShift && this.shiftForm.shiftType === ShiftType.HoursOnly) {
      this.shiftForm.isNightShift = false;
    }
  }
  // Shift Period Management
  addShiftPeriod() {
    if (this.shiftForm.shiftPeriods.length < 2) {
      const newOrder = this.shiftForm.shiftPeriods.length + 1;
      this.shiftForm.shiftPeriods.push({
        periodOrder: newOrder,
        startTime: newOrder === 1 ? "08:00" : "13:00",
        endTime: newOrder === 1 ? "12:00" : "17:00"
      });
    }
  }
  removeShiftPeriod(index) {
    this.shiftForm.shiftPeriods.splice(index, 1);
    this.shiftForm.shiftPeriods.forEach((period, idx) => {
      period.periodOrder = idx + 1;
    });
  }
  // Business Rule Methods
  calculatePeriodHours(startTime, endTime) {
    if (!startTime || !endTime)
      return 0;
    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);
    if (end > start) {
      return (end - start) / (1e3 * 60 * 60);
    } else if (end < start) {
      const hoursToMidnight = (24 * 60 * 60 * 1e3 - start) / (1e3 * 60 * 60);
      const hoursFromMidnight = end / (1e3 * 60 * 60);
      return hoursToMidnight + hoursFromMidnight;
    } else {
      return 0;
    }
  }
  isNightShift(startTime, endTime) {
    if (!startTime || !endTime)
      return false;
    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);
    return end < start;
  }
  getTotalShiftHours() {
    if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      return this.shiftForm.requiredHours || 0;
    }
    return this.shiftForm.shiftPeriods.reduce((total, period) => {
      return total + this.calculatePeriodHours(period.startTime, period.endTime);
    }, 0);
  }
  getWorkingDaysCount() {
    let count = 0;
    if (this.shiftForm.isSunday)
      count++;
    if (this.shiftForm.isMonday)
      count++;
    if (this.shiftForm.isTuesday)
      count++;
    if (this.shiftForm.isWednesday)
      count++;
    if (this.shiftForm.isThursday)
      count++;
    if (this.shiftForm.isFriday)
      count++;
    if (this.shiftForm.isSaturday)
      count++;
    return count;
  }
  parseTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return (hours * 60 + minutes) * 60 * 1e3;
  }
  formatHours(hours) {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`;
  }
  getPeriodTypeText(period) {
    const isNight = this.isNightShift(period.startTime, period.endTime);
    return isNight ? this.t("shifts.periodTypes.nightShift") : this.t("shifts.periodTypes.dayShift");
  }
  // Validation
  validateBusinessRules() {
    const errors = [];
    if (!this.shiftForm.name.trim()) {
      errors.push(this.t("shifts.validation.name.required"));
    }
    const hasWorkingDays = this.shiftForm.isSunday || this.shiftForm.isMonday || this.shiftForm.isTuesday || this.shiftForm.isWednesday || this.shiftForm.isThursday || this.shiftForm.isFriday || this.shiftForm.isSaturday;
    if (!hasWorkingDays) {
      errors.push(this.t("shifts.validation.workingDays.required"));
    }
    if (this.shiftForm.hasCoreHours) {
      if (!this.shiftForm.coreStart || !this.shiftForm.coreEnd) {
        errors.push(this.t("shifts.validation.coreHours.required"));
      } else {
        const coreStart = this.parseTime(this.shiftForm.coreStart);
        const coreEnd = this.parseTime(this.shiftForm.coreEnd);
        if (coreStart === coreEnd) {
          errors.push(this.t("shifts.validation.coreHours.sameTime"));
        }
        if (this.shiftForm.shiftType === ShiftType.TimeBased && this.shiftForm.shiftPeriods.length > 0) {
          const coreIsWithinPeriods = this.shiftForm.shiftPeriods.some((period) => this.isCoreWithinPeriod(period, this.shiftForm.coreStart, this.shiftForm.coreEnd));
          if (!coreIsWithinPeriods) {
            errors.push(this.t("shifts.validation.coreHours.outsidePeriods"));
          }
        }
      }
    }
    if (this.shiftForm.requiredWeeklyHours !== void 0 && this.shiftForm.requiredWeeklyHours !== null) {
      if (this.shiftForm.requiredWeeklyHours <= 0) {
        errors.push(this.t("shifts.validation.weeklyHours.positive"));
      }
      if (this.shiftForm.requiredWeeklyHours > 168) {
        errors.push(this.t("shifts.validation.weeklyHours.maxWeekly"));
      }
      if (!this.shiftForm.hasCoreHours) {
        errors.push(this.t("shifts.validation.weeklyHours.coreHoursRequired"));
      }
    }
    if (this.shiftForm.allowFlexibleHours && this.shiftForm.gracePeriodMinutes && this.shiftForm.gracePeriodMinutes > 0) {
      errors.push(this.t("shifts.validation.flexible.noGracePeriod"));
    }
    if (this.shiftForm.isNightShift && this.shiftForm.shiftType === ShiftType.HoursOnly) {
      errors.push(this.t("shifts.validation.nightShift.notWithHoursOnly"));
    }
    if (this.shiftForm.shiftType === ShiftType.TimeBased) {
      if (this.shiftForm.shiftPeriods.length === 0) {
        errors.push(this.t("shifts.validation.timeBased.periodsRequired"));
      }
      if (this.shiftForm.requiredHours !== void 0) {
        errors.push(this.t("shifts.validation.timeBased.noRequiredHours"));
      }
    } else if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      if (this.shiftForm.shiftPeriods.length > 0) {
        errors.push(this.t("shifts.validation.hoursOnly.noPeriods"));
      }
      if (!this.shiftForm.requiredHours || this.shiftForm.requiredHours <= 0) {
        errors.push(this.t("shifts.validation.hoursOnly.requiredHours"));
      }
      if (this.shiftForm.requiredHours && this.shiftForm.requiredHours > 24) {
        errors.push(this.t("shifts.validation.hoursOnly.maxHours"));
      }
    }
    return errors;
  }
  isCoreWithinPeriod(period, coreStart, coreEnd) {
    const periodStart = this.parseTime(period.startTime);
    const periodEnd = this.parseTime(period.endTime);
    const coreStartTime = this.parseTime(coreStart);
    const coreEndTime = this.parseTime(coreEnd);
    if (periodEnd < periodStart) {
      const withinFirstPart = coreStartTime >= periodStart && coreEndTime >= periodStart;
      const withinSecondPart = coreStartTime <= periodEnd && coreEndTime <= periodEnd;
      const spansNight = coreStartTime >= periodStart && coreEndTime <= periodEnd;
      return withinFirstPart || withinSecondPart || spansNight;
    } else {
      return coreStartTime >= periodStart && coreEndTime <= periodEnd;
    }
  }
  isFormValid() {
    const businessRuleErrors = this.validateBusinessRules();
    return businessRuleErrors.length === 0;
  }
  getFormErrors() {
    return this.validateBusinessRules();
  }
  // Form Submission
  onSubmit() {
    if (!this.isFormValid())
      return;
    this.submitting.set(true);
    const request = {
      name: this.shiftForm.name.trim(),
      description: this.shiftForm.description.trim() || void 0,
      shiftType: this.shiftForm.shiftType,
      requiredHours: this.shiftForm.requiredHours,
      isCheckInRequired: this.shiftForm.isCheckInRequired,
      isAutoCheckOut: this.shiftForm.isAutoCheckOut,
      allowFlexibleHours: this.shiftForm.allowFlexibleHours,
      flexMinutesBefore: this.shiftForm.flexMinutesBefore,
      flexMinutesAfter: this.shiftForm.flexMinutesAfter,
      gracePeriodMinutes: this.shiftForm.gracePeriodMinutes,
      // Extended Business Rules
      requiredWeeklyHours: this.shiftForm.requiredWeeklyHours,
      hasCoreHours: this.shiftForm.hasCoreHours,
      coreStart: this.shiftForm.hasCoreHours ? this.shiftForm.coreStart : void 0,
      coreEnd: this.shiftForm.hasCoreHours ? this.shiftForm.coreEnd : void 0,
      // Working Days
      isSunday: this.shiftForm.isSunday,
      isMonday: this.shiftForm.isMonday,
      isTuesday: this.shiftForm.isTuesday,
      isWednesday: this.shiftForm.isWednesday,
      isThursday: this.shiftForm.isThursday,
      isFriday: this.shiftForm.isFriday,
      isSaturday: this.shiftForm.isSaturday,
      isNightShift: this.shiftForm.isNightShift,
      shiftPeriods: this.shiftForm.shiftPeriods.length > 0 ? this.shiftForm.shiftPeriods.map((sp) => ({
        periodOrder: sp.periodOrder,
        startTime: sp.startTime,
        endTime: sp.endTime
      })) : void 0
    };
    this.shiftsService.createShift(request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.router.navigate(["/shifts"]);
        this.submitting.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to create shift:", error);
        this.submitting.set(false);
      }, "error")
    });
  }
  onCancel() {
    this.router.navigate(["/shifts"]);
  }
};
__name(_CreateShiftComponent, "CreateShiftComponent");
__publicField(_CreateShiftComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateShiftComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateShiftComponent)();
}, "CreateShiftComponent_Factory"));
__publicField(_CreateShiftComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateShiftComponent, selectors: [["app-create-shift"]], decls: 153, vars: 66, consts: [["formRef", "ngForm"], [1, "container-fluid", "px-4"], [1, "row"], [1, "col-12"], ["mode", "create", "moduleName", "shifts", "moduleRoute", "shifts", 3, "title", "subtitle"], [1, "card", "border-0", "shadow-sm"], [1, "card-body", "p-4"], [3, "ngSubmit"], [1, "row", "mb-4"], [1, "card-title", "mb-3"], [1, "mt-0", "mb-3"], [1, "col-md-6", "mb-3"], ["for", "name", 1, "form-label"], [1, "text-danger"], ["type", "text", "id", "name", "name", "name", "required", "", "maxlength", "200", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], [1, "col-12", "mb-3"], ["for", "description", 1, "form-label"], ["id", "description", "name", "description", "rows", "3", "maxlength", "1000", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], [1, "col-md-6"], [1, "form-check", "p-3", "border", "rounded"], ["type", "radio", "name", "shiftType", "id", "timeBased", 1, "form-check-input", 3, "ngModelChange", "change", "value", "ngModel"], ["for", "timeBased", 1, "form-check-label", "w-100"], [1, "fw-medium"], [1, "text-muted"], ["type", "radio", "name", "shiftType", "id", "hoursOnly", 1, "form-check-input", 3, "ngModelChange", "change", "value", "ngModel"], ["for", "hoursOnly", 1, "form-check-label", "w-100"], [1, "col-md-3", "col-6", "mb-2"], [1, "form-check"], ["type", "checkbox", "id", "sunday", "name", "isSunday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "sunday", 1, "form-check-label"], ["type", "checkbox", "id", "monday", "name", "isMonday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "monday", 1, "form-check-label"], ["type", "checkbox", "id", "tuesday", "name", "isTuesday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "tuesday", 1, "form-check-label"], ["type", "checkbox", "id", "wednesday", "name", "isWednesday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "wednesday", 1, "form-check-label"], ["type", "checkbox", "id", "thursday", "name", "isThursday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "thursday", 1, "form-check-label"], ["type", "checkbox", "id", "friday", "name", "isFriday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "friday", 1, "form-check-label"], ["type", "checkbox", "id", "saturday", "name", "isSaturday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "saturday", 1, "form-check-label"], [1, "col-12", "mt-3"], ["type", "checkbox", "id", "nightShift", "name", "isNightShift", 1, "form-check-input", 3, "ngModelChange", "change", "ngModel", "disabled"], ["for", "nightShift", 1, "form-check-label", "fw-medium"], [1, "text-warning", "d-block"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "hasCoreHours", "name", "hasCoreHours", 1, "form-check-input", 3, "ngModelChange", "change", "ngModel"], ["for", "hasCoreHours", 1, "form-check-label"], [1, "form-text"], ["for", "requiredWeeklyHours", 1, "form-label"], [1, "input-group"], ["type", "number", "id", "requiredWeeklyHours", "name", "requiredWeeklyHours", "step", "0.5", "min", "0", "max", "168", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "input-group-text"], [1, "text-info", "d-block"], ["type", "checkbox", "id", "checkInRequired", "name", "isCheckInRequired", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "checkInRequired", 1, "form-check-label"], ["type", "checkbox", "id", "autoCheckOut", "name", "isAutoCheckOut", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "autoCheckOut", 1, "form-check-label"], [1, "mb-4"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["for", "requiredHours", 1, "form-label"], ["type", "number", "id", "requiredHours", "name", "requiredHours", "step", "0.5", "min", "0.5", "max", "24", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "card-title", "mb-0"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm"], [1, "card", "border", "mb-3"], [1, "alert", "alert-info", "d-flex", "align-items-center"], [1, "bi", "bi-info-circle", "me-2"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", 3, "click"], [1, "bi", "bi-plus-circle", "me-1"], [1, "card-header", "bg-light", "d-flex", "justify-content-between", "align-items-center", "py-2"], [1, "d-flex", "align-items-center", "gap-2"], [1, "badge", 3, "ngClass"], [1, "text-muted", "small"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm"], [1, "card-body"], [1, "form-label"], ["type", "time", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel", "name"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "bi", "bi-trash"], ["for", "coreStart", 1, "form-label"], ["type", "time", "id", "coreStart", "name", "coreStart", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "coreEnd", 1, "form-label"], ["type", "time", "id", "coreEnd", "name", "coreEnd", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "gracePeriod", 1, "form-label"], ["type", "number", "id", "gracePeriod", "name", "gracePeriodMinutes", "min", "0", "max", "120", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled"], ["type", "checkbox", "id", "flexibleHours", "name", "allowFlexibleHours", 1, "form-check-input", 3, "ngModelChange", "change", "ngModel"], ["for", "flexibleHours", 1, "form-check-label"], ["for", "flexBefore", 1, "form-label"], ["type", "number", "id", "flexBefore", "name", "flexMinutesBefore", "min", "1", "max", "480", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "flexAfter", 1, "form-label"], ["type", "number", "id", "flexAfter", "name", "flexMinutesAfter", "min", "1", "max", "480", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "alert", "alert-danger"], [1, "d-flex", "align-items-start"], [1, "bi", "bi-exclamation-triangle", "me-2", "mt-1"], [1, "alert-heading", "mb-2"], [1, "mb-1"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "bi", "bi-check-circle", "me-2"]], template: /* @__PURE__ */ __name(function CreateShiftComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
    \u0275\u0275element(3, "app-form-header", 4);
    \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "form", 7, 0);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateShiftComponent_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSubmit());
    }, "CreateShiftComponent_Template_form_ngSubmit_6_listener"));
    \u0275\u0275elementStart(8, "div", 8)(9, "div", 3)(10, "h5", 9);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "hr", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 11)(14, "label", 12);
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "span", 13);
    \u0275\u0275text(17, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.name, $event) || (ctx.shiftForm.name = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_18_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 15)(20, "label", 16);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "textarea", 17);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_textarea_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.description, $event) || (ctx.shiftForm.description = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_textarea_ngModelChange_22_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 8)(24, "div", 3)(25, "h5", 9);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "hr", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 15)(29, "div", 2)(30, "div", 18)(31, "div", 19)(32, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.shiftType, $event) || (ctx.shiftForm.shiftType = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_32_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_change_32_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onShiftTypeChange());
    }, "CreateShiftComponent_Template_input_change_32_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "label", 21)(34, "div", 22);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "small", 23);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(38, "div", 18)(39, "div", 19)(40, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.shiftType, $event) || (ctx.shiftForm.shiftType = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_40_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_change_40_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onShiftTypeChange());
    }, "CreateShiftComponent_Template_input_change_40_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "label", 25)(42, "div", 22);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "small", 23);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275conditionalCreate(46, CreateShiftComponent_Conditional_46_Template, 11, 4, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 8)(48, "div", 3)(49, "h5", 9);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "hr", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 15)(53, "div", 2)(54, "div", 26)(55, "div", 27)(56, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isSunday, $event) || (ctx.shiftForm.isSunday = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_56_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "label", 29);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 26)(60, "div", 27)(61, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isMonday, $event) || (ctx.shiftForm.isMonday = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_61_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "label", 31);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "div", 26)(65, "div", 27)(66, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_66_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isTuesday, $event) || (ctx.shiftForm.isTuesday = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_66_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "label", 33);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "div", 26)(70, "div", 27)(71, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isWednesday, $event) || (ctx.shiftForm.isWednesday = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_71_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "label", 35);
    \u0275\u0275text(73);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(74, "div", 26)(75, "div", 27)(76, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_76_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isThursday, $event) || (ctx.shiftForm.isThursday = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_76_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "label", 37);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(79, "div", 26)(80, "div", 27)(81, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_81_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isFriday, $event) || (ctx.shiftForm.isFriday = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_81_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "label", 39);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(84, "div", 26)(85, "div", 27)(86, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_86_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isSaturday, $event) || (ctx.shiftForm.isSaturday = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_86_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "label", 41);
    \u0275\u0275text(88);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(89, "small", 23);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 42)(92, "div", 27)(93, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_93_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isNightShift, $event) || (ctx.shiftForm.isNightShift = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_93_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_change_93_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onNightShiftChange());
    }, "CreateShiftComponent_Template_input_change_93_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "label", 44);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "small", 23);
    \u0275\u0275text(97);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(98, CreateShiftComponent_Conditional_98_Template, 2, 1, "small", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(99, CreateShiftComponent_Conditional_99_Template, 15, 4, "div", 8);
    \u0275\u0275elementStart(100, "div", 8)(101, "div", 3)(102, "h5", 9);
    \u0275\u0275text(103);
    \u0275\u0275elementEnd();
    \u0275\u0275element(104, "hr", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "div", 15)(106, "div", 46)(107, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_107_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.hasCoreHours, $event) || (ctx.shiftForm.hasCoreHours = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_107_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_change_107_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onCoreHoursChange());
    }, "CreateShiftComponent_Template_input_change_107_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "label", 48);
    \u0275\u0275text(109);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(110, "div", 49);
    \u0275\u0275text(111);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(112, CreateShiftComponent_Conditional_112_Template, 12, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "div", 8)(114, "div", 3)(115, "h5", 9);
    \u0275\u0275text(116);
    \u0275\u0275elementEnd();
    \u0275\u0275element(117, "hr", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(118, "div", 11)(119, "label", 50);
    \u0275\u0275text(120);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(121, "div", 51)(122, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_122_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.requiredWeeklyHours, $event) || (ctx.shiftForm.requiredWeeklyHours = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_122_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_122_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onWeeklyHoursChange());
    }, "CreateShiftComponent_Template_input_ngModelChange_122_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(123, "span", 53);
    \u0275\u0275text(124);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(125, "div", 49);
    \u0275\u0275text(126);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(127, CreateShiftComponent_Conditional_127_Template, 2, 1, "small", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "div", 11)(129, "div", 46)(130, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_130_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isCheckInRequired, $event) || (ctx.shiftForm.isCheckInRequired = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_130_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(131, "label", 56);
    \u0275\u0275text(132);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(133, "div", 49);
    \u0275\u0275text(134);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(135, "div", 11)(136, "div", 46)(137, "input", 57);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateShiftComponent_Template_input_ngModelChange_137_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isAutoCheckOut, $event) || (ctx.shiftForm.isAutoCheckOut = $event);
      return \u0275\u0275resetView($event);
    }, "CreateShiftComponent_Template_input_ngModelChange_137_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(138, "label", 58);
    \u0275\u0275text(139);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(140, "div", 49);
    \u0275\u0275text(141);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(142, CreateShiftComponent_Conditional_142_Template, 18, 10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(143, CreateShiftComponent_Conditional_143_Template, 10, 1, "div", 8);
    \u0275\u0275elementStart(144, "div", 2)(145, "div", 3);
    \u0275\u0275element(146, "hr", 59);
    \u0275\u0275elementStart(147, "div", 60)(148, "button", 61);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateShiftComponent_Template_button_click_148_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onCancel());
    }, "CreateShiftComponent_Template_button_click_148_listener"));
    \u0275\u0275text(149);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(150, "button", 62);
    \u0275\u0275conditionalCreate(151, CreateShiftComponent_Conditional_151_Template, 2, 1)(152, CreateShiftComponent_Conditional_152_Template, 2, 1);
    \u0275\u0275elementEnd()()()()()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx.t("shifts.create"))("subtitle", ctx.t("shifts.createDescription"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx.t("common.basicInformation"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx.t("shifts.namePlaceholder")));
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("shifts.description"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx.t("shifts.descriptionPlaceholder")));
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("shifts.type"));
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx.ShiftType.TimeBased);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.shiftType);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("shifts.types.timeBased"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.help.shiftType.timeBased"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx.ShiftType.HoursOnly);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.shiftType);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("shifts.types.hoursOnly"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.help.shiftType.hoursOnly"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.shiftForm.shiftType === ctx.ShiftType.HoursOnly ? 46 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("shifts.workingDays"));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isSunday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.days.sunday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isMonday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.days.monday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isTuesday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.days.tuesday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isWednesday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.days.wednesday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isThursday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.days.thursday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isFriday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.days.friday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isSaturday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.days.saturday"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.help.workingDays"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isNightShift);
    \u0275\u0275property("disabled", ctx.shiftForm.shiftType === ctx.ShiftType.HoursOnly);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.isNightShift"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.help.nightShift"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.shiftForm.shiftType === ctx.ShiftType.HoursOnly ? 98 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.shiftForm.shiftType === ctx.ShiftType.TimeBased ? 99 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("shifts.coreHours"));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.hasCoreHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.hasCoreHours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.help.coreHours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.shiftForm.hasCoreHours ? 112 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("shifts.advancedOptions"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("shifts.requiredWeeklyHours"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.requiredWeeklyHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.hours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.help.requiredWeeklyHours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.shiftForm.requiredWeeklyHours && ctx.shiftForm.requiredWeeklyHours > 0 ? 127 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isCheckInRequired);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.checkInRequired"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.help.checkInRequired"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isAutoCheckOut);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.autoCheckOut"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.help.autoCheckOut"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.shiftForm.shiftType === ctx.ShiftType.TimeBased ? 142 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isFormValid() && ctx.shiftForm.name ? 143 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx.isFormValid() || ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 151 : 152);
  }
}, "CreateShiftComponent_Template"), dependencies: [CommonModule, NgClass, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, MinValidator, MaxValidator, NgModel, NgForm, FormHeaderComponent], styles: ['\n\n.create-shift-container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 8px;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 1rem;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  margin-bottom: 24px;\n}\n.form-section[_ngcontent-%COMP%] {\n  padding: 24px;\n  border-bottom: 1px solid #f3f4f6;\n}\n.form-section[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 16px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.section-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  color: #3b82f6;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.form-row.full-width[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.form-label.required[_ngcontent-%COMP%]::after {\n  content: " *";\n  color: #ef4444;\n}\n.form-input[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%], \n.form-textarea[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  transition: all 0.2s ease;\n  background-color: white;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus, \n.form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.checkbox-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.checkbox-input[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  accent-color: #3b82f6;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #374151;\n  cursor: pointer;\n}\n.working-days-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 12px;\n  margin-top: 12px;\n}\n.day-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background-color: #f9fafb;\n  transition: all 0.2s ease;\n}\n.day-checkbox[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n}\n.day-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .day-checkbox[_ngcontent-%COMP%], \n.day-checkbox.active[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  border-color: #3b82f6;\n}\n.shift-periods[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.period-card[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  background-color: #f9fafb;\n}\n.period-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.period-title[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #374151;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.period-type[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-weight: 500;\n}\n.period-type.day[_ngcontent-%COMP%] {\n  background-color: #fef3c7;\n  color: #92400e;\n}\n.period-type.night[_ngcontent-%COMP%] {\n  background-color: #e0e7ff;\n  color: #3730a3;\n}\n.remove-period-btn[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n  padding: 6px 12px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.remove-period-btn[_ngcontent-%COMP%]:hover {\n  background-color: #fee2e2;\n  border-color: #fca5a5;\n}\n.add-period-btn[_ngcontent-%COMP%] {\n  background: #f0f9ff;\n  color: #0369a1;\n  border: 1px solid #bae6fd;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.add-period-btn[_ngcontent-%COMP%]:hover {\n  background-color: #e0f2fe;\n  border-color: #7dd3fc;\n}\n.add-period-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.time-inputs[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 8px;\n}\n.period-info[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin-top: 4px;\n}\n.shift-summary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f0f9ff 0%,\n      #e0f2fe 100%);\n  border: 1px solid #0ea5e9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-top: 16px;\n}\n.summary-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0c4a6e;\n  margin-bottom: 8px;\n  font-size: 0.875rem;\n}\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 4px 0;\n  font-size: 0.875rem;\n}\n.summary-label[_ngcontent-%COMP%] {\n  color: #374151;\n}\n.summary-value[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #0c4a6e;\n}\n.form-errors[_ngcontent-%COMP%] {\n  background-color: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 6px;\n  padding: 12px;\n  margin-bottom: 20px;\n}\n.error-title[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: 500;\n  margin-bottom: 8px;\n  font-size: 0.875rem;\n}\n.error-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.error-item[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 0.875rem;\n  padding: 2px 0;\n}\n.error-item[_ngcontent-%COMP%]::before {\n  content: "\\2022";\n  margin-right: 8px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  padding-top: 16px;\n  border-top: 1px solid #f3f4f6;\n  margin-top: 24px;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  border: 1px solid;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #3b82f6;\n  border-color: #3b82f6;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #2563eb;\n  border-color: #2563eb;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: white;\n  border-color: #d1d5db;\n  color: #374151;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f9fafb;\n  border-color: #9ca3af;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid transparent;\n  border-top: 2px solid currentColor;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.help-text[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin-top: 4px;\n  line-height: 1.4;\n}\n.info-badge[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  display: inline-block;\n}\n@media (max-width: 768px) {\n  .create-shift-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .time-inputs[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .working-days-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=create-shift.component.css.map */'] }));
var CreateShiftComponent = _CreateShiftComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateShiftComponent, [{
    type: Component,
    args: [{ selector: "app-create-shift", standalone: true, imports: [CommonModule, FormsModule, FormHeaderComponent], template: `<div class="container-fluid px-4">
  <div class="row">
    <div class="col-12">
      <!-- Header -->
      <app-form-header
        mode="create"
        [title]="t('shifts.create')"
        [subtitle]="t('shifts.createDescription')"
        moduleName="shifts"
        moduleRoute="shifts">
      </app-form-header>

      <!-- Form Card -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <form (ngSubmit)="onSubmit()" #formRef="ngForm">

            <!-- Basic Information Section -->
            <div class="row mb-4">
              <div class="col-12">
                <h5 class="card-title mb-3">{{ t('common.basicInformation') }}</h5>
                <hr class="mt-0 mb-3">
              </div>

              <!-- Shift Name -->
              <div class="col-md-6 mb-3">
                <label for="name" class="form-label">
                  {{ t('shifts.name') }} <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  [(ngModel)]="shiftForm.name"
                  name="name"
                  required
                  maxlength="200"
                  placeholder="{{ t('shifts.namePlaceholder') }}">
              </div>

              <!-- Description -->
              <div class="col-12 mb-3">
                <label for="description" class="form-label">{{ t('shifts.description') }}</label>
                <textarea
                  class="form-control"
                  id="description"
                  [(ngModel)]="shiftForm.description"
                  name="description"
                  rows="3"
                  maxlength="1000"
                  placeholder="{{ t('shifts.descriptionPlaceholder') }}"></textarea>
              </div>
            </div>

            <!-- Shift Type Section -->
            <div class="row mb-4">
              <div class="col-12">
                <h5 class="card-title mb-3">{{ t('shifts.type') }}</h5>
                <hr class="mt-0 mb-3">
              </div>

              <!-- Shift Type Selection -->
              <div class="col-12 mb-3">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-check p-3 border rounded">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="shiftType"
                        id="timeBased"
                        [value]="ShiftType.TimeBased"
                        [(ngModel)]="shiftForm.shiftType"
                        (change)="onShiftTypeChange()">
                      <label class="form-check-label w-100" for="timeBased">
                        <div class="fw-medium">{{ t('shifts.types.timeBased') }}</div>
                        <small class="text-muted">{{ t('shifts.help.shiftType.timeBased') }}</small>
                      </label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-check p-3 border rounded">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="shiftType"
                        id="hoursOnly"
                        [value]="ShiftType.HoursOnly"
                        [(ngModel)]="shiftForm.shiftType"
                        (change)="onShiftTypeChange()">
                      <label class="form-check-label w-100" for="hoursOnly">
                        <div class="fw-medium">{{ t('shifts.types.hoursOnly') }}</div>
                        <small class="text-muted">{{ t('shifts.help.shiftType.hoursOnly') }}</small>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Required Hours (Hours-Only) -->
              @if (shiftForm.shiftType === ShiftType.HoursOnly) {
                <div class="col-md-6 mb-3">
                  <label for="requiredHours" class="form-label">
                    {{ t('shifts.requiredHours') }} <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      id="requiredHours"
                      [(ngModel)]="shiftForm.requiredHours"
                      name="requiredHours"
                      step="0.5"
                      min="0.5"
                      max="24"
                      required>
                    <span class="input-group-text">{{ t('shifts.hours') }}</span>
                  </div>
                  <div class="form-text">{{ t('shifts.help.requiredHours') }}</div>
                </div>
              }
            </div>

            <!-- Working Days Section -->
            <div class="row mb-4">
              <div class="col-12">
                <h5 class="card-title mb-3">{{ t('shifts.workingDays') }}</h5>
                <hr class="mt-0 mb-3">
              </div>

              <div class="col-12 mb-3">
                <div class="row">
                  <div class="col-md-3 col-6 mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="sunday"
                        [(ngModel)]="shiftForm.isSunday"
                        name="isSunday">
                      <label class="form-check-label" for="sunday">{{ t('common.days.sunday') }}</label>
                    </div>
                  </div>
                  <div class="col-md-3 col-6 mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="monday"
                        [(ngModel)]="shiftForm.isMonday"
                        name="isMonday">
                      <label class="form-check-label" for="monday">{{ t('common.days.monday') }}</label>
                    </div>
                  </div>
                  <div class="col-md-3 col-6 mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="tuesday"
                        [(ngModel)]="shiftForm.isTuesday"
                        name="isTuesday">
                      <label class="form-check-label" for="tuesday">{{ t('common.days.tuesday') }}</label>
                    </div>
                  </div>
                  <div class="col-md-3 col-6 mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="wednesday"
                        [(ngModel)]="shiftForm.isWednesday"
                        name="isWednesday">
                      <label class="form-check-label" for="wednesday">{{ t('common.days.wednesday') }}</label>
                    </div>
                  </div>
                  <div class="col-md-3 col-6 mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="thursday"
                        [(ngModel)]="shiftForm.isThursday"
                        name="isThursday">
                      <label class="form-check-label" for="thursday">{{ t('common.days.thursday') }}</label>
                    </div>
                  </div>
                  <div class="col-md-3 col-6 mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="friday"
                        [(ngModel)]="shiftForm.isFriday"
                        name="isFriday">
                      <label class="form-check-label" for="friday">{{ t('common.days.friday') }}</label>
                    </div>
                  </div>
                  <div class="col-md-3 col-6 mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="saturday"
                        [(ngModel)]="shiftForm.isSaturday"
                        name="isSaturday">
                      <label class="form-check-label" for="saturday">{{ t('common.days.saturday') }}</label>
                    </div>
                  </div>
                </div>
                <small class="text-muted">{{ t('shifts.help.workingDays') }}</small>
              </div>

              <!-- Night Shift -->
              <div class="col-12 mt-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="nightShift"
                    [(ngModel)]="shiftForm.isNightShift"
                    name="isNightShift"
                    (change)="onNightShiftChange()"
                    [disabled]="shiftForm.shiftType === ShiftType.HoursOnly">
                  <label class="form-check-label fw-medium" for="nightShift">
                    {{ t('shifts.isNightShift') }}
                  </label>
                </div>
                <small class="text-muted">{{ t('shifts.help.nightShift') }}</small>
                @if (shiftForm.shiftType === ShiftType.HoursOnly) {
                  <small class="text-warning d-block">{{ t('shifts.help.nightShiftDisabledHoursOnly') }}</small>
                }
              </div>
            </div>

            <!-- Work Periods Section (Time-Based Only) -->
            @if (shiftForm.shiftType === ShiftType.TimeBased) {
              <div class="row mb-4">
                <div class="col-12">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="card-title mb-0">{{ t('shifts.periods') }}</h5>
                    @if (shiftForm.shiftPeriods.length < 2) {
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-sm"
                        (click)="addShiftPeriod()">
                        <i class="bi bi-plus-circle me-1"></i>{{ t('shifts.addPeriod') }}
                      </button>
                    }
                  </div>
                  <hr class="mt-0 mb-3">

                  @for (period of shiftForm.shiftPeriods; track $index) {
                    <div class="card border mb-3">
                      <div class="card-header bg-light d-flex justify-content-between align-items-center py-2">
                        <span class="fw-medium">{{ t('shifts.period') }} {{ period.periodOrder }}</span>
                        <div class="d-flex align-items-center gap-2">
                          <span class="badge" [ngClass]="isNightShift(period.startTime, period.endTime) ? 'bg-info' : 'bg-primary'">
                            {{ getPeriodTypeText(period) }}
                          </span>
                          <span class="text-muted small">{{ formatHours(calculatePeriodHours(period.startTime, period.endTime)) }}</span>
                          @if (shiftForm.shiftPeriods.length > 1) {
                            <button
                              type="button"
                              class="btn btn-outline-danger btn-sm"
                              (click)="removeShiftPeriod($index)">
                              <i class="bi bi-trash"></i>
                            </button>
                          }
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-6">
                            <label class="form-label">{{ t('shifts.startTime') }}</label>
                            <input
                              type="time"
                              class="form-control"
                              [(ngModel)]="period.startTime"
                              [name]="'startTime_' + $index"
                              required>
                          </div>
                          <div class="col-md-6">
                            <label class="form-label">{{ t('shifts.endTime') }}</label>
                            <input
                              type="time"
                              class="form-control"
                              [(ngModel)]="period.endTime"
                              [name]="'endTime_' + $index"
                              required>
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                  <!-- Total Hours Display -->
                  <div class="alert alert-info d-flex align-items-center">
                    <i class="bi bi-info-circle me-2"></i>
                    <span>{{ t('shifts.totalHours') }}: <strong>{{ formatHours(getTotalShiftHours()) }}</strong></span>
                  </div>
                </div>
              </div>
            }

            <!-- Core Hours Section -->
            <div class="row mb-4">
              <div class="col-12">
                <h5 class="card-title mb-3">{{ t('shifts.coreHours') }}</h5>
                <hr class="mt-0 mb-3">
              </div>

              <!-- Enable Core Hours -->
              <div class="col-12 mb-3">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="hasCoreHours"
                    [(ngModel)]="shiftForm.hasCoreHours"
                    name="hasCoreHours"
                    (change)="onCoreHoursChange()">
                  <label class="form-check-label" for="hasCoreHours">
                    {{ t('shifts.hasCoreHours') }}
                  </label>
                </div>
                <div class="form-text">{{ t('shifts.help.coreHours') }}</div>
              </div>

              <!-- Core Hours Times -->
              @if (shiftForm.hasCoreHours) {
                <div class="col-md-6 mb-3">
                  <label for="coreStart" class="form-label">
                    {{ t('shifts.coreStart') }} <span class="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    class="form-control"
                    id="coreStart"
                    [(ngModel)]="shiftForm.coreStart"
                    name="coreStart"
                    required>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="coreEnd" class="form-label">
                    {{ t('shifts.coreEnd') }} <span class="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    class="form-control"
                    id="coreEnd"
                    [(ngModel)]="shiftForm.coreEnd"
                    name="coreEnd"
                    required>
                </div>
              }
            </div>

            <!-- Advanced Options Section -->
            <div class="row mb-4">
              <div class="col-12">
                <h5 class="card-title mb-3">{{ t('shifts.advancedOptions') }}</h5>
                <hr class="mt-0 mb-3">
              </div>

              <!-- Weekly Hours -->
              <div class="col-md-6 mb-3">
                <label for="requiredWeeklyHours" class="form-label">{{ t('shifts.requiredWeeklyHours') }}</label>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    id="requiredWeeklyHours"
                    [(ngModel)]="shiftForm.requiredWeeklyHours"
                    name="requiredWeeklyHours"
                    (ngModelChange)="onWeeklyHoursChange()"
                    step="0.5"
                    min="0"
                    max="168">
                  <span class="input-group-text">{{ t('shifts.hours') }}</span>
                </div>
                <div class="form-text">{{ t('shifts.help.requiredWeeklyHours') }}</div>
                @if (shiftForm.requiredWeeklyHours && shiftForm.requiredWeeklyHours > 0) {
                  <small class="text-info d-block">{{ t('shifts.help.weeklyHoursCoreRequired') }}</small>
                }
              </div>

              <!-- Check-in Required -->
              <div class="col-md-6 mb-3">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkInRequired"
                    [(ngModel)]="shiftForm.isCheckInRequired"
                    name="isCheckInRequired">
                  <label class="form-check-label" for="checkInRequired">
                    {{ t('shifts.checkInRequired') }}
                  </label>
                </div>
                <div class="form-text">{{ t('shifts.help.checkInRequired') }}</div>
              </div>

              <!-- Auto Check-out -->
              <div class="col-md-6 mb-3">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="autoCheckOut"
                    [(ngModel)]="shiftForm.isAutoCheckOut"
                    name="isAutoCheckOut">
                  <label class="form-check-label" for="autoCheckOut">
                    {{ t('shifts.autoCheckOut') }}
                  </label>
                </div>
                <div class="form-text">{{ t('shifts.help.autoCheckOut') }}</div>
              </div>

              <!-- Grace Period (Time-Based Only) -->
              @if (shiftForm.shiftType === ShiftType.TimeBased) {
                <div class="col-md-6 mb-3">
                  <label for="gracePeriod" class="form-label">{{ t('shifts.gracePeriodMinutes') }}</label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      id="gracePeriod"
                      [(ngModel)]="shiftForm.gracePeriodMinutes"
                      name="gracePeriodMinutes"
                      (ngModelChange)="onGracePeriodChange()"
                      [disabled]="shiftForm.allowFlexibleHours"
                      min="0"
                      max="120">
                    <span class="input-group-text">{{ t('common.minutes') }}</span>
                  </div>
                  <div class="form-text">{{ t('shifts.help.gracePeriod') }}</div>
                  @if (shiftForm.allowFlexibleHours) {
                    <small class="text-warning d-block">{{ t('shifts.help.gracePeriodDisabledFlexible') }}</small>
                  }
                </div>

                <!-- Flexible Hours -->
                <div class="col-12 mb-3">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexibleHours"
                      [(ngModel)]="shiftForm.allowFlexibleHours"
                      name="allowFlexibleHours"
                      (change)="onFlexibleHoursChange()">
                    <label class="form-check-label" for="flexibleHours">
                      {{ t('shifts.allowFlexibleHours') }}
                    </label>
                  </div>
                  <div class="form-text">{{ t('shifts.help.flexibleHours') }}</div>
                </div>

                @if (shiftForm.allowFlexibleHours) {
                  <div class="col-md-6 mb-3">
                    <label for="flexBefore" class="form-label">{{ t('shifts.flexMinutesBefore') }}</label>
                    <div class="input-group">
                      <input
                        type="number"
                        class="form-control"
                        id="flexBefore"
                        [(ngModel)]="shiftForm.flexMinutesBefore"
                        name="flexMinutesBefore"
                        min="1"
                        max="480">
                      <span class="input-group-text">{{ t('common.minutes') }}</span>
                    </div>
                    <div class="form-text">{{ t('shifts.help.flexBefore') }}</div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="flexAfter" class="form-label">{{ t('shifts.flexMinutesAfter') }}</label>
                    <div class="input-group">
                      <input
                        type="number"
                        class="form-control"
                        id="flexAfter"
                        [(ngModel)]="shiftForm.flexMinutesAfter"
                        name="flexMinutesAfter"
                        min="1"
                        max="480">
                      <span class="input-group-text">{{ t('common.minutes') }}</span>
                    </div>
                    <div class="form-text">{{ t('shifts.help.flexAfter') }}</div>
                  </div>
                }
              }
            </div>

            <!-- Validation Errors -->
            @if (!isFormValid() && shiftForm.name) {
              <div class="row mb-4">
                <div class="col-12">
                  <div class="alert alert-danger">
                    <div class="d-flex align-items-start">
                      <i class="bi bi-exclamation-triangle me-2 mt-1"></i>
                      <div>
                        <h6 class="alert-heading mb-2">{{ t('common.validationErrors') }}</h6>
                        @for (error of getFormErrors(); track error) {
                          <div class="mb-1">\u2022 {{ error }}</div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- Form Actions -->
            <div class="row">
              <div class="col-12">
                <hr class="mb-4">
                <div class="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    (click)="onCancel()"
                    [disabled]="submitting()">
                    {{ t('common.cancel') }}
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="!isFormValid() || submitting()">
                    @if (submitting()) {
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {{ t('shifts.loading.creating') }}
                    } @else {
                      <i class="bi bi-check-circle me-2"></i>{{ t('shifts.create') }}
                    }
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</div>`, styles: ['/* src/app/pages/shifts/create-shift/create-shift.component.css */\n.create-shift-container {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 24px;\n}\n.page-header {\n  margin-bottom: 32px;\n}\n.page-title {\n  font-size: 2rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 8px;\n}\n.page-subtitle {\n  color: #6b7280;\n  font-size: 1rem;\n}\n.form-card {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  margin-bottom: 24px;\n}\n.form-section {\n  padding: 24px;\n  border-bottom: 1px solid #f3f4f6;\n}\n.form-section:last-child {\n  border-bottom: none;\n}\n.section-title {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 16px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.section-icon {\n  width: 20px;\n  height: 20px;\n  color: #3b82f6;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.form-row.full-width {\n  grid-template-columns: 1fr;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-label {\n  font-weight: 500;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.form-label.required::after {\n  content: " *";\n  color: #ef4444;\n}\n.form-input,\n.form-select,\n.form-textarea {\n  padding: 10px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  transition: all 0.2s ease;\n  background-color: white;\n}\n.form-input:focus,\n.form-select:focus,\n.form-textarea:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n.checkbox-group {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.checkbox-input {\n  width: 16px;\n  height: 16px;\n  accent-color: #3b82f6;\n}\n.checkbox-label {\n  font-size: 0.875rem;\n  color: #374151;\n  cursor: pointer;\n}\n.working-days-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 12px;\n  margin-top: 12px;\n}\n.day-checkbox {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background-color: #f9fafb;\n  transition: all 0.2s ease;\n}\n.day-checkbox:hover {\n  background-color: #f3f4f6;\n}\n.day-checkbox input:checked + .day-checkbox,\n.day-checkbox.active {\n  background-color: #eff6ff;\n  border-color: #3b82f6;\n}\n.shift-periods {\n  margin-top: 16px;\n}\n.period-card {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  background-color: #f9fafb;\n}\n.period-header {\n  display: flex;\n  justify-content: between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.period-title {\n  font-weight: 500;\n  color: #374151;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.period-type {\n  font-size: 0.75rem;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-weight: 500;\n}\n.period-type.day {\n  background-color: #fef3c7;\n  color: #92400e;\n}\n.period-type.night {\n  background-color: #e0e7ff;\n  color: #3730a3;\n}\n.remove-period-btn {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n  padding: 6px 12px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.remove-period-btn:hover {\n  background-color: #fee2e2;\n  border-color: #fca5a5;\n}\n.add-period-btn {\n  background: #f0f9ff;\n  color: #0369a1;\n  border: 1px solid #bae6fd;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.add-period-btn:hover {\n  background-color: #e0f2fe;\n  border-color: #7dd3fc;\n}\n.add-period-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.time-inputs {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 8px;\n}\n.period-info {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin-top: 4px;\n}\n.shift-summary {\n  background:\n    linear-gradient(\n      135deg,\n      #f0f9ff 0%,\n      #e0f2fe 100%);\n  border: 1px solid #0ea5e9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-top: 16px;\n}\n.summary-title {\n  font-weight: 600;\n  color: #0c4a6e;\n  margin-bottom: 8px;\n  font-size: 0.875rem;\n}\n.summary-item {\n  display: flex;\n  justify-content: space-between;\n  padding: 4px 0;\n  font-size: 0.875rem;\n}\n.summary-label {\n  color: #374151;\n}\n.summary-value {\n  font-weight: 500;\n  color: #0c4a6e;\n}\n.form-errors {\n  background-color: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 6px;\n  padding: 12px;\n  margin-bottom: 20px;\n}\n.error-title {\n  color: #dc2626;\n  font-weight: 500;\n  margin-bottom: 8px;\n  font-size: 0.875rem;\n}\n.error-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.error-item {\n  color: #dc2626;\n  font-size: 0.875rem;\n  padding: 2px 0;\n}\n.error-item::before {\n  content: "\\2022";\n  margin-right: 8px;\n}\n.form-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  padding-top: 16px;\n  border-top: 1px solid #f3f4f6;\n  margin-top: 24px;\n}\n.btn {\n  padding: 10px 20px;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  border: 1px solid;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-primary {\n  background-color: #3b82f6;\n  border-color: #3b82f6;\n  color: white;\n}\n.btn-primary:hover:not(:disabled) {\n  background-color: #2563eb;\n  border-color: #2563eb;\n}\n.btn-secondary {\n  background-color: white;\n  border-color: #d1d5db;\n  color: #374151;\n}\n.btn-secondary:hover:not(:disabled) {\n  background-color: #f9fafb;\n  border-color: #9ca3af;\n}\n.loading-spinner {\n  width: 16px;\n  height: 16px;\n  border: 2px solid transparent;\n  border-top: 2px solid currentColor;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.help-text {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin-top: 4px;\n  line-height: 1.4;\n}\n.info-badge {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  display: inline-block;\n}\n@media (max-width: 768px) {\n  .create-shift-container {\n    padding: 16px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .time-inputs {\n    grid-template-columns: 1fr;\n  }\n  .working-days-grid {\n    grid-template-columns: 1fr;\n  }\n  .form-actions {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=create-shift.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateShiftComponent, { className: "CreateShiftComponent", filePath: "src/app/pages/shifts/create-shift/create-shift.component.ts", lineNumber: 21 });
})();
export {
  CreateShiftComponent
};
//# sourceMappingURL=chunk-OW3YWCWL.js.map
