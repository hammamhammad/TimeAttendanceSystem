import { test, expect } from '../../fixtures/base.fixture';
import { VacationRequestsPage } from '../../pages/portal/vacation-requests.page';
import { VacationRequestFormPage } from '../../pages/portal/vacation-request-form.page';
import { futureDate } from '../../fixtures/test-data';

test.describe('Portal Vacation Requests', () => {
  let requestsPage: VacationRequestsPage;

  test.beforeEach(async ({ page }) => {
    requestsPage = new VacationRequestsPage(page);
  });

  test('should display vacation requests list', async () => {
    await requestsPage.goto();
    await requestsPage.expectLoaded();
  });

  test('should navigate to new request form', async ({ page }) => {
    await requestsPage.goto();
    await requestsPage.clickNew();
    await expect(page).toHaveURL(/\/#\/vacation-requests\/new/);
  });

  test('should create a vacation request', async ({ page }) => {
    const formPage = new VacationRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.selectVacationType('Annual');
    await formPage.fillStartDate(futureDate(21));
    await formPage.fillEndDate(futureDate(23));
    await formPage.fillReason('E2E test vacation from portal');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view request details', async ({ page }) => {
    await requestsPage.goto();
    if (await requestsPage.table.hasData()) {
      await requestsPage.viewRequest(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card').first()).toBeVisible();
    }
  });

  test('should show request status', async () => {
    await requestsPage.goto();
    if (await requestsPage.table.hasData()) {
      const status = await requestsPage.getRequestStatus(0);
      expect(status.length).toBeGreaterThan(0);
    }
  });

  test('should filter by status', async () => {
    await requestsPage.goto();
    await requestsPage.filterByStatus('Pending');
  });
});
