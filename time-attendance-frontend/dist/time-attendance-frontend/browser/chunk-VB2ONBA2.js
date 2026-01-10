import {
  RemoteWorkRequestStatus,
  RemoteWorkRequestsService
} from "./chunk-P7VFNCII.js";
import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
import {
  SearchableSelectComponent
} from "./chunk-2D23Y7U6.js";
import {
  FormSectionComponent
} from "./chunk-JTLHOQFH.js";
import {
  EmployeesService
} from "./chunk-5B6AVE4S.js";
import "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/remote-work/edit-remote-work/edit-remote-work.component.ts
function EditRemoteWorkComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
__name(EditRemoteWorkComponent_Conditional_2_Template, "EditRemoteWorkComponent_Conditional_2_Template");
function EditRemoteWorkComponent_Conditional_3_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.errors.start_date_required"), " ");
  }
}
__name(EditRemoteWorkComponent_Conditional_3_Conditional_16_Template, "EditRemoteWorkComponent_Conditional_3_Conditional_16_Template");
function EditRemoteWorkComponent_Conditional_3_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.errors.end_date_required"), " ");
  }
}
__name(EditRemoteWorkComponent_Conditional_3_Conditional_24_Template, "EditRemoteWorkComponent_Conditional_3_Conditional_24_Template");
function EditRemoteWorkComponent_Conditional_3_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 20);
  }
}
__name(EditRemoteWorkComponent_Conditional_3_Conditional_35_Template, "EditRemoteWorkComponent_Conditional_3_Conditional_35_Template");
function EditRemoteWorkComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 3);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditRemoteWorkComponent_Conditional_3_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    }, "EditRemoteWorkComponent_Conditional_3_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "app-form-section", 4)(2, "div", 5)(3, "label", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "span", 7);
    \u0275\u0275text(6, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 8)(8, "app-searchable-select", 9);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function EditRemoteWorkComponent_Conditional_3_Template_app_searchable_select_selectionChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEmployeeSelectionChange($event));
    }, "EditRemoteWorkComponent_Conditional_3_Template_app_searchable_select_selectionChange_8_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 5)(10, "label", 10);
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "span", 7);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 8);
    \u0275\u0275element(15, "input", 11);
    \u0275\u0275conditionalCreate(16, EditRemoteWorkComponent_Conditional_3_Conditional_16_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 5)(18, "label", 13);
    \u0275\u0275text(19);
    \u0275\u0275elementStart(20, "span", 7);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 8);
    \u0275\u0275element(23, "input", 14);
    \u0275\u0275conditionalCreate(24, EditRemoteWorkComponent_Conditional_3_Conditional_24_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 5)(26, "label", 15);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 8)(29, "textarea", 16);
    \u0275\u0275text(30, "            ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(31, "div", 17)(32, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditRemoteWorkComponent_Conditional_3_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancel());
    }, "EditRemoteWorkComponent_Conditional_3_Template_button_click_32_listener"));
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 19);
    \u0275\u0275conditionalCreate(35, EditRemoteWorkComponent_Conditional_3_Conditional_35_Template, 1, 0, "span", 20);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_11_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_16_0;
    let tmp_17_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r1.i18n.t("remoteWork.request.details"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.employee"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("options", ctx_r1.employeeOptions())("value", (tmp_5_0 = ctx_r1.form.get("employeeId")) == null ? null : tmp_5_0.value)("placeholder", ctx_r1.i18n.t("remoteWork.request.select_employee"))("searchable", false)("clearable", false)("required", true)("disabled", true)("isInvalid", !!(((tmp_11_0 = ctx_r1.form.get("employeeId")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx_r1.form.get("employeeId")) == null ? null : tmp_11_0.touched)));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.startDate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", ((tmp_13_0 = ctx_r1.form.get("startDate")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx_r1.form.get("startDate")) == null ? null : tmp_13_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_14_0 = ctx_r1.form.get("startDate")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx_r1.form.get("startDate")) == null ? null : tmp_14_0.touched) ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.endDate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", ((tmp_16_0 = ctx_r1.form.get("endDate")) == null ? null : tmp_16_0.invalid) && ((tmp_16_0 = ctx_r1.form.get("endDate")) == null ? null : tmp_16_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_17_0 = ctx_r1.form.get("endDate")) == null ? null : tmp_17_0.invalid) && ((tmp_17_0 = ctx_r1.form.get("endDate")) == null ? null : tmp_17_0.touched) ? 24 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.reason"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t("remoteWork.request.reason_placeholder"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.submitting() || ctx_r1.form.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.submitting() ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.save"), " ");
  }
}
__name(EditRemoteWorkComponent_Conditional_3_Template, "EditRemoteWorkComponent_Conditional_3_Template");
var _EditRemoteWorkComponent = class _EditRemoteWorkComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  remoteWorkService = inject(RemoteWorkRequestsService);
  employeesService = inject(EmployeesService);
  notification = inject(NotificationService);
  i18n = inject(I18nService);
  form;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : []);
  requestId = signal(null, ...ngDevMode ? [{ debugName: "requestId" }] : []);
  employeeOptions = computed(() => this.employees().map((emp) => ({
    value: emp.id,
    label: `${emp.name} (${emp.employeeNumber})`
  })), ...ngDevMode ? [{ debugName: "employeeOptions" }] : []);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.requestId.set(parseInt(id, 10));
      this.initializeForm();
      this.loadEmployees();
      this.loadRequest();
    } else {
      this.notification.error(this.i18n.t("remoteWork.request.errors.not_found"));
      this.router.navigate(["/remote-work"]);
    }
  }
  initializeForm() {
    this.form = this.fb.group({
      employeeId: [{ value: null, disabled: true }, Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      reason: [""],
      status: [{ value: RemoteWorkRequestStatus.Pending, disabled: true }],
      rejectionReason: [{ value: "", disabled: true }]
    });
  }
  loadEmployees() {
    this.employeesService.getEmployeesForSelection().subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.employees.set(employees);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading employees:", error);
        this.notification.error(this.i18n.t("remoteWork.request.errors.load_employees_failed"));
      }, "error")
    });
  }
  loadRequest() {
    const id = this.requestId();
    if (!id)
      return;
    this.loading.set(true);
    this.remoteWorkService.getById(id).subscribe({
      next: /* @__PURE__ */ __name((request) => {
        this.form.patchValue({
          employeeId: request.employeeId,
          startDate: request.startDate,
          endDate: request.endDate,
          reason: request.reason || "",
          status: request.status,
          rejectionReason: request.rejectionReason || ""
        });
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name(() => {
        this.notification.error(this.i18n.t("remoteWork.request.errors.load_failed"));
        this.loading.set(false);
        this.router.navigate(["/remote-work"]);
      }, "error")
    });
  }
  onEmployeeSelectionChange(employeeId) {
    const id = employeeId ? typeof employeeId === "number" ? employeeId : parseInt(employeeId) : null;
    this.form.patchValue({ employeeId: id });
    this.form.get("employeeId")?.markAsTouched();
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notification.warning(this.i18n.t("app.checkForm"));
      return;
    }
    const id = this.requestId();
    if (!id) {
      this.notification.error(this.i18n.t("remoteWork.request.errors.not_found"));
      return;
    }
    this.submitting.set(true);
    const formValue = this.form.getRawValue();
    const updateRequest = {
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      reason: formValue.reason || "",
      status: formValue.status,
      rejectionReason: formValue.rejectionReason || ""
    };
    this.remoteWorkService.update(id, updateRequest).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notification.success(this.i18n.t("remoteWork.request.success.updated"));
        this.router.navigate(["/remote-work/view", id]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error updating remote work request:", error);
        const errorMessage = error?.error?.error || this.i18n.t("remoteWork.request.errors.update_failed");
        this.notification.error(errorMessage);
        this.submitting.set(false);
      }, "error")
    });
  }
  onCancel() {
    const id = this.requestId();
    if (id) {
      this.router.navigate(["/remote-work", id, "view"]);
    } else {
      this.router.navigate(["/remote-work"]);
    }
  }
};
__name(_EditRemoteWorkComponent, "EditRemoteWorkComponent");
__publicField(_EditRemoteWorkComponent, "\u0275fac", /* @__PURE__ */ __name(function EditRemoteWorkComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditRemoteWorkComponent)();
}, "EditRemoteWorkComponent_Factory"));
__publicField(_EditRemoteWorkComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditRemoteWorkComponent, selectors: [["app-edit-remote-work"]], decls: 4, vars: 4, consts: [[1, "edit-remote-work-page"], ["mode", "edit", "moduleName", "remoteWork.request", "moduleRoute", "remote-work", 3, "title", "entityId"], [3, "formGroup"], [3, "ngSubmit", "formGroup"], [3, "title"], [1, "row", "mb-3"], [1, "col-sm-3", "col-form-label"], [1, "text-danger"], [1, "col-sm-9"], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable", "required", "disabled", "isInvalid"], ["for", "startDate", 1, "col-sm-3", "col-form-label"], ["type", "date", "id", "startDate", "formControlName", "startDate", 1, "form-control"], [1, "invalid-feedback"], ["for", "endDate", 1, "col-sm-3", "col-form-label"], ["type", "date", "id", "endDate", "formControlName", "endDate", 1, "form-control"], ["for", "reason", 1, "col-sm-3", "col-form-label"], ["id", "reason", "formControlName", "reason", "rows", "3", 1, "form-control", 3, "placeholder"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: /* @__PURE__ */ __name(function EditRemoteWorkComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, EditRemoteWorkComponent_Conditional_2_Template, 1, 0, "app-loading-spinner");
    \u0275\u0275conditionalCreate(3, EditRemoteWorkComponent_Conditional_3_Template, 37, 26, "form", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("remoteWork.request.edit"))("entityId", ctx.requestId() ?? void 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() ? 3 : -1);
  }
}, "EditRemoteWorkComponent_Template"), dependencies: [
  ReactiveFormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  FormControlName,
  FormHeaderComponent,
  FormSectionComponent,
  SearchableSelectComponent,
  LoadingSpinnerComponent
], styles: ["\n\n.edit-remote-work-page[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.form-control[_ngcontent-%COMP%]:disabled {\n  background-color: #e9ecef;\n  cursor: not-allowed;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=edit-remote-work.component.css.map */"] }));
var EditRemoteWorkComponent = _EditRemoteWorkComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditRemoteWorkComponent, [{
    type: Component,
    args: [{ selector: "app-edit-remote-work", standalone: true, imports: [
      ReactiveFormsModule,
      FormHeaderComponent,
      FormSectionComponent,
      SearchableSelectComponent,
      LoadingSpinnerComponent
    ], template: `<div class="edit-remote-work-page">\r
  <!-- Form Header -->\r
  <app-form-header\r
    mode="edit"\r
    [title]="i18n.t('remoteWork.request.edit')"\r
    moduleName="remoteWork.request"\r
    moduleRoute="remote-work"\r
    [entityId]="requestId() ?? undefined">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <app-loading-spinner></app-loading-spinner>\r
  }\r
\r
  <!-- Edit Form -->\r
  @if (!loading()) {\r
    <form [formGroup]="form" (ngSubmit)="onSubmit()">\r
      <!-- Remote Work Details -->\r
      <app-form-section [title]="i18n.t('remoteWork.request.details')">\r
        <!-- Employee Selection (Disabled) -->\r
        <div class="row mb-3">\r
          <label class="col-sm-3 col-form-label">\r
            {{ i18n.t('remoteWork.request.employee') }}\r
            <span class="text-danger">*</span>\r
          </label>\r
          <div class="col-sm-9">\r
            <app-searchable-select\r
              [options]="employeeOptions()"\r
              [value]="form.get('employeeId')?.value"\r
              [placeholder]="i18n.t('remoteWork.request.select_employee')"\r
              [searchable]="false"\r
              [clearable]="false"\r
              [required]="true"\r
              [disabled]="true"\r
              [isInvalid]="!!(form.get('employeeId')?.invalid && form.get('employeeId')?.touched)"\r
              (selectionChange)="onEmployeeSelectionChange($event)">\r
            </app-searchable-select>\r
          </div>\r
        </div>\r
\r
        <!-- Start Date -->\r
        <div class="row mb-3">\r
          <label for="startDate" class="col-sm-3 col-form-label">\r
            {{ i18n.t('remoteWork.request.startDate') }}\r
            <span class="text-danger">*</span>\r
          </label>\r
          <div class="col-sm-9">\r
            <input\r
              type="date"\r
              id="startDate"\r
              class="form-control"\r
              formControlName="startDate"\r
              [class.is-invalid]="form.get('startDate')?.invalid && form.get('startDate')?.touched">\r
            @if (form.get('startDate')?.invalid && form.get('startDate')?.touched) {\r
              <div class="invalid-feedback">\r
                {{ i18n.t('remoteWork.request.errors.start_date_required') }}\r
              </div>\r
            }\r
          </div>\r
        </div>\r
\r
        <!-- End Date -->\r
        <div class="row mb-3">\r
          <label for="endDate" class="col-sm-3 col-form-label">\r
            {{ i18n.t('remoteWork.request.endDate') }}\r
            <span class="text-danger">*</span>\r
          </label>\r
          <div class="col-sm-9">\r
            <input\r
              type="date"\r
              id="endDate"\r
              class="form-control"\r
              formControlName="endDate"\r
              [class.is-invalid]="form.get('endDate')?.invalid && form.get('endDate')?.touched">\r
            @if (form.get('endDate')?.invalid && form.get('endDate')?.touched) {\r
              <div class="invalid-feedback">\r
                {{ i18n.t('remoteWork.request.errors.end_date_required') }}\r
              </div>\r
            }\r
          </div>\r
        </div>\r
\r
        <!-- Reason -->\r
        <div class="row mb-3">\r
          <label for="reason" class="col-sm-3 col-form-label">\r
            {{ i18n.t('remoteWork.request.reason') }}\r
          </label>\r
          <div class="col-sm-9">\r
            <textarea\r
              id="reason"\r
              class="form-control"\r
              formControlName="reason"\r
              rows="3"\r
              [placeholder]="i18n.t('remoteWork.request.reason_placeholder')">\r
            </textarea>\r
          </div>\r
        </div>\r
      </app-form-section>\r
\r
      <!-- Form Actions -->\r
      <div class="d-flex justify-content-end gap-2 mt-4">\r
        <button\r
          type="button"\r
          class="btn btn-secondary"\r
          (click)="onCancel()"\r
          [disabled]="submitting()">\r
          {{ i18n.t('common.cancel') }}\r
        </button>\r
        <button\r
          type="submit"\r
          class="btn btn-primary"\r
          [disabled]="submitting() || form.invalid">\r
          @if (submitting()) {\r
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
          }\r
          {{ i18n.t('common.save') }}\r
        </button>\r
      </div>\r
    </form>\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/remote-work/edit-remote-work/edit-remote-work.component.css */\n.edit-remote-work-page {\n  padding: 20px;\n}\n.form-control:disabled {\n  background-color: #e9ecef;\n  cursor: not-allowed;\n}\n.invalid-feedback {\n  display: block;\n}\n/*# sourceMappingURL=edit-remote-work.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditRemoteWorkComponent, { className: "EditRemoteWorkComponent", filePath: "src/app/pages/remote-work/edit-remote-work/edit-remote-work.component.ts", lineNumber: 28 });
})();
export {
  EditRemoteWorkComponent
};
//# sourceMappingURL=chunk-VB2ONBA2.js.map
