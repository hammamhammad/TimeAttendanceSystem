import {
  DefinitionListComponent
} from "./chunk-YAIJIRYX.js";
import {
  ModalWrapperComponent
} from "./chunk-EDTHBJ53.js";
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
import "./chunk-EVMJ7ILG.js";
import "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import {
  environment
} from "./chunk-TNEZPYQG.js";
import {
  Component,
  HttpClient,
  HttpParams,
  Injectable,
  computed,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/reports/audit-logs/audit-logs.service.ts
var _AuditLogsService = class _AuditLogsService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/api/v1/audit-logs`;
  /**
   * Get audit logs with filtering and pagination
   */
  getAuditLogs(filters = {}) {
    let params = new HttpParams();
    if (filters.startDate) {
      params = params.set("startDate", filters.startDate);
    }
    if (filters.endDate) {
      params = params.set("endDate", filters.endDate);
    }
    if (filters.actions && filters.actions.length > 0) {
      params = params.set("actions", filters.actions.join(","));
    }
    if (filters.entityName) {
      params = params.set("entityName", filters.entityName);
    }
    if (filters.actorUserId) {
      params = params.set("actorUserId", filters.actorUserId.toString());
    }
    if (filters.searchTerm) {
      params = params.set("searchTerm", filters.searchTerm);
    }
    if (filters.pageNumber) {
      params = params.set("pageNumber", filters.pageNumber.toString());
    }
    if (filters.pageSize) {
      params = params.set("pageSize", filters.pageSize.toString());
    }
    if (filters.sortBy) {
      params = params.set("sortBy", filters.sortBy);
    }
    if (filters.sortDirection) {
      params = params.set("sortDirection", filters.sortDirection);
    }
    return this.http.get(this.apiUrl, { params });
  }
  /**
   * Get unique entity names for filtering
   */
  getEntityNames() {
    return [
      "User",
      "Employee",
      "Shift",
      "ShiftAssignment",
      "VacationType",
      "VacationRequest",
      "Branch",
      "Department",
      "AttendanceRecord",
      "PublicHoliday",
      "ExcusePolicy",
      "OvertimeConfiguration",
      "Settings"
    ];
  }
  /**
   * Get available audit actions for filtering
   */
  getAuditActions() {
    return [
      // Authentication & Authorization
      { value: "Login", label: "Login" },
      { value: "Logout", label: "Logout" },
      { value: "LogoutAllDevices", label: "Logout All Devices" },
      { value: "TokenRefresh", label: "Token Refresh" },
      { value: "PasswordChange", label: "Password Change" },
      { value: "PasswordReset", label: "Password Reset" },
      { value: "PasswordResetRequest", label: "Password Reset Request" },
      { value: "AccountLockout", label: "Account Lockout" },
      { value: "AccountUnlock", label: "Account Unlock" },
      { value: "TwoFactorEnabled", label: "Two-Factor Enabled" },
      { value: "TwoFactorDisabled", label: "Two-Factor Disabled" },
      { value: "TwoFactorVerified", label: "Two-Factor Verified" },
      { value: "SessionCreated", label: "Session Created" },
      { value: "SessionTerminated", label: "Session Terminated" },
      { value: "SessionExpired", label: "Session Expired" },
      // User Management
      { value: "UserCreated", label: "User Created" },
      { value: "UserUpdated", label: "User Updated" },
      { value: "UserDeleted", label: "User Deleted" },
      { value: "UserActivated", label: "User Activated" },
      { value: "UserDeactivated", label: "User Deactivated" },
      { value: "UserRoleAssigned", label: "User Role Assigned" },
      { value: "UserRoleRevoked", label: "User Role Revoked" },
      { value: "UserBranchScopeAssigned", label: "User Branch Scope Assigned" },
      { value: "UserBranchScopeRevoked", label: "User Branch Scope Revoked" },
      // Employee Management
      { value: "EmployeeCreated", label: "Employee Created" },
      { value: "EmployeeUpdated", label: "Employee Updated" },
      { value: "EmployeeDeleted", label: "Employee Deleted" },
      { value: "EmployeeActivated", label: "Employee Activated" },
      { value: "EmployeeDeactivated", label: "Employee Deactivated" },
      // Shift Management
      { value: "ShiftCreated", label: "Shift Created" },
      { value: "ShiftUpdated", label: "Shift Updated" },
      { value: "ShiftDeleted", label: "Shift Deleted" },
      // Shift Assignment Management
      { value: "ShiftAssignmentCreated", label: "Shift Assignment Created" },
      { value: "ShiftAssignmentUpdated", label: "Shift Assignment Updated" },
      { value: "ShiftAssignmentDeleted", label: "Shift Assignment Deleted" },
      { value: "ShiftAssignmentActivated", label: "Shift Assignment Activated" },
      { value: "ShiftAssignmentDeactivated", label: "Shift Assignment Deactivated" },
      // Vacation Management
      { value: "VacationTypeCreated", label: "Vacation Type Created" },
      { value: "VacationTypeUpdated", label: "Vacation Type Updated" },
      { value: "VacationTypeDeleted", label: "Vacation Type Deleted" },
      { value: "VacationRequestCreated", label: "Vacation Request Created" },
      { value: "VacationRequestUpdated", label: "Vacation Request Updated" },
      { value: "VacationRequestApproved", label: "Vacation Request Approved" },
      { value: "VacationRequestRejected", label: "Vacation Request Rejected" },
      { value: "VacationRequestCancelled", label: "Vacation Request Cancelled" },
      // System Actions
      { value: "SystemStartup", label: "System Startup" },
      { value: "SystemShutdown", label: "System Shutdown" },
      { value: "DatabaseMigration", label: "Database Migration" },
      // Generic CRUD Operations
      { value: "Created", label: "Created" },
      { value: "Updated", label: "Updated" },
      { value: "Deleted", label: "Deleted" },
      { value: "Viewed", label: "Viewed" }
    ];
  }
};
__name(_AuditLogsService, "AuditLogsService");
__publicField(_AuditLogsService, "\u0275fac", /* @__PURE__ */ __name(function AuditLogsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuditLogsService)();
}, "AuditLogsService_Factory"));
__publicField(_AuditLogsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuditLogsService, factory: _AuditLogsService.\u0275fac, providedIn: "root" }));
var AuditLogsService = _AuditLogsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuditLogsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/pages/reports/audit-logs/audit-log-detail-modal/audit-log-detail-modal.component.ts
function AuditLogDetailModalComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "h6", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 7)(4, "div", 8)(5, "pre", 9)(6, "code");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("audit_logs.payload"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formattedPayload());
  }
}
__name(AuditLogDetailModalComponent_Conditional_14_Template, "AuditLogDetailModalComponent_Conditional_14_Template");
var _AuditLogDetailModalComponent = class _AuditLogDetailModalComponent {
  i18n = inject(I18nService);
  // Inputs
  auditLog = input.required(...ngDevMode ? [{ debugName: "auditLog" }] : []);
  show = input.required(...ngDevMode ? [{ debugName: "show" }] : []);
  // Outputs
  showChange = output();
  // Computed properties for definition lists
  basicInfo = computed(() => {
    const log = this.auditLog();
    return [
      {
        label: this.i18n.t("audit_logs.action"),
        value: log.actionDisplayName
      },
      {
        label: this.i18n.t("audit_logs.entity"),
        value: `${log.entityName} (ID: ${log.entityId})`
      },
      {
        label: this.i18n.t("audit_logs.timestamp"),
        value: this.formatDateTime(log.createdAtUtc)
      }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfo" }] : []);
  actorInfo = computed(() => {
    const log = this.auditLog();
    if (!log.actorUserId) {
      return [
        {
          label: this.i18n.t("audit_logs.actor"),
          value: "System"
        }
      ];
    }
    return [
      {
        label: this.i18n.t("audit_logs.actor_id"),
        value: log.actorUserId?.toString() || "-"
      },
      {
        label: this.i18n.t("audit_logs.actor_username"),
        value: log.actorUsername || "-"
      },
      {
        label: this.i18n.t("audit_logs.actor_email"),
        value: log.actorEmail || "-"
      }
    ];
  }, ...ngDevMode ? [{ debugName: "actorInfo" }] : []);
  technicalInfo = computed(() => {
    const log = this.auditLog();
    return [
      {
        label: this.i18n.t("audit_logs.ip_address"),
        value: log.ipAddress || "-"
      },
      {
        label: this.i18n.t("audit_logs.user_agent"),
        value: log.userAgent || "-"
      },
      {
        label: this.i18n.t("audit_logs.created_by"),
        value: log.createdBy
      }
    ];
  }, ...ngDevMode ? [{ debugName: "technicalInfo" }] : []);
  // Check if payload is valid JSON
  hasPayload = computed(() => {
    const log = this.auditLog();
    return !!log.payloadJson && log.payloadJson.trim() !== "";
  }, ...ngDevMode ? [{ debugName: "hasPayload" }] : []);
  // Format payload JSON for display
  formattedPayload = computed(() => {
    const log = this.auditLog();
    if (!log.payloadJson)
      return "";
    try {
      const parsed = JSON.parse(log.payloadJson);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return log.payloadJson;
    }
  }, ...ngDevMode ? [{ debugName: "formattedPayload" }] : []);
  /**
   * Close the modal
   */
  onClose() {
    this.showChange.emit(false);
  }
  /**
   * Format date time
   */
  formatDateTime(date) {
    if (!date)
      return "-";
    const d = new Date(date);
    return d.toLocaleString();
  }
};
__name(_AuditLogDetailModalComponent, "AuditLogDetailModalComponent");
__publicField(_AuditLogDetailModalComponent, "\u0275fac", /* @__PURE__ */ __name(function AuditLogDetailModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuditLogDetailModalComponent)();
}, "AuditLogDetailModalComponent_Factory"));
__publicField(_AuditLogDetailModalComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuditLogDetailModalComponent, selectors: [["app-audit-log-detail-modal"]], inputs: { auditLog: [1, "auditLog"], show: [1, "show"] }, outputs: { showChange: "showChange" }, decls: 18, vars: 17, consts: [[3, "close", "show", "title", "size"], [1, "modal-body"], [1, "mb-4"], [1, "text-uppercase", "text-muted", "mb-3"], [3, "items", "labelWidth", "valueWidth"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "card", "bg-light"], [1, "card-body"], [1, "mb-0", 2, "max-height", "300px", "overflow-y", "auto"]], template: /* @__PURE__ */ __name(function AuditLogDetailModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-modal-wrapper", 0);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function AuditLogDetailModalComponent_Template_app_modal_wrapper_close_0_listener() {
      return ctx.onClose();
    }, "AuditLogDetailModalComponent_Template_app_modal_wrapper_close_0_listener"));
    \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "h6", 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "app-definition-list", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 2)(7, "h6", 3);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "app-definition-list", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 2)(11, "h6", 3);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "app-definition-list", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, AuditLogDetailModalComponent_Conditional_14_Template, 8, 2, "div", 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 5)(16, "button", 6);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AuditLogDetailModalComponent_Template_button_click_16_listener() {
      return ctx.onClose();
    }, "AuditLogDetailModalComponent_Template_button_click_16_listener"));
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("show", ctx.show())("title", ctx.i18n.t("audit_logs.detail_title"))("size", "lg");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("audit_logs.basic_information"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx.basicInfo())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("audit_logs.actor_information"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx.actorInfo())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("audit_logs.technical_information"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx.technicalInfo())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasPayload() ? 14 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.close"), " ");
  }
}, "AuditLogDetailModalComponent_Template"), dependencies: [
  ModalWrapperComponent,
  DefinitionListComponent
], styles: ["\n\npre[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\ncode[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=audit-log-detail-modal.component.css.map */"] }));
var AuditLogDetailModalComponent = _AuditLogDetailModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuditLogDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-audit-log-detail-modal", standalone: true, imports: [
      ModalWrapperComponent,
      DefinitionListComponent
    ], template: `<app-modal-wrapper\r
  [show]="show()"\r
  [title]="i18n.t('audit_logs.detail_title')"\r
  [size]="'lg'"\r
  (close)="onClose()">\r
\r
  <div class="modal-body">\r
    <!-- Basic Information -->\r
    <div class="mb-4">\r
      <h6 class="text-uppercase text-muted mb-3">{{ i18n.t('audit_logs.basic_information') }}</h6>\r
      <app-definition-list\r
        [items]="basicInfo()"\r
        [labelWidth]="'4'"\r
        [valueWidth]="'8'">\r
      </app-definition-list>\r
    </div>\r
\r
    <!-- Actor Information -->\r
    <div class="mb-4">\r
      <h6 class="text-uppercase text-muted mb-3">{{ i18n.t('audit_logs.actor_information') }}</h6>\r
      <app-definition-list\r
        [items]="actorInfo()"\r
        [labelWidth]="'4'"\r
        [valueWidth]="'8'">\r
      </app-definition-list>\r
    </div>\r
\r
    <!-- Technical Information -->\r
    <div class="mb-4">\r
      <h6 class="text-uppercase text-muted mb-3">{{ i18n.t('audit_logs.technical_information') }}</h6>\r
      <app-definition-list\r
        [items]="technicalInfo()"\r
        [labelWidth]="'4'"\r
        [valueWidth]="'8'">\r
      </app-definition-list>\r
    </div>\r
\r
    <!-- Payload Information -->\r
    @if (hasPayload()) {\r
      <div class="mb-4">\r
        <h6 class="text-uppercase text-muted mb-3">{{ i18n.t('audit_logs.payload') }}</h6>\r
        <div class="card bg-light">\r
          <div class="card-body">\r
            <pre class="mb-0" style="max-height: 300px; overflow-y: auto;"><code>{{ formattedPayload() }}</code></pre>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
\r
  <div class="modal-footer">\r
    <button type="button" class="btn btn-secondary" (click)="onClose()">\r
      {{ i18n.t('common.close') }}\r
    </button>\r
  </div>\r
</app-modal-wrapper>\r
`, styles: ["/* src/app/pages/reports/audit-logs/audit-log-detail-modal/audit-log-detail-modal.component.css */\npre {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\ncode {\n  color: #333;\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=audit-log-detail-modal.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuditLogDetailModalComponent, { className: "AuditLogDetailModalComponent", filePath: "src/app/pages/reports/audit-logs/audit-log-detail-modal/audit-log-detail-modal.component.ts", lineNumber: 18 });
})();

// src/app/pages/reports/audit-logs/audit-logs.component.ts
function AuditLogsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-audit-log-detail-modal", 5);
    \u0275\u0275listener("showChange", /* @__PURE__ */ __name(function AuditLogsComponent_Conditional_4_Template_app_audit_log_detail_modal_showChange_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCloseDetailModal());
    }, "AuditLogsComponent_Conditional_4_Template_app_audit_log_detail_modal_showChange_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("auditLog", ctx_r1.selectedAuditLog())("show", ctx_r1.showDetailModal());
  }
}
__name(AuditLogsComponent_Conditional_4_Template, "AuditLogsComponent_Conditional_4_Template");
var _AuditLogsComponent = class _AuditLogsComponent {
  auditLogsService = inject(AuditLogsService);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  // State signals
  auditLogs = signal([], ...ngDevMode ? [{ debugName: "auditLogs" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Pagination
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(20, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalItems = signal(0, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Filtering
  filters = signal({}, ...ngDevMode ? [{ debugName: "filters" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  // Sorting
  sortBy = signal("createdAtUtc", ...ngDevMode ? [{ debugName: "sortBy" }] : []);
  sortDirection = signal("desc", ...ngDevMode ? [{ debugName: "sortDirection" }] : []);
  // Detail modal
  selectedAuditLog = signal(null, ...ngDevMode ? [{ debugName: "selectedAuditLog" }] : []);
  showDetailModal = signal(false, ...ngDevMode ? [{ debugName: "showDetailModal" }] : []);
  // Table configuration
  tableColumns = computed(() => [
    {
      key: "actorInfo",
      label: this.i18n.t("audit_logs.actor"),
      sortable: false,
      width: "18%",
      priority: "high",
      renderHtml: true
    },
    {
      key: "actionDisplayName",
      label: this.i18n.t("audit_logs.action"),
      sortable: true,
      width: "15%",
      priority: "high"
    },
    {
      key: "entityInfo",
      label: this.i18n.t("audit_logs.entity"),
      sortable: false,
      width: "15%",
      priority: "medium",
      renderHtml: true
    },
    {
      key: "ipAddress",
      label: this.i18n.t("audit_logs.ip_address"),
      sortable: true,
      width: "12%",
      priority: "medium"
    },
    {
      key: "timestamp",
      label: this.i18n.t("audit_logs.timestamp"),
      sortable: true,
      width: "15%",
      priority: "high"
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "view",
      label: this.i18n.t("common.view_details"),
      icon: "fa-eye",
      color: "primary"
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform audit logs data for data table
  tableData = computed(() => {
    const logs = this.auditLogs();
    if (!Array.isArray(logs)) {
      return [];
    }
    return logs.map((log) => __spreadProps(__spreadValues({}, log), {
      actorInfo: this.formatActor(log),
      entityInfo: this.formatEntity(log),
      timestamp: this.formatDateTime(log.createdAtUtc)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  ngOnInit() {
    this.loadAuditLogs();
  }
  /**
   * Load audit logs with current filters
   */
  loadAuditLogs() {
    this.loading.set(true);
    this.error.set(null);
    const filters = __spreadProps(__spreadValues({}, this.filters()), {
      searchTerm: this.searchTerm() || void 0,
      pageNumber: this.currentPage(),
      pageSize: this.pageSize(),
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection()
    });
    this.auditLogsService.getAuditLogs(filters).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.auditLogs.set(response.auditLogs);
        this.totalItems.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load audit logs:", error);
        this.error.set(this.i18n.t("audit_logs.errors.load_failed"));
        this.notificationService.error(this.i18n.t("audit_logs.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  /**
   * Handle search term changes
   */
  onSearchChange(searchTerm) {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
    this.loadAuditLogs();
  }
  /**
   * Handle filter changes
   */
  onFiltersChange(filters) {
    const auditFilters = {};
    if (filters.startDate) {
      auditFilters.startDate = filters.startDate;
    }
    if (filters.endDate) {
      auditFilters.endDate = filters.endDate;
    }
    if (filters.actions && filters.actions.length > 0) {
      auditFilters.actions = filters.actions;
    }
    if (filters.entityName) {
      auditFilters.entityName = filters.entityName;
    }
    if (filters.actorUserId) {
      auditFilters.actorUserId = filters.actorUserId;
    }
    this.filters.set(auditFilters);
    this.currentPage.set(1);
    this.loadAuditLogs();
  }
  /**
   * Handle pagination changes
   */
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadAuditLogs();
  }
  /**
   * Handle page size changes
   */
  onPageSizeChange(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadAuditLogs();
  }
  /**
   * Handle sorting changes
   */
  onSortChange(event) {
    this.sortBy.set(event.column);
    this.sortDirection.set(event.direction);
    this.loadAuditLogs();
  }
  /**
   * Handle table actions
   */
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onViewDetails(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  /**
   * View audit log details
   */
  onViewDetails(auditLog) {
    this.selectedAuditLog.set(auditLog);
    this.showDetailModal.set(true);
  }
  /**
   * Close detail modal
   */
  onCloseDetailModal() {
    this.showDetailModal.set(false);
    this.selectedAuditLog.set(null);
  }
  /**
   * Refresh audit logs list
   */
  onRefresh() {
    this.loadAuditLogs();
  }
  // Formatting methods
  formatActor(log) {
    if (!log.actorUserId) {
      return `<div class="text-muted"><i class="fas fa-robot me-1"></i>System</div>`;
    }
    const username = log.actorUsername || "Unknown User";
    const email = log.actorEmail || "";
    return `
      <div>
        <div class="fw-medium">${username}</div>
        ${email ? `<small class="text-muted">${email}</small>` : ""}
      </div>
    `;
  }
  formatEntity(log) {
    return `
      <div>
        <div class="fw-medium">${log.entityName}</div>
        <small class="text-muted font-monospace">${log.entityId}</small>
      </div>
    `;
  }
  formatDateTime(date) {
    if (!date)
      return "-";
    const d = new Date(date);
    return d.toLocaleString();
  }
};
__name(_AuditLogsComponent, "AuditLogsComponent");
__publicField(_AuditLogsComponent, "\u0275fac", /* @__PURE__ */ __name(function AuditLogsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuditLogsComponent)();
}, "AuditLogsComponent_Factory"));
__publicField(_AuditLogsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuditLogsComponent, selectors: [["app-audit-logs"]], decls: 5, vars: 14, consts: [[1, "app-list-page"], [3, "title"], [3, "searchChange", "refresh", "searchPlaceholder", "showAddButton", "showRefreshButton"], [3, "pageChange", "pageSizeChange", "sortChange", "actionClick", "columns", "data", "actions", "loading", "currentPage", "pageSize", "totalItems", "totalPages", "showPagination"], [3, "auditLog", "show"], [3, "showChange", "auditLog", "show"]], template: /* @__PURE__ */ __name(function AuditLogsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function AuditLogsComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchChange($event);
    }, "AuditLogsComponent_Template_app_unified_filter_searchChange_2_listener"))("refresh", /* @__PURE__ */ __name(function AuditLogsComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefresh();
    }, "AuditLogsComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-data-table", 3);
    \u0275\u0275listener("pageChange", /* @__PURE__ */ __name(function AuditLogsComponent_Template_app_data_table_pageChange_3_listener($event) {
      return ctx.onPageChange($event);
    }, "AuditLogsComponent_Template_app_data_table_pageChange_3_listener"))("pageSizeChange", /* @__PURE__ */ __name(function AuditLogsComponent_Template_app_data_table_pageSizeChange_3_listener($event) {
      return ctx.onPageSizeChange($event);
    }, "AuditLogsComponent_Template_app_data_table_pageSizeChange_3_listener"))("sortChange", /* @__PURE__ */ __name(function AuditLogsComponent_Template_app_data_table_sortChange_3_listener($event) {
      return ctx.onSortChange($event);
    }, "AuditLogsComponent_Template_app_data_table_sortChange_3_listener"))("actionClick", /* @__PURE__ */ __name(function AuditLogsComponent_Template_app_data_table_actionClick_3_listener($event) {
      return ctx.onActionClick($event);
    }, "AuditLogsComponent_Template_app_data_table_actionClick_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, AuditLogsComponent_Conditional_4_Template, 1, 2, "app-audit-log-detail-modal", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("audit_logs.title"));
    \u0275\u0275advance();
    \u0275\u0275property("searchPlaceholder", ctx.i18n.t("audit_logs.search_placeholder"))("showAddButton", false)("showRefreshButton", true);
    \u0275\u0275advance();
    \u0275\u0275property("columns", ctx.tableColumns())("data", ctx.tableData())("actions", ctx.tableActions())("loading", ctx.loading())("currentPage", ctx.currentPage())("pageSize", ctx.pageSize())("totalItems", ctx.totalItems())("totalPages", ctx.totalPages())("showPagination", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.selectedAuditLog() ? 4 : -1);
  }
}, "AuditLogsComponent_Template"), dependencies: [
  PageHeaderComponent,
  UnifiedFilterComponent,
  DataTableComponent,
  AuditLogDetailModalComponent
], styles: ["\n\n.app-list-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n/*# sourceMappingURL=audit-logs.component.css.map */"] }));
var AuditLogsComponent = _AuditLogsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuditLogsComponent, [{
    type: Component,
    args: [{ selector: "app-audit-logs", standalone: true, imports: [
      PageHeaderComponent,
      UnifiedFilterComponent,
      DataTableComponent,
      AuditLogDetailModalComponent
    ], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header [title]="i18n.t('audit_logs.title')"></app-page-header>\r
\r
  <!-- Unified Filter -->\r
  <app-unified-filter\r
    [searchPlaceholder]="i18n.t('audit_logs.search_placeholder')"\r
    [showAddButton]="false"\r
    [showRefreshButton]="true"\r
    (searchChange)="onSearchChange($event)"\r
    (refresh)="onRefresh()">\r
  </app-unified-filter>\r
\r
  <!-- Audit Logs Table -->\r
  <app-data-table\r
    [columns]="tableColumns()"\r
    [data]="tableData()"\r
    [actions]="tableActions()"\r
    [loading]="loading()"\r
    [currentPage]="currentPage()"\r
    [pageSize]="pageSize()"\r
    [totalItems]="totalItems()"\r
    [totalPages]="totalPages()"\r
    [showPagination]="true"\r
    (pageChange)="onPageChange($event)"\r
    (pageSizeChange)="onPageSizeChange($event)"\r
    (sortChange)="onSortChange($event)"\r
    (actionClick)="onActionClick($event)">\r
  </app-data-table>\r
\r
  <!-- Audit Log Detail Modal -->\r
  @if (selectedAuditLog()) {\r
    <app-audit-log-detail-modal\r
      [auditLog]="selectedAuditLog()!"\r
      [show]="showDetailModal()"\r
      (showChange)="onCloseDetailModal()">\r
    </app-audit-log-detail-modal>\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/reports/audit-logs/audit-logs.component.css */\n.app-list-page {\n  padding: 1.5rem;\n}\n/*# sourceMappingURL=audit-logs.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuditLogsComponent, { className: "AuditLogsComponent", filePath: "src/app/pages/reports/audit-logs/audit-logs.component.ts", lineNumber: 23 });
})();
export {
  AuditLogsComponent
};
//# sourceMappingURL=chunk-KIQNZZ5O.js.map
