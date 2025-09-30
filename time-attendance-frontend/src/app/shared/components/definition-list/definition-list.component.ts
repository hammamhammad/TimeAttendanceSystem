import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DefinitionItem {
  label: string;
  value: any;
  type?: 'text' | 'badge' | 'date' | 'time' | 'datetime' | 'currency' | 'percentage' | 'link' | 'custom';
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  customTemplate?: TemplateRef<any>;
  visible?: boolean;
  onClick?: () => void;
  copyable?: boolean;
  icon?: string;
  href?: string; // For link type
  valueClass?: string;
}

@Component({
  selector: 'app-definition-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './definition-list.component.html',
  styleUrls: ['./definition-list.component.css']
})
export class DefinitionListComponent {
  @Input() items: DefinitionItem[] = [];
  @Input() layout: 'single' | 'two-column' = 'single';
  @Input() striped = false;
  @Input() bordered = false;
  @Input() compact = false;
  @Input() labelWidth = '4'; // Bootstrap column width (1-12)
  @Input() valueWidth = '8'; // Bootstrap column width (1-12)

  getLeftColumnItems(): DefinitionItem[] {
    return this.items.filter((_, index) => index % 2 === 0);
  }

  getRightColumnItems(): DefinitionItem[] {
    return this.items.filter((_, index) => index % 2 === 1);
  }

  getVisibleItems(): DefinitionItem[] {
    return this.items.filter(item => item.visible !== false);
  }

  getListClasses(): string {
    const classes = ['definition-list'];

    if (this.striped) {
      classes.push('definition-list-striped');
    }

    if (this.bordered) {
      classes.push('definition-list-bordered');
    }

    if (this.compact) {
      classes.push('definition-list-compact');
    }

    return classes.join(' ');
  }

  formatDate(dateString: string | Date): string {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString.toString();
    }
  }

  formatTime(timeString: string | Date): string {
    if (!timeString) return '-';
    try {
      return new Date(timeString).toLocaleTimeString();
    } catch {
      return timeString.toString();
    }
  }

  formatDateTime(dateTimeString: string | Date): string {
    if (!dateTimeString) return '-';
    try {
      return new Date(dateTimeString).toLocaleString();
    } catch {
      return dateTimeString.toString();
    }
  }

  formatCurrency(amount: number): string {
    if (amount == null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  copyToClipboard(text: string, event: Event): void {
    event.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
      });
    }
  }

  onItemClick(item: DefinitionItem, event: Event): void {
    if (item.onClick) {
      event.preventDefault();
      item.onClick();
    }
  }
}