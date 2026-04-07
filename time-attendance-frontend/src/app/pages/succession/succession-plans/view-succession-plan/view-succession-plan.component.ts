import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { SuccessionService } from '../../../../core/services/succession.service';
import { SuccessionPlan, TalentProfileDropdown } from '../../../../shared/models/succession.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-view-succession-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent, SearchableSelectComponent],
  templateUrl: './view-succession-plan.component.html',
  styleUrls: ['./view-succession-plan.component.css']
})
export class ViewSuccessionPlanComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(SuccessionService);
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1`;

  loading = signal(true);
  item = signal<SuccessionPlan | null>(null);
  error = signal<string | null>(null);
  showAddCandidate = signal(false);
  addingCandidate = signal(false);
  employees = signal<any[]>([]);

  employeeOptions = computed(() =>
    this.employees().map(e => ({ value: e.id, label: e.fullName } as SearchableSelectOption))
  );

  candidateForm = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    readinessLevel: ['ReadyWithDevelopment', Validators.required],
    readinessTimeline: ['OneYear', Validators.required],
    priority: [1, Validators.required],
    developmentPlan: [''],
    gapAnalysis: [''],
    notes: ['']
  });

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Draft': { label: this.i18n.t('succession.enums.Draft'), variant: 'secondary' },
      'Active': { label: this.i18n.t('succession.enums.Active'), variant: 'success' },
      'UnderReview': { label: this.i18n.t('succession.enums.UnderReview'), variant: 'info' },
      'Approved': { label: this.i18n.t('succession.enums.Approved'), variant: 'primary' },
      'Archived': { label: this.i18n.t('succession.enums.Archived'), variant: 'dark' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('succession.plans.name'), value: d.name },
      { label: this.i18n.t('succession.plans.key_position'), value: d.keyPositionTitle || '-' },
      { label: this.i18n.t('fields.branch'), value: d.keyPositionBranchName || '-' },
      { label: this.i18n.t('fields.department'), value: d.keyPositionDepartmentName || '-' },
      { label: this.i18n.t('succession.key_positions.criticality'), value: d.criticalityLevel ? this.i18n.t('succession.enums.' + d.criticalityLevel) : '-' },
      { label: this.i18n.t('succession.plans.effective_date'), value: d.effectiveDate?.split('T')[0] || '-' },
      { label: this.i18n.t('succession.plans.review_date'), value: d.reviewDate?.split('T')[0] || '-' },
      { label: this.i18n.t('fields.notes'), value: d.notes || '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('common.edit'), icon: 'fas fa-edit', action: () => this.router.navigate(['/succession/plans', d.id, 'edit']), type: 'outline-primary' },
      { label: this.i18n.t('common.delete'), icon: 'fas fa-trash', action: () => this.delete(), type: 'danger' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/succession/plans']); return; }
    this.loadPlan(+id);
    this.http.get<any[]>(`${this.baseUrl}/employees/dropdown`).subscribe(d => this.employees.set(d));
  }

  loadPlan(id: number): void {
    this.service.getSuccessionPlan(id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('succession.plans.load_error')); this.loading.set(false); }
    });
  }

  toggleAddCandidate(): void {
    this.showAddCandidate.update(v => !v);
    if (this.showAddCandidate()) {
      this.candidateForm.reset({ readinessLevel: 'ReadyWithDevelopment', readinessTimeline: 'OneYear', priority: (this.item()?.candidates?.length || 0) + 1 });
    }
  }

  addCandidate(): void {
    if (this.candidateForm.invalid) return;
    this.addingCandidate.set(true);
    const v = this.candidateForm.getRawValue();
    this.service.addCandidate(this.item()!.id, {
      employeeId: v.employeeId!,
      readinessLevel: v.readinessLevel as any,
      readinessTimeline: v.readinessTimeline as any,
      priority: v.priority!,
      developmentPlan: v.developmentPlan || undefined,
      gapAnalysis: v.gapAnalysis || undefined,
      notes: v.notes || undefined
    }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('succession.plans.candidate_added'));
        this.showAddCandidate.set(false);
        this.addingCandidate.set(false);
        this.loadPlan(this.item()!.id);
      },
      error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('succession.plans.candidate_add_error')); this.addingCandidate.set(false); }
    });
  }

  async removeCandidate(candidateId: number): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('succession.plans.remove_candidate'),
      message: this.i18n.t('succession.plans.confirm_remove_candidate'),
      confirmText: this.i18n.t('common.delete'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.removeCandidate(this.item()!.id, candidateId).subscribe({
      next: () => { this.notification.success(this.i18n.t('succession.plans.candidate_removed')); this.loadPlan(this.item()!.id); },
      error: () => this.notification.error(this.i18n.t('succession.plans.candidate_remove_error'))
    });
  }

  async delete(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.delete'),
      message: this.i18n.t('succession.plans.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.deleteSuccessionPlan(this.item()!.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('succession.plans.deleted_success')); this.router.navigate(['/succession/plans']); },
      error: (err) => this.notification.error(err?.error?.error || this.i18n.t('succession.plans.delete_error'))
    });
  }
}
