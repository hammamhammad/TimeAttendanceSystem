import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class EmployeeExcusesPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/employee-excuses');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/employee-excuses/);
  }

  async clickCreate() {
    await this.page.getByRole('button', { name: /create|add|new/i }).or(this.page.getByRole('link', { name: /create|add|new/i })).first().click();
  }

  async viewExcuse(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async filterByStatus(status: string) {
    await this.page.locator('select').filter({ hasText: /status/i }).first().selectOption({ label: status });
    await this.page.waitForLoadState('networkidle');
  }

  async viewById(id: number) {
    await this.page.goto(`/#/employee-excuses/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }
}
