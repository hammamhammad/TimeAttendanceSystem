import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class DepartmentsPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/departments');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/departments/);
  }

  async clickCreate() {
    await this.page.getByRole('button', { name: /create|add|new/i }).or(this.page.getByRole('link', { name: /create|add|new/i })).first().click();
  }

  async viewDepartment(id: number) {
    await this.page.goto(`/#/departments/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async editDepartment(id: number) {
    await this.page.goto(`/#/departments/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async searchDepartment(query: string) {
    await this.table.search(query);
  }

  async expectDepartmentVisible(name: string) {
    await expect(this.page.locator('body')).toContainText(name);
  }
}
