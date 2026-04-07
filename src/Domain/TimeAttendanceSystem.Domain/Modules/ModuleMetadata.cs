using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Domain.Modules;

/// <summary>
/// Provides static metadata for each system module including display names,
/// permission resource mappings, core flags, and background job associations.
/// </summary>
public static class ModuleMetadata
{
    public record ModuleInfo(
        string Name,
        string NameAr,
        string Description,
        string DescriptionAr,
        string Icon,
        bool IsCore,
        IReadOnlyList<string> PermissionResources,
        IReadOnlyList<SystemModule> DependsOn,
        IReadOnlyList<string> BackgroundJobTypes
    );

    private static readonly Dictionary<SystemModule, ModuleInfo> _modules = new()
    {
        [SystemModule.Core] = new ModuleInfo(
            Name: "Core",
            NameAr: "النظام الأساسي",
            Description: "Core platform functionality including users, roles, branches, departments, and employees",
            DescriptionAr: "وظائف المنصة الأساسية بما في ذلك المستخدمين والأدوار والفروع والأقسام والموظفين",
            Icon: "fa-cog",
            IsCore: true,
            PermissionResources: new[] {
                PermissionResources.User, PermissionResources.Role, PermissionResources.Permission,
                PermissionResources.Branch, PermissionResources.Department, PermissionResources.Employee,
                PermissionResources.Dashboard, PermissionResources.Notification, PermissionResources.Audit,
                PermissionResources.Settings, PermissionResources.Session, PermissionResources.System,
                PermissionResources.Report
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: Array.Empty<string>()
        ),

        [SystemModule.TimeAttendance] = new ModuleInfo(
            Name: "Time & Attendance",
            NameAr: "الحضور والانصراف",
            Description: "Shift management, attendance tracking, scheduling, and overtime configuration",
            DescriptionAr: "إدارة الورديات وتتبع الحضور والجدولة وتكوين العمل الإضافي",
            Icon: "fa-user-clock",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.Shift, PermissionResources.Attendance,
                PermissionResources.Schedule, PermissionResources.PublicHoliday
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] {
                "DailyAttendanceGenerationJob", "EndOfDayAttendanceFinalizationJob"
            }
        ),

        [SystemModule.LeaveManagement] = new ModuleInfo(
            Name: "Leave Management",
            NameAr: "إدارة الإجازات",
            Description: "Vacation types, leave requests, excuses, leave balances, and accruals",
            DescriptionAr: "أنواع الإجازات وطلبات الإجازة والأعذار وأرصدة الإجازات والاستحقاقات",
            Icon: "fa-calendar-check",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.VacationType, PermissionResources.Vacation,
                PermissionResources.Excuse, PermissionResources.ExcusePolicy,
                PermissionResources.LeaveBalance,
                PermissionResources.CompensatoryOff, PermissionResources.LeaveEncashment
            },
            DependsOn: new[] { SystemModule.TimeAttendance },
            BackgroundJobTypes: new[] {
                "MonthlyLeaveAccrualJob", "CompensatoryOffExpiryJob"
            }
        ),

        [SystemModule.RemoteWork] = new ModuleInfo(
            Name: "Remote Work",
            NameAr: "العمل عن بُعد",
            Description: "Remote work policies and request management",
            DescriptionAr: "سياسات العمل عن بُعد وإدارة الطلبات",
            Icon: "fa-laptop-house",
            IsCore: false,
            PermissionResources: Array.Empty<string>(),
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: Array.Empty<string>()
        ),

        [SystemModule.Workflows] = new ModuleInfo(
            Name: "Workflows",
            NameAr: "سير العمل",
            Description: "Approval workflow engine and delegation management",
            DescriptionAr: "محرك سير عمل الموافقات وإدارة التفويض",
            Icon: "fa-project-diagram",
            IsCore: true,
            PermissionResources: new[] {
                PermissionResources.Workflow, PermissionResources.Approval
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] { "WorkflowTimeoutProcessingJob" }
        ),

        [SystemModule.EmployeeLifecycle] = new ModuleInfo(
            Name: "Employee Lifecycle",
            NameAr: "دورة حياة الموظف",
            Description: "Contracts, transfers, promotions, salary adjustments, and job grades",
            DescriptionAr: "العقود والنقل والترقيات وتعديلات الرواتب والدرجات الوظيفية",
            Icon: "fa-user-tie",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.Contract, PermissionResources.Transfer,
                PermissionResources.Promotion, PermissionResources.SalaryAdjustment,
                PermissionResources.JobGrade
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] {
                "ContractExpiryAlertJob", "VisaExpiryAlertJob", "ApplyScheduledProfileChangesJob"
            }
        ),

        [SystemModule.Payroll] = new ModuleInfo(
            Name: "Payroll",
            NameAr: "الرواتب",
            Description: "Salary structures, payroll processing, tax configuration, and social insurance",
            DescriptionAr: "هياكل الرواتب ومعالجة الرواتب وتكوين الضرائب والتأمينات الاجتماعية",
            Icon: "fa-money-check-alt",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.Payroll, PermissionResources.SalaryStructure,
                PermissionResources.TaxConfiguration, PermissionResources.SocialInsurance,
                PermissionResources.Insurance
            },
            DependsOn: new[] { SystemModule.EmployeeLifecycle },
            BackgroundJobTypes: Array.Empty<string>()
        ),

        [SystemModule.Allowances] = new ModuleInfo(
            Name: "Allowances",
            NameAr: "البدلات",
            Description: "Allowance types, policies, assignments, and requests",
            DescriptionAr: "أنواع البدلات والسياسات والتخصيصات والطلبات",
            Icon: "fa-hand-holding-usd",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.AllowanceType, PermissionResources.AllowancePolicy,
                PermissionResources.AllowanceAssignment, PermissionResources.AllowanceRequest
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] { "ExpireTemporaryAllowancesJob" }
        ),

        [SystemModule.Offboarding] = new ModuleInfo(
            Name: "Offboarding",
            NameAr: "إنهاء الخدمة",
            Description: "Resignations, terminations, clearance, end-of-service, and final settlements",
            DescriptionAr: "الاستقالات والفصل والمخالصات ومكافأة نهاية الخدمة والتسويات النهائية",
            Icon: "fa-door-open",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.Resignation, PermissionResources.Termination,
                PermissionResources.Clearance, PermissionResources.EndOfService,
                PermissionResources.FinalSettlement, PermissionResources.ExitInterview
            },
            DependsOn: new[] { SystemModule.EmployeeLifecycle },
            BackgroundJobTypes: Array.Empty<string>()
        ),

        [SystemModule.Recruitment] = new ModuleInfo(
            Name: "Recruitment",
            NameAr: "التوظيف",
            Description: "Job requisitions, postings, candidates, applications, interviews, and offers",
            DescriptionAr: "طلبات التوظيف والإعلانات والمرشحين والطلبات والمقابلات والعروض",
            Icon: "fa-briefcase",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.JobRequisition, PermissionResources.JobPosting,
                PermissionResources.Candidate, PermissionResources.JobApplication,
                PermissionResources.Interview, PermissionResources.OfferLetter
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: Array.Empty<string>()
        ),

        [SystemModule.Onboarding] = new ModuleInfo(
            Name: "Onboarding",
            NameAr: "الإلحاق",
            Description: "Onboarding templates and process management",
            DescriptionAr: "قوالب الإلحاق وإدارة العمليات",
            Icon: "fa-clipboard-list",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.OnboardingTemplate, PermissionResources.OnboardingProcess
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] { "OnboardingTaskOverdueJob" }
        ),

        [SystemModule.Performance] = new ModuleInfo(
            Name: "Performance",
            NameAr: "الأداء",
            Description: "Review cycles, performance reviews, goals, competencies, PIPs, and 360 feedback",
            DescriptionAr: "دورات المراجعة ومراجعات الأداء والأهداف والكفاءات وخطط تحسين الأداء والتقييم 360",
            Icon: "fa-star",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.PerformanceReviewCycle, PermissionResources.PerformanceReview,
                PermissionResources.Goal, PermissionResources.CompetencyFramework,
                PermissionResources.Pip, PermissionResources.Feedback360
            },
            DependsOn: new[] { SystemModule.EmployeeLifecycle },
            BackgroundJobTypes: new[] { "ReviewCycleReminderJob", "PIPExpiryCheckJob" }
        ),

        [SystemModule.Documents] = new ModuleInfo(
            Name: "Documents",
            NameAr: "المستندات",
            Description: "Document categories, employee documents, company policies, and letter templates",
            DescriptionAr: "فئات المستندات ومستندات الموظفين وسياسات الشركة وقوالب الخطابات",
            Icon: "fa-folder",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.DocumentCategory, PermissionResources.EmployeeDocument,
                PermissionResources.CompanyPolicy, PermissionResources.LetterTemplate,
                PermissionResources.LetterRequest
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] { "DocumentExpiryAlertJob" }
        ),

        [SystemModule.Expenses] = new ModuleInfo(
            Name: "Expenses",
            NameAr: "المصروفات",
            Description: "Expense categories, policies, and claims",
            DescriptionAr: "فئات المصروفات والسياسات والمطالبات",
            Icon: "fa-receipt",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.ExpenseCategory, PermissionResources.ExpensePolicy,
                PermissionResources.ExpenseClaim
            },
            DependsOn: new[] { SystemModule.Payroll },
            BackgroundJobTypes: Array.Empty<string>()
        ),

        [SystemModule.Loans] = new ModuleInfo(
            Name: "Loans",
            NameAr: "القروض",
            Description: "Loan types, policies, applications, and salary advances",
            DescriptionAr: "أنواع القروض والسياسات والطلبات والسلف",
            Icon: "fa-university",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.LoanType, PermissionResources.LoanPolicy,
                PermissionResources.LoanApplication, PermissionResources.SalaryAdvance
            },
            DependsOn: new[] { SystemModule.Payroll },
            BackgroundJobTypes: new[] { "LoanRepaymentReminderJob" }
        ),

        [SystemModule.Announcements] = new ModuleInfo(
            Name: "Announcements",
            NameAr: "الإعلانات",
            Description: "Company announcements and categories",
            DescriptionAr: "إعلانات الشركة والفئات",
            Icon: "fa-bullhorn",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.AnnouncementCategory, PermissionResources.Announcement
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] { "AnnouncementExpiryJob", "AnnouncementSchedulerJob" }
        ),

        [SystemModule.Training] = new ModuleInfo(
            Name: "Training",
            NameAr: "التدريب",
            Description: "Training courses, programs, sessions, enrollments, evaluations, and certifications",
            DescriptionAr: "الدورات التدريبية والبرامج والجلسات والتسجيل والتقييمات والشهادات",
            Icon: "fa-graduation-cap",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.TrainingCategory, PermissionResources.TrainingCourse,
                PermissionResources.TrainingProgram, PermissionResources.TrainingSession,
                PermissionResources.TrainingEnrollment, PermissionResources.TrainingEvaluation,
                PermissionResources.EmployeeCertification, PermissionResources.TrainingBudget
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] {
                "TrainingSessionReminderJob", "CertificationExpiryAlertJob"
            }
        ),

        [SystemModule.EmployeeRelations] = new ModuleInfo(
            Name: "Employee Relations",
            NameAr: "علاقات الموظفين",
            Description: "Grievances, disciplinary actions, investigations, and counseling",
            DescriptionAr: "التظلمات والإجراءات التأديبية والتحقيقات والإرشاد",
            Icon: "fa-balance-scale",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.GrievanceResource, PermissionResources.DisciplinaryAction,
                PermissionResources.Investigation, PermissionResources.CounselingRecord
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] {
                "GrievanceSlaAlertJob", "CounselingFollowUpReminderJob"
            }
        ),

        [SystemModule.Assets] = new ModuleInfo(
            Name: "Assets",
            NameAr: "الأصول",
            Description: "Asset categories, tracking, assignments, and maintenance",
            DescriptionAr: "فئات الأصول والتتبع والتخصيصات والصيانة",
            Icon: "fa-laptop",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.AssetCategory, PermissionResources.Asset,
                PermissionResources.AssetAssignment, PermissionResources.AssetMaintenance
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] {
                "AssetWarrantyExpiryAlertJob", "OverdueAssetReturnAlertJob"
            }
        ),

        [SystemModule.Surveys] = new ModuleInfo(
            Name: "Surveys",
            NameAr: "الاستبيانات",
            Description: "Survey templates, distribution, and response collection",
            DescriptionAr: "قوالب الاستبيانات والتوزيع وجمع الردود",
            Icon: "fa-poll",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.SurveyTemplate, PermissionResources.SurveyDistribution,
                PermissionResources.SurveyResponse
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] {
                "SurveyDistributionActivatorJob", "SurveyReminderJob", "SurveyExpiryJob"
            }
        ),

        [SystemModule.Analytics] = new ModuleInfo(
            Name: "Analytics",
            NameAr: "التحليلات",
            Description: "HR analytics snapshots and saved dashboards",
            DescriptionAr: "لقطات تحليلات الموارد البشرية ولوحات المعلومات المحفوظة",
            Icon: "fa-chart-bar",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.Analytics, PermissionResources.SavedDashboard
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] {
                "AnalyticsSnapshotJob", "MonthlyAnalyticsRollupJob"
            }
        ),

        [SystemModule.Timesheets] = new ModuleInfo(
            Name: "Timesheets",
            NameAr: "الجداول الزمنية",
            Description: "Project management, task tracking, and timesheet management",
            DescriptionAr: "إدارة المشاريع وتتبع المهام وإدارة الجداول الزمنية",
            Icon: "fa-clock",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.Project, PermissionResources.ProjectTask,
                PermissionResources.TimesheetPeriod, PermissionResources.TimesheetResource
            },
            DependsOn: Array.Empty<SystemModule>(),
            BackgroundJobTypes: new[] {
                "TimesheetPeriodGenerationJob", "TimesheetSubmissionReminderJob",
                "TimesheetPeriodClosureJob"
            }
        ),

        [SystemModule.SuccessionPlanning] = new ModuleInfo(
            Name: "Succession Planning",
            NameAr: "تخطيط التعاقب",
            Description: "Key positions, talent profiles, succession plans, and career paths",
            DescriptionAr: "المناصب الرئيسية وملفات المواهب وخطط التعاقب والمسارات الوظيفية",
            Icon: "fa-sitemap",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.KeyPosition, PermissionResources.TalentProfile,
                PermissionResources.SuccessionPlan, PermissionResources.CareerPath
            },
            DependsOn: new[] { SystemModule.Performance },
            BackgroundJobTypes: new[] {
                "TalentProfileSyncJob", "SuccessionPlanReviewReminderJob"
            }
        ),

        [SystemModule.Benefits] = new ModuleInfo(
            Name: "Benefits",
            NameAr: "المزايا",
            Description: "Benefit plans, enrollment periods, and benefit claims",
            DescriptionAr: "خطط المزايا وفترات التسجيل ومطالبات المزايا",
            Icon: "fa-heartbeat",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.BenefitPlan, PermissionResources.BenefitEnrollment,
                PermissionResources.OpenEnrollmentPeriod, PermissionResources.BenefitClaim
            },
            DependsOn: new[] { SystemModule.Payroll },
            BackgroundJobTypes: new[] {
                "OpenEnrollmentPeriodActivatorJob", "BenefitEnrollmentExpiryJob",
                "BenefitDeductionSyncJob"
            }
        ),

        [SystemModule.CustomReports] = new ModuleInfo(
            Name: "Custom Reports",
            NameAr: "التقارير المخصصة",
            Description: "Custom report definitions and scheduled report execution",
            DescriptionAr: "تعريفات التقارير المخصصة وتنفيذ التقارير المجدولة",
            Icon: "fa-file-chart-line",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.CustomReport, PermissionResources.ScheduledReport
            },
            DependsOn: new[] { SystemModule.Analytics },
            BackgroundJobTypes: new[] { "ScheduledReportExecutionJob" }
        ),

        [SystemModule.ShiftSwaps] = new ModuleInfo(
            Name: "Shift Swaps",
            NameAr: "تبادل الورديات",
            Description: "Shift swap requests and on-call schedule management",
            DescriptionAr: "طلبات تبادل الورديات وإدارة جداول المناوبات",
            Icon: "fa-exchange-alt",
            IsCore: false,
            PermissionResources: new[] {
                PermissionResources.ShiftSwapRequest, PermissionResources.OnCallSchedule
            },
            DependsOn: new[] { SystemModule.TimeAttendance },
            BackgroundJobTypes: Array.Empty<string>()
        ),
    };

    /// <summary>
    /// Gets metadata for a specific module.
    /// </summary>
    public static ModuleInfo Get(SystemModule module)
    {
        return _modules.TryGetValue(module, out var info)
            ? info
            : throw new ArgumentException($"Unknown module: {module}");
    }

    /// <summary>
    /// Gets metadata for all modules.
    /// </summary>
    public static IReadOnlyDictionary<SystemModule, ModuleInfo> GetAll() => _modules;

    /// <summary>
    /// Gets all modules that are always enabled (core modules).
    /// </summary>
    public static IEnumerable<SystemModule> GetCoreModules() =>
        _modules.Where(m => m.Value.IsCore).Select(m => m.Key);

    /// <summary>
    /// Gets the SystemModule for a given permission resource string.
    /// Returns null if the resource is not mapped to any module.
    /// </summary>
    public static SystemModule? GetModuleForResource(string permissionResource)
    {
        foreach (var (module, info) in _modules)
        {
            if (info.PermissionResources.Contains(permissionResource))
                return module;
        }
        return null;
    }

    /// <summary>
    /// Gets the SystemModule for a given background job type name.
    /// Returns null if the job is not mapped to any module.
    /// </summary>
    public static SystemModule? GetModuleForJob(string jobTypeName)
    {
        foreach (var (module, info) in _modules)
        {
            if (info.BackgroundJobTypes.Contains(jobTypeName))
                return module;
        }
        return null;
    }

    /// <summary>
    /// Maps a WorkflowEntityType to its owning SystemModule.
    /// Used during module deactivation to freeze in-flight workflows.
    /// </summary>
    private static readonly Dictionary<WorkflowEntityType, SystemModule> _entityTypeToModule = new()
    {
        [WorkflowEntityType.Vacation] = SystemModule.LeaveManagement,
        [WorkflowEntityType.Excuse] = SystemModule.LeaveManagement,
        [WorkflowEntityType.RemoteWork] = SystemModule.RemoteWork,
        [WorkflowEntityType.Overtime] = SystemModule.TimeAttendance,
        [WorkflowEntityType.AttendanceCorrection] = SystemModule.TimeAttendance,
        [WorkflowEntityType.ShiftSwap] = SystemModule.ShiftSwaps,
        [WorkflowEntityType.Timesheet] = SystemModule.Timesheets,
        [WorkflowEntityType.Transfer] = SystemModule.EmployeeLifecycle,
        [WorkflowEntityType.Promotion] = SystemModule.EmployeeLifecycle,
        [WorkflowEntityType.SalaryAdjustment] = SystemModule.EmployeeLifecycle,
        [WorkflowEntityType.Payroll] = SystemModule.Payroll,
        [WorkflowEntityType.Resignation] = SystemModule.Offboarding,
        [WorkflowEntityType.FinalSettlement] = SystemModule.Offboarding,
        [WorkflowEntityType.AllowanceRequest] = SystemModule.Allowances,
        [WorkflowEntityType.JobRequisition] = SystemModule.Recruitment,
        [WorkflowEntityType.OfferLetter] = SystemModule.Recruitment,
        [WorkflowEntityType.PerformanceReview] = SystemModule.Performance,
        [WorkflowEntityType.PerformanceImprovementPlan] = SystemModule.Performance,
        [WorkflowEntityType.LetterRequest] = SystemModule.Documents,
        [WorkflowEntityType.ExpenseClaim] = SystemModule.Expenses,
        [WorkflowEntityType.LoanApplication] = SystemModule.Loans,
        [WorkflowEntityType.SalaryAdvance] = SystemModule.Loans,
        [WorkflowEntityType.TrainingEnrollment] = SystemModule.Training,
        [WorkflowEntityType.DisciplinaryAction] = SystemModule.EmployeeRelations,
        [WorkflowEntityType.Grievance] = SystemModule.EmployeeRelations,
        [WorkflowEntityType.BenefitEnrollment] = SystemModule.Benefits,
    };

    /// <summary>
    /// Gets the SystemModule that owns a given WorkflowEntityType.
    /// Returns null if no mapping exists.
    /// </summary>
    public static SystemModule? GetModuleForEntityType(WorkflowEntityType entityType)
    {
        return _entityTypeToModule.TryGetValue(entityType, out var module) ? module : null;
    }

    /// <summary>
    /// Gets all WorkflowEntityTypes that belong to a given SystemModule.
    /// Used to find workflows that should be frozen when a module is deactivated.
    /// </summary>
    public static IReadOnlyList<WorkflowEntityType> GetEntityTypesForModule(SystemModule module)
    {
        return _entityTypeToModule
            .Where(kvp => kvp.Value == module)
            .Select(kvp => kvp.Key)
            .ToList();
    }
}
