import {
  AuthService
} from "./chunk-IL4NCC2P.js";
import {
  Injectable,
  computed,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/utils/permission.utils.ts
var PermissionActions = {
  READ: "read",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  EXPORT: "export",
  IMPORT: "import",
  APPROVE: "approve",
  REJECT: "reject",
  LOCK: "lock",
  UNLOCK: "unlock",
  RESET_PASSWORD: "resetPassword",
  ASSIGN_ROLE: "assignRole",
  REMOVE_ROLE: "removeRole",
  ASSIGN_PERMISSION: "assignPermission",
  REMOVE_PERMISSION: "removePermission",
  VIEW: "view",
  DOWNLOAD: "download",
  UPLOAD: "upload",
  ARCHIVE: "archive",
  RESTORE: "restore",
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate",
  ASSIGN: "assign",
  UNASSIGN: "unassign",
  MANAGE: "manage",
  CONFIGURE: "configure",
  BULK_CREATE: "bulkCreate"
};
var PermissionResources = {
  USER: "user",
  ROLE: "role",
  EMPLOYEE: "employee",
  BRANCH: "branch",
  DEPARTMENT: "department",
  SHIFT: "shift",
  ATTENDANCE: "attendance",
  SCHEDULE: "schedule",
  REPORT: "report",
  SETTINGS: "settings",
  DASHBOARD: "dashboard",
  PERMISSION: "permission",
  AUDIT: "audit",
  NOTIFICATION: "notification",
  SYSTEM: "system",
  VACATION_TYPE: "vacationType",
  VACATION: "vacation",
  EXCUSE: "excuse"
};
var ActionDescriptions = {
  [PermissionActions.READ]: "View and read data",
  [PermissionActions.CREATE]: "Create new records",
  [PermissionActions.UPDATE]: "Modify existing records",
  [PermissionActions.DELETE]: "Remove records permanently",
  [PermissionActions.EXPORT]: "Export data to external formats",
  [PermissionActions.IMPORT]: "Import data from external sources",
  [PermissionActions.APPROVE]: "Approve pending requests or changes",
  [PermissionActions.REJECT]: "Reject pending requests or changes",
  [PermissionActions.LOCK]: "Lock or disable accounts",
  [PermissionActions.UNLOCK]: "Unlock or enable accounts",
  [PermissionActions.RESET_PASSWORD]: "Reset user passwords",
  [PermissionActions.ASSIGN_ROLE]: "Assign roles to users",
  [PermissionActions.REMOVE_ROLE]: "Remove roles from users",
  [PermissionActions.ASSIGN_PERMISSION]: "Assign permissions to roles",
  [PermissionActions.REMOVE_PERMISSION]: "Remove permissions from roles",
  [PermissionActions.VIEW]: "View detailed information",
  [PermissionActions.DOWNLOAD]: "Download files or data",
  [PermissionActions.UPLOAD]: "Upload files or data",
  [PermissionActions.ARCHIVE]: "Archive records for long-term storage",
  [PermissionActions.RESTORE]: "Restore archived or deleted records",
  [PermissionActions.ACTIVATE]: "Activate inactive records",
  [PermissionActions.DEACTIVATE]: "Deactivate active records",
  [PermissionActions.ASSIGN]: "Assign resources or relationships",
  [PermissionActions.UNASSIGN]: "Remove resource assignments",
  [PermissionActions.MANAGE]: "Full management capabilities",
  [PermissionActions.CONFIGURE]: "Configure settings and parameters",
  [PermissionActions.BULK_CREATE]: "Create multiple records in bulk operations"
};
var ResourceDescriptions = {
  [PermissionResources.USER]: "User accounts and profiles",
  [PermissionResources.ROLE]: "User roles and access levels",
  [PermissionResources.EMPLOYEE]: "Employee records and information",
  [PermissionResources.BRANCH]: "Company branches and locations",
  [PermissionResources.DEPARTMENT]: "Organizational departments",
  [PermissionResources.SHIFT]: "Work shifts and time periods",
  [PermissionResources.ATTENDANCE]: "Time tracking and attendance records",
  [PermissionResources.SCHEDULE]: "Work schedules and shift management",
  [PermissionResources.REPORT]: "Reports and analytics",
  [PermissionResources.SETTINGS]: "System configuration and settings",
  [PermissionResources.DASHBOARD]: "Dashboard views and widgets",
  [PermissionResources.PERMISSION]: "Permission management",
  [PermissionResources.AUDIT]: "Audit logs and security tracking",
  [PermissionResources.NOTIFICATION]: "System notifications and alerts",
  [PermissionResources.SYSTEM]: "Core system functions",
  [PermissionResources.VACATION_TYPE]: "Vacation types and leave policies",
  [PermissionResources.VACATION]: "Employee vacation records and management",
  [PermissionResources.EXCUSE]: "Employee excuse management and approval"
};
var ActionColors = {
  [PermissionActions.READ]: "info",
  [PermissionActions.VIEW]: "info",
  [PermissionActions.CREATE]: "success",
  [PermissionActions.UPDATE]: "warning",
  [PermissionActions.DELETE]: "danger",
  [PermissionActions.EXPORT]: "primary",
  [PermissionActions.IMPORT]: "secondary",
  [PermissionActions.DOWNLOAD]: "primary",
  [PermissionActions.UPLOAD]: "secondary",
  [PermissionActions.APPROVE]: "success",
  [PermissionActions.REJECT]: "danger",
  [PermissionActions.LOCK]: "danger",
  [PermissionActions.UNLOCK]: "success",
  [PermissionActions.RESET_PASSWORD]: "warning",
  [PermissionActions.ASSIGN_ROLE]: "info",
  [PermissionActions.REMOVE_ROLE]: "warning",
  [PermissionActions.ASSIGN_PERMISSION]: "info",
  [PermissionActions.REMOVE_PERMISSION]: "warning",
  [PermissionActions.ARCHIVE]: "secondary",
  [PermissionActions.RESTORE]: "success",
  [PermissionActions.ACTIVATE]: "success",
  [PermissionActions.DEACTIVATE]: "warning",
  [PermissionActions.ASSIGN]: "info",
  [PermissionActions.UNASSIGN]: "warning",
  [PermissionActions.MANAGE]: "primary",
  [PermissionActions.CONFIGURE]: "primary",
  [PermissionActions.BULK_CREATE]: "primary"
};
var ResourceIcons = {
  [PermissionResources.USER]: "fa-user",
  [PermissionResources.ROLE]: "fa-user-shield",
  [PermissionResources.EMPLOYEE]: "fa-users",
  [PermissionResources.BRANCH]: "fa-building",
  [PermissionResources.DEPARTMENT]: "fa-sitemap",
  [PermissionResources.SHIFT]: "fa-clock",
  [PermissionResources.ATTENDANCE]: "fa-user-clock",
  [PermissionResources.SCHEDULE]: "fa-calendar-alt",
  [PermissionResources.REPORT]: "fa-chart-bar",
  [PermissionResources.SETTINGS]: "fa-cog",
  [PermissionResources.DASHBOARD]: "fa-tachometer-alt",
  [PermissionResources.PERMISSION]: "fa-key",
  [PermissionResources.AUDIT]: "fa-history",
  [PermissionResources.NOTIFICATION]: "fa-bell",
  [PermissionResources.SYSTEM]: "fa-server",
  [PermissionResources.VACATION_TYPE]: "fa-calendar-times",
  [PermissionResources.VACATION]: "fa-calendar-week",
  [PermissionResources.EXCUSE]: "fa-clipboard-check"
};
var _PermissionUtils = class _PermissionUtils {
  static parsePermissionKey(key) {
    if (!key || typeof key !== "string") {
      return {
        resource: "",
        action: "",
        key: ""
      };
    }
    const parts = key.split(".", 2);
    if (parts.length === 2) {
      return {
        resource: parts[0],
        action: parts[1],
        key
      };
    }
    return {
      resource: key,
      action: "",
      key
    };
  }
  static buildPermissionKey(resource, action) {
    return `${resource}.${action}`;
  }
  static getResourceName(resource) {
    return resource.charAt(0).toUpperCase() + resource.slice(1);
  }
  static getActionName(action) {
    const result = action.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  static getActionDescription(action) {
    return ActionDescriptions[action] || this.getActionName(action);
  }
  static getResourceDescription(resource) {
    return ResourceDescriptions[resource] || this.getResourceName(resource);
  }
  static getActionColor(action) {
    return ActionColors[action] || "light";
  }
  static getResourceIcon(resource) {
    return ResourceIcons[resource] || "fa-question";
  }
  static getActionBadgeClass(action) {
    const color = this.getActionColor(action);
    return `bg-${color}-subtle text-${color}`;
  }
  static formatPermissionDisplay(key) {
    const { resource, action } = this.parsePermissionKey(key);
    return {
      resource: this.getResourceName(resource),
      action: this.getActionName(action),
      color: this.getActionColor(action),
      icon: this.getResourceIcon(resource)
    };
  }
};
__name(_PermissionUtils, "PermissionUtils");
var PermissionUtils = _PermissionUtils;

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
  PermissionActions,
  PermissionResources,
  PermissionUtils,
  PermissionService
};
//# sourceMappingURL=chunk-DKGIYIS4.js.map
