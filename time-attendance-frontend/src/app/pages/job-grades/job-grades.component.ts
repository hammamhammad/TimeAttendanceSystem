import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { JobGradeService } from '../../core/services/job-grade.service';
import { JobGrade, JobGradeQueryParams } from '../../shared/models/job-grade.model';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-job-grades',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    PageHeaderComponent,
    UnifiedFilterComponent
  ],
  templateUrl: './job-grades.component.html',
  styleUrls: ['./job-grades.component.css']
})
export class JobGradesComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(JobGradeService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  // State
  jobGrades = signal<JobGrade[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  // Computed display data
  displayData = computed(() => {
    return this.jobGrades().map(g => ({
      ...g,
      _statusDisplay: g.isActive
        ? `<span class="badge bg-success">${this.i18n.t('common.active')}</span>`
        : `<span class="badge bg-secondary">${this.i18n.t('common.inactive')}</span>`,
      _minSalaryDisplay: g.minSalary.toLocaleString(),
      _midSalaryDisplay: g.midSalary.toLocaleString(),
      _maxSalaryDisplay: g.maxSalary.toLocaleString()
    }));
  });

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'code', label: this.i18n.t('job_grades.code'), sortable: true, width: '10%' },
    { key: 'name', label: this.i18n.t('job_grades.name'), sortable: true, width: '18%' },
    { key: 'level', label: this.i18n.t('job_grades.level'), sortable: true, width: '8%', align: 'center' },
    { key: '_minSalaryDisplay', label: this.i18n.t('job_grades.min_salary'), sortable: true, width: '14%', align: 'right' },
    { key: '_midSalaryDisplay', label: this.i18n.t('job_grades.mid_salary'), sortable: true, width: '14%', align: 'right' },
    { key: '_maxSalaryDisplay', label: this.i18n.t('job_grades.max_salary'), sortable: true, width: '14%', align: 'right' },
    { key: '_statusDisplay', label: this.i18n.t('job_grades.status'), sortable: true, width: '10%', renderHtml: true }
  ];

  // Table actions
  tableActions: TableAction[] = [
    {
      key: 'view',
      label: this.i18n.t('common.view'),
      icon: 'fa-eye',
      color: 'primary'
    },
    {
      key: 'edit',
      label: this.i18n.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary'
    },
    {
      key: 'toggleStatus',
      label: this.i18n.t('common.toggle_status'),
      icon: 'fa-toggle-on',
      color: 'warning'
    },
    {
      key: 'delete',
      label: this.i18n.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger'
    }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    const params: JobGradeQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter
    };

    this.service.getJobGrades(params).subscribe({
      next: (result) => {
        this.jobGrades.set(result.items || []);
        this.totalCount.set(result.totalCount || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('job_grades.load_error'));
        this.loading.set(false);
      }
    });
  }

  onTableAction(event: { action: string; item: JobGrade }): void {
    const { action, item } = event;
    switch (action) {
      case 'view':
        this.router.navigate(['/job-grades', item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/job-grades', item.id, 'edit']);
        break;
      case 'toggleStatus':
        this.toggleStatus(item);
        break;
      case 'delete':
        this.deleteJobGrade(item);
        break;
    }
  }

  toggleStatus(grade: JobGrade): void {
    const newStatus = !grade.isActive;
    this.service.updateJobGrade(grade.id, { ...grade, isActive: newStatus }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('common.status_updated'));
        this.loadData();
      },
      error: () => this.notification.error(this.i18n.t('common.error_updating'))
    });
  }

  deleteJobGrade(grade: JobGrade): void {
    this.confirmation.confirm({
      title: this.i18n.t('job_grades.delete_title'),
      message: this.i18n.t('job_grades.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    }).then(result => {
      if (result.confirmed) {
        this.service.deleteJobGrade(grade.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('job_grades.delete_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('job_grades.delete_error'))
        });
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/job-grades/create']);
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

  onSearchChange(searchTerm: string): void {
    this.currentFilter = { ...this.currentFilter, searchTerm };
    this.currentPage.set(1);
    this.loadData();
  }

  onFiltersChange(filters: any): void {
    this.currentFilter = { ...filters };
    this.currentPage.set(1);
    this.loadData();
  }

  onRefreshData(): void {
    this.currentFilter = {};
    this.currentPage.set(1);
    this.loadData();
  }
}
