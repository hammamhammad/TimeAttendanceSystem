import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent, FilterField } from '../../../shared/components/search-filter/search-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { inject } from '@angular/core';
import { SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';

interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-user-filters',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent],
  template: `
    <app-search-filter
      [filterFields]="filterFields()"
      [showAddButton]="showAddButton"
      [addButtonText]="addButtonText"
      [searchPlaceholder]="'Search users...'"
      [refreshing]="refreshing"
      (search)="onSearch($event)"
      (filterChange)="onFilterChange($event)"
      (add)="onAdd()"
      (refresh)="onRefresh()">
    </app-search-filter>
  `
})
export class UserFiltersComponent {
  private i18n = inject(I18nService);

  @Input() showAddButton = true;
  @Input() addButtonText = 'Add User';
  @Input() availableRoles = signal<Role[]>([]);
  @Input() refreshing = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() addUser = new EventEmitter<void>();
  @Output() refreshData = new EventEmitter<void>();

  filterFields = signal<FilterField[]>([]);

  ngOnInit() {
    this.setupFilterFields();
  }

  ngOnChanges() {
    this.setupFilterFields();
  }

  private setupFilterFields() {
    const roleOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      ...this.availableRoles().map(role => ({
        value: role.id.toString(),
        label: role.name
      }))
    ];

    const statusOptions: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') },
      { value: 'true', label: this.i18n.t('common.active') },
      { value: 'false', label: this.i18n.t('common.inactive') }
    ];

    this.filterFields.set([
      {
        key: 'roleId',
        label: 'Role',
        type: 'select',
        options: roleOptions
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
    this.addUser.emit();
  }

  onRefresh() {
    this.refreshData.emit();
  }
}