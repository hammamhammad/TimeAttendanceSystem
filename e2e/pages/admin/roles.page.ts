import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class RolesPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/roles');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/roles/);
  }

  async clickCreate() {
    await this.page.getByRole('button', { name: /create|add|new/i }).or(this.page.getByRole('link', { name: /create|add|new/i })).first().click();
  }

  async viewRole(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async editRole(rowIndex: number) {
    await this.table.clickEdit(rowIndex);
  }

  async viewById(id: number) {
    await this.page.goto(`/#/roles/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }
}
