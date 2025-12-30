import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.css']
})
export class ModalWrapperComponent {
  @Input() show = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showHeader = true;
  @Input() showFooter = true;
  @Input() showCloseButton = true;
  @Input() closeOnBackdropClick = true;
  @Input() centered = false;
  @Input() scrollable = false;
  @Input() loading = false;
  @Input() footerTemplate?: TemplateRef<any>;

  @Output() close = new EventEmitter<void>();

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick && event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  onCloseClick(): void {
    this.close.emit();
  }

  getModalDialogClasses(): string {
    const classes = ['modal-dialog'];

    if (this.size !== 'md') {
      classes.push(`modal-${this.size}`);
    }

    if (this.centered) {
      classes.push('modal-dialog-centered');
    }

    if (this.scrollable) {
      classes.push('modal-dialog-scrollable');
    }

    return classes.join(' ');
  }
}