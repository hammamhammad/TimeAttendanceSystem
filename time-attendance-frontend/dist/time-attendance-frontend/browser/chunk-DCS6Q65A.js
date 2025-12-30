import {
  DepartmentFormComponent
} from "./chunk-C3VUVFN6.js";
import "./chunk-YPZLTOXZ.js";
import "./chunk-I3BAAGQQ.js";
import "./chunk-VA62FO4C.js";
import {
  DepartmentsService
} from "./chunk-MPELPKFG.js";
import "./chunk-IR2IKZBB.js";
import "./chunk-GSKH2KOG.js";
import "./chunk-CVUMC7BN.js";
import {
  Router,
  RouterLink,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/departments/create-department/create-department.component.ts
function CreateDepartmentComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "i", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(CreateDepartmentComponent_Conditional_18_Template, "CreateDepartmentComponent_Conditional_18_Template");
var _CreateDepartmentComponent = class _CreateDepartmentComponent {
  router = inject(Router);
  departmentsService = inject(DepartmentsService);
  i18n = inject(I18nService);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  onDepartmentCreated(department) {
    if (this.saving())
      return;
    this.saving.set(true);
    this.error.set("");
    const createRequest = department;
    this.departmentsService.createDepartment(createRequest).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        console.log("Department created successfully:", response);
        this.saving.set(false);
        this.router.navigate(["/departments"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error creating department:", error);
        this.error.set(this.getErrorMessage(error));
        this.saving.set(false);
      }, "error")
    });
  }
  onCancel() {
    this.router.navigate(["/departments"]);
  }
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t("errors.unknown");
  }
};
__name(_CreateDepartmentComponent, "CreateDepartmentComponent");
__publicField(_CreateDepartmentComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateDepartmentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateDepartmentComponent)();
}, "CreateDepartmentComponent_Factory"));
__publicField(_CreateDepartmentComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateDepartmentComponent, selectors: [["app-create-department"]], decls: 26, vars: 8, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/dashboard"], ["routerLink", "/departments"], [1, "breadcrumb-item", "active"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fa-solid", "fa-arrow-left", "me-2"], [1, "alert", "alert-danger"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fa-solid", "fa-building", "me-2"], [1, "card-body"], [3, "save", "cancel", "externalSaving"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function CreateDepartmentComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "nav", 2)(6, "ol", 3)(7, "li", 4)(8, "a", 5);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "li", 4)(11, "a", 6);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "li", 7);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateDepartmentComponent_Template_button_click_15_listener() {
      return ctx.onCancel();
    }, "CreateDepartmentComponent_Template_button_click_15_listener"));
    \u0275\u0275element(16, "i", 9);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, CreateDepartmentComponent_Conditional_18_Template, 3, 1, "div", 10);
    \u0275\u0275elementStart(19, "div", 11)(20, "div", 12)(21, "h5", 13);
    \u0275\u0275element(22, "i", 14);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 15)(25, "app-department-form", 16);
    \u0275\u0275listener("save", /* @__PURE__ */ __name(function CreateDepartmentComponent_Template_app_department_form_save_25_listener($event) {
      return ctx.onDepartmentCreated($event);
    }, "CreateDepartmentComponent_Template_app_department_form_save_25_listener"))("cancel", /* @__PURE__ */ __name(function CreateDepartmentComponent_Template_app_department_form_cancel_25_listener() {
      return ctx.onCancel();
    }, "CreateDepartmentComponent_Template_app_department_form_cancel_25_listener"));
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.create"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.i18n.t("dashboard.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("departments.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.create"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 18 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("department.information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("externalSaving", ctx.saving());
  }
}, "CreateDepartmentComponent_Template"), dependencies: [RouterModule, RouterLink, DepartmentFormComponent], encapsulation: 2 }));
var CreateDepartmentComponent = _CreateDepartmentComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateDepartmentComponent, [{
    type: Component,
    args: [{
      selector: "app-create-department",
      standalone: true,
      imports: [RouterModule, DepartmentFormComponent],
      template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('department.create') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/departments">{{ i18n.t('departments.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('department.create') }}</li>
            </ol>
          </nav>
        </div>
        <button 
          type="button" 
          class="btn btn-outline-secondary"
          (click)="onCancel()">
          <i class="fa-solid fa-arrow-left me-2"></i>
          {{ i18n.t('common.back') }}
        </button>
      </div>

      @if (error()) {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() }}
        </div>
      }

      <!-- Main Form Card -->
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">
            <i class="fa-solid fa-building me-2"></i>
            {{ i18n.t('department.information') }}
          </h5>
        </div>
        <div class="card-body">
          <app-department-form
            [externalSaving]="saving()"
            (save)="onDepartmentCreated($event)"
            (cancel)="onCancel()">
          </app-department-form>
        </div>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateDepartmentComponent, { className: "CreateDepartmentComponent", filePath: "src/app/pages/departments/create-department/create-department.component.ts", lineNumber: 66 });
})();
export {
  CreateDepartmentComponent
};
//# sourceMappingURL=chunk-DCS6Q65A.js.map
