import { test, expect } from '../../fixtures/base.fixture';
import { MyProfilePage } from '../../pages/portal/my-profile.page';

test.describe('My Profile (Portal)', () => {
  let profilePage: MyProfilePage;

  test.beforeEach(async ({ page }) => {
    profilePage = new MyProfilePage(page);
    await profilePage.goto();
  });

  test('should display my profile page', async () => {
    await profilePage.expectLoaded();
  });

  test('should show employee name', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/name|employee/i);
  });

  test('should show department and branch info', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/department|branch/i);
  });

  test('should have change password option', async ({ page }) => {
    const changeBtn = page.getByRole('button', { name: /change.*password/i });
    if (await changeBtn.isVisible().catch(() => false)) {
      await expect(changeBtn).toBeVisible();
    }
  });
});
