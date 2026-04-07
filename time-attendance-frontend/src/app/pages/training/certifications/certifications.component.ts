import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { TrainingService } from '../../../core/services/training.service';
import { EmployeeCertificationDto } from '../../../shared/models/training.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);

  data = signal<EmployeeCertificationDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('certifications.employee'), sortable: true, priority: 'high' },
    { key: 'certificationName', label: this.i18n.t('certifications.name'), sortable: true, priority: 'high' },
    { key: 'issuingOrganization', label: this.i18n.t('certifications.issuing_org'), sortable: true, priority: 'medium' },
    { key: 'issueDate', label: this.i18n.t('certifications.issue_date'), sortable: true, priority: 'medium' },
    { key: 'expiryDate', label: this.i18n.t('certifications.expiry_date'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getCertifications({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/training/certifications/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  async onDelete(item: EmployeeCertificationDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('certifications.delete'), message: this.i18n.t('certifications.confirm_delete'),
      confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger'
    });
    if (result.confirmed) {
      this.service.deleteCertification(item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('certifications.deleted')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onActionClick(event: { action: string; item: EmployeeCertificationDto }): void {
    if (event.action === 'view') this.router.navigate(['/training/certifications', event.item.id, 'view']);
    else if (event.action === 'edit') this.router.navigate(['/training/certifications', event.item.id, 'edit']);
    else if (event.action === 'delete') this.onDelete(event.item);
  }
}
