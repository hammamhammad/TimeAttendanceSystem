# TC-EXP: Expenses & Loans Management — Test Cases

## Module Overview

The Expenses & Loans module manages employee expense claims with receipt uploads and reimbursement tracking, loan applications with repayment schedules, and salary advance requests. Expense claims flow through an approval workflow with status lifecycle (Draft, Submitted, Approved, Rejected, Paid). Loan applications include disbursement tracking and installment-based repayment. Salary advances are capped at a configurable percentage of the employee's salary.

**Admin Pages**: `/expenses/categories`, `/expenses/policies/*`, `/expenses/claims/*`, `/loans/types`, `/loans/policies`, `/loans/applications/*`, `/loans/salary-advances/*`
**Self-Service Pages**: `/my-expenses`, `/my-loans`
**API Endpoints**: `/api/v1/expense-categories`, `/api/v1/expense-policies`, `/api/v1/expense-claims`, `/api/v1/loan-types`, `/api/v1/loan-policies`, `/api/v1/loan-applications`, `/api/v1/salary-advances`
**Backend Entities**: `ExpenseCategory`, `ExpensePolicy`, `ExpenseClaim`, `LoanType`, `LoanPolicy`, `LoanApplication`, `LoanRepayment`, `SalaryAdvance`

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
| HR Manager | sara.fahad@company.com | Emp@123! | Department Manager, approver |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Branch Manager, approver |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee |

---

## Test Cases

### A. Expense Categories

#### TC-EXP-001: List expense categories
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /expenses/categories |
| **Role** | HR Manager |

**Preconditions:**
1. User logged in with expense management permissions

**Steps:**
1. Navigate to /expenses/categories

**Expected Results:**
- DataTable renders with columns: Name, Name (AR), Description, GL Code, Status, Actions
- UnifiedFilter with search, refresh, and Add Category button
- Pagination functional

---

#### TC-EXP-002: Create expense category
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /expenses/categories |
| **Role** | HR Manager |

**Steps:**
1. Click "Add Category"
2. Fill in: Name = "Travel", Name (AR) = "سفر", Description = "Business travel expenses", GL Code = "6100"
3. Click Save

**Expected Results:**
- Category created successfully
- GL Code stored for accounting integration
- Success notification displayed
- Category appears in list

---

#### TC-EXP-003: Edit expense category
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /expenses/categories |
| **Role** | HR Manager |

**Preconditions:**
1. Category "Travel" exists

**Steps:**
1. Click Edit on "Travel" category
2. Update GL Code to "6110"
3. Click Save

**Expected Results:**
- Category updated successfully
- GL Code change reflected in list

---

#### TC-EXP-004: Delete expense category — blocked if claims exist
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Negative |
| **Page** | /expenses/categories |
| **Role** | HR Manager |

**Preconditions:**
1. Category has associated expense claims

**Steps:**
1. Click Delete on a category with existing claims
2. Confirm deletion

**Expected Results:**
- Deletion blocked with error: "Cannot delete category with existing expense claims"
- Category remains in list

---

### B. Expense Policies

#### TC-EXP-005: Create expense policy
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /expenses/policies/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /expenses/policies/create
2. Fill in: Name = "Travel Expense Policy"
3. Select Category = "Travel"
4. Set Max Amount = 5000 SAR
5. Set Approval Threshold = 1000 SAR (claims above this need manager approval)
6. Check "Receipt Required" = true
7. Select Eligible Departments = "IT", "Sales"
8. Click Save

**Expected Results:**
- Policy created with all fields
- Max amount and threshold validated as positive numbers
- Receipt required flag saved
- Department eligibility filter stored
- Success notification displayed

---

#### TC-EXP-006: Edit expense policy
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /expenses/policies/edit |
| **Role** | HR Manager |

**Steps:**
1. Edit "Travel Expense Policy"
2. Change Max Amount to 8000 SAR
3. Add "Finance" to eligible departments
4. Click Save

**Expected Results:**
- Policy updated successfully
- New limits apply to future claims only (existing claims not affected)

---

#### TC-EXP-007: View expense policy details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /expenses/policies/view |
| **Role** | HR Manager |

**Steps:**
1. Click View on "Travel Expense Policy"

**Expected Results:**
- DefinitionList shows: Name, Category, Max Amount, Approval Threshold, Receipt Required, Eligible Departments
- StatusBadge for active/inactive
- Back to list navigation

---

#### TC-EXP-008: Expense policy — max amount validation prevents claim exceeding limit
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Employee |

**Preconditions:**
1. Expense policy for "Travel" has Max Amount = 5000 SAR

**Steps:**
1. Create expense claim for "Travel" category with amount = 6000 SAR

**Expected Results:**
- Claim rejected: "Amount exceeds maximum allowed (5000 SAR) for this category"
- Claim not created

---

#### TC-EXP-009: Expense policy — receipt required enforcement
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /expenses/claims/create |
| **Role** | Employee |

**Preconditions:**
1. Expense policy has "Receipt Required" = true

**Steps:**
1. Create expense claim for a category with receipt required
2. Do NOT upload a receipt file
3. Click Submit

**Expected Results:**
- Validation error: "Receipt is required for this expense category"
- Claim cannot be submitted without receipt attachment
- Form highlights the file upload field

---

### C. Expense Claims

#### TC-EXP-010: Create expense claim with receipt upload
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /expenses/claims/create |
| **Role** | Employee |

**Steps:**
1. Navigate to /expenses/claims/create
2. Select Category = "Travel"
3. Enter Amount = 1500 SAR
4. Enter Date = today
5. Enter Description = "Client meeting travel - Jeddah"
6. Upload receipt (PDF, <10MB) via FileUploadComponent
7. Click "Save as Draft"

**Expected Results:**
- Claim created with status = "Draft"
- Receipt uploaded via `POST /api/v1/files/upload`
- FileAttachment linked to expense claim
- Claim appears in list with Draft badge
- Employee can edit before submitting

---

#### TC-EXP-011: Submit expense claim — triggers approval workflow
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /expenses/claims |
| **Role** | Employee |

**Preconditions:**
1. Draft expense claim exists
2. Approval workflow configured for expense claims

**Steps:**
1. Open draft claim
2. Click "Submit"
3. Confirm submission

**Expected Results:**
- Status changes from "Draft" to "Submitted"
- Approval workflow instance created
- Notification sent to approver
- Employee can no longer edit the claim
- StatusBadge shows "Submitted" with info variant

---

#### TC-EXP-012: Approve expense claim
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /expenses/claims |
| **Role** | Branch Manager |

**Preconditions:**
1. Submitted expense claim pending approval
2. User is the designated approver

**Steps:**
1. Navigate to pending approvals or /expenses/claims
2. Click on the submitted claim
3. Review details and receipt
4. Click "Approve"
5. Add optional comment

**Expected Results:**
- Status changes to "Approved"
- Notification sent to employee
- Claim ready for reimbursement processing
- Approval recorded in workflow history

---

#### TC-EXP-013: Reject expense claim
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /expenses/claims |
| **Role** | Branch Manager |

**Steps:**
1. Open a submitted expense claim
2. Click "Reject"
3. Enter rejection reason = "Missing detailed itinerary"

**Expected Results:**
- Status changes to "Rejected"
- Rejection reason stored and visible
- Notification sent to employee with reason
- Employee can create a new claim (original cannot be resubmitted)

---

#### TC-EXP-014: Reimbursement tracking — mark claim as paid
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /expenses/claims |
| **Role** | HR Manager |

**Preconditions:**
1. Approved expense claim exists

**Steps:**
1. Open approved claim
2. Click "Mark as Paid"
3. Enter payment reference/date

**Expected Results:**
- Status changes to "Paid"
- Payment reference recorded
- Employee notified of reimbursement
- StatusBadge shows "Paid" with success variant

---

#### TC-EXP-015: Expense claim status lifecycle validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System Admin |

**Steps:**
1. Verify status transitions:
   - Draft -> Submitted (via Submit action)
   - Submitted -> Approved (via Approve action)
   - Submitted -> Rejected (via Reject action)
   - Approved -> Paid (via Mark as Paid)
   - Draft -> (deleted) (via Delete)
2. Attempt invalid transitions:
   - Paid -> Draft
   - Rejected -> Approved

**Expected Results:**
- Valid transitions succeed
- Invalid transitions return error: "Invalid status transition"
- Status field is server-enforced, not just UI-enforced

---

#### TC-EXP-016: List expense claims with date and status filters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /expenses/claims |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /expenses/claims
2. Filter by status = "Submitted"
3. Filter by date range = last 30 days
4. Filter by category = "Travel"
5. Search by employee name

**Expected Results:**
- Table filters correctly
- Combined filters work (AND logic)
- Result count and pagination update
- Export to CSV available for filtered results

---

### D. Loan Types

#### TC-EXP-017: List loan types
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /loans/types |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /loans/types

**Expected Results:**
- DataTable with columns: Name, Name (AR), Interest Rate (%), Max Term (Months), Max Amount, Status, Actions
- Add Loan Type button visible

---

#### TC-EXP-018: Create loan type
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /loans/types |
| **Role** | HR Manager |

**Steps:**
1. Click "Add Loan Type"
2. Fill in: Name = "Personal Loan", Interest Rate = 0%, Max Term = 24 months, Max Amount = 50000 SAR
3. Click Save

**Expected Results:**
- Loan type created
- Interest rate allows 0% (interest-free loans)
- Max term and amount validated as positive numbers
- Success notification displayed

---

#### TC-EXP-019: Edit loan type
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /loans/types |
| **Role** | HR Manager |

**Steps:**
1. Edit "Personal Loan"
2. Change Max Amount to 60000 SAR
3. Click Save

**Expected Results:**
- Loan type updated
- Changes apply to new applications only (existing loans not affected)

---

#### TC-EXP-020: Delete loan type — blocked if active loans exist
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Negative |
| **Page** | /loans/types |
| **Role** | HR Manager |

**Preconditions:**
1. Loan type has active loan applications

**Steps:**
1. Click Delete on the loan type
2. Confirm deletion

**Expected Results:**
- Deletion blocked: "Cannot delete loan type with active applications"
- Loan type remains in list

---

### E. Loan Policies

#### TC-EXP-021: Create loan policy with eligibility rules
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /loans/policies |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /loans/policies
2. Click "Add Policy"
3. Set: Minimum Service Period = 12 months
4. Set: Max Concurrent Loans = 1
5. Set: Salary Percentage Limit = 30% (max monthly installment as % of salary)
6. Select applicable loan types
7. Click Save

**Expected Results:**
- Policy created with eligibility rules
- Rules enforced on new loan applications
- Success notification displayed

---

#### TC-EXP-022: Loan policy — max concurrent loans enforcement
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Employee |

**Preconditions:**
1. Loan policy has Max Concurrent Loans = 1
2. Employee already has an active (disbursed, not fully repaid) loan

**Steps:**
1. Attempt to create a new loan application

**Expected Results:**
- Application rejected: "Maximum concurrent loans (1) exceeded"
- Employee must fully repay existing loan before applying for new one

---

#### TC-EXP-023: Loan policy — salary percentage limit enforcement
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Employee |

**Preconditions:**
1. Employee salary = 10000 SAR/month
2. Loan policy salary percentage limit = 30%

**Steps:**
1. Apply for loan with amount = 50000 SAR, term = 12 months
2. Monthly installment = ~4167 SAR (41.7% of salary)

**Expected Results:**
- Application rejected: "Monthly installment exceeds 30% of salary"
- Suggest maximum loan amount or longer term

---

#### TC-EXP-024: Loan policy — minimum service period enforcement
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Employee |

**Preconditions:**
1. Loan policy requires minimum 12 months service
2. Employee has 6 months service

**Steps:**
1. Attempt to create a loan application

**Expected Results:**
- Application rejected: "Minimum service period of 12 months not met"

---

### F. Loan Applications

#### TC-EXP-025: Create loan application
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /loans/applications/create |
| **Role** | Employee |

**Steps:**
1. Navigate to /loans/applications/create
2. Select Loan Type = "Personal Loan"
3. Enter Amount = 20000 SAR
4. Select Term = 12 months
5. Enter Purpose = "Home renovation"
6. Click Submit

**Expected Results:**
- Application created with status "Pending"
- Monthly installment calculated and displayed (~1667 SAR)
- Approval workflow initiated
- Notification sent to approver
- Application appears in list

---

#### TC-EXP-026: Approve loan application
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /loans/applications |
| **Role** | HR Manager |

**Preconditions:**
1. Pending loan application exists

**Steps:**
1. Open pending application
2. Review details: amount, term, monthly installment, employee salary, debt-to-income ratio
3. Click "Approve"

**Expected Results:**
- Status changes to "Approved"
- Employee notified
- Application ready for disbursement

---

#### TC-EXP-027: Disburse approved loan
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /loans/applications |
| **Role** | HR Manager |

**Preconditions:**
1. Approved loan application

**Steps:**
1. Open approved application
2. Click "Disburse"
3. Enter disbursement date and reference number

**Expected Results:**
- Status changes to "Disbursed"
- Repayment schedule generated (12 monthly installments)
- Each repayment record created with: installment number, due date, amount, status (Pending)
- First installment due date calculated based on disbursement date
- Loan linked to payroll for automatic deduction

---

#### TC-EXP-028: View loan repayment schedule
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /loans/applications/view |
| **Role** | HR Manager |

**Preconditions:**
1. Disbursed loan exists

**Steps:**
1. Open disbursed loan application
2. View repayment schedule tab

**Expected Results:**
- Table shows: Installment #, Due Date, Amount, Status (Pending/Paid/Overdue), Paid Date
- Total paid vs. remaining balance summary
- Progress indicator (e.g., "4 of 12 installments paid")

---

#### TC-EXP-029: Reject loan application
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /loans/applications |
| **Role** | HR Manager |

**Steps:**
1. Open pending loan application
2. Click "Reject"
3. Enter reason = "Exceeds department budget allocation"

**Expected Results:**
- Status changes to "Rejected"
- Rejection reason stored
- Employee notified with reason

---

#### TC-EXP-030: Loan application — amount exceeds loan type maximum
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Negative |
| **Page** | /loans/applications/create |
| **Role** | Employee |

**Preconditions:**
1. Loan type "Personal Loan" has Max Amount = 50000 SAR

**Steps:**
1. Create loan application with amount = 60000 SAR

**Expected Results:**
- Validation error: "Amount exceeds maximum (50,000 SAR) for Personal Loan"
- Application not created

---

### G. Salary Advances

#### TC-EXP-031: Create salary advance request
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /loans/salary-advances/create |
| **Role** | Employee |

**Steps:**
1. Navigate to /loans/salary-advances/create
2. Enter Amount = 3000 SAR (employee salary = 10000 SAR)
3. Enter Reason = "Emergency medical expense"
4. Click Submit

**Expected Results:**
- Advance request created with status "Pending"
- Amount validated against maximum percentage of salary (e.g., 50%)
- Approval workflow initiated
- Notification sent to approver

---

#### TC-EXP-032: Salary advance — reject amount exceeding maximum percentage
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Negative |
| **Page** | /loans/salary-advances/create |
| **Role** | Employee |

**Preconditions:**
1. Max salary advance = 50% of monthly salary
2. Employee salary = 10000 SAR

**Steps:**
1. Request salary advance of 6000 SAR (60% of salary)

**Expected Results:**
- Validation error: "Amount exceeds maximum salary advance (50% of salary = 5,000 SAR)"
- Request not created

---

#### TC-EXP-033: Approve salary advance
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /loans/salary-advances |
| **Role** | Branch Manager |

**Preconditions:**
1. Pending salary advance request exists

**Steps:**
1. Open pending advance request
2. Review amount and employee salary details
3. Click "Approve"

**Expected Results:**
- Status changes to "Approved"
- Advance amount linked to current payroll period for deduction
- Employee notified
- Payroll record updated with advance deduction

---

### H. Self-Service

#### TC-EXP-034: Employee views own expense claims (My Expenses)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-expenses |
| **Role** | Employee (Self-Service) |

**Steps:**
1. Login to Self-Service Portal
2. Navigate to /my-expenses

**Expected Results:**
- Employee sees only their own expense claims
- List shows: Date, Category, Amount, Status, Actions
- Can create new claim
- Can view existing claims and download receipts
- Cannot see other employees' claims
- Status filters (All, Draft, Submitted, Approved, Rejected, Paid) available

---

#### TC-EXP-035: Employee views own loans and advances (My Loans)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-loans |
| **Role** | Employee (Self-Service) |

**Steps:**
1. Login to Self-Service Portal
2. Navigate to /my-loans

**Expected Results:**
- Employee sees own loan applications and salary advances
- Active loans show: Type, Amount, Monthly Installment, Remaining Balance, Status
- Repayment progress visible
- Can create new loan application or salary advance request
- Cannot see other employees' loan data

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Expense Categories | 4 | 2 | 2 | 0 |
| B. Expense Policies | 5 | 3 | 1 | 1 |
| C. Expense Claims | 7 | 4 | 3 | 0 |
| D. Loan Types | 4 | 2 | 2 | 0 |
| E. Loan Policies | 4 | 3 | 1 | 0 |
| F. Loan Applications | 6 | 3 | 3 | 0 |
| G. Salary Advances | 3 | 2 | 1 | 0 |
| H. Self-Service | 2 | 2 | 0 | 0 |
| **TOTAL** | **35** | **21** | **13** | **1** |
