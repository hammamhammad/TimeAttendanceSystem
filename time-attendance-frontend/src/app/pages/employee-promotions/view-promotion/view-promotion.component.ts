import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeePromotionService } from '../../../core/services/employee-promotion.service';
import { EmployeePromotion, PromotionStatus, PromotionType } from '../../../shared/models/employee-promotion.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-promotion',
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
  templateUrl: './view-promotion.component.html',
  styleUrls: ['./view-promotion.component.css']
})
export class ViewPromotionComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private promotionService = inject(EmployeePromotionService);

  loading = signal(true);
  processing = signal(false);
  item = signal<EmployeePromotion | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      [PromotionStatus.Pending]: { label: this.i18n.t('common.pending'), variant: 'pending' },
      [PromotionStatus.Approved]: { label: this.i18n.t('common.approved'), variant: 'approved' },
      [PromotionStatus.Rejected]: { label: this.i18n.t('common.rejected'), variant: 'rejected' },
      [PromotionStatus.Effective]: { label: this.i18n.t('common.effective'), variant: 'success' },
      [PromotionStatus.Cancelled]: { label: this.i18n.t('common.cancelled'), variant: 'cancelled' }
    };
    return map[d.status] ?? { label: String(d.status), variant: 'secondary' as StatusVariant };
  });

  promotionTypeLabel = computed(() => {
    const d = this.item();
    if (!d) return '';
    const map: Record<string, string> = {
      [PromotionType.TitleChange]: this.i18n.t('employee_promotions.type_title_change'),
      [PromotionType.GradePromotion]: this.i18n.t('employee_promotions.type_grade_promotion'),
      [PromotionType.SalaryIncrease]: this.i18n.t('employee_promotions.type_salary_increase'),
      [PromotionType.FullPromotion]: this.i18n.t('employee_promotions.type_full_promotion'),
      [PromotionType.Demotion]: this.i18n.t('employee_promotions.type_demotion')
    };
    return map[d.promotionType] ?? String(d.promotionType);
  });

  employeeInfoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.employee'), value: d.employeeName },
      { label: this.i18n.t('employee_promotions.employee_number'), value: d.employeeNumber },
      { label: this.i18n.t('employee_promotions.promotion_type'), value: this.promotionTypeLabel() },
      { label: this.i18n.t('fields.effective_date'), value: d.effectiveDate },
      { label: this.i18n.t('fields.branch'), value: d.branchName || '-' },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('fields.reason'), value: d.reason || '-' }
    ];
  });

  oldDetailsItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('employee_promotions.job_title'), value: d.oldJobTitle },
      { label: this.i18n.t('employee_promotions.grade'), value: d.oldGradeName || '-' },
      { label: this.i18n.t('employee_promotions.salary'), value: d.oldSalary != null ? String(d.oldSalary) : '-' }
    ];
  });

  newDetailsItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('employee_promotions.job_title'), value: d.newJobTitle },
      { label: this.i18n.t('employee_promotions.grade'), value: d.newGradeName || '-' },
      { label: this.i18n.t('employee_promotions.salary'), value: d.newSalary != null ? String(d.newSalary) : '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === PromotionStatus.Pending) {
      actions.push({ label: this.i18n.t('common.approve'), icon: 'fas fa-check', action: () => this.approve(), type: 'success' });
      actions.push({ label: this.i18n.t('common.reject'), icon: 'fas fa-times', action: () => this.reject(), type: 'danger' });
      actions.push({ label: this.i18n.t('common.cancel'), icon: 'fas fa-ban', action: () => this.cancelPromotion(), type: 'secondary' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/employee-promotions']);
      return;
    }
    this.loadPromotion(+id);
  }

  private loadPromotion(id: number): void {
    this.loading.set(true);
    this.promotionService.getPromotionById(id).subscribe({
      next: (promotion) => {
        this.item.set(promotion);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('employee_promotions.load_error'));
        this.loading.set(false);
      }
    });
  }

  private performAction(actionFn: () => any, successKey: string, errorKey: string): void {
    this.processing.set(true);
    actionFn().subscribe({
      next: (updated: EmployeePromotion) => {
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

  approve(): void {
    this.confirmation.confirm({
      title: this.i18n.t('common.approve'),
      message: this.i18n.t('employee_promotions.approve_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.promotionService.approvePromotion(this.item()!.id),
        'employee_promotions.approved_successfully',
        'employee_promotions.approve_error'
      );
    });
  }

  reject(): void {
    this.confirmation.confirm({
      title: this.i18n.t('common.reject'),
      message: this.i18n.t('employee_promotions.reject_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.promotionService.rejectPromotion(this.item()!.id, this.i18n.t('common.rejected')),
        'employee_promotions.rejected_successfully',
        'employee_promotions.reject_error'
      );
    });
  }

  cancelPromotion(): void {
    this.confirmation.confirm({
      title: this.i18n.t('common.cancel'),
      message: this.i18n.t('employee_promotions.cancel_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.close')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.promotionService.cancelPromotion(this.item()!.id),
        'employee_promotions.cancelled_successfully',
        'employee_promotions.cancel_error'
      );
    });
  }
}
