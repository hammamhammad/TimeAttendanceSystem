import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class DailyAttendancePage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/attendance/daily');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/attendance\/daily/);
  }

  async selectDate(date: string) {
    await this.page.locator('input[type="date"]').first().fill(date);
    await this.page.waitForLoadState('networkidle');
  }

  async filterByBranch(branchName: string) {
    await this.page.locator('select, app-searchable-select').filter({ hasText: /branch/i }).first().selectOption({ label: branchName });
    await this.page.waitForLoadState('networkidle');
  }

  async filterByDepartment(deptName: string) {
    await this.page.locator('select, app-searchable-select').filter({ hasText: /department/i }).first().selectOption({ label: deptName });
    await this.page.waitForLoadState('networkidle');
  }

  async filterByStatus(status: string) {
    await this.page.locator('select').filter({ hasText: /status/i }).first().selectOption({ label: status });
    await this.page.waitForLoadState('networkidle');
  }

  async clickEmployeeRow(employeeName: string) {
    const rowIdx = await this.table.findRowByText(employeeName);
    if (rowIdx >= 0) {
      await this.table.clickView(rowIdx);
    }
  }

  async getStatusForEmployee(employeeName: string): Promise<string> {
    const rowIdx = await this.table.findRowByText(employeeName);
    if (rowIdx < 0) return '';
    const row = this.table.rows.nth(rowIdx);
    return (await row.locator('.badge, app-status-badge').first().textContent())?.trim() ?? '';
  }

  async expectEmployeeStatus(employeeName: string, status: string) {
    const actualStatus = await this.getStatusForEmployee(employeeName);
    expect(actualStatus.toLowerCase()).toContain(status.toLowerCase());
  }
}
