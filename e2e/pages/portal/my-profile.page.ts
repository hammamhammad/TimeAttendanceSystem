import { Page, expect } from '@playwright/test';

export class MyProfilePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/#/my-profile');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/my-profile/);
    await expect(this.page.locator('.card').first()).toBeVisible({ timeout: 10000 });
  }

  async getFieldValue(label: string): Promise<string> {
    const row = this.page.locator('dt, .label').filter({ hasText: label }).first();
    const value = row.locator('~ dd, + dd, ~ .value').first();
    return (await value.textContent())?.trim() ?? '';
  }

  async expectName(name: string) {
    await expect(this.page.locator('body')).toContainText(name);
  }

  async expectDepartment(dept: string) {
    await expect(this.page.locator('body')).toContainText(dept);
  }

  async clickChangePassword() {
    await this.page.getByRole('button', { name: /change password/i }).click();
  }
}
