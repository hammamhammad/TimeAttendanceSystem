import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent, FilterField } from '../../../shared/components/search-filter/search-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-shift-filters',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent],
  template: `
    <app-search-filter
      [filterFields]="filterFields()"
      [showAddButton]="showAddButton"
      [addButtonText]="addButtonText"
      [searchPlaceholder]="'Search shifts...'"
      [refreshing]="refreshing"
      (search)="onSearch($event)"
      (filterChange)="onFilterChange($event)"
      (add)="onAdd()"
      (refresh)="onRefresh()">
    </app-search-filter>
  `
})
export class ShiftFiltersComponent implements OnInit {
  private i18n = inject(I18nService);

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
      { value: 'TimeBased', label: 'Time Based' },
      { value: 'HoursOnly', label: 'Hours Only' }
    ];

    this.filterFields.set([
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: statusOptions
      },
      {
        key: 'shiftType',
        label: 'Type',
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