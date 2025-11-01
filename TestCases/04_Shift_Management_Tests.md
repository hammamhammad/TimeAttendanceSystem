# Shift Management Tests

## Overview
This test suite covers shift CRUD operations, shift periods, shift assignments at multiple levels (Employee/Department/Branch), and shift resolution hierarchy.

---

## Test Case SHIFT-001: Create Standard Shift

**Priority:** High
**Type:** Functional
**Module:** Shift Management

### Description
Verify that a standard shift with single time period can be created successfully.

### Preconditions
- User with "Shift.Create" permission is logged in
- No duplicate shift code exists

### Test Steps
1. Send POST request to `/api/v1/shifts`:
   ```json
   {
     "code": "SHIFT001",
     "name": "Morning Shift",
     "nameAr": "وردية الصباح",
     "shiftType": "TimeBased",
     "isNightShift": false,
     "totalHours": 8.0,
     "gracePeriodMinutes": 15,
     "breakDurationMinutes": 60,
     "isActive": true,
     "periods": [
       {
         "startTime": "09:00:00",
         "endTime": "17:00:00",
         "durationHours": 8.0,
         "isCoreHours": true
       }
     ]
   }
   ```
2. Observe response
3. Verify shift exists in database

### Expected Results
- HTTP Status Code: 201 Created
- Response contains shift ID
- Shift saved with all properties
- One ShiftPeriod record created
- TotalHours = 8.0
- GracePeriod = 15 minutes
- BreakDuration = 60 minutes
- Can retrieve shift via GET request

---

## Test Case SHIFT-002: Create Night Shift Spanning Midnight

**Priority:** High
**Type:** Functional
**Module:** Shift Management

### Description
Verify that night shifts crossing midnight are handled correctly.

### Preconditions
- User with create permission is logged in

### Test Steps
1. Send POST request to `/api/v1/shifts`:
   ```json
   {
     "code": "NIGHT001",
     "name": "Night Shift",
     "shiftType": "TimeBased",
     "isNightShift": true,
     "totalHours": 8.0,
     "gracePeriodMinutes": 15,
     "periods": [
       {
         "startTime": "22:00:00",
         "endTime": "06:00:00",
         "durationHours": 8.0,
         "isCoreHours": true
       }
     ]
   }
   ```
2. Create attendance transaction at 22:30 (day 1)
3. Create clock-out transaction at 05:30 (day 2)
4. Verify attendance calculation

### Expected Results
- Shift created successfully
- IsNightShift = true
- Period EndTime < StartTime indicates midnight crossing
- Attendance calculation:
  - Clock in on Day 1, clock out on Day 2
  - Total hours calculated correctly (7 hours)
  - Attendance record associated with shift start date (Day 1)
- Overtime rate for night shift may differ (if configured)

---

## Test Case SHIFT-003: Create Multi-Period Shift

**Priority:** Medium
**Type:** Functional
**Module:** Shift Management

### Description
Verify that shifts with multiple time periods (split shifts) can be created.

### Preconditions
- User with create permission is logged in

### Test Steps
1. Send POST request to `/api/v1/shifts`:
   ```json
   {
     "code": "SPLIT001",
     "name": "Split Shift",
     "shiftType": "TimeBased",
     "totalHours": 8.0,
     "periods": [
       {
         "startTime": "09:00:00",
         "endTime": "13:00:00",
         "durationHours": 4.0,
         "isCoreHours": true
       },
       {
         "startTime": "17:00:00",
         "endTime": "21:00:00",
         "durationHours": 4.0,
         "isCoreHours": true
       }
     ]
   }
   ```
2. Verify shift creation
3. Test attendance with clock-in during both periods

### Expected Results
- Shift created with 2 ShiftPeriod records
- TotalHours = 8.0 (sum of both periods)
- Both periods marked as core hours
- Attendance calculation:
  - Clock in at 09:00, out at 13:00 (Period 1)
  - Clock in at 17:00, out at 21:00 (Period 2)
  - Total worked hours = 8.0
  - Status = Present (if both periods attended)

---

## Test Case SHIFT-004: Shift Assignment at Employee Level

**Priority:** High
**Type:** Functional
**Module:** Shift Management

### Description
Verify that shifts can be assigned directly to individual employees.

### Preconditions
- Shift exists (ID: 5)
- Employee exists (ID: 10)
- User with assignment permission is logged in

### Test Steps
1. Send POST request to `/api/v1/shift-assignments`:
   ```json
   {
     "shiftId": 5,
     "assignmentLevel": "Employee",
     "employeeId": 10,
     "effectiveDate": "2024-02-01",
     "isDefault": true,
     "isActive": true
   }
   ```
2. Verify assignment created
3. Query shift for employee on 2024-02-01
4. Check attendance record uses assigned shift

### Expected Results
- HTTP Status Code: 201 Created
- ShiftAssignment record created with:
  - AssignmentLevel = "Employee"
  - EmployeeId = 10
  - Priority = highest (employee-level)
- Step 3:
  - Returns assigned shift (ID: 5)
  - Effective from 2024-02-01 onwards
- Attendance records after 2024-02-01 use this shift
- Employee-level assignment takes precedence over department/branch

---

## Test Case SHIFT-005: Shift Assignment at Department Level

**Priority:** High
**Type:** Functional
**Module:** Shift Management

### Description
Verify that shifts can be assigned to entire departments.

### Preconditions
- Shift exists (ID: 3)
- Department exists (ID: 2) with 5 employees
- User with assignment permission is logged in

### Test Steps
1. Send POST request to `/api/v1/shift-assignments`:
   ```json
   {
     "shiftId": 3,
     "assignmentLevel": "Department",
     "departmentId": 2,
     "effectiveDate": "2024-03-01",
     "isActive": true
   }
   ```
2. Verify assignment
3. Query shifts for all 5 employees in department
4. Verify all receive department shift

### Expected Results
- ShiftAssignment created at department level
- All employees in Department 2 inherit this shift
- Effective from 2024-03-01
- Priority: Medium (below employee-level, above branch-level)
- If employee has individual shift assignment, that takes precedence

---

## Test Case SHIFT-006: Shift Assignment at Branch Level

**Priority:** Medium
**Type:** Functional
**Module:** Shift Management

### Description
Verify that shifts can be assigned to entire branches (organization-wide default).

### Preconditions
- Shift exists (ID: 1) - "Standard 9-5"
- Branch exists (ID: 1) with multiple departments
- User with assignment permission is logged in

### Test Steps
1. Send POST request to `/api/v1/shift-assignments`:
   ```json
   {
     "shiftId": 1,
     "assignmentLevel": "Branch",
     "branchId": 1,
     "effectiveDate": "2024-01-01",
     "isActive": true
   }
   ```
2. Verify assignment
3. Query shift for employees with no employee/department assignments

### Expected Results
- Branch-level assignment created
- All employees in Branch 1 without specific assignments inherit this shift
- Priority: Lowest (fallback default)
- Shift resolution hierarchy: Employee > Department > Branch
- Provides organization-wide default

---

## Test Case SHIFT-007: Shift Assignment Priority Resolution

**Priority:** High
**Type:** Functional
**Module:** Shift Management

### Description
Verify that shift resolution follows correct priority hierarchy.

### Preconditions
- Employee ID: 10, Department: 2, Branch: 1
- Branch-level shift assignment: Shift A
- Department-level shift assignment: Shift B
- Employee-level shift assignment: Shift C
- All assignments active and overlapping dates

### Test Steps
1. Query shift for employee 10 on specific date
2. Remove employee-level assignment
3. Query shift again
4. Remove department-level assignment
5. Query shift again

### Expected Results
- Step 1:
  - Returns Shift C (employee-level)
  - Highest priority
- Step 3:
  - Returns Shift B (department-level)
  - Employee assignment removed, next priority applies
- Step 5:
  - Returns Shift A (branch-level)
  - Fallback to organization default
- Resolution algorithm: Employee → Department → Branch → Null

---

## Test Case SHIFT-008: Effective Date Shift Transitions

**Priority:** Medium
**Type:** Functional
**Module:** Shift Management

### Description
Verify that shift assignments respect effective dates for future changes.

### Preconditions
- Employee exists (ID: 15)
- Current date: 2024-02-01
- Shift A exists, Shift B exists

### Test Steps
1. Create shift assignment:
   ```json
   {
     "shiftId": "A",
     "employeeId": 15,
     "effectiveDate": "2024-02-01"
   }
   ```
2. Create future shift assignment:
   ```json
   {
     "shiftId": "B",
     "employeeId": 15,
     "effectiveDate": "2024-03-01"
   }
   ```
3. Query shift for employee on 2024-02-15
4. Query shift for employee on 2024-03-05
5. Verify attendance uses correct shift

### Expected Results
- Both assignments created successfully
- Step 3:
  - Returns Shift A
  - Effective date 2024-02-01 applies
- Step 4:
  - Returns Shift B
  - Effective date 2024-03-01 applies
- Attendance records:
  - February dates use Shift A
  - March dates use Shift B
- Automatic shift transition on effective date

---

## Test Case SHIFT-009: Update Shift Configuration

**Priority:** Medium
**Type:** Functional
**Module:** Shift Management

### Description
Verify that shift configurations can be updated and changes apply to future attendance.

### Preconditions
- Shift exists (ID: 7) with 8-hour duration
- Employees assigned to this shift
- Historical attendance exists

### Test Steps
1. GET `/api/v1/shifts/7` (current state)
2. PUT `/api/v1/shifts/7`:
   ```json
   {
     "totalHours": 9.0,
     "gracePeriodMinutes": 30,
     "periods": [
       {
         "startTime": "09:00:00",
         "endTime": "18:00:00",
         "durationHours": 9.0
       }
     ]
   }
   ```
3. Verify shift updated
4. Check historical attendance (unchanged)
5. Create new attendance with updated shift

### Expected Results
- Shift updated successfully
- TotalHours changed from 8.0 to 9.0
- GracePeriod changed from 15 to 30 minutes
- Historical attendance:
  - Remains unchanged
  - Calculated with old shift parameters
- New attendance (after update):
  - Uses updated 9-hour shift
  - 30-minute grace period applies
- Audit log records shift modification

---

## Test Case SHIFT-010: Shift Deletion and Active Status

**Priority:** Medium
**Type:** Functional
**Module:** Shift Management

### Description
Verify that shifts cannot be hard-deleted if in use, only deactivated.

### Preconditions
- Shift exists (ID: 12)
- 5 employees assigned to this shift
- Attendance records exist using this shift
- User with delete permission is logged in

### Test Steps
1. DELETE `/api/v1/shifts/12`
2. Verify response
3. Check shift status in database
4. Verify employee shift assignments still exist
5. Create shift with no assignments
6. Delete unused shift

### Expected Results
- Step 1:
  - HTTP Status Code: 400 Bad Request OR 200 OK
  - Error: "Cannot delete shift with existing assignments" OR soft delete
- Step 3:
  - Shift still exists in database
  - IsActive = false (if soft delete implemented)
  - All data preserved
- Step 4:
  - ShiftAssignments remain active
  - Employees continue using shift
- Step 6 (unused shift):
  - Deletion allowed
  - HTTP Status Code: 204 No Content
  - Or soft delete with IsActive = false

---

## Test Execution Notes

### Test Data Requirements
- Multiple shifts: standard, night, split shifts
- Employees across different departments and branches
- Existing shift assignments at all levels
- Historical attendance data

### Environment Setup
- Backend running on http://localhost:5099
- Database with seed data
- User with all shift management permissions

### Dependencies
- Employee, Department, Branch entities
- Attendance system for verification
- Time calculation engine

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| SHIFT-001 | Create Standard Shift | High | ⬜ Not Run |
| SHIFT-002 | Night Shift | High | ⬜ Not Run |
| SHIFT-003 | Multi-Period Shift | Medium | ⬜ Not Run |
| SHIFT-004 | Employee Assignment | High | ⬜ Not Run |
| SHIFT-005 | Department Assignment | High | ⬜ Not Run |
| SHIFT-006 | Branch Assignment | Medium | ⬜ Not Run |
| SHIFT-007 | Priority Resolution | High | ⬜ Not Run |
| SHIFT-008 | Effective Dates | Medium | ⬜ Not Run |
| SHIFT-009 | Update Shift | Medium | ⬜ Not Run |
| SHIFT-010 | Delete/Deactivate | Medium | ⬜ Not Run |
