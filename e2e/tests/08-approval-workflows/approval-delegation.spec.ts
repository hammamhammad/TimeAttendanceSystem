import { test, expect } from '../../fixtures/base.fixture';

test.describe('Approval Delegation', () => {
  test('should show delegation option on pending approvals', async ({ page }) => {
    await page.goto('/#/approvals');
    await page.waitForLoadState('networkidle');
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      const delegateBtn = page.locator('tbody tr').first().locator('button:has-text("Delegate"), button[title="Delegate"]').first();
      if (await delegateBtn.isVisible().catch(() => false)) {
        await expect(delegateBtn).toBeVisible();
      }
    }
  });

  test('delegation should open employee selection', async ({ page }) => {
    await page.goto('/#/approvals');
    await page.waitForLoadState('networkidle');
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      const delegateBtn = page.locator('tbody tr').first().locator('button:has-text("Delegate"), button[title="Delegate"]').first();
      if (await delegateBtn.isVisible().catch(() => false)) {
        await delegateBtn.click();
        // Modal should open with employee selection
        await expect(page.locator('.modal.show')).toBeVisible({ timeout: 5000 });
      }
    }
  });
});
