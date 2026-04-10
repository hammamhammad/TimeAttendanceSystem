# TC-ORG: Organization Management (Branches, Departments, Employees) — Test Cases

## Module Overview

Organization Management is the structural backbone of TecAxle HRMS. It covers Branches (physical locations with GPS geofencing), Departments (hierarchical units within branches), and Employees (workforce records with full lifecycle data). All three entities are stored in the tenant's dedicated database and are scoped by branch-level access control.

**Admin Pages**:
- Branches: `/branches`, `/branches/create`, `/branches/:id/view`, `/branches/:id/edit`
- Departments: `/departments`, `/departments/create`, `/departments/:id/view`, `/departments/:id/edit`
- Employees: `/employees`, `/employees/create`, `/employees/:id/view`, `/employees/:id/edit`, `/employees/:id/change-shift`

**API Endpoints**:
- `GET/POST /api/v1/branches`, `GET/PUT/DELETE /api/v1/branches/{id}`
- `GET/POST /api/v1/departments`, `GET/PUT/DELETE /api/v1/departments/{id}`
- `GET/POST /api/v1/employees`, `GET/PUT/DELETE /api/v1/employees/{id}`

**Backend Handlers**: `CreateBranchCommandHandler`, `UpdateBranchCommandHandler`, `DeleteBranchCommandHandler`, `CreateDepartmentCommandHandler`, `UpdateDepartmentCommandHandler`, `DeleteDepartmentCommandHandler`, `CreateEmployeeCommandHandler`, `UpdateEmployeeCommandHandler`, `DeleteEmployeeCommandHandler`

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
| Platform Admin | (from master seed) | (from master seed) | `is_platform_user=true` in JWT |
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | IsSystemUser=true, all branch access |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Branch-scoped access |
| Employee | salma.khaldi@company.com | Emp@123! | Limited permissions |

---

## Test Cases

### A. Branch CRUD

#### TC-ORG-001: Branch list page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /branches |
| **Role** | System Admin |

**Preconditions:**
1. User is logged in with `branch.read` permission
2. At least one branch exists in the tenant database

**Steps:**
1. Navigate to /branches

**Expected Results:**
- Page header displays branch title (via i18n)
- UnifiedFilter shows search input, refresh button, and Add button
- DataTable renders with columns: Name, Code, Phone, Email, Status, Actions
- Pagination controls visible when data exceeds page size
- Branch data loads without errors (check Network tab)

---

#### TC-ORG-002: Create branch — all required fields submitted successfully
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to /branches/create
2. Enter code: "HQ" (valid: uppercase, 2 chars)
3. Enter name: "Headquarters"
4. Select timeZone: "Asia/Riyadh" from SearchableSelect
5. Leave isActive checked (default true)
6. Click a location on the interactive map (or enter latitude: 24.7136, longitude: 46.6753)
7. Verify geofenceRadiusMeters defaults to 100
8. Click Save

**Expected Results:**
- Branch created successfully
- Success notification displayed
- Redirect to /branches list
- New branch appears in the table with status "Active"
- API call: `POST /api/v1/branches` returns 201

---

#### TC-ORG-003: Branch code — required validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to /branches/create
2. Leave code field empty
3. Fill all other required fields
4. Click Save

**Expected Results:**
- Form does not submit
- Validation error displayed under code field: required message
- Save button remains enabled but form is invalid

---

#### TC-ORG-004: Branch code — minLength(2) boundary
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Enter code: "A" (1 character)
2. Fill all other required fields
3. Click Save

**Expected Results:**
- Validation error: minimum 2 characters required
- Form does not submit

---

#### TC-ORG-005: Branch code — maxLength(10) boundary
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Enter code: "ABCDEFGHIJK" (11 characters)
2. Observe field behavior

**Expected Results:**
- Input is truncated to 10 characters OR validation error displayed
- Code "ABCDEFGHIJ" (10 chars) is the maximum accepted value

---

#### TC-ORG-006: Branch code — uppercase enforcement
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Enter code: "hq01" (lowercase)
2. Tab out of the field

**Expected Results:**
- Code is either auto-converted to "HQ01" OR validation error requires uppercase
- Only uppercase letters and digits accepted

---

#### TC-ORG-007: Branch name — required and length validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Leave name empty → validation error (required)
2. Enter name: "A" (1 char) → validation error (minLength 2)
3. Enter name: 101-character string → truncated or error (maxLength 100)
4. Enter name: "HQ" (2 chars) → accepted

**Expected Results:**
- Empty: required validation error
- 1 char: minLength validation error
- 101 chars: maxLength enforcement
- 2 chars: passes validation

---

#### TC-ORG-008: Branch timeZone — required SearchableSelect
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Do not select any timezone
2. Fill all other required fields
3. Click Save

**Expected Results:**
- Validation error for timezone: required
- SearchableSelect shows TIMEZONE_OPTIONS list when opened
- Typing filters the timezone list (e.g., "Riyadh" narrows to "Asia/Riyadh")

---

#### TC-ORG-009: Branch latitude — boundary values
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Enter latitude: -91 → validation error (min -90)
2. Enter latitude: 91 → validation error (max 90)
3. Enter latitude: -90 → accepted (boundary)
4. Enter latitude: 90 → accepted (boundary)
5. Enter latitude: 24.713600 → accepted (6 decimal places)

**Expected Results:**
- Values outside [-90, 90] rejected
- Boundary values -90 and 90 accepted
- Decimal precision up to 6 places supported (step 0.000001)

---

#### TC-ORG-010: Branch longitude — boundary values
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Enter longitude: -181 → validation error (min -180)
2. Enter longitude: 181 → validation error (max 180)
3. Enter longitude: -180 → accepted (boundary)
4. Enter longitude: 180 → accepted (boundary)

**Expected Results:**
- Values outside [-180, 180] rejected
- Boundary values -180 and 180 accepted

---

#### TC-ORG-011: Branch geofenceRadiusMeters — boundary values
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Verify default value is 100
2. Enter 9 → validation error (min 10)
3. Enter 5001 → validation error (max 5000)
4. Enter 10 → accepted (min boundary)
5. Enter 5000 → accepted (max boundary)

**Expected Results:**
- Default: 100 meters
- Values outside [10, 5000] rejected
- Boundary values 10 and 5000 accepted

---

#### TC-ORG-012: Branch interactive map picker sets coordinates
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to /branches/create
2. Locate the Leaflet map component
3. Click on a location on the map (e.g., Riyadh city center)
4. Observe latitude and longitude fields

**Expected Results:**
- Map renders correctly with OpenStreetMap tiles
- Clicking on map places a marker at clicked location
- Latitude and longitude fields auto-populated with clicked coordinates
- Geofence circle drawn around the marker with configured radius
- Map is interactive: zoom, pan, and re-click to change location

---

#### TC-ORG-013: Branch view page shows readonly map with geofence
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /branches/:id/view |
| **Role** | System Admin |

**Preconditions:**
1. Branch exists with latitude, longitude, and geofenceRadiusMeters configured

**Steps:**
1. Navigate to /branches/{id}/view

**Expected Results:**
- Branch details displayed using DefinitionListComponent
- StatusBadgeComponent shows Active/Inactive status
- Map rendered in readonly mode showing branch location marker
- Geofence circle visible around marker with correct radius
- Map is non-interactive (no click-to-change)

---

#### TC-ORG-014: Branch edit — pre-populated fields and save
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /branches/:id/edit |
| **Role** | System Admin |

**Preconditions:**
1. Branch "HQ" exists with all fields populated

**Steps:**
1. Navigate to /branches/{id}/edit
2. Verify all fields pre-populated with existing values
3. Change name from "Headquarters" to "Main Office"
4. Click Save

**Expected Results:**
- All fields pre-populated correctly (code, name, timezone, coordinates, etc.)
- Map shows existing location with marker
- Update succeeds with success notification
- API call: `PUT /api/v1/branches/{id}` returns 200
- Branch list shows updated name

---

#### TC-ORG-015: Branch optional fields — phone, email, address, description
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Fill only required fields (code, name, timezone)
2. Leave phone, email, address, description empty
3. Click Save
4. Create another branch with all optional fields filled:
   - phone: "+966112345678"
   - email: "branch@company.com"
   - address: "King Fahd Road, Riyadh"
   - description: "Main headquarters branch"
5. Click Save

**Expected Results:**
- Both branches created successfully
- Optional fields are truly optional — no validation errors when empty
- Email field validates format when provided (e.g., "invalid" rejected, "valid@email.com" accepted)

---

#### TC-ORG-016: Branch isActive toggle defaults to true
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /branches/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to /branches/create
2. Observe the isActive checkbox state
3. Uncheck isActive
4. Fill required fields and save

**Expected Results:**
- isActive is checked (true) by default on create
- Saving with isActive=false creates an inactive branch
- Inactive branch shows "Inactive" status badge in list

---

### B. Department CRUD

#### TC-ORG-017: Department list page renders with tree view
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /departments |
| **Role** | System Admin |

**Preconditions:**
1. Departments exist with parent-child hierarchy

**Steps:**
1. Navigate to /departments

**Expected Results:**
- Department list renders with hierarchical tree view
- Parent departments show expand/collapse controls
- Child departments indented under parents
- Department info panel shows details when a department is selected
- Search/filter functionality available

---

#### TC-ORG-018: Create department — all fields
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /departments/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to /departments/create
2. Enter name: "Human Resources"
3. Enter nameAr: "الموارد البشرية"
4. Select branchId from SearchableSelect
5. Optionally select parentDepartmentId
6. Click Save

**Expected Results:**
- Department created successfully
- Success notification displayed
- Department appears in tree view under selected parent (or at root level)
- API call: `POST /api/v1/departments` returns 201

---

#### TC-ORG-019: Department name — required validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /departments/create |
| **Role** | System Admin |

**Steps:**
1. Leave name field empty
2. Fill branchId
3. Click Save

**Expected Results:**
- Validation error displayed for name: required
- Form does not submit

---

#### TC-ORG-020: Department parentDepartmentId — hierarchical selection
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /departments/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to /departments/create
2. Select branch "Headquarters"
3. Open parentDepartmentId SearchableSelect
4. Observe available parent departments

**Expected Results:**
- Only departments within the selected branch shown as parent options
- Selecting a parent creates a child department under it
- Leaving parentDepartmentId empty creates a root-level department
- Department info panel shows full hierarchy path (e.g., "Operations > Logistics > Shipping")

---

#### TC-ORG-021: Department — cannot create circular parent reference
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /departments/:id/edit |
| **Role** | System Admin |

**Preconditions:**
1. Department hierarchy: A > B > C (A is parent of B, B is parent of C)

**Steps:**
1. Navigate to /departments/{A}/edit
2. Try to set parentDepartmentId = C (which is A's grandchild)
3. Click Save

**Expected Results:**
- Backend rejects the update with validation error
- Error message indicates circular reference would be created
- Department hierarchy remains unchanged
- API returns 400 Bad Request

---

#### TC-ORG-022: Department view — hierarchy path and details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /departments/:id/view |
| **Role** | System Admin |

**Steps:**
1. Navigate to /departments/{id}/view for a child department

**Expected Results:**
- Department details displayed using DefinitionListComponent
- Hierarchy path shown (e.g., "Operations > Logistics")
- Branch name displayed
- Arabic name displayed
- Employee count shown
- Child departments listed (if any)

---

#### TC-ORG-023: Department edit — pre-populated and save
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /departments/:id/edit |
| **Role** | System Admin |

**Steps:**
1. Navigate to /departments/{id}/edit
2. Verify all fields pre-populated
3. Change nameAr to updated Arabic text
4. Click Save

**Expected Results:**
- All fields pre-populated (name, nameAr, branchId, parentDepartmentId)
- Update succeeds with success notification
- Tree view reflects updated data

---

### C. Employee Form Fields

#### TC-ORG-024: Create employee — all required fields submitted successfully
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to /employees/create
2. Select branchId: "Headquarters"
3. Enter employeeNumber: "EMP-001"
4. Enter firstName: "Mohammed"
5. Enter lastName: "Al-Rashid"
6. Enter dateOfBirth: "1990-01-15"
7. Enter hireDate: today's date
8. Enter jobTitle: "Software Engineer"
9. Enter email: "mohammed@company.com"
10. Select gender: "Male"
11. Select employmentStatus: "Active"
12. Click Save

**Expected Results:**
- Employee created successfully
- Success notification displayed
- Redirect to employee list or view page
- API call: `POST /api/v1/employees` returns 201

---

#### TC-ORG-025: Employee branchId — required and must be positive
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Do not select a branch
2. Fill all other required fields
3. Click Save

**Expected Results:**
- Validation error: "must be a valid positive number"
- Form does not submit
- branchId must be > 0

---

#### TC-ORG-026: Employee employeeNumber — required and pattern validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave employeeNumber empty → error: "required for identification"
2. Enter "AB" (2 chars, below min 3) → validation error
3. Enter "ABCDEFGHIJKLMNOPQRSTU" (21 chars, above max 20) → validation error
4. Enter "emp-001" (lowercase) → validation error (pattern: `^[A-Z0-9\-]{3,20}$`)
5. Enter "EMP 001" (space) → validation error (pattern violation)
6. Enter "EMP-001" → accepted
7. Enter "12345" → accepted (all digits valid)

**Expected Results:**
- Pattern `^[A-Z0-9\-]{3,20}$` enforced
- Only uppercase letters, digits, and hyphens allowed
- Length between 3 and 20 characters

---

#### TC-ORG-027: Employee employeeNumber — uniqueness
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employees/create |
| **Role** | System Admin |

**Preconditions:**
1. Employee with employeeNumber "EMP-001" already exists

**Steps:**
1. Navigate to /employees/create
2. Enter employeeNumber: "EMP-001"
3. Fill all other required fields
4. Click Save

**Expected Results:**
- Backend rejects with duplicate employee number error
- Error notification displayed
- API returns 400 or 409 Conflict

---

#### TC-ORG-028: Employee firstName — required, letters only, length boundaries
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave firstName empty → error: "required for employee identity"
2. Enter "A" (1 char) → validation error (minLength 2)
3. Enter 51-character string → validation error (maxLength 50)
4. Enter "Mohammed123" (contains digits) → validation error (letters only)
5. Enter "Mohammed" → accepted
6. Enter "Al" (2 chars, min boundary) → accepted

**Expected Results:**
- Required field with "required for employee identity" message
- Only letters accepted (including Arabic letters for localized input)
- Length between 2 and 50 characters

---

#### TC-ORG-029: Employee lastName — required, letters only, length boundaries
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave lastName empty → validation error (required)
2. Enter "X" (1 char) → validation error (minLength 2)
3. Enter 51-character string → validation error (maxLength 50)
4. Enter "Al-Rashid" → accepted (letters and hyphens)

**Expected Results:**
- Same validation rules as firstName
- Length between 2 and 50 characters

---

#### TC-ORG-030: Employee firstNameAr / lastNameAr — optional Arabic fields
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave firstNameAr and lastNameAr empty → no error (optional)
2. Enter firstNameAr: "محمد" → accepted (Arabic characters)
3. Enter 51-character Arabic string → validation error (maxLength 50)

**Expected Results:**
- Both fields optional
- Accept Arabic characters
- maxLength 50 enforced

---

#### TC-ORG-031: Employee nationalId — pattern validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave nationalId empty → no error (optional)
2. Enter "12345" (5 digits, below min 10) → validation error
3. Enter "123456789012345" (15 digits, above max 14) → validation error
4. Enter "1234567890" (10 digits) → accepted (min boundary)
5. Enter "12345678901234" (14 digits) → accepted (max boundary)
6. Enter "12345ABCDE" (contains letters) → validation error (digits only)

**Expected Results:**
- Pattern `^[0-9]{10,14}$` enforced
- Only digits, length between 10 and 14

---

#### TC-ORG-032: Employee email — valid format and maxLength
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Enter "invalid-email" → validation error (invalid email format)
2. Enter "user@" → validation error
3. Enter "user@company.com" → accepted
4. Enter 201-character email → validation error (maxLength 200)

**Expected Results:**
- Standard email format validation
- maxLength 200 enforced

---

#### TC-ORG-033: Employee phone — pattern validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave phone empty → no error (optional)
2. Enter "0123456789" → validation error (pattern requires leading non-zero or +)
3. Enter "+966512345678" → accepted
4. Enter "9665123456" → accepted
5. Enter "12345678901234567" (17 digits) → validation error (max 16 digits after country code)

**Expected Results:**
- Pattern `^[\+]?[1-9][\d]{0,15}$` enforced
- Optional field, but validated when provided

---

#### TC-ORG-034: Employee dateOfBirth — required, past only, age >= 16
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave dateOfBirth empty → error: "must be in past"
2. Enter tomorrow's date → validation error ("must be in past")
3. Enter today's date → validation error ("must be in past")
4. Calculate date exactly 15 years and 364 days ago → validation error ("at least 16 years old")
5. Calculate date exactly 16 years ago today → accepted (boundary: person turns 16 today)
6. Enter "1990-01-15" (well in the past, age ~36) → accepted

**Expected Results:**
- Required field
- Date must be strictly in the past
- Age calculation: `today.Year - dob.Year`, adjusted if birthday hasn't occurred yet this year
- Exactly 16 years old (birthday today): passes
- 15 years and 364 days old: fails

---

#### TC-ORG-035: Employee hireDate — required, cannot be in future
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave hireDate empty → validation error (required)
2. Enter tomorrow's date → validation error ("cannot be in future")
3. Enter today's date → accepted
4. Enter "2020-06-01" (past date) → accepted

**Expected Results:**
- Required field
- Date must be <= today
- Today's date is valid (boundary)

---

#### TC-ORG-036: Employee jobTitle — required with length boundaries
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave jobTitle empty → validation error (required)
2. Enter "A" (1 char) → validation error (minLength 2)
3. Enter 201-character string → validation error (maxLength 200)
4. Enter "Software Engineer" → accepted

**Expected Results:**
- Required, minLength 2, maxLength 200

---

#### TC-ORG-037: Employee departmentId — cascading from branch selection
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employees/create |
| **Role** | System Admin |

**Preconditions:**
1. Branch "Headquarters" has departments: HR, IT, Finance
2. Branch "Jeddah" has departments: HR, Operations

**Steps:**
1. Select branch "Headquarters"
2. Open departmentId SearchableSelect → shows HR, IT, Finance
3. Change branch to "Jeddah"
4. Open departmentId SearchableSelect → shows HR, Operations

**Expected Results:**
- Department dropdown filters based on selected branch
- Changing branch clears previously selected department
- Only departments belonging to the selected branch are shown

---

#### TC-ORG-038: Employee managerEmployeeId — cascading from branch
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Select branch "Headquarters"
2. Open managerEmployeeId SearchableSelect
3. Observe available managers

**Expected Results:**
- Only employees from the selected branch shown as manager options
- SearchableSelect supports search/filter by name
- Manager field is optional (can create employee without manager)
- Cannot select the employee being created/edited as their own manager

---

#### TC-ORG-039: Employee gender — select validation
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave gender unselected
2. Select "Male" → accepted
3. Select "Female" → accepted

**Expected Results:**
- Select dropdown with options: Male, Female
- Default may be unselected or first option depending on form config

---

#### TC-ORG-040: Employee employmentStatus — select options
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Open employmentStatus dropdown
2. Verify all options present

**Expected Results:**
- Options: Active, FullTime, PartTime, Contract, Intern, Consultant, Terminated, Inactive
- All options are string-based (matching backend enum serialization)
- Selected status shows as badge in employee list

---

#### TC-ORG-041: Employee workLocationType — select options
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Open workLocationType dropdown

**Expected Results:**
- Options: OnSite, Remote, Hybrid
- String-based enum values
- Work location shows as badge in employee list

---

#### TC-ORG-042: Employee createUserAccount — toggles password and role fields
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Leave createUserAccount unchecked
2. Observe form — password and role fields hidden
3. Check createUserAccount
4. Observe form — password and role fields appear
5. Fill defaultPassword: "MyPass@123!"
6. Select at least one role from roleIds MultiSelect
7. Click Save

**Expected Results:**
- Unchecked: password and roleIds fields hidden, not required
- Checked: password and roleIds fields shown and required
- Employee + user account created simultaneously when checked

---

#### TC-ORG-043: Employee defaultPassword — minLength(8), maxLength(128)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Preconditions:**
1. createUserAccount is checked

**Steps:**
1. Enter password: "Pass1!" (6 chars) → validation error (minLength 8)
2. Enter password: 129-character string → validation error (maxLength 128)
3. Enter password: "MyPass@1" (8 chars, min boundary) → accepted
4. Enter password: "MyPass@123!" (strong password) → accepted

**Expected Results:**
- minLength 8 enforced
- maxLength 128 enforced
- Field only visible when createUserAccount is checked

---

#### TC-ORG-044: Employee roleIds — required when createUserAccount is checked
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Check createUserAccount
2. Fill password
3. Do not select any role
4. Click Save

**Expected Results:**
- Validation error: at least one role required
- MultiSelect shows available roles (Admin, Manager, Employee, etc.)
- Multiple roles can be selected

---

#### TC-ORG-045: Employee photo upload
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /employees/create |
| **Role** | System Admin |

**Steps:**
1. Click photo upload area
2. Select a JPG/PNG file (< 10MB)
3. Observe preview
4. Save the employee

**Expected Results:**
- FileUploadComponent renders in the form
- Accepts JPG, JPEG, PNG formats
- Rejects files > 10MB with error
- Photo preview shown after selection
- Photo associated with employee after save
- Employee view page and list shows avatar

---

#### TC-ORG-046: Employee edit — pre-populated fields and update
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employees/:id/edit |
| **Role** | System Admin |

**Preconditions:**
1. Employee "Mohammed Al-Rashid" (EMP-001) exists

**Steps:**
1. Navigate to /employees/{id}/edit
2. Verify all fields pre-populated with existing values
3. Change jobTitle from "Software Engineer" to "Senior Software Engineer"
4. Click Save

**Expected Results:**
- All fields correctly pre-populated
- Branch, department, manager selects show current values
- Update succeeds with success notification
- API call: `PUT /api/v1/employees/{id}` returns 200

---

#### TC-ORG-047: Employee view page — full detail display
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employees/:id/view |
| **Role** | System Admin |

**Steps:**
1. Navigate to /employees/{id}/view

**Expected Results:**
- Employee photo/avatar displayed
- DefinitionListComponent shows: name, employee number, email, phone, department, branch, job title, hire date, DOB, gender, national ID
- StatusBadgeComponent shows employment status
- Work location type badge displayed
- Manager name shown (if assigned)
- Current shift information displayed
- Navigation back to employee list

---

#### TC-ORG-048: Employee change shift
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employees/:id/change-shift |
| **Role** | System Admin |

**Steps:**
1. Navigate to /employees/{id}/change-shift
2. Select a new shift from available shifts
3. Set effective date
4. Click Save

**Expected Results:**
- Current shift displayed
- Available shifts listed for selection
- Shift change recorded with effective date
- Attendance calculation uses new shift from effective date onward
- Success notification displayed

---

### D. Employee List & Table

#### TC-ORG-049: Employee list page — table columns
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employees |
| **Role** | System Admin |

**Steps:**
1. Navigate to /employees

**Expected Results:**
- DataTable renders with columns:
  - Name (avatar + full name + email sublabel)
  - Employee Code
  - Department (with branch as sublabel)
  - Employment Status (StatusBadge)
  - Gender
  - Work Location (badge: OnSite/Remote/Hybrid)
  - Status (Active/Inactive badge)
  - Hire Date
  - Current Shift
  - Manager
- Actions column with view/edit/delete (permission-based)
- Pagination controls visible

---

#### TC-ORG-050: Employee list — search filter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employees |
| **Role** | System Admin |

**Steps:**
1. Type "Mohammed" in search input
2. Observe table results
3. Clear search, type "EMP-001"
4. Observe table results

**Expected Results:**
- Search filters by name, employee number, or email
- Results update dynamically (debounced)
- Clearing search restores full list
- Search is case-insensitive

---

#### TC-ORG-051: Employee list — cascading branch/department filters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employees |
| **Role** | System Admin |

**Steps:**
1. Select branch filter: "Headquarters"
2. Observe department filter options
3. Select department: "IT"
4. Observe table results
5. Change branch filter to "Jeddah"
6. Observe department filter resets

**Expected Results:**
- Department filter cascades from branch selection
- Only departments in selected branch shown
- Changing branch resets department filter
- Table shows only employees matching both filters

---

#### TC-ORG-052: Employee list — employment status filter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employees |
| **Role** | System Admin |

**Steps:**
1. Select employment status filter: "Active"
2. Observe table
3. Change to "Terminated"
4. Observe table

**Expected Results:**
- Only employees with matching employment status shown
- Filter options match EmploymentStatus enum values
- Count updates to reflect filtered results

---

#### TC-ORG-053: Employee list — sorting by all columns
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /employees |
| **Role** | System Admin |

**Steps:**
1. Click "Name" column header → sorts ascending
2. Click again → sorts descending
3. Repeat for: Employee Code, Department, Hire Date

**Expected Results:**
- Ascending/descending toggle on each sortable column
- Visual indicator (arrow) shows sort direction
- Data re-sorted correctly
- Pagination resets to page 1 on sort change

---

#### TC-ORG-054: Employee list — pagination
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employees |
| **Role** | System Admin |

**Preconditions:**
1. More than 10 employees exist (default page size)

**Steps:**
1. Navigate to /employees
2. Observe pagination controls
3. Click "Next" page
4. Click "Previous" page
5. Change page size (if available)

**Expected Results:**
- Pagination shows total records, current page, total pages
- Navigation between pages works correctly
- Page size selector available (10, 25, 50)
- URL may update with page parameters

---

### E. Authorization

#### TC-ORG-055: User without branch.create cannot access create branch
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /branches/create |
| **Role** | Employee (no branch.create) |

**Steps:**
1. Login as user without `branch.create` permission
2. Try to navigate to /branches/create
3. Try `POST /api/v1/branches` via API

**Expected Results:**
- UI: Redirect to /unauthorized OR Add button hidden
- API: Returns 403 Forbidden
- Branch create page not accessible

---

#### TC-ORG-056: User without employee.delete cannot delete employee
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /employees |
| **Role** | User without employee.delete |

**Steps:**
1. Login as user without `employee.delete` permission
2. Navigate to /employees
3. Observe table actions for any employee row
4. Try `DELETE /api/v1/employees/{id}` via API

**Expected Results:**
- Delete action hidden in TableActionsComponent (condition-based visibility)
- API returns 403 Forbidden
- Employee remains unchanged

---

#### TC-ORG-057: Branch-scoped user sees only their branch data
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /employees |
| **Role** | Branch Manager (single branch scope) |

**Preconditions:**
1. User has `branch_scope` claim containing only branch ID 101 (Headquarters)
2. Employees exist in branches 101, 102, 103

**Steps:**
1. Login as branch-scoped manager
2. Navigate to /employees

**Expected Results:**
- Only employees from branch 101 (Headquarters) displayed
- No employees from branches 102 or 103 visible
- Branch filter (if shown) restricted to user's scoped branches
- Department filter shows only departments in branch 101

---

#### TC-ORG-058: System user (IsSystemUser) cannot be edited or deleted
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /users |
| **Role** | System Admin |

**Preconditions:**
1. System admin user exists with `IsSystemUser = true`

**Steps:**
1. Navigate to /users
2. Locate system user (tecaxleadmin@{domain} or systemadmin@{domain})
3. Observe available actions

**Expected Results:**
- Edit and Delete buttons hidden for system users (user-table.component.ts hides them)
- API: `PUT /api/v1/users/{systemUserId}` returns 403/400
- API: `DELETE /api/v1/users/{systemUserId}` returns 403/400
- System users protected from modification

---

### F. Delete Constraints

#### TC-ORG-059: Cannot delete branch with assigned employees
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /branches |
| **Role** | System Admin |

**Preconditions:**
1. Branch "Jeddah" (ID: 102) has 10 employees assigned

**Steps:**
1. Navigate to /branches
2. Click delete action on "Jeddah" branch
3. Confirm deletion in ConfirmationModal

**Expected Results:**
- Backend rejects deletion
- Error message: branch has assigned employees (or shifts)
- Branch remains in the list unchanged
- API: `DELETE /api/v1/branches/102` returns 400 or 409
- Must reassign or remove all employees before branch can be deleted

---

#### TC-ORG-060: Cannot delete department with employees or child departments
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /departments |
| **Role** | System Admin |

**Preconditions:**
1. Department "Operations" has child department "Logistics"
2. Department "HR" has 5 employees

**Steps:**
1. Try to delete "Operations" (has children) → error
2. Try to delete "HR" (has employees) → error
3. Remove all employees from a department, delete its children, then delete it → success

**Expected Results:**
- Department with child departments: deletion blocked with descriptive error
- Department with employees: deletion blocked with descriptive error
- Empty department with no children: deletion succeeds
- Confirmation dialog shown before delete attempt

---

#### TC-ORG-061: Delete employee — confirmation and success
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employees |
| **Role** | System Admin |

**Preconditions:**
1. Employee exists with no dependent records blocking deletion

**Steps:**
1. Navigate to /employees
2. Click delete action on target employee
3. ConfirmationModal appears with warning message
4. Click Confirm

**Expected Results:**
- Confirmation dialog shown before deletion
- Employee removed from list after confirmation
- Success notification displayed
- API: `DELETE /api/v1/employees/{id}` returns 200/204
- Associated user account also handled (deactivated or deleted)

---

#### TC-ORG-062: Cannot delete branch with assigned shifts
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /branches |
| **Role** | System Admin |

**Preconditions:**
1. Branch has shift assignments but no employees directly

**Steps:**
1. Try to delete the branch

**Expected Results:**
- Deletion blocked if active shift assignments reference this branch
- Error message indicates shifts must be removed first

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Branch CRUD | 16 | 4 | 7 | 5 | 0 |
| B. Department CRUD | 7 | 3 | 3 | 1 | 0 |
| C. Employee Form Fields | 18 | 7 | 7 | 4 | 0 |
| D. Employee List & Table | 6 | 1 | 3 | 2 | 0 |
| E. Authorization | 4 | 4 | 0 | 0 | 0 |
| F. Delete Constraints | 4 | 2 | 2 | 0 | 0 |
| **TOTAL** | **55** | **21** | **22** | **12** | **0** |
