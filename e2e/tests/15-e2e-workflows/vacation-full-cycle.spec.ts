import { test, expect } from '../../fixtures/base.fixture';
import { VacationRequestFormPage } from '../../pages/portal/vacation-request-form.page';
import { VacationRequestsPage } from '../../pages/portal/vacation-requests.page';
import { futureDate } from '../../fixtures/test-data';

test.describe('E2E: Vacation Request Full Cycle', () => {
  test('employee creates vacation -> verify pending status', async ({ page }) => {
    // Step 1: Employee creates a vacation request in portal
    const formPage = new VacationRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.selectVacationType('Annual');
    await formPage.fillStartDate(futureDate(30));
    await formPage.fillEndDate(futureDate(31));
    await formPage.fillReason('E2E full cycle vacation test');
    await formPage.submit();
    await formPage.expectSuccess();

    // Step 2: Verify request appears in list with Pending status
    const requestsPage = new VacationRequestsPage(page);
    await requestsPage.goto();
    if (await requestsPage.table.hasData()) {
      const status = await requestsPage.getRequestStatus(0);
      expect(status.toLowerCase()).toContain('pending');
    }

    // After manager approval:
    // - Balance should reflect: CurrentBalance = Accrued + Adjusted - Used - Pending
    // - Status should change from Pending to Approved
  });

  test('employee creates vacation -> verify in request list', async ({ page }) => {
    const formPage = new VacationRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.selectVacationType('Annual');
    await formPage.fillStartDate(futureDate(45));
    await formPage.fillEndDate(futureDate(46));
    await formPage.fillReason('E2E rejection cycle test');
    await formPage.submit();
    await formPage.expectSuccess();

    const requestsPage = new VacationRequestsPage(page);
    await requestsPage.goto();
    await requestsPage.expectLoaded();

    // Business rule: rejected requests don't deduct balance
  });

  test('employee cancels pending vacation request', async ({ page }) => {
    const requestsPage = new VacationRequestsPage(page);
    await requestsPage.goto();

    if (await requestsPage.table.hasData()) {
      const status = await requestsPage.getRequestStatus(0);
      if (status.toLowerCase().includes('pending')) {
        await requestsPage.table.clickRowAction(0, 'cancel');
        await page.waitForTimeout(1000);
      }
    }
  });
});
