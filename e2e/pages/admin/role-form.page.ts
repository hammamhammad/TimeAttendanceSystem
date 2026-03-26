import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class RoleFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoCreate() {
    await this.page.goto('/#/roles/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/roles/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async fillName(name: string) {
    await this.form.fillByPlaceholder('Name', name);
  }

  async fillDescription(description: string) {
    await this.page.locator('textarea').first().fill(description);
  }

  async togglePermission(permissionName: string, checked: boolean) {
    const checkbox = this.page.locator('input[type="checkbox"]').filter({ hasText: permissionName });
    if (checked) await checkbox.check();
    else await checkbox.uncheck();
  }

  async selectAllPermissions() {
    await this.page.getByRole('button', { name: /select all/i }).click();
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
