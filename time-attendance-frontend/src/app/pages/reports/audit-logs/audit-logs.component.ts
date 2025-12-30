import { Component, signal, computed, inject, OnInit } from '@angular/core';

import { AuditLogsService, AuditLog, AuditLogsFilters } from './audit-logs.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { AuditLogDetailModalComponent } from './audit-log-detail-modal/audit-log-detail-modal.component';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [
    PageHeaderComponent,
    UnifiedFilterComponent,
    DataTableComponent,
    AuditLogDetailModalComponent
],
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css']
})
export class AuditLogsComponent implements OnInit {
  private auditLogsService = inject(AuditLogsService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  // State signals
  auditLogs = signal<AuditLog[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Pagination
  currentPage = signal<number>(1);
  pageSize = signal<number>(20);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  // Filtering
  filters = signal<AuditLogsFilters>({});
  searchTerm = signal<string>('');

  // Sorting
  sortBy = signal<string>('createdAtUtc');
  sortDirection = signal<string>('desc');

  // Detail modal
  selectedAuditLog = signal<AuditLog | null>(null);
  showDetailModal = signal<boolean>(false);

  // Table configuration
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'actorInfo',
      label: this.i18n.t('audit_logs.actor'),
      sortable: false,
      width: '18%',
      priority: 'high',
      renderHtml: true
    },
    {
      key: 'actionDisplayName',
      label: this.i18n.t('audit_logs.action'),
      sortable: true,
      width: '15%',
      priority: 'high'
    },
    {
      key: 'entityInfo',
      label: this.i18n.t('audit_logs.entity'),
      sortable: false,
      width: '15%',
      priority: 'medium',
      renderHtml: true
    },
    {
      key: 'ipAddress',
      label: this.i18n.t('audit_logs.ip_address'),
      sortable: true,
      width: '12%',
      priority: 'medium'
    },
    {
      key: 'timestamp',
      label: this.i18n.t('audit_logs.timestamp'),
      sortable: true,
      width: '15%',
      priority: 'high'
    }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'view',
      label: this.i18n.t('common.view_details'),
      icon: 'fa-eye',
      color: 'primary'
    }
  ]);

  // Transform audit logs data for data table
  tableData = computed(() => {
    const logs = this.auditLogs();
    if (!Array.isArray(logs)) {
      return [];
    }

    return logs.map(log => ({
      ...log,
      actorInfo: this.formatActor(log),
      entityInfo: this.formatEntity(log),
      timestamp: this.formatDateTime(log.createdAtUtc)
    }));
  });

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  /**
   * Load audit logs with current filters
   */
  loadAuditLogs(): void {
    this.loading.set(true);
    this.error.set(null);

    const filters: AuditLogsFilters = {
      ...this.filters(),
      searchTerm: this.searchTerm() || undefined,
      pageNumber: this.currentPage(),
      pageSize: this.pageSize(),
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection()
    };

    this.auditLogsService.getAuditLogs(filters).subscribe({
      next: (response) => {
        this.auditLogs.set(response.auditLogs);
        this.totalItems.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load audit logs:', error);
        this.error.set(this.i18n.t('audit_logs.errors.load_failed'));
        this.notificationService.error(this.i18n.t('audit_logs.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }

  /**
   * Handle search term changes
   */
  onSearchChange(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
    this.loadAuditLogs();
  }

  /**
   * Handle filter changes
   */
  onFiltersChange(filters: any): void {
    const auditFilters: AuditLogsFilters = {};

    if (filters.startDate) {
      auditFilters.startDate = filters.startDate;
    }
    if (filters.endDate) {
      auditFilters.endDate = filters.endDate;
    }
    if (filters.actions && filters.actions.length > 0) {
      auditFilters.actions = filters.actions;
    }
    if (filters.entityName) {
      auditFilters.entityName = filters.entityName;
    }
    if (filters.actorUserId) {
      auditFilters.actorUserId = filters.actorUserId;
    }

    this.filters.set(auditFilters);
    this.currentPage.set(1);
    this.loadAuditLogs();
  }

  /**
   * Handle pagination changes
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadAuditLogs();
  }

  /**
   * Handle page size changes
   */
  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadAuditLogs();
  }

  /**
   * Handle sorting changes
   */
  onSortChange(event: { column: string; direction: string }): void {
    this.sortBy.set(event.column);
    this.sortDirection.set(event.direction);
    this.loadAuditLogs();
  }

  /**
   * Handle table actions
   */
  onActionClick(event: { action: string, item: AuditLog }): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.onViewDetails(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  /**
   * View audit log details
   */
  onViewDetails(auditLog: AuditLog): void {
    this.selectedAuditLog.set(auditLog);
    this.showDetailModal.set(true);
  }

  /**
   * Close detail modal
   */
  onCloseDetailModal(): void {
    this.showDetailModal.set(false);
    this.selectedAuditLog.set(null);
  }

  /**
   * Refresh audit logs list
   */
  onRefresh(): void {
    this.loadAuditLogs();
  }

  // Formatting methods
  formatActor(log: AuditLog): string {
    if (!log.actorUserId) {
      return `<div class="text-muted"><i class="fas fa-robot me-1"></i>System</div>`;
    }

    const username = log.actorUsername || 'Unknown User';
    const email = log.actorEmail || '';

    return `
      <div>
        <div class="fw-medium">${username}</div>
        ${email ? `<small class="text-muted">${email}</small>` : ''}
      </div>
    `;
  }

  formatEntity(log: AuditLog): string {
    return `
      <div>
        <div class="fw-medium">${log.entityName}</div>
        <small class="text-muted font-monospace">${log.entityId}</small>
      </div>
    `;
  }

  formatDateTime(date: string): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleString();
  }
}
