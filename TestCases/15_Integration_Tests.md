# Integration Tests

## Overview
This test suite covers cross-feature workflows, data consistency across modules, and end-to-end business processes.

---

## Test Case INT-001: Vacation Approval Updates Attendance

**Priority:** High
**Type:** Integration
**Module:** Vacation + Attendance

### Description
Verify that approving vacation requests correctly updates attendance records for vacation dates.

### Preconditions
- Employee (ID: 10) has submitted vacation for Feb 20-22 (3 days)
- Vacation status: Pending
- Attendance records exist for Feb 20-22 with status "Absent"
- Manager logged in

### Test Steps
1. Approve vacation: PUT `/api/v1/vacations/{id}/approve`
2. Query attendance records for Feb 20-22
3. Check vacation balance deduction
4. Verify employee cannot clock in on vacation days

### Expected Results
- Vacation status: "Approved"
- Attendance records for Feb 20-22:
  - Status changed from "Absent" to "OnVacation" or "Vacation"
  - WorkedHours = 0 (not required)
  - No penalties for absence
  - Marked as paid leave
- Vacation balance: Deducted 3 days
- Clock-in attempts on vacation days:
  - Blocked or flagged for manager review
- Integration between vacation and attendance systems working

---

## Test Case INT-002: Excuse Approval Adjusts Attendance Hours

**Priority:** High
**Type:** Integration
**Module:** Excuse + Attendance

### Description
Verify that approved excuse requests adjust attendance hours and status correctly.

### Preconditions
- Employee clocked in: 10:00 (late by 1 hour)
- Shift: 09:00-17:00
- Employee submitted excuse: 09:00-10:00 (1 hour, personal)
- Excuse status: Pending

### Test Steps
1. Check initial attendance: Status = "Late", LateMinutes = 60
2. Approve excuse: PUT `/api/v1/excuse-requests/{id}/approve`
3. Check updated attendance record

### Expected Results
- Attendance record updated:
  - Status changed from "Late" to "Present"
  - LateMinutes = 0 (excused)
  - ExcusedHours = 1
  - WorkedHours calculation adjusted
- Excuse integrated with attendance
- Employee not penalized for excused lateness

---

## Test Case INT-003: Remote Work Approval Updates Work Location

**Priority:** High
**Type:** Integration
**Module:** Remote Work + Attendance

### Description
Verify that approved remote work requests update attendance work location.

### Preconditions
- Employee requested remote work: Feb 20-22
- Request status: Pending
- Attendance records exist for Feb 20-22

### Test Steps
1. Approve remote work: PUT `/api/v1/remote-work-requests/{id}/approve`
2. Employee clocks in on Feb 20
3. Check attendance record

### Expected Results
- Remote work request: "Approved"
- Attendance for Feb 20-22:
  - WorkLocationType = "Remote" or similar flag
  - Clock-in allowed (via mobile app)
  - Normal attendance rules apply
  - Remote work day counted in quota
- Integration between remote work policy and attendance

---

## Test Case INT-004: Public Holiday Overtime Rate Application

**Priority:** High
**Type:** Integration
**Module:** Holiday + Attendance + Overtime

### Description
Verify that working on public holidays applies correct overtime rate.

### Preconditions
- Public holiday: Feb 14, 2024
- Employee assigned to work on Feb 14
- Overtime configuration: Holiday rate = 2.5x

### Test Steps
1. Employee clocks in on Feb 14: 09:00
2. Employee clocks out: 17:00 (8 hours)
3. Calculate attendance and overtime

### Expected Results
- Attendance record:
  - Date = Feb 14 (public holiday)
  - WorkedHours = 8
  - OvertimeHours = 8 (all hours on holiday = overtime)
  - OvertimeRate = 2.5x
  - IsHolidayWork = true
- Holiday calendar integrated with overtime calculation
- Proper compensation applied

---

## Test Case INT-005: Shift Assignment Affects Attendance Calculation

**Priority:** High
**Type:** Integration
**Module:** Shift + Attendance

### Description
Verify that shift assignment changes affect attendance status calculation.

### Preconditions
- Employee assigned to Shift A: 09:00-17:00
- Employee clocks in: 10:00 (late)
- Current status: "Late"

### Test Steps
1. Change employee shift to Shift B: 10:00-18:00 (effective immediately)
2. Recalculate attendance for current day
3. Verify status update

### Expected Results
- After shift change:
  - Clock-in at 10:00 is now on-time (Shift B starts at 10:00)
  - Status changed from "Late" to "Present"
  - LateMinutes = 0
- Shift change reflected in attendance calculation
- Integration between shift management and attendance

---

## Test Case INT-006: Employee Branch Transfer Affects Access

**Priority:** Medium
**Type:** Integration
**Module:** Employee + Multi-Tenancy + Access Control

### Description
Verify that transferring employee to different branch updates access and data visibility.

### Preconditions
- Employee X: Branch 1
- Manager A: Manages Branch 1
- Manager B: Manages Branch 2
- Employee X has pending vacation request

### Test Steps
1. Manager A views pending requests (sees Employee X's request)
2. Transfer Employee X to Branch 2
3. Manager A views pending requests again
4. Manager B views pending requests

### Expected Results
- Before transfer:
  - Manager A sees Employee X's request
  - Manager B does not see it
- After transfer:
  - Employee X.BranchId = 2
  - Manager A no longer sees Employee X's request
  - Manager B now sees Employee X's request
  - Branch scoping updated automatically
- Multi-tenant integrity maintained

---

## Test Case INT-007: Daily Attendance Generation with Shift Resolution

**Priority:** High
**Type:** Integration
**Module:** Background Job + Shift + Attendance

### Description
Verify that daily attendance generation correctly resolves shifts from hierarchy.

### Preconditions
- Employee A: Has employee-level shift assignment
- Employee B: Has department-level shift assignment
- Employee C: Has branch-level shift assignment (default)
- Coravel job scheduled

### Test Steps
1. Trigger DailyAttendanceGenerationJob
2. Check attendance records created for all 3 employees
3. Verify shift assignments

### Expected Results
- Attendance record for Employee A:
  - ShiftId = employee-level shift (highest priority)
- Attendance record for Employee B:
  - ShiftId = department-level shift
- Attendance record for Employee C:
  - ShiftId = branch-level shift (fallback)
- Shift resolution hierarchy working correctly
- Background job integrates with shift management

---

## Test Case INT-008: Vacation Balance Accrual and Carryover

**Priority:** Medium
**Type:** Integration
**Module:** Vacation + Employee + Time Calculation

### Description
Verify that vacation balance accrual based on hire date and carryover works correctly.

### Preconditions
- Employee hired: Jan 1, 2023
- Vacation type: 21 days/year, 5 days carryover
- Current date: Jan 1, 2024
- Employee used 16 days in 2023

### Test Steps
1. Run year-end accrual process
2. Check employee vacation balance on Jan 1, 2024
3. Employee requests 10 days vacation
4. Check balance after approval

### Expected Results
- 2023 balance:
  - Accrued: 21 days
  - Used: 16 days
  - Remaining: 5 days
- 2024 balance (Jan 1):
  - Carryover: 5 days (all remaining, within limit)
  - New accrual: 21 days (2024)
  - Total: 26 days
- After 10-day approval:
  - Balance: 16 days
- Accrual and carryover integration working

---

## Test Case INT-009: Manager Hierarchy for Approval Authority

**Priority:** Medium
**Type:** Integration
**Module:** Employee + Vacation/Excuse Approval

### Description
Verify that manager hierarchy determines approval authority for requests.

### Preconditions
- Manager Alice manages Employee Bob
- Manager Charlie manages Manager Alice
- Bob submits vacation request

### Test Steps
1. Login as Charlie (Alice's manager)
2. Attempt to approve Bob's vacation
3. Login as Alice (Bob's direct manager)
4. Approve Bob's vacation

### Expected Results
- Charlie (indirect manager):
  - Can view Bob's request (visibility)
  - Cannot approve (not direct manager) OR
  - Can approve if policy allows (hierarchical approval)
- Alice (direct manager):
  - Can view Bob's request
  - Can approve Bob's request
  - Approval authority based on direct reporting
- Employee-manager relationship integrated with approval workflow

---

## Test Case INT-010: Complete End-to-End Employee Lifecycle

**Priority:** High
**Type:** Integration - E2E
**Module:** All Modules

### Description
Verify complete employee lifecycle from hire to termination with all features.

### Preconditions
- System fully configured
- Admin access

### Test Steps
1. Create employee record
2. Link employee to user account
3. Assign shift
4. Generate first attendance record
5. Employee clocks in/out
6. Employee submits vacation request
7. Manager approves vacation
8. Employee submits excuse request
9. Employee creates fingerprint request
10. Employee terminates (soft delete)

### Expected Results
- All steps complete successfully
- Data flows correctly between modules:
  - Employee → User link → Portal access
  - Shift assignment → Attendance calculation
  - Vacation approval → Balance deduction → Attendance update
  - Excuse approval → Attendance adjustment
  - Fingerprint request → Completion tracking
  - Termination → Soft delete → Data preserved
- Complete integration across all features
- No data inconsistencies
- Audit trail for all actions

---

## Test Execution Notes

### Test Data Requirements
- Complete system with all modules enabled
- Test employees in various states
- Managers with different authority levels
- Background jobs configured
- Multi-branch setup

### Environment Setup
- Backend: http://localhost:5099
- Frontend: http://localhost:4200
- Database fully seeded
- Coravel background jobs running
- All integrations enabled

### Dependencies
- All system modules
- Database with referential integrity
- Middleware and services
- Background job scheduler

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| INT-001 | Vacation → Attendance | High | ⬜ Not Run |
| INT-002 | Excuse → Attendance | High | ⬜ Not Run |
| INT-003 | Remote Work → Location | High | ⬜ Not Run |
| INT-004 | Holiday → Overtime | High | ⬜ Not Run |
| INT-005 | Shift → Attendance | High | ⬜ Not Run |
| INT-006 | Transfer → Access | Medium | ⬜ Not Run |
| INT-007 | Job → Shift Resolution | High | ⬜ Not Run |
| INT-008 | Accrual → Carryover | Medium | ⬜ Not Run |
| INT-009 | Manager → Approval | Medium | ⬜ Not Run |
| INT-010 | End-to-End Lifecycle | High | ⬜ Not Run |
