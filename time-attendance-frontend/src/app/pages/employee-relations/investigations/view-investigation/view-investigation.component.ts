import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { EmployeeRelationsService } from '../../../../core/services/employee-relations.service';
import { Investigation, InvestigationStatus, InvestigationNote } from '../../../../shared/models/employee-relations.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-investigation',
  standalone: true,
  imports: [
    RouterModule, ReactiveFormsModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent,
    AuditHistoryComponent
  ],
  templateUrl: './view-investigation.component.html',
  styleUrls: ['./view-investigation.component.css']
})
export class ViewInvestigationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private service = inject(EmployeeRelationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  investigation = signal<Investigation | null>(null);
  addingNote = signal(false);
  noteForm!: FormGroup;

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const inv = this.investigation();
    if (!inv) return [];
    return [
      { label: this.i18n.t('common.employee'), value: inv.employeeName },
      { label: this.i18n.t('employees.employee_number'), value: inv.employeeNumber || '-' },
      { label: this.i18n.t('common.department'), value: inv.departmentName || '-' },
      { label: this.i18n.t('common.branch'), value: inv.branchName || '-' },
      { label: this.i18n.t('common.status'), value: this.i18n.t('investigations.status_' + inv.status), type: 'badge', badgeVariant: this.getStatusVariant(inv.status) as any },
      { label: this.i18n.t('investigations.subject'), value: inv.subject },
      { label: this.i18n.t('common.description'), value: inv.description },
      { label: this.i18n.t('investigations.start_date'), value: inv.startDate, type: 'date' },
      { label: this.i18n.t('investigations.assigned_to'), value: inv.assignedToName || '-' },
      { label: this.i18n.t('investigations.related_grievance_id'), value: inv.relatedGrievanceId ? String(inv.relatedGrievanceId) : '-' },
      { label: this.i18n.t('common.created_at'), value: inv.createdAtUtc, type: 'date' }
    ];
  });

  findingsItems = computed<DefinitionItem[]>(() => {
    const inv = this.investigation();
    if (!inv || (!inv.findings && !inv.recommendations && !inv.completedDate)) return [];
    const items: DefinitionItem[] = [];
    if (inv.completedDate) {
      items.push({ label: this.i18n.t('investigations.completed_date'), value: inv.completedDate, type: 'date' });
    }
    if (inv.findings) {
      items.push({ label: this.i18n.t('investigations.findings'), value: inv.findings });
    }
    if (inv.recommendations) {
      items.push({ label: this.i18n.t('investigations.recommendations'), value: inv.recommendations });
    }
    return items;
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const inv = this.investigation();
    if (!inv) return [];
    const actions: FormHeaderAction[] = [];
    if (inv.status === 'Open' || inv.status === 'InProgress') {
      actions.push({ label: this.i18n.t('investigations.complete'), icon: 'fa-solid fa-check-circle', type: 'success', action: () => this.complete() });
    }
    return actions;
  });

  notes = computed<InvestigationNote[]>(() => this.investigation()?.notes || []);

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
    this.service.getInvestigation(id).subscribe({
      next: (data) => { this.investigation.set(data); this.loading.set(false); },
      error: () => { this.notificationService.error(this.i18n.t('common.error_loading')); this.loading.set(false); }
    });
  }

  complete(): void {
    const inv = this.investigation();
    if (!inv) return;
    this.confirmationService.confirm({
      title: this.i18n.t('investigations.confirm_complete'),
      message: this.i18n.t('investigations.confirm_complete_message'),
      confirmText: this.i18n.t('investigations.complete'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.service.completeInvestigation(inv.id, { findings: this.i18n.t('investigations.completed_by_admin') }).subscribe({
          next: () => { this.notificationService.success(this.i18n.t('investigations.completed')); this.loadData(inv.id); },
          error: () => this.notificationService.error(this.i18n.t('common.error'))
        });
      }
    });
  }

  submitNote(): void {
    if (this.noteForm.invalid) { this.noteForm.markAllAsTouched(); return; }
    const inv = this.investigation();
    if (!inv) return;
    this.addingNote.set(true);
    this.service.addInvestigationNote(inv.id, this.noteForm.value).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('investigations.note_added'));
        this.noteForm.reset({ note: '', isInternal: false });
        this.loadData(inv.id);
        this.addingNote.set(false);
      },
      error: () => { this.notificationService.error(this.i18n.t('common.error')); this.addingNote.set(false); }
    });
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  }

  getStatusVariant(status: InvestigationStatus): string {
    const map: Record<InvestigationStatus, string> = {
      'Open': 'info', 'InProgress': 'primary', 'OnHold': 'warning',
      'Completed': 'success', 'Closed': 'dark', 'Cancelled': 'secondary'
    };
    return map[status] || 'secondary';
  }
}
