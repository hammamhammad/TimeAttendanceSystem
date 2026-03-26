import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../../shared/data-table.component';
import { FormHelpers } from '../../shared/form-helpers';
import { NotificationToast } from '../../shared/notification-toast';

export class RemoteWorkPolicyPage {
  readonly table: DataTableHelper;
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async goto() {
    await this.page.goto('/#/settings/remote-work-policy');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoCreate() {
    await this.page.goto('/#/settings/remote-work-policy/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoView(id: number) {
    await this.page.goto(`/#/settings/remote-work-policy/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/settings/remote-work-policy/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async fillMaxDaysPerWeek(days: string) {
    await this.form.fillByPlaceholder('Max Days', days);
  }

  async fillNoticePeriod(days: string) {
    await this.form.fillByPlaceholder('Notice', days);
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
