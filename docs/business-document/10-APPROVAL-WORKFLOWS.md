# 10 - Approval Workflows

## 10.1 Overview

The approval workflow engine is the backbone of all request processing in TecAxle HRMS. It provides a configurable, multi-step approval system that supports different approver types, delegation, timeout escalation, conditional logic, and both parallel and sequential approval patterns. It is used by vacations, excuses, remote work, attendance corrections, salary adjustments, and many other modules.

## 10.2 Features

| Feature | Description |
|---------|-------------|
| Configurable Steps | Define multiple approval steps per workflow |
| Step Types | Approval, Notification, Condition, Automatic |
| Approver Types | Role, User, Manager, Direct Manager, Department Head |
| Delegation | Delegate approvals to other users |
| Timeout & Escalation | Auto-escalate on timeout |
| Conditional Logic | Skip or execute steps based on conditions |
| Parallel Approvals | Multiple approvers at the same step |
| Sequential Approvals | Ordered step-by-step approvals |
| Branch-Specific | Different workflows per branch |
| Workflow Types | Vacation, Excuse, RemoteWork, AttendanceCorrection, SalaryAdjustment, and more |

## 10.3 Entities

| Entity | Key Fields |
|--------|------------|
| WorkflowDefinition | Name, EntityType, BranchId, Steps[], IsActive |
| WorkflowStep | WorkflowDefinitionId, StepOrder, StepType, ApproverType, ApproverId/RoleId, TimeoutHours, EscalationAction |
| WorkflowInstance | WorkflowDefinitionId, EntityType, EntityId, CurrentStepOrder, Status, StartedAt, CompletedAt |
| WorkflowStepExecution | WorkflowInstanceId, StepOrder, AssignedTo, Action, Comments, ExecutedAt, Status |
| ApprovalDelegation | DelegatorId, DelegateeId, StartDate, EndDate, WorkflowType, IsActive |

## 10.4 Workflow Definition Creation Flow

```mermaid
graph TD
    A((Admin Creates Workflow)) --> B[Select Workflow Type]
    B --> B1[Vacation / Excuse / Remote Work / etc.]
    
    B1 --> C[Select Branch - or All Branches]
    
    C --> D[Define Step 1]
    D --> D1[Step Type: Approval]
    D1 --> D2[Approver: Direct Manager]
    D2 --> D3[Timeout: 48 hours]
    D3 --> D4[Escalation: Move to Next Step]
    
    D4 --> E[Define Step 2]
    E --> E1[Step Type: Approval]
    E1 --> E2[Approver: Department Head]
    E2 --> E3[Timeout: 72 hours]
    E3 --> E4[Escalation: Auto-Approve]
    
    E4 --> F{Add More Steps?}
    F -->|Yes| G[Define Step N...]
    G --> F
    
    F -->|No| H[Define Notification Step - Optional]
    H --> H1[Step Type: Notification]
    H1 --> H2[Notify: HR Department Role]
    
    H2 --> I[POST /api/v1/workflows]
    I --> J((Workflow Definition Created))
```

## 10.5 Complete Workflow Execution Flow

```mermaid
graph TD
    A((Request Submitted)) --> B[Find Active Workflow Definition]
    B --> C{Workflow Found for Entity Type + Branch?}
    
    C -->|No| D[Auto-Approve Request]
    
    C -->|Yes| E[Create WorkflowInstance]
    E --> F[Status: InProgress]
    F --> G[Set CurrentStepOrder = 1]
    
    G --> H[Execute Current Step]
    
    H --> I{Step Type?}
    
    I -->|Approval| J[Determine Approver]
    J --> K{Approver Type?}
    K -->|Direct Manager| L[Get Employee's Manager]
    K -->|Department Head| M[Get Department Manager]
    K -->|Role| N[Get Users with Specified Role]
    K -->|Specific User| O[Get Specified User]
    
    L --> P{Delegation Active?}
    M --> P
    N --> P
    O --> P
    
    P -->|Yes| Q[Redirect to Delegatee]
    P -->|No| R[Assign to Original Approver]
    
    Q --> S[Create WorkflowStepExecution]
    R --> S
    S --> T[Send Notification to Approver]
    T --> U[Wait for Response or Timeout]
    
    U --> V{Response Received?}
    V -->|Approved| W[Step Complete: Approved]
    V -->|Rejected| X[Workflow Complete: Rejected]
    V -->|Timeout| Y{Escalation Action?}
    
    Y -->|Auto-Approve| W
    Y -->|Move to Next Step| W
    Y -->|Auto-Reject| X
    Y -->|Escalate to Next Level| Z[Reassign to Higher Authority]
    Z --> T
    
    I -->|Notification| AA[Send Notification to Target]
    AA --> W
    
    I -->|Condition| AB[Evaluate Condition]
    AB --> AC{Condition Met?}
    AC -->|Yes| W
    AC -->|No| AD[Skip Remaining Steps - Auto-Approve]
    
    I -->|Automatic| AE[Execute Automatic Action]
    AE --> W
    
    W --> AF{More Steps?}
    AF -->|Yes| AG[Move to Next Step]
    AG --> H
    
    AF -->|No| AH[Workflow Complete: Approved]
    AH --> AI[Update Entity Status: Approved]
    AI --> AJ[Send Final Notification]
    
    X --> AK[Update Entity Status: Rejected]
    AK --> AL[Send Rejection Notification]
    
    D --> AM[Update Entity Status: Approved]
    
    AJ --> AN((Workflow Complete))
    AL --> AN
    AM --> AN
```

## 10.6 Approval Delegation Flow

```mermaid
graph TD
    A((Manager Sets Up Delegation)) --> B[Select Delegatee User]
    B --> C[Set Delegation Period]
    C --> C1[Start Date]
    C1 --> C2[End Date]
    
    C2 --> D[Select Workflow Types]
    D --> D1[All Types or Specific: Vacation, Excuse, etc.]
    
    D1 --> E[POST /api/v1/approvals/delegations]
    E --> F[Delegation Created: Active]
    
    F --> G((Delegation Active))
    
    G --> H[When Approval Arrives for Delegator]
    H --> I[System Checks for Active Delegation]
    I --> J{Within Delegation Period?}
    J -->|Yes| K[Redirect to Delegatee]
    K --> L[Notify Delegatee: New Approval Assigned]
    L --> M[Notify Original: Delegated to Delegatee]
    
    J -->|No| N[Keep with Original Approver]
    
    subgraph "Delegation End"
        O[End Date Reached]
        O --> P[Delegation Status: Expired]
        P --> Q[Future Approvals Go to Original]
    end
```

## 10.7 Workflow Timeout Processing Flow

```mermaid
graph TD
    A((Every Hour - WorkflowTimeoutProcessingJob)) --> B[Find All InProgress Workflow Instances]
    
    B --> C[For Each Instance]
    C --> D[Get Current Step Execution]
    D --> E[Calculate Time Since Assignment]
    
    E --> F{Time > Step TimeoutHours?}
    F -->|No| G[Skip - Still Within Window]
    
    F -->|Yes| H{Escalation Action?}
    
    H -->|AutoApprove| I[Mark Step: Auto-Approved]
    I --> J[Move to Next Step]
    
    H -->|AutoReject| K[Mark Step: Auto-Rejected]
    K --> L[Complete Workflow: Rejected]
    
    H -->|Escalate| M[Find Escalation Target]
    M --> N[Reassign Step to Higher Authority]
    N --> O[Send Escalation Notification]
    O --> P[Send Notification to Original: Escalated]
    
    H -->|MoveToNext| Q[Skip This Step]
    Q --> J
    
    J --> R{More Steps?}
    R -->|Yes| S[Execute Next Step]
    R -->|No| T[Complete Workflow: Approved]
    
    G --> U((Continue Waiting))
    L --> V((Timeout Processed))
    P --> V
    T --> V
```

## 10.8 Workflow Status Reference

| Workflow Status | Description |
|-----------------|-------------|
| InProgress | Workflow is active, waiting for current step |
| Completed | All steps approved, workflow finished successfully |
| Rejected | A step was rejected, workflow terminated |
| Cancelled | Request was cancelled by the submitter |
| TimedOut | All timeout actions exhausted |

| Step Execution Status | Description |
|----------------------|-------------|
| Pending | Waiting for approver action |
| Approved | Approver approved the step |
| Rejected | Approver rejected the step |
| Escalated | Step was escalated due to timeout |
| AutoApproved | System auto-approved due to timeout |
| Skipped | Step was skipped (condition not met) |
| Delegated | Step was delegated to another user |

## 10.9 Workflow Types and Typical Configurations

| Workflow Type | Typical Steps | Notes |
|--------------|---------------|-------|
| Vacation | Direct Manager -> HR | Short leaves may only need manager |
| Excuse | Direct Manager | Single step for most excuses |
| Remote Work | Direct Manager | Single step approval |
| Attendance Correction | Direct Manager -> HR | Two-step verification |
| Salary Adjustment | HR -> Finance -> VP | Multi-step financial approval |
| Resignation | Direct Manager -> HR -> VP | Escalated approval chain |
| Expense Claim | Direct Manager -> Finance | Financial approval required |
| Loan Application | HR -> Finance -> VP | High-value approval chain |
| Allowance Request | Direct Manager -> HR | Two-step approval |

## 10.10 Parallel vs Sequential Approval

```
Sequential Approval (Default):
==============================
Step 1: Direct Manager approves
         |
         v (Only after Step 1 is approved)
Step 2: HR Manager approves
         |
         v (Only after Step 2 is approved)
Step 3: VP approves
         |
         v
Final: Request Approved


Parallel Approval:
==================
Step 1: Direct Manager approves ----+
                                    |
Step 1: HR Manager approves --------+--> All must approve
                                    |
Step 1: Finance Head approves ------+
                                    |
                                    v
Final: Request Approved (only if ALL approve)
       Request Rejected (if ANY reject)
```
