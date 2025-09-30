import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownAction {
  id: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'danger' | 'success' | 'warning' | 'info';
  divider?: boolean; // Show divider after this item
  disabled?: boolean;
  hidden?: boolean;
  onClick?: () => void;
}

@Component({
  selector: 'app-action-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-dropdown.component.html',
  styleUrls: ['./action-dropdown.component.css']
})
export class ActionDropdownComponent {
  @Input() actions: DropdownAction[] = [];
  @Input() label = 'Actions';
  @Input() icon = 'fa-solid fa-ellipsis-vertical';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'secondary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() split = false; // Split dropdown button
  @Input() disabled = false;
  @Input() dropDirection: 'down' | 'up' | 'start' | 'end' = 'down';
  @Input() menuAlignment: 'start' | 'end' = 'end';
  @Input() showLabel = true;

  @Output() actionClick = new EventEmitter<DropdownAction>();

  onActionClick(action: DropdownAction): void {
    if (!action.disabled) {
      this.actionClick.emit(action);
      if (action.onClick) {
        action.onClick();
      }
    }
  }

  getVisibleActions(): DropdownAction[] {
    return this.actions.filter(action => !action.hidden);
  }

  getButtonClasses(): string {
    const classes = ['btn'];

    if (this.variant === 'secondary') {
      classes.push('btn-outline-secondary');
    } else {
      classes.push(`btn-${this.variant}`);
    }

    if (this.size === 'sm') {
      classes.push('btn-sm');
    } else if (this.size === 'lg') {
      classes.push('btn-lg');
    }

    if (!this.split) {
      classes.push('dropdown-toggle');
    }

    return classes.join(' ');
  }

  getDropdownClasses(): string {
    const classes = [];

    if (this.split) {
      classes.push('btn-group');
    } else {
      classes.push('dropdown');
    }

    if (this.dropDirection === 'up') {
      classes.push('dropup');
    } else if (this.dropDirection === 'start') {
      classes.push('dropstart');
    } else if (this.dropDirection === 'end') {
      classes.push('dropend');
    }

    return classes.join(' ');
  }

  getMenuClasses(): string {
    const classes = ['dropdown-menu'];

    if (this.menuAlignment === 'end') {
      classes.push('dropdown-menu-end');
    }

    return classes.join(' ');
  }

  getItemClasses(action: DropdownAction): string {
    const classes = ['dropdown-item'];

    if (action.disabled) {
      classes.push('disabled');
    }

    if (action.variant) {
      switch (action.variant) {
        case 'danger':
          classes.push('text-danger');
          break;
        case 'success':
          classes.push('text-success');
          break;
        case 'warning':
          classes.push('text-warning');
          break;
        case 'info':
          classes.push('text-info');
          break;
      }
    }

    return classes.join(' ');
  }
}