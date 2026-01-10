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
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import {
  AuthService
} from "./chunk-O2IS3HK2.js";
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/remote-work/assign-remote-work/assign-remote-work.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
function AssignRemoteWorkComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
__name(AssignRemoteWorkComponent_Conditional_2_Template, "AssignRemoteWorkComponent_Conditional_2_Template");
function AssignRemoteWorkComponent_Conditional_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.validation.employee_required"), " ");
  }
}
__name(AssignRemoteWorkComponent_Conditional_3_Conditional_8_Template, "AssignRemoteWorkComponent_Conditional_3_Conditional_8_Template");
function AssignRemoteWorkComponent_Conditional_3_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.validation.start_date_required"), " ");
  }
}
__name(AssignRemoteWorkComponent_Conditional_3_Conditional_15_Template, "AssignRemoteWorkComponent_Conditional_3_Conditional_15_Template");
function AssignRemoteWorkComponent_Conditional_3_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.validation.end_date_required"), " ");
  }
}
__name(AssignRemoteWorkComponent_Conditional_3_Conditional_20_Template, "AssignRemoteWorkComponent_Conditional_3_Conditional_20_Template");
function AssignRemoteWorkComponent_Conditional_3_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    \u0275\u0275property("value", option_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r3.label);
  }
}
__name(AssignRemoteWorkComponent_Conditional_3_For_31_Template, "AssignRemoteWorkComponent_Conditional_3_For_31_Template");
function AssignRemoteWorkComponent_Conditional_3_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.validation.status_required"), " ");
  }
}
__name(AssignRemoteWorkComponent_Conditional_3_Conditional_32_Template, "AssignRemoteWorkComponent_Conditional_3_Conditional_32_Template");
function AssignRemoteWorkComponent_Conditional_3_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
  }
}
__name(AssignRemoteWorkComponent_Conditional_3_Conditional_44_Template, "AssignRemoteWorkComponent_Conditional_3_Conditional_44_Template");
function AssignRemoteWorkComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "form", 4);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function AssignRemoteWorkComponent_Conditional_3_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    }, "AssignRemoteWorkComponent_Conditional_3_Template_form_ngSubmit_2_listener"));
    \u0275\u0275elementStart(3, "app-form-section", 5)(4, "div", 6)(5, "label", 7);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "app-searchable-select", 8);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignRemoteWorkComponent_Conditional_3_Template_app_searchable_select_selectionChange_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEmployeeSelectionChange($event));
    }, "AssignRemoteWorkComponent_Conditional_3_Template_app_searchable_select_selectionChange_7_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, AssignRemoteWorkComponent_Conditional_3_Conditional_8_Template, 2, 1, "div", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "app-form-section", 5)(10, "div", 10)(11, "div", 11)(12, "label", 7);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 12);
    \u0275\u0275conditionalCreate(15, AssignRemoteWorkComponent_Conditional_3_Conditional_15_Template, 2, 1, "div", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 11)(17, "label", 7);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 13);
    \u0275\u0275conditionalCreate(20, AssignRemoteWorkComponent_Conditional_3_Conditional_20_Template, 2, 1, "div", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 6)(22, "label", 14);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 15);
    \u0275\u0275text(25, "              ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 6)(27, "label", 7);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "select", 16);
    \u0275\u0275repeaterCreate(30, AssignRemoteWorkComponent_Conditional_3_For_31_Template, 2, 2, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(32, AssignRemoteWorkComponent_Conditional_3_Conditional_32_Template, 2, 1, "div", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 6)(34, "label", 14);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "textarea", 18);
    \u0275\u0275text(37, "              ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 19);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 20)(41, "button", 21);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignRemoteWorkComponent_Conditional_3_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancel());
    }, "AssignRemoteWorkComponent_Conditional_3_Template_button_click_41_listener"));
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 22);
    \u0275\u0275conditionalCreate(44, AssignRemoteWorkComponent_Conditional_3_Conditional_44_Template, 1, 0, "span", 23);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    let tmp_10_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_16_0;
    let tmp_17_0;
    let tmp_21_0;
    let tmp_23_0;
    let tmp_26_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r1.i18n.t("remoteWork.request.employee_information"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.request.employee"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ((tmp_4_0 = ctx_r1.form.get("employeeId")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.form.get("employeeId")) == null ? null : tmp_4_0.touched));
    \u0275\u0275property("options", ctx_r1.employeeOptions())("value", (tmp_6_0 = ctx_r1.form.get("employeeId")) == null ? null : tmp_6_0.value)("placeholder", ctx_r1.i18n.t("remoteWork.request.select_employee"))("searchable", true)("clearable", false);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_10_0 = ctx_r1.form.get("employeeId")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx_r1.form.get("employeeId")) == null ? null : tmp_10_0.touched) ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r1.i18n.t("remoteWork.request.remote_work_details"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.request.startDate"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ((tmp_13_0 = ctx_r1.form.get("startDate")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx_r1.form.get("startDate")) == null ? null : tmp_13_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_14_0 = ctx_r1.form.get("startDate")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx_r1.form.get("startDate")) == null ? null : tmp_14_0.touched) ? 15 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.request.endDate"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ((tmp_16_0 = ctx_r1.form.get("endDate")) == null ? null : tmp_16_0.invalid) && ((tmp_16_0 = ctx_r1.form.get("endDate")) == null ? null : tmp_16_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_17_0 = ctx_r1.form.get("endDate")) == null ? null : tmp_17_0.invalid) && ((tmp_17_0 = ctx_r1.form.get("endDate")) == null ? null : tmp_17_0.touched) ? 20 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.request.reason"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r1.i18n.t("remoteWork.request.reason_placeholder"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.status"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ((tmp_21_0 = ctx_r1.form.get("status")) == null ? null : tmp_21_0.invalid) && ((tmp_21_0 = ctx_r1.form.get("status")) == null ? null : tmp_21_0.touched));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.statusOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_23_0 = ctx_r1.form.get("status")) == null ? null : tmp_23_0.invalid) && ((tmp_23_0 = ctx_r1.form.get("status")) == null ? null : tmp_23_0.touched) ? 32 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.request.approval_comments"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r1.i18n.t("remoteWork.request.approval_comments_placeholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ((tmp_26_0 = ctx_r1.form.get("approvalComments")) == null ? null : tmp_26_0.value == null ? null : tmp_26_0.value.length) || 0, "/1000 ", ctx_r1.i18n.t("common.characters"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.form.invalid || ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.submitting() ? 44 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.create"), " ");
  }
}
__name(AssignRemoteWorkComponent_Conditional_3_Template, "AssignRemoteWorkComponent_Conditional_3_Template");
var _AssignRemoteWorkComponent = class _AssignRemoteWorkComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  remoteWorkService = inject(RemoteWorkRequestsService);
  employeesService = inject(EmployeesService);
  notification = inject(NotificationService);
  authService = inject(AuthService);
  i18n = inject(I18nService);
  form;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : []);
  employeeOptions = computed(() => this.employees().map((emp) => ({
    value: emp.id,
    label: `${emp.name} (${emp.employeeNumber})`
  })), ...ngDevMode ? [{ debugName: "employeeOptions" }] : []);
  statusOptions = [
    { value: RemoteWorkRequestStatus.Pending, label: this.i18n.t("remoteWork.status.pending") },
    { value: RemoteWorkRequestStatus.Approved, label: this.i18n.t("remoteWork.status.approved") },
    { value: RemoteWorkRequestStatus.Rejected, label: this.i18n.t("remoteWork.status.rejected") },
    { value: RemoteWorkRequestStatus.Cancelled, label: this.i18n.t("remoteWork.status.cancelled") }
  ];
  ngOnInit() {
    this.initializeForm();
    this.loadEmployees();
  }
  initializeForm() {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      reason: [""],
      status: [RemoteWorkRequestStatus.Approved, Validators.required],
      approvalComments: [""]
    });
  }
  loadEmployees() {
    this.loading.set(true);
    this.employeesService.getEmployeesForSelection().subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.employees.set(employees);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading employees:", error);
        this.notification.error(this.i18n.t("remoteWork.request.errors.load_employees_failed"));
        this.loading.set(false);
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
    const currentUser = this.authService.currentUser();
    if (!currentUser?.id) {
      this.notification.error(this.i18n.t("auth.session_expired"));
      return;
    }
    this.submitting.set(true);
    const formValue = this.form.value;
    const request = __spreadProps(__spreadValues({}, formValue), {
      createdByUserId: currentUser.id
    });
    this.remoteWorkService.create(request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notification.success(this.i18n.t("remoteWork.request.success.created"));
        this.router.navigate(["/remote-work"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error creating remote work request:", error);
        this.notification.error(this.i18n.t("remoteWork.request.errors.create_failed"));
        this.submitting.set(false);
      }, "error")
    });
  }
  onCancel() {
    this.router.navigate(["/remote-work"]);
  }
};
__name(_AssignRemoteWorkComponent, "AssignRemoteWorkComponent");
__publicField(_AssignRemoteWorkComponent, "\u0275fac", /* @__PURE__ */ __name(function AssignRemoteWorkComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AssignRemoteWorkComponent)();
}, "AssignRemoteWorkComponent_Factory"));
__publicField(_AssignRemoteWorkComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssignRemoteWorkComponent, selectors: [["app-assign-remote-work"]], decls: 4, vars: 3, consts: [[1, "container-fluid"], ["mode", "create", "moduleName", "remoteWork.request", "moduleRoute", "remote-work", 3, "title"], [1, "card"], [1, "card-body"], [3, "ngSubmit", "formGroup"], [3, "title"], [1, "mb-3"], [1, "form-label", "required"], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable"], [1, "invalid-feedback"], [1, "row"], [1, "col-md-6", "mb-3"], ["type", "date", "formControlName", "startDate", 1, "form-control"], ["type", "date", "formControlName", "endDate", 1, "form-control"], [1, "form-label"], ["formControlName", "reason", "rows", "3", 1, "form-control", 3, "placeholder"], ["formControlName", "status", 1, "form-select"], [3, "value"], ["formControlName", "approvalComments", "rows", "3", "maxlength", "1000", 1, "form-control", 3, "placeholder"], [1, "form-text"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"]], template: /* @__PURE__ */ __name(function AssignRemoteWorkComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, AssignRemoteWorkComponent_Conditional_2_Template, 1, 0, "app-loading-spinner");
    \u0275\u0275conditionalCreate(3, AssignRemoteWorkComponent_Conditional_3_Template, 46, 35, "div", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("remoteWork.request.create"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() ? 3 : -1);
  }
}, "AssignRemoteWorkComponent_Template"), dependencies: [
  ReactiveFormsModule,
  \u0275NgNoValidate,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DefaultValueAccessor,
  SelectControlValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  MaxLengthValidator,
  FormGroupDirective,
  FormControlName,
  FormHeaderComponent,
  FormSectionComponent,
  SearchableSelectComponent,
  LoadingSpinnerComponent
], styles: ['\n\n.assign-remote-work-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.form-label.required[_ngcontent-%COMP%]::after {\n  content: " *";\n  color: var(--bs-danger);\n}\n/*# sourceMappingURL=assign-remote-work.component.css.map */'] }));
var AssignRemoteWorkComponent = _AssignRemoteWorkComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AssignRemoteWorkComponent, [{
    type: Component,
    args: [{ selector: "app-assign-remote-work", standalone: true, imports: [
      ReactiveFormsModule,
      FormHeaderComponent,
      FormSectionComponent,
      SearchableSelectComponent,
      LoadingSpinnerComponent
    ], template: `<div class="container-fluid">\r
  <!-- Form Header -->\r
  <app-form-header\r
    mode="create"\r
    [title]="i18n.t('remoteWork.request.create')"\r
    moduleName="remoteWork.request"\r
    moduleRoute="remote-work">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <app-loading-spinner></app-loading-spinner>\r
  }\r
\r
  <!-- Form Content -->\r
  @if (!loading()) {\r
    <div class="card">\r
      <div class="card-body">\r
        <form [formGroup]="form" (ngSubmit)="onSubmit()">\r
          <!-- Employee Information Section -->\r
          <app-form-section [title]="i18n.t('remoteWork.request.employee_information')">\r
            <!-- Employee Selection -->\r
            <div class="mb-3">\r
              <label class="form-label required">{{ i18n.t('remoteWork.request.employee') }}</label>\r
              <app-searchable-select\r
                [options]="employeeOptions()"\r
                [value]="form.get('employeeId')?.value"\r
                (selectionChange)="onEmployeeSelectionChange($event)"\r
                [placeholder]="i18n.t('remoteWork.request.select_employee')"\r
                [searchable]="true"\r
                [clearable]="false"\r
                [class.is-invalid]="form.get('employeeId')?.invalid && form.get('employeeId')?.touched">\r
              </app-searchable-select>\r
              @if (form.get('employeeId')?.invalid && form.get('employeeId')?.touched) {\r
                <div class="invalid-feedback">\r
                  {{ i18n.t('remoteWork.request.validation.employee_required') }}\r
                </div>\r
              }\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Remote Work Details Section -->\r
          <app-form-section [title]="i18n.t('remoteWork.request.remote_work_details')">\r
            <!-- Date Range -->\r
            <div class="row">\r
              <div class="col-md-6 mb-3">\r
                <label class="form-label required">{{ i18n.t('remoteWork.request.startDate') }}</label>\r
                <input\r
                  type="date"\r
                  class="form-control"\r
                  formControlName="startDate"\r
                  [class.is-invalid]="form.get('startDate')?.invalid && form.get('startDate')?.touched">\r
                @if (form.get('startDate')?.invalid && form.get('startDate')?.touched) {\r
                  <div class="invalid-feedback">\r
                    {{ i18n.t('remoteWork.request.validation.start_date_required') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <div class="col-md-6 mb-3">\r
                <label class="form-label required">{{ i18n.t('remoteWork.request.endDate') }}</label>\r
                <input\r
                  type="date"\r
                  class="form-control"\r
                  formControlName="endDate"\r
                  [class.is-invalid]="form.get('endDate')?.invalid && form.get('endDate')?.touched">\r
                @if (form.get('endDate')?.invalid && form.get('endDate')?.touched) {\r
                  <div class="invalid-feedback">\r
                    {{ i18n.t('remoteWork.request.validation.end_date_required') }}\r
                  </div>\r
                }\r
              </div>\r
            </div>\r
\r
            <!-- Reason -->\r
            <div class="mb-3">\r
              <label class="form-label">{{ i18n.t('remoteWork.request.reason') }}</label>\r
              <textarea\r
                class="form-control"\r
                formControlName="reason"\r
                rows="3"\r
                [placeholder]="i18n.t('remoteWork.request.reason_placeholder')">\r
              </textarea>\r
            </div>\r
\r
            <!-- Status -->\r
            <div class="mb-3">\r
              <label class="form-label required">{{ i18n.t('common.status') }}</label>\r
              <select\r
                class="form-select"\r
                formControlName="status"\r
                [class.is-invalid]="form.get('status')?.invalid && form.get('status')?.touched">\r
                @for (option of statusOptions; track option.value) {\r
                  <option [value]="option.value">{{ option.label }}</option>\r
                }\r
              </select>\r
              @if (form.get('status')?.invalid && form.get('status')?.touched) {\r
                <div class="invalid-feedback">\r
                  {{ i18n.t('remoteWork.request.validation.status_required') }}\r
                </div>\r
              }\r
            </div>\r
\r
            <!-- Approval Comments -->\r
            <div class="mb-3">\r
              <label class="form-label">{{ i18n.t('remoteWork.request.approval_comments') }}</label>\r
              <textarea\r
                class="form-control"\r
                formControlName="approvalComments"\r
                rows="3"\r
                maxlength="1000"\r
                [placeholder]="i18n.t('remoteWork.request.approval_comments_placeholder')">\r
              </textarea>\r
              <div class="form-text">\r
                {{ form.get('approvalComments')?.value?.length || 0 }}/1000 {{ i18n.t('common.characters') }}\r
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
              [disabled]="form.invalid || submitting()">\r
              @if (submitting()) {\r
                <span class="spinner-border spinner-border-sm me-2"></span>\r
              }\r
              {{ i18n.t('remoteWork.request.create') }}\r
            </button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/remote-work/assign-remote-work/assign-remote-work.component.css */\n.assign-remote-work-page {\n  padding: 1.5rem;\n}\n.form-label.required::after {\n  content: " *";\n  color: var(--bs-danger);\n}\n/*# sourceMappingURL=assign-remote-work.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssignRemoteWorkComponent, { className: "AssignRemoteWorkComponent", filePath: "src/app/pages/remote-work/assign-remote-work/assign-remote-work.component.ts", lineNumber: 29 });
})();
export {
  AssignRemoteWorkComponent
};
//# sourceMappingURL=chunk-MPJPXTZJ.js.map
