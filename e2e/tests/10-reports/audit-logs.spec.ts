import { test, expect } from '../../fixtures/base.fixture';
import { AuditLogsPage } from '../../pages/admin/reports/audit-logs.page';
import { pastDate, today } from '../../fixtures/test-data';

test.describe('Audit Logs', () => {
  let auditPage: AuditLogsPage;

  test.beforeEach(async ({ page }) => {
    auditPage = new AuditLogsPage(page);
    await auditPage.goto();
  });

  test('should display audit logs page', async () => {
    await auditPage.expectLoaded();
  });

  test('should show audit log entries', async () => {
    await auditPage.table.expectMinRows(1);
  });

  test('should filter by entity type', async () => {
    await auditPage.filterByEntity('Employee');
  });

  test('should filter by action type', async () => {
    await auditPage.filterByAction('Create');
  });

  test('should filter by date range', async () => {
    await auditPage.setDateRange(pastDate(7), today());
  });

  test('should view audit log detail', async ({ page }) => {
    if (await auditPage.table.hasData()) {
      await auditPage.viewDetail(0);
      await auditPage.expectDetailModalOpen();
    }
  });
});
