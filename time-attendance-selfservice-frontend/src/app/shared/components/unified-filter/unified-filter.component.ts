import { Component, Input, Output, EventEmitter, signal, inject, OnInit, computed, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { FILTER_CONFIGURATIONS } from '../../../core/configs/filter-configurations';

@Component({
  selector: 'app-unified-filter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="grid-toolbar" [class.grid-toolbar--standalone]="!embedded">
      <div class="grid-toolbar-left">
        <div class="grid-search">
          <i class="fas fa-search"></i>
          <input
            type="text"
            [placeholder]="displaySearchPlaceholder()"
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearchChange()"
            (keyup.enter)="onSearch()">
        </div>
        @if (searchTerm()) {
          <button type="button"
                  class="grid-filter-btn"
                  (click)="clearSearch()"
                  [title]="i18n.t('common.clear')">
            <i class="fas fa-times"></i>
          </button>
        }
        @if (showFiltersButton) {
          <button type="button"
                  class="grid-filter-btn"
                  (click)="filters.emit()"
                  [title]="i18n.t('common.filters')">
            <i class="fas fa-filter"></i>
            {{ i18n.t('common.filters') }}
            @if (activeFilterCount > 0) {
              <span class="grid-filter-btn__count">{{ activeFilterCount }}</span>
            }
          </button>
        }
        @if (showColumnsButton) {
          <button type="button"
                  class="grid-filter-btn"
                  (click)="toggleColumnsPopover()"
                  #columnsBtn
                  [title]="i18n.t('common.columns')">
            <i class="fas fa-columns"></i>
            {{ i18n.t('common.columns') }}
          </button>
        }
      </div>

      <div class="grid-toolbar-right">
        @if (showRefreshButton) {
          <button type="button"
                  class="grid-filter-btn"
                  [disabled]="refreshing"
                  (click)="onRefresh()">
            <i class="fas fa-sync-alt" [class.fa-spin]="refreshing"></i>
            {{ displayRefreshButtonText() }}
          </button>
        }
        @if (showExportButton) {
          <button type="button"
                  class="grid-filter-btn"
                  (click)="export.emit()"
                  [title]="i18n.t('common.export')">
            <i class="fas fa-file-export"></i>
            {{ i18n.t('common.export') }}
          </button>
        }
        @if (showImportButton) {
          <button type="button"
                  class="grid-filter-btn"
                  (click)="importInput.click()"
                  [title]="i18n.t('common.import')">
            <i class="fas fa-file-import"></i>
            {{ i18n.t('common.import') }}
          </button>
          <input #importInput
                 type="file"
                 accept=".csv,.xlsx,.xls"
                 class="d-none"
                 (change)="onImportFile($event)" />
        }
        @if (showAddButton && !readOnly) {
          <button type="button"
                  class="btn btn-primary btn-sm"
                  (click)="onAdd()">
            <i class="fas fa-plus me-1"></i>
            {{ displayAddButtonText() }}
          </button>
        }
      </div>

      <!-- Columns visibility popover -->
      @if (showColumnsButton && columnsPopoverOpen() && columnDefs.length > 0) {
        <div class="grid-columns-popover"
             (click)="$event.stopPropagation()">
          <div class="grid-columns-popover__header">
            <i class="fas fa-columns"></i>
            <span>{{ i18n.t('common.columns') }}</span>
            <button type="button" class="grid-columns-popover__close" (click)="columnsPopoverOpen.set(false)">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="grid-columns-popover__list">
            @for (col of columnDefs; track col.key) {
              <label class="grid-columns-popover__item">
                <input type="checkbox"
                       [checked]="!hiddenColumns().includes(col.key)"
                       (change)="toggleColumn(col.key, $any($event.target).checked)">
                <span>{{ col.label }}</span>
              </label>
            }
          </div>
          <div class="grid-columns-popover__footer">
            <button type="button" class="btn btn-sm btn-link" (click)="resetColumns()">
              {{ i18n.t('common.reset') }}
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; position: relative; }
    .grid-toolbar--standalone {
      border: 1px solid var(--app-gray-200, #EAECF0);
      border-radius: var(--app-border-radius-lg, 12px) var(--app-border-radius-lg, 12px) 0 0;
      border-bottom: none;
    }
    .grid-columns-popover {
      position: absolute;
      top: calc(100% + 4px);
      left: 20px;
      width: 280px;
      background: #ffffff;
      border: 1px solid var(--app-gray-200, #EAECF0);
      border-radius: var(--app-border-radius-md, 8px);
      box-shadow: var(--app-shadow-lg);
      z-index: 60;
      overflow: hidden;
    }
    .grid-columns-popover__header {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 12px;
      background: var(--app-gray-50, #F9FAFB);
      border-bottom: 1px solid var(--app-gray-100, #F2F4F7);
      font-size: 13px;
      font-weight: 600;
      color: var(--app-gray-700, #344054);
    }
    .grid-columns-popover__header i { color: var(--app-primary-500); }
    .grid-columns-popover__close {
      margin-left: auto;
      background: transparent;
      border: none;
      color: var(--app-gray-400);
      cursor: pointer;
      font-size: 12px;
    }
    .grid-columns-popover__list {
      max-height: 260px;
      overflow-y: auto;
      padding: 6px 0;
    }
    .grid-columns-popover__item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      cursor: pointer;
      font-size: 13px;
      color: var(--app-gray-700);
      user-select: none;
    }
    .grid-columns-popover__item:hover { background: var(--app-gray-50); }
    .grid-columns-popover__item input[type="checkbox"] {
      accent-color: var(--app-primary-500);
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
    .grid-columns-popover__footer {
      display: flex;
      justify-content: flex-end;
      padding: 6px 10px;
      border-top: 1px solid var(--app-gray-100);
      background: var(--app-gray-25);
    }
    :host-context([dir="rtl"]) .grid-columns-popover { left: auto; right: 20px; }
  `]
})
export class UnifiedFilterComponent implements OnInit {
  readonly i18n = inject(I18nService);

  // Existing inputs
  @Input() searchPlaceholder?: string;
  @Input() showAddButton: boolean = true;
  @Input() addButtonText?: string;
  @Input() showRefreshButton: boolean = true;
  @Input() refreshButtonText?: string;
  @Input() refreshing: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() embedded: boolean = false;
  @Input() moduleName?: string;

  // NEW ERP toolbar inputs (all opt-in, default off)
  @Input() showFiltersButton: boolean = false;
  @Input() activeFilterCount: number = 0;
  @Input() showColumnsButton: boolean = false;
  @Input() showExportButton: boolean = false;
  @Input() showImportButton: boolean = false;

  /** Columns whose visibility can be toggled by the user. */
  @Input() columnDefs: { key: string; label: string }[] = [];
  /** Persistence key for hidden-columns localStorage (defaults to moduleName). */
  @Input() columnsStorageKey?: string;

  // Outputs
  @Output() searchChange = new EventEmitter<string>();
  @Output() add = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() filters = new EventEmitter<void>();
  @Output() export = new EventEmitter<void>();
  @Output() import = new EventEmitter<File>();
  @Output() hiddenColumnsChange = new EventEmitter<string[]>();

  searchTerm = signal('');
  columnsPopoverOpen = signal(false);
  hiddenColumns = signal<string[]>([]);

  private searchTimeout: any;

  displaySearchPlaceholder = computed(() => {
    if (this.searchPlaceholder) return this.searchPlaceholder;
    if (this.moduleName && FILTER_CONFIGURATIONS[this.moduleName]) {
      return this.i18n.t(FILTER_CONFIGURATIONS[this.moduleName].searchPlaceholder);
    }
    return this.i18n.t('common.search');
  });

  displayAddButtonText = computed(() => {
    if (this.addButtonText) return this.addButtonText;
    if (this.moduleName && FILTER_CONFIGURATIONS[this.moduleName]) {
      return this.i18n.t(FILTER_CONFIGURATIONS[this.moduleName].addButtonText);
    }
    return this.i18n.t('common.create');
  });

  displayRefreshButtonText = computed(() => {
    if (this.refreshButtonText) return this.refreshButtonText;
    return this.i18n.t('common.refresh');
  });

  ngOnInit() {
    const key = this.storageKey();
    if (key) {
      try {
        const raw = localStorage.getItem(`gridColsHidden:${key}`);
        if (raw) this.hiddenColumns.set(JSON.parse(raw));
      } catch {}
    }
    if (this.hiddenColumns().length > 0) {
      this.hiddenColumnsChange.emit(this.hiddenColumns());
    }
  }

  onSearchChange() {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.onSearch(), 300);
  }

  onSearch() { this.searchChange.emit(this.searchTerm()); }
  clearSearch() { this.searchTerm.set(''); this.onSearch(); }
  onAdd() { this.add.emit(); }
  onRefresh() { this.refresh.emit(); }

  toggleColumnsPopover() {
    this.columnsPopoverOpen.update(v => !v);
  }

  toggleColumn(key: string, visible: boolean) {
    const hidden = [...this.hiddenColumns()];
    const idx = hidden.indexOf(key);
    if (!visible && idx === -1) hidden.push(key);
    if (visible && idx !== -1) hidden.splice(idx, 1);
    this.hiddenColumns.set(hidden);
    this.persistHiddenColumns();
    this.hiddenColumnsChange.emit(hidden);
  }

  resetColumns() {
    this.hiddenColumns.set([]);
    this.persistHiddenColumns();
    this.hiddenColumnsChange.emit([]);
  }

  private storageKey(): string | null {
    return this.columnsStorageKey ?? this.moduleName ?? null;
  }

  private persistHiddenColumns() {
    const key = this.storageKey();
    if (!key) return;
    try {
      localStorage.setItem(`gridColsHidden:${key}`, JSON.stringify(this.hiddenColumns()));
    } catch {}
  }

  onImportFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.import.emit(file);
    input.value = '';
  }
}
