import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent {
  @Input() icon = 'fa-solid fa-inbox';
  @Input() title?: string;
  @Input() message = 'No data available';
  @Input() actionText?: string;
  @Input() actionIcon?: string;
  @Input() showClearFilters = false;
  @Input() clearFiltersText = 'Clear Filters';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() action = new EventEmitter<void>();
  @Output() clearFilters = new EventEmitter<void>();

  onActionClick(): void {
    this.action.emit();
  }

  onClearFiltersClick(): void {
    this.clearFilters.emit();
  }

  getIconSize(): string {
    switch (this.size) {
      case 'sm':
        return 'fa-2x';
      case 'lg':
        return 'fa-4x';
      default:
        return 'fa-3x';
    }
  }

  getPaddingClass(): string {
    switch (this.size) {
      case 'sm':
        return 'py-3';
      case 'lg':
        return 'py-5';
      default:
        return 'py-4';
    }
  }
}