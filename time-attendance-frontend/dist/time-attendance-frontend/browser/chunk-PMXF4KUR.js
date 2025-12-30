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
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import {
  API_CONFIG,
  AuthService
} from "./chunk-HZ2IZU2F.js";
import {
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  HttpClient,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/auth/change-password.component.ts
function ChangePasswordComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "i", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "button", 27);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ChangePasswordComponent_Conditional_13_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.error.set(""));
    }, "ChangePasswordComponent_Conditional_13_Template_button_click_3_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
__name(ChangePasswordComponent_Conditional_13_Template, "ChangePasswordComponent_Conditional_13_Template");
function ChangePasswordComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("validation.required_field"), " ");
  }
}
__name(ChangePasswordComponent_Conditional_20_Template, "ChangePasswordComponent_Conditional_20_Template");
function ChangePasswordComponent_Conditional_27_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("validation.required_field"), " ");
  }
}
__name(ChangePasswordComponent_Conditional_27_Conditional_1_Template, "ChangePasswordComponent_Conditional_27_Conditional_1_Template");
function ChangePasswordComponent_Conditional_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("auth.password_min_length"), " ");
  }
}
__name(ChangePasswordComponent_Conditional_27_Conditional_2_Template, "ChangePasswordComponent_Conditional_27_Conditional_2_Template");
function ChangePasswordComponent_Conditional_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("auth.password_requirements"), " ");
  }
}
__name(ChangePasswordComponent_Conditional_27_Conditional_3_Template, "ChangePasswordComponent_Conditional_27_Conditional_3_Template");
function ChangePasswordComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275conditionalCreate(1, ChangePasswordComponent_Conditional_27_Conditional_1_Template, 1, 1);
    \u0275\u0275conditionalCreate(2, ChangePasswordComponent_Conditional_27_Conditional_2_Template, 1, 1);
    \u0275\u0275conditionalCreate(3, ChangePasswordComponent_Conditional_27_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r1.changePasswordForm.get("newPassword")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.changePasswordForm.get("newPassword")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_3_0 = ctx_r1.changePasswordForm.get("newPassword")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["pattern"]) ? 3 : -1);
  }
}
__name(ChangePasswordComponent_Conditional_27_Template, "ChangePasswordComponent_Conditional_27_Template");
function ChangePasswordComponent_Conditional_36_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("validation.required_field"), " ");
  }
}
__name(ChangePasswordComponent_Conditional_36_Conditional_1_Template, "ChangePasswordComponent_Conditional_36_Conditional_1_Template");
function ChangePasswordComponent_Conditional_36_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("auth.passwords_dont_match"), " ");
  }
}
__name(ChangePasswordComponent_Conditional_36_Conditional_2_Template, "ChangePasswordComponent_Conditional_36_Conditional_2_Template");
function ChangePasswordComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275conditionalCreate(1, ChangePasswordComponent_Conditional_36_Conditional_1_Template, 1, 1);
    \u0275\u0275conditionalCreate(2, ChangePasswordComponent_Conditional_36_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r1.changePasswordForm.get("confirmPassword")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.changePasswordForm.get("confirmPassword")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["passwordMismatch"]) ? 2 : -1);
  }
}
__name(ChangePasswordComponent_Conditional_36_Template, "ChangePasswordComponent_Conditional_36_Template");
function ChangePasswordComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 22);
  }
}
__name(ChangePasswordComponent_Conditional_38_Template, "ChangePasswordComponent_Conditional_38_Template");
var _ChangePasswordComponent = class _ChangePasswordComponent {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  changePasswordForm;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  constructor() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ["", [Validators.required]],
      newPassword: ["", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      ]],
      confirmPassword: ["", [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form) {
    const newPassword = form.get("newPassword");
    const confirmPassword = form.get("confirmPassword");
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (confirmPassword && !confirmPassword.hasError("required")) {
      confirmPassword.setErrors(null);
    }
    return null;
  }
  t(key) {
    return this.i18n.t(key);
  }
  onSubmit() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set("");
    const request = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword
    };
    this.http.post(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.changePassword}`, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.loading.set(false);
        this.notificationService.success(this.t("auth.password_changed_success"), "You can now continue using the system");
        this.router.navigate(["/dashboard"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        const errorMessage = error.error?.error || this.t("auth.password_change_failed");
        this.error.set(errorMessage);
        this.notificationService.error(this.t("auth.password_change_failed"), errorMessage);
      }, "error")
    });
  }
  onLogout() {
    this.authService.logout();
  }
};
__name(_ChangePasswordComponent, "ChangePasswordComponent");
__publicField(_ChangePasswordComponent, "\u0275fac", /* @__PURE__ */ __name(function ChangePasswordComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ChangePasswordComponent)();
}, "ChangePasswordComponent_Factory"));
__publicField(_ChangePasswordComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangePasswordComponent, selectors: [["app-change-password"]], decls: 44, vars: 21, consts: [[1, "min-vh-100", "d-flex", "align-items-center", "justify-content-center", "bg-light"], [1, "container"], [1, "row", "justify-content-center"], [1, "col-md-6", "col-lg-5"], [1, "card", "shadow-sm"], [1, "card-body", "p-4"], [1, "text-center", "mb-4"], [1, "fa-solid", "fa-key", "fa-3x", "text-warning", "mb-3"], [1, "mb-2"], [1, "text-muted"], [3, "ngSubmit", "formGroup"], ["role", "alert", 1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], [1, "mb-3"], [1, "form-label"], [1, "text-danger"], ["type", "password", "formControlName", "currentPassword", 1, "form-control"], [1, "invalid-feedback"], ["type", "password", "formControlName", "newPassword", 1, "form-control"], [1, "form-text", "text-muted"], [1, "mb-4"], ["type", "password", "formControlName", "confirmPassword", 1, "form-control"], ["type", "submit", 1, "btn", "btn-warning", "w-100", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "text-center", "mt-3"], ["type", "button", 1, "btn", "btn-link", "text-muted", 3, "click"], [1, "fa-solid", "fa-sign-out-alt", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], ["type", "button", 1, "btn-close", 3, "click"]], template: /* @__PURE__ */ __name(function ChangePasswordComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6);
    \u0275\u0275element(7, "i", 7);
    \u0275\u0275elementStart(8, "h4", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 9);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "form", 10);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function ChangePasswordComponent_Template_form_ngSubmit_12_listener() {
      return ctx.onSubmit();
    }, "ChangePasswordComponent_Template_form_ngSubmit_12_listener"));
    \u0275\u0275conditionalCreate(13, ChangePasswordComponent_Conditional_13_Template, 4, 1, "div", 11);
    \u0275\u0275elementStart(14, "div", 12)(15, "label", 13);
    \u0275\u0275text(16);
    \u0275\u0275elementStart(17, "span", 14);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(19, "input", 15);
    \u0275\u0275conditionalCreate(20, ChangePasswordComponent_Conditional_20_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 12)(22, "label", 13);
    \u0275\u0275text(23);
    \u0275\u0275elementStart(24, "span", 14);
    \u0275\u0275text(25, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(26, "input", 17);
    \u0275\u0275conditionalCreate(27, ChangePasswordComponent_Conditional_27_Template, 4, 3, "div", 16);
    \u0275\u0275elementStart(28, "small", 18);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 19)(31, "label", 13);
    \u0275\u0275text(32);
    \u0275\u0275elementStart(33, "span", 14);
    \u0275\u0275text(34, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(35, "input", 20);
    \u0275\u0275conditionalCreate(36, ChangePasswordComponent_Conditional_36_Template, 3, 2, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 21);
    \u0275\u0275conditionalCreate(38, ChangePasswordComponent_Conditional_38_Template, 1, 0, "span", 22);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 23)(41, "button", 24);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ChangePasswordComponent_Template_button_click_41_listener() {
      return ctx.onLogout();
    }, "ChangePasswordComponent_Template_button_click_41_listener"));
    \u0275\u0275element(42, "i", 25);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()()()()()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_12_0;
    let tmp_13_0;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.t("auth.change_password_required"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("auth.change_password_message"));
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx.changePasswordForm);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("auth.current_password"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ((tmp_5_0 = ctx.changePasswordForm.get("currentPassword")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.changePasswordForm.get("currentPassword")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_6_0 = ctx.changePasswordForm.get("currentPassword")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.changePasswordForm.get("currentPassword")) == null ? null : tmp_6_0.touched) ? 20 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("auth.new_password"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ((tmp_8_0 = ctx.changePasswordForm.get("newPassword")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.changePasswordForm.get("newPassword")) == null ? null : tmp_8_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_9_0 = ctx.changePasswordForm.get("newPassword")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.changePasswordForm.get("newPassword")) == null ? null : tmp_9_0.touched) ? 27 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("auth.password_requirements"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("auth.confirm_new_password"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ((tmp_12_0 = ctx.changePasswordForm.get("confirmPassword")) == null ? null : tmp_12_0.invalid) && ((tmp_12_0 = ctx.changePasswordForm.get("confirmPassword")) == null ? null : tmp_12_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_13_0 = ctx.changePasswordForm.get("confirmPassword")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx.changePasswordForm.get("confirmPassword")) == null ? null : tmp_13_0.touched) ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading() || ctx.changePasswordForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("auth.change_password"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("auth.logout"), " ");
  }
}, "ChangePasswordComponent_Template"), dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=change-password.component.css.map */"] }));
var ChangePasswordComponent = _ChangePasswordComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangePasswordComponent, [{
    type: Component,
    args: [{ selector: "app-change-password", standalone: true, imports: [ReactiveFormsModule], template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card shadow-sm">
              <div class="card-body p-4">
                <div class="text-center mb-4">
                  <i class="fa-solid fa-key fa-3x text-warning mb-3"></i>
                  <h4 class="mb-2">{{ t('auth.change_password_required') }}</h4>
                  <p class="text-muted">{{ t('auth.change_password_message') }}</p>
                </div>

                <form [formGroup]="changePasswordForm" (ngSubmit)="onSubmit()">
                  @if (error()) {
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                      <i class="fa-solid fa-exclamation-triangle me-2"></i>
                      {{ error() }}
                      <button type="button" class="btn-close" (click)="error.set('')"></button>
                    </div>
                  }

                  <!-- Current Password -->
                  <div class="mb-3">
                    <label class="form-label">{{ t('auth.current_password') }} <span class="text-danger">*</span></label>
                    <input
                      type="password"
                      class="form-control"
                      formControlName="currentPassword"
                      [class.is-invalid]="changePasswordForm.get('currentPassword')?.invalid && changePasswordForm.get('currentPassword')?.touched"
                    />
                    @if (changePasswordForm.get('currentPassword')?.invalid && changePasswordForm.get('currentPassword')?.touched) {
                      <div class="invalid-feedback">
                        {{ t('validation.required_field') }}
                      </div>
                    }
                  </div>

                  <!-- New Password -->
                  <div class="mb-3">
                    <label class="form-label">{{ t('auth.new_password') }} <span class="text-danger">*</span></label>
                    <input
                      type="password"
                      class="form-control"
                      formControlName="newPassword"
                      [class.is-invalid]="changePasswordForm.get('newPassword')?.invalid && changePasswordForm.get('newPassword')?.touched"
                    />
                    @if (changePasswordForm.get('newPassword')?.invalid && changePasswordForm.get('newPassword')?.touched) {
                      <div class="invalid-feedback">
                        @if (changePasswordForm.get('newPassword')?.errors?.['required']) {
                          {{ t('validation.required_field') }}
                        }
                        @if (changePasswordForm.get('newPassword')?.errors?.['minlength']) {
                          {{ t('auth.password_min_length') }}
                        }
                        @if (changePasswordForm.get('newPassword')?.errors?.['pattern']) {
                          {{ t('auth.password_requirements') }}
                        }
                      </div>
                    }
                    <small class="form-text text-muted">
                      {{ t('auth.password_requirements') }}
                    </small>
                  </div>

                  <!-- Confirm Password -->
                  <div class="mb-4">
                    <label class="form-label">{{ t('auth.confirm_new_password') }} <span class="text-danger">*</span></label>
                    <input
                      type="password"
                      class="form-control"
                      formControlName="confirmPassword"
                      [class.is-invalid]="changePasswordForm.get('confirmPassword')?.invalid && changePasswordForm.get('confirmPassword')?.touched"
                    />
                    @if (changePasswordForm.get('confirmPassword')?.invalid && changePasswordForm.get('confirmPassword')?.touched) {
                      <div class="invalid-feedback">
                        @if (changePasswordForm.get('confirmPassword')?.errors?.['required']) {
                          {{ t('validation.required_field') }}
                        }
                        @if (changePasswordForm.get('confirmPassword')?.errors?.['passwordMismatch']) {
                          {{ t('auth.passwords_dont_match') }}
                        }
                      </div>
                    }
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    class="btn btn-warning w-100"
                    [disabled]="loading() || changePasswordForm.invalid"
                  >
                    @if (loading()) {
                      <span class="spinner-border spinner-border-sm me-2"></span>
                    }
                    {{ t('auth.change_password') }}
                  </button>

                  <!-- Logout Option -->
                  <div class="text-center mt-3">
                    <button type="button" class="btn btn-link text-muted" (click)="onLogout()">
                      <i class="fa-solid fa-sign-out-alt me-2"></i>
                      {{ t('auth.logout') }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;219558ef63f119a92210704329b58a3cdceaa4fb296db559e672f74512827dc7;D:/Work/AI Code/TimeAttendanceSystem/time-attendance-frontend/src/app/pages/auth/change-password.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=change-password.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangePasswordComponent, { className: "ChangePasswordComponent", filePath: "src/app/pages/auth/change-password.component.ts", lineNumber: 134 });
})();
export {
  ChangePasswordComponent
};
//# sourceMappingURL=chunk-PMXF4KUR.js.map
