import { Component, Input, Output, EventEmitter } from '@angular/core';


export interface BadgeItem {
  id?: string | number;
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  icon?: string;
  removable?: boolean;
  clickable?: boolean;
  tooltip?: string;
}

@Component({
  selector: 'app-badge-list',
  standalone: true,
  imports: [],
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.css']
})
export class BadgeListComponent {
  @Input() items: BadgeItem[] = [];
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() gap: 'sm' | 'md' | 'lg' = 'md';
  @Input() wrap = true;
  @Input() emptyMessage = 'No items';
  @Input() showEmptyMessage = true;
  @Input() maxItems?: number; // Show only first N items
  @Input() showMoreText = '+ {count} more';

  @Output() badgeClick = new EventEmitter<BadgeItem>();
  @Output() badgeRemove = new EventEmitter<BadgeItem>();

  onBadgeClick(item: BadgeItem): void {
    if (item.clickable) {
      this.badgeClick.emit(item);
    }
  }

  onRemoveClick(item: BadgeItem, event: Event): void {
    event.stopPropagation();
    this.badgeRemove.emit(item);
  }

  getContainerClasses(): string {
    const classes = ['badge-list', 'd-flex'];

    if (this.wrap) {
      classes.push('flex-wrap');
    }

    switch (this.gap) {
      case 'sm':
        classes.push('gap-1');
        break;
      case 'lg':
        classes.push('gap-3');
        break;
      default:
        classes.push('gap-2');
    }

    return classes.join(' ');
  }

  getBadgeClasses(item: BadgeItem): string {
    const classes = ['badge'];

    const badgeVariant = item.variant || this.variant;
    classes.push(`bg-${badgeVariant}`);

    if (item.clickable) {
      classes.push('badge-clickable');
    }

    if (item.removable) {
      classes.push('badge-removable');
    }

    switch (this.size) {
      case 'sm':
        classes.push('badge-sm');
        break;
      case 'lg':
        classes.push('badge-lg');
        break;
    }

    return classes.join(' ');
  }

  getVisibleItems(): BadgeItem[] {
    if (this.maxItems && this.items.length > this.maxItems) {
      return this.items.slice(0, this.maxItems);
    }
    return this.items;
  }

  getHiddenCount(): number {
    if (this.maxItems && this.items.length > this.maxItems) {
      return this.items.length - this.maxItems;
    }
    return 0;
  }

  getShowMoreText(): string {
    return this.showMoreText.replace('{count}', this.getHiddenCount().toString());
  }
}