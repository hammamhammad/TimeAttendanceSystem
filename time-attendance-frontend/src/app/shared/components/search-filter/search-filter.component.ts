import { Component, Input, Output, EventEmitter, signal, OnChanges, SimpleChanges } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SearchableSelectComponent, SearchableSelectOption } from '../searchable-select/searchable-select.component';

export interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'daterange' | 'boolean';
  options?: SearchableSelectOption[];
  placeholder?: string;
  required?: boolean;
  multiple?: boolean;
}

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [FormsModule, SearchableSelectComponent],
  template: `
    <div class="search-filter">
      <div class="row g-3">
        <!-- Search input -->
        @if (showSearch) {
          <div class="col-md-4">
            <div class="input-group">
              <span class="input-group-text">
                <i class="fas fa-search"></i>
              </span>
              <input type="text"
                class="form-control"
                [placeholder]="searchPlaceholder"
                [(ngModel)]="searchTerm"
                (ngModelChange)="onSearchChange()"
                (keyup.enter)="onSearch()">
            </div>
          </div>
        }
    
        <!-- Filter fields -->
        @for (field of filterFields; track field) {
          <div class="col-md-2">
            @switch (field.type) {
              <!-- Text input -->
              @case ('text') {
                <input
                  type="text"
                  class="form-control"
                  [placeholder]="field.placeholder || field.label"
                  [(ngModel)]="filterValues[field.key]"
                  (ngModelChange)="onFilterChange()">
              }
              <!-- Select dropdown -->
              @case ('select') {
                <app-searchable-select
                  [options]="field.options || []"
                  [placeholder]="field.placeholder || field.label"
                  [value]="filterValues[field.key] || ''"
                  (selectionChange)="onFilterFieldChange(field.key, $event)">
                </app-searchable-select>
              }
              <!-- Date input -->
              @case ('date') {
                <input
                  type="date"
                  class="form-control"
                  [(ngModel)]="filterValues[field.key]"
                  (ngModelChange)="onFilterChange()">
              }
              <!-- Boolean select -->
              @case ('boolean') {
                <select
                  class="form-select"
                  [(ngModel)]="filterValues[field.key]"
                  (ngModelChange)="onFilterChange()">
                  <option value="">{{ field.placeholder || 'All' }}</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              }
            }
          </div>
        }
    
        <!-- Action buttons -->
        <div class="col-md-auto">
          <div class="btn-group">
            <button type="button"
              class="btn btn-primary"
              (click)="onSearch()">
              <i class="fas fa-search me-1"></i>
              Search
            </button>
            <button type="button"
              class="btn btn-outline-secondary"
              [disabled]="!hasActiveFilters()"
              (click)="onClearFilters()">
              <i class="fas fa-times me-1"></i>
              Clear
            </button>
            @if (showRefreshButton) {
              <button type="button"
                class="btn btn-outline-info"
                [disabled]="refreshing"
                (click)="onRefresh()">
                <i class="fas"
                  [class.fa-sync-alt]="!refreshing"
                  [class.fa-spinner]="refreshing"
                  [class.fa-spin]="refreshing"
                [class.me-1]="true"></i>
                Refresh
              </button>
            }
          </div>
        </div>
    
        <!-- Additional action buttons -->
        <div class="col-md-auto ms-auto">
          <div class="btn-group">
            @if (showBulkButton) {
              <button type="button"
                class="btn btn-outline-primary"
                (click)="onBulkAction()">
                <i class="fas fa-users me-1"></i>
                {{ bulkButtonText }}
              </button>
            }
            @if (showAddButton) {
              <button type="button"
                class="btn btn-success"
                (click)="onAdd()">
                <i class="fas fa-plus me-1"></i>
                {{ addButtonText }}
              </button>
            }
          </div>
        </div>
      </div>
    
      <!-- Active filters display -->
      @if (hasActiveFilters()) {
        <div class="active-filters mt-3">
          <small class="text-muted me-2">Active filters:</small>
          @if (searchTerm) {
            <span class="badge bg-primary me-1">
              Search: {{ searchTerm }}
              <button type="button" class="btn-close btn-close-white ms-1" (click)="clearSearchTerm()"></button>
            </span>
          }
          @for (filter of getActiveFilterLabels(); track filter) {
            <span class="badge bg-primary me-1"
              [title]="filter.label + ': ' + filter.value">
              {{ filter.label }}: {{ filter.displayValue }}
              <button type="button" class="btn-close btn-close-white ms-1" (click)="clearFilter(filter.key)"></button>
            </span>
          }
        </div>
      }
    </div>
    `,
  styles: [`
    .search-filter {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 0.375rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .active-filters .badge {
      font-size: 0.75em;
    }

    .btn-close {
      font-size: 0.6em;
      padding: 0;
      margin-left: 0.25rem;
    }

    .input-group-text {
      background-color: #e9ecef;
      border-color: #ced4da;
    }
  `]
})
export class SearchFilterComponent implements OnChanges {
  @Input() showSearch = true;
  @Input() searchPlaceholder = 'Search...';
  @Input() filterFields: FilterField[] = [];
  @Input() currentFilters: any = {};
  @Input() showAddButton = false;
  @Input() addButtonText = 'Add New';
  @Input() showBulkButton = false;
  @Input() bulkButtonText = 'Bulk Action';
  @Input() showRefreshButton = true;
  @Input() refreshing = false;

  @Output() search = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() add = new EventEmitter<void>();
  @Output() bulkAction = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  searchTerm = '';
  filterValues: any = {};

  private searchTimeout: any;

  ngOnChanges(changes: SimpleChanges): void {
    // Update filterValues when currentFilters change from parent
    if (changes['currentFilters']) {
      const newFilters = changes['currentFilters'].currentValue || {};
      // Update filterValues with the new values
      this.filterValues = { ...newFilters };
      // Update searchTerm if provided
      if (newFilters.search) {
        this.searchTerm = newFilters.search;
      }
    }
  }

  onSearchChange(): void {
    // Debounce search
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.onSearch();
    }, 300);
  }

  onSearch(): void {
    this.search.emit(this.searchTerm);
    this.emitFilterChange();
  }

  onFilterChange(): void {
    this.emitFilterChange();
  }

  onFilterFieldChange(fieldKey: string, value: string): void {
    this.filterValues[fieldKey] = value;
    this.onFilterChange();
  }

  onClearFilters(): void {
    this.searchTerm = '';
    this.filterValues = {};
    this.emitFilterChange();
  }

  onAdd(): void {
    this.add.emit();
  }

  onBulkAction(): void {
    this.bulkAction.emit();
  }

  onRefresh(): void {
    // Clear all filters and search
    this.searchTerm = '';
    this.filterValues = {};

    // Emit refresh event for parent to handle data reload
    this.refresh.emit();

    // Also emit filter change to reset any active filters
    this.emitFilterChange();
  }

  clearSearchTerm(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  clearFilter(fieldKey: string): void {
    delete this.filterValues[fieldKey];
    this.onFilterChange();
  }

  hasActiveFilters(): boolean {
    return this.searchTerm.length > 0 || Object.keys(this.filterValues).some(key => this.filterValues[key]);
  }

  getActiveFilterLabels(): Array<{key: string, label: string, value: any, displayValue: string}> {
    const activeFilters: Array<{key: string, label: string, value: any, displayValue: string}> = [];

    for (const field of this.filterFields) {
      const value = this.filterValues[field.key];
      if (value !== undefined && value !== null && value !== '') {
        let displayValue = value;

        // For select fields, show the label instead of value
        if (field.type === 'select' && field.options) {
          const option = field.options.find(opt => opt.value === value);
          displayValue = option ? option.label : value;
        }

        // For boolean fields, show Yes/No
        if (field.type === 'boolean') {
          displayValue = value === 'true' ? 'Yes' : 'No';
        }

        activeFilters.push({
          key: field.key,
          label: field.label,
          value: value,
          displayValue: displayValue
        });
      }
    }

    return activeFilters;
  }

  private emitFilterChange(): void {
    const filters = {
      search: this.searchTerm || undefined,
      ...this.filterValues
    };

    // Remove empty values
    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null || filters[key] === undefined) {
        delete filters[key];
      }
    });

    this.filterChange.emit(filters);
  }
}