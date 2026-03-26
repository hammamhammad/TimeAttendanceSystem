import { test, expect } from '../../fixtures/base.fixture';
import { OvertimeConfigPage } from '../../pages/admin/settings/overtime-config.page';

test.describe('Overtime Configuration', () => {
  let configPage: OvertimeConfigPage;

  test.beforeEach(async ({ page }) => {
    configPage = new OvertimeConfigPage(page);
  });

  test('should display overtime configurations list', async () => {
    await configPage.goto();
    await configPage.table.expectMinRows(1);
  });

  test('should view overtime configuration details', async ({ page }) => {
    await configPage.gotoView(1);
    await expect(page.locator('.card').first()).toBeVisible();
  });

  test('should show rate configuration (normal, holiday, off-day)', async ({ page }) => {
    await configPage.gotoView(1);
    await expect(page.locator('body')).toContainText(/rate|normal|holiday|off.*day/i);
  });

  test('should show threshold and cap settings', async ({ page }) => {
    await configPage.gotoView(1);
    await expect(page.locator('body')).toContainText(/threshold|minimum|max/i);
  });

  test('should navigate to create overtime config', async ({ page }) => {
    await configPage.gotoCreate();
    await expect(page).toHaveURL(/\/#\/settings\/overtime\/create/);
  });
});
