using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Platform;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Users;
using TecAxle.Hrms.Domain.Shifts;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Settings;
using TecAxle.Hrms.Domain.VacationTypes;
using TecAxle.Hrms.Domain.Vacations;
using TecAxle.Hrms.Domain.Excuses;
using TecAxle.Hrms.Domain.RemoteWork;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.LeaveManagement;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Tenants;
using TecAxle.Hrms.Domain.Subscriptions;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Domain.Offboarding;
using TecAxle.Hrms.Domain.Recruitment;
using TecAxle.Hrms.Domain.Onboarding;
using TecAxle.Hrms.Domain.Performance;
using TecAxle.Hrms.Domain.Documents;
using TecAxle.Hrms.Domain.Expenses;
using TecAxle.Hrms.Domain.Loans;
using TecAxle.Hrms.Domain.Announcements;
using TecAxle.Hrms.Domain.Training;
using TecAxle.Hrms.Domain.EmployeeRelations;
using TecAxle.Hrms.Domain.Assets;
using TecAxle.Hrms.Domain.Surveys;
using TecAxle.Hrms.Domain.Analytics;
using TecAxle.Hrms.Domain.Timesheets;
using TecAxle.Hrms.Domain.Succession;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Reports;
using TecAxle.Hrms.Domain.Configuration;
using TecAxle.Hrms.Domain.Departments;

namespace TecAxle.Hrms.Infrastructure.Persistence;

public class ApplicationDbContextAdapter : IApplicationDbContext
{
    private readonly TecAxleDbContext _context;

    public ApplicationDbContextAdapter(TecAxleDbContext context)
    {
        _context = context;
    }

    public DbSet<Branch> Branches => _context.Branches;
    public DbSet<Department> Departments => _context.Departments;
    public DbSet<User> Users => _context.Users;
    public DbSet<Role> Roles => _context.Roles;
    public DbSet<Permission> Permissions => _context.Permissions;
    public DbSet<RolePermission> RolePermissions => _context.RolePermissions;
    public DbSet<UserRole> UserRoles => _context.UserRoles;
    public DbSet<UserBranchScope> UserBranchScopes => _context.UserBranchScopes;
    public DbSet<Employee> Employees => _context.Employees;
    public DbSet<EmployeeUserLink> EmployeeUserLinks => _context.EmployeeUserLinks;
    public DbSet<RefreshToken> RefreshTokens => _context.RefreshTokens;
    public DbSet<LoginAttempt> LoginAttempts => _context.LoginAttempts;
    public DbSet<PasswordHistory> PasswordHistory => _context.PasswordHistory;
    public DbSet<BlacklistedToken> BlacklistedTokens => _context.BlacklistedTokens;
    public DbSet<TwoFactorBackupCode> TwoFactorBackupCodes => _context.TwoFactorBackupCodes;
    public DbSet<UserSession> UserSessions => _context.UserSessions;
    public DbSet<AuditLog> AuditLogs => _context.AuditLogs;
    public DbSet<AuditChange> AuditChanges => _context.AuditChanges;
    public DbSet<Shift> Shifts => _context.Shifts;
    public DbSet<ShiftPeriod> ShiftPeriods => _context.ShiftPeriods;
    public DbSet<ShiftAssignment> ShiftAssignments => _context.ShiftAssignments;
    public DbSet<AttendanceRecord> AttendanceRecords => _context.AttendanceRecords;
    public DbSet<AttendanceTransaction> AttendanceTransactions => _context.AttendanceTransactions;
    public DbSet<WorkingDay> WorkingDays => _context.WorkingDays;
    public DbSet<PublicHoliday> PublicHolidays => _context.PublicHolidays;
    public DbSet<VacationType> VacationTypes => _context.VacationTypes;
    public DbSet<EmployeeVacation> EmployeeVacations => _context.EmployeeVacations;
    public DbSet<ExcusePolicy> ExcusePolicies => _context.ExcusePolicies;
    public DbSet<EmployeeExcuse> EmployeeExcuses => _context.EmployeeExcuses;
    public DbSet<RemoteWorkPolicy> RemoteWorkPolicies => _context.RemoteWorkPolicies;
    public DbSet<RemoteWorkRequest> RemoteWorkRequests => _context.RemoteWorkRequests;

    // Workflow entities
    public DbSet<WorkflowDefinition> WorkflowDefinitions => _context.WorkflowDefinitions;
    public DbSet<WorkflowStep> WorkflowSteps => _context.WorkflowSteps;
    public DbSet<WorkflowInstance> WorkflowInstances => _context.WorkflowInstances;
    public DbSet<WorkflowStepExecution> WorkflowStepExecutions => _context.WorkflowStepExecutions;
    public DbSet<ApprovalDelegation> ApprovalDelegations => _context.ApprovalDelegations;

    // Leave Management entities
    public DbSet<LeaveEntitlement> LeaveEntitlements => _context.LeaveEntitlements;
    public DbSet<LeaveBalance> LeaveBalances => _context.LeaveBalances;
    public DbSet<LeaveTransaction> LeaveTransactions => _context.LeaveTransactions;
    public DbSet<LeaveAccrualPolicy> LeaveAccrualPolicies => _context.LeaveAccrualPolicies;

    // Attendance Correction Request entities
    public DbSet<AttendanceCorrectionRequest> AttendanceCorrectionRequests => _context.AttendanceCorrectionRequests;

    // Notification entities
    public DbSet<Notification> Notifications => _context.Notifications;
    public DbSet<NotificationBroadcast> NotificationBroadcasts => _context.NotificationBroadcasts;
    public DbSet<PushNotificationToken> PushNotificationTokens => _context.PushNotificationTokens;

    // Mobile check-in entities
    public DbSet<NfcTag> NfcTags => _context.NfcTags;
    public DbSet<AttendanceVerificationLog> AttendanceVerificationLogs => _context.AttendanceVerificationLogs;

    // Multi-tenant entities
    public DbSet<Tenant> Tenants => _context.Tenants;
    public DbSet<TenantUserEmail> TenantUserEmails => _context.TenantUserEmails;

    // Platform entities
    public DbSet<PlatformUser> PlatformUsers => _context.PlatformUsers;

    // Subscription & Entitlements
    public DbSet<SubscriptionPlan> SubscriptionPlans => _context.SubscriptionPlans;
    public DbSet<PlanModuleEntitlement> PlanModuleEntitlements => _context.PlanModuleEntitlements;
    public DbSet<PlanFeatureFlag> PlanFeatureFlags => _context.PlanFeatureFlags;
    public DbSet<PlanLimit> PlanLimits => _context.PlanLimits;
    public DbSet<TenantSubscription> TenantSubscriptions => _context.TenantSubscriptions;
    public DbSet<TenantModuleAddOn> TenantModuleAddOns => _context.TenantModuleAddOns;
    public DbSet<TenantFeatureOverride> TenantFeatureOverrides => _context.TenantFeatureOverrides;
    public DbSet<EntitlementChangeLog> EntitlementChangeLogs => _context.EntitlementChangeLogs;

    // Phase 1: Employee Lifecycle
    public DbSet<EmployeeContract> EmployeeContracts => _context.EmployeeContracts;
    public DbSet<EmployeeTransfer> EmployeeTransfers => _context.EmployeeTransfers;
    public DbSet<EmployeePromotion> EmployeePromotions => _context.EmployeePromotions;
    public DbSet<SalaryAdjustment> SalaryAdjustments => _context.SalaryAdjustments;
    public DbSet<EmployeeProfileChange> EmployeeProfileChanges => _context.EmployeeProfileChanges;
    public DbSet<EmployeeBankDetail> EmployeeBankDetails => _context.EmployeeBankDetails;
    public DbSet<EmployeeDependent> EmployeeDependents => _context.EmployeeDependents;
    public DbSet<EmergencyContact> EmergencyContacts => _context.EmergencyContacts;
    public DbSet<EmployeeAddress> EmployeeAddresses => _context.EmployeeAddresses;
    public DbSet<EmployeeEducation> EmployeeEducations => _context.EmployeeEducations;
    public DbSet<EmployeeWorkExperience> EmployeeWorkExperiences => _context.EmployeeWorkExperiences;
    public DbSet<EmployeeVisa> EmployeeVisas => _context.EmployeeVisas;
    public DbSet<JobGrade> JobGrades => _context.JobGrades;

    // Phase 1: Payroll
    public DbSet<SalaryStructure> SalaryStructures => _context.SalaryStructures;
    public DbSet<SalaryComponent> SalaryComponents => _context.SalaryComponents;
    public DbSet<EmployeeSalary> EmployeeSalaries => _context.EmployeeSalaries;
    public DbSet<EmployeeSalaryComponent> EmployeeSalaryComponents => _context.EmployeeSalaryComponents;
    public DbSet<PayrollPeriod> PayrollPeriods => _context.PayrollPeriods;
    public DbSet<PayrollRecord> PayrollRecords => _context.PayrollRecords;
    public DbSet<PayrollRecordDetail> PayrollRecordDetails => _context.PayrollRecordDetails;
    public DbSet<PayrollAdjustment> PayrollAdjustments => _context.PayrollAdjustments;
    public DbSet<TaxConfiguration> TaxConfigurations => _context.TaxConfigurations;
    public DbSet<TaxBracket> TaxBrackets => _context.TaxBrackets;
    public DbSet<SocialInsuranceConfig> SocialInsuranceConfigs => _context.SocialInsuranceConfigs;
    public DbSet<BankTransferFile> BankTransferFiles => _context.BankTransferFiles;
    public DbSet<InsuranceProvider> InsuranceProviders => _context.InsuranceProviders;
    public DbSet<EmployeeInsurance> EmployeeInsurances => _context.EmployeeInsurances;

    // Allowance Management
    public DbSet<AllowanceType> AllowanceTypes => _context.AllowanceTypes;
    public DbSet<AllowancePolicy> AllowancePolicies => _context.AllowancePolicies;
    public DbSet<AllowanceAssignment> AllowanceAssignments => _context.AllowanceAssignments;
    public DbSet<AllowanceRequest> AllowanceRequests => _context.AllowanceRequests;
    public DbSet<AllowanceChangeLog> AllowanceChangeLogs => _context.AllowanceChangeLogs;

    // Phase 1: Offboarding
    public DbSet<ResignationRequest> ResignationRequests => _context.ResignationRequests;
    public DbSet<TerminationRecord> TerminationRecords => _context.TerminationRecords;
    public DbSet<ClearanceChecklist> ClearanceChecklists => _context.ClearanceChecklists;
    public DbSet<ClearanceItem> ClearanceItems => _context.ClearanceItems;
    public DbSet<EndOfServiceBenefit> EndOfServiceBenefits => _context.EndOfServiceBenefits;
    public DbSet<FinalSettlement> FinalSettlements => _context.FinalSettlements;
    public DbSet<ExitInterview> ExitInterviews => _context.ExitInterviews;

    // Phase 2: Recruitment
    public DbSet<JobRequisition> JobRequisitions => _context.JobRequisitions;
    public DbSet<JobPosting> JobPostings => _context.JobPostings;
    public DbSet<Candidate> Candidates => _context.Candidates;
    public DbSet<JobApplication> JobApplications => _context.JobApplications;
    public DbSet<InterviewSchedule> InterviewSchedules => _context.InterviewSchedules;
    public DbSet<InterviewFeedback> InterviewFeedbacks => _context.InterviewFeedbacks;
    public DbSet<OfferLetter> OfferLetters => _context.OfferLetters;

    // Phase 2: Onboarding
    public DbSet<OnboardingTemplate> OnboardingTemplates => _context.OnboardingTemplates;
    public DbSet<OnboardingTemplateTask> OnboardingTemplateTasks => _context.OnboardingTemplateTasks;
    public DbSet<OnboardingProcess> OnboardingProcesses => _context.OnboardingProcesses;
    public DbSet<OnboardingTask> OnboardingTasks => _context.OnboardingTasks;
    public DbSet<OnboardingDocument> OnboardingDocuments => _context.OnboardingDocuments;

    // Phase 2: Performance
    public DbSet<PerformanceReviewCycle> PerformanceReviewCycles => _context.PerformanceReviewCycles;
    public DbSet<PerformanceReview> PerformanceReviews => _context.PerformanceReviews;
    public DbSet<GoalDefinition> GoalDefinitions => _context.GoalDefinitions;
    public DbSet<CompetencyFramework> CompetencyFrameworks => _context.CompetencyFrameworks;
    public DbSet<Competency> Competencies => _context.Competencies;
    public DbSet<CompetencyAssessment> CompetencyAssessments => _context.CompetencyAssessments;
    public DbSet<PerformanceImprovementPlan> PerformanceImprovementPlans => _context.PerformanceImprovementPlans;
    public DbSet<FeedbackRequest360> FeedbackRequests360 => _context.FeedbackRequests360;
    public DbSet<Feedback360Response> Feedback360Responses => _context.Feedback360Responses;

    // File Management
    public DbSet<FileAttachment> FileAttachments => _context.FileAttachments;

    // Phase 3: Documents & Letters
    public DbSet<DocumentCategory> DocumentCategories => _context.DocumentCategories;
    public DbSet<EmployeeDocument> EmployeeDocuments => _context.EmployeeDocuments;
    public DbSet<CompanyPolicy> CompanyPolicies => _context.CompanyPolicies;
    public DbSet<PolicyAcknowledgment> PolicyAcknowledgments => _context.PolicyAcknowledgments;
    public DbSet<LetterTemplate> LetterTemplates => _context.LetterTemplates;
    public DbSet<LetterRequest> LetterRequests => _context.LetterRequests;

    // Phase 3: Expenses
    public DbSet<ExpenseCategory> ExpenseCategories => _context.ExpenseCategories;
    public DbSet<ExpensePolicy> ExpensePolicies => _context.ExpensePolicies;
    public DbSet<ExpenseClaim> ExpenseClaims => _context.ExpenseClaims;
    public DbSet<ExpenseClaimItem> ExpenseClaimItems => _context.ExpenseClaimItems;
    public DbSet<ExpenseReimbursement> ExpenseReimbursements => _context.ExpenseReimbursements;

    // Phase 3: Loans
    public DbSet<LoanType> LoanTypes => _context.LoanTypes;
    public DbSet<LoanPolicy> LoanPolicies => _context.LoanPolicies;
    public DbSet<LoanApplication> LoanApplications => _context.LoanApplications;
    public DbSet<LoanRepayment> LoanRepayments => _context.LoanRepayments;
    public DbSet<SalaryAdvance> SalaryAdvances => _context.SalaryAdvances;

    // Phase 4: Announcements
    public DbSet<AnnouncementCategory> AnnouncementCategories => _context.AnnouncementCategories;
    public DbSet<Announcement> Announcements => _context.Announcements;
    public DbSet<AnnouncementAcknowledgment> AnnouncementAcknowledgments => _context.AnnouncementAcknowledgments;
    public DbSet<AnnouncementAttachment> AnnouncementAttachments => _context.AnnouncementAttachments;

    // Phase 4: Training & Development
    public DbSet<TrainingCategory> TrainingCategories => _context.TrainingCategories;
    public DbSet<TrainingCourse> TrainingCourses => _context.TrainingCourses;
    public DbSet<TrainingProgram> TrainingPrograms => _context.TrainingPrograms;
    public DbSet<TrainingProgramCourse> TrainingProgramCourses => _context.TrainingProgramCourses;
    public DbSet<TrainingSession> TrainingSessions => _context.TrainingSessions;
    public DbSet<TrainingEnrollment> TrainingEnrollments => _context.TrainingEnrollments;
    public DbSet<TrainingAttendance> TrainingAttendanceRecords => _context.TrainingAttendanceRecords;
    public DbSet<TrainingEvaluation> TrainingEvaluations => _context.TrainingEvaluations;
    public DbSet<EmployeeCertification> EmployeeCertifications => _context.EmployeeCertifications;
    public DbSet<TrainingBudget> TrainingBudgets => _context.TrainingBudgets;

    // Phase 4: Employee Relations
    public DbSet<Grievance> Grievances => _context.Grievances;
    public DbSet<GrievanceNote> GrievanceNotes => _context.GrievanceNotes;
    public DbSet<GrievanceAttachment> GrievanceAttachments => _context.GrievanceAttachments;
    public DbSet<DisciplinaryAction> DisciplinaryActions => _context.DisciplinaryActions;
    public DbSet<DisciplinaryAttachment> DisciplinaryAttachments => _context.DisciplinaryAttachments;
    public DbSet<Investigation> Investigations => _context.Investigations;
    public DbSet<InvestigationNote> InvestigationNotes => _context.InvestigationNotes;
    public DbSet<InvestigationAttachment> InvestigationAttachments => _context.InvestigationAttachments;
    public DbSet<CounselingRecord> CounselingRecords => _context.CounselingRecords;

    // Phase 5: Asset Management
    public DbSet<AssetCategory> AssetCategories => _context.AssetCategories;
    public DbSet<Asset> Assets => _context.Assets;
    public DbSet<AssetAssignment> AssetAssignments => _context.AssetAssignments;
    public DbSet<AssetMaintenanceRecord> AssetMaintenanceRecords => _context.AssetMaintenanceRecords;

    // Phase 5: Employee Engagement & Surveys
    public DbSet<SurveyTemplate> SurveyTemplates => _context.SurveyTemplates;
    public DbSet<SurveyQuestion> SurveyQuestions => _context.SurveyQuestions;
    public DbSet<SurveyDistribution> SurveyDistributions => _context.SurveyDistributions;
    public DbSet<SurveyParticipant> SurveyParticipants => _context.SurveyParticipants;
    public DbSet<SurveyResponse> SurveyResponses => _context.SurveyResponses;

    // Phase 5: Advanced Analytics
    public DbSet<AnalyticsSnapshot> AnalyticsSnapshots => _context.AnalyticsSnapshots;
    public DbSet<SavedDashboard> SavedDashboards => _context.SavedDashboards;

    // Phase 6: Timesheet Management
    public DbSet<Project> Projects => _context.Projects;
    public DbSet<ProjectTask> ProjectTasks => _context.ProjectTasks;
    public DbSet<TimesheetPeriod> TimesheetPeriods => _context.TimesheetPeriods;
    public DbSet<Timesheet> Timesheets => _context.Timesheets;
    public DbSet<TimesheetEntry> TimesheetEntries => _context.TimesheetEntries;

    // Phase 6: Succession Planning & Talent Management
    public DbSet<KeyPosition> KeyPositions => _context.KeyPositions;
    public DbSet<TalentProfile> TalentProfiles => _context.TalentProfiles;
    public DbSet<TalentSkill> TalentSkills => _context.TalentSkills;
    public DbSet<SuccessionPlan> SuccessionPlans => _context.SuccessionPlans;
    public DbSet<SuccessionCandidate> SuccessionCandidates => _context.SuccessionCandidates;
    public DbSet<CareerPath> CareerPaths => _context.CareerPaths;
    public DbSet<CareerPathStep> CareerPathSteps => _context.CareerPathSteps;

    // Phase 6: Benefits Administration
    public DbSet<BenefitPlan> BenefitPlans => _context.BenefitPlans;
    public DbSet<BenefitPlanOption> BenefitPlanOptions => _context.BenefitPlanOptions;
    public DbSet<BenefitEligibilityRule> BenefitEligibilityRules => _context.BenefitEligibilityRules;
    public DbSet<OpenEnrollmentPeriod> OpenEnrollmentPeriods => _context.OpenEnrollmentPeriods;
    public DbSet<BenefitEnrollment> BenefitEnrollments => _context.BenefitEnrollments;
    public DbSet<BenefitDependent> BenefitDependents => _context.BenefitDependents;
    public DbSet<BenefitClaim> BenefitClaims => _context.BenefitClaims;

    // Phase 7: Enhancements
    public DbSet<ShiftSwapRequest> ShiftSwapRequests => _context.ShiftSwapRequests;
    public DbSet<OnCallSchedule> OnCallSchedules => _context.OnCallSchedules;
    public DbSet<CompensatoryOff> CompensatoryOffs => _context.CompensatoryOffs;
    public DbSet<LeaveEncashment> LeaveEncashments => _context.LeaveEncashments;
    public DbSet<CustomReportDefinition> CustomReportDefinitions => _context.CustomReportDefinitions;
    public DbSet<ScheduledReport> ScheduledReports => _context.ScheduledReports;

    // Settings & Configuration
    public DbSet<OvertimeConfiguration> OvertimeConfigurations => _context.OvertimeConfigurations;
    public DbSet<OffDay> OffDays => _context.OffDays;

    // Tenant Configuration & Policy Framework
    public DbSet<TenantSettings> TenantSettings => _context.TenantSettings;
    public DbSet<BranchSettingsOverride> BranchSettingsOverrides => _context.BranchSettingsOverrides;
    public DbSet<DepartmentSettingsOverride> DepartmentSettingsOverrides => _context.DepartmentSettingsOverrides;
    public DbSet<PolicyTemplate> PolicyTemplates => _context.PolicyTemplates;
    public DbSet<PolicyTemplateItem> PolicyTemplateItems => _context.PolicyTemplateItems;
    public DbSet<SetupStep> SetupSteps => _context.SetupSteps;

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }

    /// <summary>
    /// Clears the change tracker to remove all tracked entities.
    /// Useful after bulk operations to ensure fresh data is loaded.
    /// </summary>
    public void ClearChangeTracker()
    {
        _context.ChangeTracker.Clear();
    }
}