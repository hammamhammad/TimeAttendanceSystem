import { test as setup, expect } from '@playwright/test';

const MANAGER_USERNAME = 'ahmed.rashid';
const MANAGER_PASSWORD = 'Emp@123!';
const NEW_PASSWORD = 'Manager@2026!';

setup('authenticate as manager', async ({ page }) => {
  await page.goto('/#/login');
  await page.waitForLoadState('networkidle');

  // Fill login form
  await page.getByRole('textbox', { name: 'Username' }).fill(MANAGER_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(MANAGER_PASSWORD);

  // Submit
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for redirect
  await page.waitForURL(/\/#\/(dashboard|auth\/change-password)/, { timeout: 15000 });

  // Handle first-login password change
  if (page.url().includes('change-password')) {
    // Change-password form uses label-based fields
    await page.getByLabel(/current password/i).fill(MANAGER_PASSWORD);
    await page.getByLabel(/new password/i).first().fill(NEW_PASSWORD);
    await page.getByLabel(/confirm/i).fill(NEW_PASSWORD);
    await page.getByRole('button', { name: /change password/i }).click();

    // Self-service portal shows a confirmation modal before saving
    const confirmModal = page.locator('.modal.show');
    await confirmModal.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await confirmModal.isVisible()) {
      await confirmModal.getByRole('button', { name: /save|confirm/i }).click();
    }

    await page.waitForURL(/\/#\/dashboard/, { timeout: 15000 });
  }

  await expect(page).toHaveURL(/\/#\/dashboard/);

  // Save authentication state
  await page.context().storageState({ path: './auth/storage/manager.json' });
});
