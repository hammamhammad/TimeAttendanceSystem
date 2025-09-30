import {
  StatCardComponent
} from "./chunk-JLDQHPY3.js";
import {
  CommonModule,
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵtext
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/components/stats-grid/stats-grid.component.ts
var _c0 = ["*"];
function StatsGridComponent_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 2)(2, "div", 3)(3, "div", 4);
    \u0275\u0275element(4, "div", 5)(5, "div", 6)(6, "div", 7);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.getColumnClasses());
  }
}
__name(StatsGridComponent_Conditional_1_For_1_Template, "StatsGridComponent_Conditional_1_For_1_Template");
function StatsGridComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, StatsGridComponent_Conditional_1_For_1_Template, 7, 2, "div", 1, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.getSkeletonItems());
  }
}
__name(StatsGridComponent_Conditional_1_Template, "StatsGridComponent_Conditional_1_Template");
function StatsGridComponent_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "app-stat-card", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stat_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.getColumnClasses());
    \u0275\u0275advance();
    \u0275\u0275property("label", stat_r2.label)("value", stat_r2.value)("icon", stat_r2.icon)("variant", stat_r2.variant || "primary")("prefix", stat_r2.prefix)("suffix", stat_r2.suffix)("subtitle", stat_r2.subtitle)("change", stat_r2.change)("size", ctx_r0.cardSize)("borderAccent", stat_r2.borderAccent ?? true)("clickable", stat_r2.clickable ?? false)("clickableText", stat_r2.clickableText);
  }
}
__name(StatsGridComponent_Conditional_2_For_1_Template, "StatsGridComponent_Conditional_2_For_1_Template");
function StatsGridComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, StatsGridComponent_Conditional_2_For_1_Template, 2, 14, "div", 1, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.stats);
  }
}
__name(StatsGridComponent_Conditional_2_Template, "StatsGridComponent_Conditional_2_Template");
function StatsGridComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 9);
    \u0275\u0275element(2, "i", 10);
    \u0275\u0275elementStart(3, "p", 11);
    \u0275\u0275text(4, "No statistics available");
    \u0275\u0275elementEnd()()();
  }
}
__name(StatsGridComponent_Conditional_3_Template, "StatsGridComponent_Conditional_3_Template");
var _StatsGridComponent = class _StatsGridComponent {
  stats = [];
  columns = 4;
  loading = false;
  gap = "md";
  cardSize = "md";
  getGridClasses() {
    const classes = ["stats-grid", "row"];
    switch (this.gap) {
      case "sm":
        classes.push("g-2");
        break;
      case "lg":
        classes.push("g-4");
        break;
      default:
        classes.push("g-3");
    }
    return classes.join(" ");
  }
  getColumnClasses() {
    const classes = ["stats-grid-item"];
    switch (this.columns) {
      case 2:
        classes.push("col-md-6");
        break;
      case 3:
        classes.push("col-md-4");
        break;
      case 4:
        classes.push("col-md-6", "col-lg-3");
        break;
    }
    return classes.join(" ");
  }
  getSkeletonItems() {
    return Array(this.columns).fill(0);
  }
};
__name(_StatsGridComponent, "StatsGridComponent");
__publicField(_StatsGridComponent, "\u0275fac", /* @__PURE__ */ __name(function StatsGridComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StatsGridComponent)();
}, "StatsGridComponent_Factory"));
__publicField(_StatsGridComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StatsGridComponent, selectors: [["app-stats-grid"]], inputs: { stats: "stats", columns: "columns", loading: "loading", gap: "gap", cardSize: "cardSize" }, ngContentSelectors: _c0, decls: 5, vars: 3, consts: [[1, "col-12"], [3, "class"], [1, "card", "h-100"], [1, "card-body"], [1, "skeleton-loader"], [1, "skeleton-line", "skeleton-title"], [1, "skeleton-line", "skeleton-value"], [1, "skeleton-line", "skeleton-subtitle"], [3, "label", "value", "icon", "variant", "prefix", "suffix", "subtitle", "change", "size", "borderAccent", "clickable", "clickableText"], [1, "text-center", "py-4", "text-muted"], [1, "fa-solid", "fa-chart-simple", "fa-2x", "mb-2"], [1, "mb-0"]], template: /* @__PURE__ */ __name(function StatsGridComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef();
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, StatsGridComponent_Conditional_1_Template, 2, 0)(2, StatsGridComponent_Conditional_2_Template, 2, 0)(3, StatsGridComponent_Conditional_3_Template, 5, 0, "div", 0);
    \u0275\u0275projection(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.getGridClasses());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading ? 1 : ctx.stats.length > 0 ? 2 : 3);
  }
}, "StatsGridComponent_Template"), dependencies: [CommonModule, StatCardComponent], styles: ["\n\n.stats-grid[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.stats-grid-item[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.skeleton-loader[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulse 1.5s ease-in-out infinite;\n}\n.skeleton-line[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #f0f0f0 25%,\n      #e0e0e0 50%,\n      #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n  border-radius: 4px;\n  margin-bottom: 0.75rem;\n}\n.skeleton-title[_ngcontent-%COMP%] {\n  height: 14px;\n  width: 60%;\n}\n.skeleton-value[_ngcontent-%COMP%] {\n  height: 32px;\n  width: 40%;\n}\n.skeleton-subtitle[_ngcontent-%COMP%] {\n  height: 12px;\n  width: 50%;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.8;\n  }\n}\n/*# sourceMappingURL=stats-grid.component.css.map */"] }));
var StatsGridComponent = _StatsGridComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StatsGridComponent, [{
    type: Component,
    args: [{ selector: "app-stats-grid", standalone: true, imports: [CommonModule, StatCardComponent], template: `<div [class]="getGridClasses()">\r
  @if (loading) {\r
    <!-- Loading Skeletons -->\r
    @for (item of getSkeletonItems(); track $index) {\r
      <div [class]="getColumnClasses()">\r
        <div class="card h-100">\r
          <div class="card-body">\r
            <div class="skeleton-loader">\r
              <div class="skeleton-line skeleton-title"></div>\r
              <div class="skeleton-line skeleton-value"></div>\r
              <div class="skeleton-line skeleton-subtitle"></div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  } @else if (stats.length > 0) {\r
    <!-- Stat Cards -->\r
    @for (stat of stats; track $index) {\r
      <div [class]="getColumnClasses()">\r
        <app-stat-card\r
          [label]="stat.label"\r
          [value]="stat.value"\r
          [icon]="stat.icon"\r
          [variant]="stat.variant || 'primary'"\r
          [prefix]="stat.prefix"\r
          [suffix]="stat.suffix"\r
          [subtitle]="stat.subtitle"\r
          [change]="stat.change"\r
          [size]="cardSize"\r
          [borderAccent]="stat.borderAccent ?? true"\r
          [clickable]="stat.clickable ?? false"\r
          [clickableText]="stat.clickableText">\r
        </app-stat-card>\r
      </div>\r
    }\r
  } @else {\r
    <!-- Empty State -->\r
    <div class="col-12">\r
      <div class="text-center py-4 text-muted">\r
        <i class="fa-solid fa-chart-simple fa-2x mb-2"></i>\r
        <p class="mb-0">No statistics available</p>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Custom content slot -->\r
  <ng-content></ng-content>\r
</div>`, styles: ["/* src/app/shared/components/stats-grid/stats-grid.component.css */\n.stats-grid {\n  margin-bottom: 1.5rem;\n}\n.stats-grid-item {\n  margin-bottom: 0;\n}\n.skeleton-loader {\n  animation: pulse 1.5s ease-in-out infinite;\n}\n.skeleton-line {\n  background:\n    linear-gradient(\n      90deg,\n      #f0f0f0 25%,\n      #e0e0e0 50%,\n      #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n  border-radius: 4px;\n  margin-bottom: 0.75rem;\n}\n.skeleton-title {\n  height: 14px;\n  width: 60%;\n}\n.skeleton-value {\n  height: 32px;\n  width: 40%;\n}\n.skeleton-subtitle {\n  height: 12px;\n  width: 50%;\n}\n@keyframes shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.8;\n  }\n}\n/*# sourceMappingURL=stats-grid.component.css.map */\n"] }]
  }], null, { stats: [{
    type: Input
  }], columns: [{
    type: Input
  }], loading: [{
    type: Input
  }], gap: [{
    type: Input
  }], cardSize: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StatsGridComponent, { className: "StatsGridComponent", filePath: "src/app/shared/components/stats-grid/stats-grid.component.ts", lineNumber: 31 });
})();

export {
  StatsGridComponent
};
//# sourceMappingURL=chunk-TZ2SODGW.js.map
