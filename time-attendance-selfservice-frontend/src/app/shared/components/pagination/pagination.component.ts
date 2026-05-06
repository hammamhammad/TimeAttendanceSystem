import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  template: `
    @if (totalPages() > 1) {
      <div class="grid-pagination">
        @if (showInfo) {
          <span>
            Showing {{ startItem() }}&ndash;{{ endItem() }} of {{ totalItems() }} records
          </span>
        } @else {
          <span></span>
        }

        <div class="pagination-pages">
          <button type="button"
                  (click)="goToPage(currentPage() - 1)"
                  [disabled]="currentPage() === 1"
                  title="Previous page">
            <i class="fas fa-chevron-left" style="font-size: 10px;"></i>
          </button>
          @for (page of visiblePages(); track $index) {
            @if (page === -1) {
              <span class="pagination-ellipsis">&hellip;</span>
            } @else {
              <button type="button"
                      [class.active]="page === currentPage()"
                      (click)="goToPage(page)">
                {{ page }}
              </button>
            }
          }
          <button type="button"
                  (click)="goToPage(currentPage() + 1)"
                  [disabled]="currentPage() === totalPages()"
                  title="Next page">
            <i class="fas fa-chevron-right" style="font-size: 10px;"></i>
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    /* All styling comes from global .grid-pagination / .pagination-pages in components.css */
    :host { display: block; }
  `]
})
export class PaginationComponent {
  @Input() currentPage = signal(1);
  @Input() totalPages = signal(1);
  @Input() totalItems = signal(0);
  @Input() pageSize = signal(10);
  @Input() showInfo = true;

  @Output() pageChange = new EventEmitter<number>();

  /** Elided page list: [1, -1 (…), 4, 5, 6, -1 (…), 12]. */
  visiblePages = computed<number[]>(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const delta = 1;
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (current - delta > 2) pages.push(-1);
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      pages.push(i);
    }
    if (current + delta < total - 1) pages.push(-1);
    pages.push(total);
    return pages;
  });

  startItem = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
  endItem = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalItems()));

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}
