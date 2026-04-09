# Phase 1: HR Management System -- User Manual

**Version**: 1.0
**Last Updated**: March 29, 2026
**Applies To**: TecAxle HRMS -- Phase 1 HR Expansion

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Employee Lifecycle Management](#2-employee-lifecycle-management)
   - 2.1 [Employee Contracts](#21-employee-contracts)
   - 2.2 [Employee Transfers](#22-employee-transfers)
   - 2.3 [Employee Promotions](#23-employee-promotions)
   - 2.4 [Salary Adjustments](#24-salary-adjustments)
   - 2.5 [Job Grades](#25-job-grades)
   - 2.6 [Employee Details (Sub-Entities)](#26-employee-details-sub-entities)
   - 2.7 [Employee Profile Changes](#27-employee-profile-changes)
3. [Payroll & Compensation](#3-payroll--compensation)
   - 3.1 [Salary Structures](#31-salary-structures)
   - 3.2 [Employee Salary Assignment](#32-employee-salary-assignment)
   - 3.3 [Payroll Periods](#33-payroll-periods)
   - 3.4 [Payroll Settings](#34-payroll-settings)
4. [Offboarding](#4-offboarding)
   - 4.1 [Resignation Requests](#41-resignation-requests)
   - 4.2 [Termination Records](#42-termination-records)
   - 4.3 [Clearance Checklist](#43-clearance-checklist)
   - 4.4 [End of Service Benefits (EOS)](#44-end-of-service-benefits-eos)
   - 4.5 [Final Settlement](#45-final-settlement)
   - 4.6 [Exit Interviews](#46-exit-interviews)
5. [Self-Service Portal](#5-self-service-portal)
   - 5.1 [My Payslips](#51-my-payslips)
   - 5.2 [My Salary](#52-my-salary)
   - 5.3 [My Resignation](#53-my-resignation)
6. [API Reference](#6-api-reference)
   - 6.1 [Employee Lifecycle Endpoints](#61-employee-lifecycle-endpoints)
   - 6.2 [Payroll Endpoints](#62-payroll-endpoints)
   - 6.3 [Offboarding Endpoints](#63-offboarding-endpoints)
   - 6.4 [Self-Service Portal Endpoints](#64-self-service-portal-endpoints)
7. [Permissions Reference](#7-permissions-reference)
8. [Background Jobs](#8-background-jobs)
9. [Database Schema](#9-database-schema)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Introduction

### What Is New in Phase 1

Phase 1 of the HRMS expansion adds three major modules to the TecAxle HRMS, transforming it from a time-tracking solution into a comprehensive human-resource management platform:

| Module | Description | Key Features |
|--------|-------------|--------------|
| **Employee Lifecycle** | Manage the full employment journey | Contracts, transfers, promotions, salary adjustments, job grades, sub-entity records |
| **Payroll & Compensation** | End-to-end payroll processing | Salary structures, employee salary assignment, payroll period processing, tax/social insurance configuration |
| **Offboarding** | Structured employee exit process | Resignations, terminations, clearance checklists, EOS calculations (Saudi Labor Law), final settlements, exit interviews |

Employees also gain three new self-service features on the portal: **My Payslips**, **My Salary**, and **My Resignation**.

### How to Access

**Admin Portal** (http://localhost:4200 in development, https://www.clockn.net in production):

The sidebar now contains three new top-level menu groups:

| Sidebar Group | Icon | Sub-Items |
|---------------|------|-----------|
| **HR Management** | `fa-user-tie` | Contracts, Transfers, Promotions, Salary Adjustments, Job Grades |
| **Payroll** | `fa-money-check-alt` | Salary Structures, Payroll Periods, Payroll Settings |
| **Offboarding** | `fa-door-open` | Resignations, Terminations |

**Self-Service Portal** (http://localhost:4201 in development, https://portal.clockn.net in production):

Employees see three new sidebar items: **My Payslips**, **My Salary**, and **My Resignation**.

---

## 2. Employee Lifecycle Management

### 2.1 Employee Contracts

**Navigation**: Admin Portal > HR Management > Contracts (`/employee-contracts`)

**Purpose**: Create, manage, and track employment contracts throughout their entire lifecycle -- from initial drafting through activation, renewal, and eventual termination or expiry.

#### Contract Types

| Type | Value | Description |
|------|-------|-------------|
| Permanent | 1 | Indefinite employment contract |
| Fixed Term | 2 | Contract with defined start and end dates |
| Probation | 3 | Probationary / trial period contract |
| Internship | 4 | Internship or training contract |
| Consultancy | 5 | Consulting or advisory contract |

#### Contract Status Workflow

```
Draft ──> Active ──> Renewed
                ──> Terminated
                ──> Expired
                ──> Suspended
```

| Status | Value | Description |
|--------|-------|-------------|
| Draft | 1 | Contract created but not yet in effect |
| Active | 2 | Currently active contract |
| Expired | 3 | End date has passed |
| Terminated | 4 | Manually terminated before end date |
| Renewed | 5 | Superseded by a renewal contract |
| Suspended | 6 | Temporarily suspended |

#### Probation Status Tracking

Each contract optionally tracks a probation period:

| Status | Value | Description |
|--------|-------|-------------|
| Not Applicable | 1 | Contract does not include probation |
| In Progress | 2 | Employee is currently in probation |
| Passed | 3 | Probation completed successfully |
| Failed | 4 | Probation not passed |

#### Step-by-Step: Creating a Contract

1. Navigate to **HR Management > Contracts** in the sidebar.
2. Click the **Create** button.
3. Fill in the required fields:
   - **Employee**: Select the employee from the dropdown.
   - **Contract Number**: Enter a unique contract identifier.
   - **Contract Type**: Select one of the five types.
   - **Start Date**: The contract start date.
   - **End Date**: (Optional for Permanent contracts) The contract end date.
   - **Basic Salary**: The salary specified in the contract.
   - **Currency**: Select from dropdown (e.g., SAR, USD, EUR, AED, EGP, etc.).
4. Optionally configure:
   - **Probation Period Days** and **Probation End Date**.
   - **Notice Period Days**: Required notice for termination.
   - **Auto Renew**: Whether the contract auto-renews.
   - **Renewal Date**: When auto-renewal should trigger.
   - **Terms** / **Terms (Arabic)**: Free-text contract terms.
   - **Document URL**: Link to the scanned contract document.
   - **Notes**: Internal notes.
5. Click **Save**. The contract is created in **Draft** status.

#### Step-by-Step: Activating a Contract

1. Open the contract from the list.
2. Verify all details are correct.
3. Click the **Activate** action button (or call `POST /api/v1/employee-contracts/{id}/activate`).
4. The contract status changes to **Active**.

> **Note**: Only Draft contracts can be activated.

#### Step-by-Step: Terminating a Contract

1. Open an Active contract.
2. Click the **Terminate** action button.
3. Optionally provide a termination **Reason**.
4. Confirm. The contract status changes to **Terminated**.

#### Step-by-Step: Renewing a Contract

1. Open an Active contract.
2. Click the **Renew** action button.
3. Provide the renewal details:
   - **New Contract Number**
   - **Start Date** and **End Date** for the new contract
   - (Optional) **New Basic Salary**, **Contract Type**, **Notes**
4. Confirm. The original contract status changes to **Renewed**, and a new contract is created in **Draft** status linked to the original.

#### Viewing Expiring Contracts

Navigate to **HR Management > Contracts** and use the **Expiring** filter or call:
```
GET /api/v1/employee-contracts/expiring?days=30
```
This returns all active contracts expiring within the specified number of days (default 30).

#### API Reference: Employee Contracts

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-contracts` | List all contracts with filters (employeeId, branchId, status, page, pageSize) |
| `GET` | `/api/v1/employee-contracts/{id}` | Get contract by ID |
| `GET` | `/api/v1/employee-contracts/employees/{employeeId}/contracts` | Get all contracts for a specific employee |
| `GET` | `/api/v1/employee-contracts/expiring` | Get contracts expiring within N days (query: days, branchId) |
| `POST` | `/api/v1/employee-contracts` | Create a new contract (Draft status) |
| `PUT` | `/api/v1/employee-contracts/{id}` | Update a Draft contract |
| `POST` | `/api/v1/employee-contracts/{id}/activate` | Activate a Draft contract |
| `POST` | `/api/v1/employee-contracts/{id}/terminate` | Terminate an Active contract (body: reason) |
| `POST` | `/api/v1/employee-contracts/{id}/renew` | Renew a contract (creates new linked contract) |
| `DELETE` | `/api/v1/employee-contracts/{id}` | Soft-delete a Draft contract |

---

### 2.2 Employee Transfers

**Navigation**: Admin Portal > HR Management > Transfers (`/employee-transfers`)

**Purpose**: Manage employee transfers between branches, departments, or positions with a structured approval workflow.

#### Transfer Status Workflow

```
Pending ──> Approved ──> In Progress ──> Completed
        ──> Rejected
        ──> Cancelled
```

| Status | Value | Description |
|--------|-------|-------------|
| Pending | 1 | Transfer request submitted, awaiting approval |
| Approved | 2 | Transfer approved by management |
| Rejected | 3 | Transfer request denied |
| In Progress | 4 | Transfer is being executed (employee transitioning) |
| Completed | 5 | Transfer fully completed, employee now in new assignment |
| Cancelled | 6 | Transfer cancelled before completion |

#### Step-by-Step: Creating a Transfer

1. Navigate to **HR Management > Transfers**.
2. Click **Create**.
3. Fill in the required fields:
   - **Employee**: Select the employee.
   - **From Branch / Department**: Auto-populated from current assignment.
   - **To Branch / Department**: Select destination.
   - **Effective Date**: When the transfer should take effect.
   - **Reason**: Why the transfer is needed.
4. Click **Save**. The transfer is created in **Pending** status.

#### Step-by-Step: Approving a Transfer

1. Open a Pending transfer.
2. Click **Approve**. Optionally add approval **Comments**.
3. The transfer status changes to **Approved**.

#### Step-by-Step: Completing a Transfer

1. Open an Approved transfer.
2. Click **Complete** to finalize the transfer.
3. The system updates the employee's branch, department, and/or position assignments.
4. Status changes to **Completed**.

#### Step-by-Step: Rejecting a Transfer

1. Open a Pending transfer.
2. Click **Reject**.
3. Provide a **Rejection Reason** (required).
4. Status changes to **Rejected**.

#### API Reference: Employee Transfers

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-transfers` | List transfers with filters (employeeId, branchId, status, page, pageSize) |
| `GET` | `/api/v1/employee-transfers/{id}` | Get transfer by ID |
| `POST` | `/api/v1/employee-transfers` | Create a new transfer (Pending status) |
| `POST` | `/api/v1/employee-transfers/{id}/approve` | Approve a transfer (body: comments) |
| `POST` | `/api/v1/employee-transfers/{id}/reject` | Reject a transfer (body: rejectionReason -- required) |
| `POST` | `/api/v1/employee-transfers/{id}/complete` | Complete an approved transfer |
| `POST` | `/api/v1/employee-transfers/{id}/cancel` | Cancel a transfer |
| `DELETE` | `/api/v1/employee-transfers/{id}` | Soft-delete a transfer |

---

### 2.3 Employee Promotions

**Navigation**: Admin Portal > HR Management > Promotions (`/employee-promotions`)

**Purpose**: Track and manage employee promotions including title changes, grade changes, and salary increases.

#### Promotion Status Workflow

```
Pending ──> Approved ──> Effective
        ──> Rejected
        ──> Cancelled
```

| Status | Value | Description |
|--------|-------|-------------|
| Pending | 1 | Promotion proposed, awaiting approval |
| Approved | 2 | Promotion approved |
| Rejected | 3 | Promotion rejected |
| Effective | 4 | Promotion applied and in effect |
| Cancelled | 5 | Promotion cancelled |

#### Step-by-Step: Creating a Promotion

1. Navigate to **HR Management > Promotions**.
2. Click **Create**.
3. Fill in:
   - **Employee**: Select the employee.
   - **Previous Job Title / New Job Title**: Document the title change.
   - **Previous Grade / New Grade**: Select from Job Grades if applicable.
   - **Previous Department / New Department**: If department change is involved.
   - **Effective Date**: When the promotion takes effect.
   - **Salary Increase Amount or Percentage**: If a pay raise is included.
   - **Reason**: Justification for the promotion.
4. Click **Save**. The promotion is created in **Pending** status.

#### Step-by-Step: Approving a Promotion

1. Open a Pending promotion.
2. Click **Approve**. Optionally add **Comments**.
3. Status changes to **Approved**.

#### API Reference: Employee Promotions

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-promotions` | List promotions with filters (employeeId, branchId, status, page, pageSize) |
| `GET` | `/api/v1/employee-promotions/{id}` | Get promotion by ID |
| `POST` | `/api/v1/employee-promotions` | Create a new promotion (Pending status) |
| `POST` | `/api/v1/employee-promotions/{id}/approve` | Approve a promotion (body: comments) |
| `POST` | `/api/v1/employee-promotions/{id}/reject` | Reject a promotion (body: rejectionReason -- required) |
| `POST` | `/api/v1/employee-promotions/{id}/cancel` | Cancel a pending promotion |
| `DELETE` | `/api/v1/employee-promotions/{id}` | Soft-delete a pending promotion |

---

### 2.4 Salary Adjustments

**Navigation**: Admin Portal > HR Management > Salary Adjustments (`/salary-adjustments`)

**Purpose**: Create, submit, and approve salary adjustments for employees. Supports a variety of adjustment types and follows a draft-to-applied workflow.

#### Adjustment Types

| Type | Value | Description |
|------|-------|-------------|
| Annual Increment | 1 | Yearly salary increase |
| Promotion Increase | 2 | Salary increase tied to a promotion |
| Market Adjustment | 3 | Adjustment to match market rates |
| Performance Bonus | 4 | Merit-based bonus or increase |
| Cost of Living Adjustment | 5 | COLA adjustment |
| Contract Renewal | 6 | Adjustment at contract renewal |
| Transfer Adjustment | 7 | Adjustment due to transfer |
| Correction | 8 | Fix an incorrect salary |
| Demotion | 9 | Salary decrease due to demotion |
| Allowance Change | 10 | Change to allowances only |
| Other | 20 | Other adjustment types |

#### Adjustment Status Workflow

```
Draft ──> Pending ──> Approved ──> Applied
                  ──> Rejected
      ──> Cancelled
```

| Status | Value | Description |
|--------|-------|-------------|
| Draft | 1 | Adjustment created, not yet submitted |
| Pending | 2 | Submitted for approval |
| Approved | 3 | Approved, ready to apply |
| Rejected | 4 | Rejected by approver |
| Applied | 5 | Applied to employee's salary record |
| Cancelled | 6 | Cancelled before approval |

#### Step-by-Step: Creating and Processing a Salary Adjustment

1. Navigate to **HR Management > Salary Adjustments**.
2. Click **Create**.
3. Fill in:
   - **Employee**: Select the employee.
   - **Adjustment Type**: Select from the list above.
   - **Current Salary** and **New Salary**: Or specify an **Adjustment Amount** / **Adjustment Percentage**.
   - **Effective Date**: When the adjustment takes effect.
   - **Reason**: Justification for the adjustment.
4. Click **Save**. Created in **Draft** status.
5. Click **Submit** to change status to **Pending** (awaiting approval).
6. An authorized manager clicks **Approve** to approve (or **Reject** with a reason).
7. Once approved, the system marks the adjustment as **Applied** and updates the employee's salary.

#### API Reference: Salary Adjustments

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/salary-adjustments` | List adjustments with filters (employeeId, status, adjustmentType, branchId, page, pageSize) |
| `GET` | `/api/v1/salary-adjustments/{id}` | Get adjustment by ID |
| `GET` | `/api/v1/salary-adjustments/employees/{employeeId}/salary-adjustments` | Get all adjustments for a specific employee |
| `POST` | `/api/v1/salary-adjustments` | Create a new adjustment (Draft status) |
| `POST` | `/api/v1/salary-adjustments/{id}/submit` | Submit for approval (Draft -> Pending) |
| `POST` | `/api/v1/salary-adjustments/{id}/approve` | Approve a pending adjustment |
| `POST` | `/api/v1/salary-adjustments/{id}/reject` | Reject an adjustment (body: rejectionReason -- required) |
| `POST` | `/api/v1/salary-adjustments/{id}/cancel` | Cancel a draft or pending adjustment |
| `DELETE` | `/api/v1/salary-adjustments/{id}` | Soft-delete a draft adjustment |

---

### 2.5 Job Grades

**Navigation**: Admin Portal > HR Management > Job Grades (`/job-grades`)

**Purpose**: Define organizational job grade levels with associated salary bands. Job grades provide a standardized compensation framework across the organization.

#### Key Fields

| Field | Description |
|-------|-------------|
| Code | Unique grade code (e.g., "G1", "G2", "M1", "M2") |
| Name / Name (Arabic) | Grade display name in both languages |
| Description | Detailed description of the grade |
| Level | Numeric level for ordering (lower = more junior) |
| Min Salary | Minimum salary for this grade band |
| Mid Salary | Midpoint salary for this grade band |
| Max Salary | Maximum salary for this grade band |
| Currency | Salary currency (select from dropdown: SAR, USD, EUR, AED, etc.) |
| Is Active | Whether the grade is available for assignment |
| Display Order | Controls sort order in UI |

#### Step-by-Step: Creating a Job Grade

1. Navigate to **HR Management > Job Grades**.
2. Click **Create** (or use the inline form, depending on UI).
3. Fill in:
   - **Code**: A unique short code (e.g., "E1" for Entry Level 1).
   - **Name** / **Name (Arabic)**: Display names.
   - **Level**: Numeric level (1 = entry level, higher = more senior).
   - **Min Salary**, **Mid Salary**, **Max Salary**: Define the salary band.
   - **Is Active**: Toggle on.
4. Click **Save**.

#### Using Job Grades

Once created, job grades can be:
- Assigned to employees via the employee profile.
- Referenced during promotions to track grade changes.
- Used to validate salary assignments against the grade's salary band.

> **Note**: A job grade cannot be deleted if it is currently assigned to any employee.

#### API Reference: Job Grades

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/job-grades` | Get all job grades (ordered by level, then display order) |
| `GET` | `/api/v1/job-grades/{id}` | Get a specific job grade by ID |
| `GET` | `/api/v1/job-grades/dropdown` | Get active grades for dropdown selection (id, code, name, nameAr, level) |
| `POST` | `/api/v1/job-grades` | Create a new job grade |
| `PUT` | `/api/v1/job-grades/{id}` | Update an existing job grade |
| `DELETE` | `/api/v1/job-grades/{id}` | Soft-delete a job grade (fails if in use) |

---

### 2.6 Employee Details (Sub-Entities)

**Purpose**: Manage detailed employee information that goes beyond the core employee record. All sub-entities are accessed through the Employee Details API under a common base path.

**Base Route**: `/api/v1/employee-details`

All endpoints require authentication and enforce branch-scoped access control. System admins can access any employee; other users can only access employees in their assigned branches.

#### 2.6.1 Bank Details

Manage employee bank account information for salary payments.

| Field | Description |
|-------|-------------|
| Bank Name / Bank Name (Arabic) | Name of the bank |
| Account Holder Name | Name on the bank account |
| Account Number | Bank account number |
| IBAN | International Bank Account Number |
| Swift Code | SWIFT/BIC code |
| Branch Name | Bank branch name |
| Currency | Account currency (select from dropdown: SAR, USD, EUR, AED, etc.) |
| Is Primary | Whether this is the primary payment account |
| Is Active | Whether the account is active |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-details/{employeeId}/bank-details` | List employee's bank accounts |
| `POST` | `/api/v1/employee-details/{employeeId}/bank-details` | Add a bank account |
| `PUT` | `/api/v1/employee-details/bank-details/{id}` | Update a bank account |
| `DELETE` | `/api/v1/employee-details/bank-details/{id}` | Soft-delete a bank account |

#### 2.6.2 Dependents

Track employee family members and dependents for HR records, insurance, and benefits.

| Field | Description |
|-------|-------------|
| First Name / Last Name | Dependent's name (English) |
| First Name (Arabic) / Last Name (Arabic) | Dependent's name (Arabic) |
| Relationship | Spouse, Child, Parent, Sibling, or Other |
| Date of Birth | Dependent's date of birth |
| Gender | Male or Female |
| National ID | Dependent's national ID number |
| Phone | Contact phone number |
| Is Emergency Contact | Whether to contact in emergencies |
| Is Beneficiary | Whether a benefits beneficiary |
| Notes | Additional notes |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-details/{employeeId}/dependents` | List employee's dependents |
| `POST` | `/api/v1/employee-details/{employeeId}/dependents` | Add a dependent |
| `PUT` | `/api/v1/employee-details/dependents/{id}` | Update a dependent |
| `DELETE` | `/api/v1/employee-details/dependents/{id}` | Soft-delete a dependent |

#### 2.6.3 Emergency Contacts

Maintain emergency contact information with priority ordering.

| Field | Description |
|-------|-------------|
| Name / Name (Arabic) | Contact's name |
| Relationship | Relationship to employee (free text) |
| Phone / Alternate Phone | Contact phone numbers |
| Email | Contact email address |
| Address | Contact's address |
| Is Primary | Whether this is the primary emergency contact |
| Display Order | Sort order (primary contacts appear first) |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-details/{employeeId}/emergency-contacts` | List emergency contacts |
| `POST` | `/api/v1/employee-details/{employeeId}/emergency-contacts` | Add an emergency contact |
| `PUT` | `/api/v1/employee-details/emergency-contacts/{id}` | Update an emergency contact |
| `DELETE` | `/api/v1/employee-details/emergency-contacts/{id}` | Soft-delete an emergency contact |

#### 2.6.4 Addresses

Store employee residential and mailing addresses.

| Field | Description |
|-------|-------------|
| Address Type | Current (1), Permanent (2), or Mailing (3) |
| Address Line 1 / Line 2 | Street address |
| City / City (Arabic) | City name |
| State / State (Arabic) | State or province |
| Postal Code | Postal or ZIP code |
| Country / Country (Arabic) | Country name |
| Is Primary | Primary address flag |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-details/{employeeId}/addresses` | List addresses |
| `POST` | `/api/v1/employee-details/{employeeId}/addresses` | Add an address |
| `PUT` | `/api/v1/employee-details/addresses/{id}` | Update an address |
| `DELETE` | `/api/v1/employee-details/addresses/{id}` | Soft-delete an address |

#### 2.6.5 Education

Record employee educational background and qualifications.

| Field | Description |
|-------|-------------|
| Level | HighSchool (1), Diploma (2), Bachelors (3), Masters (4), Doctorate (5), Professional (6), Other (7) |
| Institution Name / (Arabic) | Name of the educational institution |
| Degree / (Arabic) | Degree obtained |
| Field of Study / (Arabic) | Major or specialization |
| Start Date / End Date | Duration of study |
| Grade | Academic grade (GPA, pass/fail, etc.) |
| Certificate URL | Link to uploaded certificate |
| Country | Country of study |
| Is Highest Degree | Flag for the employee's highest qualification |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-details/{employeeId}/education` | List education records |
| `POST` | `/api/v1/employee-details/{employeeId}/education` | Add an education record |
| `PUT` | `/api/v1/employee-details/education/{id}` | Update an education record |
| `DELETE` | `/api/v1/employee-details/education/{id}` | Soft-delete an education record |

#### 2.6.6 Work Experience

Track employee's previous employment history.

| Field | Description |
|-------|-------------|
| Company Name / (Arabic) | Previous employer |
| Job Title / (Arabic) | Position held |
| Start Date / End Date | Employment duration |
| Responsibilities | Job responsibilities (free text) |
| Reason for Leaving | Why the employee left |
| Country | Country of employment |
| Reference Contact Name / Phone | Professional reference |
| Certificate URL | Link to experience certificate |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-details/{employeeId}/work-experience` | List work experience |
| `POST` | `/api/v1/employee-details/{employeeId}/work-experience` | Add work experience |
| `PUT` | `/api/v1/employee-details/work-experience/{id}` | Update work experience |
| `DELETE` | `/api/v1/employee-details/work-experience/{id}` | Soft-delete work experience |

#### 2.6.7 Visas

Manage employee visa and work permit documents with expiry tracking.

| Field | Description |
|-------|-------------|
| Visa Type | WorkVisa (1), ResidencePermit (2), BusinessVisa (3), TransitVisa (4), Other (5) |
| Visa Number | Visa or permit number |
| Sponsor Name | Sponsoring entity |
| Issue Date / Expiry Date | Validity period |
| Issuing Country | Country that issued the visa |
| Status | Active (1), Expired (2), Cancelled (3), InRenewal (4), Transferred (5) |
| Document URL | Link to scanned document |
| Notes | Additional notes |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-details/{employeeId}/visas` | List employee's visas |
| `POST` | `/api/v1/employee-details/{employeeId}/visas` | Add a visa record |
| `PUT` | `/api/v1/employee-details/visas/{id}` | Update a visa record |
| `DELETE` | `/api/v1/employee-details/visas/{id}` | Soft-delete a visa record |
| `GET` | `/api/v1/employee-details/visas/expiring` | Get all visas expiring within N days (query: daysAhead, default 30) |

> **Important**: The expiring visas endpoint respects branch scoping -- non-system-admin users only see visas for employees in their assigned branches. Results include `DaysUntilExpiry` for each visa.

---

### 2.7 Employee Profile Changes

**Purpose**: Track changes to employee profile fields with effective dating, allowing scheduled future changes and historical corrections.

#### Profile Change Types

| Type | Value | Description |
|------|-------|-------------|
| Department Change | 1 | Move to a different department |
| Manager Change | 2 | New reporting manager |
| Job Title Change | 3 | Title update |
| Grade Change | 4 | Job grade level change |

Profile changes support:
- **Effective dating**: Schedule a change to take effect on a future date.
- **Scheduled changes**: The system can apply changes automatically when the effective date arrives.
- **Corrections**: Retroactive fixes to employee records.

> **Note**: The `EmployeeProfileChange` entity tracks `FieldName`, `OldValue`, `NewValue`, `EffectiveDate`, and `ChangeType` for audit trail purposes.

---

## 3. Payroll & Compensation

### 3.1 Salary Structures

**Navigation**: Admin Portal > Payroll > Salary Structures (`/payroll/salary-structures`)

**Purpose**: Define reusable salary structure templates that specify how compensation is broken down into components (basic salary, allowances, deductions, benefits). Salary structures serve as blueprints that are assigned to employees.

#### Salary Component Types

| Type | Value | Description |
|------|-------|-------------|
| Basic | 1 | Base salary component |
| Housing Allowance | 2 | Housing or accommodation allowance |
| Transport Allowance | 3 | Transportation allowance |
| Phone Allowance | 4 | Mobile phone / communication allowance |
| Food Allowance | 5 | Meals or food allowance |
| Other Allowance | 6 | Any other allowance |
| Tax Deduction | 10 | Income tax deduction |
| Social Insurance Deduction | 11 | GOSI / social insurance deduction |
| Loan Deduction | 12 | Loan repayment deduction |
| Other Deduction | 13 | Any other deduction |
| Benefit | 20 | Non-monetary benefit |

#### Calculation Types

| Type | Value | Description |
|------|-------|-------------|
| Fixed | 1 | Fixed monetary amount |
| Percentage of Basic | 2 | Calculated as a percentage of basic salary |
| Percentage of Gross | 3 | Calculated as a percentage of gross salary |

#### Component Properties

Each component in a salary structure has:

| Property | Description |
|----------|-------------|
| Name / Name (Arabic) | Component display name |
| Component Type | One of the types listed above |
| Calculation Type | Fixed, % of Basic, or % of Gross |
| Amount | Fixed amount (when calculation type is Fixed) |
| Percentage | Percentage value (when calculation type is percentage-based) |
| Is Recurring | Whether the component appears every pay period |
| Is Taxable | Whether the component is subject to tax |
| Is Social Insurable | Whether the component is subject to social insurance contributions |
| Display Order | Sort order in UI |

#### Step-by-Step: Creating a Salary Structure

1. Navigate to **Payroll > Salary Structures**.
2. Click **Create**.
3. Fill in structure details:
   - **Name** / **Name (Arabic)**: Structure name (e.g., "Standard Saudi Package").
   - **Description**: What this structure is used for.
   - **Branch**: Optionally limit to a specific branch (or leave blank for all branches).
   - **Is Active**: Toggle on.
4. Add components:
   - Click **Add Component**.
   - Set the component name, type, calculation type, and amount/percentage.
   - Configure tax and insurance applicability.
   - Repeat for each component.
5. Click **Save**.

**Example structure for a typical Saudi employee**:

| Component | Type | Calculation | Amount/% |
|-----------|------|-------------|----------|
| Basic Salary | Basic | Fixed | (per employee) |
| Housing Allowance | Housing Allowance | % of Basic | 25% |
| Transport Allowance | Transport Allowance | Fixed | SAR 500 |
| Phone Allowance | Phone Allowance | Fixed | SAR 200 |

#### API Reference: Salary Structures

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/salary-structures` | List structures with filters (branchId, isActive, search, page, pageSize) |
| `GET` | `/api/v1/salary-structures/{id}` | Get structure with components |
| `GET` | `/api/v1/salary-structures/dropdown` | Get active structures for dropdown (query: branchId) |
| `POST` | `/api/v1/salary-structures` | Create a structure with components |
| `PUT` | `/api/v1/salary-structures/{id}` | Update structure and upsert components |
| `DELETE` | `/api/v1/salary-structures/{id}` | Soft-delete (fails if assigned to employees) |
| `POST` | `/api/v1/salary-structures/{id}/toggle-status` | Toggle active/inactive status |

---

### 3.2 Employee Salary Assignment

**Purpose**: Assign a salary structure to an employee with a specific base salary and optional component overrides. When a new salary is assigned, the system automatically deactivates the previous salary record and maintains full salary history.

#### Key Concepts

- **Base Salary**: The employee's basic pay amount.
- **Salary Structure**: Links to a predefined structure that determines component breakdown.
- **Component Overrides**: Override the default calculated amount for specific components.
- **Effective Date**: When the salary takes effect.
- **Is Current**: Only one salary per employee is marked as current.
- **Total Package**: Base salary plus all component amounts.

#### Step-by-Step: Assigning a Salary

1. Select the employee.
2. Choose a **Salary Structure** from the dropdown.
3. Enter the **Base Salary** amount.
4. Set the **Effective Date**.
5. (Optional) Provide a **Reason** for the assignment (e.g., "Initial hire", "Annual review").
6. (Optional) Override individual component amounts if needed.
7. Click **Assign**.

The system will:
- End-date the current salary record (if any).
- Create a new salary record marked as current.
- Calculate component amounts based on the structure definition.
- Apply any component overrides.

#### API Reference: Employee Salaries

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/employee-salaries/employees/{employeeId}/current` | Get current active salary with components and total package |
| `GET` | `/api/v1/employee-salaries/employees/{employeeId}/history` | Get full salary history (ordered by effective date, newest first) |
| `POST` | `/api/v1/employee-salaries` | Assign a new salary (deactivates current) |

**Assign Salary Request Body**:
```json
{
  "employeeId": 1001,
  "salaryStructureId": 1,
  "baseSalary": 10000.00,
  "currency": "SAR",
  "effectiveDate": "2026-04-01",
  "reason": "Annual salary review",
  "componentOverrides": [
    { "salaryComponentId": 3, "overrideAmount": 600.00 }
  ]
}
```

---

### 3.3 Payroll Periods

**Navigation**: Admin Portal > Payroll > Payroll Periods (`/payroll/periods`)

**Purpose**: Create and process payroll periods to calculate employee pay. Each payroll period covers a date range for a specific branch and goes through a multi-step workflow.

#### Period Types

| Type | Value | Description |
|------|-------|-------------|
| Monthly | 1 | Monthly payroll cycle |
| Bi-Weekly | 2 | Bi-weekly payroll cycle |

#### Payroll Period Status Workflow

```
Draft ──> Processing ──> Processed ──> Approved ──> Paid
                                                ──> Cancelled
                     ──> Cancelled
```

| Status | Value | Description |
|--------|-------|-------------|
| Draft | 1 | Period created, not yet processed |
| Processing | 2 | System is calculating payroll records |
| Processed | 3 | Calculation complete, ready for review |
| Pending Approval | 4 | Submitted for approval |
| Approved | 5 | Approved, ready for payment |
| Paid | 6 | Salaries have been disbursed |
| Cancelled | 7 | Period cancelled |

#### Payroll Record Status

Individual employee payroll records within a period:

| Status | Value | Description |
|--------|-------|-------------|
| Pending | 1 | Not yet calculated |
| Calculated | 2 | System has calculated the record |
| Adjusted | 3 | Manual adjustments have been made |
| Finalized | 4 | Locked after payment |

#### Step-by-Step: Running Payroll

**Step 1: Create a Payroll Period**

1. Navigate to **Payroll > Payroll Periods**.
2. Click **Create**.
3. Fill in:
   - **Branch**: Select the branch.
   - **Name**: Period label (e.g., "March 2026 Payroll").
   - **Period Type**: Monthly or Bi-Weekly.
   - **Start Date / End Date**: The pay period date range.
   - **Notes**: Optional notes.
4. Click **Save**. Created in **Draft** status.

**Step 2: Process Payroll**

1. Open the Draft payroll period.
2. Click **Process**.
3. The system calculates payroll for every active employee in the branch:
   - Retrieves each employee's current salary and structure.
   - Calculates base salary, allowances, and deductions.
   - Applies tax based on tax configuration.
   - Applies social insurance based on GOSI configuration.
   - Calculates overtime pay (from attendance records).
   - Applies absence deductions and loan deductions.
   - Generates net salary for each employee.
4. Status changes to **Processed** upon completion.

**Step 3: Review Records**

1. View the list of payroll records within the period.
2. Each record shows:
   - Employee name and number
   - Base salary, total allowances, gross earnings
   - Total deductions (tax, social insurance, loans)
   - Net salary
   - Working days and paid days
3. Click into any record to see line-item details (each salary component breakdown).

**Step 4: Approve**

1. Click **Approve** on the processed payroll period.
2. The system records the approver and approval timestamp.
3. Status changes to **Approved**.

**Step 5: Mark as Paid**

1. Click **Mark Paid** on the approved payroll period.
2. All payroll records are finalized (locked from further editing).
3. Status changes to **Paid**.

#### Cancelling a Payroll Period

- Only Draft or Processed periods can be cancelled.
- Paid and already-cancelled periods cannot be cancelled.

#### API Reference: Payroll Periods

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/payroll-periods` | List periods with filters (branchId, status, page, pageSize) |
| `GET` | `/api/v1/payroll-periods/{id}` | Get period details |
| `POST` | `/api/v1/payroll-periods` | Create a new period (Draft) |
| `POST` | `/api/v1/payroll-periods/{id}/process` | Process payroll (calculate all records) |
| `POST` | `/api/v1/payroll-periods/{id}/approve` | Approve a processed period |
| `POST` | `/api/v1/payroll-periods/{id}/mark-paid` | Mark an approved period as paid |
| `POST` | `/api/v1/payroll-periods/{id}/cancel` | Cancel a draft or processed period |
| `GET` | `/api/v1/payroll-periods/{id}/records` | Get all payroll records for a period |
| `GET` | `/api/v1/payroll-periods/records/{recordId}` | Get a single payroll record with line-item details |

---

### 3.4 Payroll Settings

**Navigation**: Admin Portal > Payroll > Payroll Settings (`/payroll/settings`)

**Purpose**: Configure tax rules, social insurance rates, and insurance providers that are used during payroll processing.

#### 3.4.1 Tax Configurations

Define tax brackets with progressive rates. Tax configurations are branch-scoped and date-effective.

| Field | Description |
|-------|-------------|
| Name / Name (Arabic) | Configuration name |
| Branch | Optionally limit to a specific branch |
| Effective Date | When this configuration takes effect |
| Is Active | Whether currently in use |
| Brackets | List of progressive tax brackets |

Each **Tax Bracket** has:

| Field | Description |
|-------|-------------|
| Min Amount | Lower bound of the bracket |
| Max Amount | Upper bound of the bracket |
| Rate | Tax rate (percentage) for this bracket |
| Fixed Amount | Fixed tax amount for this bracket |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/payroll-settings/tax-configs` | List tax configurations (query: branchId) |
| `GET` | `/api/v1/payroll-settings/tax-configs/{id}` | Get tax configuration with brackets |
| `POST` | `/api/v1/payroll-settings/tax-configs` | Create tax configuration with brackets |
| `PUT` | `/api/v1/payroll-settings/tax-configs/{id}` | Update tax configuration and upsert brackets |
| `DELETE` | `/api/v1/payroll-settings/tax-configs/{id}` | Delete tax configuration |

#### 3.4.2 Social Insurance (GOSI)

Configure social insurance contribution rates per Saudi GOSI requirements.

| Field | Description |
|-------|-------------|
| Name / Name (Arabic) | Configuration name |
| Branch | Optionally limit to a specific branch |
| Employee Contribution Rate | Employee's contribution percentage (e.g., 9.75% for Saudi nationals) |
| Employer Contribution Rate | Employer's contribution percentage (e.g., 11.75% for Saudi nationals) |
| Max Insurable Salary | Maximum salary subject to social insurance (SAR 45,000 as per GOSI) |
| Effective Date | When this configuration takes effect |
| Is Active | Whether currently in use |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/payroll-settings/social-insurance` | List social insurance configurations (query: branchId) |
| `GET` | `/api/v1/payroll-settings/social-insurance/{id}` | Get social insurance configuration |
| `POST` | `/api/v1/payroll-settings/social-insurance` | Create social insurance configuration |
| `PUT` | `/api/v1/payroll-settings/social-insurance/{id}` | Update social insurance configuration |
| `DELETE` | `/api/v1/payroll-settings/social-insurance/{id}` | Delete social insurance configuration |

#### 3.4.3 Insurance Providers

Manage medical, dental, life, and other insurance providers.

| Field | Description |
|-------|-------------|
| Name / Name (Arabic) | Provider name |
| Contact Person | Point of contact at the provider |
| Phone / Email | Contact details |
| Policy Number | Organization's policy number |
| Insurance Type | Medical (1), Dental (2), Life (3), Disability (4), Travel (5), Other (6) |
| Is Active | Whether currently in use |

**Endpoints**:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/payroll-settings/insurance-providers` | List all insurance providers (includes employee count) |
| `GET` | `/api/v1/payroll-settings/insurance-providers/{id}` | Get insurance provider details |
| `POST` | `/api/v1/payroll-settings/insurance-providers` | Create an insurance provider |
| `PUT` | `/api/v1/payroll-settings/insurance-providers/{id}` | Update an insurance provider |
| `DELETE` | `/api/v1/payroll-settings/insurance-providers/{id}` | Delete (fails if provider has active employee insurances) |

---

## 4. Offboarding

### 4.1 Resignation Requests

**Navigation**: Admin Portal > Offboarding > Resignations (`/offboarding/resignations`)

**Purpose**: Process employee resignation requests through a formal approval workflow.

#### Resignation Status Workflow

```
Pending ──> Approved
        ──> Rejected
        ──> Withdrawn
```

| Status | Value | Description |
|--------|-------|-------------|
| Pending | 1 | Resignation submitted, awaiting review |
| Approved | 2 | Resignation accepted |
| Rejected | 3 | Resignation denied |
| Withdrawn | 4 | Employee withdrew the request |

#### Step-by-Step: Processing a Resignation (Admin)

1. Navigate to **Offboarding > Resignations**.
2. Review pending resignation requests.
3. Click into a request to see details:
   - Employee information
   - Resignation date
   - Last working date
   - Reason for leaving
   - Notice period compliance
4. Click **Approve** (with optional comments) or **Reject** (with required rejection reason).

#### Notice Period Calculation

The system tracks the notice period based on the employee's contract:
- **Notice Period Days** is defined in the employee's active contract.
- The system calculates whether the resignation date provides adequate notice.

#### API Reference: Resignation Requests

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/resignation-requests` | List requests with filters (employeeId, branchId, status, page, pageSize) |
| `GET` | `/api/v1/resignation-requests/{id}` | Get request by ID |
| `POST` | `/api/v1/resignation-requests` | Create a resignation request |
| `POST` | `/api/v1/resignation-requests/{id}/approve` | Approve (body: comments) |
| `POST` | `/api/v1/resignation-requests/{id}/reject` | Reject (body: rejectionReason -- required) |
| `POST` | `/api/v1/resignation-requests/{id}/withdraw` | Withdraw a pending request |

---

### 4.2 Termination Records

**Navigation**: Admin Portal > Offboarding > Terminations (`/offboarding/terminations`)

**Purpose**: Create formal termination records for employees leaving the organization, regardless of the reason. Termination records serve as the anchor for the entire offboarding process -- they link to clearance checklists, EOS calculations, final settlements, and exit interviews.

#### Termination Types

| Type | Value | Description |
|------|-------|-------------|
| Resignation | 1 | Employee-initiated departure |
| Termination | 2 | Employer-initiated termination |
| End of Contract | 3 | Contract expired and not renewed |
| Retirement | 4 | Age-based retirement |
| Redundancy | 5 | Position eliminated |
| Mutual Agreement | 6 | Mutual separation agreement |

#### Step-by-Step: Creating a Termination Record

1. Navigate to **Offboarding > Terminations**.
2. Click **Create**.
3. Fill in:
   - **Employee**: Select the departing employee.
   - **Termination Type**: Select from the types above.
   - **Termination Date**: The official last day.
   - **Last Working Date**: The actual last working day (may differ from termination date).
   - **Reason**: Detailed reason for termination.
   - **Notes**: Any additional notes.
4. Click **Save**.

> **Important**: Creating a termination record is the first step. From the termination view page, you can then:
> - Initialize a **Clearance Checklist**
> - Calculate **End of Service Benefits**
> - Calculate the **Final Settlement**
> - Record an **Exit Interview**

#### API Reference: Termination Records

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/terminations` | List records with filters (branchId, terminationType, page, pageSize) |
| `GET` | `/api/v1/terminations/{id}` | Get record by ID |
| `POST` | `/api/v1/terminations` | Create a termination record |

---

### 4.3 Clearance Checklist

**Purpose**: Track the return of company assets and completion of administrative tasks before an employee's departure.

#### Clearance Departments

| Department | Value | Default Items |
|------------|-------|---------------|
| IT | 1 | Return laptop and equipment; Revoke system access |
| Finance | 2 | Settle outstanding advances; Return company credit card |
| Admin | 3 | Return access card and keys; Return parking permit |
| HR | 4 | Complete exit interview; Sign final settlement |
| Operations | 5 | (Custom items can be added) |
| Security | 6 | (Custom items can be added) |

#### Clearance Status

| Status | Value | Description |
|--------|-------|-------------|
| Pending | 1 | Checklist created, no items completed |
| In Progress | 2 | Some items completed |
| Completed | 3 | All items completed |

#### Step-by-Step: Managing Clearance

1. From a termination record view, click **Initialize Clearance**.
2. The system creates a clearance checklist with 8 default items across IT, Finance, Admin, and HR departments.
3. Each department head marks their items as **Complete** as the employee returns assets and settles obligations.
4. When all items are marked complete, the overall status automatically changes to **Completed**.

#### Undoing a Completed Item

If an item was marked complete by mistake, click **Uncomplete** to revert it. The overall status reverts to **In Progress**.

#### API Reference: Clearance

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/clearance/{terminationId}` | Get clearance checklist with all items |
| `POST` | `/api/v1/clearance/{terminationId}/initialize` | Create default clearance checklist (8 items) |
| `POST` | `/api/v1/clearance/items/{itemId}/complete` | Mark an item as complete |
| `POST` | `/api/v1/clearance/items/{itemId}/uncomplete` | Revert item to incomplete |
| `GET` | `/api/v1/clearance/pending` | List all pending/in-progress checklists across the organization |

---

### 4.4 End of Service Benefits (EOS)

**Purpose**: Calculate end-of-service benefits based on Saudi Labor Law (Articles 84-86).

#### Saudi Labor Law Calculation Rules

The system implements the following rules exactly:

**Base calculation (employer-initiated termination or mutual agreement)**:
- **First 5 years of service**: 0.5 month salary per year
- **After 5 years of service**: 1.0 month salary per year

**Resignation deductions** (only apply when termination type is Resignation):

| Service Duration | Employee Entitlement | Deduction |
|-----------------|---------------------|-----------|
| Less than 2 years | 0% | 100% deducted |
| 2 to less than 5 years | 33.3% (one-third) | 66.7% deducted |
| 5 to less than 10 years | 66.7% (two-thirds) | 33.3% deducted |
| 10 years or more | 100% (full entitlement) | 0% deducted |

**Employer-initiated termination**: Always 100% entitlement with no deductions.

#### Calculation Basis

The EOS is calculated on the employee's **full salary** (basic salary plus all allowances from the current salary record), consistent with Saudi Labor Law.

#### Calculation Details

The system produces a detailed calculation string, for example:
```
Service: 7y 3m 15d | Basis: 15,000.00 | Total: 82,500.00 | Deduction: 27,500.00 | Net: 55,000.00
```

#### Step-by-Step: Calculating EOS

1. Open a termination record.
2. Click **Calculate EOS** (or call the API endpoint).
3. The system:
   - Retrieves the employee's hire date and the termination date.
   - Calculates total service duration (years, months, days).
   - Retrieves the current salary record (basic + allowances).
   - Applies the Saudi Labor Law formula.
   - Applies resignation deductions if applicable.
   - Stores the result.
4. The EOS benefit is displayed with full breakdown.

> **Note**: The calculation can be re-run if salary data or termination details change. Re-running updates the existing record rather than creating a duplicate.

#### API Reference: End of Service

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/end-of-service/{terminationId}` | Get EOS calculation for a termination |
| `POST` | `/api/v1/end-of-service/{terminationId}/calculate` | Calculate (or recalculate) EOS benefits |

---

### 4.5 Final Settlement

**Purpose**: Calculate the comprehensive final payment due to a departing employee, combining all outstanding amounts into a single settlement.

#### Settlement Components

| Component | Description |
|-----------|-------------|
| **Basic Salary Due** | Prorated salary for the final period |
| **Allowances Due** | Prorated allowances |
| **Leave Encashment Amount** | Payment for unused leave days |
| **Leave Encashment Days** | Number of unused leave days |
| **End of Service Amount** | EOS benefit amount (from EOS calculation) |
| **Overtime Due** | Outstanding overtime payments |
| **Loan Outstanding** (deduction) | Any outstanding loan balance |
| **Advance Outstanding** (deduction) | Any uncleared advances |
| **Other Deductions** | Other amounts owed by the employee |
| **Other Additions** | Other amounts owed to the employee |
| **Gross Settlement** | Total of all positive components |
| **Total Deductions** | Total of all deductions |
| **Net Settlement** | Final amount payable |

#### Settlement Status Workflow

```
Draft ──> Calculated ──> Pending Approval ──> Approved ──> Paid
                                                        ──> Cancelled
```

| Status | Value | Description |
|--------|-------|-------------|
| Draft | 1 | Settlement created |
| Calculated | 2 | System has computed all components |
| Pending Approval | 3 | Awaiting management approval |
| Approved | 4 | Approved for payment |
| Paid | 5 | Payment disbursed |
| Cancelled | 6 | Settlement cancelled |

#### Step-by-Step: Processing a Final Settlement

1. Open a termination record.
2. Click **Calculate Final Settlement**.
3. The system calculates all components:
   - Prorated salary and allowances for the final pay period.
   - Leave encashment based on remaining leave balance.
   - EOS amount (must have been calculated first).
   - Any overtime, loans, and advance balances.
4. Review the calculated settlement.
5. Click **Approve** to approve the settlement.
6. Click **Mark Paid** once payment has been made.

#### API Reference: Final Settlements

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/final-settlements/{terminationId}` | Get final settlement for a termination |
| `POST` | `/api/v1/final-settlements/{terminationId}/calculate` | Calculate the final settlement |
| `POST` | `/api/v1/final-settlements/{terminationId}/approve` | Approve the settlement |
| `POST` | `/api/v1/final-settlements/{terminationId}/mark-paid` | Mark as paid |

---

### 4.6 Exit Interviews

**Purpose**: Record structured exit interview feedback from departing employees to identify trends and improve retention.

#### Exit Interview Fields

| Field | Description |
|-------|-------------|
| Interview Date | Date the interview was conducted |
| Interviewer User ID | System user who conducted the interview (auto-populated) |
| Overall Satisfaction Rating | Numeric rating (e.g., 1-5 scale) |
| Reason for Leaving / (Arabic) | Primary reason the employee is leaving |
| Would Rejoin | Whether the employee would consider returning |
| Liked Most | What the employee liked most about the organization |
| Improvement Suggestions | Areas for improvement |
| Additional Comments | Any other feedback |
| Is Confidential | Whether the interview should be treated as confidential (default: true) |

#### Step-by-Step: Recording an Exit Interview

1. Open a termination record.
2. Click **Record Exit Interview** (or navigate to the exit interview section).
3. Fill in:
   - **Interview Date**: When the interview took place.
   - **Overall Satisfaction Rating**: 1-5 scale.
   - **Reason for Leaving**: Primary reason.
   - **Would Rejoin**: Yes/No.
   - **Liked Most**: Free-text positive feedback.
   - **Improvement Suggestions**: Free-text constructive feedback.
   - **Additional Comments**: Any other remarks.
   - **Is Confidential**: Check if the feedback should be restricted.
4. Click **Save**.

> **Note**: Only one exit interview can exist per termination. Subsequent submissions will be rejected. Use the PUT endpoint to update an existing interview.

#### API Reference: Exit Interviews

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/exit-interviews/{terminationId}` | Get exit interview for a termination |
| `POST` | `/api/v1/exit-interviews/{terminationId}` | Create an exit interview |
| `PUT` | `/api/v1/exit-interviews/{terminationId}` | Update an existing exit interview |

---

## 5. Self-Service Portal

Phase 1 adds three new features to the Employee Self-Service Portal, accessible at `/my-payslips`, `/my-salary`, and `/my-resignation`.

### 5.1 My Payslips

**Navigation**: Self-Service Portal > My Payslips (`/my-payslips`)

**Purpose**: Employees can view their monthly payslips and download PDF copies.

#### Features

- **Year Filter**: Select a specific year to view payslips.
- **Payslip List**: Monthly payslips showing:
  - Period (month/year)
  - Gross salary
  - Total deductions
  - Net salary
- **Download PDF**: Click the download button on any payslip to generate a PDF.

#### How to Use

1. Navigate to **My Payslips** from the sidebar.
2. Select the desired year from the year filter (defaults to current year).
3. View the list of payslips for each month.
4. Click the download icon to download a PDF copy of any payslip.

#### Self-Service API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/portal/my-payslips` | Get payslips for the logged-in employee (query: year) |
| `GET` | `/api/v1/portal/my-payslips/{payslipId}/download` | Download payslip as PDF |

---

### 5.2 My Salary

**Navigation**: Self-Service Portal > My Salary (`/my-salary`)

**Purpose**: View current salary breakdown including all components.

#### What Is Displayed

- **Basic Salary**: Base pay amount.
- **Allowances**: List of all allowance components with amounts.
- **Deductions**: List of all deduction components.
- **Gross Salary**: Total before deductions.
- **Net Salary**: Take-home pay.
- **Salary Structure Name**: The assigned salary structure.
- **Effective Date**: When the current salary became effective.
- **Salary Breakdown**: Visual breakdown of all components.

#### How to Use

1. Navigate to **My Salary** from the sidebar.
2. View the current salary information.
3. For any discrepancies, contact the HR department.

> **Note**: Employees can only view their current salary. They cannot see salary history or modify any values.

#### Self-Service API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/portal/my-salary` | Get current salary breakdown for the logged-in employee |

---

### 5.3 My Resignation

**Navigation**: Self-Service Portal > My Resignation (`/my-resignation`)

**Purpose**: Allow employees to submit and manage resignation requests directly from the portal.

#### Features

- **Submit Resignation**: Create a new resignation request.
- **Track Status**: View the current status of the request (Pending, Approved, Rejected, Withdrawn).
- **Withdraw**: Cancel a pending resignation request.

#### Step-by-Step: Submitting a Resignation

1. Navigate to **My Resignation** from the sidebar.
2. If no active resignation exists, you will see the submission form.
3. Fill in:
   - **Resignation Date**: The date you wish to resign.
   - **Last Working Date**: Your proposed last working day (should respect notice period from your contract).
   - **Reason**: Your reason for leaving.
4. Click **Submit**.
5. The request is created in **Pending** status and forwarded to management for review.

#### Step-by-Step: Withdrawing a Resignation

1. Navigate to **My Resignation**.
2. If you have a **Pending** resignation, a **Withdraw** button is available.
3. Click **Withdraw** to cancel the resignation request.
4. The status changes to **Withdrawn**.

> **Note**: You cannot withdraw a resignation that has already been Approved or Rejected.

#### Self-Service API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/portal/my-resignation` | Get current resignation (404 if none exists) |
| `POST` | `/api/v1/portal/my-resignation` | Submit a new resignation request |
| `POST` | `/api/v1/resignation-requests/{id}/withdraw` | Withdraw a pending resignation |

---

## 6. API Reference

All endpoints require authentication (Bearer JWT token in the `Authorization` header). All endpoints are under the base URL `/api/v1/`.

### 6.1 Employee Lifecycle Endpoints

#### Employee Contracts

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/employee-contracts` | List contracts (query: employeeId, branchId, status, page, pageSize) |
| `GET` | `/employee-contracts/{id}` | Get contract by ID |
| `GET` | `/employee-contracts/employees/{employeeId}/contracts` | Contracts for a specific employee |
| `GET` | `/employee-contracts/expiring` | Expiring contracts (query: days, branchId, page, pageSize) |
| `POST` | `/employee-contracts` | Create contract (Draft) |
| `PUT` | `/employee-contracts/{id}` | Update Draft contract |
| `POST` | `/employee-contracts/{id}/activate` | Activate Draft contract |
| `POST` | `/employee-contracts/{id}/terminate` | Terminate Active contract |
| `POST` | `/employee-contracts/{id}/renew` | Renew contract |
| `DELETE` | `/employee-contracts/{id}` | Soft-delete Draft contract |

#### Employee Transfers

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/employee-transfers` | List transfers (query: employeeId, branchId, status, page, pageSize) |
| `GET` | `/employee-transfers/{id}` | Get transfer by ID |
| `POST` | `/employee-transfers` | Create transfer (Pending) |
| `POST` | `/employee-transfers/{id}/approve` | Approve transfer |
| `POST` | `/employee-transfers/{id}/reject` | Reject transfer |
| `POST` | `/employee-transfers/{id}/complete` | Complete transfer |
| `POST` | `/employee-transfers/{id}/cancel` | Cancel transfer |
| `DELETE` | `/employee-transfers/{id}` | Soft-delete transfer |

#### Employee Promotions

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/employee-promotions` | List promotions (query: employeeId, branchId, status, page, pageSize) |
| `GET` | `/employee-promotions/{id}` | Get promotion by ID |
| `POST` | `/employee-promotions` | Create promotion (Pending) |
| `POST` | `/employee-promotions/{id}/approve` | Approve promotion |
| `POST` | `/employee-promotions/{id}/reject` | Reject promotion |
| `POST` | `/employee-promotions/{id}/cancel` | Cancel promotion |
| `DELETE` | `/employee-promotions/{id}` | Soft-delete pending promotion |

#### Salary Adjustments

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/salary-adjustments` | List adjustments (query: employeeId, status, adjustmentType, branchId, page, pageSize) |
| `GET` | `/salary-adjustments/{id}` | Get adjustment by ID |
| `GET` | `/salary-adjustments/employees/{employeeId}/salary-adjustments` | Adjustments for specific employee |
| `POST` | `/salary-adjustments` | Create adjustment (Draft) |
| `POST` | `/salary-adjustments/{id}/submit` | Submit for approval |
| `POST` | `/salary-adjustments/{id}/approve` | Approve adjustment |
| `POST` | `/salary-adjustments/{id}/reject` | Reject adjustment |
| `POST` | `/salary-adjustments/{id}/cancel` | Cancel adjustment |
| `DELETE` | `/salary-adjustments/{id}` | Soft-delete draft adjustment |

#### Job Grades

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/job-grades` | List all job grades |
| `GET` | `/job-grades/{id}` | Get job grade by ID |
| `GET` | `/job-grades/dropdown` | Active grades for dropdown |
| `POST` | `/job-grades` | Create job grade |
| `PUT` | `/job-grades/{id}` | Update job grade |
| `DELETE` | `/job-grades/{id}` | Soft-delete (fails if assigned to employees) |

#### Employee Details (Sub-Entities)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/employee-details/{employeeId}/bank-details` | List bank accounts |
| `POST` | `/employee-details/{employeeId}/bank-details` | Add bank account |
| `PUT` | `/employee-details/bank-details/{id}` | Update bank account |
| `DELETE` | `/employee-details/bank-details/{id}` | Delete bank account |
| `GET` | `/employee-details/{employeeId}/dependents` | List dependents |
| `POST` | `/employee-details/{employeeId}/dependents` | Add dependent |
| `PUT` | `/employee-details/dependents/{id}` | Update dependent |
| `DELETE` | `/employee-details/dependents/{id}` | Delete dependent |
| `GET` | `/employee-details/{employeeId}/emergency-contacts` | List emergency contacts |
| `POST` | `/employee-details/{employeeId}/emergency-contacts` | Add emergency contact |
| `PUT` | `/employee-details/emergency-contacts/{id}` | Update emergency contact |
| `DELETE` | `/employee-details/emergency-contacts/{id}` | Delete emergency contact |
| `GET` | `/employee-details/{employeeId}/addresses` | List addresses |
| `POST` | `/employee-details/{employeeId}/addresses` | Add address |
| `PUT` | `/employee-details/addresses/{id}` | Update address |
| `DELETE` | `/employee-details/addresses/{id}` | Delete address |
| `GET` | `/employee-details/{employeeId}/education` | List education records |
| `POST` | `/employee-details/{employeeId}/education` | Add education record |
| `PUT` | `/employee-details/education/{id}` | Update education record |
| `DELETE` | `/employee-details/education/{id}` | Delete education record |
| `GET` | `/employee-details/{employeeId}/work-experience` | List work experience |
| `POST` | `/employee-details/{employeeId}/work-experience` | Add work experience |
| `PUT` | `/employee-details/work-experience/{id}` | Update work experience |
| `DELETE` | `/employee-details/work-experience/{id}` | Delete work experience |
| `GET` | `/employee-details/{employeeId}/visas` | List visas |
| `POST` | `/employee-details/{employeeId}/visas` | Add visa |
| `PUT` | `/employee-details/visas/{id}` | Update visa |
| `DELETE` | `/employee-details/visas/{id}` | Delete visa |
| `GET` | `/employee-details/visas/expiring` | Expiring visas (query: daysAhead) |

### 6.2 Payroll Endpoints

#### Salary Structures

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/salary-structures` | List structures (query: branchId, isActive, search, page, pageSize) |
| `GET` | `/salary-structures/{id}` | Get structure with components |
| `GET` | `/salary-structures/dropdown` | Active structures for dropdown (query: branchId) |
| `POST` | `/salary-structures` | Create structure with components |
| `PUT` | `/salary-structures/{id}` | Update structure and upsert components |
| `DELETE` | `/salary-structures/{id}` | Soft-delete structure |
| `POST` | `/salary-structures/{id}/toggle-status` | Toggle active/inactive |

#### Employee Salaries

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/employee-salaries/employees/{employeeId}/current` | Current salary with components |
| `GET` | `/employee-salaries/employees/{employeeId}/history` | Full salary history |
| `POST` | `/employee-salaries` | Assign new salary |

#### Payroll Periods

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/payroll-periods` | List periods (query: branchId, status, page, pageSize) |
| `GET` | `/payroll-periods/{id}` | Get period details |
| `POST` | `/payroll-periods` | Create period (Draft) |
| `POST` | `/payroll-periods/{id}/process` | Process payroll |
| `POST` | `/payroll-periods/{id}/approve` | Approve processed period |
| `POST` | `/payroll-periods/{id}/mark-paid` | Mark as paid |
| `POST` | `/payroll-periods/{id}/cancel` | Cancel period |
| `GET` | `/payroll-periods/{id}/records` | List payroll records for period |
| `GET` | `/payroll-periods/records/{recordId}` | Get record with line-item details |

#### Payroll Settings

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/payroll-settings/tax-configs` | List tax configurations (query: branchId) |
| `GET` | `/payroll-settings/tax-configs/{id}` | Get tax configuration with brackets |
| `POST` | `/payroll-settings/tax-configs` | Create tax configuration |
| `PUT` | `/payroll-settings/tax-configs/{id}` | Update tax configuration |
| `DELETE` | `/payroll-settings/tax-configs/{id}` | Delete tax configuration |
| `GET` | `/payroll-settings/social-insurance` | List social insurance configs (query: branchId) |
| `GET` | `/payroll-settings/social-insurance/{id}` | Get social insurance config |
| `POST` | `/payroll-settings/social-insurance` | Create social insurance config |
| `PUT` | `/payroll-settings/social-insurance/{id}` | Update social insurance config |
| `DELETE` | `/payroll-settings/social-insurance/{id}` | Delete social insurance config |
| `GET` | `/payroll-settings/insurance-providers` | List insurance providers |
| `GET` | `/payroll-settings/insurance-providers/{id}` | Get insurance provider |
| `POST` | `/payroll-settings/insurance-providers` | Create insurance provider |
| `PUT` | `/payroll-settings/insurance-providers/{id}` | Update insurance provider |
| `DELETE` | `/payroll-settings/insurance-providers/{id}` | Delete insurance provider |

### 6.3 Offboarding Endpoints

#### Resignation Requests

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/resignation-requests` | List requests (query: employeeId, branchId, status, page, pageSize) |
| `GET` | `/resignation-requests/{id}` | Get request by ID |
| `POST` | `/resignation-requests` | Create resignation request |
| `POST` | `/resignation-requests/{id}/approve` | Approve request |
| `POST` | `/resignation-requests/{id}/reject` | Reject request |
| `POST` | `/resignation-requests/{id}/withdraw` | Withdraw request |

#### Termination Records

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/terminations` | List records (query: branchId, terminationType, page, pageSize) |
| `GET` | `/terminations/{id}` | Get record by ID |
| `POST` | `/terminations` | Create termination record |

#### Clearance

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/clearance/{terminationId}` | Get clearance checklist with items |
| `POST` | `/clearance/{terminationId}/initialize` | Create default checklist |
| `POST` | `/clearance/items/{itemId}/complete` | Mark item complete |
| `POST` | `/clearance/items/{itemId}/uncomplete` | Revert item |
| `GET` | `/clearance/pending` | List pending checklists |

#### End of Service

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/end-of-service/{terminationId}` | Get EOS calculation |
| `POST` | `/end-of-service/{terminationId}/calculate` | Calculate EOS |

#### Final Settlements

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/final-settlements/{terminationId}` | Get settlement |
| `POST` | `/final-settlements/{terminationId}/calculate` | Calculate settlement |
| `POST` | `/final-settlements/{terminationId}/approve` | Approve settlement |
| `POST` | `/final-settlements/{terminationId}/mark-paid` | Mark as paid |

#### Exit Interviews

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/exit-interviews/{terminationId}` | Get exit interview |
| `POST` | `/exit-interviews/{terminationId}` | Create exit interview |
| `PUT` | `/exit-interviews/{terminationId}` | Update exit interview |

### 6.4 Self-Service Portal Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/portal/my-payslips` | Get employee's payslips (query: year) |
| `GET` | `/portal/my-payslips/{payslipId}/download` | Download payslip PDF |
| `GET` | `/portal/my-salary` | Get current salary breakdown |
| `GET` | `/portal/my-resignation` | Get current resignation request |
| `POST` | `/portal/my-resignation` | Submit resignation request |
| `POST` | `/resignation-requests/{id}/withdraw` | Withdraw pending resignation |

---

## 7. Permissions Reference

Phase 1 introduces 17 new permission resources with read/manage policies. Each resource has two policies:

| # | Resource | Read Policy | Manage Policy | Description |
|---|----------|-------------|---------------|-------------|
| 1 | Contracts | `contract.read` | `contract.manage` | View/manage employee contracts |
| 2 | Transfers | `transfer.read` | `transfer.manage` | View/manage employee transfers |
| 3 | Promotions | `promotion.read` | `promotion.manage` | View/manage employee promotions |
| 4 | Salary Adjustments | `salaryAdjustment.read` | `salaryAdjustment.manage` | View/manage salary adjustments |
| 5 | Payroll | `payroll.read` | `payroll.manage` | View/manage payroll periods and processing |
| 6 | Salary Structures | `salaryStructure.read` | `salaryStructure.manage` | View/manage salary structures |
| 7 | Resignations | `resignation.read` | `resignation.manage` | View/manage resignation requests |
| 8 | Terminations | `termination.read` | `termination.manage` | View/manage termination records |
| 9 | Clearance | `clearance.read` | `clearance.manage` | View/manage clearance checklists |
| 10 | End of Service | `endOfService.read` | `endOfService.manage` | View/manage EOS calculations |
| 11 | Final Settlements | `finalSettlement.read` | `finalSettlement.manage` | View/manage final settlements |

**Notes**:
- Job Grades use the existing `settings.read` permission.
- Employee Details use the existing `employee.read` permission with branch-scoped access control.
- Exit Interviews use the termination permissions.
- Self-service endpoints use the employee's own authentication (no special permissions required -- employees can only access their own data).

### How to Assign Permissions

1. Navigate to **Users > Roles** in the Admin Portal.
2. Create or edit a role (e.g., "HR Manager").
3. In the permissions tab, check the desired read/manage permissions for the new resources.
4. Assign the role to users who need access.

---

## 8. Background Jobs

Phase 1 is designed to work with future background jobs. The following scheduled jobs are planned:

| Job | Schedule | Description |
|-----|----------|-------------|
| **ContractExpiryAlertJob** | Daily | Scans for contracts expiring within a configurable window (e.g., 30/60/90 days) and sends notifications to HR |
| **ProbationExpiryAlertJob** | Daily | Identifies employees whose probation period is ending soon and notifies managers |
| **ApplyScheduledProfileChangesJob** | Daily | Applies employee profile changes that have reached their effective date |
| **ApplyScheduledSalaryAdjustmentsJob** | Daily | Applies approved salary adjustments that have reached their effective date |
| **VisaExpiryAlertJob** | Daily | Scans for visas expiring within a configurable window and notifies HR |

> **Current Status**: These jobs are planned for implementation. In the current release, the same results can be achieved by:
> - Using the `/api/v1/employee-contracts/expiring` endpoint to monitor contracts.
> - Using the `/api/v1/employee-details/visas/expiring` endpoint to monitor visas.
> - Manually applying profile changes and salary adjustments through the UI.

---

## 9. Database Schema

Phase 1 adds the following 34 new tables to the database:

### Employee Lifecycle Tables

| Table | Description |
|-------|-------------|
| `EmployeeContracts` | Employment contract records |
| `EmployeeTransfers` | Transfer requests and records |
| `EmployeePromotions` | Promotion records |
| `SalaryAdjustments` | Salary adjustment requests |
| `JobGrades` | Job grade definitions |
| `EmployeeProfileChanges` | Effective-dated profile field changes |
| `EmployeeBankDetails` | Employee bank account information |
| `EmployeeDependents` | Employee family dependents |
| `EmergencyContacts` | Emergency contact information |
| `EmployeeAddresses` | Employee residential/mailing addresses |
| `EmployeeEducations` | Education qualifications |
| `EmployeeWorkExperiences` | Previous work history |
| `EmployeeVisas` | Visa and work permit records |

### Payroll Tables

| Table | Description |
|-------|-------------|
| `SalaryStructures` | Salary structure templates |
| `SalaryComponents` | Components within a salary structure |
| `EmployeeSalaries` | Employee salary assignments (current + historical) |
| `EmployeeSalaryComponents` | Component values for employee salaries (with overrides) |
| `PayrollPeriods` | Payroll processing periods |
| `PayrollRecords` | Individual employee payroll calculations per period |
| `PayrollRecordDetails` | Line-item details for each payroll record |
| `PayrollAdjustments` | Manual payroll adjustments |
| `TaxConfigurations` | Tax rule configurations |
| `TaxBrackets` | Progressive tax brackets |
| `SocialInsuranceConfigs` | GOSI / social insurance configurations |
| `BankTransferFiles` | Generated bank transfer files (WPS, CSV, SWIFT) |
| `InsuranceProviders` | Medical/dental/life insurance providers |
| `EmployeeInsurances` | Employee insurance enrollments |

### Offboarding Tables

| Table | Description |
|-------|-------------|
| `ResignationRequests` | Employee resignation requests |
| `TerminationRecords` | Formal termination records |
| `ClearanceChecklists` | Asset return and clearance tracking |
| `ClearanceItems` | Individual clearance checklist items |
| `EndOfServiceBenefits` | EOS benefit calculations |
| `FinalSettlements` | Final settlement calculations |
| `ExitInterviews` | Exit interview feedback records |

### Key Relationships

```
Employee (1) ──> (N) EmployeeContracts
Employee (1) ──> (N) EmployeeTransfers
Employee (1) ──> (N) EmployeePromotions
Employee (1) ──> (N) SalaryAdjustments
Employee (1) ──> (N) EmployeeSalaries ──> (N) EmployeeSalaryComponents
Employee (1) ──> (N) EmployeeBankDetails
Employee (1) ──> (N) EmployeeDependents
Employee (1) ──> (N) EmergencyContacts
Employee (1) ──> (N) EmployeeAddresses
Employee (1) ──> (N) EmployeeEducations
Employee (1) ──> (N) EmployeeWorkExperiences
Employee (1) ──> (N) EmployeeVisas
Employee (1) ──> (N) EmployeeInsurances

SalaryStructure (1) ──> (N) SalaryComponents
SalaryStructure (1) ──> (N) EmployeeSalaries

PayrollPeriod (1) ──> (N) PayrollRecords ──> (N) PayrollRecordDetails

TerminationRecord (1) ──> (1) ClearanceChecklist ──> (N) ClearanceItems
TerminationRecord (1) ──> (1) EndOfServiceBenefit
TerminationRecord (1) ──> (1) FinalSettlement
TerminationRecord (1) ──> (1) ExitInterview

TaxConfiguration (1) ──> (N) TaxBrackets
InsuranceProvider (1) ──> (N) EmployeeInsurances
```

All tables include standard audit fields: `CreatedAtUtc`, `CreatedBy`, `ModifiedAtUtc`, `ModifiedBy`, `IsDeleted` (soft delete).

---

## 10. Troubleshooting

### Common Issues and Solutions

#### Employee Contracts

| Issue | Cause | Solution |
|-------|-------|----------|
| Cannot activate a contract | Contract is not in Draft status | Only Draft contracts can be activated. Check the current status. |
| Cannot update a contract | Contract is not in Draft status | Only Draft contracts can be edited. Active contracts must be terminated and re-created if changes are needed. |
| Cannot terminate a contract | Contract is not Active | Only Active contracts can be terminated. |
| Cannot renew a contract | Original contract is not Active | Ensure the contract is in Active status before renewing. |
| Cannot delete a contract | Contract is not in Draft status | Only Draft contracts can be deleted. Terminated or expired contracts are preserved for historical records. |

#### Salary Adjustments

| Issue | Cause | Solution |
|-------|-------|----------|
| Cannot submit adjustment | Adjustment is not in Draft status | Only Draft adjustments can be submitted for approval. |
| Cannot approve adjustment | Adjustment is not in Pending status | The adjustment must be submitted first (Draft -> Pending -> Approved). |
| Adjustment not applying to salary | Adjustment may not have been applied after approval | After approval, the system marks the adjustment as Applied and updates the salary. If not, check for errors in the server logs. |

#### Payroll Processing

| Issue | Cause | Solution |
|-------|-------|----------|
| Processing produces zero records | No active employees with salary assignments in the branch | Ensure employees have current salary assignments before processing payroll. |
| Cannot approve payroll period | Period is not in Processed status | The period must be processed before it can be approved. |
| Cannot mark period as paid | Period is not in Approved status | Approve the period first. |
| Missing tax or insurance deductions | Tax/Social Insurance configurations not set up | Create tax and social insurance configurations in Payroll Settings for the branch. |
| Payroll amounts seem incorrect | Check calculation basis | Verify salary structures, employee salary assignments, and component amounts. |

#### Offboarding

| Issue | Cause | Solution |
|-------|-------|----------|
| Cannot initialize clearance | Clearance already exists for this termination | Each termination can have only one clearance checklist. Check if one already exists. |
| EOS calculation returns error | Employee has no current salary record | Ensure the employee has an active salary assignment before calculating EOS. |
| EOS shows zero net amount | Employee resigned with less than 2 years service | Per Saudi Labor Law, employees who resign with less than 2 years of service are not entitled to EOS benefits. |
| Final settlement shows missing EOS | EOS has not been calculated yet | Calculate the EOS benefit before calculating the final settlement. |
| Cannot create exit interview | Exit interview already exists | Each termination can have only one exit interview. Use the PUT endpoint to update it. |
| Cannot withdraw resignation | Resignation is not in Pending status | Only Pending resignations can be withdrawn. Approved or Rejected resignations cannot be withdrawn. |

#### Self-Service Portal

| Issue | Cause | Solution |
|-------|-------|----------|
| No payslips shown | No payroll periods processed/paid for the employee | Payslips are generated from processed payroll periods. Contact HR if you believe this is an error. |
| "No Salary Information" message | No salary assignment found | The employee does not have a current salary assignment. Contact HR. |
| Cannot submit resignation | Employee may already have a pending/approved resignation | Check if a resignation already exists. Each employee can have only one active resignation at a time. |

#### Permission Errors

| Issue | Cause | Solution |
|-------|-------|----------|
| 403 Forbidden on HR endpoints | User lacks required permissions | Assign the appropriate permission (e.g., `contract.read`, `payroll.manage`) to the user's role. |
| Employee details return 403 | Branch scope restriction | Users can only access employees in their assigned branches (unless system admin). |

#### General

| Issue | Cause | Solution |
|-------|-------|----------|
| 400 Bad Request | Validation error | Check the `error` field in the response body for details. |
| 404 Not Found | Resource does not exist or is soft-deleted | Verify the ID is correct and the resource has not been deleted. |
| Foreign key errors | Attempting to delete a resource in use | Check if the resource is referenced by other records (e.g., job grade assigned to employees, salary structure assigned to employee salaries). |

---

## Appendix: Quick Reference Card

### Sidebar Navigation Summary

| Menu Path | URL Route | Permission |
|-----------|-----------|------------|
| HR Management > Contracts | `/employee-contracts` | `contract.read` |
| HR Management > Transfers | `/employee-transfers` | `transfer.read` |
| HR Management > Promotions | `/employee-promotions` | `promotion.read` |
| HR Management > Salary Adjustments | `/salary-adjustments` | `salaryAdjustment.read` |
| HR Management > Job Grades | `/job-grades` | `settings.read` |
| Payroll > Salary Structures | `/payroll/salary-structures` | `salaryStructure.read` |
| Payroll > Payroll Periods | `/payroll/periods` | `payroll.read` |
| Payroll > Payroll Settings | `/payroll/settings` | `payroll.manage` |
| Offboarding > Resignations | `/offboarding/resignations` | `resignation.read` |
| Offboarding > Terminations | `/offboarding/terminations` | `termination.read` |

### Self-Service Portal Navigation

| Menu Item | URL Route |
|-----------|-----------|
| My Payslips | `/my-payslips` |
| My Salary | `/my-salary` |
| My Resignation | `/my-resignation` |

### Workflow Summary

| Feature | Workflow |
|---------|----------|
| Contracts | Draft -> Active -> Renewed / Terminated / Expired |
| Transfers | Pending -> Approved -> In Progress -> Completed |
| Promotions | Pending -> Approved -> Effective |
| Salary Adjustments | Draft -> Pending -> Approved -> Applied |
| Payroll Periods | Draft -> Processing -> Processed -> Approved -> Paid |
| Resignations | Pending -> Approved / Rejected / Withdrawn |
| Final Settlements | Draft -> Calculated -> Pending Approval -> Approved -> Paid |
| Clearance | Pending -> In Progress -> Completed |
