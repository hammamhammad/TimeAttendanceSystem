import { Component, Input, Output, EventEmitter, signal, inject, OnInit, computed } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { FILTER_CONFIGURATIONS } from '../../../core/configs/filter-configurations';

@Component({
  selector: 'app-unified-filter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-filter">
      <div class="row g-3 align-items-center">
        <!-- Search input -->
        <div class="col-12 col-md-4">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-search"></i>
            </span>
            <input
              type="text"
              class="form-control"
              [placeholder]="displaySearchPlaceholder()"
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange()"
              (keyup.enter)="onSearch()">
            @if (searchTerm()) {
              <button
                class="btn btn-outline-secondary"
                type="button"
                (click)="clearSearch()">
                <i class="fas fa-times"></i>
              </button>
            }
          </div>
        </div>

        <!-- Action buttons -->
        <div class="col-12 col-md-8 text-md-end text-center mt-2 mt-md-0">
          <div class="d-flex justify-content-md-end justify-content-center gap-2 flex-wrap">
            @if (showRefreshButton) {
              <button
                class="btn btn-outline-info"
                type="button"
                [disabled]="refreshing"
                (click)="onRefresh()">
                <i class="fas fa-sync-alt me-2" [class.fa-spin]="refreshing"></i>
                {{ displayRefreshButtonText() }}
              </button>
            }
            @if (showAddButton) {
              <button
                class="btn btn-success"
                type="button"
                (click)="onAdd()">
                <i class="fas fa-plus me-2"></i>
                {{ displayAddButtonText() }}
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-filter {
      margin-bottom: 1rem;
    }
  `]
})
export class UnifiedFilterComponent implements OnInit {
  readonly i18n = inject(I18nService);

  // Simple mode inputs
  @Input() searchPlaceholder?: string;
  @Input() showAddButton: boolean = true;  // Changed default to true
  @Input() addButtonText?: string;
  @Input() showRefreshButton: boolean = true;
  @Input() refreshButtonText?: string;
  @Input() refreshing: boolean = false;

  // Advanced mode inputs (for moduleName-based pages)
  @Input() moduleName?: string;

  // Outputs
  @Output() searchChange = new EventEmitter<string>();
  @Output() add = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();
  @Output() filtersChange = new EventEmitter<any>();

  searchTerm = signal('');
  private searchTimeout: any;

  // Computed properties for dynamic translation
  displaySearchPlaceholder = computed(() => {
    if (this.searchPlaceholder) {
      return this.searchPlaceholder;
    }
    if (this.moduleName && FILTER_CONFIGURATIONS[this.moduleName]) {
      return this.i18n.t(FILTER_CONFIGURATIONS[this.moduleName].searchPlaceholder);
    }
    return this.i18n.t('common.search');
  });

  displayAddButtonText = computed(() => {
    if (this.addButtonText) {
      return this.addButtonText;
    }
    if (this.moduleName && FILTER_CONFIGURATIONS[this.moduleName]) {
      return this.i18n.t(FILTER_CONFIGURATIONS[this.moduleName].addButtonText);
    }
    return this.i18n.t('common.create');
  });

  displayRefreshButtonText = computed(() => {
    if (this.refreshButtonText) {
      return this.refreshButtonText;
    }
    return this.i18n.t('common.refresh');
  });

  ngOnInit() {
    // Component initialization if needed
  }

  onSearchChange() {
    // Debounce search
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.onSearch();
    }, 300);
  }

  onSearch() {
    this.searchChange.emit(this.searchTerm());
  }

  clearSearch() {
    this.searchTerm.set('');
    this.onSearch();
  }

  onAdd() {
    this.add.emit();
  }

  onRefresh() {
    this.refresh.emit();
  }
}