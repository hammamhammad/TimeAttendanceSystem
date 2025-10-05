import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { ExcusePoliciesService } from '../excuse-policies.service';
import { ExcusePolicy } from '../../../../shared/models/excuse-policy.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-view-excuse-policy',
  standalone: true,
  imports: [
    CommonModule,
    FormHeaderComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DefinitionListComponent
  ],
  templateUrl: './view-excuse-policy.component.html',
  styleUrls: ['./view-excuse-policy.component.css']
})
export class ViewExcusePolicyComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private excusePoliciesService = inject(ExcusePoliciesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // State signals
  loading = signal(false);
  policy = signal<ExcusePolicy | null>(null);
  policyId = signal<number | null>(null);

  // Permission constants
  readonly PERMISSIONS = {
    POLICY_UPDATE: 'settings.excusePolicy.update',
    POLICY_DELETE: 'settings.excusePolicy.delete'
  };

  // Computed properties for display
  statusBadge = computed(() => {
    const p = this.policy();
    if (!p) return { label: '', variant: 'secondary' as const };
    return {
      label: p.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
      variant: p.isActive ? 'success' as const : 'secondary' as const
    };
  });

  // Basic information items
  basicInfoItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];

    return [
      {
        label: this.i18n.t('excuse_policies.branch'),
        value: p.branchId === null
          ? this.i18n.t('excuse_policies.organization_wide')
          : (p.branchName || `Branch ${p.branchId}`)
      },
      {
        label: this.i18n.t('common.status'),
        value: '',
        customContent: true
      }
    ];
  });

  // Monthly limits items
  monthlyLimitsItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];

    return [
      {
        label: this.i18n.t('excuse_policies.max_personal_excuses_per_month'),
        value: `${p.maxPersonalExcusesPerMonth} ${this.i18n.t('excuse_policies.excuses')}`
      },
      {
        label: this.i18n.t('excuse_policies.max_personal_excuse_hours_per_month'),
        value: `${p.maxPersonalExcuseHoursPerMonth} ${this.i18n.t('common.hours')}`
      }
    ];
  });

  // Time limits items
  timeLimitsItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];

    return [
      {
        label: this.i18n.t('excuse_policies.max_personal_excuse_hours_per_day'),
        value: `${p.maxPersonalExcuseHoursPerDay} ${this.i18n.t('common.hours')}`
      },
      {
        label: this.i18n.t('excuse_policies.max_hours_per_excuse'),
        value: `${p.maxHoursPerExcuse} ${this.i18n.t('common.hours')}`
      },
      {
        label: this.i18n.t('excuse_policies.minimum_excuse_duration'),
        value: `${p.minimumExcuseDuration} ${this.i18n.t('common.hours')}`
      }
    ];
  });

  // Policy options items
  policyOptionsItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];

    return [
      {
        label: this.i18n.t('excuse_policies.requires_approval'),
        value: p.requiresApproval ? this.i18n.t('common.yes') : this.i18n.t('common.no')
      },
      {
        label: this.i18n.t('excuse_policies.allow_partial_hour_excuses'),
        value: p.allowPartialHourExcuses ? this.i18n.t('common.yes') : this.i18n.t('common.no')
      },
      {
        label: this.i18n.t('excuse_policies.allow_self_service_requests'),
        value: p.allowSelfServiceRequests ? this.i18n.t('common.yes') : this.i18n.t('common.no')
      },
      {
        label: this.i18n.t('excuse_policies.max_retroactive_days'),
        value: `${p.maxRetroactiveDays} ${this.i18n.t('fields.daysUnit')}`
      }
    ];
  });

  // Audit information items
  auditInfoItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];

    const items: DefinitionItem[] = [
      {
        label: this.i18n.t('fields.createdBy'),
        value: p.createdBy
      },
      {
        label: this.i18n.t('fields.createdAt'),
        value: this.formatDate(p.createdAtUtc)
      }
    ];

    if (p.modifiedBy && p.modifiedAtUtc) {
      items.push(
        {
          label: this.i18n.t('fields.updatedBy'),
          value: p.modifiedBy
        },
        {
          label: this.i18n.t('fields.updatedAt'),
          value: this.formatDate(p.modifiedAtUtc)
        }
      );
    }

    return items;
  });

  ngOnInit(): void {
    this.loadPolicy();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  private loadPolicy(): void {
    this.loading.set(true);

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || id <= 0) {
          this.notificationService.error(
            this.i18n.t('app.error'),
            this.i18n.t('excuse_policies.errors.load_failed')
          );
          this.router.navigate(['/settings/excuse-policies']);
          throw new Error('Invalid excuse policy ID');
        }

        this.policyId.set(id);
        return this.excusePoliciesService.getExcusePolicyById(id);
      })
    ).subscribe({
      next: (policy) => {
        this.loading.set(false);
        this.policy.set(policy);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Failed to load excuse policy:', error);
        this.notificationService.error(
          this.i18n.t('app.error'),
          this.i18n.t('excuse_policies.errors.load_failed')
        );
        this.router.navigate(['/settings/excuse-policies']);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onEdit(): void {
    const p = this.policy();
    if (!p) return;
    this.router.navigate(['/settings/excuse-policies', p.id, 'edit']);
  }

  async onToggleStatus(): Promise<void> {
    const p = this.policy();
    if (!p || !this.permissionService.has(this.PERMISSIONS.POLICY_UPDATE)) {
      this.notificationService.error(
        this.i18n.t('app.error'),
        this.i18n.t('common.errors.insufficient_permissions')
      );
      return;
    }

    const action = p.isActive ? 'deactivate' : 'activate';
    const result = await this.confirmationService.confirm({
      title: this.i18n.t(`excuse_policies.${action}_title`),
      message: this.i18n.t(`excuse_policies.confirm_${action}`),
      confirmText: this.i18n.t(`common.${action}`),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-primary',
      icon: 'fa-toggle-on',
      iconClass: 'text-primary'
    });

    if (result.confirmed) {
      this.excusePoliciesService.toggleExcusePolicyStatus(p.id).subscribe({
        next: () => {
          const successMessage = p.isActive
            ? this.i18n.t('excuse_policies.deactivate_success')
            : this.i18n.t('excuse_policies.activate_success');
          this.notificationService.success(
            this.i18n.t('app.success'),
            successMessage
          );
          this.loadPolicy();
        },
        error: (error) => {
          console.error('Failed to toggle policy status:', error);
          const errorMessage = p.isActive
            ? this.i18n.t('excuse_policies.deactivate_error')
            : this.i18n.t('excuse_policies.activate_error');
          this.notificationService.error(
            this.i18n.t('app.error'),
            errorMessage
          );
        }
      });
    }
  }

  async onDelete(): Promise<void> {
    const p = this.policy();
    if (!p || !this.permissionService.has(this.PERMISSIONS.POLICY_DELETE)) {
      this.notificationService.error(
        this.i18n.t('app.error'),
        this.i18n.t('common.errors.insufficient_permissions')
      );
      return;
    }

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('excuse_policies.delete_title'),
      message: this.i18n.t('excuse_policies.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.excusePoliciesService.deleteExcusePolicy(p.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('app.success'),
            this.i18n.t('excuse_policies.delete_success')
          );
          this.router.navigate(['/settings/excuse-policies']);
        },
        error: (error) => {
          console.error('Failed to delete excuse policy:', error);
          this.notificationService.error(
            this.i18n.t('app.error'),
            this.i18n.t('excuse_policies.delete_error')
          );
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/settings/excuse-policies']);
  }
}
