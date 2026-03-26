import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class EmployeesPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/employees');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/employees/);
  }

  async clickCreate() {
    await this.page.getByRole('button', { name: /create|add|new/i }).or(this.page.getByRole('link', { name: /create|add|new/i })).first().click();
    await this.page.waitForURL(/\/#\/employees\/create/);
  }

  async searchEmployee(query: string) {
    await this.table.search(query);
  }

  async viewEmployee(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async editEmployee(rowIndex: number) {
    await this.table.clickEdit(rowIndex);
  }

  async deleteEmployee(rowIndex: number) {
    await this.table.clickDelete(rowIndex);
  }

  async filterByBranch(branchName: string) {
    await this.page.locator('app-searchable-select, select').filter({ hasText: /branch/i }).first().selectOption({ label: branchName });
    await this.page.waitForLoadState('networkidle');
  }

  async filterByDepartment(deptName: string) {
    await this.page.locator('app-searchable-select, select').filter({ hasText: /department/i }).first().selectOption({ label: deptName });
    await this.page.waitForLoadState('networkidle');
  }

  async expectEmployeeInTable(name: string) {
    const rowIdx = await this.table.findRowByText(name);
    expect(rowIdx).toBeGreaterThanOrEqual(0);
  }
}
