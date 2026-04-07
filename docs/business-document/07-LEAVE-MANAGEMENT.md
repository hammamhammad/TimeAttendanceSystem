# 07 - Leave Management

## 7.1 Overview

The leave management module handles all aspects of employee time-off, including vacation type configuration, leave balance tracking, accrual processing, vacation requests with approval workflows, leave encashment, compensatory off, and carryover management.

## 7.2 Features

| Feature | Description |
|---------|-------------|
| Vacation Types | Configurable leave types (Annual, Sick, Personal, Maternity, etc.) |
| Leave Policies | Paid/unpaid, max days, carryover rules, accrual settings |
| Accrual Processing | Monthly automatic accrual based on policies |
| Balance Tracking | Real-time leave balance per employee per type |
| Leave Transactions | Full audit trail of all balance changes |
| Leave Entitlements | Automatic annual entitlement assignments |
| Vacation Requests | Submit, approve, reject with workflow integration |
| Leave Encashment | Convert unused leave to cash |
| Compensatory Off | Earn days off for working on holidays/weekends |
| Carryover Rules | Configurable year-end carryover with limits |
| Calendar View | Visual leave calendar for planning |

## 7.3 Entities

| Entity | Key Fields |
|--------|------------|
| VacationType | Name, NameAr, Code, MaxDaysPerYear, IsPaid, AllowCarryover, MaxCarryoverDays, RequiresApproval, AccrualRate, AccrualFrequency |
| EmployeeVacation | EmployeeId, VacationTypeId, StartDate, EndDate, TotalDays, Status, Reason, ApprovedBy |
| LeaveBalance | EmployeeId, VacationTypeId, Year, TotalEntitlement, Used, Pending, CarriedOver, Remaining |
| LeaveTransaction | LeaveBalanceId, Type (Accrual/Usage/Adjustment/Carryover/Expiry), Amount, Description |
| LeaveEntitlement | EmployeeId, VacationTypeId, Year, EntitlementDays |
| LeaveAccrualPolicy | VacationTypeId, AccrualRate, AccrualFrequency, MaxAccrual |
| LeaveEncashment | EmployeeId, VacationTypeId, Days, AmountPerDay, TotalAmount, Status |
| CompensatoryOff | EmployeeId, WorkedDate, Reason, ExpiryDate, Status |

## 7.4 Vacation Type Configuration Flow

```mermaid
graph TD
    A((Admin Creates Vacation Type)) --> B[Enter Basic Info]
    B --> B1[Name EN/AR: Annual Leave]
    B1 --> B2[Code: ANNUAL]
    
    B2 --> C[Set Leave Policy]
    C --> C1[Max Days Per Year: 21]
    C1 --> C2[Is Paid: Yes]
    C2 --> C3[Requires Approval: Yes]
    C3 --> C4[Min Days Per Request: 1]
    C4 --> C5[Max Days Per Request: 14]
    
    C5 --> D[Set Accrual Policy]
    D --> D1[Accrual Rate: 1.75 days/month]
    D1 --> D2[Accrual Frequency: Monthly]
    D2 --> D3[Max Accrual: 21 days]
    
    D3 --> E[Set Carryover Rules]
    E --> E1[Allow Carryover: Yes]
    E1 --> E2[Max Carryover Days: 10]
    E2 --> E3[Carryover Expiry: 3 months]
    
    E3 --> F[POST /api/v1/vacation-types]
    F --> G((Vacation Type Created))
```

## 7.5 Monthly Leave Accrual Flow

```mermaid
graph TD
    A((1st of Month 1:00 AM - Job Triggers)) --> B[MonthlyLeaveAccrualJob]
    B --> C[Get All Active Employees]
    
    C --> D[For Each Employee]
    D --> E[Get Employee's Leave Entitlements]
    
    E --> F[For Each Vacation Type with Accrual Policy]
    F --> G[Calculate Accrual Amount]
    G --> G1[Accrual = AccrualRate * Frequency Factor]
    
    G1 --> H[Get Current Leave Balance]
    H --> I{Balance Exists for Year?}
    I -->|No| J[Create New LeaveBalance Record]
    I -->|Yes| K[Use Existing Balance]
    
    J --> L{Current Balance + Accrual > Max Accrual?}
    K --> L
    
    L -->|Yes| M[Cap at Max Accrual]
    L -->|No| N[Add Full Accrual Amount]
    
    M --> O[Create LeaveTransaction: Type = Accrual]
    N --> O
    
    O --> P[Update LeaveBalance.TotalEntitlement]
    P --> Q[Update LeaveBalance.Remaining]
    
    Q --> R((Accruals Processed))
```

## 7.6 Vacation Request Submission Flow

```mermaid
graph TD
    A((Employee Creates Vacation Request)) --> B[Select Vacation Type]
    B --> C[View Current Balance]
    
    C --> D[Enter Request Details]
    D --> D1[Start Date]
    D1 --> D2[End Date]
    D2 --> D3[Enter Reason]
    
    D3 --> E[System Calculates Total Days]
    E --> F[Exclude Weekends if Applicable]
    F --> G[Exclude Public Holidays]
    G --> H[Net Business Days = Total Days]
    
    H --> I{Validation Checks}
    
    I --> J{Balance Sufficient?}
    J -->|No| K[Error: Insufficient Balance]
    
    J -->|Yes| L{Overlaps Existing Leave?}
    L -->|Yes| M[Error: Date Overlap]
    
    L -->|No| N{Within Policy Limits?}
    N -->|No| O[Error: Exceeds Max Days Per Request]
    
    N -->|Yes| P[POST /api/v1/employee-vacations]
    
    P --> Q[Create EmployeeVacation: Status = Pending]
    Q --> R[Create LeaveTransaction: Type = Pending]
    R --> S[Update Balance: Pending += TotalDays]
    S --> T[Trigger Approval Workflow]
    T --> U[Send Notification to Approver]
    
    U --> V((Request Submitted))
```

## 7.7 Vacation Approval Flow

```mermaid
graph TD
    A((Manager Receives Approval Notification)) --> B[View Vacation Request Details]
    B --> C[See: Employee, Dates, Type, Balance, Reason]
    
    C --> D{Manager Decision}
    
    D -->|Approve| E[POST /api/v1/approvals/{id}/approve]
    E --> F{Last Approval Step?}
    
    F -->|No| G[Move to Next Approval Step]
    G --> H[Notify Next Approver]
    H --> I((Waiting Next Approval))
    
    F -->|Yes| J[Final Approval]
    J --> K[Update Vacation Status: Approved]
    K --> L[Convert Pending to Used in Balance]
    L --> M[Create LeaveTransaction: Type = Usage]
    M --> N[Update Attendance Records for Leave Days]
    N --> O[Notify Employee: Approved]
    
    D -->|Reject| P[Enter Rejection Reason]
    P --> Q[Update Vacation Status: Rejected]
    Q --> R[Reverse Pending Balance]
    R --> S[Create LeaveTransaction: Type = Reversal]
    S --> T[Notify Employee: Rejected with Reason]
    
    O --> U((Vacation Approved))
    T --> V((Vacation Rejected))
```

## 7.8 Vacation Cancellation Flow

```mermaid
graph TD
    A((Employee Cancels Vacation)) --> B{Current Status?}
    
    B -->|Pending| C[Direct Cancellation Allowed]
    C --> D[Update Status: Cancelled]
    D --> E[Reverse Pending Balance]
    E --> F[Create LeaveTransaction: Type = Reversal]
    
    B -->|Approved - Future Dates| G[Request Cancellation]
    G --> H[Submit Cancellation Request]
    H --> I[Trigger Approval Workflow]
    I --> J{Manager Approves Cancellation?}
    J -->|Yes| K[Update Status: Cancelled]
    K --> L[Restore Balance: Used -= TotalDays]
    L --> M[Revert Attendance Records]
    M --> N[Create LeaveTransaction: Type = Adjustment]
    J -->|No| O[Keep Vacation Active]
    
    B -->|Approved - Past Dates| P[Cannot Cancel Past Vacations]
    
    F --> Q((Cancellation Complete))
    N --> Q
    O --> R((Cancellation Denied))
    P --> R
```

## 7.9 Leave Balance Calculation

```
Leave Balance Formula:
=====================

Remaining = TotalEntitlement + CarriedOver - Used - Pending - Expired

Where:
  TotalEntitlement = Sum of all Accrual transactions for the year
  CarriedOver = Amount carried from previous year (capped by MaxCarryoverDays)
  Used = Sum of all approved and taken leave days
  Pending = Sum of all pending (not yet approved) leave days
  Expired = Carried over days that expired past the expiry deadline

Example:
  Annual Leave Balance for 2026:
  - Total Entitlement: 21 days (accrued monthly: 1.75/month)
  - Carried Over from 2025: 5 days
  - Used: 10 days
  - Pending: 3 days
  - Expired: 0 days
  
  Remaining = 21 + 5 - 10 - 3 - 0 = 13 days
```

## 7.10 Year-End Carryover Flow

```mermaid
graph TD
    A((Year End - December 31)) --> B[Process All Employees]
    
    B --> C[For Each Employee + Vacation Type]
    C --> D[Get Current Year Balance]
    D --> E[Calculate Remaining = TotalEntitlement - Used]
    
    E --> F{Carryover Allowed?}
    F -->|No| G[Remaining Days Expire]
    G --> H[Create LeaveTransaction: Type = Expiry]
    
    F -->|Yes| I{Remaining > MaxCarryoverDays?}
    I -->|Yes| J[Carryover = MaxCarryoverDays]
    J --> K[Excess = Remaining - MaxCarryoverDays]
    K --> L[Create LeaveTransaction: Type = Expiry for Excess]
    
    I -->|No| M[Carryover = Remaining]
    
    J --> N[Create Next Year Balance]
    M --> N
    
    N --> O[Set CarriedOver = Carryover Amount]
    O --> P[Set Carryover Expiry Date if Configured]
    P --> Q[Create LeaveTransaction: Type = Carryover]
    
    H --> R((Year-End Processing Complete))
    Q --> R
    L --> R
```

## 7.11 Leave Encashment Flow

```mermaid
graph TD
    A((Employee Requests Encashment)) --> B[Select Vacation Type]
    B --> C[View Current Balance]
    C --> D[Enter Number of Days to Encash]
    
    D --> E{Validation}
    E --> F{Days <= Available Balance?}
    F -->|No| G[Error: Insufficient Balance]
    
    F -->|Yes| H{Days >= Minimum Encashment?}
    H -->|No| I[Error: Below Minimum]
    
    H -->|Yes| J[Calculate Encashment Amount]
    J --> K[Amount = Days * Daily Salary Rate]
    
    K --> L[POST /api/v1/leave-encashments]
    L --> M[Status: Pending Approval]
    M --> N[Trigger Approval Workflow]
    
    N --> O{Approved?}
    O -->|Yes| P[Deduct Days from Balance]
    P --> Q[Create LeaveTransaction: Type = Encashment]
    Q --> R[Process Payment]
    R --> S[Notify Employee: Encashment Approved]
    
    O -->|No| T[Notify Employee: Encashment Rejected]
    
    S --> U((Encashment Complete))
    T --> V((Request Closed))
```

## 7.12 Compensatory Off Flow

```mermaid
graph TD
    A((Employee Works on Holiday/Weekend)) --> B[Attendance Recorded for Off Day]
    B --> C[Manager Approves Compensatory Off]
    
    C --> D[Create CompensatoryOff Record]
    D --> E[Set Worked Date]
    E --> F[Set Expiry Date if Applicable]
    F --> G[Status: Available]
    
    G --> H((Employee Has Comp Off Available))
    
    H --> I[Employee Uses Comp Off]
    I --> J[Create Vacation Request: Type = Compensatory]
    J --> K[Link to CompensatoryOff Record]
    K --> L[Approval Workflow]
    
    L --> M{Approved?}
    M -->|Yes| N[Mark CompensatoryOff: Status = Used]
    M -->|No| O[CompensatoryOff Remains Available]
    
    N --> P((Comp Off Used))
    
    subgraph "Expiry Check (Daily Job)"
        Q[CompensatoryOffExpiryJob]
        Q --> R[Find Expired Comp Offs]
        R --> S[Status: Expired]
        S --> T[Notify Employee: Comp Off Expired]
    end
```

## 7.13 Common Vacation Types

| Type | Code | Max Days | Paid | Accrual | Carryover |
|------|------|----------|------|---------|-----------|
| Annual Leave | ANNUAL | 21 | Yes | 1.75/month | Yes (10 max) |
| Sick Leave | SICK | 30 | Partial | Full on hire | No |
| Personal Leave | PERSONAL | 5 | Yes | None | No |
| Maternity Leave | MATERNITY | 70 | Yes | None | No |
| Paternity Leave | PATERNITY | 3 | Yes | None | No |
| Marriage Leave | MARRIAGE | 5 | Yes | None | No |
| Bereavement Leave | BEREAVEMENT | 5 | Yes | None | No |
| Hajj Leave | HAJJ | 15 | Yes | None (once) | No |
| Unpaid Leave | UNPAID | 30 | No | None | No |
| Compensatory Off | COMP | As earned | Yes | On work | Time-limited |
