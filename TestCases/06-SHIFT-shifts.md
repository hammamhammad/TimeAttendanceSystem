# TC-SHIFT: Shift Management — Test Cases

## Module Overview

Shift Management handles the creation, configuration, assignment, and lifecycle of work shifts in TecAxle HRMS. Shifts define when employees are expected to work, including time periods, flexible hours, grace periods, core hours, and working days. The module supports two shift types (TimeBased and HoursOnly) with complex conditional logic between fields, plus a full assignment system supporting employee, department, and branch-level assignments with priority resolution.

**Admin Pages**: `/shifts`, `/shifts/create`, `/shifts/:id/view`, `/shifts/:id/edit`, `/shifts/assign`
**API Endpoints**: `GET/POST /api/v1/shifts`, `GET/PUT/DELETE /api/v1/shifts/{id}`, `GET/POST /api/v1/shift-assignments`, `PUT/DELETE /api/v1/shift-assignments/{id}`
**Backend Handlers**: `CreateShiftCommandHandler`, `UpdateShiftCommandHandler`, `DeleteShiftCommandHandler`, `CreateShiftAssignmentCommandHandler`

---

## Test Environment

| Item | Value |
|------|-------|
| Backend | http://localhost:5099 |
| Admin Portal | http://localhost:4200 |

### Test Users

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full access |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | MustChangePassword=true |
| Employee | salma.khaldi@company.com | Emp@123! | MustChangePassword=true |

---

## Test Cases

### A. Shift Form — TimeBased Type

#### TC-SHIFT-001: Create TimeBased shift with valid data — happy path
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Preconditions:**
1. Logged in as System Admin
2. Navigate to /shifts/create

**Steps:**
1. Enter name: "Standard Day Shift"
2. Enter description: "Regular 8-5 working hours"
3. Select ShiftType: TimeBased (default)
4. Verify shift period 1 defaults: startTime=08:00, endTime=17:00
5. Leave working days as default (Mon-Fri checked)
6. Leave isCheckInRequired=true (default)
7. Leave isAutoCheckOut=false (default)
8. Click Submit

**Expected Results:**
- Shift created successfully
- Redirect to /shifts list
- New shift appears in list with name "Standard Day Shift"
- Total hours calculated as 9h (08:00-17:00)
- ShiftType = TimeBased
- Working days: Mon, Tue, Wed, Thu, Fri

---

#### TC-SHIFT-002: Name field — required validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Leave name field empty
2. Fill all other required fields validly
3. Click Submit

**Expected Results:**
- Validation error: name is required
- Form does not submit
- No API call made

---

#### TC-SHIFT-003: Name field — maxLength(200) boundary
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Boundary Tests:**

| # | Input | Length | Valid? | Reason |
|---|-------|--------|--------|--------|
| 1 | "" | 0 | No | Required |
| 2 | "A" | 1 | Yes | Minimum valid |
| 3 | "A" x 200 | 200 | Yes | At max length |
| 4 | "A" x 201 | 201 | No | Exceeds maxLength(200) |

---

#### TC-SHIFT-004: Description field — maxLength(1000) boundary
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Boundary Tests:**

| # | Input | Length | Valid? | Reason |
|---|-------|--------|--------|--------|
| 1 | "" | 0 | Yes | Optional field |
| 2 | "D" x 1000 | 1000 | Yes | At max length |
| 3 | "D" x 1001 | 1001 | No | Exceeds maxLength(1000) |

---

#### TC-SHIFT-005: TimeBased shift — at least one shift period required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: TimeBased
2. Remove all shift periods (click remove on default period)
3. Fill name and working days
4. Click Submit

**Expected Results:**
- Validation error: shift periods required for TimeBased type
- Form does not submit

---

#### TC-SHIFT-006: TimeBased shift — maximum 2 shift periods
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: TimeBased
2. Default: 1 period exists
3. Click "Add Period" — 2nd period added
4. Verify "Add Period" button is disabled or hidden

**Expected Results:**
- Maximum 2 periods allowed
- After adding 2nd period, cannot add more
- Both periods display with periodOrder 1 and 2

---

#### TC-SHIFT-007: TimeBased shift — period hours calculation (day shift)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Set period 1: startTime=08:00, endTime=17:00
2. Observe total hours display

**Expected Results:**
- Period 1 hours: 9h
- Total shift hours: 9h
- Period type shows "Day Shift"

---

#### TC-SHIFT-008: TimeBased shift — night shift period (midnight crossing)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Set period 1: startTime=22:00, endTime=06:00
2. Check isNightShift checkbox
3. Observe calculation

**Expected Results:**
- Period hours calculated correctly: 8h (22:00 to 06:00 crossing midnight)
- Period type shows "Night Shift"
- isNightShift flag set to true

---

#### TC-SHIFT-009: TimeBased shift — split shift with 2 periods
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Set period 1: startTime=08:00, endTime=12:00 (4h)
2. Add period 2: startTime=13:00, endTime=17:00 (4h)
3. Observe total hours

**Expected Results:**
- Period 1: 4h
- Period 2: 4h
- Total shift hours: 8h
- Both periods shown with correct periodOrder (1, 2)

---

#### TC-SHIFT-010: TimeBased shift — requiredHours must NOT be set
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: TimeBased
2. Verify requiredHours field is not visible or disabled
3. Submit form with periods configured

**Expected Results:**
- requiredHours is undefined/null for TimeBased shifts
- If somehow set, validation error: "TimeBased shifts should not have requiredHours"
- Hours are calculated from shift periods instead

---

### B. Shift Form — HoursOnly Type

#### TC-SHIFT-011: Create HoursOnly shift — happy path
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Enter name: "Flexible 8-Hour Shift"
2. Select ShiftType: HoursOnly
3. Set requiredHours: 8
4. Set working days: Sun-Thu
5. Leave isCheckInRequired=true
6. Click Submit

**Expected Results:**
- Shift created with ShiftType=HoursOnly
- requiredHours=8
- No shift periods stored
- Flexible hours, grace period, and night shift options not available

---

#### TC-SHIFT-012: HoursOnly — requiredHours boundary values
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Boundary Tests:**

| # | Value | Valid? | Reason |
|---|-------|--------|--------|
| 1 | undefined/empty | No | Required for HoursOnly |
| 2 | 0 | No | Must be > 0 |
| 3 | 0.5 | Yes | Minimum valid (step 0.5) |
| 4 | 1 | Yes | Valid |
| 5 | 8 | Yes | Common value |
| 6 | 12 | Yes | Valid |
| 7 | 24 | Yes | Maximum valid |
| 8 | 24.5 | No | Exceeds max (24) |
| 9 | -1 | No | Negative value |
| 10 | 0.3 | No | Not a valid step (must be 0.5 increments) |

---

#### TC-SHIFT-013: HoursOnly — shift periods must NOT be set
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: HoursOnly
2. Verify shift periods section is hidden or empty

**Expected Results:**
- Shift periods array cleared when switching to HoursOnly
- If periods somehow present, validation error: "HoursOnly shifts should not have periods"
- Period management controls (add/remove) hidden

---

#### TC-SHIFT-014: HoursOnly — isNightShift disabled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: HoursOnly
2. Observe isNightShift checkbox

**Expected Results:**
- isNightShift checkbox is disabled or hidden
- If toggled to true, it auto-resets to false
- Validation error if submitted with isNightShift=true and ShiftType=HoursOnly

---

#### TC-SHIFT-015: HoursOnly — flexible hours and grace period disabled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: HoursOnly
2. Observe allowFlexibleHours toggle
3. Observe gracePeriodMinutes field

**Expected Results:**
- allowFlexibleHours cleared to false
- flexMinutesBefore and flexMinutesAfter cleared
- gracePeriodMinutes cleared
- These fields hidden or disabled for HoursOnly type

---

### C. Conditional Logic

#### TC-SHIFT-016: Flexible hours and grace period are mutually exclusive
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: TimeBased
2. Enable allowFlexibleHours
3. Set flexMinutesBefore=30, flexMinutesAfter=30
4. Observe gracePeriodMinutes field

**Expected Results:**
- gracePeriodMinutes is cleared to undefined
- Grace period field is disabled or hidden
- Validation error if both flexible hours and grace period are set simultaneously

---

#### TC-SHIFT-017: Setting grace period disables flexible hours
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: TimeBased
2. Set gracePeriodMinutes: 15
3. Observe allowFlexibleHours toggle

**Expected Results:**
- allowFlexibleHours reset to false
- flexMinutesBefore and flexMinutesAfter cleared
- Mutual exclusivity maintained

---

#### TC-SHIFT-018: Switching from TimeBased to HoursOnly clears time-based fields
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: TimeBased
2. Add shift periods, enable flexible hours, set grace period
3. Switch ShiftType to HoursOnly
4. Observe all fields

**Expected Results:**
- shiftPeriods array cleared to []
- allowFlexibleHours reset to false
- flexMinutesBefore and flexMinutesAfter cleared
- gracePeriodMinutes cleared
- isNightShift reset to false
- requiredHours defaulted to 8

---

#### TC-SHIFT-019: Switching from HoursOnly to TimeBased clears hours-only fields
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Select ShiftType: HoursOnly
2. Set requiredHours: 10
3. Switch ShiftType to TimeBased
4. Observe fields

**Expected Results:**
- requiredHours cleared to undefined
- Default shift period added (08:00-17:00) if periods array was empty
- Period management controls become visible

---

#### TC-SHIFT-020: requiredWeeklyHours forces core hours to be enabled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Leave hasCoreHours=false
2. Set requiredWeeklyHours: 40
3. Observe hasCoreHours toggle

**Expected Results:**
- hasCoreHours automatically set to true
- coreStart defaulted to "09:00"
- coreEnd defaulted to "15:00"
- Validation error if requiredWeeklyHours > 0 but hasCoreHours is false

---

#### TC-SHIFT-021: Enabling core hours sets defaults, disabling clears them
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Toggle hasCoreHours to true
2. Observe coreStart and coreEnd
3. Toggle hasCoreHours back to false
4. Observe coreStart and coreEnd

**Expected Results:**
- On enable: coreStart defaults to "09:00", coreEnd defaults to "15:00"
- On disable: coreStart cleared to "", coreEnd cleared to ""
- Core hours fields hidden when toggle is off

---

### D. Working Days

#### TC-SHIFT-022: At least one working day required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Uncheck all 7 working day checkboxes (Sun-Sat)
2. Fill all other fields validly
3. Click Submit

**Expected Results:**
- Validation error: at least one working day required
- Form does not submit

---

#### TC-SHIFT-023: Default working days are Mon-Fri
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to /shifts/create
2. Observe default working day checkboxes

**Expected Results:**
- Monday through Friday: checked (true)
- Saturday: unchecked (false)
- Sunday: unchecked (false)
- Working days count displayed as 5

---

#### TC-SHIFT-024: Saudi week configuration (Sun-Thu)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Check: Sunday, Monday, Tuesday, Wednesday, Thursday
2. Uncheck: Friday, Saturday
3. Submit form

**Expected Results:**
- Shift created with 5 working days (Sun-Thu)
- Working days count: 5
- Friday and Saturday marked as off days

---

#### TC-SHIFT-025: Single working day (boundary minimum)
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Uncheck all days
2. Check only Sunday
3. Submit form

**Expected Results:**
- Shift created with 1 working day
- Working days count: 1
- Valid — no minimum count beyond "at least one"

---

#### TC-SHIFT-026: All seven days checked (boundary maximum)
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Check all 7 day checkboxes (Sun through Sat)
2. Submit form

**Expected Results:**
- Shift created with 7 working days
- Working days count: 7
- Valid — no maximum restriction

---

### E. Shift Periods & Advanced Fields

#### TC-SHIFT-027: Shift period start and end time — HH:MM format
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Boundary Tests:**

| # | startTime | endTime | Valid? | Hours | Notes |
|---|-----------|---------|--------|-------|-------|
| 1 | 00:00 | 08:00 | Yes | 8h | Early morning shift |
| 2 | 08:00 | 17:00 | Yes | 9h | Standard day |
| 3 | 22:00 | 06:00 | Yes | 8h | Night shift (crosses midnight) |
| 4 | 08:00 | 08:00 | No | 0h | Same start and end |
| 5 | 23:59 | 00:01 | Yes | 0h 2m | Minimal night crossing |
| 6 | 06:00 | 14:00 | Yes | 8h | Morning shift |

---

#### TC-SHIFT-028: Remove shift period and reorder
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Add 2 periods: Period 1 (08:00-12:00), Period 2 (13:00-17:00)
2. Remove Period 1
3. Observe remaining period

**Expected Results:**
- Only one period remains
- Remaining period reordered to periodOrder=1
- Total hours recalculated from remaining period only

---

#### TC-SHIFT-029: flexMinutesBefore — boundary values
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Preconditions:** ShiftType=TimeBased, allowFlexibleHours=true

**Boundary Tests:**

| # | Value | Valid? | Reason |
|---|-------|--------|--------|
| 1 | 0 | No | Must be >= 1 |
| 2 | 1 | Yes | Minimum valid |
| 3 | 60 | Yes | Common value (1 hour) |
| 4 | 480 | Yes | Maximum valid (8 hours) |
| 5 | 481 | No | Exceeds max (480) |
| 6 | -1 | No | Negative value |

---

#### TC-SHIFT-030: flexMinutesAfter — boundary values
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Preconditions:** ShiftType=TimeBased, allowFlexibleHours=true

**Boundary Tests:**

| # | Value | Valid? | Reason |
|---|-------|--------|--------|
| 1 | 0 | No | Must be >= 1 |
| 2 | 1 | Yes | Minimum valid |
| 3 | 60 | Yes | Common value (1 hour) |
| 4 | 480 | Yes | Maximum valid (8 hours) |
| 5 | 481 | No | Exceeds max (480) |
| 6 | -1 | No | Negative value |

---

#### TC-SHIFT-031: gracePeriodMinutes — boundary values
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Preconditions:** ShiftType=TimeBased, allowFlexibleHours=false

**Boundary Tests:**

| # | Value | Valid? | Reason |
|---|-------|--------|--------|
| 1 | 0 | Yes | No grace period |
| 2 | 1 | Yes | Minimum grace |
| 3 | 15 | Yes | Common value |
| 4 | 120 | Yes | Maximum valid (2 hours) |
| 5 | 121 | No | Exceeds max (120) |
| 6 | -1 | No | Negative value |

---

#### TC-SHIFT-032: requiredWeeklyHours — boundary values
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Boundary |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Boundary Tests:**

| # | Value | Valid? | Reason |
|---|-------|--------|--------|
| 1 | undefined | Yes | Optional field |
| 2 | 0 | No | Must be > 0 if set |
| 3 | 1 | Yes | Minimum valid |
| 4 | 40 | Yes | Standard work week |
| 5 | 168 | Yes | Maximum (24h x 7 days) |
| 6 | 169 | No | Exceeds max (168) |
| 7 | -1 | No | Negative value |

---

#### TC-SHIFT-033: Core hours must be within shift periods (TimeBased)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. ShiftType=TimeBased, period: 08:00-17:00
2. Enable hasCoreHours
3. Set coreStart=07:00, coreEnd=10:00 (core starts before period)
4. Click Submit

**Expected Results:**
- Validation error: core hours are outside shift periods
- Form does not submit
- Error clears when core hours adjusted to fit within 08:00-17:00

---

#### TC-SHIFT-034: Core hours — coreStart and coreEnd cannot be equal
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Enable hasCoreHours
2. Set coreStart=09:00, coreEnd=09:00
3. Submit

**Expected Results:**
- Validation error: core start and end cannot be the same time
- Form does not submit

---

#### TC-SHIFT-035: isCheckInRequired and isAutoCheckOut toggles
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/create |
| **Role** | System Admin |

**Steps:**
1. Default: isCheckInRequired=true, isAutoCheckOut=false
2. Toggle isCheckInRequired to false
3. Toggle isAutoCheckOut to true
4. Submit form

**Expected Results:**
- Both toggles independent for TimeBased shifts
- Shift saved with isCheckInRequired=false, isAutoCheckOut=true
- Settings reflected on view page

---

### F. Shift Assignment

#### TC-SHIFT-036: Assign shift to individual employee
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shifts/assign |
| **Role** | System Admin |

**Preconditions:**
1. At least one active shift exists
2. At least one employee exists

**Steps:**
1. Navigate to /shifts/assign
2. Select a shift from dropdown
3. Set assignmentType: Employee
4. Select an employee
5. Set effectiveDate: today
6. Leave endDate empty (permanent)
7. Set priority: 1
8. Click Submit

**Expected Results:**
- Assignment created successfully
- Assignment appears in list with:
  - assignmentType = Employee
  - employeeName displayed
  - status = Active
  - effectiveDate = today
  - endDate = null (permanent)

---

#### TC-SHIFT-037: Assign shift to department
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shifts/assign |
| **Role** | System Admin |

**Steps:**
1. Select a shift
2. Set assignmentType: Department
3. Select a department
4. Set effectiveDate: today
5. Click Submit

**Expected Results:**
- Assignment created with assignmentType=Department
- All employees in department inherit this shift
- departmentName displayed in assignment list

---

#### TC-SHIFT-038: Assign shift to branch
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shifts/assign |
| **Role** | System Admin |

**Steps:**
1. Select a shift
2. Set assignmentType: Branch
3. Select a branch
4. Set effectiveDate: today
5. Click Submit

**Expected Results:**
- Assignment created with assignmentType=Branch
- All employees in branch inherit this shift (unless overridden)
- branchName displayed in assignment list

---

#### TC-SHIFT-039: Temporary assignment with effectiveDate and endDate
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts/assign |
| **Role** | System Admin |

**Steps:**
1. Create assignment with:
   - effectiveDate: 2026-05-01
   - endDate: 2026-05-31
2. Submit

**Expected Results:**
- Assignment created with bounded date range
- Assignment active only from May 1 to May 31
- After May 31, assignment status transitions to Expired
- Employee reverts to previous/default shift after expiry

---

#### TC-SHIFT-040: Priority system — higher priority wins for overlapping assignments
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shifts/assign |
| **Role** | System Admin |

**Preconditions:**
1. Employee has branch-level assignment (priority=1, Shift A)
2. Employee has department-level assignment (priority=2, Shift B)

**Steps:**
1. Create employee-level assignment (priority=3, Shift C)
2. Check which shift applies to the employee

**Expected Results:**
- Employee uses Shift C (priority=3, highest)
- Priority resolution: Employee (3) > Department (2) > Branch (1)
- When employee assignment is removed/expired, falls back to Department assignment

---

#### TC-SHIFT-041: Assignment — effectiveDate required
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /shifts/assign |
| **Role** | System Admin |

**Steps:**
1. Fill assignment form without effectiveDate
2. Submit

**Expected Results:**
- Validation error: effectiveDate is required
- Form does not submit

---

#### TC-SHIFT-042: Assignment — endDate must be after effectiveDate
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /shifts/assign |
| **Role** | System Admin |

**Steps:**
1. Set effectiveDate: 2026-05-15
2. Set endDate: 2026-05-10 (before effective date)
3. Submit

**Expected Results:**
- Validation error: endDate must be after effectiveDate
- Form does not submit

---

#### TC-SHIFT-043: Assignment — correct target field based on assignmentType
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /shifts/assign |
| **Role** | System Admin |

**Test Matrix:**

| assignmentType | Required Field | Other Fields |
|----------------|---------------|--------------|
| Employee | employeeId required | departmentId, branchId ignored |
| Department | departmentId required | employeeId, branchId ignored |
| Branch | branchId required | employeeId, departmentId ignored |

**Expected Results:**
- Form shows only the relevant selector based on assignmentType
- Validation enforces the correct field is populated
- Irrelevant fields hidden or disabled

---

### G. List & View Pages

#### TC-SHIFT-044: Shift list page — renders with data table
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /shifts |
| **Role** | System Admin |

**Preconditions:**
1. At least 3 shifts exist in the system

**Steps:**
1. Navigate to /shifts

**Expected Results:**
- Page renders with DataTableComponent
- Columns visible: Name, Type, Status, Working Days, Total Hours, Actions
- UnifiedFilterComponent shown with search, refresh, and Add button
- Pagination controls visible
- Shifts load from API and display correctly

---

#### TC-SHIFT-045: Shift list — search filter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /shifts |
| **Role** | System Admin |

**Steps:**
1. Navigate to /shifts
2. Type "Night" in search field
3. Observe filtered results

**Expected Results:**
- List filters to show only shifts whose name contains "Night"
- Clear search restores full list
- Search is case-insensitive

---

#### TC-SHIFT-046: View shift detail page — all fields displayed
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /shifts/:id/view |
| **Role** | System Admin |

**Preconditions:**
1. TimeBased shift exists with periods, core hours, and flexible hours configured

**Steps:**
1. Navigate to /shifts/{id}/view

**Expected Results:**
- All fields displayed using DefinitionListComponent:
  - Name, Description, ShiftType, Status
  - Shift Periods (start/end times, hours per period)
  - Working Days (displayed as badges or checkmarks)
  - Total Hours calculated
  - Flexible Hours (before/after minutes)
  - Core Hours (start/end)
  - Required Weekly Hours
  - isCheckInRequired, isAutoCheckOut, isNightShift
  - Created/Modified timestamps and users
- StatusBadgeComponent used for status display
- FormHeaderComponent with back navigation

---

#### TC-SHIFT-047: View shift — HoursOnly displays requiredHours instead of periods
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /shifts/:id/view |
| **Role** | System Admin |

**Preconditions:**
1. HoursOnly shift exists

**Steps:**
1. Navigate to /shifts/{id}/view for HoursOnly shift

**Expected Results:**
- requiredHours displayed prominently
- Shift periods section hidden or shows "N/A"
- Flexible hours and grace period sections hidden or show "N/A"
- isNightShift shows false/disabled

---

### H. Delete & Edit Constraints

#### TC-SHIFT-048: Edit shift — pre-populates all fields correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /shifts/:id/edit |
| **Role** | System Admin |

**Preconditions:**
1. TimeBased shift exists with all fields populated

**Steps:**
1. Navigate to /shifts/{id}/edit
2. Verify all fields are pre-populated

**Expected Results:**
- Name, description pre-filled
- ShiftType radio correct
- Shift periods loaded with correct times and order
- Working day checkboxes match saved state
- Flexible hours, grace period, core hours match saved state
- isCheckInRequired, isAutoCheckOut, isNightShift toggles correct
- All conditional visibility rules still apply (e.g., flex hides grace)

---

#### TC-SHIFT-049: Delete shift — confirmation required
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /shifts |
| **Role** | System Admin |

**Steps:**
1. Navigate to /shifts
2. Click delete action on a shift
3. Confirmation dialog appears
4. Click Cancel

**Expected Results:**
- Confirmation dialog shown via ConfirmationService
- On Cancel: shift not deleted, list unchanged
- On Confirm: shift deleted, removed from list
- Success notification displayed after deletion

---

#### TC-SHIFT-050: Delete shift — blocked if active assignments exist
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /shifts |
| **Role** | System Admin |

**Preconditions:**
1. Shift has active assignments (employees, departments, or branches)

**Steps:**
1. Attempt to delete the shift

**Expected Results:**
- API returns error: cannot delete shift with active assignments
- Error notification displayed
- Shift remains in list
- User must remove or reassign all assignments first

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Shift Form (TimeBased) | 10 | 3 | 6 | 1 |
| B. Shift Form (HoursOnly) | 5 | 2 | 3 | 0 |
| C. Conditional Logic | 6 | 2 | 4 | 0 |
| D. Working Days | 5 | 1 | 2 | 2 |
| E. Shift Periods & Advanced | 9 | 0 | 7 | 2 |
| F. Shift Assignment | 8 | 3 | 4 | 1 |
| G. List & View Pages | 4 | 2 | 2 | 0 |
| H. Delete & Edit Constraints | 3 | 2 | 1 | 0 |
| **TOTAL** | **50** | **15** | **29** | **6** |
