namespace TecAxle.Hrms.Domain.Modules;

/// <summary>
/// Defines all system modules available in the ClockN HRMS platform.
/// Used for subscription plan entitlements, feature toggling, and module-aware operations.
/// </summary>
public enum SystemModule
{
    /// <summary>
    /// Core platform functionality (always enabled).
    /// Includes: User, Role, Permission, Branch, Department, Employee, Dashboard, Notification, Audit, Settings, Session, System.
    /// </summary>
    Core = 0,

    /// <summary>
    /// Time and attendance tracking module.
    /// Includes: Shift, Attendance, Schedule, PublicHoliday, OvertimeConfiguration.
    /// </summary>
    TimeAttendance = 1,

    /// <summary>
    /// Leave and vacation management module.
    /// Includes: VacationType, Vacation, Excuse, ExcusePolicy, LeaveBalance, CompensatoryOff, LeaveEncashment.
    /// </summary>
    LeaveManagement = 2,

    /// <summary>
    /// Remote work request management module.
    /// Includes: RemoteWorkPolicy, RemoteWorkRequest.
    /// </summary>
    RemoteWork = 3,

    /// <summary>
    /// Approval workflow engine (always enabled).
    /// Includes: Workflow, Approval.
    /// </summary>
    Workflows = 4,

    /// <summary>
    /// Employee lifecycle management module.
    /// Includes: Contract, Transfer, Promotion, SalaryAdjustment, JobGrade.
    /// </summary>
    EmployeeLifecycle = 5,

    /// <summary>
    /// Payroll processing and compensation module.
    /// Includes: Payroll, SalaryStructure, TaxConfiguration, SocialInsurance, Insurance.
    /// </summary>
    Payroll = 6,

    /// <summary>
    /// Allowance management module.
    /// Includes: AllowanceType, AllowancePolicy, AllowanceAssignment, AllowanceRequest.
    /// </summary>
    Allowances = 7,

    /// <summary>
    /// Employee offboarding module.
    /// Includes: Resignation, Termination, Clearance, EndOfService, FinalSettlement, ExitInterview.
    /// </summary>
    Offboarding = 8,

    /// <summary>
    /// Recruitment and hiring module.
    /// Includes: JobRequisition, JobPosting, Candidate, JobApplication, Interview, OfferLetter.
    /// </summary>
    Recruitment = 9,

    /// <summary>
    /// Employee onboarding module.
    /// Includes: OnboardingTemplate, OnboardingProcess.
    /// </summary>
    Onboarding = 10,

    /// <summary>
    /// Performance management module.
    /// Includes: PerformanceReviewCycle, PerformanceReview, Goal, CompetencyFramework, PIP, Feedback360.
    /// </summary>
    Performance = 11,

    /// <summary>
    /// Document and letter management module.
    /// Includes: DocumentCategory, EmployeeDocument, CompanyPolicy, LetterTemplate, LetterRequest.
    /// </summary>
    Documents = 12,

    /// <summary>
    /// Expense management module.
    /// Includes: ExpenseCategory, ExpensePolicy, ExpenseClaim.
    /// </summary>
    Expenses = 13,

    /// <summary>
    /// Loan management module.
    /// Includes: LoanType, LoanPolicy, LoanApplication, SalaryAdvance.
    /// </summary>
    Loans = 14,

    /// <summary>
    /// Company announcements module.
    /// Includes: AnnouncementCategory, Announcement.
    /// </summary>
    Announcements = 15,

    /// <summary>
    /// Training and development module.
    /// Includes: TrainingCategory, TrainingCourse, TrainingProgram, TrainingSession, TrainingEnrollment, TrainingEvaluation, EmployeeCertification, TrainingBudget.
    /// </summary>
    Training = 16,

    /// <summary>
    /// Employee relations module.
    /// Includes: Grievance, DisciplinaryAction, Investigation, CounselingRecord.
    /// </summary>
    EmployeeRelations = 17,

    /// <summary>
    /// Asset management module.
    /// Includes: AssetCategory, Asset, AssetAssignment, AssetMaintenance.
    /// </summary>
    Assets = 18,

    /// <summary>
    /// Employee surveys module.
    /// Includes: SurveyTemplate, SurveyDistribution, SurveyResponse.
    /// </summary>
    Surveys = 19,

    /// <summary>
    /// HR analytics and dashboards module.
    /// Includes: Analytics, SavedDashboard.
    /// </summary>
    Analytics = 20,

    /// <summary>
    /// Project timesheet management module.
    /// Includes: Project, ProjectTask, TimesheetPeriod, Timesheet.
    /// </summary>
    Timesheets = 21,

    /// <summary>
    /// Succession planning module.
    /// Includes: KeyPosition, TalentProfile, SuccessionPlan, CareerPath.
    /// </summary>
    SuccessionPlanning = 22,

    /// <summary>
    /// Benefits administration module.
    /// Includes: BenefitPlan, BenefitEnrollment, OpenEnrollmentPeriod, BenefitClaim.
    /// </summary>
    Benefits = 23,

    /// <summary>
    /// Custom reports module.
    /// Includes: CustomReport, ScheduledReport.
    /// </summary>
    CustomReports = 24,

    /// <summary>
    /// Shift swap and on-call management module.
    /// Includes: ShiftSwapRequest, OnCallSchedule.
    /// </summary>
    ShiftSwaps = 25
}
