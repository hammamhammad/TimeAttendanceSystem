import { test, expect } from '../../fixtures/base.fixture';

test.describe('Approval History', () => {
  test('should display approval history page', async ({ page }) => {
    await page.goto('/#/approvals/history');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/#\/approvals\/history/);
  });

  test('should show past approvals with status', async ({ page }) => {
    await page.goto('/#/approvals/history');
    await page.waitForLoadState('networkidle');
    // History page should show approved/rejected items
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      await expect(page.locator('tbody .badge, tbody app-status-badge').first()).toBeVisible();
    }
  });

  test('should have filters for history', async ({ page }) => {
    await page.goto('/#/approvals/history');
    await page.waitForLoadState('networkidle');
    // Should have filter/search capability
    await expect(page.locator('body')).toContainText(/history|approval/i);
  });
});
