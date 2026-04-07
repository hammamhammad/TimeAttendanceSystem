import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { TimesheetService } from '../../../../core/services/timesheet.service';
import { ProjectDto, ProjectTaskDto } from '../../../../shared/models/timesheet.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../../shared/components/data-table/data-table.component';
import { ModalWrapperComponent } from '../../../../shared/components/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule, FormsModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent,
    DefinitionListComponent, AuditHistoryComponent, SectionCardComponent, DataTableComponent, ModalWrapperComponent],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly service = inject(TimesheetService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  project = signal<ProjectDto | null>(null);
  error = signal<string | null>(null);
  tasks = signal<ProjectTaskDto[]>([]);
  tasksLoading = signal(false);

  // Task modal
  showTaskModal = signal(false);
  taskSaving = signal(false);
  editingTaskId = signal<number | null>(null);
  taskForm = signal({ code: '', name: '', nameAr: '', description: '', budgetHours: null as number | null, isActive: true, displayOrder: 0 });

  statusBadge = computed(() => {
    const p = this.project();
    if (!p) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { Active: 'success', OnHold: 'warning', Completed: 'info', Cancelled: 'danger', Archived: 'secondary' };
    return {
      label: this.i18n.t(`timesheets.projects.status_${p.status.toLowerCase()}`),
      variant: map[p.status] || 'secondary'
    };
  });

  activeBadge = computed(() => {
    const p = this.project();
    if (!p) return { label: '', variant: 'secondary' as StatusVariant };
    return {
      label: p.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
      variant: (p.isActive ? 'success' : 'secondary') as StatusVariant
    };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const p = this.project();
    if (!p) return [];
    return [
      { label: this.i18n.t('timesheets.projects.code'), value: p.code },
      { label: this.i18n.t('timesheets.projects.name'), value: p.name },
      { label: this.i18n.t('timesheets.projects.name_ar'), value: p.nameAr ?? '-' },
      { label: this.i18n.t('timesheets.projects.client_name'), value: p.clientName ?? '-' },
      { label: this.i18n.t('timesheets.projects.branch'), value: p.branchName },
      { label: this.i18n.t('timesheets.projects.manager'), value: p.managerEmployeeName ?? '-' },
      { label: this.i18n.t('timesheets.projects.start_date'), value: p.startDate ? new Date(p.startDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('timesheets.projects.end_date'), value: p.endDate ? new Date(p.endDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('timesheets.projects.budget_hours'), value: p.budgetHours?.toString() ?? '-' },
      { label: this.i18n.t('timesheets.projects.is_chargeable'), value: p.isChargeable ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('timesheets.projects.task_count'), value: (p.taskCount ?? 0).toString() }
    ];
  });

  taskColumns: TableColumn[] = [
    { key: 'code', label: this.i18n.t('timesheets.tasks.code'), sortable: true, priority: 'high' },
    { key: 'name', label: this.i18n.t('timesheets.tasks.name'), sortable: true, priority: 'high' },
    { key: 'budgetHours', label: this.i18n.t('timesheets.tasks.budget_hours'), sortable: true, priority: 'medium' },
    { key: 'displayOrder', label: this.i18n.t('timesheets.tasks.display_order'), sortable: true, priority: 'medium' },
    { key: 'isActive', label: this.i18n.t('common.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  taskActions = computed<TableAction[]>(() => [
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  taskTableData = computed(() => this.tasks().map(t => ({
    ...t,
    budgetHours: t.budgetHours?.toString() ?? '-',
    isActive: t.isActive
      ? `<span class="badge bg-success">${this.i18n.t('common.active')}</span>`
      : `<span class="badge bg-secondary">${this.i18n.t('common.inactive')}</span>`
  })));

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/timesheets/projects']); return; }
    this.loadProject(+id);
    this.loadTasks(+id);
  }

  private loadProject(id: number): void {
    this.loading.set(true);
    this.service.getProject(id).subscribe({
      next: (p) => { this.project.set(p); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  private loadTasks(projectId: number): void {
    this.tasksLoading.set(true);
    this.service.getProjectTasks({ projectId, pageSize: 100 }).subscribe({
      next: (res) => { this.tasks.set(res.data); this.tasksLoading.set(false); },
      error: () => { this.tasksLoading.set(false); }
    });
  }

  openAddTask(): void {
    this.editingTaskId.set(null);
    this.taskForm.set({ code: '', name: '', nameAr: '', description: '', budgetHours: null, isActive: true, displayOrder: 0 });
    this.showTaskModal.set(true);
  }

  openEditTask(task: ProjectTaskDto): void {
    this.editingTaskId.set(task.id);
    this.taskForm.set({ code: task.code, name: task.name, nameAr: task.nameAr ?? '', description: task.description ?? '', budgetHours: task.budgetHours, isActive: task.isActive, displayOrder: task.displayOrder });
    this.showTaskModal.set(true);
  }

  saveTask(): void {
    const form = this.taskForm();
    if (!form.code || !form.name) return;
    this.taskSaving.set(true);
    const projectId = this.project()!.id;

    const taskData = { ...form, projectId, budgetHours: form.budgetHours ?? undefined };
    if (this.editingTaskId()) {
      this.service.updateProjectTask(this.editingTaskId()!, taskData).subscribe({
        next: () => { this.notification.success(this.i18n.t('timesheets.tasks.updated')); this.showTaskModal.set(false); this.taskSaving.set(false); this.loadTasks(projectId); },
        error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.taskSaving.set(false); }
      });
    } else {
      this.service.createProjectTask(taskData).subscribe({
        next: () => { this.notification.success(this.i18n.t('timesheets.tasks.created')); this.showTaskModal.set(false); this.taskSaving.set(false); this.loadTasks(projectId); },
        error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.taskSaving.set(false); }
      });
    }
  }

  onTaskAction(event: { action: string; item: any }): void {
    const original = this.tasks().find(t => t.id === event.item.id);
    if (!original) return;
    if (event.action === 'edit') this.openEditTask(original);
    else if (event.action === 'delete') this.deleteTask(original);
  }

  async deleteTask(task: ProjectTaskDto): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('common.confirm_delete'), message: this.i18n.t('timesheets.tasks.confirm_delete'), confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' });
    if (!result.confirmed) return;
    this.service.deleteProjectTask(task.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('timesheets.tasks.deleted')); this.loadTasks(this.project()!.id); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  updateTaskField(field: string, value: any): void {
    this.taskForm.update(f => ({ ...f, [field]: value }));
  }
}
