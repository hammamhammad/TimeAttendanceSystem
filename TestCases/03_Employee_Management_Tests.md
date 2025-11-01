# Employee Management Tests

## Overview
This test suite covers employee CRUD operations, hierarchical management, department assignments, and employee-user linking.

---

## Test Case EMP-001: Create New Employee

**Priority:** High
**Type:** Functional
**Module:** Employee Management

### Description
Verify that a new employee can be successfully created with all required information.

### Preconditions
- User with "Employee.Create" permission is logged in
- Department and Branch exist in the database
- No duplicate employee code exists

### Test Steps
1. Send POST request to `/api/v1/employees`:
   ```json
   {
     "code": "EMP001",
     "firstNameEn": "John",
     "lastNameEn": "Doe",
     "firstNameAr": "جون",
     "lastNameAr": "دو",
     "email": "john.doe@company.com",
     "phoneNumber": "+201234567890",
     "birthDate": "1990-05-15",
     "hireDate": "2024-01-15",
     "departmentId": 1,
     "branchId": 1,
     "jobTitle": "Software Engineer",
     "employmentStatus": "FullTime",
     "managerId": 5,
     "workLocationType": "Office",
     "isActive": true
   }
   ```
2. Observe response
3. Verify employee exists in database

### Expected Results
- HTTP Status Code: 201 Created
- Response contains employee ID
- All fields saved correctly
- Employee.IsActive = true
- Bilingual names stored (English and Arabic)
- Manager relationship established
- Can retrieve employee via GET request
- Audit log entry created for employee creation

---

## Test Case EMP-002: Retrieve Employee List with Pagination

**Priority:** High
**Type:** Functional
**Module:** Employee Management

### Description
Verify that employee list can be retrieved with pagination and filtering.

### Preconditions
- Multiple employees exist in database (at least 25)
- User with "Employee.Read" permission is logged in
- Branch scoping is configured

### Test Steps
1. Send GET request to `/api/v1/employees?pageNumber=1&pageSize=10`
2. Send GET request to `/api/v1/employees?pageNumber=2&pageSize=10`
3. Send GET request with filter:
   - `/api/v1/employees?departmentId=1&isActive=true`
4. Observe all responses

### Expected Results
- Step 1:
  - HTTP Status Code: 200 OK
  - Returns 10 employees
  - Response includes pagination metadata: totalCount, pageNumber, pageSize, totalPages
- Step 2:
  - Returns next 10 employees
  - Different employee IDs from page 1
- Step 3:
  - Returns only employees from Department 1
  - All returned employees have IsActive = true
  - Filtered results respect pagination
- Branch scoping applied (only see employees from assigned branches)

---

## Test Case EMP-003: Update Employee Information

**Priority:** High
**Type:** Functional
**Module:** Employee Management

### Description
Verify that employee information can be updated successfully.

### Preconditions
- Employee exists (ID: 10)
- User with "Employee.Update" permission is logged in
- New department exists for transfer

### Test Steps
1. GET `/api/v1/employees/10` (retrieve current state)
2. Send PUT request to `/api/v1/employees/10`:
   ```json
   {
     "jobTitle": "Senior Software Engineer",
     "departmentId": 2,
     "employmentStatus": "FullTime",
     "managerId": 8
   }
   ```
3. GET `/api/v1/employees/10` (verify update)
4. Check audit log for changes

### Expected Results
- Step 1: Returns current employee data
- Step 2:
  - HTTP Status Code: 200 OK
  - Employee updated successfully
- Step 3:
  - JobTitle = "Senior Software Engineer"
  - DepartmentId = 2
  - ManagerId = 8
  - Other fields unchanged
- Audit log contains:
  - Action: Update
  - Entity: Employee
  - Field-level changes (old value → new value)
  - Timestamp and user who made changes

---

## Test Case EMP-004: Delete (Deactivate) Employee

**Priority:** Medium
**Type:** Functional
**Module:** Employee Management

### Description
Verify that employee can be soft-deleted (deactivated) and not hard-deleted.

### Preconditions
- Employee exists (ID: 15, IsActive = true)
- User with "Employee.Delete" permission is logged in
- Employee has attendance records

### Test Steps
1. Send DELETE request to `/api/v1/employees/15`
2. Verify response
3. Send GET request to `/api/v1/employees/15`
4. Query database directly for employee record
5. Check employee's attendance records

### Expected Results
- Step 1:
  - HTTP Status Code: 204 No Content OR 200 OK
  - Soft delete operation performed
- Step 3:
  - HTTP Status Code: 404 Not Found OR returns employee with IsActive = false
  - Employee not shown in default list queries
- Step 4:
  - Employee record still exists in database
  - IsActive = false
  - All data preserved
- Step 5:
  - Attendance records preserved
  - Historical data intact
- Audit log records deletion action

---

## Test Case EMP-005: Employee Hierarchical Reporting Structure

**Priority:** Medium
**Type:** Functional
**Module:** Employee Management

### Description
Verify that employee-manager relationships are correctly maintained and queryable.

### Preconditions
- Manager "Alice" (ID: 5) exists
- 3 employees report to Alice: Bob (ID: 10), Carol (ID: 11), Dave (ID: 12)
- Carol also manages Employee Eve (ID: 20)
- User with read permission is logged in

### Test Steps
1. GET `/api/v1/employees/5/direct-reports` (Alice's team)
2. GET `/api/v1/employees/11/manager` (Carol's manager)
3. GET `/api/v1/employees/11/direct-reports` (Carol's team)
4. Verify hierarchical structure

### Expected Results
- Step 1:
  - Returns 3 employees: Bob, Carol, Dave
  - All have ManagerId = 5
- Step 2:
  - Returns Alice (ID: 5)
  - Carol's manager is Alice
- Step 3:
  - Returns Eve (ID: 20)
  - Eve's ManagerId = 11
- Hierarchical structure: Alice → Carol → Eve
- Multiple levels of management supported

---

## Test Case EMP-006: Employee-User Account Linking

**Priority:** High
**Type:** Functional
**Module:** Employee Management

### Description
Verify that employees can be linked to user accounts for system access.

### Preconditions
- Employee exists (ID: 25, no user link)
- User account exists (ID: 50, no employee link)
- Admin user is logged in

### Test Steps
1. GET `/api/v1/employees/25/user-link` (should be null)
2. POST `/api/v1/employees/25/link-user`:
   ```json
   {
     "userId": 50
   }
   ```
3. GET `/api/v1/employees/25/user-link` (verify link)
4. Login as user 50
5. Access portal endpoints requiring EmployeeUserLink
6. Verify JWT token contains EmployeeId claim

### Expected Results
- Step 1:
  - HTTP Status Code: 200 OK
  - Returns null (no link exists)
- Step 2:
  - HTTP Status Code: 200 OK
  - EmployeeUserLink record created
- Step 3:
  - Returns user ID 50
  - Link exists and active
- Step 5:
  - Portal endpoints accessible
  - Employee-specific data visible
- Step 6:
  - JWT contains EmployeeId = 25 claim
  - Used for data scoping in portal

---

## Test Case EMP-007: Duplicate Employee Code Validation

**Priority:** High
**Type:** Functional
**Module:** Employee Management

### Description
Verify that duplicate employee codes are not allowed.

### Preconditions
- Employee exists with code "EMP001"
- User with create permission is logged in

### Test Steps
1. Send POST request to `/api/v1/employees` with duplicate code:
   ```json
   {
     "code": "EMP001",
     "firstNameEn": "Jane",
     "lastNameEn": "Smith",
     "email": "jane.smith@company.com",
     "departmentId": 1,
     "branchId": 1,
     "hireDate": "2024-02-01"
   }
   ```
2. Observe response

### Expected Results
- HTTP Status Code: 400 Bad Request OR 409 Conflict
- Error message: "Employee code already exists"
- Validation error details:
  - Field: "code"
  - Value: "EMP001"
- No employee created
- Database integrity maintained
- Unique constraint on Employee.Code enforced

---

## Test Case EMP-008: Employee Department Transfer

**Priority:** Medium
**Type:** Functional
**Module:** Employee Management

### Description
Verify that employee can be transferred to different department with proper tracking.

### Preconditions
- Employee exists in Department A (ID: 10, DepartmentId: 1)
- Department B exists (ID: 2)
- User with update permission is logged in

### Test Steps
1. GET `/api/v1/employees/10` (current state)
2. PUT `/api/v1/employees/10`:
   ```json
   {
     "departmentId": 2
   }
   ```
3. Verify employee's department changed
4. Check audit log for transfer record
5. Verify shift assignments updated if department-level shifts exist

### Expected Results
- Step 1: DepartmentId = 1
- Step 2:
  - HTTP Status Code: 200 OK
  - Transfer successful
- Step 3:
  - Employee.DepartmentId = 2
  - Employee now appears in Department B queries
- Step 4:
  - Audit log shows: DepartmentId changed from 1 to 2
  - Timestamp and actor recorded
- Step 5:
  - If Department B has default shift, employee inherits it
  - Shift resolution hierarchy applies

---

## Test Case EMP-009: Employee Search and Filtering

**Priority:** Medium
**Type:** Functional
**Module:** Employee Management

### Description
Verify that employees can be searched and filtered by various criteria.

### Preconditions
- Multiple employees exist with different attributes
- User with read permission is logged in

### Test Steps
1. GET `/api/v1/employees?search=John` (name search)
2. GET `/api/v1/employees?departmentId=1` (filter by department)
3. GET `/api/v1/employees?employmentStatus=FullTime` (filter by status)
4. GET `/api/v1/employees?isActive=true` (filter by active status)
5. GET `/api/v1/employees?departmentId=1&isActive=true&employmentStatus=FullTime` (combined filters)

### Expected Results
- Step 1:
  - Returns employees with "John" in FirstNameEn or LastNameEn
  - Case-insensitive search
- Step 2:
  - Returns only employees from Department 1
- Step 3:
  - Returns only full-time employees
  - Excludes PartTime, Contract, etc.
- Step 4:
  - Returns only active employees
  - IsActive = true
- Step 5:
  - Returns employees matching ALL criteria
  - Filters applied with AND logic
  - Proper query optimization

---

## Test Case EMP-010: Employee Data Validation

**Priority:** High
**Type:** Functional
**Module:** Employee Management

### Description
Verify that employee data is validated according to business rules.

### Preconditions
- User with create permission is logged in

### Test Steps
1. Attempt to create employee with missing required fields:
   ```json
   {
     "code": "EMP999"
   }
   ```
2. Attempt to create employee with invalid email:
   ```json
   {
     "code": "EMP998",
     "firstNameEn": "Test",
     "email": "invalid-email",
     "hireDate": "2024-01-01"
   }
   ```
3. Attempt to create employee with future hire date:
   ```json
   {
     "code": "EMP997",
     "firstNameEn": "Test",
     "email": "test@test.com",
     "hireDate": "2030-01-01"
   }
   ```
4. Attempt to create employee with birth date after hire date:
   ```json
   {
     "code": "EMP996",
     "firstNameEn": "Test",
     "birthDate": "2020-01-01",
     "hireDate": "2010-01-01"
   }
   ```

### Expected Results
- Step 1:
  - HTTP Status Code: 400 Bad Request
  - Validation errors for missing: firstNameEn, hireDate, departmentId, branchId
- Step 2:
  - HTTP Status Code: 400 Bad Request
  - Error: "Invalid email format"
- Step 3:
  - HTTP Status Code: 400 Bad Request
  - Error: "Hire date cannot be in the future"
- Step 4:
  - HTTP Status Code: 400 Bad Request
  - Error: "Birth date must be before hire date"
- All validation errors include field name and specific error message
- No invalid records created

---

## Test Execution Notes

### Test Data Requirements
- Multiple employees across different departments
- Employee-manager relationships configured
- At least 2 departments and 2 branches
- User accounts for linking tests
- Active and inactive employees

### Environment Setup
- Backend running on http://localhost:5099
- Database seeded with departments, branches, and employees
- User with all employee management permissions

### Dependencies
- Department and Branch entities must exist
- User authentication working
- Audit logging enabled

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| EMP-001 | Create Employee | High | ⬜ Not Run |
| EMP-002 | List with Pagination | High | ⬜ Not Run |
| EMP-003 | Update Employee | High | ⬜ Not Run |
| EMP-004 | Soft Delete | Medium | ⬜ Not Run |
| EMP-005 | Hierarchical Structure | Medium | ⬜ Not Run |
| EMP-006 | User Linking | High | ⬜ Not Run |
| EMP-007 | Duplicate Validation | High | ⬜ Not Run |
| EMP-008 | Department Transfer | Medium | ⬜ Not Run |
| EMP-009 | Search and Filter | Medium | ⬜ Not Run |
| EMP-010 | Data Validation | High | ⬜ Not Run |
