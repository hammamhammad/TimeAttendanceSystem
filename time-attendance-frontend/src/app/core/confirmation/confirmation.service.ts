import { Injectable, signal } from '@angular/core';

export interface ConfirmationConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  cancelButtonClass?: string;
  icon?: string;
  iconClass?: string;
}

export interface ConfirmationResult {
  confirmed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private isVisible = signal(false);
  private config = signal<ConfirmationConfig | null>(null);
  private resolvePromise: ((result: ConfirmationResult) => void) | null = null;

  readonly isVisible$ = this.isVisible.asReadonly();
  readonly config$ = this.config.asReadonly();

  /**
   * Show a confirmation dialog
   */
  confirm(config: ConfirmationConfig): Promise<ConfirmationResult> {
    return new Promise<ConfirmationResult>((resolve) => {
      this.resolvePromise = resolve;
      
      // Set default values
      const defaultConfig: ConfirmationConfig = {
        title: config.title,
        message: config.message,
        confirmText: config.confirmText || 'Confirm',
        cancelText: config.cancelText || 'Cancel',
        confirmButtonClass: config.confirmButtonClass || 'btn-danger',
        cancelButtonClass: config.cancelButtonClass || 'btn-secondary',
        icon: config.icon || 'fa-question-circle',
        iconClass: config.iconClass || 'text-warning'
      };

      this.config.set(defaultConfig);
      this.isVisible.set(true);
    });
  }

  /**
   * Handle confirm action
   */
  onConfirm(): void {
    if (this.resolvePromise) {
      this.resolvePromise({ confirmed: true });
    }
    this.close();
  }

  /**
   * Handle cancel action
   */
  onCancel(): void {
    if (this.resolvePromise) {
      this.resolvePromise({ confirmed: false });
    }
    this.close();
  }

  /**
   * Close the modal
   */
  private close(): void {
    this.isVisible.set(false);
    this.config.set(null);
    this.resolvePromise = null;
  }

  /**
   * Quick confirmation for delete actions
   */
  confirmDelete(itemName: string, itemType: string = 'item'): Promise<ConfirmationResult> {
    return this.confirm({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete this ${itemType}? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });
  }

  /**
   * Quick confirmation for save actions
   */
  confirmSave(message: string = 'Do you want to save your changes?'): Promise<ConfirmationResult> {
    return this.confirm({
      title: 'Save Changes',
      message: message,
      confirmText: 'Save',
      cancelText: 'Cancel',
      confirmButtonClass: 'btn-primary',
      icon: 'fa-save',
      iconClass: 'text-primary'
    });
  }

  /**
   * Quick confirmation for discard actions
   */
  confirmDiscard(message: string = 'You have unsaved changes. Are you sure you want to discard them?'): Promise<ConfirmationResult> {
    return this.confirm({
      title: 'Discard Changes',
      message: message,
      confirmText: 'Discard',
      cancelText: 'Keep Editing',
      confirmButtonClass: 'btn-warning',
      icon: 'fa-exclamation-triangle',
      iconClass: 'text-warning'
    });
  }
}