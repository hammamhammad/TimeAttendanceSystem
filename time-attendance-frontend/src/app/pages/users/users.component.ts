import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { UsersService } from './users.service';
import { UserDto, PagedResult } from '../../shared/models/user.model';
import { RoleManagementComponent } from './role-management/role-management.component';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';

interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RoleManagementComponent, HasPermissionDirective],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Signals for state management
  loading = signal(false);
  users = signal<UserDto[]>([]);
  pagedResult = signal<PagedResult<UserDto> | null>(null);
  currentPage = signal(1);
  pageSize = signal(10);
  
  // Filter signals
  searchTerm = '';
  statusFilter = '';
  roleFilter = '';
  
  // Modal state
  showUserModal = signal(false);
  showUserForm = signal(false);
  showRoleManagement = signal(false);
  selectedUser = signal<UserDto | null>(null);
  editingUser = signal<UserDto | null>(null);
  
  // Mock data for roles - in real app this would come from a roles service
  availableRoles = signal<Role[]>([
    { id: 1, name: 'SystemAdmin' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'HROperation' },
    { id: 4, name: 'User' }
  ]);

  // Helper for Math functions in template
  Math = Math;

  // Permission constants for use in template
  readonly PERMISSIONS = {
    USER_CREATE: `${PermissionResources.USER}.${PermissionActions.CREATE}`,
    USER_READ: `${PermissionResources.USER}.${PermissionActions.READ}`,
    USER_UPDATE: `${PermissionResources.USER}.${PermissionActions.UPDATE}`,
    USER_DELETE: `${PermissionResources.USER}.${PermissionActions.DELETE}`,
    USER_ASSIGN_ROLE: `${PermissionResources.USER}.${PermissionActions.ASSIGN_ROLE}`,
    USER_REMOVE_ROLE: `${PermissionResources.USER}.${PermissionActions.REMOVE_ROLE}`,
    USER_MANAGE: `${PermissionResources.USER}.${PermissionActions.MANAGE}`
  };

  // Helper methods for user protection
  isSystemAdmin(user: UserDto): boolean {
    // Only the systemadmin user is non-deletable and non-editable
    return user.username.toLowerCase() === 'systemadmin';
  }

  canEditUser(user: UserDto): boolean {
    return !this.isSystemAdmin(user);
  }

  canDeleteUser(user: UserDto): boolean {
    return !this.isSystemAdmin(user);
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadUsers(): void {
    this.loading.set(true);
    
    const filter = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      search: this.searchTerm || undefined,
      isActive: this.statusFilter ? this.statusFilter === 'true' : undefined,
      roleId: this.roleFilter ? parseInt(this.roleFilter) : undefined
    };

    this.usersService.getUsers(filter).subscribe({
      next: (result) => {
        this.pagedResult.set(result);
        this.users.set(result.items);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load users:', error);
        this.loading.set(false);
        this.notificationService.error(
          this.t('errors.server'),
          this.t('errors.network')
        );
      }
    });
  }

  onSearchChange(): void {
    // Debounce search - reset to first page
    this.currentPage.set(1);
    setTimeout(() => this.loadUsers(), 300);
  }

  onFilterChange(): void {
    this.currentPage.set(1);
    this.loadUsers();
  }

  onClearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.roleFilter = '';
    this.currentPage.set(1);
    this.loadUsers();
  }

  hasActiveFilters(): boolean {
    return !!(this.searchTerm || this.statusFilter || this.roleFilter);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= (this.pagedResult()?.totalPages || 1)) {
      this.currentPage.set(page);
      this.loadUsers();
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.pagedResult()?.totalPages || 1;
    const current = this.currentPage();
    const pages: number[] = [];
    
    // Show max 5 page numbers
    const start = Math.max(1, current - 2);
    const end = Math.min(totalPages, start + 4);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  isUserLocked(lockoutEndUtc: string): boolean {
    return new Date(lockoutEndUtc) > new Date();
  }

  // User actions
  onCreateUser(): void {
    this.editingUser.set(null);
    this.showUserForm.set(true);
  }

  onViewUser(user: UserDto): void {
    this.selectedUser.set(user);
    this.showUserModal.set(true);
  }

  onEditUser(user: UserDto): void {
    if (!this.canEditUser(user)) {
      return; // Prevent editing systemadmin user
    }
    this.closeModal();
    this.editingUser.set(user);
    this.showUserForm.set(true);
  }

  async onDeleteUser(user: UserDto): Promise<void> {
    if (!this.canDeleteUser(user)) {
      return; // Prevent deleting systemadmin user
    }

    const confirmMessage = this.t('users.confirm_delete_user').replace('{{username}}', user.username);
    const result = await this.confirmationService.confirm({
      title: this.t('users.delete_user'),
      message: confirmMessage,
      confirmText: this.t('common.delete'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });
    
    if (result.confirmed) {
      this.usersService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers(); // Refresh the list
          this.notificationService.success(
            this.t('app.success'),
            this.t('users.user_deleted')
          );
        },
        error: (error) => {
          let errorMessage = this.t('errors.server');
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          
          this.notificationService.error(
            this.t('app.error'),
            errorMessage
          );
        }
      });
    }
  }

  onManageRoles(user: UserDto): void {
    if (!this.canEditUser(user)) {
      return; // Prevent managing roles for systemadmin user
    }
    this.selectedUser.set(user);
    this.showRoleManagement.set(true);
  }

  closeModal(): void {
    this.showUserModal.set(false);
    this.selectedUser.set(null);
  }

  // Form event handlers
  onUserCreated(user: UserDto): void {
    this.loadUsers(); // Refresh the list
    this.notificationService.success(
      this.t('app.success'),
      this.t('users.user_added')
    );
  }

  onUserSaved(user: UserDto): void {
    this.loadUsers(); // Refresh the list
    this.notificationService.success(
      this.t('app.success'),
      this.t('users.user_updated')
    );
  }

  onRolesUpdated(user: UserDto): void {
    this.loadUsers(); // Refresh the list
    this.notificationService.success(
      this.t('app.success'),
      'User roles updated successfully'
    );
  }

  onShowUserFormChange(show: boolean): void {
    this.showUserForm.set(show);
    if (!show) {
      this.editingUser.set(null);
    }
  }

  onShowRoleManagementChange(show: boolean): void {
    this.showRoleManagement.set(show);
    if (!show) {
      this.selectedUser.set(null);
    }
  }
}