import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { AttendanceStatus, AttendanceReportType } from '../../../../shared/models/attendance.model';

export interface FilterOption {
  value: any;
  label: string;
  disabled?: boolean;
}

export interface FilterConfig {
  dateRange?: {
    enabled: boolean;
    startDate?: string;
    endDate?: string;
    presets?: Array<{
      label: string;
      value: string;
      days: number;
    }>;
  };
  employees?: {
    enabled: boolean;
    multiple: boolean;
    options: FilterOption[];
  };
  departments?: {
    enabled: boolean;
    multiple: boolean;
    options: FilterOption[];
  };
  branches?: {
    enabled: boolean;
    multiple: boolean;
    options: FilterOption[];
  };
  status?: {
    enabled: boolean;
    multiple: boolean;
    options: FilterOption[];
  };
  reportType?: {
    enabled: boolean;
    options: FilterOption[];
  };
  periodType?: {
    enabled: boolean;
    options: FilterOption[];
  };
  customFields?: Array<{
    key: string;
    label: string;
    type: 'text' | 'select' | 'multiselect' | 'checkbox' | 'number';
    options?: FilterOption[];
    placeholder?: string;
  }>;
}

export interface FilterValues {
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  employeeIds?: number[];
  departmentIds?: number[];
  branchIds?: number[];
  statusFilter?: AttendanceStatus[];
  reportType?: AttendanceReportType;
  [key: string]: any;
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {
  @Input() config!: FilterConfig;
  @Input() initialValues: FilterValues = {};
  @Input() collapsible = true;
  @Input() collapsed = false;
  @Input() showApplyButton = true;
  @Input() showClearButton = true;
  @Input() loading = false;

  @Output() filtersChanged = new EventEmitter<FilterValues>();
  @Output() filtersApplied = new EventEmitter<FilterValues>();
  @Output() filtersCleared = new EventEmitter<void>();

  filterForm!: FormGroup;
  isCollapsed = false;

  constructor(
    private fb: FormBuilder,
    public readonly i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.isCollapsed = this.collapsed;
    this.createFilterForm();
    this.setupFormSubscriptions();
  }

  private createFilterForm(): void {
    const formConfig: any = {};

    // Date range
    if (this.config.dateRange?.enabled) {
      const today = new Date().toISOString().split('T')[0];
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      formConfig['startDate'] = [
        this.initialValues.dateRange?.startDate || this.config.dateRange.startDate || thirtyDaysAgo
      ];
      formConfig['endDate'] = [
        this.initialValues.dateRange?.endDate || this.config.dateRange.endDate || today
      ];
    }

    // Employees
    if (this.config.employees?.enabled) {
      formConfig['employeeIds'] = [this.initialValues.employeeIds || []];
    }

    // Departments
    if (this.config.departments?.enabled) {
      formConfig['departmentIds'] = [this.initialValues.departmentIds || []];
    }

    // Branches
    if (this.config.branches?.enabled) {
      formConfig['branchIds'] = [this.initialValues.branchIds || []];
    }

    // Status
    if (this.config.status?.enabled) {
      formConfig['statusFilter'] = [this.initialValues.statusFilter || []];
    }

    // Report Type
    if (this.config.reportType?.enabled) {
      formConfig['reportType'] = [this.initialValues.reportType || null];
    }

    // Custom fields
    if (this.config.customFields) {
      this.config.customFields.forEach(field => {
        formConfig[field.key] = [this.initialValues[field.key] || this.getDefaultValue(field.type)];
      });
    }

    this.filterForm = this.fb.group(formConfig);
  }

  private getDefaultValue(type: string): any {
    switch (type) {
      case 'multiselect':
        return [];
      case 'checkbox':
        return false;
      case 'number':
        return null;
      default:
        return '';
    }
  }

  private setupFormSubscriptions(): void {
    this.filterForm.valueChanges.subscribe(values => {
      const filterValues = this.transformFormValues(values);
      this.filtersChanged.emit(filterValues);
    });
  }

  private transformFormValues(values: any): FilterValues {
    const result: FilterValues = {};

    if (this.config.dateRange?.enabled && values.startDate && values.endDate) {
      result.dateRange = {
        startDate: values.startDate,
        endDate: values.endDate
      };
    }

    if (this.config.employees?.enabled) {
      result.employeeIds = values.employeeIds;
    }

    if (this.config.departments?.enabled) {
      result.departmentIds = values.departmentIds;
    }

    if (this.config.branches?.enabled) {
      result.branchIds = values.branchIds;
    }

    if (this.config.status?.enabled) {
      result.statusFilter = values.statusFilter;
    }

    if (this.config.reportType?.enabled) {
      result.reportType = values.reportType;
    }

    // Custom fields
    if (this.config.customFields) {
      this.config.customFields.forEach(field => {
        result[field.key] = values[field.key];
      });
    }

    return result;
  }

  applyFilters(): void {
    const filterValues = this.transformFormValues(this.filterForm.value);
    this.filtersApplied.emit(filterValues);
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filtersCleared.emit();
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  applyDatePreset(preset: { label: string; value: string; days: number }): void {
    if (!this.config.dateRange?.enabled) return;

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (preset.days * 24 * 60 * 60 * 1000));

    this.filterForm.patchValue({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  }

  // Helper methods for template
  isMultipleSelection(fieldType: 'employees' | 'departments' | 'branches' | 'status'): boolean {
    return this.config[fieldType]?.multiple || false;
  }

  getFieldOptions(fieldType: 'employees' | 'departments' | 'branches' | 'status'): FilterOption[] {
    return this.config[fieldType]?.options || [];
  }

  getCustomFieldOptions(field: any): FilterOption[] {
    return field.options || [];
  }
}