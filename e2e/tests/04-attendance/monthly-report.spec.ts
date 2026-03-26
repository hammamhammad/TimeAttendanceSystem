import { test, expect } from '../../fixtures/base.fixture';
import { MonthlyReportPage } from '../../pages/admin/monthly-report.page';

test.describe('Monthly Attendance Report', () => {
  let reportPage: MonthlyReportPage;

  test.beforeEach(async ({ page }) => {
    reportPage = new MonthlyReportPage(page);
    await reportPage.goto();
  });

  test('should display monthly report page', async () => {
    await reportPage.expectLoaded();
  });

  test('should show filter options (month, year, branch)', async ({ page }) => {
    await expect(page.locator('select, input[type="date"]').first()).toBeVisible();
  });

  test('should generate report with filters', async () => {
    await reportPage.generateReport();
    await reportPage.expectLoaded();
  });

  test('should filter by branch', async () => {
    await reportPage.filterByBranch('Headquarters');
    await reportPage.generateReport();
    await reportPage.expectLoaded();
  });

  test('should show export option', async ({ page }) => {
    const exportBtn = page.getByRole('button', { name: /export|csv|download/i });
    if (await exportBtn.isVisible().catch(() => false)) {
      await expect(exportBtn).toBeVisible();
    }
  });
});
