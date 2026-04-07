import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { AllowanceService } from '../../../../core/services/allowance.service';
import { AllowanceType } from '../../../../shared/models/allowance.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-allowance-type',
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
  templateUrl: './view-allowance-type.component.html',
  styleUrls: ['./view-allowance-type.component.css']
})
export class ViewAllowanceTypeComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private allowanceService = inject(AllowanceService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  allowanceType = signal<AllowanceType | null>(null);
  entityId = signal<number | null>(null);

  readonly PERMISSIONS = {
    UPDATE: 'allowanceType.update',
    DELETE: 'allowanceType.delete'
  };

  statusBadge = computed(() => {
    const item = this.allowanceType();
    if (!item) return { label: '', variant: 'secondary' as const };
    return {
      label: item.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
      variant: item.isActive ? 'success' as const : 'secondary' as const
    };
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.allowanceType();
    if (!item) return [];
    return [
      { label: this.i18n.t('allowance_types.code'), value: item.code },
      { label: this.i18n.t('common.name'), value: item.name },
      { label: this.i18n.t('common.name_ar'), value: item.nameAr || '-' },
      { label: this.i18n.t('common.description'), value: item.description || '-' },
      { label: this.i18n.t('common.branch'), value: item.branchName || this.i18n.t('common.all_branches') },
      { label: this.i18n.t('common.status'), value: '', customContent: true }
    ];
  });

  configItems = computed<DefinitionItem[]>(() => {
    const item = this.allowanceType();
    if (!item) return [];

    let calcTypeLabel = this.i18n.t('allowance_types.calc_fixed');
    if (item.defaultCalculationType === 'PercentageOfBasic') calcTypeLabel = this.i18n.t('allowance_types.calc_percent_basic');
    else if (item.defaultCalculationType === 'PercentageOfGross') calcTypeLabel = this.i18n.t('allowance_types.calc_percent_gross');

    let categoryLabel = this.i18n.t(`allowance_types.category_${item.category.toLowerCase()}`);

    const items: DefinitionItem[] = [
      { label: this.i18n.t('allowance_types.category'), value: categoryLabel },
      { label: this.i18n.t('allowance_types.default_calculation_type'), value: calcTypeLabel }
    ];

    if (item.defaultCalculationType === 'Fixed') {
      items.push({ label: this.i18n.t('allowance_types.default_amount'), value: item.defaultAmount != null ? item.defaultAmount.toFixed(2) : '-' });
    } else {
      items.push({ label: this.i18n.t('allowance_types.default_percentage'), value: item.defaultPercentage != null ? `${item.defaultPercentage}%` : '-' });
    }

    items.push(
      { label: this.i18n.t('allowance_types.is_taxable'), value: item.isTaxable ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('allowance_types.is_social_insurable'), value: item.isSocialInsurable ? this.i18n.t('common.yes') : this.i18n.t('common.no') }
    );

    return items;
  });

  auditInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.allowanceType();
    if (!item) return [];

    const items: DefinitionItem[] = [
      { label: this.i18n.t('fields.createdBy'), value: item.createdBy || '-' },
      { label: this.i18n.t('fields.createdAt'), value: item.createdAtUtc ? this.formatDate(item.createdAtUtc) : '-' }
    ];

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
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_types.load_error'));
          this.router.navigate(['/settings/allowance-types']);
          throw new Error('Invalid allowance type ID');
        }
        this.entityId.set(id);
        return this.allowanceService.getAllowanceType(id);
      })
    ).subscribe({
      next: (data) => {
        this.loading.set(false);
        this.allowanceType.set(data);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Failed to load allowance type:', error);
        this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_types.load_error'));
        this.router.navigate(['/settings/allowance-types']);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getDateLocale(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onEdit(): void {
    const item = this.allowanceType();
    if (!item) return;
    this.router.navigate(['/settings/allowance-types', item.id, 'edit']);
  }

  async onToggleStatus(): Promise<void> {
    const item = this.allowanceType();
    if (!item) return;

    const action = item.isActive ? 'deactivate' : 'activate';
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('common.confirm'),
      message: this.i18n.t(`common.confirm_${action}`),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-primary',
      icon: 'fa-toggle-on',
      iconClass: 'text-primary'
    });

    if (result.confirmed) {
      this.allowanceService.toggleAllowanceTypeStatus(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('allowance_types.status_toggled'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to toggle status:', error);
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_types.status_toggled'));
        }
      });
    }
  }

  async onDelete(): Promise<void> {
    const item = this.allowanceType();
    if (!item) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('common.delete'),
      message: this.i18n.t('common.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.allowanceService.deleteAllowanceType(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('allowance_types.deleted_success'));
          this.router.navigate(['/settings/allowance-types']);
        },
        error: (error) => {
          console.error('Failed to delete allowance type:', error);
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_types.deleted_success'));
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/settings/allowance-types']);
  }
}
