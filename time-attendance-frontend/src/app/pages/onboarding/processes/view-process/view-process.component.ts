import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { OnboardingProcess } from '../../../../shared/models/onboarding.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../../shared/components/file-upload/file-upload.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-view-process',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent, FileUploadComponent],
  templateUrl: './view-process.component.html',
  styleUrls: ['./view-process.component.css']
})
export class ViewOnboardingProcessComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(OnboardingService);

  loading = signal(true);
  item = signal<OnboardingProcess | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'NotStarted': { label: this.i18n.t('onboarding_processes.status_not_started'), variant: 'secondary' },
      'InProgress': { label: this.i18n.t('onboarding_processes.status_in_progress'), variant: 'info' },
      'Completed': { label: this.i18n.t('onboarding_processes.status_completed'), variant: 'success' },
      'Cancelled': { label: this.i18n.t('common.cancelled'), variant: 'dark' },
      'Overdue': { label: this.i18n.t('onboarding_processes.status_overdue'), variant: 'danger' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.employee'), value: d.employeeName || '-' },
      { label: this.i18n.t('onboarding_processes.template'), value: d.templateName || '-' },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('fields.start_date'), value: d.startDate },
      { label: this.i18n.t('onboarding_processes.expected_end'), value: d.expectedEndDate || '-' },
      { label: this.i18n.t('onboarding_processes.progress'), value: `${d.progress}%` },
      { label: this.i18n.t('onboarding_processes.tasks_completed'), value: `${d.completedTasks}/${d.totalTasks}` },
      { label: this.i18n.t('onboarding_processes.overdue_tasks'), value: String(d.overdueTasks) }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === 'InProgress' || d.status === 'NotStarted') {
      actions.push({ label: this.i18n.t('common.cancel_action'), icon: 'fas fa-ban', action: () => this.cancelProcess(), type: 'danger' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/onboarding/processes']); return; }
    this.service.getProcess(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('onboarding_processes.load_error')); this.loading.set(false); }
    });
  }

  async cancelProcess(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.cancel_action'),
      message: this.i18n.t('onboarding_processes.confirm_cancel'),
      confirmText: this.i18n.t('common.cancel_action'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.cancelProcess(this.item()!.id).subscribe({
      next: (u) => {
        this.item.set(u);
        this.notification.success(this.i18n.t('onboarding_processes.cancelled_success'));
      },
      error: () => this.notification.error(this.i18n.t('onboarding_processes.cancel_error'))
    });
  }

  updateTask(taskId: number, status: string): void {
    this.service.updateTaskStatus(this.item()!.id, taskId, { status: status as any }).subscribe({
      next: () => { this.notification.success(this.i18n.t('onboarding_tasks.updated_success')); this.ngOnInit(); },
      error: () => this.notification.error(this.i18n.t('onboarding_tasks.update_error'))
    });
  }

  onDocumentUploaded(event: FileUploadedEvent): void {
    const current = this.item();
    if (current) {
      const newDoc = {
        id: event.fileId,
        processId: current.id,
        title: event.fileName,
        fileName: event.fileName,
        fileUrl: event.fileUrl,
        fileType: event.fileName.split('.').pop() || '',
        uploadedById: 0,
        uploadedAtUtc: new Date().toISOString()
      };
      this.item.set({ ...current, documents: [...(current.documents || []), newDoc] });
      this.notification.success(this.i18n.t('files.upload'));
    }
  }

  getFullFileUrl(relativeUrl: string): string {
    if (relativeUrl.startsWith('http')) return relativeUrl;
    return `${environment.apiUrl}${relativeUrl}`;
  }
}
