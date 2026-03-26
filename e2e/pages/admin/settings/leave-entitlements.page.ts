import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../../shared/data-table.component';
import { FormHelpers } from '../../shared/form-helpers';
import { NotificationToast } from '../../shared/notification-toast';

export class LeaveEntitlementsPage {
  readonly table: DataTableHelper;
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async goto() {
    await this.page.goto('/#/settings/leave-entitlements');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoCreate() {
    await this.page.goto('/#/settings/leave-entitlements/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/settings/leave-entitlements/edit/${id}`);
    await this.page.waitForLoadState('networkidle');
  }

  async selectEmployee(name: string) {
    await this.form.selectSearchable('Employee', name);
  }

  async selectVacationType(type: string) {
    await this.form.selectSearchable('Vacation Type', type);
  }

  async fillEntitledDays(days: string) {
    await this.form.fillByPlaceholder('Entitled', days);
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
