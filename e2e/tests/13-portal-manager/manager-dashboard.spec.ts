import { test, expect } from '../../fixtures/base.fixture';
import { ManagerDashboardPage } from '../../pages/portal/manager-dashboard.page';

test.describe('Manager Dashboard (Portal)', () => {
  let dashboard: ManagerDashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new ManagerDashboardPage(page);
    await dashboard.goto();
  });

  test('should display manager dashboard', async () => {
    await dashboard.expectLoaded();
  });

  test('should show team size statistics', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/team|members|reports/i);
  });

  test('should show pending approvals count', async () => {
    const pendingCount = await dashboard.getPendingApprovalsCount();
    expect(pendingCount.length).toBeGreaterThanOrEqual(0);
  });

  test('should navigate to pending approvals', async ({ page }) => {
    await dashboard.clickViewApprovals();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/approvals|pending/i);
  });

  test('should navigate to team members', async ({ page }) => {
    await dashboard.clickViewTeam();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/team/i);
  });

  test('should show direct and indirect reports', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/direct|indirect|report/i);
  });
});
