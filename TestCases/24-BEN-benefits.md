# TC-BEN: Benefits Administration — Test Cases

## Module Overview

The Benefits module manages employee benefit plans (Medical, Dental, Vision, Life, Disability), enrollment periods, employee enrollments with dependent coverage, and benefit claims with reimbursement tracking. Employees can view their benefits and submit claims through the self-service portal. The `OpenEnrollmentPeriodActivatorJob` background job activates enrollment periods on their scheduled open dates.

**Admin Pages**: `/benefits/plans`, `/benefits/plans/create`, `/benefits/plans/:id`, `/benefits/plans/:id/edit`, `/benefits/enrollment-periods`, `/benefits/enrollment-periods/create`, `/benefits/enrollment-periods/:id`, `/benefits/enrollments`, `/benefits/enrollments/create`, `/benefits/enrollments/:id`, `/benefits/claims`, `/benefits/claims/:id`
**Self-Service Pages**: `/my-benefits`
**API Endpoints**: `BenefitPlansController`, `EnrollmentPeriodsController`, `BenefitEnrollmentsController`, `BenefitClaimsController`
**Background Job**: `OpenEnrollmentPeriodActivatorJob`

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
| HR Manager | sara.fahad@company.com | (changed) | Benefits administration permissions |
| Employee | salma.khaldi@company.com | (changed) | Benefits enrollment and claims |

---

## Test Cases

### A. Benefit Plans

#### TC-BEN-001: List benefit plans page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /benefits/plans |
| **Role** | HR Manager |

**Preconditions:**
1. User logged in with benefits management permissions

**Steps:**
1. Navigate to /benefits/plans

**Expected Results:**
- Page renders with DataTableComponent showing benefit plans
- Columns: Plan Name, Coverage Type, Provider, Employer Contribution, Employee Contribution, Status, Actions
- UnifiedFilterComponent with search, refresh, and Add button
- Pagination visible

---

#### TC-BEN-002: Create benefit plan with all coverage types
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /benefits/plans/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /benefits/plans/create
2. Enter plan name: "Gold Medical Plan"
3. Select coverage type: "Medical"
4. Enter provider: "National Health Insurance Co."
5. Set employer contribution: 80%
6. Set employee contribution: 20%
7. Enter eligibility criteria: "Full-time employees after 90-day probation"
8. Enter plan description and coverage details
9. Click Save

**Expected Results:**
- Plan created successfully
- All 5 coverage types available:

| Coverage Type | Description |
|--------------|-------------|
| Medical | Health insurance, doctor visits, hospitalization |
| Dental | Dental care, orthodontics |
| Vision | Eye exams, glasses, contacts |
| Life | Life insurance coverage |
| Disability | Short-term and long-term disability |

- Employer/employee contribution percentages saved
- Eligibility criteria stored

---

#### TC-BEN-003: Edit benefit plan
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /benefits/plans/:id/edit |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /benefits/plans/{id}/edit
2. Update employer contribution from 80% to 85%
3. Update provider name
4. Save

**Expected Results:**
- Plan updated successfully
- Changes reflected on view page
- Existing enrollments NOT retroactively affected (changes apply to new enrollments)

---

#### TC-BEN-004: Delete benefit plan without active enrollments
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /benefits/plans |
| **Role** | HR Manager |

**Preconditions:**
1. Benefit plan exists with no active enrollments

**Steps:**
1. Navigate to /benefits/plans
2. Click delete on a plan
3. Confirm deletion

**Expected Results:**
- Plan deleted successfully
- If plan has active enrollments, deletion blocked with error message

---

#### TC-BEN-005: View benefit plan details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /benefits/plans/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /benefits/plans/{id}

**Expected Results:**
- DefinitionListComponent shows: Plan Name, Coverage Type, Provider, Description
- Contribution details: Employer %, Employee %
- Eligibility criteria displayed
- Number of active enrollees shown
- StatusBadgeComponent for plan status (Active/Inactive)

---

#### TC-BEN-006: Validate contribution percentages
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /benefits/plans/create |
| **Role** | HR Manager |

**Steps:**
1. Create plan with employer contribution: 110%
2. Create plan with employee contribution: -5%
3. Create plan with employer + employee = 120%
4. Create plan with employer: 70%, employee: 30%

**Expected Results:**
- 110%: validation error (max 100%)
- -5%: validation error (min 0%)
- Combined 120%: validation error (total cannot exceed 100%)
- 70% + 30% = 100%: accepted

---

### B. Enrollment Periods

#### TC-BEN-007: Create enrollment period with open/close dates
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /benefits/enrollment-periods/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /benefits/enrollment-periods/create
2. Enter period name: "2026 Open Enrollment"
3. Set open date: 2026-11-01
4. Set close date: 2026-11-30
5. Select eligible groups: All full-time employees
6. Select available plans: Gold Medical, Dental Basic, Vision Standard
7. Toggle auto-enrollment: Off
8. Click Save

**Expected Results:**
- Enrollment period created with status "Scheduled"
- Open and close dates saved
- Eligible employee groups configured
- Available plans linked to period

---

#### TC-BEN-008: Enrollment period with auto-enrollment option
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /benefits/enrollment-periods/create |
| **Role** | HR Manager |

**Steps:**
1. Create enrollment period with auto-enrollment: On
2. Select default plan for auto-enrollment

**Expected Results:**
- Auto-enrollment flag saved
- When period opens, eligible employees without existing enrollment are auto-enrolled in default plan
- Auto-enrolled employees notified
- Employees can change plan during open period

---

#### TC-BEN-009: Edit enrollment period before opening
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /benefits/enrollment-periods/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Enrollment period in "Scheduled" status (not yet open)

**Steps:**
1. Edit period dates and eligible groups
2. Save

**Expected Results:**
- Period updated successfully
- Cannot edit after period has opened (status = Open)

---

#### TC-BEN-010: OpenEnrollmentPeriodActivatorJob activates period
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API / Background Job |
| **Role** | System |

**Preconditions:**
1. Enrollment period with open date = today, status = "Scheduled"

**Steps:**
1. `OpenEnrollmentPeriodActivatorJob` runs daily
2. Checks all enrollment periods with open date <= today and status = Scheduled

**Expected Results:**
- Period status changes from "Scheduled" to "Open"
- Eligible employees notified of open enrollment
- If auto-enrollment enabled, default enrollments created
- Period automatically closes when close date passes

---

#### TC-BEN-011: Validate enrollment period dates
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /benefits/enrollment-periods/create |
| **Role** | HR Manager |

**Steps:**
1. Set close date before open date
2. Click Save

**Expected Results:**
- Validation error: close date must be after open date
- Period not created

---

### C. Enrollments

#### TC-BEN-012: Enroll employee in benefit plan
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /benefits/enrollments/create |
| **Role** | HR Manager |

**Preconditions:**
1. Open enrollment period exists
2. Employee meets eligibility criteria

**Steps:**
1. Navigate to /benefits/enrollments/create
2. Select employee: Salma Khaldi
3. Select plan: Gold Medical Plan
4. Set effective date: 2026-01-01
5. Click Enroll

**Expected Results:**
- Enrollment created with status "Pending"
- Effective date recorded
- Employee contribution calculated based on plan percentages
- Enrollment linked to enrollment period

---

#### TC-BEN-013: Add dependent coverage to enrollment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /benefits/enrollments/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to employee's enrollment
2. Add dependent:
   - Name: "Ahmad Khaldi"
   - Relationship: "Spouse"
   - Date of birth: 1995-03-15
3. Add another dependent:
   - Name: "Layla Khaldi"
   - Relationship: "Child"
   - Date of birth: 2020-07-22
4. Save

**Expected Results:**
- Dependents added to enrollment
- Each dependent has: name, relationship, DOB
- Coverage extends to listed dependents
- Additional dependent premium calculated if applicable

---

#### TC-BEN-014: Enrollment effective dates
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /benefits/enrollments/:id |
| **Role** | HR Manager |

**Steps:**
1. Create enrollment with effective date: 2026-01-01
2. View enrollment before effective date
3. View enrollment on effective date

**Expected Results:**
- Before effective date: status "Pending"
- On effective date: status changes to "Active"
- Coverage begins on effective date

---

#### TC-BEN-015: Enrollment status transitions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /benefits/enrollments/:id |
| **Role** | HR Manager |

**Steps:**
1. Create enrollment — status: Pending
2. Effective date arrives — status: Active
3. Plan year ends or employee offboards — status: Expired or Cancelled

**Expected Results:**
- Valid status transitions:

| From | To | Trigger |
|------|----|---------|
| Pending | Active | Effective date reached |
| Pending | Cancelled | Enrollment cancelled before effective |
| Active | Expired | Plan period ends |
| Active | Cancelled | Employee offboards or voluntarily cancels |

- Each transition recorded with timestamp

---

#### TC-BEN-016: Cancel active enrollment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /benefits/enrollments/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to active enrollment
2. Click Cancel Enrollment
3. Enter reason: "Employee offboarding"
4. Set cancellation effective date
5. Confirm

**Expected Results:**
- Enrollment status changes to "Cancelled"
- Cancellation date recorded
- Coverage ends on cancellation effective date
- Employee notified of cancellation

---

#### TC-BEN-017: Duplicate enrollment prevention
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /benefits/enrollments/create |
| **Role** | HR Manager |

**Preconditions:**
1. Employee already has active enrollment in Gold Medical Plan

**Steps:**
1. Attempt to enroll same employee in Gold Medical Plan again

**Expected Results:**
- Validation error: "Employee already has an active enrollment in this plan"
- Duplicate enrollment not created
- Employee can enroll in different plan types (e.g., Medical + Dental)

---

### D. Claims

#### TC-BEN-018: Submit benefit claim with documentation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /benefits/claims (or self-service /my-benefits) |
| **Role** | HR Manager / Employee |

**Steps:**
1. Navigate to claims section
2. Select employee (or auto-populated in self-service)
3. Select benefit plan: Gold Medical Plan
4. Enter claim amount: 2,500 SAR
5. Enter claim description: "Hospital visit — emergency room"
6. Upload supporting documents: invoice PDF, medical report
7. Submit claim

**Expected Results:**
- Claim created with status "Submitted"
- Documents uploaded and linked to claim
- Claim amount recorded
- Submission date recorded

---

#### TC-BEN-019: Claim status transitions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /benefits/claims/:id |
| **Role** | HR Manager |

**Steps:**
1. View submitted claim — status: Submitted
2. HR begins review — status: UnderReview
3. Approve claim — status: Approved
4. Process payment — status: Paid

**Expected Results:**
- Valid status transitions:

| From | To | Actor |
|------|----|-------|
| Submitted | UnderReview | HR Manager |
| UnderReview | Approved | HR Manager |
| UnderReview | Rejected | HR Manager |
| Approved | Paid | Finance |

- Rejected claims include rejection reason
- Each transition timestamped

---

#### TC-BEN-020: Reject claim with reason
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /benefits/claims/:id |
| **Role** | HR Manager |

**Steps:**
1. Review a submitted claim
2. Click Reject
3. Enter reason: "Procedure not covered under current plan"
4. Confirm rejection

**Expected Results:**
- Claim status: "Rejected"
- Rejection reason recorded
- Employee notified with reason
- Claim read-only after rejection

---

#### TC-BEN-021: Reimbursement tracking for approved claims
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /benefits/claims/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to approved claim
2. Record reimbursement:
   - Amount: 2,500 SAR
   - Payment date: today
   - Payment method: Bank transfer
   - Reference number: TRF-2026-0042
3. Mark as paid

**Expected Results:**
- Claim status changes to "Paid"
- Reimbursement details recorded
- Payment reference stored
- Employee notified of reimbursement

---

#### TC-BEN-022: Claim requires active enrollment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /benefits/claims |
| **Role** | HR Manager |

**Preconditions:**
1. Employee has no active enrollment in any benefit plan

**Steps:**
1. Attempt to submit a claim for the employee

**Expected Results:**
- Validation error: "Employee has no active benefit enrollment"
- Claim not created
- If enrollment is expired or cancelled, claim also blocked

---

### E. Self-Service

#### TC-BEN-023: Employee views enrolled benefits
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | Self-Service /my-benefits |
| **Role** | Employee |

**Preconditions:**
1. Employee has active benefit enrollments

**Steps:**
1. Login to self-service portal
2. Navigate to /my-benefits

**Expected Results:**
- List of active benefit enrollments displayed
- Each enrollment shows: Plan Name, Coverage Type, Provider, Effective Date, Status
- Dependent coverage visible if applicable
- Employer/employee contribution amounts shown

---

#### TC-BEN-024: Employee submits benefit claim via self-service
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Self-Service /my-benefits |
| **Role** | Employee |

**Preconditions:**
1. Employee has active Medical benefit enrollment

**Steps:**
1. Navigate to /my-benefits
2. Click "Submit Claim"
3. Select plan: Gold Medical Plan
4. Enter amount: 1,200 SAR
5. Enter description: "Dental checkup"
6. Upload receipt
7. Submit

**Expected Results:**
- Claim submitted successfully with status "Submitted"
- Confirmation message shown
- Claim appears in employee's claim history
- HR Manager notified of new claim

---

#### TC-BEN-025: Employee views claim status in self-service
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | Self-Service /my-benefits |
| **Role** | Employee |

**Steps:**
1. Navigate to /my-benefits
2. View claims history section

**Expected Results:**
- List of all submitted claims displayed
- Each claim shows: Date, Plan, Amount, Description, Status
- Status shown with StatusBadgeComponent:
  - Submitted: warning badge
  - UnderReview: info badge
  - Approved: success badge
  - Rejected: danger badge
  - Paid: success badge with different label
- Click on claim shows full details and attached documents

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Plans | 6 | 2 | 4 | 0 | 0 |
| B. Enrollment Periods | 5 | 1 | 4 | 0 | 0 |
| C. Enrollments | 6 | 2 | 4 | 0 | 0 |
| D. Claims | 5 | 2 | 3 | 0 | 0 |
| E. Self-Service | 3 | 2 | 1 | 0 | 0 |
| **TOTAL** | **25** | **9** | **16** | **0** | **0** |
