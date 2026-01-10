import {
  DepartmentFormComponent
} from "./chunk-2BSO4TCC.js";
import "./chunk-2D23Y7U6.js";
import "./chunk-JTLHOQFH.js";
import "./chunk-Z44KTAEC.js";
import {
  DepartmentsService
} from "./chunk-OU7DT47F.js";
import "./chunk-5B6AVE4S.js";
import "./chunk-VATI3GP6.js";
import "./chunk-GYSVNBR7.js";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
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
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/departments/edit-department/edit-department.component.ts
function EditDepartmentComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 12)(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
  }
}
__name(EditDepartmentComponent_Conditional_18_Template, "EditDepartmentComponent_Conditional_18_Template");
function EditDepartmentComponent_Conditional_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(EditDepartmentComponent_Conditional_19_Conditional_0_Template, "EditDepartmentComponent_Conditional_19_Conditional_0_Template");
function EditDepartmentComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, EditDepartmentComponent_Conditional_19_Conditional_0_Template, 3, 1, "div", 11);
    \u0275\u0275elementStart(1, "div", 14)(2, "div", 15)(3, "h5", 16);
    \u0275\u0275element(4, "i", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 18)(7, "app-department-form", 19);
    \u0275\u0275listener("save", /* @__PURE__ */ __name(function EditDepartmentComponent_Conditional_19_Template_app_department_form_save_7_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentSaved($event));
    }, "EditDepartmentComponent_Conditional_19_Template_app_department_form_save_7_listener"))("cancel", /* @__PURE__ */ __name(function EditDepartmentComponent_Conditional_19_Template_app_department_form_cancel_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditDepartmentComponent_Conditional_19_Template_app_department_form_cancel_7_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.error() ? 0 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("department.information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("department", ctx_r0.department())("branchId", ((tmp_4_0 = ctx_r0.department()) == null ? null : tmp_4_0.branchId) || null)("isEditMode", true)("externalSaving", ctx_r0.saving());
  }
}
__name(EditDepartmentComponent_Conditional_19_Template, "EditDepartmentComponent_Conditional_19_Template");
function EditDepartmentComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.i18n.t("department.not_found"), " ");
  }
}
__name(EditDepartmentComponent_Conditional_20_Template, "EditDepartmentComponent_Conditional_20_Template");
var _EditDepartmentComponent = class _EditDepartmentComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  departmentsService = inject(DepartmentsService);
  i18n = inject(I18nService);
  department = signal(null, ...ngDevMode ? [{ debugName: "department" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  ngOnInit() {
    const departmentId = this.route.snapshot.paramMap.get("id");
    if (departmentId) {
      this.loadDepartment(departmentId);
    } else {
      this.error.set("Invalid department ID");
      this.loading.set(false);
    }
  }
  loadDepartment(departmentId) {
    this.departmentsService.getDepartmentById(+departmentId).subscribe({
      next: /* @__PURE__ */ __name((department) => {
        this.department.set(department);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }, "error")
    });
  }
  onDepartmentSaved(department) {
    if (this.saving() || !this.department())
      return;
    this.saving.set(true);
    this.error.set("");
    const departmentId = this.department().id;
    const updateRequest = department;
    this.departmentsService.updateDepartment(departmentId, updateRequest).subscribe({
      next: /* @__PURE__ */ __name(() => {
        console.log("Department updated successfully");
        this.saving.set(false);
        this.router.navigate(["/departments"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error updating department:", error);
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
__name(_EditDepartmentComponent, "EditDepartmentComponent");
__publicField(_EditDepartmentComponent, "\u0275fac", /* @__PURE__ */ __name(function EditDepartmentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditDepartmentComponent)();
}, "EditDepartmentComponent_Factory"));
__publicField(_EditDepartmentComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditDepartmentComponent, selectors: [["app-edit-department"]], decls: 21, vars: 6, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/dashboard"], ["routerLink", "/departments"], [1, "breadcrumb-item", "active"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fa-solid", "fa-arrow-left", "me-2"], [1, "d-flex", "justify-content-center", "py-5"], [1, "alert", "alert-danger"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fa-solid", "fa-building", "me-2"], [1, "card-body"], [3, "save", "cancel", "department", "branchId", "isEditMode", "externalSaving"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function EditDepartmentComponent_Template(rf, ctx) {
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
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditDepartmentComponent_Template_button_click_15_listener() {
      return ctx.onCancel();
    }, "EditDepartmentComponent_Template_button_click_15_listener"));
    \u0275\u0275element(16, "i", 9);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, EditDepartmentComponent_Conditional_18_Template, 4, 1, "div", 10)(19, EditDepartmentComponent_Conditional_19_Template, 8, 6)(20, EditDepartmentComponent_Conditional_20_Template, 3, 1, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.edit"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.i18n.t("dashboard.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("departments.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.edit"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 18 : ctx.department() ? 19 : 20);
  }
}, "EditDepartmentComponent_Template"), dependencies: [RouterModule, RouterLink, DepartmentFormComponent], encapsulation: 2 }));
var EditDepartmentComponent = _EditDepartmentComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditDepartmentComponent, [{
    type: Component,
    args: [{
      selector: "app-edit-department",
      standalone: true,
      imports: [RouterModule, DepartmentFormComponent],
      template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('department.edit') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/departments">{{ i18n.t('departments.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('department.edit') }}</li>
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

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
          </div>
        </div>
      } @else if (department()) {
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
              [department]="department()"
              [branchId]="department()?.branchId || null"
              [isEditMode]="true"
              [externalSaving]="saving()"
              (save)="onDepartmentSaved($event)"
              (cancel)="onCancel()">
            </app-department-form>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('department.not_found') }}
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditDepartmentComponent, { className: "EditDepartmentComponent", filePath: "src/app/pages/departments/edit-department/edit-department.component.ts", lineNumber: 82 });
})();
export {
  EditDepartmentComponent
};
//# sourceMappingURL=chunk-GC6XIXB5.js.map
