import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { OvertimeConfigurationsService, OvertimeConfiguration } from './overtime-configurations.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-overtime-configurations',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './overtime-configurations.component.html',
  styleUrls: ['./overtime-configurations.component.css']
})
export class OvertimeConfigurationsComponent implements OnInit {
  private overtimeService = inject(OvertimeConfigurationsService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    OVERTIME_CREATE: 'settings.create',
    OVERTIME_READ: 'settings.read',
    OVERTIME_UPDATE: 'settings.update',
    OVERTIME_DELETE: 'settings.delete',
    OVERTIME_ACTIVATE: 'settings.configure'
  };

  // Signals for state management
  loading = signal(false);
  configurations = signal<OvertimeConfiguration[]>([]);

  // Filter signals
  searchTerm = '';

  // Sorting state
  sortColumn = signal<keyof OvertimeConfiguration>('effectiveFromDate');
  sortDirection = signal<'asc' | 'desc'>('desc');

  // Data table configuration
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'status',
      label: this.t('settings.overtime.status'),
      sortable: false,
      width: '120px',
      align: 'center',
      priority: 'high',
      mobileLabel: this.t('settings.overtime.status'),
      renderHtml: true
    },
    {
      key: 'effectiveFromDate',
      label: this.t('settings.overtime.effectiveFrom'),
      sortable: true,
      width: '150px',
      priority: 'high',
      mobileLabel: this.t('settings.overtime.effectiveFrom')
    },
    {
      key: 'effectiveToDate',
      label: this.t('settings.overtime.effectiveTo'),
      sortable: true,
      width: '150px',
      priority: 'medium',
      hideOnMobile: false,
      mobileLabel: this.t('settings.overtime.effectiveTo')
    },
    {
      key: 'rates',
      label: this.t('settings.overtime.rates'),
      sortable: false,
      width: '200px',
      priority: 'medium',
      hideOnMobile: false,
      mobileLabel: this.t('settings.overtime.rates'),
      renderHtml: true
    },
    {
      key: 'settings',
      label: this.t('settings.overtime.configuration'),
      sortable: false,
      width: '180px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('settings.overtime.configuration'),
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
      condition: () => this.permissionService.has(this.PERMISSIONS.OVERTIME_READ)
    },
    {
      key: 'activate',
      label: this.t('settings.overtime.activate'),
      icon: 'fa-play',
      color: 'success',
      condition: (config: OvertimeConfiguration) => !config.isActive && this.permissionService.has(this.PERMISSIONS.OVERTIME_ACTIVATE)
    },
    {
      key: 'deactivate',
      label: this.t('settings.overtime.deactivate'),
      icon: 'fa-pause',
      color: 'warning',
      condition: (config: OvertimeConfiguration) => config.isActive && this.permissionService.has(this.PERMISSIONS.OVERTIME_ACTIVATE)
    },
    {
      key: 'edit',
      label: this.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: () => this.permissionService.has(this.PERMISSIONS.OVERTIME_UPDATE)
    },
    {
      key: 'delete',
      label: this.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: (config: OvertimeConfiguration) => !config.isActive && this.permissionService.has(this.PERMISSIONS.OVERTIME_DELETE)
    }
  ]);

  // Transform configurations data for data table
  tableData = computed(() => {
    return this.filteredConfigurations().map(config => ({
      ...config,
      status: this.formatStatus(config),
      effectiveFromDate: this.formatDate(config.effectiveFromDate),
      effectiveToDate: config.effectiveToDate ? this.formatDate(config.effectiveToDate) : this.t('settings.overtime.indefinite'),
      rates: this.formatRates(config),
      settings: this.formatSettings(config),
      createdAtUtc: this.formatDate(config.createdAtUtc)
    }));
  });

  ngOnInit(): void {
    this.loadConfigurations();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadConfigurations(): void {
    this.loading.set(true);
    this.overtimeService.getOvertimeConfigurations().subscribe({
      next: (configurations) => {
        this.configurations.set(configurations);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load overtime configurations:', error);
        this.loading.set(false);
        this.notificationService.error(
          this.t('app.error'),
          this.t('errors.server')
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

  formatStatus(config: OvertimeConfiguration): string {
    if (config.isActive) {
      return `<span class="badge bg-success">${this.t('settings.overtime.active')}</span>`;
    } else {
      return `<span class="badge bg-light text-dark border">${this.t('settings.overtime.inactive')}</span>`;
    }
  }

  formatRates(config: OvertimeConfiguration): string {
    return `<div class="small">
      <div><strong>${this.t('settings.overtime.normalDay')}:</strong> ${config.normalDayRate}x</div>
      <div><strong>${this.t('settings.overtime.holiday')}:</strong> ${config.publicHolidayRate}x</div>
      <div><strong>${this.t('settings.overtime.offDay')}:</strong> ${config.offDayRate}x</div>
    </div>`;
  }

  formatSettings(config: OvertimeConfiguration): string {
    const settings = [];
    if (config.enablePreShiftOvertime) settings.push(this.t('settings.overtime.preShift'));
    if (config.enablePostShiftOvertime) settings.push(this.t('settings.overtime.postShift'));
    if (config.considerFlexibleTime) settings.push(this.t('settings.overtime.flexibleTime'));
    if (config.requireApproval) settings.push(this.t('settings.overtime.requiresApproval'));

    return `<div class="small">${settings.join(', ')}</div>`;
  }

  // Filtered configurations computed signal
  filteredConfigurations = computed(() => {
    let filtered = this.configurations();

    if (this.searchTerm?.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(config =>
        config.policyNotes?.toLowerCase().includes(searchLower) ||
        config.createdBy?.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    const sortCol = this.sortColumn();
    const sortDir = this.sortDirection();

    return filtered.sort((a, b) => {
      let aVal = a[sortCol] as any;
      let bVal = b[sortCol] as any;

      // Handle date sorting
      if (sortCol === 'effectiveFromDate' || sortCol === 'effectiveToDate' || sortCol === 'createdAtUtc') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  });

  // Data table action handler
  onActionClick(event: {action: string, item: OvertimeConfiguration}): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.onViewConfiguration(item);
        break;
      case 'activate':
        this.onActivateConfiguration(item);
        break;
      case 'deactivate':
        this.onDeactivateConfiguration(item);
        break;
      case 'edit':
        this.onEditConfiguration(item);
        break;
      case 'delete':
        this.onDeleteConfiguration(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  onSearchChange(): void {
    // Debounce search
    setTimeout(() => {
      // Search is handled by filteredConfigurations() computed
    }, 300);
  }

  onClearFilters(): void {
    this.searchTerm = '';
  }

  hasActiveFilters(): boolean {
    return !!this.searchTerm;
  }

  // Unified filter handlers
  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  onFiltersChange(filters: any): void {
    if (filters.branchId !== undefined) {
      // Handle branch filter if needed
    }
    if (filters.isActive !== undefined) {
      // Handle active status filter if needed
    }
  }

  onRefreshData(): void {
    this.onClearFilters();
    this.loadConfigurations();
  }

  // Configuration CRUD operations
  onCreateConfiguration(): void {
    this.router.navigate(['/settings/overtime/create']);
  }

  onViewConfiguration(config: OvertimeConfiguration): void {
    this.router.navigate(['/settings/overtime', config.id, 'view']);
  }

  onEditConfiguration(config: OvertimeConfiguration): void {
    this.router.navigate(['/settings/overtime/edit', config.id]);
  }

  async onActivateConfiguration(config: OvertimeConfiguration): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('settings.overtime.activatePolicy'),
      message: this.t('settings.overtime.activatePolicyConfirmation'),
      confirmText: this.t('settings.overtime.activate'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'fa-play',
      iconClass: 'text-success'
    });

    if (result.confirmed) {
      this.overtimeService.activateOvertimeConfiguration(config.id).subscribe({
        next: () => {
          this.loadConfigurations(); // Reload to get updated statuses
          this.notificationService.success(
            this.t('app.success'),
            this.t('settings.overtime.policyActivatedSuccessfully')
          );
        },
        error: (error) => {
          console.error('Failed to activate configuration:', error);
          this.notificationService.error(
            this.t('app.error'),
            this.t('errors.server')
          );
        }
      });
    }
  }

  async onDeactivateConfiguration(config: OvertimeConfiguration): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('settings.overtime.deactivatePolicy'),
      message: this.t('settings.overtime.deactivatePolicyConfirmation'),
      confirmText: this.t('settings.overtime.deactivate'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-warning',
      icon: 'fa-pause',
      iconClass: 'text-warning'
    });

    if (result.confirmed) {
      this.overtimeService.deactivateOvertimeConfiguration(config.id).subscribe({
        next: () => {
          this.loadConfigurations(); // Reload to get updated statuses
          this.notificationService.success(
            this.t('app.success'),
            this.t('settings.overtime.policyDeactivatedSuccessfully')
          );
        },
        error: (error) => {
          console.error('Failed to deactivate configuration:', error);
          this.notificationService.error(
            this.t('app.error'),
            this.t('errors.server')
          );
        }
      });
    }
  }

  async onDeleteConfiguration(config: OvertimeConfiguration): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('settings.overtime.deletePolicy'),
      message: this.t('settings.overtime.deletePolicyConfirmation'),
      confirmText: this.t('common.delete'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.overtimeService.deleteOvertimeConfiguration(config.id).subscribe({
        next: () => {
          this.configurations.set(this.configurations().filter(c => c.id !== config.id));
          this.notificationService.success(
            this.t('app.success'),
            this.t('settings.overtime.policyDeletedSuccessfully')
          );
        },
        error: (error) => {
          console.error('Failed to delete configuration:', error);
          this.notificationService.error(
            this.t('app.error'),
            this.t('errors.server')
          );
        }
      });
    }
  }

  canCreateConfigurations(): boolean {
    return this.permissionService.has(this.PERMISSIONS.OVERTIME_CREATE);
  }

  // Sorting methods
  onSort(column: keyof OvertimeConfiguration): void {
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

  getSortIcon(column: keyof OvertimeConfiguration): string {
    const currentColumn = this.sortColumn();
    const currentDirection = this.sortDirection();

    if (currentColumn !== column) {
      return 'fas fa-sort text-muted';
    }

    return currentDirection === 'asc' ? 'fas fa-sort-up text-primary' : 'fas fa-sort-down text-primary';
  }

  isSortable(column: keyof OvertimeConfiguration): boolean {
    const sortableColumns: (keyof OvertimeConfiguration)[] = ['effectiveFromDate', 'effectiveToDate', 'createdAtUtc'];
    return sortableColumns.includes(column);
  }
}