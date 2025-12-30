import {
  DefinitionListComponent
} from "./chunk-I7HA6QL2.js";
import {
  FormHeaderComponent
} from "./chunk-KM5VSJTZ.js";
import {
  BadgeListComponent
} from "./chunk-FTAQSIAD.js";
import {
  UsersService
} from "./chunk-P7LM43DG.js";
import {
  HasPermissionDirective
} from "./chunk-Q7GSD2OQ.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import {
  PermissionActions,
  PermissionResources
} from "./chunk-6LEZROWG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-GSKH2KOG.js";
import "./chunk-HZ2IZU2F.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  computed,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/users/view-user/view-user.component.ts
function ViewUserComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.t("common.loading"))("centered", true);
  }
}
__name(ViewUserComponent_Conditional_2_Template, "ViewUserComponent_Conditional_2_Template");
function ViewUserComponent_Conditional_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 14);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r0.t("users.must_change_password"));
  }
}
__name(ViewUserComponent_Conditional_3_Conditional_12_Template, "ViewUserComponent_Conditional_3_Conditional_12_Template");
function ViewUserComponent_Conditional_3_button_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewUserComponent_Conditional_3_button_41_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onManageRoles());
    }, "ViewUserComponent_Conditional_3_button_41_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("users.manage_roles"), " ");
  }
}
__name(ViewUserComponent_Conditional_3_button_41_Template, "ViewUserComponent_Conditional_3_button_41_Template");
function ViewUserComponent_Conditional_3_Conditional_42_button_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275element(1, "i", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("users.lock_account"), " ");
  }
}
__name(ViewUserComponent_Conditional_3_Conditional_42_button_0_Template, "ViewUserComponent_Conditional_3_Conditional_42_button_0_Template");
function ViewUserComponent_Conditional_3_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ViewUserComponent_Conditional_3_Conditional_42_button_0_Template, 3, 1, "button", 30);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("appHasPermission", ctx_r0.PERMISSIONS.USER_LOCK);
  }
}
__name(ViewUserComponent_Conditional_3_Conditional_42_Template, "ViewUserComponent_Conditional_3_Conditional_42_Template");
function ViewUserComponent_Conditional_3_Conditional_43_button_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275element(1, "i", 33);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("users.unlock_account"), " ");
  }
}
__name(ViewUserComponent_Conditional_3_Conditional_43_button_0_Template, "ViewUserComponent_Conditional_3_Conditional_43_button_0_Template");
function ViewUserComponent_Conditional_3_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ViewUserComponent_Conditional_3_Conditional_43_button_0_Template, 3, 1, "button", 32);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("appHasPermission", ctx_r0.PERMISSIONS.USER_UNLOCK);
  }
}
__name(ViewUserComponent_Conditional_3_Conditional_43_Template, "ViewUserComponent_Conditional_3_Conditional_43_Template");
function ViewUserComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 6)(2, "div", 7)(3, "div", 8)(4, "h5", 9)(5, "div", 10)(6, "div", 11)(7, "div", 12);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "div", 13);
    \u0275\u0275text(11);
    \u0275\u0275conditionalCreate(12, ViewUserComponent_Conditional_3_Conditional_12_Template, 1, 1, "i", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "small", 15);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "div", 16)(16, "div", 3)(17, "div", 17);
    \u0275\u0275element(18, "app-definition-list", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 17);
    \u0275\u0275element(20, "app-definition-list", 18);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(21, "div", 19)(22, "div", 7)(23, "div", 8)(24, "h6", 9);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 16)(27, "div", 20)(28, "h6", 21);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "app-badge-list", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div")(32, "h6", 21);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275element(34, "app-badge-list", 22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 23)(36, "div", 8)(37, "h6", 9);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 16)(40, "div", 24);
    \u0275\u0275template(41, ViewUserComponent_Conditional_3_button_41_Template, 3, 1, "button", 25);
    \u0275\u0275conditionalCreate(42, ViewUserComponent_Conditional_3_Conditional_42_Template, 1, 1, "button", 26)(43, ViewUserComponent_Conditional_3_Conditional_43_Template, 1, 1, "button", 27);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_22_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", (((tmp_1_0 = ctx_r0.user()) == null ? null : tmp_1_0.username == null ? null : tmp_1_0.username.charAt(0)) || "") == null ? null : (((tmp_1_0 = tmp_1_0) == null ? null : tmp_1_0.username == null ? null : tmp_1_0.username.charAt(0)) || "").toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r0.user()) == null ? null : tmp_2_0.username, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_3_0 = ctx_r0.user()) == null ? null : tmp_3_0.mustChangePassword) ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r0.user()) == null ? null : tmp_4_0.email);
    \u0275\u0275advance(4);
    \u0275\u0275property("items", ctx_r0.basicInfoItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.statusInfoItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.t("users.roles_and_access"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("users.roles"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.roleBadges())("gap", "sm")("emptyMessage", ctx_r0.t("users.no_roles"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("users.branches"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.branchBadges())("gap", "sm")("emptyMessage", ctx_r0.t("users.all_branches"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t("common.actions"));
    \u0275\u0275advance(3);
    \u0275\u0275property("appHasPermission", ctx_r0.PERMISSIONS.USER_ASSIGN_ROLE);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_22_0 = ctx_r0.user()) == null ? null : tmp_22_0.isActive) ? 42 : 43);
  }
}
__name(ViewUserComponent_Conditional_3_Template, "ViewUserComponent_Conditional_3_Template");
function ViewUserComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "i", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.t("users.user_not_found"), " ");
  }
}
__name(ViewUserComponent_Conditional_4_Template, "ViewUserComponent_Conditional_4_Template");
var _ViewUserComponent = class _ViewUserComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  usersService = inject(UsersService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  user = signal(null, ...ngDevMode ? [{ debugName: "user" }] : []);
  userId = 0;
  // Permission constants for use in template
  PERMISSIONS = {
    USER_UPDATE: `${PermissionResources.USER}.${PermissionActions.UPDATE}`,
    USER_DELETE: `${PermissionResources.USER}.${PermissionActions.DELETE}`,
    USER_LOCK: `${PermissionResources.USER}.${PermissionActions.LOCK}`,
    USER_UNLOCK: `${PermissionResources.USER}.${PermissionActions.UNLOCK}`,
    USER_ASSIGN_ROLE: `${PermissionResources.USER}.${PermissionActions.ASSIGN_ROLE}`,
    USER_REMOVE_ROLE: `${PermissionResources.USER}.${PermissionActions.REMOVE_ROLE}`,
    USER_MANAGE: `${PermissionResources.USER}.${PermissionActions.MANAGE}`
  };
  ngOnInit() {
    this.userId = +this.route.snapshot.params["id"];
    if (this.userId) {
      this.loadUser();
    } else {
      this.router.navigate(["/users"]);
    }
  }
  loadUser() {
    this.loading.set(true);
    this.usersService.getUserById(this.userId).subscribe({
      next: /* @__PURE__ */ __name((user) => {
        this.user.set(user);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.error.set("Failed to load user");
        this.loading.set(false);
        console.error("Error loading user:", error);
      }, "error")
    });
  }
  onManageRoles() {
    console.log("Manage roles for user:", this.userId);
  }
  isUserLocked(lockoutEndUtc) {
    if (!lockoutEndUtc)
      return false;
    return new Date(lockoutEndUtc) > /* @__PURE__ */ new Date();
  }
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
  t(key) {
    return this.i18n.t(key);
  }
  getRoleName(role) {
    if (typeof role === "string") {
      return role;
    } else if (role && typeof role === "object" && role.name) {
      return role.name;
    } else if (role && typeof role === "object" && role.roleName) {
      return role.roleName;
    }
    return String(role) || "Unknown Role";
  }
  getBranchName(branch) {
    if (typeof branch === "string") {
      return branch;
    } else if (branch && typeof branch === "object" && branch.name) {
      return branch.name;
    } else if (branch && typeof branch === "object" && branch.branchName) {
      return branch.branchName;
    }
    return String(branch) || "Unknown Branch";
  }
  // Computed properties for badge lists
  roleBadges = computed(() => {
    const user = this.user();
    if (!user?.roles || user.roles.length === 0)
      return [];
    return user.roles.map((role, index) => ({
      id: index,
      label: this.getRoleName(role),
      variant: "info"
    }));
  }, ...ngDevMode ? [{ debugName: "roleBadges" }] : []);
  branchBadges = computed(() => {
    const user = this.user();
    if (!user?.branches || user.branches.length === 0)
      return [];
    return user.branches.map((branch, index) => ({
      id: index,
      label: this.getBranchName(branch),
      variant: "light"
    }));
  }, ...ngDevMode ? [{ debugName: "branchBadges" }] : []);
  // Computed properties for status badges
  userStatusBadge = computed(() => {
    const user = this.user();
    if (this.isUserLocked(user?.lockoutEndUtc)) {
      return { label: this.t("users.locked"), variant: "danger" };
    } else if (user?.isActive) {
      return { label: this.t("common.active"), variant: "success" };
    } else {
      return { label: this.t("common.inactive"), variant: "light" };
    }
  }, ...ngDevMode ? [{ debugName: "userStatusBadge" }] : []);
  twoFactorBadge = computed(() => {
    const user = this.user();
    if (user?.twoFactorEnabled) {
      return { label: this.t("common.enabled"), variant: "success" };
    } else {
      return { label: this.t("common.disabled"), variant: "light" };
    }
  }, ...ngDevMode ? [{ debugName: "twoFactorBadge" }] : []);
  // Computed properties for definition lists
  basicInfoItems = computed(() => {
    const user = this.user();
    if (!user)
      return [];
    const language = user.preferredLanguage === "ar" ? this.t("common.language_arabic") : this.t("common.language_english");
    return [
      { label: this.t("users.username"), value: user.username },
      { label: this.t("users.email"), value: user.email },
      { label: this.t("users.phone"), value: user.phone || "-" },
      { label: this.t("users.language"), value: language }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoItems" }] : []);
  statusInfoItems = computed(() => {
    const user = this.user();
    if (!user)
      return [];
    return [
      {
        label: this.t("common.status"),
        value: this.userStatusBadge().label,
        type: "badge",
        badgeVariant: this.userStatusBadge().variant
      },
      {
        label: this.t("users.created_at"),
        value: user.createdAtUtc,
        type: "date"
      },
      {
        label: this.t("users.two_factor"),
        value: this.twoFactorBadge().label,
        type: "badge",
        badgeVariant: this.twoFactorBadge().variant
      },
      { label: this.t("users.login_attempts"), value: String(user.accessFailedCount || 0) }
    ];
  }, ...ngDevMode ? [{ debugName: "statusInfoItems" }] : []);
};
__name(_ViewUserComponent, "ViewUserComponent");
__publicField(_ViewUserComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewUserComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewUserComponent)();
}, "ViewUserComponent_Factory"));
__publicField(_ViewUserComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewUserComponent, selectors: [["app-view-user"]], decls: 5, vars: 4, consts: [[1, "container-fluid"], ["mode", "view", "moduleName", "users", "moduleRoute", "users", 3, "title", "entityId", "loading"], [1, "d-flex", "justify-content-center", "py-5"], [1, "row"], [1, "alert", "alert-danger"], [3, "message", "centered"], [1, "col-lg-8"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-3"], [1, "avatar-title", "bg-primary-subtle", "text-primary", "rounded-circle"], [1, "fw-medium"], [1, "fa-solid", "fa-exclamation-triangle", "text-warning", "ms-2", 3, "title"], [1, "text-muted"], [1, "card-body"], [1, "col-md-6"], [3, "items", "labelWidth", "valueWidth"], [1, "col-lg-4"], [1, "mb-3"], [1, "fw-semibold"], [3, "items", "gap", "emptyMessage"], [1, "card", "mt-3"], [1, "d-grid", "gap-2"], ["type", "button", "class", "btn btn-outline-info", 3, "click", 4, "appHasPermission"], ["type", "button", 1, "btn", "btn-outline-warning"], ["type", "button", 1, "btn", "btn-outline-success"], ["type", "button", 1, "btn", "btn-outline-info", 3, "click"], [1, "fa-solid", "fa-user-tag", "me-2"], ["type", "button", "class", "btn btn-outline-warning", 4, "appHasPermission"], [1, "fa-solid", "fa-lock", "me-2"], ["type", "button", "class", "btn btn-outline-success", 4, "appHasPermission"], [1, "fa-solid", "fa-unlock", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function ViewUserComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewUserComponent_Conditional_2_Template, 2, 2, "div", 2)(3, ViewUserComponent_Conditional_3_Template, 44, 22, "div", 3)(4, ViewUserComponent_Conditional_4_Template, 3, 1, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("users.view_details"))("entityId", ctx.userId)("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : ctx.user() ? 3 : 4);
  }
}, "ViewUserComponent_Template"), dependencies: [HasPermissionDirective, FormHeaderComponent, LoadingSpinnerComponent, BadgeListComponent, DefinitionListComponent], styles: ["\n\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n}\n/*# sourceMappingURL=view-user.component.css.map */"] }));
var ViewUserComponent = _ViewUserComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewUserComponent, [{
    type: Component,
    args: [{ selector: "app-view-user", standalone: true, imports: [HasPermissionDirective, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, BadgeListComponent, DefinitionListComponent], template: `<div class="container-fluid">
  <!-- Header -->
  <app-form-header
    mode="view"
    [title]="t('users.view_details')"
    moduleName="users"
    moduleRoute="users"
    [entityId]="userId"
    [loading]="loading()">
  </app-form-header>

  @if (loading()) {
    <div class="d-flex justify-content-center py-5">
      <app-loading-spinner
        [message]="t('common.loading')"
        [centered]="true">
      </app-loading-spinner>
    </div>
  } @else if (user()) {
    <!-- User Details -->
    <div class="row">
      <!-- Main Information Card -->
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <div class="d-flex align-items-center">
                <div class="avatar-sm me-3">
                  <div class="avatar-title bg-primary-subtle text-primary rounded-circle">
                    {{ (user()?.username?.charAt(0) || '')?.toUpperCase() }}
                  </div>
                </div>
                <div>
                  <div class="fw-medium">
                    {{ user()?.username }}
                    @if (user()?.mustChangePassword) {
                      <i class="fa-solid fa-exclamation-triangle text-warning ms-2" [title]="t('users.must_change_password')"></i>
                    }
                  </div>
                  <small class="text-muted">{{ user()?.email }}</small>
                </div>
              </div>
            </h5>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Basic Information -->
              <div class="col-md-6">
                <app-definition-list
                  [items]="basicInfoItems()"
                  [labelWidth]="'4'"
                  [valueWidth]="'8'">
                </app-definition-list>
              </div>

              <!-- Status Information -->
              <div class="col-md-6">
                <app-definition-list
                  [items]="statusInfoItems()"
                  [labelWidth]="'4'"
                  [valueWidth]="'8'">
                </app-definition-list>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Roles and Branches Card -->
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h6 class="card-title mb-0">{{ t('users.roles_and_access') }}</h6>
          </div>
          <div class="card-body">
            <!-- Roles -->
            <div class="mb-3">
              <h6 class="fw-semibold">{{ t('users.roles') }}</h6>
              <app-badge-list
                [items]="roleBadges()"
                [gap]="'sm'"
                [emptyMessage]="t('users.no_roles')">
              </app-badge-list>
            </div>

            <!-- Branches -->
            <div>
              <h6 class="fw-semibold">{{ t('users.branches') }}</h6>
              <app-badge-list
                [items]="branchBadges()"
                [gap]="'sm'"
                [emptyMessage]="t('users.all_branches')">
              </app-badge-list>
            </div>
          </div>
        </div>

        <!-- Quick Actions Card -->
        <div class="card mt-3">
          <div class="card-header">
            <h6 class="card-title mb-0">{{ t('common.actions') }}</h6>
          </div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <button 
                *appHasPermission="PERMISSIONS.USER_ASSIGN_ROLE"
                type="button" 
                class="btn btn-outline-info"
                (click)="onManageRoles()">
                <i class="fa-solid fa-user-tag me-2"></i>
                {{ t('users.manage_roles') }}
              </button>
              @if (user()?.isActive) {
                <button 
                  *appHasPermission="PERMISSIONS.USER_LOCK"
                  type="button" 
                  class="btn btn-outline-warning">
                  <i class="fa-solid fa-lock me-2"></i>
                  {{ t('users.lock_account') }}
                </button>
              } @else {
                <button 
                  *appHasPermission="PERMISSIONS.USER_UNLOCK"
                  type="button" 
                  class="btn btn-outline-success">
                  <i class="fa-solid fa-unlock me-2"></i>
                  {{ t('users.unlock_account') }}
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  } @else {
    <div class="alert alert-danger">
      <i class="fa-solid fa-exclamation-triangle me-2"></i>
      {{ error() || t('users.user_not_found') }}
    </div>
  }
</div>`, styles: ["/* src/app/pages/users/view-user/view-user.component.css */\n.avatar-sm {\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n}\n/*# sourceMappingURL=view-user.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewUserComponent, { className: "ViewUserComponent", filePath: "src/app/pages/users/view-user/view-user.component.ts", lineNumber: 23 });
})();
export {
  ViewUserComponent
};
//# sourceMappingURL=chunk-7FMTGMGK.js.map
