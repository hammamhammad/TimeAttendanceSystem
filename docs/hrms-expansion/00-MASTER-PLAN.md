# Full HR System Expansion Plan

## Context

The TecAxle HRMS is a mature, well-architected workforce management solution with 44 domain entities, 34 controllers, 150+ API endpoints, and three frontends (Admin Angular, Self-Service Angular, Flutter Mobile). It currently covers **time & attendance, leave management, excuse management, remote work, shift management, overtime, approval workflows, notifications, and comprehensive security/audit**.

The goal is to expand this into a **complete HR Management System (HRMS)** by adding the missing HR modules while preserving the existing codebase and following established architectural patterns.

> **Important**: Each module below requires a **detailed implementation plan** (in `docs/hrms-expansion/modules/`) that must be reviewed and approved before any code is written. The detailed plan will specify exact entity properties, complete endpoint signatures, full frontend component trees, i18n keys, and step-by-step implementation instructions.

---

## Current System Inventory (What Already Exists)

| Module | Status | Entities |
|--------|--------|----------|
| Employee Management | Complete | Employee, EmployeeUserLink |
| Organization Structure | Complete | Branch, Department, Tenant |
| Time & Attendance | Complete | AttendanceRecord, AttendanceTransaction, AttendanceVerificationLog, WorkingDay, AttendanceCorrectionRequest |
| Shift Management | Complete | Shift, ShiftPeriod, ShiftAssignment, OffDay |
| Leave/Vacation | Complete | VacationType, EmployeeVacation, LeaveBalance, LeaveTransaction, LeaveEntitlement, LeaveAccrualPolicy |
| Excuse Management | Complete | ExcusePolicy, EmployeeExcuse |
| Remote Work | Complete | RemoteWorkPolicy, RemoteWorkRequest |
| Overtime | Complete | OvertimeConfiguration |
| Approval Workflows | Complete | WorkflowDefinition, WorkflowInstance, WorkflowStep, WorkflowStepExecution, ApprovalDelegation |
| Notifications | Complete | Notification, NotificationBroadcast, PushNotificationToken |
| Auth & Security | Complete | User, Role, Permission, 2FA, Sessions, etc. (10 entities) |
| NFC & Mobile | Complete | NfcTag, FingerprintRequest |
| Audit & Reporting | Complete | AuditLog, AuditChange, PublicHoliday |
| Self-Service Portal | Complete | PortalController (19 endpoints) |
| Mobile App (Flutter) | Complete | 11 feature modules |

**Total existing: 44 entities, 34 controllers, 150+ endpoints, 4 background jobs**

---

## What's Missing for a Full HRMS

### Phase 1: Core HR Operations (Highest Priority)

#### 1.1 Employee Lifecycle Enhancements
**Why:** The Employee entity exists but lacks contract management, transfers, promotions, and proper status transitions. This is foundational for payroll and exit management.

**Detailed Plan:** [`modules/01-employee-lifecycle.md`](modules/01-employee-lifecycle.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Employees/`):

| Entity | Key Properties |
|--------|---------------|
| `EmployeeContract` | EmployeeId, ContractType (Permanent/FixedTerm/Probation/Internship), ContractNumber, StartDate, EndDate, RenewalDate, AutoRenew, BasicSalary, ProbationEndDate, ProbationStatus, DocumentUrl, Status (Active/Expired/Terminated/Renewed) |
| `EmployeeTransfer` | EmployeeId, FromBranchId, ToBranchId, FromDepartmentId, ToDepartmentId, TransferDate, EffectiveDate, Reason, Status, WorkflowInstanceId |
| `EmployeePromotion` | EmployeeId, OldJobTitle, NewJobTitle (EN/AR), OldGrade, NewGrade, OldSalary, NewSalary, EffectiveDate, Reason, Status, WorkflowInstanceId |
| `SalaryRevision` | EmployeeId, OldBaseSalary, NewBaseSalary, RevisionType (Annual/Promotion/Market/Performance), EffectiveDate, Reason, PercentageChange |

**Enhancements to existing Employee entity:**
- Add: `ContractType`, `ProbationEndDate`, `ProbationStatus`, `Grade`, `EmployeeCategory`
- Extend `EmploymentStatus` enum: add `Suspended`, `OnProbation`, `Resigned`

**WorkflowEntityType additions:** `Transfer = 7`, `Promotion = 8`

**API Endpoints:**
- `GET/POST /api/v1/employees/{id}/contracts` - contract management
- `GET/POST /api/v1/employee-transfers` - transfer requests with approval
- `GET/POST /api/v1/employee-promotions` - promotion requests with approval
- `GET /api/v1/employees/{id}/salary-revisions` - revision history
- `POST /api/v1/employees/{id}/status-transition` - status changes

**Background Jobs:**
- `ContractExpiryAlertJob` - daily check for contracts expiring within 30/15/7 days
- `ProbationExpiryJob` - alert HR about ending probation periods

**Frontend (Admin):** Add contract/promotion/transfer tabs to employee view page, plus dedicated list pages for transfers and promotions.

---

#### 1.2 Payroll & Compensation Management
**Why:** Payroll is the most critical missing HR function. It integrates with attendance (overtime pay, absence deductions), leave (unpaid leave deductions), and will be needed by loans/expenses for deduction integration.

**Detailed Plan:** [`modules/02-payroll.md`](modules/02-payroll.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Payroll/`):

| Entity | Key Properties |
|--------|---------------|
| `SalaryStructure` | BranchId, Name/NameAr, Description, IsActive, Components (nav) |
| `SalaryComponent` | SalaryStructureId, Name/NameAr, ComponentType (Basic/Allowance/Deduction/Benefit), CalculationType (Fixed/Percentage), Amount, Percentage, IsRecurring, IsTaxable, IsSocialInsurable, DisplayOrder |
| `EmployeeSalary` | EmployeeId, SalaryStructureId, BaseSalary, EffectiveDate, EndDate, Reason, ApprovedByUserId |
| `EmployeeSalaryComponent` | EmployeeSalaryId, SalaryComponentId, Amount, OverrideAmount |
| `PayrollPeriod` | BranchId, Name, PeriodType (Monthly/BiWeekly), StartDate, EndDate, Status (Draft/Processing/Processed/Approved/Paid/Cancelled), TotalGross, TotalDeductions, TotalNet |
| `PayrollRecord` | PayrollPeriodId, EmployeeId, BaseSalary, TotalAllowances, TotalDeductions, GrossEarnings, TaxAmount, SocialInsuranceAmount, NetSalary, OvertimePay, AbsenceDeduction, WorkingDays, PaidDays, Status |
| `PayrollRecordDetail` | PayrollRecordId, SalaryComponentId, ComponentName, ComponentType, Amount |
| `TaxConfiguration` | BranchId, Name, EffectiveDate, IsActive |
| `TaxBracket` | TaxConfigurationId, MinAmount, MaxAmount, Rate, FixedAmount |
| `SocialInsuranceConfig` | BranchId, EmployeeContributionRate, EmployerContributionRate, MaxInsurableSalary, EffectiveDate |
| `BankTransferFile` | PayrollPeriodId, FileName, FileFormat (WPS/CSV), GeneratedAt, TotalAmount, RecordCount |

**WorkflowEntityType addition:** `Payroll = 9`

**PermissionResources additions:** `payroll`, `salaryStructure`, `taxConfiguration`, `socialInsurance`

**Key Application Services:**
- `IPayrollCalculationService` - compute gross, tax, social insurance, net; integrates with AttendanceRecord for overtime and EmployeeVacation for unpaid leave deductions
- `IPaySlipGenerationService` - PDF generation
- `IBankFileGenerationService` - WPS/CSV file formats

**API Endpoints (~20):**
- Salary structures CRUD: `GET/POST/PUT/DELETE /api/v1/salary-structures`
- Employee salary: `GET/POST /api/v1/employees/{id}/salary`, `GET /api/v1/employees/{id}/salary-history`
- Payroll periods: `GET/POST /api/v1/payroll-periods`, `POST /{id}/process`, `POST /{id}/approve`
- Payroll records: `GET /api/v1/payroll-periods/{id}/records`
- Payslips: `GET /api/v1/payroll-records/{id}/payslip` (PDF)
- Bank files: `POST /api/v1/payroll-periods/{id}/bank-file`
- Tax & insurance config: `GET/POST /api/v1/tax-configurations`, `GET/POST /api/v1/social-insurance-configurations`

**Frontend (Admin):** `pages/payroll/` with salary-structures, payroll-periods, payroll-records, payslips, bank-files sub-pages. Settings pages for tax and social insurance.

**Frontend (Self-Service):** `portal/my-payslips/` - employee payslip list and download, `portal/my-salary/` - current salary breakdown view.

**Mobile (Flutter):** `features/payslip/` - view and download payslips.

---

#### 1.3 Exit/Offboarding Management
**Why:** Critical for proper employee lifecycle completion. Needed for end-of-service benefit calculations (per labor law), clearance tracking, and final settlement.

**Detailed Plan:** [`modules/03-exit-offboarding.md`](modules/03-exit-offboarding.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Offboarding/`):

| Entity | Key Properties |
|--------|---------------|
| `ResignationRequest` | EmployeeId, ResignationDate, LastWorkingDate, Reason, NoticePeriodDays, WaivedNoticeDays, Status, WorkflowInstanceId |
| `TerminationRecord` | EmployeeId, TerminationType (Resignation/Termination/EndOfContract/Retirement/Redundancy), TerminationDate, LastWorkingDate, Reason |
| `ClearanceChecklist` | TerminationRecordId, EmployeeId, OverallStatus (Pending/InProgress/Completed) |
| `ClearanceItem` | ClearanceChecklistId, Department (IT/Finance/Admin/HR), ItemName/ItemNameAr, IsCompleted, CompletedByUserId, CompletedAt, Notes |
| `EndOfServiceBenefit` | TerminationRecordId, EmployeeId, ServiceYears, ServiceMonths, BasicSalary, TotalAmount, DeductionAmount, NetAmount, CalculationDetails (JSON) |
| `FinalSettlement` | TerminationRecordId, EmployeeId, BasicSalaryDue, LeaveEncashment, EndOfServiceBenefit, LoanOutstanding, NetSettlement, Status (Draft/Calculated/Approved/Paid) |
| `ExitInterview` | TerminationRecordId, InterviewDate, InterviewerUserId, OverallRating, ReasonForLeaving, WouldRejoin, Feedback |
| `ExperienceLetter` | TerminationRecordId, EmployeeId, GeneratedDocumentUrl, TemplateId |

**WorkflowEntityType additions:** `Resignation = 10`, `FinalSettlement = 11`

**Key Application Services:**
- `IEndOfServiceCalculationService` - configurable per country labor law (e.g., Saudi: 0.5 month for first 5 years, 1 month after)
- `IFinalSettlementService` - aggregates salary due, leave encashment, EOS, deductions
- `ILetterGenerationService` - experience letter PDF from template

**API Endpoints (~15):**
- Resignation: `GET/POST /api/v1/resignation-requests`, approve, withdraw
- Termination: `POST /api/v1/terminations`
- Clearance: `GET/POST /api/v1/clearance-checklists/{terminationId}`, complete items
- EOS: `GET /api/v1/end-of-service-benefits/{terminationId}`
- Settlement: `GET/POST /api/v1/final-settlements/{terminationId}`, approve
- Exit interview: `GET/POST /api/v1/exit-interviews/{terminationId}`
- Experience letter: `POST /api/v1/experience-letters/{terminationId}/generate`

**Frontend (Self-Service):** `portal/resignation/` - submit resignation, track status.

---

### Phase 2: Talent Management

#### 2.1 Recruitment & Hiring
**Why:** Complete the hiring-to-retirement lifecycle. Currently employees are created manually; recruitment provides a pipeline.

**Detailed Plan:** [`modules/04-recruitment.md`](modules/04-recruitment.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Recruitment/`):

| Entity | Key Properties |
|--------|---------------|
| `JobRequisition` | BranchId, DepartmentId, JobTitle/JobTitleAr, Description, Requirements, VacancyCount, Priority, Status, BudgetedSalaryMin/Max, ClosingDate, WorkflowInstanceId |
| `JobPosting` | JobRequisitionId, Title/TitleAr, Description, RequiredSkills, ExperienceYears, EducationLevel, IsPublished, ExpiryDate, ApplicationCount |
| `Candidate` | FirstName, LastName (EN/AR), Email, Phone, ResumeUrl, Source (Website/Referral/Agency/LinkedIn), Notes |
| `JobApplication` | JobPostingId, CandidateId, Status (Applied/Screening/Interview/Assessment/OfferMade/Hired/Rejected/Withdrawn), AppliedDate |
| `InterviewSchedule` | JobApplicationId, InterviewType (Phone/Video/InPerson/Technical/HR/Panel), InterviewerEmployeeId, ScheduledDate, Duration, Status |
| `InterviewFeedback` | InterviewScheduleId, TechnicalScore, CommunicationScore, CulturalFitScore, OverallScore, Recommendation (StrongHire/Hire/Neutral/NoHire), Comments |
| `OfferLetter` | JobApplicationId, CandidateId, JobTitle, OfferedSalary, StartDate, ExpiryDate, Status (Draft/Sent/Accepted/Rejected/Expired), DocumentUrl |
| `HiringPipelineStage` | Name/NameAr, DisplayOrder, StageType |

**WorkflowEntityType additions:** `JobRequisition = 12`, `OfferLetter = 13`

**API Endpoints (~25):** Full CRUD for requisitions, postings, candidates, applications, interviews, feedback, offers. Pipeline analytics.

**Frontend (Admin):** `pages/recruitment/` with requisitions, postings, candidates, applications (kanban-style pipeline), interviews, offers sub-pages.

---

#### 2.2 Onboarding
**Why:** Bridge the gap between hiring and productive employment. Currently no structured onboarding exists.

**Detailed Plan:** [`modules/05-onboarding.md`](modules/05-onboarding.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Onboarding/`):

| Entity | Key Properties |
|--------|---------------|
| `OnboardingTemplate` | Name/NameAr, DepartmentId (optional), Description, IsActive |
| `OnboardingTemplateTask` | OnboardingTemplateId, TaskName/TaskNameAr, AssignedToDepartment (IT/HR/Admin/Finance/Manager), DueDaysAfterJoining, Priority, DisplayOrder |
| `OnboardingProcess` | EmployeeId, OnboardingTemplateId, StartDate, ExpectedCompletionDate, Status (NotStarted/InProgress/Completed/Overdue), BuddyEmployeeId |
| `OnboardingTask` | OnboardingProcessId, TaskName/TaskNameAr, AssignedToEmployeeId, Status (Pending/InProgress/Completed/Skipped), DueDate, CompletedDate, Notes |
| `OnboardingDocument` | OnboardingProcessId, DocumentType, DocumentName, IsRequired, IsCollected, DocumentUrl |

**API Endpoints (~12):** Template CRUD, process management, task completion, document tracking.

**Frontend (Admin):** `pages/onboarding/` with templates, active processes, dashboard.

---

#### 2.3 Performance Management
**Why:** Enable data-driven talent decisions. Feeds into promotions, salary revisions, and succession planning.

**Detailed Plan:** [`modules/06-performance.md`](modules/06-performance.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Performance/`):

| Entity | Key Properties |
|--------|---------------|
| `PerformanceReviewCycle` | BranchId, Name/NameAr, CycleType (Annual/Quarterly/SemiAnnual), StartDate, EndDate, Status, SelfAssessmentDeadline, ManagerAssessmentDeadline |
| `PerformanceReview` | CycleId, EmployeeId, ReviewerEmployeeId, Status, OverallRating, SelfRating, ManagerRating, FinalRating, Comments |
| `GoalDefinition` | PerformanceReviewId, EmployeeId, Title/TitleAr, GoalType (OKR/KPI), TargetValue, CurrentValue, Weight, DueDate, Status |
| `CompetencyFramework` | Name/NameAr, Description, IsActive |
| `Competency` | CompetencyFrameworkId, Name/NameAr, Category |
| `CompetencyAssessment` | PerformanceReviewId, CompetencyId, SelfRating, ManagerRating, FinalRating |
| `PerformanceImprovementPlan` | EmployeeId, ManagerEmployeeId, StartDate, EndDate, Reason, Status (Active/Completed/Extended/Terminated), Goals |
| `FeedbackRequest360` | PerformanceReviewId, RequestedFromEmployeeId, Status |
| `Feedback360Response` | FeedbackRequest360Id, Ratings (JSON), Comments, IsAnonymous |

**WorkflowEntityType additions:** `PerformanceReview = 14`, `PIP = 15`

**API Endpoints (~20):** Cycle management, review CRUD, goal tracking, competency assessments, 360 feedback, PIPs.

**Frontend (Admin):** `pages/performance/` with cycles, reviews, goals, competencies, PIPs.
**Frontend (Self-Service):** `portal/my-reviews/` - self-assessment, view goals, submit feedback.

---

### Phase 3: Employee Services

#### 3.1 Document Management
**Why:** Utility module referenced by many others (contracts, certifications, policies). Foundation for letter generation.

**Detailed Plan:** [`modules/07-documents.md`](modules/07-documents.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Documents/`):

| Entity | Key Properties |
|--------|---------------|
| `DocumentCategory` | Name/NameAr, Description, IsActive |
| `EmployeeDocument` | EmployeeId, DocumentCategoryId, DocumentName/DocumentNameAr, DocumentType (Contract/Certificate/ID/License), FileUrl, ExpiryDate, IssuedDate, IsVerified |
| `CompanyPolicy` | Title/TitleAr, CategoryId, DocumentUrl, Version, EffectiveDate, Status (Draft/Published/Archived), RequiresAcknowledgment |
| `PolicyAcknowledgment` | CompanyPolicyId, EmployeeId, AcknowledgedAt |
| `DocumentTemplate` | Name/NameAr, TemplateType, Content (HTML with placeholders), IsActive |

**Background Job:** `DocumentExpiryAlertJob` - daily check for documents expiring within 60/30/15/7 days.

---

#### 3.2 Employee Letters & Certificates
**Why:** High-demand self-service feature. Employees frequently need salary certificates, employment letters, NOCs.

**Detailed Plan:** [`modules/08-letters.md`](modules/08-letters.md) *(to be created before implementation)*

**New Domain Entities** (extend `Domain/Documents/`):

| Entity | Key Properties |
|--------|---------------|
| `LetterRequest` | EmployeeId, LetterType (SalaryCertificate/EmploymentLetter/ExperienceLetter/NOC/Custom), Purpose, Status (Pending/Approved/Generated/Rejected), WorkflowInstanceId, GeneratedDocumentUrl |
| `LetterTemplate` | LetterType, Name/NameAr, Content (HTML with `{{employee.fullName}}` placeholders), HeaderLogoUrl, IsDefault, BranchId |

**WorkflowEntityType addition:** `LetterRequest = 16`

**Frontend (Self-Service):** `portal/my-letters/` - request letters, download generated PDFs.
**Mobile (Flutter):** `features/letters/` - request and download letters.

---

#### 3.3 Expense Management
**Why:** Common employee service. Integrates with payroll for reimbursement.

**Detailed Plan:** [`modules/09-expenses.md`](modules/09-expenses.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Expenses/`):

| Entity | Key Properties |
|--------|---------------|
| `ExpenseCategory` | Name/NameAr, MaxAmount, RequiresReceipt, IsActive |
| `ExpensePolicy` | BranchId, Name/NameAr, MaxClaimPerMonth, MaxClaimPerYear, IsActive |
| `ExpenseClaim` | EmployeeId, ClaimNumber, ExpensePolicyId, TotalAmount, Status (Draft/Submitted/Approved/Rejected/Reimbursed), WorkflowInstanceId |
| `ExpenseClaimItem` | ExpenseClaimId, ExpenseCategoryId, Description, Amount, ReceiptUrl, ExpenseDate |
| `ExpenseReimbursement` | ExpenseClaimId, PayrollRecordId (nullable), Amount, ReimbursementDate, Method |

**WorkflowEntityType addition:** `ExpenseClaim = 17`

**Frontend (Self-Service):** `portal/my-expenses/` - submit claims with receipt upload, track reimbursement.
**Mobile (Flutter):** `features/expenses/` - submit expenses with camera receipt capture.

---

#### 3.4 Loans & Salary Advances
**Why:** Common HR service, especially in Middle East. Integrates with payroll for automatic deductions.

**Detailed Plan:** [`modules/10-loans.md`](modules/10-loans.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Loans/`):

| Entity | Key Properties |
|--------|---------------|
| `LoanType` | Name/NameAr, MaxAmount, MaxRepaymentMonths, InterestRate, IsActive |
| `LoanPolicy` | BranchId, LoanTypeId, MaxConcurrentLoans, MinServiceMonths, MaxPercentageOfSalary |
| `LoanApplication` | EmployeeId, LoanTypeId, RequestedAmount, ApprovedAmount, RepaymentMonths, MonthlyInstallment, Purpose, Status, StartDate, WorkflowInstanceId |
| `LoanRepayment` | LoanApplicationId, PayrollRecordId (nullable), InstallmentNumber, Amount, PaidDate, BalanceRemaining |
| `SalaryAdvance` | EmployeeId, Amount, RequestDate, DeductionMonth, Reason, Status, WorkflowInstanceId |

**WorkflowEntityType additions:** `LoanApplication = 18`, `SalaryAdvance = 19`

**Integration:** Payroll processing must query active LoanRepayment and SalaryAdvance records for automatic deductions.

---

### Phase 4: Organizational Development

#### 4.1 Training & Development
**Why:** Build workforce capabilities. Feeds into performance reviews and succession planning.

**Detailed Plan:** [`modules/11-training.md`](modules/11-training.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Training/`):

| Entity | Key Properties |
|--------|---------------|
| `TrainingCourse` | Name/NameAr, Description, Category, Provider, Duration, Cost, MaxParticipants, IsExternal, IsActive |
| `TrainingProgram` | Name/NameAr, Description, StartDate, EndDate, BudgetAllocated, Status |
| `TrainingEnrollment` | TrainingCourseId, EmployeeId, Status (Requested/Enrolled/InProgress/Completed/Cancelled), CompletionDate, Score, CertificateUrl |
| `TrainingBudget` | BranchId, DepartmentId, Year, AllocatedBudget, SpentBudget |
| `Certification` | EmployeeId, CertificationName/CertificationNameAr, IssuedBy, IssueDate, ExpiryDate, CertificateUrl, Status |
| `TrainingEvaluation` | TrainingEnrollmentId, ContentRating, InstructorRating, OverallRating, Comments |

**Background Job:** `CertificationExpiryAlertJob` - daily check for expiring certifications.

---

#### 4.2 Employee Relations
**Why:** HR compliance requirement. Proper tracking of grievances and disciplinary actions.

**Detailed Plan:** [`modules/12-employee-relations.md`](modules/12-employee-relations.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/EmployeeRelations/`):

| Entity | Key Properties |
|--------|---------------|
| `Grievance` | EmployeeId, GrievanceType (Workplace/Harassment/Discrimination/Safety), Subject, Description, Status (Filed/UnderInvestigation/Resolved/Escalated/Closed), Priority, AssignedToUserId, IsConfidential |
| `DisciplinaryAction` | EmployeeId, ActionType (VerbalWarning/WrittenWarning/FinalWarning/Suspension/Termination), Reason, IssuedDate, IssuedByEmployeeId, EffectiveDate, EndDate |
| `Investigation` | GrievanceId/DisciplinaryActionId, InvestigatorUserId, StartDate, Findings, Recommendation, Status |
| `CounselingRecord` | EmployeeId, CounselorUserId, SessionDate, Notes, FollowUpDate, IsConfidential |

---

#### 4.3 Company Announcements
**Why:** Extend beyond basic NotificationBroadcast. Structured communications with acknowledgment tracking.

**Detailed Plan:** [`modules/13-announcements.md`](modules/13-announcements.md) *(to be created before implementation)*

**New Domain Entities** (extend `Domain/Notifications/`):

| Entity | Key Properties |
|--------|---------------|
| `Announcement` | Title/TitleAr, Content/ContentAr, Category (CompanyWide/Branch/Department), BranchId, DepartmentId, Priority, PublishDate, ExpiryDate, Status (Draft/Scheduled/Published/Archived), IsPinned, RequiresAcknowledgment |
| `AnnouncementAttachment` | AnnouncementId, FileName, FileUrl, FileSize |
| `AnnouncementAcknowledgment` | AnnouncementId, EmployeeId, AcknowledgedAt |

**Frontend (Self-Service):** Announcement feed on dashboard.
**Mobile (Flutter):** Announcements in notifications/home screen.

---

### Phase 5: Strategic HR

#### 5.1 Asset Management
**Why:** Track company assets assigned to employees. Links to exit management clearance.

**Detailed Plan:** [`modules/14-assets.md`](modules/14-assets.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/Assets/`):

| Entity | Key Properties |
|--------|---------------|
| `AssetCategory` | Name/NameAr, Description, IsActive |
| `Asset` | AssetCategoryId, BranchId, AssetTag, Name/NameAr, SerialNumber, PurchaseDate, PurchaseCost, Vendor, WarrantyExpiryDate, Status (Available/Assigned/InRepair/Disposed/Lost) |
| `AssetAssignment` | AssetId, EmployeeId, AssignedDate, ReturnDate, ExpectedReturnDate, Status (Active/Returned/Overdue) |
| `AssetMaintenanceRecord` | AssetId, MaintenanceType (Repair/Upgrade/Replacement), Description, Cost, StartDate, CompletionDate |

**Integration:** Exit management clearance auto-populates with assigned assets.

---

#### 5.2 Succession Planning & Career Development
**Why:** Strategic talent management. Depends on performance + training data.

**Detailed Plan:** [`modules/15-succession-planning.md`](modules/15-succession-planning.md) *(to be created before implementation)*

**New Domain Entities** (`Domain/SuccessionPlanning/`):

| Entity | Key Properties |
|--------|---------------|
| `JobFamily` | Name/NameAr, Description |
| `CareerPath` | JobFamilyId, Name/NameAr, Levels (JSON) |
| `SkillDefinition` | Name/NameAr, Category |
| `EmployeeSkill` | EmployeeId, SkillDefinitionId, ProficiencyLevel (1-5), AssessedDate |
| `SuccessionPlan` | PositionTitle, CurrentHolderEmployeeId, Status |
| `SuccessionCandidate` | SuccessionPlanId, CandidateEmployeeId, Readiness (Ready/1Year/2Years/NotReady), DevelopmentNeeds |
| `IndividualDevelopmentPlan` | EmployeeId, Year, Status, Goals, ReviewDate |
| `IDPAction` | IDPId, ActionType (Training/Mentoring/Assignment/Certification), Description, TargetDate, CompletedDate |

---

#### 5.3 Analytics & HR Dashboard Enhancements
**Why:** Aggregates data from all modules into actionable insights. Should be built last.

**Detailed Plan:** [`modules/16-analytics.md`](modules/16-analytics.md) *(to be created before implementation)*

**No new entities** - aggregation services only.

**New Application Services:**
- `IHRAnalyticsService`:
  - `GetHeadcountAnalytics()` - growth, attrition, turnover rate
  - `GetWorkforceDemographics()` - age, gender, tenure distribution
  - `GetCostPerEmployeeAnalytics()` - total compensation cost / headcount
  - `GetAttritionRiskScore()` - based on tenure, performance, salary positioning
  - `GetComplianceDashboard()` - expiring contracts, documents, certifications
  - `GetHRKPIScorecard()` - time-to-hire, offer acceptance rate, training hours/employee

**API Endpoints:** `GET /api/v1/analytics/{metric-type}` (6 endpoints)

**Frontend (Admin):** Enhanced dashboard with chart widgets (Chart.js/ng2-charts).

---

### Enhancements to Existing Modules

**Detailed Plan:** [`modules/17-enhancements.md`](modules/17-enhancements.md) *(to be created before implementation)*

#### Attendance Enhancements
- **Shift Swap Requests:** New entity `ShiftSwapRequest` (EmployeeId, SwapWithEmployeeId, OriginalDate, SwapDate, Status, WorkflowInstanceId). WorkflowEntityType: `ShiftSwap = 20`
- **On-Call Scheduling:** New entity `OnCallSchedule` (EmployeeId, StartDate, EndDate, OnCallType)

#### Leave Enhancements
- **Half-Day Leave:** Add `IsHalfDay`, `HalfDayType (Morning/Afternoon)` to `EmployeeVacation`. Add `AllowHalfDay` to `VacationType`
- **Compensatory Off:** New entity `CompensatoryOff` (EmployeeId, EarnedDate, ExpiryDate, Reason, Status, UsedVacationId)
- **Leave Encashment:** New entity `LeaveEncashment` (EmployeeId, VacationTypeId, DaysEncashed, AmountPerDay, TotalAmount, Year, PayrollRecordId). Add `AllowEncashment`, `EncashmentMaxDays` to `VacationType`

#### Reporting Enhancements
- **Custom Report Builder:** New entities `CustomReportDefinition` (Name, DataSource, Columns/Filters as JSON) and `ScheduledReport` (CronExpression, EmailRecipients, Format)
- **Payroll Reports:** Salary register, department-wise cost, year-to-date earnings
- **HR Compliance Reports:** Contract expiry, document expiry, certification expiry

---

## Implementation Order (Dependencies)

```
1.  Employee Lifecycle (1.1) ─── foundation for all
2.  Exit/Offboarding (1.3) ──── depends on 1.1 (status transitions)
3.  Payroll (1.2) ───────────── depends on 1.1 (salary data)
4.  Document Management (3.1) ─ utility module for many others
5.  Letters/Certificates (3.2)─ depends on 3.1 (templates)
6.  Loans/Advances (3.4) ───── integrates with payroll deductions
7.  Expense Management (3.3) ── integrates with payroll reimbursement
8.  Recruitment (2.1) ──────── independent, creates employee pipeline
9.  Onboarding (2.2) ───────── depends on 2.1 (hired candidates)
10. Performance (2.3) ──────── independent
11. Training (4.1) ─────────── independent
12. Employee Relations (4.2) ── independent
13. Announcements (4.3) ────── independent
14. Asset Management (5.1) ─── links to exit clearance (1.3)
15. Succession Planning (5.2) ─ depends on performance + training
16. Analytics Dashboard (5.3) ─ last, aggregates all modules
17. Attendance Enhancements ─── parallel, anytime
18. Leave Enhancements ──────── parallel, anytime
19. Reporting Enhancements ──── after analytics
```

---

## Per-Module Implementation Checklist

Every new module must include:

**Backend:**
- [ ] Domain entities in `src/Domain/TecAxle.Hrms.Domain/{Module}/`
- [ ] Enums in domain
- [ ] `DbSet<T>` in `IApplicationDbContext.cs` and `TecAxleDbContext.cs`
- [ ] EF Core configurations in `Infrastructure/Persistence/PostgreSql/Configurations/`
- [ ] CQRS Commands + Handlers + Validators in `Application/{Module}/Commands/`
- [ ] CQRS Queries + Handlers + DTOs in `Application/{Module}/Queries/`
- [ ] API Controller(s) in `Api/Controllers/`
- [ ] Permission resources in `PermissionResources.cs`
- [ ] Authorization policies in `Infrastructure/DependencyInjection.cs`
- [ ] Service registration in `Application/DependencyInjection.cs`
- [ ] WorkflowEntityType extension (if workflow-enabled)
- [ ] Background jobs (if needed)
- [ ] EF Migration (one consolidated per phase)
- [ ] Audit logging for all CRUD operations

**Admin Frontend:**
- [ ] TypeScript models in `shared/models/`
- [ ] Service in `core/services/`
- [ ] Page components (list, create, edit, view) in `pages/{module}/`
- [ ] Routes in `app.routes.ts` with permission guards
- [ ] Menu entries in sidebar
- [ ] i18n keys in `en.json` and `ar.json`
- [ ] Shared components (DataTable, FormSection, StatusBadge, etc.)
- [ ] Modern form design (`.app-modern-form`)
- [ ] Modern view design (`.app-modern-view`)

**Self-Service Frontend (where applicable):**
- [ ] Portal components in `pages/portal/{module}/`
- [ ] Routes, menu entries, i18n keys

**Mobile Flutter (where applicable):**
- [ ] Feature folder in `lib/features/{module}/`
- [ ] Models, providers, screens
- [ ] l10n strings

---

## Critical Files Modified Per Module

These files are the integration backbone - every module touches them:

| File | Purpose |
|------|---------|
| `src/Domain/TecAxle.Hrms.Domain/Common/PermissionResources.cs` | New permission resources |
| `src/Domain/TecAxle.Hrms.Domain/Workflows/Enums/WorkflowEntityType.cs` | New workflow entity types |
| `src/Application/TecAxle.Hrms.Application/Abstractions/IApplicationDbContext.cs` | New DbSet properties |
| `src/Infrastructure/TecAxle.Hrms.Infrastructure/Persistence/Common/TecAxleDbContext.cs` | New DbSet properties |
| `src/Infrastructure/TecAxle.Hrms.Infrastructure/DependencyInjection.cs` | Auth policies, service registration |
| `src/Application/TecAxle.Hrms.Application/DependencyInjection.cs` | Service registration |
| `time-attendance-frontend/src/app/app.routes.ts` | Admin routes |
| `time-attendance-frontend/src/app/core/i18n/translations/en.json` | English translations |
| `time-attendance-frontend/src/app/core/i18n/translations/ar.json` | Arabic translations |
| `time-attendance-selfservice-frontend/src/app/app.routes.ts` | Self-service routes |

---

## Estimated Scope

| Phase | Modules | New Entities | New Endpoints | New Frontend Pages |
|-------|---------|-------------|---------------|-------------------|
| Phase 1: Core HR | 3 | ~25 | ~55 | ~30 |
| Phase 2: Talent | 3 | ~20 | ~57 | ~25 |
| Phase 3: Employee Services | 4 | ~18 | ~40 | ~20 |
| Phase 4: Org Development | 3 | ~15 | ~30 | ~15 |
| Phase 5: Strategic HR | 3 | ~15 | ~25 | ~15 |
| Enhancements | 3 | ~8 | ~15 | ~10 |
| **Total** | **19 modules** | **~101 entities** | **~222 endpoints** | **~115 pages** |

---

## Database Migration Strategy

One consolidated migration per phase to keep migration chain manageable:
1. `AddEmployeeLifecyclePayrollOffboarding` (Phase 1)
2. `AddRecruitmentOnboardingPerformance` (Phase 2)
3. `AddDocumentsExpensesLoans` (Phase 3)
4. `AddTrainingRelationsAnnouncements` (Phase 4)
5. `AddAssetsSuccessionAnalytics` (Phase 5)
6. `AddAttendanceLeaveReportingEnhancements` (Enhancements)

Always preserve existing data. Use `migrationBuilder.Sql()` for data migrations if needed.

---

## Detailed Module Plans

Before implementing any module, a detailed plan must be created in `docs/hrms-expansion/modules/` and approved. Each detailed plan must include:

1. **Complete entity definitions** - all properties with data types, constraints, relationships, indexes
2. **Full API endpoint specifications** - HTTP method, route, request/response DTOs, authorization policies, validation rules
3. **Database schema** - table definitions, foreign keys, indexes, seed data
4. **Frontend component tree** - every component with its inputs/outputs, routes, guards
5. **i18n key list** - all translation keys for EN and AR
6. **Business rules** - validation logic, calculation formulas, workflow integration
7. **Step-by-step implementation order** - what to build first within the module
8. **Test scenarios** - critical test cases to verify after implementation

---

## Verification Plan

For each module after implementation:
1. **Build verification:** `dotnet build` (backend), `ng build` (both frontends)
2. **Migration test:** Apply migration, verify existing data preserved
3. **API testing:** Swagger UI at http://localhost:5099/swagger - test all new endpoints
4. **Admin UI testing:** http://localhost:4200 - test CRUD pages, permissions, filters
5. **Self-Service testing:** http://localhost:4201 - test employee-facing features
6. **Mobile testing:** Flutter app on device/emulator
7. **Workflow testing:** Create workflow definitions for new entity types, test approval chains
8. **i18n testing:** Switch between EN/AR, verify all text translated, RTL layout correct
9. **Audit testing:** Verify audit logs created for all CRUD operations
10. **Permission testing:** Verify unauthorized users cannot access new features

---

**Created:** 2026-03-26
**Status:** Master plan approved - detailed module plans pending
