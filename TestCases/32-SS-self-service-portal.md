# TC-SS: Self-Service Portal — Test Cases

## Module Overview

The Self-Service Portal is a separate Angular application (`time-attendance-selfservice-frontend`) running on http://localhost:4201. It provides employees with access to their own data and managers with team management capabilities. The portal covers 45+ routes organized into employee pages, manager pages, and module-gated "My-*" pages.

**Application**: `time-attendance-selfservice-frontend/`
**Port**: http://localhost:4201
**Routes File**: `src/app/app.routes.ts`
**Layout**: `src/app/layout/` (sidenav, topbar, layout)
**API Base**: `POST/GET /api/v1/portal/*`, `/api/v1/employee-vacations/my-requests`, etc.

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
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Has managerGuard access |
| Dept Manager | sara.fahad@company.com | Emp@123! | Has managerGuard access |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee, no manager access |

---

## Test Cases

### A. Navigation & Access Control

#### TC-SS-001: authGuard redirects unauthenticated user to login
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /dashboard |
| **Role** | Unauthenticated |

**Preconditions:**
1. User is not logged in (no JWT in storage)

**Steps:**
1. Open http://localhost:4201/dashboard directly
2. Also try /my-attendance, /my-profile, /vacation-requests

**Expected Results:**
- All routes redirect to /login
- No authenticated content is rendered
- After login, user is redirected to originally requested route

---

#### TC-SS-002: managerGuard blocks employee from manager-dashboard
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /manager-dashboard |
| **Role** | Employee |

**Preconditions:**
1. Logged in as salma.khaldi@company.com (regular employee)

**Steps:**
1. Navigate to /manager-dashboard via URL bar
2. Navigate to /team-members via URL bar

**Expected Results:**
- Both routes blocked by `managerGuard`
- Redirected to /unauthorized or /dashboard
- Manager menu items NOT visible in sidenav

---

#### TC-SS-003: managerGuard allows manager access to manager routes
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /manager-dashboard |
| **Role** | Manager |

**Preconditions:**
1. Logged in as ahmed.rashid@company.com (Branch Manager)

**Steps:**
1. Navigate to /manager-dashboard
2. Navigate to /team-members
3. Navigate to /pending-approvals

**Expected Results:**
- All three routes load successfully
- Manager-specific menu items visible in sidenav
- No authorization errors

---

#### TC-SS-004: moduleGuard redirects to /module-disabled when module off
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /my-attendance |
| **Role** | Employee |

**Preconditions:**
1. Logged in as employee
2. Tenant subscription does NOT include TimeAttendance module

**Steps:**
1. Navigate to /my-attendance (has `module: 'TimeAttendance'`)
2. Navigate to /vacation-requests (has `module: 'LeaveManagement'`)

**Expected Results:**
- Redirected to /module-disabled page
- Module-disabled page shows appropriate message
- Navigation items for disabled modules hidden in sidenav

---

#### TC-SS-005: Legacy redirect /approvals to /pending-approvals
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Navigation |
| **Page** | /approvals |
| **Role** | Any authenticated |

**Steps:**
1. Navigate to /approvals

**Expected Results:**
- Redirected to /pending-approvals (pathMatch: 'prefix')
- No 404 error displayed

---

#### TC-SS-006: Legacy redirect /excuses/:id to /excuse-requests/:id
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Navigation |
| **Page** | /excuses/123 |
| **Role** | Any authenticated |

**Steps:**
1. Navigate to /excuses/123
2. Navigate to /vacations/456
3. Navigate to /remote-work/789

**Expected Results:**
- /excuses/123 redirects to /excuse-requests/123
- /vacations/456 redirects to /vacation-requests/456
- /remote-work/789 redirects to /remote-work-requests/789

---

#### TC-SS-007: pending-approvals accessible without managerGuard (delegated approvals)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Authorization |
| **Page** | /pending-approvals |
| **Role** | Employee |

**Preconditions:**
1. Logged in as salma.khaldi@company.com (regular employee)
2. Employee has delegated approvals assigned

**Steps:**
1. Navigate to /pending-approvals

**Expected Results:**
- Route loads successfully (uses authGuard, NOT managerGuard)
- Employee can see and act on delegated approvals
- Only delegated items are shown, not all team approvals

---

#### TC-SS-008: Sidenav renders correct items per role and module entitlement
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | Layout |
| **Role** | Employee |

**Preconditions:**
1. Logged in as employee with Starter plan (limited modules)

**Steps:**
1. Observe sidenav menu items
2. Check visibility of module-gated items

**Expected Results:**
- Core items visible: Dashboard, My Profile
- Module-gated items hidden when module disabled (e.g., my-payslips hidden without Payroll)
- `isChildVisible()` checks `entitlementService.isModuleEnabled(child.module)`
- Manager items (Manager Dashboard, Team Members) NOT visible for regular employee

---

#### TC-SS-009: 404 page renders for unknown routes
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Navigation |
| **Page** | /nonexistent-page |
| **Role** | Any |

**Steps:**
1. Navigate to /some-random-nonexistent-page

**Expected Results:**
- Not Found (404) component renders
- Page provides link to return to dashboard

---

#### TC-SS-010: Unauthorized page renders for 403 scenarios
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Navigation |
| **Page** | /unauthorized |
| **Role** | Any |

**Steps:**
1. Navigate to /unauthorized

**Expected Results:**
- Unauthorized component renders
- Appropriate message displayed
- Link to return to dashboard or login

---

### B. Employee Dashboard

#### TC-SS-011: Employee dashboard loads with attendance stats
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | Employee |

**Preconditions:**
1. Logged in as salma.khaldi@company.com
2. Attendance records exist for current month

**Steps:**
1. Navigate to /dashboard

**Expected Results:**
- Dashboard renders with attendance statistics cards
- Present days count, absent days count, late days count displayed
- Stats reflect current month data from `GET /api/v1/portal/employee-dashboard`

---

#### TC-SS-012: Dashboard displays leave balance summary
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /dashboard |
| **Role** | Employee |

**Steps:**
1. Navigate to /dashboard

**Expected Results:**
- Leave balance section shows balance per vacation type
- Annual leave, sick leave, etc. with remaining/used days
- Balances match data from portal API

---

#### TC-SS-013: Dashboard shows recent activity timeline
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | Employee |

**Steps:**
1. Navigate to /dashboard

**Expected Results:**
- Recent activity section displays latest actions (requests submitted, approved, etc.)
- Activities ordered by most recent first
- Each activity shows timestamp, type, and status

---

#### TC-SS-014: Dashboard shows upcoming vacations
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | Employee |

**Preconditions:**
1. Employee has approved upcoming vacation requests

**Steps:**
1. Navigate to /dashboard

**Expected Results:**
- Upcoming vacations section shows approved future vacations
- Each entry shows vacation type, start date, end date, duration
- Only approved (not pending or rejected) vacations displayed

---

#### TC-SS-015: Dashboard shows pending requests count
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /dashboard |
| **Role** | Employee |

**Steps:**
1. Navigate to /dashboard with some pending requests

**Expected Results:**
- Pending requests count displayed
- Clicking takes user to relevant request list
- Count updates when requests are submitted or resolved

---

### C. Manager Dashboard

#### TC-SS-016: Manager dashboard loads with team statistics
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /manager-dashboard |
| **Role** | Manager |

**Preconditions:**
1. Logged in as ahmed.rashid@company.com (Branch Manager)

**Steps:**
1. Navigate to /manager-dashboard

**Expected Results:**
- Team size displayed (direct + indirect reports)
- Direct reports count shown separately
- Indirect reports count shown separately
- Data from `GET /api/v1/portal/manager-dashboard`

---

#### TC-SS-017: Manager dashboard shows pending approvals count
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /manager-dashboard |
| **Role** | Manager |

**Steps:**
1. Navigate to /manager-dashboard

**Expected Results:**
- Pending approvals count displayed (vacation + excuse + remote work)
- Count matches actual pending items from `GET /api/v1/portal/pending-approvals`
- Clicking navigates to /pending-approvals

---

#### TC-SS-018: Manager dashboard shows team member list
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /manager-dashboard |
| **Role** | Manager |

**Steps:**
1. Navigate to /manager-dashboard

**Expected Results:**
- Team members list section shows direct reports
- Each member shows name, department, position
- Link to view full team at /team-members

---

#### TC-SS-019: Manager dashboard shows team attendance overview
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /manager-dashboard |
| **Role** | Manager |

**Steps:**
1. Navigate to /manager-dashboard

**Expected Results:**
- Team attendance overview for today
- Shows count of present, absent, on-leave, late team members
- Data refreshes on page load

---

#### TC-SS-020: Non-manager cannot access manager dashboard
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /manager-dashboard |
| **Role** | Employee |

**Steps:**
1. Login as salma.khaldi@company.com (regular employee)
2. Navigate to /manager-dashboard

**Expected Results:**
- Access blocked by managerGuard
- Redirected to unauthorized or dashboard
- Manager Dashboard not visible in sidenav

---

### D. My Attendance

#### TC-SS-021: My attendance page loads with date range filter
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /my-attendance |
| **Role** | Employee |

**Preconditions:**
1. TimeAttendance module enabled for tenant

**Steps:**
1. Navigate to /my-attendance

**Expected Results:**
- Attendance records table loads for current month (default)
- Date range filter available (from/to date pickers)
- Table shows date, check-in, check-out, status, hours, overtime

---

#### TC-SS-022: Attendance records show correct status badges
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-attendance |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-attendance with records in various statuses

**Expected Results:**
- Present: success badge (green)
- Absent: danger badge (red)
- Late: warning badge (amber)
- OnLeave: info badge (blue)
- Weekend/Holiday: secondary badge (gray)
- StatusBadgeComponent used (not inline spans)

---

#### TC-SS-023: Attendance calendar view displays monthly overview
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-attendance |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-attendance
2. Switch to calendar view (if toggle exists)

**Expected Results:**
- Monthly calendar shows color-coded days by status
- Legend explains status colors
- Click on day shows detail

---

#### TC-SS-024: Attendance detail shows check-in/out times and hours
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /my-attendance |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-attendance
2. Click on a specific attendance record

**Expected Results:**
- Detail shows: check-in time, check-out time
- Working hours calculated (difference minus breaks)
- Overtime hours (if any)
- Late minutes and early leave minutes
- Break duration

---

#### TC-SS-025: Date range filter updates attendance records
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-attendance |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-attendance
2. Set start date to first of previous month
3. Set end date to last of previous month
4. Apply filter

**Expected Results:**
- Table refreshes with records for selected date range
- Only employee's own records shown (not other employees)
- Pagination updates for new result set

---

### E. My Profile

#### TC-SS-026: My profile page displays all employee information
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /my-profile |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-profile

**Expected Results:**
- Personal info section: name, employee ID, email, phone
- Job details section: department, branch, position, hire date
- Contact information displayed
- Data from `GET /api/v1/portal/my-profile`
- Read-only fields (employee ID, hire date) cannot be edited

---

#### TC-SS-027: Edit phone, email, and address on profile
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /my-profile |
| **Role** | Employee |

**Preconditions:**
1. Profile edit is enabled for tenant

**Steps:**
1. Navigate to /my-profile
2. Click edit button or toggle edit mode
3. Update phone number to "+966555123456"
4. Update personal email to "newemail@personal.com"
5. Save changes

**Expected Results:**
- Editable fields become input fields
- `PUT /api/v1/portal/my-profile` called with updated data
- Success notification shown
- Updated values persist after page refresh

---

#### TC-SS-028: Change password modal works correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-profile |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-profile
2. Click "Change Password" button
3. Enter current password
4. Enter new password meeting policy requirements
5. Confirm new password
6. Submit

**Expected Results:**
- Modal opens with current password, new password, confirm password fields
- Validation enforces password policy (length, complexity, no reuse)
- Success: notification shown, modal closes
- Can login with new password

---

#### TC-SS-029: View/edit toggle preserves data
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /my-profile |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-profile (view mode)
2. Switch to edit mode
3. Modify a field
4. Switch back to view mode WITHOUT saving
5. Switch to edit mode again

**Expected Results:**
- Unsaved changes are discarded when leaving edit mode
- Original values restored in view mode
- Edit mode shows current saved values

---

#### TC-SS-030: Read-only fields cannot be modified
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /my-profile |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-profile in edit mode

**Expected Results:**
- Employee ID: read-only (no input field)
- Hire date: read-only
- Department: read-only (changed by admin only)
- Branch: read-only
- Position: read-only
- These fields display as text, not as editable inputs

---

### F. Request Pages (Vacation/Excuse/Remote Work)

#### TC-SS-031: Vacation request list shows employee's requests only
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /vacation-requests |
| **Role** | Employee |

**Steps:**
1. Navigate to /vacation-requests

**Expected Results:**
- Only current employee's vacation requests displayed
- Table shows: type, start date, end date, days, status
- Calls `GET /api/v1/employee-vacations/my-requests`
- Other employees' requests NOT visible

---

#### TC-SS-032: Create vacation request with balance validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /vacation-requests/new |
| **Role** | Employee |

**Preconditions:**
1. LeaveManagement module enabled
2. Employee has leave balance for vacation type

**Steps:**
1. Navigate to /vacation-requests/new
2. Select vacation type (Annual Leave)
3. Select start date (future date)
4. Select end date
5. Add optional notes
6. Submit

**Expected Results:**
- Form shows available balance for selected type
- Validation: end date >= start date
- Validation: requested days <= available balance
- On submit: `POST /api/v1/employee-vacations` called
- Success: redirect to list, notification shown
- Request status = Pending, workflow initiated

---

#### TC-SS-033: Edit pending vacation request
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /vacation-requests/:id/edit |
| **Role** | Employee |

**Preconditions:**
1. Employee has a vacation request with status Pending

**Steps:**
1. Navigate to /vacation-requests
2. Click edit on a Pending request
3. Modify dates
4. Save

**Expected Results:**
- Form pre-populated with existing request data
- Only Pending requests can be edited
- `PUT /api/v1/employee-vacations/{id}` called
- Updated values saved, notification shown

---

#### TC-SS-034: Cancel approved vacation request
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /vacation-requests/:id |
| **Role** | Employee |

**Steps:**
1. Navigate to a vacation request detail with Approved status
2. Click Cancel button
3. Confirm cancellation

**Expected Results:**
- Confirmation dialog appears
- On confirm: `DELETE /api/v1/employee-vacations/{id}` called
- Leave balance restored
- Status changes to Cancelled
- Notification sent to manager

---

#### TC-SS-035: Excuse request form validates required fields
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /excuse-requests/new |
| **Role** | Employee |

**Steps:**
1. Navigate to /excuse-requests/new
2. Submit form without filling required fields

**Expected Results:**
- Excuse type: required
- Date: required
- Reason: required (minimum length if configured)
- Validation errors displayed inline
- Form does not submit

---

#### TC-SS-036: Remote work request respects blackout periods
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /remote-work-requests/new |
| **Role** | Employee |

**Preconditions:**
1. RemoteWork module enabled
2. Blackout period defined for specific dates

**Steps:**
1. Navigate to /remote-work-requests/new
2. Select a date that falls within a blackout period
3. Submit

**Expected Results:**
- Error message indicating date falls in blackout period
- Request is rejected by backend validation
- Employee informed to select different dates

---

#### TC-SS-037: Request detail page shows approval workflow status
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /vacation-requests/:id |
| **Role** | Employee |

**Steps:**
1. Navigate to a vacation request detail page

**Expected Results:**
- Request details displayed (type, dates, days, notes)
- Approval status section shows workflow steps
- Each step shows: approver, status (Pending/Approved/Rejected), timestamp
- Current step highlighted
- Approval history visible

---

#### TC-SS-038: Excuse request with document attachment
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /excuse-requests/new |
| **Role** | Employee |

**Steps:**
1. Navigate to /excuse-requests/new
2. Fill required fields
3. Attach supporting document (e.g., medical certificate PDF)
4. Submit

**Expected Results:**
- File upload component allows PDF, DOC, DOCX, JPG, PNG (max 10MB)
- File uploaded via `POST /api/v1/files/upload`
- File linked to excuse request entity
- On detail page, attached document is downloadable

---

### G. Attendance Corrections

#### TC-SS-039: Attendance correction list shows employee's corrections
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /attendance-corrections |
| **Role** | Employee |

**Preconditions:**
1. TimeAttendance module enabled

**Steps:**
1. Navigate to /attendance-corrections

**Expected Results:**
- List shows employee's own correction requests
- Table shows date, type, status, reason
- Calls correction request API for current employee

---

#### TC-SS-040: Create attendance correction with date validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /attendance-corrections/new |
| **Role** | Employee |

**Steps:**
1. Navigate to /attendance-corrections/new
2. Select a future date for correction date

**Expected Results:**
- Correction date must be in the past (within 30 days)
- Future dates rejected with validation error
- Dates older than 30 days rejected

---

#### TC-SS-041: Correction form requires correction type and reason
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /attendance-corrections/new |
| **Role** | Employee |

**Steps:**
1. Navigate to /attendance-corrections/new
2. Fill correction date (valid past date)
3. Leave correction type empty
4. Enter reason with less than 10 characters
5. Submit

**Expected Results:**
- correctionType required: CheckIn or CheckOut
- correctionTime required
- reason: minimum 10 characters, maximum 500 characters
- Validation errors shown for each invalid field

---

#### TC-SS-042: Edit pending correction request
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance-corrections/:id/edit |
| **Role** | Employee |

**Preconditions:**
1. Employee has a pending correction request

**Steps:**
1. Navigate to /attendance-corrections
2. Click edit on a Pending request
3. Modify reason text
4. Save

**Expected Results:**
- Only Pending corrections can be edited
- Form pre-populated with existing data
- Updated values saved
- Approved/Rejected corrections cannot be edited

---

#### TC-SS-043: View correction details with approval status
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /attendance-corrections/:id |
| **Role** | Employee |

**Steps:**
1. Navigate to an attendance correction detail page

**Expected Results:**
- Shows: correction date, type (CheckIn/CheckOut), time, reason
- Status badge displayed (Pending/Approved/Rejected)
- If approved: shows who approved and when
- If rejected: shows rejection reason

---

### H. My-* Module Pages

#### TC-SS-044: My payslips page renders with Payroll module
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-payslips |
| **Role** | Employee |

**Preconditions:**
1. Payroll module enabled in tenant subscription

**Steps:**
1. Navigate to /my-payslips

**Expected Results:**
- Payslip list with month/year selection
- Each payslip shows period, gross, deductions, net
- Download/view option for individual payslips
- Redirects to /module-disabled if Payroll module not enabled

---

#### TC-SS-045: My salary page shows compensation details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-salary |
| **Role** | Employee |

**Preconditions:**
1. Payroll module enabled

**Steps:**
1. Navigate to /my-salary

**Expected Results:**
- Current salary structure displayed
- Components breakdown (Basic, HRA, Transport, etc.)
- Salary history/adjustments visible
- Module guard: requires Payroll module

---

#### TC-SS-046: My allowances page shows assigned allowances
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-allowances |
| **Role** | Employee |

**Preconditions:**
1. Allowances module enabled

**Steps:**
1. Navigate to /my-allowances

**Expected Results:**
- Active allowance assignments listed
- Type, amount, effective dates displayed
- Option to request new allowance (if policy allows)
- Module guard: requires Allowances module

---

#### TC-SS-047: My benefits page shows enrolled benefits
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-benefits |
| **Role** | Employee |

**Preconditions:**
1. Benefits module enabled

**Steps:**
1. Navigate to /my-benefits

**Expected Results:**
- Enrolled benefit plans listed
- Coverage details shown
- Claims history available
- Module guard: requires Benefits module

---

#### TC-SS-048: My documents page lists employee documents
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-documents |
| **Role** | Employee |

**Preconditions:**
1. Documents module enabled

**Steps:**
1. Navigate to /my-documents

**Expected Results:**
- Employee's documents listed (contracts, IDs, certificates)
- Download option for each document
- Category/type filtering available
- Module guard: requires Documents module

---

#### TC-SS-049: My letters page shows HR letters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-letters |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-letters

**Expected Results:**
- Official letters listed (salary certificate, employment letter, etc.)
- Request new letter option
- Download/print available for generated letters
- Module guard: requires Documents module

---

#### TC-SS-050: My expenses page shows expense claims
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-expenses |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-expenses

**Expected Results:**
- Expense claims listed with status
- Submit new expense option
- Receipt attachment support
- Module guard: requires Expenses module

---

#### TC-SS-051: My loans page shows loan records
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-loans |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-loans

**Expected Results:**
- Active loans listed with repayment schedule
- Total amount, paid amount, remaining balance
- Monthly deduction displayed
- Module guard: requires Loans module

---

#### TC-SS-052: My grievances page shows employee grievances
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /my-grievances |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-grievances

**Expected Results:**
- Grievance records listed
- Submit new grievance option
- Status tracking (Open/InProgress/Resolved/Closed)
- Module guard: requires EmployeeRelations module

---

#### TC-SS-053: My disciplinary page shows disciplinary records
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /my-disciplinary |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-disciplinary

**Expected Results:**
- Disciplinary actions listed (read-only for employee)
- Shows date, type, description, status
- Appeal option if policy allows
- Module guard: requires EmployeeRelations module

---

#### TC-SS-054: My training and training catalog pages
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-training, /training-catalog, /my-certifications |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-training — shows enrolled training sessions
2. Navigate to /training-catalog — shows available courses
3. Navigate to /training/:id — shows session details
4. Navigate to /my-certifications — shows earned certifications

**Expected Results:**
- My training: enrolled sessions with status (Upcoming/InProgress/Completed)
- Training catalog: browse available courses, enroll option
- Training detail: schedule, materials, progress
- Certifications: earned certs with expiry dates
- All gated by Training module

---

#### TC-SS-055: My assets page shows assigned company assets
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /my-assets |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-assets

**Expected Results:**
- Assigned assets listed (laptop, phone, ID card, etc.)
- Asset details: type, serial number, assignment date
- Report issue/request return option
- Module guard: requires Assets module

---

### I. Manager Actions

#### TC-SS-056: Team members list with search and filter
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /team-members |
| **Role** | Manager |

**Preconditions:**
1. Logged in as ahmed.rashid@company.com (Branch Manager)

**Steps:**
1. Navigate to /team-members
2. Search for an employee by name
3. Filter by department

**Expected Results:**
- Team members listed (direct + indirect reports)
- Search filters by name/employee ID
- Department filter narrows results
- Each member shows: name, department, position, status
- Data from `GET /api/v1/portal/team-members`

---

#### TC-SS-057: Pending approvals displays all request types
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /pending-approvals |
| **Role** | Manager |

**Steps:**
1. Navigate to /pending-approvals

**Expected Results:**
- Shows pending vacation, excuse, and remote work requests
- Each request shows: employee name, type, dates, submitted date
- Approve and Reject action buttons visible per request
- Data from `GET /api/v1/portal/pending-approvals`

---

#### TC-SS-058: Approve request with comment
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /pending-approvals |
| **Role** | Manager |

**Preconditions:**
1. Pending vacation request exists from a team member

**Steps:**
1. Navigate to /pending-approvals
2. Click Approve on a vacation request
3. Add optional comment
4. Confirm

**Expected Results:**
- Confirmation dialog appears
- On confirm: approval API called
- Request status advances (Approved or to next step)
- Notification sent to employee
- Request removed from pending list

---

#### TC-SS-059: Reject request requires comment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /pending-approvals |
| **Role** | Manager |

**Steps:**
1. Navigate to /pending-approvals
2. Click Reject on a request
3. Try to submit without entering a comment

**Expected Results:**
- Comment field is required for rejection
- Validation error if comment is empty
- After entering comment and confirming: rejection processed
- Employee notified of rejection with reason

---

#### TC-SS-060: Approval history shows past actions
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /pending-approvals |
| **Role** | Manager |

**Steps:**
1. Navigate to /pending-approvals
2. Switch to history/past approvals tab (if available)

**Expected Results:**
- Past approval actions listed
- Shows: request type, employee, action taken, date, comment
- Sorted by most recent first
- Filtering by date range and request type

---

### J. Additional Self-Service Pages

#### TC-SS-061: My resignation page (Offboarding module)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-resignation |
| **Role** | Employee |

**Preconditions:**
1. Offboarding module enabled

**Steps:**
1. Navigate to /my-resignation

**Expected Results:**
- Submit resignation form if no active resignation
- Shows existing resignation status if submitted
- Notice period calculation displayed
- Module guard: requires Offboarding module

---

#### TC-SS-062: Announcements list and detail
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /announcements, /announcements/:id |
| **Role** | Employee |

**Steps:**
1. Navigate to /announcements
2. Click on an announcement to view detail

**Expected Results:**
- Active announcements listed chronologically
- Each shows title, date, preview
- Detail page shows full content
- Module guard: requires Announcements module

---

#### TC-SS-063: Shift swap requests (list, create, detail)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /shift-swap-requests |
| **Role** | Employee |

**Steps:**
1. Navigate to /shift-swap-requests (list)
2. Click create to navigate to /shift-swap-requests/create
3. View detail at /shift-swap-requests/:id

**Expected Results:**
- List shows employee's swap requests with status
- Create form: select target employee, swap date, reason
- Detail shows both parties, approval status
- Module guard: requires ShiftSwaps module

---

#### TC-SS-064: My on-call schedule
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /my-on-call |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-on-call

**Expected Results:**
- On-call assignments listed by date range
- Shows schedule, compensation rate
- Module guard: requires ShiftSwaps module

---

#### TC-SS-065: My compensatory offs
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /my-compensatory-offs |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-compensatory-offs

**Expected Results:**
- Compensatory off balance and history
- Request compensatory off option
- Module guard: requires LeaveManagement module

---

#### TC-SS-066: My leave encashments with request form
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-leave-encashments |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-leave-encashments (list)
2. Navigate to /my-leave-encashments/request (create)

**Expected Results:**
- List shows encashment requests with status
- Request form: select leave type, days to encash
- Validation against encashable balance
- Module guard: requires LeaveManagement module

---

#### TC-SS-067: My surveys with response form
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /my-surveys, /my-surveys/:id/respond |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-surveys (list active/completed surveys)
2. Navigate to /my-surveys/:id/respond (take a survey)

**Expected Results:**
- Active surveys listed with due dates
- Response form renders survey questions
- Submit response, cannot modify after submission
- Module guard: requires Surveys module

---

#### TC-SS-068: My career page (succession planning)
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /my-career |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-career

**Expected Results:**
- Career path visualization
- Skills/competency overview
- Development goals
- Module guard: requires SuccessionPlanning module

---

#### TC-SS-069: My timesheets (list, create, edit, detail)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-timesheets |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-timesheets (list)
2. Navigate to /my-timesheets/new (create)
3. Navigate to /my-timesheets/:id (detail)
4. Navigate to /my-timesheets/:id/edit (edit)

**Expected Results:**
- List shows timesheets by period with status
- Create: add time entries per day/project
- Detail: full breakdown of time entries
- Edit: only draft/rejected timesheets editable
- Module guard: requires Timesheets module

---

#### TC-SS-070: Module-disabled page displays correctly
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /module-disabled |
| **Role** | Employee |

**Steps:**
1. Navigate to a module-gated route when module is disabled
2. Observe the /module-disabled page

**Expected Results:**
- Clear message that the module is not available
- Suggestion to contact administrator
- Link back to dashboard
- No sensitive information exposed about subscription

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Navigation & Access Control | 10 | 4 | 3 | 2 | 1 |
| B. Employee Dashboard | 5 | 2 | 3 | 0 | 0 |
| C. Manager Dashboard | 5 | 3 | 2 | 0 | 0 |
| D. My Attendance | 5 | 1 | 4 | 0 | 0 |
| E. My Profile | 5 | 2 | 2 | 1 | 0 |
| F. Request Pages (Vacation/Excuse/Remote Work) | 8 | 2 | 4 | 2 | 0 |
| G. Attendance Corrections | 5 | 2 | 3 | 0 | 0 |
| H. My-* Module Pages | 12 | 0 | 7 | 5 | 0 |
| I. Manager Actions | 5 | 3 | 1 | 1 | 0 |
| J. Additional Self-Service Pages | 10 | 0 | 4 | 6 | 0 |
| **TOTAL** | **70** | **19** | **33** | **17** | **1** |
