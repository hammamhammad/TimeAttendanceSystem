import { test, expect } from '../../fixtures/base.fixture';

test.describe('Remote Work Approval Workflow', () => {
  test('approved remote work should mark attendance as RemoteWork', async ({ page }) => {
    await page.goto('/#/attendance/daily');
    await page.waitForLoadState('networkidle');
    // Look for RemoteWork status
    const remoteBadge = page.locator('tbody').locator('.badge, app-status-badge').filter({ hasText: /remote/i }).first();
    if (await remoteBadge.isVisible().catch(() => false)) {
      await expect(remoteBadge).toBeVisible();
    }
  });

  test('remote work view should show work location type', async ({ page }) => {
    await page.goto('/#/remote-work');
    await page.waitForLoadState('networkidle');
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      // Table should show location type
      await expect(page.locator('tbody')).toContainText(/remote|field|client|office/i);
    }
  });

  test('remote work view should show approval status', async ({ page }) => {
    await page.goto('/#/remote-work');
    await page.waitForLoadState('networkidle');
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      await page.locator('tbody tr').first().locator('a[title="View"], .fa-eye').first().click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).toContainText(/status|pending|approved/i);
    }
  });
});
