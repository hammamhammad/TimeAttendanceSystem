import {
  EmptyStateComponent
} from "./chunk-NKWUQBPB.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  FormsModule,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import {
  CommonModule,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  NgTemplateOutlet,
  Output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/shared/components/data-table/data-table.component.ts
var _c0 = ["cellTemplate"];
var _c1 = /* @__PURE__ */ __name((a0, a1) => ({ $implicit: a0, actions: a1 }), "_c1");
var _c2 = /* @__PURE__ */ __name((a0, a1) => ({ $implicit: a0, column: a1 }), "_c2");
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.key, "_forTrack0");
function DataTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
__name(DataTableComponent_Conditional_1_Template, "DataTableComponent_Conditional_1_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 18)(2, "input", 19);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DataTableComponent_Conditional_2_For_2_Conditional_1_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const item_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleSelection(item_r2, $event));
    }, "DataTableComponent_Conditional_2_For_2_Conditional_1_Template_input_change_2_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r2.isSelected(item_r2));
  }
}
__name(DataTableComponent_Conditional_2_For_2_Conditional_1_Template, "DataTableComponent_Conditional_2_For_2_Conditional_1_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 15);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.cardTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c1, item_r2, ctx_r2.getAvailableActions(item_r2)));
  }
}
__name(DataTableComponent_Conditional_2_For_2_Conditional_3_Template, "DataTableComponent_Conditional_2_For_2_Conditional_3_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
__name(DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_ng_container_4_Template, "DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_ng_container_4_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Conditional_5_Template(rf, ctx) {
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
__name(DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Conditional_5_Template, "DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Conditional_5_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 24);
  }
  if (rf & 2) {
    const column_r4 = \u0275\u0275nextContext().$implicit;
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("innerHTML", ctx_r2.getNestedValue(item_r2, column_r4.key), \u0275\u0275sanitizeHtml);
  }
}
__name(DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Conditional_6_Template, "DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Conditional_6_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 22);
    \u0275\u0275template(4, DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_ng_container_4_Template, 1, 0, "ng-container", 23);
    \u0275\u0275conditionalCreate(5, DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Conditional_5_Template, 2, 1, "span");
    \u0275\u0275conditionalCreate(6, DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Conditional_6_Template, 1, 1, "span", 24);
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
    \u0275\u0275conditional(!ctx_r2.cellTemplate && !column_r4.renderHtml ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.cellTemplate && column_r4.renderHtml ? 6 : -1);
  }
}
__name(DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Template, "DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, DataTableComponent_Conditional_2_For_2_Conditional_4_For_2_Template, 7, 8, "div", 20, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.getVisibleColumns());
  }
}
__name(DataTableComponent_Conditional_2_For_2_Conditional_4_Template, "DataTableComponent_Conditional_2_For_2_Conditional_4_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const action_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap("fas " + action_r6.icon);
  }
}
__name(DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Conditional_1_Template, "DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Conditional_1_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Conditional_2_Template(rf, ctx) {
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
__name(DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Conditional_2_Template, "DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Conditional_2_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Template_button_click_0_listener() {
      const action_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const item_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onAction(action_r6.key, item_r2));
    }, "DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Conditional_1_Template, 1, 2, "i", 28);
    \u0275\u0275conditionalCreate(2, DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Conditional_2_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r6 = ctx.$implicit;
    \u0275\u0275classMap("btn-outline-" + (action_r6.color || "primary"));
    \u0275\u0275property("title", action_r6.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(action_r6.icon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!action_r6.icon ? 2 : -1);
  }
}
__name(DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Template, "DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Template");
function DataTableComponent_Conditional_2_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 25);
    \u0275\u0275repeaterCreate(2, DataTableComponent_Conditional_2_For_2_Conditional_5_For_3_Template, 3, 5, "button", 26, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.getAvailableActions(item_r2));
  }
}
__name(DataTableComponent_Conditional_2_For_2_Conditional_5_Template, "DataTableComponent_Conditional_2_For_2_Conditional_5_Template");
function DataTableComponent_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275conditionalCreate(1, DataTableComponent_Conditional_2_For_2_Conditional_1_Template, 3, 1, "div", 13);
    \u0275\u0275elementStart(2, "div", 14);
    \u0275\u0275conditionalCreate(3, DataTableComponent_Conditional_2_For_2_Conditional_3_Template, 1, 5, "ng-container", 15);
    \u0275\u0275conditionalCreate(4, DataTableComponent_Conditional_2_For_2_Conditional_4_Template, 3, 0, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, DataTableComponent_Conditional_2_For_2_Conditional_5_Template, 4, 0, "div", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.allowSelection ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.cardTemplate ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.cardTemplate ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.actions.length > 0 ? 5 : -1);
  }
}
__name(DataTableComponent_Conditional_2_For_2_Template, "DataTableComponent_Conditional_2_For_2_Template");
function DataTableComponent_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 12);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("icon", "fa-inbox")("title", ctx_r2.emptyTitle || "No Data")("message", ctx_r2.emptyMessage || "No data available");
  }
}
__name(DataTableComponent_Conditional_2_Conditional_3_Template, "DataTableComponent_Conditional_2_Conditional_3_Template");
function DataTableComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275repeaterCreate(1, DataTableComponent_Conditional_2_For_2_Template, 6, 4, "div", 11, \u0275\u0275componentInstance().trackByFn, true);
    \u0275\u0275conditionalCreate(3, DataTableComponent_Conditional_2_Conditional_3_Template, 1, 3, "app-empty-state", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.getDisplayedData());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.data.length === 0 ? 3 : -1);
  }
}
__name(DataTableComponent_Conditional_2_Template, "DataTableComponent_Conditional_2_Template");
function DataTableComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 6)(1, "div", 18)(2, "input", 29);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DataTableComponent_Conditional_8_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSelectAll($event));
    }, "DataTableComponent_Conditional_8_Template_input_change_2_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r2.allSelected())("indeterminate", ctx_r2.someSelected());
  }
}
__name(DataTableComponent_Conditional_8_Template, "DataTableComponent_Conditional_8_Template");
function DataTableComponent_For_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 34);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("fa-sort-up", ctx_r2.getSortDirection() === "asc")("fa-sort-down", ctx_r2.getSortDirection() === "desc");
  }
}
__name(DataTableComponent_For_10_Conditional_4_Template, "DataTableComponent_For_10_Conditional_4_Template");
function DataTableComponent_For_10_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 33);
  }
}
__name(DataTableComponent_For_10_Conditional_5_Template, "DataTableComponent_For_10_Conditional_5_Template");
function DataTableComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_For_10_Template_th_click_0_listener() {
      const column_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSort(column_r9));
    }, "DataTableComponent_For_10_Template_th_click_0_listener"));
    \u0275\u0275elementStart(1, "div", 31)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DataTableComponent_For_10_Conditional_4_Template, 1, 4, "i", 32);
    \u0275\u0275conditionalCreate(5, DataTableComponent_For_10_Conditional_5_Template, 1, 0, "i", 33);
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
    \u0275\u0275conditional(column_r9.sortable && ctx_r2.getSortColumn() === column_r9.key ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r9.sortable && ctx_r2.getSortColumn() !== column_r9.key ? 5 : -1);
  }
}
__name(DataTableComponent_For_10_Template, "DataTableComponent_For_10_Template");
function DataTableComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 8);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
__name(DataTableComponent_Conditional_11_Template, "DataTableComponent_Conditional_11_Template");
function DataTableComponent_For_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 6)(1, "div", 18)(2, "input", 19);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DataTableComponent_For_14_Conditional_1_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const item_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.toggleSelection(item_r11, $event);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DataTableComponent_For_14_Conditional_1_Template_input_change_2_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r2.isSelected(item_r11));
  }
}
__name(DataTableComponent_For_14_Conditional_1_Template, "DataTableComponent_For_14_Conditional_1_Template");
function DataTableComponent_For_14_For_3_Case_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
__name(DataTableComponent_For_14_For_3_Case_1_ng_container_0_Template, "DataTableComponent_For_14_For_3_Case_1_ng_container_0_Template");
function DataTableComponent_For_14_For_3_Case_1_Conditional_1_Template(rf, ctx) {
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
__name(DataTableComponent_For_14_For_3_Case_1_Conditional_1_Template, "DataTableComponent_For_14_For_3_Case_1_Conditional_1_Template");
function DataTableComponent_For_14_For_3_Case_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 24);
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext(2).$implicit;
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("innerHTML", ctx_r2.getNestedValue(item_r11, column_r12.key), \u0275\u0275sanitizeHtml);
  }
}
__name(DataTableComponent_For_14_For_3_Case_1_Conditional_2_Template, "DataTableComponent_For_14_For_3_Case_1_Conditional_2_Template");
function DataTableComponent_For_14_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DataTableComponent_For_14_For_3_Case_1_ng_container_0_Template, 1, 0, "ng-container", 23);
    \u0275\u0275conditionalCreate(1, DataTableComponent_For_14_For_3_Case_1_Conditional_1_Template, 2, 1, "span");
    \u0275\u0275conditionalCreate(2, DataTableComponent_For_14_For_3_Case_1_Conditional_2_Template, 1, 1, "span", 24);
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext().$implicit;
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.cellTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(4, _c2, item_r11, column_r12));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.cellTemplate && !column_r12.renderHtml ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.cellTemplate && column_r12.renderHtml ? 2 : -1);
  }
}
__name(DataTableComponent_For_14_For_3_Case_1_Template, "DataTableComponent_For_14_For_3_Case_1_Template");
function DataTableComponent_For_14_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275conditionalCreate(1, DataTableComponent_For_14_For_3_Case_1_Template, 3, 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-center", column_r12.align === "center")("text-end", column_r12.align === "right")("d-none", column_r12.hideOnMobile && ctx_r2.isMobileView())("d-md-table-cell", column_r12.hideOnMobile);
    \u0275\u0275advance();
    \u0275\u0275conditional(1);
  }
}
__name(DataTableComponent_For_14_For_3_Template, "DataTableComponent_For_14_For_3_Template");
function DataTableComponent_For_14_Conditional_4_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const action_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap("fas " + action_r14.icon);
  }
}
__name(DataTableComponent_For_14_Conditional_4_For_3_Conditional_1_Template, "DataTableComponent_For_14_Conditional_4_For_3_Conditional_1_Template");
function DataTableComponent_For_14_Conditional_4_For_3_Conditional_2_Template(rf, ctx) {
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
__name(DataTableComponent_For_14_Conditional_4_For_3_Conditional_2_Template, "DataTableComponent_For_14_Conditional_4_For_3_Conditional_2_Template");
function DataTableComponent_For_14_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_For_14_Conditional_4_For_3_Template_button_click_0_listener($event) {
      const action_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const item_r11 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.onAction(action_r14.key, item_r11);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DataTableComponent_For_14_Conditional_4_For_3_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, DataTableComponent_For_14_Conditional_4_For_3_Conditional_1_Template, 1, 2, "i", 28);
    \u0275\u0275conditionalCreate(2, DataTableComponent_For_14_Conditional_4_For_3_Conditional_2_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r14 = ctx.$implicit;
    \u0275\u0275classMap("btn-outline-" + (action_r14.color || "primary"));
    \u0275\u0275property("title", action_r14.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(action_r14.icon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!action_r14.icon ? 2 : -1);
  }
}
__name(DataTableComponent_For_14_Conditional_4_For_3_Template, "DataTableComponent_For_14_Conditional_4_For_3_Template");
function DataTableComponent_For_14_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 8)(1, "div", 25);
    \u0275\u0275repeaterCreate(2, DataTableComponent_For_14_Conditional_4_For_3_Template, 3, 5, "button", 26, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.getAvailableActions(item_r11));
  }
}
__name(DataTableComponent_For_14_Conditional_4_Template, "DataTableComponent_For_14_Conditional_4_Template");
function DataTableComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275conditionalCreate(1, DataTableComponent_For_14_Conditional_1_Template, 3, 1, "td", 6);
    \u0275\u0275repeaterCreate(2, DataTableComponent_For_14_For_3_Template, 2, 9, "td", 35, _forTrack0);
    \u0275\u0275conditionalCreate(4, DataTableComponent_For_14_Conditional_4_Template, 4, 0, "td", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected-row", ctx_r2.isSelected(item_r11))("inactive-row", !ctx_r2.isActiveItem(item_r11));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.allowSelection ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.getVisibleColumns());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.actions.length > 0 ? 4 : -1);
  }
}
__name(DataTableComponent_For_14_Template, "DataTableComponent_For_14_Template");
function DataTableComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 36);
    \u0275\u0275element(2, "app-empty-state", 12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r2.getTotalColumns());
    \u0275\u0275advance();
    \u0275\u0275property("icon", "fa-inbox")("title", ctx_r2.emptyTitle || "No Data")("message", ctx_r2.emptyMessage || "No data available");
  }
}
__name(DataTableComponent_Conditional_15_Template, "DataTableComponent_Conditional_15_Template");
function DataTableComponent_Conditional_16_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 41);
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
__name(DataTableComponent_Conditional_16_For_8_Template, "DataTableComponent_Conditional_16_For_8_Template");
function DataTableComponent_Conditional_16_For_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_Conditional_16_For_17_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const page_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onPageChange(page_r18));
    }, "DataTableComponent_Conditional_16_For_17_Conditional_1_Template_button_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r18, " ");
  }
}
__name(DataTableComponent_Conditional_16_For_17_Conditional_1_Template, "DataTableComponent_Conditional_16_For_17_Conditional_1_Template");
function DataTableComponent_Conditional_16_For_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "...");
    \u0275\u0275elementEnd();
  }
}
__name(DataTableComponent_Conditional_16_For_17_Conditional_2_Template, "DataTableComponent_Conditional_16_For_17_Conditional_2_Template");
function DataTableComponent_Conditional_16_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 44);
    \u0275\u0275conditionalCreate(1, DataTableComponent_Conditional_16_For_17_Conditional_1_Template, 2, 1, "button", 49);
    \u0275\u0275conditionalCreate(2, DataTableComponent_Conditional_16_For_17_Conditional_2_Template, 2, 0, "span", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r18 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", page_r18 === ctx_r2.getCurrentPage())("disabled", page_r18 === -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(page_r18 !== -1 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(page_r18 === -1 ? 2 : -1);
  }
}
__name(DataTableComponent_Conditional_16_For_17_Template, "DataTableComponent_Conditional_16_For_17_Template");
function DataTableComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 10)(1, "div", 37)(2, "div", 38)(3, "div", 31)(4, "label", 39);
    \u0275\u0275text(5, "Page Size:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "select", 40);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DataTableComponent_Conditional_16_Template_select_change_6_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageSizeChange(+$event.target.value));
    }, "DataTableComponent_Conditional_16_Template_select_change_6_listener"));
    \u0275\u0275repeaterCreate(7, DataTableComponent_Conditional_16_For_8_Template, 2, 2, "option", 41, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 42);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 38)(12, "ul", 43)(13, "li", 44)(14, "button", 45);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_Conditional_16_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageChange(ctx_r2.getCurrentPage() - 1));
    }, "DataTableComponent_Conditional_16_Template_button_click_14_listener"));
    \u0275\u0275element(15, "i", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(16, DataTableComponent_Conditional_16_For_17_Template, 3, 6, "li", 47, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(18, "li", 44)(19, "button", 45);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DataTableComponent_Conditional_16_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageChange(ctx_r2.getCurrentPage() + 1));
    }, "DataTableComponent_Conditional_16_Template_button_click_19_listener"));
    \u0275\u0275element(20, "i", 48);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r2.getPageSizeValue());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.pageSizeOptions);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3(" Showing ", ctx_r2.getDisplayStart(), "-", ctx_r2.getDisplayEnd(), " of ", ctx_r2.getTotalItemsValue(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", ctx_r2.getCurrentPage() === 1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.getCurrentPage() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.getPageNumbers());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r2.getCurrentPage() === ctx_r2.getTotalPagesValue());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.getCurrentPage() === ctx_r2.getTotalPagesValue());
  }
}
__name(DataTableComponent_Conditional_16_Template, "DataTableComponent_Conditional_16_Template");
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
}, "DataTableComponent_ContentQueries"), inputs: { data: "data", columns: "columns", actions: "actions", loading: "loading", allowSelection: "allowSelection", showPagination: "showPagination", emptyMessage: "emptyMessage", emptyTitle: "emptyTitle", responsiveMode: "responsiveMode", cardTemplate: "cardTemplate", searchable: "searchable", sortable: "sortable", exportable: "exportable", paginated: "paginated", currentPage: "currentPage", totalPages: "totalPages", totalItems: "totalItems", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions", sortColumn: "sortColumn", sortDirection: "sortDirection" }, outputs: { actionClick: "actionClick", selectionChange: "selectionChange", sortChange: "sortChange", pageChange: "pageChange", pageSizeChange: "pageSizeChange" }, decls: 17, vars: 12, consts: [[1, "unified-data-table"], [1, "mobile-cards", "d-block", "d-md-none"], [1, "table-container"], [1, "table-responsive"], [1, "table", "table-hover"], [1, "table-light", "sticky-top"], [1, "selection-column"], [3, "width", "sortable", "text-center", "text-end", "d-none", "d-md-table-cell"], [1, "actions-column"], [3, "selected-row", "inactive-row"], [1, "mt-3"], [1, "mobile-card"], [3, "icon", "title", "message"], [1, "mobile-card-selection"], [1, "mobile-card-content"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "default-card-layout"], [1, "mobile-card-actions"], [1, "form-check"], ["type", "checkbox", 1, "form-check-input", 3, "change", "checked"], [1, "mobile-field"], [1, "mobile-label"], [1, "mobile-value"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "innerHTML"], [1, "btn-group", "btn-group-sm"], [1, "btn", 3, "class", "title"], [1, "btn", 3, "click", "title"], [3, "class"], ["type", "checkbox", 1, "form-check-input", 3, "change", "checked", "indeterminate"], [3, "click"], [1, "d-flex", "align-items-center"], [1, "ms-2", "fas", 3, "fa-sort-up", "fa-sort-down"], [1, "ms-2", "fas", "fa-sort", "text-muted"], [1, "ms-2", "fas"], [3, "text-center", "text-end", "d-none", "d-md-table-cell"], [1, "p-0"], [1, "row", "align-items-center"], [1, "col-md-6"], [1, "form-label", "me-2", "mb-0"], [1, "form-select", "form-select-sm", 2, "width", "auto", 3, "change", "value"], [3, "value"], [1, "text-muted", "ms-3"], [1, "pagination", "pagination-sm", "justify-content-end", "mb-0"], [1, "page-item"], [1, "page-link", 3, "click", "disabled"], [1, "fas", "fa-chevron-left"], [1, "page-item", 3, "active", "disabled"], [1, "fas", "fa-chevron-right"], [1, "page-link"], [1, "page-link", 3, "click"]], template: /* @__PURE__ */ __name(function DataTableComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, DataTableComponent_Conditional_1_Template, 1, 0, "app-loading-spinner");
    \u0275\u0275conditionalCreate(2, DataTableComponent_Conditional_2_Template, 4, 1, "div", 1);
    \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "table", 4)(6, "thead", 5)(7, "tr");
    \u0275\u0275conditionalCreate(8, DataTableComponent_Conditional_8_Template, 3, 2, "th", 6);
    \u0275\u0275repeaterCreate(9, DataTableComponent_For_10_Template, 6, 19, "th", 7, _forTrack0);
    \u0275\u0275conditionalCreate(11, DataTableComponent_Conditional_11_Template, 2, 0, "th", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, DataTableComponent_For_14_Template, 5, 6, "tr", 9, ctx.trackByFn, true);
    \u0275\u0275conditionalCreate(15, DataTableComponent_Conditional_15_Template, 3, 4, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(16, DataTableComponent_Conditional_16_Template, 21, 10, "nav", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isLoading() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isLoading() && (ctx.responsiveMode === "cards" || ctx.responsiveMode === "auto") ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("d-none", ctx.isMobileView() && (ctx.responsiveMode === "cards" || ctx.responsiveMode === "auto"))("d-md-block", ctx.responsiveMode === "cards" || ctx.responsiveMode === "auto");
    \u0275\u0275advance();
    \u0275\u0275classProp("overflow-auto", ctx.responsiveMode === "horizontal-scroll");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx.allowSelection ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.getVisibleColumns());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.actions.length > 0 ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx.getDisplayedData());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.data.length === 0 ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showPagination && ctx.getTotalPagesValue() > 1 ? 16 : -1);
  }
}, "DataTableComponent_Template"), dependencies: [CommonModule, NgTemplateOutlet, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, LoadingSpinnerComponent, EmptyStateComponent], styles: ["\n\n.unified-data-table[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.table-container[_ngcontent-%COMP%] {\n  min-height: 400px;\n  overflow: visible;\n}\n.table[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #dee2e6;\n  background-color: #f8f9fa;\n  font-weight: 600;\n  color: #495057;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: all 0.2s ease;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n  cursor: pointer;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected-row[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  border-left: 4px solid #2196f3;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.inactive-row[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.inactive-row[_ngcontent-%COMP%]:hover {\n  background-color: #ffeaa7;\n}\n.selection-column[_ngcontent-%COMP%] {\n  width: 50px;\n  text-align: center;\n}\n.actions-column[_ngcontent-%COMP%] {\n  width: 100px;\n  text-align: center;\n}\n.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s ease;\n}\n.sortable[_ngcontent-%COMP%]:hover {\n  color: #2196f3;\n  background-color: #f0f7ff;\n}\n.sortable[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.6;\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n.sortable[_ngcontent-%COMP%]:hover   .fas[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.btn-outline-danger[_ngcontent-%COMP%]:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-info[_ngcontent-%COMP%]:hover {\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n.btn-outline-warning[_ngcontent-%COMP%]:hover {\n  background-color: #ffc107;\n  border-color: #ffc107;\n  color: #212529;\n}\n.form-check-input[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.form-check-input[_ngcontent-%COMP%]:indeterminate {\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.form-select[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: border-color 0.2s ease;\n}\n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #2196f3;\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.pagination[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.page-link[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border: 1px solid #dee2e6;\n  transition: all 0.2s ease;\n}\n.page-link[_ngcontent-%COMP%]:hover {\n  color: #2196f3;\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n}\n.page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: #2196f3;\n  border-color: #2196f3;\n  color: white;\n}\n.page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #adb5bd;\n  background-color: #fff;\n  border-color: #dee2e6;\n  cursor: not-allowed;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  color: #2196f3;\n  width: 3rem;\n  height: 3rem;\n}\n.text-muted[_ngcontent-%COMP%]   i.fa-3x[_ngcontent-%COMP%] {\n  color: #adb5bd !important;\n  margin-bottom: 1rem;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:focus-within {\n  outline: 2px solid #2196f3;\n  outline-offset: -2px;\n}\n.btn[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.table-responsive[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: visible;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n[dir=rtl][_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected-row[_ngcontent-%COMP%] {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n.mobile-cards[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.mobile-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n  overflow: hidden;\n}\n.mobile-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n  transform: translateY(-2px);\n}\n.mobile-card.selected-row[_ngcontent-%COMP%] {\n  border-color: #2196f3;\n  background-color: #f3f9ff;\n}\n.mobile-card-selection[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem 0;\n  border-bottom: 1px solid #f8f9fa;\n}\n.mobile-card-content[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.default-card-layout[_ngcontent-%COMP%]   .mobile-field[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: start;\n  margin-bottom: 0.5rem;\n  padding: 0.25rem 0;\n  border-bottom: 1px solid #f8f9fa;\n}\n.default-card-layout[_ngcontent-%COMP%]   .mobile-field[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  margin-bottom: 0;\n}\n.mobile-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  flex: 0 0 40%;\n  font-size: 0.875rem;\n}\n.mobile-value[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: right;\n  font-size: 0.875rem;\n  word-break: break-word;\n}\n.mobile-card-actions[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  background-color: #f8f9fa;\n  border-top: 1px solid #dee2e6;\n}\n.mobile-card-actions[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.mobile-card-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: auto;\n}\n.mobile-empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #6c757d;\n}\n.mobile-empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #adb5bd;\n}\n@media (max-width: 768px) {\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.75rem;\n  }\n  .pagination[_ngcontent-%COMP%] {\n    justify-content: center;\n    margin-top: 1rem;\n  }\n  .d-flex.align-items-center[_ngcontent-%COMP%]   span.text-muted[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .table[_ngcontent-%COMP%]   th[data-priority=low][_ngcontent-%COMP%], \n   .table[_ngcontent-%COMP%]   td[data-priority=low][_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n@media (max-width: 576px) {\n  .table-container[_ngcontent-%COMP%] {\n    min-height: 300px;\n  }\n  .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.5rem 0.25rem;\n  }\n  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 0.5rem 0.25rem;\n  }\n  .btn-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    margin-bottom: 2px;\n    border-radius: 4px !important;\n  }\n  .actions-column[_ngcontent-%COMP%] {\n    width: 80px;\n  }\n  .table[_ngcontent-%COMP%]   th[data-priority=medium][_ngcontent-%COMP%], \n   .table[_ngcontent-%COMP%]   td[data-priority=medium][_ngcontent-%COMP%], \n   .table[_ngcontent-%COMP%]   th[data-priority=low][_ngcontent-%COMP%], \n   .table[_ngcontent-%COMP%]   td[data-priority=low][_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .mobile-cards[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .mobile-card[_ngcontent-%COMP%] {\n    margin-bottom: 0.75rem;\n  }\n  .mobile-label[_ngcontent-%COMP%] {\n    flex: 0 0 35%;\n    font-size: 0.8rem;\n  }\n  .mobile-value[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .mobile-card-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.375rem 0.5rem;\n  }\n}\n@media (min-width: 1400px) {\n  .table-container[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1024px) {\n  .table[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.375rem 0.75rem;\n    font-size: 0.8rem;\n  }\n}\n@media print {\n  .actions-column[_ngcontent-%COMP%], \n   .pagination[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .table[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected-row[_ngcontent-%COMP%] {\n    background-color: transparent !important;\n    border-left: none !important;\n  }\n}\n/*# sourceMappingURL=data-table.component.css.map */"] }));
var DataTableComponent = _DataTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableComponent, [{
    type: Component,
    args: [{ selector: "app-data-table", standalone: true, imports: [CommonModule, FormsModule, LoadingSpinnerComponent, EmptyStateComponent], template: `
    <div class="unified-data-table">
      <!-- Loading State -->
      @if (isLoading()) {
        <app-loading-spinner></app-loading-spinner>
      }
    
      <!-- Mobile Card View -->
      @if (!isLoading() && (responsiveMode === 'cards' || responsiveMode === 'auto')) {
        <div class="mobile-cards d-block d-md-none">
          @for (item of getDisplayedData(); track trackByFn($index, item)) {
            <div class="mobile-card">
              <!-- Selection -->
              @if (allowSelection) {
                <div class="mobile-card-selection">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      [checked]="isSelected(item)"
                      (change)="toggleSelection(item, $event)"
                      />
                  </div>
                </div>
              }
              <!-- Card Content -->
              <div class="mobile-card-content">
                <!-- Custom template if provided -->
                @if (cardTemplate) {
                  <ng-container
                    [ngTemplateOutlet]="cardTemplate"
                    [ngTemplateOutletContext]="{ $implicit: item, actions: getAvailableActions(item) }">
                  </ng-container>
                }
                <!-- Default card layout -->
                @if (!cardTemplate) {
                  <div class="default-card-layout">
                    @for (column of getVisibleColumns(); track column.key) {
                      <div class="mobile-field">
                        <span class="mobile-label">{{ column.mobileLabel || column.label }}:</span>
                        <span class="mobile-value">
                          <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column }">
                          </ng-container>
                          @if (!cellTemplate && !column.renderHtml) {
                            <span>{{ getNestedValue(item, column.key) }}</span>
                          }
                          @if (!cellTemplate && column.renderHtml) {
                            <span [innerHTML]="getNestedValue(item, column.key)"></span>
                          }
                        </span>
                      </div>
                    }
                  </div>
                }
              </div>
              <!-- Actions -->
              @if (actions.length > 0) {
                <div class="mobile-card-actions">
                  <div class="btn-group btn-group-sm">
                    @for (action of getAvailableActions(item); track action.key) {
                      <button
                        class="btn"
                        [class]="'btn-outline-' + (action.color || 'primary')"
                        [title]="action.label"
                        (click)="onAction(action.key, item)">
                        @if (action.icon) {
                          <i [class]="'fas ' + action.icon"></i>
                        }
                        @if (!action.icon) {
                          <span>{{ action.label }}</span>
                        }
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          }
          <!-- Empty state for mobile -->
          @if (data.length === 0) {
            <app-empty-state
              [icon]="'fa-inbox'"
              [title]="emptyTitle || 'No Data'"
              [message]="emptyMessage || 'No data available'">
            </app-empty-state>
          }
        </div>
      }
    
      <!-- Desktop Table View -->
      <div class="table-container" [class.d-none]="isMobileView() && (responsiveMode === 'cards' || responsiveMode === 'auto')" [class.d-md-block]="responsiveMode === 'cards' || responsiveMode === 'auto'">
        <div class="table-responsive" [class.overflow-auto]="responsiveMode === 'horizontal-scroll'">
          <table class="table table-hover">
            <thead class="table-light sticky-top">
              <tr>
                <!-- Selection column -->
                @if (allowSelection) {
                  <th class="selection-column">
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
                }
    
                <!-- Data columns -->
                @for (column of getVisibleColumns(); track column.key) {
                  <th
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
                      @if (column.sortable && getSortColumn() === column.key) {
                        <i
                          class="ms-2 fas"
                          [class.fa-sort-up]="getSortDirection() === 'asc'"
                        [class.fa-sort-down]="getSortDirection() === 'desc'"></i>
                      }
                      @if (column.sortable && getSortColumn() !== column.key) {
                        <i
                        class="ms-2 fas fa-sort text-muted"></i>
                      }
                    </div>
                  </th>
                }
    
                <!-- Actions column -->
                @if (actions.length > 0) {
                  <th class="actions-column">Actions</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (item of getDisplayedData(); track trackByFn($index, item)) {
                <tr
                  [class.selected-row]="isSelected(item)"
                  [class.inactive-row]="!isActiveItem(item)">
                  <!-- Selection cell -->
                  @if (allowSelection) {
                    <td class="selection-column">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          [checked]="isSelected(item)"
                          (change)="toggleSelection(item, $event); $event.stopPropagation()"
                          />
                      </div>
                    </td>
                  }
                  <!-- Data cells -->
                  @for (column of getVisibleColumns(); track column.key) {
                    <td
                      [class.text-center]="column.align === 'center'"
                      [class.text-end]="column.align === 'right'"
                      [class.d-none]="column.hideOnMobile && isMobileView()"
                      [class.d-md-table-cell]="column.hideOnMobile">
                      @switch (column.key) {
                        @default {
                          <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column }">
                          </ng-container>
                          @if (!cellTemplate && !column.renderHtml) {
                            <span>{{ getNestedValue(item, column.key) }}</span>
                          }
                          @if (!cellTemplate && column.renderHtml) {
                            <span [innerHTML]="getNestedValue(item, column.key)"></span>
                          }
                        }
                      }
                    </td>
                  }
                  <!-- Actions cell -->
                  @if (actions.length > 0) {
                    <td class="actions-column">
                      <div class="btn-group btn-group-sm">
                        @for (action of getAvailableActions(item); track action.key) {
                          <button
                            class="btn"
                            [class]="'btn-outline-' + (action.color || 'primary')"
                            [title]="action.label"
                            (click)="onAction(action.key, item); $event.stopPropagation()">
                            @if (action.icon) {
                              <i [class]="'fas ' + action.icon"></i>
                            }
                            @if (!action.icon) {
                              <span>{{ action.label }}</span>
                            }
                          </button>
                        }
                      </div>
                    </td>
                  }
                </tr>
              }
    
              <!-- Empty state -->
              @if (data.length === 0) {
                <tr>
                  <td [attr.colspan]="getTotalColumns()" class="p-0">
                    <app-empty-state
                      [icon]="'fa-inbox'"
                      [title]="emptyTitle || 'No Data'"
                      [message]="emptyMessage || 'No data available'">
                    </app-empty-state>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
    
        <!-- Enhanced Pagination -->
        @if (showPagination && getTotalPagesValue() > 1) {
          <nav class="mt-3">
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
                    @for (size of pageSizeOptions; track size) {
                      <option [value]="size">{{ size }}</option>
                    }
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
                  @for (page of getPageNumbers(); track page) {
                    <li
                      class="page-item"
                      [class.active]="page === getCurrentPage()"
                      [class.disabled]="page === -1">
                      @if (page !== -1) {
                        <button
                          class="page-link"
                          (click)="onPageChange(page)"
                          >
                          {{ page }}
                        </button>
                      }
                      @if (page === -1) {
                        <span class="page-link">...</span>
                      }
                    </li>
                  }
                  <li class="page-item" [class.disabled]="getCurrentPage() === getTotalPagesValue()">
                    <button class="page-link" (click)="onPageChange(getCurrentPage() + 1)" [disabled]="getCurrentPage() === getTotalPagesValue()">
                      <i class="fas fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        }
      </div>
    </div>
    `, styles: ["/* angular:styles/component:css;66c288f92461acaa05c89274763acad77c117273c58fc1ef4202777532979212;D:/Work/TimeAttendanceSystem/time-attendance-frontend/src/app/shared/components/data-table/data-table.component.ts */\n.unified-data-table {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.table-container {\n  min-height: 400px;\n  overflow: visible;\n}\n.table {\n  margin-bottom: 0;\n}\n.table thead th {\n  border-bottom: 2px solid #dee2e6;\n  background-color: #f8f9fa;\n  font-weight: 600;\n  color: #495057;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.table tbody tr {\n  transition: all 0.2s ease;\n  animation: fadeIn 0.3s ease-out;\n}\n.table tbody tr:hover {\n  background-color: #f8f9fa;\n  cursor: pointer;\n}\n.table tbody tr.selected-row {\n  background-color: #e3f2fd;\n  border-left: 4px solid #2196f3;\n}\n.table tbody tr.inactive-row {\n  background-color: #fff3cd;\n}\n.table tbody tr.inactive-row:hover {\n  background-color: #ffeaa7;\n}\n.selection-column {\n  width: 50px;\n  text-align: center;\n}\n.actions-column {\n  width: 100px;\n  text-align: center;\n}\n.sortable {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s ease;\n}\n.sortable:hover {\n  color: #2196f3;\n  background-color: #f0f7ff;\n}\n.sortable .fas {\n  font-size: 0.75rem;\n  opacity: 0.6;\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n.sortable:hover .fas {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.btn-group .btn {\n  border: none;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n}\n.btn-group .btn:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.btn-outline-primary:hover {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.btn-outline-danger:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-outline-secondary:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-info:hover {\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n.btn-outline-warning:hover {\n  background-color: #ffc107;\n  border-color: #ffc107;\n  color: #212529;\n}\n.form-check-input {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.form-check-input:checked {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.form-check-input:indeterminate {\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.form-select {\n  cursor: pointer;\n  transition: border-color 0.2s ease;\n}\n.form-select:focus {\n  border-color: #2196f3;\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.pagination {\n  margin-bottom: 0;\n}\n.page-link {\n  color: #6c757d;\n  border: 1px solid #dee2e6;\n  transition: all 0.2s ease;\n}\n.page-link:hover {\n  color: #2196f3;\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n}\n.page-item.active .page-link {\n  background-color: #2196f3;\n  border-color: #2196f3;\n  color: white;\n}\n.page-item.disabled .page-link {\n  color: #adb5bd;\n  background-color: #fff;\n  border-color: #dee2e6;\n  cursor: not-allowed;\n}\n.spinner-border {\n  color: #2196f3;\n  width: 3rem;\n  height: 3rem;\n}\n.text-muted i.fa-3x {\n  color: #adb5bd !important;\n  margin-bottom: 1rem;\n}\n.table tbody tr:focus-within {\n  outline: 2px solid #2196f3;\n  outline-offset: -2px;\n}\n.btn:focus {\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.table-responsive {\n  border-radius: 8px;\n  overflow: visible;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n[dir=rtl] .table tbody tr.selected-row {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n.mobile-cards {\n  padding: 1rem;\n}\n.mobile-card {\n  background: white;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n  overflow: hidden;\n}\n.mobile-card:hover {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n  transform: translateY(-2px);\n}\n.mobile-card.selected-row {\n  border-color: #2196f3;\n  background-color: #f3f9ff;\n}\n.mobile-card-selection {\n  padding: 0.75rem 1rem 0;\n  border-bottom: 1px solid #f8f9fa;\n}\n.mobile-card-content {\n  padding: 1rem;\n}\n.default-card-layout .mobile-field {\n  display: flex;\n  justify-content: space-between;\n  align-items: start;\n  margin-bottom: 0.5rem;\n  padding: 0.25rem 0;\n  border-bottom: 1px solid #f8f9fa;\n}\n.default-card-layout .mobile-field:last-child {\n  border-bottom: none;\n  margin-bottom: 0;\n}\n.mobile-label {\n  font-weight: 600;\n  color: #495057;\n  flex: 0 0 40%;\n  font-size: 0.875rem;\n}\n.mobile-value {\n  flex: 1;\n  text-align: right;\n  font-size: 0.875rem;\n  word-break: break-word;\n}\n.mobile-card-actions {\n  padding: 0.75rem 1rem;\n  background-color: #f8f9fa;\n  border-top: 1px solid #dee2e6;\n}\n.mobile-card-actions .btn-group {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.mobile-card-actions .btn {\n  flex: 1;\n  min-width: auto;\n}\n.mobile-empty-state {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #6c757d;\n}\n.mobile-empty-state i {\n  color: #adb5bd;\n}\n@media (max-width: 768px) {\n  .table-responsive {\n    font-size: 0.875rem;\n  }\n  .btn-group .btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.75rem;\n  }\n  .pagination {\n    justify-content: center;\n    margin-top: 1rem;\n  }\n  .d-flex.align-items-center span.text-muted {\n    display: none;\n  }\n  .table th[data-priority=low],\n  .table td[data-priority=low] {\n    display: none !important;\n  }\n}\n@media (max-width: 576px) {\n  .table-container {\n    min-height: 300px;\n  }\n  .table thead th {\n    font-size: 0.75rem;\n    padding: 0.5rem 0.25rem;\n  }\n  .table tbody td {\n    padding: 0.5rem 0.25rem;\n  }\n  .btn-group {\n    flex-direction: column;\n  }\n  .btn-group .btn {\n    margin-bottom: 2px;\n    border-radius: 4px !important;\n  }\n  .actions-column {\n    width: 80px;\n  }\n  .table th[data-priority=medium],\n  .table td[data-priority=medium],\n  .table th[data-priority=low],\n  .table td[data-priority=low] {\n    display: none !important;\n  }\n  .mobile-cards {\n    padding: 0.5rem;\n  }\n  .mobile-card {\n    margin-bottom: 0.75rem;\n  }\n  .mobile-label {\n    flex: 0 0 35%;\n    font-size: 0.8rem;\n  }\n  .mobile-value {\n    font-size: 0.8rem;\n  }\n  .mobile-card-actions .btn {\n    font-size: 0.75rem;\n    padding: 0.375rem 0.5rem;\n  }\n}\n@media (min-width: 1400px) {\n  .table-container {\n    font-size: 0.95rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1024px) {\n  .table {\n    font-size: 0.9rem;\n  }\n  .btn-group .btn {\n    padding: 0.375rem 0.75rem;\n    font-size: 0.8rem;\n  }\n}\n@media print {\n  .actions-column,\n  .pagination {\n    display: none !important;\n  }\n  .table {\n    font-size: 0.8rem;\n  }\n  .table tbody tr.selected-row {\n    background-color: transparent !important;\n    border-left: none !important;\n  }\n}\n/*# sourceMappingURL=data-table.component.css.map */\n"] }]
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DataTableComponent, { className: "DataTableComponent", filePath: "src/app/shared/components/data-table/data-table.component.ts", lineNumber: 761 });
})();

export {
  DataTableComponent
};
//# sourceMappingURL=chunk-JW5UYWPK.js.map
