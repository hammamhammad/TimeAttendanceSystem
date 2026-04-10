# TC-SWAP: Shift Swaps, On-Call, Compensatory Off & Leave Encashment — Test Cases

## Module Overview

This module covers employee-initiated shift swap requests with dual-party confirmation, on-call schedule management, compensatory time-off for employees who worked on off-days or holidays, and leave encashment for converting unused leave balance into monetary compensation. These features extend the core Time & Attendance and Leave Management modules.

**Admin Pages**: `/attendance/shift-swaps/*`, `/attendance/on-call/*`
**Self-Service Pages**: `/shift-swap-requests/*`, `/my-on-call`, `/my-compensatory-offs`, `/my-leave-encashments/*`
**API Endpoints**: `POST/GET/PUT/DELETE /api/v1/shift-swap-requests`, `POST/GET/PUT/DELETE /api/v1/on-call-schedules`, `POST/GET/PUT/DELETE /api/v1/compensatory-offs`, `POST/GET/PUT/DELETE /api/v1/leave-encashments`
**Background Jobs**: `CompensatoryOffExpiryJob`

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full access |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Approver for shift swaps |
| Employee A | salma.khaldi@company.com | Emp@123! | Swap requester |
| Employee B | khalid.omar@company.com | Emp@123! | Swap partner |

---

## Test Cases

### A. Shift Swaps

#### TC-SWAP-001: Create shift swap request
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /shift-swap-requests/create (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee A (salma.khaldi) and Employee B (khalid.omar) are in the same branch
2. Both employees have active shift assignments
3. Employee A has a morning shift on Apr 14, Employee B has an evening shift on Apr 14

**Steps:**
1. Login to self-service as salma.khaldi@company.com
2. Navigate to /shift-swap-requests/create
3. Select swap partner: Khalid Omar
4. Set original date: 2026-04-14 (Employee A's shift)
5. Set swap date: 2026-04-14 (Employee B's shift)
6. Enter reason: "Personal appointment in the evening"
7. Click Submit

**Expected Results:**
- Shift swap request created with status "Pending"
- Request ID assigned
- Employee B (Khalid Omar) receives notification to confirm/reject
- Request visible in Employee A's /shift-swap-requests list
- Success notification shown

---

#### TC-SWAP-002: Swap partner confirms shift swap
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shift-swap-requests (Self-Service) |
| **Role** | Employee (Swap Partner) |

**Preconditions:**
1. Shift swap request exists in "Pending" status (from TC-SWAP-001)

**Steps:**
1. Login to self-service as khalid.omar@company.com
2. Navigate to /shift-swap-requests (or notification link)
3. View the pending swap request from Salma Khaldi
4. Click "Confirm"

**Expected Results:**
- Request status changes from "Pending" to "PartnerConfirmed"
- Manager (ahmed.rashid) notified of swap request needing approval
- Both employees can see updated status
- Swap not yet effective until manager approval

---

#### TC-SWAP-003: Swap partner rejects shift swap
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shift-swap-requests (Self-Service) |
| **Role** | Employee (Swap Partner) |

**Preconditions:**
1. New shift swap request in "Pending" status

**Steps:**
1. Login as swap partner
2. View the pending swap request
3. Click "Reject"
4. Enter reason: "I have a conflicting appointment"

**Expected Results:**
- Request status changes to "Rejected"
- Requester notified of partner rejection
- No manager approval needed
- Request closed

---

#### TC-SWAP-004: Manager approves shift swap
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance/shift-swaps (Admin) |
| **Role** | Branch Manager |

**Preconditions:**
1. Shift swap request in "PartnerConfirmed" status (from TC-SWAP-002)

**Steps:**
1. Login to admin portal as ahmed.rashid@company.com
2. Navigate to /attendance/shift-swaps
3. View the partner-confirmed swap request
4. Click "Approve"

**Expected Results:**
- Request status changes to "Approved"
- Both employees' shift assignments updated for the swap date
- Employee A gets Employee B's original shift
- Employee B gets Employee A's original shift
- Both employees notified of approval
- Attendance generation uses swapped shifts for that date

---

#### TC-SWAP-005: Manager rejects shift swap
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance/shift-swaps (Admin) |
| **Role** | Branch Manager |

**Preconditions:**
1. Shift swap request in "PartnerConfirmed" status

**Steps:**
1. Login as branch manager
2. Navigate to /attendance/shift-swaps
3. Click "Reject" on the swap request
4. Enter reason: "Insufficient coverage on that date"

**Expected Results:**
- Request status changes to "Rejected"
- Both employees notified with rejection reason
- No shift changes applied
- Original shifts remain intact

---

#### TC-SWAP-006: Completed swap reflects in attendance
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance (Admin) |
| **Role** | System |

**Preconditions:**
1. Approved shift swap for date Apr 14 (from TC-SWAP-004)
2. Daily attendance generation has run for Apr 14

**Steps:**
1. Navigate to /attendance for Apr 14
2. Check Employee A's attendance record
3. Check Employee B's attendance record

**Expected Results:**
- Employee A's attendance generated against Employee B's original shift (evening)
- Employee B's attendance generated against Employee A's original shift (morning)
- Shift name/details reflect the swapped assignment
- Working hours calculated based on swapped shifts

---

#### TC-SWAP-007: Self-service view swap request history
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /shift-swap-requests (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Login to self-service
2. Navigate to /shift-swap-requests

**Expected Results:**
- List shows all swap requests (initiated by or involving the employee)
- Columns: Date, Swap Partner, Original Shift, Swap Shift, Status, Created Date
- Status badges: Pending=warning, PartnerConfirmed=info, Approved=success, Rejected=danger, Completed=success
- Filter by status available

---

#### TC-SWAP-008: Prevent swap request for past dates
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /shift-swap-requests/create (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Navigate to /shift-swap-requests/create
2. Set original date to a date in the past
3. Attempt to submit

**Expected Results:**
- Validation error: "Swap date must be in the future"
- Request not created

---

### B. On-Call Schedules

#### TC-SWAP-009: Create on-call schedule
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /attendance/on-call/create |
| **Role** | HR Manager |

**Preconditions:**
1. Employees exist in the system

**Steps:**
1. Navigate to /attendance/on-call/create
2. Select employee: Salma Khaldi
3. Set date range: Apr 14-18, 2026
4. Set compensation type: "Additional Pay" (or "Compensatory Off")
5. Enter notes: "Server migration weekend coverage"
6. Click Save

**Expected Results:**
- On-call schedule created successfully
- Schedule appears in list at /attendance/on-call
- Employee notified of on-call assignment
- Date range and compensation type saved

---

#### TC-SWAP-010: View on-call schedule list
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /attendance/on-call |
| **Role** | HR Manager |

**Preconditions:**
1. Multiple on-call schedules exist

**Steps:**
1. Navigate to /attendance/on-call
2. Filter by employee
3. Filter by date range

**Expected Results:**
- DataTable shows on-call schedules
- Columns: Employee, Start Date, End Date, Compensation Type, Status
- Filters narrow results correctly
- Pagination works

---

#### TC-SWAP-011: Edit on-call schedule
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /attendance/on-call/:id/edit |
| **Role** | HR Manager |

**Preconditions:**
1. On-call schedule exists

**Steps:**
1. Navigate to /attendance/on-call/:id/edit
2. Extend date range by one day
3. Update notes
4. Save

**Expected Results:**
- Schedule updated successfully
- Employee notified of schedule change

---

#### TC-SWAP-012: Self-service view on-call assignments
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-on-call (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has on-call schedules assigned

**Steps:**
1. Login to self-service
2. Navigate to /my-on-call

**Expected Results:**
- List shows only the employee's on-call assignments
- Each entry shows: date range, compensation type, notes
- Read-only view
- Current and upcoming assignments highlighted

---

#### TC-SWAP-013: Prevent overlapping on-call assignments
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /attendance/on-call/create |
| **Role** | HR Manager |

**Preconditions:**
1. On-call schedule for Salma, Apr 14-18 exists

**Steps:**
1. Navigate to /attendance/on-call/create
2. Select employee: Salma Khaldi
3. Set date range: Apr 16-20 (overlaps with existing)
4. Click Save

**Expected Results:**
- Validation error: "On-call schedule overlaps with existing assignment for this employee"
- Schedule not created

---

### C. Compensatory Offs

#### TC-SWAP-014: Grant compensatory off for working on holiday
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /attendance (Admin) |
| **Role** | HR Manager |

**Preconditions:**
1. Employee worked on a public holiday (attendance record exists for that date)

**Steps:**
1. Navigate to the employee's attendance for the holiday date
2. Click "Grant Compensatory Off"
3. Set number of days: 1
4. Set expiry date: 90 days from today
5. Enter reason: "Worked on National Day 2026"
6. Click Save

**Expected Results:**
- Compensatory off credit created for the employee
- Balance shows 1 day compensatory off available
- Expiry date set to 90 days from grant date
- Employee notified of compensatory off credit

---

#### TC-SWAP-015: Grant compensatory off for working on off-day
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance (Admin) |
| **Role** | HR Manager |

**Preconditions:**
1. Employee worked on their scheduled off-day (e.g., Friday for SA employees)

**Steps:**
1. Navigate to the attendance record for the off-day
2. Grant compensatory off
3. Set days: 1, expiry: 60 days

**Expected Results:**
- Compensatory off granted
- Linked to the specific off-day attendance record
- Balance updated

---

#### TC-SWAP-016: Use compensatory off as leave
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /my-compensatory-offs (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has compensatory off balance > 0

**Steps:**
1. Login to self-service
2. Navigate to /my-compensatory-offs
3. View available compensatory off balance
4. Click "Use Compensatory Off"
5. Select date to take off
6. Submit request

**Expected Results:**
- Compensatory off request created
- Goes through approval workflow (if configured)
- On approval, attendance for that date marked as "Compensatory Off"
- Balance decremented by days used

---

#### TC-SWAP-017: Self-service view compensatory off balance
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-compensatory-offs (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Login to self-service
2. Navigate to /my-compensatory-offs

**Expected Results:**
- Current balance displayed prominently
- List of granted compensatory offs with: grant date, reason, expiry date, days, status (Available/Used/Expired)
- Usage history shown
- Expiring soon items highlighted

---

#### TC-SWAP-018: Compensatory off expiry job
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Compensatory off with expiry date in the past and status "Available"

**Steps:**
1. `CompensatoryOffExpiryJob` runs on schedule
2. Job finds compensatory offs where expiry date < today and status = Available

**Expected Results:**
- Status changed from "Available" to "Expired"
- Balance decremented for expired compensatory offs
- Employee notified of expiry
- Job logs expiry count

---

#### TC-SWAP-019: Cannot use expired compensatory off
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /my-compensatory-offs (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. All compensatory offs for employee have expired

**Steps:**
1. Navigate to /my-compensatory-offs
2. Attempt to use compensatory off

**Expected Results:**
- Balance shows 0 days available
- "Use Compensatory Off" button disabled or hidden
- If forced via API: validation error "Insufficient compensatory off balance"

---

### D. Leave Encashments

#### TC-SWAP-020: Employee requests leave encashment
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /my-leave-encashments/request (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has unused annual leave balance >= requested days
2. Leave encashment policy allows encashment

**Steps:**
1. Login to self-service
2. Navigate to /my-leave-encashments/request
3. Select vacation type: "Annual Leave"
4. View eligible balance (e.g., 15 days available, 5 days minimum must be retained)
5. Enter days to encash: 5
6. System calculates amount: daily rate x 5 days
7. Click Submit

**Expected Results:**
- Leave encashment request created with status "Pending"
- Calculated amount displayed before submission
- Request visible in /my-leave-encashments list
- Manager notified of pending encashment request

---

#### TC-SWAP-021: Eligible balance calculation for encashment
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-leave-encashments/request (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has 20 days annual leave balance
2. Policy requires minimum 5 days retention
3. Employee has already used 3 days this year

**Steps:**
1. Navigate to /my-leave-encashments/request
2. Select vacation type: "Annual Leave"
3. View eligible days for encashment

**Expected Results:**
- Total balance: 20 days
- Minimum retention: 5 days
- Already used: 3 days
- Eligible for encashment: 20 - 5 = 15 days maximum
- System does not allow requesting more than 15 days

---

#### TC-SWAP-022: Encashment amount calculation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-leave-encashments/request (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee's daily rate is calculated from salary (e.g., monthly salary 15,000 SAR / 30 = 500 SAR/day)

**Steps:**
1. Navigate to /my-leave-encashments/request
2. Enter days to encash: 5
3. View calculated amount

**Expected Results:**
- Amount calculated as: daily rate x number of days
- 500 SAR/day x 5 days = 2,500 SAR
- Amount displayed clearly before submission
- Calculation breakdown visible

---

#### TC-SWAP-023: Approve leave encashment
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Pending leave encashment request exists

**Steps:**
1. Login as branch manager
2. Navigate to pending encashment requests
3. Review request details (employee, days, amount)
4. Click "Approve"

**Expected Results:**
- Encashment status changes to "Approved"
- Employee's leave balance reduced by encashed days
- Leave transaction created (type: Encashment)
- Employee notified of approval
- Amount marked for payroll processing

---

#### TC-SWAP-024: Reject leave encashment with reason
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Admin Portal |
| **Role** | Branch Manager |

**Preconditions:**
1. Pending leave encashment request exists

**Steps:**
1. Navigate to pending encashment requests
2. Click "Reject"
3. Enter reason: "Budget constraints — please resubmit next quarter"

**Expected Results:**
- Encashment status changes to "Rejected"
- Leave balance unchanged
- Employee notified with rejection reason
- Employee can create a new request later

---

#### TC-SWAP-025: Self-service view encashment history
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-leave-encashments (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Login to self-service
2. Navigate to /my-leave-encashments

**Expected Results:**
- List of all encashment requests for the employee
- Columns: Date, Vacation Type, Days, Amount, Status
- Status badges: Pending=warning, Approved=success, Rejected=danger
- Can click to view details
- "Request Encashment" button available

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Shift Swaps | 8 | 4 | 4 | 0 |
| B. On-Call Schedules | 5 | 1 | 4 | 0 |
| C. Compensatory Offs | 6 | 3 | 3 | 0 |
| D. Leave Encashments | 6 | 4 | 2 | 0 |
| **TOTAL** | **25** | **12** | **13** | **0** |
