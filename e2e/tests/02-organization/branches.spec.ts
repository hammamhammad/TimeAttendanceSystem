import { test, expect } from '../../fixtures/base.fixture';
import { BranchesPage } from '../../pages/admin/branches.page';
import { BRANCHES } from '../../fixtures/test-data';

test.describe('Branches Management', () => {
  let branchesPage: BranchesPage;

  test.beforeEach(async ({ page }) => {
    branchesPage = new BranchesPage(page);
    await branchesPage.goto();
  });

  test('should display branches list', async () => {
    await branchesPage.expectLoaded();
    await branchesPage.table.expectMinRows(1);
  });

  test('should show Headquarters branch', async () => {
    await branchesPage.expectBranchInTable('Headquarters');
  });

  test('should search for a branch', async () => {
    await branchesPage.searchBranch('Jeddah');
    await branchesPage.expectBranchInTable('Jeddah');
  });

  test('should view branch details', async ({ page }) => {
    await branchesPage.viewBranchById(BRANCHES.headquarters.id);
    await expect(page.locator('.app-detail-card')).toBeVisible();
    await expect(page.locator('body')).toContainText('Headquarters');
  });

  test('should navigate to edit branch', async ({ page }) => {
    await branchesPage.editBranchById(BRANCHES.headquarters.id);
    await expect(page).toHaveURL(/\/#\/branches\/\d+\/edit/);
  });

  test('should display branch info with departments', async ({ page }) => {
    await branchesPage.viewBranchById(BRANCHES.headquarters.id);
    // Branch view should show departments
    await expect(page.locator('body')).toContainText(/department|Department/i);
  });
});
