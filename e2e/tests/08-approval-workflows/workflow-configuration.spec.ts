import { test, expect } from '../../fixtures/base.fixture';
import { WorkflowsPage } from '../../pages/admin/settings/workflows.page';

test.describe('Workflow Configuration', () => {
  let workflowsPage: WorkflowsPage;

  test.beforeEach(async ({ page }) => {
    workflowsPage = new WorkflowsPage(page);
  });

  test('should display workflows list', async () => {
    await workflowsPage.goto();
    await workflowsPage.table.expectMinRows(1);
  });

  test('should show default workflows for vacation, excuse, remote work', async ({ page }) => {
    await workflowsPage.goto();
    await expect(page.locator('body')).toContainText(/vacation|excuse|remote/i);
  });

  test('should view workflow details', async ({ page }) => {
    await workflowsPage.gotoView(1);
    await expect(page.locator('.card').first()).toBeVisible();
  });

  test('should navigate to create workflow', async ({ page }) => {
    await workflowsPage.gotoCreate();
    await expect(page).toHaveURL(/\/#\/settings\/workflows\/create/);
  });

  test('should show workflow steps configuration', async ({ page }) => {
    await workflowsPage.gotoView(1);
    await expect(page.locator('body')).toContainText(/step|approver|type/i);
  });
});
