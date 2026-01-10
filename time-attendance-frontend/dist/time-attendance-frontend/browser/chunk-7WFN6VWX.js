import {
  ApprovalsService
} from "./chunk-HGEE4NK5.js";
import {
  EmptyStateComponent
} from "./chunk-NKWUQBPB.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import {
  Router,
  RouterLink
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  CommonModule,
  Component,
  SlicePipe,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate5
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/approvals/approval-history/approval-history.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
var _forTrack1 = /* @__PURE__ */ __name(($index, $item) => $item.workflowInstanceId, "_forTrack1");
function ApprovalHistoryComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r1 = ctx.$implicit;
    \u0275\u0275property("value", type_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r1.label);
  }
}
__name(ApprovalHistoryComponent_For_15_Template, "ApprovalHistoryComponent_For_15_Template");
function ApprovalHistoryComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r2 = ctx.$implicit;
    \u0275\u0275property("value", action_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(action_r2.label);
  }
}
__name(ApprovalHistoryComponent_For_21_Template, "ApprovalHistoryComponent_For_21_Template");
function ApprovalHistoryComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275element(2, "app-loading-spinner");
    \u0275\u0275elementStart(3, "p", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.t("app.loading"));
  }
}
__name(ApprovalHistoryComponent_Conditional_34_Template, "ApprovalHistoryComponent_Conditional_34_Template");
function ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "slice");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("title", item_r4.comments);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.comments.length > 50 ? \u0275\u0275pipeBind3(2, 2, item_r4.comments, 0, 50) + "..." : item_r4.comments, " ");
  }
}
__name(ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Conditional_14_Template, "ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Conditional_14_Template");
function ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
__name(ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Conditional_15_Template, "ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Conditional_15_Template");
function ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275conditionalCreate(14, ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Conditional_14_Template, 3, 6, "span", 24)(15, ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Conditional_15_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getEntityTypeBadgeClass(item_r4.entityType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("approvals.entity_type_" + item_r4.entityType.toLowerCase()), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.requestedByName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.stepName);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getActionBadgeClass(item_r4.action));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("approvals.action_" + item_r4.action.toLowerCase()), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(item_r4.actionTakenAt));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r4.comments ? 14 : 15);
  }
}
__name(ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Template, "ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Template");
function ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 27)(1, "button", 30);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_For_9_Template_button_click_1_listener() {
      const \u0275$index_154_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.onPageChange(\u0275$index_154_r7 + 1));
    }, "ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_For_9_Template_button_click_1_listener"));
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const \u0275$index_154_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", ctx_r2.currentPage() === \u0275$index_154_r7 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_154_r7 + 1);
  }
}
__name(ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_For_9_Template, "ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_For_9_Template");
function ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "nav")(4, "ul", 26)(5, "li", 27)(6, "button", 28);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onPageChange(ctx_r2.currentPage() - 1));
    }, "ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_Template_button_click_6_listener"));
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(8, ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_For_9_Template, 3, 3, "li", 29, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(10, "li", 27)(11, "button", 28);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onPageChange(ctx_r2.currentPage() + 1));
    }, "ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_Template_button_click_11_listener"));
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate5(" ", ctx_r2.t("common.showing"), " ", (ctx_r2.currentPage() - 1) * ctx_r2.pageSize() + 1, " - ", ctx_r2.getMaxShowingCount(), " ", ctx_r2.t("common.of"), " ", ctx_r2.totalCount(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", ctx_r2.currentPage() === 1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.currentPage() === 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("common.previous"), " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(13, _c0).constructor(ctx_r2.totalPages()));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r2.currentPage() === ctx_r2.totalPages());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.currentPage() === ctx_r2.totalPages());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("common.next"), " ");
  }
}
__name(ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_Template, "ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_Template");
function ApprovalHistoryComponent_Conditional_35_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 6)(2, "div", 21)(3, "table", 22)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, ApprovalHistoryComponent_Conditional_35_Conditional_0_For_20_Template, 16, 10, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(21, ApprovalHistoryComponent_Conditional_35_Conditional_0_Conditional_21_Template, 13, 14, "div", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.t("approvals.entity_type"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("approvals.requester"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("approvals.step"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("approvals.action"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("approvals.action_date"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("approvals.comments"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.historyItems());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.totalPages() > 1 ? 21 : -1);
  }
}
__name(ApprovalHistoryComponent_Conditional_35_Conditional_0_Template, "ApprovalHistoryComponent_Conditional_35_Conditional_0_Template");
function ApprovalHistoryComponent_Conditional_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 20);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r2.t("approvals.no_history"))("message", ctx_r2.t("approvals.no_history_message"));
  }
}
__name(ApprovalHistoryComponent_Conditional_35_Conditional_1_Template, "ApprovalHistoryComponent_Conditional_35_Conditional_1_Template");
function ApprovalHistoryComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ApprovalHistoryComponent_Conditional_35_Conditional_0_Template, 22, 7, "div", 17)(1, ApprovalHistoryComponent_Conditional_35_Conditional_1_Template, 1, 2, "app-empty-state", 20);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.historyItems().length > 0 ? 0 : 1);
  }
}
__name(ApprovalHistoryComponent_Conditional_35_Template, "ApprovalHistoryComponent_Conditional_35_Template");
var _ApprovalHistoryComponent = class _ApprovalHistoryComponent {
  approvalsService = inject(ApprovalsService);
  notificationService = inject(NotificationService);
  router = inject(Router);
  i18n = inject(I18nService);
  // State
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  historyItems = signal([], ...ngDevMode ? [{ debugName: "historyItems" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  // Pagination
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  // Filters
  entityTypeFilter = signal("", ...ngDevMode ? [{ debugName: "entityTypeFilter" }] : []);
  actionFilter = signal("", ...ngDevMode ? [{ debugName: "actionFilter" }] : []);
  dateFromFilter = signal("", ...ngDevMode ? [{ debugName: "dateFromFilter" }] : []);
  dateToFilter = signal("", ...ngDevMode ? [{ debugName: "dateToFilter" }] : []);
  // Entity type options for filter
  entityTypes = [
    { value: "", label: this.t("common.all") },
    { value: "Vacation", label: this.t("approvals.entity_type_vacation") },
    { value: "Excuse", label: this.t("approvals.entity_type_excuse") },
    { value: "RemoteWork", label: this.t("approvals.entity_type_remote_work") },
    { value: "Overtime", label: this.t("approvals.entity_type_overtime") },
    { value: "Timesheet", label: this.t("approvals.entity_type_timesheet") }
  ];
  // Action options for filter
  actionOptions = [
    { value: "", label: this.t("common.all") },
    { value: "Approved", label: this.t("approvals.action_approved") },
    { value: "Rejected", label: this.t("approvals.action_rejected") },
    { value: "Delegated", label: this.t("approvals.action_delegated") }
  ];
  // Table columns
  columns = [
    {
      key: "entityType",
      label: this.t("approvals.entity_type"),
      sortable: true,
      template: "entityType"
    },
    {
      key: "requesterName",
      label: this.t("approvals.requester"),
      sortable: true
    },
    {
      key: "stepName",
      label: this.t("approvals.step"),
      sortable: true
    },
    {
      key: "action",
      label: this.t("approvals.action"),
      sortable: true,
      template: "action"
    },
    {
      key: "actionTakenAt",
      label: this.t("approvals.action_date"),
      sortable: true,
      template: "date"
    },
    {
      key: "comments",
      label: this.t("approvals.comments"),
      sortable: false
    }
  ];
  // Computed
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()), ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  ngOnInit() {
    this.loadHistory();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadHistory() {
    this.loading.set(true);
    const params = {
      page: this.currentPage(),
      pageSize: this.pageSize()
    };
    if (this.entityTypeFilter()) {
      params.entityType = this.entityTypeFilter();
    }
    if (this.actionFilter()) {
      params.action = this.actionFilter();
    }
    if (this.dateFromFilter()) {
      params.dateFrom = this.dateFromFilter();
    }
    if (this.dateToFilter()) {
      params.dateTo = this.dateToFilter();
    }
    this.approvalsService.getApprovalHistory(params).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        if (response && response.items) {
          this.historyItems.set(response.items);
          this.totalCount.set(response.totalCount || 0);
        } else {
          this.historyItems.set([]);
          this.totalCount.set(0);
        }
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading approval history:", error);
        this.notificationService.error(this.t("app.error"), this.t("approvals.load_error"));
        this.loading.set(false);
      }, "error")
    });
  }
  onEntityTypeFilterChange(value) {
    this.entityTypeFilter.set(value);
    this.currentPage.set(1);
    this.loadHistory();
  }
  onActionFilterChange(value) {
    this.actionFilter.set(value);
    this.currentPage.set(1);
    this.loadHistory();
  }
  onDateFromChange(value) {
    this.dateFromFilter.set(value);
    this.currentPage.set(1);
    this.loadHistory();
  }
  onDateToChange(value) {
    this.dateToFilter.set(value);
    this.currentPage.set(1);
    this.loadHistory();
  }
  clearFilters() {
    this.entityTypeFilter.set("");
    this.actionFilter.set("");
    this.dateFromFilter.set("");
    this.dateToFilter.set("");
    this.currentPage.set(1);
    this.loadHistory();
  }
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadHistory();
  }
  onPageSizeChange(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadHistory();
  }
  getEntityTypeBadgeClass(entityType) {
    const classes = {
      "Vacation": "bg-success",
      "Excuse": "bg-info",
      "RemoteWork": "bg-primary",
      "Overtime": "bg-warning",
      "Timesheet": "bg-secondary"
    };
    return `badge ${classes[entityType] || "bg-secondary"}`;
  }
  getActionBadgeClass(action) {
    const classes = {
      "Approved": "bg-success",
      "Rejected": "bg-danger",
      "Delegated": "bg-info",
      "Skipped": "bg-secondary",
      "TimedOut": "bg-warning"
    };
    return `badge ${classes[action] || "bg-secondary"}`;
  }
  formatDate(date) {
    if (!date)
      return "-";
    return new Date(date).toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  getMaxShowingCount() {
    const maxOnPage = this.currentPage() * this.pageSize();
    return Math.min(maxOnPage, this.totalCount());
  }
  goBack() {
    this.router.navigate(["/approvals"]);
  }
};
__name(_ApprovalHistoryComponent, "ApprovalHistoryComponent");
__publicField(_ApprovalHistoryComponent, "\u0275fac", /* @__PURE__ */ __name(function ApprovalHistoryComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ApprovalHistoryComponent)();
}, "ApprovalHistoryComponent_Factory"));
__publicField(_ApprovalHistoryComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApprovalHistoryComponent, selectors: [["app-approval-history"]], decls: 36, vars: 12, consts: [[1, "container-fluid", "py-4"], [1, "d-flex", "align-items-center", "mb-4"], ["type", "button", "routerLink", "/approvals", 1, "btn", "btn-outline-secondary", "me-3"], [1, "fa-solid", "fa-arrow-left", "me-1"], [1, "h3", "mb-0"], [1, "card", "mb-4"], [1, "card-body"], [1, "row", "g-3"], [1, "col-md-3"], [1, "form-label"], [1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "col-md-2"], ["type", "date", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-md-2", "d-flex", "align-items-end"], ["type", "button", 1, "btn", "btn-outline-secondary", "w-100", 3, "click"], [1, "fa-solid", "fa-times", "me-1"], [1, "card"], [1, "card-body", "text-center", "py-5"], [1, "mt-3", "text-muted"], ["icon", "fa-solid fa-history", 3, "title", "message"], [1, "table-responsive"], [1, "table", "table-hover"], [1, "d-flex", "justify-content-between", "align-items-center", "mt-4"], [1, "text-muted", 3, "title"], [1, "text-muted"], [1, "pagination", "mb-0"], [1, "page-item"], [1, "page-link", 3, "click", "disabled"], [1, "page-item", 3, "active"], [1, "page-link", 3, "click"]], template: /* @__PURE__ */ __name(function ApprovalHistoryComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
    \u0275\u0275element(3, "i", 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1", 4);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "div", 7)(10, "div", 8)(11, "label", 9);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 10);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function ApprovalHistoryComponent_Template_select_ngModelChange_13_listener($event) {
      return ctx.onEntityTypeFilterChange($event);
    }, "ApprovalHistoryComponent_Template_select_ngModelChange_13_listener"));
    \u0275\u0275repeaterCreate(14, ApprovalHistoryComponent_For_15_Template, 2, 2, "option", 11, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 8)(17, "label", 9);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 10);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function ApprovalHistoryComponent_Template_select_ngModelChange_19_listener($event) {
      return ctx.onActionFilterChange($event);
    }, "ApprovalHistoryComponent_Template_select_ngModelChange_19_listener"));
    \u0275\u0275repeaterCreate(20, ApprovalHistoryComponent_For_21_Template, 2, 2, "option", 11, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 12)(23, "label", 9);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 13);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function ApprovalHistoryComponent_Template_input_ngModelChange_25_listener($event) {
      return ctx.onDateFromChange($event);
    }, "ApprovalHistoryComponent_Template_input_ngModelChange_25_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 12)(27, "label", 9);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 13);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function ApprovalHistoryComponent_Template_input_ngModelChange_29_listener($event) {
      return ctx.onDateToChange($event);
    }, "ApprovalHistoryComponent_Template_input_ngModelChange_29_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 14)(31, "button", 15);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ApprovalHistoryComponent_Template_button_click_31_listener() {
      return ctx.clearFilters();
    }, "ApprovalHistoryComponent_Template_button_click_31_listener"));
    \u0275\u0275element(32, "i", 16);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(34, ApprovalHistoryComponent_Conditional_34_Template, 5, 1, "div", 17)(35, ApprovalHistoryComponent_Conditional_35_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.back"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("approvals.history_title"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.t("approvals.filter_entity_type"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.entityTypeFilter());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.entityTypes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("approvals.filter_action"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.actionFilter());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.actionOptions);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("approvals.filter_date_from"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.dateFromFilter());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("approvals.filter_date_to"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.dateToFilter());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.clear_filters"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 34 : 35);
  }
}, "ApprovalHistoryComponent_Template"), dependencies: [
  CommonModule,
  FormsModule,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DefaultValueAccessor,
  SelectControlValueAccessor,
  NgControlStatus,
  NgModel,
  RouterLink,
  EmptyStateComponent,
  LoadingSpinnerComponent,
  SlicePipe
], styles: ["\n\n.badge[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.card[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  white-space: nowrap;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.text-muted[title][_ngcontent-%COMP%] {\n  cursor: help;\n}\n.pagination[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.page-link[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n}\n@media (max-width: 768px) {\n  .row.g-3[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n}\n/*# sourceMappingURL=approval-history.component.css.map */"] }));
var ApprovalHistoryComponent = _ApprovalHistoryComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApprovalHistoryComponent, [{
    type: Component,
    args: [{ selector: "app-approval-history", standalone: true, imports: [
      CommonModule,
      FormsModule,
      RouterLink,
      EmptyStateComponent,
      LoadingSpinnerComponent
    ], template: `<div class="container-fluid py-4">\r
  <!-- Page Header with Back Button -->\r
  <div class="d-flex align-items-center mb-4">\r
    <button\r
      type="button"\r
      class="btn btn-outline-secondary me-3"\r
      routerLink="/approvals">\r
      <i class="fa-solid fa-arrow-left me-1"></i>\r
      {{ t('common.back') }}\r
    </button>\r
    <h1 class="h3 mb-0">{{ t('approvals.history_title') }}</h1>\r
  </div>\r
\r
  <!-- Filters Section -->\r
  <div class="card mb-4">\r
    <div class="card-body">\r
      <div class="row g-3">\r
        <div class="col-md-3">\r
          <label class="form-label">{{ t('approvals.filter_entity_type') }}</label>\r
          <select\r
            class="form-select"\r
            [ngModel]="entityTypeFilter()"\r
            (ngModelChange)="onEntityTypeFilterChange($event)">\r
            @for (type of entityTypes; track type.value) {\r
              <option [value]="type.value">{{ type.label }}</option>\r
            }\r
          </select>\r
        </div>\r
        <div class="col-md-3">\r
          <label class="form-label">{{ t('approvals.filter_action') }}</label>\r
          <select\r
            class="form-select"\r
            [ngModel]="actionFilter()"\r
            (ngModelChange)="onActionFilterChange($event)">\r
            @for (action of actionOptions; track action.value) {\r
              <option [value]="action.value">{{ action.label }}</option>\r
            }\r
          </select>\r
        </div>\r
        <div class="col-md-2">\r
          <label class="form-label">{{ t('approvals.filter_date_from') }}</label>\r
          <input\r
            type="date"\r
            class="form-control"\r
            [ngModel]="dateFromFilter()"\r
            (ngModelChange)="onDateFromChange($event)">\r
        </div>\r
        <div class="col-md-2">\r
          <label class="form-label">{{ t('approvals.filter_date_to') }}</label>\r
          <input\r
            type="date"\r
            class="form-control"\r
            [ngModel]="dateToFilter()"\r
            (ngModelChange)="onDateToChange($event)">\r
        </div>\r
        <div class="col-md-2 d-flex align-items-end">\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary w-100"\r
            (click)="clearFilters()">\r
            <i class="fa-solid fa-times me-1"></i>\r
            {{ t('common.clear_filters') }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="card">\r
      <div class="card-body text-center py-5">\r
        <app-loading-spinner></app-loading-spinner>\r
        <p class="mt-3 text-muted">{{ t('app.loading') }}</p>\r
      </div>\r
    </div>\r
  } @else {\r
    <!-- History Table -->\r
    @if (historyItems().length > 0) {\r
      <div class="card">\r
        <div class="card-body">\r
          <div class="table-responsive">\r
            <table class="table table-hover">\r
              <thead>\r
                <tr>\r
                  <th>{{ t('approvals.entity_type') }}</th>\r
                  <th>{{ t('approvals.requester') }}</th>\r
                  <th>{{ t('approvals.step') }}</th>\r
                  <th>{{ t('approvals.action') }}</th>\r
                  <th>{{ t('approvals.action_date') }}</th>\r
                  <th>{{ t('approvals.comments') }}</th>\r
                </tr>\r
              </thead>\r
              <tbody>\r
                @for (item of historyItems(); track item.workflowInstanceId) {\r
                  <tr>\r
                    <td>\r
                      <span [class]="getEntityTypeBadgeClass(item.entityType)">\r
                        {{ t('approvals.entity_type_' + item.entityType.toLowerCase()) }}\r
                      </span>\r
                    </td>\r
                    <td>{{ item.requestedByName }}</td>\r
                    <td>{{ item.stepName }}</td>\r
                    <td>\r
                      <span [class]="getActionBadgeClass(item.action)">\r
                        {{ t('approvals.action_' + item.action.toLowerCase()) }}\r
                      </span>\r
                    </td>\r
                    <td>{{ formatDate(item.actionTakenAt) }}</td>\r
                    <td>\r
                      @if (item.comments) {\r
                        <span class="text-muted" [title]="item.comments">\r
                          {{ item.comments.length > 50 ? (item.comments | slice:0:50) + '...' : item.comments }}\r
                        </span>\r
                      } @else {\r
                        <span class="text-muted">-</span>\r
                      }\r
                    </td>\r
                  </tr>\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
\r
          <!-- Pagination -->\r
          @if (totalPages() > 1) {\r
            <div class="d-flex justify-content-between align-items-center mt-4">\r
              <div class="text-muted">\r
                {{ t('common.showing') }} {{ (currentPage() - 1) * pageSize() + 1 }} - {{ getMaxShowingCount() }} {{ t('common.of') }} {{ totalCount() }}\r
              </div>\r
              <nav>\r
                <ul class="pagination mb-0">\r
                  <li class="page-item" [class.disabled]="currentPage() === 1">\r
                    <button class="page-link" (click)="onPageChange(currentPage() - 1)" [disabled]="currentPage() === 1">\r
                      {{ t('common.previous') }}\r
                    </button>\r
                  </li>\r
                  @for (page of [].constructor(totalPages()); track $index; let i = $index) {\r
                    <li class="page-item" [class.active]="currentPage() === i + 1">\r
                      <button class="page-link" (click)="onPageChange(i + 1)">{{ i + 1 }}</button>\r
                    </li>\r
                  }\r
                  <li class="page-item" [class.disabled]="currentPage() === totalPages()">\r
                    <button class="page-link" (click)="onPageChange(currentPage() + 1)" [disabled]="currentPage() === totalPages()">\r
                      {{ t('common.next') }}\r
                    </button>\r
                  </li>\r
                </ul>\r
              </nav>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    } @else {\r
      <!-- Empty State -->\r
      <app-empty-state\r
        [title]="t('approvals.no_history')"\r
        [message]="t('approvals.no_history_message')"\r
        icon="fa-solid fa-history">\r
      </app-empty-state>\r
    }\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/approvals/approval-history/approval-history.component.css */\n.badge {\n  font-weight: 500;\n}\n.card .form-label {\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n.table th {\n  font-weight: 600;\n  white-space: nowrap;\n}\n.table td {\n  vertical-align: middle;\n}\n.text-muted[title] {\n  cursor: help;\n}\n.pagination {\n  margin-bottom: 0;\n}\n.page-link {\n  padding: 0.375rem 0.75rem;\n}\n@media (max-width: 768px) {\n  .row.g-3 > div {\n    margin-bottom: 0.5rem;\n  }\n  .table-responsive {\n    font-size: 0.875rem;\n  }\n}\n/*# sourceMappingURL=approval-history.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApprovalHistoryComponent, { className: "ApprovalHistoryComponent", filePath: "src/app/pages/approvals/approval-history/approval-history.component.ts", lineNumber: 33 });
})();
export {
  ApprovalHistoryComponent
};
//# sourceMappingURL=chunk-7WFN6VWX.js.map
