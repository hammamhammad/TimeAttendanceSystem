namespace TecAxle.Hrms.Domain.Common;

public static class PermissionResources
{
    public const string User = "user";
    public const string Role = "role";
    public const string Employee = "employee";
    public const string Branch = "branch";
    public const string Department = "department";
    public const string Shift = "shift";
    public const string Attendance = "attendance";
    public const string Schedule = "schedule";
    public const string Report = "report";
    public const string Settings = "settings";
    public const string Dashboard = "dashboard";
    public const string Permission = "permission";
    public const string Audit = "audit";
    public const string Notification = "notification";
    public const string System = "system";
    public const string PublicHoliday = "publicHoliday";
    public const string VacationType = "vacationType";
    public const string Vacation = "vacation";
    public const string ExcusePolicy = "excusePolicy";
    public const string Excuse = "excuse";
    public const string Session = "session";
    public const string Workflow = "workflow";
    public const string Approval = "approval";
    public const string LeaveBalance = "leaveBalance";

    // Phase 1: Employee Lifecycle
    public const string Contract = "contract";
    public const string Transfer = "transfer";
    public const string Promotion = "promotion";
    public const string SalaryAdjustment = "salaryAdjustment";
    public const string JobGrade = "jobGrade";

    // Phase 1: Payroll
    public const string Payroll = "payroll";
    public const string SalaryStructure = "salaryStructure";
    public const string TaxConfiguration = "taxConfiguration";
    public const string SocialInsurance = "socialInsurance";
    public const string Insurance = "insurance";

    // Phase 1: Offboarding
    public const string Resignation = "resignation";
    public const string Termination = "termination";
    public const string Clearance = "clearance";
    public const string EndOfService = "endOfService";
    public const string FinalSettlement = "finalSettlement";
    public const string ExitInterview = "exitInterview";

    // Allowance Management
    public const string AllowanceType = "allowanceType";
    public const string AllowancePolicy = "allowancePolicy";
    public const string AllowanceAssignment = "allowanceAssignment";
    public const string AllowanceRequest = "allowanceRequest";

    // Phase 2: Recruitment
    public const string JobRequisition = "jobRequisition";
    public const string JobPosting = "jobPosting";
    public const string Candidate = "candidate";
    public const string JobApplication = "jobApplication";
    public const string Interview = "interview";
    public const string OfferLetter = "offerLetter";

    // Phase 2: Onboarding
    public const string OnboardingTemplate = "onboardingTemplate";
    public const string OnboardingProcess = "onboarding";

    // Phase 3: Documents & Letters
    public const string DocumentCategory = "documentCategory";
    public const string EmployeeDocument = "employeeDocument";
    public const string CompanyPolicy = "companyPolicy";
    public const string LetterRequest = "letterRequest";
    public const string LetterTemplate = "letterTemplate";

    // Phase 3: Expenses
    public const string ExpenseCategory = "expenseCategory";
    public const string ExpensePolicy = "expensePolicy";
    public const string ExpenseClaim = "expenseClaim";

    // Phase 3: Loans
    public const string LoanType = "loanType";
    public const string LoanPolicy = "loanPolicy";
    public const string LoanApplication = "loanApplication";
    public const string SalaryAdvance = "salaryAdvance";

    // Phase 2: Performance
    public const string PerformanceReviewCycle = "performanceReviewCycle";
    public const string PerformanceReview = "performanceReview";
    public const string Goal = "goal";
    public const string CompetencyFramework = "competencyFramework";
    public const string Pip = "pip";
    public const string Feedback360 = "feedback360";

    // Phase 4: Company Announcements
    public const string AnnouncementCategory = "announcementCategory";
    public const string Announcement = "announcement";

    // Phase 4: Training & Development
    public const string TrainingCategory = "trainingCategory";
    public const string TrainingCourse = "trainingCourse";
    public const string TrainingProgram = "trainingProgram";
    public const string TrainingSession = "trainingSession";
    public const string TrainingEnrollment = "trainingEnrollment";
    public const string TrainingEvaluation = "trainingEvaluation";
    public const string EmployeeCertification = "employeeCertification";
    public const string TrainingBudget = "trainingBudget";

    // Phase 4: Employee Relations
    public const string GrievanceResource = "grievance";
    public const string DisciplinaryAction = "disciplinaryAction";
    public const string Investigation = "investigation";
    public const string CounselingRecord = "counselingRecord";

    // Phase 5: Asset Management
    public const string AssetCategory = "assetCategory";
    public const string Asset = "asset";
    public const string AssetAssignment = "assetAssignment";
    public const string AssetMaintenance = "assetMaintenance";

    // Phase 5: Employee Engagement & Surveys
    public const string SurveyTemplate = "surveyTemplate";
    public const string SurveyDistribution = "surveyDistribution";
    public const string SurveyResponse = "surveyResponse";

    // Phase 5: Advanced Analytics
    public const string Analytics = "analytics";
    public const string SavedDashboard = "savedDashboard";

    // Phase 6: Timesheet Management
    public const string Project = "project";
    public const string ProjectTask = "projectTask";
    public const string TimesheetPeriod = "timesheetPeriod";
    public const string TimesheetResource = "timesheet";

    // Phase 6: Succession Planning
    public const string KeyPosition = "keyPosition";
    public const string TalentProfile = "talentProfile";
    public const string SuccessionPlan = "successionPlan";
    public const string CareerPath = "careerPath";

    // Phase 6: Benefits Administration
    public const string BenefitPlan = "benefitPlan";
    public const string BenefitEnrollment = "benefitEnrollment";
    public const string OpenEnrollmentPeriod = "openEnrollmentPeriod";
    public const string BenefitClaim = "benefitClaim";

    // Phase 7: Enhancements
    public const string ShiftSwapRequest = "shiftSwapRequest";
    public const string OnCallSchedule = "onCallSchedule";
    public const string CompensatoryOff = "compensatoryOff";
    public const string LeaveEncashment = "leaveEncashment";
    public const string CustomReport = "customReport";
    public const string ScheduledReport = "scheduledReport";

    // Subscription & Entitlements
    public const string SubscriptionPlan = "subscriptionPlan";
    public const string TenantSubscription = "tenantSubscription";
    public const string Entitlement = "entitlement";

    public static readonly Dictionary<string, string> ResourceDescriptions = new()
    {
        { User, "User accounts and profiles" },
        { Role, "User roles and access levels" },
        { Employee, "Employee records and information" },
        { Branch, "Company branches and locations" },
        { Department, "Organizational departments" },
        { Shift, "Work shifts and time periods" },
        { Attendance, "Time tracking and attendance records" },
        { Schedule, "Work schedules and shift management" },
        { Report, "Reports and analytics" },
        { Settings, "System configuration and settings" },
        { Dashboard, "Dashboard views and widgets" },
        { Permission, "Permission management" },
        { Audit, "Audit logs and security tracking" },
        { Notification, "System notifications and alerts" },
        { System, "Core system functions" },
        { PublicHoliday, "Public holidays and calendar management" },
        { VacationType, "Vacation types and leave policies" },
        { Vacation, "Employee vacation records and management" },
        { ExcusePolicy, "Excuse policies and organizational rules" },
        { Excuse, "Employee excuse requests and management" },
        { Session, "User sessions and security management" },
        { Workflow, "Approval workflow definitions and configuration" },
        { Approval, "Approval queue and actions" },
        { LeaveBalance, "Leave balance and accrual management" },
        { Contract, "Employee contracts and agreements" },
        { Transfer, "Employee transfer requests and processing" },
        { Promotion, "Employee promotion requests and processing" },
        { SalaryAdjustment, "Salary adjustment requests and approvals" },
        { JobGrade, "Job grade definitions and salary bands" },
        { Payroll, "Payroll processing and records" },
        { SalaryStructure, "Salary structure definitions and components" },
        { TaxConfiguration, "Tax configuration and brackets" },
        { SocialInsurance, "Social insurance configuration" },
        { Insurance, "Employee insurance and benefits" },
        { Resignation, "Employee resignation requests" },
        { Termination, "Employee termination processing" },
        { Clearance, "Employee clearance checklists" },
        { EndOfService, "End-of-service benefit calculations" },
        { FinalSettlement, "Final settlement calculations and approvals" },
        { ExitInterview, "Exit interview management" },
        { AllowanceType, "Allowance type definitions" },
        { AllowancePolicy, "Allowance policy rules" },
        { AllowanceAssignment, "Employee allowance assignments" },
        { AllowanceRequest, "Allowance request management" },
        { JobRequisition, "Job requisition management" },
        { JobPosting, "Job posting management" },
        { Candidate, "Candidate management" },
        { JobApplication, "Job application management" },
        { Interview, "Interview scheduling and feedback" },
        { OfferLetter, "Offer letter management" },
        { OnboardingTemplate, "Onboarding template management" },
        { OnboardingProcess, "Onboarding process management" },
        { PerformanceReviewCycle, "Performance review cycle management" },
        { PerformanceReview, "Performance review management" },
        { Goal, "Goal and objective management" },
        { CompetencyFramework, "Competency framework management" },
        { Pip, "Performance improvement plan management" },
        { Feedback360, "360-degree feedback management" },
        { DocumentCategory, "Document category management" },
        { EmployeeDocument, "Employee document management" },
        { CompanyPolicy, "Company policy management" },
        { LetterRequest, "Letter request management" },
        { LetterTemplate, "Letter template management" },
        { ExpenseCategory, "Expense category management" },
        { ExpensePolicy, "Expense policy management" },
        { ExpenseClaim, "Expense claim management" },
        { LoanType, "Loan type management" },
        { LoanPolicy, "Loan policy management" },
        { LoanApplication, "Loan application management" },
        { SalaryAdvance, "Salary advance management" },
        { AnnouncementCategory, "Announcement category management" },
        { Announcement, "Announcement management" },
        { TrainingCategory, "Training category management" },
        { TrainingCourse, "Training course management" },
        { TrainingProgram, "Training program management" },
        { TrainingSession, "Training session management" },
        { TrainingEnrollment, "Training enrollment management" },
        { TrainingEvaluation, "Training evaluation management" },
        { EmployeeCertification, "Employee certification management" },
        { TrainingBudget, "Training budget management" },
        { GrievanceResource, "Grievance management" },
        { DisciplinaryAction, "Disciplinary action management" },
        { Investigation, "Investigation management" },
        { CounselingRecord, "Counseling record management" },
        { AssetCategory, "Asset category management" },
        { Asset, "Asset management" },
        { AssetAssignment, "Asset assignment management" },
        { AssetMaintenance, "Asset maintenance management" },
        { SurveyTemplate, "Survey template management" },
        { SurveyDistribution, "Survey distribution management" },
        { SurveyResponse, "Survey response management" },
        { Analytics, "HR analytics and reporting" },
        { SavedDashboard, "Saved dashboard management" },
        { Project, "Project management" },
        { ProjectTask, "Project task management" },
        { TimesheetPeriod, "Timesheet period management" },
        { TimesheetResource, "Timesheet management" },
        { KeyPosition, "Key position management" },
        { TalentProfile, "Talent profile management" },
        { SuccessionPlan, "Succession plan management" },
        { CareerPath, "Career path management" },
        { BenefitPlan, "Benefit plan management" },
        { BenefitEnrollment, "Benefit enrollment management" },
        { OpenEnrollmentPeriod, "Open enrollment period management" },
        { BenefitClaim, "Benefit claim management" },
        { ShiftSwapRequest, "Shift swap request management" },
        { OnCallSchedule, "On-call schedule management" },
        { CompensatoryOff, "Compensatory off management" },
        { LeaveEncashment, "Leave encashment management" },
        { CustomReport, "Custom report management" },
        { ScheduledReport, "Scheduled report management" },
        { SubscriptionPlan, "Subscription plan management" },
        { TenantSubscription, "Tenant subscription management" },
        { Entitlement, "Entitlement and module access management" },
    };

    public static readonly Dictionary<string, string> ResourceIcons = new()
    {
        { User, "fa-user" },
        { Role, "fa-user-shield" },
        { Employee, "fa-users" },
        { Branch, "fa-building" },
        { Department, "fa-sitemap" },
        { Shift, "fa-clock" },
        { Attendance, "fa-user-clock" },
        { Schedule, "fa-calendar-alt" },
        { Report, "fa-chart-bar" },
        { Settings, "fa-cog" },
        { Dashboard, "fa-tachometer-alt" },
        { Permission, "fa-key" },
        { Audit, "fa-history" },
        { Notification, "fa-bell" },
        { System, "fa-server" },
        { PublicHoliday, "fa-calendar-check" },
        { VacationType, "fa-calendar-alt" },
        { ExcusePolicy, "fa-gavel" },
        { Excuse, "fa-file-alt" },
        { Session, "fa-wifi" },
        { Workflow, "fa-project-diagram" },
        { Approval, "fa-tasks" },
        { LeaveBalance, "fa-calendar-check" },
        { Contract, "fa-file-contract" },
        { Transfer, "fa-exchange-alt" },
        { Promotion, "fa-arrow-up" },
        { SalaryAdjustment, "fa-hand-holding-usd" },
        { JobGrade, "fa-layer-group" },
        { Payroll, "fa-money-check-alt" },
        { SalaryStructure, "fa-project-diagram" },
        { TaxConfiguration, "fa-percentage" },
        { SocialInsurance, "fa-shield-alt" },
        { Insurance, "fa-heartbeat" },
        { Resignation, "fa-door-open" },
        { Termination, "fa-user-slash" },
        { Clearance, "fa-clipboard-check" },
        { EndOfService, "fa-calculator" },
        { FinalSettlement, "fa-file-invoice-dollar" },
        { ExitInterview, "fa-comments" },
        { AllowanceType, "fa-tags" },
        { AllowancePolicy, "fa-shield-alt" },
        { AllowanceAssignment, "fa-hand-holding-usd" },
        { AllowanceRequest, "fa-file-invoice-dollar" },
        { JobRequisition, "fa-briefcase" },
        { JobPosting, "fa-bullhorn" },
        { Candidate, "fa-user-plus" },
        { JobApplication, "fa-file-alt" },
        { Interview, "fa-comments" },
        { OfferLetter, "fa-envelope-open-text" },
        { OnboardingTemplate, "fa-clipboard-list" },
        { OnboardingProcess, "fa-tasks" },
        { PerformanceReviewCycle, "fa-sync-alt" },
        { PerformanceReview, "fa-star" },
        { Goal, "fa-bullseye" },
        { CompetencyFramework, "fa-cubes" },
        { Pip, "fa-chart-line" },
        { Feedback360, "fa-users" },
        { DocumentCategory, "fa-folder" },
        { EmployeeDocument, "fa-file" },
        { CompanyPolicy, "fa-book" },
        { LetterRequest, "fa-envelope" },
        { LetterTemplate, "fa-file-word" },
        { ExpenseCategory, "fa-receipt" },
        { ExpensePolicy, "fa-file-invoice" },
        { ExpenseClaim, "fa-money-bill-wave" },
        { LoanType, "fa-university" },
        { LoanPolicy, "fa-file-contract" },
        { LoanApplication, "fa-hand-holding-usd" },
        { SalaryAdvance, "fa-forward" },
        { AnnouncementCategory, "fa-tags" },
        { Announcement, "fa-bullhorn" },
        { TrainingCategory, "fa-folder-open" },
        { TrainingCourse, "fa-book-open" },
        { TrainingProgram, "fa-graduation-cap" },
        { TrainingSession, "fa-chalkboard-teacher" },
        { TrainingEnrollment, "fa-user-graduate" },
        { TrainingEvaluation, "fa-star-half-alt" },
        { EmployeeCertification, "fa-certificate" },
        { TrainingBudget, "fa-piggy-bank" },
        { GrievanceResource, "fa-exclamation-circle" },
        { DisciplinaryAction, "fa-gavel" },
        { Investigation, "fa-search" },
        { CounselingRecord, "fa-comments" },
        { AssetCategory, "fa-tags" },
        { Asset, "fa-laptop" },
        { AssetAssignment, "fa-user-cog" },
        { AssetMaintenance, "fa-wrench" },
        { SurveyTemplate, "fa-clipboard-list" },
        { SurveyDistribution, "fa-paper-plane" },
        { SurveyResponse, "fa-poll" },
        { Analytics, "fa-chart-bar" },
        { SavedDashboard, "fa-tachometer-alt" },
        { Project, "fa-project-diagram" },
        { ProjectTask, "fa-tasks" },
        { TimesheetPeriod, "fa-calendar-week" },
        { TimesheetResource, "fa-clock" },
        { KeyPosition, "fa-crown" },
        { TalentProfile, "fa-user-tie" },
        { SuccessionPlan, "fa-sitemap" },
        { CareerPath, "fa-road" },
        { BenefitPlan, "fa-heartbeat" },
        { BenefitEnrollment, "fa-user-check" },
        { OpenEnrollmentPeriod, "fa-calendar-alt" },
        { BenefitClaim, "fa-file-medical" },
        { ShiftSwapRequest, "fa-exchange-alt" },
        { OnCallSchedule, "fa-phone-volume" },
        { CompensatoryOff, "fa-calendar-plus" },
        { LeaveEncashment, "fa-money-bill-wave" },
        { CustomReport, "fa-file-chart-line" },
        { ScheduledReport, "fa-calendar-alt" },
        { SubscriptionPlan, "fa-credit-card" },
        { TenantSubscription, "fa-file-contract" },
        { Entitlement, "fa-key" },
    };
    
    public static string GetResourceDescription(string resource)
    {
        return ResourceDescriptions.TryGetValue(resource, out var description) ? description : resource;
    }
    
    public static string GetResourceIcon(string resource)
    {
        return ResourceIcons.TryGetValue(resource, out var icon) ? icon : "fa-question";
    }
}