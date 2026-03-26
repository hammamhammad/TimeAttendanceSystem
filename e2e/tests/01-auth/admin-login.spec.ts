import { test, expect } from '../../fixtures/base.fixture';
import { AdminLoginPage } from '../../pages/admin/login.page';
import { USERS } from '../../fixtures/test-data';

test.describe('Admin Login', () => {
  test.use({ storageState: { cookies: [], origins: [] } }); // Clear auth state

  let loginPage: AdminLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new AdminLoginPage(page);
    await loginPage.goto();
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });

  test('should login with valid admin credentials', async () => {
    await loginPage.login(USERS.admin.username, USERS.admin.password);
    await loginPage.expectOnDashboard();
  });

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invaliduser', 'wrongpassword');
    await loginPage.expectLoginError();
  });

  test('should show error with empty credentials', async ({ page }) => {
    // Login button is disabled when form fields are empty (Angular form validation)
    await expect(page.getByRole('button', { name: /login/i })).toBeDisabled();
  });

  test('should show error with valid username but wrong password', async () => {
    await loginPage.login(USERS.admin.username, 'WrongP@ssword!');
    await loginPage.expectLoginError();
  });

  test('should have language toggle button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /عربي|English/i })).toBeVisible();
  });

  test('should toggle language when clicking language button', async ({ page }) => {
    const langButton = page.getByRole('button', { name: /عربي|English/i });
    const initialText = await langButton.textContent();
    await langButton.click();
    const newText = await langButton.textContent();
    expect(newText).not.toBe(initialText);
  });
});
