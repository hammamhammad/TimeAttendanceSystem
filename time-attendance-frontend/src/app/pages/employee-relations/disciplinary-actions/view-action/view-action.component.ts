import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { EmployeeRelationsService } from '../../../../core/services/employee-relations.service';
import { DisciplinaryAction, DisciplinaryActionStatus } from '../../../../shared/models/employee-relations.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-action',
  standalone: true,
  imports: [
    RouterModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent,
    AuditHistoryComponent
  ],
  templateUrl: './view-action.component.html',
  styleUrls: ['./view-action.component.css']
})
export class ViewActionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(EmployeeRelationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  action = signal<DisciplinaryAction | null>(null);

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const a = this.action();
    if (!a) return [];
    return [
      { label: this.i18n.t('common.employee'), value: a.employeeName },
      { label: this.i18n.t('employees.employee_number'), value: a.employeeNumber || '-' },
      { label: this.i18n.t('common.department'), value: a.departmentName || '-' },
      { label: this.i18n.t('common.branch'), value: a.branchName || '-' },
      { label: this.i18n.t('disciplinary_actions.action_type'), value: this.i18n.t('disciplinary_actions.type_' + a.actionType) },
      { label: this.i18n.t('disciplinary_actions.severity'), value: this.i18n.t('disciplinary_actions.severity_' + a.severity), type: 'badge', badgeVariant: this.getSeverityVariant(a.severity) as any },
      { label: this.i18n.t('common.status'), value: this.i18n.t('disciplinary_actions.status_' + a.status), type: 'badge', badgeVariant: this.getStatusVariant(a.status) as any },
      { label: this.i18n.t('common.reason'), value: a.reason },
      { label: this.i18n.t('common.description'), value: a.description },
      { label: this.i18n.t('disciplinary_actions.incident_date'), value: a.incidentDate, type: 'date' },
      { label: this.i18n.t('disciplinary_actions.effective_date'), value: a.effectiveDate || '-', type: a.effectiveDate ? 'date' : undefined },
      { label: this.i18n.t('disciplinary_actions.expiry_date'), value: a.expiryDate || '-', type: a.expiryDate ? 'date' : undefined },
      { label: this.i18n.t('disciplinary_actions.issued_by'), value: a.issuedByName || '-' },
      { label: this.i18n.t('common.created_at'), value: a.createdAtUtc, type: 'date' }
    ];
  });

  appealInfoItems = computed<DefinitionItem[]>(() => {
    const a = this.action();
    if (!a || (!a.appealReason && !a.appealResolution)) return [];
    const items: DefinitionItem[] = [];
    if (a.appealReason) {
      items.push({ label: this.i18n.t('disciplinary_actions.appeal_reason'), value: a.appealReason });
      items.push({ label: this.i18n.t('disciplinary_actions.appeal_date'), value: a.appealDate || '-', type: a.appealDate ? 'date' : undefined });
    }
    if (a.appealResolution) {
      items.push({ label: this.i18n.t('disciplinary_actions.appeal_resolution'), value: a.appealResolution });
      items.push({ label: this.i18n.t('disciplinary_actions.appeal_resolved_at'), value: a.appealResolvedAtUtc || '-', type: a.appealResolvedAtUtc ? 'date' : undefined });
    }
    if (a.acknowledgedAtUtc) {
      items.push({ label: this.i18n.t('disciplinary_actions.acknowledged_at'), value: a.acknowledgedAtUtc, type: 'date' });
    }
    return items;
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const a = this.action();
    if (!a) return [];
    const actions: FormHeaderAction[] = [];
    if (a.status === 'Draft') {
      actions.push({ label: this.i18n.t('disciplinary_actions.submit'), icon: 'fa-solid fa-paper-plane', type: 'primary', action: () => this.submit() });
    }
    if (a.status === 'Pending') {
      actions.push({ label: this.i18n.t('common.approve'), icon: 'fa-solid fa-check', type: 'success', action: () => this.approve() });
    }
    if (a.status === 'Approved') {
      actions.push({ label: this.i18n.t('disciplinary_actions.acknowledge'), icon: 'fa-solid fa-handshake', type: 'info', action: () => this.acknowledge() });
    }
    if (a.status === 'Acknowledged') {
      actions.push({ label: this.i18n.t('disciplinary_actions.appeal'), icon: 'fa-solid fa-gavel', type: 'warning', action: () => this.appeal() });
    }
    if (a.status === 'Appealed') {
      actions.push({ label: this.i18n.t('disciplinary_actions.resolve_appeal'), icon: 'fa-solid fa-balance-scale', type: 'success', action: () => this.resolveAppeal() });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.loadData(id);
  }

  loadData(id: number): void {
    this.loading.set(true);
    this.service.getDisciplinaryAction(id).subscribe({
      next: (data) => { this.action.set(data); this.loading.set(false); },
      error: () => { this.notificationService.error(this.i18n.t('common.error_loading')); this.loading.set(false); }
    });
  }

  submit(): void {
    const a = this.action();
    if (!a) return;
    this.service.submitDisciplinaryAction(a.id).subscribe({
      next: () => { this.notificationService.success(this.i18n.t('disciplinary_actions.submitted')); this.loadData(a.id); },
      error: () => this.notificationService.error(this.i18n.t('common.error'))
    });
  }

  approve(): void {
    const a = this.action();
    if (!a) return;
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_approve'),
      message: this.i18n.t('disciplinary_actions.confirm_approve_message'),
      confirmText: this.i18n.t('common.approve'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.service.approveDisciplinaryAction(a.id).subscribe({
          next: () => { this.notificationService.success(this.i18n.t('disciplinary_actions.approved')); this.loadData(a.id); },
          error: () => this.notificationService.error(this.i18n.t('common.error'))
        });
      }
    });
  }

  acknowledge(): void {
    const a = this.action();
    if (!a) return;
    this.service.acknowledgeDisciplinaryAction(a.id).subscribe({
      next: () => { this.notificationService.success(this.i18n.t('disciplinary_actions.acknowledged')); this.loadData(a.id); },
      error: () => this.notificationService.error(this.i18n.t('common.error'))
    });
  }

  appeal(): void {
    const a = this.action();
    if (!a) return;
    this.confirmationService.confirm({
      title: this.i18n.t('disciplinary_actions.appeal'),
      message: this.i18n.t('disciplinary_actions.confirm_appeal_message'),
      confirmText: this.i18n.t('disciplinary_actions.appeal'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.service.appealDisciplinaryAction(a.id, { appealReason: this.i18n.t('disciplinary_actions.appeal_submitted') }).subscribe({
          next: () => { this.notificationService.success(this.i18n.t('disciplinary_actions.appeal_submitted')); this.loadData(a.id); },
          error: () => this.notificationService.error(this.i18n.t('common.error'))
        });
      }
    });
  }

  resolveAppeal(): void {
    const a = this.action();
    if (!a) return;
    this.confirmationService.confirm({
      title: this.i18n.t('disciplinary_actions.resolve_appeal'),
      message: this.i18n.t('disciplinary_actions.confirm_resolve_appeal_message'),
      confirmText: this.i18n.t('disciplinary_actions.resolve_appeal'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.service.resolveAppeal(a.id, { resolution: this.i18n.t('disciplinary_actions.appeal_resolved_text') }).subscribe({
          next: () => { this.notificationService.success(this.i18n.t('disciplinary_actions.appeal_resolved')); this.loadData(a.id); },
          error: () => this.notificationService.error(this.i18n.t('common.error'))
        });
      }
    });
  }

  getStatusVariant(status: DisciplinaryActionStatus): string {
    const map: Record<DisciplinaryActionStatus, string> = {
      'Draft': 'secondary', 'Pending': 'warning', 'Approved': 'success',
      'Acknowledged': 'info', 'Appealed': 'danger', 'AppealResolved': 'primary',
      'Completed': 'dark', 'Cancelled': 'secondary'
    };
    return map[status] || 'secondary';
  }

  getSeverityVariant(severity: string): string {
    const map: Record<string, string> = {
      'Minor': 'info', 'Moderate': 'warning', 'Major': 'danger', 'Severe': 'danger', 'Critical': 'danger'
    };
    return map[severity] || 'secondary';
  }
}
