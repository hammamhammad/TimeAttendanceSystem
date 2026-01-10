import {
  ModalWrapperComponent
} from "./chunk-EDTHBJ53.js";
import {
  BadgeListComponent
} from "./chunk-RH6AREB4.js";
import {
  UsersService
} from "./chunk-Z5HBFLUG.js";
import {
  DataTableComponent
} from "./chunk-JW5UYWPK.js";
import {
  UnifiedFilterComponent
} from "./chunk-QUWZJ3AA.js";
import {
  HasPermissionDirective
} from "./chunk-WKOQYA75.js";
import "./chunk-NKWUQBPB.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import "./chunk-NHQ5PIWI.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-7XYWDBYG.js";
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
import "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
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
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-DUNHAUAW.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/users/role-management/role-management.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function RoleManagementComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "i", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(RoleManagementComponent_Conditional_2_Template, "RoleManagementComponent_Conditional_2_Template");
function RoleManagementComponent_Conditional_3_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const roleName_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(roleName_r2);
  }
}
__name(RoleManagementComponent_Conditional_3_Conditional_13_For_2_Template, "RoleManagementComponent_Conditional_3_Conditional_13_For_2_Template");
function RoleManagementComponent_Conditional_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, RoleManagementComponent_Conditional_3_Conditional_13_For_2_Template, 2, 1, "span", 18, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.user == null ? null : ctx_r0.user.roles);
  }
}
__name(RoleManagementComponent_Conditional_3_Conditional_13_Template, "RoleManagementComponent_Conditional_3_Conditional_13_Template");
function RoleManagementComponent_Conditional_3_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.t("users.no_roles"));
  }
}
__name(RoleManagementComponent_Conditional_3_Conditional_14_Template, "RoleManagementComponent_Conditional_3_Conditional_14_Template");
function RoleManagementComponent_Conditional_3_div_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 23)(2, "span", 24);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("common.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("users.updating_roles"));
  }
}
__name(RoleManagementComponent_Conditional_3_div_15_Conditional_3_Template, "RoleManagementComponent_Conditional_3_div_15_Conditional_3_Template");
function RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_input_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 34);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_input_2_Template_input_change_0_listener() {
      \u0275\u0275restoreView(_r3);
      const role_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onToggleRole(role_r4));
    }, "RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_input_2_Template_input_change_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("id", "role-" + role_r4.id)("checked", ctx_r0.isRoleAssigned(role_r4.id))("disabled", ctx_r0.loading());
  }
}
__name(RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_input_2_Template, "RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_input_2_Template");
function RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getRoleDescription(role_r4), " ");
  }
}
__name(RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_Conditional_7_Template, "RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_Conditional_7_Template");
function RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28);
    \u0275\u0275template(2, RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_input_2_Template, 1, 3, "input", 29);
    \u0275\u0275elementStart(3, "div", 30)(4, "label", 31)(5, "span", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_Conditional_7_Template, 2, 1, "p", 33);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const role_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("loading", ctx_r0.loading());
    \u0275\u0275advance(2);
    \u0275\u0275property("appHasPermission", ctx_r0.PERMISSIONS.USER_ASSIGN_ROLE);
    \u0275\u0275advance(2);
    \u0275\u0275property("for", "role-" + role_r4.id);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getRoleBadgeClass(role_r4));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r4.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.getRoleDescription(role_r4) ? 7 : -1);
  }
}
__name(RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_Template, "RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_Template");
function RoleManagementComponent_Conditional_3_div_15_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275repeaterCreate(1, RoleManagementComponent_Conditional_3_div_15_Conditional_4_For_2_Template, 8, 8, "div", 26, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableRoles());
  }
}
__name(RoleManagementComponent_Conditional_3_div_15_Conditional_4_Template, "RoleManagementComponent_Conditional_3_div_15_Conditional_4_Template");
function RoleManagementComponent_Conditional_3_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "h6", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, RoleManagementComponent_Conditional_3_div_15_Conditional_3_Template, 6, 2, "div", 21)(4, RoleManagementComponent_Conditional_3_div_15_Conditional_4_Template, 3, 0, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("users.available_roles"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.loading() ? 3 : 4);
  }
}
__name(RoleManagementComponent_Conditional_3_div_15_Template, "RoleManagementComponent_Conditional_3_div_15_Template");
function RoleManagementComponent_Conditional_3_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "i", 36);
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("users.role_management_help"));
  }
}
__name(RoleManagementComponent_Conditional_3_div_16_Template, "RoleManagementComponent_Conditional_3_div_16_Template");
function RoleManagementComponent_Conditional_3_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "i", 37);
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("users.no_role_assignment_permission"));
  }
}
__name(RoleManagementComponent_Conditional_3_Conditional_17_Template, "RoleManagementComponent_Conditional_3_Conditional_17_Template");
function RoleManagementComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div", 8)(3, "div", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "h6", 10);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 11);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 12)(11, "h6", 13);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, RoleManagementComponent_Conditional_3_Conditional_13_Template, 3, 0, "div", 14)(14, RoleManagementComponent_Conditional_3_Conditional_14_Template, 2, 1, "p", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, RoleManagementComponent_Conditional_3_div_15_Template, 5, 2, "div", 15)(16, RoleManagementComponent_Conditional_3_div_16_Template, 4, 1, "div", 16);
    \u0275\u0275conditionalCreate(17, RoleManagementComponent_Conditional_3_Conditional_17_Template, 4, 1, "div", 17);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ((ctx_r0.user.username == null ? null : ctx_r0.user.username.charAt(0)) || "").toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.user == null ? null : ctx_r0.user.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.user == null ? null : ctx_r0.user.email);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("users.current_roles"));
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.user == null ? null : ctx_r0.user.roles) && ctx_r0.user.roles.length > 0 ? 13 : 14);
    \u0275\u0275advance(2);
    \u0275\u0275property("appHasPermission", ctx_r0.PERMISSIONS.USER_ASSIGN_ROLE);
    \u0275\u0275advance();
    \u0275\u0275property("appHasPermission", ctx_r0.PERMISSIONS.USER_ASSIGN_ROLE);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.permissionService.has(ctx_r0.PERMISSIONS.USER_ASSIGN_ROLE) ? 17 : -1);
  }
}
__name(RoleManagementComponent_Conditional_3_Template, "RoleManagementComponent_Conditional_3_Template");
var _RoleManagementComponent = class _RoleManagementComponent {
  user = null;
  show = false;
  showChange = new EventEmitter();
  rolesUpdated = new EventEmitter();
  usersService = inject(UsersService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    USER_ASSIGN_ROLE: `${PermissionResources.USER}.${PermissionActions.ASSIGN_ROLE}`,
    USER_MANAGE: `${PermissionResources.USER}.${PermissionActions.MANAGE}`
  };
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  // Mock roles data - in real app this would come from a roles service
  availableRoles = signal([
    {
      id: 1,
      name: "SystemAdmin",
      description: "Full system access with all permissions"
    },
    {
      id: 2,
      name: "Admin",
      description: "Administrative access to employee and role management"
    },
    {
      id: 3,
      name: "HROperation",
      description: "HR operations with employee management access"
    },
    {
      id: 4,
      name: "User",
      description: "Basic user access with read-only permissions"
    }
  ], ...ngDevMode ? [{ debugName: "availableRoles" }] : []);
  userRoleIds = computed(() => {
    if (!this.user)
      return [];
    return this.user.roles.map((roleName) => {
      const role = this.availableRoles().find((r) => r.name === roleName);
      return role?.id || 0;
    }).filter((id) => id > 0);
  }, ...ngDevMode ? [{ debugName: "userRoleIds" }] : []);
  ngOnInit() {
  }
  t(key) {
    return this.i18n.t(key);
  }
  isRoleAssigned(roleId) {
    return this.userRoleIds().includes(roleId);
  }
  onToggleRole(role) {
    if (!this.user)
      return;
    this.loading.set(true);
    this.error.set("");
    const isCurrentlyAssigned = this.isRoleAssigned(role.id);
    if (isCurrentlyAssigned) {
      this.removeRole(role.id);
    } else {
      this.assignRole(role.id);
    }
  }
  assignRole(roleId) {
    if (!this.user)
      return;
    const request = { roleId };
    this.usersService.assignRole(this.user.id, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.refreshUserData();
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }, "error")
    });
  }
  removeRole(roleId) {
    if (!this.user)
      return;
    this.usersService.removeRole(this.user.id, roleId).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.refreshUserData();
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }, "error")
    });
  }
  refreshUserData() {
    if (!this.user)
      return;
    this.usersService.getUserById(this.user.id).subscribe({
      next: /* @__PURE__ */ __name((updatedUser) => {
        this.loading.set(false);
        this.rolesUpdated.emit(updatedUser);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }, "error")
    });
  }
  closeModal() {
    this.show = false;
    this.showChange.emit(false);
    this.error.set("");
  }
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.t("errors.unknown");
  }
  getRoleDescription(role) {
    return role.description || "";
  }
  getRoleBadgeClass(role) {
    const roleClasses = {
      "SystemAdmin": "bg-danger",
      "Admin": "bg-warning",
      "HROperation": "bg-info",
      "User": "bg-secondary"
    };
    return roleClasses[role.name] || "bg-primary";
  }
};
__name(_RoleManagementComponent, "RoleManagementComponent");
__publicField(_RoleManagementComponent, "\u0275fac", /* @__PURE__ */ __name(function RoleManagementComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RoleManagementComponent)();
}, "RoleManagementComponent_Factory"));
__publicField(_RoleManagementComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleManagementComponent, selectors: [["app-role-management"]], inputs: { user: "user", show: "show" }, outputs: { showChange: "showChange", rolesUpdated: "rolesUpdated" }, decls: 7, vars: 8, consts: [[3, "close", "show", "title", "size", "centered", "loading"], [1, "modal-body"], ["role", "alert", 1, "alert", "alert-danger"], ["modal-footer", "", 1, "d-flex", "gap-2", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], [1, "user-info", "mb-4"], [1, "d-flex", "align-items-center"], [1, "avatar-md", "me-3"], [1, "avatar-title", "bg-primary-subtle", "text-primary", "rounded-circle"], [1, "mb-1"], [1, "text-muted", "mb-0"], [1, "current-roles", "mb-4"], [1, "mb-2"], [1, "d-flex", "flex-wrap", "gap-2"], ["class", "available-roles", 4, "appHasPermission"], ["class", "alert alert-info mt-3", "role", "alert", 4, "appHasPermission"], ["role", "alert", 1, "alert", "alert-warning", "mt-3"], [1, "badge", "bg-primary"], [1, "available-roles"], [1, "mb-3"], [1, "text-center", "py-3"], [1, "roles-list"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "text-primary"], [1, "visually-hidden"], [1, "text-muted", "mt-2", "mb-0"], [1, "role-item", 3, "loading"], [1, "role-item"], [1, "form-check", "d-flex", "align-items-start"], ["class", "form-check-input mt-1", "type", "checkbox", 3, "id", "checked", "disabled", "change", 4, "appHasPermission"], [1, "form-check-content", "ms-2", "flex-grow-1"], [1, "form-check-label", "fw-medium", 3, "for"], [1, "badge", "me-2"], [1, "text-muted", "small", "mb-0"], ["type", "checkbox", 1, "form-check-input", "mt-1", 3, "change", "id", "checked", "disabled"], ["role", "alert", 1, "alert", "alert-info", "mt-3"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "fa-solid", "fa-lock", "me-2"]], template: /* @__PURE__ */ __name(function RoleManagementComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-modal-wrapper", 0);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function RoleManagementComponent_Template_app_modal_wrapper_close_0_listener() {
      return ctx.closeModal();
    }, "RoleManagementComponent_Template_app_modal_wrapper_close_0_listener"));
    \u0275\u0275elementStart(1, "div", 1);
    \u0275\u0275conditionalCreate(2, RoleManagementComponent_Conditional_2_Template, 3, 1, "div", 2);
    \u0275\u0275conditionalCreate(3, RoleManagementComponent_Conditional_3_Template, 18, 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 3)(5, "button", 4);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function RoleManagementComponent_Template_button_click_5_listener() {
      return ctx.closeModal();
    }, "RoleManagementComponent_Template_button_click_5_listener"));
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("show", ctx.show && !!ctx.user)("title", ctx.t("users.manage_roles"))("size", "md")("centered", true)("loading", ctx.loading());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.error() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.user ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.close"), " ");
  }
}, "RoleManagementComponent_Template"), dependencies: [HasPermissionDirective, ModalWrapperComponent], styles: ["\n\n.modal.show[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-primary);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-top: 1px solid var(--bs-border-color);\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.avatar-md[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.avatar-title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.user-info[_ngcontent-%COMP%] {\n  padding: 1rem;\n  background-color: var(--bs-light);\n  border-radius: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n}\n.current-roles[_ngcontent-%COMP%] {\n  padding: 1rem;\n  background-color: var(--bs-primary-bg-subtle);\n  border-radius: 0.5rem;\n  border: 1px solid var(--bs-primary-border-subtle);\n}\n.roles-list[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow-y: auto;\n}\n.role-item[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  margin-bottom: 0.5rem;\n  background-color: var(--bs-white);\n  transition: all 0.2s ease;\n}\n.role-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-light);\n  border-color: var(--bs-primary-border-subtle);\n}\n.role-item.loading[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  pointer-events: none;\n}\n.form-check[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.form-check-input[_ngcontent-%COMP%] {\n  margin-top: 0.125rem;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.form-check-content[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  cursor: pointer;\n  line-height: 1.2;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.375rem 0.75rem;\n}\n.alert[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: var(--bs-danger-bg-subtle);\n  color: var(--bs-danger-text);\n  border-left: 4px solid var(--bs-danger);\n}\n.alert-info[_ngcontent-%COMP%] {\n  background-color: var(--bs-info-bg-subtle);\n  color: var(--bs-info-text);\n  border-left: 4px solid var(--bs-info);\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\nh6[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-primary);\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: var(--bs-secondary) !important;\n}\n.small[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.bg-danger[_ngcontent-%COMP%] {\n  background-color: var(--bs-danger) !important;\n}\n.bg-warning[_ngcontent-%COMP%] {\n  background-color: var(--bs-warning) !important;\n  color: var(--bs-primary) !important;\n}\n.bg-info[_ngcontent-%COMP%] {\n  background-color: var(--bs-info) !important;\n}\n.bg-secondary[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary) !important;\n}\n.roles-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.roles-list[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--bs-light);\n  border-radius: 3px;\n}\n.roles-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--bs-secondary);\n  border-radius: 3px;\n}\n.roles-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: var(--bs-primary);\n}\n[dir=rtl][_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {\n  margin-left: 0;\n  margin-right: -1.5em;\n}\n[dir=rtl][_ngcontent-%COMP%]   .form-check-content[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n  margin-left: 0;\n}\n[dir=rtl][_ngcontent-%COMP%]   .avatar-md[_ngcontent-%COMP%] {\n  margin-right: 0;\n  margin-left: 0.75rem;\n}\n@media (max-width: 768px) {\n  .modal-dialog[_ngcontent-%COMP%] {\n    margin: 1rem;\n    max-width: none;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .user-info[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .current-roles[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .role-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .avatar-md[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n  .avatar-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n.form-check-input[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.loading[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulse 1.5s ease-in-out infinite;\n}\n/*# sourceMappingURL=role-management.component.css.map */"] }));
var RoleManagementComponent = _RoleManagementComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleManagementComponent, [{
    type: Component,
    args: [{ selector: "app-role-management", standalone: true, imports: [HasPermissionDirective, ModalWrapperComponent], template: `<app-modal-wrapper\r
  [show]="show && !!user"\r
  [title]="t('users.manage_roles')"\r
  [size]="'md'"\r
  [centered]="true"\r
  [loading]="loading()"\r
  (close)="closeModal()">\r
\r
  <div class="modal-body">\r
          @if (error()) {\r
            <div class="alert alert-danger" role="alert">\r
              <i class="fa-solid fa-exclamation-triangle me-2"></i>\r
              {{ error() }}\r
            </div>\r
          }\r
\r
          <!-- User Info -->\r
          @if (user) {\r
            <div class="user-info mb-4">\r
              <div class="d-flex align-items-center">\r
                <div class="avatar-md me-3">\r
                  <div class="avatar-title bg-primary-subtle text-primary rounded-circle">\r
                    {{ (user.username?.charAt(0) || '').toUpperCase() }}\r
                  </div>\r
                </div>\r
                <div>\r
                  <h6 class="mb-1">{{ user?.username }}</h6>\r
                  <p class="text-muted mb-0">{{ user?.email }}</p>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Current Roles -->\r
            <div class="current-roles mb-4">\r
              <h6 class="mb-2">{{ t('users.current_roles') }}</h6>\r
              @if (user?.roles && user.roles.length > 0) {\r
                <div class="d-flex flex-wrap gap-2">\r
                  @for (roleName of user?.roles; track roleName) {\r
                    <span class="badge bg-primary">{{ roleName }}</span>\r
                  }\r
              </div>\r
            } @else {\r
              <p class="text-muted mb-0">{{ t('users.no_roles') }}</p>\r
            }\r
          </div>\r
\r
          <!-- Available Roles -->\r
          <div class="available-roles" *appHasPermission="PERMISSIONS.USER_ASSIGN_ROLE">\r
            <h6 class="mb-3">{{ t('users.available_roles') }}</h6>\r
            \r
            @if (loading()) {\r
              <div class="text-center py-3">\r
                <div class="spinner-border spinner-border-sm text-primary" role="status">\r
                  <span class="visually-hidden">{{ t('common.loading') }}</span>\r
                </div>\r
                <p class="text-muted mt-2 mb-0">{{ t('users.updating_roles') }}</p>\r
              </div>\r
            } @else {\r
              <div class="roles-list">\r
                @for (role of availableRoles(); track role.id) {\r
                  <div class="role-item" [class.loading]="loading()">\r
                    <div class="form-check d-flex align-items-start">\r
                      <input\r
                        *appHasPermission="PERMISSIONS.USER_ASSIGN_ROLE"\r
                        class="form-check-input mt-1"\r
                        type="checkbox"\r
                        [id]="'role-' + role.id"\r
                        [checked]="isRoleAssigned(role.id)"\r
                        [disabled]="loading()"\r
                        (change)="onToggleRole(role)"\r
                      />\r
                      <div class="form-check-content ms-2 flex-grow-1">\r
                        <label class="form-check-label fw-medium" [for]="'role-' + role.id">\r
                          <span class="badge me-2" [class]="getRoleBadgeClass(role)">\r
                            {{ role.name }}\r
                          </span>\r
                        </label>\r
                        @if (getRoleDescription(role)) {\r
                          <p class="text-muted small mb-0">\r
                            {{ getRoleDescription(role) }}\r
                          </p>\r
                        }\r
                      </div>\r
                    </div>\r
                  </div>\r
                }\r
              </div>\r
            }\r
          </div>\r
\r
          <!-- Help Text -->\r
          <div class="alert alert-info mt-3" role="alert" *appHasPermission="PERMISSIONS.USER_ASSIGN_ROLE">\r
            <i class="fa-solid fa-info-circle me-2"></i>\r
            <small>{{ t('users.role_management_help') }}</small>\r
          </div>\r
\r
          <!-- No Permission Message -->\r
          @if (!permissionService.has(PERMISSIONS.USER_ASSIGN_ROLE)) {\r
            <div class="alert alert-warning mt-3" role="alert">\r
              <i class="fa-solid fa-lock me-2"></i>\r
              <small>{{ t('users.no_role_assignment_permission') }}</small>\r
            </div>\r
          }\r
        }\r
  </div>\r
\r
  <div modal-footer class="d-flex gap-2 justify-content-end">\r
    <button type="button" class="btn btn-secondary" (click)="closeModal()">\r
      {{ t('common.close') }}\r
    </button>\r
  </div>\r
\r
</app-modal-wrapper>`, styles: ["/* src/app/pages/users/role-management/role-management.component.css */\n.modal.show {\n  animation: fadeIn 0.15s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-content {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title {\n  font-weight: 600;\n  color: var(--bs-primary);\n}\n.modal-body {\n  padding: 1.5rem;\n}\n.modal-footer {\n  background-color: var(--bs-light);\n  border-top: 1px solid var(--bs-border-color);\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.avatar-md {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.avatar-title {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.user-info {\n  padding: 1rem;\n  background-color: var(--bs-light);\n  border-radius: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n}\n.current-roles {\n  padding: 1rem;\n  background-color: var(--bs-primary-bg-subtle);\n  border-radius: 0.5rem;\n  border: 1px solid var(--bs-primary-border-subtle);\n}\n.roles-list {\n  max-height: 300px;\n  overflow-y: auto;\n}\n.role-item {\n  padding: 1rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  margin-bottom: 0.5rem;\n  background-color: var(--bs-white);\n  transition: all 0.2s ease;\n}\n.role-item:hover {\n  background-color: var(--bs-light);\n  border-color: var(--bs-primary-border-subtle);\n}\n.role-item.loading {\n  opacity: 0.6;\n  pointer-events: none;\n}\n.form-check {\n  margin-bottom: 0;\n}\n.form-check-input {\n  margin-top: 0.125rem;\n}\n.form-check-input:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.form-check-content {\n  min-width: 0;\n}\n.form-check-label {\n  margin-bottom: 0.25rem;\n  cursor: pointer;\n  line-height: 1.2;\n}\n.badge {\n  font-size: 0.75rem;\n  padding: 0.375rem 0.75rem;\n}\n.alert {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-danger {\n  background-color: var(--bs-danger-bg-subtle);\n  color: var(--bs-danger-text);\n  border-left: 4px solid var(--bs-danger);\n}\n.alert-info {\n  background-color: var(--bs-info-bg-subtle);\n  color: var(--bs-info-text);\n  border-left: 4px solid var(--bs-info);\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\nh6 {\n  font-weight: 600;\n  color: var(--bs-primary);\n}\n.text-muted {\n  color: var(--bs-secondary) !important;\n}\n.small {\n  font-size: 0.875rem;\n}\n.bg-danger {\n  background-color: var(--bs-danger) !important;\n}\n.bg-warning {\n  background-color: var(--bs-warning) !important;\n  color: var(--bs-primary) !important;\n}\n.bg-info {\n  background-color: var(--bs-info) !important;\n}\n.bg-secondary {\n  background-color: var(--bs-secondary) !important;\n}\n.roles-list::-webkit-scrollbar {\n  width: 6px;\n}\n.roles-list::-webkit-scrollbar-track {\n  background: var(--bs-light);\n  border-radius: 3px;\n}\n.roles-list::-webkit-scrollbar-thumb {\n  background: var(--bs-secondary);\n  border-radius: 3px;\n}\n.roles-list::-webkit-scrollbar-thumb:hover {\n  background: var(--bs-primary);\n}\n[dir=rtl] .form-check-input {\n  margin-left: 0;\n  margin-right: -1.5em;\n}\n[dir=rtl] .form-check-content {\n  margin-right: 0.5rem;\n  margin-left: 0;\n}\n[dir=rtl] .avatar-md {\n  margin-right: 0;\n  margin-left: 0.75rem;\n}\n@media (max-width: 768px) {\n  .modal-dialog {\n    margin: 1rem;\n    max-width: none;\n  }\n  .modal-body {\n    padding: 1rem;\n  }\n  .user-info {\n    padding: 0.75rem;\n  }\n  .current-roles {\n    padding: 0.75rem;\n  }\n  .role-item {\n    padding: 0.75rem;\n  }\n  .avatar-md {\n    width: 40px;\n    height: 40px;\n  }\n  .avatar-title {\n    font-size: 1rem;\n  }\n}\n.form-check-input:focus {\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n@keyframes pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.loading {\n  animation: pulse 1.5s ease-in-out infinite;\n}\n/*# sourceMappingURL=role-management.component.css.map */\n"] }]
  }], null, { user: [{
    type: Input
  }], show: [{
    type: Input
  }], showChange: [{
    type: Output
  }], rolesUpdated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleManagementComponent, { className: "RoleManagementComponent", filePath: "src/app/pages/users/role-management/role-management.component.ts", lineNumber: 24 });
})();

// src/app/pages/users/user-table/user-table.component.ts
function UserTableComponent_ng_template_1_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 4)(2, "div", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div")(5, "div", 3);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 6);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getInitials(user_r2.firstName, user_r2.lastName), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", user_r2.firstName, " ", user_r2.lastName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.email);
  }
}
__name(UserTableComponent_ng_template_1_Case_0_Template, "UserTableComponent_ng_template_1_Case_0_Template");
function UserTableComponent_ng_template_1_Case_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275element(1, "i", 8);
    \u0275\u0275elementEnd();
  }
}
__name(UserTableComponent_ng_template_1_Case_1_Conditional_2_Template, "UserTableComponent_ng_template_1_Case_1_Conditional_2_Template");
function UserTableComponent_ng_template_1_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, UserTableComponent_ng_template_1_Case_1_Conditional_2_Template, 2, 0, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r2.username, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isSystemAdmin(user_r2) ? 2 : -1);
  }
}
__name(UserTableComponent_ng_template_1_Case_1_Template, "UserTableComponent_ng_template_1_Case_1_Template");
function UserTableComponent_ng_template_1_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "app-badge-list", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r2.getRoleBadges(user_r2.roles))("emptyMessage", "No roles assigned");
  }
}
__name(UserTableComponent_ng_template_1_Case_2_Template, "UserTableComponent_ng_template_1_Case_2_Template");
function UserTableComponent_ng_template_1_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "app-status-badge", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("status", user_r2.isActive ? "active" : "inactive")("label", user_r2.isActive ? "Active" : "Inactive")("showIcon", true);
  }
}
__name(UserTableComponent_ng_template_1_Case_3_Template, "UserTableComponent_ng_template_1_Case_3_Template");
function UserTableComponent_ng_template_1_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "app-status-badge", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("status", ctx_r2.isUserLocked(user_r2.lockoutEndUtc) ? "warning" : "success")("label", ctx_r2.isUserLocked(user_r2.lockoutEndUtc) ? "Locked" : "Unlocked")("icon", ctx_r2.isUserLocked(user_r2.lockoutEndUtc) ? "fa-lock" : "fa-unlock")("showIcon", true);
  }
}
__name(UserTableComponent_ng_template_1_Case_4_Template, "UserTableComponent_ng_template_1_Case_4_Template");
function UserTableComponent_ng_template_1_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "app-status-badge", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("status", user_r2.mustChangePassword ? "warning" : "success")("label", user_r2.mustChangePassword ? "Must Change" : "OK")("icon", user_r2.mustChangePassword ? "fa-key" : "fa-check")("showIcon", true);
  }
}
__name(UserTableComponent_ng_template_1_Case_5_Template, "UserTableComponent_ng_template_1_Case_5_Template");
function UserTableComponent_ng_template_1_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(user_r2.createdAtUtc || user_r2.createdAt), " ");
  }
}
__name(UserTableComponent_ng_template_1_Case_6_Template, "UserTableComponent_ng_template_1_Case_6_Template");
function UserTableComponent_ng_template_1_Case_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatDate(user_r2.lastLoginAt));
  }
}
__name(UserTableComponent_ng_template_1_Case_7_Conditional_1_Template, "UserTableComponent_ng_template_1_Case_7_Conditional_1_Template");
function UserTableComponent_ng_template_1_Case_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "Never");
    \u0275\u0275elementEnd();
  }
}
__name(UserTableComponent_ng_template_1_Case_7_Conditional_2_Template, "UserTableComponent_ng_template_1_Case_7_Conditional_2_Template");
function UserTableComponent_ng_template_1_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275conditionalCreate(1, UserTableComponent_ng_template_1_Case_7_Conditional_1_Template, 2, 1, "span");
    \u0275\u0275conditionalCreate(2, UserTableComponent_ng_template_1_Case_7_Conditional_2_Template, 2, 0, "span", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r2.lastLoginAt ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!user_r2.lastLoginAt ? 2 : -1);
  }
}
__name(UserTableComponent_ng_template_1_Case_7_Template, "UserTableComponent_ng_template_1_Case_7_Template");
function UserTableComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UserTableComponent_ng_template_1_Case_0_Template, 9, 4, "div", 2)(1, UserTableComponent_ng_template_1_Case_1_Template, 3, 2, "span", 3)(2, UserTableComponent_ng_template_1_Case_2_Template, 2, 2, "div")(3, UserTableComponent_ng_template_1_Case_3_Template, 2, 3, "span")(4, UserTableComponent_ng_template_1_Case_4_Template, 2, 4, "span")(5, UserTableComponent_ng_template_1_Case_5_Template, 2, 4, "span")(6, UserTableComponent_ng_template_1_Case_6_Template, 2, 1, "span")(7, UserTableComponent_ng_template_1_Case_7_Template, 3, 2, "span");
  }
  if (rf & 2) {
    let tmp_4_0;
    const column_r4 = ctx.column;
    \u0275\u0275conditional((tmp_4_0 = column_r4.key) === "user" ? 0 : tmp_4_0 === "username" ? 1 : tmp_4_0 === "roles" ? 2 : tmp_4_0 === "status" ? 3 : tmp_4_0 === "lockStatus" ? 4 : tmp_4_0 === "mustChangePassword" ? 5 : tmp_4_0 === "created" ? 6 : tmp_4_0 === "lastLogin" ? 7 : -1);
  }
}
__name(UserTableComponent_ng_template_1_Template, "UserTableComponent_ng_template_1_Template");
var _UserTableComponent = class _UserTableComponent {
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  users = [];
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  totalPages = signal(1, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  totalItems = signal(0, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  viewUser = new EventEmitter();
  editUser = new EventEmitter();
  deleteUser = new EventEmitter();
  manageRoles = new EventEmitter();
  pageChange = new EventEmitter();
  pageSizeChange = new EventEmitter();
  selectionChange = new EventEmitter();
  sortChange = new EventEmitter();
  columns = [
    { key: "user", label: "User", width: "250px", sortable: true },
    { key: "username", label: "Username", width: "150px", sortable: true },
    { key: "roles", label: "Roles", width: "200px" },
    { key: "status", label: "Status", width: "100px", align: "center", sortable: true },
    { key: "lockStatus", label: "Access", width: "100px", align: "center" },
    { key: "mustChangePassword", label: "Password Status", width: "130px", align: "center" },
    { key: "created", label: "Created", width: "120px", sortable: true },
    { key: "lastLogin", label: "Last Login", width: "120px", sortable: true }
  ];
  get actions() {
    const actions = [];
    if (this.permissionService.has(`${PermissionResources.USER}.${PermissionActions.READ}`)) {
      actions.push({
        key: "view",
        label: "View",
        icon: "fa-eye",
        color: "info"
      });
    }
    if (this.permissionService.has(`${PermissionResources.USER}.${PermissionActions.UPDATE}`)) {
      actions.push({
        key: "edit",
        label: "Edit",
        icon: "fa-edit",
        color: "primary",
        condition: /* @__PURE__ */ __name((user) => this.canEditUser(user), "condition")
      });
      actions.push({
        key: "manageRoles",
        label: "Manage Roles",
        icon: "fa-user-tag",
        color: "warning",
        condition: /* @__PURE__ */ __name((user) => this.canEditUser(user), "condition")
      });
    }
    if (this.permissionService.has(`${PermissionResources.USER}.${PermissionActions.DELETE}`)) {
      actions.push({
        key: "delete",
        label: "Delete",
        icon: "fa-trash",
        color: "danger",
        condition: /* @__PURE__ */ __name((user) => this.canDeleteUser(user), "condition")
      });
    }
    return actions;
  }
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.viewUser.emit(item);
        break;
      case "edit":
        this.editUser.emit(item);
        break;
      case "delete":
        this.deleteUser.emit(item);
        break;
      case "manageRoles":
        this.manageRoles.emit(item);
        break;
    }
  }
  onPageChange(page) {
    this.pageChange.emit(page);
  }
  onPageSizeChange(size) {
    this.pageSizeChange.emit(size);
  }
  onSelectionChange(selectedUsers) {
    this.selectionChange.emit(selectedUsers);
  }
  onSortChange(sortEvent) {
    this.sortChange.emit(sortEvent);
  }
  getInitials(firstName, lastName) {
    const first = firstName ? firstName.charAt(0).toUpperCase() : "";
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return first + last;
  }
  isSystemAdmin(user) {
    return user.username.toLowerCase() === "systemadmin";
  }
  getRoleBadges(roles) {
    return roles.map((role) => ({
      label: role,
      variant: "secondary"
    }));
  }
  canEditUser(user) {
    return !this.isSystemAdmin(user);
  }
  canDeleteUser(user) {
    return !this.isSystemAdmin(user);
  }
  isUserLocked(lockoutEndUtc) {
    if (!lockoutEndUtc)
      return false;
    return new Date(lockoutEndUtc) > /* @__PURE__ */ new Date();
  }
  formatDate(dateString) {
    if (!dateString)
      return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
};
__name(_UserTableComponent, "UserTableComponent");
__publicField(_UserTableComponent, "\u0275fac", /* @__PURE__ */ __name(function UserTableComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UserTableComponent)();
}, "UserTableComponent_Factory"));
__publicField(_UserTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserTableComponent, selectors: [["app-user-table"]], inputs: { users: "users", loading: "loading", currentPage: "currentPage", totalPages: "totalPages", totalItems: "totalItems", pageSize: "pageSize" }, outputs: { viewUser: "viewUser", editUser: "editUser", deleteUser: "deleteUser", manageRoles: "manageRoles", pageChange: "pageChange", pageSizeChange: "pageSizeChange", selectionChange: "selectionChange", sortChange: "sortChange" }, decls: 3, vars: 11, consts: [["cellTemplate", ""], [3, "actionClick", "pageChange", "pageSizeChange", "selectionChange", "sortChange", "data", "columns", "actions", "loading", "currentPage", "totalPages", "totalItems", "pageSize", "allowSelection", "emptyMessage", "emptyTitle"], [1, "d-flex", "align-items-center"], [1, "fw-medium"], [1, "avatar-sm", "me-2"], [1, "avatar-initial", "bg-primary", "text-white", "rounded-circle"], [1, "text-muted"], ["title", "System Administrator", 1, "badge", "bg-warning", "text-dark", "ms-1"], [1, "fas", "fa-crown"], [3, "items", "emptyMessage"], [3, "status", "label", "showIcon"], [3, "status", "label", "icon", "showIcon"]], template: /* @__PURE__ */ __name(function UserTableComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-data-table", 1);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function UserTableComponent_Template_app_data_table_actionClick_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onActionClick($event));
    }, "UserTableComponent_Template_app_data_table_actionClick_0_listener"))("pageChange", /* @__PURE__ */ __name(function UserTableComponent_Template_app_data_table_pageChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageChange($event));
    }, "UserTableComponent_Template_app_data_table_pageChange_0_listener"))("pageSizeChange", /* @__PURE__ */ __name(function UserTableComponent_Template_app_data_table_pageSizeChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageSizeChange($event));
    }, "UserTableComponent_Template_app_data_table_pageSizeChange_0_listener"))("selectionChange", /* @__PURE__ */ __name(function UserTableComponent_Template_app_data_table_selectionChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSelectionChange($event));
    }, "UserTableComponent_Template_app_data_table_selectionChange_0_listener"))("sortChange", /* @__PURE__ */ __name(function UserTableComponent_Template_app_data_table_sortChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSortChange($event));
    }, "UserTableComponent_Template_app_data_table_sortChange_0_listener"));
    \u0275\u0275template(1, UserTableComponent_ng_template_1_Template, 8, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("data", ctx.users)("columns", ctx.columns)("actions", ctx.actions)("loading", ctx.loading)("currentPage", ctx.currentPage)("totalPages", ctx.totalPages)("totalItems", ctx.totalItems)("pageSize", ctx.pageSize)("allowSelection", true)("emptyMessage", "No users found")("emptyTitle", "No Users");
  }
}, "UserTableComponent_Template"), dependencies: [DataTableComponent, StatusBadgeComponent, BadgeListComponent], styles: ["\n\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.avatar-initial[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=user-table.component.css.map */"] }));
var UserTableComponent = _UserTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserTableComponent, [{
    type: Component,
    args: [{ selector: "app-user-table", standalone: true, imports: [DataTableComponent, StatusBadgeComponent, BadgeListComponent], template: `
    <app-data-table
      [data]="users"
      [columns]="columns"
      [actions]="actions"
      [loading]="loading"
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [allowSelection]="true"
      [emptyMessage]="'No users found'"
      [emptyTitle]="'No Users'"
      (actionClick)="onActionClick($event)"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
      (selectionChange)="onSelectionChange($event)"
      (sortChange)="onSortChange($event)">
    
      <ng-template #cellTemplate let-user let-column="column">
        @switch (column.key) {
          <!-- User info with avatar -->
          @case ('user') {
            <div class="d-flex align-items-center">
              <div class="avatar-sm me-2">
                <div class="avatar-initial bg-primary text-white rounded-circle">
                  {{ getInitials(user.firstName, user.lastName) }}
                </div>
              </div>
              <div>
                <div class="fw-medium">{{ user.firstName }} {{ user.lastName }}</div>
                <small class="text-muted">{{ user.email }}</small>
              </div>
            </div>
          }
          <!-- Username -->
          @case ('username') {
            <span class="fw-medium">
              {{ user.username }}
              @if (isSystemAdmin(user)) {
                <span class="badge bg-warning text-dark ms-1" title="System Administrator">
                  <i class="fas fa-crown"></i>
                </span>
              }
            </span>
          }
          <!-- Roles -->
          @case ('roles') {
            <div>
              <app-badge-list
                [items]="getRoleBadges(user.roles)"
                [emptyMessage]="'No roles assigned'">
              </app-badge-list>
            </div>
          }
          <!-- Status -->
          @case ('status') {
            <span>
              <app-status-badge
                [status]="user.isActive ? 'active' : 'inactive'"
                [label]="user.isActive ? 'Active' : 'Inactive'"
                [showIcon]="true">
              </app-status-badge>
            </span>
          }
          <!-- Lock status -->
          @case ('lockStatus') {
            <span>
              <app-status-badge
                [status]="isUserLocked(user.lockoutEndUtc) ? 'warning' : 'success'"
                [label]="isUserLocked(user.lockoutEndUtc) ? 'Locked' : 'Unlocked'"
                [icon]="isUserLocked(user.lockoutEndUtc) ? 'fa-lock' : 'fa-unlock'"
                [showIcon]="true">
              </app-status-badge>
            </span>
          }
          <!-- Must Change Password -->
          @case ('mustChangePassword') {
            <span>
              <app-status-badge
                [status]="user.mustChangePassword ? 'warning' : 'success'"
                [label]="user.mustChangePassword ? 'Must Change' : 'OK'"
                [icon]="user.mustChangePassword ? 'fa-key' : 'fa-check'"
                [showIcon]="true">
              </app-status-badge>
            </span>
          }
          <!-- Created date -->
          @case ('created') {
            <span>
              {{ formatDate(user.createdAtUtc || user.createdAt) }}
            </span>
          }
          <!-- Last login -->
          @case ('lastLogin') {
            <span>
              @if (user.lastLoginAt) {
                <span>{{ formatDate(user.lastLoginAt) }}</span>
              }
              @if (!user.lastLoginAt) {
                <span class="text-muted">Never</span>
              }
            </span>
          }
        }
      </ng-template>
    </app-data-table>
    `, styles: ["/* angular:styles/component:css;b01443c16e75437b73dd8a728713eee6579ca4d4c02199e6657f116651c97be5;D:/Work/TimeAttendanceSystem/time-attendance-frontend/src/app/pages/users/user-table/user-table.component.ts */\n.avatar-sm {\n  width: 2rem;\n  height: 2rem;\n}\n.avatar-initial {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=user-table.component.css.map */\n"] }]
  }], null, { users: [{
    type: Input
  }], loading: [{
    type: Input
  }], currentPage: [{
    type: Input
  }], totalPages: [{
    type: Input
  }], totalItems: [{
    type: Input
  }], pageSize: [{
    type: Input
  }], viewUser: [{
    type: Output
  }], editUser: [{
    type: Output
  }], deleteUser: [{
    type: Output
  }], manageRoles: [{
    type: Output
  }], pageChange: [{
    type: Output
  }], pageSizeChange: [{
    type: Output
  }], selectionChange: [{
    type: Output
  }], sortChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserTableComponent, { className: "UserTableComponent", filePath: "src/app/pages/users/user-table/user-table.component.ts", lineNumber: 140 });
})();

// src/app/pages/users/users.component.ts
var _UsersComponent = class _UsersComponent {
  usersService = inject(UsersService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  users = signal([], ...ngDevMode ? [{ debugName: "users" }] : []);
  pagedResult = signal(null, ...ngDevMode ? [{ debugName: "pagedResult" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  // Filter state
  currentFilter = {};
  // Modal state
  showRoleManagement = signal(false, ...ngDevMode ? [{ debugName: "showRoleManagement" }] : []);
  selectedUser = signal(null, ...ngDevMode ? [{ debugName: "selectedUser" }] : []);
  // Mock data for roles - in real app this would come from a roles service
  availableRoles = signal([
    { id: 1, name: "SystemAdmin" },
    { id: 2, name: "Admin" },
    { id: 3, name: "HROperation" },
    { id: 4, name: "User" }
  ], ...ngDevMode ? [{ debugName: "availableRoles" }] : []);
  // Computed signals for pagination
  totalPages = computed(() => this.pagedResult()?.totalPages || 1, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  totalItems = computed(() => this.pagedResult()?.totalItems || 0, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  // Writable signals for template binding
  totalPagesSignal = signal(1, ...ngDevMode ? [{ debugName: "totalPagesSignal" }] : []);
  totalItemsSignal = signal(0, ...ngDevMode ? [{ debugName: "totalItemsSignal" }] : []);
  // Permission constants for use in template
  PERMISSIONS = {
    USER_CREATE: `${PermissionResources.USER}.${PermissionActions.CREATE}`,
    USER_READ: `${PermissionResources.USER}.${PermissionActions.READ}`,
    USER_UPDATE: `${PermissionResources.USER}.${PermissionActions.UPDATE}`,
    USER_DELETE: `${PermissionResources.USER}.${PermissionActions.DELETE}`,
    USER_ASSIGN_ROLE: `${PermissionResources.USER}.${PermissionActions.ASSIGN_ROLE}`,
    USER_REMOVE_ROLE: `${PermissionResources.USER}.${PermissionActions.REMOVE_ROLE}`,
    USER_MANAGE: `${PermissionResources.USER}.${PermissionActions.MANAGE}`
  };
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.loading.set(true);
    const filter = __spreadValues({
      page: this.currentPage(),
      pageSize: this.pageSize()
    }, this.currentFilter);
    this.usersService.getUsers(filter).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.pagedResult.set(result);
        this.users.set(result.items);
        this.totalPagesSignal.set(result.totalPages);
        this.totalItemsSignal.set(result.totalItems);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load users:", error);
        this.loading.set(false);
        this.notificationService.error(this.i18n.t("errors.server"), this.i18n.t("errors.network"));
      }, "error")
    });
  }
  // Filter event handlers
  onSearchChange(searchTerm) {
    this.currentFilter = __spreadProps(__spreadValues({}, this.currentFilter), { search: searchTerm });
    this.currentPage.set(1);
    this.loadUsers();
  }
  onFiltersChange(filters) {
    this.currentFilter = __spreadValues({}, filters);
    this.currentPage.set(1);
    this.loadUsers();
  }
  onAddUser() {
    this.router.navigate(["/users/create"]);
  }
  onRefreshData() {
    this.currentFilter = {};
    this.currentPage.set(1);
    this.loadUsers();
  }
  // Table event handlers
  onViewUser(user) {
    this.router.navigate(["/users", user.id, "view"]);
  }
  onEditUser(user) {
    this.router.navigate(["/users", user.id, "edit"]);
  }
  onDeleteUser(user) {
    return __async(this, null, function* () {
      const confirmMessage = this.i18n.t("users.confirm_delete_user").replace("{{username}}", user.username);
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("users.delete_user"),
        message: confirmMessage,
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.usersService.deleteUser(user.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.loadUsers();
            this.notificationService.success(this.i18n.t("app.success"), this.i18n.t("users.user_deleted"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            let errorMessage = this.i18n.t("errors.server");
            if (error.error && error.error.error) {
              errorMessage = error.error.error;
            }
            this.notificationService.error(this.i18n.t("app.error"), errorMessage);
          }, "error")
        });
      }
    });
  }
  onManageRoles(user) {
    this.selectedUser.set(user);
    this.showRoleManagement.set(true);
  }
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadUsers();
  }
  onPageSizeChange(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadUsers();
  }
  onSelectionChange(selectedUsers) {
    console.log("Selected users:", selectedUsers);
  }
  onSortChange(sortEvent) {
    this.currentFilter = __spreadProps(__spreadValues({}, this.currentFilter), {
      sortBy: sortEvent.column,
      sortDirection: sortEvent.direction
    });
    this.currentPage.set(1);
    this.loadUsers();
  }
  // Modal event handlers
  onRolesUpdated(user) {
    this.loadUsers();
    this.notificationService.success(this.i18n.t("app.success"), "User roles updated successfully");
  }
  onCloseRoleManagement() {
    this.showRoleManagement.set(false);
    this.selectedUser.set(null);
  }
};
__name(_UsersComponent, "UsersComponent");
__publicField(_UsersComponent, "\u0275fac", /* @__PURE__ */ __name(function UsersComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UsersComponent)();
}, "UsersComponent_Factory"));
__publicField(_UsersComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersComponent, selectors: [["app-users"]], decls: 5, vars: 10, consts: [[1, "app-list-page"], [3, "title"], ["moduleName", "users", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [3, "viewUser", "editUser", "deleteUser", "manageRoles", "pageChange", "pageSizeChange", "selectionChange", "sortChange", "users", "loading", "currentPage", "totalPages", "totalItems", "pageSize"], [3, "showChange", "rolesUpdated", "user", "show"]], template: /* @__PURE__ */ __name(function UsersComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function UsersComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchChange($event);
    }, "UsersComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function UsersComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "UsersComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function UsersComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.onAddUser();
    }, "UsersComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function UsersComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "UsersComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-user-table", 3);
    \u0275\u0275listener("viewUser", /* @__PURE__ */ __name(function UsersComponent_Template_app_user_table_viewUser_3_listener($event) {
      return ctx.onViewUser($event);
    }, "UsersComponent_Template_app_user_table_viewUser_3_listener"))("editUser", /* @__PURE__ */ __name(function UsersComponent_Template_app_user_table_editUser_3_listener($event) {
      return ctx.onEditUser($event);
    }, "UsersComponent_Template_app_user_table_editUser_3_listener"))("deleteUser", /* @__PURE__ */ __name(function UsersComponent_Template_app_user_table_deleteUser_3_listener($event) {
      return ctx.onDeleteUser($event);
    }, "UsersComponent_Template_app_user_table_deleteUser_3_listener"))("manageRoles", /* @__PURE__ */ __name(function UsersComponent_Template_app_user_table_manageRoles_3_listener($event) {
      return ctx.onManageRoles($event);
    }, "UsersComponent_Template_app_user_table_manageRoles_3_listener"))("pageChange", /* @__PURE__ */ __name(function UsersComponent_Template_app_user_table_pageChange_3_listener($event) {
      return ctx.onPageChange($event);
    }, "UsersComponent_Template_app_user_table_pageChange_3_listener"))("pageSizeChange", /* @__PURE__ */ __name(function UsersComponent_Template_app_user_table_pageSizeChange_3_listener($event) {
      return ctx.onPageSizeChange($event);
    }, "UsersComponent_Template_app_user_table_pageSizeChange_3_listener"))("selectionChange", /* @__PURE__ */ __name(function UsersComponent_Template_app_user_table_selectionChange_3_listener($event) {
      return ctx.onSelectionChange($event);
    }, "UsersComponent_Template_app_user_table_selectionChange_3_listener"))("sortChange", /* @__PURE__ */ __name(function UsersComponent_Template_app_user_table_sortChange_3_listener($event) {
      return ctx.onSortChange($event);
    }, "UsersComponent_Template_app_user_table_sortChange_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-role-management", 4);
    \u0275\u0275listener("showChange", /* @__PURE__ */ __name(function UsersComponent_Template_app_role_management_showChange_4_listener() {
      return ctx.onCloseRoleManagement();
    }, "UsersComponent_Template_app_role_management_showChange_4_listener"))("rolesUpdated", /* @__PURE__ */ __name(function UsersComponent_Template_app_role_management_rolesUpdated_4_listener($event) {
      return ctx.onRolesUpdated($event);
    }, "UsersComponent_Template_app_role_management_rolesUpdated_4_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("users.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("users", ctx.users())("loading", ctx.loading)("currentPage", ctx.currentPage)("totalPages", ctx.totalPagesSignal)("totalItems", ctx.totalItemsSignal)("pageSize", ctx.pageSize);
    \u0275\u0275advance();
    \u0275\u0275property("user", ctx.selectedUser())("show", ctx.showRoleManagement());
  }
}, "UsersComponent_Template"), dependencies: [RoleManagementComponent, UnifiedFilterComponent, UserTableComponent, PageHeaderComponent], styles: ["\n\n.users-page[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.avatar-title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: 0.25rem !important;\n  margin-right: 2px;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-right: 0;\n}\n.modal.show[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.table-responsive[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n.pagination[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: var(--bs-primary);\n  border-color: var(--bs-border-color);\n}\n.pagination[_ngcontent-%COMP%]   .page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n.input-group-text[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-color: var(--bs-border-color);\n}\n.card[_ngcontent-%COMP%] {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border: 1px solid var(--bs-border-color);\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n[dir=rtl][_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-right: 0;\n  margin-left: 2px;\n}\n[dir=rtl][_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-left: 0;\n}\n[dir=rtl][_ngcontent-%COMP%]   .avatar-sm[_ngcontent-%COMP%] {\n  margin-right: 0;\n  margin-left: 0.5rem;\n}\n@media (max-width: 768px) {\n  .btn-group[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n  .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    margin: 0;\n    width: 100%;\n  }\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .badge[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n  }\n}\n.table-responsive[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 8px;\n}\n.table-responsive[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--bs-light);\n  border-radius: 4px;\n}\n.table-responsive[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--bs-secondary);\n  border-radius: 4px;\n}\n.table-responsive[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: var(--bs-primary);\n}\n/*# sourceMappingURL=users.component.css.map */"] }));
var UsersComponent = _UsersComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersComponent, [{
    type: Component,
    args: [{ selector: "app-users", standalone: true, imports: [RoleManagementComponent, UnifiedFilterComponent, UserTableComponent, PageHeaderComponent], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="i18n.t('users.title')">\r
  </app-page-header>\r
\r
  <!-- Filters Component -->\r
  <app-unified-filter\r
    moduleName="users"\r
    [refreshing]="loading()"\r
    (searchChange)="onSearchChange($event)"\r
    (filtersChange)="onFiltersChange($event)"\r
    (add)="onAddUser()"\r
    (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- Users Table Component -->\r
  <app-user-table\r
    [users]="users()"\r
    [loading]="loading"\r
    [currentPage]="currentPage"\r
    [totalPages]="totalPagesSignal"\r
    [totalItems]="totalItemsSignal"\r
    [pageSize]="pageSize"\r
    (viewUser)="onViewUser($event)"\r
    (editUser)="onEditUser($event)"\r
    (deleteUser)="onDeleteUser($event)"\r
    (manageRoles)="onManageRoles($event)"\r
    (pageChange)="onPageChange($event)"\r
    (pageSizeChange)="onPageSizeChange($event)"\r
    (selectionChange)="onSelectionChange($event)"\r
    (sortChange)="onSortChange($event)">\r
  </app-user-table>\r
\r
  <!-- Role Management Modal Component -->\r
  <app-role-management\r
    [user]="selectedUser()"\r
    [show]="showRoleManagement()"\r
    (showChange)="onCloseRoleManagement()"\r
    (rolesUpdated)="onRolesUpdated($event)">\r
  </app-role-management>\r
</div>`, styles: ["/* src/app/pages/users/users.component.css */\n.users-page {\n  padding: 0;\n}\n.avatar-sm {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.avatar-title {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.table td {\n  vertical-align: middle;\n}\n.badge {\n  font-size: 0.75rem;\n}\n.btn-group .btn {\n  border-radius: 0.25rem !important;\n  margin-right: 2px;\n}\n.btn-group .btn:last-child {\n  margin-right: 0;\n}\n.modal.show {\n  animation: fadeIn 0.15s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.table-responsive {\n  border-radius: 0.375rem;\n}\n.pagination .page-link {\n  color: var(--bs-primary);\n  border-color: var(--bs-border-color);\n}\n.pagination .page-item.active .page-link {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.form-label {\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n.input-group-text {\n  background-color: var(--bs-light);\n  border-color: var(--bs-border-color);\n}\n.card {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border: 1px solid var(--bs-border-color);\n}\n.card-body {\n  padding: 1.5rem;\n}\n.spinner-border {\n  width: 2rem;\n  height: 2rem;\n}\n[dir=rtl] .btn-group .btn {\n  margin-right: 0;\n  margin-left: 2px;\n}\n[dir=rtl] .btn-group .btn:last-child {\n  margin-left: 0;\n}\n[dir=rtl] .avatar-sm {\n  margin-right: 0;\n  margin-left: 0.5rem;\n}\n@media (max-width: 768px) {\n  .btn-group {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n  .btn-group .btn {\n    margin: 0;\n    width: 100%;\n  }\n  .table-responsive {\n    font-size: 0.875rem;\n  }\n  .badge {\n    font-size: 0.7rem;\n  }\n}\n.table-responsive::-webkit-scrollbar {\n  height: 8px;\n}\n.table-responsive::-webkit-scrollbar-track {\n  background: var(--bs-light);\n  border-radius: 4px;\n}\n.table-responsive::-webkit-scrollbar-thumb {\n  background: var(--bs-secondary);\n  border-radius: 4px;\n}\n.table-responsive::-webkit-scrollbar-thumb:hover {\n  background: var(--bs-primary);\n}\n/*# sourceMappingURL=users.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersComponent, { className: "UsersComponent", filePath: "src/app/pages/users/users.component.ts", lineNumber: 28 });
})();
export {
  UsersComponent
};
//# sourceMappingURL=chunk-WSC2DJWL.js.map
