import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class UserFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoCreate() {
    await this.page.goto('/#/users/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/users/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async fillUsername(username: string) {
    await this.form.fillByPlaceholder('Username', username);
  }

  async fillEmail(email: string) {
    await this.form.fillByPlaceholder('Email', email);
  }

  async fillPassword(password: string) {
    await this.form.fillByPlaceholder('Password', password);
  }

  async selectRole(roleName: string) {
    await this.page.locator('input[type="checkbox"]').filter({ hasText: roleName }).check();
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
