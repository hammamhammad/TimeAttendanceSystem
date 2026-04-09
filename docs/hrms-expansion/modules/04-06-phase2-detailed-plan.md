# Phase 2 Implementation Plan: Recruitment, Onboarding, and Performance Management

## Architecture Summary from Codebase Exploration

The system follows Clean Architecture with MediatR CQRS. Key patterns discovered:

- **Domain Layer**: Entities in `src/Domain/TecAxle.Hrms.Domain/{Module}/` inheriting `BaseEntity` (Id, CreatedAtUtc, CreatedBy, ModifiedAtUtc, ModifiedBy, IsDeleted, RowVersion)
- **Application Layer**: Feature folders at `src/Application/TecAxle.Hrms.Application/{Feature}/Commands/{Action}/` and `Queries/{Action}/` with `ICommand<Result<T>>` records and `BaseHandler<TRequest, TResponse>` handler classes
- **API Layer**: Controllers at `src/Api/TecAxle.Hrms.Api/Controllers/` using MediatR injection, `[ApiController]`, `[Route("api/v1/{resource}")]`, `[Authorize]`
- **Infrastructure**: EF configurations at `src/Infrastructure/TecAxle.Hrms.Infrastructure/Persistence/PostgreSql/Configurations/`, background jobs via Coravel `IInvocable` at `BackgroundJobs/`
- **Workflow Integration**: Entities carry `long? WorkflowInstanceId` and `long? SubmittedByUserId`; enum `WorkflowEntityType` provides routing
- **Notification**: Uses `IInAppNotificationService.SendNotificationAsync(CreateNotificationRequest)` with bilingual TitleEn/TitleAr/MessageEn/MessageAr
- **Permissions**: `PermissionResources` static class with const strings; `ResourceDescriptions` and `ResourceIcons` dictionaries
- **Branch scoping**: Handlers check `CurrentUser.IsSystemAdmin` and `CurrentUser.BranchIds.Contains(entity.BranchId)`
- **Bilingual**: All user-facing string fields have EN + AR variants (e.g., `Name`/`NameAr`, `JobTitle`/`JobTitleAr`)
- **Soft delete + query filter**: Every entity configuration includes `builder.HasQueryFilter(x => !x.IsDeleted)`

---

## 1. NEW ENUMS (in `src/Domain/TecAxle.Hrms.Domain/Common/Enums.cs`)

```csharp
// ============================================================
// Phase 2: Recruitment & Hiring Enums
// ============================================================

public enum RequisitionStatus
{
    Draft = 1,
    PendingApproval = 2,
    Approved = 3,
    Rejected = 4,
    Open = 5,       // Published and accepting applications
    OnHold = 6,
    Filled = 7,
    Cancelled = 8
}

public enum RequisitionPriority
{
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4
}

public enum EmploymentType
{
    FullTime = 1,
    PartTime = 2,
    Contract = 3,
    Internship = 4,
    Temporary = 5
}

public enum JobPostingStatus
{
    Draft = 1,
    Published = 2,
    Closed = 3,
    Cancelled = 4
}

public enum ApplicationStatus
{
    New = 1,
    Screening = 2,
    ShortListed = 3,
    InterviewScheduled = 4,
    Interviewing = 5,
    OfferPending = 6,
    OfferExtended = 7,
    OfferAccepted = 8,
    OfferDeclined = 9,
    Hired = 10,
    Rejected = 11,
    Withdrawn = 12
}

public enum ApplicationSource
{
    Website = 1,
    LinkedIn = 2,
    Referral = 3,
    Agency = 4,
    JobBoard = 5,
    WalkIn = 6,
    Internal = 7,
    Other = 10
}

public enum InterviewType
{
    Phone = 1,
    Video = 2,
    InPerson = 3,
    Technical = 4,
    Panel = 5,
    HR = 6
}

public enum InterviewResult
{
    Pending = 1,
    Passed = 2,
    Failed = 3,
    NoShow = 4,
    Rescheduled = 5
}

public enum OfferStatus
{
    Draft = 1,
    PendingApproval = 2,
    Approved = 3,
    Sent = 4,
    Accepted = 5,
    Declined = 6,
    Expired = 7,
    Withdrawn = 8
}

// ============================================================
// Phase 2: Onboarding Enums
// ============================================================

public enum OnboardingStatus
{
    NotStarted = 1,
    InProgress = 2,
    Completed = 3,
    Cancelled = 4,
    OnHold = 5
}

public enum OnboardingTaskStatus
{
    Pending = 1,
    InProgress = 2,
    Completed = 3,
    Skipped = 4,
    Overdue = 5
}

public enum OnboardingTaskCategory
{
    IT = 1,
    HR = 2,
    Admin = 3,
    Training = 4,
    DocumentCollection = 5,
    Orientation = 6,
    Equipment = 7,
    Access = 8,
    Other = 10
}

public enum DocumentStatus
{
    Pending = 1,
    Submitted = 2,
    Verified = 3,
    Rejected = 4,
    Expired = 5
}

// ============================================================
// Phase 2: Performance Management Enums
// ============================================================

public enum ReviewCycleStatus
{
    Planning = 1,
    Active = 2,
    InReview = 3,
    Calibration = 4,
    Completed = 5,
    Cancelled = 6
}

public enum ReviewCycleType
{
    Annual = 1,
    SemiAnnual = 2,
    Quarterly = 3,
    Probation = 4,
    AdHoc = 5
}

public enum ReviewStatus
{
    Draft = 1,
    SelfAssessmentPending = 2,
    SelfAssessmentCompleted = 3,
    ManagerReviewPending = 4,
    ManagerReviewCompleted = 5,
    PendingApproval = 6,
    Approved = 7,
    Acknowledged = 8,
    Disputed = 9
}

public enum PerformanceRating
{
    Exceptional = 5,
    ExceedsExpectations = 4,
    MeetsExpectations = 3,
    NeedsImprovement = 2,
    Unsatisfactory = 1
}

public enum GoalStatus
{
    Draft = 1,
    Active = 2,
    InProgress = 3,
    Completed = 4,
    Cancelled = 5,
    Deferred = 6
}

public enum GoalPriority
{
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4
}

public enum PipStatus
{
    Draft = 1,
    Active = 2,
    Extended = 3,
    CompletedSuccessful = 4,
    CompletedUnsuccessful = 5,
    Cancelled = 6
}

public enum FeedbackStatus
{
    Requested = 1,
    Submitted = 2,
    Expired = 3,
    Declined = 4
}
```

---

## 2. NEW WORKFLOW ENTITY TYPES (append to `WorkflowEntityType` enum)

```csharp
// Phase 2: Recruitment
JobRequisition = 30,

// Phase 2: Performance
PerformanceReview = 31,
PerformanceImprovementPlan = 32
```

---

## 3. NEW PERMISSION RESOURCES (append to `PermissionResources`)

```csharp
// Phase 2: Recruitment
public const string JobRequisition = "jobRequisition";
public const string JobPosting = "jobPosting";
public const string Candidate = "candidate";
public const string JobApplication = "jobApplication";
public const string Interview = "interview";
public const string OfferLetter = "offerLetter";

// Phase 2: Onboarding
public const string OnboardingTemplate = "onboardingTemplate";
public const string Onboarding = "onboarding";

// Phase 2: Performance
public const string PerformanceReviewCycle = "performanceReviewCycle";
public const string PerformanceReview = "performanceReview";
public const string Goal = "goal";
public const string CompetencyFramework = "competencyFramework";
public const string Pip = "pip";
public const string Feedback360 = "feedback360";
```

---

## 4. DOMAIN ENTITIES -- Complete Property Definitions

### Module 2.1: Recruitment & Hiring

All entities go in `src/Domain/TecAxle.Hrms.Domain/Recruitment/`.

#### 4.1.1 JobRequisition

```csharp
namespace TecAxle.Hrms.Domain.Recruitment;

public class JobRequisition : BaseEntity
{
    public long BranchId { get; set; }
    public long DepartmentId { get; set; }
    public string RequisitionNumber { get; set; } = string.Empty;  // Auto-generated: REQ-YYYY-NNNN
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? JobGradeId { get; set; }
    public EmploymentType EmploymentType { get; set; }
    public int NumberOfPositions { get; set; } = 1;
    public int FilledPositions { get; set; }
    public RequisitionPriority Priority { get; set; } = RequisitionPriority.Medium;
    public decimal? BudgetedSalaryMin { get; set; }
    public decimal? BudgetedSalaryMax { get; set; }
    public string? Currency { get; set; } = "SAR";
    public string? RequiredSkills { get; set; }           // JSON array
    public string? RequiredQualifications { get; set; }    // freeform
    public string? RequiredQualificationsAr { get; set; }
    public int? RequiredExperienceYears { get; set; }
    public DateTime? TargetHireDate { get; set; }
    public string? Justification { get; set; }
    public string? JustificationAr { get; set; }
    public bool IsReplacement { get; set; }
    public long? ReplacingEmployeeId { get; set; }
    public RequisitionStatus Status { get; set; } = RequisitionStatus.Draft;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? RequestedByEmployeeId { get; set; }  // the manager who requested
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Branch Branch { get; set; } = null!;
    public Department Department { get; set; } = null!;
    public JobGrade? JobGrade { get; set; }
    public Employee? ReplacingEmployee { get; set; }
    public Employee? RequestedByEmployee { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
    public ICollection<JobPosting> Postings { get; set; } = new List<JobPosting>();
}
```

#### 4.1.2 JobPosting

```csharp
public class JobPosting : BaseEntity
{
    public long JobRequisitionId { get; set; }
    public string PostingTitle { get; set; } = string.Empty;
    public string? PostingTitleAr { get; set; }
    public string? ExternalDescription { get; set; }       // public-facing description (rich text)
    public string? ExternalDescriptionAr { get; set; }
    public string? Responsibilities { get; set; }
    public string? ResponsibilitiesAr { get; set; }
    public string? Benefits { get; set; }
    public string? BenefitsAr { get; set; }
    public string? Location { get; set; }
    public string? LocationAr { get; set; }
    public bool IsInternal { get; set; }                   // internal-only posting
    public bool IsExternal { get; set; } = true;           // external posting
    public string? ExternalUrl { get; set; }               // link to external job board
    public JobPostingStatus Status { get; set; } = JobPostingStatus.Draft;
    public DateTime? PublishedAt { get; set; }
    public DateTime? ClosingDate { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public JobRequisition JobRequisition { get; set; } = null!;
    public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();
}
```

#### 4.1.3 Candidate

```csharp
public class Candidate : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? FirstNameAr { get; set; }
    public string? LastNameAr { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? NationalId { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Gender? Gender { get; set; }
    public string? Nationality { get; set; }
    public string? NationalityAr { get; set; }
    public string? CurrentJobTitle { get; set; }
    public string? CurrentEmployer { get; set; }
    public int? ExperienceYears { get; set; }
    public string? HighestEducation { get; set; }
    public string? Skills { get; set; }                    // JSON array
    public string? ResumeUrl { get; set; }
    public string? PhotoUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public ApplicationSource Source { get; set; } = ApplicationSource.Website;
    public long? ReferredByEmployeeId { get; set; }
    public string? Address { get; set; }
    public string? Notes { get; set; }
    public bool IsBlacklisted { get; set; }
    public string? BlacklistReason { get; set; }

    // Potential link after hire
    public long? EmployeeId { get; set; }                  // set when candidate becomes employee

    // Navigation
    public Employee? ReferredByEmployee { get; set; }
    public Employee? Employee { get; set; }
    public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();
}
```

#### 4.1.4 JobApplication

```csharp
public class JobApplication : BaseEntity
{
    public long CandidateId { get; set; }
    public long JobPostingId { get; set; }
    public string ApplicationNumber { get; set; } = string.Empty;  // APP-YYYY-NNNN
    public ApplicationStatus Status { get; set; } = ApplicationStatus.New;
    public DateTime AppliedDate { get; set; }
    public string? CoverLetter { get; set; }
    public decimal? ExpectedSalary { get; set; }
    public DateTime? AvailableFrom { get; set; }
    public int? NoticePeriodDays { get; set; }
    public string? ScreeningNotes { get; set; }
    public int? ScreeningScore { get; set; }               // 0-100
    public long? ScreenedByUserId { get; set; }
    public DateTime? ScreenedAt { get; set; }
    public string? RejectionReason { get; set; }
    public string? RejectionReasonAr { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Candidate Candidate { get; set; } = null!;
    public JobPosting JobPosting { get; set; } = null!;
    public ICollection<InterviewSchedule> Interviews { get; set; } = new List<InterviewSchedule>();
    public OfferLetter? OfferLetter { get; set; }
}
```

#### 4.1.5 InterviewSchedule

```csharp
public class InterviewSchedule : BaseEntity
{
    public long JobApplicationId { get; set; }
    public int RoundNumber { get; set; } = 1;
    public InterviewType InterviewType { get; set; }
    public DateTime ScheduledStartTime { get; set; }
    public DateTime ScheduledEndTime { get; set; }
    public string? Location { get; set; }
    public string? LocationAr { get; set; }
    public string? MeetingLink { get; set; }              // for video interviews
    public long InterviewerEmployeeId { get; set; }
    public long? CoInterviewerEmployeeId { get; set; }
    public InterviewResult Result { get; set; } = InterviewResult.Pending;
    public string? CancellationReason { get; set; }
    public DateTime? ActualStartTime { get; set; }
    public DateTime? ActualEndTime { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public JobApplication JobApplication { get; set; } = null!;
    public Employee InterviewerEmployee { get; set; } = null!;
    public Employee? CoInterviewerEmployee { get; set; }
    public ICollection<InterviewFeedback> Feedbacks { get; set; } = new List<InterviewFeedback>();
}
```

#### 4.1.6 InterviewFeedback

```csharp
public class InterviewFeedback : BaseEntity
{
    public long InterviewScheduleId { get; set; }
    public long ReviewerEmployeeId { get; set; }
    public int TechnicalSkillsRating { get; set; }        // 1-5
    public int CommunicationRating { get; set; }           // 1-5
    public int CulturalFitRating { get; set; }             // 1-5
    public int OverallRating { get; set; }                 // 1-5
    public string? Strengths { get; set; }
    public string? Weaknesses { get; set; }
    public string? Comments { get; set; }
    public bool IsRecommended { get; set; }

    // Navigation
    public InterviewSchedule InterviewSchedule { get; set; } = null!;
    public Employee ReviewerEmployee { get; set; } = null!;
}
```

#### 4.1.7 OfferLetter

```csharp
public class OfferLetter : BaseEntity
{
    public long JobApplicationId { get; set; }
    public string OfferNumber { get; set; } = string.Empty;  // OFF-YYYY-NNNN
    public long BranchId { get; set; }
    public long DepartmentId { get; set; }
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public long? JobGradeId { get; set; }
    public decimal OfferedSalary { get; set; }
    public string? Currency { get; set; } = "SAR";
    public ContractType ContractType { get; set; }
    public int? ContractDurationMonths { get; set; }
    public int? ProbationPeriodDays { get; set; }
    public DateTime ProposedStartDate { get; set; }
    public string? AllowancesJson { get; set; }            // JSON: [{type, amount}]
    public string? BenefitsDescription { get; set; }
    public string? BenefitsDescriptionAr { get; set; }
    public string? TermsAndConditions { get; set; }
    public string? TermsAndConditionsAr { get; set; }
    public string? DocumentUrl { get; set; }               // generated PDF
    public OfferStatus Status { get; set; } = OfferStatus.Draft;
    public DateTime? SentAt { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public DateTime? RespondedAt { get; set; }
    public string? DeclineReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }

    // Result link: the employee created from this offer
    public long? CreatedEmployeeId { get; set; }

    // Navigation
    public JobApplication JobApplication { get; set; } = null!;
    public Branch Branch { get; set; } = null!;
    public Department Department { get; set; } = null!;
    public JobGrade? JobGrade { get; set; }
    public Employee? CreatedEmployee { get; set; }
}
```

### Module 2.2: Onboarding

All entities go in `src/Domain/TecAxle.Hrms.Domain/Onboarding/`.

#### 4.2.1 OnboardingTemplate

```csharp
namespace TecAxle.Hrms.Domain.Onboarding;

public class OnboardingTemplate : BaseEntity
{
    public long? BranchId { get; set; }                    // null = applies to all branches
    public long? DepartmentId { get; set; }                // null = applies to all departments
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public int EstimatedDurationDays { get; set; } = 30;
    public bool IsActive { get; set; } = true;
    public bool IsDefault { get; set; }                    // fallback template

    // Navigation
    public Branch? Branch { get; set; }
    public Department? Department { get; set; }
    public ICollection<OnboardingTemplateTask> Tasks { get; set; } = new List<OnboardingTemplateTask>();
}
```

#### 4.2.2 OnboardingTemplateTask

```csharp
public class OnboardingTemplateTask : BaseEntity
{
    public long OnboardingTemplateId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public OnboardingTaskCategory Category { get; set; }
    public int SortOrder { get; set; }
    public int DueDaysFromStart { get; set; }              // relative due date
    public bool IsMandatory { get; set; } = true;
    public string? AssignToRole { get; set; }              // "IT", "HR", "Manager" - who should do this
    public string? Instructions { get; set; }
    public string? InstructionsAr { get; set; }

    // Navigation
    public OnboardingTemplate Template { get; set; } = null!;
}
```

#### 4.2.3 OnboardingProcess

```csharp
public class OnboardingProcess : BaseEntity
{
    public long EmployeeId { get; set; }
    public long? OnboardingTemplateId { get; set; }
    public long BranchId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? ExpectedCompletionDate { get; set; }
    public DateTime? ActualCompletionDate { get; set; }
    public OnboardingStatus Status { get; set; } = OnboardingStatus.NotStarted;
    public int TotalTasks { get; set; }
    public int CompletedTasks { get; set; }
    public long? AssignedHrEmployeeId { get; set; }        // HR buddy
    public long? AssignedBuddyEmployeeId { get; set; }     // peer buddy
    public string? Notes { get; set; }

    // Link to recruitment (if applicable)
    public long? OfferLetterId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public OnboardingTemplate? Template { get; set; }
    public Branch Branch { get; set; } = null!;
    public Employee? AssignedHrEmployee { get; set; }
    public Employee? AssignedBuddyEmployee { get; set; }
    public OfferLetter? OfferLetter { get; set; }
    public ICollection<OnboardingTask> Tasks { get; set; } = new List<OnboardingTask>();
    public ICollection<OnboardingDocument> Documents { get; set; } = new List<OnboardingDocument>();
}
```

#### 4.2.4 OnboardingTask

```csharp
public class OnboardingTask : BaseEntity
{
    public long OnboardingProcessId { get; set; }
    public long? TemplateTaskId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public OnboardingTaskCategory Category { get; set; }
    public int SortOrder { get; set; }
    public DateTime? DueDate { get; set; }
    public bool IsMandatory { get; set; } = true;
    public OnboardingTaskStatus Status { get; set; } = OnboardingTaskStatus.Pending;
    public long? AssignedToEmployeeId { get; set; }
    public DateTime? CompletedAt { get; set; }
    public long? CompletedByUserId { get; set; }
    public string? CompletionNotes { get; set; }

    // Navigation
    public OnboardingProcess Process { get; set; } = null!;
    public OnboardingTemplateTask? TemplateTask { get; set; }
    public Employee? AssignedToEmployee { get; set; }
}
```

#### 4.2.5 OnboardingDocument

```csharp
public class OnboardingDocument : BaseEntity
{
    public long OnboardingProcessId { get; set; }
    public string DocumentName { get; set; } = string.Empty;
    public string? DocumentNameAr { get; set; }
    public string? DocumentType { get; set; }              // "NationalId", "Passport", "Degree", "BankLetter"
    public DocumentStatus Status { get; set; } = DocumentStatus.Pending;
    public string? FileUrl { get; set; }
    public DateTime? SubmittedAt { get; set; }
    public DateTime? VerifiedAt { get; set; }
    public long? VerifiedByUserId { get; set; }
    public string? RejectionReason { get; set; }
    public string? Notes { get; set; }
    public bool IsMandatory { get; set; } = true;
    public DateTime? ExpiryDate { get; set; }

    // Navigation
    public OnboardingProcess Process { get; set; } = null!;
}
```

### Module 2.3: Performance Management

All entities go in `src/Domain/TecAxle.Hrms.Domain/Performance/`.

#### 4.3.1 PerformanceReviewCycle

```csharp
namespace TecAxle.Hrms.Domain.Performance;

public class PerformanceReviewCycle : BaseEntity
{
    public long? BranchId { get; set; }                    // null = all branches
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public ReviewCycleType CycleType { get; set; }
    public int Year { get; set; }
    public DateTime PeriodStartDate { get; set; }
    public DateTime PeriodEndDate { get; set; }
    public DateTime? SelfAssessmentStartDate { get; set; }
    public DateTime? SelfAssessmentEndDate { get; set; }
    public DateTime? ManagerReviewStartDate { get; set; }
    public DateTime? ManagerReviewEndDate { get; set; }
    public DateTime? CalibrationDeadline { get; set; }
    public ReviewCycleStatus Status { get; set; } = ReviewCycleStatus.Planning;
    public long? CompetencyFrameworkId { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
    public CompetencyFramework? CompetencyFramework { get; set; }
    public ICollection<PerformanceReview> Reviews { get; set; } = new List<PerformanceReview>();
}
```

#### 4.3.2 PerformanceReview

```csharp
public class PerformanceReview : BaseEntity
{
    public long PerformanceReviewCycleId { get; set; }
    public long EmployeeId { get; set; }
    public long ReviewerEmployeeId { get; set; }           // manager
    public ReviewStatus Status { get; set; } = ReviewStatus.Draft;

    // Self-assessment
    public string? SelfAssessmentComments { get; set; }
    public PerformanceRating? SelfRating { get; set; }
    public DateTime? SelfAssessmentSubmittedAt { get; set; }

    // Manager review
    public string? ManagerComments { get; set; }
    public PerformanceRating? ManagerRating { get; set; }
    public PerformanceRating? FinalRating { get; set; }    // post-calibration
    public DateTime? ManagerReviewSubmittedAt { get; set; }

    // Outcomes
    public bool? RecommendPromotion { get; set; }
    public bool? RecommendSalaryAdjustment { get; set; }
    public decimal? RecommendedSalaryChange { get; set; }
    public bool? RecommendPip { get; set; }
    public string? DevelopmentPlan { get; set; }
    public string? DevelopmentPlanAr { get; set; }

    // Employee acknowledgment
    public DateTime? AcknowledgedAt { get; set; }
    public string? EmployeeDisputeComments { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public PerformanceReviewCycle ReviewCycle { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public Employee ReviewerEmployee { get; set; } = null!;
    public WorkflowInstance? WorkflowInstance { get; set; }
    public ICollection<CompetencyAssessment> CompetencyAssessments { get; set; } = new List<CompetencyAssessment>();
    public ICollection<GoalDefinition> Goals { get; set; } = new List<GoalDefinition>();
}
```

#### 4.3.3 GoalDefinition

```csharp
public class GoalDefinition : BaseEntity
{
    public long EmployeeId { get; set; }
    public long? PerformanceReviewId { get; set; }         // optional link to a review
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? MeasurementCriteria { get; set; }       // how we measure success
    public GoalPriority Priority { get; set; } = GoalPriority.Medium;
    public GoalStatus Status { get; set; } = GoalStatus.Draft;
    public DateTime? StartDate { get; set; }
    public DateTime? TargetDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public decimal WeightPercentage { get; set; }          // how much this counts (e.g., 25%)
    public decimal ProgressPercentage { get; set; }        // 0-100
    public PerformanceRating? AchievementRating { get; set; }
    public string? ManagerComments { get; set; }
    public string? EmployeeComments { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public PerformanceReview? PerformanceReview { get; set; }
}
```

#### 4.3.4 CompetencyFramework

```csharp
public class CompetencyFramework : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;
    public long? BranchId { get; set; }                    // null = org-wide

    // Navigation
    public Branch? Branch { get; set; }
    public ICollection<Competency> Competencies { get; set; } = new List<Competency>();
}
```

#### 4.3.5 Competency

```csharp
public class Competency : BaseEntity
{
    public long CompetencyFrameworkId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? Category { get; set; }                  // "Core", "Leadership", "Technical"
    public string? CategoryAr { get; set; }
    public decimal WeightPercentage { get; set; }
    public int SortOrder { get; set; }

    // Navigation
    public CompetencyFramework Framework { get; set; } = null!;
}
```

#### 4.3.6 CompetencyAssessment

```csharp
public class CompetencyAssessment : BaseEntity
{
    public long PerformanceReviewId { get; set; }
    public long CompetencyId { get; set; }
    public PerformanceRating? SelfRating { get; set; }
    public string? SelfComments { get; set; }
    public PerformanceRating? ManagerRating { get; set; }
    public string? ManagerComments { get; set; }
    public PerformanceRating? FinalRating { get; set; }

    // Navigation
    public PerformanceReview PerformanceReview { get; set; } = null!;
    public Competency Competency { get; set; } = null!;
}
```

#### 4.3.7 PerformanceImprovementPlan (PIP)

```csharp
public class PerformanceImprovementPlan : BaseEntity
{
    public long EmployeeId { get; set; }
    public long? PerformanceReviewId { get; set; }
    public long ManagerEmployeeId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? AreasOfImprovement { get; set; }
    public string? AreasOfImprovementAr { get; set; }
    public string? ExpectedOutcomes { get; set; }
    public string? ExpectedOutcomesAr { get; set; }
    public string? SupportProvided { get; set; }
    public string? SupportProvidedAr { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime? ExtendedEndDate { get; set; }
    public PipStatus Status { get; set; } = PipStatus.Draft;
    public string? OutcomeNotes { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public Employee ManagerEmployee { get; set; } = null!;
    public PerformanceReview? PerformanceReview { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
```

#### 4.3.8 FeedbackRequest360

```csharp
public class FeedbackRequest360 : BaseEntity
{
    public long PerformanceReviewId { get; set; }
    public long RequestedForEmployeeId { get; set; }       // who is being reviewed
    public long RequestedByEmployeeId { get; set; }        // usually the manager
    public DateTime? Deadline { get; set; }
    public string? Instructions { get; set; }
    public string? InstructionsAr { get; set; }
    public bool IsAnonymous { get; set; } = true;
    public string? Notes { get; set; }

    // Navigation
    public PerformanceReview PerformanceReview { get; set; } = null!;
    public Employee RequestedForEmployee { get; set; } = null!;
    public Employee RequestedByEmployee { get; set; } = null!;
    public ICollection<Feedback360Response> Responses { get; set; } = new List<Feedback360Response>();
}
```

#### 4.3.9 Feedback360Response

```csharp
public class Feedback360Response : BaseEntity
{
    public long FeedbackRequest360Id { get; set; }
    public long RespondentEmployeeId { get; set; }
    public string? Relationship { get; set; }              // "Peer", "DirectReport", "CrossFunctional"
    public PerformanceRating? OverallRating { get; set; }
    public string? Strengths { get; set; }
    public string? AreasForDevelopment { get; set; }
    public string? AdditionalComments { get; set; }
    public FeedbackStatus Status { get; set; } = FeedbackStatus.Requested;
    public DateTime? SubmittedAt { get; set; }

    // Navigation
    public FeedbackRequest360 FeedbackRequest { get; set; } = null!;
    public Employee RespondentEmployee { get; set; } = null!;
}
```

---

## 5. DATABASE CHANGES

### 5.1 IApplicationDbContext additions

Add to `src/Application/TecAxle.Hrms.Application/Abstractions/IApplicationDbContext.cs`:

```csharp
// Phase 2: Recruitment
DbSet<JobRequisition> JobRequisitions { get; }
DbSet<JobPosting> JobPostings { get; }
DbSet<Candidate> Candidates { get; }
DbSet<JobApplication> JobApplications { get; }
DbSet<InterviewSchedule> InterviewSchedules { get; }
DbSet<InterviewFeedback> InterviewFeedbacks { get; }
DbSet<OfferLetter> OfferLetters { get; }

// Phase 2: Onboarding
DbSet<OnboardingTemplate> OnboardingTemplates { get; }
DbSet<OnboardingTemplateTask> OnboardingTemplateTasks { get; }
DbSet<OnboardingProcess> OnboardingProcesses { get; }
DbSet<OnboardingTask> OnboardingTasks { get; }
DbSet<OnboardingDocument> OnboardingDocuments { get; }

// Phase 2: Performance
DbSet<PerformanceReviewCycle> PerformanceReviewCycles { get; }
DbSet<PerformanceReview> PerformanceReviews { get; }
DbSet<GoalDefinition> GoalDefinitions { get; }
DbSet<CompetencyFramework> CompetencyFrameworks { get; }
DbSet<Competency> Competencies { get; }
DbSet<CompetencyAssessment> CompetencyAssessments { get; }
DbSet<PerformanceImprovementPlan> PerformanceImprovementPlans { get; }
DbSet<FeedbackRequest360> FeedbackRequests360 { get; }
DbSet<Feedback360Response> Feedback360Responses { get; }
```

**Total new tables: 21** (7 Recruitment + 5 Onboarding + 9 Performance)

### 5.2 Employee Entity additions

Add to `Employee.cs`:

```csharp
// Phase 2: Recruitment source tracking
public long? SourceCandidateId { get; set; }  // links back to candidate record

// Phase 2 Navigation
public ICollection<OnboardingProcess> OnboardingProcesses { get; set; } = new List<OnboardingProcess>();
public ICollection<PerformanceReview> PerformanceReviewsAsEmployee { get; set; } = new List<PerformanceReview>();
public ICollection<PerformanceReview> PerformanceReviewsAsReviewer { get; set; } = new List<PerformanceReview>();
public ICollection<GoalDefinition> Goals { get; set; } = new List<GoalDefinition>();
public ICollection<PerformanceImprovementPlan> ImprovementPlans { get; set; } = new List<PerformanceImprovementPlan>();
```

### 5.3 Single Migration

Migration name: `AddRecruitmentOnboardingPerformance`

Command: `dotnet ef migrations add AddRecruitmentOnboardingPerformance --project src/Infrastructure/TecAxle.Hrms.Infrastructure --startup-project src/Api/TecAxle.Hrms.Api`

---

## 6. EF CONFIGURATIONS

Create one configuration file per entity in `src/Infrastructure/TecAxle.Hrms.Infrastructure/Persistence/PostgreSql/Configurations/`. Follow the exact pattern from `EmployeeAddressConfiguration.cs`:

- `builder.ToTable("TableName")`
- `builder.HasKey(x => x.Id)`
- `builder.Property(x => x.StringProp).HasMaxLength(N)`
- `builder.Property(x => x.EnumProp).HasConversion<int>()`
- Audit fields: CreatedBy `HasMaxLength(100).IsRequired()`, ModifiedBy `HasMaxLength(100)`, RowVersion `IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 })`
- Foreign keys with `.OnDelete(DeleteBehavior.Restrict)`
- Composite indexes on FK columns
- `builder.HasQueryFilter(x => !x.IsDeleted)`

Key index strategies:
- `JobRequisitions`: composite index on (BranchId, Status), index on DepartmentId
- `JobApplications`: composite index on (JobPostingId, Status), index on CandidateId
- `Candidates`: unique index on Email
- `InterviewSchedules`: index on (InterviewerEmployeeId, ScheduledStartTime)
- `OnboardingProcesses`: index on (EmployeeId, Status)
- `PerformanceReviews`: composite index on (PerformanceReviewCycleId, EmployeeId) unique, index on ReviewerEmployeeId
- `GoalDefinitions`: index on (EmployeeId, Status)

---

## 7. API ENDPOINTS

### 7.1 Recruitment Controllers

**JobRequisitionsController** -- `api/v1/job-requisitions`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List with filters (branchId, departmentId, status, page, pageSize) | `jobRequisition.read` |
| GET | `/{id}` | Get by ID with postings | `jobRequisition.read` |
| POST | `/` | Create requisition (status=Draft) | `jobRequisition.create` |
| PUT | `/{id}` | Update draft requisition | `jobRequisition.update` |
| POST | `/{id}/submit` | Submit for approval (triggers workflow) | `jobRequisition.create` |
| POST | `/{id}/approve` | Approve requisition | `jobRequisition.update` |
| POST | `/{id}/reject` | Reject with reason | `jobRequisition.update` |
| POST | `/{id}/cancel` | Cancel requisition | `jobRequisition.delete` |
| DELETE | `/{id}` | Soft delete (draft only) | `jobRequisition.delete` |

**JobPostingsController** -- `api/v1/job-postings`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List with filters | `jobPosting.read` |
| GET | `/{id}` | Get by ID | `jobPosting.read` |
| GET | `/public` | Public listing (no auth) for career page | Anonymous |
| GET | `/public/{id}` | Public posting details | Anonymous |
| POST | `/` | Create posting for requisition | `jobPosting.create` |
| PUT | `/{id}` | Update | `jobPosting.update` |
| POST | `/{id}/publish` | Publish posting | `jobPosting.update` |
| POST | `/{id}/close` | Close posting | `jobPosting.update` |
| DELETE | `/{id}` | Soft delete | `jobPosting.delete` |

**CandidatesController** -- `api/v1/candidates`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List with search/filters | `candidate.read` |
| GET | `/{id}` | Get with application history | `candidate.read` |
| POST | `/` | Create manually | `candidate.create` |
| POST | `/apply` | Public application (no auth) | Anonymous |
| PUT | `/{id}` | Update | `candidate.update` |
| POST | `/{id}/blacklist` | Blacklist candidate | `candidate.update` |
| DELETE | `/{id}` | Soft delete | `candidate.delete` |

**JobApplicationsController** -- `api/v1/job-applications`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List with filters (postingId, status, candidateId) | `jobApplication.read` |
| GET | `/{id}` | Get with interviews and offer | `jobApplication.read` |
| POST | `/` | Create application (internal) | `jobApplication.create` |
| PUT | `/{id}/status` | Update pipeline status | `jobApplication.update` |
| POST | `/{id}/screen` | Add screening notes/score | `jobApplication.update` |
| POST | `/{id}/reject` | Reject with reason | `jobApplication.update` |
| DELETE | `/{id}` | Soft delete | `jobApplication.delete` |

**InterviewsController** -- `api/v1/interviews`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List with filters (applicationId, interviewerId, date range) | `interview.read` |
| GET | `/{id}` | Get with feedback | `interview.read` |
| POST | `/` | Schedule interview | `interview.create` |
| PUT | `/{id}` | Reschedule | `interview.update` |
| POST | `/{id}/complete` | Mark result (Passed/Failed/NoShow) | `interview.update` |
| POST | `/{id}/feedback` | Add feedback | `interview.create` |
| DELETE | `/{id}` | Cancel interview | `interview.delete` |

**OfferLettersController** -- `api/v1/offer-letters`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List with filters | `offerLetter.read` |
| GET | `/{id}` | Get by ID | `offerLetter.read` |
| POST | `/` | Create offer | `offerLetter.create` |
| PUT | `/{id}` | Update draft | `offerLetter.update` |
| POST | `/{id}/approve` | Approve offer | `offerLetter.update` |
| POST | `/{id}/send` | Send to candidate | `offerLetter.update` |
| POST | `/{id}/accept` | Mark as accepted **[CRITICAL INTEGRATION HOOK]** | `offerLetter.update` |
| POST | `/{id}/decline` | Mark as declined | `offerLetter.update` |
| POST | `/{id}/withdraw` | Withdraw offer | `offerLetter.update` |

### 7.2 Onboarding Controllers

**OnboardingTemplatesController** -- `api/v1/onboarding-templates`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List templates (branchId, departmentId filters) | `onboardingTemplate.read` |
| GET | `/{id}` | Get with tasks | `onboardingTemplate.read` |
| POST | `/` | Create template with tasks | `onboardingTemplate.create` |
| PUT | `/{id}` | Update template | `onboardingTemplate.update` |
| POST | `/{id}/tasks` | Add task to template | `onboardingTemplate.update` |
| PUT | `/{id}/tasks/{taskId}` | Update template task | `onboardingTemplate.update` |
| DELETE | `/{id}/tasks/{taskId}` | Remove template task | `onboardingTemplate.update` |
| DELETE | `/{id}` | Soft delete template | `onboardingTemplate.delete` |

**OnboardingController** -- `api/v1/onboarding`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List processes (employeeId, status, branchId) | `onboarding.read` |
| GET | `/{id}` | Get process with tasks and documents | `onboarding.read` |
| POST | `/` | Start onboarding for employee | `onboarding.create` |
| POST | `/{id}/tasks/{taskId}/complete` | Complete task | `onboarding.update` |
| POST | `/{id}/tasks/{taskId}/skip` | Skip optional task | `onboarding.update` |
| POST | `/{id}/documents` | Upload document | `onboarding.update` |
| POST | `/{id}/documents/{docId}/verify` | Verify document | `onboarding.update` |
| POST | `/{id}/documents/{docId}/reject` | Reject document | `onboarding.update` |
| POST | `/{id}/complete` | Complete onboarding process | `onboarding.update` |
| POST | `/{id}/cancel` | Cancel onboarding | `onboarding.delete` |

### 7.3 Performance Controllers

**PerformanceReviewCyclesController** -- `api/v1/performance-cycles`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List cycles (year, branchId, status) | `performanceReviewCycle.read` |
| GET | `/{id}` | Get with summary stats | `performanceReviewCycle.read` |
| POST | `/` | Create cycle | `performanceReviewCycle.create` |
| PUT | `/{id}` | Update cycle | `performanceReviewCycle.update` |
| POST | `/{id}/activate` | Activate (generates reviews) | `performanceReviewCycle.update` |
| POST | `/{id}/complete` | Complete cycle | `performanceReviewCycle.update` |
| DELETE | `/{id}` | Delete planning cycle | `performanceReviewCycle.delete` |

**PerformanceReviewsController** -- `api/v1/performance-reviews`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List reviews (cycleId, employeeId, status, reviewerEmployeeId) | `performanceReview.read` |
| GET | `/{id}` | Get with competency assessments and goals | `performanceReview.read` |
| POST | `/{id}/self-assessment` | Submit self-assessment | `performanceReview.update` |
| POST | `/{id}/manager-review` | Submit manager review | `performanceReview.update` |
| POST | `/{id}/approve` | Final approval (triggers workflow) | `performanceReview.update` |
| POST | `/{id}/acknowledge` | Employee acknowledgment | `performanceReview.update` |
| POST | `/{id}/dispute` | Employee disputes review | `performanceReview.update` |
| POST | `/{id}/competency-assessments` | Save competency ratings | `performanceReview.update` |

**GoalsController** -- `api/v1/goals`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List goals (employeeId, status, reviewId) | `goal.read` |
| GET | `/{id}` | Get goal | `goal.read` |
| POST | `/` | Create goal | `goal.create` |
| PUT | `/{id}` | Update goal | `goal.update` |
| PUT | `/{id}/progress` | Update progress percentage | `goal.update` |
| POST | `/{id}/complete` | Mark completed | `goal.update` |
| DELETE | `/{id}` | Soft delete | `goal.delete` |

**CompetencyFrameworksController** -- `api/v1/competency-frameworks`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List frameworks | `competencyFramework.read` |
| GET | `/{id}` | Get with competencies | `competencyFramework.read` |
| POST | `/` | Create framework with competencies | `competencyFramework.create` |
| PUT | `/{id}` | Update | `competencyFramework.update` |
| DELETE | `/{id}` | Soft delete | `competencyFramework.delete` |

**PipsController** -- `api/v1/pips`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/` | List PIPs (employeeId, status) | `pip.read` |
| GET | `/{id}` | Get PIP | `pip.read` |
| POST | `/` | Create PIP | `pip.create` |
| PUT | `/{id}` | Update | `pip.update` |
| POST | `/{id}/activate` | Activate (triggers workflow) | `pip.update` |
| POST | `/{id}/extend` | Extend end date | `pip.update` |
| POST | `/{id}/complete` | Complete with outcome | `pip.update` |
| DELETE | `/{id}` | Soft delete draft | `pip.delete` |

**Feedback360Controller** -- `api/v1/feedback-360`

| Method | Route | Purpose | Auth Policy |
|--------|-------|---------|-------------|
| GET | `/requests` | List requests (reviewId) | `feedback360.read` |
| POST | `/requests` | Create feedback request | `feedback360.create` |
| GET | `/pending` | My pending feedback responses (self-service) | `feedback360.read` |
| POST | `/responses/{requestId}` | Submit feedback response | `feedback360.create` |

---

## 8. CRITICAL INTEGRATION HOOKS

### 8.1 Offer Accepted -> Employee + Contract + Onboarding

This is the most critical integration point. When `POST /api/v1/offer-letters/{id}/accept` is called, the `AcceptOfferLetterCommandHandler` must execute:

**Step 1**: Create Employee from Candidate + Offer data:
```
employee.FirstName = candidate.FirstName
employee.LastName = candidate.LastName
employee.Email = candidate.Email
employee.Phone = candidate.Phone
employee.BranchId = offer.BranchId
employee.DepartmentId = offer.DepartmentId
employee.JobTitle = offer.JobTitle
employee.HireDate = offer.ProposedStartDate
employee.EmploymentStatus = EmploymentStatus.Active
employee.CurrentContractType = offer.ContractType
employee.JobGradeId = offer.JobGradeId
employee.SourceCandidateId = candidate.Id
employee.ProbationEndDate = offer.ProposedStartDate.AddDays(offer.ProbationPeriodDays ?? 0)
employee.ProbationStatus = offer.ProbationPeriodDays > 0 ? ProbationStatus.InProgress : ProbationStatus.NotApplicable
```

**Step 2**: Auto-generate EmployeeNumber using branch prefix pattern

**Step 3**: Create EmployeeContract from Offer:
```
contract.EmployeeId = newEmployee.Id
contract.ContractType = offer.ContractType
contract.BasicSalary = offer.OfferedSalary
contract.StartDate = offer.ProposedStartDate
contract.EndDate = offer.ContractType == FixedTerm ? start + months : null
contract.ProbationPeriodDays = offer.ProbationPeriodDays
contract.Status = ContractStatus.Active
```

**Step 4**: Create EmployeeSalary record

**Step 5**: Link Candidate to Employee: `candidate.EmployeeId = newEmployee.Id`

**Step 6**: Update offer: `offer.CreatedEmployeeId = newEmployee.Id`

**Step 7**: Update JobRequisition.FilledPositions++; if filled == total, set Status = Filled

**Step 8**: Update JobApplication.Status = ApplicationStatus.Hired

**Step 9**: Auto-trigger Onboarding:
- Find matching OnboardingTemplate (department-specific or branch-specific or default)
- Create OnboardingProcess with tasks from template
- Notify HR of new onboarding process

**Step 10**: Send notifications:
- Notify HR: "New employee [Name] hired from recruitment"
- Notify hiring manager: "Offer accepted by [Candidate Name]"

### 8.2 Onboarding Completion

When all mandatory tasks are completed and all mandatory documents verified:
- Set `OnboardingProcess.Status = Completed`
- Set `OnboardingProcess.ActualCompletionDate = DateTime.UtcNow`
- Verify active contract exists
- Notify HR and manager: "Onboarding completed for [Employee Name]"

### 8.3 Performance Review Approval -> Promotion/Salary Triggers

When `PerformanceReview.Status = Approved` and `RecommendPromotion = true`:
- Notify HR: "[Employee Name] recommended for promotion after performance review"
- (Manual) HR creates EmployeePromotion record

When `RecommendSalaryAdjustment = true`:
- Notify HR: "[Employee Name] recommended for salary adjustment of [amount]"
- (Manual) HR creates SalaryAdjustment record

When `RecommendPip = true`:
- Auto-create draft PIP for the employee
- Notify manager: "PIP draft created for [Employee Name]"

### 8.4 PIP Completion

When PIP completes unsuccessfully:
- Notify HR: "PIP for [Employee Name] completed unsuccessfully"
- HR can initiate termination process (manual, leveraging existing offboarding)

---

## 9. BACKGROUND JOBS

### 9.1 InterviewReminderJob

File: `src/Infrastructure/TecAxle.Hrms.Infrastructure/BackgroundJobs/InterviewReminderJob.cs`

Runs daily at 6:00 AM. Checks for interviews scheduled in next 24 hours. Sends notifications to interviewer(s) and candidate email.

### 9.2 OfferExpiryJob

File: `src/Infrastructure/TecAxle.Hrms.Infrastructure/BackgroundJobs/OfferExpiryJob.cs`

Runs daily at 5:00 AM. Checks for offers with `Status = Sent` and `ExpiryDate <= today`. Sets status to `Expired`. Notifies HR.

### 9.3 OnboardingOverdueTaskJob

File: `src/Infrastructure/TecAxle.Hrms.Infrastructure/BackgroundJobs/OnboardingOverdueTaskJob.cs`

Runs daily at 7:00 AM. Checks for OnboardingTasks with `DueDate < today` and `Status = Pending/InProgress`. Sets status to `Overdue`. Notifies task assignee and HR.

### 9.4 PerformanceReviewDeadlineJob

File: `src/Infrastructure/TecAxle.Hrms.Infrastructure/BackgroundJobs/PerformanceReviewDeadlineJob.cs`

Runs daily at 8:00 AM. Checks for:
- Self-assessment deadlines approaching (7 days, 3 days, 1 day)
- Manager review deadlines approaching
Sends reminder notifications.

### 9.5 Feedback360ExpiryJob

File: `src/Infrastructure/TecAxle.Hrms.Infrastructure/BackgroundJobs/Feedback360ExpiryJob.cs`

Runs daily at 9:00 AM. Expires feedback requests past deadline. Notifies requesting manager.

Schedule additions in Program.cs:
```csharp
scheduler.Schedule<InterviewReminderJob>().DailyAtHour(6);
scheduler.Schedule<OfferExpiryJob>().DailyAtHour(5);
scheduler.Schedule<OnboardingOverdueTaskJob>().DailyAtHour(7);
scheduler.Schedule<PerformanceReviewDeadlineJob>().DailyAtHour(8);
scheduler.Schedule<Feedback360ExpiryJob>().DailyAtHour(9);
```

---

## 10. SELF-SERVICE PORTAL FEATURES

### 10.1 Portal Controller additions (`PortalController.cs`)

```
GET  /api/v1/portal/my-onboarding         -- active onboarding process for current employee
POST /api/v1/portal/my-onboarding/tasks/{id}/complete  -- employee completes own onboarding task
POST /api/v1/portal/my-onboarding/documents -- employee uploads document

GET  /api/v1/portal/my-performance-reviews -- list of my reviews
GET  /api/v1/portal/my-performance-reviews/{id}  -- review detail
POST /api/v1/portal/my-performance-reviews/{id}/self-assessment  -- submit self-assessment
POST /api/v1/portal/my-performance-reviews/{id}/acknowledge  -- acknowledge review
POST /api/v1/portal/my-performance-reviews/{id}/dispute  -- dispute review

GET  /api/v1/portal/my-goals              -- my goals
PUT  /api/v1/portal/my-goals/{id}/progress -- update goal progress
GET  /api/v1/portal/my-feedback-requests   -- pending 360 feedback to give
POST /api/v1/portal/my-feedback-requests/{id} -- submit 360 feedback

GET  /api/v1/portal/internal-job-postings  -- internal career opportunities
POST /api/v1/portal/internal-job-postings/{id}/apply -- apply for internal position

// Manager endpoints (existing pattern)
GET  /api/v1/portal/team-reviews          -- manager's team reviews
GET  /api/v1/portal/team-onboarding       -- manager's team onboarding
GET  /api/v1/portal/team-goals            -- team goals overview
```

### 10.2 Self-Service Frontend Pages (Angular)

Add to `time-attendance-selfservice-frontend/src/app/pages/`:
- `portal/onboarding/` -- onboarding checklist view, document upload
- `portal/performance/` -- self-assessment form, review history, goals management
- `portal/feedback/` -- pending 360 feedback requests
- `portal/careers/` -- internal job postings

---

## 11. ADMIN FRONTEND PAGES

### 11.1 New Angular pages in `time-attendance-frontend/src/app/pages/`

**Recruitment pages:**
- `job-requisitions/` -- list, create-requisition, view-requisition
- `job-postings/` -- list, create-posting, view-posting
- `candidates/` -- list, create-candidate, view-candidate (with application history)
- `job-applications/` -- list (Kanban board view + table view), view-application (pipeline management)
- `interviews/` -- list (calendar + table views), schedule-interview, view-interview
- `offer-letters/` -- list, create-offer, view-offer

**Onboarding pages:**
- `onboarding-templates/` -- list, create-template, view-template (task management)
- `onboarding/` -- list (active onboarding dashboard), view-process (task tracker, document status)

**Performance pages:**
- `performance-cycles/` -- list, create-cycle, view-cycle (bulk review generation)
- `performance-reviews/` -- list, view-review (self-assessment + manager review + competency ratings)
- `goals/` -- list, create-goal, view-goal (with progress tracking)
- `competency-frameworks/` -- list, create-framework, view-framework
- `pips/` -- list, create-pip, view-pip
- `feedback-360/` -- manage requests and view responses

---

## 12. APPLICATION LAYER CQRS STRUCTURE

Follow the existing pattern exactly. For each entity, create:

```
Application/{Feature}/
  Commands/
    Create{Entity}/
      Create{Entity}Command.cs        -- record : ICommand<Result<long>>
      Create{Entity}CommandHandler.cs  -- class : BaseHandler<,>
    Update{Entity}/
    Delete{Entity}/
    {SpecialAction}{Entity}/           -- e.g., AcceptOfferLetter, CompleteOnboarding
  Queries/
    Common/
      {Entity}Dto.cs
    Get{Entity}ById/
      Get{Entity}ByIdQuery.cs
      Get{Entity}ByIdQueryHandler.cs
    Get{Entities}/
      Get{Entities}Query.cs
      Get{Entities}QueryHandler.cs
```

Feature folders to create:
1. `JobRequisitions/`
2. `JobPostings/`
3. `Candidates/`
4. `JobApplications/`
5. `Interviews/`
6. `OfferLetters/`
7. `OnboardingTemplates/`
8. `Onboarding/`
9. `PerformanceReviewCycles/`
10. `PerformanceReviews/`
11. `Goals/`
12. `CompetencyFrameworks/`
13. `Pips/`
14. `Feedback360/`

The `AcceptOfferLetterCommandHandler` is the most complex handler as it orchestrates steps 1-10 from section 8.1.

---

## 13. IMPLEMENTATION ORDER AND SEQUENCING

### Sprint 1 (Week 1-2): Recruitment Foundation
1. Domain entities: JobRequisition, JobPosting, Candidate, JobApplication
2. Enums for recruitment
3. EF configurations for above
4. IApplicationDbContext + DbContext additions
5. WorkflowEntityType.JobRequisition = 30
6. PermissionResources additions (recruitment)
7. CQRS handlers for JobRequisition, JobPosting, Candidate, JobApplication
8. Controllers: JobRequisitionsController, JobPostingsController, CandidatesController, JobApplicationsController
9. Public career page endpoints (anonymous)

### Sprint 2 (Week 3-4): Recruitment Pipeline
1. Domain entities: InterviewSchedule, InterviewFeedback, OfferLetter
2. EF configurations
3. CQRS handlers for Interviews, OfferLetters
4. Controllers: InterviewsController, OfferLettersController
5. **AcceptOfferLetterCommandHandler** (critical integration: creates Employee + Contract)
6. Background jobs: InterviewReminderJob, OfferExpiryJob
7. Admin frontend: all recruitment pages

### Sprint 3 (Week 5-6): Onboarding
1. Domain entities: all 5 onboarding entities
2. EF configurations
3. PermissionResources additions
4. CQRS handlers for templates and processes
5. Controllers: OnboardingTemplatesController, OnboardingController
6. **Integration**: Wire AcceptOfferLetter to auto-create OnboardingProcess
7. Background job: OnboardingOverdueTaskJob
8. Self-service portal: onboarding checklist, document upload
9. Admin frontend: onboarding pages

### Sprint 4 (Week 7-8): Performance Foundation
1. Domain entities: CompetencyFramework, Competency, PerformanceReviewCycle, PerformanceReview, GoalDefinition, CompetencyAssessment
2. EF configurations
3. PermissionResources + WorkflowEntityType additions
4. CQRS handlers for cycles, reviews, goals, competencies
5. Controllers: PerformanceReviewCyclesController, PerformanceReviewsController, GoalsController, CompetencyFrameworksController
6. Cycle activation handler (bulk creates reviews for all employees in scope)

### Sprint 5 (Week 9-10): Performance Advanced + Integration
1. Domain entities: PerformanceImprovementPlan, FeedbackRequest360, Feedback360Response
2. EF configurations
3. CQRS handlers for PIPs and 360 feedback
4. Controllers: PipsController, Feedback360Controller
5. **Integration**: Review approval triggers promotion/salary notifications
6. **Integration**: PIP creation from review recommendation
7. Background jobs: PerformanceReviewDeadlineJob, Feedback360ExpiryJob
8. Self-service portal: performance features (self-assessment, goals, 360 feedback)
9. Admin frontend: all performance pages

### Sprint 6 (Week 11-12): Migration, Testing, Polish
1. Generate single EF migration
2. Seed data for templates, frameworks, sample postings
3. End-to-end testing of full pipeline: Requisition -> Posting -> Application -> Interview -> Offer -> Accept -> Employee Created -> Contract Created -> Onboarding Started
4. Portal integration testing
5. Notification message review (EN/AR)
6. Permission seeding

---

## 14. POTENTIAL CHALLENGES

1. **AcceptOfferLetterCommandHandler complexity**: This single handler creates 4+ entities in one transaction. Must be thoroughly tested. Consider wrapping in explicit database transaction.

2. **Employee number generation**: Needs thread-safe auto-incrementing within branch scope. Use `SELECT MAX(EmployeeNumber) + 1` with retry on concurrency conflict, or use a sequence per branch.

3. **Review cycle activation**: Creating reviews for hundreds of employees at once. Should use batch insert for performance. Consider making it a background job if > 100 employees.

4. **Anonymous endpoints**: Public job posting and application endpoints need rate limiting and CAPTCHA protection. Add `[AllowAnonymous]` only to specific methods.

5. **360 feedback anonymity**: Must ensure that when `IsAnonymous = true`, API responses for feedback never include respondent identity. Create separate DTOs that strip this field.

6. **File uploads**: Resume and document uploads need storage strategy. Reuse existing `DocumentUrl`/`FileUrl` pattern (presumably blob storage).

---

### Critical Files for Implementation
- `d:/Work/TecAxle.Hrms/src/Domain/TecAxle.Hrms.Domain/Common/Enums.cs`
- `d:/Work/TecAxle.Hrms/src/Application/TecAxle.Hrms.Application/Abstractions/IApplicationDbContext.cs`
- `d:/Work/TecAxle.Hrms/src/Domain/TecAxle.Hrms.Domain/Workflows/Enums/WorkflowEntityType.cs`
- `d:/Work/TecAxle.Hrms/src/Domain/TecAxle.Hrms.Domain/Common/PermissionResources.cs`
- `d:/Work/TecAxle.Hrms/src/Domain/TecAxle.Hrms.Domain/Employees/Employee.cs`