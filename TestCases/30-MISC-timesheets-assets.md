# TC-MISC: Timesheets & Asset Management — Test Cases

## Module Overview

This module covers project-based timesheet tracking and organizational asset management. Timesheets allow employees to log working hours against projects within defined periods. Asset management tracks company property from procurement through assignment to retirement, including employee asset assignments with checkout/return tracking.

**Admin Pages**: `/timesheets/periods/*`, `/timesheets/projects/*`, `/timesheets/timesheets/*`, `/assets/*`
**Self-Service Pages**: `/my-timesheets/*`, `/my-assets`
**API Endpoints**: `POST/GET/PUT/DELETE /api/v1/timesheet-periods`, `POST/GET/PUT/DELETE /api/v1/projects`, `POST/GET/PUT/DELETE /api/v1/timesheets`, `POST/GET/PUT/DELETE /api/v1/asset-categories`, `POST/GET/PUT/DELETE /api/v1/assets`, `POST/GET/PUT/DELETE /api/v1/asset-assignments`
**Background Jobs**: `TimesheetPeriodGenerationJob`, `TimesheetPeriodClosureJob`, `OverdueAssetReturnAlertJob`

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
| HR Manager | sara.fahad@company.com | Emp@123! | HR department manager |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Branch manager / project lead |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee |

---

## Test Cases

### A. Timesheet Periods

#### TC-MISC-001: Create timesheet period
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /timesheets/periods/create |
| **Role** | HR Manager |

**Preconditions:**
1. Logged in as HR Manager on Admin Portal

**Steps:**
1. Navigate to /timesheets/periods/create
2. Enter name: "April 2026"
3. Set start date: 2026-04-01
4. Set end date: 2026-04-30
5. Set status: "Open"
6. Click Save

**Expected Results:**
- Timesheet period created successfully
- Period appears in list at /timesheets/periods
- Status shows "Open"
- Employees can submit timesheets for this period

---

#### TC-MISC-002: Prevent overlapping timesheet periods
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /timesheets/periods/create |
| **Role** | HR Manager |

**Preconditions:**
1. Period "April 2026" (Apr 1-30) exists and is Open

**Steps:**
1. Navigate to /timesheets/periods/create
2. Enter name: "Mid-April 2026"
3. Set start date: 2026-04-15
4. Set end date: 2026-05-15
5. Click Save

**Expected Results:**
- Validation error: "Period dates overlap with existing period 'April 2026'"
- Period not created

---

#### TC-MISC-003: Close timesheet period
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /timesheets/periods/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Open period "April 2026" exists with submitted timesheets

**Steps:**
1. Navigate to the period detail page
2. Click "Close Period"
3. Confirm closure

**Expected Results:**
- Period status changes from "Open" to "Closed"
- No new timesheets can be submitted for this period
- Existing draft timesheets cannot be edited
- Employees see period as closed in self-service

---

#### TC-MISC-004: Timesheet period generation job
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Steps:**
1. `TimesheetPeriodGenerationJob` runs on schedule (e.g., 1st of each month)
2. Job checks if a period for the current month exists

**Expected Results:**
- If no period exists for the current month, one is auto-created with status "Open"
- Period name derived from month/year (e.g., "May 2026")
- Start date = first day of month, end date = last day of month
- If period already exists, job skips creation

---

#### TC-MISC-005: Timesheet period closure job
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Open period with end date in the past exists

**Steps:**
1. `TimesheetPeriodClosureJob` runs on schedule
2. Job finds periods where end date < today and status = Open

**Expected Results:**
- Period status automatically changed to "Closed"
- All draft timesheets within the period are frozen
- Job logs the closure action

---

### B. Projects

#### TC-MISC-006: Create project
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /timesheets/projects/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /timesheets/projects/create
2. Enter name: "Website Redesign"
3. Enter description: "Complete redesign of company website"
4. Enter client: "Internal"
5. Set status: "Active"
6. Set budget hours: 500
7. Click Save

**Expected Results:**
- Project created successfully
- Project appears in list with Active status
- Budget hours displayed
- Success notification shown

---

#### TC-MISC-007: Edit project details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /timesheets/projects/:id/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Project "Website Redesign" exists

**Steps:**
1. Navigate to /timesheets/projects/:id/edit
2. Update budget hours from 500 to 600
3. Update description
4. Click Save

**Expected Results:**
- Project updated successfully
- Budget hours reflect new value
- Existing timesheets linked to this project unaffected

---

#### TC-MISC-008: Deactivate project
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /timesheets/projects/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Active project exists

**Steps:**
1. Navigate to project detail
2. Click "Deactivate"
3. Confirm

**Expected Results:**
- Project status changes to "Inactive"
- Employees cannot log time against this project
- Project hidden from timesheet project dropdown
- Existing logged hours preserved

---

#### TC-MISC-009: Assign team members to project
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /timesheets/projects/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Active project exists
2. Multiple employees exist

**Steps:**
1. Navigate to project detail
2. Click "Manage Team"
3. Add employees: Salma Khaldi, Ahmed Al-Rashid
4. Save

**Expected Results:**
- Selected employees assigned to the project
- Only assigned employees can log time to this project
- Team member list visible on project detail page

---

#### TC-MISC-010: View project with budget tracking
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /timesheets/projects/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Project with budget hours and logged timesheets exists

**Steps:**
1. Navigate to project detail page

**Expected Results:**
- Budget hours displayed (e.g., 500)
- Total logged hours calculated from approved timesheets
- Remaining hours shown
- Progress bar or percentage indicator
- Warning if logged hours exceed budget

---

### C. Timesheets

#### TC-MISC-011: Create timesheet with time entries
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /timesheets/timesheets/create |
| **Role** | HR Manager |

**Preconditions:**
1. Open timesheet period exists
2. Active project(s) exist

**Steps:**
1. Navigate to /timesheets/timesheets/create
2. Select employee: Salma Khaldi
3. Select period: "April 2026"
4. Add time entry: Project = "Website Redesign", Date = Apr 7, Hours = 6
5. Add time entry: Project = "Website Redesign", Date = Apr 7, Hours = 2 (different task)
6. Add time entry: Project = "Website Redesign", Date = Apr 8, Hours = 8
7. Click Save as Draft

**Expected Results:**
- Timesheet created with status "Draft"
- Three time entries saved
- Total hours calculated: 16 hours
- Daily totals calculated: Apr 7 = 8h, Apr 8 = 8h

---

#### TC-MISC-012: Validate daily hours do not exceed limit
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /timesheets/timesheets/create |
| **Role** | HR Manager |

**Steps:**
1. Create timesheet for employee
2. Add time entries for a single day totaling more than 24 hours

**Expected Results:**
- Validation error: daily total cannot exceed 24 hours
- Timesheet not saved until corrected

---

#### TC-MISC-013: Submit timesheet for approval
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /timesheets/timesheets/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Draft timesheet exists with time entries

**Steps:**
1. Navigate to timesheet detail
2. Click "Submit for Approval"
3. Confirm submission

**Expected Results:**
- Timesheet status changes from "Draft" to "Submitted"
- Approver notified of pending timesheet
- Employee cannot edit submitted timesheet
- Submission date recorded

---

#### TC-MISC-014: Approve timesheet
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /timesheets/timesheets/:id |
| **Role** | Branch Manager |

**Preconditions:**
1. Submitted timesheet exists

**Steps:**
1. Navigate to submitted timesheet as approver
2. Review time entries
3. Click "Approve"

**Expected Results:**
- Timesheet status changes to "Approved"
- Hours counted toward project budget tracking
- Employee notified of approval
- Timesheet becomes read-only

---

#### TC-MISC-015: Reject timesheet with comments
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /timesheets/timesheets/:id |
| **Role** | Branch Manager |

**Preconditions:**
1. Submitted timesheet exists

**Steps:**
1. Navigate to submitted timesheet
2. Enter rejection comment: "Hours for April 8 seem excessive, please verify"
3. Click "Reject"

**Expected Results:**
- Timesheet status changes to "Rejected"
- Rejection comment saved
- Employee notified of rejection with comments
- Employee can edit and resubmit the timesheet

---

#### TC-MISC-016: Self-service create timesheet
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /my-timesheets/create (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Open timesheet period exists
2. Employee is assigned to at least one active project

**Steps:**
1. Login to self-service as salma.khaldi@company.com
2. Navigate to /my-timesheets
3. Click "Create Timesheet"
4. Select period: "April 2026"
5. Add time entries per project per day (weekly grid view)
6. Click Save as Draft

**Expected Results:**
- Timesheet created for the logged-in employee only
- Weekly grid shows days as columns, projects as rows
- Hours entered per cell
- Row and column totals calculated automatically
- Draft saved successfully

---

#### TC-MISC-017: Self-service view timesheet history
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-timesheets (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Login to self-service
2. Navigate to /my-timesheets
3. View list of timesheets

**Expected Results:**
- List shows all employee's timesheets
- Each row shows: period, total hours, status (Draft/Submitted/Approved/Rejected)
- Status badges with appropriate colors
- Can click to view details
- Can edit Draft timesheets, view-only for others

---

### D. Asset Categories

#### TC-MISC-018: Create asset category
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /assets/categories/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /assets/categories/create
2. Enter name: "Laptops"
3. Enter name (AR): "اجهزة محمولة"
4. Select depreciation method: "Straight Line"
5. Click Save

**Expected Results:**
- Asset category created successfully
- Appears in category list
- Both EN and AR names saved

---

#### TC-MISC-019: Edit asset category
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | CRUD |
| **Page** | /assets/categories/:id/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Category "Laptops" exists

**Steps:**
1. Navigate to category edit page
2. Change depreciation method to "Declining Balance"
3. Save

**Expected Results:**
- Category updated
- Existing assets in this category unaffected
- New depreciation method applied to future calculations

---

#### TC-MISC-020: Delete asset category only if no assets linked
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /assets/categories |
| **Role** | HR Manager |

**Preconditions:**
1. Category "Laptops" has assets linked to it

**Steps:**
1. Navigate to /assets/categories
2. Click delete on "Laptops"
3. Confirm deletion

**Expected Results:**
- Validation error: "Cannot delete category with existing assets"
- Category not deleted
- If category has no assets, deletion succeeds

---

### E. Assets

#### TC-MISC-021: Create asset with full details
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /assets/create |
| **Role** | HR Manager |

**Preconditions:**
1. Asset category "Laptops" exists

**Steps:**
1. Navigate to /assets/create
2. Enter name: "MacBook Pro 16-inch"
3. Enter serial number: "C02ZX1ABCDEF"
4. Select category: "Laptops"
5. Set purchase date: 2026-01-15
6. Enter purchase value: 8500 SAR
7. Set warranty expiry: 2028-01-15
8. Set status: "Available"
9. Click Save

**Expected Results:**
- Asset created successfully
- Asset appears in list with status "Available"
- All fields saved correctly
- Asset tag/ID auto-generated

---

#### TC-MISC-022: View asset list with filters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /assets |
| **Role** | HR Manager |

**Preconditions:**
1. Multiple assets exist in different categories and statuses

**Steps:**
1. Navigate to /assets
2. Filter by category: "Laptops"
3. Filter by status: "Available"
4. Search by serial number

**Expected Results:**
- DataTable shows filtered results
- Columns: Name, Serial, Category, Status, Assigned To, Purchase Date, Value
- Pagination works
- Status badges: Available=success, Assigned=info, InMaintenance=warning, Retired=secondary

---

#### TC-MISC-023: Transition asset through all statuses
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /assets/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Asset exists with status "Available"

**Steps:**
1. Assign asset to employee -> status becomes "Assigned"
2. Return asset -> status becomes "Available"
3. Send to maintenance -> status becomes "InMaintenance"
4. Return from maintenance -> status becomes "Available"
5. Retire asset -> status becomes "Retired"

**Expected Results:**
- Each status transition is valid
- Status history tracked
- Retired assets cannot be assigned
- InMaintenance assets cannot be assigned

---

#### TC-MISC-024: Edit asset details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /assets/:id/edit |
| **Role** | HR Manager |

**Steps:**
1. Navigate to asset edit page
2. Update warranty expiry date
3. Update notes
4. Save

**Expected Results:**
- Asset updated successfully
- Changes reflected in detail view
- Audit trail records the modification

---

#### TC-MISC-025: Prevent duplicate serial numbers
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /assets/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /assets/create
2. Enter serial number: "C02ZX1ABCDEF" (already exists from TC-MISC-021)
3. Fill other required fields
4. Click Save

**Expected Results:**
- Validation error: "An asset with this serial number already exists"
- Asset not created

---

### F. Asset Assignments

#### TC-MISC-026: Assign asset to employee
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /assets/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Asset "MacBook Pro 16-inch" exists with status "Available"
2. Employee Salma Khaldi exists

**Steps:**
1. Navigate to asset detail page
2. Click "Assign to Employee"
3. Select employee: Salma Khaldi
4. Set checkout date: today
5. Set expected return date: 2027-04-10 (1 year)
6. Record condition at checkout: "Excellent"
7. Click Assign

**Expected Results:**
- Asset assigned to employee
- Asset status changes to "Assigned"
- Assignment record created with checkout date and expected return
- Employee sees asset in self-service /my-assets
- Condition at checkout recorded

---

#### TC-MISC-027: Return asset from employee
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /assets/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Asset assigned to employee (from TC-MISC-026)

**Steps:**
1. Navigate to asset detail page
2. Click "Return / Check-in"
3. Set return date: today
4. Record condition at return: "Good - minor scratches"
5. Click Confirm Return

**Expected Results:**
- Asset status changes back to "Available"
- Return date recorded on assignment
- Condition at return recorded
- Asset available for new assignment
- Assignment record shows complete checkout-to-return history

---

#### TC-MISC-028: Track asset condition changes
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /assets/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Asset has been assigned and returned at least once

**Steps:**
1. Navigate to asset detail page
2. View assignment history

**Expected Results:**
- Assignment history shows all past assignments
- Each assignment shows: employee, checkout date, return date, condition at checkout, condition at return
- Condition degradation visible across assignments

---

#### TC-MISC-029: Self-service view assigned assets
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-assets (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has at least one asset assigned

**Steps:**
1. Login to self-service as salma.khaldi@company.com
2. Navigate to /my-assets

**Expected Results:**
- List shows only assets assigned to the logged-in employee
- Each asset shows: name, serial, category, checkout date, expected return date
- Read-only view (employee cannot modify assignments)
- Status badge showing "Assigned"

---

#### TC-MISC-030: Overdue asset return alert job
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Asset assignment with expected return date in the past and no actual return date

**Steps:**
1. `OverdueAssetReturnAlertJob` runs on schedule
2. Job finds assignments where expected return date < today and return date is null

**Expected Results:**
- Alert notification sent to HR manager and assigned employee
- Notification includes: asset name, serial number, employee name, days overdue
- Only active (unreturned) assignments trigger alerts
- Job logs overdue counts

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Timesheet Periods | 5 | 2 | 3 | 0 |
| B. Projects | 5 | 1 | 3 | 1 |
| C. Timesheets | 7 | 4 | 3 | 0 |
| D. Asset Categories | 3 | 1 | 1 | 1 |
| E. Assets | 5 | 2 | 3 | 0 |
| F. Asset Assignments | 5 | 2 | 2 | 1 |
| **TOTAL** | **30** | **12** | **15** | **3** |
