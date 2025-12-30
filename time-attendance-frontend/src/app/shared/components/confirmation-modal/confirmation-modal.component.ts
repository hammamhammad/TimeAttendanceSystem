import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';

export type ConfirmationType = 'danger' | 'warning' | 'info' | 'success';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [ModalWrapperComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() show = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() type: ConfirmationType = 'warning';
  @Input() confirmButtonVariant = 'danger';
  @Input() icon?: string;
  @Input() loading = false;
  @Input() details?: string;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    if (!this.loading) {
      this.confirm.emit();
    }
  }

  onCancel(): void {
    if (!this.loading) {
      this.cancel.emit();
    }
  }

  getIconClass(): string {
    if (this.icon) {
      return this.icon;
    }

    switch (this.type) {
      case 'danger':
        return 'fa-solid fa-exclamation-triangle text-danger';
      case 'warning':
        return 'fa-solid fa-exclamation-circle text-warning';
      case 'info':
        return 'fa-solid fa-info-circle text-info';
      case 'success':
        return 'fa-solid fa-check-circle text-success';
      default:
        return 'fa-solid fa-question-circle text-secondary';
    }
  }

  getButtonClass(): string {
    return `btn btn-${this.confirmButtonVariant}`;
  }
}