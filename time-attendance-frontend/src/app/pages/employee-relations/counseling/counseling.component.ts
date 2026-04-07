import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeRelationsService } from '../../../core/services/employee-relations.service';
import { CounselingRecord, CounselingType, EmployeeRelationsPagedResult } from '../../../shared/models/employee-relations.model';

@Component({
  selector: 'app-counseling',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent, StatusBadgeComponent, UnifiedFilterComponent],
  templateUrl: './counseling.component.html',
  styleUrls: ['./counseling.component.css']
})
export class CounselingComponent implements OnInit {
  private service = inject(EmployeeRelationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);

  items = signal<CounselingRecord[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  searchTerm = '';

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('counseling_records.employee'), sortable: true, priority: 'high' },
    { key: 'counselorName', label: this.i18n.t('counseling_records.counselor'), sortable: true, priority: 'high' },
    { key: 'sessionDate', label: this.i18n.t('counseling_records.session_date'), sortable: true, priority: 'medium' },
    { key: 'counselingType', label: this.i18n.t('counseling_records.session_type'), sortable: true, priority: 'medium' },
    { key: 'followUpRequired', label: this.i18n.t('counseling_records.follow_up_required'), sortable: true, priority: 'low' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: false, priority: 'high' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-solid fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-solid fa-edit', color: 'primary' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    const params: any = { page: this.currentPage(), pageSize: this.pageSize() };
    if (this.searchTerm) params.search = this.searchTerm;
    this.service.getCounselingRecords(params).subscribe({
      next: (result: EmployeeRelationsPagedResult<CounselingRecord>) => {
        this.items.set(result.data);
        this.totalCount.set(result.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.currentPage.set(1);
    this.loadData();
  }

  onActionClick(event: { action: string; item: CounselingRecord }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/employee-relations/counseling', event.item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/employee-relations/counseling', event.item.id, 'edit']);
        break;
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/employee-relations/counseling/create']);
  }

  getFollowUpVariant(item: CounselingRecord): string {
    if (!item.followUpRequired) return 'secondary';
    if (item.followUpCompleted) return 'success';
    return 'warning';
  }

  getFollowUpLabel(item: CounselingRecord): string {
    if (!item.followUpRequired) return this.i18n.t('common.no');
    if (item.followUpCompleted) return this.i18n.t('counseling_records.follow_up_completed');
    return this.i18n.t('common.yes');
  }

  getTypeLabel(type: CounselingType): string {
    return this.i18n.t('counseling_records.type_' + type);
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadData();
  }
}
