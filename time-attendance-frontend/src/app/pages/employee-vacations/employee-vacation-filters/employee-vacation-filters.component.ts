import { Component, Input, Output, EventEmitter, signal, computed, inject, OnInit } from '@angular/core';

import { SearchFilterComponent, FilterField } from '../../../shared/components/search-filter/search-filter.component';
import { EmployeeVacationsService } from '../employee-vacations.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';

@Component({
  selector: 'app-employee-vacation-filters',
  standalone: true,
  imports: [SearchFilterComponent],
  template: `
    <app-search-filter
      [filterFields]="filterFields()"
      [showAddButton]="showAddButton"
      [addButtonText]="addButtonText"
      [showBulkButton]="showBulkButton()"
      [bulkButtonText]="'Bulk Assign'"
      [searchPlaceholder]="'Search by employee name...'"
      [refreshing]="refreshing"
      (search)="onSearch($event)"
      (filterChange)="onFilterChange($event)"
      (add)="onAdd()"
      (bulkAction)="onBulkAssign()"
      (refresh)="onRefresh()">
    </app-search-filter>
  `
})
export class EmployeeVacationFiltersComponent implements OnInit {
  private employeeVacationsService = inject(EmployeeVacationsService);
  private i18n = inject(I18nService);
  private permissionService = inject(PermissionService);

  @Input() showAddButton = true;
  @Input() addButtonText = 'Create Vacation';
  @Input() refreshing = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() addVacation = new EventEmitter<void>();
  @Output() bulkAssignVacation = new EventEmitter<void>();
  @Output() refreshData = new EventEmitter<void>();

  employees = signal<Array<{id: number, name: string}>>([]);
  vacationTypes = signal<Array<{id: number, name: string}>>([]);
  filterFields = signal<FilterField[]>([]);

  // Permission-based computed signal for bulk button visibility
  showBulkButton = computed(() => {
    return this.permissionService.has(`${PermissionResources.VACATION}.${PermissionActions.BULK_CREATE}`);
  });

  ngOnInit() {
    this.loadEmployees();
    this.loadVacationTypes();
    this.setupFilterFields();
  }

  private loadEmployees() {
    this.employeeVacationsService.getEmployees().subscribe({
      next: (employees) => {
        this.employees.set(employees);
        this.updateFilterFields();
      },
      error: (error) => {
        console.error('Failed to load employees:', error);
      }
    });
  }

  private loadVacationTypes() {
    this.employeeVacationsService.getVacationTypes().subscribe({
      next: (vacationTypes) => {
        this.vacationTypes.set(vacationTypes);
        this.updateFilterFields();
      },
      error: (error) => {
        console.error('Failed to load vacation types:', error);
      }
    });
  }

  private setupFilterFields() {
    this.updateFilterFields();
  }

  private updateFilterFields() {
    const employeeOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      ...this.employees().map(employee => ({
        value: employee.id.toString(),
        label: employee.name
      }))
    ];

    const vacationTypeOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      ...this.vacationTypes().map(type => ({
        value: type.id.toString(),
        label: type.name
      }))
    ];

    const statusOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      { value: 'true', label: this.i18n.t('common.approved') },
      { value: 'false', label: this.i18n.t('common.pending') }
    ];

    const activeStatusOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      { value: 'true', label: this.i18n.t('employee_vacations.currently_active') },
      { value: 'false', label: this.i18n.t('employee_vacations.not_active') }
    ];

    this.filterFields.set([
      {
        key: 'employeeId',
        label: 'Employee',
        type: 'select',
        options: employeeOptions
      },
      {
        key: 'vacationTypeId',
        label: 'Vacation Type',
        type: 'select',
        options: vacationTypeOptions
      },
      {
        key: 'isApproved',
        label: 'Status',
        type: 'select',
        options: statusOptions
      },
      {
        key: 'isCurrentlyActive',
        label: 'Currently Active',
        type: 'select',
        options: activeStatusOptions
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
    this.addVacation.emit();
  }

  onBulkAssign() {
    this.bulkAssignVacation.emit();
  }

  onRefresh() {
    this.refreshData.emit();
  }
}