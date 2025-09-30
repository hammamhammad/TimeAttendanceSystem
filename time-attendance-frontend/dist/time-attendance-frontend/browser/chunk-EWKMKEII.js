import {
  DetailCardComponent
} from "./chunk-H3TT7FFA.js";
import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  ExcusePoliciesService
} from "./chunk-X6RX6YJF.js";
import {
  LoadingSpinnerComponent
} from "./chunk-WJCQS5EA.js";
import {
  ConfirmationService
} from "./chunk-OJL2NUV4.js";
import {
  PermissionActions,
  PermissionService
} from "./chunk-DKGIYIS4.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  Router,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/excuse-policies/view-excuse-policy/view-excuse-policy.component.ts
function ViewExcusePolicyComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("excuse_policies.loading_details"))("variant", "primary")("centered", true);
  }
}
__name(ViewExcusePolicyComponent_Conditional_2_Template, "ViewExcusePolicyComponent_Conditional_2_Template");
function ViewExcusePolicyComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "i", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(ViewExcusePolicyComponent_Conditional_3_Template, "ViewExcusePolicyComponent_Conditional_3_Template");
function ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
  }
}
__name(ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_1_Template, "ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_1_Template");
function ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 25);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(((tmp_4_0 = ctx_r0.excusePolicy()) == null ? null : tmp_4_0.isActive) ? "fa-pause" : "fa-check");
    \u0275\u0275classProp("me-2", true);
  }
}
__name(ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_2_Template, "ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_2_Template");
function ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggleStatus());
    }, "ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_1_Template, 1, 0, "span", 23)(2, ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_2_Template, 1, 4, "i", 24);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_6_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(((tmp_3_0 = ctx_r0.excusePolicy()) == null ? null : tmp_3_0.isActive) ? "btn-warning" : "btn-success");
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.processing() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ((tmp_6_0 = ctx_r0.excusePolicy()) == null ? null : tmp_6_0.isActive) ? ctx_r0.i18n.t("common.deactivate") : ctx_r0.i18n.t("common.activate"), " ");
  }
}
__name(ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Template, "ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Template");
function ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
  }
}
__name(ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Conditional_1_Template, "ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Conditional_1_Template");
function ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 27);
  }
}
__name(ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Conditional_2_Template, "ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Conditional_2_Template");
function ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteExcusePolicy());
    }, "ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Conditional_1_Template, 1, 0, "span", 23)(2, ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Conditional_2_Template, 1, 0, "i", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.processing() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.delete"), " ");
  }
}
__name(ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Template, "ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Template");
function ViewExcusePolicyComponent_Conditional_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 14)(2, "h6", 15);
    \u0275\u0275element(3, "i", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 17)(6, "div", 19);
    \u0275\u0275conditionalCreate(7, ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_7_Template, 4, 5, "button", 20);
    \u0275\u0275conditionalCreate(8, ViewExcusePolicyComponent_Conditional_4_Conditional_6_Conditional_8_Template, 4, 3, "button", 21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.canToggleStatus() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canDelete() ? 8 : -1);
  }
}
__name(ViewExcusePolicyComponent_Conditional_4_Conditional_6_Template, "ViewExcusePolicyComponent_Conditional_4_Conditional_6_Template");
function ViewExcusePolicyComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 7);
    \u0275\u0275element(2, "app-detail-card", 8)(3, "app-detail-card", 9)(4, "app-detail-card", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 11);
    \u0275\u0275conditionalCreate(6, ViewExcusePolicyComponent_Conditional_4_Conditional_6_Template, 9, 3, "div", 12);
    \u0275\u0275elementStart(7, "div", 13)(8, "div", 14)(9, "h6", 15);
    \u0275\u0275element(10, "i", 16);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(12, "div", 17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("excuse_policies.basic_information"))("fields", ctx_r0.basicInfoFields);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("excuse_policies.policy_settings"))("fields", ctx_r0.settingsFields);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("excuse_policies.audit_information"))("fields", ctx_r0.auditFields);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasActiveActions() ? 6 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.navigation"), " ");
  }
}
__name(ViewExcusePolicyComponent_Conditional_4_Template, "ViewExcusePolicyComponent_Conditional_4_Template");
var _ViewExcusePolicyComponent = class _ViewExcusePolicyComponent {
  i18n = inject(I18nService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  excusePoliciesService = inject(ExcusePoliciesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  permissionService = inject(PermissionService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  processing = signal(false, ...ngDevMode ? [{ debugName: "processing" }] : []);
  excusePolicy = signal(null, ...ngDevMode ? [{ debugName: "excusePolicy" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  get basicInfoFields() {
    const policy = this.excusePolicy();
    if (!policy)
      return [];
    return [
      {
        label: this.i18n.t("fields.branch"),
        value: policy.branchName || this.i18n.t("common.all_branches")
      },
      {
        label: this.i18n.t("fields.status"),
        value: policy.isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive"),
        type: "badge",
        badgeVariant: policy.isActive ? "success" : "secondary"
      },
      {
        label: this.i18n.t("excuse_policies.max_personal_excuses_per_month"),
        value: policy.maxPersonalExcusesPerMonth.toString()
      },
      {
        label: this.i18n.t("excuse_policies.max_personal_excuse_hours_per_month"),
        value: `${policy.maxPersonalExcuseHoursPerMonth} ${this.i18n.t("fields.hoursUnit")}`
      },
      {
        label: this.i18n.t("excuse_policies.max_personal_excuse_hours_per_day"),
        value: `${policy.maxPersonalExcuseHoursPerDay} ${this.i18n.t("fields.hoursUnit")}`
      },
      {
        label: this.i18n.t("excuse_policies.max_hours_per_excuse"),
        value: `${policy.maxHoursPerExcuse} ${this.i18n.t("fields.hoursUnit")}`
      }
    ];
  }
  get settingsFields() {
    const policy = this.excusePolicy();
    if (!policy)
      return [];
    return [
      {
        label: this.i18n.t("excuse_policies.requires_approval"),
        value: policy.requiresApproval ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: policy.requiresApproval ? "warning" : "success"
      },
      {
        label: this.i18n.t("excuse_policies.allow_partial_hour_excuses"),
        value: policy.allowPartialHourExcuses ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: policy.allowPartialHourExcuses ? "success" : "secondary"
      },
      {
        label: this.i18n.t("excuse_policies.minimum_excuse_duration"),
        value: `${policy.minimumExcuseDuration} ${this.i18n.t("fields.minutesUnit")}`
      },
      {
        label: this.i18n.t("excuse_policies.max_retroactive_days"),
        value: `${policy.maxRetroactiveDays} ${policy.maxRetroactiveDays === 1 ? this.i18n.t("fields.dayUnit") : this.i18n.t("fields.daysUnit")}`
      },
      {
        label: this.i18n.t("excuse_policies.allow_self_service_requests"),
        value: policy.allowSelfServiceRequests ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: policy.allowSelfServiceRequests ? "success" : "secondary"
      }
    ];
  }
  get auditFields() {
    const policy = this.excusePolicy();
    if (!policy)
      return [];
    const fields = [
      {
        label: this.i18n.t("fields.createdAt"),
        value: policy.createdAtUtc,
        type: "datetime"
      },
      {
        label: this.i18n.t("fields.createdBy"),
        value: policy.createdBy
      }
    ];
    if (policy.modifiedAtUtc && policy.modifiedBy) {
      fields.push({
        label: this.i18n.t("fields.modifiedAt"),
        value: policy.modifiedAtUtc,
        type: "datetime"
      }, {
        label: this.i18n.t("fields.modifiedBy"),
        value: policy.modifiedBy
      });
    }
    return fields;
  }
  ngOnInit() {
    this.loadExcusePolicyDetails();
  }
  loadExcusePolicyDetails() {
    const policyId = this.route.snapshot.paramMap.get("id");
    if (!policyId) {
      this.router.navigate(["/excuse-policies"]);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.excusePoliciesService.getExcusePolicyById(+policyId).subscribe({
      next: /* @__PURE__ */ __name((policy) => {
        this.excusePolicy.set(policy);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load excuse policy details:", error);
        this.error.set(this.i18n.t("excuse_policies.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  toggleStatus() {
    return __async(this, null, function* () {
      if (!this.excusePolicy())
        return;
      const policy = this.excusePolicy();
      const isActivating = !policy.isActive;
      const result = yield this.confirmationService.confirm({
        title: isActivating ? this.i18n.t("excuse_policies.activate_policy") : this.i18n.t("excuse_policies.deactivate_policy"),
        message: isActivating ? this.i18n.t("excuse_policies.confirm_activate") : this.i18n.t("excuse_policies.confirm_deactivate"),
        confirmText: isActivating ? this.i18n.t("common.activate") : this.i18n.t("common.deactivate"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: isActivating ? "btn-success" : "btn-warning",
        icon: isActivating ? "fa-check" : "fa-pause",
        iconClass: isActivating ? "text-success" : "text-warning"
      });
      if (result.confirmed) {
        this.processing.set(true);
        this.excusePoliciesService.toggleExcusePolicyStatus(policy.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(isActivating ? this.i18n.t("excuse_policies.success.activated") : this.i18n.t("excuse_policies.success.deactivated"));
            this.loadExcusePolicyDetails();
            this.processing.set(false);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to toggle excuse policy status:", error);
            this.notificationService.error(this.i18n.t("excuse_policies.errors.toggle_status_failed"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  deleteExcusePolicy() {
    return __async(this, null, function* () {
      if (!this.excusePolicy())
        return;
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("excuse_policies.delete_policy"),
        message: this.i18n.t("excuse_policies.confirm_delete"),
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.processing.set(true);
        this.excusePoliciesService.deleteExcusePolicy(this.excusePolicy().id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("excuse_policies.success.deleted"));
            this.router.navigate(["/excuse-policies"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete excuse policy:", error);
            this.notificationService.error(this.i18n.t("excuse_policies.errors.delete_failed"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  // Permission checks
  canEdit() {
    return this.permissionService.has(`excuse-policy.${PermissionActions.UPDATE}`);
  }
  canToggleStatus() {
    return this.permissionService.has(`excuse-policy.${PermissionActions.UPDATE}`);
  }
  canDelete() {
    return this.permissionService.has(`excuse-policy.${PermissionActions.DELETE}`);
  }
  hasActiveActions() {
    return this.canEdit() || this.canToggleStatus() || this.canDelete();
  }
  getBranchName() {
    return this.excusePolicy()?.branchName || this.i18n.t("common.all_branches");
  }
};
__name(_ViewExcusePolicyComponent, "ViewExcusePolicyComponent");
__publicField(_ViewExcusePolicyComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewExcusePolicyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewExcusePolicyComponent)();
}, "ViewExcusePolicyComponent_Factory"));
__publicField(_ViewExcusePolicyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewExcusePolicyComponent, selectors: [["app-view-excuse-policy"]], decls: 5, vars: 6, consts: [[1, "app-view-page"], ["mode", "view", "moduleName", "excuse-policies", "moduleRoute", "excuse-policies", 3, "title", "entityId", "loading"], [1, "text-center", "py-5"], ["role", "alert", 1, "alert", "alert-danger"], [1, "app-desktop-sidebar"], [3, "message", "variant", "centered"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "app-main-content"], ["icon", "fas fa-info-circle", "layout", "two-column", 3, "title", "fields"], ["icon", "fas fa-cogs", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], ["icon", "fas fa-history", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], [1, "app-sidebar-content"], [1, "card", "mb-3"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-arrow-left", "me-2"], [1, "card-body"], [1, "fas", "fa-cogs", "me-2"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", 3, "class", "disabled"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "disabled"], ["type", "button", 1, "btn", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", 3, "class", "me-2"], [1, "fas"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-trash", "me-2"]], template: /* @__PURE__ */ __name(function ViewExcusePolicyComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewExcusePolicyComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, ViewExcusePolicyComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, ViewExcusePolicyComponent_Conditional_4_Template, 13, 8, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("excuse_policies.view_policy"))("entityId", (tmp_1_0 = ctx.excusePolicy()) == null ? null : tmp_1_0.id)("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.excusePolicy() && !ctx.loading() ? 4 : -1);
  }
}, "ViewExcusePolicyComponent_Template"), dependencies: [
  CommonModule,
  LoadingSpinnerComponent,
  DetailCardComponent,
  FormHeaderComponent
], styles: ["\n\n.detail-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.actions-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.info-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  min-width: 160px;\n}\n.info-value[_ngcontent-%COMP%] {\n  text-align: right;\n  color: var(--bs-gray-900);\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.settings-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.setting-item[_ngcontent-%COMP%] {\n  background: var(--bs-gray-50);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  border-left: 4px solid var(--bs-primary);\n}\n.setting-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-gray-800);\n  font-size: 0.9rem;\n  margin-bottom: 0.5rem;\n}\n.setting-value[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--bs-primary);\n  font-weight: 500;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .actions-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .info-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    text-align: left;\n  }\n  .info-label[_ngcontent-%COMP%] {\n    min-width: auto;\n    margin-bottom: 0.25rem;\n  }\n  .info-value[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .settings-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=view-excuse-policy.component.css.map */"] }));
var ViewExcusePolicyComponent = _ViewExcusePolicyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewExcusePolicyComponent, [{
    type: Component,
    args: [{ selector: "app-view-excuse-policy", standalone: true, imports: [
      CommonModule,
      LoadingSpinnerComponent,
      DetailCardComponent,
      FormHeaderComponent
    ], template: `<div class="app-view-page">\r
  <!-- Standardized Page Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="i18n.t('excuse_policies.view_policy')"\r
    moduleName="excuse-policies"\r
    moduleRoute="excuse-policies"\r
    [entityId]="excusePolicy()?.id"\r
    [loading]="loading()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('excuse_policies.loading_details')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Error State -->\r
  @if (error()) {\r
    <div class="alert alert-danger" role="alert">\r
      <i class="fas fa-exclamation-triangle me-2"></i>\r
      {{ error() }}\r
    </div>\r
  }\r
\r
  <!-- Excuse Policy Details -->\r
  @if (excusePolicy() && !loading()) {\r
    <div class="app-desktop-sidebar">\r
      <!-- Main Content -->\r
      <div class="app-main-content">\r
        <!-- Basic Information Card -->\r
        <app-detail-card\r
          [title]="i18n.t('excuse_policies.basic_information')"\r
          icon="fas fa-info-circle"\r
          [fields]="basicInfoFields"\r
          layout="two-column">\r
        </app-detail-card>\r
\r
        <!-- Settings Card -->\r
        <app-detail-card\r
          [title]="i18n.t('excuse_policies.policy_settings')"\r
          icon="fas fa-cogs"\r
          [fields]="settingsFields"\r
          layout="two-column"\r
          class="mt-4">\r
        </app-detail-card>\r
\r
        <!-- Audit Information Card -->\r
        <app-detail-card\r
          [title]="i18n.t('excuse_policies.audit_information')"\r
          icon="fas fa-history"\r
          [fields]="auditFields"\r
          layout="two-column"\r
          class="mt-4">\r
        </app-detail-card>\r
      </div>\r
\r
      <!-- Sidebar -->\r
      <div class="app-sidebar-content">\r
        <!-- Actions Card -->\r
        @if (hasActiveActions()) {\r
          <div class="card mb-3">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">\r
                <i class="fas fa-cogs me-2"></i>\r
                {{ i18n.t('common.actions') }}\r
              </h6>\r
            </div>\r
            <div class="card-body">\r
              <div class="d-grid gap-2">\r
\r
                <!-- Toggle Status Action -->\r
                @if (canToggleStatus()) {\r
                  <button\r
                    type="button"\r
                    class="btn"\r
                    [class]="excusePolicy()?.isActive ? 'btn-warning' : 'btn-success'"\r
                    (click)="toggleStatus()"\r
                    [disabled]="processing()">\r
                    @if (processing()) {\r
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    } @else {\r
                      <i class="fas" [class]="excusePolicy()?.isActive ? 'fa-pause' : 'fa-check'" [class.me-2]="true"></i>\r
                    }\r
                    {{ excusePolicy()?.isActive ? i18n.t('common.deactivate') : i18n.t('common.activate') }}\r
                  </button>\r
                }\r
\r
                <!-- Delete Action -->\r
                @if (canDelete()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-danger"\r
                    (click)="deleteExcusePolicy()"\r
                    [disabled]="processing()">\r
                    @if (processing()) {\r
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    } @else {\r
                      <i class="fas fa-trash me-2"></i>\r
                    }\r
                    {{ i18n.t('common.delete') }}\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Back Navigation -->\r
        <div class="card">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">\r
              <i class="fas fa-arrow-left me-2"></i>\r
              {{ i18n.t('common.navigation') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/excuse-policies/view-excuse-policy/view-excuse-policy.component.css */\n.detail-card {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card .card-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card .card-body {\n  padding: 1.25rem;\n}\n.actions-card {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical .btn {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical .btn:last-child {\n  margin-bottom: 0;\n}\n.status-badge {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.info-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.info-item:last-child {\n  border-bottom: none;\n}\n.info-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  min-width: 160px;\n}\n.info-value {\n  text-align: right;\n  color: var(--bs-gray-900);\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.settings-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.setting-item {\n  background: var(--bs-gray-50);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  border-left: 4px solid var(--bs-primary);\n}\n.setting-label {\n  font-weight: 600;\n  color: var(--bs-gray-800);\n  font-size: 0.9rem;\n  margin-bottom: 0.5rem;\n}\n.setting-value {\n  font-size: 1.1rem;\n  color: var(--bs-primary);\n  font-weight: 500;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .actions-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .info-item {\n    flex-direction: column;\n    align-items: flex-start;\n    text-align: left;\n  }\n  .info-label {\n    min-width: auto;\n    margin-bottom: 0.25rem;\n  }\n  .info-value {\n    text-align: left;\n  }\n  .settings-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=view-excuse-policy.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewExcusePolicyComponent, { className: "ViewExcusePolicyComponent", filePath: "src/app/pages/excuse-policies/view-excuse-policy/view-excuse-policy.component.ts", lineNumber: 29 });
})();
export {
  ViewExcusePolicyComponent
};
//# sourceMappingURL=chunk-EWKMKEII.js.map
