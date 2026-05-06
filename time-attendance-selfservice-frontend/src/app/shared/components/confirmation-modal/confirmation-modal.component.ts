import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ConfirmationType = 'danger' | 'warning' | 'info' | 'success';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
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
  @Input() confirmIcon?: string;
  @Input() loading = false;
  @Input() details?: string;
  @Input() closeOnBackdropClick = true;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  readonly titleId = `erp-confirm-title-${Math.random().toString(36).slice(2, 9)}`;

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

  onBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdropClick || this.loading) {
      return;
    }
    if (event.target === event.currentTarget) {
      this.cancel.emit();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.show && !this.loading) {
      this.cancel.emit();
    }
  }

  getIconClass(): string {
    if (this.icon) {
      return this.icon;
    }
    switch (this.type) {
      case 'danger': return 'fa-solid fa-exclamation-triangle';
      case 'warning': return 'fa-solid fa-exclamation-triangle';
      case 'info': return 'fa-solid fa-info-circle';
      case 'success': return 'fa-solid fa-check-circle';
      default: return 'fa-solid fa-question-circle';
    }
  }

  getIconWrapClass(): string {
    return `erp-confirm-icon--${this.type}`;
  }

  getButtonClass(): string {
    return `btn btn-${this.confirmButtonVariant} btn-sm erp-confirm-btn`;
  }
}
