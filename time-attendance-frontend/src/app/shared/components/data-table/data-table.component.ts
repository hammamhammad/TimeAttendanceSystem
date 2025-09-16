import { Component, Input, Output, EventEmitter, signal, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="unified-data-table">
      <!-- Loading State -->
      <div *ngIf="loading()" class="text-center p-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Table Container -->
      <div class="table-container" *ngIf="!loading()">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light sticky-top">
              <tr>
                <!-- Selection column -->
                <th *ngIf="allowSelection" class="selection-column">
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

                <!-- Data columns -->
                <th *ngFor="let column of columns"
                    [style.width]="column.width"
                    [class.sortable]="column.sortable"
                    [class.text-center]="column.align === 'center'"
                    [class.text-end]="column.align === 'right'"
                    (click)="onSort(column)">
                  <div class="d-flex align-items-center"
                       [class.justify-content-center]="column.align === 'center'"
                       [class.justify-content-end]="column.align === 'right'">
                    <span>{{ column.label }}</span>
                    <i *ngIf="column.sortable && sortColumn() === column.key"
                       class="ms-2 fas"
                       [class.fa-sort-up]="sortDirection() === 'asc'"
                       [class.fa-sort-down]="sortDirection() === 'desc'"></i>
                    <i *ngIf="column.sortable && sortColumn() !== column.key"
                       class="ms-2 fas fa-sort text-muted"></i>
                  </div>
                </th>

                <!-- Actions column -->
                <th *ngIf="actions.length > 0" class="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of data; trackBy: trackByFn"
                  [class.selected-row]="isSelected(item)"
                  [class.inactive-row]="!isActiveItem(item)">

                <!-- Selection cell -->
                <td *ngIf="allowSelection" class="selection-column">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      [checked]="isSelected(item)"
                      (change)="toggleSelection(item, $event); $event.stopPropagation()"
                    />
                  </div>
                </td>

                <!-- Data cells -->
                <td *ngFor="let column of columns"
                    [class.text-center]="column.align === 'center'"
                    [class.text-end]="column.align === 'right'">
                  <ng-container [ngSwitch]="column.key">
                    <ng-container *ngSwitchDefault>
                      <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: item, column: column }">
                      </ng-container>
                      <span *ngIf="!cellTemplate">{{ getNestedValue(item, column.key) }}</span>
                    </ng-container>
                  </ng-container>
                </td>

                <!-- Actions cell -->
                <td *ngIf="actions.length > 0" class="actions-column">
                  <div class="btn-group btn-group-sm">
                    <button *ngFor="let action of getAvailableActions(item)"
                            class="btn"
                            [class]="'btn-outline-' + (action.color || 'primary')"
                            [title]="action.label"
                            (click)="onAction(action.key, item); $event.stopPropagation()">
                      <i *ngIf="action.icon" [class]="'fas ' + action.icon"></i>
                      <span *ngIf="!action.icon">{{ action.label }}</span>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty state -->
              <tr *ngIf="data.length === 0">
                <td [attr.colspan]="getTotalColumns()" class="text-center py-4 text-muted">
                  <i class="fas fa-inbox fa-3x mb-3"></i>
                  <h5>{{ emptyMessage || 'No Data' }}</h5>
                  <p>{{ emptyTitle || 'No data available' }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Enhanced Pagination -->
        <nav *ngIf="showPagination && totalPages() > 1" class="mt-3">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="d-flex align-items-center">
                <label class="form-label me-2 mb-0">Page Size:</label>
                <select
                  class="form-select form-select-sm"
                  style="width: auto;"
                  [value]="pageSize()"
                  (change)="onPageSizeChange(+$any($event.target).value)"
                >
                  <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</option>
                </select>
                <span class="text-muted ms-3">
                  Showing
                  {{ getDisplayStart() }}-{{ getDisplayEnd() }}
                  of
                  {{ totalItems() }}
                </span>
              </div>
            </div>
            <div class="col-md-6">
              <ul class="pagination pagination-sm justify-content-end mb-0">
                <li class="page-item" [class.disabled]="currentPage() === 1">
                  <button class="page-link" (click)="onPageChange(currentPage() - 1)" [disabled]="currentPage() === 1">
                    <i class="fas fa-chevron-left"></i>
                  </button>
                </li>

                <li *ngFor="let page of getPageNumbers()"
                    class="page-item"
                    [class.active]="page === currentPage()"
                    [class.disabled]="page === -1">
                  <button
                    class="page-link"
                    *ngIf="page !== -1"
                    (click)="onPageChange(page)"
                  >
                    {{ page }}
                  </button>
                  <span class="page-link" *ngIf="page === -1">...</span>
                </li>

                <li class="page-item" [class.disabled]="currentPage() === totalPages()">
                  <button class="page-link" (click)="onPageChange(currentPage() + 1)" [disabled]="currentPage() === totalPages()">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  `,
  styles: [`
    /* Main Container */
    .unified-data-table {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Table Container */
    .table-container {
      max-height: 70vh;
      overflow-y: auto;
    }

    /* Table Styles */
    .table {
      margin-bottom: 0;
    }

    .table thead th {
      border-bottom: 2px solid #dee2e6;
      background-color: #f8f9fa;
      font-weight: 600;
      color: #495057;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .table tbody tr {
      transition: all 0.2s ease;
      animation: fadeIn 0.3s ease-out;
    }

    .table tbody tr:hover {
      background-color: #f8f9fa;
      cursor: pointer;
    }

    .table tbody tr.selected-row {
      background-color: #e3f2fd;
      border-left: 4px solid #2196f3;
    }

    .table tbody tr.inactive-row {
      background-color: #fff3cd;
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

    /* Sortable Headers */
    .sortable {
      cursor: pointer;
      user-select: none;
      transition: color 0.2s ease;
    }

    .sortable:hover {
      color: #2196f3;
      background-color: #f0f7ff;
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

    /* Button Styles */
    .btn-group .btn {
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
    }

    .btn-group .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    .btn-outline-primary:hover {
      background-color: #2196f3;
      border-color: #2196f3;
    }

    .btn-outline-danger:hover {
      background-color: #dc3545;
      border-color: #dc3545;
    }

    .btn-outline-secondary:hover {
      background-color: #6c757d;
      border-color: #6c757d;
    }

    .btn-outline-info:hover {
      background-color: #17a2b8;
      border-color: #17a2b8;
    }

    .btn-outline-warning:hover {
      background-color: #ffc107;
      border-color: #ffc107;
      color: #212529;
    }

    /* Form Controls */
    .form-check-input {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .form-check-input:checked {
      background-color: #2196f3;
      border-color: #2196f3;
    }

    .form-check-input:indeterminate {
      background-color: #ffc107;
      border-color: #ffc107;
    }

    .form-select {
      cursor: pointer;
      transition: border-color 0.2s ease;
    }

    .form-select:focus {
      border-color: #2196f3;
      box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);
    }

    /* Pagination */
    .pagination {
      margin-bottom: 0;
    }

    .page-link {
      color: #6c757d;
      border: 1px solid #dee2e6;
      transition: all 0.2s ease;
    }

    .page-link:hover {
      color: #2196f3;
      background-color: #f8f9fa;
      border-color: #dee2e6;
    }

    .page-item.active .page-link {
      background-color: #2196f3;
      border-color: #2196f3;
      color: white;
    }

    .page-item.disabled .page-link {
      color: #adb5bd;
      background-color: #fff;
      border-color: #dee2e6;
      cursor: not-allowed;
    }

    /* Loading State */
    .spinner-border {
      color: #2196f3;
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
      outline: 2px solid #2196f3;
      outline-offset: -2px;
    }

    .btn:focus {
      box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25);
    }

    /* Custom Scrollbar */
    .table-container::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    .table-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    .table-container::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }

    .table-container::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
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
      border-right: 4px solid #2196f3;
    }

    /* Responsive Design */
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
    }

    @media (max-width: 576px) {
      .table-container {
        max-height: 60vh;
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
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading = signal(false);
  @Input() allowSelection = false;
  @Input() showPagination = true;
  @Input() emptyMessage = 'No data available';
  @Input() emptyTitle = 'No Data';

  // Pagination
  @Input() currentPage = signal(1);
  @Input() totalPages = signal(1);
  @Input() totalItems = signal(0);
  @Input() pageSize = signal(10);
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  // Sorting
  @Input() sortColumn = signal('');
  @Input() sortDirection = signal<'asc' | 'desc'>('asc');

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

    if (this.sortColumn() === column.key) {
      direction = this.sortDirection() === 'asc' ? 'desc' : 'asc';
    }

    this.sortColumn.set(column.key);
    this.sortDirection.set(direction);

    this.sortChange.emit({ column: column.key, direction });
  }

  onAction(actionKey: string, item: any): void {
    this.actionClick.emit({ action: actionKey, item });
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.pageSizeChange.emit(size);
  }

  isActiveItem(item: any): boolean {
    return item.isActive !== false;
  }

  getDisplayStart(): number {
    return (this.currentPage() - 1) * this.pageSize() + 1;
  }

  getDisplayEnd(): number {
    return Math.min(this.currentPage() * this.pageSize(), this.totalItems());
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
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
}