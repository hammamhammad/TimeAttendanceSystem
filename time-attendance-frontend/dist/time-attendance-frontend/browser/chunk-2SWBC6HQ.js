import {
  ShiftStatus,
  ShiftType
} from "./chunk-ICLZUHFB.js";
import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  SearchableSelectComponent
} from "./chunk-YVOT2QSR.js";
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
  ActivatedRoute,
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
  ɵɵpureFunction0,
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

// src/app/pages/shifts/edit-shift/edit-shift.component.ts
var _c0 = /* @__PURE__ */ __name(() => ({ standalone: true }), "_c0");
function EditShiftComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 7)(2, "div", 8)(3, "span", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("common.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.loading.shift"));
  }
}
__name(EditShiftComponent_Conditional_4_Template, "EditShiftComponent_Conditional_4_Template");
function EditShiftComponent_Conditional_5_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 57)(6, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_46_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.requiredHours, $event) || (ctx_r0.shiftForm.requiredHours = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Conditional_46_Template_input_ngModelChange_6_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 59);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 55);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.requiredHours"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.requiredHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.hours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.requiredHours"));
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_46_Template, "EditShiftComponent_Conditional_5_Conditional_46_Template");
function EditShiftComponent_Conditional_5_Conditional_98_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 76);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_98_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.addShiftPeriod());
    }, "EditShiftComponent_Conditional_5_Conditional_98_Conditional_5_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 77);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.t("shifts.addPeriod"), " ");
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_98_Conditional_5_Template, "EditShiftComponent_Conditional_5_Conditional_98_Conditional_5_Template");
function EditShiftComponent_Conditional_5_Conditional_98_For_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 86);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_98_For_8_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const $index_r7 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeShiftPeriod($index_r7));
    }, "EditShiftComponent_Conditional_5_Conditional_98_For_8_Conditional_9_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 87);
    \u0275\u0275elementEnd();
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_98_For_8_Conditional_9_Template, "EditShiftComponent_Conditional_5_Conditional_98_For_8_Conditional_9_Template");
function EditShiftComponent_Conditional_5_Conditional_98_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73)(1, "div", 78)(2, "span", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 79)(5, "span", 80);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 81);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, EditShiftComponent_Conditional_5_Conditional_98_For_8_Conditional_9_Template, 2, 0, "button", 82);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 83)(11, "div", 2)(12, "div", 25)(13, "label", 84);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 85);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_98_For_8_Template_input_ngModelChange_15_listener($event) {
      const period_r8 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(period_r8.startTime, $event) || (period_r8.startTime = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Conditional_98_For_8_Template_input_ngModelChange_15_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 25)(17, "label", 84);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 85);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_98_For_8_Template_input_ngModelChange_19_listener($event) {
      const period_r8 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(period_r8.endTime, $event) || (period_r8.endTime = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Conditional_98_For_8_Template_input_ngModelChange_19_listener"));
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const period_r8 = ctx.$implicit;
    const $index_r7 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.t("shifts.period"), " ", period_r8.periodOrder);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r0.isNightShift(period_r8.startTime, period_r8.endTime) ? "bg-info" : "bg-primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getPeriodTypeText(period_r8), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatHours(ctx_r0.calculatePeriodHours(period_r8.startTime, period_r8.endTime)));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftForm.shiftPeriods.length > 1 ? 9 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.startTime"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", period_r8.startTime);
    \u0275\u0275property("name", "startTime_" + $index_r7);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.endTime"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", period_r8.endTime);
    \u0275\u0275property("name", "endTime_" + $index_r7);
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_98_For_8_Template, "EditShiftComponent_Conditional_5_Conditional_98_For_8_Template");
function EditShiftComponent_Conditional_5_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 3)(2, "div", 70)(3, "h5", 71);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, EditShiftComponent_Conditional_5_Conditional_98_Conditional_5_Template, 3, 1, "button", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "hr", 15);
    \u0275\u0275repeaterCreate(7, EditShiftComponent_Conditional_5_Conditional_98_For_8_Template, 20, 12, "div", 73, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(9, "div", 74);
    \u0275\u0275element(10, "i", 75);
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.periods"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftForm.shiftPeriods.length < 2 ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.shiftForm.shiftPeriods);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.t("shifts.totalHours"), ": ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatHours(ctx_r0.getTotalShiftHours()));
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_98_Template, "EditShiftComponent_Conditional_5_Conditional_98_Template");
function EditShiftComponent_Conditional_5_Conditional_111_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 88);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 89);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_111_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.coreStart, $event) || (ctx_r0.shiftForm.coreStart = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Conditional_111_Template_input_ngModelChange_5_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 16)(7, "label", 90);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 18);
    \u0275\u0275text(10, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "input", 91);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_111_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.coreEnd, $event) || (ctx_r0.shiftForm.coreEnd = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Conditional_111_Template_input_ngModelChange_11_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.coreStart"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.coreStart);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.coreEnd"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.coreEnd);
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_111_Template, "EditShiftComponent_Conditional_5_Conditional_111_Template");
function EditShiftComponent_Conditional_5_Conditional_140_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 96);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 57)(4, "input", 97);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_140_Conditional_16_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.flexMinutesBefore, $event) || (ctx_r0.shiftForm.flexMinutesBefore = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Conditional_140_Conditional_16_Template_input_ngModelChange_4_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 59);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 55);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 16)(10, "label", 98);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 57)(13, "input", 99);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_140_Conditional_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.flexMinutesAfter, $event) || (ctx_r0.shiftForm.flexMinutesAfter = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Conditional_140_Conditional_16_Template_input_ngModelChange_13_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 59);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 55);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.flexMinutesBefore"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.flexMinutesBefore);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.flexBefore"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.flexMinutesAfter"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.flexMinutesAfter);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.flexAfter"));
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_140_Conditional_16_Template, "EditShiftComponent_Conditional_5_Conditional_140_Conditional_16_Template");
function EditShiftComponent_Conditional_5_Conditional_140_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 92);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 57)(4, "input", 93);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_140_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.gracePeriodMinutes, $event) || (ctx_r0.shiftForm.gracePeriodMinutes = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Conditional_140_Template_input_ngModelChange_4_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_140_Template_input_ngModelChange_4_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onGracePeriodChange());
    }, "EditShiftComponent_Conditional_5_Conditional_140_Template_input_ngModelChange_4_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 59);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 55);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 22)(10, "div", 52)(11, "input", 94);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_140_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.allowFlexibleHours, $event) || (ctx_r0.shiftForm.allowFlexibleHours = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Conditional_140_Template_input_ngModelChange_11_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Conditional_140_Template_input_change_11_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onFlexibleHoursChange());
    }, "EditShiftComponent_Conditional_5_Conditional_140_Template_input_change_11_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "label", 95);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 55);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, EditShiftComponent_Conditional_5_Conditional_140_Conditional_16_Template, 18, 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.gracePeriodMinutes"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.gracePeriodMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.gracePeriod"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.allowFlexibleHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.allowFlexibleHours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.flexibleHours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftForm.allowFlexibleHours ? 16 : -1);
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_140_Template, "EditShiftComponent_Conditional_5_Conditional_140_Template");
function EditShiftComponent_Conditional_5_Conditional_141_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 104);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const error_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", error_r12);
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_141_For_9_Template, "EditShiftComponent_Conditional_5_Conditional_141_For_9_Template");
function EditShiftComponent_Conditional_5_Conditional_141_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 3)(2, "div", 100)(3, "div", 101);
    \u0275\u0275element(4, "i", 102);
    \u0275\u0275elementStart(5, "div")(6, "h6", 103);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, EditShiftComponent_Conditional_5_Conditional_141_For_9_Template, 2, 1, "div", 104, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.t("common.validationErrors"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.getFormErrors());
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_141_Template, "EditShiftComponent_Conditional_5_Conditional_141_Template");
function EditShiftComponent_Conditional_5_Conditional_149_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 105);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.loading.updating"), " ");
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_149_Template, "EditShiftComponent_Conditional_5_Conditional_149_Template");
function EditShiftComponent_Conditional_5_Conditional_150_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 106);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.t("shifts.update"), " ");
  }
}
__name(EditShiftComponent_Conditional_5_Conditional_150_Template, "EditShiftComponent_Conditional_5_Conditional_150_Template");
function EditShiftComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 11)(2, "form", 12, 0);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "EditShiftComponent_Conditional_5_Template_form_ngSubmit_2_listener"));
    \u0275\u0275elementStart(4, "div", 13)(5, "div", 3)(6, "h5", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "hr", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 16)(10, "label", 17);
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "span", 18);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.name, $event) || (ctx_r0.shiftForm.name = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_14_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 16)(16, "label", 20);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "app-searchable-select", 21);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_app_searchable_select_selectionChange_18_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onStatusSelectionChange($event));
    }, "EditShiftComponent_Conditional_5_Template_app_searchable_select_selectionChange_18_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 22)(20, "label", 23);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "textarea", 24);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_textarea_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.description, $event) || (ctx_r0.shiftForm.description = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_textarea_ngModelChange_22_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 13)(24, "div", 3)(25, "h5", 14);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "hr", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 22)(29, "div", 2)(30, "div", 25)(31, "div", 26)(32, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.shiftType, $event) || (ctx_r0.shiftForm.shiftType = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_32_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_change_32_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onShiftTypeChange());
    }, "EditShiftComponent_Conditional_5_Template_input_change_32_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "label", 28)(34, "div", 29);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "small", 30);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(38, "div", 25)(39, "div", 26)(40, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.shiftType, $event) || (ctx_r0.shiftForm.shiftType = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_40_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_change_40_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onShiftTypeChange());
    }, "EditShiftComponent_Conditional_5_Template_input_change_40_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "label", 32)(42, "div", 29);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "small", 30);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275conditionalCreate(46, EditShiftComponent_Conditional_5_Conditional_46_Template, 11, 4, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 13)(48, "div", 3)(49, "h5", 14);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "hr", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 22)(53, "div", 2)(54, "div", 33)(55, "div", 34)(56, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isSunday, $event) || (ctx_r0.shiftForm.isSunday = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_56_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "label", 36);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 33)(60, "div", 34)(61, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isMonday, $event) || (ctx_r0.shiftForm.isMonday = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_61_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "label", 38);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "div", 33)(65, "div", 34)(66, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_66_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isTuesday, $event) || (ctx_r0.shiftForm.isTuesday = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_66_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "label", 40);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "div", 33)(70, "div", 34)(71, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isWednesday, $event) || (ctx_r0.shiftForm.isWednesday = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_71_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "label", 42);
    \u0275\u0275text(73);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(74, "div", 33)(75, "div", 34)(76, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_76_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isThursday, $event) || (ctx_r0.shiftForm.isThursday = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_76_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "label", 44);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(79, "div", 33)(80, "div", 34)(81, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_81_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isFriday, $event) || (ctx_r0.shiftForm.isFriday = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_81_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "label", 46);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(84, "div", 33)(85, "div", 34)(86, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_86_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isSaturday, $event) || (ctx_r0.shiftForm.isSaturday = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_86_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "label", 48);
    \u0275\u0275text(88);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(89, "small", 30);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 49)(92, "div", 34)(93, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_93_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isNightShift, $event) || (ctx_r0.shiftForm.isNightShift = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_93_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "label", 51);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "small", 30);
    \u0275\u0275text(97);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(98, EditShiftComponent_Conditional_5_Conditional_98_Template, 15, 4, "div", 13);
    \u0275\u0275elementStart(99, "div", 13)(100, "div", 3)(101, "h5", 14);
    \u0275\u0275text(102);
    \u0275\u0275elementEnd();
    \u0275\u0275element(103, "hr", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(104, "div", 22)(105, "div", 52)(106, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_106_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.hasCoreHours, $event) || (ctx_r0.shiftForm.hasCoreHours = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_106_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_change_106_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCoreHoursChange());
    }, "EditShiftComponent_Conditional_5_Template_input_change_106_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "label", 54);
    \u0275\u0275text(108);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(109, "div", 55);
    \u0275\u0275text(110);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(111, EditShiftComponent_Conditional_5_Conditional_111_Template, 12, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(112, "div", 13)(113, "div", 3)(114, "h5", 14);
    \u0275\u0275text(115);
    \u0275\u0275elementEnd();
    \u0275\u0275element(116, "hr", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(117, "div", 16)(118, "label", 56);
    \u0275\u0275text(119);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "div", 57)(121, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_121_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.requiredWeeklyHours, $event) || (ctx_r0.shiftForm.requiredWeeklyHours = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_121_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "span", 59);
    \u0275\u0275text(123);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(124, "div", 55);
    \u0275\u0275text(125);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(126, "div", 16)(127, "div", 52)(128, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_128_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isCheckInRequired, $event) || (ctx_r0.shiftForm.isCheckInRequired = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_128_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(129, "label", 61);
    \u0275\u0275text(130);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(131, "div", 55);
    \u0275\u0275text(132);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(133, "div", 16)(134, "div", 52)(135, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_input_ngModelChange_135_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.shiftForm.isAutoCheckOut, $event) || (ctx_r0.shiftForm.isAutoCheckOut = $event);
      return \u0275\u0275resetView($event);
    }, "EditShiftComponent_Conditional_5_Template_input_ngModelChange_135_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(136, "label", 63);
    \u0275\u0275text(137);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(138, "div", 55);
    \u0275\u0275text(139);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(140, EditShiftComponent_Conditional_5_Conditional_140_Template, 17, 8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(141, EditShiftComponent_Conditional_5_Conditional_141_Template, 10, 1, "div", 13);
    \u0275\u0275elementStart(142, "div", 2)(143, "div", 3);
    \u0275\u0275element(144, "hr", 64);
    \u0275\u0275elementStart(145, "div", 65)(146, "button", 66);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditShiftComponent_Conditional_5_Template_button_click_146_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditShiftComponent_Conditional_5_Template_button_click_146_listener"));
    \u0275\u0275text(147);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(148, "button", 67);
    \u0275\u0275conditionalCreate(149, EditShiftComponent_Conditional_5_Conditional_149_Template, 2, 1)(150, EditShiftComponent_Conditional_5_Conditional_150_Template, 2, 1);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.t("common.basicInformation"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx_r0.t("shifts.namePlaceholder")));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.fields.status"));
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx_r0.statusSelectOptions)("ngModel", ctx_r0.shiftForm.status.toString())("ngModelOptions", \u0275\u0275pureFunction0(67, _c0))("searchable", false)("clearable", false);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.description"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx_r0.t("shifts.descriptionPlaceholder")));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.type"));
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r0.ShiftType.TimeBased);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.shiftType);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.types.timeBased"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.shiftType.timeBased"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r0.ShiftType.HoursOnly);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.shiftType);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.types.hoursOnly"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.shiftType.hoursOnly"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftForm.shiftType === ctx_r0.ShiftType.HoursOnly ? 46 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.workingDays"));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isSunday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.days.sunday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isMonday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.days.monday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isTuesday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.days.tuesday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isWednesday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.days.wednesday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isThursday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.days.thursday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isFriday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.days.friday"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isSaturday);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.days.saturday"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.workingDays"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isNightShift);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.isNightShift"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.nightShift"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftForm.shiftType === ctx_r0.ShiftType.TimeBased ? 98 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.coreHours"));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.hasCoreHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.hasCoreHours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.coreHours"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftForm.hasCoreHours ? 111 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.advancedOptions"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.requiredWeeklyHours"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.requiredWeeklyHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.hours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.requiredWeeklyHours"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isCheckInRequired);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.checkInRequired"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.checkInRequired"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shiftForm.isAutoCheckOut);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("shifts.autoCheckOut"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("shifts.help.autoCheckOut"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftForm.shiftType === ctx_r0.ShiftType.TimeBased ? 140 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isFormValid() && ctx_r0.shiftForm.name ? 141 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.isFormValid() || ctx_r0.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.submitting() ? 149 : 150);
  }
}
__name(EditShiftComponent_Conditional_5_Template, "EditShiftComponent_Conditional_5_Template");
var _EditShiftComponent = class _EditShiftComponent {
  shiftsService = inject(ShiftsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  i18n = inject(I18nService);
  // Enum references for template
  ShiftType = ShiftType;
  ShiftStatus = ShiftStatus;
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  shiftId = signal(0, ...ngDevMode ? [{ debugName: "shiftId" }] : []);
  originalShift = signal(null, ...ngDevMode ? [{ debugName: "originalShift" }] : []);
  // Form state
  shiftForm = {
    name: "",
    description: "",
    shiftType: ShiftType.TimeBased,
    status: ShiftStatus.Active,
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
    // Working Days
    isSunday: false,
    isMonday: true,
    isTuesday: true,
    isWednesday: true,
    isThursday: true,
    isFriday: true,
    isSaturday: false,
    isNightShift: false,
    shiftPeriods: []
  };
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.shiftId.set(parseInt(id, 10));
      this.loadShift();
    } else {
      this.router.navigate(["/shifts"]);
    }
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadShift() {
    this.loading.set(true);
    this.shiftsService.getShiftById(this.shiftId()).subscribe({
      next: /* @__PURE__ */ __name((shift) => {
        console.log("\u{1F50D} DEBUG: Raw shift data from API:", shift);
        console.log("\u{1F50D} DEBUG: Shift status value:", shift.status);
        console.log("\u{1F50D} DEBUG: Working days:", {
          isSunday: shift.isSunday,
          isMonday: shift.isMonday,
          isTuesday: shift.isTuesday,
          isWednesday: shift.isWednesday,
          isThursday: shift.isThursday,
          isFriday: shift.isFriday,
          isSaturday: shift.isSaturday
        });
        this.originalShift.set(shift);
        this.populateForm(shift);
        console.log("\u{1F50D} DEBUG: Form after population:", this.shiftForm);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load shift:", error);
        this.loading.set(false);
        this.router.navigate(["/shifts"]);
      }, "error")
    });
  }
  populateForm(shift) {
    this.shiftForm.name = shift.name;
    this.shiftForm.description = shift.description || "";
    this.shiftForm.shiftType = shift.shiftType;
    this.shiftForm.status = shift.status;
    if (shift.shiftType === ShiftType.TimeBased) {
      this.shiftForm.requiredHours = void 0;
    } else {
      this.shiftForm.requiredHours = shift.requiredHours;
    }
    this.shiftForm.isCheckInRequired = shift.isCheckInRequired;
    this.shiftForm.isAutoCheckOut = shift.isAutoCheckOut;
    this.shiftForm.allowFlexibleHours = shift.allowFlexibleHours;
    this.shiftForm.flexMinutesBefore = shift.flexMinutesBefore;
    this.shiftForm.flexMinutesAfter = shift.flexMinutesAfter;
    this.shiftForm.gracePeriodMinutes = shift.gracePeriodMinutes;
    this.shiftForm.requiredWeeklyHours = shift.requiredWeeklyHours && shift.requiredWeeklyHours > 0 ? shift.requiredWeeklyHours : void 0;
    this.shiftForm.hasCoreHours = shift.hasCoreHours;
    this.shiftForm.coreStart = shift.coreStart || "";
    this.shiftForm.coreEnd = shift.coreEnd || "";
    this.shiftForm.isSunday = shift.isSunday;
    this.shiftForm.isMonday = shift.isMonday;
    this.shiftForm.isTuesday = shift.isTuesday;
    this.shiftForm.isWednesday = shift.isWednesday;
    this.shiftForm.isThursday = shift.isThursday;
    this.shiftForm.isFriday = shift.isFriday;
    this.shiftForm.isSaturday = shift.isSaturday;
    this.shiftForm.isNightShift = shift.isNightShift;
    this.shiftForm.shiftPeriods = shift.shiftType === ShiftType.TimeBased ? shift.shiftPeriods?.map((sp) => ({
      id: sp.id,
      periodOrder: sp.periodOrder,
      startTime: sp.startTime,
      endTime: sp.endTime
    })) || [] : [];
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
  formatTimeWithSeconds(timeString) {
    if (!timeString)
      return "";
    if (timeString.includes(":") && timeString.split(":").length === 3) {
      return timeString;
    }
    return timeString.length === 5 ? `${timeString}:00` : timeString;
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
  getShiftStatusText(status) {
    switch (status) {
      case ShiftStatus.Active:
        return this.t("shifts.status.active");
      case ShiftStatus.Inactive:
        return this.t("shifts.status.inactive");
      case ShiftStatus.Draft:
        return this.t("shifts.status.draft");
      case ShiftStatus.Archived:
        return this.t("shifts.status.archived");
      default:
        return this.t("shifts.status.active");
    }
  }
  get statusSelectOptions() {
    return [
      { value: ShiftStatus.Active.toString(), label: this.getShiftStatusText(ShiftStatus.Active) },
      { value: ShiftStatus.Inactive.toString(), label: this.getShiftStatusText(ShiftStatus.Inactive) },
      { value: ShiftStatus.Draft.toString(), label: this.getShiftStatusText(ShiftStatus.Draft) },
      { value: ShiftStatus.Archived.toString(), label: this.getShiftStatusText(ShiftStatus.Archived) }
    ];
  }
  onStatusSelectionChange(statusStr) {
    const status = statusStr ? parseInt(statusStr) : ShiftStatus.Active;
    this.shiftForm.status = status;
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
    }
    if (this.shiftForm.allowFlexibleHours && this.shiftForm.gracePeriodMinutes && this.shiftForm.gracePeriodMinutes > 0) {
      errors.push(this.t("shifts.validation.flexible.noGracePeriod"));
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
      status: this.shiftForm.status,
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
      coreStart: this.shiftForm.hasCoreHours ? this.formatTimeWithSeconds(this.shiftForm.coreStart) : void 0,
      coreEnd: this.shiftForm.hasCoreHours ? this.formatTimeWithSeconds(this.shiftForm.coreEnd) : void 0,
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
        id: sp.id,
        periodOrder: sp.periodOrder,
        startTime: this.formatTimeWithSeconds(sp.startTime),
        endTime: this.formatTimeWithSeconds(sp.endTime)
      })) : void 0
    };
    this.shiftsService.updateShift(this.shiftId(), request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.router.navigate(["/shifts"]);
        this.submitting.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to update shift:", error);
        this.submitting.set(false);
      }, "error")
    });
  }
  onCancel() {
    this.router.navigate(["/shifts"]);
  }
};
__name(_EditShiftComponent, "EditShiftComponent");
__publicField(_EditShiftComponent, "\u0275fac", /* @__PURE__ */ __name(function EditShiftComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditShiftComponent)();
}, "EditShiftComponent_Factory"));
__publicField(_EditShiftComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditShiftComponent, selectors: [["app-edit-shift"]], decls: 6, vars: 4, consts: [["formRef", "ngForm"], [1, "container-fluid", "px-4"], [1, "row"], [1, "col-12"], ["mode", "edit", "moduleName", "shifts", "moduleRoute", "shifts", 3, "title", "entityId", "loading"], [1, "d-flex", "justify-content-center", "align-items-center", 2, "height", "400px"], [1, "card", "border-0", "shadow-sm"], [1, "text-center"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-3", "text-muted"], [1, "card-body", "p-4"], [3, "ngSubmit"], [1, "row", "mb-4"], [1, "card-title", "mb-3"], [1, "mt-0", "mb-3"], [1, "col-md-6", "mb-3"], ["for", "name", 1, "form-label"], [1, "text-danger"], ["type", "text", "id", "name", "name", "name", "required", "", "maxlength", "200", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], ["for", "status", 1, "form-label"], [3, "selectionChange", "options", "ngModel", "ngModelOptions", "searchable", "clearable"], [1, "col-12", "mb-3"], ["for", "description", 1, "form-label"], ["id", "description", "name", "description", "rows", "3", "maxlength", "1000", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], [1, "col-md-6"], [1, "form-check", "p-3", "border", "rounded"], ["type", "radio", "name", "shiftType", "id", "timeBased", 1, "form-check-input", 3, "ngModelChange", "change", "value", "ngModel"], ["for", "timeBased", 1, "form-check-label", "w-100"], [1, "fw-medium"], [1, "text-muted"], ["type", "radio", "name", "shiftType", "id", "hoursOnly", 1, "form-check-input", 3, "ngModelChange", "change", "value", "ngModel"], ["for", "hoursOnly", 1, "form-check-label", "w-100"], [1, "col-md-3", "col-6", "mb-2"], [1, "form-check"], ["type", "checkbox", "id", "sunday", "name", "isSunday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "sunday", 1, "form-check-label"], ["type", "checkbox", "id", "monday", "name", "isMonday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "monday", 1, "form-check-label"], ["type", "checkbox", "id", "tuesday", "name", "isTuesday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "tuesday", 1, "form-check-label"], ["type", "checkbox", "id", "wednesday", "name", "isWednesday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "wednesday", 1, "form-check-label"], ["type", "checkbox", "id", "thursday", "name", "isThursday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "thursday", 1, "form-check-label"], ["type", "checkbox", "id", "friday", "name", "isFriday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "friday", 1, "form-check-label"], ["type", "checkbox", "id", "saturday", "name", "isSaturday", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "saturday", 1, "form-check-label"], [1, "col-12", "mt-3"], ["type", "checkbox", "id", "nightShift", "name", "isNightShift", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "nightShift", 1, "form-check-label", "fw-medium"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "hasCoreHours", "name", "hasCoreHours", 1, "form-check-input", 3, "ngModelChange", "change", "ngModel"], ["for", "hasCoreHours", 1, "form-check-label"], [1, "form-text"], ["for", "requiredWeeklyHours", 1, "form-label"], [1, "input-group"], ["type", "number", "id", "requiredWeeklyHours", "name", "requiredWeeklyHours", "step", "0.5", "min", "0", "max", "168", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "input-group-text"], ["type", "checkbox", "id", "checkInRequired", "name", "isCheckInRequired", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "checkInRequired", 1, "form-check-label"], ["type", "checkbox", "id", "autoCheckOut", "name", "isAutoCheckOut", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "autoCheckOut", 1, "form-check-label"], [1, "mb-4"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["for", "requiredHours", 1, "form-label"], ["type", "number", "id", "requiredHours", "name", "requiredHours", "step", "0.5", "min", "0.5", "max", "24", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "card-title", "mb-0"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm"], [1, "card", "border", "mb-3"], [1, "alert", "alert-info", "d-flex", "align-items-center"], [1, "bi", "bi-info-circle", "me-2"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", 3, "click"], [1, "bi", "bi-plus-circle", "me-1"], [1, "card-header", "bg-light", "d-flex", "justify-content-between", "align-items-center", "py-2"], [1, "d-flex", "align-items-center", "gap-2"], [1, "badge", 3, "ngClass"], [1, "text-muted", "small"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm"], [1, "card-body"], [1, "form-label"], ["type", "time", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel", "name"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "bi", "bi-trash"], ["for", "coreStart", 1, "form-label"], ["type", "time", "id", "coreStart", "name", "coreStart", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "coreEnd", 1, "form-label"], ["type", "time", "id", "coreEnd", "name", "coreEnd", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "gracePeriod", 1, "form-label"], ["type", "number", "id", "gracePeriod", "name", "gracePeriodMinutes", "min", "0", "max", "120", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "id", "flexibleHours", "name", "allowFlexibleHours", 1, "form-check-input", 3, "ngModelChange", "change", "ngModel"], ["for", "flexibleHours", 1, "form-check-label"], ["for", "flexBefore", 1, "form-label"], ["type", "number", "id", "flexBefore", "name", "flexMinutesBefore", "min", "1", "max", "480", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "flexAfter", 1, "form-label"], ["type", "number", "id", "flexAfter", "name", "flexMinutesAfter", "min", "1", "max", "480", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "alert", "alert-danger"], [1, "d-flex", "align-items-start"], [1, "bi", "bi-exclamation-triangle", "me-2", "mt-1"], [1, "alert-heading", "mb-2"], [1, "mb-1"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "bi", "bi-check-circle", "me-2"]], template: /* @__PURE__ */ __name(function EditShiftComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
    \u0275\u0275element(3, "app-form-header", 4);
    \u0275\u0275conditionalCreate(4, EditShiftComponent_Conditional_4_Template, 7, 2, "div", 5)(5, EditShiftComponent_Conditional_5_Template, 151, 68, "div", 6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx.t("shifts.edit"))("entityId", ctx.shiftId())("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 4 : 5);
  }
}, "EditShiftComponent_Template"), dependencies: [CommonModule, NgClass, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, MinValidator, MaxValidator, NgModel, NgForm, SearchableSelectComponent, FormHeaderComponent], styles: ["\n\n.form-check.p-3.border[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.form-check.p-3.border[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 123, 255, 0.05);\n  border-color: var(--bs-primary) !important;\n}\n.form-check-input[_ngcontent-%COMP%]:checked    ~ .form-check-label[_ngcontent-%COMP%] {\n  color: var(--bs-primary);\n}\n.card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75em;\n}\n.alert-info[_ngcontent-%COMP%] {\n  background-color: rgba(13, 202, 240, 0.1);\n  border-color: rgba(13, 202, 240, 0.2);\n  color: #055160;\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.btn-outline-danger.btn-sm[_ngcontent-%COMP%] {\n  --bs-btn-padding-y: 0.25rem;\n  --bs-btn-padding-x: 0.5rem;\n  --bs-btn-font-size: 0.875rem;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.form-control[_ngcontent-%COMP%]:invalid {\n  border-color: #dc3545;\n}\n.form-control[_ngcontent-%COMP%]:valid {\n  border-color: #198754;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1.5rem !important;\n  }\n}\n/*# sourceMappingURL=edit-shift.component.css.map */"] }));
var EditShiftComponent = _EditShiftComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditShiftComponent, [{
    type: Component,
    args: [{ selector: "app-edit-shift", standalone: true, imports: [CommonModule, FormsModule, SearchableSelectComponent, FormHeaderComponent], template: `<div class="container-fluid px-4">
  <div class="row">
    <div class="col-12">
      <app-form-header
        mode="edit"
        [title]="t('shifts.edit')"
        moduleName="shifts"
        moduleRoute="shifts"
        [entityId]="shiftId()"
        [loading]="submitting()">
      </app-form-header>

      <!-- Loading State -->
      @if (loading()) {
        <div class="d-flex justify-content-center align-items-center" style="height: 400px;">
          <div class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">{{ t('common.loading') }}</span>
            </div>
            <div class="mt-3 text-muted">{{ t('shifts.loading.shift') }}</div>
          </div>
        </div>
      } @else {

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

                <!-- Status Field (Edit Only) -->
                <div class="col-md-6 mb-3">
                  <label for="status" class="form-label">{{ t('shifts.fields.status') }}</label>
                  <app-searchable-select
                    [options]="statusSelectOptions"
                    [ngModel]="shiftForm.status.toString()"
                    [ngModelOptions]="{standalone: true}"
                    (selectionChange)="onStatusSelectionChange($event)"
                    [searchable]="false"
                    [clearable]="false"
                  ></app-searchable-select>
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
                      name="isNightShift">
                    <label class="form-check-label fw-medium" for="nightShift">
                      {{ t('shifts.isNightShift') }}
                    </label>
                  </div>
                  <small class="text-muted">{{ t('shifts.help.nightShift') }}</small>
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
                      step="0.5"
                      min="0"
                      max="168">
                    <span class="input-group-text">{{ t('shifts.hours') }}</span>
                  </div>
                  <div class="form-text">{{ t('shifts.help.requiredWeeklyHours') }}</div>
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
                        min="0"
                        max="120">
                      <span class="input-group-text">{{ t('common.minutes') }}</span>
                    </div>
                    <div class="form-text">{{ t('shifts.help.gracePeriod') }}</div>
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
                        {{ t('shifts.loading.updating') }}
                      } @else {
                        <i class="bi bi-check-circle me-2"></i>{{ t('shifts.update') }}
                      }
                    </button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      }
    </div>
  </div>
</div>`, styles: ["/* src/app/pages/shifts/edit-shift/edit-shift.component.css */\n.form-check.p-3.border {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.form-check.p-3.border:hover {\n  background-color: rgba(0, 123, 255, 0.05);\n  border-color: var(--bs-primary) !important;\n}\n.form-check-input:checked ~ .form-check-label {\n  color: var(--bs-primary);\n}\n.card .card-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n}\n.badge {\n  font-size: 0.75em;\n}\n.alert-info {\n  background-color: rgba(13, 202, 240, 0.1);\n  border-color: rgba(13, 202, 240, 0.2);\n  color: #055160;\n}\n.form-switch .form-check-input {\n  cursor: pointer;\n}\n.btn-outline-danger.btn-sm {\n  --bs-btn-padding-y: 0.25rem;\n  --bs-btn-padding-x: 0.5rem;\n  --bs-btn-font-size: 0.875rem;\n}\n.spinner-border {\n  width: 2rem;\n  height: 2rem;\n}\n.form-control:invalid {\n  border-color: #dc3545;\n}\n.form-control:valid {\n  border-color: #198754;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n  .card-body {\n    padding: 1.5rem !important;\n  }\n}\n/*# sourceMappingURL=edit-shift.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditShiftComponent, { className: "EditShiftComponent", filePath: "src/app/pages/shifts/edit-shift/edit-shift.component.ts", lineNumber: 24 });
})();
export {
  EditShiftComponent
};
//# sourceMappingURL=chunk-2SWBC6HQ.js.map
