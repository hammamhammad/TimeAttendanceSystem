# TC-LEAVE: Leave Management — Test Cases

## Module Overview

Leave Management covers the complete lifecycle of employee leave: configuring vacation types (including Saudi labor law compliance), creating and approving vacation requests, tracking leave balances with accrual/carryover, bulk vacation assignment, leave entitlements, and employee self-service vacation requests. The balance formula ensures real-time accuracy: **Balance = Entitled + Accrued + Adjusted - Used - Pending**.

**Admin Pages**: `/vacation-types`, `/vacation-types/:id`, `/employee-vacations`, `/employee-vacations/create`, `/employee-vacations/:id/view`, `/employee-vacations/:id/edit`, `/settings/leave-entitlements`, `/settings/leave-entitlements/create`
**Self-Service Pages**: `/vacation-requests`, `/vacation-requests/new`, `/vacation-requests/:id`, `/vacation-requests/:id/edit`
**API Endpoints**: `GET/POST/PUT/DELETE /api/v1/vacation-types`, `GET/POST/PUT/DELETE /api/v1/employee-vacations`, `GET/POST /api/v1/leave-balances`, `GET/POST /api/v1/leave-entitlements`, `POST /api/v1/employee-vacations/bulk`, `GET/POST/PUT /api/v1/portal/my-vacations`
**Backend Handlers**: `CreateVacationTypeCommandHandler`, `CreateEmployeeVacationCommandHandler`, `UpdateEmployeeVacationCommandHandler`, `BulkCreateVacationCommandHandler`, `CreateLeaveEntitlementCommandHandler`

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full access, IsSystemUser=true |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Can approve leave requests |
| Dept Manager | sara.fahad@company.com | Emp@123! | Can approve for department |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee |

---

## Test Cases

### A. Vacation Type Configuration

#### TC-LEAVE-001: Vacation type list page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /vacation-types |
| **Role** | System Admin |

**Preconditions:**
1. Logged in as System Admin
2. Saudi labor law vacation types are seeded (Annual, Sick, Marriage, Maternity, Paternity, Bereavement, Hajj)

**Steps:**
1. Navigate to /vacation-types

**Expected Results:**
- Data table renders with columns: Name, Name (Arabic), Paid/Unpaid, Max Days, Status
- Seeded Saudi vacation types are listed
- Search, refresh, and add buttons visible via UnifiedFilterComponent
- Pagination controls shown

---

#### TC-LEAVE-002: Create vacation type — all required fields validated
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /vacation-types/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to create vacation type page
2. Leave Name field empty
3. Attempt to submit

**Expected Results:**
- Name field shows required validation error
- Form cannot be submitted
- API call is NOT made

---

#### TC-LEAVE-003: Vacation type Name field — maxLength and pattern validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /vacation-types/create |
| **Role** | System Admin |

**Steps:**
1. Enter a name with 101 characters
2. Observe validation error
3. Clear and enter "Annual Leave (2026)" — valid: letters, digits, whitespace, hyphens, underscores, dots, parentheses
4. Clear and enter "Leave@#$%" — invalid special characters
5. Observe validation

**Expected Results:**
- Step 2: maxLength(100) validation error shown
- Step 3: Accepted without error
- Step 4: Pattern validation error — only letters, digits, whitespace, hyphens, underscores, dots, and parentheses allowed

---

#### TC-LEAVE-004: Vacation type NameAr field — Arabic Unicode validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /vacation-types/create |
| **Role** | System Admin |

**Steps:**
1. Enter Arabic text in NameAr field (e.g., "اجازة سنوية") — valid
2. Clear and enter Latin text "Annual Leave" — invalid
3. Clear and enter 101 Arabic characters
4. Observe validation for each

**Expected Results:**
- Step 1: Accepted — Arabic Unicode ranges 0x0600-0x06FF, 0x0750-0x077F, 0xFB50-0xFDFF, 0xFE70-0xFEFF plus whitespace are valid
- Step 2: Validation error — non-Arabic characters rejected
- Step 3: maxLength(100) validation error shown

---

#### TC-LEAVE-005: Create vacation type with paid/unpaid and max days
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /vacation-types/create |
| **Role** | System Admin |

**Steps:**
1. Fill Name: "Emergency Leave"
2. Set IsPaid: true
3. Set MaxDays: 5
4. Configure carryover: allowed, max 2 days
5. Submit form

**Expected Results:**
- Vacation type created successfully
- Success notification displayed
- Redirected to vacation type list or view page
- New type appears in list with correct paid status and max days

---

#### TC-LEAVE-006: Create vacation type with accrual settings
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /vacation-types/create |
| **Role** | System Admin |

**Steps:**
1. Fill Name: "Annual Leave - Custom"
2. Set IsPaid: true
3. Set MaxDays: 30
4. Enable accrual: monthly, 2.5 days per month
5. Set carryover: allowed, max 10 days, expiry 90 days
6. Submit form

**Expected Results:**
- Vacation type created with accrual policy
- Accrual frequency: Monthly
- Accrual amount: 2.5 days/month
- Carryover max: 10 days with 90-day expiry

---

#### TC-LEAVE-007: View vacation type detail page
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /vacation-types/:id |
| **Role** | System Admin |

**Steps:**
1. Navigate to vacation types list
2. Click view action on "Annual Leave" (seeded Saudi type)

**Expected Results:**
- View page shows DefinitionListComponent with:
  - Name / Name (Arabic)
  - Paid/Unpaid status via StatusBadgeComponent
  - Max days, carryover rules, accrual settings
  - Saudi Labor Law reference (Art.109 for Annual)
- Back navigation works

---

#### TC-LEAVE-008: Saudi labor law seeded vacation types are present
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Data Integrity |
| **Page** | /vacation-types |
| **Role** | System Admin |

**Preconditions:**
1. Tenant provisioned with Saudi Standard policy template

**Steps:**
1. Navigate to /vacation-types
2. Verify all 7 seeded Saudi types exist

**Expected Results:**
- Annual Leave (Art.109): 21-30 days, paid
- Sick Leave (Art.117): up to 120 days, paid/partial
- Marriage Leave: 5 days, paid
- Maternity Leave (Art.151): 70 days, paid
- Paternity Leave: 3 days, paid
- Bereavement Leave: 3-5 days, paid
- Hajj Leave (Art.114): 10-15 days, paid (once during employment)

---

### B. Employee Vacation Form — Field Validation

#### TC-LEAVE-009: Employee vacation form — employeeId is required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to create employee vacation page
2. Leave employee dropdown unselected
3. Fill all other required fields (vacation type, start date, end date)
4. Attempt to submit

**Expected Results:**
- Validation error: "must be provided"
- Form does not submit
- Employee field highlighted with error state

---

#### TC-LEAVE-010: Employee vacation form — vacationTypeId is required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to create employee vacation page
2. Select an employee
3. Leave vacation type unselected
4. Fill start and end dates
5. Attempt to submit

**Expected Results:**
- Validation error: "must be provided"
- Form does not submit

---

#### TC-LEAVE-011: Employee vacation form — startDate is required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Steps:**
1. Fill all fields except start date
2. Attempt to submit

**Expected Results:**
- Validation error: "required"
- Form does not submit

---

#### TC-LEAVE-012: Employee vacation form — endDate must be >= startDate
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Steps:**
1. Set startDate to 2026-05-15
2. Set endDate to 2026-05-10 (before start date)
3. Attempt to submit

**Expected Results:**
- Validation error: "must be after or equal to start date"
- Form does not submit

---

#### TC-LEAVE-013: Employee vacation form — notes maxLength(1000)
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Steps:**
1. Fill all required fields
2. Enter 1001 characters in notes field
3. Attempt to submit

**Expected Results:**
- Validation error for notes exceeding 1000 characters
- Alternatively, input is truncated at 1000 characters

---

#### TC-LEAVE-014: Employee vacation form — isHalfDay requires single day
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Steps:**
1. Set startDate to 2026-05-15
2. Set endDate to 2026-05-16 (multi-day range)
3. Toggle isHalfDay = true
4. Attempt to submit

**Expected Results:**
- Validation error: "must be for a single day"
- Half-day leave only valid when startDate == endDate

---

#### TC-LEAVE-015: Employee vacation form — halfDayType required when isHalfDay
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Steps:**
1. Set startDate and endDate to same date (2026-05-15)
2. Toggle isHalfDay = true
3. Leave halfDayType unselected
4. Attempt to submit

**Expected Results:**
- Validation error: "Half-day type required when requesting half-day leave"
- Half-day type options: FirstHalf, SecondHalf

---

#### TC-LEAVE-016: Employee vacation form — date range cannot exceed 365 days
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Steps:**
1. Set startDate to 2026-01-01
2. Set endDate to 2027-01-02 (366 days)
3. Attempt to submit

**Expected Results:**
- Validation error: "vacation period cannot exceed 365 days"
- Form does not submit

---

#### TC-LEAVE-017: Create employee vacation — happy path
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Preconditions:**
1. Employee has sufficient leave balance for selected vacation type

**Steps:**
1. Select employee (salma.khaldi@company.com)
2. Select vacation type: Annual Leave
3. Set startDate: 2026-06-01
4. Set endDate: 2026-06-05
5. Add notes: "Family vacation"
6. Submit form

**Expected Results:**
- Vacation request created successfully
- Success notification displayed
- Status is "Pending" (awaiting approval)
- Leave balance PendingDays increased by requested days
- Redirect to vacation list or view page

---

#### TC-LEAVE-018: View employee vacation detail page
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-vacations/:id/view |
| **Role** | System Admin |

**Preconditions:**
1. At least one employee vacation exists

**Steps:**
1. Navigate to employee vacations list
2. Click view action on a vacation request

**Expected Results:**
- View page shows:
  - Employee name, vacation type, dates, total days
  - Status via StatusBadgeComponent (Pending/Approved/Rejected/Cancelled)
  - Notes, half-day info (if applicable)
  - Approval workflow history (if workflow configured)
  - Created/modified timestamps

---

#### TC-LEAVE-019: Edit employee vacation — only Pending status allowed
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /employee-vacations/:id/edit |
| **Role** | System Admin |

**Preconditions:**
1. One vacation with status Pending, one with status Approved

**Steps:**
1. Navigate to employee vacations list
2. Attempt to edit the Pending vacation — should be allowed
3. Attempt to edit the Approved vacation — should be blocked

**Expected Results:**
- Pending vacation: Edit page loads, fields are editable
- Approved vacation: Edit action hidden or disabled; if URL accessed directly, error shown or redirect

---

#### TC-LEAVE-020: Employee vacation list with filters and pagination
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-vacations |
| **Role** | System Admin |

**Steps:**
1. Navigate to /employee-vacations
2. Filter by vacation type
3. Filter by status (Pending, Approved, Rejected, Cancelled)
4. Filter by date range
5. Search by employee name
6. Navigate between pages

**Expected Results:**
- Data table renders with correct columns
- Each filter narrows results appropriately
- Search matches employee name
- Pagination works with correct page size
- Empty state shown when no results match filters

---

### C. Leave Balance Formula — Every Operation

#### TC-LEAVE-021: Balance formula — initial state
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Logic |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Employee has a leave entitlement of 21 days annual leave
2. No vacations taken yet

**Steps:**
1. Query leave balance for employee via `GET /api/v1/leave-balances?employeeId={id}&vacationTypeId={annualId}`

**Expected Results:**
- Balance = Entitled(21) + Accrued(0) + Adjusted(0) - Used(0) - Pending(0) = 21 days
- All transaction buckets at initial values

---

#### TC-LEAVE-022: Balance — reservation on request submission (PendingDays += RequestedDays)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Logic |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Employee balance: Entitled=21, Accrued=0, Used=0, Pending=0

**Steps:**
1. Create a vacation request for 5 days
2. Check leave balance

**Expected Results:**
- PendingDays = 5
- Available balance = 21 - 0 - 5 = 16
- LeaveTransaction created with type = Reservation
- Vacation status = Pending

---

#### TC-LEAVE-023: Balance — insufficient balance rejects request
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Logic |
| **Page** | /employee-vacations/create |
| **Role** | System Admin |

**Preconditions:**
1. Employee balance: Available = 3 days (Entitled=21, Used=15, Pending=3)

**Steps:**
1. Create a vacation request for 5 days (exceeds available 3 days)

**Expected Results:**
- Request fails with insufficient balance error
- No LeaveTransaction created
- PendingDays unchanged
- Error notification shown to user

---

#### TC-LEAVE-024: Balance — approval (UsedDays += confirmed, PendingDays -= confirmed)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Logic |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Employee has a Pending vacation of 5 days
2. Balance: Entitled=21, Used=0, Pending=5

**Steps:**
1. Approve the vacation request
2. Check leave balance

**Expected Results:**
- UsedDays = 5 (increased by confirmed days)
- PendingDays = 0 (decreased by confirmed days)
- Available balance = 21 - 5 - 0 = 16
- LeaveTransaction created with type = Usage
- Vacation status = Approved

---

#### TC-LEAVE-025: Balance — rejection (PendingDays -= released)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Logic |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Employee has a Pending vacation of 5 days
2. Balance: Entitled=21, Used=0, Pending=5

**Steps:**
1. Reject the vacation request
2. Check leave balance

**Expected Results:**
- PendingDays = 0 (released back)
- UsedDays = 0 (unchanged)
- Available balance = 21 - 0 - 0 = 21 (fully restored)
- LeaveTransaction created with type = ReservationRelease
- Vacation status = Rejected

---

#### TC-LEAVE-026: Balance — cancellation of approved leave (UsedDays -= returned)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Logic |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Employee has an Approved vacation of 5 days
2. Balance: Entitled=21, Used=5, Pending=0

**Steps:**
1. Cancel the approved vacation request
2. Check leave balance

**Expected Results:**
- UsedDays = 0 (decreased by returned days)
- Available balance = 21 - 0 - 0 = 21 (fully restored)
- LeaveTransaction created with type = Usage (negative/reversal)
- Vacation status = Cancelled

---

#### TC-LEAVE-027: Balance — positive adjustment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Logic |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Employee balance: Entitled=21, Adjusted=0

**Steps:**
1. Apply a positive adjustment of +3 days via admin API
2. Check leave balance

**Expected Results:**
- Adjusted = 3
- Available balance = 21 + 0 + 3 - 0 - 0 = 24
- LeaveTransaction created with type = Adjustment, amount = +3

---

#### TC-LEAVE-028: Balance — negative adjustment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Logic |
| **Page** | API |
| **Role** | System Admin |

**Preconditions:**
1. Employee balance: Entitled=21, Adjusted=0

**Steps:**
1. Apply a negative adjustment of -5 days via admin API
2. Check leave balance

**Expected Results:**
- Adjusted = -5
- Available balance = 21 + 0 + (-5) - 0 - 0 = 16
- LeaveTransaction created with type = Adjustment, amount = -5

---

#### TC-LEAVE-029: Balance — monthly accrual calculation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Logic |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Vacation type with accrual enabled: 21 days/year = 1.75 days/month
2. Employee hired before the accrual date
3. Leave entitlement effective and active

**Steps:**
1. Trigger monthly leave accrual job (MonthlyLeaveAccrualJob)
2. Check leave balance

**Expected Results:**
- Accrued += 1.75 days
- LeaveTransaction created with type = Accrual
- Available balance increases by 1.75

---

#### TC-LEAVE-030: Balance — accrual prorated by hire date
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Logic |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Employee hired on the 15th of the month (mid-month)
2. Monthly accrual: 1.75 days/month

**Steps:**
1. Trigger monthly accrual for the employee's first month

**Expected Results:**
- Accrual is prorated: ~0.875 days (half month)
- Subsequent full months accrue 1.75 days each

---

#### TC-LEAVE-031: Balance — accrual skipped if prerequisites not met
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Logic |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Employee hired AFTER the accrual date (not yet eligible)
2. OR entitlement not yet effective
3. OR accrual already processed for this period

**Steps:**
1. Trigger monthly accrual job

**Expected Results:**
- No accrual transaction created for ineligible employee
- Balance unchanged
- No duplicate accrual if already processed for the period

---

#### TC-LEAVE-032: Balance — year-end carryover
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Logic |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Vacation type allows carryover: max 10 days, expiry 90 days
2. Employee has 8 unused days at year end

**Steps:**
1. Process year-end carryover

**Expected Results:**
- 8 days carried over (within max 10 limit)
- LeaveTransaction type = CarryOver, amount = 8
- Carryover expiry date set to 90 days into new year
- New year balance starts with carryover included

---

#### TC-LEAVE-033: Balance — carryover exceeds max limit
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Logic |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Vacation type carryover max: 10 days
2. Employee has 15 unused days at year end

**Steps:**
1. Process year-end carryover

**Expected Results:**
- Only 10 days carried over (capped at max)
- 5 excess days forfeited
- LeaveTransaction type = CarryOver, amount = 10
- LeaveTransaction type = Expiry, amount = 5

---

#### TC-LEAVE-034: Balance — carryover days expire after expiry period
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Logic |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Employee has 8 carryover days from previous year
2. Carryover expiry: 90 days into new year
3. Current date is past the 90-day expiry

**Steps:**
1. Process expiry check

**Expected Results:**
- Unused carryover days expired
- LeaveTransaction type = Expiry
- Balance reduced by expired carryover amount

---

#### TC-LEAVE-035: Balance — all transaction types recorded correctly
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Data Integrity |
| **Page** | API |
| **Role** | System Admin |

**Steps:**
1. Query leave transactions for an employee who has had all lifecycle events
2. Verify each transaction type exists in history

**Expected Results:**
- Transaction types present: Accrual, Usage, Adjustment, CarryOver, Expiry, Reservation, ReservationRelease
- Each transaction has: date, amount, running balance, reference (vacation ID or job ID)
- Transactions are chronologically ordered

---

### D. Bulk Vacation

#### TC-LEAVE-036: Bulk vacation — create for entire branch
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /employee-vacations (bulk modal) |
| **Role** | System Admin |

**Steps:**
1. Open bulk vacation creation modal
2. Select vacationTypeId: "Annual Leave"
3. Set startDate: 2026-07-01
4. Set endDate: 2026-07-05
5. Set assignmentType: Branch
6. Select BranchId: "Headquarters - Riyadh"
7. Submit

**Expected Results:**
- Vacation requests created for all active employees in the branch
- Each employee gets an individual vacation record
- Leave balances updated for each employee
- Success notification with count of created requests

---

#### TC-LEAVE-037: Bulk vacation — create for department
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /employee-vacations (bulk modal) |
| **Role** | System Admin |

**Steps:**
1. Open bulk vacation creation modal
2. Select vacationTypeId: "Annual Leave"
3. Set startDate: 2026-07-01, endDate: 2026-07-03
4. Set assignmentType: Department
5. Select DepartmentId: "IT"
6. Submit

**Expected Results:**
- Vacation requests created for all active employees in IT department
- BranchId is NOT required when assignmentType = Department
- Success notification shown

---

#### TC-LEAVE-038: Bulk vacation — startDate validation (>= 1 year ago)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-vacations (bulk modal) |
| **Role** | System Admin |

**Steps:**
1. Set startDate to more than 1 year in the past (e.g., 2025-01-01 when current date is 2026-04-10)
2. Attempt to submit

**Expected Results:**
- Validation error: startDate must be within 1 year in the past
- Form does not submit

---

#### TC-LEAVE-039: Bulk vacation — endDate validation (<= 2 years future)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-vacations (bulk modal) |
| **Role** | System Admin |

**Steps:**
1. Set endDate to more than 2 years in the future
2. Attempt to submit

**Expected Results:**
- Validation error: endDate must be within 2 years in the future
- Form does not submit

---

#### TC-LEAVE-040: Bulk vacation — date range cannot exceed 180 days
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-vacations (bulk modal) |
| **Role** | System Admin |

**Steps:**
1. Set startDate: 2026-01-01
2. Set endDate: 2026-07-01 (181 days)
3. Attempt to submit

**Expected Results:**
- Validation error: date range cannot exceed 180 days
- Form does not submit

---

### E. Leave Entitlement Form

#### TC-LEAVE-041: Leave entitlement — year range validation (2000-2100)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/leave-entitlements/create |
| **Role** | System Admin |

**Steps:**
1. Enter year: 1999
2. Observe validation
3. Clear and enter year: 2101
4. Observe validation
5. Clear and enter year: 2026
6. Observe validation

**Expected Results:**
- Step 2: Validation error — year must be >= 2000
- Step 4: Validation error — year must be <= 2100
- Step 6: Accepted

---

#### TC-LEAVE-042: Leave entitlement — annualDays validation (1-365)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/leave-entitlements/create |
| **Role** | System Admin |

**Steps:**
1. Enter annualDays: 0
2. Observe validation
3. Clear and enter annualDays: 366
4. Observe validation
5. Clear and enter annualDays: 21

**Expected Results:**
- Step 2: Validation error — minimum 1 day
- Step 4: Validation error — maximum 365 days
- Step 5: Accepted

---

#### TC-LEAVE-043: Leave entitlement — carryOverDays validation (0-365)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/leave-entitlements/create |
| **Role** | System Admin |

**Steps:**
1. Enter carryOverDays: -1
2. Observe validation
3. Clear and enter carryOverDays: 366
4. Observe validation
5. Clear and enter carryOverDays: 10

**Expected Results:**
- Step 2: Validation error — minimum 0
- Step 4: Validation error — maximum 365
- Step 5: Accepted

---

#### TC-LEAVE-044: Leave entitlement — maxCarryOverDays >= carryOverDays
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/leave-entitlements/create |
| **Role** | System Admin |

**Steps:**
1. Set carryOverDays: 10
2. Set maxCarryOverDays: 5 (less than carryOverDays)
3. Attempt to submit

**Expected Results:**
- Validation error: maxCarryOverDays must be >= carryOverDays
- maxCarryOverDays must also be <= 365
- Form does not submit

---

#### TC-LEAVE-045: Leave entitlement — effective dates must be within entitlement year
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/leave-entitlements/create |
| **Role** | System Admin |

**Steps:**
1. Set year: 2026
2. Set effectiveStartDate: 2025-12-15 (outside entitlement year)
3. Attempt to submit
4. Correct to effectiveStartDate: 2026-01-01
5. Set effectiveEndDate: 2027-01-15 (outside entitlement year)
6. Attempt to submit

**Expected Results:**
- Step 3: Validation error — effectiveStartDate must be within the entitlement year (2026)
- Step 6: Validation error — effectiveEndDate must be within the entitlement year (2026)

---

### F. Self-Service Vacation Requests

#### TC-LEAVE-046: Self-service — vacation request list page renders
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /vacation-requests (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Logged in as employee (salma.khaldi@company.com) on Self-Service Portal

**Steps:**
1. Navigate to /vacation-requests

**Expected Results:**
- List page shows only current employee's vacation requests (not all employees)
- Columns: Vacation Type, Start Date, End Date, Total Days, Status
- "New Request" button visible
- Requests sorted by date (newest first)

---

#### TC-LEAVE-047: Self-service — create vacation request form
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /vacation-requests/new (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Click "New Request" button
2. Observe form fields

**Expected Results:**
- Form fields: Vacation Type (dropdown), Start Date, End Date, Notes
- Employee is auto-set to current logged-in user (no employee dropdown)
- Notes field max length: 500 characters
- Vacation type dropdown shows only types available to the employee
- Total days auto-calculated when dates selected

---

#### TC-LEAVE-048: Self-service — total days calculated and displayed
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /vacation-requests/new (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Select vacation type: Annual Leave
2. Set startDate: 2026-06-01 (Monday)
3. Set endDate: 2026-06-05 (Friday)
4. Observe total days display

**Expected Results:**
- Total days calculated and shown (5 calendar days or adjusted for business days per policy)
- Current leave balance displayed alongside the request
- Remaining balance after request shown (balance - total days)

---

#### TC-LEAVE-049: Self-service — confirmation dialog before submit
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /vacation-requests/new (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Fill all required fields
2. Click submit button
3. Observe confirmation dialog

**Expected Results:**
- ConfirmationModalComponent appears before API call
- Dialog shows vacation summary: type, dates, total days
- "Confirm" and "Cancel" buttons present
- Clicking "Cancel" returns to form without submitting
- Clicking "Confirm" submits the request

---

#### TC-LEAVE-050: Self-service — successful vacation request submission
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /vacation-requests/new (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has sufficient leave balance

**Steps:**
1. Select vacation type: Annual Leave
2. Set startDate: 2026-06-15, endDate: 2026-06-19
3. Add notes: "Personal vacation"
4. Submit and confirm

**Expected Results:**
- Success notification displayed
- Request created with status "Pending"
- Redirected to vacation requests list
- New request appears in the list
- Leave balance PendingDays increased
- employeeId auto-populated from JWT (current user)

---

#### TC-LEAVE-051: Self-service — view vacation request with approval status
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /vacation-requests/:id (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has at least one vacation request

**Steps:**
1. Navigate to vacation requests list
2. Click on a vacation request to view details

**Expected Results:**
- Detail page shows:
  - Vacation type, dates, total days, notes
  - Status badge (Pending/Approved/Rejected/Cancelled)
  - Workflow approval history (if workflow configured)
  - Approver name and comments (if approved/rejected)
  - Created date
- Back navigation to list

---

#### TC-LEAVE-052: Self-service — edit only Pending requests
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /vacation-requests/:id/edit (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has one Pending and one Approved vacation request

**Steps:**
1. View the Pending request — observe edit button
2. Click edit, modify dates, save
3. View the Approved request — observe edit availability

**Expected Results:**
- Pending: Edit button visible, form loads with pre-filled data, save updates the request
- Approved: Edit button hidden or disabled, direct URL access shows error/redirect
- Only Pending status allows editing

---

#### TC-LEAVE-053: Self-service — cancel approved vacation with validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /vacation-requests/:id (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has an Approved vacation request for a future date

**Steps:**
1. View the approved vacation request
2. Click "Cancel" button
3. Confirm cancellation in dialog

**Expected Results:**
- Confirmation dialog appears warning about cancellation
- After confirmation, request status changes to Cancelled
- Leave balance restored: UsedDays decreased by cancelled days
- Success notification shown
- Cannot cancel a vacation that has already started or passed

---

#### TC-LEAVE-054: Self-service — notes field maxLength(500)
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /vacation-requests/new (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Fill required fields
2. Enter 501 characters in notes field
3. Attempt to submit

**Expected Results:**
- Validation error for notes exceeding 500 characters
- OR input truncated at 500 characters
- Self-service notes limit (500) is different from admin notes limit (1000)

---

#### TC-LEAVE-055: Self-service — insufficient balance prevents submission
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /vacation-requests/new (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has only 2 days remaining leave balance

**Steps:**
1. Select vacation type: Annual Leave
2. Set dates spanning 5 days
3. Submit and confirm

**Expected Results:**
- Error notification: insufficient leave balance
- Request is NOT created
- Balance unchanged
- UI ideally shows remaining balance vs. requested days before submission to warn user

---

## Summary

| Section | Test Cases | IDs |
|---------|-----------|-----|
| A. Vacation Type Configuration | 8 | TC-LEAVE-001 to TC-LEAVE-008 |
| B. Employee Vacation Form — Field Validation | 12 | TC-LEAVE-009 to TC-LEAVE-020 |
| C. Leave Balance Formula — Every Operation | 15 | TC-LEAVE-021 to TC-LEAVE-035 |
| D. Bulk Vacation | 5 | TC-LEAVE-036 to TC-LEAVE-040 |
| E. Leave Entitlement Form | 5 | TC-LEAVE-041 to TC-LEAVE-045 |
| F. Self-Service Vacation Requests | 10 | TC-LEAVE-046 to TC-LEAVE-055 |
| **Total** | **55** | **TC-LEAVE-001 to TC-LEAVE-055** |

### Priority Distribution

| Priority | Count | Description |
|----------|-------|-------------|
| P0 | 18 | Critical — balance accuracy, form submission, CRUD operations |
| P1 | 28 | High — validations, business rules, accrual/carryover, bulk ops |
| P2 | 9 | Medium — UI polish, edge cases, field length limits |

### Category Distribution

| Category | Count |
|----------|-------|
| Validation | 19 |
| Functional | 12 |
| Business Logic | 12 |
| UI | 7 |
| Data Integrity | 3 |
| Background Job (System) | 2 |
