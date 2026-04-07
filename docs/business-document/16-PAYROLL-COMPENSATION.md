# 16 - Payroll & Compensation

## 16.1 Overview

The payroll and compensation module manages salary structures, payroll processing, allowances, deductions, tax calculations, social insurance, and end-of-service benefit calculations. It is designed for Saudi labor law compliance.

## 16.2 Features

| Feature | Description |
|---------|-------------|
| Salary Structures | Define salary components (Basic, HRA, Transport, etc.) |
| Payroll Periods | Monthly payroll processing with record generation |
| Allowance Management | Types, policies, assignments, and requests |
| Tax Configuration | Tax brackets and calculation rules |
| Social Insurance | GOSI/social insurance configuration |
| Bank Transfers | Generate bank transfer files |
| End-of-Service | Saudi labor law compliant EOS calculation |
| Payroll Adjustments | Ad-hoc additions and deductions |
| Salary Advances | Employee salary advance requests |

## 16.3 Entities

| Entity | Key Fields |
|--------|------------|
| SalaryStructure | Name, Components[], IsActive |
| SalaryComponent | Name, Type (Basic/Allowance/Deduction), CalculationType (Fixed/Percentage), Amount/Percentage |
| EmployeeSalary | EmployeeId, SalaryStructureId, BaseSalary, EffectiveDate |
| EmployeeSalaryComponent | EmployeeSalaryId, ComponentId, Amount |
| PayrollPeriod | Month, Year, StartDate, EndDate, Status, ProcessedBy |
| PayrollRecord | PeriodId, EmployeeId, GrossSalary, Deductions, NetSalary, Status |
| PayrollRecordDetail | RecordId, ComponentId, Amount, Type |
| PayrollAdjustment | RecordId, Type, Amount, Reason |
| AllowanceType | Name, CalculationType, IsTaxable |
| AllowancePolicy | AllowanceTypeId, EligibilityRules, Amount |
| AllowanceAssignment | PolicyId, EmployeeId, EffectiveFrom, EffectiveTo, Amount |
| AllowanceRequest | EmployeeId, AllowanceTypeId, Amount, Reason, Status |
| TaxConfiguration | Name, Brackets[], EffectiveDate |
| SocialInsuranceConfig | EmployeeRate, EmployerRate, MaxSalary |
| SalaryAdvance | EmployeeId, Amount, RepaymentMonths, Status |

## 16.4 Salary Structure Setup Flow

```mermaid
graph TD
    A((HR Defines Salary Structure)) --> B[Create Structure]
    B --> B1[Name: Standard Saudi Package]
    
    B1 --> C[Add Components]
    C --> C1[Basic Salary: 60% of Total - Fixed]
    C1 --> C2[Housing Allowance: 25% of Basic - Percentage]
    C2 --> C3[Transport Allowance: Fixed SAR 500]
    C3 --> C4[GOSI Deduction: 9.75% of Basic - Deduction]
    
    C4 --> D[POST /api/v1/salary-structures]
    D --> E[Structure Created]
    
    E --> F[Assign to Employee]
    F --> G[Set Base Salary: SAR 10,000]
    G --> H[System Calculates Components]
    
    H --> I[Basic: SAR 6,000]
    I --> J[Housing: SAR 1,500]
    J --> K[Transport: SAR 500]
    K --> L[GOSI: SAR 585 deduction]
    L --> M[Gross: SAR 8,000]
    M --> N[Net: SAR 7,415]
    
    N --> O((Salary Configured))
```

## 16.5 Monthly Payroll Processing Flow

```mermaid
graph TD
    A((HR Opens Payroll Period)) --> B[Create Payroll Period]
    B --> B1[Select Month: March 2026]
    B1 --> B2[Period: Mar 1-31, 2026]
    
    B2 --> C[POST /api/v1/payroll-periods]
    C --> D[Period Status: Draft]
    
    D --> E[Generate Payroll Records]
    E --> F[For Each Active Employee]
    
    F --> G[Get Employee Salary Structure]
    G --> H[Calculate Base Components]
    H --> I[Basic + Allowances = Gross]
    
    I --> J[Add Variable Components]
    J --> J1[Overtime Pay from Attendance]
    J1 --> J2[Active Allowance Assignments]
    J2 --> J3[Approved Allowance Requests]
    
    J3 --> K[Apply Deductions]
    K --> K1[GOSI Employee Share]
    K1 --> K2[Tax if Applicable]
    K2 --> K3[Loan Repayments]
    K3 --> K4[Salary Advance Deductions]
    K4 --> K5[Absence Deductions]
    
    K5 --> L[Apply Adjustments]
    L --> L1[Ad-hoc Bonuses]
    L1 --> L2[Penalty Deductions]
    L2 --> L3[Expense Reimbursements]
    
    L3 --> M[Net Salary = Gross - Total Deductions + Adjustments]
    M --> N[Create PayrollRecord]
    N --> O[Create PayrollRecordDetails for Each Line Item]
    
    O --> P[Period Status: Generated]
    P --> Q[HR Reviews All Records]
    
    Q --> R{All Correct?}
    R -->|No| S[Make Adjustments]
    S --> T[Recalculate Affected Records]
    T --> Q
    
    R -->|Yes| U[Finalize Payroll]
    U --> V[Period Status: Finalized]
    V --> W[Generate Bank Transfer File]
    W --> X[Lock Records - No Further Changes]
    
    X --> Y((Payroll Complete))
```

## 16.6 Payroll Calculation Breakdown

```
Monthly Payroll Calculation for Employee:
========================================

EARNINGS:
  Basic Salary:                 SAR  6,000.00
  Housing Allowance (25%):      SAR  1,500.00
  Transport Allowance:          SAR    500.00
  Overtime (12.5 hrs @ 1.5x):  SAR    562.50
  Phone Allowance:              SAR    200.00
  -------------------------------------------
  GROSS SALARY:                 SAR  8,762.50

DEDUCTIONS:
  GOSI (9.75% of Basic):       SAR    585.00
  Loan Repayment:              SAR    500.00
  Salary Advance Deduction:     SAR    300.00
  Late Deduction (3 days):      SAR    200.00
  -------------------------------------------
  TOTAL DEDUCTIONS:             SAR  1,585.00

ADJUSTMENTS:
  Performance Bonus:            SAR    500.00
  Expense Reimbursement:        SAR    150.00
  -------------------------------------------
  TOTAL ADJUSTMENTS:            SAR    650.00

  =============================================
  NET SALARY:                   SAR  7,827.50
  =============================================
```

## 16.7 Allowance Request Flow

```mermaid
graph TD
    A((Employee Requests Allowance)) --> B[Select Allowance Type]
    B --> C[Enter Amount]
    C --> D[Enter Reason/Justification]
    D --> E[Upload Supporting Documents]
    E --> F[POST /api/v1/allowance-requests]
    
    F --> G[Request Status: Pending]
    G --> H[Trigger Approval Workflow]
    
    H --> I[Manager Reviews]
    I --> J{Decision}
    
    J -->|Approve| K[HR Reviews]
    K --> L{HR Decision}
    L -->|Approve| M[Create Allowance Assignment]
    M --> N[Include in Next Payroll]
    
    L -->|Reject| O[Notify Employee: Rejected by HR]
    J -->|Reject| P[Notify Employee: Rejected by Manager]
    
    N --> Q((Allowance Active))
```

## 16.8 End-of-Service Benefit Calculation Flow

```mermaid
graph TD
    A((Employee Exits Organization)) --> B[Calculate EOS Benefit]
    B --> C[Get Employee Details]
    C --> C1[Hire Date]
    C1 --> C2[Termination Date]
    C2 --> C3[Last Basic Salary]
    C3 --> C4[Exit Reason: Resignation/Termination]
    
    C4 --> D[Calculate Service Duration]
    D --> E[Total Years of Service]
    
    E --> F{Saudi Labor Law Rules}
    
    F --> G[First 5 Years]
    G --> G1[Half month salary per year]
    G1 --> G2[EOS = BasicSalary/2 * Years up to 5]
    
    F --> H[After 5 Years]
    H --> H1[Full month salary per year]
    H1 --> H2[EOS += BasicSalary * Years after 5]
    
    G2 --> I{Exit Type}
    H2 --> I
    
    I -->|Termination by Employer| J[Full EOS Amount]
    
    I -->|Resignation < 2 years| K[No EOS]
    
    I -->|Resignation 2-5 years| L[1/3 of EOS]
    
    I -->|Resignation 5-10 years| M[2/3 of EOS]
    
    I -->|Resignation > 10 years| N[Full EOS]
    
    J --> O[Final EOS Amount]
    K --> O
    L --> O
    M --> O
    N --> O
    
    O --> P[Include in Final Settlement]
    P --> Q((EOS Calculated))
```

## 16.9 EOS Calculation Example

```
Employee: Ahmed Al-Rashid
Hire Date: January 15, 2018
Exit Date: April 6, 2026
Service Duration: 8 years, 2 months, 22 days
Last Basic Salary: SAR 8,000/month
Exit Reason: Resignation

Calculation:
  First 5 years: SAR 8,000 / 2 * 5 = SAR 20,000
  Next 3.19 years: SAR 8,000 * 3.19 = SAR 25,520
  Total EOS (Full): SAR 45,520

  Resignation factor (5-10 years): 2/3
  Final EOS: SAR 45,520 * 2/3 = SAR 30,347
```

## 16.10 Salary Advance Flow

```mermaid
graph TD
    A((Employee Requests Advance)) --> B[Enter Advance Amount]
    B --> C[Select Repayment Period: 3 months]
    C --> D[Enter Reason]
    
    D --> E{Validation}
    E --> F{Amount <= Max Allowed?}
    F -->|No| G[Error: Exceeds Limit]
    
    F -->|Yes| H{No Outstanding Advance?}
    H -->|No| I[Error: Existing Advance Pending]
    
    H -->|Yes| J[POST /api/v1/salary-advances]
    J --> K[Status: Pending]
    K --> L[Approval Workflow]
    
    L --> M{Approved?}
    M -->|Yes| N[Disbursement Processed]
    N --> O[Create Repayment Schedule]
    O --> P[Monthly Deduction = Amount / Months]
    P --> Q[Auto-Deduct from Payroll]
    
    M -->|No| R[Notify Employee: Rejected]
    
    Q --> S((Advance Disbursed))
```
