import {
  EmployeeExcusesService
} from "./chunk-OD7FZ73P.js";
import {
  DataTableComponent
} from "./chunk-JW5UYWPK.js";
import {
  UnifiedFilterComponent
} from "./chunk-KEVORF3C.js";
import "./chunk-NKWUQBPB.js";
import "./chunk-SKLP6OYI.js";
import {
  ExcuseStatus
} from "./chunk-MMUPQRFG.js";
import "./chunk-XLGMY32C.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import {
  PermissionActions
} from "./chunk-EVMJ7ILG.js";
import "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
  Router
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  CommonModule,
  Component,
  DatePipe,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/employee-excuses/employee-excuses.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
var _c1 = /* @__PURE__ */ __name(() => [10, 25, 50, 100], "_c1");
function EmployeeExcusesComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDuration(item_r2.durationHours), " ");
  }
}
__name(EmployeeExcusesComponent_ng_template_4_Template, "EmployeeExcusesComponent_ng_template_4_Template");
function EmployeeExcusesComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275property("title", item_r4.reason);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.reason, " ");
  }
}
__name(EmployeeExcusesComponent_ng_template_6_Template, "EmployeeExcusesComponent_ng_template_6_Template");
function EmployeeExcusesComponent_ng_template_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 10);
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("title", item_r5.policyViolationReason);
  }
}
__name(EmployeeExcusesComponent_ng_template_8_Conditional_2_Template, "EmployeeExcusesComponent_ng_template_8_Conditional_2_Template");
function EmployeeExcusesComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, EmployeeExcusesComponent_ng_template_8_Conditional_2_Template, 1, 1, "i", 10);
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.getStatusClass(item_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatStatus(item_r5.status), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!item_r5.isWithinPolicy && item_r5.policyViolationReason ? 2 : -1);
  }
}
__name(EmployeeExcusesComponent_ng_template_8_Template, "EmployeeExcusesComponent_ng_template_8_Template");
function EmployeeExcusesComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const column_r7 = ctx.column;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, column_r7 === "excuseDate" ? item_r6.excuseDate : item_r6.submissionDate, "short"), " ");
  }
}
__name(EmployeeExcusesComponent_ng_template_10_Template, "EmployeeExcusesComponent_ng_template_10_Template");
function EmployeeExcusesComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "i", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.error(), " ");
  }
}
__name(EmployeeExcusesComponent_Conditional_12_Template, "EmployeeExcusesComponent_Conditional_12_Template");
var _EmployeeExcusesComponent = class _EmployeeExcusesComponent {
  employeeExcusesService = inject(EmployeeExcusesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants
  PERMISSIONS = {
    EXCUSE_CREATE: `excuse.${PermissionActions.CREATE}`,
    EXCUSE_READ: `excuse.${PermissionActions.READ}`,
    EXCUSE_UPDATE: `excuse.${PermissionActions.UPDATE}`,
    EXCUSE_DELETE: `excuse.${PermissionActions.DELETE}`
  };
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  selectedEmployeeId = signal(void 0, ...ngDevMode ? [{ debugName: "selectedEmployeeId" }] : []);
  selectedDepartmentId = signal(void 0, ...ngDevMode ? [{ debugName: "selectedDepartmentId" }] : []);
  selectedBranchId = signal(void 0, ...ngDevMode ? [{ debugName: "selectedBranchId" }] : []);
  selectedStatus = signal(void 0, ...ngDevMode ? [{ debugName: "selectedStatus" }] : []);
  fromDate = signal(void 0, ...ngDevMode ? [{ debugName: "fromDate" }] : []);
  toDate = signal(void 0, ...ngDevMode ? [{ debugName: "toDate" }] : []);
  searchTerm = signal(void 0, ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  // Service signals
  employeeExcuses = this.employeeExcusesService.employeeExcuses;
  pagedResult = this.employeeExcusesService.pagedResult;
  statistics = this.employeeExcusesService.statistics;
  error = this.employeeExcusesService.error;
  // Table configuration
  tableColumns = [
    { key: "employeeName", label: this.i18n.t("employee_excuses.employee"), sortable: true, width: "15%" },
    { key: "employeeNumber", label: this.i18n.t("employee_excuses.employee_number"), sortable: true, width: "10%" },
    { key: "departmentName", label: this.i18n.t("employee_excuses.department"), sortable: true, width: "12%" },
    { key: "excuseDate", label: this.i18n.t("employee_excuses.excuse_date"), sortable: true, width: "10%" },
    { key: "durationHours", label: this.i18n.t("employee_excuses.duration"), sortable: false, width: "8%" },
    { key: "reason", label: this.i18n.t("employee_excuses.reason"), sortable: false, width: "15%" },
    { key: "status", label: this.i18n.t("employee_excuses.status"), sortable: true, width: "10%" },
    { key: "submissionDate", label: this.i18n.t("employee_excuses.submitted_date"), sortable: true, width: "10%" }
  ];
  // Table actions
  tableActions = [
    {
      key: "view",
      label: this.i18n.t("common.view"),
      icon: "fa-eye",
      color: "primary",
      condition: /* @__PURE__ */ __name((item) => {
        return this.permissionService.has(`excuse.${PermissionActions.READ}`) || this.permissionService.hasRole("SystemAdmin");
      }, "condition")
    },
    {
      key: "edit",
      label: this.i18n.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name((item) => {
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.UPDATE}`) || this.permissionService.hasRole("SystemAdmin");
        const canEditBusiness = this.canEditExcuse(item);
        return hasPermission && canEditBusiness;
      }, "condition")
    },
    {
      key: "approve",
      label: this.i18n.t("employee_excuses.approve"),
      icon: "fa-check",
      color: "success",
      condition: /* @__PURE__ */ __name((item) => {
        const canApproveStatus = item.status === ExcuseStatus.Pending;
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.APPROVE}`) || this.permissionService.hasRole("SystemAdmin");
        const canReviewBusiness = this.canReviewExcuse(item);
        return canApproveStatus && hasPermission && canReviewBusiness;
      }, "condition")
    },
    {
      key: "reject",
      label: this.i18n.t("employee_excuses.reject"),
      icon: "fa-times",
      color: "danger",
      condition: /* @__PURE__ */ __name((item) => {
        const canRejectStatus = item.status === ExcuseStatus.Pending;
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.APPROVE}`) || this.permissionService.hasRole("SystemAdmin");
        const canReviewBusiness = this.canReviewExcuse(item);
        return canRejectStatus && hasPermission && canReviewBusiness;
      }, "condition")
    },
    {
      key: "cancel",
      label: this.i18n.t("employee_excuses.cancel"),
      icon: "fa-ban",
      color: "warning",
      condition: /* @__PURE__ */ __name((item) => {
        const canCancelStatus = item.status === ExcuseStatus.Pending;
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.DELETE}`) || this.permissionService.hasRole("SystemAdmin");
        const canCancelBusiness = this.canCancelExcuse(item);
        return canCancelStatus && hasPermission && canCancelBusiness;
      }, "condition")
    },
    {
      key: "reopen",
      label: this.i18n.t("employee_excuses.reopen"),
      icon: "fa-undo",
      color: "warning",
      condition: /* @__PURE__ */ __name((item) => {
        const canReopenStatus = item.status === ExcuseStatus.Approved || item.status === ExcuseStatus.Rejected;
        const isSystemAdmin = this.permissionService.hasRole("SystemAdmin");
        return canReopenStatus && isSystemAdmin;
      }, "condition")
    },
    {
      key: "delete",
      label: this.i18n.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name((item) => {
        const isSystemAdmin = this.permissionService.hasRole("SystemAdmin");
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.DELETE}`);
        if (isSystemAdmin) {
          return true;
        }
        return item.status === ExcuseStatus.Pending && hasPermission && this.canCancelExcuse(item);
      }, "condition")
    },
    {
      key: "download",
      label: this.i18n.t("employee_excuses.download_attachment"),
      icon: "fa-download",
      color: "info",
      condition: /* @__PURE__ */ __name((item) => {
        const hasAttachment = !!item.attachmentUrl;
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.READ}`) || this.permissionService.hasRole("SystemAdmin");
        return hasAttachment && hasPermission;
      }, "condition")
    }
  ];
  // Computed values
  currentFilter = computed(() => ({
    employeeId: this.selectedEmployeeId(),
    departmentId: this.selectedDepartmentId(),
    branchId: this.selectedBranchId(),
    status: this.selectedStatus(),
    fromDate: this.fromDate(),
    toDate: this.toDate(),
    searchTerm: this.searchTerm()
  }), ...ngDevMode ? [{ debugName: "currentFilter" }] : []);
  // Effects
  constructor() {
    effect(() => {
      const filter = this.currentFilter();
      const page = this.currentPage();
      const pageSize = this.pageSize();
      this.loadEmployeeExcuses(__spreadValues({
        page,
        pageSize
      }, filter));
    });
    effect(() => {
      this.loading.set(this.employeeExcusesService.loading());
    });
  }
  ngOnInit() {
    this.loadEmployeeExcuses();
  }
  /**
   * Load employee excuses with current filters
   */
  loadEmployeeExcuses(params = {}) {
    const queryParams = __spreadValues(__spreadValues({
      page: this.currentPage(),
      pageSize: this.pageSize()
    }, this.currentFilter()), params);
    this.employeeExcusesService.getEmployeeExcuses(queryParams).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.calculateAggregateStatistics();
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.notificationService.error(this.i18n.t("employee_excuses.load_error"));
      }, "error")
    });
  }
  /**
   * Load statistics - Skip for management view as it requires specific employee
   */
  loadStatistics() {
    this.calculateAggregateStatistics();
  }
  /**
   * Calculate aggregate statistics from loaded data
   */
  calculateAggregateStatistics() {
    const allExcuses = this.employeeExcusesService.employeeExcuses() || [];
    const stats = {
      totalRequests: allExcuses.length,
      pendingRequests: allExcuses.filter((excuse) => excuse.status === "Pending").length,
      approvedRequests: allExcuses.filter((excuse) => excuse.status === "Approved").length,
      rejectedRequests: allExcuses.filter((excuse) => excuse.status === "Rejected").length,
      currentMonthHours: 0,
      // Not available from current data
      remainingMonthlyHours: 0,
      // Not available from current data
      monthlyLimit: 0
      // Not available from current data
    };
    this.employeeExcusesService.statistics.set(stats);
  }
  /**
   * Navigate to create excuse request page
   */
  navigateToCreate() {
    this.router.navigate(["/employee-excuses/create"]);
  }
  /**
   * View excuse details
   */
  viewExcuse(excuse) {
    this.router.navigate(["/employee-excuses", excuse.id, "view"]);
  }
  /**
   * Edit excuse request
   */
  editExcuse(excuse) {
    this.router.navigate(["/employee-excuses", excuse.id, "edit"]);
  }
  /**
   * Approve excuse request
   */
  approveExcuse(excuse) {
    const message = this.i18n.t("employee_excuses.confirm_approve");
    this.confirmationService.confirm({
      title: this.i18n.t("employee_excuses.approve_title"),
      message,
      confirmText: this.i18n.t("employee_excuses.approve")
    }).then((result) => {
      if (result.confirmed) {
        this.employeeExcusesService.reviewEmployeeExcuse(excuse.id, {
          status: ExcuseStatus.Approved,
          reviewerComments: result.comments
        }).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_excuses.approve_success"));
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notificationService.error(this.i18n.t("employee_excuses.approve_error"));
          }, "error")
        });
      }
    });
  }
  /**
   * Reject excuse request
   */
  rejectExcuse(excuse) {
    const message = this.i18n.t("employee_excuses.confirm_reject");
    this.confirmationService.confirm({
      title: this.i18n.t("employee_excuses.reject_title"),
      message,
      confirmText: this.i18n.t("employee_excuses.reject"),
      requireComments: true
    }).then((result) => {
      if (result.confirmed) {
        this.employeeExcusesService.reviewEmployeeExcuse(excuse.id, {
          status: ExcuseStatus.Rejected,
          reviewerComments: result.comments
        }).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_excuses.reject_success"));
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notificationService.error(this.i18n.t("employee_excuses.reject_error"));
          }, "error")
        });
      }
    });
  }
  /**
   * Cancel excuse request
   */
  cancelExcuse(excuse) {
    const message = this.i18n.t("employee_excuses.confirm_cancel");
    this.confirmationService.confirm({
      title: this.i18n.t("employee_excuses.cancel_title"),
      message,
      confirmText: this.i18n.t("employee_excuses.cancel")
    }).then((result) => {
      if (result.confirmed) {
        this.employeeExcusesService.cancelEmployeeExcuse(excuse.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_excuses.cancel_success"));
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notificationService.error(this.i18n.t("employee_excuses.cancel_error"));
          }, "error")
        });
      }
    });
  }
  /**
   * Download attachment
   */
  downloadAttachment(excuse) {
    this.employeeExcusesService.downloadAttachment(excuse.id).subscribe({
      next: /* @__PURE__ */ __name((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `excuse_${excuse.id}_attachment`;
        link.click();
        window.URL.revokeObjectURL(url);
      }, "next"),
      error: /* @__PURE__ */ __name(() => {
        this.notificationService.error(this.i18n.t("employee_excuses.download_error"));
      }, "error")
    });
  }
  /**
   * Reopen excuse for modification (SystemAdmin only)
   */
  reopenExcuse(excuse) {
    const message = this.i18n.t("employee_excuses.confirm_reopen");
    this.confirmationService.confirm({
      title: this.i18n.t("employee_excuses.reopen_title"),
      message,
      confirmText: this.i18n.t("employee_excuses.reopen")
    }).then((result) => {
      if (result.confirmed) {
        this.editExcuse(excuse);
        this.notificationService.info(this.i18n.t("employee_excuses.reopen_info"));
      }
    });
  }
  /**
   * Delete excuse (SystemAdmin can delete any, others only their own pending)
   */
  deleteExcuse(excuse) {
    const message = this.i18n.t("employee_excuses.confirm_delete");
    this.confirmationService.confirm({
      title: this.i18n.t("employee_excuses.delete_title"),
      message,
      confirmText: this.i18n.t("common.delete"),
      requireComments: false
    }).then((result) => {
      if (result.confirmed) {
        this.employeeExcusesService.cancelEmployeeExcuse(excuse.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_excuses.delete_success"));
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notificationService.error(this.i18n.t("employee_excuses.delete_error"));
          }, "error")
        });
      }
    });
  }
  /**
   * Handle filter changes
   */
  onFilterChange(filter) {
    this.selectedEmployeeId.set(filter.employeeId);
    this.selectedDepartmentId.set(filter.departmentId);
    this.selectedBranchId.set(filter.branchId);
    this.selectedStatus.set(filter.status);
    this.fromDate.set(filter.fromDate);
    this.toDate.set(filter.toDate);
    this.searchTerm.set(filter.searchTerm);
    this.currentPage.set(1);
  }
  /**
   * Clear all filters
   */
  clearFilters() {
    this.selectedEmployeeId.set(void 0);
    this.selectedDepartmentId.set(void 0);
    this.selectedBranchId.set(void 0);
    this.selectedStatus.set(void 0);
    this.fromDate.set(void 0);
    this.toDate.set(void 0);
    this.searchTerm.set(void 0);
    this.currentPage.set(1);
  }
  /**
   * Handle page change
   */
  onPageChange(page) {
    this.currentPage.set(page);
  }
  /**
   * Handle page size change
   */
  onPageSizeChange(pageSize) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
  }
  /**
   * Handle table action clicks
   */
  onTableAction(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.viewExcuse(item);
        break;
      case "edit":
        this.editExcuse(item);
        break;
      case "approve":
        this.approveExcuse(item);
        break;
      case "reject":
        this.rejectExcuse(item);
        break;
      case "cancel":
        this.cancelExcuse(item);
        break;
      case "reopen":
        this.reopenExcuse(item);
        break;
      case "delete":
        this.deleteExcuse(item);
        break;
      case "download":
        this.downloadAttachment(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  /**
   * Check if user can create excuse requests
   */
  canCreate() {
    return this.permissionService.has(`excuse.${PermissionActions.CREATE}`);
  }
  /**
   * Check if user can edit excuse
   */
  canEditExcuse(excuse) {
    const currentUser = this.permissionService.getCurrentUser();
    return this.permissionService.hasRole("Admin") || this.permissionService.hasRole("SystemAdmin") || currentUser?.employeeId === excuse.employeeId;
  }
  /**
   * Check if user can review excuse
   */
  canReviewExcuse(excuse) {
    const currentUser = this.permissionService.getCurrentUser();
    return (this.permissionService.hasRole("Admin") || this.permissionService.hasRole("SystemAdmin") || this.permissionService.hasRole("Manager")) && currentUser?.employeeId !== excuse.employeeId;
  }
  /**
   * Check if user can cancel excuse
   */
  canCancelExcuse(excuse) {
    const currentUser = this.permissionService.getCurrentUser();
    return this.permissionService.hasRole("Admin") || this.permissionService.hasRole("SystemAdmin") || currentUser?.employeeId === excuse.employeeId;
  }
  /**
   * Format duration for display
   */
  formatDuration(hours) {
    if (hours < 1) {
      return `${Math.round(hours * 60)} ${this.i18n.t("common.minutes")}`;
    }
    return `${hours} ${this.i18n.t("common.hours")}`;
  }
  /**
   * Format status for display
   */
  formatStatus(status) {
    if (!status) {
      return this.i18n.t("employee_excuses.status_pending");
    }
    return this.i18n.t(`employee_excuses.status_${status.toLowerCase()}`);
  }
  /**
   * Get status CSS class
   */
  getStatusClass(status) {
    switch (status) {
      case ExcuseStatus.Pending:
        return "badge bg-warning";
      case ExcuseStatus.Approved:
        return "badge bg-success";
      case ExcuseStatus.Rejected:
        return "badge bg-danger";
      case ExcuseStatus.Cancelled:
        return "badge bg-secondary";
      default:
        return "badge bg-light";
    }
  }
  // New standardized filter methods
  onSearchChange(searchTerm) {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
  }
  onFiltersChange(filters) {
    this.selectedEmployeeId.set(filters.employeeId ? +filters.employeeId : void 0);
    this.selectedDepartmentId.set(filters.departmentId ? +filters.departmentId : void 0);
    this.selectedBranchId.set(filters.branchId ? +filters.branchId : void 0);
    this.selectedStatus.set(filters.status || void 0);
    this.currentPage.set(1);
  }
  onAddExcuse() {
    this.router.navigate(["/employee-excuses/create"]);
  }
  onRefreshData() {
    this.clearFilters();
    this.loadEmployeeExcuses();
  }
};
__name(_EmployeeExcusesComponent, "EmployeeExcusesComponent");
__publicField(_EmployeeExcusesComponent, "\u0275fac", /* @__PURE__ */ __name(function EmployeeExcusesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmployeeExcusesComponent)();
}, "EmployeeExcusesComponent_Factory"));
__publicField(_EmployeeExcusesComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeeExcusesComponent, selectors: [["app-employee-excuses"]], decls: 13, vars: 15, consts: [["durationTemplate", ""], ["reasonTemplate", ""], ["statusTemplate", ""], ["dateTemplate", ""], [1, "employee-excuses-page"], [3, "title"], ["moduleName", "employee-excuses", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [3, "pageChange", "pageSizeChange", "actionClick", "data", "columns", "actions", "loading", "totalItems", "currentPage", "pageSize", "pageSizeOptions", "emptyMessage", "emptyTitle"], ["role", "alert", 1, "alert", "alert-danger", "mt-3"], [1, "text-truncate", "d-inline-block", 2, "max-width", "200px", 3, "title"], ["data-bs-toggle", "tooltip", 1, "fas", "fa-exclamation-triangle", "text-warning", "ms-1", 3, "title"], [1, "fas", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function EmployeeExcusesComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "app-page-header", 5);
    \u0275\u0275elementStart(2, "app-unified-filter", 6);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function EmployeeExcusesComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSearchChange($event));
    }, "EmployeeExcusesComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function EmployeeExcusesComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onFiltersChange($event));
    }, "EmployeeExcusesComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function EmployeeExcusesComponent_Template_app_unified_filter_add_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onAddExcuse());
    }, "EmployeeExcusesComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function EmployeeExcusesComponent_Template_app_unified_filter_refresh_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onRefreshData());
    }, "EmployeeExcusesComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-data-table", 7);
    \u0275\u0275listener("pageChange", /* @__PURE__ */ __name(function EmployeeExcusesComponent_Template_app_data_table_pageChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageChange($event));
    }, "EmployeeExcusesComponent_Template_app_data_table_pageChange_3_listener"))("pageSizeChange", /* @__PURE__ */ __name(function EmployeeExcusesComponent_Template_app_data_table_pageSizeChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageSizeChange($event));
    }, "EmployeeExcusesComponent_Template_app_data_table_pageSizeChange_3_listener"))("actionClick", /* @__PURE__ */ __name(function EmployeeExcusesComponent_Template_app_data_table_actionClick_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onTableAction($event));
    }, "EmployeeExcusesComponent_Template_app_data_table_actionClick_3_listener"));
    \u0275\u0275template(4, EmployeeExcusesComponent_ng_template_4_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(6, EmployeeExcusesComponent_ng_template_6_Template, 2, 2, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(8, EmployeeExcusesComponent_ng_template_8_Template, 3, 4, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(10, EmployeeExcusesComponent_ng_template_10_Template, 2, 4, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, EmployeeExcusesComponent_Conditional_12_Template, 3, 1, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_10_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("employee_excuses.management_title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx.employeeExcuses() || \u0275\u0275pureFunction0(13, _c0))("columns", ctx.tableColumns)("actions", ctx.tableActions)("loading", ctx.loading)("totalItems", ((tmp_10_0 = ctx.pagedResult()) == null ? null : tmp_10_0.totalCount) || 0)("currentPage", ctx.currentPage())("pageSize", ctx.pageSize())("pageSizeOptions", \u0275\u0275pureFunction0(14, _c1))("emptyMessage", ctx.i18n.t("employee_excuses.no_requests_message"))("emptyTitle", ctx.i18n.t("employee_excuses.no_requests_found"));
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx.error() ? 12 : -1);
  }
}, "EmployeeExcusesComponent_Template"), dependencies: [
  CommonModule,
  DataTableComponent,
  PageHeaderComponent,
  UnifiedFilterComponent,
  DatePipe
], styles: ["\n\n.employee-excuses-page[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transition: box-shadow 0.15s ease-in-out;\n}\n.card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.fa-2x[_ngcontent-%COMP%] {\n  font-size: 2em;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.375rem 0.75rem;\n}\n.bg-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107 !important;\n  color: #000 !important;\n}\n.bg-success[_ngcontent-%COMP%] {\n  background-color: #198754 !important;\n}\n.bg-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n}\n.bg-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n}\n.bg-light[_ngcontent-%COMP%] {\n  background-color: #f8f9fa !important;\n  color: #212529 !important;\n}\n.text-truncate[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  font-weight: 500;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  opacity: 0.9;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-right: 0.25rem;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-right: 0;\n}\n@media (max-width: 768px) {\n  .employee-excuses-page[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.alert[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.fa-exclamation-triangle.text-warning[_ngcontent-%COMP%] {\n  cursor: help;\n}\n.row[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  height: 100%;\n  cursor: default;\n}\n.row[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: var(--bs-primary) !important;\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #ffc107 !important;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #198754 !important;\n}\n.text-info[_ngcontent-%COMP%] {\n  color: #0dcaf0 !important;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-top: none;\n  font-weight: 600;\n  color: #495057;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.card.mb-4[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border: 1px solid #dee2e6;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-right: 0;\n}\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.duration-display[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n}\n.attachment-indicator[_ngcontent-%COMP%] {\n  color: #0dcaf0;\n  margin-left: 0.25rem;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #6c757d;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n.filter-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.filter-tag[_ngcontent-%COMP%] {\n  background-color: #e9ecef;\n  color: #495057;\n  padding: 0.25rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.filter-tag[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.7;\n}\n.filter-tag[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n/*# sourceMappingURL=employee-excuses.component.css.map */"] }));
var EmployeeExcusesComponent = _EmployeeExcusesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeExcusesComponent, [{
    type: Component,
    args: [{ selector: "app-employee-excuses", standalone: true, imports: [
      CommonModule,
      DataTableComponent,
      PageHeaderComponent,
      UnifiedFilterComponent
    ], template: `<div class="employee-excuses-page">\r
  <!-- Page Header -->\r
  <app-page-header [title]="i18n.t('employee_excuses.management_title')">\r
  </app-page-header>\r
\r
  <!-- Filters Component -->\r
  <app-unified-filter moduleName="employee-excuses" [refreshing]="loading()" (searchChange)="onSearchChange($event)"\r
    (filtersChange)="onFiltersChange($event)" (add)="onAddExcuse()" (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- Data Table -->\r
  <app-data-table [data]="employeeExcuses() || []" [columns]="tableColumns" [actions]="tableActions" [loading]="loading"\r
    [totalItems]="pagedResult()?.totalCount || 0" [currentPage]="currentPage()" [pageSize]="pageSize()"\r
    [pageSizeOptions]="[10, 25, 50, 100]" [emptyMessage]="i18n.t('employee_excuses.no_requests_message')"\r
    [emptyTitle]="i18n.t('employee_excuses.no_requests_found')" (pageChange)="onPageChange($event)"\r
    (pageSizeChange)="onPageSizeChange($event)" (actionClick)="onTableAction($event)">\r
    <!-- Custom templates for specific columns -->\r
    <ng-template #durationTemplate let-item>\r
      {{ formatDuration(item.durationHours) }}\r
    </ng-template>\r
\r
    <ng-template #reasonTemplate let-item>\r
      <span [title]="item.reason" class="text-truncate d-inline-block" style="max-width: 200px;">\r
        {{ item.reason }}\r
      </span>\r
    </ng-template>\r
\r
    <ng-template #statusTemplate let-item>\r
      <span [class]="getStatusClass(item.status)">\r
        {{ formatStatus(item.status) }}\r
      </span>\r
      @if (!item.isWithinPolicy && item.policyViolationReason) {\r
      <i class="fas fa-exclamation-triangle text-warning ms-1" [title]="item.policyViolationReason"\r
        data-bs-toggle="tooltip">\r
      </i>\r
      }\r
    </ng-template>\r
\r
    <ng-template #dateTemplate let-item let-column="column">\r
      {{ (column === 'excuseDate' ? item.excuseDate : item.submissionDate) | date:'short' }}\r
    </ng-template>\r
  </app-data-table>\r
\r
  <!-- Error Display -->\r
  @if (error()) {\r
  <div class="alert alert-danger mt-3" role="alert">\r
    <i class="fas fa-exclamation-triangle me-2"></i>\r
    {{ error() }}\r
  </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/employee-excuses/employee-excuses.component.css */\n.employee-excuses-page {\n  padding: 1rem;\n}\n.card {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transition: box-shadow 0.15s ease-in-out;\n}\n.card:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.card-body {\n  padding: 1.5rem;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.badge {\n  font-size: 0.875rem;\n  padding: 0.375rem 0.75rem;\n}\n.bg-warning {\n  background-color: #ffc107 !important;\n  color: #000 !important;\n}\n.bg-success {\n  background-color: #198754 !important;\n}\n.bg-danger {\n  background-color: #dc3545 !important;\n}\n.bg-secondary {\n  background-color: #6c757d !important;\n}\n.bg-light {\n  background-color: #f8f9fa !important;\n  color: #212529 !important;\n}\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.btn {\n  border-radius: 0.375rem;\n  font-weight: 500;\n}\n.btn-primary {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  opacity: 0.9;\n}\n.table td .btn {\n  margin-right: 0.25rem;\n}\n.table td .btn:last-child {\n  margin-right: 0;\n}\n@media (max-width: 768px) {\n  .employee-excuses-page {\n    padding: 0.5rem;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between .btn {\n    width: 100%;\n  }\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.alert {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-danger {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.fa-exclamation-triangle.text-warning {\n  cursor: help;\n}\n.row .card {\n  height: 100%;\n  cursor: default;\n}\n.row .card .card-body {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n.text-primary {\n  color: var(--bs-primary) !important;\n}\n.text-warning {\n  color: #ffc107 !important;\n}\n.text-success {\n  color: #198754 !important;\n}\n.text-info {\n  color: #0dcaf0 !important;\n}\n.table th {\n  background-color: #f8f9fa;\n  border-top: none;\n  font-weight: 600;\n  color: #495057;\n}\n.table td {\n  vertical-align: middle;\n}\n.card.mb-4 {\n  background-color: #f8f9fa;\n  border: 1px solid #dee2e6;\n}\n.btn-group .btn {\n  margin-right: 0;\n}\n.badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.duration-display {\n  font-weight: 500;\n  color: #495057;\n}\n.attachment-indicator {\n  color: #0dcaf0;\n  margin-left: 0.25rem;\n}\n.empty-state {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #6c757d;\n}\n.empty-state i {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n.filter-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.filter-tag {\n  background-color: #e9ecef;\n  color: #495057;\n  padding: 0.25rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.filter-tag .btn-close {\n  font-size: 0.75rem;\n  opacity: 0.7;\n}\n.filter-tag .btn-close:hover {\n  opacity: 1;\n}\n/*# sourceMappingURL=employee-excuses.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeeExcusesComponent, { className: "EmployeeExcusesComponent", filePath: "src/app/pages/employee-excuses/employee-excuses.component.ts", lineNumber: 31 });
})();
export {
  EmployeeExcusesComponent
};
//# sourceMappingURL=chunk-FNMJICGP.js.map
