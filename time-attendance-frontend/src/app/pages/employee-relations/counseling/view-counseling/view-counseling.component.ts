import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { EmployeeRelationsService } from '../../../../core/services/employee-relations.service';
import { CounselingRecord } from '../../../../shared/models/employee-relations.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-counseling',
  standalone: true,
  imports: [
    RouterModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent,
    AuditHistoryComponent
  ],
  templateUrl: './view-counseling.component.html',
  styleUrls: ['./view-counseling.component.css']
})
export class ViewCounselingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(EmployeeRelationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  record = signal<CounselingRecord | null>(null);

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const r = this.record();
    if (!r) return [];
    return [
      { label: this.i18n.t('counseling_records.employee'), value: r.employeeName || '-' },
      { label: this.i18n.t('employees.employee_number'), value: r.employeeNumber || '-' },
      { label: this.i18n.t('common.department'), value: r.departmentName || '-' },
      { label: this.i18n.t('common.branch'), value: r.branchName || '-' },
      { label: this.i18n.t('counseling_records.counselor'), value: r.counselorName || '-' },
      { label: this.i18n.t('counseling_records.session_date'), value: r.sessionDate, type: 'date' },
      { label: this.i18n.t('counseling_records.session_type'), value: this.i18n.t('counseling_records.type_' + r.counselingType) },
      { label: this.i18n.t('counseling_records.subject'), value: r.subject },
      { label: this.i18n.t('counseling_records.notes'), value: r.description || '-' },
      { label: this.i18n.t('counseling_records.outcome'), value: r.outcome || '-' },
      { label: this.i18n.t('counseling_records.confidential'), value: r.isConfidential ? this.i18n.t('common.yes') : this.i18n.t('common.no'), type: 'badge', badgeVariant: (r.isConfidential ? 'danger' : 'secondary') as any },
      { label: this.i18n.t('common.created_at'), value: r.createdAtUtc, type: 'date' }
    ];
  });

  followUpInfoItems = computed<DefinitionItem[]>(() => {
    const r = this.record();
    if (!r) return [];
    const items: DefinitionItem[] = [
      { label: this.i18n.t('counseling_records.follow_up_required'), value: r.followUpRequired ? this.i18n.t('common.yes') : this.i18n.t('common.no'), type: 'badge', badgeVariant: (r.followUpRequired ? 'warning' : 'secondary') as any }
    ];
    if (r.followUpDate) {
      items.push({ label: this.i18n.t('counseling_records.follow_up_date'), value: r.followUpDate, type: 'date' });
    }
    if (r.followUpRequired) {
      items.push({ label: this.i18n.t('counseling_records.follow_up_completed'), value: r.followUpCompleted ? this.i18n.t('common.yes') : this.i18n.t('common.no'), type: 'badge', badgeVariant: (r.followUpCompleted ? 'success' : 'warning') as any });
    }
    if (r.followUpNotes) {
      items.push({ label: this.i18n.t('counseling_records.follow_up_notes'), value: r.followUpNotes });
    }
    return items;
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const r = this.record();
    if (!r) return [];
    const actions: FormHeaderAction[] = [];
    if (r.followUpRequired && !r.followUpCompleted) {
      actions.push({ label: this.i18n.t('counseling_records.mark_follow_up_complete'), icon: 'fa-solid fa-check-circle', type: 'success', action: () => this.markFollowUpComplete() });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.loadData(id);
  }

  loadData(id: number): void {
    this.loading.set(true);
    this.service.getCounselingRecord(id).subscribe({
      next: (data) => { this.record.set(data); this.loading.set(false); },
      error: () => { this.notificationService.error(this.i18n.t('common.error_loading')); this.loading.set(false); }
    });
  }

  markFollowUpComplete(): void {
    const r = this.record();
    if (!r) return;
    this.confirmationService.confirm({
      title: this.i18n.t('counseling_records.confirm_follow_up_complete'),
      message: this.i18n.t('counseling_records.confirm_follow_up_complete_message'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.service.completeFollowUp(r.id, '').subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('counseling_records.follow_up_completed_success'));
            this.loadData(r.id);
          },
          error: () => this.notificationService.error(this.i18n.t('common.error'))
        });
      }
    });
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  }
}
