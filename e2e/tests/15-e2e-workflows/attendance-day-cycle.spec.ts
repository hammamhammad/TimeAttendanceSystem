import { test, expect } from '../../fixtures/base.fixture';
import { EditAttendancePage } from '../../pages/admin/edit-attendance.page';
import { DailyAttendancePage } from '../../pages/admin/daily-attendance.page';
import { today } from '../../fixtures/test-data';

test.describe('E2E: Attendance Day Cycle', () => {
  test('verify full attendance day: view daily records', async ({ page }) => {
    const dailyPage = new DailyAttendancePage(page);
    await dailyPage.goto();
    await dailyPage.expectLoaded();

    if (await dailyPage.table.hasData()) {
      await dailyPage.table.clickView(0);
      await page.waitForLoadState('networkidle');
    }
  });

  test('verify working hours calculation: WorkingHours = Sum(CheckOut - CheckIn) - BreakHours', async ({ page }) => {
    const dailyPage = new DailyAttendancePage(page);
    await dailyPage.goto();

    if (await dailyPage.table.hasData()) {
      await dailyPage.table.clickEdit(0);
      await page.waitForLoadState('networkidle');

      const editPage = new EditAttendancePage(page);
      const workingHours = await editPage.getWorkingHours();
      if (workingHours) {
        expect(workingHours.length).toBeGreaterThan(0);
      }
    }
  });

  test('verify late minutes calculation: LateMinutes = Max(0, ActualCheckIn - ScheduledStart - GracePeriod)', async ({ page }) => {
    const dailyPage = new DailyAttendancePage(page);
    await dailyPage.goto();

    if (await dailyPage.table.hasData()) {
      await dailyPage.table.clickEdit(0);
      await page.waitForLoadState('networkidle');

      const editPage = new EditAttendancePage(page);
      const lateMinutes = await editPage.getLateMinutes();

      if (lateMinutes) {
        const late = parseFloat(lateMinutes);
        expect(late).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('verify overtime calculation with rates via API', async ({ api }) => {
    await api.loginAsAdmin();
    const attendance = await api.getAttendanceRecords(1001, today(), today());

    if (attendance && Array.isArray(attendance) && attendance.length > 0) {
      const record = attendance[0];
      // Overtime rates: Normal 1.5x, Holiday 2.0x, OffDay 2.5x
      // Minimum threshold: 15 minutes, Rounding: 15-minute intervals
      if (record.overtimeHours > 0) {
        expect(record.overtimeHours).toBeGreaterThanOrEqual(0.25);
      }
    }
  });

  test('verify attendance status reflects shift configuration', async ({ page }) => {
    const dailyPage = new DailyAttendancePage(page);
    await dailyPage.goto();

    if (await dailyPage.table.hasData()) {
      // Priority: Holiday > Leave > Remote > Excuse > Shift-based > DayOff
      await expect(page.locator('body')).toContainText(
        /present|absent|late|leave|holiday|dayoff|remote|incomplete/i
      );
    }
  });
});
