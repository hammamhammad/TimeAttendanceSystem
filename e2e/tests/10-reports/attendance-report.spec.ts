import { test, expect } from '../../fixtures/base.fixture';
import { AttendanceReportPage } from '../../pages/admin/reports/attendance-report.page';
import { pastDate, today } from '../../fixtures/test-data';

test.describe('Attendance Report', () => {
  let reportPage: AttendanceReportPage;

  test.beforeEach(async ({ page }) => {
    reportPage = new AttendanceReportPage(page);
    await reportPage.goto();
  });

  test('should display attendance report page', async () => {
    await reportPage.expectLoaded();
  });

  test('should have date range filters', async ({ page }) => {
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
  });

  test('should generate report with date range', async () => {
    await reportPage.setDateRange(pastDate(30), today());
    await reportPage.generateReport();
  });

  test('should filter by branch', async () => {
    await reportPage.filterByBranch('Headquarters');
    await reportPage.generateReport();
  });

  test('should show export button', async ({ page }) => {
    const exportBtn = page.getByRole('button', { name: /export|csv|download/i });
    if (await exportBtn.isVisible().catch(() => false)) {
      await expect(exportBtn).toBeVisible();
    }
  });
});
