import {
  DataTableComponent
} from "./chunk-JW5UYWPK.js";
import {
  UnifiedFilterComponent
} from "./chunk-QUWZJ3AA.js";
import "./chunk-NKWUQBPB.js";
import "./chunk-NHQ5PIWI.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-7XYWDBYG.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
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
  Injectable,
  computed,
  inject,
  map,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/reports/sessions/sessions.service.ts
var _SessionsService = class _SessionsService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/api/v1`;
  /**
   * Get all active sessions for the current user
   */
  getUserSessions() {
    return this.http.get(`${this.apiUrl}/sessions`).pipe(map((response) => response.sessions || []));
  }
  /**
   * Terminate a specific session
   */
  terminateSession(sessionId) {
    return this.http.delete(`${this.apiUrl}/sessions/${sessionId}`);
  }
  /**
   * Terminate all sessions except the current one
   */
  terminateAllOtherSessions() {
    return this.http.delete(`${this.apiUrl}/sessions/terminate-all`);
  }
};
__name(_SessionsService, "SessionsService");
__publicField(_SessionsService, "\u0275fac", /* @__PURE__ */ __name(function SessionsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SessionsService)();
}, "SessionsService_Factory"));
__publicField(_SessionsService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SessionsService, factory: _SessionsService.\u0275fac, providedIn: "root" }));
var SessionsService = _SessionsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SessionsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/pages/reports/sessions/sessions.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
var _SessionsComponent = class _SessionsComponent {
  sessionsService = inject(SessionsService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  // State signals
  sessions = signal([], ...ngDevMode ? [{ debugName: "sessions" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  // Table configuration
  tableColumns = computed(() => [
    {
      key: "user",
      label: this.i18n.t("sessions.user"),
      sortable: true,
      width: "20%",
      priority: "high",
      renderHtml: true
    },
    {
      key: "deviceInfo",
      label: this.i18n.t("sessions.device"),
      sortable: false,
      width: "20%",
      priority: "high",
      renderHtml: true
    },
    {
      key: "ipAddress",
      label: this.i18n.t("sessions.ip_address"),
      sortable: true,
      width: "12%",
      priority: "medium"
    },
    {
      key: "loginTime",
      label: this.i18n.t("sessions.login_time"),
      sortable: true,
      width: "15%",
      priority: "medium"
    },
    {
      key: "lastActivity",
      label: this.i18n.t("sessions.last_activity"),
      sortable: true,
      width: "15%",
      priority: "low"
    },
    {
      key: "status",
      label: this.i18n.t("sessions.status"),
      sortable: false,
      width: "10%",
      align: "center",
      priority: "high",
      renderHtml: true
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "terminate",
      label: this.i18n.t("sessions.terminate"),
      icon: "fa-power-off",
      color: "danger",
      condition: /* @__PURE__ */ __name((session) => !session.isCurrentSession, "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform sessions data for data table
  tableData = computed(() => {
    const sessionsArray = this.sessions();
    if (!Array.isArray(sessionsArray)) {
      return [];
    }
    const search = this.searchTerm().toLowerCase();
    const filtered = search ? sessionsArray.filter((session) => session.username?.toLowerCase().includes(search) || session.email?.toLowerCase().includes(search) || session.ipAddress?.toLowerCase().includes(search) || session.deviceName?.toLowerCase().includes(search) || session.browser?.toLowerCase().includes(search) || session.platform?.toLowerCase().includes(search)) : sessionsArray;
    return filtered.map((session) => __spreadProps(__spreadValues({}, session), {
      user: this.formatUser(session),
      deviceInfo: this.formatDevice(session),
      loginTime: this.formatDateTime(session.createdAtUtc),
      lastActivity: this.formatDateTime(session.lastAccessedAtUtc),
      status: this.formatStatus(session)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  ngOnInit() {
    this.loadSessions();
  }
  /**
   * Load all active sessions
   */
  loadSessions() {
    this.loading.set(true);
    this.error.set(null);
    this.sessionsService.getUserSessions().subscribe({
      next: /* @__PURE__ */ __name((sessions) => {
        this.sessions.set(sessions);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load sessions:", error);
        this.error.set(this.i18n.t("sessions.errors.load_failed"));
        this.notificationService.error(this.i18n.t("sessions.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  /**
   * Terminate a specific session
   */
  onTerminateSession(session) {
    if (session.isCurrentSession) {
      this.notificationService.warning(this.i18n.t("sessions.errors.cannot_terminate_current"));
      return;
    }
    this.confirmationService.confirm({
      title: this.i18n.t("sessions.terminate_session"),
      message: this.i18n.t("sessions.confirm_terminate").replace("{{device}}", session.deviceName || "Unknown Device"),
      confirmText: this.i18n.t("sessions.terminate"),
      cancelText: this.i18n.t("common.cancel"),
      confirmButtonClass: "btn-danger"
    }).then((result) => {
      if (result.confirmed) {
        this.sessionsService.terminateSession(session.sessionId).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("sessions.success.terminated"));
            this.loadSessions();
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to terminate session:", error);
            this.notificationService.error(this.i18n.t("sessions.errors.terminate_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Terminate all sessions except current
   */
  onTerminateAllOtherSessions() {
    this.confirmationService.confirm({
      title: this.i18n.t("sessions.terminate_all"),
      message: this.i18n.t("sessions.confirm_terminate_all"),
      confirmText: this.i18n.t("sessions.terminate_all"),
      cancelText: this.i18n.t("common.cancel"),
      confirmButtonClass: "btn-danger"
    }).then((result) => {
      if (result.confirmed) {
        this.sessionsService.terminateAllOtherSessions().subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("sessions.success.all_terminated"));
            this.loadSessions();
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to terminate all sessions:", error);
            this.notificationService.error(this.i18n.t("sessions.errors.terminate_all_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Handle table actions
   */
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "terminate":
        this.onTerminateSession(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  /**
   * Refresh sessions list
   */
  onRefresh() {
    this.loadSessions();
  }
  /**
   * Handle search term changes
   */
  onSearchChange(searchTerm) {
    this.searchTerm.set(searchTerm);
  }
  // Formatting methods
  formatUser(session) {
    return `
      <div>
        <div class="fw-medium">${session.username || "Unknown"}</div>
        <small class="text-muted">${session.email || "No email"}</small>
      </div>
    `;
  }
  formatDevice(session) {
    const platformStr = session.platform?.trim() || "Unknown";
    const browserStr = session.browser?.trim() || "Unknown";
    const deviceNameStr = session.deviceName?.trim() || `${browserStr} on ${platformStr}`;
    const isMobile = platformStr.toLowerCase().includes("mobile") || platformStr.toLowerCase().includes("android") || platformStr.toLowerCase().includes("ios");
    const deviceIcon = isMobile ? "fa-mobile-alt" : "fa-desktop";
    return `
      <div class="d-flex align-items-center">
        <i class="fas ${deviceIcon} me-2 text-primary"></i>
        <div>
          <div class="fw-medium">${deviceNameStr}</div>
          <small class="text-muted">${browserStr} on ${platformStr}</small>
        </div>
      </div>
    `;
  }
  formatDateTime(date) {
    if (!date)
      return "-";
    const d = new Date(date);
    return d.toLocaleString();
  }
  formatStatus(session) {
    if (session.isCurrentSession) {
      return `<span class="badge bg-success-subtle text-success">${this.i18n.t("sessions.current_session")}</span>`;
    }
    return `<span class="badge bg-info-subtle text-info">${this.i18n.t("sessions.active")}</span>`;
  }
};
__name(_SessionsComponent, "SessionsComponent");
__publicField(_SessionsComponent, "\u0275fac", /* @__PURE__ */ __name(function SessionsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SessionsComponent)();
}, "SessionsComponent_Factory"));
__publicField(_SessionsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SessionsComponent, selectors: [["app-sessions"]], decls: 8, vars: 15, consts: [[1, "app-list-page"], [3, "title"], [3, "searchChange", "refresh", "searchPlaceholder", "showAddButton", "refreshing"], [1, "mb-3"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-power-off", "me-2"], [3, "actionClick", "data", "columns", "actions", "loading", "emptyTitle", "emptyMessage", "responsiveMode"]], template: /* @__PURE__ */ __name(function SessionsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function SessionsComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchChange($event);
    }, "SessionsComponent_Template_app_unified_filter_searchChange_2_listener"))("refresh", /* @__PURE__ */ __name(function SessionsComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefresh();
    }, "SessionsComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "button", 4);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function SessionsComponent_Template_button_click_4_listener() {
      return ctx.onTerminateAllOtherSessions();
    }, "SessionsComponent_Template_button_click_4_listener"));
    \u0275\u0275element(5, "i", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "app-data-table", 6);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function SessionsComponent_Template_app_data_table_actionClick_7_listener($event) {
      return ctx.onActionClick($event);
    }, "SessionsComponent_Template_app_data_table_actionClick_7_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("sessions.title"));
    \u0275\u0275advance();
    \u0275\u0275property("searchPlaceholder", \u0275\u0275interpolate(ctx.i18n.t("sessions.search_placeholder")))("showAddButton", false)("refreshing", ctx.loading());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("sessions.terminate_all"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx.tableData() || \u0275\u0275pureFunction0(14, _c0))("columns", ctx.tableColumns())("actions", ctx.tableActions())("loading", ctx.loading)("emptyTitle", ctx.i18n.t("sessions.no_sessions"))("emptyMessage", ctx.i18n.t("sessions.no_sessions_message"))("responsiveMode", "auto");
  }
}, "SessionsComponent_Template"), dependencies: [
  PageHeaderComponent,
  DataTableComponent,
  UnifiedFilterComponent
], styles: ["\n\n.app-list-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: 0.25rem !important;\n  margin-left: 0.5rem;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child {\n  margin-left: 0;\n}\n/*# sourceMappingURL=sessions.component.css.map */"] }));
var SessionsComponent = _SessionsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SessionsComponent, [{
    type: Component,
    args: [{ selector: "app-sessions", standalone: true, imports: [
      PageHeaderComponent,
      DataTableComponent,
      UnifiedFilterComponent
    ], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header [title]="i18n.t('sessions.title')">\r
  </app-page-header>\r
\r
  <!-- Unified Filter -->\r
  <app-unified-filter\r
    searchPlaceholder="{{ i18n.t('sessions.search_placeholder') }}"\r
    [showAddButton]="false"\r
    [refreshing]="loading()"\r
    (searchChange)="onSearchChange($event)"\r
    (refresh)="onRefresh()">\r
  </app-unified-filter>\r
\r
  <!-- Terminate All Button -->\r
  <div class="mb-3">\r
    <button\r
      class="btn btn-outline-danger"\r
      type="button"\r
      [disabled]="loading()"\r
      (click)="onTerminateAllOtherSessions()">\r
      <i class="fas fa-power-off me-2"></i>\r
      {{ i18n.t('sessions.terminate_all') }}\r
    </button>\r
  </div>\r
\r
  <!-- Sessions Table -->\r
  <app-data-table\r
    [data]="tableData() || []"\r
    [columns]="tableColumns()"\r
    [actions]="tableActions()"\r
    [loading]="loading"\r
    [emptyTitle]="i18n.t('sessions.no_sessions')"\r
    [emptyMessage]="i18n.t('sessions.no_sessions_message')"\r
    [responsiveMode]="'auto'"\r
    (actionClick)="onActionClick($event)">\r
  </app-data-table>\r
</div>\r
`, styles: ["/* src/app/pages/reports/sessions/sessions.component.css */\n.app-list-page {\n  padding: 1.5rem;\n}\n.btn-group .btn {\n  border-radius: 0.25rem !important;\n  margin-left: 0.5rem;\n}\n.btn-group .btn:first-child {\n  margin-left: 0;\n}\n/*# sourceMappingURL=sessions.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SessionsComponent, { className: "SessionsComponent", filePath: "src/app/pages/reports/sessions/sessions.component.ts", lineNumber: 22 });
})();
export {
  SessionsComponent
};
//# sourceMappingURL=chunk-P2BRHKDB.js.map
