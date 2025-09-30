import {
  StatsGridComponent
} from "./chunk-TZ2SODGW.js";
import "./chunk-JLDQHPY3.js";
import {
  LoadingSpinnerComponent
} from "./chunk-WJCQS5EA.js";
import {
  PageHeaderComponent
} from "./chunk-G7MX4ADH.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import {
  AuthService
} from "./chunk-IL4NCC2P.js";
import {
  FormsModule,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-JBVPS774.js";
import {
  I18nService,
  environment
} from "./chunk-5UND7ZIG.js";
import {
  BehaviorSubject,
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  HttpClient,
  HttpParams,
  Injectable,
  catchError,
  computed,
  effect,
  interval,
  map,
  of,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/dashboard/dashboard.service.ts
var _DashboardService = class _DashboardService {
  http;
  apiUrl = `${environment.apiUrl}/api/v1/dashboard`;
  // Signal-based state management
  _dashboardData = signal(null, ...ngDevMode ? [{ debugName: "_dashboardData" }] : []);
  _loading = signal(false, ...ngDevMode ? [{ debugName: "_loading" }] : []);
  _error = signal(null, ...ngDevMode ? [{ debugName: "_error" }] : []);
  _lastRefresh = signal(null, ...ngDevMode ? [{ debugName: "_lastRefresh" }] : []);
  _autoRefresh = signal(false, ...ngDevMode ? [{ debugName: "_autoRefresh" }] : []);
  _refreshInterval = signal(30, ...ngDevMode ? [{ debugName: "_refreshInterval" }] : []);
  // seconds
  // Read-only signals for external consumption
  dashboardData = this._dashboardData.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  lastRefresh = this._lastRefresh.asReadonly();
  autoRefresh = this._autoRefresh.asReadonly();
  refreshInterval = this._refreshInterval.asReadonly();
  // BehaviorSubject for reactive dashboard updates
  dashboardSubject = new BehaviorSubject(null);
  dashboard$ = this.dashboardSubject.asObservable();
  // Auto-refresh subscription
  refreshSubscription;
  constructor(http) {
    this.http = http;
  }
  /**
   * Gets comprehensive dashboard overview data
   */
  getDashboardOverview(filters) {
    this._loading.set(true);
    this._error.set(null);
    let params = new HttpParams();
    if (filters?.branchId) {
      params = params.set("branchId", filters.branchId.toString());
    }
    if (filters?.departmentId) {
      params = params.set("departmentId", filters.departmentId.toString());
    }
    return this.http.get(`${this.apiUrl}/overview`, { params }).pipe(map((data) => {
      this._dashboardData.set(data);
      this._lastRefresh.set(/* @__PURE__ */ new Date());
      this._loading.set(false);
      this.dashboardSubject.next(data);
      return data;
    }), catchError((error) => {
      this._error.set(error.message || "Failed to load dashboard data");
      this._loading.set(false);
      console.error("Dashboard data loading failed:", error);
      return of({
        organization: {},
        humanResources: {},
        attendance: {},
        leaves: {},
        shifts: {},
        system: {}
      });
    }));
  }
  /**
   * Gets specific widget data for incremental updates
   */
  getWidgetData(widgetName, filters) {
    let params = new HttpParams();
    if (filters?.branchId) {
      params = params.set("branchId", filters.branchId.toString());
    }
    if (filters?.departmentId) {
      params = params.set("departmentId", filters.departmentId.toString());
    }
    return this.http.get(`${this.apiUrl}/widgets/${widgetName}`, { params }).pipe(catchError((error) => {
      console.error(`Failed to load ${widgetName} widget data:`, error);
      return of(null);
    }));
  }
  /**
   * Refreshes dashboard data manually
   */
  refreshDashboard(filters) {
    this.getDashboardOverview(filters).subscribe();
  }
  /**
   * Starts auto-refresh functionality
   */
  startAutoRefresh(intervalSeconds) {
    if (intervalSeconds) {
      this._refreshInterval.set(intervalSeconds);
    }
    this.stopAutoRefresh();
    this._autoRefresh.set(true);
    this.refreshSubscription = interval(this._refreshInterval() * 1e3).subscribe(() => {
      if (this._autoRefresh()) {
        this.refreshDashboard();
      }
    });
  }
  /**
   * Stops auto-refresh functionality
   */
  stopAutoRefresh() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }
    this._autoRefresh.set(false);
  }
  /**
   * Updates refresh interval
   */
  updateRefreshInterval(seconds) {
    this._refreshInterval.set(seconds);
    if (this._autoRefresh()) {
      this.startAutoRefresh(seconds);
    }
  }
  /**
   * Clears dashboard data and error state
   */
  clearData() {
    this._dashboardData.set(null);
    this._error.set(null);
    this._lastRefresh.set(null);
    this.dashboardSubject.next(null);
  }
  /**
   * Gets formatted time since last refresh
   */
  getTimeSinceLastRefresh() {
    const lastRefresh = this._lastRefresh();
    if (!lastRefresh)
      return "Never";
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - lastRefresh.getTime();
    const diffSeconds = Math.floor(diffMs / 1e3);
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours} hours ago`;
    }
  }
  /**
   * Checks if dashboard data is available
   */
  hasData() {
    return this._dashboardData() !== null;
  }
  /**
   * Gets current dashboard filters (if any were applied)
   */
  getCurrentFilters() {
    return {};
  }
  /**
   * Destroys the service and cleans up subscriptions
   */
  ngOnDestroy() {
    this.stopAutoRefresh();
  }
};
__name(_DashboardService, "DashboardService");
__publicField(_DashboardService, "\u0275fac", /* @__PURE__ */ __name(function DashboardService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardService)(\u0275\u0275inject(HttpClient));
}, "DashboardService_Factory"));
__publicField(_DashboardService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" }));
var DashboardService = _DashboardService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/pages/dashboard/dashboard.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
var _forTrack1 = /* @__PURE__ */ __name(($index, $item) => $item.employeeId, "_forTrack1");
var _forTrack2 = /* @__PURE__ */ __name(($index, $item) => $item.roleName, "_forTrack2");
var _forTrack3 = /* @__PURE__ */ __name(($index, $item) => $item.vacationId, "_forTrack3");
var _forTrack4 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack4");
function DashboardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 6);
    \u0275\u0275element(1, "i", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.t("dashboard.last_refresh"), ": ", ctx_r0.getTimeSinceLastRefresh(), " ");
  }
}
__name(DashboardComponent_Conditional_7_Template, "DashboardComponent_Conditional_7_Template");
function DashboardComponent_Conditional_18_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r3 = ctx.$implicit;
    \u0275\u0275property("value", branch_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(branch_r3.name);
  }
}
__name(DashboardComponent_Conditional_18_For_4_Template, "DashboardComponent_Conditional_18_For_4_Template");
function DashboardComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 19);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DashboardComponent_Conditional_18_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateFilters({ branchId: $event.target.value ? +$event.target.value : void 0 }));
    }, "DashboardComponent_Conditional_18_Template_select_change_0_listener"));
    \u0275\u0275elementStart(1, "option", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, DashboardComponent_Conditional_18_For_4_Template, 2, 2, "option", 21, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("value", ctx_r0.filters().branchId || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.all_branches"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableBranches());
  }
}
__name(DashboardComponent_Conditional_18_Template, "DashboardComponent_Conditional_18_Template");
function DashboardComponent_Conditional_19_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dept_r5 = ctx.$implicit;
    \u0275\u0275property("value", dept_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(dept_r5.name);
  }
}
__name(DashboardComponent_Conditional_19_For_4_Template, "DashboardComponent_Conditional_19_For_4_Template");
function DashboardComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 19);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DashboardComponent_Conditional_19_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateFilters({ departmentId: $event.target.value ? +$event.target.value : void 0 }));
    }, "DashboardComponent_Conditional_19_Template_select_change_0_listener"));
    \u0275\u0275elementStart(1, "option", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, DashboardComponent_Conditional_19_For_4_Template, 2, 2, "option", 21, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("value", ctx_r0.filters().departmentId || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.all_departments"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableDepartments());
  }
}
__name(DashboardComponent_Conditional_19_Template, "DashboardComponent_Conditional_19_Template");
function DashboardComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 22);
    \u0275\u0275element(2, "app-loading-spinner", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("message", ctx_r0.t("dashboard.loading_comprehensive"))("variant", "primary")("centered", true);
  }
}
__name(DashboardComponent_Conditional_20_Template, "DashboardComponent_Conditional_20_Template");
function DashboardComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "i", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 25);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DashboardComponent_Conditional_21_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.refreshData());
    }, "DashboardComponent_Conditional_21_Template_button_click_3_listener"));
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.retry"), " ");
  }
}
__name(DashboardComponent_Conditional_21_Template, "DashboardComponent_Conditional_21_Template");
function DashboardComponent_Conditional_22_Conditional_6_Conditional_28_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 52);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const record_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r7.employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r7.status);
  }
}
__name(DashboardComponent_Conditional_22_Conditional_6_Conditional_28_For_5_Template, "DashboardComponent_Conditional_22_Conditional_6_Conditional_28_For_5_Template");
function DashboardComponent_Conditional_22_Conditional_6_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "h5");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49);
    \u0275\u0275repeaterCreate(4, DashboardComponent_Conditional_22_Conditional_6_Conditional_28_For_5_Template, 5, 2, "div", 50, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.incomplete_records"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.attendance == null ? null : tmp_4_0.attendance.incompleteRecords == null ? null : tmp_4_0.attendance.incompleteRecords.slice(0, 5)) || \u0275\u0275pureFunction0(1, _c0));
  }
}
__name(DashboardComponent_Conditional_22_Conditional_6_Conditional_28_Template, "DashboardComponent_Conditional_22_Conditional_6_Conditional_28_Template");
function DashboardComponent_Conditional_22_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 38)(2, "h3");
    \u0275\u0275element(3, "i", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 40)(6, "div", 41)(7, "div", 42)(8, "span", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 44);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 42)(13, "span", 43);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 45);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 42)(18, "span", 43);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 46);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 42)(23, "span", 43);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 47);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(28, DashboardComponent_Conditional_22_Conditional_6_Conditional_28_Template, 6, 2, "div", 48);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_10_0;
    let tmp_11_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.attendance_overview"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.present_today"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.attendance.todayPresent) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.absent_today"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r0.dashboardData()) == null ? null : tmp_6_0.attendance.todayAbsent) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.late_today"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_8_0 = ctx_r0.dashboardData()) == null ? null : tmp_8_0.attendance.todayLate) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.attendance_rate"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(27, 10, ((tmp_10_0 = ctx_r0.dashboardData()) == null ? null : tmp_10_0.attendance.attendanceRate) || 0, "1.1-1"), "%");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_11_0 = ctx_r0.dashboardData()) == null ? null : tmp_11_0.attendance == null ? null : tmp_11_0.attendance.incompleteRecords == null ? null : tmp_11_0.attendance.incompleteRecords.length) ? 28 : -1);
  }
}
__name(DashboardComponent_Conditional_22_Conditional_6_Template, "DashboardComponent_Conditional_22_Conditional_6_Template");
function DashboardComponent_Conditional_22_Conditional_7_Conditional_27_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 60);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 61);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const role_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r8.roleName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r8.userCount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind2(7, 3, role_r8.percentage, "1.0-0"), "%)");
  }
}
__name(DashboardComponent_Conditional_22_Conditional_7_Conditional_27_For_4_Template, "DashboardComponent_Conditional_22_Conditional_7_Conditional_27_For_4_Template");
function DashboardComponent_Conditional_22_Conditional_7_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "h5");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, DashboardComponent_Conditional_22_Conditional_7_Conditional_27_For_4_Template, 8, 6, "div", 58, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.role_distribution"));
    \u0275\u0275advance();
    \u0275\u0275repeater(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.humanResources == null ? null : tmp_4_0.humanResources.roleDistribution == null ? null : tmp_4_0.humanResources.roleDistribution.slice(0, 4)) || \u0275\u0275pureFunction0(1, _c0));
  }
}
__name(DashboardComponent_Conditional_22_Conditional_7_Conditional_27_Template, "DashboardComponent_Conditional_22_Conditional_7_Conditional_27_Template");
function DashboardComponent_Conditional_22_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 38)(2, "h3");
    \u0275\u0275element(3, "i", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 40)(6, "div", 54)(7, "div", 55)(8, "span", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 56);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 55)(13, "span", 43);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 44);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 55)(18, "span", 43);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 56);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 55)(23, "span", 43);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 44);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(27, DashboardComponent_Conditional_22_Conditional_7_Conditional_27_Template, 5, 2, "div", 57);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_10_0;
    let tmp_11_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.human_resources"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.total_employees"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.humanResources.totalEmployees) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.active_employees"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r0.dashboardData()) == null ? null : tmp_6_0.humanResources.activeEmployees) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.total_users"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_8_0 = ctx_r0.dashboardData()) == null ? null : tmp_8_0.humanResources.totalUsers) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.active_users"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_10_0 = ctx_r0.dashboardData()) == null ? null : tmp_10_0.humanResources.activeUsers) || 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_11_0 = ctx_r0.dashboardData()) == null ? null : tmp_11_0.humanResources == null ? null : tmp_11_0.humanResources.roleDistribution == null ? null : tmp_11_0.humanResources.roleDistribution.length) ? 27 : -1);
  }
}
__name(DashboardComponent_Conditional_22_Conditional_7_Template, "DashboardComponent_Conditional_22_Conditional_7_Template");
function DashboardComponent_Conditional_22_Conditional_8_Conditional_22_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 67);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 68);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const vacation_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vacation_r9.employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vacation_r9.vacationType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(7, 4, vacation_r9.startDate, "shortDate"), " - ", \u0275\u0275pipeBind2(8, 7, vacation_r9.endDate, "shortDate"));
  }
}
__name(DashboardComponent_Conditional_22_Conditional_8_Conditional_22_For_4_Template, "DashboardComponent_Conditional_22_Conditional_8_Conditional_22_For_4_Template");
function DashboardComponent_Conditional_22_Conditional_8_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "h5");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, DashboardComponent_Conditional_22_Conditional_8_Conditional_22_For_4_Template, 9, 10, "div", 66, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.upcoming_vacations"));
    \u0275\u0275advance();
    \u0275\u0275repeater(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.leaves == null ? null : tmp_4_0.leaves.upcomingVacations == null ? null : tmp_4_0.leaves.upcomingVacations.slice(0, 3)) || \u0275\u0275pureFunction0(1, _c0));
  }
}
__name(DashboardComponent_Conditional_22_Conditional_8_Conditional_22_Template, "DashboardComponent_Conditional_22_Conditional_8_Conditional_22_Template");
function DashboardComponent_Conditional_22_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 38)(2, "h3");
    \u0275\u0275element(3, "i", 62);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 40)(6, "div", 63)(7, "div", 42)(8, "span", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 46);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 42)(13, "span", 43);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 64);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 42)(18, "span", 43);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 44);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(22, DashboardComponent_Conditional_22_Conditional_8_Conditional_22_Template, 5, 2, "div", 65);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_9_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.leave_management"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.pending_requests"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.leaves.pendingRequests) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.on_leave_today"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r0.dashboardData()) == null ? null : tmp_6_0.leaves.onLeaveToday) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.approved_today"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_8_0 = ctx_r0.dashboardData()) == null ? null : tmp_8_0.leaves.approvedToday) || 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_9_0 = ctx_r0.dashboardData()) == null ? null : tmp_9_0.leaves == null ? null : tmp_9_0.leaves.upcomingVacations == null ? null : tmp_9_0.leaves.upcomingVacations.length) ? 22 : -1);
  }
}
__name(DashboardComponent_Conditional_22_Conditional_8_Template, "DashboardComponent_Conditional_22_Conditional_8_Template");
function DashboardComponent_Conditional_22_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 38)(2, "h3");
    \u0275\u0275element(3, "i", 69);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 40)(6, "div", 70)(7, "div", 55)(8, "span", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 56);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 55)(13, "span", 43);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 44);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 55)(18, "span", 43);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 56);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 55)(23, "span", 43);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 44);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_10_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.organization_structure"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.total_branches"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.organization.totalBranches) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.active_branches"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r0.dashboardData()) == null ? null : tmp_6_0.organization.activeBranches) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.total_departments"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_8_0 = ctx_r0.dashboardData()) == null ? null : tmp_8_0.organization.totalDepartments) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.active_departments"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_10_0 = ctx_r0.dashboardData()) == null ? null : tmp_10_0.organization.activeDepartments) || 0);
  }
}
__name(DashboardComponent_Conditional_22_Conditional_9_Template, "DashboardComponent_Conditional_22_Conditional_9_Template");
function DashboardComponent_Conditional_22_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 38)(2, "h3");
    \u0275\u0275element(3, "i", 71);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 40)(6, "div", 72)(7, "div", 42)(8, "span", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 56);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 42)(13, "span", 43);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 56);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 42)(18, "span", 43);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 44);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    let tmp_8_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.shift_management"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.active_shifts"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.shifts.activeShifts) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.total_assignments"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r0.dashboardData()) == null ? null : tmp_6_0.shifts.totalShiftAssignments) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.today_coverage"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_8_0 = ctx_r0.dashboardData()) == null ? null : tmp_8_0.shifts.todayCoverage) || 0);
  }
}
__name(DashboardComponent_Conditional_22_Conditional_10_Template, "DashboardComponent_Conditional_22_Conditional_10_Template");
function DashboardComponent_Conditional_22_Conditional_11_Conditional_22_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "span", 77);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 78);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const activity_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(activity_r10.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 2, activity_r10.timestamp, "short"));
  }
}
__name(DashboardComponent_Conditional_22_Conditional_11_Conditional_22_For_4_Template, "DashboardComponent_Conditional_22_Conditional_11_Conditional_22_For_4_Template");
function DashboardComponent_Conditional_22_Conditional_11_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "h5");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, DashboardComponent_Conditional_22_Conditional_11_Conditional_22_For_4_Template, 6, 5, "div", 76, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.recent_activities"));
    \u0275\u0275advance();
    \u0275\u0275repeater(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.system == null ? null : tmp_4_0.system.recentActivities == null ? null : tmp_4_0.system.recentActivities.slice(0, 3)) || \u0275\u0275pureFunction0(1, _c0));
  }
}
__name(DashboardComponent_Conditional_22_Conditional_11_Conditional_22_Template, "DashboardComponent_Conditional_22_Conditional_11_Conditional_22_Template");
function DashboardComponent_Conditional_22_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 38)(2, "h3");
    \u0275\u0275element(3, "i", 73);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 40)(6, "div", 74)(7, "div", 55)(8, "span", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 44);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 55)(13, "span", 43);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 56);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 55)(18, "span", 43);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 64);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(22, DashboardComponent_Conditional_22_Conditional_11_Conditional_22_Template, 5, 2, "div", 75);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_9_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.system_health"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.active_sessions"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r0.dashboardData()) == null ? null : tmp_4_0.system.activeSessions) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.today_logins"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r0.dashboardData()) == null ? null : tmp_6_0.system.todayLogins) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.system_uptime"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_8_0 = ctx_r0.dashboardData()) == null ? null : tmp_8_0.system.systemUptime) || "N/A");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_9_0 = ctx_r0.dashboardData()) == null ? null : tmp_9_0.system == null ? null : tmp_9_0.system.recentActivities == null ? null : tmp_9_0.system.recentActivities.length) ? 22 : -1);
  }
}
__name(DashboardComponent_Conditional_22_Conditional_11_Template, "DashboardComponent_Conditional_22_Conditional_11_Template");
function DashboardComponent_Conditional_22_Conditional_12_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const interval_r12 = ctx.$implicit;
    \u0275\u0275property("value", interval_r12.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(interval_r12.label);
  }
}
__name(DashboardComponent_Conditional_22_Conditional_12_For_6_Template, "DashboardComponent_Conditional_22_Conditional_12_For_6_Template");
function DashboardComponent_Conditional_22_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 79)(2, "label", 80);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 81);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DashboardComponent_Conditional_22_Conditional_12_Template_select_change_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.updateRefreshInterval(+$event.target.value));
    }, "DashboardComponent_Conditional_22_Conditional_12_Template_select_change_4_listener"));
    \u0275\u0275repeaterCreate(5, DashboardComponent_Conditional_22_Conditional_12_For_6_Template, 2, 2, "option", 21, _forTrack4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.refresh_interval"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.dashboardService.refreshInterval());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.refreshIntervals);
  }
}
__name(DashboardComponent_Conditional_22_Conditional_12_Template, "DashboardComponent_Conditional_22_Conditional_12_Template");
function DashboardComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "h2", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-stats-grid", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 29)(5, "div", 30);
    \u0275\u0275conditionalCreate(6, DashboardComponent_Conditional_22_Conditional_6_Template, 29, 13, "div", 31);
    \u0275\u0275conditionalCreate(7, DashboardComponent_Conditional_22_Conditional_7_Template, 28, 10, "div", 32);
    \u0275\u0275conditionalCreate(8, DashboardComponent_Conditional_22_Conditional_8_Template, 23, 8, "div", 33);
    \u0275\u0275conditionalCreate(9, DashboardComponent_Conditional_22_Conditional_9_Template, 27, 9, "div", 34);
    \u0275\u0275conditionalCreate(10, DashboardComponent_Conditional_22_Conditional_10_Template, 22, 7, "div", 35);
    \u0275\u0275conditionalCreate(11, DashboardComponent_Conditional_22_Conditional_11_Template, 23, 8, "div", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, DashboardComponent_Conditional_22_Conditional_12_Template, 7, 2, "div", 37);
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("dashboard.key_metrics"));
    \u0275\u0275advance();
    \u0275\u0275property("stats", ctx_r0.dashboardStats())("columns", 4)("loading", ctx_r0.loading());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.showAttendanceWidget() && ((tmp_5_0 = ctx_r0.dashboardData()) == null ? null : tmp_5_0.attendance) ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showHumanResourcesWidget() && ((tmp_6_0 = ctx_r0.dashboardData()) == null ? null : tmp_6_0.humanResources) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showVacationWidget() && ((tmp_7_0 = ctx_r0.dashboardData()) == null ? null : tmp_7_0.leaves) ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showOrganizationWidget() && ((tmp_8_0 = ctx_r0.dashboardData()) == null ? null : tmp_8_0.organization) ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showShiftWidget() && ((tmp_9_0 = ctx_r0.dashboardData()) == null ? null : tmp_9_0.shifts) ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showSystemWidget() && ((tmp_10_0 = ctx_r0.dashboardData()) == null ? null : tmp_10_0.system) ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.autoRefresh() ? 12 : -1);
  }
}
__name(DashboardComponent_Conditional_22_Template, "DashboardComponent_Conditional_22_Template");
var _DashboardComponent = class _DashboardComponent {
  authService;
  i18n;
  dashboardService;
  notificationService;
  currentUser = computed(() => this.authService.currentUser(), ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  // Dashboard state - will be initialized in ngOnInit
  dashboardData;
  loading;
  error;
  lastRefresh;
  autoRefresh;
  // Dashboard cards computed from API data
  dashboardCards = computed(() => {
    const data = this.dashboardData();
    if (!data)
      return [];
    return [
      {
        title: this.t("dashboard.total_employees"),
        value: data.humanResources?.totalEmployees || 0,
        icon: "fa-solid fa-users",
        color: "primary",
        change: this.calculateChange(data.humanResources?.activeEmployees, data.humanResources?.totalEmployees),
        trend: "up",
        module: "humanResources"
      },
      {
        title: this.t("dashboard.today_attendance"),
        value: data.attendance?.todayPresent || 0,
        icon: "fa-solid fa-calendar-check",
        color: "success",
        change: data.attendance?.attendanceRate || 0,
        trend: (data.attendance?.attendanceRate || 0) >= 90 ? "up" : "down",
        module: "attendance"
      },
      {
        title: this.t("dashboard.pending_vacations"),
        value: data.leaves?.pendingRequests || 0,
        icon: "fa-solid fa-calendar-times",
        color: "warning",
        trend: "stable",
        module: "leaves"
      },
      {
        title: this.t("dashboard.active_shifts"),
        value: data.shifts?.activeShifts || 0,
        icon: "fa-solid fa-clock",
        color: "info",
        trend: "stable",
        module: "shifts"
      },
      {
        title: this.t("dashboard.total_branches"),
        value: data.organization?.totalBranches || 0,
        icon: "fa-solid fa-code-branch",
        color: "secondary",
        trend: "stable",
        module: "organization"
      },
      {
        title: this.t("dashboard.active_users"),
        value: data.humanResources?.activeUsers || 0,
        icon: "fa-solid fa-user-check",
        color: "primary",
        trend: "up",
        module: "humanResources"
      },
      {
        title: this.t("dashboard.today_late"),
        value: data.attendance?.todayLate || 0,
        icon: "fa-solid fa-exclamation-triangle",
        color: "danger",
        trend: (data.attendance?.todayLate || 0) > 5 ? "up" : "down",
        module: "attendance"
      },
      {
        title: this.t("dashboard.active_sessions"),
        value: data.system?.activeSessions || 0,
        icon: "fa-solid fa-wifi",
        color: "info",
        trend: "stable",
        module: "system"
      }
    ];
  }, ...ngDevMode ? [{ debugName: "dashboardCards" }] : []);
  // Transform dashboard cards to StatGridItems for StatsGridComponent
  dashboardStats = computed(() => {
    const cards = this.dashboardCards();
    return cards.map((card) => ({
      label: card.title,
      value: card.value,
      icon: card.icon,
      variant: this.mapColorToVariant(card.color),
      change: card.change !== void 0 ? {
        value: Math.abs(card.change),
        type: card.trend === "up" ? "increase" : card.trend === "down" ? "decrease" : "neutral",
        isPercentage: card.module === "attendance"
      } : void 0
    }));
  }, ...ngDevMode ? [{ debugName: "dashboardStats" }] : []);
  // Filter state
  filters = signal({}, ...ngDevMode ? [{ debugName: "filters" }] : []);
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  availableDepartments = signal([], ...ngDevMode ? [{ debugName: "availableDepartments" }] : []);
  // Widget visibility based on user permissions
  showOrganizationWidget = computed(() => this.hasPermission("branch.read") || this.hasPermission("department.read"), ...ngDevMode ? [{ debugName: "showOrganizationWidget" }] : []);
  showHumanResourcesWidget = computed(() => this.hasPermission("user.read") || this.hasPermission("employee.read"), ...ngDevMode ? [{ debugName: "showHumanResourcesWidget" }] : []);
  showAttendanceWidget = computed(() => this.hasPermission("attendance.read"), ...ngDevMode ? [{ debugName: "showAttendanceWidget" }] : []);
  showVacationWidget = computed(() => this.hasPermission("vacation.read"), ...ngDevMode ? [{ debugName: "showVacationWidget" }] : []);
  showShiftWidget = computed(() => this.hasPermission("shift.read"), ...ngDevMode ? [{ debugName: "showShiftWidget" }] : []);
  showSystemWidget = computed(() => this.isSystemAdmin(), ...ngDevMode ? [{ debugName: "showSystemWidget" }] : []);
  // Auto-refresh options
  refreshIntervals = [
    { value: 15, label: "15 seconds" },
    { value: 30, label: "30 seconds" },
    { value: 60, label: "1 minute" },
    { value: 300, label: "5 minutes" },
    { value: 900, label: "15 minutes" }
  ];
  constructor(authService, i18n, dashboardService, notificationService) {
    this.authService = authService;
    this.i18n = i18n;
    this.dashboardService = dashboardService;
    this.notificationService = notificationService;
    this.setupErrorHandling();
  }
  ngOnInit() {
    this.dashboardData = this.dashboardService.dashboardData;
    this.loading = this.dashboardService.loading;
    this.error = this.dashboardService.error;
    this.lastRefresh = this.dashboardService.lastRefresh;
    this.autoRefresh = this.dashboardService.autoRefresh;
    this.loadDashboardData();
    this.loadFilterOptions();
  }
  ngOnDestroy() {
    this.dashboardService.stopAutoRefresh();
  }
  /**
   * Loads dashboard data with current filters
   */
  loadDashboardData() {
    const filters = this.filters();
    this.dashboardService.getDashboardOverview(filters).subscribe({
      next: /* @__PURE__ */ __name((data) => {
        if (data.organization?.branchSummaries) {
          this.availableBranches.set(data.organization.branchSummaries);
        }
        if (data.organization?.departmentSummaries) {
          this.availableDepartments.set(data.organization.departmentSummaries);
        }
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.notificationService.error(this.t("dashboard.load_error"));
        console.error("Dashboard load failed:", error);
      }, "error")
    });
  }
  /**
   * Refreshes dashboard data manually
   */
  refreshData() {
    this.dashboardService.refreshDashboard(this.filters());
    this.notificationService.success(this.t("dashboard.refreshed"));
  }
  /**
   * Updates dashboard filters
   */
  updateFilters(newFilters) {
    this.filters.update((current) => __spreadValues(__spreadValues({}, current), newFilters));
    this.loadDashboardData();
  }
  /**
   * Toggles auto-refresh functionality
   */
  toggleAutoRefresh() {
    if (this.autoRefresh()) {
      this.dashboardService.stopAutoRefresh();
      this.notificationService.info(this.t("dashboard.auto_refresh_disabled"));
    } else {
      this.dashboardService.startAutoRefresh();
      this.notificationService.info(this.t("dashboard.auto_refresh_enabled"));
    }
  }
  /**
   * Updates auto-refresh interval
   */
  updateRefreshInterval(seconds) {
    this.dashboardService.updateRefreshInterval(seconds);
    if (this.autoRefresh()) {
      this.notificationService.info(this.t("dashboard.refresh_interval_updated"));
    }
  }
  /**
   * Gets formatted time since last refresh
   */
  getTimeSinceLastRefresh() {
    return this.dashboardService.getTimeSinceLastRefresh();
  }
  /**
   * Translation helper
   */
  t(key) {
    return this.i18n.t(key);
  }
  /**
   * Gets card color class for styling
   */
  getCardColorClass(color) {
    return `card-${color}`;
  }
  /**
   * Gets trend icon for dashboard cards
   */
  getTrendIcon(trend) {
    switch (trend) {
      case "up":
        return "fa-solid fa-arrow-up text-success";
      case "down":
        return "fa-solid fa-arrow-down text-danger";
      default:
        return "fa-solid fa-minus text-muted";
    }
  }
  /**
   * Calculates percentage change
   */
  calculateChange(current, total) {
    if (!current || !total || total === 0)
      return 0;
    return Math.round(current / total * 100);
  }
  /**
   * Maps dashboard card color to StatGridItem variant
   */
  mapColorToVariant(color) {
    const variantMap = {
      "primary": "primary",
      "success": "success",
      "warning": "warning",
      "danger": "danger",
      "info": "info",
      "secondary": "secondary"
    };
    return variantMap[color] || "primary";
  }
  /**
   * Checks if user has specific permission
   */
  hasPermission(permission) {
    const user = this.currentUser();
    return user?.permissions?.includes(permission) || this.isSystemAdmin();
  }
  /**
   * Checks if user is system admin
   */
  isSystemAdmin() {
    const user = this.currentUser();
    return user?.roles?.includes("SystemAdmin") || false;
  }
  /**
   * Sets up error handling for dashboard service
   */
  setupErrorHandling() {
    effect(() => {
      const errorMsg = this.error();
      if (errorMsg) {
        this.notificationService.error(errorMsg);
      }
    });
  }
  /**
   * Loads filter options (branches, departments)
   */
  loadFilterOptions() {
  }
  /**
   * Export dashboard data to PDF/CSV (placeholder for future implementation)
   */
  exportDashboard(format) {
    this.notificationService.info(this.t("dashboard.export_not_implemented"));
  }
};
__name(_DashboardComponent, "DashboardComponent");
__publicField(_DashboardComponent, "\u0275fac", /* @__PURE__ */ __name(function DashboardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(I18nService), \u0275\u0275directiveInject(DashboardService), \u0275\u0275directiveInject(NotificationService));
}, "DashboardComponent_Factory"));
__publicField(_DashboardComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 23, vars: 14, consts: [[1, "dashboard-container"], [3, "title"], [1, "dashboard-controls", "mb-4"], [1, "d-flex", "justify-content-between", "align-items-start"], [1, "welcome-section"], [1, "dashboard-subtitle", "mb-0"], [1, "text-muted"], [1, "controls-section"], [1, "d-flex", "align-items-center", "gap-3"], [1, "btn", "btn-outline-primary", "btn-sm", 3, "click", "disabled"], [1, "fa-solid", "fa-refresh"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "autoRefreshToggle", 1, "form-check-input", 3, "change", "checked"], ["for", "autoRefreshToggle", 1, "form-check-label"], [1, "d-flex", "gap-2"], [1, "form-select", "form-select-sm", 3, "value"], [1, "loading-overlay"], ["role", "alert", 1, "alert", "alert-danger"], [1, "fa-solid", "fa-clock", "me-1"], [1, "form-select", "form-select-sm", 3, "change", "value"], ["value", ""], [3, "value"], [1, "loading-content"], [3, "message", "variant", "centered"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], [1, "btn", "btn-sm", "btn-outline-danger", "ms-2", 3, "click"], [1, "metrics-section"], [1, "section-title"], [3, "stats", "columns", "loading"], [1, "widgets-section"], [1, "widgets-grid"], [1, "widget", "attendance-widget"], [1, "widget", "hr-widget"], [1, "widget", "vacation-widget"], [1, "widget", "organization-widget"], [1, "widget", "shift-widget"], [1, "widget", "system-widget"], [1, "auto-refresh-settings"], [1, "widget-header"], [1, "fa-solid", "fa-calendar-check", "me-2"], [1, "widget-content"], [1, "attendance-stats"], [1, "stat-item"], [1, "stat-label"], [1, "stat-value", "text-success"], [1, "stat-value", "text-danger"], [1, "stat-value", "text-warning"], [1, "stat-value", "text-primary"], [1, "incomplete-records", "mt-3"], [1, "records-list"], [1, "record-item"], [1, "employee-name"], [1, "employee-status", "badge", "bg-warning"], [1, "fa-solid", "fa-users", "me-2"], [1, "hr-stats"], [1, "stat-row"], [1, "stat-value"], [1, "role-distribution", "mt-3"], [1, "role-item"], [1, "role-name"], [1, "role-count"], [1, "role-percentage"], [1, "fa-solid", "fa-calendar-times", "me-2"], [1, "vacation-stats"], [1, "stat-value", "text-info"], [1, "upcoming-vacations", "mt-3"], [1, "vacation-item"], [1, "vacation-type"], [1, "vacation-dates"], [1, "fa-solid", "fa-sitemap", "me-2"], [1, "org-stats"], [1, "fa-solid", "fa-clock", "me-2"], [1, "shift-stats"], [1, "fa-solid", "fa-server", "me-2"], [1, "system-stats"], [1, "recent-activities", "mt-3"], [1, "activity-item"], [1, "activity-description"], [1, "activity-time"], [1, "settings-card"], ["for", "refreshInterval", 1, "form-label"], ["id", "refreshInterval", 1, "form-select", "form-select-sm", 3, "change", "value"]], template: /* @__PURE__ */ __name(function DashboardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "p", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, DashboardComponent_Conditional_7_Template, 3, 2, "small", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "button", 9);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DashboardComponent_Template_button_click_10_listener() {
      return ctx.refreshData();
    }, "DashboardComponent_Template_button_click_10_listener"));
    \u0275\u0275element(11, "i", 10);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 11)(14, "input", 12);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DashboardComponent_Template_input_change_14_listener() {
      return ctx.toggleAutoRefresh();
    }, "DashboardComponent_Template_input_change_14_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "label", 13);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 14);
    \u0275\u0275conditionalCreate(18, DashboardComponent_Conditional_18_Template, 5, 2, "select", 15);
    \u0275\u0275conditionalCreate(19, DashboardComponent_Conditional_19_Template, 5, 2, "select", 15);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(20, DashboardComponent_Conditional_20_Template, 3, 3, "div", 16);
    \u0275\u0275conditionalCreate(21, DashboardComponent_Conditional_21_Template, 5, 2, "div", 17);
    \u0275\u0275conditionalCreate(22, DashboardComponent_Conditional_22_Template, 13, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("dashboard.title"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.t("dashboard.welcome"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.lastRefresh() ? 7 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-spin", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("dashboard.refresh"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx.autoRefresh());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("dashboard.auto_refresh"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.availableBranches().length > 1 ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.availableDepartments().length > 1 ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() && !ctx.loading() ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 22 : -1);
  }
}, "DashboardComponent_Template"), dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, PageHeaderComponent, LoadingSpinnerComponent, StatsGridComponent, DecimalPipe, DatePipe], styles: ['\n\n.dashboard-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 120px);\n  padding: 1.5rem;\n  background-color: var(--bs-light);\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  background: white;\n  color: var(--bs-dark);\n  border-radius: 0.5rem;\n  padding: 2rem;\n  margin-bottom: 2rem;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n.title-section[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.dashboard-title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: var(--bs-primary);\n}\n.dashboard-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--bs-secondary);\n  margin-bottom: 0;\n}\n.header-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.refresh-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.auto-refresh-toggle[_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%] {\n  color: var(--bs-dark);\n  font-weight: 500;\n}\n.filter-section[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.refresh-info[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid var(--bs-border-color);\n}\n.loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.9);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1050;\n}\n.loading-content[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  background: white;\n  border-radius: 1rem;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n.loading-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--bs-secondary);\n  font-weight: 500;\n}\n.metrics-section[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n  margin-bottom: 1.5rem;\n  padding-left: 1rem;\n  border-left: 4px solid var(--bs-primary);\n}\n.metrics-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n}\n.metric-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transition: box-shadow 0.15s ease-in-out;\n  position: relative;\n  overflow: hidden;\n}\n.metric-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: var(--accent-color, var(--bs-primary));\n}\n.metric-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.metric-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.metric-card[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  color: white;\n  background: var(--accent-color, var(--bs-primary));\n}\n.trend-indicator[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.metric-value[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: var(--bs-dark);\n  line-height: 1;\n  margin-bottom: 0.5rem;\n}\n.metric-title[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--bs-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 0.5rem;\n}\n.metric-change[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--bs-success);\n}\n.card-primary[_ngcontent-%COMP%] {\n  --accent-color: var(--bs-primary);\n}\n.card-success[_ngcontent-%COMP%] {\n  --accent-color: var(--bs-success);\n}\n.card-info[_ngcontent-%COMP%] {\n  --accent-color: var(--bs-info);\n}\n.card-warning[_ngcontent-%COMP%] {\n  --accent-color: var(--bs-warning);\n}\n.card-danger[_ngcontent-%COMP%] {\n  --accent-color: var(--bs-danger);\n}\n.card-secondary[_ngcontent-%COMP%] {\n  --accent-color: var(--bs-secondary);\n}\n.widgets-section[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.widgets-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 2rem;\n}\n.widget[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  overflow: hidden;\n  transition: box-shadow 0.15s ease-in-out;\n}\n.widget[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.widget-header[_ngcontent-%COMP%] {\n  background-color: rgba(var(--bs-primary-rgb), 0.1);\n  border-bottom: 1px solid rgba(var(--bs-primary-rgb), 0.2);\n  padding: 1.5rem;\n}\n.widget-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.widget-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.attendance-stats[_ngcontent-%COMP%], \n.vacation-stats[_ngcontent-%COMP%], \n.shift-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.stat-item[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 0.5rem;\n}\n.stat-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--bs-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 0.5rem;\n}\n.stat-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: var(--bs-dark);\n}\n.hr-stats[_ngcontent-%COMP%], \n.org-stats[_ngcontent-%COMP%], \n.system-stats[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.stat-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  background: #f8f9fa;\n  border-radius: 0.5rem;\n}\n.stat-row[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: var(--bs-dark);\n  text-transform: none;\n  letter-spacing: normal;\n  margin: 0;\n}\n.stat-row[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.records-list[_ngcontent-%COMP%], \n.recent-activities[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n}\n.record-item[_ngcontent-%COMP%], \n.activity-item[_ngcontent-%COMP%], \n.vacation-item[_ngcontent-%COMP%], \n.role-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  gap: 1rem;\n}\n.record-item[_ngcontent-%COMP%]:last-child, \n.activity-item[_ngcontent-%COMP%]:last-child, \n.vacation-item[_ngcontent-%COMP%]:last-child, \n.role-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.employee-name[_ngcontent-%COMP%], \n.activity-description[_ngcontent-%COMP%], \n.role-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-dark);\n  flex: 1;\n}\n.employee-status[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.vacation-type[_ngcontent-%COMP%], \n.vacation-dates[_ngcontent-%COMP%], \n.activity-time[_ngcontent-%COMP%], \n.role-percentage[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--bs-secondary);\n}\n.role-count[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-primary);\n}\n.auto-refresh-settings[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  z-index: 1000;\n}\n.settings-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  min-width: 200px;\n}\n.settings-card[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n  margin-bottom: 0.5rem;\n}\n@media (max-width: 1200px) {\n  .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  }\n  .widgets-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n  }\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .dashboard-header[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .dashboard-title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .header-controls[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n  .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .widgets-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .metric-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .metric-value[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .attendance-stats[_ngcontent-%COMP%], \n   .vacation-stats[_ngcontent-%COMP%], \n   .shift-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 0.5rem;\n  }\n  .stat-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .stat-value[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .auto-refresh-settings[_ngcontent-%COMP%] {\n    position: relative;\n    bottom: auto;\n    right: auto;\n    margin-top: 2rem;\n  }\n}\n@media (max-width: 480px) {\n  .dashboard-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .header-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .refresh-section[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n  .filter-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .attendance-stats[_ngcontent-%COMP%], \n   .vacation-stats[_ngcontent-%COMP%], \n   .shift-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .stat-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 0.5rem;\n  }\n  .record-item[_ngcontent-%COMP%], \n   .activity-item[_ngcontent-%COMP%], \n   .vacation-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .section-title[_ngcontent-%COMP%] {\n  padding-right: 1rem;\n  padding-left: 0;\n  border-right: 4px solid var(--bs-primary);\n  border-left: none;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-1[_ngcontent-%COMP%] {\n  margin-left: 0.25rem !important;\n  margin-right: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-2[_ngcontent-%COMP%] {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .ms-2[_ngcontent-%COMP%] {\n  margin-right: 0.5rem !important;\n  margin-left: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .auto-refresh-settings[_ngcontent-%COMP%] {\n  right: auto;\n  left: 2rem;\n}\n.metric-card[_ngcontent-%COMP%]:focus, \n.widget[_ngcontent-%COMP%]:focus {\n  outline: 2px solid var(--bs-primary);\n  outline-offset: 2px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .metric-card[_ngcontent-%COMP%], \n   .widget[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .metric-card[_ngcontent-%COMP%]:hover, \n   .widget[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n  .fa-spin[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] }));
var DashboardComponent = _DashboardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, StatsGridComponent], template: `<div class="dashboard-container">
  <!-- Page Header -->
  <app-page-header
    [title]="t('dashboard.title')">
  </app-page-header>

  <!-- Dashboard Controls -->
  <div class="dashboard-controls mb-4">
    <div class="d-flex justify-content-between align-items-start">
      <div class="welcome-section">
        <p class="dashboard-subtitle mb-0">{{ t('dashboard.welcome') }}</p>
        @if (lastRefresh()) {
          <small class="text-muted">
            <i class="fa-solid fa-clock me-1"></i>
            {{ t('dashboard.last_refresh') }}: {{ getTimeSinceLastRefresh() }}
          </small>
        }
      </div>

      <div class="controls-section">
        <!-- Refresh Controls -->
        <div class="d-flex align-items-center gap-3">
          <button
            class="btn btn-outline-primary btn-sm"
            (click)="refreshData()"
            [disabled]="loading()">
            <i class="fa-solid fa-refresh" [class.fa-spin]="loading()"></i>
            {{ t('dashboard.refresh') }}
          </button>

          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="autoRefreshToggle"
              [checked]="autoRefresh()"
              (change)="toggleAutoRefresh()">
            <label class="form-check-label" for="autoRefreshToggle">
              {{ t('dashboard.auto_refresh') }}
            </label>
          </div>

          <!-- Filters -->
          <div class="d-flex gap-2">
            @if (availableBranches().length > 1) {
              <select
                class="form-select form-select-sm"
                [value]="filters().branchId || ''"
                (change)="updateFilters({ branchId: $any($event.target).value ? +$any($event.target).value : undefined })">
                <option value="">{{ t('dashboard.all_branches') }}</option>
                @for (branch of availableBranches(); track branch.id) {
                  <option [value]="branch.id">{{ branch.name }}</option>
                }
              </select>
            }

            @if (availableDepartments().length > 1) {
              <select
                class="form-select form-select-sm"
                [value]="filters().departmentId || ''"
                (change)="updateFilters({ departmentId: $any($event.target).value ? +$any($event.target).value : undefined })">
                <option value="">{{ t('dashboard.all_departments') }}</option>
                @for (dept of availableDepartments(); track dept.id) {
                  <option [value]="dept.id">{{ dept.name }}</option>
                }
              </select>
            }
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  @if (loading()) {
    <div class="loading-overlay">
      <div class="loading-content">
        <app-loading-spinner
          [message]="t('dashboard.loading_comprehensive')"
          [variant]="'primary'"
          [centered]="true">
        </app-loading-spinner>
      </div>
    </div>
  }

  <!-- Error State -->
  @if (error() && !loading()) {
    <div class="alert alert-danger" role="alert">
      <i class="fa-solid fa-exclamation-triangle me-2"></i>
      {{ error() }}
      <button class="btn btn-sm btn-outline-danger ms-2" (click)="refreshData()">
        {{ t('common.retry') }}
      </button>
    </div>
  }

  <!-- Dashboard Content -->
  @if (!loading() && !error()) {
    <!-- Key Metrics Cards -->
    <div class="metrics-section">
      <h2 class="section-title">{{ t('dashboard.key_metrics') }}</h2>
      <app-stats-grid
        [stats]="dashboardStats()"
        [columns]="4"
        [loading]="loading()">
      </app-stats-grid>
    </div>

    <!-- Widget Sections -->
    <div class="widgets-section">
      <div class="widgets-grid">

        <!-- Attendance Widget -->
        @if (showAttendanceWidget() && dashboardData()?.attendance) {
          <div class="widget attendance-widget">
            <div class="widget-header">
              <h3><i class="fa-solid fa-calendar-check me-2"></i>{{ t('dashboard.attendance_overview') }}</h3>
            </div>
            <div class="widget-content">
              <div class="attendance-stats">
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.present_today') }}</span>
                  <span class="stat-value text-success">{{ dashboardData()?.attendance.todayPresent || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.absent_today') }}</span>
                  <span class="stat-value text-danger">{{ dashboardData()?.attendance.todayAbsent || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.late_today') }}</span>
                  <span class="stat-value text-warning">{{ dashboardData()?.attendance.todayLate || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.attendance_rate') }}</span>
                  <span class="stat-value text-primary">{{ (dashboardData()?.attendance.attendanceRate || 0) | number:'1.1-1' }}%</span>
                </div>
              </div>

              @if (dashboardData()?.attendance?.incompleteRecords?.length) {
                <div class="incomplete-records mt-3">
                  <h5>{{ t('dashboard.incomplete_records') }}</h5>
                  <div class="records-list">
                    @for (record of dashboardData()?.attendance?.incompleteRecords?.slice(0, 5) || []; track record.employeeId) {
                      <div class="record-item">
                        <span class="employee-name">{{ record.employeeName }}</span>
                        <span class="employee-status badge bg-warning">{{ record.status }}</span>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Human Resources Widget -->
        @if (showHumanResourcesWidget() && dashboardData()?.humanResources) {
          <div class="widget hr-widget">
            <div class="widget-header">
              <h3><i class="fa-solid fa-users me-2"></i>{{ t('dashboard.human_resources') }}</h3>
            </div>
            <div class="widget-content">
              <div class="hr-stats">
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.total_employees') }}</span>
                  <span class="stat-value">{{ dashboardData()?.humanResources.totalEmployees || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.active_employees') }}</span>
                  <span class="stat-value text-success">{{ dashboardData()?.humanResources.activeEmployees || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.total_users') }}</span>
                  <span class="stat-value">{{ dashboardData()?.humanResources.totalUsers || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.active_users') }}</span>
                  <span class="stat-value text-success">{{ dashboardData()?.humanResources.activeUsers || 0 }}</span>
                </div>
              </div>

              @if (dashboardData()?.humanResources?.roleDistribution?.length) {
                <div class="role-distribution mt-3">
                  <h5>{{ t('dashboard.role_distribution') }}</h5>
                  @for (role of dashboardData()?.humanResources?.roleDistribution?.slice(0, 4) || []; track role.roleName) {
                    <div class="role-item">
                      <span class="role-name">{{ role.roleName }}</span>
                      <span class="role-count">{{ role.userCount }}</span>
                      <span class="role-percentage">({{ role.percentage | number:'1.0-0' }}%)</span>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- Vacation/Leave Widget -->
        @if (showVacationWidget() && dashboardData()?.leaves) {
          <div class="widget vacation-widget">
            <div class="widget-header">
              <h3><i class="fa-solid fa-calendar-times me-2"></i>{{ t('dashboard.leave_management') }}</h3>
            </div>
            <div class="widget-content">
              <div class="vacation-stats">
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.pending_requests') }}</span>
                  <span class="stat-value text-warning">{{ dashboardData()?.leaves.pendingRequests || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.on_leave_today') }}</span>
                  <span class="stat-value text-info">{{ dashboardData()?.leaves.onLeaveToday || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.approved_today') }}</span>
                  <span class="stat-value text-success">{{ dashboardData()?.leaves.approvedToday || 0 }}</span>
                </div>
              </div>

              @if (dashboardData()?.leaves?.upcomingVacations?.length) {
                <div class="upcoming-vacations mt-3">
                  <h5>{{ t('dashboard.upcoming_vacations') }}</h5>
                  @for (vacation of dashboardData()?.leaves?.upcomingVacations?.slice(0, 3) || []; track vacation.vacationId) {
                    <div class="vacation-item">
                      <span class="employee-name">{{ vacation.employeeName }}</span>
                      <span class="vacation-type">{{ vacation.vacationType }}</span>
                      <span class="vacation-dates">{{ vacation.startDate | date:'shortDate' }} - {{ vacation.endDate | date:'shortDate' }}</span>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- Organization Widget -->
        @if (showOrganizationWidget() && dashboardData()?.organization) {
          <div class="widget organization-widget">
            <div class="widget-header">
              <h3><i class="fa-solid fa-sitemap me-2"></i>{{ t('dashboard.organization_structure') }}</h3>
            </div>
            <div class="widget-content">
              <div class="org-stats">
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.total_branches') }}</span>
                  <span class="stat-value">{{ dashboardData()?.organization.totalBranches || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.active_branches') }}</span>
                  <span class="stat-value text-success">{{ dashboardData()?.organization.activeBranches || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.total_departments') }}</span>
                  <span class="stat-value">{{ dashboardData()?.organization.totalDepartments || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.active_departments') }}</span>
                  <span class="stat-value text-success">{{ dashboardData()?.organization.activeDepartments || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Shift Management Widget -->
        @if (showShiftWidget() && dashboardData()?.shifts) {
          <div class="widget shift-widget">
            <div class="widget-header">
              <h3><i class="fa-solid fa-clock me-2"></i>{{ t('dashboard.shift_management') }}</h3>
            </div>
            <div class="widget-content">
              <div class="shift-stats">
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.active_shifts') }}</span>
                  <span class="stat-value">{{ dashboardData()?.shifts.activeShifts || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.total_assignments') }}</span>
                  <span class="stat-value">{{ dashboardData()?.shifts.totalShiftAssignments || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">{{ t('dashboard.today_coverage') }}</span>
                  <span class="stat-value text-success">{{ dashboardData()?.shifts.todayCoverage || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- System Health Widget -->
        @if (showSystemWidget() && dashboardData()?.system) {
          <div class="widget system-widget">
            <div class="widget-header">
              <h3><i class="fa-solid fa-server me-2"></i>{{ t('dashboard.system_health') }}</h3>
            </div>
            <div class="widget-content">
              <div class="system-stats">
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.active_sessions') }}</span>
                  <span class="stat-value text-success">{{ dashboardData()?.system.activeSessions || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.today_logins') }}</span>
                  <span class="stat-value">{{ dashboardData()?.system.todayLogins || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">{{ t('dashboard.system_uptime') }}</span>
                  <span class="stat-value text-info">{{ dashboardData()?.system.systemUptime || 'N/A' }}</span>
                </div>
              </div>

              @if (dashboardData()?.system?.recentActivities?.length) {
                <div class="recent-activities mt-3">
                  <h5>{{ t('dashboard.recent_activities') }}</h5>
                  @for (activity of dashboardData()?.system?.recentActivities?.slice(0, 3) || []; track activity.id) {
                    <div class="activity-item">
                      <span class="activity-description">{{ activity.description }}</span>
                      <span class="activity-time">{{ activity.timestamp | date:'short' }}</span>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }

      </div>
    </div>

    <!-- Auto-refresh settings -->
    @if (autoRefresh()) {
      <div class="auto-refresh-settings">
        <div class="settings-card">
          <label for="refreshInterval" class="form-label">{{ t('dashboard.refresh_interval') }}</label>
          <select
            id="refreshInterval"
            class="form-select form-select-sm"
            [value]="dashboardService.refreshInterval()"
            (change)="updateRefreshInterval(+($any($event.target).value))">
            @for (interval of refreshIntervals; track interval.value) {
              <option [value]="interval.value">{{ interval.label }}</option>
            }
          </select>
        </div>
      </div>
    }
  }`, styles: ['/* src/app/pages/dashboard/dashboard.component.css */\n.dashboard-container {\n  min-height: calc(100vh - 120px);\n  padding: 1.5rem;\n  background-color: var(--bs-light);\n}\n.dashboard-header {\n  background: white;\n  color: var(--bs-dark);\n  border-radius: 0.5rem;\n  padding: 2rem;\n  margin-bottom: 2rem;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.header-content {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n.title-section {\n  flex: 1;\n  min-width: 200px;\n}\n.dashboard-title {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: var(--bs-primary);\n}\n.dashboard-subtitle {\n  font-size: 1.1rem;\n  color: var(--bs-secondary);\n  margin-bottom: 0;\n}\n.header-controls {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.refresh-section {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.auto-refresh-toggle .form-check-label {\n  color: var(--bs-dark);\n  font-weight: 500;\n}\n.filter-section {\n  display: flex;\n  gap: 0.5rem;\n}\n.refresh-info {\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid var(--bs-border-color);\n}\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.9);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1050;\n}\n.loading-content {\n  text-align: center;\n  padding: 2rem;\n  background: white;\n  border-radius: 1rem;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n.loading-content p {\n  margin: 0;\n  color: var(--bs-secondary);\n  font-weight: 500;\n}\n.metrics-section {\n  margin-bottom: 2rem;\n}\n.section-title {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n  margin-bottom: 1.5rem;\n  padding-left: 1rem;\n  border-left: 4px solid var(--bs-primary);\n}\n.metrics-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n}\n.metric-card {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transition: box-shadow 0.15s ease-in-out;\n  position: relative;\n  overflow: hidden;\n}\n.metric-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: var(--accent-color, var(--bs-primary));\n}\n.metric-card:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.metric-card .card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.metric-card .card-icon {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  color: white;\n  background: var(--accent-color, var(--bs-primary));\n}\n.trend-indicator {\n  font-size: 1.2rem;\n}\n.metric-value {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: var(--bs-dark);\n  line-height: 1;\n  margin-bottom: 0.5rem;\n}\n.metric-title {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--bs-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 0.5rem;\n}\n.metric-change {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--bs-success);\n}\n.card-primary {\n  --accent-color: var(--bs-primary);\n}\n.card-success {\n  --accent-color: var(--bs-success);\n}\n.card-info {\n  --accent-color: var(--bs-info);\n}\n.card-warning {\n  --accent-color: var(--bs-warning);\n}\n.card-danger {\n  --accent-color: var(--bs-danger);\n}\n.card-secondary {\n  --accent-color: var(--bs-secondary);\n}\n.widgets-section {\n  margin-bottom: 2rem;\n}\n.widgets-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 2rem;\n}\n.widget {\n  background: white;\n  border-radius: 0.5rem;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  overflow: hidden;\n  transition: box-shadow 0.15s ease-in-out;\n}\n.widget:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.widget-header {\n  background-color: rgba(var(--bs-primary-rgb), 0.1);\n  border-bottom: 1px solid rgba(var(--bs-primary-rgb), 0.2);\n  padding: 1.5rem;\n}\n.widget-header h3 {\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.widget-content {\n  padding: 1.5rem;\n}\n.attendance-stats,\n.vacation-stats,\n.shift-stats {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.stat-item {\n  text-align: center;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 0.5rem;\n}\n.stat-label {\n  display: block;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--bs-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 0.5rem;\n}\n.stat-value {\n  display: block;\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: var(--bs-dark);\n}\n.hr-stats,\n.org-stats,\n.system-stats {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.stat-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  background: #f8f9fa;\n  border-radius: 0.5rem;\n}\n.stat-row .stat-label {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: var(--bs-dark);\n  text-transform: none;\n  letter-spacing: normal;\n  margin: 0;\n}\n.stat-row .stat-value {\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.records-list,\n.recent-activities {\n  max-height: 200px;\n  overflow-y: auto;\n}\n.record-item,\n.activity-item,\n.vacation-item,\n.role-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  gap: 1rem;\n}\n.record-item:last-child,\n.activity-item:last-child,\n.vacation-item:last-child,\n.role-item:last-child {\n  border-bottom: none;\n}\n.employee-name,\n.activity-description,\n.role-name {\n  font-weight: 500;\n  color: var(--bs-dark);\n  flex: 1;\n}\n.employee-status {\n  font-size: 0.75rem;\n}\n.vacation-type,\n.vacation-dates,\n.activity-time,\n.role-percentage {\n  font-size: 0.85rem;\n  color: var(--bs-secondary);\n}\n.role-count {\n  font-weight: 600;\n  color: var(--bs-primary);\n}\n.auto-refresh-settings {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  z-index: 1000;\n}\n.settings-card {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  min-width: 200px;\n}\n.settings-card .form-label {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n  margin-bottom: 0.5rem;\n}\n@media (max-width: 1200px) {\n  .metrics-grid {\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  }\n  .widgets-grid {\n    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n  }\n}\n@media (max-width: 768px) {\n  .dashboard-container {\n    padding: 1rem;\n  }\n  .dashboard-header {\n    padding: 1.5rem;\n  }\n  .header-content {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .dashboard-title {\n    font-size: 2rem;\n  }\n  .header-controls {\n    width: 100%;\n    justify-content: space-between;\n  }\n  .metrics-grid {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .widgets-grid {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .metric-card {\n    padding: 1rem;\n  }\n  .metric-value {\n    font-size: 2rem;\n  }\n  .attendance-stats,\n  .vacation-stats,\n  .shift-stats {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 0.5rem;\n  }\n  .stat-item {\n    padding: 0.75rem;\n  }\n  .stat-value {\n    font-size: 1.5rem;\n  }\n  .auto-refresh-settings {\n    position: relative;\n    bottom: auto;\n    right: auto;\n    margin-top: 2rem;\n  }\n}\n@media (max-width: 480px) {\n  .dashboard-title {\n    font-size: 1.5rem;\n  }\n  .header-controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .refresh-section {\n    justify-content: space-between;\n  }\n  .filter-section {\n    flex-direction: column;\n  }\n  .attendance-stats,\n  .vacation-stats,\n  .shift-stats {\n    grid-template-columns: 1fr;\n  }\n  .stat-row {\n    flex-direction: column;\n    text-align: center;\n    gap: 0.5rem;\n  }\n  .record-item,\n  .activity-item,\n  .vacation-item {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n}\n:root[dir=rtl] .section-title {\n  padding-right: 1rem;\n  padding-left: 0;\n  border-right: 4px solid var(--bs-primary);\n  border-left: none;\n}\n:root[dir=rtl] .me-1 {\n  margin-left: 0.25rem !important;\n  margin-right: 0 !important;\n}\n:root[dir=rtl] .me-2 {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n:root[dir=rtl] .ms-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0 !important;\n}\n:root[dir=rtl] .auto-refresh-settings {\n  right: auto;\n  left: 2rem;\n}\n.metric-card:focus,\n.widget:focus {\n  outline: 2px solid var(--bs-primary);\n  outline-offset: 2px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .metric-card,\n  .widget {\n    animation: none;\n  }\n  .metric-card:hover,\n  .widget:hover {\n    transform: none;\n  }\n  .fa-spin {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: I18nService }, { type: DashboardService }, { type: NotificationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/pages/dashboard/dashboard.component.ts", lineNumber: 29 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-6OPECNJS.js.map
