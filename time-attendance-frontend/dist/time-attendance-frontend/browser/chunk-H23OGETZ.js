import {
  SearchableSelectComponent
} from "./chunk-2D23Y7U6.js";
import {
  EmployeesService
} from "./chunk-5B6AVE4S.js";
import {
  DefaultValueAccessor,
  FormBuilder,
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
} from "./chunk-GYSVNBR7.js";
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
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/employees/edit-employee/edit-employee.component.ts
function EditEmployeeComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 13)(2, "span", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
  }
}
__name(EditEmployeeComponent_Conditional_18_Template, "EditEmployeeComponent_Conditional_18_Template");
function EditEmployeeComponent_Conditional_19_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "i", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_7_Template, "EditEmployeeComponent_Conditional_19_Conditional_7_Template");
function EditEmployeeComponent_Conditional_19_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("firstName"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_31_Template, "EditEmployeeComponent_Conditional_19_Conditional_31_Template");
function EditEmployeeComponent_Conditional_19_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("lastName"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_38_Template, "EditEmployeeComponent_Conditional_19_Conditional_38_Template");
function EditEmployeeComponent_Conditional_19_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("jobTitle"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_45_Template, "EditEmployeeComponent_Conditional_19_Conditional_45_Template");
function EditEmployeeComponent_Conditional_19_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("employmentStatus"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_70_Template, "EditEmployeeComponent_Conditional_19_Conditional_70_Template");
function EditEmployeeComponent_Conditional_19_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("workLocationType"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_85_Template, "EditEmployeeComponent_Conditional_19_Conditional_85_Template");
function EditEmployeeComponent_Conditional_19_Conditional_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("firstNameAr"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_96_Template, "EditEmployeeComponent_Conditional_19_Conditional_96_Template");
function EditEmployeeComponent_Conditional_19_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("lastNameAr"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_101_Template, "EditEmployeeComponent_Conditional_19_Conditional_101_Template");
function EditEmployeeComponent_Conditional_19_Conditional_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("jobTitleAr"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_106_Template, "EditEmployeeComponent_Conditional_19_Conditional_106_Template");
function EditEmployeeComponent_Conditional_19_Conditional_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("email"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_111_Template, "EditEmployeeComponent_Conditional_19_Conditional_111_Template");
function EditEmployeeComponent_Conditional_19_Conditional_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("phone"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_116_Template, "EditEmployeeComponent_Conditional_19_Conditional_116_Template");
function EditEmployeeComponent_Conditional_19_Conditional_121_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("nationalId"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_121_Template, "EditEmployeeComponent_Conditional_19_Conditional_121_Template");
function EditEmployeeComponent_Conditional_19_Conditional_126_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("dateOfBirth"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_126_Template, "EditEmployeeComponent_Conditional_19_Conditional_126_Template");
function EditEmployeeComponent_Conditional_19_Conditional_137_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("gender"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_137_Template, "EditEmployeeComponent_Conditional_19_Conditional_137_Template");
function EditEmployeeComponent_Conditional_19_Conditional_142_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("departmentId"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_142_Template, "EditEmployeeComponent_Conditional_19_Conditional_142_Template");
function EditEmployeeComponent_Conditional_19_Conditional_147_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("managerEmployeeId"));
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_147_Template, "EditEmployeeComponent_Conditional_19_Conditional_147_Template");
function EditEmployeeComponent_Conditional_19_Conditional_153_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 60);
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_153_Template, "EditEmployeeComponent_Conditional_19_Conditional_153_Template");
function EditEmployeeComponent_Conditional_19_Conditional_154_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 61);
  }
}
__name(EditEmployeeComponent_Conditional_19_Conditional_154_Template, "EditEmployeeComponent_Conditional_19_Conditional_154_Template");
function EditEmployeeComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 15)(2, "h5", 16);
    \u0275\u0275element(3, "i", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 18)(6, "form", 19);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditEmployeeComponent_Conditional_19_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "EditEmployeeComponent_Conditional_19_Template_form_ngSubmit_6_listener"));
    \u0275\u0275conditionalCreate(7, EditEmployeeComponent_Conditional_19_Conditional_7_Template, 3, 1, "div", 20);
    \u0275\u0275elementStart(8, "div", 21)(9, "h6", 22);
    \u0275\u0275element(10, "i", 23);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 24)(13, "div", 25)(14, "label", 26);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 27);
    \u0275\u0275elementStart(17, "div", 28);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 25)(20, "label", 26);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 27);
    \u0275\u0275elementStart(23, "div", 28);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 25)(26, "label", 26);
    \u0275\u0275text(27);
    \u0275\u0275elementStart(28, "span", 29);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(30, "input", 30);
    \u0275\u0275conditionalCreate(31, EditEmployeeComponent_Conditional_19_Conditional_31_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 25)(33, "label", 26);
    \u0275\u0275text(34);
    \u0275\u0275elementStart(35, "span", 29);
    \u0275\u0275text(36, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(37, "input", 32);
    \u0275\u0275conditionalCreate(38, EditEmployeeComponent_Conditional_19_Conditional_38_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 25)(40, "label", 26);
    \u0275\u0275text(41);
    \u0275\u0275elementStart(42, "span", 29);
    \u0275\u0275text(43, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(44, "input", 33);
    \u0275\u0275conditionalCreate(45, EditEmployeeComponent_Conditional_19_Conditional_45_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 25)(47, "label", 26);
    \u0275\u0275text(48);
    \u0275\u0275elementStart(49, "span", 29);
    \u0275\u0275text(50, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "select", 34)(52, "option", 35);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "option", 36);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "option", 37);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "option", 38);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "option", 39);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "option", 40);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "option", 41);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "option", 42);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "option", 43);
    \u0275\u0275text(69);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(70, EditEmployeeComponent_Conditional_19_Conditional_70_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "div", 25)(72, "label", 26);
    \u0275\u0275text(73);
    \u0275\u0275elementStart(74, "span", 29);
    \u0275\u0275text(75, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "select", 44)(77, "option", 35);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "option", 36);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "option", 37);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "option", 38);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(85, EditEmployeeComponent_Conditional_19_Conditional_85_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(86, "hr");
    \u0275\u0275elementStart(87, "div", 21)(88, "h6", 45);
    \u0275\u0275element(89, "i", 46);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "div", 24)(92, "div", 25)(93, "label", 26);
    \u0275\u0275text(94);
    \u0275\u0275elementEnd();
    \u0275\u0275element(95, "input", 47);
    \u0275\u0275conditionalCreate(96, EditEmployeeComponent_Conditional_19_Conditional_96_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "div", 25)(98, "label", 26);
    \u0275\u0275text(99);
    \u0275\u0275elementEnd();
    \u0275\u0275element(100, "input", 48);
    \u0275\u0275conditionalCreate(101, EditEmployeeComponent_Conditional_19_Conditional_101_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "div", 25)(103, "label", 26);
    \u0275\u0275text(104);
    \u0275\u0275elementEnd();
    \u0275\u0275element(105, "input", 49);
    \u0275\u0275conditionalCreate(106, EditEmployeeComponent_Conditional_19_Conditional_106_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "div", 25)(108, "label", 26);
    \u0275\u0275text(109);
    \u0275\u0275elementEnd();
    \u0275\u0275element(110, "input", 50);
    \u0275\u0275conditionalCreate(111, EditEmployeeComponent_Conditional_19_Conditional_111_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(112, "div", 25)(113, "label", 26);
    \u0275\u0275text(114);
    \u0275\u0275elementEnd();
    \u0275\u0275element(115, "input", 51);
    \u0275\u0275conditionalCreate(116, EditEmployeeComponent_Conditional_19_Conditional_116_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(117, "div", 25)(118, "label", 26);
    \u0275\u0275text(119);
    \u0275\u0275elementEnd();
    \u0275\u0275element(120, "input", 52);
    \u0275\u0275conditionalCreate(121, EditEmployeeComponent_Conditional_19_Conditional_121_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "div", 25)(123, "label", 26);
    \u0275\u0275text(124);
    \u0275\u0275elementEnd();
    \u0275\u0275element(125, "input", 53);
    \u0275\u0275conditionalCreate(126, EditEmployeeComponent_Conditional_19_Conditional_126_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(127, "div", 25)(128, "label", 26);
    \u0275\u0275text(129);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(130, "select", 54)(131, "option", 35);
    \u0275\u0275text(132);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "option", 36);
    \u0275\u0275text(134);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(135, "option", 37);
    \u0275\u0275text(136);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(137, EditEmployeeComponent_Conditional_19_Conditional_137_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(138, "div", 25)(139, "label", 26);
    \u0275\u0275text(140);
    \u0275\u0275elementEnd();
    \u0275\u0275element(141, "app-searchable-select", 55);
    \u0275\u0275conditionalCreate(142, EditEmployeeComponent_Conditional_19_Conditional_142_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(143, "div", 25)(144, "label", 26);
    \u0275\u0275text(145);
    \u0275\u0275elementEnd();
    \u0275\u0275element(146, "app-searchable-select", 56);
    \u0275\u0275conditionalCreate(147, EditEmployeeComponent_Conditional_19_Conditional_147_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(148, "div", 57)(149, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditEmployeeComponent_Conditional_19_Template_button_click_149_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditEmployeeComponent_Conditional_19_Template_button_click_149_listener"));
    \u0275\u0275element(150, "i", 58);
    \u0275\u0275text(151);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(152, "button", 59);
    \u0275\u0275conditionalCreate(153, EditEmployeeComponent_Conditional_19_Conditional_153_Template, 1, 0, "span", 60)(154, EditEmployeeComponent_Conditional_19_Conditional_154_Template, 1, 0, "i", 61);
    \u0275\u0275text(155);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_9_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.employee_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.employeeForm);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.error() ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.required_information"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employee_number"));
    \u0275\u0275advance();
    \u0275\u0275property("value", (tmp_6_0 = ctx_r0.employee()) == null ? null : tmp_6_0.employeeNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employee_number_readonly"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.branch"));
    \u0275\u0275advance();
    \u0275\u0275property("value", (tmp_9_0 = ctx_r0.employee()) == null ? null : tmp_9_0.branchName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.branch_readonly"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.first_name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("firstName"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.first_name_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("firstName") ? 31 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.last_name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("lastName"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.last_name_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("lastName") ? 38 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.job_title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("jobTitle"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.job_title_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("jobTitle") ? 45 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.employment_status.title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("employmentStatus"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.select"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employment_status.active"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employment_status.fulltime"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employment_status.parttime"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employment_status.contract"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employment_status.intern"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employment_status.consultant"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employment_status.terminated"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.employment_status.inactive"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("employmentStatus") ? 70 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.work_location.title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("workLocationType"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.select"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.work_location.onsite"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.work_location.remote"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.work_location.hybrid"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("workLocationType") ? 85 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employees.additional_information"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.first_name_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("firstNameAr"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.first_name_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("firstNameAr") ? 96 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.last_name_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("lastNameAr"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.last_name_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("lastNameAr") ? 101 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.job_title_ar"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("jobTitleAr"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.job_title_ar_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("jobTitleAr") ? 106 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.email"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("email"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.email_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("email") ? 111 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.phone"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("phone"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.phone_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("phone") ? 116 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.national_id"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("nationalId"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("employees.national_id_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("nationalId") ? 121 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.date_of_birth"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("dateOfBirth"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("dateOfBirth") ? 126 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.gender.title"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("gender"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.select"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.gender.male"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.gender.female"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("gender") ? 137 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.department"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("departmentId"));
    \u0275\u0275property("options", ctx_r0.departmentSelectOptions)("placeholder", ctx_r0.i18n.t("common.select_department"))("searchable", true)("clearable", false);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("departmentId") ? 142 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employees.manager"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("managerEmployeeId"));
    \u0275\u0275property("options", ctx_r0.managerSelectOptions)("placeholder", ctx_r0.i18n.t("common.select_manager"))("searchable", true)("clearable", false);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("managerEmployeeId") ? 147 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.employeeForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 153 : 154);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? ctx_r0.i18n.t("common.saving") : ctx_r0.i18n.t("employees.update_employee"), " ");
  }
}
__name(EditEmployeeComponent_Conditional_19_Template, "EditEmployeeComponent_Conditional_19_Template");
function EditEmployeeComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "i", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.i18n.t("employees.employee_not_found"), " ");
  }
}
__name(EditEmployeeComponent_Conditional_20_Template, "EditEmployeeComponent_Conditional_20_Template");
var _EditEmployeeComponent = class _EditEmployeeComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  employeesService = inject(EmployeesService);
  fb = inject(FormBuilder);
  i18n = inject(I18nService);
  employee = signal(null, ...ngDevMode ? [{ debugName: "employee" }] : []);
  departments = signal([], ...ngDevMode ? [{ debugName: "departments" }] : []);
  managers = signal([], ...ngDevMode ? [{ debugName: "managers" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  employeeForm;
  ngOnInit() {
    this.initializeForm();
    const employeeId = this.route.snapshot.paramMap.get("id");
    if (employeeId) {
      this.loadDepartmentsAndEmployee(employeeId);
    } else {
      this.error.set(this.i18n.t("employees.invalid_employee_id"));
      this.loading.set(false);
    }
  }
  initializeForm() {
    this.employeeForm = this.fb.group({
      branchId: [""],
      // Add branchId field for department loading logic
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      firstNameAr: [""],
      lastNameAr: [""],
      jobTitle: ["", Validators.required],
      jobTitleAr: [""],
      email: ["", Validators.email],
      phone: [""],
      nationalId: [""],
      dateOfBirth: [""],
      gender: [""],
      employmentStatus: ["", Validators.required],
      workLocationType: ["", Validators.required],
      departmentId: [""],
      managerEmployeeId: [""]
    });
  }
  loadDepartmentsAndEmployee(employeeId) {
    this.employeesService.getDepartments().subscribe({
      next: /* @__PURE__ */ __name((departments) => {
        this.departments.set(departments);
        this.employeesService.getEmployeeById(+employeeId).subscribe({
          next: /* @__PURE__ */ __name((employee) => {
            this.employee.set(employee);
            this.employeesService.getManagers(employee.branchId).subscribe({
              next: /* @__PURE__ */ __name((managers) => {
                this.managers.set(managers);
                this.populateForm(employee);
                this.loading.set(false);
              }, "next"),
              error: /* @__PURE__ */ __name((error) => {
                console.error("Error loading managers:", error);
                this.managers.set([]);
                this.populateForm(employee);
                this.loading.set(false);
              }, "error")
            });
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            this.error.set(this.getErrorMessage(error));
            this.loading.set(false);
          }, "error")
        });
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading departments:", error);
        this.departments.set([]);
        this.loadEmployee(employeeId);
      }, "error")
    });
  }
  loadEmployee(employeeId) {
    this.employeesService.getEmployeeById(+employeeId).subscribe({
      next: /* @__PURE__ */ __name((employee) => {
        this.employee.set(employee);
        this.loadManagers(employee.branchId.toString());
        this.populateForm(employee);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }, "error")
    });
  }
  loadManagers(branchId) {
    this.employeesService.getManagers(+branchId).subscribe({
      next: /* @__PURE__ */ __name((managers) => {
        this.managers.set(managers);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading managers:", error);
        this.managers.set([]);
      }, "error")
    });
  }
  populateForm(employee) {
    let dateOfBirthValue = "";
    if (employee.dateOfBirth) {
      const dateMatch = employee.dateOfBirth.toString().match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (dateMatch) {
        dateOfBirthValue = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
      }
    }
    this.employeeForm.patchValue({
      branchId: employee.branchId,
      // Set branchId for department loading logic
      firstName: employee.firstName,
      lastName: employee.lastName,
      firstNameAr: employee.firstNameAr || "",
      lastNameAr: employee.lastNameAr || "",
      jobTitle: employee.jobTitle,
      jobTitleAr: employee.jobTitleAr || "",
      email: employee.email || "",
      phone: employee.phone || "",
      nationalId: employee.nationalId || "",
      dateOfBirth: dateOfBirthValue,
      gender: employee.gender || "",
      employmentStatus: employee.employmentStatus,
      workLocationType: employee.workLocationType,
      departmentId: employee.departmentId ? employee.departmentId.toString() : "",
      managerEmployeeId: employee.managerEmployeeId ? employee.managerEmployeeId.toString() : ""
    });
  }
  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set("");
    const formValue = this.employeeForm.value;
    const updateRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      firstNameAr: formValue.firstNameAr || null,
      lastNameAr: formValue.lastNameAr || null,
      jobTitle: formValue.jobTitle,
      jobTitleAr: formValue.jobTitleAr || null,
      email: formValue.email || null,
      phone: formValue.phone || null,
      nationalId: formValue.nationalId || null,
      dateOfBirth: formValue.dateOfBirth || null,
      gender: formValue.gender ? +formValue.gender : null,
      employmentStatus: +formValue.employmentStatus,
      workLocationType: +formValue.workLocationType,
      departmentId: formValue.departmentId ? +formValue.departmentId : null,
      managerEmployeeId: formValue.managerEmployeeId ? +formValue.managerEmployeeId : null,
      photoUrl: null
    };
    this.employeesService.updateEmployee(this.employee().id, updateRequest).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.saving.set(false);
        this.router.navigate(["/employees", this.employee().id, "view"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.saving.set(false);
        this.error.set(this.getErrorMessage(error));
      }, "error")
    });
  }
  onCancel() {
    if (this.employee()) {
      this.router.navigate(["/employees", this.employee().id, "view"]);
    } else {
      this.router.navigate(["/employees"]);
    }
  }
  // Form field helpers
  getFieldError(fieldName) {
    const field = this.employeeForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"]) {
        return this.i18n.t("validation.required");
      }
      if (field.errors["email"]) {
        return this.i18n.t("validation.email");
      }
      if (field.errors["minlength"]) {
        return this.i18n.t("validation.minlength").replace("{{min}}", field.errors["minlength"].requiredLength);
      }
    }
    return "";
  }
  isFieldInvalid(fieldName) {
    const field = this.employeeForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }
  // Searchable select options
  get departmentSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.select_department") }
    ];
    this.departments().forEach((dept) => {
      options.push({
        value: dept.id.toString(),
        label: dept.name,
        subLabel: dept.nameAr || ""
      });
    });
    return options;
  }
  get managerSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.select_manager") }
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
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t("errors.unknown");
  }
};
__name(_EditEmployeeComponent, "EditEmployeeComponent");
__publicField(_EditEmployeeComponent, "\u0275fac", /* @__PURE__ */ __name(function EditEmployeeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditEmployeeComponent)();
}, "EditEmployeeComponent_Factory"));
__publicField(_EditEmployeeComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditEmployeeComponent, selectors: [["app-edit-employee"]], decls: 21, vars: 7, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/dashboard"], ["routerLink", "/employees"], [1, "breadcrumb-item", "active"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-arrow-left", "me-2"], [1, "d-flex", "justify-content-center", "py-5"], [1, "card"], [1, "alert", "alert-danger"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fa-solid", "fa-user", "me-2"], [1, "card-body"], [3, "ngSubmit", "formGroup"], ["role", "alert", 1, "alert", "alert-danger"], [1, "mb-4"], [1, "text-primary", "mb-3"], [1, "fa-solid", "fa-asterisk", "me-2"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], ["type", "text", "readonly", "", 1, "form-control-plaintext", 3, "value"], [1, "form-text"], [1, "text-danger"], ["type", "text", "formControlName", "firstName", 1, "form-control", 3, "placeholder"], [1, "invalid-feedback"], ["type", "text", "formControlName", "lastName", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "jobTitle", 1, "form-control", 3, "placeholder"], ["formControlName", "employmentStatus", 1, "form-select"], ["value", ""], ["value", "1"], ["value", "2"], ["value", "3"], ["value", "4"], ["value", "5"], ["value", "6"], ["value", "7"], ["value", "8"], ["formControlName", "workLocationType", 1, "form-select"], [1, "text-secondary", "mb-3"], [1, "fa-solid", "fa-info-circle", "me-2"], ["type", "text", "formControlName", "firstNameAr", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "lastNameAr", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "jobTitleAr", 1, "form-control", 3, "placeholder"], ["type", "email", "formControlName", "email", 1, "form-control", 3, "placeholder"], ["type", "tel", "formControlName", "phone", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "nationalId", 1, "form-control", 3, "placeholder"], ["type", "date", "formControlName", "dateOfBirth", 1, "form-control"], ["formControlName", "gender", 1, "form-select"], ["formControlName", "departmentId", 3, "options", "placeholder", "searchable", "clearable"], ["formControlName", "managerEmployeeId", 3, "options", "placeholder", "searchable", "clearable"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-save", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function EditEmployeeComponent_Template(rf, ctx) {
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
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditEmployeeComponent_Template_button_click_15_listener() {
      return ctx.onCancel();
    }, "EditEmployeeComponent_Template_button_click_15_listener"));
    \u0275\u0275element(16, "i", 9);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, EditEmployeeComponent_Conditional_18_Template, 4, 1, "div", 10)(19, EditEmployeeComponent_Conditional_19_Template, 156, 109, "div", 11)(20, EditEmployeeComponent_Conditional_20_Template, 3, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("employees.edit_employee"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.i18n.t("dashboard.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("employees.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.i18n.t("employees.edit_employee"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 18 : ctx.employee() ? 19 : 20);
  }
}, "EditEmployeeComponent_Template"), dependencies: [RouterModule, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, SearchableSelectComponent], encapsulation: 2 }));
var EditEmployeeComponent = _EditEmployeeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditEmployeeComponent, [{
    type: Component,
    args: [{
      selector: "app-edit-employee",
      standalone: true,
      imports: [RouterModule, ReactiveFormsModule, SearchableSelectComponent],
      template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('employees.edit_employee') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/employees">{{ i18n.t('employees.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('employees.edit_employee') }}</li>
            </ol>
          </nav>
        </div>
        <button 
          type="button" 
          class="btn btn-outline-secondary"
          (click)="onCancel()"
          [disabled]="saving()">
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
      } @else if (employee()) {
        <!-- Main Form Card -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="fa-solid fa-user me-2"></i>
              {{ i18n.t('employees.employee_information') }}
            </h5>
          </div>
          <div class="card-body">
            <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
              @if (error()) {
                <div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-exclamation-triangle me-2"></i>
                  {{ error() }}
                </div>
              }

              <!-- Required Information Section -->
              <div class="mb-4">
                <h6 class="text-primary mb-3">
                  <i class="fa-solid fa-asterisk me-2"></i>
                  {{ i18n.t('employees.required_information') }}
                </h6>
                <div class="row g-3">
                  <!-- Employee Number (Read-only for edit) -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.employee_number') }}</label>
                    <input 
                      type="text" 
                      class="form-control-plaintext" 
                      [value]="employee()?.employeeNumber"
                      readonly>
                    <div class="form-text">{{ i18n.t('employees.employee_number_readonly') }}</div>
                  </div>

                  <!-- Branch (Read-only for edit) -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.branch') }}</label>
                    <input 
                      type="text" 
                      class="form-control-plaintext" 
                      [value]="employee()?.branchName"
                      readonly>
                    <div class="form-text">{{ i18n.t('employees.branch_readonly') }}</div>
                  </div>

                  <!-- First Name -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.first_name') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="firstName"
                      [class.is-invalid]="isFieldInvalid('firstName')"
                      [placeholder]="i18n.t('employees.first_name_placeholder')">
                    @if (isFieldInvalid('firstName')) {
                      <div class="invalid-feedback">{{ getFieldError('firstName') }}</div>
                    }
                  </div>

                  <!-- Last Name -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.last_name') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="lastName"
                      [class.is-invalid]="isFieldInvalid('lastName')"
                      [placeholder]="i18n.t('employees.last_name_placeholder')">
                    @if (isFieldInvalid('lastName')) {
                      <div class="invalid-feedback">{{ getFieldError('lastName') }}</div>
                    }
                  </div>

                  <!-- Job Title -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.job_title') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="jobTitle"
                      [class.is-invalid]="isFieldInvalid('jobTitle')"
                      [placeholder]="i18n.t('employees.job_title_placeholder')">
                    @if (isFieldInvalid('jobTitle')) {
                      <div class="invalid-feedback">{{ getFieldError('jobTitle') }}</div>
                    }
                  </div>

                  <!-- Employment Status -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.employment_status.title') }}
                      <span class="text-danger">*</span>
                    </label>
                    <select 
                      class="form-select" 
                      formControlName="employmentStatus"
                      [class.is-invalid]="isFieldInvalid('employmentStatus')">
                      <option value="">{{ i18n.t('common.select') }}</option>
                      <option value="1">{{ i18n.t('employees.employment_status.active') }}</option>
                      <option value="2">{{ i18n.t('employees.employment_status.fulltime') }}</option>
                      <option value="3">{{ i18n.t('employees.employment_status.parttime') }}</option>
                      <option value="4">{{ i18n.t('employees.employment_status.contract') }}</option>
                      <option value="5">{{ i18n.t('employees.employment_status.intern') }}</option>
                      <option value="6">{{ i18n.t('employees.employment_status.consultant') }}</option>
                      <option value="7">{{ i18n.t('employees.employment_status.terminated') }}</option>
                      <option value="8">{{ i18n.t('employees.employment_status.inactive') }}</option>
                    </select>
                    @if (isFieldInvalid('employmentStatus')) {
                      <div class="invalid-feedback">{{ getFieldError('employmentStatus') }}</div>
                    }
                  </div>

                  <!-- Work Location -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.work_location.title') }}
                      <span class="text-danger">*</span>
                    </label>
                    <select 
                      class="form-select" 
                      formControlName="workLocationType"
                      [class.is-invalid]="isFieldInvalid('workLocationType')">
                      <option value="">{{ i18n.t('common.select') }}</option>
                      <option value="1">{{ i18n.t('employees.work_location.onsite') }}</option>
                      <option value="2">{{ i18n.t('employees.work_location.remote') }}</option>
                      <option value="3">{{ i18n.t('employees.work_location.hybrid') }}</option>
                    </select>
                    @if (isFieldInvalid('workLocationType')) {
                      <div class="invalid-feedback">{{ getFieldError('workLocationType') }}</div>
                    }
                  </div>
                </div>
              </div>

              <hr>

              <!-- Optional Information Section -->
              <div class="mb-4">
                <h6 class="text-secondary mb-3">
                  <i class="fa-solid fa-info-circle me-2"></i>
                  {{ i18n.t('employees.additional_information') }}
                </h6>
                <div class="row g-3">
                  <!-- Arabic Names -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.first_name_ar') }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="firstNameAr"
                      [class.is-invalid]="isFieldInvalid('firstNameAr')"
                      [placeholder]="i18n.t('employees.first_name_ar_placeholder')">
                    @if (isFieldInvalid('firstNameAr')) {
                      <div class="invalid-feedback">{{ getFieldError('firstNameAr') }}</div>
                    }
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.last_name_ar') }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="lastNameAr"
                      [class.is-invalid]="isFieldInvalid('lastNameAr')"
                      [placeholder]="i18n.t('employees.last_name_ar_placeholder')">
                    @if (isFieldInvalid('lastNameAr')) {
                      <div class="invalid-feedback">{{ getFieldError('lastNameAr') }}</div>
                    }
                  </div>

                  <!-- Job Title Arabic -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.job_title_ar') }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="jobTitleAr"
                      [class.is-invalid]="isFieldInvalid('jobTitleAr')"
                      [placeholder]="i18n.t('employees.job_title_ar_placeholder')">
                    @if (isFieldInvalid('jobTitleAr')) {
                      <div class="invalid-feedback">{{ getFieldError('jobTitleAr') }}</div>
                    }
                  </div>

                  <!-- Email -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.email') }}</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      formControlName="email"
                      [class.is-invalid]="isFieldInvalid('email')"
                      [placeholder]="i18n.t('employees.email_placeholder')">
                    @if (isFieldInvalid('email')) {
                      <div class="invalid-feedback">{{ getFieldError('email') }}</div>
                    }
                  </div>

                  <!-- Phone -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.phone') }}</label>
                    <input 
                      type="tel" 
                      class="form-control" 
                      formControlName="phone"
                      [class.is-invalid]="isFieldInvalid('phone')"
                      [placeholder]="i18n.t('employees.phone_placeholder')">
                    @if (isFieldInvalid('phone')) {
                      <div class="invalid-feedback">{{ getFieldError('phone') }}</div>
                    }
                  </div>

                  <!-- National ID -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.national_id') }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="nationalId"
                      [class.is-invalid]="isFieldInvalid('nationalId')"
                      [placeholder]="i18n.t('employees.national_id_placeholder')">
                    @if (isFieldInvalid('nationalId')) {
                      <div class="invalid-feedback">{{ getFieldError('nationalId') }}</div>
                    }
                  </div>

                  <!-- Date of Birth -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.date_of_birth') }}</label>
                    <input 
                      type="date" 
                      class="form-control" 
                      formControlName="dateOfBirth"
                      [class.is-invalid]="isFieldInvalid('dateOfBirth')">
                    @if (isFieldInvalid('dateOfBirth')) {
                      <div class="invalid-feedback">{{ getFieldError('dateOfBirth') }}</div>
                    }
                  </div>

                  <!-- Gender -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.gender.title') }}</label>
                    <select 
                      class="form-select" 
                      formControlName="gender"
                      [class.is-invalid]="isFieldInvalid('gender')">
                      <option value="">{{ i18n.t('common.select') }}</option>
                      <option value="1">{{ i18n.t('employees.gender.male') }}</option>
                      <option value="2">{{ i18n.t('employees.gender.female') }}</option>
                    </select>
                    @if (isFieldInvalid('gender')) {
                      <div class="invalid-feedback">{{ getFieldError('gender') }}</div>
                    }
                  </div>

                  <!-- Department -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.department') }}</label>
                    <app-searchable-select
                      [options]="departmentSelectOptions"
                      formControlName="departmentId"
                      [placeholder]="i18n.t('common.select_department')"
                      [searchable]="true"
                      [clearable]="false"
                      [class.is-invalid]="isFieldInvalid('departmentId')"
                    ></app-searchable-select>
                    @if (isFieldInvalid('departmentId')) {
                      <div class="invalid-feedback">{{ getFieldError('departmentId') }}</div>
                    }
                  </div>

                  <!-- Manager -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.manager') }}</label>
                    <app-searchable-select
                      [options]="managerSelectOptions"
                      formControlName="managerEmployeeId"
                      [placeholder]="i18n.t('common.select_manager')"
                      [searchable]="true"
                      [clearable]="false"
                      [class.is-invalid]="isFieldInvalid('managerEmployeeId')"
                    ></app-searchable-select>
                    @if (isFieldInvalid('managerEmployeeId')) {
                      <div class="invalid-feedback">{{ getFieldError('managerEmployeeId') }}</div>
                    }
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-outline-secondary" (click)="onCancel()" [disabled]="saving()">
                  <i class="fa-solid fa-times me-2"></i>
                  {{ i18n.t('common.cancel') }}
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  [disabled]="employeeForm.invalid || saving()"
                >
                  @if (saving()) {
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  } @else {
                    <i class="fa-solid fa-save me-2"></i>
                  }
                  {{ saving() ? i18n.t('common.saving') : i18n.t('employees.update_employee') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('employees.employee_not_found') }}
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditEmployeeComponent, { className: "EditEmployeeComponent", filePath: "src/app/pages/employees/edit-employee/edit-employee.component.ts", lineNumber: 381 });
})();
export {
  EditEmployeeComponent
};
//# sourceMappingURL=chunk-H23OGETZ.js.map
