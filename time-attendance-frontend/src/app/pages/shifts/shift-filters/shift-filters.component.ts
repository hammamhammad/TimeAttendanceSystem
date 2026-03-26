import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';

import { SearchFilterComponent, FilterField } from '../../../shared/components/search-filter/search-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-shift-filters',
  standalone: true,
  imports: [SearchFilterComponent],
  template: `
    <app-search-filter
      [filterFields]="filterFields()"
      [showAddButton]="showAddButton"
      [addButtonText]="addButtonText"
      [searchPlaceholder]="i18n.t('shifts.searchPlaceholder')"
      [refreshing]="refreshing"
      (search)="onSearch($event)"
      (filterChange)="onFilterChange($event)"
      (add)="onAdd()"
      (refresh)="onRefresh()">
    </app-search-filter>
  `
})
export class ShiftFiltersComponent implements OnInit {
  readonly i18n = inject(I18nService);

  @Input() showAddButton = true;
  @Input() addButtonText = 'Create Shift';
  @Input() refreshing = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() addShift = new EventEmitter<void>();
  @Output() refreshData = new EventEmitter<void>();

  filterFields = signal<FilterField[]>([]);

  ngOnInit() {
    this.setupFilterFields();
  }

  private setupFilterFields() {
    const statusOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      { value: 'active', label: this.i18n.t('common.active') },
      { value: 'inactive', label: this.i18n.t('common.inactive') }
    ];

    const typeOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      { value: 'TimeBased', label: this.i18n.t('shifts.time_based') },
      { value: 'HoursOnly', label: this.i18n.t('shifts.hours_only') }
    ];

    this.filterFields.set([
      {
        key: 'status',
        label: this.i18n.t('common.status'),
        type: 'select',
        options: statusOptions
      },
      {
        key: 'shiftType',
        label: this.i18n.t('common.type'),
        type: 'select',
        options: typeOptions
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
    this.addShift.emit();
  }

  onRefresh() {
    this.refreshData.emit();
  }
}