import { test, expect } from '../../fixtures/base.fixture';
import { NotificationsPage } from '../../pages/admin/notifications.page';

test.describe('Notification Broadcast', () => {
  let notificationsPage: NotificationsPage;

  test.beforeEach(async ({ page }) => {
    notificationsPage = new NotificationsPage(page);
  });

  test('should display send notification page', async () => {
    await notificationsPage.gotoSend();
  });

  test('should send a notification broadcast', async () => {
    await notificationsPage.gotoSend();
    await notificationsPage.fillTitle('E2E Test Notification');
    await notificationsPage.fillMessage('This is an automated test notification');
    await notificationsPage.selectTarget('All');
    await notificationsPage.submit();
    await notificationsPage.expectSuccess();
  });

  test('should view notification history', async () => {
    await notificationsPage.gotoHistory();
  });

  test('should validate required fields', async ({ page }) => {
    await notificationsPage.gotoSend();
    await notificationsPage.submit();
    await expect(page.locator('.invalid-feedback, .text-danger, .error')).toBeVisible();
  });
});
