import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class ExcuseFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoCreate() {
    await this.page.goto('/#/employee-excuses/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/employee-excuses/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async selectEmployee(name: string) {
    await this.form.selectSearchable('Employee', name);
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
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
