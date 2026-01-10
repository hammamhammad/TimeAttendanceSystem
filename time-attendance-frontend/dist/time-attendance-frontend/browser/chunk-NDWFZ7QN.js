import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
import {
  EmploymentStatus,
  Gender,
  WorkLocationType
} from "./chunk-IJW3T427.js";
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
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  SelectMultipleControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import "./chunk-O2IS3HK2.js";
import {
  Router,
  RouterLink
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/employees/create-employee/create-employee.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function CreateEmployeeComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.t("common.loading"))("centered", true);
  }
}
__name(CreateEmployeeComponent_Conditional_2_Template, "CreateEmployeeComponent_Conditional_2_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("branchId"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_11_Template, "CreateEmployeeComponent_Conditional_3_Conditional_11_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("employeeNumber"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_18_Template, "CreateEmployeeComponent_Conditional_3_Conditional_18_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("firstName"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_27_Template, "CreateEmployeeComponent_Conditional_3_Conditional_27_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("lastName"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_34_Template, "CreateEmployeeComponent_Conditional_3_Conditional_34_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("hireDate"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_41_Template, "CreateEmployeeComponent_Conditional_3_Conditional_41_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("jobTitle"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_48_Template, "CreateEmployeeComponent_Conditional_3_Conditional_48_Template");
function CreateEmployeeComponent_Conditional_3_For_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", status_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getEmploymentStatusLabel(status_r3));
  }
}
__name(CreateEmployeeComponent_Conditional_3_For_56_Template, "CreateEmployeeComponent_Conditional_3_For_56_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("employmentStatus"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_57_Template, "CreateEmployeeComponent_Conditional_3_Conditional_57_Template");
function CreateEmployeeComponent_Conditional_3_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", type_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getWorkLocationTypeLabel(type_r4));
  }
}
__name(CreateEmployeeComponent_Conditional_3_For_65_Template, "CreateEmployeeComponent_Conditional_3_For_65_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("workLocationType"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_66_Template, "CreateEmployeeComponent_Conditional_3_Conditional_66_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("firstNameAr"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_73_Template, "CreateEmployeeComponent_Conditional_3_Conditional_73_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("lastNameAr"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_78_Template, "CreateEmployeeComponent_Conditional_3_Conditional_78_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("jobTitleAr"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_83_Template, "CreateEmployeeComponent_Conditional_3_Conditional_83_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("nationalId"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_88_Template, "CreateEmployeeComponent_Conditional_3_Conditional_88_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("email"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_95_Template, "CreateEmployeeComponent_Conditional_3_Conditional_95_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("phone"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_100_Template, "CreateEmployeeComponent_Conditional_3_Conditional_100_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("dateOfBirth"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_105_Template, "CreateEmployeeComponent_Conditional_3_Conditional_105_Template");
function CreateEmployeeComponent_Conditional_3_For_115_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const gender_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", gender_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getGenderLabel(gender_r5));
  }
}
__name(CreateEmployeeComponent_Conditional_3_For_115_Template, "CreateEmployeeComponent_Conditional_3_For_115_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("gender"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_116_Template, "CreateEmployeeComponent_Conditional_3_Conditional_116_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_121_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("departmentId"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_121_Template, "CreateEmployeeComponent_Conditional_3_Conditional_121_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_122_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("employees.select_branch_first"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_122_Template, "CreateEmployeeComponent_Conditional_3_Conditional_122_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_127_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("managerEmployeeId"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_127_Template, "CreateEmployeeComponent_Conditional_3_Conditional_127_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_128_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("employees.select_branch_first"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_128_Template, "CreateEmployeeComponent_Conditional_3_Conditional_128_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_138_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("defaultPassword"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_138_Conditional_8_Template, "CreateEmployeeComponent_Conditional_3_Conditional_138_Conditional_8_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_138_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r6 = ctx.$implicit;
    \u0275\u0275property("value", role_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r6.name);
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_138_For_16_Template, "CreateEmployeeComponent_Conditional_3_Conditional_138_For_16_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_138_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 47);
    \u0275\u0275element(2, "i", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 8)(5, "label", 9);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 49);
    \u0275\u0275conditionalCreate(8, CreateEmployeeComponent_Conditional_3_Conditional_138_Conditional_8_Template, 2, 1, "div", 12);
    \u0275\u0275elementStart(9, "div", 14);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 8)(12, "label", 9);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "select", 50);
    \u0275\u0275repeaterCreate(15, CreateEmployeeComponent_Conditional_3_Conditional_138_For_16_Template, 2, 2, "option", 20, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 14);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.user_account.force_password_change"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.user_account.default_password"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("defaultPassword"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.user_account.default_password_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("defaultPassword") ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.user_account.default_password_hint"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.user_account.roles"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.roles());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.user_account.roles_hint"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_138_Template, "CreateEmployeeComponent_Conditional_3_Conditional_138_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_161_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 45);
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_161_Template, "CreateEmployeeComponent_Conditional_3_Conditional_161_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_162_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 46);
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_162_Template, "CreateEmployeeComponent_Conditional_3_Conditional_162_Template");
function CreateEmployeeComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-form-section", 3)(1, "div", 5)(2, "form", 6);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "CreateEmployeeComponent_Conditional_3_Template_form_ngSubmit_2_listener"));
    \u0275\u0275elementStart(3, "app-form-section", 3)(4, "div", 7)(5, "div", 8)(6, "label", 9);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "span", 10);
    \u0275\u0275text(9, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "app-searchable-select", 11);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_10_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBranchSelectionChange($event));
    }, "CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_10_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, CreateEmployeeComponent_Conditional_3_Conditional_11_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 8)(13, "label", 9);
    \u0275\u0275text(14);
    \u0275\u0275elementStart(15, "span", 10);
    \u0275\u0275text(16, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(17, "input", 13);
    \u0275\u0275conditionalCreate(18, CreateEmployeeComponent_Conditional_3_Conditional_18_Template, 2, 1, "div", 12);
    \u0275\u0275elementStart(19, "div", 14);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 8)(22, "label", 9);
    \u0275\u0275text(23);
    \u0275\u0275elementStart(24, "span", 10);
    \u0275\u0275text(25, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(26, "input", 15);
    \u0275\u0275conditionalCreate(27, CreateEmployeeComponent_Conditional_3_Conditional_27_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 8)(29, "label", 9);
    \u0275\u0275text(30);
    \u0275\u0275elementStart(31, "span", 10);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(33, "input", 16);
    \u0275\u0275conditionalCreate(34, CreateEmployeeComponent_Conditional_3_Conditional_34_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 8)(36, "label", 9);
    \u0275\u0275text(37);
    \u0275\u0275elementStart(38, "span", 10);
    \u0275\u0275text(39, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(40, "input", 17);
    \u0275\u0275conditionalCreate(41, CreateEmployeeComponent_Conditional_3_Conditional_41_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 8)(43, "label", 9);
    \u0275\u0275text(44);
    \u0275\u0275elementStart(45, "span", 10);
    \u0275\u0275text(46, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(47, "input", 18);
    \u0275\u0275conditionalCreate(48, CreateEmployeeComponent_Conditional_3_Conditional_48_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 8)(50, "label", 9);
    \u0275\u0275text(51);
    \u0275\u0275elementStart(52, "span", 10);
    \u0275\u0275text(53, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "select", 19);
    \u0275\u0275repeaterCreate(55, CreateEmployeeComponent_Conditional_3_For_56_Template, 2, 2, "option", 20, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(57, CreateEmployeeComponent_Conditional_3_Conditional_57_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 8)(59, "label", 9);
    \u0275\u0275text(60);
    \u0275\u0275elementStart(61, "span", 10);
    \u0275\u0275text(62, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "select", 21);
    \u0275\u0275repeaterCreate(64, CreateEmployeeComponent_Conditional_3_For_65_Template, 2, 2, "option", 20, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(66, CreateEmployeeComponent_Conditional_3_Conditional_66_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(67, "app-form-section", 3)(68, "div", 7)(69, "div", 8)(70, "label", 9);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275element(72, "input", 22);
    \u0275\u0275conditionalCreate(73, CreateEmployeeComponent_Conditional_3_Conditional_73_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 8)(75, "label", 9);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd();
    \u0275\u0275element(77, "input", 23);
    \u0275\u0275conditionalCreate(78, CreateEmployeeComponent_Conditional_3_Conditional_78_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "div", 8)(80, "label", 9);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275element(82, "input", 24);
    \u0275\u0275conditionalCreate(83, CreateEmployeeComponent_Conditional_3_Conditional_83_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 8)(85, "label", 9);
    \u0275\u0275text(86);
    \u0275\u0275elementEnd();
    \u0275\u0275element(87, "input", 25);
    \u0275\u0275conditionalCreate(88, CreateEmployeeComponent_Conditional_3_Conditional_88_Template, 2, 1, "div", 12);
    \u0275\u0275elementStart(89, "div", 14);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 8)(92, "label", 9);
    \u0275\u0275text(93);
    \u0275\u0275elementEnd();
    \u0275\u0275element(94, "input", 26);
    \u0275\u0275conditionalCreate(95, CreateEmployeeComponent_Conditional_3_Conditional_95_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "div", 8)(97, "label", 9);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd();
    \u0275\u0275element(99, "input", 27);
    \u0275\u0275conditionalCreate(100, CreateEmployeeComponent_Conditional_3_Conditional_100_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "div", 8)(102, "label", 9);
    \u0275\u0275text(103);
    \u0275\u0275elementEnd();
    \u0275\u0275element(104, "input", 28);
    \u0275\u0275conditionalCreate(105, CreateEmployeeComponent_Conditional_3_Conditional_105_Template, 2, 1, "div", 12);
    \u0275\u0275elementStart(106, "div", 14);
    \u0275\u0275text(107);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(108, "div", 8)(109, "label", 9);
    \u0275\u0275text(110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(111, "select", 29)(112, "option", 30);
    \u0275\u0275text(113);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(114, CreateEmployeeComponent_Conditional_3_For_115_Template, 2, 2, "option", 20, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(116, CreateEmployeeComponent_Conditional_3_Conditional_116_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(117, "div", 8)(118, "label", 9);
    \u0275\u0275text(119);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "app-searchable-select", 31);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_120_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentSelectionChange($event));
    }, "CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_120_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(121, CreateEmployeeComponent_Conditional_3_Conditional_121_Template, 2, 1, "div", 12);
    \u0275\u0275conditionalCreate(122, CreateEmployeeComponent_Conditional_3_Conditional_122_Template, 2, 1, "div", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(123, "div", 8)(124, "label", 9);
    \u0275\u0275text(125);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(126, "app-searchable-select", 31);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_126_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onManagerSelectionChange($event));
    }, "CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_126_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(127, CreateEmployeeComponent_Conditional_3_Conditional_127_Template, 2, 1, "div", 12);
    \u0275\u0275conditionalCreate(128, CreateEmployeeComponent_Conditional_3_Conditional_128_Template, 2, 1, "div", 32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(129, "app-form-section", 3)(130, "div", 7)(131, "div", 33)(132, "div", 34)(133, "input", 35);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_input_change_133_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCreateUserAccountChange($event));
    }, "CreateEmployeeComponent_Conditional_3_Template_input_change_133_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(134, "label", 36);
    \u0275\u0275text(135);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(136, "div", 14);
    \u0275\u0275text(137);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(138, CreateEmployeeComponent_Conditional_3_Conditional_138_Template, 19, 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(139, "div", 37)(140, "h6", 38);
    \u0275\u0275element(141, "i", 39);
    \u0275\u0275text(142);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(143, "ul", 40)(144, "li");
    \u0275\u0275text(145);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(146, "li");
    \u0275\u0275text(147);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(148, "li");
    \u0275\u0275text(149);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(150, "li");
    \u0275\u0275text(151);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(152, "li");
    \u0275\u0275text(153);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(154, "li");
    \u0275\u0275text(155);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(156, "div", 41)(157, "button", 42);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_button_click_157_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "CreateEmployeeComponent_Conditional_3_Template_button_click_157_listener"));
    \u0275\u0275element(158, "i", 43);
    \u0275\u0275text(159);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(160, "button", 44);
    \u0275\u0275conditionalCreate(161, CreateEmployeeComponent_Conditional_3_Conditional_161_Template, 1, 0, "div", 45)(162, CreateEmployeeComponent_Conditional_3_Conditional_162_Template, 1, 0, "i", 46);
    \u0275\u0275text(163);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    let tmp_79_0;
    let tmp_89_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r0.t("employees.employee_information"));
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.createForm);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.t("employees.required_information"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.branch"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("branchId"));
    \u0275\u0275property("options", ctx_r0.branchSelectOptions)("value", ((tmp_7_0 = ctx_r0.createForm.get("branchId")) == null ? null : tmp_7_0.value == null ? null : tmp_7_0.value.toString()) || "")("placeholder", ctx_r0.t("common.select_branch"))("searchable", true)("clearable", false);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("branchId") ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.employee_number"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("employeeNumber"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.employee_number_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("employeeNumber") ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.employee_number_hint"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.first_name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("firstName"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.first_name_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("firstName") ? 27 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.last_name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("lastName"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.last_name_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("lastName") ? 34 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.hire_date"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("hireDate"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("hireDate") ? 41 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.job_title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("jobTitle"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.job_title_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("jobTitle") ? 48 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.employment_status.title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("employmentStatus"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.employmentStatusValues);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasError("employmentStatus") ? 57 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.work_location.title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("workLocationType"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.workLocationValues);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasError("workLocationType") ? 66 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.t("employees.additional_information"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.first_name_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("firstNameAr"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.first_name_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("firstNameAr") ? 73 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.last_name_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("lastNameAr"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.last_name_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("lastNameAr") ? 78 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.job_title_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("jobTitleAr"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.job_title_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("jobTitleAr") ? 83 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.national_id"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("nationalId"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.national_id_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("nationalId") ? 88 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.national_id_hint"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.email"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("email"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.email_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("email") ? 95 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.phone"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("phone"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.phone_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("phone") ? 100 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.date_of_birth"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("dateOfBirth"));
    \u0275\u0275property("max", ctx_r0.maxDateOfBirth);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("dateOfBirth") ? 105 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.minimum_age_hint"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.gender.title"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("gender"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.select"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.genderValues);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasError("gender") ? 116 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.department"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("departmentId"));
    \u0275\u0275property("options", ctx_r0.departmentSelectOptions)("value", ((tmp_79_0 = ctx_r0.createForm.get("departmentId")) == null ? null : tmp_79_0.value == null ? null : tmp_79_0.value.toString()) || "")("placeholder", ctx_r0.t("common.select_department"))("searchable", true)("clearable", false)("disabled", ctx_r0.departments().length === 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("departmentId") ? 121 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.departments().length === 0 ? 122 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.manager"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("managerEmployeeId"));
    \u0275\u0275property("options", ctx_r0.managerSelectOptions)("value", ((tmp_89_0 = ctx_r0.createForm.get("managerEmployeeId")) == null ? null : tmp_89_0.value == null ? null : tmp_89_0.value.toString()) || "")("placeholder", ctx_r0.t("common.select_manager"))("searchable", true)("clearable", false)("disabled", ctx_r0.managers().length === 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("managerEmployeeId") ? 127 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.managers().length === 0 ? 128 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.t("employees.user_account.title"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.user_account.create_account"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.user_account.create_account_hint"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showUserAccountSection() ? 138 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.validation_rules.title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.validation_rules.employee_number"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.validation_rules.names"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.validation_rules.email"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.validation_rules.phone"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.validation_rules.national_id"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.validation_rules.age"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.createForm.invalid || ctx_r0.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.submitting() ? 161 : 162);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.submitting() ? ctx_r0.t("common.saving") : ctx_r0.t("employees.create_employee"), " ");
  }
}
__name(CreateEmployeeComponent_Conditional_3_Template, "CreateEmployeeComponent_Conditional_3_Template");
var _CreateEmployeeComponent = class _CreateEmployeeComponent {
  i18n = inject(I18nService);
  employeesService = inject(EmployeesService);
  fb = inject(FormBuilder);
  router = inject(Router);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  showUserAccountSection = signal(false, ...ngDevMode ? [{ debugName: "showUserAccountSection" }] : []);
  // Dropdown data
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  departments = signal([], ...ngDevMode ? [{ debugName: "departments" }] : []);
  managers = signal([], ...ngDevMode ? [{ debugName: "managers" }] : []);
  roles = signal([], ...ngDevMode ? [{ debugName: "roles" }] : []);
  // Form
  createForm;
  // Enums for templates
  EmploymentStatus = EmploymentStatus;
  Gender = Gender;
  WorkLocationType = WorkLocationType;
  // Maximum date for date of birth (16 years ago from today, for minimum working age)
  get maxDateOfBirth() {
    const today = /* @__PURE__ */ new Date();
    const sixteenYearsAgo = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    return sixteenYearsAgo.toISOString().split("T")[0];
  }
  // Enum arrays for templates
  employmentStatusValues = [
    EmploymentStatus.Active,
    EmploymentStatus.FullTime,
    EmploymentStatus.PartTime,
    EmploymentStatus.Contract,
    EmploymentStatus.Intern,
    EmploymentStatus.Consultant,
    EmploymentStatus.Terminated,
    EmploymentStatus.Inactive
  ];
  genderValues = [Gender.Male, Gender.Female];
  workLocationValues = [
    WorkLocationType.OnSite,
    WorkLocationType.Remote,
    WorkLocationType.Hybrid
  ];
  // Validation patterns
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
  nationalIdPattern = /^[0-9]{10,14}$/;
  employeeNumberPattern = /^[A-Z0-9\-]{3,20}$/;
  constructor() {
    this.createForm = this.createFormGroup();
  }
  ngOnInit() {
    this.loadBranches();
    this.loadRoles();
  }
  onCreateUserAccountChange(event) {
    const checkbox = event.target;
    this.showUserAccountSection.set(checkbox.checked);
    if (!checkbox.checked) {
      this.createForm.patchValue({
        defaultPassword: "",
        roleIds: []
      });
    }
  }
  loadRoles() {
    this.employeesService.getRoles().subscribe({
      next: /* @__PURE__ */ __name((roles) => {
        this.roles.set(roles);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load roles:", error);
      }, "error")
    });
  }
  createFormGroup() {
    return this.fb.group({
      // Required fields
      branchId: ["", [Validators.required]],
      employeeNumber: ["", [
        Validators.required,
        Validators.pattern(this.employeeNumberPattern)
      ]],
      firstName: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      lastName: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      hireDate: ["", [Validators.required, this.dateValidator]],
      jobTitle: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      employmentStatus: [EmploymentStatus.FullTime, [Validators.required]],
      workLocationType: [WorkLocationType.OnSite, [Validators.required]],
      // Optional fields with validation
      firstNameAr: ["", [Validators.maxLength(50)]],
      lastNameAr: ["", [Validators.maxLength(50)]],
      jobTitleAr: ["", [Validators.maxLength(100)]],
      nationalId: ["", [Validators.pattern(this.nationalIdPattern)]],
      email: ["", [Validators.email, Validators.pattern(this.emailPattern)]],
      phone: ["", [Validators.pattern(this.phonePattern)]],
      dateOfBirth: ["", [this.dateValidator, this.minAgeValidator(16)]],
      gender: [""],
      departmentId: [""],
      managerEmployeeId: [""],
      // User account creation fields
      createUserAccount: [false],
      defaultPassword: ["", [Validators.minLength(8), Validators.maxLength(128)]],
      roleIds: [[]]
    });
  }
  // Custom validators
  dateValidator(control) {
    if (!control.value)
      return null;
    const date = new Date(control.value);
    const today = /* @__PURE__ */ new Date();
    return date > today ? { futureDate: true } : null;
  }
  minAgeValidator(minAge) {
    return (control) => {
      if (!control.value)
        return null;
      const birthDate = new Date(control.value);
      const today = /* @__PURE__ */ new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
        return age - 1 < minAge ? { minAge: { requiredAge: minAge, actualAge: age - 1 } } : null;
      }
      return age < minAge ? { minAge: { requiredAge: minAge, actualAge: age } } : null;
    };
  }
  loadBranches() {
    this.loading.set(true);
    this.employeesService.getBranches().subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.branches.set(result.items);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
        this.loading.set(false);
      }, "error")
    });
  }
  onBranchChange(branchId) {
    if (branchId) {
      this.employeesService.getDepartments(branchId).subscribe({
        next: /* @__PURE__ */ __name((departments) => {
          this.departments.set(departments);
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Failed to load departments:", error);
        }, "error")
      });
      this.employeesService.getManagers(branchId).subscribe({
        next: /* @__PURE__ */ __name((managers) => {
          this.managers.set(managers);
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Failed to load managers:", error);
        }, "error")
      });
    } else {
      this.departments.set([]);
      this.managers.set([]);
    }
  }
  onSubmit() {
    if (this.createForm.valid) {
      this.submitting.set(true);
      const formValue = this.createForm.value;
      const request = __spreadProps(__spreadValues({}, formValue), {
        branchId: +formValue.branchId,
        // Ensure it's a number
        departmentId: formValue.departmentId ? +formValue.departmentId : null,
        managerEmployeeId: formValue.managerEmployeeId ? +formValue.managerEmployeeId : null,
        dateOfBirth: formValue.dateOfBirth || null,
        gender: formValue.gender ? +formValue.gender : null,
        // Convert string to number
        firstNameAr: formValue.firstNameAr || null,
        lastNameAr: formValue.lastNameAr || null,
        jobTitleAr: formValue.jobTitleAr || null,
        nationalId: formValue.nationalId || null,
        email: formValue.email || null,
        phone: formValue.phone || null,
        // User account creation fields
        createUserAccount: formValue.createUserAccount || false,
        defaultPassword: formValue.createUserAccount && formValue.defaultPassword ? formValue.defaultPassword : null,
        roleIds: formValue.createUserAccount && formValue.roleIds?.length > 0 ? formValue.roleIds : null
      });
      this.employeesService.createEmployee(request).subscribe({
        next: /* @__PURE__ */ __name(() => {
          this.router.navigate(["/employees"]);
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Failed to create employee:", error);
          this.handleSubmissionError(error);
          this.submitting.set(false);
        }, "error")
      });
    } else {
      this.markFormGroupTouched();
    }
  }
  onCancel() {
    this.router.navigate(["/employees"]);
  }
  markFormGroupTouched() {
    Object.keys(this.createForm.controls).forEach((key) => {
      this.createForm.get(key)?.markAsTouched();
    });
  }
  handleSubmissionError(error) {
    if (error.error) {
      if (error.error.errors) {
        Object.keys(error.error.errors).forEach((field) => {
          const formField = this.getFormFieldName(field);
          if (formField) {
            const control = this.createForm.get(formField);
            if (control) {
              control.setErrors({ serverError: error.error.errors[field][0] });
            }
          }
        });
      } else if (error.error.error) {
        console.error("Server error:", error.error.error);
      }
    }
  }
  getFormFieldName(backendFieldName) {
    const fieldMap = {
      "BranchId": "branchId",
      "EmployeeNumber": "employeeNumber",
      "FirstName": "firstName",
      "LastName": "lastName",
      "HireDate": "hireDate",
      "JobTitle": "jobTitle",
      "EmploymentStatus": "employmentStatus",
      "WorkLocationType": "workLocationType",
      "DateOfBirth": "dateOfBirth",
      "Email": "email",
      "Phone": "phone",
      "NationalId": "nationalId"
    };
    return fieldMap[backendFieldName] || null;
  }
  // Searchable select options
  get branchSelectOptions() {
    const options = [
      { value: "", label: this.t("common.select_branch") }
    ];
    this.branches().forEach((branch) => {
      options.push({
        value: branch.id.toString(),
        label: `${branch.name} (${branch.code})`,
        subLabel: branch.location
      });
    });
    return options;
  }
  get departmentSelectOptions() {
    const options = [
      { value: "", label: this.t("common.select_department") }
    ];
    this.departments().forEach((dept) => {
      options.push({
        value: dept.id.toString(),
        label: dept.name
      });
    });
    return options;
  }
  get managerSelectOptions() {
    const options = [
      { value: "", label: this.t("common.select_manager") }
    ];
    this.managers().forEach((manager) => {
      options.push({
        value: manager.id.toString(),
        label: manager.name,
        subLabel: manager.employeeNumber
      });
    });
    return options;
  }
  onBranchSelectionChange(branchIdStr) {
    const branchId = branchIdStr ? parseInt(branchIdStr) : 0;
    this.createForm.patchValue({ branchId: branchId || "" });
    this.onBranchChange(branchId);
  }
  onDepartmentSelectionChange(departmentIdStr) {
    const departmentId = departmentIdStr ? parseInt(departmentIdStr) : 0;
    this.createForm.patchValue({ departmentId: departmentId || "" });
  }
  onManagerSelectionChange(managerIdStr) {
    const managerId = managerIdStr ? parseInt(managerIdStr) : 0;
    this.createForm.patchValue({ managerEmployeeId: managerId || "" });
  }
  // Helper methods for template
  t(key) {
    return this.i18n.t(key);
  }
  getEmploymentStatusLabel(status) {
    return this.t(`employees.employment_status.${EmploymentStatus[status].toLowerCase()}`);
  }
  getGenderLabel(gender) {
    return this.t(`employees.gender.${Gender[gender].toLowerCase()}`);
  }
  getWorkLocationTypeLabel(type) {
    return this.t(`employees.work_location.${WorkLocationType[type].toLowerCase()}`);
  }
  // Validation helper methods
  hasError(fieldName, errorType) {
    const field = this.createForm.get(fieldName);
    if (!field)
      return false;
    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }
    return field.invalid && (field.dirty || field.touched);
  }
  getError(fieldName) {
    const field = this.createForm.get(fieldName);
    if (!field || !field.errors)
      return "";
    const errors = field.errors;
    if (errors["serverError"])
      return errors["serverError"];
    if (errors["required"])
      return this.t("validation.required");
    if (errors["email"])
      return this.t("validation.invalid_email");
    if (errors["pattern"]) {
      if (fieldName === "employeeNumber")
        return this.t("validation.invalid_employee_number");
      if (fieldName === "nationalId")
        return this.t("validation.invalid_national_id");
      if (fieldName === "phone")
        return this.t("validation.invalid_phone");
      if (fieldName === "firstName" || fieldName === "lastName")
        return this.t("validation.letters_only");
      return this.t("validation.invalid_format");
    }
    if (errors["minlength"])
      return this.t("validation.min_length") + ": " + errors["minlength"].requiredLength;
    if (errors["maxlength"])
      return this.t("validation.max_length") + ": " + errors["maxlength"].requiredLength;
    if (errors["futureDate"])
      return this.t("validation.future_date_not_allowed");
    if (errors["minAge"])
      return this.t("validation.minimum_age") + ": " + errors["minAge"].requiredAge;
    return this.t("validation.invalid");
  }
};
__name(_CreateEmployeeComponent, "CreateEmployeeComponent");
__publicField(_CreateEmployeeComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateEmployeeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateEmployeeComponent)();
}, "CreateEmployeeComponent_Factory"));
__publicField(_CreateEmployeeComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateEmployeeComponent, selectors: [["app-create-employee"]], decls: 4, vars: 3, consts: [[1, "container-fluid"], ["mode", "create", "moduleName", "employees", "moduleRoute", "employees", 3, "title", "loading"], [1, "d-flex", "justify-content-center", "py-5"], [3, "title"], [3, "message", "centered"], [1, "card-body"], [3, "ngSubmit", "formGroup"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable"], [1, "invalid-feedback"], ["type", "text", "formControlName", "employeeNumber", 1, "form-control", 3, "placeholder"], [1, "form-text"], ["type", "text", "formControlName", "firstName", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "lastName", 1, "form-control", 3, "placeholder"], ["type", "date", "formControlName", "hireDate", 1, "form-control"], ["type", "text", "formControlName", "jobTitle", 1, "form-control", 3, "placeholder"], ["formControlName", "employmentStatus", 1, "form-select"], [3, "value"], ["formControlName", "workLocationType", 1, "form-select"], ["type", "text", "formControlName", "firstNameAr", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "lastNameAr", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "jobTitleAr", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "nationalId", 1, "form-control", 3, "placeholder"], ["type", "email", "formControlName", "email", 1, "form-control", 3, "placeholder"], ["type", "tel", "formControlName", "phone", 1, "form-control", 3, "placeholder"], ["type", "date", "formControlName", "dateOfBirth", 1, "form-control", 3, "max"], ["formControlName", "gender", 1, "form-select"], ["value", ""], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable", "disabled"], [1, "form-text", "text-muted"], [1, "col-12"], [1, "form-check"], ["type", "checkbox", "id", "createUserAccount", "formControlName", "createUserAccount", 1, "form-check-input", 3, "change"], ["for", "createUserAccount", 1, "form-check-label"], [1, "alert", "alert-info"], [1, "alert-heading"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "mb-0"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-save", "me-2"], [1, "alert", "alert-warning"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], ["type", "password", "formControlName", "defaultPassword", 1, "form-control", 3, "placeholder"], ["formControlName", "roleIds", "multiple", "", "size", "4", 1, "form-select"]], template: /* @__PURE__ */ __name(function CreateEmployeeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, CreateEmployeeComponent_Conditional_2_Template, 2, 2, "div", 2)(3, CreateEmployeeComponent_Conditional_3_Template, 164, 126, "app-form-section", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("employees.create_employee"))("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : 3);
  }
}, "CreateEmployeeComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, NgControlStatus, NgControlStatusGroup, ReactiveFormsModule, FormGroupDirective, FormControlName, SearchableSelectComponent, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent], styles: ["\n\nh6.text-primary[_ngcontent-%COMP%] {\n  color: #0d6efd !important;\n  font-weight: 600;\n  border-left: 3px solid #0d6efd;\n  padding-left: 0.75rem;\n}\nh6.text-secondary[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n  font-weight: 600;\n  border-left: 3px solid #6c757d;\n  padding-left: 0.75rem;\n}\n@media (max-width: 768px) {\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .btn-outline-secondary[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .row.g-3[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n}\nhr[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n  color: #dee2e6;\n}\n.fa-solid[_ngcontent-%COMP%] {\n  margin-right: 0.25rem;\n}\n/*# sourceMappingURL=create-employee.component.css.map */"] }));
var CreateEmployeeComponent = _CreateEmployeeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateEmployeeComponent, [{
    type: Component,
    args: [{ selector: "app-create-employee", standalone: true, imports: [FormsModule, ReactiveFormsModule, RouterLink, SearchableSelectComponent, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <app-form-header\r
    mode="create"\r
    [title]="t('employees.create_employee')"\r
    moduleName="employees"\r
    moduleRoute="employees"\r
    [loading]="submitting()">\r
  </app-form-header>\r
\r
  @if (loading()) {\r
    <div class="d-flex justify-content-center py-5">\r
      <app-loading-spinner\r
        [message]="t('common.loading')"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  } @else {\r
    <!-- Main Form -->\r
    <app-form-section [title]="t('employees.employee_information')">\r
      <div class="card-body">\r
        <form [formGroup]="createForm" (ngSubmit)="onSubmit()">\r
          <!-- Required Information Section -->\r
          <app-form-section [title]="t('employees.required_information')">\r
            <div class="row g-3">\r
              <!-- Branch -->\r
              <div class="col-md-6">\r
                <label class="form-label">\r
                  {{ t('employees.branch') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <app-searchable-select\r
                  [options]="branchSelectOptions"\r
                  [value]="createForm.get('branchId')?.value?.toString() || ''"\r
                  (selectionChange)="onBranchSelectionChange($event)"\r
                  [placeholder]="t('common.select_branch')"\r
                  [searchable]="true"\r
                  [clearable]="false"\r
                  [class.is-invalid]="hasError('branchId')"\r
                ></app-searchable-select>\r
                @if (hasError('branchId')) {\r
                  <div class="invalid-feedback">{{ getError('branchId') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Employee Number -->\r
              <div class="col-md-6">\r
                <label class="form-label">\r
                  {{ t('employees.employee_number') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <input \r
                  type="text" \r
                  class="form-control" \r
                  formControlName="employeeNumber"\r
                  [class.is-invalid]="hasError('employeeNumber')"\r
                  [placeholder]="t('employees.employee_number_placeholder')">\r
                @if (hasError('employeeNumber')) {\r
                  <div class="invalid-feedback">{{ getError('employeeNumber') }}</div>\r
                }\r
                <div class="form-text">{{ t('employees.employee_number_hint') }}</div>\r
              </div>\r
\r
              <!-- First Name -->\r
              <div class="col-md-6">\r
                <label class="form-label">\r
                  {{ t('employees.first_name') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <input \r
                  type="text" \r
                  class="form-control" \r
                  formControlName="firstName"\r
                  [class.is-invalid]="hasError('firstName')"\r
                  [placeholder]="t('employees.first_name_placeholder')">\r
                @if (hasError('firstName')) {\r
                  <div class="invalid-feedback">{{ getError('firstName') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Last Name -->\r
              <div class="col-md-6">\r
                <label class="form-label">\r
                  {{ t('employees.last_name') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <input \r
                  type="text" \r
                  class="form-control" \r
                  formControlName="lastName"\r
                  [class.is-invalid]="hasError('lastName')"\r
                  [placeholder]="t('employees.last_name_placeholder')">\r
                @if (hasError('lastName')) {\r
                  <div class="invalid-feedback">{{ getError('lastName') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Hire Date -->\r
              <div class="col-md-6">\r
                <label class="form-label">\r
                  {{ t('employees.hire_date') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <input \r
                  type="date" \r
                  class="form-control" \r
                  formControlName="hireDate"\r
                  [class.is-invalid]="hasError('hireDate')">\r
                @if (hasError('hireDate')) {\r
                  <div class="invalid-feedback">{{ getError('hireDate') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Job Title -->\r
              <div class="col-md-6">\r
                <label class="form-label">\r
                  {{ t('employees.job_title') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <input \r
                  type="text" \r
                  class="form-control" \r
                  formControlName="jobTitle"\r
                  [class.is-invalid]="hasError('jobTitle')"\r
                  [placeholder]="t('employees.job_title_placeholder')">\r
                @if (hasError('jobTitle')) {\r
                  <div class="invalid-feedback">{{ getError('jobTitle') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Employment Status -->\r
              <div class="col-md-6">\r
                <label class="form-label">\r
                  {{ t('employees.employment_status.title') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <select \r
                  class="form-select" \r
                  formControlName="employmentStatus"\r
                  [class.is-invalid]="hasError('employmentStatus')">\r
                  @for (status of employmentStatusValues; track status) {\r
                    <option [value]="status">{{ getEmploymentStatusLabel(status) }}</option>\r
                  }\r
                </select>\r
                @if (hasError('employmentStatus')) {\r
                  <div class="invalid-feedback">{{ getError('employmentStatus') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Work Location -->\r
              <div class="col-md-6">\r
                <label class="form-label">\r
                  {{ t('employees.work_location.title') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <select \r
                  class="form-select" \r
                  formControlName="workLocationType"\r
                  [class.is-invalid]="hasError('workLocationType')">\r
                  @for (type of workLocationValues; track type) {\r
                    <option [value]="type">{{ getWorkLocationTypeLabel(type) }}</option>\r
                  }\r
                </select>\r
                @if (hasError('workLocationType')) {\r
                  <div class="invalid-feedback">{{ getError('workLocationType') }}</div>\r
                }\r
              </div>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Optional Information Section -->\r
          <app-form-section [title]="t('employees.additional_information')">\r
            <div class="row g-3">\r
              <!-- Arabic Names -->\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.first_name_ar') }}</label>\r
                <input \r
                  type="text" \r
                  class="form-control" \r
                  formControlName="firstNameAr"\r
                  [class.is-invalid]="hasError('firstNameAr')"\r
                  [placeholder]="t('employees.first_name_ar_placeholder')">\r
                @if (hasError('firstNameAr')) {\r
                  <div class="invalid-feedback">{{ getError('firstNameAr') }}</div>\r
                }\r
              </div>\r
\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.last_name_ar') }}</label>\r
                <input \r
                  type="text" \r
                  class="form-control" \r
                  formControlName="lastNameAr"\r
                  [class.is-invalid]="hasError('lastNameAr')"\r
                  [placeholder]="t('employees.last_name_ar_placeholder')">\r
                @if (hasError('lastNameAr')) {\r
                  <div class="invalid-feedback">{{ getError('lastNameAr') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Job Title Arabic -->\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.job_title_ar') }}</label>\r
                <input \r
                  type="text" \r
                  class="form-control" \r
                  formControlName="jobTitleAr"\r
                  [class.is-invalid]="hasError('jobTitleAr')"\r
                  [placeholder]="t('employees.job_title_ar_placeholder')">\r
                @if (hasError('jobTitleAr')) {\r
                  <div class="invalid-feedback">{{ getError('jobTitleAr') }}</div>\r
                }\r
              </div>\r
\r
              <!-- National ID -->\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.national_id') }}</label>\r
                <input \r
                  type="text" \r
                  class="form-control" \r
                  formControlName="nationalId"\r
                  [class.is-invalid]="hasError('nationalId')"\r
                  [placeholder]="t('employees.national_id_placeholder')">\r
                @if (hasError('nationalId')) {\r
                  <div class="invalid-feedback">{{ getError('nationalId') }}</div>\r
                }\r
                <div class="form-text">{{ t('employees.national_id_hint') }}</div>\r
              </div>\r
\r
              <!-- Email -->\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.email') }}</label>\r
                <input \r
                  type="email" \r
                  class="form-control" \r
                  formControlName="email"\r
                  [class.is-invalid]="hasError('email')"\r
                  [placeholder]="t('employees.email_placeholder')">\r
                @if (hasError('email')) {\r
                  <div class="invalid-feedback">{{ getError('email') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Phone -->\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.phone') }}</label>\r
                <input \r
                  type="tel" \r
                  class="form-control" \r
                  formControlName="phone"\r
                  [class.is-invalid]="hasError('phone')"\r
                  [placeholder]="t('employees.phone_placeholder')">\r
                @if (hasError('phone')) {\r
                  <div class="invalid-feedback">{{ getError('phone') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Date of Birth -->\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.date_of_birth') }}</label>\r
                <input\r
                  type="date"\r
                  class="form-control"\r
                  formControlName="dateOfBirth"\r
                  [max]="maxDateOfBirth"\r
                  [class.is-invalid]="hasError('dateOfBirth')">\r
                @if (hasError('dateOfBirth')) {\r
                  <div class="invalid-feedback">{{ getError('dateOfBirth') }}</div>\r
                }\r
                <div class="form-text">{{ t('employees.minimum_age_hint') }}</div>\r
              </div>\r
\r
              <!-- Gender -->\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.gender.title') }}</label>\r
                <select \r
                  class="form-select" \r
                  formControlName="gender"\r
                  [class.is-invalid]="hasError('gender')">\r
                  <option value="">{{ t('common.select') }}</option>\r
                  @for (gender of genderValues; track gender) {\r
                    <option [value]="gender">{{ getGenderLabel(gender) }}</option>\r
                  }\r
                </select>\r
                @if (hasError('gender')) {\r
                  <div class="invalid-feedback">{{ getError('gender') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Department -->\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.department') }}</label>\r
                <app-searchable-select\r
                  [options]="departmentSelectOptions"\r
                  [value]="createForm.get('departmentId')?.value?.toString() || ''"\r
                  (selectionChange)="onDepartmentSelectionChange($event)"\r
                  [placeholder]="t('common.select_department')"\r
                  [searchable]="true"\r
                  [clearable]="false"\r
                  [disabled]="departments().length === 0"\r
                  [class.is-invalid]="hasError('departmentId')"\r
                ></app-searchable-select>\r
                @if (hasError('departmentId')) {\r
                  <div class="invalid-feedback">{{ getError('departmentId') }}</div>\r
                }\r
                @if (departments().length === 0) {\r
                  <div class="form-text text-muted">{{ t('employees.select_branch_first') }}</div>\r
                }\r
              </div>\r
\r
              <!-- Manager -->\r
              <div class="col-md-6">\r
                <label class="form-label">{{ t('employees.manager') }}</label>\r
                <app-searchable-select\r
                  [options]="managerSelectOptions"\r
                  [value]="createForm.get('managerEmployeeId')?.value?.toString() || ''"\r
                  (selectionChange)="onManagerSelectionChange($event)"\r
                  [placeholder]="t('common.select_manager')"\r
                  [searchable]="true"\r
                  [clearable]="false"\r
                  [disabled]="managers().length === 0"\r
                  [class.is-invalid]="hasError('managerEmployeeId')"\r
                ></app-searchable-select>\r
                @if (hasError('managerEmployeeId')) {\r
                  <div class="invalid-feedback">{{ getError('managerEmployeeId') }}</div>\r
                }\r
                @if (managers().length === 0) {\r
                  <div class="form-text text-muted">{{ t('employees.select_branch_first') }}</div>\r
                }\r
              </div>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- User Account Section -->\r
          <app-form-section [title]="t('employees.user_account.title')">\r
            <div class="row g-3">\r
              <!-- Create User Account Checkbox -->\r
              <div class="col-12">\r
                <div class="form-check">\r
                  <input\r
                    class="form-check-input"\r
                    type="checkbox"\r
                    id="createUserAccount"\r
                    formControlName="createUserAccount"\r
                    (change)="onCreateUserAccountChange($event)">\r
                  <label class="form-check-label" for="createUserAccount">\r
                    {{ t('employees.user_account.create_account') }}\r
                  </label>\r
                </div>\r
                <div class="form-text">{{ t('employees.user_account.create_account_hint') }}</div>\r
              </div>\r
\r
              @if (showUserAccountSection()) {\r
                <!-- User Account Fields -->\r
                <div class="col-12">\r
                  <div class="alert alert-warning">\r
                    <i class="fa-solid fa-exclamation-triangle me-2"></i>\r
                    {{ t('employees.user_account.force_password_change') }}\r
                  </div>\r
                </div>\r
\r
                <!-- Default Password -->\r
                <div class="col-md-6">\r
                  <label class="form-label">{{ t('employees.user_account.default_password') }}</label>\r
                  <input\r
                    type="password"\r
                    class="form-control"\r
                    formControlName="defaultPassword"\r
                    [class.is-invalid]="hasError('defaultPassword')"\r
                    [placeholder]="t('employees.user_account.default_password_placeholder')">\r
                  @if (hasError('defaultPassword')) {\r
                    <div class="invalid-feedback">{{ getError('defaultPassword') }}</div>\r
                  }\r
                  <div class="form-text">{{ t('employees.user_account.default_password_hint') }}</div>\r
                </div>\r
\r
                <!-- Roles -->\r
                <div class="col-md-6">\r
                  <label class="form-label">{{ t('employees.user_account.roles') }}</label>\r
                  <select\r
                    class="form-select"\r
                    formControlName="roleIds"\r
                    multiple\r
                    size="4">\r
                    @for (role of roles(); track role.id) {\r
                      <option [value]="role.id">{{ role.name }}</option>\r
                    }\r
                  </select>\r
                  <div class="form-text">{{ t('employees.user_account.roles_hint') }}</div>\r
                </div>\r
              }\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Validation Rules Info -->\r
          <div class="alert alert-info">\r
            <h6 class="alert-heading">\r
              <i class="fa-solid fa-info-circle me-2"></i>\r
              {{ t('employees.validation_rules.title') }}\r
            </h6>\r
            <ul class="mb-0">\r
              <li>{{ t('employees.validation_rules.employee_number') }}</li>\r
              <li>{{ t('employees.validation_rules.names') }}</li>\r
              <li>{{ t('employees.validation_rules.email') }}</li>\r
              <li>{{ t('employees.validation_rules.phone') }}</li>\r
              <li>{{ t('employees.validation_rules.national_id') }}</li>\r
              <li>{{ t('employees.validation_rules.age') }}</li>\r
            </ul>\r
          </div>\r
\r
          <!-- Form Actions -->\r
          <div class="d-flex justify-content-end gap-2">\r
            <button \r
              type="button" \r
              class="btn btn-outline-secondary"\r
              (click)="onCancel()"\r
              [disabled]="submitting()">\r
              <i class="fa-solid fa-times me-2"></i>\r
              {{ t('common.cancel') }}\r
            </button>\r
            <button \r
              type="submit" \r
              class="btn btn-primary"\r
              [disabled]="createForm.invalid || submitting()">\r
              @if (submitting()) {\r
                <div class="spinner-border spinner-border-sm me-2"></div>\r
              } @else {\r
                <i class="fa-solid fa-save me-2"></i>\r
              }\r
              {{ submitting() ? t('common.saving') : t('employees.create_employee') }}\r
            </button>\r
          </div>\r
        </form>\r
      </div>\r
    </app-form-section>\r
  }\r
</div>`, styles: ["/* src/app/pages/employees/create-employee/create-employee.component.css */\nh6.text-primary {\n  color: #0d6efd !important;\n  font-weight: 600;\n  border-left: 3px solid #0d6efd;\n  padding-left: 0.75rem;\n}\nh6.text-secondary {\n  color: #6c757d !important;\n  font-weight: 600;\n  border-left: 3px solid #6c757d;\n  padding-left: 0.75rem;\n}\n@media (max-width: 768px) {\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .btn-outline-secondary {\n    align-self: flex-start;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .row.g-3 > * {\n    margin-bottom: 1rem;\n  }\n}\nhr {\n  margin: 1.5rem 0;\n  color: #dee2e6;\n}\n.fa-solid {\n  margin-right: 0.25rem;\n}\n/*# sourceMappingURL=create-employee.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateEmployeeComponent, { className: "CreateEmployeeComponent", filePath: "src/app/pages/employees/create-employee/create-employee.component.ts", lineNumber: 28 });
})();
export {
  CreateEmployeeComponent
};
//# sourceMappingURL=chunk-NDWFZ7QN.js.map
