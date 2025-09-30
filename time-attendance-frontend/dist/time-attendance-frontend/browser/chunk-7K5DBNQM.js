import {
  FormsModule,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-JBVPS774.js";
import {
  CommonModule,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchDefault,
  NgTemplateOutlet,
  Output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/components/data-table/data-table.component.ts
var _c0 = ["cellTemplate"];
var _c1 = /* @__PURE__ */ __name((a0, a1) => ({ $implicit: a0, actions: a1 }), "_c1");
var _c2 = /* @__PURE__ */ __name((a0, a1) => ({ $implicit: a0, column: a1 }), "_c2");
function DataTableComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "span", 15);
    \u0275\u0275text(3, "Loading...");
    \u0275\u0275elementEnd()()();
  }
}
__name(DataTableComponent_div_1_Template, "DataTableComponent_div_1_Template");
function DataTableComponent_div_2_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26)(2, "input", 27);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DataTableComponent_div_2_div_1_div_1_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const item_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleSelection(item_r2, $event));
    }, "DataTableComponent_div_2_div_1_div_1_Template_input_change_2_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r2.isSelected(item_r2));
  }
}
__name(DataTableComponent_div_2_div_1_div_1_Template, "DataTableComponent_div_2_div_1_div_1_Template");
function DataTableComponent_div_2_div_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 28);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.cardTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c1, item_r2, ctx_r2.getAvailableActions(item_r2)));
  }
}
__name(DataTableComponent_div_2_div_1_ng_container_3_Template, "DataTableComponent_div_2_div_1_ng_container_3_Template");
function DataTableComponent_div_2_div_1_div_4_div_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
__name(DataTableComponent_div_2_div_1_div_4_div_1_ng_container_4_Template, "DataTableComponent_div_2_div_1_div_4_div_1_ng_container_4_Template");
function DataTableComponent_div_2_div_1_div_4_div_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r4 = \u0275\u0275nextContext().$implicit;
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getNestedValue(item_r2, column_r4.key));
  }
}
__name(DataTableComponent_div_2_div_1_div_4_div_1_span_5_Template, "DataTableComponent_div_2_div_1_div_4_div_1_span_5_Template");
function DataTableComponent_div_2_div_1_div_4_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 36);
  }
  if (rf & 2) {
    const column_r4 = \u0275\u0275nextContext().$implicit;
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("innerHTML", ctx_r2.getNestedValue(item_r2, column_r4.key), \u0275\u0275sanitizeHtml);
  }
}
__name(DataTableComponent_div_2_div_1_div_4_div_1_span_6_Template, "DataTableComponent_div_2_div_1_div_4_div_1_span_6_Template");
function DataTableComponent_div_2_div_1_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "span", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 33);
    \u0275\u0275template(4, DataTableComponent_div_2_div_1_div_4_div_1_ng_container_4_Template, 1, 0, "ng-container", 34)(5, DataTableComponent_div_2_div_1_div_4_div_1_span_5_Template, 2, 1, "span", 11)(6, DataTableComponent_div_2_div_1_div_4_div_1_span_6_Template, 1, 1, "span", 35);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r4 = ctx.$implicit;
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", column_r4.mobileLabel || column_r4.label, ":");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.cellTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(5, _c2, item_r2, column_r4));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.cellTemplate && !column_r4.renderHtml);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.cellTemplate && column_r4.renderHtml);
  }
}
__name(DataTableComponent_div_2_div_1_div_4_div_1_Template, "DataTableComponent_div_2_div_1_div_4_div_1_Template");
function DataTableComponent_div_2_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275template(1, DataTableComponent_div_2_div_1_div_4_div_1_Template, 7, 8, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.getVisibleColumns());
  }
}
__name(DataTableComponent_div_2_div_1_div_4_Template, "DataTableComponent_div_2_div_1_div_4_Template");
function DataTableComponent_div_2_div_1_div_5_button_2_i_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const action_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap("fas " + action_r6.icon);
  }
}
__name(DataTableComponent_div_2_div_1_div_5_button_2_i_1_Template, "DataTableComponent_div_2_div_1_div_5_button_2_i_1_Template");
function DataTableComponent_div_2_div_1_div_5_button_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(action_r6.label);
  }
}
__name(DataTableComponent_div_2_div_1_div_5_button_2_span_2_Template, "DataTableComponent_div_2_div_1_div_5_button_2_span_2_Template");
function DataTableComponent_div_2_div_1_div_5_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_div_2_div_1_div_5_button_2_Template_button_click_0_listener() {
      const action_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const item_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onAction(action_r6.key, item_r2));
    }, "DataTableComponent_div_2_div_1_div_5_button_2_Template_button_click_0_listener"));
    \u0275\u0275template(1, DataTableComponent_div_2_div_1_div_5_button_2_i_1_Template, 1, 2, "i", 41)(2, DataTableComponent_div_2_div_1_div_5_button_2_span_2_Template, 2, 1, "span", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r6 = ctx.$implicit;
    \u0275\u0275classMap("btn-outline-" + (action_r6.color || "primary"));
    \u0275\u0275property("title", action_r6.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", action_r6.icon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !action_r6.icon);
  }
}
__name(DataTableComponent_div_2_div_1_div_5_button_2_Template, "DataTableComponent_div_2_div_1_div_5_button_2_Template");
function DataTableComponent_div_2_div_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38);
    \u0275\u0275template(2, DataTableComponent_div_2_div_1_div_5_button_2_Template, 3, 5, "button", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.getAvailableActions(item_r2));
  }
}
__name(DataTableComponent_div_2_div_1_div_5_Template, "DataTableComponent_div_2_div_1_div_5_Template");
function DataTableComponent_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275template(1, DataTableComponent_div_2_div_1_div_1_Template, 3, 1, "div", 20);
    \u0275\u0275elementStart(2, "div", 21);
    \u0275\u0275template(3, DataTableComponent_div_2_div_1_ng_container_3_Template, 1, 5, "ng-container", 22)(4, DataTableComponent_div_2_div_1_div_4_Template, 2, 1, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, DataTableComponent_div_2_div_1_div_5_Template, 3, 1, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.allowSelection);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.cardTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.cardTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.actions.length > 0);
  }
}
__name(DataTableComponent_div_2_div_1_Template, "DataTableComponent_div_2_div_1_Template");
function DataTableComponent_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275element(1, "i", 43);
    \u0275\u0275elementStart(2, "h5");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.emptyMessage || "No Data");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.emptyTitle || "No data available");
  }
}
__name(DataTableComponent_div_2_div_2_Template, "DataTableComponent_div_2_div_2_Template");
function DataTableComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275template(1, DataTableComponent_div_2_div_1_Template, 6, 4, "div", 17)(2, DataTableComponent_div_2_div_2_Template, 6, 2, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.getDisplayedData())("ngForTrackBy", ctx_r2.trackByFn);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.data.length === 0);
  }
}
__name(DataTableComponent_div_2_Template, "DataTableComponent_div_2_Template");
function DataTableComponent_th_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 44)(1, "div", 26)(2, "input", 45);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DataTableComponent_th_8_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSelectAll($event));
    }, "DataTableComponent_th_8_Template_input_change_2_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r2.allSelected())("indeterminate", ctx_r2.someSelected());
  }
}
__name(DataTableComponent_th_8_Template, "DataTableComponent_th_8_Template");
function DataTableComponent_th_9_i_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 50);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("fa-sort-up", ctx_r2.getSortDirection() === "asc")("fa-sort-down", ctx_r2.getSortDirection() === "desc");
  }
}
__name(DataTableComponent_th_9_i_4_Template, "DataTableComponent_th_9_i_4_Template");
function DataTableComponent_th_9_i_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 51);
  }
}
__name(DataTableComponent_th_9_i_5_Template, "DataTableComponent_th_9_i_5_Template");
function DataTableComponent_th_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 46);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_th_9_Template_th_click_0_listener() {
      const column_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSort(column_r9));
    }, "DataTableComponent_th_9_Template_th_click_0_listener"));
    \u0275\u0275elementStart(1, "div", 47)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, DataTableComponent_th_9_i_4_Template, 1, 4, "i", 48)(5, DataTableComponent_th_9_i_5_Template, 1, 0, "i", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("width", column_r9.width);
    \u0275\u0275classProp("sortable", column_r9.sortable)("text-center", column_r9.align === "center")("text-end", column_r9.align === "right")("d-none", column_r9.hideOnMobile && ctx_r2.isMobileView())("d-md-table-cell", column_r9.hideOnMobile);
    \u0275\u0275advance();
    \u0275\u0275classProp("justify-content-center", column_r9.align === "center")("justify-content-end", column_r9.align === "right");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(column_r9.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", column_r9.sortable && ctx_r2.getSortColumn() === column_r9.key);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", column_r9.sortable && ctx_r2.getSortColumn() !== column_r9.key);
  }
}
__name(DataTableComponent_th_9_Template, "DataTableComponent_th_9_Template");
function DataTableComponent_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 52);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
__name(DataTableComponent_th_10_Template, "DataTableComponent_th_10_Template");
function DataTableComponent_tr_12_td_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 44)(1, "div", 26)(2, "input", 27);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DataTableComponent_tr_12_td_1_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const item_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.toggleSelection(item_r11, $event);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DataTableComponent_tr_12_td_1_Template_input_change_2_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r2.isSelected(item_r11));
  }
}
__name(DataTableComponent_tr_12_td_1_Template, "DataTableComponent_tr_12_td_1_Template");
function DataTableComponent_tr_12_td_2_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
__name(DataTableComponent_tr_12_td_2_ng_container_2_ng_container_1_Template, "DataTableComponent_tr_12_td_2_ng_container_2_ng_container_1_Template");
function DataTableComponent_tr_12_td_2_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext(2).$implicit;
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getNestedValue(item_r11, column_r12.key));
  }
}
__name(DataTableComponent_tr_12_td_2_ng_container_2_span_2_Template, "DataTableComponent_tr_12_td_2_ng_container_2_span_2_Template");
function DataTableComponent_tr_12_td_2_ng_container_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 36);
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext(2).$implicit;
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("innerHTML", ctx_r2.getNestedValue(item_r11, column_r12.key), \u0275\u0275sanitizeHtml);
  }
}
__name(DataTableComponent_tr_12_td_2_ng_container_2_span_3_Template, "DataTableComponent_tr_12_td_2_ng_container_2_span_3_Template");
function DataTableComponent_tr_12_td_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, DataTableComponent_tr_12_td_2_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 34)(2, DataTableComponent_tr_12_td_2_ng_container_2_span_2_Template, 2, 1, "span", 11)(3, DataTableComponent_tr_12_td_2_ng_container_2_span_3_Template, 1, 1, "span", 35);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext().$implicit;
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.cellTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(4, _c2, item_r11, column_r12));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.cellTemplate && !column_r12.renderHtml);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.cellTemplate && column_r12.renderHtml);
  }
}
__name(DataTableComponent_tr_12_td_2_ng_container_2_Template, "DataTableComponent_tr_12_td_2_ng_container_2_Template");
function DataTableComponent_tr_12_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275elementContainerStart(1, 54);
    \u0275\u0275template(2, DataTableComponent_tr_12_td_2_ng_container_2_Template, 4, 7, "ng-container", 55);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-center", column_r12.align === "center")("text-end", column_r12.align === "right")("d-none", column_r12.hideOnMobile && ctx_r2.isMobileView())("d-md-table-cell", column_r12.hideOnMobile);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitch", column_r12.key);
  }
}
__name(DataTableComponent_tr_12_td_2_Template, "DataTableComponent_tr_12_td_2_Template");
function DataTableComponent_tr_12_td_3_button_2_i_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const action_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap("fas " + action_r14.icon);
  }
}
__name(DataTableComponent_tr_12_td_3_button_2_i_1_Template, "DataTableComponent_tr_12_td_3_button_2_i_1_Template");
function DataTableComponent_tr_12_td_3_button_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(action_r14.label);
  }
}
__name(DataTableComponent_tr_12_td_3_button_2_span_2_Template, "DataTableComponent_tr_12_td_3_button_2_span_2_Template");
function DataTableComponent_tr_12_td_3_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_tr_12_td_3_button_2_Template_button_click_0_listener($event) {
      const action_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const item_r11 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.onAction(action_r14.key, item_r11);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DataTableComponent_tr_12_td_3_button_2_Template_button_click_0_listener"));
    \u0275\u0275template(1, DataTableComponent_tr_12_td_3_button_2_i_1_Template, 1, 2, "i", 41)(2, DataTableComponent_tr_12_td_3_button_2_span_2_Template, 2, 1, "span", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r14 = ctx.$implicit;
    \u0275\u0275classMap("btn-outline-" + (action_r14.color || "primary"));
    \u0275\u0275property("title", action_r14.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", action_r14.icon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !action_r14.icon);
  }
}
__name(DataTableComponent_tr_12_td_3_button_2_Template, "DataTableComponent_tr_12_td_3_button_2_Template");
function DataTableComponent_tr_12_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52)(1, "div", 38);
    \u0275\u0275template(2, DataTableComponent_tr_12_td_3_button_2_Template, 3, 5, "button", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.getAvailableActions(item_r11));
  }
}
__name(DataTableComponent_tr_12_td_3_Template, "DataTableComponent_tr_12_td_3_Template");
function DataTableComponent_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275template(1, DataTableComponent_tr_12_td_1_Template, 3, 1, "td", 7)(2, DataTableComponent_tr_12_td_2_Template, 3, 9, "td", 53)(3, DataTableComponent_tr_12_td_3_Template, 3, 1, "td", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected-row", ctx_r2.isSelected(item_r11))("inactive-row", !ctx_r2.isActiveItem(item_r11));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.allowSelection);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.getVisibleColumns());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.actions.length > 0);
  }
}
__name(DataTableComponent_tr_12_Template, "DataTableComponent_tr_12_Template");
function DataTableComponent_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 56);
    \u0275\u0275element(2, "i", 43);
    \u0275\u0275elementStart(3, "h5");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r2.getTotalColumns());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.emptyMessage || "No Data");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.emptyTitle || "No data available");
  }
}
__name(DataTableComponent_tr_13_Template, "DataTableComponent_tr_13_Template");
function DataTableComponent_nav_14_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const size_r16 = ctx.$implicit;
    \u0275\u0275property("value", size_r16);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(size_r16);
  }
}
__name(DataTableComponent_nav_14_option_7_Template, "DataTableComponent_nav_14_option_7_Template");
function DataTableComponent_nav_14_li_15_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 73);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_nav_14_li_15_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const page_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onPageChange(page_r18));
    }, "DataTableComponent_nav_14_li_15_button_1_Template_button_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r18, " ");
  }
}
__name(DataTableComponent_nav_14_li_15_button_1_Template, "DataTableComponent_nav_14_li_15_button_1_Template");
function DataTableComponent_nav_14_li_15_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1, "...");
    \u0275\u0275elementEnd();
  }
}
__name(DataTableComponent_nav_14_li_15_span_2_Template, "DataTableComponent_nav_14_li_15_span_2_Template");
function DataTableComponent_nav_14_li_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 65);
    \u0275\u0275template(1, DataTableComponent_nav_14_li_15_button_1_Template, 2, 1, "button", 71)(2, DataTableComponent_nav_14_li_15_span_2_Template, 2, 0, "span", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r18 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", page_r18 === ctx_r2.getCurrentPage())("disabled", page_r18 === -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", page_r18 !== -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", page_r18 === -1);
  }
}
__name(DataTableComponent_nav_14_li_15_Template, "DataTableComponent_nav_14_li_15_Template");
function DataTableComponent_nav_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 57)(1, "div", 58)(2, "div", 59)(3, "div", 47)(4, "label", 60);
    \u0275\u0275text(5, "Page Size:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "select", 61);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DataTableComponent_nav_14_Template_select_change_6_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageSizeChange(+$event.target.value));
    }, "DataTableComponent_nav_14_Template_select_change_6_listener"));
    \u0275\u0275template(7, DataTableComponent_nav_14_option_7_Template, 2, 2, "option", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 63);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 59)(11, "ul", 64)(12, "li", 65)(13, "button", 66);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_nav_14_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageChange(ctx_r2.getCurrentPage() - 1));
    }, "DataTableComponent_nav_14_Template_button_click_13_listener"));
    \u0275\u0275element(14, "i", 67);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, DataTableComponent_nav_14_li_15_Template, 3, 6, "li", 68);
    \u0275\u0275elementStart(16, "li", 65)(17, "button", 66);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_nav_14_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageChange(ctx_r2.getCurrentPage() + 1));
    }, "DataTableComponent_nav_14_Template_button_click_17_listener"));
    \u0275\u0275element(18, "i", 69);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r2.getPageSizeValue());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.pageSizeOptions);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Showing ", ctx_r2.getDisplayStart(), "-", ctx_r2.getDisplayEnd(), " of ", ctx_r2.getTotalItemsValue(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", ctx_r2.getCurrentPage() === 1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.getCurrentPage() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.getPageNumbers());
    \u0275\u0275advance();
    \u0275\u0275classProp("disabled", ctx_r2.getCurrentPage() === ctx_r2.getTotalPagesValue());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.getCurrentPage() === ctx_r2.getTotalPagesValue());
  }
}
__name(DataTableComponent_nav_14_Template, "DataTableComponent_nav_14_Template");
var _DataTableComponent = class _DataTableComponent {
  data = [];
  columns = [];
  actions = [];
  loading = false;
  allowSelection = false;
  showPagination = true;
  emptyMessage = "No data available";
  emptyTitle = "No Data";
  responsiveMode = "auto";
  cardTemplate;
  searchable = false;
  sortable = false;
  exportable = false;
  paginated = false;
  // Pagination
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  // Sorting
  sortColumn = "";
  sortDirection = "asc";
  // Custom template outlets
  cellTemplate;
  actionClick = new EventEmitter();
  selectionChange = new EventEmitter();
  sortChange = new EventEmitter();
  pageChange = new EventEmitter();
  pageSizeChange = new EventEmitter();
  selectedItems = signal([], ...ngDevMode ? [{ debugName: "selectedItems" }] : []);
  allSelected = signal(false, ...ngDevMode ? [{ debugName: "allSelected" }] : []);
  someSelected = signal(false, ...ngDevMode ? [{ debugName: "someSelected" }] : []);
  // Helper to get loading value whether it's a signal or boolean
  isLoading() {
    return typeof this.loading === "function" ? this.loading() : this.loading;
  }
  // Helper to get currentPage value
  getCurrentPage() {
    return typeof this.currentPage === "function" ? this.currentPage() : this.currentPage;
  }
  // Helper to get totalPages value
  getTotalPagesValue() {
    if (this.paginated) {
      const pageSize = this.getPageSizeValue();
      return Math.ceil(this.data.length / pageSize);
    }
    return typeof this.totalPages === "function" ? this.totalPages() : this.totalPages;
  }
  // Helper to get totalItems value
  getTotalItemsValue() {
    if (this.paginated) {
      return this.data.length;
    }
    return typeof this.totalItems === "function" ? this.totalItems() : this.totalItems;
  }
  // Helper to get pageSize value
  getPageSizeValue() {
    return typeof this.pageSize === "function" ? this.pageSize() : this.pageSize;
  }
  // Helper to get sortColumn value
  getSortColumn() {
    return typeof this.sortColumn === "function" ? this.sortColumn() : this.sortColumn;
  }
  // Helper to get sortDirection value
  getSortDirection() {
    return typeof this.sortDirection === "function" ? this.sortDirection() : this.sortDirection;
  }
  // Get displayed data (paginated or full)
  getDisplayedData() {
    if (this.paginated) {
      const pageSize = this.getPageSizeValue();
      const currentPage = this.getCurrentPage();
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return this.data.slice(startIndex, endIndex);
    }
    return this.data;
  }
  trackByFn(index, item) {
    return item.id || index;
  }
  getTotalColumns() {
    let count = this.columns.length;
    if (this.allowSelection)
      count++;
    if (this.actions.length > 0)
      count++;
    return count;
  }
  getNestedValue(obj, path) {
    return path.split(".").reduce((current, prop) => current?.[prop], obj);
  }
  getAvailableActions(item) {
    return this.actions.filter((action) => !action.condition || action.condition(item));
  }
  isSelected(item) {
    return this.selectedItems().some((selected) => selected.id === item.id);
  }
  toggleSelection(item, event) {
    const checked = event.target.checked;
    const selected = this.selectedItems();
    if (checked) {
      this.selectedItems.set([...selected, item]);
    } else {
      this.selectedItems.set(selected.filter((s) => s.id !== item.id));
    }
    this.updateSelectionState();
    this.selectionChange.emit(this.selectedItems());
  }
  toggleSelectAll(event) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedItems.set([...this.data]);
    } else {
      this.selectedItems.set([]);
    }
    this.updateSelectionState();
    this.selectionChange.emit(this.selectedItems());
  }
  updateSelectionState() {
    const selected = this.selectedItems().length;
    const total = this.data.length;
    this.allSelected.set(selected === total && total > 0);
    this.someSelected.set(selected > 0 && selected < total);
  }
  onSort(column) {
    if (!column.sortable)
      return;
    let direction = "asc";
    if (this.getSortColumn() === column.key) {
      direction = this.getSortDirection() === "asc" ? "desc" : "asc";
    }
    if (typeof this.sortColumn === "function") {
      this.sortColumn.set(column.key);
    } else {
      this.sortColumn = column.key;
    }
    if (typeof this.sortDirection === "function") {
      this.sortDirection.set(direction);
    } else {
      this.sortDirection = direction;
    }
    this.sortChange.emit({ column: column.key, direction });
  }
  onAction(actionKey, item) {
    this.actionClick.emit({ action: actionKey, item });
  }
  onPageChange(page) {
    this.pageChange.emit(page);
  }
  onPageSizeChange(size) {
    if (typeof this.pageSize === "function") {
      this.pageSize.set(size);
    } else {
      this.pageSize = size;
    }
    if (typeof this.currentPage === "function") {
      this.currentPage.set(1);
    } else {
      this.currentPage = 1;
    }
    this.pageSizeChange.emit(size);
  }
  isActiveItem(item) {
    return item.isActive !== false;
  }
  getDisplayStart() {
    return (this.getCurrentPage() - 1) * this.getPageSizeValue() + 1;
  }
  getDisplayEnd() {
    return Math.min(this.getCurrentPage() * this.getPageSizeValue(), this.getTotalItemsValue());
  }
  getPageNumbers() {
    const total = this.getTotalPagesValue();
    const current = this.getCurrentPage();
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, -1, total);
      } else if (current >= total - 3) {
        pages.push(1, -1, total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, -1, current - 1, current, current + 1, -1, total);
      }
    }
    return pages;
  }
  getVisibleColumns() {
    if (typeof window === "undefined")
      return this.columns;
    const isMobile = window.innerWidth < 768;
    if (!isMobile)
      return this.columns;
    return this.columns.filter((col) => !col.hideOnMobile);
  }
  getColumnPriority(column) {
    switch (column.priority) {
      case "high":
        return 1;
      case "medium":
        return 2;
      case "low":
        return 3;
      default:
        return 2;
    }
  }
  isMobileView() {
    if (typeof window === "undefined")
      return false;
    return window.innerWidth < 768;
  }
};
__name(_DataTableComponent, "DataTableComponent");
__publicField(_DataTableComponent, "\u0275fac", /* @__PURE__ */ __name(function DataTableComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DataTableComponent)();
}, "DataTableComponent_Factory"));
__publicField(_DataTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DataTableComponent, selectors: [["app-data-table"]], contentQueries: /* @__PURE__ */ __name(function DataTableComponent_ContentQueries(rf, ctx, dirIndex) {
  if (rf & 1) {
    \u0275\u0275contentQuery(dirIndex, _c0, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.cellTemplate = _t.first);
  }
}, "DataTableComponent_ContentQueries"), inputs: { data: "data", columns: "columns", actions: "actions", loading: "loading", allowSelection: "allowSelection", showPagination: "showPagination", emptyMessage: "emptyMessage", emptyTitle: "emptyTitle", responsiveMode: "responsiveMode", cardTemplate: "cardTemplate", searchable: "searchable", sortable: "sortable", exportable: "exportable", paginated: "paginated", currentPage: "currentPage", totalPages: "totalPages", totalItems: "totalItems", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions", sortColumn: "sortColumn", sortDirection: "sortDirection" }, outputs: { actionClick: "actionClick", selectionChange: "selectionChange", sortChange: "sortChange", pageChange: "pageChange", pageSizeChange: "pageSizeChange" }, decls: 15, vars: 15, consts: [[1, "unified-data-table"], ["class", "text-center p-4", 4, "ngIf"], ["class", "mobile-cards d-block d-md-none", 4, "ngIf"], [1, "table-container"], [1, "table-responsive"], [1, "table", "table-hover"], [1, "table-light", "sticky-top"], ["class", "selection-column", 4, "ngIf"], [3, "width", "sortable", "text-center", "text-end", "d-none", "d-md-table-cell", "click", 4, "ngFor", "ngForOf"], ["class", "actions-column", 4, "ngIf"], [3, "selected-row", "inactive-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngIf"], ["class", "mt-3", 4, "ngIf"], [1, "text-center", "p-4"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mobile-cards", "d-block", "d-md-none"], ["class", "mobile-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "mobile-empty-state", 4, "ngIf"], [1, "mobile-card"], ["class", "mobile-card-selection", 4, "ngIf"], [1, "mobile-card-content"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], ["class", "default-card-layout", 4, "ngIf"], ["class", "mobile-card-actions", 4, "ngIf"], [1, "mobile-card-selection"], [1, "form-check"], ["type", "checkbox", 1, "form-check-input", 3, "change", "checked"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "default-card-layout"], ["class", "mobile-field", 4, "ngFor", "ngForOf"], [1, "mobile-field"], [1, "mobile-label"], [1, "mobile-value"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], [1, "mobile-card-actions"], [1, "btn-group", "btn-group-sm"], ["class", "btn", 3, "class", "title", "click", 4, "ngFor", "ngForOf"], [1, "btn", 3, "click", "title"], [3, "class", 4, "ngIf"], [1, "mobile-empty-state"], [1, "fas", "fa-inbox", "fa-3x", "mb-3"], [1, "selection-column"], ["type", "checkbox", 1, "form-check-input", 3, "change", "checked", "indeterminate"], [3, "click"], [1, "d-flex", "align-items-center"], ["class", "ms-2 fas", 3, "fa-sort-up", "fa-sort-down", 4, "ngIf"], ["class", "ms-2 fas fa-sort text-muted", 4, "ngIf"], [1, "ms-2", "fas"], [1, "ms-2", "fas", "fa-sort", "text-muted"], [1, "actions-column"], [3, "text-center", "text-end", "d-none", "d-md-table-cell", 4, "ngFor", "ngForOf"], [3, "ngSwitch"], [4, "ngSwitchDefault"], [1, "text-center", "py-4", "text-muted"], [1, "mt-3"], [1, "row", "align-items-center"], [1, "col-md-6"], [1, "form-label", "me-2", "mb-0"], [1, "form-select", "form-select-sm", 2, "width", "auto", 3, "change", "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "text-muted", "ms-3"], [1, "pagination", "pagination-sm", "justify-content-end", "mb-0"], [1, "page-item"], [1, "page-link", 3, "click", "disabled"], [1, "fas", "fa-chevron-left"], ["class", "page-item", 3, "active", "disabled", 4, "ngFor", "ngForOf"], [1, "fas", "fa-chevron-right"], [3, "value"], ["class", "page-link", 3, "click", 4, "ngIf"], ["class", "page-link", 4, "ngIf"], [1, "page-link", 3, "click"], [1, "page-link"]], template: /* @__PURE__ */ __name(function DataTableComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, DataTableComponent_div_1_Template, 4, 0, "div", 1)(2, DataTableComponent_div_2_Template, 3, 3, "div", 2);
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "table", 5)(6, "thead", 6)(7, "tr");
    \u0275\u0275template(8, DataTableComponent_th_8_Template, 3, 2, "th", 7)(9, DataTableComponent_th_9_Template, 6, 19, "th", 8)(10, DataTableComponent_th_10_Template, 2, 0, "th", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, DataTableComponent_tr_12_Template, 4, 7, "tr", 10)(13, DataTableComponent_tr_13_Template, 7, 3, "tr", 11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(14, DataTableComponent_nav_14_Template, 19, 12, "nav", 12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isLoading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isLoading() && (ctx.responsiveMode === "cards" || ctx.responsiveMode === "auto"));
    \u0275\u0275advance();
    \u0275\u0275classProp("d-none", ctx.isMobileView() && (ctx.responsiveMode === "cards" || ctx.responsiveMode === "auto"))("d-md-block", ctx.responsiveMode === "cards" || ctx.responsiveMode === "auto");
    \u0275\u0275advance();
    \u0275\u0275classProp("overflow-auto", ctx.responsiveMode === "horizontal-scroll");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx.allowSelection);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.getVisibleColumns());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.actions.length > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx.getDisplayedData())("ngForTrackBy", ctx.trackByFn);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.data.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.showPagination && ctx.getTotalPagesValue() > 1);
  }
}, "DataTableComponent_Template"), dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgSwitch, NgSwitchDefault, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption], styles: ["\n\n.unified-data-table[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.table-container[_ngcontent-%COMP%] {\n  min-height: 400px;\n  overflow: visible;\n}\n.table[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #dee2e6;\n  background-color: #f8f9fa;\n  font-weight: 600;\n  color: #495057;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: all 0.2s ease;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n  cursor: pointer;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected-row[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  border-left: 4px solid #2196f3;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.inactive-row[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.inactive-row[_ngcontent-%COMP%]:hover {\n  background-color: #ffeaa7;\n}\n.selection-column[_ngcontent-%COMP%] {\n  width: 50px;\n  text-align: center;\n}\n.actions-column[_ngcontent-%COMP%] {\n  width: 100px;\n  text-align: center;\n}\n.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s ease;\n}\n.sortable[_ngcontent-%COMP%]:hover {\n  color: #2196f3;\n  background-color: #f0f7ff;\n}\n.sortable[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.6;\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n.sortable[_ngcontent-%COMP%]:hover   .fas[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.btn-outline-danger[_ngcontent-%COMP%]:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-info[_ngcontent-%COMP%]:hover {\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n.btn-outline-warning[_ngcontent-%COMP%]:hover {\n  background-color: #ffc107;\n  border-color: #ffc107;\n  color: #212529;\n}\n.form-check-input[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.form-check-input[_ngcontent-%COMP%]:indeterminate {\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.form-select[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: border-color 0.2s ease;\n}\n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #2196f3;\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.pagination[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.page-link[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border: 1px solid #dee2e6;\n  transition: all 0.2s ease;\n}\n.page-link[_ngcontent-%COMP%]:hover {\n  color: #2196f3;\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n}\n.page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: #2196f3;\n  border-color: #2196f3;\n  color: white;\n}\n.page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #adb5bd;\n  background-color: #fff;\n  border-color: #dee2e6;\n  cursor: not-allowed;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  color: #2196f3;\n  width: 3rem;\n  height: 3rem;\n}\n.text-muted[_ngcontent-%COMP%]   i.fa-3x[_ngcontent-%COMP%] {\n  color: #adb5bd !important;\n  margin-bottom: 1rem;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:focus-within {\n  outline: 2px solid #2196f3;\n  outline-offset: -2px;\n}\n.btn[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.table-responsive[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: visible;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n[dir=rtl][_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected-row[_ngcontent-%COMP%] {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n.mobile-cards[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.mobile-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n  overflow: hidden;\n}\n.mobile-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n  transform: translateY(-2px);\n}\n.mobile-card.selected-row[_ngcontent-%COMP%] {\n  border-color: #2196f3;\n  background-color: #f3f9ff;\n}\n.mobile-card-selection[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem 0;\n  border-bottom: 1px solid #f8f9fa;\n}\n.mobile-card-content[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.default-card-layout[_ngcontent-%COMP%]   .mobile-field[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: start;\n  margin-bottom: 0.5rem;\n  padding: 0.25rem 0;\n  border-bottom: 1px solid #f8f9fa;\n}\n.default-card-layout[_ngcontent-%COMP%]   .mobile-field[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  margin-bottom: 0;\n}\n.mobile-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  flex: 0 0 40%;\n  font-size: 0.875rem;\n}\n.mobile-value[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: right;\n  font-size: 0.875rem;\n  word-break: break-word;\n}\n.mobile-card-actions[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  background-color: #f8f9fa;\n  border-top: 1px solid #dee2e6;\n}\n.mobile-card-actions[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.mobile-card-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: auto;\n}\n.mobile-empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #6c757d;\n}\n.mobile-empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #adb5bd;\n}\n@media (max-width: 768px) {\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.75rem;\n  }\n  .pagination[_ngcontent-%COMP%] {\n    justify-content: center;\n    margin-top: 1rem;\n  }\n  .d-flex.align-items-center[_ngcontent-%COMP%]   span.text-muted[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .table[_ngcontent-%COMP%]   th[data-priority=low][_ngcontent-%COMP%], \n   .table[_ngcontent-%COMP%]   td[data-priority=low][_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n@media (max-width: 576px) {\n  .table-container[_ngcontent-%COMP%] {\n    min-height: 300px;\n  }\n  .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.5rem 0.25rem;\n  }\n  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 0.5rem 0.25rem;\n  }\n  .btn-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    margin-bottom: 2px;\n    border-radius: 4px !important;\n  }\n  .actions-column[_ngcontent-%COMP%] {\n    width: 80px;\n  }\n  .table[_ngcontent-%COMP%]   th[data-priority=medium][_ngcontent-%COMP%], \n   .table[_ngcontent-%COMP%]   td[data-priority=medium][_ngcontent-%COMP%], \n   .table[_ngcontent-%COMP%]   th[data-priority=low][_ngcontent-%COMP%], \n   .table[_ngcontent-%COMP%]   td[data-priority=low][_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .mobile-cards[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .mobile-card[_ngcontent-%COMP%] {\n    margin-bottom: 0.75rem;\n  }\n  .mobile-label[_ngcontent-%COMP%] {\n    flex: 0 0 35%;\n    font-size: 0.8rem;\n  }\n  .mobile-value[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .mobile-card-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.375rem 0.5rem;\n  }\n}\n@media (min-width: 1400px) {\n  .table-container[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1024px) {\n  .table[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.375rem 0.75rem;\n    font-size: 0.8rem;\n  }\n}\n@media print {\n  .actions-column[_ngcontent-%COMP%], \n   .pagination[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .table[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected-row[_ngcontent-%COMP%] {\n    background-color: transparent !important;\n    border-left: none !important;\n  }\n}\n/*# sourceMappingURL=data-table.component.css.map */"] }));
var DataTableComponent = _DataTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableComponent, [{
    type: Component,
    args: [{ selector: "app-data-table", standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="unified-data-table">
      <!-- Loading State -->
      <div *ngIf="isLoading()" class="text-center p-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Mobile Card View -->
      <div class="mobile-cards d-block d-md-none" *ngIf="!isLoading() && (responsiveMode === 'cards' || responsiveMode === 'auto')">
        <div *ngFor="let item of getDisplayedData(); trackBy: trackByFn" class="mobile-card">
          <!-- Selection -->
          <div *ngIf="allowSelection" class="mobile-card-selection">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                [checked]="isSelected(item)"
                (change)="toggleSelection(item, $event)"
              />
            </div>
          </div>

          <!-- Card Content -->
          <div class="mobile-card-content">
            <!-- Custom template if provided -->
            <ng-container *ngIf="cardTemplate"
                         [ngTemplateOutlet]="cardTemplate"
                         [ngTemplateOutletContext]="{ $implicit: item, actions: getAvailableActions(item) }">
            </ng-container>

            <!-- Default card layout -->
            <div *ngIf="!cardTemplate" class="default-card-layout">
              <div *ngFor="let column of getVisibleColumns()" class="mobile-field">
                <span class="mobile-label">{{ column.mobileLabel || column.label }}:</span>
                <span class="mobile-value">
                  <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column }">
                  </ng-container>
                  <span *ngIf="!cellTemplate && !column.renderHtml">{{ getNestedValue(item, column.key) }}</span>
                  <span *ngIf="!cellTemplate && column.renderHtml" [innerHTML]="getNestedValue(item, column.key)"></span>
                </span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div *ngIf="actions.length > 0" class="mobile-card-actions">
            <div class="btn-group btn-group-sm">
              <button *ngFor="let action of getAvailableActions(item)"
                      class="btn"
                      [class]="'btn-outline-' + (action.color || 'primary')"
                      [title]="action.label"
                      (click)="onAction(action.key, item)">
                <i *ngIf="action.icon" [class]="'fas ' + action.icon"></i>
                <span *ngIf="!action.icon">{{ action.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty state for mobile -->
        <div *ngIf="data.length === 0" class="mobile-empty-state">
          <i class="fas fa-inbox fa-3x mb-3"></i>
          <h5>{{ emptyMessage || 'No Data' }}</h5>
          <p>{{ emptyTitle || 'No data available' }}</p>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="table-container" [class.d-none]="isMobileView() && (responsiveMode === 'cards' || responsiveMode === 'auto')" [class.d-md-block]="responsiveMode === 'cards' || responsiveMode === 'auto'">
        <div class="table-responsive" [class.overflow-auto]="responsiveMode === 'horizontal-scroll'">
          <table class="table table-hover">
            <thead class="table-light sticky-top">
              <tr>
                <!-- Selection column -->
                <th *ngIf="allowSelection" class="selection-column">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      [checked]="allSelected()"
                      [indeterminate]="someSelected()"
                      (change)="toggleSelectAll($event)"
                    />
                  </div>
                </th>

                <!-- Data columns -->
                <th *ngFor="let column of getVisibleColumns()"
                    [style.width]="column.width"
                    [class.sortable]="column.sortable"
                    [class.text-center]="column.align === 'center'"
                    [class.text-end]="column.align === 'right'"
                    [class.d-none]="column.hideOnMobile && isMobileView()"
                    [class.d-md-table-cell]="column.hideOnMobile"
                    (click)="onSort(column)">
                  <div class="d-flex align-items-center"
                       [class.justify-content-center]="column.align === 'center'"
                       [class.justify-content-end]="column.align === 'right'">
                    <span>{{ column.label }}</span>
                    <i *ngIf="column.sortable && getSortColumn() === column.key"
                       class="ms-2 fas"
                       [class.fa-sort-up]="getSortDirection() === 'asc'"
                       [class.fa-sort-down]="getSortDirection() === 'desc'"></i>
                    <i *ngIf="column.sortable && getSortColumn() !== column.key"
                       class="ms-2 fas fa-sort text-muted"></i>
                  </div>
                </th>

                <!-- Actions column -->
                <th *ngIf="actions.length > 0" class="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of getDisplayedData(); trackBy: trackByFn"
                  [class.selected-row]="isSelected(item)"
                  [class.inactive-row]="!isActiveItem(item)">

                <!-- Selection cell -->
                <td *ngIf="allowSelection" class="selection-column">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      [checked]="isSelected(item)"
                      (change)="toggleSelection(item, $event); $event.stopPropagation()"
                    />
                  </div>
                </td>

                <!-- Data cells -->
                <td *ngFor="let column of getVisibleColumns()"
                    [class.text-center]="column.align === 'center'"
                    [class.text-end]="column.align === 'right'"
                    [class.d-none]="column.hideOnMobile && isMobileView()"
                    [class.d-md-table-cell]="column.hideOnMobile">
                  <ng-container [ngSwitch]="column.key">
                    <ng-container *ngSwitchDefault>
                      <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column }">
                      </ng-container>
                      <span *ngIf="!cellTemplate && !column.renderHtml">{{ getNestedValue(item, column.key) }}</span>
                      <span *ngIf="!cellTemplate && column.renderHtml" [innerHTML]="getNestedValue(item, column.key)"></span>
                    </ng-container>
                  </ng-container>
                </td>

                <!-- Actions cell -->
                <td *ngIf="actions.length > 0" class="actions-column">
                  <div class="btn-group btn-group-sm">
                    <button *ngFor="let action of getAvailableActions(item)"
                            class="btn"
                            [class]="'btn-outline-' + (action.color || 'primary')"
                            [title]="action.label"
                            (click)="onAction(action.key, item); $event.stopPropagation()">
                      <i *ngIf="action.icon" [class]="'fas ' + action.icon"></i>
                      <span *ngIf="!action.icon">{{ action.label }}</span>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty state -->
              <tr *ngIf="data.length === 0">
                <td [attr.colspan]="getTotalColumns()" class="text-center py-4 text-muted">
                  <i class="fas fa-inbox fa-3x mb-3"></i>
                  <h5>{{ emptyMessage || 'No Data' }}</h5>
                  <p>{{ emptyTitle || 'No data available' }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Enhanced Pagination -->
        <nav *ngIf="showPagination && getTotalPagesValue() > 1" class="mt-3">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="d-flex align-items-center">
                <label class="form-label me-2 mb-0">Page Size:</label>
                <select
                  class="form-select form-select-sm"
                  style="width: auto;"
                  [value]="getPageSizeValue()"
                  (change)="onPageSizeChange(+$any($event.target).value)"
                >
                  <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</option>
                </select>
                <span class="text-muted ms-3">
                  Showing
                  {{ getDisplayStart() }}-{{ getDisplayEnd() }}
                  of
                  {{ getTotalItemsValue() }}
                </span>
              </div>
            </div>
            <div class="col-md-6">
              <ul class="pagination pagination-sm justify-content-end mb-0">
                <li class="page-item" [class.disabled]="getCurrentPage() === 1">
                  <button class="page-link" (click)="onPageChange(getCurrentPage() - 1)" [disabled]="getCurrentPage() === 1">
                    <i class="fas fa-chevron-left"></i>
                  </button>
                </li>

                <li *ngFor="let page of getPageNumbers()"
                    class="page-item"
                    [class.active]="page === getCurrentPage()"
                    [class.disabled]="page === -1">
                  <button
                    class="page-link"
                    *ngIf="page !== -1"
                    (click)="onPageChange(page)"
                  >
                    {{ page }}
                  </button>
                  <span class="page-link" *ngIf="page === -1">...</span>
                </li>

                <li class="page-item" [class.disabled]="getCurrentPage() === getTotalPagesValue()">
                  <button class="page-link" (click)="onPageChange(getCurrentPage() + 1)" [disabled]="getCurrentPage() === getTotalPagesValue()">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;66c288f92461acaa05c89274763acad77c117273c58fc1ef4202777532979212;D:/Work/AI Code/TimeAttendanceSystem/time-attendance-frontend/src/app/shared/components/data-table/data-table.component.ts */\n.unified-data-table {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.table-container {\n  min-height: 400px;\n  overflow: visible;\n}\n.table {\n  margin-bottom: 0;\n}\n.table thead th {\n  border-bottom: 2px solid #dee2e6;\n  background-color: #f8f9fa;\n  font-weight: 600;\n  color: #495057;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.table tbody tr {\n  transition: all 0.2s ease;\n  animation: fadeIn 0.3s ease-out;\n}\n.table tbody tr:hover {\n  background-color: #f8f9fa;\n  cursor: pointer;\n}\n.table tbody tr.selected-row {\n  background-color: #e3f2fd;\n  border-left: 4px solid #2196f3;\n}\n.table tbody tr.inactive-row {\n  background-color: #fff3cd;\n}\n.table tbody tr.inactive-row:hover {\n  background-color: #ffeaa7;\n}\n.selection-column {\n  width: 50px;\n  text-align: center;\n}\n.actions-column {\n  width: 100px;\n  text-align: center;\n}\n.sortable {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s ease;\n}\n.sortable:hover {\n  color: #2196f3;\n  background-color: #f0f7ff;\n}\n.sortable .fas {\n  font-size: 0.75rem;\n  opacity: 0.6;\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n.sortable:hover .fas {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.btn-group .btn {\n  border: none;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n}\n.btn-group .btn:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.btn-outline-primary:hover {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.btn-outline-danger:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-outline-secondary:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-info:hover {\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n.btn-outline-warning:hover {\n  background-color: #ffc107;\n  border-color: #ffc107;\n  color: #212529;\n}\n.form-check-input {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.form-check-input:checked {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.form-check-input:indeterminate {\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.form-select {\n  cursor: pointer;\n  transition: border-color 0.2s ease;\n}\n.form-select:focus {\n  border-color: #2196f3;\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.pagination {\n  margin-bottom: 0;\n}\n.page-link {\n  color: #6c757d;\n  border: 1px solid #dee2e6;\n  transition: all 0.2s ease;\n}\n.page-link:hover {\n  color: #2196f3;\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n}\n.page-item.active .page-link {\n  background-color: #2196f3;\n  border-color: #2196f3;\n  color: white;\n}\n.page-item.disabled .page-link {\n  color: #adb5bd;\n  background-color: #fff;\n  border-color: #dee2e6;\n  cursor: not-allowed;\n}\n.spinner-border {\n  color: #2196f3;\n  width: 3rem;\n  height: 3rem;\n}\n.text-muted i.fa-3x {\n  color: #adb5bd !important;\n  margin-bottom: 1rem;\n}\n.table tbody tr:focus-within {\n  outline: 2px solid #2196f3;\n  outline-offset: -2px;\n}\n.btn:focus {\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.table-responsive {\n  border-radius: 8px;\n  overflow: visible;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n[dir=rtl] .table tbody tr.selected-row {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n.mobile-cards {\n  padding: 1rem;\n}\n.mobile-card {\n  background: white;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n  overflow: hidden;\n}\n.mobile-card:hover {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n  transform: translateY(-2px);\n}\n.mobile-card.selected-row {\n  border-color: #2196f3;\n  background-color: #f3f9ff;\n}\n.mobile-card-selection {\n  padding: 0.75rem 1rem 0;\n  border-bottom: 1px solid #f8f9fa;\n}\n.mobile-card-content {\n  padding: 1rem;\n}\n.default-card-layout .mobile-field {\n  display: flex;\n  justify-content: space-between;\n  align-items: start;\n  margin-bottom: 0.5rem;\n  padding: 0.25rem 0;\n  border-bottom: 1px solid #f8f9fa;\n}\n.default-card-layout .mobile-field:last-child {\n  border-bottom: none;\n  margin-bottom: 0;\n}\n.mobile-label {\n  font-weight: 600;\n  color: #495057;\n  flex: 0 0 40%;\n  font-size: 0.875rem;\n}\n.mobile-value {\n  flex: 1;\n  text-align: right;\n  font-size: 0.875rem;\n  word-break: break-word;\n}\n.mobile-card-actions {\n  padding: 0.75rem 1rem;\n  background-color: #f8f9fa;\n  border-top: 1px solid #dee2e6;\n}\n.mobile-card-actions .btn-group {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.mobile-card-actions .btn {\n  flex: 1;\n  min-width: auto;\n}\n.mobile-empty-state {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #6c757d;\n}\n.mobile-empty-state i {\n  color: #adb5bd;\n}\n@media (max-width: 768px) {\n  .table-responsive {\n    font-size: 0.875rem;\n  }\n  .btn-group .btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.75rem;\n  }\n  .pagination {\n    justify-content: center;\n    margin-top: 1rem;\n  }\n  .d-flex.align-items-center span.text-muted {\n    display: none;\n  }\n  .table th[data-priority=low],\n  .table td[data-priority=low] {\n    display: none !important;\n  }\n}\n@media (max-width: 576px) {\n  .table-container {\n    min-height: 300px;\n  }\n  .table thead th {\n    font-size: 0.75rem;\n    padding: 0.5rem 0.25rem;\n  }\n  .table tbody td {\n    padding: 0.5rem 0.25rem;\n  }\n  .btn-group {\n    flex-direction: column;\n  }\n  .btn-group .btn {\n    margin-bottom: 2px;\n    border-radius: 4px !important;\n  }\n  .actions-column {\n    width: 80px;\n  }\n  .table th[data-priority=medium],\n  .table td[data-priority=medium],\n  .table th[data-priority=low],\n  .table td[data-priority=low] {\n    display: none !important;\n  }\n  .mobile-cards {\n    padding: 0.5rem;\n  }\n  .mobile-card {\n    margin-bottom: 0.75rem;\n  }\n  .mobile-label {\n    flex: 0 0 35%;\n    font-size: 0.8rem;\n  }\n  .mobile-value {\n    font-size: 0.8rem;\n  }\n  .mobile-card-actions .btn {\n    font-size: 0.75rem;\n    padding: 0.375rem 0.5rem;\n  }\n}\n@media (min-width: 1400px) {\n  .table-container {\n    font-size: 0.95rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1024px) {\n  .table {\n    font-size: 0.9rem;\n  }\n  .btn-group .btn {\n    padding: 0.375rem 0.75rem;\n    font-size: 0.8rem;\n  }\n}\n@media print {\n  .actions-column,\n  .pagination {\n    display: none !important;\n  }\n  .table {\n    font-size: 0.8rem;\n  }\n  .table tbody tr.selected-row {\n    background-color: transparent !important;\n    border-left: none !important;\n  }\n}\n/*# sourceMappingURL=data-table.component.css.map */\n"] }]
  }], null, { data: [{
    type: Input
  }], columns: [{
    type: Input
  }], actions: [{
    type: Input
  }], loading: [{
    type: Input
  }], allowSelection: [{
    type: Input
  }], showPagination: [{
    type: Input
  }], emptyMessage: [{
    type: Input
  }], emptyTitle: [{
    type: Input
  }], responsiveMode: [{
    type: Input
  }], cardTemplate: [{
    type: Input
  }], searchable: [{
    type: Input
  }], sortable: [{
    type: Input
  }], exportable: [{
    type: Input
  }], paginated: [{
    type: Input
  }], currentPage: [{
    type: Input
  }], totalPages: [{
    type: Input
  }], totalItems: [{
    type: Input
  }], pageSize: [{
    type: Input
  }], pageSizeOptions: [{
    type: Input
  }], sortColumn: [{
    type: Input
  }], sortDirection: [{
    type: Input
  }], cellTemplate: [{
    type: ContentChild,
    args: ["cellTemplate"]
  }], actionClick: [{
    type: Output
  }], selectionChange: [{
    type: Output
  }], sortChange: [{
    type: Output
  }], pageChange: [{
    type: Output
  }], pageSizeChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DataTableComponent, { className: "DataTableComponent", filePath: "src/app/shared/components/data-table/data-table.component.ts", lineNumber: 703 });
})();

export {
  DataTableComponent
};
//# sourceMappingURL=chunk-7K5DBNQM.js.map
