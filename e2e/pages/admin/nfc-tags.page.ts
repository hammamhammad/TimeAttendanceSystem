import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class NfcTagsPage {
  readonly table: DataTableHelper;
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async goto() {
    await this.page.goto('/#/nfc-tags');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoCreate() {
    await this.page.goto('/#/nfc-tags/create');
    await this.page.waitForLoadState('networkidle');
  }

  async viewById(id: number) {
    await this.page.goto(`/#/nfc-tags/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/nfc-tags/);
  }

  async clickCreate() {
    await this.page.getByRole('button', { name: /create|add|new/i }).or(this.page.getByRole('link', { name: /create|add|new/i })).first().click();
  }

  async fillTagId(tagId: string) {
    await this.form.fillByPlaceholder('Tag ID', tagId);
  }

  async selectBranch(branchName: string) {
    await this.form.selectSearchable('Branch', branchName);
  }

  async fillLabel(label: string) {
    await this.form.fillByPlaceholder('Label', label);
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
