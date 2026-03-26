import { Page, expect } from '@playwright/test';

export class AttendancePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/#/attendance');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoDailyAttendance() {
    await this.page.goto('/#/attendance/daily');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoMonthlyReport() {
    await this.page.goto('/#/attendance/monthly-report');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoEmployeeHistory(employeeId: number) {
    await this.page.goto(`/#/attendance/employee/${employeeId}`);
    await this.page.waitForLoadState('networkidle');
  }

  async gotoDailyDetail(employeeId: number, date: string) {
    await this.page.goto(`/#/attendance/daily-detail/${employeeId}/${date}`);
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page.locator('.card, table, app-data-table').first()).toBeVisible({ timeout: 10000 });
  }
}
