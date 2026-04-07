# 23 - Loan Management

## 23.1 Overview

The loan management module handles employee loan applications, policy configuration, loan approval workflows, disbursement, and automated repayment tracking through payroll deductions.

## 23.2 Features

| Feature | Description |
|---------|-------------|
| Loan Types | Personal, Emergency, Housing, Education, Vehicle |
| Loan Policies | Interest rates, max amounts, eligibility rules |
| Loan Applications | Apply for loans with documentation |
| Approval Workflow | Multi-step approval (HR, Finance, VP) |
| Repayment Schedule | Automatic monthly payroll deductions |
| Repayment Tracking | Track payments and outstanding balance |
| Salary Advances | Short-term salary advance requests |

## 23.3 Entities

| Entity | Key Fields |
|--------|------------|
| LoanType | Name, Description, MaxAmount, MaxRepaymentMonths |
| LoanPolicy | LoanTypeId, InterestRate, EligibilityMinService, MaxOutstandingLoans |
| LoanApplication | EmployeeId, LoanTypeId, RequestedAmount, RepaymentMonths, Purpose, Status |
| LoanRepayment | ApplicationId, Amount, DueDate, PaidDate, Status |
| SalaryAdvance | EmployeeId, Amount, RepaymentMonths, Reason, Status |

## 23.4 Loan Application Flow

```mermaid
graph TD
    A((Employee Applies for Loan)) --> B[Select Loan Type]
    B --> C[Enter Requested Amount]
    C --> D[Select Repayment Period: Months]
    D --> E[Enter Purpose/Reason]
    E --> F[Upload Supporting Documents]
    
    F --> G{Eligibility Check}
    G --> H{Minimum Service Met?}
    H -->|No| I[Error: Min 1 Year Service Required]
    
    H -->|Yes| J{Outstanding Loans?}
    J -->|Exceeds Max| K[Error: Existing Loan Must Be Cleared]
    
    J -->|Within Limit| L{Amount Within Policy Limit?}
    L -->|No| M[Error: Exceeds Maximum Amount]
    
    L -->|Yes| N[Calculate Monthly Repayment]
    N --> O[Monthly = Amount / RepaymentMonths]
    
    O --> P{Monthly Deduction < 30% of Salary?}
    P -->|No| Q[Error: Deduction Too High]
    
    P -->|Yes| R[POST /api/v1/loan-applications]
    R --> S[Status: Pending]
    
    S --> T[HR Reviews Application]
    T --> U[Finance Reviews Budget]
    U --> V[VP Approves if Amount > Threshold]
    
    V --> W{Approved?}
    W -->|Yes| X[Generate Repayment Schedule]
    X --> Y[Disburse Loan Amount]
    Y --> Z[Status: Active]
    Z --> AA[Monthly Deductions Begin]
    
    W -->|No| AB[Status: Rejected]
    AB --> AC[Notify Employee]
    
    AA --> AD((Loan Active))
    AC --> AE((Application Closed))
```

## 23.5 Loan Repayment Flow

```mermaid
graph TD
    A((Monthly Payroll Processing)) --> B[Find Active Loans]
    B --> C[For Each Active Loan]
    
    C --> D[Get Current Month's Repayment]
    D --> E[Deduct from Employee Salary]
    E --> F[Create LoanRepayment Record]
    F --> G[Status: Paid]
    
    G --> H[Update Outstanding Balance]
    H --> I{All Repayments Complete?}
    
    I -->|No| J[Continue Next Month]
    
    I -->|Yes| K[Loan Status: FullyRepaid]
    K --> L[Notify Employee: Loan Cleared]
    
    J --> M((Repayment Recorded))
    L --> M
    
    subgraph "Reminder Job"
        N[LoanRepaymentReminderJob]
        N --> O[Notify Employees of Upcoming Deduction]
    end
```

## 23.6 Loan Repayment Example

```
Loan Details:
  Type: Personal Loan
  Amount: SAR 12,000
  Repayment Period: 6 months
  Monthly Deduction: SAR 2,000

Repayment Schedule:
  Month 1: SAR 2,000 | Balance: SAR 10,000
  Month 2: SAR 2,000 | Balance: SAR 8,000
  Month 3: SAR 2,000 | Balance: SAR 6,000
  Month 4: SAR 2,000 | Balance: SAR 4,000
  Month 5: SAR 2,000 | Balance: SAR 2,000
  Month 6: SAR 2,000 | Balance: SAR 0 (Fully Repaid)
```
