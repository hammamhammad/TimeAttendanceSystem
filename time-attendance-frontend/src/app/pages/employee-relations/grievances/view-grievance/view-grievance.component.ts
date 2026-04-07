import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { EmployeeRelationsService } from '../../../../core/services/employee-relations.service';
import { Grievance, GrievanceStatus, GrievanceNote } from '../../../../shared/models/employee-relations.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-grievance',
  standalone: true,
  imports: [
    RouterModule, ReactiveFormsModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent,
    AuditHistoryComponent
  ],
  templateUrl: './view-grievance.component.html',
  styleUrls: ['./view-grievance.component.css']
})
export class ViewGrievanceComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private service = inject(EmployeeRelationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  grievance = signal<Grievance | null>(null);
  addingNote = signal(false);
  noteForm!: FormGroup;

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const g = this.grievance();
    if (!g) return [];
    return [
      { label: this.i18n.t('common.employee'), value: g.employeeName },
      { label: this.i18n.t('employees.employee_number'), value: g.employeeNumber || '-' },
      { label: this.i18n.t('common.department'), value: g.departmentName || '-' },
      { label: this.i18n.t('common.branch'), value: g.branchName || '-' },
      { label: this.i18n.t('grievances.type'), value: this.i18n.t('grievances.type_' + g.grievanceType) },
      { label: this.i18n.t('grievances.priority'), value: this.i18n.t('grievances.priority_' + g.priority), type: 'badge', badgeVariant: this.getPriorityVariant(g.priority) as any },
      { label: this.i18n.t('common.status'), value: this.i18n.t('grievances.status_' + g.status), type: 'badge', badgeVariant: this.getStatusVariant(g.status) as any },
      { label: this.i18n.t('grievances.subject'), value: g.subject },
      { label: this.i18n.t('common.description'), value: g.description },
      { label: this.i18n.t('grievances.desired_resolution'), value: g.desiredResolution || '-' },
      { label: this.i18n.t('common.created_at'), value: g.createdAtUtc, type: 'date' }
    ];
  });

  assignmentInfoItems = computed<DefinitionItem[]>(() => {
    const g = this.grievance();
    if (!g) return [];
    const items: DefinitionItem[] = [];
    if (g.assignedToName) {
      items.push({ label: this.i18n.t('grievances.assigned_to'), value: g.assignedToName });
    }
    if (g.resolutionNotes) {
      items.push({ label: this.i18n.t('grievances.resolution_notes'), value: g.resolutionNotes });
    }
    if (g.resolvedAtUtc) {
      items.push({ label: this.i18n.t('grievances.resolved_at'), value: g.resolvedAtUtc, type: 'date' });
    }
    if (g.closedAtUtc) {
      items.push({ label: this.i18n.t('grievances.closed_at'), value: g.closedAtUtc, type: 'date' });
    }
    return items;
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const g = this.grievance();
    if (!g) return [];
    const actions: FormHeaderAction[] = [];
    if (g.status === 'Submitted' || g.status === 'UnderReview') {
      actions.push({ label: this.i18n.t('grievances.escalate'), icon: 'fa-solid fa-arrow-up', type: 'warning', action: () => this.escalate() });
    }
    if (g.status !== 'Resolved' && g.status !== 'Closed' && g.status !== 'Withdrawn' && g.status !== 'Draft') {
      actions.push({ label: this.i18n.t('grievances.resolve'), icon: 'fa-solid fa-check-circle', type: 'success', action: () => this.resolve() });
    }
    if (g.status === 'Resolved') {
      actions.push({ label: this.i18n.t('grievances.close'), icon: 'fa-solid fa-times-circle', type: 'secondary', action: () => this.close() });
    }
    return actions;
  });

  notes = computed<GrievanceNote[]>(() => this.grievance()?.notes || []);

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      note: ['', Validators.required],
      isInternal: [false]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.loadData(id);
  }

  loadData(id: number): void {
    this.loading.set(true);
    this.service.getGrievance(id).subscribe({
      next: (data) => { this.grievance.set(data); this.loading.set(false); },
      error: () => { this.notificationService.error(this.i18n.t('common.error_loading')); this.loading.set(false); }
    });
  }

  escalate(): void {
    const g = this.grievance();
    if (!g) return;
    this.confirmationService.confirm({
      title: this.i18n.t('grievances.confirm_escalate'),
      message: this.i18n.t('grievances.confirm_escalate_message'),
      confirmText: this.i18n.t('grievances.escalate'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.service.escalateGrievance(g.id).subscribe({
          next: () => { this.notificationService.success(this.i18n.t('grievances.escalated')); this.loadData(g.id); },
          error: () => this.notificationService.error(this.i18n.t('common.error'))
        });
      }
    });
  }

  resolve(): void {
    const g = this.grievance();
    if (!g) return;
    this.confirmationService.confirm({
      title: this.i18n.t('grievances.confirm_resolve'),
      message: this.i18n.t('grievances.confirm_resolve_message'),
      confirmText: this.i18n.t('grievances.resolve'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.service.resolveGrievance(g.id, this.i18n.t('grievances.resolved_by_admin')).subscribe({
          next: () => { this.notificationService.success(this.i18n.t('grievances.resolved_success')); this.loadData(g.id); },
          error: () => this.notificationService.error(this.i18n.t('common.error'))
        });
      }
    });
  }

  close(): void {
    const g = this.grievance();
    if (!g) return;
    this.service.closeGrievance(g.id).subscribe({
      next: () => { this.notificationService.success(this.i18n.t('grievances.closed_success')); this.loadData(g.id); },
      error: () => this.notificationService.error(this.i18n.t('common.error'))
    });
  }

  submitNote(): void {
    if (this.noteForm.invalid) { this.noteForm.markAllAsTouched(); return; }
    const g = this.grievance();
    if (!g) return;
    this.addingNote.set(true);
    this.service.addGrievanceNote(g.id, this.noteForm.value).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('grievances.note_added'));
        this.noteForm.reset({ note: '', isInternal: false });
        this.loadData(g.id);
        this.addingNote.set(false);
      },
      error: () => { this.notificationService.error(this.i18n.t('common.error')); this.addingNote.set(false); }
    });
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  }

  getStatusVariant(status: GrievanceStatus): string {
    const map: Record<GrievanceStatus, string> = {
      'Draft': 'secondary', 'Submitted': 'info', 'UnderReview': 'primary',
      'Assigned': 'warning', 'Investigating': 'warning', 'Escalated': 'danger',
      'Resolved': 'success', 'Closed': 'dark', 'Withdrawn': 'secondary'
    };
    return map[status] || 'secondary';
  }

  getPriorityVariant(priority: string): string {
    const map: Record<string, string> = {
      'Low': 'info', 'Medium': 'warning', 'High': 'danger', 'Critical': 'danger'
    };
    return map[priority] || 'secondary';
  }
}
