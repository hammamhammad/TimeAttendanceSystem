import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';

import { SearchFilterComponent, FilterField } from '../../../shared/components/search-filter/search-filter.component';
import { EmployeesService } from '../employees.service';
import { BranchDto, DepartmentDto, EmploymentStatus } from '../../../shared/models/employee.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-employee-filters',
  standalone: true,
  imports: [SearchFilterComponent],
  template: `
    <app-search-filter
      [filterFields]="filterFields()"
      [showAddButton]="showAddButton"
      [addButtonText]="addButtonText"
      [searchPlaceholder]="'Search employees...'"
      [refreshing]="refreshing"
      (search)="onSearch($event)"
      (filterChange)="onFilterChange($event)"
      (add)="onAdd()"
      (refresh)="onRefresh()">
    </app-search-filter>
  `
})
export class EmployeeFiltersComponent implements OnInit {
  private employeesService = inject(EmployeesService);
  private i18n = inject(I18nService);

  @Input() showAddButton = true;
  @Input() addButtonText = 'Add Employee';
  @Input() refreshing = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() addEmployee = new EventEmitter<void>();
  @Output() refreshData = new EventEmitter<void>();

  branches = signal<BranchDto[]>([]);
  departments = signal<DepartmentDto[]>([]);
  filterFields = signal<FilterField[]>([]);

  ngOnInit() {
    this.loadBranches();
    this.setupFilterFields();
  }

  private loadBranches() {
    this.employeesService.getBranches().subscribe({
      next: (result) => {
        this.branches.set(result.items);
        this.updateFilterFields();
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
      }
    });
  }

  private setupFilterFields() {
    this.updateFilterFields();
  }

  private updateFilterFields() {
    const branchOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      ...this.branches().map(branch => ({
        value: branch.id.toString(),
        label: branch.name
      }))
    ];

    const departmentOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      ...this.departments().map(dept => ({
        value: dept.id.toString(),
        label: dept.name
      }))
    ];

    const employmentStatusOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      { value: EmploymentStatus.FullTime.toString(), label: 'Full Time' },
      { value: EmploymentStatus.PartTime.toString(), label: 'Part Time' },
      { value: EmploymentStatus.Contract.toString(), label: 'Contract' },
      { value: EmploymentStatus.Intern.toString(), label: 'Intern' },
      { value: EmploymentStatus.Consultant.toString(), label: 'Consultant' },
      { value: EmploymentStatus.Terminated.toString(), label: 'Terminated' }
    ];

    const statusOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      { value: 'true', label: this.i18n.t('common.active') },
      { value: 'false', label: this.i18n.t('common.inactive') }
    ];

    this.filterFields.set([
      {
        key: 'branchId',
        label: 'Branch',
        type: 'select',
        options: branchOptions
      },
      {
        key: 'departmentId',
        label: 'Department',
        type: 'select',
        options: departmentOptions
      },
      {
        key: 'employmentStatus',
        label: 'Employment Status',
        type: 'select',
        options: employmentStatusOptions
      },
      {
        key: 'isActive',
        label: 'Status',
        type: 'select',
        options: statusOptions
      }
    ]);
  }

  onSearch(searchTerm: string) {
    this.searchChange.emit(searchTerm);
  }

  onFilterChange(filters: any) {
    // Load departments when branch changes
    if (filters.branchId) {
      const branchId = parseInt(filters.branchId);
      this.employeesService.getDepartments(branchId).subscribe({
        next: (departments) => {
          this.departments.set(departments);
          this.updateFilterFields();
        },
        error: (error) => {
          console.error('Failed to load departments:', error);
        }
      });
    } else {
      this.departments.set([]);
      this.updateFilterFields();
    }

    this.filtersChange.emit(filters);
  }

  onAdd() {
    this.addEmployee.emit();
  }

  onRefresh() {
    this.refreshData.emit();
  }
}