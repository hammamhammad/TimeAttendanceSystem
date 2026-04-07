import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SalaryAdjustmentService } from '../../../core/services/salary-adjustment.service';
import { SalaryAdjustment, AdjustmentStatus, AdjustmentType } from '../../../shared/models/salary-adjustment.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-adjustment',
  standalone: true,
  imports: [
    CommonModule,
    FormHeaderComponent,
    SectionCardComponent,
    DefinitionListComponent,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    AuditHistoryComponent
  ],
  templateUrl: './view-adjustment.component.html',
  styleUrls: ['./view-adjustment.component.css']
})
export class ViewAdjustmentComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private adjustmentService = inject(SalaryAdjustmentService);

  loading = signal(true);
  processing = signal(false);
  item = signal<SalaryAdjustment | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      [AdjustmentStatus.Draft]: { label: this.i18n.t('common.draft'), variant: 'secondary' },
      [AdjustmentStatus.Pending]: { label: this.i18n.t('common.pending'), variant: 'pending' },
      [AdjustmentStatus.Approved]: { label: this.i18n.t('common.approved'), variant: 'approved' },
      [AdjustmentStatus.Rejected]: { label: this.i18n.t('common.rejected'), variant: 'rejected' },
      [AdjustmentStatus.Applied]: { label: this.i18n.t('common.applied'), variant: 'success' },
      [AdjustmentStatus.Cancelled]: { label: this.i18n.t('common.cancelled'), variant: 'cancelled' }
    };
    return map[d.status] ?? { label: String(d.status), variant: 'secondary' as StatusVariant };
  });

  adjustmentTypeLabel = computed(() => {
    const d = this.item();
    if (!d) return '';
    const map: Record<string, string> = {
      [AdjustmentType.AnnualIncrement]: this.i18n.t('salary_adjustments.type_annual_increment'),
      [AdjustmentType.PerformanceBonus]: this.i18n.t('salary_adjustments.type_performance_bonus'),
      [AdjustmentType.MarketAdjustment]: this.i18n.t('salary_adjustments.type_market_adjustment'),
      [AdjustmentType.PromotionIncrease]: this.i18n.t('salary_adjustments.type_promotion_increase'),
      [AdjustmentType.CostOfLivingAdjustment]: this.i18n.t('salary_adjustments.type_cost_of_living_adjustment'),
      [AdjustmentType.ContractRenewal]: this.i18n.t('salary_adjustments.type_contract_renewal'),
      [AdjustmentType.TransferAdjustment]: this.i18n.t('salary_adjustments.type_transfer_adjustment'),
      [AdjustmentType.Correction]: this.i18n.t('salary_adjustments.type_correction'),
      [AdjustmentType.Demotion]: this.i18n.t('salary_adjustments.type_demotion'),
      [AdjustmentType.AllowanceChange]: this.i18n.t('salary_adjustments.type_allowance_change'),
      [AdjustmentType.Other]: this.i18n.t('salary_adjustments.type_other')
    };
    return map[d.adjustmentType] ?? String(d.adjustmentType);
  });

  employeeInfoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.employee'), value: d.employeeName },
      { label: this.i18n.t('salary_adjustments.employee_number'), value: d.employeeNumber },
      { label: this.i18n.t('salary_adjustments.adjustment_type'), value: this.adjustmentTypeLabel() },
      { label: this.i18n.t('fields.effective_date'), value: d.effectiveDate },
      { label: this.i18n.t('fields.branch'), value: d.branchName || '-' },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('fields.reason'), value: d.reason || '-' }
    ];
  });

  salaryDetailsItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('salary_adjustments.current_salary'), value: `${d.currentSalary} ${d.currency}` },
      { label: this.i18n.t('salary_adjustments.new_salary'), value: `${d.newSalary} ${d.currency}` },
      { label: this.i18n.t('salary_adjustments.adjustment_amount'), value: `${d.adjustmentAmount > 0 ? '+' : ''}${d.adjustmentAmount} ${d.currency}` },
      { label: this.i18n.t('salary_adjustments.percentage_change'), value: `${d.percentageChange > 0 ? '+' : ''}${d.percentageChange.toFixed(2)}%` }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === AdjustmentStatus.Draft) {
      actions.push({ label: this.i18n.t('salary_adjustments.submit'), icon: 'fas fa-paper-plane', action: () => this.submit(), type: 'primary' });
    }
    if (d.status === AdjustmentStatus.Pending) {
      actions.push({ label: this.i18n.t('common.approve'), icon: 'fas fa-check', action: () => this.approve(), type: 'success' });
      actions.push({ label: this.i18n.t('common.reject'), icon: 'fas fa-times', action: () => this.reject(), type: 'danger' });
    }
    if (d.status === AdjustmentStatus.Draft || d.status === AdjustmentStatus.Pending) {
      actions.push({ label: this.i18n.t('common.cancel'), icon: 'fas fa-ban', action: () => this.cancelAdjustment(), type: 'secondary' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/salary-adjustments']);
      return;
    }
    this.loadAdjustment(+id);
  }

  private loadAdjustment(id: number): void {
    this.loading.set(true);
    this.adjustmentService.getAdjustmentById(id).subscribe({
      next: (adjustment) => {
        this.item.set(adjustment);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('salary_adjustments.load_error'));
        this.loading.set(false);
      }
    });
  }

  private performAction(actionFn: () => any, successKey: string, errorKey: string): void {
    this.processing.set(true);
    actionFn().subscribe({
      next: (updated: SalaryAdjustment) => {
        this.item.set(updated);
        this.notification.success(this.i18n.t(successKey));
        this.processing.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t(errorKey));
        this.processing.set(false);
      }
    });
  }

  submit(): void {
    this.confirmation.confirm({
      title: this.i18n.t('salary_adjustments.submit'),
      message: this.i18n.t('salary_adjustments.submit_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.adjustmentService.submitAdjustment(this.item()!.id),
        'salary_adjustments.submitted_successfully',
        'salary_adjustments.submit_error'
      );
    });
  }

  approve(): void {
    this.confirmation.confirm({
      title: this.i18n.t('common.approve'),
      message: this.i18n.t('salary_adjustments.approve_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.adjustmentService.approveAdjustment(this.item()!.id),
        'salary_adjustments.approved_successfully',
        'salary_adjustments.approve_error'
      );
    });
  }

  reject(): void {
    this.confirmation.confirm({
      title: this.i18n.t('common.reject'),
      message: this.i18n.t('salary_adjustments.reject_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.adjustmentService.rejectAdjustment(this.item()!.id, this.i18n.t('common.rejected')),
        'salary_adjustments.rejected_successfully',
        'salary_adjustments.reject_error'
      );
    });
  }

  cancelAdjustment(): void {
    this.confirmation.confirm({
      title: this.i18n.t('common.cancel'),
      message: this.i18n.t('salary_adjustments.cancel_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.close')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.adjustmentService.cancelAdjustment(this.item()!.id),
        'salary_adjustments.cancelled_successfully',
        'salary_adjustments.cancel_error'
      );
    });
  }
}
