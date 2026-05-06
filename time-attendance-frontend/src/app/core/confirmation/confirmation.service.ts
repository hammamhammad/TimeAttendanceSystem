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
  requireComments?: boolean;
}

export interface ConfirmationResult {
  confirmed: boolean;
  comments?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private isVisible = signal(false);
  private config = signal<ConfirmationConfig | null>(null);
  private comments = signal<string>('');
  private lastCancelAt = signal<number>(0);
  private lastConfirmAt = signal<number>(0);
  private resolvePromise: ((result: ConfirmationResult) => void) | null = null;

  readonly isVisible$ = this.isVisible.asReadonly();
  readonly config$ = this.config.asReadonly();
  readonly comments$ = this.comments.asReadonly();

  /**
   * Returns true if the user dismissed a confirmation within the given window.
   * Used by NotificationService to suppress error toasts that fire from the
   * downstream error handler when the HTTP interceptor throws a cancellation
   * error. Prevents "you cancelled → you see an error toast" UX.
   */
  wasJustCancelled(windowMs = 1500): boolean {
    return Date.now() - this.lastCancelAt() < windowMs;
  }

  /**
   * Returns true if the user confirmed a prompt within the given window.
   * Used by the HTTP confirmation interceptor to let compound-save flows
   * (e.g. "update record, then update its coordinates") skip the prompt on
   * follow-up mutating requests — one approval covers the chained action.
   */
  wasJustConfirmed(windowMs = 3000): boolean {
    return Date.now() - this.lastConfirmAt() < windowMs;
  }

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
        iconClass: config.iconClass || 'text-warning',
        requireComments: config.requireComments || false
      };

      this.config.set(defaultConfig);
      this.comments.set('');
      this.isVisible.set(true);
    });
  }

  /**
   * Handle confirm action
   */
  onConfirm(): void {
    this.lastConfirmAt.set(Date.now());
    if (this.resolvePromise) {
      this.resolvePromise({
        confirmed: true,
        comments: this.comments() || undefined
      });
    }
    this.close();
  }

  /**
   * Handle cancel action
   */
  onCancel(): void {
    this.lastCancelAt.set(Date.now());
    if (this.resolvePromise) {
      this.resolvePromise({ confirmed: false });
    }
    this.close();
  }

  /**
   * Update comments
   */
  setComments(comments: string): void {
    this.comments.set(comments);
  }

  /**
   * Close the modal
   */
  private close(): void {
    this.isVisible.set(false);
    this.config.set(null);
    this.comments.set('');
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

  /**
   * Generic action confirmation — used by the HTTP confirmation interceptor
   * and any call site that wants a simple, action-typed prompt.
   */
  confirmAction(kind: 'create' | 'update' | 'delete' | 'generic', opts?: {
    title?: string;
    message?: string;
    confirmText?: string;
  }): Promise<ConfirmationResult> {
    const presets: Record<string, Partial<ConfirmationConfig>> = {
      create: {
        title: 'Confirm Create',
        message: 'Do you want to create this record?',
        confirmText: 'Create',
        confirmButtonClass: 'btn-primary',
        icon: 'fa-plus-circle',
        iconClass: 'text-primary'
      },
      update: {
        title: 'Confirm Update',
        message: 'Do you want to save these changes?',
        confirmText: 'Save',
        confirmButtonClass: 'btn-primary',
        icon: 'fa-save',
        iconClass: 'text-primary'
      },
      delete: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this record? This action cannot be undone.',
        confirmText: 'Delete',
        confirmButtonClass: 'btn-danger',
        icon: 'fa-trash',
        iconClass: 'text-danger'
      },
      generic: {
        title: 'Confirm Action',
        message: 'Are you sure you want to proceed?',
        confirmText: 'Confirm',
        confirmButtonClass: 'btn-primary',
        icon: 'fa-question-circle',
        iconClass: 'text-warning'
      }
    };

    const preset = presets[kind];
    return this.confirm({
      title: opts?.title ?? preset.title!,
      message: opts?.message ?? preset.message!,
      confirmText: opts?.confirmText ?? preset.confirmText,
      cancelText: 'Cancel',
      confirmButtonClass: preset.confirmButtonClass,
      icon: preset.icon,
      iconClass: preset.iconClass
    });
  }
}