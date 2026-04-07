import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { AllowanceService } from '../../../../core/services/allowance.service';
import { AllowancePolicy } from '../../../../shared/models/allowance.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-allowance-policy',
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
  templateUrl: './view-allowance-policy.component.html',
  styleUrls: ['./view-allowance-policy.component.css']
})
export class ViewAllowancePolicyComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private allowanceService = inject(AllowanceService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  policy = signal<AllowancePolicy | null>(null);
  entityId = signal<number | null>(null);

  readonly PERMISSIONS = {
    UPDATE: 'allowancePolicy.update',
    DELETE: 'allowancePolicy.delete'
  };

  statusBadge = computed(() => {
    const item = this.policy();
    if (!item) return { label: '', variant: 'secondary' as const };
    return {
      label: item.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
      variant: item.isActive ? 'success' as const : 'secondary' as const
    };
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.policy();
    if (!item) return [];
    return [
      { label: this.i18n.t('common.name'), value: item.name },
      { label: this.i18n.t('common.name_ar'), value: item.nameAr || '-' },
      { label: this.i18n.t('allowance_policies.allowance_type'), value: item.allowanceTypeName },
      { label: this.i18n.t('common.description'), value: item.description || '-' },
      { label: this.i18n.t('common.branch'), value: item.branchName || this.i18n.t('common.all_branches') },
      { label: this.i18n.t('common.effective_date'), value: this.formatDate(item.effectiveDate) },
      { label: this.i18n.t('common.status'), value: '', customContent: true }
    ];
  });

  configItems = computed<DefinitionItem[]>(() => {
    const item = this.policy();
    if (!item) return [];

    const items: DefinitionItem[] = [
      { label: this.i18n.t('allowance_policies.requires_approval'), value: item.requiresApproval ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('allowance_policies.min_amount'), value: item.minAmount != null ? item.minAmount.toFixed(2) : '-' },
      { label: this.i18n.t('allowance_policies.max_amount'), value: item.maxAmount != null ? item.maxAmount.toFixed(2) : '-' },
      { label: this.i18n.t('allowance_policies.max_percentage'), value: item.maxPercentageOfBasic != null ? `${item.maxPercentageOfBasic}%` : '-' },
      { label: this.i18n.t('allowance_policies.temporary_allowed'), value: item.isTemporaryAllowed ? this.i18n.t('common.yes') : this.i18n.t('common.no') }
    ];

    if (item.isTemporaryAllowed) {
      items.push({ label: this.i18n.t('allowance_policies.max_duration'), value: item.maxDurationMonths != null ? `${item.maxDurationMonths}` : '-' });
    }

    if (item.eligibilityRules) {
      items.push({ label: this.i18n.t('allowance_policies.eligibility_rules'), value: item.eligibilityRules });
    }

    return items;
  });

  auditInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.policy();
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
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_policies.load_error'));
          this.router.navigate(['/settings/allowance-policies']);
          throw new Error('Invalid allowance policy ID');
        }
        this.entityId.set(id);
        return this.allowanceService.getAllowancePolicy(id);
      })
    ).subscribe({
      next: (data) => {
        this.loading.set(false);
        this.policy.set(data);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Failed to load allowance policy:', error);
        this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_policies.load_error'));
        this.router.navigate(['/settings/allowance-policies']);
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

  onEdit(): void {
    const item = this.policy();
    if (!item) return;
    this.router.navigate(['/settings/allowance-policies', item.id, 'edit']);
  }

  async onDelete(): Promise<void> {
    const item = this.policy();
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
      this.allowanceService.deleteAllowancePolicy(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('allowance_policies.deleted_success'));
          this.router.navigate(['/settings/allowance-policies']);
        },
        error: (error) => {
          console.error('Failed to delete policy:', error);
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_policies.deleted_success'));
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/settings/allowance-policies']);
  }
}
