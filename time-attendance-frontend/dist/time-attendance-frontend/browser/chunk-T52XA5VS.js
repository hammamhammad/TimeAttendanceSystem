import {
  DetailCardComponent
} from "./chunk-GYKU5QK6.js";
import {
  BranchesService
} from "./chunk-VA62FO4C.js";
import {
  StatCardComponent
} from "./chunk-ACI7L5XM.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
import {
  LoadingSpinnerComponent
} from "./chunk-GSKH2KOG.js";
import {
  PageHeaderComponent
} from "./chunk-DKGFJHVQ.js";
import {
  ActivatedRoute,
  Router,
  RouterModule
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/branches/view-branch/view-branch.component.ts
function ViewBranchComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("common.loading"))("centered", true);
  }
}
__name(ViewBranchComponent_Conditional_2_Template, "ViewBranchComponent_Conditional_2_Template");
function ViewBranchComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 6);
    \u0275\u0275element(2, "app-detail-card", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 8)(4, "div", 9)(5, "div", 10)(6, "h6", 11);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 12)(9, "div", 13)(10, "button", 14);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewBranchComponent_Conditional_3_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEdit());
    }, "ViewBranchComponent_Conditional_3_Template_button_click_10_listener"));
    \u0275\u0275element(11, "i", 15);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewBranchComponent_Conditional_3_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onViewEmployees());
    }, "ViewBranchComponent_Conditional_3_Template_button_click_13_listener"));
    \u0275\u0275element(14, "i", 17);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewBranchComponent_Conditional_3_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onViewDepartments());
    }, "ViewBranchComponent_Conditional_3_Template_button_click_16_listener"));
    \u0275\u0275element(17, "i", 19);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "div", 20)(20, "app-stat-card", 21);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewBranchComponent_Conditional_3_Template_app_stat_card_click_20_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onViewEmployees());
    }, "ViewBranchComponent_Conditional_3_Template_app_stat_card_click_20_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "app-stat-card", 22);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewBranchComponent_Conditional_3_Template_app_stat_card_click_21_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onViewDepartments());
    }, "ViewBranchComponent_Conditional_3_Template_app_stat_card_click_21_listener"));
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_9_0;
    let tmp_13_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("title", (tmp_1_0 = ctx_r0.branch()) == null ? null : tmp_1_0.name)("subtitle", (tmp_2_0 = ctx_r0.branch()) == null ? null : tmp_2_0.code)("fields", ctx_r0.branchFields);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.actions"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.edit"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.view_employees"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.view_departments"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("label", ctx_r0.i18n.t("branches.employees"))("value", ((tmp_9_0 = ctx_r0.statistics()) == null ? null : tmp_9_0.employeeCount) || 0)("clickable", true)("clickableText", ctx_r0.i18n.t("branches.view_employees"));
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.i18n.t("branches.departments"))("value", ((tmp_13_0 = ctx_r0.statistics()) == null ? null : tmp_13_0.departmentCount) || 0)("clickable", true)("clickableText", ctx_r0.i18n.t("branches.view_departments"));
  }
}
__name(ViewBranchComponent_Conditional_3_Template, "ViewBranchComponent_Conditional_3_Template");
function ViewBranchComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "i", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.i18n.t("branches.branch_not_found"), " ");
  }
}
__name(ViewBranchComponent_Conditional_4_Template, "ViewBranchComponent_Conditional_4_Template");
var _ViewBranchComponent = class _ViewBranchComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  branchesService = inject(BranchesService);
  i18n = inject(I18nService);
  branch = signal(null, ...ngDevMode ? [{ debugName: "branch" }] : []);
  statistics = signal(null, ...ngDevMode ? [{ debugName: "statistics" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  get branchFields() {
    const branch = this.branch();
    if (!branch)
      return [];
    return [
      {
        label: this.i18n.t("branches.name"),
        value: branch.name
      },
      {
        label: this.i18n.t("branches.code"),
        value: branch.code,
        copyable: true
      },
      {
        label: this.i18n.t("branches.timezone"),
        value: branch.timeZone
      },
      {
        label: this.i18n.t("common.status"),
        value: branch.isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive"),
        type: "badge",
        badgeVariant: branch.isActive ? "success" : "danger"
      },
      {
        label: this.i18n.t("common.phone"),
        value: "-"
      },
      {
        label: this.i18n.t("common.email"),
        value: "-"
      },
      {
        label: this.i18n.t("branches.created_at"),
        value: branch.createdAtUtc,
        type: "date"
      }
    ];
  }
  ngOnInit() {
    const branchId = this.route.snapshot.paramMap.get("id");
    if (branchId) {
      this.loadBranch(branchId);
      this.loadStatistics(branchId);
    } else {
      this.error.set("Invalid branch ID");
      this.loading.set(false);
    }
  }
  loadBranch(branchId) {
    setTimeout(() => {
      const mockBranch = {
        id: parseInt(branchId),
        name: "Sample Branch",
        code: "SAMPLE",
        timeZone: "UTC",
        isActive: true,
        employeeCount: 10,
        departmentCount: 3,
        createdAtUtc: "2024-01-01T00:00:00Z"
      };
      this.branch.set(mockBranch);
      this.loading.set(false);
    }, 1e3);
  }
  loadStatistics(branchId) {
    this.statistics.set({
      employeeCount: Math.floor(Math.random() * 100),
      departmentCount: Math.floor(Math.random() * 20)
    });
  }
  onEdit() {
    if (this.branch()) {
      this.router.navigate(["/branches", this.branch().id, "edit"]);
    }
  }
  onViewEmployees() {
    if (this.branch()) {
      this.router.navigate(["/employees"], { queryParams: { branchId: this.branch().id } });
    }
  }
  onViewDepartments() {
    if (this.branch()) {
      this.router.navigate(["/departments"], { queryParams: { branchId: this.branch().id } });
    }
  }
  onBack() {
    this.router.navigate(["/branches"]);
  }
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t("errors.unknown");
  }
};
__name(_ViewBranchComponent, "ViewBranchComponent");
__publicField(_ViewBranchComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewBranchComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewBranchComponent)();
}, "ViewBranchComponent_Factory"));
__publicField(_ViewBranchComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewBranchComponent, selectors: [["app-view-branch"]], decls: 5, vars: 2, consts: [[1, "app-view-page"], [3, "title"], [1, "d-flex", "justify-content-center", "py-5"], [1, "app-desktop-sidebar"], [1, "alert", "alert-danger"], [3, "message", "centered"], [1, "app-main-content"], ["icon", "fas fa-building", "layout", "two-column", 3, "title", "subtitle", "fields"], [1, "app-sidebar-content"], [1, "card", "mb-3"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "card-body"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], [1, "fa-solid", "fa-edit", "me-2"], ["type", "button", 1, "btn", "btn-outline-info", 3, "click"], [1, "fa-solid", "fa-users", "me-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fa-solid", "fa-sitemap", "me-2"], [1, "d-flex", "flex-column", "gap-3"], ["icon", "fas fa-users", "variant", "primary", 3, "click", "label", "value", "clickable", "clickableText"], ["icon", "fas fa-sitemap", "variant", "info", 3, "click", "label", "value", "clickable", "clickableText"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function ViewBranchComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275conditionalCreate(2, ViewBranchComponent_Conditional_2_Template, 2, 2, "div", 2)(3, ViewBranchComponent_Conditional_3_Template, 22, 15, "div", 3)(4, ViewBranchComponent_Conditional_4_Template, 3, 1, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("branches.view_details"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : ctx.branch() ? 3 : 4);
  }
}, "ViewBranchComponent_Template"), dependencies: [
  RouterModule,
  PageHeaderComponent,
  DetailCardComponent,
  StatCardComponent,
  LoadingSpinnerComponent
], encapsulation: 2 }));
var ViewBranchComponent = _ViewBranchComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewBranchComponent, [{
    type: Component,
    args: [{
      selector: "app-view-branch",
      standalone: true,
      imports: [
        RouterModule,
        PageHeaderComponent,
        DetailCardComponent,
        StatusBadgeComponent,
        StatCardComponent,
        LoadingSpinnerComponent
      ],
      template: `
    <div class="app-view-page">
      <!-- Standardized Page Header -->
      <app-page-header
        [title]="i18n.t('branches.view_details')">
      </app-page-header>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <app-loading-spinner
            [message]="i18n.t('common.loading')"
            [centered]="true">
          </app-loading-spinner>
        </div>
      } @else if (branch()) {
        <!-- Branch Details Layout -->
        <div class="app-desktop-sidebar">
          <!-- Main Content -->
          <div class="app-main-content">
            <!-- Branch Information Card -->
            <app-detail-card
              [title]="branch()?.name"
              [subtitle]="branch()?.code"
              icon="fas fa-building"
              [fields]="branchFields"
              layout="two-column">
            </app-detail-card>
          </div>

          <!-- Sidebar -->
          <div class="app-sidebar-content">
            <!-- Quick Actions Card -->
            <div class="card mb-3">
              <div class="card-header">
                <h6 class="card-title mb-0">{{ i18n.t('common.actions') }}</h6>
              </div>
              <div class="card-body">
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    (click)="onEdit()">
                    <i class="fa-solid fa-edit me-2"></i>
                    {{ i18n.t('branches.edit') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-info"
                    (click)="onViewEmployees()">
                    <i class="fa-solid fa-users me-2"></i>
                    {{ i18n.t('branches.view_employees') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    (click)="onViewDepartments()">
                    <i class="fa-solid fa-sitemap me-2"></i>
                    {{ i18n.t('branches.view_departments') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Statistics Cards -->
            <div class="d-flex flex-column gap-3">
              <app-stat-card
                [label]="i18n.t('branches.employees')"
                [value]="statistics()?.employeeCount || 0"
                icon="fas fa-users"
                variant="primary"
                [clickable]="true"
                [clickableText]="i18n.t('branches.view_employees')"
                (click)="onViewEmployees()">
              </app-stat-card>

              <app-stat-card
                [label]="i18n.t('branches.departments')"
                [value]="statistics()?.departmentCount || 0"
                icon="fas fa-sitemap"
                variant="info"
                [clickable]="true"
                [clickableText]="i18n.t('branches.view_departments')"
                (click)="onViewDepartments()">
              </app-stat-card>
            </div>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('branches.branch_not_found') }}
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewBranchComponent, { className: "ViewBranchComponent", filePath: "src/app/pages/branches/view-branch/view-branch.component.ts", lineNumber: 120 });
})();
export {
  ViewBranchComponent
};
//# sourceMappingURL=chunk-T52XA5VS.js.map
