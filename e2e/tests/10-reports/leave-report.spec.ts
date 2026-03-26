import { test, expect } from '../../fixtures/base.fixture';
import { LeaveReportPage } from '../../pages/admin/reports/leave-report.page';
import { pastDate, today } from '../../fixtures/test-data';

test.describe('Leave Report', () => {
  let reportPage: LeaveReportPage;

  test.beforeEach(async ({ page }) => {
    reportPage = new LeaveReportPage(page);
    await reportPage.goto();
  });

  test('should display leave report page', async () => {
    await reportPage.expectLoaded();
  });

  test('should have date range filters', async ({ page }) => {
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
  });

  test('should generate report with filters', async () => {
    await reportPage.setDateRange(pastDate(90), today());
    await reportPage.generateReport();
  });
});
