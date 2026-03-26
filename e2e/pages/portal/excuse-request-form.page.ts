import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class ExcuseRequestFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoNew() {
    await this.page.goto('/#/excuse-requests/new');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/excuse-requests/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async selectExcuseType(type: string) {
    await this.page.locator('select').filter({ hasText: /type/i }).first().selectOption({ label: type });
  }

  async fillDate(date: string) {
    await this.form.fillByPlaceholder('Date', date);
  }

  async fillStartTime(time: string) {
    await this.page.locator('input[type="time"]').first().fill(time);
  }

  async fillEndTime(time: string) {
    await this.page.locator('input[type="time"]').last().fill(time);
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
