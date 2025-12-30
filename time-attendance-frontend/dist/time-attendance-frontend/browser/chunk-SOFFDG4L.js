import {
  EmployeeVacationsService
} from "./chunk-S3PPH3Y3.js";
import {
  LeaveBalanceService
} from "./chunk-WL4EZF3O.js";
import {
  FormHeaderComponent
} from "./chunk-KM5VSJTZ.js";
import {
  SearchableSelectComponent
} from "./chunk-YPZLTOXZ.js";
import {
  FormSectionComponent
} from "./chunk-I3BAAGQQ.js";
import "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-GSKH2KOG.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import "./chunk-HZ2IZU2F.js";
import {
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  Subject,
  computed,
  debounceTime,
  distinctUntilChanged,
  inject,
  setClassMetadata,
  signal,
  takeUntil,
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/employee-vacations/create-employee-vacation/create-employee-vacation.component.ts
function CreateEmployeeVacationComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("employee_vacations.loading_data"))("variant", "primary")("centered", true);
  }
}
__name(CreateEmployeeVacationComponent_Conditional_2_Template, "CreateEmployeeVacationComponent_Conditional_2_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("employeeId"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_11_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_11_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("vacationTypeId"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_18_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_18_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("startDate"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_26_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_26_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("endDate"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_33_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_33_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 26);
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_45_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_45_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 36)(2, "div", 37)(3, "span", 38);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 39);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.loading_balance"));
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_48_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_48_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275element(1, "i", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.exceeds_balance_warning"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Conditional_6_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Conditional_6_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_vacations.remaining_after"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", (((tmp_5_0 = ctx_r0.currentBalance()) == null ? null : tmp_5_0.currentBalance) || 0) - ctx_r0.requestedDays(), " ", ctx_r0.i18n.t("common.days"), " ");
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Conditional_7_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Conditional_7_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 56)(2, "span", 43);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 57);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Conditional_6_Template, 3, 1, "div", 58)(7, CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Conditional_7_Template, 5, 3, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_vacations.requested_days"), ":");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-danger", ctx_r0.exceedsBalance())("text-success", !ctx_r0.exceedsBalance());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.requestedDays(), " ", ctx_r0.i18n.t("common.days"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.exceedsBalance() ? 6 : 7);
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Template");
function CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 40)(2, "h6", 41);
    \u0275\u0275element(3, "i", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 33)(6, "div", 19)(7, "small", 43);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 44);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 45)(12, "div", 46)(13, "div", 47)(14, "small", 48);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 49);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "small", 50);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 46)(21, "div", 47)(22, "small", 48);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 51);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "small", 50);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 46)(29, "div", 47)(30, "small", 48);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 52);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "small", 50);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 46)(37, "div", 53)(38, "small", 48);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 54);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "small", 50);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(44, CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Conditional_44_Template, 8, 8, "div", 55);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    let tmp_9_0;
    let tmp_12_0;
    let tmp_15_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.leave_balance"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.vacationType"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r0.currentBalance()) == null ? null : tmp_4_0.vacationTypeName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.entitled"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r0.currentBalance()) == null ? null : tmp_6_0.entitledDays) || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.days"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.used"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_9_0 = ctx_r0.currentBalance()) == null ? null : tmp_9_0.usedDays) || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.days"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.pending"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_12_0 = ctx_r0.currentBalance()) == null ? null : tmp_12_0.pendingDays) || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.days"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.available"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_15_0 = ctx_r0.currentBalance()) == null ? null : tmp_15_0.currentBalance) || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.days"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.requestedDays() > 0 ? 44 : -1);
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Template, "CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Template");
function CreateEmployeeVacationComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 5)(2, "form", 6);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_form_ngSubmit_2_listener"));
    \u0275\u0275elementStart(3, "app-form-section", 7)(4, "div", 3)(5, "div", 8)(6, "label", 9);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "span", 10);
    \u0275\u0275text(9, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "app-searchable-select", 11);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_app_searchable_select_selectionChange_10_listener($event) {
      let tmp_2_0;
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((tmp_2_0 = ctx_r0.vacationForm.get("employeeId")) == null ? null : tmp_2_0.setValue($event));
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_app_searchable_select_selectionChange_10_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, CreateEmployeeVacationComponent_Conditional_3_Conditional_11_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 8)(13, "label", 13);
    \u0275\u0275text(14);
    \u0275\u0275elementStart(15, "span", 10);
    \u0275\u0275text(16, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "app-searchable-select", 11);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_app_searchable_select_selectionChange_17_listener($event) {
      let tmp_2_0;
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((tmp_2_0 = ctx_r0.vacationForm.get("vacationTypeId")) == null ? null : tmp_2_0.setValue($event));
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_app_searchable_select_selectionChange_17_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, CreateEmployeeVacationComponent_Conditional_3_Conditional_18_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 3)(20, "div", 8)(21, "label", 14);
    \u0275\u0275text(22);
    \u0275\u0275elementStart(23, "span", 10);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(25, "input", 15);
    \u0275\u0275conditionalCreate(26, CreateEmployeeVacationComponent_Conditional_3_Conditional_26_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 8)(28, "label", 17);
    \u0275\u0275text(29);
    \u0275\u0275elementStart(30, "span", 10);
    \u0275\u0275text(31, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(32, "input", 18);
    \u0275\u0275conditionalCreate(33, CreateEmployeeVacationComponent_Conditional_3_Conditional_33_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "app-form-section", 7)(35, "div", 19)(36, "label", 20);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "textarea", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 22)(40, "button", 23);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_button_click_40_listener"));
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 24);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Conditional_3_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onReset());
    }, "CreateEmployeeVacationComponent_Conditional_3_Template_button_click_42_listener"));
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 25);
    \u0275\u0275conditionalCreate(45, CreateEmployeeVacationComponent_Conditional_3_Conditional_45_Template, 1, 0, "span", 26);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(47, "div", 27);
    \u0275\u0275conditionalCreate(48, CreateEmployeeVacationComponent_Conditional_3_Conditional_48_Template, 7, 2, "div", 28)(49, CreateEmployeeVacationComponent_Conditional_3_Conditional_49_Template, 45, 16, "div", 28);
    \u0275\u0275elementStart(50, "div", 29)(51, "div", 30)(52, "h6", 31);
    \u0275\u0275element(53, "i", 32);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 33)(56, "p", 34);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "ul", 35)(59, "li");
    \u0275\u0275text(60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "li");
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "li");
    \u0275\u0275text(64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "li");
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_12_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.vacationForm);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("employee_vacations.required_information"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.employee"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.employeeOptions)("placeholder", ctx_r0.i18n.t("common.select_employee"))("value", (tmp_6_0 = ctx_r0.vacationForm.get("employeeId")) == null ? null : tmp_6_0.value)("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("employeeId") ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.vacationType"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.vacationTypeOptions)("placeholder", ctx_r0.i18n.t("common.select_vacation_type"))("value", (tmp_12_0 = ctx_r0.vacationForm.get("vacationTypeId")) == null ? null : tmp_12_0.value)("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("vacationTypeId") ? 18 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.startDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("startDate"));
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("startDate") ? 26 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.endDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("endDate"));
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("endDate") ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("employee_vacations.additional_information"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.notes"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employee_vacations.notes_placeholder"))("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.reset"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.vacationForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 45 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.create_vacation"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.loadingBalance() ? 48 : ctx_r0.hasBalance() ? 49 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.help_title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_text"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_select_employee"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_select_type"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_date_range"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_vacations.help_notes_optional"));
  }
}
__name(CreateEmployeeVacationComponent_Conditional_3_Template, "CreateEmployeeVacationComponent_Conditional_3_Template");
var _CreateEmployeeVacationComponent = class _CreateEmployeeVacationComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  notificationService = inject(NotificationService);
  employeeVacationsService = inject(EmployeeVacationsService);
  leaveBalanceService = inject(LeaveBalanceService);
  i18n = inject(I18nService);
  // Destroy subject for unsubscribing
  destroy$ = new Subject();
  // State
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  loadingBalance = signal(false, ...ngDevMode ? [{ debugName: "loadingBalance" }] : []);
  // Form
  vacationForm;
  // Available options
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : []);
  vacationTypes = signal([], ...ngDevMode ? [{ debugName: "vacationTypes" }] : []);
  // Leave balance for selected employee/vacation type
  currentBalance = signal(null, ...ngDevMode ? [{ debugName: "currentBalance" }] : []);
  currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  // Computed: Check if balance is available
  hasBalance = computed(() => this.currentBalance() !== null, ...ngDevMode ? [{ debugName: "hasBalance" }] : []);
  // Computed: Check if requested days exceed balance
  requestedDays = signal(0, ...ngDevMode ? [{ debugName: "requestedDays" }] : []);
  exceedsBalance = computed(() => {
    const balance = this.currentBalance();
    const days = this.requestedDays();
    if (!balance || days <= 0)
      return false;
    return days > balance.currentBalance;
  }, ...ngDevMode ? [{ debugName: "exceedsBalance" }] : []);
  // Computed properties for searchable select options
  get employeeOptions() {
    return this.employees().map((employee) => ({
      value: employee.id,
      label: employee.name
    }));
  }
  get vacationTypeOptions() {
    return this.vacationTypes().map((vacationType) => ({
      value: vacationType.id,
      label: vacationType.name
    }));
  }
  constructor() {
    this.vacationForm = this.createForm();
  }
  ngOnInit() {
    this.loadEmployees();
    this.loadVacationTypes();
    this.setupFormWatchers();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Setup form value change watchers to fetch balance
   */
  setupFormWatchers() {
    this.vacationForm.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged((prev, curr) => prev.employeeId === curr.employeeId && prev.vacationTypeId === curr.vacationTypeId && prev.startDate === curr.startDate && prev.endDate === curr.endDate)).subscribe((value) => {
      if (value.startDate && value.endDate) {
        const days = this.calculateDays(value.startDate, value.endDate);
        this.requestedDays.set(days);
      } else {
        this.requestedDays.set(0);
      }
      if (value.employeeId && value.vacationTypeId) {
        this.fetchLeaveBalance(value.employeeId, value.vacationTypeId);
      } else {
        this.currentBalance.set(null);
      }
    });
  }
  /**
   * Calculate the number of days between two dates
   */
  calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()))
      return 0;
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  }
  /**
   * Fetch leave balance for selected employee and vacation type
   */
  fetchLeaveBalance(employeeId, vacationTypeId) {
    this.loadingBalance.set(true);
    this.leaveBalanceService.getLeaveBalanceSummary(employeeId, this.currentYear).pipe(takeUntil(this.destroy$)).subscribe({
      next: /* @__PURE__ */ __name((summary) => {
        const typeBalance = summary.vacationTypeBalances.find((vtb) => vtb.vacationTypeId === vacationTypeId);
        this.currentBalance.set(typeBalance || null);
        this.loadingBalance.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name(() => {
        this.currentBalance.set(null);
        this.loadingBalance.set(false);
      }, "error")
    });
  }
  /**
   * Create reactive form
   */
  createForm() {
    return this.fb.group({
      employeeId: [null, [Validators.required]],
      vacationTypeId: [null, [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      notes: [""]
    });
  }
  /**
   * Load employees for dropdown
   */
  loadEmployees() {
    this.loading.set(true);
    this.employeeVacationsService.getEmployees().subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.employees.set(employees);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load employees:", error);
        this.notificationService.error(this.i18n.t("employee_vacations.errors.load_employees_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  /**
   * Load vacation types for dropdown
   */
  loadVacationTypes() {
    this.employeeVacationsService.getVacationTypes().subscribe({
      next: /* @__PURE__ */ __name((vacationTypes) => {
        this.vacationTypes.set(vacationTypes);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load vacation types:", error);
        this.notificationService.error(this.i18n.t("employee_vacations.errors.load_vacation_types_failed"));
      }, "error")
    });
  }
  /**
   * Handle form submission
   */
  onSubmit() {
    if (this.vacationForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    this.saving.set(true);
    const formValue = this.vacationForm.value;
    const request = {
      employeeId: formValue.employeeId,
      vacationTypeId: formValue.vacationTypeId,
      startDate: new Date(formValue.startDate),
      endDate: new Date(formValue.endDate),
      notes: formValue.notes || void 0
    };
    this.employeeVacationsService.createVacation(request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t("employee_vacations.success.created"));
        this.router.navigate(["/employee-vacations"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.saving.set(false);
        console.error("Failed to create vacation:", error);
        this.notificationService.error(this.i18n.t("employee_vacations.errors.create_failed"));
      }, "error")
    });
  }
  /**
   * Cancel and navigate back
   */
  onCancel() {
    this.router.navigate(["/employee-vacations"]);
  }
  /**
   * Reset form
   */
  onReset() {
    this.vacationForm.reset();
  }
  /**
   * Mark all form fields as touched
   */
  markFormGroupTouched() {
    Object.keys(this.vacationForm.controls).forEach((key) => {
      const control = this.vacationForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
  /**
   * Check if form field has error
   */
  hasError(fieldName) {
    const field = this.vacationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  /**
   * Get error message for field
   */
  getErrorMessage(fieldName) {
    const field = this.vacationForm.get(fieldName);
    if (!field || !field.errors)
      return "";
    if (field.errors["required"]) {
      return this.i18n.t("validation.required");
    }
    return "";
  }
  /**
   * Check if field is invalid for styling
   */
  isFieldInvalid(fieldName) {
    return this.hasError(fieldName);
  }
  /**
   * Get form mode for FormHeaderComponent
   */
  getFormMode() {
    return "create";
  }
  /**
   * Get vacation ID for FormHeaderComponent
   */
  getVacationId() {
    return void 0;
  }
};
__name(_CreateEmployeeVacationComponent, "CreateEmployeeVacationComponent");
__publicField(_CreateEmployeeVacationComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateEmployeeVacationComponent)();
}, "CreateEmployeeVacationComponent_Factory"));
__publicField(_CreateEmployeeVacationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateEmployeeVacationComponent, selectors: [["app-create-employee-vacation"]], decls: 4, vars: 6, consts: [[1, "container-fluid"], ["moduleName", "employee-vacations", "moduleRoute", "employee-vacations", 3, "mode", "title", "entityId", "loading"], [1, "text-center", "py-5"], [1, "row"], [3, "message", "variant", "centered"], [1, "col-lg-8"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [3, "title"], [1, "col-md-6", "mb-3"], ["for", "employeeId", 1, "form-label"], [1, "text-danger"], [3, "selectionChange", "options", "placeholder", "value", "disabled"], [1, "invalid-feedback", "d-block"], ["for", "vacationTypeId", 1, "form-label"], ["for", "startDate", 1, "form-label"], ["type", "date", "id", "startDate", "formControlName", "startDate", 1, "form-control", 3, "disabled"], [1, "invalid-feedback"], ["for", "endDate", 1, "form-label"], ["type", "date", "id", "endDate", "formControlName", "endDate", 1, "form-control", 3, "disabled"], [1, "mb-3"], ["for", "notes", 1, "form-label"], ["id", "notes", "rows", "3", "formControlName", "notes", 1, "form-control", 3, "placeholder", "disabled"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "col-lg-4"], [1, "card", "mb-3"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-info-circle", "me-2"], [1, "card-body"], [1, "small", "text-muted", "mb-2"], [1, "small", "text-muted", "mb-0"], [1, "card-body", "text-center", "py-4"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "text-primary"], [1, "visually-hidden"], [1, "small", "text-muted", "mt-2", "mb-0"], [1, "card-header", "bg-primary-subtle"], [1, "card-title", "mb-0", "text-primary"], [1, "fas", "fa-balance-scale", "me-2"], [1, "text-muted"], [1, "fw-semibold"], [1, "row", "g-2", "mb-3"], [1, "col-6"], [1, "border", "rounded", "p-2", "text-center"], [1, "text-muted", "d-block"], [1, "fw-bold", "text-primary"], [1, "text-muted", "ms-1"], [1, "fw-bold", "text-warning"], [1, "fw-bold", "text-info"], [1, "border", "rounded", "p-2", "text-center", "bg-light"], [1, "fw-bold", "text-success", "fs-5"], [1, "border-top", "pt-3"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "fw-bold"], [1, "alert", "alert-warning", "mt-2", "mb-0", "py-2", "px-3", "small"], [1, "d-flex", "justify-content-between", "align-items-center", "mt-2", "text-muted", "small"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "fw-semibold", "text-success"]], template: /* @__PURE__ */ __name(function CreateEmployeeVacationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, CreateEmployeeVacationComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, CreateEmployeeVacationComponent_Conditional_3_Template, 67, 42, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("mode", ctx.getFormMode())("title", ctx.i18n.t("employee_vacations.create_vacation"))("entityId", ctx.getVacationId())("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() ? 3 : -1);
  }
}, "CreateEmployeeVacationComponent_Template"), dependencies: [
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  FormGroupDirective,
  FormControlName,
  SearchableSelectComponent,
  FormHeaderComponent,
  FormSectionComponent,
  LoadingSpinnerComponent
], styles: ["\n\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control[_ngcontent-%COMP%]:disabled, \n.form-select[_ngcontent-%COMP%]:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.help-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 0.5rem;\n}\n@media (max-width: 768px) {\n  .d-flex.justify-content-end[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n  .btn[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 0;\n  }\n}\n/*# sourceMappingURL=create-employee-vacation.component.css.map */"] }));
var CreateEmployeeVacationComponent = _CreateEmployeeVacationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateEmployeeVacationComponent, [{
    type: Component,
    args: [{ selector: "app-create-employee-vacation", standalone: true, imports: [
      FormsModule,
      ReactiveFormsModule,
      SearchableSelectComponent,
      FormHeaderComponent,
      FormSectionComponent,
      LoadingSpinnerComponent
    ], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <app-form-header\r
    [mode]="getFormMode()"\r
    [title]="i18n.t('employee_vacations.create_vacation')"\r
    moduleName="employee-vacations"\r
    moduleRoute="employee-vacations"\r
    [entityId]="getVacationId()"\r
    [loading]="loading()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('employee_vacations.loading_data')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Form Content -->\r
  @if (!loading()) {\r
    <div class="row">\r
      <!-- Main Content -->\r
      <div class="col-lg-8">\r
        <form [formGroup]="vacationForm" (ngSubmit)="onSubmit()" novalidate>\r
          <!-- Required Information Section -->\r
          <app-form-section [title]="i18n.t('employee_vacations.required_information')">\r
            <div class="row">\r
                  <!-- Employee -->\r
                  <div class="col-md-6 mb-3">\r
                    <label for="employeeId" class="form-label">\r
                      {{ i18n.t('fields.employee') }} <span class="text-danger">*</span>\r
                    </label>\r
                    <app-searchable-select\r
                      [options]="employeeOptions"\r
                      [placeholder]="i18n.t('common.select_employee')"\r
                      [value]="vacationForm.get('employeeId')?.value"\r
                      [disabled]="saving()"\r
                      (selectionChange)="vacationForm.get('employeeId')?.setValue($event)"\r
                    ></app-searchable-select>\r
                    @if (hasError('employeeId')) {\r
                      <div class="invalid-feedback d-block">\r
                        {{ getErrorMessage('employeeId') }}\r
                      </div>\r
                    }\r
                  </div>\r
\r
                  <!-- Vacation Type -->\r
                  <div class="col-md-6 mb-3">\r
                    <label for="vacationTypeId" class="form-label">\r
                      {{ i18n.t('fields.vacationType') }} <span class="text-danger">*</span>\r
                    </label>\r
                    <app-searchable-select\r
                      [options]="vacationTypeOptions"\r
                      [placeholder]="i18n.t('common.select_vacation_type')"\r
                      [value]="vacationForm.get('vacationTypeId')?.value"\r
                      [disabled]="saving()"\r
                      (selectionChange)="vacationForm.get('vacationTypeId')?.setValue($event)"\r
                    ></app-searchable-select>\r
                    @if (hasError('vacationTypeId')) {\r
                      <div class="invalid-feedback d-block">\r
                        {{ getErrorMessage('vacationTypeId') }}\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
\r
                <div class="row">\r
                  <!-- Start Date -->\r
                  <div class="col-md-6 mb-3">\r
                    <label for="startDate" class="form-label">\r
                      {{ i18n.t('fields.startDate') }} <span class="text-danger">*</span>\r
                    </label>\r
                    <input\r
                      type="date"\r
                      id="startDate"\r
                      class="form-control"\r
                      formControlName="startDate"\r
                      [class.is-invalid]="isFieldInvalid('startDate')"\r
                      [disabled]="saving()"\r
                    />\r
                    @if (hasError('startDate')) {\r
                      <div class="invalid-feedback">\r
                        {{ getErrorMessage('startDate') }}\r
                      </div>\r
                    }\r
                  </div>\r
\r
                  <!-- End Date -->\r
                  <div class="col-md-6 mb-3">\r
                    <label for="endDate" class="form-label">\r
                      {{ i18n.t('fields.endDate') }} <span class="text-danger">*</span>\r
                    </label>\r
                    <input\r
                      type="date"\r
                      id="endDate"\r
                      class="form-control"\r
                      formControlName="endDate"\r
                      [class.is-invalid]="isFieldInvalid('endDate')"\r
                      [disabled]="saving()"\r
                    />\r
                    @if (hasError('endDate')) {\r
                      <div class="invalid-feedback">\r
                        {{ getErrorMessage('endDate') }}\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
          </app-form-section>\r
\r
          <!-- Additional Information Section -->\r
          <app-form-section [title]="i18n.t('employee_vacations.additional_information')">\r
            <!-- Notes -->\r
                <div class="mb-3">\r
                  <label for="notes" class="form-label">{{ i18n.t('fields.notes') }}</label>\r
                  <textarea\r
                    id="notes"\r
                    class="form-control"\r
                    rows="3"\r
                    formControlName="notes"\r
                    [placeholder]="i18n.t('employee_vacations.notes_placeholder')"\r
                    [disabled]="saving()"\r
                  ></textarea>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Submit Section -->\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button\r
              type="button"\r
              class="btn btn-secondary"\r
              (click)="onCancel()"\r
              [disabled]="saving()"\r
            >\r
              {{ i18n.t('common.cancel') }}\r
            </button>\r
\r
            <button\r
              type="button"\r
              class="btn btn-outline-secondary"\r
              (click)="onReset()"\r
              [disabled]="saving()"\r
            >\r
              {{ i18n.t('common.reset') }}\r
            </button>\r
\r
            <button\r
              type="submit"\r
              class="btn btn-primary"\r
              [disabled]="vacationForm.invalid || saving()"\r
            >\r
              @if (saving()) {\r
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
              }\r
              {{ i18n.t('employee_vacations.create_vacation') }}\r
            </button>\r
          </div>\r
        </form>\r
      </div>\r
\r
      <!-- Sidebar -->\r
      <div class="col-lg-4">\r
        <!-- Leave Balance Card -->\r
        @if (loadingBalance()) {\r
          <div class="card mb-3">\r
            <div class="card-body text-center py-4">\r
              <div class="spinner-border spinner-border-sm text-primary" role="status">\r
                <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>\r
              </div>\r
              <p class="small text-muted mt-2 mb-0">{{ i18n.t('employee_vacations.loading_balance') }}</p>\r
            </div>\r
          </div>\r
        } @else if (hasBalance()) {\r
          <div class="card mb-3">\r
            <div class="card-header bg-primary-subtle">\r
              <h6 class="card-title mb-0 text-primary">\r
                <i class="fas fa-balance-scale me-2"></i>\r
                {{ i18n.t('employee_vacations.leave_balance') }}\r
              </h6>\r
            </div>\r
            <div class="card-body">\r
              <!-- Vacation Type Name -->\r
              <div class="mb-3">\r
                <small class="text-muted">{{ i18n.t('fields.vacationType') }}</small>\r
                <div class="fw-semibold">{{ currentBalance()?.vacationTypeName }}</div>\r
              </div>\r
\r
              <!-- Balance Details -->\r
              <div class="row g-2 mb-3">\r
                <div class="col-6">\r
                  <div class="border rounded p-2 text-center">\r
                    <small class="text-muted d-block">{{ i18n.t('employee_vacations.entitled') }}</small>\r
                    <span class="fw-bold text-primary">{{ currentBalance()?.entitledDays || 0 }}</span>\r
                    <small class="text-muted ms-1">{{ i18n.t('common.days') }}</small>\r
                  </div>\r
                </div>\r
                <div class="col-6">\r
                  <div class="border rounded p-2 text-center">\r
                    <small class="text-muted d-block">{{ i18n.t('employee_vacations.used') }}</small>\r
                    <span class="fw-bold text-warning">{{ currentBalance()?.usedDays || 0 }}</span>\r
                    <small class="text-muted ms-1">{{ i18n.t('common.days') }}</small>\r
                  </div>\r
                </div>\r
                <div class="col-6">\r
                  <div class="border rounded p-2 text-center">\r
                    <small class="text-muted d-block">{{ i18n.t('employee_vacations.pending') }}</small>\r
                    <span class="fw-bold text-info">{{ currentBalance()?.pendingDays || 0 }}</span>\r
                    <small class="text-muted ms-1">{{ i18n.t('common.days') }}</small>\r
                  </div>\r
                </div>\r
                <div class="col-6">\r
                  <div class="border rounded p-2 text-center bg-light">\r
                    <small class="text-muted d-block">{{ i18n.t('employee_vacations.available') }}</small>\r
                    <span class="fw-bold text-success fs-5">{{ currentBalance()?.currentBalance || 0 }}</span>\r
                    <small class="text-muted ms-1">{{ i18n.t('common.days') }}</small>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <!-- Requested Days -->\r
              @if (requestedDays() > 0) {\r
                <div class="border-top pt-3">\r
                  <div class="d-flex justify-content-between align-items-center">\r
                    <span class="text-muted">{{ i18n.t('employee_vacations.requested_days') }}:</span>\r
                    <span class="fw-bold" [class.text-danger]="exceedsBalance()" [class.text-success]="!exceedsBalance()">\r
                      {{ requestedDays() }} {{ i18n.t('common.days') }}\r
                    </span>\r
                  </div>\r
\r
                  @if (exceedsBalance()) {\r
                    <div class="alert alert-warning mt-2 mb-0 py-2 px-3 small">\r
                      <i class="fas fa-exclamation-triangle me-2"></i>\r
                      {{ i18n.t('employee_vacations.exceeds_balance_warning') }}\r
                    </div>\r
                  } @else {\r
                    <div class="d-flex justify-content-between align-items-center mt-2 text-muted small">\r
                      <span>{{ i18n.t('employee_vacations.remaining_after') }}:</span>\r
                      <span class="fw-semibold text-success">\r
                        {{ (currentBalance()?.currentBalance || 0) - requestedDays() }} {{ i18n.t('common.days') }}\r
                      </span>\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Help Card -->\r
        <div class="card">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">\r
              <i class="fas fa-info-circle me-2"></i>\r
              {{ i18n.t('employee_vacations.help_title') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
            <p class="small text-muted mb-2">{{ i18n.t('employee_vacations.help_text') }}</p>\r
            <ul class="small text-muted mb-0">\r
              <li>{{ i18n.t('employee_vacations.help_select_employee') }}</li>\r
              <li>{{ i18n.t('employee_vacations.help_select_type') }}</li>\r
              <li>{{ i18n.t('employee_vacations.help_date_range') }}</li>\r
              <li>{{ i18n.t('employee_vacations.help_notes_optional') }}</li>\r
            </ul>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/employee-vacations/create-employee-vacation/create-employee-vacation.component.css */\n.form-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control:disabled,\n.form-select:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback {\n  font-size: 0.875rem;\n}\n.help-card {\n  position: sticky;\n  top: 1rem;\n}\n.card-title {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group .btn {\n  border-radius: 0.375rem;\n}\n.btn-group .btn:not(:last-child) {\n  margin-right: 0.5rem;\n}\n@media (max-width: 768px) {\n  .d-flex.justify-content-end {\n    flex-direction: column;\n  }\n  .btn {\n    margin-bottom: 0.5rem;\n  }\n  .btn:last-child {\n    margin-bottom: 0;\n  }\n}\n/*# sourceMappingURL=create-employee-vacation.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateEmployeeVacationComponent, { className: "CreateEmployeeVacationComponent", filePath: "src/app/pages/employee-vacations/create-employee-vacation/create-employee-vacation.component.ts", lineNumber: 31 });
})();
export {
  CreateEmployeeVacationComponent
};
//# sourceMappingURL=chunk-SOFFDG4L.js.map
