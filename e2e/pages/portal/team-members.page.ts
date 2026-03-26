import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class TeamMembersPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/team-members');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/team-members/);
  }

  async toggleIndirectReports(include: boolean) {
    const checkbox = this.page.locator('input[type="checkbox"]').filter({ hasText: /indirect/i });
    if (include) await checkbox.check();
    else await checkbox.uncheck();
    await this.page.waitForLoadState('networkidle');
  }

  async searchMember(query: string) {
    await this.table.search(query);
  }

  async getMemberCount(): Promise<number> {
    return this.table.getRowCount();
  }

  async expectMemberVisible(name: string) {
    await expect(this.page.locator('body')).toContainText(name);
  }
}
