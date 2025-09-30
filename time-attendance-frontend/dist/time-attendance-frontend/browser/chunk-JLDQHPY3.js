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
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnextContext,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/components/stat-card/stat-card.component.ts
function StatCardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.prefix);
  }
}
__name(StatCardComponent_Conditional_7_Template, "StatCardComponent_Conditional_7_Template");
function StatCardComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.suffix);
  }
}
__name(StatCardComponent_Conditional_9_Template, "StatCardComponent_Conditional_9_Template");
function StatCardComponent_Conditional_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.change.period);
  }
}
__name(StatCardComponent_Conditional_10_Conditional_3_Template, "StatCardComponent_Conditional_10_Conditional_3_Template");
function StatCardComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 13);
    \u0275\u0275domElement(1, "i", 14);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, StatCardComponent_Conditional_10_Conditional_3_Template, 2, 1, "span", 15);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.getChangeClasses());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getChangeIcon());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatChange(ctx_r0.change), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.change.period ? 3 : -1);
  }
}
__name(StatCardComponent_Conditional_10_Template, "StatCardComponent_Conditional_10_Template");
function StatCardComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
__name(StatCardComponent_Conditional_11_Template, "StatCardComponent_Conditional_11_Template");
function StatCardComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 10)(1, "div");
    \u0275\u0275domElement(2, "i");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap("icon-circle " + ctx_r0.getIconCircleClasses());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.icon + " " + ctx_r0.getIconClasses());
  }
}
__name(StatCardComponent_Conditional_12_Template, "StatCardComponent_Conditional_12_Template");
function StatCardComponent_Conditional_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small", 18);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.progressLabel);
  }
}
__name(StatCardComponent_Conditional_13_Conditional_3_Template, "StatCardComponent_Conditional_13_Conditional_3_Template");
function StatCardComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 11)(1, "div", 16);
    \u0275\u0275domElement(2, "div", 17);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(3, StatCardComponent_Conditional_13_Conditional_3_Template, 2, 1, "small", 18);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classMap("app-progress-fill-" + (ctx_r0.variant || "primary"));
    \u0275\u0275styleProp("width", ctx_r0.progressValue, "%");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.progressLabel ? 3 : -1);
  }
}
__name(StatCardComponent_Conditional_13_Template, "StatCardComponent_Conditional_13_Template");
function StatCardComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 12)(1, "div", 19)(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(4, "i", 20);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.clickableText || "View details");
  }
}
__name(StatCardComponent_Conditional_14_Template, "StatCardComponent_Conditional_14_Template");
var _StatCardComponent = class _StatCardComponent {
  label;
  value;
  prefix;
  suffix;
  subtitle;
  icon;
  variant = "primary";
  size = "md";
  change;
  showProgress = false;
  progressValue;
  progressLabel;
  clickable = false;
  clickableText;
  loading = false;
  borderAccent = false;
  formatAsNumber = true;
  getCardClasses() {
    const classes = ["h-100"];
    if (this.borderAccent) {
      classes.push(`border-start border-${this.variant} border-4`);
    }
    if (this.clickable) {
      classes.push("app-clickable app-hover-lift");
    }
    return classes.join(" ");
  }
  getNumberClasses() {
    const classes = [];
    if (this.size === "sm") {
      classes.push("fs-4");
    } else if (this.size === "lg") {
      classes.push("fs-1");
    }
    return classes.join(" ");
  }
  getIconCircleClasses() {
    return `bg-${this.variant} bg-opacity-10`;
  }
  getIconClasses() {
    return `text-${this.variant}`;
  }
  getChangeClasses() {
    if (!this.change)
      return "";
    switch (this.change.type) {
      case "increase":
        return "app-stat-change-positive";
      case "decrease":
        return "app-stat-change-negative";
      default:
        return "app-stat-change-neutral";
    }
  }
  getChangeIcon() {
    if (!this.change)
      return "";
    switch (this.change.type) {
      case "increase":
        return "fas fa-arrow-up";
      case "decrease":
        return "fas fa-arrow-down";
      default:
        return "fas fa-minus";
    }
  }
  formatValue(value) {
    if (typeof value === "string")
      return value;
    if (!this.formatAsNumber)
      return value.toString();
    if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + "M";
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + "K";
    }
    return value.toLocaleString();
  }
  formatChange(change) {
    const sign = change.type === "increase" ? "+" : change.type === "decrease" ? "-" : "";
    const formattedValue = change.isPercentage ? `${Math.abs(change.value)}%` : Math.abs(change.value).toLocaleString();
    return `${sign}${formattedValue}`;
  }
};
__name(_StatCardComponent, "StatCardComponent");
__publicField(_StatCardComponent, "\u0275fac", /* @__PURE__ */ __name(function StatCardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StatCardComponent)();
}, "StatCardComponent_Factory"));
__publicField(_StatCardComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StatCardComponent, selectors: [["app-stat-card"]], inputs: { label: "label", value: "value", prefix: "prefix", suffix: "suffix", subtitle: "subtitle", icon: "icon", variant: "variant", size: "size", change: "change", showProgress: "showProgress", progressValue: "progressValue", progressLabel: "progressLabel", clickable: "clickable", clickableText: "clickableText", loading: "loading", borderAccent: "borderAccent", formatAsNumber: "formatAsNumber" }, decls: 15, vars: 13, consts: [[1, "app-stat-card", "card"], [1, "card-body"], [1, "d-flex", "justify-content-between", "align-items-start"], [1, "app-stat-content"], [1, "app-stat-label"], [1, "app-stat-number"], [1, "app-stat-prefix"], [1, "app-stat-suffix"], [1, "app-stat-change", 3, "class"], [1, "app-stat-subtitle", "text-muted"], [1, "app-stat-icon"], [1, "app-stat-progress", "mt-3"], [1, "card-footer", "bg-transparent", "border-0", "pt-0"], [1, "app-stat-change"], [1, "me-1"], [1, "ms-1", "text-muted"], [1, "app-progress-bar"], [1, "app-progress-fill"], [1, "text-muted", "mt-1", "d-block"], [1, "d-flex", "align-items-center", "text-muted"], [1, "fas", "fa-arrow-right", "ms-auto"]], template: /* @__PURE__ */ __name(function StatCardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "div", 5);
    \u0275\u0275conditionalCreate(7, StatCardComponent_Conditional_7_Template, 2, 1, "span", 6);
    \u0275\u0275text(8);
    \u0275\u0275conditionalCreate(9, StatCardComponent_Conditional_9_Template, 2, 1, "span", 7);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(10, StatCardComponent_Conditional_10_Template, 4, 6, "div", 8);
    \u0275\u0275conditionalCreate(11, StatCardComponent_Conditional_11_Template, 2, 1, "div", 9);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(12, StatCardComponent_Conditional_12_Template, 3, 4, "div", 10);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(13, StatCardComponent_Conditional_13_Template, 4, 5, "div", 11);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(14, StatCardComponent_Conditional_14_Template, 5, 1, "div", 12);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.getCardClasses());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.label);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx.getNumberClasses());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.prefix ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.formatValue(ctx.value), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.suffix ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.change ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.subtitle ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.icon ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showProgress && ctx.progressValue !== void 0 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.clickable ? 14 : -1);
  }
}, "StatCardComponent_Template"), dependencies: [CommonModule], encapsulation: 2 }));
var StatCardComponent = _StatCardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StatCardComponent, [{
    type: Component,
    args: [{
      selector: "app-stat-card",
      standalone: true,
      imports: [CommonModule],
      template: `
    <div class="app-stat-card card" [class]="getCardClasses()">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div class="app-stat-content">
            <div class="app-stat-label">{{ label }}</div>
            <div class="app-stat-number" [class]="getNumberClasses()">
              @if (prefix) {
                <span class="app-stat-prefix">{{ prefix }}</span>
              }
              {{ formatValue(value) }}
              @if (suffix) {
                <span class="app-stat-suffix">{{ suffix }}</span>
              }
            </div>
            @if (change) {
              <div class="app-stat-change" [class]="getChangeClasses()">
                <i [class]="getChangeIcon()" class="me-1"></i>
                {{ formatChange(change) }}
                @if (change.period) {
                  <span class="ms-1 text-muted">{{ change.period }}</span>
                }
              </div>
            }
            @if (subtitle) {
              <div class="app-stat-subtitle text-muted">{{ subtitle }}</div>
            }
          </div>

          @if (icon) {
            <div class="app-stat-icon">
              <div [class]="'icon-circle ' + getIconCircleClasses()">
                <i [class]="icon + ' ' + getIconClasses()"></i>
              </div>
            </div>
          }
        </div>

        @if (showProgress && progressValue !== undefined) {
          <div class="app-stat-progress mt-3">
            <div class="app-progress-bar">
              <div class="app-progress-fill"
                   [class]="'app-progress-fill-' + (variant || 'primary')"
                   [style.width.%]="progressValue">
              </div>
            </div>
            @if (progressLabel) {
              <small class="text-muted mt-1 d-block">{{ progressLabel }}</small>
            }
          </div>
        }
      </div>

      @if (clickable) {
        <div class="card-footer bg-transparent border-0 pt-0">
          <div class="d-flex align-items-center text-muted">
            <small>{{ clickableText || 'View details' }}</small>
            <i class="fas fa-arrow-right ms-auto"></i>
          </div>
        </div>
      }
    </div>
  `
    }]
  }], null, { label: [{
    type: Input
  }], value: [{
    type: Input
  }], prefix: [{
    type: Input
  }], suffix: [{
    type: Input
  }], subtitle: [{
    type: Input
  }], icon: [{
    type: Input
  }], variant: [{
    type: Input
  }], size: [{
    type: Input
  }], change: [{
    type: Input
  }], showProgress: [{
    type: Input
  }], progressValue: [{
    type: Input
  }], progressLabel: [{
    type: Input
  }], clickable: [{
    type: Input
  }], clickableText: [{
    type: Input
  }], loading: [{
    type: Input
  }], borderAccent: [{
    type: Input
  }], formatAsNumber: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StatCardComponent, { className: "StatCardComponent", filePath: "src/app/shared/components/stat-card/stat-card.component.ts", lineNumber: 79 });
})();

export {
  StatCardComponent
};
//# sourceMappingURL=chunk-JLDQHPY3.js.map
