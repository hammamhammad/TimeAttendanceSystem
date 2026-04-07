import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { AllowanceService } from '../../../core/services/allowance.service';
import { AllowanceAssignment } from '../../../shared/models/allowance.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-allowance',
  standalone: true,
  imports: [
    CommonModule,
    FormHeaderComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DefinitionListComponent,
    AuditHistoryComponent,
    SectionCardComponent
  ],
  templateUrl: './view-allowance.component.html',
  styleUrls: ['./view-allowance.component.css']
})
export class ViewAllowanceComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private allowanceService = inject(AllowanceService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  assignment = signal<AllowanceAssignment | null>(null);
  entityId = signal<number | null>(null);

  readonly PERMISSIONS = {
    UPDATE: 'allowanceAssignment.update'
  };

  statusBadge = computed(() => {
    const item = this.assignment();
    if (!item) return { label: '', variant: 'secondary' as StatusVariant };

    let variant: StatusVariant = 'secondary';
    let key = 'allowance_assignments.status_' + item.status.toLowerCase();

    switch (item.status) {
      case 'Active':
        variant = 'success';
        break;
      case 'Suspended':
        variant = 'warning';
        break;
      case 'Expired':
        variant = 'secondary';
        break;
      case 'Cancelled':
        variant = 'danger';
        break;
    }

    return { label: this.i18n.t(key), variant };
  });

  employeeInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.assignment();
    if (!item) return [];
    return [
      { label: this.i18n.t('common.employee'), value: item.employeeName },
      { label: this.i18n.t('common.employee_number'), value: item.employeeNumber || '-' },
      { label: this.i18n.t('allowance_policies.allowance_type'), value: item.allowanceTypeName },
      { label: this.i18n.t('allowance_assignments.status'), value: '', customContent: true }
    ];
  });

  amountInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.assignment();
    if (!item) return [];

    let calcTypeLabel = this.i18n.t('allowance_types.calc_fixed');
    if (item.calculationType === 'PercentageOfBasic') calcTypeLabel = this.i18n.t('allowance_types.calc_percent_basic');
    else if (item.calculationType === 'PercentageOfGross') calcTypeLabel = this.i18n.t('allowance_types.calc_percent_gross');

    const items: DefinitionItem[] = [
      { label: this.i18n.t('allowance_assignments.calculation_type'), value: calcTypeLabel },
      { label: this.i18n.t('allowance_assignments.amount'), value: `${item.amount.toFixed(2)} ${item.currency}` }
    ];

    if (item.percentage != null) {
      items.push({ label: this.i18n.t('allowance_assignments.percentage'), value: `${item.percentage}%` });
    }

    items.push(
      { label: this.i18n.t('allowance_assignments.effective_from'), value: this.formatDate(item.effectiveFromDate) },
      { label: this.i18n.t('allowance_assignments.effective_to'), value: item.effectiveToDate ? this.formatDate(item.effectiveToDate) : '-' }
    );

    return items;
  });

  additionalInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.assignment();
    if (!item) return [];

    const items: DefinitionItem[] = [];

    if (item.reason) {
      items.push({ label: this.i18n.t('common.reason'), value: item.reason });
    }
    if (item.notes) {
      items.push({ label: this.i18n.t('common.notes'), value: item.notes });
    }

    items.push(
      { label: this.i18n.t('fields.createdBy'), value: item.createdBy || '-' },
      { label: this.i18n.t('fields.createdAt'), value: item.createdAtUtc ? this.formatDate(item.createdAtUtc) : '-' }
    );

    if (item.modifiedBy && item.modifiedAtUtc) {
      items.push(
        { label: this.i18n.t('fields.updatedBy'), value: item.modifiedBy },
        { label: this.i18n.t('fields.updatedAt'), value: this.formatDate(item.modifiedAtUtc) }
      );
    }

    return items;
  });

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  private loadData(): void {
    this.loading.set(true);

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || id <= 0) {
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_assignments.load_error'));
          this.router.navigate(['/allowances']);
          throw new Error('Invalid allowance assignment ID');
        }
        this.entityId.set(id);
        return this.allowanceService.getAllowanceAssignment(id);
      })
    ).subscribe({
      next: (data) => {
        this.loading.set(false);
        this.assignment.set(data);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Failed to load allowance assignment:', error);
        this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_assignments.load_error'));
        this.router.navigate(['/allowances']);
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getDateLocale(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  canSuspend(): boolean {
    const item = this.assignment();
    return !!item && item.status === 'Active' && this.permissionService.has(this.PERMISSIONS.UPDATE);
  }

  canResume(): boolean {
    const item = this.assignment();
    return !!item && item.status === 'Suspended' && this.permissionService.has(this.PERMISSIONS.UPDATE);
  }

  canCancel(): boolean {
    const item = this.assignment();
    return !!item && (item.status === 'Active' || item.status === 'Suspended') && this.permissionService.has(this.PERMISSIONS.UPDATE);
  }

  async onSuspend(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('common.confirm'),
      message: this.i18n.t('allowance_assignments.suspend_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-warning',
      icon: 'fa-pause',
      iconClass: 'text-warning'
    });

    if (result.confirmed) {
      this.allowanceService.suspendAllowance(this.entityId()!).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('allowance_assignments.suspended_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to suspend:', error);
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_assignments.suspended_success'));
        }
      });
    }
  }

  async onResume(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('common.confirm'),
      message: this.i18n.t('allowance_assignments.resume_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'fa-play',
      iconClass: 'text-success'
    });

    if (result.confirmed) {
      this.allowanceService.resumeAllowance(this.entityId()!).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('allowance_assignments.resumed_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to resume:', error);
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_assignments.resumed_success'));
        }
      });
    }
  }

  async onCancelAssignment(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('common.confirm'),
      message: this.i18n.t('allowance_assignments.cancel_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-times',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.allowanceService.cancelAllowance(this.entityId()!).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('allowance_assignments.cancelled_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to cancel:', error);
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_assignments.cancelled_success'));
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/allowances']);
  }
}
