import {
  ExcusePoliciesService
} from "./chunk-XDAIG4PW.js";
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
  NgTemplateOutlet,
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
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/excuse-policies/view-excuse-policy/view-excuse-policy.component.ts
function ViewExcusePolicyComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
__name(ViewExcusePolicyComponent_Conditional_1_Template, "ViewExcusePolicyComponent_Conditional_1_Template");
function ViewExcusePolicyComponent_Conditional_2_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
__name(ViewExcusePolicyComponent_Conditional_2_ng_container_10_Template, "ViewExcusePolicyComponent_Conditional_2_ng_container_10_Template");
function ViewExcusePolicyComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-form-header", 2);
    \u0275\u0275elementStart(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "div", 6)(5, "h6", 7);
    \u0275\u0275element(6, "i", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 9)(9, "app-definition-list", 10);
    \u0275\u0275template(10, ViewExcusePolicyComponent_Conditional_2_ng_container_10_Template, 1, 0, "ng-container", 11);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "div", 4)(12, "div", 5)(13, "div", 6)(14, "h6", 7);
    \u0275\u0275element(15, "i", 12);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 9);
    \u0275\u0275element(18, "app-definition-list", 10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 4)(20, "div", 5)(21, "div", 6)(22, "h6", 7);
    \u0275\u0275element(23, "i", 13);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 9);
    \u0275\u0275element(26, "app-definition-list", 10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 4)(28, "div", 5)(29, "div", 6)(30, "h6", 7);
    \u0275\u0275element(31, "i", 14);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 9);
    \u0275\u0275element(34, "app-definition-list", 10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 15)(36, "div", 5)(37, "div", 6)(38, "h6", 7);
    \u0275\u0275element(39, "i", 16);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 9);
    \u0275\u0275element(42, "app-definition-list", 17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const statusBadgeTemplate_r2 = \u0275\u0275reference(4);
    \u0275\u0275property("title", ctx_r0.t("excuse_policies.policy_details"))("entityId", ctx_r0.policyId() ?? void 0);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("excuse_policies.basic_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.basicInfoItems());
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", statusBadgeTemplate_r2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("excuse_policies.monthly_limits"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.monthlyLimitsItems());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("excuse_policies.time_limits"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.timeLimitsItems());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("excuse_policies.policy_options"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.policyOptionsItems());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("excuse_policies.audit_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.auditInfoItems())("labelWidth", "2")("valueWidth", "10");
  }
}
__name(ViewExcusePolicyComponent_Conditional_2_Template, "ViewExcusePolicyComponent_Conditional_2_Template");
function ViewExcusePolicyComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-status-badge", 18);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("status", ctx_r0.statusBadge().label)("variant", ctx_r0.statusBadge().variant);
  }
}
__name(ViewExcusePolicyComponent_ng_template_3_Template, "ViewExcusePolicyComponent_ng_template_3_Template");
var _ViewExcusePolicyComponent = class _ViewExcusePolicyComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  excusePoliciesService = inject(ExcusePoliciesService);
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
    POLICY_UPDATE: "settings.excusePolicy.update",
    POLICY_DELETE: "settings.excusePolicy.delete"
  };
  // Computed properties for display
  statusBadge = computed(() => {
    const p = this.policy();
    if (!p)
      return { label: "", variant: "secondary" };
    return {
      label: p.isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive"),
      variant: p.isActive ? "success" : "secondary"
    };
  }, ...ngDevMode ? [{ debugName: "statusBadge" }] : []);
  // Basic information items
  basicInfoItems = computed(() => {
    const p = this.policy();
    if (!p)
      return [];
    return [
      {
        label: this.i18n.t("excuse_policies.branch"),
        value: p.branchId === null ? this.i18n.t("excuse_policies.organization_wide") : p.branchName || `Branch ${p.branchId}`
      },
      {
        label: this.i18n.t("common.status"),
        value: "",
        customContent: true
      }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoItems" }] : []);
  // Monthly limits items
  monthlyLimitsItems = computed(() => {
    const p = this.policy();
    if (!p)
      return [];
    return [
      {
        label: this.i18n.t("excuse_policies.max_personal_excuses_per_month"),
        value: `${p.maxPersonalExcusesPerMonth} ${this.i18n.t("excuse_policies.excuses")}`
      },
      {
        label: this.i18n.t("excuse_policies.max_personal_excuse_hours_per_month"),
        value: `${p.maxPersonalExcuseHoursPerMonth} ${this.i18n.t("common.hours")}`
      }
    ];
  }, ...ngDevMode ? [{ debugName: "monthlyLimitsItems" }] : []);
  // Time limits items
  timeLimitsItems = computed(() => {
    const p = this.policy();
    if (!p)
      return [];
    return [
      {
        label: this.i18n.t("excuse_policies.max_personal_excuse_hours_per_day"),
        value: `${p.maxPersonalExcuseHoursPerDay} ${this.i18n.t("common.hours")}`
      },
      {
        label: this.i18n.t("excuse_policies.max_hours_per_excuse"),
        value: `${p.maxHoursPerExcuse} ${this.i18n.t("common.hours")}`
      },
      {
        label: this.i18n.t("excuse_policies.minimum_excuse_duration"),
        value: `${p.minimumExcuseDuration} ${this.i18n.t("common.hours")}`
      }
    ];
  }, ...ngDevMode ? [{ debugName: "timeLimitsItems" }] : []);
  // Policy options items
  policyOptionsItems = computed(() => {
    const p = this.policy();
    if (!p)
      return [];
    return [
      {
        label: this.i18n.t("excuse_policies.requires_approval"),
        value: p.requiresApproval ? this.i18n.t("common.yes") : this.i18n.t("common.no")
      },
      {
        label: this.i18n.t("excuse_policies.allow_partial_hour_excuses"),
        value: p.allowPartialHourExcuses ? this.i18n.t("common.yes") : this.i18n.t("common.no")
      },
      {
        label: this.i18n.t("excuse_policies.allow_self_service_requests"),
        value: p.allowSelfServiceRequests ? this.i18n.t("common.yes") : this.i18n.t("common.no")
      },
      {
        label: this.i18n.t("excuse_policies.max_retroactive_days"),
        value: `${p.maxRetroactiveDays} ${this.i18n.t("fields.daysUnit")}`
      }
    ];
  }, ...ngDevMode ? [{ debugName: "policyOptionsItems" }] : []);
  // Audit information items
  auditInfoItems = computed(() => {
    const p = this.policy();
    if (!p)
      return [];
    const items = [
      {
        label: this.i18n.t("fields.createdBy"),
        value: p.createdBy
      },
      {
        label: this.i18n.t("fields.createdAt"),
        value: this.formatDate(p.createdAtUtc)
      }
    ];
    if (p.modifiedBy && p.modifiedAtUtc) {
      items.push({
        label: this.i18n.t("fields.updatedBy"),
        value: p.modifiedBy
      }, {
        label: this.i18n.t("fields.updatedAt"),
        value: this.formatDate(p.modifiedAtUtc)
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "auditInfoItems" }] : []);
  ngOnInit() {
    this.loadPolicy();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadPolicy() {
    this.loading.set(true);
    this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap((params) => {
      const id = Number(params.get("id"));
      if (!id || id <= 0) {
        this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("excuse_policies.errors.load_failed"));
        this.router.navigate(["/settings/excuse-policies"]);
        throw new Error("Invalid excuse policy ID");
      }
      this.policyId.set(id);
      return this.excusePoliciesService.getExcusePolicyById(id);
    })).subscribe({
      next: /* @__PURE__ */ __name((policy) => {
        this.loading.set(false);
        this.policy.set(policy);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        console.error("Failed to load excuse policy:", error);
        this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("excuse_policies.errors.load_failed"));
        this.router.navigate(["/settings/excuse-policies"]);
      }, "error")
    });
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  onEdit() {
    const p = this.policy();
    if (!p)
      return;
    this.router.navigate(["/settings/excuse-policies", p.id, "edit"]);
  }
  onToggleStatus() {
    return __async(this, null, function* () {
      const p = this.policy();
      if (!p || !this.permissionService.has(this.PERMISSIONS.POLICY_UPDATE)) {
        this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("common.errors.insufficient_permissions"));
        return;
      }
      const action = p.isActive ? "deactivate" : "activate";
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t(`excuse_policies.${action}_title`),
        message: this.i18n.t(`excuse_policies.confirm_${action}`),
        confirmText: this.i18n.t(`common.${action}`),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-primary",
        icon: "fa-toggle-on",
        iconClass: "text-primary"
      });
      if (result.confirmed) {
        this.excusePoliciesService.toggleExcusePolicyStatus(p.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            const successMessage = p.isActive ? this.i18n.t("excuse_policies.deactivate_success") : this.i18n.t("excuse_policies.activate_success");
            this.notificationService.success(this.i18n.t("app.success"), successMessage);
            this.loadPolicy();
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to toggle policy status:", error);
            const errorMessage = p.isActive ? this.i18n.t("excuse_policies.deactivate_error") : this.i18n.t("excuse_policies.activate_error");
            this.notificationService.error(this.i18n.t("app.error"), errorMessage);
          }, "error")
        });
      }
    });
  }
  onDelete() {
    return __async(this, null, function* () {
      const p = this.policy();
      if (!p || !this.permissionService.has(this.PERMISSIONS.POLICY_DELETE)) {
        this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("common.errors.insufficient_permissions"));
        return;
      }
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("excuse_policies.delete_title"),
        message: this.i18n.t("excuse_policies.confirm_delete"),
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.excusePoliciesService.deleteExcusePolicy(p.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("app.success"), this.i18n.t("excuse_policies.delete_success"));
            this.router.navigate(["/settings/excuse-policies"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete excuse policy:", error);
            this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("excuse_policies.delete_error"));
          }, "error")
        });
      }
    });
  }
  onBack() {
    this.router.navigate(["/settings/excuse-policies"]);
  }
};
__name(_ViewExcusePolicyComponent, "ViewExcusePolicyComponent");
__publicField(_ViewExcusePolicyComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewExcusePolicyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewExcusePolicyComponent)();
}, "ViewExcusePolicyComponent_Factory"));
__publicField(_ViewExcusePolicyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewExcusePolicyComponent, selectors: [["app-view-excuse-policy"]], decls: 5, vars: 2, consts: [["statusBadgeTemplate", ""], [1, "container-fluid"], ["mode", "view", "moduleName", "excuse_policies", "moduleRoute", "settings/excuse-policies", 3, "title", "entityId"], [1, "row"], [1, "col-md-6", "mb-4"], [1, "card"], [1, "card-header", "bg-light"], [1, "mb-0"], [1, "fas", "fa-info-circle", "me-2"], [1, "card-body"], [3, "items"], [4, "ngTemplateOutlet"], [1, "fas", "fa-calendar-alt", "me-2"], [1, "fas", "fa-clock", "me-2"], [1, "fas", "fa-cog", "me-2"], [1, "col-12", "mb-4"], [1, "fas", "fa-history", "me-2"], [3, "items", "labelWidth", "valueWidth"], [3, "status", "variant"]], template: /* @__PURE__ */ __name(function ViewExcusePolicyComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, ViewExcusePolicyComponent_Conditional_1_Template, 1, 0, "app-loading-spinner");
    \u0275\u0275conditionalCreate(2, ViewExcusePolicyComponent_Conditional_2_Template, 43, 15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ViewExcusePolicyComponent_ng_template_3_Template, 1, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.policy() ? 2 : -1);
  }
}, "ViewExcusePolicyComponent_Template"), dependencies: [
  CommonModule,
  NgTemplateOutlet,
  FormHeaderComponent,
  LoadingSpinnerComponent,
  StatusBadgeComponent,
  DefinitionListComponent
], styles: ["\n\n.container-fluid[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.card[_ngcontent-%COMP%] {\n  border: 1px solid #dee2e6;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dee2e6;\n  padding: 0.75rem 1rem;\n}\n.card-header[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .btn-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    border-radius: 0.25rem !important;\n    margin-bottom: 0.5rem;\n  }\n}\n/*# sourceMappingURL=view-excuse-policy.component.css.map */"] }));
var ViewExcusePolicyComponent = _ViewExcusePolicyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewExcusePolicyComponent, [{
    type: Component,
    args: [{ selector: "app-view-excuse-policy", standalone: true, imports: [
      CommonModule,
      FormHeaderComponent,
      LoadingSpinnerComponent,
      StatusBadgeComponent,
      DefinitionListComponent
    ], template: `<div class="container-fluid">
  <!-- Loading State -->
  @if (loading()) {
    <app-loading-spinner></app-loading-spinner>
  }

  <!-- Policy Details -->
  @if (!loading() && policy()) {
    <!-- Header -->
    <app-form-header
      mode="view"
      [title]="t('excuse_policies.policy_details')"
      [entityId]="policyId() ?? undefined"
      moduleName="excuse_policies"
      moduleRoute="settings/excuse-policies">
    </app-form-header>

    <div class="row">
      <!-- Basic Information -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-header bg-light">
            <h6 class="mb-0">
              <i class="fas fa-info-circle me-2"></i>
              {{ t('excuse_policies.basic_information') }}
            </h6>
          </div>
          <div class="card-body">
            <app-definition-list [items]="basicInfoItems()">
              <!-- Custom status badge content -->
              <ng-container *ngTemplateOutlet="statusBadgeTemplate"></ng-container>
            </app-definition-list>
          </div>
        </div>
      </div>

      <!-- Monthly Limits -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-header bg-light">
            <h6 class="mb-0">
              <i class="fas fa-calendar-alt me-2"></i>
              {{ t('excuse_policies.monthly_limits') }}
            </h6>
          </div>
          <div class="card-body">
            <app-definition-list [items]="monthlyLimitsItems()"></app-definition-list>
          </div>
        </div>
      </div>

      <!-- Time Limits -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-header bg-light">
            <h6 class="mb-0">
              <i class="fas fa-clock me-2"></i>
              {{ t('excuse_policies.time_limits') }}
            </h6>
          </div>
          <div class="card-body">
            <app-definition-list [items]="timeLimitsItems()"></app-definition-list>
          </div>
        </div>
      </div>

      <!-- Policy Options -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-header bg-light">
            <h6 class="mb-0">
              <i class="fas fa-cog me-2"></i>
              {{ t('excuse_policies.policy_options') }}
            </h6>
          </div>
          <div class="card-body">
            <app-definition-list [items]="policyOptionsItems()"></app-definition-list>
          </div>
        </div>
      </div>

      <!-- Audit Information -->
      <div class="col-12 mb-4">
        <div class="card">
          <div class="card-header bg-light">
            <h6 class="mb-0">
              <i class="fas fa-history me-2"></i>
              {{ t('excuse_policies.audit_information') }}
            </h6>
          </div>
          <div class="card-body">
            <app-definition-list [items]="auditInfoItems()" [labelWidth]="'2'" [valueWidth]="'10'"></app-definition-list>
          </div>
        </div>
      </div>
    </div>
  }
</div>

<!-- Status Badge Template -->
<ng-template #statusBadgeTemplate>
  <app-status-badge
    [status]="statusBadge().label"
    [variant]="statusBadge().variant">
  </app-status-badge>
</ng-template>
`, styles: ["/* src/app/pages/settings/excuse-policies/view-excuse-policy/view-excuse-policy.component.css */\n.container-fluid {\n  padding: 1.5rem;\n}\n.card {\n  border: 1px solid #dee2e6;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-header {\n  border-bottom: 1px solid #dee2e6;\n  padding: 0.75rem 1rem;\n}\n.card-header h6 {\n  font-weight: 600;\n  color: #495057;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding: 1rem;\n  }\n  .btn-group {\n    flex-direction: column;\n    width: 100%;\n  }\n  .btn-group .btn {\n    border-radius: 0.25rem !important;\n    margin-bottom: 0.5rem;\n  }\n}\n/*# sourceMappingURL=view-excuse-policy.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewExcusePolicyComponent, { className: "ViewExcusePolicyComponent", filePath: "src/app/pages/settings/excuse-policies/view-excuse-policy/view-excuse-policy.component.ts", lineNumber: 29 });
})();
export {
  ViewExcusePolicyComponent
};
//# sourceMappingURL=chunk-KAHBSC37.js.map
