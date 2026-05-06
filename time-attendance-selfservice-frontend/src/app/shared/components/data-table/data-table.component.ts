import { Component, Input, Output, EventEmitter, signal, computed, TemplateRef, ContentChild, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { FilterPopoverComponent } from '../filter-popover/filter-popover.component';
import { FilterChipsBarComponent } from '../filter-chips-bar/filter-chips-bar.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { ColumnType, FilterDescriptor, FILTER_EMPTY_SENTINEL } from '../../utils/filter-engine/types';
import { applyFilters } from '../../utils/filter-engine/predicates';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  hideOnMobile?: boolean;
  priority?: 'high' | 'medium' | 'low';
  mobileLabel?: string;
  renderHtml?: boolean;
  /** ERP cell type — applies cell-code / cell-money / cell-date / cell-link styling automatically. */
  type?: 'text' | 'code' | 'money' | 'date' | 'link' | 'status' | 'boolean';
  /** Optional currency prefix for type='money' (defaults to no prefix). */
  currencySymbol?: string;
  /** Per-column filter toggle. Defaults to true when the table's filterable=true. */
  filterable?: boolean;
  /** Override inferred filter type (12 types per spec §15). */
  filterType?: ColumnType;
  /** Options for enum/select/reference filter widgets. */
  filterOptions?: { label: string; value: any }[];
  /** Real field name on the row object used for filtering + sorting when the
   *  display `key` doesn't exist on the DTO (e.g. a custom cellTemplate maps
   *  `key='status'` to `row.isActive`). Also used to auto-extract distinct values. */
  filterField?: string;
  /** Display label for null/empty values in this column (e.g. "Root Department"
   *  for a parent-department column where root rows render as a synthetic badge).
   *  When set and the data has any null/empty rows, the filter list shows this
   *  as a clickable option that maps to `isEmpty`/`isNotEmpty` operators. */
  emptyValueLabel?: string;
}

export interface TableAction {
  key: string;
  label: string;
  icon?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  condition?: (item: any) => boolean;
}

export interface BulkAction {
  key: string;
  label: string;
  icon?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  requiresConfirmation?: boolean;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, EmptyStateComponent, FilterPopoverComponent, FilterChipsBarComponent],
  template: `
    <div [class]="variant === 'subgrid' ? 'subgrid-body' : 'grid-container'">
      <!-- Table-level toolbar — kebab menu for row actions on the selected row.
           Sits at the top of the table, near the parent page's Add button. -->
      @if (actions.length > 0 && variant !== 'subgrid') {
        <div class="grid-row-toolbar" (click)="$event.stopPropagation()">
          <span class="grid-row-toolbar__hint">
            @if (selectedItems().length === 0) {
              {{ i18n.t('common.select_row_for_actions') }}
            } @else if (selectedItems().length === 1) {
              {{ i18n.t('common.one_row_selected') }}
            } @else {
              {{ selectedItems().length }} {{ i18n.t('common.rows_selected') }}
            }
          </span>
          <button
            type="button"
            class="grid-row-toolbar__kebab"
            [disabled]="selectedItems().length !== 1"
            [title]="i18n.t('common.actions')"
            (click)="toggleRowMenu($event)">
            <i class="fas fa-ellipsis-v"></i>
          </button>
          @if (rowMenuOpen()) {
            <div class="row-actions-menu row-actions-menu--toolbar" (click)="$event.stopPropagation()">
              @for (action of getAvailableActions(selectedItems()[0]); track action.key) {
                <button
                  type="button"
                  class="row-actions-menu__item"
                  [class.row-actions-menu__item--danger]="action.color === 'danger'"
                  (click)="onAction(action.key, selectedItems()[0]); rowMenuOpen.set(false)">
                  @if (action.icon) {
                    <i [class]="'fas ' + action.icon + ' row-actions-menu__icon'"></i>
                  }
                  <span>{{ action.label }}</span>
                </button>
              }
            </div>
          }
        </div>
      }

      <!-- Filter chips bar (above table when filters active) -->
      @if (filterable && activeFilters().length > 0 && variant !== 'subgrid') {
        <app-filter-chips-bar
          [filters]="activeFilters()"
          (remove)="removeFilter($event)"
          (clearAll)="clearAllFilters()">
        </app-filter-chips-bar>
      }

      <!-- Loading State -->
      @if (isLoading()) {
        <app-loading-spinner></app-loading-spinner>
      }
    
      <!-- Mobile Card View -->
      @if (!isLoading() && (responsiveMode === 'cards' || responsiveMode === 'auto')) {
        <div class="mobile-cards d-block d-md-none">
          @for (item of getDisplayedData(); track trackByFn($index, item)) {
            <div class="mobile-card">
              <!-- Selection -->
              @if (allowSelection) {
                <div class="mobile-card-selection">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      [checked]="isSelected(item)"
                      (change)="toggleSelection(item, $event)"
                      />
                  </div>
                </div>
              }
              <!-- Card Content -->
              <div class="mobile-card-content">
                <!-- Custom template if provided -->
                @if (cardTemplate) {
                  <ng-container
                    [ngTemplateOutlet]="cardTemplate"
                    [ngTemplateOutletContext]="{ $implicit: item, actions: getAvailableActions(item) }">
                  </ng-container>
                }
                <!-- Default card layout -->
                @if (!cardTemplate) {
                  <div class="default-card-layout">
                    @for (column of getVisibleColumns(); track column.key) {
                      <div class="mobile-field">
                        <span class="mobile-label">{{ column.mobileLabel || column.label }}:</span>
                        <span class="mobile-value">
                          <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column }">
                          </ng-container>
                          @if (!cellTemplate && !column.renderHtml) {
                            <span>{{ getNestedValue(item, column.key) }}</span>
                          }
                          @if (!cellTemplate && column.renderHtml) {
                            <span [innerHTML]="getNestedValue(item, column.key)"></span>
                          }
                        </span>
                      </div>
                    }
                  </div>
                }
              </div>
              <!-- Actions -->
              @if (actions.length > 0) {
                <div class="mobile-card-actions">
                  <div class="btn-group btn-group-sm">
                    @for (action of getAvailableActions(item); track action.key) {
                      <button
                        class="btn"
                        [class]="'btn-outline-' + (action.color || 'primary')"
                        [title]="action.label"
                        (click)="onAction(action.key, item)">
                        @if (action.icon) {
                          <i [class]="'fas ' + action.icon"></i>
                        }
                        @if (!action.icon) {
                          <span>{{ action.label }}</span>
                        }
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          }
          <!-- Empty state for mobile -->
          @if (data.length === 0) {
            <app-empty-state
              [icon]="'fa-inbox'"
              [title]="emptyTitle || 'No Data'"
              [message]="emptyMessage || 'No data available'">
            </app-empty-state>
          }
        </div>
      }
    
      <!-- Desktop Table View -->
      <div class="table-container" [class.d-none]="isMobileView() && (responsiveMode === 'cards' || responsiveMode === 'auto')" [class.d-md-block]="responsiveMode === 'cards' || responsiveMode === 'auto'">
        <div class="table-responsive" [class.overflow-auto]="responsiveMode === 'horizontal-scroll'">
          <table class="data-grid" [class.sticky-header]="stickyHeader && variant !== 'subgrid'">
            <thead>
              <tr>
                <!-- Selection column -->
                @if (allowSelection) {
                  <th style="width: 40px;">
                    <input
                      type="checkbox"
                      class="row-checkbox"
                      [checked]="allSelected()"
                      [indeterminate]="someSelected()"
                      (change)="toggleSelectAll($event)"
                      />
                  </th>
                }

                <!-- Data columns -->
                @for (column of getVisibleColumns(); track column.key) {
                  <th
                    [style.width]="column.width"
                    [class.sortable]="column.sortable"
                    [class.sorted]="column.sortable && getSortColumn() === column.key"
                    [class.text-center]="column.align === 'center'"
                    [class.text-end]="column.align === 'right'"
                    [class.d-none]="column.hideOnMobile && isMobileView()"
                    [class.d-md-table-cell]="column.hideOnMobile"
                    [attr.data-priority]="column.priority || null">
                    <span (click)="column.sortable && onSort(column)"
                          [style.cursor]="column.sortable ? 'pointer' : 'default'">
                      {{ column.label }}
                      @if (column.sortable) {
                        <i class="fas sort-icon"
                           [class.fa-sort]="getSortColumn() !== column.key"
                           [class.fa-sort-up]="getSortColumn() === column.key && getSortDirection() === 'asc'"
                           [class.fa-sort-down]="getSortColumn() === column.key && getSortDirection() === 'desc'"></i>
                      }
                    </span>
                    @if (filterable && isColumnFilterable(column)) {
                      <i class="fas fa-filter grid-funnel-icon"
                         [class.grid-funnel-icon--active]="hasActiveFilter(column.key)"
                         (click)="openFilterPopover(column, $event)"
                         [title]="i18n.t('common.filter')"></i>
                    }
                  </th>
                }

                <!-- Actions column removed — actions are invoked via the
                     table-level kebab menu in the page toolbar. -->
              </tr>
            </thead>
            <tbody>
              @for (item of getDisplayedData(); track trackByFn($index, item)) {
                <tr
                  [class.selected]="isSelected(item)"
                  [class.inactive-row]="!isActiveItem(item)"
                  [class.row-clickable]="hasOpenAction(item)"
                  (dblclick)="onRowDoubleClick(item, $event)">
                  <!-- Selection cell -->
                  @if (allowSelection) {
                    <td style="width: 40px;">
                      <input
                        type="checkbox"
                        class="row-checkbox"
                        [checked]="isSelected(item)"
                        (change)="toggleSelection(item, $event); $event.stopPropagation()"
                        />
                    </td>
                  }
                  <!-- Data cells -->
                  @for (column of getVisibleColumns(); track column.key) {
                    <td
                      [class]="getCellClass(column)"
                      [class.text-center]="column.align === 'center'"
                      [class.text-end]="column.align === 'right'"
                      [class.d-none]="column.hideOnMobile && isMobileView()"
                      [class.d-md-table-cell]="column.hideOnMobile"
                      [attr.data-priority]="column.priority || null">
                      <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column }">
                      </ng-container>
                      @if (!cellTemplate && !column.renderHtml) {
                        <span>{{ getNestedValue(item, column.key) }}</span>
                      }
                      @if (!cellTemplate && column.renderHtml) {
                        <span [innerHTML]="getNestedValue(item, column.key)"></span>
                      }
                    </td>
                  }
                  <!-- Actions cell removed — per-row actions are now invoked
                       via the table-level kebab menu rendered above the table. -->
                </tr>
              }

              <!-- Empty state -->
              @if (data.length === 0) {
                <tr>
                  <td [attr.colspan]="getTotalColumns()" class="p-0">
                    <app-empty-state
                      [icon]="'fa-inbox'"
                      [title]="emptyTitle || 'No Data'"
                      [message]="emptyMessage || 'No data available'">
                    </app-empty-state>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Floating filter popover -->
        @if (filterPopover(); as pop) {
          <app-filter-popover
            [field]="pop.column.key"
            [fieldLabel]="pop.column.label"
            [columnType]="resolveColumnType(pop.column)"
            [options]="pop.options"
            [initial]="findFilter(pop.column.key)"
            [top]="pop.top"
            [left]="pop.left"
            (apply)="onApplyFilter($event)"
            (clear)="onClearFilter(pop.column.key)"
            (close)="filterPopover.set(null)">
          </app-filter-popover>
        }

        <!-- Selection pill (ERP spec §7B) -->
        @if (allowSelection && selectedItems().length > 0 && variant !== 'subgrid') {
          <div class="grid-selection-pill">
            <i class="fas fa-check-circle"></i>
            <span>{{ selectedItems().length }} {{ i18n.t('common.selected') }}</span>
            <button type="button" (click)="clearSelection()">{{ i18n.t('common.clear') }}</button>
            @if (bulkActions.length > 0) {
              <div class="ms-auto d-flex gap-2">
                @for (action of bulkActions; track action.key) {
                  <button type="button"
                          class="btn btn-sm"
                          [class]="'btn-' + (action.color || 'secondary')"
                          (click)="onBulkAction(action.key)">
                    @if (action.icon) { <i [class]="'fas ' + action.icon + ' me-1'"></i> }
                    {{ action.label }}
                  </button>
                }
              </div>
            }
          </div>
        }
    
        <!-- ERP Pagination Strip -->
        @if (showPagination && getTotalPagesValue() > 1 && variant !== 'subgrid') {
          <div class="grid-pagination">
            <div class="d-flex align-items-center" style="gap: 12px;">
              <span>
                {{ i18n.t('common.showing') }}
                {{ getDisplayStart() }}-{{ getDisplayEnd() }}
                {{ i18n.t('common.of') }}
                {{ getTotalItemsValue() }}
              </span>
              <select
                class="form-select form-select-sm"
                style="width: auto; font-size: 13px; padding: 4px 24px 4px 8px;"
                (change)="onPageSizeChange(+$any($event.target).value)">
                @for (size of pageSizeOptions; track size) {
                  <option [value]="size" [selected]="size === getPageSizeValue()">{{ size }} / {{ i18n.t('common.page_size') }}</option>
                }
              </select>
            </div>

            <div class="pagination-pages">
              <button type="button"
                      (click)="onPageChange(getCurrentPage() - 1)"
                      [disabled]="getCurrentPage() === 1"
                      [title]="i18n.t('common.previous')">
                <i class="fas fa-chevron-left" style="font-size: 10px;"></i>
              </button>
              @for (page of getPageNumbers(); track $index) {
                @if (page === -1) {
                  <span class="pagination-ellipsis">&hellip;</span>
                } @else {
                  <button type="button"
                          [class.active]="page === getCurrentPage()"
                          (click)="onPageChange(page)">
                    {{ page }}
                  </button>
                }
              }
              <button type="button"
                      (click)="onPageChange(getCurrentPage() + 1)"
                      [disabled]="getCurrentPage() === getTotalPagesValue()"
                      [title]="i18n.t('common.next')">
                <i class="fas fa-chevron-right" style="font-size: 10px;"></i>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
    `,
  styles: [`
    /* The main .grid-container, .data-grid, .cell-*, .grid-pagination rules
       live in global components.css. Keep only responsive + mobile-card-specific
       styling here. */

    .table-container { min-height: 400px; overflow: visible; }
    /* Horizontal scroll inside the rounded grid-container when the table's
       declared column widths legitimately exceed the viewport. Vertical
       overflow stays visible so floating popovers (filter, etc) aren't clipped. */
    .table-responsive { overflow-x: auto; overflow-y: visible; }

    /* Keep the warning-tint for rows flagged inactive */
    table.data-grid tbody tr.inactive-row { background-color: var(--app-warning-50, #FFFBEB); }
    table.data-grid tbody tr.inactive-row:hover { background-color: #ffeaa7; }

    /* Double-clickable rows show the pointer cursor on hover */
    table.data-grid tbody tr.row-clickable { cursor: pointer; user-select: none; }

    /* Table-level kebab menu in the top toolbar */
    .grid-row-toolbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      padding: 10px 16px;
      border-bottom: 1px solid var(--app-gray-100, #F2F4F7);
      background: var(--app-gray-25, #FCFCFD);
      position: relative;
    }
    .grid-row-toolbar__hint {
      font-size: 12px;
      color: var(--app-gray-500, #667085);
    }
    .grid-row-toolbar__kebab {
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border: 1px solid var(--app-gray-200, #EAECF0);
      border-radius: var(--app-border-radius-sm, 6px);
      color: var(--app-gray-600, #475467);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .grid-row-toolbar__kebab:hover:not(:disabled) {
      background: var(--app-primary-50, #EEF2FF);
      border-color: var(--app-primary-200, #C7D2FE);
      color: var(--app-primary-600, #3B49C9);
    }
    .grid-row-toolbar__kebab:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .row-actions-menu {
      position: absolute;
      right: 8px;
      top: 100%;
      z-index: 1050;
      min-width: 160px;
      background: #fff;
      border: 1px solid var(--app-gray-200, #EAECF0);
      border-radius: var(--app-border-radius-md, 8px);
      box-shadow: var(--app-shadow-lg, 0 8px 16px rgba(16, 24, 40, 0.12));
      padding: 4px 0;
      text-align: left;
    }
    :root[dir="rtl"] .row-actions-menu { right: auto; left: 8px; text-align: right; }
    .row-actions-menu--toolbar {
      top: calc(100% - 4px);
    }
    .row-actions-menu__item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 12px;
      background: transparent;
      border: none;
      font-size: 13px;
      color: var(--app-gray-700, #344054);
      cursor: pointer;
      transition: background-color 0.1s ease;
    }
    .row-actions-menu__item:hover {
      background: var(--app-gray-50, #F9FAFB);
    }
    .row-actions-menu__item--danger {
      color: var(--app-danger, #EF4444);
    }
    .row-actions-menu__item--danger:hover {
      background: var(--app-danger-50, #FEF2F2);
    }
    .row-actions-menu__icon {
      width: 14px;
      font-size: 12px;
      text-align: center;
    }

    /* Per-column filter funnel icon */
    .grid-funnel-icon {
      font-size: 10px;
      color: var(--app-gray-300, #D0D5DD);
      margin-left: 6px;
      cursor: pointer;
      transition: color 0.15s ease;
    }
    .grid-funnel-icon:hover { color: var(--app-gray-500, #667085); }
    .grid-funnel-icon--active { color: var(--app-primary-500, #4F6BF6); }
    :root[dir="rtl"] .grid-funnel-icon { margin-left: 0; margin-right: 6px; }

    /* Mobile Cards */
    .mobile-cards {
      padding: 1rem;
    }

    .mobile-card {
      background: white;
      border: 1px solid var(--app-gray-200, #EAECF0);
      border-radius: 8px;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .mobile-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    .mobile-card.selected {
      border-color: var(--app-primary, #4F6BF6);
      background-color: var(--app-primary-50, #EEF2FF);
    }

    .mobile-card-selection {
      padding: 0.75rem 1rem 0;
      border-bottom: 1px solid var(--app-gray-50, #F9FAFB);
    }

    .mobile-card-content {
      padding: 1rem;
    }

    .default-card-layout .mobile-field {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 0.5rem;
      padding: 0.25rem 0;
      border-bottom: 1px solid var(--app-gray-50, #F9FAFB);
    }

    .default-card-layout .mobile-field:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .mobile-label {
      font-weight: 600;
      color: var(--app-gray-700, #344054);
      flex: 0 0 40%;
      font-size: 0.875rem;
    }

    .mobile-value {
      flex: 1;
      text-align: right;
      font-size: 0.875rem;
      word-break: break-word;
    }

    .mobile-card-actions {
      padding: 0.75rem 1rem;
      background-color: var(--app-gray-50, #F9FAFB);
      border-top: 1px solid var(--app-gray-200, #EAECF0);
    }

    .mobile-card-actions .btn-group {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .mobile-card-actions .btn {
      flex: 1;
      min-width: auto;
    }

    .mobile-empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--app-gray-500, #667085);
    }

    .mobile-empty-state i {
      color: #adb5bd;
    }

    /* Responsive — hide priority columns on narrower viewports.
       Tables across the system have priority calibrated assuming most users
       are on 1280-1920px laptops; we hide low at <1280, medium at <1024. */
    @media (max-width: 1280px) {
      table.data-grid th[data-priority="low"],
      table.data-grid td[data-priority="low"] { display: none !important; }
    }

    @media (max-width: 1024px) {
      table.data-grid th[data-priority="medium"],
      table.data-grid td[data-priority="medium"] { display: none !important; }
    }

    @media (max-width: 576px) {
      .table-container { min-height: 300px; }
      table.data-grid thead th { font-size: 11px; padding: 8px 10px; }
      table.data-grid tbody td { padding: 8px 10px; font-size: 12px; }
      .mobile-cards { padding: 0.5rem; }
      .mobile-card { margin-bottom: 0.75rem; }
      .mobile-label { flex: 0 0 35%; font-size: 0.8rem; }
      .mobile-value { font-size: 0.8rem; }
      .mobile-card-actions .btn { font-size: 0.75rem; padding: 0.375rem 0.5rem; }
    }

    @media print {
      .grid-pagination,
      .cell-actions { display: none !important; }
      table.data-grid { font-size: 0.8rem; }
      table.data-grid tbody tr.selected {
        background-color: transparent !important;
      }
    }
  `]
})
export class DataTableComponent {
  i18n = inject(I18nService);
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading: any = false;
  /** Selection is ON by default — every list page gets checkboxes + pill.
   *  Pass `[allowSelection]="false"` to opt out (e.g. nested data-table in a modal). */
  @Input() allowSelection = true;
  @Input() showPagination = true;
  /** Unique page key used to persist hidden columns in localStorage. */
  @Input() pageKey?: string;
  @Input() emptyMessage = 'No data available';
  @Input() emptyTitle = 'No Data';
  @Input() responsiveMode: 'cards' | 'horizontal-scroll' | 'auto' = 'auto';
  @Input() cardTemplate?: TemplateRef<any>;
  @Input() searchable = false;
  @Input() sortable = false;
  @Input() exportable = false;
  @Input() paginated = false;
  /** 'grid' → full ERP grid (toolbar-ready wrapper); 'subgrid' → compact detail-page variant. */
  @Input() variant: 'grid' | 'subgrid' = 'grid';
  /** Sticky header for long scrollable grids. Default true for 'grid', always false for 'subgrid'. */
  @Input() stickyHeader = true;
  /** Column keys to hide (from ColumnsPicker popover, persisted per page). */
  @Input() hiddenColumnKeys: string[] = [];
  /** Per-column filter funnel + chip bar + client-side filtering (ON by default — opt out per-page). */
  @Input() filterable = true;

  // Pagination
  @Input() currentPage: any = 1;
  @Input() totalPages: any = 1;
  @Input() totalItems: any = 0;
  @Input() pageSize: any = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  // Sorting
  @Input() sortColumn: any = '';
  @Input() sortDirection: any = 'asc';

  // Custom template outlets
  @ContentChild('cellTemplate') cellTemplate!: TemplateRef<any>;

  @Input() bulkActions: BulkAction[] = [];

  @Output() actionClick = new EventEmitter<{action: string, item: any}>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() bulkActionClick = new EventEmitter<{action: string, items: any[]}>();
  @Output() sortChange = new EventEmitter<SortEvent>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  /** Emits when a row is double-clicked. Pages can subscribe to navigate to
   *  the row's detail/edit page. The data-table also auto-triggers the row's
   *  'edit' action (if defined) so most list pages get this behavior for free. */
  @Output() rowDoubleClick = new EventEmitter<any>();
  @Output() filtersChange = new EventEmitter<FilterDescriptor[]>();

  /** Index of the last-clicked row for shift-click range selection. */
  private lastClickedIndex: number | null = null;

  /** Active filters (managed in-memory; emits `filtersChange`). */
  activeFilters = signal<FilterDescriptor[]>([]);
  /** State for the floating filter popover. */
  filterPopover = signal<{ column: TableColumn; top: number; left: number; options: { label: string; value: any }[] } | null>(null);
  /** Cache of auto-extracted distinct values per column, invalidated when the data reference changes. */
  private autoOptionsCache = new Map<string, { label: string; value: any }[]>();
  private autoOptionsCacheDataRef: any[] | null = null;

  selectedItems = signal<any[]>([]);
  allSelected = signal(false);
  someSelected = signal(false);

  /** Whether the table-level kebab menu is open. */
  rowMenuOpen = signal<boolean>(false);

  toggleRowMenu(event: Event): void {
    event.stopPropagation();
    this.rowMenuOpen.update(v => !v);
  }

  /** Close any open kebab menu when the user clicks outside the data-table. */
  @HostListener('document:click')
  onDocClick(): void {
    if (this.rowMenuOpen()) {
      this.rowMenuOpen.set(false);
    }
  }

  /** Close on Escape key for keyboard accessibility. */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.rowMenuOpen()) {
      this.rowMenuOpen.set(false);
    }
  }

  // Helper to get loading value whether it's a signal or boolean
  isLoading(): boolean {
    return typeof this.loading === 'function' ? this.loading() : this.loading;
  }

  // Helper to get currentPage value
  getCurrentPage(): number {
    return typeof this.currentPage === 'function' ? this.currentPage() : this.currentPage;
  }

  // Helper to get totalPages value
  getTotalPagesValue(): number {
    if (this.paginated) {
      const pageSize = this.getPageSizeValue();
      return Math.ceil(this.data.length / pageSize);
    }
    return typeof this.totalPages === 'function' ? this.totalPages() : this.totalPages;
  }

  // Helper to get totalItems value
  getTotalItemsValue(): number {
    if (this.paginated) {
      return this.data.length;
    }
    return typeof this.totalItems === 'function' ? this.totalItems() : this.totalItems;
  }

  // Helper to get pageSize value
  getPageSizeValue(): number {
    return typeof this.pageSize === 'function' ? this.pageSize() : this.pageSize;
  }

  // Helper to get sortColumn value
  getSortColumn(): string {
    return typeof this.sortColumn === 'function' ? this.sortColumn() : this.sortColumn;
  }

  // Helper to get sortDirection value
  getSortDirection(): 'asc' | 'desc' {
    return typeof this.sortDirection === 'function' ? this.sortDirection() : this.sortDirection;
  }

  // Get displayed data (paginated or full) — applies active filters first when filterable=true
  getDisplayedData(): any[] {
    let rows = this.data;
    if (this.filterable && this.activeFilters().length > 0) {
      rows = applyFilters(rows, this.activeFilters());
    }
    if (this.paginated) {
      const pageSize = this.getPageSizeValue();
      const currentPage = this.getCurrentPage();
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return rows.slice(startIndex, endIndex);
    }
    return rows;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getTotalColumns(): number {
    let count = this.columns.length;
    if (this.allowSelection) count++;
    return count;
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  /** ERP cell-type class for the <td>.
   *  Uses explicit column.type when set; otherwise auto-detects from the
   *  column key (unambiguous naming patterns only). */
  getCellClass(column: TableColumn): string {
    const explicit = column.type;
    if (explicit) {
      switch (explicit) {
        case 'code': return 'cell-code';
        case 'money': return 'cell-money';
        case 'date': return 'cell-date';
        case 'link': return 'cell-link';
        default: return '';
      }
    }
    const key = (column.key || '').toLowerCase();
    if (!key) return '';

    // Dates — covers hireDate, closeDate, createdAt, createdAtUtc, *On, dob, *_at, *_on
    if (
      key === 'dob' ||
      key.endsWith('date') ||
      key.endsWith('atutc') ||
      key.endsWith('onutc') ||
      key.endsWith('_at') ||
      key.endsWith('_on') ||
      key === 'createdat' || key === 'updatedat' || key === 'modifiedat' ||
      key === 'createdon' || key === 'updatedon' || key === 'modifiedon' ||
      key === 'created'   || key === 'updated'   || key === 'modified'
    ) {
      return 'cell-date';
    }

    // Codes — code, *Code, number, *Number, employeeNumber, reference, sku, barcode
    if (
      key === 'code' ||
      key === 'number' ||
      key === 'reference' ||
      key === 'sku' ||
      key === 'barcode' ||
      key === 'uuid' ||
      key === 'empno' ||
      key === 'employeeno' ||
      key === 'employeenumber' ||
      key.endsWith('code') ||
      key.endsWith('number') ||
      key.endsWith('reference')
    ) {
      return 'cell-code';
    }

    // Money — salary, amount, price, revenue, balance, total/subtotal, tax, etc.
    if (/(amount|salary|price|revenue|balance|total|subtotal|tax|netpay|grosspay|basicpay|allowance|deduction|fee|cost|credit|debit)/.test(key)) {
      return 'cell-money';
    }

    return '';
  }

  getAvailableActions(item: any): TableAction[] {
    // System-wide: 'view' actions are removed — view/edit are unified into a
    // single edit form that becomes read-only when the user lacks edit permission.
    return this.actions
      .filter(action => action.key !== 'view')
      .filter(action => !action.condition || action.condition(item));
  }

  /** True when this row has an `edit` (or `view`-aliased) action available,
   *  meaning a double-click can usefully open the record. Drives the
   *  `cursor: pointer` hint on the row. */
  hasOpenAction(item: any): boolean {
    const actions = this.getAvailableActions(item);
    return actions.some(a => a.key === 'edit' || a.key === 'view');
  }

  /** Double-click on a row → emit rowDoubleClick AND auto-trigger the row's
   *  `edit` action if it has one. Skip when the click originated on an
   *  interactive element (checkbox, kebab button) so users selecting rows
   *  don't accidentally open them. */
  onRowDoubleClick(item: any, event: Event): void {
    const target = event.target as HTMLElement;
    if (target.closest('input, button, a, .row-actions-menu, .grid-row-toolbar')) {
      return;
    }
    this.rowDoubleClick.emit(item);
    const editAction = this.getAvailableActions(item).find(a => a.key === 'edit');
    if (editAction) {
      this.actionClick.emit({ action: editAction.key, item });
    }
  }

  isSelected(item: any): boolean {
    return this.selectedItems().some(selected => selected.id === item.id);
  }

  toggleSelection(item: any, event: Event): void {
    const evt = event as MouseEvent;
    const checked = (event.target as HTMLInputElement).checked;
    const displayed = this.getDisplayedData();
    const index = displayed.findIndex(r => r.id === item.id);

    // Shift-click range selection — toggle all rows between last click and this one
    if (evt.shiftKey && this.lastClickedIndex !== null && index !== -1) {
      const [from, to] = [this.lastClickedIndex, index].sort((a, b) => a - b);
      const range = displayed.slice(from, to + 1);
      const current = this.selectedItems();
      const currentIds = new Set(current.map(r => r.id));
      const nextItems = [...current];
      for (const r of range) {
        if (checked && !currentIds.has(r.id)) nextItems.push(r);
        if (!checked && currentIds.has(r.id)) {
          const idx = nextItems.findIndex(s => s.id === r.id);
          if (idx !== -1) nextItems.splice(idx, 1);
        }
      }
      this.selectedItems.set(nextItems);
    } else {
      const selected = this.selectedItems();
      if (checked) {
        if (!selected.some(s => s.id === item.id)) {
          this.selectedItems.set([...selected, item]);
        }
      } else {
        this.selectedItems.set(selected.filter(s => s.id !== item.id));
      }
    }

    this.lastClickedIndex = index;
    this.updateSelectionState();
    this.selectionChange.emit(this.selectedItems());
  }

  clearSelection(): void {
    this.selectedItems.set([]);
    this.lastClickedIndex = null;
    this.updateSelectionState();
    this.selectionChange.emit(this.selectedItems());
  }

  onBulkAction(key: string): void {
    this.bulkActionClick.emit({ action: key, items: this.selectedItems() });
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedItems.set([...this.data]);
    } else {
      this.selectedItems.set([]);
    }

    this.updateSelectionState();
    this.selectionChange.emit(this.selectedItems());
  }

  private updateSelectionState(): void {
    const selected = this.selectedItems().length;
    const total = this.data.length;

    this.allSelected.set(selected === total && total > 0);
    this.someSelected.set(selected > 0 && selected < total);
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    let direction: 'asc' | 'desc' = 'asc';

    if (this.getSortColumn() === column.key) {
      direction = this.getSortDirection() === 'asc' ? 'desc' : 'asc';
    }

    if (typeof this.sortColumn === 'function') {
      (this.sortColumn as any).set(column.key);
    } else {
      this.sortColumn = column.key;
    }

    if (typeof this.sortDirection === 'function') {
      (this.sortDirection as any).set(direction);
    } else {
      this.sortDirection = direction;
    }

    this.sortChange.emit({ column: column.key, direction });
  }

  onAction(actionKey: string, item: any): void {
    this.actionClick.emit({ action: actionKey, item });
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onPageSizeChange(size: number): void {
    if (typeof this.pageSize === 'function') {
      (this.pageSize as any).set(size);
    } else {
      this.pageSize = size;
    }

    if (typeof this.currentPage === 'function') {
      (this.currentPage as any).set(1);
    } else {
      this.currentPage = 1;
    }

    this.pageSizeChange.emit(size);
  }

  isActiveItem(item: any): boolean {
    return item.isActive !== false;
  }

  getDisplayStart(): number {
    return (this.getCurrentPage() - 1) * this.getPageSizeValue() + 1;
  }

  getDisplayEnd(): number {
    return Math.min(this.getCurrentPage() * this.getPageSizeValue(), this.getTotalItemsValue());
  }

  getPageNumbers(): number[] {
    const total = this.getTotalPagesValue();
    const current = this.getCurrentPage();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, -1, total);
      } else if (current >= total - 3) {
        pages.push(1, -1, total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, -1, current - 1, current, current + 1, -1, total);
      }
    }

    return pages;
  }

  getVisibleColumns(): TableColumn[] {
    let cols = this.columns;
    // Apply user-hidden columns from ColumnsPicker
    if (this.hiddenColumnKeys?.length > 0) {
      const hidden = new Set(this.hiddenColumnKeys);
      cols = cols.filter(c => !hidden.has(c.key));
    }
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      cols = cols.filter(col => !col.hideOnMobile);
    }
    return cols;
  }

  getColumnPriority(column: TableColumn): number {
    switch (column.priority) {
      case 'high': return 1;
      case 'medium': return 2;
      case 'low': return 3;
      default: return 2;
    }
  }

  isMobileView(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }

  // --- Filter helpers ---
  isColumnFilterable(column: TableColumn): boolean {
    return column.filterable !== false;
  }

  hasActiveFilter(key: string): boolean {
    const column = this.columns.find(c => c.key === key);
    const field = column ? this.resolveFilterField(column) : key;
    return this.activeFilters().some(f => f.field === field);
  }

  findFilter(key: string): FilterDescriptor | undefined {
    const column = this.columns.find(c => c.key === key);
    const field = column ? this.resolveFilterField(column) : key;
    return this.activeFilters().find(f => f.field === field);
  }

  openFilterPopover(column: TableColumn, event: MouseEvent): void {
    event.stopPropagation();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const options = this.buildFilterOptions(column);
    this.filterPopover.set({
      column,
      options,
      top: rect.bottom + 4,
      left: Math.max(8, Math.min(rect.left - 10, window.innerWidth - 340))
    });
  }

  /** Returns the actual data-field path for a column — `filterField` wins,
   *  else column.key, with common UI-key → data-key fallbacks. */
  private resolveFilterField(column: TableColumn): string {
    if (column.filterField) return column.filterField;
    if (!this.data.length) return column.key;
    const first = this.data[0];
    if (first && Object.prototype.hasOwnProperty.call(first, column.key)) return column.key;
    // Common aliases when the UI key doesn't exist on the DTO
    const aliases: Record<string, string[]> = {
      status: ['isActive', 'employmentStatus', 'state'],
      employmentstatus: ['employmentStatus', 'status'],
      department: ['departmentName', 'department'],
      branch: ['branchName', 'branch'],
      location: ['workLocationType', 'locationType', 'location'],
      manager: ['managerName', 'managerFullName', 'manager'],
      shift: ['currentShiftName', 'shiftName', 'shift'],
      employee: ['fullName', 'name', 'firstName'],
      name: ['fullName', 'firstName'],
      code: ['employeeNumber', 'code'],
      employeecode: ['employeeNumber', 'code'],
      // Timestamp aliases
      created: ['createdAtUtc', 'createdAt', 'created'],
      updated: ['modifiedAtUtc', 'updatedAtUtc', 'updatedAt', 'modifiedAt', 'updated'],
      modified: ['modifiedAtUtc', 'updatedAtUtc', 'modifiedAt', 'updatedAt'],
      createdat: ['createdAtUtc', 'createdAt'],
      updatedat: ['modifiedAtUtc', 'updatedAtUtc', 'updatedAt', 'modifiedAt']
    };
    const key = column.key.toLowerCase();
    for (const alias of aliases[key] ?? []) {
      if (Object.prototype.hasOwnProperty.call(first, alias)) return alias;
    }
    return column.key;
  }

  /** Page-provided options take priority. Otherwise, we derive distinct values
   *  from `this.data` for any filterable column that isn't number/date/email/phone.
   *  The popover then decides to render a list widget (equals/isAnyOf operators)
   *  or a text widget (contains/startsWith/etc) based on the operator + cardinality. */
  private buildFilterOptions(column: TableColumn): { label: string; value: any }[] {
    if (column.filterOptions && column.filterOptions.length > 0) return column.filterOptions;
    const type = this.resolveColumnType(column);
    // Types that have their own dedicated widget — don't extract distinct values.
    if (type === 'number' || type === 'money' || type === 'percentage'
        || type === 'date' || type === 'dateTime'
        || type === 'email' || type === 'phone') return [];

    // Invalidate cache when the data reference changes.
    if (this.autoOptionsCacheDataRef !== this.data) {
      this.autoOptionsCache.clear();
      this.autoOptionsCacheDataRef = this.data;
    }
    const cacheKey = column.key;
    const cached = this.autoOptionsCache.get(cacheKey);
    if (cached) return cached;

    const field = this.resolveFilterField(column);
    const seen = new Set<string>();
    const options: { label: string; value: any }[] = [];
    const MAX_DISTINCT_AS_LIST = 50;
    const MAX_LABEL_LEN = 80;
    let hasEmptyRows = false;

    for (const row of this.data) {
      const raw = this.getNestedValue(row, field);
      if (raw === null || raw === undefined || raw === '') {
        hasEmptyRows = true;
        continue;
      }
      const normalized = this.normalizeFilterValue(raw);
      if (normalized === '' || normalized === null || normalized === undefined) {
        hasEmptyRows = true;
        continue;
      }
      const dedupKey = String(normalized);
      if (dedupKey.length > MAX_LABEL_LEN) {
        // Long text value — bail out, treat this column as free-text only.
        this.autoOptionsCache.set(cacheKey, []);
        return [];
      }
      if (seen.has(dedupKey)) continue;
      seen.add(dedupKey);
      options.push({ label: this.formatFilterLabel(normalized), value: normalized });
      if (options.length > MAX_DISTINCT_AS_LIST) {
        // Too many distinct values — treat as free-text.
        this.autoOptionsCache.set(cacheKey, []);
        return [];
      }
    }
    options.sort((a, b) => a.label.localeCompare(b.label));

    // Surface null/empty rows as a clickable filter option when the column
    // declares a label for them (e.g. "Root Department"). This option maps
    // to isEmpty/isNotEmpty in onApplyFilter so the predicate engine
    // actually matches the empty rows.
    if (hasEmptyRows && column.emptyValueLabel) {
      options.unshift({ label: column.emptyValueLabel, value: FILTER_EMPTY_SENTINEL });
    }
    this.autoOptionsCache.set(cacheKey, options);
    return options;
  }

  private normalizeFilterValue(raw: any): any {
    if (typeof raw !== 'string') return raw;
    if (!/<[^>]+>/.test(raw)) return raw.trim();
    // Strip HTML tags + decode common entities
    const tmp = document.createElement('div');
    tmp.innerHTML = raw;
    return (tmp.textContent || tmp.innerText || '').trim();
  }

  private formatFilterLabel(raw: any): string {
    if (raw === true) return this.i18n.t('common.active');
    if (raw === false) return this.i18n.t('common.inactive');
    return String(raw);
  }

  resolveColumnType(column: TableColumn): ColumnType {
    if (column.filterType) return column.filterType;
    switch (column.type) {
      case 'money': return 'money';
      case 'date': return 'date';
      case 'code': return 'string';
      case 'link': return 'string';
      case 'status': return 'status';
      case 'boolean': return 'boolean';
    }
    // Auto-detect from key name
    const key = (column.key || '').toLowerCase();
    // Date heuristics — covers `created`, `updated`, `modified`, `hireDate`, `*AtUtc`, `*On`, etc.
    if (
      key === 'created' || key === 'updated' || key === 'modified' ||
      key === 'createdat' || key === 'updatedat' || key === 'modifiedat' ||
      key === 'createdon' || key === 'updatedon' || key === 'modifiedon' ||
      key.endsWith('date') || key.endsWith('atutc') || key.endsWith('onutc')
    ) return 'date';
    if (/amount|salary|price|revenue|balance|total|tax|fee|cost|netpay|grosspay/.test(key)) return 'money';
    if (key === 'email' || key.endsWith('email')) return 'email';
    if (/phone|mobile/.test(key)) return 'phone';
    // Status / enum heuristics
    if (/^status$|status$|^state$|state$|type$|category$|priority$|kind$|gender$/.test(key)) return 'status';
    if (key === 'isactive' || key.startsWith('is') && key.length > 2) return 'boolean';
    // Reference heuristics — columns that name another entity
    if (/(name|branch|department|manager|shift|location|role|designation|supervisor|employee)$/.test(key)
        && key !== 'name' && key !== 'fullname' && key !== 'firstname' && key !== 'lastname') return 'reference';
    return 'string';
  }

  onApplyFilter(desc: FilterDescriptor): void {
    // Remap the descriptor's field to the actual data path so the predicate
    // engine can find the value on each row. Keep the original key as label.
    const column = this.columns.find(c => c.key === desc.field);
    const realField = column ? this.resolveFilterField(column) : desc.field;
    let remapped: FilterDescriptor = { ...desc, field: realField };

    // Selecting the synthetic empty-value option (e.g. "Root Department")
    // means "filter rows where this field is null/empty" — translate to
    // isEmpty/isNotEmpty so the predicate engine actually matches.
    if (this.isEmptySentinel(remapped.value)) {
      remapped = {
        ...remapped,
        operator: remapped.operator === 'notEquals' ? 'isNotEmpty' : 'isEmpty',
        value: undefined,
        value2: undefined,
      };
    }

    const current = this.activeFilters();
    const idx = current.findIndex(f => f.field === remapped.field);
    let next: FilterDescriptor[];
    if (idx === -1) {
      next = [...current, remapped];
    } else {
      next = [...current];
      next[idx] = remapped;
    }
    this.activeFilters.set(next);
    this.filterPopover.set(null);
    this.filtersChange.emit(next);
  }

  private isEmptySentinel(value: any): boolean {
    if (value === FILTER_EMPTY_SENTINEL) return true;
    if (typeof value === 'string' && value.split(',').map(s => s.trim()).includes(FILTER_EMPTY_SENTINEL)) return true;
    if (Array.isArray(value) && value.includes(FILTER_EMPTY_SENTINEL)) return true;
    return false;
  }

  onClearFilter(key: string): void {
    const column = this.columns.find(c => c.key === key);
    const field = column ? this.resolveFilterField(column) : key;
    const next = this.activeFilters().filter(f => f.field !== field);
    this.activeFilters.set(next);
    this.filterPopover.set(null);
    this.filtersChange.emit(next);
  }

  removeFilter(desc: FilterDescriptor): void {
    this.onClearFilter(desc.field);
  }

  clearAllFilters(): void {
    this.activeFilters.set([]);
    this.filtersChange.emit([]);
  }
}