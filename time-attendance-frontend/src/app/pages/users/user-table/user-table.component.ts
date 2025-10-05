import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { UserDto } from '../../../shared/models/user.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { BadgeListComponent } from '../../../shared/components/badge-list/badge-list.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, DataTableComponent, StatusBadgeComponent, BadgeListComponent],
  template: `
    <app-data-table
      [data]="users"
      [columns]="columns"
      [actions]="actions"
      [loading]="loading"
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [allowSelection]="true"
      [emptyMessage]="'No users found'"
      [emptyTitle]="'No Users'"
      (actionClick)="onActionClick($event)"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
      (selectionChange)="onSelectionChange($event)"
      (sortChange)="onSortChange($event)">

      <ng-template #cellTemplate let-user let-column="column">
        <ng-container [ngSwitch]="column.key">
          <!-- User info with avatar -->
          <div *ngSwitchCase="'user'" class="d-flex align-items-center">
            <div class="avatar-sm me-2">
              <div class="avatar-initial bg-primary text-white rounded-circle">
                {{ getInitials(user.firstName, user.lastName) }}
              </div>
            </div>
            <div>
              <div class="fw-medium">{{ user.firstName }} {{ user.lastName }}</div>
              <small class="text-muted">{{ user.email }}</small>
            </div>
          </div>

          <!-- Username -->
          <span *ngSwitchCase="'username'" class="fw-medium">
            {{ user.username }}
            <span *ngIf="isSystemAdmin(user)" class="badge bg-warning text-dark ms-1" title="System Administrator">
              <i class="fas fa-crown"></i>
            </span>
          </span>

          <!-- Roles -->
          <div *ngSwitchCase="'roles'">
            <app-badge-list
              [items]="getRoleBadges(user.roles)"
              [emptyMessage]="'No roles assigned'">
            </app-badge-list>
          </div>

          <!-- Status -->
          <span *ngSwitchCase="'status'">
            <app-status-badge
              [status]="user.isActive ? 'active' : 'inactive'"
              [label]="user.isActive ? 'Active' : 'Inactive'"
              [showIcon]="true">
            </app-status-badge>
          </span>

          <!-- Lock status -->
          <span *ngSwitchCase="'lockStatus'">
            <app-status-badge
              [status]="isUserLocked(user.lockoutEndUtc) ? 'warning' : 'success'"
              [label]="isUserLocked(user.lockoutEndUtc) ? 'Locked' : 'Unlocked'"
              [icon]="isUserLocked(user.lockoutEndUtc) ? 'fa-lock' : 'fa-unlock'"
              [showIcon]="true">
            </app-status-badge>
          </span>

          <!-- Must Change Password -->
          <span *ngSwitchCase="'mustChangePassword'">
            <app-status-badge
              [status]="user.mustChangePassword ? 'warning' : 'success'"
              [label]="user.mustChangePassword ? 'Must Change' : 'OK'"
              [icon]="user.mustChangePassword ? 'fa-key' : 'fa-check'"
              [showIcon]="true">
            </app-status-badge>
          </span>

          <!-- Created date -->
          <span *ngSwitchCase="'created'">
            {{ formatDate(user.createdAtUtc || user.createdAt) }}
          </span>

          <!-- Last login -->
          <span *ngSwitchCase="'lastLogin'">
            <span *ngIf="user.lastLoginAt">{{ formatDate(user.lastLoginAt) }}</span>
            <span *ngIf="!user.lastLoginAt" class="text-muted">Never</span>
          </span>
        </ng-container>
      </ng-template>
    </app-data-table>
  `,
  styles: [`
    .avatar-sm {
      width: 2rem;
      height: 2rem;
    }

    .avatar-initial {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 0.875rem;
      font-weight: 600;
    }
  `]
})
export class UserTableComponent {
  private i18n = inject(I18nService);
  private permissionService = inject(PermissionService);

  @Input() users: UserDto[] = [];
  @Input() loading = signal(false);
  @Input() currentPage = signal(1);
  @Input() totalPages = signal(1);
  @Input() totalItems = signal(0);
  @Input() pageSize = signal(10);

  @Output() viewUser = new EventEmitter<UserDto>();
  @Output() editUser = new EventEmitter<UserDto>();
  @Output() deleteUser = new EventEmitter<UserDto>();
  @Output() manageRoles = new EventEmitter<UserDto>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<UserDto[]>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();

  columns: TableColumn[] = [
    { key: 'user', label: 'User', width: '250px', sortable: true },
    { key: 'username', label: 'Username', width: '150px', sortable: true },
    { key: 'roles', label: 'Roles', width: '200px' },
    { key: 'status', label: 'Status', width: '100px', align: 'center', sortable: true },
    { key: 'lockStatus', label: 'Access', width: '100px', align: 'center' },
    { key: 'mustChangePassword', label: 'Password Status', width: '130px', align: 'center' },
    { key: 'created', label: 'Created', width: '120px', sortable: true },
    { key: 'lastLogin', label: 'Last Login', width: '120px', sortable: true }
  ];

  get actions(): TableAction[] {
    const actions: TableAction[] = [];

    if (this.permissionService.has(`${PermissionResources.USER}.${PermissionActions.READ}`)) {
      actions.push({
        key: 'view',
        label: 'View',
        icon: 'fa-eye',
        color: 'info'
      });
    }

    if (this.permissionService.has(`${PermissionResources.USER}.${PermissionActions.UPDATE}`)) {
      actions.push({
        key: 'edit',
        label: 'Edit',
        icon: 'fa-edit',
        color: 'primary',
        condition: (user: UserDto) => this.canEditUser(user)
      });

      actions.push({
        key: 'manageRoles',
        label: 'Manage Roles',
        icon: 'fa-user-tag',
        color: 'warning',
        condition: (user: UserDto) => this.canEditUser(user)
      });
    }

    if (this.permissionService.has(`${PermissionResources.USER}.${PermissionActions.DELETE}`)) {
      actions.push({
        key: 'delete',
        label: 'Delete',
        icon: 'fa-trash',
        color: 'danger',
        condition: (user: UserDto) => this.canDeleteUser(user)
      });
    }

    return actions;
  }

  onActionClick(event: {action: string, item: UserDto}) {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.viewUser.emit(item);
        break;
      case 'edit':
        this.editUser.emit(item);
        break;
      case 'delete':
        this.deleteUser.emit(item);
        break;
      case 'manageRoles':
        this.manageRoles.emit(item);
        break;
    }
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onPageSizeChange(size: number) {
    this.pageSizeChange.emit(size);
  }

  onSelectionChange(selectedUsers: UserDto[]) {
    this.selectionChange.emit(selectedUsers);
  }

  onSortChange(sortEvent: {column: string, direction: 'asc' | 'desc'}) {
    this.sortChange.emit(sortEvent);
  }

  getInitials(firstName: string, lastName: string): string {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
  }

  isSystemAdmin(user: UserDto): boolean {
    return user.username.toLowerCase() === 'systemadmin';
  }

  getRoleBadges(roles: string[]): Array<{label: string, variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'}> {
    return roles.map(role => ({
      label: role,
      variant: 'secondary' as const
    }));
  }

  canEditUser(user: UserDto): boolean {
    return !this.isSystemAdmin(user);
  }

  canDeleteUser(user: UserDto): boolean {
    return !this.isSystemAdmin(user);
  }

  isUserLocked(lockoutEndUtc: string): boolean {
    if (!lockoutEndUtc) return false;
    return new Date(lockoutEndUtc) > new Date();
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}