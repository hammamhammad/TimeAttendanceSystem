import {
  CommonModule,
  Component,
  Input,
  NgTemplateOutlet,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
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

// src/app/shared/components/detail-card/detail-card.component.ts
var _c0 = /* @__PURE__ */ __name((a0, a1) => ({ $implicit: a0, field: a1 }), "_c0");
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.label, "_forTrack0");
function DetailCardComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.icon + " me-2");
  }
}
__name(DetailCardComponent_Conditional_1_Conditional_2_Template, "DetailCardComponent_Conditional_1_Conditional_2_Template");
function DetailCardComponent_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
__name(DetailCardComponent_Conditional_1_Conditional_4_Template, "DetailCardComponent_Conditional_1_Conditional_4_Template");
function DetailCardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "h5", 6);
    \u0275\u0275conditionalCreate(2, DetailCardComponent_Conditional_1_Conditional_2_Template, 1, 2, "i", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DetailCardComponent_Conditional_1_Conditional_4_Template, 2, 1, "small", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.icon ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.title, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.subtitle ? 4 : -1);
  }
}
__name(DetailCardComponent_Conditional_1_Template, "DetailCardComponent_Conditional_1_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classMap("badge bg-" + (field_r2.badgeVariant || "primary"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r2.value, " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_4_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_4_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(field_r2.value), " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_5_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_5_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatTime(field_r2.value), " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_6_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_6_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDateTime(field_r2.value), " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_7_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_7_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatCurrency(field_r2.value), " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_8_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_8_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r2.value, "% ");
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_9_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_9_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 14);
  }
  if (rf & 2) {
    const field_r2 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275property("ngTemplateOutlet", field_r2.customTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c0, field_r2.value, field_r2));
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_10_Conditional_0_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_10_Conditional_0_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_10_Conditional_0_Template, 1, 5, "ng-container", 14);
  }
  if (rf & 2) {
    const field_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275conditional(field_r2.customTemplate ? 0 : -1);
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_10_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_10_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "i", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Conditional_2_Template_i_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const field_r2 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copyToClipboard(field_r2.value));
    }, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Conditional_2_Template_i_click_0_listener"));
    \u0275\u0275elementEnd();
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Conditional_2_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Conditional_2_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const field_r2 = \u0275\u0275nextContext(2).$implicit;
      return \u0275\u0275resetView(field_r2.onClick && field_r2.onClick());
    }, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Template_span_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Conditional_2_Template, 1, 0, "i", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("text-muted", !field_r2.value || field_r2.value === "-")("app-clickable", field_r2.onClick);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r2.value || "-", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r2.copyable && field_r2.value ? 2 : -1);
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Template");
function DetailCardComponent_Conditional_3_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "dt", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd", 12);
    \u0275\u0275conditionalCreate(4, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_4_Template, 2, 3, "span", 7)(5, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_5_Template, 2, 1, "span")(6, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_6_Template, 2, 1, "span")(7, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_7_Template, 2, 1, "span")(8, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_8_Template, 2, 1, "span")(9, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_9_Template, 2, 1, "span")(10, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_10_Template, 1, 1)(11, DetailCardComponent_Conditional_3_For_4_Conditional_0_Case_11_Template, 3, 6, "span", 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const field_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", field_r2.label, ":");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_13_0 = field_r2.type || "text") === "badge" ? 4 : tmp_13_0 === "date" ? 5 : tmp_13_0 === "time" ? 6 : tmp_13_0 === "datetime" ? 7 : tmp_13_0 === "currency" ? 8 : tmp_13_0 === "percentage" ? 9 : tmp_13_0 === "custom" ? 10 : 11);
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Conditional_0_Template, "DetailCardComponent_Conditional_3_For_4_Conditional_0_Template");
function DetailCardComponent_Conditional_3_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DetailCardComponent_Conditional_3_For_4_Conditional_0_Template, 12, 2, "div", 10);
  }
  if (rf & 2) {
    const field_r2 = ctx.$implicit;
    \u0275\u0275conditional(field_r2.visible !== false ? 0 : -1);
  }
}
__name(DetailCardComponent_Conditional_3_For_4_Template, "DetailCardComponent_Conditional_3_For_4_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classMap("badge bg-" + (field_r5.badgeVariant || "primary"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r5.value, " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_4_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_4_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(field_r5.value), " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_5_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_5_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatTime(field_r5.value), " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_6_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_6_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDateTime(field_r5.value), " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_7_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_7_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatCurrency(field_r5.value), " ");
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_8_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_8_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r5.value, "% ");
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_9_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_9_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 14);
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275property("ngTemplateOutlet", field_r5.customTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c0, field_r5.value, field_r5));
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_10_Conditional_0_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_10_Conditional_0_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_10_Conditional_0_Template, 1, 5, "ng-container", 14);
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275conditional(field_r5.customTemplate ? 0 : -1);
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_10_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_10_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "i", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Conditional_2_Template_i_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const field_r5 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copyToClipboard(field_r5.value));
    }, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Conditional_2_Template_i_click_0_listener"));
    \u0275\u0275elementEnd();
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Conditional_2_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Conditional_2_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const field_r5 = \u0275\u0275nextContext(2).$implicit;
      return \u0275\u0275resetView(field_r5.onClick && field_r5.onClick());
    }, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Template_span_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Conditional_2_Template, 1, 0, "i", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("text-muted", !field_r5.value || field_r5.value === "-")("app-clickable", field_r5.onClick);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r5.value || "-", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r5.copyable && field_r5.value ? 2 : -1);
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Template");
function DetailCardComponent_Conditional_3_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "dt", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd", 12);
    \u0275\u0275conditionalCreate(4, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_4_Template, 2, 3, "span", 7)(5, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_5_Template, 2, 1, "span")(6, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_6_Template, 2, 1, "span")(7, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_7_Template, 2, 1, "span")(8, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_8_Template, 2, 1, "span")(9, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_9_Template, 2, 1, "span")(10, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_10_Template, 1, 1)(11, DetailCardComponent_Conditional_3_For_8_Conditional_0_Case_11_Template, 3, 6, "span", 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const field_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", field_r5.label, ":");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_13_0 = field_r5.type || "text") === "badge" ? 4 : tmp_13_0 === "date" ? 5 : tmp_13_0 === "time" ? 6 : tmp_13_0 === "datetime" ? 7 : tmp_13_0 === "currency" ? 8 : tmp_13_0 === "percentage" ? 9 : tmp_13_0 === "custom" ? 10 : 11);
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Conditional_0_Template, "DetailCardComponent_Conditional_3_For_8_Conditional_0_Template");
function DetailCardComponent_Conditional_3_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DetailCardComponent_Conditional_3_For_8_Conditional_0_Template, 12, 2, "div", 10);
  }
  if (rf & 2) {
    const field_r5 = ctx.$implicit;
    \u0275\u0275conditional(field_r5.visible !== false ? 0 : -1);
  }
}
__name(DetailCardComponent_Conditional_3_For_8_Template, "DetailCardComponent_Conditional_3_For_8_Template");
function DetailCardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 9)(2, "dl", 4);
    \u0275\u0275repeaterCreate(3, DetailCardComponent_Conditional_3_For_4_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 9)(6, "dl", 4);
    \u0275\u0275repeaterCreate(7, DetailCardComponent_Conditional_3_For_8_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.getLeftColumnFields());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.getRightColumnFields());
  }
}
__name(DetailCardComponent_Conditional_3_Template, "DetailCardComponent_Conditional_3_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classMap("badge bg-" + (field_r8.badgeVariant || "primary"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r8.value, " ");
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_4_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_4_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(field_r8.value), " ");
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_5_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_5_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatTime(field_r8.value), " ");
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_6_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_6_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDateTime(field_r8.value), " ");
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_7_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_7_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatCurrency(field_r8.value), " ");
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_8_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_8_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r8.value, "% ");
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_9_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_9_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 14);
  }
  if (rf & 2) {
    const field_r8 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275property("ngTemplateOutlet", field_r8.customTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c0, field_r8.value, field_r8));
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_10_Conditional_0_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_10_Conditional_0_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_10_Conditional_0_Template, 1, 5, "ng-container", 14);
  }
  if (rf & 2) {
    const field_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275conditional(field_r8.customTemplate ? 0 : -1);
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_10_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_10_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "i", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Conditional_2_Template_i_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const field_r8 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copyToClipboard(field_r8.value));
    }, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Conditional_2_Template_i_click_0_listener"));
    \u0275\u0275elementEnd();
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Conditional_2_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Conditional_2_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const field_r8 = \u0275\u0275nextContext(2).$implicit;
      return \u0275\u0275resetView(field_r8.onClick && field_r8.onClick());
    }, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Template_span_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Conditional_2_Template, 1, 0, "i", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("text-muted", !field_r8.value || field_r8.value === "-")("app-clickable", field_r8.onClick);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r8.value || "-", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r8.copyable && field_r8.value ? 2 : -1);
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Template");
function DetailCardComponent_Conditional_4_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "dt", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd", 12);
    \u0275\u0275conditionalCreate(4, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_4_Template, 2, 3, "span", 7)(5, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_5_Template, 2, 1, "span")(6, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_6_Template, 2, 1, "span")(7, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_7_Template, 2, 1, "span")(8, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_8_Template, 2, 1, "span")(9, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_9_Template, 2, 1, "span")(10, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_10_Template, 1, 1)(11, DetailCardComponent_Conditional_4_For_2_Conditional_0_Case_11_Template, 3, 6, "span", 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const field_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", field_r8.label, ":");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_13_0 = field_r8.type || "text") === "badge" ? 4 : tmp_13_0 === "date" ? 5 : tmp_13_0 === "time" ? 6 : tmp_13_0 === "datetime" ? 7 : tmp_13_0 === "currency" ? 8 : tmp_13_0 === "percentage" ? 9 : tmp_13_0 === "custom" ? 10 : 11);
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Conditional_0_Template, "DetailCardComponent_Conditional_4_For_2_Conditional_0_Template");
function DetailCardComponent_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DetailCardComponent_Conditional_4_For_2_Conditional_0_Template, 12, 2, "div", 10);
  }
  if (rf & 2) {
    const field_r8 = ctx.$implicit;
    \u0275\u0275conditional(field_r8.visible !== false ? 0 : -1);
  }
}
__name(DetailCardComponent_Conditional_4_For_2_Template, "DetailCardComponent_Conditional_4_For_2_Template");
function DetailCardComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 4);
    \u0275\u0275repeaterCreate(1, DetailCardComponent_Conditional_4_For_2_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.fields);
  }
}
__name(DetailCardComponent_Conditional_4_Template, "DetailCardComponent_Conditional_4_Template");
function DetailCardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275elementContainer(1, 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.customContent);
  }
}
__name(DetailCardComponent_Conditional_5_Template, "DetailCardComponent_Conditional_5_Template");
var _DetailCardComponent = class _DetailCardComponent {
  title;
  subtitle;
  icon;
  fields = [];
  layout = "single";
  customContent;
  getLeftColumnFields() {
    return this.fields.filter((_, index) => index % 2 === 0);
  }
  getRightColumnFields() {
    return this.fields.filter((_, index) => index % 2 === 1);
  }
  formatDate(dateString) {
    if (!dateString)
      return "-";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString.toString();
    }
  }
  formatTime(timeString) {
    if (!timeString)
      return "-";
    try {
      return new Date(timeString).toLocaleTimeString();
    } catch {
      return timeString.toString();
    }
  }
  formatDateTime(dateTimeString) {
    if (!dateTimeString)
      return "-";
    try {
      return new Date(dateTimeString).toLocaleString();
    } catch {
      return dateTimeString.toString();
    }
  }
  formatCurrency(amount) {
    if (amount == null)
      return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  }
  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log("Copied to clipboard:", text);
      });
    }
  }
};
__name(_DetailCardComponent, "DetailCardComponent");
__publicField(_DetailCardComponent, "\u0275fac", /* @__PURE__ */ __name(function DetailCardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DetailCardComponent)();
}, "DetailCardComponent_Factory"));
__publicField(_DetailCardComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailCardComponent, selectors: [["app-detail-card"]], inputs: { title: "title", subtitle: "subtitle", icon: "icon", fields: "fields", layout: "layout", customContent: "customContent" }, decls: 6, vars: 3, consts: [[1, "app-detail-card", "card"], [1, "card-header"], [1, "card-body"], [1, "row"], [1, "app-definition-list"], [1, "mt-3"], [1, "card-title", "mb-0"], [3, "class"], [1, "text-muted"], [1, "col-md-6"], [1, "app-definition-item"], [1, "app-data-label"], [1, "app-data-value"], [3, "text-muted", "app-clickable"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "click"], ["title", "Copy to clipboard", 1, "fas", "fa-copy", "ms-2", "text-muted", "app-clickable"], ["title", "Copy to clipboard", 1, "fas", "fa-copy", "ms-2", "text-muted", "app-clickable", 3, "click"], [3, "ngTemplateOutlet"]], template: /* @__PURE__ */ __name(function DetailCardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, DetailCardComponent_Conditional_1_Template, 5, 3, "div", 1);
    \u0275\u0275elementStart(2, "div", 2);
    \u0275\u0275conditionalCreate(3, DetailCardComponent_Conditional_3_Template, 9, 0, "div", 3)(4, DetailCardComponent_Conditional_4_Template, 3, 0, "dl", 4);
    \u0275\u0275conditionalCreate(5, DetailCardComponent_Conditional_5_Template, 2, 1, "div", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.title ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.layout === "two-column" ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.customContent ? 5 : -1);
  }
}, "DetailCardComponent_Template"), dependencies: [CommonModule, NgTemplateOutlet], encapsulation: 2 }));
var DetailCardComponent = _DetailCardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DetailCardComponent, [{
    type: Component,
    args: [{
      selector: "app-detail-card",
      standalone: true,
      imports: [CommonModule],
      template: `
    <div class="app-detail-card card">
      @if (title) {
        <div class="card-header">
          <h5 class="card-title mb-0">
            @if (icon) {
              <i [class]="icon + ' me-2'"></i>
            }
            {{ title }}
          </h5>
          @if (subtitle) {
            <small class="text-muted">{{ subtitle }}</small>
          }
        </div>
      }
    
      <div class="card-body">
        @if (layout === 'two-column') {
          <!-- Two-column layout for forms -->
          <div class="row">
            <div class="col-md-6">
              <dl class="app-definition-list">
                @for (field of getLeftColumnFields(); track field.label) {
                  @if (field.visible !== false) {
                    <div class="app-definition-item">
                      <dt class="app-data-label">{{ field.label }}:</dt>
                      <dd class="app-data-value">
                        @switch (field.type || 'text') {
                          <!-- Badge type -->
                          @case ('badge') {
                            <span
                              [class]="'badge bg-' + (field.badgeVariant || 'primary')">
                              {{ field.value }}
                            </span>
                          }
                          <!-- Date type -->
                          @case ('date') {
                            <span>
                              {{ formatDate(field.value) }}
                            </span>
                          }
                          <!-- Time type -->
                          @case ('time') {
                            <span>
                              {{ formatTime(field.value) }}
                            </span>
                          }
                          <!-- DateTime type -->
                          @case ('datetime') {
                            <span>
                              {{ formatDateTime(field.value) }}
                            </span>
                          }
                          <!-- Currency type -->
                          @case ('currency') {
                            <span>
                              {{ formatCurrency(field.value) }}
                            </span>
                          }
                          <!-- Percentage type -->
                          @case ('percentage') {
                            <span>
                              {{ field.value }}%
                            </span>
                          }
                          <!-- Custom template -->
                          @case ('custom') {
                            @if (field.customTemplate) {
                              <ng-container [ngTemplateOutlet]="field.customTemplate"
                              [ngTemplateOutletContext]="{ $implicit: field.value, field: field }"></ng-container>
                            }
                          }
                          <!-- Default text -->
                          @default {
                            <span
                              [class.text-muted]="!field.value || field.value === '-'"
                              [class.app-clickable]="field.onClick"
                              (click)="field.onClick && field.onClick()">
                              {{ field.value || '-' }}
                              @if (field.copyable && field.value) {
                                <i class="fas fa-copy ms-2 text-muted app-clickable"
                                  (click)="copyToClipboard(field.value)"
                                title="Copy to clipboard"></i>
                              }
                            </span>
                          }
                        }
                      </dd>
                    </div>
                  }
                }
              </dl>
            </div>
    
            <div class="col-md-6">
              <dl class="app-definition-list">
                @for (field of getRightColumnFields(); track field.label) {
                  @if (field.visible !== false) {
                    <div class="app-definition-item">
                      <dt class="app-data-label">{{ field.label }}:</dt>
                      <dd class="app-data-value">
                        @switch (field.type || 'text') {
                          <!-- Badge type -->
                          @case ('badge') {
                            <span
                              [class]="'badge bg-' + (field.badgeVariant || 'primary')">
                              {{ field.value }}
                            </span>
                          }
                          <!-- Date type -->
                          @case ('date') {
                            <span>
                              {{ formatDate(field.value) }}
                            </span>
                          }
                          <!-- Time type -->
                          @case ('time') {
                            <span>
                              {{ formatTime(field.value) }}
                            </span>
                          }
                          <!-- DateTime type -->
                          @case ('datetime') {
                            <span>
                              {{ formatDateTime(field.value) }}
                            </span>
                          }
                          <!-- Currency type -->
                          @case ('currency') {
                            <span>
                              {{ formatCurrency(field.value) }}
                            </span>
                          }
                          <!-- Percentage type -->
                          @case ('percentage') {
                            <span>
                              {{ field.value }}%
                            </span>
                          }
                          <!-- Custom template -->
                          @case ('custom') {
                            @if (field.customTemplate) {
                              <ng-container [ngTemplateOutlet]="field.customTemplate"
                              [ngTemplateOutletContext]="{ $implicit: field.value, field: field }"></ng-container>
                            }
                          }
                          <!-- Default text -->
                          @default {
                            <span
                              [class.text-muted]="!field.value || field.value === '-'"
                              [class.app-clickable]="field.onClick"
                              (click)="field.onClick && field.onClick()">
                              {{ field.value || '-' }}
                              @if (field.copyable && field.value) {
                                <i class="fas fa-copy ms-2 text-muted app-clickable"
                                  (click)="copyToClipboard(field.value)"
                                title="Copy to clipboard"></i>
                              }
                            </span>
                          }
                        }
                      </dd>
                    </div>
                  }
                }
              </dl>
            </div>
          </div>
        } @else {
          <!-- Single column layout -->
          <dl class="app-definition-list">
            @for (field of fields; track field.label) {
              @if (field.visible !== false) {
                <div class="app-definition-item">
                  <dt class="app-data-label">{{ field.label }}:</dt>
                  <dd class="app-data-value">
                    @switch (field.type || 'text') {
                      <!-- Badge type -->
                      @case ('badge') {
                        <span
                          [class]="'badge bg-' + (field.badgeVariant || 'primary')">
                          {{ field.value }}
                        </span>
                      }
                      <!-- Date type -->
                      @case ('date') {
                        <span>
                          {{ formatDate(field.value) }}
                        </span>
                      }
                      <!-- Time type -->
                      @case ('time') {
                        <span>
                          {{ formatTime(field.value) }}
                        </span>
                      }
                      <!-- DateTime type -->
                      @case ('datetime') {
                        <span>
                          {{ formatDateTime(field.value) }}
                        </span>
                      }
                      <!-- Currency type -->
                      @case ('currency') {
                        <span>
                          {{ formatCurrency(field.value) }}
                        </span>
                      }
                      <!-- Percentage type -->
                      @case ('percentage') {
                        <span>
                          {{ field.value }}%
                        </span>
                      }
                      <!-- Custom template -->
                      @case ('custom') {
                        @if (field.customTemplate) {
                          <ng-container [ngTemplateOutlet]="field.customTemplate"
                          [ngTemplateOutletContext]="{ $implicit: field.value, field: field }"></ng-container>
                        }
                      }
                      <!-- Default text -->
                      @default {
                        <span
                          [class.text-muted]="!field.value || field.value === '-'"
                          [class.app-clickable]="field.onClick"
                          (click)="field.onClick && field.onClick()">
                          {{ field.value || '-' }}
                          @if (field.copyable && field.value) {
                            <i class="fas fa-copy ms-2 text-muted app-clickable"
                              (click)="copyToClipboard(field.value)"
                            title="Copy to clipboard"></i>
                          }
                        </span>
                      }
                    }
                  </dd>
                </div>
              }
            }
          </dl>
        }
    
        @if (customContent) {
          <div class="mt-3">
            <ng-container [ngTemplateOutlet]="customContent"></ng-container>
          </div>
        }
      </div>
    </div>
    `
    }]
  }], null, { title: [{
    type: Input
  }], subtitle: [{
    type: Input
  }], icon: [{
    type: Input
  }], fields: [{
    type: Input
  }], layout: [{
    type: Input
  }], customContent: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailCardComponent, { className: "DetailCardComponent", filePath: "src/app/shared/components/detail-card/detail-card.component.ts", lineNumber: 271 });
})();

export {
  DetailCardComponent
};
//# sourceMappingURL=chunk-GYKU5QK6.js.map
