import { test, expect } from '../../fixtures/base.fixture';
import { MyAttendancePage } from '../../pages/portal/my-attendance.page';
import { pastDate, today } from '../../fixtures/test-data';

test.describe('My Attendance (Portal)', () => {
  let attendancePage: MyAttendancePage;

  test.beforeEach(async ({ page }) => {
    attendancePage = new MyAttendancePage(page);
    await attendancePage.goto();
  });

  test('should display my attendance page', async () => {
    await attendancePage.expectLoaded();
  });

  test('should have date range filter', async ({ page }) => {
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
  });

  test('should filter attendance by date range', async () => {
    await attendancePage.setDateRange(pastDate(30), today());
    await attendancePage.applyFilter();
  });

  test('should show attendance records with status', async ({ page }) => {
    await attendancePage.setDateRange(pastDate(7), today());
    await attendancePage.applyFilter();
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      await expect(page.locator('tbody .badge, tbody app-status-badge').first()).toBeVisible();
    }
  });
});
