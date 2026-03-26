import { test, expect } from '../../fixtures/base.fixture';
import { DepartmentsPage } from '../../pages/admin/departments.page';
import { DepartmentFormPage } from '../../pages/admin/department-form.page';
import { uniqueName } from '../../fixtures/test-data';

test.describe('Departments Management', () => {
  let deptPage: DepartmentsPage;

  test.beforeEach(async ({ page }) => {
    deptPage = new DepartmentsPage(page);
  });

  test('should display departments list', async () => {
    await deptPage.goto();
    await deptPage.expectLoaded();
  });

  test('should display department tree or list with data', async ({ page }) => {
    await deptPage.goto();
    await expect(page.locator('body')).toContainText(/human resources|HR|Information Technology|IT/i);
  });

  test('should view department details', async ({ page }) => {
    await deptPage.viewDepartment(101);
    await expect(page.locator('main').getByRole('heading', { name: /View Department Details/i })).toBeVisible();
  });

  test('should navigate to create department form', async ({ page }) => {
    await deptPage.goto();
    await deptPage.clickCreate();
    await expect(page).toHaveURL(/\/#\/departments\/create/);
  });

  test('should create a new department', async ({ page }) => {
    const deptForm = new DepartmentFormPage(page);
    await deptForm.gotoCreate();
    await deptForm.fillName(uniqueName('TestDept'));
    await deptForm.fillNameAr('قسم اختبار');
    await deptForm.selectBranch('Headquarters');
    await deptForm.submit();
    await deptForm.expectSuccess();
  });

  test('should navigate to edit department', async ({ page }) => {
    await deptPage.editDepartment(101);
    await expect(page).toHaveURL(/\/#\/departments\/\d+\/edit/);
  });

  test('should show parent-child hierarchy', async ({ page }) => {
    await deptPage.goto();
    // Department list should show hierarchical structure
    await expect(page.locator('body')).toContainText(/Headquarters|Branch/i);
  });
});
