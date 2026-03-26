import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class VacationRequestFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoNew() {
    await this.page.goto('/#/vacation-requests/new');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/vacation-requests/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async selectVacationType(typeName: string) {
    await this.form.selectSearchable('Vacation Type', typeName);
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

  async expectValidationError() {
    await expect(this.page.locator('.invalid-feedback, .is-invalid, .alert-danger').first()).toBeVisible();
  }

  async getBalanceInfo(): Promise<string> {
    return (await this.page.locator('.balance, .info-text, .help-text').first().textContent())?.trim() ?? '';
  }
}
