# Authorization Tests

## Overview
This test suite covers role-based access control (RBAC), permission enforcement, branch scoping, and multi-tenant data isolation.

---

## Test Case AUTHZ-001: Role-Based Permission Enforcement

**Priority:** High
**Type:** Functional
**Module:** Authorization

### Description
Verify that users can only access resources permitted by their assigned roles.

### Preconditions
- Employee exists:
  - Code: EMP001
  - Name: John Doe
  - Branch: Cairo (ID: 1)
- User account linked to employee:
  - Username: john.doe
  - Password: Test@123456
  - Role: Employee (read-only permissions)
  - EmployeeUserLink: Active
- User is logged in with valid access token
- Database contains test data for employees

### Test Steps
1. Login as john.doe
2. Send GET request to `/api/v1/employees` (read permission)
3. Send POST request to `/api/v1/employees` to create new employee (write permission)
4. Observe both responses

### Expected Results
- Step 2 (Read):
  - HTTP Status Code: 200 OK
  - Returns list of employees (only from Branch 1 due to scoping)
  - Employee role has "Employee.Read" permission
- Step 3 (Create):
  - HTTP Status Code: 403 Forbidden
  - Error message: "Insufficient permissions to perform this action"
  - Required permission: "Employee.Create"
  - Employee role does not have create permission
- Authorization middleware checks token claims for permissions

---

## Test Case AUTHZ-002: System Admin Role Full Access

**Priority:** High
**Type:** Functional
**Module:** Authorization

### Description
Verify that SystemAdmin role has unrestricted access to all system resources.

### Preconditions
- User account exists with role "SystemAdmin" (username: systemadmin, password: TempP@ssw0rd123!)
- User is logged in
- System has various protected endpoints

### Test Steps
1. Login as systemadmin with password TempP@ssw0rd123!
2. Send requests to all protected endpoints:
   - GET/POST/PUT/DELETE `/api/v1/users`
   - GET/POST/PUT/DELETE `/api/v1/employees`
   - GET/POST/PUT/DELETE `/api/v1/roles`
   - POST `/api/v1/attendance/bulk-calculate`
   - GET `/api/v1/audit-logs`
3. Observe all responses

### Expected Results
- All requests return successful status codes (200, 201, 204)
- No 403 Forbidden responses
- SystemAdmin role contains all permissions
- Can access admin-only endpoints like audit logs
- Can perform destructive operations (delete)
- No branch scoping restrictions applied

---

## Test Case AUTHZ-003: Branch Scoping Data Isolation

**Priority:** High
**Type:** Security
**Module:** Authorization - Multi-Tenancy

### Description
Verify that users can only access data from branches they are assigned to.

### Preconditions
- User "ManagerA" exists with access to Branch ID: 1 (Cairo)
- User "ManagerB" exists with access to Branch ID: 2 (Alexandria)
- Employees exist in both branches
- Both users have "Manager" role

### Test Steps
1. Login as ManagerA
2. Send GET request to `/api/v1/employees`
3. Observe returned employee list
4. Login as ManagerB
5. Send GET request to `/api/v1/employees`
6. Compare results from both managers
7. Attempt cross-branch access by ManagerA:
   - GET `/api/v1/employees/{employee-id-from-branch-2}`

### Expected Results
- ManagerA sees only employees from Branch 1 (Cairo)
- ManagerB sees only employees from Branch 2 (Alexandria)
- No overlap in employee data
- Step 7 (cross-branch access):
  - HTTP Status Code: 404 Not Found OR 403 Forbidden
  - Error: "Resource not found" or "Access denied"
- UserBranchScope table enforces isolation
- Query filters automatically apply branch scoping

---

## Test Case AUTHZ-004: Permission Hierarchy and Inheritance

**Priority:** Medium
**Type:** Functional
**Module:** Authorization

### Description
Verify that permissions are correctly inherited through role assignments.

### Preconditions
- Role "HR Manager" exists with permissions:
  - Employee.Read, Employee.Create, Employee.Update
  - Vacation.Read, Vacation.Approve
- User assigned to "HR Manager" role
- User is logged in

### Test Steps
1. Query user's permissions via `/api/v1/auth/me`
2. Verify token claims contain all role permissions
3. Test each permission:
   - GET `/api/v1/employees` (Employee.Read)
   - POST `/api/v1/employees` (Employee.Create)
   - PUT `/api/v1/employees/{id}` (Employee.Update)
   - DELETE `/api/v1/employees/{id}` (Employee.Delete - not granted)
   - PUT `/api/v1/vacations/{id}/approve` (Vacation.Approve)

### Expected Results
- Token claims include all 5 permissions from role
- Requests 1-5 succeed (200/201/204)
- Request 6 (DELETE) fails:
  - HTTP Status Code: 403 Forbidden
  - Error: "Insufficient permissions"
  - Permission "Employee.Delete" not in user's role
- Permission check happens before action execution

---

## Test Case AUTHZ-005: Multiple Role Assignment

**Priority:** Medium
**Type:** Functional
**Module:** Authorization

### Description
Verify that users with multiple roles receive combined permissions.

### Preconditions
- Role "Manager" exists with permissions: Employee.Read, Attendance.Read
- Role "HR Operation" exists with permissions: Employee.Create, Employee.Update
- User assigned to both "Manager" and "HR Operation" roles
- User is logged in

### Test Steps
1. Query user roles and permissions
2. Check JWT token claims
3. Test combined permissions:
   - GET `/api/v1/employees` (from Manager)
   - POST `/api/v1/employees` (from HR Operation)
   - GET `/api/v1/attendance` (from Manager)

### Expected Results
- User has 2 roles in database (UserRole records)
- JWT token contains both roles in claims
- Combined permissions: Employee.Read, Employee.Create, Employee.Update, Attendance.Read
- All 3 test requests succeed (200/201)
- Permission union (not intersection) applied
- User gets broadest possible access from all assigned roles

---

## Test Case AUTHZ-006: Role Deletion Protection for System Roles

**Priority:** High
**Type:** Functional
**Module:** Authorization

### Description
Verify that system-defined roles cannot be deleted.

### Preconditions
- SystemAdmin role exists with IsSystemRole = true
- User with SystemAdmin access is logged in
- Standard practice to protect critical roles

### Test Steps
1. Send DELETE request to `/api/v1/roles/{systemadmin-role-id}`
2. Observe response
3. Verify role still exists in database
4. Create custom role "CustomManager"
5. Send DELETE request to delete custom role
6. Verify custom role is deleted

### Expected Results
- Step 1:
  - HTTP Status Code: 400 Bad Request OR 403 Forbidden
  - Error: "Cannot delete system role"
  - IsSystemRole flag prevents deletion
- Step 3:
  - SystemAdmin role still exists
  - No database changes made
- Step 5:
  - HTTP Status Code: 204 No Content
  - Custom role successfully deleted
  - Only non-system roles can be deleted

---

## Test Case AUTHZ-007: Permission Assignment to Roles

**Priority:** Medium
**Type:** Functional
**Module:** Authorization

### Description
Verify that permissions can be assigned to and removed from roles.

### Preconditions
- Custom role "TeamLead" exists
- Permissions "Employee.Read" and "Attendance.Read" exist
- User with role management permission is logged in

### Test Steps
1. GET `/api/v1/roles/{teamlead-id}/permissions` (initial state)
2. POST `/api/v1/roles/{teamlead-id}/permissions`:
   ```json
   {
     "permissionIds": [1, 2, 5, 8]
   }
   ```
3. GET role permissions again
4. Remove one permission:
   - DELETE `/api/v1/roles/{teamlead-id}/permissions/5`
5. Verify updated permissions
6. Login as user with "TeamLead" role
7. Test permissions in practice

### Expected Results
- Step 1: Returns existing permissions (may be empty)
- Step 2:
  - HTTP Status Code: 200 OK
  - RolePermission junction records created
- Step 3: Returns 4 permissions
- Step 4:
  - HTTP Status Code: 204 No Content
  - Permission removed from role
- Step 5: Returns 3 permissions
- Step 7: User can only perform actions for 3 remaining permissions

---

## Test Case AUTHZ-008: User Branch Assignment Management

**Priority:** High
**Type:** Functional
**Module:** Authorization - Multi-Tenancy

### Description
Verify that users can be assigned to multiple branches and scope is enforced.

### Preconditions
- User "MultibranchManager" exists
- 3 branches exist: Cairo (ID: 1), Alexandria (ID: 2), Giza (ID: 3)
- User initially assigned to Cairo only
- Admin user is logged in

### Test Steps
1. GET `/api/v1/users/{user-id}/branches` (current assignments)
2. POST `/api/v1/users/{user-id}/branches`:
   ```json
   {
     "branchIds": [1, 2, 3]
   }
   ```
3. Login as MultibranchManager
4. GET `/api/v1/employees` (should see employees from all 3 branches)
5. Remove Alexandria branch:
   - DELETE `/api/v1/users/{user-id}/branches/2`
6. GET `/api/v1/employees` again
7. Verify data scoping

### Expected Results
- Step 1: Returns Branch ID 1 only
- Step 2:
  - HTTP Status Code: 200 OK
  - UserBranchScope records created for all 3 branches
- Step 4: Returns employees from Cairo, Alexandria, and Giza
- Step 5:
  - HTTP Status Code: 204 No Content
  - UserBranchScope for Branch 2 deleted
- Step 6: Returns employees from Cairo and Giza only (Alexandria excluded)
- Multi-branch access works correctly

---

## Test Case AUTHZ-009: Manager Approval Authority Validation

**Priority:** High
**Type:** Functional
**Module:** Authorization

### Description
Verify that managers can only approve requests from their direct reports.

### Preconditions
- Manager "Alice" manages Employee "Bob" (department: Engineering)
- Manager "Charlie" manages Employee "David" (department: HR)
- Bob submitted vacation request (ID: 100)
- David submitted vacation request (ID: 101)
- Both managers have "Vacation.Approve" permission

### Test Steps
1. Login as Alice
2. PUT `/api/v1/vacations/100/approve` (Bob's request - direct report)
3. PUT `/api/v1/vacations/101/approve` (David's request - not direct report)
4. Login as Charlie
5. PUT `/api/v1/vacations/101/approve` (David's request - direct report)
6. Observe all responses

### Expected Results
- Step 2:
  - HTTP Status Code: 200 OK
  - Bob's vacation approved
  - Alice is Bob's manager
- Step 3:
  - HTTP Status Code: 403 Forbidden
  - Error: "You can only approve requests from your direct reports"
  - Authorization checks employee-manager relationship
- Step 5:
  - HTTP Status Code: 200 OK
  - David's vacation approved
  - Charlie is David's manager
- Manager hierarchy enforced in approval workflow

---

## Test Case AUTHZ-010: Employee Self-Service Portal Access Control

**Priority:** High
**Type:** Functional
**Module:** Authorization

### Description
Verify that employees can only access their own data in the portal.

### Preconditions
- Employee "John" (ID: 50) exists with linked user account
- Employee "Jane" (ID: 51) exists with linked user account
- Both have "Employee" role
- EmployeeUserLink exists for both

### Test Steps
1. Login as John
2. GET `/api/v1/portal/attendance/my-attendance`
3. Verify returned data
4. Attempt to access Jane's data:
   - GET `/api/v1/attendance?employeeId=51`
5. Login as Jane
6. GET `/api/v1/portal/attendance/my-attendance`
7. Compare data from both employees

### Expected Results
- Step 2:
  - HTTP Status Code: 200 OK
  - Returns only John's attendance records
  - EmployeeId = 50 in all records
- Step 4:
  - HTTP Status Code: 403 Forbidden OR returns empty/own data
  - Cannot access other employee's data
  - Portal endpoints check EmployeeUserLink
- Step 6:
  - HTTP Status Code: 200 OK
  - Returns only Jane's attendance records
  - EmployeeId = 51 in all records
- Self-service portal properly isolates employee data
- JWT token contains EmployeeId claim for validation

---

## Test Execution Notes

### Test Data Requirements
- Multiple user accounts with different roles:
  - SystemAdmin
  - Admin
  - Manager (multiple, different branches)
  - HR Operation
  - Employee (multiple)
- Multiple branches (at least 3)
- Multiple departments with manager assignments
- Employee-manager relationships configured
- Test vacation and excuse requests for approval testing

### Environment Setup
- Backend running on http://localhost:5099
- Database seeded with roles, permissions, and users
- UserBranchScope configured for multi-tenancy testing
- EmployeeUserLink configured for portal testing

### Dependencies
- JWT middleware for token validation
- Authorization policies configured
- Entity Framework with branch scoping filters
- Role and permission seed data

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| AUTHZ-001 | Role-Based Permissions | High | ⬜ Not Run |
| AUTHZ-002 | SystemAdmin Access | High | ⬜ Not Run |
| AUTHZ-003 | Branch Scoping | High | ⬜ Not Run |
| AUTHZ-004 | Permission Inheritance | Medium | ⬜ Not Run |
| AUTHZ-005 | Multiple Roles | Medium | ⬜ Not Run |
| AUTHZ-006 | System Role Protection | High | ⬜ Not Run |
| AUTHZ-007 | Permission Assignment | Medium | ⬜ Not Run |
| AUTHZ-008 | Branch Assignment | High | ⬜ Not Run |
| AUTHZ-009 | Manager Authority | High | ⬜ Not Run |
| AUTHZ-010 | Portal Access Control | High | ⬜ Not Run |
