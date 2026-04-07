import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../core/services/recruitment.service';
import { Candidate } from '../../../shared/models/recruitment.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(RecruitmentService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<Candidate[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(c => ({
    ...c,
    _statusDisplay: `<span class="badge bg-${c.status === 'Active' ? 'success' : c.status === 'Hired' ? 'primary' : c.status === 'Blacklisted' ? 'danger' : 'secondary'}">${c.status || '-'}</span>`,
    _experienceDisplay: c.yearsOfExperience != null ? `${c.yearsOfExperience} ${this.i18n.t('candidates.years')}` : '-'
  })));

  tableColumns: TableColumn[] = [
    { key: 'fullName', label: this.i18n.t('candidates.name'), sortable: true, width: '20%' },
    { key: 'email', label: this.i18n.t('candidates.email'), sortable: true, width: '18%' },
    { key: 'source', label: this.i18n.t('candidates.source'), sortable: true, width: '10%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '10%', renderHtml: true },
    { key: 'currentJobTitle', label: this.i18n.t('candidates.current_title'), sortable: true, width: '15%' },
    { key: '_experienceDisplay', label: this.i18n.t('candidates.experience'), sortable: true, width: '10%' },
    { key: 'applicationCount', label: this.i18n.t('candidates.applications'), sortable: true, width: '10%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'info' }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getCandidates({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('candidates.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: Candidate }): void {
    if (event.action === 'view') this.router.navigate(['/recruitment/candidates', event.item.id, 'view']);
    if (event.action === 'edit') this.router.navigate(['/recruitment/candidates', event.item.id, 'edit']);
  }

  navigateToCreate(): void { this.router.navigate(['/recruitment/candidates/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }
}
