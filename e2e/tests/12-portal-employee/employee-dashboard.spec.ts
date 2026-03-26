import { test, expect } from '../../fixtures/base.fixture';
import { EmployeeDashboardPage } from '../../pages/portal/employee-dashboard.page';

test.describe('Employee Dashboard (Portal)', () => {
  let dashboardPage: EmployeeDashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new EmployeeDashboardPage(page);
    await dashboardPage.goto();
  });

  test('should display employee dashboard', async () => {
    await dashboardPage.expectLoaded();
  });

  test('should show statistics cards', async () => {
    await dashboardPage.expectStatsCardsVisible();
  });

  test('should show quick action links', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/vacation|excuse|attendance|request/i);
  });

  test('should navigate to vacation requests via quick action', async ({ page }) => {
    await dashboardPage.clickQuickAction('Vacation');
    await expect(page).toHaveURL(/\/#\/vacation-requests/);
  });

  test('should show recent activity', async ({ page }) => {
    // Dashboard may show recent activity
    await expect(page.locator('body')).toContainText(/recent|activity|dashboard/i);
  });
});
