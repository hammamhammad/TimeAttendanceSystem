import {
  PermissionActions,
  PermissionResources,
  PermissionUtils
} from "./chunk-EVMJ7ILG.js";
import {
  AuthService
} from "./chunk-O2IS3HK2.js";
import {
  Injectable,
  computed,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/core/auth/permission.service.ts
var _PermissionService = class _PermissionService {
  authService;
  userPermissions = computed(() => {
    const user = this.authService.currentUser();
    return user?.permissions || [];
  }, ...ngDevMode ? [{ debugName: "userPermissions" }] : []);
  constructor(authService) {
    this.authService = authService;
  }
  has(permission) {
    const permissions = this.userPermissions();
    return permissions.includes(permission) || permissions.includes("*");
  }
  hasAny(permissions) {
    return permissions.some((permission) => this.has(permission));
  }
  hasAll(permissions) {
    return permissions.every((permission) => this.has(permission));
  }
  hasRole(role) {
    const user = this.authService.currentUser();
    return user?.roles?.includes(role) || false;
  }
  isAdmin() {
    return this.hasRole("Admin");
  }
  isSuperAdmin() {
    return this.hasRole("SuperAdmin");
  }
  canAccessBranch(branchId) {
    const user = this.authService.currentUser();
    if (!user?.branchIds || user.branchIds.length === 0) {
      return true;
    }
    return user.branchIds.includes(branchId);
  }
  // Enhanced permission checking methods using PermissionUtils
  canRead(resource) {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.READ));
  }
  canCreate(resource) {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.CREATE));
  }
  canUpdate(resource) {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.UPDATE));
  }
  canDelete(resource) {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.DELETE));
  }
  canExport(resource) {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.EXPORT));
  }
  canImport(resource) {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.IMPORT));
  }
  canManage(resource) {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.MANAGE));
  }
  // Resource-specific helper methods
  canManageUsers() {
    return this.hasAny([
      PermissionUtils.buildPermissionKey(PermissionResources.USER, PermissionActions.CREATE),
      PermissionUtils.buildPermissionKey(PermissionResources.USER, PermissionActions.UPDATE),
      PermissionUtils.buildPermissionKey(PermissionResources.USER, PermissionActions.DELETE),
      PermissionUtils.buildPermissionKey(PermissionResources.USER, PermissionActions.MANAGE)
    ]);
  }
  canManageRoles() {
    return this.hasAny([
      PermissionUtils.buildPermissionKey(PermissionResources.ROLE, PermissionActions.CREATE),
      PermissionUtils.buildPermissionKey(PermissionResources.ROLE, PermissionActions.UPDATE),
      PermissionUtils.buildPermissionKey(PermissionResources.ROLE, PermissionActions.DELETE),
      PermissionUtils.buildPermissionKey(PermissionResources.ROLE, PermissionActions.MANAGE)
    ]);
  }
  canManageEmployees() {
    return this.hasAny([
      PermissionUtils.buildPermissionKey(PermissionResources.EMPLOYEE, PermissionActions.CREATE),
      PermissionUtils.buildPermissionKey(PermissionResources.EMPLOYEE, PermissionActions.UPDATE),
      PermissionUtils.buildPermissionKey(PermissionResources.EMPLOYEE, PermissionActions.DELETE),
      PermissionUtils.buildPermissionKey(PermissionResources.EMPLOYEE, PermissionActions.MANAGE)
    ]);
  }
  canAccessShifts() {
    return this.hasAny([
      "shift.read",
      "shift.create",
      "shift.update",
      "shift.delete",
      "shift.assign",
      "shift.unassign",
      "shift.export",
      "shift.import"
    ]);
  }
  // ==== POLICY-BASED AUTHORIZATION METHODS (Mirroring Backend Policies) ====
  // Employee Management Policies
  canReadEmployees() {
    return this.isSystemAdmin() || this.isAdmin() || this.isManager() || this.has("employee.read");
  }
  canManageEmployeesPolicy() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "employee.create",
      "employee.update",
      "employee.delete",
      "employee.manage"
    ]);
  }
  canAssignEmployeeShifts() {
    return this.isSystemAdmin() || this.isAdmin() || this.isManager() || this.has("employee.assign");
  }
  // User Management Policies
  canReadUsers() {
    return this.isSystemAdmin() || this.isAdmin() || this.has("user.read");
  }
  canManageUsersPolicy() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "user.create",
      "user.update",
      "user.delete",
      "user.manage"
    ]);
  }
  canAssignUserRoles() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "user.assignRole",
      "user.removeRole"
    ]);
  }
  canManageUserSessions() {
    return this.isSystemAdmin() || this.isAdmin() || this.has("user.session.manage");
  }
  // Shift Management Policies
  canReadShifts() {
    return this.isSystemAdmin() || this.isAdmin() || this.isManager() || this.has("shift.read");
  }
  canManageShiftsPolicy() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "shift.create",
      "shift.update",
      "shift.delete",
      "shift.manage"
    ]);
  }
  // Branch Management Policies
  canReadBranches() {
    return this.isSystemAdmin() || this.isAdmin() || this.isManager() || this.has("branch.read");
  }
  canManageBranches() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "branch.create",
      "branch.update",
      "branch.delete",
      "branch.manage"
    ]);
  }
  // Department Management Policies
  canReadDepartments() {
    return this.isSystemAdmin() || this.isAdmin() || this.isManager() || this.has("department.read");
  }
  canManageDepartments() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "department.create",
      "department.update",
      "department.delete",
      "department.manage"
    ]);
  }
  // Role and Permission Management Policies
  canReadRoles() {
    return this.isSystemAdmin() || this.isAdmin() || this.has("role.read");
  }
  canManageRolesPolicy() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "role.create",
      "role.update",
      "role.delete",
      "role.manage"
    ]);
  }
  canManagePermissions() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "permission.assign",
      "permission.remove",
      "permission.manage"
    ]);
  }
  // Attendance Management Policies
  canReadAttendance() {
    return this.isSystemAdmin() || this.isAdmin() || this.isManager() || this.has("attendance.read");
  }
  canManageAttendance() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "attendance.create",
      "attendance.update",
      "attendance.delete",
      "attendance.manage"
    ]);
  }
  // Settings Management Policies
  canReadSettings() {
    return this.isSystemAdmin() || this.isAdmin() || this.has("settings.read");
  }
  canManageSettings() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "settings.create",
      "settings.update",
      "settings.delete",
      "settings.manage"
    ]);
  }
  // Report Access Policies
  canAccessReports() {
    return this.isSystemAdmin() || this.isAdmin() || this.isManager() || this.hasAny([
      "report.read",
      "report.view",
      "report.access"
    ]);
  }
  // Security and Audit Policies
  canAccessSecurityAudit() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "audit.read",
      "audit.view",
      "security.audit"
    ]);
  }
  canSystemAdministration() {
    return this.isSystemAdmin() || this.hasAny([
      "system.admin",
      "system.configure",
      "system.manage"
    ]);
  }
  // Public Holidays Management Policies
  canReadPublicHolidays() {
    return this.isSystemAdmin() || this.isAdmin() || this.has("publicHoliday.read");
  }
  canManagePublicHolidays() {
    return this.isSystemAdmin() || this.isAdmin() || this.hasAny([
      "publicHoliday.create",
      "publicHoliday.update",
      "publicHoliday.delete",
      "publicHoliday.manage"
    ]);
  }
  canExportPublicHolidays() {
    return this.isSystemAdmin() || this.isAdmin() || this.has("publicHoliday.export");
  }
  canImportPublicHolidays() {
    return this.isSystemAdmin() || this.isAdmin() || this.has("publicHoliday.import");
  }
  // Role-based Helper Methods
  isSystemAdmin() {
    return this.hasRole("SystemAdmin");
  }
  isManager() {
    return this.hasRole("Manager");
  }
  isEmployee() {
    return this.hasRole("Employee");
  }
  /**
   * Get current user
   */
  getCurrentUser() {
    return this.authService.currentUser();
  }
  /**
   * Get current employee (alias for getCurrentUser)
   */
  getCurrentEmployee() {
    return this.authService.currentUser();
  }
};
__name(_PermissionService, "PermissionService");
__publicField(_PermissionService, "\u0275fac", /* @__PURE__ */ __name(function PermissionService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PermissionService)(\u0275\u0275inject(AuthService));
}, "PermissionService_Factory"));
__publicField(_PermissionService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PermissionService, factory: _PermissionService.\u0275fac, providedIn: "root" }));
var PermissionService = _PermissionService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PermissionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: AuthService }], null);
})();

export {
  PermissionService
};
//# sourceMappingURL=chunk-DWXA666M.js.map
