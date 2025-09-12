import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { RolesService, CreateRoleRequest, UpdateRoleRequest, PermissionGroupDto } from './roles.service';
import { Role, Permission } from '../../shared/models/role.model';
import { PermissionUtils, PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, HasPermissionDirective],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  private rolesService = inject(RolesService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    ROLE_CREATE: `${PermissionResources.ROLE}.${PermissionActions.CREATE}`,
    ROLE_READ: `${PermissionResources.ROLE}.${PermissionActions.READ}`,
    ROLE_UPDATE: `${PermissionResources.ROLE}.${PermissionActions.UPDATE}`,
    ROLE_DELETE: `${PermissionResources.ROLE}.${PermissionActions.DELETE}`,
    ROLE_MANAGE: `${PermissionResources.ROLE}.${PermissionActions.MANAGE}`,
    ROLE_ASSIGN_PERMISSIONS: `${PermissionResources.ROLE}.${PermissionActions.ASSIGN_PERMISSION}`
  };

  // Signals for state management
  loading = signal(false);
  roles = signal<Role[]>([]);
  allPermissions = signal<Permission[]>([]);
  groupedPermissions = signal<PermissionGroupDto[]>([]);
  
  // Filter signals
  searchTerm = '';
  
  // Modal state
  showPermissionsModal = signal(false);
  selectedRole = signal<Role | null>(null);
  managingPermissions = signal(false);
  

  ngOnInit(): void {
    this.loadRoles();
    this.loadPermissions();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadRoles(): void {
    this.loading.set(true);
    this.rolesService.getRoles(true).subscribe({
      next: (roles) => {
        this.roles.set(roles);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load roles:', error);
        this.loading.set(false);
        this.notificationService.error(
          this.t('app.error'),
          this.t('errors.server')
        );
      }
    });
  }

  loadPermissions(): void {
    // Load flat permissions for existing functionality
    this.rolesService.getPermissions().subscribe({
      next: (permissions) => {
        this.allPermissions.set(permissions);
      },
      error: (error) => {
        console.error('Failed to load permissions:', error);
        this.notificationService.error(
          this.t('app.error'),
          'Failed to load permissions'
        );
      }
    });

    // Load grouped permissions for display
    this.rolesService.getGroupedPermissions().subscribe({
      next: (groupedPermissions) => {
        this.groupedPermissions.set(groupedPermissions);
      },
      error: (error) => {
        console.error('Failed to load grouped permissions:', error);
        this.notificationService.error(
          this.t('app.error'),
          'Failed to load grouped permissions'
        );
      }
    });
  }

  filteredRoles() {
    let filtered = this.roles();

    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(role => 
        role.name.toLowerCase().includes(search)
      );
    }

    return filtered;
  }

  canEditRole(role: Role): boolean {
    // First check if user has permission to update roles
    if (!this.permissionService.has(this.PERMISSIONS.ROLE_UPDATE)) {
      return false;
    }

    // Use business logic helper
    return this.canEditRoleBusinessLogic(role);
  }

  canDeleteRole(role: Role): boolean {
    // First check if user has permission to delete roles
    if (!this.permissionService.has(this.PERMISSIONS.ROLE_DELETE)) {
      return false;
    }

    // Explicitly protect Systemadmin and admin roles
    const protectedRoles = ['systemadmin', 'admin'];
    const isProtectedRole = protectedRoles.includes(role.name.toLowerCase());
    
    // Allow deletion if not a protected role, not a system role, and has no users assigned
    return !role.isSystem && !isProtectedRole && role.userCount === 0;
  }

  isProtectedRole(role: Role): boolean {
    const protectedRoles = ['systemadmin', 'admin'];
    return protectedRoles.includes(role.name.toLowerCase()) || role.isSystem;
  }

  canManagePermissions(role: Role): boolean {
    // First check if user has permission to assign permissions
    if (!this.permissionService.has(this.PERMISSIONS.ROLE_ASSIGN_PERMISSIONS)) {
      return false;
    }

    // Use same business logic as canEditRole for consistency
    return this.canEditRoleBusinessLogic(role);
  }

  private canEditRoleBusinessLogic(role: Role): boolean {
    // Explicitly protect Systemadmin and admin roles
    const protectedRoles = ['systemadmin', 'admin'];
    const isProtectedRole = protectedRoles.includes(role.name.toLowerCase());
    
    // Allow editing if not a protected role and not a system role
    return !role.isSystem && !isProtectedRole;
  }

  onManagePermissions(role: Role): void {
    if (!this.canManagePermissions(role)) {
      return;
    }
    this.selectedRole.set(role);
    this.showPermissionsModal.set(true);
  }

  closePermissionsModal(): void {
    this.showPermissionsModal.set(false);
    this.selectedRole.set(null);
  }

  isPermissionAssigned(permissionId: number): boolean {
    const role = this.selectedRole();
    if (!role) return false;
    return role.permissions.some(p => p.id === permissionId);
  }

  onTogglePermission(permission: Permission): void {
    const role = this.selectedRole();
    if (!role || this.managingPermissions()) return;

    this.managingPermissions.set(true);
    
    const isAssigned = this.isPermissionAssigned(permission.id);
    
    const operation = isAssigned 
      ? this.rolesService.removePermissionFromRole(role.id, permission.id)
      : this.rolesService.assignPermissionToRole(role.id, { permissionId: permission.id });

    operation.subscribe({
      next: () => {
        // Update the role's permissions locally
        const updatedRoles = this.roles().map(r => {
          if (r.id === role.id) {
            if (isAssigned) {
              r.permissions = r.permissions.filter(p => p.id !== permission.id);
            } else {
              r.permissions = [...r.permissions, permission];
            }
          }
          return r;
        });
        this.roles.set(updatedRoles);
        this.selectedRole.set(updatedRoles.find(r => r.id === role.id) || null);
        this.managingPermissions.set(false);
      },
      error: (error) => {
        console.error('Failed to update permission:', error);
        this.managingPermissions.set(false);
        this.notificationService.error(
          this.t('app.error'),
          'Failed to update permission'
        );
      }
    });
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  onSearchChange(): void {
    // Debounce search
    setTimeout(() => {
      // Search is handled by filteredRoles() computed
    }, 300);
  }

  onClearFilters(): void {
    this.searchTerm = '';
  }

  hasActiveFilters(): boolean {
    return !!this.searchTerm;
  }

  // Role CRUD operations
  onCreateRole(): void {
    // Navigate to create role page instead of showing modal
    this.router.navigate(['/roles/create']);
  }

  onViewRole(role: Role): void {
    this.router.navigate(['/roles', role.id, 'view']);
  }

  onEditRole(role: Role): void {
    if (!this.canEditRole(role)) return;
    // Navigate to edit role page
    this.router.navigate(['/roles', role.id, 'edit']);
  }

  async onDeleteRole(role: Role): Promise<void> {
    if (!this.canDeleteRole(role)) return;
    
    const result = await this.confirmationService.confirm({
      title: 'Delete Role',
      message: `Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`,
      confirmText: this.t('common.delete'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });
    
    if (result.confirmed) {
      this.rolesService.deleteRole(role.id).subscribe({
        next: () => {
          this.roles.set(this.roles().filter(r => r.id !== role.id));
          this.notificationService.success(
            this.t('app.success'),
            'Role deleted successfully'
          );
        },
        error: (error) => {
          console.error('Failed to delete role:', error);
          this.notificationService.error(
            this.t('app.error'),
            this.t('errors.server')
          );
        }
      });
    }
  }


  canCreateRoles(): boolean {
    // Check if user has permission to create roles
    return this.permissionService.has(this.PERMISSIONS.ROLE_CREATE);
  }


  // Permission display enhancement methods using PermissionUtils
  getPermissionResource(permissionKey: string): string {
    return PermissionUtils.getResourceName(PermissionUtils.parsePermissionKey(permissionKey).resource);
  }

  getPermissionAction(permissionKey: string): string {
    const action = PermissionUtils.parsePermissionKey(permissionKey).action;
    return action ? PermissionUtils.getActionName(action) : 'Action';
  }

  getActionBadgeClass(permissionKey: string): string {
    const action = PermissionUtils.parsePermissionKey(permissionKey).action;
    return action ? PermissionUtils.getActionBadgeClass(action) : 'bg-light text-dark';
  }

  getPermissionIcon(permissionKey: string): string {
    const resource = PermissionUtils.parsePermissionKey(permissionKey).resource;
    return PermissionUtils.getResourceIcon(resource);
  }

  getPermissionDescription(permission: Permission): string {
    if (permission.description) {
      return permission.description;
    }
    const { resource, action } = PermissionUtils.parsePermissionKey(permission.key);
    const actionDesc = PermissionUtils.getActionDescription(action);
    const resourceDesc = PermissionUtils.getResourceDescription(resource);
    return `${actionDesc} ${resourceDesc.toLowerCase()}`;
  }
}