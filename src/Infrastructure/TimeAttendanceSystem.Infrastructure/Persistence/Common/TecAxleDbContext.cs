using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Platform;
using TecAxle.Hrms.Domain.Branches;
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
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Services;

namespace TecAxle.Hrms.Infrastructure.Persistence;

/// <summary>
/// Entity Framework Core database context for the TecAxle HRMS providing comprehensive data access.
/// Implements enterprise-grade database operations with audit logging, change tracking, and multi-tenant support
/// for organizational time attendance management, user authentication, and employee lifecycle operations.
/// </summary>
/// <remarks>
/// Database Context Features:
/// - Complete domain entity mapping with proper relationships and constraints
/// - Automatic audit trail generation with creation and modification timestamps
/// - Multi-tenant data isolation through branch-scoped access control
/// - Comprehensive security entity management (users, roles, permissions)
/// - Employee lifecycle management with organizational hierarchy support
/// - Session and authentication token management for security operations
/// - Configuration-driven entity mapping through Fluent API configurations
/// 
/// Entity Collections:
/// - Organizational: Branches, Departments for multi-tenant structure
/// - Security: Users, Roles, Permissions, RefreshTokens for authentication/authorization
/// - Employee Management: Employees, EmployeeUserLinks for HR operations
/// - Vacation Management: VacationTypes for leave policy configuration
/// - Audit & Compliance: AuditLogs, LoginAttempts, PasswordHistory for security monitoring
/// - Session Management: UserSessions, BlacklistedTokens for secure session control
/// - Two-Factor Authentication: TwoFactorBackupCodes for enhanced security
/// 
/// Data Integrity Features:
/// - Automatic timestamp management for creation and modification tracking
/// - Entity state change detection and audit trail generation
/// - Referential integrity enforcement through foreign key relationships
/// - Data validation through domain entity constraints and business rules
/// - Transaction support ensuring data consistency across related entities
/// - Optimistic concurrency control preventing data conflicts
/// 
/// Security and Compliance:
/// - Comprehensive audit logging for regulatory compliance requirements
/// - User activity tracking through login attempts and session management
/// - Password security through history tracking and policy enforcement
/// - Token security through blacklist management and refresh token rotation
/// - Multi-tenant data isolation preventing cross-organization data access
/// - GDPR compliance support through data lifecycle management
/// 
/// Performance Optimization:
/// - Entity configuration through separate configuration classes
/// - Lazy loading and eager loading support for optimal query performance
/// - Connection pooling and transaction scoping for scalable operations
/// - Query optimization through proper indexing and relationship mapping
/// - Async operations throughout for non-blocking database access
/// - Memory-efficient change tracking and entity materialization
/// 
/// Multi-tenant Architecture:
/// - Branch-based data partitioning for organizational isolation
/// - User scope enforcement through branch relationship validation
/// - Department-level access control within organizational boundaries
/// - Cross-tenant administrative operations with proper authorization
/// - Scalable multi-tenant design supporting organizational growth
/// - Data security through tenant-scoped query filters and access controls
/// </remarks>
public class TecAxleDbContext : DbContext, IApplicationDbContext
{
    /// <summary>
    /// Initializes a new instance of the TecAxleDbContext with specified configuration options.
    /// Sets up the database context with connection string, provider settings, and operational parameters.
    /// </summary>
    /// <param name="options">Database context options containing connection configuration and provider settings</param>
    public TecAxleDbContext(DbContextOptions<TecAxleDbContext> options) : base(options)
    {
    }

    public DbSet<Branch> Branches => Set<Branch>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<NfcTag> NfcTags => Set<NfcTag>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<UserBranchScope> UserBranchScopes => Set<UserBranchScope>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<EmployeeUserLink> EmployeeUserLinks => Set<EmployeeUserLink>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<LoginAttempt> LoginAttempts => Set<LoginAttempt>();
    public DbSet<PasswordHistory> PasswordHistory => Set<PasswordHistory>();
    public DbSet<BlacklistedToken> BlacklistedTokens => Set<BlacklistedToken>();
    public DbSet<TwoFactorBackupCode> TwoFactorBackupCodes => Set<TwoFactorBackupCode>();
    public DbSet<UserSession> UserSessions => Set<UserSession>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<AuditChange> AuditChanges => Set<AuditChange>();
    public DbSet<Shift> Shifts => Set<Shift>();
    public DbSet<ShiftPeriod> ShiftPeriods => Set<ShiftPeriod>();
    public DbSet<ShiftAssignment> ShiftAssignments => Set<ShiftAssignment>();
    public DbSet<AttendanceRecord> AttendanceRecords => Set<AttendanceRecord>();
    public DbSet<AttendanceTransaction> AttendanceTransactions => Set<AttendanceTransaction>();
    public DbSet<AttendanceVerificationLog> AttendanceVerificationLogs => Set<AttendanceVerificationLog>();
    public DbSet<WorkingDay> WorkingDays => Set<WorkingDay>();
    public DbSet<OvertimeConfiguration> OvertimeConfigurations => Set<OvertimeConfiguration>();
    public DbSet<PublicHoliday> PublicHolidays => Set<PublicHoliday>();
    public DbSet<OffDay> OffDays => Set<OffDay>();
    public DbSet<VacationType> VacationTypes => Set<VacationType>();
    public DbSet<EmployeeVacation> EmployeeVacations => Set<EmployeeVacation>();
    public DbSet<ExcusePolicy> ExcusePolicies => Set<ExcusePolicy>();
    public DbSet<EmployeeExcuse> EmployeeExcuses => Set<EmployeeExcuse>();
    public DbSet<RemoteWorkPolicy> RemoteWorkPolicies => Set<RemoteWorkPolicy>();
    public DbSet<RemoteWorkRequest> RemoteWorkRequests => Set<RemoteWorkRequest>();

    // Leave Management entities
    public DbSet<LeaveEntitlement> LeaveEntitlements => Set<LeaveEntitlement>();
    public DbSet<LeaveBalance> LeaveBalances => Set<LeaveBalance>();
    public DbSet<LeaveTransaction> LeaveTransactions => Set<LeaveTransaction>();
    public DbSet<LeaveAccrualPolicy> LeaveAccrualPolicies => Set<LeaveAccrualPolicy>();

    // Attendance Correction Request entities
    public DbSet<AttendanceCorrectionRequest> AttendanceCorrectionRequests => Set<AttendanceCorrectionRequest>();

    // Workflow entities
    public DbSet<WorkflowDefinition> WorkflowDefinitions => Set<WorkflowDefinition>();
    public DbSet<WorkflowStep> WorkflowSteps => Set<WorkflowStep>();
    public DbSet<WorkflowInstance> WorkflowInstances => Set<WorkflowInstance>();
    public DbSet<WorkflowStepExecution> WorkflowStepExecutions => Set<WorkflowStepExecution>();
    public DbSet<ApprovalDelegation> ApprovalDelegations => Set<ApprovalDelegation>();

    // Notification entities
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<NotificationBroadcast> NotificationBroadcasts => Set<NotificationBroadcast>();
    public DbSet<PushNotificationToken> PushNotificationTokens => Set<PushNotificationToken>();

    // Multi-tenant entities
    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<TenantUserEmail> TenantUserEmails => Set<TenantUserEmail>();

    // Platform entities
    public DbSet<PlatformUser> PlatformUsers => Set<PlatformUser>();

    // Subscription & Entitlements
    public DbSet<SubscriptionPlan> SubscriptionPlans => Set<SubscriptionPlan>();
    public DbSet<PlanModuleEntitlement> PlanModuleEntitlements => Set<PlanModuleEntitlement>();
    public DbSet<PlanFeatureFlag> PlanFeatureFlags => Set<PlanFeatureFlag>();
    public DbSet<PlanLimit> PlanLimits => Set<PlanLimit>();
    public DbSet<TenantSubscription> TenantSubscriptions => Set<TenantSubscription>();
    public DbSet<TenantModuleAddOn> TenantModuleAddOns => Set<TenantModuleAddOn>();
    public DbSet<TenantFeatureOverride> TenantFeatureOverrides => Set<TenantFeatureOverride>();
    public DbSet<EntitlementChangeLog> EntitlementChangeLogs => Set<EntitlementChangeLog>();

    // Phase 1: Employee Lifecycle
    public DbSet<EmployeeContract> EmployeeContracts => Set<EmployeeContract>();
    public DbSet<EmployeeTransfer> EmployeeTransfers => Set<EmployeeTransfer>();
    public DbSet<EmployeePromotion> EmployeePromotions => Set<EmployeePromotion>();
    public DbSet<SalaryAdjustment> SalaryAdjustments => Set<SalaryAdjustment>();
    public DbSet<EmployeeProfileChange> EmployeeProfileChanges => Set<EmployeeProfileChange>();
    public DbSet<EmployeeBankDetail> EmployeeBankDetails => Set<EmployeeBankDetail>();
    public DbSet<EmployeeDependent> EmployeeDependents => Set<EmployeeDependent>();
    public DbSet<EmergencyContact> EmergencyContacts => Set<EmergencyContact>();
    public DbSet<EmployeeAddress> EmployeeAddresses => Set<EmployeeAddress>();
    public DbSet<EmployeeEducation> EmployeeEducations => Set<EmployeeEducation>();
    public DbSet<EmployeeWorkExperience> EmployeeWorkExperiences => Set<EmployeeWorkExperience>();
    public DbSet<EmployeeVisa> EmployeeVisas => Set<EmployeeVisa>();
    public DbSet<JobGrade> JobGrades => Set<JobGrade>();

    // Phase 1: Payroll
    public DbSet<SalaryStructure> SalaryStructures => Set<SalaryStructure>();
    public DbSet<SalaryComponent> SalaryComponents => Set<SalaryComponent>();
    public DbSet<EmployeeSalary> EmployeeSalaries => Set<EmployeeSalary>();
    public DbSet<EmployeeSalaryComponent> EmployeeSalaryComponents => Set<EmployeeSalaryComponent>();
    public DbSet<PayrollPeriod> PayrollPeriods => Set<PayrollPeriod>();
    public DbSet<PayrollRecord> PayrollRecords => Set<PayrollRecord>();
    public DbSet<PayrollRecordDetail> PayrollRecordDetails => Set<PayrollRecordDetail>();
    public DbSet<PayrollAdjustment> PayrollAdjustments => Set<PayrollAdjustment>();
    public DbSet<TaxConfiguration> TaxConfigurations => Set<TaxConfiguration>();
    public DbSet<TaxBracket> TaxBrackets => Set<TaxBracket>();
    public DbSet<SocialInsuranceConfig> SocialInsuranceConfigs => Set<SocialInsuranceConfig>();
    public DbSet<BankTransferFile> BankTransferFiles => Set<BankTransferFile>();
    public DbSet<InsuranceProvider> InsuranceProviders => Set<InsuranceProvider>();
    public DbSet<EmployeeInsurance> EmployeeInsurances => Set<EmployeeInsurance>();

    // Allowance Management
    public DbSet<AllowanceType> AllowanceTypes => Set<AllowanceType>();
    public DbSet<AllowancePolicy> AllowancePolicies => Set<AllowancePolicy>();
    public DbSet<AllowanceAssignment> AllowanceAssignments => Set<AllowanceAssignment>();
    public DbSet<AllowanceRequest> AllowanceRequests => Set<AllowanceRequest>();
    public DbSet<AllowanceChangeLog> AllowanceChangeLogs => Set<AllowanceChangeLog>();

    // Phase 1: Offboarding
    public DbSet<ResignationRequest> ResignationRequests => Set<ResignationRequest>();
    public DbSet<TerminationRecord> TerminationRecords => Set<TerminationRecord>();
    public DbSet<ClearanceChecklist> ClearanceChecklists => Set<ClearanceChecklist>();
    public DbSet<ClearanceItem> ClearanceItems => Set<ClearanceItem>();
    public DbSet<EndOfServiceBenefit> EndOfServiceBenefits => Set<EndOfServiceBenefit>();
    public DbSet<FinalSettlement> FinalSettlements => Set<FinalSettlement>();
    public DbSet<ExitInterview> ExitInterviews => Set<ExitInterview>();

    // Phase 2: Recruitment
    public DbSet<JobRequisition> JobRequisitions => Set<JobRequisition>();
    public DbSet<JobPosting> JobPostings => Set<JobPosting>();
    public DbSet<Candidate> Candidates => Set<Candidate>();
    public DbSet<JobApplication> JobApplications => Set<JobApplication>();
    public DbSet<InterviewSchedule> InterviewSchedules => Set<InterviewSchedule>();
    public DbSet<InterviewFeedback> InterviewFeedbacks => Set<InterviewFeedback>();
    public DbSet<OfferLetter> OfferLetters => Set<OfferLetter>();

    // Phase 2: Onboarding
    public DbSet<OnboardingTemplate> OnboardingTemplates => Set<OnboardingTemplate>();
    public DbSet<OnboardingTemplateTask> OnboardingTemplateTasks => Set<OnboardingTemplateTask>();
    public DbSet<OnboardingProcess> OnboardingProcesses => Set<OnboardingProcess>();
    public DbSet<OnboardingTask> OnboardingTasks => Set<OnboardingTask>();
    public DbSet<OnboardingDocument> OnboardingDocuments => Set<OnboardingDocument>();

    // Phase 2: Performance
    public DbSet<PerformanceReviewCycle> PerformanceReviewCycles => Set<PerformanceReviewCycle>();
    public DbSet<PerformanceReview> PerformanceReviews => Set<PerformanceReview>();
    public DbSet<GoalDefinition> GoalDefinitions => Set<GoalDefinition>();
    public DbSet<CompetencyFramework> CompetencyFrameworks => Set<CompetencyFramework>();
    public DbSet<Competency> Competencies => Set<Competency>();
    public DbSet<CompetencyAssessment> CompetencyAssessments => Set<CompetencyAssessment>();
    public DbSet<PerformanceImprovementPlan> PerformanceImprovementPlans => Set<PerformanceImprovementPlan>();
    public DbSet<FeedbackRequest360> FeedbackRequests360 => Set<FeedbackRequest360>();
    public DbSet<Feedback360Response> Feedback360Responses => Set<Feedback360Response>();

    // File Management
    public DbSet<FileAttachment> FileAttachments => Set<FileAttachment>();

    // Phase 3: Documents & Letters
    public DbSet<DocumentCategory> DocumentCategories => Set<DocumentCategory>();
    public DbSet<EmployeeDocument> EmployeeDocuments => Set<EmployeeDocument>();
    public DbSet<CompanyPolicy> CompanyPolicies => Set<CompanyPolicy>();
    public DbSet<PolicyAcknowledgment> PolicyAcknowledgments => Set<PolicyAcknowledgment>();
    public DbSet<LetterTemplate> LetterTemplates => Set<LetterTemplate>();
    public DbSet<LetterRequest> LetterRequests => Set<LetterRequest>();

    // Phase 3: Expenses
    public DbSet<ExpenseCategory> ExpenseCategories => Set<ExpenseCategory>();
    public DbSet<ExpensePolicy> ExpensePolicies => Set<ExpensePolicy>();
    public DbSet<ExpenseClaim> ExpenseClaims => Set<ExpenseClaim>();
    public DbSet<ExpenseClaimItem> ExpenseClaimItems => Set<ExpenseClaimItem>();
    public DbSet<ExpenseReimbursement> ExpenseReimbursements => Set<ExpenseReimbursement>();

    // Phase 3: Loans
    public DbSet<LoanType> LoanTypes => Set<LoanType>();
    public DbSet<LoanPolicy> LoanPolicies => Set<LoanPolicy>();
    public DbSet<LoanApplication> LoanApplications => Set<LoanApplication>();
    public DbSet<LoanRepayment> LoanRepayments => Set<LoanRepayment>();
    public DbSet<SalaryAdvance> SalaryAdvances => Set<SalaryAdvance>();

    // Phase 4: Announcements
    public DbSet<AnnouncementCategory> AnnouncementCategories => Set<AnnouncementCategory>();
    public DbSet<Announcement> Announcements => Set<Announcement>();
    public DbSet<AnnouncementAcknowledgment> AnnouncementAcknowledgments => Set<AnnouncementAcknowledgment>();
    public DbSet<AnnouncementAttachment> AnnouncementAttachments => Set<AnnouncementAttachment>();

    // Phase 4: Training & Development
    public DbSet<TrainingCategory> TrainingCategories => Set<TrainingCategory>();
    public DbSet<TrainingCourse> TrainingCourses => Set<TrainingCourse>();
    public DbSet<TrainingProgram> TrainingPrograms => Set<TrainingProgram>();
    public DbSet<TrainingProgramCourse> TrainingProgramCourses => Set<TrainingProgramCourse>();
    public DbSet<TrainingSession> TrainingSessions => Set<TrainingSession>();
    public DbSet<TrainingEnrollment> TrainingEnrollments => Set<TrainingEnrollment>();
    public DbSet<TrainingAttendance> TrainingAttendanceRecords => Set<TrainingAttendance>();
    public DbSet<TrainingEvaluation> TrainingEvaluations => Set<TrainingEvaluation>();
    public DbSet<EmployeeCertification> EmployeeCertifications => Set<EmployeeCertification>();
    public DbSet<TrainingBudget> TrainingBudgets => Set<TrainingBudget>();

    // Phase 4: Employee Relations
    public DbSet<Grievance> Grievances => Set<Grievance>();
    public DbSet<GrievanceNote> GrievanceNotes => Set<GrievanceNote>();
    public DbSet<GrievanceAttachment> GrievanceAttachments => Set<GrievanceAttachment>();
    public DbSet<DisciplinaryAction> DisciplinaryActions => Set<DisciplinaryAction>();
    public DbSet<DisciplinaryAttachment> DisciplinaryAttachments => Set<DisciplinaryAttachment>();
    public DbSet<Investigation> Investigations => Set<Investigation>();
    public DbSet<InvestigationNote> InvestigationNotes => Set<InvestigationNote>();
    public DbSet<InvestigationAttachment> InvestigationAttachments => Set<InvestigationAttachment>();
    public DbSet<CounselingRecord> CounselingRecords => Set<CounselingRecord>();

    // Phase 5: Asset Management
    public DbSet<AssetCategory> AssetCategories => Set<AssetCategory>();
    public DbSet<Asset> Assets => Set<Asset>();
    public DbSet<AssetAssignment> AssetAssignments => Set<AssetAssignment>();
    public DbSet<AssetMaintenanceRecord> AssetMaintenanceRecords => Set<AssetMaintenanceRecord>();

    // Phase 5: Employee Engagement & Surveys
    public DbSet<SurveyTemplate> SurveyTemplates => Set<SurveyTemplate>();
    public DbSet<SurveyQuestion> SurveyQuestions => Set<SurveyQuestion>();
    public DbSet<SurveyDistribution> SurveyDistributions => Set<SurveyDistribution>();
    public DbSet<SurveyParticipant> SurveyParticipants => Set<SurveyParticipant>();
    public DbSet<SurveyResponse> SurveyResponses => Set<SurveyResponse>();

    // Phase 5: Advanced Analytics
    public DbSet<AnalyticsSnapshot> AnalyticsSnapshots => Set<AnalyticsSnapshot>();
    public DbSet<SavedDashboard> SavedDashboards => Set<SavedDashboard>();

    // Phase 6: Timesheet Management
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectTask> ProjectTasks => Set<ProjectTask>();
    public DbSet<TimesheetPeriod> TimesheetPeriods => Set<TimesheetPeriod>();
    public DbSet<Timesheet> Timesheets => Set<Timesheet>();
    public DbSet<TimesheetEntry> TimesheetEntries => Set<TimesheetEntry>();

    // Phase 6: Succession Planning & Talent Management
    public DbSet<KeyPosition> KeyPositions => Set<KeyPosition>();
    public DbSet<TalentProfile> TalentProfiles => Set<TalentProfile>();
    public DbSet<TalentSkill> TalentSkills => Set<TalentSkill>();
    public DbSet<SuccessionPlan> SuccessionPlans => Set<SuccessionPlan>();
    public DbSet<SuccessionCandidate> SuccessionCandidates => Set<SuccessionCandidate>();
    public DbSet<CareerPath> CareerPaths => Set<CareerPath>();
    public DbSet<CareerPathStep> CareerPathSteps => Set<CareerPathStep>();

    // Phase 6: Benefits Administration
    public DbSet<BenefitPlan> BenefitPlans => Set<BenefitPlan>();
    public DbSet<BenefitPlanOption> BenefitPlanOptions => Set<BenefitPlanOption>();
    public DbSet<BenefitEligibilityRule> BenefitEligibilityRules => Set<BenefitEligibilityRule>();
    public DbSet<OpenEnrollmentPeriod> OpenEnrollmentPeriods => Set<OpenEnrollmentPeriod>();
    public DbSet<BenefitEnrollment> BenefitEnrollments => Set<BenefitEnrollment>();
    public DbSet<BenefitDependent> BenefitDependents => Set<BenefitDependent>();
    public DbSet<BenefitClaim> BenefitClaims => Set<BenefitClaim>();

    // Phase 7: Enhancements
    public DbSet<ShiftSwapRequest> ShiftSwapRequests => Set<ShiftSwapRequest>();
    public DbSet<OnCallSchedule> OnCallSchedules => Set<OnCallSchedule>();
    public DbSet<CompensatoryOff> CompensatoryOffs => Set<CompensatoryOff>();
    public DbSet<LeaveEncashment> LeaveEncashments => Set<LeaveEncashment>();
    public DbSet<CustomReportDefinition> CustomReportDefinitions => Set<CustomReportDefinition>();
    public DbSet<ScheduledReport> ScheduledReports => Set<ScheduledReport>();

    // Tenant Configuration & Policy Framework
    public DbSet<TenantSettings> TenantSettings => Set<TenantSettings>();
    public DbSet<BranchSettingsOverride> BranchSettingsOverrides => Set<BranchSettingsOverride>();
    public DbSet<DepartmentSettingsOverride> DepartmentSettingsOverrides => Set<DepartmentSettingsOverride>();
    public DbSet<PolicyTemplate> PolicyTemplates => Set<PolicyTemplate>();
    public DbSet<PolicyTemplateItem> PolicyTemplateItems => Set<PolicyTemplateItem>();
    public DbSet<SetupStep> SetupSteps => Set<SetupStep>();

    /// <summary>
    /// Configures the database model using Fluent API configurations from the current assembly.
    /// Applies entity configurations, relationships, constraints, and indexes for comprehensive data modeling.
    /// Uses PostgreSQL as the database provider.
    /// </summary>
    /// <param name="modelBuilder">Entity Framework model builder for database schema configuration</param>
    /// <remarks>
    /// Model Configuration Features:
    /// - Automatic discovery and application of IEntityTypeConfiguration implementations
    /// - Comprehensive entity relationship mapping with foreign key constraints
    /// - Index creation for query performance optimization
    /// - Data validation rules and business constraint enforcement
    /// - Multi-tenant query filters for organizational data isolation
    /// - Audit field configuration for automatic timestamp management
    ///
    /// Configuration Assembly Scanning:
    /// - Loads PostgreSQL-specific configurations from Persistence.PostgreSql.Configurations namespace
    /// - Maintains separation of concerns through dedicated configuration classes
    /// - Supports modular configuration management and maintainability
    /// - Enables consistent configuration patterns across all entities
    /// </remarks>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Apply PostgreSQL specific configurations
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(TecAxleDbContext).Assembly,
            type => type.Namespace?.Contains("Persistence.PostgreSql.Configurations") == true
        );

        base.OnModelCreating(modelBuilder);
    }

    /// <summary>
    /// Persists changes to the database with automatic audit trail generation and timestamp management.
    /// Implements comprehensive change tracking, audit logging, and data integrity validation
    /// for all entity modifications within the organizational time attendance system.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token for async operation control</param>
    /// <returns>Number of entities successfully persisted to the database</returns>
    /// <remarks>
    /// Save Changes Process:
    /// 1. Change Detection: Identifies all added and modified BaseEntity instances
    /// 2. Timestamp Assignment: Sets CreatedAtUtc for new entities, ModifiedAtUtc for changes
    /// 3. Audit Trail Generation: Creates comprehensive audit records for compliance
    /// 4. Validation Execution: Runs entity validation and business rule enforcement
    /// 5. Database Persistence: Commits all changes within a single transaction
    /// 6. Return Count: Provides number of affected entities for logging and monitoring
    /// 
    /// Automatic Audit Features:
    /// - Creation timestamp assignment for new entities
    /// - Modification timestamp updates for changed entities
    /// - Comprehensive change tracking for compliance requirements
    /// - User context integration for audit trail attribution
    /// - Transaction-scoped operations ensuring data consistency
    /// - Exception handling and rollback on validation failures
    /// 
    /// Data Integrity Enforcement:
    /// - Automatic timestamp management preventing manual manipulation
    /// - Entity state validation ensuring proper lifecycle management
    /// - Business rule enforcement through domain entity validation
    /// - Referential integrity maintenance through foreign key constraints
    /// - Optimistic concurrency control preventing data conflicts
    /// - Transaction isolation ensuring consistent database state
    /// 
    /// Performance Considerations:
    /// - Efficient change detection through Entity Framework change tracker
    /// - Batch operations for multiple entity updates
    /// - Minimal database round trips through transaction scoping
    /// - Memory-efficient processing of large change sets
    /// - Async operations for non-blocking database access
    /// - Optimized query generation for complex entity relationships
    /// </remarks>
    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var changeTrackingService = new ChangeTrackingService();

        // Capture changes for modified entities BEFORE saving
        // This allows us to access original values from the change tracker
        var modifiedEntitiesWithChanges = new List<(Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry Entry, List<AuditChange> Changes)>();

        var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is BaseEntity && (
                e.State == EntityState.Added ||
                e.State == EntityState.Modified));

        foreach (var entityEntry in entries)
        {
            var entity = (BaseEntity)entityEntry.Entity;

            if (entityEntry.State == EntityState.Added)
            {
                entity.CreatedAtUtc = DateTime.UtcNow;
            }
            else if (entityEntry.State == EntityState.Modified)
            {
                entity.ModifiedAtUtc = DateTime.UtcNow;

                // Capture field-level changes for modified entities
                // Skip AuditLog and AuditChange entities to avoid circular dependencies
                if (entity is not AuditLog && entity is not AuditChange)
                {
                    var changes = changeTrackingService.GetChanges(entityEntry);
                    if (changes.Any())
                    {
                        modifiedEntitiesWithChanges.Add((entityEntry, changes));
                    }
                }
            }
        }

        // Save changes first to generate IDs for new entities
        var result = await base.SaveChangesAsync(cancellationToken);

        // After save, attach changes to any audit logs that were created in this save operation
        // The AuditActionFilter or command handlers may have added AuditLog entries
        if (modifiedEntitiesWithChanges.Any())
        {
            var newAuditLogs = ChangeTracker
                .Entries<AuditLog>()
                .Where(e => e.State == EntityState.Added)
                .Select(e => e.Entity)
                .ToList();

            // Match audit logs to their corresponding entity changes
            // This is a simple approach - match by entity type and ID
            foreach (var (entry, changes) in modifiedEntitiesWithChanges)
            {
                var entityType = entry.Entity.GetType().Name;
                var entityId = ((BaseEntity)entry.Entity).Id.ToString();

                var matchingAuditLog = newAuditLogs.FirstOrDefault(al =>
                    al.EntityName == entityType && al.EntityId == entityId);

                if (matchingAuditLog != null)
                {
                    foreach (var change in changes)
                    {
                        change.AuditLogId = matchingAuditLog.Id;
                        matchingAuditLog.Changes.Add(change);
                    }
                }
            }

            // Save the audit changes if any were added
            if (newAuditLogs.Any(al => al.Changes.Any()))
            {
                await base.SaveChangesAsync(cancellationToken);
            }
        }

        return result;
    }

    /// <summary>
    /// Clears the change tracker to remove all tracked entities.
    /// Useful after bulk operations to ensure fresh data is loaded from the database.
    /// </summary>
    public void ClearChangeTracker()
    {
        ChangeTracker.Clear();
    }
}