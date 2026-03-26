import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class ShiftFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoCreate() {
    await this.page.goto('/#/shifts/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/shifts/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async fillName(name: string) {
    await this.form.fillByPlaceholder('Name', name);
  }

  async fillNameAr(name: string) {
    await this.form.fillByPlaceholder('Arabic', name);
  }

  async selectShiftType(type: 'TimeBased' | 'HoursOnly') {
    await this.page.locator('select').filter({ hasText: /type/i }).first().selectOption({ label: type });
  }

  async fillRequiredHours(hours: string) {
    await this.form.fillByPlaceholder('Required Hours', hours);
  }

  async fillGracePeriod(minutes: string) {
    await this.form.fillByPlaceholder('Grace Period', minutes);
  }

  async addShiftPeriod(startTime: string, endTime: string) {
    await this.page.getByRole('button', { name: /add period/i }).click();
    const periods = this.page.locator('.shift-period, .period-row').last();
    await periods.locator('input[type="time"]').first().fill(startTime);
    await periods.locator('input[type="time"]').last().fill(endTime);
  }

  async toggleWorkingDay(day: string, checked: boolean) {
    await this.form.toggleCheckbox(day, checked);
  }

  async setFlexibleHours(enabled: boolean, minutesBefore?: string, minutesAfter?: string) {
    await this.form.toggleCheckbox('Flexible', enabled);
    if (enabled && minutesBefore) {
      await this.form.fillByPlaceholder('Minutes Before', minutesBefore);
    }
    if (enabled && minutesAfter) {
      await this.form.fillByPlaceholder('Minutes After', minutesAfter);
    }
  }

  async setCoreHours(enabled: boolean, start?: string, end?: string) {
    await this.form.toggleCheckbox('Core Hours', enabled);
    if (enabled && start) {
      await this.page.locator('input[type="time"]').filter({ hasText: /core.*start/i }).fill(start);
    }
    if (enabled && end) {
      await this.page.locator('input[type="time"]').filter({ hasText: /core.*end/i }).fill(end);
    }
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
