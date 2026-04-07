import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { EmployeeContractService } from '../../core/services/employee-contract.service';
import {
  EmployeeContract,
  ContractStatus,
  ContractType,
  ContractQueryParams
} from '../../shared/models/employee-contract.model';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-employee-contracts',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    PageHeaderComponent,
    UnifiedFilterComponent
  ],
  templateUrl: './employee-contracts.component.html',
  styleUrls: ['./employee-contracts.component.css']
})
export class EmployeeContractsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(EmployeeContractService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  // State
  contracts = signal<EmployeeContract[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  // Computed display data
  displayData = computed(() => {
    return this.contracts().map(c => ({
      ...c,
      _statusDisplay: this.formatStatus(c.status),
      _contractTypeDisplay: this.formatContractType(c.contractType),
      _startDateDisplay: c.startDate ? new Date(c.startDate).toLocaleDateString() : '--',
      _endDateDisplay: c.endDate ? new Date(c.endDate).toLocaleDateString() : '--',
      _salaryDisplay: `${c.basicSalary.toLocaleString()} ${c.currency}`
    }));
  });

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('employee_contracts.employee'), sortable: true, width: '16%' },
    { key: 'contractNumber', label: this.i18n.t('employee_contracts.contract_number'), sortable: true, width: '12%' },
    { key: '_contractTypeDisplay', label: this.i18n.t('employee_contracts.contract_type'), sortable: true, width: '12%' },
    { key: '_statusDisplay', label: this.i18n.t('employee_contracts.status'), sortable: true, width: '10%', renderHtml: true },
    { key: '_startDateDisplay', label: this.i18n.t('employee_contracts.start_date'), sortable: true, width: '12%' },
    { key: '_endDateDisplay', label: this.i18n.t('employee_contracts.end_date'), sortable: true, width: '12%' },
    { key: '_salaryDisplay', label: this.i18n.t('employee_contracts.basic_salary'), sortable: true, width: '14%', align: 'right' }
  ];

  // Table actions
  tableActions: TableAction[] = [
    {
      key: 'view',
      label: this.i18n.t('common.view'),
      icon: 'fa-eye',
      color: 'primary'
    },
    {
      key: 'edit',
      label: this.i18n.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: (item: EmployeeContract) => item.status === ContractStatus.Draft
    },
    {
      key: 'activate',
      label: this.i18n.t('employee_contracts.activate'),
      icon: 'fa-check-circle',
      color: 'success',
      condition: (item: EmployeeContract) => item.status === ContractStatus.Draft
    },
    {
      key: 'terminate',
      label: this.i18n.t('employee_contracts.terminate'),
      icon: 'fa-times-circle',
      color: 'danger',
      condition: (item: EmployeeContract) => item.status === ContractStatus.Active
    },
    {
      key: 'renew',
      label: this.i18n.t('employee_contracts.renew'),
      icon: 'fa-redo',
      color: 'info',
      condition: (item: EmployeeContract) => item.status === ContractStatus.Active || item.status === ContractStatus.Expired
    }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    const params: ContractQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter
    };

    this.service.getContracts(params).subscribe({
      next: (result) => {
        this.contracts.set(result.items || []);
        this.totalCount.set(result.totalCount || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('employee_contracts.load_error'));
        this.loading.set(false);
      }
    });
  }

  onTableAction(event: { action: string; item: EmployeeContract }): void {
    const { action, item } = event;
    switch (action) {
      case 'view':
        this.router.navigate(['/employee-contracts', item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/employee-contracts', item.id, 'edit']);
        break;
      case 'activate':
        this.activateContract(item);
        break;
      case 'terminate':
        this.terminateContract(item);
        break;
      case 'renew':
        this.renewContract(item);
        break;
    }
  }

  activateContract(contract: EmployeeContract): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_contracts.activate_title'),
      message: this.i18n.t('employee_contracts.confirm_activate'),
      confirmText: this.i18n.t('employee_contracts.activate'),
      confirmButtonClass: 'btn-success'
    }).then(result => {
      if (result.confirmed) {
        this.service.activateContract(contract.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('employee_contracts.activate_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('employee_contracts.activate_error'))
        });
      }
    });
  }

  terminateContract(contract: EmployeeContract): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_contracts.terminate_title'),
      message: this.i18n.t('employee_contracts.confirm_terminate'),
      confirmText: this.i18n.t('employee_contracts.terminate'),
      confirmButtonClass: 'btn-danger',
      requireComments: true
    }).then(result => {
      if (result.confirmed) {
        this.service.terminateContract(contract.id, result.comments).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('employee_contracts.terminate_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('employee_contracts.terminate_error'))
        });
      }
    });
  }

  renewContract(contract: EmployeeContract): void {
    this.router.navigate(['/employee-contracts', contract.id, 'renew']);
  }

  navigateToCreate(): void {
    this.router.navigate(['/employee-contracts/create']);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadData();
  }

  onSearchChange(searchTerm: string): void {
    this.currentFilter = { ...this.currentFilter, searchTerm };
    this.currentPage.set(1);
    this.loadData();
  }

  onFiltersChange(filters: any): void {
    this.currentFilter = { ...filters };
    this.currentPage.set(1);
    this.loadData();
  }

  onRefreshData(): void {
    this.currentFilter = {};
    this.currentPage.set(1);
    this.loadData();
  }

  private formatStatus(status: ContractStatus): string {
    const statusMap: Record<string, { label: string; class: string }> = {
      [ContractStatus.Draft]: { label: this.i18n.t('employee_contracts.status_draft'), class: 'badge bg-secondary' },
      [ContractStatus.Active]: { label: this.i18n.t('employee_contracts.status_active'), class: 'badge bg-success' },
      [ContractStatus.Expired]: { label: this.i18n.t('employee_contracts.status_expired'), class: 'badge bg-warning text-dark' },
      [ContractStatus.Terminated]: { label: this.i18n.t('employee_contracts.status_terminated'), class: 'badge bg-danger' },
      [ContractStatus.Renewed]: { label: this.i18n.t('employee_contracts.status_renewed'), class: 'badge bg-info' },
      [ContractStatus.Suspended]: { label: this.i18n.t('employee_contracts.status_suspended'), class: 'badge bg-dark' }
    };
    const info = statusMap[status] || { label: String(status), class: 'badge bg-light text-dark' };
    return `<span class="${info.class}">${info.label}</span>`;
  }

  private formatContractType(type: ContractType): string {
    const typeMap: Record<string, string> = {
      [ContractType.Permanent]: this.i18n.t('employee_contracts.type_permanent'),
      [ContractType.FixedTerm]: this.i18n.t('employee_contracts.type_fixed_term'),
      [ContractType.Probation]: this.i18n.t('employee_contracts.type_probation'),
      [ContractType.Internship]: this.i18n.t('employee_contracts.type_internship'),
      [ContractType.Consultancy]: this.i18n.t('employee_contracts.type_consultancy')
    };
    return typeMap[type] || String(type);
  }
}
