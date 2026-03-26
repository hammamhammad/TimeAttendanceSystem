import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

import { SearchFilterComponent, FilterField } from '../../../shared/components/search-filter/search-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { inject } from '@angular/core';
import { SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-branch-filters',
  standalone: true,
  imports: [SearchFilterComponent],
  template: `
    <app-search-filter
      [filterFields]="filterFields()"
      [showAddButton]="showAddButton"
      [addButtonText]="addButtonText"
      [searchPlaceholder]="i18n.t('branches.search_branches')"
      (search)="onSearch($event)"
      (filterChange)="onFilterChange($event)"
      (add)="onAdd()">
    </app-search-filter>
  `
})
export class BranchFiltersComponent {
  i18n = inject(I18nService);

  @Input() showAddButton = true;
  @Input() addButtonText = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() addBranch = new EventEmitter<void>();

  filterFields = signal<FilterField[]>([]);

  ngOnInit() {
    if (!this.addButtonText) {
      this.addButtonText = this.i18n.t('branches.add_branch');
    }
    this.setupFilterFields();
  }

  private setupFilterFields() {
    const statusOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      { value: 'true', label: this.i18n.t('common.active') },
      { value: 'false', label: this.i18n.t('common.inactive') }
    ];

    this.filterFields.set([
      {
        key: 'isActive',
        label: this.i18n.t('common.status'),
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
    this.addBranch.emit();
  }
}