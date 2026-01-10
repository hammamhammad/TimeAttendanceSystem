import {
  RolesService
} from "./chunk-GBUXYQ2X.js";
import {
  HasPermissionDirective
} from "./chunk-WKOQYA75.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import {
  PermissionActions,
  PermissionResources
} from "./chunk-EVMJ7ILG.js";
import "./chunk-O2IS3HK2.js";
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
  ɵɵtextInterpolate2
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/roles/view-role/view-role.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.key || $item.id, "_forTrack0");
function ViewRoleComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewRoleComponent_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEdit());
    }, "ViewRoleComponent_Conditional_16_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("roles.edit"), " ");
  }
}
__name(ViewRoleComponent_Conditional_16_Template, "ViewRoleComponent_Conditional_16_Template");
function ViewRoleComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 16)(2, "span", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.loading"));
  }
}
__name(ViewRoleComponent_Conditional_20_Template, "ViewRoleComponent_Conditional_20_Template");
function ViewRoleComponent_Conditional_21_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 28);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r1.i18n.t("roles.system_role"));
  }
}
__name(ViewRoleComponent_Conditional_21_Conditional_12_Template, "ViewRoleComponent_Conditional_21_Conditional_12_Template");
function ViewRoleComponent_Conditional_21_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("roles.system"));
  }
}
__name(ViewRoleComponent_Conditional_21_Conditional_26_Template, "ViewRoleComponent_Conditional_21_Conditional_26_Template");
function ViewRoleComponent_Conditional_21_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("roles.custom"));
  }
}
__name(ViewRoleComponent_Conditional_21_Conditional_27_Template, "ViewRoleComponent_Conditional_21_Conditional_27_Template");
function ViewRoleComponent_Conditional_21_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewRoleComponent_Conditional_21_Conditional_50_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEdit());
    }, "ViewRoleComponent_Conditional_21_Conditional_50_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("roles.edit"), " ");
  }
}
__name(ViewRoleComponent_Conditional_21_Conditional_50_Template, "ViewRoleComponent_Conditional_21_Conditional_50_Template");
function ViewRoleComponent_Conditional_21_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewRoleComponent_Conditional_21_Conditional_51_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onManagePermissions());
    }, "ViewRoleComponent_Conditional_21_Conditional_51_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("roles.manage_permissions"), " ");
  }
}
__name(ViewRoleComponent_Conditional_21_Conditional_51_Template, "ViewRoleComponent_Conditional_21_Conditional_51_Template");
function ViewRoleComponent_Conditional_21_Conditional_58_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48)(2, "div", 49);
    \u0275\u0275element(3, "i", 50);
    \u0275\u0275elementStart(4, "div", 51)(5, "div", 52)(6, "small", 53);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 54);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 55);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const permission_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.getPermissionIcon(permission_r5.key));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getPermissionResource(permission_r5.key));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getActionBadgeClass(permission_r5.key));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPermissionAction(permission_r5.key), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPermissionDescription(permission_r5), " ");
  }
}
__name(ViewRoleComponent_Conditional_21_Conditional_58_For_2_Template, "ViewRoleComponent_Conditional_21_Conditional_58_For_2_Template");
function ViewRoleComponent_Conditional_21_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275repeaterCreate(1, ViewRoleComponent_Conditional_21_Conditional_58_For_2_Template, 12, 5, "div", 47, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater((tmp_2_0 = ctx_r1.role()) == null ? null : tmp_2_0.permissions);
  }
}
__name(ViewRoleComponent_Conditional_21_Conditional_58_Template, "ViewRoleComponent_Conditional_21_Conditional_58_Template");
function ViewRoleComponent_Conditional_21_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "i", 56);
    \u0275\u0275elementStart(2, "p", 57);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("roles.no_permissions"));
  }
}
__name(ViewRoleComponent_Conditional_21_Conditional_59_Template, "ViewRoleComponent_Conditional_21_Conditional_59_Template");
function ViewRoleComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20)(3, "div", 21)(4, "h5", 22)(5, "div", 23)(6, "div", 24)(7, "div", 25);
    \u0275\u0275element(8, "i", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "div", 27);
    \u0275\u0275text(11);
    \u0275\u0275conditionalCreate(12, ViewRoleComponent_Conditional_21_Conditional_12_Template, 1, 1, "i", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "small", 29);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "div", 30)(16, "div", 18)(17, "div", 31)(18, "dl", 18)(19, "dt", 32);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dd", 33);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "dt", 32);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "dd", 33);
    \u0275\u0275conditionalCreate(26, ViewRoleComponent_Conditional_21_Conditional_26_Template, 2, 1, "span", 34)(27, ViewRoleComponent_Conditional_21_Conditional_27_Template, 2, 1, "span", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "dt", 32);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "dd", 33)(31, "span", 36);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 31)(34, "dl", 18)(35, "dt", 32);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "dd", 33);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "dt", 32);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "dd", 33);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(43, "div", 37)(44, "div", 20)(45, "div", 21)(46, "h6", 22);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 30)(49, "div", 38);
    \u0275\u0275conditionalCreate(50, ViewRoleComponent_Conditional_21_Conditional_50_Template, 3, 1, "button", 39);
    \u0275\u0275conditionalCreate(51, ViewRoleComponent_Conditional_21_Conditional_51_Template, 3, 1, "button", 40);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(52, "div", 41)(53, "div", 21)(54, "h6", 22);
    \u0275\u0275element(55, "i", 42);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 30);
    \u0275\u0275conditionalCreate(58, ViewRoleComponent_Conditional_21_Conditional_58_Template, 3, 0, "div", 43)(59, ViewRoleComponent_Conditional_21_Conditional_59_Template, 4, 1, "div", 44);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_9_0;
    let tmp_13_0;
    let tmp_18_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", (tmp_1_0 = ctx_r1.role()) == null ? null : tmp_1_0.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.role()) == null ? null : tmp_2_0.isSystem) ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ((tmp_3_0 = ctx_r1.role()) == null ? null : tmp_3_0.permissions == null ? null : tmp_3_0.permissions.length) || 0, " ", ctx_r1.i18n.t("roles.permissions_assigned"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("roles.name"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_5_0 = ctx_r1.role()) == null ? null : tmp_5_0.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("roles.type"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_7_0 = ctx_r1.role()) == null ? null : tmp_7_0.isSystem) ? 26 : 27);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("roles.user_count"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(((tmp_9_0 = ctx_r1.role()) == null ? null : tmp_9_0.userCount) || 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("roles.created_at"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.role().createdAtUtc));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("roles.permissions"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_13_0 = ctx_r1.role()) == null ? null : tmp_13_0.permissions == null ? null : tmp_13_0.permissions.length) || 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.actions"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.canEditRole() ? 50 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canManagePermissions() ? 51 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("roles.permissions"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_18_0 = ctx_r1.role()) == null ? null : tmp_18_0.permissions) && ctx_r1.role().permissions.length > 0 ? 58 : 59);
  }
}
__name(ViewRoleComponent_Conditional_21_Template, "ViewRoleComponent_Conditional_21_Template");
function ViewRoleComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "i", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error() || ctx_r1.i18n.t("roles.role_not_found"), " ");
  }
}
__name(ViewRoleComponent_Conditional_22_Template, "ViewRoleComponent_Conditional_22_Template");
var _ViewRoleComponent = class _ViewRoleComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  rolesService = inject(RolesService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    ROLE_UPDATE: `${PermissionResources.ROLE}.${PermissionActions.UPDATE}`,
    ROLE_ASSIGN_PERMISSIONS: `${PermissionResources.ROLE}.${PermissionActions.ASSIGN_PERMISSION}`
  };
  role = signal(null, ...ngDevMode ? [{ debugName: "role" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  ngOnInit() {
    const roleId = this.route.snapshot.paramMap.get("id");
    if (roleId) {
      this.loadRole(roleId);
    } else {
      this.error.set(this.i18n.t("roles.invalid_role_id"));
      this.loading.set(false);
    }
  }
  loadRole(roleId) {
    this.rolesService.getRoleById(+roleId).subscribe({
      next: /* @__PURE__ */ __name((role) => {
        this.role.set(role);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }, "error")
    });
  }
  canEditRole() {
    const role = this.role();
    if (!role)
      return false;
    if (!this.permissionService.has(this.PERMISSIONS.ROLE_UPDATE)) {
      return false;
    }
    return role.isEditable;
  }
  canManagePermissions() {
    const role = this.role();
    if (!role)
      return false;
    if (!this.permissionService.has(this.PERMISSIONS.ROLE_ASSIGN_PERMISSIONS)) {
      return false;
    }
    return role.isEditable;
  }
  onEdit() {
    if (this.canEditRole()) {
      this.router.navigate(["/roles", this.role().id, "edit"]);
    }
  }
  onManagePermissions() {
    if (this.canManagePermissions()) {
      this.router.navigate(["/roles", this.role().id, "edit"]);
    }
  }
  onBack() {
    this.router.navigate(["/roles"]);
  }
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
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
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t("errors.unknown");
  }
};
__name(_ViewRoleComponent, "ViewRoleComponent");
__publicField(_ViewRoleComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewRoleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewRoleComponent)();
}, "ViewRoleComponent_Factory"));
__publicField(_ViewRoleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewRoleComponent, selectors: [["app-view-role"]], decls: 23, vars: 7, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/dashboard"], ["routerLink", "/roles"], [1, "breadcrumb-item", "active"], [1, "btn-group"], ["type", "button", 1, "btn", "btn-primary"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fa-solid", "fa-arrow-left", "me-2"], [1, "d-flex", "justify-content-center", "py-5"], [1, "alert", "alert-danger"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fa-solid", "fa-edit", "me-2"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [1, "row"], [1, "col-lg-8"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-3"], [1, "avatar-title", "bg-info-subtle", "text-info", "rounded-circle"], [1, "fa-solid", "fa-user-shield"], [1, "fw-medium"], [1, "fa-solid", "fa-shield-alt", "text-primary", "ms-2", 3, "title"], [1, "text-muted"], [1, "card-body"], [1, "col-md-6"], [1, "col-sm-5"], [1, "col-sm-7"], [1, "badge", "bg-warning-subtle", "text-warning"], [1, "badge", "bg-success-subtle", "text-success"], [1, "badge", "bg-primary-subtle", "text-primary"], [1, "col-lg-4"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-outline-primary"], ["type", "button", 1, "btn", "btn-outline-info"], [1, "card", "mt-4"], [1, "fa-solid", "fa-key", "me-2"], [1, "row", "g-2"], [1, "text-center", "py-4"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], ["type", "button", 1, "btn", "btn-outline-info", 3, "click"], [1, "col-md-6", "col-lg-4"], [1, "permission-item", "border", "rounded", "p-2"], [1, "d-flex", "align-items-start"], [1, "fas", "me-2", "text-muted", "mt-1", 3, "ngClass"], [1, "flex-grow-1"], [1, "d-flex", "align-items-center", "mb-1"], [1, "fw-medium", "me-2"], [1, "badge", 3, "ngClass"], [1, "text-muted", "small", "mb-0"], [1, "fa-solid", "fa-key", "fa-2x", "text-muted", "mb-2"], [1, "text-muted", "mb-0"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function ViewRoleComponent_Template(rf, ctx) {
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
    \u0275\u0275elementStart(15, "div", 8);
    \u0275\u0275conditionalCreate(16, ViewRoleComponent_Conditional_16_Template, 3, 1, "button", 9);
    \u0275\u0275elementStart(17, "button", 10);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewRoleComponent_Template_button_click_17_listener() {
      return ctx.onBack();
    }, "ViewRoleComponent_Template_button_click_17_listener"));
    \u0275\u0275element(18, "i", 11);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(20, ViewRoleComponent_Conditional_20_Template, 4, 1, "div", 12)(21, ViewRoleComponent_Conditional_21_Template, 60, 19)(22, ViewRoleComponent_Conditional_22_Template, 3, 1, "div", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("roles.view_details"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.i18n.t("dashboard.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("roles.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.i18n.t("roles.view_details"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.canEditRole() ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 20 : ctx.role() ? 21 : 22);
  }
}, "ViewRoleComponent_Template"), dependencies: [CommonModule, NgClass, RouterModule, RouterLink], encapsulation: 2 }));
var ViewRoleComponent = _ViewRoleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewRoleComponent, [{
    type: Component,
    args: [{
      selector: "app-view-role",
      standalone: true,
      imports: [CommonModule, RouterModule, HasPermissionDirective],
      template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('roles.view_details') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/roles">{{ i18n.t('roles.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('roles.view_details') }}</li>
            </ol>
          </nav>
        </div>
        <div class="btn-group">
          @if (canEditRole()) {
            <button
              type="button"
              class="btn btn-primary"
              (click)="onEdit()">
              <i class="fa-solid fa-edit me-2"></i>
              {{ i18n.t('roles.edit') }}
            </button>
          }
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
          <div class="spinner-border" role="status">
            <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
          </div>
        </div>
      } @else if (role()) {
        <!-- Role Details -->
        <div class="row">
          <!-- Main Information Card -->
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">
                  <div class="d-flex align-items-center">
                    <div class="avatar-sm me-3">
                      <div class="avatar-title bg-info-subtle text-info rounded-circle">
                        <i class="fa-solid fa-user-shield"></i>
                      </div>
                    </div>
                    <div>
                      <div class="fw-medium">
                        {{ role()?.name }}
                        @if (role()?.isSystem) {
                          <i class="fa-solid fa-shield-alt text-primary ms-2" [title]="i18n.t('roles.system_role')"></i>
                        }
                      </div>
                      <small class="text-muted">{{ role()?.permissions?.length || 0 }} {{ i18n.t('roles.permissions_assigned') }}</small>
                    </div>
                  </div>
                </h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <!-- Basic Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('roles.name') }}:</dt>
                      <dd class="col-sm-7">{{ role()?.name }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('roles.type') }}:</dt>
                      <dd class="col-sm-7">
                        @if (role()?.isSystem) {
                          <span class="badge bg-warning-subtle text-warning">{{ i18n.t('roles.system') }}</span>
                        } @else {
                          <span class="badge bg-success-subtle text-success">{{ i18n.t('roles.custom') }}</span>
                        }
                      </dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('roles.user_count') }}:</dt>
                      <dd class="col-sm-7">
                        <span class="badge bg-primary-subtle text-primary">{{ role()?.userCount || 0 }}</span>
                      </dd>
                    </dl>
                  </div>

                  <!-- Status Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('roles.created_at') }}:</dt>
                      <dd class="col-sm-7">{{ formatDate(role()!.createdAtUtc) }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('roles.permissions') }}:</dt>
                      <dd class="col-sm-7">{{ role()?.permissions?.length || 0 }}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions Card -->
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h6 class="card-title mb-0">{{ i18n.t('common.actions') }}</h6>
              </div>
              <div class="card-body">
                <div class="d-grid gap-2">
                  @if (canEditRole()) {
                    <button
                      type="button"
                      class="btn btn-outline-primary"
                      (click)="onEdit()">
                      <i class="fa-solid fa-edit me-2"></i>
                      {{ i18n.t('roles.edit') }}
                    </button>
                  }
                  @if (canManagePermissions()) {
                    <button
                      type="button"
                      class="btn btn-outline-info"
                      (click)="onManagePermissions()">
                      <i class="fa-solid fa-key me-2"></i>
                      {{ i18n.t('roles.manage_permissions') }}
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Permissions Card -->
        <div class="card mt-4">
          <div class="card-header">
            <h6 class="card-title mb-0">
              <i class="fa-solid fa-key me-2"></i>
              {{ i18n.t('roles.permissions') }}
            </h6>
          </div>
          <div class="card-body">
            @if (role()?.permissions && role()!.permissions.length > 0) {
              <div class="row g-2">
                @for (permission of role()?.permissions; track permission.key || permission.id) {
                  <div class="col-md-6 col-lg-4">
                    <div class="permission-item border rounded p-2">
                      <div class="d-flex align-items-start">
                        <i class="fas me-2 text-muted mt-1" [ngClass]="getPermissionIcon(permission.key)"></i>
                        <div class="flex-grow-1">
                          <div class="d-flex align-items-center mb-1">
                            <small class="fw-medium me-2">{{ getPermissionResource(permission.key) }}</small>
                            <span class="badge" [ngClass]="getActionBadgeClass(permission.key)">
                              {{ getPermissionAction(permission.key) }}
                            </span>
                          </div>
                          <p class="text-muted small mb-0">
                            {{ getPermissionDescription(permission) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div class="text-center py-4">
                <i class="fa-solid fa-key fa-2x text-muted mb-2"></i>
                <p class="text-muted mb-0">{{ i18n.t('roles.no_permissions') }}</p>
              </div>
            }
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewRoleComponent, { className: "ViewRoleComponent", filePath: "src/app/pages/roles/view-role/view-role.component.ts", lineNumber: 205 });
})();
export {
  ViewRoleComponent
};
//# sourceMappingURL=chunk-S5UT7H46.js.map
