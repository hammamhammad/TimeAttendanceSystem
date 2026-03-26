import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../../shared/data-table.component';

export class LeaveReportPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/reports/leaves');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/reports\/leaves/);
  }

  async setDateRange(startDate: string, endDate: string) {
    await this.page.locator('input[type="date"]').first().fill(startDate);
    await this.page.locator('input[type="date"]').last().fill(endDate);
  }

  async filterByBranch(branchName: string) {
    await this.page.locator('select, app-searchable-select').filter({ hasText: /branch/i }).first().selectOption({ label: branchName });
  }

  async generateReport() {
    await this.page.getByRole('button', { name: /generate|search|filter|apply/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async exportCSV() {
    await this.page.getByRole('button', { name: /export|csv|download/i }).click();
  }
}
