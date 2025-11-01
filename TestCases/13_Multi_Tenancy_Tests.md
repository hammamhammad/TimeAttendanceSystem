# Multi-Tenancy Tests

## Overview
This test suite covers branch-level data isolation, cross-branch access prevention, user branch scoping, and multi-tenant security.

---

## Test Case MT-001: Branch Data Isolation for Employees

**Priority:** High
**Type:** Security
**Module:** Multi-Tenancy

### Description
Verify that employees from one branch cannot access data from other branches.

### Preconditions
- Branch 1 (Cairo): 10 employees
- Branch 2 (Alexandria): 8 employees
- User A: Manager at Branch 1
- User B: Manager at Branch 2

### Test Steps
1. Login as User A (Branch 1)
2. GET `/api/v1/employees`
3. Observe returned employees
4. Login as User B (Branch 2)
5. GET `/api/v1/employees`
6. Compare results

### Expected Results
- User A sees:
  - 10 employees from Branch 1 only
  - No employees from Branch 2
- User B sees:
  - 8 employees from Branch 2 only
  - No employees from Branch 1
- Data isolation enforced at query level
- UserBranchScope table controls access
- No cross-branch data leakage

---

## Test Case MT-002: Cross-Branch Access Prevention

**Priority:** High
**Type:** Security
**Module:** Multi-Tenancy

### Description
Verify that direct access to resources from other branches is blocked.

### Preconditions
- Employee X belongs to Branch 1 (ID: 100)
- User A has access to Branch 1 only
- User B has access to Branch 2 only

### Test Steps
1. Login as User B (Branch 2 manager)
2. Attempt to access Employee X directly:
   - GET `/api/v1/employees/100`
3. Attempt to update Employee X:
   - PUT `/api/v1/employees/100`
4. Observe responses

### Expected Results
- Step 2:
  - HTTP Status Code: 404 Not Found OR 403 Forbidden
  - Error: "Resource not found" or "Access denied"
  - Employee X not visible to User B
- Step 3:
  - HTTP Status Code: 404 Not Found OR 403 Forbidden
  - No modification allowed
- Branch scope filter applied automatically
- Security at data access layer

---

## Test Case MT-003: Multi-Branch User Access

**Priority:** High
**Type:** Functional
**Module:** Multi-Tenancy

### Description
Verify that users assigned to multiple branches can access data from all assigned branches.

### Preconditions
- User C assigned to Branch 1 and Branch 2
- Branch 1: 10 employees
- Branch 2: 8 employees

### Test Steps
1. Login as User C
2. GET `/api/v1/employees`
3. Verify employee count
4. Check UserBranchScope for User C

### Expected Results
- UserBranchScope contains 2 records:
  - User C → Branch 1
  - User C → Branch 2
- Employee query returns 18 employees (10 + 8)
- Data from both branches visible
- Multi-branch access controlled via UserBranchScope

---

## Test Case MT-004: Branch Scoping for Attendance Records

**Priority:** High
**Type:** Security
**Module:** Multi-Tenancy

### Description
Verify that attendance records are scoped by branch.

### Preconditions
- Branch 1: 10 employees with attendance records
- Branch 2: 8 employees with attendance records
- User A: Branch 1 access only

### Test Steps
1. Login as User A
2. GET `/api/v1/attendance`
3. Verify returned records
4. Attempt to access attendance for Branch 2 employee

### Expected Results
- Step 2:
  - Returns only attendance for Branch 1 employees
  - 10 employees' attendance visible
- Step 4:
  - HTTP Status Code: 404 Not Found
  - Cannot access Branch 2 attendance
- Branch scoping applied to all queries
- Joins and filters respect branch scope

---

## Test Case MT-005: Branch Scoping for Vacation Requests

**Priority:** High
**Type:** Security
**Module:** Multi-Tenancy

### Description
Verify that vacation requests are scoped by employee's branch.

### Preconditions
- Employee A (Branch 1): 3 vacation requests
- Employee B (Branch 2): 2 vacation requests
- User manages Branch 1 only

### Test Steps
1. Login as Branch 1 manager
2. GET `/api/v1/vacations?status=Pending`
3. Verify only Branch 1 requests visible
4. Attempt to approve Branch 2 vacation request

### Expected Results
- Pending requests: 3 (from Branch 1 only)
- No Branch 2 requests visible
- Attempt to approve Branch 2 request:
  - HTTP Status Code: 404 Not Found
  - Cannot approve cross-branch requests
- Approval authority scoped by branch

---

## Test Case MT-006: Branch-Specific Configuration Isolation

**Priority:** Medium
**Type:** Functional
**Module:** Multi-Tenancy

### Description
Verify that branch-specific configurations (shifts, holidays, policies) are isolated.

### Preconditions
- Branch 1: Default shift 09:00-17:00
- Branch 2: Default shift 08:00-16:00
- Branch 1: Holiday on Feb 15
- Branch 2: No holiday on Feb 15

### Test Steps
1. Query shifts for Branch 1 employees
2. Query shifts for Branch 2 employees
3. Check holiday calendar for both branches

### Expected Results
- Branch 1 employees:
  - Default shift: 09:00-17:00
  - Feb 15 is holiday
- Branch 2 employees:
  - Default shift: 08:00-16:00
  - Feb 15 is normal working day
- Configuration isolation per branch
- Supports multi-location operations

---

## Test Case MT-007: SystemAdmin Unrestricted Access

**Priority:** High
**Type:** Functional
**Module:** Multi-Tenancy

### Description
Verify that SystemAdmin role bypasses branch scoping and has access to all branches.

### Preconditions
- User D: SystemAdmin role
- 3 branches exist with data

### Test Steps
1. Login as SystemAdmin
2. GET `/api/v1/employees`
3. GET `/api/v1/attendance`
4. Verify data from all branches

### Expected Results
- SystemAdmin sees data from all 3 branches
- No branch scoping applied
- Total employees: sum of all branches
- SystemAdmin role has global access
- Used for system-wide administration
- UserBranchScope ignored for SystemAdmin

---

## Test Case MT-008: Branch Assignment Validation

**Priority:** Medium
**Type:** Functional
**Module:** Multi-Tenancy

### Description
Verify that users cannot be assigned to non-existent branches.

### Preconditions
- Valid branches: 1, 2, 3
- User E exists

### Test Steps
1. Attempt to assign User E to Branch 99 (doesn't exist):
   ```json
   POST /api/v1/users/{user-id}/branches
   {
     "branchIds": [99]
   }
   ```

### Expected Results
- HTTP Status Code: 400 Bad Request
- Error: "Branch ID 99 does not exist"
- No UserBranchScope created
- Referential integrity enforced
- Foreign key constraint validated

---

## Test Case MT-009: Reports Scoped by Branch

**Priority:** High
**Type:** Functional
**Module:** Multi-Tenancy

### Description
Verify that reports and dashboards respect branch scoping.

### Preconditions
- User F: Branch 1 access
- Attendance data exists for all branches

### Test Steps
1. Login as User F
2. Access dashboard: GET `/api/v1/dashboard/overview`
3. Generate monthly report: GET `/api/v1/reports/monthly-attendance?month=2024-02`
4. Verify data scope

### Expected Results
- Dashboard shows:
  - Employee count: Branch 1 only
  - Attendance statistics: Branch 1 only
  - Pending requests: Branch 1 only
- Monthly report:
  - Contains Branch 1 employees only
  - Summary aggregates for Branch 1
  - No data from other branches
- Report exports (PDF/Excel) scoped correctly

---

## Test Case MT-010: Branch Transfer Data Migration

**Priority:** Medium
**Type:** Functional
**Module:** Multi-Tenancy

### Description
Verify that transferring employees between branches maintains data integrity.

### Preconditions
- Employee X: Branch 1, 6 months of attendance data
- Branch 2 exists

### Test Steps
1. Transfer Employee X to Branch 2:
   ```json
   PUT /api/v1/employees/{employee-x-id}
   {
     "branchId": 2
   }
   ```
2. Login as Branch 1 manager
3. Query employees
4. Login as Branch 2 manager
5. Query employees
6. Check historical attendance data

### Expected Results
- Step 3:
  - Employee X not visible to Branch 1 manager
  - Moved to Branch 2
- Step 5:
  - Employee X now visible to Branch 2 manager
- Historical data:
  - Attendance records remain
  - Associated with original branch at time of record
  - Or moved to new branch (policy dependent)
- Data migration handled correctly
- No orphaned records

---

## Test Execution Notes

### Test Data Requirements
- Multiple branches (at least 3)
- Users with different branch assignments
- Employees across different branches
- Attendance, vacation, and request data
- SystemAdmin account

### Environment Setup
- Backend: http://localhost:5099
- Database with multi-branch seed data
- UserBranchScope properly configured
- Test user accounts for each branch

### Dependencies
- UserBranchScope table
- Branch entity
- Authorization middleware
- Query filters

### Security Considerations
- Test for SQL injection via branch IDs
- Test for parameter tampering
- Test for authorization bypass attempts

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| MT-001 | Employee Isolation | High | ⬜ Not Run |
| MT-002 | Cross-Branch Prevention | High | ⬜ Not Run |
| MT-003 | Multi-Branch Access | High | ⬜ Not Run |
| MT-004 | Attendance Scoping | High | ⬜ Not Run |
| MT-005 | Vacation Scoping | High | ⬜ Not Run |
| MT-006 | Config Isolation | Medium | ⬜ Not Run |
| MT-007 | SystemAdmin Access | High | ⬜ Not Run |
| MT-008 | Assignment Validation | Medium | ⬜ Not Run |
| MT-009 | Report Scoping | High | ⬜ Not Run |
| MT-010 | Branch Transfer | Medium | ⬜ Not Run |
