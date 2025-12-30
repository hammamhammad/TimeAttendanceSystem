import {
  LeaveBalanceService
} from "./chunk-WL4EZF3O.js";
import {
  DefinitionListComponent
} from "./chunk-I7HA6QL2.js";
import {
  FormHeaderComponent
} from "./chunk-KM5VSJTZ.js";
import {
  EmploymentStatus,
  Gender,
  WorkLocationType
} from "./chunk-LZPEC357.js";
import {
  EmployeesService
} from "./chunk-IR2IKZBB.js";
import {
  HasPermissionDirective
} from "./chunk-Q7GSD2OQ.js";
import {
  EmptyStateComponent
} from "./chunk-5ZV3Z4IV.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
import {
  ConfirmationService
} from "./chunk-NUNE7G5P.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import {
  PermissionActions,
  PermissionResources
} from "./chunk-6LEZROWG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-GSKH2KOG.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import "./chunk-HZ2IZU2F.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  Input,
  computed,
  effect,
  inject,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate6,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/components/leave-balance-summary/leave-balance-summary.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.vacationTypeId, "_forTrack0");
function LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const year_r3 = ctx.$implicit;
    \u0275\u0275property("value", year_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(year_r3);
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_For_2_Template, "LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_For_2_Template");
function LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 7);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedYear, $event) || (ctx_r1.selectedYear = $event);
      return \u0275\u0275resetView($event);
    }, "LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_Template_select_ngModelChange_0_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_Template_select_ngModelChange_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onYearChange());
    }, "LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_Template_select_ngModelChange_0_listener"));
    \u0275\u0275repeaterCreate(1, LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_For_2_Template, 2, 2, "option", 8, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedYear);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.availableYears());
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_Template, "LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_Template");
function LeaveBalanceSummaryComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "h4", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, LeaveBalanceSummaryComponent_Conditional_1_Conditional_3_Template, 3, 1, "select", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.balanceSummary"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showYearSelector ? 3 : -1);
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_1_Template, "LeaveBalanceSummaryComponent_Conditional_1_Template");
function LeaveBalanceSummaryComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner");
    \u0275\u0275elementEnd();
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_2_Template, "LeaveBalanceSummaryComponent_Conditional_2_Template");
function LeaveBalanceSummaryComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 3);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("icon", "bi-calendar-x")("title", ctx_r1.i18n.t("leaveBalance.noBalancesTitle"))("message", ctx_r1.i18n.t("leaveBalance.noBalancesMessage"))("size", "sm");
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_3_Template, "LeaveBalanceSummaryComponent_Conditional_3_Template");
function LeaveBalanceSummaryComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 12)(2, "div", 13)(3, "div", 14)(4, "div", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 13)(9, "div", 14)(10, "div", 15);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 17);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 13)(15, "div", 14)(16, "div", 15);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 18);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 13)(21, "div", 14)(22, "div", 15);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 19);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 13)(27, "div", 14)(28, "div", 15);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 20);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.totalEntitled"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTotalStats().entitled);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.totalAccrued"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTotalStats().accrued);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.totalUsed"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTotalStats().used);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.totalPending"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTotalStats().pending);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.totalAvailable"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTotalStats().available);
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_4_Conditional_1_Template, "LeaveBalanceSummaryComponent_Conditional_4_Conditional_1_Template");
function LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37)(2, "small", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39);
    \u0275\u0275element(7, "div", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 41)(9, "div", 37)(10, "small", 38);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 38);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 39);
    \u0275\u0275element(15, "div", 42);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const balance_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.accrualProgress"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.getAccrualPercentage(balance_r4), "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.getAccrualPercentage(balance_r4), "%");
    \u0275\u0275attribute("aria-valuenow", ctx_r1.getAccrualPercentage(balance_r4));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.usageProgress"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.getUsagePercentage(balance_r4), "%");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getProgressBarClass(balance_r4));
    \u0275\u0275styleProp("width", ctx_r1.getUsagePercentage(balance_r4), "%");
    \u0275\u0275attribute("aria-valuenow", ctx_r1.getUsagePercentage(balance_r4));
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_32_Template, "LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_32_Template");
function LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "small", 38);
    \u0275\u0275element(2, "i", 45);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const balance_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r1.i18n.t("leaveBalance.carryOver"), ": ", balance_r4.carryOverDays, " ");
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_2_Template, "LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_2_Template");
function LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "small", 38);
    \u0275\u0275element(2, "i", 46);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const balance_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r1.i18n.t("leaveBalance.lastAccrual"), ": ", ctx_r1.formatLastAccrualDate(balance_r4.lastAccrualDate), " ");
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_3_Template, "LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_3_Template");
function LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "small", 47);
    \u0275\u0275element(2, "i", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("leaveBalance.expiresWarning"), " ");
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_4_Template, "LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_4_Template");
function LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 27);
    \u0275\u0275conditionalCreate(2, LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_2_Template, 4, 2, "div", 43);
    \u0275\u0275conditionalCreate(3, LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_3_Template, 4, 2, "div", 43);
    \u0275\u0275conditionalCreate(4, LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Conditional_4_Template, 4, 1, "div", 44);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const balance_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(balance_r4.carryOverDays > 0 ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(balance_r4.lastAccrualDate ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(balance_r4.expiresAtYearEnd ? 4 : -1);
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Template, "LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Template");
function LeaveBalanceSummaryComponent_Conditional_4_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "div", 23)(3, "h5", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "app-status-badge", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 26)(7, "div", 27)(8, "div", 28)(9, "div", 29)(10, "span", 30);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 31);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 28)(15, "div", 29)(16, "span", 30);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 32);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 28)(21, "div", 29)(22, "span", 30);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 33);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 28)(27, "div", 29)(28, "span", 30);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 34);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(32, LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_32_Template, 16, 12);
    \u0275\u0275conditionalCreate(33, LeaveBalanceSummaryComponent_Conditional_4_For_4_Conditional_33_Template, 5, 3, "div", 35);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const balance_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("compact-card", ctx_r1.compact);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(balance_r4.vacationTypeName);
    \u0275\u0275advance();
    \u0275\u0275property("status", balance_r4.currentBalance.toString() + " " + ctx_r1.i18n.t("leaveBalance.daysAvailable"))("variant", ctx_r1.getBalanceBadgeVariant(balance_r4));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.entitled"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(balance_r4.entitledDays);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.accrued"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(balance_r4.accruedDays);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.used"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(balance_r4.usedDays);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.pending"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(balance_r4.pendingDays);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.compact ? 32 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.compact ? 33 : -1);
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_4_For_4_Template, "LeaveBalanceSummaryComponent_Conditional_4_For_4_Template");
function LeaveBalanceSummaryComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275conditionalCreate(1, LeaveBalanceSummaryComponent_Conditional_4_Conditional_1_Template, 32, 10, "div", 9);
    \u0275\u0275elementStart(2, "div", 10);
    \u0275\u0275repeaterCreate(3, LeaveBalanceSummaryComponent_Conditional_4_For_4_Template, 34, 15, "div", 11, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.compact && ctx_r1.getTotalStats() ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater((tmp_2_0 = ctx_r1.summary()) == null ? null : tmp_2_0.vacationTypeBalances);
  }
}
__name(LeaveBalanceSummaryComponent_Conditional_4_Template, "LeaveBalanceSummaryComponent_Conditional_4_Template");
var _LeaveBalanceSummaryComponent = class _LeaveBalanceSummaryComponent {
  leaveBalanceService = inject(LeaveBalanceService);
  i18n = inject(I18nService);
  // Input properties
  employeeId;
  showYearSelector = true;
  showHeader = true;
  compact = false;
  // Compact mode for widgets
  // State
  selectedYear = signal((/* @__PURE__ */ new Date()).getFullYear(), ...ngDevMode ? [{ debugName: "selectedYear" }] : []);
  loading = this.leaveBalanceService.loading;
  summary = this.leaveBalanceService.balanceSummary;
  // Available years for selector
  availableYears = signal([], ...ngDevMode ? [{ debugName: "availableYears" }] : []);
  // Computed properties
  hasBalances = computed(() => {
    const summaryData = this.summary();
    return summaryData && summaryData.vacationTypeBalances.length > 0;
  }, ...ngDevMode ? [{ debugName: "hasBalances" }] : []);
  constructor() {
    effect(() => {
      const year = this.selectedYear();
      if (this.employeeId) {
        this.loadBalanceSummary();
      }
    });
  }
  ngOnInit() {
    if (!this.employeeId) {
      console.error("LeaveBalanceSummaryComponent: employeeId is required");
      return;
    }
    this.generateAvailableYears();
    this.loadBalanceSummary();
  }
  /**
   * Generates list of available years (current year ± 2 years).
   */
  generateAvailableYears() {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const years = [];
    for (let i = -2; i <= 2; i++) {
      years.push(currentYear + i);
    }
    this.availableYears.set(years);
  }
  /**
   * Loads balance summary from the service.
   */
  loadBalanceSummary() {
    this.leaveBalanceService.getLeaveBalanceSummary(this.employeeId, this.selectedYear()).subscribe();
  }
  /**
   * Handles year selection change.
   */
  onYearChange() {
    this.loadBalanceSummary();
  }
  /**
   * Refreshes balance data.
   */
  refresh() {
    this.loadBalanceSummary();
  }
  /**
   * Calculates percentage of balance used.
   */
  getUsagePercentage(balance) {
    if (balance.entitledDays === 0)
      return 0;
    return Math.round(balance.usedDays / balance.entitledDays * 100);
  }
  /**
   * Calculates percentage of balance accrued.
   */
  getAccrualPercentage(balance) {
    if (balance.entitledDays === 0)
      return 0;
    return Math.round(balance.accruedDays / balance.entitledDays * 100);
  }
  /**
   * Gets progress bar color class based on remaining balance.
   */
  getProgressBarClass(balance) {
    const percentage = this.getUsagePercentage(balance);
    if (percentage >= 90)
      return "bg-danger";
    if (percentage >= 70)
      return "bg-warning";
    return "bg-success";
  }
  /**
   * Gets badge variant based on available balance.
   */
  getBalanceBadgeVariant(balance) {
    if (balance.currentBalance <= 0)
      return "danger";
    if (balance.currentBalance < 5)
      return "warning";
    return "success";
  }
  /**
   * Formats last accrual date.
   */
  formatLastAccrualDate(dateString) {
    if (!dateString)
      return this.i18n.t("common.notAvailable");
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  /**
   * Gets total statistics summary.
   */
  getTotalStats() {
    const summaryData = this.summary();
    if (!summaryData)
      return null;
    return {
      entitled: summaryData.totalEntitled,
      accrued: summaryData.totalAccrued,
      used: summaryData.totalUsed,
      pending: summaryData.totalPending,
      available: summaryData.totalAvailable
    };
  }
};
__name(_LeaveBalanceSummaryComponent, "LeaveBalanceSummaryComponent");
__publicField(_LeaveBalanceSummaryComponent, "\u0275fac", /* @__PURE__ */ __name(function LeaveBalanceSummaryComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LeaveBalanceSummaryComponent)();
}, "LeaveBalanceSummaryComponent_Factory"));
__publicField(_LeaveBalanceSummaryComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeaveBalanceSummaryComponent, selectors: [["app-leave-balance-summary"]], inputs: { employeeId: "employeeId", showYearSelector: "showYearSelector", showHeader: "showHeader", compact: "compact" }, decls: 5, vars: 6, consts: [[1, "leave-balance-summary"], [1, "summary-header"], [1, "text-center", "py-4"], [3, "icon", "title", "message", "size"], [1, "balance-content"], [1, "mb-0"], [1, "form-select", "form-select-sm", "year-selector", 3, "ngModel"], [1, "form-select", "form-select-sm", "year-selector", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "total-stats", "mb-4"], [1, "vacation-type-balances"], [1, "balance-card", 3, "compact-card"], [1, "row", "g-3"], [1, "col-6", "col-md-4", "col-lg-2"], [1, "stat-card"], [1, "stat-label"], [1, "stat-value", "text-primary"], [1, "stat-value", "text-info"], [1, "stat-value", "text-danger"], [1, "stat-value", "text-warning"], [1, "stat-value", "text-success"], [1, "balance-card"], [1, "balance-header"], [1, "d-flex", "align-items-center", "justify-content-between"], [1, "vacation-type-name", "mb-0"], [3, "status", "variant"], [1, "balance-details"], [1, "row", "g-2"], [1, "col-6", "col-md-3"], [1, "balance-item"], [1, "balance-label"], [1, "balance-value"], [1, "balance-value", "text-info"], [1, "balance-value", "text-danger"], [1, "balance-value", "text-warning"], [1, "additional-info", "mt-3"], [1, "progress-section", "mt-3"], [1, "d-flex", "justify-content-between", "mb-1"], [1, "text-muted"], [1, "progress", 2, "height", "8px"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-bar", "bg-info"], [1, "progress-section", "mt-2"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-bar"], [1, "col-6"], [1, "col-12"], [1, "bi", "bi-arrow-right-circle", "me-1"], [1, "bi", "bi-calendar-check", "me-1"], [1, "text-warning"], [1, "bi", "bi-exclamation-triangle", "me-1"]], template: /* @__PURE__ */ __name(function LeaveBalanceSummaryComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, LeaveBalanceSummaryComponent_Conditional_1_Template, 4, 2, "div", 1);
    \u0275\u0275conditionalCreate(2, LeaveBalanceSummaryComponent_Conditional_2_Template, 2, 0, "div", 2);
    \u0275\u0275conditionalCreate(3, LeaveBalanceSummaryComponent_Conditional_3_Template, 1, 4, "app-empty-state", 3);
    \u0275\u0275conditionalCreate(4, LeaveBalanceSummaryComponent_Conditional_4_Template, 5, 1, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275classProp("compact", ctx.compact);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showHeader ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.hasBalances() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.hasBalances() ? 4 : -1);
  }
}, "LeaveBalanceSummaryComponent_Template"), dependencies: [
  FormsModule,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  SelectControlValueAccessor,
  NgControlStatus,
  NgModel,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  StatusBadgeComponent
], styles: ["\n\n.leave-balance-summary[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n}\n.leave-balance-summary.compact[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.summary-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid #e9ecef;\n}\n.summary-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-weight: 600;\n  font-size: 1.25rem;\n}\n.year-selector[_ngcontent-%COMP%] {\n  width: auto;\n  min-width: 120px;\n}\n.total-stats[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border-radius: 0.5rem;\n  padding: 1.25rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 0.75rem;\n  background: #fff;\n  border-radius: 0.375rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6c757d;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 0.5rem;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n}\n.vacation-type-balances[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.balance-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.5rem;\n  padding: 1.25rem;\n  transition: all 0.2s ease-in-out;\n}\n.balance-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n  border-color: #adb5bd;\n}\n.balance-card.compact-card[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.balance-header[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.vacation-type-name[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.balance-details[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.balance-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.5rem;\n  background: #f8f9fa;\n  border-radius: 0.375rem;\n}\n.balance-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6c757d;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.balance-value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #495057;\n}\n.progress-section[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n}\n.progress[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  background-color: #e9ecef;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  transition: width 0.6s ease;\n}\n.additional-info[_ngcontent-%COMP%] {\n  padding-top: 1rem;\n  border-top: 1px solid #e9ecef;\n}\n.additional-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  line-height: 1.8;\n}\n.additional-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: #007bff !important;\n}\n.text-info[_ngcontent-%COMP%] {\n  color: #17a2b8 !important;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #dc3545 !important;\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #ffc107 !important;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #28a745 !important;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.leave-balance-summary.compact[_ngcontent-%COMP%]   .summary-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.leave-balance-summary.compact[_ngcontent-%COMP%]   .vacation-type-name[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.leave-balance-summary.compact[_ngcontent-%COMP%]   .balance-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.leave-balance-summary.compact[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n.leave-balance-summary.compact[_ngcontent-%COMP%]   .balance-card[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n}\n@media (max-width: 768px) {\n  .leave-balance-summary[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .summary-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: flex-start;\n  }\n  .year-selector[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .total-stats[_ngcontent-%COMP%]   .col-6[_ngcontent-%COMP%] {\n    width: 50%;\n  }\n  .balance-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .balance-item[_ngcontent-%COMP%] {\n    padding: 0.375rem;\n  }\n  .balance-value[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n  }\n  .stat-value[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n}\n@media (max-width: 576px) {\n  .total-stats[_ngcontent-%COMP%]   .col-6[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .balance-details[_ngcontent-%COMP%]   .col-6[_ngcontent-%COMP%] {\n    width: 50%;\n  }\n}\n/*# sourceMappingURL=leave-balance-summary.component.css.map */"] }));
var LeaveBalanceSummaryComponent = _LeaveBalanceSummaryComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeaveBalanceSummaryComponent, [{
    type: Component,
    args: [{ selector: "app-leave-balance-summary", standalone: true, imports: [
      FormsModule,
      LoadingSpinnerComponent,
      EmptyStateComponent,
      StatusBadgeComponent
    ], template: `<!-- Leave Balance Summary Component -->\r
<div class="leave-balance-summary" [class.compact]="compact">\r
  <!-- Header with Year Selector -->\r
  @if (showHeader) {\r
    <div class="summary-header">\r
      <h4 class="mb-0">{{ i18n.t('leaveBalance.balanceSummary') }}</h4>\r
      @if (showYearSelector) {\r
        <select\r
          class="form-select form-select-sm year-selector"\r
          [(ngModel)]="selectedYear"\r
          (ngModelChange)="onYearChange()">\r
          @for (year of availableYears(); track year) {\r
            <option [value]="year">{{ year }}</option>\r
          }\r
        </select>\r
      }\r
    </div>\r
  }\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-4">\r
      <app-loading-spinner></app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Empty State -->\r
  @if (!loading() && !hasBalances()) {\r
    <app-empty-state\r
      [icon]="'bi-calendar-x'"\r
      [title]="i18n.t('leaveBalance.noBalancesTitle')"\r
      [message]="i18n.t('leaveBalance.noBalancesMessage')"\r
      [size]="'sm'">\r
    </app-empty-state>\r
  }\r
\r
  <!-- Balance Summary Content -->\r
  @if (!loading() && hasBalances()) {\r
    <div class="balance-content">\r
      <!-- Total Statistics (Only in non-compact mode) -->\r
      @if (!compact && getTotalStats()) {\r
        <div class="total-stats mb-4">\r
          <div class="row g-3">\r
            <div class="col-6 col-md-4 col-lg-2">\r
              <div class="stat-card">\r
                <div class="stat-label">{{ i18n.t('leaveBalance.totalEntitled') }}</div>\r
                <div class="stat-value text-primary">{{ getTotalStats()!.entitled }}</div>\r
              </div>\r
            </div>\r
            <div class="col-6 col-md-4 col-lg-2">\r
              <div class="stat-card">\r
                <div class="stat-label">{{ i18n.t('leaveBalance.totalAccrued') }}</div>\r
                <div class="stat-value text-info">{{ getTotalStats()!.accrued }}</div>\r
              </div>\r
            </div>\r
            <div class="col-6 col-md-4 col-lg-2">\r
              <div class="stat-card">\r
                <div class="stat-label">{{ i18n.t('leaveBalance.totalUsed') }}</div>\r
                <div class="stat-value text-danger">{{ getTotalStats()!.used }}</div>\r
              </div>\r
            </div>\r
            <div class="col-6 col-md-4 col-lg-2">\r
              <div class="stat-card">\r
                <div class="stat-label">{{ i18n.t('leaveBalance.totalPending') }}</div>\r
                <div class="stat-value text-warning">{{ getTotalStats()!.pending }}</div>\r
              </div>\r
            </div>\r
            <div class="col-6 col-md-4 col-lg-2">\r
              <div class="stat-card">\r
                <div class="stat-label">{{ i18n.t('leaveBalance.totalAvailable') }}</div>\r
                <div class="stat-value text-success">{{ getTotalStats()!.available }}</div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Vacation Type Balances -->\r
      <div class="vacation-type-balances">\r
        @for (balance of summary()?.vacationTypeBalances; track balance.vacationTypeId) {\r
          <div class="balance-card" [class.compact-card]="compact">\r
            <!-- Vacation Type Header -->\r
            <div class="balance-header">\r
              <div class="d-flex align-items-center justify-content-between">\r
                <h5 class="vacation-type-name mb-0">{{ balance.vacationTypeName }}</h5>\r
                <app-status-badge\r
                  [status]="balance.currentBalance.toString() + ' ' + i18n.t('leaveBalance.daysAvailable')"\r
                  [variant]="getBalanceBadgeVariant(balance)">\r
                </app-status-badge>\r
              </div>\r
            </div>\r
\r
            <!-- Balance Details -->\r
            <div class="balance-details">\r
              <div class="row g-2">\r
                <!-- Entitled Days -->\r
                <div class="col-6 col-md-3">\r
                  <div class="balance-item">\r
                    <span class="balance-label">{{ i18n.t('leaveBalance.entitled') }}</span>\r
                    <span class="balance-value">{{ balance.entitledDays }}</span>\r
                  </div>\r
                </div>\r
\r
                <!-- Accrued Days -->\r
                <div class="col-6 col-md-3">\r
                  <div class="balance-item">\r
                    <span class="balance-label">{{ i18n.t('leaveBalance.accrued') }}</span>\r
                    <span class="balance-value text-info">{{ balance.accruedDays }}</span>\r
                  </div>\r
                </div>\r
\r
                <!-- Used Days -->\r
                <div class="col-6 col-md-3">\r
                  <div class="balance-item">\r
                    <span class="balance-label">{{ i18n.t('leaveBalance.used') }}</span>\r
                    <span class="balance-value text-danger">{{ balance.usedDays }}</span>\r
                  </div>\r
                </div>\r
\r
                <!-- Pending Days -->\r
                <div class="col-6 col-md-3">\r
                  <div class="balance-item">\r
                    <span class="balance-label">{{ i18n.t('leaveBalance.pending') }}</span>\r
                    <span class="balance-value text-warning">{{ balance.pendingDays }}</span>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <!-- Progress Bar (Accrual) -->\r
              @if (!compact) {\r
                <div class="progress-section mt-3">\r
                  <div class="d-flex justify-content-between mb-1">\r
                    <small class="text-muted">{{ i18n.t('leaveBalance.accrualProgress') }}</small>\r
                    <small class="text-muted">{{ getAccrualPercentage(balance) }}%</small>\r
                  </div>\r
                  <div class="progress" style="height: 8px;">\r
                    <div\r
                      class="progress-bar bg-info"\r
                      role="progressbar"\r
                      [style.width.%]="getAccrualPercentage(balance)"\r
                      [attr.aria-valuenow]="getAccrualPercentage(balance)"\r
                      aria-valuemin="0"\r
                      aria-valuemax="100">\r
                    </div>\r
                  </div>\r
                </div>\r
\r
                <!-- Progress Bar (Usage) -->\r
                <div class="progress-section mt-2">\r
                  <div class="d-flex justify-content-between mb-1">\r
                    <small class="text-muted">{{ i18n.t('leaveBalance.usageProgress') }}</small>\r
                    <small class="text-muted">{{ getUsagePercentage(balance) }}%</small>\r
                  </div>\r
                  <div class="progress" style="height: 8px;">\r
                    <div\r
                      class="progress-bar"\r
                      [class]="getProgressBarClass(balance)"\r
                      role="progressbar"\r
                      [style.width.%]="getUsagePercentage(balance)"\r
                      [attr.aria-valuenow]="getUsagePercentage(balance)"\r
                      aria-valuemin="0"\r
                      aria-valuemax="100">\r
                    </div>\r
                  </div>\r
                </div>\r
              }\r
\r
              <!-- Additional Info -->\r
              @if (!compact) {\r
                <div class="additional-info mt-3">\r
                  <div class="row g-2">\r
                    @if (balance.carryOverDays > 0) {\r
                      <div class="col-6">\r
                        <small class="text-muted">\r
                          <i class="bi bi-arrow-right-circle me-1"></i>\r
                          {{ i18n.t('leaveBalance.carryOver') }}: {{ balance.carryOverDays }}\r
                        </small>\r
                      </div>\r
                    }\r
                    @if (balance.lastAccrualDate) {\r
                      <div class="col-6">\r
                        <small class="text-muted">\r
                          <i class="bi bi-calendar-check me-1"></i>\r
                          {{ i18n.t('leaveBalance.lastAccrual') }}: {{ formatLastAccrualDate(balance.lastAccrualDate) }}\r
                        </small>\r
                      </div>\r
                    }\r
                    @if (balance.expiresAtYearEnd) {\r
                      <div class="col-12">\r
                        <small class="text-warning">\r
                          <i class="bi bi-exclamation-triangle me-1"></i>\r
                          {{ i18n.t('leaveBalance.expiresWarning') }}\r
                        </small>\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/shared/components/leave-balance-summary/leave-balance-summary.component.css */\n.leave-balance-summary {\n  background: #fff;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n}\n.leave-balance-summary.compact {\n  padding: 1rem;\n}\n.summary-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid #e9ecef;\n}\n.summary-header h4 {\n  color: #2c3e50;\n  font-weight: 600;\n  font-size: 1.25rem;\n}\n.year-selector {\n  width: auto;\n  min-width: 120px;\n}\n.total-stats {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border-radius: 0.5rem;\n  padding: 1.25rem;\n}\n.stat-card {\n  text-align: center;\n  padding: 0.75rem;\n  background: #fff;\n  border-radius: 0.375rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.stat-label {\n  font-size: 0.75rem;\n  color: #6c757d;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 0.5rem;\n}\n.stat-value {\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n}\n.vacation-type-balances {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.balance-card {\n  background: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.5rem;\n  padding: 1.25rem;\n  transition: all 0.2s ease-in-out;\n}\n.balance-card:hover {\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n  border-color: #adb5bd;\n}\n.balance-card.compact-card {\n  padding: 1rem;\n}\n.balance-header {\n  margin-bottom: 1rem;\n}\n.vacation-type-name {\n  color: #2c3e50;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.balance-details {\n  padding: 0;\n}\n.balance-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.5rem;\n  background: #f8f9fa;\n  border-radius: 0.375rem;\n}\n.balance-label {\n  font-size: 0.75rem;\n  color: #6c757d;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.balance-value {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #495057;\n}\n.progress-section {\n  margin-top: 0.75rem;\n}\n.progress {\n  border-radius: 0.375rem;\n  background-color: #e9ecef;\n}\n.progress-bar {\n  border-radius: 0.375rem;\n  transition: width 0.6s ease;\n}\n.additional-info {\n  padding-top: 1rem;\n  border-top: 1px solid #e9ecef;\n}\n.additional-info small {\n  display: block;\n  line-height: 1.8;\n}\n.additional-info i {\n  font-size: 0.875rem;\n}\n.text-primary {\n  color: #007bff !important;\n}\n.text-info {\n  color: #17a2b8 !important;\n}\n.text-danger {\n  color: #dc3545 !important;\n}\n.text-warning {\n  color: #ffc107 !important;\n}\n.text-success {\n  color: #28a745 !important;\n}\n.text-muted {\n  color: #6c757d !important;\n}\n.leave-balance-summary.compact .summary-header h4 {\n  font-size: 1rem;\n}\n.leave-balance-summary.compact .vacation-type-name {\n  font-size: 1rem;\n}\n.leave-balance-summary.compact .balance-value {\n  font-size: 1rem;\n}\n.leave-balance-summary.compact .stat-value {\n  font-size: 1.25rem;\n}\n.leave-balance-summary.compact .balance-card {\n  padding: 0.75rem;\n}\n@media (max-width: 768px) {\n  .leave-balance-summary {\n    padding: 1rem;\n  }\n  .summary-header {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: flex-start;\n  }\n  .year-selector {\n    width: 100%;\n  }\n  .total-stats .col-6 {\n    width: 50%;\n  }\n  .balance-header h5 {\n    font-size: 1rem;\n  }\n  .balance-item {\n    padding: 0.375rem;\n  }\n  .balance-value {\n    font-size: 1.125rem;\n  }\n  .stat-value {\n    font-size: 1.25rem;\n  }\n}\n@media (max-width: 576px) {\n  .total-stats .col-6 {\n    width: 100%;\n  }\n  .balance-details .col-6 {\n    width: 50%;\n  }\n}\n/*# sourceMappingURL=leave-balance-summary.component.css.map */\n"] }]
  }], () => [], { employeeId: [{
    type: Input
  }], showYearSelector: [{
    type: Input
  }], showHeader: [{
    type: Input
  }], compact: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeaveBalanceSummaryComponent, { className: "LeaveBalanceSummaryComponent", filePath: "src/app/shared/components/leave-balance-summary/leave-balance-summary.component.ts", lineNumber: 31 });
})();

// src/app/shared/models/leave-balance.model.ts
var LeaveTransactionType;
(function(LeaveTransactionType2) {
  LeaveTransactionType2[LeaveTransactionType2["Accrual"] = 0] = "Accrual";
  LeaveTransactionType2[LeaveTransactionType2["Usage"] = 1] = "Usage";
  LeaveTransactionType2[LeaveTransactionType2["Adjustment"] = 2] = "Adjustment";
  LeaveTransactionType2[LeaveTransactionType2["CarryOver"] = 3] = "CarryOver";
  LeaveTransactionType2[LeaveTransactionType2["Reset"] = 4] = "Reset";
  LeaveTransactionType2[LeaveTransactionType2["Reservation"] = 5] = "Reservation";
  LeaveTransactionType2[LeaveTransactionType2["ReservationRelease"] = 6] = "ReservationRelease";
})(LeaveTransactionType || (LeaveTransactionType = {}));

// src/app/shared/components/leave-transaction-history/leave-transaction-history.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
var _forTrack02 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
var _forTrack1 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack1");
function LeaveTransactionHistoryComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "h4", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 6)(4, "button", 7);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportToCSV());
    }, "LeaveTransactionHistoryComponent_Conditional_1_Template_button_click_4_listener"));
    \u0275\u0275element(5, "i", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 9);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refresh());
    }, "LeaveTransactionHistoryComponent_Conditional_1_Template_button_click_7_listener"));
    \u0275\u0275element(8, "i", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.transactionHistory"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", \u0275\u0275interpolate(ctx_r1.i18n.t("common.exportToCSV")));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.export"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", \u0275\u0275interpolate(ctx_r1.i18n.t("common.refresh")));
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_1_Template, "LeaveTransactionHistoryComponent_Conditional_1_Template");
function LeaveTransactionHistoryComponent_Conditional_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const year_r4 = ctx.$implicit;
    \u0275\u0275property("value", year_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(year_r4);
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_2_For_9_Template, "LeaveTransactionHistoryComponent_Conditional_2_For_9_Template");
function LeaveTransactionHistoryComponent_Conditional_2_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    \u0275\u0275property("value", option_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r5.label);
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_2_For_21_Template, "LeaveTransactionHistoryComponent_Conditional_2_For_21_Template");
function LeaveTransactionHistoryComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 11)(2, "div", 12)(3, "label", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 14);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedYear, $event) || (ctx_r1.selectedYear = $event);
      return \u0275\u0275resetView($event);
    }, "LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_5_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onYearChange());
    }, "LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_5_listener"));
    \u0275\u0275elementStart(6, "option", 15);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, LeaveTransactionHistoryComponent_Conditional_2_For_9_Template, 2, 2, "option", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 16)(11, "label", 17);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 18);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedVacationTypeId, $event) || (ctx_r1.selectedVacationTypeId = $event);
      return \u0275\u0275resetView($event);
    }, "LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_13_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onVacationTypeChange());
    }, "LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_13_listener"));
    \u0275\u0275elementStart(14, "option", 15);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 16)(17, "label", 19);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 20);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedTransactionType, $event) || (ctx_r1.selectedTransactionType = $event);
      return \u0275\u0275resetView($event);
    }, "LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_19_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_19_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTransactionTypeChange());
    }, "LeaveTransactionHistoryComponent_Conditional_2_Template_select_ngModelChange_19_listener"));
    \u0275\u0275repeaterCreate(20, LeaveTransactionHistoryComponent_Conditional_2_For_21_Template, 2, 2, "option", 15, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 21)(23, "button", 22);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_2_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    }, "LeaveTransactionHistoryComponent_Conditional_2_Template_button_click_23_listener"));
    \u0275\u0275element(24, "i", 23);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("leaveBalance.year"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedYear);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.all"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.availableYears());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("vacationTypes.vacationType"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedVacationTypeId);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.all"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("leaveBalance.transactionType"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedTransactionType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.transactionTypeOptions());
    \u0275\u0275advance(3);
    \u0275\u0275property("title", \u0275\u0275interpolate(ctx_r1.i18n.t("common.clearFilters")));
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_2_Template, "LeaveTransactionHistoryComponent_Conditional_2_Template");
function LeaveTransactionHistoryComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "app-loading-spinner");
    \u0275\u0275elementEnd();
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_3_Template, "LeaveTransactionHistoryComponent_Conditional_3_Template");
function LeaveTransactionHistoryComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 4);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("icon", "bi-clock-history")("title", ctx_r1.i18n.t("leaveBalance.noTransactionsTitle"))("message", ctx_r1.i18n.t("leaveBalance.noTransactionsMessage"))("size", ctx_r1.compact ? "sm" : "md");
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_4_Template, "LeaveTransactionHistoryComponent_Conditional_4_Template");
function LeaveTransactionHistoryComponent_Conditional_5_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275element(4, "app-status-badge", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 26)(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 26);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 26);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const transaction_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(transaction_r6.transactionDate));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", transaction_r6.transactionTypeName)("variant", ctx_r1.getTransactionTypeVariant(transaction_r6.transactionType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(transaction_r6.vacationTypeName);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getDaysClass(transaction_r6.days));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDays(transaction_r6.days), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(transaction_r6.balanceBeforeTransaction);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(transaction_r6.balanceAfterTransaction);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(transaction_r6.performedBy || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(transaction_r6.reason || "-");
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_5_For_22_Template, "LeaveTransactionHistoryComponent_Conditional_5_For_22_Template");
function LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 32)(1, "a", 33);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_For_6_Template_a_click_1_listener() {
      const $index_r9 = \u0275\u0275restoreView(_r8).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onPageChange($index_r9 + 1));
    }, "LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_For_6_Template_a_click_1_listener"));
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const $index_r9 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", ctx_r1.currentPage() === $index_r9 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r9 + 1);
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_For_6_Template, "LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_For_6_Template");
function LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 30)(1, "ul", 31)(2, "li", 32)(3, "a", 33);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_Template_a_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onPageChange(ctx_r1.currentPage() - 1));
    }, "LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_Template_a_click_3_listener"));
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(5, LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_For_6_Template, 3, 3, "li", 34, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(7, "li", 32)(8, "a", 33);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_Template_a_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onPageChange(ctx_r1.currentPage() + 1));
    }, "LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_Template_a_click_8_listener"));
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r1.currentPage() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.previous"));
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(6, _c0).constructor(ctx_r1.pagedResult().totalPages));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r1.currentPage() === ctx_r1.pagedResult().totalPages);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.next"));
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_Template, "LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_Template");
function LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "small", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(3, LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Conditional_3_Template, 10, 7, "nav", 30);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate6(" ", ctx_r1.i18n.t("common.showing"), " ", (ctx_r1.currentPage() - 1) * ctx_r1.itemsPerPage + 1, "-", ctx_r1.Math.min(ctx_r1.currentPage() * ctx_r1.itemsPerPage, ctx_r1.pagedResult().totalCount), " ", ctx_r1.i18n.t("common.of"), " ", ctx_r1.pagedResult().totalCount, " ", ctx_r1.i18n.t("common.items"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.pagedResult().totalPages > 1 ? 3 : -1);
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Template, "LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Template");
function LeaveTransactionHistoryComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "table", 25)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 26);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 26);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 26);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275repeaterCreate(21, LeaveTransactionHistoryComponent_Conditional_5_For_22_Template, 18, 11, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(23, LeaveTransactionHistoryComponent_Conditional_5_Conditional_23_Template, 4, 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.transactionDate"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.transactionType"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("vacationTypes.vacationType"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.days"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.balanceBefore"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("leaveBalance.balanceAfter"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.performedBy"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.reason"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.transactions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.pagedResult() ? 23 : -1);
  }
}
__name(LeaveTransactionHistoryComponent_Conditional_5_Template, "LeaveTransactionHistoryComponent_Conditional_5_Template");
var _LeaveTransactionHistoryComponent = class _LeaveTransactionHistoryComponent {
  leaveBalanceService = inject(LeaveBalanceService);
  i18n = inject(I18nService);
  // Input properties
  employeeId;
  showFilters = true;
  showHeader = true;
  compact = false;
  itemsPerPage = 20;
  // State
  loading = this.leaveBalanceService.loading;
  transactions = this.leaveBalanceService.transactions;
  pagedResult = this.leaveBalanceService.transactionsPagedResult;
  // Filter state
  selectedVacationTypeId = signal(null, ...ngDevMode ? [{ debugName: "selectedVacationTypeId" }] : []);
  selectedYear = signal((/* @__PURE__ */ new Date()).getFullYear(), ...ngDevMode ? [{ debugName: "selectedYear" }] : []);
  selectedTransactionType = signal(null, ...ngDevMode ? [{ debugName: "selectedTransactionType" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  // Available years
  availableYears = signal([], ...ngDevMode ? [{ debugName: "availableYears" }] : []);
  // Transaction type options
  transactionTypeOptions = computed(() => [
    { value: null, label: this.i18n.t("common.all") },
    { value: LeaveTransactionType.Accrual, label: this.i18n.t("leaveBalance.transactionType.accrual") },
    { value: LeaveTransactionType.Usage, label: this.i18n.t("leaveBalance.transactionType.usage") },
    { value: LeaveTransactionType.Adjustment, label: this.i18n.t("leaveBalance.transactionType.adjustment") },
    { value: LeaveTransactionType.CarryOver, label: this.i18n.t("leaveBalance.transactionType.carryOver") },
    { value: LeaveTransactionType.Reset, label: this.i18n.t("leaveBalance.transactionType.reset") },
    { value: LeaveTransactionType.Reservation, label: this.i18n.t("leaveBalance.transactionType.reservation") },
    { value: LeaveTransactionType.ReservationRelease, label: this.i18n.t("leaveBalance.transactionType.reservationRelease") }
  ], ...ngDevMode ? [{ debugName: "transactionTypeOptions" }] : []);
  // Expose Math for template
  Math = Math;
  constructor() {
    effect(() => {
      this.selectedVacationTypeId();
      this.selectedYear();
      this.selectedTransactionType();
      this.currentPage();
      if (this.employeeId) {
        this.loadTransactionHistory();
      }
    });
  }
  ngOnInit() {
    if (!this.employeeId) {
      console.error("LeaveTransactionHistoryComponent: employeeId is required");
      return;
    }
    this.generateAvailableYears();
    this.loadTransactionHistory();
  }
  /**
   * Generates list of available years (current year ± 5 years).
   */
  generateAvailableYears() {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const years = [];
    for (let i = -5; i <= 5; i++) {
      years.push(currentYear + i);
    }
    this.availableYears.set(years);
  }
  /**
   * Loads transaction history from the service.
   */
  loadTransactionHistory() {
    const params = {
      employeeId: this.employeeId,
      vacationTypeId: this.selectedVacationTypeId() || void 0,
      year: this.selectedYear() || void 0,
      pageNumber: this.currentPage(),
      pageSize: this.itemsPerPage
    };
    this.leaveBalanceService.getLeaveTransactionHistory(params).subscribe();
  }
  /**
   * Handles vacation type filter change.
   */
  onVacationTypeChange() {
    this.currentPage.set(1);
  }
  /**
   * Handles year filter change.
   */
  onYearChange() {
    this.currentPage.set(1);
  }
  /**
   * Handles transaction type filter change.
   */
  onTransactionTypeChange() {
    this.currentPage.set(1);
  }
  /**
   * Clears all filters.
   */
  clearFilters() {
    this.selectedVacationTypeId.set(null);
    this.selectedYear.set((/* @__PURE__ */ new Date()).getFullYear());
    this.selectedTransactionType.set(null);
    this.currentPage.set(1);
  }
  /**
   * Handles page change.
   */
  onPageChange(page) {
    this.currentPage.set(page);
  }
  /**
   * Gets badge variant for transaction type.
   */
  getTransactionTypeVariant(type) {
    switch (type) {
      case LeaveTransactionType.Accrual:
        return "success";
      case LeaveTransactionType.Usage:
        return "danger";
      case LeaveTransactionType.Adjustment:
        return "warning";
      case LeaveTransactionType.CarryOver:
        return "info";
      case LeaveTransactionType.Reset:
        return "secondary";
      case LeaveTransactionType.Reservation:
        return "primary";
      case LeaveTransactionType.ReservationRelease:
        return "light";
      default:
        return "secondary";
    }
  }
  /**
   * Formats transaction date.
   */
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
  /**
   * Formats days with sign.
   */
  formatDays(days) {
    const sign = days > 0 ? "+" : "";
    return `${sign}${days}`;
  }
  /**
   * Gets CSS class for days display.
   */
  getDaysClass(days) {
    return days > 0 ? "text-success fw-bold" : "text-danger fw-bold";
  }
  /**
   * Refreshes transaction history.
   */
  refresh() {
    this.loadTransactionHistory();
  }
  /**
   * Exports transaction history to CSV.
   */
  exportToCSV() {
    console.log("Export to CSV clicked");
  }
};
__name(_LeaveTransactionHistoryComponent, "LeaveTransactionHistoryComponent");
__publicField(_LeaveTransactionHistoryComponent, "\u0275fac", /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LeaveTransactionHistoryComponent)();
}, "LeaveTransactionHistoryComponent_Factory"));
__publicField(_LeaveTransactionHistoryComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeaveTransactionHistoryComponent, selectors: [["app-leave-transaction-history"]], inputs: { employeeId: "employeeId", showFilters: "showFilters", showHeader: "showHeader", compact: "compact", itemsPerPage: "itemsPerPage" }, decls: 6, vars: 7, consts: [[1, "leave-transaction-history"], [1, "history-header"], [1, "filters-section"], [1, "text-center", "py-4"], [3, "icon", "title", "message", "size"], [1, "mb-0"], [1, "header-actions"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-primary", 3, "click", "title"], [1, "bi", "bi-download", "me-1"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", 3, "click", "title"], [1, "bi", "bi-arrow-clockwise"], [1, "row", "g-3"], [1, "col-md-3"], ["for", "yearFilter", 1, "form-label"], ["id", "yearFilter", 1, "form-select", "form-select-sm", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "col-md-4"], ["for", "vacationTypeFilter", 1, "form-label"], ["id", "vacationTypeFilter", 1, "form-select", "form-select-sm", 3, "ngModelChange", "ngModel"], ["for", "transactionTypeFilter", 1, "form-label"], ["id", "transactionTypeFilter", 1, "form-select", "form-select-sm", 3, "ngModelChange", "ngModel"], [1, "col-md-1", "d-flex", "align-items-end"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", "w-100", 3, "click", "title"], [1, "bi", "bi-x-lg"], [1, "table-responsive"], [1, "table", "table-hover"], [1, "text-end"], [3, "status", "variant"], [1, "pagination-info"], [1, "text-muted"], ["aria-label", "Page navigation"], [1, "pagination", "pagination-sm", "justify-content-center"], [1, "page-item"], [1, "page-link", 3, "click"], [1, "page-item", 3, "active"]], template: /* @__PURE__ */ __name(function LeaveTransactionHistoryComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, LeaveTransactionHistoryComponent_Conditional_1_Template, 9, 6, "div", 1);
    \u0275\u0275conditionalCreate(2, LeaveTransactionHistoryComponent_Conditional_2_Template, 25, 12, "div", 2);
    \u0275\u0275conditionalCreate(3, LeaveTransactionHistoryComponent_Conditional_3_Template, 2, 0, "div", 3);
    \u0275\u0275conditionalCreate(4, LeaveTransactionHistoryComponent_Conditional_4_Template, 1, 4, "app-empty-state", 4);
    \u0275\u0275conditionalCreate(5, LeaveTransactionHistoryComponent_Conditional_5_Template, 24, 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275classProp("compact", ctx.compact);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showHeader ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showFilters ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.transactions().length === 0 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.transactions().length > 0 ? 5 : -1);
  }
}, "LeaveTransactionHistoryComponent_Template"), dependencies: [
  FormsModule,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  SelectControlValueAccessor,
  NgControlStatus,
  NgModel,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  StatusBadgeComponent
], styles: ["\n\n.leave-transaction-history[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n}\n.leave-transaction-history.compact[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.history-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid #e9ecef;\n}\n.history-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-weight: 600;\n  font-size: 1.25rem;\n  margin-bottom: 0;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.filters-section[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1.5rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n}\n.form-select-sm[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 0.375rem;\n}\n.transactions-table[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.pagination-info[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  text-align: center;\n  padding: 0.75rem;\n  background: #f8f9fa;\n  border-radius: 0.375rem;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  border-radius: 0.375rem;\n  font-weight: 500;\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  color: #007bff;\n  border-color: #007bff;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: #007bff;\n  color: #fff;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #6c757d;\n  color: #fff;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #28a745 !important;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #dc3545 !important;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.fw-bold[_ngcontent-%COMP%] {\n  font-weight: 700 !important;\n}\n.bi[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.g-3[_ngcontent-%COMP%] {\n  --bs-gutter-x: 1rem;\n  --bs-gutter-y: 1rem;\n}\n.leave-transaction-history.compact[_ngcontent-%COMP%]   .history-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.leave-transaction-history.compact[_ngcontent-%COMP%]   .filters-section[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n}\n@media (max-width: 768px) {\n  .leave-transaction-history[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .history-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: flex-start;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  .filters-section[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%] {\n    row-gap: 0.75rem;\n  }\n  .filters-section[_ngcontent-%COMP%]   .col-md-1[_ngcontent-%COMP%], \n   .filters-section[_ngcontent-%COMP%]   .col-md-3[_ngcontent-%COMP%], \n   .filters-section[_ngcontent-%COMP%]   .col-md-4[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .btn-sm[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 576px) {\n  .header-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .header-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=leave-transaction-history.component.css.map */"] }));
var LeaveTransactionHistoryComponent = _LeaveTransactionHistoryComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeaveTransactionHistoryComponent, [{
    type: Component,
    args: [{ selector: "app-leave-transaction-history", standalone: true, imports: [
      FormsModule,
      LoadingSpinnerComponent,
      EmptyStateComponent,
      StatusBadgeComponent
    ], template: `<!-- Leave Transaction History Component -->\r
<div class="leave-transaction-history" [class.compact]="compact">\r
  <!-- Header -->\r
  @if (showHeader) {\r
    <div class="history-header">\r
      <h4 class="mb-0">{{ i18n.t('leaveBalance.transactionHistory') }}</h4>\r
      <div class="header-actions">\r
        <button\r
          type="button"\r
          class="btn btn-sm btn-outline-primary"\r
          (click)="exportToCSV()"\r
          title="{{ i18n.t('common.exportToCSV') }}">\r
          <i class="bi bi-download me-1"></i>\r
          {{ i18n.t('common.export') }}\r
        </button>\r
        <button\r
          type="button"\r
          class="btn btn-sm btn-outline-secondary"\r
          (click)="refresh()"\r
          title="{{ i18n.t('common.refresh') }}">\r
          <i class="bi bi-arrow-clockwise"></i>\r
        </button>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Filters -->\r
  @if (showFilters) {\r
    <div class="filters-section">\r
      <div class="row g-3">\r
        <!-- Year Filter -->\r
        <div class="col-md-3">\r
          <label for="yearFilter" class="form-label">\r
            {{ i18n.t('leaveBalance.year') }}\r
          </label>\r
          <select\r
            id="yearFilter"\r
            class="form-select form-select-sm"\r
            [(ngModel)]="selectedYear"\r
            (ngModelChange)="onYearChange()">\r
            <option [value]="null">{{ i18n.t('common.all') }}</option>\r
            @for (year of availableYears(); track year) {\r
              <option [value]="year">{{ year }}</option>\r
            }\r
          </select>\r
        </div>\r
\r
        <!-- Vacation Type Filter -->\r
        <div class="col-md-4">\r
          <label for="vacationTypeFilter" class="form-label">\r
            {{ i18n.t('vacationTypes.vacationType') }}\r
          </label>\r
          <select\r
            id="vacationTypeFilter"\r
            class="form-select form-select-sm"\r
            [(ngModel)]="selectedVacationTypeId"\r
            (ngModelChange)="onVacationTypeChange()">\r
            <option [value]="null">{{ i18n.t('common.all') }}</option>\r
            <!-- TODO: Load vacation types dynamically -->\r
          </select>\r
        </div>\r
\r
        <!-- Transaction Type Filter -->\r
        <div class="col-md-4">\r
          <label for="transactionTypeFilter" class="form-label">\r
            {{ i18n.t('leaveBalance.transactionType') }}\r
          </label>\r
          <select\r
            id="transactionTypeFilter"\r
            class="form-select form-select-sm"\r
            [(ngModel)]="selectedTransactionType"\r
            (ngModelChange)="onTransactionTypeChange()">\r
            @for (option of transactionTypeOptions(); track option.value) {\r
              <option [value]="option.value">{{ option.label }}</option>\r
            }\r
          </select>\r
        </div>\r
\r
        <!-- Clear Filters Button -->\r
        <div class="col-md-1 d-flex align-items-end">\r
          <button\r
            type="button"\r
            class="btn btn-sm btn-outline-secondary w-100"\r
            (click)="clearFilters()"\r
            title="{{ i18n.t('common.clearFilters') }}">\r
            <i class="bi bi-x-lg"></i>\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-4">\r
      <app-loading-spinner></app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Empty State -->\r
  @if (!loading() && transactions().length === 0) {\r
    <app-empty-state\r
      [icon]="'bi-clock-history'"\r
      [title]="i18n.t('leaveBalance.noTransactionsTitle')"\r
      [message]="i18n.t('leaveBalance.noTransactionsMessage')"\r
      [size]="compact ? 'sm' : 'md'">\r
    </app-empty-state>\r
  }\r
\r
  <!-- Transaction History Table -->\r
  @if (!loading() && transactions().length > 0) {\r
    <div class="table-responsive">\r
      <table class="table table-hover">\r
        <thead>\r
          <tr>\r
            <th>{{ i18n.t('leaveBalance.transactionDate') }}</th>\r
            <th>{{ i18n.t('leaveBalance.transactionType') }}</th>\r
            <th>{{ i18n.t('vacationTypes.vacationType') }}</th>\r
            <th class="text-end">{{ i18n.t('leaveBalance.days') }}</th>\r
            <th class="text-end">{{ i18n.t('leaveBalance.balanceBefore') }}</th>\r
            <th class="text-end">{{ i18n.t('leaveBalance.balanceAfter') }}</th>\r
            <th>{{ i18n.t('common.performedBy') }}</th>\r
            <th>{{ i18n.t('common.reason') }}</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          @for (transaction of transactions(); track transaction.id) {\r
            <tr>\r
              <td>{{ formatDate(transaction.transactionDate) }}</td>\r
              <td>\r
                <app-status-badge\r
                  [status]="transaction.transactionTypeName"\r
                  [variant]="getTransactionTypeVariant(transaction.transactionType)">\r
                </app-status-badge>\r
              </td>\r
              <td>{{ transaction.vacationTypeName }}</td>\r
              <td class="text-end">\r
                <span [class]="getDaysClass(transaction.days)">\r
                  {{ formatDays(transaction.days) }}\r
                </span>\r
              </td>\r
              <td class="text-end">{{ transaction.balanceBeforeTransaction }}</td>\r
              <td class="text-end">{{ transaction.balanceAfterTransaction }}</td>\r
              <td>{{ transaction.performedBy || '-' }}</td>\r
              <td>{{ transaction.reason || '-' }}</td>\r
            </tr>\r
          }\r
        </tbody>\r
      </table>\r
    </div>\r
\r
    <!-- Pagination Info -->\r
    @if (pagedResult()) {\r
      <div class="pagination-info">\r
        <small class="text-muted">\r
          {{ i18n.t('common.showing') }}\r
          {{ (currentPage() - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage() * itemsPerPage, pagedResult()!.totalCount) }}\r
          {{ i18n.t('common.of') }}\r
          {{ pagedResult()!.totalCount }}\r
          {{ i18n.t('common.items') }}\r
        </small>\r
      </div>\r
\r
      <!-- Manual Pagination Controls -->\r
      @if (pagedResult()!.totalPages > 1) {\r
        <nav aria-label="Page navigation">\r
          <ul class="pagination pagination-sm justify-content-center">\r
            <li class="page-item" [class.disabled]="currentPage() === 1">\r
              <a class="page-link" (click)="onPageChange(currentPage() - 1)">{{ i18n.t('common.previous') }}</a>\r
            </li>\r
            @for (page of [].constructor(pagedResult()!.totalPages); track $index) {\r
              <li class="page-item" [class.active]="currentPage() === $index + 1">\r
                <a class="page-link" (click)="onPageChange($index + 1)">{{ $index + 1 }}</a>\r
              </li>\r
            }\r
            <li class="page-item" [class.disabled]="currentPage() === pagedResult()!.totalPages">\r
              <a class="page-link" (click)="onPageChange(currentPage() + 1)">{{ i18n.t('common.next') }}</a>\r
            </li>\r
          </ul>\r
        </nav>\r
      }\r
    }\r
  }\r
</div>\r
`, styles: ["/* src/app/shared/components/leave-transaction-history/leave-transaction-history.component.css */\n.leave-transaction-history {\n  background: #fff;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n}\n.leave-transaction-history.compact {\n  padding: 1rem;\n}\n.history-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid #e9ecef;\n}\n.history-header h4 {\n  color: #2c3e50;\n  font-weight: 600;\n  font-size: 1.25rem;\n  margin-bottom: 0;\n}\n.header-actions {\n  display: flex;\n  gap: 0.5rem;\n}\n.filters-section {\n  background: #f8f9fa;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1.5rem;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n}\n.form-select-sm {\n  font-size: 0.875rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 0.375rem;\n}\n.transactions-table {\n  margin-top: 1rem;\n}\n.pagination-info {\n  margin-top: 1rem;\n  text-align: center;\n  padding: 0.75rem;\n  background: #f8f9fa;\n  border-radius: 0.375rem;\n}\n.btn-sm {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  border-radius: 0.375rem;\n  font-weight: 500;\n}\n.btn-outline-primary {\n  color: #007bff;\n  border-color: #007bff;\n}\n.btn-outline-primary:hover {\n  background-color: #007bff;\n  color: #fff;\n}\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary:hover {\n  background-color: #6c757d;\n  color: #fff;\n}\n.text-success {\n  color: #28a745 !important;\n}\n.text-danger {\n  color: #dc3545 !important;\n}\n.text-muted {\n  color: #6c757d !important;\n}\n.fw-bold {\n  font-weight: 700 !important;\n}\n.bi {\n  font-size: 0.875rem;\n}\n.g-3 {\n  --bs-gutter-x: 1rem;\n  --bs-gutter-y: 1rem;\n}\n.leave-transaction-history.compact .history-header h4 {\n  font-size: 1rem;\n}\n.leave-transaction-history.compact .filters-section {\n  padding: 0.75rem;\n}\n@media (max-width: 768px) {\n  .leave-transaction-history {\n    padding: 1rem;\n  }\n  .history-header {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: flex-start;\n  }\n  .header-actions {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  .filters-section .row {\n    row-gap: 0.75rem;\n  }\n  .filters-section .col-md-1,\n  .filters-section .col-md-3,\n  .filters-section .col-md-4 {\n    width: 100%;\n  }\n  .btn-sm {\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 576px) {\n  .header-actions {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .header-actions .btn {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=leave-transaction-history.component.css.map */\n"] }]
  }], () => [], { employeeId: [{
    type: Input
  }], showFilters: [{
    type: Input
  }], showHeader: [{
    type: Input
  }], compact: [{
    type: Input
  }], itemsPerPage: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeaveTransactionHistoryComponent, { className: "LeaveTransactionHistoryComponent", filePath: "src/app/shared/components/leave-transaction-history/leave-transaction-history.component.ts", lineNumber: 32 });
})();

// src/app/pages/employees/view-employee/view-employee.component.ts
function ViewEmployeeComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.t("common.loading"))("centered", true);
  }
}
__name(ViewEmployeeComponent_Conditional_2_Template, "ViewEmployeeComponent_Conditional_2_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 16)(1, "button", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Conditional_24_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.activeTab.set("leave-balance"));
    }, "ViewEmployeeComponent_Conditional_3_Conditional_24_Template_button_click_1_listener"));
    \u0275\u0275element(2, "i", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r0.activeTab() === "leave-balance");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("leaveBalance.balanceSummary"), " ");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_24_Template, "ViewEmployeeComponent_Conditional_3_Conditional_24_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-status-badge", 30);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("label", ctx_r0.employee().currentShiftName)("variant", "primary")("icon", "fas fa-clock");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_33_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_33_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("employees.no_shift_assigned"));
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_34_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_34_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "h6", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-status-badge", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.gender.title"));
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.getGenderLabel(ctx_r0.employee().gender))("variant", "light")("showIcon", false);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_35_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_35_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "small", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.first_name_ar"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_5_0 = ctx_r0.employee()) == null ? null : tmp_5_0.firstNameAr);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_5_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_5_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "small", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.last_name_ar"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_5_0 = ctx_r0.employee()) == null ? null : tmp_5_0.lastNameAr);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_6_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_6_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.job_title_ar"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_5_0 = ctx_r0.employee()) == null ? null : tmp_5_0.jobTitleAr);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_7_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_7_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 23)(2, "h6", 24);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 6);
    \u0275\u0275conditionalCreate(5, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_5_Template, 6, 2, "div", 36);
    \u0275\u0275conditionalCreate(6, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_6_Template, 6, 2, "div", 36);
    \u0275\u0275conditionalCreate(7, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Conditional_7_Template, 6, 2, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.arabic_names"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r0.employee()) == null ? null : tmp_4_0.firstNameAr) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_5_0 = ctx_r0.employee()) == null ? null : tmp_5_0.lastNameAr) ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_6_0 = ctx_r0.employee()) == null ? null : tmp_6_0.jobTitleAr) ? 7 : -1);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.toggleEmployeeStatus());
    }, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_0_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.deactivate"), " ");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_0_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_0_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.toggleEmployeeStatus());
    }, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_1_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.activate"), " ");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_1_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_1_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_0_Template, 3, 1, "button", 37)(1, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Conditional_1_Template, 3, 1, "button", 38);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(((tmp_3_0 = ctx_r0.employee()) == null ? null : tmp_3_0.isActive) ? 0 : 1);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_49_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteEmployee());
    }, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_49_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.delete"), " ");
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_49_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_49_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 21)(2, "div", 22)(3, "div", 23)(4, "h5", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 6)(7, "div", 19)(8, "div", 25);
    \u0275\u0275element(9, "app-definition-list", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 25);
    \u0275\u0275element(11, "app-definition-list", 26);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(12, "div", 27)(13, "div", 22)(14, "div", 23)(15, "h6", 24);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 6)(18, "div", 28)(19, "h6", 29);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "app-status-badge", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 28)(23, "h6", 29);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "app-status-badge", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 28)(27, "h6", 29);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "app-status-badge", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 28)(31, "h6", 29);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(33, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_33_Template, 1, 3, "app-status-badge", 30)(34, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_34_Template, 2, 1, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(35, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_35_Template, 4, 4, "div", 28);
    \u0275\u0275elementStart(36, "div")(37, "h6", 29);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "small", 31);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(41, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_41_Template, 8, 4, "div", 32);
    \u0275\u0275elementStart(42, "div", 32)(43, "div", 23)(44, "h6", 24);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 6)(47, "div", 33);
    \u0275\u0275conditionalCreate(48, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_48_Template, 2, 1);
    \u0275\u0275conditionalCreate(49, ViewEmployeeComponent_Conditional_3_Conditional_25_Conditional_49_Template, 3, 1, "button", 34);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_21_0;
    let tmp_22_0;
    let tmp_25_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.basic_information"));
    \u0275\u0275advance(4);
    \u0275\u0275property("items", ctx_r0.basicInfoItems())("labelWidth", "5")("valueWidth", "7");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.employmentInfoItems())("labelWidth", "5")("valueWidth", "7");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.employment_details"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("common.status"));
    \u0275\u0275advance();
    \u0275\u0275property("status", ((tmp_11_0 = ctx_r0.employee()) == null ? null : tmp_11_0.isActive) ? "active" : "inactive");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.employment_status.title"));
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.getEmploymentStatusLabel(ctx_r0.employee().employmentStatus))("variant", "info")("icon", "fas fa-briefcase");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.work_location.title"));
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.getWorkLocationTypeLabel(ctx_r0.employee().workLocationType))("variant", "light")("icon", "fas fa-map-marker-alt");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.current_shift"));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_21_0 = ctx_r0.employee()) == null ? null : tmp_21_0.currentShiftName) ? 33 : 34);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_22_0 = ctx_r0.employee()) == null ? null : tmp_22_0.gender) ? 35 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.created_at"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(ctx_r0.employee().createdAtUtc));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_25_0 = ctx_r0.employee()) == null ? null : tmp_25_0.firstNameAr) || ((tmp_25_0 = ctx_r0.employee()) == null ? null : tmp_25_0.lastNameAr) || ((tmp_25_0 = ctx_r0.employee()) == null ? null : tmp_25_0.jobTitleAr) ? 41 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("common.actions"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.permissionService.has(ctx_r0.PERMISSIONS.EMPLOYEE_MANAGE) ? 48 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.permissionService.has(ctx_r0.PERMISSIONS.EMPLOYEE_DELETE) ? 49 : -1);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_25_Template, "ViewEmployeeComponent_Conditional_3_Conditional_25_Template");
function ViewEmployeeComponent_Conditional_3_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 45)(2, "div", 5)(3, "div", 46);
    \u0275\u0275element(4, "app-leave-balance-summary", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 22)(6, "div", 23)(7, "h5", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 46);
    \u0275\u0275element(10, "app-leave-transaction-history", 48);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("employeeId", ctx_r0.employeeId)("showHeader", true)("showYearSelector", true)("compact", false);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("leaveBalance.transactionHistory"));
    \u0275\u0275advance(2);
    \u0275\u0275property("employeeId", ctx_r0.employeeId)("showHeader", false)("showFilters", true)("compact", false)("itemsPerPage", 10);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Conditional_26_Template, "ViewEmployeeComponent_Conditional_3_Conditional_26_Template");
function ViewEmployeeComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "div", 8)(4, "div", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 10)(7, "h4", 11);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 12);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span", 13);
    \u0275\u0275text(12, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "span", 13);
    \u0275\u0275text(15, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div");
    \u0275\u0275element(18, "app-status-badge", 14);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "ul", 15)(20, "li", 16)(21, "button", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeComponent_Conditional_3_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeTab.set("info"));
    }, "ViewEmployeeComponent_Conditional_3_Template_button_click_21_listener"));
    \u0275\u0275element(22, "i", 18);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(24, ViewEmployeeComponent_Conditional_3_Conditional_24_Template, 4, 3, "li", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(25, ViewEmployeeComponent_Conditional_3_Conditional_25_Template, 50, 27, "div", 19);
    \u0275\u0275conditionalCreate(26, ViewEmployeeComponent_Conditional_3_Conditional_26_Template, 11, 10, "div", 19);
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", (((tmp_1_0 = ctx_r0.employee()) == null ? null : tmp_1_0.firstName == null ? null : tmp_1_0.firstName.charAt(0)) || "") == null ? null : (((tmp_1_0 = tmp_1_0) == null ? null : tmp_1_0.firstName == null ? null : tmp_1_0.firstName.charAt(0)) || "").toUpperCase(), "", (((tmp_1_0 = ctx_r0.employee()) == null ? null : tmp_1_0.lastName == null ? null : tmp_1_0.lastName.charAt(0)) || "") == null ? null : (((tmp_1_0 = tmp_1_0) == null ? null : tmp_1_0.lastName == null ? null : tmp_1_0.lastName.charAt(0)) || "").toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r0.employee()) == null ? null : tmp_2_0.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_3_0 = ctx_r0.employee()) == null ? null : tmp_3_0.employeeNumber, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (tmp_4_0 = ctx_r0.employee()) == null ? null : tmp_4_0.jobTitle, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ((tmp_5_0 = ctx_r0.employee()) == null ? null : tmp_5_0.departmentName) || "-", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ((tmp_6_0 = ctx_r0.employee()) == null ? null : tmp_6_0.isActive) ? "active" : "inactive");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r0.activeTab() === "info");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.personal_info"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.permissionService.has(ctx_r0.PERMISSIONS.LEAVE_BALANCE_READ) ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.activeTab() === "info" ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.activeTab() === "leave-balance" ? 26 : -1);
  }
}
__name(ViewEmployeeComponent_Conditional_3_Template, "ViewEmployeeComponent_Conditional_3_Template");
function ViewEmployeeComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.t("employees.employee_not_found"), " ");
  }
}
__name(ViewEmployeeComponent_Conditional_4_Template, "ViewEmployeeComponent_Conditional_4_Template");
var _ViewEmployeeComponent = class _ViewEmployeeComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  employeesService = inject(EmployeesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  employee = signal(null, ...ngDevMode ? [{ debugName: "employee" }] : []);
  employeeId = 0;
  // Permission constants for use in template
  PERMISSIONS = {
    EMPLOYEE_UPDATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`,
    EMPLOYEE_DELETE: `${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`,
    EMPLOYEE_MANAGE: `${PermissionResources.EMPLOYEE}.${PermissionActions.MANAGE}`,
    LEAVE_BALANCE_READ: `${PermissionResources.LEAVE_BALANCE}.${PermissionActions.READ}`
  };
  // Tab state for employee details
  activeTab = signal("info", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  ngOnInit() {
    this.employeeId = +this.route.snapshot.params["id"];
    if (this.employeeId) {
      this.loadEmployee();
    } else {
      this.router.navigate(["/employees"]);
    }
  }
  loadEmployee() {
    this.loading.set(true);
    this.employeesService.getEmployeeById(this.employeeId).subscribe({
      next: /* @__PURE__ */ __name((employee) => {
        this.employee.set(employee);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.error.set("Failed to load employee");
        this.loading.set(false);
        console.error("Error loading employee:", error);
      }, "error")
    });
  }
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
  getEmploymentStatusLabel(status) {
    return this.t(`employees.employment_status.${EmploymentStatus[status].toLowerCase()}`);
  }
  getGenderLabel(gender) {
    return this.t(`employees.gender.${Gender[gender].toLowerCase()}`);
  }
  getWorkLocationTypeLabel(type) {
    return this.t(`employees.work_location.${WorkLocationType[type].toLowerCase()}`);
  }
  t(key) {
    return this.i18n.t(key);
  }
  /**
   * Toggle employee active/inactive status
   */
  toggleEmployeeStatus() {
    return __async(this, null, function* () {
      const employee = this.employee();
      if (!employee)
        return;
      const isActive = employee.isActive;
      const actionKey = isActive ? "employees.deactivate" : "employees.activate";
      const confirmKey = isActive ? "employees.confirm_deactivate" : "employees.confirm_activate";
      const iconClass = isActive ? "text-danger" : "text-success";
      const confirmButtonClass = isActive ? "btn-danger" : "btn-success";
      const result = yield this.confirmationService.confirm({
        title: this.t(actionKey),
        message: this.t(confirmKey),
        confirmText: this.t("common.confirm"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass,
        icon: "fa-user",
        iconClass
      });
      if (result.confirmed) {
        this.employeesService.toggleEmployeeStatus(employee.id).subscribe({
          next: /* @__PURE__ */ __name((response) => {
            this.notificationService.success(response.message);
            this.loadEmployee();
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Error toggling employee status:", error);
            this.notificationService.error(error.error?.error || this.t("common.error_occurred"));
          }, "error")
        });
      }
    });
  }
  deleteEmployee() {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.t("employees.confirm_delete_title"),
        message: this.t("employees.confirm_delete_message"),
        confirmText: this.t("common.delete"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.employeesService.deleteEmployee(this.employeeId).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.t("employees.delete_success"));
            this.router.navigate(["/employees"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Error deleting employee:", error);
            this.notificationService.error(error.error?.error || this.t("common.error_occurred"));
          }, "error")
        });
      }
    });
  }
  // Computed properties for definition lists
  basicInfoItems = computed(() => {
    const employee = this.employee();
    if (!employee)
      return [];
    return [
      { label: this.t("employees.employee_number"), value: employee.employeeNumber },
      { label: this.t("employees.first_name"), value: employee.firstName },
      { label: this.t("employees.last_name"), value: employee.lastName },
      { label: this.t("employees.email"), value: employee.email || "-" },
      { label: this.t("employees.phone"), value: employee.phone || "-" },
      { label: this.t("employees.national_id"), value: employee.nationalId || "-" }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoItems" }] : []);
  employmentInfoItems = computed(() => {
    const employee = this.employee();
    if (!employee)
      return [];
    const items = [
      { label: this.t("employees.job_title"), value: employee.jobTitle },
      { label: this.t("employees.branch"), value: employee.branchName },
      { label: this.t("employees.department"), value: employee.departmentName || "-" },
      { label: this.t("employees.manager"), value: employee.managerName || "-" },
      { label: this.t("employees.hire_date"), value: this.formatDate(employee.hireDate), type: "date" }
    ];
    if (employee.dateOfBirth) {
      items.push({
        label: this.t("employees.date_of_birth"),
        value: this.formatDate(employee.dateOfBirth),
        type: "date"
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "employmentInfoItems" }] : []);
};
__name(_ViewEmployeeComponent, "ViewEmployeeComponent");
__publicField(_ViewEmployeeComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewEmployeeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewEmployeeComponent)();
}, "ViewEmployeeComponent_Factory"));
__publicField(_ViewEmployeeComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewEmployeeComponent, selectors: [["app-view-employee"]], decls: 5, vars: 4, consts: [[1, "container-fluid"], ["mode", "view", "moduleName", "employees", "moduleRoute", "employees", 3, "title", "entityId", "loading"], [1, "d-flex", "justify-content-center", "py-5"], [1, "alert", "alert-danger"], [3, "message", "centered"], [1, "card", "mb-4"], [1, "card-body"], [1, "d-flex", "align-items-center"], [1, "avatar-lg", "me-3"], [1, "avatar-title", "bg-primary-subtle", "text-primary", "rounded-circle", "fs-4"], [1, "flex-grow-1"], [1, "mb-1"], [1, "text-muted", "mb-0"], [1, "mx-2"], [3, "status"], [1, "nav", "nav-tabs", "mb-4"], [1, "nav-item"], ["type", "button", 1, "nav-link", 3, "click"], [1, "fa-solid", "fa-user", "me-2"], [1, "row"], [1, "fa-solid", "fa-calendar-check", "me-2"], [1, "col-lg-8"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "col-md-6"], [3, "items", "labelWidth", "valueWidth"], [1, "col-lg-4"], [1, "mb-3"], [1, "fw-semibold"], [3, "label", "variant", "icon"], [1, "text-muted"], [1, "card", "mt-3"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-outline-danger"], [3, "label", "variant", "showIcon"], [1, "mb-2"], ["type", "button", 1, "btn", "btn-outline-warning"], ["type", "button", 1, "btn", "btn-outline-success"], ["type", "button", 1, "btn", "btn-outline-warning", 3, "click"], [1, "fa-solid", "fa-user-slash", "me-2"], ["type", "button", 1, "btn", "btn-outline-success", 3, "click"], [1, "fa-solid", "fa-user-check", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click"], [1, "fa-solid", "fa-trash", "me-2"], [1, "col-12"], [1, "card-body", "p-0"], [3, "employeeId", "showHeader", "showYearSelector", "compact"], [3, "employeeId", "showHeader", "showFilters", "compact", "itemsPerPage"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function ViewEmployeeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewEmployeeComponent_Conditional_2_Template, 2, 2, "div", 2)(3, ViewEmployeeComponent_Conditional_3_Template, 27, 13)(4, ViewEmployeeComponent_Conditional_4_Template, 3, 1, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("employees.view_details"))("entityId", ctx.employeeId)("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : ctx.employee() ? 3 : 4);
  }
}, "ViewEmployeeComponent_Template"), dependencies: [FormsModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, LeaveBalanceSummaryComponent, LeaveTransactionHistoryComponent], styles: ['\n\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.icon-circle[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.performance-circle[_ngcontent-%COMP%] {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  margin: 0 auto;\n}\n.circle-progress[_ngcontent-%COMP%] {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  background:\n    conic-gradient(\n      #198754 0deg,\n      #198754 calc(var(--progress) * 3.6deg),\n      #e9ecef calc(var(--progress) * 3.6deg),\n      #e9ecef 360deg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  animation: _ngcontent-%COMP%_fadeIn 1s ease-in-out;\n}\n.circle-progress[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: white;\n}\n.percentage[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #198754;\n  z-index: 1;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@media (max-width: 768px) {\n  .performance-circle[_ngcontent-%COMP%] {\n    width: 100px;\n    height: 100px;\n  }\n  .circle-progress[_ngcontent-%COMP%] {\n    width: 100px;\n    height: 100px;\n  }\n  .circle-progress[_ngcontent-%COMP%]::before {\n    width: 70px;\n    height: 70px;\n  }\n  .percentage[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .icon-circle[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n  .icon-circle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n/*# sourceMappingURL=view-employee.component.css.map */'] }));
var ViewEmployeeComponent = _ViewEmployeeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewEmployeeComponent, [{
    type: Component,
    args: [{ selector: "app-view-employee", standalone: true, imports: [FormsModule, HasPermissionDirective, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, EmptyStateComponent, DefinitionListComponent, LeaveBalanceSummaryComponent, LeaveTransactionHistoryComponent], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="t('employees.view_details')"\r
    moduleName="employees"\r
    moduleRoute="employees"\r
    [entityId]="employeeId"\r
    [loading]="loading()">\r
  </app-form-header>\r
\r
  @if (loading()) {\r
    <div class="d-flex justify-content-center py-5">\r
      <app-loading-spinner\r
        [message]="t('common.loading')"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  } @else if (employee()) {\r
    <!-- Employee Header Card -->\r
    <div class="card mb-4">\r
      <div class="card-body">\r
        <div class="d-flex align-items-center">\r
          <div class="avatar-lg me-3">\r
            <div class="avatar-title bg-primary-subtle text-primary rounded-circle fs-4">\r
              {{ (employee()?.firstName?.charAt(0) || '')?.toUpperCase() }}{{ (employee()?.lastName?.charAt(0) || '')?.toUpperCase() }}\r
            </div>\r
          </div>\r
          <div class="flex-grow-1">\r
            <h4 class="mb-1">{{ employee()?.fullName }}</h4>\r
            <p class="text-muted mb-0">\r
              {{ employee()?.employeeNumber }}\r
              <span class="mx-2">|</span>\r
              {{ employee()?.jobTitle }}\r
              <span class="mx-2">|</span>\r
              {{ employee()?.departmentName || '-' }}\r
            </p>\r
          </div>\r
          <div>\r
            <app-status-badge\r
              [status]="employee()?.isActive ? 'active' : 'inactive'">\r
            </app-status-badge>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Tab Navigation -->\r
    <ul class="nav nav-tabs mb-4">\r
      <li class="nav-item">\r
        <button\r
          type="button"\r
          class="nav-link"\r
          [class.active]="activeTab() === 'info'"\r
          (click)="activeTab.set('info')">\r
          <i class="fa-solid fa-user me-2"></i>\r
          {{ t('employees.personal_info') }}\r
        </button>\r
      </li>\r
      @if (permissionService.has(PERMISSIONS.LEAVE_BALANCE_READ)) {\r
        <li class="nav-item">\r
          <button\r
            type="button"\r
            class="nav-link"\r
            [class.active]="activeTab() === 'leave-balance'"\r
            (click)="activeTab.set('leave-balance')">\r
            <i class="fa-solid fa-calendar-check me-2"></i>\r
            {{ t('leaveBalance.balanceSummary') }}\r
          </button>\r
        </li>\r
      }\r
    </ul>\r
\r
    <!-- Tab Content -->\r
    @if (activeTab() === 'info') {\r
      <!-- Employee Details -->\r
      <div class="row">\r
        <!-- Main Information Card -->\r
        <div class="col-lg-8">\r
          <div class="card">\r
            <div class="card-header">\r
              <h5 class="card-title mb-0">{{ t('employees.basic_information') }}</h5>\r
            </div>\r
            <div class="card-body">\r
              <div class="row">\r
                <!-- Basic Information -->\r
                <div class="col-md-6">\r
                  <app-definition-list\r
                    [items]="basicInfoItems()"\r
                    [labelWidth]="'5'"\r
                    [valueWidth]="'7'">\r
                  </app-definition-list>\r
                </div>\r
\r
                <!-- Employment Information -->\r
                <div class="col-md-6">\r
                  <app-definition-list\r
                    [items]="employmentInfoItems()"\r
                    [labelWidth]="'5'"\r
                    [valueWidth]="'7'">\r
                  </app-definition-list>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
      <!-- Status and Details Card -->\r
      <div class="col-lg-4">\r
        <div class="card">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">{{ t('employees.employment_details') }}</h6>\r
          </div>\r
          <div class="card-body">\r
            <!-- Status -->\r
            <div class="mb-3">\r
              <h6 class="fw-semibold">{{ t('common.status') }}</h6>\r
              <app-status-badge\r
                [status]="employee()?.isActive ? 'active' : 'inactive'">\r
              </app-status-badge>\r
            </div>\r
            \r
            <!-- Employment Status -->\r
            <div class="mb-3">\r
              <h6 class="fw-semibold">{{ t('employees.employment_status.title') }}</h6>\r
              <app-status-badge\r
                [label]="getEmploymentStatusLabel(employee()!.employmentStatus)"\r
                [variant]="'info'"\r
                [icon]="'fas fa-briefcase'">\r
              </app-status-badge>\r
            </div>\r
\r
            <!-- Work Location -->\r
            <div class="mb-3">\r
              <h6 class="fw-semibold">{{ t('employees.work_location.title') }}</h6>\r
              <app-status-badge\r
                [label]="getWorkLocationTypeLabel(employee()!.workLocationType)"\r
                [variant]="'light'"\r
                [icon]="'fas fa-map-marker-alt'">\r
              </app-status-badge>\r
            </div>\r
\r
            <!-- Current Shift -->\r
            <div class="mb-3">\r
              <h6 class="fw-semibold">{{ t('employees.current_shift') }}</h6>\r
              @if (employee()?.currentShiftName) {\r
                <app-status-badge\r
                  [label]="employee()!.currentShiftName"\r
                  [variant]="'primary'"\r
                  [icon]="'fas fa-clock'">\r
                </app-status-badge>\r
              } @else {\r
                <span class="text-muted">{{ t('employees.no_shift_assigned') }}</span>\r
              }\r
            </div>\r
\r
            <!-- Gender -->\r
            @if (employee()?.gender) {\r
              <div class="mb-3">\r
                <h6 class="fw-semibold">{{ t('employees.gender.title') }}</h6>\r
                <app-status-badge\r
                  [label]="getGenderLabel(employee()!.gender!)"\r
                  [variant]="'light'"\r
                  [showIcon]="false">\r
                </app-status-badge>\r
              </div>\r
            }\r
\r
            <!-- Created Date -->\r
            <div>\r
              <h6 class="fw-semibold">{{ t('employees.created_at') }}</h6>\r
              <small class="text-muted">{{ formatDate(employee()!.createdAtUtc) }}</small>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Arabic Names Card (if available) -->\r
        @if (employee()?.firstNameAr || employee()?.lastNameAr || employee()?.jobTitleAr) {\r
          <div class="card mt-3">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">{{ t('employees.arabic_names') }}</h6>\r
            </div>\r
            <div class="card-body">\r
              @if (employee()?.firstNameAr) {\r
                <div class="mb-2">\r
                  <small class="text-muted">{{ t('employees.first_name_ar') }}</small><br>\r
                  <span>{{ employee()?.firstNameAr }}</span>\r
                </div>\r
              }\r
              @if (employee()?.lastNameAr) {\r
                <div class="mb-2">\r
                  <small class="text-muted">{{ t('employees.last_name_ar') }}</small><br>\r
                  <span>{{ employee()?.lastNameAr }}</span>\r
                </div>\r
              }\r
              @if (employee()?.jobTitleAr) {\r
                <div>\r
                  <small class="text-muted">{{ t('employees.job_title_ar') }}</small><br>\r
                  <span>{{ employee()?.jobTitleAr }}</span>\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Quick Actions Card -->\r
        <div class="card mt-3">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">{{ t('common.actions') }}</h6>\r
          </div>\r
          <div class="card-body">\r
            <div class="d-grid gap-2">\r
              @if (permissionService.has(PERMISSIONS.EMPLOYEE_MANAGE)) {\r
                @if (employee()?.isActive) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-warning"\r
                    (click)="toggleEmployeeStatus()">\r
                    <i class="fa-solid fa-user-slash me-2"></i>\r
                    {{ t('employees.deactivate') }}\r
                  </button>\r
                } @else {\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-success"\r
                    (click)="toggleEmployeeStatus()">\r
                    <i class="fa-solid fa-user-check me-2"></i>\r
                    {{ t('employees.activate') }}\r
                  </button>\r
                }\r
              }\r
\r
              @if (permissionService.has(PERMISSIONS.EMPLOYEE_DELETE)) {\r
                <button\r
                  type="button"\r
                  class="btn btn-outline-danger"\r
                  (click)="deleteEmployee()">\r
                  <i class="fa-solid fa-trash me-2"></i>\r
                  {{ t('employees.delete') }}\r
                </button>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
    }\r
\r
    <!-- Leave Balance Tab -->\r
    @if (activeTab() === 'leave-balance') {\r
      <div class="row">\r
        <div class="col-12">\r
          <!-- Leave Balance Summary -->\r
          <div class="card mb-4">\r
            <div class="card-body p-0">\r
              <app-leave-balance-summary\r
                [employeeId]="employeeId"\r
                [showHeader]="true"\r
                [showYearSelector]="true"\r
                [compact]="false">\r
              </app-leave-balance-summary>\r
            </div>\r
          </div>\r
\r
          <!-- Leave Transaction History -->\r
          <div class="card">\r
            <div class="card-header">\r
              <h5 class="card-title mb-0">{{ t('leaveBalance.transactionHistory') }}</h5>\r
            </div>\r
            <div class="card-body p-0">\r
              <app-leave-transaction-history\r
                [employeeId]="employeeId"\r
                [showHeader]="false"\r
                [showFilters]="true"\r
                [compact]="false"\r
                [itemsPerPage]="10">\r
              </app-leave-transaction-history>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  } @else {\r
    <div class="alert alert-danger">\r
      <i class="fa-solid fa-exclamation-triangle me-2"></i>\r
      {{ error() || t('employees.employee_not_found') }}\r
    </div>\r
  }\r
</div>`, styles: ['/* src/app/pages/employees/view-employee/view-employee.component.css */\n.avatar-sm {\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.icon-circle {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-circle i {\n  font-size: 1.2rem;\n}\n.performance-circle {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  margin: 0 auto;\n}\n.circle-progress {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  background:\n    conic-gradient(\n      #198754 0deg,\n      #198754 calc(var(--progress) * 3.6deg),\n      #e9ecef calc(var(--progress) * 3.6deg),\n      #e9ecef 360deg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  animation: fadeIn 1s ease-in-out;\n}\n.circle-progress::before {\n  content: "";\n  position: absolute;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: white;\n}\n.percentage {\n  position: relative;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #198754;\n  z-index: 1;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@media (max-width: 768px) {\n  .performance-circle {\n    width: 100px;\n    height: 100px;\n  }\n  .circle-progress {\n    width: 100px;\n    height: 100px;\n  }\n  .circle-progress::before {\n    width: 70px;\n    height: 70px;\n  }\n  .percentage {\n    font-size: 1.2rem;\n  }\n  .icon-circle {\n    width: 40px;\n    height: 40px;\n  }\n  .icon-circle i {\n    font-size: 1rem;\n  }\n}\n/*# sourceMappingURL=view-employee.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewEmployeeComponent, { className: "ViewEmployeeComponent", filePath: "src/app/pages/employees/view-employee/view-employee.component.ts", lineNumber: 28 });
})();
export {
  ViewEmployeeComponent
};
//# sourceMappingURL=chunk-YYRNYWRT.js.map
