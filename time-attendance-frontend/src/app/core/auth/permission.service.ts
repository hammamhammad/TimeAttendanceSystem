import { Injectable, computed } from '@angular/core';
import { AuthService } from './auth.service';
import { PermissionUtils, PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private userPermissions = computed(() => {
    const user = this.authService.currentUser();
    return user?.permissions || [];
  });

  constructor(private authService: AuthService) {}

  has(permission: string): boolean {
    const permissions = this.userPermissions();
    return permissions.includes(permission) || permissions.includes('*');
  }

  hasAny(permissions: string[]): boolean {
    return permissions.some(permission => this.has(permission));
  }

  hasAll(permissions: string[]): boolean {
    return permissions.every(permission => this.has(permission));
  }

  hasRole(role: string): boolean {
    const user = this.authService.currentUser();
    return user?.roles?.includes(role) || false;
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isSuperAdmin(): boolean {
    return this.hasRole('SuperAdmin');
  }

  canAccessBranch(branchId: number): boolean {
    const user = this.authService.currentUser();
    if (!user?.branchIds || user.branchIds.length === 0) {
      return true; // No branch restriction
    }
    return user.branchIds.includes(branchId);
  }

  // Enhanced permission checking methods using PermissionUtils
  canRead(resource: string): boolean {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.READ));
  }

  canCreate(resource: string): boolean {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.CREATE));
  }

  canUpdate(resource: string): boolean {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.UPDATE));
  }

  canDelete(resource: string): boolean {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.DELETE));
  }

  canExport(resource: string): boolean {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.EXPORT));
  }

  canImport(resource: string): boolean {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.IMPORT));
  }

  canManage(resource: string): boolean {
    return this.has(PermissionUtils.buildPermissionKey(resource, PermissionActions.MANAGE));
  }

  // Resource-specific helper methods
  canManageUsers(): boolean {
    return this.hasAny([
      PermissionUtils.buildPermissionKey(PermissionResources.USER, PermissionActions.CREATE),
      PermissionUtils.buildPermissionKey(PermissionResources.USER, PermissionActions.UPDATE),
      PermissionUtils.buildPermissionKey(PermissionResources.USER, PermissionActions.DELETE),
      PermissionUtils.buildPermissionKey(PermissionResources.USER, PermissionActions.MANAGE)
    ]);
  }

  canManageRoles(): boolean {
    return this.hasAny([
      PermissionUtils.buildPermissionKey(PermissionResources.ROLE, PermissionActions.CREATE),
      PermissionUtils.buildPermissionKey(PermissionResources.ROLE, PermissionActions.UPDATE),
      PermissionUtils.buildPermissionKey(PermissionResources.ROLE, PermissionActions.DELETE),
      PermissionUtils.buildPermissionKey(PermissionResources.ROLE, PermissionActions.MANAGE)
    ]);
  }

  canManageEmployees(): boolean {
    return this.hasAny([
      PermissionUtils.buildPermissionKey(PermissionResources.EMPLOYEE, PermissionActions.CREATE),
      PermissionUtils.buildPermissionKey(PermissionResources.EMPLOYEE, PermissionActions.UPDATE),
      PermissionUtils.buildPermissionKey(PermissionResources.EMPLOYEE, PermissionActions.DELETE),
      PermissionUtils.buildPermissionKey(PermissionResources.EMPLOYEE, PermissionActions.MANAGE)
    ]);
  }

  canAccessShifts(): boolean {
    return this.hasAny([
      'shift.read',
      'shift.create',
      'shift.update',
      'shift.delete',
      'shift.assign',
      'shift.unassign',
      'shift.export',
      'shift.import'
    ]);
  }


  // ==== POLICY-BASED AUTHORIZATION METHODS (Mirroring Backend Policies) ====

  // Employee Management Policies
  canReadEmployees(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.isManager() ||
           this.has('employee.read');
  }

  canManageEmployeesPolicy(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'employee.create',
             'employee.update',
             'employee.delete',
             'employee.manage'
           ]);
  }

  canAssignEmployeeShifts(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.isManager() ||
           this.has('employee.assign');
  }

  // User Management Policies
  canReadUsers(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.has('user.read');
  }

  canManageUsersPolicy(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'user.create',
             'user.update',
             'user.delete',
             'user.manage'
           ]);
  }

  canAssignUserRoles(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'user.assignRole',
             'user.removeRole'
           ]);
  }

  canManageUserSessions(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.has('user.session.manage');
  }

  // Shift Management Policies
  canReadShifts(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.isManager() ||
           this.has('shift.read');
  }

  canManageShiftsPolicy(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'shift.create',
             'shift.update',
             'shift.delete',
             'shift.manage'
           ]);
  }

  // Branch Management Policies
  canReadBranches(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.isManager() ||
           this.has('branch.read');
  }

  canManageBranches(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'branch.create',
             'branch.update',
             'branch.delete',
             'branch.manage'
           ]);
  }

  // Department Management Policies
  canReadDepartments(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.isManager() ||
           this.has('department.read');
  }

  canManageDepartments(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'department.create',
             'department.update',
             'department.delete',
             'department.manage'
           ]);
  }

  // Role and Permission Management Policies
  canReadRoles(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.has('role.read');
  }

  canManageRolesPolicy(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'role.create',
             'role.update',
             'role.delete',
             'role.manage'
           ]);
  }

  canManagePermissions(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'permission.assign',
             'permission.remove',
             'permission.manage'
           ]);
  }

  // Attendance Management Policies
  canReadAttendance(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.isManager() ||
           this.has('attendance.read');
  }

  canManageAttendance(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'attendance.create',
             'attendance.update',
             'attendance.delete',
             'attendance.manage'
           ]);
  }

  // Settings Management Policies
  canReadSettings(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.has('settings.read');
  }

  canManageSettings(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'settings.create',
             'settings.update',
             'settings.delete',
             'settings.manage'
           ]);
  }

  // Report Access Policies
  canAccessReports(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.isManager() ||
           this.hasAny([
             'report.read',
             'report.view',
             'report.access'
           ]);
  }

  // Security and Audit Policies
  canAccessSecurityAudit(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'audit.read',
             'audit.view',
             'security.audit'
           ]);
  }

  canSystemAdministration(): boolean {
    return this.isSystemAdmin() ||
           this.hasAny([
             'system.admin',
             'system.configure',
             'system.manage'
           ]);
  }

  // Public Holidays Management Policies
  canReadPublicHolidays(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.has('publicHoliday.read');
  }

  canManagePublicHolidays(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.hasAny([
             'publicHoliday.create',
             'publicHoliday.update',
             'publicHoliday.delete',
             'publicHoliday.manage'
           ]);
  }

  canExportPublicHolidays(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.has('publicHoliday.export');
  }

  canImportPublicHolidays(): boolean {
    return this.isSystemAdmin() ||
           this.isAdmin() ||
           this.has('publicHoliday.import');
  }


  // Role-based Helper Methods
  private isSystemAdmin(): boolean {
    return this.hasRole('SystemAdmin');
  }

  private isManager(): boolean {
    return this.hasRole('Manager');
  }

  private isEmployee(): boolean {
    return this.hasRole('Employee');
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
}