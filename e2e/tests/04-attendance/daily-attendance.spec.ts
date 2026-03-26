import { test, expect } from '../../fixtures/base.fixture';
import { DailyAttendancePage } from '../../pages/admin/daily-attendance.page';
import { today, pastDate } from '../../fixtures/test-data';

test.describe('Daily Attendance', () => {
  let dailyPage: DailyAttendancePage;

  test.beforeEach(async ({ page }) => {
    dailyPage = new DailyAttendancePage(page);
    await dailyPage.goto();
  });

  test('should display daily attendance page', async () => {
    await dailyPage.expectLoaded();
  });

  test('should show attendance records for today', async () => {
    await dailyPage.selectDate(today());
    await dailyPage.expectLoaded();
  });

  test('should show attendance records for past date', async () => {
    await dailyPage.selectDate(pastDate(7));
    await dailyPage.expectLoaded();
  });

  test('should filter by branch', async () => {
    await dailyPage.filterByBranch('Headquarters');
    await dailyPage.expectLoaded();
  });

  test('should filter by status', async () => {
    await dailyPage.filterByStatus('Present');
    await dailyPage.expectLoaded();
  });

  test('should navigate to employee detail on row click', async ({ page }) => {
    // Click on first employee row to see detail
    if (await dailyPage.table.hasData()) {
      await dailyPage.table.clickView(0);
      await page.waitForLoadState('networkidle');
      // Should navigate to detail page
      await expect(page).toHaveURL(/\/#\/attendance\/(daily-detail|employee)/);
    }
  });

  test('should show attendance status badges', async ({ page }) => {
    if (await dailyPage.table.hasData()) {
      // Table should have status badges
      await expect(page.locator('tbody .badge, tbody app-status-badge').first()).toBeVisible();
    }
  });
});
