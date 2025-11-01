# Attendance Calculation Tests

## Overview
This test suite covers overtime calculation, working hours calculation, grace periods, break time management, and complex time calculation scenarios.

---

## Test Case CALC-001: Overtime Calculation on Normal Working Day

**Priority:** High
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that overtime hours are correctly calculated when employee works beyond shift hours on normal days.

### Preconditions
- Employee shift: 09:00 - 17:00 (8 hours)
- Overtime configuration:
  - Normal day rate: 1.5x
  - Post-shift overtime enabled
  - Minimum overtime: 30 minutes
  - Grace period: 15 minutes
- Employee clocked in at 09:00, clocked out at 19:00 (10 hours worked)

### Test Steps
1. Create clock-in transaction at 09:00
2. Create clock-out transaction at 19:00
3. Trigger attendance calculation
4. Verify overtime hours and rate

### Expected Results
- Total time: 09:00 - 19:00 = 10 hours
- Regular hours: 8 hours (shift duration)
- Overtime hours: 2 hours (10 - 8)
- Overtime applies after 17:00 grace period (17:15)
- Actual overtime: 1.75 hours (19:00 - 17:15)
- Overtime rate: 1.5x
- AttendanceRecord shows:
  - WorkedHours = 8.0
  - OvertimeHours = 1.75 (or 2.0 if rounded)
  - OvertimeRate = 1.5
- Overtime compensated or paid based on policy

---

## Test Case CALC-002: Overtime Calculation on Public Holiday

**Priority:** High
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that working on public holidays uses higher overtime rate.

### Preconditions
- Date: 2024-02-15 (Public Holiday - configured in system)
- Employee shift: 09:00 - 17:00
- Overtime configuration:
  - Holiday rate: 2.0x to 3.0x
  - All hours on holiday count as overtime
- Employee worked: 09:00 - 17:00 (8 hours)

### Test Steps
1. Verify 2024-02-15 is marked as public holiday
2. Clock in at 09:00
3. Clock out at 17:00
4. Calculate overtime

### Expected Results
- All hours worked count as overtime
- OvertimeHours = 8.0 (full shift)
- OvertimeRate = 2.0x or 3.0x (based on configuration)
- Regular hours = 0 (or may still track 8 regular + 8 overtime depending on policy)
- Holiday overtime prominently displayed in reports
- Higher compensation rate applied

---

## Test Case CALC-003: Break Time Deduction from Worked Hours

**Priority:** High
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that configured break time is properly deducted from worked hours.

### Preconditions
- Shift: 09:00 - 17:00 (8 hours)
- Configured break duration: 60 minutes
- Employee clocked in at 09:00, out at 17:00

### Test Steps
1. Clock in at 09:00
2. Clock out at 17:00
3. Calculate worked hours

### Expected Results
- Total time present: 8 hours
- Break time deducted: 1 hour
- Net worked hours: 7 hours
- AttendanceRecord:
  - TotalHours = 8.0
  - BreakDurationMinutes = 60
  - WorkedHours = 7.0
- Break time not compensated (unpaid break)

---

## Test Case CALC-004: Manual Break Tracking with Multiple Clock-Ins

**Priority:** Medium
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that manually tracked breaks (via clock-out/in) calculate worked hours correctly.

### Preconditions
- Shift: 09:00 - 18:00 (9 hours)
- No automatic break deduction
- Employee manually tracks breaks

### Test Steps
1. Clock in: 09:00
2. Clock out (lunch start): 13:00
3. Clock in (lunch end): 14:00
4. Clock out (end of day): 18:00
5. Calculate total worked hours

### Expected Results
- Transactions: 4 total
- Working periods:
  - 09:00 - 13:00 = 4 hours
  - 14:00 - 18:00 = 4 hours
- Total worked: 8 hours
- Break period: 13:00 - 14:00 = 1 hour (not counted)
- AttendanceRecord:
  - WorkedHours = 8.0
  - Break tracked via transactions

---

## Test Case CALC-005: Grace Period Application for Late Arrival

**Priority:** High
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that grace period is applied correctly for late arrivals.

### Preconditions
- Shift start: 09:00
- Grace period: 15 minutes
- Employee clocks in at various times

### Test Steps
Test multiple scenarios:
1. Clock in at 08:55 (early)
2. Clock in at 09:10 (within grace)
3. Clock in at 09:15 (exact grace end)
4. Clock in at 09:20 (late)

### Expected Results
- Scenario 1 (08:55):
  - Not late
  - LateMinutes = 0
  - Status = "Present"
- Scenario 2 (09:10):
  - Within grace period
  - LateMinutes = 0
  - Status = "Present"
- Scenario 3 (09:15):
  - Exact grace end
  - LateMinutes = 0 (or policy dependent)
  - Status = "Present" or "Late"
- Scenario 4 (09:20):
  - Late
  - LateMinutes = 5 (09:20 - 09:15)
  - Status = "Late"
  - May trigger notification

---

## Test Case CALC-006: Grace Period Application for Early Departure

**Priority:** Medium
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that early departure grace period is applied correctly.

### Preconditions
- Shift end: 17:00
- Grace period for departure: 15 minutes (allowed to leave at 16:45)
- Employee clocks out at various times

### Test Steps
Test multiple scenarios:
1. Clock out at 17:05 (after shift end)
2. Clock out at 16:50 (within grace)
3. Clock out at 16:45 (exact grace start)
4. Clock out at 16:30 (early)

### Expected Results
- Scenario 1 (17:05):
  - Not early
  - EarlyDepartureMinutes = 0
  - Full day credit
- Scenario 2 (16:50):
  - Within grace period
  - EarlyDepartureMinutes = 0
  - Status = "FullDay"
- Scenario 3 (16:45):
  - Exact grace start
  - EarlyDepartureMinutes = 0
  - Status = "FullDay"
- Scenario 4 (16:30):
  - Early departure
  - EarlyDepartureMinutes = 15 (16:45 - 16:30)
  - Status = "EarlyDeparture"
  - Worked hours reduced

---

## Test Case CALC-007: Pre-Shift Overtime Calculation

**Priority:** Medium
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that overtime before shift start is calculated when enabled.

### Preconditions
- Shift: 09:00 - 17:00
- Overtime configuration:
  - Pre-shift overtime enabled
  - Minimum pre-shift: 30 minutes
  - Rate: 1.5x
- Employee clocked in at 07:00 (2 hours early)

### Test Steps
1. Clock in at 07:00
2. Clock out at 17:00
3. Calculate overtime

### Expected Results
- Pre-shift period: 07:00 - 09:00 = 2 hours
- Minimum threshold: 30 minutes (met)
- Pre-shift overtime: 2 hours at 1.5x rate
- Regular hours: 8 hours (09:00 - 17:00)
- AttendanceRecord:
  - WorkedHours = 8.0
  - OvertimeHours = 2.0 (pre-shift)
  - Overtime type: "PreShift"

---

## Test Case CALC-008: Night Shift Overtime Calculation

**Priority:** Medium
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that night shift overtime is calculated correctly, especially when crossing midnight.

### Preconditions
- Night shift: 22:00 - 06:00 (8 hours, spans midnight)
- Employee works extra hours: 22:00 - 08:00 (10 hours)
- Night shift overtime rate: 1.75x

### Test Steps
1. Clock in at 22:00 (Day 1)
2. Clock out at 08:00 (Day 2)
3. Calculate worked hours and overtime

### Expected Results
- Total worked: 10 hours
- Regular shift: 8 hours (22:00 - 06:00)
- Overtime: 2 hours (06:00 - 08:00)
- Overtime rate: 1.75x (night shift rate)
- Attendance record date: Day 1 (shift start date)
- Proper handling of date transition

---

## Test Case CALC-009: Overtime Rounding Configuration

**Priority:** Low
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that overtime hours are rounded according to configuration.

### Preconditions
- Overtime configuration:
  - Rounding interval: 15 minutes
  - Rounding mode: Up (ceiling)
- Employee worked overtime: 1 hour 10 minutes

### Test Steps
1. Configure rounding: 15-minute intervals, round up
2. Work overtime: 1 hour 10 minutes
3. Calculate final overtime

### Expected Results
- Actual overtime: 1:10 (70 minutes)
- Rounding interval: 15 minutes
- Rounded overtime: 1:15 (75 minutes = 1.25 hours)
- Rounded up to next 15-minute increment
- Configuration options:
  - Round up (ceiling)
  - Round down (floor)
  - Round to nearest
  - Intervals: 1, 5, 10, 15, 30 minutes

---

## Test Case CALC-010: Complex Day Calculation (Late, Early, Overtime)

**Priority:** High
**Type:** Functional
**Module:** Attendance - Calculation

### Description
Verify that complex attendance scenarios with multiple conditions are calculated correctly.

### Preconditions
- Shift: 09:00 - 17:00 (8 hours)
- Grace periods: 15 minutes (both arrival and departure)
- Break: 60 minutes
- Employee: Arrived late, left early after overtime

### Test Steps
1. Clock in: 09:20 (late)
2. Clock out: 19:30 (overtime)
3. Calculate all attendance metrics

### Expected Results
- Clocked in: 09:20
  - Late by: 5 minutes (09:20 - 09:15 grace end)
  - Status includes: "Late"
- Clocked out: 19:30
  - Total present: 10 hours 10 minutes
  - Break deduction: 60 minutes
  - Net worked: 9 hours 10 minutes
  - Overtime: 2 hours 10 minutes (after shift end 17:00, minus grace)
- AttendanceRecord:
  - Status = "Late" + "Overtime"
  - LateMinutes = 5
  - WorkedHours = 8.0 (regular)
  - OvertimeHours = ~2.25 (depending on rounding)
  - Comprehensive calculation handles multiple conditions

---

## Test Execution Notes

### Test Data Requirements
- Various shift configurations
- Overtime policy configurations
- Public holidays configured
- Break time policies
- Grace period settings

### Environment Setup
- Backend running on http://localhost:5099
- Database with overtime configuration
- Test dates including normal days, weekends, holidays
- Time calculation engine configured

### Dependencies
- Shift management
- Public holiday calendar
- Overtime configuration
- Attendance transaction system

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| CALC-001 | Normal Day Overtime | High | ⬜ Not Run |
| CALC-002 | Holiday Overtime | High | ⬜ Not Run |
| CALC-003 | Break Deduction | High | ⬜ Not Run |
| CALC-004 | Manual Break Tracking | Medium | ⬜ Not Run |
| CALC-005 | Late Grace Period | High | ⬜ Not Run |
| CALC-006 | Early Grace Period | Medium | ⬜ Not Run |
| CALC-007 | Pre-Shift Overtime | Medium | ⬜ Not Run |
| CALC-008 | Night Shift Overtime | Medium | ⬜ Not Run |
| CALC-009 | Overtime Rounding | Low | ⬜ Not Run |
| CALC-010 | Complex Calculation | High | ⬜ Not Run |
