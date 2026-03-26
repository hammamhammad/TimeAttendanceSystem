import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class EditAttendancePage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async goto(attendanceId: number) {
    await this.page.goto(`/#/attendance/edit/${attendanceId}`);
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/attendance\/edit/);
  }

  async setCheckInTime(time: string) {
    const checkInInput = this.page.locator('input[type="time"]').first();
    await checkInInput.fill(time);
  }

  async setCheckOutTime(time: string) {
    const checkOutInput = this.page.locator('input[type="time"]').nth(1);
    await checkOutInput.fill(time);
  }

  async setStatus(status: string) {
    await this.page.locator('select').filter({ hasText: /status/i }).first().selectOption({ label: status });
  }

  async toggleManualOverride(checked: boolean) {
    await this.form.toggleCheckbox('Manual Override', checked);
  }

  async getWorkingHours(): Promise<string> {
    return (await this.page.locator('[class*="working-hours"], dd:near(dt:has-text("Working Hours"))').first().textContent())?.trim() ?? '';
  }

  async getLateMinutes(): Promise<string> {
    return (await this.page.locator('[class*="late"], dd:near(dt:has-text("Late"))').first().textContent())?.trim() ?? '';
  }

  async getOvertimeHours(): Promise<string> {
    return (await this.page.locator('[class*="overtime"], dd:near(dt:has-text("Overtime"))').first().textContent())?.trim() ?? '';
  }

  async getScheduledHours(): Promise<string> {
    return (await this.page.locator('dd:near(dt:has-text("Scheduled"))').first().textContent())?.trim() ?? '';
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
