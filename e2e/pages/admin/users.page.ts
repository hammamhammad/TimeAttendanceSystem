import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class UsersPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/users');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/users/);
  }

  async clickCreate() {
    await this.page.getByRole('button', { name: /create|add|new/i }).or(this.page.getByRole('link', { name: /create|add|new/i })).first().click();
  }

  async viewUser(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async editUser(rowIndex: number) {
    await this.table.clickEdit(rowIndex);
  }

  async searchUser(query: string) {
    await this.table.search(query);
  }

  async viewById(id: number) {
    await this.page.goto(`/#/users/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }
}
