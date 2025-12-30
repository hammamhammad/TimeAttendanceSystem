import {
  WorkflowsService
} from "./chunk-T4XJ6ZDA.js";
import {
  DataTableComponent
} from "./chunk-7JZQN7NK.js";
import "./chunk-5ZV3Z4IV.js";
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
  FormsModule,
  NgSelectOption,
  ɵNgSelectMultipleOption
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
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/workflows/workflow-list/workflow-list.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
function WorkflowListComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
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
__name(WorkflowListComponent_For_12_Template, "WorkflowListComponent_For_12_Template");
function WorkflowListComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function WorkflowListComponent_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onClearFilters());
    }, "WorkflowListComponent_Conditional_24_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("common.clear_filters"), " ");
  }
}
__name(WorkflowListComponent_Conditional_24_Template, "WorkflowListComponent_Conditional_24_Template");
function WorkflowListComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function WorkflowListComponent_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCreateWorkflow());
    }, "WorkflowListComponent_Conditional_26_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("workflows.create_workflow"), " ");
  }
}
__name(WorkflowListComponent_Conditional_26_Template, "WorkflowListComponent_Conditional_26_Template");
var _WorkflowListComponent = class _WorkflowListComponent {
  workflowsService = inject(WorkflowsService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants
  PERMISSIONS = {
    WORKFLOW_CREATE: "workflow.create",
    WORKFLOW_READ: "workflow.read",
    WORKFLOW_UPDATE: "workflow.update",
    WORKFLOW_DELETE: "workflow.delete"
  };
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  workflows = signal([], ...ngDevMode ? [{ debugName: "workflows" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Filter signals
  selectedEntityType = signal(void 0, ...ngDevMode ? [{ debugName: "selectedEntityType" }] : []);
  selectedActiveStatus = signal(void 0, ...ngDevMode ? [{ debugName: "selectedActiveStatus" }] : []);
  // Entity types for filter dropdown
  entityTypes = this.workflowsService.getEntityTypes();
  // Data table configuration
  tableColumns = computed(() => [
    {
      key: "name",
      label: this.t("workflows.name"),
      sortable: true,
      width: "200px",
      priority: "high",
      mobileLabel: this.t("workflows.name")
    },
    {
      key: "entityTypeDisplay",
      label: this.t("workflows.entity_type"),
      sortable: false,
      width: "150px",
      priority: "high",
      mobileLabel: this.t("workflows.entity_type"),
      renderHtml: true
    },
    {
      key: "scope",
      label: this.t("workflows.scope"),
      sortable: false,
      width: "150px",
      priority: "medium",
      mobileLabel: this.t("workflows.scope"),
      renderHtml: true
    },
    {
      key: "stepsCount",
      label: this.t("workflows.steps_count"),
      sortable: false,
      width: "100px",
      align: "center",
      priority: "medium",
      mobileLabel: this.t("workflows.steps_count")
    },
    {
      key: "isDefault",
      label: this.t("workflows.default"),
      sortable: false,
      width: "100px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("workflows.default"),
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
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.WORKFLOW_READ), "condition")
    },
    {
      key: "edit",
      label: this.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.WORKFLOW_UPDATE), "condition")
    },
    {
      key: "toggle",
      label: this.t("workflows.toggle_status"),
      icon: "fa-toggle-on",
      color: "warning",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.WORKFLOW_UPDATE), "condition")
    },
    {
      key: "delete",
      label: this.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.WORKFLOW_DELETE), "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform workflows data for data table
  tableData = computed(() => {
    return this.workflows().map((workflow) => __spreadProps(__spreadValues({}, workflow), {
      entityTypeDisplay: this.formatEntityType(workflow.entityType),
      scope: this.formatScope(workflow),
      stepsCount: workflow.steps?.length || 0,
      isDefault: this.formatBoolean(workflow.isDefault),
      status: this.formatStatus(workflow),
      createdAt: this.formatDate(workflow.createdAtUtc)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  ngOnInit() {
    this.loadWorkflows();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadWorkflows() {
    this.loading.set(true);
    this.workflowsService.getWorkflowDefinitions(
      this.currentPage(),
      this.pageSize(),
      this.selectedEntityType(),
      void 0,
      // branchId
      this.selectedActiveStatus()
    ).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        if (response && response.items) {
          this.workflows.set(response.items);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
        } else {
          this.workflows.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load workflows:", error);
        this.loading.set(false);
        this.notificationService.error(this.t("app.error"), this.t("workflows.load_error"));
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
  formatEntityType(entityType) {
    const displayName = this.workflowsService.getEntityTypeDisplayName(entityType);
    return `<span class="badge bg-primary">${displayName}</span>`;
  }
  formatScope(workflow) {
    const scopeText = workflow.branchId === null || workflow.branchId === void 0 ? this.t("workflows.organization_wide") : workflow.branchName || `Branch ${workflow.branchId}`;
    const badgeClass = workflow.branchId === null || workflow.branchId === void 0 ? "badge bg-success" : "badge bg-info";
    return `<span class="${badgeClass}">${scopeText}</span>`;
  }
  formatBoolean(value) {
    const text = value ? this.t("common.yes") : this.t("common.no");
    const badgeClass = value ? "badge bg-success" : "badge bg-secondary";
    return `<span class="${badgeClass}">${text}</span>`;
  }
  formatStatus(workflow) {
    const statusText = workflow.isActive ? this.t("common.active") : this.t("common.inactive");
    const badgeClass = workflow.isActive ? "badge bg-success" : "badge bg-light text-dark border";
    return `<span class="${badgeClass}">${statusText}</span>`;
  }
  // Data table action handler
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onViewWorkflow(item);
        break;
      case "edit":
        this.onEditWorkflow(item);
        break;
      case "toggle":
        this.onToggleStatus(item);
        break;
      case "delete":
        this.onDeleteWorkflow(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  // Pagination handlers
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadWorkflows();
  }
  onPageSizeChange(pageSize) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadWorkflows();
  }
  // Filter handlers
  onEntityTypeChange(event) {
    const value = event.target.value;
    this.selectedEntityType.set(value ? value : void 0);
    this.currentPage.set(1);
    this.loadWorkflows();
  }
  onStatusChange(event) {
    const value = event.target.value;
    this.selectedActiveStatus.set(value === "true" ? true : value === "false" ? false : void 0);
    this.currentPage.set(1);
    this.loadWorkflows();
  }
  onClearFilters() {
    this.selectedEntityType.set(void 0);
    this.selectedActiveStatus.set(void 0);
    this.currentPage.set(1);
    this.loadWorkflows();
  }
  hasActiveFilters() {
    return !!(this.selectedEntityType() !== void 0 || this.selectedActiveStatus() !== void 0);
  }
  // Workflow CRUD operations
  onCreateWorkflow() {
    this.router.navigate(["/settings/workflows/create"]);
  }
  onViewWorkflow(workflow) {
    this.router.navigate(["/settings/workflows", workflow.id, "view"]);
  }
  onEditWorkflow(workflow) {
    this.router.navigate(["/settings/workflows", workflow.id, "edit"]);
  }
  onToggleStatus(workflow) {
    return __async(this, null, function* () {
      const action = workflow.isActive ? "deactivate" : "activate";
      const result = yield this.confirmationService.confirm({
        title: this.t(`workflows.${action}_title`),
        message: this.t(`workflows.confirm_${action}`),
        confirmText: this.t(`workflows.${action}`),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: workflow.isActive ? "btn-warning" : "btn-success",
        icon: "fa-toggle-on",
        iconClass: workflow.isActive ? "text-warning" : "text-success"
      });
      if (result.confirmed) {
        const observable = workflow.isActive ? this.workflowsService.deactivateWorkflowDefinition(workflow.id) : this.workflowsService.activateWorkflowDefinition(workflow.id);
        observable.subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.loadWorkflows();
            this.notificationService.success(this.t("app.success"), this.t(`workflows.${action}_success`));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error(`Failed to ${action} workflow:`, error);
            this.notificationService.error(this.t("app.error"), this.t(`workflows.${action}_error`));
          }, "error")
        });
      }
    });
  }
  onDeleteWorkflow(workflow) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.t("workflows.delete_title"),
        message: this.t("workflows.confirm_delete"),
        confirmText: this.t("common.delete"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.workflowsService.deleteWorkflowDefinition(workflow.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.loadWorkflows();
            this.notificationService.success(this.t("app.success"), this.t("workflows.delete_success"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete workflow:", error);
            this.notificationService.error(this.t("app.error"), this.t("workflows.delete_error"));
          }, "error")
        });
      }
    });
  }
};
__name(_WorkflowListComponent, "WorkflowListComponent");
__publicField(_WorkflowListComponent, "\u0275fac", /* @__PURE__ */ __name(function WorkflowListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _WorkflowListComponent)();
}, "WorkflowListComponent_Factory"));
__publicField(_WorkflowListComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WorkflowListComponent, selectors: [["app-workflow-list"]], decls: 30, vars: 19, consts: [[1, "container-fluid", "py-4"], [3, "title"], [1, "card", "mb-4"], [1, "card-body"], [1, "row", "g-3", "align-items-end"], [1, "col-md-3"], [1, "form-label"], [1, "form-select", 3, "change", "value"], ["value", ""], [3, "value"], ["value", "true"], ["value", "false"], ["type", "button", 1, "btn", "btn-outline-secondary"], [1, "col-md-3", "text-end"], ["type", "button", 1, "btn", "btn-primary"], [1, "card"], [3, "pageChange", "pageSizeChange", "actionClick", "columns", "data", "loading", "totalItems", "currentPage", "pageSize", "actions", "emptyMessage"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fa-solid", "fa-times", "me-1"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fa-solid", "fa-plus", "me-1"]], template: /* @__PURE__ */ __name(function WorkflowListComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "label", 6);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 7);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function WorkflowListComponent_Template_select_change_8_listener($event) {
      return ctx.onEntityTypeChange($event);
    }, "WorkflowListComponent_Template_select_change_8_listener"));
    \u0275\u0275elementStart(9, "option", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(11, WorkflowListComponent_For_12_Template, 2, 2, "option", 9, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 5)(14, "label", 6);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 7);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function WorkflowListComponent_Template_select_change_16_listener($event) {
      return ctx.onStatusChange($event);
    }, "WorkflowListComponent_Template_select_change_16_listener"));
    \u0275\u0275elementStart(17, "option", 8);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 10);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 11);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 5);
    \u0275\u0275conditionalCreate(24, WorkflowListComponent_Conditional_24_Template, 3, 1, "button", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 13);
    \u0275\u0275conditionalCreate(26, WorkflowListComponent_Conditional_26_Template, 3, 1, "button", 14);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(27, "div", 15)(28, "div", 3)(29, "app-data-table", 16);
    \u0275\u0275listener("pageChange", /* @__PURE__ */ __name(function WorkflowListComponent_Template_app_data_table_pageChange_29_listener($event) {
      return ctx.onPageChange($event);
    }, "WorkflowListComponent_Template_app_data_table_pageChange_29_listener"))("pageSizeChange", /* @__PURE__ */ __name(function WorkflowListComponent_Template_app_data_table_pageSizeChange_29_listener($event) {
      return ctx.onPageSizeChange($event);
    }, "WorkflowListComponent_Template_app_data_table_pageSizeChange_29_listener"))("actionClick", /* @__PURE__ */ __name(function WorkflowListComponent_Template_app_data_table_actionClick_29_listener($event) {
      return ctx.onActionClick($event);
    }, "WorkflowListComponent_Template_app_data_table_actionClick_29_listener"));
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_6_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("workflows.title"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.t("workflows.filter_entity_type"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx.selectedEntityType() || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.all"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.entityTypes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("workflows.filter_status"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx.selectedActiveStatus() === void 0 ? "" : (tmp_6_0 = ctx.selectedActiveStatus()) == null ? null : tmp_6_0.toString());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.all"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.active"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.inactive"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.hasActiveFilters() ? 24 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.permissionService.has(ctx.PERMISSIONS.WORKFLOW_CREATE) ? 26 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("columns", ctx.tableColumns())("data", ctx.tableData())("loading", ctx.loading())("totalItems", ctx.totalCount())("currentPage", ctx.currentPage())("pageSize", ctx.pageSize())("actions", ctx.tableActions())("emptyMessage", ctx.t("workflows.no_workflows"));
  }
}, "WorkflowListComponent_Template"), dependencies: [
  FormsModule,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DataTableComponent,
  PageHeaderComponent
], styles: ["\n\n.badge[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.card[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n@media (max-width: 768px) {\n  .row.g-3[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n}\n/*# sourceMappingURL=workflow-list.component.css.map */"] }));
var WorkflowListComponent = _WorkflowListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkflowListComponent, [{
    type: Component,
    args: [{ selector: "app-workflow-list", standalone: true, imports: [
      FormsModule,
      DataTableComponent,
      PageHeaderComponent
    ], template: `<div class="container-fluid py-4">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="t('workflows.title')">\r
  </app-page-header>\r
\r
  <!-- Filters -->\r
  <div class="card mb-4">\r
    <div class="card-body">\r
      <div class="row g-3 align-items-end">\r
        <!-- Entity Type Filter -->\r
        <div class="col-md-3">\r
          <label class="form-label">{{ t('workflows.filter_entity_type') }}</label>\r
          <select\r
            class="form-select"\r
            [value]="selectedEntityType() || ''"\r
            (change)="onEntityTypeChange($event)">\r
            <option value="">{{ t('common.all') }}</option>\r
            @for (type of entityTypes; track type.value) {\r
              <option [value]="type.value">{{ type.label }}</option>\r
            }\r
          </select>\r
        </div>\r
\r
        <!-- Status Filter -->\r
        <div class="col-md-3">\r
          <label class="form-label">{{ t('workflows.filter_status') }}</label>\r
          <select\r
            class="form-select"\r
            [value]="selectedActiveStatus() === undefined ? '' : selectedActiveStatus()?.toString()"\r
            (change)="onStatusChange($event)">\r
            <option value="">{{ t('common.all') }}</option>\r
            <option value="true">{{ t('common.active') }}</option>\r
            <option value="false">{{ t('common.inactive') }}</option>\r
          </select>\r
        </div>\r
\r
        <!-- Clear Filters -->\r
        <div class="col-md-3">\r
          @if (hasActiveFilters()) {\r
            <button\r
              type="button"\r
              class="btn btn-outline-secondary"\r
              (click)="onClearFilters()">\r
              <i class="fa-solid fa-times me-1"></i>\r
              {{ t('common.clear_filters') }}\r
            </button>\r
          }\r
        </div>\r
\r
        <!-- Create Button -->\r
        <div class="col-md-3 text-end">\r
          @if (permissionService.has(PERMISSIONS.WORKFLOW_CREATE)) {\r
            <button\r
              type="button"\r
              class="btn btn-primary"\r
              (click)="onCreateWorkflow()">\r
              <i class="fa-solid fa-plus me-1"></i>\r
              {{ t('workflows.create_workflow') }}\r
            </button>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Data Table -->\r
  <div class="card">\r
    <div class="card-body">\r
      <app-data-table\r
        [columns]="tableColumns()"\r
        [data]="tableData()"\r
        [loading]="loading()"\r
        [totalItems]="totalCount()"\r
        [currentPage]="currentPage()"\r
        [pageSize]="pageSize()"\r
        [actions]="tableActions()"\r
        [emptyMessage]="t('workflows.no_workflows')"\r
        (pageChange)="onPageChange($event)"\r
        (pageSizeChange)="onPageSizeChange($event)"\r
        (actionClick)="onActionClick($event)">\r
      </app-data-table>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/pages/settings/workflows/workflow-list/workflow-list.component.css */\n.badge {\n  font-weight: 500;\n}\n.card .form-label {\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n@media (max-width: 768px) {\n  .row.g-3 > div {\n    margin-bottom: 0.5rem;\n  }\n}\n/*# sourceMappingURL=workflow-list.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WorkflowListComponent, { className: "WorkflowListComponent", filePath: "src/app/pages/settings/workflows/workflow-list/workflow-list.component.ts", lineNumber: 25 });
})();
export {
  WorkflowListComponent
};
//# sourceMappingURL=chunk-KIIZFBXF.js.map
