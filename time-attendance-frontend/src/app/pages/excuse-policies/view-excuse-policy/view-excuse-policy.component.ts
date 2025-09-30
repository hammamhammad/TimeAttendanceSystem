import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { ExcusePoliciesService } from '../excuse-policies.service';
import { ExcusePolicyDto } from '../../../shared/models/excuse-policy.model';
import { PermissionActions } from '../../../shared/utils/permission.utils';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DetailCardComponent, DetailField } from '../../../shared/components/detail-card/detail-card.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-view-excuse-policy',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    DetailCardComponent,
    FormHeaderComponent
  ],
  templateUrl: './view-excuse-policy.component.html',
  styleUrls: ['./view-excuse-policy.component.css']
})
export class ViewExcusePolicyComponent implements OnInit {
  public i18n = inject(I18nService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private excusePoliciesService = inject(ExcusePoliciesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public permissionService = inject(PermissionService);

  // Signals
  loading = signal(false);
  processing = signal(false);
  excusePolicy = signal<ExcusePolicyDto | null>(null);
  error = signal<string | null>(null);

  get basicInfoFields(): DetailField[] {
    const policy = this.excusePolicy();
    if (!policy) return [];

    return [
      {
        label: this.i18n.t('fields.branch'),
        value: policy.branchName || this.i18n.t('common.all_branches')
      },
      {
        label: this.i18n.t('fields.status'),
        value: policy.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
        type: 'badge',
        badgeVariant: policy.isActive ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('excuse_policies.max_personal_excuses_per_month'),
        value: policy.maxPersonalExcusesPerMonth.toString()
      },
      {
        label: this.i18n.t('excuse_policies.max_personal_excuse_hours_per_month'),
        value: `${policy.maxPersonalExcuseHoursPerMonth} ${this.i18n.t('fields.hoursUnit')}`
      },
      {
        label: this.i18n.t('excuse_policies.max_personal_excuse_hours_per_day'),
        value: `${policy.maxPersonalExcuseHoursPerDay} ${this.i18n.t('fields.hoursUnit')}`
      },
      {
        label: this.i18n.t('excuse_policies.max_hours_per_excuse'),
        value: `${policy.maxHoursPerExcuse} ${this.i18n.t('fields.hoursUnit')}`
      }
    ];
  }

  get settingsFields(): DetailField[] {
    const policy = this.excusePolicy();
    if (!policy) return [];

    return [
      {
        label: this.i18n.t('excuse_policies.requires_approval'),
        value: policy.requiresApproval ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: policy.requiresApproval ? 'warning' : 'success'
      },
      {
        label: this.i18n.t('excuse_policies.allow_partial_hour_excuses'),
        value: policy.allowPartialHourExcuses ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: policy.allowPartialHourExcuses ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('excuse_policies.minimum_excuse_duration'),
        value: `${policy.minimumExcuseDuration} ${this.i18n.t('fields.minutesUnit')}`
      },
      {
        label: this.i18n.t('excuse_policies.max_retroactive_days'),
        value: `${policy.maxRetroactiveDays} ${policy.maxRetroactiveDays === 1 ? this.i18n.t('fields.dayUnit') : this.i18n.t('fields.daysUnit')}`
      },
      {
        label: this.i18n.t('excuse_policies.allow_self_service_requests'),
        value: policy.allowSelfServiceRequests ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: policy.allowSelfServiceRequests ? 'success' : 'secondary'
      }
    ];
  }

  get auditFields(): DetailField[] {
    const policy = this.excusePolicy();
    if (!policy) return [];

    const fields: DetailField[] = [
      {
        label: this.i18n.t('fields.createdAt'),
        value: policy.createdAtUtc,
        type: 'datetime'
      },
      {
        label: this.i18n.t('fields.createdBy'),
        value: policy.createdBy
      }
    ];

    if (policy.modifiedAtUtc && policy.modifiedBy) {
      fields.push(
        {
          label: this.i18n.t('fields.modifiedAt'),
          value: policy.modifiedAtUtc,
          type: 'datetime'
        },
        {
          label: this.i18n.t('fields.modifiedBy'),
          value: policy.modifiedBy
        }
      );
    }

    return fields;
  }

  ngOnInit(): void {
    this.loadExcusePolicyDetails();
  }

  private loadExcusePolicyDetails(): void {
    const policyId = this.route.snapshot.paramMap.get('id');
    if (!policyId) {
      this.router.navigate(['/excuse-policies']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.excusePoliciesService.getExcusePolicyById(+policyId).subscribe({
      next: (policy) => {
        this.excusePolicy.set(policy);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load excuse policy details:', error);
        this.error.set(this.i18n.t('excuse_policies.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }


  async toggleStatus(): Promise<void> {
    if (!this.excusePolicy()) return;

    const policy = this.excusePolicy()!;
    const isActivating = !policy.isActive;

    const result = await this.confirmationService.confirm({
      title: isActivating
        ? this.i18n.t('excuse_policies.activate_policy')
        : this.i18n.t('excuse_policies.deactivate_policy'),
      message: isActivating
        ? this.i18n.t('excuse_policies.confirm_activate')
        : this.i18n.t('excuse_policies.confirm_deactivate'),
      confirmText: isActivating
        ? this.i18n.t('common.activate')
        : this.i18n.t('common.deactivate'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: isActivating ? 'btn-success' : 'btn-warning',
      icon: isActivating ? 'fa-check' : 'fa-pause',
      iconClass: isActivating ? 'text-success' : 'text-warning'
    });

    if (result.confirmed) {
      this.processing.set(true);

      this.excusePoliciesService.toggleExcusePolicyStatus(policy.id).subscribe({
        next: () => {
          this.notificationService.success(
            isActivating
              ? this.i18n.t('excuse_policies.success.activated')
              : this.i18n.t('excuse_policies.success.deactivated')
          );
          this.loadExcusePolicyDetails(); // Reload to show updated status
          this.processing.set(false);
        },
        error: (error) => {
          console.error('Failed to toggle excuse policy status:', error);
          this.notificationService.error(
            this.i18n.t('excuse_policies.errors.toggle_status_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  async deleteExcusePolicy(): Promise<void> {
    if (!this.excusePolicy()) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('excuse_policies.delete_policy'),
      message: this.i18n.t('excuse_policies.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.processing.set(true);

      this.excusePoliciesService.deleteExcusePolicy(this.excusePolicy()!.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('excuse_policies.success.deleted')
          );
          this.router.navigate(['/excuse-policies']);
        },
        error: (error) => {
          console.error('Failed to delete excuse policy:', error);
          this.notificationService.error(
            this.i18n.t('excuse_policies.errors.delete_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  // Permission checks
  canEdit(): boolean {
    return this.permissionService.has(`excuse-policy.${PermissionActions.UPDATE}`);
  }

  canToggleStatus(): boolean {
    return this.permissionService.has(`excuse-policy.${PermissionActions.UPDATE}`);
  }

  canDelete(): boolean {
    return this.permissionService.has(`excuse-policy.${PermissionActions.DELETE}`);
  }

  hasActiveActions(): boolean {
    return this.canEdit() || this.canToggleStatus() || this.canDelete();
  }

  getBranchName(): string {
    return this.excusePolicy()?.branchName || this.i18n.t('common.all_branches');
  }
}