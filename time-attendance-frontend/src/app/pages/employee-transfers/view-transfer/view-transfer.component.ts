import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeTransferService } from '../../../core/services/employee-transfer.service';
import { EmployeeTransfer, TransferStatus, TransferType } from '../../../shared/models/employee-transfer.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-transfer',
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
  templateUrl: './view-transfer.component.html',
  styleUrls: ['./view-transfer.component.css']
})
export class ViewTransferComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private transferService = inject(EmployeeTransferService);

  loading = signal(true);
  processing = signal(false);
  item = signal<EmployeeTransfer | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      [TransferStatus.Pending]: { label: this.i18n.t('common.pending'), variant: 'pending' },
      [TransferStatus.Approved]: { label: this.i18n.t('common.approved'), variant: 'approved' },
      [TransferStatus.Rejected]: { label: this.i18n.t('common.rejected'), variant: 'rejected' },
      [TransferStatus.InProgress]: { label: this.i18n.t('common.in_progress'), variant: 'processing' },
      [TransferStatus.Completed]: { label: this.i18n.t('common.completed'), variant: 'success' },
      [TransferStatus.Cancelled]: { label: this.i18n.t('common.cancelled'), variant: 'cancelled' }
    };
    return map[d.status] ?? { label: String(d.status), variant: 'secondary' as StatusVariant };
  });

  transferTypeLabel = computed(() => {
    const d = this.item();
    if (!d) return '';
    const map: Record<string, string> = {
      [TransferType.BranchTransfer]: this.i18n.t('employee_transfers.type_branch_transfer'),
      [TransferType.DepartmentTransfer]: this.i18n.t('employee_transfers.type_department_transfer'),
      [TransferType.BranchAndDepartment]: this.i18n.t('employee_transfers.type_branch_and_department'),
      [TransferType.Relocation]: this.i18n.t('employee_transfers.type_relocation')
    };
    return map[d.transferType] ?? String(d.transferType);
  });

  employeeInfoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.employee'), value: d.employeeName },
      { label: this.i18n.t('employee_transfers.employee_number'), value: d.employeeNumber },
      { label: this.i18n.t('employee_transfers.transfer_type'), value: this.transferTypeLabel() },
      { label: this.i18n.t('fields.effective_date'), value: d.effectiveDate },
      { label: this.i18n.t('fields.reason'), value: d.reason || '-' }
    ];
  });

  fromItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.branch'), value: d.fromBranchName },
      { label: this.i18n.t('fields.department'), value: d.fromDepartmentName },
      { label: this.i18n.t('employee_transfers.job_title'), value: d.fromJobTitle || '-' }
    ];
  });

  toItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.branch'), value: d.toBranchName },
      { label: this.i18n.t('fields.department'), value: d.toDepartmentName },
      { label: this.i18n.t('employee_transfers.job_title'), value: d.toJobTitle || '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === TransferStatus.Pending) {
      actions.push({ label: this.i18n.t('common.approve'), icon: 'fas fa-check', action: () => this.approve(), type: 'success' });
      actions.push({ label: this.i18n.t('common.reject'), icon: 'fas fa-times', action: () => this.reject(), type: 'danger' });
    }
    if (d.status === TransferStatus.Approved) {
      actions.push({ label: this.i18n.t('employee_transfers.complete'), icon: 'fas fa-check-double', action: () => this.complete(), type: 'primary' });
    }
    if (d.status === TransferStatus.Pending || d.status === TransferStatus.Approved) {
      actions.push({ label: this.i18n.t('common.cancel'), icon: 'fas fa-ban', action: () => this.cancel(), type: 'secondary' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/employee-transfers']);
      return;
    }
    this.loadTransfer(+id);
  }

  private loadTransfer(id: number): void {
    this.loading.set(true);
    this.transferService.getTransferById(id).subscribe({
      next: (transfer) => {
        this.item.set(transfer);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('employee_transfers.load_error'));
        this.loading.set(false);
      }
    });
  }

  private performAction(actionFn: () => any, successKey: string, errorKey: string): void {
    this.processing.set(true);
    actionFn().subscribe({
      next: (updated: EmployeeTransfer) => {
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
      message: this.i18n.t('employee_transfers.approve_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.transferService.approveTransfer(this.item()!.id),
        'employee_transfers.approved_successfully',
        'employee_transfers.approve_error'
      );
    });
  }

  reject(): void {
    this.confirmation.confirm({
      title: this.i18n.t('common.reject'),
      message: this.i18n.t('employee_transfers.reject_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.transferService.rejectTransfer(this.item()!.id, this.i18n.t('common.rejected')),
        'employee_transfers.rejected_successfully',
        'employee_transfers.reject_error'
      );
    });
  }

  complete(): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_transfers.complete'),
      message: this.i18n.t('employee_transfers.complete_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.transferService.completeTransfer(this.item()!.id),
        'employee_transfers.completed_successfully',
        'employee_transfers.complete_error'
      );
    });
  }

  cancel(): void {
    this.confirmation.confirm({
      title: this.i18n.t('common.cancel'),
      message: this.i18n.t('employee_transfers.cancel_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.close')
    }).then((result) => {
      if (!result.confirmed) return;
      this.performAction(
        () => this.transferService.cancelTransfer(this.item()!.id),
        'employee_transfers.cancelled_successfully',
        'employee_transfers.cancel_error'
      );
    });
  }
}
