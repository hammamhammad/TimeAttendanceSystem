namespace TecAxle.Hrms.Domain.Common;

public enum EmploymentStatus
{
    Active = 1,
    FullTime = 2,
    PartTime = 3,
    Contract = 4,
    Intern = 5,
    Consultant = 6,
    Terminated = 7,
    Inactive = 8,
    Suspended = 9,
    OnProbation = 10,
    Resigned = 11
}

public enum Gender
{
    Male = 1,
    Female = 2
}

public enum WorkLocationType
{
    OnSite = 1,
    Remote = 2,
    Hybrid = 3
}

public enum ShiftStatus
{
    Active = 1,
    Inactive = 2,
    Draft = 3,
    Archived = 4
}

public enum AuditAction
{
    // Authentication & Authorization
    Login = 1,
    Logout = 2,
    LogoutAllDevices = 3,
    TokenRefresh = 4,
    PasswordChange = 5,
    PasswordReset = 6,
    PasswordResetRequest = 7,
    AccountLockout = 8,
    AccountUnlock = 9,
    TwoFactorEnabled = 10,
    TwoFactorDisabled = 11,
    TwoFactorVerified = 12,
    SessionCreated = 13,
    SessionTerminated = 14,
    SessionExpired = 15,

    // User Management
    UserCreated = 20,
    UserUpdated = 21,
    UserDeleted = 22,
    UserActivated = 23,
    UserDeactivated = 24,
    UserRoleAssigned = 25,
    UserRoleRevoked = 26,
    UserBranchScopeAssigned = 27,
    UserBranchScopeRevoked = 28,

    // Employee Management
    EmployeeCreated = 40,
    EmployeeUpdated = 41,
    EmployeeDeleted = 42,
    EmployeeActivated = 43,
    EmployeeDeactivated = 44,

    // Shift Management
    ShiftCreated = 60,
    ShiftUpdated = 61,
    ShiftDeleted = 62,

    // System Actions
    SystemStartup = 100,
    SystemShutdown = 101,
    DatabaseMigration = 102,

    // Shift Assignment Management
    ShiftAssignmentCreated = 80,
    ShiftAssignmentUpdated = 81,
    ShiftAssignmentDeleted = 82,
    ShiftAssignmentActivated = 83,
    ShiftAssignmentDeactivated = 84,

    // Vacation Management
    VacationTypeCreated = 90,
    VacationTypeUpdated = 91,
    VacationTypeDeleted = 92,
    VacationRequestCreated = 93,
    VacationRequestUpdated = 94,
    VacationRequestApproved = 95,
    VacationRequestRejected = 96,
    VacationRequestCancelled = 97,

    // Generic CRUD Operations
    Created = 200,
    Updated = 201,
    Deleted = 202,
    Viewed = 203
}

/// <summary>
/// Defines the type of shift assignment indicating the organizational level.
/// Determines whether the shift is assigned to an individual employee,
/// department, or entire branch.
/// </summary>
public enum ShiftAssignmentType
{
    /// <summary>
    /// Shift assigned to an individual employee.
    /// Highest priority assignment that overrides department and branch assignments.
    /// </summary>
    Employee = 1,

    /// <summary>
    /// Shift assigned to all employees within a department.
    /// Medium priority that overrides branch assignments but is overridden by employee assignments.
    /// </summary>
    Department = 2,

    /// <summary>
    /// Shift assigned to all employees within a branch.
    /// Lowest priority assignment that applies organization-wide but can be overridden.
    /// </summary>
    Branch = 3
}

/// <summary>
/// Defines the status of a shift assignment controlling its lifecycle and activation.
/// Manages assignment states from creation through activation to expiration.
/// </summary>
public enum ShiftAssignmentStatus
{
    /// <summary>
    /// Assignment is pending approval or future activation.
    /// Not currently effective but scheduled for future activation.
    /// </summary>
    Pending = 1,

    /// <summary>
    /// Assignment is currently active and in effect.
    /// Employees are working under this shift schedule.
    /// </summary>
    Active = 2,

    /// <summary>
    /// Assignment has been temporarily suspended.
    /// Can be reactivated without creating a new assignment.
    /// </summary>
    Inactive = 3,

    /// <summary>
    /// Assignment has expired based on end date.
    /// Historical record maintained for audit and reporting purposes.
    /// </summary>
    Expired = 4,

    /// <summary>
    /// Assignment has been cancelled before becoming active.
    /// Cancelled assignments are retained for audit trails.
    /// </summary>
    Cancelled = 5
}

// ============================================================
// Phase 1: Employee Lifecycle Enums
// ============================================================

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

public enum SalaryAdjustmentType
{
    AnnualIncrement = 1,
    PromotionIncrease = 2,
    MarketAdjustment = 3,
    PerformanceBonus = 4,
    CostOfLivingAdjustment = 5,
    ContractRenewal = 6,
    TransferAdjustment = 7,
    Correction = 8,
    Demotion = 9,
    AllowanceChange = 10,
    Other = 20
}

public enum SalaryAdjustmentStatus
{
    Draft = 1,
    Pending = 2,
    Approved = 3,
    Rejected = 4,
    Applied = 5,
    Cancelled = 6
}

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
    Correction = 10,
    Other = 20
}

public enum MaritalStatus
{
    Single = 1,
    Married = 2,
    Divorced = 3,
    Widowed = 4
}

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
    ResidencePermit = 2,
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

// ============================================================
// Phase 1: Payroll Enums
// ============================================================

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

public enum PayrollDailyBasisType
{
    CalendarDays = 1,
    WorkingDays = 2,
    FixedBasis = 3
}

public enum PayrollRunType
{
    InitialProcess = 1,
    Recalculation = 2,
    Adjustment = 3,
    Finalization = 4,
    Cancellation = 5
}

public enum PayrollRunStatus
{
    Running = 1,
    Completed = 2,
    Failed = 3,
    CompletedWithWarnings = 4
}

public enum PayrollRunItemStatus
{
    Succeeded = 1,
    SkippedNoSalary = 2,
    SkippedInactive = 3,
    FailedWithError = 4,
    CompletedWithWarnings = 5
}

public enum BankFileFormat
{
    WPS = 1,
    CSV = 2,
    SWIFT = 3
}

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
    ClassA = 1,
    ClassB = 2,
    ClassC = 3,
    VIP = 4
}

// ============================================================
// Phase 1: Offboarding Enums
// ============================================================

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

// ============================================================
// Allowance Management Enums
// ============================================================

public enum AllowanceCategory
{
    Allowance = 1,
    Deduction = 2,
    Benefit = 3
}

public enum AllowanceRequestType
{
    NewAllowance = 1,
    Increase = 2,
    Decrease = 3,
    Remove = 4,
    Temporary = 5
}

public enum AllowanceRequestStatus
{
    Pending = 1,
    Approved = 2,
    Rejected = 3,
    Applied = 4,
    Withdrawn = 5,
    Cancelled = 6
}

public enum AllowanceAssignmentStatus
{
    Active = 1,
    Suspended = 2,
    Expired = 3,
    Cancelled = 4
}

public enum AllowanceChangeType
{
    Added = 1,
    Modified = 2,
    Removed = 3,
    Suspended = 4,
    Resumed = 5
}

// ============================================================
// Phase 2: Recruitment & Hiring Enums
// ============================================================

public enum RequisitionStatus
{
    Draft = 1,
    PendingApproval = 2,
    Approved = 3,
    Rejected = 4,
    Open = 5,
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

public enum JobEmploymentType
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

public enum InterviewRecommendation
{
    StrongHire = 1,
    Hire = 2,
    Neutral = 3,
    NoHire = 4,
    StrongNoHire = 5
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

public enum DocumentCollectionStatus
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
    Unsatisfactory = 1,
    NeedsImprovement = 2,
    MeetsExpectations = 3,
    ExceedsExpectations = 4,
    Exceptional = 5
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

public enum GoalType
{
    OKR = 1,
    KPI = 2,
    Development = 3,
    Project = 4,
    Other = 5
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

// ============================================================
// Phase 3: Document Management Enums
// ============================================================

public enum DocumentType
{
    Contract = 1,
    Certificate = 2,
    ID = 3,
    License = 4,
    Visa = 5,
    Resume = 6,
    Photo = 7,
    MedicalClearance = 8,
    Other = 10
}

public enum DocumentVerificationStatus
{
    Pending = 1,
    Verified = 2,
    Rejected = 3,
    Expired = 4
}

public enum PolicyStatus
{
    Draft = 1,
    Published = 2,
    Archived = 3
}

public enum LetterType
{
    SalaryCertificate = 1,
    EmploymentLetter = 2,
    ExperienceLetter = 3,
    NOC = 4,
    Custom = 5
}

public enum LetterRequestStatus
{
    Pending = 1,
    Approved = 2,
    Generated = 3,
    Rejected = 4,
    Cancelled = 5
}

// ============================================================
// Phase 3: Expense Management Enums
// ============================================================

public enum ExpenseClaimStatus
{
    Draft = 1,
    Submitted = 2,
    PendingApproval = 3,
    Approved = 4,
    Rejected = 5,
    Reimbursed = 6,
    PartiallyReimbursed = 7,
    Cancelled = 8
}

public enum ReimbursementMethod
{
    Payroll = 1,
    BankTransfer = 2,
    Cash = 3
}

// ============================================================
// Phase 3: Loans & Salary Advance Enums
// ============================================================

public enum LoanApplicationStatus
{
    Draft = 1,
    Pending = 2,
    Approved = 3,
    Rejected = 4,
    Active = 5,
    FullyPaid = 6,
    DefaultedPayment = 7,
    Cancelled = 8
}

public enum LoanRepaymentStatus
{
    Scheduled = 1,
    Paid = 2,
    Overdue = 3,
    Waived = 4
}

public enum SalaryAdvanceStatus
{
    Pending = 1,
    Approved = 2,
    Rejected = 3,
    Deducted = 4,
    Cancelled = 5
}

// ============================================================
// Phase 4: Company Announcements
// ============================================================

public enum AnnouncementPriority
{
    Low = 1,
    Normal = 2,
    High = 3,
    Urgent = 4
}

public enum AnnouncementStatus
{
    Draft = 1,
    Scheduled = 2,
    Published = 3,
    Expired = 4,
    Archived = 5
}

public enum AnnouncementTargetAudience
{
    All = 1,
    Branch = 2,
    Department = 3,
    Role = 4
}

// ============================================================
// Phase 4: Training & Development
// ============================================================

public enum TrainingDeliveryMethod
{
    Classroom = 1,
    Online = 2,
    Blended = 3,
    OnTheJob = 4,
    SelfPaced = 5
}

public enum TrainingProgramStatus
{
    Draft = 1,
    Active = 2,
    Completed = 3,
    Archived = 4
}

public enum TrainingSessionStatus
{
    Scheduled = 1,
    InProgress = 2,
    Completed = 3,
    Cancelled = 4
}

public enum TrainingEnrollmentStatus
{
    Pending = 1,
    Approved = 2,
    Rejected = 3,
    InProgress = 4,
    Completed = 5,
    Cancelled = 6,
    NoShow = 7
}

public enum TrainingAttendanceStatus
{
    Present = 1,
    Absent = 2,
    Late = 3,
    Excused = 4
}

public enum CertificationStatus
{
    Active = 1,
    Expired = 2,
    Revoked = 3,
    Pending = 4
}

// ============================================================
// Phase 4: Employee Relations
// ============================================================

public enum GrievanceType
{
    Workplace = 1,
    Harassment = 2,
    Discrimination = 3,
    SafetyViolation = 4,
    PolicyViolation = 5,
    CompensationDispute = 6,
    WorkConditions = 7,
    Other = 10
}

public enum GrievancePriority
{
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4
}

public enum GrievanceStatus
{
    Filed = 1,
    UnderReview = 2,
    InvestigationStarted = 3,
    PendingResolution = 4,
    Resolved = 5,
    Escalated = 6,
    Closed = 7,
    Withdrawn = 8
}

public enum DisciplinaryActionType
{
    VerbalWarning = 1,
    WrittenWarning = 2,
    FinalWarning = 3,
    Suspension = 4,
    Demotion = 5,
    Termination = 6,
    Probation = 7,
    Other = 10
}

public enum DisciplinarySeverity
{
    Minor = 1,
    Moderate = 2,
    Major = 3,
    Critical = 4
}

public enum DisciplinaryActionStatus
{
    Draft = 1,
    Pending = 2,
    Approved = 3,
    Acknowledged = 4,
    Appealed = 5,
    AppealResolved = 6,
    Completed = 7,
    Cancelled = 8
}

public enum InvestigationStatus
{
    Open = 1,
    InProgress = 2,
    PendingReview = 3,
    Completed = 4,
    Closed = 5,
    Cancelled = 6
}

public enum CounselingType
{
    Performance = 1,
    Behavioral = 2,
    Career = 3,
    Conflict = 4,
    PersonalSupport = 5,
    ReturnToWork = 6,
    Other = 10
}

// ============================================================
// Phase 5: Asset Management
// ============================================================

public enum AssetStatus
{
    Available = 1,
    Assigned = 2,
    InMaintenance = 3,
    Retired = 4,
    Lost = 5,
    Damaged = 6,
    Disposed = 7
}

public enum AssetCondition
{
    New = 1,
    Good = 2,
    Fair = 3,
    Poor = 4,
    NonFunctional = 5
}

public enum AssetAssignmentStatus
{
    Active = 1,
    Returned = 2,
    Overdue = 3,
    Lost = 4,
    Damaged = 5
}

public enum MaintenanceType
{
    Preventive = 1,
    Corrective = 2,
    Emergency = 3,
    Upgrade = 4,
    Inspection = 5
}

public enum MaintenanceStatus
{
    Scheduled = 1,
    InProgress = 2,
    Completed = 3,
    Cancelled = 4
}

// ============================================================
// Phase 5: Employee Engagement & Surveys
// ============================================================

public enum SurveyType
{
    PulseSurvey = 1,
    EngagementSurvey = 2,
    ENPS = 3,
    ExitSurvey = 4,
    OnboardingSurvey = 5,
    Custom = 10
}

public enum SurveyQuestionType
{
    Rating = 1,
    MultipleChoice = 2,
    MultiSelect = 3,
    OpenText = 4,
    NPS = 5,
    YesNo = 6
}

public enum SurveyTargetAudience
{
    All = 1,
    Branch = 2,
    Department = 3,
    Custom = 4
}

public enum SurveyDistributionStatus
{
    Draft = 1,
    Scheduled = 2,
    Active = 3,
    Closed = 4,
    Cancelled = 5
}

public enum SurveyParticipantStatus
{
    Invited = 1,
    Started = 2,
    Completed = 3,
    Declined = 4,
    Expired = 5
}

// ============================================================
// Phase 5: Advanced Analytics
// ============================================================

public enum AnalyticsMetricType
{
    HeadcountTotal = 1,
    HeadcountByDepartment = 2,
    HeadcountByGender = 3,
    HeadcountByAgeGroup = 4,
    AttritionRate = 10,
    AttritionByDepartment = 11,
    AttritionByReason = 12,
    NewHires = 15,
    CostPerHire = 20,
    TimeToFill = 21,
    TimeToHire = 22,
    TrainingROI = 30,
    TrainingHoursPerEmployee = 31,
    TrainingCompletionRate = 32,
    LeaveUtilization = 40,
    LeaveByType = 41,
    AbsenteeismRate = 42,
    OvertimeHours = 50,
    OvertimeCost = 51,
    OvertimeByDepartment = 52,
    EngagementScore = 60,
    ENPSScore = 61,
    PayrollCostTotal = 70,
    PayrollCostByDepartment = 71,
    AverageSalary = 72
}

public enum AnalyticsPeriodType
{
    Daily = 1,
    Weekly = 2,
    Monthly = 3,
    Quarterly = 4,
    Yearly = 5
}

// ============================================================
// Phase 6: Timesheet Management
// ============================================================

public enum ProjectStatus
{
    Active = 1,
    OnHold = 2,
    Completed = 3,
    Cancelled = 4,
    Archived = 5
}

public enum TimesheetPeriodType
{
    Weekly = 1,
    BiWeekly = 2,
    Monthly = 3
}

public enum TimesheetPeriodStatus
{
    Open = 1,
    Closed = 2,
    Locked = 3
}

public enum TimesheetStatus
{
    Draft = 1,
    Submitted = 2,
    Approved = 3,
    Rejected = 4,
    Recalled = 5
}

// ============================================================
// Phase 6: Succession Planning & Talent Management
// ============================================================

public enum PositionCriticality
{
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4
}

public enum VacancyRisk
{
    Low = 1,
    Medium = 2,
    High = 3,
    Imminent = 4
}

public enum PotentialRating
{
    Low = 1,
    Moderate = 2,
    High = 3,
    VeryHigh = 4
}

public enum NineBoxPosition
{
    LowPerformanceLowPotential = 1,
    LowPerformanceModeratePotential = 2,
    LowPerformanceHighPotential = 3,
    ModeratePerformanceLowPotential = 4,
    ModeratePerformanceModeratePotential = 5,
    ModeratePerformanceHighPotential = 6,
    HighPerformanceLowPotential = 7,
    HighPerformanceModeratePotential = 8,
    HighPerformanceHighPotential = 9
}

public enum ReadinessLevel
{
    NotReady = 1,
    DevelopmentNeeded = 2,
    ReadyInOneToTwoYears = 3,
    ReadyNow = 4
}

public enum RetentionRisk
{
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4
}

public enum ProficiencyLevel
{
    Beginner = 1,
    Intermediate = 2,
    Advanced = 3,
    Expert = 4
}

public enum SuccessionPlanStatus
{
    Draft = 1,
    Active = 2,
    UnderReview = 3,
    Approved = 4,
    Archived = 5
}

public enum ReadinessTimeline
{
    Immediate = 1,
    SixMonths = 2,
    OneYear = 3,
    TwoYears = 4,
    ThreePlusYears = 5
}

public enum CandidateSuccessionStatus
{
    Active = 1,
    Promoted = 2,
    Removed = 3,
    OnHold = 4
}

// ============================================================
// Phase 6: Benefits Administration
// ============================================================

public enum BenefitType
{
    Health = 1,
    Dental = 2,
    Vision = 3,
    Life = 4,
    Disability = 5,
    Retirement = 6,
    Wellness = 7,
    Education = 8,
    Other = 10
}

public enum CoverageLevel
{
    EmployeeOnly = 1,
    EmployeePlusSpouse = 2,
    EmployeePlusChildren = 3,
    Family = 4
}

public enum EligibilityRuleType
{
    ServiceLength = 1,
    JobGrade = 2,
    EmploymentStatus = 3,
    ContractType = 4,
    Department = 5,
    Branch = 6
}

public enum EnrollmentPeriodStatus
{
    Upcoming = 1,
    Open = 2,
    Closed = 3,
    Cancelled = 4
}

public enum BenefitEnrollmentStatus
{
    Pending = 1,
    Active = 2,
    Suspended = 3,
    Terminated = 4,
    Cancelled = 5,
    PendingApproval = 6
}

public enum LifeEventType
{
    Marriage = 1,
    Divorce = 2,
    Birth = 3,
    Adoption = 4,
    Death = 5,
    DisabilityChange = 6,
    JobChange = 7,
    Other = 10
}

public enum BenefitClaimType
{
    Medical = 1,
    Dental = 2,
    Vision = 3,
    Prescription = 4,
    Preventive = 5,
    Emergency = 6,
    Other = 10
}

public enum BenefitClaimStatus
{
    Submitted = 1,
    UnderReview = 2,
    Approved = 3,
    PartiallyApproved = 4,
    Rejected = 5,
    Paid = 6,
    Cancelled = 7
}

// ============================================================
// Phase 7: Leave Enhancement Enums
// ============================================================

public enum HalfDayType
{
    Morning = 1,
    Afternoon = 2
}

// ============================================================
// v13.5: Lifecycle Automation Enums
// ============================================================

/// <summary>
/// Identifies the specific automation that produced a <see cref="TecAxle.Hrms.Domain.Lifecycle.LifecycleAutomationAudit"/> row.
/// One enum value per distinct step so audit queries remain unambiguous.
/// </summary>
public enum LifecycleAutomationType
{
    OfferAcceptedCreateOnboarding = 1,
    OnboardingCompletedActivateEmployee = 2,
    ResignationApprovedCreateTermination = 3,
    TerminationCreateClearance = 4,
    TerminationSuspendEmployee = 5,
    ClearanceCompletedEnableSettlement = 6,
    FinalSettlementPaidDeactivateEmployee = 7,
    ContractExpiredAction = 8
}

/// <summary>
/// Terminal status of a single lifecycle automation attempt.
/// </summary>
public enum LifecycleAutomationStatus
{
    Succeeded = 1,
    Skipped = 2,
    Failed = 3,
    /// <summary>Automation already ran successfully for this source entity; re-fire suppressed.</summary>
    DuplicateSuppressed = 4,
    /// <summary>Automation globally disabled (master kill-switch) or specifically disabled via tenant flag.</summary>
    Disabled = 5,
    /// <summary>Required input was missing (template, linked entity, employee link, etc.).</summary>
    MissingPrerequisite = 6
}

/// <summary>
/// Per-tenant choice of what happens to contracts whose <c>EndDate</c> has passed.
/// Default <see cref="AutoMarkExpired"/> fixes the pre-v13.5 bug where contracts stayed
/// <c>Active</c> indefinitely past their end date.
/// </summary>
public enum ContractExpiredAction
{
    /// <summary>No status change; only send the existing alert notifications.</summary>
    NotifyOnly = 1,
    /// <summary>Flip contract <c>Status</c> to <c>Expired</c> and notify (default).</summary>
    AutoMarkExpired = 2,
    /// <summary>Mark expired, then suspend the employee (block login, keep record visible).</summary>
    Suspend = 3,
    /// <summary>Mark expired, then fully deactivate the employee (hide from normal operations).</summary>
    Deactivate = 4
}
