import { test, expect } from '../../fixtures/base.fixture';
import { RemoteWorkPage } from '../../pages/admin/remote-work.page';
import { RemoteWorkFormPage } from '../../pages/admin/remote-work-form.page';
import { futureDate } from '../../fixtures/test-data';

test.describe('Remote Work CRUD Operations', () => {
  let remotePage: RemoteWorkPage;

  test.beforeEach(async ({ page }) => {
    remotePage = new RemoteWorkPage(page);
  });

  test('should display remote work list', async () => {
    await remotePage.goto();
    await remotePage.expectLoaded();
  });

  test('should navigate to create remote work assignment', async ({ page }) => {
    await remotePage.goto();
    await remotePage.clickCreate();
    await expect(page).toHaveURL(/\/#\/remote-work\/create/);
  });

  test('should create a remote work assignment', async ({ page }) => {
    const formPage = new RemoteWorkFormPage(page);
    await formPage.gotoCreate();
    await formPage.selectEmployee('Ahmed');
    await formPage.selectWorkLocation('Remote');
    await formPage.fillStartDate(futureDate(7));
    await formPage.fillEndDate(futureDate(7));
    await formPage.fillReason('E2E test remote work assignment');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view remote work assignment details', async ({ page }) => {
    await remotePage.goto();
    if (await remotePage.table.hasData()) {
      await remotePage.table.clickView(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card').first()).toBeVisible();
    }
  });

  test('should filter by status', async () => {
    await remotePage.goto();
    await remotePage.filterByStatus('Pending');
  });
});
