import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeContractService } from '../../../core/services/employee-contract.service';
import { EmployeeContract, ContractStatus, ContractType, ProbationStatus } from '../../../shared/models/employee-contract.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-view-contract',
  standalone: true,
  imports: [
    CommonModule,
    FormHeaderComponent,
    SectionCardComponent,
    DefinitionListComponent,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    AuditHistoryComponent,
    FileUploadComponent
  ],
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.css']
})
export class ViewContractComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private contractService = inject(EmployeeContractService);

  loading = signal(true);
  processing = signal(false);
  item = signal<EmployeeContract | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      [ContractStatus.Draft]: { label: this.i18n.t('common.draft'), variant: 'secondary' },
      [ContractStatus.Active]: { label: this.i18n.t('common.active'), variant: 'success' },
      [ContractStatus.Expired]: { label: this.i18n.t('common.expired'), variant: 'warning' },
      [ContractStatus.Terminated]: { label: this.i18n.t('common.terminated'), variant: 'danger' },
      [ContractStatus.Renewed]: { label: this.i18n.t('employee_contracts.renewed'), variant: 'info' },
      [ContractStatus.Suspended]: { label: this.i18n.t('common.suspended'), variant: 'warning' }
    };
    return map[d.status] ?? { label: String(d.status), variant: 'secondary' as StatusVariant };
  });

  contractTypeLabel = computed(() => {
    const d = this.item();
    if (!d) return '';
    const map: Record<string, string> = {
      [ContractType.Permanent]: this.i18n.t('employee_contracts.type_permanent'),
      [ContractType.FixedTerm]: this.i18n.t('employee_contracts.type_fixed_term'),
      [ContractType.Probation]: this.i18n.t('employee_contracts.type_probation'),
      [ContractType.Internship]: this.i18n.t('employee_contracts.type_internship'),
      [ContractType.Consultancy]: this.i18n.t('employee_contracts.type_consultancy')
    };
    return map[d.contractType] ?? String(d.contractType);
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.employee'), value: d.employeeName },
      { label: this.i18n.t('employee_contracts.employee_number'), value: d.employeeNumber },
      { label: this.i18n.t('employee_contracts.contract_number'), value: d.contractNumber },
      { label: this.i18n.t('employee_contracts.contract_type'), value: this.contractTypeLabel() },
      { label: this.i18n.t('fields.branch'), value: d.branchName || '-' },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' }
    ];
  });

  contractDetailsItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.start_date'), value: d.startDate },
      { label: this.i18n.t('fields.end_date'), value: d.endDate || '-' },
      { label: this.i18n.t('employee_contracts.basic_salary'), value: `${d.basicSalary} ${d.currency}` },
      { label: this.i18n.t('employee_contracts.probation_period_days'), value: d.probationPeriodDays != null ? String(d.probationPeriodDays) : '-' },
      { label: this.i18n.t('employee_contracts.notice_period_days'), value: d.noticePeriodDays != null ? String(d.noticePeriodDays) : '-' },
      { label: this.i18n.t('employee_contracts.auto_renew'), value: d.autoRenew ? this.i18n.t('common.yes') : this.i18n.t('common.no') }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === ContractStatus.Draft) {
      actions.push({ label: this.i18n.t('employee_contracts.activate'), icon: 'fas fa-check-circle', action: () => this.activate(), type: 'success' });
    }
    if (d.status === ContractStatus.Active) {
      actions.push({ label: this.i18n.t('employee_contracts.terminate'), icon: 'fas fa-times-circle', action: () => this.terminate(), type: 'danger' });
      actions.push({ label: this.i18n.t('employee_contracts.renew'), icon: 'fas fa-redo', action: () => this.renew(), type: 'primary' });
    }
    if (d.status === ContractStatus.Expired) {
      actions.push({ label: this.i18n.t('employee_contracts.renew'), icon: 'fas fa-redo', action: () => this.renew(), type: 'primary' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/employee-contracts']);
      return;
    }
    this.loadContract(+id);
  }

  private loadContract(id: number): void {
    this.loading.set(true);
    this.contractService.getContractById(id).subscribe({
      next: (contract) => {
        this.item.set(contract);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('employee_contracts.load_error'));
        this.loading.set(false);
      }
    });
  }

  activate(): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_contracts.activate'),
      message: this.i18n.t('employee_contracts.activate_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.processing.set(true);
      this.contractService.activateContract(this.item()!.id).subscribe({
        next: (updated) => {
          this.item.set(updated);
          this.notification.success(this.i18n.t('employee_contracts.activated_successfully'));
          this.processing.set(false);
        },
        error: () => {
          this.notification.error(this.i18n.t('employee_contracts.activate_error'));
          this.processing.set(false);
        }
      });
    });
  }

  terminate(): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_contracts.terminate'),
      message: this.i18n.t('employee_contracts.terminate_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.processing.set(true);
      this.contractService.terminateContract(this.item()!.id).subscribe({
        next: (updated) => {
          this.item.set(updated);
          this.notification.success(this.i18n.t('employee_contracts.terminated_successfully'));
          this.processing.set(false);
        },
        error: () => {
          this.notification.error(this.i18n.t('employee_contracts.terminate_error'));
          this.processing.set(false);
        }
      });
    });
  }

  onDocumentUploaded(event: FileUploadedEvent): void {
    const current = this.item();
    if (current) {
      this.item.set({ ...current, documentUrl: event.fileUrl });
    }
    this.notification.success(this.i18n.t('files.upload'));
  }

  renew(): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_contracts.renew'),
      message: this.i18n.t('employee_contracts.renew_confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((result) => {
      if (!result.confirmed) return;
      this.processing.set(true);
      const newEndDate = new Date();
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
      this.contractService.renewContract(this.item()!.id, { newEndDate: newEndDate.toISOString().split('T')[0] }).subscribe({
        next: (updated) => {
          this.item.set(updated);
          this.notification.success(this.i18n.t('employee_contracts.renewed_successfully'));
          this.processing.set(false);
        },
        error: () => {
          this.notification.error(this.i18n.t('employee_contracts.renew_error'));
          this.processing.set(false);
        }
      });
    });
  }
}
