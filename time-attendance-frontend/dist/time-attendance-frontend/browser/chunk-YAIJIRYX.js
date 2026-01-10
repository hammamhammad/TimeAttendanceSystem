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
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/shared/components/definition-list/definition-list.component.ts
var _c0 = /* @__PURE__ */ __name((a0) => ({ item: a0 }), "_c0");
var _c1 = /* @__PURE__ */ __name((a0, a1) => ({ $implicit: a0, item: a1 }), "_c1");
function DefinitionListComponent_Conditional_1_For_4_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classMap(item_r1.icon + " me-1");
  }
}
__name(DefinitionListComponent_Conditional_1_For_4_Conditional_0_Conditional_1_Template, "DefinitionListComponent_Conditional_1_For_4_Conditional_0_Conditional_1_Template");
function DefinitionListComponent_Conditional_1_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275conditionalCreate(1, DefinitionListComponent_Conditional_1_For_4_Conditional_0_Conditional_1_Template, 1, 2, "i", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275elementContainer(4, 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    const valueTemplate_r3 = \u0275\u0275reference(4);
    \u0275\u0275classMap("col-sm-" + ctx_r1.labelWidth + " definition-label");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r1.icon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.label, ": ");
    \u0275\u0275advance();
    \u0275\u0275classMap("col-sm-" + ctx_r1.valueWidth + " definition-value");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", valueTemplate_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(8, _c0, item_r1));
  }
}
__name(DefinitionListComponent_Conditional_1_For_4_Conditional_0_Template, "DefinitionListComponent_Conditional_1_For_4_Conditional_0_Template");
function DefinitionListComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DefinitionListComponent_Conditional_1_For_4_Conditional_0_Template, 5, 10);
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275conditional(item_r1.visible !== false ? 0 : -1);
  }
}
__name(DefinitionListComponent_Conditional_1_For_4_Template, "DefinitionListComponent_Conditional_1_For_4_Template");
function DefinitionListComponent_Conditional_1_For_8_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classMap(item_r4.icon + " me-1");
  }
}
__name(DefinitionListComponent_Conditional_1_For_8_Conditional_0_Conditional_1_Template, "DefinitionListComponent_Conditional_1_For_8_Conditional_0_Conditional_1_Template");
function DefinitionListComponent_Conditional_1_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275conditionalCreate(1, DefinitionListComponent_Conditional_1_For_8_Conditional_0_Conditional_1_Template, 1, 2, "i", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275elementContainer(4, 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    const valueTemplate_r3 = \u0275\u0275reference(4);
    \u0275\u0275classMap("col-sm-" + ctx_r1.labelWidth + " definition-label");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r4.icon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.label, ": ");
    \u0275\u0275advance();
    \u0275\u0275classMap("col-sm-" + ctx_r1.valueWidth + " definition-value");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", valueTemplate_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(8, _c0, item_r4));
  }
}
__name(DefinitionListComponent_Conditional_1_For_8_Conditional_0_Template, "DefinitionListComponent_Conditional_1_For_8_Conditional_0_Template");
function DefinitionListComponent_Conditional_1_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DefinitionListComponent_Conditional_1_For_8_Conditional_0_Template, 5, 10);
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275conditional(item_r4.visible !== false ? 0 : -1);
  }
}
__name(DefinitionListComponent_Conditional_1_For_8_Template, "DefinitionListComponent_Conditional_1_For_8_Template");
function DefinitionListComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 3)(2, "dl", 2);
    \u0275\u0275repeaterCreate(3, DefinitionListComponent_Conditional_1_For_4_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 3)(6, "dl", 2);
    \u0275\u0275repeaterCreate(7, DefinitionListComponent_Conditional_1_For_8_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.getLeftColumnItems());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.getRightColumnItems());
  }
}
__name(DefinitionListComponent_Conditional_1_Template, "DefinitionListComponent_Conditional_1_Template");
function DefinitionListComponent_Conditional_2_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(item_r5.icon + " me-1");
  }
}
__name(DefinitionListComponent_Conditional_2_For_2_Conditional_1_Template, "DefinitionListComponent_Conditional_2_For_2_Conditional_1_Template");
function DefinitionListComponent_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275conditionalCreate(1, DefinitionListComponent_Conditional_2_For_2_Conditional_1_Template, 1, 2, "i", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275elementContainer(4, 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    const valueTemplate_r3 = \u0275\u0275reference(4);
    \u0275\u0275classMap("col-sm-" + ctx_r1.labelWidth + " definition-label");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r5.icon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r5.label, ": ");
    \u0275\u0275advance();
    \u0275\u0275classMap("col-sm-" + ctx_r1.valueWidth + " definition-value");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", valueTemplate_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(8, _c0, item_r5));
  }
}
__name(DefinitionListComponent_Conditional_2_For_2_Template, "DefinitionListComponent_Conditional_2_For_2_Template");
function DefinitionListComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 2);
    \u0275\u0275repeaterCreate(1, DefinitionListComponent_Conditional_2_For_2_Template, 5, 10, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getVisibleItems());
  }
}
__name(DefinitionListComponent_Conditional_2_Template, "DefinitionListComponent_Conditional_2_Template");
function DefinitionListComponent_ng_template_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().item;
    \u0275\u0275classMap("badge bg-" + (item_r7.badgeVariant || "primary"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.value, " ");
  }
}
__name(DefinitionListComponent_ng_template_3_Case_1_Template, "DefinitionListComponent_ng_template_3_Case_1_Template");
function DefinitionListComponent_ng_template_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().item;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(item_r7.value), " ");
  }
}
__name(DefinitionListComponent_ng_template_3_Case_2_Template, "DefinitionListComponent_ng_template_3_Case_2_Template");
function DefinitionListComponent_ng_template_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().item;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatTime(item_r7.value), " ");
  }
}
__name(DefinitionListComponent_ng_template_3_Case_3_Template, "DefinitionListComponent_ng_template_3_Case_3_Template");
function DefinitionListComponent_ng_template_3_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().item;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDateTime(item_r7.value), " ");
  }
}
__name(DefinitionListComponent_ng_template_3_Case_4_Template, "DefinitionListComponent_ng_template_3_Case_4_Template");
function DefinitionListComponent_ng_template_3_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().item;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatCurrency(item_r7.value), " ");
  }
}
__name(DefinitionListComponent_ng_template_3_Case_5_Template, "DefinitionListComponent_ng_template_3_Case_5_Template");
function DefinitionListComponent_ng_template_3_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().item;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.value, "% ");
  }
}
__name(DefinitionListComponent_ng_template_3_Case_6_Template, "DefinitionListComponent_ng_template_3_Case_6_Template");
function DefinitionListComponent_ng_template_3_Case_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 9);
  }
}
__name(DefinitionListComponent_ng_template_3_Case_7_Conditional_2_Template, "DefinitionListComponent_ng_template_3_Case_7_Conditional_2_Template");
function DefinitionListComponent_ng_template_3_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 7);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, DefinitionListComponent_ng_template_3_Case_7_Conditional_2_Template, 1, 0, "i", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().item;
    \u0275\u0275property("href", item_r7.href || "#", \u0275\u0275sanitizeUrl)("target", item_r7.href ? "_blank" : "_self");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.value, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r7.href ? 2 : -1);
  }
}
__name(DefinitionListComponent_ng_template_3_Case_7_Template, "DefinitionListComponent_ng_template_3_Case_7_Template");
function DefinitionListComponent_ng_template_3_Case_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 5);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).item;
    \u0275\u0275property("ngTemplateOutlet", item_r7.customTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c1, item_r7.value, item_r7));
  }
}
__name(DefinitionListComponent_ng_template_3_Case_8_Conditional_0_Template, "DefinitionListComponent_ng_template_3_Case_8_Conditional_0_Template");
function DefinitionListComponent_ng_template_3_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DefinitionListComponent_ng_template_3_Case_8_Conditional_0_Template, 1, 5, "ng-container", 5);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().item;
    \u0275\u0275conditional(item_r7.customTemplate ? 0 : -1);
  }
}
__name(DefinitionListComponent_ng_template_3_Case_8_Template, "DefinitionListComponent_ng_template_3_Case_8_Template");
function DefinitionListComponent_ng_template_3_Case_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "i", 11);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DefinitionListComponent_ng_template_3_Case_9_Conditional_2_Template_i_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const item_r7 = \u0275\u0275nextContext(2).item;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.copyToClipboard(item_r7.value, $event));
    }, "DefinitionListComponent_ng_template_3_Case_9_Conditional_2_Template_i_click_0_listener"));
    \u0275\u0275elementEnd();
  }
}
__name(DefinitionListComponent_ng_template_3_Case_9_Conditional_2_Template, "DefinitionListComponent_ng_template_3_Case_9_Conditional_2_Template");
function DefinitionListComponent_ng_template_3_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, DefinitionListComponent_ng_template_3_Case_9_Conditional_2_Template, 1, 0, "i", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().item;
    \u0275\u0275classProp("text-muted", !item_r7.value || item_r7.value === "-")("definition-clickable", item_r7.onClick);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.value || "-", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r7.copyable && item_r7.value ? 2 : -1);
  }
}
__name(DefinitionListComponent_ng_template_3_Case_9_Template, "DefinitionListComponent_ng_template_3_Case_9_Template");
function DefinitionListComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DefinitionListComponent_ng_template_3_Template_div_click_0_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).item;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onItemClick(item_r7, $event));
    }, "DefinitionListComponent_ng_template_3_Template_div_click_0_listener"));
    \u0275\u0275conditionalCreate(1, DefinitionListComponent_ng_template_3_Case_1_Template, 2, 3, "span", 4)(2, DefinitionListComponent_ng_template_3_Case_2_Template, 2, 1, "span")(3, DefinitionListComponent_ng_template_3_Case_3_Template, 2, 1, "span")(4, DefinitionListComponent_ng_template_3_Case_4_Template, 2, 1, "span")(5, DefinitionListComponent_ng_template_3_Case_5_Template, 2, 1, "span")(6, DefinitionListComponent_ng_template_3_Case_6_Template, 2, 1, "span")(7, DefinitionListComponent_ng_template_3_Case_7_Template, 3, 4, "a", 7)(8, DefinitionListComponent_ng_template_3_Case_8_Template, 1, 1)(9, DefinitionListComponent_ng_template_3_Case_9_Template, 3, 6, "span", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const item_r7 = ctx.item;
    \u0275\u0275classMap(item_r7.valueClass);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = item_r7.type || "text") === "badge" ? 1 : tmp_4_0 === "date" ? 2 : tmp_4_0 === "time" ? 3 : tmp_4_0 === "datetime" ? 4 : tmp_4_0 === "currency" ? 5 : tmp_4_0 === "percentage" ? 6 : tmp_4_0 === "link" ? 7 : tmp_4_0 === "custom" ? 8 : 9);
  }
}
__name(DefinitionListComponent_ng_template_3_Template, "DefinitionListComponent_ng_template_3_Template");
var _DefinitionListComponent = class _DefinitionListComponent {
  items = [];
  layout = "single";
  striped = false;
  bordered = false;
  compact = false;
  labelWidth = "4";
  // Bootstrap column width (1-12)
  valueWidth = "8";
  // Bootstrap column width (1-12)
  getLeftColumnItems() {
    return this.items.filter((_, index) => index % 2 === 0);
  }
  getRightColumnItems() {
    return this.items.filter((_, index) => index % 2 === 1);
  }
  getVisibleItems() {
    return this.items.filter((item) => item.visible !== false);
  }
  getListClasses() {
    const classes = ["definition-list"];
    if (this.striped) {
      classes.push("definition-list-striped");
    }
    if (this.bordered) {
      classes.push("definition-list-bordered");
    }
    if (this.compact) {
      classes.push("definition-list-compact");
    }
    return classes.join(" ");
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
  copyToClipboard(text, event) {
    event.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log("Copied to clipboard:", text);
      });
    }
  }
  onItemClick(item, event) {
    if (item.onClick) {
      event.preventDefault();
      item.onClick();
    }
  }
};
__name(_DefinitionListComponent, "DefinitionListComponent");
__publicField(_DefinitionListComponent, "\u0275fac", /* @__PURE__ */ __name(function DefinitionListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DefinitionListComponent)();
}, "DefinitionListComponent_Factory"));
__publicField(_DefinitionListComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DefinitionListComponent, selectors: [["app-definition-list"]], inputs: { items: "items", layout: "layout", striped: "striped", bordered: "bordered", compact: "compact", labelWidth: "labelWidth", valueWidth: "valueWidth" }, decls: 5, vars: 3, consts: [["valueTemplate", ""], [1, "row"], [1, "row", "mb-0"], [1, "col-md-6"], [3, "class"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "click"], [1, "definition-link", 3, "href", "target"], [3, "text-muted", "definition-clickable"], [1, "fa-solid", "fa-external-link-alt", "ms-1", "small"], ["title", "Copy to clipboard", 1, "fa-solid", "fa-copy", "ms-2", "text-muted", "definition-copy-icon"], ["title", "Copy to clipboard", 1, "fa-solid", "fa-copy", "ms-2", "text-muted", "definition-copy-icon", 3, "click"]], template: /* @__PURE__ */ __name(function DefinitionListComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, DefinitionListComponent_Conditional_1_Template, 9, 0, "div", 1)(2, DefinitionListComponent_Conditional_2_Template, 3, 0, "dl", 2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, DefinitionListComponent_ng_template_3_Template, 10, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.getListClasses());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.layout === "two-column" ? 1 : 2);
  }
}, "DefinitionListComponent_Template"), dependencies: [CommonModule, NgTemplateOutlet], styles: ["\n\n.definition-list[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.definition-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.definition-value[_ngcontent-%COMP%] {\n  color: #212529;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.definition-list-striped[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]:nth-child(even) {\n  background-color: rgba(0, 0, 0, 0.02);\n}\n.definition-list-bordered[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%], \n.definition-list-bordered[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dee2e6;\n}\n.definition-list-bordered[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]:last-child   dt[_ngcontent-%COMP%], \n.definition-list-bordered[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]:last-child   dd[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.definition-list-compact[_ngcontent-%COMP%]   .definition-label[_ngcontent-%COMP%], \n.definition-list-compact[_ngcontent-%COMP%]   .definition-value[_ngcontent-%COMP%] {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.definition-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: color 0.2s;\n}\n.definition-clickable[_ngcontent-%COMP%]:hover {\n  color: #0d6efd;\n  text-decoration: underline;\n}\n.definition-link[_ngcontent-%COMP%] {\n  color: #0d6efd;\n  text-decoration: none;\n}\n.definition-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.definition-copy-icon[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-size: 0.875rem;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n}\n.definition-copy-icon[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\ndl[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n/*# sourceMappingURL=definition-list.component.css.map */"] }));
var DefinitionListComponent = _DefinitionListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefinitionListComponent, [{
    type: Component,
    args: [{ selector: "app-definition-list", standalone: true, imports: [CommonModule], template: `<div [class]="getListClasses()">\r
  @if (layout === 'two-column') {\r
    <!-- Two-column layout -->\r
    <div class="row">\r
      <div class="col-md-6">\r
        <dl class="row mb-0">\r
          @for (item of getLeftColumnItems(); track $index) {\r
            @if (item.visible !== false) {\r
              <dt [class]="'col-sm-' + labelWidth + ' definition-label'">\r
                @if (item.icon) {\r
                  <i [class]="item.icon + ' me-1'"></i>\r
                }\r
                {{ item.label }}:\r
              </dt>\r
              <dd [class]="'col-sm-' + valueWidth + ' definition-value'">\r
                <ng-container [ngTemplateOutlet]="valueTemplate" [ngTemplateOutletContext]="{ item: item }"></ng-container>\r
              </dd>\r
            }\r
          }\r
        </dl>\r
      </div>\r
\r
      <div class="col-md-6">\r
        <dl class="row mb-0">\r
          @for (item of getRightColumnItems(); track $index) {\r
            @if (item.visible !== false) {\r
              <dt [class]="'col-sm-' + labelWidth + ' definition-label'">\r
                @if (item.icon) {\r
                  <i [class]="item.icon + ' me-1'"></i>\r
                }\r
                {{ item.label }}:\r
              </dt>\r
              <dd [class]="'col-sm-' + valueWidth + ' definition-value'">\r
                <ng-container [ngTemplateOutlet]="valueTemplate" [ngTemplateOutletContext]="{ item: item }"></ng-container>\r
              </dd>\r
            }\r
          }\r
        </dl>\r
      </div>\r
    </div>\r
  } @else {\r
    <!-- Single column layout -->\r
    <dl class="row mb-0">\r
      @for (item of getVisibleItems(); track $index) {\r
        <dt [class]="'col-sm-' + labelWidth + ' definition-label'">\r
          @if (item.icon) {\r
            <i [class]="item.icon + ' me-1'"></i>\r
          }\r
          {{ item.label }}:\r
        </dt>\r
        <dd [class]="'col-sm-' + valueWidth + ' definition-value'">\r
          <ng-container [ngTemplateOutlet]="valueTemplate" [ngTemplateOutletContext]="{ item: item }"></ng-container>\r
        </dd>\r
      }\r
    </dl>\r
  }\r
</div>\r
\r
<!-- Value Template -->\r
<ng-template #valueTemplate let-item="item">\r
  <div [class]="item.valueClass" (click)="onItemClick(item, $event)">\r
    @switch (item.type || 'text') {\r
      <!-- Badge type -->\r
      @case ('badge') {\r
        <span\r
          [class]="'badge bg-' + (item.badgeVariant || 'primary')">\r
          {{ item.value }}\r
        </span>\r
      }\r
      <!-- Date type -->\r
      @case ('date') {\r
        <span>\r
          {{ formatDate(item.value) }}\r
        </span>\r
      }\r
      <!-- Time type -->\r
      @case ('time') {\r
        <span>\r
          {{ formatTime(item.value) }}\r
        </span>\r
      }\r
      <!-- DateTime type -->\r
      @case ('datetime') {\r
        <span>\r
          {{ formatDateTime(item.value) }}\r
        </span>\r
      }\r
      <!-- Currency type -->\r
      @case ('currency') {\r
        <span>\r
          {{ formatCurrency(item.value) }}\r
        </span>\r
      }\r
      <!-- Percentage type -->\r
      @case ('percentage') {\r
        <span>\r
          {{ item.value }}%\r
        </span>\r
      }\r
      <!-- Link type -->\r
      @case ('link') {\r
        <a\r
          [href]="item.href || '#'"\r
          [target]="item.href ? '_blank' : '_self'"\r
          class="definition-link">\r
          {{ item.value }}\r
          @if (item.href) {\r
            <i class="fa-solid fa-external-link-alt ms-1 small"></i>\r
          }\r
        </a>\r
      }\r
      <!-- Custom template -->\r
      @case ('custom') {\r
        @if (item.customTemplate) {\r
          <ng-container [ngTemplateOutlet]="item.customTemplate"\r
          [ngTemplateOutletContext]="{ $implicit: item.value, item: item }"></ng-container>\r
        }\r
      }\r
      <!-- Default text -->\r
      @default {\r
        <span\r
          [class.text-muted]="!item.value || item.value === '-'"\r
          [class.definition-clickable]="item.onClick">\r
          {{ item.value || '-' }}\r
          @if (item.copyable && item.value) {\r
            <i class="fa-solid fa-copy ms-2 text-muted definition-copy-icon"\r
              (click)="copyToClipboard(item.value, $event)"\r
            title="Copy to clipboard"></i>\r
          }\r
        </span>\r
      }\r
    }\r
  </div>\r
</ng-template>`, styles: ["/* src/app/shared/components/definition-list/definition-list.component.css */\n.definition-list {\n  margin-bottom: 0;\n}\n.definition-label {\n  font-weight: 600;\n  color: #495057;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.definition-value {\n  color: #212529;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.definition-list-striped .row:nth-child(even) {\n  background-color: rgba(0, 0, 0, 0.02);\n}\n.definition-list-bordered dt,\n.definition-list-bordered dd {\n  border-bottom: 1px solid #dee2e6;\n}\n.definition-list-bordered .row:last-child dt,\n.definition-list-bordered .row:last-child dd {\n  border-bottom: none;\n}\n.definition-list-compact .definition-label,\n.definition-list-compact .definition-value {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.definition-clickable {\n  cursor: pointer;\n  transition: color 0.2s;\n}\n.definition-clickable:hover {\n  color: #0d6efd;\n  text-decoration: underline;\n}\n.definition-link {\n  color: #0d6efd;\n  text-decoration: none;\n}\n.definition-link:hover {\n  text-decoration: underline;\n}\n.definition-copy-icon {\n  cursor: pointer;\n  font-size: 0.875rem;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n}\n.definition-copy-icon:hover {\n  opacity: 1;\n}\ndl {\n  margin-bottom: 0;\n}\n/*# sourceMappingURL=definition-list.component.css.map */\n"] }]
  }], null, { items: [{
    type: Input
  }], layout: [{
    type: Input
  }], striped: [{
    type: Input
  }], bordered: [{
    type: Input
  }], compact: [{
    type: Input
  }], labelWidth: [{
    type: Input
  }], valueWidth: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DefinitionListComponent, { className: "DefinitionListComponent", filePath: "src/app/shared/components/definition-list/definition-list.component.ts", lineNumber: 25 });
})();

export {
  DefinitionListComponent
};
//# sourceMappingURL=chunk-YAIJIRYX.js.map
