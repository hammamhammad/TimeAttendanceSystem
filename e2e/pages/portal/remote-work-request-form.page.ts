import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class RemoteWorkRequestFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoNew() {
    await this.page.goto('/#/remote-work-requests/new');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/remote-work-requests/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async selectWorkLocation(location: string) {
    await this.page.locator('select').filter({ hasText: /location|type/i }).first().selectOption({ label: location });
  }

  async fillStartDate(date: string) {
    await this.form.fillByPlaceholder('Start Date', date);
  }

  async fillEndDate(date: string) {
    await this.form.fillByPlaceholder('End Date', date);
  }

  async fillReason(reason: string) {
    await this.page.locator('textarea').first().fill(reason);
  }

  async submit() {
    await this.form.submit('Submit');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
