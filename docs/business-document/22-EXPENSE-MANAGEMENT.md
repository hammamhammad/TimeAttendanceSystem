# 22 - Expense Management

## 22.1 Overview

The expense management module allows employees to submit expense claims for business-related expenditures, enforces organizational expense policies, and tracks reimbursement processing.

## 22.2 Features

| Feature | Description |
|---------|-------------|
| Expense Categories | Categorize expenses (Travel, Meals, Supplies, etc.) |
| Expense Policies | Set limits and rules per category |
| Expense Claims | Submit claims with receipts |
| Multi-Item Claims | Multiple line items per claim |
| Approval Workflow | Manager and finance approval |
| Reimbursement Tracking | Track reimbursement status and payment |

## 22.3 Entities

| Entity | Key Fields |
|--------|------------|
| ExpenseCategory | Name, Description, MaxAmount |
| ExpensePolicy | Name, CategoryId, DailyLimit, MonthlyLimit, RequiresReceipt, ApprovalRequired |
| ExpenseClaim | EmployeeId, Title, TotalAmount, Status, SubmittedDate |
| ExpenseClaimItem | ClaimId, CategoryId, Amount, Description, Date, ReceiptPath |
| ExpenseReimbursement | ClaimId, Amount, ProcessedDate, PaymentMethod |

## 22.4 Expense Claim Flow

```mermaid
graph TD
    A((Employee Incurs Business Expense)) --> B[Create Expense Claim]
    B --> C[Enter Claim Title]
    C --> D[Add Line Items]
    
    D --> E[Item 1: Category, Amount, Date, Description]
    E --> F[Upload Receipt]
    F --> G{More Items?}
    G -->|Yes| D
    
    G -->|No| H[System Validates Against Policy]
    H --> I{Policy Check}
    
    I -->|Exceeds Daily Limit| J[Warning: Over Daily Limit]
    I -->|Exceeds Monthly Limit| K[Error: Monthly Limit Reached]
    I -->|Missing Receipt| L[Error: Receipt Required for Category]
    I -->|Valid| M[Calculate Total Amount]
    
    J --> M
    
    M --> N[POST /api/v1/expense-claims]
    N --> O[Status: Submitted]
    
    O --> P[Manager Reviews]
    P --> Q{Manager Decision}
    Q -->|Approve| R[Finance Reviews]
    Q -->|Reject| S[Status: Rejected]
    Q -->|Request Changes| T[Return to Employee]
    T --> D
    
    R --> U{Finance Decision}
    U -->|Approve| V[Status: Approved]
    V --> W[Process Reimbursement]
    W --> X[Include in Next Payroll or Direct Transfer]
    X --> Y[Status: Reimbursed]
    
    U -->|Reject| Z[Status: Rejected by Finance]
    
    S --> AA[Notify Employee]
    Y --> AA
    Z --> AA
    
    AA --> AB((Claim Processed))
```

## 22.5 Expense Policy Enforcement

```
Policy Enforcement Rules:
========================
Category: Travel
  - Daily Limit: SAR 500
  - Monthly Limit: SAR 5,000
  - Receipt Required: Yes, for amounts > SAR 50
  - Approval: Manager + Finance

Category: Meals
  - Daily Limit: SAR 150
  - Monthly Limit: SAR 2,000
  - Receipt Required: No, for amounts < SAR 100
  - Approval: Manager only

Category: Office Supplies
  - Per-Item Limit: SAR 200
  - Monthly Limit: SAR 1,000
  - Receipt Required: Yes
  - Approval: Manager only
```
