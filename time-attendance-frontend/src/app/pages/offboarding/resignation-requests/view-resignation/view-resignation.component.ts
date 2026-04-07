import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { ResignationService } from '../../../../core/services/resignation.service';
import { Resignation, ResignationStatus } from '../../../../shared/models/resignation.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-resignation',
  standalone: true,
  imports: [
    RouterModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent,
    AuditHistoryComponent
  ],
  templateUrl: './view-resignation.component.html',
  styleUrls: ['./view-resignation.component.css']
})
export class ViewResignationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private resignationService = inject(ResignationService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  resignation = signal<Resignation | null>(null);

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const r = this.resignation();
    if (!r) return [];
    return [
      { label: this.i18n.t('common.employee'), value: r.employeeName },
      { label: this.i18n.t('employees.employee_number'), value: r.employeeNumber },
      { label: this.i18n.t('common.department'), value: r.departmentName || '-' },
      { label: this.i18n.t('common.branch'), value: r.branchName || '-' },
      { label: this.i18n.t('offboarding.resignations.resignation_date'), value: r.resignationDate, type: 'date' },
      { label: this.i18n.t('offboarding.resignations.last_working_date'), value: r.lastWorkingDate, type: 'date' },
      { label: this.i18n.t('offboarding.resignations.notice_period'), value: `${r.noticePeriodDays} ${this.i18n.t('common.days')}` },
      { label: this.i18n.t('common.status'), value: this.i18n.t('offboarding.statuses.' + r.status), type: 'badge', badgeVariant: this.getStatusVariant(r.status) as any },
      { label: this.i18n.t('common.reason'), value: r.reason || '-' }
    ];
  });

  approvalInfoItems = computed<DefinitionItem[]>(() => {
    const r = this.resignation();
    if (!r || r.status === 'Pending') return [];
    const items: DefinitionItem[] = [];
    if (r.approvedByName) {
      items.push({ label: this.i18n.t('common.approved_by'), value: r.approvedByName });
      items.push({ label: this.i18n.t('common.approved_at'), value: r.approvedAtUtc, type: 'date' });
    }
    if (r.rejectionReason) {
      items.push({ label: this.i18n.t('common.rejection_reason'), value: r.rejectionReason });
    }
    return items;
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const r = this.resignation();
    if (!r || r.status !== 'Pending') return [];
    return [
      { label: this.i18n.t('common.approve'), icon: 'fa-solid fa-check', type: 'success', action: () => this.approve() },
      { label: this.i18n.t('common.reject'), icon: 'fa-solid fa-times', type: 'danger', action: () => this.reject() }
    ];
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.loadData(id);
  }

  loadData(id: number): void {
    this.loading.set(true);
    this.resignationService.getById(id).subscribe({
      next: (data) => { this.resignation.set(data); this.loading.set(false); },
      error: () => { this.notificationService.error(this.i18n.t('common.error_loading')); this.loading.set(false); }
    });
  }

  approve(): void {
    const r = this.resignation();
    if (!r) return;
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_approve'),
      message: this.i18n.t('offboarding.resignations.confirm_approve_message'),
      confirmText: this.i18n.t('common.approve'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.resignationService.approve(r.id, {}).subscribe({
          next: () => { this.notificationService.success(this.i18n.t('offboarding.resignations.approved_successfully')); this.loadData(r.id); },
          error: () => this.notificationService.error(this.i18n.t('common.error_approving'))
        });
      }
    });
  }

  reject(): void {
    const r = this.resignation();
    if (!r) return;
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_reject'),
      message: this.i18n.t('offboarding.resignations.confirm_reject_message'),
      confirmText: this.i18n.t('common.reject'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.resignationService.reject(r.id, { rejectionReason: this.i18n.t('common.rejected') }).subscribe({
          next: () => { this.notificationService.success(this.i18n.t('offboarding.resignations.rejected_successfully')); this.loadData(r.id); },
          error: () => this.notificationService.error(this.i18n.t('common.error_rejecting'))
        });
      }
    });
  }

  getStatusVariant(status: ResignationStatus): string {
    const map: Record<ResignationStatus, string> = {
      'Pending': 'warning', 'Approved': 'success', 'Rejected': 'danger',
      'Withdrawn': 'secondary'
    };
    return map[status] || 'secondary';
  }
}
