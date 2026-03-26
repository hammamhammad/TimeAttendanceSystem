import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class EmployeeVacationsPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/employee-vacations');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/employee-vacations/);
  }

  async clickCreate() {
    await this.page.getByRole('button', { name: /create|add|new/i }).or(this.page.getByRole('link', { name: /create|add|new/i })).first().click();
  }

  async viewVacation(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async editVacation(rowIndex: number) {
    await this.table.clickEdit(rowIndex);
  }

  async filterByStatus(status: string) {
    await this.page.locator('select').filter({ hasText: /status/i }).first().selectOption({ label: status });
    await this.page.waitForLoadState('networkidle');
  }

  async searchVacation(query: string) {
    await this.table.search(query);
  }

  async viewById(id: number) {
    await this.page.goto(`/#/employee-vacations/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }
}
