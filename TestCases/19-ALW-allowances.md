# TC-ALW: Allowances — Test Cases

## Module Overview

The Allowances module provides configurable allowance types, eligibility-based policies, employee assignments with effective date ranges, and employee-initiated allowance requests with approval workflows. Allowance types define calculation methods and tax treatment. Policies control eligibility by department, grade, or employment type. Assignments link specific allowances to employees. The `ExpireTemporaryAllowancesJob` background job automatically expires time-bound assignments.

**Admin Pages**: `/settings/allowance-types/*`, `/settings/allowance-policies/*`, `/allowances/*`, `/allowance-requests/*`
**Self-Service Pages**: `/my-allowances`
**API Endpoints**: `/api/v1/allowance-types`, `/api/v1/allowance-policies`, `/api/v1/allowance-assignments`, `/api/v1/allowance-requests`
**Backend Controllers**: `AllowanceTypesController`, `AllowancePoliciesController`, `AllowanceAssignmentsController`, `AllowanceRequestsController`
**Background Jobs**: `ExpireTemporaryAllowancesJob` (daily)
**Module**: `Allowances` (requires subscription entitlement)

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full access |
| HR Admin | sara.fahad@company.com | Emp@123! | Allowance management permissions |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Approval permissions |
| Employee | salma.khaldi@company.com | Emp@123! | Self-service only |

---

## Test Cases

### A. Allowance Types

#### TC-ALW-001: List allowance types
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/allowance-types |
| **Role** | HR Admin |

**Preconditions:**
1. User has allowance type read permissions

**Steps:**
1. Navigate to /settings/allowance-types

**Expected Results:**
- `DataTableComponent` with columns: Name, Name (Arabic), Calculation Method, Taxable, Status
- `UnifiedFilterComponent` with search, refresh, add button
- `StatusBadgeComponent` for active/inactive status
- Pagination controls visible

---

#### TC-ALW-002: Create allowance type
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /settings/allowance-types/create |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /settings/allowance-types/create
2. Enter name: "Housing Allowance"
3. Enter name (Arabic): "بدل السكن"
4. Select calculation method: Fixed Amount
5. Toggle taxable: Yes
6. Click Save

**Expected Results:**
- Allowance type created with status = Active
- Name and Arabic name saved
- Calculation method stored
- Taxable flag stored
- Success notification displayed
- Redirect to list page

---

#### TC-ALW-003: Create allowance type — Percentage calculation method
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /settings/allowance-types/create |
| **Role** | HR Admin |

**Steps:**
1. Create allowance type with calculation method: Percentage of Basic Salary

**Expected Results:**
- Type created with Percentage calculation method
- When assigned, amount calculated as percentage of employee's basic salary

---

#### TC-ALW-004: Edit allowance type
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /settings/allowance-types/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to edit page for existing allowance type
2. Change taxable toggle from Yes to No
3. Update Arabic name
4. Click Save

**Expected Results:**
- Changes saved successfully
- Updated values reflected in list
- Success notification displayed

---

#### TC-ALW-005: Deactivate allowance type
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /settings/allowance-types/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to active allowance type
2. Toggle status to Inactive

**Expected Results:**
- Status changes to Inactive
- Inactive types cannot be used for new assignments or policies
- Existing assignments with this type remain valid
- Status badge shows gray/secondary "Inactive"

---

#### TC-ALW-006: View allowance type details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/allowance-types/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to allowance type view page

**Expected Results:**
- `DefinitionListComponent` shows: Name, Name (Arabic), Calculation Method, Taxable, Status, Created Date
- `StatusBadgeComponent` for status
- List of policies using this type (if any)
- List of active assignments using this type

---

### B. Allowance Policies

#### TC-ALW-007: List allowance policies
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /settings/allowance-policies |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /settings/allowance-policies

**Expected Results:**
- `DataTableComponent` with columns: Policy Name, Allowance Type, Eligibility Criteria, Calculation Method, Approval Required, Status
- `UnifiedFilterComponent` with search and add button
- Pagination working

---

#### TC-ALW-008: Create allowance policy with eligibility rules
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /settings/allowance-policies/create |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /settings/allowance-policies/create
2. Enter policy name: "Senior Staff Housing Policy"
3. Select allowance type: Housing Allowance
4. Set eligibility: Department = IT, Grade >= 5
5. Set calculation method: Fixed, amount: 3000
6. Set approval required: Yes
7. Set monthly limit: 3000
8. Click Save

**Expected Results:**
- Policy created with eligibility rules
- Department filter saved
- Grade filter saved
- Amount and limits stored
- Approval requirement flag saved
- Success notification displayed

---

#### TC-ALW-009: Policy eligibility by employment type
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /settings/allowance-policies/create |
| **Role** | HR Admin |

**Steps:**
1. Create policy with eligibility: Employment Type = Full-Time only

**Expected Results:**
- Policy only applicable to full-time employees
- Part-time or contract employees excluded from this policy
- Eligibility rules correctly stored and enforced

---

#### TC-ALW-010: Edit allowance policy
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /settings/allowance-policies/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to policy edit page
2. Change monthly limit from 3000 to 3500
3. Add additional department to eligibility
4. Click Save

**Expected Results:**
- Changes saved successfully
- Updated limits applied to future assignments
- Existing assignments not retroactively affected
- Success notification displayed

---

#### TC-ALW-011: View allowance policy details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/allowance-policies/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to policy view page

**Expected Results:**
- `DefinitionListComponent` shows: Policy Name, Allowance Type, Calculation Method, Amount/Percentage, Monthly Limit, Approval Required
- Eligibility criteria displayed: Departments, Grades, Employment Types
- `StatusBadgeComponent` for status
- Count of active assignments under this policy

---

#### TC-ALW-012: Delete allowance policy
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /settings/allowance-policies |
| **Role** | HR Admin |

**Steps:**
1. Click delete on a policy with no active assignments
2. Confirm deletion
3. Try to delete a policy with active assignments

**Expected Results:**
- Policy with no assignments: deleted successfully
- Policy with active assignments: error — cannot delete while assignments exist
- Confirmation modal shown before deletion

---

### C. Allowance Assignments

#### TC-ALW-013: List allowance assignments
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /allowances |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /allowances

**Expected Results:**
- `DataTableComponent` with columns: Employee, Allowance Type, Amount, Start Date, End Date, Status
- `UnifiedFilterComponent` with search, filter by type, add button
- Active and expired assignments distinguishable via `StatusBadgeComponent`
- Pagination working

---

#### TC-ALW-014: Assign allowance to employee
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /allowances/create |
| **Role** | HR Admin |

**Preconditions:**
1. Active allowance type exists
2. Active employee exists

**Steps:**
1. Navigate to /allowances/create
2. Select employee from searchable dropdown
3. Select allowance type: "Housing Allowance"
4. Enter amount: 3000
5. Enter start date: 2026-06-01
6. Enter end date: 2026-12-31 (temporary assignment)
7. Click Save

**Expected Results:**
- Assignment created linking employee to allowance type
- Amount, start date, and end date stored
- Status = Active (if start date is today or past)
- AllowanceChangeLog entry created
- Success notification displayed
- Assignment included in payroll generation for the employee

---

#### TC-ALW-015: Assign permanent allowance (no end date)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /allowances/create |
| **Role** | HR Admin |

**Steps:**
1. Create assignment with start date but no end date

**Expected Results:**
- Assignment created without end date (permanent/ongoing)
- Will not be expired by `ExpireTemporaryAllowancesJob`
- Continues until manually deactivated

---

#### TC-ALW-016: View allowance assignment details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /allowances/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to assignment view page

**Expected Results:**
- `DefinitionListComponent` shows: Employee, Allowance Type, Amount, Start Date, End Date, Status, Created By, Created Date
- `StatusBadgeComponent` for active/expired status
- Change log history visible

---

#### TC-ALW-017: Edit allowance assignment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /allowances/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to assignment edit page
2. Change amount from 3000 to 3500
3. Extend end date by 3 months
4. Click Save

**Expected Results:**
- Changes saved successfully
- AllowanceChangeLog entry created with before/after values
- Updated amount used in future payroll calculations
- Success notification displayed

---

#### TC-ALW-018: ExpireTemporaryAllowancesJob expires ended assignments
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Temporary assignment exists with end date = yesterday
2. Assignment status is still Active

**Steps:**
1. Trigger or wait for `ExpireTemporaryAllowancesJob` execution

**Expected Results:**
- Job iterates all active tenants via `TenantIteratingJob`
- Identifies assignments where end date < today and status = Active
- Updates status to Expired
- AllowanceChangeLog entry created
- Expired assignment no longer included in payroll generation
- Permanent assignments (no end date) unaffected

---

#### TC-ALW-019: Delete allowance assignment
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /allowances |
| **Role** | HR Admin |

**Steps:**
1. Click delete on an assignment
2. Confirm deletion

**Expected Results:**
- Assignment deleted or deactivated
- AllowanceChangeLog records the deletion
- Confirmation modal shown before action

---

### D. Allowance Requests

#### TC-ALW-020: Employee creates allowance request (self-service)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-allowances (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Log in to self-service portal as employee
2. Navigate to /my-allowances
3. Click "Request Allowance"
4. Select allowance type from available types
5. Enter requested amount: 2000
6. Add justification text
7. Upload supporting document (optional)
8. Click Submit

**Expected Results:**
- Allowance request created with status = Pending
- Workflow instance created if approval required by policy
- Manager/approver receives notification
- Request visible in employee's request list
- Success notification displayed

---

#### TC-ALW-021: List allowance requests (admin)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /allowance-requests |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /allowance-requests

**Expected Results:**
- `DataTableComponent` with columns: Employee, Allowance Type, Requested Amount, Status, Submitted Date
- `UnifiedFilterComponent` with search, filter by status/type
- `StatusBadgeComponent` for request status (Pending, Approved, Rejected)
- Pagination working

---

#### TC-ALW-022: Approve allowance request
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /allowance-requests/:id |
| **Role** | Branch Manager |

**Preconditions:**
1. Pending allowance request exists
2. User is assigned as approver

**Steps:**
1. Navigate to allowance request view
2. Review request details and supporting documents
3. Click "Approve"
4. Add approval comments
5. Confirm

**Expected Results:**
- Request status changes to Approved
- AllowanceAssignment automatically created for the employee
- Employee receives approval notification
- Workflow step marked as completed
- Success notification displayed

---

#### TC-ALW-023: Reject allowance request
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /allowance-requests/:id |
| **Role** | Branch Manager |

**Steps:**
1. Navigate to pending allowance request
2. Click "Reject"
3. Enter rejection reason (required)
4. Confirm

**Expected Results:**
- Request status changes to Rejected
- No assignment created
- Employee receives rejection notification with reason
- Workflow step marked as rejected

---

#### TC-ALW-024: View allowance request status (self-service)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-allowances (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Log in as employee who submitted a request
2. Navigate to /my-allowances
3. View request list

**Expected Results:**
- All submitted requests visible with current status
- `StatusBadgeComponent` shows Pending (warning), Approved (success), or Rejected (danger)
- Can click to view request details
- Approval history visible for processed requests
- Active allowance assignments shown separately

---

#### TC-ALW-025: Upload supporting document with allowance request
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /my-allowances (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Create allowance request
2. Use `FileUploadComponent` to attach supporting document (e.g., medical_certificate.pdf)
3. Submit request

**Expected Results:**
- File uploaded via `POST /api/v1/files/upload`
- FileAttachment linked to the allowance request
- Document visible to approvers on request view page
- Download link functional
- Supported types: PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX (max 10MB)

---

#### TC-ALW-026: Employee cannot request inactive allowance type
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /my-allowances (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Deactivate an allowance type (as admin)
2. Log in as employee
3. Try to create a request for the deactivated type

**Expected Results:**
- Inactive allowance types not shown in the dropdown
- If submitted via API directly, backend returns validation error
- Only active types available for selection

---

### E. Authorization & Module Entitlement

#### TC-ALW-027: Allowances module required for access
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /settings/allowance-types |
| **Role** | HR Admin |

**Preconditions:**
1. Tenant subscription does NOT include Allowances module

**Steps:**
1. Navigate to /settings/allowance-types
2. Navigate to /allowances
3. Navigate to /allowance-requests

**Expected Results:**
- `moduleGuard` blocks access to all allowance routes
- Routes redirect or show module-disabled message
- API calls return 403 with module-not-enabled error
- `ModuleEntitlementBehavior` blocks commands
- Queries with `AllowReadWhenDisabled=true` allow historical data viewing

---

#### TC-ALW-028: Permission checks on allowance operations
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /settings/allowance-types |
| **Role** | Employee |

**Steps:**
1. Log in as regular employee (no allowance admin permissions)
2. Try to navigate to /settings/allowance-types
3. Try to navigate to /settings/allowance-policies
4. Try to navigate to /allowances

**Expected Results:**
- Routes hidden from navigation
- Direct URL access redirected to /unauthorized
- API returns 403 for unauthorized operations
- Employee can only access /my-allowances in self-service portal

---

#### TC-ALW-029: Read-only mode when Allowances module disabled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Authorization |
| **Page** | /allowances |
| **Role** | HR Admin |

**Preconditions:**
1. Tenant previously had Allowances module enabled (historical data exists)
2. Module now disabled

**Steps:**
1. Navigate to /allowances

**Expected Results:**
- List page accessible in read-only mode (queries with AllowReadWhenDisabled=true)
- `ModuleStatusBannerComponent` displays warning banner
- Add/Edit/Delete buttons hidden
- Create routes blocked by `moduleStrict: true` guard
- View details accessible
- Historical data preserved and viewable

---

#### TC-ALW-030: Self-service allowance access restricted to own data
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /my-allowances (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Log in as employee A
2. Navigate to /my-allowances
3. Try to access another employee's allowance request via URL manipulation

**Expected Results:**
- Only employee A's requests and assignments visible
- API validates employee ownership on all requests
- Attempting to access another employee's data returns 403 or 404
- Backend filters by authenticated user's employee ID

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Allowance Types | 6 | 2 | 3 | 0 | 1 |
| B. Allowance Policies | 6 | 2 | 3 | 1 | 0 |
| C. Allowance Assignments | 7 | 2 | 3 | 1 | 1 |
| D. Allowance Requests | 7 | 2 | 4 | 0 | 1 |
| E. Authorization | 4 | 3 | 1 | 0 | 0 |
| **TOTAL** | **30** | **11** | **14** | **2** | **3** |
