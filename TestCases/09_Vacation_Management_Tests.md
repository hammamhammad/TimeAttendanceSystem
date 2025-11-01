# Vacation Management Tests

## Overview
This test suite covers vacation type configuration, vacation request creation, accrual calculation, approval workflow, conflict detection, and carryover management.

---

## Test Case VAC-001: Create Annual Vacation Type

**Priority:** High
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that annual vacation types can be created with accrual rules and carryover settings.

### Preconditions
- User with admin permission is logged in
- No duplicate vacation type code exists

### Test Steps
1. Send POST request to `/api/v1/vacation-types`:
   ```json
   {
     "code": "ANNUAL",
     "name": "Annual Leave",
     "nameAr": "إجازة سنوية",
     "accrualType": "Annual",
     "daysPerYear": 21,
     "maxDaysPerRequest": 14,
     "maxCarryoverDays": 5,
     "carryoverExpirationMonths": 3,
     "requiresApproval": true,
     "isPaid": true,
     "isActive": true
   }
   ```
2. Verify vacation type created

### Expected Results
- HTTP Status Code: 201 Created
- VacationType record created
- Accrual: 21 days per year
- Max per request: 14 days
- Carryover: 5 days (expires in 3 months)
- Requires approval
- Available for employee vacation requests

---

## Test Case VAC-002: Create Vacation Request Within Balance

**Priority:** High
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that employees can create vacation requests when they have sufficient balance.

### Preconditions
- Employee exists (ID: 10)
- Vacation type "Annual" exists
- Employee balance: 15 days
- Employee logged in to portal
- Dates: Feb 20-24, 2024 (5 working days)

### Test Steps
1. Navigate to `/portal/vacation-requests/create`
2. Submit request:
   ```json
   {
     "vacationTypeId": 1,
     "startDate": "2024-02-20",
     "endDate": "2024-02-24",
     "reason": "Family vacation"
   }
   ```
3. Verify request created

### Expected Results
- Working days calculated: 5 (excludes weekend)
- Current balance: 15 days
- Sufficient balance (15 >= 5)
- HTTP Status Code: 201 Created
- EmployeeVacation record:
  - Status = "Pending"
  - WorkingDaysCount = 5
  - Balance check passed
- Request awaits approval

---

## Test Case VAC-003: Reject Request Exceeding Balance

**Priority:** High
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that vacation requests exceeding available balance are rejected.

### Preconditions
- Employee balance: 5 days
- Employee requests 10 working days

### Test Steps
1. Submit vacation request for 10 days
2. Observe error

### Expected Results
- HTTP Status Code: 400 Bad Request
- Error: "Insufficient vacation balance. Available: 5 days, Requested: 10 days"
- No request created
- Balance validation enforced

---

## Test Case VAC-004: Vacation Conflict Detection

**Priority:** High
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that overlapping vacation requests for same employee are detected and prevented.

### Preconditions
- Employee has approved vacation: Feb 20-24, 2024
- Employee attempts overlapping request

### Test Steps
1. Submit request for Feb 22-26:
   ```json
   {
     "vacationTypeId": 1,
     "startDate": "2024-02-22",
     "endDate": "2024-02-26"
   }
   ```

### Expected Results
- HTTP Status Code: 409 Conflict
- Error: "Overlapping vacation exists from Feb 20-24, 2024"
- Conflict detection prevents double-booking
- Existing approved vacation takes precedence

---

## Test Case VAC-005: Vacation Approval and Balance Deduction

**Priority:** High
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that approving vacation deducts from balance and updates attendance.

### Preconditions
- Vacation request exists (ID: 50, Status: Pending, 5 working days)
- Employee balance: 15 days
- Manager logged in

### Test Steps
1. PUT `/api/v1/vacations/50/approve`
2. Check employee balance
3. Check attendance records for vacation dates

### Expected Results
- Request status: "Approved"
- Employee balance: 10 days (15 - 5)
- Attendance records for Feb 20-24:
  - Status = "Vacation" or "OnLeave"
  - Marked as paid absence
  - Not counted as absences for penalties
- Balance transaction recorded

---

## Test Case VAC-006: Vacation Rejection Preserves Balance

**Priority:** Medium
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that rejecting vacation requests does not deduct from balance.

### Preconditions
- Vacation request (ID: 55, Pending, 5 days)
- Employee balance: 15 days
- Manager logged in

### Test Steps
1. PUT `/api/v1/vacations/55/reject`:
   ```json
   {
     "rejectionReason": "Insufficient coverage during requested period"
   }
   ```
2. Check employee balance

### Expected Results
- Request status: "Rejected"
- Employee balance: 15 days (unchanged)
- No balance deduction
- Employee can resubmit for different dates

---

## Test Case VAC-007: Annual Vacation Accrual Calculation

**Priority:** High
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that annual vacation accrual is calculated correctly based on hire date and employment duration.

### Preconditions
- Employee hire date: Jan 1, 2023
- Vacation type: 21 days per year (annual accrual)
- Current date: Feb 1, 2024
- Employee has worked >1 year

### Test Steps
1. Calculate accrued vacation for employee
2. Verify balance

### Expected Results
- Employment duration: 13 months
- Year 1 (2023): 21 days accrued
- Year 2 (2024): 21 days accrued (prorated: 21/12 × 1 = 1.75 days for January)
- Total accrued: 22.75 days (rounded per policy)
- Balance reflects accrual minus used vacation

---

## Test Case VAC-008: Monthly Pro-Rata Accrual

**Priority:** Medium
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that monthly pro-rata vacation accrual works correctly.

### Preconditions
- Vacation type: 12 days per year, Monthly accrual
- Employee hire date: Jan 15, 2024
- Current date: Feb 15, 2024

### Test Steps
1. Calculate monthly accrual
2. Verify balance

### Expected Results
- Monthly accrual: 12 / 12 = 1 day per month
- January (partial): 0.5 days (hired mid-month)
- February: 1 day
- Total accrued: 1.5 days
- Balance updates monthly

---

## Test Case VAC-009: Carryover Calculation and Expiration

**Priority:** Medium
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that unused vacation days carryover correctly and expire per policy.

### Preconditions
- Vacation type: Max carryover 5 days, expires in 3 months
- End of year 2023: Employee has 8 unused days
- Current date: Jan 1, 2024

### Test Steps
1. Run year-end carryover process
2. Check employee balance on Jan 1, 2024
3. Check balance on Apr 1, 2024 (after expiration)

### Expected Results
- Step 2 (Jan 1):
  - Carryover: 5 days (max allowed, not full 8)
  - 3 days lost (exceeds carryover limit)
  - New year accrual: 21 days
  - Total balance: 26 days
- Step 3 (Apr 1):
  - Carryover expired (3 months passed)
  - Carryover deducted: 5 days
  - Balance: 21 days (new year accrual only, assuming no usage)

---

## Test Case VAC-010: Cancel Vacation Request

**Priority:** Medium
**Type:** Functional
**Module:** Vacation Management

### Description
Verify that employees can cancel vacation requests and balance is restored.

### Preconditions
- Vacation request (ID: 60, Status: Approved, 5 days)
- Employee balance deducted: 15 → 10 days
- Vacation dates not yet started
- Employee logged in

### Test Steps
1. PUT `/api/v1/vacations/60/cancel`
2. Check request status
3. Check employee balance

### Expected Results
- Request status: "Cancelled"
- Balance restored: 10 → 15 days
- Attendance records updated (vacation dates cleared)
- Cancellation only allowed before vacation starts (policy dependent)

---

## Test Execution Notes

### Test Data Requirements
- Multiple vacation types (annual, sick, etc.)
- Employees with different hire dates
- Existing vacation requests in various statuses
- Accrual calculation engine

### Environment Setup
- Backend: http://localhost:5099
- Database with vacation types and balances
- Manager accounts for approval testing
- Date/time configured correctly

### Dependencies
- Employee management
- Attendance system
- Holiday calendar (for working days calculation)
- Approval workflow
- Balance tracking system

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| VAC-001 | Create Vacation Type | High | ⬜ Not Run |
| VAC-002 | Create Request | High | ⬜ Not Run |
| VAC-003 | Balance Validation | High | ⬜ Not Run |
| VAC-004 | Conflict Detection | High | ⬜ Not Run |
| VAC-005 | Approval & Deduction | High | ⬜ Not Run |
| VAC-006 | Rejection | Medium | ⬜ Not Run |
| VAC-007 | Annual Accrual | High | ⬜ Not Run |
| VAC-008 | Monthly Accrual | Medium | ⬜ Not Run |
| VAC-009 | Carryover & Expiry | Medium | ⬜ Not Run |
| VAC-010 | Cancellation | Medium | ⬜ Not Run |
