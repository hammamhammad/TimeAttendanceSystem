import {
  EmptyStateComponent
} from "./chunk-A4RQO434.js";
import {
  RolesService
} from "./chunk-VGYB4IQS.js";
import {
  LoadingSpinnerComponent
} from "./chunk-WJCQS5EA.js";
import {
  ModalWrapperComponent
} from "./chunk-ND6JPRQH.js";
import {
  BadgeListComponent
} from "./chunk-UBHNI42F.js";
import {
  DataTableComponent
} from "./chunk-7K5DBNQM.js";
import {
  UnifiedFilterComponent
} from "./chunk-HAMFYSM6.js";
import {
  StatusBadgeComponent
} from "./chunk-GFM52OPW.js";
import "./chunk-3AZFD5ID.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-T6ZZRW4R.js";
import {
  ConfirmationService
} from "./chunk-OJL2NUV4.js";
import {
  PermissionActions,
  PermissionResources,
  PermissionService,
  PermissionUtils
} from "./chunk-DKGIYIS4.js";
import {
  PageHeaderComponent
} from "./chunk-G7MX4ADH.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import {
  FormsModule
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  NgClass,
  Router,
  computed,
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
  ɵɵtextInterpolate2
} from "./chunk-54H4HALB.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/roles/roles.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function RolesComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "app-loading-spinner", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.t("common.loading"))("variant", "primary")("centered", true);
  }
}
__name(RolesComponent_Conditional_5_Template, "RolesComponent_Conditional_5_Template");
function RolesComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-empty-state", 13);
    \u0275\u0275listener("clearFilters", /* @__PURE__ */ __name(function RolesComponent_Conditional_6_Template_app_empty_state_clearFilters_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClearFilters());
    }, "RolesComponent_Conditional_6_Template_app_empty_state_clearFilters_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("icon", "fa-solid fa-user-shield")("message", ctx_r0.t("roles.no_roles_found"))("showClearFilters", ctx_r0.hasActiveFilters())("clearFiltersText", ctx_r0.t("common.clear_filters"));
  }
}
__name(RolesComponent_Conditional_6_Template, "RolesComponent_Conditional_6_Template");
function RolesComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-data-table", 14);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function RolesComponent_Conditional_7_Template_app_data_table_actionClick_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onActionClick($event));
    }, "RolesComponent_Conditional_7_Template_app_data_table_actionClick_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("data", ctx_r0.tableData())("columns", ctx_r0.tableColumns())("actions", ctx_r0.tableActions())("loading", ctx_r0.loading)("paginated", true)("emptyMessage", ctx_r0.t("roles.no_roles_found"))("responsiveMode", "auto");
  }
}
__name(RolesComponent_Conditional_7_Template, "RolesComponent_Conditional_7_Template");
function RolesComponent_Conditional_10_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 27)(2, "div", 28)(3, "input", 29);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function RolesComponent_Conditional_10_For_13_Template_input_change_3_listener() {
      const permission_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onTogglePermission(permission_r5));
    }, "RolesComponent_Conditional_10_For_13_Template_input_change_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 30)(5, "div", 31);
    \u0275\u0275element(6, "i", 32);
    \u0275\u0275elementStart(7, "label", 33)(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(10, "app-status-badge", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 35);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const permission_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-light", ctx_r0.isPermissionAssigned(permission_r5.id))("loading", ctx_r0.managingPermissions());
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "permission-" + permission_r5.id)("checked", ctx_r0.isPermissionAssigned(permission_r5.id))("disabled", ctx_r0.managingPermissions());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r0.getPermissionIcon(permission_r5.key));
    \u0275\u0275advance();
    \u0275\u0275property("for", "permission-" + permission_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getPermissionResource(permission_r5.key));
    \u0275\u0275advance();
    \u0275\u0275property("status", ctx_r0.getPermissionBadgeStatus(permission_r5.key))("label", ctx_r0.getPermissionAction(permission_r5.key))("size", "sm");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getPermissionDescription(permission_r5), " ");
  }
}
__name(RolesComponent_Conditional_10_For_13_Template, "RolesComponent_Conditional_10_For_13_Template");
function RolesComponent_Conditional_10_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 25);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("icon", "fa-solid fa-key")("message", ctx_r0.t("roles.no_permissions_available"))("size", "sm");
  }
}
__name(RolesComponent_Conditional_10_Conditional_14_Template, "RolesComponent_Conditional_10_Conditional_14_Template");
function RolesComponent_Conditional_10_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "app-loading-spinner", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.t("roles.updating_permissions"))("variant", "primary")("size", "sm")("centered", true);
  }
}
__name(RolesComponent_Conditional_10_Conditional_15_Template, "RolesComponent_Conditional_10_Conditional_15_Template");
function RolesComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "div", 17)(3, "div", 18);
    \u0275\u0275element(4, "i", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "h6", 20);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 21);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 22)(11, "div", 23);
    \u0275\u0275repeaterCreate(12, RolesComponent_Conditional_10_For_13_Template, 13, 14, "div", 24, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, RolesComponent_Conditional_10_Conditional_14_Template, 1, 3, "app-empty-state", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, RolesComponent_Conditional_10_Conditional_15_Template, 2, 4, "div", 26);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.selectedRole().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.selectedRole().permissions.length, " ", ctx_r0.t("roles.permissions_assigned"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.allPermissions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.allPermissions().length === 0 ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.managingPermissions() ? 15 : -1);
  }
}
__name(RolesComponent_Conditional_10_Template, "RolesComponent_Conditional_10_Template");
var _RolesComponent = class _RolesComponent {
  rolesService = inject(RolesService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    ROLE_CREATE: `${PermissionResources.ROLE}.${PermissionActions.CREATE}`,
    ROLE_READ: `${PermissionResources.ROLE}.${PermissionActions.READ}`,
    ROLE_UPDATE: `${PermissionResources.ROLE}.${PermissionActions.UPDATE}`,
    ROLE_DELETE: `${PermissionResources.ROLE}.${PermissionActions.DELETE}`,
    ROLE_MANAGE: `${PermissionResources.ROLE}.${PermissionActions.MANAGE}`,
    ROLE_ASSIGN_PERMISSIONS: `${PermissionResources.ROLE}.${PermissionActions.ASSIGN_PERMISSION}`
  };
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  roles = signal([], ...ngDevMode ? [{ debugName: "roles" }] : []);
  allPermissions = signal([], ...ngDevMode ? [{ debugName: "allPermissions" }] : []);
  groupedPermissions = signal([], ...ngDevMode ? [{ debugName: "groupedPermissions" }] : []);
  // Filter signals
  searchTerm = "";
  // Sorting state
  sortColumn = signal("name", ...ngDevMode ? [{ debugName: "sortColumn" }] : []);
  sortDirection = signal("asc", ...ngDevMode ? [{ debugName: "sortDirection" }] : []);
  // Modal state
  showPermissionsModal = signal(false, ...ngDevMode ? [{ debugName: "showPermissionsModal" }] : []);
  selectedRole = signal(null, ...ngDevMode ? [{ debugName: "selectedRole" }] : []);
  managingPermissions = signal(false, ...ngDevMode ? [{ debugName: "managingPermissions" }] : []);
  // Data table configuration
  tableColumns = computed(() => [
    {
      key: "name",
      label: this.t("roles.name"),
      sortable: true,
      width: "200px",
      priority: "high",
      mobileLabel: this.t("roles.name"),
      renderHtml: true
    },
    {
      key: "permissions",
      label: this.t("roles.permissions"),
      sortable: false,
      width: "300px",
      priority: "medium",
      hideOnMobile: false,
      mobileLabel: this.t("roles.permissions"),
      renderHtml: true
    },
    {
      key: "userCount",
      label: this.t("roles.users"),
      sortable: true,
      width: "100px",
      align: "center",
      priority: "medium",
      mobileLabel: this.t("roles.users"),
      renderHtml: true
    },
    {
      key: "type",
      label: this.t("roles.type"),
      sortable: false,
      width: "120px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("roles.type"),
      renderHtml: true
    },
    {
      key: "createdAtUtc",
      label: this.t("common.created"),
      sortable: true,
      width: "150px",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("common.created")
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "view",
      label: this.t("common.view"),
      icon: "fa-eye",
      color: "primary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.ROLE_READ), "condition")
    },
    {
      key: "manage-permissions",
      label: this.t("roles.manage_permissions"),
      icon: "fa-shield-alt",
      color: "info",
      condition: /* @__PURE__ */ __name((role) => this.canManagePermissions(role) && this.permissionService.has(this.PERMISSIONS.ROLE_ASSIGN_PERMISSIONS), "condition")
    },
    {
      key: "edit",
      label: this.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name((role) => this.canEditRole(role) && this.permissionService.has(this.PERMISSIONS.ROLE_UPDATE), "condition")
    },
    {
      key: "delete",
      label: this.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name((role) => this.canDeleteRole(role) && this.permissionService.has(this.PERMISSIONS.ROLE_DELETE), "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform roles data for data table
  tableData = computed(() => {
    return this.filteredRoles().map((role) => __spreadProps(__spreadValues({}, role), {
      name: this.formatRoleName(role),
      permissions: this.formatRolePermissions(role),
      userCount: this.formatUserCount(role),
      type: this.formatRoleType(role),
      createdAtUtc: this.formatDate(role.createdAtUtc)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  ngOnInit() {
    this.loadRoles();
    this.loadPermissions();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadRoles() {
    this.loading.set(true);
    this.rolesService.getRoles(true).subscribe({
      next: /* @__PURE__ */ __name((roles) => {
        this.roles.set(roles);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load roles:", error);
        this.loading.set(false);
        this.notificationService.error(this.t("app.error"), this.t("errors.server"));
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
        this.notificationService.error(this.t("app.error"), this.t("roles.failed_to_load_permissions"));
      }, "error")
    });
    this.rolesService.getGroupedPermissions().subscribe({
      next: /* @__PURE__ */ __name((groupedPermissions) => {
        this.groupedPermissions.set(groupedPermissions);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load grouped permissions:", error);
        this.notificationService.error(this.t("app.error"), this.t("roles.failed_to_load_permissions"));
      }, "error")
    });
  }
  canEditRole(role) {
    if (!this.permissionService.has(this.PERMISSIONS.ROLE_UPDATE)) {
      return false;
    }
    return this.canEditRoleBusinessLogic(role);
  }
  canDeleteRole(role) {
    if (!this.permissionService.has(this.PERMISSIONS.ROLE_DELETE)) {
      return false;
    }
    return role.isDeletable && role.userCount === 0;
  }
  canManagePermissions(role) {
    if (!this.permissionService.has(this.PERMISSIONS.ROLE_ASSIGN_PERMISSIONS)) {
      return false;
    }
    return this.canEditRoleBusinessLogic(role);
  }
  canEditRoleBusinessLogic(role) {
    return role.isEditable;
  }
  onManagePermissions(role) {
    if (!this.canManagePermissions(role)) {
      return;
    }
    this.selectedRole.set(role);
    this.showPermissionsModal.set(true);
  }
  closePermissionsModal() {
    this.showPermissionsModal.set(false);
    this.selectedRole.set(null);
  }
  isPermissionAssigned(permissionId) {
    const role = this.selectedRole();
    if (!role)
      return false;
    return role.permissions.some((p) => p.id === permissionId);
  }
  onTogglePermission(permission) {
    const role = this.selectedRole();
    if (!role || this.managingPermissions())
      return;
    this.managingPermissions.set(true);
    const isAssigned = this.isPermissionAssigned(permission.id);
    const operation = isAssigned ? this.rolesService.removePermissionFromRole(role.id, permission.id) : this.rolesService.assignPermissionToRole(role.id, { permissionId: permission.id });
    operation.subscribe({
      next: /* @__PURE__ */ __name(() => {
        const updatedRoles = this.roles().map((r) => {
          if (r.id === role.id) {
            if (isAssigned) {
              r.permissions = r.permissions.filter((p) => p.id !== permission.id);
            } else {
              r.permissions = [...r.permissions, permission];
            }
          }
          return r;
        });
        this.roles.set(updatedRoles);
        this.selectedRole.set(updatedRoles.find((r) => r.id === role.id) || null);
        this.managingPermissions.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to update permission:", error);
        this.managingPermissions.set(false);
        this.notificationService.error(this.t("app.error"), this.t("roles.failed_to_update_permission"));
      }, "error")
    });
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  // Filtered roles computed signal
  filteredRoles = computed(() => {
    let filtered = this.roles();
    if (this.searchTerm?.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter((role) => role.name.toLowerCase().includes(searchLower) || role.permissions.some((p) => p.key.toLowerCase().includes(searchLower)));
    }
    const sortCol = this.sortColumn();
    const sortDir = this.sortDirection();
    return filtered.sort((a, b) => {
      let aVal = a[sortCol];
      let bVal = b[sortCol];
      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal)
        return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal)
        return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, ...ngDevMode ? [{ debugName: "filteredRoles" }] : []);
  // Data table formatting methods
  formatRoleName(role) {
    let html = `<div><strong>${role.name}</strong>`;
    if (role.isSystem) {
      html += `<i class="fa-solid fa-shield-alt text-primary ms-1" title="${this.t("roles.system_role")}"></i>`;
    }
    html += "</div>";
    return html;
  }
  formatRolePermissions(role) {
    if (role.permissions.length === 0) {
      return `<span class="text-muted">${this.t("roles.no_permissions")}</span>`;
    }
    let html = '<div class="d-flex flex-wrap gap-1">';
    const visiblePermissions = role.permissions.slice(0, 3);
    visiblePermissions.forEach((permission) => {
      html += `<span class="badge bg-secondary-subtle text-secondary small">${permission.key}</span>`;
    });
    if (role.permissions.length > 3) {
      html += `<span class="badge bg-light text-dark small">+${role.permissions.length - 3} more</span>`;
    }
    html += "</div>";
    return html;
  }
  formatUserCount(role) {
    return `<span class="badge bg-primary-subtle text-primary">${role.userCount}</span>`;
  }
  formatRoleType(role) {
    if (role.isSystem) {
      return `<span class="badge bg-warning-subtle text-warning">${this.t("roles.system")}</span>`;
    } else {
      return `<span class="badge bg-success-subtle text-success">${this.t("roles.custom")}</span>`;
    }
  }
  // Data table action handler
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onViewRole(item);
        break;
      case "manage-permissions":
        this.onManagePermissions(item);
        break;
      case "edit":
        this.onEditRole(item);
        break;
      case "delete":
        this.onDeleteRole(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  onSearchTermChange(searchTerm) {
    this.searchTerm = searchTerm;
  }
  onFiltersChange(filters) {
    console.log("Filters changed:", filters);
  }
  onClearFilters() {
    this.searchTerm = "";
  }
  onRefreshData() {
    this.searchTerm = "";
    this.loadRoles();
  }
  hasActiveFilters() {
    return !!this.searchTerm;
  }
  // Role CRUD operations
  onCreateRole() {
    this.router.navigate(["/roles/create"]);
  }
  onViewRole(role) {
    this.router.navigate(["/roles", role.id, "view"]);
  }
  onEditRole(role) {
    if (!this.canEditRole(role))
      return;
    this.router.navigate(["/roles", role.id, "edit"]);
  }
  onDeleteRole(role) {
    return __async(this, null, function* () {
      if (!this.canDeleteRole(role))
        return;
      const result = yield this.confirmationService.confirm({
        title: this.t("roles.delete_role"),
        message: this.t("roles.delete_role_confirmation").replace("{{roleName}}", role.name),
        confirmText: this.t("common.delete"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.rolesService.deleteRole(role.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.roles.set(this.roles().filter((r) => r.id !== role.id));
            this.notificationService.success(this.t("app.success"), this.t("roles.role_deleted_successfully"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete role:", error);
            this.notificationService.error(this.t("app.error"), this.t("errors.server"));
          }, "error")
        });
      }
    });
  }
  canCreateRoles() {
    return this.permissionService.has(this.PERMISSIONS.ROLE_CREATE);
  }
  // Permission display enhancement methods using PermissionUtils
  getPermissionResource(permissionKey) {
    return PermissionUtils.getResourceName(PermissionUtils.parsePermissionKey(permissionKey).resource);
  }
  getPermissionAction(permissionKey) {
    const action = PermissionUtils.parsePermissionKey(permissionKey).action;
    return action ? PermissionUtils.getActionName(action) : "Action";
  }
  getActionBadgeClass(permissionKey) {
    const action = PermissionUtils.parsePermissionKey(permissionKey).action;
    return action ? PermissionUtils.getActionBadgeClass(action) : "bg-light text-dark";
  }
  getPermissionBadgeStatus(permissionKey) {
    const action = PermissionUtils.parsePermissionKey(permissionKey).action;
    const badgeClass = action ? PermissionUtils.getActionBadgeClass(action) : "bg-light text-dark";
    if (badgeClass.includes("bg-success"))
      return "success";
    if (badgeClass.includes("bg-info"))
      return "info";
    if (badgeClass.includes("bg-warning"))
      return "warning";
    if (badgeClass.includes("bg-primary"))
      return "primary";
    if (badgeClass.includes("bg-danger"))
      return "danger";
    return "secondary";
  }
  getPermissionIcon(permissionKey) {
    const resource = PermissionUtils.parsePermissionKey(permissionKey).resource;
    return PermissionUtils.getResourceIcon(resource);
  }
  getPermissionDescription(permission) {
    if (permission.description) {
      return permission.description;
    }
    const { resource, action } = PermissionUtils.parsePermissionKey(permission.key);
    const actionDesc = PermissionUtils.getActionDescription(action);
    const resourceDesc = PermissionUtils.getResourceDescription(resource);
    return `${actionDesc} ${resourceDesc.toLowerCase()}`;
  }
  // Sorting methods
  onSort(column) {
    const currentColumn = this.sortColumn();
    const currentDirection = this.sortDirection();
    if (currentColumn === column) {
      this.sortDirection.set(currentDirection === "asc" ? "desc" : "asc");
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set("asc");
    }
  }
  getSortIcon(column) {
    const currentColumn = this.sortColumn();
    const currentDirection = this.sortDirection();
    if (currentColumn !== column) {
      return "fas fa-sort text-muted";
    }
    return currentDirection === "asc" ? "fas fa-sort-up text-primary" : "fas fa-sort-down text-primary";
  }
  isSortable(column) {
    const sortableColumns = ["name", "userCount", "createdAtUtc"];
    return sortableColumns.includes(column);
  }
};
__name(_RolesComponent, "RolesComponent");
__publicField(_RolesComponent, "\u0275fac", /* @__PURE__ */ __name(function RolesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RolesComponent)();
}, "RolesComponent_Factory"));
__publicField(_RolesComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RolesComponent, selectors: [["app-roles"]], decls: 14, vars: 10, consts: [[1, "app-list-page"], [3, "title"], ["moduleName", "roles", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [1, "card"], [1, "card-body"], [1, "text-center", "py-4"], [3, "icon", "message", "showClearFilters", "clearFiltersText"], [1, "table-hover", 3, "data", "columns", "actions", "loading", "paginated", "emptyMessage", "responsiveMode"], [3, "close", "show", "title", "size", "centered", "loading"], [1, "modal-body"], ["modal-footer", "", 1, "d-flex", "gap-2", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [3, "message", "variant", "centered"], [3, "clearFilters", "icon", "message", "showClearFilters", "clearFiltersText"], [1, "table-hover", 3, "actionClick", "data", "columns", "actions", "loading", "paginated", "emptyMessage", "responsiveMode"], [1, "role-info", "mb-4"], [1, "d-flex", "align-items-center"], [1, "avatar-md", "me-3"], [1, "avatar-title", "bg-info-subtle", "text-info", "rounded-circle"], [1, "fa-solid", "fa-user-shield"], [1, "mb-1"], [1, "text-muted", "mb-0"], [1, "permissions-list", "border", "rounded", "p-3", 2, "max-height", "400px", "overflow-y", "auto"], [1, "row", "g-2"], [1, "col-md-6", "col-lg-4"], [3, "icon", "message", "size"], [1, "text-center", "py-3"], [1, "permission-item", "border", "rounded", "p-2"], [1, "form-check", "d-flex", "align-items-start"], ["type", "checkbox", 1, "form-check-input", "mt-1", 3, "change", "id", "checked", "disabled"], [1, "form-check-content", "ms-2", "flex-grow-1"], [1, "d-flex", "align-items-center", "mb-1"], [1, "fas", "me-1", "text-muted", 2, "font-size", "0.75rem", 3, "ngClass"], [1, "form-check-label", "fw-medium", "me-2", 3, "for"], [3, "status", "label", "size"], [1, "text-muted", "small", "mb-0", 2, "font-size", "0.7rem", "margin-left", "1.25rem"], [3, "message", "variant", "size", "centered"]], template: /* @__PURE__ */ __name(function RolesComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function RolesComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchTermChange($event);
    }, "RolesComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function RolesComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "RolesComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function RolesComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.onCreateRole();
    }, "RolesComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function RolesComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "RolesComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
    \u0275\u0275conditionalCreate(5, RolesComponent_Conditional_5_Template, 2, 3, "div", 5)(6, RolesComponent_Conditional_6_Template, 1, 4, "app-empty-state", 6)(7, RolesComponent_Conditional_7_Template, 1, 7, "app-data-table", 7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "app-modal-wrapper", 8);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function RolesComponent_Template_app_modal_wrapper_close_8_listener() {
      return ctx.closePermissionsModal();
    }, "RolesComponent_Template_app_modal_wrapper_close_8_listener"));
    \u0275\u0275elementStart(9, "div", 9);
    \u0275\u0275conditionalCreate(10, RolesComponent_Conditional_10_Template, 16, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 10)(12, "button", 11);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function RolesComponent_Template_button_click_12_listener() {
      return ctx.closePermissionsModal();
    }, "RolesComponent_Template_button_click_12_listener"));
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("roles.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.loading() ? 5 : ctx.filteredRoles().length === 0 ? 6 : 7);
    \u0275\u0275advance(3);
    \u0275\u0275property("show", ctx.showPermissionsModal())("title", ctx.t("roles.manage_permissions_for") + ": " + (((tmp_4_0 = ctx.selectedRole()) == null ? null : tmp_4_0.name) || ""))("size", "xl")("centered", true)("loading", ctx.managingPermissions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.selectedRole() ? 10 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.close"), " ");
  }
}, "RolesComponent_Template"), dependencies: [CommonModule, NgClass, FormsModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent, StatusBadgeComponent, ModalWrapperComponent, LoadingSpinnerComponent, EmptyStateComponent], styles: ["\n\n.roles-page[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-md[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.permission-item[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border: 1px solid #e9ecef;\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n  background-color: #ffffff;\n}\n.permission-item[_ngcontent-%COMP%]:hover {\n  border-color: #0d6efd;\n  background-color: #f8f9fa;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.permission-item.bg-light[_ngcontent-%COMP%] {\n  background-color: #e3f2fd !important;\n  border-color: #2196f3 !important;\n  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.2);\n}\n.permission-item.loading[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  pointer-events: none;\n}\n.permission-group[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.permission-group[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  color: #212529;\n  font-weight: 600;\n  margin-bottom: 1rem;\n}\n.form-check-content[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  word-break: break-word;\n  color: #000000 !important;\n  font-weight: 600 !important;\n  font-size: 0.9rem !important;\n}\n.form-check-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #000000 !important;\n  font-weight: 600 !important;\n  font-size: 0.9rem !important;\n}\n.permission-item[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  color: #333333 !important;\n  font-size: 0.8rem !important;\n  line-height: 1.3 !important;\n  font-weight: 500 !important;\n}\n.permissions-groups[_ngcontent-%COMP%]   .border[_ngcontent-%COMP%] {\n  border-color: #dee2e6 !important;\n}\n.bg-purple-subtle[_ngcontent-%COMP%] {\n  background-color: #e9d5ff !important;\n}\n.text-purple[_ngcontent-%COMP%] {\n  color: #7c3aed !important;\n}\n.permission-item[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.permission-item[_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n}\n.permission-group[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.badge.small[_ngcontent-%COMP%] {\n  font-size: 0.65em;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:disabled, \n.btn-group[_ngcontent-%COMP%]   .btn.disabled[_ngcontent-%COMP%] {\n  opacity: 0.4;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.role-info[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-radius: 0.5rem;\n  padding: 1rem;\n}\nth.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: background-color 0.15s ease-in-out;\n}\nth.sortable[_ngcontent-%COMP%]:hover {\n  background-color: #e9ecef;\n}\nth.sortable[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.7;\n  transition: opacity 0.15s ease-in-out;\n}\nth.sortable[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n/*# sourceMappingURL=roles.component.css.map */"] }));
var RolesComponent = _RolesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolesComponent, [{
    type: Component,
    args: [{ selector: "app-roles", standalone: true, imports: [CommonModule, FormsModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent, StatusBadgeComponent, BadgeListComponent, ModalWrapperComponent, LoadingSpinnerComponent, EmptyStateComponent], template: `<div class="app-list-page">
  <!-- Page Header -->
  <app-page-header
    [title]="t('roles.title')">
  </app-page-header>

  <!-- Standardized Filters Component -->
  <app-unified-filter
    moduleName="roles"
    [refreshing]="loading()"
    (searchChange)="onSearchTermChange($event)"
    (filtersChange)="onFiltersChange($event)"
    (add)="onCreateRole()"
    (refresh)="onRefreshData()">
  </app-unified-filter>

  <!-- Roles Table Card -->
  <div class="card">
    <div class="card-body">
      @if (loading()) {
        <div class="text-center py-4">
          <app-loading-spinner
            [message]="t('common.loading')"
            [variant]="'primary'"
            [centered]="true">
          </app-loading-spinner>
        </div>
      } @else if (filteredRoles().length === 0) {
        <app-empty-state
          [icon]="'fa-solid fa-user-shield'"
          [message]="t('roles.no_roles_found')"
          [showClearFilters]="hasActiveFilters()"
          [clearFiltersText]="t('common.clear_filters')"
          (clearFilters)="onClearFilters()">
        </app-empty-state>
      } @else {
        <!-- Unified Data Table -->
        <app-data-table
          [data]="tableData()"
          [columns]="tableColumns()"
          [actions]="tableActions()"
          [loading]="loading"
          [paginated]="true"
          [emptyMessage]="t('roles.no_roles_found')"
          [responsiveMode]="'auto'"
          (actionClick)="onActionClick($event)"
          class="table-hover">
        </app-data-table>
      }
    </div>
  </div>
</div>

<!-- Permission Management Modal -->
<app-modal-wrapper
  [show]="showPermissionsModal()"
  [title]="t('roles.manage_permissions_for') + ': ' + (selectedRole()?.name || '')"
  [size]="'xl'"
  [centered]="true"
  [loading]="managingPermissions()"
  (close)="closePermissionsModal()">

  <div class="modal-body">
          @if (selectedRole()) {
            <!-- Role Info -->
            <div class="role-info mb-4">
              <div class="d-flex align-items-center">
                <div class="avatar-md me-3">
                  <div class="avatar-title bg-info-subtle text-info rounded-circle">
                    <i class="fa-solid fa-user-shield"></i>
                  </div>
                </div>
                <div>
                  <h6 class="mb-1">{{ selectedRole()!.name }}</h6>
                  <p class="text-muted mb-0">
                    {{ selectedRole()!.permissions.length }} {{ t('roles.permissions_assigned') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- All Permissions List -->
            <div class="permissions-list border rounded p-3" style="max-height: 400px; overflow-y: auto;">
              <div class="row g-2">
                @for (permission of allPermissions(); track permission.id) {
                  <div class="col-md-6 col-lg-4">
                    <div class="permission-item border rounded p-2" 
                         [class.bg-light]="isPermissionAssigned(permission.id)"
                         [class.loading]="managingPermissions()">
                      <div class="form-check d-flex align-items-start">
                        <input
                          class="form-check-input mt-1"
                          type="checkbox"
                          [id]="'permission-' + permission.id"
                          [checked]="isPermissionAssigned(permission.id)"
                          [disabled]="managingPermissions()"
                          (change)="onTogglePermission(permission)"
                        />
                        <div class="form-check-content ms-2 flex-grow-1">
                          <div class="d-flex align-items-center mb-1">
                            <i class="fas me-1 text-muted" [ngClass]="getPermissionIcon(permission.key)" style="font-size: 0.75rem;"></i>
                            <label class="form-check-label fw-medium me-2" [for]="'permission-' + permission.id">
                              <small>{{ getPermissionResource(permission.key) }}</small>
                            </label>
                            <app-status-badge
                              [status]="getPermissionBadgeStatus(permission.key)"
                              [label]="getPermissionAction(permission.key)"
                              [size]="'sm'">
                            </app-status-badge>
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
              
              @if (allPermissions().length === 0) {
                <app-empty-state
                  [icon]="'fa-solid fa-key'"
                  [message]="t('roles.no_permissions_available')"
                  [size]="'sm'">
                </app-empty-state>
              }
            </div>

            @if (managingPermissions()) {
              <div class="text-center py-3">
                <app-loading-spinner
                  [message]="t('roles.updating_permissions')"
                  [variant]="'primary'"
                  [size]="'sm'"
                  [centered]="true">
                </app-loading-spinner>
              </div>
            }
          }
  </div>

  <div modal-footer class="d-flex gap-2 justify-content-end">
    <button type="button" class="btn btn-secondary" (click)="closePermissionsModal()">
      {{ t('common.close') }}
    </button>
  </div>

</app-modal-wrapper>

`, styles: ["/* src/app/pages/roles/roles.component.css */\n.roles-page {\n  padding: 0;\n}\n.avatar-sm {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-md {\n  width: 3rem;\n  height: 3rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.avatar-title {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.permission-item {\n  padding: 0.75rem;\n  border: 1px solid #e9ecef;\n  border-radius: 0.375rem;\n  transition: all 0.15s ease-in-out;\n  background-color: #ffffff;\n}\n.permission-item:hover {\n  border-color: #0d6efd;\n  background-color: #f8f9fa;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.permission-item.bg-light {\n  background-color: #e3f2fd !important;\n  border-color: #2196f3 !important;\n  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.2);\n}\n.permission-item.loading {\n  opacity: 0.6;\n  pointer-events: none;\n}\n.permission-group {\n  background-color: #ffffff;\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.permission-group h6 {\n  color: #212529;\n  font-weight: 600;\n  margin-bottom: 1rem;\n}\n.form-check-content {\n  min-width: 0;\n}\n.form-check-label {\n  word-break: break-word;\n  color: #000000 !important;\n  font-weight: 600 !important;\n  font-size: 0.9rem !important;\n}\n.form-check-label small {\n  color: #000000 !important;\n  font-weight: 600 !important;\n  font-size: 0.9rem !important;\n}\n.permission-item .text-muted {\n  color: #333333 !important;\n  font-size: 0.8rem !important;\n  line-height: 1.3 !important;\n  font-weight: 500 !important;\n}\n.permissions-groups .border {\n  border-color: #dee2e6 !important;\n}\n.bg-purple-subtle {\n  background-color: #e9d5ff !important;\n}\n.text-purple {\n  color: #7c3aed !important;\n}\n.permission-item .badge {\n  font-size: 0.7rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.permission-item .form-check-label {\n  font-size: 0.85rem;\n}\n.permission-group .badge {\n  font-size: 0.75rem;\n}\n.badge.small {\n  font-size: 0.65em;\n}\n.btn-group .btn:disabled,\n.btn-group .btn.disabled {\n  opacity: 0.4;\n}\n.table td {\n  vertical-align: middle;\n}\n.role-info {\n  background-color: #f8f9fa;\n  border-radius: 0.5rem;\n  padding: 1rem;\n}\nth.sortable {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: background-color 0.15s ease-in-out;\n}\nth.sortable:hover {\n  background-color: #e9ecef;\n}\nth.sortable i {\n  font-size: 0.75rem;\n  opacity: 0.7;\n  transition: opacity 0.15s ease-in-out;\n}\nth.sortable:hover i {\n  opacity: 1;\n}\n/*# sourceMappingURL=roles.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RolesComponent, { className: "RolesComponent", filePath: "src/app/pages/roles/roles.component.ts", lineNumber: 28 });
})();
export {
  RolesComponent
};
//# sourceMappingURL=chunk-AWWYH3X3.js.map
