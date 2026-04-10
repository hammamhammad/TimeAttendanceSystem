# TC-WF: Approval Workflows — Test Cases

## Module Overview

Approval Workflows provide configurable multi-step approval processes for all request types in TecAxle HRMS (Vacation, Excuse, RemoteWork, Overtime, AttendanceCorrection, Transfer, Promotion, Resignation, etc.). The workflow engine supports sequential and conditional step routing, multiple approver types (DirectManager, DepartmentHead, Role, SpecificUser, System), delegation of authority, timeout/escalation policies, and real-time bilingual notifications via SignalR. Workflows are defined per entity type with optional branch scoping and priority-based selection.

**Admin Pages**: `/settings/workflows`, `/settings/workflows/create`, `/settings/workflows/:id/view`, `/approvals`, `/approvals/history`
**Self-Service Pages**: `/pending-approvals`
**API Endpoints**: `GET/POST/PUT/DELETE /api/v1/workflows`, `POST /api/v1/approvals/{executionId}/approve`, `POST /api/v1/approvals/{executionId}/reject`, `POST /api/v1/approvals/{executionId}/delegate`, `GET /api/v1/portal/pending-approvals`
**Domain Entities**: `WorkflowDefinition.cs`, `WorkflowStep.cs`, `WorkflowInstance.cs`, `WorkflowStepExecution.cs`, `ApprovalDelegation.cs`
**Enums**: `WorkflowEntityType`, `WorkflowStepType`, `ApproverType`, `ApprovalAction`, `TimeoutAction`, `WorkflowStatus`
**Background Job**: `WorkflowTimeoutProcessingJob` (hourly)

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | IsSystemUser=true |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Employee ID 1001, manages HQ branch |
| Department Manager | sara.fahad@company.com | Emp@123! | Employee ID 1006, HR Dept Head |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee |

---

## Test Cases

### A. Workflow Definition Form

#### TC-WF-001: Workflow name is required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to /settings/workflows/create
2. Leave Name field empty
3. Fill other required fields
4. Submit

**Expected Results:**
- Validation error: "Workflow name is required"
- Workflow not created

---

#### TC-WF-002: Workflow name maxLength 255 characters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Boundary Value Tests:**

| # | Name Length | Valid? | Reason |
|---|-----------|--------|--------|
| 1 | 0 (empty) | No | Name required |
| 2 | 1 char | Yes | Minimum valid |
| 3 | 255 chars | Yes | At max length |
| 4 | 256 chars | No | Exceeds maxLength |

---

#### TC-WF-003: NameAr optional Arabic name field
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Steps:**
1. Create workflow with NameAr = "سير عمل الإجازات"
2. Submit
3. Switch language to Arabic

**Expected Results:**
- NameAr stored correctly
- Arabic name displayed when language is Arabic
- NameAr is optional — null is valid

---

#### TC-WF-004: Description maxLength 1000 characters
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Validation |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Boundary Value Tests:**

| # | Description Length | Valid? | Reason |
|---|-------------------|--------|--------|
| 1 | null/empty | Yes | Description is optional |
| 2 | 1000 chars | Yes | At max length |
| 3 | 1001 chars | No | Exceeds maxLength |

---

#### TC-WF-005: EntityType is required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to create workflow
2. Leave EntityType unselected
3. Submit

**Expected Results:**
- Validation error: entity type is required
- Workflow not created
- Dropdown shows all WorkflowEntityType values:
  - Vacation (1), Excuse (2), RemoteWork (3), Overtime (4), AttendanceCorrection (5), Timesheet (6), Transfer (7), Promotion (8), Payroll (9), Resignation (10), FinalSettlement (11), SalaryAdjustment (22), AllowanceRequest (23), JobRequisition (30), PerformanceReview (31), PerformanceImprovementPlan (32), OfferLetter (33), LetterRequest (34), ExpenseClaim (35), LoanApplication (36), SalaryAdvance (37), TrainingEnrollment (40), DisciplinaryAction (41), Grievance (42), BenefitEnrollment (51), ShiftSwap (20)

---

#### TC-WF-006: BranchId optional — null means organization-wide
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Steps:**
1. Create workflow with BranchId = null
2. Create another workflow with BranchId = 101 (HQ)

**Expected Results:**
- BranchId null: workflow applies organization-wide to all branches
- BranchId 101: workflow applies only to HQ branch
- Both created successfully

---

#### TC-WF-007: IsDefault boolean — only one default per entity type per branch
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Preconditions:**
1. Default workflow exists for EntityType = Vacation, BranchId = null

**Steps:**
1. Create another workflow for EntityType = Vacation, BranchId = null, IsDefault = true
2. Submit

**Expected Results:**
- Either: previous default is unset (only one default per entity type per branch scope)
- Or: validation error preventing duplicate defaults
- System must enforce: at most one default workflow per entity type per branch scope

---

#### TC-WF-008: At least one step required
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Steps:**
1. Fill workflow name, entity type
2. Do not add any steps
3. Submit

**Expected Results:**
- Validation error: "Workflow must have at least one step"
- Workflow not created or not activatable
- `ValidateForActivation()` requires at least one step

---

#### TC-WF-009: Step configuration — all step fields
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Steps:**
1. Add a step with:
   - StepOrder = 1
   - Name = "Manager Approval"
   - StepType = Approval (1)
   - ApproverType = DirectManager (1)
   - TimeoutHours = 48
   - TimeoutAction = Escalate (1)
   - AllowDelegation = true
   - RequireCommentsOnApprove = false
   - RequireCommentsOnReject = true
2. Submit

**Expected Results:**
- Step created with all fields properly stored
- StepOrder must be > 0
- StepType options: Approval (1), Notification (2), Validation (3), Condition (4)
- ApproverType options: DirectManager (1), Role (2), SpecificUser (3), DepartmentHead (4), BranchManager (5), System (6)
- TimeoutAction options: Expire (0), Escalate (1), AutoApprove (2), AutoReject (3)

---

#### TC-WF-010: Step order must be sequential starting from 1
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Steps:**
1. Add steps with StepOrder = 1, 3 (skipping 2)
2. Submit

**Expected Results:**
- Validation error: "Step order must be sequential starting from 1"
- Steps must be 1, 2, 3, ... with no gaps
- `ValidateForActivation()` checks step order continuity

---

### B. Workflow Engine Steps

#### TC-WF-011: Starting a workflow creates instance in Pending status
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | Employee |

**Preconditions:**
1. Active workflow definition exists for EntityType = Vacation
2. Employee submits a vacation request

**Steps:**
1. Create a vacation request via API or self-service
2. Check workflow instance created

**Expected Results:**
- WorkflowInstance created with:
  - WorkflowDefinitionId = matching definition
  - EntityType = Vacation (1)
  - EntityId = vacation request ID
  - Status = InProgress (2) after first step processing
  - RequestedByUserId = submitting user
  - RequestedAt = current UTC time
- First step execution created

---

#### TC-WF-012: Approver resolution — SpecificUser
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Workflow step with ApproverType = SpecificUser (3), ApproverUserId = 42

**Steps:**
1. Trigger workflow for a request

**Expected Results:**
- WorkflowStepExecution.AssignedToUserId = 42
- Only user ID 42 can approve this step
- ApprovalPending notification sent to user 42

---

#### TC-WF-013: Approver resolution — DirectManager
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Workflow step with ApproverType = DirectManager (1)
2. Requesting employee has ManagerId set via EmployeeUserLinks

**Steps:**
1. Employee submits request
2. System resolves direct manager from employee hierarchy

**Expected Results:**
- WorkflowStepExecution.AssignedToUserId = employee's direct manager user ID
- Manager resolved via EmployeeUserLinks / Employee.ManagerId
- If no manager found, step may be auto-skipped or error raised

---

#### TC-WF-014: Approver resolution — DepartmentHead
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Workflow step with ApproverType = DepartmentHead (4)
2. Requesting employee belongs to a department with a head assigned

**Steps:**
1. Employee submits request

**Expected Results:**
- System resolves department head from employee's department hierarchy
- WorkflowStepExecution.AssignedToUserId = department head's user ID

---

#### TC-WF-015: Approver resolution — Role
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Workflow step with ApproverType = Role (2), ApproverRoleId = HR Manager role ID
2. Multiple users have the HR Manager role

**Steps:**
1. Employee submits request

**Expected Results:**
- Any user with the specified role can approve this step
- Step execution assigned to one or all users with the role
- First user to take action completes the step

---

#### TC-WF-016: Approver resolution — BranchManager
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Workflow step with ApproverType = BranchManager (5)
2. Requesting employee assigned to a branch with a manager

**Steps:**
1. Employee submits request

**Expected Results:**
- System resolves branch manager from employee's branch
- WorkflowStepExecution.AssignedToUserId = branch manager's user ID

---

#### TC-WF-017: Approver resolution — System (auto-approval)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Workflow step with ApproverType = System (6)

**Steps:**
1. Employee submits request
2. Workflow reaches System step

**Expected Results:**
- Step auto-processed without human intervention
- `WorkflowStep.RequiresHumanApproval()` returns false for System type
- StepExecution.Action = AutoApproved (6)
- Workflow immediately advances to next step

---

#### TC-WF-018: Definition selection priority — branch-specific default first
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Org-wide default workflow for Vacation (BranchId = null, IsDefault = true, Priority = 0)
2. Branch-specific default workflow for Vacation, BranchId = 101 (IsDefault = true, Priority = 0)
3. Branch-specific non-default workflow for Vacation, BranchId = 101 (IsDefault = false, Priority = 10)

**Steps:**
1. Employee in branch 101 submits vacation request

**Expected Results:**
- Selection priority order:
  1. Branch-specific default (BranchId = 101, IsDefault = true) — **selected**
  2. Branch-specific highest Priority (BranchId = 101, highest Priority value)
  3. Org-wide default (BranchId = null, IsDefault = true)
  4. Org-wide highest Priority
- Branch-specific default takes precedence over org-wide default

---

#### TC-WF-019: Approval action records and advances workflow
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Workflow instance at step 1 (Manager Approval), assigned to branch manager

**Steps:**
1. Navigate to /approvals
2. Click Approve on the pending item
3. Add comments: "Approved, enjoy your time off"
4. Submit

**Expected Results:**
- WorkflowStepExecution:
  - Action = Approved (1)
  - ActionTakenByUserId = branch manager's user ID
  - ActionTakenAt = current UTC time
  - Comments = "Approved, enjoy your time off"
- If more steps exist: workflow advances to next step
- If final step: WorkflowInstance.Status = Approved (3), CompletedAt set

---

#### TC-WF-020: Rejection requires comments
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Workflow step has RequireCommentsOnReject = true (default)

**Steps:**
1. Navigate to pending approvals
2. Click Reject on a pending item
3. Leave comments empty
4. Submit

**Expected Results:**
- Validation error: "Comments are required for rejection"
- Rejection not processed until comments provided

---

#### TC-WF-021: Rejection with comments immediately completes workflow as Rejected
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Steps:**
1. Reject a workflow step with comments: "Insufficient justification"

**Expected Results:**
- WorkflowStepExecution.Action = Rejected (2)
- WorkflowInstance.Status = Rejected (4) — immediately, regardless of remaining steps
- WorkflowInstance.FinalOutcome = Rejected (2)
- WorkflowInstance.CompletedAt = current UTC time
- WorkflowInstance.FinalComments = "Insufficient justification"
- Original request entity status updated to Rejected
- RequestRejected notification sent to requester

---

#### TC-WF-022: Multi-step workflow — step 1 approved, advances to step 2
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Multiple Approvers |

**Preconditions:**
1. Workflow with 2 steps:
   - Step 1: DirectManager approval
   - Step 2: DepartmentHead approval

**Steps:**
1. Employee submits request
2. Direct manager approves step 1
3. Check workflow state

**Expected Results:**
- Step 1 execution: Action = Approved
- WorkflowInstance.CurrentStepId moves to step 2
- WorkflowInstance.Status remains InProgress (2)
- New step execution created for step 2, assigned to department head
- ApprovalPending notification sent to department head
- After step 2 approved: WorkflowInstance.Status = Approved (3)

---

#### TC-WF-023: RequireCommentsOnApprove enforced when enabled
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Workflow step has RequireCommentsOnApprove = true

**Steps:**
1. Approve a step without adding comments
2. Submit

**Expected Results:**
- Validation error: comments required for approval
- Approval not processed until comments provided

---

#### TC-WF-024: Workflow must have at least one Approval step type
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Steps:**
1. Create workflow with only Notification (2) steps — no Approval steps
2. Attempt to activate

**Expected Results:**
- Validation error: "Workflow must have at least one approval step"
- `ValidateForActivation()` checks for at least one StepType = Approval

---

#### TC-WF-025: Conditional step requires ConditionJson
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /settings/workflows/create |
| **Role** | System Admin |

**Steps:**
1. Add a step with StepType = Condition (4) but ConditionJson = null/empty

**Expected Results:**
- Validation error: "Conditional step requires a condition to be specified"
- Step not valid until ConditionJson is provided
- Valid format example: `{"field": "days", "operator": ">", "value": 5}`

---

### C. Delegation

#### TC-WF-026: Delegation only allowed when AllowDelegation = true
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Workflow step with AllowDelegation = false

**Steps:**
1. Navigate to pending approval for this step
2. Attempt to delegate

**Expected Results:**
- Delegate button/option not shown or disabled
- API rejects delegation attempt for this step

---

#### TC-WF-027: Cannot delegate to self
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Steps:**
1. Attempt to delegate an approval to yourself (DelegatorUserId == DelegateUserId)

**Expected Results:**
- Validation error: "Cannot delegate to yourself"
- `ApprovalDelegation.ValidateDelegation()` rejects self-delegation
- Delegation not created

---

#### TC-WF-028: Delegation creates new execution with IsDelegated = true
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Step has AllowDelegation = true
2. Branch manager assigned to step

**Steps:**
1. Branch manager clicks Delegate
2. Selects delegatee user
3. Adds delegation comment: "On leave, please handle"
4. Submit

**Expected Results:**
- Original execution:
  - Action = Delegated (3)
  - ActionTakenByUserId = branch manager
  - DelegatedToUserId = delegatee user ID
  - Comments = "On leave, please handle"
- New execution created:
  - IsDelegated = true
  - DelegatedFromExecutionId = original execution ID
  - AssignedToUserId = delegatee user ID
  - Action = null (pending)

---

#### TC-WF-029: Delegatee receives notification
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Notifications |
| **Role** | Delegatee |

**Steps:**
1. After delegation (TC-WF-028)
2. Check delegatee's notifications

**Expected Results:**
- DelegationReceived notification sent to delegatee
- Notification includes:
  - Title (EN/AR)
  - Message with delegator name and request details
  - Action URL to the approval

---

#### TC-WF-030: Delegatee can approve the step
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Delegatee |

**Steps:**
1. Delegatee logs in
2. Navigates to pending approvals
3. Sees the delegated item
4. Approves with comments

**Expected Results:**
- Delegatee's execution:
  - Action = Approved (1)
  - ActionTakenByUserId = delegatee user ID
- Workflow advances to next step or completes
- Same outcome as if original approver had acted

---

#### TC-WF-031: Delegatee can reject the step
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Delegatee |

**Steps:**
1. Delegatee rejects with comments: "Cannot approve, insufficient budget"

**Expected Results:**
- Rejection processed same as direct approver rejection
- WorkflowInstance.Status = Rejected (4)
- Comments stored on step execution
- RequestRejected notification sent to requester

---

#### TC-WF-032: Delegation restricted by EntityTypesJson
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. ApprovalDelegation with EntityTypesJson = "Vacation,Excuse"
2. Workflow for RemoteWork request arrives

**Steps:**
1. Check if delegation applies to RemoteWork entity type

**Expected Results:**
- `ApprovalDelegation.AppliesToEntityType(WorkflowEntityType.RemoteWork)` returns false
- Delegation does NOT apply — RemoteWork not in the EntityTypesJson list
- Approval stays with original approver
- EntityTypesJson = null means all entity types are delegated

---

#### TC-WF-033: Active delegation date range check
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Delegation with StartDate = 2026-04-01, EndDate = 2026-04-15, IsActive = true

**Steps:**
1. Check delegation on 2026-03-31 (before start)
2. Check delegation on 2026-04-01 (start date)
3. Check delegation on 2026-04-10 (within range)
4. Check delegation on 2026-04-15 (end date)
5. Check delegation on 2026-04-16 (after end)

**Expected Results:**
- `IsCurrentlyEffective()`:
  - 2026-03-31: false (before start)
  - 2026-04-01: true (inclusive start)
  - 2026-04-10: true (within range)
  - 2026-04-15: true (inclusive end)
  - 2026-04-16: false (after end)
- Only effective delegations are considered for approval routing

---

### D. Timeout & Escalation

#### TC-WF-034: WorkflowTimeoutProcessingJob runs hourly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Steps:**
1. Verify Coravel job registration
2. Check job schedule

**Expected Results:**
- `WorkflowTimeoutProcessingJob` registered in Coravel scheduler
- Runs every hour
- Scans all active tenant databases for overdue step executions

---

#### TC-WF-035: Overdue detection — DueAt < now and no action taken
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Step execution with DueAt = 2 hours ago, Action = null

**Steps:**
1. WorkflowTimeoutProcessingJob executes

**Expected Results:**
- `WorkflowStepExecution.IsOverdue()` returns true when `DueAt.HasValue && DateTime.UtcNow > DueAt.Value && IsPending()`
- Job identifies this execution as overdue
- Processes according to step's TimeoutAction

---

#### TC-WF-036: DueAt calculated from step timeout config
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | System |

**Preconditions:**
1. Workflow step with TimeoutHours = 48

**Steps:**
1. Step execution created at 2026-04-10 10:00 UTC

**Expected Results:**
- `WorkflowStep.CalculateDueDate(assignedAt)` returns assignedAt + 48 hours
- DueAt = 2026-04-12 10:00 UTC
- If TimeoutHours is null: DueAt = null (no timeout)
- `WorkflowStep.HasTimeout()` returns true when TimeoutHours > 0

---

#### TC-WF-037: TimeoutAction = AutoApprove
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Step with TimeoutAction = AutoApprove (2), TimeoutHours = 24
2. Step execution overdue

**Steps:**
1. WorkflowTimeoutProcessingJob processes overdue execution

**Expected Results:**
- StepExecution.Action = AutoApproved (6)
- StepExecution.ActionTakenAt = job execution time
- StepExecution.Comments = "Automatically approved by system"
- Workflow advances to next step (or completes if final step)

---

#### TC-WF-038: TimeoutAction = AutoReject
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Step with TimeoutAction = AutoReject (3), TimeoutHours = 24
2. Step execution overdue

**Steps:**
1. WorkflowTimeoutProcessingJob processes overdue execution

**Expected Results:**
- StepExecution.Action = AutoRejected (7)
- WorkflowInstance.Status = Rejected (4)
- WorkflowInstance.FinalOutcome = AutoRejected
- Original request entity status updated to Rejected
- RequestRejected notification sent to requester

---

#### TC-WF-039: TimeoutAction = Escalate with EscalationStepId
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Step 1 with TimeoutAction = Escalate (1), EscalationStepId = step 3 ID
2. Step execution overdue

**Steps:**
1. WorkflowTimeoutProcessingJob processes overdue execution

**Expected Results:**
- StepExecution.Action = Escalated (8)
- StepExecution.Comments = "Escalated due to timeout"
- WorkflowInstance.CurrentStepId moves to EscalationStepId (step 3)
- New step execution created for escalation step
- RequestEscalated notification sent to new approver

---

#### TC-WF-040: TimeoutAction = Escalate without EscalationStepId falls back to Expire
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Step with TimeoutAction = Escalate (1), EscalationStepId = null

**Steps:**
1. Step times out

**Expected Results:**
- No escalation step configured — falls back to Expire behavior
- WorkflowInstance.Status = Expired (6)
- Request remains in pending state or is marked expired

---

#### TC-WF-041: TimeoutAction = Expire
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Step with TimeoutAction = Expire (0, default)
2. Step execution overdue

**Steps:**
1. WorkflowTimeoutProcessingJob processes overdue execution

**Expected Results:**
- StepExecution.Action = TimedOut (5)
- WorkflowInstance.Status = Expired (6)
- Workflow terminates — no further processing
- `WorkflowInstance.IsTerminated()` returns true for Expired status

---

### E. Pending Approvals

#### TC-WF-042: Pending approvals — direct assignments shown
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Step executions exist with AssignedToUserId = current user, Action = null

**Steps:**
1. Navigate to /approvals (admin) or /pending-approvals (self-service)

**Expected Results:**
- All pending step executions assigned to current user are listed
- Each item shows: request type, requester name, submitted date, step name
- Items are sorted by most recent first

---

#### TC-WF-043: Pending approvals — delegated items included
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Delegatee |

**Preconditions:**
1. Active ApprovalDelegation from User A to current user
2. Step execution assigned to User A, pending action

**Steps:**
1. Current user navigates to pending approvals

**Expected Results:**
- Delegated items appear alongside direct assignments
- Delegated items marked with delegation indicator
- Items from both sources merged and deduplicated
- User can act on delegated items

---

#### TC-WF-044: Pending approvals deduplication
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Same step execution appears via both direct assignment and delegation

**Steps:**
1. Check pending approvals list

**Expected Results:**
- Item appears only once (deduplicated)
- No duplicate entries in the list

---

#### TC-WF-045: Self-service pending approvals for managers
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | Self-Service /pending-approvals |
| **Role** | Branch Manager |

**Preconditions:**
1. Manager logged into self-service portal
2. Pending approvals exist for manager

**Steps:**
1. Navigate to /pending-approvals

**Expected Results:**
- Page renders with pending approval list
- Manager can approve/reject directly from this page
- Shows request details: requester, type, dates, reason
- Approve and Reject buttons available
- Comments field for rejection (required) and approval (optional unless RequireCommentsOnApprove)

---

#### TC-WF-046: Admin approvals page with filters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /approvals |
| **Role** | System Admin |

**Steps:**
1. Navigate to /approvals in admin portal

**Expected Results:**
- Filter options: entity type, status, branch, date range
- DataTableComponent displays pending items
- Pagination supported
- Search by requester name

---

#### TC-WF-047: Approval history timeline
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /approvals/history |
| **Role** | System Admin |

**Steps:**
1. Navigate to /approvals/history
2. View a completed workflow's details

**Expected Results:**
- History shows all step executions in order
- Each entry shows: step name, assigned user, action taken, timestamp, comments
- Delegated steps show delegation chain
- Timeline/stepper visualization of workflow progress
- Rejected steps highlighted in red/danger variant
- Approved steps highlighted in green/success variant

---

#### TC-WF-048: Comments displayed on approval history
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /approvals/history |
| **Role** | System Admin |

**Steps:**
1. View history of a workflow with comments on multiple steps

**Expected Results:**
- Comments from each step execution displayed
- Approval comments, rejection reasons, delegation notes all shown
- FinalComments from WorkflowInstance shown at summary level
- Empty comments shown as "--" or not displayed

---

### F. Notifications

#### TC-WF-049: RequestSubmitted notification sent to requester
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Notifications |
| **Role** | Employee |

**Steps:**
1. Employee submits a request that triggers a workflow

**Expected Results:**
- Notification created with Type = RequestSubmitted
- Sent to the requesting employee
- Title in English and Arabic
- Message includes request type and submission confirmation
- Action URL navigates to the request detail page

---

#### TC-WF-050: ApprovalPending notification sent to approver
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Notifications |
| **Role** | Approver |

**Steps:**
1. Workflow step assigned to approver

**Expected Results:**
- Notification created with Type = ApprovalPending
- Sent to the assigned approver (or all users with role for Role-based approval)
- Includes requester name, request type, and step name
- Action URL navigates to the approval page
- Delivered in real-time via SignalR

---

#### TC-WF-051: RequestApproved notification on final approval
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Notifications |
| **Role** | Employee |

**Steps:**
1. Final approval step completed — workflow status = Approved

**Expected Results:**
- Notification created with Type = RequestApproved
- Sent to the original requester
- Title and message in both English and Arabic
- Message confirms request has been fully approved

---

#### TC-WF-052: RequestRejected notification on rejection
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | Notifications |
| **Role** | Employee |

**Steps:**
1. Approver rejects a workflow step

**Expected Results:**
- Notification created with Type = RequestRejected
- Sent to the original requester
- Includes rejection reason/comments
- Title and message bilingual (EN/AR)

---

#### TC-WF-053: RequestDelegated notification sent to delegatee
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Notifications |
| **Role** | Delegatee |

**Steps:**
1. Approver delegates step to another user

**Expected Results:**
- Notification created with Type = RequestDelegated (or DelegationReceived)
- Sent to the delegatee user
- Includes delegator name, request type, and delegation reason
- Action URL navigates to the pending approval

---

#### TC-WF-054: RequestEscalated notification sent to new approver
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Notifications |
| **Role** | Escalation Approver |

**Steps:**
1. Step times out with TimeoutAction = Escalate

**Expected Results:**
- Notification created with Type = RequestEscalated
- Sent to the new approver (at escalation step)
- Includes information about original approver timeout
- Title and message bilingual

---

#### TC-WF-055: ApprovalReminder notification sent to pending approver
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | Notifications |
| **Role** | Approver |

**Preconditions:**
1. Step execution pending for extended time
2. ReminderSent = false

**Steps:**
1. Reminder job or logic triggers

**Expected Results:**
- Notification created with Type = ApprovalReminder
- Sent to the pending approver
- WorkflowStepExecution.ReminderSent = true
- WorkflowStepExecution.ReminderSentAt = current UTC time
- Reminder not sent again (ReminderSent flag prevents duplicates)
- Title and message bilingual (EN/AR)

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Workflow Definition Form | 10 | 4 | 4 | 2 |
| B. Workflow Engine Steps | 15 | 6 | 7 | 2 |
| C. Delegation | 8 | 3 | 4 | 1 |
| D. Timeout & Escalation | 8 | 2 | 6 | 0 |
| E. Pending Approvals | 7 | 2 | 3 | 2 |
| F. Notifications | 7 | 4 | 2 | 1 |
| **TOTAL** | **55** | **21** | **26** | **8** |
