import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class AttendanceCorrectionsPage {
  readonly table: DataTableHelper;
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async goto() {
    await this.page.goto('/#/attendance-corrections');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoNew() {
    await this.page.goto('/#/attendance-corrections/new');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/attendance-corrections/);
  }

  async clickNew() {
    await this.page.getByRole('link', { name: /new|create|request/i }).first().click();
  }

  async fillDate(date: string) {
    await this.form.fillByPlaceholder('Date', date);
  }

  async fillCheckInTime(time: string) {
    await this.page.locator('input[type="time"]').first().fill(time);
  }

  async fillCheckOutTime(time: string) {
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

  async viewById(id: number) {
    await this.page.goto(`/#/attendance-corrections/${id}`);
    await this.page.waitForLoadState('networkidle');
  }
}
