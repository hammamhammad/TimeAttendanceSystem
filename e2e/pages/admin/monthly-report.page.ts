import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class MonthlyReportPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/attendance/monthly-report');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/attendance\/monthly-report/);
  }

  async selectMonth(month: string) {
    await this.page.locator('select').filter({ hasText: /month/i }).first().selectOption({ label: month });
    await this.page.waitForLoadState('networkidle');
  }

  async selectYear(year: string) {
    await this.page.locator('select, input').filter({ hasText: /year/i }).first().fill(year);
    await this.page.waitForLoadState('networkidle');
  }

  async filterByBranch(branchName: string) {
    await this.page.locator('select, app-searchable-select').filter({ hasText: /branch/i }).first().selectOption({ label: branchName });
    await this.page.waitForLoadState('networkidle');
  }

  async generateReport() {
    await this.page.getByRole('button', { name: /generate|search|filter/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async exportCSV() {
    await this.page.getByRole('button', { name: /export|csv|download/i }).click();
  }

  async expectDataVisible() {
    await expect(this.table.rows.first()).toBeVisible({ timeout: 15000 });
  }
}
