import {
  EmployeeExcusesService
} from "./chunk-OD7FZ73P.js";
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
import "./chunk-MMUPQRFG.js";
import "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/employee-excuses/excuse-request-form/excuse-request-form.component.ts
function ExcuseRequestFormComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 4)(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_2_Template, "ExcuseRequestFormComponent_Conditional_2_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i", 46);
    \u0275\u0275elementStart(2, "div")(3, "h6", 47);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 48);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 39)(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.no_policy_title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.policyError() || ctx_r0.i18n.t("employee_excuses.no_active_policy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.contact_admin"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_2_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_2_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("employeeId"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_12_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_12_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("excuseDate"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_19_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_19_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("startTime"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_26_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_26_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("endTime"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_33_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_33_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 49);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.calculateDuration(), " ");
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_38_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_38_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.select_time_range"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_39_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_39_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("excuseType"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_50_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_50_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("reason"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_57_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_57_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("approvalStatus"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_76_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_76_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 50)(2, "div", 51);
    \u0275\u0275element(3, "i", 52);
    \u0275\u0275elementStart(4, "div")(5, "div", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 20);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "button", 54);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ExcuseRequestFormComponent_Conditional_3_Conditional_91_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeSelectedFile());
    }, "ExcuseRequestFormComponent_Conditional_3_Conditional_91_Template_button_click_9_listener"));
    \u0275\u0275element(10, "i", 55);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.selectedFile().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getFormattedFileSize());
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_91_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_91_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_92_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "br");
    \u0275\u0275elementStart(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.will_replace_existing"));
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_92_Conditional_3_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_92_Conditional_3_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "i", 56);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, ExcuseRequestFormComponent_Conditional_3_Conditional_92_Conditional_3_Template, 3, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.existing_attachment"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.selectedFile() ? 3 : -1);
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_92_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_92_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_109_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 44);
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_109_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_109_Template");
function ExcuseRequestFormComponent_Conditional_3_Conditional_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 45);
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Conditional_110_Template, "ExcuseRequestFormComponent_Conditional_3_Conditional_110_Template");
function ExcuseRequestFormComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 6);
    \u0275\u0275conditionalCreate(2, ExcuseRequestFormComponent_Conditional_3_Conditional_2_Template, 10, 3, "div", 7);
    \u0275\u0275elementStart(3, "form", 8);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function ExcuseRequestFormComponent_Conditional_3_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "ExcuseRequestFormComponent_Conditional_3_Template_form_ngSubmit_3_listener"));
    \u0275\u0275elementStart(4, "app-form-section", 9)(5, "div", 10)(6, "div", 11)(7, "label", 12);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 13);
    \u0275\u0275text(10, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(11, "app-searchable-select", 14);
    \u0275\u0275conditionalCreate(12, ExcuseRequestFormComponent_Conditional_3_Conditional_12_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 11)(14, "label", 12);
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "span", 13);
    \u0275\u0275text(17, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(18, "input", 16);
    \u0275\u0275conditionalCreate(19, ExcuseRequestFormComponent_Conditional_3_Conditional_19_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 11)(21, "label", 12);
    \u0275\u0275text(22);
    \u0275\u0275elementStart(23, "span", 13);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(25, "input", 17);
    \u0275\u0275conditionalCreate(26, ExcuseRequestFormComponent_Conditional_3_Conditional_26_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 11)(28, "label", 12);
    \u0275\u0275text(29);
    \u0275\u0275elementStart(30, "span", 13);
    \u0275\u0275text(31, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(32, "input", 18);
    \u0275\u0275conditionalCreate(33, ExcuseRequestFormComponent_Conditional_3_Conditional_33_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 11)(35, "label", 12);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 19);
    \u0275\u0275conditionalCreate(38, ExcuseRequestFormComponent_Conditional_3_Conditional_38_Template, 2, 1)(39, ExcuseRequestFormComponent_Conditional_3_Conditional_39_Template, 2, 1, "span", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 11)(41, "label", 12);
    \u0275\u0275text(42);
    \u0275\u0275elementStart(43, "span", 13);
    \u0275\u0275text(44, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "select", 21)(46, "option", 22);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "option", 23);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(50, ExcuseRequestFormComponent_Conditional_3_Conditional_50_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 24)(52, "label", 12);
    \u0275\u0275text(53);
    \u0275\u0275elementStart(54, "span", 13);
    \u0275\u0275text(55, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(56, "textarea", 25);
    \u0275\u0275conditionalCreate(57, ExcuseRequestFormComponent_Conditional_3_Conditional_57_Template, 2, 1, "div", 15);
    \u0275\u0275elementStart(58, "div", 26);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(60, "app-form-section", 9)(61, "div", 10)(62, "div", 11)(63, "label", 12);
    \u0275\u0275text(64);
    \u0275\u0275elementStart(65, "span", 13);
    \u0275\u0275text(66, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "select", 27)(68, "option", 28);
    \u0275\u0275text(69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "option", 29);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "option", 30);
    \u0275\u0275text(73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "option", 31);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(76, ExcuseRequestFormComponent_Conditional_3_Conditional_76_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "div", 11)(78, "label", 12);
    \u0275\u0275text(79);
    \u0275\u0275elementEnd();
    \u0275\u0275element(80, "textarea", 32);
    \u0275\u0275elementStart(81, "div", 26);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 24)(84, "label", 12);
    \u0275\u0275text(85);
    \u0275\u0275elementStart(86, "span", 20);
    \u0275\u0275text(87);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(88, "input", 33);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function ExcuseRequestFormComponent_Conditional_3_Template_input_change_88_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onFileSelect($event));
    }, "ExcuseRequestFormComponent_Conditional_3_Template_input_change_88_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "div", 26);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(91, ExcuseRequestFormComponent_Conditional_3_Conditional_91_Template, 11, 2, "div", 34);
    \u0275\u0275conditionalCreate(92, ExcuseRequestFormComponent_Conditional_3_Conditional_92_Template, 4, 2, "div", 35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(93, "div", 36)(94, "h6", 37);
    \u0275\u0275element(95, "i", 38);
    \u0275\u0275text(96);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "ul", 39)(98, "li");
    \u0275\u0275text(99);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "li");
    \u0275\u0275text(101);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "li");
    \u0275\u0275text(103);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(104, "div", 40)(105, "button", 41);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ExcuseRequestFormComponent_Conditional_3_Template_button_click_105_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "ExcuseRequestFormComponent_Conditional_3_Template_button_click_105_listener"));
    \u0275\u0275element(106, "i", 42);
    \u0275\u0275text(107);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "button", 43);
    \u0275\u0275conditionalCreate(109, ExcuseRequestFormComponent_Conditional_3_Conditional_109_Template, 1, 0, "div", 44)(110, ExcuseRequestFormComponent_Conditional_3_Conditional_110_Template, 1, 0, "i", 45);
    \u0275\u0275text(111);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_33_0;
    let tmp_44_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.noPolicyActive() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("pe-none", ctx_r0.noPolicyActive());
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("employee_excuses.required_information"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.employee"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("employeeId"));
    \u0275\u0275property("options", ctx_r0.employeeOptions())("placeholder", ctx_r0.i18n.t("employee_excuses.select_employee"))("searchable", true)("clearable", true)("disabled", ctx_r0.noPolicyActive() || ctx_r0.isEditMode());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("employeeId") ? 12 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.excuse_date"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("excuseDate"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("excuseDate") ? 19 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.start_time"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("startTime"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("startTime") ? 26 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.end_time"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("endTime"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("endTime") ? 33 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.duration"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.calculateDuration() ? 38 : 39);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.excuse_type"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("excuseType"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.personal"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.official"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("excuseType") ? 50 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.reason"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("reason"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employee_excuses.reason_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("reason") ? 57 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ((tmp_33_0 = ctx_r0.form.get("reason")) == null ? null : tmp_33_0.value == null ? null : tmp_33_0.value.length) || 0, "/500 ", ctx_r0.i18n.t("common.characters"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("employee_excuses.additional_information"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.status"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("approvalStatus"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.status_pending"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.status_approved"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.status_rejected"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.status_cancelled"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("approvalStatus") ? 76 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.reviewer_comments"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employee_excuses.reviewer_comments_placeholder"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ((tmp_44_0 = ctx_r0.form.get("reviewerComments")) == null ? null : tmp_44_0.value == null ? null : tmp_44_0.value.length) || 0, "/1000 ", ctx_r0.i18n.t("common.characters"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.attachment"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t("common.optional"), ")");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.file_upload_help"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.selectedFile() ? 91 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasExistingAttachment() ? 92 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.policy_info_title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.policy_rule_1"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.policy_rule_2"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.policy_rule_3"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.form.invalid || ctx_r0.saving() || ctx_r0.noPolicyActive());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 109 : 110);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? ctx_r0.isEditMode() ? ctx_r0.i18n.t("common.updating") : ctx_r0.i18n.t("common.saving") : ctx_r0.getSubmitButtonText(), " ");
  }
}
__name(ExcuseRequestFormComponent_Conditional_3_Template, "ExcuseRequestFormComponent_Conditional_3_Template");
var _ExcuseRequestFormComponent = class _ExcuseRequestFormComponent {
  i18n = inject(I18nService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  employeeExcusesService = inject(EmployeeExcusesService);
  employeesService = inject(EmployeesService);
  notificationService = inject(NotificationService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  isEditMode = signal(false, ...ngDevMode ? [{ debugName: "isEditMode" }] : []);
  currentExcuse = signal(null, ...ngDevMode ? [{ debugName: "currentExcuse" }] : []);
  selectedFile = signal(null, ...ngDevMode ? [{ debugName: "selectedFile" }] : []);
  currentUser = signal(null, ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  availableEmployees = signal([], ...ngDevMode ? [{ debugName: "availableEmployees" }] : []);
  noPolicyActive = signal(false, ...ngDevMode ? [{ debugName: "noPolicyActive" }] : []);
  policyError = signal(null, ...ngDevMode ? [{ debugName: "policyError" }] : []);
  // Computed property for searchable select options
  employeeOptions = computed(() => {
    return this.availableEmployees().map((employee) => ({
      value: employee.id,
      label: employee.name,
      subLabel: employee.employeeNumber ? `Employee #${employee.employeeNumber}` : void 0
    }));
  }, ...ngDevMode ? [{ debugName: "employeeOptions" }] : []);
  // Form
  form;
  constructor() {
    this.form = this.createForm();
  }
  ngOnInit() {
    this.loadEmployees();
    this.checkEditMode();
    setTimeout(() => {
      this.checkPolicyStatus();
    }, 100);
  }
  createForm() {
    return this.fb.group({
      employeeId: ["", [Validators.required]],
      excuseType: ["PersonalExcuse", [Validators.required]],
      excuseDate: ["", [Validators.required]],
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
      reason: ["", [Validators.required, Validators.maxLength(500)]],
      approvalStatus: ["Approved", [Validators.required]],
      // Default to Approved for HR entry
      reviewerComments: [""],
      attachment: [null]
    });
  }
  loadEmployees() {
    this.employeesService.getEmployeesDropdown().subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.availableEmployees.set(employees);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load employees:", error);
        this.notificationService.error(this.i18n.t("employee_excuses.load_employees_error"));
      }, "error")
    });
  }
  checkEditMode() {
    const excuseId = this.route.snapshot.paramMap.get("id");
    if (excuseId) {
      this.isEditMode.set(true);
      this.loadExcuse(+excuseId);
    }
  }
  loadExcuse(id) {
    this.loading.set(true);
    this.employeeExcusesService.getEmployeeExcuseById(id).subscribe({
      next: /* @__PURE__ */ __name((excuse) => {
        if (excuse) {
          this.currentExcuse.set(excuse);
          this.populateForm(excuse);
        } else {
          this.notificationService.error(this.i18n.t("employee_excuses.not_found"));
          this.router.navigate(["/employee-excuses"]);
        }
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load excuse:", error);
        this.notificationService.error(this.i18n.t("employee_excuses.load_error"));
        this.loading.set(false);
        this.router.navigate(["/employee-excuses"]);
      }, "error")
    });
  }
  populateForm(excuse) {
    const excuseDate = new Date(excuse.excuseDate).toISOString().split("T")[0];
    this.form.patchValue({
      employeeId: excuse.employeeId,
      excuseType: excuse.excuseType || "PersonalExcuse",
      excuseDate,
      startTime: excuse.startTime,
      endTime: excuse.endTime,
      reason: excuse.reason,
      approvalStatus: excuse.status || "Pending",
      reviewerComments: excuse.reviewerComments || ""
    });
    if (this.isEditMode()) {
      this.form.get("employeeId")?.disable();
    }
  }
  onFileSelect(event) {
    const target = event.target;
    const file = target.files?.[0] || null;
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.notificationService.error(this.i18n.t("employee_excuses.file_too_large"));
        target.value = "";
        return;
      }
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowedTypes.includes(file.type)) {
        this.notificationService.error(this.i18n.t("employee_excuses.invalid_file_type"));
        target.value = "";
        return;
      }
      this.selectedFile.set(file);
    } else {
      this.selectedFile.set(null);
    }
  }
  checkPolicyStatus() {
    if (this.isEditMode())
      return;
    if (this.availableEmployees().length === 0) {
      setTimeout(() => this.checkPolicyStatus(), 500);
      return;
    }
    const firstEmployee = this.availableEmployees()[0];
    if (!firstEmployee)
      return;
    const validationRequest = {
      employeeId: firstEmployee.id,
      excuseDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      startTime: "09:00",
      endTime: "10:00",
      excuseType: "PersonalExcuse"
    };
    this.employeeExcusesService.validateExcuse(validationRequest).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        if (result.data && result.data.validationErrors) {
          const noPolicyError = result.data.validationErrors.find((error) => error.includes("No active excuse policy") || error.includes("policy"));
          if (noPolicyError) {
            this.noPolicyActive.set(true);
            this.policyError.set(noPolicyError);
          }
        }
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Policy validation error:", error);
        if (error.error?.error?.includes("policy") || error.error?.message?.includes("policy")) {
          this.noPolicyActive.set(true);
          this.policyError.set(error.error?.error || error.error?.message || "No active excuse policy found");
        }
      }, "error")
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      return;
    }
    if (this.noPolicyActive()) {
      this.notificationService.error(this.policyError() || this.i18n.t("employee_excuses.no_active_policy"));
      return;
    }
    if (!this.isValidTimeRange()) {
      this.notificationService.error(this.i18n.t("employee_excuses.invalid_time_range"));
      return;
    }
    this.saving.set(true);
    const formValue = this.form.value;
    if (this.isEditMode()) {
      this.updateExcuse(formValue);
    } else {
      this.createExcuse(formValue);
    }
  }
  createExcuse(formValue) {
    const request = {
      employeeId: +formValue.employeeId,
      excuseDate: formValue.excuseDate,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      reason: formValue.reason,
      excuseType: formValue.excuseType,
      attachmentFile: this.selectedFile() || void 0
    };
    this.employeeExcusesService.createEmployeeExcuse(request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notificationService.success(this.i18n.t("employee_excuses.create_success"));
        this.router.navigate(["/employee-excuses"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to create excuse:", error);
        let errorMessage = this.i18n.t("employee_excuses.create_error");
        if (error?.error?.error) {
          errorMessage = error.error.error;
        } else if (error?.error?.message) {
          errorMessage = error.error.message;
        } else if (typeof error?.error === "string") {
          errorMessage = error.error;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        this.notificationService.error(errorMessage);
        this.saving.set(false);
      }, "error")
    });
  }
  updateExcuse(formValue) {
    if (!this.currentExcuse())
      return;
    const request = {
      excuseDate: formValue.excuseDate,
      excuseType: formValue.excuseType,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      reason: formValue.reason,
      approvalStatus: formValue.approvalStatus,
      reviewerComments: formValue.reviewerComments || void 0,
      attachmentFile: this.selectedFile() || void 0
    };
    this.employeeExcusesService.updateEmployeeExcuse(this.currentExcuse().id, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notificationService.success(this.i18n.t("employee_excuses.update_success"));
        this.router.navigate(["/employee-excuses"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to update excuse:", error);
        let errorMessage = this.i18n.t("employee_excuses.update_error");
        if (error?.error?.error) {
          errorMessage = error.error.error;
        } else if (error?.error?.message) {
          errorMessage = error.error.message;
        } else if (typeof error?.error === "string") {
          errorMessage = error.error;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        this.notificationService.error(errorMessage);
        this.saving.set(false);
      }, "error")
    });
  }
  isValidTimeRange() {
    const startTime = this.form.get("startTime")?.value;
    const endTime = this.form.get("endTime")?.value;
    if (!startTime || !endTime)
      return false;
    return startTime < endTime;
  }
  onCancel() {
    this.router.navigate(["/employee-excuses"]);
  }
  onReset() {
    if (this.isEditMode() && this.currentExcuse()) {
      this.populateForm(this.currentExcuse());
    } else {
      this.form.reset();
      this.selectedFile.set(null);
      const fileInput = document.getElementById("attachment");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  }
  markFormGroupTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
  isFieldInvalid(fieldName) {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
  getFieldError(fieldName) {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched)
      return "";
    const errors = field.errors;
    if (errors["required"])
      return this.i18n.t("validation.required");
    if (errors["maxlength"])
      return this.i18n.t("validation.maxLength");
    return "";
  }
  calculateDuration() {
    const startTime = this.form.get("startTime")?.value;
    const endTime = this.form.get("endTime")?.value;
    if (!startTime || !endTime)
      return "";
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const durationMinutes = endMinutes - startMinutes;
    if (durationMinutes <= 0)
      return "";
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    if (hours === 0) {
      return `${minutes} ${this.i18n.t("common.minutes")}`;
    } else if (minutes === 0) {
      return `${hours} ${this.i18n.t("common.hours")}`;
    } else {
      return `${hours} ${this.i18n.t("common.hours")} ${minutes} ${this.i18n.t("common.minutes")}`;
    }
  }
  getFormattedFileSize() {
    const file = this.selectedFile();
    if (!file)
      return "";
    const size = file.size;
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  }
  removeSelectedFile() {
    this.selectedFile.set(null);
    const fileInput = document.getElementById("attachment");
    if (fileInput) {
      fileInput.value = "";
    }
  }
  hasExistingAttachment() {
    return this.isEditMode() && !!this.currentExcuse()?.attachmentUrl;
  }
  getPageTitle() {
    return this.isEditMode() ? this.i18n.t("employee_excuses.edit_request") : this.i18n.t("employee_excuses.create_request");
  }
  getFormMode() {
    return this.isEditMode() ? "edit" : "create";
  }
  getExcuseId() {
    return this.currentExcuse()?.id;
  }
  getSubmitButtonText() {
    if (this.saving()) {
      return this.isEditMode() ? this.i18n.t("employee_excuses.updating") : this.i18n.t("employee_excuses.creating");
    }
    return this.isEditMode() ? this.i18n.t("employee_excuses.update_request") : this.i18n.t("employee_excuses.submit_request");
  }
};
__name(_ExcuseRequestFormComponent, "ExcuseRequestFormComponent");
__publicField(_ExcuseRequestFormComponent, "\u0275fac", /* @__PURE__ */ __name(function ExcuseRequestFormComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ExcuseRequestFormComponent)();
}, "ExcuseRequestFormComponent_Factory"));
__publicField(_ExcuseRequestFormComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExcuseRequestFormComponent, selectors: [["app-excuse-request-form"]], decls: 4, vars: 5, consts: [[1, "container-fluid"], ["moduleName", "employee-excuses", "moduleRoute", "employee-excuses", 3, "mode", "title", "entityId", "loading"], [1, "d-flex", "justify-content-center", "py-5"], [1, "card"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [1, "card-body"], ["role", "alert", 1, "alert", "alert-danger", "d-flex", "align-items-center", "mb-4"], [3, "ngSubmit", "formGroup"], [3, "title"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], ["formControlName", "employeeId", 3, "options", "placeholder", "searchable", "clearable", "disabled"], [1, "invalid-feedback"], ["type", "date", "formControlName", "excuseDate", 1, "form-control"], ["type", "time", "formControlName", "startTime", 1, "form-control"], ["type", "time", "formControlName", "endTime", 1, "form-control"], [1, "form-control-plaintext", "bg-light", "border", "rounded", "p-2"], [1, "text-muted"], ["formControlName", "excuseType", 1, "form-select"], ["value", "PersonalExcuse"], ["value", "OfficialDuty"], [1, "col-12"], ["rows", "3", "formControlName", "reason", "maxlength", "500", 1, "form-control", 3, "placeholder"], [1, "form-text"], ["formControlName", "approvalStatus", 1, "form-select"], ["value", "Pending"], ["value", "Approved"], ["value", "Rejected"], ["value", "Cancelled"], ["rows", "3", "formControlName", "reviewerComments", "maxlength", "1000", 1, "form-control", 3, "placeholder"], ["type", "file", "accept", ".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx", 1, "form-control", 3, "change"], [1, "mt-2"], [1, "alert", "alert-info", "py-2", "mt-2"], [1, "alert", "alert-info"], [1, "alert-heading"], [1, "fas", "fa-info-circle", "me-2"], [1, "mb-0"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-save", "me-2"], [1, "fas", "fa-exclamation-triangle", "me-3"], [1, "alert-heading", "mb-1"], [1, "mb-2"], [1, "fas", "fa-clock", "text-primary", "me-2"], [1, "d-flex", "align-items-center", "justify-content-between", "bg-light", "p-2", "rounded"], [1, "d-flex", "align-items-center"], [1, "fas", "fa-file", "text-primary", "me-2"], [1, "fw-medium"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-danger", 3, "click"], [1, "fas", "fa-times"], [1, "fas", "fa-paperclip", "me-2"]], template: /* @__PURE__ */ __name(function ExcuseRequestFormComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ExcuseRequestFormComponent_Conditional_2_Template, 4, 1, "div", 2)(3, ExcuseRequestFormComponent_Conditional_3_Template, 112, 68, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("mode", ctx.getFormMode())("title", ctx.getPageTitle())("entityId", ctx.getExcuseId())("loading", ctx.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : 3);
  }
}, "ExcuseRequestFormComponent_Template"), dependencies: [
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
  SearchableSelectComponent,
  FormHeaderComponent,
  FormSectionComponent
], styles: ["\n\n.excuse-request-form-page[_ngcontent-%COMP%] {\n  padding: 1rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n}\n.form-control.is-invalid[_ngcontent-%COMP%]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #dc3545 !important;\n}\n.alert-info[_ngcontent-%COMP%] {\n  background-color: #d1ecf1;\n  border-color: #bee5eb;\n  color: #0c5460;\n}\n.alert-heading[_ngcontent-%COMP%] {\n  color: #0c5460;\n}\n.form-control-plaintext[_ngcontent-%COMP%] {\n  background-color: #f8f9fa !important;\n  border: 1px solid #e9ecef !important;\n  border-radius: 0.375rem;\n  padding: 0.375rem 0.75rem;\n  font-weight: 500;\n  color: #495057;\n  min-height: calc(1.5em + 0.75rem + 2px);\n  display: flex;\n  align-items: center;\n}\n.form-control-plaintext[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  font-style: italic;\n}\ntextarea.form-control[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 100px;\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6c757d;\n  text-align: right;\n}\n.form-control[type=file][_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n}\n.selected-file[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.selected-file[_ngcontent-%COMP%]   .bg-light[_ngcontent-%COMP%] {\n  background-color: #f8f9fa !important;\n  border: 1px solid #e9ecef;\n}\n.existing-attachment[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  padding: 0.5rem 0.75rem;\n}\n.form-actions[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid #dee2e6;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  padding: 0.5rem 1rem;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  opacity: 0.9;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-danger[_ngcontent-%COMP%] {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-outline-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.card[_ngcontent-%COMP%]:last-child {\n  background-color: #f8f9fa;\n  border: 1px solid #e9ecef;\n}\n.card[_ngcontent-%COMP%]:last-child   .card-title[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  color: #495057;\n}\n.list-unstyled[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  line-height: 1.5;\n}\n.list-unstyled[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-top: 0.1rem;\n  flex-shrink: 0;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: var(--bs-primary) !important;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #198754 !important;\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #ffc107 !important;\n}\n.text-info[_ngcontent-%COMP%] {\n  color: #0dcaf0 !important;\n}\n@media (max-width: 768px) {\n  .excuse-request-form-page[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .d-flex.justify-content-end[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem !important;\n  }\n  .d-flex.justify-content-end[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    align-self: flex-end;\n  }\n}\n@media (max-width: 576px) {\n  .excuse-request-form-page[_ngcontent-%COMP%] {\n    padding: 0.25rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    margin-top: 1.5rem;\n    padding-top: 1rem;\n  }\n}\n.btn[_ngcontent-%COMP%]:focus, \n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\ninput[type=file][_ngcontent-%COMP%]::-webkit-file-upload-button {\n  background-color: #f8f9fa;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  color: #495057;\n  cursor: pointer;\n  font-size: 0.875rem;\n  margin-right: 0.5rem;\n  padding: 0.25rem 0.5rem;\n}\ninput[type=file][_ngcontent-%COMP%]::-webkit-file-upload-button:hover {\n  background-color: #e9ecef;\n}\ninput[type=time][_ngcontent-%COMP%] {\n  position: relative;\n}\ninput[type=time][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  opacity: 0.6;\n  cursor: pointer;\n}\ninput[type=time][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator:hover {\n  opacity: 1;\n}\ninput[type=date][_ngcontent-%COMP%] {\n  position: relative;\n}\ninput[type=date][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  opacity: 0.6;\n  cursor: pointer;\n}\ninput[type=date][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator:hover {\n  opacity: 1;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: #dc3545;\n}\n.text-center.py-5[_ngcontent-%COMP%] {\n  padding: 3rem 1rem !important;\n}\n.text-center[_ngcontent-%COMP%]   .spinner-border[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.selected-file[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {\n  transition: background-color 0.15s ease-in-out;\n}\n.selected-file[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%]:hover {\n  background-color: #e9ecef !important;\n}\n.selected-file[_ngcontent-%COMP%]   .btn-sm[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n}\n.gap-2[_ngcontent-%COMP%] {\n  gap: 0.5rem !important;\n}\n.alert[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-info[_ngcontent-%COMP%] {\n  border-left: 4px solid #0dcaf0;\n}\n.mb-3[_ngcontent-%COMP%] {\n  margin-bottom: 1rem !important;\n}\n.mb-4[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem !important;\n}\n.me-2[_ngcontent-%COMP%] {\n  margin-right: 0.5rem !important;\n}\n.d-none[_ngcontent-%COMP%] {\n  display: none !important;\n}\n/*# sourceMappingURL=excuse-request-form.component.css.map */"] }));
var ExcuseRequestFormComponent = _ExcuseRequestFormComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcuseRequestFormComponent, [{
    type: Component,
    args: [{ selector: "app-excuse-request-form", standalone: true, imports: [
      ReactiveFormsModule,
      SearchableSelectComponent,
      FormHeaderComponent,
      FormSectionComponent
    ], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <app-form-header [mode]="getFormMode()" [title]="getPageTitle()" moduleName="employee-excuses"\r
    moduleRoute="employee-excuses" [entityId]="getExcuseId()" [loading]="saving()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
  <div class="d-flex justify-content-center py-5">\r
    <div class="spinner-border" role="status">\r
      <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>\r
    </div>\r
  </div>\r
  } @else {\r
  <!-- Main Form -->\r
  <div class="card">\r
    <div class="card-body">\r
      <!-- No Policy Alert -->\r
      @if (noPolicyActive()) {\r
      <div class="alert alert-danger d-flex align-items-center mb-4" role="alert">\r
        <i class="fas fa-exclamation-triangle me-3"></i>\r
        <div>\r
          <h6 class="alert-heading mb-1">{{ i18n.t('employee_excuses.no_policy_title') }}</h6>\r
          <p class="mb-2">{{ policyError() || i18n.t('employee_excuses.no_active_policy') }}</p>\r
          <p class="mb-0">\r
            <strong>{{ i18n.t('employee_excuses.contact_admin') }}</strong>\r
          </p>\r
        </div>\r
      </div>\r
      }\r
\r
      <form [formGroup]="form" (ngSubmit)="onSubmit()" [class.pe-none]="noPolicyActive()">\r
        <!-- Required Information Section -->\r
        <app-form-section [title]="i18n.t('employee_excuses.required_information')">\r
          <div class="row g-3">\r
            <!-- Employee Selection -->\r
            <div class="col-md-6">\r
              <label class="form-label">\r
                {{ i18n.t('employee_excuses.employee') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <app-searchable-select [options]="employeeOptions()"\r
                [placeholder]="i18n.t('employee_excuses.select_employee')" [searchable]="true" [clearable]="true"\r
                [disabled]="noPolicyActive() || isEditMode()" formControlName="employeeId"\r
                [class.is-invalid]="isFieldInvalid('employeeId')">\r
              </app-searchable-select>\r
              @if (isFieldInvalid('employeeId')) {\r
              <div class="invalid-feedback">{{ getFieldError('employeeId') }}</div>\r
              }\r
            </div>\r
\r
            <!-- Excuse Date -->\r
            <div class="col-md-6">\r
              <label class="form-label">\r
                {{ i18n.t('employee_excuses.excuse_date') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <input type="date" class="form-control" formControlName="excuseDate"\r
                [class.is-invalid]="isFieldInvalid('excuseDate')">\r
              @if (isFieldInvalid('excuseDate')) {\r
              <div class="invalid-feedback">{{ getFieldError('excuseDate') }}</div>\r
              }\r
            </div>\r
\r
            <!-- Start Time -->\r
            <div class="col-md-6">\r
              <label class="form-label">\r
                {{ i18n.t('employee_excuses.start_time') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <input type="time" class="form-control" formControlName="startTime"\r
                [class.is-invalid]="isFieldInvalid('startTime')">\r
              @if (isFieldInvalid('startTime')) {\r
              <div class="invalid-feedback">{{ getFieldError('startTime') }}</div>\r
              }\r
            </div>\r
\r
            <!-- End Time -->\r
            <div class="col-md-6">\r
              <label class="form-label">\r
                {{ i18n.t('employee_excuses.end_time') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <input type="time" class="form-control" formControlName="endTime"\r
                [class.is-invalid]="isFieldInvalid('endTime')">\r
              @if (isFieldInvalid('endTime')) {\r
              <div class="invalid-feedback">{{ getFieldError('endTime') }}</div>\r
              }\r
            </div>\r
\r
            <!-- Duration Display -->\r
            <div class="col-md-6">\r
              <label class="form-label">{{ i18n.t('employee_excuses.duration') }}</label>\r
              <div class="form-control-plaintext bg-light border rounded p-2">\r
                @if (calculateDuration()) {\r
                <i class="fas fa-clock text-primary me-2"></i>\r
                {{ calculateDuration() }}\r
                } @else {\r
                <span class="text-muted">{{ i18n.t('employee_excuses.select_time_range') }}</span>\r
                }\r
              </div>\r
            </div>\r
\r
            <!-- Excuse Type -->\r
            <div class="col-md-6">\r
              <label class="form-label">\r
                {{ i18n.t('employee_excuses.excuse_type') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <select class="form-select" formControlName="excuseType"\r
                [class.is-invalid]="isFieldInvalid('excuseType')">\r
                <option value="PersonalExcuse">{{ i18n.t('employee_excuses.personal') }}</option>\r
                <option value="OfficialDuty">{{ i18n.t('employee_excuses.official') }}</option>\r
              </select>\r
              @if (isFieldInvalid('excuseType')) {\r
              <div class="invalid-feedback">{{ getFieldError('excuseType') }}</div>\r
              }\r
            </div>\r
\r
            <!-- Reason -->\r
            <div class="col-12">\r
              <label class="form-label">\r
                {{ i18n.t('employee_excuses.reason') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <textarea class="form-control" rows="3" formControlName="reason"\r
                [placeholder]="i18n.t('employee_excuses.reason_placeholder')"\r
                [class.is-invalid]="isFieldInvalid('reason')" maxlength="500"></textarea>\r
              @if (isFieldInvalid('reason')) {\r
              <div class="invalid-feedback">{{ getFieldError('reason') }}</div>\r
              }\r
              <div class="form-text">\r
                {{ form.get('reason')?.value?.length || 0 }}/500 {{ i18n.t('common.characters') }}\r
              </div>\r
            </div>\r
          </div>\r
        </app-form-section>\r
\r
        <!-- Additional Information Section -->\r
        <app-form-section [title]="i18n.t('employee_excuses.additional_information')">\r
          <div class="row g-3">\r
            <!-- Approval Status -->\r
            <div class="col-md-6">\r
              <label class="form-label">\r
                {{ i18n.t('employee_excuses.status') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <select class="form-select" formControlName="approvalStatus"\r
                [class.is-invalid]="isFieldInvalid('approvalStatus')">\r
                <option value="Pending">{{ i18n.t('employee_excuses.status_pending') }}</option>\r
                <option value="Approved">{{ i18n.t('employee_excuses.status_approved') }}</option>\r
                <option value="Rejected">{{ i18n.t('employee_excuses.status_rejected') }}</option>\r
                <option value="Cancelled">{{ i18n.t('employee_excuses.status_cancelled') }}</option>\r
              </select>\r
              @if (isFieldInvalid('approvalStatus')) {\r
              <div class="invalid-feedback">{{ getFieldError('approvalStatus') }}</div>\r
              }\r
            </div>\r
\r
            <!-- Reviewer Comments -->\r
            <div class="col-md-6">\r
              <label class="form-label">{{ i18n.t('employee_excuses.reviewer_comments') }}</label>\r
              <textarea class="form-control" rows="3" formControlName="reviewerComments"\r
                [placeholder]="i18n.t('employee_excuses.reviewer_comments_placeholder')" maxlength="1000"></textarea>\r
              <div class="form-text">\r
                {{ form.get('reviewerComments')?.value?.length || 0 }}/1000 {{ i18n.t('common.characters') }}\r
              </div>\r
            </div>\r
\r
            <!-- File Attachment -->\r
            <div class="col-12">\r
              <label class="form-label">\r
                {{ i18n.t('employee_excuses.attachment') }}\r
                <span class="text-muted">({{ i18n.t('common.optional') }})</span>\r
              </label>\r
              <input type="file" class="form-control" accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"\r
                (change)="onFileSelect($event)">\r
              <div class="form-text">{{ i18n.t('employee_excuses.file_upload_help') }}</div>\r
\r
              <!-- Selected File Display -->\r
              @if (selectedFile()) {\r
              <div class="mt-2">\r
                <div class="d-flex align-items-center justify-content-between bg-light p-2 rounded">\r
                  <div class="d-flex align-items-center">\r
                    <i class="fas fa-file text-primary me-2"></i>\r
                    <div>\r
                      <div class="fw-medium">{{ selectedFile()!.name }}</div>\r
                      <small class="text-muted">{{ getFormattedFileSize() }}</small>\r
                    </div>\r
                  </div>\r
                  <button type="button" class="btn btn-sm btn-outline-danger" (click)="removeSelectedFile()">\r
                    <i class="fas fa-times"></i>\r
                  </button>\r
                </div>\r
              </div>\r
              }\r
\r
              <!-- Existing Attachment Info -->\r
              @if (hasExistingAttachment()) {\r
              <div class="alert alert-info py-2 mt-2">\r
                <i class="fas fa-paperclip me-2"></i>\r
                {{ i18n.t('employee_excuses.existing_attachment') }}\r
                @if (selectedFile()) {\r
                <br><small>{{ i18n.t('employee_excuses.will_replace_existing') }}</small>\r
                }\r
              </div>\r
              }\r
            </div>\r
          </div>\r
        </app-form-section>\r
\r
        <!-- Policy Information -->\r
        <div class="alert alert-info">\r
          <h6 class="alert-heading">\r
            <i class="fas fa-info-circle me-2"></i>\r
            {{ i18n.t('employee_excuses.policy_info_title') }}\r
          </h6>\r
          <ul class="mb-0">\r
            <li>{{ i18n.t('employee_excuses.policy_rule_1') }}</li>\r
            <li>{{ i18n.t('employee_excuses.policy_rule_2') }}</li>\r
            <li>{{ i18n.t('employee_excuses.policy_rule_3') }}</li>\r
          </ul>\r
        </div>\r
\r
        <!-- Form Actions -->\r
        <div class="d-flex justify-content-end gap-2">\r
          <button type="button" class="btn btn-outline-secondary" (click)="onCancel()" [disabled]="saving()">\r
            <i class="fa-solid fa-times me-2"></i>\r
            {{ i18n.t('common.cancel') }}\r
          </button>\r
          <button type="submit" class="btn btn-primary" [disabled]="form.invalid || saving() || noPolicyActive()">\r
            @if (saving()) {\r
            <div class="spinner-border spinner-border-sm me-2"></div>\r
            } @else {\r
            <i class="fa-solid fa-save me-2"></i>\r
            }\r
            {{ saving() ? (isEditMode() ? i18n.t('common.updating') : i18n.t('common.saving')) : getSubmitButtonText()\r
            }}\r
          </button>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/employee-excuses/excuse-request-form/excuse-request-form.component.css */\n.excuse-request-form-page {\n  padding: 1rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.card {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n}\n.form-label {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control,\n.form-select {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.form-control.is-invalid {\n  border-color: #dc3545;\n}\n.form-control.is-invalid:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.text-danger {\n  color: #dc3545 !important;\n}\n.alert-info {\n  background-color: #d1ecf1;\n  border-color: #bee5eb;\n  color: #0c5460;\n}\n.alert-heading {\n  color: #0c5460;\n}\n.form-control-plaintext {\n  background-color: #f8f9fa !important;\n  border: 1px solid #e9ecef !important;\n  border-radius: 0.375rem;\n  padding: 0.375rem 0.75rem;\n  font-weight: 500;\n  color: #495057;\n  min-height: calc(1.5em + 0.75rem + 2px);\n  display: flex;\n  align-items: center;\n}\n.form-control-plaintext .text-muted {\n  font-style: italic;\n}\ntextarea.form-control {\n  resize: vertical;\n  min-height: 100px;\n}\n.form-text {\n  font-size: 0.875rem;\n  color: #6c757d;\n  text-align: right;\n}\n.form-control[type=file] {\n  padding: 0.375rem 0.75rem;\n}\n.selected-file {\n  margin-top: 0.5rem;\n}\n.selected-file .bg-light {\n  background-color: #f8f9fa !important;\n  border: 1px solid #e9ecef;\n}\n.existing-attachment .alert {\n  margin-bottom: 0;\n  padding: 0.5rem 0.75rem;\n}\n.form-actions {\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid #dee2e6;\n}\n.btn {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  padding: 0.5rem 1rem;\n}\n.btn-primary {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary:hover:not(:disabled) {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  opacity: 0.9;\n}\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary:hover:not(:disabled) {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-danger {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-outline-danger:hover:not(:disabled) {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.spinner-border {\n  width: 2rem;\n  height: 2rem;\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.card:last-child {\n  background-color: #f8f9fa;\n  border: 1px solid #e9ecef;\n}\n.card:last-child .card-title {\n  margin-bottom: 1rem;\n  color: #495057;\n}\n.list-unstyled li {\n  display: flex;\n  align-items: flex-start;\n  line-height: 1.5;\n}\n.list-unstyled i {\n  margin-top: 0.1rem;\n  flex-shrink: 0;\n}\n.text-primary {\n  color: var(--bs-primary) !important;\n}\n.text-success {\n  color: #198754 !important;\n}\n.text-warning {\n  color: #ffc107 !important;\n}\n.text-info {\n  color: #0dcaf0 !important;\n}\n@media (max-width: 768px) {\n  .excuse-request-form-page {\n    padding: 0.5rem;\n  }\n  .card-body {\n    padding: 1.5rem;\n  }\n  .d-flex.justify-content-end {\n    flex-direction: column;\n    gap: 0.5rem !important;\n  }\n  .d-flex.justify-content-end .btn {\n    width: 100%;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between .btn {\n    align-self: flex-end;\n  }\n}\n@media (max-width: 576px) {\n  .excuse-request-form-page {\n    padding: 0.25rem;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .form-actions {\n    margin-top: 1.5rem;\n    padding-top: 1rem;\n  }\n}\n.btn:focus,\n.form-control:focus,\n.form-select:focus {\n  outline: none;\n}\ninput[type=file]::-webkit-file-upload-button {\n  background-color: #f8f9fa;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  color: #495057;\n  cursor: pointer;\n  font-size: 0.875rem;\n  margin-right: 0.5rem;\n  padding: 0.25rem 0.5rem;\n}\ninput[type=file]::-webkit-file-upload-button:hover {\n  background-color: #e9ecef;\n}\ninput[type=time] {\n  position: relative;\n}\ninput[type=time]::-webkit-calendar-picker-indicator {\n  opacity: 0.6;\n  cursor: pointer;\n}\ninput[type=time]::-webkit-calendar-picker-indicator:hover {\n  opacity: 1;\n}\ninput[type=date] {\n  position: relative;\n}\ninput[type=date]::-webkit-calendar-picker-indicator {\n  opacity: 0.6;\n  cursor: pointer;\n}\ninput[type=date]::-webkit-calendar-picker-indicator:hover {\n  opacity: 1;\n}\n.invalid-feedback {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: #dc3545;\n}\n.text-center.py-5 {\n  padding: 3rem 1rem !important;\n}\n.text-center .spinner-border {\n  margin-bottom: 1rem;\n}\n.selected-file .d-flex {\n  transition: background-color 0.15s ease-in-out;\n}\n.selected-file .d-flex:hover {\n  background-color: #e9ecef !important;\n}\n.selected-file .btn-sm {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n}\n.gap-2 {\n  gap: 0.5rem !important;\n}\n.alert {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-info {\n  border-left: 4px solid #0dcaf0;\n}\n.mb-3 {\n  margin-bottom: 1rem !important;\n}\n.mb-4 {\n  margin-bottom: 1.5rem !important;\n}\n.me-2 {\n  margin-right: 0.5rem !important;\n}\n.d-none {\n  display: none !important;\n}\n/*# sourceMappingURL=excuse-request-form.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExcuseRequestFormComponent, { className: "ExcuseRequestFormComponent", filePath: "src/app/pages/employee-excuses/excuse-request-form/excuse-request-form.component.ts", lineNumber: 31 });
})();
export {
  ExcuseRequestFormComponent
};
//# sourceMappingURL=chunk-GLOPMJ3N.js.map
