import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  template: `
    @if (totalPages() > 1) {
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <!-- First page -->
          <li class="page-item" [class.disabled]="currentPage() === 1">
            <button class="page-link" (click)="goToPage(1)" [disabled]="currentPage() === 1">
              <i class="fas fa-angle-double-left"></i>
            </button>
          </li>
          <!-- Previous page -->
          <li class="page-item" [class.disabled]="currentPage() === 1">
            <button class="page-link" (click)="goToPage(currentPage() - 1)" [disabled]="currentPage() === 1">
              <i class="fas fa-angle-left"></i>
            </button>
          </li>
          <!-- Page numbers -->
          @for (page of visiblePages(); track page) {
            <li class="page-item"
              [class.active]="page === currentPage()">
              <button class="page-link" (click)="goToPage(page)">{{ page }}</button>
            </li>
          }
          <!-- Next page -->
          <li class="page-item" [class.disabled]="currentPage() === totalPages()">
            <button class="page-link" (click)="goToPage(currentPage() + 1)" [disabled]="currentPage() === totalPages()">
              <i class="fas fa-angle-right"></i>
            </button>
          </li>
          <!-- Last page -->
          <li class="page-item" [class.disabled]="currentPage() === totalPages()">
            <button class="page-link" (click)="goToPage(totalPages())" [disabled]="currentPage() === totalPages()">
              <i class="fas fa-angle-double-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    }
    
    <!-- Page info -->
    @if (showInfo) {
      <div class="d-flex justify-content-between align-items-center mt-3">
        <small class="text-muted">
          Showing {{ startItem() }} to {{ endItem() }} of {{ totalItems() }} entries
        </small>
        <small class="text-muted">
          Page {{ currentPage() }} of {{ totalPages() }}
        </small>
      </div>
    }
    `,
  styles: [`
    .page-link {
      border: 1px solid var(--app-gray-300, #D0D5DD);
      color: var(--app-gray-600, #475467);
      font-size: 13px;
      min-width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--app-border-radius-sm, 6px);
      transition: all 0.1s ease;
    }

    .page-link:hover {
      background-color: var(--app-gray-50, #F9FAFB);
      border-color: var(--app-gray-300, #D0D5DD);
      color: var(--app-gray-700, #344054);
    }

    .page-item.active .page-link {
      background-color: var(--app-primary, #4F6BF6);
      border-color: var(--app-primary, #4F6BF6);
      color: #fff;
    }

    .page-item.disabled .page-link {
      color: var(--app-gray-400, #98A2B3);
      background-color: #fff;
      border-color: var(--app-gray-200, #EAECF0);
      cursor: not-allowed;
    }

    .pagination {
      gap: 4px;
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage = signal(1);
  @Input() totalPages = signal(1);
  @Input() totalItems = signal(0);
  @Input() pageSize = signal(10);
  @Input() showInfo = true;

  @Output() pageChange = new EventEmitter<number>();

  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const delta = 2;
    const pages: number[] = [];

    let start = Math.max(1, current - delta);
    let end = Math.min(total, current + delta);

    // Adjust range to show 5 pages when possible
    if (end - start < 4 && total > 4) {
      if (start === 1) {
        end = Math.min(total, start + 4);
      } else if (end === total) {
        start = Math.max(1, end - 4);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  startItem = computed(() => {
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  endItem = computed(() => {
    return Math.min(this.currentPage() * this.pageSize(), this.totalItems());
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}