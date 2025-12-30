import {
  AttendanceChartComponent,
  AttendanceSummaryCardComponent
} from "./chunk-I6UGWJFM.js";
import {
  AttendanceService
} from "./chunk-233LUQFN.js";
import "./chunk-5ZV3Z4IV.js";
import {
  AttendanceStatus
} from "./chunk-7XYWDBYG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-GSKH2KOG.js";
import {
  PageHeaderComponent
} from "./chunk-DKGFJHVQ.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  CommonModule,
  Component,
  DatePipe,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/attendance/attendance.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.title, "_forTrack0");
var _forTrack1 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack1");
function AttendanceComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "app-loading-spinner", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18nService.t("attendance.messages.loading_data"))("variant", "primary")("centered", true);
  }
}
__name(AttendanceComponent_Conditional_6_Template, "AttendanceComponent_Conditional_6_Template");
function AttendanceComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "i", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(AttendanceComponent_Conditional_7_Template, "AttendanceComponent_Conditional_7_Template");
function AttendanceComponent_Conditional_8_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "app-attendance-summary-card", 67);
    \u0275\u0275listener("cardClick", /* @__PURE__ */ __name(function AttendanceComponent_Conditional_8_For_3_Template_app_attendance_summary_card_cardClick_1_listener() {
      const card_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(card_r3.link ? ctx_r0.navigateToSection(card_r3.link) : null);
    }, "AttendanceComponent_Conditional_8_For_3_Template_app_attendance_summary_card_cardClick_1_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const card_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("data", card_r3)("loading", ctx_r0.loading())("showProgress", !!card_r3.percentage)("clickable", !!card_r3.link);
  }
}
__name(AttendanceComponent_Conditional_8_For_3_Template, "AttendanceComponent_Conditional_8_For_3_Template");
function AttendanceComponent_Conditional_8_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "i", 68);
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.dashboard.no_data_hint"));
  }
}
__name(AttendanceComponent_Conditional_8_Conditional_19_Template, "AttendanceComponent_Conditional_8_Conditional_19_Template");
function AttendanceComponent_Conditional_8_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275element(1, "i", 69);
    \u0275\u0275elementStart(2, "p", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.status_messages.all_records_complete"));
  }
}
__name(AttendanceComponent_Conditional_8_Conditional_45_Template, "AttendanceComponent_Conditional_8_Conditional_45_Template");
function AttendanceComponent_Conditional_8_Conditional_46_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "div")(2, "div", 32);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 33);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const record_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(record_r4.employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", record_r4.employeeNumber, " \u2022 ", \u0275\u0275pipeBind2(6, 6, record_r4.attendanceDate, "shortDate"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getStatusBadgeClass(record_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t(ctx_r0.getStatusText(record_r4.status)), " ");
  }
}
__name(AttendanceComponent_Conditional_8_Conditional_46_For_2_Template, "AttendanceComponent_Conditional_8_Conditional_46_For_2_Template");
function AttendanceComponent_Conditional_8_Conditional_46_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "a", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18nService.t("attendance.messages.view_all_more"), " (", ctx_r0.incompleteRecords().length - 5, ") ");
  }
}
__name(AttendanceComponent_Conditional_8_Conditional_46_Conditional_3_Template, "AttendanceComponent_Conditional_8_Conditional_46_Conditional_3_Template");
function AttendanceComponent_Conditional_8_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275repeaterCreate(1, AttendanceComponent_Conditional_8_Conditional_46_For_2_Template, 9, 9, "div", 70, _forTrack1);
    \u0275\u0275conditionalCreate(3, AttendanceComponent_Conditional_8_Conditional_46_Conditional_3_Template, 3, 2, "div", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.incompleteRecords().slice(0, 5));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.incompleteRecords().length > 5 ? 3 : -1);
  }
}
__name(AttendanceComponent_Conditional_8_Conditional_46_Template, "AttendanceComponent_Conditional_8_Conditional_46_Template");
function AttendanceComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 9);
    \u0275\u0275repeaterCreate(2, AttendanceComponent_Conditional_8_For_3_Template, 2, 4, "div", 10, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 9)(5, "div", 11)(6, "div", 12)(7, "div", 13)(8, "div", 14)(9, "h5", 15);
    \u0275\u0275element(10, "i", 16);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 17);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 18);
    \u0275\u0275element(15, "i", 19);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 20);
    \u0275\u0275element(18, "app-attendance-chart", 21);
    \u0275\u0275conditionalCreate(19, AttendanceComponent_Conditional_8_Conditional_19_Template, 4, 1, "div", 22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 11)(21, "div", 12)(22, "div", 13)(23, "div", 14)(24, "h5", 15);
    \u0275\u0275element(25, "i", 23);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 24);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "p", 18);
    \u0275\u0275element(30, "i", 19);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 20);
    \u0275\u0275element(33, "app-attendance-chart", 21);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(34, "div", 9)(35, "div", 11)(36, "div", 12)(37, "div", 13)(38, "div", 14)(39, "h5", 15);
    \u0275\u0275element(40, "i", 25);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 26);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 20);
    \u0275\u0275conditionalCreate(45, AttendanceComponent_Conditional_8_Conditional_45_Template, 4, 1, "div", 27);
    \u0275\u0275conditionalCreate(46, AttendanceComponent_Conditional_8_Conditional_46_Template, 4, 1, "div");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 11)(48, "div", 12)(49, "div", 13)(50, "h5", 15);
    \u0275\u0275element(51, "i", 28);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 20)(54, "div", 29)(55, "a", 30);
    \u0275\u0275element(56, "i", 31);
    \u0275\u0275elementStart(57, "div")(58, "div", 32);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "small", 33);
    \u0275\u0275text(61, "View today's attendance status");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(62, "a", 34);
    \u0275\u0275element(63, "i", 35);
    \u0275\u0275elementStart(64, "div")(65, "div", 32);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "small", 33);
    \u0275\u0275text(68, "Generate monthly attendance summaries");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "a", 36);
    \u0275\u0275element(70, "i", 37);
    \u0275\u0275elementStart(71, "div")(72, "div", 32);
    \u0275\u0275text(73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "small", 33);
    \u0275\u0275text(75, "View all check-in/out transactions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(76, "a", 38);
    \u0275\u0275element(77, "i", 39);
    \u0275\u0275elementStart(78, "div")(79, "div", 32);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "small", 33);
    \u0275\u0275text(82, "Generate detailed attendance reports");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(83, "a", 40);
    \u0275\u0275element(84, "i", 41);
    \u0275\u0275elementStart(85, "div")(86, "div", 32);
    \u0275\u0275text(87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "small", 33);
    \u0275\u0275text(89, "View attendance analytics and trends");
    \u0275\u0275elementEnd()()()()()()()();
    \u0275\u0275elementStart(90, "div", 42)(91, "div", 43)(92, "div", 44)(93, "div", 20)(94, "div", 45);
    \u0275\u0275element(95, "i", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "h4", 47);
    \u0275\u0275text(97);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "p", 48);
    \u0275\u0275text(99);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(100, "div", 43)(101, "div", 49)(102, "div", 20)(103, "div", 50);
    \u0275\u0275element(104, "i", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "h4", 52);
    \u0275\u0275text(106);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "p", 48);
    \u0275\u0275text(108);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(109, "div", 43)(110, "div", 53)(111, "div", 20)(112, "div", 54);
    \u0275\u0275element(113, "i", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(114, "h4", 56);
    \u0275\u0275text(115);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(116, "p", 48);
    \u0275\u0275text(117);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(118, "div", 43)(119, "div", 57)(120, "div", 20)(121, "div", 58);
    \u0275\u0275element(122, "i", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(123, "h4", 60);
    \u0275\u0275text(124);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(125, "p", 48);
    \u0275\u0275text(126);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(127, "div", 61);
    \u0275\u0275element(128, "div", 62);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(129, "div", 63)(130, "span", 64);
    \u0275\u0275element(131, "i", 65);
    \u0275\u0275text(132);
    \u0275\u0275elementStart(133, "small", 66);
    \u0275\u0275text(134);
    \u0275\u0275pipe(135, "date");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_27_0;
    let tmp_29_0;
    let tmp_31_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.summaryCards());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.dashboard.todays_distribution"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.dashboard.today"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.chart.descriptions.todays_distribution"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("type", "doughnut")("data", ctx_r0.attendanceChartData())("loading", ctx_r0.loading())("height", 300);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.loading() && ctx_r0.hasNoAttendanceData() ? 19 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.dashboard.weekly_trend"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.dashboard.last_7_days"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.chart.descriptions.weekly_trend"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("type", "line")("data", ctx_r0.weeklyTrendData())("loading", ctx_r0.loading())("height", 300);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.dashboard.incomplete_records"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.incompleteRecords().length);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.incompleteRecords().length === 0 ? 45 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.incompleteRecords().length > 0 ? 46 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("dashboard.quick_actions"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.daily_view"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.monthly_report"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.transactions_report"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.actions.generate_report"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.statistics.menu"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.formatDuration(((tmp_27_0 = ctx_r0.todayStats()) == null ? null : tmp_27_0.averageWorkingHours) || 0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.statistics.average_working_hours"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.formatDuration(((tmp_29_0 = ctx_r0.todayStats()) == null ? null : tmp_29_0.totalOvertimeHours) || 0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.statistics.total_overtime_hours"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(((tmp_31_0 = ctx_r0.todayStats()) == null ? null : tmp_31_0.overtimeEmployees) || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.statistics.overtime_employees"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r0.getAttendanceRatePercentage(), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18nService.t("attendance.statistics.attendance_rate"));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.getAttendanceRatePercentage(), "%");
    \u0275\u0275attribute("aria-valuenow", ctx_r0.getAttendanceRatePercentage());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18nService.t("attendance.dashboard.live_updates"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.i18nService.t("attendance.dashboard.last_updated"), ": ", \u0275\u0275pipeBind2(135, 39, ctx_r0.currentDate(), "short"));
  }
}
__name(AttendanceComponent_Conditional_8_Template, "AttendanceComponent_Conditional_8_Template");
var _AttendanceComponent = class _AttendanceComponent {
  attendanceService;
  i18nService;
  notificationService;
  // Signals for reactive state management
  dashboardData = signal(null, ...ngDevMode ? [{ debugName: "dashboardData" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  currentDate = signal(/* @__PURE__ */ new Date(), ...ngDevMode ? [{ debugName: "currentDate" }] : []);
  // Computed values
  todayStats = computed(() => this.dashboardData()?.todayStats, ...ngDevMode ? [{ debugName: "todayStats" }] : []);
  incompleteRecords = computed(() => this.dashboardData()?.incompleteRecords || [], ...ngDevMode ? [{ debugName: "incompleteRecords" }] : []);
  recentTransactions = computed(() => this.dashboardData()?.recentTransactions || [], ...ngDevMode ? [{ debugName: "recentTransactions" }] : []);
  // Chart data computed properties
  attendanceChartData = computed(() => {
    const stats = this.todayStats();
    if (!stats) {
      console.log("\u{1F534} No stats for attendance chart");
      return { labels: [], datasets: [] };
    }
    const chartData = {
      labels: ["Present", "Absent", "Late", "Overtime"],
      datasets: [{
        label: "Today's Attendance",
        data: [stats.presentEmployees, stats.absentEmployees, stats.lateEmployees, stats.overtimeEmployees],
        backgroundColor: ["#198754", "#dc3545", "#ffc107", "#0d6efd"],
        borderWidth: 2
      }]
    };
    console.log("\u{1F4CA} Attendance Chart Data:", chartData);
    return chartData;
  }, ...ngDevMode ? [{ debugName: "attendanceChartData" }] : []);
  weeklyTrendData = computed(() => {
    const weeklyTrend = this.dashboardData()?.weeklyTrend || [];
    if (weeklyTrend.length === 0) {
      console.log("\u{1F534} No weekly trend data");
      return { labels: [], datasets: [] };
    }
    const chartData = {
      labels: weeklyTrend.map((d) => this.formatDateLabel(d.date)),
      datasets: [
        {
          label: "Present",
          data: weeklyTrend.map((d) => d.presentEmployees),
          backgroundColor: "#198754",
          borderColor: "#198754",
          borderWidth: 2,
          fill: false
        },
        {
          label: "Absent",
          data: weeklyTrend.map((d) => d.absentEmployees),
          backgroundColor: "#dc3545",
          borderColor: "#dc3545",
          borderWidth: 2,
          fill: false
        }
      ]
    };
    console.log("\u{1F4C8} Weekly Trend Chart Data:", chartData);
    return chartData;
  }, ...ngDevMode ? [{ debugName: "weeklyTrendData" }] : []);
  // Summary card data
  summaryCards = computed(() => {
    const stats = this.todayStats();
    if (!stats)
      return [];
    return [
      {
        title: "Total Employees",
        value: stats.totalEmployees,
        icon: "fa-users",
        color: "primary",
        link: "/employees",
        actionLabel: "View All"
      },
      {
        title: "Present Today",
        value: stats.presentEmployees,
        icon: "fa-user-check",
        color: "success",
        percentage: stats.totalEmployees > 0 ? stats.presentEmployees / stats.totalEmployees * 100 : 0,
        trend: {
          value: 5.2,
          isPositive: true,
          label: "vs yesterday"
        }
      },
      {
        title: "Absent Today",
        value: stats.absentEmployees,
        icon: "fa-user-times",
        color: "danger",
        percentage: stats.totalEmployees > 0 ? stats.absentEmployees / stats.totalEmployees * 100 : 0,
        trend: {
          value: 2.1,
          isPositive: false,
          label: "vs yesterday"
        }
      },
      {
        title: "Late Arrivals",
        value: stats.lateEmployees,
        icon: "fa-clock",
        color: "warning",
        link: "/attendance/reports?status=late",
        actionLabel: "View Details"
      },
      {
        title: "Overtime Workers",
        value: stats.overtimeEmployees,
        icon: "fa-business-time",
        color: "info",
        subtitle: `${this.formatDuration(stats.totalOvertimeHours)} total`
      },
      {
        title: "Attendance Rate",
        value: `${Math.round(stats.attendanceRate)}%`,
        icon: "fa-percentage",
        color: stats.attendanceRate >= 90 ? "success" : stats.attendanceRate >= 80 ? "warning" : "danger",
        trend: {
          value: 1.8,
          isPositive: true,
          label: "this month"
        }
      }
    ];
  }, ...ngDevMode ? [{ debugName: "summaryCards" }] : []);
  // Status breakdown computed values
  statusBreakdown = computed(() => {
    const stats = this.todayStats();
    if (!stats)
      return this.getEmptyStatusBreakdown();
    return {
      present: stats.presentEmployees || 0,
      absent: stats.absentEmployees || 0,
      late: stats.lateEmployees || 0,
      earlyLeave: 0,
      // Not available in current API
      onLeave: 0,
      // Not available in current API
      dayOff: 0,
      // Not available in current API
      overtime: stats.overtimeEmployees || 0,
      incomplete: 0,
      // Not available in current API
      holiday: 0,
      // Not available in current API
      sickLeave: 0,
      // Not available in current API
      pending: 0
      // Not available in current API
    };
  }, ...ngDevMode ? [{ debugName: "statusBreakdown" }] : []);
  // Constants for template
  AttendanceStatus = AttendanceStatus;
  constructor(attendanceService, i18nService, notificationService) {
    this.attendanceService = attendanceService;
    this.i18nService = i18nService;
    this.notificationService = notificationService;
  }
  ngOnInit() {
    this.loadDashboardData();
  }
  /**
   * Load dashboard data including today's statistics and recent activity
   */
  loadDashboardData() {
    this.loading.set(true);
    this.error.set(null);
    this.attendanceService.getDashboardData().subscribe({
      next: /* @__PURE__ */ __name((data) => {
        console.log("\u{1F4CA} Dashboard Data Received:", data);
        console.log("\u{1F4C8} Weekly Trend:", data.weeklyTrend);
        console.log("\u26A0\uFE0F Incomplete Records:", data.incompleteRecords);
        console.log("\u{1F4C5} Today Stats:", data.todayStats);
        this.dashboardData.set(data);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading dashboard data:", error);
        this.error.set("Failed to load dashboard data");
        this.loading.set(false);
        this.notificationService.error("Failed to load attendance dashboard");
      }, "error")
    });
  }
  /**
   * Format date label for charts
   */
  formatDateLabel(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  /**
   * Navigate to specific section with parameters
   */
  navigateToSection(link) {
  }
  /**
   * Get status badge class for attendance status
   */
  getStatusBadgeClass(status) {
    switch (status) {
      case AttendanceStatus.Present:
        return "badge bg-success";
      case AttendanceStatus.Absent:
        return "badge bg-danger";
      case AttendanceStatus.Late:
        return "badge bg-warning";
      case AttendanceStatus.EarlyLeave:
        return "badge bg-warning";
      case AttendanceStatus.OnLeave:
        return "badge bg-info";
      case AttendanceStatus.DayOff:
        return "badge bg-secondary";
      case AttendanceStatus.Overtime:
        return "badge bg-primary";
      case AttendanceStatus.Incomplete:
        return "badge bg-danger";
      case AttendanceStatus.Holiday:
        return "badge bg-secondary";
      case AttendanceStatus.SickLeave:
        return "badge bg-warning";
      default:
        return "badge bg-secondary";
    }
  }
  /**
   * Get status text translation key
   */
  getStatusText(status) {
    return `attendance.status.${status.toString().toLowerCase()}`;
  }
  /**
   * Format time duration in hours and minutes
   */
  formatDuration(hours) {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (wholeHours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${wholeHours}h`;
    } else {
      return `${wholeHours}h ${minutes}m`;
    }
  }
  /**
   * Calculate attendance rate percentage
   */
  getAttendanceRatePercentage() {
    const stats = this.todayStats();
    if (!stats || stats.totalEmployees === 0) {
      return 0;
    }
    return Math.round(stats.presentEmployees / stats.totalEmployees * 100);
  }
  /**
   * Refresh dashboard data
   */
  refresh() {
    this.loadDashboardData();
  }
  /**
   * Navigate to view more details for a specific section
   */
  viewIncompleteRecords() {
  }
  viewAllReports() {
  }
  /**
   * Get empty status breakdown for initialization
   */
  getEmptyStatusBreakdown() {
    return {
      present: 0,
      absent: 0,
      late: 0,
      earlyLeave: 0,
      onLeave: 0,
      dayOff: 0,
      overtime: 0,
      incomplete: 0,
      holiday: 0,
      sickLeave: 0,
      pending: 0
    };
  }
  /**
   * Get status configuration for display
   */
  getStatusConfig(status) {
    const configs = {
      present: {
        icon: "fa-user-check",
        color: "success",
        bgColor: "bg-success",
        translation: "attendance.status.present"
      },
      absent: {
        icon: "fa-user-times",
        color: "danger",
        bgColor: "bg-danger",
        translation: "attendance.status.absent"
      },
      late: {
        icon: "fa-clock",
        color: "warning",
        bgColor: "bg-warning",
        translation: "attendance.status.late"
      },
      earlyLeave: {
        icon: "fa-door-open",
        color: "warning",
        bgColor: "bg-warning",
        translation: "attendance.status.earlyleave"
      },
      onLeave: {
        icon: "fa-calendar-times",
        color: "info",
        bgColor: "bg-info",
        translation: "attendance.status.onleave"
      },
      dayOff: {
        icon: "fa-calendar-minus",
        color: "secondary",
        bgColor: "bg-secondary",
        translation: "attendance.status.dayoff"
      },
      overtime: {
        icon: "fa-business-time",
        color: "primary",
        bgColor: "bg-primary",
        translation: "attendance.status.overtime"
      },
      incomplete: {
        icon: "fa-exclamation-triangle",
        color: "danger",
        bgColor: "bg-danger",
        translation: "attendance.status.incomplete"
      },
      holiday: {
        icon: "fa-calendar-star",
        color: "secondary",
        bgColor: "bg-secondary",
        translation: "attendance.status.holiday"
      },
      sickLeave: {
        icon: "fa-thermometer-half",
        color: "warning",
        bgColor: "bg-warning",
        translation: "attendance.status.sickleave"
      },
      pending: {
        icon: "fa-hourglass-half",
        color: "muted",
        bgColor: "bg-secondary",
        translation: "attendance.status.pending"
      }
    };
    return configs[status] || configs.pending;
  }
  /**
   * Get all status entries for template iteration
   */
  getStatusEntries() {
    const breakdown = this.statusBreakdown();
    return Object.entries(breakdown).map(([key, value]) => ({
      key,
      value,
      config: this.getStatusConfig(key)
    }));
  }
  /**
   * Check if there's no attendance data
   */
  hasNoAttendanceData() {
    const chartData = this.attendanceChartData();
    if (!chartData.datasets || chartData.datasets.length === 0) {
      return true;
    }
    const data = chartData.datasets[0]?.data || [];
    return data.every((v) => v === 0);
  }
};
__name(_AttendanceComponent, "AttendanceComponent");
__publicField(_AttendanceComponent, "\u0275fac", /* @__PURE__ */ __name(function AttendanceComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AttendanceComponent)(\u0275\u0275directiveInject(AttendanceService), \u0275\u0275directiveInject(I18nService), \u0275\u0275directiveInject(NotificationService));
}, "AttendanceComponent_Factory"));
__publicField(_AttendanceComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttendanceComponent, selectors: [["app-attendance"]], decls: 9, vars: 8, consts: [[1, "container-fluid", "p-4"], [3, "title"], [1, "d-flex", "justify-content-end", "mb-4"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "disabled"], [1, "fa-solid", "fa-refresh", "me-2"], [1, "text-center", "py-5"], [1, "alert", "alert-danger"], [3, "message", "variant", "centered"], [1, "fa-solid", "fa-exclamation-triangle"], [1, "row", "mb-4"], [1, "col-12", "col-sm-6", "col-md-4", "col-lg-3", "col-xl-2", "mb-3"], [1, "col-12", "col-lg-6", "mb-4"], [1, "card", "h-100"], [1, "card-header"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "mb-0"], [1, "fa-solid", "fa-chart-pie", "text-primary", "me-2"], [1, "badge", "bg-primary"], [1, "mb-0", "mt-2", "text-muted", "small"], [1, "fa-solid", "fa-info-circle", "me-1"], [1, "card-body"], [3, "type", "data", "loading", "height"], [1, "alert", "alert-info", "mt-3"], [1, "fa-solid", "fa-chart-line", "text-info", "me-2"], [1, "badge", "bg-info"], [1, "fa-solid", "fa-exclamation-triangle", "text-warning", "me-2"], [1, "badge", "bg-warning"], [1, "text-center", "py-4"], [1, "fa-solid", "fa-bolt", "text-primary", "me-2"], [1, "d-grid", "gap-3"], ["routerLink", "/attendance/daily", 1, "btn", "btn-outline-primary", "text-start"], [1, "fa-solid", "fa-calendar-day", "me-3"], [1, "fw-semibold"], [1, "text-muted"], ["routerLink", "/attendance/monthly-report", 1, "btn", "btn-outline-success", "text-start"], [1, "fa-solid", "fa-calendar-alt", "me-3"], ["routerLink", "/attendance/transactions", 1, "btn", "btn-outline-info", "text-start"], [1, "fa-solid", "fa-clock-rotate-left", "me-3"], ["routerLink", "/attendance/reports", 1, "btn", "btn-outline-warning", "text-start"], [1, "fa-solid", "fa-file-alt", "me-3"], ["routerLink", "/attendance/statistics", 1, "btn", "btn-outline-secondary", "text-start"], [1, "fa-solid", "fa-chart-bar", "me-3"], [1, "row"], [1, "col-12", "col-sm-6", "col-lg-3", "mb-4"], [1, "card", "text-center", "border-start", "border-primary", "border-4"], [1, "icon-circle", "bg-primary", "bg-opacity-10", "mx-auto", "mb-3"], [1, "fa-solid", "fa-clock", "fa-2x", "text-primary"], [1, "text-primary"], [1, "text-muted", "small", "mb-0"], [1, "card", "text-center", "border-start", "border-info", "border-4"], [1, "icon-circle", "bg-info", "bg-opacity-10", "mx-auto", "mb-3"], [1, "fa-solid", "fa-business-time", "fa-2x", "text-info"], [1, "text-info"], [1, "card", "text-center", "border-start", "border-warning", "border-4"], [1, "icon-circle", "bg-warning", "bg-opacity-10", "mx-auto", "mb-3"], [1, "fa-solid", "fa-user-clock", "fa-2x", "text-warning"], [1, "text-warning"], [1, "card", "text-center", "border-start", "border-success", "border-4"], [1, "icon-circle", "bg-success", "bg-opacity-10", "mx-auto", "mb-3"], [1, "fa-solid", "fa-percentage", "fa-2x", "text-success"], [1, "text-success"], [1, "progress", "mt-2", 2, "height", "6px"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-bar", "bg-success"], [1, "text-center", "mt-4"], [1, "badge", "bg-light", "text-dark"], [1, "fa-solid", "fa-circle", "text-success", "me-2", 2, "font-size", "0.5rem"], [1, "ms-2", "text-muted"], [3, "cardClick", "data", "loading", "showProgress", "clickable"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "fa-solid", "fa-check-circle", "text-success", "fa-3x", "mb-3"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3", "p-2", "border", "rounded"], [1, "text-center"], ["routerLink", "/attendance/reports", 1, "btn", "btn-outline-primary", "btn-sm"]], template: /* @__PURE__ */ __name(function AttendanceComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "button", 3);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AttendanceComponent_Template_button_click_3_listener() {
      return ctx.refresh();
    }, "AttendanceComponent_Template_button_click_3_listener"));
    \u0275\u0275element(4, "i", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, AttendanceComponent_Conditional_6_Template, 2, 3, "div", 5);
    \u0275\u0275conditionalCreate(7, AttendanceComponent_Conditional_7_Template, 3, 1, "div", 6);
    \u0275\u0275conditionalCreate(8, AttendanceComponent_Conditional_8_Template, 136, 42, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18nService.t("attendance.dashboard_title"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-spin", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx.i18nService.t("app.refresh"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 8 : -1);
  }
}, "AttendanceComponent_Template"), dependencies: [CommonModule, RouterModule, RouterLink, AttendanceChartComponent, AttendanceSummaryCardComponent, PageHeaderComponent, LoadingSpinnerComponent, DatePipe], styles: ["\n\n.attendance-dashboard[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  min-height: 100vh;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 2.25rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin-bottom: 0.5rem;\n  letter-spacing: -0.025em;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n  font-size: 1rem;\n}\n.d-flex.justify-content-between.align-items-center.mb-4[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  margin-bottom: 2rem;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  font-weight: 500;\n  padding: 0.625rem 1.25rem;\n  transition: all 0.2s ease-in-out;\n  border-width: 1px;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.btn[_ngcontent-%COMP%]   .fa-spin[_ngcontent-%COMP%] {\n  animation: fa-spin 2s infinite linear;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n  color: #0d6efd;\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  border: none;\n  font-weight: 500;\n  padding: 1rem 1.25rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.dashboard-content[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.row[_ngcontent-%COMP%]   .col-xl-2[_ngcontent-%COMP%], \n.row[_ngcontent-%COMP%]   .col-lg-4[_ngcontent-%COMP%], \n.row[_ngcontent-%COMP%]   .col-md-6[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.card[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n  border-radius: 0.75rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease-in-out;\n  background: white;\n  overflow: hidden;\n}\n.card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n.card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border-bottom: 1px solid #e9ecef;\n  padding: 1.25rem 1.5rem;\n  border-radius: 0.75rem 0.75rem 0 0;\n}\n.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 1.1rem;\n  margin: 0;\n  color: #495057;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.5em 0.75em;\n  border-radius: 0.375rem;\n  font-weight: 600;\n  letter-spacing: 0.025em;\n}\n.badge.bg-primary[_ngcontent-%COMP%] {\n  background-color: #0d6efd !important;\n}\n.badge.bg-info[_ngcontent-%COMP%] {\n  background-color: #0dcaf0 !important;\n  color: #000;\n}\n.badge.bg-warning[_ngcontent-%COMP%] {\n  background-color: #fd7e14 !important;\n  color: white;\n}\n.badge.bg-success[_ngcontent-%COMP%] {\n  background-color: #198754 !important;\n}\n.badge.bg-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n}\n.badge.bg-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n}\n.border.rounded[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef !important;\n  border-radius: 0.5rem !important;\n  transition: all 0.2s ease-in-out;\n}\n.border.rounded[_ngcontent-%COMP%]:hover {\n  border-color: #0d6efd !important;\n  background-color: #f8f9fa;\n}\n.fw-semibold[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.d-grid.gap-3[_ngcontent-%COMP%] {\n  gap: 1rem !important;\n}\n.btn.text-start[_ngcontent-%COMP%] {\n  text-align: left !important;\n  padding: 1rem 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.btn.text-start[_ngcontent-%COMP%]   .fw-semibold[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  margin-bottom: 0.25rem;\n}\n.btn.text-start[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  opacity: 0.8;\n  line-height: 1.3;\n}\n.btn.btn-outline-primary.text-start[_ngcontent-%COMP%]:hover {\n  background-color: rgba(13, 110, 253, 0.1);\n  border-color: #0d6efd;\n  color: #0d6efd;\n}\n.btn.btn-outline-success.text-start[_ngcontent-%COMP%]:hover {\n  background-color: rgba(25, 135, 84, 0.1);\n  border-color: #198754;\n  color: #198754;\n}\n.btn.btn-outline-info.text-start[_ngcontent-%COMP%]:hover {\n  background-color: rgba(13, 202, 240, 0.1);\n  border-color: #0dcaf0;\n  color: #0dcaf0;\n}\n.btn.btn-outline-warning.text-start[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 193, 7, 0.1);\n  border-color: #ffc107;\n  color: #ffc107;\n}\n.btn.btn-outline-secondary.text-start[_ngcontent-%COMP%]:hover {\n  background-color: rgba(108, 117, 125, 0.1);\n  border-color: #6c757d;\n  color: #6c757d;\n}\n.border-start.border-4[_ngcontent-%COMP%] {\n  border-left-width: 4px !important;\n}\n.border-primary[_ngcontent-%COMP%] {\n  border-color: #0d6efd !important;\n}\n.border-info[_ngcontent-%COMP%] {\n  border-color: #0dcaf0 !important;\n}\n.border-warning[_ngcontent-%COMP%] {\n  border-color: #fd7e14 !important;\n}\n.border-success[_ngcontent-%COMP%] {\n  border-color: #198754 !important;\n}\n.icon-circle[_ngcontent-%COMP%] {\n  width: 4rem;\n  height: 4rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  transition: transform 0.3s ease-in-out;\n}\n.card[_ngcontent-%COMP%]:hover   .icon-circle[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.bg-primary.bg-opacity-10[_ngcontent-%COMP%] {\n  background-color: rgba(13, 110, 253, 0.1) !important;\n}\n.bg-info.bg-opacity-10[_ngcontent-%COMP%] {\n  background-color: rgba(13, 202, 240, 0.1) !important;\n}\n.bg-warning.bg-opacity-10[_ngcontent-%COMP%] {\n  background-color: rgba(253, 126, 20, 0.1) !important;\n}\n.bg-success.bg-opacity-10[_ngcontent-%COMP%] {\n  background-color: rgba(25, 135, 84, 0.1) !important;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: #0d6efd !important;\n}\n.text-info[_ngcontent-%COMP%] {\n  color: #0dcaf0 !important;\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #fd7e14 !important;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #198754 !important;\n}\n.col-lg-3[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideInUp 0.6s ease-out;\n}\n.col-lg-3[_ngcontent-%COMP%]:nth-child(1)   .card[_ngcontent-%COMP%] {\n  animation-delay: 0.1s;\n}\n.col-lg-3[_ngcontent-%COMP%]:nth-child(2)   .card[_ngcontent-%COMP%] {\n  animation-delay: 0.2s;\n}\n.col-lg-3[_ngcontent-%COMP%]:nth-child(3)   .card[_ngcontent-%COMP%] {\n  animation-delay: 0.3s;\n}\n.col-lg-3[_ngcontent-%COMP%]:nth-child(4)   .card[_ngcontent-%COMP%] {\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_slideInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.progress[_ngcontent-%COMP%] {\n  background-color: #e9ecef;\n  border-radius: 0.375rem;\n  overflow: hidden;\n  height: 6px;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  transition: width 0.8s ease;\n}\n.progress-bar.bg-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #198754 0%,\n      #20c997 100%);\n}\n.badge.bg-light[_ngcontent-%COMP%] {\n  background-color: #f8f9fa !important;\n  color: #495057 !important;\n  font-size: 0.9rem;\n  padding: 0.75rem 1.5rem;\n  border-radius: 2rem;\n  border: 1px solid #e9ecef;\n}\n.fa-circle.text-success[_ngcontent-%COMP%] {\n  color: #198754 !important;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  position: relative;\n}\n.text-center.py-4[_ngcontent-%COMP%]   .fa-check-circle[_ngcontent-%COMP%] {\n  color: #198754;\n  margin-bottom: 1rem;\n}\n@media (max-width: 1200px) {\n  .col-xl-2[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 20%;\n  }\n}\n@media (max-width: 992px) {\n  .col-lg-4[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 33.333333%;\n  }\n  .col-lg-6[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n  .col-lg-3[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n}\n@media (max-width: 768px) {\n  .attendance-dashboard[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n  .d-flex.justify-content-between.align-items-center.mb-4[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 1rem;\n    padding: 1rem;\n  }\n  .d-flex.gap-2[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-wrap: wrap;\n    gap: 0.5rem !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    white-space: nowrap;\n    font-size: 0.875rem;\n    padding: 0.5rem 1rem;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .icon-circle[_ngcontent-%COMP%] {\n    width: 3rem;\n    height: 3rem;\n    font-size: 1.25rem;\n  }\n  .col-md-6[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n    margin-bottom: 1rem;\n  }\n  .col-lg-3[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n  .btn.text-start[_ngcontent-%COMP%] {\n    padding: 0.875rem 1rem;\n    gap: 0.75rem;\n  }\n  .btn.text-start[_ngcontent-%COMP%]   .fw-semibold[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .btn.text-start[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n}\n@media (max-width: 576px) {\n  .col-lg-3[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .col-xl-2[_ngcontent-%COMP%], \n   .col-lg-4[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .attendance-dashboard[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .d-flex.justify-content-between.align-items-center.mb-4[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n}\n.btn[_ngcontent-%COMP%]:focus, \n.card[_ngcontent-%COMP%]:focus-within {\n  outline: 2px solid #0d6efd;\n  outline-offset: 2px;\n}\n@media print {\n  .attendance-dashboard[_ngcontent-%COMP%] {\n    background: white;\n    padding: 1rem;\n  }\n  .btn[_ngcontent-%COMP%], \n   .badge.bg-light[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .card[_ngcontent-%COMP%] {\n    box-shadow: none;\n    border: 1px solid #000;\n    break-inside: avoid;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    color: #000;\n  }\n}\n/*# sourceMappingURL=attendance.component.css.map */"] }));
var AttendanceComponent = _AttendanceComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttendanceComponent, [{
    type: Component,
    args: [{ selector: "app-attendance", standalone: true, imports: [CommonModule, RouterModule, AttendanceChartComponent, AttendanceSummaryCardComponent, PageHeaderComponent, LoadingSpinnerComponent], template: `<div class="container-fluid p-4">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="i18nService.t('attendance.dashboard_title')">\r
  </app-page-header>\r
\r
  <!-- Controls -->\r
  <div class="d-flex justify-content-end mb-4">\r
    <button\r
      type="button"\r
      class="btn btn-outline-primary"\r
      (click)="refresh()"\r
      [disabled]="loading()">\r
      <i class="fa-solid fa-refresh me-2" [class.fa-spin]="loading()"></i>{{ i18nService.t('app.refresh') }}\r
    </button>\r
  </div>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <app-loading-spinner\r
        [message]="i18nService.t('attendance.messages.loading_data')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
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
  <!-- Dashboard Content -->\r
  @if (!loading() && !error()) {\r
    <div>\r
\r
    <!-- Summary Cards Row -->\r
    <div class="row mb-4">\r
      @for (card of summaryCards(); track card.title) {\r
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">\r
          <app-attendance-summary-card\r
            [data]="card"\r
            [loading]="loading()"\r
            [showProgress]="!!card.percentage"\r
            [clickable]="!!card.link"\r
            (cardClick)="card.link ? navigateToSection(card.link) : null">\r
          </app-attendance-summary-card>\r
        </div>\r
      }\r
    </div>\r
\r
    <!-- Charts and Analytics Row -->\r
    <div class="row mb-4">\r
      <!-- Today's Attendance Distribution -->\r
      <div class="col-12 col-lg-6 mb-4">\r
        <div class="card h-100">\r
          <div class="card-header">\r
            <div class="d-flex justify-content-between align-items-center">\r
              <h5 class="mb-0">\r
                <i class="fa-solid fa-chart-pie text-primary me-2"></i>\r
                {{ i18nService.t('attendance.dashboard.todays_distribution') }}\r
              </h5>\r
              <span class="badge bg-primary">{{ i18nService.t('attendance.dashboard.today') }}</span>\r
            </div>\r
            <p class="mb-0 mt-2 text-muted small">\r
              <i class="fa-solid fa-info-circle me-1"></i>\r
              {{ i18nService.t('attendance.chart.descriptions.todays_distribution') }}\r
            </p>\r
          </div>\r
          <div class="card-body">\r
            <app-attendance-chart\r
              [type]="'doughnut'"\r
              [data]="attendanceChartData()"\r
              [loading]="loading()"\r
              [height]="300">\r
            </app-attendance-chart>\r
\r
            <!-- Helpful Message for No Data -->\r
            @if (!loading() && hasNoAttendanceData()) {\r
              <div class="alert alert-info mt-3">\r
                <i class="fa-solid fa-info-circle me-2"></i>\r
                <small>{{ i18nService.t('attendance.dashboard.no_data_hint') }}</small>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Weekly Trend -->\r
      <div class="col-12 col-lg-6 mb-4">\r
        <div class="card h-100">\r
          <div class="card-header">\r
            <div class="d-flex justify-content-between align-items-center">\r
              <h5 class="mb-0">\r
                <i class="fa-solid fa-chart-line text-info me-2"></i>\r
                {{ i18nService.t('attendance.dashboard.weekly_trend') }}\r
              </h5>\r
              <span class="badge bg-info">{{ i18nService.t('attendance.dashboard.last_7_days') }}</span>\r
            </div>\r
            <p class="mb-0 mt-2 text-muted small">\r
              <i class="fa-solid fa-info-circle me-1"></i>\r
              {{ i18nService.t('attendance.chart.descriptions.weekly_trend') }}\r
            </p>\r
          </div>\r
          <div class="card-body">\r
            <app-attendance-chart\r
              [type]="'line'"\r
              [data]="weeklyTrendData()"\r
              [loading]="loading()"\r
              [height]="300">\r
            </app-attendance-chart>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Detailed Information Row -->\r
    <div class="row mb-4">\r
      <!-- Incomplete Records -->\r
      <div class="col-12 col-lg-6 mb-4">\r
        <div class="card h-100">\r
          <div class="card-header">\r
            <div class="d-flex justify-content-between align-items-center">\r
              <h5 class="mb-0">\r
                <i class="fa-solid fa-exclamation-triangle text-warning me-2"></i>\r
                {{ i18nService.t('attendance.dashboard.incomplete_records') }}\r
              </h5>\r
              <span class="badge bg-warning">{{ incompleteRecords().length }}</span>\r
            </div>\r
          </div>\r
          <div class="card-body">\r
            @if (incompleteRecords().length === 0) {\r
              <div class="text-center py-4">\r
                <i class="fa-solid fa-check-circle text-success fa-3x mb-3"></i>\r
                <p class="text-muted">{{ i18nService.t('attendance.status_messages.all_records_complete') }}</p>\r
              </div>\r
            }\r
\r
            @if (incompleteRecords().length > 0) {\r
              <div>\r
                @for (record of incompleteRecords().slice(0, 5); track record.id) {\r
                  <div class="d-flex justify-content-between align-items-center mb-3 p-2 border rounded">\r
                    <div>\r
                      <div class="fw-semibold">{{ record.employeeName }}</div>\r
                      <small class="text-muted">{{ record.employeeNumber }} \u2022 {{ record.attendanceDate | date:'shortDate' }}</small>\r
                    </div>\r
                    <span [class]="getStatusBadgeClass(record.status)">\r
                      {{ i18nService.t(getStatusText(record.status)) }}\r
                    </span>\r
                  </div>\r
                }\r
\r
                @if (incompleteRecords().length > 5) {\r
                  <div class="text-center">\r
                    <a routerLink="/attendance/reports" class="btn btn-outline-primary btn-sm">\r
                      {{ i18nService.t('attendance.messages.view_all_more') }} ({{ incompleteRecords().length - 5 }})\r
                    </a>\r
                  </div>\r
                }\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Quick Actions -->\r
      <div class="col-12 col-lg-6 mb-4">\r
        <div class="card h-100">\r
          <div class="card-header">\r
            <h5 class="mb-0">\r
              <i class="fa-solid fa-bolt text-primary me-2"></i>\r
              {{ i18nService.t('dashboard.quick_actions') }}\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <div class="d-grid gap-3">\r
              <a routerLink="/attendance/daily" class="btn btn-outline-primary text-start">\r
                <i class="fa-solid fa-calendar-day me-3"></i>\r
                <div>\r
                  <div class="fw-semibold">{{ i18nService.t('attendance.daily_view') }}</div>\r
                  <small class="text-muted">View today's attendance status</small>\r
                </div>\r
              </a>\r
\r
              <a routerLink="/attendance/monthly-report" class="btn btn-outline-success text-start">\r
                <i class="fa-solid fa-calendar-alt me-3"></i>\r
                <div>\r
                  <div class="fw-semibold">{{ i18nService.t('attendance.monthly_report') }}</div>\r
                  <small class="text-muted">Generate monthly attendance summaries</small>\r
                </div>\r
              </a>\r
\r
              <a routerLink="/attendance/transactions" class="btn btn-outline-info text-start">\r
                <i class="fa-solid fa-clock-rotate-left me-3"></i>\r
                <div>\r
                  <div class="fw-semibold">{{ i18nService.t('attendance.transactions_report') }}</div>\r
                  <small class="text-muted">View all check-in/out transactions</small>\r
                </div>\r
              </a>\r
\r
              <a routerLink="/attendance/reports" class="btn btn-outline-warning text-start">\r
                <i class="fa-solid fa-file-alt me-3"></i>\r
                <div>\r
                  <div class="fw-semibold">{{ i18nService.t('attendance.actions.generate_report') }}</div>\r
                  <small class="text-muted">Generate detailed attendance reports</small>\r
                </div>\r
              </a>\r
\r
              <a routerLink="/attendance/statistics" class="btn btn-outline-secondary text-start">\r
                <i class="fa-solid fa-chart-bar me-3"></i>\r
                <div>\r
                  <div class="fw-semibold">{{ i18nService.t('attendance.statistics.menu') }}</div>\r
                  <small class="text-muted">View attendance analytics and trends</small>\r
                </div>\r
              </a>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Performance Metrics Row -->\r
    <div class="row">\r
      <!-- Average Working Hours -->\r
      <div class="col-12 col-sm-6 col-lg-3 mb-4">\r
        <div class="card text-center border-start border-primary border-4">\r
          <div class="card-body">\r
            <div class="icon-circle bg-primary bg-opacity-10 mx-auto mb-3">\r
              <i class="fa-solid fa-clock fa-2x text-primary"></i>\r
            </div>\r
            <h4 class="text-primary">{{ formatDuration(todayStats()?.averageWorkingHours || 0) }}</h4>\r
            <p class="text-muted small mb-0">{{ i18nService.t('attendance.statistics.average_working_hours') }}</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Total Overtime -->\r
      <div class="col-12 col-sm-6 col-lg-3 mb-4">\r
        <div class="card text-center border-start border-info border-4">\r
          <div class="card-body">\r
            <div class="icon-circle bg-info bg-opacity-10 mx-auto mb-3">\r
              <i class="fa-solid fa-business-time fa-2x text-info"></i>\r
            </div>\r
            <h4 class="text-info">{{ formatDuration(todayStats()?.totalOvertimeHours || 0) }}</h4>\r
            <p class="text-muted small mb-0">{{ i18nService.t('attendance.statistics.total_overtime_hours') }}</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Overtime Workers -->\r
      <div class="col-12 col-sm-6 col-lg-3 mb-4">\r
        <div class="card text-center border-start border-warning border-4">\r
          <div class="card-body">\r
            <div class="icon-circle bg-warning bg-opacity-10 mx-auto mb-3">\r
              <i class="fa-solid fa-user-clock fa-2x text-warning"></i>\r
            </div>\r
            <h4 class="text-warning">{{ todayStats()?.overtimeEmployees || 0 }}</h4>\r
            <p class="text-muted small mb-0">{{ i18nService.t('attendance.statistics.overtime_employees') }}</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Attendance Rate -->\r
      <div class="col-12 col-sm-6 col-lg-3 mb-4">\r
        <div class="card text-center border-start border-success border-4">\r
          <div class="card-body">\r
            <div class="icon-circle bg-success bg-opacity-10 mx-auto mb-3">\r
              <i class="fa-solid fa-percentage fa-2x text-success"></i>\r
            </div>\r
            <h4 class="text-success">{{ getAttendanceRatePercentage() }}%</h4>\r
            <p class="text-muted small mb-0">{{ i18nService.t('attendance.statistics.attendance_rate') }}</p>\r
\r
            <!-- Progress bar for attendance rate -->\r
            <div class="progress mt-2" style="height: 6px;">\r
              <div\r
                class="progress-bar bg-success"\r
                role="progressbar"\r
                [style.width.%]="getAttendanceRatePercentage()"\r
                [attr.aria-valuenow]="getAttendanceRatePercentage()"\r
                aria-valuemin="0"\r
                aria-valuemax="100">\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Live Updates Badge -->\r
    <div class="text-center mt-4">\r
      <span class="badge bg-light text-dark">\r
        <i class="fa-solid fa-circle text-success me-2" style="font-size: 0.5rem;"></i>\r
        {{ i18nService.t('attendance.dashboard.live_updates') }}\r
        <small class="ms-2 text-muted">{{ i18nService.t('attendance.dashboard.last_updated') }}: {{ currentDate() | date:'short' }}</small>\r
      </span>\r
    </div>\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/attendance/attendance.component.css */\n.attendance-dashboard {\n  padding: 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  min-height: 100vh;\n}\n.page-title {\n  font-size: 2.25rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin-bottom: 0.5rem;\n  letter-spacing: -0.025em;\n}\n.text-muted {\n  color: #6c757d !important;\n  font-size: 1rem;\n}\n.d-flex.justify-content-between.align-items-center.mb-4 {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  margin-bottom: 2rem;\n}\n.btn {\n  border-radius: 0.5rem;\n  font-weight: 500;\n  padding: 0.625rem 1.25rem;\n  transition: all 0.2s ease-in-out;\n  border-width: 1px;\n}\n.btn:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.btn .fa-spin {\n  animation: fa-spin 2s infinite linear;\n}\n.spinner-border {\n  width: 3rem;\n  height: 3rem;\n  color: #0d6efd;\n}\n.alert {\n  border-radius: 0.5rem;\n  border: none;\n  font-weight: 500;\n  padding: 1rem 1.25rem;\n}\n.alert-danger {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.dashboard-content {\n  animation: fadeIn 0.5s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.row .col-xl-2,\n.row .col-lg-4,\n.row .col-md-6 {\n  margin-bottom: 1rem;\n}\n.card {\n  border: 1px solid #e9ecef;\n  border-radius: 0.75rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease-in-out;\n  background: white;\n  overflow: hidden;\n}\n.card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n.card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border-bottom: 1px solid #e9ecef;\n  padding: 1.25rem 1.5rem;\n  border-radius: 0.75rem 0.75rem 0 0;\n}\n.card-header h5 {\n  font-weight: 600;\n  font-size: 1.1rem;\n  margin: 0;\n  color: #495057;\n}\n.card-body {\n  padding: 1.5rem;\n}\n.badge {\n  font-size: 0.75rem;\n  padding: 0.5em 0.75em;\n  border-radius: 0.375rem;\n  font-weight: 600;\n  letter-spacing: 0.025em;\n}\n.badge.bg-primary {\n  background-color: #0d6efd !important;\n}\n.badge.bg-info {\n  background-color: #0dcaf0 !important;\n  color: #000;\n}\n.badge.bg-warning {\n  background-color: #fd7e14 !important;\n  color: white;\n}\n.badge.bg-success {\n  background-color: #198754 !important;\n}\n.badge.bg-danger {\n  background-color: #dc3545 !important;\n}\n.badge.bg-secondary {\n  background-color: #6c757d !important;\n}\n.border.rounded {\n  border: 1px solid #e9ecef !important;\n  border-radius: 0.5rem !important;\n  transition: all 0.2s ease-in-out;\n}\n.border.rounded:hover {\n  border-color: #0d6efd !important;\n  background-color: #f8f9fa;\n}\n.fw-semibold {\n  font-weight: 600;\n}\n.d-grid.gap-3 {\n  gap: 1rem !important;\n}\n.btn.text-start {\n  text-align: left !important;\n  padding: 1rem 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.btn.text-start .fw-semibold {\n  font-size: 1rem;\n  margin-bottom: 0.25rem;\n}\n.btn.text-start small {\n  font-size: 0.85rem;\n  opacity: 0.8;\n  line-height: 1.3;\n}\n.btn.btn-outline-primary.text-start:hover {\n  background-color: rgba(13, 110, 253, 0.1);\n  border-color: #0d6efd;\n  color: #0d6efd;\n}\n.btn.btn-outline-success.text-start:hover {\n  background-color: rgba(25, 135, 84, 0.1);\n  border-color: #198754;\n  color: #198754;\n}\n.btn.btn-outline-info.text-start:hover {\n  background-color: rgba(13, 202, 240, 0.1);\n  border-color: #0dcaf0;\n  color: #0dcaf0;\n}\n.btn.btn-outline-warning.text-start:hover {\n  background-color: rgba(255, 193, 7, 0.1);\n  border-color: #ffc107;\n  color: #ffc107;\n}\n.btn.btn-outline-secondary.text-start:hover {\n  background-color: rgba(108, 117, 125, 0.1);\n  border-color: #6c757d;\n  color: #6c757d;\n}\n.border-start.border-4 {\n  border-left-width: 4px !important;\n}\n.border-primary {\n  border-color: #0d6efd !important;\n}\n.border-info {\n  border-color: #0dcaf0 !important;\n}\n.border-warning {\n  border-color: #fd7e14 !important;\n}\n.border-success {\n  border-color: #198754 !important;\n}\n.icon-circle {\n  width: 4rem;\n  height: 4rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  transition: transform 0.3s ease-in-out;\n}\n.card:hover .icon-circle {\n  transform: scale(1.1);\n}\n.bg-primary.bg-opacity-10 {\n  background-color: rgba(13, 110, 253, 0.1) !important;\n}\n.bg-info.bg-opacity-10 {\n  background-color: rgba(13, 202, 240, 0.1) !important;\n}\n.bg-warning.bg-opacity-10 {\n  background-color: rgba(253, 126, 20, 0.1) !important;\n}\n.bg-success.bg-opacity-10 {\n  background-color: rgba(25, 135, 84, 0.1) !important;\n}\n.text-primary {\n  color: #0d6efd !important;\n}\n.text-info {\n  color: #0dcaf0 !important;\n}\n.text-warning {\n  color: #fd7e14 !important;\n}\n.text-success {\n  color: #198754 !important;\n}\n.col-lg-3 .card {\n  animation: slideInUp 0.6s ease-out;\n}\n.col-lg-3:nth-child(1) .card {\n  animation-delay: 0.1s;\n}\n.col-lg-3:nth-child(2) .card {\n  animation-delay: 0.2s;\n}\n.col-lg-3:nth-child(3) .card {\n  animation-delay: 0.3s;\n}\n.col-lg-3:nth-child(4) .card {\n  animation-delay: 0.4s;\n}\n@keyframes slideInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.progress {\n  background-color: #e9ecef;\n  border-radius: 0.375rem;\n  overflow: hidden;\n  height: 6px;\n}\n.progress-bar {\n  transition: width 0.8s ease;\n}\n.progress-bar.bg-success {\n  background:\n    linear-gradient(\n      90deg,\n      #198754 0%,\n      #20c997 100%);\n}\n.badge.bg-light {\n  background-color: #f8f9fa !important;\n  color: #495057 !important;\n  font-size: 0.9rem;\n  padding: 0.75rem 1.5rem;\n  border-radius: 2rem;\n  border: 1px solid #e9ecef;\n}\n.fa-circle.text-success {\n  color: #198754 !important;\n  animation: pulse 2s infinite;\n}\n@keyframes pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.card .card-body {\n  position: relative;\n}\n.text-center.py-4 .fa-check-circle {\n  color: #198754;\n  margin-bottom: 1rem;\n}\n@media (max-width: 1200px) {\n  .col-xl-2 {\n    flex: 0 0 auto;\n    width: 20%;\n  }\n}\n@media (max-width: 992px) {\n  .col-lg-4 {\n    flex: 0 0 auto;\n    width: 33.333333%;\n  }\n  .col-lg-6 {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n  .col-lg-3 {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n}\n@media (max-width: 768px) {\n  .attendance-dashboard {\n    padding: 1rem;\n  }\n  .page-title {\n    font-size: 1.75rem;\n  }\n  .d-flex.justify-content-between.align-items-center.mb-4 {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 1rem;\n    padding: 1rem;\n  }\n  .d-flex.gap-2 {\n    width: 100%;\n    flex-wrap: wrap;\n    gap: 0.5rem !important;\n  }\n  .btn {\n    white-space: nowrap;\n    font-size: 0.875rem;\n    padding: 0.5rem 1rem;\n  }\n  .card-header {\n    padding: 1rem;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .icon-circle {\n    width: 3rem;\n    height: 3rem;\n    font-size: 1.25rem;\n  }\n  .col-md-6 {\n    flex: 0 0 auto;\n    width: 100%;\n    margin-bottom: 1rem;\n  }\n  .col-lg-3 {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n  .btn.text-start {\n    padding: 0.875rem 1rem;\n    gap: 0.75rem;\n  }\n  .btn.text-start .fw-semibold {\n    font-size: 0.9rem;\n  }\n  .btn.text-start small {\n    font-size: 0.8rem;\n  }\n}\n@media (max-width: 576px) {\n  .col-lg-3 {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .col-xl-2,\n  .col-lg-4 {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n  .attendance-dashboard {\n    padding: 0.75rem;\n  }\n  .page-title {\n    font-size: 1.5rem;\n  }\n  .d-flex.justify-content-between.align-items-center.mb-4 {\n    padding: 0.75rem;\n  }\n}\n.btn:focus,\n.card:focus-within {\n  outline: 2px solid #0d6efd;\n  outline-offset: 2px;\n}\n@media print {\n  .attendance-dashboard {\n    background: white;\n    padding: 1rem;\n  }\n  .btn,\n  .badge.bg-light {\n    display: none;\n  }\n  .card {\n    box-shadow: none;\n    border: 1px solid #000;\n    break-inside: avoid;\n  }\n  .page-title {\n    color: #000;\n  }\n}\n/*# sourceMappingURL=attendance.component.css.map */\n"] }]
  }], () => [{ type: AttendanceService }, { type: I18nService }, { type: NotificationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttendanceComponent, { className: "AttendanceComponent", filePath: "src/app/pages/attendance/attendance.component.ts", lineNumber: 26 });
})();
export {
  AttendanceComponent
};
//# sourceMappingURL=chunk-T7G5O77V.js.map
