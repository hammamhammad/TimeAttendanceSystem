import { test, expect } from '../../fixtures/base.fixture';
import { EmployeesPage } from '../../pages/admin/employees.page';
import { EmployeeFormPage } from '../../pages/admin/employee-form.page';
import { EmployeeViewPage } from '../../pages/admin/employee-view.page';
import { USERS, uniqueName } from '../../fixtures/test-data';

test.describe('Employees Management', () => {
  let employeesPage: EmployeesPage;

  test.beforeEach(async ({ page }) => {
    employeesPage = new EmployeesPage(page);
  });

  test('should display employees list', async () => {
    await employeesPage.goto();
    await employeesPage.expectLoaded();
    await employeesPage.table.expectMinRows(1);
  });

  test('should search for an employee', async () => {
    await employeesPage.goto();
    await employeesPage.searchEmployee('Ahmed');
    await employeesPage.expectEmployeeInTable('Ahmed');
  });

  test('should navigate to create employee form', async ({ page }) => {
    await employeesPage.goto();
    await employeesPage.clickCreate();
    await expect(page).toHaveURL(/\/#\/employees\/create/);
  });

  test('should display create employee form with modern design', async ({ page }) => {
    const formPage = new EmployeeFormPage(page);
    await formPage.gotoCreate();
    await expect(page.locator('.app-modern-form')).toBeVisible();
  });

  test('should create a new employee', async ({ page }) => {
    const formPage = new EmployeeFormPage(page);
    await formPage.gotoCreate();
    const name = uniqueName('Test');
    await formPage.fillBasicInfo({
      firstName: name,
      lastName: 'Employee',
      firstNameAr: 'موظف',
      lastNameAr: 'اختبار',
      email: `${name.toLowerCase()}@test.com`,
      phone: '0501234567',
    });
    await formPage.selectBranch('Headquarters');
    await formPage.selectDepartment('Human Resources');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view employee details', async ({ page }) => {
    const viewPage = new EmployeeViewPage(page);
    await viewPage.goto(USERS.branchManager.employeeId);
    await viewPage.expectLoaded();
    await viewPage.expectName(USERS.branchManager.name);
  });

  test('should show employee status badge', async ({ page }) => {
    const viewPage = new EmployeeViewPage(page);
    await viewPage.goto(USERS.branchManager.employeeId);
    await expect(page.locator('app-status-badge, .badge').first()).toBeVisible();
  });

  test('should navigate to edit employee', async ({ page }) => {
    const formPage = new EmployeeFormPage(page);
    await formPage.gotoEdit(USERS.branchManager.employeeId);
    await expect(page).toHaveURL(/\/#\/employees\/\d+\/edit/);
  });

  test('should filter employees by branch', async () => {
    await employeesPage.goto();
    await employeesPage.filterByBranch('Jeddah');
    // Should show only Jeddah branch employees
    await employeesPage.table.expectMinRows(1);
  });

  test('should show change shift option on employee view', async ({ page }) => {
    const viewPage = new EmployeeViewPage(page);
    await viewPage.goto(USERS.branchManager.employeeId);
    await viewPage.expectLoaded();
    // Change shift action should be available
    await expect(page.locator('body')).toContainText(/shift/i);
  });
});
