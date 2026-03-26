import { test as base, expect } from '@playwright/test';
import { ApiHelpers } from './api-helpers';
import { DataTableHelper } from '../pages/shared/data-table.component';
import { FormHelpers } from '../pages/shared/form-helpers';
import { ModalHelper } from '../pages/shared/modal.component';
import { NotificationToast } from '../pages/shared/notification-toast';

/** Extended test fixture with common helpers */
export const test = base.extend<{
  api: ApiHelpers;
  dataTable: DataTableHelper;
  form: FormHelpers;
  modal: ModalHelper;
  toast: NotificationToast;
}>({
  api: async ({ request }, use) => {
    const api = new ApiHelpers(request);
    await use(api);
  },

  dataTable: async ({ page }, use) => {
    await use(new DataTableHelper(page));
  },

  form: async ({ page }, use) => {
    await use(new FormHelpers(page));
  },

  modal: async ({ page }, use) => {
    await use(new ModalHelper(page));
  },

  toast: async ({ page }, use) => {
    await use(new NotificationToast(page));
  },
});

export { expect };
