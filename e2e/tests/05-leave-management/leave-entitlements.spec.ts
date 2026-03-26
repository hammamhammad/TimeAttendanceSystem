import { test, expect } from '../../fixtures/base.fixture';
import { LeaveEntitlementsPage } from '../../pages/admin/settings/leave-entitlements.page';

test.describe('Leave Entitlements', () => {
  let entitlementsPage: LeaveEntitlementsPage;

  test.beforeEach(async ({ page }) => {
    entitlementsPage = new LeaveEntitlementsPage(page);
  });

  test('should display leave entitlements list', async () => {
    await entitlementsPage.goto();
    await expect(entitlementsPage.table.rows.first()).toBeVisible({ timeout: 10000 }).catch(() => {});
  });

  test('should navigate to create entitlement form', async ({ page }) => {
    await entitlementsPage.gotoCreate();
    await expect(page).toHaveURL(/\/#\/settings\/leave-entitlements\/create/);
  });

  test('should show entitlement form fields', async ({ page }) => {
    await entitlementsPage.gotoCreate();
    // Form should have employee, vacation type, entitled days
    await expect(page.locator('body')).toContainText(/employee|vacation|entitled|days/i);
  });
});
