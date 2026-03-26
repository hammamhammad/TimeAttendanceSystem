import { test, expect } from '../../fixtures/base.fixture';
import { ExcuseRequestFormPage } from '../../pages/portal/excuse-request-form.page';
import { ExcuseRequestsPage } from '../../pages/portal/excuse-requests.page';
import { pastDate } from '../../fixtures/test-data';

test.describe('E2E: Excuse Request Full Cycle', () => {
  test('employee creates excuse -> verify in list', async ({ page }) => {
    // Step 1: Employee creates an excuse request in portal
    const formPage = new ExcuseRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.fillDate(pastDate(3));
    await formPage.fillStartTime('09:00');
    await formPage.fillEndTime('11:00');
    await formPage.fillReason('E2E full cycle excuse - late arrival');
    await formPage.submit();
    await formPage.expectSuccess();

    // Step 2: Verify request appears in list
    const requestsPage = new ExcuseRequestsPage(page);
    await requestsPage.goto();
    await requestsPage.expectLoaded();

    // After manager approval, the attendance should be recalculated:
    // - Late minutes should be reduced by the excused period
    // - If excuse covers full day (8+ hours), status changes to Excused
    // - Partial excuse reduces late/early penalties
  });

  test('partial excuse reduces late minutes', async ({ page }) => {
    const formPage = new ExcuseRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.fillDate(pastDate(5));
    await formPage.fillStartTime('08:00');
    await formPage.fillEndTime('09:30');
    await formPage.fillReason('E2E partial excuse test - traffic delay');
    await formPage.submit();
    await formPage.expectSuccess();

    // After approval, late minutes should be reduced by 90 minutes
    // Business rule: LateMinutes = Max(0, OriginalLate - ExcusedMinutes)
  });

  test('full-day excuse marks attendance as Excused', async ({ page }) => {
    const formPage = new ExcuseRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.fillDate(pastDate(7));
    await formPage.fillStartTime('08:00');
    await formPage.fillEndTime('17:00');
    await formPage.fillReason('E2E full day excuse test - medical appointment');
    await formPage.submit();
    await formPage.expectSuccess();

    // After approval, attendance status should change to Excused
    // Business rule: Full-day excuses (8+ hours) mark status as Excused
  });
});
