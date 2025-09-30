import {
  DepartmentsService
} from "./chunk-ZEREPA2X.js";
import {
  LoadingSpinnerComponent
} from "./chunk-WJCQS5EA.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  Router,
  RouterLink,
  RouterModule,
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
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/departments/view-department/view-department.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function ViewDepartmentComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "app-loading-spinner", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("common.loading"))("centered", true);
  }
}
__name(ViewDepartmentComponent_Conditional_22_Template, "ViewDepartmentComponent_Conditional_22_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.active"));
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_51_Template, "ViewDepartmentComponent_Conditional_23_Conditional_51_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.inactive"));
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_52_Template, "ViewDepartmentComponent_Conditional_23_Conditional_52_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "h6", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.description"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r0.department()) == null ? null : tmp_3_0.description);
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_53_Template, "ViewDepartmentComponent_Conditional_23_Conditional_53_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "h6", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("departments.description_ar"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r0.department()) == null ? null : tmp_3_0.descriptionAr);
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_54_Template, "ViewDepartmentComponent_Conditional_23_Conditional_54_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_55_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "i", 52);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r0.department()) == null ? null : tmp_3_0.phone);
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_55_Conditional_4_Template, "ViewDepartmentComponent_Conditional_23_Conditional_55_Conditional_4_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_55_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r0.department()) == null ? null : tmp_3_0.email);
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_55_Conditional_5_Template, "ViewDepartmentComponent_Conditional_23_Conditional_55_Conditional_5_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "h6", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 16);
    \u0275\u0275conditionalCreate(4, ViewDepartmentComponent_Conditional_23_Conditional_55_Conditional_4_Template, 4, 1, "div", 28);
    \u0275\u0275conditionalCreate(5, ViewDepartmentComponent_Conditional_23_Conditional_55_Conditional_5_Template, 4, 1, "div", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("departments.contact_info"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_3_0 = ctx_r0.department()) == null ? null : tmp_3_0.phone) ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_4_0 = ctx_r0.department()) == null ? null : tmp_4_0.email) ? 5 : -1);
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_55_Template, "ViewDepartmentComponent_Conditional_23_Conditional_55_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_89_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275element(1, "i", 57);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    const item_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("margin-left", item_r3.level * 20, "px");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("fw-bold", item_r3.id.toString() === ((tmp_13_0 = ctx_r0.department()) == null ? null : tmp_13_0.id == null ? null : tmp_13_0.id.toString()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.name);
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_89_For_7_Template, "ViewDepartmentComponent_Conditional_23_Conditional_89_For_7_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 19)(2, "h6", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 27)(5, "div", 54);
    \u0275\u0275repeaterCreate(6, ViewDepartmentComponent_Conditional_23_Conditional_89_For_7_Template, 4, 5, "div", 55, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("departments.hierarchy"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.departmentHierarchy());
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_89_Template, "ViewDepartmentComponent_Conditional_23_Conditional_89_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_90_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60)(1, "div", 61)(2, "div", 62)(3, "div", 21)(4, "div", 22)(5, "div", 63);
    \u0275\u0275element(6, "i", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 64)(8, "h6", 65);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 66);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 67)(13, "button", 68);
    \u0275\u0275element(14, "i", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ul", 70)(16, "li")(17, "a", 71);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewDepartmentComponent_Conditional_23_Conditional_90_For_8_Template_a_click_17_listener() {
      const subDept_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onViewSubDepartment(subDept_r5.id.toString()));
    }, "ViewDepartmentComponent_Conditional_23_Conditional_90_For_8_Template_a_click_17_listener"));
    \u0275\u0275element(18, "i", 72);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "li")(21, "a", 71);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewDepartmentComponent_Conditional_23_Conditional_90_For_8_Template_a_click_21_listener() {
      const subDept_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onEditSubDepartment(subDept_r5.id.toString()));
    }, "ViewDepartmentComponent_Conditional_23_Conditional_90_For_8_Template_a_click_21_listener"));
    \u0275\u0275element(22, "i", 10);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    const subDept_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(subDept_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(subDept_r5.code);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("common.view"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("common.edit"), " ");
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_90_For_8_Template, "ViewDepartmentComponent_Conditional_23_Conditional_90_For_8_Template");
function ViewDepartmentComponent_Conditional_23_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 19)(2, "h6", 20);
    \u0275\u0275element(3, "i", 58);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 27)(6, "div", 59);
    \u0275\u0275repeaterCreate(7, ViewDepartmentComponent_Conditional_23_Conditional_90_For_8_Template, 24, 4, "div", 60, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("departments.sub_departments"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.subDepartments());
  }
}
__name(ViewDepartmentComponent_Conditional_23_Conditional_90_Template, "ViewDepartmentComponent_Conditional_23_Conditional_90_Template");
function ViewDepartmentComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "div", 18)(3, "div", 19)(4, "h5", 20)(5, "div", 21)(6, "div", 22)(7, "div", 23);
    \u0275\u0275element(8, "i", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "div", 25);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 26);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(14, "div", 27)(15, "div", 16)(16, "div", 28)(17, "dl", 16)(18, "dt", 29);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "dd", 30);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "dt", 29);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "dd", 30);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "dt", 29);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "dd", 30);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "dt", 29);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "dd", 30);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 28)(35, "dl", 16)(36, "dt", 29);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "dd", 30);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "dt", 29);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "dd", 30);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "dt", 29);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "dd", 30);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "dt", 29);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "dd", 30);
    \u0275\u0275conditionalCreate(51, ViewDepartmentComponent_Conditional_23_Conditional_51_Template, 2, 1, "span", 31)(52, ViewDepartmentComponent_Conditional_23_Conditional_52_Template, 2, 1, "span", 32);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(53, ViewDepartmentComponent_Conditional_23_Conditional_53_Template, 5, 2, "div", 33);
    \u0275\u0275conditionalCreate(54, ViewDepartmentComponent_Conditional_23_Conditional_54_Template, 5, 2, "div", 33);
    \u0275\u0275conditionalCreate(55, ViewDepartmentComponent_Conditional_23_Conditional_55_Template, 6, 3, "div", 33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "div", 34)(57, "div", 18)(58, "div", 19)(59, "h6", 20);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 27)(62, "div", 35)(63, "button", 36);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewDepartmentComponent_Conditional_23_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEdit());
    }, "ViewDepartmentComponent_Conditional_23_Template_button_click_63_listener"));
    \u0275\u0275element(64, "i", 10);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "button", 37);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewDepartmentComponent_Conditional_23_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onViewEmployees());
    }, "ViewDepartmentComponent_Conditional_23_Template_button_click_66_listener"));
    \u0275\u0275element(67, "i", 38);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "button", 39);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewDepartmentComponent_Conditional_23_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCreateSubDepartment());
    }, "ViewDepartmentComponent_Conditional_23_Template_button_click_69_listener"));
    \u0275\u0275element(70, "i", 40);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(72, "div", 41)(73, "div", 19)(74, "h6", 20);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 27)(77, "div", 42)(78, "div", 43)(79, "div", 44)(80, "h4", 45);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "p", 46);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(84, "div", 43)(85, "h4", 47);
    \u0275\u0275text(86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "p", 46);
    \u0275\u0275text(88);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(89, ViewDepartmentComponent_Conditional_23_Conditional_89_Template, 8, 1, "div", 41);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(90, ViewDepartmentComponent_Conditional_23_Conditional_90_Template, 9, 1, "div", 48);
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_4_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_10_0;
    let tmp_12_0;
    let tmp_14_0;
    let tmp_16_0;
    let tmp_18_0;
    let tmp_19_0;
    let tmp_20_0;
    let tmp_21_0;
    let tmp_27_0;
    let tmp_29_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r0.department()) == null ? null : tmp_1_0.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r0.department()) == null ? null : tmp_2_0.code);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("departments.name"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r0.department()) == null ? null : tmp_4_0.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("departments.name_ar"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r0.department()) == null ? null : tmp_6_0.nameAr) || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("departments.code"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_8_0 = ctx_r0.department()) == null ? null : tmp_8_0.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("departments.parent"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_10_0 = ctx_r0.department()) == null ? null : tmp_10_0.parentDepartmentName) || ctx_r0.i18n.t("departments.root_department"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("departments.manager"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_12_0 = ctx_r0.department()) == null ? null : tmp_12_0.managerName) || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("departments.cost_center"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_14_0 = ctx_r0.department()) == null ? null : tmp_14_0.costCenter) || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("departments.location"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_16_0 = ctx_r0.department()) == null ? null : tmp_16_0.location) || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("common.status"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_18_0 = ctx_r0.department()) == null ? null : tmp_18_0.isActive) ? 51 : 52);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_19_0 = ctx_r0.department()) == null ? null : tmp_19_0.description) ? 53 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_20_0 = ctx_r0.department()) == null ? null : tmp_20_0.descriptionAr) ? 54 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_21_0 = ctx_r0.department()) == null ? null : tmp_21_0.phone) || ((tmp_21_0 = ctx_r0.department()) == null ? null : tmp_21_0.email) ? 55 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.actions"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("departments.edit"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("departments.view_employees"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("departments.create_subdepartment"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("departments.statistics"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(((tmp_27_0 = ctx_r0.statistics()) == null ? null : tmp_27_0.employeeCount) || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("departments.employees"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(((tmp_29_0 = ctx_r0.statistics()) == null ? null : tmp_29_0.subDepartmentCount) || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("departments.sub_departments"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.departmentHierarchy().length > 0 ? 89 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.subDepartments().length > 0 ? 90 : -1);
  }
}
__name(ViewDepartmentComponent_Conditional_23_Template, "ViewDepartmentComponent_Conditional_23_Template");
function ViewDepartmentComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "i", 73);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.i18n.t("departments.department_not_found"), " ");
  }
}
__name(ViewDepartmentComponent_Conditional_24_Template, "ViewDepartmentComponent_Conditional_24_Template");
var _ViewDepartmentComponent = class _ViewDepartmentComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  departmentsService = inject(DepartmentsService);
  i18n = inject(I18nService);
  department = signal(null, ...ngDevMode ? [{ debugName: "department" }] : []);
  statistics = signal(null, ...ngDevMode ? [{ debugName: "statistics" }] : []);
  subDepartments = signal([], ...ngDevMode ? [{ debugName: "subDepartments" }] : []);
  departmentHierarchy = signal([], ...ngDevMode ? [{ debugName: "departmentHierarchy" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  ngOnInit() {
    const departmentId = this.route.snapshot.paramMap.get("id");
    if (departmentId) {
      this.loadDepartment(departmentId);
      this.loadSubDepartments(departmentId);
      this.loadHierarchy(departmentId);
    } else {
      this.error.set("Invalid department ID");
      this.loading.set(false);
    }
  }
  loadDepartment(departmentId) {
    this.departmentsService.getDepartmentById(+departmentId).subscribe({
      next: /* @__PURE__ */ __name((department) => {
        this.department.set(department);
        this.statistics.set({
          employeeCount: department.employeeCount || 0,
          subDepartmentCount: 0
          // Will be updated when we load sub-departments
        });
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }, "error")
    });
  }
  loadSubDepartments(departmentId) {
    this.subDepartments.set([]);
  }
  loadHierarchy(departmentId) {
    this.departmentHierarchy.set([]);
  }
  onEdit() {
    if (this.department()) {
      this.router.navigate(["/departments", this.department().id, "edit"]);
    }
  }
  onViewEmployees() {
    if (this.department()) {
      this.router.navigate(["/employees"], { queryParams: { departmentId: this.department().id } });
    }
  }
  onCreateSubDepartment() {
    if (this.department()) {
      this.router.navigate(["/departments/create"], { queryParams: { parentId: this.department().id } });
    }
  }
  onViewSubDepartment(subDeptId) {
    this.router.navigate(["/departments", subDeptId, "view"]);
  }
  onEditSubDepartment(subDeptId) {
    this.router.navigate(["/departments", subDeptId, "edit"]);
  }
  onBack() {
    this.router.navigate(["/departments"]);
  }
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t("errors.unknown");
  }
};
__name(_ViewDepartmentComponent, "ViewDepartmentComponent");
__publicField(_ViewDepartmentComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewDepartmentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewDepartmentComponent)();
}, "ViewDepartmentComponent_Factory"));
__publicField(_ViewDepartmentComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewDepartmentComponent, selectors: [["app-view-department"]], decls: 25, vars: 7, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/dashboard"], ["routerLink", "/departments"], [1, "breadcrumb-item", "active"], [1, "btn-group"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fa-solid", "fa-edit", "me-2"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fa-solid", "fa-arrow-left", "me-2"], [1, "d-flex", "justify-content-center", "py-5"], [1, "alert", "alert-danger"], [3, "message", "centered"], [1, "row"], [1, "col-lg-8"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-3"], [1, "avatar-title", "bg-light", "text-primary", "rounded-circle"], [1, "fa-solid", "fa-sitemap"], [1, "fw-medium"], [1, "text-muted"], [1, "card-body"], [1, "col-md-6"], [1, "col-sm-5"], [1, "col-sm-7"], [1, "badge", "bg-success"], [1, "badge", "bg-light", "text-dark", "border"], [1, "mt-3"], [1, "col-lg-4"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], ["type", "button", 1, "btn", "btn-outline-info", 3, "click"], [1, "fa-solid", "fa-users", "me-2"], ["type", "button", 1, "btn", "btn-outline-success", 3, "click"], [1, "fa-solid", "fa-plus", "me-2"], [1, "card", "mt-3"], [1, "row", "text-center"], [1, "col-6"], [1, "border-end"], [1, "mb-1", "text-primary"], [1, "text-muted", "mb-0", "small"], [1, "mb-1", "text-info"], [1, "card", "mt-4"], [1, "fw-semibold"], [1, "mb-0"], ["dir", "rtl", 1, "mb-0"], [1, "fa-solid", "fa-phone", "me-2", "text-muted"], [1, "fa-solid", "fa-envelope", "me-2", "text-muted"], [1, "hierarchy-tree"], [1, "hierarchy-item", 3, "margin-left"], [1, "hierarchy-item"], [1, "fa-solid", "fa-sitemap", "me-2", "text-muted"], [1, "fa-solid", "fa-sitemap", "me-2"], [1, "row", "g-3"], [1, "col-md-6", "col-lg-4"], [1, "card", "border"], [1, "card-body", "p-3"], [1, "avatar-title", "bg-info-subtle", "text-info", "rounded-circle"], [1, "flex-grow-1"], [1, "mb-1"], [1, "text-muted", "small", "mb-0"], [1, "dropdown"], ["data-bs-toggle", "dropdown", 1, "btn", "btn-sm", "btn-light"], [1, "fa-solid", "fa-ellipsis-vertical"], [1, "dropdown-menu"], [1, "dropdown-item", 3, "click"], [1, "fa-solid", "fa-eye", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function ViewDepartmentComponent_Template(rf, ctx) {
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
    \u0275\u0275elementStart(15, "div", 8)(16, "button", 9);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewDepartmentComponent_Template_button_click_16_listener() {
      return ctx.onEdit();
    }, "ViewDepartmentComponent_Template_button_click_16_listener"));
    \u0275\u0275element(17, "i", 10);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 11);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewDepartmentComponent_Template_button_click_19_listener() {
      return ctx.onBack();
    }, "ViewDepartmentComponent_Template_button_click_19_listener"));
    \u0275\u0275element(20, "i", 12);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(22, ViewDepartmentComponent_Conditional_22_Template, 2, 2, "div", 13)(23, ViewDepartmentComponent_Conditional_23_Template, 91, 32)(24, ViewDepartmentComponent_Conditional_24_Template, 3, 1, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("departments.view_details"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.i18n.t("dashboard.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("departments.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.i18n.t("departments.view_details"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("departments.edit"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 22 : ctx.department() ? 23 : 24);
  }
}, "ViewDepartmentComponent_Template"), dependencies: [CommonModule, RouterModule, RouterLink, LoadingSpinnerComponent], encapsulation: 2 }));
var ViewDepartmentComponent = _ViewDepartmentComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewDepartmentComponent, [{
    type: Component,
    args: [{
      selector: "app-view-department",
      standalone: true,
      imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
      template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('departments.view_details') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/departments">{{ i18n.t('departments.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('departments.view_details') }}</li>
            </ol>
          </nav>
        </div>
        <div class="btn-group">
          <button 
            type="button" 
            class="btn btn-primary"
            (click)="onEdit()">
            <i class="fa-solid fa-edit me-2"></i>
            {{ i18n.t('departments.edit') }}
          </button>
          <button 
            type="button" 
            class="btn btn-outline-secondary"
            (click)="onBack()">
            <i class="fa-solid fa-arrow-left me-2"></i>
            {{ i18n.t('common.back') }}
          </button>
        </div>
      </div>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <app-loading-spinner
            [message]="i18n.t('common.loading')"
            [centered]="true">
          </app-loading-spinner>
        </div>
      } @else if (department()) {
        <!-- Department Details -->
        <div class="row">
          <!-- Main Information Card -->
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">
                  <div class="d-flex align-items-center">
                    <div class="avatar-sm me-3">
                      <div class="avatar-title bg-light text-primary rounded-circle">
                        <i class="fa-solid fa-sitemap"></i>
                      </div>
                    </div>
                    <div>
                      <div class="fw-medium">{{ department()?.name }}</div>
                      <small class="text-muted">{{ department()?.code }}</small>
                    </div>
                  </div>
                </h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <!-- Basic Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('departments.name') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.name }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.name_ar') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.nameAr || '-' }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.code') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.code }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.parent') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.parentDepartmentName || i18n.t('departments.root_department') }}</dd>
                    </dl>
                  </div>

                  <!-- Additional Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('departments.manager') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.managerName || '-' }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.cost_center') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.costCenter || '-' }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.location') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.location || '-' }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('common.status') }}:</dt>
                      <dd class="col-sm-7">
                        @if (department()?.isActive) {
                          <span class="badge bg-success">{{ i18n.t('common.active') }}</span>
                        } @else {
                          <span class="badge bg-light text-dark border">{{ i18n.t('common.inactive') }}</span>
                        }
                      </dd>
                    </dl>
                  </div>
                </div>

                @if (department()?.description) {
                  <div class="mt-3">
                    <h6 class="fw-semibold">{{ i18n.t('common.description') }}</h6>
                    <p class="mb-0">{{ department()?.description }}</p>
                  </div>
                }

                @if (department()?.descriptionAr) {
                  <div class="mt-3">
                    <h6 class="fw-semibold">{{ i18n.t('departments.description_ar') }}</h6>
                    <p class="mb-0" dir="rtl">{{ department()?.descriptionAr }}</p>
                  </div>
                }

                <!-- Contact Information -->
                @if (department()?.phone || department()?.email) {
                  <div class="mt-3">
                    <h6 class="fw-semibold">{{ i18n.t('departments.contact_info') }}</h6>
                    <div class="row">
                      @if (department()?.phone) {
                        <div class="col-md-6">
                          <i class="fa-solid fa-phone me-2 text-muted"></i>
                          <span>{{ department()?.phone }}</span>
                        </div>
                      }
                      @if (department()?.email) {
                        <div class="col-md-6">
                          <i class="fa-solid fa-envelope me-2 text-muted"></i>
                          <span>{{ department()?.email }}</span>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Actions and Statistics Card -->
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h6 class="card-title mb-0">{{ i18n.t('common.actions') }}</h6>
              </div>
              <div class="card-body">
                <div class="d-grid gap-2">
                  <button 
                    type="button" 
                    class="btn btn-outline-primary"
                    (click)="onEdit()">
                    <i class="fa-solid fa-edit me-2"></i>
                    {{ i18n.t('departments.edit') }}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-info"
                    (click)="onViewEmployees()">
                    <i class="fa-solid fa-users me-2"></i>
                    {{ i18n.t('departments.view_employees') }}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-success"
                    (click)="onCreateSubDepartment()">
                    <i class="fa-solid fa-plus me-2"></i>
                    {{ i18n.t('departments.create_subdepartment') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Statistics Card -->
            <div class="card mt-3">
              <div class="card-header">
                <h6 class="card-title mb-0">{{ i18n.t('departments.statistics') }}</h6>
              </div>
              <div class="card-body">
                <div class="row text-center">
                  <div class="col-6">
                    <div class="border-end">
                      <h4 class="mb-1 text-primary">{{ statistics()?.employeeCount || 0 }}</h4>
                      <p class="text-muted mb-0 small">{{ i18n.t('departments.employees') }}</p>
                    </div>
                  </div>
                  <div class="col-6">
                    <h4 class="mb-1 text-info">{{ statistics()?.subDepartmentCount || 0 }}</h4>
                    <p class="text-muted mb-0 small">{{ i18n.t('departments.sub_departments') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hierarchy Card -->
            @if (departmentHierarchy().length > 0) {
              <div class="card mt-3">
                <div class="card-header">
                  <h6 class="card-title mb-0">{{ i18n.t('departments.hierarchy') }}</h6>
                </div>
                <div class="card-body">
                  <div class="hierarchy-tree">
                    @for (item of departmentHierarchy(); track item.id) {
                      <div class="hierarchy-item" [style.margin-left.px]="item.level * 20">
                        <i class="fa-solid fa-sitemap me-2 text-muted"></i>
                        <span [class.fw-bold]="item.id.toString() === department()?.id?.toString()">{{ item.name }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Sub-departments Card -->
        @if (subDepartments().length > 0) {
          <div class="card mt-4">
            <div class="card-header">
              <h6 class="card-title mb-0">
                <i class="fa-solid fa-sitemap me-2"></i>
                {{ i18n.t('departments.sub_departments') }}
              </h6>
            </div>
            <div class="card-body">
              <div class="row g-3">
                @for (subDept of subDepartments(); track subDept.id) {
                  <div class="col-md-6 col-lg-4">
                    <div class="card border">
                      <div class="card-body p-3">
                        <div class="d-flex align-items-center">
                          <div class="avatar-sm me-3">
                            <div class="avatar-title bg-info-subtle text-info rounded-circle">
                              <i class="fa-solid fa-sitemap"></i>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="mb-1">{{ subDept.name }}</h6>
                            <p class="text-muted small mb-0">{{ subDept.code }}</p>
                          </div>
                          <div class="dropdown">
                            <button class="btn btn-sm btn-light" data-bs-toggle="dropdown">
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" (click)="onViewSubDepartment(subDept.id.toString())">
                                <i class="fa-solid fa-eye me-2"></i>{{ i18n.t('common.view') }}
                              </a></li>
                              <li><a class="dropdown-item" (click)="onEditSubDepartment(subDept.id.toString())">
                                <i class="fa-solid fa-edit me-2"></i>{{ i18n.t('common.edit') }}
                              </a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('departments.department_not_found') }}
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewDepartmentComponent, { className: "ViewDepartmentComponent", filePath: "src/app/pages/departments/view-department/view-department.component.ts", lineNumber: 289 });
})();
export {
  ViewDepartmentComponent
};
//# sourceMappingURL=chunk-BZPE3JAR.js.map
