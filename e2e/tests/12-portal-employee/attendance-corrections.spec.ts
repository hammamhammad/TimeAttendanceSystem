import { test, expect } from '../../fixtures/base.fixture';
import { AttendanceCorrectionsPage } from '../../pages/portal/attendance-corrections.page';
import { pastDate } from '../../fixtures/test-data';

test.describe('Attendance Corrections (Portal)', () => {
  let correctionsPage: AttendanceCorrectionsPage;

  test.beforeEach(async ({ page }) => {
    correctionsPage = new AttendanceCorrectionsPage(page);
  });

  test('should display attendance corrections list', async () => {
    await correctionsPage.goto();
    await correctionsPage.expectLoaded();
  });

  test('should navigate to new correction form', async ({ page }) => {
    await correctionsPage.goto();
    await correctionsPage.clickNew();
    await expect(page).toHaveURL(/\/#\/attendance-corrections\/new/);
  });

  test('should create an attendance correction request', async ({ page }) => {
    await correctionsPage.gotoNew();
    await correctionsPage.fillDate(pastDate(2));
    await correctionsPage.fillCheckInTime('08:00');
    await correctionsPage.fillCheckOutTime('16:00');
    await correctionsPage.fillReason('E2E test - forgot to clock in');
    await correctionsPage.submit();
    await correctionsPage.expectSuccess();
  });

  test('should view correction details', async ({ page }) => {
    await correctionsPage.goto();
    if (await correctionsPage.table.hasData()) {
      await correctionsPage.table.clickView(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card').first()).toBeVisible();
    }
  });
});
