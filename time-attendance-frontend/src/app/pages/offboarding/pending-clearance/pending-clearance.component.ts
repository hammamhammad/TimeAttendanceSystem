import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { OffboardingService } from '../../../core/services/offboarding.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-pending-clearance',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './pending-clearance.component.html',
  styleUrls: ['./pending-clearance.component.css']
})
export class PendingClearanceComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(OffboardingService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<any[]>([]);
  loading = signal(false);

  displayData = computed(() => this.items().map(item => ({
    ...item,
    _statusDisplay: this.formatStatus(item.overallStatus || item.status || 'Pending'),
    _progressDisplay: `${item.completedItems || 0}/${item.totalItems || 0}`,
    _progressBar: this.formatProgressBar(item.completedItems || 0, item.totalItems || 1),
    _dateDisplay: item.createdAtUtc ? new Date(item.createdAtUtc).toLocaleDateString() : '-'
  })));

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('offboarding.pending_clearance.employee'), sortable: true, width: '22%' },
    { key: '_statusDisplay', label: this.i18n.t('offboarding.pending_clearance.status'), sortable: true, width: '14%', renderHtml: true },
    { key: '_progressDisplay', label: this.i18n.t('offboarding.pending_clearance.progress'), sortable: true, width: '12%' },
    { key: '_progressBar', label: '', width: '30%', renderHtml: true },
    { key: '_dateDisplay', label: this.i18n.t('common.created_at'), sortable: true, width: '14%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('offboarding.pending_clearance.view_termination'), icon: 'fa-eye', color: 'info' }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getPendingClearance().subscribe({
      next: (data) => { this.items.set(data || []); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('offboarding.pending_clearance.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: any }): void {
    if (event.action === 'view') {
      this.router.navigate(['/offboarding/terminations', event.item.terminationRecordId || event.item.id, 'view']);
    }
  }

  onRefreshData(): void { this.loadData(); }

  private formatStatus(s: string): string {
    const map: Record<string, string> = { 'Pending': 'warning', 'InProgress': 'info', 'Completed': 'success' };
    return `<span class="badge bg-${map[s] || 'secondary'}">${this.i18n.t('offboarding.clearance_statuses.' + s)}</span>`;
  }

  private formatProgressBar(completed: number, total: number): string {
    const pct = Math.round((completed / total) * 100);
    const color = pct === 100 ? 'bg-success' : pct >= 50 ? 'bg-info' : 'bg-warning';
    return `<div class="progress" style="height: 20px;"><div class="progress-bar ${color}" role="progressbar" style="width: ${pct}%">${pct}%</div></div>`;
  }
}
