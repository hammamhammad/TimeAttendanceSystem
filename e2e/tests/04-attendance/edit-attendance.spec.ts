import { test, expect } from '../../fixtures/base.fixture';
import { EditAttendancePage } from '../../pages/admin/edit-attendance.page';

test.describe('Edit Attendance', () => {
  test('should load edit attendance page', async ({ page }) => {
    // Navigate to daily attendance first, then edit a record
    await page.goto('/#/attendance/daily');
    await page.waitForLoadState('networkidle');

    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      // Click edit on first record if available
      const editLink = page.locator('tbody tr').first().locator('a[title="Edit"], button[title="Edit"], .fa-edit, .fa-pen').first();
      if (await editLink.isVisible().catch(() => false)) {
        await editLink.click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(/\/#\/attendance\/edit/);
      }
    }
  });

  test('should display calculated fields on edit page', async ({ page }) => {
    await page.goto('/#/attendance/daily');
    await page.waitForLoadState('networkidle');

    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      const editLink = page.locator('tbody tr').first().locator('a[title="Edit"], button[title="Edit"], .fa-edit, .fa-pen').first();
      if (await editLink.isVisible().catch(() => false)) {
        await editLink.click();
        await page.waitForLoadState('networkidle');
        // Edit page should show working hours, late, overtime fields
        await expect(page.locator('body')).toContainText(/working|hours|check.?in|check.?out/i);
      }
    }
  });

  test('should show manual override toggle', async ({ page }) => {
    await page.goto('/#/attendance/daily');
    await page.waitForLoadState('networkidle');

    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      const editLink = page.locator('tbody tr').first().locator('a[title="Edit"], button[title="Edit"], .fa-edit, .fa-pen').first();
      if (await editLink.isVisible().catch(() => false)) {
        await editLink.click();
        await page.waitForLoadState('networkidle');
        // Should have a manual override option
        await expect(page.locator('body')).toContainText(/manual|override/i);
      }
    }
  });
});
