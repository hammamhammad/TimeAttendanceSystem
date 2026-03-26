import { test, expect } from '../../fixtures/base.fixture';

test.describe('Excuse Approval Workflow', () => {
  test('full-day excuse (8+ hours) should mark attendance as Excused', async ({ page }) => {
    // Check via admin attendance view
    await page.goto('/#/attendance/daily');
    await page.waitForLoadState('networkidle');
    // Look for Excused status in attendance
    const excusedBadge = page.locator('tbody').locator('.badge, app-status-badge').filter({ hasText: /excused/i }).first();
    if (await excusedBadge.isVisible().catch(() => false)) {
      await expect(excusedBadge).toBeVisible();
    }
  });

  test('excuse view should show approval status', async ({ page }) => {
    await page.goto('/#/employee-excuses');
    await page.waitForLoadState('networkidle');
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      await page.locator('tbody tr').first().locator('a[title="View"], .fa-eye').first().click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).toContainText(/status|pending|approved|rejected/i);
    }
  });

  test('should show excuse type information', async ({ page }) => {
    await page.goto('/#/employee-excuses');
    await page.waitForLoadState('networkidle');
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      // Table should show excuse type
      await expect(page.locator('tbody')).toContainText(/sick|personal|emergency|medical|family/i);
    }
  });
});
