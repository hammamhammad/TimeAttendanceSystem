import {
  ApprovalsService
} from "./chunk-7LBZSVSK.js";
import {
  ModalWrapperComponent
} from "./chunk-3OFDLXN2.js";
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
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
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
  CommonModule,
  Component,
  NgClass,
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
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/approvals/pending-approvals/pending-approvals.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
function PendingApprovalsComponent_For_12_Template(rf, ctx) {
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
__name(PendingApprovalsComponent_For_12_Template, "PendingApprovalsComponent_For_12_Template");
function PendingApprovalsComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PendingApprovalsComponent_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onClearFilters());
    }, "PendingApprovalsComponent_Conditional_24_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("common.clear_filters"), " ");
  }
}
__name(PendingApprovalsComponent_Conditional_24_Template, "PendingApprovalsComponent_Conditional_24_Template");
function PendingApprovalsComponent_Conditional_54_Conditional_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 44)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.t("approvals.description"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedApproval().entityDescription, " ");
  }
}
__name(PendingApprovalsComponent_Conditional_54_Conditional_2_Conditional_11_Template, "PendingApprovalsComponent_Conditional_54_Conditional_2_Conditional_11_Template");
function PendingApprovalsComponent_Conditional_54_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "h6", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 43)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 43)(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, PendingApprovalsComponent_Conditional_54_Conditional_2_Conditional_11_Template, 4, 2, "p", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("approvals.request_summary"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.t("approvals.request_type"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedApproval().workflowDefinitionName, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.t("approvals.requested_by"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedApproval().requestedByName, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedApproval().entityDescription ? 11 : -1);
  }
}
__name(PendingApprovalsComponent_Conditional_54_Conditional_2_Template, "PendingApprovalsComponent_Conditional_54_Conditional_2_Template");
function PendingApprovalsComponent_Conditional_54_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
__name(PendingApprovalsComponent_Conditional_54_Conditional_6_Template, "PendingApprovalsComponent_Conditional_54_Conditional_6_Template");
function PendingApprovalsComponent_Conditional_54_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.t("approvals.comments_required_reject"));
  }
}
__name(PendingApprovalsComponent_Conditional_54_Conditional_9_Template, "PendingApprovalsComponent_Conditional_54_Conditional_9_Template");
function PendingApprovalsComponent_Conditional_54_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "label", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 35);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function PendingApprovalsComponent_Conditional_54_Conditional_10_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.delegateUserId, $event) || (ctx_r2.delegateUserId = $event);
      return \u0275\u0275resetView($event);
    }, "PendingApprovalsComponent_Conditional_54_Conditional_10_Template_input_ngModelChange_5_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 37);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("approvals.delegate_to"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", ctx_r2.t("approvals.enter_user_id"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.delegateUserId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t("approvals.delegate_user_hint"));
  }
}
__name(PendingApprovalsComponent_Conditional_54_Conditional_10_Template, "PendingApprovalsComponent_Conditional_54_Conditional_10_Template");
function PendingApprovalsComponent_Conditional_54_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 41);
  }
}
__name(PendingApprovalsComponent_Conditional_54_Conditional_15_Template, "PendingApprovalsComponent_Conditional_54_Conditional_15_Template");
function PendingApprovalsComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-modal-wrapper", 31);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function PendingApprovalsComponent_Conditional_54_Template_app_modal_wrapper_close_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeApprovalModal());
    }, "PendingApprovalsComponent_Conditional_54_Template_app_modal_wrapper_close_0_listener"));
    \u0275\u0275elementStart(1, "div", 32);
    \u0275\u0275conditionalCreate(2, PendingApprovalsComponent_Conditional_54_Conditional_2_Template, 12, 6, "div", 33);
    \u0275\u0275elementStart(3, "div", 34)(4, "label", 6);
    \u0275\u0275text(5);
    \u0275\u0275conditionalCreate(6, PendingApprovalsComponent_Conditional_54_Conditional_6_Template, 2, 0, "span", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "textarea", 36);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function PendingApprovalsComponent_Conditional_54_Template_textarea_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.comments, $event) || (ctx_r2.comments = $event);
      return \u0275\u0275resetView($event);
    }, "PendingApprovalsComponent_Conditional_54_Template_textarea_ngModelChange_7_listener"));
    \u0275\u0275text(8, "        ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, PendingApprovalsComponent_Conditional_54_Conditional_9_Template, 2, 1, "small", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, PendingApprovalsComponent_Conditional_54_Conditional_10_Template, 8, 4, "div", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 38)(12, "button", 39);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PendingApprovalsComponent_Conditional_54_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeApprovalModal());
    }, "PendingApprovalsComponent_Conditional_54_Template_button_click_12_listener"));
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 40);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PendingApprovalsComponent_Conditional_54_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submitApproval());
    }, "PendingApprovalsComponent_Conditional_54_Template_button_click_14_listener"));
    \u0275\u0275conditionalCreate(15, PendingApprovalsComponent_Conditional_54_Conditional_15_Template, 1, 0, "span", 41);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r2.getModalTitle())("show", ctx_r2.showApprovalModal());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selectedApproval() ? 2 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("approvals.comments"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.approvalAction() === "reject" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r2.t("approvals.comments_placeholder"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.comments);
    \u0275\u0275property("required", ctx_r2.approvalAction() === "reject");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.approvalAction() === "reject" ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.approvalAction() === "delegate" ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.processing());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.getSubmitButtonClass())("disabled", ctx_r2.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.processing() ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.t("approvals." + ctx_r2.approvalAction()), " ");
  }
}
__name(PendingApprovalsComponent_Conditional_54_Template, "PendingApprovalsComponent_Conditional_54_Template");
var _PendingApprovalsComponent = class _PendingApprovalsComponent {
  approvalsService = inject(ApprovalsService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  approvals = signal([], ...ngDevMode ? [{ debugName: "approvals" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Filter signals
  selectedEntityType = signal(void 0, ...ngDevMode ? [{ debugName: "selectedEntityType" }] : []);
  selectedOverdue = signal(void 0, ...ngDevMode ? [{ debugName: "selectedOverdue" }] : []);
  // Modal state
  showApprovalModal = signal(false, ...ngDevMode ? [{ debugName: "showApprovalModal" }] : []);
  selectedApproval = signal(null, ...ngDevMode ? [{ debugName: "selectedApproval" }] : []);
  approvalAction = signal("approve", ...ngDevMode ? [{ debugName: "approvalAction" }] : []);
  comments = signal("", ...ngDevMode ? [{ debugName: "comments" }] : []);
  delegateUserId = signal(void 0, ...ngDevMode ? [{ debugName: "delegateUserId" }] : []);
  processing = signal(false, ...ngDevMode ? [{ debugName: "processing" }] : []);
  // Entity types for filter dropdown
  // Entity types for filter dropdown
  entityTypes = computed(() => [
    { value: "Vacation", label: this.t("approvals.vacation_request") },
    { value: "Excuse", label: this.t("approvals.excuse_request") },
    { value: "RemoteWork", label: this.t("approvals.remote_work_request") },
    { value: "Overtime", label: this.t("approvals.overtime_request") },
    { value: "Timesheet", label: this.t("approvals.timesheet") },
    { value: "AttendanceCorrection", label: this.t("approvals.attendance_correction") }
  ], ...ngDevMode ? [{ debugName: "entityTypes" }] : []);
  // Data table configuration
  tableColumns = computed(() => [
    {
      key: "entityTypeDisplay",
      label: this.t("approvals.request_type"),
      sortable: false,
      width: "150px",
      priority: "high",
      mobileLabel: this.t("approvals.request_type"),
      renderHtml: true
    },
    {
      key: "requestedByName",
      label: this.t("approvals.requested_by"),
      sortable: true,
      width: "150px",
      priority: "high",
      mobileLabel: this.t("approvals.requested_by")
    },
    {
      key: "entityDescription",
      label: this.t("approvals.description"),
      sortable: false,
      width: "200px",
      priority: "medium",
      mobileLabel: this.t("approvals.description")
    },
    {
      key: "currentStepName",
      label: this.t("approvals.current_step"),
      sortable: false,
      width: "150px",
      priority: "medium",
      mobileLabel: this.t("approvals.current_step")
    },
    {
      key: "requestedAtDisplay",
      label: this.t("approvals.requested_at"),
      sortable: true,
      width: "150px",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("approvals.requested_at")
    },
    {
      key: "overdueStatus",
      label: this.t("approvals.status"),
      sortable: false,
      width: "100px",
      align: "center",
      priority: "high",
      mobileLabel: this.t("approvals.status"),
      renderHtml: true
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "approve",
      label: this.t("approvals.approve"),
      icon: "fa-check",
      color: "success",
      condition: /* @__PURE__ */ __name(() => true, "condition")
    },
    {
      key: "reject",
      label: this.t("approvals.reject"),
      icon: "fa-times",
      color: "danger",
      condition: /* @__PURE__ */ __name(() => true, "condition")
    },
    {
      key: "delegate",
      label: this.t("approvals.delegate"),
      icon: "fa-share",
      color: "info",
      condition: /* @__PURE__ */ __name((item) => item.allowDelegation, "condition")
    },
    {
      key: "view",
      label: this.t("common.view"),
      icon: "fa-eye",
      color: "primary",
      condition: /* @__PURE__ */ __name(() => true, "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform approvals data for data table
  tableData = computed(() => {
    return this.approvals().map((approval) => __spreadProps(__spreadValues({}, approval), {
      entityTypeDisplay: this.formatEntityType(approval.entityType),
      requestedAtDisplay: this.formatDate(approval.requestedAt),
      overdueStatus: this.formatOverdueStatus(approval)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  // Computed properties for summary counts
  overdueCount = computed(() => this.approvals().filter((a) => a.isOverdue).length, ...ngDevMode ? [{ debugName: "overdueCount" }] : []);
  onTimeCount = computed(() => this.approvals().filter((a) => !a.isOverdue).length, ...ngDevMode ? [{ debugName: "onTimeCount" }] : []);
  ngOnInit() {
    this.loadApprovals();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadApprovals() {
    this.loading.set(true);
    this.approvalsService.getPendingApprovals(this.currentPage(), this.pageSize(), this.selectedEntityType(), this.selectedOverdue()).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        if (response && response.items) {
          this.approvals.set(response.items);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
        } else {
          this.approvals.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load pending approvals:", error);
        this.loading.set(false);
        this.notificationService.error(this.t("app.error"), this.t("approvals.load_error"));
      }, "error")
    });
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  formatEntityType(entityType) {
    let key = "";
    switch (entityType) {
      case "Vacation":
        key = "vacation_request";
        break;
      case "Excuse":
        key = "excuse_request";
        break;
      case "RemoteWork":
        key = "remote_work_request";
        break;
      case "Overtime":
        key = "overtime_request";
        break;
      case "Timesheet":
        key = "timesheet";
        break;
      case "AttendanceCorrection":
        key = "attendance_correction";
        break;
      default:
        return entityType;
    }
    const displayName = this.t(`approvals.${key}`);
    return `<span class="badge bg-primary">${displayName}</span>`;
  }
  formatOverdueStatus(approval) {
    if (approval.isOverdue) {
      return `<span class="badge bg-danger">${this.t("approvals.overdue")}</span>`;
    }
    return `<span class="badge bg-warning text-dark">${this.t("approvals.pending")}</span>`;
  }
  // Data table action handler
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "approve":
        this.openApprovalModal(item, "approve");
        break;
      case "reject":
        this.openApprovalModal(item, "reject");
        break;
      case "delegate":
        this.openApprovalModal(item, "delegate");
        break;
      case "view":
        this.viewEntityDetails(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  openApprovalModal(approval, action) {
    this.selectedApproval.set(approval);
    this.approvalAction.set(action);
    this.comments.set("");
    this.delegateUserId.set(void 0);
    this.showApprovalModal.set(true);
  }
  closeApprovalModal() {
    this.showApprovalModal.set(false);
    this.selectedApproval.set(null);
    this.comments.set("");
    this.delegateUserId.set(void 0);
  }
  submitApproval() {
    return __async(this, null, function* () {
      const approval = this.selectedApproval();
      if (!approval)
        return;
      if (this.approvalAction() === "reject" && !this.comments().trim()) {
        this.notificationService.warning(this.t("app.warning"), this.t("approvals.comments_required_reject"));
        return;
      }
      if (this.approvalAction() === "delegate" && !this.delegateUserId()) {
        this.notificationService.warning(this.t("app.warning"), this.t("approvals.delegate_user_required"));
        return;
      }
      this.processing.set(true);
      try {
        switch (this.approvalAction()) {
          case "approve":
            yield this.approvalsService.approveStep(approval.workflowInstanceId, {
              comments: this.comments() || void 0
            }).toPromise();
            this.notificationService.success(this.t("app.success"), this.t("approvals.approve_success"));
            break;
          case "reject":
            yield this.approvalsService.rejectStep(approval.workflowInstanceId, {
              comments: this.comments()
            }).toPromise();
            this.notificationService.success(this.t("app.success"), this.t("approvals.reject_success"));
            break;
          case "delegate":
            yield this.approvalsService.delegateStep(approval.workflowInstanceId, {
              delegateToUserId: this.delegateUserId(),
              comments: this.comments() || void 0
            }).toPromise();
            this.notificationService.success(this.t("app.success"), this.t("approvals.delegate_success"));
            break;
        }
        this.closeApprovalModal();
        this.loadApprovals();
      } catch (error) {
        console.error("Failed to process approval:", error);
        this.notificationService.error(this.t("app.error"), this.t(`approvals.${this.approvalAction()}_error`));
      } finally {
        this.processing.set(false);
      }
    });
  }
  viewEntityDetails(approval) {
    const routes = {
      "Vacation": "/employee-vacations",
      "Excuse": "/employee-excuses",
      "RemoteWork": "/remote-work",
      "Overtime": "/overtime-requests",
      "Timesheet": "/timesheets",
      "AttendanceCorrection": "/attendance-corrections"
    };
    const basePath = routes[approval.entityType];
    if (basePath) {
      this.router.navigate([basePath, approval.entityId, "view"]);
    }
  }
  // Pagination handlers
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadApprovals();
  }
  onPageSizeChange(pageSize) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadApprovals();
  }
  // Filter handlers
  onEntityTypeChange(event) {
    const value = event.target.value;
    this.selectedEntityType.set(value ? value : void 0);
    this.currentPage.set(1);
    this.loadApprovals();
  }
  onOverdueChange(event) {
    const value = event.target.value;
    this.selectedOverdue.set(value === "true" ? true : value === "false" ? false : void 0);
    this.currentPage.set(1);
    this.loadApprovals();
  }
  onClearFilters() {
    this.selectedEntityType.set(void 0);
    this.selectedOverdue.set(void 0);
    this.currentPage.set(1);
    this.loadApprovals();
  }
  hasActiveFilters() {
    return !!(this.selectedEntityType() !== void 0 || this.selectedOverdue() !== void 0);
  }
  getModalTitle() {
    switch (this.approvalAction()) {
      case "approve":
        return this.t("approvals.approve_request");
      case "reject":
        return this.t("approvals.reject_request");
      case "delegate":
        return this.t("approvals.delegate_request");
      default:
        return "";
    }
  }
  getSubmitButtonClass() {
    switch (this.approvalAction()) {
      case "approve":
        return "btn-success";
      case "reject":
        return "btn-danger";
      case "delegate":
        return "btn-info";
      default:
        return "btn-primary";
    }
  }
};
__name(_PendingApprovalsComponent, "PendingApprovalsComponent");
__publicField(_PendingApprovalsComponent, "\u0275fac", /* @__PURE__ */ __name(function PendingApprovalsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PendingApprovalsComponent)();
}, "PendingApprovalsComponent_Factory"));
__publicField(_PendingApprovalsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PendingApprovalsComponent, selectors: [["app-pending-approvals"]], decls: 55, vars: 26, consts: [[1, "container-fluid", "py-4"], [3, "title"], [1, "card", "mb-4"], [1, "card-body"], [1, "row", "g-3", "align-items-end"], [1, "col-md-3"], [1, "form-label"], [1, "form-select", 3, "change", "value"], ["value", ""], [3, "value"], ["value", "true"], ["value", "false"], ["type", "button", 1, "btn", "btn-outline-secondary"], [1, "col-md-3", "text-end"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], [1, "fa-solid", "fa-refresh", "me-1"], [1, "row", "mb-4"], [1, "col-md-4"], [1, "card", "bg-warning", "bg-opacity-10", "border-warning"], [1, "card-body", "text-center"], [1, "text-warning", "mb-1"], [1, "text-muted", "mb-0"], [1, "card", "bg-danger", "bg-opacity-10", "border-danger"], [1, "text-danger", "mb-1"], [1, "card", "bg-info", "bg-opacity-10", "border-info"], [1, "text-info", "mb-1"], [1, "card"], [3, "pageChange", "pageSizeChange", "actionClick", "columns", "data", "loading", "totalItems", "currentPage", "pageSize", "actions", "emptyMessage"], [3, "title", "show"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fa-solid", "fa-times", "me-1"], [3, "close", "title", "show"], [1, "modal-body"], [1, "alert", "alert-info"], [1, "mb-3"], [1, "text-danger"], ["rows", "3", 1, "form-control", 3, "ngModelChange", "placeholder", "ngModel", "required"], [1, "text-muted"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", 3, "click", "ngClass", "disabled"], [1, "spinner-border", "spinner-border-sm", "me-1"], [1, "alert-heading"], [1, "mb-1"], [1, "mb-0"], ["type", "number", "required", "", 1, "form-control", 3, "ngModelChange", "placeholder", "ngModel"]], template: /* @__PURE__ */ __name(function PendingApprovalsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "label", 6);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 7);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function PendingApprovalsComponent_Template_select_change_8_listener($event) {
      return ctx.onEntityTypeChange($event);
    }, "PendingApprovalsComponent_Template_select_change_8_listener"));
    \u0275\u0275elementStart(9, "option", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(11, PendingApprovalsComponent_For_12_Template, 2, 2, "option", 9, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 5)(14, "label", 6);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 7);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function PendingApprovalsComponent_Template_select_change_16_listener($event) {
      return ctx.onOverdueChange($event);
    }, "PendingApprovalsComponent_Template_select_change_16_listener"));
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
    \u0275\u0275conditionalCreate(24, PendingApprovalsComponent_Conditional_24_Template, 3, 1, "button", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 13)(26, "button", 14);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PendingApprovalsComponent_Template_button_click_26_listener() {
      return ctx.loadApprovals();
    }, "PendingApprovalsComponent_Template_button_click_26_listener"));
    \u0275\u0275element(27, "i", 15);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(29, "div", 16)(30, "div", 17)(31, "div", 18)(32, "div", 19)(33, "h3", 20);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 21);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(37, "div", 17)(38, "div", 22)(39, "div", 19)(40, "h3", 23);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "p", 21);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(44, "div", 17)(45, "div", 24)(46, "div", 19)(47, "h3", 25);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "p", 21);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(51, "div", 26)(52, "div", 3)(53, "app-data-table", 27);
    \u0275\u0275listener("pageChange", /* @__PURE__ */ __name(function PendingApprovalsComponent_Template_app_data_table_pageChange_53_listener($event) {
      return ctx.onPageChange($event);
    }, "PendingApprovalsComponent_Template_app_data_table_pageChange_53_listener"))("pageSizeChange", /* @__PURE__ */ __name(function PendingApprovalsComponent_Template_app_data_table_pageSizeChange_53_listener($event) {
      return ctx.onPageSizeChange($event);
    }, "PendingApprovalsComponent_Template_app_data_table_pageSizeChange_53_listener"))("actionClick", /* @__PURE__ */ __name(function PendingApprovalsComponent_Template_app_data_table_actionClick_53_listener($event) {
      return ctx.onActionClick($event);
    }, "PendingApprovalsComponent_Template_app_data_table_actionClick_53_listener"));
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(54, PendingApprovalsComponent_Conditional_54_Template, 17, 16, "app-modal-wrapper", 28);
  }
  if (rf & 2) {
    let tmp_6_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("approvals.pending_title"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.t("approvals.request_type"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx.selectedEntityType() || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.all"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.entityTypes());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("approvals.status"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx.selectedOverdue() === void 0 ? "" : (tmp_6_0 = ctx.selectedOverdue()) == null ? null : tmp_6_0.toString());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.all"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("approvals.overdue_only"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("approvals.on_time"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.hasActiveFilters() ? 24 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.refresh"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.totalCount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("approvals.total_pending"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.overdueCount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("approvals.overdue_count"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.onTimeCount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("approvals.on_time_count"));
    \u0275\u0275advance(3);
    \u0275\u0275property("columns", ctx.tableColumns())("data", ctx.tableData())("loading", ctx.loading())("totalItems", ctx.totalCount())("currentPage", ctx.currentPage())("pageSize", ctx.pageSize())("actions", ctx.tableActions())("emptyMessage", ctx.t("approvals.no_pending_approvals"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showApprovalModal() ? 54 : -1);
  }
}, "PendingApprovalsComponent_Template"), dependencies: [
  CommonModule,
  NgClass,
  FormsModule,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DefaultValueAccessor,
  NumberValueAccessor,
  NgControlStatus,
  RequiredValidator,
  NgModel,
  DataTableComponent,
  PageHeaderComponent,
  ModalWrapperComponent
], styles: ["\n\n.badge[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.card.bg-warning.bg-opacity-10[_ngcontent-%COMP%], \n.card.bg-danger.bg-opacity-10[_ngcontent-%COMP%], \n.card.bg-info.bg-opacity-10[_ngcontent-%COMP%] {\n  border-width: 2px;\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 600;\n}\n.card[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.modal-body[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  margin-bottom: 0.75rem;\n}\n@media (max-width: 768px) {\n  .row.g-3[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n  .card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=pending-approvals.component.css.map */"] }));
var PendingApprovalsComponent = _PendingApprovalsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PendingApprovalsComponent, [{
    type: Component,
    args: [{ selector: "app-pending-approvals", standalone: true, imports: [
      CommonModule,
      FormsModule,
      DataTableComponent,
      PageHeaderComponent,
      ModalWrapperComponent
    ], template: `<div class="container-fluid py-4">\r
  <!-- Page Header -->\r
  <app-page-header [title]="t('approvals.pending_title')">\r
  </app-page-header>\r
\r
  <!-- Filters -->\r
  <div class="card mb-4">\r
    <div class="card-body">\r
      <div class="row g-3 align-items-end">\r
        <!-- Entity Type Filter -->\r
        <div class="col-md-3">\r
          <label class="form-label">{{ t('approvals.request_type') }}</label>\r
          <select class="form-select" [value]="selectedEntityType() || ''" (change)="onEntityTypeChange($event)">\r
            <option value="">{{ t('common.all') }}</option>\r
            @for (type of entityTypes(); track type.value) {\r
            <option [value]="type.value">{{ type.label }}</option>\r
            }\r
          </select>\r
        </div>\r
\r
        <!-- Overdue Filter -->\r
        <div class="col-md-3">\r
          <label class="form-label">{{ t('approvals.status') }}</label>\r
          <select class="form-select" [value]="selectedOverdue() === undefined ? '' : selectedOverdue()?.toString()"\r
            (change)="onOverdueChange($event)">\r
            <option value="">{{ t('common.all') }}</option>\r
            <option value="true">{{ t('approvals.overdue_only') }}</option>\r
            <option value="false">{{ t('approvals.on_time') }}</option>\r
          </select>\r
        </div>\r
\r
        <!-- Clear Filters -->\r
        <div class="col-md-3">\r
          @if (hasActiveFilters()) {\r
          <button type="button" class="btn btn-outline-secondary" (click)="onClearFilters()">\r
            <i class="fa-solid fa-times me-1"></i>\r
            {{ t('common.clear_filters') }}\r
          </button>\r
          }\r
        </div>\r
\r
        <!-- Refresh -->\r
        <div class="col-md-3 text-end">\r
          <button type="button" class="btn btn-outline-primary" (click)="loadApprovals()">\r
            <i class="fa-solid fa-refresh me-1"></i>\r
            {{ t('common.refresh') }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Summary Cards -->\r
  <div class="row mb-4">\r
    <div class="col-md-4">\r
      <div class="card bg-warning bg-opacity-10 border-warning">\r
        <div class="card-body text-center">\r
          <h3 class="text-warning mb-1">{{ totalCount() }}</h3>\r
          <p class="text-muted mb-0">{{ t('approvals.total_pending') }}</p>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-md-4">\r
      <div class="card bg-danger bg-opacity-10 border-danger">\r
        <div class="card-body text-center">\r
          <h3 class="text-danger mb-1">{{ overdueCount() }}</h3>\r
          <p class="text-muted mb-0">{{ t('approvals.overdue_count') }}</p>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-md-4">\r
      <div class="card bg-info bg-opacity-10 border-info">\r
        <div class="card-body text-center">\r
          <h3 class="text-info mb-1">{{ onTimeCount() }}</h3>\r
          <p class="text-muted mb-0">{{ t('approvals.on_time_count') }}</p>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Data Table -->\r
  <div class="card">\r
    <div class="card-body">\r
      <app-data-table [columns]="tableColumns()" [data]="tableData()" [loading]="loading()" [totalItems]="totalCount()"\r
        [currentPage]="currentPage()" [pageSize]="pageSize()" [actions]="tableActions()"\r
        [emptyMessage]="t('approvals.no_pending_approvals')" (pageChange)="onPageChange($event)"\r
        (pageSizeChange)="onPageSizeChange($event)" (actionClick)="onActionClick($event)">\r
      </app-data-table>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Approval Action Modal -->\r
@if (showApprovalModal()) {\r
<app-modal-wrapper [title]="getModalTitle()" [show]="showApprovalModal()" (close)="closeApprovalModal()">\r
  <div class="modal-body">\r
    <!-- Request Summary -->\r
    @if (selectedApproval()) {\r
    <div class="alert alert-info">\r
      <h6 class="alert-heading">{{ t('approvals.request_summary') }}</h6>\r
      <p class="mb-1">\r
        <strong>{{ t('approvals.request_type') }}:</strong>\r
        {{ selectedApproval()!.workflowDefinitionName }}\r
      </p>\r
      <p class="mb-1">\r
        <strong>{{ t('approvals.requested_by') }}:</strong>\r
        {{ selectedApproval()!.requestedByName }}\r
      </p>\r
      @if (selectedApproval()!.entityDescription) {\r
      <p class="mb-0">\r
        <strong>{{ t('approvals.description') }}:</strong>\r
        {{ selectedApproval()!.entityDescription }}\r
      </p>\r
      }\r
    </div>\r
    }\r
\r
    <!-- Comments -->\r
    <div class="mb-3">\r
      <label class="form-label">\r
        {{ t('approvals.comments') }}\r
        @if (approvalAction() === 'reject') {\r
        <span class="text-danger">*</span>\r
        }\r
      </label>\r
      <textarea class="form-control" rows="3" [placeholder]="t('approvals.comments_placeholder')" [(ngModel)]="comments"\r
        [required]="approvalAction() === 'reject'">\r
        </textarea>\r
      @if (approvalAction() === 'reject') {\r
      <small class="text-muted">{{ t('approvals.comments_required_reject') }}</small>\r
      }\r
    </div>\r
\r
    <!-- Delegate User Selection (only for delegate action) -->\r
    @if (approvalAction() === 'delegate') {\r
    <div class="mb-3">\r
      <label class="form-label">\r
        {{ t('approvals.delegate_to') }}\r
        <span class="text-danger">*</span>\r
      </label>\r
      <input type="number" class="form-control" [placeholder]="t('approvals.enter_user_id')"\r
        [(ngModel)]="delegateUserId" required>\r
      <small class="text-muted">{{ t('approvals.delegate_user_hint') }}</small>\r
    </div>\r
    }\r
  </div>\r
\r
  <div class="modal-footer">\r
    <button type="button" class="btn btn-secondary" (click)="closeApprovalModal()" [disabled]="processing()">\r
      {{ t('common.cancel') }}\r
    </button>\r
    <button type="button" class="btn" [ngClass]="getSubmitButtonClass()" (click)="submitApproval()"\r
      [disabled]="processing()">\r
      @if (processing()) {\r
      <span class="spinner-border spinner-border-sm me-1"></span>\r
      }\r
      {{ t('approvals.' + approvalAction()) }}\r
    </button>\r
  </div>\r
</app-modal-wrapper>\r
}`, styles: ["/* src/app/pages/approvals/pending-approvals/pending-approvals.component.css */\n.badge {\n  font-weight: 500;\n}\n.card.bg-warning.bg-opacity-10,\n.card.bg-danger.bg-opacity-10,\n.card.bg-info.bg-opacity-10 {\n  border-width: 2px;\n}\n.card h3 {\n  font-size: 2rem;\n  font-weight: 600;\n}\n.card .form-label {\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n.modal-body .alert {\n  margin-bottom: 1rem;\n}\n.modal-body .alert h6 {\n  margin-bottom: 0.75rem;\n}\n@media (max-width: 768px) {\n  .row.g-3 > div {\n    margin-bottom: 0.5rem;\n  }\n  .card h3 {\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=pending-approvals.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PendingApprovalsComponent, { className: "PendingApprovalsComponent", filePath: "src/app/pages/approvals/pending-approvals/pending-approvals.component.ts", lineNumber: 28 });
})();
export {
  PendingApprovalsComponent
};
//# sourceMappingURL=chunk-C3CY67GX.js.map
