import { Component, Input, Output, EventEmitter, signal, TemplateRef, ContentChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { I18nService } from '../../../core/i18n/i18n.service';

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
}

export interface TableAction {
  key: string;
  label: string;
  icon?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  condition?: (item: any) => boolean;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, EmptyStateComponent],
  template: `
    <div class="unified-data-table">
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
          <table class="table table-hover">
            <thead class="table-light sticky-top">
              <tr>
                <!-- Selection column -->
                @if (allowSelection) {
                  <th class="selection-column">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        [checked]="allSelected()"
                        [indeterminate]="someSelected()"
                        (change)="toggleSelectAll($event)"
                        />
                    </div>
                  </th>
                }
    
                <!-- Data columns -->
                @for (column of getVisibleColumns(); track column.key) {
                  <th
                    [style.width]="column.width"
                    [class.sortable]="column.sortable"
                    [class.text-center]="column.align === 'center'"
                    [class.text-end]="column.align === 'right'"
                    [class.d-none]="column.hideOnMobile && isMobileView()"
                    [class.d-md-table-cell]="column.hideOnMobile"
                    (click)="onSort(column)">
                    <div class="d-flex align-items-center"
                      [class.justify-content-center]="column.align === 'center'"
                      [class.justify-content-end]="column.align === 'right'">
                      <span>{{ column.label }}</span>
                      @if (column.sortable && getSortColumn() === column.key) {
                        <i
                          class="ms-2 fas"
                          [class.fa-sort-up]="getSortDirection() === 'asc'"
                        [class.fa-sort-down]="getSortDirection() === 'desc'"></i>
                      }
                      @if (column.sortable && getSortColumn() !== column.key) {
                        <i
                        class="ms-2 fas fa-sort text-muted"></i>
                      }
                    </div>
                  </th>
                }
    
                <!-- Actions column -->
                @if (actions.length > 0) {
                  <th class="actions-column">{{ i18n.t('common.actions') }}</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (item of getDisplayedData(); track trackByFn($index, item)) {
                <tr
                  [class.selected-row]="isSelected(item)"
                  [class.inactive-row]="!isActiveItem(item)">
                  <!-- Selection cell -->
                  @if (allowSelection) {
                    <td class="selection-column">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          [checked]="isSelected(item)"
                          (change)="toggleSelection(item, $event); $event.stopPropagation()"
                          />
                      </div>
                    </td>
                  }
                  <!-- Data cells -->
                  @for (column of getVisibleColumns(); track column.key) {
                    <td
                      [class.text-center]="column.align === 'center'"
                      [class.text-end]="column.align === 'right'"
                      [class.d-none]="column.hideOnMobile && isMobileView()"
                      [class.d-md-table-cell]="column.hideOnMobile">
                      @switch (column.key) {
                        @default {
                          <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column }">
                          </ng-container>
                          @if (!cellTemplate && !column.renderHtml) {
                            <span>{{ getNestedValue(item, column.key) }}</span>
                          }
                          @if (!cellTemplate && column.renderHtml) {
                            <span [innerHTML]="getNestedValue(item, column.key)"></span>
                          }
                        }
                      }
                    </td>
                  }
                  <!-- Actions cell -->
                  @if (actions.length > 0) {
                    <td class="actions-column">
                      <div class="btn-group btn-group-sm">
                        @for (action of getAvailableActions(item); track action.key) {
                          <button
                            class="btn"
                            [class]="'btn-outline-' + (action.color || 'primary')"
                            [title]="action.label"
                            (click)="onAction(action.key, item); $event.stopPropagation()">
                            @if (action.icon) {
                              <i [class]="'fas ' + action.icon"></i>
                            }
                            @if (!action.icon) {
                              <span>{{ action.label }}</span>
                            }
                          </button>
                        }
                      </div>
                    </td>
                  }
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
    
        <!-- Enhanced Pagination -->
        @if (showPagination && getTotalPagesValue() > 1) {
          <nav class="mt-3">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="d-flex align-items-center">
                  <label class="form-label me-2 mb-0">{{ i18n.t('common.page_size') }}:</label>
                  <select
                    class="form-select form-select-sm"
                    style="width: auto;"
                    [value]="getPageSizeValue()"
                    (change)="onPageSizeChange(+$any($event.target).value)"
                    >
                    @for (size of pageSizeOptions; track size) {
                      <option [value]="size">{{ size }}</option>
                    }
                  </select>
                  <span class="text-muted ms-3">
                    {{ i18n.t('common.showing') }}
                    {{ getDisplayStart() }}-{{ getDisplayEnd() }}
                    {{ i18n.t('common.of') }}
                    {{ getTotalItemsValue() }}
                  </span>
                </div>
              </div>
              <div class="col-md-6">
                <ul class="pagination pagination-sm justify-content-end mb-0">
                  <li class="page-item" [class.disabled]="getCurrentPage() === 1">
                    <button class="page-link" (click)="onPageChange(getCurrentPage() - 1)" [disabled]="getCurrentPage() === 1">
                      <i class="fas fa-chevron-left rtl-flip"></i>
                    </button>
                  </li>
                  @for (page of getPageNumbers(); track page) {
                    <li
                      class="page-item"
                      [class.active]="page === getCurrentPage()"
                      [class.disabled]="page === -1">
                      @if (page !== -1) {
                        <button
                          class="page-link"
                          (click)="onPageChange(page)"
                          >
                          {{ page }}
                        </button>
                      }
                      @if (page === -1) {
                        <span class="page-link">...</span>
                      }
                    </li>
                  }
                  <li class="page-item" [class.disabled]="getCurrentPage() === getTotalPagesValue()">
                    <button class="page-link" (click)="onPageChange(getCurrentPage() + 1)" [disabled]="getCurrentPage() === getTotalPagesValue()">
                      <i class="fas fa-chevron-right rtl-flip"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        }
      </div>
    </div>
    `,
  styles: [`
    /* Main Container */
    .unified-data-table {
      background: white;
      border: 1px solid var(--app-gray-200, #EAECF0);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: var(--app-shadow-sm, 0 1px 3px rgba(16, 24, 40, 0.1));
    }

    /* Table Container */
    .table-container {
      min-height: 400px;
      overflow: visible;
    }

    /* Table Styles */
    .table {
      margin-bottom: 0;
    }

    .table thead th {
      border-bottom: 1px solid var(--app-gray-200, #EAECF0);
      background-color: var(--app-gray-50, #F9FAFB);
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--app-gray-600, #475467);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .table tbody tr {
      transition: all 0.2s ease;
      animation: fadeIn 0.3s ease-out;
    }

    .table tbody tr:hover {
      background-color: var(--app-primary-50, #EEF2FF);
      cursor: pointer;
    }

    .table tbody tr.selected-row {
      background-color: var(--app-primary-50, #EEF2FF);
      border-left: 4px solid var(--app-primary, #4F6BF6);
    }

    .table tbody tr.inactive-row {
      background-color: var(--app-warning-50, #FFFBEB);
    }

    .table tbody tr.inactive-row:hover {
      background-color: #ffeaa7;
    }

    /* Column Styles */
    .selection-column {
      width: 50px;
      text-align: center;
    }

    .actions-column {
      width: 100px;
      text-align: center;
    }

    /* Action buttons as separate items with gap */
    .actions-column .btn-group {
      display: flex;
      gap: 4px;
    }

    .actions-column .btn-group .btn {
      border-radius: 6px !important;
    }

    /* Sortable Headers */
    .sortable {
      cursor: pointer;
      user-select: none;
      transition: color 0.2s ease;
    }

    .sortable:hover {
      color: var(--app-primary, #4F6BF6);
      background-color: var(--app-primary-50, #EEF2FF);
    }

    .sortable .fas {
      font-size: 0.75rem;
      opacity: 0.6;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .sortable:hover .fas {
      opacity: 1;
      transform: scale(1.1);
    }

    /* Action Button Styles - ERP clean bordered icon buttons */
    .btn-group .btn {
      background: white;
      border: 1px solid var(--app-gray-300, #D0D5DD);
      color: var(--app-gray-500, #667085);
      box-shadow: none;
      transition: all 0.15s ease;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
    }

    .btn-group .btn:hover {
      background-color: var(--app-gray-50, #F9FAFB);
      border-color: var(--app-gray-300, #D0D5DD);
      color: var(--app-gray-700, #344054);
      transform: none;
      box-shadow: none;
    }

    .btn-group .btn i {
      font-size: 12px;
    }

    /* Specific action color hints on hover */
    .btn-outline-primary:hover {
      color: var(--app-primary, #4F6BF6);
      border-color: var(--app-primary-200, #B3C2FF);
      background-color: var(--app-primary-50, #EEF2FF);
    }

    .btn-outline-info:hover {
      color: var(--app-info, #3B82F6);
      border-color: var(--app-info-100, #DBEAFE);
      background-color: var(--app-info-50, #EFF6FF);
    }

    .btn-outline-danger:hover {
      color: var(--app-danger, #EF4444);
      border-color: var(--app-danger-100, #FEE2E2);
      background-color: var(--app-danger-50, #FEF2F2);
    }

    .btn-outline-warning:hover {
      color: var(--app-warning-600, #D97706);
      border-color: var(--app-warning-100, #FEF3C7);
      background-color: var(--app-warning-50, #FFFBEB);
    }

    .btn-outline-success:hover {
      color: var(--app-success, #22C55E);
      border-color: var(--app-success-100, #DCFCE7);
      background-color: var(--app-success-50, #F0FDF4);
    }

    .btn-outline-secondary:hover {
      color: var(--app-gray-700, #344054);
      border-color: var(--app-gray-300, #D0D5DD);
      background-color: var(--app-gray-50, #F9FAFB);
    }

    /* Form Controls */
    .form-check-input {
      cursor: pointer;
      transition: all 0.2s ease;
      accent-color: var(--app-primary, #4F6BF6);
    }

    .form-check-input:checked {
      background-color: var(--app-primary, #4F6BF6);
      border-color: var(--app-primary, #4F6BF6);
    }

    .form-check-input:indeterminate {
      background-color: var(--app-warning, #F59E0B);
      border-color: var(--app-warning, #F59E0B);
    }

    .form-select {
      cursor: pointer;
      transition: border-color 0.2s ease;
    }

    .form-select:focus {
      border-color: var(--app-primary, #4F6BF6);
      box-shadow: 0 0 0 0.2rem rgba(79, 107, 246, 0.25);
    }

    /* Pagination */
    .pagination {
      margin-bottom: 0;
    }

    .page-link {
      color: var(--app-gray-500, #667085);
      border: 1px solid var(--app-gray-200, #EAECF0);
      transition: all 0.2s ease;
    }

    .page-link:hover {
      color: var(--app-primary, #4F6BF6);
      background-color: var(--app-gray-50, #F9FAFB);
      border-color: var(--app-gray-200, #EAECF0);
    }

    .page-item.active .page-link {
      background-color: var(--app-primary, #4F6BF6);
      border-color: var(--app-primary, #4F6BF6);
      color: white;
    }

    .page-item.disabled .page-link {
      color: #adb5bd;
      background-color: #fff;
      border-color: var(--app-gray-200, #EAECF0);
      cursor: not-allowed;
    }

    /* Loading State */
    .spinner-border {
      color: var(--app-primary, #4F6BF6);
      width: 3rem;
      height: 3rem;
    }

    /* Empty State */
    .text-muted i.fa-3x {
      color: #adb5bd !important;
      margin-bottom: 1rem;
    }

    /* Focus States */
    .table tbody tr:focus-within {
      outline: 2px solid var(--app-primary, #4F6BF6);
      outline-offset: -2px;
    }

    .btn:focus {
      box-shadow: 0 0 0 0.2rem rgba(79, 107, 246, 0.25);
    }

    /* Enhanced Table Layout */
    .table-responsive {
      border-radius: 8px;
      overflow: visible;
    }

    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* RTL Support */
    [dir="rtl"] .table tbody tr.selected-row {
      border-left: none;
      border-right: 4px solid var(--app-primary, #4F6BF6);
    }

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

    .mobile-card.selected-row {
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

    /* Enhanced Responsive Design */
    @media (max-width: 768px) {
      .table-responsive {
        font-size: 0.875rem;
      }

      .btn-group .btn {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }

      .pagination {
        justify-content: center;
        margin-top: 1rem;
      }

      .d-flex.align-items-center span.text-muted {
        display: none;
      }

      /* Hide low priority columns on tablets */
      .table th[data-priority="low"],
      .table td[data-priority="low"] {
        display: none !important;
      }
    }

    @media (max-width: 576px) {
      .table-container {
        min-height: 300px;
      }

      .table thead th {
        font-size: 0.75rem;
        padding: 0.5rem 0.25rem;
      }

      .table tbody td {
        padding: 0.5rem 0.25rem;
      }

      .btn-group {
        flex-direction: column;
      }

      .btn-group .btn {
        margin-bottom: 2px;
        border-radius: 4px !important;
      }

      .actions-column {
        width: 80px;
      }

      /* Hide medium and low priority columns on phones */
      .table th[data-priority="medium"],
      .table td[data-priority="medium"],
      .table th[data-priority="low"],
      .table td[data-priority="low"] {
        display: none !important;
      }

      .mobile-cards {
        padding: 0.5rem;
      }

      .mobile-card {
        margin-bottom: 0.75rem;
      }

      .mobile-label {
        flex: 0 0 35%;
        font-size: 0.8rem;
      }

      .mobile-value {
        font-size: 0.8rem;
      }

      .mobile-card-actions .btn {
        font-size: 0.75rem;
        padding: 0.375rem 0.5rem;
      }
    }

    /* Ultra-wide screens */
    @media (min-width: 1400px) {
      .table-container {
        font-size: 0.95rem;
      }
    }

    /* Tablet landscape optimizations */
    @media (min-width: 768px) and (max-width: 1024px) {
      .table {
        font-size: 0.9rem;
      }

      .btn-group .btn {
        padding: 0.375rem 0.75rem;
        font-size: 0.8rem;
      }
    }

    /* Print Styles */
    @media print {
      .actions-column,
      .pagination {
        display: none !important;
      }

      .table {
        font-size: 0.8rem;
      }

      .table tbody tr.selected-row {
        background-color: transparent !important;
        border-left: none !important;
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
  @Input() allowSelection = false;
  @Input() showPagination = true;
  @Input() emptyMessage = 'No data available';
  @Input() emptyTitle = 'No Data';
  @Input() responsiveMode: 'cards' | 'horizontal-scroll' | 'auto' = 'auto';
  @Input() cardTemplate?: TemplateRef<any>;
  @Input() searchable = false;
  @Input() sortable = false;
  @Input() exportable = false;
  @Input() paginated = false;

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

  @Output() actionClick = new EventEmitter<{action: string, item: any}>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() sortChange = new EventEmitter<SortEvent>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  selectedItems = signal<any[]>([]);
  allSelected = signal(false);
  someSelected = signal(false);

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

  // Get displayed data (paginated or full)
  getDisplayedData(): any[] {
    if (this.paginated) {
      const pageSize = this.getPageSizeValue();
      const currentPage = this.getCurrentPage();
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return this.data.slice(startIndex, endIndex);
    }
    return this.data;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getTotalColumns(): number {
    let count = this.columns.length;
    if (this.allowSelection) count++;
    if (this.actions.length > 0) count++;
    return count;
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  getAvailableActions(item: any): TableAction[] {
    return this.actions.filter(action => !action.condition || action.condition(item));
  }

  isSelected(item: any): boolean {
    return this.selectedItems().some(selected => selected.id === item.id);
  }

  toggleSelection(item: any, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const selected = this.selectedItems();

    if (checked) {
      this.selectedItems.set([...selected, item]);
    } else {
      this.selectedItems.set(selected.filter(s => s.id !== item.id));
    }

    this.updateSelectionState();
    this.selectionChange.emit(this.selectedItems());
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
    if (typeof window === 'undefined') return this.columns;

    const isMobile = window.innerWidth < 768;
    if (!isMobile) return this.columns;

    // On mobile, filter out columns marked as hideOnMobile
    return this.columns.filter(col => !col.hideOnMobile);
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
}