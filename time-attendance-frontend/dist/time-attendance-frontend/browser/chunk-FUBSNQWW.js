import {
  OvertimeConfigurationsService
} from "./chunk-SVLQ7232.js";
import {
  DataTableComponent
} from "./chunk-JW5UYWPK.js";
import {
  UnifiedFilterComponent
} from "./chunk-KEVORF3C.js";
import "./chunk-NKWUQBPB.js";
import "./chunk-SKLP6OYI.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-XLGMY32C.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
import "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import {
  FormsModule
} from "./chunk-GYSVNBR7.js";
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
  Component,
  computed,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/settings/overtime/overtime-configurations.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function OvertimeConfigurationsComponent_Conditional_3_For_1_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const config_r1 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("settings.overtime.until"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(config_r1.effectiveToDate));
  }
}
__name(OvertimeConfigurationsComponent_Conditional_3_For_1_Conditional_0_Conditional_9_Template, "OvertimeConfigurationsComponent_Conditional_3_For_1_Conditional_0_Conditional_9_Template");
function OvertimeConfigurationsComponent_Conditional_3_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "i", 7);
    \u0275\u0275elementStart(2, "div", 8)(3, "h6", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, OvertimeConfigurationsComponent_Conditional_3_For_1_Conditional_0_Conditional_9_Template, 3, 2);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const config_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.t("settings.overtime.activePolicyInfo"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("settings.overtime.currentlyActive"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(config_r1.effectiveFromDate));
    \u0275\u0275advance();
    \u0275\u0275conditional(config_r1.effectiveToDate ? 9 : -1);
  }
}
__name(OvertimeConfigurationsComponent_Conditional_3_For_1_Conditional_0_Template, "OvertimeConfigurationsComponent_Conditional_3_For_1_Conditional_0_Template");
function OvertimeConfigurationsComponent_Conditional_3_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, OvertimeConfigurationsComponent_Conditional_3_For_1_Conditional_0_Template, 10, 4, "div", 6);
  }
  if (rf & 2) {
    const config_r1 = ctx.$implicit;
    \u0275\u0275conditional(config_r1.isActive ? 0 : -1);
  }
}
__name(OvertimeConfigurationsComponent_Conditional_3_For_1_Template, "OvertimeConfigurationsComponent_Conditional_3_For_1_Template");
function OvertimeConfigurationsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OvertimeConfigurationsComponent_Conditional_3_For_1_Template, 1, 1, null, null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.configurations());
  }
}
__name(OvertimeConfigurationsComponent_Conditional_3_Template, "OvertimeConfigurationsComponent_Conditional_3_Template");
var _OvertimeConfigurationsComponent = class _OvertimeConfigurationsComponent {
  overtimeService = inject(OvertimeConfigurationsService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    OVERTIME_CREATE: "settings.create",
    OVERTIME_READ: "settings.read",
    OVERTIME_UPDATE: "settings.update",
    OVERTIME_DELETE: "settings.delete",
    OVERTIME_ACTIVATE: "settings.configure"
  };
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  configurations = signal([], ...ngDevMode ? [{ debugName: "configurations" }] : []);
  // Filter signals
  searchTerm = "";
  // Sorting state
  sortColumn = signal("effectiveFromDate", ...ngDevMode ? [{ debugName: "sortColumn" }] : []);
  sortDirection = signal("desc", ...ngDevMode ? [{ debugName: "sortDirection" }] : []);
  // Data table configuration
  tableColumns = computed(() => [
    {
      key: "status",
      label: this.t("settings.overtime.status"),
      sortable: false,
      width: "120px",
      align: "center",
      priority: "high",
      mobileLabel: this.t("settings.overtime.status"),
      renderHtml: true
    },
    {
      key: "effectiveFromDate",
      label: this.t("settings.overtime.effectiveFrom"),
      sortable: true,
      width: "150px",
      priority: "high",
      mobileLabel: this.t("settings.overtime.effectiveFrom")
    },
    {
      key: "effectiveToDate",
      label: this.t("settings.overtime.effectiveTo"),
      sortable: true,
      width: "150px",
      priority: "medium",
      hideOnMobile: false,
      mobileLabel: this.t("settings.overtime.effectiveTo")
    },
    {
      key: "rates",
      label: this.t("settings.overtime.rates"),
      sortable: false,
      width: "200px",
      priority: "medium",
      hideOnMobile: false,
      mobileLabel: this.t("settings.overtime.rates"),
      renderHtml: true
    },
    {
      key: "settings",
      label: this.t("settings.overtime.configuration"),
      sortable: false,
      width: "180px",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("settings.overtime.configuration"),
      renderHtml: true
    },
    {
      key: "createdAtUtc",
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
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.OVERTIME_READ), "condition")
    },
    {
      key: "activate",
      label: this.t("settings.overtime.activate"),
      icon: "fa-play",
      color: "success",
      condition: /* @__PURE__ */ __name((config) => !config.isActive && this.permissionService.has(this.PERMISSIONS.OVERTIME_ACTIVATE), "condition")
    },
    {
      key: "deactivate",
      label: this.t("settings.overtime.deactivate"),
      icon: "fa-pause",
      color: "warning",
      condition: /* @__PURE__ */ __name((config) => config.isActive && this.permissionService.has(this.PERMISSIONS.OVERTIME_ACTIVATE), "condition")
    },
    {
      key: "edit",
      label: this.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.OVERTIME_UPDATE), "condition")
    },
    {
      key: "delete",
      label: this.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name((config) => !config.isActive && this.permissionService.has(this.PERMISSIONS.OVERTIME_DELETE), "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform configurations data for data table
  tableData = computed(() => {
    return this.filteredConfigurations().map((config) => __spreadProps(__spreadValues({}, config), {
      status: this.formatStatus(config),
      effectiveFromDate: this.formatDate(config.effectiveFromDate),
      effectiveToDate: config.effectiveToDate ? this.formatDate(config.effectiveToDate) : this.t("settings.overtime.indefinite"),
      rates: this.formatRates(config),
      settings: this.formatSettings(config),
      createdAtUtc: this.formatDate(config.createdAtUtc)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  ngOnInit() {
    this.loadConfigurations();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadConfigurations() {
    this.loading.set(true);
    this.overtimeService.getOvertimeConfigurations().subscribe({
      next: /* @__PURE__ */ __name((configurations) => {
        this.configurations.set(configurations);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load overtime configurations:", error);
        this.loading.set(false);
        this.notificationService.error(this.t("app.error"), this.t("errors.server"));
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
  formatStatus(config) {
    if (config.isActive) {
      return `<span class="badge bg-success">${this.t("settings.overtime.active")}</span>`;
    } else {
      return `<span class="badge bg-light text-dark border">${this.t("settings.overtime.inactive")}</span>`;
    }
  }
  formatRates(config) {
    return `<div class="small">
      <div><strong>${this.t("settings.overtime.normalDay")}:</strong> ${config.normalDayRate}x</div>
      <div><strong>${this.t("settings.overtime.holiday")}:</strong> ${config.publicHolidayRate}x</div>
      <div><strong>${this.t("settings.overtime.offDay")}:</strong> ${config.offDayRate}x</div>
    </div>`;
  }
  formatSettings(config) {
    const settings = [];
    if (config.enablePreShiftOvertime)
      settings.push(this.t("settings.overtime.preShift"));
    if (config.enablePostShiftOvertime)
      settings.push(this.t("settings.overtime.postShift"));
    if (config.considerFlexibleTime)
      settings.push(this.t("settings.overtime.flexibleTime"));
    if (config.requireApproval)
      settings.push(this.t("settings.overtime.requiresApproval"));
    return `<div class="small">${settings.join(", ")}</div>`;
  }
  // Filtered configurations computed signal
  filteredConfigurations = computed(() => {
    let filtered = this.configurations();
    if (this.searchTerm?.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter((config) => config.policyNotes?.toLowerCase().includes(searchLower) || config.createdBy?.toLowerCase().includes(searchLower));
    }
    const sortCol = this.sortColumn();
    const sortDir = this.sortDirection();
    return filtered.sort((a, b) => {
      let aVal = a[sortCol];
      let bVal = b[sortCol];
      if (sortCol === "effectiveFromDate" || sortCol === "effectiveToDate" || sortCol === "createdAtUtc") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal)
        return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal)
        return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, ...ngDevMode ? [{ debugName: "filteredConfigurations" }] : []);
  // Data table action handler
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onViewConfiguration(item);
        break;
      case "activate":
        this.onActivateConfiguration(item);
        break;
      case "deactivate":
        this.onDeactivateConfiguration(item);
        break;
      case "edit":
        this.onEditConfiguration(item);
        break;
      case "delete":
        this.onDeleteConfiguration(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  onSearchChange() {
    setTimeout(() => {
    }, 300);
  }
  onClearFilters() {
    this.searchTerm = "";
  }
  hasActiveFilters() {
    return !!this.searchTerm;
  }
  // Unified filter handlers
  onSearchTermChange(searchTerm) {
    this.searchTerm = searchTerm;
  }
  onFiltersChange(filters) {
    if (filters.branchId !== void 0) {
    }
    if (filters.isActive !== void 0) {
    }
  }
  onRefreshData() {
    this.onClearFilters();
    this.loadConfigurations();
  }
  // Configuration CRUD operations
  onCreateConfiguration() {
    this.router.navigate(["/settings/overtime/create"]);
  }
  onViewConfiguration(config) {
    this.router.navigate(["/settings/overtime", config.id, "view"]);
  }
  onEditConfiguration(config) {
    this.router.navigate(["/settings/overtime/edit", config.id]);
  }
  onActivateConfiguration(config) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.t("settings.overtime.activatePolicy"),
        message: this.t("settings.overtime.activatePolicyConfirmation"),
        confirmText: this.t("settings.overtime.activate"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: "btn-success",
        icon: "fa-play",
        iconClass: "text-success"
      });
      if (result.confirmed) {
        this.overtimeService.activateOvertimeConfiguration(config.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.loadConfigurations();
            this.notificationService.success(this.t("app.success"), this.t("settings.overtime.policyActivatedSuccessfully"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to activate configuration:", error);
            this.notificationService.error(this.t("app.error"), this.t("errors.server"));
          }, "error")
        });
      }
    });
  }
  onDeactivateConfiguration(config) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.t("settings.overtime.deactivatePolicy"),
        message: this.t("settings.overtime.deactivatePolicyConfirmation"),
        confirmText: this.t("settings.overtime.deactivate"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: "btn-warning",
        icon: "fa-pause",
        iconClass: "text-warning"
      });
      if (result.confirmed) {
        this.overtimeService.deactivateOvertimeConfiguration(config.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.loadConfigurations();
            this.notificationService.success(this.t("app.success"), this.t("settings.overtime.policyDeactivatedSuccessfully"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to deactivate configuration:", error);
            this.notificationService.error(this.t("app.error"), this.t("errors.server"));
          }, "error")
        });
      }
    });
  }
  onDeleteConfiguration(config) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.t("settings.overtime.deletePolicy"),
        message: this.t("settings.overtime.deletePolicyConfirmation"),
        confirmText: this.t("common.delete"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.overtimeService.deleteOvertimeConfiguration(config.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.configurations.set(this.configurations().filter((c) => c.id !== config.id));
            this.notificationService.success(this.t("app.success"), this.t("settings.overtime.policyDeletedSuccessfully"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete configuration:", error);
            this.notificationService.error(this.t("app.error"), this.t("errors.server"));
          }, "error")
        });
      }
    });
  }
  canCreateConfigurations() {
    return this.permissionService.has(this.PERMISSIONS.OVERTIME_CREATE);
  }
  // Sorting methods
  onSort(column) {
    const currentColumn = this.sortColumn();
    const currentDirection = this.sortDirection();
    if (currentColumn === column) {
      this.sortDirection.set(currentDirection === "asc" ? "desc" : "asc");
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set("asc");
    }
  }
  getSortIcon(column) {
    const currentColumn = this.sortColumn();
    const currentDirection = this.sortDirection();
    if (currentColumn !== column) {
      return "fas fa-sort text-muted";
    }
    return currentDirection === "asc" ? "fas fa-sort-up text-primary" : "fas fa-sort-down text-primary";
  }
  isSortable(column) {
    const sortableColumns = ["effectiveFromDate", "effectiveToDate", "createdAtUtc"];
    return sortableColumns.includes(column);
  }
};
__name(_OvertimeConfigurationsComponent, "OvertimeConfigurationsComponent");
__publicField(_OvertimeConfigurationsComponent, "\u0275fac", /* @__PURE__ */ __name(function OvertimeConfigurationsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _OvertimeConfigurationsComponent)();
}, "OvertimeConfigurationsComponent_Factory"));
__publicField(_OvertimeConfigurationsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OvertimeConfigurationsComponent, selectors: [["app-overtime-configurations"]], decls: 7, vars: 11, consts: [[1, "container-fluid"], [3, "title"], ["moduleName", "overtime-configurations", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [1, "card"], [1, "card-body"], [3, "actionClick", "data", "columns", "actions", "loading", "emptyTitle", "emptyMessage", "paginated"], [1, "alert", "alert-info", "d-flex", "align-items-center", "mb-4"], [1, "fa-solid", "fa-info-circle", "me-3", "fs-4"], [1, "flex-grow-1"], [1, "mb-1"], [1, "mb-0"]], template: /* @__PURE__ */ __name(function OvertimeConfigurationsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function OvertimeConfigurationsComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchTermChange($event);
    }, "OvertimeConfigurationsComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function OvertimeConfigurationsComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "OvertimeConfigurationsComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function OvertimeConfigurationsComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.onCreateConfiguration();
    }, "OvertimeConfigurationsComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function OvertimeConfigurationsComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "OvertimeConfigurationsComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, OvertimeConfigurationsComponent_Conditional_3_Template, 2, 0);
    \u0275\u0275elementStart(4, "div", 3)(5, "div", 4)(6, "app-data-table", 5);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function OvertimeConfigurationsComponent_Template_app_data_table_actionClick_6_listener($event) {
      return ctx.onActionClick($event);
    }, "OvertimeConfigurationsComponent_Template_app_data_table_actionClick_6_listener"));
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("settings.overtime.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.configurations().length > 0 ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("data", ctx.tableData() || \u0275\u0275pureFunction0(10, _c0))("columns", ctx.tableColumns())("actions", ctx.tableActions())("loading", ctx.loading)("emptyTitle", ctx.t("settings.overtime.noConfigurationsTitle"))("emptyMessage", ctx.t("settings.overtime.noConfigurationsMessage"))("paginated", true);
  }
}, "OvertimeConfigurationsComponent_Template"), dependencies: [FormsModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transition: all 0.15s ease-in-out;\n}\n.card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  border: none;\n}\n.alert-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d1ecf1 0%,\n      #bee5eb 100%);\n  color: #0c5460;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.input-group[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  overflow: hidden;\n}\n.input-group-text[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n}\n.form-control[_ngcontent-%COMP%] {\n  border-color: #dee2e6;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75em;\n  padding: 0.35em 0.65em;\n  border-radius: 0.375rem;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.display-1[_ngcontent-%COMP%] {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n@media (max-width: 768px) {\n  .display-1[_ngcontent-%COMP%] {\n    font-size: 4rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .text-end[_ngcontent-%COMP%] {\n    text-align: start !important;\n  }\n}\n.fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.badge.bg-success[_ngcontent-%COMP%] {\n  background-color: #198754 !important;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  border-top: none;\n  font-weight: 600;\n  color: #495057;\n  background-color: #f8f9fa;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-right: 0.25rem;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-right: 0;\n}\n/*# sourceMappingURL=overtime-configurations.component.css.map */"] }));
var OvertimeConfigurationsComponent = _OvertimeConfigurationsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OvertimeConfigurationsComponent, [{
    type: Component,
    args: [{ selector: "app-overtime-configurations", standalone: true, imports: [FormsModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent], template: `<div class="container-fluid">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="t('settings.overtime.title')">\r
  </app-page-header>\r
\r
  <!-- Unified Filter Component -->\r
  <app-unified-filter\r
    moduleName="overtime-configurations"\r
    [refreshing]="loading()"\r
    (searchChange)="onSearchTermChange($event)"\r
    (filtersChange)="onFiltersChange($event)"\r
    (add)="onCreateConfiguration()"\r
    (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- Active Policy Info -->\r
  @if (!loading() && configurations().length > 0) {\r
    @for (config of configurations(); track config.id) {\r
      @if (config.isActive) {\r
        <div class="alert alert-info d-flex align-items-center mb-4">\r
          <i class="fa-solid fa-info-circle me-3 fs-4"></i>\r
          <div class="flex-grow-1">\r
            <h6 class="mb-1">{{ t('settings.overtime.activePolicyInfo') }}</h6>\r
            <p class="mb-0">\r
              {{ t('settings.overtime.currentlyActive') }}\r
              <strong>{{ formatDate(config.effectiveFromDate) }}</strong>\r
              @if (config.effectiveToDate) {\r
                {{ t('settings.overtime.until') }} <strong>{{ formatDate(config.effectiveToDate) }}</strong>\r
              }\r
            </p>\r
          </div>\r
        </div>\r
      }\r
    }\r
  }\r
\r
  <!-- Data Table -->\r
  <div class="card">\r
    <div class="card-body">\r
      <app-data-table\r
        [data]="tableData() || []"\r
        [columns]="tableColumns()"\r
        [actions]="tableActions()"\r
        [loading]="loading"\r
        [emptyTitle]="t('settings.overtime.noConfigurationsTitle')"\r
        [emptyMessage]="t('settings.overtime.noConfigurationsMessage')"\r
        [paginated]="true"\r
        (actionClick)="onActionClick($event)">\r
      </app-data-table>\r
    </div>\r
  </div>\r
</div>`, styles: ["/* src/app/pages/settings/overtime/overtime-configurations.component.css */\n.card {\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transition: all 0.15s ease-in-out;\n}\n.card:hover {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.alert {\n  border-radius: 0.5rem;\n  border: none;\n}\n.alert-info {\n  background:\n    linear-gradient(\n      135deg,\n      #d1ecf1 0%,\n      #bee5eb 100%);\n  color: #0c5460;\n}\n.btn {\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn:hover {\n  transform: translateY(-1px);\n}\n.input-group {\n  border-radius: 0.375rem;\n  overflow: hidden;\n}\n.input-group-text {\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n}\n.form-control {\n  border-color: #dee2e6;\n}\n.form-control:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.badge {\n  font-size: 0.75em;\n  padding: 0.35em 0.65em;\n  border-radius: 0.375rem;\n}\n.text-muted {\n  color: #6c757d !important;\n}\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n@media (max-width: 768px) {\n  .display-1 {\n    font-size: 4rem;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .text-end {\n    text-align: start !important;\n  }\n}\n.fade-in {\n  animation: fadeIn 0.3s ease-in;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.badge.bg-success {\n  background-color: #198754 !important;\n}\n.table th {\n  border-top: none;\n  font-weight: 600;\n  color: #495057;\n  background-color: #f8f9fa;\n}\n.table td {\n  vertical-align: middle;\n}\n.btn-group .btn {\n  margin-right: 0.25rem;\n}\n.btn-group .btn:last-child {\n  margin-right: 0;\n}\n/*# sourceMappingURL=overtime-configurations.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OvertimeConfigurationsComponent, { className: "OvertimeConfigurationsComponent", filePath: "src/app/pages/settings/overtime/overtime-configurations.component.ts", lineNumber: 22 });
})();
export {
  OvertimeConfigurationsComponent
};
//# sourceMappingURL=chunk-FUBSNQWW.js.map
