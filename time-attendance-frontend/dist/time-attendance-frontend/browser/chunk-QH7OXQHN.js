import {
  FilterPanelComponent
} from "./chunk-HWLXKNQA.js";
import {
  AttendanceChartComponent,
  AttendanceSummaryCardComponent
} from "./chunk-ZCLPZNJK.js";
import {
  AttendanceService
} from "./chunk-UR7BACYI.js";
import {
  DataTableComponent
} from "./chunk-JW5UYWPK.js";
import "./chunk-NKWUQBPB.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import {
  AttendanceStatus
} from "./chunk-XLGMY32C.js";
import "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import {
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import {
  Router,
  RouterModule
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/attendance/monthly-report/monthly-report.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.title, "_forTrack0");
function MonthlyReportComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 15)(2, "span", 16);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("app.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.messages.loading_monthly_report"));
  }
}
__name(MonthlyReportComponent_Conditional_15_Template, "MonthlyReportComponent_Conditional_15_Template");
function MonthlyReportComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "i", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(MonthlyReportComponent_Conditional_16_Template, "MonthlyReportComponent_Conditional_16_Template");
function MonthlyReportComponent_Conditional_17_Conditional_54_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275element(1, "app-attendance-summary-card", 87);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const card_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("data", card_r3)("loading", ctx_r0.loading())("showProgress", !!card_r3.percentage)("clickable", false);
  }
}
__name(MonthlyReportComponent_Conditional_17_Conditional_54_For_7_Template, "MonthlyReportComponent_Conditional_17_Conditional_54_For_7_Template");
function MonthlyReportComponent_Conditional_17_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 74)(2, "h4", 75);
    \u0275\u0275element(3, "i", 76);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 3);
    \u0275\u0275repeaterCreate(6, MonthlyReportComponent_Conditional_17_Conditional_54_For_7_Template, 2, 4, "div", 77, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 3)(9, "div", 78)(10, "div", 79)(11, "div", 80)(12, "h5", 22);
    \u0275\u0275element(13, "i", 81);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "app-status-badge", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 24)(17, "p", 82);
    \u0275\u0275element(18, "i", 83);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "app-attendance-chart", 84);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 78)(22, "div", 79)(23, "div", 80)(24, "h5", 22);
    \u0275\u0275element(25, "i", 85);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "app-status-badge", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 24)(29, "p", 82);
    \u0275\u0275element(30, "i", 83);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "app-attendance-chart", 86);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3(" ", ctx_r0.i18nService.t("attendance.monthly_summary"), " - ", ctx_r0.getMonthName(ctx_r0.currentFilters().month), " ", ctx_r0.currentFilters().year, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.summaryCards());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.charts.monthly_overview"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.getMonthName(ctx_r0.currentFilters().month))("variant", "primary")("showIcon", false);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.chart.descriptions.monthly_overview"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r0.attendanceOverviewChart())("loading", ctx_r0.loading())("height", 300);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.charts.overtime_trend"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.i18nService.t("attendance.dashboard.daily"))("variant", "info")("showIcon", false);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.chart.descriptions.overtime_trend"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r0.overtimeTrendChart())("loading", ctx_r0.loading())("height", 300);
  }
}
__name(MonthlyReportComponent_Conditional_17_Conditional_54_Template, "MonthlyReportComponent_Conditional_17_Conditional_54_Template");
function MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.getAttendanceRateClass(item_r4.attendanceRate));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 3, item_r4.attendanceRate, "1.2-2"), "% ");
  }
}
__name(MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_0_Template, "MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_0_Template");
function MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, item_r4.totalWorkingHours, "1.2-2"), " ");
  }
}
__name(MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_1_Template, "MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_1_Template");
function MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, item_r4.totalOvertimeHours, "1.2-2"), " ");
  }
}
__name(MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_2_Template, "MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_2_Template");
function MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    const item_r4 = ctx_r4.$implicit;
    const column_r6 = ctx_r4.column;
    \u0275\u0275textInterpolate1(" ", item_r4[column_r6.key], " ");
  }
}
__name(MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_3_Template, "MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_3_Template");
function MonthlyReportComponent_Conditional_17_ng_template_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_0_Template, 3, 6, "span", 88)(1, MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_1_Template, 2, 4)(2, MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_2_Template, 2, 4)(3, MonthlyReportComponent_Conditional_17_ng_template_65_Conditional_3_Template, 1, 1);
  }
  if (rf & 2) {
    const column_r6 = ctx.column;
    \u0275\u0275conditional(column_r6.key === "attendanceRate" ? 0 : column_r6.key === "totalWorkingHours" ? 1 : column_r6.key === "totalOvertimeHours" ? 2 : 3);
  }
}
__name(MonthlyReportComponent_Conditional_17_ng_template_65_Template, "MonthlyReportComponent_Conditional_17_ng_template_65_Template");
function MonthlyReportComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 19)(2, "div", 20)(3, "div", 21)(4, "h5", 22);
    \u0275\u0275element(5, "i", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 24)(8, "form", 25)(9, "div", 26)(10, "label", 27);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 28)(13, "option", 29);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 30);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 31);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 32);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 33);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 34);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 35);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 36);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 37);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 38);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 39);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 40);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 26)(38, "label", 27);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "select", 41)(41, "option", 42);
    \u0275\u0275text(42, "2024");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 43);
    \u0275\u0275text(44, "2025");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "option", 44);
    \u0275\u0275text(46, "2026");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 45)(48, "button", 46);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function MonthlyReportComponent_Conditional_17_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.generateReport());
    }, "MonthlyReportComponent_Conditional_17_Template_button_click_48_listener"));
    \u0275\u0275element(49, "i", 47);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 48);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function MonthlyReportComponent_Conditional_17_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.filterForm.reset());
    }, "MonthlyReportComponent_Conditional_17_Template_button_click_51_listener"));
    \u0275\u0275element(52, "i", 49);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275conditionalCreate(54, MonthlyReportComponent_Conditional_17_Conditional_54_Template, 33, 19, "div", 50);
    \u0275\u0275elementStart(55, "div", 51)(56, "div", 20)(57, "div", 21)(58, "div", 52)(59, "h5", 22);
    \u0275\u0275element(60, "i", 53);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd();
    \u0275\u0275element(62, "app-status-badge", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "div", 55)(64, "app-data-table", 56);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function MonthlyReportComponent_Conditional_17_Template_app_data_table_actionClick_64_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onTableAction($event));
    }, "MonthlyReportComponent_Conditional_17_Template_app_data_table_actionClick_64_listener"));
    \u0275\u0275template(65, MonthlyReportComponent_Conditional_17_ng_template_65_Template, 4, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(67, "div", 57)(68, "div", 20)(69, "div", 21)(70, "h5", 22);
    \u0275\u0275element(71, "i", 58);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 24)(74, "div", 59)(75, "div", 60)(76, "div", 61)(77, "div", 62);
    \u0275\u0275element(78, "i", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "h6");
    \u0275\u0275text(80);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "p", 64);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "button", 65);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function MonthlyReportComponent_Conditional_17_Template_button_click_83_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.exportToExcel());
    }, "MonthlyReportComponent_Conditional_17_Template_button_click_83_listener"));
    \u0275\u0275element(84, "i", 66);
    \u0275\u0275text(85);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(86, "div", 60)(87, "div", 61)(88, "div", 67);
    \u0275\u0275element(89, "i", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "h6");
    \u0275\u0275text(91);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "p", 64);
    \u0275\u0275text(93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "button", 69);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function MonthlyReportComponent_Conditional_17_Template_button_click_94_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.exportToPDF());
    }, "MonthlyReportComponent_Conditional_17_Template_button_click_94_listener"));
    \u0275\u0275element(95, "i", 66);
    \u0275\u0275text(96);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(97, "div", 60)(98, "div", 61)(99, "div", 70);
    \u0275\u0275element(100, "i", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "h6");
    \u0275\u0275text(102);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "p", 64);
    \u0275\u0275text(104);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "button", 72);
    \u0275\u0275element(106, "i", 73);
    \u0275\u0275text(107);
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.filters.title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.filterForm);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.filters.month"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.january"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.february"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.march"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.april"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.may"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.june"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.july"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.august"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.september"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.october"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.november"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("months.december"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.filters.year"));
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r0.loading());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.actions.generate_report"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.loading());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("app.reset"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.summaryStats() ? 54 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.employee_records"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.reportData().length + " " + ctx_r0.i18nService.t("attendance.employees"))("variant", "light")("showIcon", false);
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r0.reportData())("columns", ctx_r0.tableColumns)("loading", ctx_r0.loading())("searchable", true)("sortable", true)("paginated", true)("pageSize", 10)("exportable", true);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.export_options"), " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("app.export_excel"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.export.excel_description"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.exporting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("app.download"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("app.export_pdf"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.export.pdf_description"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.exporting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("app.download"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.export.email_report"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.export.email_description"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("app.coming_soon"), " ");
  }
}
__name(MonthlyReportComponent_Conditional_17_Template, "MonthlyReportComponent_Conditional_17_Template");
var _MonthlyReportComponent = class _MonthlyReportComponent {
  fb;
  attendanceService;
  i18nService;
  notificationService;
  router;
  // Signals for reactive state management
  monthlyReport = signal(null, ...ngDevMode ? [{ debugName: "monthlyReport" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  exporting = signal(false, ...ngDevMode ? [{ debugName: "exporting" }] : []);
  // Form and filters
  filterForm;
  filterConfig = signal({}, ...ngDevMode ? [{ debugName: "filterConfig" }] : []);
  currentFilters = signal({
    month: (/* @__PURE__ */ new Date()).getMonth() + 1,
    year: (/* @__PURE__ */ new Date()).getFullYear()
  }, ...ngDevMode ? [{ debugName: "currentFilters" }] : []);
  // Computed properties
  reportData = computed(() => this.monthlyReport()?.employeeRecords || [], ...ngDevMode ? [{ debugName: "reportData" }] : []);
  summaryStats = computed(() => this.monthlyReport()?.summaryStatistics, ...ngDevMode ? [{ debugName: "summaryStats" }] : []);
  // Chart data for monthly overview
  attendanceOverviewChart = computed(() => {
    const stats = this.summaryStats();
    if (!stats)
      return { labels: [], datasets: [] };
    return {
      labels: ["Present Days", "Absent Days", "Late Days", "Overtime Days"],
      datasets: [{
        label: "Monthly Attendance Overview",
        data: [
          stats.totalPresentDays,
          stats.totalAbsentDays,
          stats.totalLateDays,
          stats.totalOvertimeDays
        ],
        backgroundColor: ["#198754", "#dc3545", "#ffc107", "#0d6efd"],
        borderWidth: 2
      }]
    };
  }, ...ngDevMode ? [{ debugName: "attendanceOverviewChart" }] : []);
  // Overtime trends chart
  overtimeTrendChart = computed(() => {
    const report = this.monthlyReport();
    if (!report?.dailyBreakdown)
      return { labels: [], datasets: [] };
    const dailyData = report.dailyBreakdown;
    return {
      labels: dailyData.map((d) => new Date(d.date).getDate().toString()),
      datasets: [{
        label: "Daily Overtime Hours",
        data: dailyData.map((d) => d.totalOvertimeHours),
        backgroundColor: "#0d6efd",
        borderColor: "#0d6efd",
        borderWidth: 2,
        fill: false
      }]
    };
  }, ...ngDevMode ? [{ debugName: "overtimeTrendChart" }] : []);
  // Summary cards
  summaryCards = computed(() => {
    const stats = this.summaryStats();
    if (!stats)
      return [];
    const workingDays = this.getWorkingDaysInMonth();
    return [
      {
        title: "Total Employees",
        value: stats.totalEmployees,
        icon: "fa-users",
        color: "primary",
        subtitle: "In selected period"
      },
      {
        title: "Average Attendance Rate",
        value: `${Math.round(stats.averageAttendanceRate)}%`,
        icon: "fa-percentage",
        color: stats.averageAttendanceRate >= 90 ? "success" : stats.averageAttendanceRate >= 80 ? "warning" : "danger",
        percentage: stats.averageAttendanceRate,
        trend: {
          value: 2.3,
          isPositive: true,
          label: "vs last month"
        }
      },
      {
        title: "Total Overtime Hours",
        value: `${Math.round(stats.totalOvertimeHours)}h`,
        icon: "fa-business-time",
        color: "info",
        subtitle: `${Math.round(stats.totalOvertimeHours / stats.totalEmployees)}h avg per employee`
      },
      {
        title: "Perfect Attendance",
        value: stats.perfectAttendanceEmployees,
        icon: "fa-award",
        color: "success",
        percentage: stats.totalEmployees > 0 ? stats.perfectAttendanceEmployees / stats.totalEmployees * 100 : 0,
        subtitle: "Employees with no absences"
      },
      {
        title: "Late Arrivals",
        value: stats.totalLateDays,
        icon: "fa-clock",
        color: "warning",
        subtitle: `${Math.round(stats.totalLateDays / workingDays)} avg per day`
      },
      {
        title: "Absent Days",
        value: stats.totalAbsentDays,
        icon: "fa-user-times",
        color: "danger",
        percentage: workingDays > 0 ? (workingDays * stats.totalEmployees - stats.totalPresentDays) / (workingDays * stats.totalEmployees) * 100 : 0,
        subtitle: `${Math.round(stats.totalAbsentDays / workingDays)} avg per day`
      }
    ];
  }, ...ngDevMode ? [{ debugName: "summaryCards" }] : []);
  // Table configuration
  tableColumns = [
    { key: "employeeName", label: "Employee", sortable: true },
    { key: "employeeNumber", label: "Number", sortable: true },
    { key: "department", label: "Department", sortable: true },
    { key: "totalWorkingDays", label: "Working Days", sortable: true },
    { key: "presentDays", label: "Present", sortable: true },
    { key: "absentDays", label: "Absent", sortable: true },
    { key: "lateDays", label: "Late", sortable: true },
    { key: "overtimeDays", label: "Overtime Days", sortable: true },
    { key: "totalWorkingHours", label: "Total Hours", sortable: true },
    { key: "totalOvertimeHours", label: "Overtime Hours", sortable: true },
    { key: "attendanceRate", label: "Rate %", sortable: true },
    { key: "actions", label: "Actions", sortable: false }
  ];
  // Constants for template
  AttendanceStatus = AttendanceStatus;
  constructor(fb, attendanceService, i18nService, notificationService, router) {
    this.fb = fb;
    this.attendanceService = attendanceService;
    this.i18nService = i18nService;
    this.notificationService = notificationService;
    this.router = router;
  }
  ngOnInit() {
    this.createFilterForm();
    this.setupFilterConfig();
    this.loadMonthlyReport();
  }
  createFilterForm() {
    const currentDate = /* @__PURE__ */ new Date();
    this.filterForm = this.fb.group({
      month: [currentDate.getMonth() + 1, [Validators.required, Validators.min(1), Validators.max(12)]],
      year: [currentDate.getFullYear(), [Validators.required, Validators.min(2020)]],
      departmentIds: [[]],
      branchIds: [[]],
      employeeIds: [[]]
    });
    this.filterForm.valueChanges.subscribe((values) => {
      this.currentFilters.set(values);
    });
  }
  setupFilterConfig() {
    this.filterConfig.set({
      employees: {
        enabled: true,
        multiple: true,
        options: []
        // Would be loaded from EmployeeService
      },
      departments: {
        enabled: true,
        multiple: true,
        options: []
        // Would be loaded from DepartmentService
      },
      branches: {
        enabled: true,
        multiple: true,
        options: []
        // Would be loaded from BranchService
      }
    });
  }
  loadMonthlyReport() {
    const filters = this.currentFilters();
    this.loading.set(true);
    this.error.set(null);
    this.attendanceService.getMonthlyReport(filters).subscribe({
      next: /* @__PURE__ */ __name((data) => {
        this.monthlyReport.set(data);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading monthly report:", error);
        this.error.set("Failed to load monthly report");
        this.loading.set(false);
        this.notificationService.error("Failed to load monthly report");
      }, "error")
    });
  }
  generateMockMonthlyReport(filters) {
    const workingDays = this.getWorkingDaysInMonth();
    const employeeCount = 50;
    const employeeRecords = [];
    for (let i = 1; i <= employeeCount; i++) {
      const presentDays = Math.floor(Math.random() * (workingDays - 2)) + 18;
      const absentDays = workingDays - presentDays;
      const lateDays = Math.floor(Math.random() * 5);
      const overtimeDays = Math.floor(Math.random() * 10);
      const totalWorkingHours = presentDays * 8 + (Math.random() * 10 - 5);
      const totalOvertimeHours = overtimeDays * (Math.random() * 3 + 0.5);
      employeeRecords.push({
        employeeId: i.toString(),
        employeeName: `Employee ${i.toString().padStart(3, "0")}`,
        employeeNumber: `EMP${i.toString().padStart(3, "0")}`,
        department: `Department ${i % 5 + 1}`,
        branch: `Branch ${i % 3 + 1}`,
        totalWorkingDays: workingDays,
        presentDays,
        absentDays,
        lateDays,
        overtimeDays,
        totalWorkingHours: Math.round(totalWorkingHours * 100) / 100,
        totalOvertimeHours: Math.round(totalOvertimeHours * 100) / 100,
        attendanceRate: Math.round(presentDays / workingDays * 100),
        perfectAttendance: absentDays === 0 && lateDays === 0
      });
    }
    const summaryStatistics = {
      totalEmployees: employeeCount,
      totalPresentDays: employeeRecords.reduce((sum, emp) => sum + emp.presentDays, 0),
      totalAbsentDays: employeeRecords.reduce((sum, emp) => sum + emp.absentDays, 0),
      totalLateDays: employeeRecords.reduce((sum, emp) => sum + emp.lateDays, 0),
      totalOvertimeDays: employeeRecords.reduce((sum, emp) => sum + emp.overtimeDays, 0),
      totalOvertimeHours: employeeRecords.reduce((sum, emp) => sum + emp.totalOvertimeHours, 0),
      averageWorkingHours: employeeRecords.reduce((sum, emp) => sum + emp.totalWorkingHours, 0) / employeeCount,
      averageAttendanceRate: employeeRecords.reduce((sum, emp) => sum + emp.attendanceRate, 0) / employeeCount,
      perfectAttendanceEmployees: employeeRecords.filter((emp) => emp.perfectAttendance).length,
      period: {
        startDate: `${filters.year}-${filters.month.toString().padStart(2, "0")}-01`,
        endDate: `${filters.year}-${filters.month.toString().padStart(2, "0")}-${workingDays.toString().padStart(2, "0")}`
      }
    };
    const dailyBreakdown = [];
    for (let day = 1; day <= workingDays; day++) {
      dailyBreakdown.push({
        date: `${filters.year}-${filters.month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
        totalOvertimeHours: Math.random() * 20 + 5
        // 5-25 hours per day
      });
    }
    return {
      period: summaryStatistics.period,
      summary: summaryStatistics,
      summaryStatistics,
      employeeRecords,
      dailyBreakdown
    };
  }
  getWorkingDaysInMonth() {
    const filters = this.currentFilters();
    const date = new Date(filters.year, filters.month - 1, 1);
    const lastDay = new Date(filters.year, filters.month, 0).getDate();
    let workingDays = 0;
    for (let day = 1; day <= lastDay; day++) {
      const currentDate = new Date(filters.year, filters.month - 1, day);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        workingDays++;
      }
    }
    return workingDays;
  }
  onFiltersChanged(filters) {
    if (filters.departmentIds) {
      this.filterForm.patchValue({ departmentIds: filters.departmentIds });
    }
    if (filters.branchIds) {
      this.filterForm.patchValue({ branchIds: filters.branchIds });
    }
    if (filters.employeeIds) {
      this.filterForm.patchValue({ employeeIds: filters.employeeIds });
    }
  }
  onFiltersApplied() {
    this.loadMonthlyReport();
  }
  generateReport() {
    this.loadMonthlyReport();
  }
  exportToExcel() {
    this.exporting.set(true);
    setTimeout(() => {
      this.exporting.set(false);
      this.notificationService.success("Monthly report exported successfully");
    }, 2e3);
  }
  exportToPDF() {
    this.exporting.set(true);
    setTimeout(() => {
      this.exporting.set(false);
      this.notificationService.success("Monthly report exported to PDF successfully");
    }, 2e3);
  }
  getMonthName(month) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return months[month - 1] || "";
  }
  getAttendanceRateClass(rate) {
    if (rate >= 95)
      return "text-success";
    if (rate >= 85)
      return "text-warning";
    return "text-danger";
  }
  viewEmployeeDetails(employee) {
    const filters = this.currentFilters();
    const year = filters.year;
    const month = filters.month;
    this.router.navigate(["/attendance/employee-history"], {
      queryParams: {
        employeeId: employee.employeeId,
        year,
        month
      }
    });
  }
  onTableAction(action) {
    switch (action.action) {
      case "view":
        this.viewEmployeeDetails(action.item);
        break;
      case "export":
        this.exportEmployeeReport(action.item);
        break;
    }
  }
  exportEmployeeReport(employee) {
    this.notificationService.success(`Exporting report for ${employee.employeeName}`);
  }
};
__name(_MonthlyReportComponent, "MonthlyReportComponent");
__publicField(_MonthlyReportComponent, "\u0275fac", /* @__PURE__ */ __name(function MonthlyReportComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MonthlyReportComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AttendanceService), \u0275\u0275directiveInject(I18nService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(Router));
}, "MonthlyReportComponent_Factory"));
__publicField(_MonthlyReportComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MonthlyReportComponent, selectors: [["app-monthly-report"]], decls: 18, vars: 16, consts: [["cellTemplate", ""], [1, "container-fluid", "p-4"], [3, "title"], [1, "row", "mb-4"], [1, "col-12"], [1, "d-flex", "justify-content-end", "align-items-center"], ["type", "button", 1, "btn", "btn-outline-secondary", "me-2", 3, "click", "disabled"], [1, "fa-solid", "fa-refresh", "me-2"], ["type", "button", 1, "btn", "btn-outline-success", "me-2", 3, "click", "disabled"], [1, "fa-solid", "fa-file-excel", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fa-solid", "fa-file-pdf", "me-2"], [1, "text-center", "py-5"], [1, "alert", "alert-danger"], [1, "monthly-report-content"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-2", "text-muted"], [1, "fa-solid", "fa-exclamation-triangle"], [1, "filters-section", "mb-4"], [1, "card"], [1, "card-header"], [1, "mb-0"], [1, "fa-solid", "fa-filter", "me-2"], [1, "card-body"], [1, "row", "g-3", 3, "formGroup"], [1, "col-md-3"], [1, "form-label"], ["formControlName", "month", 1, "form-select"], ["value", "1"], ["value", "2"], ["value", "3"], ["value", "4"], ["value", "5"], ["value", "6"], ["value", "7"], ["value", "8"], ["value", "9"], ["value", "10"], ["value", "11"], ["value", "12"], ["formControlName", "year", 1, "form-select"], ["value", "2024"], ["value", "2025"], ["value", "2026"], [1, "col-md-6", "d-flex", "align-items-end"], ["type", "button", 1, "btn", "btn-primary", "me-2", 3, "click", "disabled"], [1, "fa-solid", "fa-chart-bar", "me-1"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-times", "me-1"], [1, "report-summary", "mb-4"], [1, "employee-records-section"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "fa-solid", "fa-table", "me-2"], [3, "label", "variant", "showIcon"], [1, "card-body", "p-0"], [3, "actionClick", "data", "columns", "loading", "searchable", "sortable", "paginated", "pageSize", "exportable"], [1, "mt-4"], [1, "fa-solid", "fa-download", "me-2"], [1, "row"], [1, "col-md-4"], [1, "export-option-card"], [1, "export-icon", "text-success"], [1, "fa-solid", "fa-file-excel", "fa-2x"], [1, "text-muted", "small"], ["type", "button", 1, "btn", "btn-success", "btn-sm", 3, "click", "disabled"], [1, "fa-solid", "fa-download", "me-1"], [1, "export-icon", "text-danger"], [1, "fa-solid", "fa-file-pdf", "fa-2x"], ["type", "button", 1, "btn", "btn-danger", "btn-sm", 3, "click", "disabled"], [1, "export-icon", "text-info"], [1, "fa-solid", "fa-envelope", "fa-2x"], ["type", "button", 1, "btn", "btn-info", "btn-sm", 3, "disabled"], [1, "fa-solid", "fa-envelope", "me-1"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "section-title"], [1, "fa-solid", "fa-chart-line", "me-2"], [1, "col-xl-2", "col-lg-4", "col-md-6", "mb-3"], [1, "col-lg-6", "mb-4"], [1, "card", "h-100"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "fa-solid", "fa-chart-pie", "text-primary", "me-2"], [1, "text-muted", "small", "mb-3"], [1, "fa-solid", "fa-info-circle", "me-1"], ["chartType", "doughnut", 3, "data", "loading", "height"], [1, "fa-solid", "fa-chart-line", "text-info", "me-2"], ["chartType", "line", 3, "data", "loading", "height"], [3, "data", "loading", "showProgress", "clickable"], [3, "class"]], template: /* @__PURE__ */ __name(function MonthlyReportComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-page-header", 2);
    \u0275\u0275elementStart(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "div")(6, "button", 6);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function MonthlyReportComponent_Template_button_click_6_listener() {
      return ctx.loadMonthlyReport();
    }, "MonthlyReportComponent_Template_button_click_6_listener"));
    \u0275\u0275element(7, "i", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function MonthlyReportComponent_Template_button_click_9_listener() {
      return ctx.exportToExcel();
    }, "MonthlyReportComponent_Template_button_click_9_listener"));
    \u0275\u0275element(10, "i", 9);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 10);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function MonthlyReportComponent_Template_button_click_12_listener() {
      return ctx.exportToPDF();
    }, "MonthlyReportComponent_Template_button_click_12_listener"));
    \u0275\u0275element(13, "i", 11);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(15, MonthlyReportComponent_Conditional_15_Template, 6, 2, "div", 12);
    \u0275\u0275conditionalCreate(16, MonthlyReportComponent_Conditional_16_Template, 3, 1, "div", 13);
    \u0275\u0275conditionalCreate(17, MonthlyReportComponent_Conditional_17_Template, 108, 46, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18nService.t("attendance.monthly_report"));
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-spin", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx.i18nService.t("app.refresh"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.exporting() || ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-spin", ctx.exporting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx.i18nService.t("app.export_excel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.exporting() || ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-spin", ctx.exporting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx.i18nService.t("app.export_pdf"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 17 : -1);
  }
}, "MonthlyReportComponent_Template"), dependencies: [
  CommonModule,
  FormsModule,
  \u0275NgNoValidate,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  SelectControlValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  FormGroupDirective,
  FormControlName,
  RouterModule,
  DataTableComponent,
  PageHeaderComponent,
  AttendanceChartComponent,
  AttendanceSummaryCardComponent,
  StatusBadgeComponent,
  DecimalPipe
], styles: ['\n\n.monthly-report-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  min-height: 100vh;\n}\n.page-header[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  margin-bottom: 2rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 2.25rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin-bottom: 0.5rem;\n  letter-spacing: -0.025em;\n}\n.avatar-circle[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #0d6efd 0%,\n      #6610f2 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.attendance-rate-cell[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n.working-hours-cell[_ngcontent-%COMP%]   .fw-semibold[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.working-hours-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.export-option-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 1.5rem;\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  background: white;\n  transition: all 0.3s ease-in-out;\n  height: 100%;\n}\n.export-option-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-color: #0d6efd;\n}\n.export-icon[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.export-option-card[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 0.75rem;\n  color: #495057;\n}\n.export-option-card[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  line-height: 1.4;\n}\n.export-option-card[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideInUp 0.6s ease-out;\n}\n.export-section[_ngcontent-%COMP%]   .col-md-4[_ngcontent-%COMP%]:nth-child(1)   .export-option-card[_ngcontent-%COMP%] {\n  animation-delay: 0.1s;\n}\n.export-section[_ngcontent-%COMP%]   .col-md-4[_ngcontent-%COMP%]:nth-child(2)   .export-option-card[_ngcontent-%COMP%] {\n  animation-delay: 0.2s;\n}\n.export-section[_ngcontent-%COMP%]   .col-md-4[_ngcontent-%COMP%]:nth-child(3)   .export-option-card[_ngcontent-%COMP%] {\n  animation-delay: 0.3s;\n}\n@keyframes _ngcontent-%COMP%_slideInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.card[_ngcontent-%COMP%]   .card-body.loading[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 300px;\n}\n.card[_ngcontent-%COMP%]   .card-body.loading[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 2rem;\n  height: 2rem;\n  border: 2px solid #f3f3f3;\n  border-top: 2px solid #0d6efd;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n.report-summary[_ngcontent-%COMP%]   .col-xl-2[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.1s;\n}\n.report-summary[_ngcontent-%COMP%]   .col-xl-2[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.15s;\n}\n.report-summary[_ngcontent-%COMP%]   .col-xl-2[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.2s;\n}\n.report-summary[_ngcontent-%COMP%]   .col-xl-2[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 0.25s;\n}\n.report-summary[_ngcontent-%COMP%]   .col-xl-2[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 0.3s;\n}\n.report-summary[_ngcontent-%COMP%]   .col-xl-2[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 0.35s;\n}\n@media (max-width: 768px) {\n  .monthly-report-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .page-header[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 1rem;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .header-actions[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 0.5rem !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    white-space: nowrap;\n    font-size: 0.875rem;\n    padding: 0.5rem 1rem;\n  }\n  .avatar-circle[_ngcontent-%COMP%] {\n    width: 2rem;\n    height: 2rem;\n    font-size: 0.8rem;\n  }\n  .col-md-6[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n    margin-bottom: 1rem;\n  }\n  .col-md-3[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n  .col-md-4[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n    margin-bottom: 1rem;\n  }\n  .export-option-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n}\n@media (max-width: 576px) {\n  .monthly-report-container[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .col-md-3[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .header-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 0.5rem;\n  }\n  .attendance-rate-cell[_ngcontent-%COMP%] {\n    min-width: 100px;\n  }\n}\n@media print {\n  .monthly-report-container[_ngcontent-%COMP%] {\n    background: white;\n    padding: 1rem;\n  }\n  .btn[_ngcontent-%COMP%], \n   .header-actions[_ngcontent-%COMP%], \n   .export-section[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .card[_ngcontent-%COMP%] {\n    box-shadow: none;\n    border: 1px solid #000;\n    break-inside: avoid;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    color: #000;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    color: #000;\n  }\n}\n/*# sourceMappingURL=monthly-report.component.css.map */'] }));
var MonthlyReportComponent = _MonthlyReportComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MonthlyReportComponent, [{
    type: Component,
    args: [{ selector: "app-monthly-report", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      DataTableComponent,
      PageHeaderComponent,
      FilterPanelComponent,
      AttendanceChartComponent,
      AttendanceSummaryCardComponent,
      StatusBadgeComponent
    ], template: `<div class="container-fluid p-4">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="i18nService.t('attendance.monthly_report')">\r
  </app-page-header>\r
\r
  <div class="row mb-4">\r
    <div class="col-12">\r
      <div class="d-flex justify-content-end align-items-center">\r
        <div>\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary me-2"\r
            (click)="loadMonthlyReport()"\r
            [disabled]="loading()">\r
            <i class="fa-solid fa-refresh me-2" [class.fa-spin]="loading()"></i>{{ i18nService.t('app.refresh') }}\r
          </button>\r
          <button\r
            type="button"\r
            class="btn btn-outline-success me-2"\r
            (click)="exportToExcel()"\r
            [disabled]="exporting() || loading()">\r
            <i class="fa-solid fa-file-excel me-2" [class.fa-spin]="exporting()"></i>{{ i18nService.t('app.export_excel') }}\r
          </button>\r
          <button\r
            type="button"\r
            class="btn btn-outline-danger"\r
            (click)="exportToPDF()"\r
            [disabled]="exporting() || loading()">\r
            <i class="fa-solid fa-file-pdf me-2" [class.fa-spin]="exporting()"></i>{{ i18nService.t('app.export_pdf') }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <div class="spinner-border text-primary" role="status">\r
        <span class="visually-hidden">{{ i18nService.t('app.loading') }}</span>\r
      </div>\r
      <p class="mt-2 text-muted">{{ i18nService.t('attendance.messages.loading_monthly_report') }}</p>\r
    </div>\r
  }\r
\r
  <!-- Error State -->\r
  @if (error()) {\r
    <div class="alert alert-danger">\r
      <i class="fa-solid fa-exclamation-triangle"></i>\r
      {{ error() }}\r
    </div>\r
  }\r
\r
  <!-- Main Content -->\r
  @if (!loading() && !error()) {\r
    <div class="monthly-report-content">\r
\r
      <!-- Filters Panel -->\r
      <div class="filters-section mb-4">\r
        <div class="card">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-filter me-2"></i>\r
              {{ i18nService.t('attendance.filters.title') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <form [formGroup]="filterForm" class="row g-3">\r
              <!-- Month and Year Selection -->\r
              <div class="col-md-3">\r
                <label class="form-label">{{ i18nService.t('attendance.filters.month') }}</label>\r
                <select class="form-select" formControlName="month">\r
                  <option value="1">{{ i18nService.t('months.january') }}</option>\r
                  <option value="2">{{ i18nService.t('months.february') }}</option>\r
                  <option value="3">{{ i18nService.t('months.march') }}</option>\r
                  <option value="4">{{ i18nService.t('months.april') }}</option>\r
                  <option value="5">{{ i18nService.t('months.may') }}</option>\r
                  <option value="6">{{ i18nService.t('months.june') }}</option>\r
                  <option value="7">{{ i18nService.t('months.july') }}</option>\r
                  <option value="8">{{ i18nService.t('months.august') }}</option>\r
                  <option value="9">{{ i18nService.t('months.september') }}</option>\r
                  <option value="10">{{ i18nService.t('months.october') }}</option>\r
                  <option value="11">{{ i18nService.t('months.november') }}</option>\r
                  <option value="12">{{ i18nService.t('months.december') }}</option>\r
                </select>\r
              </div>\r
\r
              <div class="col-md-3">\r
                <label class="form-label">{{ i18nService.t('attendance.filters.year') }}</label>\r
                <select class="form-select" formControlName="year">\r
                  <option value="2024">2024</option>\r
                  <option value="2025">2025</option>\r
                  <option value="2026">2026</option>\r
                </select>\r
              </div>\r
\r
              <!-- Filter Actions -->\r
              <div class="col-md-6 d-flex align-items-end">\r
                <button\r
                  type="button"\r
                  class="btn btn-primary me-2"\r
                  (click)="generateReport()"\r
                  [disabled]="loading()">\r
                  <i class="fa-solid fa-chart-bar me-1"></i>\r
                  {{ i18nService.t('attendance.actions.generate_report') }}\r
                </button>\r
                <button\r
                  type="button"\r
                  class="btn btn-outline-secondary"\r
                  (click)="filterForm.reset()"\r
                  [disabled]="loading()">\r
                  <i class="fa-solid fa-times me-1"></i>\r
                  {{ i18nService.t('app.reset') }}\r
                </button>\r
              </div>\r
            </form>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Report Summary -->\r
      @if (summaryStats()) {\r
        <div class="report-summary mb-4">\r
          <div class="d-flex justify-content-between align-items-center mb-3">\r
            <h4 class="section-title">\r
              <i class="fa-solid fa-chart-line me-2"></i>\r
              {{ i18nService.t('attendance.monthly_summary') }}\r
              - {{ getMonthName(currentFilters().month) }} {{ currentFilters().year }}\r
            </h4>\r
          </div>\r
\r
          <!-- Summary Cards -->\r
          <div class="row mb-4">\r
            @for (card of summaryCards(); track card.title) {\r
              <div class="col-xl-2 col-lg-4 col-md-6 mb-3">\r
                <app-attendance-summary-card\r
                  [data]="card"\r
                  [loading]="loading()"\r
                  [showProgress]="!!card.percentage"\r
                  [clickable]="false">\r
                </app-attendance-summary-card>\r
              </div>\r
            }\r
          </div>\r
\r
          <!-- Charts Section -->\r
          <div class="row mb-4">\r
            <!-- Monthly Overview Chart -->\r
            <div class="col-lg-6 mb-4">\r
              <div class="card h-100">\r
                <div class="card-header d-flex justify-content-between align-items-center">\r
                  <h5 class="mb-0">\r
                    <i class="fa-solid fa-chart-pie text-primary me-2"></i>\r
                    {{ i18nService.t('attendance.charts.monthly_overview') }}\r
                  </h5>\r
                  <app-status-badge\r
                    [label]="getMonthName(currentFilters().month)"\r
                    [variant]="'primary'"\r
                    [showIcon]="false">\r
                  </app-status-badge>\r
                </div>\r
                <div class="card-body">\r
                  <p class="text-muted small mb-3">\r
                    <i class="fa-solid fa-info-circle me-1"></i>\r
                    {{ i18nService.t('attendance.chart.descriptions.monthly_overview') }}\r
                  </p>\r
                  <app-attendance-chart\r
                    chartType="doughnut"\r
                    [data]="attendanceOverviewChart()"\r
                    [loading]="loading()"\r
                    [height]="300">\r
                  </app-attendance-chart>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Overtime Trend Chart -->\r
            <div class="col-lg-6 mb-4">\r
              <div class="card h-100">\r
                <div class="card-header d-flex justify-content-between align-items-center">\r
                  <h5 class="mb-0">\r
                    <i class="fa-solid fa-chart-line text-info me-2"></i>\r
                    {{ i18nService.t('attendance.charts.overtime_trend') }}\r
                  </h5>\r
                  <app-status-badge\r
                    [label]="i18nService.t('attendance.dashboard.daily')"\r
                    [variant]="'info'"\r
                    [showIcon]="false">\r
                  </app-status-badge>\r
                </div>\r
                <div class="card-body">\r
                  <p class="text-muted small mb-3">\r
                    <i class="fa-solid fa-info-circle me-1"></i>\r
                    {{ i18nService.t('attendance.chart.descriptions.overtime_trend') }}\r
                  </p>\r
                  <app-attendance-chart\r
                    chartType="line"\r
                    [data]="overtimeTrendChart()"\r
                    [loading]="loading()"\r
                    [height]="300">\r
                  </app-attendance-chart>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Employee Records Table -->\r
      <div class="employee-records-section">\r
        <div class="card">\r
          <div class="card-header">\r
            <div class="d-flex justify-content-between align-items-center">\r
              <h5 class="mb-0">\r
                <i class="fa-solid fa-table me-2"></i>\r
                {{ i18nService.t('attendance.employee_records') }}\r
              </h5>\r
              <app-status-badge\r
                [label]="reportData().length + ' ' + i18nService.t('attendance.employees')"\r
                [variant]="'light'"\r
                [showIcon]="false">\r
              </app-status-badge>\r
            </div>\r
          </div>\r
          <div class="card-body p-0">\r
            <app-data-table\r
              [data]="reportData()"\r
              [columns]="tableColumns"\r
              [loading]="loading()"\r
              [searchable]="true"\r
              [sortable]="true"\r
              [paginated]="true"\r
              [pageSize]="10"\r
              [exportable]="true"\r
              (actionClick)="onTableAction($event)">\r
\r
              <ng-template #cellTemplate let-item let-column="column">\r
                @if (column.key === 'attendanceRate') {\r
                  <span [class]="getAttendanceRateClass(item.attendanceRate)">\r
                    {{ item.attendanceRate | number:'1.2-2' }}%\r
                  </span>\r
                } @else if (column.key === 'totalWorkingHours') {\r
                  {{ item.totalWorkingHours | number:'1.2-2' }}\r
                } @else if (column.key === 'totalOvertimeHours') {\r
                  {{ item.totalOvertimeHours | number:'1.2-2' }}\r
                } @else {\r
                  {{ item[column.key] }}\r
                }\r
              </ng-template>\r
            </app-data-table>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Export Options -->\r
      <div class="mt-4">\r
        <div class="card">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-download me-2"></i>\r
              {{ i18nService.t('attendance.export_options') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="row">\r
              <div class="col-md-4">\r
                <div class="export-option-card">\r
                  <div class="export-icon text-success">\r
                    <i class="fa-solid fa-file-excel fa-2x"></i>\r
                  </div>\r
                  <h6>{{ i18nService.t('app.export_excel') }}</h6>\r
                  <p class="text-muted small">{{ i18nService.t('attendance.export.excel_description') }}</p>\r
                  <button\r
                    type="button"\r
                    class="btn btn-success btn-sm"\r
                    (click)="exportToExcel()"\r
                    [disabled]="exporting()">\r
                    <i class="fa-solid fa-download me-1"></i>\r
                    {{ i18nService.t('app.download') }}\r
                  </button>\r
                </div>\r
              </div>\r
\r
              <div class="col-md-4">\r
                <div class="export-option-card">\r
                  <div class="export-icon text-danger">\r
                    <i class="fa-solid fa-file-pdf fa-2x"></i>\r
                  </div>\r
                  <h6>{{ i18nService.t('app.export_pdf') }}</h6>\r
                  <p class="text-muted small">{{ i18nService.t('attendance.export.pdf_description') }}</p>\r
                  <button\r
                    type="button"\r
                    class="btn btn-danger btn-sm"\r
                    (click)="exportToPDF()"\r
                    [disabled]="exporting()">\r
                    <i class="fa-solid fa-download me-1"></i>\r
                    {{ i18nService.t('app.download') }}\r
                  </button>\r
                </div>\r
              </div>\r
\r
              <div class="col-md-4">\r
                <div class="export-option-card">\r
                  <div class="export-icon text-info">\r
                    <i class="fa-solid fa-envelope fa-2x"></i>\r
                  </div>\r
                  <h6>{{ i18nService.t('attendance.export.email_report') }}</h6>\r
                  <p class="text-muted small">{{ i18nService.t('attendance.export.email_description') }}</p>\r
                  <button\r
                    type="button"\r
                    class="btn btn-info btn-sm"\r
                    [disabled]="true">\r
                    <i class="fa-solid fa-envelope me-1"></i>\r
                    {{ i18nService.t('app.coming_soon') }}\r
                  </button>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
    </div>\r
  }\r
</div>`, styles: ['/* src/app/pages/attendance/monthly-report/monthly-report.component.css */\n.monthly-report-container {\n  padding: 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  min-height: 100vh;\n}\n.page-header {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  margin-bottom: 2rem;\n}\n.page-title {\n  font-size: 2.25rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin-bottom: 0.5rem;\n  letter-spacing: -0.025em;\n}\n.avatar-circle {\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #0d6efd 0%,\n      #6610f2 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.attendance-rate-cell {\n  min-width: 120px;\n}\n.working-hours-cell .fw-semibold {\n  font-size: 0.95rem;\n}\n.working-hours-cell small {\n  font-size: 0.8rem;\n}\n.export-option-card {\n  text-align: center;\n  padding: 1.5rem;\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  background: white;\n  transition: all 0.3s ease-in-out;\n  height: 100%;\n}\n.export-option-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-color: #0d6efd;\n}\n.export-icon {\n  margin-bottom: 1rem;\n}\n.export-option-card h6 {\n  font-weight: 600;\n  margin-bottom: 0.75rem;\n  color: #495057;\n}\n.export-option-card .text-muted {\n  margin-bottom: 1rem;\n  line-height: 1.4;\n}\n.export-option-card {\n  animation: slideInUp 0.6s ease-out;\n}\n.export-section .col-md-4:nth-child(1) .export-option-card {\n  animation-delay: 0.1s;\n}\n.export-section .col-md-4:nth-child(2) .export-option-card {\n  animation-delay: 0.2s;\n}\n.export-section .col-md-4:nth-child(3) .export-option-card {\n  animation-delay: 0.3s;\n}\n@keyframes slideInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.card .card-body.loading {\n  position: relative;\n  min-height: 300px;\n}\n.card .card-body.loading::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 2rem;\n  height: 2rem;\n  border: 2px solid #f3f3f3;\n  border-top: 2px solid #0d6efd;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  0% {\n    transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n.report-summary .col-xl-2:nth-child(1) {\n  animation-delay: 0.1s;\n}\n.report-summary .col-xl-2:nth-child(2) {\n  animation-delay: 0.15s;\n}\n.report-summary .col-xl-2:nth-child(3) {\n  animation-delay: 0.2s;\n}\n.report-summary .col-xl-2:nth-child(4) {\n  animation-delay: 0.25s;\n}\n.report-summary .col-xl-2:nth-child(5) {\n  animation-delay: 0.3s;\n}\n.report-summary .col-xl-2:nth-child(6) {\n  animation-delay: 0.35s;\n}\n@media (max-width: 768px) {\n  .monthly-report-container {\n    padding: 1rem;\n  }\n  .page-title {\n    font-size: 1.75rem;\n  }\n  .page-header {\n    padding: 1rem;\n  }\n  .page-header .d-flex {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 1rem;\n  }\n  .header-actions {\n    width: 100%;\n  }\n  .header-actions .d-flex {\n    flex-wrap: wrap;\n    gap: 0.5rem !important;\n  }\n  .btn {\n    white-space: nowrap;\n    font-size: 0.875rem;\n    padding: 0.5rem 1rem;\n  }\n  .avatar-circle {\n    width: 2rem;\n    height: 2rem;\n    font-size: 0.8rem;\n  }\n  .col-md-6 {\n    flex: 0 0 auto;\n    width: 100%;\n    margin-bottom: 1rem;\n  }\n  .col-md-3 {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n  .col-md-4 {\n    flex: 0 0 auto;\n    width: 100%;\n    margin-bottom: 1rem;\n  }\n  .export-option-card {\n    padding: 1rem;\n  }\n  .section-title {\n    font-size: 1.1rem;\n  }\n}\n@media (max-width: 576px) {\n  .monthly-report-container {\n    padding: 0.75rem;\n  }\n  .page-title {\n    font-size: 1.5rem;\n  }\n  .page-header {\n    padding: 0.75rem;\n  }\n  .col-md-3 {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .header-actions .btn {\n    width: 100%;\n    margin-bottom: 0.5rem;\n  }\n  .attendance-rate-cell {\n    min-width: 100px;\n  }\n}\n@media print {\n  .monthly-report-container {\n    background: white;\n    padding: 1rem;\n  }\n  .btn,\n  .header-actions,\n  .export-section {\n    display: none;\n  }\n  .card {\n    box-shadow: none;\n    border: 1px solid #000;\n    break-inside: avoid;\n  }\n  .page-title {\n    color: #000;\n  }\n  .section-title {\n    color: #000;\n  }\n}\n/*# sourceMappingURL=monthly-report.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: AttendanceService }, { type: I18nService }, { type: NotificationService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MonthlyReportComponent, { className: "MonthlyReportComponent", filePath: "src/app/pages/attendance/monthly-report/monthly-report.component.ts", lineNumber: 70 });
})();
export {
  MonthlyReportComponent
};
//# sourceMappingURL=chunk-QH7OXQHN.js.map
