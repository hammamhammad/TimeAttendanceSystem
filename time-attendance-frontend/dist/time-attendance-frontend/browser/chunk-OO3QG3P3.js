import {
  EmptyStateComponent
} from "./chunk-A4RQO434.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  Output,
  RouterLink,
  RouterModule,
  ViewChild,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-54H4HALB.js";
import {
  __async,
  __name,
  __publicField,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/attendance/shared/attendance-chart/attendance-chart.component.ts
var _c0 = ["chartCanvas"];
function AttendanceChartComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "h5", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
__name(AttendanceChartComponent_Conditional_1_Template, "AttendanceChartComponent_Conditional_1_Template");
function AttendanceChartComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 7)(2, "span", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("app.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.chart.loading"));
  }
}
__name(AttendanceChartComponent_Conditional_2_Template, "AttendanceChartComponent_Conditional_2_Template");
function AttendanceChartComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "canvas", 11, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("height", ctx_r0.height, "px")("width", ctx_r0.width, "px");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r0.title || "Attendance Chart");
  }
}
__name(AttendanceChartComponent_Conditional_3_Template, "AttendanceChartComponent_Conditional_3_Template");
function AttendanceChartComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("icon", "fa-solid fa-chart-bar")("message", ctx_r0.i18nService.t("attendance.chart.no_data"))("size", "md");
  }
}
__name(AttendanceChartComponent_Conditional_4_Template, "AttendanceChartComponent_Conditional_4_Template");
var _AttendanceChartComponent = class _AttendanceChartComponent {
  i18nService;
  chartCanvas;
  type = "bar";
  data;
  options = {};
  height = 400;
  width;
  title;
  loading = false;
  chart;
  chartInstance;
  constructor(i18nService) {
    this.i18nService = i18nService;
  }
  ngOnInit() {
    this.loadChartJS();
  }
  ngAfterViewInit() {
    if (this.chart && this.data) {
      this.createChart();
    }
  }
  ngOnChanges(changes) {
    if (changes["data"] && this.chart && this.chartCanvas) {
      this.updateChart();
    }
  }
  loadChartJS() {
    return __async(this, null, function* () {
      try {
        const { Chart, registerables } = yield import("./chunk-QVEZ5FIH.js");
        Chart.register(...registerables);
        this.chart = Chart;
        if (this.chartCanvas && this.data) {
          this.createChart();
        }
      } catch (error) {
        console.error("Failed to load Chart.js:", error);
      }
    });
  }
  createChart() {
    if (!this.chart || !this.chartCanvas || !this.data) {
      console.log("\u{1F534} Chart creation skipped:", { chart: !!this.chart, canvas: !!this.chartCanvas, data: !!this.data });
      return;
    }
    const ctx = this.chartCanvas.nativeElement.getContext("2d");
    if (!ctx) {
      console.log("\u{1F534} No canvas context");
      return;
    }
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top"
        },
        tooltip: {
          enabled: true
        }
      },
      scales: this.type === "pie" || this.type === "doughnut" ? void 0 : {
        x: {
          display: true
        },
        y: {
          display: true,
          beginAtZero: true
        }
      }
    };
    const mergedOptions = __spreadValues(__spreadValues({}, defaultOptions), this.options);
    console.log("\u{1F4C8} Creating chart:", { type: this.type, data: this.data, options: mergedOptions });
    this.chartInstance = new this.chart(ctx, {
      type: this.type,
      data: this.data,
      options: mergedOptions
    });
    console.log("\u2705 Chart created successfully");
  }
  updateChart() {
    if (this.chartInstance && this.data) {
      this.chartInstance.data = this.data;
      this.chartInstance.update();
    } else if (this.chart && this.data) {
      this.createChart();
    }
  }
  hasData() {
    return !!(this.data && this.data.datasets && this.data.datasets.length > 0 && this.data.labels && this.data.labels.length > 0);
  }
  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
};
__name(_AttendanceChartComponent, "AttendanceChartComponent");
__publicField(_AttendanceChartComponent, "\u0275fac", /* @__PURE__ */ __name(function AttendanceChartComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AttendanceChartComponent)(\u0275\u0275directiveInject(I18nService));
}, "AttendanceChartComponent_Factory"));
__publicField(_AttendanceChartComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttendanceChartComponent, selectors: [["app-attendance-chart"]], viewQuery: /* @__PURE__ */ __name(function AttendanceChartComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c0, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chartCanvas = _t.first);
  }
}, "AttendanceChartComponent_Query"), inputs: { type: "type", data: "data", options: "options", height: "height", width: "width", title: "title", loading: "loading" }, features: [\u0275\u0275NgOnChangesFeature], decls: 5, vars: 4, consts: [["chartCanvas", ""], [1, "chart-container"], [1, "chart-header", "mb-3"], [1, "chart-loading", "text-center", "py-5"], [1, "chart-wrapper", 3, "height", "width"], [3, "icon", "message", "size"], [1, "chart-title", "text-center"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-2", "text-muted"], [1, "chart-wrapper"], ["role", "img", 1, "attendance-chart"]], template: /* @__PURE__ */ __name(function AttendanceChartComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, AttendanceChartComponent_Conditional_1_Template, 3, 1, "div", 2);
    \u0275\u0275conditionalCreate(2, AttendanceChartComponent_Conditional_2_Template, 6, 2, "div", 3);
    \u0275\u0275conditionalCreate(3, AttendanceChartComponent_Conditional_3_Template, 3, 5, "div", 4);
    \u0275\u0275conditionalCreate(4, AttendanceChartComponent_Conditional_4_Template, 1, 3, "app-empty-state", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.title ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading && ctx.hasData() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading && !ctx.hasData() ? 4 : -1);
  }
}, "AttendanceChartComponent_Template"), dependencies: [CommonModule, EmptyStateComponent], styles: ["\n\n.chart-container[_ngcontent-%COMP%] {\n  position: relative;\n  background: white;\n  border-radius: 8px;\n  padding: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.chart-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e9ecef;\n  padding-bottom: 0.75rem;\n  margin-bottom: 1rem;\n}\n.chart-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  margin: 0;\n  font-size: 1.1rem;\n}\n.chart-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n}\n.attendance-chart[_ngcontent-%COMP%] {\n  max-width: 100%;\n  height: auto;\n}\n.chart-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 200px;\n}\n.no-data-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 200px;\n  color: #6c757d;\n}\n.no-data-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n@media (max-width: 768px) {\n  .chart-container[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .chart-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n.chart-loading[_ngcontent-%COMP%]   .spinner-border[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_chart-pulse 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_chart-pulse {\n  0% {\n    opacity: 0.6;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.6;\n  }\n}\n/*# sourceMappingURL=attendance-chart.component.css.map */"] }));
var AttendanceChartComponent = _AttendanceChartComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttendanceChartComponent, [{
    type: Component,
    args: [{ selector: "app-attendance-chart", standalone: true, imports: [CommonModule, EmptyStateComponent], template: `<div class="chart-container">\r
  <!-- Chart Title -->\r
  @if (title) {\r
    <div class="chart-header mb-3">\r
      <h5 class="chart-title text-center">{{ title }}</h5>\r
    </div>\r
  }\r
\r
  <!-- Loading State -->\r
  @if (loading) {\r
    <div class="chart-loading text-center py-5">\r
      <div class="spinner-border text-primary" role="status">\r
        <span class="visually-hidden">{{ i18nService.t('app.loading') }}</span>\r
      </div>\r
      <p class="mt-2 text-muted">{{ i18nService.t('attendance.chart.loading') }}</p>\r
    </div>\r
  }\r
\r
  <!-- Chart Canvas -->\r
  @if (!loading && hasData()) {\r
    <div class="chart-wrapper" [style.height.px]="height" [style.width.px]="width">\r
      <canvas\r
        #chartCanvas\r
        class="attendance-chart"\r
        [attr.aria-label]="title || 'Attendance Chart'"\r
        role="img">\r
      </canvas>\r
    </div>\r
  }\r
\r
  <!-- No Data State -->\r
  @if (!loading && !hasData()) {\r
    <app-empty-state\r
      [icon]="'fa-solid fa-chart-bar'"\r
      [message]="i18nService.t('attendance.chart.no_data')"\r
      [size]="'md'">\r
    </app-empty-state>\r
  }\r
</div>`, styles: ["/* src/app/pages/attendance/shared/attendance-chart/attendance-chart.component.css */\n.chart-container {\n  position: relative;\n  background: white;\n  border-radius: 8px;\n  padding: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.chart-header {\n  border-bottom: 1px solid #e9ecef;\n  padding-bottom: 0.75rem;\n  margin-bottom: 1rem;\n}\n.chart-title {\n  font-weight: 600;\n  color: #495057;\n  margin: 0;\n  font-size: 1.1rem;\n}\n.chart-wrapper {\n  position: relative;\n  width: 100%;\n}\n.attendance-chart {\n  max-width: 100%;\n  height: auto;\n}\n.chart-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 200px;\n}\n.no-data-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 200px;\n  color: #6c757d;\n}\n.no-data-state i {\n  opacity: 0.5;\n}\n@media (max-width: 768px) {\n  .chart-container {\n    padding: 0.75rem;\n  }\n  .chart-title {\n    font-size: 1rem;\n  }\n}\n.chart-loading .spinner-border {\n  animation: chart-pulse 1.5s ease-in-out infinite;\n}\n@keyframes chart-pulse {\n  0% {\n    opacity: 0.6;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.6;\n  }\n}\n/*# sourceMappingURL=attendance-chart.component.css.map */\n"] }]
  }], () => [{ type: I18nService }], { chartCanvas: [{
    type: ViewChild,
    args: ["chartCanvas", { static: false }]
  }], type: [{
    type: Input
  }], data: [{
    type: Input
  }], options: [{
    type: Input
  }], height: [{
    type: Input
  }], width: [{
    type: Input
  }], title: [{
    type: Input
  }], loading: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttendanceChartComponent, { className: "AttendanceChartComponent", filePath: "src/app/pages/attendance/shared/attendance-chart/attendance-chart.component.ts", lineNumber: 48 });
})();

// src/app/pages/attendance/shared/attendance-summary-card/attendance-summary-card.component.ts
function AttendanceSummaryCardComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 4)(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("app.loading"));
  }
}
__name(AttendanceSummaryCardComponent_Conditional_2_Template, "AttendanceSummaryCardComponent_Conditional_2_Template");
function AttendanceSummaryCardComponent_Conditional_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 12)(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 14);
    \u0275\u0275text(5, "%");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.data.percentage.toFixed(1));
  }
}
__name(AttendanceSummaryCardComponent_Conditional_3_Conditional_6_Template, "AttendanceSummaryCardComponent_Conditional_3_Conditional_6_Template");
function AttendanceSummaryCardComponent_Conditional_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "span", 15);
    \u0275\u0275element(2, "i");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.trendClasses);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.trendIcon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.data.trend.value, "% ");
  }
}
__name(AttendanceSummaryCardComponent_Conditional_3_Conditional_7_Template, "AttendanceSummaryCardComponent_Conditional_3_Conditional_7_Template");
function AttendanceSummaryCardComponent_Conditional_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "a", 16);
    \u0275\u0275text(2);
    \u0275\u0275element(3, "i", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", ctx_r0.data.link);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.data.actionLabel, " ");
  }
}
__name(AttendanceSummaryCardComponent_Conditional_3_Conditional_8_Template, "AttendanceSummaryCardComponent_Conditional_3_Conditional_8_Template");
function AttendanceSummaryCardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "h6", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 7)(4, "h1", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, AttendanceSummaryCardComponent_Conditional_3_Conditional_6_Template, 6, 1, "div", 9);
    \u0275\u0275conditionalCreate(7, AttendanceSummaryCardComponent_Conditional_3_Conditional_7_Template, 4, 5, "div", 10);
    \u0275\u0275conditionalCreate(8, AttendanceSummaryCardComponent_Conditional_3_Conditional_8_Template, 4, 2, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.data.title);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("text-" + ctx_r0.data.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatValue(ctx_r0.data.value), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showProgress && ctx_r0.data.percentage !== void 0 ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.data.trend ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.data.link && ctx_r0.data.actionLabel ? 8 : -1);
  }
}
__name(AttendanceSummaryCardComponent_Conditional_3_Template, "AttendanceSummaryCardComponent_Conditional_3_Template");
var _AttendanceSummaryCardComponent = class _AttendanceSummaryCardComponent {
  i18nService;
  data;
  loading = false;
  size = "md";
  showProgress = false;
  clickable = false;
  cardClick = new EventEmitter();
  constructor(i18nService) {
    this.i18nService = i18nService;
  }
  get progressPercentage() {
    if (!this.data.percentage && this.data.maxValue) {
      const numValue = typeof this.data.value === "number" ? this.data.value : 0;
      return Math.min(numValue / this.data.maxValue * 100, 100);
    }
    return this.data.percentage || 0;
  }
  get cardClasses() {
    const baseClasses = "h-100";
    const sizeClass = `card-${this.size}`;
    const colorClass = `border-${this.data.color}`;
    const clickableClass = this.clickable ? "clickable-card" : "";
    return `${baseClasses} ${sizeClass} ${colorClass} ${clickableClass}`.trim();
  }
  get iconClasses() {
    return `fa-solid ${this.data.icon} text-${this.data.color}`;
  }
  get trendClasses() {
    if (!this.data.trend)
      return "";
    return this.data.trend.isPositive ? "text-success" : "text-danger";
  }
  get trendIcon() {
    if (!this.data.trend)
      return "";
    return this.data.trend.isPositive ? "fa-solid fa-arrow-up" : "fa-solid fa-arrow-down";
  }
  onCardClick() {
    if (this.clickable) {
      this.cardClick.emit();
    }
  }
  formatValue(value) {
    if (typeof value === "number") {
      if (value >= 1e6) {
        return (value / 1e6).toFixed(1) + "M";
      } else if (value >= 1e3) {
        return (value / 1e3).toFixed(1) + "K";
      }
      return value.toString();
    }
    return value;
  }
};
__name(_AttendanceSummaryCardComponent, "AttendanceSummaryCardComponent");
__publicField(_AttendanceSummaryCardComponent, "\u0275fac", /* @__PURE__ */ __name(function AttendanceSummaryCardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AttendanceSummaryCardComponent)(\u0275\u0275directiveInject(I18nService));
}, "AttendanceSummaryCardComponent_Factory"));
__publicField(_AttendanceSummaryCardComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttendanceSummaryCardComponent, selectors: [["app-attendance-summary-card"]], inputs: { data: "data", loading: "loading", size: "size", showProgress: "showProgress", clickable: "clickable" }, outputs: { cardClick: "cardClick" }, decls: 4, vars: 4, consts: [[1, "card", "summary-card", 3, "click"], [1, "card-body"], [1, "text-center", "py-3"], [1, "card-content"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "text-primary"], [1, "visually-hidden"], [1, "card-title", "text-uppercase", "text-muted", "mb-3"], [1, "value-section", "mb-3"], [1, "display-value", "mb-0"], [1, "percentage-display", "text-center", "mb-3"], [1, "trend-display", "text-center", "mb-3"], [1, "action-section"], [1, "percentage-box"], [1, "percentage-value"], [1, "percentage-symbol"], [1, "trend-indicator"], [1, "btn", "btn-outline-primary", "btn-sm", "w-100", "action-btn", 3, "routerLink"], [1, "fa-solid", "fa-arrow-right", "ms-1"]], template: /* @__PURE__ */ __name(function AttendanceSummaryCardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AttendanceSummaryCardComponent_Template_div_click_0_listener() {
      return ctx.onCardClick();
    }, "AttendanceSummaryCardComponent_Template_div_click_0_listener"));
    \u0275\u0275elementStart(1, "div", 1);
    \u0275\u0275conditionalCreate(2, AttendanceSummaryCardComponent_Conditional_2_Template, 4, 1, "div", 2);
    \u0275\u0275conditionalCreate(3, AttendanceSummaryCardComponent_Conditional_3_Template, 9, 7, "div", 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.cardClasses);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.loading ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading ? 3 : -1);
  }
}, "AttendanceSummaryCardComponent_Template"), dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.summary-card[_ngcontent-%COMP%] {\n  transition: all 0.3s ease;\n  border-radius: 16px;\n  position: relative;\n  overflow: hidden;\n  background: white;\n  height: 100%;\n}\n.summary-card.border-primary[_ngcontent-%COMP%] {\n  border: 3px solid #0d6efd;\n}\n.summary-card.border-success[_ngcontent-%COMP%] {\n  border: 3px solid #198754;\n}\n.summary-card.border-danger[_ngcontent-%COMP%] {\n  border: 3px solid #dc3545;\n}\n.summary-card.border-warning[_ngcontent-%COMP%] {\n  border: 3px solid #ffc107;\n}\n.summary-card.border-info[_ngcontent-%COMP%] {\n  border: 3px solid #0dcaf0;\n}\n.summary-card.border-secondary[_ngcontent-%COMP%] {\n  border: 3px solid #6c757d;\n}\n.summary-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  transform: translateY(-4px);\n}\n.clickable-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.clickable-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);\n  transform: translateY(-6px);\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.75rem;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.card-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  margin-bottom: 1rem;\n  color: #6c757d;\n}\n.value-section[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.display-value[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  font-weight: 700;\n  line-height: 1;\n  margin: 0;\n}\n.percentage-display[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n}\n.percentage-box[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #f8f9fa;\n  border-radius: 8px;\n  padding: 0.5rem 1rem;\n}\n.percentage-value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #212529;\n}\n.percentage-symbol[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #6c757d;\n  margin-left: 0.25rem;\n}\n.trend-display[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n}\n.trend-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.9rem;\n  font-weight: 600;\n}\n.trend-indicator[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.trend-indicator.text-success[_ngcontent-%COMP%] {\n  color: #198754;\n}\n.trend-indicator.text-danger[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n.action-section[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 1rem;\n}\n.action-btn[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  font-weight: 500;\n  padding: 0.5rem 1rem;\n  text-transform: capitalize;\n  transition: all 0.3s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.card-sm[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.card-sm[_ngcontent-%COMP%]   .display-value[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.card-lg[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 2.25rem;\n}\n.card-lg[_ngcontent-%COMP%]   .display-value[_ngcontent-%COMP%] {\n  font-size: 3.5rem;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n@media (max-width: 768px) {\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n  .display-value[_ngcontent-%COMP%] {\n    font-size: 2.25rem;\n  }\n  .card-title[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n  }\n  .percentage-value[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .trend-indicator[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n}\n@media (max-width: 576px) {\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .display-value[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    padding: 0.4rem 0.8rem;\n  }\n}\n.display-value[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_valueUpdate 0.6s ease-out;\n}\n@keyframes _ngcontent-%COMP%_valueUpdate {\n  from {\n    opacity: 0.7;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n/*# sourceMappingURL=attendance-summary-card.component.css.map */"] }));
var AttendanceSummaryCardComponent = _AttendanceSummaryCardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttendanceSummaryCardComponent, [{
    type: Component,
    args: [{ selector: "app-attendance-summary-card", standalone: true, imports: [CommonModule, RouterModule], template: `<div class="card summary-card" [class]="cardClasses" (click)="onCardClick()">\r
  <div class="card-body">\r
    <!-- Loading State -->\r
    @if (loading) {\r
      <div class="text-center py-3">\r
        <div class="spinner-border spinner-border-sm text-primary" role="status">\r
          <span class="visually-hidden">{{ i18nService.t('app.loading') }}</span>\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- Card Content -->\r
    @if (!loading) {\r
      <div class="card-content">\r
        <!-- Title -->\r
        <h6 class="card-title text-uppercase text-muted mb-3">{{ data.title }}</h6>\r
\r
        <!-- Value -->\r
        <div class="value-section mb-3">\r
          <h1 class="display-value mb-0" [class]="'text-' + data.color">\r
            {{ formatValue(data.value) }}\r
          </h1>\r
        </div>\r
\r
        <!-- Progress/Percentage Display -->\r
        @if (showProgress && data.percentage !== undefined) {\r
          <div class="percentage-display text-center mb-3">\r
            <div class="percentage-box">\r
              <span class="percentage-value">{{ data.percentage.toFixed(1) }}</span>\r
              <span class="percentage-symbol">%</span>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Trend Indicator -->\r
        @if (data.trend) {\r
          <div class="trend-display text-center mb-3">\r
            <span class="trend-indicator" [class]="trendClasses">\r
              <i [class]="trendIcon"></i>\r
              {{ data.trend.value }}%\r
            </span>\r
          </div>\r
        }\r
\r
        <!-- Action Button -->\r
        @if (data.link && data.actionLabel) {\r
          <div class="action-section">\r
            <a [routerLink]="data.link" class="btn btn-outline-primary btn-sm w-100 action-btn">\r
              {{ data.actionLabel }}\r
              <i class="fa-solid fa-arrow-right ms-1"></i>\r
            </a>\r
          </div>\r
        }\r
      </div>\r
    }\r
  </div>\r
</div>`, styles: ["/* src/app/pages/attendance/shared/attendance-summary-card/attendance-summary-card.component.css */\n.summary-card {\n  transition: all 0.3s ease;\n  border-radius: 16px;\n  position: relative;\n  overflow: hidden;\n  background: white;\n  height: 100%;\n}\n.summary-card.border-primary {\n  border: 3px solid #0d6efd;\n}\n.summary-card.border-success {\n  border: 3px solid #198754;\n}\n.summary-card.border-danger {\n  border: 3px solid #dc3545;\n}\n.summary-card.border-warning {\n  border: 3px solid #ffc107;\n}\n.summary-card.border-info {\n  border: 3px solid #0dcaf0;\n}\n.summary-card.border-secondary {\n  border: 3px solid #6c757d;\n}\n.summary-card:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  transform: translateY(-4px);\n}\n.clickable-card {\n  cursor: pointer;\n}\n.clickable-card:hover {\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);\n  transform: translateY(-6px);\n}\n.card-body {\n  padding: 1.75rem;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.card-content {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n.card-title {\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  margin-bottom: 1rem;\n  color: #6c757d;\n}\n.value-section {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.display-value {\n  font-size: 3rem;\n  font-weight: 700;\n  line-height: 1;\n  margin: 0;\n}\n.percentage-display {\n  margin: 1rem 0;\n}\n.percentage-box {\n  display: inline-block;\n  background: #f8f9fa;\n  border-radius: 8px;\n  padding: 0.5rem 1rem;\n}\n.percentage-value {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #212529;\n}\n.percentage-symbol {\n  font-size: 1rem;\n  color: #6c757d;\n  margin-left: 0.25rem;\n}\n.trend-display {\n  margin: 0.5rem 0;\n}\n.trend-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.9rem;\n  font-weight: 600;\n}\n.trend-indicator i {\n  font-size: 0.75rem;\n}\n.trend-indicator.text-success {\n  color: #198754;\n}\n.trend-indicator.text-danger {\n  color: #dc3545;\n}\n.action-section {\n  margin-top: auto;\n  padding-top: 1rem;\n}\n.action-btn {\n  border-radius: 8px;\n  font-weight: 500;\n  padding: 0.5rem 1rem;\n  text-transform: capitalize;\n  transition: all 0.3s ease;\n}\n.action-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.card-sm .card-body {\n  padding: 1.25rem;\n}\n.card-sm .display-value {\n  font-size: 2rem;\n}\n.card-lg .card-body {\n  padding: 2.25rem;\n}\n.card-lg .display-value {\n  font-size: 3.5rem;\n}\n.spinner-border-sm {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n@media (max-width: 768px) {\n  .card-body {\n    padding: 1.25rem;\n  }\n  .display-value {\n    font-size: 2.25rem;\n  }\n  .card-title {\n    font-size: 0.7rem;\n  }\n  .percentage-value {\n    font-size: 1rem;\n  }\n  .trend-indicator {\n    font-size: 0.85rem;\n  }\n}\n@media (max-width: 576px) {\n  .card-body {\n    padding: 1rem;\n  }\n  .display-value {\n    font-size: 2rem;\n  }\n  .action-btn {\n    font-size: 0.85rem;\n    padding: 0.4rem 0.8rem;\n  }\n}\n.display-value {\n  animation: valueUpdate 0.6s ease-out;\n}\n@keyframes valueUpdate {\n  from {\n    opacity: 0.7;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n/*# sourceMappingURL=attendance-summary-card.component.css.map */\n"] }]
  }], () => [{ type: I18nService }], { data: [{
    type: Input
  }], loading: [{
    type: Input
  }], size: [{
    type: Input
  }], showProgress: [{
    type: Input
  }], clickable: [{
    type: Input
  }], cardClick: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttendanceSummaryCardComponent, { className: "AttendanceSummaryCardComponent", filePath: "src/app/pages/attendance/shared/attendance-summary-card/attendance-summary-card.component.ts", lineNumber: 30 });
})();

export {
  AttendanceChartComponent,
  AttendanceSummaryCardComponent
};
//# sourceMappingURL=chunk-OO3QG3P3.js.map
