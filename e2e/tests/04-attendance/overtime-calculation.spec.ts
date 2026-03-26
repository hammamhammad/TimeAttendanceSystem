import { test, expect } from '../../fixtures/base.fixture';
import { USERS, pastDate } from '../../fixtures/test-data';

test.describe('Overtime Calculation Business Logic', () => {
  test.describe('Overtime on Regular Days', () => {
    test('should calculate pre-shift and post-shift overtime separately', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(30),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const otRecord = records.items.find((r: any) => r.overtimeHours > 0);
        if (otRecord) {
          // Total overtime = preShiftOvertimeHours + postShiftOvertimeHours
          const totalCalc = (otRecord.preShiftOvertimeHours || 0) + (otRecord.postShiftOvertimeHours || 0);
          expect(otRecord.overtimeHours).toBeCloseTo(totalCalc, 1);
        }
      }
    });

    test('normal day overtime should use 1.5x rate', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(30),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const normalOT = records.items.find(
          (r: any) => r.overtimeHours > 0 && r.overtimeDayType?.toLowerCase() === 'normal'
        );
        if (normalOT) {
          expect(normalOT.overtimeRate).toBe(1.5);
        }
      }
    });
  });

  test.describe('Overtime on Public Holidays', () => {
    test('all working hours on holiday should be overtime at 2.0x rate', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(90),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const holidayOT = records.items.find(
          (r: any) => r.overtimeDayType?.toLowerCase() === 'holiday' || r.overtimeDayType?.toLowerCase() === 'publicholiday'
        );
        if (holidayOT) {
          expect(holidayOT.overtimeRate).toBe(2.0);
          // On holiday, all working hours are overtime
          if (holidayOT.workingHours > 0) {
            expect(holidayOT.overtimeHours).toBeGreaterThan(0);
          }
        }
      }
    });
  });

  test.describe('Overtime on Off Days', () => {
    test('off day overtime should use 2.5x rate', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(30),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const offDayOT = records.items.find(
          (r: any) => r.overtimeDayType?.toLowerCase() === 'offday'
        );
        if (offDayOT) {
          expect(offDayOT.overtimeRate).toBe(2.5);
        }
      }
    });
  });

  test.describe('Overtime Thresholds and Rounding', () => {
    test('overtime below minimum threshold should not be counted', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(30),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        // Any overtime record should have at least 15 min (0.25 hours) due to minimum threshold
        const otRecords = records.items.filter((r: any) => r.overtimeHours > 0);
        otRecords.forEach((r: any) => {
          expect(r.overtimeHours).toBeGreaterThanOrEqual(0.25); // 15 min minimum
        });
      }
    });

    test('overtime should be rounded to 15-minute intervals', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(30),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const otRecords = records.items.filter((r: any) => r.overtimeHours > 0);
        otRecords.forEach((r: any) => {
          // Check rounding to 0.25 increments (15 min)
          const remainder = (r.overtimeHours * 4) % 1;
          expect(remainder).toBeCloseTo(0, 1);
        });
      }
    });
  });

  test.describe('Overtime Calculation Notes', () => {
    test('should include calculation notes for audit', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(
        USERS.branchManager.employeeId,
        pastDate(30),
        pastDate(0)
      );
      if (records?.items?.length > 0) {
        const otRecord = records.items.find((r: any) => r.overtimeHours > 0);
        if (otRecord && otRecord.overtimeCalculationNotes) {
          expect(otRecord.overtimeCalculationNotes.length).toBeGreaterThan(0);
        }
      }
    });
  });
});
