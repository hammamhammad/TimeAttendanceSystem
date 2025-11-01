# Public Holiday Management Tests

## Overview
This test suite covers public holiday configuration, recurrence patterns, branch-specific holidays, and integration with attendance and overtime calculations.

---

## Test Case HOL-001: Create One-Time Public Holiday

**Priority:** High
**Type:** Functional
**Module:** Holiday Management

### Description
Verify that one-time public holidays can be created for specific dates.

### Preconditions
- User with admin permission logged in
- No duplicate holiday for same date

### Test Steps
1. Send POST request to `/api/v1/public-holidays`:
   ```json
   {
     "name": "National Day",
     "nameAr": "اليوم الوطني",
     "date": "2024-10-06",
     "recurrenceType": "None",
     "isActive": true,
     "appliesTo": "AllBranches"
   }
   ```
2. Verify holiday created

### Expected Results
- HTTP Status Code: 201 Created
- PublicHoliday record created
- RecurrenceType = "None" (one-time)
- AppliesTo = "AllBranches"
- Date = 2024-10-06
- Holiday available for all branches
- Impacts overtime calculation and vacation working days

---

## Test Case HOL-002: Create Annually Recurring Holiday

**Priority:** High
**Type:** Functional
**Module:** Holiday Management

### Description
Verify that annually recurring holidays are created and repeat each year.

### Preconditions
- Admin logged in

### Test Steps
1. Create recurring holiday:
   ```json
   {
     "name": "New Year's Day",
     "date": "2024-01-01",
     "recurrenceType": "Annual",
     "isActive": true
   }
   ```
2. Query holidays for 2024-01-01
3. Query holidays for 2025-01-01
4. Query holidays for 2026-01-01

### Expected Results
- Holiday created with RecurrenceType = "Annual"
- Holiday applies to:
  - Jan 1, 2024
  - Jan 1, 2025
  - Jan 1, 2026
  - Every subsequent year
- System automatically recognizes recurrence
- No need to create separate entries for each year

---

## Test Case HOL-003: Create Monthly Recurring Holiday

**Priority:** Medium
**Type:** Functional
**Module:** Holiday Management

### Description
Verify that monthly recurring holidays work correctly.

### Preconditions
- Admin logged in

### Test Steps
1. Create monthly holiday:
   ```json
   {
     "name": "Monthly Company Day",
     "date": "2024-02-15",
     "recurrenceType": "Monthly",
     "isActive": true
   }
   ```
2. Verify recurrence for multiple months

### Expected Results
- Holiday repeats on 15th of every month:
  - Feb 15, 2024
  - Mar 15, 2024
  - Apr 15, 2024
  - Etc.
- Useful for special monthly closures
- Affects working days calculation

---

## Test Case HOL-004: Create Branch-Specific Holiday

**Priority:** Medium
**Type:** Functional
**Module:** Holiday Management

### Description
Verify that holidays can be configured for specific branches only.

### Preconditions
- Multiple branches exist: Cairo (ID: 1), Alexandria (ID: 2)
- Admin logged in

### Test Steps
1. Create branch-specific holiday:
   ```json
   {
     "name": "Alexandria Governorate Day",
     "date": "2024-03-15",
     "recurrenceType": "Annual",
     "branchId": 2,
     "appliesTo": "SpecificBranch",
     "isActive": true
   }
   ```
2. Query holidays for Cairo employees
3. Query holidays for Alexandria employees

### Expected Results
- Holiday created for Branch 2 only
- Cairo employees (Branch 1):
  - March 15 is normal working day
  - No holiday recognized
- Alexandria employees (Branch 2):
  - March 15 is public holiday
  - No attendance required
  - Overtime rates apply if they work
- Multi-branch support for regional holidays

---

## Test Case HOL-005: Holiday Impact on Working Days Calculation

**Priority:** High
**Type:** Integration
**Module:** Holiday Management

### Description
Verify that public holidays are excluded from working days calculation for vacations and remote work.

### Preconditions
- Public holiday: Feb 14, 2024
- Employee creates vacation request: Feb 12-16 (Mon-Fri)

### Test Steps
1. Create vacation request for Feb 12-16
2. Verify working days calculation
3. Verify vacation balance deduction

### Expected Results
- Total days: 5 (Mon-Fri)
- Weekend days: 0
- Holidays: 1 (Feb 14)
- Working days: 4
- Vacation balance deducted: 4 days (not 5)
- Holiday day not counted against vacation
- Employee gets holiday for free

---

## Test Case HOL-006: Holiday Impact on Overtime Rate

**Priority:** High
**Type:** Integration
**Module:** Holiday Management

### Description
Verify that working on public holidays uses higher overtime rate.

### Preconditions
- Public holiday: Feb 14, 2024
- Employee assigned to work
- Overtime configuration: Holiday rate = 2.5x

### Test Steps
1. Employee clocks in on Feb 14
2. Works 8 hours
3. Calculate overtime

### Expected Results
- All hours on holiday = overtime
- Overtime hours: 8.0
- Overtime rate: 2.5x
- Higher compensation for holiday work
- Attendance record flagged as "Holiday Work"

---

## Test Case HOL-007: Update Holiday Details

**Priority:** Medium
**Type:** Functional
**Module:** Holiday Management

### Description
Verify that holiday details can be updated.

### Preconditions
- Holiday exists (ID: 10)
- Admin logged in

### Test Steps
1. PUT `/api/v1/public-holidays/10`:
   ```json
   {
     "name": "Updated Holiday Name",
     "date": "2024-05-15",
     "isActive": true
   }
   ```
2. Verify update

### Expected Results
- HTTP Status Code: 200 OK
- Holiday name updated
- Date updated (if allowed)
- Changes affect future calculations
- Historical attendance unchanged

---

## Test Case HOL-008: Deactivate Holiday

**Priority:** Medium
**Type:** Functional
**Module:** Holiday Management

### Description
Verify that holidays can be deactivated instead of deleted.

### Preconditions
- Holiday exists (ID: 12, IsActive = true)
- Admin logged in

### Test Steps
1. PUT `/api/v1/public-holidays/12`:
   ```json
   {
     "isActive": false
   }
   ```
2. Verify deactivation
3. Check working days calculation

### Expected Results
- IsActive = false
- Holiday no longer recognized in calculations
- Not deleted (preserved for historical data)
- Working days calculation excludes deactivated holidays
- Attendance and overtime calculations treat it as normal day

---

## Test Case HOL-009: Delete Unused Holiday

**Priority:** Low
**Type:** Functional
**Module:** Holiday Management

### Description
Verify that holidays with no dependencies can be deleted.

### Preconditions
- Holiday exists (ID: 15)
- No attendance records reference this holiday
- No vacation requests overlap
- Admin logged in

### Test Steps
1. DELETE `/api/v1/public-holidays/15`
2. Verify deletion

### Expected Results
- HTTP Status Code: 204 No Content
- Holiday deleted from database
- No orphaned references
- If holiday has dependencies:
  - Deletion blocked
  - Error: "Cannot delete holiday - referenced by attendance records"
  - Suggest deactivation instead

---

## Test Case HOL-010: Holiday Calendar View

**Priority:** Low
**Type:** Functional
**Module:** Holiday Management - Frontend

### Description
Verify that admin can view holidays in calendar format.

### Preconditions
- 10 holidays configured for 2024
- Admin logged in to frontend

### Test Steps
1. Navigate to `/admin/holidays`
2. View calendar/list display
3. Filter by branch
4. Filter by recurrence type

### Expected Results
- Calendar view shows all holidays
- Color-coded by type:
  - One-time: blue
  - Annual: green
  - Monthly: yellow
- Branch filter shows relevant holidays
- List view with columns:
  - Date
  - Name (bilingual)
  - Recurrence type
  - Applies to (branch)
  - Status (active/inactive)
- Actions: Edit, Delete, Deactivate
- Export to CSV/PDF capability

---

## Test Execution Notes

### Test Data Requirements
- Multiple holidays with different recurrence types
- Branch-specific and organization-wide holidays
- Test dates spanning multiple years

### Environment Setup
- Backend: http://localhost:5099
- Frontend admin panel
- Database with seed holidays
- Multiple branches configured

### Dependencies
- Attendance system
- Vacation management
- Overtime calculation
- Remote work requests
- Branch management

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| HOL-001 | One-Time Holiday | High | ⬜ Not Run |
| HOL-002 | Annual Recurrence | High | ⬜ Not Run |
| HOL-003 | Monthly Recurrence | Medium | ⬜ Not Run |
| HOL-004 | Branch-Specific | Medium | ⬜ Not Run |
| HOL-005 | Working Days Impact | High | ⬜ Not Run |
| HOL-006 | Overtime Impact | High | ⬜ Not Run |
| HOL-007 | Update Holiday | Medium | ⬜ Not Run |
| HOL-008 | Deactivate Holiday | Medium | ⬜ Not Run |
| HOL-009 | Delete Holiday | Low | ⬜ Not Run |
| HOL-010 | Calendar View | Low | ⬜ Not Run |
