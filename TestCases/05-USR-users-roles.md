# TC-USR: Users & Roles — Test Cases

## Module Overview

User and Role management controls who can access the system and what they can do. This module covers user CRUD with password policies, role CRUD with fine-grained permission assignment (70+ resources, 26 actions, 223+ authorization policies), and the critical System User Protection feature that prevents editing/deleting seeded admin accounts.

**Admin Pages**: `/users`, `/users/create`, `/users/:id/view`, `/users/:id/edit`, `/roles`, `/roles/create`, `/roles/:id/view`, `/roles/:id/edit`
**API Endpoints**: `/api/v1/users`, `/api/v1/roles`, `/api/v1/permissions`

---

## Test Environment

| Item | Value |
|------|-------|
| Backend | http://localhost:5099 |
| Admin Portal | http://localhost:4200 |

### Test Users

| Role | Email | Notes |
|------|-------|-------|
| System Admin | systemadmin@{domain} | IsSystemUser=true, cannot be edited/deleted |
| TecAxle Admin | tecaxleadmin@{domain} | IsSystemUser=true |
| Admin User | ahmed.rashid@company.com | Has admin role |
| Regular User | salma.khaldi@company.com | Has employee role |

---

## Test Cases

### A. User Form Fields & Validation

#### TC-USR-001: Create user page renders with all fields
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /users/create |
| **Role** | Admin |

**Preconditions:**
1. Logged in as Admin user

**Steps:**
1. Navigate to /users/create

**Expected Results:**
- Form renders with fields: username, email, phone, password, confirmPassword, preferredLanguage, employeeId, roleIds, branchIds
- Employee selection dropdown available
- Role multi-select available
- Branch multi-select available

---

#### TC-USR-002: Username validation — pattern and length
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /users/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /users/create
2. Test various username values

**Boundary Values:**

| Input | Valid? | Reason |
|-------|--------|--------|
| `""` (empty) | No | Required field |
| `john.doe` | Yes | Letters, dot |
| `john_doe-123` | Yes | Letters, underscore, hyphen, digits |
| `john doe` | No | Space not allowed — pattern `^[a-zA-Z0-9._-]+$` |
| `john@doe` | No | @ not allowed |
| `john!doe` | No | ! not allowed |
| `a` (1 char) | Yes | No minimum length on frontend |
| 101 chars | No | Exceeds maxLength(100) |
| 100 chars | Yes | At max length |

**Expected Results:**
- Invalid patterns show error: "letters, numbers, dots, underscores, hyphens"
- Empty shows: "required"
- Exceeding 100 chars shows length error

---

#### TC-USR-003: Email validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /users/create |
| **Role** | Admin |

**Boundary Values:**

| Input | Valid? |
|-------|--------|
| `""` (empty) | No — "required" |
| `test@example.com` | Yes |
| `invalid-email` | No — "valid format" |
| `test@` | No |
| `@example.com` | No |
| 201 chars | No — maxLength(200) |

---

#### TC-USR-004: Password validation — complexity requirements
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /users/create |
| **Role** | Admin |

**Pattern**: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$`

**Boundary Values:**

| # | Password | Valid? | Missing Requirement |
|---|----------|--------|-------------------|
| 1 | `Abc1234!` (8 chars) | Yes | All requirements met |
| 2 | `Abc123!` (7 chars) | No | Too short |
| 3 | `abcdefg1!` | No | No uppercase letter |
| 4 | `ABCDEFG1!` | No | No lowercase letter |
| 5 | `Abcdefgh!` | No | No digit |
| 6 | `Abcdefg12` | No | No special character |
| 7 | `MyP@ssw0rd` (10 chars) | Yes | All met |
| 8 | 128 chars (valid pattern) | Yes | At maxLength |
| 9 | 129 chars | No | Exceeds maxLength(128) |
| 10 | `a` | No | Too short + missing types |

**Expected Results:**
- Invalid passwords show: "8+ chars, lowercase, uppercase, digit, special"
- minLength(8), maxLength(128)

---

#### TC-USR-005: Confirm password must match
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /users/create |
| **Role** | Admin |

**Steps:**
1. Enter password: "MyP@ssw0rd"
2. Enter confirmPassword: "DifferentP@ss1"
3. Observe validation

**Expected Results:**
- Error: passwords do not match
- Form cannot be submitted

---

#### TC-USR-006: Preferred language must be "en" or "ar"
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /users/create |
| **Role** | Admin |

**Steps:**
1. Select language from dropdown

**Expected Results:**
- Only "en" (English) and "ar" (Arabic) options available
- Required field — cannot submit without selection
- Error if somehow invalid: "must be 'en' or 'ar'"

---

#### TC-USR-007: At least one role required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /users/create |
| **Role** | Admin |

**Steps:**
1. Fill all required fields
2. Do NOT select any role
3. Submit form

**Expected Results:**
- Error: "at least one role required"
- User not created

---

#### TC-USR-008: At least one branch required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /users/create |
| **Role** | Admin |

**Steps:**
1. Fill all required fields including role
2. Do NOT select any branch
3. Submit form

**Expected Results:**
- Error: "at least one branch required"
- User not created

---

#### TC-USR-009: Employee ID required for non-SystemAdmin
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /users/create |
| **Role** | Admin |

**Steps:**
1. Fill all fields but do NOT select an employee
2. Submit form

**Expected Results:**
- Error: "required for non-SystemAdmin users"
- User not created

---

#### TC-USR-010: Employee selection auto-fills username and email
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /users/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /users/create
2. Select an employee from the dropdown (e.g., "Ahmed Al-Rashid")

**Expected Results:**
- Username field auto-populated from employee data
- Email field auto-populated from employee email
- Both fields may become read-only after auto-fill

---

#### TC-USR-011: Successful user creation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Integration |
| **Page** | /users/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /users/create
2. Select employee from dropdown
3. Enter valid password: "NewUser@2026!"
4. Confirm password: "NewUser@2026!"
5. Select language: "en"
6. Select at least one role
7. Select at least one branch
8. Submit

**Expected Results:**
- Success notification displayed
- User created in database
- Redirect to user list or view page
- New user can login with provided credentials

---

#### TC-USR-012: Phone field optional with max length
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /users/create |
| **Role** | Admin |

**Boundary Values:**

| Input | Valid? |
|-------|--------|
| empty | Yes — optional |
| `+1234567890` | Yes |
| 21 chars | No — maxLength(20) |

---

### B. System User Protection

#### TC-USR-020: IsSystemUser — edit button hidden in user table
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /users |
| **Role** | Admin |

**Preconditions:**
1. System users exist (tecaxleadmin, systemadmin) with IsSystemUser=true

**Steps:**
1. Navigate to /users
2. Find "systemadmin" in the user table
3. Check the Actions column

**Expected Results:**
- Edit button/icon is NOT visible for system users
- Edit action not available in the row actions dropdown
- Regular users DO show the edit button

---

#### TC-USR-021: IsSystemUser — delete button hidden in user table
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /users |
| **Role** | Admin |

**Steps:**
1. Navigate to /users
2. Find "systemadmin" or "tecaxleadmin" in the table
3. Check Actions column

**Expected Results:**
- Delete button/icon NOT visible for system users
- Regular users DO show the delete button

---

#### TC-USR-022: API rejects update for IsSystemUser=true
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Admin |

**Steps:**
1. Get the user ID of "systemadmin"
2. Call `PUT /api/v1/users/{id}` with update payload

**Expected Results:**
- API returns error (403 or 400)
- Error message indicates system user cannot be modified
- No changes saved to database

---

#### TC-USR-023: API rejects delete for IsSystemUser=true
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Admin |

**Steps:**
1. Get the user ID of "systemadmin"
2. Call `DELETE /api/v1/users/{id}`

**Expected Results:**
- API returns error
- System user not deleted

---

#### TC-USR-024: System admin form fields disabled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /users/:id/edit |
| **Role** | Admin |

**Preconditions:**
1. Navigate to edit page for "systemadmin" user (if URL accessible)

**Steps:**
1. Open the edit user page for the system admin

**Expected Results:**
- Fields DISABLED: phone, password, confirmPassword, preferredLanguage, roleIds, branchIds, isActive
- Only MustChangePassword toggle may be editable
- Warning message displayed: "users.system_admin_cannot_be_edited"

---

#### TC-USR-025: Only MustChangePassword editable for system user
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /users/:id/edit |
| **Role** | Admin |

**Steps:**
1. On system admin edit page (if accessible)
2. Attempt to toggle MustChangePassword
3. Submit

**Expected Results:**
- MustChangePassword toggle responds to clicks
- Other fields remain disabled
- Only this field saved on submit

---

#### TC-USR-026: Both seeded admins have IsSystemUser=true
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /users |
| **Role** | Admin |

**Steps:**
1. Navigate to /users
2. Find "tecaxleadmin" and "systemadmin"

**Expected Results:**
- Both users present in the table
- Both have IsSystemUser=true (no edit/delete buttons)
- Both have SystemAdmin role assigned
- Both have access to all branches

---

#### TC-USR-027: Navigate directly to system user edit URL
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /users/:id/edit |
| **Role** | Admin |

**Steps:**
1. Get system user ID
2. Navigate directly to /users/{systemUserId}/edit

**Expected Results:**
- Page loads but with disabled fields and warning message
- OR redirected away with error
- Cannot make unauthorized changes

---

### C. User List & Table

#### TC-USR-030: User list page renders with data table
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /users |
| **Role** | Admin |

**Steps:**
1. Navigate to /users

**Expected Results:**
- Data table renders with columns: Username, Email, Roles, Branches, Status, Actions
- Pagination controls visible
- Search field available
- Refresh button functional

---

#### TC-USR-031: User search by username/email
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /users |
| **Role** | Admin |

**Steps:**
1. Navigate to /users
2. Type "ahmed" in search field

**Expected Results:**
- Table filtered to show users matching "ahmed" in username or email
- Results update as you type (debounced)

---

#### TC-USR-032: User table actions — View, Edit, Delete
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /users |
| **Role** | Admin |

**Steps:**
1. Navigate to /users
2. Click View on a regular user → navigates to /users/:id/view
3. Click Edit on a regular user → navigates to /users/:id/edit
4. Click Delete on a regular user → confirmation dialog

**Expected Results:**
- View shows user details page
- Edit shows pre-populated form
- Delete shows confirmation dialog with user name
- After delete confirmation, user removed from list

---

#### TC-USR-033: Edit user — pre-populated fields
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /users/:id/edit |
| **Role** | Admin |

**Steps:**
1. Navigate to /users/:id/edit for a regular user

**Expected Results:**
- Username field pre-populated and DISABLED (cannot change)
- Email field pre-populated
- Phone pre-populated
- Password fields empty (not shown or optional for edit)
- Language, roles, branches pre-selected
- isActive toggle matches current state

---

#### TC-USR-034: View user page displays all information
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /users/:id/view |
| **Role** | Admin |

**Steps:**
1. Navigate to /users/:id/view

**Expected Results:**
- Username, email, phone displayed
- Assigned roles listed with badges
- Assigned branches listed
- Status badge (Active/Inactive)
- Created date, last login date
- Linked employee information (if any)

---

### D. Role CRUD

#### TC-USR-040: Role list page renders
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /roles |
| **Role** | Admin |

**Steps:**
1. Navigate to /roles

**Expected Results:**
- Data table with columns: Role Name, Permission Count, Status, Actions
- Seeded roles visible: SystemAdmin, Admin, Manager, Employee
- Create button available

---

#### TC-USR-041: Create role — name required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /roles/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /roles/create
2. Leave name empty
3. Try to submit

**Expected Results:**
- Error: name is required
- Role not created

---

#### TC-USR-042: Create role with permissions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Integration |
| **Page** | /roles/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /roles/create
2. Enter name: "Custom Manager"
3. Expand "Employees" permission group
4. Check "employee.read" and "employee.create"
5. Expand "Attendance" permission group
6. Check "attendance.read"
7. Submit

**Expected Results:**
- Role created successfully
- Redirect to role list/view
- Role has exactly 3 permissions assigned

---

### E. Permission Grid

#### TC-USR-043: Permissions grouped by resource category
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /roles/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /roles/create
2. Observe the permission grid

**Expected Results:**
- Permissions organized into collapsible groups (Employees, Attendance, Users, Vacations, etc.)
- Each group shows resource name and icon
- Groups sorted alphabetically
- Individual permissions show action (read, create, update, delete, etc.)

---

#### TC-USR-044: Permission search/filter
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /roles/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /roles/create
2. Type "employee" in permission search field

**Expected Results:**
- Only permission groups/items containing "employee" are shown
- Other groups are hidden
- Clear search restores all groups

---

#### TC-USR-045: Group-level select all / deselect all
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /roles/create |
| **Role** | Admin |

**Steps:**
1. Navigate to /roles/create
2. Click the group-level checkbox for "Employees" group

**Expected Results:**
- All permissions in the Employees group become checked
- Click again → all unchecked
- Partial selection shows indeterminate checkbox state

---

#### TC-USR-046: Cannot delete role assigned to active users
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /roles |
| **Role** | Admin |

**Preconditions:**
1. Role "Admin" is assigned to at least one user

**Steps:**
1. Navigate to /roles
2. Click Delete on "Admin" role
3. Confirm deletion

**Expected Results:**
- Error: cannot delete role that is assigned to active users
- Role not deleted
- List of affected users may be shown

---

#### TC-USR-047: Edit role — update permissions
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Integration |
| **Page** | /roles/:id/edit |
| **Role** | Admin |

**Steps:**
1. Navigate to /roles/:id/edit for a custom role
2. Add new permissions
3. Remove existing permissions
4. Submit

**Expected Results:**
- Role updated with new permission set
- Users with this role immediately affected
- Removed permissions no longer available to users

---

#### TC-USR-048: View role — permissions displayed
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /roles/:id/view |
| **Role** | Admin |

**Steps:**
1. Navigate to /roles/:id/view

**Expected Results:**
- Role name displayed
- All assigned permissions listed (grouped)
- Permission count shown
- Status badge

---

### F. Authorization Policies

#### TC-USR-050: Access users page without UserRead permission — blocked
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /users |
| **Role** | Employee (no admin permissions) |

**Preconditions:**
1. User has Employee role with NO user management permissions

**Steps:**
1. Login as employee
2. Navigate to /users

**Expected Results:**
- Redirected to /unauthorized
- OR page returns 403
- Users page not accessible

---

#### TC-USR-051: Access employee creation without EmployeeManagement — blocked
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /employees/create |
| **Role** | User without EmployeeManagement |

**Steps:**
1. Login as user without EmployeeManagement permission
2. Navigate to /employees/create

**Expected Results:**
- Redirected to /unauthorized
- Cannot access create employee page

---

#### TC-USR-052: Branch-scoped data isolation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /employees |
| **Role** | Admin with single branch |

**Preconditions:**
1. User has branch scope limited to Branch 101 (Headquarters) only

**Steps:**
1. Login as branch-limited user
2. Navigate to /employees
3. Observe employee list

**Expected Results:**
- Only employees from Branch 101 visible
- Branch 102-105 employees NOT shown
- API returns only branch-scoped data
- Branch filter may show only accessible branches

---

#### TC-USR-053: adminGuard required for user/role management
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /users, /roles |
| **Role** | Employee |

**Steps:**
1. Login as regular employee (no admin role)
2. Try to access /users
3. Try to access /roles

**Expected Results:**
- Both pages blocked by adminGuard
- Redirected to /unauthorized
- Navigation menu does NOT show Users or Roles items

---

#### TC-USR-054: API permission check — 403 on unauthorized access
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Authorization |
| **Page** | API |
| **Role** | Employee |

**Steps:**
1. Login as employee (limited permissions)
2. Call `GET /api/v1/users` (requires UserRead policy)

**Expected Results:**
- HTTP 403 Forbidden
- Error response with appropriate message

---

#### TC-USR-055: SystemAdmin role has all permissions
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Any |
| **Role** | SystemAdmin |

**Steps:**
1. Login as SystemAdmin
2. Access any admin page (users, roles, employees, attendance, etc.)
3. Access any API endpoint

**Expected Results:**
- All pages accessible
- All API endpoints return 200
- No permission-based restrictions
- All menu items visible in navigation

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. User Form Fields | 12 | 4 | 6 | 1 | 1 |
| B. System User Protection | 8 | 4 | 4 | 0 | 0 |
| C. User List & Table | 5 | 1 | 4 | 0 | 0 |
| D. Role CRUD | 3 | 2 | 1 | 0 | 0 |
| E. Permission Grid | 6 | 0 | 3 | 3 | 0 |
| F. Authorization Policies | 6 | 4 | 2 | 0 | 0 |
| **TOTAL** | **40** | **15** | **20** | **4** | **1** |
