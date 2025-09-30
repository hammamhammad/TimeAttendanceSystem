import { Component, OnInit, signal, inject, computed } from '@angular/core';
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
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { BadgeListComponent } from '../../shared/components/badge-list/badge-list.component';
import { ModalWrapperComponent } from '../../shared/components/modal-wrapper/modal-wrapper.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent, StatusBadgeComponent, BadgeListComponent, ModalWrapperComponent, LoadingSpinnerComponent, EmptyStateComponent],
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

  // Sorting state
  sortColumn = signal<keyof Role>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Modal state
  showPermissionsModal = signal(false);
  selectedRole = signal<Role | null>(null);
  managingPermissions = signal(false);

  // Data table configuration
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'name',
      label: this.t('roles.name'),
      sortable: true,
      width: '200px',
      priority: 'high',
      mobileLabel: this.t('roles.name'),
      renderHtml: true
    },
    {
      key: 'permissions',
      label: this.t('roles.permissions'),
      sortable: false,
      width: '300px',
      priority: 'medium',
      hideOnMobile: false,
      mobileLabel: this.t('roles.permissions'),
      renderHtml: true
    },
    {
      key: 'userCount',
      label: this.t('roles.users'),
      sortable: true,
      width: '100px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.t('roles.users'),
      renderHtml: true
    },
    {
      key: 'type',
      label: this.t('roles.type'),
      sortable: false,
      width: '120px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('roles.type'),
      renderHtml: true
    },
    {
      key: 'createdAtUtc',
      label: this.t('common.created'),
      sortable: true,
      width: '150px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('common.created')
    }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'view',
      label: this.t('common.view'),
      icon: 'fa-eye',
      color: 'primary',
      condition: () => this.permissionService.has(this.PERMISSIONS.ROLE_READ)
    },
    {
      key: 'manage-permissions',
      label: this.t('roles.manage_permissions'),
      icon: 'fa-shield-alt',
      color: 'info',
      condition: (role: Role) => this.canManagePermissions(role) && this.permissionService.has(this.PERMISSIONS.ROLE_ASSIGN_PERMISSIONS)
    },
    {
      key: 'edit',
      label: this.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: (role: Role) => this.canEditRole(role) && this.permissionService.has(this.PERMISSIONS.ROLE_UPDATE)
    },
    {
      key: 'delete',
      label: this.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: (role: Role) => this.canDeleteRole(role) && this.permissionService.has(this.PERMISSIONS.ROLE_DELETE)
    }
  ]);

  // Transform roles data for data table
  tableData = computed(() => {
    return this.filteredRoles().map(role => ({
      ...role,
      name: this.formatRoleName(role),
      permissions: this.formatRolePermissions(role),
      userCount: this.formatUserCount(role),
      type: this.formatRoleType(role),
      createdAtUtc: this.formatDate(role.createdAtUtc)
    }));
  });

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
          this.t('roles.failed_to_load_permissions')
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
          this.t('roles.failed_to_load_permissions')
        );
      }
    });
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

    // Use the role's isDeletable property and check user count
    return role.isDeletable && role.userCount === 0;
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
    return role.isEditable;
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
          this.t('roles.failed_to_update_permission')
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

  // Filtered roles computed signal
  filteredRoles = computed(() => {
    let filtered = this.roles();

    if (this.searchTerm?.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(searchLower) ||
        role.permissions.some(p => p.key.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    const sortCol = this.sortColumn();
    const sortDir = this.sortDirection();

    return filtered.sort((a, b) => {
      let aVal = a[sortCol] as any;
      let bVal = b[sortCol] as any;

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  });

  // Data table formatting methods
  formatRoleName(role: Role): string {
    let html = `<div><strong>${role.name}</strong>`;
    if (role.isSystem) {
      html += `<i class="fa-solid fa-shield-alt text-primary ms-1" title="${this.t('roles.system_role')}"></i>`;
    }
    html += '</div>';
    return html;
  }

  formatRolePermissions(role: Role): string {
    if (role.permissions.length === 0) {
      return `<span class="text-muted">${this.t('roles.no_permissions')}</span>`;
    }

    let html = '<div class="d-flex flex-wrap gap-1">';
    const visiblePermissions = role.permissions.slice(0, 3);

    visiblePermissions.forEach(permission => {
      html += `<span class="badge bg-secondary-subtle text-secondary small">${permission.key}</span>`;
    });

    if (role.permissions.length > 3) {
      html += `<span class="badge bg-light text-dark small">+${role.permissions.length - 3} more</span>`;
    }

    html += '</div>';
    return html;
  }

  formatUserCount(role: Role): string {
    return `<span class="badge bg-primary-subtle text-primary">${role.userCount}</span>`;
  }

  formatRoleType(role: Role): string {
    if (role.isSystem) {
      return `<span class="badge bg-warning-subtle text-warning">${this.t('roles.system')}</span>`;
    } else {
      return `<span class="badge bg-success-subtle text-success">${this.t('roles.custom')}</span>`;
    }
  }

  // Data table action handler
  onActionClick(event: {action: string, item: Role}): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.onViewRole(item);
        break;
      case 'manage-permissions':
        this.onManagePermissions(item);
        break;
      case 'edit':
        this.onEditRole(item);
        break;
      case 'delete':
        this.onDeleteRole(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  onFiltersChange(filters: any): void {
    // Handle additional filters if needed in the future
    console.log('Filters changed:', filters);
  }

  onClearFilters(): void {
    this.searchTerm = '';
  }

  onRefreshData(): void {
    // Reset filters
    this.searchTerm = '';

    // Reload data
    this.loadRoles();
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
      title: this.t('roles.delete_role'),
      message: this.t('roles.delete_role_confirmation').replace('{{roleName}}', role.name),
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
            this.t('roles.role_deleted_successfully')
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

  getPermissionBadgeStatus(permissionKey: string): 'success' | 'info' | 'warning' | 'primary' | 'danger' | 'secondary' {
    const action = PermissionUtils.parsePermissionKey(permissionKey).action;
    const badgeClass = action ? PermissionUtils.getActionBadgeClass(action) : 'bg-light text-dark';

    // Map badge classes to status types
    if (badgeClass.includes('bg-success')) return 'success';
    if (badgeClass.includes('bg-info')) return 'info';
    if (badgeClass.includes('bg-warning')) return 'warning';
    if (badgeClass.includes('bg-primary')) return 'primary';
    if (badgeClass.includes('bg-danger')) return 'danger';
    return 'secondary';
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

  // Sorting methods
  onSort(column: keyof Role): void {
    const currentColumn = this.sortColumn();
    const currentDirection = this.sortDirection();

    if (currentColumn === column) {
      // Toggle direction if same column
      this.sortDirection.set(currentDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  getSortIcon(column: keyof Role): string {
    const currentColumn = this.sortColumn();
    const currentDirection = this.sortDirection();

    if (currentColumn !== column) {
      return 'fas fa-sort text-muted';
    }

    return currentDirection === 'asc' ? 'fas fa-sort-up text-primary' : 'fas fa-sort-down text-primary';
  }

  isSortable(column: keyof Role): boolean {
    // Define which columns are sortable
    const sortableColumns: (keyof Role)[] = ['name', 'userCount', 'createdAtUtc'];
    return sortableColumns.includes(column);
  }
}