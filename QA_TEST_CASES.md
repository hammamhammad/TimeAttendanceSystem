# Time Attendance System - QA Test Cases & Scenarios

**Document Version:** 1.0
**Last Updated:** October 5, 2025
**System Version:** 1.0
**Prepared for:** QA & QC Teams

---

## Table of Contents

1. [Test Environment Setup](#test-environment-setup)
2. [Authentication & Authorization](#authentication--authorization)
3. [User Management](#user-management)
4. [Employee Management](#employee-management)
5. [Department Management](#department-management)
6. [Branch Management](#branch-management)
7. [Shift Management](#shift-management)
8. [Attendance Management](#attendance-management)
9. [Vacation Management](#vacation-management)
10. [Excuse Management](#excuse-management)
11. [Role & Permission Management](#role--permission-management)
12. [Audit Log System](#audit-log-system)
13. [Reporting](#reporting)
14. [Localization](#localization)
15. [Performance & Security](#performance--security)

---

## Test Environment Setup

### Prerequisites
- **Backend URL:** http://localhost:5099
- **Frontend URL:** http://localhost:4200
- **Database:** SQL Server (Development instance)
- **Test Data:** Seed data should be loaded

### Test User Accounts

| Username | Password | Role | Must Change Password | Purpose |
|----------|----------|------|---------------------|----------|
| systemadmin | TempP@ssw0rd123! | SystemAdmin | No | Full system access testing |
| tariq.albalushi | TempPass@123 | Manager | Yes | Password change flow testing |
| test.user1 | User@123 | Employee | No | Standard user testing |
| test.user2 | User@123 | HR Manager | No | HR operations testing |
| test.readonly | User@123 | Read Only | No | View-only permission testing |

---

## 1. Authentication & Authorization

### TC-AUTH-001: Basic Login Functionality

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Navigate to http://localhost:4200
2. Enter valid username: `systemadmin`
3. Enter valid password: `TempP@ssw0rd123!`
4. Click "Login" button

**Expected Results:**
- Login successful
- Redirected to dashboard
- Success notification displayed
- User menu shows logged-in user information
- Session token stored in browser

**Test Data:**
```json
{
  "username": "systemadmin",
  "password": "TempP@ssw0rd123!"
}
```

---

### TC-AUTH-002: Invalid Credentials

**Priority:** High
**Type:** Negative Testing

**Test Steps:**
1. Navigate to login page
2. Enter username: `systemadmin`
3. Enter wrong password: `WrongPassword123`
4. Click "Login" button

**Expected Results:**
- Login fails
- Error message: "Invalid username or password"
- User remains on login page
- No session token created
- Password field cleared

---

### TC-AUTH-003: Must Change Password Flow

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Login with username: `tariq.albalushi`
2. Login with password: `TempPass@123`
3. System should redirect to change password page
4. Enter current password: `TempPass@123`
5. Enter new password: `NewSecure@123`
6. Confirm new password: `NewSecure@123`
7. Click "Change Password" button

**Expected Results:**
- After successful login, automatically redirected to `/auth/change-password`
- Warning notification: "Password Change Required"
- Change password form displays with:
  - Warning icon and message
  - Current password field
  - New password field with requirements
  - Confirm password field
  - Logout button
- After password change:
  - Success notification: "Password changed successfully"
  - Redirected to dashboard
  - MustChangePassword flag set to false in database
  - Can login with new password
- Next login should go directly to dashboard (no password change required)

**Business Rules Verified:**
- Users flagged with MustChangePassword cannot access system until password is changed
- Password must meet complexity requirements (8+ chars, uppercase, lowercase, digit, special char)
- Passwords must match
- Old password cannot be reused (password history check)

---

### TC-AUTH-004: Password History Validation

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Login as user and change password to `NewPass@123`
2. Immediately try to change password back to previous password
3. System should prevent reuse of last 5 passwords

**Expected Results:**
- Error message: "Cannot reuse any of your last 5 passwords"
- Password change fails
- User can try different password

**Business Rules:**
- System maintains history of last 5 password hashes
- Cannot reuse any of the last 5 passwords

---

### TC-AUTH-005: Password Change - Passwords Don't Match

**Priority:** Medium
**Type:** Negative Testing

**Test Steps:**
1. Navigate to change password page
2. Enter current password correctly
3. Enter new password: `NewPass@123`
4. Enter confirm password: `DifferentPass@123`
5. Attempt to submit

**Expected Results:**
- Validation error: "Passwords do not match"
- Form not submitted
- Both new password fields highlighted in red
- Submit button disabled or error shown

---

### TC-AUTH-006: Password Change - Invalid Current Password

**Priority:** Medium
**Type:** Negative Testing

**Test Steps:**
1. Navigate to change password page
2. Enter wrong current password
3. Enter valid new password
4. Enter matching confirm password
5. Submit form

**Expected Results:**
- API error: "Current password is incorrect"
- Error notification displayed
- Form remains on page
- User can retry

---

### TC-AUTH-007: Password Complexity Validation

**Priority:** High
**Type:** Functional

**Test Cases:**

| Test Password | Should Pass | Reason |
|--------------|-------------|--------|
| `short` | No | Too short (< 8 chars) |
| `alllowercase123!` | No | Missing uppercase |
| `ALLUPPERCASE123!` | No | Missing lowercase |
| `NoNumbers!` | No | Missing digit |
| `NoSpecial123` | No | Missing special character |
| `Valid@Pass123` | Yes | Meets all requirements |

**Expected Results:**
- Passwords failing requirements show specific error messages
- Password field shows red border for invalid input
- Requirements list shows which rules are not met
- Valid passwords are accepted

---

### TC-AUTH-008: Session Timeout

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Login successfully
2. Wait for session timeout (configured duration)
3. Attempt to perform any action

**Expected Results:**
- Session expired notification
- Redirected to login page
- Must login again to continue
- Previous session token invalidated

---

### TC-AUTH-009: Logout Functionality

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Login successfully
2. Click user menu
3. Click "Logout" button

**Expected Results:**
- Logout confirmation (if configured)
- Session token cleared
- Redirected to login page
- Cannot access protected pages without login
- Success notification: "Logout successful"

---

### TC-AUTH-010: Concurrent Login Sessions

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Login from Browser A
2. Login with same user from Browser B
3. Verify behavior based on business rules

**Expected Results:**
- Verify if system allows concurrent sessions or invalidates previous session
- Check audit log for both login events
- Verify session management

---

## 2. User Management

### TC-USER-001: Create New User

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Login as administrator
2. Navigate to Users page
3. Click "Add User" button
4. Fill in user details:
   - Username: `test.newuser`
   - Email: `test.newuser@company.com`
   - Password: `TempPass@123`
   - Confirm Password: `TempPass@123`
   - First Name: `Test`
   - Last Name: `User`
   - Select Role: `Employee`
   - Check "Must Change Password"
   - Check "Is Active"
5. Click "Save" button

**Expected Results:**
- User created successfully
- Success notification displayed
- User appears in users list
- User can login with provided credentials
- User is forced to change password on first login
- Audit log entry created for user creation

**Business Rules Verified:**
- Username must be unique
- Email must be valid format
- Password must meet complexity requirements
- MustChangePassword flag enforced on first login

---

### TC-USER-002: Create User - Duplicate Username

**Priority:** High
**Type:** Negative Testing

**Test Steps:**
1. Navigate to create user form
2. Enter username that already exists: `systemadmin`
3. Fill other required fields
4. Attempt to save

**Expected Results:**
- Validation error: "Username already exists"
- User not created
- Error notification displayed
- Form remains on screen for correction

---

### TC-USER-003: Create User - Invalid Email Format

**Priority:** Medium
**Type:** Negative Testing

**Test Cases:**

| Email Input | Should Pass | Reason |
|-------------|-------------|--------|
| `notanemail` | No | Missing @ and domain |
| `test@` | No | Missing domain |
| `@company.com` | No | Missing local part |
| `test@company` | No | Missing TLD |
| `test@company.com` | Yes | Valid format |

**Expected Results:**
- Invalid emails show validation error
- Field highlighted in red
- Form cannot be submitted with invalid email

---

### TC-USER-004: Edit User Information

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Users list
2. Click "Edit" on existing user
3. Modify fields:
   - First Name: `UpdatedName`
   - Email: `updated.email@company.com`
   - Role: Change to different role
4. Click "Save"

**Expected Results:**
- User updated successfully
- Changes reflected in users list
- Success notification displayed
- Audit log entry created for user update
- Changes show in user detail view

---

### TC-USER-005: Toggle User Active Status

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Users list
2. Find active user
3. Click "Edit"
4. Uncheck "Is Active"
5. Save changes
6. Attempt to login with that user

**Expected Results:**
- User marked as inactive in database
- User cannot login (error: "User account is inactive")
- User appears as inactive in users list
- Audit log entry created
- Can be reactivated by checking "Is Active" again

---

### TC-USER-006: Delete User

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Users list
2. Click "Delete" on a test user
3. Confirm deletion in confirmation dialog

**Expected Results:**
- Confirmation modal appears
- User deleted from database
- User removed from list
- Success notification displayed
- Audit log entry created
- Cannot login with deleted user credentials

**Note:** Verify if system uses soft delete (IsDeleted flag) or hard delete

---

### TC-USER-007: View User Details

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Users list
2. Click "View" on a user

**Expected Results:**
- User detail page displays
- Shows all user information:
  - Username
  - Email
  - Full Name
  - Role
  - Active Status
  - Must Change Password Status
  - Created Date
  - Last Modified Date
  - Associated Employee (if linked)
- Action buttons available (Edit, Delete, Back)

---

### TC-USER-008: Search and Filter Users

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Users list
2. Use search box to search for username
3. Use role filter to filter by role
4. Use active status filter

**Expected Results:**
- Search returns matching results
- Filters work correctly
- Can combine search and filters
- Results update in real-time
- Clear filters resets to all users

---

### TC-USER-009: User Pagination

**Priority:** Low
**Type:** Functional

**Test Steps:**
1. Navigate to Users list
2. Set page size to 10
3. Navigate through pages

**Expected Results:**
- Correct number of items per page
- Page navigation works
- Total count displayed correctly
- Can change page size (10, 25, 50, 100)

---

### TC-USER-010: Assign User to Employee

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Create or edit user
2. Select employee from dropdown
3. Save user

**Expected Results:**
- User linked to employee
- Employee shows associated user
- One-to-one relationship maintained
- Cannot assign same employee to multiple users

---

## 3. Employee Management

### TC-EMP-001: Create New Employee

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Login as authorized user (HR Manager or Admin)
2. Navigate to Employees page
3. Click "Add Employee" button
4. Fill in employee details:
   - Employee Code: `EMP2025001`
   - First Name: `Ahmed`
   - Last Name: `Mohammed`
   - Email: `ahmed.mohammed@company.com`
   - Phone: `+968 99123456`
   - Hire Date: `2025-01-01`
   - Select Department
   - Select Branch
   - Select Shift
   - Job Title: `Software Engineer`
   - Is Active: Checked
5. Click "Save"

**Expected Results:**
- Employee created successfully
- Success notification displayed
- Employee appears in employees list
- Audit log entry created
- Can view employee details

**Business Rules Verified:**
- Employee code must be unique
- Email must be unique and valid
- Required fields validated
- Default shift assigned if applicable

---

### TC-EMP-002: Create Employee - Duplicate Employee Code

**Priority:** High
**Type:** Negative Testing

**Test Steps:**
1. Navigate to create employee form
2. Enter employee code that already exists
3. Fill other fields
4. Attempt to save

**Expected Results:**
- Validation error: "Employee code already exists"
- Employee not created
- Error notification displayed

---

### TC-EMP-003: Edit Employee Information

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Employees list
2. Click "Edit" on existing employee
3. Modify fields:
   - Department: Change to different department
   - Shift: Change to different shift
   - Job Title: Update title
   - Phone: Update phone number
4. Click "Save"

**Expected Results:**
- Employee updated successfully
- Changes reflected in employees list
- Success notification displayed
- Audit log entry created
- Historical data preserved (if applicable)

---

### TC-EMP-004: Assign Employee to Department

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Edit employee
2. Change department from dropdown
3. Save changes

**Expected Results:**
- Employee assigned to new department
- Employee shows under new department
- Removed from old department's employee list
- Audit log shows department change

---

### TC-EMP-005: Assign Employee to Shift

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Edit employee
2. Change shift assignment
3. Save changes

**Expected Results:**
- Employee assigned to new shift
- Shift schedule applies to employee
- Attendance calculations use new shift times
- Audit log shows shift change
- Historical attendance records preserved

---

### TC-EMP-006: Change Employee Shift (Bulk Operation)

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Employees list or dedicated Shift Assignment page
2. Select multiple employees (checkboxes)
3. Click "Change Shift" bulk action
4. Select new shift from modal
5. Select effective date
6. Confirm action

**Expected Results:**
- All selected employees assigned to new shift
- Effective date applied correctly
- Success notification with count
- Audit log entry for each employee
- Can verify changes in employee details

---

### TC-EMP-007: Deactivate Employee

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to employee detail or edit page
2. Uncheck "Is Active" checkbox
3. Save changes
4. Verify employee status

**Expected Results:**
- Employee marked as inactive
- Employee shows as inactive in list (grayed out or badge)
- Cannot assign attendance to inactive employee
- Cannot create vacation for inactive employee
- Can be reactivated later
- Audit log entry created

---

### TC-EMP-008: Delete Employee

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Employees list
2. Click "Delete" on employee with no attendance records
3. Confirm deletion

**Expected Results:**
- If no related records: Employee deleted
- If has attendance/vacation records: Warning message
- Confirmation modal shows impact
- Success notification on deletion
- Audit log entry created

**Business Rules:**
- Verify if system prevents deletion of employees with attendance history
- Check if soft delete (IsDeleted flag) is used

---

### TC-EMP-009: View Employee Details

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Employees list
2. Click "View" on employee

**Expected Results:**
- Employee detail page displays showing:
  - Personal Information (Name, Code, Email, Phone)
  - Employment Information (Hire Date, Job Title, Status)
  - Department and Branch
  - Assigned Shift
  - Associated User Account
  - Vacation Balance
  - Recent Attendance Records
- Action buttons available (Edit, Delete, Back)
- Can navigate to related records (attendance, vacations)

---

### TC-EMP-010: Employee Search and Filters

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Employees list
2. Test search functionality:
   - Search by name
   - Search by employee code
   - Search by email
3. Test filters:
   - Filter by department
   - Filter by branch
   - Filter by shift
   - Filter by active status

**Expected Results:**
- Search returns accurate results
- Filters work correctly
- Can combine multiple filters
- Results update immediately
- Clear filters resets to all employees

---

## 4. Department Management

### TC-DEPT-001: Create Root Department

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Departments page
2. Click "Add Department" button
3. Fill in department details:
   - Name (English): `Engineering`
   - Name (Arabic): `الهندسة`
   - Code: `ENG`
   - Parent Department: None (root level)
   - Manager: Select employee
   - Is Active: Checked
4. Click "Save"

**Expected Results:**
- Department created at root level
- Success notification displayed
- Department appears in departments tree
- Can view department details
- Audit log entry created

---

### TC-DEPT-002: Create Child Department

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Departments page
2. Click "Add Department"
3. Fill in details:
   - Name (English): `Software Development`
   - Name (Arabic): `تطوير البرمجيات`
   - Code: `SW-DEV`
   - Parent Department: Select `Engineering`
   - Manager: Select employee
4. Click "Save"

**Expected Results:**
- Child department created under parent
- Appears indented in department tree
- Hierarchy relationship maintained
- Can navigate parent-child structure
- Audit log entry created

---

### TC-DEPT-003: Department Hierarchy Navigation

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Departments page with hierarchical tree
2. Expand/collapse parent departments
3. Navigate through multiple levels

**Expected Results:**
- Tree structure displays correctly
- Expand/collapse works smoothly
- Visual indicators for parent departments
- Can see full path/breadcrumb
- Employee count per department shown

---

### TC-DEPT-004: Move Department to Different Parent

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Edit existing child department
2. Change parent department
3. Save changes

**Expected Results:**
- Department moved to new parent
- Tree structure updates
- All child departments move with parent
- Employee assignments preserved
- Audit log entry created

---

### TC-DEPT-005: Assign Department Manager

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Edit department
2. Select employee as manager
3. Save changes

**Expected Results:**
- Manager assigned to department
- Manager shows in department details
- Manager may get additional permissions (based on business rules)
- Can change manager later
- Audit log entry created

---

### TC-DEPT-006: Deactivate Department

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Edit department
2. Uncheck "Is Active"
3. Save changes

**Expected Results:**
- Department marked as inactive
- Employees can remain assigned (verify business rule)
- Cannot assign new employees to inactive department
- Shows as inactive in lists/dropdowns
- Can be reactivated
- Audit log entry created

---

### TC-DEPT-007: Delete Department

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Attempt to delete department with employees
2. Attempt to delete department with child departments
3. Attempt to delete empty department

**Expected Results:**
- Cannot delete if has employees (error message)
- Cannot delete if has child departments (error message)
- Can delete if empty
- Confirmation dialog shows impact
- Audit log entry created

---

### TC-DEPT-008: Department Code Uniqueness

**Priority:** Medium
**Type:** Negative Testing

**Test Steps:**
1. Create department with code `ENG`
2. Attempt to create another department with same code

**Expected Results:**
- Validation error: "Department code already exists"
- Cannot save duplicate code
- Error notification displayed

---

## 5. Branch Management

### TC-BRANCH-001: Create New Branch

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Branches page
2. Click "Add Branch" button
3. Fill in branch details:
   - Name (English): `Main Office`
   - Name (Arabic): `المكتب الرئيسي`
   - Code: `HQ`
   - Address: `Muscat, Oman`
   - Phone: `+968 24123456`
   - Manager: Select employee
   - Is Active: Checked
4. Click "Save"

**Expected Results:**
- Branch created successfully
- Success notification displayed
- Branch appears in branches list
- Can view branch details
- Audit log entry created

---

### TC-BRANCH-002: Edit Branch Information

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Branches list
2. Click "Edit" on existing branch
3. Modify fields
4. Save changes

**Expected Results:**
- Branch updated successfully
- Changes reflected immediately
- Audit log entry created

---

### TC-BRANCH-003: Assign Employees to Branch

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Edit employee
2. Select branch from dropdown
3. Save changes

**Expected Results:**
- Employee assigned to branch
- Employee shows under branch's employee list
- Can filter employees by branch
- Audit log entry created

---

### TC-BRANCH-004: View Branch Details

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Click "View" on branch

**Expected Results:**
- Branch detail page shows:
  - Branch information
  - Manager details
  - List of employees
  - List of departments
  - Statistics (employee count, etc.)
- Action buttons available

---

### TC-BRANCH-005: Deactivate Branch

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Edit branch
2. Uncheck "Is Active"
3. Save changes

**Expected Results:**
- Branch marked as inactive
- Cannot assign new employees to inactive branch
- Existing employees remain assigned (verify business rule)
- Shows as inactive in dropdowns
- Can be reactivated
- Audit log entry created

---

### TC-BRANCH-006: Delete Branch

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Attempt to delete branch with employees
2. Attempt to delete empty branch

**Expected Results:**
- Cannot delete if has employees (warning)
- Can delete if empty
- Confirmation dialog
- Audit log entry created

---

## 6. Shift Management

### TC-SHIFT-001: Create Standard Shift

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Navigate to Shifts page
2. Click "Add Shift" button
3. Fill in shift details:
   - Name (English): `Morning Shift`
   - Name (Arabic): `الوردية الصباحية`
   - Code: `MORNING`
   - Start Time: `08:00`
   - End Time: `16:00`
   - Grace Period In: `15` minutes
   - Grace Period Out: `15` minutes
   - Required Hours: `8`
   - Is Active: Checked
4. Click "Save"

**Expected Results:**
- Shift created successfully
- Success notification displayed
- Shift appears in shifts list
- Can assign to employees
- Audit log entry created

**Business Rules Verified:**
- End time must be after start time
- Grace periods are in minutes
- Required hours calculated correctly

---

### TC-SHIFT-002: Create Night Shift (Crosses Midnight)

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Create shift with:
   - Start Time: `22:00`
   - End Time: `06:00` (next day)
   - Required Hours: `8`

**Expected Results:**
- Shift created successfully
- System correctly handles midnight crossover
- Attendance calculations work correctly
- Duration calculated as 8 hours

**Business Rules:**
- System must handle shifts that span midnight
- Attendance records correctly attribute to start date

---

### TC-SHIFT-003: Grace Period Functionality

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Create shift: Start `08:00`, Grace In `15 min`
2. Assign employee to shift
3. Record attendance scenarios:
   - Check-in at `07:50` (10 min early)
   - Check-in at `08:10` (10 min late, within grace)
   - Check-in at `08:20` (20 min late, exceeds grace)

**Expected Results:**
- `07:50`: On time (early arrival)
- `08:10`: Marked as on time (within grace period)
- `08:20`: Marked as late (exceeds grace period)
- Late minutes calculated: 20 minutes
- Status reflects correctly

**Business Rules:**
- Grace period allows flexibility without marking late
- Late time calculated from actual shift start, not grace period end

---

### TC-SHIFT-004: Edit Shift Information

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Edit existing shift
2. Change times and grace periods
3. Save changes

**Expected Results:**
- Shift updated successfully
- Changes apply to new attendance records
- Historical attendance records preserved with old shift data
- Employees assigned to shift see updated schedule
- Audit log entry created

**Important:** Verify if historical attendance is recalculated or preserved

---

### TC-SHIFT-005: Assign Shift to Employee

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Navigate to employee edit page
2. Select shift from dropdown
3. Save changes

**Expected Results:**
- Employee assigned to shift
- Shift schedule applies to employee's attendance
- Employee appears in shift's employee list
- Future attendance uses new shift rules
- Audit log entry created

---

### TC-SHIFT-006: Bulk Shift Assignment

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Shift Assignment or Employees page
2. Select multiple employees
3. Click "Assign Shifts" bulk action
4. Select shift and effective date
5. Confirm

**Expected Results:**
- All selected employees assigned to shift
- Effective date applied correctly
- Success notification with count
- Audit log entries created
- Can verify in employee details

---

### TC-SHIFT-007: Deactivate Shift

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Edit shift
2. Uncheck "Is Active"
3. Save changes

**Expected Results:**
- Shift marked as inactive
- Cannot assign to new employees
- Employees currently assigned remain (verify business rule)
- Shows as inactive in dropdowns
- Can be reactivated
- Audit log entry created

---

### TC-SHIFT-008: Delete Shift

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Attempt to delete shift with assigned employees
2. Attempt to delete shift with no employees

**Expected Results:**
- Cannot delete if has assigned employees (warning)
- Can delete if no employees assigned
- Confirmation dialog
- Audit log entry created

---

### TC-SHIFT-009: Flexible Shift

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Create shift with flexible hours (if supported)
2. Assign to employee
3. Record attendance

**Expected Results:**
- System handles flexible shift rules
- Attendance calculated based on flexible criteria
- Verify business rules for flexible shifts

**Note:** Verify if system supports flexible shifts

---

## 7. Attendance Management

### TC-ATT-001: Record Manual Check-In

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Navigate to Attendance page
2. Click "Add Attendance" or "Manual Check-In"
3. Select employee
4. Select date: Today
5. Enter check-in time: `08:00`
6. Click "Save"

**Expected Results:**
- Attendance record created
- Check-in time recorded
- Status shows "Checked In" or "Incomplete"
- Record appears in attendance list
- Audit log entry created

---

### TC-ATT-002: Record Manual Check-Out

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Find attendance record with check-in only
2. Click "Edit" or "Check Out"
3. Enter check-out time: `16:00`
4. Save changes

**Expected Results:**
- Check-out time recorded
- Status updated to "Present" or "Complete"
- Total hours calculated (8 hours)
- Overtime calculated if applicable
- Audit log entry created

---

### TC-ATT-003: Complete Attendance Record (Check-In and Check-Out)

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Create new attendance record
2. Enter employee, date, check-in `08:00`, check-out `16:00`
3. Save

**Expected Results:**
- Complete attendance record created
- Total hours: 8 hours
- Status: Present
- No overtime (exact hours)
- Audit log entry created

---

### TC-ATT-004: Late Arrival (Exceeds Grace Period)

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Employee has shift: Start `08:00`, Grace `15 min`
2. Record check-in: `08:30` (30 minutes late)
3. Record check-out: `16:00`

**Expected Results:**
- Status: Late
- Late minutes: 30 minutes
- Late flag set to true
- Total hours calculated correctly
- Notification/report shows late arrival
- Audit log entry created

**Business Rules:**
- Late is determined by shift start + grace period
- Late minutes = actual arrival - (shift start + grace)

---

### TC-ATT-005: Early Departure (Before Shift End)

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Employee has shift: End `16:00`, Grace Out `15 min`
2. Record check-in: `08:00`
3. Record check-out: `15:30` (30 minutes early)

**Expected Results:**
- Status: Early Departure
- Early minutes: 30 minutes
- Early flag set to true
- Total hours: 7.5 hours
- Undertime calculated
- Audit log entry created

**Business Rules:**
- Early departure if checkout before (shift end - grace period out)

---

### TC-ATT-006: Overtime Calculation

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Employee has shift: `08:00 - 16:00` (8 hours required)
2. Record check-in: `08:00`
3. Record check-out: `18:00` (2 hours overtime)

**Expected Results:**
- Status: Present with Overtime
- Total hours: 10 hours
- Regular hours: 8 hours
- Overtime hours: 2 hours
- Overtime calculated based on configuration (1.5x, 2x, etc.)
- Audit log entry created

**Business Rules:**
- Verify overtime calculation rules (weekday, weekend, holiday multipliers)
- Check if overtime requires approval

---

### TC-ATT-007: Absence (No Attendance Record)

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Employee assigned to shift
2. No check-in/check-out recorded for a workday
3. Run attendance calculation/report for that day

**Expected Results:**
- System marks employee as Absent for that day
- Absence flag set
- Can create excuse or vacation to cover absence
- Affects attendance reports
- Notification sent (if configured)

**Business Rules:**
- Absence determined by missing attendance on scheduled workday
- Weekend/holiday days not marked as absent

---

### TC-ATT-008: Edit Attendance Record

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to attendance list
2. Click "Edit" on existing record
3. Modify check-in/check-out times
4. Add notes
5. Save changes

**Expected Results:**
- Attendance record updated
- Times recalculated (hours, overtime, late/early)
- Audit log shows old and new values
- Success notification
- Changes reflected in reports

**Business Rules:**
- Verify who can edit attendance (permissions)
- Check if there's an approval workflow for edits

---

### TC-ATT-009: Delete Attendance Record

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Click "Delete" on attendance record
2. Confirm deletion

**Expected Results:**
- Confirmation dialog appears
- Record deleted from database
- Removed from attendance list
- Audit log entry created
- Reports updated

---

### TC-ATT-010: Excuse Deduction from Attendance

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Employee arrives late: Check-in `09:00` (1 hour late)
2. Employee submits excuse for 30 minutes
3. Excuse approved

**Expected Results:**
- Late minutes reduced by excuse amount
- Original late: 60 minutes
- After excuse: 30 minutes
- Status updated
- Excuse linked to attendance record
- Audit log entry created

**Business Rules:**
- Excuse cannot exceed actual late/early time
- Excuse policy limits applied

---

### TC-ATT-011: Vacation Coverage

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Employee has approved vacation for specific date range
2. Check attendance for those dates

**Expected Results:**
- Days marked as "On Vacation" not "Absent"
- Vacation type displayed
- Vacation balance deducted
- No late/early/absence penalties
- Shows in attendance report as vacation

---

### TC-ATT-012: Holiday Attendance

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Public holiday defined in system
2. Employee works on holiday
3. Record attendance

**Expected Results:**
- Holiday flag applied
- Overtime multiplier for holiday applied (e.g., 2x)
- Special pay rate calculated
- Shows as holiday work in reports

**Business Rules:**
- Verify holiday overtime rules
- Check if holiday work requires approval

---

### TC-ATT-013: Weekend Attendance

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Employee works on weekend (Friday/Saturday or based on config)
2. Record attendance

**Expected Results:**
- Weekend flag applied
- Weekend overtime multiplier applied
- Shows as weekend work in reports

**Business Rules:**
- Verify weekend days configuration
- Check weekend overtime rates

---

### TC-ATT-014: Attendance Report Generation

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Attendance Reports
2. Select date range: Current month
3. Select filters: Department, Employee, Status
4. Click "Generate Report"

**Expected Results:**
- Report displays attendance summary:
  - Present days
  - Absent days
  - Late days
  - Early departure days
  - Vacation days
  - Total hours worked
  - Overtime hours
- Can export to Excel/PDF
- Data accurate and matches individual records

---

### TC-ATT-015: Daily Attendance Summary

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Daily Attendance page
2. Select date: Today
3. View summary

**Expected Results:**
- Shows all employees for the day
- Summary statistics:
  - Total employees
  - Present count
  - Absent count
  - Late count
  - On vacation count
- Real-time updates (if applicable)
- Can drill down to individual records

---

### TC-ATT-016: Monthly Attendance Report

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Monthly Report
2. Select month and year
3. Select employee or department
4. Generate report

**Expected Results:**
- Calendar view or tabular view of entire month
- Each day shows status for employee
- Summary totals for month
- Can export report
- Pagination for multiple employees

---

### TC-ATT-017: Bulk Attendance Import

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Prepare Excel file with attendance records
2. Navigate to Import page
3. Upload file
4. Map columns
5. Validate and import

**Expected Results:**
- File uploaded successfully
- Validation errors shown if any
- Valid records imported
- Invalid records highlighted
- Success notification with count
- Audit log entries created

**Note:** Verify if bulk import feature exists

---

### TC-ATT-018: Change Employee Shift for Specific Day

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to attendance record or shift assignment
2. Change shift for specific employee for specific date
3. Save changes

**Expected Results:**
- Shift changed for that day only
- Attendance calculations use new shift
- Employee's default shift unchanged
- Shows override indicator
- Audit log entry created

---

## 8. Vacation Management

### TC-VAC-001: Create Vacation Type

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Settings > Vacation Types
2. Click "Add Vacation Type"
3. Fill in details:
   - Name (English): `Annual Leave`
   - Name (Arabic): `الإجازة السنوية`
   - Code: `ANNUAL`
   - Default Days: `30`
   - Max Days Per Request: `15`
   - Requires Approval: Checked
   - Is Paid: Checked
   - Affects Balance: Checked
   - Is Active: Checked
4. Click "Save"

**Expected Results:**
- Vacation type created
- Available in vacation request dropdown
- Default balance applied to employees
- Audit log entry created

---

### TC-VAC-002: Request Vacation

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Login as employee or create request as HR
2. Navigate to Employee Vacations
3. Click "Request Vacation"
4. Fill in details:
   - Employee: Select employee
   - Vacation Type: `Annual Leave`
   - Start Date: `2025-01-15`
   - End Date: `2025-01-20`
   - Reason: `Family vacation`
5. Click "Submit"

**Expected Results:**
- Vacation request created
- Status: Pending Approval
- Days calculated automatically (6 days if weekends included)
- Balance checked (cannot exceed available)
- Notification sent to approver
- Request appears in pending list
- Audit log entry created

**Business Rules:**
- Cannot request vacation without sufficient balance
- Cannot overlap with existing approved vacation
- Cannot request past dates (configurable)
- Weekend/holiday handling based on settings

---

### TC-VAC-003: Approve Vacation Request

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Login as manager/approver
2. Navigate to Vacation Approvals
3. Click on pending vacation request
4. Review details
5. Click "Approve"
6. Add approval notes (optional)
7. Confirm approval

**Expected Results:**
- Status changed to "Approved"
- Balance deducted from employee
- Notification sent to employee
- Vacation shows in employee's calendar
- Attendance for those dates marked as vacation
- Audit log entry created

**Business Rules:**
- Only authorized users can approve
- Approval hierarchy (if configured)

---

### TC-VAC-004: Reject Vacation Request

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Login as approver
2. View pending vacation request
3. Click "Reject"
4. Enter rejection reason (required)
5. Confirm rejection

**Expected Results:**
- Status changed to "Rejected"
- Balance NOT deducted
- Notification sent to employee with reason
- Request remains in history
- Audit log entry created

---

### TC-VAC-005: Cancel Approved Vacation

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Find approved vacation (not yet started)
2. Click "Cancel"
3. Enter cancellation reason
4. Confirm cancellation

**Expected Results:**
- Status changed to "Cancelled"
- Balance returned to employee
- Notification sent
- Attendance records updated (no longer vacation)
- Audit log entry created

**Business Rules:**
- Verify if can cancel after vacation has started
- Check cancellation policy (cutoff date, penalties)

---

### TC-VAC-006: Vacation Balance Management

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Employee details
2. View vacation balance section
3. Check balance for each vacation type

**Expected Results:**
- Shows all vacation types
- Current balance for each
- Used days
- Remaining days
- Pending requests (not yet deducted)
- History of balance changes

---

### TC-VAC-007: Adjust Vacation Balance

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to employee vacation management
2. Click "Adjust Balance"
3. Select vacation type
4. Enter adjustment amount: `+5` days
5. Enter reason: "Compensation for overtime"
6. Save

**Expected Results:**
- Balance adjusted by specified amount
- Adjustment reason logged
- Shows in balance history
- Audit log entry created

**Business Rules:**
- Only authorized users can adjust
- Reason required for adjustments

---

### TC-VAC-008: Overlapping Vacation Request

**Priority:** High
**Type:** Negative Testing

**Test Steps:**
1. Employee has approved vacation: Jan 15-20
2. Attempt to request new vacation: Jan 18-22 (overlaps)

**Expected Results:**
- Validation error: "Vacation dates overlap with existing vacation"
- Request not created
- Error notification displayed

---

### TC-VAC-009: Insufficient Balance

**Priority:** High
**Type:** Negative Testing

**Test Steps:**
1. Employee has 5 days annual leave balance
2. Attempt to request 10 days vacation

**Expected Results:**
- Validation error: "Insufficient vacation balance"
- Shows available balance
- Request not created
- Error notification

---

### TC-VAC-010: Vacation Exceeds Max Days Per Request

**Priority:** Medium
**Type:** Negative Testing

**Test Steps:**
1. Vacation type has max 15 days per request
2. Attempt to request 20 days

**Expected Results:**
- Validation error: "Exceeds maximum days per request (15)"
- Request not created
- Suggestion to split request

---

### TC-VAC-011: Bulk Vacation Creation

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Bulk Vacation page
2. Select multiple employees
3. Select vacation type and dates
4. Click "Create Bulk Vacation"

**Expected Results:**
- Vacation created for all selected employees
- Individual balance checks performed
- Success notification with count
- Failed requests shown with reasons
- Audit log entries created

---

### TC-VAC-012: Vacation Report

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Vacation Reports
2. Select date range and filters
3. Generate report

**Expected Results:**
- Report shows:
  - Employees on vacation per day
  - Vacation type breakdown
  - Department coverage
  - Balance summary
- Can export report

---

## 9. Excuse Management

### TC-EXC-001: Create Excuse Policy

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Settings > Excuse Policies
2. Click "Add Excuse Policy"
3. Fill in details:
   - Name (English): `Medical Excuse`
   - Name (Arabic): `عذر طبي`
   - Code: `MEDICAL`
   - Max Hours Per Request: `4`
   - Max Hours Per Month: `8`
   - Requires Approval: Checked
   - Requires Documentation: Checked
   - Is Active: Checked
4. Click "Save"

**Expected Results:**
- Excuse policy created
- Available in excuse request dropdown
- Limits enforced on requests
- Audit log entry created

---

### TC-EXC-002: Submit Excuse Request

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Employee arrives late (check-in 09:00 instead of 08:00)
2. Navigate to Excuse Requests
3. Click "Submit Excuse"
4. Fill in details:
   - Employee: Select employee
   - Date: Today
   - Excuse Type: `Medical Excuse`
   - Hours: `1`
   - Reason: "Doctor appointment"
   - Upload documentation (medical certificate)
5. Click "Submit"

**Expected Results:**
- Excuse request created
- Status: Pending Approval
- Hours within policy limits
- Documentation attached
- Notification sent to approver
- Audit log entry created

**Business Rules:**
- Hours requested cannot exceed late/early time
- Cannot exceed policy maximums
- Documentation required if policy specifies

---

### TC-EXC-003: Approve Excuse Request

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Login as approver
2. Navigate to Excuse Approvals
3. View pending excuse
4. Review documentation
5. Click "Approve"
6. Confirm

**Expected Results:**
- Status: Approved
- Late/early time reduced by excuse hours
- Attendance record updated
- Notification sent to employee
- Excuse balance updated
- Audit log entry created

---

### TC-EXC-004: Reject Excuse Request

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Login as approver
2. View pending excuse
3. Click "Reject"
4. Enter rejection reason
5. Confirm

**Expected Results:**
- Status: Rejected
- Attendance record unchanged (still shows late/early)
- Notification sent with reason
- Excuse remains in history
- Audit log entry created

---

### TC-EXC-005: Excuse Exceeds Policy Limit

**Priority:** High
**Type:** Negative Testing

**Test Steps:**
1. Excuse policy: Max 4 hours per request
2. Attempt to request 5 hours excuse

**Expected Results:**
- Validation error: "Exceeds maximum hours per request (4)"
- Request not created
- Error notification

---

### TC-EXC-006: Excuse Exceeds Monthly Limit

**Priority:** High
**Type:** Negative Testing

**Test Steps:**
1. Employee has used 7 hours of medical excuse this month
2. Policy allows 8 hours per month
3. Attempt to request 2 hours excuse

**Expected Results:**
- Validation error: "Exceeds monthly limit. Available: 1 hour"
- Request not created
- Shows remaining balance
- Error notification

---

### TC-EXC-007: Excuse Without Documentation

**Priority:** Medium
**Type:** Negative Testing

**Test Steps:**
1. Excuse policy requires documentation
2. Submit excuse without uploading document

**Expected Results:**
- Validation error: "Documentation required for this excuse type"
- Request not submitted
- Error notification

---

### TC-EXC-008: Excuse for Full Day

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Employee absent entire day
2. Submit excuse for 8 hours (full shift)
3. Approve excuse

**Expected Results:**
- Absence converted to excused absence
- Full day covered by excuse
- Attendance status updated
- Shows as excused in reports

---

### TC-EXC-009: View Excuse History

**Priority:** Low
**Type:** Functional

**Test Steps:**
1. Navigate to employee's excuse history
2. View list of all excuse requests

**Expected Results:**
- Shows all excuses (pending, approved, rejected)
- Filters by status, date, type
- Can view details of each excuse
- Shows documentation attachments

---

## 10. Role & Permission Management

### TC-ROLE-001: Create New Role

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Roles page
2. Click "Add Role"
3. Fill in details:
   - Name: `HR Manager`
   - Description: `Human Resources Manager with full employee access`
4. Click "Save"

**Expected Results:**
- Role created
- Available for permission assignment
- Can assign to users
- Audit log entry created

---

### TC-ROLE-002: Assign Permissions to Role

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Edit role
2. Select permissions from list:
   - ✓ View Employees
   - ✓ Create Employees
   - ✓ Edit Employees
   - ✓ Delete Employees
   - ✓ View Attendance
   - ✓ Edit Attendance
   - ✓ Approve Vacations
   - ✓ Approve Excuses
3. Save changes

**Expected Results:**
- Permissions assigned to role
- Users with this role get these permissions
- Permission changes apply immediately (or after re-login)
- Audit log entry created

**Business Rules:**
- Verify permission granularity (module-level, action-level)
- Check permission inheritance

---

### TC-ROLE-003: Assign Role to User

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Edit user
2. Select role: `HR Manager`
3. Save changes

**Expected Results:**
- Role assigned to user
- User inherits all role permissions
- Can access permitted modules
- Cannot access restricted modules
- Audit log entry created

---

### TC-ROLE-004: Test Permission Enforcement - View Access

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Create role with "View Employees" only
2. Assign to test user
3. Login as test user
4. Navigate to Employees page

**Expected Results:**
- Can view employees list
- Can view employee details
- Cannot see "Add", "Edit", "Delete" buttons
- Buttons disabled or hidden based on permissions

---

### TC-ROLE-005: Test Permission Enforcement - Create Access

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Create role WITHOUT "Create Employees" permission
2. Assign to test user
3. Login as test user
4. Attempt to access create employee page

**Expected Results:**
- "Add Employee" button not visible
- Direct URL navigation to create page blocked (403)
- Error message: "You don't have permission to perform this action"
- Redirected or error page shown

---

### TC-ROLE-006: Test Permission Enforcement - Edit Access

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Create role with "View Employees" but NOT "Edit Employees"
2. Assign to test user
3. Login as test user
4. View employee details

**Expected Results:**
- "Edit" button not visible
- Direct URL to edit page blocked (403)
- Cannot modify employee data

---

### TC-ROLE-007: Test Permission Enforcement - Delete Access

**Priority:** Critical
**Type:** Functional

**Test Steps:**
1. Create role WITHOUT "Delete Employees" permission
2. Login as test user
3. View employee list/details

**Expected Results:**
- "Delete" button not visible or disabled
- Confirmation modal doesn't appear
- Delete action blocked by API (403)

---

### TC-ROLE-008: Test Multiple Roles (If Supported)

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Assign multiple roles to user
2. Verify permission combination

**Expected Results:**
- User gets union of all permissions from all roles
- No permission conflicts
- All permitted actions available

**Note:** Verify if system supports multiple roles per user

---

### TC-ROLE-009: Remove Role from User

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. User has role assigned
2. Edit user and remove role
3. Save changes

**Expected Results:**
- Role removed from user
- Permissions revoked
- User cannot access previously permitted resources
- Takes effect immediately (or after re-login)
- Audit log entry created

---

### TC-ROLE-010: Delete Role

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Attempt to delete role with assigned users
2. Attempt to delete role with no users

**Expected Results:**
- Cannot delete if users assigned (warning)
- Can delete if no users
- Confirmation dialog
- Audit log entry created

---

### TC-ROLE-011: Default Role Assignment

**Priority:** Low
**Type:** Functional

**Test Steps:**
1. Create new user without selecting role
2. Verify default role assignment

**Expected Results:**
- System assigns default role (e.g., "Employee")
- Or requires role selection (no default)
- User has basic permissions

---

## 11. Audit Log System

### TC-AUDIT-001: User Creation Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Create new user
2. Navigate to Audit Logs
3. Search for user creation event

**Expected Results:**
- Audit log entry exists with:
  - Event Type: User Created
  - User: Current logged-in user (actor)
  - Entity Type: User
  - Entity ID: New user ID
  - Timestamp: Current time
  - Old Values: null
  - New Values: JSON with user data
  - IP Address: User's IP
  - User Agent: Browser info

---

### TC-AUDIT-002: User Update Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Edit existing user (change email and role)
2. Save changes
3. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: User Updated
  - Old Values: Previous email and role
  - New Values: New email and role
  - Changed fields highlighted
  - All metadata captured

---

### TC-AUDIT-003: User Deletion Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Delete user
2. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: User Deleted
  - Old Values: Complete user data before deletion
  - New Values: null
  - Deletion timestamp and actor

---

### TC-AUDIT-004: Login Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Login to system
2. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: User Logged In
  - User: Logged-in user
  - Timestamp
  - IP Address
  - User Agent
  - Success status

---

### TC-AUDIT-005: Failed Login Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Attempt login with wrong password
2. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: Login Failed
  - Username attempted
  - Reason: Invalid credentials
  - IP Address
  - Timestamp
  - User Agent

---

### TC-AUDIT-006: Logout Audit

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Logout from system
2. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: User Logged Out
  - User
  - Timestamp

---

### TC-AUDIT-007: Attendance Record Creation Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Create attendance record
2. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: Attendance Created
  - Entity: Attendance record
  - Employee ID
  - Check-in/out times
  - Created by user

---

### TC-AUDIT-008: Attendance Record Update Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Edit attendance record (change times)
2. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: Attendance Updated
  - Old Values: Original times
  - New Values: Updated times
  - Modified by user
  - Reason for change (if provided)

---

### TC-AUDIT-009: Vacation Approval Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Approve vacation request
2. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: Vacation Approved
  - Vacation details
  - Approved by user
  - Status change: Pending → Approved

---

### TC-AUDIT-010: Excuse Rejection Audit

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Reject excuse request
2. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: Excuse Rejected
  - Excuse details
  - Rejected by user
  - Rejection reason
  - Status change: Pending → Rejected

---

### TC-AUDIT-011: Role Permission Change Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Edit role permissions
2. Add/remove permissions
3. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: Role Updated
  - Old Permissions: List of previous permissions
  - New Permissions: List of updated permissions
  - Permissions added
  - Permissions removed

---

### TC-AUDIT-012: Password Change Audit

**Priority:** High
**Type:** Functional

**Test Steps:**
1. User changes password
2. Check audit log

**Expected Results:**
- Audit log entry with:
  - Event Type: Password Changed
  - User ID
  - Timestamp
  - Initiated by: Self or Admin
  - MustChangePassword flag status change

**Note:** Password values should NOT be logged (security)

---

### TC-AUDIT-013: Search Audit Logs

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Audit Logs page
2. Search by:
   - User
   - Date range
   - Event type
   - Entity type
3. Apply filters

**Expected Results:**
- Matching audit logs displayed
- Can combine multiple filters
- Results paginated
- Can view details of each log entry

---

### TC-AUDIT-014: Export Audit Logs

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Filter audit logs
2. Click "Export" button
3. Select format (Excel/PDF)

**Expected Results:**
- Audit logs exported successfully
- File downloaded
- Contains filtered records
- All relevant fields included
- Formatted for readability

---

### TC-AUDIT-015: Audit Log Retention

**Priority:** Low
**Type:** Non-Functional

**Test Steps:**
1. Verify audit log retention policy
2. Check if old logs are archived or deleted

**Expected Results:**
- Audit logs retained per policy (e.g., 1 year, 5 years)
- Archived logs accessible if needed
- Automatic cleanup based on retention rules

---

## 12. Reporting

### TC-REPORT-001: Daily Attendance Report

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Reports > Daily Attendance
2. Select date: Today
3. Select department filter (optional)
4. Click "Generate Report"

**Expected Results:**
- Report shows:
  - All employees
  - Present/Absent status
  - Check-in/out times
  - Late/Early indicators
  - Overtime hours
  - Summary statistics
- Can export to Excel/PDF

---

### TC-REPORT-002: Monthly Attendance Report

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Reports > Monthly Attendance
2. Select month and year
3. Select employee or department
4. Generate report

**Expected Results:**
- Report shows:
  - Calendar view or grid
  - Each day's status
  - Monthly totals:
    - Total present days
    - Total absent days
    - Total late days
    - Total vacation days
    - Total hours worked
    - Total overtime hours
- Can export report

---

### TC-REPORT-003: Employee Attendance Summary

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to employee details
2. View attendance summary section

**Expected Results:**
- Shows:
  - Current month statistics
  - Attendance percentage
  - Punctuality rate
  - Total hours
  - Overtime hours
  - Recent attendance records

---

### TC-REPORT-004: Vacation Balance Report

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Reports > Vacation Balance
2. Select department/employee
3. Generate report

**Expected Results:**
- Report shows:
  - Employee name
  - Vacation types
  - Total balance
  - Used days
  - Remaining days
  - Pending requests
- Can export report

---

### TC-REPORT-005: Overtime Report

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Navigate to Reports > Overtime
2. Select date range
3. Select filters
4. Generate report

**Expected Results:**
- Report shows:
  - Employee name
  - Date
  - Regular hours
  - Overtime hours
  - Overtime type (weekday, weekend, holiday)
  - Overtime pay calculation
  - Department totals
- Can export report

---

### TC-REPORT-006: Late Arrivals Report

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Reports > Late Arrivals
2. Select date range
3. Generate report

**Expected Results:**
- Report shows:
  - Employee name
  - Date
  - Expected time
  - Actual time
  - Late minutes
  - Excuse status
  - Frequency count
- Can filter by department
- Can export report

---

### TC-REPORT-007: Absence Report

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Reports > Absences
2. Select date range
3. Generate report

**Expected Results:**
- Report shows:
  - Employee name
  - Absence dates
  - Absence count
  - Excuse/Vacation status
  - Department breakdown
- Can export report

---

### TC-REPORT-008: Department Attendance Summary

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Navigate to Reports > Department Summary
2. Select department
3. Select date range
4. Generate report

**Expected Results:**
- Report shows:
  - Department name
  - Total employees
  - Attendance statistics
  - Average attendance rate
  - Top performers
  - Attendance trends
- Comparison with other departments
- Can export report

---

### TC-REPORT-009: Custom Report Builder (If Available)

**Priority:** Low
**Type:** Functional

**Test Steps:**
1. Navigate to Custom Reports
2. Select fields to include
3. Set filters and grouping
4. Generate report

**Expected Results:**
- Custom report generated based on selections
- Can save report configuration
- Can schedule report
- Can export report

---

### TC-REPORT-010: Export Report to Excel

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Generate any report
2. Click "Export to Excel"

**Expected Results:**
- Excel file downloaded
- Data matches report display
- Formatting preserved
- Headers included
- Ready for analysis

---

### TC-REPORT-011: Export Report to PDF

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Generate any report
2. Click "Export to PDF"

**Expected Results:**
- PDF file downloaded
- Professional formatting
- Company logo/header (if configured)
- Page numbers
- Data accurate
- Readable layout

---

## 13. Localization

### TC-LOC-001: Switch Language to Arabic

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Login to system
2. Click language switcher
3. Select "العربية" (Arabic)

**Expected Results:**
- Entire UI switches to Arabic
- Text direction changes to RTL (Right-to-Left)
- Navigation menu in Arabic
- Form labels in Arabic
- Buttons in Arabic
- Date formats adjusted
- Numbers in Arabic numerals (if configured)
- Layout adjusts for RTL

---

### TC-LOC-002: Switch Language to English

**Priority:** High
**Type:** Functional

**Test Steps:**
1. System in Arabic
2. Click language switcher
3. Select "English"

**Expected Results:**
- UI switches to English
- Text direction LTR (Left-to-Right)
- All content in English
- Layout adjusts for LTR

---

### TC-LOC-003: Translation Coverage - Forms

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Switch to Arabic
2. Navigate through all forms:
   - Create/Edit User
   - Create/Edit Employee
   - Create/Edit Department
   - Create/Edit Shift
   - Attendance forms
   - Vacation request form
   - Excuse request form

**Expected Results:**
- All form labels translated
- All placeholders translated
- All buttons translated
- All validation messages translated
- No English fallback text visible

---

### TC-LOC-004: Translation Coverage - Navigation

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Switch to Arabic
2. Check all navigation items

**Expected Results:**
- All menu items translated
- All submenu items translated
- Breadcrumbs translated
- Page titles translated

---

### TC-LOC-005: Translation Coverage - Tables

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Switch to Arabic
2. View all data tables:
   - Users table
   - Employees table
   - Departments table
   - Attendance table
   - Vacations table

**Expected Results:**
- Column headers translated
- Action buttons translated
- Status badges translated
- Pagination controls translated
- Empty state messages translated

---

### TC-LOC-006: Translation Coverage - Notifications

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Switch to Arabic
2. Perform actions that trigger notifications:
   - Create user (success)
   - Delete with error (error)
   - Validation error (warning)

**Expected Results:**
- All notification messages translated
- Success messages in Arabic
- Error messages in Arabic
- Warning messages in Arabic

---

### TC-LOC-007: Translation Coverage - Validation Messages

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Switch to Arabic
2. Submit forms with validation errors:
   - Required field missing
   - Invalid email format
   - Password mismatch
   - Date range error

**Expected Results:**
- All validation messages in Arabic
- Field-specific errors translated
- Form-level errors translated

---

### TC-LOC-008: Translation Coverage - Change Password Form

**Priority:** High
**Type:** Functional

**Test Steps:**
1. Switch to Arabic
2. Navigate to change password page
3. Review all text

**Expected Results:**
- Page title: "تغيير كلمة المرور مطلوب"
- Message: "لأسباب أمنية، يجب عليك تغيير كلمة المرور قبل المتابعة."
- Field labels translated:
  - "كلمة المرور الحالية"
  - "كلمة المرور الجديدة"
  - "تأكيد كلمة المرور الجديدة"
- Password requirements in Arabic
- Buttons translated
- Validation messages in Arabic

---

### TC-LOC-009: Date Format Localization

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Switch between languages
2. Check date displays

**Expected Results:**
- English: MM/DD/YYYY or DD/MM/YYYY (based on config)
- Arabic: Dates in Arabic format
- Date pickers localized
- Calendar in appropriate language
- Month names translated

---

### TC-LOC-010: Number Format Localization

**Priority:** Low
**Type:** Functional

**Test Steps:**
1. Switch to Arabic
2. View numerical data (hours, counts, etc.)

**Expected Results:**
- Numbers in Eastern Arabic numerals (٠ ١ ٢ ٣) or Western (0 1 2 3) based on config
- Decimal separators correct
- Thousands separators correct

---

### TC-LOC-011: Mixed Content (Names, Codes)

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Switch to Arabic
2. View data with mixed content (e.g., employee names in English, UI in Arabic)

**Expected Results:**
- UI elements in Arabic
- Data content displays as entered (may be English)
- No text overlap or layout issues
- Proper handling of mixed LTR/RTL text

---

### TC-LOC-012: Language Preference Persistence

**Priority:** Medium
**Type:** Functional

**Test Steps:**
1. Switch to Arabic
2. Logout
3. Login again

**Expected Results:**
- Language preference saved
- System loads in Arabic
- Or loads in default language (verify business rule)

---

## 14. Performance & Security

### TC-PERF-001: Page Load Performance

**Priority:** Medium
**Type:** Non-Functional

**Test Steps:**
1. Clear browser cache
2. Navigate to main pages
3. Measure load times

**Expected Results:**
- Dashboard loads in < 2 seconds
- List pages load in < 3 seconds
- Detail pages load in < 2 seconds
- No excessive API calls
- Efficient data fetching

---

### TC-PERF-002: Large Dataset Handling

**Priority:** Medium
**Type:** Non-Functional

**Test Steps:**
1. Navigate to page with 1000+ records (employees, attendance)
2. Test pagination, search, filtering

**Expected Results:**
- Pagination works smoothly
- Search returns results quickly (< 1 second)
- Filters apply without lag
- No browser freezing
- Server-side pagination used

---

### TC-PERF-003: Concurrent Users

**Priority:** Medium
**Type:** Non-Functional

**Test Steps:**
1. Simulate 50+ concurrent users
2. Perform various operations

**Expected Results:**
- System remains responsive
- No performance degradation
- Database handles load
- No connection errors
- Response times acceptable

---

### TC-SEC-001: SQL Injection Prevention

**Priority:** Critical
**Type:** Security

**Test Steps:**
1. Attempt SQL injection in search fields:
   - `' OR '1'='1`
   - `'; DROP TABLE Users;--`
2. Test in various input fields

**Expected Results:**
- Input sanitized
- SQL injection attempts blocked
- No database errors
- No unauthorized data access
- Proper error handling (no SQL error details exposed)

---

### TC-SEC-002: XSS Prevention

**Priority:** Critical
**Type:** Security

**Test Steps:**
1. Attempt XSS in text fields:
   - `<script>alert('XSS')</script>`
   - `<img src=x onerror=alert('XSS')>`
2. Submit and view data

**Expected Results:**
- Scripts not executed
- HTML encoded properly
- No popup alerts
- Data displayed safely

---

### TC-SEC-003: CSRF Protection

**Priority:** High
**Type:** Security

**Test Steps:**
1. Attempt cross-site request forgery
2. Try to submit forms without proper tokens

**Expected Results:**
- CSRF tokens validated
- Unauthorized requests blocked
- Proper error response

---

### TC-SEC-004: Authentication Token Security

**Priority:** Critical
**Type:** Security

**Test Steps:**
1. Login and capture token
2. Logout
3. Attempt to use old token

**Expected Results:**
- Old token invalidated
- Unauthorized error (401)
- Cannot access protected resources

---

### TC-SEC-005: Password Storage

**Priority:** Critical
**Type:** Security

**Test Steps:**
1. Create user with password
2. Check database

**Expected Results:**
- Password stored as hash (not plain text)
- Strong hashing algorithm used (bcrypt, PBKDF2, etc.)
- Salt used
- Cannot reverse engineer password

---

### TC-SEC-006: Session Timeout Security

**Priority:** High
**Type:** Security

**Test Steps:**
1. Login
2. Wait for timeout period
3. Attempt to perform action

**Expected Results:**
- Session expired
- Must re-authenticate
- Sensitive data cleared
- Redirect to login

---

### TC-SEC-007: Sensitive Data Exposure

**Priority:** Critical
**Type:** Security

**Test Steps:**
1. Check API responses
2. Check error messages
3. Check client-side code

**Expected Results:**
- No sensitive data in responses (passwords, tokens)
- Error messages don't reveal system details
- No sensitive data in logs
- HTTPS used for all communications

---

### TC-SEC-008: File Upload Security

**Priority:** High
**Type:** Security

**Test Steps:**
1. Attempt to upload malicious files
2. Upload executable files (.exe, .sh)
3. Upload oversized files

**Expected Results:**
- File type validation
- File size limits enforced
- Files scanned (if antivirus integration)
- Uploaded files stored securely
- Cannot execute uploaded files

---

### TC-SEC-009: API Authorization

**Priority:** Critical
**Type:** Security

**Test Steps:**
1. Login as user with limited permissions
2. Attempt to call restricted API endpoints directly

**Expected Results:**
- API validates permissions
- Unauthorized requests blocked (403)
- Cannot bypass frontend restrictions
- All endpoints protected

---

### TC-SEC-010: Audit Log Tampering Prevention

**Priority:** High
**Type:** Security

**Test Steps:**
1. Attempt to modify audit log records
2. Attempt to delete audit logs

**Expected Results:**
- Audit logs immutable
- Cannot be edited or deleted (except by system admin with proper authorization)
- Tampering attempts logged
- Database constraints prevent modification

---

## 15. Edge Cases & Negative Testing

### TC-EDGE-001: Special Characters in Input

**Priority:** Medium
**Type:** Negative Testing

**Test Steps:**
1. Enter special characters in various fields:
   - Name: `@#$%^&*()`
   - Email: `test@#$.com`
   - Code: `!!!###`

**Expected Results:**
- Proper validation
- Special characters handled or rejected appropriately
- No system errors
- Clear validation messages

---

### TC-EDGE-002: Very Long Input Strings

**Priority:** Medium
**Type:** Negative Testing

**Test Steps:**
1. Enter extremely long strings (1000+ characters) in fields
2. Submit form

**Expected Results:**
- Max length validation enforced
- Input truncated or rejected
- No database errors
- User friendly error message

---

### TC-EDGE-003: Null/Empty Values

**Priority:** Medium
**Type:** Negative Testing

**Test Steps:**
1. Submit forms with empty required fields
2. Send null values in API requests

**Expected Results:**
- Required field validation
- Cannot submit with empty required fields
- API rejects null values appropriately
- Clear error messages

---

### TC-EDGE-004: Boundary Values

**Priority:** Medium
**Type:** Negative Testing

**Test Cases:**
- Grace period: 0 minutes, 1 minute, 59 minutes, 60 minutes
- Working hours: 0 hours, 0.1 hours, 24 hours, 25 hours
- Vacation days: 0 days, 1 day, 365 days, 366 days

**Expected Results:**
- Boundary values handled correctly
- Validation at boundaries
- No calculation errors

---

### TC-EDGE-005: Concurrent Data Modification

**Priority:** Medium
**Type:** Edge Case

**Test Steps:**
1. User A opens employee edit page
2. User B opens same employee edit page
3. User A saves changes
4. User B saves changes

**Expected Results:**
- Optimistic/Pessimistic locking handled
- Conflict detection
- Warning to User B about concurrent modification
- Data integrity maintained

---

### TC-EDGE-006: Network Interruption

**Priority:** Medium
**Type:** Edge Case

**Test Steps:**
1. Start form submission
2. Disconnect network during submission
3. Reconnect network

**Expected Results:**
- User-friendly error message
- Data not lost (if possible)
- Can retry submission
- No partial data saved

---

### TC-EDGE-007: Browser Back Button

**Priority:** Low
**Type:** Edge Case

**Test Steps:**
1. Submit form successfully
2. Click browser back button

**Expected Results:**
- Handled gracefully
- No duplicate submission
- Appropriate page state
- User informed if data may be lost

---

### TC-EDGE-008: Multiple Tab Sessions

**Priority:** Low
**Type:** Edge Case

**Test Steps:**
1. Login in Tab 1
2. Open Tab 2 (same browser)
3. Perform actions in both tabs

**Expected Results:**
- Session shared between tabs (or separate, verify business rule)
- Logout in one tab affects other
- No session conflicts
- Data consistency maintained

---

## Test Execution Guidelines

### Test Prioritization

**Critical (P0):** Must pass before release
- Authentication and login
- Permission enforcement
- Data creation (User, Employee, Attendance)
- Attendance calculations
- Must Change Password flow

**High (P1):** Should pass before release
- Edit/Delete operations
- Approval workflows
- Reporting accuracy
- Audit logging

**Medium (P2):** Can be deferred if necessary
- UI/UX improvements
- Advanced filters
- Export features

**Low (P3):** Nice to have
- Edge cases
- Performance optimizations

### Test Environment Requirements

1. **Database:** Clean database with seed data before each test cycle
2. **Test Data:** Use consistent test data across test cases
3. **Browser:** Test on Chrome, Firefox, Edge (latest versions)
4. **Screen Resolutions:** Test responsive design (Desktop, Tablet, Mobile)
5. **Languages:** Test both English and Arabic interfaces

### Defect Reporting

When reporting defects, include:
- **Test Case ID:** Reference test case
- **Steps to Reproduce:** Exact steps taken
- **Expected Result:** What should happen
- **Actual Result:** What actually happened
- **Screenshots/Videos:** Visual evidence
- **Browser/Environment:** Testing environment details
- **Severity:** Critical, High, Medium, Low
- **Logs:** Console errors, API responses, audit logs

### Test Metrics to Track

- **Total Test Cases:** 200+
- **Test Cases Executed:** Track daily progress
- **Pass Rate:** Target > 95%
- **Defects Found:** Log all issues
- **Defects Fixed:** Track resolution
- **Test Coverage:** Ensure all modules covered
- **Automation Coverage:** Plan for automation (if applicable)

---

## Appendix A: Test Data Sets

### Users
```json
[
  {"username": "systemadmin", "password": "TempP@ssw0rd123!", "role": "SystemAdmin"},
  {"username": "tariq.albalushi", "password": "TempPass@123", "role": "Manager", "mustChangePassword": true},
  {"username": "test.user1", "password": "User@123", "role": "Employee"},
  {"username": "hr.manager", "password": "HR@123", "role": "HR Manager"}
]
```

### Employees
```json
[
  {"code": "EMP001", "name": "Ahmed Mohammed", "department": "IT", "shift": "Morning"},
  {"code": "EMP002", "name": "Fatima Ali", "department": "HR", "shift": "Morning"},
  {"code": "EMP003", "name": "Tariq Albalushi", "department": "Finance", "shift": "Afternoon"}
]
```

### Shifts
```json
[
  {"code": "MORNING", "start": "08:00", "end": "16:00", "graceIn": 15, "graceOut": 15},
  {"code": "AFTERNOON", "start": "14:00", "end": "22:00", "graceIn": 15, "graceOut": 15},
  {"code": "NIGHT", "start": "22:00", "end": "06:00", "graceIn": 15, "graceOut": 15}
]
```

---

## Appendix B: Business Rules Reference

### Attendance Calculation Rules
1. **Late:** Check-in > (Shift Start + Grace Period In)
2. **Early Departure:** Check-out < (Shift End - Grace Period Out)
3. **Overtime:** Total Hours > Required Shift Hours
4. **Absent:** No check-in/check-out on scheduled workday
5. **Grace Period:** Allows flexibility without penalty

### Vacation Rules
1. Cannot request vacation without sufficient balance
2. Cannot overlap with existing approved vacation
3. Max days per request enforced
4. Approval required before balance deduction
5. Cancellation returns balance

### Excuse Rules
1. Cannot exceed late/early time
2. Cannot exceed policy limits (per request, per month)
3. Documentation required if policy specifies
4. Approval required before deduction from late/early time
5. Excuse types have different rules

### Permission Rules
1. View permission required to see data
2. Create permission required to add new records
3. Edit permission required to modify
4. Delete permission required to remove
5. Approve permission required for workflows

### Password Rules
1. Minimum 8 characters
2. Must contain uppercase letter
3. Must contain lowercase letter
4. Must contain digit
5. Must contain special character
6. Cannot reuse last 5 passwords

---

**End of Document**

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-05 | System Analyst | Initial document creation |

**Review and Approval:**

- [ ] QA Manager
- [ ] Development Lead
- [ ] Project Manager

**Next Review Date:** 2025-11-01
