import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../core/services/recruitment.service';
import { OfferLetter } from '../../../shared/models/recruitment.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(RecruitmentService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<OfferLetter[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(o => ({
    ...o,
    _statusDisplay: this.formatStatus(o.status),
    _salaryDisplay: `${o.offeredSalary.toLocaleString()} ${o.currency}`
  })));

  tableColumns: TableColumn[] = [
    { key: 'candidateName', label: this.i18n.t('offer_letters.candidate'), sortable: true, width: '18%' },
    { key: 'jobTitle', label: this.i18n.t('offer_letters.position'), sortable: true, width: '18%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '12%', renderHtml: true },
    { key: '_salaryDisplay', label: this.i18n.t('offer_letters.salary'), sortable: true, width: '14%' },
    { key: 'startDate', label: this.i18n.t('offer_letters.start_date'), sortable: true, width: '12%' },
    { key: 'expiryDate', label: this.i18n.t('offer_letters.expiry_date'), sortable: true, width: '12%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getOffers({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('offer_letters.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: OfferLetter }): void {
    if (event.action === 'view') this.router.navigate(['/recruitment/offers', event.item.id, 'view']);
  }

  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

  private formatStatus(s: string): string {
    const map: Record<string, { label: string; cls: string }> = {
      'Draft': { label: this.i18n.t('common.draft'), cls: 'badge bg-secondary' },
      'PendingApproval': { label: this.i18n.t('common.pending_approval'), cls: 'badge bg-warning text-dark' },
      'Approved': { label: this.i18n.t('common.approved'), cls: 'badge bg-info' },
      'Sent': { label: this.i18n.t('offer_letters.status_sent'), cls: 'badge bg-primary' },
      'Accepted': { label: this.i18n.t('offer_letters.status_accepted'), cls: 'badge bg-success' },
      'Declined': { label: this.i18n.t('offer_letters.status_declined'), cls: 'badge bg-danger' },
      'Expired': { label: this.i18n.t('common.expired'), cls: 'badge bg-dark' },
      'Withdrawn': { label: this.i18n.t('offer_letters.status_withdrawn'), cls: 'badge bg-dark' }
    };
    const info = map[s] || { label: s, cls: 'badge bg-light text-dark' };
    return `<span class="${info.cls}">${info.label}</span>`;
  }
}
