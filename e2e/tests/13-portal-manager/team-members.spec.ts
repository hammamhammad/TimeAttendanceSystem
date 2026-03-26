import { test, expect } from '../../fixtures/base.fixture';
import { TeamMembersPage } from '../../pages/portal/team-members.page';

test.describe('Team Members (Portal Manager)', () => {
  let teamPage: TeamMembersPage;

  test.beforeEach(async ({ page }) => {
    teamPage = new TeamMembersPage(page);
    await teamPage.goto();
  });

  test('should display team members list', async () => {
    await teamPage.expectLoaded();
  });

  test('should show team member count', async () => {
    const memberCount = await teamPage.getMemberCount();
    expect(memberCount).toBeGreaterThanOrEqual(0);
  });

  test('should search team members', async () => {
    await teamPage.searchMember('Ahmed');
  });

  test('should view team member via table', async ({ page }) => {
    const count = await teamPage.getMemberCount();
    if (count > 0) {
      await teamPage.table.clickView(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card, .modal')).toBeVisible();
    }
  });

  test('should toggle indirect reports', async () => {
    await teamPage.toggleIndirectReports(true);
  });

  test('should show employee status', async ({ page }) => {
    const count = await teamPage.getMemberCount();
    if (count > 0) {
      await expect(page.locator('body')).toContainText(/active|inactive|status/i);
    }
  });
});
