import { Page } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { NotificationToast } from '../shared/notification-toast';

export class DepartmentFormPage {
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async gotoCreate() {
    await this.page.goto('/#/departments/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/departments/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async fillName(name: string) {
    await this.form.fillByPlaceholder('Name', name);
  }

  async fillNameAr(name: string) {
    await this.form.fillByPlaceholder('Arabic', name);
  }

  async selectBranch(branchName: string) {
    await this.form.selectSearchable('Branch', branchName);
  }

  async selectParentDepartment(deptName: string) {
    await this.form.selectSearchable('Parent', deptName);
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
