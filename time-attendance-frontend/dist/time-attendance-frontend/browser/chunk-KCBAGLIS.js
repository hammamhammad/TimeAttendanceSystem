import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  RolesService
} from "./chunk-VGYB4IQS.js";
import {
  PermissionUtils
} from "./chunk-DKGIYIS4.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-54H4HALB.js";
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
function CreateRoleComponent_Conditional_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "i", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(CreateRoleComponent_Conditional_3_Conditional_6_Template, "CreateRoleComponent_Conditional_3_Conditional_6_Template");
function CreateRoleComponent_Conditional_3_For_43_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47)(2, "div", 48)(3, "input", 49);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_For_43_For_8_Template_input_change_3_listener() {
      const permission_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onTogglePermissionForRole(permission_r4));
    }, "CreateRoleComponent_Conditional_3_For_43_For_8_Template_input_change_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 50)(5, "div", 51);
    \u0275\u0275element(6, "i", 52);
    \u0275\u0275elementStart(7, "label", 53)(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 54);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 55);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const permission_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-primary-subtle", ctx_r0.isPermissionSelectedForRole(permission_r4.id))("border-primary", ctx_r0.isPermissionSelectedForRole(permission_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "permission-" + permission_r4.id)("checked", ctx_r0.isPermissionSelectedForRole(permission_r4.id))("disabled", ctx_r0.submitting());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r0.getPermissionIcon(permission_r4.key));
    \u0275\u0275advance();
    \u0275\u0275property("for", "permission-" + permission_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getPermissionResource(permission_r4.key));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.getActionBadgeClass(permission_r4.key));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getPermissionAction(permission_r4.key), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getPermissionDescription(permission_r4), " ");
  }
}
__name(CreateRoleComponent_Conditional_3_For_43_For_8_Template, "CreateRoleComponent_Conditional_3_For_43_For_8_Template");
function CreateRoleComponent_Conditional_3_For_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "h6", 43);
    \u0275\u0275element(2, "i", 44);
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "small", 45);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 15);
    \u0275\u0275repeaterCreate(7, CreateRoleComponent_Conditional_3_For_43_For_8_Template, 14, 13, "div", 46, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", group_r5.group, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", group_r5.permissions.length, " permissions)");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r5.permissions);
  }
}
__name(CreateRoleComponent_Conditional_3_For_43_Template, "CreateRoleComponent_Conditional_3_For_43_Template");
function CreateRoleComponent_Conditional_3_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275element(1, "i", 56);
    \u0275\u0275elementStart(2, "p", 57);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("roles.no_permissions_available"));
  }
}
__name(CreateRoleComponent_Conditional_3_Conditional_44_Template, "CreateRoleComponent_Conditional_3_Conditional_44_Template");
function CreateRoleComponent_Conditional_3_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 40);
  }
}
__name(CreateRoleComponent_Conditional_3_Conditional_50_Template, "CreateRoleComponent_Conditional_3_Conditional_50_Template");
function CreateRoleComponent_Conditional_3_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 41);
  }
}
__name(CreateRoleComponent_Conditional_3_Conditional_51_Template, "CreateRoleComponent_Conditional_3_Conditional_51_Template");
function CreateRoleComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 6)(2, "h5", 7);
    \u0275\u0275element(3, "i", 8);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 9);
    \u0275\u0275conditionalCreate(6, CreateRoleComponent_Conditional_3_Conditional_6_Template, 3, 1, "div", 10);
    \u0275\u0275elementStart(7, "form", 11);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "CreateRoleComponent_Conditional_3_Template_form_ngSubmit_7_listener"));
    \u0275\u0275elementStart(8, "div", 12)(9, "h6", 13);
    \u0275\u0275element(10, "i", 14);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 15)(13, "div", 16)(14, "label", 17);
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "span", 18);
    \u0275\u0275text(17, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.roleForm.name, $event) || (ctx_r0.roleForm.name = $event);
      return \u0275\u0275resetView($event);
    }, "CreateRoleComponent_Conditional_3_Template_input_ngModelChange_18_listener"));
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(19, "hr");
    \u0275\u0275elementStart(20, "div", 12)(21, "div", 20)(22, "h6", 21);
    \u0275\u0275element(23, "i", 22);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 23)(26, "button", 24);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectAllPermissions());
    }, "CreateRoleComponent_Conditional_3_Template_button_click_26_listener"));
    \u0275\u0275element(27, "i", 25);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 26);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearAllPermissions());
    }, "CreateRoleComponent_Conditional_3_Template_button_click_29_listener"));
    \u0275\u0275element(30, "i", 27);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 28)(33, "small");
    \u0275\u0275element(34, "i", 14);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 29)(37, "div", 30)(38, "span", 31);
    \u0275\u0275element(39, "i", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.permissionSearchTerm, $event) || (ctx_r0.permissionSearchTerm = $event);
      return \u0275\u0275resetView($event);
    }, "CreateRoleComponent_Conditional_3_Template_input_ngModelChange_40_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 34);
    \u0275\u0275repeaterCreate(42, CreateRoleComponent_Conditional_3_For_43_Template, 9, 2, "div", 35, _forTrack0);
    \u0275\u0275conditionalCreate(44, CreateRoleComponent_Conditional_3_Conditional_44_Template, 4, 1, "div", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 37)(46, "button", 26);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreateRoleComponent_Conditional_3_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "CreateRoleComponent_Conditional_3_Template_button_click_46_listener"));
    \u0275\u0275element(47, "i", 38);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "button", 39);
    \u0275\u0275conditionalCreate(50, CreateRoleComponent_Conditional_3_Conditional_50_Template, 1, 0, "div", 40)(51, CreateRoleComponent_Conditional_3_Conditional_51_Template, 1, 0, "i", 41);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("roles.role_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.error() ? 6 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("roles.basic_information"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("roles.role_name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.roleForm.name);
    \u0275\u0275property("placeholder", ctx_r0.t("roles.role_name_placeholder"))("disabled", ctx_r0.submitting());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("roles.select_permissions"), " ");
    \u0275\u0275advance(2);
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
    \u0275\u0275conditional(ctx_r0.getFilteredGroupedPermissions().length === 0 ? 44 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.roleForm.name.trim() || ctx_r0.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.submitting() ? 50 : 51);
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
__publicField(_CreateRoleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateRoleComponent, selectors: [["app-create-role"]], decls: 4, vars: 3, consts: [[1, "container-fluid"], ["mode", "create", "moduleName", "roles", "moduleRoute", "roles", 3, "title", "loading"], [1, "d-flex", "justify-content-center", "py-5"], [1, "card"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fa-solid", "fa-user-shield", "me-2"], [1, "card-body"], ["role", "alert", 1, "alert", "alert-danger"], [3, "ngSubmit"], [1, "mb-4"], [1, "text-primary", "mb-3"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], ["type", "text", "name", "roleName", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "mb-0"], [1, "fa-solid", "fa-key", "me-2", "text-primary"], ["role", "group", 1, "btn-group", "btn-group-sm"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "disabled"], [1, "fa-solid", "fa-check-double", "me-1"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-times", "me-1"], [1, "alert", "alert-info", "py-2", "px-3", "mb-3"], [1, "mb-3"], [1, "input-group"], [1, "input-group-text"], [1, "fa-solid", "fa-search"], ["type", "text", "name", "permissionSearch", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], [1, "permissions-list", "border", "rounded", "p-3", 2, "max-height", "500px", "overflow-y", "auto"], [1, "permission-group", "mb-4"], [1, "text-center", "py-4"], [1, "d-flex", "justify-content-end", "gap-2"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-save", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], [1, "fw-bold", "text-primary", "mb-3", "border-bottom", "pb-2"], [1, "fas", "fa-layer-group", "me-2"], [1, "text-muted", "fw-normal"], [1, "col-md-6", "col-lg-4"], [1, "permission-item", "border", "rounded", "p-3"], [1, "form-check", "d-flex", "align-items-start"], ["type", "checkbox", 1, "form-check-input", "mt-1", 3, "change", "id", "checked", "disabled"], [1, "form-check-content", "ms-2", "flex-grow-1"], [1, "d-flex", "align-items-center", "mb-1"], [1, "fas", "me-2", "text-muted", 2, "font-size", "0.8rem", 3, "ngClass"], [1, "form-check-label", "fw-medium", "me-2", 3, "for"], [1, "badge", 2, "font-size", "0.65rem", 3, "ngClass"], [1, "text-muted", "small", "mb-0", 2, "font-size", "0.75rem", "margin-left", "1.5rem"], [1, "fa-solid", "fa-key", "fa-2x", "text-muted", "mb-2"], [1, "text-muted", "mb-0"]], template: /* @__PURE__ */ __name(function CreateRoleComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, CreateRoleComponent_Conditional_2_Template, 4, 1, "div", 2)(3, CreateRoleComponent_Conditional_3_Template, 53, 25, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("roles.create_role"))("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : 3);
  }
}, "CreateRoleComponent_Template"), dependencies: [CommonModule, NgClass, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, FormHeaderComponent], styles: ['\n\n.permission-item[_ngcontent-%COMP%] {\n  transition: all 0.2s ease-in-out;\n  cursor: pointer;\n}\n.permission-item[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.permission-item.bg-primary-subtle[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary-bg-subtle) !important;\n}\n.permission-item.border-primary[_ngcontent-%COMP%] {\n  border-color: var(--bs-primary) !important;\n}\n.permissions-list[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n}\n.permission-group[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0 !important;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n}\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.breadcrumb-item[_ngcontent-%COMP%]    + .breadcrumb-item[_ngcontent-%COMP%]::before {\n  content: ">";\n  color: var(--bs-secondary);\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.alert-info[_ngcontent-%COMP%] {\n  background-color: var(--bs-info-bg-subtle);\n  border-color: var(--bs-info-border-subtle);\n  color: var(--bs-info-text-emphasis);\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: var(--bs-primary) !important;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-secondary);\n  border-color: var(--bs-secondary);\n}\n@media (max-width: 768px) {\n  .col-md-6[_ngcontent-%COMP%], \n   .col-lg-4[_ngcontent-%COMP%] {\n    margin-bottom: 0.75rem;\n  }\n  .permission-item[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .btn-group-sm[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n  .btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    margin-bottom: 0.25rem;\n  }\n}\n/*# sourceMappingURL=create-role.component.css.map */'] }));
var CreateRoleComponent = _CreateRoleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateRoleComponent, [{
    type: Component,
    args: [{ selector: "app-create-role", standalone: true, imports: [CommonModule, FormsModule, RouterModule, FormHeaderComponent], template: `<div class="container-fluid">
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
    <div class="card">
      <div class="card-header">
        <h5 class="card-title mb-0">
          <i class="fa-solid fa-user-shield me-2"></i>
          {{ t('roles.role_information') }}
        </h5>
      </div>
      <div class="card-body">
        @if (error()) {
          <div class="alert alert-danger" role="alert">
            <i class="fa-solid fa-exclamation-triangle me-2"></i>
            {{ error() }}
          </div>
        }

        <form (ngSubmit)="onSubmit()">
          <!-- Basic Information Section -->
          <div class="mb-4">
            <h6 class="text-primary mb-3">
              <i class="fa-solid fa-info-circle me-2"></i>
              {{ t('roles.basic_information') }}
            </h6>
            
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
          </div>

          <hr>

          <!-- Permissions Section -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="mb-0">
                <i class="fa-solid fa-key me-2 text-primary"></i>
                {{ t('roles.select_permissions') }}
              </h6>
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
                  <h6 class="fw-bold text-primary mb-3 border-bottom pb-2">
                    <i class="fas fa-layer-group me-2"></i>
                    {{ group.group }}
                    <small class="text-muted fw-normal">({{ group.permissions.length }} permissions)</small>
                  </h6>
                  
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
                </div>
              }
              
              @if (getFilteredGroupedPermissions().length === 0) {
                <div class="text-center py-4">
                  <i class="fa-solid fa-key fa-2x text-muted mb-2"></i>
                  <p class="text-muted mb-0">{{ t('roles.no_permissions_available') }}</p>
                </div>
              }
            </div>
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
    </div>
  }
</div>`, styles: ['/* src/app/pages/roles/create-role/create-role.component.css */\n.permission-item {\n  transition: all 0.2s ease-in-out;\n  cursor: pointer;\n}\n.permission-item:hover {\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.permission-item.bg-primary-subtle {\n  background-color: var(--bs-primary-bg-subtle) !important;\n}\n.permission-item.border-primary {\n  border-color: var(--bs-primary) !important;\n}\n.permissions-list {\n  background-color: var(--bs-light);\n}\n.permission-group:last-child {\n  margin-bottom: 0 !important;\n}\n.form-check-input:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.badge {\n  font-size: 0.7rem;\n}\n.avatar-sm {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n}\n.btn-group-sm .btn {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.breadcrumb {\n  margin-bottom: 0;\n}\n.breadcrumb-item + .breadcrumb-item::before {\n  content: ">";\n  color: var(--bs-secondary);\n}\n.card-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.alert-info {\n  background-color: var(--bs-info-bg-subtle);\n  border-color: var(--bs-info-border-subtle);\n  color: var(--bs-info-text-emphasis);\n}\n.text-primary {\n  color: var(--bs-primary) !important;\n}\n.btn-outline-primary:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-outline-secondary:hover {\n  background-color: var(--bs-secondary);\n  border-color: var(--bs-secondary);\n}\n@media (max-width: 768px) {\n  .col-md-6,\n  .col-lg-4 {\n    margin-bottom: 0.75rem;\n  }\n  .permission-item {\n    padding: 1rem;\n  }\n  .btn-group-sm {\n    flex-direction: column;\n    width: 100%;\n  }\n  .btn-group-sm .btn {\n    margin-bottom: 0.25rem;\n  }\n}\n/*# sourceMappingURL=create-role.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateRoleComponent, { className: "CreateRoleComponent", filePath: "src/app/pages/roles/create-role/create-role.component.ts", lineNumber: 19 });
})();
export {
  CreateRoleComponent
};
//# sourceMappingURL=chunk-KCBAGLIS.js.map
