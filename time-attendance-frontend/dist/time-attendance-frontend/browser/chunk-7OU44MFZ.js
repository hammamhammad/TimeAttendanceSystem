import {
  PermissionService
} from "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
import {
  AuthService
} from "./chunk-O2IS3HK2.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  Component,
  computed,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/settings/settings.component.ts
function SettingsComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "div", 10)(3, "div", 11)(4, "div", 43);
    \u0275\u0275element(5, "i", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h6", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small", 15);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "p", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 17)(14, "a", 45);
    \u0275\u0275element(15, "i", 26);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.holidays.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.holidays.subtitle"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.holidays.description"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.configure"), " ");
  }
}
__name(SettingsComponent_Conditional_64_Template, "SettingsComponent_Conditional_64_Template");
function SettingsComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "div", 10)(3, "div", 11)(4, "div", 46);
    \u0275\u0275element(5, "i", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h6", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small", 15);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "p", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 17)(14, "a", 48);
    \u0275\u0275element(15, "i", 26);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.t("vacation_types.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("vacation_types.management_subtitle"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("vacation_types.settings_description"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.configure"), " ");
  }
}
__name(SettingsComponent_Conditional_65_Template, "SettingsComponent_Conditional_65_Template");
function SettingsComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "div", 10)(3, "div", 11)(4, "div", 49);
    \u0275\u0275element(5, "i", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h6", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small", 15);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "p", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 17)(14, "a", 51);
    \u0275\u0275element(15, "i", 26);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.t("excuse_policies.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("excuse_policies.subtitle"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("excuse_policies.settings_description"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.configure"), " ");
  }
}
__name(SettingsComponent_Conditional_66_Template, "SettingsComponent_Conditional_66_Template");
function SettingsComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "div", 10)(3, "div", 11)(4, "div", 52);
    \u0275\u0275element(5, "i", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h6", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small", 15);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "p", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 17)(14, "a", 54);
    \u0275\u0275element(15, "i", 26);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.subtitle"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("workflows.settings_description"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.configure"), " ");
  }
}
__name(SettingsComponent_Conditional_67_Template, "SettingsComponent_Conditional_67_Template");
var _SettingsComponent = class _SettingsComponent {
  i18n;
  authService;
  permissionService;
  currentUser = computed(() => this.authService.currentUser(), ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  constructor(i18n, authService, permissionService) {
    this.i18n = i18n;
    this.authService = authService;
    this.permissionService = permissionService;
  }
  t(key) {
    return this.i18n.t(key);
  }
  hasPermission(permission) {
    return this.permissionService.has(permission);
  }
  onLanguageChange(locale) {
    this.i18n.setLocale(locale);
  }
};
__name(_SettingsComponent, "SettingsComponent");
__publicField(_SettingsComponent, "\u0275fac", /* @__PURE__ */ __name(function SettingsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SettingsComponent)(\u0275\u0275directiveInject(I18nService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(PermissionService));
}, "SettingsComponent_Factory"));
__publicField(_SettingsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["app-settings"]], decls: 117, vars: 32, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-1"], [1, "text-muted", "mb-0"], [1, "row"], [1, "col-12", "mb-4"], [1, "text-primary", "mb-3"], [1, "bi", "bi-gear", "me-2"], [1, "col-lg-4", "col-md-6", "mb-3"], [1, "card", "h-100", "border-hover"], [1, "card-body", "d-flex", "flex-column"], [1, "d-flex", "align-items-center", "mb-3"], [1, "bg-light", "rounded-3", "p-2", "me-3"], [1, "bi", "bi-shield-lock", "text-primary", 2, "font-size", "1.5rem"], [1, "mb-0"], [1, "text-muted"], [1, "text-muted", "flex-grow-1"], [1, "mt-auto"], ["disabled", "", 1, "btn", "btn-outline-secondary", "btn-sm", "w-100"], [1, "bi", "bi-tools", "me-1"], [1, "bg-info", "bg-gradient", "rounded-3", "p-2", "me-3"], [1, "bi", "bi-envelope", "text-white", 2, "font-size", "1.5rem"], ["disabled", "", 1, "btn", "btn-outline-info", "btn-sm", "w-100"], [1, "bg-warning", "bg-gradient", "rounded-3", "p-2", "me-3"], [1, "fa-solid", "fa-clock", "text-white", 2, "font-size", "1.5rem"], ["routerLink", "/settings/overtime", 1, "btn", "btn-outline-warning", "btn-sm", "w-100"], [1, "fa-solid", "fa-cog", "me-1"], [1, "bi", "bi-person-gear", "me-2"], [1, "col-lg-6", "mb-3"], [1, "card"], [1, "card-header"], [1, "bi", "bi-translate", "me-2"], [1, "card-body"], [1, "form-check", "mb-2"], ["type", "radio", "name", "language", "id", "langEn", 1, "form-check-input", 3, "change", "checked"], ["for", "langEn", 1, "form-check-label"], [1, "bi", "bi-flag", "me-2"], [1, "form-check"], ["type", "radio", "name", "language", "id", "langAr", 1, "form-check-input", 3, "change", "checked"], ["for", "langAr", 1, "form-check-label"], [1, "bi", "bi-person-circle", "me-2"], [1, "mb-2"], [1, "badge", "bg-success", "ms-1"], [1, "bg-success", "bg-gradient", "rounded-3", "p-2", "me-3"], [1, "fa-solid", "fa-calendar-check", "text-white", 2, "font-size", "1.5rem"], ["routerLink", "/settings/public-holidays", 1, "btn", "btn-outline-success", "btn-sm", "w-100"], [1, "bg-primary", "bg-gradient", "rounded-3", "p-2", "me-3"], [1, "fa-solid", "fa-calendar-alt", "text-white", 2, "font-size", "1.5rem"], ["routerLink", "/vacation-types", 1, "btn", "btn-outline-primary", "btn-sm", "w-100"], [1, "bg-danger", "bg-gradient", "rounded-3", "p-2", "me-3"], [1, "fa-solid", "fa-user-clock", "text-white", 2, "font-size", "1.5rem"], ["routerLink", "/settings/excuse-policies", 1, "btn", "btn-outline-danger", "btn-sm", "w-100"], [1, "bg-secondary", "bg-gradient", "rounded-3", "p-2", "me-3"], [1, "fa-solid", "fa-project-diagram", "text-white", 2, "font-size", "1.5rem"], ["routerLink", "/settings/workflows", 1, "btn", "btn-outline-secondary", "btn-sm", "w-100"]], template: /* @__PURE__ */ __name(function SettingsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "h4", 6);
    \u0275\u0275element(10, "i", 7);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 4)(13, "div", 8)(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "div", 12);
    \u0275\u0275element(18, "i", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div")(20, "h6", 14);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "small", 15);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "p", 16);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 17)(27, "button", 18);
    \u0275\u0275element(28, "i", 19);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(30, "div", 8)(31, "div", 9)(32, "div", 10)(33, "div", 11)(34, "div", 20);
    \u0275\u0275element(35, "i", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div")(37, "h6", 14);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "small", 15);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "p", 16);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 17)(44, "button", 22);
    \u0275\u0275element(45, "i", 19);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(47, "div", 8)(48, "div", 9)(49, "div", 10)(50, "div", 11)(51, "div", 23);
    \u0275\u0275element(52, "i", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div")(54, "h6", 14);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "small", 15);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(58, "p", 16);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 17)(61, "a", 25);
    \u0275\u0275element(62, "i", 26);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(64, SettingsComponent_Conditional_64_Template, 17, 4, "div", 8);
    \u0275\u0275conditionalCreate(65, SettingsComponent_Conditional_65_Template, 17, 4, "div", 8);
    \u0275\u0275conditionalCreate(66, SettingsComponent_Conditional_66_Template, 17, 4, "div", 8);
    \u0275\u0275conditionalCreate(67, SettingsComponent_Conditional_67_Template, 17, 4, "div", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(68, "div", 5)(69, "h4", 6);
    \u0275\u0275element(70, "i", 27);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div", 4)(73, "div", 28)(74, "div", 29)(75, "div", 30)(76, "h6", 14);
    \u0275\u0275element(77, "i", 31);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 32)(80, "div", 33)(81, "input", 34);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function SettingsComponent_Template_input_change_81_listener() {
      return ctx.onLanguageChange("en");
    }, "SettingsComponent_Template_input_change_81_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "label", 35);
    \u0275\u0275element(83, "i", 36);
    \u0275\u0275text(84, " English ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "div", 37)(86, "input", 38);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function SettingsComponent_Template_input_change_86_listener() {
      return ctx.onLanguageChange("ar");
    }, "SettingsComponent_Template_input_change_86_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "label", 39);
    \u0275\u0275element(88, "i", 36);
    \u0275\u0275text(89, " \u0627\u0644\u0639\u0631\u0628\u064A\u0629 ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(90, "div", 28)(91, "div", 29)(92, "div", 30)(93, "h6", 14);
    \u0275\u0275element(94, "i", 40);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "div", 32)(97, "div", 41)(98, "strong");
    \u0275\u0275text(99);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "span", 15);
    \u0275\u0275text(101);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 41)(103, "strong");
    \u0275\u0275text(104);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "span", 15);
    \u0275\u0275text(106);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(107, "div", 41)(108, "strong");
    \u0275\u0275text(109);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(110, "span", 15);
    \u0275\u0275text(111);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(112, "div", 14)(113, "strong");
    \u0275\u0275text(114);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(115, "span", 42);
    \u0275\u0275text(116);
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    let tmp_25_0;
    let tmp_27_0;
    let tmp_29_0;
    let tmp_31_0;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("settings.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.subtitle"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.systemSettings"), " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx.t("settings.security"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.securitySettings"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.securityDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.comingSoon"), " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.t("settings.notifications"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.notificationSettings"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.notificationDescription"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.comingSoon"), " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.subtitle"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.overtime.subtitle"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.configure"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasPermission("publicHoliday.read") ? 64 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasPermission("vacationType.read") ? 65 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasPermission("settings.excusePolicy.read") ? 66 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.hasPermission("workflow.read") ? 67 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.userPreferences"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.language"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx.i18n.getCurrentLocale() === "en");
    \u0275\u0275advance(5);
    \u0275\u0275property("checked", ctx.i18n.getCurrentLocale() === "ar");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.profile"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx.t("users.username"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_25_0 = ctx.currentUser()) == null ? null : tmp_25_0.username);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("users.email"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_27_0 = ctx.currentUser()) == null ? null : tmp_27_0.email);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("users.role"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_29_0 = ctx.currentUser()) == null ? null : tmp_29_0.roles == null ? null : tmp_29_0.roles.join(", "));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("users.status"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ((tmp_31_0 = ctx.currentUser()) == null ? null : tmp_31_0.isActive) ? ctx.t("common.active") : ctx.t("common.inactive"), " ");
  }
}, "SettingsComponent_Template"), dependencies: [RouterModule, RouterLink], styles: ["\n\n.border-hover[_ngcontent-%COMP%] {\n  transition: all 0.2s ease-in-out;\n}\n.border-hover[_ngcontent-%COMP%]:hover {\n  border-color: var(--bs-primary) !important;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transform: translateY(-1px);\n}\n.card-body[_ngcontent-%COMP%] {\n  transition: all 0.2s ease-in-out;\n}\n.bg-gradient[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-primary) 0%,\n      rgba(var(--bs-primary-rgb), 0.8) 100%);\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: var(--bs-primary) !important;\n}\n/*# sourceMappingURL=settings.component.css.map */"] }));
var SettingsComponent = _SettingsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsComponent, [{
    type: Component,
    args: [{ selector: "app-settings", standalone: true, imports: [RouterModule], template: `
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-1">{{ t('settings.title') }}</h2>
          <p class="text-muted mb-0">{{ t('settings.subtitle') }}</p>
        </div>
      </div>

      <div class="row">
        <!-- System Settings Section -->
        <div class="col-12 mb-4">
          <h4 class="text-primary mb-3">
            <i class="bi bi-gear me-2"></i>
            {{ t('settings.systemSettings') }}
          </h4>
          <div class="row">

            <!-- Other system settings can be added here -->
            <div class="col-lg-4 col-md-6 mb-3">
              <div class="card h-100 border-hover">
                <div class="card-body d-flex flex-column">
                  <div class="d-flex align-items-center mb-3">
                    <div class="bg-light rounded-3 p-2 me-3">
                      <i class="bi bi-shield-lock text-primary" style="font-size: 1.5rem;"></i>
                    </div>
                    <div>
                      <h6 class="mb-0">{{ t('settings.security') }}</h6>
                      <small class="text-muted">{{ t('settings.securitySettings') }}</small>
                    </div>
                  </div>
                  <p class="text-muted flex-grow-1">{{ t('settings.securityDescription') }}</p>
                  <div class="mt-auto">
                    <button class="btn btn-outline-secondary btn-sm w-100" disabled>
                      <i class="bi bi-tools me-1"></i>
                      {{ t('settings.comingSoon') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-3">
              <div class="card h-100 border-hover">
                <div class="card-body d-flex flex-column">
                  <div class="d-flex align-items-center mb-3">
                    <div class="bg-info bg-gradient rounded-3 p-2 me-3">
                      <i class="bi bi-envelope text-white" style="font-size: 1.5rem;"></i>
                    </div>
                    <div>
                      <h6 class="mb-0">{{ t('settings.notifications') }}</h6>
                      <small class="text-muted">{{ t('settings.notificationSettings') }}</small>
                    </div>
                  </div>
                  <p class="text-muted flex-grow-1">{{ t('settings.notificationDescription') }}</p>
                  <div class="mt-auto">
                    <button class="btn btn-outline-info btn-sm w-100" disabled>
                      <i class="bi bi-tools me-1"></i>
                      {{ t('settings.comingSoon') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-3">
              <div class="card h-100 border-hover">
                <div class="card-body d-flex flex-column">
                  <div class="d-flex align-items-center mb-3">
                    <div class="bg-warning bg-gradient rounded-3 p-2 me-3">
                      <i class="fa-solid fa-clock text-white" style="font-size: 1.5rem;"></i>
                    </div>
                    <div>
                      <h6 class="mb-0">{{ t('settings.overtime.title') }}</h6>
                      <small class="text-muted">{{ t('settings.overtime.subtitle') }}</small>
                    </div>
                  </div>
                  <p class="text-muted flex-grow-1">{{ t('settings.overtime.subtitle') }}</p>
                  <div class="mt-auto">
                    <a routerLink="/settings/overtime" class="btn btn-outline-warning btn-sm w-100">
                      <i class="fa-solid fa-cog me-1"></i>
                      {{ t('settings.configure') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            @if (hasPermission('publicHoliday.read')) {
              <div class="col-lg-4 col-md-6 mb-3">
                <div class="card h-100 border-hover">
                  <div class="card-body d-flex flex-column">
                    <div class="d-flex align-items-center mb-3">
                      <div class="bg-success bg-gradient rounded-3 p-2 me-3">
                        <i class="fa-solid fa-calendar-check text-white" style="font-size: 1.5rem;"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">{{ t('settings.holidays.title') }}</h6>
                        <small class="text-muted">{{ t('settings.holidays.subtitle') }}</small>
                      </div>
                    </div>
                    <p class="text-muted flex-grow-1">{{ t('settings.holidays.description') }}</p>
                    <div class="mt-auto">
                      <a routerLink="/settings/public-holidays" class="btn btn-outline-success btn-sm w-100">
                        <i class="fa-solid fa-cog me-1"></i>
                        {{ t('settings.configure') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            }

            @if (hasPermission('vacationType.read')) {
              <div class="col-lg-4 col-md-6 mb-3">
                <div class="card h-100 border-hover">
                  <div class="card-body d-flex flex-column">
                    <div class="d-flex align-items-center mb-3">
                      <div class="bg-primary bg-gradient rounded-3 p-2 me-3">
                        <i class="fa-solid fa-calendar-alt text-white" style="font-size: 1.5rem;"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">{{ t('vacation_types.title') }}</h6>
                        <small class="text-muted">{{ t('vacation_types.management_subtitle') }}</small>
                      </div>
                    </div>
                    <p class="text-muted flex-grow-1">{{ t('vacation_types.settings_description') }}</p>
                    <div class="mt-auto">
                      <a routerLink="/vacation-types" class="btn btn-outline-primary btn-sm w-100">
                        <i class="fa-solid fa-cog me-1"></i>
                        {{ t('settings.configure') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            }

            @if (hasPermission('settings.excusePolicy.read')) {
              <div class="col-lg-4 col-md-6 mb-3">
                <div class="card h-100 border-hover">
                  <div class="card-body d-flex flex-column">
                    <div class="d-flex align-items-center mb-3">
                      <div class="bg-danger bg-gradient rounded-3 p-2 me-3">
                        <i class="fa-solid fa-user-clock text-white" style="font-size: 1.5rem;"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">{{ t('excuse_policies.title') }}</h6>
                        <small class="text-muted">{{ t('excuse_policies.subtitle') }}</small>
                      </div>
                    </div>
                    <p class="text-muted flex-grow-1">{{ t('excuse_policies.settings_description') }}</p>
                    <div class="mt-auto">
                      <a routerLink="/settings/excuse-policies" class="btn btn-outline-danger btn-sm w-100">
                        <i class="fa-solid fa-cog me-1"></i>
                        {{ t('settings.configure') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            }

            @if (hasPermission('workflow.read')) {
              <div class="col-lg-4 col-md-6 mb-3">
                <div class="card h-100 border-hover">
                  <div class="card-body d-flex flex-column">
                    <div class="d-flex align-items-center mb-3">
                      <div class="bg-secondary bg-gradient rounded-3 p-2 me-3">
                        <i class="fa-solid fa-project-diagram text-white" style="font-size: 1.5rem;"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">{{ t('workflows.title') }}</h6>
                        <small class="text-muted">{{ t('workflows.subtitle') }}</small>
                      </div>
                    </div>
                    <p class="text-muted flex-grow-1">{{ t('workflows.settings_description') }}</p>
                    <div class="mt-auto">
                      <a routerLink="/settings/workflows" class="btn btn-outline-secondary btn-sm w-100">
                        <i class="fa-solid fa-cog me-1"></i>
                        {{ t('settings.configure') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            }</div>
          </div>
        </div>

        <!-- User Preferences Section -->
        <div class="col-12 mb-4">
          <h4 class="text-primary mb-3">
            <i class="bi bi-person-gear me-2"></i>
            {{ t('settings.userPreferences') }}
          </h4>
          <div class="row">
            <!-- Language Settings -->
            <div class="col-lg-6 mb-3">
              <div class="card">
                <div class="card-header">
                  <h6 class="mb-0">
                    <i class="bi bi-translate me-2"></i>
                    {{ t('settings.language') }}
                  </h6>
                </div>
                <div class="card-body">
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="language"
                      id="langEn"
                      [checked]="i18n.getCurrentLocale() === 'en'"
                      (change)="onLanguageChange('en')">
                    <label class="form-check-label" for="langEn">
                      <i class="bi bi-flag me-2"></i>
                      English
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="language"
                      id="langAr"
                      [checked]="i18n.getCurrentLocale() === 'ar'"
                      (change)="onLanguageChange('ar')">
                    <label class="form-check-label" for="langAr">
                      <i class="bi bi-flag me-2"></i>
                      \u0627\u0644\u0639\u0631\u0628\u064A\u0629
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Profile Information -->
            <div class="col-lg-6 mb-3">
              <div class="card">
                <div class="card-header">
                  <h6 class="mb-0">
                    <i class="bi bi-person-circle me-2"></i>
                    {{ t('settings.profile') }}
                  </h6>
                </div>
                <div class="card-body">
                  <div class="mb-2">
                    <strong>{{ t('users.username') }}:</strong>
                    <span class="text-muted">{{ currentUser()?.username }}</span>
                  </div>
                  <div class="mb-2">
                    <strong>{{ t('users.email') }}:</strong>
                    <span class="text-muted">{{ currentUser()?.email }}</span>
                  </div>
                  <div class="mb-2">
                    <strong>{{ t('users.role') }}:</strong>
                    <span class="text-muted">{{ currentUser()?.roles?.join(', ') }}</span>
                  </div>
                  <div class="mb-0">
                    <strong>{{ t('users.status') }}:</strong>
                    <span class="badge bg-success ms-1">
                      {{ currentUser()?.isActive ? t('common.active') : t('common.inactive') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  `, styles: ["/* angular:styles/component:css;89dc063b9e15e334f5e90a9f29fbebc511c02280b98d55b4477b9079b2849118;D:/Work/TimeAttendanceSystem/time-attendance-frontend/src/app/pages/settings/settings.component.ts */\n.border-hover {\n  transition: all 0.2s ease-in-out;\n}\n.border-hover:hover {\n  border-color: var(--bs-primary) !important;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  transform: translateY(-1px);\n}\n.card-body {\n  transition: all 0.2s ease-in-out;\n}\n.bg-gradient {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-primary) 0%,\n      rgba(var(--bs-primary-rgb), 0.8) 100%);\n}\n.text-primary {\n  color: var(--bs-primary) !important;\n}\n/*# sourceMappingURL=settings.component.css.map */\n"] }]
  }], () => [{ type: I18nService }, { type: AuthService }, { type: PermissionService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/pages/settings/settings.component.ts", lineNumber: 308 });
})();
export {
  SettingsComponent
};
//# sourceMappingURL=chunk-7OU44MFZ.js.map
