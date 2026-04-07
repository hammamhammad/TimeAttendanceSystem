import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { BenefitService } from '../../../../core/services/benefit.service';
import { BenefitEnrollment } from '../../../../shared/models/benefit.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-enrollment.component.html',
  styleUrls: ['./view-enrollment.component.css']
})
export class ViewEnrollmentComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private benefitService = inject(BenefitService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  enrollment = signal<BenefitEnrollment | null>(null);
  entityId = signal<number | null>(null);
  rejectReason = signal('');

  statusBadge = computed(() => {
    const item = this.enrollment();
    if (!item) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { Pending: 'secondary', Active: 'success', Suspended: 'warning', Terminated: 'danger', Cancelled: 'danger', PendingApproval: 'info' };
    return { label: this.i18n.t('benefits.enrollments.status_' + item.status.toLowerCase()), variant: map[item.status] || 'secondary' };
  });

  enrollmentInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.enrollment();
    if (!item) return [];
    return [
      { label: this.i18n.t('common.employee'), value: item.employeeName },
      { label: this.i18n.t('common.employee_number'), value: item.employeeNumber || '-' },
      { label: this.i18n.t('benefits.enrollments.plan'), value: item.benefitPlanName },
      { label: this.i18n.t('benefits.plans.benefit_type'), value: item.benefitType ? this.i18n.t('benefits.types.' + item.benefitType.toLowerCase()) : '-' },
      { label: this.i18n.t('benefits.enrollments.plan_option'), value: item.planOptionName || '-' },
      { label: this.i18n.t('benefits.enrollments.enrollment_date'), value: this.formatDate(item.enrollmentDate) },
      { label: this.i18n.t('benefits.enrollments.effective_date'), value: this.formatDate(item.effectiveDate) },
      { label: this.i18n.t('benefits.enrollments.termination_date'), value: item.terminationDate ? this.formatDate(item.terminationDate) : '-' }
    ];
  });

  financialInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.enrollment();
    if (!item) return [];
    return [
      { label: this.i18n.t('benefits.enrollments.employee_contribution'), value: `${item.employeeMonthlyContribution?.toFixed(2)} ${item.currency}` },
      { label: this.i18n.t('benefits.enrollments.employer_contribution'), value: `${item.employerMonthlyContribution?.toFixed(2)} ${item.currency}` },
      { label: this.i18n.t('common.currency'), value: item.currency },
      { label: this.i18n.t('benefits.enrollments.life_event_type'), value: item.lifeEventType ? this.i18n.t('benefits.life_events.' + item.lifeEventType.toLowerCase()) : '-' },
      { label: this.i18n.t('common.notes'), value: item.notes || '-' }
    ];
  });

  dependents = computed(() => this.enrollment()?.dependents || []);

  ngOnInit(): void { this.loadData(); }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
  t(key: string): string { return this.i18n.t(key); }

  private loadData(): void {
    this.loading.set(true);
    this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap(params => {
      const id = Number(params.get('id'));
      if (!id) { this.router.navigate(['/benefits/enrollments']); throw new Error('Invalid ID'); }
      this.entityId.set(id);
      return this.benefitService.getBenefitEnrollment(id);
    })).subscribe({
      next: (data) => { this.loading.set(false); this.enrollment.set(data); },
      error: () => { this.loading.set(false); this.router.navigate(['/benefits/enrollments']); }
    });
  }

  formatDate(d: string): string { if (!d) return '-'; return new Date(d).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'long', day: 'numeric' }); }

  canApprove(): boolean { return this.enrollment()?.status === 'PendingApproval' && this.permissionService.has('benefitEnrollment.create'); }
  canReject(): boolean { return this.enrollment()?.status === 'PendingApproval' && this.permissionService.has('benefitEnrollment.create'); }

  async onApprove(): Promise<void> {
    const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('benefits.enrollments.approve_confirm'), confirmText: this.t('common.approve'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-success', icon: 'fa-check', iconClass: 'text-success' });
    if (result.confirmed) {
      this.benefitService.approveBenefitEnrollment(this.entityId()!).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.enrollments.approved_success')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.enrollments.approve_error'))
      });
    }
  }

  async onReject(): Promise<void> {
    const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('benefits.enrollments.reject_confirm'), confirmText: this.t('common.reject'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-danger', icon: 'fa-times', iconClass: 'text-danger' });
    if (result.confirmed) {
      this.benefitService.rejectBenefitEnrollment(this.entityId()!, this.rejectReason() || 'Rejected').subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.enrollments.rejected_success')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.enrollments.reject_error'))
      });
    }
  }
}
