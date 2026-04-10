# TC-RW: Remote Work Management — Test Cases

## Module Overview

Remote Work Management enables organizations to define remote work policies with quota limits, blackout periods, and department eligibility, then allows employees to submit remote work requests through an approval workflow. Administrators can assign remote work directly, while employees use the self-service portal to create and track their own requests. Policies enforce maximum days per week/month/year, minimum advance notice, and consecutive day restrictions.

**Admin Pages**: `/remote-work`, `/remote-work/create`, `/remote-work/:id/view`, `/remote-work/edit/:id`, `/settings/remote-work-policy`, `/settings/remote-work-policy/create`, `/settings/remote-work-policy/:id/view`, `/settings/remote-work-policy/:id/edit`
**Self-Service Pages**: `/remote-work-requests`, `/remote-work-requests/new`, `/remote-work-requests/:id`
**API Endpoints**: `GET/POST/PUT/DELETE /api/v1/remote-work-requests`, `GET /api/v1/remote-work-requests/my-requests`, `GET/POST/PUT/DELETE /api/v1/remote-work-policies`
**Domain Entities**: `RemoteWorkPolicy.cs`, `RemoteWorkRequest.cs`, `WorkLocationType.cs`

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | IsSystemUser=true |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | MustChangePassword=true |
| Employee | salma.khaldi@company.com | Emp@123! | MustChangePassword=true |

---

## Test Cases

### A. Remote Work Policy Configuration

#### TC-RW-001: Create remote work policy with all required fields
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /settings/remote-work-policy/create |
| **Role** | System Admin |

**Preconditions:**
1. Logged in as System Admin
2. At least one branch exists

**Steps:**
1. Navigate to /settings/remote-work-policy/create
2. Select a branch (or leave null for company-wide)
3. Set MaxDaysPerWeek = 3
4. Set MaxDaysPerMonth = 10
5. Set RequiresManagerApproval = true
6. Set IsActive = true
7. Submit the form

**Expected Results:**
- Policy created successfully
- Notification: success message displayed
- Redirected to policy list or view page
- Policy appears in list with correct branch and quota values

---

#### TC-RW-002: At least one quota limit required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /settings/remote-work-policy/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to create policy form
2. Leave MaxDaysPerWeek, MaxDaysPerMonth, and MaxDaysPerYear all empty/null
3. Submit the form

**Expected Results:**
- Validation error: "At least one quota limit (weekly, monthly, or yearly) must be defined"
- Policy not created

---

#### TC-RW-003: MaxDaysPerWeek cannot exceed 7
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/remote-work-policy/create |
| **Role** | System Admin |

**Boundary Value Tests:**

| # | MaxDaysPerWeek | Valid? | Reason |
|---|----------------|--------|--------|
| 1 | 0 | No | Must be greater than 0 |
| 2 | -1 | No | Must be greater than 0 |
| 3 | 1 | Yes | Minimum valid |
| 4 | 5 | Yes | Typical value |
| 5 | 7 | Yes | Maximum valid |
| 6 | 8 | No | Cannot exceed 7 |

---

#### TC-RW-004: MaxDaysPerMonth boundary validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/remote-work-policy/create |
| **Role** | System Admin |

**Boundary Value Tests:**

| # | MaxDaysPerMonth | Valid? | Reason |
|---|-----------------|--------|--------|
| 1 | 0 | No | Must be greater than 0 |
| 2 | 1 | Yes | Minimum valid |
| 3 | 20 | Yes | Typical value |
| 4 | 31 | Yes | Maximum valid |
| 5 | 32 | No | Cannot exceed 31 |

---

#### TC-RW-005: MinAdvanceNoticeDays validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/remote-work-policy/create |
| **Role** | System Admin |

**Steps:**
1. Set MinAdvanceNoticeDays = -1
2. Submit

**Expected Results:**
- Validation error: "Minimum advance notice days cannot be negative"
- MinAdvanceNoticeDays = 0 (no advance notice) is valid
- MinAdvanceNoticeDays = 3 (3 days notice) is valid

---

#### TC-RW-006: Blackout periods stored as valid JSON
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/remote-work-policy/create |
| **Role** | System Admin |

**Steps:**
1. Create policy with BlackoutPeriods:
   ```json
   [{"StartDate":"2026-12-20","EndDate":"2026-12-31"}]
   ```
2. Submit the form
3. View the created policy

**Expected Results:**
- Policy created successfully
- Blackout periods stored correctly as JSON
- View page displays blackout period: Dec 20, 2026 - Dec 31, 2026

---

#### TC-RW-007: Invalid blackout periods JSON rejected
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /settings/remote-work-policy/create |
| **Role** | System Admin |

**Steps:**
1. Set BlackoutPeriods to invalid JSON string: `"not valid json"`
2. Submit the form

**Expected Results:**
- Validation error: "Blackout periods must be valid JSON format"
- Policy not created

---

#### TC-RW-008: IsActive toggle controls policy availability
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /settings/remote-work-policy/:id/edit |
| **Role** | System Admin |

**Preconditions:**
1. Active remote work policy exists

**Steps:**
1. Navigate to edit policy
2. Set IsActive = false
3. Save
4. Attempt to create a new remote work request using this policy

**Expected Results:**
- Policy saved with IsActive = false
- `RemoteWorkPolicy.IsDateAllowed()` returns false for any date when IsActive = false
- New remote work requests cannot reference this inactive policy

---

### B. Admin Remote Work Assignment

#### TC-RW-009: Admin creates remote work assignment for employee
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /remote-work/create |
| **Role** | System Admin |

**Preconditions:**
1. Employee exists with active employment
2. Active remote work policy exists for employee's branch

**Steps:**
1. Navigate to /remote-work/create
2. Select employee
3. Set StartDate = next Monday
4. Set EndDate = next Friday
5. Select RemoteWorkPolicyId
6. Enter Reason: "Project deadline work from home"
7. Submit

**Expected Results:**
- Remote work request created with Status = Pending
- WorkingDaysCount calculated (excludes weekends)
- CreatedByUserId set to current admin user
- Request appears in remote work list
- If workflow configured, workflow instance created

---

#### TC-RW-010: EndDate must be >= StartDate
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /remote-work/create |
| **Role** | System Admin |

**Steps:**
1. Set StartDate = 2026-04-15
2. Set EndDate = 2026-04-10 (before start)
3. Submit

**Expected Results:**
- Validation error: "End date must be after or equal to start date"
- Request not created

---

#### TC-RW-011: Work location type selection
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /remote-work/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to create form
2. Observe work location type options

**Expected Results:**
- Available location types from WorkLocationType enum:
  - OnSite (0)
  - Remote (1) — default for remote work requests
  - Field (2)
- NotApplicable (99) is NOT shown as an option for user selection
- Selected type stored with the request

---

#### TC-RW-012: View remote work assignment details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /remote-work/:id/view |
| **Role** | System Admin |

**Preconditions:**
1. Remote work request exists

**Steps:**
1. Navigate to /remote-work/{id}/view

**Expected Results:**
- Page displays using DefinitionListComponent with:
  - Employee name
  - Start date / End date
  - Working days count
  - Status (using StatusBadgeComponent)
  - Reason
  - Policy name
  - Created by user
  - Approval details (if approved/rejected)
  - Workflow status (if workflow attached)

---

#### TC-RW-013: Edit pending remote work assignment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /remote-work/edit/:id |
| **Role** | System Admin |

**Preconditions:**
1. Remote work request exists with Status = Pending

**Steps:**
1. Navigate to /remote-work/edit/{id}
2. Change EndDate to a later date
3. Update Reason text
4. Submit

**Expected Results:**
- Request updated successfully
- WorkingDaysCount recalculated for new date range
- Status remains Pending

---

#### TC-RW-014: Cannot edit approved or rejected assignments
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /remote-work/edit/:id |
| **Role** | System Admin |

**Preconditions:**
1. Remote work request exists with Status = Approved

**Steps:**
1. Navigate to /remote-work/edit/{id}

**Expected Results:**
- Edit is blocked or form is read-only for non-Pending requests
- Only Pending requests can be modified

---

#### TC-RW-015: Remote work list page with filters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /remote-work |
| **Role** | System Admin |

**Steps:**
1. Navigate to /remote-work
2. Observe list page structure

**Expected Results:**
- Page uses UnifiedFilterComponent with search, refresh, and add buttons
- DataTableComponent displays remote work requests
- Filters available: status, branch, department, date range
- Pagination works correctly
- Table shows: employee name, start date, end date, working days, status, actions

---

### C. Self-Service Remote Work Request Form

#### TC-RW-016: Employee creates remote work request
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Preconditions:**
1. Employee logged in to self-service portal
2. Active remote work policy exists for employee's branch

**Steps:**
1. Navigate to /remote-work-requests/new
2. Set StartDate = next Monday
3. Set EndDate = next Wednesday
4. Enter Reason: "Personal project work from home"
5. Submit

**Expected Results:**
- Request created with Status = Pending
- EmployeeId auto-populated from logged-in employee
- SubmittedByUserId set to logged-in user
- WorkingDaysCount calculated (Mon-Wed = 3 working days)
- Confirmation dialog shown before submission
- Success notification displayed
- Redirected to request list or detail page

---

#### TC-RW-017: StartDate cannot be in the past
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Steps:**
1. Set StartDate = yesterday's date
2. Set EndDate = tomorrow
3. Submit

**Expected Results:**
- Validation error: "Start date cannot be in the past"
- 1-day grace period allowed for editing (StartDate >= today - 1)
- Request not created

---

#### TC-RW-018: EndDate must be >= StartDate
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Steps:**
1. Set StartDate = 2026-04-20
2. Set EndDate = 2026-04-18
3. Submit

**Expected Results:**
- Validation error: "End date must be after or equal to start date"
- Request not created

---

#### TC-RW-019: Reason field maxLength 500 characters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Boundary Value Tests:**

| # | Reason Length | Valid? | Reason |
|---|-------------|--------|--------|
| 1 | null/empty | Yes | Reason is optional |
| 2 | 500 chars | Yes | At max length |
| 3 | 501 chars | No | Exceeds max — "Reason must not exceed 500 characters" |

---

#### TC-RW-020: Working days calculation excludes weekends
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Steps:**
1. Set StartDate = Monday 2026-04-13
2. Set EndDate = Sunday 2026-04-19 (full week)
3. Observe WorkingDaysCount

**Expected Results:**
- Total calendar days = 7
- WorkingDaysCount = 5 (Mon-Fri only, excludes Sat+Sun)
- WorkingDaysCount must be > 0 for request to be valid

---

#### TC-RW-021: Date range cannot exceed 365 days
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Steps:**
1. Set StartDate = 2026-01-01
2. Set EndDate = 2027-01-02 (366 days)
3. Submit

**Expected Results:**
- Validation error: "Remote work request cannot exceed 365 days"
- EndDate = 2026-12-31 (365 days) is valid

---

#### TC-RW-022: Employee can only edit Pending requests
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Self-Service /remote-work-requests/:id |
| **Role** | Employee |

**Preconditions:**
1. Employee has requests in Pending, Approved, and Rejected status

**Steps:**
1. View Pending request — observe edit button
2. View Approved request — observe edit button
3. View Rejected request — observe edit button

**Expected Results:**
- Pending: edit button visible and functional
- Approved: edit button hidden or disabled
- Rejected: edit button hidden or disabled
- Only requests with Status = Pending can be edited

---

#### TC-RW-023: Employee cancels a request
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Self-Service /remote-work-requests/:id |
| **Role** | Employee |

**Preconditions:**
1. Employee has a Pending remote work request

**Steps:**
1. Navigate to request detail page
2. Click Cancel button
3. Confirm cancellation in dialog

**Expected Results:**
- Confirmation dialog shown via ConfirmationService
- Status updated to Cancelled (3)
- Request no longer counts toward quota
- If workflow was in progress, workflow instance is also cancelled

---

### D. Policy Enforcement

#### TC-RW-024: Blackout period blocks remote work request
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Preconditions:**
1. Policy has blackout period: `[{"StartDate":"2026-12-20","EndDate":"2026-12-31"}]`

**Steps:**
1. Create request with StartDate = 2026-12-22, EndDate = 2026-12-24
2. Submit

**Expected Results:**
- `RemoteWorkPolicy.IsDateAllowed()` returns false for dates in blackout period
- Error: request dates fall within a blackout period
- Request not created

---

#### TC-RW-025: MaxDaysPerWeek quota exceeded
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Preconditions:**
1. Policy has MaxDaysPerWeek = 2
2. Employee already has 2 approved remote work days this week

**Steps:**
1. Create request for 1 additional day in the same week
2. Submit

**Expected Results:**
- Quota validation fails: weekly limit exceeded
- Error message indicating max remote days per week reached
- Request not created

---

#### TC-RW-026: MaxDaysPerMonth quota exceeded
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Preconditions:**
1. Policy has MaxDaysPerMonth = 8
2. Employee already has 8 approved remote work days this month

**Steps:**
1. Create request for any additional day in the same month
2. Submit

**Expected Results:**
- Quota validation fails: monthly limit exceeded
- Error message indicating max remote days per month reached
- Request not created

---

#### TC-RW-027: MinAdvanceNoticeDays enforcement
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Preconditions:**
1. Policy has MinAdvanceNoticeDays = 3

**Steps:**
1. Create request with StartDate = tomorrow (1 day notice)
2. Submit

**Expected Results:**
- Validation error: insufficient advance notice
- Request requires at least 3 days advance notice
- StartDate = today + 3 days is valid

---

### E. Approval Integration

#### TC-RW-028: Remote work request triggers workflow
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Self-Service /remote-work-requests/new |
| **Role** | Employee |

**Preconditions:**
1. Workflow definition exists for EntityType = RemoteWork (3)
2. Policy has RequiresManagerApproval = true

**Steps:**
1. Create remote work request
2. Submit

**Expected Results:**
- Request created with Status = Pending
- WorkflowInstance created with:
  - EntityType = RemoteWork (3)
  - EntityId = request ID
  - Status = InProgress (2)
  - RequestedByUserId = submitting user
- WorkflowInstanceId stored on the RemoteWorkRequest entity
- First step execution created and assigned to appropriate approver
- ApprovalPending notification sent to assigned approver

---

#### TC-RW-029: Approval updates request status to Approved
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Remote work request exists with active workflow, pending at manager step

**Steps:**
1. Navigate to /approvals (admin) or /pending-approvals (self-service)
2. Find the pending remote work request
3. Click Approve
4. Add optional comments
5. Submit approval

**Expected Results:**
- WorkflowStepExecution.Action = Approved (1)
- If final step: WorkflowInstance.Status = Approved (3)
- RemoteWorkRequest.Status = Approved (1)
- ApprovedByUserId and ApprovedAt populated
- RequestApproved notification sent to requesting employee
- Request now affects attendance calculations for those dates

---

#### TC-RW-030: Rejection restores availability and requires reason
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Remote work request in workflow awaiting approval

**Steps:**
1. Navigate to pending approvals
2. Find remote work request
3. Click Reject
4. Enter rejection reason: "Team needs on-site presence this week"
5. Submit rejection

**Expected Results:**
- Comments required for rejection (RequireCommentsOnReject = true by default)
- WorkflowStepExecution.Action = Rejected (2)
- WorkflowInstance.Status = Rejected (4)
- RemoteWorkRequest.Status = Rejected (2)
- RejectionReason stored on the request
- Working days restored to available quota
- RequestRejected notification sent to requesting employee

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Remote Work Policy Config | 8 | 2 | 5 | 1 |
| B. Admin Remote Work Assignment | 7 | 2 | 5 | 0 |
| C. Self-Service Request Form | 8 | 4 | 2 | 2 |
| D. Policy Enforcement | 4 | 2 | 2 | 0 |
| E. Approval Integration | 3 | 3 | 0 | 0 |
| **TOTAL** | **30** | **13** | **14** | **3** |
