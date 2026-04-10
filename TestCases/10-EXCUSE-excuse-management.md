# TC-EXCUSE: Excuse Management — Test Cases

## Module Overview

Excuse Management allows employees to submit excuses for partial-day absences (late arrival, early departure, personal errands, medical appointments, etc.). Each excuse has a type, date, time range, reason, and optional attachment. Excuses go through approval workflows and affect attendance calculations by offsetting deducted minutes. Excuse Policies define per-branch limits, reset cycles, and documentation requirements.

**Admin Pages**: `/employee-excuses`, `/employee-excuses/create`, `/employee-excuses/:id/view`, `/employee-excuses/:id/edit`, `/settings/excuse-policies`, `/settings/excuse-policies/create`, `/settings/excuse-policies/:id/view`
**Self-Service Pages**: `/excuse-requests`, `/excuse-requests/new`, `/excuse-requests/:id`
**API Endpoints**: `GET/POST/PUT/DELETE /api/v1/employee-excuses`, `GET /api/v1/employee-excuses/my-requests`, `GET/POST/PUT/DELETE /api/v1/excuse-policies`
**Backend Handlers**: `CreateExcuseCommandHandler.cs`, `UpdateExcuseCommandHandler.cs`, `DeleteExcuseCommandHandler.cs`

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | IsSystemUser=true, can delete any |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Can approve/reject excuses |
| Dept Manager | sara.fahad@company.com | Emp@123! | Can approve team excuses |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee |

---

## Test Cases

### A. Excuse List Page UI (Admin)

#### TC-EXCUSE-001: Excuse list page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employee-excuses |
| **Role** | Admin |

**Preconditions:**
1. User is logged in with permission to view excuses
2. At least one excuse record exists

**Steps:**
1. Navigate to /employee-excuses

**Expected Results:**
- Page renders with:
  - Page header with title
  - UnifiedFilterComponent with search, refresh, and Add button
  - DataTableComponent with columns: Employee, Type, Date, Start Time, End Time, Duration, Status, Actions
  - Pagination controls
- Data loads without errors

---

#### TC-EXCUSE-002: Excuse list filters by search term
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-excuses |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses
2. Type employee name "Salma" in search field
3. Observe table results

**Expected Results:**
- Table filters to show only excuses matching the search term
- Results update as user types (debounced)
- Empty state shown if no matches

---

#### TC-EXCUSE-003: Excuse list pagination
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-excuses |
| **Role** | Admin |

**Preconditions:**
1. More than 10 excuse records exist (default page size)

**Steps:**
1. Navigate to /employee-excuses
2. Observe pagination controls
3. Click page 2

**Expected Results:**
- Page 1 shows first 10 records
- Pagination shows correct total pages
- Page 2 loads next batch of records
- Page size selector available (10, 25, 50)

---

#### TC-EXCUSE-004: Excuse list table actions
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-excuses |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses
2. Observe actions column for each row

**Expected Results:**
- View action (eye icon) visible for all rows
- Edit action (pencil icon) visible for Pending excuses
- Delete action (trash icon) visible for SystemAdmin
- Actions use `TableActionsComponent` with `computed<TableAction[]>()`

---

### B. Create Excuse (Admin)

#### TC-EXCUSE-005: Create excuse page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses/create

**Expected Results:**
- Form renders with:
  - Employee selector (SearchableSelectComponent, required)
  - Excuse Type dropdown (required, default: PersonalExcuse)
  - Excuse Date input (required)
  - Start Time input (required, HH:MM)
  - End Time input (required, HH:MM)
  - Reason textarea (required)
  - Attachment file upload (optional)
  - Approval Status dropdown (Admin can set directly, default: Approved)
  - Duration display (auto-calculated)
  - Submit and Cancel buttons

---

#### TC-EXCUSE-006: Create excuse — all valid fields
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses/create
2. Select employee "Salma Khaldi"
3. Select type "PersonalExcuse"
4. Set date to today
5. Set start time "09:00"
6. Set end time "10:30"
7. Enter reason "Medical appointment"
8. Set approval status to "Approved"
9. Click Submit

**Expected Results:**
- Excuse created successfully
- Duration auto-calculated as 1.5 hours
- Success notification displayed
- Redirect to excuse list
- Excuse appears in list with correct data

---

#### TC-EXCUSE-007: Create excuse — employeeId required validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses/create
2. Leave employee selector empty
3. Fill all other fields with valid data
4. Click Submit

**Expected Results:**
- Validation error shown: employee is required
- Form not submitted

---

#### TC-EXCUSE-008: Create excuse — excuseType required validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses/create
2. Fill all fields but clear excuse type
3. Click Submit

**Expected Results:**
- Validation error: excuse type is required
- Default value should be PersonalExcuse so this requires deliberate clearing

---

#### TC-EXCUSE-009: Create excuse — excuseDate required and range validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Boundary Value Tests:**

| # | Date Value | Valid? | Reason |
|---|-----------|--------|--------|
| 1 | (empty) | No | Required field |
| 2 | Today | Yes | Within valid range |
| 3 | Yesterday | Yes | Within valid range |
| 4 | 30 days from now | Yes | At upper boundary |
| 5 | 31 days from now | No | "must be within valid range" |
| 6 | 365 days ago | Yes | At lower boundary (1 year) |
| 7 | 366 days ago | No | "must be within valid range" |
| 8 | 6 months ago | Yes | Within valid range |

---

#### TC-EXCUSE-010: Create excuse — startTime required validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses/create
2. Fill all fields but leave startTime empty
3. Click Submit

**Expected Results:**
- Validation error: start time is required
- Form not submitted

---

#### TC-EXCUSE-011: Create excuse — endTime must be after startTime
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Boundary Value Tests:**

| # | Start Time | End Time | Valid? | Reason |
|---|-----------|----------|--------|--------|
| 1 | 09:00 | 10:00 | Yes | End after start |
| 2 | 09:00 | 09:00 | No | "must be after start time" |
| 3 | 09:00 | 08:59 | No | "must be after start time" |
| 4 | 09:00 | 09:01 | Yes | Minimum gap (1 minute) |
| 5 | 00:00 | 23:59 | Yes | Full day span |
| 6 | 23:00 | 23:30 | Yes | Late evening excuse |
| 7 | (empty) | 10:00 | No | Start time required |
| 8 | 09:00 | (empty) | No | End time required |

---

#### TC-EXCUSE-012: Create excuse — reason required and maxLength validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Boundary Value Tests:**

| # | Reason Value | Valid? | Reason |
|---|-------------|--------|--------|
| 1 | (empty) | No | Required field |
| 2 | "A" (1 char) | Yes | Minimum valid |
| 3 | 500 chars | Yes | At max length |
| 4 | 501 chars | No | Exceeds maxLength(500) |
| 5 | "Medical appointment" | Yes | Normal input |

---

#### TC-EXCUSE-013: Create excuse — attachment file validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Boundary Value Tests:**

| # | File | Valid? | Reason |
|---|------|--------|--------|
| 1 | No file | Yes | Attachment is optional |
| 2 | valid.pdf (1MB) | Yes | Valid type and size |
| 3 | photo.jpeg (3MB) | Yes | Valid type and size |
| 4 | doc.docx (4.9MB) | Yes | Under 5MB limit |
| 5 | large.pdf (5.1MB) | No | Exceeds 5MB max |
| 6 | script.exe | No | Invalid file type |
| 7 | image.png (100KB) | Yes | Valid type |
| 8 | image.gif (2MB) | Yes | Valid type |
| 9 | file.txt | No | Not in allowed types |

**Allowed types**: JPEG, PNG, GIF, PDF, DOC, DOCX

---

#### TC-EXCUSE-014: Create excuse — duration auto-calculation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Set start time to "09:00"
2. Set end time to "10:30"
3. Observe duration field

**Expected Results:**
- Duration auto-calculated as 1.5 hours
- Duration displayed to user
- Duration is read-only (calculated, not manually entered)

**Duration Boundary Tests:**

| # | Start | End | Duration | Valid? | Reason |
|---|-------|-----|----------|--------|--------|
| 1 | 09:00 | 09:06 | 0.1h | Yes | Minimum valid (0.1 hours = 6 min) |
| 2 | 09:00 | 09:05 | ~0.08h | No | "must be between 0.1 and 24 hours" |
| 3 | 00:00 | 23:59 | ~24h | Yes | At upper boundary |
| 4 | 09:00 | 10:00 | 1.0h | Yes | Normal 1 hour |
| 5 | 08:00 | 17:00 | 9.0h | Yes | Full workday |

---

#### TC-EXCUSE-015: Create excuse — all excuse types selectable
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses/create
2. Open excuse type dropdown

**Expected Results:**
- All 6 excuse types available:
  - PersonalExcuse
  - OfficialDuty
  - Sick
  - Emergency
  - Medical
  - Family
- Default selection: PersonalExcuse

---

#### TC-EXCUSE-016: Admin can set approval status directly
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses/create
2. Fill all required fields
3. Set approval status to "Approved"
4. Submit

**Expected Results:**
- Excuse created with status "Approved" (bypasses workflow)
- No workflow instance created
- Excuse takes immediate effect on attendance

---

### C. Edit Excuse (Admin)

#### TC-EXCUSE-017: Edit excuse — form pre-populated
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employee-excuses/:id/edit |
| **Role** | Admin |

**Preconditions:**
1. A pending excuse exists with known data

**Steps:**
1. Navigate to /employee-excuses/{id}/edit

**Expected Results:**
- Form pre-populated with existing excuse data
- Employee selector is disabled (cannot change employee after creation)
- All other fields editable
- Cancel navigates back without changes

---

#### TC-EXCUSE-018: Edit excuse — employeeId field disabled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employee-excuses/:id/edit |
| **Role** | Admin |

**Steps:**
1. Navigate to edit page for an existing excuse
2. Observe employee selector

**Expected Results:**
- Employee field is disabled/read-only
- Employee name displayed but not changeable
- Attempting to change employee via API returns validation error

---

#### TC-EXCUSE-019: Edit excuse — save changes successfully
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-excuses/:id/edit |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses/{id}/edit
2. Change reason to "Updated medical reason"
3. Change end time to extend by 30 minutes
4. Click Save

**Expected Results:**
- Excuse updated successfully
- Duration recalculated
- Success notification shown
- Redirect to list or view page
- Changes reflected in the record

---

### D. View Excuse (Admin)

#### TC-EXCUSE-020: View excuse detail page
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employee-excuses/:id/view |
| **Role** | Admin |

**Steps:**
1. Navigate to /employee-excuses/{id}/view

**Expected Results:**
- View page renders with:
  - FormHeaderComponent with back navigation
  - Employee name and details
  - Excuse type with StatusBadgeComponent
  - Date, start time, end time, duration
  - Reason text
  - Attachment (download link if present)
  - Approval status badge
  - Approval history (if workflow used)
  - DefinitionListComponent for label-value pairs

---

### E. Delete Excuse

#### TC-EXCUSE-021: SystemAdmin can delete any excuse
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Authorization |
| **Page** | /employee-excuses |
| **Role** | SystemAdmin |

**Steps:**
1. Login as SystemAdmin
2. Navigate to /employee-excuses
3. Click delete action on any excuse
4. Confirm deletion

**Expected Results:**
- Confirmation dialog shown via ConfirmationService
- Excuse deleted successfully
- Success notification
- Excuse removed from list
- Related attendance calculations may need recalculation

---

#### TC-EXCUSE-022: Non-SystemAdmin cannot delete excuses
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Authorization |
| **Page** | /employee-excuses |
| **Role** | Regular Admin |

**Steps:**
1. Login as non-SystemAdmin admin user
2. Navigate to /employee-excuses
3. Observe actions for excuses

**Expected Results:**
- Delete action not visible (condition function returns false)
- Attempting delete via direct API call returns 403 Forbidden

---

### F. Self-Service Excuse Requests

#### TC-EXCUSE-023: Self-service excuse list renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | Self-Service /excuse-requests |
| **Role** | Employee |

**Preconditions:**
1. Employee has submitted excuses previously

**Steps:**
1. Login to self-service portal as employee
2. Navigate to /excuse-requests

**Expected Results:**
- Page shows only the logged-in employee's excuses
- Table columns: Type, Date, Start Time, End Time, Duration, Status
- Status shown with StatusBadgeComponent
- "New Excuse" button visible
- No access to other employees' excuses

---

#### TC-EXCUSE-024: Self-service create excuse request
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Self-Service /excuse-requests/new |
| **Role** | Employee |

**Steps:**
1. Navigate to /excuse-requests/new
2. Select type "Medical"
3. Set date to today
4. Set start time "14:00"
5. Set end time "15:30"
6. Enter reason "Doctor's appointment"
7. Optionally attach a document
8. Submit

**Expected Results:**
- Employee ID automatically set from JWT (not selectable)
- Excuse created with status "Pending"
- Workflow instance created (approval required)
- Success notification
- Redirect to excuse requests list
- New excuse appears with "Pending" status

---

#### TC-EXCUSE-025: Employee can only edit own pending excuses
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | Self-Service /excuse-requests/:id |
| **Role** | Employee |

**Steps:**
1. Login as employee
2. Navigate to a pending excuse request
3. Try to edit it
4. Then navigate to an approved excuse request
5. Try to edit it

**Expected Results:**
- Pending excuse: Edit form available, can modify fields
- Approved/Rejected excuse: Edit not available (view only)
- Cannot see or edit other employees' excuses
- API validates ownership and status before allowing update

---

#### TC-EXCUSE-026: Employee cannot edit other employee's excuse via API
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | API |
| **Role** | Employee |

**Steps:**
1. Login as employee A
2. Call `PUT /api/v1/employee-excuses/{excuseId}` where excuseId belongs to employee B

**Expected Results:**
- API returns 403 Forbidden or 404 Not Found
- Excuse not modified

---

### G. Self-Service View Excuse Detail

#### TC-EXCUSE-027: View excuse detail in self-service
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | Self-Service /excuse-requests/:id |
| **Role** | Employee |

**Steps:**
1. Navigate to /excuse-requests/{id} for own excuse

**Expected Results:**
- Detail page shows all excuse information
- Approval status prominently displayed
- Approval history/workflow steps visible
- Edit button only for Pending excuses
- Cancel option for Pending excuses
- Attachment downloadable if present

---

### H. Balance Tracking & Policy Enforcement

#### TC-EXCUSE-028: Excuse balance tracked per policy reset cycle
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Preconditions:**
1. Excuse policy allows 3 excuses per month
2. Employee has already used 2 excuses this month

**Steps:**
1. Create a 3rd excuse for the employee
2. Attempt to create a 4th excuse

**Expected Results:**
- 3rd excuse: Created successfully (at limit)
- 4th excuse: Error — "Excuse limit exceeded for current period"
- Balance tracking respects policy reset cycle (monthly/quarterly/yearly)

---

#### TC-EXCUSE-029: Excuse balance resets after policy period
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Preconditions:**
1. Monthly reset policy with 3 excuses/month
2. Employee used 3 excuses in previous month

**Steps:**
1. In new month, create an excuse for the employee

**Expected Results:**
- Excuse created successfully
- Balance reset to 0 used for new period
- Previous month's excuses remain in history

---

#### TC-EXCUSE-030: Excuse duration deducted from balance
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-excuses |
| **Role** | Admin |

**Preconditions:**
1. Policy tracks by hours (e.g., 5 hours per month)
2. Employee has used 3 hours this month

**Steps:**
1. Create excuse with 2-hour duration (total: 5 hours)
2. Create excuse with 0.5-hour duration (total: 5.5 hours)

**Expected Results:**
- First excuse: Created (at limit)
- Second excuse: Rejected — exceeds monthly hour limit

---

### I. Excuse Offset & Attendance Impact

#### TC-EXCUSE-031: Approved excuse offsets attendance deductions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /attendance |
| **Role** | Admin |

**Preconditions:**
1. Employee was late by 90 minutes on a specific date
2. An approved excuse exists for 60 minutes of that time

**Steps:**
1. View the attendance record for that date

**Expected Results:**
- Raw late minutes: 90
- Excuse offset: 60 minutes
- Net deducted minutes: 30 (90 - 60)
- Attendance record reflects the excuse offset

---

#### TC-EXCUSE-032: Pending excuse does not offset attendance
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /attendance |
| **Role** | Admin |

**Preconditions:**
1. Employee has a pending (unapproved) excuse

**Steps:**
1. View attendance record for the excuse date

**Expected Results:**
- Attendance deductions remain unchanged
- Excuse offset applied only after approval
- Status shows deduction without excuse offset

---

### J. Excuse Policy Configuration

#### TC-EXCUSE-033: Create excuse policy page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/excuse-policies/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /settings/excuse-policies/create

**Expected Results:**
- Form renders with:
  - Policy name (required)
  - Excuse types selection (multi-select)
  - Limit per period (number)
  - Reset period (Monthly/Quarterly/Yearly)
  - Documentation required toggle (boolean)
  - Branch assignment
  - Description
  - Active/Inactive toggle

---

#### TC-EXCUSE-034: View excuse policy details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/excuse-policies/:id/view |
| **Role** | Admin |

**Steps:**
1. Navigate to /settings/excuse-policies/{id}/view

**Expected Results:**
- Detail view with DefinitionListComponent showing:
  - Policy name
  - Applicable excuse types
  - Limit per period
  - Reset period
  - Documentation required (Yes/No)
  - Assigned branches
  - Active status with StatusBadgeComponent

---

#### TC-EXCUSE-035: Excuse policy with documentation requirement enforced
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Preconditions:**
1. Excuse policy for "Sick" type requires documentation

**Steps:**
1. Create an excuse with type "Sick"
2. Do NOT attach any document
3. Submit

**Expected Results:**
- Validation error: documentation required for this excuse type
- Excuse not created until document attached

---

#### TC-EXCUSE-036: Excuse policy — inactive policy not enforced
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Preconditions:**
1. Excuse policy exists but is marked inactive

**Steps:**
1. Create an excuse that would violate the inactive policy

**Expected Results:**
- Excuse created successfully
- Inactive policies are not enforced
- Only active policies checked during creation

---

### K. Bilingual & RTL Support

#### TC-EXCUSE-037: Excuse pages render correctly in Arabic (RTL)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-excuses |
| **Role** | Admin |

**Steps:**
1. Switch language to Arabic
2. Navigate to /employee-excuses
3. Navigate to /employee-excuses/create
4. Navigate to /employee-excuses/{id}/view

**Expected Results:**
- All pages render in RTL layout
- All labels translated to Arabic
- Form fields aligned correctly for RTL
- Table headers in Arabic
- Excuse types displayed in Arabic
- Status badges use Arabic labels
- No layout breakage or overlapping elements

---

#### TC-EXCUSE-038: Excuse type labels use i18n translations
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Open excuse type dropdown in English
2. Switch to Arabic
3. Open dropdown again

**Expected Results:**
- English: "Personal Excuse", "Official Duty", "Sick", "Emergency", "Medical", "Family"
- Arabic: Translated equivalents for each type
- No hardcoded English strings

---

### L. Edge Cases & Negative Tests

#### TC-EXCUSE-039: Create excuse for non-existent employee (API)
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Negative |
| **Page** | API |
| **Role** | Admin |

**Steps:**
1. Call `POST /api/v1/employee-excuses` with `employeeId: 99999`

**Expected Results:**
- API returns 400 or 404 error
- Error message indicates employee not found

---

#### TC-EXCUSE-040: Overlapping excuse times for same employee and date
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Preconditions:**
1. Employee has an approved excuse on today 09:00-10:00

**Steps:**
1. Create a new excuse for same employee, same date, 09:30-11:00

**Expected Results:**
- Either validation error for overlapping time range
- Or system allows it (business decision) — verify expected behavior

---

#### TC-EXCUSE-041: Create excuse on weekend/off-day
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Negative |
| **Page** | /employee-excuses/create |
| **Role** | Admin |

**Steps:**
1. Create an excuse with date set to a Saturday (employee's off day)

**Expected Results:**
- Either validation warning that the date is an off-day
- Or excuse created (may be valid for special circumstances)
- Verify system behavior matches business rules

---

#### TC-EXCUSE-042: Module entitlement — excuse module disabled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-excuses |
| **Role** | Admin |

**Preconditions:**
1. Tenant subscription plan does not include the Excuse Management module

**Steps:**
1. Navigate to /employee-excuses

**Expected Results:**
- If `AllowReadWhenDisabled=true`: List page accessible in read-only mode, create button hidden
- If module fully blocked: Route guard redirects away
- ModuleStatusBannerComponent shown with read-only warning
- Create/edit routes blocked by `moduleStrict: true`

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Excuse List Page UI | 4 | 1 | 3 | 0 | 0 |
| B. Create Excuse (Admin) | 12 | 5 | 5 | 2 | 0 |
| C. Edit Excuse (Admin) | 3 | 2 | 1 | 0 | 0 |
| D. View Excuse (Admin) | 1 | 1 | 0 | 0 | 0 |
| E. Delete Excuse | 2 | 0 | 2 | 0 | 0 |
| F. Self-Service Requests | 4 | 3 | 1 | 0 | 0 |
| G. Self-Service View | 1 | 0 | 1 | 0 | 0 |
| H. Balance & Policy | 3 | 1 | 2 | 0 | 0 |
| I. Attendance Impact | 2 | 1 | 1 | 0 | 0 |
| J. Policy Configuration | 4 | 1 | 2 | 1 | 0 |
| K. Bilingual & RTL | 2 | 0 | 1 | 1 | 0 |
| L. Edge Cases & Negative | 4 | 0 | 2 | 2 | 0 |
| **TOTAL** | **42** | **15** | **21** | **6** | **0** |
