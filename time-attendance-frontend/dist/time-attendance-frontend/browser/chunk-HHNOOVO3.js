import {
  DepartmentsService
} from "./chunk-OU7DT47F.js";
import {
  UnifiedFilterComponent
} from "./chunk-KEVORF3C.js";
import {
  HasPermissionDirective
} from "./chunk-WKOQYA75.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import "./chunk-SKLP6OYI.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-XLGMY32C.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import {
  PermissionActions,
  PermissionResources
} from "./chunk-EVMJ7ILG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import {
  FormsModule,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import "./chunk-O2IS3HK2.js";
import {
  Router
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcomponentInstance,
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
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate5
} from "./chunk-DUNHAUAW.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/departments/department-table/department-table.component.ts
function DepartmentTableComponent_Conditional_1_Conditional_21_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_1_Conditional_21_button_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onAddDepartment());
    }, "DepartmentTableComponent_Conditional_1_Conditional_21_button_0_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("title", ctx_r1.i18n.t("department.addDepartment"));
  }
}
__name(DepartmentTableComponent_Conditional_1_Conditional_21_button_0_Template, "DepartmentTableComponent_Conditional_1_Conditional_21_button_0_Template");
function DepartmentTableComponent_Conditional_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DepartmentTableComponent_Conditional_1_Conditional_21_button_0_Template, 2, 1, "button", 22);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("appHasPermission", ctx_r1.PERMISSIONS.DEPARTMENT_CREATE);
  }
}
__name(DepartmentTableComponent_Conditional_1_Conditional_21_Template, "DepartmentTableComponent_Conditional_1_Conditional_21_Template");
function DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_button_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onBulkDelete());
    }, "DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_button_0_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.deleteSelected"), " ");
  }
}
__name(DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_button_0_Template, "DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_button_0_Template");
function DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_button_0_Template, 3, 1, "button", 32);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("appHasPermission", ctx_r1.PERMISSIONS.DEPARTMENT_DELETE);
  }
}
__name(DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_Template, "DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_Template");
function DepartmentTableComponent_Conditional_1_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 25)(2, "div", 26)(3, "span", 27);
    \u0275\u0275element(4, "i", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 17);
    \u0275\u0275conditionalCreate(7, DepartmentTableComponent_Conditional_1_Conditional_22_Conditional_7_Template, 1, 1, "button", 29);
    \u0275\u0275elementStart(8, "button", 30);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_1_Conditional_22_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearSelection());
    }, "DepartmentTableComponent_Conditional_1_Conditional_22_Template_button_click_8_listener"));
    \u0275\u0275element(9, "i", 31);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", ctx_r1.selectedDepartments().size, " ", ctx_r1.i18n.t("common.selected"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.allowDelete ? 7 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.clearSelection"), " ");
  }
}
__name(DepartmentTableComponent_Conditional_1_Conditional_22_Template, "DepartmentTableComponent_Conditional_1_Conditional_22_Template");
function DepartmentTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 4)(2, "div", 5)(3, "div", 6)(4, "span", 7);
    \u0275\u0275element(5, "i", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 9);
    \u0275\u0275listener("input", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_1_Template_input_input_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSearchChange($event.target.value));
    }, "DepartmentTableComponent_Conditional_1_Template_input_input_6_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 10)(8, "div", 11)(9, "input", 12);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_1_Template_input_change_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onShowInactiveChange($event.target.checked));
    }, "DepartmentTableComponent_Conditional_1_Template_input_change_9_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label", 13);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 10)(13, "div", 11)(14, "input", 14);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_1_Template_input_change_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHierarchy.set($event.target.checked));
    }, "DepartmentTableComponent_Conditional_1_Template_input_change_14_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "label", 15);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 16)(18, "div", 17)(19, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_1_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refresh());
    }, "DepartmentTableComponent_Conditional_1_Template_button_click_19_listener"));
    \u0275\u0275element(20, "i", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, DepartmentTableComponent_Conditional_1_Conditional_21_Template, 1, 1, "button", 20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(22, DepartmentTableComponent_Conditional_1_Conditional_22_Template, 11, 4, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t("common.search") + "...")("value", ctx_r1.searchTerm());
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r1.showInactive());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.showInactive"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r1.showHierarchy());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("department.showHierarchy"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.refresh"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.allowEdit ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedDepartments().size > 0 && ctx_r1.allowSelection ? 22 : -1);
  }
}
__name(DepartmentTableComponent_Conditional_1_Template, "DepartmentTableComponent_Conditional_1_Template");
function DepartmentTableComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r1.i18n.t("common.loading"))("centered", true);
  }
}
__name(DepartmentTableComponent_Conditional_2_Template, "DepartmentTableComponent_Conditional_2_Template");
function DepartmentTableComponent_Conditional_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 39)(1, "div", 11)(2, "input", 49);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Conditional_5_Template_input_change_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleAllSelection());
    }, "DepartmentTableComponent_Conditional_3_Conditional_5_Template_input_change_2_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r1.isAllPageSelected())("indeterminate", ctx_r1.isSomePageSelected());
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_5_Template, "DepartmentTableComponent_Conditional_3_Conditional_5_Template");
function DepartmentTableComponent_Conditional_3_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("department.path"));
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_14_Template, "DepartmentTableComponent_Conditional_3_Conditional_14_Template");
function DepartmentTableComponent_Conditional_3_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.actions"));
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_31_Template, "DepartmentTableComponent_Conditional_3_Conditional_31_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 39)(1, "div", 11)(2, "input", 59);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_For_34_Conditional_1_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const dept_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleSelection(dept_r9.id);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DepartmentTableComponent_Conditional_3_For_34_Conditional_1_Template_input_change_2_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const dept_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r1.isSelected(dept_r9.id));
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_1_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_1_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
  }
  if (rf & 2) {
    const dept_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.getIndentClass(dept_r9.level));
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_4_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_4_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dept_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(dept_r9.nameAr);
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_9_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_9_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dept_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(dept_r9.description);
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_10_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_10_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "small", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const dept_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(dept_r9.path);
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_13_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_13_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "i", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dept_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", dept_r9.managerName, " ");
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_15_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_15_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_16_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_16_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "i", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dept_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", dept_r9.location, " ");
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_20_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_20_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_21_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_21_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_24_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_For_34_Conditional_24_button_2_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const dept_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onViewDepartment(dept_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DepartmentTableComponent_Conditional_3_For_34_Conditional_24_button_2_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.view"));
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_24_button_2_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_24_button_2_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_button_0_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const dept_r9 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onEditDepartment(dept_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_button_0_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.edit"));
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_button_0_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_button_0_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_button_0_Template, 2, 1, "button", 67);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("appHasPermission", ctx_r1.PERMISSIONS.DEPARTMENT_UPDATE);
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_button_0_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const dept_r9 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onDeleteDepartment(dept_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_button_0_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.delete"));
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_button_0_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_button_0_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_button_0_Template, 2, 1, "button", 69);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("appHasPermission", ctx_r1.PERMISSIONS.DEPARTMENT_DELETE);
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_Template");
function DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 45)(1, "div", 17);
    \u0275\u0275template(2, DepartmentTableComponent_Conditional_3_For_34_Conditional_24_button_2_Template, 2, 1, "button", 62);
    \u0275\u0275conditionalCreate(3, DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_3_Template, 1, 1, "button", 63);
    \u0275\u0275conditionalCreate(4, DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Conditional_4_Template, 1, 1, "button", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const dept_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("appHasPermission", ctx_r1.PERMISSIONS.DEPARTMENT_READ);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allowEdit ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allowDelete && dept_r9.employeeCount === 0 ? 4 : -1);
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Template, "DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Template");
function DepartmentTableComponent_Conditional_3_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 50);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_For_34_Template_tr_click_0_listener() {
      const dept_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectDepartment(dept_r9));
    }, "DepartmentTableComponent_Conditional_3_For_34_Template_tr_click_0_listener"));
    \u0275\u0275conditionalCreate(1, DepartmentTableComponent_Conditional_3_For_34_Conditional_1_Template, 3, 1, "td", 39);
    \u0275\u0275elementStart(2, "td")(3, "div", 41);
    \u0275\u0275conditionalCreate(4, DepartmentTableComponent_Conditional_3_For_34_Conditional_4_Template, 1, 2, "div", 51);
    \u0275\u0275element(5, "i", 52);
    \u0275\u0275elementStart(6, "div")(7, "div", 53);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, DepartmentTableComponent_Conditional_3_For_34_Conditional_9_Template, 2, 1, "div", 54);
    \u0275\u0275conditionalCreate(10, DepartmentTableComponent_Conditional_3_For_34_Conditional_10_Template, 2, 1, "div", 54);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275element(12, "app-status-badge", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, DepartmentTableComponent_Conditional_3_For_34_Conditional_13_Template, 3, 1, "td");
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275conditionalCreate(15, DepartmentTableComponent_Conditional_3_For_34_Conditional_15_Template, 3, 1, "div", 41);
    \u0275\u0275conditionalCreate(16, DepartmentTableComponent_Conditional_3_For_34_Conditional_16_Template, 2, 0, "span", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 57);
    \u0275\u0275element(18, "app-status-badge", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td");
    \u0275\u0275conditionalCreate(20, DepartmentTableComponent_Conditional_3_For_34_Conditional_20_Template, 3, 1, "div", 41);
    \u0275\u0275conditionalCreate(21, DepartmentTableComponent_Conditional_3_For_34_Conditional_21_Template, 2, 0, "span", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 57);
    \u0275\u0275element(23, "app-status-badge", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, DepartmentTableComponent_Conditional_3_For_34_Conditional_24_Template, 5, 3, "td", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dept_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("table-warning", !dept_r9.isActive)("selected-row", ctx_r1.isSelected(dept_r9.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allowSelection ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.showHierarchy() ? 4 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(dept_r9.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(dept_r9.nameAr ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(dept_r9.description ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("status", "secondary")("label", dept_r9.code);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showHierarchy() ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(dept_r9.managerName ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!dept_r9.managerName ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("status", dept_r9.employeeCount > 0 ? "success" : "secondary")("label", dept_r9.employeeCount.toString());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(dept_r9.location ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!dept_r9.location ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("status", dept_r9.isActive ? "active" : "inactive")("label", dept_r9.isActive ? ctx_r1.i18n.t("common.active") : ctx_r1.i18n.t("common.inactive"))("showIcon", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showControls ? 24 : -1);
  }
}
__name(DepartmentTableComponent_Conditional_3_For_34_Template, "DepartmentTableComponent_Conditional_3_For_34_Template");
function DepartmentTableComponent_Conditional_3_Conditional_35_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 74);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Conditional_35_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onAddDepartment());
    }, "DepartmentTableComponent_Conditional_3_Conditional_35_Conditional_6_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 75);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("department.addFirstDepartment"), " ");
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_35_Conditional_6_Template, "DepartmentTableComponent_Conditional_3_Conditional_35_Conditional_6_Template");
function DepartmentTableComponent_Conditional_3_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275element(1, "i", 72);
    \u0275\u0275elementStart(2, "h5");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DepartmentTableComponent_Conditional_3_Conditional_35_Conditional_6_Template, 3, 1, "button", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("department.noDepartments"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("department.noDepartmentsDescription"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allowEdit ? 6 : -1);
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_35_Template, "DepartmentTableComponent_Conditional_3_Conditional_35_Template");
function DepartmentTableComponent_Conditional_3_Conditional_36_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 80);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const size_r16 = ctx.$implicit;
    \u0275\u0275property("value", size_r16);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(size_r16);
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_36_For_8_Template, "DepartmentTableComponent_Conditional_3_Conditional_36_For_8_Template");
function DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 89);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const page_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onPageChange(page_r18));
    }, "DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_1_Template_button_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r18, " ");
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_1_Template, "DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_1_Template");
function DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
    \u0275\u0275text(1, "...");
    \u0275\u0275elementEnd();
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_2_Template, "DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_2_Template");
function DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 83);
    \u0275\u0275conditionalCreate(1, DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_1_Template, 2, 1, "button", 88);
    \u0275\u0275conditionalCreate(2, DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Conditional_2_Template, 2, 0, "span", 88);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", page_r18 === ctx_r1.currentPage())("disabled", page_r18 === -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(page_r18 !== -1 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(page_r18 === -1 ? 2 : -1);
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Template, "DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Template");
function DepartmentTableComponent_Conditional_3_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 48)(1, "div", 76)(2, "div", 77)(3, "div", 41)(4, "label", 78);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "select", 79);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Conditional_36_Template_select_change_6_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPageSizeChange(+$event.target.value));
    }, "DepartmentTableComponent_Conditional_3_Conditional_36_Template_select_change_6_listener"));
    \u0275\u0275repeaterCreate(7, DepartmentTableComponent_Conditional_3_Conditional_36_For_8_Template, 2, 2, "option", 80, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 81);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 77)(12, "ul", 82)(13, "li", 83)(14, "button", 84);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Conditional_36_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPageChange(ctx_r1.currentPage() - 1));
    }, "DepartmentTableComponent_Conditional_3_Conditional_36_Template_button_click_14_listener"));
    \u0275\u0275element(15, "i", 85);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(16, DepartmentTableComponent_Conditional_3_Conditional_36_For_17_Template, 3, 6, "li", 86, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(18, "li", 83)(19, "button", 84);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Conditional_36_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPageChange(ctx_r1.currentPage() + 1));
    }, "DepartmentTableComponent_Conditional_3_Conditional_36_Template_button_click_19_listener"));
    \u0275\u0275element(20, "i", 87);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("common.pageSize"), ":");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.pageSize());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.pageSizeOptions);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate5(" ", ctx_r1.i18n.t("common.showing"), " ", (ctx_r1.currentPage() - 1) * ctx_r1.pageSize() + 1, "-", ctx_r1.Math.min(ctx_r1.currentPage() * ctx_r1.pageSize(), ctx_r1.filteredDepartments().length), " ", ctx_r1.i18n.t("common.of"), " ", ctx_r1.filteredDepartments().length, " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", ctx_r1.currentPage() === 1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.getPageNumbers());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r1.currentPage() === ctx_r1.totalPages());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage() === ctx_r1.totalPages());
  }
}
__name(DepartmentTableComponent_Conditional_3_Conditional_36_Template, "DepartmentTableComponent_Conditional_3_Conditional_36_Template");
function DepartmentTableComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 36)(2, "table", 37)(3, "thead", 38)(4, "tr");
    \u0275\u0275conditionalCreate(5, DepartmentTableComponent_Conditional_3_Conditional_5_Template, 3, 2, "th", 39);
    \u0275\u0275elementStart(6, "th", 40);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Template_th_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSort("name"));
    }, "DepartmentTableComponent_Conditional_3_Template_th_click_6_listener"));
    \u0275\u0275elementStart(7, "div", 41);
    \u0275\u0275text(8);
    \u0275\u0275element(9, "i", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "th", 40);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Template_th_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSort("code"));
    }, "DepartmentTableComponent_Conditional_3_Template_th_click_10_listener"));
    \u0275\u0275elementStart(11, "div", 41);
    \u0275\u0275text(12);
    \u0275\u0275element(13, "i", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, DepartmentTableComponent_Conditional_3_Conditional_14_Template, 2, 1, "th");
    \u0275\u0275elementStart(15, "th", 40);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Template_th_click_15_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSort("managerName"));
    }, "DepartmentTableComponent_Conditional_3_Template_th_click_15_listener"));
    \u0275\u0275elementStart(16, "div", 41);
    \u0275\u0275text(17);
    \u0275\u0275element(18, "i", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "th", 43);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Template_th_click_19_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSort("employeeCount"));
    }, "DepartmentTableComponent_Conditional_3_Template_th_click_19_listener"));
    \u0275\u0275elementStart(20, "div", 44);
    \u0275\u0275text(21);
    \u0275\u0275element(22, "i", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "th", 40);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Template_th_click_23_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSort("location"));
    }, "DepartmentTableComponent_Conditional_3_Template_th_click_23_listener"));
    \u0275\u0275elementStart(24, "div", 41);
    \u0275\u0275text(25);
    \u0275\u0275element(26, "i", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "th", 43);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTableComponent_Conditional_3_Template_th_click_27_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSort("isActive"));
    }, "DepartmentTableComponent_Conditional_3_Template_th_click_27_listener"));
    \u0275\u0275elementStart(28, "div", 44);
    \u0275\u0275text(29);
    \u0275\u0275element(30, "i", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(31, DepartmentTableComponent_Conditional_3_Conditional_31_Template, 2, 1, "th", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "tbody");
    \u0275\u0275repeaterCreate(33, DepartmentTableComponent_Conditional_3_For_34_Template, 25, 22, "tr", 46, \u0275\u0275componentInstance().trackByDeptId, true);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(35, DepartmentTableComponent_Conditional_3_Conditional_35_Template, 7, 3, "div", 47);
    \u0275\u0275conditionalCreate(36, DepartmentTableComponent_Conditional_3_Conditional_36_Template, 21, 13, "nav", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.allowSelection ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("department.name"), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getSortIcon("name"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("department.code"), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getSortIcon("code"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showHierarchy() ? 14 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("department.manager"), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getSortIcon("managerName"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.employees"), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getSortIcon("employeeCount"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("department.location"), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getSortIcon("location"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.status"), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getSortIcon("isActive"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showControls ? 31 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.getPaginatedDepartments());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.getPaginatedDepartments().length === 0 ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.totalPages() > 1 ? 36 : -1);
  }
}
__name(DepartmentTableComponent_Conditional_3_Template, "DepartmentTableComponent_Conditional_3_Template");
var _DepartmentTableComponent = class _DepartmentTableComponent {
  selectedBranchId;
  allowSelection = true;
  allowEdit = true;
  allowDelete = true;
  showControls = true;
  departmentSelected = new EventEmitter();
  departmentView = new EventEmitter();
  departmentEdit = new EventEmitter();
  departmentDelete = new EventEmitter();
  departmentAdd = new EventEmitter();
  i18n = inject(I18nService);
  departmentsService = inject(DepartmentsService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    DEPARTMENT_CREATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.CREATE}`,
    DEPARTMENT_READ: `${PermissionResources.DEPARTMENT}.${PermissionActions.READ}`,
    DEPARTMENT_UPDATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.UPDATE}`,
    DEPARTMENT_DELETE: `${PermissionResources.DEPARTMENT}.${PermissionActions.DELETE}`
  };
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  departments = signal([], ...ngDevMode ? [{ debugName: "departments" }] : []);
  filteredDepartments = signal([], ...ngDevMode ? [{ debugName: "filteredDepartments" }] : []);
  selectedDepartments = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "selectedDepartments" }] : []);
  sortConfig = signal({ column: "name", direction: "asc" }, ...ngDevMode ? [{ debugName: "sortConfig" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  showInactive = signal(false, ...ngDevMode ? [{ debugName: "showInactive" }] : []);
  // Pagination
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // View options
  showHierarchy = signal(false, ...ngDevMode ? [{ debugName: "showHierarchy" }] : []);
  pageSizeOptions = [5, 10, 25, 50, 100];
  ngOnInit() {
    console.log("DepartmentTableComponent ngOnInit - selectedBranchId:", this.selectedBranchId);
    this.loadDepartments();
  }
  ngOnChanges(changes) {
    console.log("DepartmentTableComponent ngOnChanges:", changes);
    if (changes["selectedBranchId"]) {
      console.log("selectedBranchId changed from", changes["selectedBranchId"].previousValue, "to", changes["selectedBranchId"].currentValue);
      this.loadDepartments();
    }
  }
  loadDepartments() {
    console.log("loadDepartments called - selectedBranchId:", this.selectedBranchId);
    this.loading.set(true);
    console.log("Making departments API call with params:", {
      branchId: this.selectedBranchId,
      includeTree: false,
      includeInactive: this.showInactive()
    });
    this.departmentsService.getDepartments({
      branchId: this.selectedBranchId,
      includeTree: false,
      includeInactive: this.showInactive()
    }).subscribe({
      next: /* @__PURE__ */ __name((departments) => {
        console.log("Departments API response:", departments);
        if (departments) {
          this.departments.set(departments);
          this.applyFiltersAndSort();
        }
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load departments:", error);
        this.loading.set(false);
      }, "error")
    });
  }
  applyFiltersAndSort() {
    let filtered = [...this.departments()];
    const searchTerm = this.searchTerm().toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter((dept) => dept.name.toLowerCase().includes(searchTerm) || dept.code.toLowerCase().includes(searchTerm) || dept.nameAr && dept.nameAr.toLowerCase().includes(searchTerm) || dept.description && dept.description.toLowerCase().includes(searchTerm) || dept.costCenter && dept.costCenter.toLowerCase().includes(searchTerm) || dept.path.toLowerCase().includes(searchTerm));
    }
    if (!this.showInactive()) {
      filtered = filtered.filter((dept) => dept.isActive);
    }
    const sort = this.sortConfig();
    filtered.sort((a, b) => {
      const aVal = a[sort.column];
      const bVal = b[sort.column];
      if (aVal == null && bVal == null)
        return 0;
      if (aVal == null)
        return sort.direction === "asc" ? 1 : -1;
      if (bVal == null)
        return sort.direction === "asc" ? -1 : 1;
      let comparison = 0;
      if (typeof aVal === "string" && typeof bVal === "string") {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }
      return sort.direction === "asc" ? comparison : -comparison;
    });
    this.filteredDepartments.set(filtered);
    this.updatePagination();
  }
  updatePagination() {
    const total = this.filteredDepartments().length;
    const pages = Math.ceil(total / this.pageSize());
    this.totalPages.set(pages);
    if (this.currentPage() > pages && pages > 0) {
      this.currentPage.set(pages);
    }
  }
  getPaginatedDepartments() {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredDepartments().slice(start, end);
  }
  onSort(column) {
    const currentSort = this.sortConfig();
    const direction = currentSort.column === column && currentSort.direction === "asc" ? "desc" : "asc";
    this.sortConfig.set({ column, direction });
    this.applyFiltersAndSort();
  }
  getSortIcon(column) {
    const sort = this.sortConfig();
    if (sort.column !== column)
      return "fas fa-sort";
    return sort.direction === "asc" ? "fas fa-sort-up" : "fas fa-sort-down";
  }
  onSearchChange(term) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
    this.applyFiltersAndSort();
  }
  onShowInactiveChange(show) {
    this.showInactive.set(show);
    this.currentPage.set(1);
    this.loadDepartments();
  }
  onPageSizeChange(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.updatePagination();
  }
  onPageChange(page) {
    this.currentPage.set(page);
  }
  getPageNumbers() {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, -1, total);
      } else if (current >= total - 3) {
        pages.push(1, -1, total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, -1, current - 1, current, current + 1, -1, total);
      }
    }
    return pages;
  }
  selectDepartment(dept) {
    if (!this.allowSelection)
      return;
    this.departmentSelected.emit(dept);
  }
  toggleSelection(deptId) {
    const selected = this.selectedDepartments();
    if (selected.has(deptId)) {
      selected.delete(deptId);
    } else {
      selected.add(deptId);
    }
    this.selectedDepartments.set(new Set(selected));
  }
  toggleAllSelection() {
    const selected = this.selectedDepartments();
    const paginated = this.getPaginatedDepartments();
    if (this.isAllPageSelected()) {
      paginated.forEach((dept) => selected.delete(dept.id));
    } else {
      paginated.forEach((dept) => selected.add(dept.id));
    }
    this.selectedDepartments.set(new Set(selected));
  }
  isSelected(deptId) {
    return this.selectedDepartments().has(deptId);
  }
  isAllPageSelected() {
    const paginated = this.getPaginatedDepartments();
    return paginated.length > 0 && paginated.every((dept) => this.isSelected(dept.id));
  }
  isSomePageSelected() {
    const paginated = this.getPaginatedDepartments();
    return paginated.some((dept) => this.isSelected(dept.id)) && !this.isAllPageSelected();
  }
  onAddDepartment() {
    this.departmentAdd.emit();
  }
  onViewDepartment(dept) {
    this.departmentView.emit(dept);
  }
  onEditDepartment(dept) {
    this.departmentEdit.emit(dept);
  }
  onDeleteDepartment(dept) {
    this.departmentDelete.emit(dept);
  }
  onBulkDelete() {
    const selected = this.selectedDepartments();
    const departments = this.departments().filter((dept) => selected.has(dept.id));
    departments.forEach((dept) => this.departmentDelete.emit(dept));
  }
  clearSelection() {
    this.selectedDepartments.set(/* @__PURE__ */ new Set());
  }
  refresh() {
    this.loadDepartments();
  }
  getIndentClass(level) {
    return `indent-${Math.min(level, 5)}`;
  }
  trackByDeptId(index, dept) {
    return dept.id;
  }
  // Expose Math for template usage
  Math = Math;
};
__name(_DepartmentTableComponent, "DepartmentTableComponent");
__publicField(_DepartmentTableComponent, "\u0275fac", /* @__PURE__ */ __name(function DepartmentTableComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DepartmentTableComponent)();
}, "DepartmentTableComponent_Factory"));
__publicField(_DepartmentTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DepartmentTableComponent, selectors: [["app-department-table"]], inputs: { selectedBranchId: "selectedBranchId", allowSelection: "allowSelection", allowEdit: "allowEdit", allowDelete: "allowDelete", showControls: "showControls" }, outputs: { departmentSelected: "departmentSelected", departmentView: "departmentView", departmentEdit: "departmentEdit", departmentDelete: "departmentDelete", departmentAdd: "departmentAdd" }, features: [\u0275\u0275NgOnChangesFeature], decls: 4, vars: 3, consts: [[1, "department-table"], [1, "table-controls", "mb-3"], [1, "text-center", "p-4"], [1, "table-container"], [1, "row", "g-2", "align-items-center"], [1, "col-md-4"], [1, "input-group"], [1, "input-group-text"], [1, "fas", "fa-search"], ["type", "text", 1, "form-control", 3, "input", "placeholder", "value"], [1, "col-md-3"], [1, "form-check"], ["type", "checkbox", "id", "showInactiveTable", 1, "form-check-input", 3, "change", "checked"], ["for", "showInactiveTable", 1, "form-check-label"], ["type", "checkbox", "id", "showHierarchy", 1, "form-check-input", 3, "change", "checked"], ["for", "showHierarchy", 1, "form-check-label"], [1, "col-md-2"], [1, "btn-group", "btn-group-sm"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "title"], [1, "fas", "fa-sync"], ["type", "button", 1, "btn", "btn-primary", 3, "title"], [1, "row", "mt-2"], ["type", "button", "class", "btn btn-primary", 3, "title", "click", 4, "appHasPermission"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "title"], [1, "fas", "fa-plus"], [1, "col-12"], [1, "alert", "alert-info", "d-flex", "align-items-center"], [1, "flex-grow-1"], [1, "fas", "fa-info-circle", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fas", "fa-times", "me-1"], ["type", "button", "class", "btn btn-outline-danger", 3, "click", 4, "appHasPermission"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click"], [1, "fas", "fa-trash", "me-1"], [3, "message", "centered"], [1, "table-responsive"], [1, "table", "table-hover"], [1, "table-light", "sticky-top"], [1, "selection-column"], [1, "sortable", 3, "click"], [1, "d-flex", "align-items-center"], [1, "ms-2"], [1, "sortable", "text-center", 3, "click"], [1, "d-flex", "align-items-center", "justify-content-center"], [1, "actions-column"], [3, "table-warning", "selected-row"], [1, "text-center", "p-4", "text-muted"], ["aria-label", "Department pagination", 1, "mt-3"], ["type", "checkbox", 1, "form-check-input", 3, "change", "checked", "indeterminate"], [3, "click"], [3, "class"], [1, "fas", "fa-building", "text-primary", "me-2"], [1, "fw-medium"], [1, "text-muted", "small"], [3, "status", "label"], [1, "text-muted"], [1, "text-center"], [3, "status", "label", "showIcon"], ["type", "checkbox", 1, "form-check-input", 3, "change", "checked"], [1, "fas", "fa-user-tie", "text-secondary", "me-2"], [1, "fas", "fa-map-marker-alt", "text-secondary", "me-2"], ["type", "button", "class", "btn btn-outline-primary", 3, "title", "click", 4, "appHasPermission"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "title"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "title"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "title"], [1, "fas", "fa-eye"], ["type", "button", "class", "btn btn-outline-secondary", 3, "title", "click", 4, "appHasPermission"], [1, "fas", "fa-edit"], ["type", "button", "class", "btn btn-outline-danger", 3, "title", "click", 4, "appHasPermission"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "title"], [1, "fas", "fa-trash"], [1, "fas", "fa-building", "fa-3x", "mb-3"], ["type", "button", 1, "btn", "btn-primary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-plus", "me-2"], [1, "row", "align-items-center"], [1, "col-md-6"], [1, "form-label", "me-2", "mb-0"], [1, "form-select", "form-select-sm", 2, "width", "auto", 3, "change", "value"], [3, "value"], [1, "text-muted", "ms-3"], [1, "pagination", "pagination-sm", "justify-content-end", "mb-0"], [1, "page-item"], [1, "page-link", 3, "click", "disabled"], [1, "fas", "fa-chevron-left"], [1, "page-item", 3, "active", "disabled"], [1, "fas", "fa-chevron-right"], [1, "page-link"], [1, "page-link", 3, "click"]], template: /* @__PURE__ */ __name(function DepartmentTableComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, DepartmentTableComponent_Conditional_1_Template, 23, 9, "div", 1);
    \u0275\u0275conditionalCreate(2, DepartmentTableComponent_Conditional_2_Template, 2, 2, "div", 2);
    \u0275\u0275conditionalCreate(3, DepartmentTableComponent_Conditional_3_Template, 37, 23, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showControls ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() ? 3 : -1);
  }
}, "DepartmentTableComponent_Template"), dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, HasPermissionDirective, StatusBadgeComponent, LoadingSpinnerComponent], styles: ["\n\n.department-table[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.table-controls[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-bottom: 1px solid #e9ecef;\n  background-color: #f8f9fa;\n  border-radius: 8px 8px 0 0;\n}\n.table-container[_ngcontent-%COMP%] {\n  max-height: 70vh;\n  overflow-y: auto;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected-row[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  border-left: 4px solid #2196f3;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.table-warning[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.table-warning[_ngcontent-%COMP%]:hover {\n  background-color: #ffeaa7;\n}\n.selection-column[_ngcontent-%COMP%] {\n  width: 50px;\n  text-align: center;\n}\n.actions-column[_ngcontent-%COMP%] {\n  width: 100px;\n  text-align: center;\n}\n.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s ease;\n}\n.sortable[_ngcontent-%COMP%]:hover {\n  color: #2196f3;\n  background-color: #f0f7ff;\n}\n.sortable[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.6;\n  transition: opacity 0.2s ease;\n}\n.sortable[_ngcontent-%COMP%]:hover   .fas[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.indent-0[_ngcontent-%COMP%] {\n  margin-left: 0;\n}\n.indent-1[_ngcontent-%COMP%] {\n  margin-left: 20px;\n}\n.indent-2[_ngcontent-%COMP%] {\n  margin-left: 40px;\n}\n.indent-3[_ngcontent-%COMP%] {\n  margin-left: 60px;\n}\n.indent-4[_ngcontent-%COMP%] {\n  margin-left: 80px;\n}\n.indent-5[_ngcontent-%COMP%] {\n  margin-left: 100px;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.form-check-input[_ngcontent-%COMP%]:indeterminate {\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #2196f3;\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.page-link[_ngcontent-%COMP%]:hover {\n  color: #2196f3;\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n}\n.page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: #2196f3;\n  border-color: #2196f3;\n  color: white;\n}\n.alert-info[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #0277bd;\n  border-left: 4px solid #2196f3;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  color: #2196f3;\n  width: 3rem;\n  height: 3rem;\n}\n.text-muted[_ngcontent-%COMP%]   i.fa-3x[_ngcontent-%COMP%] {\n  color: #adb5bd !important;\n  margin-bottom: 1rem;\n}\n[dir=rtl][_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected-row[_ngcontent-%COMP%] {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n[dir=rtl][_ngcontent-%COMP%]   .indent-1[_ngcontent-%COMP%] {\n  margin-right: 20px;\n  margin-left: 0;\n}\n[dir=rtl][_ngcontent-%COMP%]   .indent-2[_ngcontent-%COMP%] {\n  margin-right: 40px;\n  margin-left: 0;\n}\n[dir=rtl][_ngcontent-%COMP%]   .indent-3[_ngcontent-%COMP%] {\n  margin-right: 60px;\n  margin-left: 0;\n}\n[dir=rtl][_ngcontent-%COMP%]   .indent-4[_ngcontent-%COMP%] {\n  margin-right: 80px;\n  margin-left: 0;\n}\n[dir=rtl][_ngcontent-%COMP%]   .indent-5[_ngcontent-%COMP%] {\n  margin-right: 100px;\n  margin-left: 0;\n}\n[dir=rtl][_ngcontent-%COMP%]   .alert-info[_ngcontent-%COMP%] {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n@media (max-width: 768px) {\n  .table-controls[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.75rem;\n  }\n  .pagination[_ngcontent-%COMP%] {\n    justify-content: center;\n    margin-top: 1rem;\n  }\n  .d-flex.align-items-center[_ngcontent-%COMP%]   span.text-muted[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 576px) {\n  .table-container[_ngcontent-%COMP%] {\n    max-height: 60vh;\n  }\n  .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.5rem 0.25rem;\n  }\n  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 0.5rem 0.25rem;\n  }\n  .btn-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    margin-bottom: 2px;\n    border-radius: 4px !important;\n  }\n  .actions-column[_ngcontent-%COMP%] {\n    width: 80px;\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n.sortable[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  transition: transform 0.2s ease;\n}\n.sortable[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.btn[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  transition: transform 0.2s ease;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%], \n.btn-outline-danger[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%], \n.btn-outline-secondary[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:focus-within {\n  outline: 2px solid #2196f3;\n  outline-offset: -2px;\n}\n.btn[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n@media print {\n  .table-controls[_ngcontent-%COMP%], \n   .actions-column[_ngcontent-%COMP%], \n   .pagination[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .table[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected-row[_ngcontent-%COMP%] {\n    background-color: transparent !important;\n    border-left: none !important;\n  }\n}\n/*# sourceMappingURL=department-table.component.css.map */"] }));
var DepartmentTableComponent = _DepartmentTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DepartmentTableComponent, [{
    type: Component,
    args: [{ selector: "app-department-table", standalone: true, imports: [FormsModule, HasPermissionDirective, StatusBadgeComponent, LoadingSpinnerComponent], template: `<div class="department-table">\r
  <!-- Controls -->\r
  @if (showControls) {\r
    <div class="table-controls mb-3">\r
      <div class="row g-2 align-items-center">\r
        <div class="col-md-4">\r
          <div class="input-group">\r
            <span class="input-group-text">\r
              <i class="fas fa-search"></i>\r
            </span>\r
            <input\r
              type="text"\r
              class="form-control"\r
              [placeholder]="i18n.t('common.search') + '...'"\r
              [value]="searchTerm()"\r
              (input)="onSearchChange($any($event.target).value)"\r
            />\r
          </div>\r
        </div>\r
        <div class="col-md-3">\r
          <div class="form-check">\r
            <input\r
              class="form-check-input"\r
              type="checkbox"\r
              id="showInactiveTable"\r
              [checked]="showInactive()"\r
              (change)="onShowInactiveChange($any($event.target).checked)"\r
            />\r
            <label class="form-check-label" for="showInactiveTable">\r
              {{ i18n.t('common.showInactive') }}\r
            </label>\r
          </div>\r
        </div>\r
        <div class="col-md-3">\r
          <div class="form-check">\r
            <input\r
              class="form-check-input"\r
              type="checkbox"\r
              id="showHierarchy"\r
              [checked]="showHierarchy()"\r
              (change)="showHierarchy.set($any($event.target).checked)"\r
            />\r
            <label class="form-check-label" for="showHierarchy">\r
              {{ i18n.t('department.showHierarchy') }}\r
            </label>\r
          </div>\r
        </div>\r
        <div class="col-md-2">\r
          <div class="btn-group btn-group-sm">\r
            <button\r
              type="button"\r
              class="btn btn-outline-secondary"\r
              (click)="refresh()"\r
              [title]="i18n.t('common.refresh')"\r
            >\r
              <i class="fas fa-sync"></i>\r
            </button>\r
            @if (allowEdit) {\r
              <button\r
                *appHasPermission="PERMISSIONS.DEPARTMENT_CREATE"\r
                type="button"\r
                class="btn btn-primary"\r
                (click)="onAddDepartment()"\r
                [title]="i18n.t('department.addDepartment')"\r
              >\r
                <i class="fas fa-plus"></i>\r
              </button>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Bulk Actions -->\r
      @if (selectedDepartments().size > 0 && allowSelection) {\r
        <div class="row mt-2">\r
          <div class="col-12">\r
            <div class="alert alert-info d-flex align-items-center">\r
              <span class="flex-grow-1">\r
                <i class="fas fa-info-circle me-2"></i>\r
                {{ selectedDepartments().size }} {{ i18n.t('common.selected') }}\r
              </span>\r
              <div class="btn-group btn-group-sm">\r
                @if (allowDelete) {\r
                  <button\r
                    *appHasPermission="PERMISSIONS.DEPARTMENT_DELETE"\r
                    type="button"\r
                    class="btn btn-outline-danger"\r
                    (click)="onBulkDelete()"\r
                  >\r
                    <i class="fas fa-trash me-1"></i>\r
                    {{ i18n.t('common.deleteSelected') }}\r
                  </button>\r
                }\r
                <button\r
                  type="button"\r
                  class="btn btn-outline-secondary"\r
                  (click)="clearSelection()"\r
                >\r
                  <i class="fas fa-times me-1"></i>\r
                  {{ i18n.t('common.clearSelection') }}\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- Loading -->\r
  @if (loading()) {\r
    <div class="text-center p-4">\r
      <app-loading-spinner\r
        [message]="i18n.t('common.loading')"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Table -->\r
  @if (!loading()) {\r
    <div class="table-container">\r
      <div class="table-responsive">\r
        <table class="table table-hover">\r
          <thead class="table-light sticky-top">\r
            <tr>\r
              @if (allowSelection) {\r
                <th class="selection-column">\r
                  <div class="form-check">\r
                    <input\r
                      class="form-check-input"\r
                      type="checkbox"\r
                      [checked]="isAllPageSelected()"\r
                      [indeterminate]="isSomePageSelected()"\r
                      (change)="toggleAllSelection()"\r
                    />\r
                  </div>\r
                </th>\r
              }\r
              <th class="sortable" (click)="onSort('name')">\r
                <div class="d-flex align-items-center">\r
                  {{ i18n.t('department.name') }}\r
                  <i class="ms-2" [class]="getSortIcon('name')"></i>\r
                </div>\r
              </th>\r
              <th class="sortable" (click)="onSort('code')">\r
                <div class="d-flex align-items-center">\r
                  {{ i18n.t('department.code') }}\r
                  <i class="ms-2" [class]="getSortIcon('code')"></i>\r
                </div>\r
              </th>\r
              @if (showHierarchy()) {\r
                <th>{{ i18n.t('department.path') }}</th>\r
              }\r
              <th class="sortable" (click)="onSort('managerName')">\r
                <div class="d-flex align-items-center">\r
                  {{ i18n.t('department.manager') }}\r
                  <i class="ms-2" [class]="getSortIcon('managerName')"></i>\r
                </div>\r
              </th>\r
              <th class="sortable text-center" (click)="onSort('employeeCount')">\r
                <div class="d-flex align-items-center justify-content-center">\r
                  {{ i18n.t('common.employees') }}\r
                  <i class="ms-2" [class]="getSortIcon('employeeCount')"></i>\r
                </div>\r
              </th>\r
              <th class="sortable" (click)="onSort('location')">\r
                <div class="d-flex align-items-center">\r
                  {{ i18n.t('department.location') }}\r
                  <i class="ms-2" [class]="getSortIcon('location')"></i>\r
                </div>\r
              </th>\r
              <th class="sortable text-center" (click)="onSort('isActive')">\r
                <div class="d-flex align-items-center justify-content-center">\r
                  {{ i18n.t('common.status') }}\r
                  <i class="ms-2" [class]="getSortIcon('isActive')"></i>\r
                </div>\r
              </th>\r
              @if (showControls) {\r
                <th class="actions-column">{{ i18n.t('common.actions') }}</th>\r
              }\r
            </tr>\r
          </thead>\r
          <tbody>\r
            @for (dept of getPaginatedDepartments(); track trackByDeptId($index, dept)) {\r
              <tr [class.table-warning]="!dept.isActive"\r
                  [class.selected-row]="isSelected(dept.id)"\r
                  (click)="selectDepartment(dept)">\r
\r
                <!-- Selection Checkbox -->\r
                @if (allowSelection) {\r
                  <td class="selection-column">\r
                    <div class="form-check">\r
                      <input\r
                        class="form-check-input"\r
                        type="checkbox"\r
                        [checked]="isSelected(dept.id)"\r
                        (change)="toggleSelection(dept.id); $event.stopPropagation()"\r
                      />\r
                    </div>\r
                  </td>\r
                }\r
\r
                <!-- Department Name -->\r
                <td>\r
                  <div class="d-flex align-items-center">\r
                    @if (showHierarchy()) {\r
                      <div [class]="getIndentClass(dept.level)"></div>\r
                    }\r
                    <i class="fas fa-building text-primary me-2"></i>\r
                    <div>\r
                      <div class="fw-medium">{{ dept.name }}</div>\r
                      @if (dept.nameAr) {\r
                        <div class="text-muted small">{{ dept.nameAr }}</div>\r
                      }\r
                      @if (dept.description) {\r
                        <div class="text-muted small">{{ dept.description }}</div>\r
                      }\r
                    </div>\r
                  </div>\r
                </td>\r
\r
                <!-- Department Code -->\r
                <td>\r
                  <app-status-badge\r
                    [status]="'secondary'"\r
                    [label]="dept.code">\r
                  </app-status-badge>\r
                </td>\r
\r
                <!-- Department Path -->\r
                @if (showHierarchy()) {\r
                  <td>\r
                    <small class="text-muted">{{ dept.path }}</small>\r
                  </td>\r
                }\r
\r
                <!-- Manager -->\r
                <td>\r
                  @if (dept.managerName) {\r
                    <div class="d-flex align-items-center">\r
                      <i class="fas fa-user-tie text-secondary me-2"></i>\r
                      {{ dept.managerName }}\r
                    </div>\r
                  }\r
                  @if (!dept.managerName) {\r
                    <span class="text-muted">-</span>\r
                  }\r
                </td>\r
\r
                <!-- Employee Count -->\r
                <td class="text-center">\r
                  <app-status-badge\r
                    [status]="dept.employeeCount > 0 ? 'success' : 'secondary'"\r
                    [label]="dept.employeeCount.toString()">\r
                  </app-status-badge>\r
                </td>\r
\r
                <!-- Location -->\r
                <td>\r
                  @if (dept.location) {\r
                    <div class="d-flex align-items-center">\r
                      <i class="fas fa-map-marker-alt text-secondary me-2"></i>\r
                      {{ dept.location }}\r
                    </div>\r
                  }\r
                  @if (!dept.location) {\r
                    <span class="text-muted">-</span>\r
                  }\r
                </td>\r
\r
                <!-- Status -->\r
                <td class="text-center">\r
                  <app-status-badge\r
                    [status]="dept.isActive ? 'active' : 'inactive'"\r
                    [label]="dept.isActive ? i18n.t('common.active') : i18n.t('common.inactive')"\r
                    [showIcon]="true">\r
                  </app-status-badge>\r
                </td>\r
\r
                <!-- Actions -->\r
                @if (showControls) {\r
                  <td class="actions-column">\r
                    <div class="btn-group btn-group-sm">\r
                      <button\r
                        *appHasPermission="PERMISSIONS.DEPARTMENT_READ"\r
                        type="button"\r
                        class="btn btn-outline-primary"\r
                        (click)="onViewDepartment(dept); $event.stopPropagation()"\r
                        [title]="i18n.t('common.view')"\r
                      >\r
                        <i class="fas fa-eye"></i>\r
                      </button>\r
                      @if (allowEdit) {\r
                        <button\r
                          *appHasPermission="PERMISSIONS.DEPARTMENT_UPDATE"\r
                          type="button"\r
                          class="btn btn-outline-secondary"\r
                          (click)="onEditDepartment(dept); $event.stopPropagation()"\r
                          [title]="i18n.t('common.edit')"\r
                        >\r
                          <i class="fas fa-edit"></i>\r
                        </button>\r
                      }\r
                      @if (allowDelete && dept.employeeCount === 0) {\r
                        <button\r
                          *appHasPermission="PERMISSIONS.DEPARTMENT_DELETE"\r
                          type="button"\r
                          class="btn btn-outline-danger"\r
                          (click)="onDeleteDepartment(dept); $event.stopPropagation()"\r
                          [title]="i18n.t('common.delete')"\r
                        >\r
                          <i class="fas fa-trash"></i>\r
                        </button>\r
                      }\r
                    </div>\r
                  </td>\r
                }\r
              </tr>\r
            }\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <!-- Empty State -->\r
      @if (getPaginatedDepartments().length === 0) {\r
        <div class="text-center p-4 text-muted">\r
          <i class="fas fa-building fa-3x mb-3"></i>\r
          <h5>{{ i18n.t('department.noDepartments') }}</h5>\r
          <p>{{ i18n.t('department.noDepartmentsDescription') }}</p>\r
          @if (allowEdit) {\r
            <button\r
              type="button"\r
              class="btn btn-primary"\r
              (click)="onAddDepartment()"\r
            >\r
              <i class="fas fa-plus me-2"></i>\r
              {{ i18n.t('department.addFirstDepartment') }}\r
            </button>\r
          }\r
        </div>\r
      }\r
\r
      <!-- Pagination -->\r
      @if (totalPages() > 1) {\r
        <nav aria-label="Department pagination" class="mt-3">\r
          <div class="row align-items-center">\r
            <div class="col-md-6">\r
              <div class="d-flex align-items-center">\r
                <label class="form-label me-2 mb-0">{{ i18n.t('common.pageSize') }}:</label>\r
                <select\r
                  class="form-select form-select-sm"\r
                  style="width: auto;"\r
                  [value]="pageSize()"\r
                  (change)="onPageSizeChange(+$any($event.target).value)"\r
                >\r
                  @for (size of pageSizeOptions; track $index) {\r
                    <option [value]="size">{{ size }}</option>\r
                  }\r
                </select>\r
                <span class="text-muted ms-3">\r
                  {{ i18n.t('common.showing') }}\r
                  {{ (currentPage() - 1) * pageSize() + 1 }}-{{ Math.min(currentPage() * pageSize(), filteredDepartments().length) }}\r
                  {{ i18n.t('common.of') }}\r
                  {{ filteredDepartments().length }}\r
                </span>\r
              </div>\r
            </div>\r
            <div class="col-md-6">\r
              <ul class="pagination pagination-sm justify-content-end mb-0">\r
                <li class="page-item" [class.disabled]="currentPage() === 1">\r
                  <button class="page-link" (click)="onPageChange(currentPage() - 1)" [disabled]="currentPage() === 1">\r
                    <i class="fas fa-chevron-left"></i>\r
                  </button>\r
                </li>\r
\r
                @for (page of getPageNumbers(); track $index) {\r
                  <li class="page-item"\r
                      [class.active]="page === currentPage()"\r
                      [class.disabled]="page === -1">\r
                    @if (page !== -1) {\r
                      <button\r
                        class="page-link"\r
                        (click)="onPageChange(page)"\r
                      >\r
                        {{ page }}\r
                      </button>\r
                    }\r
                    @if (page === -1) {\r
                      <span class="page-link">...</span>\r
                    }\r
                  </li>\r
                }\r
\r
                <li class="page-item" [class.disabled]="currentPage() === totalPages()">\r
                  <button class="page-link" (click)="onPageChange(currentPage() + 1)" [disabled]="currentPage() === totalPages()">\r
                    <i class="fas fa-chevron-right"></i>\r
                  </button>\r
                </li>\r
              </ul>\r
            </div>\r
          </div>\r
        </nav>\r
      }\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/departments/department-table/department-table.component.css */\n.department-table {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.table-controls {\n  padding: 1rem;\n  border-bottom: 1px solid #e9ecef;\n  background-color: #f8f9fa;\n  border-radius: 8px 8px 0 0;\n}\n.table-container {\n  max-height: 70vh;\n  overflow-y: auto;\n}\n.table tbody tr.selected-row {\n  background-color: #e3f2fd;\n  border-left: 4px solid #2196f3;\n}\n.table tbody tr.table-warning {\n  background-color: #fff3cd;\n}\n.table tbody tr.table-warning:hover {\n  background-color: #ffeaa7;\n}\n.selection-column {\n  width: 50px;\n  text-align: center;\n}\n.actions-column {\n  width: 100px;\n  text-align: center;\n}\n.sortable {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s ease;\n}\n.sortable:hover {\n  color: #2196f3;\n  background-color: #f0f7ff;\n}\n.sortable .fas {\n  font-size: 0.75rem;\n  opacity: 0.6;\n  transition: opacity 0.2s ease;\n}\n.sortable:hover .fas {\n  opacity: 1;\n}\n.indent-0 {\n  margin-left: 0;\n}\n.indent-1 {\n  margin-left: 20px;\n}\n.indent-2 {\n  margin-left: 40px;\n}\n.indent-3 {\n  margin-left: 60px;\n}\n.indent-4 {\n  margin-left: 80px;\n}\n.indent-5 {\n  margin-left: 100px;\n}\n.form-check-input:checked {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n.form-check-input:indeterminate {\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.form-select:focus {\n  border-color: #2196f3;\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n.page-link:hover {\n  color: #2196f3;\n  background-color: #f8f9fa;\n  border-color: #dee2e6;\n}\n.page-item.active .page-link {\n  background-color: #2196f3;\n  border-color: #2196f3;\n  color: white;\n}\n.alert-info {\n  background-color: #e3f2fd;\n  color: #0277bd;\n  border-left: 4px solid #2196f3;\n}\n.spinner-border {\n  color: #2196f3;\n  width: 3rem;\n  height: 3rem;\n}\n.text-muted i.fa-3x {\n  color: #adb5bd !important;\n  margin-bottom: 1rem;\n}\n[dir=rtl] .table tbody tr.selected-row {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n[dir=rtl] .indent-1 {\n  margin-right: 20px;\n  margin-left: 0;\n}\n[dir=rtl] .indent-2 {\n  margin-right: 40px;\n  margin-left: 0;\n}\n[dir=rtl] .indent-3 {\n  margin-right: 60px;\n  margin-left: 0;\n}\n[dir=rtl] .indent-4 {\n  margin-right: 80px;\n  margin-left: 0;\n}\n[dir=rtl] .indent-5 {\n  margin-right: 100px;\n  margin-left: 0;\n}\n[dir=rtl] .alert-info {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n@media (max-width: 768px) {\n  .table-controls .row > div {\n    margin-bottom: 0.5rem;\n  }\n  .btn-group .btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.75rem;\n  }\n  .pagination {\n    justify-content: center;\n    margin-top: 1rem;\n  }\n  .d-flex.align-items-center span.text-muted {\n    display: none;\n  }\n}\n@media (max-width: 576px) {\n  .table-container {\n    max-height: 60vh;\n  }\n  .table thead th {\n    font-size: 0.75rem;\n    padding: 0.5rem 0.25rem;\n  }\n  .table tbody td {\n    padding: 0.5rem 0.25rem;\n  }\n  .btn-group {\n    flex-direction: column;\n  }\n  .btn-group .btn {\n    margin-bottom: 2px;\n    border-radius: 4px !important;\n  }\n  .actions-column {\n    width: 80px;\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.table tbody tr {\n  animation: fadeIn 0.3s ease-out;\n}\n.sortable i {\n  transition: transform 0.2s ease;\n}\n.sortable:hover i {\n  transform: scale(1.1);\n}\n.btn:hover i {\n  transition: transform 0.2s ease;\n}\n.btn-outline-primary:hover i,\n.btn-outline-danger:hover i,\n.btn-outline-secondary:hover i {\n  transform: scale(1.1);\n}\n.table tbody tr:focus-within {\n  outline: 2px solid #2196f3;\n  outline-offset: -2px;\n}\n.btn:focus {\n  box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);\n}\n@media print {\n  .table-controls,\n  .actions-column,\n  .pagination {\n    display: none !important;\n  }\n  .table {\n    font-size: 0.8rem;\n  }\n  .table tbody tr.selected-row {\n    background-color: transparent !important;\n    border-left: none !important;\n  }\n}\n/*# sourceMappingURL=department-table.component.css.map */\n"] }]
  }], null, { selectedBranchId: [{
    type: Input
  }], allowSelection: [{
    type: Input
  }], allowEdit: [{
    type: Input
  }], allowDelete: [{
    type: Input
  }], showControls: [{
    type: Input
  }], departmentSelected: [{
    type: Output
  }], departmentView: [{
    type: Output
  }], departmentEdit: [{
    type: Output
  }], departmentDelete: [{
    type: Output
  }], departmentAdd: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DepartmentTableComponent, { className: "DepartmentTableComponent", filePath: "src/app/pages/departments/department-table/department-table.component.ts", lineNumber: 25 });
})();

// src/app/pages/departments/department-tree/department-tree.component.ts
function DepartmentTreeComponent_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_1_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onAddDepartment());
    }, "DepartmentTreeComponent_Conditional_1_Conditional_20_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r1.i18n.t("department.addDepartment"));
  }
}
__name(DepartmentTreeComponent_Conditional_1_Conditional_20_Template, "DepartmentTreeComponent_Conditional_1_Conditional_20_Template");
function DepartmentTreeComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 4)(2, "div", 5)(3, "div", 6)(4, "span", 7);
    \u0275\u0275element(5, "i", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 9);
    \u0275\u0275listener("input", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_1_Template_input_input_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSearchChange($event.target.value));
    }, "DepartmentTreeComponent_Conditional_1_Template_input_input_6_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 10)(8, "div", 11)(9, "input", 12);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_1_Template_input_change_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onShowInactiveChange($event.target.checked));
    }, "DepartmentTreeComponent_Conditional_1_Template_input_change_9_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label", 13);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 14)(13, "div", 15)(14, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_1_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.expandAll());
    }, "DepartmentTreeComponent_Conditional_1_Template_button_click_14_listener"));
    \u0275\u0275element(15, "i", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_1_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.collapseAll());
    }, "DepartmentTreeComponent_Conditional_1_Template_button_click_16_listener"));
    \u0275\u0275element(17, "i", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_1_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refresh());
    }, "DepartmentTreeComponent_Conditional_1_Template_button_click_18_listener"));
    \u0275\u0275element(19, "i", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, DepartmentTreeComponent_Conditional_1_Conditional_20_Template, 2, 1, "button", 20);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t("common.search") + "...")("value", ctx_r1.searchTerm());
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r1.showInactive());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.showInactive"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.expandAll"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.collapseAll"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.refresh"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.allowEdit ? 20 : -1);
  }
}
__name(DepartmentTreeComponent_Conditional_1_Template, "DepartmentTreeComponent_Conditional_1_Template");
function DepartmentTreeComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r1.i18n.t("common.loading"))("centered", true);
  }
}
__name(DepartmentTreeComponent_Conditional_2_Template, "DepartmentTreeComponent_Conditional_2_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_3_For_2_Conditional_2_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const node_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleNode(node_r5.id);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_2_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-chevron-right", !ctx_r1.isExpanded(node_r5.id))("fa-chevron-down", ctx_r1.isExpanded(node_r5.id));
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_2_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_2_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 29);
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_3_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_3_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.inactive"), " ");
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_11_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_11_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", node_r5.description, " ");
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_12_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_12_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", node_r5.managerName, " ");
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_14_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_14_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275element(1, "i", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", node_r5.employeeCount, " ", ctx_r1.i18n.t("common.employees"), " ");
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_15_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_15_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275element(1, "i", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", node_r5.location, " ");
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_16_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_16_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_4_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const node_r5 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onAddDepartment(node_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_4_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("title", ctx_r1.i18n.t("department.addSubDepartment"));
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_4_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_4_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_5_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const node_r5 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onEditDepartment(node_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_5_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.edit"));
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_5_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_5_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_6_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const node_r5 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onDeleteDepartment(node_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_6_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.delete"));
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_6_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_6_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 15)(2, "button", 44);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const node_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onViewDepartment(node_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Template_button_click_2_listener"));
    \u0275\u0275element(3, "i", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_4_Template, 2, 1, "button", 46);
    \u0275\u0275conditionalCreate(5, DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_5_Template, 2, 1, "button", 47);
    \u0275\u0275conditionalCreate(6, DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Conditional_6_Template, 2, 1, "button", 48);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const node_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r1.i18n.t("common.view"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.allowEdit ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allowEdit ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allowDelete && node_r5.employeeCount === 0 ? 6 : -1);
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Template, "DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Template");
function DepartmentTreeComponent_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_3_For_2_Template_div_click_1_listener() {
      const node_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectNode(node_r5));
    }, "DepartmentTreeComponent_Conditional_3_For_2_Template_div_click_1_listener"));
    \u0275\u0275conditionalCreate(2, DepartmentTreeComponent_Conditional_3_For_2_Conditional_2_Template, 2, 4, "button", 28);
    \u0275\u0275conditionalCreate(3, DepartmentTreeComponent_Conditional_3_For_2_Conditional_3_Template, 1, 0, "div", 29);
    \u0275\u0275element(4, "i", 30);
    \u0275\u0275elementStart(5, "div", 31)(6, "div", 32)(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 33);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, DepartmentTreeComponent_Conditional_3_For_2_Conditional_11_Template, 2, 1, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, DepartmentTreeComponent_Conditional_3_For_2_Conditional_12_Template, 2, 1, "div", 35);
    \u0275\u0275elementStart(13, "div", 36);
    \u0275\u0275conditionalCreate(14, DepartmentTreeComponent_Conditional_3_For_2_Conditional_14_Template, 3, 1, "span");
    \u0275\u0275conditionalCreate(15, DepartmentTreeComponent_Conditional_3_For_2_Conditional_15_Template, 3, 2, "span", 37);
    \u0275\u0275conditionalCreate(16, DepartmentTreeComponent_Conditional_3_For_2_Conditional_16_Template, 3, 1, "span", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, DepartmentTreeComponent_Conditional_3_For_2_Conditional_17_Template, 7, 4, "div", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const node_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.isSelected(node_r5.id))("inactive", !node_r5.isActive);
    \u0275\u0275advance();
    \u0275\u0275styleMap(ctx_r1.getIndentStyle(node_r5.indentLevel));
    \u0275\u0275advance();
    \u0275\u0275conditional(node_r5.hasChildren ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!node_r5.hasChildren ? 3 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(node_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", node_r5.code, ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(!node_r5.isActive ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(node_r5.description ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(node_r5.managerName ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(node_r5.employeeCount > 0 ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(node_r5.location ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showControls ? 17 : -1);
  }
}
__name(DepartmentTreeComponent_Conditional_3_For_2_Template, "DepartmentTreeComponent_Conditional_3_For_2_Template");
function DepartmentTreeComponent_Conditional_3_Conditional_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentTreeComponent_Conditional_3_Conditional_3_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onAddDepartment());
    }, "DepartmentTreeComponent_Conditional_3_Conditional_3_Conditional_6_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("department.addFirstDepartment"), " ");
  }
}
__name(DepartmentTreeComponent_Conditional_3_Conditional_3_Conditional_6_Template, "DepartmentTreeComponent_Conditional_3_Conditional_3_Conditional_6_Template");
function DepartmentTreeComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275elementStart(2, "h5");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DepartmentTreeComponent_Conditional_3_Conditional_3_Conditional_6_Template, 3, 1, "button", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("department.noDepartments"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("department.noDepartmentsDescription"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allowEdit ? 6 : -1);
  }
}
__name(DepartmentTreeComponent_Conditional_3_Conditional_3_Template, "DepartmentTreeComponent_Conditional_3_Conditional_3_Template");
function DepartmentTreeComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, DepartmentTreeComponent_Conditional_3_For_2_Template, 18, 16, "div", 24, \u0275\u0275componentInstance().trackByNodeId, true);
    \u0275\u0275conditionalCreate(3, DepartmentTreeComponent_Conditional_3_Conditional_3_Template, 7, 3, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getVisibleNodes());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.getVisibleNodes().length === 0 ? 3 : -1);
  }
}
__name(DepartmentTreeComponent_Conditional_3_Template, "DepartmentTreeComponent_Conditional_3_Template");
var _DepartmentTreeComponent = class _DepartmentTreeComponent {
  selectedBranchId;
  allowSelection = true;
  allowEdit = true;
  allowDelete = true;
  showControls = true;
  departmentSelected = new EventEmitter();
  departmentView = new EventEmitter();
  departmentEdit = new EventEmitter();
  departmentDelete = new EventEmitter();
  departmentAdd = new EventEmitter();
  i18n = inject(I18nService);
  departmentsService = inject(DepartmentsService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  departments = signal([], ...ngDevMode ? [{ debugName: "departments" }] : []);
  expandedNodes = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "expandedNodes" }] : []);
  selectedNode = signal(null, ...ngDevMode ? [{ debugName: "selectedNode" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  showInactive = signal(false, ...ngDevMode ? [{ debugName: "showInactive" }] : []);
  ngOnInit() {
    this.loadDepartments();
  }
  loadDepartments() {
    return __async(this, null, function* () {
      this.loading.set(true);
      try {
        const departments = yield this.departmentsService.getDepartmentTree(this.selectedBranchId).toPromise();
        if (departments) {
          this.departments.set(this.convertToTreeNodes(departments));
        }
      } catch (error) {
        console.error("Failed to load departments:", error);
      } finally {
        this.loading.set(false);
      }
    });
  }
  convertToTreeNodes(departments) {
    return departments.map((dept) => __spreadProps(__spreadValues({}, dept), {
      expanded: false,
      selected: false,
      indentLevel: dept.level,
      children: dept.children ? this.convertToTreeNodes(dept.children) : []
    }));
  }
  toggleNode(nodeId) {
    const expanded = this.expandedNodes();
    if (expanded.has(nodeId)) {
      expanded.delete(nodeId);
    } else {
      expanded.add(nodeId);
    }
    this.expandedNodes.set(new Set(expanded));
  }
  selectNode(node) {
    if (!this.allowSelection)
      return;
    this.selectedNode.set(node.id);
    this.departmentSelected.emit(node);
  }
  isExpanded(nodeId) {
    return this.expandedNodes().has(nodeId);
  }
  isSelected(nodeId) {
    return this.selectedNode() === nodeId;
  }
  getVisibleNodes() {
    const allNodes = [];
    const searchTerm = this.searchTerm().toLowerCase();
    const showInactive = this.showInactive();
    const traverse = /* @__PURE__ */ __name((nodes, level = 0) => {
      for (const node of nodes) {
        const matchesSearch = !searchTerm || node.name.toLowerCase().includes(searchTerm) || node.code.toLowerCase().includes(searchTerm) || node.nameAr && node.nameAr.toLowerCase().includes(searchTerm);
        const matchesActive = showInactive || node.isActive;
        if (matchesSearch && matchesActive) {
          allNodes.push(__spreadProps(__spreadValues({}, node), {
            indentLevel: level
          }));
        }
        if (node.children && this.isExpanded(node.id)) {
          traverse(node.children, level + 1);
        }
      }
    }, "traverse");
    traverse(this.departments());
    return allNodes;
  }
  expandAll() {
    const allIds = this.getAllNodeIds(this.departments());
    this.expandedNodes.set(new Set(allIds));
  }
  collapseAll() {
    this.expandedNodes.set(/* @__PURE__ */ new Set());
  }
  getAllNodeIds(nodes) {
    const ids = [];
    for (const node of nodes) {
      ids.push(node.id);
      if (node.children) {
        ids.push(...this.getAllNodeIds(node.children));
      }
    }
    return ids;
  }
  onAddDepartment(parentNode) {
    this.departmentAdd.emit({ parentId: parentNode?.id });
  }
  onViewDepartment(node) {
    this.departmentView.emit(node);
  }
  onEditDepartment(node) {
    this.departmentEdit.emit(node);
  }
  onDeleteDepartment(node) {
    this.departmentDelete.emit(node);
  }
  getIndentStyle(level) {
    const indentLevel = level || 0;
    return `margin-left: ${indentLevel * 20}px`;
  }
  onSearchChange(term) {
    this.searchTerm.set(term);
    if (term) {
      this.expandMatchingNodes();
    }
  }
  expandMatchingNodes() {
    const searchTerm = this.searchTerm().toLowerCase();
    const expanded = /* @__PURE__ */ new Set();
    const findAndExpand = /* @__PURE__ */ __name((nodes, parentIds = []) => {
      for (const node of nodes) {
        const matches = node.name.toLowerCase().includes(searchTerm) || node.code.toLowerCase().includes(searchTerm) || node.nameAr && node.nameAr.toLowerCase().includes(searchTerm);
        if (matches) {
          parentIds.forEach((id) => expanded.add(id));
        }
        if (node.children) {
          findAndExpand(node.children, [...parentIds, node.id]);
        }
      }
    }, "findAndExpand");
    findAndExpand(this.departments());
    this.expandedNodes.set(expanded);
  }
  onShowInactiveChange(show) {
    this.showInactive.set(show);
  }
  refresh() {
    this.loadDepartments();
  }
  trackByNodeId(index, node) {
    return node.id;
  }
};
__name(_DepartmentTreeComponent, "DepartmentTreeComponent");
__publicField(_DepartmentTreeComponent, "\u0275fac", /* @__PURE__ */ __name(function DepartmentTreeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DepartmentTreeComponent)();
}, "DepartmentTreeComponent_Factory"));
__publicField(_DepartmentTreeComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DepartmentTreeComponent, selectors: [["app-department-tree"]], inputs: { selectedBranchId: "selectedBranchId", allowSelection: "allowSelection", allowEdit: "allowEdit", allowDelete: "allowDelete", showControls: "showControls" }, outputs: { departmentSelected: "departmentSelected", departmentView: "departmentView", departmentEdit: "departmentEdit", departmentDelete: "departmentDelete", departmentAdd: "departmentAdd" }, decls: 4, vars: 3, consts: [[1, "department-tree"], [1, "tree-controls", "mb-3"], [1, "text-center", "p-4"], [1, "tree-container"], [1, "row", "g-2", "align-items-center"], [1, "col-md-4"], [1, "input-group"], [1, "input-group-text"], [1, "fas", "fa-search"], ["type", "text", 1, "form-control", 3, "input", "placeholder", "value"], [1, "col-md-3"], [1, "form-check"], ["type", "checkbox", "id", "showInactive", 1, "form-check-input", 3, "change", "checked"], ["for", "showInactive", 1, "form-check-label"], [1, "col-md-5"], [1, "btn-group", "btn-group-sm"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "title"], [1, "fas", "fa-expand-arrows-alt"], [1, "fas", "fa-compress-arrows-alt"], [1, "fas", "fa-sync"], ["type", "button", 1, "btn", "btn-primary", 3, "title"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "title"], [1, "fas", "fa-plus"], [3, "message", "centered"], [1, "tree-node", 3, "selected", "inactive"], [1, "text-center", "p-4", "text-muted"], [1, "tree-node"], [1, "node-content", "d-flex", "align-items-center", "p-2", 3, "click"], ["type", "button", 1, "btn", "btn-sm", "btn-link", "expand-btn", "p-0", "me-2"], [1, "expand-spacer", "me-2"], [1, "fas", "fa-building", "me-2", "text-primary"], [1, "node-info", "flex-grow-1"], [1, "node-title"], [1, "text-muted", "ms-1"], [1, "badge", "bg-light", "text-dark", "border", "ms-2"], [1, "node-subtitle", "text-muted", "small"], [1, "node-meta", "text-muted", "small"], [1, "ms-2"], [1, "node-actions"], ["type", "button", 1, "btn", "btn-sm", "btn-link", "expand-btn", "p-0", "me-2", 3, "click"], [1, "fas"], [1, "fas", "fa-user-tie", "me-1"], [1, "fas", "fa-users", "me-1"], [1, "fas", "fa-map-marker-alt", "me-1"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "title"], [1, "fas", "fa-eye"], ["type", "button", 1, "btn", "btn-outline-success", 3, "title"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "title"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "title"], ["type", "button", 1, "btn", "btn-outline-success", 3, "click", "title"], [1, "fas", "fa-edit"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "title"], [1, "fas", "fa-trash"], [1, "fas", "fa-building", "fa-3x", "mb-3"], ["type", "button", 1, "btn", "btn-primary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-plus", "me-2"]], template: /* @__PURE__ */ __name(function DepartmentTreeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, DepartmentTreeComponent_Conditional_1_Template, 21, 8, "div", 1);
    \u0275\u0275conditionalCreate(2, DepartmentTreeComponent_Conditional_2_Template, 2, 2, "div", 2);
    \u0275\u0275conditionalCreate(3, DepartmentTreeComponent_Conditional_3_Template, 4, 1, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showControls ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() ? 3 : -1);
  }
}, "DepartmentTreeComponent_Template"), dependencies: [FormsModule, LoadingSpinnerComponent], styles: ["\n\n.department-tree[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.tree-controls[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-bottom: 1px solid #e9ecef;\n  background-color: #f8f9fa;\n  border-radius: 8px 8px 0 0;\n}\n.tree-container[_ngcontent-%COMP%] {\n  max-height: 600px;\n  overflow-y: auto;\n}\n.tree-node[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f8f9fa;\n  transition: all 0.2s ease;\n}\n.tree-node[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.tree-node.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  border-left: 4px solid #2196f3;\n}\n.tree-node.inactive[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.node-content[_ngcontent-%COMP%] {\n  cursor: pointer;\n  position: relative;\n  min-height: 48px;\n}\n.expand-btn[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: none !important;\n  color: #6c757d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.expand-btn[_ngcontent-%COMP%]:hover {\n  color: #495057;\n  background-color: #e9ecef;\n  border-radius: 4px;\n}\n.expand-spacer[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n.node-info[_ngcontent-%COMP%] {\n  min-height: 36px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.node-title[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #212529;\n  line-height: 1.2;\n}\n.node-subtitle[_ngcontent-%COMP%] {\n  margin-top: 2px;\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n.node-meta[_ngcontent-%COMP%] {\n  margin-top: 2px;\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n.node-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n}\n.node-actions[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.tree-node[_ngcontent-%COMP%]:hover   .node-actions[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.node-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.node-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n[dir=rtl][_ngcontent-%COMP%]   .tree-node.selected[_ngcontent-%COMP%] {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n[dir=rtl][_ngcontent-%COMP%]   .node-content[_ngcontent-%COMP%] {\n  flex-direction: row-reverse;\n}\n@media (max-width: 768px) {\n  .tree-controls[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n  .node-actions[_ngcontent-%COMP%] {\n    opacity: 1;\n  }\n  .node-actions[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .node-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: block;\n    margin-left: 0 !important;\n    margin-top: 2px;\n  }\n}\n.tree-container[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.tree-container[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 4px;\n}\n.tree-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 4px;\n}\n.tree-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.tree-node[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  color: #2196f3;\n}\n.text-muted[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #adb5bd !important;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  padding: 0.25rem 0.5rem;\n}\n.btn-outline-success[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.btn-outline-danger[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n/*# sourceMappingURL=department-tree.component.css.map */"] }));
var DepartmentTreeComponent = _DepartmentTreeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DepartmentTreeComponent, [{
    type: Component,
    args: [{ selector: "app-department-tree", standalone: true, imports: [FormsModule, LoadingSpinnerComponent], template: `<div class="department-tree">\r
  <!-- Controls -->\r
  @if (showControls) {\r
    <div class="tree-controls mb-3">\r
      <div class="row g-2 align-items-center">\r
        <div class="col-md-4">\r
          <div class="input-group">\r
            <span class="input-group-text">\r
              <i class="fas fa-search"></i>\r
            </span>\r
            <input\r
              type="text"\r
              class="form-control"\r
              [placeholder]="i18n.t('common.search') + '...'"\r
              [value]="searchTerm()"\r
              (input)="onSearchChange($any($event.target).value)"\r
            />\r
          </div>\r
        </div>\r
        <div class="col-md-3">\r
          <div class="form-check">\r
            <input\r
              class="form-check-input"\r
              type="checkbox"\r
              id="showInactive"\r
              [checked]="showInactive()"\r
              (change)="onShowInactiveChange($any($event.target).checked)"\r
            />\r
            <label class="form-check-label" for="showInactive">\r
              {{ i18n.t('common.showInactive') }}\r
            </label>\r
          </div>\r
        </div>\r
        <div class="col-md-5">\r
          <div class="btn-group btn-group-sm">\r
            <button\r
              type="button"\r
              class="btn btn-outline-secondary"\r
              (click)="expandAll()"\r
              [title]="i18n.t('common.expandAll')"\r
            >\r
              <i class="fas fa-expand-arrows-alt"></i>\r
            </button>\r
            <button\r
              type="button"\r
              class="btn btn-outline-secondary"\r
              (click)="collapseAll()"\r
              [title]="i18n.t('common.collapseAll')"\r
            >\r
              <i class="fas fa-compress-arrows-alt"></i>\r
            </button>\r
            <button\r
              type="button"\r
              class="btn btn-outline-secondary"\r
              (click)="refresh()"\r
              [title]="i18n.t('common.refresh')"\r
            >\r
              <i class="fas fa-sync"></i>\r
            </button>\r
            @if (allowEdit) {\r
              <button\r
                type="button"\r
                class="btn btn-primary"\r
                (click)="onAddDepartment()"\r
                [title]="i18n.t('department.addDepartment')"\r
              >\r
                <i class="fas fa-plus"></i>\r
              </button>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Loading -->\r
  @if (loading()) {\r
    <div class="text-center p-4">\r
      <app-loading-spinner\r
        [message]="i18n.t('common.loading')"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Tree -->\r
  @if (!loading()) {\r
    <div class="tree-container">\r
      @for (node of getVisibleNodes(); track trackByNodeId($index, node)) {\r
        <div class="tree-node"\r
             [class.selected]="isSelected(node.id)"\r
             [class.inactive]="!node.isActive">\r
\r
          <!-- Node Content -->\r
          <div class="node-content d-flex align-items-center p-2"\r
               [style]="getIndentStyle(node.indentLevel)"\r
               (click)="selectNode(node)">\r
\r
            <!-- Expand/Collapse Button -->\r
            @if (node.hasChildren) {\r
              <button\r
                type="button"\r
                class="btn btn-sm btn-link expand-btn p-0 me-2"\r
                (click)="toggleNode(node.id); $event.stopPropagation()"\r
              >\r
                <i class="fas"\r
                   [class.fa-chevron-right]="!isExpanded(node.id)"\r
                   [class.fa-chevron-down]="isExpanded(node.id)"></i>\r
              </button>\r
            }\r
\r
            <!-- Spacer for nodes without children -->\r
            @if (!node.hasChildren) {\r
              <div class="expand-spacer me-2"></div>\r
            }\r
\r
            <!-- Department Icon -->\r
            <i class="fas fa-building me-2 text-primary"></i>\r
\r
            <!-- Department Info -->\r
            <div class="node-info flex-grow-1">\r
              <div class="node-title">\r
                <strong>{{ node.name }}</strong>\r
                <span class="text-muted ms-1">({{ node.code }})</span>\r
                @if (!node.isActive) {\r
                  <span class="badge bg-light text-dark border ms-2">\r
                    {{ i18n.t('common.inactive') }}\r
                  </span>\r
                }\r
              </div>\r
              @if (node.description) {\r
                <div class="node-subtitle text-muted small">\r
                  {{ node.description }}\r
                </div>\r
              }\r
              <div class="node-meta text-muted small">\r
                @if (node.managerName) {\r
                  <span>\r
                    <i class="fas fa-user-tie me-1"></i>\r
                    {{ node.managerName }}\r
                  </span>\r
                }\r
                @if (node.employeeCount > 0) {\r
                  <span class="ms-2">\r
                    <i class="fas fa-users me-1"></i>\r
                    {{ node.employeeCount }} {{ i18n.t('common.employees') }}\r
                  </span>\r
                }\r
                @if (node.location) {\r
                  <span class="ms-2">\r
                    <i class="fas fa-map-marker-alt me-1"></i>\r
                    {{ node.location }}\r
                  </span>\r
                }\r
              </div>\r
            </div>\r
\r
            <!-- Action Buttons -->\r
            @if (showControls) {\r
              <div class="node-actions">\r
                <div class="btn-group btn-group-sm">\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-primary"\r
                    (click)="onViewDepartment(node); $event.stopPropagation()"\r
                    [title]="i18n.t('common.view')"\r
                  >\r
                    <i class="fas fa-eye"></i>\r
                  </button>\r
                  @if (allowEdit) {\r
                    <button\r
                      type="button"\r
                      class="btn btn-outline-success"\r
                      (click)="onAddDepartment(node); $event.stopPropagation()"\r
                      [title]="i18n.t('department.addSubDepartment')"\r
                    >\r
                      <i class="fas fa-plus"></i>\r
                    </button>\r
                  }\r
                  @if (allowEdit) {\r
                    <button\r
                      type="button"\r
                      class="btn btn-outline-secondary"\r
                      (click)="onEditDepartment(node); $event.stopPropagation()"\r
                      [title]="i18n.t('common.edit')"\r
                    >\r
                      <i class="fas fa-edit"></i>\r
                    </button>\r
                  }\r
                  @if (allowDelete && node.employeeCount === 0) {\r
                    <button\r
                      type="button"\r
                      class="btn btn-outline-danger"\r
                      (click)="onDeleteDepartment(node); $event.stopPropagation()"\r
                      [title]="i18n.t('common.delete')"\r
                    >\r
                      <i class="fas fa-trash"></i>\r
                    </button>\r
                  }\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Empty State -->\r
      @if (getVisibleNodes().length === 0) {\r
        <div class="text-center p-4 text-muted">\r
          <i class="fas fa-building fa-3x mb-3"></i>\r
          <h5>{{ i18n.t('department.noDepartments') }}</h5>\r
          <p>{{ i18n.t('department.noDepartmentsDescription') }}</p>\r
          @if (allowEdit) {\r
            <button\r
              type="button"\r
              class="btn btn-primary"\r
              (click)="onAddDepartment()"\r
            >\r
              <i class="fas fa-plus me-2"></i>\r
              {{ i18n.t('department.addFirstDepartment') }}\r
            </button>\r
          }\r
        </div>\r
      }\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/departments/department-tree/department-tree.component.css */\n.department-tree {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.tree-controls {\n  padding: 1rem;\n  border-bottom: 1px solid #e9ecef;\n  background-color: #f8f9fa;\n  border-radius: 8px 8px 0 0;\n}\n.tree-container {\n  max-height: 600px;\n  overflow-y: auto;\n}\n.tree-node {\n  border-bottom: 1px solid #f8f9fa;\n  transition: all 0.2s ease;\n}\n.tree-node:hover {\n  background-color: #f8f9fa;\n}\n.tree-node.selected {\n  background-color: #e3f2fd;\n  border-left: 4px solid #2196f3;\n}\n.tree-node.inactive {\n  opacity: 0.6;\n}\n.node-content {\n  cursor: pointer;\n  position: relative;\n  min-height: 48px;\n}\n.expand-btn {\n  width: 24px;\n  height: 24px;\n  border: none !important;\n  color: #6c757d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.expand-btn:hover {\n  color: #495057;\n  background-color: #e9ecef;\n  border-radius: 4px;\n}\n.expand-spacer {\n  width: 24px;\n  height: 24px;\n}\n.node-info {\n  min-height: 36px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.node-title {\n  font-weight: 500;\n  color: #212529;\n  line-height: 1.2;\n}\n.node-subtitle {\n  margin-top: 2px;\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n.node-meta {\n  margin-top: 2px;\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n.node-meta span {\n  display: inline-flex;\n  align-items: center;\n}\n.node-actions {\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.tree-node:hover .node-actions {\n  opacity: 1;\n}\n.node-actions .btn {\n  border: none;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.node-actions .btn:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n[dir=rtl] .tree-node.selected {\n  border-left: none;\n  border-right: 4px solid #2196f3;\n}\n[dir=rtl] .node-content {\n  flex-direction: row-reverse;\n}\n@media (max-width: 768px) {\n  .tree-controls .row > div {\n    margin-bottom: 0.5rem;\n  }\n  .node-actions {\n    opacity: 1;\n  }\n  .node-actions .btn-group {\n    flex-direction: column;\n  }\n  .node-meta span {\n    display: block;\n    margin-left: 0 !important;\n    margin-top: 2px;\n  }\n}\n.tree-container::-webkit-scrollbar {\n  width: 8px;\n}\n.tree-container::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 4px;\n}\n.tree-container::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 4px;\n}\n.tree-container::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.tree-node {\n  animation: fadeIn 0.3s ease-out;\n}\n.spinner-border {\n  color: #2196f3;\n}\n.text-muted i {\n  color: #adb5bd !important;\n}\n.badge {\n  font-size: 0.65rem;\n  padding: 0.25rem 0.5rem;\n}\n.btn-outline-success:hover {\n  transform: translateY(-1px);\n}\n.btn-outline-primary:hover {\n  transform: translateY(-1px);\n}\n.btn-outline-danger:hover {\n  transform: translateY(-1px);\n}\n/*# sourceMappingURL=department-tree.component.css.map */\n"] }]
  }], null, { selectedBranchId: [{
    type: Input
  }], allowSelection: [{
    type: Input
  }], allowEdit: [{
    type: Input
  }], allowDelete: [{
    type: Input
  }], showControls: [{
    type: Input
  }], departmentSelected: [{
    type: Output
  }], departmentView: [{
    type: Output
  }], departmentEdit: [{
    type: Output
  }], departmentDelete: [{
    type: Output
  }], departmentAdd: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DepartmentTreeComponent, { className: "DepartmentTreeComponent", filePath: "src/app/pages/departments/department-tree/department-tree.component.ts", lineNumber: 17 });
})();

// src/app/pages/departments/department-info-panel/department-info-panel.component.ts
function DepartmentInfoPanelComponent_Conditional_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedDepartment.description, " ");
  }
}
__name(DepartmentInfoPanelComponent_Conditional_0_Conditional_16_Template, "DepartmentInfoPanelComponent_Conditional_0_Conditional_16_Template");
function DepartmentInfoPanelComponent_Conditional_0_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "small", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("department.manager"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.selectedDepartment.managerName);
  }
}
__name(DepartmentInfoPanelComponent_Conditional_0_Conditional_19_Template, "DepartmentInfoPanelComponent_Conditional_0_Conditional_19_Template");
function DepartmentInfoPanelComponent_Conditional_0_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "small", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("department.location"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.selectedDepartment.location);
  }
}
__name(DepartmentInfoPanelComponent_Conditional_0_Conditional_26_Template, "DepartmentInfoPanelComponent_Conditional_0_Conditional_26_Template");
function DepartmentInfoPanelComponent_Conditional_0_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentInfoPanelComponent_Conditional_0_button_34_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onDepartmentView());
    }, "DepartmentInfoPanelComponent_Conditional_0_button_34_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.view"), " ");
  }
}
__name(DepartmentInfoPanelComponent_Conditional_0_button_34_Template, "DepartmentInfoPanelComponent_Conditional_0_button_34_Template");
function DepartmentInfoPanelComponent_Conditional_0_button_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentInfoPanelComponent_Conditional_0_button_35_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onDepartmentEdit());
    }, "DepartmentInfoPanelComponent_Conditional_0_button_35_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.edit"), " ");
  }
}
__name(DepartmentInfoPanelComponent_Conditional_0_button_35_Template, "DepartmentInfoPanelComponent_Conditional_0_button_35_Template");
function DepartmentInfoPanelComponent_Conditional_0_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentInfoPanelComponent_Conditional_0_button_36_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onDepartmentDelete());
    }, "DepartmentInfoPanelComponent_Conditional_0_button_36_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.selectedDepartment.employeeCount > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.delete"), " ");
  }
}
__name(DepartmentInfoPanelComponent_Conditional_0_button_36_Template, "DepartmentInfoPanelComponent_Conditional_0_button_36_Template");
function DepartmentInfoPanelComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div");
    \u0275\u0275element(5, "i", 4);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 5);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentInfoPanelComponent_Conditional_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClosePanel());
    }, "DepartmentInfoPanelComponent_Conditional_0_Template_button_click_7_listener"));
    \u0275\u0275element(8, "i", 6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 7)(10, "div", 8)(11, "div", 9)(12, "h6", 10);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 11);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, DepartmentInfoPanelComponent_Conditional_0_Conditional_16_Template, 2, 1, "p", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 9)(18, "div", 13);
    \u0275\u0275conditionalCreate(19, DepartmentInfoPanelComponent_Conditional_0_Conditional_19_Template, 6, 2, "div", 14);
    \u0275\u0275elementStart(20, "div", 14)(21, "small", 15);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "br");
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(26, DepartmentInfoPanelComponent_Conditional_0_Conditional_26_Template, 6, 2, "div", 14);
    \u0275\u0275elementStart(27, "div", 14)(28, "small", 15);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "br")(31, "app-status-badge", 16);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "div", 17)(33, "div", 18);
    \u0275\u0275template(34, DepartmentInfoPanelComponent_Conditional_0_button_34_Template, 3, 1, "button", 19)(35, DepartmentInfoPanelComponent_Conditional_0_button_35_Template, 3, 1, "button", 20)(36, DepartmentInfoPanelComponent_Conditional_0_button_36_Template, 3, 2, "button", 21);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("department.selectedDepartment"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.selectedDepartment.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedDepartment.code);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedDepartment.description ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.selectedDepartment.managerName ? 19 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.employees"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.selectedDepartment.employeeCount || 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedDepartment.location ? 26 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.status"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r1.selectedDepartment.isActive ? "active" : "inactive")("label", ctx_r1.selectedDepartment.isActive ? ctx_r1.i18n.t("common.active") : ctx_r1.i18n.t("common.inactive"))("showIcon", true);
    \u0275\u0275advance(3);
    \u0275\u0275property("appHasPermission", ctx_r1.PERMISSIONS.DEPARTMENT_READ);
    \u0275\u0275advance();
    \u0275\u0275property("appHasPermission", ctx_r1.PERMISSIONS.DEPARTMENT_UPDATE);
    \u0275\u0275advance();
    \u0275\u0275property("appHasPermission", ctx_r1.PERMISSIONS.DEPARTMENT_DELETE);
  }
}
__name(DepartmentInfoPanelComponent_Conditional_0_Template, "DepartmentInfoPanelComponent_Conditional_0_Template");
var _DepartmentInfoPanelComponent = class _DepartmentInfoPanelComponent {
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  selectedDepartment = null;
  departmentView = new EventEmitter();
  departmentEdit = new EventEmitter();
  departmentDelete = new EventEmitter();
  closePanel = new EventEmitter();
  // Permission constants for use in template
  PERMISSIONS = {
    DEPARTMENT_READ: `${PermissionResources.DEPARTMENT}.${PermissionActions.READ}`,
    DEPARTMENT_UPDATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.UPDATE}`,
    DEPARTMENT_DELETE: `${PermissionResources.DEPARTMENT}.${PermissionActions.DELETE}`
  };
  onDepartmentView() {
    if (this.selectedDepartment) {
      this.departmentView.emit(this.selectedDepartment);
    }
  }
  onDepartmentEdit() {
    if (this.selectedDepartment) {
      this.departmentEdit.emit(this.selectedDepartment);
    }
  }
  onDepartmentDelete() {
    if (this.selectedDepartment) {
      this.departmentDelete.emit(this.selectedDepartment);
    }
  }
  onClosePanel() {
    this.closePanel.emit();
  }
};
__name(_DepartmentInfoPanelComponent, "DepartmentInfoPanelComponent");
__publicField(_DepartmentInfoPanelComponent, "\u0275fac", /* @__PURE__ */ __name(function DepartmentInfoPanelComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DepartmentInfoPanelComponent)();
}, "DepartmentInfoPanelComponent_Factory"));
__publicField(_DepartmentInfoPanelComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DepartmentInfoPanelComponent, selectors: [["app-department-info-panel"]], inputs: { selectedDepartment: "selectedDepartment" }, outputs: { departmentView: "departmentView", departmentEdit: "departmentEdit", departmentDelete: "departmentDelete", closePanel: "closePanel" }, decls: 1, vars: 1, consts: [[1, "selected-info"], [1, "card", "border-primary"], [1, "card-header", "bg-primary", "text-white"], [1, "d-flex", "align-items-center", "justify-content-between"], [1, "fas", "fa-info-circle", "me-2"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-light", 3, "click"], [1, "fas", "fa-times"], [1, "card-body"], [1, "row"], [1, "col-md-6"], [1, "fw-bold"], [1, "text-muted", "mb-2"], [1, "small", "mb-2"], [1, "row", "g-2"], [1, "col-6"], [1, "text-muted"], [3, "status", "label", "showIcon"], [1, "mt-3"], [1, "btn-group", "btn-group-sm"], ["type", "button", "class", "btn btn-outline-primary", 3, "click", 4, "appHasPermission"], ["type", "button", "class", "btn btn-outline-secondary", 3, "click", 4, "appHasPermission"], ["type", "button", "class", "btn btn-outline-danger", 3, "disabled", "click", 4, "appHasPermission"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], [1, "fas", "fa-eye", "me-1"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fas", "fa-edit", "me-1"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-trash", "me-1"]], template: /* @__PURE__ */ __name(function DepartmentInfoPanelComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DepartmentInfoPanelComponent_Conditional_0_Template, 37, 15, "div", 0);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.selectedDepartment ? 0 : -1);
  }
}, "DepartmentInfoPanelComponent_Template"), dependencies: [
  HasPermissionDirective,
  StatusBadgeComponent
], styles: ["\n\n.selected-info[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\n.card[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n  padding: 1rem 1.25rem;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.fw-bold[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 0.5rem;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.small[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.4;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 0.375rem;\n}\n.badge.bg-success[_ngcontent-%COMP%] {\n  background-color: #198754 !important;\n}\n.badge.bg-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  border-radius: 0.25rem;\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n  color: white;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: white;\n}\n.btn-outline-danger[_ngcontent-%COMP%] {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-outline-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n}\n.btn-outline-danger[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-outline-light[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  color: white;\n}\n.btn-outline-light[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n  border-color: white;\n  color: white;\n}\n@media (max-width: 768px) {\n  .card-body[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .col-md-6[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n  .btn-group-sm[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n  .btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    border-radius: 0.375rem !important;\n    margin-bottom: 0.25rem;\n    width: 100%;\n  }\n  .btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 0;\n  }\n}\n/*# sourceMappingURL=department-info-panel.component.css.map */"] }));
var DepartmentInfoPanelComponent = _DepartmentInfoPanelComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DepartmentInfoPanelComponent, [{
    type: Component,
    args: [{ selector: "app-department-info-panel", standalone: true, imports: [
      HasPermissionDirective,
      StatusBadgeComponent
    ], template: `<!-- Selected Department Info Panel -->\r
@if (selectedDepartment) {\r
  <div class="selected-info">\r
    <div class="card border-primary">\r
      <div class="card-header bg-primary text-white">\r
        <div class="d-flex align-items-center justify-content-between">\r
          <div>\r
            <i class="fas fa-info-circle me-2"></i>\r
            {{ i18n.t('department.selectedDepartment') }}\r
          </div>\r
          <button\r
            type="button"\r
            class="btn btn-sm btn-outline-light"\r
            (click)="onClosePanel()"\r
          >\r
            <i class="fas fa-times"></i>\r
          </button>\r
        </div>\r
      </div>\r
      <div class="card-body">\r
        <div class="row">\r
          <div class="col-md-6">\r
            <h6 class="fw-bold">{{ selectedDepartment.name }}</h6>\r
            <p class="text-muted mb-2">{{ selectedDepartment.code }}</p>\r
            @if (selectedDepartment.description) {\r
              <p class="small mb-2">\r
                {{ selectedDepartment.description }}\r
              </p>\r
            }\r
          </div>\r
          <div class="col-md-6">\r
            <div class="row g-2">\r
              @if (selectedDepartment.managerName) {\r
                <div class="col-6">\r
                  <small class="text-muted">{{ i18n.t('department.manager') }}</small><br>\r
                  <strong>{{ selectedDepartment.managerName }}</strong>\r
                </div>\r
              }\r
              <div class="col-6">\r
                <small class="text-muted">{{ i18n.t('common.employees') }}</small><br>\r
                <strong>{{ selectedDepartment.employeeCount || 0 }}</strong>\r
              </div>\r
              @if (selectedDepartment.location) {\r
                <div class="col-6">\r
                  <small class="text-muted">{{ i18n.t('department.location') }}</small><br>\r
                  <strong>{{ selectedDepartment.location }}</strong>\r
                </div>\r
              }\r
              <div class="col-6">\r
                <small class="text-muted">{{ i18n.t('common.status') }}</small><br>\r
                <app-status-badge\r
                  [status]="selectedDepartment.isActive ? 'active' : 'inactive'"\r
                  [label]="selectedDepartment.isActive ? i18n.t('common.active') : i18n.t('common.inactive')"\r
                  [showIcon]="true">\r
                </app-status-badge>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="mt-3">\r
          <div class="btn-group btn-group-sm">\r
            <button\r
              *appHasPermission="PERMISSIONS.DEPARTMENT_READ"\r
              type="button"\r
              class="btn btn-outline-primary"\r
              (click)="onDepartmentView()"\r
            >\r
              <i class="fas fa-eye me-1"></i>\r
              {{ i18n.t('common.view') }}\r
            </button>\r
            <button\r
              *appHasPermission="PERMISSIONS.DEPARTMENT_UPDATE"\r
              type="button"\r
              class="btn btn-outline-secondary"\r
              (click)="onDepartmentEdit()"\r
            >\r
              <i class="fas fa-edit me-1"></i>\r
              {{ i18n.t('common.edit') }}\r
            </button>\r
            <button\r
              *appHasPermission="PERMISSIONS.DEPARTMENT_DELETE"\r
              type="button"\r
              class="btn btn-outline-danger"\r
              (click)="onDepartmentDelete()"\r
              [disabled]="selectedDepartment.employeeCount! > 0"\r
            >\r
              <i class="fas fa-trash me-1"></i>\r
              {{ i18n.t('common.delete') }}\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
}`, styles: ["/* src/app/pages/departments/department-info-panel/department-info-panel.component.css */\n.selected-info {\n  margin-top: 1.5rem;\n}\n.card {\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.card-header {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n  padding: 1rem 1.25rem;\n}\n.card-body {\n  padding: 1.5rem;\n}\n.fw-bold {\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 0.5rem;\n}\n.text-muted {\n  color: #6c757d !important;\n}\n.small {\n  font-size: 0.875rem;\n  line-height: 1.4;\n}\n.badge {\n  font-size: 0.75rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 0.375rem;\n}\n.badge.bg-success {\n  background-color: #198754 !important;\n}\n.badge.bg-secondary {\n  background-color: #6c757d !important;\n}\n.btn-group-sm .btn {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  border-radius: 0.25rem;\n}\n.btn-outline-primary {\n  color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-outline-primary:hover {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n  color: white;\n}\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: white;\n}\n.btn-outline-danger {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-outline-danger:hover:not(:disabled) {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n}\n.btn-outline-danger:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-outline-light {\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  color: white;\n}\n.btn-outline-light:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n  border-color: white;\n  color: white;\n}\n@media (max-width: 768px) {\n  .card-body .row .col-md-6 {\n    margin-bottom: 1rem;\n  }\n  .btn-group-sm {\n    flex-direction: column;\n    width: 100%;\n  }\n  .btn-group-sm .btn {\n    border-radius: 0.375rem !important;\n    margin-bottom: 0.25rem;\n    width: 100%;\n  }\n  .btn-group-sm .btn:last-child {\n    margin-bottom: 0;\n  }\n}\n/*# sourceMappingURL=department-info-panel.component.css.map */\n"] }]
  }], null, { selectedDepartment: [{
    type: Input
  }], departmentView: [{
    type: Output
  }], departmentEdit: [{
    type: Output
  }], departmentDelete: [{
    type: Output
  }], closePanel: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DepartmentInfoPanelComponent, { className: "DepartmentInfoPanelComponent", filePath: "src/app/pages/departments/department-info-panel/department-info-panel.component.ts", lineNumber: 20 });
})();

// src/app/pages/departments/departments.component.ts
function DepartmentsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 14);
    \u0275\u0275element(2, "i", 15);
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "br");
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("department.allDepartments") || "All Departments");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("department.showingAllDepartments") || "Showing departments from all branches. Select a specific branch to filter.");
  }
}
__name(DepartmentsComponent_Conditional_13_Template, "DepartmentsComponent_Conditional_13_Template");
function DepartmentsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-department-table", 16);
    \u0275\u0275listener("departmentSelected", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_14_Template_app_department_table_departmentSelected_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentSelected($event));
    }, "DepartmentsComponent_Conditional_14_Template_app_department_table_departmentSelected_0_listener"))("departmentView", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_14_Template_app_department_table_departmentView_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentView($event));
    }, "DepartmentsComponent_Conditional_14_Template_app_department_table_departmentView_0_listener"))("departmentEdit", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_14_Template_app_department_table_departmentEdit_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentEdit($event));
    }, "DepartmentsComponent_Conditional_14_Template_app_department_table_departmentEdit_0_listener"))("departmentDelete", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_14_Template_app_department_table_departmentDelete_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentDelete($event));
    }, "DepartmentsComponent_Conditional_14_Template_app_department_table_departmentDelete_0_listener"))("departmentAdd", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_14_Template_app_department_table_departmentAdd_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentAdd());
    }, "DepartmentsComponent_Conditional_14_Template_app_department_table_departmentAdd_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("selectedBranchId", (tmp_1_0 = ctx_r0.selectedBranch()) == null ? null : tmp_1_0.id)("allowSelection", true)("allowEdit", true)("allowDelete", true)("showControls", true);
  }
}
__name(DepartmentsComponent_Conditional_14_Template, "DepartmentsComponent_Conditional_14_Template");
function DepartmentsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-department-tree", 16);
    \u0275\u0275listener("departmentSelected", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentSelected_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentSelected($event));
    }, "DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentSelected_0_listener"))("departmentView", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentView_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentView($event));
    }, "DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentView_0_listener"))("departmentEdit", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentEdit_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentEdit($event));
    }, "DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentEdit_0_listener"))("departmentDelete", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentDelete_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentDelete($event));
    }, "DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentDelete_0_listener"))("departmentAdd", /* @__PURE__ */ __name(function DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentAdd_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentAdd($event));
    }, "DepartmentsComponent_Conditional_15_Template_app_department_tree_departmentAdd_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("selectedBranchId", (tmp_1_0 = ctx_r0.selectedBranch()) == null ? null : tmp_1_0.id)("allowSelection", true)("allowEdit", true)("allowDelete", true)("showControls", true);
  }
}
__name(DepartmentsComponent_Conditional_15_Template, "DepartmentsComponent_Conditional_15_Template");
var _DepartmentsComponent = class _DepartmentsComponent {
  i18n = inject(I18nService);
  departmentsService = inject(DepartmentsService);
  confirmationService = inject(ConfirmationService);
  permissionService = inject(PermissionService);
  router = inject(Router);
  // Permission constants for use in template
  PERMISSIONS = {
    DEPARTMENT_CREATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.CREATE}`,
    DEPARTMENT_READ: `${PermissionResources.DEPARTMENT}.${PermissionActions.READ}`,
    DEPARTMENT_UPDATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.UPDATE}`,
    DEPARTMENT_DELETE: `${PermissionResources.DEPARTMENT}.${PermissionActions.DELETE}`,
    DEPARTMENT_MANAGE: `${PermissionResources.DEPARTMENT}.${PermissionActions.MANAGE}`
  };
  // Signals
  viewMode = signal("table", ...ngDevMode ? [{ debugName: "viewMode" }] : []);
  selectedBranch = signal(null, ...ngDevMode ? [{ debugName: "selectedBranch" }] : []);
  selectedDepartment = signal(null, ...ngDevMode ? [{ debugName: "selectedDepartment" }] : []);
  branchesLoading = signal(false, ...ngDevMode ? [{ debugName: "branchesLoading" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  currentFilter = {};
  ngOnInit() {
  }
  onViewModeChange(mode) {
    this.viewMode.set(mode);
  }
  onBranchChange(branchId) {
    if (!branchId || branchId === 0) {
      this.selectedBranch.set(null);
      return;
    }
    const branch = this.branches().find((b) => b.id === branchId);
    this.selectedBranch.set(branch || null);
  }
  onBranchSelectionChange(branchIdStr) {
    const branchId = branchIdStr ? parseInt(branchIdStr) : 0;
    this.onBranchChange(branchId);
  }
  onCloseInfoPanel() {
    this.selectedDepartment.set(null);
  }
  onDepartmentSelected(department) {
    this.selectedDepartment.set(department);
  }
  onDepartmentView(department) {
    this.router.navigate(["/departments", department.id, "view"]);
  }
  onDepartmentEdit(department) {
    this.router.navigate(["/departments", department.id, "edit"]);
  }
  onDepartmentDelete(department) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: "Delete Department",
        message: `Are you sure you want to delete "${department.name}"? This action cannot be undone.`,
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.deleteDepartment(department.id);
      }
    });
  }
  onDepartmentAdd(data) {
    if (data?.parentId) {
      this.router.navigate(["/departments/create"], { queryParams: { parentId: data.parentId } });
    } else {
      this.router.navigate(["/departments/create"]);
    }
  }
  // Unified filter event handlers
  onSearchChange(searchTerm) {
    this.currentFilter = __spreadProps(__spreadValues({}, this.currentFilter), { search: searchTerm });
  }
  onFiltersChange(filters) {
    this.currentFilter = __spreadValues({}, filters);
    if (filters.branchId) {
      this.onBranchChange(parseInt(filters.branchId));
    } else {
      this.selectedBranch.set(null);
    }
  }
  onRefreshData() {
    this.currentFilter = {};
    this.selectedBranch.set(null);
    this.refreshData();
  }
  deleteDepartment(id) {
    return __async(this, null, function* () {
      try {
        yield this.departmentsService.deleteDepartment(id).toPromise();
        this.refreshData();
      } catch (error) {
        console.error("Failed to delete department:", error);
      }
    });
  }
  refreshData() {
    window.location.reload();
  }
};
__name(_DepartmentsComponent, "DepartmentsComponent");
__publicField(_DepartmentsComponent, "\u0275fac", /* @__PURE__ */ __name(function DepartmentsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DepartmentsComponent)();
}, "DepartmentsComponent_Factory"));
__publicField(_DepartmentsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DepartmentsComponent, selectors: [["app-departments"]], decls: 17, vars: 10, consts: [[1, "app-list-page"], [3, "title"], ["moduleName", "departments", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], ["role", "group", 1, "btn-group"], ["type", "radio", "name", "viewMode", "id", "tableMode", 1, "btn-check", 3, "change", "checked"], ["for", "tableMode", 1, "btn", "btn-outline-primary"], [1, "fas", "fa-table", "me-2"], ["type", "radio", "name", "viewMode", "id", "treeMode", 1, "btn-check", 3, "change", "checked"], ["for", "treeMode", 1, "btn", "btn-outline-primary"], [1, "fas", "fa-sitemap", "me-2"], [1, "alert", "alert-info"], [3, "selectedBranchId", "allowSelection", "allowEdit", "allowDelete", "showControls"], [3, "departmentView", "departmentEdit", "departmentDelete", "closePanel", "selectedDepartment"], [1, "d-flex", "align-items-center"], [1, "fas", "fa-info-circle", "me-3"], [3, "departmentSelected", "departmentView", "departmentEdit", "departmentDelete", "departmentAdd", "selectedBranchId", "allowSelection", "allowEdit", "allowDelete", "showControls"]], template: /* @__PURE__ */ __name(function DepartmentsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function DepartmentsComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchChange($event);
    }, "DepartmentsComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function DepartmentsComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "DepartmentsComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function DepartmentsComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.onDepartmentAdd();
    }, "DepartmentsComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function DepartmentsComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "DepartmentsComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "input", 5);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DepartmentsComponent_Template_input_change_5_listener() {
      return ctx.onViewModeChange("table");
    }, "DepartmentsComponent_Template_input_change_5_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label", 6);
    \u0275\u0275element(7, "i", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 8);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DepartmentsComponent_Template_input_change_9_listener() {
      return ctx.onViewModeChange("tree");
    }, "DepartmentsComponent_Template_input_change_9_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label", 9);
    \u0275\u0275element(11, "i", 10);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(13, DepartmentsComponent_Conditional_13_Template, 9, 2, "div", 11);
    \u0275\u0275conditionalCreate(14, DepartmentsComponent_Conditional_14_Template, 1, 5, "app-department-table", 12);
    \u0275\u0275conditionalCreate(15, DepartmentsComponent_Conditional_15_Template, 1, 5, "app-department-tree", 12);
    \u0275\u0275elementStart(16, "app-department-info-panel", 13);
    \u0275\u0275listener("departmentView", /* @__PURE__ */ __name(function DepartmentsComponent_Template_app_department_info_panel_departmentView_16_listener($event) {
      return ctx.onDepartmentView($event);
    }, "DepartmentsComponent_Template_app_department_info_panel_departmentView_16_listener"))("departmentEdit", /* @__PURE__ */ __name(function DepartmentsComponent_Template_app_department_info_panel_departmentEdit_16_listener($event) {
      return ctx.onDepartmentEdit($event);
    }, "DepartmentsComponent_Template_app_department_info_panel_departmentEdit_16_listener"))("departmentDelete", /* @__PURE__ */ __name(function DepartmentsComponent_Template_app_department_info_panel_departmentDelete_16_listener($event) {
      return ctx.onDepartmentDelete($event);
    }, "DepartmentsComponent_Template_app_department_info_panel_departmentDelete_16_listener"))("closePanel", /* @__PURE__ */ __name(function DepartmentsComponent_Template_app_department_info_panel_closePanel_16_listener() {
      return ctx.onCloseInfoPanel();
    }, "DepartmentsComponent_Template_app_department_info_panel_closePanel_16_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("department.departments"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.branchesLoading());
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx.viewMode() === "table");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("common.table") || "Table", " ");
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx.viewMode() === "tree");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("common.tree") || "Tree", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.selectedBranch() && !ctx.branchesLoading() ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.viewMode() === "table" ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.viewMode() === "tree" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("selectedDepartment", ctx.selectedDepartment());
  }
}, "DepartmentsComponent_Template"), dependencies: [
  FormsModule,
  DepartmentTableComponent,
  DepartmentTreeComponent,
  UnifiedFilterComponent,
  DepartmentInfoPanelComponent,
  PageHeaderComponent
], styles: ["\n\n.selected-info[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 50%;\n  right: 2rem;\n  transform: translateY(-50%);\n  width: 350px;\n  z-index: 1000;\n}\n@media (max-width: 1200px) {\n  .selected-info[_ngcontent-%COMP%] {\n    position: relative;\n    top: auto;\n    right: auto;\n    transform: none;\n    width: 100%;\n    margin-top: 2rem;\n  }\n}\n/*# sourceMappingURL=departments.component.css.map */"] }));
var DepartmentsComponent = _DepartmentsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DepartmentsComponent, [{
    type: Component,
    args: [{ selector: "app-departments", standalone: true, imports: [
      FormsModule,
      DepartmentTableComponent,
      DepartmentTreeComponent,
      UnifiedFilterComponent,
      DepartmentInfoPanelComponent,
      PageHeaderComponent
    ], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header [title]="i18n.t('department.departments')">\r
  </app-page-header>\r
\r
  <!-- Filters Component -->\r
  <app-unified-filter moduleName="departments" [refreshing]="branchesLoading()" (searchChange)="onSearchChange($event)"\r
    (filtersChange)="onFiltersChange($event)" (add)="onDepartmentAdd()" (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- View Mode Toggle -->\r
  <div class="d-flex justify-content-between align-items-center mb-3">\r
    <div class="btn-group" role="group">\r
      <input type="radio" class="btn-check" name="viewMode" id="tableMode" [checked]="viewMode() === 'table'"\r
        (change)="onViewModeChange('table')">\r
      <label class="btn btn-outline-primary" for="tableMode">\r
        <i class="fas fa-table me-2"></i>{{ i18n.t('common.table') || 'Table' }}\r
      </label>\r
\r
      <input type="radio" class="btn-check" name="viewMode" id="treeMode" [checked]="viewMode() === 'tree'"\r
        (change)="onViewModeChange('tree')">\r
      <label class="btn btn-outline-primary" for="treeMode">\r
        <i class="fas fa-sitemap me-2"></i>{{ i18n.t('common.tree') || 'Tree' }}\r
      </label>\r
    </div>\r
  </div>\r
\r
  <!-- Departments Content Card -->\r
\r
  <!-- Info message when no branch is selected -->\r
  @if (!selectedBranch() && !branchesLoading()) {\r
  <div class="alert alert-info">\r
    <div class="d-flex align-items-center">\r
      <i class="fas fa-info-circle me-3"></i>\r
      <div>\r
        <strong>{{ i18n.t('department.allDepartments') || 'All Departments' }}</strong><br>\r
        <small>{{ i18n.t('department.showingAllDepartments') || 'Showing departments from all branches. Select a\r
          specific branch to filter.' }}</small>\r
      </div>\r
    </div>\r
  </div>\r
  }\r
\r
  <!-- Table View -->\r
  @if (viewMode() === 'table') {\r
  <app-department-table [selectedBranchId]="selectedBranch()?.id" [allowSelection]="true" [allowEdit]="true"\r
    [allowDelete]="true" [showControls]="true" (departmentSelected)="onDepartmentSelected($event)"\r
    (departmentView)="onDepartmentView($event)" (departmentEdit)="onDepartmentEdit($event)"\r
    (departmentDelete)="onDepartmentDelete($event)" (departmentAdd)="onDepartmentAdd()"></app-department-table>\r
  }\r
\r
  <!-- Tree View -->\r
  @if (viewMode() === 'tree') {\r
  <app-department-tree [selectedBranchId]="selectedBranch()?.id" [allowSelection]="true" [allowEdit]="true"\r
    [allowDelete]="true" [showControls]="true" (departmentSelected)="onDepartmentSelected($event)"\r
    (departmentView)="onDepartmentView($event)" (departmentEdit)="onDepartmentEdit($event)"\r
    (departmentDelete)="onDepartmentDelete($event)" (departmentAdd)="onDepartmentAdd($event)"></app-department-tree>\r
  }\r
\r
\r
  <!-- Department Info Panel Component -->\r
  <app-department-info-panel [selectedDepartment]="selectedDepartment()" (departmentView)="onDepartmentView($event)"\r
    (departmentEdit)="onDepartmentEdit($event)" (departmentDelete)="onDepartmentDelete($event)"\r
    (closePanel)="onCloseInfoPanel()"></app-department-info-panel>\r
</div>`, styles: ["/* src/app/pages/departments/departments.component.css */\n.selected-info {\n  position: fixed;\n  top: 50%;\n  right: 2rem;\n  transform: translateY(-50%);\n  width: 350px;\n  z-index: 1000;\n}\n@media (max-width: 1200px) {\n  .selected-info {\n    position: relative;\n    top: auto;\n    right: auto;\n    transform: none;\n    width: 100%;\n    margin-top: 2rem;\n  }\n}\n/*# sourceMappingURL=departments.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DepartmentsComponent, { className: "DepartmentsComponent", filePath: "src/app/pages/departments/departments.component.ts", lineNumber: 35 });
})();
export {
  DepartmentsComponent
};
//# sourceMappingURL=chunk-HHNOOVO3.js.map
