import { Component, OnInit, signal, computed, inject } from '@angular/core';

import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { UsersService } from './users.service';
import { UserDto, PagedResult } from '../../shared/models/user.model';
import { RoleManagementComponent } from './role-management/role-management.component';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
import { UserTableComponent } from './user-table/user-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RoleManagementComponent, UnifiedFilterComponent, UserTableComponent, PageHeaderComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Signals for state management
  loading = signal(false);
  users = signal<UserDto[]>([]);
  pagedResult = signal<PagedResult<UserDto> | null>(null);
  currentPage = signal(1);
  pageSize = signal(10);

  // Filter state
  currentFilter: any = {};

  // Modal state
  showRoleManagement = signal(false);
  selectedUser = signal<UserDto | null>(null);

  // Mock data for roles - in real app this would come from a roles service
  availableRoles = signal<Role[]>([
    { id: 1, name: 'SystemAdmin' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'HROperation' },
    { id: 4, name: 'User' }
  ]);

  // Computed signals for pagination
  totalPages = computed(() => this.pagedResult()?.totalPages || 1);
  totalItems = computed(() => this.pagedResult()?.totalItems || 0);

  // Writable signals for template binding
  totalPagesSignal = signal(1);
  totalItemsSignal = signal(0);

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


  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);

    const filter = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter
    };

    this.usersService.getUsers(filter).subscribe({
      next: (result) => {
        this.pagedResult.set(result);
        this.users.set(result.items);
        this.totalPagesSignal.set(result.totalPages);
        this.totalItemsSignal.set(result.totalItems);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load users:', error);
        this.loading.set(false);
        this.notificationService.error(
          this.i18n.t('errors.server'),
          this.i18n.t('errors.network')
        );
      }
    });
  }

  // Filter event handlers
  onSearchChange(searchTerm: string): void {
    this.currentFilter = { ...this.currentFilter, search: searchTerm };
    this.currentPage.set(1);
    this.loadUsers();
  }

  onFiltersChange(filters: any): void {
    this.currentFilter = { ...filters };
    this.currentPage.set(1);
    this.loadUsers();
  }

  onAddUser(): void {
    this.router.navigate(['/users/create']);
  }

  onRefreshData(): void {
    // Reset filters and pagination
    this.currentFilter = {};
    this.currentPage.set(1);

    // Reload data
    this.loadUsers();
  }

  // Table event handlers
  onViewUser(user: UserDto): void {
    this.router.navigate(['/users', user.id, 'view']);
  }

  onEditUser(user: UserDto): void {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  async onDeleteUser(user: UserDto): Promise<void> {
    const confirmMessage = this.i18n.t('users.confirm_delete_user').replace('{{username}}', user.username);
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('users.delete_user'),
      message: confirmMessage,
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.usersService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
          this.notificationService.success(
            this.i18n.t('app.success'),
            this.i18n.t('users.user_deleted')
          );
        },
        error: (error) => {
          let errorMessage = this.i18n.t('errors.server');
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }

          this.notificationService.error(
            this.i18n.t('app.error'),
            errorMessage
          );
        }
      });
    }
  }

  onManageRoles(user: UserDto): void {
    this.selectedUser.set(user);
    this.showRoleManagement.set(true);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadUsers();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadUsers();
  }

  onSelectionChange(selectedUsers: UserDto[]): void {
    // Handle bulk selection for future bulk operations
    console.log('Selected users:', selectedUsers);
  }

  onSortChange(sortEvent: {column: string, direction: 'asc' | 'desc'}): void {
    this.currentFilter = {
      ...this.currentFilter,
      sortBy: sortEvent.column,
      sortDirection: sortEvent.direction
    };
    this.currentPage.set(1);
    this.loadUsers();
  }

  // Modal event handlers
  onRolesUpdated(user: UserDto): void {
    this.loadUsers();
    this.notificationService.success(
      this.i18n.t('app.success'),
      'User roles updated successfully'
    );
  }

  onCloseRoleManagement(): void {
    this.showRoleManagement.set(false);
    this.selectedUser.set(null);
  }
}