import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';

import { SearchFilterComponent, FilterField } from '../../../shared/components/search-filter/search-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';

export interface BranchDto {
  id: number;
  name: string;
}

@Component({
  selector: 'app-vacation-type-filters',
  standalone: true,
  imports: [SearchFilterComponent],
  template: `
    <app-search-filter
      [filterFields]="filterFields()"
      [showAddButton]="showAddButton"
      [addButtonText]="addButtonText"
      [searchPlaceholder]="'Search vacation types...'"
      [refreshing]="refreshing"
      (search)="onSearch($event)"
      (filterChange)="onFilterChange($event)"
      (add)="onAdd()"
      (refresh)="onRefresh()">
    </app-search-filter>
  `
})
export class VacationTypeFiltersComponent implements OnInit {
  private i18n = inject(I18nService);

  @Input() showAddButton = true;
  @Input() addButtonText = 'Add Vacation Type';
  @Input() refreshing = false;
  @Input() branches: BranchDto[] = [];

  @Output() searchChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() addVacationType = new EventEmitter<void>();
  @Output() refreshData = new EventEmitter<void>();

  filterFields = signal<FilterField[]>([]);

  ngOnInit() {
    this.setupFilterFields();
  }

  ngOnChanges() {
    this.setupFilterFields();
  }

  private setupFilterFields() {
    const branchOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      ...this.branches.map(branch => ({
        value: branch.id.toString(),
        label: branch.name
      }))
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
    this.filtersChange.emit(filters);
  }

  onAdd() {
    this.addVacationType.emit();
  }

  onRefresh() {
    this.refreshData.emit();
  }
}