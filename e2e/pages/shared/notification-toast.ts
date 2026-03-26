import { Page, expect } from '@playwright/test';

export class NotificationToast {
  constructor(private page: Page) {}

  /** Wait for a success toast to appear */
  async expectSuccess(messagePattern?: string | RegExp): Promise<void> {
    const toast = this.page.locator('.toast-success, .alert-success, .notification-success, .toast.bg-success').first();
    await expect(toast).toBeVisible({ timeout: 10000 });
    if (messagePattern) {
      await expect(toast).toContainText(messagePattern instanceof RegExp ? messagePattern : messagePattern);
    }
  }

  /** Wait for an error toast to appear */
  async expectError(messagePattern?: string | RegExp): Promise<void> {
    const toast = this.page.locator('.toast-error, .alert-danger, .notification-error, .toast.bg-danger').first();
    await expect(toast).toBeVisible({ timeout: 10000 });
    if (messagePattern) {
      await expect(toast).toContainText(messagePattern instanceof RegExp ? messagePattern : messagePattern);
    }
  }

  /** Wait for a warning toast */
  async expectWarning(messagePattern?: string | RegExp): Promise<void> {
    const toast = this.page.locator('.toast-warning, .alert-warning, .notification-warning').first();
    await expect(toast).toBeVisible({ timeout: 10000 });
    if (messagePattern) {
      await expect(toast).toContainText(messagePattern instanceof RegExp ? messagePattern : messagePattern);
    }
  }

  /** Wait for any toast and return its text */
  async getToastMessage(): Promise<string> {
    const toast = this.page.locator('.toast, .alert:not(.alert-info)').first();
    await expect(toast).toBeVisible({ timeout: 10000 });
    return (await toast.textContent()) ?? '';
  }

  /** Dismiss the toast if it has a close button */
  async dismiss(): Promise<void> {
    await this.page.locator('.toast .btn-close, .toast .close').first().click().catch(() => {});
  }

  /** Wait for toast to disappear */
  async waitForDismiss(): Promise<void> {
    await this.page.locator('.toast').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }
}
