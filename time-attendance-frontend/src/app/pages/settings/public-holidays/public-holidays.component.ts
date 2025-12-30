import { Component, OnInit, signal, inject, computed } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PublicHolidaysService } from './public-holidays.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { PublicHoliday, HolidayType, HolidayTemplate } from '../../../shared/models/public-holiday.model';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-public-holidays',
  standalone: true,
  imports: [FormsModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent, ModalWrapperComponent],
  templateUrl: './public-holidays.component.html',
  styleUrls: ['./public-holidays.component.css']
})
export class PublicHolidaysComponent implements OnInit {
  private publicHolidaysService = inject(PublicHolidaysService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    HOLIDAY_CREATE: 'publicHoliday.create',
    HOLIDAY_READ: 'publicHoliday.read',
    HOLIDAY_UPDATE: 'publicHoliday.update',
    HOLIDAY_DELETE: 'publicHoliday.delete',
    HOLIDAY_IMPORT: 'publicHoliday.import',
    HOLIDAY_EXPORT: 'publicHoliday.export'
  };

  // Holiday type and template references for template
  readonly HolidayType = HolidayType;
  readonly HolidayTemplate = HolidayTemplate;

  // Signals for state management
  loading = signal(false);
  holidays = signal<PublicHoliday[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  // Filter signals
  searchTerm = signal('');
  selectedYear = signal<number | undefined>(new Date().getFullYear());
  selectedBranchId = signal<number | undefined>(undefined);
  selectedHolidayType = signal<HolidayType | undefined>(undefined);
  selectedActiveStatus = signal<boolean | undefined>(undefined);
  selectedNationalStatus = signal<boolean | undefined>(undefined);

  // Sorting state
  sortColumn = signal<keyof PublicHoliday>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Import state
  showImportModal = signal(false);
  importLoading = signal(false);
  selectedTemplate = signal<HolidayTemplate>(HolidayTemplate.USA_Federal);
  importYear = signal(new Date().getFullYear());
  importBranchId = signal<number | undefined>(undefined);
  overwriteExisting = signal(false);

  // Data table configuration
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'name',
      label: this.t('settings.holidays.name'),
      sortable: true,
      width: '200px',
      priority: 'high',
      mobileLabel: this.t('settings.holidays.name')
    },
    {
      key: 'holidayType',
      label: this.t('settings.holidays.type'),
      sortable: true,
      width: '120px',
      priority: 'high',
      mobileLabel: this.t('settings.holidays.type'),
      renderHtml: true
    },
    {
      key: 'nextOccurrence',
      label: this.t('settings.holidays.nextOccurrence'),
      sortable: true,
      width: '150px',
      priority: 'medium',
      mobileLabel: this.t('settings.holidays.nextOccurrence')
    },
    {
      key: 'scope',
      label: this.t('settings.holidays.scope'),
      sortable: false,
      width: '120px',
      priority: 'medium',
      mobileLabel: this.t('settings.holidays.scope'),
      renderHtml: true
    },
    {
      key: 'status',
      label: this.t('settings.holidays.status'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'high',
      mobileLabel: this.t('settings.holidays.status'),
      renderHtml: true
    },
    {
      key: 'priority',
      label: this.t('settings.holidays.priority'),
      sortable: true,
      width: '80px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('settings.holidays.priority')
    },
    {
      key: 'createdAt',
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
      condition: () => this.permissionService.has(this.PERMISSIONS.HOLIDAY_READ)
    },
    {
      key: 'edit',
      label: this.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: () => this.permissionService.canManagePublicHolidays()
    },
    {
      key: 'delete',
      label: this.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: () => this.permissionService.canManagePublicHolidays()
    }
  ]);

  // Transform holidays data for data table
  tableData = computed(() => {
    return this.holidays().map(holiday => ({
      ...holiday,
      holidayType: this.formatHolidayType(holiday.holidayType),
      nextOccurrence: holiday.nextOccurrence ? this.formatDate(holiday.nextOccurrence) : this.t('settings.holidays.noUpcoming'),
      scope: this.formatScope(holiday),
      status: this.formatStatus(holiday),
      createdAt: this.formatDate(holiday.createdAt)
    }));
  });

  // Available holiday types for filters
  holidayTypes = computed(() => this.publicHolidaysService.getHolidayTypes());

  // Available templates for import
  availableTemplates = computed(() => this.publicHolidaysService.getAvailableTemplates());

  ngOnInit(): void {
    this.loadHolidays();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadHolidays(): void {
    this.loading.set(true);

    this.publicHolidaysService.getPublicHolidays(
      this.currentPage(),
      this.pageSize(),
      this.searchTerm() || undefined,
      this.selectedYear(),
      this.selectedBranchId(),
      this.selectedHolidayType(),
      this.selectedActiveStatus(),
      this.selectedNationalStatus()
    ).subscribe({
      next: (response) => {
        this.holidays.set(response.holidays);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load public holidays:', error);
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

  formatHolidayType(type: HolidayType): string {
    const typeLabels = {
      [HolidayType.OneTime]: 'One Time',
      [HolidayType.Annual]: 'Annual',
      [HolidayType.Monthly]: 'Monthly',
      [HolidayType.Floating]: 'Floating'
    };

    const typeColors = {
      [HolidayType.OneTime]: 'info',
      [HolidayType.Annual]: 'primary',
      [HolidayType.Monthly]: 'warning',
      [HolidayType.Floating]: 'secondary'
    };

    return `<span class="badge bg-${typeColors[type]}">${typeLabels[type]}</span>`;
  }

  formatScope(holiday: PublicHoliday): string {
    if (holiday.isNational) {
      return `<span class="badge bg-success">${this.t('settings.holidays.national')}</span>`;
    } else if (holiday.branchId) {
      return `<span class="badge bg-info">${holiday.branchName || `Branch ${holiday.branchId}`}</span>`;
    } else {
      return `<span class="badge bg-info">${this.t('common.company_wide')}</span>`;
    }
  }

  formatStatus(holiday: PublicHoliday): string {
    if (holiday.isActive) {
      return `<span class="badge bg-success">${this.t('settings.holidays.active')}</span>`;
    } else {
      return `<span class="badge bg-light text-dark border">${this.t('settings.holidays.inactive')}</span>`;
    }
  }

  // Data table action handler
  onActionClick(event: {action: string, item: PublicHoliday}): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.onViewHoliday(item);
        break;
      case 'edit':
        this.onEditHoliday(item);
        break;
      case 'delete':
        this.onDeleteHoliday(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  // Pagination handlers
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadHolidays();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadHolidays();
  }

  // Filter handlers
  onSearchChange(): void {
    this.currentPage.set(1);
    this.loadHolidays();
  }

  onYearChange(): void {
    this.currentPage.set(1);
    this.loadHolidays();
  }

  onHolidayTypeChange(): void {
    this.currentPage.set(1);
    this.loadHolidays();
  }

  onActiveStatusChange(): void {
    this.currentPage.set(1);
    this.loadHolidays();
  }

  onNationalStatusChange(): void {
    this.currentPage.set(1);
    this.loadHolidays();
  }

  onClearFilters(): void {
    this.searchTerm.set('');
    this.selectedYear.set(new Date().getFullYear());
    this.selectedBranchId.set(undefined);
    this.selectedHolidayType.set(undefined);
    this.selectedActiveStatus.set(undefined);
    this.selectedNationalStatus.set(undefined);
    this.currentPage.set(1);
    this.loadHolidays();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.searchTerm() ||
      this.selectedHolidayType() !== undefined ||
      this.selectedActiveStatus() !== undefined ||
      this.selectedNationalStatus() !== undefined ||
      this.selectedYear() !== new Date().getFullYear()
    );
  }

  // Unified filter handlers
  onSearchTermChange(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
    this.onSearchChange();
  }

  onFiltersChange(filters: any): void {
    if (filters.branchId !== undefined) {
      this.selectedBranchId.set(filters.branchId ? parseInt(filters.branchId) : undefined);
    }
    if (filters.isActive !== undefined) {
      this.selectedActiveStatus.set(filters.isActive === 'true' ? true : filters.isActive === 'false' ? false : undefined);
    }
    if (filters.year !== undefined) {
      this.selectedYear.set(filters.year ? parseInt(filters.year) : new Date().getFullYear());
    }
    this.currentPage.set(1);
    this.loadHolidays();
  }

  onRefreshData(): void {
    this.onClearFilters();
  }

  // Holiday CRUD operations
  onCreateHoliday(): void {
    this.router.navigate(['/settings/public-holidays/create']);
  }

  onViewHoliday(holiday: PublicHoliday): void {
    this.router.navigate(['/settings/public-holidays', holiday.id, 'view']);
  }

  onEditHoliday(holiday: PublicHoliday): void {
    this.router.navigate(['/settings/public-holidays', holiday.id, 'edit']);
  }

  async onDeleteHoliday(holiday: PublicHoliday): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('settings.holidays.deleteHoliday'),
      message: this.t('settings.holidays.deleteHolidayConfirmation'),
      confirmText: this.t('common.delete'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.publicHolidaysService.deletePublicHoliday(holiday.id).subscribe({
        next: () => {
          this.loadHolidays();
          this.notificationService.success(
            this.t('app.success'),
            this.t('settings.holidays.holidayDeletedSuccessfully')
          );
        },
        error: (error) => {
          console.error('Failed to delete holiday:', error);
          this.notificationService.error(
            this.t('app.error'),
            this.t('errors.server')
          );
        }
      });
    }
  }

  // Import functionality
  onShowImportModal(): void {
    this.showImportModal.set(true);
  }

  onHideImportModal(): void {
    this.showImportModal.set(false);
    this.selectedTemplate.set(HolidayTemplate.USA_Federal);
    this.importYear.set(new Date().getFullYear());
    this.importBranchId.set(undefined);
    this.overwriteExisting.set(false);
  }

  async onImportTemplate(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('settings.holidays.importTemplate'),
      message: this.t('settings.holidays.importTemplateConfirmation'),
      confirmText: this.t('settings.holidays.import'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-primary',
      icon: 'fa-download',
      iconClass: 'text-primary'
    });

    if (result.confirmed) {
      this.importLoading.set(true);

      this.publicHolidaysService.importHolidayTemplate({
        template: this.selectedTemplate(),
        year: this.importYear(),
        branchId: this.importBranchId(),
        countryCode: 'US', // This should be dynamic based on template
        overwriteExisting: this.overwriteExisting()
      }).subscribe({
        next: (importedHolidays) => {
          this.importLoading.set(false);
          this.onHideImportModal();
          this.loadHolidays();
          this.notificationService.success(
            this.t('app.success'),
            this.t('settings.holidays.templateImportedSuccessfully')
          );
        },
        error: (error) => {
          console.error('Failed to import template:', error);
          this.importLoading.set(false);
          this.notificationService.error(
            this.t('app.error'),
            this.t('errors.server')
          );
        }
      });
    }
  }

  // Export functionality
  onExportHolidays(format: 'json' | 'csv' | 'ical' = 'json'): void {
    const year = this.selectedYear() || new Date().getFullYear();

    this.publicHolidaysService.exportHolidays(
      year,
      format,
      this.selectedBranchId(),
      false
    ).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `public-holidays-${year}.${format}`;
        link.click();
        window.URL.revokeObjectURL(url);

        this.notificationService.success(
          this.t('app.success'),
          this.t('settings.holidays.exportedSuccessfully')
        );
      },
      error: (error) => {
        console.error('Failed to export holidays:', error);
        this.notificationService.error(
          this.t('app.error'),
          this.t('errors.server')
        );
      }
    });
  }

  // Permission checks
  canCreateHolidays(): boolean {
    return this.permissionService.canManagePublicHolidays();
  }

  canImportHolidays(): boolean {
    return this.permissionService.canImportPublicHolidays();
  }

  canExportHolidays(): boolean {
    return this.permissionService.canExportPublicHolidays();
  }

  // Utility methods
  getYearOptions(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  }

  getTemplateDisplayName(template: HolidayTemplate): string {
    const templateNames = {
      [HolidayTemplate.USA_Federal]: 'USA Federal Holidays',
      [HolidayTemplate.UK_BankHolidays]: 'UK Bank Holidays',
      [HolidayTemplate.SaudiArabia_National]: 'Saudi Arabia National Holidays'
    };
    return templateNames[template];
  }
}