import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  EmploymentStatus,
  Gender,
  WorkLocationType
} from "./chunk-TLKJPMWD.js";
import {
  SearchableSelectComponent
} from "./chunk-YVOT2QSR.js";
import {
  EmployeesService
} from "./chunk-WMEU4YDP.js";
import {
  LoadingSpinnerComponent
} from "./chunk-WJCQS5EA.js";
import "./chunk-DKGIYIS4.js";
import "./chunk-IL4NCC2P.js";
import {
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
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  Router,
  RouterLink,
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
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/employees/create-employee/create-employee.component.ts
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
function CreateEmployeeComponent_Conditional_3_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("branchId"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_18_Template, "CreateEmployeeComponent_Conditional_3_Conditional_18_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("employeeNumber"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_25_Template, "CreateEmployeeComponent_Conditional_3_Conditional_25_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("firstName"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_34_Template, "CreateEmployeeComponent_Conditional_3_Conditional_34_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("lastName"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_41_Template, "CreateEmployeeComponent_Conditional_3_Conditional_41_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("hireDate"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_48_Template, "CreateEmployeeComponent_Conditional_3_Conditional_48_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("jobTitle"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_55_Template, "CreateEmployeeComponent_Conditional_3_Conditional_55_Template");
function CreateEmployeeComponent_Conditional_3_For_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
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
__name(CreateEmployeeComponent_Conditional_3_For_63_Template, "CreateEmployeeComponent_Conditional_3_For_63_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("employmentStatus"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_64_Template, "CreateEmployeeComponent_Conditional_3_Conditional_64_Template");
function CreateEmployeeComponent_Conditional_3_For_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
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
__name(CreateEmployeeComponent_Conditional_3_For_72_Template, "CreateEmployeeComponent_Conditional_3_For_72_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("workLocationType"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_73_Template, "CreateEmployeeComponent_Conditional_3_Conditional_73_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("firstNameAr"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_84_Template, "CreateEmployeeComponent_Conditional_3_Conditional_84_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("lastNameAr"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_89_Template, "CreateEmployeeComponent_Conditional_3_Conditional_89_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("jobTitleAr"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_94_Template, "CreateEmployeeComponent_Conditional_3_Conditional_94_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("nationalId"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_99_Template, "CreateEmployeeComponent_Conditional_3_Conditional_99_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("email"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_106_Template, "CreateEmployeeComponent_Conditional_3_Conditional_106_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("phone"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_111_Template, "CreateEmployeeComponent_Conditional_3_Conditional_111_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("dateOfBirth"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_116_Template, "CreateEmployeeComponent_Conditional_3_Conditional_116_Template");
function CreateEmployeeComponent_Conditional_3_For_126_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
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
__name(CreateEmployeeComponent_Conditional_3_For_126_Template, "CreateEmployeeComponent_Conditional_3_For_126_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_127_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("gender"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_127_Template, "CreateEmployeeComponent_Conditional_3_Conditional_127_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_132_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("departmentId"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_132_Template, "CreateEmployeeComponent_Conditional_3_Conditional_132_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_133_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("employees.select_branch_first"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_133_Template, "CreateEmployeeComponent_Conditional_3_Conditional_133_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_138_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getError("managerEmployeeId"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_138_Template, "CreateEmployeeComponent_Conditional_3_Conditional_138_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_139_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("employees.select_branch_first"));
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_139_Template, "CreateEmployeeComponent_Conditional_3_Conditional_139_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_162_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 48);
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_162_Template, "CreateEmployeeComponent_Conditional_3_Conditional_162_Template");
function CreateEmployeeComponent_Conditional_3_Conditional_163_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 49);
  }
}
__name(CreateEmployeeComponent_Conditional_3_Conditional_163_Template, "CreateEmployeeComponent_Conditional_3_Conditional_163_Template");
function CreateEmployeeComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 5)(2, "h5", 6);
    \u0275\u0275element(3, "i", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 8)(6, "form", 9);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "CreateEmployeeComponent_Conditional_3_Template_form_ngSubmit_6_listener"));
    \u0275\u0275elementStart(7, "div", 10)(8, "h6", 11);
    \u0275\u0275element(9, "i", 12);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 13)(12, "div", 14)(13, "label", 15);
    \u0275\u0275text(14);
    \u0275\u0275elementStart(15, "span", 16);
    \u0275\u0275text(16, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "app-searchable-select", 17);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_17_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBranchSelectionChange($event));
    }, "CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_17_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, CreateEmployeeComponent_Conditional_3_Conditional_18_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 14)(20, "label", 15);
    \u0275\u0275text(21);
    \u0275\u0275elementStart(22, "span", 16);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(24, "input", 19);
    \u0275\u0275conditionalCreate(25, CreateEmployeeComponent_Conditional_3_Conditional_25_Template, 2, 1, "div", 18);
    \u0275\u0275elementStart(26, "div", 20);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 14)(29, "label", 15);
    \u0275\u0275text(30);
    \u0275\u0275elementStart(31, "span", 16);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(33, "input", 21);
    \u0275\u0275conditionalCreate(34, CreateEmployeeComponent_Conditional_3_Conditional_34_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 14)(36, "label", 15);
    \u0275\u0275text(37);
    \u0275\u0275elementStart(38, "span", 16);
    \u0275\u0275text(39, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(40, "input", 22);
    \u0275\u0275conditionalCreate(41, CreateEmployeeComponent_Conditional_3_Conditional_41_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 14)(43, "label", 15);
    \u0275\u0275text(44);
    \u0275\u0275elementStart(45, "span", 16);
    \u0275\u0275text(46, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(47, "input", 23);
    \u0275\u0275conditionalCreate(48, CreateEmployeeComponent_Conditional_3_Conditional_48_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 14)(50, "label", 15);
    \u0275\u0275text(51);
    \u0275\u0275elementStart(52, "span", 16);
    \u0275\u0275text(53, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(54, "input", 24);
    \u0275\u0275conditionalCreate(55, CreateEmployeeComponent_Conditional_3_Conditional_55_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div", 14)(57, "label", 15);
    \u0275\u0275text(58);
    \u0275\u0275elementStart(59, "span", 16);
    \u0275\u0275text(60, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "select", 25);
    \u0275\u0275repeaterCreate(62, CreateEmployeeComponent_Conditional_3_For_63_Template, 2, 2, "option", 26, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(64, CreateEmployeeComponent_Conditional_3_Conditional_64_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 14)(66, "label", 15);
    \u0275\u0275text(67);
    \u0275\u0275elementStart(68, "span", 16);
    \u0275\u0275text(69, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "select", 27);
    \u0275\u0275repeaterCreate(71, CreateEmployeeComponent_Conditional_3_For_72_Template, 2, 2, "option", 26, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(73, CreateEmployeeComponent_Conditional_3_Conditional_73_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(74, "hr");
    \u0275\u0275elementStart(75, "div", 10)(76, "h6", 28);
    \u0275\u0275element(77, "i", 29);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "div", 13)(80, "div", 14)(81, "label", 15);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd();
    \u0275\u0275element(83, "input", 30);
    \u0275\u0275conditionalCreate(84, CreateEmployeeComponent_Conditional_3_Conditional_84_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "div", 14)(86, "label", 15);
    \u0275\u0275text(87);
    \u0275\u0275elementEnd();
    \u0275\u0275element(88, "input", 31);
    \u0275\u0275conditionalCreate(89, CreateEmployeeComponent_Conditional_3_Conditional_89_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "div", 14)(91, "label", 15);
    \u0275\u0275text(92);
    \u0275\u0275elementEnd();
    \u0275\u0275element(93, "input", 32);
    \u0275\u0275conditionalCreate(94, CreateEmployeeComponent_Conditional_3_Conditional_94_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "div", 14)(96, "label", 15);
    \u0275\u0275text(97);
    \u0275\u0275elementEnd();
    \u0275\u0275element(98, "input", 33);
    \u0275\u0275conditionalCreate(99, CreateEmployeeComponent_Conditional_3_Conditional_99_Template, 2, 1, "div", 18);
    \u0275\u0275elementStart(100, "div", 20);
    \u0275\u0275text(101);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 14)(103, "label", 15);
    \u0275\u0275text(104);
    \u0275\u0275elementEnd();
    \u0275\u0275element(105, "input", 34);
    \u0275\u0275conditionalCreate(106, CreateEmployeeComponent_Conditional_3_Conditional_106_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "div", 14)(108, "label", 15);
    \u0275\u0275text(109);
    \u0275\u0275elementEnd();
    \u0275\u0275element(110, "input", 35);
    \u0275\u0275conditionalCreate(111, CreateEmployeeComponent_Conditional_3_Conditional_111_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(112, "div", 14)(113, "label", 15);
    \u0275\u0275text(114);
    \u0275\u0275elementEnd();
    \u0275\u0275element(115, "input", 36);
    \u0275\u0275conditionalCreate(116, CreateEmployeeComponent_Conditional_3_Conditional_116_Template, 2, 1, "div", 18);
    \u0275\u0275elementStart(117, "div", 20);
    \u0275\u0275text(118);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(119, "div", 14)(120, "label", 15);
    \u0275\u0275text(121);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "select", 37)(123, "option", 38);
    \u0275\u0275text(124);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(125, CreateEmployeeComponent_Conditional_3_For_126_Template, 2, 2, "option", 26, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(127, CreateEmployeeComponent_Conditional_3_Conditional_127_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "div", 14)(129, "label", 15);
    \u0275\u0275text(130);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(131, "app-searchable-select", 39);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_131_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentSelectionChange($event));
    }, "CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_131_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(132, CreateEmployeeComponent_Conditional_3_Conditional_132_Template, 2, 1, "div", 18);
    \u0275\u0275conditionalCreate(133, CreateEmployeeComponent_Conditional_3_Conditional_133_Template, 2, 1, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(134, "div", 14)(135, "label", 15);
    \u0275\u0275text(136);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(137, "app-searchable-select", 39);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_137_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onManagerSelectionChange($event));
    }, "CreateEmployeeComponent_Conditional_3_Template_app_searchable_select_selectionChange_137_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(138, CreateEmployeeComponent_Conditional_3_Conditional_138_Template, 2, 1, "div", 18);
    \u0275\u0275conditionalCreate(139, CreateEmployeeComponent_Conditional_3_Conditional_139_Template, 2, 1, "div", 40);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(140, "div", 41)(141, "h6", 42);
    \u0275\u0275element(142, "i", 29);
    \u0275\u0275text(143);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(144, "ul", 43)(145, "li");
    \u0275\u0275text(146);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(147, "li");
    \u0275\u0275text(148);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(149, "li");
    \u0275\u0275text(150);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(151, "li");
    \u0275\u0275text(152);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(153, "li");
    \u0275\u0275text(154);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(155, "li");
    \u0275\u0275text(156);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(157, "div", 44)(158, "button", 45);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateEmployeeComponent_Conditional_3_Template_button_click_158_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "CreateEmployeeComponent_Conditional_3_Template_button_click_158_listener"));
    \u0275\u0275element(159, "i", 46);
    \u0275\u0275text(160);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(161, "button", 47);
    \u0275\u0275conditionalCreate(162, CreateEmployeeComponent_Conditional_3_Conditional_162_Template, 1, 0, "div", 48)(163, CreateEmployeeComponent_Conditional_3_Conditional_163_Template, 1, 0, "i", 49);
    \u0275\u0275text(164);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    let tmp_78_0;
    let tmp_88_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.employee_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.createForm);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.required_information"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.branch"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("branchId"));
    \u0275\u0275property("options", ctx_r0.branchSelectOptions)("value", ((tmp_7_0 = ctx_r0.createForm.get("branchId")) == null ? null : tmp_7_0.value == null ? null : tmp_7_0.value.toString()) || "")("placeholder", ctx_r0.t("common.select_branch"))("searchable", true)("clearable", false);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("branchId") ? 18 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.employee_number"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("employeeNumber"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.employee_number_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("employeeNumber") ? 25 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.employee_number_hint"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.first_name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("firstName"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.first_name_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("firstName") ? 34 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.last_name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("lastName"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.last_name_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("lastName") ? 41 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.hire_date"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("hireDate"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("hireDate") ? 48 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.job_title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("jobTitle"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.job_title_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("jobTitle") ? 55 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.employment_status.title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("employmentStatus"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.employmentStatusValues);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasError("employmentStatus") ? 64 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.work_location.title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("workLocationType"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.workLocationValues);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasError("workLocationType") ? 73 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("employees.additional_information"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.first_name_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("firstNameAr"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.first_name_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("firstNameAr") ? 84 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.last_name_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("lastNameAr"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.last_name_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("lastNameAr") ? 89 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.job_title_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("jobTitleAr"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.job_title_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("jobTitleAr") ? 94 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.national_id"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("nationalId"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.national_id_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("nationalId") ? 99 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.national_id_hint"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.email"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("email"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.email_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("email") ? 106 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.phone"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("phone"));
    \u0275\u0275property("placeholder", ctx_r0.t("employees.phone_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("phone") ? 111 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.date_of_birth"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("dateOfBirth"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("dateOfBirth") ? 116 : -1);
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
    \u0275\u0275conditional(ctx_r0.hasError("gender") ? 127 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.department"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("departmentId"));
    \u0275\u0275property("options", ctx_r0.departmentSelectOptions)("value", ((tmp_78_0 = ctx_r0.createForm.get("departmentId")) == null ? null : tmp_78_0.value == null ? null : tmp_78_0.value.toString()) || "")("placeholder", ctx_r0.t("common.select_department"))("searchable", true)("clearable", false)("disabled", ctx_r0.departments().length === 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("departmentId") ? 132 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.departments().length === 0 ? 133 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("employees.manager"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.hasError("managerEmployeeId"));
    \u0275\u0275property("options", ctx_r0.managerSelectOptions)("value", ((tmp_88_0 = ctx_r0.createForm.get("managerEmployeeId")) == null ? null : tmp_88_0.value == null ? null : tmp_88_0.value.toString()) || "")("placeholder", ctx_r0.t("common.select_manager"))("searchable", true)("clearable", false)("disabled", ctx_r0.managers().length === 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("managerEmployeeId") ? 138 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.managers().length === 0 ? 139 : -1);
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
    \u0275\u0275conditional(ctx_r0.submitting() ? 162 : 163);
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
  // Dropdown data
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  departments = signal([], ...ngDevMode ? [{ debugName: "departments" }] : []);
  managers = signal([], ...ngDevMode ? [{ debugName: "managers" }] : []);
  // Form
  createForm;
  // Enums for templates
  EmploymentStatus = EmploymentStatus;
  Gender = Gender;
  WorkLocationType = WorkLocationType;
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
      managerEmployeeId: [""]
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
        phone: formValue.phone || null
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
__publicField(_CreateEmployeeComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateEmployeeComponent, selectors: [["app-create-employee"]], decls: 4, vars: 3, consts: [[1, "container-fluid"], ["mode", "create", "moduleName", "employees", "moduleRoute", "employees", 3, "title", "loading"], [1, "d-flex", "justify-content-center", "py-5"], [1, "card"], [3, "message", "centered"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fa-solid", "fa-user-plus", "me-2"], [1, "card-body"], [3, "ngSubmit", "formGroup"], [1, "mb-4"], [1, "text-primary", "mb-3"], [1, "fa-solid", "fa-asterisk", "me-2"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable"], [1, "invalid-feedback"], ["type", "text", "formControlName", "employeeNumber", 1, "form-control", 3, "placeholder"], [1, "form-text"], ["type", "text", "formControlName", "firstName", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "lastName", 1, "form-control", 3, "placeholder"], ["type", "date", "formControlName", "hireDate", 1, "form-control"], ["type", "text", "formControlName", "jobTitle", 1, "form-control", 3, "placeholder"], ["formControlName", "employmentStatus", 1, "form-select"], [3, "value"], ["formControlName", "workLocationType", 1, "form-select"], [1, "text-secondary", "mb-3"], [1, "fa-solid", "fa-info-circle", "me-2"], ["type", "text", "formControlName", "firstNameAr", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "lastNameAr", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "jobTitleAr", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "nationalId", 1, "form-control", 3, "placeholder"], ["type", "email", "formControlName", "email", 1, "form-control", 3, "placeholder"], ["type", "tel", "formControlName", "phone", 1, "form-control", 3, "placeholder"], ["type", "date", "formControlName", "dateOfBirth", 1, "form-control"], ["formControlName", "gender", 1, "form-select"], ["value", ""], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable", "disabled"], [1, "form-text", "text-muted"], [1, "alert", "alert-info"], [1, "alert-heading"], [1, "mb-0"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-save", "me-2"]], template: /* @__PURE__ */ __name(function CreateEmployeeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, CreateEmployeeComponent_Conditional_2_Template, 2, 2, "div", 2)(3, CreateEmployeeComponent_Conditional_3_Template, 165, 121, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("employees.create_employee"))("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : 3);
  }
}, "CreateEmployeeComponent_Template"), dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, ReactiveFormsModule, FormGroupDirective, FormControlName, SearchableSelectComponent, FormHeaderComponent, LoadingSpinnerComponent], styles: ["\n\nh6.text-primary[_ngcontent-%COMP%] {\n  color: #0d6efd !important;\n  font-weight: 600;\n  border-left: 3px solid #0d6efd;\n  padding-left: 0.75rem;\n}\nh6.text-secondary[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n  font-weight: 600;\n  border-left: 3px solid #6c757d;\n  padding-left: 0.75rem;\n}\n@media (max-width: 768px) {\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .btn-outline-secondary[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .row.g-3[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n}\nhr[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n  color: #dee2e6;\n}\n.fa-solid[_ngcontent-%COMP%] {\n  margin-right: 0.25rem;\n}\n/*# sourceMappingURL=create-employee.component.css.map */"] }));
var CreateEmployeeComponent = _CreateEmployeeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateEmployeeComponent, [{
    type: Component,
    args: [{ selector: "app-create-employee", standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, SearchableSelectComponent, FormHeaderComponent, LoadingSpinnerComponent], template: `<div class="container-fluid">
  <!-- Header -->
  <app-form-header
    mode="create"
    [title]="t('employees.create_employee')"
    moduleName="employees"
    moduleRoute="employees"
    [loading]="submitting()">
  </app-form-header>

  @if (loading()) {
    <div class="d-flex justify-content-center py-5">
      <app-loading-spinner
        [message]="t('common.loading')"
        [centered]="true">
      </app-loading-spinner>
    </div>
  } @else {
    <!-- Main Form -->
    <div class="card">
      <div class="card-header">
        <h5 class="card-title mb-0">
          <i class="fa-solid fa-user-plus me-2"></i>
          {{ t('employees.employee_information') }}
        </h5>
      </div>
      <div class="card-body">
        <form [formGroup]="createForm" (ngSubmit)="onSubmit()">
          <!-- Required Information Section -->
          <div class="mb-4">
            <h6 class="text-primary mb-3">
              <i class="fa-solid fa-asterisk me-2"></i>
              {{ t('employees.required_information') }}
            </h6>
            <div class="row g-3">
              <!-- Branch -->
              <div class="col-md-6">
                <label class="form-label">
                  {{ t('employees.branch') }}
                  <span class="text-danger">*</span>
                </label>
                <app-searchable-select
                  [options]="branchSelectOptions"
                  [value]="createForm.get('branchId')?.value?.toString() || ''"
                  (selectionChange)="onBranchSelectionChange($event)"
                  [placeholder]="t('common.select_branch')"
                  [searchable]="true"
                  [clearable]="false"
                  [class.is-invalid]="hasError('branchId')"
                ></app-searchable-select>
                @if (hasError('branchId')) {
                  <div class="invalid-feedback">{{ getError('branchId') }}</div>
                }
              </div>

              <!-- Employee Number -->
              <div class="col-md-6">
                <label class="form-label">
                  {{ t('employees.employee_number') }}
                  <span class="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  class="form-control" 
                  formControlName="employeeNumber"
                  [class.is-invalid]="hasError('employeeNumber')"
                  [placeholder]="t('employees.employee_number_placeholder')">
                @if (hasError('employeeNumber')) {
                  <div class="invalid-feedback">{{ getError('employeeNumber') }}</div>
                }
                <div class="form-text">{{ t('employees.employee_number_hint') }}</div>
              </div>

              <!-- First Name -->
              <div class="col-md-6">
                <label class="form-label">
                  {{ t('employees.first_name') }}
                  <span class="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  class="form-control" 
                  formControlName="firstName"
                  [class.is-invalid]="hasError('firstName')"
                  [placeholder]="t('employees.first_name_placeholder')">
                @if (hasError('firstName')) {
                  <div class="invalid-feedback">{{ getError('firstName') }}</div>
                }
              </div>

              <!-- Last Name -->
              <div class="col-md-6">
                <label class="form-label">
                  {{ t('employees.last_name') }}
                  <span class="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  class="form-control" 
                  formControlName="lastName"
                  [class.is-invalid]="hasError('lastName')"
                  [placeholder]="t('employees.last_name_placeholder')">
                @if (hasError('lastName')) {
                  <div class="invalid-feedback">{{ getError('lastName') }}</div>
                }
              </div>

              <!-- Hire Date -->
              <div class="col-md-6">
                <label class="form-label">
                  {{ t('employees.hire_date') }}
                  <span class="text-danger">*</span>
                </label>
                <input 
                  type="date" 
                  class="form-control" 
                  formControlName="hireDate"
                  [class.is-invalid]="hasError('hireDate')">
                @if (hasError('hireDate')) {
                  <div class="invalid-feedback">{{ getError('hireDate') }}</div>
                }
              </div>

              <!-- Job Title -->
              <div class="col-md-6">
                <label class="form-label">
                  {{ t('employees.job_title') }}
                  <span class="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  class="form-control" 
                  formControlName="jobTitle"
                  [class.is-invalid]="hasError('jobTitle')"
                  [placeholder]="t('employees.job_title_placeholder')">
                @if (hasError('jobTitle')) {
                  <div class="invalid-feedback">{{ getError('jobTitle') }}</div>
                }
              </div>

              <!-- Employment Status -->
              <div class="col-md-6">
                <label class="form-label">
                  {{ t('employees.employment_status.title') }}
                  <span class="text-danger">*</span>
                </label>
                <select 
                  class="form-select" 
                  formControlName="employmentStatus"
                  [class.is-invalid]="hasError('employmentStatus')">
                  @for (status of employmentStatusValues; track status) {
                    <option [value]="status">{{ getEmploymentStatusLabel(status) }}</option>
                  }
                </select>
                @if (hasError('employmentStatus')) {
                  <div class="invalid-feedback">{{ getError('employmentStatus') }}</div>
                }
              </div>

              <!-- Work Location -->
              <div class="col-md-6">
                <label class="form-label">
                  {{ t('employees.work_location.title') }}
                  <span class="text-danger">*</span>
                </label>
                <select 
                  class="form-select" 
                  formControlName="workLocationType"
                  [class.is-invalid]="hasError('workLocationType')">
                  @for (type of workLocationValues; track type) {
                    <option [value]="type">{{ getWorkLocationTypeLabel(type) }}</option>
                  }
                </select>
                @if (hasError('workLocationType')) {
                  <div class="invalid-feedback">{{ getError('workLocationType') }}</div>
                }
              </div>
            </div>
          </div>

          <hr>

          <!-- Optional Information Section -->
          <div class="mb-4">
            <h6 class="text-secondary mb-3">
              <i class="fa-solid fa-info-circle me-2"></i>
              {{ t('employees.additional_information') }}
            </h6>
            <div class="row g-3">
              <!-- Arabic Names -->
              <div class="col-md-6">
                <label class="form-label">{{ t('employees.first_name_ar') }}</label>
                <input 
                  type="text" 
                  class="form-control" 
                  formControlName="firstNameAr"
                  [class.is-invalid]="hasError('firstNameAr')"
                  [placeholder]="t('employees.first_name_ar_placeholder')">
                @if (hasError('firstNameAr')) {
                  <div class="invalid-feedback">{{ getError('firstNameAr') }}</div>
                }
              </div>

              <div class="col-md-6">
                <label class="form-label">{{ t('employees.last_name_ar') }}</label>
                <input 
                  type="text" 
                  class="form-control" 
                  formControlName="lastNameAr"
                  [class.is-invalid]="hasError('lastNameAr')"
                  [placeholder]="t('employees.last_name_ar_placeholder')">
                @if (hasError('lastNameAr')) {
                  <div class="invalid-feedback">{{ getError('lastNameAr') }}</div>
                }
              </div>

              <!-- Job Title Arabic -->
              <div class="col-md-6">
                <label class="form-label">{{ t('employees.job_title_ar') }}</label>
                <input 
                  type="text" 
                  class="form-control" 
                  formControlName="jobTitleAr"
                  [class.is-invalid]="hasError('jobTitleAr')"
                  [placeholder]="t('employees.job_title_ar_placeholder')">
                @if (hasError('jobTitleAr')) {
                  <div class="invalid-feedback">{{ getError('jobTitleAr') }}</div>
                }
              </div>

              <!-- National ID -->
              <div class="col-md-6">
                <label class="form-label">{{ t('employees.national_id') }}</label>
                <input 
                  type="text" 
                  class="form-control" 
                  formControlName="nationalId"
                  [class.is-invalid]="hasError('nationalId')"
                  [placeholder]="t('employees.national_id_placeholder')">
                @if (hasError('nationalId')) {
                  <div class="invalid-feedback">{{ getError('nationalId') }}</div>
                }
                <div class="form-text">{{ t('employees.national_id_hint') }}</div>
              </div>

              <!-- Email -->
              <div class="col-md-6">
                <label class="form-label">{{ t('employees.email') }}</label>
                <input 
                  type="email" 
                  class="form-control" 
                  formControlName="email"
                  [class.is-invalid]="hasError('email')"
                  [placeholder]="t('employees.email_placeholder')">
                @if (hasError('email')) {
                  <div class="invalid-feedback">{{ getError('email') }}</div>
                }
              </div>

              <!-- Phone -->
              <div class="col-md-6">
                <label class="form-label">{{ t('employees.phone') }}</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  formControlName="phone"
                  [class.is-invalid]="hasError('phone')"
                  [placeholder]="t('employees.phone_placeholder')">
                @if (hasError('phone')) {
                  <div class="invalid-feedback">{{ getError('phone') }}</div>
                }
              </div>

              <!-- Date of Birth -->
              <div class="col-md-6">
                <label class="form-label">{{ t('employees.date_of_birth') }}</label>
                <input 
                  type="date" 
                  class="form-control" 
                  formControlName="dateOfBirth"
                  [class.is-invalid]="hasError('dateOfBirth')">
                @if (hasError('dateOfBirth')) {
                  <div class="invalid-feedback">{{ getError('dateOfBirth') }}</div>
                }
                <div class="form-text">{{ t('employees.minimum_age_hint') }}</div>
              </div>

              <!-- Gender -->
              <div class="col-md-6">
                <label class="form-label">{{ t('employees.gender.title') }}</label>
                <select 
                  class="form-select" 
                  formControlName="gender"
                  [class.is-invalid]="hasError('gender')">
                  <option value="">{{ t('common.select') }}</option>
                  @for (gender of genderValues; track gender) {
                    <option [value]="gender">{{ getGenderLabel(gender) }}</option>
                  }
                </select>
                @if (hasError('gender')) {
                  <div class="invalid-feedback">{{ getError('gender') }}</div>
                }
              </div>

              <!-- Department -->
              <div class="col-md-6">
                <label class="form-label">{{ t('employees.department') }}</label>
                <app-searchable-select
                  [options]="departmentSelectOptions"
                  [value]="createForm.get('departmentId')?.value?.toString() || ''"
                  (selectionChange)="onDepartmentSelectionChange($event)"
                  [placeholder]="t('common.select_department')"
                  [searchable]="true"
                  [clearable]="false"
                  [disabled]="departments().length === 0"
                  [class.is-invalid]="hasError('departmentId')"
                ></app-searchable-select>
                @if (hasError('departmentId')) {
                  <div class="invalid-feedback">{{ getError('departmentId') }}</div>
                }
                @if (departments().length === 0) {
                  <div class="form-text text-muted">{{ t('employees.select_branch_first') }}</div>
                }
              </div>

              <!-- Manager -->
              <div class="col-md-6">
                <label class="form-label">{{ t('employees.manager') }}</label>
                <app-searchable-select
                  [options]="managerSelectOptions"
                  [value]="createForm.get('managerEmployeeId')?.value?.toString() || ''"
                  (selectionChange)="onManagerSelectionChange($event)"
                  [placeholder]="t('common.select_manager')"
                  [searchable]="true"
                  [clearable]="false"
                  [disabled]="managers().length === 0"
                  [class.is-invalid]="hasError('managerEmployeeId')"
                ></app-searchable-select>
                @if (hasError('managerEmployeeId')) {
                  <div class="invalid-feedback">{{ getError('managerEmployeeId') }}</div>
                }
                @if (managers().length === 0) {
                  <div class="form-text text-muted">{{ t('employees.select_branch_first') }}</div>
                }
              </div>
            </div>
          </div>

          <!-- Validation Rules Info -->
          <div class="alert alert-info">
            <h6 class="alert-heading">
              <i class="fa-solid fa-info-circle me-2"></i>
              {{ t('employees.validation_rules.title') }}
            </h6>
            <ul class="mb-0">
              <li>{{ t('employees.validation_rules.employee_number') }}</li>
              <li>{{ t('employees.validation_rules.names') }}</li>
              <li>{{ t('employees.validation_rules.email') }}</li>
              <li>{{ t('employees.validation_rules.phone') }}</li>
              <li>{{ t('employees.validation_rules.national_id') }}</li>
              <li>{{ t('employees.validation_rules.age') }}</li>
            </ul>
          </div>

          <!-- Form Actions -->
          <div class="d-flex justify-content-end gap-2">
            <button 
              type="button" 
              class="btn btn-outline-secondary"
              (click)="onCancel()"
              [disabled]="submitting()">
              <i class="fa-solid fa-times me-2"></i>
              {{ t('common.cancel') }}
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="createForm.invalid || submitting()">
              @if (submitting()) {
                <div class="spinner-border spinner-border-sm me-2"></div>
              } @else {
                <i class="fa-solid fa-save me-2"></i>
              }
              {{ submitting() ? t('common.saving') : t('employees.create_employee') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  }`, styles: ["/* src/app/pages/employees/create-employee/create-employee.component.css */\nh6.text-primary {\n  color: #0d6efd !important;\n  font-weight: 600;\n  border-left: 3px solid #0d6efd;\n  padding-left: 0.75rem;\n}\nh6.text-secondary {\n  color: #6c757d !important;\n  font-weight: 600;\n  border-left: 3px solid #6c757d;\n  padding-left: 0.75rem;\n}\n@media (max-width: 768px) {\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .btn-outline-secondary {\n    align-self: flex-start;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .row.g-3 > * {\n    margin-bottom: 1rem;\n  }\n}\nhr {\n  margin: 1.5rem 0;\n  color: #dee2e6;\n}\n.fa-solid {\n  margin-right: 0.25rem;\n}\n/*# sourceMappingURL=create-employee.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateEmployeeComponent, { className: "CreateEmployeeComponent", filePath: "src/app/pages/employees/create-employee/create-employee.component.ts", lineNumber: 27 });
})();
export {
  CreateEmployeeComponent
};
//# sourceMappingURL=chunk-FJAH6NWV.js.map
