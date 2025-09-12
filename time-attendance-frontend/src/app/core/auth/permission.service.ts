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
}