# 18 - Offboarding

## 18.1 Overview

The offboarding module manages the complete employee exit process, including resignation requests, termination records, exit interviews, clearance checklists, and final settlement calculations. It ensures a structured and compliant separation process.

## 18.2 Features

| Feature | Description |
|---------|-------------|
| Resignation Requests | Employee-initiated resignation with notice period |
| Termination Records | Employer-initiated termination with reason classification |
| Exit Interviews | Structured feedback collection from departing employees |
| Clearance Checklists | Department-specific clearance items |
| Final Settlements | Comprehensive final payment calculation |
| End-of-Service Benefits | Saudi labor law compliant EOS calculation |

## 18.3 Entities

| Entity | Key Fields |
|--------|------------|
| ResignationRequest | EmployeeId, SubmissionDate, RequestedLastDay, NoticePeriod, Reason, Status |
| TerminationRecord | EmployeeId, TerminationType, TerminationDate, Reason, Documentation |
| ExitInterview | EmployeeId, InterviewDate, InterviewerName, Feedback, Ratings |
| ClearanceChecklist | EmployeeId, Items[], OverallStatus |
| ClearanceItem | ChecklistId, Department, ItemName, Status, CompletedBy, CompletedDate |
| FinalSettlement | EmployeeId, PendingSalary, LeaveEncashment, EOSBenefit, Deductions, TotalAmount, Status |

## 18.4 Complete Offboarding Flow

```mermaid
graph TD
    A((Exit Trigger)) --> B{Exit Type}
    
    B -->|Resignation| C[Employee Submits Resignation]
    B -->|Termination| D[HR Initiates Termination]
    
    C --> E[Resignation Approval Flow]
    D --> F[Termination Documentation]
    
    E --> G[Notice Period Begins]
    F --> G
    
    G --> H[Schedule Exit Interview]
    H --> I[Conduct Exit Interview]
    
    I --> J[Initiate Clearance Process]
    J --> K[Department Clearance Items]
    K --> L[All Items Cleared?]
    
    L -->|No| M[Follow Up on Pending Items]
    M --> K
    
    L -->|Yes| N[Calculate Final Settlement]
    N --> O[Review & Approve Settlement]
    O --> P[Process Payment]
    
    P --> Q[Deactivate Employee Account]
    Q --> R[Revoke System Access]
    R --> S[Archive Employee Record]
    
    S --> T((Offboarding Complete))
```

## 18.5 Resignation Request Flow

```mermaid
graph TD
    A((Employee Submits Resignation)) --> B[Enter Resignation Details]
    B --> B1[Reason for Leaving]
    B1 --> B2[Requested Last Working Day]
    B2 --> B3[Notice Period: Per Contract]
    
    B3 --> C[POST /api/v1/resignation-requests]
    C --> D[Status: Pending]
    
    D --> E[Notify Direct Manager]
    E --> F{Manager Decision}
    
    F -->|Accept| G[Manager Accepts Resignation]
    G --> H[Notify HR]
    H --> I{HR Review}
    
    I -->|Accept| J[Status: Accepted]
    J --> K[Confirm Last Working Day]
    K --> L[Calculate Notice Period]
    L --> M{Notice Period Served?}
    
    M -->|Full Notice| N[Standard Exit]
    M -->|Partial Notice| O[Calculate Notice Period Deduction]
    M -->|Immediate| P[Deduct Full Notice Period from Settlement]
    
    F -->|Request Retention| Q[Counter-Offer Discussion]
    Q --> R{Employee Decision}
    R -->|Withdraw| S[Status: Withdrawn]
    R -->|Proceed| G
    
    I -->|Request Review| T[Additional Discussion]
    T --> F
    
    N --> U((Begin Clearance))
    O --> U
    P --> U
    S --> V((Resignation Withdrawn))
```

## 18.6 Termination Flow

```mermaid
graph TD
    A((HR Initiates Termination)) --> B[Enter Termination Details]
    B --> B1[Termination Type]
    B1 --> C{Type?}
    
    C -->|End of Contract| D[Contract Term Completed]
    C -->|Performance| E[Consistent Underperformance + Failed PIP]
    C -->|Misconduct| F[Policy Violation/Gross Misconduct]
    C -->|Redundancy| G[Position Elimination/Restructuring]
    C -->|Mutual Agreement| H[Agreed Separation Terms]
    
    D --> I[Set Termination Date]
    E --> I
    F --> I
    G --> I
    H --> I
    
    I --> J[Document Reasons]
    J --> K[Attach Supporting Evidence]
    K --> L[POST /api/v1/terminations]
    
    L --> M[Legal Review if Needed]
    M --> N[VP/CEO Approval]
    
    N --> O{Approved?}
    O -->|Yes| P[Notify Employee]
    P --> Q[Set Last Working Day]
    Q --> R((Begin Clearance))
    
    O -->|No| S[Termination Denied]
    S --> T[Consider Alternatives: PIP/Transfer]
    T --> U((Alternative Action))
```

## 18.7 Exit Interview Flow

```mermaid
graph TD
    A((Schedule Exit Interview)) --> B[Assign Interviewer - Usually HR]
    B --> C[Set Interview Date]
    C --> D[Notify Employee]
    
    D --> E[Conduct Interview]
    E --> F[Structured Questions]
    
    F --> G[Reason for Leaving: Scale 1-5]
    G --> G1[Management Satisfaction]
    G --> G2[Work-Life Balance]
    G --> G3[Career Growth Opportunities]
    G --> G4[Compensation Satisfaction]
    G --> G5[Work Environment]
    G --> G6[Team Dynamics]
    
    G1 --> H[Open-Ended Feedback]
    G2 --> H
    G3 --> H
    G4 --> H
    G5 --> H
    G6 --> H
    
    H --> I[What Could We Improve?]
    I --> J[Would You Recommend This Company?]
    J --> K[Would You Consider Returning?]
    
    K --> L[POST /api/v1/exit-interviews]
    L --> M[Save Interview Record]
    M --> N[HR Reviews Feedback]
    N --> O[Aggregate for Trend Analysis]
    
    O --> P((Exit Interview Complete))
```

## 18.8 Clearance Checklist Flow

```mermaid
graph TD
    A((Clearance Initiated)) --> B[Generate Checklist from Template]
    
    B --> C[IT Department Items]
    C --> C1[Return Laptop/Computer]
    C --> C2[Revoke Email Access]
    C --> C3[Revoke VPN Access]
    C --> C4[Revoke System Credentials]
    C --> C5[Return USB/External Devices]
    
    B --> D[HR Department Items]
    D --> D1[Collect Employee ID Badge]
    D --> D2[Confirm Leave Balance]
    D --> D3[Verify Final Documents]
    D --> D4[Exit Interview Completed]
    
    B --> E[Finance Department Items]
    E --> E1[Clear Expense Advances]
    E --> E2[Return Corporate Credit Card]
    E --> E3[Settle Outstanding Loans]
    E --> E4[Verify No Pending Claims]
    
    B --> F[Admin/Facilities Items]
    F --> F1[Return Office Keys/Access Cards]
    F --> F2[Return Company Vehicle if Any]
    F --> F3[Clear Personal Belongings]
    F --> F4[Return Parking Pass]
    
    B --> G[Department-Specific Items]
    G --> G1[Knowledge Transfer Complete]
    G --> G2[Handover Documentation]
    G --> G3[Pending Tasks Reassigned]
    
    C1 --> H{Each Item}
    D1 --> H
    E1 --> H
    F1 --> H
    G1 --> H
    
    H --> I[Responsible Person Marks as Complete]
    I --> J[Adds Notes if Needed]
    J --> K{All Items Cleared?}
    
    K -->|No| L[Outstanding Items Flagged]
    L --> M[Follow Up Required]
    M --> H
    
    K -->|Yes| N[Clearance Status: Complete]
    N --> O[Proceed to Final Settlement]
    
    O --> P((Clearance Complete))
```

## 18.9 Final Settlement Calculation Flow

```mermaid
graph TD
    A((Calculate Final Settlement)) --> B[Get Employee Details]
    
    B --> C[Pending Salary]
    C --> C1[Unpaid Salary: Days Worked in Last Month]
    C1 --> C2[Proportional = Monthly Salary / 30 * Days]
    
    B --> D[Leave Encashment]
    D --> D1[Get Unused Annual Leave Days]
    D1 --> D2[Value = Days * Daily Salary]
    
    B --> E[End-of-Service Benefit]
    E --> E1[Calculate per Saudi Labor Law]
    E1 --> E2[Apply Resignation/Termination Factor]
    
    B --> F[Overtime Unpaid]
    F --> F1[Any Pending Overtime Payments]
    
    B --> G[Allowances Due]
    G --> G1[Prorated Allowances]
    
    C2 --> H[TOTAL EARNINGS]
    D2 --> H
    E2 --> H
    F1 --> H
    G1 --> H
    
    B --> I[Deductions]
    I --> I1[Outstanding Loan Balance]
    I --> I2[Salary Advance Balance]
    I --> I3[Notice Period Shortfall]
    I --> I4[Company Property Not Returned]
    I --> I5[Any Penalties/Fines]
    
    I1 --> J[TOTAL DEDUCTIONS]
    I2 --> J
    I3 --> J
    I4 --> J
    I5 --> J
    
    H --> K[NET SETTLEMENT = Earnings - Deductions]
    J --> K
    
    K --> L[POST /api/v1/final-settlements]
    L --> M[Status: Pending Approval]
    
    M --> N[HR Reviews]
    N --> O[Finance Approves]
    O --> P[Process Payment]
    P --> Q[Status: Paid]
    
    Q --> R((Settlement Complete))
```

## 18.10 Final Settlement Example

```
Final Settlement for: Ahmed Al-Rashid
Exit Date: April 6, 2026
Exit Type: Resignation (8+ years of service)

EARNINGS:
  Pending Salary (6 days):      SAR  1,600.00
  Annual Leave Encashment (13d): SAR  3,467.00
  End-of-Service Benefit:       SAR 30,347.00
  Unpaid Overtime:               SAR    375.00
  Pro-rated Transport Allowance: SAR    100.00
  ------------------------------------------------
  TOTAL EARNINGS:                SAR 35,889.00

DEDUCTIONS:
  Outstanding Loan Balance:      SAR  2,000.00
  Salary Advance Balance:        SAR    600.00
  ------------------------------------------------
  TOTAL DEDUCTIONS:              SAR  2,600.00

  ================================================
  NET SETTLEMENT:                SAR 33,289.00
  ================================================
```
