import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class VacationFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoCreate() {
    await this.page.goto('/#/employee-vacations/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/employee-vacations/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async selectEmployee(employeeName: string) {
    await this.form.selectSearchable('Employee', employeeName);
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
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }

  async expectValidationError() {
    await expect(this.page.locator('.invalid-feedback, .is-invalid, .alert-danger').first()).toBeVisible();
  }
}
