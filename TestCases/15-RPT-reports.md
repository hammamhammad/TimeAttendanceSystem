# TC-RPT: Reports & Audit — Test Cases

## Module Overview

The Reports module provides attendance, leave, payroll, compliance, and custom reports with filtering, pagination, and CSV export. The ReportsController enforces module entitlement per endpoint (attendance -> TimeAttendance, leave -> LeaveManagement, payroll -> Payroll, contracts -> EmployeeLifecycle, documents -> Documents, certifications -> Training, compliance -> EmployeeLifecycle). SystemAdmin bypasses all module checks. Audit logs track all system changes with before/after JSON comparison. Session reports cover active sessions and login history.

**Admin Pages**: `/reports/attendance`, `/reports/leaves`, `/reports/sessions`, `/reports/audit-logs`, `/reports/payroll`, `/reports/compliance`, `/reports/custom-reports`, `/reports/custom-reports/create`, `/reports/custom-reports/:id/view`, `/reports/custom-reports/:id/edit`
**API Endpoints**: `GET /api/v1/reports/attendance`, `GET /api/v1/reports/attendance/export`, `GET /api/v1/reports/leaves`, `GET /api/v1/reports/salary-register`, `GET /api/v1/reports/department-cost`, `GET /api/v1/reports/ytd-earnings`, `GET /api/v1/reports/contract-expiry`, `GET /api/v1/reports/document-expiry`, `GET /api/v1/reports/certification-expiry`, `GET /api/v1/reports/compliance-summary`
**Backend Service**: `IReportsService`, `ReportsController`

---

## Test Environment

| Item | Value |
|------|-------|
| Backend | http://localhost:5099 |
| Admin Portal | http://localhost:4200 |

### Test Users

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Bypasses all module checks |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Branch-scoped report access |
| Employee | salma.khaldi@company.com | Emp@123! | Limited report access |

---

## Summary Table

| ID | Title | Priority | Category |
|----|-------|----------|----------|
| TC-RPT-001 | Attendance report page renders with date range filter | P0 | UI |
| TC-RPT-002 | Attendance report filters by branch | P0 | Functional |
| TC-RPT-003 | Attendance report filters by department | P1 | Functional |
| TC-RPT-004 | Attendance report filters by employee | P1 | Functional |
| TC-RPT-005 | Attendance report shows summary statistics | P0 | Functional |
| TC-RPT-006 | Attendance report pagination for large datasets | P1 | Performance |
| TC-RPT-007 | Leave report page renders with date range filter | P0 | UI |
| TC-RPT-008 | Leave report filters by branch and department | P1 | Functional |
| TC-RPT-009 | Leave report shows breakdown by vacation type | P1 | Functional |
| TC-RPT-010 | Sessions page shows active sessions | P1 | UI |
| TC-RPT-011 | Sessions page shows login history | P1 | UI |
| TC-RPT-012 | Payroll report page renders (requires Payroll module) | P1 | UI |
| TC-RPT-013 | Salary register report filters by payroll period | P1 | Functional |
| TC-RPT-014 | Department cost report aggregates by department | P1 | Functional |
| TC-RPT-015 | YTD earnings report with pagination | P1 | Functional |
| TC-RPT-016 | Compliance report page renders | P1 | UI |
| TC-RPT-017 | Contract expiry report filters by days threshold | P1 | Functional |
| TC-RPT-018 | Compliance summary shows 7/30/90-day thresholds | P1 | Functional |
| TC-RPT-019 | Attendance report CSV export downloads file | P0 | Functional |
| TC-RPT-020 | CSV filename includes date range | P2 | Functional |
| TC-RPT-021 | Attendance report blocked when TimeAttendance module disabled | P0 | Authorization |
| TC-RPT-022 | Leave report blocked when LeaveManagement module disabled | P0 | Authorization |
| TC-RPT-023 | Payroll reports blocked when Payroll module disabled | P0 | Authorization |
| TC-RPT-024 | SystemAdmin bypasses all module entitlement checks | P0 | Authorization |
| TC-RPT-025 | Custom reports page renders (requires CustomReports module) | P1 | UI |
| TC-RPT-026 | Audit log list page renders with filters | P0 | UI |
| TC-RPT-027 | Audit log entity type filter | P1 | Functional |
| TC-RPT-028 | Audit log action filter | P1 | Functional |
| TC-RPT-029 | Audit log detail modal shows before/after JSON comparison | P0 | UI |
| TC-RPT-030 | Audit log shows user actor for each entry | P1 | Functional |

---

## Test Cases

### A. Report Pages

#### TC-RPT-001: Attendance report page renders with date range filter
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /reports/attendance |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/attendance`

**Expected Results:**
- Report page renders with:
  - Date range picker (from/to)
  - Branch filter dropdown
  - Department filter dropdown
  - Employee filter (optional)
  - Generate/Search button
- Default date range set to current month

---

#### TC-RPT-002: Attendance report filters by branch
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /reports/attendance |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/attendance`
2. Set date range to last 30 days
3. Select Branch: "Headquarters - Riyadh"
4. Generate report

**Expected Results:**
- API call: `GET /api/v1/reports/attendance?from=...&to=...&branchId=101`
- Report shows only employees from the selected branch
- Summary statistics reflect branch-scoped data

---

#### TC-RPT-003: Attendance report filters by department
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/attendance |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/attendance`
2. Set date range, select branch, then select a department
3. Generate report

**Expected Results:**
- API call includes `departmentId` parameter
- Report shows only employees from the selected department
- Data correctly scoped

---

#### TC-RPT-004: Attendance report filters by employee
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/attendance |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/attendance`
2. Set date range and select a specific employee
3. Generate report

**Expected Results:**
- API call includes `employeeId` parameter
- Report shows only the selected employee's attendance records

---

#### TC-RPT-005: Attendance report shows summary statistics
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /reports/attendance |
| **Role** | System Admin |

**Preconditions:**
1. Attendance records exist for the date range

**Steps:**
1. Navigate to `/reports/attendance`
2. Set date range and generate report

**Expected Results:**
- `AttendanceReportSummary` response includes:
  - Total working days
  - Total present days
  - Total absent days
  - Total late arrivals
  - Total early departures
  - Total overtime hours
  - Average working hours

---

#### TC-RPT-006: Attendance report pagination for large datasets
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Performance |
| **Page** | /reports/attendance |
| **Role** | System Admin |

**Steps:**
1. Generate an attendance report with a wide date range (e.g., 3 months)
2. Observe pagination controls

**Expected Results:**
- Report data is paginated
- Page navigation controls visible
- Each page loads within acceptable time (< 3 seconds)

---

#### TC-RPT-007: Leave report page renders with date range filter
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /reports/leaves |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/leaves`

**Expected Results:**
- Report page renders with date range, branch, department, and employee filters
- Generate button available

---

#### TC-RPT-008: Leave report filters by branch and department
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/leaves |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/leaves`
2. Select branch and department
3. Generate report

**Expected Results:**
- API call: `GET /api/v1/reports/leaves?from=...&to=...&branchId=...&departmentId=...`
- Report scoped to selected branch and department
- `LeaveReportSummary` returned

---

#### TC-RPT-009: Leave report shows breakdown by vacation type
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/leaves |
| **Role** | System Admin |

**Steps:**
1. Generate a leave report for a period with multiple vacation types used

**Expected Results:**
- Report includes breakdown by vacation type (Annual, Sick, Personal, etc.)
- Each type shows count and total days
- Summary totals match individual type totals

---

#### TC-RPT-010: Sessions page shows active sessions
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /reports/sessions |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/sessions`

**Expected Results:**
- Page shows active sessions with: user, login time, IP address, device info
- Sessions listed in reverse chronological order
- Admin can view all sessions (branch-scoped for non-admins)

---

#### TC-RPT-011: Sessions page shows login history
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /reports/sessions |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/sessions`
2. Switch to login history tab/view

**Expected Results:**
- Login history shows: user, login time, logout time, duration, IP, success/failure
- Failed login attempts visible
- Pagination for large history

---

#### TC-RPT-012: Payroll report page renders (requires Payroll module)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /reports/payroll |
| **Role** | System Admin |

**Preconditions:**
1. Payroll module is enabled in tenant's subscription

**Steps:**
1. Navigate to `/reports/payroll`

**Expected Results:**
- Page renders with payroll report options:
  - Salary Register
  - Department Cost
  - YTD Earnings
- moduleGuard allows access (Payroll module enabled)

---

#### TC-RPT-013: Salary register report filters by payroll period
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/payroll |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/payroll`
2. Select salary register report
3. Select a payroll period
4. Generate report

**Expected Results:**
- API call: `GET /api/v1/reports/salary-register?payrollPeriodId=...`
- `SalaryRegisterReport` returned with employee salary component breakdowns
- Branch-scoped data based on user's branch access

---

#### TC-RPT-014: Department cost report aggregates by department
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/payroll |
| **Role** | System Admin |

**Steps:**
1. Generate department cost report for year 2026

**Expected Results:**
- API call: `GET /api/v1/reports/department-cost?year=2026`
- `DepartmentCostReport` shows total salary cost per department
- Optional month filter narrows to specific month

---

#### TC-RPT-015: YTD earnings report with pagination
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/payroll |
| **Role** | System Admin |

**Steps:**
1. Generate YTD earnings report for year 2026
2. Navigate through pages

**Expected Results:**
- API call: `GET /api/v1/reports/ytd-earnings?year=2026&page=1&pageSize=20`
- `YtdEarningsReport` with paginated employee YTD totals
- Branch and department filters available

---

#### TC-RPT-016: Compliance report page renders
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /reports/compliance |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/compliance`

**Expected Results:**
- Page renders with compliance report options:
  - Contract expiry
  - Document expiry
  - Certification expiry
  - Compliance summary
- No moduleGuard required (uses authGuard only, per route config)

---

#### TC-RPT-017: Contract expiry report filters by days threshold
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/compliance |
| **Role** | System Admin |

**Steps:**
1. Generate contract expiry report with daysThreshold = 30
2. Generate with daysThreshold = 90

**Expected Results:**
- API call: `GET /api/v1/reports/contract-expiry?daysThreshold=30`
- Returns active contracts with end dates within threshold period
- 90-day threshold returns more results than 30-day
- Requires EmployeeLifecycle module (403 if disabled, unless SystemAdmin)

---

#### TC-RPT-018: Compliance summary shows 7/30/90-day thresholds
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/compliance |
| **Role** | System Admin |

**Steps:**
1. Call `GET /api/v1/reports/compliance-summary`

**Expected Results:**
- `ComplianceSummaryReport` includes counts at 3 threshold levels:
  - 7-day: Items expiring within 7 days
  - 30-day: Items expiring within 30 days
  - 90-day: Items expiring within 90 days
  - Already expired: Items past expiry date
- Covers contracts, documents, and certifications

---

### B. Export & Entitlements

#### TC-RPT-019: Attendance report CSV export downloads file
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /reports/attendance |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/attendance`
2. Set date range and filters
3. Click Export to CSV button

**Expected Results:**
- API call: `GET /api/v1/reports/attendance/export?from=...&to=...`
- Browser downloads a CSV file
- File content type is `text/csv`
- CSV contains attendance data matching the filter criteria

---

#### TC-RPT-020: CSV filename includes date range
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Functional |
| **Page** | /reports/attendance |
| **Role** | System Admin |

**Steps:**
1. Export attendance report for 2026-03-01 to 2026-03-31

**Expected Results:**
- Downloaded filename follows pattern: `attendance_report_20260301_20260331.csv`
- Filename includes the from and to dates in yyyyMMdd format

---

#### TC-RPT-021: Attendance report blocked when TimeAttendance module disabled
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | N/A (API) |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant's subscription does not include TimeAttendance module
2. User is NOT SystemAdmin

**Steps:**
1. Call `GET /api/v1/reports/attendance?from=2026-01-01&to=2026-01-31`

**Expected Results:**
- Returns 403 Forbidden
- Error message: "The 'TimeAttendance' module is not available in your current subscription plan."
- No report data returned

---

#### TC-RPT-022: Leave report blocked when LeaveManagement module disabled
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | N/A (API) |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant's subscription does not include LeaveManagement module

**Steps:**
1. Call `GET /api/v1/reports/leaves?from=2026-01-01&to=2026-01-31`

**Expected Results:**
- Returns 403 Forbidden
- Error message: "The 'LeaveManagement' module is not available in your current subscription plan."

---

#### TC-RPT-023: Payroll reports blocked when Payroll module disabled
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | N/A (API) |
| **Role** | Branch Manager |

**Preconditions:**
1. Tenant's subscription does not include Payroll module

**Steps:**
1. Call `GET /api/v1/reports/salary-register?payrollPeriodId=1`
2. Call `GET /api/v1/reports/department-cost?year=2026`
3. Call `GET /api/v1/reports/ytd-earnings?year=2026`

**Expected Results:**
- All three calls return 403 Forbidden
- Error message: "The 'Payroll' module is not available in your current subscription plan."
- Frontend route `/reports/payroll` blocked by moduleGuard

---

#### TC-RPT-024: SystemAdmin bypasses all module entitlement checks
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Steps:**
1. Log in as SystemAdmin
2. Call `GET /api/v1/reports/attendance?from=2026-01-01&to=2026-01-31`
3. Call `GET /api/v1/reports/leaves?from=2026-01-01&to=2026-01-31`
4. Call `GET /api/v1/reports/salary-register?payrollPeriodId=1`
5. Call `GET /api/v1/reports/contract-expiry?daysThreshold=30`
6. Call `GET /api/v1/reports/certification-expiry?daysThreshold=30`

**Expected Results:**
- All calls succeed (200 OK) regardless of module entitlement status
- `IsModuleAccessibleAsync` returns `true` when `_currentUser.IsSystemAdmin` is true
- Report data returned for each endpoint

---

#### TC-RPT-025: Custom reports page renders (requires CustomReports module)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /reports/custom-reports |
| **Role** | System Admin |

**Preconditions:**
1. CustomReports module enabled

**Steps:**
1. Navigate to `/reports/custom-reports`

**Expected Results:**
- Custom reports list page renders
- Create button available (moduleStrict route)
- Existing custom reports listed with view/edit/delete actions
- moduleGuard blocks access if CustomReports module disabled

---

### C. Audit Log Detail

#### TC-RPT-026: Audit log list page renders with filters
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /reports/audit-logs |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/audit-logs`

**Expected Results:**
- DataTable renders with columns: Timestamp, User, Entity Type, Action, Entity ID
- Filter controls: date range, entity type, action type, user
- Pagination controls
- Click on row opens detail modal

---

#### TC-RPT-027: Audit log entity type filter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/audit-logs |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/audit-logs`
2. Filter by entity type: "Employee"
3. Observe results

**Expected Results:**
- Only audit log entries for "Employee" entity type shown
- Other entity types filtered out
- Result count reflects the filter

---

#### TC-RPT-028: Audit log action filter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/audit-logs |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/audit-logs`
2. Filter by action: "Update"
3. Observe results

**Expected Results:**
- Only audit log entries with action "Update" shown
- Create, Delete, and other actions filtered out

---

#### TC-RPT-029: Audit log detail modal shows before/after JSON comparison
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /reports/audit-logs |
| **Role** | System Admin |

**Preconditions:**
1. Audit log entry exists for an Update action with tracked changes

**Steps:**
1. Navigate to `/reports/audit-logs`
2. Click on an "Update" audit log entry to open detail modal

**Expected Results:**
- Modal opens with audit log details
- Shows before/after comparison for each changed field
- Changed fields highlighted or listed as `AuditChange` entries
- Old value and new value shown side by side
- TraceId displayed for debugging reference

---

#### TC-RPT-030: Audit log shows user actor for each entry
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /reports/audit-logs |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/reports/audit-logs`
2. Inspect the User column

**Expected Results:**
- Each audit log entry shows the user who performed the action
- User name or email displayed
- System actions (background jobs) show system identifier
- User column is searchable/filterable
