import { test, expect } from '../../fixtures/base.fixture';
import { SessionsPage } from '../../pages/admin/reports/sessions.page';

test.describe('Sessions Report', () => {
  let sessionsPage: SessionsPage;

  test.beforeEach(async ({ page }) => {
    sessionsPage = new SessionsPage(page);
    await sessionsPage.goto();
  });

  test('should display sessions page', async () => {
    await sessionsPage.expectLoaded();
  });

  test('should show active sessions tab', async () => {
    await sessionsPage.switchTab('active');
  });

  test('should show current admin session', async () => {
    await sessionsPage.expectActiveSession('systemadmin');
  });

  test('should show login history tab', async () => {
    await sessionsPage.switchTab('history');
  });
});
