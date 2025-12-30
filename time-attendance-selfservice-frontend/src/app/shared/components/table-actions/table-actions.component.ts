import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableActionItem {
  id: string;
  label: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  permission?: string;
  visible?: (item: any) => boolean;
  disabled?: (item: any) => boolean;
  tooltip?: string;
}

@Component({
  selector: 'app-table-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.css']
})
export class TableActionsComponent {
  @Input() actions: TableActionItem[] = [];
  @Input() item: any;
  @Input() loading = false;
  @Input() size: 'sm' | 'md' = 'sm';
  @Input() layout: 'buttons' | 'dropdown' = 'buttons';

  @Output() actionClick = new EventEmitter<{ action: TableActionItem; item: any }>();

  onActionClick(action: TableActionItem): void {
    if (!this.isActionDisabled(action)) {
      this.actionClick.emit({ action, item: this.item });
    }
  }

  isActionVisible(action: TableActionItem): boolean {
    if (action.visible) {
      return action.visible(this.item);
    }
    return true;
  }

  isActionDisabled(action: TableActionItem): boolean {
    if (this.loading) {
      return true;
    }

    if (action.disabled) {
      return action.disabled(this.item);
    }

    return false;
  }

  getVisibleActions(): TableActionItem[] {
    return this.actions.filter(action => this.isActionVisible(action));
  }

  getButtonClasses(action: TableActionItem): string {
    const classes = ['btn'];

    if (this.size === 'sm') {
      classes.push('btn-sm');
    }

    classes.push(`btn-outline-${action.variant}`);

    return classes.join(' ');
  }
}