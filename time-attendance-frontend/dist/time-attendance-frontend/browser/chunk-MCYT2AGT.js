import {
  RolesService
} from "./chunk-GBUXYQ2X.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
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
  CommonModule,
  Component,
  NgClass,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/roles/edit-role/edit-role.component.ts
var _c0 = /* @__PURE__ */ __name(() => ({ standalone: true }), "_c0");
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.group, "_forTrack0");
var _forTrack1 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack1");
function EditRoleComponent_Conditional_18_Template(rf, ctx) {
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
__name(EditRoleComponent_Conditional_18_Template, "EditRoleComponent_Conditional_18_Template");
function EditRoleComponent_Conditional_19_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(EditRoleComponent_Conditional_19_Conditional_7_Template, "EditRoleComponent_Conditional_19_Conditional_7_Template");
function EditRoleComponent_Conditional_19_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("name"));
  }
}
__name(EditRoleComponent_Conditional_19_Conditional_15_Template, "EditRoleComponent_Conditional_19_Conditional_15_Template");
function EditRoleComponent_Conditional_19_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275element(1, "i", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("roles.system_role_name_readonly"), " ");
  }
}
__name(EditRoleComponent_Conditional_19_Conditional_16_Template, "EditRoleComponent_Conditional_19_Conditional_16_Template");
function EditRoleComponent_Conditional_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275element(1, "i", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("roles.system"), " ");
  }
}
__name(EditRoleComponent_Conditional_19_Conditional_21_Template, "EditRoleComponent_Conditional_19_Conditional_21_Template");
function EditRoleComponent_Conditional_19_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275element(1, "i", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("roles.custom"), " ");
  }
}
__name(EditRoleComponent_Conditional_19_Conditional_22_Template, "EditRoleComponent_Conditional_19_Conditional_22_Template");
function EditRoleComponent_Conditional_19_For_46_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66)(1, "div", 67)(2, "div", 68)(3, "input", 69);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function EditRoleComponent_Conditional_19_For_46_Conditional_14_For_2_Template_input_change_3_listener() {
      const permission_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onTogglePermission(permission_r6));
    }, "EditRoleComponent_Conditional_19_For_46_Conditional_14_For_2_Template_input_change_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 70)(5, "div", 71);
    \u0275\u0275element(6, "i", 72);
    \u0275\u0275elementStart(7, "label", 73)(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 74);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 75);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const permission_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-light", ctx_r0.isPermissionSelected(permission_r6.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "permission-" + permission_r6.id)("checked", ctx_r0.isPermissionSelected(permission_r6.id))("disabled", ctx_r0.saving());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r0.getPermissionIcon(permission_r6.key));
    \u0275\u0275advance();
    \u0275\u0275property("for", "permission-" + permission_r6.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getPermissionResource(permission_r6.key));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.getActionBadgeClass(permission_r6.key));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getPermissionAction(permission_r6.key), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getPermissionDescription(permission_r6), " ");
  }
}
__name(EditRoleComponent_Conditional_19_For_46_Conditional_14_For_2_Template, "EditRoleComponent_Conditional_19_For_46_Conditional_14_For_2_Template");
function EditRoleComponent_Conditional_19_For_46_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275repeaterCreate(1, EditRoleComponent_Conditional_19_For_46_Conditional_14_For_2_Template, 14, 11, "div", 66, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(group_r4.permissions);
  }
}
__name(EditRoleComponent_Conditional_19_For_46_Conditional_14_Template, "EditRoleComponent_Conditional_19_For_46_Conditional_14_Template");
function EditRoleComponent_Conditional_19_For_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 57)(2, "div", 58)(3, "button", 59);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditRoleComponent_Conditional_19_For_46_Template_button_click_3_listener() {
      const group_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleGroupCollapse(group_r4.group));
    }, "EditRoleComponent_Conditional_19_For_46_Template_button_click_3_listener"));
    \u0275\u0275element(4, "i", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h6", 61);
    \u0275\u0275element(6, "i", 62);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "small", 63);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 35)(11, "button", 64);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditRoleComponent_Conditional_19_For_46_Template_button_click_11_listener() {
      const group_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleGroupSelection(group_r4));
    }, "EditRoleComponent_Conditional_19_For_46_Template_button_click_11_listener"));
    \u0275\u0275element(12, "i", 60);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(14, EditRoleComponent_Conditional_19_For_46_Conditional_14_Template, 3, 0, "div", 65);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.saving())("title", ctx_r0.isGroupCollapsed(group_r4.group) ? ctx_r0.i18n.t("common.expand") : ctx_r0.i18n.t("common.collapse"));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.isGroupCollapsed(group_r4.group) ? "fa-chevron-right" : "fa-chevron-down");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", group_r4.group, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("(", group_r4.permissions.length, " ", ctx_r0.i18n.t("roles.permissions"), ")");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-primary", ctx_r0.areAllGroupPermissionsSelected(group_r4))("btn-outline-primary", !ctx_r0.areAllGroupPermissionsSelected(group_r4));
    \u0275\u0275property("disabled", ctx_r0.saving())("title", ctx_r0.areAllGroupPermissionsSelected(group_r4) ? ctx_r0.i18n.t("roles.deselect_all_group") : ctx_r0.i18n.t("roles.select_all_group"));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.areAllGroupPermissionsSelected(group_r4) ? "fa-check-square" : ctx_r0.areSomeGroupPermissionsSelected(group_r4) ? "fa-minus-square" : "fa-square");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.areAllGroupPermissionsSelected(group_r4) ? ctx_r0.i18n.t("roles.deselect_all") : ctx_r0.i18n.t("roles.select_all"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isGroupCollapsed(group_r4.group) ? 14 : -1);
  }
}
__name(EditRoleComponent_Conditional_19_For_46_Template, "EditRoleComponent_Conditional_19_For_46_Template");
function EditRoleComponent_Conditional_19_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "i", 76);
    \u0275\u0275elementStart(2, "p", 77);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("roles.no_permissions_available"));
  }
}
__name(EditRoleComponent_Conditional_19_Conditional_47_Template, "EditRoleComponent_Conditional_19_Conditional_47_Template");
function EditRoleComponent_Conditional_19_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 52);
  }
}
__name(EditRoleComponent_Conditional_19_Conditional_53_Template, "EditRoleComponent_Conditional_19_Conditional_53_Template");
function EditRoleComponent_Conditional_19_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 53);
  }
}
__name(EditRoleComponent_Conditional_19_Conditional_54_Template, "EditRoleComponent_Conditional_19_Conditional_54_Template");
function EditRoleComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 15)(2, "h5", 16);
    \u0275\u0275element(3, "i", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 18)(6, "form", 19);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditRoleComponent_Conditional_19_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "EditRoleComponent_Conditional_19_Template_form_ngSubmit_6_listener"));
    \u0275\u0275conditionalCreate(7, EditRoleComponent_Conditional_19_Conditional_7_Template, 3, 1, "div", 20);
    \u0275\u0275elementStart(8, "div", 21)(9, "div", 22)(10, "label", 23);
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "span", 24);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "input", 25);
    \u0275\u0275conditionalCreate(15, EditRoleComponent_Conditional_19_Conditional_15_Template, 2, 1, "div", 26);
    \u0275\u0275conditionalCreate(16, EditRoleComponent_Conditional_19_Conditional_16_Template, 3, 1, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 22)(18, "label", 23);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 28);
    \u0275\u0275conditionalCreate(21, EditRoleComponent_Conditional_19_Conditional_21_Template, 3, 1, "span", 29)(22, EditRoleComponent_Conditional_19_Conditional_22_Template, 3, 1, "span", 30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 31)(24, "div", 32)(25, "h6", 33);
    \u0275\u0275element(26, "i", 34);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 35)(29, "button", 36);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditRoleComponent_Conditional_19_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectAllPermissions());
    }, "EditRoleComponent_Conditional_19_Template_button_click_29_listener"));
    \u0275\u0275element(30, "i", 37);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditRoleComponent_Conditional_19_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearAllPermissions());
    }, "EditRoleComponent_Conditional_19_Template_button_click_32_listener"));
    \u0275\u0275element(33, "i", 38);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 39)(36, "small");
    \u0275\u0275element(37, "i", 40);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 41)(40, "div", 42)(41, "span", 43);
    \u0275\u0275element(42, "i", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditRoleComponent_Conditional_19_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.permissionSearchTerm, $event) || (ctx_r0.permissionSearchTerm = $event);
      return \u0275\u0275resetView($event);
    }, "EditRoleComponent_Conditional_19_Template_input_ngModelChange_43_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 46);
    \u0275\u0275repeaterCreate(45, EditRoleComponent_Conditional_19_For_46_Template, 15, 15, "div", 47, _forTrack0);
    \u0275\u0275conditionalCreate(47, EditRoleComponent_Conditional_19_Conditional_47_Template, 4, 1, "div", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 49)(49, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditRoleComponent_Conditional_19_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditRoleComponent_Conditional_19_Template_button_click_49_listener"));
    \u0275\u0275element(50, "i", 50);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "button", 51);
    \u0275\u0275conditionalCreate(53, EditRoleComponent_Conditional_19_Conditional_53_Template, 1, 0, "span", 52)(54, EditRoleComponent_Conditional_19_Conditional_54_Template, 1, 0, "i", 53);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    let tmp_9_0;
    let tmp_11_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("roles.role_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.roleForm);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.error() ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("roles.name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("name"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("roles.name_placeholder"))("disabled", ((tmp_7_0 = ctx_r0.role()) == null ? null : tmp_7_0.isSystem) || false);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("name") ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_9_0 = ctx_r0.role()) == null ? null : tmp_9_0.isSystem) ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("roles.type"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_11_0 = ctx_r0.role()) == null ? null : tmp_11_0.isSystem) ? 21 : 22);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("roles.permissions"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("roles.select_all"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("roles.clear_all"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate4(" ", ctx_r0.selectedPermissions().size, " ", ctx_r0.i18n.t("roles.permissions_selected"), " ", ctx_r0.i18n.t("common.of"), " ", ctx_r0.allPermissions().length, " ");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.permissionSearchTerm);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(31, _c0))("placeholder", ctx_r0.i18n.t("roles.search_permissions_placeholder"))("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.getFilteredGroupedPermissions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.getFilteredGroupedPermissions().length === 0 ? 47 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.roleForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 53 : 54);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? ctx_r0.i18n.t("common.saving") : ctx_r0.i18n.t("roles.update_role"), " ");
  }
}
__name(EditRoleComponent_Conditional_19_Template, "EditRoleComponent_Conditional_19_Template");
function EditRoleComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.i18n.t("roles.role_not_found"), " ");
  }
}
__name(EditRoleComponent_Conditional_20_Template, "EditRoleComponent_Conditional_20_Template");
var _EditRoleComponent = class _EditRoleComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  rolesService = inject(RolesService);
  fb = inject(FormBuilder);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  role = signal(null, ...ngDevMode ? [{ debugName: "role" }] : []);
  allPermissions = signal([], ...ngDevMode ? [{ debugName: "allPermissions" }] : []);
  selectedPermissions = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "selectedPermissions" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  permissionSearchTerm = "";
  // Collapse state for permission groups
  collapsedGroups = /* @__PURE__ */ new Set();
  roleForm;
  ngOnInit() {
    this.initializeForm();
    const roleId = this.route.snapshot.paramMap.get("id");
    if (roleId) {
      this.loadPermissions();
      this.loadRole(roleId);
    } else {
      this.error.set(this.i18n.t("roles.invalid_role_id"));
      this.loading.set(false);
    }
  }
  initializeForm() {
    this.roleForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]]
    });
  }
  loadRole(roleId) {
    this.rolesService.getRoleById(+roleId).subscribe({
      next: /* @__PURE__ */ __name((role) => {
        this.role.set(role);
        this.populateForm(role);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }, "error")
    });
  }
  loadPermissions() {
    this.rolesService.getPermissions().subscribe({
      next: /* @__PURE__ */ __name((permissions) => {
        this.allPermissions.set(permissions);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load permissions:", error);
        this.allPermissions.set([]);
        this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("roles.failed_to_load_permissions"));
      }, "error")
    });
  }
  populateForm(role) {
    this.roleForm.patchValue({
      name: role.name
    });
    const permissionIds = new Set(role.permissions.map((p) => p.id.toString()));
    this.selectedPermissions.set(permissionIds);
  }
  onSubmit() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set("");
    const formValue = this.roleForm.value;
    const updateRequest = {
      name: formValue.name,
      permissionIds: Array.from(this.selectedPermissions()).map((id) => +id)
    };
    this.rolesService.updateRole(this.role().id, updateRequest).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t("app.success"), this.i18n.t("roles.role_updated_successfully"));
        this.router.navigate(["/roles", this.role().id, "view"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.saving.set(false);
        this.error.set(this.getErrorMessage(error));
        this.notificationService.error(this.i18n.t("app.error"), this.getErrorMessage(error));
      }, "error")
    });
  }
  onTogglePermission(permission) {
    const selected = new Set(this.selectedPermissions());
    const permissionId = permission.id.toString();
    if (selected.has(permissionId)) {
      selected.delete(permissionId);
    } else {
      selected.add(permissionId);
    }
    this.selectedPermissions.set(selected);
  }
  selectAllPermissions() {
    const allIds = new Set(this.allPermissions().map((p) => p.id.toString()));
    this.selectedPermissions.set(allIds);
  }
  clearAllPermissions() {
    this.selectedPermissions.set(/* @__PURE__ */ new Set());
  }
  isPermissionSelected(permissionId) {
    return this.selectedPermissions().has(permissionId.toString());
  }
  getFilteredGroupedPermissions() {
    const filtered = this.allPermissions().filter((p) => !this.permissionSearchTerm || p.key.toLowerCase().includes(this.permissionSearchTerm.toLowerCase()) || p.description.toLowerCase().includes(this.permissionSearchTerm.toLowerCase()));
    const grouped = /* @__PURE__ */ new Map();
    filtered.forEach((permission) => {
      const group = permission.key.split(".")[0];
      if (!grouped.has(group)) {
        grouped.set(group, []);
      }
      grouped.get(group).push(permission);
    });
    return Array.from(grouped.entries()).map(([group, permissions]) => ({
      group,
      permissions
    }));
  }
  getPermissionIcon(key) {
    if (key.includes("read"))
      return "fa-eye";
    if (key.includes("create"))
      return "fa-plus";
    if (key.includes("update"))
      return "fa-edit";
    if (key.includes("delete"))
      return "fa-trash";
    return "fa-key";
  }
  getPermissionResource(key) {
    const parts = key.split(".");
    return parts[0] || key;
  }
  getPermissionAction(key) {
    const parts = key.split(".");
    return parts[1] || "unknown";
  }
  getActionBadgeClass(key) {
    if (key.includes("read"))
      return "bg-info-subtle text-info";
    if (key.includes("create"))
      return "bg-success-subtle text-success";
    if (key.includes("update"))
      return "bg-warning-subtle text-warning";
    if (key.includes("delete"))
      return "bg-danger-subtle text-danger";
    return "bg-secondary-subtle text-secondary";
  }
  getPermissionDescription(permission) {
    return permission.description || this.i18n.t("roles.no_description");
  }
  onCancel() {
    if (this.role()) {
      this.router.navigate(["/roles", this.role().id, "view"]);
    } else {
      this.router.navigate(["/roles"]);
    }
  }
  // Form field helpers
  getFieldError(fieldName) {
    const field = this.roleForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"]) {
        return this.i18n.t("validation.required");
      }
      if (field.errors["minlength"]) {
        return this.i18n.t("validation.minlength").replace("{{min}}", field.errors["minlength"].requiredLength);
      }
    }
    return "";
  }
  isFieldInvalid(fieldName) {
    const field = this.roleForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }
  // Group management methods
  toggleGroupCollapse(groupName) {
    if (this.collapsedGroups.has(groupName)) {
      this.collapsedGroups.delete(groupName);
    } else {
      this.collapsedGroups.add(groupName);
    }
  }
  isGroupCollapsed(groupName) {
    return this.collapsedGroups.has(groupName);
  }
  selectAllGroupPermissions(group) {
    const selected = new Set(this.selectedPermissions());
    group.permissions.forEach((permission) => {
      selected.add(permission.id.toString());
    });
    this.selectedPermissions.set(selected);
  }
  deselectAllGroupPermissions(group) {
    const selected = new Set(this.selectedPermissions());
    group.permissions.forEach((permission) => {
      selected.delete(permission.id.toString());
    });
    this.selectedPermissions.set(selected);
  }
  areAllGroupPermissionsSelected(group) {
    return group.permissions.every((permission) => this.selectedPermissions().has(permission.id.toString()));
  }
  areSomeGroupPermissionsSelected(group) {
    const selectedCount = group.permissions.filter((permission) => this.selectedPermissions().has(permission.id.toString())).length;
    return selectedCount > 0 && selectedCount < group.permissions.length;
  }
  toggleGroupSelection(group) {
    if (this.areAllGroupPermissionsSelected(group)) {
      this.deselectAllGroupPermissions(group);
    } else {
      this.selectAllGroupPermissions(group);
    }
  }
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t("errors.unknown");
  }
};
__name(_EditRoleComponent, "EditRoleComponent");
__publicField(_EditRoleComponent, "\u0275fac", /* @__PURE__ */ __name(function EditRoleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditRoleComponent)();
}, "EditRoleComponent_Factory"));
__publicField(_EditRoleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditRoleComponent, selectors: [["app-edit-role"]], decls: 21, vars: 7, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/dashboard"], ["routerLink", "/roles"], [1, "breadcrumb-item", "active"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-arrow-left", "me-2"], [1, "d-flex", "justify-content-center", "py-5"], [1, "card"], [1, "alert", "alert-danger"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fa-solid", "fa-user-shield", "me-2"], [1, "card-body"], [3, "ngSubmit", "formGroup"], ["role", "alert", 1, "alert", "alert-danger"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], ["type", "text", "formControlName", "name", 1, "form-control", 3, "placeholder", "disabled"], [1, "invalid-feedback"], [1, "form-text", "text-warning"], [1, "form-control-plaintext"], [1, "badge", "bg-warning-subtle", "text-warning"], [1, "badge", "bg-success-subtle", "text-success"], [1, "mt-4"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "mb-0"], [1, "fa-solid", "fa-key", "me-2"], ["role", "group", 1, "btn-group", "btn-group-sm"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "disabled"], [1, "fa-solid", "fa-check-double", "me-1"], [1, "fa-solid", "fa-times", "me-1"], [1, "alert", "alert-info", "py-2", "px-3", "mb-3"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "mb-3"], [1, "input-group"], [1, "input-group-text"], [1, "fa-solid", "fa-search"], ["type", "text", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions", "placeholder", "disabled"], [1, "permissions-list", "border", "rounded", "p-3", 2, "max-height", "400px", "overflow-y", "auto"], [1, "permission-group", "mb-4"], [1, "text-center", "py-4"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-save", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], [1, "fa-solid", "fa-shield-alt", "me-1"], [1, "fa-solid", "fa-user-cog", "me-1"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3", "border-bottom", "pb-2"], [1, "d-flex", "align-items-center"], ["type", "button", 1, "btn", "btn-sm", "btn-link", "text-decoration-none", "p-0", "me-2", 3, "click", "disabled", "title"], [1, "fas", 3, "ngClass"], [1, "fw-bold", "text-primary", "mb-0"], [1, "fas", "fa-layer-group", "me-2"], [1, "text-muted", "fw-normal"], ["type", "button", 1, "btn", 3, "click", "disabled", "title"], [1, "row", "g-2"], [1, "col-md-6", "col-lg-4"], [1, "permission-item", "border", "rounded", "p-2"], [1, "form-check", "d-flex", "align-items-start"], ["type", "checkbox", 1, "form-check-input", "mt-1", 3, "change", "id", "checked", "disabled"], [1, "form-check-content", "ms-2", "flex-grow-1"], [1, "d-flex", "align-items-center", "mb-1"], [1, "fas", "me-1", "text-muted", 2, "font-size", "0.75rem", 3, "ngClass"], [1, "form-check-label", "fw-medium", "me-2", 3, "for"], [1, "badge", 2, "font-size", "0.65rem", 3, "ngClass"], [1, "text-muted", "small", "mb-0", 2, "font-size", "0.7rem", "margin-left", "1.25rem"], [1, "fa-solid", "fa-key", "fa-2x", "text-muted", "mb-2"], [1, "text-muted", "mb-0"]], template: /* @__PURE__ */ __name(function EditRoleComponent_Template(rf, ctx) {
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
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditRoleComponent_Template_button_click_15_listener() {
      return ctx.onCancel();
    }, "EditRoleComponent_Template_button_click_15_listener"));
    \u0275\u0275element(16, "i", 9);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, EditRoleComponent_Conditional_18_Template, 4, 1, "div", 10)(19, EditRoleComponent_Conditional_19_Template, 56, 32, "div", 11)(20, EditRoleComponent_Conditional_20_Template, 3, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("roles.edit_role"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.i18n.t("dashboard.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("roles.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.i18n.t("roles.edit_role"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 18 : ctx.role() ? 19 : 20);
  }
}, "EditRoleComponent_Template"), dependencies: [CommonModule, NgClass, RouterModule, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormsModule, NgModel], encapsulation: 2 }));
var EditRoleComponent = _EditRoleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditRoleComponent, [{
    type: Component,
    args: [{
      selector: "app-edit-role",
      standalone: true,
      imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
      template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('roles.edit_role') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/roles">{{ i18n.t('roles.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('roles.edit_role') }}</li>
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
      } @else if (role()) {
        <!-- Main Form Card -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="fa-solid fa-user-shield me-2"></i>
              {{ i18n.t('roles.role_information') }}
            </h5>
          </div>
          <div class="card-body">
            <form [formGroup]="roleForm" (ngSubmit)="onSubmit()">
              @if (error()) {
                <div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-exclamation-triangle me-2"></i>
                  {{ error() }}
                </div>
              }

              <!-- Role Name -->
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">
                    {{ i18n.t('roles.name') }}
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="name"
                    [class.is-invalid]="isFieldInvalid('name')"
                    [placeholder]="i18n.t('roles.name_placeholder')"
                    [disabled]="role()?.isSystem || false"
                  />
                  @if (isFieldInvalid('name')) {
                    <div class="invalid-feedback">{{ getFieldError('name') }}</div>
                  }
                  @if (role()?.isSystem) {
                    <div class="form-text text-warning">
                      <i class="fa-solid fa-shield-alt me-1"></i>
                      {{ i18n.t('roles.system_role_name_readonly') }}
                    </div>
                  }
                </div>

                <div class="col-md-6">
                  <label class="form-label">{{ i18n.t('roles.type') }}</label>
                  <div class="form-control-plaintext">
                    @if (role()?.isSystem) {
                      <span class="badge bg-warning-subtle text-warning">
                        <i class="fa-solid fa-shield-alt me-1"></i>
                        {{ i18n.t('roles.system') }}
                      </span>
                    } @else {
                      <span class="badge bg-success-subtle text-success">
                        <i class="fa-solid fa-user-cog me-1"></i>
                        {{ i18n.t('roles.custom') }}
                      </span>
                    }
                  </div>
                </div>
              </div>

              <!-- Permissions Section -->
              <div class="mt-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 class="mb-0">
                    <i class="fa-solid fa-key me-2"></i>
                    {{ i18n.t('roles.permissions') }}
                  </h6>
                  <div class="btn-group btn-group-sm" role="group">
                    <button 
                      type="button" 
                      class="btn btn-outline-primary"
                      (click)="selectAllPermissions()"
                      [disabled]="saving()"
                    >
                      <i class="fa-solid fa-check-double me-1"></i>
                      {{ i18n.t('roles.select_all') }}
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-outline-secondary"
                      (click)="clearAllPermissions()"
                      [disabled]="saving()"
                    >
                      <i class="fa-solid fa-times me-1"></i>
                      {{ i18n.t('roles.clear_all') }}
                    </button>
                  </div>
                </div>

                <!-- Selected permissions summary -->
                <div class="alert alert-info py-2 px-3 mb-3">
                  <small>
                    <i class="fa-solid fa-info-circle me-2"></i>
                    {{ selectedPermissions().size }} {{ i18n.t('roles.permissions_selected') }} {{ i18n.t('common.of') }} {{ allPermissions().length }}
                  </small>
                </div>
                
                <!-- Permissions search -->
                <div class="mb-3">
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa-solid fa-search"></i>
                    </span>
                    <input 
                      type="text" 
                      class="form-control" 
                      [(ngModel)]="permissionSearchTerm"
                      [ngModelOptions]="{standalone: true}"
                      [placeholder]="i18n.t('roles.search_permissions_placeholder')"
                      [disabled]="saving()"
                    />
                  </div>
                </div>
                
                <!-- Permissions List -->
                <div class="permissions-list border rounded p-3" style="max-height: 400px; overflow-y: auto;">
                  @for (group of getFilteredGroupedPermissions(); track group.group) {
                    <div class="permission-group mb-4">
                      <!-- Group Header with Actions -->
                      <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                        <div class="d-flex align-items-center">
                          <!-- Collapse/Expand Button -->
                          <button
                            type="button"
                            class="btn btn-sm btn-link text-decoration-none p-0 me-2"
                            (click)="toggleGroupCollapse(group.group)"
                            [disabled]="saving()"
                            [title]="isGroupCollapsed(group.group) ? i18n.t('common.expand') : i18n.t('common.collapse')">
                            <i class="fas" [ngClass]="isGroupCollapsed(group.group) ? 'fa-chevron-right' : 'fa-chevron-down'"></i>
                          </button>

                          <h6 class="fw-bold text-primary mb-0">
                            <i class="fas fa-layer-group me-2"></i>
                            {{ group.group }}
                            <small class="text-muted fw-normal">({{ group.permissions.length }} {{ i18n.t('roles.permissions') }})</small>
                          </h6>
                        </div>

                        <!-- Group Actions -->
                        <div class="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            class="btn"
                            [class.btn-primary]="areAllGroupPermissionsSelected(group)"
                            [class.btn-outline-primary]="!areAllGroupPermissionsSelected(group)"
                            (click)="toggleGroupSelection(group)"
                            [disabled]="saving()"
                            [title]="areAllGroupPermissionsSelected(group) ? i18n.t('roles.deselect_all_group') : i18n.t('roles.select_all_group')">
                            <i class="fas"
                               [ngClass]="areAllGroupPermissionsSelected(group) ? 'fa-check-square' : (areSomeGroupPermissionsSelected(group) ? 'fa-minus-square' : 'fa-square')"></i>
                            {{ areAllGroupPermissionsSelected(group) ? i18n.t('roles.deselect_all') : i18n.t('roles.select_all') }}
                          </button>
                        </div>
                      </div>

                      <!-- Permissions Grid (Collapsible) -->
                      @if (!isGroupCollapsed(group.group)) {
                        <div class="row g-2">
                        @for (permission of group.permissions; track permission.id) {
                          <div class="col-md-6 col-lg-4">
                            <div class="permission-item border rounded p-2" 
                                 [class.bg-light]="isPermissionSelected(permission.id)">
                              <div class="form-check d-flex align-items-start">
                                <input
                                  class="form-check-input mt-1"
                                  type="checkbox"
                                  [id]="'permission-' + permission.id"
                                  [checked]="isPermissionSelected(permission.id)"
                                  [disabled]="saving()"
                                  (change)="onTogglePermission(permission)"
                                />
                                <div class="form-check-content ms-2 flex-grow-1">
                                  <div class="d-flex align-items-center mb-1">
                                    <i class="fas me-1 text-muted" [ngClass]="getPermissionIcon(permission.key)" style="font-size: 0.75rem;"></i>
                                    <label class="form-check-label fw-medium me-2" [for]="'permission-' + permission.id">
                                      <small>{{ getPermissionResource(permission.key) }}</small>
                                    </label>
                                    <span class="badge" [ngClass]="getActionBadgeClass(permission.key)" style="font-size: 0.65rem;">
                                      {{ getPermissionAction(permission.key) }}
                                    </span>
                                  </div>
                                  <p class="text-muted small mb-0" style="font-size: 0.7rem; margin-left: 1.25rem;">
                                    {{ getPermissionDescription(permission) }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                        </div>
                      }
                    </div>
                  }
                  
                  @if (getFilteredGroupedPermissions().length === 0) {
                    <div class="text-center py-4">
                      <i class="fa-solid fa-key fa-2x text-muted mb-2"></i>
                      <p class="text-muted mb-0">{{ i18n.t('roles.no_permissions_available') }}</p>
                    </div>
                  }
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
                  [disabled]="roleForm.invalid || saving()"
                >
                  @if (saving()) {
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  } @else {
                    <i class="fa-solid fa-save me-2"></i>
                  }
                  {{ saving() ? i18n.t('common.saving') : i18n.t('roles.update_role') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('roles.role_not_found') }}
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditRoleComponent, { className: "EditRoleComponent", filePath: "src/app/pages/roles/edit-role/edit-role.component.ts", lineNumber: 284 });
})();
export {
  EditRoleComponent
};
//# sourceMappingURL=chunk-MCYT2AGT.js.map
