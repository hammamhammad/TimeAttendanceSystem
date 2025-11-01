# Attendance Core Tests

## Overview
This test suite covers daily attendance record generation, attendance transactions (clock in/out), status calculation, and core attendance functionality.

---

## Test Case ATT-001: Daily Attendance Record Generation via Background Job

**Priority:** High
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that the Coravel daily job generates attendance records for all active employees.

### Preconditions
- 10 active employees exist
- 2 inactive employees exist
- Shift assignments configured for all active employees
- Current date: 2024-02-15
- DailyAttendanceGenerationJob is configured

### Test Steps
1. Trigger background job manually or wait for scheduled execution (midnight)
2. Check job execution logs
3. Query attendance records for 2024-02-15
4. Verify record count and initial status

### Expected Results
- Job executes successfully
- Job logs show:
  - "Generated 10 records"
  - "Updated 0 records" (assuming no existing records)
  - "Errors: 0"
- 10 AttendanceRecord entries created for 2024-02-15
- Each record has:
  - Status = "Absent" (initial state)
  - Date = 2024-02-15
  - ShiftId = assigned shift
  - WorkedHours = 0
  - OvertimeHours = 0
- Inactive employees: No records generated
- Audit log entry created

---

## Test Case ATT-002: Clock In Transaction

**Priority:** High
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that employee clock-in creates a transaction and updates attendance status.

### Preconditions
- Employee exists (ID: 10)
- Attendance record for today exists with status "Absent"
- Shift: 09:00 - 17:00 (8 hours)
- Grace period: 15 minutes
- Current time: 08:55 (within grace period)

### Test Steps
1. Send POST request to `/api/v1/attendance/clock-in`:
   ```json
   {
     "employeeId": 10,
     "timestamp": "2024-02-15T08:55:00Z",
     "sourceType": "Mobile",
     "deviceId": "DEVICE001",
     "latitude": 30.0444,
     "longitude": 31.2357
   }
   ```
2. Verify transaction created
3. Check attendance record updated
4. Observe response

### Expected Results
- HTTP Status Code: 201 Created
- AttendanceTransaction created with:
  - TransactionType = "ClockIn"
  - Timestamp = 08:55
  - SourceType = "Mobile"
  - DeviceId = "DEVICE001"
  - Location captured
- AttendanceRecord updated:
  - Status changes from "Absent" to "Present" (or "InProgress")
  - ClockInTime = 08:55
- Response confirms successful clock-in
- Not marked as late (within grace period)

---

## Test Case ATT-003: Late Clock In Detection

**Priority:** High
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that late arrivals are detected and marked appropriately.

### Preconditions
- Employee exists (ID: 12)
- Attendance record for today exists
- Shift: 09:00 - 17:00
- Grace period: 15 minutes (allowed until 09:15)
- Current time: 09:30 (late)

### Test Steps
1. Send POST request to clock in at 09:30
2. Verify attendance record status
3. Check late minutes calculation

### Expected Results
- AttendanceTransaction created successfully
- AttendanceRecord updated:
  - Status = "Late" (or "Present" with late flag)
  - ClockInTime = 09:30
  - LateMinutes = 15 (09:30 - 09:15 grace end)
  - IsLate = true
- Late arrival flagged for reporting
- May affect employee performance metrics

---

## Test Case ATT-004: Clock Out Transaction

**Priority:** High
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that clock-out completes the attendance cycle and calculates hours.

### Preconditions
- Employee clocked in at 09:00
- Shift: 09:00 - 17:00 (8 hours)
- Break duration: 60 minutes
- Current time: 17:00

### Test Steps
1. Send POST request to `/api/v1/attendance/clock-out`:
   ```json
   {
     "employeeId": 10,
     "timestamp": "2024-02-15T17:00:00Z",
     "sourceType": "Fingerprint",
     "deviceId": "FP001"
   }
   ```
2. Verify transaction created
3. Check attendance record finalized
4. Verify worked hours calculation

### Expected Results
- AttendanceTransaction created with TransactionType = "ClockOut"
- AttendanceRecord updated:
  - Status = "FullDay" (completed full shift)
  - ClockOutTime = 17:00
  - WorkedHours = 7.0 (8 hours - 1 hour break)
  - TotalHours = 8.0
  - OvertimeHours = 0
- Attendance marked as complete
- Ready for payroll processing

---

## Test Case ATT-005: Early Departure Detection

**Priority:** High
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that early departures are detected and marked.

### Preconditions
- Employee clocked in at 09:00
- Shift: 09:00 - 17:00
- Grace period for departure: 15 minutes
- Current time: 16:30 (30 minutes early)

### Test Steps
1. Clock out at 16:30
2. Verify early departure detection
3. Check worked hours calculation

### Expected Results
- AttendanceTransaction created
- AttendanceRecord:
  - Status = "EarlyDeparture"
  - ClockOutTime = 16:30
  - EarlyDepartureMinutes = 30 (if no grace period) or 15 (if 15-min grace)
  - WorkedHours = reduced (6.5 hours instead of 7)
- Early departure flagged
- May affect salary/deductions

---

## Test Case ATT-006: Half Day Attendance

**Priority:** Medium
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that half-day attendance is correctly identified.

### Preconditions
- Employee clocked in at 09:00
- Shift: 09:00 - 17:00 (8 hours)
- Half-day threshold: 4 hours worked

### Test Steps
1. Clock in at 09:00
2. Clock out at 13:00 (4 hours worked)
3. Verify attendance status

### Expected Results
- AttendanceRecord:
  - Status = "HalfDay"
  - WorkedHours = 3.0 (4 hours - 1 hour break, if break deducted)
  - ClockInTime = 09:00
  - ClockOutTime = 13:00
- Half-day status for payroll
- Different from full absence

---

## Test Case ATT-007: Absent Status (No Transactions)

**Priority:** High
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that employees with no clock-in/out remain marked as absent.

### Preconditions
- Attendance record created by daily job with status "Absent"
- Employee did not clock in all day
- End of day reached (23:59)

### Test Steps
1. Query attendance record at end of day
2. Verify no transactions exist
3. Check final status

### Expected Results
- AttendanceRecord:
  - Status = "Absent"
  - ClockInTime = null
  - ClockOutTime = null
  - WorkedHours = 0
  - OvertimeHours = 0
- No AttendanceTransactions for this employee on this date
- Counted as full absence
- May trigger alerts/notifications

---

## Test Case ATT-008: Multiple Clock In/Out Pairs (Break Tracking)

**Priority:** Medium
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that multiple clock-in/out pairs are handled for break tracking.

### Preconditions
- Shift: 09:00 - 17:00
- Employee tracks breaks manually

### Test Steps
1. Clock in: 09:00
2. Clock out (break start): 12:00
3. Clock in (break end): 13:00
4. Clock out (end of day): 17:00
5. Verify worked hours calculation

### Expected Results
- 4 AttendanceTransactions created:
  - ClockIn: 09:00
  - ClockOut: 12:00
  - ClockIn: 13:00
  - ClockOut: 17:00
- Worked hours calculation:
  - Period 1: 09:00 - 12:00 = 3 hours
  - Period 2: 13:00 - 17:00 = 4 hours
  - Total: 7 hours
- Break time: 1 hour (12:00 - 13:00)
- Status: FullDay

---

## Test Case ATT-009: Attendance Status Real-Time Update

**Priority:** Medium
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that attendance status updates in real-time as transactions occur.

### Preconditions
- Attendance record exists with status "Absent"
- Employee has mobile app access

### Test Steps
1. Query attendance: GET `/api/v1/attendance/today`
2. Clock in via mobile
3. Query attendance again immediately
4. Clock out
5. Query final status

### Expected Results
- Step 1:
  - Status = "Absent"
  - WorkedHours = 0
- Step 3:
  - Status = "Present" or "InProgress"
  - ClockInTime populated
- Step 5:
  - Status = "FullDay", "HalfDay", "Late", or "EarlyDeparture"
  - WorkedHours calculated
  - OvertimeHours calculated
- Real-time status calculation
- No delay in status update

---

## Test Case ATT-010: Attendance Record Approval Workflow

**Priority:** Medium
**Type:** Functional
**Module:** Attendance - Core

### Description
Verify that attendance records can be reviewed and approved by managers.

### Preconditions
- Attendance record exists for employee (ID: 15) on 2024-02-15
- Record status: "FullDay"
- Manager logged in
- Approval workflow enabled

### Test Steps
1. GET `/api/v1/attendance?employeeId=15&status=Pending`
2. PUT `/api/v1/attendance/{record-id}/approve`:
   ```json
   {
     "approvedBy": "manager-id",
     "comments": "Approved for payroll"
   }
   ```
3. Verify approval status
4. Attempt to modify approved record

### Expected Results
- Step 1:
  - Returns attendance records pending approval
- Step 2:
  - HTTP Status Code: 200 OK
  - ApprovalStatus = "Approved"
  - ApprovedBy = manager ID
  - ApprovedAt = current timestamp
  - Comments saved
- Step 4:
  - Cannot modify approved records
  - HTTP Status Code: 400 Bad Request
  - Error: "Cannot modify approved attendance"
- Approval locks record for payroll integrity

---

## Test Execution Notes

### Test Data Requirements
- Active and inactive employees
- Shift assignments
- Test dates with various attendance patterns
- Mobile devices and fingerprint devices for source type testing

### Environment Setup
- Backend running on http://localhost:5099
- Coravel background job configured
- Database with seed data
- Time zone configuration correct

### Dependencies
- Shift management system
- Employee management
- Background job scheduler (Coravel)

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| ATT-001 | Daily Generation | High | ⬜ Not Run |
| ATT-002 | Clock In | High | ⬜ Not Run |
| ATT-003 | Late Detection | High | ⬜ Not Run |
| ATT-004 | Clock Out | High | ⬜ Not Run |
| ATT-005 | Early Departure | High | ⬜ Not Run |
| ATT-006 | Half Day | Medium | ⬜ Not Run |
| ATT-007 | Absent Status | High | ⬜ Not Run |
| ATT-008 | Break Tracking | Medium | ⬜ Not Run |
| ATT-009 | Real-time Update | Medium | ⬜ Not Run |
| ATT-010 | Approval Workflow | Medium | ⬜ Not Run |
