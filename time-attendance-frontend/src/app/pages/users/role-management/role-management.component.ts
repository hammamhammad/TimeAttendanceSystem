import { Component, OnInit, signal, computed, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { UsersService } from '../users.service';
import { UserDto, AssignRoleRequest } from '../../../shared/models/user.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';

interface Role {
  id: number;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, HasPermissionDirective, ModalWrapperComponent],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  @Input() user: UserDto | null = null;
  @Input() show = false;
  @Output() showChange = new EventEmitter<boolean>();
  @Output() rolesUpdated = new EventEmitter<UserDto>();

  private usersService = inject(UsersService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    USER_ASSIGN_ROLE: `${PermissionResources.USER}.${PermissionActions.ASSIGN_ROLE}`,
    USER_MANAGE: `${PermissionResources.USER}.${PermissionActions.MANAGE}`
  };

  loading = signal(false);
  error = signal('');
  
  // Mock roles data - in real app this would come from a roles service
  availableRoles = signal<Role[]>([
    { 
      id: 1, 
      name: 'SystemAdmin', 
      description: 'Full system access with all permissions' 
    },
    { 
      id: 2, 
      name: 'Admin', 
      description: 'Administrative access to employee and role management' 
    },
    { 
      id: 3, 
      name: 'HROperation', 
      description: 'HR operations with employee management access' 
    },
    { 
      id: 4, 
      name: 'User', 
      description: 'Basic user access with read-only permissions' 
    }
  ]);

  userRoleIds = computed(() => {
    if (!this.user) return [];
    return this.user.roles.map(roleName => {
      const role = this.availableRoles().find(r => r.name === roleName);
      return role?.id || 0;
    }).filter(id => id > 0);
  });

  ngOnInit(): void {
    // Component initialization
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  isRoleAssigned(roleId: number): boolean {
    return this.userRoleIds().includes(roleId);
  }

  onToggleRole(role: Role): void {
    if (!this.user) return;

    this.loading.set(true);
    this.error.set('');

    const isCurrentlyAssigned = this.isRoleAssigned(role.id);

    if (isCurrentlyAssigned) {
      this.removeRole(role.id);
    } else {
      this.assignRole(role.id);
    }
  }

  assignRole(roleId: number): void {
    if (!this.user) return;

    const request: AssignRoleRequest = { roleId };

    this.usersService.assignRole(this.user.id, request).subscribe({
      next: () => {
        this.refreshUserData();
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }
    });
  }

  removeRole(roleId: number): void {
    if (!this.user) return;

    this.usersService.removeRole(this.user.id, roleId).subscribe({
      next: () => {
        this.refreshUserData();
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }
    });
  }

  refreshUserData(): void {
    if (!this.user) return;

    this.usersService.getUserById(this.user.id).subscribe({
      next: (updatedUser) => {
        this.loading.set(false);
        this.rolesUpdated.emit(updatedUser);
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }
    });
  }

  closeModal(): void {
    this.show = false;
    this.showChange.emit(false);
    this.error.set('');
  }

  getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.t('errors.unknown');
  }

  getRoleDescription(role: Role): string {
    return role.description || '';
  }

  getRoleBadgeClass(role: Role): string {
    const roleClasses: { [key: string]: string } = {
      'SystemAdmin': 'bg-danger',
      'Admin': 'bg-warning',
      'HROperation': 'bg-info',
      'User': 'bg-secondary'
    };
    return roleClasses[role.name] || 'bg-primary';
  }
}