import { Component, OnInit, signal, computed, inject, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { RemoteWorkPoliciesService } from '../../../../core/services/remote-work-policies.service';
import { RemoteWorkPolicy } from '../../../../core/models/remote-work-policy.model';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { RemoteWorkPolicyModalComponent } from '../remote-work-policy-modal/remote-work-policy-modal.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { UnifiedFilterComponent } from '../../../../shared/components/unified-filter/unified-filter.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-remote-work-policy-list',
  standalone: true,
  imports: [
    RemoteWorkPolicyModalComponent,
    DataTableComponent,
    PageHeaderComponent,
    StatusBadgeComponent,
    UnifiedFilterComponent,
    SectionCardComponent
],
  templateUrl: './remote-work-policy-list.component.html',
  styleUrls: ['./remote-work-policy-list.component.css']
})
export class RemoteWorkPolicyListComponent implements OnInit {
  private readonly service = inject(RemoteWorkPoliciesService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  readonly i18n = inject(I18nService);
  readonly permissionService = inject(PermissionService);

  @ViewChild(RemoteWorkPolicyModalComponent) policyModal!: RemoteWorkPolicyModalComponent;

  policies = signal<RemoteWorkPolicy[]>([]);
  loading = signal(false);

  // Table configuration
  tableColumns: TableColumn[] = [
    { key: 'branchName', label: this.i18n.t('remoteWork.policy.branch'), sortable: true, width: '20%' },
    { key: 'quotas', label: this.i18n.t('remoteWork.policy.quotas'), width: '25%' },
    { key: 'requiresManagerApproval', label: this.i18n.t('remoteWork.policy.managerApproval'), width: '20%' },
    { key: 'isActive', label: this.i18n.t('common.status'), width: '15%' }
  ];

  // Table actions configuration
  tableActions: TableAction[] = [
    {
      key: 'view',
      label: this.i18n.t('common.view'),
      icon: 'fa-eye',
      color: 'primary'
    },
    {
      key: 'activate',
      label: this.i18n.t('common.activate'),
      icon: 'fa-play',
      color: 'success',
      condition: (policy: RemoteWorkPolicy) => !policy.isActive && this.permissionService.has('remoteWork.policy.update')
    },
    {
      key: 'deactivate',
      label: this.i18n.t('common.deactivate'),
      icon: 'fa-pause',
      color: 'warning',
      condition: (policy: RemoteWorkPolicy) => policy.isActive && this.permissionService.has('remoteWork.policy.update')
    },
    {
      key: 'edit',
      label: this.i18n.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: () => this.permissionService.has('remoteWork.policy.update')
    },
    {
      key: 'delete',
      label: this.i18n.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: (policy: RemoteWorkPolicy) => !policy.isActive && this.permissionService.has('remoteWork.policy.delete')
    }
  ];

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: (policies) => {
        this.policies.set(policies);
        this.loading.set(false);
      },
      error: (error) => {
        this.notification.error(this.i18n.t('remoteWork.policy.loadError'));
        this.loading.set(false);
      }
    });
  }

  onView(policy: RemoteWorkPolicy): void {
    this.router.navigate(['/settings/remote-work-policy', policy.id, 'view']);
  }

  onEdit(policy: RemoteWorkPolicy): void {
    this.router.navigate(['/settings/remote-work-policy', policy.id, 'edit']);
  }

  onDelete(policy: RemoteWorkPolicy): void {
    this.confirmation.confirm({
      title: this.i18n.t('remoteWork.policy.deleteConfirm'),
      message: this.i18n.t('remoteWork.policy.deleteMessage'),
      confirmText: this.i18n.t('common.yes'),
      cancelText: this.i18n.t('common.no')
    }).then(result => {
      if (result.confirmed) {
        this.service.delete(policy.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('remoteWork.policy.success.deleted'));
            this.loadPolicies();
          },
          error: () => {
            this.notification.error(this.i18n.t('remoteWork.policy.errors.delete_failed'));
          }
        });
      }
    });
  }

  onActivate(policy: RemoteWorkPolicy): void {
    this.confirmation.confirm({
      title: this.i18n.t('remoteWork.policy.activate_policy'),
      message: this.i18n.t('remoteWork.policy.confirm_activate'),
      confirmText: this.i18n.t('common.activate'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'fa-play',
      iconClass: 'text-success'
    }).then(result => {
      if (result.confirmed) {
        this.service.toggleStatus(policy.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('remoteWork.policy.success.activated'));
            this.loadPolicies();
          },
          error: () => {
            this.notification.error(this.i18n.t('remoteWork.policy.errors.toggle_failed'));
          }
        });
      }
    });
  }

  onDeactivate(policy: RemoteWorkPolicy): void {
    this.confirmation.confirm({
      title: this.i18n.t('remoteWork.policy.deactivate_policy'),
      message: this.i18n.t('remoteWork.policy.confirm_deactivate'),
      confirmText: this.i18n.t('common.deactivate'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-warning',
      icon: 'fa-pause',
      iconClass: 'text-warning'
    }).then(result => {
      if (result.confirmed) {
        this.service.toggleStatus(policy.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('remoteWork.policy.success.deactivated'));
            this.loadPolicies();
          },
          error: () => {
            this.notification.error(this.i18n.t('remoteWork.policy.errors.toggle_failed'));
          }
        });
      }
    });
  }

  onCreate(): void {
    this.router.navigate(['/settings/remote-work-policy/create']);
  }

  onPolicyCreated(): void {
    this.loadPolicies();
  }

  onPolicyUpdated(): void {
    this.loadPolicies();
  }

  // Handle table action events
  onTableAction(event: { action: string; item: RemoteWorkPolicy }): void {
    switch (event.action) {
      case 'view':
        this.onView(event.item);
        break;
      case 'activate':
        this.onActivate(event.item);
        break;
      case 'deactivate':
        this.onDeactivate(event.item);
        break;
      case 'edit':
        this.onEdit(event.item);
        break;
      case 'delete':
        this.onDelete(event.item);
        break;
    }
  }

  // Format quotas for display
  formatQuotas(item: RemoteWorkPolicy): string {
    const quotas = [];
    if (item.maxDaysPerWeek) quotas.push(`${item.maxDaysPerWeek}/${this.i18n.t('common.week')}`);
    if (item.maxDaysPerMonth) quotas.push(`${item.maxDaysPerMonth}/${this.i18n.t('common.month')}`);
    if (item.maxDaysPerYear) quotas.push(`${item.maxDaysPerYear}/${this.i18n.t('common.year')}`);
    return quotas.length > 0 ? quotas.join(', ') : '-';
  }
}
