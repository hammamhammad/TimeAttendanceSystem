import {
  ExcusePoliciesService
} from "./chunk-X6RX6YJF.js";
import {
  DataTableComponent
} from "./chunk-7K5DBNQM.js";
import {
  UnifiedFilterComponent
} from "./chunk-HAMFYSM6.js";
import "./chunk-3AZFD5ID.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-T6ZZRW4R.js";
import {
  ConfirmationService
} from "./chunk-OJL2NUV4.js";
import {
  PermissionActions,
  PermissionResources,
  PermissionService
} from "./chunk-DKGIYIS4.js";
import {
  PageHeaderComponent
} from "./chunk-G7MX4ADH.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  Router,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/excuse-policies/excuse-policies.component.ts
var _c0 = /* @__PURE__ */ __name(() => [10, 25, 50, 100], "_c0");
function ExcusePoliciesComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "i", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(ExcusePoliciesComponent_Conditional_6_Template, "ExcusePoliciesComponent_Conditional_6_Template");
var _ExcusePoliciesComponent = class _ExcusePoliciesComponent {
  excusePoliciesService = inject(ExcusePoliciesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Modal reference handled via template reference variable
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  selectedBranchId = signal(void 0, ...ngDevMode ? [{ debugName: "selectedBranchId" }] : []);
  selectedStatus = signal(void 0, ...ngDevMode ? [{ debugName: "selectedStatus" }] : []);
  // Available options for filters
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  // Permission constants
  PERMISSIONS = {
    EXCUSE_POLICY_READ: `${PermissionResources.EXCUSE}.${PermissionActions.READ}`,
    EXCUSE_POLICY_CREATE: `${PermissionResources.EXCUSE}.${PermissionActions.CREATE}`,
    EXCUSE_POLICY_UPDATE: `${PermissionResources.EXCUSE}.${PermissionActions.UPDATE}`,
    EXCUSE_POLICY_DELETE: `${PermissionResources.EXCUSE}.${PermissionActions.DELETE}`
  };
  // Service signals
  excusePolicies = this.excusePoliciesService.excusePolicies;
  pagedResult = this.excusePoliciesService.pagedResult;
  error = this.excusePoliciesService.error;
  // Table configuration
  tableColumns = [
    { key: "branchName", label: this.i18n.t("excuse_policies.branch"), sortable: true, width: "20%" },
    { key: "maxPersonalExcusesPerMonth", label: this.i18n.t("excuse_policies.max_excuses_month"), sortable: true, width: "15%" },
    { key: "maxPersonalExcuseHoursPerMonth", label: this.i18n.t("excuse_policies.max_hours_month"), sortable: true, width: "15%" },
    { key: "maxPersonalExcuseHoursPerDay", label: this.i18n.t("excuse_policies.max_hours_day"), sortable: true, width: "15%" },
    { key: "requiresApproval", label: this.i18n.t("excuse_policies.requires_approval"), sortable: true, width: "12%" },
    { key: "isActive", label: this.i18n.t("common.status"), sortable: true, width: "10%" },
    { key: "actions", label: this.i18n.t("common.actions"), sortable: false, width: "13%" }
  ];
  // Table actions
  tableActions = [
    {
      key: "view",
      label: this.i18n.t("common.view"),
      icon: "fa-eye",
      color: "primary",
      condition: /* @__PURE__ */ __name((item) => this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_READ), "condition")
    },
    {
      key: "edit",
      label: this.i18n.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name((item) => this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_UPDATE), "condition")
    },
    {
      key: "toggle",
      label: this.i18n.t("common.toggle_status"),
      icon: "fa-toggle-on",
      color: "warning",
      condition: /* @__PURE__ */ __name((item) => this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_UPDATE), "condition")
    },
    {
      key: "delete",
      label: this.i18n.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name((item) => this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_DELETE), "condition")
    }
  ];
  // Computed values
  currentFilter = computed(() => ({
    branchId: this.selectedBranchId(),
    isActive: this.selectedStatus()
  }), ...ngDevMode ? [{ debugName: "currentFilter" }] : []);
  // Effects
  constructor() {
    effect(() => {
      const filter = this.currentFilter();
      const page = this.currentPage();
      const pageSize = this.pageSize();
      this.loadExcusePolicies(__spreadValues({
        page,
        pageSize
      }, filter));
    });
    effect(() => {
      this.loading.set(this.excusePoliciesService.loading());
    });
  }
  ngOnInit() {
    this.loadBranches();
  }
  /**
   * Load excuse policies with current filters
   */
  loadExcusePolicies(params = {}) {
    const queryParams = __spreadValues(__spreadValues({
      page: this.currentPage(),
      pageSize: this.pageSize()
    }, this.currentFilter()), params);
    this.excusePoliciesService.getExcusePolicies(queryParams).subscribe({
      error: /* @__PURE__ */ __name((error) => {
        this.notificationService.error(this.i18n.t("excuse_policies.load_error"));
      }, "error")
    });
  }
  /**
   * Load available branches for filter
   */
  loadBranches() {
    this.availableBranches.set([
      { id: 1, name: "Main Branch" },
      { id: 2, name: "Secondary Branch" }
    ]);
  }
  /**
   * Navigate to create excuse policy page
   */
  navigateToCreate() {
    this.router.navigate(["/settings/excuse-policies/create"]);
  }
  /**
   * Navigate to view excuse policy page
   */
  viewExcusePolicy(excusePolicy) {
    this.router.navigate(["/settings/excuse-policies", excusePolicy.id, "view"]);
  }
  /**
   * Navigate to edit excuse policy page
   */
  editExcusePolicy(excusePolicy) {
    this.router.navigate(["/settings/excuse-policies", excusePolicy.id, "edit"]);
  }
  /**
   * Toggle excuse policy status
   */
  toggleStatus(excusePolicy) {
    const action = excusePolicy.isActive ? "deactivate" : "activate";
    const policyName = this.formatBranchName(excusePolicy.branchName);
    const message = this.i18n.t(`excuse_policies.confirm_${action}`).replace("{{name}}", policyName);
    this.confirmationService.confirm({
      title: this.i18n.t(`excuse_policies.${action}_title`),
      message,
      confirmText: this.i18n.t(`common.${action}`)
    }).then((result) => {
      if (result.confirmed) {
        this.excusePoliciesService.toggleExcusePolicyStatus(excusePolicy.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t(`excuse_policies.${action}_success`));
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notificationService.error(this.i18n.t(`excuse_policies.${action}_error`));
          }, "error")
        });
      }
    });
  }
  /**
   * Delete excuse policy
   */
  deleteExcusePolicy(excusePolicy) {
    const policyName = this.formatBranchName(excusePolicy.branchName);
    const message = this.i18n.t("excuse_policies.confirm_delete").replace("{{name}}", policyName);
    this.confirmationService.confirm({
      title: this.i18n.t("excuse_policies.delete_title"),
      message,
      confirmText: this.i18n.t("common.delete")
    }).then((result) => {
      if (result.confirmed) {
        this.excusePoliciesService.deleteExcusePolicy(excusePolicy.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("excuse_policies.delete_success"));
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notificationService.error(this.i18n.t("excuse_policies.delete_error"));
          }, "error")
        });
      }
    });
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
   * Handle search input changes
   */
  onSearchChange(searchTerm) {
    this.currentPage.set(1);
  }
  /**
   * Handle search input changes from unified filter
   */
  onSearchTermChange(searchTerm) {
    this.currentPage.set(1);
  }
  /**
   * Handle filters change from unified filter component
   */
  onFiltersChange(filters) {
    if (filters.branchId !== void 0) {
      const branchId = filters.branchId ? parseInt(filters.branchId) : void 0;
      this.selectedBranchId.set(branchId);
    }
    if (filters.isActive !== void 0) {
      const isActive = filters.isActive === "true" ? true : filters.isActive === "false" ? false : void 0;
      this.selectedStatus.set(isActive);
    }
    this.currentPage.set(1);
  }
  /**
   * Handle refresh data request
   */
  onRefreshData() {
    this.clearFilters();
    this.loadExcusePolicies();
  }
  /**
   * Handle branch filter change
   */
  onBranchFilterChange(branchId) {
    this.selectedBranchId.set(branchId);
    this.currentPage.set(1);
  }
  /**
   * Handle status filter change
   */
  onStatusFilterChange(isActive) {
    this.selectedStatus.set(isActive);
    this.currentPage.set(1);
  }
  /**
   * Clear all filters
   */
  clearFilters() {
    this.selectedBranchId.set(void 0);
    this.selectedStatus.set(void 0);
    this.currentPage.set(1);
  }
  /**
   * Check if user can create excuse policies
   */
  canCreate() {
    return this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_CREATE);
  }
  /**
   * Format branch name for display
   */
  formatBranchName(branchName) {
    return branchName || this.i18n.t("excuse_policies.organization_wide");
  }
  /**
   * Format boolean values for display
   */
  formatBoolean(value) {
    return value ? this.i18n.t("common.yes") : this.i18n.t("common.no");
  }
  /**
   * Format status for display
   */
  formatStatus(isActive) {
    return isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive");
  }
  /**
   * Handle table action clicks
   */
  onTableAction(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.viewExcusePolicy(item);
        break;
      case "edit":
        this.editExcusePolicy(item);
        break;
      case "toggle":
        this.toggleStatus(item);
        break;
      case "delete":
        this.deleteExcusePolicy(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
};
__name(_ExcusePoliciesComponent, "ExcusePoliciesComponent");
__publicField(_ExcusePoliciesComponent, "\u0275fac", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ExcusePoliciesComponent)();
}, "ExcusePoliciesComponent_Factory"));
__publicField(_ExcusePoliciesComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExcusePoliciesComponent, selectors: [["app-excuse-policies"]], decls: 7, vars: 13, consts: [[1, "app-list-page"], [3, "title"], ["moduleName", "excuse-policies", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [1, "card"], [1, "card-body"], [3, "pageChange", "pageSizeChange", "actionClick", "data", "columns", "actions", "loading", "totalItems", "currentPage", "pageSize", "pageSizeOptions", "emptyMessage"], ["role", "alert", 1, "alert", "alert-danger", "mt-3"], [1, "fas", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchTermChange($event);
    }, "ExcusePoliciesComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "ExcusePoliciesComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.navigateToCreate();
    }, "ExcusePoliciesComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "ExcusePoliciesComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "app-data-table", 5);
    \u0275\u0275listener("pageChange", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_data_table_pageChange_5_listener($event) {
      return ctx.onPageChange($event);
    }, "ExcusePoliciesComponent_Template_app_data_table_pageChange_5_listener"))("pageSizeChange", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_data_table_pageSizeChange_5_listener($event) {
      return ctx.onPageSizeChange($event);
    }, "ExcusePoliciesComponent_Template_app_data_table_pageSizeChange_5_listener"))("actionClick", /* @__PURE__ */ __name(function ExcusePoliciesComponent_Template_app_data_table_actionClick_5_listener($event) {
      return ctx.onTableAction($event);
    }, "ExcusePoliciesComponent_Template_app_data_table_actionClick_5_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(6, ExcusePoliciesComponent_Conditional_6_Template, 3, 1, "div", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("excuse_policies.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance(3);
    \u0275\u0275property("data", ctx.excusePolicies())("columns", ctx.tableColumns)("actions", ctx.tableActions)("loading", ctx.loading())("totalItems", ((tmp_6_0 = ctx.pagedResult()) == null ? null : tmp_6_0.totalCount) ?? 0)("currentPage", ctx.currentPage())("pageSize", ctx.pageSize())("pageSizeOptions", \u0275\u0275pureFunction0(12, _c0))("emptyMessage", ctx.i18n.t("excuse_policies.no_policies_found"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 6 : -1);
  }
}, "ExcusePoliciesComponent_Template"), dependencies: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent], styles: ["\n\n.excuse-policies-page[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  font-weight: 500;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #0b5ed7;\n  border-color: #0a58ca;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n}\n.form-select[_ngcontent-%COMP%], \n.form-control[_ngcontent-%COMP%] {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n}\n.form-select[_ngcontent-%COMP%]:focus, \n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #86b7fe;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.input-group-text[_ngcontent-%COMP%] {\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  color: #6c757d;\n}\n.alert[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\nh2[_ngcontent-%COMP%] {\n  color: #212529;\n  font-weight: 600;\n}\n.table-responsive[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n}\n@media (max-width: 768px) {\n  .excuse-policies-page[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n    text-align: center;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=excuse-policies.component.css.map */"] }));
var ExcusePoliciesComponent = _ExcusePoliciesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcusePoliciesComponent, [{
    type: Component,
    args: [{ selector: "app-excuse-policies", standalone: true, imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="i18n.t('excuse_policies.title')">\r
  </app-page-header>\r
\r
  <!-- Unified Filter Component -->\r
  <app-unified-filter\r
    moduleName="excuse-policies"\r
    [refreshing]="loading()"\r
    (searchChange)="onSearchTermChange($event)"\r
    (filtersChange)="onFiltersChange($event)"\r
    (add)="navigateToCreate()"\r
    (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- Data Table -->\r
  <div class="card">\r
    <div class="card-body">\r
      <app-data-table\r
        [data]="excusePolicies()"\r
        [columns]="tableColumns"\r
        [actions]="tableActions"\r
        [loading]="loading()"\r
        [totalItems]="pagedResult()?.totalCount ?? 0"\r
        [currentPage]="currentPage()"\r
        [pageSize]="pageSize()"\r
        [pageSizeOptions]="[10, 25, 50, 100]"\r
        (pageChange)="onPageChange($event)"\r
        (pageSizeChange)="onPageSizeChange($event)"\r
        (actionClick)="onTableAction($event)"\r
        [emptyMessage]="i18n.t('excuse_policies.no_policies_found')"\r
      ></app-data-table>\r
    </div>\r
  </div>\r
\r
  <!-- Error Display -->\r
  @if (error()) {\r
    <div class="alert alert-danger mt-3" role="alert">\r
      <i class="fas fa-exclamation-triangle me-2"></i>\r
      {{ error() }}\r
    </div>\r
  }\r
</div>\r
\r
`, styles: ["/* src/app/pages/excuse-policies/excuse-policies.component.css */\n.excuse-policies-page {\n  padding: 1rem;\n}\n.card {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n}\n.card-body {\n  padding: 1.5rem;\n}\n.btn {\n  border-radius: 0.375rem;\n  font-weight: 500;\n}\n.btn-primary {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-primary:hover {\n  background-color: #0b5ed7;\n  border-color: #0a58ca;\n}\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary:hover {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n}\n.form-select,\n.form-control {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n}\n.form-select:focus,\n.form-control:focus {\n  border-color: #86b7fe;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.input-group-text {\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  color: #6c757d;\n}\n.alert {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-danger {\n  background-color: #f8d7da;\n  color: #721c24;\n}\n.text-muted {\n  color: #6c757d !important;\n}\nh2 {\n  color: #212529;\n  font-weight: 600;\n}\n.table-responsive {\n  border-radius: 0.5rem;\n}\n@media (max-width: 768px) {\n  .excuse-policies-page {\n    padding: 0.5rem;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between > div:first-child {\n    text-align: center;\n  }\n  .btn {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=excuse-policies.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExcusePoliciesComponent, { className: "ExcusePoliciesComponent", filePath: "src/app/pages/excuse-policies/excuse-policies.component.ts", lineNumber: 31 });
})();
export {
  ExcusePoliciesComponent
};
//# sourceMappingURL=chunk-WX3RRT2F.js.map
