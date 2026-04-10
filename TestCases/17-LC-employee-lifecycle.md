# TC-LC: Employee Lifecycle Management — Test Cases

## Module Overview

Employee Lifecycle Management covers the full employment journey: contracts, promotions, transfers, salary adjustments, and job grades. It tracks contract states (Draft through Expired), promotion history with salary changes, inter-branch/inter-department transfers, salary adjustment workflows, and grade-based compensation planning. The `ContractExpiryAlertJob` background job sends daily alerts for expiring contracts.

**Admin Pages**: `/employee-contracts/*`, `/employee-promotions/*`, `/employee-transfers/*`, `/salary-adjustments/*`, `/job-grades/*`
**API Endpoints**: `/api/v1/employee-contracts`, `/api/v1/employee-promotions`, `/api/v1/employee-transfers`, `/api/v1/salary-adjustments`, `/api/v1/job-grades`
**Backend Controllers**: `EmployeeContractsController`, `EmployeePromotionsController`, `EmployeeTransfersController`, `SalaryAdjustmentsController`, `JobGradesController`
**Background Jobs**: `ContractExpiryAlertJob` (daily)
**Module**: `EmployeeLifecycle` (requires subscription entitlement)

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full access, IsSystemUser=true |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Manager with employee.lifecycle permissions |
| HR Admin | sara.fahad@company.com | Emp@123! | HR role with lifecycle permissions |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee, no lifecycle admin access |

---

## Test Cases

### A. Employee Contracts

#### TC-LC-001: List employee contracts page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employee-contracts |
| **Role** | HR Admin |

**Preconditions:**
1. User is logged in with contract read permissions
2. At least one contract exists in the system

**Steps:**
1. Navigate to /employee-contracts

**Expected Results:**
- Page renders with `UnifiedFilterComponent` (search, refresh, add button)
- `DataTableComponent` displays contracts with columns: Employee, Contract Type, Start Date, End Date, Status
- Pagination controls visible
- `StatusBadgeComponent` used for contract status display

---

#### TC-LC-002: Create employee contract — Draft status
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-contracts/create |
| **Role** | HR Admin |

**Preconditions:**
1. At least one active employee exists
2. User has contract create permissions

**Steps:**
1. Navigate to /employee-contracts/create
2. Select an employee from the searchable dropdown
3. Select contract type (e.g., Full-Time)
4. Enter start date: 2026-05-01
5. Enter end date: 2027-04-30
6. Fill in contract terms/details
7. Click Save

**Expected Results:**
- Contract created with status = Draft
- Redirect to contract list or view page
- Success notification displayed
- Contract appears in list with Draft status badge

---

#### TC-LC-003: View employee contract details
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employee-contracts/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Contract exists in Draft status

**Steps:**
1. Navigate to /employee-contracts
2. Click view action on a contract row

**Expected Results:**
- View page renders with `DefinitionListComponent` showing: Employee, Contract Type, Start Date, End Date, Status, Created Date
- `StatusBadgeComponent` displays current status
- Action buttons visible based on contract state (Activate, Edit, Delete)
- Document attachment section visible

---

#### TC-LC-004: Attach document to contract
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-contracts/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Contract exists
2. A PDF or DOCX file is ready for upload (under 10MB)

**Steps:**
1. Navigate to contract view page
2. Click "Upload Document" or use `FileUploadComponent`
3. Select a PDF file (contract_signed.pdf)
4. Submit the upload

**Expected Results:**
- File uploaded via `POST /api/v1/files/upload`
- `FileAttachment` record created linking to the contract (EntityType=EmployeeContract, EntityId=contractId)
- Document appears in the attachments section
- Download link functional via `GET /api/v1/files/{storedFileName}`

---

#### TC-LC-005: Activate a Draft contract
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-contracts/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Contract exists in Draft status

**Steps:**
1. Navigate to contract view page
2. Click "Activate" button
3. Confirm activation in confirmation dialog

**Expected Results:**
- Contract status changes from Draft to Active
- Status badge updates to green "Active"
- Audit log entry created for status change
- Success notification displayed
- Activate button no longer visible

---

#### TC-LC-006: Renew an Active contract
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-contracts/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Contract exists in Active status

**Steps:**
1. Navigate to active contract view page
2. Click "Renew" button
3. Enter new end date (extended by 1 year)
4. Confirm renewal

**Expected Results:**
- Contract status changes to Renewed
- New end date saved
- Previous contract details preserved in history
- Audit log entry created
- Success notification displayed

---

#### TC-LC-007: Terminate an Active contract
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-contracts/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Contract exists in Active status

**Steps:**
1. Navigate to active contract view page
2. Click "Terminate" button
3. Enter termination date and reason
4. Confirm termination

**Expected Results:**
- Contract status changes to Terminated
- Termination date and reason recorded
- Status badge shows red "Terminated"
- Audit log entry created
- Success notification displayed

---

#### TC-LC-008: Edit a Draft contract
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-contracts/:id/edit |
| **Role** | HR Admin |

**Preconditions:**
1. Contract exists in Draft status

**Steps:**
1. Navigate to /employee-contracts/:id/edit
2. Modify contract type and end date
3. Click Save

**Expected Results:**
- Changes saved successfully
- Redirect to view page with updated values
- Only Draft contracts are editable (Active/Terminated/Expired contracts show edit button disabled or hidden)

---

#### TC-LC-009: Delete a Draft contract
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-contracts |
| **Role** | HR Admin |

**Preconditions:**
1. Contract exists in Draft status

**Steps:**
1. Navigate to contract list
2. Click delete action on a Draft contract
3. Confirm deletion in `ConfirmationModalComponent`

**Expected Results:**
- Contract deleted (soft or hard delete)
- Contract no longer appears in list
- Success notification displayed
- Cannot delete Active, Renewed, Terminated, or Expired contracts

---

#### TC-LC-010: ContractExpiryAlertJob sends alerts for expiring contracts
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Active contract exists with end date within alert threshold (e.g., 30 days)
2. ContractExpiryAlertJob is scheduled

**Steps:**
1. Trigger or wait for ContractExpiryAlertJob execution
2. Check notifications for relevant users

**Expected Results:**
- Job iterates all active tenants via `TenantIteratingJob`
- Identifies contracts expiring within threshold
- Creates in-app notifications for HR admins / managers
- Notification includes employee name, contract end date, and action URL
- Already-alerted contracts are not re-alerted

---

### B. Employee Promotions

#### TC-LC-011: List employee promotions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employee-promotions |
| **Role** | HR Admin |

**Preconditions:**
1. At least one promotion record exists

**Steps:**
1. Navigate to /employee-promotions

**Expected Results:**
- Page renders with `DataTableComponent`
- Columns: Employee, Previous Title, New Title, Previous Salary, New Salary, Effective Date, Status
- `UnifiedFilterComponent` with search and add button
- Pagination working

---

#### TC-LC-012: Create a promotion record
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-promotions/create |
| **Role** | HR Admin |

**Preconditions:**
1. Active employee exists with current title and salary

**Steps:**
1. Navigate to /employee-promotions/create
2. Select employee from searchable dropdown
3. Previous title and salary auto-populated from employee record
4. Enter new title: "Senior Software Engineer"
5. Enter new salary: 15000
6. Enter effective date: 2026-06-01
7. Add promotion reason/notes
8. Click Save

**Expected Results:**
- Promotion record created
- Previous title and salary stored for history
- New title and salary recorded
- Effective date saved
- Success notification displayed
- Redirect to promotion list or view page

---

#### TC-LC-013: View promotion details with history
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-promotions/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to a promotion view page

**Expected Results:**
- `DefinitionListComponent` shows: Employee, Previous Title, New Title, Previous Salary, New Salary, Salary Change (amount and %), Effective Date, Status, Notes
- `StatusBadgeComponent` for status
- Previous values clearly labeled and distinguishable from new values

---

#### TC-LC-014: Promotion updates employee title and salary on effective date
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Approved promotion with effective date = today or past

**Steps:**
1. Create promotion with effective date = today
2. Approve the promotion (if approval workflow configured)
3. Check employee record

**Expected Results:**
- Employee's title updated to new title
- Employee's salary updated to new salary
- Change tracked in audit log
- Old values preserved in promotion record

---

#### TC-LC-015: Promotion with approval workflow
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-promotions/create |
| **Role** | HR Admin |

**Preconditions:**
1. Approval workflow configured for promotions

**Steps:**
1. Create a promotion record
2. Submit for approval
3. Log in as approver
4. Approve the promotion

**Expected Results:**
- Promotion created with Pending status
- Workflow instance created
- Approver receives notification
- After approval, status changes to Approved
- Employee record updated on effective date

---

#### TC-LC-016: Edit a pending promotion
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-promotions/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to edit page for a pending promotion
2. Modify new title and salary
3. Click Save

**Expected Results:**
- Changes saved successfully
- Only pending/draft promotions are editable
- Approved promotions cannot be edited

---

#### TC-LC-017: Delete a promotion record
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /employee-promotions |
| **Role** | HR Admin |

**Steps:**
1. Click delete on a pending promotion
2. Confirm deletion

**Expected Results:**
- Promotion deleted
- Cannot delete approved/completed promotions
- Confirmation modal shown before deletion

---

### C. Employee Transfers

#### TC-LC-018: List employee transfers
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /employee-transfers |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /employee-transfers

**Expected Results:**
- `DataTableComponent` with columns: Employee, From Branch, To Branch, From Department, To Department, Effective Date, Status
- `UnifiedFilterComponent` with search and add button
- Pagination working

---

#### TC-LC-019: Create inter-branch transfer
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-transfers/create |
| **Role** | HR Admin |

**Preconditions:**
1. Employee exists in Branch A (e.g., Headquarters - Riyadh)
2. Branch B exists (e.g., Jeddah Branch)

**Steps:**
1. Navigate to /employee-transfers/create
2. Select employee
3. From Branch auto-populated from employee record
4. Select To Branch: "Jeddah Branch"
5. Optionally select To Department
6. Enter effective date: 2026-06-01
7. Add transfer reason
8. Click Save

**Expected Results:**
- Transfer record created
- From Branch and From Department captured from current employee assignment
- Transfer record shows source and destination
- Success notification displayed

---

#### TC-LC-020: Create inter-department transfer (same branch)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-transfers/create |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /employee-transfers/create
2. Select employee
3. Keep same branch
4. Select different department within same branch
5. Enter effective date and reason
6. Click Save

**Expected Results:**
- Transfer record created with same branch, different department
- From/To departments clearly recorded
- Success notification displayed

---

#### TC-LC-021: Transfer updates employee branch and department on effective date
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Approved transfer with effective date = today

**Steps:**
1. Create and approve transfer
2. Check employee record after effective date

**Expected Results:**
- Employee's branch updated to destination branch
- Employee's department updated to destination department
- User branch scope updated if inter-branch transfer
- Audit log records the change
- Employee appears under new branch/department in listings

---

#### TC-LC-022: View transfer details with history
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-transfers/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to a transfer view page

**Expected Results:**
- `DefinitionListComponent` shows: Employee, From Branch, To Branch, From Department, To Department, Effective Date, Status, Reason, Created By
- `StatusBadgeComponent` for transfer status
- Transfer history visible if employee has multiple transfers

---

#### TC-LC-023: Inter-branch transfer updates user branch scope
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Employee has user account with branch scope = [Branch A]
2. Transfer to Branch B is approved and effective

**Steps:**
1. Execute inter-branch transfer
2. Check user's branch scope (UserBranchScope)

**Expected Results:**
- User's branch scope updated to include destination branch
- Employee can access data in new branch
- JWT `branch_scope` claim reflects new scope on next login

---

#### TC-LC-024: Edit a pending transfer
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-transfers/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to edit page for a pending transfer
2. Change destination department
3. Click Save

**Expected Results:**
- Changes saved
- Only pending transfers are editable
- Completed transfers cannot be modified

---

### D. Salary Adjustments

#### TC-LC-025: List salary adjustments
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /salary-adjustments |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /salary-adjustments

**Expected Results:**
- `DataTableComponent` with columns: Employee, Adjustment Type, Current Salary, New Salary, Amount/Percentage, Effective Date, Status
- `UnifiedFilterComponent` with search, filter by type, add button
- Pagination working

---

#### TC-LC-026: Create Annual Increment adjustment
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /salary-adjustments/create |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /salary-adjustments/create
2. Select employee
3. Select adjustment type: "Annual Increment"
4. Current salary auto-populated
5. Enter percentage: 10%
6. New salary auto-calculated (current + 10%)
7. Enter effective date: 2026-07-01
8. Add justification notes
9. Click Save

**Expected Results:**
- Salary adjustment record created
- Amount calculated from percentage (or vice versa)
- Current salary captured at time of creation
- New salary = Current + Adjustment Amount
- Success notification displayed

---

#### TC-LC-027: Create Promotion-type salary adjustment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /salary-adjustments/create |
| **Role** | HR Admin |

**Steps:**
1. Select adjustment type: "Promotion"
2. Enter fixed amount increase: 3000
3. New salary = Current + 3000
4. Link to related promotion record (if applicable)
5. Click Save

**Expected Results:**
- Adjustment created with type = Promotion
- Fixed amount recorded
- New salary correctly calculated
- Optional link to promotion entity

---

#### TC-LC-028: Create Market Adjustment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /salary-adjustments/create |
| **Role** | HR Admin |

**Steps:**
1. Select adjustment type: "Market Adjustment"
2. Enter percentage: 15%
3. Add market benchmark justification
4. Click Save

**Expected Results:**
- Adjustment created with type = MarketAdjustment
- Percentage and calculated amount stored
- Justification notes saved

---

#### TC-LC-029: Create Correction-type salary adjustment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /salary-adjustments/create |
| **Role** | HR Admin |

**Steps:**
1. Select adjustment type: "Correction"
2. Enter corrected salary amount directly
3. Add correction reason
4. Click Save

**Expected Results:**
- Adjustment created with type = Correction
- Can be negative (salary decrease) or positive
- Correction reason mandatory

---

#### TC-LC-030: Salary adjustment with approval workflow
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /salary-adjustments |
| **Role** | HR Admin / Approver |

**Preconditions:**
1. Approval workflow configured for salary adjustments

**Steps:**
1. Create a salary adjustment
2. Submit for approval
3. Log in as approver
4. Review and approve

**Expected Results:**
- Adjustment created with Pending status
- Workflow instance created
- Approver receives notification with details
- After approval, status = Approved
- Employee salary updated on effective date

---

#### TC-LC-031: Upload supporting document for salary adjustment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /salary-adjustments/create |
| **Role** | HR Admin |

**Steps:**
1. Create a salary adjustment
2. Use `FileUploadComponent` to attach supporting document (e.g., market_survey.pdf)
3. Submit

**Expected Results:**
- File uploaded and linked to salary adjustment via FileAttachment
- Document visible on adjustment view page
- Download link functional
- Supported file types: PDF, DOC, DOCX, XLSX, JPG, PNG

---

#### TC-LC-032: View salary adjustment details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /salary-adjustments/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to a salary adjustment view page

**Expected Results:**
- `DefinitionListComponent` shows: Employee, Adjustment Type, Current Salary, New Salary, Amount, Percentage, Effective Date, Status, Justification, Approved By, Approved Date
- `StatusBadgeComponent` for status
- Attached documents listed with download links
- Approval workflow history visible if applicable

---

### E. Job Grades

#### TC-LC-033: List job grades
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /job-grades |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /job-grades

**Expected Results:**
- `DataTableComponent` with columns: Grade Name, Grade Level, Min Salary, Mid Salary, Max Salary, Employee Count
- `UnifiedFilterComponent` with search and add button
- Grades ordered by level/hierarchy

---

#### TC-LC-034: Create a job grade with salary range
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /job-grades/create |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /job-grades/create
2. Enter grade name: "Grade 5 - Senior"
3. Enter grade name (Arabic): "المستوى 5 - أقدم"
4. Enter grade level: 5
5. Enter minimum salary: 10000
6. Enter mid-point salary: 13000
7. Enter maximum salary: 16000
8. Click Save

**Expected Results:**
- Job grade created with salary range
- Validation: Min <= Mid <= Max
- Success notification displayed
- Grade appears in list

---

#### TC-LC-035: Edit a job grade
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /job-grades/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /job-grades/:id/edit
2. Update maximum salary from 16000 to 18000
3. Click Save

**Expected Results:**
- Changes saved
- Validation: Min <= Mid <= Max still enforced
- Success notification displayed

---

#### TC-LC-036: View job grade with associated employees
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /job-grades/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to job grade view page

**Expected Results:**
- `DefinitionListComponent` shows grade details and salary range
- List of employees assigned to this grade displayed
- Employee count matches the number shown in list page

---

#### TC-LC-037: Delete a job grade
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /job-grades |
| **Role** | HR Admin |

**Steps:**
1. Click delete on a job grade with no employees assigned
2. Confirm deletion
3. Try to delete a grade that has employees assigned

**Expected Results:**
- Grade with no employees: deleted successfully
- Grade with employees: error message "Cannot delete grade with assigned employees" or similar
- Confirmation modal shown before deletion

---

### F. Authorization & Module Entitlement

#### TC-LC-038: EmployeeLifecycle module required for access
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /employee-contracts |
| **Role** | HR Admin |

**Preconditions:**
1. Tenant subscription does NOT include EmployeeLifecycle module

**Steps:**
1. Navigate to /employee-contracts
2. Try to navigate to /employee-promotions
3. Try to navigate to /salary-adjustments

**Expected Results:**
- `moduleGuard` blocks access to all lifecycle routes
- Routes redirect or show module-disabled message
- API calls return 403 with module-not-enabled error
- `ModuleEntitlementBehavior` blocks commands
- Queries with `AllowReadWhenDisabled=true` allow historical data viewing

---

#### TC-LC-039: Permission-based access control on lifecycle operations
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /employee-contracts |
| **Role** | Employee |

**Preconditions:**
1. Regular employee (salma.khaldi@company.com) logged in with no lifecycle admin permissions

**Steps:**
1. Navigate to /employee-contracts
2. Try to access /employee-promotions
3. Try to access /salary-adjustments

**Expected Results:**
- Redirected to /unauthorized or routes hidden from navigation
- No create/edit/delete buttons visible
- API returns 403 Forbidden for unauthorized operations

---

#### TC-LC-040: System user protection on lifecycle entities
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Authorization |
| **Page** | /employee-contracts |
| **Role** | HR Admin |

**Preconditions:**
1. System admin user (IsSystemUser=true) has a contract record

**Steps:**
1. Navigate to system admin user's contract
2. Try to edit or delete it

**Expected Results:**
- System user's records may have additional protection
- Edits/deletions of system user records handled per system user protection rules
- `IsSystemUser` flag checked where applicable

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Employee Contracts | 10 | 5 | 4 | 0 | 1 |
| B. Employee Promotions | 7 | 2 | 3 | 1 | 1 |
| C. Employee Transfers | 7 | 3 | 3 | 0 | 1 |
| D. Salary Adjustments | 8 | 2 | 5 | 0 | 1 |
| E. Job Grades | 5 | 2 | 2 | 1 | 0 |
| F. Authorization | 3 | 2 | 1 | 0 | 0 |
| **TOTAL** | **40** | **16** | **18** | **2** | **4** |
