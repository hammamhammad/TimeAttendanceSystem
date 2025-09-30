import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  disabled?: boolean;
  hidden?: boolean;
  tooltip?: string;
}

@Component({
  selector: 'app-quick-actions-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions-panel.component.html',
  styleUrls: ['./quick-actions-panel.component.css']
})
export class QuickActionsPanelComponent {
  @Input() actions: QuickAction[] = [];
  @Input() title = 'Quick Actions';
  @Input() showTitle = true;
  @Input() layout: 'vertical' | 'horizontal' | 'grid' = 'vertical';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fullWidth = false;
  @Input() gap: 'sm' | 'md' | 'lg' = 'md';

  @Output() actionClick = new EventEmitter<QuickAction>();

  onActionClick(action: QuickAction): void {
    if (!action.disabled) {
      this.actionClick.emit(action);
    }
  }

  getVisibleActions(): QuickAction[] {
    return this.actions.filter(action => !action.hidden);
  }

  getContainerClasses(): string {
    const classes = ['quick-actions-panel'];

    if (this.layout === 'horizontal') {
      classes.push('quick-actions-horizontal');
    } else if (this.layout === 'grid') {
      classes.push('quick-actions-grid');
    } else {
      classes.push('quick-actions-vertical');
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

  getButtonClasses(action: QuickAction): string {
    const classes = ['btn'];

    // Use outline variant for better look in panels
    if (action.variant === 'light' || action.variant === 'secondary') {
      classes.push(`btn-${action.variant}`);
    } else {
      classes.push(`btn-outline-${action.variant}`);
    }

    if (this.size === 'sm') {
      classes.push('btn-sm');
    } else if (this.size === 'lg') {
      classes.push('btn-lg');
    }

    if (this.fullWidth) {
      classes.push('w-100');
    }

    if (this.layout === 'vertical' || this.layout === 'grid') {
      classes.push('text-start');
    }

    return classes.join(' ');
  }
}