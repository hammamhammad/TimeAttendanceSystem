import {
  ShiftAssignmentService
} from "./chunk-PE34T3IU.js";
import {
  ShiftAssignmentStatus,
  ShiftAssignmentType
} from "./chunk-ICLZUHFB.js";
import {
  SearchableSelectComponent
} from "./chunk-YVOT2QSR.js";
import {
  ShiftsService
} from "./chunk-BDBUQZLA.js";
import {
  BranchesService
} from "./chunk-GHUXGLMI.js";
import {
  DepartmentsService
} from "./chunk-ZEREPA2X.js";
import {
  EmployeesService
} from "./chunk-WMEU4YDP.js";
import {
  HasPermissionDirective
} from "./chunk-4AGVDNDW.js";
import {
  ModalWrapperComponent
} from "./chunk-ND6JPRQH.js";
import {
  UnifiedFilterComponent
} from "./chunk-HAMFYSM6.js";
import "./chunk-3AZFD5ID.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-T6ZZRW4R.js";
import {
  PermissionActions,
  PermissionResources,
  PermissionService
} from "./chunk-DKGIYIS4.js";
import {
  PageHeaderComponent
} from "./chunk-G7MX4ADH.js";
import "./chunk-IL4NCC2P.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  NgClass,
  Router,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate7
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/shifts/assign-shifts/assign-shifts.component.ts
var _c0 = /* @__PURE__ */ __name(() => ({ standalone: true }), "_c0");
var _c1 = /* @__PURE__ */ __name(() => [], "_c1");
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function AssignShiftsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 25)(2, "span", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
  }
}
__name(AssignShiftsComponent_Conditional_5_Template, "AssignShiftsComponent_Conditional_5_Template");
function AssignShiftsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(AssignShiftsComponent_Conditional_6_Template, "AssignShiftsComponent_Conditional_6_Template");
function AssignShiftsComponent_Conditional_7_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.actions"));
  }
}
__name(AssignShiftsComponent_Conditional_7_Conditional_18_Template, "AssignShiftsComponent_Conditional_7_Conditional_18_Template");
function AssignShiftsComponent_Conditional_7_For_21_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const assignment_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t("employees.employeeNumber"), ": ", assignment_r2.employeeNumber, " ");
  }
}
__name(AssignShiftsComponent_Conditional_7_For_21_Conditional_14_Template, "AssignShiftsComponent_Conditional_7_For_21_Conditional_14_Template");
function AssignShiftsComponent_Conditional_7_For_21_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const assignment_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t("branches.code"), ": ", assignment_r2.branchCode, " ");
  }
}
__name(AssignShiftsComponent_Conditional_7_For_21_Conditional_15_Template, "AssignShiftsComponent_Conditional_7_For_21_Conditional_15_Template");
function AssignShiftsComponent_Conditional_7_For_21_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const assignment_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.formatDate(assignment_r2.endDate));
  }
}
__name(AssignShiftsComponent_Conditional_7_For_21_Conditional_19_Template, "AssignShiftsComponent_Conditional_7_For_21_Conditional_19_Template");
function AssignShiftsComponent_Conditional_7_For_21_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.indefinite"));
  }
}
__name(AssignShiftsComponent_Conditional_7_For_21_Conditional_20_Template, "AssignShiftsComponent_Conditional_7_For_21_Conditional_20_Template");
function AssignShiftsComponent_Conditional_7_For_21_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "div", 33)(2, "button", 34);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_7_For_21_Conditional_27_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const assignment_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.editAssignment(assignment_r2));
    }, "AssignShiftsComponent_Conditional_7_For_21_Conditional_27_Template_button_click_2_listener"));
    \u0275\u0275element(3, "i", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 36);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_7_For_21_Conditional_27_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const assignment_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.deleteAssignment(assignment_r2));
    }, "AssignShiftsComponent_Conditional_7_For_21_Conditional_27_Template_button_click_4_listener"));
    \u0275\u0275element(5, "i", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("common.edit"));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("common.delete"));
  }
}
__name(AssignShiftsComponent_Conditional_7_For_21_Conditional_27_Template, "AssignShiftsComponent_Conditional_7_For_21_Conditional_27_Template");
function AssignShiftsComponent_Conditional_7_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td")(8, "span", 30);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td")(11, "div")(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, AssignShiftsComponent_Conditional_7_For_21_Conditional_14_Template, 2, 2, "small", 29);
    \u0275\u0275conditionalCreate(15, AssignShiftsComponent_Conditional_7_For_21_Conditional_15_Template, 2, 2, "small", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275conditionalCreate(19, AssignShiftsComponent_Conditional_7_For_21_Conditional_19_Template, 2, 1, "span");
    \u0275\u0275conditionalCreate(20, AssignShiftsComponent_Conditional_7_For_21_Conditional_20_Template, 2, 1, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td")(22, "span", 32);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "td")(25, "span", 30);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, AssignShiftsComponent_Conditional_7_For_21_Conditional_27_Template, 6, 2, "td");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const assignment_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("table-success", ctx_r0.isCurrentlyActive(assignment_r2));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(assignment_r2.shiftName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(assignment_r2.shiftType);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(assignment_r2.assignmentTypeDisplay);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(assignment_r2.targetDisplayName);
    \u0275\u0275advance();
    \u0275\u0275conditional(assignment_r2.employeeNumber ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(assignment_r2.branchCode ? 15 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(assignment_r2.effectiveDate));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(assignment_r2.endDate ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!assignment_r2.endDate ? 20 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r0.getStatusBadgeClass(assignment_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", assignment_r2.statusDisplay, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(assignment_r2.priority);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.PERMISSIONS.SHIFT_ASSIGNMENT_MANAGE ? 27 : -1);
  }
}
__name(AssignShiftsComponent_Conditional_7_For_21_Template, "AssignShiftsComponent_Conditional_7_For_21_Template");
function AssignShiftsComponent_Conditional_7_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", 8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("shifts.assignments.noAssignments"), " ");
  }
}
__name(AssignShiftsComponent_Conditional_7_Conditional_22_Template, "AssignShiftsComponent_Conditional_7_Conditional_22_Template");
function AssignShiftsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "table", 27)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, AssignShiftsComponent_Conditional_7_Conditional_18_Template, 2, 1, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275repeaterCreate(20, AssignShiftsComponent_Conditional_7_For_21_Template, 28, 15, "tr", 28, _forTrack0);
    \u0275\u0275conditionalCreate(22, AssignShiftsComponent_Conditional_7_Conditional_22_Template, 3, 2, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.shift"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.assignments.assignmentType"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.assignments.target"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.assignments.effectiveDate"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.assignments.endDate"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.status"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.assignments.priority"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.PERMISSIONS.SHIFT_ASSIGNMENT_MANAGE ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.assignments());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.assignments().length === 0 ? 22 : -1);
  }
}
__name(AssignShiftsComponent_Conditional_7_Template, "AssignShiftsComponent_Conditional_7_Template");
function AssignShiftsComponent_Conditional_8_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 41)(1, "a", 42);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_8_For_10_Template_a_click_1_listener() {
      const \u0275$index_151_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPageChanged(\u0275$index_151_r6 + 1));
    }, "AssignShiftsComponent_Conditional_8_For_10_Template_a_click_1_listener"));
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const \u0275$index_151_r6 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.currentPage() === \u0275$index_151_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_151_r6 + 1);
  }
}
__name(AssignShiftsComponent_Conditional_8_For_10_Template, "AssignShiftsComponent_Conditional_8_For_10_Template");
function AssignShiftsComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 8)(1, "div", 39)(2, "div")(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "ul", 40)(6, "li", 41)(7, "a", 42);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_8_Template_a_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPageChanged(ctx_r0.currentPage() - 1));
    }, "AssignShiftsComponent_Conditional_8_Template_a_click_7_listener"));
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(9, AssignShiftsComponent_Conditional_8_For_10_Template, 3, 3, "li", 43, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(11, "li", 41)(12, "a", 42);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_8_Template_a_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPageChanged(ctx_r0.currentPage() + 1));
    }, "AssignShiftsComponent_Conditional_8_Template_a_click_12_listener"));
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate7(" ", ctx_r0.i18n.t("common.showing"), " ", (ctx_r0.currentPage() - 1) * ctx_r0.pageSize() + 1, " ", ctx_r0.i18n.t("common.to"), " ", ctx_r0.Math.min(ctx_r0.currentPage() * ctx_r0.pageSize(), ctx_r0.totalCount()), " ", ctx_r0.i18n.t("common.of"), " ", ctx_r0.totalCount(), " ", ctx_r0.i18n.t("common.entries"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r0.currentPage() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.previous"), " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(13, _c1).constructor(ctx_r0.totalPages()));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r0.currentPage() === ctx_r0.totalPages());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.next"), " ");
  }
}
__name(AssignShiftsComponent_Conditional_8_Template, "AssignShiftsComponent_Conditional_8_Template");
function AssignShiftsComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "label", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "app-searchable-select", 15);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_25_Template_app_searchable_select_selectionChange_5_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEmployeeSelectionChange($event));
    }, "AssignShiftsComponent_Conditional_25_Template_app_searchable_select_selectionChange_5_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employees.employee"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.employeeSelectOptions)("ngModel", ((tmp_3_0 = ctx_r0.createForm().employeeId) == null ? null : tmp_3_0.toString()) || "")("ngModelOptions", \u0275\u0275pureFunction0(7, _c0))("placeholder", ctx_r0.i18n.t("common.select"))("searchable", true)("clearable", false);
  }
}
__name(AssignShiftsComponent_Conditional_25_Template, "AssignShiftsComponent_Conditional_25_Template");
function AssignShiftsComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "label", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "app-searchable-select", 15);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_26_Template_app_searchable_select_selectionChange_5_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDepartmentSelectionChange($event));
    }, "AssignShiftsComponent_Conditional_26_Template_app_searchable_select_selectionChange_5_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("departments.department"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.departmentSelectOptions)("ngModel", ((tmp_3_0 = ctx_r0.createForm().departmentId) == null ? null : tmp_3_0.toString()) || "")("ngModelOptions", \u0275\u0275pureFunction0(7, _c0))("placeholder", ctx_r0.i18n.t("common.select"))("searchable", true)("clearable", false);
  }
}
__name(AssignShiftsComponent_Conditional_26_Template, "AssignShiftsComponent_Conditional_26_Template");
function AssignShiftsComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "label", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "app-searchable-select", 15);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_27_Template_app_searchable_select_selectionChange_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBranchSelectionChange($event));
    }, "AssignShiftsComponent_Conditional_27_Template_app_searchable_select_selectionChange_5_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("branches.branch"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.branchSelectOptions)("ngModel", ((tmp_3_0 = ctx_r0.createForm().branchId) == null ? null : tmp_3_0.toString()) || "")("ngModelOptions", \u0275\u0275pureFunction0(7, _c0))("placeholder", ctx_r0.i18n.t("common.select"))("searchable", true)("clearable", false);
  }
}
__name(AssignShiftsComponent_Conditional_27_Template, "AssignShiftsComponent_Conditional_27_Template");
var _AssignShiftsComponent = class _AssignShiftsComponent {
  shiftAssignmentService = inject(ShiftAssignmentService);
  shiftsService = inject(ShiftsService);
  branchesService = inject(BranchesService);
  employeesService = inject(EmployeesService);
  departmentsService = inject(DepartmentsService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    SHIFT_ASSIGNMENT_CREATE: `${PermissionResources.SHIFT}.${PermissionActions.CREATE}`,
    SHIFT_ASSIGNMENT_READ: `${PermissionResources.SHIFT}.${PermissionActions.READ}`,
    SHIFT_ASSIGNMENT_UPDATE: `${PermissionResources.SHIFT}.${PermissionActions.UPDATE}`,
    SHIFT_ASSIGNMENT_DELETE: `${PermissionResources.SHIFT}.${PermissionActions.DELETE}`,
    SHIFT_ASSIGNMENT_MANAGE: `${PermissionResources.SHIFT}.${PermissionActions.MANAGE}`
  };
  // Enum references for template
  ShiftAssignmentType = ShiftAssignmentType;
  ShiftAssignmentStatus = ShiftAssignmentStatus;
  Math = Math;
  // Signals for state management
  assignments = signal([], ...ngDevMode ? [{ debugName: "assignments" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Filter signals
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  selectedAssignmentType = signal(null, ...ngDevMode ? [{ debugName: "selectedAssignmentType" }] : []);
  selectedStatus = signal(null, ...ngDevMode ? [{ debugName: "selectedStatus" }] : []);
  selectedShiftId = signal(null, ...ngDevMode ? [{ debugName: "selectedShiftId" }] : []);
  selectedEmployeeId = signal(null, ...ngDevMode ? [{ debugName: "selectedEmployeeId" }] : []);
  selectedDepartmentId = signal(null, ...ngDevMode ? [{ debugName: "selectedDepartmentId" }] : []);
  selectedBranchId = signal(null, ...ngDevMode ? [{ debugName: "selectedBranchId" }] : []);
  currentlyActiveOnly = signal(false, ...ngDevMode ? [{ debugName: "currentlyActiveOnly" }] : []);
  // Create/Edit assignment signals
  showCreateModal = signal(false, ...ngDevMode ? [{ debugName: "showCreateModal" }] : []);
  showEditModal = signal(false, ...ngDevMode ? [{ debugName: "showEditModal" }] : []);
  editingAssignment = signal(null, ...ngDevMode ? [{ debugName: "editingAssignment" }] : []);
  // Form data signals
  createForm = signal({
    shiftId: 0,
    assignmentType: ShiftAssignmentType.Employee,
    effectiveDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    status: ShiftAssignmentStatus.Active,
    priority: 10
  }, ...ngDevMode ? [{ debugName: "createForm" }] : []);
  // Options and lookup data
  assignmentOptions = signal({
    assignmentTypes: [],
    statuses: []
  }, ...ngDevMode ? [{ debugName: "assignmentOptions" }] : []);
  availableShifts = signal([], ...ngDevMode ? [{ debugName: "availableShifts" }] : []);
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  availableEmployees = signal([], ...ngDevMode ? [{ debugName: "availableEmployees" }] : []);
  availableDepartments = signal([], ...ngDevMode ? [{ debugName: "availableDepartments" }] : []);
  selectedBranchForFilter = signal(null, ...ngDevMode ? [{ debugName: "selectedBranchForFilter" }] : []);
  ngOnInit() {
    this.loadAssignments();
    this.loadOptions();
    this.loadShifts();
    this.loadBranches();
    this.loadEmployees();
    this.loadDepartments();
  }
  loadAssignments() {
    this.loading.set(true);
    this.error.set(null);
    const params = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      search: this.searchTerm() || void 0,
      assignmentType: this.selectedAssignmentType() || void 0,
      status: this.selectedStatus() || void 0,
      shiftId: this.selectedShiftId() || void 0,
      employeeId: this.selectedEmployeeId() || void 0,
      departmentId: this.selectedDepartmentId() || void 0,
      branchId: this.selectedBranchId() || void 0,
      currentlyActive: this.currentlyActiveOnly() || void 0
    };
    this.shiftAssignmentService.getShiftAssignments(params).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.assignments.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading shift assignments:", error);
        this.error.set(this.i18n.t("shifts.assignments.loadError"));
        this.loading.set(false);
      }, "error")
    });
  }
  loadOptions() {
    this.shiftAssignmentService.getAssignmentOptions().subscribe({
      next: /* @__PURE__ */ __name((options) => {
        this.assignmentOptions.set(options);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading assignment options:", error);
      }, "error")
    });
  }
  loadShifts() {
    this.shiftsService.getShifts(1, 1e3).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.availableShifts.set(response.items);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading shifts:", error);
      }, "error")
    });
  }
  loadBranches() {
    this.branchesService.getBranches(1, 1e3).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.availableBranches.set(response.items);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading branches:", error);
      }, "error")
    });
  }
  loadEmployees(branchId) {
    this.employeesService.getEmployeesForSelection(branchId).subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.availableEmployees.set(employees);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading employees:", error);
      }, "error")
    });
  }
  loadDepartments(branchId) {
    const filter = branchId ? { branchId, isActive: true } : { isActive: true };
    this.departmentsService.getDepartments(filter).subscribe({
      next: /* @__PURE__ */ __name((departments) => {
        this.availableDepartments.set(departments);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading departments:", error);
      }, "error")
    });
  }
  // Pagination methods
  onPageChanged(page) {
    this.currentPage.set(page);
    this.loadAssignments();
  }
  onPageSizeChanged(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadAssignments();
  }
  // Unified filter handlers
  onSearchTermChange(searchTerm) {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
    this.loadAssignments();
  }
  // Filter methods
  onSearchChanged() {
    this.currentPage.set(1);
    this.loadAssignments();
  }
  onFilterChanged() {
    this.currentPage.set(1);
    this.loadAssignments();
  }
  onFiltersChange(filters) {
    if (filters.branchId !== void 0) {
      const branchId = filters.branchId ? parseInt(filters.branchId) : null;
      this.selectedBranchId.set(branchId);
      this.onBranchFilterChanged(branchId);
    }
    if (filters.departmentId !== void 0) {
      const departmentId = filters.departmentId ? parseInt(filters.departmentId) : null;
      this.selectedDepartmentId.set(departmentId);
    }
    if (filters.shiftId !== void 0) {
      const shiftId = filters.shiftId ? parseInt(filters.shiftId) : null;
      this.selectedShiftId.set(shiftId);
    }
    if (filters.assignmentType !== void 0) {
      const assignmentType = filters.assignmentType ? parseInt(filters.assignmentType) : null;
      this.selectedAssignmentType.set(assignmentType);
    }
    if (filters.status !== void 0) {
      const status = filters.status ? parseInt(filters.status) : null;
      this.selectedStatus.set(status);
    }
    this.currentPage.set(1);
    this.loadAssignments();
  }
  onBranchFilterChanged(branchId) {
    this.selectedBranchId.set(branchId);
    this.onFilterChanged();
    this.loadEmployees(branchId || void 0);
    this.loadDepartments(branchId || void 0);
  }
  onRefreshData() {
    this.clearFilters();
    this.loadAssignments();
  }
  clearFilters() {
    this.searchTerm.set("");
    this.selectedAssignmentType.set(null);
    this.selectedStatus.set(null);
    this.selectedShiftId.set(null);
    this.selectedEmployeeId.set(null);
    this.selectedDepartmentId.set(null);
    this.selectedBranchId.set(null);
    this.currentlyActiveOnly.set(false);
    this.currentPage.set(1);
    this.loadAssignments();
  }
  // Create assignment methods
  openCreateModal() {
    const tomorrow = /* @__PURE__ */ new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.createForm.set({
      shiftId: 0,
      assignmentType: ShiftAssignmentType.Employee,
      effectiveDate: tomorrow.toISOString().split("T")[0],
      status: ShiftAssignmentStatus.Active,
      priority: 10
    });
    this.showCreateModal.set(true);
  }
  closeCreateModal() {
    this.showCreateModal.set(false);
  }
  createAssignment() {
    if (this.isCreateFormValid()) {
      this.shiftAssignmentService.createShiftAssignment(this.createForm()).subscribe({
        next: /* @__PURE__ */ __name((result) => {
          console.log("Assignment created successfully:", result);
          this.closeCreateModal();
          this.loadAssignments();
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Error creating assignment:", error);
        }, "error")
      });
    }
  }
  isCreateFormValid() {
    const form = this.createForm();
    return form.shiftId > 0 && form.effectiveDate !== "" && this.isEffectiveDateValid(form.effectiveDate) && this.isTargetValid(form.assignmentType, form.employeeId, form.departmentId, form.branchId);
  }
  isEffectiveDateValid(effectiveDate) {
    if (!effectiveDate)
      return false;
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(effectiveDate);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate > today;
  }
  isTargetValid(type, empId, deptId, branchId) {
    switch (type) {
      case ShiftAssignmentType.Employee:
        return !!empId && empId > 0;
      case ShiftAssignmentType.Department:
        return !!deptId && deptId > 0;
      case ShiftAssignmentType.Branch:
        return !!branchId && branchId > 0;
      default:
        return false;
    }
  }
  // Edit assignment methods
  editAssignment(assignment) {
    this.editingAssignment.set(assignment);
    this.showEditModal.set(true);
  }
  closeEditModal() {
    this.showEditModal.set(false);
    this.editingAssignment.set(null);
  }
  updateAssignment() {
    const assignment = this.editingAssignment();
    if (assignment) {
      const updateRequest = {
        shiftId: assignment.shiftId,
        assignmentType: assignment.assignmentType,
        employeeId: assignment.employeeId,
        departmentId: assignment.departmentId,
        branchId: assignment.branchId,
        effectiveDate: assignment.effectiveDate,
        endDate: assignment.endDate,
        status: assignment.status,
        priority: assignment.priority,
        notes: assignment.notes
      };
      this.shiftAssignmentService.updateShiftAssignment(assignment.id, updateRequest).subscribe({
        next: /* @__PURE__ */ __name(() => {
          console.log("Assignment updated successfully");
          this.closeEditModal();
          this.loadAssignments();
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Error updating assignment:", error);
        }, "error")
      });
    }
  }
  // Delete assignment method
  deleteAssignment(assignment) {
    if (confirm(this.i18n.t("shifts.assignments.confirmDelete"))) {
      this.shiftAssignmentService.deleteShiftAssignment(assignment.id).subscribe({
        next: /* @__PURE__ */ __name(() => {
          console.log("Assignment deleted successfully");
          this.loadAssignments();
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Error deleting assignment:", error);
        }, "error")
      });
    }
  }
  // Utility methods
  getStatusBadgeClass(status) {
    return this.shiftAssignmentService.getStatusBadgeClass(status);
  }
  formatDate(dateString) {
    return this.shiftAssignmentService.formatDate(dateString);
  }
  isCurrentlyActive(assignment) {
    return this.shiftAssignmentService.isCurrentlyActive(assignment);
  }
  getAssignmentTypeDisplay(type) {
    return this.shiftAssignmentService.getAssignmentTypeDisplay(type);
  }
  getStatusDisplay(status) {
    return this.shiftAssignmentService.getStatusDisplay(status);
  }
  // Form update methods
  updateCreateForm(field, value) {
    this.createForm.update((form) => __spreadProps(__spreadValues({}, form), { [field]: value }));
  }
  onAssignmentTypeChanged(type) {
    this.updateCreateForm("assignmentType", type);
    this.updateCreateForm("employeeId", void 0);
    this.updateCreateForm("departmentId", void 0);
    this.updateCreateForm("branchId", void 0);
  }
  // Searchable select options
  get shiftSelectOptions() {
    const options = [
      { value: "0", label: this.i18n.t("common.select") }
    ];
    this.availableShifts().forEach((shift) => {
      let subLabel = "";
      if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
        const firstPeriod = shift.shiftPeriods[0];
        subLabel = `${firstPeriod.startTime} - ${firstPeriod.endTime}`;
      }
      options.push({
        value: shift.id.toString(),
        label: shift.name,
        subLabel
      });
    });
    return options;
  }
  get assignmentTypeSelectOptions() {
    return this.assignmentOptions().assignmentTypes.map((type) => ({
      value: type.value.toString(),
      label: type.label
    }));
  }
  get assignmentTypeFilterOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.all") }
    ];
    return options.concat(this.assignmentTypeSelectOptions);
  }
  get statusFilterOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.all") }
    ];
    return options.concat(this.statusSelectOptions);
  }
  get branchSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.select") }
    ];
    this.availableBranches().forEach((branch) => {
      options.push({
        value: branch.id.toString(),
        label: branch.name,
        subLabel: branch.code
      });
    });
    return options;
  }
  get employeeSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.select") }
    ];
    this.availableEmployees().forEach((employee) => {
      options.push({
        value: employee.id.toString(),
        label: employee.name,
        subLabel: employee.employeeNumber
      });
    });
    return options;
  }
  get departmentSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.select") }
    ];
    this.availableDepartments().forEach((department) => {
      options.push({
        value: department.id.toString(),
        label: department.name,
        subLabel: department.code
      });
    });
    return options;
  }
  get statusSelectOptions() {
    return this.assignmentOptions().statuses.map((status) => ({
      value: status.value.toString(),
      label: status.label
    }));
  }
  get shiftFilterOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.all") }
    ];
    return options.concat(this.shiftSelectOptions.filter((option) => option.value !== "0"));
  }
  // Selection change handlers
  onShiftSelectionChange(shiftIdStr) {
    const shiftId = shiftIdStr ? parseInt(shiftIdStr) : 0;
    this.updateCreateForm("shiftId", shiftId);
  }
  onAssignmentTypeSelectionChange(typeStr) {
    const type = typeStr ? parseInt(typeStr) : ShiftAssignmentType.Employee;
    this.onAssignmentTypeChanged(type);
  }
  onBranchSelectionChange(branchIdStr) {
    const branchId = branchIdStr ? parseInt(branchIdStr) : void 0;
    this.updateCreateForm("branchId", branchId);
    this.loadEmployees(branchId);
    this.loadDepartments(branchId);
    this.updateCreateForm("employeeId", void 0);
    this.updateCreateForm("departmentId", void 0);
  }
  onEmployeeSelectionChange(employeeIdStr) {
    const employeeId = employeeIdStr ? parseInt(employeeIdStr) : void 0;
    this.updateCreateForm("employeeId", employeeId);
  }
  onDepartmentSelectionChange(departmentIdStr) {
    const departmentId = departmentIdStr ? parseInt(departmentIdStr) : void 0;
    this.updateCreateForm("departmentId", departmentId);
  }
  onStatusSelectionChange(statusStr) {
    const status = statusStr ? parseInt(statusStr) : ShiftAssignmentStatus.Active;
    this.updateCreateForm("status", status);
  }
};
__name(_AssignShiftsComponent, "AssignShiftsComponent");
__publicField(_AssignShiftsComponent, "\u0275fac", /* @__PURE__ */ __name(function AssignShiftsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AssignShiftsComponent)();
}, "AssignShiftsComponent_Factory"));
__publicField(_AssignShiftsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssignShiftsComponent, selectors: [["app-assign-shifts"]], decls: 55, vars: 55, consts: [[1, "container-fluid"], [3, "title"], ["moduleName", "shift-assignments", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [1, "card"], [1, "card-body"], [1, "text-center", "py-4"], [1, "alert", "alert-danger"], [1, "table-responsive"], [1, "mt-4"], [3, "close", "show", "title", "size", "centered"], [1, "modal-body"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], [3, "selectionChange", "options", "ngModel", "ngModelOptions", "placeholder", "searchable", "clearable"], [3, "selectionChange", "options", "ngModel", "ngModelOptions", "searchable", "clearable"], ["type", "date", "name", "effectiveDate", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "date", "name", "endDate", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "name", "priority", "min", "0", "max", "100", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "col-12"], ["name", "notes", "rows", "3", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions", "placeholder"], ["modal-footer", "", 1, "d-flex", "gap-2", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "table", "table-hover"], [3, "table-success"], [1, "text-muted", "d-block"], [1, "badge", "bg-info"], [1, "text-muted"], [1, "badge", 3, "ngClass"], [1, "btn-group", "btn-group-sm"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "title"], [1, "fas", "fa-edit"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "title"], [1, "fas", "fa-trash"], [1, "text-center", "py-4", "text-muted"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "pagination", "pagination-sm", "mb-0"], [1, "page-item"], [1, "page-link", 3, "click"], [1, "page-item", 3, "active"]], template: /* @__PURE__ */ __name(function AssignShiftsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchTermChange($event);
    }, "AssignShiftsComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "AssignShiftsComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.openCreateModal();
    }, "AssignShiftsComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "AssignShiftsComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
    \u0275\u0275conditionalCreate(5, AssignShiftsComponent_Conditional_5_Template, 4, 1, "div", 5);
    \u0275\u0275conditionalCreate(6, AssignShiftsComponent_Conditional_6_Template, 2, 1, "div", 6);
    \u0275\u0275conditionalCreate(7, AssignShiftsComponent_Conditional_7_Template, 23, 9, "div", 7);
    \u0275\u0275conditionalCreate(8, AssignShiftsComponent_Conditional_8_Template, 14, 14, "nav", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "app-modal-wrapper", 9);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_modal_wrapper_close_9_listener() {
      return ctx.closeCreateModal();
    }, "AssignShiftsComponent_Template_app_modal_wrapper_close_9_listener"));
    \u0275\u0275elementStart(10, "div", 10)(11, "form")(12, "div", 11)(13, "div", 12)(14, "label", 13);
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "span", 14);
    \u0275\u0275text(17, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "app-searchable-select", 15);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_searchable_select_selectionChange_18_listener($event) {
      return ctx.onShiftSelectionChange($event);
    }, "AssignShiftsComponent_Template_app_searchable_select_selectionChange_18_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 12)(20, "label", 13);
    \u0275\u0275text(21);
    \u0275\u0275elementStart(22, "span", 14);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "app-searchable-select", 16);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_searchable_select_selectionChange_24_listener($event) {
      return ctx.onAssignmentTypeSelectionChange($event);
    }, "AssignShiftsComponent_Template_app_searchable_select_selectionChange_24_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(25, AssignShiftsComponent_Conditional_25_Template, 6, 8, "div", 12);
    \u0275\u0275conditionalCreate(26, AssignShiftsComponent_Conditional_26_Template, 6, 8, "div", 12);
    \u0275\u0275conditionalCreate(27, AssignShiftsComponent_Conditional_27_Template, 6, 8, "div", 12);
    \u0275\u0275elementStart(28, "div", 12)(29, "label", 13);
    \u0275\u0275text(30);
    \u0275\u0275elementStart(31, "span", 14);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "input", 17);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_input_ngModelChange_33_listener($event) {
      return ctx.updateCreateForm("effectiveDate", $event);
    }, "AssignShiftsComponent_Template_input_ngModelChange_33_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 12)(35, "label", 13);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 18);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_input_ngModelChange_37_listener($event) {
      return ctx.updateCreateForm("endDate", $event);
    }, "AssignShiftsComponent_Template_input_ngModelChange_37_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 12)(39, "label", 13);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "app-searchable-select", 16);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_searchable_select_selectionChange_41_listener($event) {
      return ctx.onStatusSelectionChange($event);
    }, "AssignShiftsComponent_Template_app_searchable_select_selectionChange_41_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 12)(43, "label", 13);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "input", 19);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_input_ngModelChange_45_listener($event) {
      return ctx.updateCreateForm("priority", +$event);
    }, "AssignShiftsComponent_Template_input_ngModelChange_45_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 20)(47, "label", 13);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "textarea", 21);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_textarea_ngModelChange_49_listener($event) {
      return ctx.updateCreateForm("notes", $event);
    }, "AssignShiftsComponent_Template_textarea_ngModelChange_49_listener"));
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(50, "div", 22)(51, "button", 23);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_button_click_51_listener() {
      return ctx.closeCreateModal();
    }, "AssignShiftsComponent_Template_button_click_51_listener"));
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "button", 24);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_button_click_53_listener() {
      return ctx.createAssignment();
    }, "AssignShiftsComponent_Template_button_click_53_listener"));
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_34_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("shifts.assignments.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.loading() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.totalPages() > 1 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("show", ctx.showCreateModal())("title", ctx.i18n.t("shifts.assignments.createTitle"))("size", "lg")("centered", true);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("shifts.shift"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx.shiftSelectOptions)("ngModel", ctx.createForm().shiftId.toString())("ngModelOptions", \u0275\u0275pureFunction0(48, _c0))("placeholder", ctx.i18n.t("common.select"))("searchable", true)("clearable", false);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("shifts.assignments.assignmentType"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx.assignmentTypeSelectOptions)("ngModel", ctx.createForm().assignmentType.toString())("ngModelOptions", \u0275\u0275pureFunction0(49, _c0))("searchable", false)("clearable", false);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.createForm().assignmentType === ctx.ShiftAssignmentType.Employee ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.createForm().assignmentType === ctx.ShiftAssignmentType.Department ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.createForm().assignmentType === ctx.ShiftAssignmentType.Branch ? 27 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("shifts.assignments.effectiveDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx.createForm().effectiveDate)("ngModelOptions", \u0275\u0275pureFunction0(50, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("shifts.assignments.endDate"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.createForm().endDate)("ngModelOptions", \u0275\u0275pureFunction0(51, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.status"));
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx.statusSelectOptions)("ngModel", ((tmp_34_0 = ctx.createForm().status) == null ? null : tmp_34_0.toString()) || "")("ngModelOptions", \u0275\u0275pureFunction0(52, _c0))("searchable", false)("clearable", false);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("shifts.assignments.priority"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.createForm().priority)("ngModelOptions", \u0275\u0275pureFunction0(53, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.notes"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.createForm().notes)("ngModelOptions", \u0275\u0275pureFunction0(54, _c0))("placeholder", ctx.i18n.t("shifts.assignments.notesPlaceholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx.isCreateFormValid());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.create"), " ");
  }
}, "AssignShiftsComponent_Template"), dependencies: [CommonModule, NgClass, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, SearchableSelectComponent, PageHeaderComponent, UnifiedFilterComponent, ModalWrapperComponent], styles: ['\n\n.container-fluid[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.badge-success[_ngcontent-%COMP%] {\n  background-color: #198754 !important;\n}\n.badge-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107 !important;\n  color: #000 !important;\n}\n.badge-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n}\n.badge-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n}\n.badge-dark[_ngcontent-%COMP%] {\n  background-color: #212529 !important;\n}\n.badge-light[_ngcontent-%COMP%] {\n  background-color: #f8f9fa !important;\n  color: #000 !important;\n}\n.badge-info[_ngcontent-%COMP%] {\n  background-color: #0dcaf0 !important;\n  color: #000 !important;\n}\n.table-responsive[_ngcontent-%COMP%] {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.375rem;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  font-weight: 600;\n  border-bottom: 2px solid #dee2e6;\n  white-space: nowrap;\n}\n.table-success[_ngcontent-%COMP%] {\n  background-color: rgba(25, 135, 84, 0.1) !important;\n}\n.table-hover[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-outline-danger[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.25rem;\n}\n.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  color: #495057;\n  font-weight: 600;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.modal-content[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title[_ngcontent-%COMP%] {\n  color: #495057;\n  font-weight: 600;\n}\n.btn-close[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  margin: -0.5rem -0.5rem -0.5rem auto;\n}\n.pagination[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #0d6efd;\n  border: 1px solid #dee2e6;\n  padding: 0.375rem 0.75rem;\n}\n.pagination[_ngcontent-%COMP%]   .page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n  color: white;\n}\n.pagination[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:hover {\n  color: #0a58ca;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n.pagination[_ngcontent-%COMP%]   .page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #6c757d;\n  background-color: #fff;\n  border-color: #dee2e6;\n  cursor: not-allowed;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  border: none;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: rgba(220, 53, 69, 0.1);\n  color: #721c24;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.2rem 0.4rem;\n    font-size: 0.8rem;\n  }\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .modal-dialog[_ngcontent-%COMP%] {\n    margin: 0.5rem;\n  }\n}\n.text-truncate[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.cursor-pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.min-width-120[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n.card-body[_ngcontent-%COMP%]   .row.g-3[_ngcontent-%COMP%]    > .col-md-1[_ngcontent-%COMP%], \n.card-body[_ngcontent-%COMP%]   .row.g-3[_ngcontent-%COMP%]    > .col-md-2[_ngcontent-%COMP%], \n.card-body[_ngcontent-%COMP%]   .row.g-3[_ngcontent-%COMP%]    > .col-md-3[_ngcontent-%COMP%] {\n  min-height: 80px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.target-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.target-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #212529;\n}\n.target-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 0.8rem;\n}\n.priority-badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.25rem 0.5rem;\n}\n.status-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.status-indicator[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: currentColor;\n}\n.table-success[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  position: relative;\n}\n.table-success[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n  background-color: #198754;\n  border-radius: 0 4px 4px 0;\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: #dc3545;\n}\n.empty-state[_ngcontent-%COMP%] {\n  padding: 3rem 1rem;\n  text-align: center;\n  color: #6c757d;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=assign-shifts.component.css.map */'] }));
var AssignShiftsComponent = _AssignShiftsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AssignShiftsComponent, [{
    type: Component,
    args: [{ selector: "app-assign-shifts", standalone: true, imports: [CommonModule, FormsModule, HasPermissionDirective, SearchableSelectComponent, PageHeaderComponent, UnifiedFilterComponent, ModalWrapperComponent], template: `<div class="container-fluid">
  <!-- Page Header -->
  <app-page-header
    [title]="i18n.t('shifts.assignments.title')">
  </app-page-header>

  <!-- Unified Filter Component -->
  <app-unified-filter
    moduleName="shift-assignments"
    [refreshing]="loading()"
    (searchChange)="onSearchTermChange($event)"
    (filtersChange)="onFiltersChange($event)"
    (add)="openCreateModal()"
    (refresh)="onRefreshData()">
  </app-unified-filter>

  <!-- Assignments Table -->
  <div class="card">
    <div class="card-body">
      <!-- Loading State -->
      @if (loading()) {
      <div class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
        </div>
      </div>
      }

      <!-- Error State -->
      @if (error()) {
      <div class="alert alert-danger">
        {{ error() }}
      </div>
      }

      <!-- Table -->
      @if (!loading() && !error()) {
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>{{ i18n.t('shifts.shift') }}</th>
              <th>{{ i18n.t('shifts.assignments.assignmentType') }}</th>
              <th>{{ i18n.t('shifts.assignments.target') }}</th>
              <th>{{ i18n.t('shifts.assignments.effectiveDate') }}</th>
              <th>{{ i18n.t('shifts.assignments.endDate') }}</th>
              <th>{{ i18n.t('common.status') }}</th>
              <th>{{ i18n.t('shifts.assignments.priority') }}</th>
              @if (PERMISSIONS.SHIFT_ASSIGNMENT_MANAGE) {
              <th>{{ i18n.t('common.actions') }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (assignment of assignments(); track assignment.id) {
            <tr [class.table-success]="isCurrentlyActive(assignment)">
              <td>
                <div>
                  <strong>{{ assignment.shiftName }}</strong>
                  <small class="text-muted d-block">{{ assignment.shiftType }}</small>
                </div>
              </td>
              <td>
                <span class="badge bg-info">{{ assignment.assignmentTypeDisplay }}</span>
              </td>
              <td>
                <div>
                  <strong>{{ assignment.targetDisplayName }}</strong>
                  @if (assignment.employeeNumber) {
                  <small class="text-muted d-block">
                    {{ i18n.t('employees.employeeNumber') }}: {{ assignment.employeeNumber }}
                  </small>
                  }
                  @if (assignment.branchCode) {
                  <small class="text-muted d-block">
                    {{ i18n.t('branches.code') }}: {{ assignment.branchCode }}
                  </small>
                  }
                </div>
              </td>
              <td>{{ formatDate(assignment.effectiveDate) }}</td>
              <td>
                @if (assignment.endDate) {
                <span>{{ formatDate(assignment.endDate) }}</span>
                }
                @if (!assignment.endDate) {
                <span class="text-muted">{{ i18n.t('common.indefinite') }}</span>
                }
              </td>
              <td>
                <span class="badge" [ngClass]="getStatusBadgeClass(assignment.status)">
                  {{ assignment.statusDisplay }}
                </span>
              </td>
              <td>
                <span class="badge bg-info">{{ assignment.priority }}</span>
              </td>
              @if (PERMISSIONS.SHIFT_ASSIGNMENT_MANAGE) {
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    (click)="editAssignment(assignment)"
                    [title]="i18n.t('common.edit')">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    (click)="deleteAssignment(assignment)"
                    [title]="i18n.t('common.delete')">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
              }
            </tr>
            }
            @if (assignments().length === 0) {
            <tr>
              <td [attr.colspan]="8" class="text-center py-4 text-muted">
                {{ i18n.t('shifts.assignments.noAssignments') }}
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
      }

      <!-- Pagination -->
      @if (totalPages() > 1) {
      <nav class="mt-4">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="text-muted">
              {{ i18n.t('common.showing') }}
              {{ (currentPage() - 1) * pageSize() + 1 }}
              {{ i18n.t('common.to') }}
              {{ Math.min(currentPage() * pageSize(), totalCount()) }}
              {{ i18n.t('common.of') }}
              {{ totalCount() }}
              {{ i18n.t('common.entries') }}
            </span>
          </div>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item" [class.disabled]="currentPage() === 1">
              <a class="page-link" (click)="onPageChanged(currentPage() - 1)">
                {{ i18n.t('common.previous') }}
              </a>
            </li>
            @for (page of [].constructor(totalPages()); track i; let i = $index) {
            <li class="page-item"
                [class.active]="currentPage() === i + 1">
              <a class="page-link" (click)="onPageChanged(i + 1)">{{ i + 1 }}</a>
            </li>
            }
            <li class="page-item" [class.disabled]="currentPage() === totalPages()">
              <a class="page-link" (click)="onPageChanged(currentPage() + 1)">
                {{ i18n.t('common.next') }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      }
    </div>
  </div>
</div>

<!-- Create Assignment Modal -->
<app-modal-wrapper
  [show]="showCreateModal()"
  [title]="i18n.t('shifts.assignments.createTitle')"
  [size]="'lg'"
  [centered]="true"
  (close)="closeCreateModal()">

  <div class="modal-body">
    <form>
          <div class="row g-3">
            <!-- Shift Selection -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.shift') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="shiftSelectOptions"
                [ngModel]="createForm().shiftId.toString()"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onShiftSelectionChange($event)"
                [placeholder]="i18n.t('common.select')"
                [searchable]="true"
                [clearable]="false"
              ></app-searchable-select>
            </div>

            <!-- Assignment Type -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.assignments.assignmentType') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="assignmentTypeSelectOptions"
                [ngModel]="createForm().assignmentType.toString()"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onAssignmentTypeSelectionChange($event)"
                [searchable]="false"
                [clearable]="false"
              ></app-searchable-select>
            </div>

            <!-- Employee Selection (if Employee type) -->
            @if (createForm().assignmentType === ShiftAssignmentType.Employee) {
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('employees.employee') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="employeeSelectOptions"
                [ngModel]="createForm().employeeId?.toString() || ''"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onEmployeeSelectionChange($event)"
                [placeholder]="i18n.t('common.select')"
                [searchable]="true"
                [clearable]="false"
              ></app-searchable-select>
            </div>
            }

            <!-- Department Selection (if Department type) -->
            @if (createForm().assignmentType === ShiftAssignmentType.Department) {
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('departments.department') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="departmentSelectOptions"
                [ngModel]="createForm().departmentId?.toString() || ''"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onDepartmentSelectionChange($event)"
                [placeholder]="i18n.t('common.select')"
                [searchable]="true"
                [clearable]="false"
              ></app-searchable-select>
            </div>
            }

            <!-- Branch Selection (if Branch type) -->
            @if (createForm().assignmentType === ShiftAssignmentType.Branch) {
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('branches.branch') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="branchSelectOptions"
                [ngModel]="createForm().branchId?.toString() || ''"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onBranchSelectionChange($event)"
                [placeholder]="i18n.t('common.select')"
                [searchable]="true"
                [clearable]="false"
              ></app-searchable-select>
            </div>
            }

            <!-- Effective Date -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.assignments.effectiveDate') }} <span class="text-danger">*</span></label>
              <input
                type="date"
                class="form-control"
                name="effectiveDate"
                [ngModel]="createForm().effectiveDate"
                [ngModelOptions]="{standalone: true}"
                (ngModelChange)="updateCreateForm('effectiveDate', $event)"
                required>
            </div>

            <!-- End Date -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.assignments.endDate') }}</label>
              <input
                type="date"
                class="form-control"
                name="endDate"
                [ngModel]="createForm().endDate"
                [ngModelOptions]="{standalone: true}"
                (ngModelChange)="updateCreateForm('endDate', $event)">
            </div>

            <!-- Status -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('common.status') }}</label>
              <app-searchable-select
                [options]="statusSelectOptions"
                [ngModel]="createForm().status?.toString() || ''"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onStatusSelectionChange($event)"
                [searchable]="false"
                [clearable]="false"
              ></app-searchable-select>
            </div>

            <!-- Priority -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.assignments.priority') }}</label>
              <input
                type="number"
                class="form-control"
                name="priority"
                min="0"
                max="100"
                [ngModel]="createForm().priority"
                [ngModelOptions]="{standalone: true}"
                (ngModelChange)="updateCreateForm('priority', +$event)">
            </div>

            <!-- Notes -->
            <div class="col-12">
              <label class="form-label">{{ i18n.t('common.notes') }}</label>
              <textarea
                class="form-control"
                name="notes"
                rows="3"
                [ngModel]="createForm().notes"
                [ngModelOptions]="{standalone: true}"
                (ngModelChange)="updateCreateForm('notes', $event)"
                [placeholder]="i18n.t('shifts.assignments.notesPlaceholder')"></textarea>
            </div>
          </div>
    </form>
  </div>

  <div modal-footer class="d-flex gap-2 justify-content-end">
    <button type="button" class="btn btn-secondary" (click)="closeCreateModal()">
      {{ i18n.t('common.cancel') }}
    </button>
    <button
      type="button"
      class="btn btn-primary"
      (click)="createAssignment()"
      [disabled]="!isCreateFormValid()">
      {{ i18n.t('common.create') }}
    </button>
  </div>

</app-modal-wrapper>`, styles: ['/* src/app/pages/shifts/assign-shifts/assign-shifts.component.css */\n.container-fluid {\n  padding: 1.5rem;\n}\n.badge-success {\n  background-color: #198754 !important;\n}\n.badge-warning {\n  background-color: #ffc107 !important;\n  color: #000 !important;\n}\n.badge-danger {\n  background-color: #dc3545 !important;\n}\n.badge-secondary {\n  background-color: #6c757d !important;\n}\n.badge-dark {\n  background-color: #212529 !important;\n}\n.badge-light {\n  background-color: #f8f9fa !important;\n  color: #000 !important;\n}\n.badge-info {\n  background-color: #0dcaf0 !important;\n  color: #000 !important;\n}\n.table-responsive {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.375rem;\n}\n.table th {\n  background-color: #f8f9fa;\n  font-weight: 600;\n  border-bottom: 2px solid #dee2e6;\n  white-space: nowrap;\n}\n.table-success {\n  background-color: rgba(25, 135, 84, 0.1) !important;\n}\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n.btn-group-sm .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.btn-outline-primary:hover {\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-outline-danger:hover {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.card {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n}\n.card-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.25rem;\n}\n.card-header h5 {\n  color: #495057;\n  font-weight: 600;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control,\n.form-select {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-check-input:checked {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.modal-content {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title {\n  color: #495057;\n  font-weight: 600;\n}\n.btn-close {\n  padding: 0.5rem;\n  margin: -0.5rem -0.5rem -0.5rem auto;\n}\n.pagination .page-link {\n  color: #0d6efd;\n  border: 1px solid #dee2e6;\n  padding: 0.375rem 0.75rem;\n}\n.pagination .page-item.active .page-link {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n  color: white;\n}\n.pagination .page-link:hover {\n  color: #0a58ca;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n.pagination .page-item.disabled .page-link {\n  color: #6c757d;\n  background-color: #fff;\n  border-color: #dee2e6;\n  cursor: not-allowed;\n}\n.spinner-border {\n  width: 2rem;\n  height: 2rem;\n}\n.alert {\n  border-radius: 0.5rem;\n  border: none;\n}\n.alert-danger {\n  background-color: rgba(220, 53, 69, 0.1);\n  color: #721c24;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding: 1rem;\n  }\n  .btn-group-sm .btn {\n    padding: 0.2rem 0.4rem;\n    font-size: 0.8rem;\n  }\n  .table-responsive {\n    font-size: 0.9rem;\n  }\n  .modal-dialog {\n    margin: 0.5rem;\n  }\n}\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.min-width-120 {\n  min-width: 120px;\n}\n.card-body .row.g-3 > .col-md-1,\n.card-body .row.g-3 > .col-md-2,\n.card-body .row.g-3 > .col-md-3 {\n  min-height: 80px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.target-info {\n  display: flex;\n  flex-direction: column;\n}\n.target-info strong {\n  color: #212529;\n}\n.target-info small {\n  color: #6c757d;\n  font-size: 0.8rem;\n}\n.priority-badge {\n  font-size: 0.75rem;\n  padding: 0.25rem 0.5rem;\n}\n.status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.status-indicator::before {\n  content: "";\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: currentColor;\n}\n.table-success td {\n  position: relative;\n}\n.table-success td:first-child::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n  background-color: #198754;\n  border-radius: 0 4px 4px 0;\n}\n.is-invalid {\n  border-color: #dc3545;\n}\n.invalid-feedback {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: #dc3545;\n}\n.empty-state {\n  padding: 3rem 1rem;\n  text-align: center;\n  color: #6c757d;\n}\n.empty-state i {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=assign-shifts.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssignShiftsComponent, { className: "AssignShiftsComponent", filePath: "src/app/pages/shifts/assign-shifts/assign-shifts.component.ts", lineNumber: 40 });
})();
export {
  AssignShiftsComponent
};
//# sourceMappingURL=chunk-MU5NA4EH.js.map
