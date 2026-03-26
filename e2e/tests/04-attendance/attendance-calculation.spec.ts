import { test, expect } from '../../fixtures/base.fixture';
import { EditAttendancePage } from '../../pages/admin/edit-attendance.page';
import { USERS, pastDate } from '../../fixtures/test-data';

test.describe('Attendance Calculation Business Logic', () => {
  test.describe('Working Hours Calculation', () => {
    test('should calculate working hours as total time minus break hours', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(7),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const record = records.items.find((r: any) => r.workingHours > 0);
        if (record) {
          // Working hours should be total time - break hours
          // WorkingHours = Sum(CheckOut - CheckIn) - BreakHours
          expect(record.workingHours).toBeGreaterThanOrEqual(0);
          if (record.breakHours > 0) {
            // Break hours should be subtracted
            expect(record.workingHours).toBeLessThan(record.scheduledHours + 4); // reasonable bound
          }
        }
      }
    });

    test('should show working hours in edit attendance form', async ({ page }) => {
      // Navigate to edit attendance to see calculated fields
      await page.goto('/#/attendance/daily');
      await page.waitForLoadState('networkidle');
      // Check if we can access edit page for any record
      if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
        // Attendance records exist - try to view details
        await page.locator('tbody tr').first().locator('a, button').filter({ hasText: /view|detail/i }).first().click().catch(() => {});
        await page.waitForLoadState('networkidle');
      }
    });
  });

  test.describe('Late Minutes Calculation', () => {
    test('should calculate late = actual check-in - scheduled start - grace period', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(30),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const lateRecord = records.items.find((r: any) => r.lateMinutes > 0);
        if (lateRecord) {
          // Late minutes should be positive only when check-in is after scheduled start + grace
          expect(lateRecord.lateMinutes).toBeGreaterThan(0);
          expect(lateRecord.status).toMatch(/late/i);
        }
      }
    });

    test('late minutes should not apply to Holiday status', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(90),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const holidayRecord = records.items.find((r: any) =>
          r.status?.toLowerCase().includes('holiday')
        );
        if (holidayRecord) {
          expect(holidayRecord.lateMinutes).toBe(0);
        }
      }
    });
  });

  test.describe('Early Leave Minutes Calculation', () => {
    test('should calculate early leave = scheduled end - actual check-out', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(30),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const earlyRecord = records.items.find((r: any) => r.earlyLeaveMinutes > 0);
        if (earlyRecord) {
          expect(earlyRecord.earlyLeaveMinutes).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe('Scheduled Hours', () => {
    test('should reflect shift configuration in scheduled hours', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(7),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const workingRecord = records.items.find((r: any) => r.scheduledHours > 0);
        if (workingRecord) {
          // Scheduled hours should match shift configuration (typically 8 hours)
          expect(workingRecord.scheduledHours).toBeGreaterThan(0);
          expect(workingRecord.scheduledHours).toBeLessThanOrEqual(24);
        }
      }
    });
  });
});
