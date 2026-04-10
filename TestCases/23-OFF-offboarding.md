# TC-OFF: Offboarding — Test Cases

## Module Overview

The Offboarding module manages the complete employee separation lifecycle including resignation requests, termination records, exit interviews, departmental clearance checklists, and final settlement calculations. Final settlement integrates pending salary, leave encashment, end-of-service benefits, allowances, and deductions. Employees can submit resignations through the self-service portal.

**Admin Pages**: `/offboarding/resignations`, `/offboarding/resignations/create`, `/offboarding/resignations/:id`, `/offboarding/terminations`, `/offboarding/terminations/create`, `/offboarding/terminations/:id`, `/offboarding/pending-clearance`, `/offboarding/final-settlements`, `/offboarding/final-settlements/:id`
**Self-Service Pages**: `/my-resignation`
**API Endpoints**: `ResignationRequestsController`, `TerminationsController`, `ExitInterviewsController`, `ClearanceController`, `FinalSettlementsController`
**Domain Entities**: `ResignationRequest`, `TerminationRecord`, `ExitInterview`, `ClearanceChecklist`, `ClearanceItem`, `EndOfServiceBenefit`, `FinalSettlement`

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
| HR Manager | sara.fahad@company.com | (changed) | Offboarding management permissions |
| Branch Manager | ahmed.rashid@company.com | (changed) | Approval authority |
| Employee | salma.khaldi@company.com | (changed) | Resignation submitter |

---

## Test Cases

### A. Resignations

#### TC-OFF-001: Employee submits resignation via self-service portal
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Self-Service /my-resignation |
| **Role** | Employee |

**Preconditions:**
1. Employee logged into self-service portal
2. Employee has no pending resignation

**Steps:**
1. Navigate to /my-resignation in self-service portal
2. Enter resignation reason: "Personal reasons"
3. Set requested last working day: 30 days from today
4. Attach resignation letter (PDF)
5. Submit resignation

**Expected Results:**
- Resignation request created with status "Submitted"
- Notice period calculated based on contract/policy (e.g., 30 days)
- Last working day proposed by employee
- Notification sent to HR Manager and direct manager
- Confirmation message displayed to employee

---

#### TC-OFF-002: HR creates resignation on behalf of employee (Admin Portal)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /offboarding/resignations/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /offboarding/resignations/create
2. Select employee: Salma Khaldi
3. Enter reason: "Relocation"
4. Set submission date: today
5. Set requested last working day
6. Click Save

**Expected Results:**
- Resignation created in system
- Status: "Submitted"
- Employee notified of recorded resignation

---

#### TC-OFF-003: Resignation status transitions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/resignations/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Resignation request in "Submitted" status

**Steps:**
1. View resignation — status is "Submitted"
2. Move to "UnderReview"
3. Approve the resignation — status changes to "Approved"

**Expected Results:**
- Valid transitions: Submitted -> UnderReview -> Approved OR Rejected
- Each transition logged with timestamp and actor
- Notification sent to employee at each status change

**Status Transition Table:**

| From | To | Actor |
|------|----|-------|
| Submitted | UnderReview | HR Manager |
| UnderReview | Approved | HR Manager / Branch Manager |
| UnderReview | Rejected | HR Manager / Branch Manager |
| Submitted | Withdrawn | Employee |

---

#### TC-OFF-004: Reject resignation with reason
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /offboarding/resignations/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to resignation in "UnderReview" status
2. Click Reject
3. Enter reason: "Retention offer accepted by employee"
4. Confirm

**Expected Results:**
- Status changes to "Rejected"
- Rejection reason recorded
- Employee notified of rejection
- Employee remains active

---

#### TC-OFF-005: Employee withdraws resignation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Self-Service /my-resignation |
| **Role** | Employee |

**Preconditions:**
1. Resignation in "Submitted" status (not yet approved)

**Steps:**
1. Navigate to /my-resignation in self-service portal
2. Click "Withdraw Resignation"
3. Confirm withdrawal

**Expected Results:**
- Status changes to "Withdrawn"
- Cannot withdraw after status is "Approved"
- HR Manager notified of withdrawal
- Employee continues normal employment

---

#### TC-OFF-006: Last working day calculation based on notice period
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /offboarding/resignations/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Employee contract specifies 30-day notice period

**Steps:**
1. View approved resignation
2. Check calculated last working day

**Expected Results:**
- Last working day = submission date + notice period (30 days)
- Business days considered (excludes weekends/holidays based on branch calendar)
- HR can override last working day if mutually agreed

---

#### TC-OFF-007: List resignations with status filter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /offboarding/resignations |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /offboarding/resignations
2. Filter by status: "UnderReview"
3. Search by employee name

**Expected Results:**
- DataTableComponent shows filtered resignations
- Columns: Employee Name, Department, Submission Date, Last Working Day, Status, Actions
- Status filter options: Submitted, UnderReview, Approved, Rejected, Withdrawn
- Search works on employee name

---

#### TC-OFF-008: Cannot submit duplicate resignation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | Self-Service /my-resignation |
| **Role** | Employee |

**Preconditions:**
1. Employee has an active resignation in Submitted or UnderReview status

**Steps:**
1. Navigate to /my-resignation
2. Attempt to submit a new resignation

**Expected Results:**
- Form disabled or not shown
- Message: "You already have a pending resignation request"
- Existing resignation details displayed instead

---

### B. Terminations

#### TC-OFF-009: Create termination record — Voluntary
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/terminations/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /offboarding/terminations/create
2. Select employee
3. Select reason: "Voluntary"
4. Set effective date: 2026-05-15
5. Enter notes: "Employee resigned after accepted offer elsewhere"
6. Click Save

**Expected Results:**
- Termination record created
- Reason categorized as Voluntary
- Effective date recorded
- Employee status updated on effective date

---

#### TC-OFF-010: Create termination — all reason types
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/terminations/create |
| **Role** | HR Manager |

**Steps:**
1. Open termination create form
2. Verify all reason types in dropdown

**Expected Results:**
- Reason types available:

| Reason | Description |
|--------|-------------|
| Voluntary | Employee-initiated departure |
| Involuntary | Employer-initiated termination |
| EndOfContract | Fixed-term contract expired |
| Misconduct | Termination due to policy violation |
| Redundancy | Position eliminated |
| Retirement | Employee retirement |

- Each reason type selectable
- Selected reason saved correctly

---

#### TC-OFF-011: Termination requires effective date
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /offboarding/terminations/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to termination create form
2. Select employee and reason
3. Leave effective date empty
4. Click Save

**Expected Results:**
- Validation error: effective date is required
- Termination not created

---

#### TC-OFF-012: Attach documentation to termination
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /offboarding/terminations/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to termination record
2. Upload termination letter (PDF)
3. Upload supporting documentation (e.g., warning letters for misconduct)

**Expected Results:**
- Documents uploaded via FileUploadComponent
- Files linked to termination record via FileAttachment entity
- Documents downloadable from the termination view page

---

#### TC-OFF-013: View termination details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /offboarding/terminations/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /offboarding/terminations/{id}

**Expected Results:**
- DefinitionListComponent shows: Employee Name, Department, Branch, Reason, Effective Date, Notes
- StatusBadgeComponent shows termination reason type
- Attached documents listed with download links
- Related clearance and final settlement status shown

---

#### TC-OFF-014: Termination approval workflow
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /offboarding/terminations/:id |
| **Role** | HR Manager |

**Steps:**
1. Create termination record
2. Submit for approval
3. Branch Manager reviews and approves

**Expected Results:**
- Termination follows approval workflow if configured
- Approval status tracked
- Cannot finalize termination without required approvals
- Involuntary and Misconduct terminations may require additional approval levels

---

#### TC-OFF-015: List terminations with filters
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /offboarding/terminations |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /offboarding/terminations
2. Filter by reason type
3. Filter by date range

**Expected Results:**
- DataTableComponent shows termination records
- Filters work correctly
- Pagination functional

---

### C. Exit Interviews

#### TC-OFF-016: Create exit interview with structured feedback
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/terminations/:id (exit interview section) |
| **Role** | HR Manager |

**Preconditions:**
1. Approved resignation or termination record exists

**Steps:**
1. Navigate to the offboarding record
2. Click "Schedule Exit Interview" or navigate to exit interview form
3. Set interview date
4. Conduct interview and fill form:
   - Overall satisfaction rating: 3/5
   - Reason for leaving: "Better career opportunity"
   - What did you enjoy most: "Team collaboration"
   - What could be improved: "Career growth opportunities"
   - Would you recommend the company: Yes
5. Save

**Expected Results:**
- Exit interview recorded linked to employee's termination/resignation
- All feedback fields saved
- Satisfaction rating stored

---

#### TC-OFF-017: Exit interview satisfaction rating scale
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | Exit interview form |
| **Role** | HR Manager |

**Steps:**
1. Open exit interview form
2. Check satisfaction rating options

**Expected Results:**
- Rating scale: 1 (Very Dissatisfied) to 5 (Very Satisfied)
- Rating required for submission
- Visual representation (stars, number scale, or radio buttons)

---

#### TC-OFF-018: Exit interview improvement suggestions field
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Exit interview form |
| **Role** | HR Manager |

**Steps:**
1. Fill in improvement suggestions with detailed feedback
2. Save

**Expected Results:**
- Free-text field accepts multi-line input
- Content preserved including line breaks
- No character limit or reasonable maximum (e.g., 2000 characters)

---

#### TC-OFF-019: Rehire recommendation tracking
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Exit interview form |
| **Role** | HR Manager |

**Steps:**
1. Complete exit interview
2. Set rehire recommendation: "Yes" / "No" / "Conditional"
3. If conditional, add notes: "After 12 months and with improved attendance"
4. Save

**Expected Results:**
- Rehire recommendation stored on exit interview record
- Visible on employee's historical record
- Available for future hiring decisions if employee re-applies

---

#### TC-OFF-020: View exit interview details
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | Exit interview view |
| **Role** | HR Manager |

**Steps:**
1. Navigate to completed exit interview

**Expected Results:**
- All feedback fields displayed via DefinitionListComponent
- Satisfaction rating shown with StatusBadgeComponent
- Rehire recommendation clearly visible
- Interview date and interviewer name shown

---

### D. Clearance

#### TC-OFF-021: Create department-specific clearance checklist
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/pending-clearance |
| **Role** | HR Manager |

**Preconditions:**
1. Approved resignation or termination exists

**Steps:**
1. Navigate to clearance management
2. Initiate clearance for the departing employee
3. System generates department-specific items

**Expected Results:**
- Clearance checklist created with department-specific items:

| Department | Items |
|-----------|-------|
| IT | Return laptop, Revoke system access, Return access card, Deactivate email |
| HR | Return ID badge, Collect resignation letter, Update records, Benefits termination |
| Finance | Clear pending advances, Settle travel claims, Final expense report, Loan clearance |

- Each item has: name, department, status (Pending), assigned to

---

#### TC-OFF-022: IT clearance items — laptop and access revocation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/pending-clearance |
| **Role** | IT Manager |

**Steps:**
1. Navigate to pending clearance
2. Find employee's clearance
3. Complete IT items:
   - Mark "Return laptop" as completed (add serial number note)
   - Mark "Revoke system access" as completed
   - Mark "Return access card" as completed

**Expected Results:**
- Each item status changes to "Completed"
- Completion date and completer recorded
- IT department clearance section shows progress

---

#### TC-OFF-023: HR clearance items — documents and benefits
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /offboarding/pending-clearance |
| **Role** | HR Manager |

**Steps:**
1. Complete HR clearance items:
   - Collect and file resignation letter
   - Update employee records
   - Process benefits termination

**Expected Results:**
- HR items marked complete
- Notes added for each completed item

---

#### TC-OFF-024: Finance clearance items — advances and loans
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /offboarding/pending-clearance |
| **Role** | Finance Manager |

**Steps:**
1. Review employee's pending financial items
2. Clear pending advances: amount noted
3. Settle travel claims
4. Record loan balance for final settlement deduction

**Expected Results:**
- Financial items cleared with amounts recorded
- Outstanding loan amount flagged for final settlement deduction
- Finance clearance complete

---

#### TC-OFF-025: Clearance completion tracking
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/pending-clearance |
| **Role** | HR Manager |

**Steps:**
1. View employee's clearance checklist
2. Check overall progress

**Expected Results:**
- Progress bar showing X/Y items completed
- Department-wise breakdown of completion
- Cannot proceed to final settlement until all mandatory items cleared
- Outstanding items highlighted

---

#### TC-OFF-026: Pending clearance dashboard
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /offboarding/pending-clearance |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /offboarding/pending-clearance

**Expected Results:**
- List of all employees with pending clearance
- Columns: Employee Name, Department, Last Working Day, Clearance Progress, Actions
- Filter by department, status
- Sort by last working day (urgency)

---

#### TC-OFF-027: Mark clearance item with notes
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /offboarding/pending-clearance |
| **Role** | Department Manager |

**Steps:**
1. Open a clearance item
2. Mark as completed
3. Add notes: "Laptop returned in good condition, serial #ABC123"
4. Save

**Expected Results:**
- Item marked complete with notes
- Timestamp and user who completed recorded
- Notes visible on clearance detail view

---

### E. Final Settlements

#### TC-OFF-028: Generate final settlement calculation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/final-settlements |
| **Role** | HR Manager |

**Preconditions:**
1. All clearance items completed for the employee
2. Approved termination/resignation exists

**Steps:**
1. Navigate to /offboarding/final-settlements
2. Click "Generate Settlement" for the employee
3. System calculates all components

**Expected Results:**
- Final settlement generated with components:

| Component | Type | Example Amount |
|-----------|------|---------------|
| Pending Salary | Addition | 15 days prorated = 7,500 SAR |
| Leave Encashment | Addition | 12 days x daily rate = 6,000 SAR |
| End-of-Service | Addition | Saudi Labor Law calculation = 45,000 SAR |
| Pending Allowances | Addition | Transport + Housing prorated = 3,000 SAR |
| Loan Deduction | Deduction | -5,000 SAR |
| Advance Deduction | Deduction | -2,000 SAR |
| **Net Settlement** | **Total** | **64,500 SAR** |

- Formula: Net = (Pending Salary + Leave Encashment + EOS + Allowances) - (Loans + Advances)

---

#### TC-OFF-029: Pending salary calculation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/final-settlements/:id |
| **Role** | HR Manager |

**Steps:**
1. View final settlement details
2. Check pending salary component

**Expected Results:**
- Pending salary = (Monthly Salary / Working Days in Month) x Days Worked in Final Month
- Accurate to the last working day
- Includes any unpaid overtime

---

#### TC-OFF-030: Leave encashment calculation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/final-settlements/:id |
| **Role** | HR Manager |

**Steps:**
1. View leave encashment component
2. Verify calculation

**Expected Results:**
- Leave encashment = Remaining Leave Balance (days) x Daily Rate
- Daily rate = Monthly Salary / 30 (or per policy)
- Only encashable leave types included (e.g., Annual Leave)
- Sick leave and other non-encashable types excluded

---

#### TC-OFF-031: End-of-service benefit calculation (Saudi Labor Law)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/final-settlements/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Employee with 8 years of service
2. Monthly salary: 15,000 SAR

**Steps:**
1. View EOS benefit component
2. Verify calculation

**Expected Results:**
- Saudi Labor Law EOS calculation:
  - First 5 years: 0.5 x monthly salary x 5 = 37,500 SAR
  - Remaining 3 years: 1.0 x monthly salary x 3 = 45,000 SAR
  - Total EOS: 82,500 SAR
- For resignation (voluntary):
  - 1-2 years: 0 (no EOS)
  - 2-5 years: 1/3 of calculated amount
  - 5-10 years: 2/3 of calculated amount
  - 10+ years: full amount
- For termination: full amount regardless of tenure

---

#### TC-OFF-032: Deductions — loans and advances
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /offboarding/final-settlements/:id |
| **Role** | HR Manager |

**Steps:**
1. View deduction components
2. Verify loan and advance balances

**Expected Results:**
- Outstanding loan balance deducted from settlement
- Pending salary advances deducted
- Any other company debts listed as deductions
- Each deduction itemized with description and amount
- Total deductions clearly shown

---

#### TC-OFF-033: Review and approve final settlement
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /offboarding/final-settlements/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to generated final settlement
2. Review all components
3. Adjust if needed (with justification)
4. Submit for approval
5. Approver (Finance/GM) reviews and approves

**Expected Results:**
- Settlement marked as "Approved"
- All adjustments logged with reason
- Approval chain followed
- Cannot modify after final approval

---

#### TC-OFF-034: Payment tracking for final settlement
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /offboarding/final-settlements/:id |
| **Role** | HR Manager |

**Steps:**
1. After settlement approved
2. Record payment:
   - Payment date
   - Payment method (bank transfer, check)
   - Reference number
3. Mark as paid

**Expected Results:**
- Settlement status changes to "Paid"
- Payment details recorded
- Payment date and reference stored
- Settlement process complete

---

#### TC-OFF-035: Final settlement cannot be generated without clearance
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /offboarding/final-settlements |
| **Role** | HR Manager |

**Preconditions:**
1. Employee has incomplete clearance items

**Steps:**
1. Navigate to final settlements
2. Attempt to generate settlement for employee with pending clearance

**Expected Results:**
- Error: "Clearance process incomplete. X items pending."
- Settlement not generated
- Link to pending clearance items provided

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Resignations | 8 | 2 | 5 | 0 | 0 |
| B. Terminations | 7 | 2 | 3 | 1 | 0 |
| C. Exit Interviews | 5 | 1 | 3 | 1 | 0 |
| D. Clearance | 7 | 3 | 2 | 1 | 0 |
| E. Final Settlements | 8 | 4 | 3 | 0 | 0 |
| **TOTAL** | **35** | **12** | **16** | **3** | **0** |
