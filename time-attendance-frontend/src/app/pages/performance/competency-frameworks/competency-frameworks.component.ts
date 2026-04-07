import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PerformanceService } from '../../../core/services/performance.service';
import { CompetencyFramework } from '../../../shared/models/performance.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-competency-frameworks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent, SectionCardComponent, FormSectionComponent],
  templateUrl: './competency-frameworks.component.html',
  styleUrls: ['./competency-frameworks.component.css']
})
export class CompetencyFrameworksComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private service = inject(PerformanceService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  items = signal<CompetencyFramework[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};
  selectedFramework = signal<CompetencyFramework | null>(null);
  showCreateForm = signal(false);
  submitting = signal(false);

  form = this.fb.group({
    name: ['', Validators.required],
    nameAr: [''],
    description: [''],
    isActive: [true],
    competencies: this.fb.array([])
  });

  get competencies(): FormArray { return this.form.get('competencies') as FormArray; }

  displayData = computed(() => this.items().map(f => ({
    ...f,
    _statusDisplay: `<span class="badge bg-${f.isActive ? 'success' : 'secondary'}">${f.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive')}</span>`,
    _competencyCount: f.competencies?.length || 0
  })));

  tableColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('competencies.name'), sortable: true, width: '30%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '15%', renderHtml: true },
    { key: '_competencyCount', label: this.i18n.t('competencies.count'), sortable: false, width: '15%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getFrameworks({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('competencies.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: CompetencyFramework }): void {
    if (event.action === 'view') this.selectedFramework.set(event.item);
    if (event.action === 'delete') this.deleteFramework(event.item);
  }

  async deleteFramework(fw: CompetencyFramework): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.delete'),
      message: this.i18n.t('competencies.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.deleteFramework(fw.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('competencies.deleted_success')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('competencies.delete_error'))
    });
  }

  navigateToCreate(): void {
    this.showCreateForm.set(true);
    this.selectedFramework.set(null);
    this.form.reset({ isActive: true });
    this.competencies.clear();
    this.addCompetency();
  }

  addCompetency(): void {
    this.competencies.push(this.fb.group({
      name: ['', Validators.required],
      nameAr: [''],
      category: [''],
      displayOrder: [this.competencies.length + 1]
    }));
  }

  removeCompetency(index: number): void { this.competencies.removeAt(index); }

  onCreateSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    this.service.createFramework({
      name: v.name!,
      nameAr: v.nameAr || undefined,
      description: v.description || undefined,
      isActive: v.isActive!,
      competencies: v.competencies.map((c: any) => ({
        name: c.name,
        nameAr: c.nameAr || undefined,
        category: c.category || undefined,
        displayOrder: c.displayOrder
      }))
    }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('competencies.created_success'));
        this.showCreateForm.set(false);
        this.submitting.set(false);
        this.loadData();
      },
      error: () => {
        this.notification.error(this.i18n.t('competencies.create_error'));
        this.submitting.set(false);
      }
    });
  }

  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.selectedFramework.set(null); this.showCreateForm.set(false); this.loadData(); }
}
