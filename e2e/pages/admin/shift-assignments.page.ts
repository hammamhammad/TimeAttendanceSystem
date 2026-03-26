import { Page, expect } from '@playwright/test';
import { FormHelpers } from '../shared/form-helpers';
import { DataTableHelper } from '../shared/data-table.component';
import { NotificationToast } from '../shared/notification-toast';

export class ShiftAssignmentsPage {
  readonly form: FormHelpers;
  readonly table: DataTableHelper;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.form = new FormHelpers(page);
    this.table = new DataTableHelper(page);
    this.toast = new NotificationToast(page);
  }

  async goto() {
    await this.page.goto('/#/shifts/assign');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/shifts\/assign/);
  }

  async selectShift(shiftName: string) {
    await this.form.selectSearchable('Shift', shiftName);
  }

  async selectAssignmentLevel(level: 'Employee' | 'Department' | 'Branch') {
    await this.page.locator('select').filter({ hasText: /level|type/i }).first().selectOption({ label: level });
  }

  async selectEmployee(employeeName: string) {
    await this.form.selectSearchable('Employee', employeeName);
  }

  async selectDepartment(deptName: string) {
    await this.form.selectSearchable('Department', deptName);
  }

  async selectBranch(branchName: string) {
    await this.form.selectSearchable('Branch', branchName);
  }

  async setEffectiveDate(date: string) {
    await this.form.fillByPlaceholder('Effective', date);
  }

  async setEndDate(date: string) {
    await this.form.fillByPlaceholder('End Date', date);
  }

  async submit() {
    await this.form.submit();
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
