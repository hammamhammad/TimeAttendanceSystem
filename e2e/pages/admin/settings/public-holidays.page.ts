import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../../shared/data-table.component';
import { FormHelpers } from '../../shared/form-helpers';
import { NotificationToast } from '../../shared/notification-toast';

export class PublicHolidaysPage {
  readonly table: DataTableHelper;
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async goto() {
    await this.page.goto('/#/settings/public-holidays');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoCreate() {
    await this.page.goto('/#/settings/public-holidays/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoView(id: number) {
    await this.page.goto(`/#/settings/public-holidays/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async fillName(name: string) {
    await this.form.fillByPlaceholder('Name', name);
  }

  async fillNameAr(name: string) {
    await this.form.fillByPlaceholder('Arabic', name);
  }

  async fillDate(date: string) {
    await this.form.fillByPlaceholder('Date', date);
  }

  async toggleRecurring(checked: boolean) {
    await this.form.toggleCheckbox('Recurring', checked);
  }

  async selectBranch(branchName: string) {
    await this.form.selectSearchable('Branch', branchName);
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
