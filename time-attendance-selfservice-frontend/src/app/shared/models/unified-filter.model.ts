import { SearchableSelectOption } from '../components/searchable-select/searchable-select.component';

export interface UnifiedFilterConfig {
  searchPlaceholder: string;
  addButtonText: string;
  addButtonPermission?: string;
  filters: FilterDefinition[];
}

export interface FilterDefinition {
  key: string;
  label: string;
  type: 'status' | 'branch' | 'department' | 'employee' | 'date' | 'dateRange' | 'custom' | 'shift' | 'vacationType' | 'role' | 'excusePolicy';
  statusEnum?: any;
  statusLabels?: { [key: string]: string };
  dependent?: string[];
  dependsOn?: string;
  options?: SearchableSelectOption[];
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
}

export interface FilterData {
  branches?: any[];
  departments?: any[];
  employees?: any[];
  shifts?: any[];
  vacationTypes?: any[];
  roles?: any[];
  excusePolicies?: any[];
  [key: string]: any;
}

export interface FilterState {
  [key: string]: any;
}

export interface ModuleFilterRegistry {
  [moduleName: string]: UnifiedFilterConfig;
}

export enum CommonFilterTypes {
  Branch = 'branch',
  Department = 'department',
  Employee = 'employee',
  Status = 'status',
  Date = 'date',
  DateRange = 'dateRange',
  Custom = 'custom',
  Shift = 'shift',
  VacationType = 'vacationType',
  Role = 'role',
  ExcusePolicy = 'excusePolicy'
}

export interface FilterChangeEvent {
  key: string;
  value: any;
  allFilters: FilterState;
}

export interface FilterLoadEvent {
  filterKey: string;
  dependentValue?: any;
  filters: FilterState;
}