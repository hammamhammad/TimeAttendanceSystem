import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../../shared/data-table.component';

export class VacationTypesPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/settings/vacation-types');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/settings\/vacation-types/);
  }

  async viewType(id: number) {
    await this.page.goto(`/#/vacation-types/${id}`);
    await this.page.waitForLoadState('networkidle');
  }

  async expectTypeVisible(name: string) {
    await expect(this.page.locator('body')).toContainText(name);
  }
}
