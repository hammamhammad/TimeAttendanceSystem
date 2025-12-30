import {
  FormHeaderComponent
} from "./chunk-KM5VSJTZ.js";
import {
  FormSectionComponent
} from "./chunk-I3BAAGQQ.js";
import {
  RolesService
} from "./chunk-EHLSZ7TE.js";
import "./chunk-HT4DZZW3.js";
import {
  PermissionUtils
} from "./chunk-6LEZROWG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import "./chunk-HZ2IZU2F.js";
import {
  Router,
  RouterModule
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
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
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/roles/create-role/create-role.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.group, "_forTrack0");
var _forTrack1 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack1");
function CreateRoleComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 4)(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("common.loading"));
  }
}
__name(CreateRoleComponent_Conditional_2_Template, "CreateRoleComponent_Conditional_2_Template");
function CreateRoleComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(CreateRoleComponent_Conditional_3_Conditional_2_Template, "CreateRoleComponent_Conditional_3_Conditional_2_Template");
function CreateRoleComponent_Conditional_3_For_33_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45)(2, "div", 46)(3, "input", 47);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_For_33_Conditional_14_For_2_Template_input_change_3_listener() {
      const permission_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onTogglePermissionForRole(permission_r6));
    }, "CreateRoleComponent_Conditional_3_For_33_Conditional_14_For_2_Template_input_change_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 48)(5, "div", 49);
    \u0275\u0275element(6, "i", 50);
    \u0275\u0275elementStart(7, "label", 51)(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 52);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 53);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const permission_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-primary-subtle", ctx_r0.isPermissionSelectedForRole(permission_r6.id))("border-primary", ctx_r0.isPermissionSelectedForRole(permission_r6.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "permission-" + permission_r6.id)("checked", ctx_r0.isPermissionSelectedForRole(permission_r6.id))("disabled", ctx_r0.submitting());
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
__name(CreateRoleComponent_Conditional_3_For_33_Conditional_14_For_2_Template, "CreateRoleComponent_Conditional_3_For_33_Conditional_14_For_2_Template");
function CreateRoleComponent_Conditional_3_For_33_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, CreateRoleComponent_Conditional_3_For_33_Conditional_14_For_2_Template, 14, 13, "div", 44, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(group_r4.permissions);
  }
}
__name(CreateRoleComponent_Conditional_3_For_33_Conditional_14_Template, "CreateRoleComponent_Conditional_3_For_33_Conditional_14_Template");
function CreateRoleComponent_Conditional_3_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 36)(2, "div", 37)(3, "button", 38);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_For_33_Template_button_click_3_listener() {
      const group_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleGroupCollapse(group_r4.group));
    }, "CreateRoleComponent_Conditional_3_For_33_Template_button_click_3_listener"));
    \u0275\u0275element(4, "i", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h6", 40);
    \u0275\u0275element(6, "i", 41);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "small", 42);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 15)(11, "button", 43);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_For_33_Template_button_click_11_listener() {
      const group_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleGroupSelection(group_r4));
    }, "CreateRoleComponent_Conditional_3_For_33_Template_button_click_11_listener"));
    \u0275\u0275element(12, "i", 39);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(14, CreateRoleComponent_Conditional_3_For_33_Conditional_14_Template, 3, 0, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.submitting())("title", ctx_r0.isGroupCollapsed(group_r4.group) ? ctx_r0.t("common.expand") : ctx_r0.t("common.collapse"));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.isGroupCollapsed(group_r4.group) ? "fa-chevron-right" : "fa-chevron-down");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", group_r4.group, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("(", group_r4.permissions.length, " ", ctx_r0.t("roles.permissions"), ")");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-primary", ctx_r0.areAllGroupPermissionsSelected(group_r4))("btn-outline-primary", !ctx_r0.areAllGroupPermissionsSelected(group_r4));
    \u0275\u0275property("disabled", ctx_r0.submitting())("title", ctx_r0.areAllGroupPermissionsSelected(group_r4) ? ctx_r0.t("roles.deselect_all_group") : ctx_r0.t("roles.select_all_group"));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.areAllGroupPermissionsSelected(group_r4) ? "fa-check-square" : ctx_r0.areSomeGroupPermissionsSelected(group_r4) ? "fa-minus-square" : "fa-square");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.areAllGroupPermissionsSelected(group_r4) ? ctx_r0.t("roles.deselect_all") : ctx_r0.t("roles.select_all"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isGroupCollapsed(group_r4.group) ? 14 : -1);
  }
}
__name(CreateRoleComponent_Conditional_3_For_33_Template, "CreateRoleComponent_Conditional_3_For_33_Template");
function CreateRoleComponent_Conditional_3_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275elementStart(2, "p", 55);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("roles.no_permissions_available"));
  }
}
__name(CreateRoleComponent_Conditional_3_Conditional_34_Template, "CreateRoleComponent_Conditional_3_Conditional_34_Template");
function CreateRoleComponent_Conditional_3_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 33);
  }
}
__name(CreateRoleComponent_Conditional_3_Conditional_40_Template, "CreateRoleComponent_Conditional_3_Conditional_40_Template");
function CreateRoleComponent_Conditional_3_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 34);
  }
}
__name(CreateRoleComponent_Conditional_3_Conditional_41_Template, "CreateRoleComponent_Conditional_3_Conditional_41_Template");
function CreateRoleComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-form-section", 3)(1, "div", 6);
    \u0275\u0275conditionalCreate(2, CreateRoleComponent_Conditional_3_Conditional_2_Template, 3, 1, "div", 7);
    \u0275\u0275elementStart(3, "form", 8);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "CreateRoleComponent_Conditional_3_Template_form_ngSubmit_3_listener"));
    \u0275\u0275elementStart(4, "app-form-section", 3)(5, "div", 9)(6, "div", 10)(7, "label", 11);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 12);
    \u0275\u0275text(10, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.roleForm.name, $event) || (ctx_r0.roleForm.name = $event);
      return \u0275\u0275resetView($event);
    }, "CreateRoleComponent_Conditional_3_Template_input_ngModelChange_11_listener"));
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(12, "hr");
    \u0275\u0275elementStart(13, "app-form-section", 3)(14, "div", 14)(15, "div", 15)(16, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectAllPermissions());
    }, "CreateRoleComponent_Conditional_3_Template_button_click_16_listener"));
    \u0275\u0275element(17, "i", 17);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearAllPermissions());
    }, "CreateRoleComponent_Conditional_3_Template_button_click_19_listener"));
    \u0275\u0275element(20, "i", 19);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 20)(23, "small");
    \u0275\u0275element(24, "i", 21);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 22)(27, "div", 23)(28, "span", 24);
    \u0275\u0275element(29, "i", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.permissionSearchTerm, $event) || (ctx_r0.permissionSearchTerm = $event);
      return \u0275\u0275resetView($event);
    }, "CreateRoleComponent_Conditional_3_Template_input_ngModelChange_30_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 27);
    \u0275\u0275repeaterCreate(32, CreateRoleComponent_Conditional_3_For_33_Template, 15, 15, "div", 28, _forTrack0);
    \u0275\u0275conditionalCreate(34, CreateRoleComponent_Conditional_3_Conditional_34_Template, 4, 1, "div", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 30)(36, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "CreateRoleComponent_Conditional_3_Template_button_click_36_listener"));
    \u0275\u0275element(37, "i", 31);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 32);
    \u0275\u0275conditionalCreate(40, CreateRoleComponent_Conditional_3_Conditional_40_Template, 1, 0, "div", 33)(41, CreateRoleComponent_Conditional_3_Conditional_41_Template, 1, 0, "i", 34);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r0.t("roles.role_information"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.error() ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.t("roles.basic_information"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("roles.role_name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.roleForm.name);
    \u0275\u0275property("placeholder", ctx_r0.t("roles.role_name_placeholder"))("disabled", ctx_r0.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.t("roles.select_permissions"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("roles.select_all"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("roles.clear_all"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate4(" ", ctx_r0.roleForm.selectedPermissions.size, " ", ctx_r0.t("roles.permissions_selected"), " ", ctx_r0.t("common.of"), " ", ctx_r0.allPermissions().length, " ");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.permissionSearchTerm);
    \u0275\u0275property("placeholder", ctx_r0.t("roles.search_permissions_placeholder"))("disabled", ctx_r0.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.getFilteredGroupedPermissions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.getFilteredGroupedPermissions().length === 0 ? 34 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.roleForm.name.trim() || ctx_r0.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.submitting() ? 40 : 41);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.submitting() ? ctx_r0.t("roles.creating_role") : ctx_r0.t("roles.create_role"), " ");
  }
}
__name(CreateRoleComponent_Conditional_3_Template, "CreateRoleComponent_Conditional_3_Template");
var _CreateRoleComponent = class _CreateRoleComponent {
  rolesService = inject(RolesService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  allPermissions = signal([], ...ngDevMode ? [{ debugName: "allPermissions" }] : []);
  groupedPermissions = signal([], ...ngDevMode ? [{ debugName: "groupedPermissions" }] : []);
  // Form state
  roleForm = {
    name: "",
    selectedPermissions: /* @__PURE__ */ new Set()
  };
  // Filter state
  permissionSearchTerm = "";
  // Collapse state for permission groups
  collapsedGroups = /* @__PURE__ */ new Set();
  ngOnInit() {
    this.loadPermissions();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadPermissions() {
    this.loading.set(true);
    this.rolesService.getPermissions().subscribe({
      next: /* @__PURE__ */ __name((permissions) => {
        this.allPermissions.set(permissions);
        this.groupedPermissions.set(this.groupPermissionsByGroup(permissions));
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load permissions:", error);
        this.error.set(this.t("roles.failed_to_load_permissions"));
        this.loading.set(false);
        this.notificationService.error(this.t("app.error"), this.t("roles.failed_to_load_permissions"));
      }, "error")
    });
  }
  groupPermissionsByGroup(permissions) {
    const grouped = permissions.reduce((acc, permission) => {
      const group = permission.group || "General";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(permission);
      return acc;
    }, {});
    return Object.entries(grouped).map(([group, permissions2]) => ({
      group,
      permissions: permissions2.sort((a, b) => a.key.localeCompare(b.key))
    }));
  }
  onSubmit() {
    if (!this.roleForm.name.trim()) {
      this.error.set(this.t("roles.role_name_required"));
      return;
    }
    this.submitting.set(true);
    this.error.set(null);
    const request = {
      name: this.roleForm.name.trim(),
      permissionIds: Array.from(this.roleForm.selectedPermissions)
    };
    this.rolesService.createRole(request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.notificationService.success(this.t("app.success"), this.t("roles.role_created_successfully"));
        this.router.navigate(["/roles"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to create role:", error);
        this.error.set(this.getErrorMessage(error));
        this.submitting.set(false);
        this.notificationService.error(this.t("app.error"), this.getErrorMessage(error));
      }, "error")
    });
  }
  onCancel() {
    this.router.navigate(["/roles"]);
  }
  onTogglePermissionForRole(permission) {
    if (this.roleForm.selectedPermissions.has(permission.id)) {
      this.roleForm.selectedPermissions.delete(permission.id);
    } else {
      this.roleForm.selectedPermissions.add(permission.id);
    }
  }
  isPermissionSelectedForRole(permissionId) {
    return this.roleForm.selectedPermissions.has(permissionId);
  }
  selectAllPermissions() {
    this.allPermissions().forEach((permission) => {
      this.roleForm.selectedPermissions.add(permission.id);
    });
  }
  clearAllPermissions() {
    this.roleForm.selectedPermissions.clear();
  }
  getFilteredGroupedPermissions() {
    if (!this.permissionSearchTerm.trim()) {
      return this.groupedPermissions();
    }
    const searchTerm = this.permissionSearchTerm.toLowerCase();
    return this.groupedPermissions().map((group) => __spreadProps(__spreadValues({}, group), {
      permissions: group.permissions.filter((permission) => permission.key.toLowerCase().includes(searchTerm) || permission.description && permission.description.toLowerCase().includes(searchTerm))
    })).filter((group) => group.permissions.length > 0);
  }
  // Permission utility methods (similar to those in roles.component.ts)
  getPermissionIcon(key) {
    const { resource } = PermissionUtils.parsePermissionKey(key);
    return PermissionUtils.getResourceIcon(resource);
  }
  getPermissionResource(key) {
    const { resource } = PermissionUtils.parsePermissionKey(key);
    return PermissionUtils.getResourceName(resource);
  }
  getPermissionAction(key) {
    const { action } = PermissionUtils.parsePermissionKey(key);
    return PermissionUtils.getActionName(action);
  }
  getActionBadgeClass(key) {
    const { action } = PermissionUtils.parsePermissionKey(key);
    return PermissionUtils.getActionBadgeClass(action);
  }
  getPermissionDescription(permission) {
    return permission.description || this.t("roles.no_description");
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
    group.permissions.forEach((permission) => {
      this.roleForm.selectedPermissions.add(permission.id);
    });
  }
  deselectAllGroupPermissions(group) {
    group.permissions.forEach((permission) => {
      this.roleForm.selectedPermissions.delete(permission.id);
    });
  }
  areAllGroupPermissionsSelected(group) {
    return group.permissions.every((permission) => this.roleForm.selectedPermissions.has(permission.id));
  }
  areSomeGroupPermissionsSelected(group) {
    const selectedCount = group.permissions.filter((permission) => this.roleForm.selectedPermissions.has(permission.id)).length;
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
    if (error?.error?.message) {
      return error.error.message;
    }
    return this.t("roles.failed_to_create_role");
  }
};
__name(_CreateRoleComponent, "CreateRoleComponent");
__publicField(_CreateRoleComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateRoleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateRoleComponent)();
}, "CreateRoleComponent_Factory"));
__publicField(_CreateRoleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateRoleComponent, selectors: [["app-create-role"]], decls: 4, vars: 3, consts: [[1, "container-fluid"], ["mode", "create", "moduleName", "roles", "moduleRoute", "roles", 3, "title", "loading"], [1, "d-flex", "justify-content-center", "py-5"], [3, "title"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [1, "card-body"], ["role", "alert", 1, "alert", "alert-danger"], [3, "ngSubmit"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], ["type", "text", "name", "roleName", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], [1, "d-flex", "justify-content-end", "align-items-center", "mb-3"], ["role", "group", 1, "btn-group", "btn-group-sm"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "disabled"], [1, "fa-solid", "fa-check-double", "me-1"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-times", "me-1"], [1, "alert", "alert-info", "py-2", "px-3", "mb-3"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "mb-3"], [1, "input-group"], [1, "input-group-text"], [1, "fa-solid", "fa-search"], ["type", "text", "name", "permissionSearch", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], [1, "permissions-list", "border", "rounded", "p-3", 2, "max-height", "500px", "overflow-y", "auto"], [1, "permission-group", "mb-4"], [1, "text-center", "py-4"], [1, "d-flex", "justify-content-end", "gap-2"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-save", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3", "border-bottom", "pb-2"], [1, "d-flex", "align-items-center"], ["type", "button", 1, "btn", "btn-sm", "btn-link", "text-decoration-none", "p-0", "me-2", 3, "click", "disabled", "title"], [1, "fas", 3, "ngClass"], [1, "fw-bold", "text-primary", "mb-0"], [1, "fas", "fa-layer-group", "me-2"], [1, "text-muted", "fw-normal"], ["type", "button", 1, "btn", 3, "click", "disabled", "title"], [1, "col-md-6", "col-lg-4"], [1, "permission-item", "border", "rounded", "p-3"], [1, "form-check", "d-flex", "align-items-start"], ["type", "checkbox", 1, "form-check-input", "mt-1", 3, "change", "id", "checked", "disabled"], [1, "form-check-content", "ms-2", "flex-grow-1"], [1, "d-flex", "align-items-center", "mb-1"], [1, "fas", "me-2", "text-muted", 2, "font-size", "0.8rem", 3, "ngClass"], [1, "form-check-label", "fw-medium", "me-2", 3, "for"], [1, "badge", 2, "font-size", "0.65rem", 3, "ngClass"], [1, "text-muted", "small", "mb-0", 2, "font-size", "0.75rem", "margin-left", "1.5rem"], [1, "fa-solid", "fa-key", "fa-2x", "text-muted", "mb-2"], [1, "text-muted", "mb-0"]], template: /* @__PURE__ */ __name(function CreateRoleComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, CreateRoleComponent_Conditional_2_Template, 4, 1, "div", 2)(3, CreateRoleComponent_Conditional_3_Template, 43, 25, "app-form-section", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("roles.create_role"))("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : 3);
  }
}, "CreateRoleComponent_Template"), dependencies: [CommonModule, NgClass, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, FormHeaderComponent, FormSectionComponent], styles: ['\n\n.permission-item[_ngcontent-%COMP%] {\n  transition: all 0.2s ease-in-out;\n  cursor: pointer;\n}\n.permission-item[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.permission-item.bg-primary-subtle[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary-bg-subtle) !important;\n}\n.permission-item.border-primary[_ngcontent-%COMP%] {\n  border-color: var(--bs-primary) !important;\n}\n.permissions-list[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n}\n.permission-group[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0 !important;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n}\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.breadcrumb-item[_ngcontent-%COMP%]    + .breadcrumb-item[_ngcontent-%COMP%]::before {\n  content: ">";\n  color: var(--bs-secondary);\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.alert-info[_ngcontent-%COMP%] {\n  background-color: var(--bs-info-bg-subtle);\n  border-color: var(--bs-info-border-subtle);\n  color: var(--bs-info-text-emphasis);\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: var(--bs-primary) !important;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-secondary);\n  border-color: var(--bs-secondary);\n}\n@media (max-width: 768px) {\n  .col-md-6[_ngcontent-%COMP%], \n   .col-lg-4[_ngcontent-%COMP%] {\n    margin-bottom: 0.75rem;\n  }\n  .permission-item[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .btn-group-sm[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n  .btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    margin-bottom: 0.25rem;\n  }\n}\n/*# sourceMappingURL=create-role.component.css.map */'] }));
var CreateRoleComponent = _CreateRoleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateRoleComponent, [{
    type: Component,
    args: [{ selector: "app-create-role", standalone: true, imports: [CommonModule, FormsModule, RouterModule, FormHeaderComponent, FormSectionComponent], template: `<div class="container-fluid">
  <!-- Header -->
  <app-form-header
    mode="create"
    [title]="t('roles.create_role')"
    moduleName="roles"
    moduleRoute="roles"
    [loading]="submitting()">
  </app-form-header>

  @if (loading()) {
    <div class="d-flex justify-content-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">{{ t('common.loading') }}</span>
      </div>
    </div>
  } @else {
    <!-- Main Form -->
    <app-form-section [title]="t('roles.role_information')">
      <div class="card-body">
        @if (error()) {
          <div class="alert alert-danger" role="alert">
            <i class="fa-solid fa-exclamation-triangle me-2"></i>
            {{ error() }}
          </div>
        }

        <form (ngSubmit)="onSubmit()">
          <!-- Basic Information Section -->
          <app-form-section [title]="t('roles.basic_information')">
            <!-- Role Name -->
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">
                  {{ t('roles.role_name') }}
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  [(ngModel)]="roleForm.name"
                  name="roleName"
                  [placeholder]="t('roles.role_name_placeholder')"
                  [disabled]="submitting()"
                  required
                />
              </div>
            </div>
          </app-form-section>

          <hr>

          <!-- Permissions Section -->
          <app-form-section [title]="t('roles.select_permissions')">
            <div class="d-flex justify-content-end align-items-center mb-3">
              <div class="btn-group btn-group-sm" role="group">
                <button 
                  type="button" 
                  class="btn btn-outline-primary"
                  (click)="selectAllPermissions()"
                  [disabled]="submitting()"
                >
                  <i class="fa-solid fa-check-double me-1"></i>
                  {{ t('roles.select_all') }}
                </button>
                <button 
                  type="button" 
                  class="btn btn-outline-secondary"
                  (click)="clearAllPermissions()"
                  [disabled]="submitting()"
                >
                  <i class="fa-solid fa-times me-1"></i>
                  {{ t('roles.clear_all') }}
                </button>
              </div>
            </div>

            <!-- Selected permissions summary -->
            <div class="alert alert-info py-2 px-3 mb-3">
              <small>
                <i class="fa-solid fa-info-circle me-2"></i>
                {{ roleForm.selectedPermissions.size }} {{ t('roles.permissions_selected') }} {{ t('common.of') }} {{ allPermissions().length }}
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
                  name="permissionSearch"
                  [placeholder]="t('roles.search_permissions_placeholder')"
                  [disabled]="submitting()"
                />
              </div>
            </div>
            
            <!-- Permissions List -->
            <div class="permissions-list border rounded p-3" style="max-height: 500px; overflow-y: auto;">
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
                        [disabled]="submitting()"
                        [title]="isGroupCollapsed(group.group) ? t('common.expand') : t('common.collapse')">
                        <i class="fas" [ngClass]="isGroupCollapsed(group.group) ? 'fa-chevron-right' : 'fa-chevron-down'"></i>
                      </button>

                      <h6 class="fw-bold text-primary mb-0">
                        <i class="fas fa-layer-group me-2"></i>
                        {{ group.group }}
                        <small class="text-muted fw-normal">({{ group.permissions.length }} {{ t('roles.permissions') }})</small>
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
                        [disabled]="submitting()"
                        [title]="areAllGroupPermissionsSelected(group) ? t('roles.deselect_all_group') : t('roles.select_all_group')">
                        <i class="fas"
                           [ngClass]="areAllGroupPermissionsSelected(group) ? 'fa-check-square' : (areSomeGroupPermissionsSelected(group) ? 'fa-minus-square' : 'fa-square')"></i>
                        {{ areAllGroupPermissionsSelected(group) ? t('roles.deselect_all') : t('roles.select_all') }}
                      </button>
                    </div>
                  </div>

                  <!-- Permissions Grid (Collapsible) -->
                  @if (!isGroupCollapsed(group.group)) {
                    <div class="row g-3">
                    @for (permission of group.permissions; track permission.id) {
                      <div class="col-md-6 col-lg-4">
                        <div class="permission-item border rounded p-3" 
                             [class.bg-primary-subtle]="isPermissionSelectedForRole(permission.id)"
                             [class.border-primary]="isPermissionSelectedForRole(permission.id)">
                          <div class="form-check d-flex align-items-start">
                            <input
                              class="form-check-input mt-1"
                              type="checkbox"
                              [id]="'permission-' + permission.id"
                              [checked]="isPermissionSelectedForRole(permission.id)"
                              [disabled]="submitting()"
                              (change)="onTogglePermissionForRole(permission)"
                            />
                            <div class="form-check-content ms-2 flex-grow-1">
                              <div class="d-flex align-items-center mb-1">
                                <i class="fas me-2 text-muted" [ngClass]="getPermissionIcon(permission.key)" style="font-size: 0.8rem;"></i>
                                <label class="form-check-label fw-medium me-2" [for]="'permission-' + permission.id">
                                  <small>{{ getPermissionResource(permission.key) }}</small>
                                </label>
                                <span class="badge" [ngClass]="getActionBadgeClass(permission.key)" style="font-size: 0.65rem;">
                                  {{ getPermissionAction(permission.key) }}
                                </span>
                              </div>
                              <p class="text-muted small mb-0" style="font-size: 0.75rem; margin-left: 1.5rem;">
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
                  <p class="text-muted mb-0">{{ t('roles.no_permissions_available') }}</p>
                </div>
              }
            </div>
          </app-form-section>

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
              [disabled]="!roleForm.name.trim() || submitting()">
              @if (submitting()) {
                <div class="spinner-border spinner-border-sm me-2"></div>
              } @else {
                <i class="fa-solid fa-save me-2"></i>
              }
              {{ submitting() ? t('roles.creating_role') : t('roles.create_role') }}
            </button>
          </div>
        </form>
      </div>
    </app-form-section>
  }
</div>`, styles: ['/* src/app/pages/roles/create-role/create-role.component.css */\n.permission-item {\n  transition: all 0.2s ease-in-out;\n  cursor: pointer;\n}\n.permission-item:hover {\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.permission-item.bg-primary-subtle {\n  background-color: var(--bs-primary-bg-subtle) !important;\n}\n.permission-item.border-primary {\n  border-color: var(--bs-primary) !important;\n}\n.permissions-list {\n  background-color: var(--bs-light);\n}\n.permission-group:last-child {\n  margin-bottom: 0 !important;\n}\n.form-check-input:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.badge {\n  font-size: 0.7rem;\n}\n.avatar-sm {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n}\n.btn-group-sm .btn {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.breadcrumb {\n  margin-bottom: 0;\n}\n.breadcrumb-item + .breadcrumb-item::before {\n  content: ">";\n  color: var(--bs-secondary);\n}\n.card-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.alert-info {\n  background-color: var(--bs-info-bg-subtle);\n  border-color: var(--bs-info-border-subtle);\n  color: var(--bs-info-text-emphasis);\n}\n.text-primary {\n  color: var(--bs-primary) !important;\n}\n.btn-outline-primary:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-outline-secondary:hover {\n  background-color: var(--bs-secondary);\n  border-color: var(--bs-secondary);\n}\n@media (max-width: 768px) {\n  .col-md-6,\n  .col-lg-4 {\n    margin-bottom: 0.75rem;\n  }\n  .permission-item {\n    padding: 1rem;\n  }\n  .btn-group-sm {\n    flex-direction: column;\n    width: 100%;\n  }\n  .btn-group-sm .btn {\n    margin-bottom: 0.25rem;\n  }\n}\n/*# sourceMappingURL=create-role.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateRoleComponent, { className: "CreateRoleComponent", filePath: "src/app/pages/roles/create-role/create-role.component.ts", lineNumber: 20 });
})();
export {
  CreateRoleComponent
};
//# sourceMappingURL=chunk-NHFRWF5L.js.map
