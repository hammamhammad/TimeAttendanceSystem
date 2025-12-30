import {
  RemoteWorkRequestStatus,
  RemoteWorkRequestsService
} from "./chunk-3XTHE4WN.js";
import {
  DataTableComponent
} from "./chunk-7JZQN7NK.js";
import {
  UnifiedFilterComponent
} from "./chunk-THHKOIOG.js";
import "./chunk-5ZV3Z4IV.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
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
import "./chunk-CVUMC7BN.js";
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
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/remote-work/remote-work-list/remote-work-list.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
function RemoteWorkListComponent_ng_template_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const request_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", request_r2.employeeName || "N/A", " ");
  }
}
__name(RemoteWorkListComponent_ng_template_4_Conditional_0_Template, "RemoteWorkListComponent_ng_template_4_Conditional_0_Template");
function RemoteWorkListComponent_ng_template_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const request_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(request_r2.startDate), " ");
  }
}
__name(RemoteWorkListComponent_ng_template_4_Conditional_1_Template, "RemoteWorkListComponent_ng_template_4_Conditional_1_Template");
function RemoteWorkListComponent_ng_template_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const request_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(request_r2.endDate), " ");
  }
}
__name(RemoteWorkListComponent_ng_template_4_Conditional_2_Template, "RemoteWorkListComponent_ng_template_4_Conditional_2_Template");
function RemoteWorkListComponent_ng_template_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const request_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", request_r2.workingDaysCount, " ");
  }
}
__name(RemoteWorkListComponent_ng_template_4_Conditional_3_Template, "RemoteWorkListComponent_ng_template_4_Conditional_3_Template");
function RemoteWorkListComponent_ng_template_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-status-badge", 5);
  }
  if (rf & 2) {
    const request_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("status", ctx_r2.getStatusVariant(request_r2.status))("label", ctx_r2.getStatusText(request_r2.status));
  }
}
__name(RemoteWorkListComponent_ng_template_4_Conditional_4_Template, "RemoteWorkListComponent_ng_template_4_Conditional_4_Template");
function RemoteWorkListComponent_ng_template_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const request_r2 = ctx_r3.$implicit;
    const column_r5 = ctx_r3.column;
    \u0275\u0275textInterpolate1(" ", request_r2[column_r5.key], " ");
  }
}
__name(RemoteWorkListComponent_ng_template_4_Conditional_5_Template, "RemoteWorkListComponent_ng_template_4_Conditional_5_Template");
function RemoteWorkListComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RemoteWorkListComponent_ng_template_4_Conditional_0_Template, 1, 1)(1, RemoteWorkListComponent_ng_template_4_Conditional_1_Template, 1, 1)(2, RemoteWorkListComponent_ng_template_4_Conditional_2_Template, 1, 1)(3, RemoteWorkListComponent_ng_template_4_Conditional_3_Template, 1, 1)(4, RemoteWorkListComponent_ng_template_4_Conditional_4_Template, 1, 2, "app-status-badge", 5)(5, RemoteWorkListComponent_ng_template_4_Conditional_5_Template, 1, 1);
  }
  if (rf & 2) {
    const column_r5 = ctx.column;
    \u0275\u0275conditional(column_r5.key === "employeeName" ? 0 : column_r5.key === "startDate" ? 1 : column_r5.key === "endDate" ? 2 : column_r5.key === "workingDaysCount" ? 3 : column_r5.key === "status" ? 4 : 5);
  }
}
__name(RemoteWorkListComponent_ng_template_4_Template, "RemoteWorkListComponent_ng_template_4_Template");
var _RemoteWorkListComponent = class _RemoteWorkListComponent {
  service = inject(RemoteWorkRequestsService);
  router = inject(Router);
  notification = inject(NotificationService);
  confirmation = inject(ConfirmationService);
  permissionService = inject(PermissionService);
  i18n = inject(I18nService);
  requests = signal([], ...ngDevMode ? [{ debugName: "requests" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  // Table configuration
  tableColumns = [
    { key: "employeeName", label: this.i18n.t("remoteWork.request.employee"), sortable: true, width: "25%" },
    { key: "startDate", label: this.i18n.t("remoteWork.request.startDate"), sortable: true, width: "15%" },
    { key: "endDate", label: this.i18n.t("remoteWork.request.endDate"), sortable: true, width: "15%" },
    { key: "workingDaysCount", label: this.i18n.t("remoteWork.request.workingDays"), sortable: true, width: "15%", align: "center" },
    { key: "status", label: this.i18n.t("common.status"), sortable: true, width: "15%", align: "center" }
  ];
  // Table actions
  tableActions = [
    { key: "view", label: this.i18n.t("common.view"), icon: "fa-eye", color: "info" },
    { key: "edit", label: this.i18n.t("common.edit"), icon: "fa-edit", color: "primary" },
    { key: "cancel", label: this.i18n.t("remoteWork.request.cancel"), icon: "fa-ban", color: "warning" }
  ];
  ngOnInit() {
    this.loadRequests();
  }
  loadRequests() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: /* @__PURE__ */ __name((requests) => {
        this.requests.set(requests);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.notification.error(this.i18n.t("remoteWork.request.loadError"));
        this.loading.set(false);
      }, "error")
    });
  }
  onView(request) {
    this.router.navigate(["/remote-work", request.id, "view"]);
  }
  onEdit(request) {
    this.router.navigate(["/remote-work/edit", request.id]);
  }
  onCancel(request) {
    this.confirmation.confirm({
      title: this.i18n.t("remoteWork.request.cancelConfirm"),
      message: this.i18n.t("remoteWork.request.cancelMessage"),
      confirmText: this.i18n.t("common.yes"),
      cancelText: this.i18n.t("common.no")
    }).then((result) => {
      if (result.confirmed) {
        this.service.cancel(request.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notification.success(this.i18n.t("remoteWork.request.success.cancelled"));
            this.loadRequests();
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notification.error(this.i18n.t("remoteWork.request.errors.cancel_failed"));
          }, "error")
        });
      }
    });
  }
  onCreate() {
    this.router.navigate(["/remote-work/create"]);
  }
  /**
   * Handle search change from unified filter
   */
  onSearchChange(searchTerm) {
    console.log("Search term:", searchTerm);
  }
  /**
   * Handle filter changes from unified filter
   */
  onFiltersChange(filters) {
    console.log("Filters changed:", filters);
  }
  /**
   * Handle refresh from unified filter
   */
  onRefreshData() {
    this.loadRequests();
  }
  /**
   * Handle table actions
   */
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onView(item);
        break;
      case "edit":
        this.onEdit(item);
        break;
      case "cancel":
        this.onCancel(item);
        break;
    }
  }
  /**
   * Get status text for display
   */
  getStatusText(status) {
    const statusMap = {
      [RemoteWorkRequestStatus.Pending]: this.i18n.t("remoteWork.status.pending"),
      [RemoteWorkRequestStatus.Approved]: this.i18n.t("remoteWork.status.approved"),
      [RemoteWorkRequestStatus.Rejected]: this.i18n.t("remoteWork.status.rejected"),
      [RemoteWorkRequestStatus.Cancelled]: this.i18n.t("remoteWork.status.cancelled")
    };
    return statusMap[status] || "";
  }
  /**
   * Get status badge variant
   */
  getStatusVariant(status) {
    const statusMap = {
      [RemoteWorkRequestStatus.Pending]: "warning",
      [RemoteWorkRequestStatus.Approved]: "success",
      [RemoteWorkRequestStatus.Rejected]: "danger",
      [RemoteWorkRequestStatus.Cancelled]: "secondary"
    };
    return statusMap[status] || "secondary";
  }
  /**
   * Format date for display
   */
  formatDate(date) {
    if (!date)
      return "";
    const d = new Date(date);
    return d.toLocaleDateString();
  }
};
__name(_RemoteWorkListComponent, "RemoteWorkListComponent");
__publicField(_RemoteWorkListComponent, "\u0275fac", /* @__PURE__ */ __name(function RemoteWorkListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RemoteWorkListComponent)();
}, "RemoteWorkListComponent_Factory"));
__publicField(_RemoteWorkListComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RemoteWorkListComponent, selectors: [["app-remote-work-list"]], decls: 6, vars: 9, consts: [["cellTemplate", ""], [1, "app-list-page"], [3, "title"], ["moduleName", "remote-work-requests", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [3, "actionClick", "data", "columns", "actions", "loading", "emptyTitle", "emptyMessage"], [3, "status", "label"]], template: /* @__PURE__ */ __name(function RemoteWorkListComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-page-header", 2);
    \u0275\u0275elementStart(2, "app-unified-filter", 3);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function RemoteWorkListComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSearchChange($event));
    }, "RemoteWorkListComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function RemoteWorkListComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onFiltersChange($event));
    }, "RemoteWorkListComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function RemoteWorkListComponent_Template_app_unified_filter_add_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onCreate());
    }, "RemoteWorkListComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function RemoteWorkListComponent_Template_app_unified_filter_refresh_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onRefreshData());
    }, "RemoteWorkListComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-data-table", 4);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function RemoteWorkListComponent_Template_app_data_table_actionClick_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onActionClick($event));
    }, "RemoteWorkListComponent_Template_app_data_table_actionClick_3_listener"));
    \u0275\u0275template(4, RemoteWorkListComponent_ng_template_4_Template, 6, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("remoteWork.request.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx.requests() || \u0275\u0275pureFunction0(8, _c0))("columns", ctx.tableColumns)("actions", ctx.tableActions)("loading", ctx.loading)("emptyTitle", ctx.i18n.t("remoteWork.request.noData"))("emptyMessage", ctx.i18n.t("remoteWork.request.noDataMessage"));
  }
}, "RemoteWorkListComponent_Template"), dependencies: [
  DataTableComponent,
  PageHeaderComponent,
  StatusBadgeComponent,
  UnifiedFilterComponent
], styles: ["\n\n/*# sourceMappingURL=remote-work-list.component.css.map */"] }));
var RemoteWorkListComponent = _RemoteWorkListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RemoteWorkListComponent, [{
    type: Component,
    args: [{ selector: "app-remote-work-list", standalone: true, imports: [
      DataTableComponent,
      PageHeaderComponent,
      StatusBadgeComponent,
      UnifiedFilterComponent
    ], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header [title]="i18n.t('remoteWork.request.title')">\r
  </app-page-header>\r
\r
  <!-- Unified Filter Component -->\r
  <app-unified-filter moduleName="remote-work-requests" [refreshing]="loading()"\r
    (searchChange)="onSearchChange($event)" (filtersChange)="onFiltersChange($event)" (add)="onCreate()"\r
    (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- Remote Work Requests Table -->\r
  <app-data-table\r
    [data]="requests() || []"\r
    [columns]="tableColumns"\r
    [actions]="tableActions"\r
    [loading]="loading"\r
    [emptyTitle]="i18n.t('remoteWork.request.noData')"\r
    [emptyMessage]="i18n.t('remoteWork.request.noDataMessage')"\r
    (actionClick)="onActionClick($event)">\r
\r
    <!-- Custom cell template -->\r
    <ng-template #cellTemplate let-request let-column="column">\r
      @if (column.key === 'employeeName') {\r
      {{ request.employeeName || 'N/A' }}\r
      } @else if (column.key === 'startDate') {\r
      {{ formatDate(request.startDate) }}\r
      } @else if (column.key === 'endDate') {\r
      {{ formatDate(request.endDate) }}\r
      } @else if (column.key === 'workingDaysCount') {\r
      {{ request.workingDaysCount }}\r
      } @else if (column.key === 'status') {\r
      <app-status-badge [status]="getStatusVariant(request.status)" [label]="getStatusText(request.status)">\r
      </app-status-badge>\r
      } @else {\r
      {{ request[column.key] }}\r
      }\r
    </ng-template>\r
  </app-data-table>\r
</div>`, styles: ["/* src/app/pages/remote-work/remote-work-list/remote-work-list.component.css */\n/*# sourceMappingURL=remote-work-list.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RemoteWorkListComponent, { className: "RemoteWorkListComponent", filePath: "src/app/pages/remote-work/remote-work-list/remote-work-list.component.ts", lineNumber: 27 });
})();
export {
  RemoteWorkListComponent
};
//# sourceMappingURL=chunk-AZASXLGP.js.map
