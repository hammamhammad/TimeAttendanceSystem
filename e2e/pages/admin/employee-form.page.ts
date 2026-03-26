import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class EmployeeFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoCreate() {
    await this.page.goto('/#/employees/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/employees/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async fillBasicInfo(data: {
    firstName?: string;
    lastName?: string;
    firstNameAr?: string;
    lastNameAr?: string;
    email?: string;
    phone?: string;
    nationalId?: string;
  }) {
    if (data.firstName) await this.form.fillByPlaceholder('First Name', data.firstName);
    if (data.lastName) await this.form.fillByPlaceholder('Last Name', data.lastName);
    if (data.firstNameAr) await this.form.fillByPlaceholder('First Name (Arabic)', data.firstNameAr);
    if (data.lastNameAr) await this.form.fillByPlaceholder('Last Name (Arabic)', data.lastNameAr);
    if (data.email) await this.form.fillByPlaceholder('Email', data.email);
    if (data.phone) await this.form.fillByPlaceholder('Phone', data.phone);
    if (data.nationalId) await this.form.fillByPlaceholder('National ID', data.nationalId);
  }

  async selectBranch(branchName: string) {
    await this.form.selectSearchable('Branch', branchName);
  }

  async selectDepartment(deptName: string) {
    await this.form.selectSearchable('Department', deptName);
  }

  async selectGender(gender: string) {
    await this.page.locator('select').filter({ hasText: /gender/i }).first().selectOption({ label: gender });
  }

  async fillHireDate(date: string) {
    await this.form.fillByPlaceholder('Hire Date', date);
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }

  async expectValidationError() {
    await expect(this.page.locator('.invalid-feedback, .is-invalid').first()).toBeVisible();
  }
}
