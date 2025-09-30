import { Component, Input, Output, EventEmitter, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent, FilterField } from '../../../shared/components/search-filter/search-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { ExcuseStatus } from '../../../shared/models/employee-excuse.model';
import { DepartmentsService } from '../../departments/departments.service';
import { BranchesService } from '../../branches/branches.service';
import { DepartmentDto } from '../../../shared/models/employee.model';
import { Branch } from '../../../shared/models/branch.model';

@Component({
  selector: 'app-employee-excuse-filters',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent],
  template: `
    <app-search-filter
      [filterFields]="filterFields()"
      [showAddButton]="showAddButton"
      [addButtonText]="addButtonText"
      [searchPlaceholder]="'Search by employee name, number, or reason...'"
      [refreshing]="refreshing || loading()"
      (search)="onSearch($event)"
      (filterChange)="onFilterChange($event)"
      (add)="onAdd()"
      (refresh)="onRefresh()">
    </app-search-filter>
  `
})
export class EmployeeExcuseFiltersComponent implements OnInit {
  private i18n = inject(I18nService);
  private departmentsService = inject(DepartmentsService);
  private branchesService = inject(BranchesService);

  @Input() showAddButton = true;
  @Input() addButtonText = 'Create Excuse';
  @Input() refreshing = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() addExcuse = new EventEmitter<void>();
  @Output() refreshData = new EventEmitter<void>();

  filterFields = signal<FilterField[]>([]);
  departments = signal<DepartmentDto[]>([]);
  branches = signal<Branch[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadFilterData();
  }

  private loadFilterData() {
    this.loading.set(true);

    // Load departments
    this.departmentsService.getDepartments({}).subscribe({
      next: (departments) => {
        this.departments.set(departments);
        this.checkAndSetupFields();
      },
      error: (error) => {
        console.error('Failed to load departments:', error);
        this.departments.set([]);
        this.checkAndSetupFields();
      }
    });

    // Load branches
    this.branchesService.getBranches(1, 1000).subscribe({
      next: (result) => {
        this.branches.set(result.items);
        this.checkAndSetupFields();
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
        this.branches.set([]);
        this.checkAndSetupFields();
      }
    });
  }

  private checkAndSetupFields() {
    // Only setup fields when both departments and branches are loaded (or failed to load)
    if (this.departments() !== null && this.branches() !== null) {
      this.setupFilterFields();
      this.loading.set(false);
    }
  }

  private setupFilterFields() {
    const statusOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      { value: ExcuseStatus.Pending, label: this.i18n.t('employee_excuses.status_pending') },
      { value: ExcuseStatus.Approved, label: this.i18n.t('employee_excuses.status_approved') },
      { value: ExcuseStatus.Rejected, label: this.i18n.t('employee_excuses.status_rejected') }
    ];

    // Build department options from loaded data
    const departmentOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      ...this.departments().map(dept => ({
        value: dept.id.toString(),
        label: dept.name,
        subLabel: dept.nameAr
      }))
    ];

    // Build branch options from loaded data
    const branchOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      ...this.branches().map(branch => ({
        value: branch.id.toString(),
        label: branch.name,
        subLabel: branch.code
      }))
    ];

    this.filterFields.set([
      {
        key: 'status',
        label: this.i18n.t('employee_excuses.status'),
        type: 'select',
        options: statusOptions
      },
      {
        key: 'departmentId',
        label: this.i18n.t('employees.department'),
        type: 'select',
        options: departmentOptions
      },
      {
        key: 'branchId',
        label: this.i18n.t('employees.branch'),
        type: 'select',
        options: branchOptions
      }
    ]);
  }

  onSearch(searchTerm: string) {
    this.searchChange.emit(searchTerm);
  }

  onFilterChange(filters: any) {
    this.filtersChange.emit(filters);
  }

  onAdd() {
    this.addExcuse.emit();
  }

  onRefresh() {
    this.refreshData.emit();
  }
}