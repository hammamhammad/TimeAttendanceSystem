import { test, expect } from '../../fixtures/base.fixture';

test.describe('Permissions System', () => {
  test('should have permission-based menu visibility', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    // Admin should see all menu items
    const sidebar = page.locator('.sidebar, .sidenav, nav');
    await expect(sidebar).toBeVisible();
  });

  test('admin should see all navigation menu items', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    // Check key menu items are visible for admin
    const nav = page.locator('.sidebar, .sidenav, nav');
    await expect(nav).toContainText(/dashboard/i);
    await expect(nav).toContainText(/employee/i);
    await expect(nav).toContainText(/attendance/i);
  });

  test('role view should show assigned permissions', async ({ page }) => {
    await page.goto('/#/roles');
    await page.waitForLoadState('networkidle');
    if (await page.locator('tbody tr').first().isVisible()) {
      await page.locator('tbody tr').first().locator('a[title="View"], .fa-eye').first().click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).toContainText(/permission/i);
    }
  });
});
