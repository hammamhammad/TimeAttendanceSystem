import {
  RemoteWorkPoliciesService
} from "./chunk-EGHINQUX.js";
import {
  DefinitionListComponent
} from "./chunk-I7HA6QL2.js";
import {
  FormHeaderComponent
} from "./chunk-KM5VSJTZ.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
import {
  ConfirmationService
} from "./chunk-NUNE7G5P.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-GSKH2KOG.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import "./chunk-HZ2IZU2F.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  CommonModule,
  Component,
  DatePipe,
  Subject,
  computed,
  inject,
  setClassMetadata,
  signal,
  switchMap,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/remote-work-policy/view-remote-work-policy/view-remote-work-policy.component.ts
function ViewRemoteWorkPolicyComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-loading-spinner", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("remoteWork.policy.loading_details"))("variant", "primary")("centered", true);
  }
}
__name(ViewRemoteWorkPolicyComponent_Conditional_1_Template, "ViewRemoteWorkPolicyComponent_Conditional_1_Template");
function ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const p_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", p_r2.branchName || "Branch " + p_r2.branchId, " ");
  }
}
__name(ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_9_Template, "ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_9_Template");
function ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.company_wide"), " ");
  }
}
__name(ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_10_Template, "ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_10_Template");
function ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.branch_policy"), " ");
  }
}
__name(ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_13_Template, "ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_13_Template");
function ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.company_wide_policy"), " ");
  }
}
__name(ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_14_Template, "ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_14_Template");
function ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "i", 30);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r2 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t("common.modified_at"), ": ", \u0275\u0275pipeBind2(3, 2, p_r2.modifiedAtUtc, "medium"), " ");
  }
}
__name(ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_23_Template, "ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_23_Template");
function ViewRemoteWorkPolicyComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-form-header", 4);
    \u0275\u0275elementStart(1, "div", 5)(2, "div", 6)(3, "div", 7);
    \u0275\u0275element(4, "i", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 9)(6, "div", 10)(7, "div", 11)(8, "h3", 12);
    \u0275\u0275conditionalCreate(9, ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_9_Template, 1, 1)(10, ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_10_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 13);
    \u0275\u0275element(12, "i", 14);
    \u0275\u0275conditionalCreate(13, ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_13_Template, 1, 1)(14, ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_14_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 15)(16, "div", 16);
    \u0275\u0275element(17, "app-status-badge", 17);
    \u0275\u0275elementStart(18, "div", 18)(19, "div");
    \u0275\u0275element(20, "i", 19);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, ViewRemoteWorkPolicyComponent_Conditional_2_Conditional_23_Template, 4, 5, "div", 20);
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(24, "div", 21)(25, "div", 22)(26, "h5", 23);
    \u0275\u0275element(27, "i", 24);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 25);
    \u0275\u0275element(30, "app-definition-list", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 21)(32, "div", 22)(33, "h5", 23);
    \u0275\u0275element(34, "i", 27);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 25);
    \u0275\u0275element(37, "app-definition-list", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 21)(39, "div", 22)(40, "h5", 23);
    \u0275\u0275element(41, "i", 28);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 25);
    \u0275\u0275element(44, "app-definition-list", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 21)(46, "div", 22)(47, "h5", 23);
    \u0275\u0275element(48, "i", 29);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 25);
    \u0275\u0275element(51, "app-definition-list", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r2 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r0.i18n.t("remoteWork.policy.policy_details"))("entityId", ctx_r0.policyId() || void 0)("loading", ctx_r0.loading());
    \u0275\u0275advance(9);
    \u0275\u0275conditional(p_r2.branchId ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(p_r2.branchId ? 13 : 14);
    \u0275\u0275advance(4);
    \u0275\u0275property("status", ctx_r0.statusBadge().label)("variant", ctx_r0.statusBadge().variant);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t("common.created_at"), ": ", \u0275\u0275pipeBind2(22, 26, p_r2.createdAtUtc, "medium"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r2.modifiedAtUtc ? 23 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.basic_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.basicInfoItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.quota_settings"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.quotaInfoItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.approval_settings"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.approvalSettingsItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.advance_notice"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.advanceNoticeItems())("labelWidth", "4")("valueWidth", "8");
  }
}
__name(ViewRemoteWorkPolicyComponent_Conditional_2_Template, "ViewRemoteWorkPolicyComponent_Conditional_2_Template");
function ViewRemoteWorkPolicyComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "i", 31);
    \u0275\u0275elementStart(2, "h4", 32);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("remoteWork.policy.policy_not_found"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("remoteWork.policy.policy_not_found_message"));
  }
}
__name(ViewRemoteWorkPolicyComponent_Conditional_3_Template, "ViewRemoteWorkPolicyComponent_Conditional_3_Template");
var _ViewRemoteWorkPolicyComponent = class _ViewRemoteWorkPolicyComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  service = inject(RemoteWorkPoliciesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  destroy$ = new Subject();
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // State signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  policy = signal(null, ...ngDevMode ? [{ debugName: "policy" }] : []);
  policyId = signal(null, ...ngDevMode ? [{ debugName: "policyId" }] : []);
  // Permission constants
  PERMISSIONS = {
    UPDATE: "remoteWork.policy.update",
    DELETE: "remoteWork.policy.delete"
  };
  ngOnInit() {
    this.loadPolicy();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Load remote work policy data from route parameters
   */
  loadPolicy() {
    this.loading.set(true);
    this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap((params) => {
      const id = Number(params.get("id"));
      if (!id || id <= 0) {
        this.notificationService.error(this.i18n.t("remoteWork.policy.errors.invalid_id"));
        this.router.navigate(["/settings/remote-work-policy"]);
        throw new Error("Invalid policy ID");
      }
      this.policyId.set(id);
      return this.service.getById(id);
    })).subscribe({
      next: /* @__PURE__ */ __name((policy) => {
        this.loading.set(false);
        this.policy.set(policy);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        console.error("Failed to load remote work policy:", error);
        if (error.status === 404) {
          this.notificationService.error(this.i18n.t("remoteWork.policy.errors.not_found"));
        } else {
          this.notificationService.error(this.i18n.t("remoteWork.policy.errors.load_failed"));
        }
        this.router.navigate(["/settings/remote-work-policy"]);
      }, "error")
    });
  }
  /**
   * Toggle policy status
   */
  onToggleStatus() {
    const policy = this.policy();
    if (!policy || !this.permissionService.has(this.PERMISSIONS.UPDATE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    const action = policy.isActive ? "deactivate" : "activate";
    const message = this.i18n.t(`remoteWork.policy.confirm_${action}`);
    this.confirmationService.confirm({
      title: this.i18n.t(`remoteWork.policy.${action}_policy`),
      message,
      confirmText: this.i18n.t(`common.${action}`),
      cancelText: this.i18n.t("common.cancel")
    }).then((result) => {
      if (result.confirmed && policy) {
        this.service.toggleStatus(policy.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            const successMessage = policy.isActive ? this.i18n.t("remoteWork.policy.success.deactivated") : this.i18n.t("remoteWork.policy.success.activated");
            this.notificationService.success(successMessage);
            this.loadPolicy();
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to toggle policy status:", error);
            this.notificationService.error(this.i18n.t("remoteWork.policy.errors.status_toggle_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Delete policy
   */
  onDelete() {
    const policy = this.policy();
    if (!policy || !this.permissionService.has(this.PERMISSIONS.DELETE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    this.confirmationService.confirm({
      title: this.i18n.t("remoteWork.policy.delete_policy"),
      message: this.i18n.t("remoteWork.policy.confirm_delete"),
      confirmText: this.i18n.t("common.delete"),
      cancelText: this.i18n.t("common.cancel"),
      confirmButtonClass: "btn-danger"
    }).then((result) => {
      if (result.confirmed && policy) {
        this.service.delete(policy.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("remoteWork.policy.success.deleted"));
            this.router.navigate(["/settings/remote-work-policy"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete policy:", error);
            this.notificationService.error(this.i18n.t("remoteWork.policy.errors.delete_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Computed property for status badge
   */
  statusBadge = computed(() => {
    const p = this.policy();
    if (!p)
      return { label: "", variant: "secondary" };
    return {
      label: p.isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive"),
      variant: p.isActive ? "success" : "secondary"
    };
  }, ...ngDevMode ? [{ debugName: "statusBadge" }] : []);
  /**
   * Computed property for basic information items
   */
  basicInfoItems = computed(() => {
    const p = this.policy();
    if (!p)
      return [];
    const items = [
      {
        label: this.i18n.t("remoteWork.policy.branch"),
        value: p.branchId ? p.branchName || `Branch ${p.branchId}` : this.i18n.t("remoteWork.policy.company_wide")
      },
      {
        label: this.i18n.t("common.status"),
        value: this.statusBadge().label,
        type: "badge",
        badgeVariant: this.statusBadge().variant
      }
    ];
    return items;
  }, ...ngDevMode ? [{ debugName: "basicInfoItems" }] : []);
  /**
   * Computed property for quota information items
   */
  quotaInfoItems = computed(() => {
    const p = this.policy();
    if (!p)
      return [];
    const items = [];
    if (p.maxDaysPerWeek !== null && p.maxDaysPerWeek !== void 0) {
      items.push({
        label: this.i18n.t("remoteWork.policy.max_days_per_week"),
        value: `${p.maxDaysPerWeek} ${this.i18n.t("common.days")}`
      });
    }
    if (p.maxDaysPerMonth !== null && p.maxDaysPerMonth !== void 0) {
      items.push({
        label: this.i18n.t("remoteWork.policy.max_days_per_month"),
        value: `${p.maxDaysPerMonth} ${this.i18n.t("common.days")}`
      });
    }
    if (p.maxDaysPerYear !== null && p.maxDaysPerYear !== void 0) {
      items.push({
        label: this.i18n.t("remoteWork.policy.max_days_per_year"),
        value: `${p.maxDaysPerYear} ${this.i18n.t("common.days")}`
      });
    }
    if (items.length === 0) {
      items.push({
        label: this.i18n.t("remoteWork.policy.quotas"),
        value: this.i18n.t("remoteWork.policy.no_quotas_set")
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "quotaInfoItems" }] : []);
  /**
   * Computed property for approval settings items
   */
  approvalSettingsItems = computed(() => {
    const p = this.policy();
    if (!p)
      return [];
    return [
      {
        label: this.i18n.t("remoteWork.policy.requires_manager_approval"),
        value: p.requiresManagerApproval ? this.i18n.t("common.yes") : this.i18n.t("common.no")
      }
    ];
  }, ...ngDevMode ? [{ debugName: "approvalSettingsItems" }] : []);
  /**
   * Computed property for advance notice items
   */
  advanceNoticeItems = computed(() => {
    const p = this.policy();
    if (!p)
      return [];
    const items = [];
    if (p.minAdvanceNoticeDays !== null && p.minAdvanceNoticeDays !== void 0) {
      items.push({
        label: this.i18n.t("remoteWork.policy.min_advance_notice_days"),
        value: `${p.minAdvanceNoticeDays} ${this.i18n.t("common.days")}`
      });
    } else {
      items.push({
        label: this.i18n.t("remoteWork.policy.min_advance_notice_days"),
        value: this.i18n.t("remoteWork.policy.no_advance_notice_required")
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "advanceNoticeItems" }] : []);
};
__name(_ViewRemoteWorkPolicyComponent, "ViewRemoteWorkPolicyComponent");
__publicField(_ViewRemoteWorkPolicyComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewRemoteWorkPolicyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewRemoteWorkPolicyComponent)();
}, "ViewRemoteWorkPolicyComponent_Factory"));
__publicField(_ViewRemoteWorkPolicyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewRemoteWorkPolicyComponent, selectors: [["app-view-remote-work-policy"]], decls: 4, vars: 1, consts: [[1, "view-remote-work-policy-page"], [1, "d-flex", "justify-content-center", "align-items-center", "py-5"], [1, "text-center", "py-5"], [3, "message", "variant", "centered"], ["mode", "view", "moduleName", "remote-work-policy", "moduleRoute", "settings/remote-work-policy", 3, "title", "entityId", "loading"], [1, "header-card", "mb-4"], [1, "d-flex", "align-items-center"], [1, "policy-icon", "me-4"], [1, "fas", "fa-laptop-house", "text-primary", "fa-3x"], [1, "flex-grow-1"], [1, "row"], [1, "col-md-8"], [1, "mb-1"], [1, "text-muted", "mb-0"], [1, "fas", "fa-building", "me-2"], [1, "col-md-4", "text-md-end"], [1, "status-info"], [1, "fs-6", "mb-2", 3, "status", "variant"], [1, "text-muted", "small"], [1, "fas", "fa-clock", "me-1"], [1, "mt-1"], [1, "card", "mb-4"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-info-circle", "text-info", "me-2"], [1, "card-body"], ["layout", "two-column", 3, "items", "labelWidth", "valueWidth"], [1, "fas", "fa-calendar-check", "text-success", "me-2"], [1, "fas", "fa-user-check", "text-warning", "me-2"], [1, "fas", "fa-bell", "text-primary", "me-2"], [1, "fas", "fa-edit", "me-1"], [1, "fas", "fa-exclamation-triangle", "fa-3x", "text-warning", "mb-3"], [1, "text-muted"]], template: /* @__PURE__ */ __name(function ViewRemoteWorkPolicyComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, ViewRemoteWorkPolicyComponent_Conditional_1_Template, 2, 3, "div", 1)(2, ViewRemoteWorkPolicyComponent_Conditional_2_Template, 52, 29)(3, ViewRemoteWorkPolicyComponent_Conditional_3_Template, 6, 2, "div", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_0_0;
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 1 : (tmp_0_0 = ctx.policy()) ? 2 : 3, tmp_0_0);
  }
}, "ViewRemoteWorkPolicyComponent_Template"), dependencies: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, DatePipe], styles: ["\n\n.view-remote-work-policy-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.header-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #ffffff 100%);\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  padding: 2rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.policy-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 80px;\n  height: 80px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  color: white;\n  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);\n}\n.status-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.card[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n  transition: box-shadow 0.3s ease;\n}\n.card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #e9ecef;\n  padding: 1rem 1.5rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #495057;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (max-width: 768px) {\n  .view-remote-work-policy-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .header-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .policy-icon[_ngcontent-%COMP%] {\n    width: 60px;\n    height: 60px;\n  }\n  .status-info[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    margin-top: 1rem;\n  }\n}\n/*# sourceMappingURL=view-remote-work-policy.component.css.map */"] }));
var ViewRemoteWorkPolicyComponent = _ViewRemoteWorkPolicyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewRemoteWorkPolicyComponent, [{
    type: Component,
    args: [{ selector: "app-view-remote-work-policy", standalone: true, imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent], template: `<div class="view-remote-work-policy-page">\r
  @if (loading()) {\r
    <!-- Loading State -->\r
    <div class="d-flex justify-content-center align-items-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('remoteWork.policy.loading_details')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  } @else if (policy(); as p) {\r
    <!-- Page Header -->\r
    <app-form-header\r
      mode="view"\r
      [title]="i18n.t('remoteWork.policy.policy_details')"\r
      moduleName="remote-work-policy"\r
      moduleRoute="settings/remote-work-policy"\r
      [entityId]="policyId() || undefined"\r
      [loading]="loading()">\r
    </app-form-header>\r
\r
    <!-- Policy Header Card -->\r
    <div class="header-card mb-4">\r
      <div class="d-flex align-items-center">\r
        <div class="policy-icon me-4">\r
          <i class="fas fa-laptop-house text-primary fa-3x"></i>\r
        </div>\r
        <div class="flex-grow-1">\r
          <div class="row">\r
            <div class="col-md-8">\r
              <h3 class="mb-1">\r
                @if (p.branchId) {\r
                  {{ p.branchName || 'Branch ' + p.branchId }}\r
                } @else {\r
                  {{ i18n.t('remoteWork.policy.company_wide') }}\r
                }\r
              </h3>\r
              <p class="text-muted mb-0">\r
                <i class="fas fa-building me-2"></i>\r
                @if (p.branchId) {\r
                  {{ i18n.t('remoteWork.policy.branch_policy') }}\r
                } @else {\r
                  {{ i18n.t('remoteWork.policy.company_wide_policy') }}\r
                }\r
              </p>\r
            </div>\r
            <div class="col-md-4 text-md-end">\r
              <div class="status-info">\r
                <app-status-badge\r
                  [status]="statusBadge().label"\r
                  [variant]="statusBadge().variant"\r
                  class="fs-6 mb-2">\r
                </app-status-badge>\r
                <div class="text-muted small">\r
                  <div>\r
                    <i class="fas fa-clock me-1"></i>\r
                    {{ i18n.t('common.created_at') }}: {{ p.createdAtUtc | date:'medium' }}\r
                  </div>\r
                  @if (p.modifiedAtUtc) {\r
                    <div class="mt-1">\r
                      <i class="fas fa-edit me-1"></i>\r
                      {{ i18n.t('common.modified_at') }}: {{ p.modifiedAtUtc | date:'medium' }}\r
                    </div>\r
                  }\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Basic Information -->\r
    <div class="card mb-4">\r
      <div class="card-header">\r
        <h5 class="card-title mb-0">\r
          <i class="fas fa-info-circle text-info me-2"></i>\r
          {{ i18n.t('common.basic_information') }}\r
        </h5>\r
      </div>\r
      <div class="card-body">\r
        <app-definition-list\r
          [items]="basicInfoItems()"\r
          [labelWidth]="'4'"\r
          [valueWidth]="'8'"\r
          layout="two-column">\r
        </app-definition-list>\r
      </div>\r
    </div>\r
\r
    <!-- Quota Settings -->\r
    <div class="card mb-4">\r
      <div class="card-header">\r
        <h5 class="card-title mb-0">\r
          <i class="fas fa-calendar-check text-success me-2"></i>\r
          {{ i18n.t('remoteWork.policy.quota_settings') }}\r
        </h5>\r
      </div>\r
      <div class="card-body">\r
        <app-definition-list\r
          [items]="quotaInfoItems()"\r
          [labelWidth]="'4'"\r
          [valueWidth]="'8'"\r
          layout="two-column">\r
        </app-definition-list>\r
      </div>\r
    </div>\r
\r
    <!-- Approval Settings -->\r
    <div class="card mb-4">\r
      <div class="card-header">\r
        <h5 class="card-title mb-0">\r
          <i class="fas fa-user-check text-warning me-2"></i>\r
          {{ i18n.t('remoteWork.policy.approval_settings') }}\r
        </h5>\r
      </div>\r
      <div class="card-body">\r
        <app-definition-list\r
          [items]="approvalSettingsItems()"\r
          [labelWidth]="'4'"\r
          [valueWidth]="'8'"\r
          layout="two-column">\r
        </app-definition-list>\r
      </div>\r
    </div>\r
\r
    <!-- Advance Notice -->\r
    <div class="card mb-4">\r
      <div class="card-header">\r
        <h5 class="card-title mb-0">\r
          <i class="fas fa-bell text-primary me-2"></i>\r
          {{ i18n.t('remoteWork.policy.advance_notice') }}\r
        </h5>\r
      </div>\r
      <div class="card-body">\r
        <app-definition-list\r
          [items]="advanceNoticeItems()"\r
          [labelWidth]="'4'"\r
          [valueWidth]="'8'"\r
          layout="two-column">\r
        </app-definition-list>\r
      </div>\r
    </div>\r
  } @else {\r
    <!-- Error State -->\r
    <div class="text-center py-5">\r
      <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>\r
      <h4 class="text-muted">{{ i18n.t('remoteWork.policy.policy_not_found') }}</h4>\r
      <p class="text-muted">{{ i18n.t('remoteWork.policy.policy_not_found_message') }}</p>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/settings/remote-work-policy/view-remote-work-policy/view-remote-work-policy.component.css */\n.view-remote-work-policy-page {\n  padding: 1.5rem;\n}\n.header-card {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #ffffff 100%);\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  padding: 2rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.policy-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 80px;\n  height: 80px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  color: white;\n  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);\n}\n.status-info {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.card {\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n  transition: box-shadow 0.3s ease;\n}\n.card:hover {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.card-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #e9ecef;\n  padding: 1rem 1.5rem;\n}\n.card-title {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #495057;\n}\n.card-body {\n  padding: 1.5rem;\n}\n@media (max-width: 768px) {\n  .view-remote-work-policy-page {\n    padding: 1rem;\n  }\n  .header-card {\n    padding: 1.5rem;\n  }\n  .policy-icon {\n    width: 60px;\n    height: 60px;\n  }\n  .status-info {\n    align-items: flex-start;\n    margin-top: 1rem;\n  }\n}\n/*# sourceMappingURL=view-remote-work-policy.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewRemoteWorkPolicyComponent, { className: "ViewRemoteWorkPolicyComponent", filePath: "src/app/pages/settings/remote-work-policy/view-remote-work-policy/view-remote-work-policy.component.ts", lineNumber: 23 });
})();
export {
  ViewRemoteWorkPolicyComponent
};
//# sourceMappingURL=chunk-NY2ADYQC.js.map
