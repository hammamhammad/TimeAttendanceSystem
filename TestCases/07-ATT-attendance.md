# TC-ATT: Attendance Module — Test Cases

## Module Overview

The Attendance module is the core time-tracking engine of TecAxle HRMS. It automatically generates daily attendance records for all employees, calculates working hours, late minutes, early leave, and overtime based on shift configurations. It supports manual overrides, GPS+NFC mobile verification, attendance finalization, and comprehensive reporting. Status determination follows a strict priority-based rules engine that evaluates holidays, leaves, excuses, shift assignments, off days, and transaction data.

**Admin Pages**: `/attendance/daily`, `/attendance/monthly-report`, `/attendance/daily-detail/:employeeId/:date`, `/attendance/employee/:id`, `/attendance/edit/:id`, `/attendance/:attendanceId/change-shift`
**API Endpoints**: `GET /api/v1/attendance`, `GET /api/v1/attendance/{id}`, `PUT /api/v1/attendance/{id}`, `POST /api/v1/mobile/attendance/transaction`, `POST /api/v1/mobile/attendance/check-location`
**Backend Services**: `AttendanceCalculationService`, `DailyAttendanceGeneratorService`, `OvertimeConfigurationService`
**Background Jobs**: `DailyAttendanceGenerationJob` (2:00 AM), `EndOfDayAttendanceFinalizationJob` (11:59 PM)

---

## Test Environment

| Item | Value |
|------|-------|
| Backend | http://localhost:5099 |
| Admin Portal | http://localhost:4200 |
| Self-Service Portal | http://localhost:4201 |

### Test Users

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | IsSystemUser=true, all branch access |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Branch 101 (Headquarters - Riyadh) |
| Department Manager | sara.fahad@company.com | Emp@123! | Dept Manager, Branch 101 |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee, Branch 103 |

### Test Shift Configuration

| Field | Value |
|-------|-------|
| Shift Name | Standard Day Shift |
| Scheduled Start | 08:00 |
| Scheduled End | 17:00 |
| Required Hours | 8 |
| Grace Period (Late) | 10 minutes |
| Early Leave Grace | 5 minutes |
| Break Duration | 60 minutes |
| Flex Window | 60 minutes (for flexible shift tests) |

---

## Test Cases

### A. Attendance Status Determination

Each test case validates one rule in the priority-based status engine. Priority 1 is evaluated first; lower-priority rules are only applied when higher-priority rules do not match.

**Status Priority Table (Reference):**

| Priority | Condition | Expected Status |
|----------|-----------|-----------------|
| 1 | Public holiday | Holiday |
| 2 | Approved leave covers the day | OnLeave |
| 3 | Approved remote work for the day | RemoteWork |
| 4 | Full-day excuses >= 8h, OfficialDuty type | OnDuty |
| 4 | Full-day excuses >= 8h, other type | Excused |
| 5 | No shift assigned + no transactions | DayOff |
| 5 | No shift assigned + transactions exist | Overtime |
| 6 | Off day + check-in transaction exists | Overtime |
| 6 | Off day + no check-in | DayOff |
| 7 | Working day, no check-in (check-in required) | Absent |
| 7 | Working day, no check-in (check-in not required) | Present |
| 7 | Check-in exists but no check-out | Incomplete |
| 7 | Late arrival (past grace) | Late |
| 7 | Early departure (past grace) | EarlyLeave |
| 7 | Normal attendance | Present |

---

#### TC-ATT-001: Priority 1 — Public holiday overrides all other conditions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. A public holiday "National Day" is configured for 2026-09-23 for Branch 101
2. Employee ahmed.rashid (ID: 1001) is assigned to Branch 101
3. Employee has an active shift assignment for that date
4. Employee has check-in/check-out transactions on that date (worked the holiday)

**Steps:**
1. Run DailyAttendanceGenerationJob for 2026-09-23
2. Query attendance record for employee 1001 on 2026-09-23

**Expected Results:**
- Attendance status = `Holiday`
- Status is Holiday regardless of transactions, leave, or shift
- Working hours still calculated if transactions exist (for overtime purposes)
- Public holiday takes absolute priority over all other rules

---

#### TC-ATT-002: Priority 2 — Approved leave overrides remote work, excuses, and working day rules
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Date is NOT a public holiday
2. Employee 1001 has an approved vacation (EmployeeVacation with status Approved) covering 2026-04-15
3. Employee also has an approved remote work request for the same date
4. Employee has a shift assigned for that day

**Steps:**
1. Generate attendance for 2026-04-15
2. Check attendance record for employee 1001

**Expected Results:**
- Attendance status = `OnLeave`
- Approved leave at priority 2 overrides remote work (priority 3), excuses (priority 4), and all lower rules
- No late/early calculations performed

---

#### TC-ATT-003: Priority 3 — Approved remote work marks status as RemoteWork
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Date is NOT a public holiday
2. No approved leave for the day
3. Employee 1001 has an approved remote work request for 2026-04-16
4. Employee has a shift assigned

**Steps:**
1. Generate attendance for 2026-04-16
2. Check attendance record for employee 1001

**Expected Results:**
- Attendance status = `RemoteWork`
- Working hours may still be calculated from remote check-in/check-out if tracked

---

#### TC-ATT-004: Priority 4 — Full-day OfficialDuty excuse marks status as OnDuty
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Date is not a holiday, no leave, no remote work
2. Employee 1001 has an approved excuse of type `OfficialDuty` for 2026-04-17
3. Excuse duration >= 8 hours (covers full working day)

**Steps:**
1. Generate attendance for 2026-04-17
2. Check attendance record

**Expected Results:**
- Attendance status = `OnDuty`
- Full-day excuse threshold: excuse hours >= 8h (full shift)
- Excuse type `OfficialDuty` specifically triggers `OnDuty` (not `Excused`)

---

#### TC-ATT-005: Priority 4 — Full-day non-OfficialDuty excuse marks status as Excused
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Date is not a holiday, no leave, no remote work
2. Employee 1001 has an approved excuse of type `Medical` for 2026-04-17
3. Excuse duration >= 8 hours

**Steps:**
1. Generate attendance for 2026-04-17
2. Check attendance record

**Expected Results:**
- Attendance status = `Excused`
- Any non-OfficialDuty excuse type (Medical, Personal, Family, Emergency, etc.) that covers full day results in `Excused`

---

#### TC-ATT-006: Priority 4 — Partial excuse (< 8h) does NOT override working day rules
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Date is not a holiday, no leave, no remote work
2. Employee 1001 has an approved excuse for 2 hours on 2026-04-17
3. Employee has a shift and checked in/out normally

**Steps:**
1. Generate attendance for 2026-04-17
2. Check attendance record

**Expected Results:**
- Attendance status is NOT `Excused` or `OnDuty`
- Status determined by priority 7 rules (working day evaluation)
- Partial excuse may offset late minutes or early leave calculations

---

#### TC-ATT-007: Priority 5 — No shift + no transactions = DayOff
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Date is not a holiday, no leave, no remote work, no full-day excuse
2. Employee 1001 has NO shift assigned for 2026-04-18 (shift assignment expired or never assigned)
3. No check-in/check-out transactions exist for that date

**Steps:**
1. Generate attendance for 2026-04-18
2. Check attendance record

**Expected Results:**
- Attendance status = `DayOff`
- Working hours = 0
- No late/early/overtime calculations

---

#### TC-ATT-008: Priority 5 — No shift + transactions exist = Overtime
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Same as TC-ATT-007 but employee has check-in at 09:00 and check-out at 13:00
2. No shift assigned for the day

**Steps:**
1. Generate attendance for 2026-04-18
2. Check attendance record

**Expected Results:**
- Attendance status = `Overtime`
- Working hours calculated from transactions (4 hours in this case)
- All working hours treated as overtime since no shift was scheduled

---

#### TC-ATT-009: Priority 6 — Off day + check-in = Overtime
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Date is not a holiday, no leave, no remote work, no full-day excuse
2. Employee 1001 has a shift assigned, but 2026-04-18 (Saturday) is configured as an off day in the shift's OffDays
3. Employee has a check-in transaction at 09:00 and check-out at 14:00

**Steps:**
1. Generate attendance for 2026-04-18
2. Check attendance record

**Expected Results:**
- Attendance status = `Overtime`
- Working hours = 5 hours (09:00 to 14:00)
- All hours on an off day are treated as overtime
- Off day overtime rate applied (OffDayRate from OvertimeConfiguration)

---

#### TC-ATT-010: Priority 6 — Off day + no check-in = DayOff
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Same shift and off day configuration as TC-ATT-009
2. No transactions exist for the date

**Steps:**
1. Generate attendance for 2026-04-18
2. Check attendance record

**Expected Results:**
- Attendance status = `DayOff`
- Working hours = 0
- No overtime, no late, no early leave

---

#### TC-ATT-011: Priority 7 — Working day, no check-in, check-in required = Absent
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Date is a normal working day (not holiday, not off day, not leave)
2. Employee 1001 has active shift assignment requiring check-in
3. No check-in transaction exists for the date
4. Shift type is Regular (check-in is required)

**Steps:**
1. Generate attendance for 2026-04-20 (Monday)
2. Check attendance record

**Expected Results:**
- Attendance status = `Absent`
- Working hours = 0
- Late minutes = 0 (no check-in to calculate from)
- Early leave = 0

---

#### TC-ATT-012: Priority 7 — Working day, no check-in, check-in not required = Present
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Normal working day
2. Employee has a flexible shift where check-in is not strictly required
3. No check-in transaction

**Steps:**
1. Generate attendance for the date
2. Check attendance record

**Expected Results:**
- Attendance status = `Present`
- This covers scenarios where presence is tracked by other means (e.g., remote work without clock-in)

---

#### TC-ATT-013: Priority 7 — Check-in exists, no check-out = Incomplete
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Normal working day with active shift
2. Employee 1001 has a check-in at 08:00
3. No check-out transaction by end of day

**Steps:**
1. Run EndOfDayAttendanceFinalizationJob for the date
2. Check attendance record

**Expected Results:**
- Attendance status = `Incomplete`
- Record highlighted in UI as incomplete (visual indicator)
- Working hours cannot be fully calculated without check-out
- Record should appear in "Incomplete Records" filter

---

#### TC-ATT-014: Priority 7 — Late arrival (past grace period) = Late
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Normal working day, shift starts at 08:00, grace period = 10 minutes
2. Employee 1001 checks in at 08:15 (5 minutes past grace)
3. Employee checks out at 17:00 (on time)

**Steps:**
1. Generate/finalize attendance
2. Check attendance record

**Expected Results:**
- Attendance status = `Late`
- Late minutes = 15 (full amount from scheduled start, not reduced by grace)
- Check-in time recorded as 08:15

---

#### TC-ATT-015: Priority 7 — Early departure (past grace) = EarlyLeave
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Normal working day, shift ends at 17:00, early leave grace = 5 minutes
2. Employee 1001 checks in at 08:00 (on time)
3. Employee checks out at 16:30 (30 minutes early, past 5-min grace)

**Steps:**
1. Generate/finalize attendance
2. Check attendance record

**Expected Results:**
- Attendance status = `EarlyLeave`
- Early leave minutes = 30
- Working hours = 8.5h - 1h break = 7.5h (or as calculated)

---

#### TC-ATT-016: Priority 7 — Normal attendance = Present
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Normal working day, shift 08:00-17:00, grace 10 min
2. Employee 1001 checks in at 07:55 (early, within normal range)
3. Employee checks out at 17:05

**Steps:**
1. Generate/finalize attendance
2. Check attendance record

**Expected Results:**
- Attendance status = `Present`
- Late minutes = 0 (checked in before shift start)
- Early leave = 0 (checked out after shift end)
- Working hours calculated normally

---

#### TC-ATT-017: Priority conflict — Holiday + Approved Leave on same day
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. 2026-09-23 is both a public holiday AND covered by employee's approved vacation
2. Employee has shift assigned

**Steps:**
1. Generate attendance for 2026-09-23
2. Check attendance record

**Expected Results:**
- Attendance status = `Holiday` (priority 1 wins over priority 2)
- Leave balance should NOT be deducted for this day (holiday takes precedence)

---

### B. Late Minutes Calculation

---

#### TC-ATT-018: Regular shift — check-in within grace period = 0 late minutes
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift start = 08:00, grace period = 10 minutes
2. Employee checks in at 08:05

**Calculation:**
```
ActualCheckIn = 08:05
GraceEnd = 08:00 + 10min = 08:10
08:05 <= 08:10 → Within grace
Late minutes = 0
```

**Expected Results:**
- Late minutes = 0
- Status = `Present` (not `Late`)

---

#### TC-ATT-019: Regular shift — check-in 1 minute past grace = full late (not reduced by grace)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift start = 08:00, grace period = 10 minutes
2. Employee checks in at 08:11

**Calculation:**
```
ActualCheckIn = 08:11
GraceEnd = 08:00 + 10min = 08:10
08:11 > 08:10 → Past grace
Late minutes = 08:11 - 08:00 = 11 minutes (FULL, measured from scheduled start)
```

**Expected Results:**
- Late minutes = 11 (not 1 — grace is a threshold, not a deduction)
- Status = `Late`

---

#### TC-ATT-020: Regular shift — check-in 15 minutes late with 10-min grace
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift start = 08:00, grace period = 10 minutes
2. Employee checks in at 08:15

**Calculation:**
```
ActualCheckIn = 08:15
GraceEnd = 08:00 + 10min = 08:10
08:15 > 08:10 → Past grace
Late minutes = 08:15 - 08:00 = 15 minutes
```

**Expected Results:**
- Late minutes = 15
- Status = `Late`

---

#### TC-ATT-021: Regular shift — check-in exactly at grace boundary = 0 late
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift start = 08:00, grace period = 10 minutes
2. Employee checks in at exactly 08:10

**Calculation:**
```
ActualCheckIn = 08:10
GraceEnd = 08:00 + 10min = 08:10
08:10 <= 08:10 → At boundary, within grace
Late minutes = 0
```

**Expected Results:**
- Late minutes = 0
- Status = `Present`
- Boundary is inclusive (<=, not <)

---

#### TC-ATT-022: Flexible shift — late calculated from end of flex window, not scheduled start
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Flexible shift: scheduled start = 08:00, flex window = 60 minutes (flex ends at 09:00)
2. Employee checks in at 09:15

**Calculation:**
```
FlexEnd = 08:00 + 60min = 09:00
ActualCheckIn = 09:15
09:15 > 09:00 → Late (measured from flex window end)
Late minutes = 09:15 - 09:00 = 15 minutes
```

**Expected Results:**
- Late minutes = 15 (from flex window end, NOT from 08:00)
- Status = `Late`

---

#### TC-ATT-023: Flexible shift — check-in within flex window = 0 late
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Flexible shift: scheduled start = 08:00, flex window = 60 minutes
2. Employee checks in at 08:45

**Calculation:**
```
FlexEnd = 08:00 + 60min = 09:00
ActualCheckIn = 08:45
08:45 < 09:00 → Within flex window
Late minutes = 0
```

**Expected Results:**
- Late minutes = 0
- Status = `Present`
- Any check-in between 08:00 and 09:00 (inclusive) is on time for a flexible shift

---

#### TC-ATT-024: Flexible shift — check-in at exact flex window end = 0 late
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Flexible shift: scheduled start = 08:00, flex window = 60 minutes
2. Employee checks in at exactly 09:00

**Calculation:**
```
FlexEnd = 09:00
ActualCheckIn = 09:00
09:00 <= 09:00 → At boundary
Late minutes = 0
```

**Expected Results:**
- Late minutes = 0
- Boundary inclusive

---

#### TC-ATT-025: Excuse offset reduces late minutes
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift start = 08:00, grace period = 10 minutes
2. Employee checks in at 08:30 (30 minutes late, past grace)
3. Employee has an approved excuse for 08:00-08:20 (20 minutes)

**Calculation:**
```
Raw late = 08:30 - 08:00 = 30 minutes
Excuse overlaps late period (08:00-08:30): overlap = 08:00-08:20 = 20 minutes
Adjusted late = 30 - 20 = 10 minutes
```

**Expected Results:**
- Late minutes = 10 (after excuse offset)
- Excuse period that overlaps the late period reduces the late count

---

#### TC-ATT-026: Zero grace period — any delay is late
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift start = 08:00, grace period = 0 minutes
2. Employee checks in at 08:01

**Calculation:**
```
GraceEnd = 08:00 + 0 = 08:00
08:01 > 08:00 → Past grace
Late minutes = 08:01 - 08:00 = 1 minute
```

**Expected Results:**
- Late minutes = 1
- Status = `Late`

---

### C. Early Leave Calculation

---

#### TC-ATT-027: Regular shift — early departure calculation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift ends at 17:00, early leave grace = 5 minutes
2. Employee checks out at 16:30

**Calculation:**
```
EarlyLeave = ScheduledEnd - ActualCheckOut = 17:00 - 16:30 = 30 minutes
EarlyLeaveGrace = 5 minutes
30 > 5 → Past grace
Early leave minutes = 30
```

**Expected Results:**
- Early leave minutes = 30
- Status = `EarlyLeave`

---

#### TC-ATT-028: Regular shift — early departure within grace = 0
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift ends at 17:00, early leave grace = 5 minutes
2. Employee checks out at 16:57

**Calculation:**
```
EarlyLeave = 17:00 - 16:57 = 3 minutes
EarlyLeaveGrace = 5 minutes
3 <= 5 → Within grace
Early leave minutes = 0
```

**Expected Results:**
- Early leave minutes = 0
- Status = `Present` (not EarlyLeave)

---

#### TC-ATT-029: Flexible shift — early leave calculated from required end time
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Flexible shift: required hours = 8, early leave grace = 5 minutes
2. Employee checks in at 09:15 (within flex window)
3. Employee checks out at 16:30

**Calculation:**
```
RequiredEnd = CheckIn + RequiredHours = 09:15 + 8h = 17:15
EarlyLeave = RequiredEnd - ActualCheckOut = 17:15 - 16:30 = 45 minutes
45 > 5 → Past grace
Early leave minutes = 45
```

**Expected Results:**
- Early leave minutes = 45
- Required end dynamically calculated based on actual check-in time
- Status = `EarlyLeave`

---

#### TC-ATT-030: Flexible shift — check-out after required end = 0 early leave
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Flexible shift: required hours = 8
2. Employee checks in at 09:00, checks out at 17:15

**Calculation:**
```
RequiredEnd = 09:00 + 8h = 17:00
ActualCheckOut = 17:15
17:15 >= 17:00 → No early leave
Early leave minutes = 0
```

**Expected Results:**
- Early leave minutes = 0
- Post-required-end time may count as overtime

---

#### TC-ATT-031: Excuse offset reduces early leave
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift ends at 17:00, early leave grace = 5 minutes
2. Employee checks out at 16:00 (60 minutes early)
3. Employee has an approved excuse for 16:00-16:40 (40 minutes)

**Calculation:**
```
Raw early leave = 17:00 - 16:00 = 60 minutes
Excuse overlaps early period (16:00-17:00): overlap = 16:00-16:40 = 40 minutes
Adjusted early leave = 60 - 40 = 20 minutes
```

**Expected Results:**
- Early leave minutes = 20 (after excuse offset)

---

### D. Working Hours Calculation

---

#### TC-ATT-032: Single check-in/check-out pair with break deduction
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift: 08:00-17:00, break = 60 minutes
2. Employee checks in at 08:00, checks out at 17:00

**Calculation:**
```
Gross hours = 17:00 - 08:00 = 9 hours = 540 minutes
Break deduction = 60 minutes
Working hours = 540 - 60 = 480 minutes = 8.0 hours
```

**Expected Results:**
- Working hours = 8.0 hours (480 minutes)
- Break time automatically deducted

---

#### TC-ATT-033: Multiple transaction pairs in one day
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Employee has multiple check-in/check-out pairs:
   - Pair 1: Check-in 08:00, Check-out 12:00
   - Pair 2: Check-in 13:00, Check-out 17:00

**Calculation:**
```
Pair 1 = 12:00 - 08:00 = 4 hours
Pair 2 = 17:00 - 13:00 = 4 hours
Total working hours = 4 + 4 = 8 hours
Break between pairs = 12:00 to 13:00 (1 hour, automatically captured)
```

**Expected Results:**
- Working hours = 8.0 hours
- Each check-in/check-out pair calculated separately and summed

---

#### TC-ATT-034: Working hours minimum is 0 (never negative)
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Edge case: break deduction exceeds gross time (e.g., check-in 08:00, check-out 08:30, break = 60 min)

**Calculation:**
```
Gross = 30 minutes
Break = 60 minutes
Working = Max(0, 30 - 60) = 0
```

**Expected Results:**
- Working hours = 0 (not -0.5)
- `Max(0, calculation)` rule applied

---

### E. Overtime Calculation

---

#### TC-ATT-035: Pre-shift overtime — arrives before shift start
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift start = 08:00, OT config: MinimumOvertimeMinutes = 30, MaxPreShiftOvertimeHours = 2
2. Employee checks in at 06:30

**Calculation:**
```
PreShiftMinutes = ScheduledStart - ActualCheckIn = 08:00 - 06:30 = 90 minutes
PreShiftHours = 90 / 60.0 = 1.5 hours
MinimumOvertimeMinutes = 30 → 90 >= 30 ✓ (meets threshold)
MaxPreShiftOvertimeHours = 2 → 1.5 <= 2 ✓ (within cap)
Pre-shift overtime = 1.5 hours
```

**Expected Results:**
- Pre-shift overtime = 1.5 hours
- Added to total overtime for the day

---

#### TC-ATT-036: Pre-shift overtime — below minimum threshold = 0
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift start = 08:00, MinimumOvertimeMinutes = 30
2. Employee checks in at 07:45 (15 minutes before shift)

**Calculation:**
```
PreShiftMinutes = 08:00 - 07:45 = 15 minutes
MinimumOvertimeMinutes = 30
15 < 30 → Below threshold
Pre-shift overtime = 0
```

**Expected Results:**
- Pre-shift overtime = 0
- 15 minutes of early arrival not counted as overtime

---

#### TC-ATT-037: Pre-shift overtime — capped at MaxPreShiftOvertimeHours
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift start = 08:00, MinimumOvertimeMinutes = 30, MaxPreShiftOvertimeHours = 2
2. Employee checks in at 05:00 (3 hours before shift)

**Calculation:**
```
PreShiftMinutes = 08:00 - 05:00 = 180 minutes = 3 hours
MaxPreShiftOvertimeHours = 2
Pre-shift overtime = Min(3, 2) = 2 hours (capped)
```

**Expected Results:**
- Pre-shift overtime = 2.0 hours (capped at maximum)

---

#### TC-ATT-038: Post-shift overtime — minimum of time-based and work-based
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift: 08:00-17:00 (8h required + 1h break), MinimumOvertimeMinutes = 15
2. Employee checks in at 08:00, checks out at 19:00
3. Working hours (after break) = 10 hours

**Calculation:**
```
TimeBasedHours = (CheckOut - ScheduledEnd) / 60.0 = (19:00 - 17:00) / 60 = 2.0 hours
WorkBasedHours = WorkingHours - ScheduledHours = 10 - 8 = 2.0 hours
PostShiftOT = Min(TimeBased, WorkBased) = Min(2.0, 2.0) = 2.0 hours
MinimumOvertimeMinutes = 15 → 120 >= 15 ✓
```

**Expected Results:**
- Post-shift overtime = 2.0 hours
- Uses minimum of time-based and work-based to prevent inflation from breaks taken during OT

---

#### TC-ATT-039: Post-shift overtime — time-based vs work-based differ (break during OT)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift: 08:00-17:00, scheduled hours = 8h, break = 1h
2. Employee checks in at 08:00, takes a 30-min personal break after 17:00, checks out at 19:30
3. Working hours = 9.5h (after 1h scheduled break + 30min personal break = 1.5h total break from 11h gross)

**Calculation:**
```
TimeBasedHours = (19:30 - 17:00) / 60 = 2.5 hours
WorkBasedHours = 9.5 - 8 = 1.5 hours
PostShiftOT = Min(2.5, 1.5) = 1.5 hours
```

**Expected Results:**
- Post-shift overtime = 1.5 hours (work-based wins, preventing break time from inflating OT)

---

#### TC-ATT-040: Overtime rounding — 15-minute interval
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. OT config: RoundingIntervalMinutes = 15
2. Calculated raw overtime = 1 hour 22 minutes (82 minutes)

**Calculation (round down to nearest interval):**
```
Raw OT = 82 minutes
RoundingInterval = 15
Rounded = floor(82 / 15) * 15 = floor(5.467) * 15 = 5 * 15 = 75 minutes = 1.25 hours
```

**Expected Results:**
- Overtime = 1.25 hours (75 minutes) after rounding

**Rounding Interval Examples:**

| RoundingIntervalMinutes | Raw OT (min) | Rounded OT (min) |
|------------------------|--------------|-------------------|
| 1 | 82 | 82 |
| 5 | 82 | 80 |
| 10 | 82 | 80 |
| 15 | 82 | 75 |
| 30 | 82 | 60 |

---

#### TC-ATT-041: Overtime rate — normal working day
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. OT config: NormalDayRate = 1.5
2. Normal working day (not off day, not holiday)
3. Post-shift overtime = 2.0 hours

**Calculation:**
```
Rate = NormalDayRate = 1.5
OvertimeAmount = FinalHours * Rate = 2.0 * 1.5 = 3.0 equivalent hours
```

**Expected Results:**
- Overtime rate = 1.5x
- Overtime amount = 3.0 equivalent hours (for payroll purposes)

---

#### TC-ATT-042: Overtime rate — off day
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. OT config: OffDayRate = 2.0
2. Employee works 5 hours on an off day (Saturday)

**Calculation:**
```
Rate = OffDayRate = 2.0
OvertimeAmount = 5.0 * 2.0 = 10.0 equivalent hours
```

**Expected Results:**
- All working hours on off day are overtime
- Rate = OffDayRate (2.0x)

---

#### TC-ATT-043: Overtime rate — weekend configured as off day uses OffDayRate
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift config: Friday and Saturday are off days (WeekendAsOffDay)
2. OT config: OffDayRate = 2.0
3. Employee works 4 hours on Friday

**Expected Results:**
- Rate = OffDayRate = 2.0 (not NormalDayRate)
- Weekend days configured as off days use off day rate

---

#### TC-ATT-044: Overtime rate — public holiday (all hours = overtime)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. OT config: PublicHolidayRate = 2.5
2. Public holiday on 2026-09-23
3. Employee works 6 hours (check-in 08:00, check-out 14:00)

**Calculation:**
```
Rate = PublicHolidayRate = 2.5
ALL working hours are overtime on a public holiday
OvertimeAmount = 6.0 * 2.5 = 15.0 equivalent hours
```

**Expected Results:**
- Overtime hours = 6.0 (entire shift counts as OT on holidays)
- Rate = PublicHolidayRate (2.5x)

---

#### TC-ATT-045: Overtime — post-shift below minimum threshold = 0
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Calculation |
| **Page** | /attendance/daily-detail/:employeeId/:date |
| **Role** | System Admin |

**Preconditions:**
1. Shift ends at 17:00, MinimumOvertimeMinutes = 30
2. Employee checks out at 17:10 (10 minutes after shift end)

**Calculation:**
```
PostShiftMinutes = 10
MinimumOvertimeMinutes = 30
10 < 30 → Below threshold
Post-shift overtime = 0
```

**Expected Results:**
- Post-shift overtime = 0
- Minor overstay not counted as overtime

---

### F. Reports & UI

---

#### TC-ATT-046: Daily attendance list — page renders with required columns
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Attendance records exist for the current date
2. User has `attendance.read` permission

**Steps:**
1. Navigate to /attendance/daily

**Expected Results:**
- DataTable renders with columns:
  - Employee Name
  - Employee Number
  - Branch
  - Department
  - Date
  - Check-In Time
  - Check-Out Time
  - Working Hours
  - Late Minutes
  - Early Leave Minutes
  - Overtime Hours
  - Status (StatusBadgeComponent)
  - Actions (View, Edit)
- Pagination controls visible
- Data loads with loading spinner

---

#### TC-ATT-047: Daily attendance — filter by date
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Steps:**
1. Navigate to /attendance/daily
2. Select a specific date using the date picker (e.g., 2026-04-10)
3. Click Apply/Search

**Expected Results:**
- Table shows only attendance records for selected date
- Date filter is pre-populated with current date on first load
- Changing date refreshes the data

---

#### TC-ATT-048: Daily attendance — filter by branch
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Steps:**
1. Navigate to /attendance/daily
2. Select "Jeddah Branch" from branch filter
3. Apply filter

**Expected Results:**
- Only employees from Jeddah Branch shown
- Branch filter uses SearchableSelectComponent
- Employee count in results matches Jeddah Branch headcount

---

#### TC-ATT-049: Daily attendance — filter by department
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Steps:**
1. Navigate to /attendance/daily
2. Select "IT Department" from department filter
3. Apply filter

**Expected Results:**
- Only employees from IT Department shown
- Department filter respects branch selection (cascading)

---

#### TC-ATT-050: Daily attendance — filter by status
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Steps:**
1. Navigate to /attendance/daily
2. Select "Absent" from status filter
3. Apply filter

**Expected Results:**
- Only records with status `Absent` displayed
- Status filter includes all status values: Present, Absent, Late, EarlyLeave, OnLeave, Holiday, DayOff, Overtime, RemoteWork, OnDuty, Excused, Incomplete

---

#### TC-ATT-051: Daily attendance — pagination
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Steps:**
1. Navigate to /attendance/daily with 50+ records
2. Observe pagination controls
3. Click page 2

**Expected Results:**
- Default page size applied (e.g., 10 or 25)
- Pagination shows total pages and current page
- Clicking next page loads next set of records
- Page size selector available

---

#### TC-ATT-052: Monthly report — date range and summary
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /attendance/monthly-report |
| **Role** | System Admin |

**Steps:**
1. Navigate to /attendance/monthly-report
2. Select date range: 2026-04-01 to 2026-04-30
3. Select Branch: All
4. Apply

**Expected Results:**
- Monthly summary table with one row per employee
- Columns include: Employee, Branch, Department, Total Days, Present, Absent, Late, OnLeave, Holiday, DayOff, Total Working Hours, Total Overtime
- Summary row/totals at bottom
- Branch and department filters available

---

#### TC-ATT-053: Employee attendance history
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /attendance/employee/:id |
| **Role** | System Admin |

**Steps:**
1. Navigate to /attendance/employee/1001
2. Observe the page

**Expected Results:**
- Shows attendance history for employee 1001 (Ahmed Al-Rashid)
- Date range filter available
- Records displayed chronologically
- Summary stats shown (total present, absent, late, etc.)
- Each row links to daily detail

---

#### TC-ATT-054: Edit attendance record
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /attendance/edit/:id |
| **Role** | System Admin |

**Preconditions:**
1. Attendance record exists and is NOT finalized

**Steps:**
1. Navigate to /attendance/edit/{attendanceId}
2. Modify check-in time from 08:15 to 08:00
3. Save changes

**Expected Results:**
- Edit form shows current values pre-populated
- Check-in, check-out times editable
- On save: working hours, late minutes, early leave, overtime all recalculated
- Audit log entry created with before/after values
- Success notification shown
- Manual override flag set on the record

---

#### TC-ATT-055: Change shift for attendance record
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /attendance/:attendanceId/change-shift |
| **Role** | System Admin |

**Preconditions:**
1. Attendance record exists
2. Multiple shifts configured in the system

**Steps:**
1. Navigate to /attendance/{attendanceId}/change-shift
2. Select a different shift from dropdown
3. Confirm change

**Expected Results:**
- Current shift displayed
- Shift dropdown shows available shifts
- After change: all calculations (late, early, overtime, working hours) recalculated against new shift schedule
- Audit log created
- Status may change based on new shift parameters

---

#### TC-ATT-056: CSV export of daily attendance
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Steps:**
1. Navigate to /attendance/daily
2. Apply desired filters
3. Click Export/Download CSV button

**Expected Results:**
- CSV file downloaded
- Contains same columns as displayed table
- Respects current filters (only filtered data exported)
- Date formatted correctly
- Arabic names rendered correctly in CSV

---

#### TC-ATT-057: Incomplete records highlighted in daily view
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Some employees have check-in but no check-out (Incomplete status)

**Steps:**
1. Navigate to /attendance/daily
2. Look for records with status "Incomplete"

**Expected Results:**
- Incomplete records have visual indicator (highlighted row or warning icon)
- StatusBadge shows "Incomplete" with warning variant
- Filtering by "Incomplete" status isolates these records

---

#### TC-ATT-058: Branch-scoped user sees only their branch attendance
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /attendance/daily |
| **Role** | Branch Manager |

**Preconditions:**
1. User ahmed.rashid has branch_scope = [101] (Headquarters only)

**Steps:**
1. Login as ahmed.rashid@company.com
2. Navigate to /attendance/daily

**Expected Results:**
- Only attendance records for Branch 101 employees displayed
- Branch filter locked to user's branch scope
- Cannot view records from Branch 102, 103, etc.
- API enforces branch scope on server side

---

### G. Generation & Finalization

---

#### TC-ATT-059: DailyAttendanceGenerationJob creates records for all employees at 2 AM
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (Background Job) |
| **Role** | System |

**Preconditions:**
1. Tenant has 50 employees across 5 branches
2. Each employee has an active shift assignment

**Steps:**
1. DailyAttendanceGenerationJob triggers at 2:00 AM UTC
2. Job iterates all active tenants via TenantIteratingJob

**Expected Results:**
- One AttendanceRecord created per employee per day
- Records created with initial status based on shift assignment and off day configuration
- Holiday records auto-marked as `Holiday`
- Off day records auto-marked as `DayOff`
- Working day records initialized (status determined after transactions are processed)
- Job completes for all tenants
- No duplicate records if job runs multiple times (idempotent)

---

#### TC-ATT-060: EndOfDayFinalizationJob locks records at 11:59 PM
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (Background Job) |
| **Role** | System |

**Preconditions:**
1. Attendance records exist for the current day
2. Some employees have checked in/out, some have not

**Steps:**
1. EndOfDayAttendanceFinalizationJob triggers at 11:59 PM
2. Job processes all non-finalized records for the day

**Expected Results:**
- All calculations finalized: working hours, late, early leave, overtime
- Employees with check-in but no check-out marked as `Incomplete`
- Employees with no transactions on working days marked as `Absent`
- Records marked as finalized (IsFinalized = true or equivalent)
- Finalized timestamp recorded

---

#### TC-ATT-061: Finalized records cannot be edited (locked)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance/edit/:id |
| **Role** | System Admin |

**Preconditions:**
1. Attendance record has been finalized by the end-of-day job

**Steps:**
1. Navigate to /attendance/edit/{finalizedRecordId}
2. Attempt to modify check-in time
3. Attempt to save

**Expected Results:**
- Edit form either:
  - Shows record as read-only with a "Finalized" indicator, OR
  - Allows editing only for SystemAdmin with override capability
- Regular users cannot modify finalized records
- API returns 400/403 if edit attempted on finalized record

---

#### TC-ATT-062: Holidays auto-marked during generation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/daily |
| **Role** | System Admin |

**Preconditions:**
1. Public holiday "National Day" configured for 2026-09-23 for Branch 101
2. 10 employees in Branch 101

**Steps:**
1. DailyAttendanceGenerationJob runs for 2026-09-23
2. Check attendance records

**Expected Results:**
- All 10 employees in Branch 101 have status = `Holiday`
- Employees in other branches (where holiday does not apply) are not affected
- Branch-specific holidays only apply to that branch's employees

---

#### TC-ATT-063: Idempotent generation — duplicate job run does not create duplicate records
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (Background Job) |
| **Role** | System |

**Steps:**
1. Run DailyAttendanceGenerationJob for 2026-04-20
2. Verify records created (50 records)
3. Run DailyAttendanceGenerationJob again for 2026-04-20

**Expected Results:**
- Still exactly 50 records (no duplicates)
- Existing records not overwritten
- Job detects existing records and skips creation

---

### H. GPS + NFC Mobile Verification

---

#### TC-ATT-064: GPS within branch geofence radius — pass
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. Branch 101 configured: Latitude = 24.7136, Longitude = 46.6753, GeofenceRadiusMeters = 200
2. Employee's GPS coordinates: Lat = 24.7138, Long = 46.6755 (approximately 25 meters away)

**Calculation (Haversine formula):**
```
Distance = haversine(24.7136, 46.6753, 24.7138, 46.6755) ≈ 25 meters
GeofenceRadius = 200 meters
25 <= 200 → Within geofence ✓
```

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with GPS coordinates

**Expected Results:**
- GPS verification passes
- Transaction allowed to proceed to NFC verification
- AttendanceVerificationLog entry created with:
  - VerificationMethod = GPS
  - IsSuccess = true
  - GpsLatitude, GpsLongitude recorded
  - DistanceFromBranch recorded

---

#### TC-ATT-065: GPS outside branch geofence radius — GpsOutsideGeofence
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. Branch 101: Lat = 24.7136, Long = 46.6753, Radius = 200m
2. Employee GPS: Lat = 24.7200, Long = 46.6800 (approximately 850 meters away)

**Calculation:**
```
Distance ≈ 850 meters
GeofenceRadius = 200 meters
850 > 200 → Outside geofence ✗
```

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with far GPS coordinates

**Expected Results:**
- Transaction rejected
- Failure reason = `GpsOutsideGeofence`
- AttendanceVerificationLog:
  - IsSuccess = false
  - FailureReason = "GpsOutsideGeofence"
  - DistanceFromBranch = ~850m
- Error response returned to mobile app

---

#### TC-ATT-066: NFC tag UID registered and active for branch — pass
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. NFC tag with UID "04:A2:B3:C4:D5:E6:F7" registered to Branch 101
2. Tag status = Active
3. GPS verification already passed

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with NFC tag data (UID matches)

**Expected Results:**
- NFC verification passes
- Attendance transaction created (check-in or check-out)
- NFC tag ScanCount incremented
- LastScanTimestamp updated
- AttendanceVerificationLog: IsSuccess = true, NfcTagUid recorded

---

#### TC-ATT-067: NFC tag UID not registered — NfcTagNotRegistered
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. NFC tag UID "AA:BB:CC:DD:EE:FF:00" is NOT in the NfcTags table

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with unregistered NFC UID

**Expected Results:**
- Transaction rejected
- Failure reason = `NfcTagNotRegistered`
- AttendanceVerificationLog: IsSuccess = false, FailureReason = "NfcTagNotRegistered"

---

#### TC-ATT-068: NFC tag registered but inactive — NfcTagInactive
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. NFC tag UID exists in NfcTags table but Status = Disabled

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with disabled NFC tag UID

**Expected Results:**
- Transaction rejected
- Failure reason = `NfcTagInactive`
- AttendanceVerificationLog: IsSuccess = false, FailureReason = "NfcTagInactive"

---

#### TC-ATT-069: NFC tag registered to different branch — NfcTagMismatch
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. NFC tag registered to Branch 102 (Jeddah)
2. Employee attempting check-in at Branch 101 (Riyadh)
3. GPS verification passed for Branch 101

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with NFC tag from wrong branch

**Expected Results:**
- Transaction rejected
- Failure reason = `NfcTagMismatch`
- AttendanceVerificationLog: IsSuccess = false, FailureReason = "NfcTagMismatch"

---

#### TC-ATT-070: HMAC-SHA256 payload verification — valid signature
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. NfcEncryption:RequirePayload = true in appsettings
2. NFC tag has EncryptedPayload written during provisioning
3. Payload format: `{tagId}|{branchId}|{tagUid}|{timestamp}|{hmacSignature}`
4. HMAC computed with NfcEncryption:SecretKey

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with NFC payload containing valid HMAC signature

**Expected Results:**
- HMAC-SHA256 signature verified against SecretKey
- Payload data (tagId, branchId, tagUid) validated against NfcTags table
- Verification passes
- Transaction created

---

#### TC-ATT-071: HMAC payload tampered — NfcPayloadTampering
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. NfcEncryption:RequirePayload = true
2. NFC payload has been modified (branchId changed or signature altered)

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with tampered NFC payload

**Expected Results:**
- HMAC-SHA256 recomputation does not match provided signature
- Transaction rejected
- Failure reason = `NfcPayloadTampering`
- AttendanceVerificationLog: IsSuccess = false, FailureReason = "NfcPayloadTampering"

---

#### TC-ATT-072: HMAC payload not required (RequirePayload = false) — UID-only verification
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. NfcEncryption:RequirePayload = false
2. NFC tag UID is registered and active

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with NFC UID only (no payload)

**Expected Results:**
- Graceful degradation: UID-only verification
- Tag UID checked against NfcTags table
- HMAC verification skipped
- Transaction created if UID matches active tag for branch

---

#### TC-ATT-073: All verification attempts logged (success and failure)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Steps:**
1. Perform 3 mobile attendance transactions:
   - Transaction 1: GPS pass + NFC pass (success)
   - Transaction 2: GPS fail (outside geofence)
   - Transaction 3: GPS pass + NFC fail (tag mismatch)

**Expected Results:**
- AttendanceVerificationLogs table has 3 entries
- Each entry contains:
  - EmployeeId
  - BranchId
  - VerificationTimestamp
  - GpsLatitude, GpsLongitude
  - NfcTagUid (if provided)
  - DeviceId, DeviceModel, DevicePlatform, AppVersion
  - IsSuccess (true/false)
  - FailureReason (null for success)
  - DistanceFromBranch
- Both successful and failed attempts are logged (complete audit trail)

---

#### TC-ATT-074: GPS unavailable on device — GpsUnavailable
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. Device location services disabled or GPS coordinates not available

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with null/empty GPS coordinates

**Expected Results:**
- Transaction rejected
- Failure reason = `GpsUnavailable`
- AttendanceVerificationLog: IsSuccess = false, FailureReason = "GpsUnavailable"

---

#### TC-ATT-075: Branch not configured for mobile attendance — BranchNotConfigured
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. Branch 105 has no Latitude, Longitude, or GeofenceRadiusMeters configured
2. No NFC tags registered for Branch 105

**Steps:**
1. POST /api/v1/mobile/attendance/transaction for an employee in Branch 105

**Expected Results:**
- Transaction rejected
- Failure reason = `BranchNotConfigured`
- AttendanceVerificationLog: IsSuccess = false, FailureReason = "BranchNotConfigured"

---

#### TC-ATT-076: NFC payload missing when required — NfcPayloadInvalid
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API (Mobile) |
| **Role** | Employee |

**Preconditions:**
1. NfcEncryption:RequirePayload = true
2. Mobile app sends NFC UID but no payload data

**Steps:**
1. POST /api/v1/mobile/attendance/transaction with NFC UID only (no encrypted payload)

**Expected Results:**
- Transaction rejected (payload required but not provided)
- Failure reason = `NfcPayloadInvalid`
- AttendanceVerificationLog: IsSuccess = false, FailureReason = "NfcPayloadInvalid"

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Attendance Status Determination | 17 | 6 | 9 | 2 |
| B. Late Minutes Calculation | 9 | 4 | 3 | 2 |
| C. Early Leave Calculation | 5 | 2 | 3 | 0 |
| D. Working Hours Calculation | 3 | 1 | 1 | 1 |
| E. Overtime Calculation | 11 | 4 | 6 | 1 |
| F. Reports & UI | 13 | 5 | 7 | 1 |
| G. Generation & Finalization | 5 | 3 | 2 | 0 |
| H. GPS + NFC Verification | 13 | 5 | 6 | 2 |
| **TOTAL** | **76** | **30** | **37** | **9** |
