import { Component, Input, Output, EventEmitter } from '@angular/core';


export interface BulkAction {
  id: string;
  label: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  requiresConfirmation?: boolean;
  confirmationMessage?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-bulk-actions-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './bulk-actions-toolbar.component.html',
  styleUrls: ['./bulk-actions-toolbar.component.css']
})
export class BulkActionsToolbarComponent {
  @Input() selectedCount = 0;
  @Input() totalCount = 0;
  @Input() actions: BulkAction[] = [];
  @Input() entityName = 'items'; // e.g., "users", "employees"
  @Input() showSelectAll = true;
  @Input() allSelected = false;
  @Input() disabled = false;

  @Output() actionClick = new EventEmitter<BulkAction>();
  @Output() selectAll = new EventEmitter<void>();
  @Output() clearSelection = new EventEmitter<void>();

  onActionClick(action: BulkAction): void {
    if (!action.disabled && !this.disabled) {
      this.actionClick.emit(action);
    }
  }

  onSelectAll(): void {
    this.selectAll.emit();
  }

  onClearSelection(): void {
    this.clearSelection.emit();
  }

  getVisibleActions(): BulkAction[] {
    return this.actions.filter(action => !action.disabled || this.selectedCount > 0);
  }

  getButtonClasses(action: BulkAction): string {
    const classes = ['btn'];

    if (action.variant === 'danger') {
      classes.push('btn-outline-danger');
    } else if (action.variant === 'warning') {
      classes.push('btn-outline-warning');
    } else {
      classes.push(`btn-outline-${action.variant}`);
    }

    classes.push('btn-sm');

    return classes.join(' ');
  }

  isActionDisabled(action: BulkAction): boolean {
    return this.disabled || action.disabled || this.selectedCount === 0;
  }
}