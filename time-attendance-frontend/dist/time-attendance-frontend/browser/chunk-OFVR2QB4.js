import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import {
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
  Input,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/ui/form-field/form-field.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
function FormFieldComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.icon, " me-1"));
  }
}
__name(FormFieldComponent_Conditional_2_Template, "FormFieldComponent_Conditional_2_Template");
function FormFieldComponent_Conditional_4_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r2 = ctx.$implicit;
    \u0275\u0275property("value", option_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r2.label);
  }
}
__name(FormFieldComponent_Conditional_4_For_4_Template, "FormFieldComponent_Conditional_4_For_4_Template");
function FormFieldComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 8)(1, "option", 9);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, FormFieldComponent_Conditional_4_For_4_Template, 2, 2, "option", 10, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("is-invalid", ctx_r0.isInvalid);
    \u0275\u0275property("id", ctx_r0.fieldId)("formControl", ctx_r0.control);
    \u0275\u0275attribute("aria-describedby", ctx_r0.help ? ctx_r0.fieldId + "-help" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.placeholder);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.options);
  }
}
__name(FormFieldComponent_Conditional_4_Template, "FormFieldComponent_Conditional_4_Template");
function FormFieldComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "textarea", 11);
    \u0275\u0275text(1, "    ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("is-invalid", ctx_r0.isInvalid);
    \u0275\u0275property("id", ctx_r0.fieldId)("formControl", ctx_r0.control)("placeholder", ctx_r0.placeholder);
    \u0275\u0275attribute("aria-describedby", ctx_r0.help ? ctx_r0.fieldId + "-help" : null);
  }
}
__name(FormFieldComponent_Conditional_5_Template, "FormFieldComponent_Conditional_5_Template");
function FormFieldComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 12);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("is-invalid", ctx_r0.isInvalid);
    \u0275\u0275property("id", ctx_r0.fieldId)("type", ctx_r0.type)("formControl", ctx_r0.control)("placeholder", ctx_r0.placeholder);
    \u0275\u0275attribute("aria-describedby", ctx_r0.help ? ctx_r0.fieldId + "-help" : null);
  }
}
__name(FormFieldComponent_Conditional_6_Template, "FormFieldComponent_Conditional_6_Template");
function FormFieldComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("id", ctx_r0.fieldId + "-help");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.help);
  }
}
__name(FormFieldComponent_Conditional_7_Template, "FormFieldComponent_Conditional_7_Template");
function FormFieldComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
__name(FormFieldComponent_Conditional_8_Template, "FormFieldComponent_Conditional_8_Template");
var _FormFieldComponent = class _FormFieldComponent {
  label = "";
  control;
  placeholder = "";
  help = "";
  type = "text";
  icon = "";
  options = [];
  fieldId;
  constructor() {
    this.fieldId = `field-${++_FormFieldComponent.fieldCounter}`;
  }
  get isInvalid() {
    return !!(this.control?.invalid && (this.control?.dirty || this.control?.touched));
  }
  get errorMessage() {
    if (!this.control?.errors)
      return "";
    const errors = this.control.errors;
    if (errors["required"])
      return `${this.label} is required`;
    if (errors["email"])
      return "Please enter a valid email address";
    if (errors["minlength"])
      return `${this.label} must be at least ${errors["minlength"].requiredLength} characters`;
    if (errors["maxlength"])
      return `${this.label} must not exceed ${errors["maxlength"].requiredLength} characters`;
    if (errors["pattern"])
      return `${this.label} format is invalid`;
    return "This field is invalid";
  }
};
__name(_FormFieldComponent, "FormFieldComponent");
__publicField(_FormFieldComponent, "fieldCounter", 0);
__publicField(_FormFieldComponent, "\u0275fac", /* @__PURE__ */ __name(function FormFieldComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FormFieldComponent)();
}, "FormFieldComponent_Factory"));
__publicField(_FormFieldComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormFieldComponent, selectors: [["app-form-field"]], inputs: { label: "label", control: "control", placeholder: "placeholder", help: "help", type: "type", icon: "icon", options: "options" }, decls: 9, vars: 6, consts: [[1, "mb-3"], [1, "form-label", 3, "for"], [3, "class"], [1, "form-select", 3, "id", "is-invalid", "formControl"], ["rows", "3", 1, "form-control", 3, "id", "is-invalid", "formControl", "placeholder"], [1, "form-control", 3, "id", "type", "is-invalid", "formControl", "placeholder"], [1, "form-text", 3, "id"], [1, "invalid-feedback"], [1, "form-select", 3, "id", "formControl"], ["value", ""], [3, "value"], ["rows", "3", 1, "form-control", 3, "id", "formControl", "placeholder"], [1, "form-control", 3, "id", "type", "formControl", "placeholder"]], template: /* @__PURE__ */ __name(function FormFieldComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "label", 1);
    \u0275\u0275conditionalCreate(2, FormFieldComponent_Conditional_2_Template, 1, 3, "i", 2);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, FormFieldComponent_Conditional_4_Template, 5, 6, "select", 3)(5, FormFieldComponent_Conditional_5_Template, 2, 6, "textarea", 4)(6, FormFieldComponent_Conditional_6_Template, 1, 7, "input", 5);
    \u0275\u0275conditionalCreate(7, FormFieldComponent_Conditional_7_Template, 2, 2, "div", 6);
    \u0275\u0275conditionalCreate(8, FormFieldComponent_Conditional_8_Template, 2, 1, "div", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("for", ctx.fieldId);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.icon ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.type === "select" ? 4 : ctx.type === "textarea" ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.help ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isInvalid ? 8 : -1);
  }
}, "FormFieldComponent_Template"), dependencies: [ReactiveFormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, FormControlDirective], styles: ["\n\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-secondary);\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: var(--bs-danger);\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.875rem;\n  color: var(--bs-danger);\n  margin-top: 0.25rem;\n}\n/*# sourceMappingURL=form-field.component.css.map */"] }));
var FormFieldComponent = _FormFieldComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormFieldComponent, [{
    type: Component,
    args: [{ selector: "app-form-field", standalone: true, imports: [ReactiveFormsModule], template: `<div class="mb-3">
  <label [for]="fieldId" class="form-label">
    @if (icon) {
      <i class="{{ icon }} me-1"></i>
    }
    {{ label }}
  </label>
  
  @if (type === 'select') {
    <select
      [id]="fieldId"
      class="form-select"
      [class.is-invalid]="isInvalid"
      [formControl]="control"
      [attr.aria-describedby]="help ? fieldId + '-help' : null">
      <option value="">{{ placeholder }}</option>
      @for (option of options; track option.value) {
        <option [value]="option.value">{{ option.label }}</option>
      }
    </select>
  } @else if (type === 'textarea') {
    <textarea
      [id]="fieldId"
      class="form-control"
      [class.is-invalid]="isInvalid"
      [formControl]="control"
      [placeholder]="placeholder"
      [attr.aria-describedby]="help ? fieldId + '-help' : null"
      rows="3">
    </textarea>
  } @else {
    <input
      [id]="fieldId"
      [type]="type"
      class="form-control"
      [class.is-invalid]="isInvalid"
      [formControl]="control"
      [placeholder]="placeholder"
      [attr.aria-describedby]="help ? fieldId + '-help' : null">
  }
  
  @if (help) {
    <div [id]="fieldId + '-help'" class="form-text">{{ help }}</div>
  }
  
  @if (isInvalid) {
    <div class="invalid-feedback">{{ errorMessage }}</div>
  }
</div>`, styles: ["/* src/app/shared/ui/form-field/form-field.component.css */\n.form-label {\n  font-weight: 500;\n}\n.form-text {\n  font-size: 0.875rem;\n  color: var(--bs-secondary);\n}\n.is-invalid {\n  border-color: var(--bs-danger);\n}\n.invalid-feedback {\n  display: block;\n  font-size: 0.875rem;\n  color: var(--bs-danger);\n  margin-top: 0.25rem;\n}\n/*# sourceMappingURL=form-field.component.css.map */\n"] }]
  }], () => [], { label: [{
    type: Input
  }], control: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], help: [{
    type: Input
  }], type: [{
    type: Input
  }], icon: [{
    type: Input
  }], options: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormFieldComponent, { className: "FormFieldComponent", filePath: "src/app/shared/ui/form-field/form-field.component.ts", lineNumber: 12 });
})();

// src/app/pages/auth/login.component.ts
function LoginComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(LoginComponent_Conditional_8_Template, "LoginComponent_Conditional_8_Template");
function LoginComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
__name(LoginComponent_Conditional_17_Template, "LoginComponent_Conditional_17_Template");
var _LoginComponent = class _LoginComponent {
  fb;
  authService;
  router;
  i18n;
  /** Injected notification service for user feedback */
  notificationService = inject(NotificationService);
  /** Reactive form for login credentials input */
  loginForm;
  /** Signal for loading state during authentication */
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  /** Signal for displaying authentication errors */
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  /**
   * Initializes the login component with form setup and authentication check.
   *
   * @param fb - Angular FormBuilder for creating reactive forms
   * @param authService - Authentication service for login operations
   * @param router - Angular Router for navigation after login
   * @param i18n - Internationalization service for localized text
   */
  constructor(fb, authService, router, i18n) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.i18n = i18n;
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      rememberMe: [false]
    });
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/dashboard"]);
    }
  }
  /**
   * Retrieves localized text for the specified translation key.
   * Provides convenient shorthand for internationalization service.
   *
   * @param key - Translation key for localized text
   * @returns Localized text string for current language
   *
   * @example
   * ```typescript
   * const title = this.t('auth.login_title'); // Returns localized login title
   * ```
   */
  t(key) {
    return this.i18n.t(key);
  }
  /**
   * Handles login form submission with validation and authentication.
   * Implements secure login flow with comprehensive error handling and user feedback.
   *
   * @remarks
   * Login Process:
   * 1. Validates form inputs (client-side validation)
   * 2. Sets loading state to prevent multiple submissions
   * 3. Calls authentication service with form data
   * 4. Handles success with notification and redirect
   * 5. Handles errors with user-friendly messages
   * 6. Resets loading state on completion
   *
   * Validation Features:
   * - Required field validation for username and password
   * - Form state management with touched/dirty states
   * - Visual feedback for validation errors
   * - Prevention of invalid form submission
   *
   * Security Considerations:
   * - Generic error messages prevent credential enumeration
   * - Loading state prevents rapid-fire login attempts
   * - Client-side validation enhances UX but relies on server validation
   * - Error logging for debugging without exposing sensitive data
   *
   * User Experience:
   * - Immediate visual feedback during authentication
   * - Success notifications provide positive confirmation
   * - Error messages guide user to resolve issues
   * - Automatic redirect on successful authentication
   */
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set("");
    this.authService.login(this.loginForm.value).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        if (response.mustChangePassword) {
          this.notificationService.warning(this.t("auth.must_change_password"), "Please change your password to continue");
          this.router.navigate(["/auth/change-password"]);
        } else {
          this.notificationService.success(this.t("auth.login_success"), "Welcome back!");
          this.router.navigate(["/dashboard"]);
        }
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        this.error.set(this.t("auth.invalid_credentials"));
        console.error("Login failed:", error);
        this.notificationService.error(this.t("auth.invalid_credentials"), "Please check your username and password");
      }, "error")
    });
  }
  /**
   * Gets strongly-typed reference to username form control.
   * Provides type safety and convenient access for validation and value binding.
   *
   * @returns FormControl instance for username input
   *
   * @remarks
   * Used for:
   * - Template binding and validation display
   * - Accessing control state (valid, invalid, touched, dirty)
   * - Getting current value and validation errors
   * - Programmatic control manipulation if needed
   *
   * @example
   * ```html
   * <input [formControl]="usernameControl" />
   * <div *ngIf="usernameControl.invalid && usernameControl.touched">
   *   Username is required
   * </div>
   * ```
   */
  get usernameControl() {
    return this.loginForm.get("username");
  }
  /**
   * Gets strongly-typed reference to password form control.
   * Provides type safety and convenient access for validation and value binding.
   *
   * @returns FormControl instance for password input
   *
   * @remarks
   * Security Considerations:
   * - Password values are handled securely by FormControl
   * - No password values logged or exposed in component
   * - Validation feedback doesn't reveal password requirements
   * - Auto-completion and password managers supported
   */
  get passwordControl() {
    return this.loginForm.get("password");
  }
  /**
   * Toggles the application language between English and Arabic.
   * Provides bilingual support with immediate UI language switching.
   *
   * @remarks
   * Language Switching Features:
   * - Toggles between 'en' (English) and 'ar' (Arabic)
   * - Immediate UI update with new language
   * - Persistent language preference across sessions
   * - RTL (Right-to-Left) support for Arabic language
   *
   * Internationalization Benefits:
   * - Improves accessibility for diverse user base
   * - Enhances user experience with native language
   * - Supports business requirements for multilingual systems
   * - Enables localized form validation messages
   *
   * Implementation Details:
   * - Uses i18n service for language management
   * - Triggers reactive updates across the application
   * - Maintains form state during language switches
   * - Preserves user input during language changes
   */
  onSwitchLanguage() {
    const newLocale = this.i18n.getCurrentLocale() === "en" ? "ar" : "en";
    this.i18n.setLocale(newLocale);
  }
};
__name(_LoginComponent, "LoginComponent");
__publicField(_LoginComponent, "\u0275fac", /* @__PURE__ */ __name(function LoginComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(I18nService));
}, "LoginComponent_Factory"));
__publicField(_LoginComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 26, vars: 15, consts: [[1, "login-container"], [1, "login-card"], [1, "login-header", "text-center", "mb-4"], [1, "fa-solid", "fa-clock", "fa-3x", "text-primary", "mb-3"], [1, "h3", "mb-2"], [1, "text-muted"], ["role", "alert", 1, "alert", "alert-danger"], ["novalidate", "", 3, "ngSubmit", "formGroup"], ["type", "text", "icon", "fa-solid fa-user", 3, "label", "control", "placeholder"], ["type", "password", "icon", "fa-solid fa-lock", 3, "label", "control", "placeholder"], [1, "mb-3", "form-check"], ["type", "checkbox", "id", "rememberMe", "formControlName", "rememberMe", 1, "form-check-input"], ["for", "rememberMe", 1, "form-check-label"], ["type", "submit", 1, "btn", "btn-primary", "w-100", "mb-3", 3, "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "text-center"], ["href", "#", 1, "text-decoration-none", 3, "click"], [1, "login-footer", "mt-4", "pt-3", "border-top", "text-center"], ["type", "button", 1, "btn", "btn-link", "btn-sm", 3, "click"], [1, "fa-solid", "fa-globe", "me-1"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function LoginComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275element(3, "i", 3);
    \u0275\u0275elementStart(4, "h1", 4);
    \u0275\u0275text(5, "Time Attendance System");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 5);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, LoginComponent_Conditional_8_Template, 3, 1, "div", 6);
    \u0275\u0275elementStart(9, "form", 7);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function LoginComponent_Template_form_ngSubmit_9_listener() {
      return ctx.onSubmit();
    }, "LoginComponent_Template_form_ngSubmit_9_listener"));
    \u0275\u0275element(10, "app-form-field", 8)(11, "app-form-field", 9);
    \u0275\u0275elementStart(12, "div", 10);
    \u0275\u0275element(13, "input", 11);
    \u0275\u0275elementStart(14, "label", 12);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 13);
    \u0275\u0275conditionalCreate(17, LoginComponent_Conditional_17_Template, 1, 0, "span", 14);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 15)(20, "a", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LoginComponent_Template_a_click_20_listener($event) {
      return $event.preventDefault();
    }, "LoginComponent_Template_a_click_20_listener"));
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 17)(23, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LoginComponent_Template_button_click_23_listener() {
      return ctx.onSwitchLanguage();
    }, "LoginComponent_Template_button_click_23_listener"));
    \u0275\u0275element(24, "i", 19);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.t("auth.login"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx.loginForm);
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx.t("auth.username"))("control", ctx.usernameControl)("placeholder", ctx.t("auth.username"));
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx.t("auth.password"))("control", ctx.passwordControl)("placeholder", ctx.t("auth.password"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("auth.remember_me"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading() || ctx.loginForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("auth.login"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("auth.forgot_password"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.getCurrentLocale() === "en" ? "\u0639\u0631\u0628\u064A" : "English", " ");
  }
}, "LoginComponent_Template"), dependencies: [ReactiveFormsModule, \u0275NgNoValidate, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormFieldComponent], styles: ["\n\n.login-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 1rem;\n}\n.login-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 1rem;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);\n  padding: 2rem;\n  width: 100%;\n  max-width: 400px;\n}\n.login-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.login-header[_ngcontent-%COMP%]   .fa-clock[_ngcontent-%COMP%] {\n  color: var(--bs-primary);\n}\n.login-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--bs-dark);\n}\n.login-footer[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--bs-border-color);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-weight: 600;\n  border-radius: 0.5rem;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  border: none;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-1[_ngcontent-%COMP%] {\n  margin-left: 0.25rem !important;\n  margin-right: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-2[_ngcontent-%COMP%] {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n@media (max-width: 576px) {\n  .login-container[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .login-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .login-header[_ngcontent-%COMP%]   .fa-clock[_ngcontent-%COMP%] {\n    font-size: 2rem !important;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */"] }));
var LoginComponent = _LoginComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [ReactiveFormsModule, FormFieldComponent], template: `<div class="login-container">
  <div class="login-card">
    <div class="login-header text-center mb-4">
      <i class="fa-solid fa-clock fa-3x text-primary mb-3"></i>
      <h1 class="h3 mb-2">Time Attendance System</h1>
      <p class="text-muted">{{ t('auth.login') }}</p>
    </div>

    @if (error()) {
      <div class="alert alert-danger" role="alert">
        <i class="fa-solid fa-exclamation-triangle me-2"></i>
        {{ error() }}
      </div>
    }

    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
      <app-form-field
        [label]="t('auth.username')"
        [control]="usernameControl"
        [placeholder]="t('auth.username')"
        type="text"
        icon="fa-solid fa-user">
      </app-form-field>

      <app-form-field
        [label]="t('auth.password')"
        [control]="passwordControl"
        [placeholder]="t('auth.password')"
        type="password"
        icon="fa-solid fa-lock">
      </app-form-field>

      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="rememberMe"
          formControlName="rememberMe">
        <label class="form-check-label" for="rememberMe">
          {{ t('auth.remember_me') }}
        </label>
      </div>

      <button
        type="submit"
        class="btn btn-primary w-100 mb-3"
        [disabled]="loading() || loginForm.invalid">
        @if (loading()) {
          <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        }
        {{ t('auth.login') }}
      </button>

      <div class="text-center">
        <a href="#" class="text-decoration-none" (click)="$event.preventDefault()">
          {{ t('auth.forgot_password') }}
        </a>
      </div>
    </form>

    <div class="login-footer mt-4 pt-3 border-top text-center">
      <button
        type="button"
        class="btn btn-link btn-sm"
        (click)="onSwitchLanguage()">
        <i class="fa-solid fa-globe me-1"></i>
        {{ i18n.getCurrentLocale() === 'en' ? '\u0639\u0631\u0628\u064A' : 'English' }}
      </button>
    </div>
  </div>
</div>`, styles: ["/* src/app/pages/auth/login.component.css */\n.login-container {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 1rem;\n}\n.login-card {\n  background: white;\n  border-radius: 1rem;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);\n  padding: 2rem;\n  width: 100%;\n  max-width: 400px;\n}\n.login-header {\n  margin-bottom: 2rem;\n}\n.login-header .fa-clock {\n  color: var(--bs-primary);\n}\n.login-header h1 {\n  font-weight: 700;\n  color: var(--bs-dark);\n}\n.login-footer {\n  border-top: 1px solid var(--bs-border-color);\n}\n.btn-primary {\n  padding: 0.75rem 1rem;\n  font-weight: 600;\n  border-radius: 0.5rem;\n}\n.form-check-input:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.alert {\n  border-radius: 0.5rem;\n  border: none;\n}\n:root[dir=rtl] .me-1 {\n  margin-left: 0.25rem !important;\n  margin-right: 0 !important;\n}\n:root[dir=rtl] .me-2 {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n@media (max-width: 576px) {\n  .login-container {\n    padding: 0.5rem;\n  }\n  .login-card {\n    padding: 1.5rem;\n  }\n  .login-header .fa-clock {\n    font-size: 2rem !important;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: Router }, { type: I18nService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/auth/login.component.ts", lineNumber: 54 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-OFVR2QB4.js.map
