import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../../shared/data-table.component';
import { FormHelpers } from '../../shared/form-helpers';
import { NotificationToast } from '../../shared/notification-toast';

export class WorkflowsPage {
  readonly table: DataTableHelper;
  readonly form: FormHelpers;
  readonly toast: NotificationToast;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
    this.form = new FormHelpers(page);
    this.toast = new NotificationToast(page);
  }

  async goto() {
    await this.page.goto('/#/settings/workflows');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoCreate() {
    await this.page.goto('/#/settings/workflows/create');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoView(id: number) {
    await this.page.goto(`/#/settings/workflows/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEdit(id: number) {
    await this.page.goto(`/#/settings/workflows/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }

  async fillName(name: string) {
    await this.form.fillByPlaceholder('Name', name);
  }

  async selectEntityType(type: string) {
    await this.page.locator('select').filter({ hasText: /entity.*type|type/i }).first().selectOption({ label: type });
  }

  async addStep(approverType: string) {
    await this.page.getByRole('button', { name: /add step/i }).click();
    await this.page.locator('select').filter({ hasText: /approver/i }).last().selectOption({ label: approverType });
  }

  async submit() {
    await this.form.submit('Save');
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
  }
}
