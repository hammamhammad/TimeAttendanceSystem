import { Page, expect } from '@playwright/test';

export class AdminLoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/#/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: /login/i }).click();
  }

  async expectOnDashboard() {
    await expect(this.page).toHaveURL(/\/#\/dashboard/, { timeout: 15000 });
  }

  async expectLoginError() {
    await expect(this.page.locator('.alert-danger')).toBeVisible({ timeout: 5000 });
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/\/#\/login/);
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.locator('.alert-danger').textContent()) ?? '';
  }

  async switchLanguage() {
    await this.page.getByRole('button', { name: /عربي|English/i }).click();
  }
}
