import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { RemoteWorkPoliciesService } from '../../../../core/services/remote-work-policies.service';
import { RemoteWorkPolicy } from '../../../../core/models/remote-work-policy.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-view-remote-work-policy',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent],
  templateUrl: './view-remote-work-policy.component.html',
  styleUrls: ['./view-remote-work-policy.component.css']
})
export class ViewRemoteWorkPolicyComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(RemoteWorkPoliciesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // State signals
  loading = signal(false);
  policy = signal<RemoteWorkPolicy | null>(null);
  policyId = signal<number | null>(null);

  // Permission constants
  readonly PERMISSIONS = {
    UPDATE: 'remoteWork.policy.update',
    DELETE: 'remoteWork.policy.delete'
  };

  ngOnInit(): void {
    this.loadPolicy();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load remote work policy data from route parameters
   */
  private loadPolicy(): void {
    this.loading.set(true);

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || id <= 0) {
          this.notificationService.error(this.i18n.t('remoteWork.policy.errors.invalid_id'));
          this.router.navigate(['/settings/remote-work-policy']);
          throw new Error('Invalid policy ID');
        }

        this.policyId.set(id);
        return this.service.getById(id);
      })
    ).subscribe({
      next: (policy) => {
        this.loading.set(false);
        this.policy.set(policy);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Failed to load remote work policy:', error);

        if (error.status === 404) {
          this.notificationService.error(this.i18n.t('remoteWork.policy.errors.not_found'));
        } else {
          this.notificationService.error(this.i18n.t('remoteWork.policy.errors.load_failed'));
        }

        this.router.navigate(['/settings/remote-work-policy']);
      }
    });
  }

  /**
   * Toggle policy status
   */
  onToggleStatus(): void {
    const policy = this.policy();
    if (!policy || !this.permissionService.has(this.PERMISSIONS.UPDATE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    const action = policy.isActive ? 'deactivate' : 'activate';
    const message = this.i18n.t(`remoteWork.policy.confirm_${action}`);

    this.confirmationService.confirm({
      title: this.i18n.t(`remoteWork.policy.${action}_policy`),
      message,
      confirmText: this.i18n.t(`common.${action}`),
      cancelText: this.i18n.t('common.cancel')
    }).then(result => {
      if (result.confirmed && policy) {
        this.service.toggleStatus(policy.id).subscribe({
          next: () => {
            const successMessage = policy.isActive
              ? this.i18n.t('remoteWork.policy.success.deactivated')
              : this.i18n.t('remoteWork.policy.success.activated');
            this.notificationService.success(successMessage);
            this.loadPolicy();
          },
          error: (error) => {
            console.error('Failed to toggle policy status:', error);
            this.notificationService.error(this.i18n.t('remoteWork.policy.errors.status_toggle_failed'));
          }
        });
      }
    });
  }

  /**
   * Delete policy
   */
  onDelete(): void {
    const policy = this.policy();
    if (!policy || !this.permissionService.has(this.PERMISSIONS.DELETE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    this.confirmationService.confirm({
      title: this.i18n.t('remoteWork.policy.delete_policy'),
      message: this.i18n.t('remoteWork.policy.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    }).then(result => {
      if (result.confirmed && policy) {
        this.service.delete(policy.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('remoteWork.policy.success.deleted'));
            this.router.navigate(['/settings/remote-work-policy']);
          },
          error: (error) => {
            console.error('Failed to delete policy:', error);
            this.notificationService.error(this.i18n.t('remoteWork.policy.errors.delete_failed'));
          }
        });
      }
    });
  }

  /**
   * Computed property for status badge
   */
  statusBadge = computed<{ label: string; variant: 'success' | 'secondary' }>(() => {
    const p = this.policy();
    if (!p) return { label: '', variant: 'secondary' };

    return {
      label: p.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
      variant: p.isActive ? 'success' : 'secondary'
    };
  });

  /**
   * Computed property for basic information items
   */
  basicInfoItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];

    const items: DefinitionItem[] = [
      {
        label: this.i18n.t('remoteWork.policy.branch'),
        value: p.branchId
          ? (p.branchName || `Branch ${p.branchId}`)
          : this.i18n.t('remoteWork.policy.company_wide')
      },
      {
        label: this.i18n.t('common.status'),
        value: this.statusBadge().label,
        type: 'badge' as const,
        badgeVariant: this.statusBadge().variant
      }
    ];

    return items;
  });

  /**
   * Computed property for quota information items
   */
  quotaInfoItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];

    const items: DefinitionItem[] = [];

    if (p.maxDaysPerWeek !== null && p.maxDaysPerWeek !== undefined) {
      items.push({
        label: this.i18n.t('remoteWork.policy.max_days_per_week'),
        value: `${p.maxDaysPerWeek} ${this.i18n.t('common.days')}`
      });
    }

    if (p.maxDaysPerMonth !== null && p.maxDaysPerMonth !== undefined) {
      items.push({
        label: this.i18n.t('remoteWork.policy.max_days_per_month'),
        value: `${p.maxDaysPerMonth} ${this.i18n.t('common.days')}`
      });
    }

    if (p.maxDaysPerYear !== null && p.maxDaysPerYear !== undefined) {
      items.push({
        label: this.i18n.t('remoteWork.policy.max_days_per_year'),
        value: `${p.maxDaysPerYear} ${this.i18n.t('common.days')}`
      });
    }

    if (items.length === 0) {
      items.push({
        label: this.i18n.t('remoteWork.policy.quotas'),
        value: this.i18n.t('remoteWork.policy.no_quotas_set')
      });
    }

    return items;
  });

  /**
   * Computed property for approval settings items
   */
  approvalSettingsItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];

    return [
      {
        label: this.i18n.t('remoteWork.policy.requires_manager_approval'),
        value: p.requiresManagerApproval
          ? this.i18n.t('common.yes')
          : this.i18n.t('common.no')
      }
    ];
  });

  /**
   * Computed property for advance notice items
   */
  advanceNoticeItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];

    const items: DefinitionItem[] = [];

    if (p.minAdvanceNoticeDays !== null && p.minAdvanceNoticeDays !== undefined) {
      items.push({
        label: this.i18n.t('remoteWork.policy.min_advance_notice_days'),
        value: `${p.minAdvanceNoticeDays} ${this.i18n.t('common.days')}`
      });
    } else {
      items.push({
        label: this.i18n.t('remoteWork.policy.min_advance_notice_days'),
        value: this.i18n.t('remoteWork.policy.no_advance_notice_required')
      });
    }

    return items;
  });
}
