import { Component, computed, inject } from '@angular/core';
import { ConfirmationService } from './confirmation.service';
import {
  ConfirmationModalComponent,
  ConfirmationType
} from '../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [ConfirmationModalComponent],
  template: `
    <app-confirmation-modal
      [show]="confirmationService.isVisible$()"
      [title]="config()?.title || ''"
      [message]="config()?.message || ''"
      [confirmText]="config()?.confirmText || 'Confirm'"
      [cancelText]="config()?.cancelText || 'Cancel'"
      [type]="derivedType()"
      [confirmButtonVariant]="derivedVariant()"
      [icon]="config()?.icon ? 'fa-solid ' + config()!.icon : undefined"
      (confirm)="onConfirm()"
      (cancel)="onCancel()">
    </app-confirmation-modal>
  `
})
export class ConfirmationComponent {
  public confirmationService = inject(ConfirmationService);

  config = this.confirmationService.config$;

  derivedType = computed<ConfirmationType>(() => {
    const btn = this.config()?.confirmButtonClass || '';
    if (btn.includes('danger')) return 'danger';
    if (btn.includes('success')) return 'success';
    if (btn.includes('info') || btn.includes('primary')) return 'info';
    return 'warning';
  });

  derivedVariant = computed<string>(() => {
    const btn = this.config()?.confirmButtonClass || 'btn-primary';
    return btn.replace(/^btn-/, '') || 'primary';
  });

  onConfirm(): void {
    this.confirmationService.onConfirm();
  }

  onCancel(): void {
    this.confirmationService.onCancel();
  }
}
