import { test as setup, expect } from '@playwright/test';

const ADMIN_USERNAME = 'systemadmin';
const ADMIN_PASSWORD = 'TempP@ssw0rd123!';

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/#/login');
  await page.waitForLoadState('networkidle');

  // Fill login form
  await page.getByRole('textbox', { name: 'Username' }).fill(ADMIN_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(ADMIN_PASSWORD);

  // Submit
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard or change-password redirect
  await page.waitForURL(/\/#\/(dashboard|auth\/change-password)/, { timeout: 15000 });

  // Handle forced password change if needed
  if (page.url().includes('change-password')) {
    await page.goto('/#/dashboard');
  }

  // Verify we're on the dashboard
  await expect(page).toHaveURL(/\/#\/dashboard/);

  // Save authentication state
  await page.context().storageState({ path: './auth/storage/admin.json' });
});
