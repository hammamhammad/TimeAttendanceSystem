import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  SelectMultipleControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/attendance/shared/filter-panel/filter-panel.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.key, "_forTrack0");
var _forTrack1 = /* @__PURE__ */ __name(($index, $item) => $item.label, "_forTrack1");
var _forTrack2 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack2");
function FilterPanelComponent_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function FilterPanelComponent_Conditional_7_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    }, "FilterPanelComponent_Conditional_7_Conditional_1_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18nService.t("app.clear"), " ");
  }
}
__name(FilterPanelComponent_Conditional_7_Conditional_1_Template, "FilterPanelComponent_Conditional_7_Conditional_1_Template");
function FilterPanelComponent_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function FilterPanelComponent_Conditional_7_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.applyFilters());
    }, "FilterPanelComponent_Conditional_7_Conditional_2_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18nService.t("app.search"), " ");
  }
}
__name(FilterPanelComponent_Conditional_7_Conditional_2_Template, "FilterPanelComponent_Conditional_7_Conditional_2_Template");
function FilterPanelComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275conditionalCreate(1, FilterPanelComponent_Conditional_7_Conditional_1_Template, 3, 1, "button", 14);
    \u0275\u0275conditionalCreate(2, FilterPanelComponent_Conditional_7_Conditional_2_Template, 3, 1, "button", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showClearButton ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showApplyButton ? 2 : -1);
  }
}
__name(FilterPanelComponent_Conditional_7_Template, "FilterPanelComponent_Conditional_7_Template");
function FilterPanelComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-chevron-down", ctx_r1.isCollapsed)("fa-chevron-up", !ctx_r1.isCollapsed);
  }
}
__name(FilterPanelComponent_Conditional_8_Template, "FilterPanelComponent_Conditional_8_Template");
function FilterPanelComponent_Conditional_12_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function FilterPanelComponent_Conditional_12_Conditional_4_For_3_Template_button_click_0_listener() {
      const preset_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.applyDatePreset(preset_r5));
    }, "FilterPanelComponent_Conditional_12_Conditional_4_For_3_Template_button_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const preset_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", preset_r5.label, " ");
  }
}
__name(FilterPanelComponent_Conditional_12_Conditional_4_For_3_Template, "FilterPanelComponent_Conditional_12_Conditional_4_For_3_Template");
function FilterPanelComponent_Conditional_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 29);
    \u0275\u0275repeaterCreate(2, FilterPanelComponent_Conditional_12_Conditional_4_For_3_Template, 2, 1, "button", 30, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.config.dateRange == null ? null : ctx_r1.config.dateRange.presets);
  }
}
__name(FilterPanelComponent_Conditional_12_Conditional_4_Template, "FilterPanelComponent_Conditional_12_Conditional_4_Template");
function FilterPanelComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 21)(2, "label", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, FilterPanelComponent_Conditional_12_Conditional_4_Template, 4, 0, "div", 23);
    \u0275\u0275elementStart(5, "div", 24)(6, "div", 25)(7, "label", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 25)(11, "label", 26);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 28);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.date_range"));
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.config.dateRange == null ? null : ctx_r1.config.dateRange.presets) && ((ctx_r1.config.dateRange == null ? null : ctx_r1.config.dateRange.presets == null ? null : ctx_r1.config.dateRange.presets.length) || 0) > 0 ? 4 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.start_date"));
    \u0275\u0275advance();
    \u0275\u0275property("max", (tmp_4_0 = ctx_r1.filterForm.get("endDate")) == null ? null : tmp_4_0.value);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.end_date"));
    \u0275\u0275advance();
    \u0275\u0275property("min", (tmp_6_0 = ctx_r1.filterForm.get("startDate")) == null ? null : tmp_6_0.value);
  }
}
__name(FilterPanelComponent_Conditional_12_Template, "FilterPanelComponent_Conditional_12_Template");
function FilterPanelComponent_Conditional_13_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r6 = ctx.$implicit;
    \u0275\u0275property("value", option_r6.value)("disabled", option_r6.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r6.label, " ");
  }
}
__name(FilterPanelComponent_Conditional_13_For_8_Template, "FilterPanelComponent_Conditional_13_For_8_Template");
function FilterPanelComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 21)(2, "label", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 32)(5, "option", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, FilterPanelComponent_Conditional_13_For_8_Template, 2, 3, "option", 34, _forTrack2);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.employees"));
    \u0275\u0275advance();
    \u0275\u0275property("multiple", ctx_r1.isMultipleSelection("employees"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.all_employees"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getFieldOptions("employees"));
  }
}
__name(FilterPanelComponent_Conditional_13_Template, "FilterPanelComponent_Conditional_13_Template");
function FilterPanelComponent_Conditional_14_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r7 = ctx.$implicit;
    \u0275\u0275property("value", option_r7.value)("disabled", option_r7.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r7.label, " ");
  }
}
__name(FilterPanelComponent_Conditional_14_For_8_Template, "FilterPanelComponent_Conditional_14_For_8_Template");
function FilterPanelComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 21)(2, "label", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 35)(5, "option", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, FilterPanelComponent_Conditional_14_For_8_Template, 2, 3, "option", 34, _forTrack2);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.departments"));
    \u0275\u0275advance();
    \u0275\u0275property("multiple", ctx_r1.isMultipleSelection("departments"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.all_departments"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getFieldOptions("departments"));
  }
}
__name(FilterPanelComponent_Conditional_14_Template, "FilterPanelComponent_Conditional_14_Template");
function FilterPanelComponent_Conditional_15_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r8 = ctx.$implicit;
    \u0275\u0275property("value", option_r8.value)("disabled", option_r8.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r8.label, " ");
  }
}
__name(FilterPanelComponent_Conditional_15_For_8_Template, "FilterPanelComponent_Conditional_15_For_8_Template");
function FilterPanelComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 21)(2, "label", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 36)(5, "option", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, FilterPanelComponent_Conditional_15_For_8_Template, 2, 3, "option", 34, _forTrack2);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.branches"));
    \u0275\u0275advance();
    \u0275\u0275property("multiple", ctx_r1.isMultipleSelection("branches"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.all_branches"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getFieldOptions("branches"));
  }
}
__name(FilterPanelComponent_Conditional_15_Template, "FilterPanelComponent_Conditional_15_Template");
function FilterPanelComponent_Conditional_16_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r9 = ctx.$implicit;
    \u0275\u0275property("value", option_r9.value)("disabled", option_r9.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r9.label, " ");
  }
}
__name(FilterPanelComponent_Conditional_16_For_8_Template, "FilterPanelComponent_Conditional_16_For_8_Template");
function FilterPanelComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 21)(2, "label", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 37)(5, "option", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, FilterPanelComponent_Conditional_16_For_8_Template, 2, 3, "option", 34, _forTrack2);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.status"));
    \u0275\u0275advance();
    \u0275\u0275property("multiple", ctx_r1.isMultipleSelection("status"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.all_statuses"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getFieldOptions("status"));
  }
}
__name(FilterPanelComponent_Conditional_16_Template, "FilterPanelComponent_Conditional_16_Template");
function FilterPanelComponent_Conditional_17_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r10 = ctx.$implicit;
    \u0275\u0275property("value", option_r10.value)("disabled", option_r10.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r10.label, " ");
  }
}
__name(FilterPanelComponent_Conditional_17_For_6_Template, "FilterPanelComponent_Conditional_17_For_6_Template");
function FilterPanelComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 21)(2, "label", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 38);
    \u0275\u0275repeaterCreate(5, FilterPanelComponent_Conditional_17_For_6_Template, 2, 3, "option", 34, _forTrack2);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18nService.t("attendance.filters.report_type"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.config.reportType == null ? null : ctx_r1.config.reportType.options);
  }
}
__name(FilterPanelComponent_Conditional_17_Template, "FilterPanelComponent_Conditional_17_Template");
function FilterPanelComponent_For_19_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 39);
  }
  if (rf & 2) {
    const field_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("formControlName", field_r11.key)("placeholder", field_r11.placeholder);
  }
}
__name(FilterPanelComponent_For_19_Conditional_4_Template, "FilterPanelComponent_For_19_Conditional_4_Template");
function FilterPanelComponent_For_19_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 40);
  }
  if (rf & 2) {
    const field_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("formControlName", field_r11.key)("placeholder", field_r11.placeholder);
  }
}
__name(FilterPanelComponent_For_19_Conditional_5_Template, "FilterPanelComponent_For_19_Conditional_5_Template");
function FilterPanelComponent_For_19_Conditional_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r12 = ctx.$implicit;
    \u0275\u0275property("value", option_r12.value)("disabled", option_r12.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r12.label, " ");
  }
}
__name(FilterPanelComponent_For_19_Conditional_6_For_4_Template, "FilterPanelComponent_For_19_Conditional_6_For_4_Template");
function FilterPanelComponent_For_19_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 41)(1, "option", 33);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, FilterPanelComponent_For_19_Conditional_6_For_4_Template, 2, 3, "option", 34, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formControlName", field_r11.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r11.placeholder || "Select option...");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getCustomFieldOptions(field_r11));
  }
}
__name(FilterPanelComponent_For_19_Conditional_6_Template, "FilterPanelComponent_For_19_Conditional_6_Template");
function FilterPanelComponent_For_19_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r13 = ctx.$implicit;
    \u0275\u0275property("value", option_r13.value)("disabled", option_r13.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r13.label, " ");
  }
}
__name(FilterPanelComponent_For_19_Conditional_7_For_2_Template, "FilterPanelComponent_For_19_Conditional_7_For_2_Template");
function FilterPanelComponent_For_19_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 42);
    \u0275\u0275repeaterCreate(1, FilterPanelComponent_For_19_Conditional_7_For_2_Template, 2, 3, "option", 34, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formControlName", field_r11.key);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getCustomFieldOptions(field_r11));
  }
}
__name(FilterPanelComponent_For_19_Conditional_7_Template, "FilterPanelComponent_For_19_Conditional_7_Template");
function FilterPanelComponent_For_19_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275element(1, "input", 44);
    \u0275\u0275elementStart(2, "label", 45);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("formControlName", field_r11.key)("id", "checkbox-" + field_r11.key);
    \u0275\u0275advance();
    \u0275\u0275property("for", "checkbox-" + field_r11.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r11.placeholder || field_r11.label, " ");
  }
}
__name(FilterPanelComponent_For_19_Conditional_8_Template, "FilterPanelComponent_For_19_Conditional_8_Template");
function FilterPanelComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 21)(2, "label", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, FilterPanelComponent_For_19_Conditional_4_Template, 1, 2, "input", 39);
    \u0275\u0275conditionalCreate(5, FilterPanelComponent_For_19_Conditional_5_Template, 1, 2, "input", 40);
    \u0275\u0275conditionalCreate(6, FilterPanelComponent_For_19_Conditional_6_Template, 5, 2, "select", 41);
    \u0275\u0275conditionalCreate(7, FilterPanelComponent_For_19_Conditional_7_Template, 3, 1, "select", 42);
    \u0275\u0275conditionalCreate(8, FilterPanelComponent_For_19_Conditional_8_Template, 4, 4, "div", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r11 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(field_r11.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r11.type === "text" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r11.type === "number" ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r11.type === "select" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r11.type === "multiselect" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r11.type === "checkbox" ? 8 : -1);
  }
}
__name(FilterPanelComponent_For_19_Template, "FilterPanelComponent_For_19_Template");
function FilterPanelComponent_Conditional_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function FilterPanelComponent_Conditional_20_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    }, "FilterPanelComponent_Conditional_20_Conditional_2_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18nService.t("app.clear"), " ");
  }
}
__name(FilterPanelComponent_Conditional_20_Conditional_2_Template, "FilterPanelComponent_Conditional_20_Conditional_2_Template");
function FilterPanelComponent_Conditional_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function FilterPanelComponent_Conditional_20_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.applyFilters());
    }, "FilterPanelComponent_Conditional_20_Conditional_3_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18nService.t("app.search"), " ");
  }
}
__name(FilterPanelComponent_Conditional_20_Conditional_3_Template, "FilterPanelComponent_Conditional_20_Conditional_3_Template");
function FilterPanelComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 46);
    \u0275\u0275conditionalCreate(2, FilterPanelComponent_Conditional_20_Conditional_2_Template, 3, 1, "button", 30);
    \u0275\u0275conditionalCreate(3, FilterPanelComponent_Conditional_20_Conditional_3_Template, 3, 1, "button", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showClearButton ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showApplyButton ? 3 : -1);
  }
}
__name(FilterPanelComponent_Conditional_20_Template, "FilterPanelComponent_Conditional_20_Template");
var _FilterPanelComponent = class _FilterPanelComponent {
  fb;
  i18nService;
  config;
  initialValues = {};
  collapsible = true;
  collapsed = false;
  showApplyButton = true;
  showClearButton = true;
  loading = false;
  filtersChanged = new EventEmitter();
  filtersApplied = new EventEmitter();
  filtersCleared = new EventEmitter();
  filterForm;
  isCollapsed = false;
  constructor(fb, i18nService) {
    this.fb = fb;
    this.i18nService = i18nService;
  }
  ngOnInit() {
    this.isCollapsed = this.collapsed;
    this.createFilterForm();
    this.setupFormSubscriptions();
  }
  createFilterForm() {
    const formConfig = {};
    if (this.config.dateRange?.enabled) {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0];
      formConfig["startDate"] = [
        this.initialValues.dateRange?.startDate || this.config.dateRange.startDate || thirtyDaysAgo
      ];
      formConfig["endDate"] = [
        this.initialValues.dateRange?.endDate || this.config.dateRange.endDate || today
      ];
    }
    if (this.config.employees?.enabled) {
      formConfig["employeeIds"] = [this.initialValues.employeeIds || []];
    }
    if (this.config.departments?.enabled) {
      formConfig["departmentIds"] = [this.initialValues.departmentIds || []];
    }
    if (this.config.branches?.enabled) {
      formConfig["branchIds"] = [this.initialValues.branchIds || []];
    }
    if (this.config.status?.enabled) {
      formConfig["statusFilter"] = [this.initialValues.statusFilter || []];
    }
    if (this.config.reportType?.enabled) {
      formConfig["reportType"] = [this.initialValues.reportType || null];
    }
    if (this.config.customFields) {
      this.config.customFields.forEach((field) => {
        formConfig[field.key] = [this.initialValues[field.key] || this.getDefaultValue(field.type)];
      });
    }
    this.filterForm = this.fb.group(formConfig);
  }
  getDefaultValue(type) {
    switch (type) {
      case "multiselect":
        return [];
      case "checkbox":
        return false;
      case "number":
        return null;
      default:
        return "";
    }
  }
  setupFormSubscriptions() {
    this.filterForm.valueChanges.subscribe((values) => {
      const filterValues = this.transformFormValues(values);
      this.filtersChanged.emit(filterValues);
    });
  }
  transformFormValues(values) {
    const result = {};
    if (this.config.dateRange?.enabled && values.startDate && values.endDate) {
      result.dateRange = {
        startDate: values.startDate,
        endDate: values.endDate
      };
    }
    if (this.config.employees?.enabled) {
      result.employeeIds = values.employeeIds;
    }
    if (this.config.departments?.enabled) {
      result.departmentIds = values.departmentIds;
    }
    if (this.config.branches?.enabled) {
      result.branchIds = values.branchIds;
    }
    if (this.config.status?.enabled) {
      result.statusFilter = values.statusFilter;
    }
    if (this.config.reportType?.enabled) {
      result.reportType = values.reportType;
    }
    if (this.config.customFields) {
      this.config.customFields.forEach((field) => {
        result[field.key] = values[field.key];
      });
    }
    return result;
  }
  applyFilters() {
    const filterValues = this.transformFormValues(this.filterForm.value);
    this.filtersApplied.emit(filterValues);
  }
  clearFilters() {
    this.filterForm.reset();
    this.filtersCleared.emit();
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  applyDatePreset(preset) {
    if (!this.config.dateRange?.enabled)
      return;
    const endDate = /* @__PURE__ */ new Date();
    const startDate = new Date(endDate.getTime() - preset.days * 24 * 60 * 60 * 1e3);
    this.filterForm.patchValue({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0]
    });
  }
  // Helper methods for template
  isMultipleSelection(fieldType) {
    return this.config[fieldType]?.multiple || false;
  }
  getFieldOptions(fieldType) {
    return this.config[fieldType]?.options || [];
  }
  getCustomFieldOptions(field) {
    return field.options || [];
  }
};
__name(_FilterPanelComponent, "FilterPanelComponent");
__publicField(_FilterPanelComponent, "\u0275fac", /* @__PURE__ */ __name(function FilterPanelComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FilterPanelComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(I18nService));
}, "FilterPanelComponent_Factory"));
__publicField(_FilterPanelComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FilterPanelComponent, selectors: [["app-filter-panel"]], inputs: { config: "config", initialValues: "initialValues", collapsible: "collapsible", collapsed: "collapsed", showApplyButton: "showApplyButton", showClearButton: "showClearButton", loading: "loading" }, outputs: { filtersChanged: "filtersChanged", filtersApplied: "filtersApplied", filtersCleared: "filtersCleared" }, decls: 21, vars: 17, consts: [[1, "filter-panel"], [1, "filter-header", 3, "click"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "filter-title", "mb-0"], [1, "fa-solid", "fa-filter", "me-2"], [1, "header-actions", "d-flex", "align-items-center", "gap-2"], [1, "d-flex", "gap-2"], ["type", "button", 1, "btn", "btn-link", "btn-sm", "p-0"], [1, "filter-content"], [1, "filter-form", 3, "formGroup"], [1, "row", "g-3"], [1, "col-12"], [1, "col-lg-4", "col-md-6"], [1, "filter-actions", "mt-3", "pt-3", "border-top"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn-sm"], ["type", "button", 1, "btn", "btn-primary", "btn-sm"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn-sm", 3, "click"], [1, "fa-solid", "fa-times", "me-1"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "fa-solid", "fa-search", "me-1"], [1, "fa-solid"], [1, "filter-group"], [1, "form-label"], [1, "date-presets", "mb-3"], [1, "row", "g-2"], [1, "col-md-6"], [1, "form-label", "small"], ["type", "date", "formControlName", "startDate", 1, "form-control", 3, "max"], ["type", "date", "formControlName", "endDate", 1, "form-control", 3, "min"], ["role", "group", 1, "btn-group", "btn-group-sm"], ["type", "button", 1, "btn", "btn-outline-secondary"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], ["formControlName", "employeeIds", 1, "form-select", 3, "multiple"], ["value", ""], [3, "value", "disabled"], ["formControlName", "departmentIds", 1, "form-select", 3, "multiple"], ["formControlName", "branchIds", 1, "form-select", 3, "multiple"], ["formControlName", "statusFilter", 1, "form-select", 3, "multiple"], ["formControlName", "reportType", 1, "form-select"], ["type", "text", 1, "form-control", 3, "formControlName", "placeholder"], ["type", "number", 1, "form-control", 3, "formControlName", "placeholder"], [1, "form-select", 3, "formControlName"], ["multiple", "", 1, "form-select", 3, "formControlName"], [1, "form-check"], ["type", "checkbox", 1, "form-check-input", 3, "formControlName", "id"], [1, "form-check-label", 3, "for"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-primary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]], template: /* @__PURE__ */ __name(function FilterPanelComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function FilterPanelComponent_Template_div_click_1_listener() {
      return ctx.collapsible ? ctx.toggleCollapse() : null;
    }, "FilterPanelComponent_Template_div_click_1_listener"));
    \u0275\u0275elementStart(2, "div", 2)(3, "h6", 3);
    \u0275\u0275element(4, "i", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 5);
    \u0275\u0275conditionalCreate(7, FilterPanelComponent_Conditional_7_Template, 3, 2, "div", 6);
    \u0275\u0275conditionalCreate(8, FilterPanelComponent_Conditional_8_Template, 2, 4, "button", 7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 8)(10, "form", 9)(11, "div", 10);
    \u0275\u0275conditionalCreate(12, FilterPanelComponent_Conditional_12_Template, 14, 6, "div", 11);
    \u0275\u0275conditionalCreate(13, FilterPanelComponent_Conditional_13_Template, 9, 3, "div", 12);
    \u0275\u0275conditionalCreate(14, FilterPanelComponent_Conditional_14_Template, 9, 3, "div", 12);
    \u0275\u0275conditionalCreate(15, FilterPanelComponent_Conditional_15_Template, 9, 3, "div", 12);
    \u0275\u0275conditionalCreate(16, FilterPanelComponent_Conditional_16_Template, 9, 3, "div", 12);
    \u0275\u0275conditionalCreate(17, FilterPanelComponent_Conditional_17_Template, 7, 1, "div", 12);
    \u0275\u0275repeaterCreate(18, FilterPanelComponent_For_19_Template, 9, 6, "div", 12, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, FilterPanelComponent_Conditional_20_Template, 4, 2, "div", 13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275classProp("collapsible", ctx.collapsible);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.i18nService.t("attendance.filters.title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx.collapsible ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.collapsible ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("collapsed", ctx.isCollapsed)("show", !ctx.isCollapsed);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx.filterForm);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((ctx.config.dateRange == null ? null : ctx.config.dateRange.enabled) ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx.config.employees == null ? null : ctx.config.employees.enabled) ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx.config.departments == null ? null : ctx.config.departments.enabled) ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx.config.branches == null ? null : ctx.config.branches.enabled) ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx.config.status == null ? null : ctx.config.status.enabled) ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx.config.reportType == null ? null : ctx.config.reportType.enabled) ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.config.customFields);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.collapsible && !ctx.isCollapsed ? 20 : -1);
  }
}, "FilterPanelComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, NgControlStatus, NgControlStatusGroup, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ['\n\n.filter-panel[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.filter-header[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-bottom: 1px solid #e9ecef;\n  background: #f8f9fa;\n  border-radius: 8px 8px 0 0;\n}\n.filter-header.collapsible[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.filter-header.collapsible[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n}\n.filter-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  display: flex;\n  align-items: center;\n}\n.header-actions[_ngcontent-%COMP%] {\n  min-height: 2rem;\n}\n.filter-content[_ngcontent-%COMP%] {\n  transition: all 0.3s ease;\n  overflow: hidden;\n}\n.filter-content.collapsed[_ngcontent-%COMP%] {\n  max-height: 0;\n  opacity: 0;\n}\n.filter-content.show[_ngcontent-%COMP%] {\n  max-height: none;\n  opacity: 1;\n}\n.filter-form[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.filter-group[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n}\n.form-label.small[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #6c757d;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border: 1px solid #ced4da;\n  border-radius: 6px;\n  padding: 0.5rem 0.75rem;\n  font-size: 0.875rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.date-presets[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.date-presets[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  padding: 0.375rem 0.75rem;\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: 4px;\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:not(:last-child) {\n  border-right: 1px solid #dee2e6;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border-color: #ced4da;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: white;\n}\n.filter-actions[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 0 0 8px 8px;\n  margin: 0 -1rem -1rem -1rem;\n  padding: 1rem;\n}\n.form-check[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.form-check-input[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #495057;\n}\nselect[multiple][_ngcontent-%COMP%] {\n  min-height: 120px;\n  background-image: none;\n}\nselect[multiple][_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n}\nselect[multiple][_ngcontent-%COMP%]   option[_ngcontent-%COMP%]:checked {\n  background-color: #007bff;\n  color: white;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  padding: 0.375rem 0.75rem;\n}\n.btn-link[_ngcontent-%COMP%] {\n  color: #6c757d;\n  text-decoration: none;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  color: #495057;\n}\n@media (max-width: 768px) {\n  .filter-header[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .filter-form[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .filter-actions[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n    margin: 0 -0.75rem -0.75rem -0.75rem;\n  }\n  .header-actions[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .filter-actions[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .filter-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    max-height: 0;\n    opacity: 0;\n  }\n  to {\n    max-height: 500px;\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    max-height: 500px;\n    opacity: 1;\n  }\n  to {\n    max-height: 0;\n    opacity: 0;\n  }\n}\n.filter-content.show[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease-out;\n}\n.filter-content.collapsed[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease-out;\n}\n.filter-panel[_ngcontent-%COMP%]:focus-within   .filter-header[_ngcontent-%COMP%] {\n  border-color: #80bdff;\n}\n.filter-form.loading[_ngcontent-%COMP%] {\n  pointer-events: none;\n  opacity: 0.6;\n}\n.filter-form.loading[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n}\n/*# sourceMappingURL=filter-panel.component.css.map */'] }));
var FilterPanelComponent = _FilterPanelComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterPanelComponent, [{
    type: Component,
    args: [{ selector: "app-filter-panel", standalone: true, imports: [FormsModule, ReactiveFormsModule], template: `<div class="filter-panel">\r
  <!-- Header -->\r
  <div class="filter-header" [class.collapsible]="collapsible" (click)="collapsible ? toggleCollapse() : null">\r
    <div class="d-flex justify-content-between align-items-center">\r
      <h6 class="filter-title mb-0">\r
        <i class="fa-solid fa-filter me-2"></i>\r
        {{ i18nService.t('attendance.filters.title') }}\r
      </h6>\r
      <div class="header-actions d-flex align-items-center gap-2">\r
        <!-- Action buttons when not collapsible -->\r
        @if (!collapsible) {\r
          <div class="d-flex gap-2">\r
            @if (showClearButton) {\r
              <button\r
                type="button"\r
                class="btn btn-outline-secondary btn-sm"\r
                (click)="clearFilters()">\r
                <i class="fa-solid fa-times me-1"></i>\r
                {{ i18nService.t('app.clear') }}\r
              </button>\r
            }\r
            @if (showApplyButton) {\r
              <button\r
                type="button"\r
                class="btn btn-primary btn-sm"\r
                (click)="applyFilters()">\r
                <i class="fa-solid fa-search me-1"></i>\r
                {{ i18nService.t('app.search') }}\r
              </button>\r
            }\r
          </div>\r
        }\r
\r
        <!-- Collapse toggle -->\r
        @if (collapsible) {\r
          <button type="button" class="btn btn-link btn-sm p-0">\r
            <i class="fa-solid" [class.fa-chevron-down]="isCollapsed" [class.fa-chevron-up]="!isCollapsed"></i>\r
          </button>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Filter Content -->\r
  <div class="filter-content" [class.collapsed]="isCollapsed" [class.show]="!isCollapsed">\r
    <form [formGroup]="filterForm" class="filter-form">\r
      <div class="row g-3">\r
\r
        <!-- Date Range -->\r
        @if (config.dateRange?.enabled) {\r
          <div class="col-12">\r
            <div class="filter-group">\r
              <label class="form-label">{{ i18nService.t('attendance.filters.date_range') }}</label>\r
\r
              <!-- Date Presets -->\r
              @if (config.dateRange?.presets && (config.dateRange?.presets?.length || 0) > 0) {\r
                <div class="date-presets mb-3">\r
                  <div class="btn-group btn-group-sm" role="group">\r
                    @for (preset of config.dateRange?.presets; track preset.label) {\r
                      <button\r
                        type="button"\r
                        class="btn btn-outline-secondary"\r
                        (click)="applyDatePreset(preset)">\r
                        {{ preset.label }}\r
                      </button>\r
                    }\r
                  </div>\r
                </div>\r
              }\r
\r
              <!-- Date Inputs -->\r
              <div class="row g-2">\r
                <div class="col-md-6">\r
                  <label class="form-label small">{{ i18nService.t('attendance.filters.start_date') }}</label>\r
                  <input type="date"\r
                         class="form-control"\r
                         formControlName="startDate"\r
                         [max]="filterForm.get('endDate')?.value">\r
                </div>\r
                <div class="col-md-6">\r
                  <label class="form-label small">{{ i18nService.t('attendance.filters.end_date') }}</label>\r
                  <input type="date"\r
                         class="form-control"\r
                         formControlName="endDate"\r
                         [min]="filterForm.get('startDate')?.value">\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Employees -->\r
        @if (config.employees?.enabled) {\r
          <div class="col-lg-4 col-md-6">\r
            <div class="filter-group">\r
              <label class="form-label">{{ i18nService.t('attendance.filters.employees') }}</label>\r
              <select class="form-select"\r
                      formControlName="employeeIds"\r
                      [multiple]="isMultipleSelection('employees')">\r
                <option value="">{{ i18nService.t('attendance.filters.all_employees') }}</option>\r
                @for (option of getFieldOptions('employees'); track option.value) {\r
                  <option\r
                    [value]="option.value"\r
                    [disabled]="option.disabled">\r
                    {{ option.label }}\r
                  </option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Departments -->\r
        @if (config.departments?.enabled) {\r
          <div class="col-lg-4 col-md-6">\r
            <div class="filter-group">\r
              <label class="form-label">{{ i18nService.t('attendance.filters.departments') }}</label>\r
              <select class="form-select"\r
                      formControlName="departmentIds"\r
                      [multiple]="isMultipleSelection('departments')">\r
                <option value="">{{ i18nService.t('attendance.filters.all_departments') }}</option>\r
                @for (option of getFieldOptions('departments'); track option.value) {\r
                  <option\r
                    [value]="option.value"\r
                    [disabled]="option.disabled">\r
                    {{ option.label }}\r
                  </option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Branches -->\r
        @if (config.branches?.enabled) {\r
          <div class="col-lg-4 col-md-6">\r
            <div class="filter-group">\r
              <label class="form-label">{{ i18nService.t('attendance.filters.branches') }}</label>\r
              <select class="form-select"\r
                      formControlName="branchIds"\r
                      [multiple]="isMultipleSelection('branches')">\r
                <option value="">{{ i18nService.t('attendance.filters.all_branches') }}</option>\r
                @for (option of getFieldOptions('branches'); track option.value) {\r
                  <option\r
                    [value]="option.value"\r
                    [disabled]="option.disabled">\r
                    {{ option.label }}\r
                  </option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Status -->\r
        @if (config.status?.enabled) {\r
          <div class="col-lg-4 col-md-6">\r
            <div class="filter-group">\r
              <label class="form-label">{{ i18nService.t('attendance.filters.status') }}</label>\r
              <select class="form-select"\r
                      formControlName="statusFilter"\r
                      [multiple]="isMultipleSelection('status')">\r
                <option value="">{{ i18nService.t('attendance.filters.all_statuses') }}</option>\r
                @for (option of getFieldOptions('status'); track option.value) {\r
                  <option\r
                    [value]="option.value"\r
                    [disabled]="option.disabled">\r
                    {{ option.label }}\r
                  </option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Report Type -->\r
        @if (config.reportType?.enabled) {\r
          <div class="col-lg-4 col-md-6">\r
            <div class="filter-group">\r
              <label class="form-label">{{ i18nService.t('attendance.filters.report_type') }}</label>\r
              <select class="form-select" formControlName="reportType">\r
                @for (option of config.reportType?.options; track option.value) {\r
                  <option\r
                    [value]="option.value"\r
                    [disabled]="option.disabled">\r
                    {{ option.label }}\r
                  </option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Custom Fields -->\r
        @for (field of config.customFields; track field.key) {\r
          <div class="col-lg-4 col-md-6">\r
            <div class="filter-group">\r
              <label class="form-label">{{ field.label }}</label>\r
\r
              <!-- Text Input -->\r
              @if (field.type === 'text') {\r
                <input\r
                  type="text"\r
                  class="form-control"\r
                  [formControlName]="field.key"\r
                  [placeholder]="field.placeholder">\r
              }\r
\r
              <!-- Number Input -->\r
              @if (field.type === 'number') {\r
                <input\r
                  type="number"\r
                  class="form-control"\r
                  [formControlName]="field.key"\r
                  [placeholder]="field.placeholder">\r
              }\r
\r
              <!-- Select -->\r
              @if (field.type === 'select') {\r
                <select\r
                  class="form-select"\r
                  [formControlName]="field.key">\r
                  <option value="">{{ field.placeholder || 'Select option...' }}</option>\r
                  @for (option of getCustomFieldOptions(field); track option.value) {\r
                    <option\r
                      [value]="option.value"\r
                      [disabled]="option.disabled">\r
                      {{ option.label }}\r
                    </option>\r
                  }\r
                </select>\r
              }\r
\r
              <!-- Multi-select -->\r
              @if (field.type === 'multiselect') {\r
                <select\r
                  class="form-select"\r
                  [formControlName]="field.key"\r
                  multiple>\r
                  @for (option of getCustomFieldOptions(field); track option.value) {\r
                    <option\r
                      [value]="option.value"\r
                      [disabled]="option.disabled">\r
                      {{ option.label }}\r
                    </option>\r
                  }\r
                </select>\r
              }\r
\r
              <!-- Checkbox -->\r
              @if (field.type === 'checkbox') {\r
                <div class="form-check">\r
                  <input type="checkbox"\r
                         class="form-check-input"\r
                         [formControlName]="field.key"\r
                         [id]="'checkbox-' + field.key">\r
                  <label class="form-check-label" [for]="'checkbox-' + field.key">\r
                    {{ field.placeholder || field.label }}\r
                  </label>\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      <!-- Action Buttons (for collapsible panels) -->\r
      @if (collapsible && !isCollapsed) {\r
        <div class="filter-actions mt-3 pt-3 border-top">\r
          <div class="d-flex justify-content-end gap-2">\r
            @if (showClearButton) {\r
              <button\r
                type="button"\r
                class="btn btn-outline-secondary"\r
                (click)="clearFilters()">\r
                <i class="fa-solid fa-times me-1"></i>\r
                {{ i18nService.t('app.clear') }}\r
              </button>\r
            }\r
            @if (showApplyButton) {\r
              <button\r
                type="button"\r
                class="btn btn-primary"\r
                (click)="applyFilters()">\r
                <i class="fa-solid fa-search me-1"></i>\r
                {{ i18nService.t('app.search') }}\r
              </button>\r
            }\r
          </div>\r
        </div>\r
      }\r
    </form>\r
  </div>\r
</div>`, styles: ['/* src/app/pages/attendance/shared/filter-panel/filter-panel.component.css */\n.filter-panel {\n  background: white;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.filter-header {\n  padding: 1rem;\n  border-bottom: 1px solid #e9ecef;\n  background: #f8f9fa;\n  border-radius: 8px 8px 0 0;\n}\n.filter-header.collapsible {\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.filter-header.collapsible:hover {\n  background: #e9ecef;\n}\n.filter-title {\n  font-weight: 600;\n  color: #495057;\n  display: flex;\n  align-items: center;\n}\n.header-actions {\n  min-height: 2rem;\n}\n.filter-content {\n  transition: all 0.3s ease;\n  overflow: hidden;\n}\n.filter-content.collapsed {\n  max-height: 0;\n  opacity: 0;\n}\n.filter-content.show {\n  max-height: none;\n  opacity: 1;\n}\n.filter-form {\n  padding: 1rem;\n}\n.filter-group {\n  margin-bottom: 0;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n}\n.form-label.small {\n  font-size: 0.8rem;\n  color: #6c757d;\n}\n.form-control,\n.form-select {\n  border: 1px solid #ced4da;\n  border-radius: 6px;\n  padding: 0.5rem 0.75rem;\n  font-size: 0.875rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.date-presets {\n  margin-bottom: 1rem;\n}\n.date-presets .btn-group .btn {\n  font-size: 0.8rem;\n  padding: 0.375rem 0.75rem;\n}\n.btn-group-sm .btn {\n  border-radius: 4px;\n}\n.btn-group-sm .btn:not(:last-child) {\n  border-right: 1px solid #dee2e6;\n}\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #ced4da;\n}\n.btn-outline-secondary:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: white;\n}\n.filter-actions {\n  background: #f8f9fa;\n  border-radius: 0 0 8px 8px;\n  margin: 0 -1rem -1rem -1rem;\n  padding: 1rem;\n}\n.form-check {\n  margin-top: 0.5rem;\n}\n.form-check-input {\n  margin-top: 0.25rem;\n}\n.form-check-label {\n  font-size: 0.875rem;\n  color: #495057;\n}\nselect[multiple] {\n  min-height: 120px;\n  background-image: none;\n}\nselect[multiple] option {\n  padding: 0.25rem 0.5rem;\n}\nselect[multiple] option:checked {\n  background-color: #007bff;\n  color: white;\n}\n.btn-sm {\n  font-size: 0.8rem;\n  padding: 0.375rem 0.75rem;\n}\n.btn-link {\n  color: #6c757d;\n  text-decoration: none;\n}\n.btn-link:hover {\n  color: #495057;\n}\n@media (max-width: 768px) {\n  .filter-header {\n    padding: 0.75rem;\n  }\n  .filter-form {\n    padding: 0.75rem;\n  }\n  .filter-actions {\n    padding: 0.75rem;\n    margin: 0 -0.75rem -0.75rem -0.75rem;\n  }\n  .header-actions .d-flex {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .filter-actions .d-flex {\n    flex-direction: column;\n  }\n  .filter-actions .btn {\n    width: 100%;\n  }\n}\n@keyframes slideDown {\n  from {\n    max-height: 0;\n    opacity: 0;\n  }\n  to {\n    max-height: 500px;\n    opacity: 1;\n  }\n}\n@keyframes slideUp {\n  from {\n    max-height: 500px;\n    opacity: 1;\n  }\n  to {\n    max-height: 0;\n    opacity: 0;\n  }\n}\n.filter-content.show {\n  animation: slideDown 0.3s ease-out;\n}\n.filter-content.collapsed {\n  animation: slideUp 0.3s ease-out;\n}\n.filter-panel:focus-within .filter-header {\n  border-color: #80bdff;\n}\n.filter-form.loading {\n  pointer-events: none;\n  opacity: 0.6;\n}\n.filter-form.loading::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n}\n/*# sourceMappingURL=filter-panel.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: I18nService }], { config: [{
    type: Input
  }], initialValues: [{
    type: Input
  }], collapsible: [{
    type: Input
  }], collapsed: [{
    type: Input
  }], showApplyButton: [{
    type: Input
  }], showClearButton: [{
    type: Input
  }], loading: [{
    type: Input
  }], filtersChanged: [{
    type: Output
  }], filtersApplied: [{
    type: Output
  }], filtersCleared: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FilterPanelComponent, { className: "FilterPanelComponent", filePath: "src/app/pages/attendance/shared/filter-panel/filter-panel.component.ts", lineNumber: 81 });
})();

export {
  FilterPanelComponent
};
//# sourceMappingURL=chunk-HWLXKNQA.js.map
