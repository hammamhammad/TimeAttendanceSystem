import {
  ExcusePoliciesService
} from "./chunk-XDAIG4PW.js";
import {
  DataTableComponent
} from "./chunk-7JZQN7NK.js";
import {
  UnifiedFilterComponent
} from "./chunk-THHKOIOG.js";
import "./chunk-5ZV3Z4IV.js";
import "./chunk-DS3UNCKJ.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-7XYWDBYG.js";
import {
  ConfirmationService
} from "./chunk-NUNE7G5P.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import "./chunk-GSKH2KOG.js";
import {
  PageHeaderComponent
} from "./chunk-DKGFJHVQ.js";
import {
  FormsModule
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import "./chunk-HZ2IZU2F.js";
import {
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction0
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/excuse-policies/excuse-policies.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
var _ExcusePoliciesComponent = class _ExcusePoliciesComponent {
  excusePoliciesService = inject(ExcusePoliciesService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    POLICY_CREATE: "settings.excusePolicy.create",
    POLICY_READ: "settings.excusePolicy.read",
    POLICY_UPDATE: "settings.excusePolicy.update",
    POLICY_DELETE: "settings.excusePolicy.delete"
  };
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  policies = signal([], ...ngDevMode ? [{ debugName: "policies" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Filter signals
  selectedBranchId = signal(void 0, ...ngDevMode ? [{ debugName: "selectedBranchId" }] : []);
  selectedActiveStatus = signal(void 0, ...ngDevMode ? [{ debugName: "selectedActiveStatus" }] : []);
  // Data table configuration
  tableColumns = computed(() => [
    {
      key: "scope",
      label: this.t("excuse_policies.branch"),
      sortable: false,
      width: "180px",
      priority: "high",
      mobileLabel: this.t("excuse_policies.branch"),
      renderHtml: true
    },
    {
      key: "maxPersonalExcusesPerMonth",
      label: this.t("excuse_policies.max_excuses_month"),
      sortable: true,
      width: "140px",
      align: "center",
      priority: "medium",
      mobileLabel: this.t("excuse_policies.max_excuses_month")
    },
    {
      key: "maxPersonalExcuseHoursPerMonth",
      label: this.t("excuse_policies.max_hours_month"),
      sortable: true,
      width: "140px",
      align: "center",
      priority: "medium",
      mobileLabel: this.t("excuse_policies.max_hours_month")
    },
    {
      key: "maxPersonalExcuseHoursPerDay",
      label: this.t("excuse_policies.max_hours_day"),
      sortable: true,
      width: "120px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("excuse_policies.max_hours_day")
    },
    {
      key: "requiresApproval",
      label: this.t("excuse_policies.requires_approval"),
      sortable: false,
      width: "130px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("excuse_policies.requires_approval"),
      renderHtml: true
    },
    {
      key: "status",
      label: this.t("common.status"),
      sortable: false,
      width: "100px",
      align: "center",
      priority: "high",
      mobileLabel: this.t("common.status"),
      renderHtml: true
    },
    {
      key: "createdAt",
      label: this.t("common.created"),
      sortable: true,
      width: "150px",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("common.created")
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "view",
      label: this.t("common.view"),
      icon: "fa-eye",
      color: "primary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.POLICY_READ), "condition")
    },
    {
      key: "edit",
      label: this.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.POLICY_UPDATE), "condition")
    },
    {
      key: "delete",
      label: this.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.POLICY_DELETE), "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform policies data for data table
  tableData = computed(() => {
    return this.policies().map((policy) => __spreadProps(__spreadValues({}, policy), {
      scope: this.formatScope(policy),
      requiresApproval: this.formatBoolean(policy.requiresApproval),
      status: this.formatStatus(policy),
      createdAt: this.formatDate(policy.createdAtUtc)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  ngOnInit() {
    this.loadPolicies();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadPolicies() {
    this.loading.set(true);
    this.excusePoliciesService.getExcusePolicies(this.currentPage(), this.pageSize(), this.selectedBranchId(), this.selectedActiveStatus()).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        if (response && response.items) {
          this.policies.set(response.items);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
        } else {
          console.warn("No data received from API:", response);
          this.policies.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load excuse policies:", error);
        this.loading.set(false);
        this.notificationService.error(this.t("app.error"), this.t("excuse_policies.load_error"));
      }, "error")
    });
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  /**
   * Format scope badge for display in table
   * Uses HTML injection pattern (documented exception for DataTable columns in CLAUDE.md)
   */
  formatScope(policy) {
    const scopeText = policy.branchId === null ? this.t("excuse_policies.organization_wide") : policy.branchName || `Branch ${policy.branchId}`;
    const badgeClass = this.getScopeBadgeClass(policy);
    return `<span class="${badgeClass}">${scopeText}</span>`;
  }
  /**
   * Get CSS class for scope badge
   */
  getScopeBadgeClass(policy) {
    return policy.branchId === null ? "badge bg-success" : "badge bg-info";
  }
  /**
   * Format boolean value as badge for table
   * Uses HTML injection pattern (documented exception for DataTable columns in CLAUDE.md)
   */
  formatBoolean(value) {
    const text = value ? this.t("common.yes") : this.t("common.no");
    const badgeClass = this.getBooleanBadgeClass(value);
    return `<span class="${badgeClass}">${text}</span>`;
  }
  /**
   * Get CSS class for boolean badge
   */
  getBooleanBadgeClass(value) {
    return value ? "badge bg-success" : "badge bg-secondary";
  }
  /**
   * Format status badge for table
   * Uses HTML injection pattern (documented exception for DataTable columns in CLAUDE.md)
   */
  formatStatus(policy) {
    const statusText = policy.isActive ? this.t("common.active") : this.t("common.inactive");
    const badgeClass = this.getStatusBadgeClass(policy);
    return `<span class="${badgeClass}">${statusText}</span>`;
  }
  /**
   * Get CSS class for status badge
   */
  getStatusBadgeClass(policy) {
    return policy.isActive ? "badge bg-success" : "badge bg-light text-dark border";
  }
  // Data table action handler
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onViewPolicy(item);
        break;
      case "edit":
        this.onEditPolicy(item);
        break;
      case "delete":
        this.onDeletePolicy(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  // Pagination handlers
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadPolicies();
  }
  onPageSizeChange(pageSize) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadPolicies();
  }
  // Filter handlers
  onFiltersChange(filters) {
    if (filters.branchId !== void 0) {
      this.selectedBranchId.set(filters.branchId ? parseInt(filters.branchId) : void 0);
    }
    if (filters.isActive !== void 0) {
      this.selectedActiveStatus.set(filters.isActive === "true" ? true : filters.isActive === "false" ? false : void 0);
    }
    this.currentPage.set(1);
    this.loadPolicies();
  }
  onRefreshData() {
    this.onClearFilters();
  }
  onClearFilters() {
    this.selectedBranchId.set(void 0);
    this.selectedActiveStatus.set(void 0);
    this.currentPage.set(1);
    this.loadPolicies();
  }
  hasActiveFilters() {
    return !!(this.selectedBranchId() !== void 0 || this.selectedActiveStatus() !== void 0);
  }
  // Policy CRUD operations
  onCreatePolicy() {
    this.router.navigate(["/settings/excuse-policies/create"]);
  }
  onViewPolicy(policy) {
    this.router.navigate(["/settings/excuse-policies", policy.id, "view"]);
  }
  onEditPolicy(policy) {
    this.router.navigate(["/settings/excuse-policies", policy.id, "edit"]);
  }
  onDeletePolicy(policy) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.t("excuse_policies.delete_title"),
        message: this.t("excuse_policies.confirm_delete"),
        confirmText: this.t("common.delete"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.excusePoliciesService.deleteExcusePolicy(policy.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.loadPolicies();
            this.notificationService.success(this.t("app.success"), this.t("excuse_policies.delete_success"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete excuse policy:", error);
            this.notificationService.error(this.t("app.error"), this.t("excuse_policies.delete_error"));
          }, "error")
        });
      }
    });
  }
};
__name(_ExcusePoliciesComponent, "ExcusePoliciesComponent");
__publicField(_ExcusePoliciesComponent, "\u0275fac", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ExcusePoliciesComponent)();
}, "ExcusePoliciesComponent_Factory"));
__publicField(_ExcusePoliciesComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExcusePoliciesComponent, selectors: [["app-excuse-policies"]], decls: 4, vars: 13, consts: [[1, "container-fluid"], [3, "title"], ["moduleName", "excuse_policies", 3, "filtersChange", "add", "refresh", "refreshing"], [3, "actionClick", "pageChange", "pageSizeChange", "columns", "data", "actions", "currentPage", "pageSize", "totalItems", "totalPages", "loading", "emptyTitle", "emptyMessage"]], template: /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("filtersChange", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "ExcusePoliciesComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.onCreatePolicy();
    }, "ExcusePoliciesComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "ExcusePoliciesComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-data-table", 3);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_data_table_actionClick_3_listener($event) {
      return ctx.onActionClick($event);
    }, "ExcusePoliciesComponent_Template_app_data_table_actionClick_3_listener"))("pageChange", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_data_table_pageChange_3_listener($event) {
      return ctx.onPageChange($event);
    }, "ExcusePoliciesComponent_Template_app_data_table_pageChange_3_listener"))("pageSizeChange", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_data_table_pageSizeChange_3_listener($event) {
      return ctx.onPageSizeChange($event);
    }, "ExcusePoliciesComponent_Template_app_data_table_pageSizeChange_3_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("excuse_policies.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("columns", ctx.tableColumns())("data", ctx.tableData() || \u0275\u0275pureFunction0(12, _c0))("actions", ctx.tableActions())("currentPage", ctx.currentPage())("pageSize", ctx.pageSize())("totalItems", ctx.totalCount())("totalPages", ctx.totalPages())("loading", ctx.loading)("emptyTitle", ctx.t("excuse_policies.no_policies_found"))("emptyMessage", ctx.hasActiveFilters() ? ctx.t("common.try_different_filters") : ctx.t("excuse_policies.subtitle"));
  }
}, "ExcusePoliciesComponent_Template"), dependencies: [
  FormsModule,
  DataTableComponent,
  UnifiedFilterComponent,
  PageHeaderComponent
], styles: ["\n\n.container-fluid[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=excuse-policies.component.css.map */"] }));
var ExcusePoliciesComponent = _ExcusePoliciesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcusePoliciesComponent, [{
    type: Component,
    args: [{ selector: "app-excuse-policies", standalone: true, imports: [
      FormsModule,
      DataTableComponent,
      UnifiedFilterComponent,
      PageHeaderComponent
    ], template: `<div class="container-fluid">
  <!-- Page Header -->
  <app-page-header
    [title]="t('excuse_policies.title')">
  </app-page-header>

  <!-- Unified Filter Component -->
  <app-unified-filter
    moduleName="excuse_policies"
    [refreshing]="loading()"
    (filtersChange)="onFiltersChange($event)"
    (add)="onCreatePolicy()"
    (refresh)="onRefreshData()">
  </app-unified-filter>

  <!-- Data Table -->
  <app-data-table
    [columns]="tableColumns()"
    [data]="tableData() || []"
    [actions]="tableActions()"
    [currentPage]="currentPage()"
    [pageSize]="pageSize()"
    [totalItems]="totalCount()"
    [totalPages]="totalPages()"
    [loading]="loading"
    [emptyTitle]="t('excuse_policies.no_policies_found')"
    [emptyMessage]="hasActiveFilters() ? t('common.try_different_filters') : t('excuse_policies.subtitle')"
    (actionClick)="onActionClick($event)"
    (pageChange)="onPageChange($event)"
    (pageSizeChange)="onPageSizeChange($event)">
  </app-data-table>
</div>
`, styles: ["/* src/app/pages/settings/excuse-policies/excuse-policies.component.css */\n.container-fluid {\n  padding: 1.5rem;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=excuse-policies.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExcusePoliciesComponent, { className: "ExcusePoliciesComponent", filePath: "src/app/pages/settings/excuse-policies/excuse-policies.component.ts", lineNumber: 27 });
})();
export {
  ExcusePoliciesComponent
};
//# sourceMappingURL=chunk-SC6HF6HN.js.map
