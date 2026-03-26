import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class NotificationsPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoSend() {
    await this.page.goto('/#/notifications/send');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoHistory() {
    await this.page.goto('/#/notifications/history');
    await this.page.waitForLoadState('networkidle');
  }

  async fillTitle(title: string) {
    await this.form.fillByPlaceholder('Title', title);
  }

  async fillMessage(message: string) {
    await this.page.locator('textarea').first().fill(message);
  }

  async selectTarget(target: string) {
    await this.page.locator('select').filter({ hasText: /target|recipient/i }).first().selectOption({ label: target });
  }

  async submit() {
    await this.form.submit('Send');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
