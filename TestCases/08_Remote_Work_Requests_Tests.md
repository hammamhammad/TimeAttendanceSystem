# Remote Work Requests Tests

## Overview
This test suite covers remote work request functionality including creation, working days calculation, quota enforcement, approval workflow, and policy validation.

---

## Test Case REMOTE-001: Create Remote Work Request with Auto-Calculated Working Days

**Priority:** High
**Type:** Functional
**Module:** Remote Work Requests

### Description
Verify that remote work requests correctly auto-calculate working days excluding weekends and holidays.

### Preconditions
- Employee exists (ID: 10) with portal access
- Remote work policy exists:
  - Weekly quota: 3 days
  - Monthly quota: 12 days
  - Requires manager approval
- Week: Feb 12-16, 2024 (Monday-Friday, no holidays)
- Employee logged in to portal

### Test Steps
1. Navigate to `/portal/remote-work-requests/create`
2. Select date range:
   - StartDate: 2024-02-12 (Monday)
   - EndDate: 2024-02-16 (Friday)
3. Observe auto-calculated working days display
4. Submit request:
   ```json
   {
     "startDate": "2024-02-12",
     "endDate": "2024-02-16",
     "reason": "Remote work for project concentration"
   }
   ```

### Expected Results
- Working days auto-calculation:
  - Total days: 5
  - Weekends excluded: 0 (Mon-Fri)
  - Holidays excluded: 0
  - Working days: 5
- Display updates in real-time as dates change
- HTTP Status Code: 201 Created
- RemoteWorkRequest record:
  - Status = "Pending"
  - WorkingDaysCount = 5
  - StartDate = 2024-02-12
  - EndDate = 2024-02-16
- Request appears in portal list

---

## Test Case REMOTE-002: Working Days Calculation Excluding Weekends

**Priority:** High
**Type:** Functional
**Module:** Remote Work Requests

### Description
Verify that weekends are properly excluded from working days calculation.

### Preconditions
- Employee logged in to portal
- Date range includes weekend

### Test Steps
1. Select date range:
   - StartDate: 2024-02-15 (Thursday)
   - EndDate: 2024-02-19 (Monday)
2. Observe working days calculation

### Expected Results
- Total days: 5 (Thu, Fri, Sat, Sun, Mon)
- Weekend days: 2 (Sat, Sun)
- Working days: 3 (Thu, Fri, Mon)
- Auto-calculation excludes Saturday and Sunday
- Display shows: "3 working days"
- System correctly identifies weekends

---

## Test Case REMOTE-003: Working Days Calculation Excluding Public Holidays

**Priority:** High
**Type:** Functional
**Module:** Remote Work Requests

### Description
Verify that public holidays are excluded from working days calculation.

### Preconditions
- Public holiday configured: 2024-02-14 (Valentine's Day - company holiday)
- Employee logged in

### Test Steps
1. Select date range: Feb 12-16, 2024 (includes Feb 14 holiday)
2. Observe working days calculation
3. Submit request

### Expected Results
- Total days: 5
- Weekends: 0
- Holidays: 1 (Feb 14)
- Working days: 4 (excludes Feb 14)
- Holiday properly identified and excluded
- Display shows: "4 working days"
- Calculation respects holiday calendar

---

## Test Case REMOTE-004: Reject Request Exceeding Weekly Quota

**Priority:** High
**Type:** Functional
**Module:** Remote Work Requests

### Description
Verify that requests exceeding weekly quota are rejected.

### Preconditions
- Employee exists (ID: 12)
- Remote work policy: Weekly quota = 3 days
- Current week (Feb 12-16): Employee already approved for 2 days
- Employee logged in

### Test Steps
1. Attempt to create request for 3 more days (Feb 14-16):
   ```json
   {
     "startDate": "2024-02-14",
     "endDate": "2024-02-16",
     "reason": "Additional remote work"
   }
   ```
2. Submit request

### Expected Results
- Working days: 3
- Current week usage: 2 days
- Total would be: 5 days (exceeds 3-day limit)
- HTTP Status Code: 400 Bad Request
- Error message: "Weekly quota exceeded. You have 2 days approved this week. Limit is 3 days per week."
- No request created
- Quota validation enforced

---

## Test Case REMOTE-005: Reject Request Exceeding Monthly Quota

**Priority:** High
**Type:** Functional
**Module:** Remote Work Requests

### Description
Verify that requests exceeding monthly quota are rejected.

### Preconditions
- Remote work policy: Monthly quota = 12 days
- Current month (February): Employee has 10 days approved
- Employee logged in

### Test Steps
1. Attempt to create request for 5 working days:
   ```json
   {
     "startDate": "2024-02-26",
     "endDate": "2024-03-01",
     "reason": "End of month remote work"
   }
   ```

### Expected Results
- Working days in request: 4 (Mon-Thu, assuming Fri-Sat weekend)
- Current month usage: 10 days
- Total: 14 days (exceeds 12-day limit)
- HTTP Status Code: 400 Bad Request
- Error: "Monthly quota exceeded. You have 10 days this month. Limit is 12 days per month."
- Request rejected
- Quota enforced at request creation

---

## Test Case REMOTE-006: Approve Remote Work Request

**Priority:** High
**Type:** Functional
**Module:** Remote Work Requests

### Description
Verify that managers can approve remote work requests and attendance is updated.

### Preconditions
- Remote work request exists (ID: 100, Status: Pending)
- Request: Feb 20-22, 2024 (3 working days)
- Manager logged in with approval permission

### Test Steps
1. GET `/api/v1/remote-work-requests?status=Pending`
2. PUT `/api/v1/remote-work-requests/100/approve`:
   ```json
   {
     "approverComments": "Approved - team project allows remote work"
   }
   ```
3. Verify request status
4. Check attendance records for Feb 20-22

### Expected Results
- Request status: "Approved"
- ApprovedBy = manager ID
- ApprovedAt = current timestamp
- ApproverComments saved
- Attendance records for Feb 20-22:
  - WorkLocationType = "Remote" (or similar indicator)
  - Attendance marked accordingly
  - Remote work days counted in quota
- Employee notified of approval

---

## Test Case REMOTE-007: Edit Pending Request with Recalculation

**Priority:** Medium
**Type:** Functional
**Module:** Remote Work Requests

### Description
Verify that editing pending requests recalculates working days correctly.

### Preconditions
- Remote work request exists (ID: 105, Status: Pending)
- Original: Feb 12-16 (5 working days)
- Employee logged in

### Test Steps
1. Navigate to `/portal/remote-work-requests/105/edit`
2. Modify end date to Feb 14 (shorten request)
3. Observe working days recalculation
4. Submit update

### Expected Results
- Original working days: 5
- Updated range: Feb 12-14 (3 working days)
- Working days display updates in real-time: "3 working days"
- HTTP Status Code: 200 OK
- Request updated:
  - EndDate = 2024-02-14
  - WorkingDaysCount = 3 (recalculated)
- Quota validation re-runs with new count
- Edit only allowed for pending requests

---

## Test Case REMOTE-008: Consecutive Days Restriction

**Priority:** Medium
**Type:** Functional
**Module:** Remote Work Requests

### Description
Verify that consecutive remote work days restriction is enforced if configured.

### Preconditions
- Remote work policy: Max consecutive days = 5
- Employee logged in

### Test Steps
1. Attempt to create request for 10 consecutive working days:
   ```json
   {
     "startDate": "2024-02-12",
     "endDate": "2024-02-23",
     "reason": "Extended remote work"
   }
   ```

### Expected Results
- Working days: 10
- Max consecutive: 5
- HTTP Status Code: 400 Bad Request
- Error: "Consecutive days limit exceeded. Maximum 5 consecutive working days allowed."
- Policy prevents excessive continuous remote work
- Encourages office presence

---

## Test Case REMOTE-009: Blackout Period Restriction

**Priority:** Medium
**Type:** Functional
**Module:** Remote Work Requests

### Description
Verify that remote work requests during blackout periods are rejected.

### Preconditions
- Remote work policy has blackout periods:
  - Feb 20-22, 2024 (important company event)
- Employee logged in

### Test Steps
1. Attempt to create request overlapping blackout:
   ```json
   {
     "startDate": "2024-02-19",
     "endDate": "2024-02-23",
     "reason": "Remote work week"
   }
   ```

### Expected Results
- HTTP Status Code: 400 Bad Request
- Error: "Remote work not allowed during blackout period: Feb 20-22, 2024 (Company All-Hands Meeting)"
- Request rejected due to overlap with blackout
- Blackout periods configured for critical on-site events

---

## Test Case REMOTE-010: Portal List View with Working Days Display

**Priority:** Medium
**Type:** Functional
**Module:** Remote Work Requests - Frontend

### Description
Verify that portal list displays remote work requests with working days count.

### Preconditions
- Employee has 4 remote work requests:
  - 2 Pending (3 days, 5 days)
  - 1 Approved (2 days)
  - 1 Rejected (4 days)
- Employee logged in to portal

### Test Steps
1. Navigate to `/portal/remote-work-requests`
2. Observe list display
3. Check quota usage summary
4. Filter by status

### Expected Results
- DataTable displays all requests with:
  - Date range (Start - End)
  - Working days count badge
  - Status badge (Pending/Approved/Rejected)
  - Reason (truncated)
  - Actions (View, Edit, Cancel)
- Quota summary shown:
  - "This week: 2/3 days used"
  - "This month: 5/12 days used"
- Filters work correctly
- Responsive design
- Actions contextual (edit only for pending)

---

## Test Execution Notes

### Test Data Requirements
- Remote work policy configured
- Multiple employees
- Approved and pending requests
- Public holidays configured
- Blackout periods (optional)

### Environment Setup
- Backend: http://localhost:5099
- Frontend: http://localhost:4200
- Database with seed data
- Holiday calendar configured

### Dependencies
- Employee portal
- Attendance system
- Holiday management
- Notification service
- Approval workflow

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| REMOTE-001 | Create with Auto-Calc | High | ⬜ Not Run |
| REMOTE-002 | Exclude Weekends | High | ⬜ Not Run |
| REMOTE-003 | Exclude Holidays | High | ⬜ Not Run |
| REMOTE-004 | Weekly Quota | High | ⬜ Not Run |
| REMOTE-005 | Monthly Quota | High | ⬜ Not Run |
| REMOTE-006 | Approve Request | High | ⬜ Not Run |
| REMOTE-007 | Edit with Recalc | Medium | ⬜ Not Run |
| REMOTE-008 | Consecutive Days | Medium | ⬜ Not Run |
| REMOTE-009 | Blackout Period | Medium | ⬜ Not Run |
| REMOTE-010 | Portal List View | Medium | ⬜ Not Run |
