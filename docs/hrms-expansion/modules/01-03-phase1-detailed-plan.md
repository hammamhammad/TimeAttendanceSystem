# Phase 1: Core HR Operations - Detailed Implementation Plan

## Overview

Phase 1 adds the three most critical missing HR modules that form the foundation for all subsequent phases:
1. **Module 1.1: Employee Lifecycle** - Contracts, transfers, promotions, salary revisions
2. **Module 1.2: Payroll & Compensation** - Salary structures, payroll processing, payslips
3. **Module 1.3: Exit/Offboarding** - Resignation, termination, clearance, EOS, final settlement

All three modules share a single database migration: `AddEmployeeLifecyclePayrollOffboarding`

## Architecture Patterns (from codebase analysis)

**BaseEntity** (`Domain/Common/BaseEntity.cs`): `Id (long)`, `CreatedAtUtc`, `CreatedBy`, `ModifiedAtUtc`, `ModifiedBy`, `IsDeleted`, `RowVersion`

**Workflow Integration** (from EmployeeVacation/EmployeeExcuse/RemoteWorkRequest):
```csharp
public long? WorkflowInstanceId { get; set; }  // nullable
public long? SubmittedByUserId { get; set; }
public WorkflowInstance? WorkflowInstance { get; set; }
```

**Existing enums**: WorkflowEntityType (1-6), EmploymentStatus (1-8), ApprovalStatus (1-4)

---

# MODULE 1.1: EMPLOYEE LIFECYCLE ENHANCEMENTS

## 1. New Enums

**File: `src/Domain/TimeAttendanceSystem.Domain/Common/Enums.cs`** - add:

```csharp
public enum ContractType
{
    Permanent = 1,
    FixedTerm = 2,
    Probation = 3,
    Internship = 4,
    Consultancy = 5
}

public enum ContractStatus
{
    Draft = 1,
    Active = 2,
    Expired = 3,
    Terminated = 4,
    Renewed = 5,
    Suspended = 6
}

public enum ProbationStatus
{
    NotApplicable = 1,
    InProgress = 2,
    Passed = 3,
    Failed = 4,
    Extended = 5
}

public enum TransferStatus
{
    Pending = 1,
    Approved = 2,
    Rejected = 3,
    InProgress = 4,
    Completed = 5,
    Cancelled = 6
}

public enum PromotionStatus
{
    Pending = 1,
    Approved = 2,
    Rejected = 3,
    Effective = 4,
    Cancelled = 5
}

// SalaryRevisionType removed - replaced by SalaryAdjustmentType (see SalaryAdjustment entity)
```

**File: `src/Domain/TimeAttendanceSystem.Domain/Common/Enums.cs`** - extend EmploymentStatus:
```csharp
// Add to existing EmploymentStatus enum:
Suspended = 9,
OnProbation = 10,
Resigned = 11
```

**File: `src/Domain/TimeAttendanceSystem.Domain/Workflows/Enums/WorkflowEntityType.cs`** - add:
```csharp
Transfer = 7,
Promotion = 8
```

## 2. New Domain Entities

### EmployeeContract
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeContract.cs`**

```csharp
public class EmployeeContract : BaseEntity
{
    public long EmployeeId { get; set; }
    public string ContractNumber { get; set; } = string.Empty;
    public ContractType ContractType { get; set; }
    public ContractStatus Status { get; set; } = ContractStatus.Draft;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }              // null for permanent
    public DateTime? RenewalDate { get; set; }
    public bool AutoRenew { get; set; }
    public decimal BasicSalary { get; set; }
    public string? Currency { get; set; } = "SAR";
    public int? ProbationPeriodDays { get; set; }
    public DateTime? ProbationEndDate { get; set; }
    public ProbationStatus ProbationStatus { get; set; } = ProbationStatus.NotApplicable;
    public int? NoticePeriodDays { get; set; }
    public string? Terms { get; set; }                  // free text
    public string? TermsAr { get; set; }
    public string? DocumentUrl { get; set; }            // uploaded contract PDF
    public string? Notes { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? PreviousContractId { get; set; }       // for renewals

    // Navigation
    public Employee Employee { get; set; } = null!;
    public EmployeeContract? PreviousContract { get; set; }
}
```

### EmployeeTransfer
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeTransfer.cs`**

```csharp
public class EmployeeTransfer : BaseEntity
{
    public long EmployeeId { get; set; }
    public long FromBranchId { get; set; }
    public long ToBranchId { get; set; }
    public long? FromDepartmentId { get; set; }
    public long? ToDepartmentId { get; set; }
    public string? FromJobTitle { get; set; }
    public string? ToJobTitle { get; set; }
    public string? FromJobTitleAr { get; set; }
    public string? ToJobTitleAr { get; set; }
    public DateTime RequestDate { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public TransferStatus Status { get; set; } = TransferStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public Branch FromBranch { get; set; } = null!;
    public Branch ToBranch { get; set; } = null!;
    public Department? FromDepartment { get; set; }
    public Department? ToDepartment { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
```

### EmployeePromotion
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeePromotion.cs`**

```csharp
public class EmployeePromotion : BaseEntity
{
    public long EmployeeId { get; set; }
    public string OldJobTitle { get; set; } = string.Empty;
    public string NewJobTitle { get; set; } = string.Empty;
    public string? OldJobTitleAr { get; set; }
    public string? NewJobTitleAr { get; set; }
    public string? OldGrade { get; set; }
    public string? NewGrade { get; set; }
    public long? OldDepartmentId { get; set; }
    public long? NewDepartmentId { get; set; }
    public decimal? OldBaseSalary { get; set; }
    public decimal? NewBaseSalary { get; set; }
    public DateTime RequestDate { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public PromotionStatus Status { get; set; } = PromotionStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public Department? OldDepartment { get; set; }
    public Department? NewDepartment { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
```

### SalaryAdjustment (Request + Approval + History)
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/SalaryAdjustment.cs`**

This entity serves dual purpose: it's both the **request** (with workflow approval) and the **record** of the change. This is the proper way to adjust employee salary - through a controlled, auditable flow.

```csharp
public class SalaryAdjustment : BaseEntity
{
    public long EmployeeId { get; set; }
    public SalaryAdjustmentType AdjustmentType { get; set; }

    // Current salary snapshot (at time of request)
    public decimal CurrentBaseSalary { get; set; }
    public decimal CurrentTotalPackage { get; set; }    // base + all allowances

    // Proposed changes
    public decimal NewBaseSalary { get; set; }
    public decimal AdjustmentAmount { get; set; }       // difference (can be negative)
    public decimal PercentageChange { get; set; }       // calculated

    // Component-level adjustments (optional - for allowance changes)
    public string? ComponentAdjustments { get; set; }   // JSON: [{componentId, oldAmount, newAmount}]

    // Effective dating
    public DateTime EffectiveDate { get; set; }
    public bool IsApplied { get; set; }                 // false until effective date reached
    public DateTime? AppliedAt { get; set; }

    // Request metadata
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public string? Justification { get; set; }          // detailed business justification
    public string? DocumentUrl { get; set; }            // supporting document

    // Approval
    public SalaryAdjustmentStatus Status { get; set; } = SalaryAdjustmentStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }

    // Links to source (what triggered this adjustment)
    public long? RelatedPromotionId { get; set; }       // if linked to promotion
    public long? RelatedContractId { get; set; }        // if linked to contract renewal
    public long? RelatedTransferId { get; set; }        // if linked to transfer

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public EmployeePromotion? RelatedPromotion { get; set; }
    public EmployeeContract? RelatedContract { get; set; }
    public EmployeeTransfer? RelatedTransfer { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
```

**New Enums:**
```csharp
public enum SalaryAdjustmentType
{
    AnnualIncrement = 1,
    PromotionIncrease = 2,
    MarketAdjustment = 3,
    PerformanceBonus = 4,        // recurring raise based on performance
    CostOfLivingAdjustment = 5,  // COLA
    ContractRenewal = 6,
    TransferAdjustment = 7,
    Correction = 8,              // fixing a past error
    Demotion = 9,                // salary decrease
    AllowanceChange = 10,        // only allowances changed, not base
    Other = 20
}

public enum SalaryAdjustmentStatus
{
    Draft = 1,
    Pending = 2,          // submitted, awaiting approval
    Approved = 3,
    Rejected = 4,
    Applied = 5,          // approved + effective date reached + salary updated
    Cancelled = 6
}
```

**WorkflowEntityType** - add:
```csharp
SalaryAdjustment = 22
```

### How Salary Adjustments Flow

**1. Manual salary adjustment (HR initiates):**
```
HR creates SalaryAdjustment request
  → Sets AdjustmentType (e.g., AnnualIncrement)
  → Sets NewBaseSalary and/or component changes
  → Sets EffectiveDate (can be today, past, or future)
  → Workflow starts (if configured)
  → Manager/Finance approves
  → Status = Approved
  → If EffectiveDate <= today: apply immediately (update EmployeeSalary, set IsApplied = true)
  → If EffectiveDate > today: wait for ApplyScheduledSalaryAdjustmentsJob
```

**2. Salary adjustment via Promotion:**
```
Promotion approved with NewBaseSalary
  → System auto-creates SalaryAdjustment with:
    - AdjustmentType = PromotionIncrease
    - RelatedPromotionId = promotion.Id
    - Status = Approved (pre-approved via promotion workflow)
    - EffectiveDate = promotion.EffectiveDate
```

**3. Salary adjustment via Contract Renewal:**
```
Contract renewed with new BasicSalary
  → System auto-creates SalaryAdjustment with:
    - AdjustmentType = ContractRenewal
    - RelatedContractId = contract.Id
    - Status = Approved
```

**4. Salary correction (fixing past error):**
```
HR creates SalaryAdjustment with:
  - AdjustmentType = Correction
  - EffectiveDate = past date when error occurred
  - IsApplied = true (applied immediately since it's a correction)
  - Flags affected payroll periods for recalculation
```

### Background Job
**`ApplyScheduledSalaryAdjustmentsJob`** (Coravel, daily at 1:30 AM):
- Query SalaryAdjustments where `Status = Approved` AND `!IsApplied` AND `EffectiveDate <= today`
- Update EmployeeSalary with new values
- Create EmployeeProfileChange record
- Set `IsApplied = true`, `AppliedAt = now`
- Send notification to employee and HR

### API Endpoints (SalaryAdjustmentsController)
```
GET    /api/v1/salary-adjustments                         [SalaryAdjustmentRead]
GET    /api/v1/salary-adjustments/{id}                    [SalaryAdjustmentRead]
GET    /api/v1/employees/{employeeId}/salary-adjustments  [SalaryAdjustmentRead]  (history)
POST   /api/v1/salary-adjustments                         [SalaryAdjustmentManagement]
PUT    /api/v1/salary-adjustments/{id}                    [SalaryAdjustmentManagement]
POST   /api/v1/salary-adjustments/{id}/submit             [SalaryAdjustmentManagement]
POST   /api/v1/salary-adjustments/{id}/approve            [SalaryAdjustmentManagement]
POST   /api/v1/salary-adjustments/{id}/reject             [SalaryAdjustmentManagement]
POST   /api/v1/salary-adjustments/{id}/cancel             [SalaryAdjustmentManagement]
DELETE /api/v1/salary-adjustments/{id}                    [SalaryAdjustmentManagement]  (draft only)
POST   /api/v1/salary-adjustments/bulk                    [SalaryAdjustmentManagement]  (annual increment for multiple employees)
GET    /api/v1/salary-adjustments/pending                 [SalaryAdjustmentRead]
```

### Frontend Pages
- `pages/salary-adjustments/` - list (with filters: status, type, date range, branch, department), create, view
- `pages/salary-adjustments/create/` - form with: employee selector, adjustment type, current salary display, new salary input, component-level adjustments, effective date, justification, document upload
- `pages/salary-adjustments/bulk/` - bulk annual increment: select employees by branch/department, set percentage or fixed amount, preview changes, submit all
- Employee View page: "Salary History" tab showing all adjustments timeline

### PermissionResources
```csharp
public const string SalaryAdjustment = "salaryAdjustment";
```

## 2b. Employee Sub-Entities (Rich Employee Profile)

The current Employee entity only tracks basic info. A strong HRMS needs rich employee profiles with:

### EmployeeBankDetail
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeBankDetail.cs`**
```csharp
public class EmployeeBankDetail : BaseEntity
{
    public long EmployeeId { get; set; }
    public string BankName { get; set; } = string.Empty;
    public string? BankNameAr { get; set; }
    public string AccountHolderName { get; set; } = string.Empty;
    public string AccountNumber { get; set; } = string.Empty;
    public string? IBAN { get; set; }
    public string? SwiftCode { get; set; }
    public string? BranchName { get; set; }
    public string? Currency { get; set; } = "SAR";
    public bool IsPrimary { get; set; } = true;       // for payroll
    public bool IsActive { get; set; } = true;

    public Employee Employee { get; set; } = null!;
}
```

### EmployeeDependent
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeDependent.cs`**
```csharp
public class EmployeeDependent : BaseEntity
{
    public long EmployeeId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? FirstNameAr { get; set; }
    public string? LastNameAr { get; set; }
    public DependentRelationship Relationship { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Gender? Gender { get; set; }
    public string? NationalId { get; set; }
    public string? Phone { get; set; }
    public bool IsEmergencyContact { get; set; }
    public bool IsBeneficiary { get; set; }           // for insurance/EOS
    public string? Notes { get; set; }

    public Employee Employee { get; set; } = null!;
}
```

### EmergencyContact
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmergencyContact.cs`**
```csharp
public class EmergencyContact : BaseEntity
{
    public long EmployeeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string Relationship { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? AlternatePhone { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public bool IsPrimary { get; set; } = true;
    public int DisplayOrder { get; set; }

    public Employee Employee { get; set; } = null!;
}
```

### EmployeeAddress
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeAddress.cs`**
```csharp
public class EmployeeAddress : BaseEntity
{
    public long EmployeeId { get; set; }
    public AddressType AddressType { get; set; }       // Current, Permanent, Mailing
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? City { get; set; }
    public string? CityAr { get; set; }
    public string? State { get; set; }
    public string? StateAr { get; set; }
    public string? PostalCode { get; set; }
    public string? Country { get; set; }
    public string? CountryAr { get; set; }
    public bool IsPrimary { get; set; } = true;

    public Employee Employee { get; set; } = null!;
}
```

### EmployeeEducation
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeEducation.cs`**
```csharp
public class EmployeeEducation : BaseEntity
{
    public long EmployeeId { get; set; }
    public EducationLevel Level { get; set; }
    public string InstitutionName { get; set; } = string.Empty;
    public string? InstitutionNameAr { get; set; }
    public string? Degree { get; set; }
    public string? DegreeAr { get; set; }
    public string? FieldOfStudy { get; set; }
    public string? FieldOfStudyAr { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Grade { get; set; }                 // GPA or grade
    public string? CertificateUrl { get; set; }
    public string? Country { get; set; }
    public bool IsHighestDegree { get; set; }

    public Employee Employee { get; set; } = null!;
}
```

### EmployeeWorkExperience
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeWorkExperience.cs`**
```csharp
public class EmployeeWorkExperience : BaseEntity
{
    public long EmployeeId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string? CompanyNameAr { get; set; }
    public string? JobTitle { get; set; }
    public string? JobTitleAr { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }              // null = current
    public string? Responsibilities { get; set; }
    public string? ReasonForLeaving { get; set; }
    public string? Country { get; set; }
    public string? ReferenceContactName { get; set; }
    public string? ReferenceContactPhone { get; set; }
    public string? CertificateUrl { get; set; }         // experience letter

    public Employee Employee { get; set; } = null!;
}
```

### EmployeeVisa (Critical for Middle East HRMS)
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeVisa.cs`**
```csharp
public class EmployeeVisa : BaseEntity
{
    public long EmployeeId { get; set; }
    public VisaType VisaType { get; set; }
    public string? VisaNumber { get; set; }
    public string? SponsorName { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public string? IssuingCountry { get; set; }
    public VisaStatus Status { get; set; } = VisaStatus.Active;
    public string? DocumentUrl { get; set; }
    public string? Notes { get; set; }

    public Employee Employee { get; set; } = null!;
}
```

### JobGrade (System-wide grade definitions)
**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/JobGrade.cs`**
```csharp
public class JobGrade : BaseEntity
{
    public string Code { get; set; } = string.Empty;    // e.g., "G1", "G2", "L5"
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public int Level { get; set; }                       // numeric ordering (1 = lowest)
    public decimal? MinSalary { get; set; }
    public decimal? MidSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public string? Currency { get; set; } = "SAR";
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
}
```

### New Enums for Sub-Entities
```csharp
public enum DependentRelationship
{
    Spouse = 1,
    Child = 2,
    Parent = 3,
    Sibling = 4,
    Other = 5
}

public enum AddressType
{
    Current = 1,
    Permanent = 2,
    Mailing = 3
}

public enum EducationLevel
{
    HighSchool = 1,
    Diploma = 2,
    Bachelors = 3,
    Masters = 4,
    Doctorate = 5,
    Professional = 6,
    Other = 7
}

public enum VisaType
{
    WorkVisa = 1,
    ResidencePermit = 2,    // Iqama in Saudi
    BusinessVisa = 3,
    TransitVisa = 4,
    Other = 5
}

public enum VisaStatus
{
    Active = 1,
    Expired = 2,
    Cancelled = 3,
    InRenewal = 4,
    Transferred = 5
}

public enum MaritalStatus
{
    Single = 1,
    Married = 2,
    Divorced = 3,
    Widowed = 4
}
```

### API Endpoints for Sub-Entities
All sub-entities follow a nested resource pattern under the employee:
```
GET/POST       /api/v1/employees/{employeeId}/bank-details         [EmployeeManagement]
PUT/DELETE      /api/v1/employee-bank-details/{id}                  [EmployeeManagement]
GET/POST       /api/v1/employees/{employeeId}/dependents           [EmployeeManagement]
PUT/DELETE      /api/v1/employee-dependents/{id}                    [EmployeeManagement]
GET/POST       /api/v1/employees/{employeeId}/emergency-contacts   [EmployeeManagement]
PUT/DELETE      /api/v1/employee-emergency-contacts/{id}            [EmployeeManagement]
GET/POST       /api/v1/employees/{employeeId}/addresses            [EmployeeManagement]
PUT/DELETE      /api/v1/employee-addresses/{id}                     [EmployeeManagement]
GET/POST       /api/v1/employees/{employeeId}/education            [EmployeeManagement]
PUT/DELETE      /api/v1/employee-education/{id}                     [EmployeeManagement]
GET/POST       /api/v1/employees/{employeeId}/work-experience      [EmployeeManagement]
PUT/DELETE      /api/v1/employee-work-experience/{id}               [EmployeeManagement]
GET/POST       /api/v1/employees/{employeeId}/visas                [EmployeeManagement]
PUT/DELETE      /api/v1/employee-visas/{id}                         [EmployeeManagement]
GET    /api/v1/employee-visas/expiring                              [EmployeeRead] (query: daysAhead)

GET/POST/PUT/DELETE /api/v1/job-grades                              [SettingsManagement]
GET    /api/v1/job-grades/dropdown                                  [SettingsRead]
```

### Background Jobs
- **`VisaExpiryAlertJob`** - Daily at 4:00 AM: Query visas expiring in 90/60/30/15/7 days, send notifications to HR and employee

### Frontend Integration
**Employee Create/Edit form** - add new sections:
- Personal Info section: add MaritalStatus, Nationality, Religion (optional)
- Address section (collapsible)
- Bank Details section (collapsible)
- Emergency Contacts section (repeatable form group)
- Dependents section (repeatable form group)

**Employee View page** - add new tabs:
- Bank Details, Dependents, Emergency Contacts, Addresses, Education, Work Experience, Visas

**Settings page**: Job Grades management (list, create, edit, view)

## 3. Employee Entity Enhancements

**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/Employee.cs`** - add properties:
```csharp
// Personal info enhancements
public string? MiddleName { get; set; }
public string? MiddleNameAr { get; set; }
public MaritalStatus? MaritalStatus { get; set; }
public string? Nationality { get; set; }              // e.g., "Saudi", "Egyptian"
public string? NationalityAr { get; set; }
public string? Religion { get; set; }                  // optional, for some benefit calculations
public string? PassportNumber { get; set; }
public DateTime? PassportExpiryDate { get; set; }
public int? NumberOfDependents { get; set; }

// Employment enhancements
public long? JobGradeId { get; set; }                  // link to JobGrade entity
public string? CostCenter { get; set; }                // for payroll cost allocation
public ContractType? CurrentContractType { get; set; }
public DateTime? ProbationEndDate { get; set; }
public ProbationStatus ProbationStatus { get; set; } = ProbationStatus.NotApplicable;
public int? NoticePeriodDays { get; set; }             // contractual notice period
public DateTime? TerminationDate { get; set; }         // when employment ended
public DateTime? LastWorkingDate { get; set; }

// New navigation properties
public JobGrade? JobGrade { get; set; }
public ICollection<EmployeeContract> Contracts { get; set; } = new List<EmployeeContract>();
public ICollection<EmployeeTransfer> Transfers { get; set; } = new List<EmployeeTransfer>();
public ICollection<EmployeePromotion> Promotions { get; set; } = new List<EmployeePromotion>();
public ICollection<SalaryAdjustment> SalaryAdjustments { get; set; } = new List<SalaryAdjustment>();
public ICollection<EmployeeProfileChange> ProfileChanges { get; set; } = new List<EmployeeProfileChange>();
public ICollection<EmployeeBankDetail> BankDetails { get; set; } = new List<EmployeeBankDetail>();
public ICollection<EmployeeDependent> Dependents { get; set; } = new List<EmployeeDependent>();
public ICollection<EmergencyContact> EmergencyContacts { get; set; } = new List<EmergencyContact>();
public ICollection<EmployeeAddress> Addresses { get; set; } = new List<EmployeeAddress>();
public ICollection<EmployeeEducation> EducationHistory { get; set; } = new List<EmployeeEducation>();
public ICollection<EmployeeWorkExperience> WorkExperienceHistory { get; set; } = new List<EmployeeWorkExperience>();
public ICollection<EmployeeVisa> Visas { get; set; } = new List<EmployeeVisa>();
```

## 3a. Effective Dating & Profile Change History

### Problem
Employee profile updates (department, manager, job title, work location, etc.) currently happen in-place with no history. We need:
1. **Future-effective changes**: Schedule a change for a future date (e.g., "move to IT dept on April 1st")
2. **Correction of past data**: Fix a past entry with an effective date
3. **Complete change history**: Audit trail of every profile change with what changed, when, and who did it

### Solution: EmployeeProfileChange Entity

This is a **general-purpose effective-dated change log** for the Employee entity. Specific high-impact changes (transfers, promotions, salary revisions) have their own dedicated entities with richer data and workflow support, but ALL changes (including corrections) are also logged here for a complete timeline.

**File: `src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeProfileChange.cs`**

```csharp
public class EmployeeProfileChange : BaseEntity
{
    public long EmployeeId { get; set; }
    public ProfileChangeType ChangeType { get; set; }
    public DateTime EffectiveDate { get; set; }           // when the change takes effect
    public bool IsApplied { get; set; }                   // false = scheduled, true = applied
    public DateTime? AppliedAt { get; set; }              // when it was actually applied
    public string FieldName { get; set; } = string.Empty; // e.g., "DepartmentId", "JobTitle", "ManagerEmployeeId"
    public string? OldValue { get; set; }                 // JSON or string
    public string? NewValue { get; set; }                 // JSON or string
    public string? OldDisplayValue { get; set; }          // human-readable, e.g., "IT Department"
    public string? NewDisplayValue { get; set; }          // human-readable, e.g., "Finance Department"
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public bool IsCorrection { get; set; }                // true = correcting past data
    public long? RelatedEntityId { get; set; }            // optional link to Transfer/Promotion ID
    public string? RelatedEntityType { get; set; }        // "Transfer", "Promotion", etc.
    public long? ApprovedByUserId { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
}
```

**New Enum:**
```csharp
public enum ProfileChangeType
{
    DepartmentChange = 1,
    ManagerChange = 2,
    JobTitleChange = 3,
    GradeChange = 4,
    WorkLocationChange = 5,
    BranchChange = 6,
    StatusChange = 7,
    SalaryChange = 8,
    ContractChange = 9,
    Correction = 10,           // correcting any past data
    Other = 20
}
```

### How It Works

**Immediate changes** (EffectiveDate = today):
1. User updates employee profile in admin UI
2. Backend: Update employee entity directly + create `EmployeeProfileChange` record with `IsApplied = true`
3. Change is visible immediately

**Future-effective changes** (EffectiveDate > today):
1. User enters a future effective date in the form
2. Backend: Create `EmployeeProfileChange` record with `IsApplied = false`
3. Employee entity is NOT changed yet
4. Background job `ApplyScheduledProfileChangesJob` runs daily at 1:00 AM:
   - Query all `EmployeeProfileChange` where `EffectiveDate <= today` AND `IsApplied = false`
   - Apply each change to the Employee entity
   - Set `IsApplied = true`, `AppliedAt = now`
   - Send notification to HR

**Corrections** (past effective date):
1. User marks the change as a "correction" in the form
2. Backend: Update employee entity directly + create `EmployeeProfileChange` with `IsCorrection = true`
3. If the correction affects payroll (e.g., salary), flag for recalculation

**Integration with Transfers/Promotions:**
- When a Transfer or Promotion is approved and completed, the system automatically creates `EmployeeProfileChange` records for each field that changed (department, title, salary, etc.)
- `RelatedEntityId` + `RelatedEntityType` link back to the source entity
- This provides a single unified timeline of ALL employee changes

### Background Job
**`ApplyScheduledProfileChangesJob`** (Coravel, daily at 1:00 AM):
```csharp
// Pseudocode
var pendingChanges = await db.EmployeeProfileChanges
    .Where(c => !c.IsApplied && c.EffectiveDate.Date <= DateTime.UtcNow.Date)
    .OrderBy(c => c.EffectiveDate)
    .ThenBy(c => c.CreatedAtUtc)
    .ToListAsync();

foreach (var change in pendingChanges)
{
    var employee = await db.Employees.FindAsync(change.EmployeeId);
    ApplyChange(employee, change);  // reflection or switch on FieldName
    change.IsApplied = true;
    change.AppliedAt = DateTime.UtcNow;
    // Send notification
}
```

### API Endpoints
```
GET    /api/v1/employees/{employeeId}/profile-changes     [EmployeeRead]  (timeline view)
POST   /api/v1/employees/{employeeId}/profile-changes     [EmployeeManagement]  (schedule change)
DELETE /api/v1/employee-profile-changes/{id}              [EmployeeManagement]  (cancel pending)
GET    /api/v1/employee-profile-changes/pending           [EmployeeRead]  (all pending scheduled)
```

### Frontend Integration
- **Employee View page**: New "Change History" tab showing the full timeline
- **Employee Edit page**: Date picker for "Effective Date" on key fields (department, manager, job title, grade, work location). If future date selected, shows warning "This change will take effect on {date}"
- **Pending Changes dashboard widget**: Shows count of upcoming scheduled changes

## 4. PermissionResources

**File: `src/Domain/TimeAttendanceSystem.Domain/Common/PermissionResources.cs`** - add:
```csharp
public const string Contract = "contract";
public const string Transfer = "transfer";
public const string Promotion = "promotion";
public const string SalaryAdjustment = "salaryAdjustment";
```

## 5. API Endpoints

### EmployeeContractsController
```
GET    /api/v1/employee-contracts                         [ContractRead]
GET    /api/v1/employee-contracts/{id}                    [ContractRead]
GET    /api/v1/employees/{employeeId}/contracts           [ContractRead]
POST   /api/v1/employee-contracts                         [ContractManagement]
PUT    /api/v1/employee-contracts/{id}                    [ContractManagement]
POST   /api/v1/employee-contracts/{id}/activate           [ContractManagement]
POST   /api/v1/employee-contracts/{id}/terminate          [ContractManagement]
POST   /api/v1/employee-contracts/{id}/renew              [ContractManagement]
DELETE /api/v1/employee-contracts/{id}                    [ContractManagement]
GET    /api/v1/employee-contracts/expiring                [ContractRead]  (query: daysAhead)
```

### EmployeeTransfersController
```
GET    /api/v1/employee-transfers                         [TransferRead]
GET    /api/v1/employee-transfers/{id}                    [TransferRead]
POST   /api/v1/employee-transfers                         [TransferManagement]
PUT    /api/v1/employee-transfers/{id}                    [TransferManagement]
POST   /api/v1/employee-transfers/{id}/approve            [TransferManagement]
POST   /api/v1/employee-transfers/{id}/reject             [TransferManagement]
POST   /api/v1/employee-transfers/{id}/complete           [TransferManagement]
POST   /api/v1/employee-transfers/{id}/cancel             [TransferManagement]
DELETE /api/v1/employee-transfers/{id}                    [TransferManagement]
```

### EmployeePromotionsController
```
GET    /api/v1/employee-promotions                        [PromotionRead]
GET    /api/v1/employee-promotions/{id}                   [PromotionRead]
POST   /api/v1/employee-promotions                        [PromotionManagement]
PUT    /api/v1/employee-promotions/{id}                   [PromotionManagement]
POST   /api/v1/employee-promotions/{id}/approve           [PromotionManagement]
POST   /api/v1/employee-promotions/{id}/reject            [PromotionManagement]
POST   /api/v1/employee-promotions/{id}/cancel            [PromotionManagement]
DELETE /api/v1/employee-promotions/{id}                   [PromotionManagement]
```

### SalaryAdjustmentsController
See full endpoint list under the SalaryAdjustment entity section above (Section 2, item "SalaryAdjustment").

## 6. Background Jobs (Coravel)

- **`ContractExpiryAlertJob`** - Daily at 3:00 AM: Query contracts expiring in 30/15/7 days, send notifications
- **`ProbationExpiryAlertJob`** - Daily at 3:30 AM: Query employees with probation ending in 15/7/1 days, send notifications
- **`ApplyScheduledProfileChangesJob`** - Daily at 1:00 AM: Apply pending EmployeeProfileChange records where EffectiveDate <= today
- **`ApplyScheduledSalaryAdjustmentsJob`** - Daily at 1:30 AM: Apply approved SalaryAdjustments where EffectiveDate <= today and not yet applied

## 7. Frontend Pages (Admin)

### New Pages
- `pages/employee-contracts/` - list, create, edit, view
- `pages/employee-transfers/` - list, create, view
- `pages/employee-promotions/` - list, create, view

### Enhanced Pages
- `pages/employees/view-employee/` - add tabs: Contracts, Transfers, Promotions, Salary History

### i18n Key Prefix
- `contracts.*` (~80 keys)
- `transfers.*` (~60 keys)
- `promotions.*` (~60 keys)
- `salaryRevisions.*` (~30 keys)

## 8. Implementation Steps (Module 1.1)

1. Add new enums to `Enums.cs` and `WorkflowEntityType.cs`
2. Create 4 domain entities (EmployeeContract, EmployeeTransfer, EmployeePromotion, SalaryRevision)
3. Add new properties to Employee entity
4. Add PermissionResources
5. Add DbSets to `IApplicationDbContext.cs` and `TimeAttendanceDbContext.cs`
6. Add EF configurations
7. Create CQRS commands/queries for each entity
8. Create API controllers
9. Register authorization policies in `Infrastructure/DependencyInjection.cs`
10. Create background jobs
11. **Do NOT create migration yet** - wait for all Phase 1 modules
12. Create frontend models, services, pages
13. Add i18n keys (EN + AR)
14. Add menu entries and routes

---

# MODULE 1.2: PAYROLL & COMPENSATION

## 1. New Enums

**File: `src/Domain/TimeAttendanceSystem.Domain/Common/Enums.cs`** - add:

```csharp
public enum SalaryComponentType
{
    Basic = 1,
    HousingAllowance = 2,
    TransportAllowance = 3,
    PhoneAllowance = 4,
    FoodAllowance = 5,
    OtherAllowance = 6,
    TaxDeduction = 10,
    SocialInsuranceDeduction = 11,
    LoanDeduction = 12,
    OtherDeduction = 13,
    Benefit = 20
}

public enum CalculationType
{
    Fixed = 1,
    PercentageOfBasic = 2,
    PercentageOfGross = 3
}

public enum PayrollPeriodStatus
{
    Draft = 1,
    Processing = 2,
    Processed = 3,
    PendingApproval = 4,
    Approved = 5,
    Paid = 6,
    Cancelled = 7
}

public enum PayrollPeriodType
{
    Monthly = 1,
    BiWeekly = 2
}

public enum PayrollRecordStatus
{
    Pending = 1,
    Calculated = 2,
    Adjusted = 3,
    Finalized = 4
}

public enum BankFileFormat
{
    WPS = 1,    // Wage Protection System (Saudi/UAE)
    CSV = 2,
    SWIFT = 3
}
```

**File: `WorkflowEntityType.cs`** - add:
```csharp
Payroll = 9
```

## 2. New Domain Entities

### SalaryStructure
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/SalaryStructure.cs`**
```csharp
public class SalaryStructure : BaseEntity
{
    public long? BranchId { get; set; }             // null = org-wide
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public Branch? Branch { get; set; }
    public ICollection<SalaryComponent> Components { get; set; } = new List<SalaryComponent>();
}
```

### SalaryComponent
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/SalaryComponent.cs`**
```csharp
public class SalaryComponent : BaseEntity
{
    public long SalaryStructureId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public SalaryComponentType ComponentType { get; set; }
    public CalculationType CalculationType { get; set; }
    public decimal? Amount { get; set; }             // for Fixed
    public decimal? Percentage { get; set; }         // for Percentage types
    public bool IsRecurring { get; set; } = true;
    public bool IsTaxable { get; set; }
    public bool IsSocialInsurable { get; set; }
    public int DisplayOrder { get; set; }

    // Navigation
    public SalaryStructure SalaryStructure { get; set; } = null!;
}
```

### EmployeeSalary
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/EmployeeSalary.cs`**
```csharp
public class EmployeeSalary : BaseEntity
{
    public long EmployeeId { get; set; }
    public long SalaryStructureId { get; set; }
    public decimal BaseSalary { get; set; }
    public string Currency { get; set; } = "SAR";
    public DateTime EffectiveDate { get; set; }
    public DateTime? EndDate { get; set; }           // null = current
    public string? Reason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public bool IsCurrent { get; set; } = true;

    // Navigation
    public Employee Employee { get; set; } = null!;
    public SalaryStructure SalaryStructure { get; set; } = null!;
    public ICollection<EmployeeSalaryComponent> Components { get; set; } = new List<EmployeeSalaryComponent>();
}
```

### EmployeeSalaryComponent
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/EmployeeSalaryComponent.cs`**
```csharp
public class EmployeeSalaryComponent : BaseEntity
{
    public long EmployeeSalaryId { get; set; }
    public long SalaryComponentId { get; set; }
    public decimal Amount { get; set; }              // calculated or overridden
    public decimal? OverrideAmount { get; set; }     // manual override

    // Navigation
    public EmployeeSalary EmployeeSalary { get; set; } = null!;
    public SalaryComponent SalaryComponent { get; set; } = null!;
}
```

### PayrollPeriod
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/PayrollPeriod.cs`**
```csharp
public class PayrollPeriod : BaseEntity
{
    public long BranchId { get; set; }
    public string Name { get; set; } = string.Empty;  // e.g., "March 2026"
    public string? NameAr { get; set; }
    public PayrollPeriodType PeriodType { get; set; } = PayrollPeriodType.Monthly;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public PayrollPeriodStatus Status { get; set; } = PayrollPeriodStatus.Draft;
    public decimal TotalGross { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal TotalNet { get; set; }
    public int EmployeeCount { get; set; }
    public long? ProcessedByUserId { get; set; }
    public DateTime? ProcessedAt { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Branch Branch { get; set; } = null!;
    public WorkflowInstance? WorkflowInstance { get; set; }
    public ICollection<PayrollRecord> Records { get; set; } = new List<PayrollRecord>();
    public ICollection<BankTransferFile> BankTransferFiles { get; set; } = new List<BankTransferFile>();
}
```

### PayrollRecord
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/PayrollRecord.cs`**
```csharp
public class PayrollRecord : BaseEntity
{
    public long PayrollPeriodId { get; set; }
    public long EmployeeId { get; set; }
    public decimal BaseSalary { get; set; }
    public decimal TotalAllowances { get; set; }
    public decimal GrossEarnings { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal SocialInsuranceEmployee { get; set; }
    public decimal SocialInsuranceEmployer { get; set; }
    public decimal OvertimePay { get; set; }
    public decimal AbsenceDeduction { get; set; }
    public decimal LoanDeduction { get; set; }
    public decimal OtherDeductions { get; set; }
    public decimal NetSalary { get; set; }
    public int WorkingDays { get; set; }
    public int PaidDays { get; set; }
    public decimal OvertimeHours { get; set; }
    public int AbsentDays { get; set; }
    public PayrollRecordStatus Status { get; set; } = PayrollRecordStatus.Pending;
    public string? Notes { get; set; }
    public DateTime? PaySlipGeneratedAt { get; set; }

    // Navigation
    public PayrollPeriod PayrollPeriod { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public ICollection<PayrollRecordDetail> Details { get; set; } = new List<PayrollRecordDetail>();
}
```

### PayrollRecordDetail
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/PayrollRecordDetail.cs`**
```csharp
public class PayrollRecordDetail : BaseEntity
{
    public long PayrollRecordId { get; set; }
    public long? SalaryComponentId { get; set; }
    public string ComponentName { get; set; } = string.Empty;
    public string? ComponentNameAr { get; set; }
    public SalaryComponentType ComponentType { get; set; }
    public decimal Amount { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public PayrollRecord PayrollRecord { get; set; } = null!;
    public SalaryComponent? SalaryComponent { get; set; }
}
```

### TaxConfiguration + TaxBracket
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/TaxConfiguration.cs`**
```csharp
public class TaxConfiguration : BaseEntity
{
    public long? BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public DateTime EffectiveDate { get; set; }
    public bool IsActive { get; set; } = true;

    public Branch? Branch { get; set; }
    public ICollection<TaxBracket> Brackets { get; set; } = new List<TaxBracket>();
}

public class TaxBracket : BaseEntity
{
    public long TaxConfigurationId { get; set; }
    public decimal MinAmount { get; set; }
    public decimal MaxAmount { get; set; }
    public decimal Rate { get; set; }               // percentage
    public decimal FixedAmount { get; set; }        // fixed deduction

    public TaxConfiguration TaxConfiguration { get; set; } = null!;
}
```

### SocialInsuranceConfig
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/SocialInsuranceConfig.cs`**
```csharp
public class SocialInsuranceConfig : BaseEntity
{
    public long? BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public decimal EmployeeContributionRate { get; set; }  // e.g., 9.75% (GOSI Saudi)
    public decimal EmployerContributionRate { get; set; }  // e.g., 11.75%
    public decimal MaxInsurableSalary { get; set; }
    public DateTime EffectiveDate { get; set; }
    public bool IsActive { get; set; } = true;

    public Branch? Branch { get; set; }
}
```

### BankTransferFile
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/BankTransferFile.cs`**
```csharp
public class BankTransferFile : BaseEntity
{
    public long PayrollPeriodId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public BankFileFormat FileFormat { get; set; }
    public DateTime GeneratedAt { get; set; }
    public long GeneratedByUserId { get; set; }
    public decimal TotalAmount { get; set; }
    public int RecordCount { get; set; }
    public string? FileUrl { get; set; }

    public PayrollPeriod PayrollPeriod { get; set; } = null!;
}
```

### PayrollAdjustment (One-time additions/deductions for a specific payroll period)
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/PayrollAdjustment.cs`**
```csharp
public class PayrollAdjustment : BaseEntity
{
    public long PayrollPeriodId { get; set; }
    public long EmployeeId { get; set; }
    public PayrollAdjustmentType AdjustmentType { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public decimal Amount { get; set; }                 // positive = addition, negative = deduction
    public bool IsRecurring { get; set; }               // if true, auto-apply in future periods
    public int? RecurringMonths { get; set; }           // how many months to recur
    public string? Reason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }

    public PayrollPeriod PayrollPeriod { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
```

**New Enum:**
```csharp
public enum PayrollAdjustmentType
{
    Bonus = 1,
    Commission = 2,
    Reimbursement = 3,
    Penalty = 4,
    Advance = 5,
    LoanInstallment = 6,
    InsuranceDeduction = 7,
    TaxAdjustment = 8,
    Other = 20
}
```

### Employee Insurance/Benefits Tracking
**File: `src/Domain/TimeAttendanceSystem.Domain/Payroll/EmployeeInsurance.cs`**
```csharp
public class InsuranceProvider : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? ContactPerson { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? PolicyNumber { get; set; }
    public InsuranceType InsuranceType { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<EmployeeInsurance> EmployeeInsurances { get; set; } = new List<EmployeeInsurance>();
}

public class EmployeeInsurance : BaseEntity
{
    public long EmployeeId { get; set; }
    public long InsuranceProviderId { get; set; }
    public string? MembershipNumber { get; set; }
    public InsuranceClass InsuranceClass { get; set; }  // A, B, C, VIP
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal? MonthlyPremium { get; set; }
    public decimal? EmployeeContribution { get; set; }
    public decimal? EmployerContribution { get; set; }
    public bool IncludesDependents { get; set; }
    public int? CoveredDependentsCount { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Notes { get; set; }

    public Employee Employee { get; set; } = null!;
    public InsuranceProvider InsuranceProvider { get; set; } = null!;
}
```

**New Enums:**
```csharp
public enum InsuranceType
{
    Medical = 1,
    Dental = 2,
    Life = 3,
    Disability = 4,
    Travel = 5,
    Other = 6
}

public enum InsuranceClass
{
    ClassA = 1,    // Premium
    ClassB = 2,    // Standard
    ClassC = 3,    // Basic
    VIP = 4
}
```

### API Endpoints for Payroll Additions
```
GET/POST       /api/v1/payroll-periods/{periodId}/adjustments      [PayrollManagement]
PUT/DELETE      /api/v1/payroll-adjustments/{id}                    [PayrollManagement]
GET/POST/PUT/DELETE /api/v1/insurance-providers                     [SettingsManagement]
GET/POST       /api/v1/employees/{employeeId}/insurance             [EmployeeManagement]
PUT/DELETE      /api/v1/employee-insurance/{id}                     [EmployeeManagement]
```

## 3. Key Application Services

### IPayrollCalculationService
```csharp
Task<PayrollRecord> CalculateEmployeePayroll(long employeeId, PayrollPeriod period);
Task ProcessPayrollPeriod(long payrollPeriodId);  // calculates all employees
```
- Integrates with AttendanceRecord for: overtime hours, absent days, working days
- Integrates with EmployeeVacation for: unpaid leave deductions
- Integrates with EmployeeExcuse for: salary-affecting excuses

### IPaySlipGenerationService
```csharp
Task<byte[]> GeneratePaySlipPdf(long payrollRecordId);
```

### IBankFileGenerationService
```csharp
Task<BankTransferFile> GenerateWpsFile(long payrollPeriodId);
Task<BankTransferFile> GenerateCsvFile(long payrollPeriodId);
```

## 4. API Endpoints

### SalaryStructuresController
```
GET    /api/v1/salary-structures                          [SalaryStructureRead]
GET    /api/v1/salary-structures/{id}                     [SalaryStructureRead]
POST   /api/v1/salary-structures                          [SalaryStructureManagement]
PUT    /api/v1/salary-structures/{id}                     [SalaryStructureManagement]
DELETE /api/v1/salary-structures/{id}                     [SalaryStructureManagement]
POST   /api/v1/salary-structures/{id}/toggle-status       [SalaryStructureManagement]
GET    /api/v1/salary-structures/dropdown                 [SalaryStructureRead]
```

### EmployeeSalariesController
```
GET    /api/v1/employees/{employeeId}/salary              [PayrollRead]
GET    /api/v1/employees/{employeeId}/salary-history      [PayrollRead]
POST   /api/v1/employees/{employeeId}/salary              [PayrollManagement]
```

### PayrollPeriodsController
```
GET    /api/v1/payroll-periods                            [PayrollRead]
GET    /api/v1/payroll-periods/{id}                       [PayrollRead]
POST   /api/v1/payroll-periods                            [PayrollManagement]
POST   /api/v1/payroll-periods/{id}/process               [PayrollManagement]
POST   /api/v1/payroll-periods/{id}/approve               [PayrollManagement]
POST   /api/v1/payroll-periods/{id}/mark-paid             [PayrollManagement]
POST   /api/v1/payroll-periods/{id}/cancel                [PayrollManagement]
GET    /api/v1/payroll-periods/{id}/records               [PayrollRead]
GET    /api/v1/payroll-periods/{id}/summary               [PayrollRead]
POST   /api/v1/payroll-periods/{id}/bank-file             [PayrollManagement]
```

### PayrollRecordsController
```
GET    /api/v1/payroll-records/{id}                       [PayrollRead]
GET    /api/v1/payroll-records/{id}/payslip               [PayrollRead]  (returns PDF)
PUT    /api/v1/payroll-records/{id}                       [PayrollManagement] (manual adjust)
```

### TaxConfigurationsController + SocialInsuranceController
```
GET/POST/PUT/DELETE /api/v1/tax-configurations            [TaxConfigurationManagement]
GET/POST/PUT/DELETE /api/v1/social-insurance-configs      [SocialInsuranceManagement]
```

## 5. PermissionResources
```csharp
public const string Payroll = "payroll";
public const string SalaryStructure = "salaryStructure";
public const string TaxConfiguration = "taxConfiguration";
public const string SocialInsurance = "socialInsurance";
```

## 6. Frontend Pages (Admin)
- `pages/payroll/salary-structures/` - list, create, edit, view (with inline component editor)
- `pages/payroll/payroll-periods/` - list, create, view (with process/approve actions)
- `pages/payroll/payroll-records/` - list per period, view individual record
- `pages/payroll/payslips/` - payslip viewer/download
- `pages/payroll/bank-files/` - generation and download
- `pages/settings/tax-configuration/` - list, create, edit, view
- `pages/settings/social-insurance/` - list, create, edit, view

## 7. Frontend Pages (Self-Service)
- `portal/my-payslips/` - list payslips by month, download PDF
- `portal/my-salary/` - view current salary breakdown

## 8. Mobile (Flutter)
- `features/payslip/` - list payslips, view details, download PDF

---

# MODULE 1.3: EXIT/OFFBOARDING MANAGEMENT

## 1. New Enums

```csharp
public enum TerminationType
{
    Resignation = 1,
    Termination = 2,
    EndOfContract = 3,
    Retirement = 4,
    Redundancy = 5,
    MutualAgreement = 6
}

public enum ClearanceStatus
{
    Pending = 1,
    InProgress = 2,
    Completed = 3
}

public enum ClearanceDepartment
{
    IT = 1,
    Finance = 2,
    Admin = 3,
    HR = 4,
    Operations = 5,
    Security = 6
}

public enum SettlementStatus
{
    Draft = 1,
    Calculated = 2,
    PendingApproval = 3,
    Approved = 4,
    Paid = 5,
    Cancelled = 6
}

public enum ResignationStatus
{
    Pending = 1,
    Approved = 2,
    Rejected = 3,
    Withdrawn = 4
}
```

**WorkflowEntityType** - add:
```csharp
Resignation = 10,
FinalSettlement = 11
```

## 2. New Domain Entities

### ResignationRequest
**File: `src/Domain/TimeAttendanceSystem.Domain/Offboarding/ResignationRequest.cs`**
```csharp
public class ResignationRequest : BaseEntity
{
    public long EmployeeId { get; set; }
    public DateTime ResignationDate { get; set; }
    public DateTime LastWorkingDate { get; set; }
    public int NoticePeriodDays { get; set; }
    public int WaivedNoticeDays { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public ResignationStatus Status { get; set; } = ResignationStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public WorkflowInstance? WorkflowInstance { get; set; }
}
```

### TerminationRecord
**File: `src/Domain/TimeAttendanceSystem.Domain/Offboarding/TerminationRecord.cs`**
```csharp
public class TerminationRecord : BaseEntity
{
    public long EmployeeId { get; set; }
    public TerminationType TerminationType { get; set; }
    public DateTime TerminationDate { get; set; }
    public DateTime LastWorkingDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public long? ResignationRequestId { get; set; }   // if resignation-based
    public long? ProcessedByUserId { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public ResignationRequest? ResignationRequest { get; set; }
    public ClearanceChecklist? ClearanceChecklist { get; set; }
    public EndOfServiceBenefit? EndOfServiceBenefit { get; set; }
    public FinalSettlement? FinalSettlement { get; set; }
    public ExitInterview? ExitInterview { get; set; }
}
```

### ClearanceChecklist + ClearanceItem
**File: `src/Domain/TimeAttendanceSystem.Domain/Offboarding/ClearanceChecklist.cs`**
```csharp
public class ClearanceChecklist : BaseEntity
{
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public ClearanceStatus OverallStatus { get; set; } = ClearanceStatus.Pending;
    public DateTime? CompletedAt { get; set; }

    public TerminationRecord TerminationRecord { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public ICollection<ClearanceItem> Items { get; set; } = new List<ClearanceItem>();
}

public class ClearanceItem : BaseEntity
{
    public long ClearanceChecklistId { get; set; }
    public ClearanceDepartment Department { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public string? ItemNameAr { get; set; }
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public long? CompletedByUserId { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? Notes { get; set; }
    public int DisplayOrder { get; set; }

    public ClearanceChecklist ClearanceChecklist { get; set; } = null!;
}
```

### EndOfServiceBenefit
**File: `src/Domain/TimeAttendanceSystem.Domain/Offboarding/EndOfServiceBenefit.cs`**
```csharp
public class EndOfServiceBenefit : BaseEntity
{
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public int ServiceYears { get; set; }
    public int ServiceMonths { get; set; }
    public int ServiceDays { get; set; }
    public decimal BasicSalary { get; set; }
    public decimal TotalAllowances { get; set; }
    public decimal CalculationBasis { get; set; }     // basic + allowances used
    public decimal TotalAmount { get; set; }
    public decimal DeductionAmount { get; set; }       // e.g., for resignation before 5yr
    public decimal NetAmount { get; set; }
    public string? CalculationDetails { get; set; }    // JSON breakdown
    public string? Notes { get; set; }

    public TerminationRecord TerminationRecord { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
```

### FinalSettlement
**File: `src/Domain/TimeAttendanceSystem.Domain/Offboarding/FinalSettlement.cs`**
```csharp
public class FinalSettlement : BaseEntity
{
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public decimal BasicSalaryDue { get; set; }        // prorated salary for final month
    public decimal AllowancesDue { get; set; }
    public decimal LeaveEncashmentAmount { get; set; }  // unused leave balance * daily rate
    public int LeaveEncashmentDays { get; set; }
    public decimal EndOfServiceAmount { get; set; }
    public decimal OvertimeDue { get; set; }
    public decimal LoanOutstanding { get; set; }        // deducted
    public decimal AdvanceOutstanding { get; set; }     // deducted
    public decimal OtherDeductions { get; set; }
    public decimal OtherAdditions { get; set; }
    public decimal GrossSettlement { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal NetSettlement { get; set; }
    public SettlementStatus Status { get; set; } = SettlementStatus.Draft;
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime? PaidAt { get; set; }
    public string? CalculationDetails { get; set; }     // JSON
    public string? Notes { get; set; }

    // Workflow
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    public TerminationRecord TerminationRecord { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public WorkflowInstance? WorkflowInstance { get; set; }
}
```

### ExitInterview
**File: `src/Domain/TimeAttendanceSystem.Domain/Offboarding/ExitInterview.cs`**
```csharp
public class ExitInterview : BaseEntity
{
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public DateTime InterviewDate { get; set; }
    public long InterviewerUserId { get; set; }
    public int? OverallSatisfactionRating { get; set; }  // 1-5
    public string? ReasonForLeaving { get; set; }
    public string? ReasonForLeavingAr { get; set; }
    public bool? WouldRejoin { get; set; }
    public string? LikedMost { get; set; }
    public string? ImprovementSuggestions { get; set; }
    public string? AdditionalComments { get; set; }
    public bool IsConfidential { get; set; } = true;

    public TerminationRecord TerminationRecord { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
```

## 3. Key Application Services

### IEndOfServiceCalculationService
```csharp
Task<EndOfServiceBenefit> Calculate(long terminationRecordId);
```
Saudi labor law calculation:
- First 5 years: 0.5 month per year
- After 5 years: 1 month per year
- Resignation before 2 years: 0
- Resignation 2-5 years: 1/3 of entitlement
- Resignation 5-10 years: 2/3 of entitlement
- Resignation 10+ years: full entitlement
- Basis: last basic salary + allowances (configurable)

### IFinalSettlementService
```csharp
Task<FinalSettlement> Calculate(long terminationRecordId);
```
Aggregates: prorated salary, leave encashment, EOS, overtime, deductions (loans, advances)

## 4. API Endpoints

### ResignationRequestsController
```
GET    /api/v1/resignation-requests                       [Read]
GET    /api/v1/resignation-requests/{id}                  [Read]
POST   /api/v1/resignation-requests                       [Management]
POST   /api/v1/resignation-requests/{id}/approve          [Management]
POST   /api/v1/resignation-requests/{id}/reject           [Management]
POST   /api/v1/resignation-requests/{id}/withdraw         [Management]
```

### TerminationsController
```
GET    /api/v1/terminations                               [Read]
GET    /api/v1/terminations/{id}                          [Read]
POST   /api/v1/terminations                               [Management]
```

### ClearanceController
```
GET    /api/v1/clearance/{terminationId}                  [Read]
POST   /api/v1/clearance/{terminationId}/initialize       [Management]
POST   /api/v1/clearance-items/{itemId}/complete          [Management]
GET    /api/v1/clearance/pending                          [Read]
```

### EndOfServiceController
```
GET    /api/v1/end-of-service/{terminationId}             [Read]
POST   /api/v1/end-of-service/{terminationId}/calculate   [Management]
```

### FinalSettlementsController
```
GET    /api/v1/final-settlements/{terminationId}          [Read]
POST   /api/v1/final-settlements/{terminationId}/calculate [Management]
POST   /api/v1/final-settlements/{terminationId}/approve   [Management]
POST   /api/v1/final-settlements/{terminationId}/mark-paid [Management]
```

### ExitInterviewsController
```
GET    /api/v1/exit-interviews/{terminationId}            [Read]
POST   /api/v1/exit-interviews/{terminationId}            [Management]
PUT    /api/v1/exit-interviews/{terminationId}            [Management]
```

## 5. PermissionResources
```csharp
public const string Resignation = "resignation";
public const string Termination = "termination";
public const string Clearance = "clearance";
public const string EndOfService = "endOfService";
public const string FinalSettlement = "finalSettlement";
public const string ExitInterview = "exitInterview";
```

## 6. Frontend Pages (Admin)
- `pages/offboarding/resignation-requests/` - list, view, approve/reject
- `pages/offboarding/terminations/` - list, create, view
- `pages/offboarding/clearance/` - dashboard, checklist view per employee
- `pages/offboarding/settlements/` - list, view, calculate, approve
- `pages/offboarding/exit-interviews/` - create, view

## 7. Frontend Pages (Self-Service)
- `portal/resignation/` - submit resignation, track status, view clearance progress

## 8. Portal Controller Extension
Add to existing PortalController:
```
GET    /api/v1/portal/my-resignation                      // employee's resignation status
POST   /api/v1/portal/my-resignation                      // submit resignation
GET    /api/v1/portal/my-clearance                        // clearance progress
```

---

# CROSS-MODULE: DATABASE MIGRATION

After all three modules are coded, create ONE migration:
```bash
dotnet ef migrations add AddEmployeeLifecyclePayrollOffboarding \
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
  --startup-project src/Api/TimeAttendanceSystem.Api
```

New tables (~35):
**Module 1.1 - Employee Lifecycle:**
- EmployeeContracts, EmployeeTransfers, EmployeePromotions, SalaryAdjustments, EmployeeProfileChanges
- EmployeeBankDetails, EmployeeDependents, EmergencyContacts, EmployeeAddresses
- EmployeeEducation, EmployeeWorkExperience, EmployeeVisas, JobGrades

**Module 1.2 - Payroll:**
- SalaryStructures, SalaryComponents, EmployeeSalaries, EmployeeSalaryComponents
- PayrollPeriods, PayrollRecords, PayrollRecordDetails, PayrollAdjustments
- TaxConfigurations, TaxBrackets, SocialInsuranceConfigs, BankTransferFiles
- InsuranceProviders, EmployeeInsurances
- ResignationRequests, TerminationRecords, ClearanceChecklists, ClearanceItems
- EndOfServiceBenefits, FinalSettlements, ExitInterviews

**Module 1.3 - Offboarding:**
- ResignationRequests, TerminationRecords, ClearanceChecklists, ClearanceItems
- EndOfServiceBenefits, FinalSettlements, ExitInterviews

Modified tables:
- Employees (add ~15 new columns: MiddleName, MaritalStatus, Nationality, PassportNumber, JobGradeId, CostCenter, CurrentContractType, ProbationEndDate, ProbationStatus, NoticePeriodDays, TerminationDate, LastWorkingDate, etc.)

---

# IMPLEMENTATION ORDER

```
Step 1:  Enums + WorkflowEntityType extensions
Step 2:  Employee entity enhancements (new properties)
Step 3:  Module 1.1 domain entities - Core (Contract, Transfer, Promotion, SalaryAdjustment, ProfileChange)
Step 3b: Module 1.1 domain entities - Sub-entities (BankDetail, Dependent, EmergencyContact, Address, Education, WorkExperience, Visa, JobGrade)
Step 4:  Module 1.2 domain entities (Payroll entities + PayrollAdjustment + InsuranceProvider + EmployeeInsurance)
Step 5:  Module 1.3 domain entities (all Offboarding entities)
Step 6:  PermissionResources for all 3 modules
Step 7:  DbSets in IApplicationDbContext + TimeAttendanceDbContext
Step 8:  EF Configurations for all new entities
Step 9:  Create database migration
Step 10: Module 1.1 CQRS commands/queries + controller
Step 11: Module 1.1 background jobs
Step 12: Module 1.2 CQRS commands/queries + services + controller
Step 13: Module 1.3 CQRS commands/queries + services + controller
Step 14: Authorization policies registration
Step 15: Build + verify backend compiles
Step 16: Module 1.1 frontend (admin) - models, service, pages
Step 17: Module 1.2 frontend (admin) - models, service, pages
Step 18: Module 1.3 frontend (admin) - models, service, pages
Step 19: Self-service portal pages (payslips, salary, resignation)
Step 20: i18n keys (EN + AR) for all modules
Step 21: Menu entries and routes
Step 22: Build + verify frontend compiles
Step 23: Apply migration + test end-to-end
```

---

# VERIFICATION PLAN

1. `dotnet build` - backend compiles with zero errors
2. `ng build` (admin) - frontend compiles
3. `ng build` (self-service) - frontend compiles
4. Apply migration - verify all tables created, existing data preserved
5. Swagger - test each endpoint group:
   - Contracts CRUD + activate/renew/terminate
   - Transfers CRUD + approve/complete
   - Promotions CRUD + approve
   - Salary structures CRUD + employee salary assignment
   - Payroll period create/process/approve
   - Payslip PDF generation
   - Resignation submit/approve
   - Termination create + clearance initialize
   - EOS + final settlement calculation
6. Admin UI - test all CRUD pages, filters, modern form design
7. Self-service - test payslip view, resignation flow
8. Workflow - create workflow definitions for Transfer, Promotion, Resignation
9. i18n - switch EN/AR, verify translations
10. Permissions - test unauthorized access blocked
11. Audit - verify audit logs for all CRUD operations
