import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../../shared/data-table.component';
import { FormHelpers } from '../../shared/form-helpers';
import { NotificationToast } from '../../shared/notification-toast';

export class OvertimeConfigPage {
  readonly table: DataTableHelper;
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async goto() {
    await this.page.goto('/#/settings/overtime');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoCreate() {
    await this.page.goto('/#/settings/overtime/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoView(id: number) {
    await this.page.goto(`/#/settings/overtime/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/settings/overtime/edit/${id}`);
    await this.page.waitForLoadState('networkidle');
  }

  async fillNormalDayRate(rate: string) {
    await this.form.fillByPlaceholder('Normal Day Rate', rate);
  }

  async fillHolidayRate(rate: string) {
    await this.form.fillByPlaceholder('Holiday Rate', rate);
  }

  async fillOffDayRate(rate: string) {
    await this.form.fillByPlaceholder('Off Day Rate', rate);
  }

  async fillMinThreshold(minutes: string) {
    await this.form.fillByPlaceholder('Minimum Threshold', minutes);
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
