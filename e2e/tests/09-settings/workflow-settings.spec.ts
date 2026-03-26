import { test, expect } from '../../fixtures/base.fixture';
import { WorkflowsPage } from '../../pages/admin/settings/workflows.page';

test.describe('Workflow Settings', () => {
  let workflowsPage: WorkflowsPage;

  test.beforeEach(async ({ page }) => {
    workflowsPage = new WorkflowsPage(page);
  });

  test('should list all workflow definitions', async () => {
    await workflowsPage.goto();
    await workflowsPage.table.expectMinRows(1);
  });

  test('should show workflow entity types', async ({ page }) => {
    await workflowsPage.goto();
    // Should show workflow types: Vacation, Excuse, RemoteWork
    await expect(page.locator('body')).toContainText(/vacation|excuse|remote/i);
  });

  test('should view workflow with steps', async ({ page }) => {
    await workflowsPage.gotoView(1);
    await expect(page.locator('body')).toContainText(/step|approver/i);
  });

  test('should show approver type options in form', async ({ page }) => {
    await workflowsPage.gotoCreate();
    // Form should have entity type and step configuration
    await expect(page.locator('body')).toContainText(/type|name|step/i);
  });
});
