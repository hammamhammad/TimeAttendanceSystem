import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { RolesService, CreateRoleRequest, PermissionGroupDto } from '../roles.service';
import { Permission } from '../../../shared/models/role.model';
import { PermissionUtils } from '../../../shared/utils/permission.utils';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  private rolesService = inject(RolesService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  // Signals for state management
  loading = signal(false);
  submitting = signal(false);
  error = signal<string | null>(null);
  allPermissions = signal<Permission[]>([]);
  groupedPermissions = signal<PermissionGroupDto[]>([]);

  // Form state
  roleForm = {
    name: '',
    selectedPermissions: new Set<number>()
  };

  // Filter state
  permissionSearchTerm = '';

  ngOnInit(): void {
    this.loadPermissions();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadPermissions(): void {
    this.loading.set(true);
    this.rolesService.getPermissions().subscribe({
      next: (permissions) => {
        this.allPermissions.set(permissions);
        this.groupedPermissions.set(this.groupPermissionsByGroup(permissions));
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load permissions:', error);
        this.error.set(this.t('roles.failed_to_load_permissions'));
        this.loading.set(false);
        this.notificationService.error(
          this.t('app.error'),
          this.t('roles.failed_to_load_permissions')
        );
      }
    });
  }

  groupPermissionsByGroup(permissions: Permission[]): PermissionGroupDto[] {
    const grouped = permissions.reduce((acc, permission) => {
      const group = permission.group || 'General';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);

    return Object.entries(grouped).map(([group, permissions]) => ({
      group,
      permissions: permissions.sort((a, b) => a.key.localeCompare(b.key))
    }));
  }

  onSubmit(): void {
    if (!this.roleForm.name.trim()) {
      this.error.set(this.t('roles.role_name_required'));
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    const request: CreateRoleRequest = {
      name: this.roleForm.name.trim(),
      permissionIds: Array.from(this.roleForm.selectedPermissions)
    };

    this.rolesService.createRole(request).subscribe({
      next: () => {
        this.notificationService.success(
          this.t('app.success'),
          this.t('roles.role_created_successfully')
        );
        this.router.navigate(['/roles']);
      },
      error: (error) => {
        console.error('Failed to create role:', error);
        this.error.set(this.getErrorMessage(error));
        this.submitting.set(false);
        this.notificationService.error(
          this.t('app.error'),
          this.getErrorMessage(error)
        );
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/roles']);
  }

  onTogglePermissionForRole(permission: Permission): void {
    if (this.roleForm.selectedPermissions.has(permission.id)) {
      this.roleForm.selectedPermissions.delete(permission.id);
    } else {
      this.roleForm.selectedPermissions.add(permission.id);
    }
  }

  isPermissionSelectedForRole(permissionId: number): boolean {
    return this.roleForm.selectedPermissions.has(permissionId);
  }

  selectAllPermissions(): void {
    this.allPermissions().forEach(permission => {
      this.roleForm.selectedPermissions.add(permission.id);
    });
  }

  clearAllPermissions(): void {
    this.roleForm.selectedPermissions.clear();
  }

  getFilteredGroupedPermissions(): PermissionGroupDto[] {
    if (!this.permissionSearchTerm.trim()) {
      return this.groupedPermissions();
    }

    const searchTerm = this.permissionSearchTerm.toLowerCase();
    return this.groupedPermissions()
      .map(group => ({
        ...group,
        permissions: group.permissions.filter(permission =>
          permission.key.toLowerCase().includes(searchTerm) ||
          (permission.description && permission.description.toLowerCase().includes(searchTerm))
        )
      }))
      .filter(group => group.permissions.length > 0);
  }

  // Permission utility methods (similar to those in roles.component.ts)
  getPermissionIcon(key: string): string {
    const { resource } = PermissionUtils.parsePermissionKey(key);
    return PermissionUtils.getResourceIcon(resource);
  }

  getPermissionResource(key: string): string {
    const { resource } = PermissionUtils.parsePermissionKey(key);
    return PermissionUtils.getResourceName(resource);
  }

  getPermissionAction(key: string): string {
    const { action } = PermissionUtils.parsePermissionKey(key);
    return PermissionUtils.getActionName(action);
  }

  getActionBadgeClass(key: string): string {
    const { action } = PermissionUtils.parsePermissionKey(key);
    return PermissionUtils.getActionBadgeClass(action);
  }

  getPermissionDescription(permission: Permission): string {
    return permission.description || this.t('roles.no_description');
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    if (error?.error?.message) {
      return error.error.message;
    }
    return this.t('roles.failed_to_create_role');
  }
}