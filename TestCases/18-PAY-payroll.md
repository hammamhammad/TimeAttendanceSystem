# TC-PAY: Payroll & Compensation — Test Cases

## Module Overview

Payroll & Compensation handles salary structure definition, monthly payroll processing, tax and social insurance configuration, and end-of-service benefit calculations. Salary structures define components (Basic, HRA, Transport, etc.) with different calculation types. Payroll periods generate records for all employees, go through a review cycle, and are finalized to lock records. End-of-service calculations follow Saudi labor law for gratuity computation.

**Admin Pages**: `/payroll/salary-structures/*`, `/payroll/periods/*`, `/payroll/settings`
**Self-Service Pages**: `/my-payslips`, `/my-salary`
**API Endpoints**: `/api/v1/salary-structures`, `/api/v1/payroll-periods`, `/api/v1/payroll-settings`, `/api/v1/end-of-service`
**Backend Controllers**: `SalaryStructuresController`, `PayrollPeriodsController`, `PayrollSettingsController`, `EndOfServiceController`
**Module**: `Payroll` (requires subscription entitlement)

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
| HR Admin | sara.fahad@company.com | Emp@123! | Payroll permissions |
| Employee | salma.khaldi@company.com | Emp@123! | Self-service access only |

---

## Test Cases

### A. Salary Structures

#### TC-PAY-001: List salary structures
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /payroll/salary-structures |
| **Role** | HR Admin |

**Preconditions:**
1. User has salary structure read permissions
2. At least one salary structure exists

**Steps:**
1. Navigate to /payroll/salary-structures

**Expected Results:**
- `DataTableComponent` displays structures with columns: Name, Components Count, Status (Active/Inactive), Created Date
- `UnifiedFilterComponent` with search, refresh, add button
- Pagination controls visible

---

#### TC-PAY-002: Create salary structure with components
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /payroll/salary-structures/create |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /payroll/salary-structures/create
2. Enter structure name: "Standard Saudi Structure"
3. Enter structure name (Arabic): "هيكل الرواتب السعودي القياسي"
4. Add component: Basic Salary — calculation type: Fixed, percentage: 60%
5. Add component: Housing Allowance (HRA) — calculation type: Percentage of Basic, percentage: 25%
6. Add component: Transport Allowance — calculation type: Fixed, amount: 1500
7. Add component: Medical Allowance — calculation type: Fixed, amount: 500
8. Click Save

**Expected Results:**
- Salary structure created with 4 components
- Each component has name, calculation type, and value
- Component ordering preserved
- Success notification displayed
- Redirect to list or view page

---

#### TC-PAY-003: View salary structure with component breakdown
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /payroll/salary-structures/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to salary structure view page

**Expected Results:**
- `DefinitionListComponent` shows structure name, status, creation date
- Component table/list shows: Component Name, Calculation Type, Value (amount or percentage), Order
- Total percentage or allocation visible
- `StatusBadgeComponent` for active/inactive status

---

#### TC-PAY-004: Component calculation types — Fixed amount
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /payroll/salary-structures/create |
| **Role** | HR Admin |

**Steps:**
1. Add a component with calculation type: Fixed
2. Enter fixed amount: 2000
3. Save structure

**Expected Results:**
- Component stored with type=Fixed and amount=2000
- When generating payroll, this component always contributes 2000 regardless of base salary

---

#### TC-PAY-005: Component calculation types — Percentage of Basic
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /payroll/salary-structures/create |
| **Role** | HR Admin |

**Steps:**
1. Add a component with calculation type: Percentage
2. Enter percentage: 25%
3. Reference component: Basic Salary
4. Save structure

**Expected Results:**
- Component stored with type=Percentage and value=25
- When generating payroll, this component = Basic Salary * 25%

---

#### TC-PAY-006: Component calculation types — Formula
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /payroll/salary-structures/create |
| **Role** | HR Admin |

**Steps:**
1. Add a component with calculation type: Formula
2. Enter formula expression
3. Save structure

**Expected Results:**
- Component stored with type=Formula
- Formula evaluated during payroll generation
- Invalid formulas rejected with validation error

---

#### TC-PAY-007: Activate and deactivate salary structure
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /payroll/salary-structures/:id |
| **Role** | HR Admin |

**Steps:**
1. Create a salary structure (default: Inactive or Draft)
2. Activate the structure
3. Deactivate the structure

**Expected Results:**
- Activate: status changes to Active, can be assigned to employees
- Deactivate: status changes to Inactive, cannot be assigned to new employees
- Existing assignments remain but flagged
- Status badge updates accordingly

---

#### TC-PAY-008: Edit salary structure components
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /payroll/salary-structures/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to edit page for an existing structure
2. Add a new component: "Performance Bonus" — Fixed, 500
3. Reorder components (drag or order field)
4. Remove the Medical Allowance component
5. Click Save

**Expected Results:**
- Components added, reordered, and removed
- Changes saved successfully
- Warning if structure is Active and has assigned employees
- Component ordering updated

---

### B. Payroll Periods

#### TC-PAY-009: List payroll periods
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /payroll/periods |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /payroll/periods

**Expected Results:**
- `DataTableComponent` with columns: Period (Month/Year), Start Date, End Date, Status, Total Employees, Total Amount
- `StatusBadgeComponent` for status (Draft, Generated, Reviewed, Finalized)
- `UnifiedFilterComponent` with year/month filters and add button
- Periods sorted by date descending

---

#### TC-PAY-010: Create a payroll period
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /payroll/periods/create |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /payroll/periods/create
2. Select month: June
3. Select year: 2026
4. Start date auto-calculated: 2026-06-01
5. End date auto-calculated: 2026-06-30
6. Click Save

**Expected Results:**
- Payroll period created with status = Draft
- Period dates correctly set for the month
- No duplicate period for same month/year allowed
- Success notification displayed

---

#### TC-PAY-011: Generate payroll records for all employees
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /payroll/periods/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Payroll period exists in Draft status
2. Employees exist with assigned salary structures
3. Attendance data exists for the period

**Steps:**
1. Navigate to payroll period view page
2. Click "Generate Records"
3. Confirm generation

**Expected Results:**
- PayrollRecord created for each active employee
- Each record contains PayrollRecordDetail entries for salary components
- Deductions calculated (tax, social insurance, absences)
- Allowances included based on active assignments
- Overtime amounts included from attendance data
- Period status changes to Generated
- Total employee count and total amount displayed
- Success notification with summary

---

#### TC-PAY-012: View individual payroll record
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /payroll/periods/:periodId/records/:recordId |
| **Role** | HR Admin |

**Steps:**
1. Navigate to a payroll period
2. Click on an individual employee's payroll record

**Expected Results:**
- Employee details shown: Name, Department, Branch, Employee ID
- Earnings breakdown: Basic Salary, HRA, Transport, other components
- Deductions breakdown: Tax, Social Insurance, absence deductions
- Allowances listed with amounts
- Overtime amount
- Gross salary, total deductions, net salary clearly displayed
- All amounts formatted with currency

---

#### TC-PAY-013: Review payroll period
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /payroll/periods/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Payroll period in Generated status

**Steps:**
1. Review individual records for accuracy
2. Make any PayrollAdjustment entries if needed
3. Click "Mark as Reviewed"

**Expected Results:**
- Period status changes from Generated to Reviewed
- Adjustments (if any) reflected in affected records
- Review timestamp and reviewer recorded
- Success notification displayed

---

#### TC-PAY-014: Finalize payroll period (locks records)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /payroll/periods/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Payroll period in Reviewed status

**Steps:**
1. Click "Finalize"
2. Confirm finalization in confirmation dialog

**Expected Results:**
- Period status changes to Finalized
- All payroll records locked (cannot be edited)
- No further adjustments allowed
- Finalization timestamp recorded
- Edit/Adjust buttons disabled or hidden
- Confirmation warns that this action is irreversible

---

#### TC-PAY-015: Cannot generate records for finalized period
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /payroll/periods/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Payroll period in Finalized status

**Steps:**
1. Navigate to finalized payroll period
2. Attempt to regenerate records
3. Attempt to add adjustments

**Expected Results:**
- Generate button hidden or disabled
- Adjustment actions hidden or disabled
- API returns error if attempted via direct call
- Only view/export actions available

---

#### TC-PAY-016: Payroll period status lifecycle
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /payroll/periods/:id |
| **Role** | HR Admin |

**Steps:**
1. Create period (Draft)
2. Generate records (Generated)
3. Review records (Reviewed)
4. Finalize period (Finalized)

**Expected Results:**
- Status transitions: Draft -> Generated -> Reviewed -> Finalized
- Cannot skip states (e.g., cannot finalize from Draft)
- Cannot revert states (e.g., cannot go from Finalized back to Reviewed)
- `StatusBadgeComponent` reflects current state with appropriate color:
  - Draft = secondary/gray
  - Generated = info/blue
  - Reviewed = warning/amber
  - Finalized = success/green

---

#### TC-PAY-017: Payroll adjustments on generated records
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /payroll/periods/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Payroll period in Generated status
2. Payroll records exist

**Steps:**
1. Select an employee's payroll record
2. Add a PayrollAdjustment: type=Bonus, amount=1000, reason="Performance bonus"
3. Save adjustment

**Expected Results:**
- Adjustment created and linked to the payroll record
- Employee's net salary recalculated with adjustment
- Adjustment visible in record details
- Adjustment reason and type recorded

---

#### TC-PAY-018: Payroll record includes attendance-based deductions
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /payroll/periods/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Employee has 2 days absent in the payroll period
2. Attendance records finalized for the period

**Steps:**
1. Generate payroll records
2. View the employee's record

**Expected Results:**
- Absence deduction calculated: (Daily salary * 2 absent days)
- Deduction listed in record details
- Net salary reduced by deduction amount
- Late arrival deductions applied if configured

---

### C. Payroll Settings

#### TC-PAY-019: Configure tax settings
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /payroll/settings |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /payroll/settings
2. Configure tax settings: enable/disable tax, tax brackets, rates

**Expected Results:**
- Tax configuration saved
- Settings applied to subsequent payroll generation
- Tax calculation respects configured brackets and rates
- Changes do not affect already-finalized periods

---

#### TC-PAY-020: Configure social insurance settings
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /payroll/settings |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /payroll/settings
2. Configure social insurance: employer contribution %, employee contribution %, salary cap

**Expected Results:**
- Social insurance configuration saved
- Employee contribution deducted from gross salary
- Employer contribution tracked separately
- Salary cap respected (contributions calculated on capped amount)

---

#### TC-PAY-021: Configure bank transfer settings
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /payroll/settings |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /payroll/settings
2. Configure bank transfer format and settings

**Expected Results:**
- Bank transfer settings saved
- Settings used when generating bank transfer files for finalized payroll

---

#### TC-PAY-022: Payroll settings page sections render correctly
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /payroll/settings |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /payroll/settings

**Expected Results:**
- Page renders with `FormSectionComponent` sections: Tax Configuration, Social Insurance, Bank Transfer
- All fields use modern form design (`.app-modern-form`)
- Save button per section or single save for all
- Current values pre-populated

---

### D. End-of-Service Benefits

#### TC-PAY-023: Calculate end-of-service benefit — Saudi labor law
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | HR Admin |

**Preconditions:**
1. Employee with 8 years of service
2. Last salary: 12,000 SAR

**Steps:**
1. Call `GET /api/v1/end-of-service/calculate?employeeId={id}`

**Expected Results:**
- Saudi labor law formula applied:
  - First 5 years: half month salary per year = (12000/2) * 5 = 30,000
  - After 5 years: full month salary per year = 12000 * 3 = 36,000
  - Total EOS = 66,000 SAR
- Service years correctly calculated from hire date
- Result includes breakdown of calculation

---

#### TC-PAY-024: EOS calculation — service less than 2 years
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | HR Admin |

**Preconditions:**
1. Employee with 1.5 years of service

**Steps:**
1. Calculate EOS for this employee

**Expected Results:**
- Per Saudi labor law: employee with less than 2 years may receive partial or no gratuity depending on termination type
- Calculation handles the edge case correctly
- Resignation vs termination differentiated

---

#### TC-PAY-025: EOS calculation — service years determination
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | HR Admin |

**Steps:**
1. Calculate EOS for employee hired 2020-03-15 with calculation date 2026-06-10

**Expected Results:**
- Service duration: 6 years, 2 months, 25 days
- Partial year prorated correctly
- Hire date sourced from employee record or contract start date

---

#### TC-PAY-026: EOS settlement includes pending amounts
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | HR Admin |

**Steps:**
1. Calculate final settlement for a departing employee

**Expected Results:**
- Settlement includes:
  - End-of-service gratuity
  - Pending salary (for partial month)
  - Leave encashment (unused leave balance * daily rate)
  - Any pending allowances
- Total settlement amount clearly broken down

---

### E. Self-Service Payroll Views

#### TC-PAY-027: Employee views payslip list
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /my-payslips (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has finalized payroll records for past months

**Steps:**
1. Log in to self-service portal as employee
2. Navigate to /my-payslips

**Expected Results:**
- List of payslips ordered by date descending
- Each entry shows: Month/Year, Gross Salary, Net Salary, Status
- Only finalized payroll records visible (Draft/Generated not shown)
- Employee can only see their own payslips

---

#### TC-PAY-028: Employee views payslip detail
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /my-payslips/:id (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Click on a payslip from the list

**Expected Results:**
- Detailed breakdown showing:
  - Earnings: Basic, HRA, Transport, other components
  - Deductions: Tax, Social Insurance, Absences
  - Allowances: Active allowance amounts
  - Gross Salary, Total Deductions, Net Salary
- All amounts formatted with currency (SAR)
- Print/download option available

---

#### TC-PAY-029: Employee views salary breakdown
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-salary (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-salary

**Expected Results:**
- Current salary structure displayed
- Component breakdown: Basic, HRA, Transport, etc.
- Each component shows amount
- Total gross salary displayed
- Active allowances listed separately

---

#### TC-PAY-030: Employee cannot access other employees' payslips
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /my-payslips (Self-Service) |
| **Role** | Employee |

**Steps:**
1. Log in as employee A
2. Try to access payslip ID belonging to employee B via URL manipulation

**Expected Results:**
- API returns 403 Forbidden or 404 Not Found
- Employee can only view their own payroll data
- Backend validates employee ownership on all payslip requests

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Salary Structures | 8 | 3 | 3 | 1 | 1 |
| B. Payroll Periods | 10 | 5 | 4 | 0 | 1 |
| C. Payroll Settings | 4 | 0 | 3 | 1 | 0 |
| D. End-of-Service | 4 | 1 | 3 | 0 | 0 |
| E. Self-Service | 4 | 2 | 1 | 0 | 1 |
| **TOTAL** | **30** | **11** | **14** | **2** | **3** |
