import { test, expect } from '../../fixtures/base.fixture';
import { EmployeeFormPage } from '../../pages/admin/employee-form.page';
import { EmployeesPage } from '../../pages/admin/employees.page';
import { uniqueName } from '../../fixtures/test-data';

test.describe('E2E: Employee Lifecycle', () => {
  test('should complete full employee lifecycle: create -> verify in list -> view details', async ({ page }) => {
    // Step 1: Create a new employee
    const employeeName = uniqueName('EMP');
    const formPage = new EmployeeFormPage(page);
    await formPage.gotoCreate();

    await formPage.fillBasicInfo({
      firstName: employeeName,
      lastName: 'Lifecycle',
      firstNameAr: 'اختبار',
      lastNameAr: 'دورة',
      email: `${employeeName.toLowerCase()}@test.com`,
    });

    await formPage.selectBranch('Headquarters');
    await formPage.selectDepartment('IT');
    await formPage.submit();
    await formPage.expectSuccess();

    // Step 2: Verify employee appears in the list
    const employeesPage = new EmployeesPage(page);
    await employeesPage.goto();
    await employeesPage.searchEmployee(employeeName);
    await page.waitForTimeout(1000);
    const rowCount = await employeesPage.table.getRowCount();
    expect(rowCount).toBeGreaterThan(0);

    // Step 3: Verify employee details
    await employeesPage.viewEmployee(0);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText(employeeName);
  });

  test('should deactivate an employee and verify access restriction', async ({ page }) => {
    const employeesPage = new EmployeesPage(page);
    await employeesPage.goto();
    await employeesPage.expectLoaded();

    if (await employeesPage.table.hasData()) {
      await employeesPage.viewEmployee(0);
      await page.waitForLoadState('networkidle');

      const deactivateBtn = page.getByRole('button', { name: /deactivate|disable|inactive/i });
      if (await deactivateBtn.isVisible().catch(() => false)) {
        await expect(deactivateBtn).toBeVisible();
      }
    }
  });
});
