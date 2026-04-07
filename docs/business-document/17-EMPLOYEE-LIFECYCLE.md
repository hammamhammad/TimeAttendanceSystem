# 17 - Employee Lifecycle Management

## 17.1 Overview

The employee lifecycle module manages all stages of an employee's journey within the organization, from contract creation through promotions, transfers, salary adjustments, and job grade management. It provides full audit trails for all employment changes.

## 17.2 Features

| Feature | Description |
|---------|-------------|
| Employment Contracts | Contract creation, activation, renewal, termination |
| Promotions | Track promotions with salary and title changes |
| Transfers | Inter-branch and inter-department transfers |
| Salary Adjustments | Annual increments, market adjustments, corrections |
| Job Grades | Grade structure with salary ranges |
| Contract Alerts | Background job for expiring contracts |
| Visa Management | Track employee visa expiry with alerts |

## 17.3 Entities

| Entity | Key Fields |
|--------|------------|
| EmployeeContract | EmployeeId, ContractType, StartDate, EndDate, Status, Document |
| EmployeePromotion | EmployeeId, OldTitle, NewTitle, OldGrade, NewGrade, OldSalary, NewSalary, EffectiveDate |
| EmployeeTransfer | EmployeeId, FromBranch, ToBranch, FromDepartment, ToDepartment, EffectiveDate, Reason |
| SalaryAdjustment | EmployeeId, AdjustmentType, OldSalary, NewSalary, Reason, EffectiveDate, Status |
| JobGrade | Name, Level, MinSalary, MaxSalary, Description |
| EmployeeVisa | EmployeeId, VisaType, VisaNumber, ExpiryDate, Status |

## 17.4 Complete Employee Lifecycle Flow

```mermaid
graph TD
    A((Recruitment)) --> B[Offer Accepted]
    B --> C[Create Employee Record]
    C --> D[Create Employment Contract]
    D --> E[Onboarding Process]
    
    E --> F((Active Employment))
    
    F --> G{Life Events}
    
    G -->|Promotion| H[Promotion Process]
    H --> I[Update Title, Grade, Salary]
    I --> F
    
    G -->|Transfer| J[Transfer Process]
    J --> K[Move Branch/Department]
    K --> F
    
    G -->|Salary Change| L[Salary Adjustment]
    L --> M[Update Compensation]
    M --> F
    
    G -->|Contract Renewal| N[Renew Contract]
    N --> O[New Contract Terms]
    O --> F
    
    G -->|Resignation| P[Offboarding]
    G -->|Termination| P
    
    P --> Q[Clearance Process]
    Q --> R[Final Settlement]
    R --> S((Employee Inactive))
```

## 17.5 Contract Management Flow

```mermaid
graph TD
    A((Create Contract)) --> B[Select Employee]
    B --> C[Enter Contract Details]
    C --> C1[Contract Type: Fixed/Permanent/Probation]
    C1 --> C2[Start Date]
    C2 --> C3[End Date if Fixed]
    C3 --> C4[Terms & Conditions]
    C4 --> C5[Upload Contract Document]
    
    C5 --> D[POST /api/v1/employee-contracts]
    D --> E[Contract Status: Draft]
    
    E --> F[Activate Contract]
    F --> G[Status: Active]
    
    G --> H((Contract Active))
    
    H --> I{Contract Approaching Expiry?}
    I -->|Yes - 30 days before| J[ContractExpiryAlertJob]
    J --> K[Notify HR: Contract Expiring]
    K --> L[Notify Manager]
    
    L --> M{Action}
    M -->|Renew| N[Create New Contract]
    N --> O[Link to Previous Contract]
    O --> P[Terminate Old Contract: Status = Expired]
    P --> Q[Activate New Contract]
    
    M -->|Terminate| R[End Employment]
    R --> S[Contract Status: Terminated]
    
    M -->|Extend| T[Update End Date]
    T --> U[Contract Status: Active]
    
    Q --> V((Contract Renewed))
    S --> W((Employment Ended))
    U --> V
```

## 17.6 Promotion Flow

```mermaid
graph TD
    A((Manager Initiates Promotion)) --> B[Select Employee]
    B --> C[Enter Promotion Details]
    C --> C1[New Job Title]
    C1 --> C2[New Job Grade]
    C2 --> C3[New Salary]
    C3 --> C4[Effective Date]
    C4 --> C5[Reason/Justification]
    
    C5 --> D[POST /api/v1/employee-promotions]
    D --> E[Promotion Status: Pending]
    
    E --> F[Approval Workflow]
    F --> G[HR Reviews]
    G --> H{Budget Approved?}
    
    H -->|No| I[Rejected - Notify Manager]
    
    H -->|Yes| J[Promotion Approved]
    J --> K[Update Employee Record]
    K --> L[Update Job Title]
    L --> M[Update Job Grade]
    M --> N[Update Salary]
    N --> O[Create Audit Trail: Before/After]
    O --> P[Notify Employee: Congratulations]
    
    P --> Q((Promotion Complete))
    I --> R((Promotion Rejected))
```

## 17.7 Transfer Flow

```mermaid
graph TD
    A((Transfer Initiated)) --> B[Select Employee]
    B --> C[Enter Transfer Details]
    C --> C1[From Branch / Department]
    C1 --> C2[To Branch / Department]
    C2 --> C3[Effective Date]
    C3 --> C4[Reason: Operational/Request/Restructuring]
    
    C4 --> D[POST /api/v1/employee-transfers]
    D --> E[Transfer Status: Pending]
    
    E --> F[Approval from Both Sides]
    F --> G[Current Manager Approves Release]
    G --> H[New Manager Approves Intake]
    H --> I[HR Final Approval]
    
    I --> J{All Approved?}
    J -->|No| K[Transfer Rejected]
    
    J -->|Yes| L[On Effective Date:]
    L --> M[Update Employee.BranchId]
    M --> N[Update Employee.DepartmentId]
    N --> O[Update Employee.ManagerId]
    O --> P[Update Shift Assignment for New Location]
    P --> Q[Update Branch Scope Access]
    Q --> R[Notify All Parties]
    
    R --> S((Transfer Complete))
    K --> T((Transfer Rejected))
```

## 17.8 Salary Adjustment Flow

```mermaid
graph TD
    A((Salary Adjustment Initiated)) --> B[Select Employee]
    B --> C[Enter Adjustment Details]
    C --> C1[Adjustment Type]
    
    C1 --> D{Type?}
    D -->|Annual Increment| E[% increase: 5%]
    D -->|Promotion| F[New salary amount]
    D -->|Market Adjustment| G[Align to market rate]
    D -->|Correction| H[Fix error in salary]
    
    E --> I[Calculate New Salary]
    F --> I
    G --> I
    H --> I
    
    I --> J[Show: Old SAR 8,000 -> New SAR 8,400]
    J --> K[Effective Date]
    K --> L[Upload Supporting Documents]
    
    L --> M[POST /api/v1/salary-adjustments]
    M --> N[Status: Pending Approval]
    
    N --> O[Manager Approves]
    O --> P[HR Approves]
    P --> Q[Finance Approves]
    
    Q --> R{All Approved?}
    R -->|Yes| S[Update EmployeeSalary]
    S --> T[Update Salary Components]
    T --> U[Effective from Next Payroll]
    U --> V[Create Audit Record]
    V --> W[Notify Employee]
    
    R -->|No| X[Adjustment Rejected]
    
    W --> Y((Salary Updated))
    X --> Z((Adjustment Rejected))
```

## 17.9 Job Grade Structure

```
Job Grade Hierarchy:
===================
Grade  | Level | Title Example          | Salary Range (SAR)
-------|-------|------------------------|--------------------
G1     | 1     | Junior Associate       | 4,000 - 6,000
G2     | 2     | Associate              | 5,500 - 8,000
G3     | 3     | Senior Associate       | 7,000 - 10,000
G4     | 4     | Specialist             | 9,000 - 13,000
G5     | 5     | Senior Specialist      | 11,000 - 16,000
G6     | 6     | Manager                | 14,000 - 20,000
G7     | 7     | Senior Manager         | 18,000 - 25,000
G8     | 8     | Director               | 22,000 - 32,000
G9     | 9     | Vice President         | 28,000 - 40,000
G10    | 10    | C-Level Executive      | 35,000 - 50,000+
```
