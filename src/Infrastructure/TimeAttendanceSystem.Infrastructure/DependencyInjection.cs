using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Coravel;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Services;
using TecAxle.Hrms.Infrastructure.BackgroundJobs;
using TecAxle.Hrms.Infrastructure.Persistence;
using TecAxle.Hrms.Infrastructure.Persistence.Repositories;
using TecAxle.Hrms.Infrastructure.Security;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Configure database
        ConfigureDatabase(services, configuration);

        services.AddScoped<IApplicationDbContext, ApplicationDbContextAdapter>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddScoped<ICurrentUser, CurrentUser>();
        services.AddScoped<ICompanySettingsResolver, CompanySettingsResolver>();
        services.AddScoped<ISystemUserResolver, SystemUserResolver>();
        services.AddScoped<INotificationRecipientResolver, NotificationRecipientResolver>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IPasswordService, PasswordService>();
        services.AddScoped<ITwoFactorService, TwoFactorService>();
        services.AddScoped<IDeviceService, DeviceService>();
        services.AddScoped<IPublicHolidayService, PublicHolidayService>();
        services.AddScoped<IAttendanceRepository, AttendanceRepository>();
        services.AddScoped<IAttendanceTransactionRepository, AttendanceTransactionRepository>();
        services.AddScoped<ISettingsRepository, SettingsRepository>();
        services.AddScoped<IInAppNotificationService, InAppNotificationService>();
        services.AddScoped<IFileStorageService, LocalDiskFileStorageService>();

        // v13.5 Lifecycle Automation: wraps IPublisher with try/catch so handler failures
        // never cascade back into the originating command.
        services.AddScoped<ILifecycleEventPublisher, LifecycleEventPublisher>();

        // Phase 1 (v14.1): Operational failure alerts + approval-to-execution infrastructure.
        services.AddScoped<IFailureAlertService, FailureAlertService>();

        // Phase 2 (v14.2): Unified timezone service used by the attendance pipeline.
        services.AddScoped<ITimezoneService, TimezoneService>();

        // Phase 2 (v14.2): Reverses payroll-linked side-effects on recalc/admin-unlock/cancel.
        services.AddScoped<IPayrollSideEffectReverser, PayrollSideEffectReverser>();

        // Phase 2 (v14.2) completion: business-rule enforcers.
        services.AddScoped<ILoanPolicyValidator, LoanPolicyValidator>();
        services.AddScoped<IBenefitEligibilityEvaluator, BenefitEligibilityEvaluator>();
        services.AddScoped<ITrainingEnrollmentValidator, TrainingEnrollmentValidator>();
        services.AddTransient<LeaveCarryoverExpiryJob>();

        // Phase 3 (v14.3): shift-driven auto-checkout + PIP follow-through + global search backing.
        services.AddTransient<ShiftDrivenAutoCheckOutJob>();
        services.AddTransient<PipFollowThroughJob>();
        services.AddScoped<IGlobalSearchService, GlobalSearchService>();
        services.AddScoped<TecAxle.Hrms.Application.Features.ApprovalExecution.IApprovalExecutor,
                           TecAxle.Hrms.Application.Features.ApprovalExecution.AllowanceRequestExecutor>();
        services.AddScoped<TecAxle.Hrms.Application.Features.ApprovalExecution.IApprovalExecutor,
                           TecAxle.Hrms.Application.Features.ApprovalExecution.LoanApplicationExecutor>();
        services.AddScoped<TecAxle.Hrms.Application.Features.ApprovalExecution.IApprovalExecutor,
                           TecAxle.Hrms.Application.Features.ApprovalExecution.SalaryAdvanceExecutor>();
        services.AddScoped<TecAxle.Hrms.Application.Features.ApprovalExecution.IApprovalExecutor,
                           TecAxle.Hrms.Application.Features.ApprovalExecution.ExpenseClaimExecutor>();
        services.AddScoped<TecAxle.Hrms.Application.Features.ApprovalExecution.IApprovalExecutor,
                           TecAxle.Hrms.Application.Features.ApprovalExecution.BenefitEnrollmentExecutor>();
        services.AddScoped<TecAxle.Hrms.Application.Features.ApprovalExecution.IApprovalExecutor,
                           TecAxle.Hrms.Application.Features.ApprovalExecution.LetterRequestExecutor>();

        // Add Coravel for background jobs
        services.AddScheduler();
        services.AddTransient<DailyAttendanceGenerationJob>();
        services.AddTransient<EndOfDayAttendanceFinalizationJob>();
        services.AddTransient<MonthlyLeaveAccrualJob>();
        services.AddTransient<WorkflowTimeoutProcessingJob>();
        services.AddTransient<FrozenWorkflowCleanupJob>();
        services.AddTransient<OperationalFailureSurfacerJob>();
        services.AddTransient<ExpireTemporaryAllowancesJob>();
        services.AddTransient<ContractExpiryAlertJob>();
        services.AddTransient<VisaExpiryAlertJob>();
        services.AddTransient<ApplyScheduledProfileChangesJob>();
        services.AddTransient<OnboardingTaskOverdueJob>();
        services.AddTransient<ReviewCycleReminderJob>();
        services.AddTransient<PIPExpiryCheckJob>();
        services.AddTransient<DocumentExpiryAlertJob>();
        services.AddTransient<LoanRepaymentReminderJob>();
        services.AddTransient<AnnouncementSchedulerJob>();
        services.AddTransient<AnnouncementExpiryJob>();
        services.AddTransient<CertificationExpiryAlertJob>();
        services.AddTransient<TrainingSessionReminderJob>();
        services.AddTransient<GrievanceSlaAlertJob>();
        services.AddTransient<CounselingFollowUpReminderJob>();
        services.AddTransient<AssetWarrantyExpiryAlertJob>();
        services.AddTransient<OverdueAssetReturnAlertJob>();
        services.AddTransient<SurveyDistributionActivatorJob>();
        services.AddTransient<SurveyReminderJob>();
        services.AddTransient<SurveyExpiryJob>();
        services.AddTransient<AnalyticsSnapshotJob>();
        services.AddTransient<MonthlyAnalyticsRollupJob>();
        services.AddTransient<TimesheetPeriodGenerationJob>();
        services.AddTransient<TimesheetSubmissionReminderJob>();
        services.AddTransient<TimesheetPeriodClosureJob>();
        services.AddTransient<TalentProfileSyncJob>();
        services.AddTransient<SuccessionPlanReviewReminderJob>();
        services.AddTransient<OpenEnrollmentPeriodActivatorJob>();
        services.AddTransient<BenefitEnrollmentExpiryJob>();
        services.AddTransient<BenefitDeductionSyncJob>();
        services.AddTransient<CompensatoryOffExpiryJob>();
        services.AddTransient<ScheduledReportExecutionJob>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]!)),
                    ClockSkew = TimeSpan.Zero
                };

                // Configure SignalR to read JWT token from query string for WebSocket connections
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        // If the request is for a SignalR hub, read the token from the query string
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            path.StartsWithSegments("/hubs"))
                        {
                            context.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    }
                };
            });

        services.AddAuthorization(options =>
        {
            // Define SystemAdmin policy - users with SystemAdmin role can manage roles and system settings
            options.AddPolicy("SystemAdmin", policy =>
                policy.RequireRole("SystemAdmin"));

            // Define AttendanceManagement policy - users with specific permissions can modify attendance records
            options.AddPolicy("AttendanceManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("HRManager") ||
                    context.User.IsInRole("BranchManager") ||
                    context.User.HasClaim("permission", "attendance.update")));

            // Define PublicHolidayRead policy - users with read permissions can view public holidays
            options.AddPolicy("PublicHolidayRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "publicHoliday.read")));

            // Define PublicHolidayManagement policy - users with management permissions can create/update/delete public holidays
            options.AddPolicy("PublicHolidayManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "publicHoliday.create") ||
                    context.User.HasClaim("permission", "publicHoliday.update") ||
                    context.User.HasClaim("permission", "publicHoliday.delete") ||
                    context.User.HasClaim("permission", "publicHoliday.manage")));

            // Define PublicHolidayExport policy - users with export permissions can export holiday data
            options.AddPolicy("PublicHolidayExport", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "publicHoliday.export")));

            // Define PublicHolidayImport policy - users with import permissions can import holiday templates
            options.AddPolicy("PublicHolidayImport", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "publicHoliday.import")));

            // ===== EMPLOYEE MANAGEMENT POLICIES =====

            // Define EmployeeRead policy - users with read permissions can view employee data
            options.AddPolicy("EmployeeRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "employee.read")));

            // Define EmployeeManagement policy - users with management permissions can create/update/delete employees
            options.AddPolicy("EmployeeManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "employee.create") ||
                    context.User.HasClaim("permission", "employee.update") ||
                    context.User.HasClaim("permission", "employee.delete") ||
                    context.User.HasClaim("permission", "employee.manage")));

            // Define EmployeeAssignment policy - users with assignment permissions can assign shifts/departments
            options.AddPolicy("EmployeeAssignment", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "employee.assign")));

            // ===== ORGANIZATIONAL MANAGEMENT POLICIES =====

            // Define BranchManagement policy - users with branch management permissions
            options.AddPolicy("BranchManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "branch.create") ||
                    context.User.HasClaim("permission", "branch.update") ||
                    context.User.HasClaim("permission", "branch.delete") ||
                    context.User.HasClaim("permission", "branch.manage")));

            // Define BranchRead policy - users with read permissions can view branch data
            options.AddPolicy("BranchRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "branch.read")));

            // Define DepartmentManagement policy - users with department management permissions
            options.AddPolicy("DepartmentManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "department.create") ||
                    context.User.HasClaim("permission", "department.update") ||
                    context.User.HasClaim("permission", "department.delete") ||
                    context.User.HasClaim("permission", "department.manage")));

            // Define DepartmentRead policy - users with read permissions can view department data
            options.AddPolicy("DepartmentRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "department.read")));

            // ===== USER MANAGEMENT POLICIES =====

            // Define UserManagement policy - users with user management permissions
            options.AddPolicy("UserManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "user.create") ||
                    context.User.HasClaim("permission", "user.update") ||
                    context.User.HasClaim("permission", "user.delete") ||
                    context.User.HasClaim("permission", "user.manage")));

            // Define UserRead policy - users with read permissions can view user data
            options.AddPolicy("UserRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "user.read")));

            // Define UserRoleAssignment policy - users who can assign/remove user roles
            options.AddPolicy("UserRoleAssignment", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "user.assignRole") ||
                    context.User.HasClaim("permission", "user.removeRole")));

            // Define UserSessionManagement policy - users who can manage user sessions
            options.AddPolicy("UserSessionManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "user.manage")));

            // ===== SHIFT MANAGEMENT POLICIES =====

            // Define ShiftRead policy - users with read permissions can view shifts
            options.AddPolicy("ShiftRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "shift.read")));

            // Define ShiftManagement policy - users with shift management permissions
            options.AddPolicy("ShiftManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "shift.create") ||
                    context.User.HasClaim("permission", "shift.update") ||
                    context.User.HasClaim("permission", "shift.delete") ||
                    context.User.HasClaim("permission", "shift.manage")));

            // Define ShiftAssignment policy - users who can assign shifts to employees
            options.AddPolicy("ShiftAssignment", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "shift.assign")));

            // ===== SETTINGS & CONFIGURATION POLICIES =====

            // Define SettingsManagement policy - users who can manage system settings
            options.AddPolicy("SettingsManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "settings.create") ||
                    context.User.HasClaim("permission", "settings.update") ||
                    context.User.HasClaim("permission", "settings.delete") ||
                    context.User.HasClaim("permission", "settings.manage") ||
                    context.User.HasClaim("permission", "settings.overtime.manage")));

            // Define SettingsRead policy - users who can read system settings
            options.AddPolicy("SettingsRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "settings.read") ||
                    context.User.HasClaim("permission", "settings.overtime.read")));

            // Define PermissionManagement policy - users who can manage permissions
            options.AddPolicy("PermissionManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "permission.read") ||
                    context.User.HasClaim("permission", "permission.manage")));

            // Define SystemConfiguration policy - users who can configure core system settings
            options.AddPolicy("SystemConfiguration", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "system.configure")));

            // ===== AUDIT & REPORTING POLICIES =====

            // Define ReportAccess policy - users who can access reports and analytics
            options.AddPolicy("ReportAccess", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "report.read") ||
                    context.User.HasClaim("permission", "report.view")));

            // Define AuditAccess policy - users who can access audit logs
            options.AddPolicy("AuditAccess", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "audit.read")));

            // Define VacationRead policy - users who can view vacation types and requests
            options.AddPolicy("VacationRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "vacation.read")));

            // Define VacationCreate policy - users who can create vacation types and requests
            options.AddPolicy("VacationCreate", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "vacation.create")));

            // Define VacationTypeRead policy - users who can view vacation types
            // Employees need this permission to see vacation types when creating vacation requests
            options.AddPolicy("VacationTypeRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "vacationType.read")));

            // Define VacationTypeManagement policy - users who can manage vacation types (admin level)
            options.AddPolicy("VacationTypeManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "vacationType.create") ||
                    context.User.HasClaim("permission", "vacationType.update") ||
                    context.User.HasClaim("permission", "vacationType.delete") ||
                    context.User.HasClaim("permission", "vacationType.manage")));

            // Define VacationApprove policy - users who can approve vacation requests
            options.AddPolicy("VacationApprove", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "vacation.approve")));

            // Define VacationManagement policy - comprehensive vacation management access
            options.AddPolicy("VacationManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "vacation.manage")));

            // Define VacationBulkCreate policy - users who can create bulk vacation assignments
            options.AddPolicy("VacationBulkCreate", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "vacation.bulkCreate")));

            // ===== EXCUSE POLICY MANAGEMENT POLICIES =====

            // Define SettingsExcusePolicyRead policy - users who can view excuse policies
            options.AddPolicy("SettingsExcusePolicyRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "settings.excusePolicy.read")));

            // Define SettingsExcusePolicyCreate policy - users who can create excuse policies
            options.AddPolicy("SettingsExcusePolicyCreate", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "settings.excusePolicy.create")));

            // Define SettingsExcusePolicyUpdate policy - users who can update excuse policies
            options.AddPolicy("SettingsExcusePolicyUpdate", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "settings.excusePolicy.update")));

            // Define SettingsExcusePolicyDelete policy - users who can delete excuse policies
            options.AddPolicy("SettingsExcusePolicyDelete", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "settings.excusePolicy.delete")));

            // Define SettingsExcusePolicyManagement policy - comprehensive excuse policy management
            options.AddPolicy("SettingsExcusePolicyManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "settings.excusePolicy.manage")));

            // ===== EMPLOYEE EXCUSE MANAGEMENT POLICIES =====

            // Define ExcuseRead policy - users who can view employee excuses
            options.AddPolicy("ExcuseRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "excuse.read")));

            // Define ExcuseCreate policy - users who can create excuse requests
            options.AddPolicy("ExcuseCreate", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "excuse.create")));

            // Define ExcuseUpdate policy - users who can update excuse requests
            options.AddPolicy("ExcuseUpdate", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "excuse.update")));

            // Define ExcuseDelete policy - users who can delete excuse requests
            options.AddPolicy("ExcuseDelete", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "excuse.delete")));

            // Define ExcuseApprove policy - users who can approve excuse requests
            options.AddPolicy("ExcuseApprove", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "excuse.approve")));

            // Define ExcuseManagement policy - comprehensive excuse management access
            options.AddPolicy("ExcuseManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "excuse.manage")));

            // ===== ATTENDANCE CORRECTION POLICIES =====

            // Define AttendanceRead policy - users who can view attendance correction requests
            options.AddPolicy("AttendanceRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "attendanceCorrection.read")));

            // Define AttendanceCreate policy - users who can create attendance correction requests
            options.AddPolicy("AttendanceCreate", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "attendanceCorrection.create")));

            // Define AttendanceUpdate policy - users who can update their own correction requests
            options.AddPolicy("AttendanceUpdate", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "attendanceCorrection.update")));

            // Define AttendanceDelete policy - users who can delete/cancel correction requests
            options.AddPolicy("AttendanceDelete", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "attendanceCorrection.delete")));

            // Define AttendanceApprove policy - users who can approve/reject correction requests
            options.AddPolicy("AttendanceApprove", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "attendanceCorrection.approve")));

            // ===== PORTAL & SELF-SERVICE POLICIES =====

            // Define ManagerAccess policy - users with manager role who can access manager dashboard
            options.AddPolicy("ManagerAccess", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "portal.manager")));

            // Define AdminAccess policy - users with admin privileges for fingerprint request completion
            options.AddPolicy("AdminAccess", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "fingerprint.complete")));

            // Phase 1: Employee Lifecycle policies
            options.AddPolicy("ContractRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "contract.read")));

            options.AddPolicy("ContractManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "contract.manage")));

            options.AddPolicy("TransferRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "transfer.read")));

            options.AddPolicy("TransferManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "transfer.manage")));

            options.AddPolicy("PromotionRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "promotion.read")));

            options.AddPolicy("PromotionManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "promotion.manage")));

            options.AddPolicy("SalaryAdjustmentRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "salaryAdjustment.read")));

            options.AddPolicy("SalaryAdjustmentManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "salaryAdjustment.manage")));

            // Phase 1: Payroll policies
            options.AddPolicy("PayrollRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "payroll.read")));

            options.AddPolicy("PayrollManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "payroll.manage")));

            options.AddPolicy("SalaryStructureRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "salaryStructure.read")));

            options.AddPolicy("SalaryStructureManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "salaryStructure.manage")));

            options.AddPolicy("TaxConfigurationManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "taxConfiguration.manage")));

            options.AddPolicy("SocialInsuranceManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.HasClaim("permission", "socialInsurance.manage")));

            options.AddPolicy("InsuranceManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "insurance.manage")));

            // Phase 1: Offboarding policies
            options.AddPolicy("ResignationRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "resignation.read")));

            options.AddPolicy("ResignationManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "resignation.manage")));

            options.AddPolicy("TerminationRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "termination.read")));

            options.AddPolicy("TerminationManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "termination.manage")));

            options.AddPolicy("ClearanceRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "clearance.read")));

            options.AddPolicy("ClearanceManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "clearance.manage")));

            options.AddPolicy("EndOfServiceRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "endOfService.read")));

            options.AddPolicy("EndOfServiceManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "endOfService.manage")));

            options.AddPolicy("FinalSettlementRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "finalSettlement.read")));

            options.AddPolicy("FinalSettlementManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "finalSettlement.manage")));

            options.AddPolicy("ExitInterviewRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "exitInterview.read")));

            options.AddPolicy("ExitInterviewManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "exitInterview.manage")));

            // Allowance Management policies
            options.AddPolicy("AllowanceTypeRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "allowanceType.read")));

            options.AddPolicy("AllowanceTypeManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "allowanceType.manage")));

            options.AddPolicy("AllowancePolicyRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "allowancePolicy.read")));

            options.AddPolicy("AllowancePolicyManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "allowancePolicy.manage")));

            options.AddPolicy("AllowanceAssignmentRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "allowanceAssignment.read")));

            options.AddPolicy("AllowanceAssignmentManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "allowanceAssignment.manage")));

            options.AddPolicy("AllowanceRequestRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "allowanceRequest.read")));

            options.AddPolicy("AllowanceRequestManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "allowanceRequest.manage")));

            // ===== PHASE 2: RECRUITMENT POLICIES =====

            options.AddPolicy("JobRequisitionRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "jobRequisition.read")));

            options.AddPolicy("JobRequisitionManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "jobRequisition.manage")));

            options.AddPolicy("JobPostingRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "jobPosting.read")));

            options.AddPolicy("JobPostingManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "jobPosting.manage")));

            options.AddPolicy("CandidateRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "candidate.read")));

            options.AddPolicy("CandidateManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "candidate.manage")));

            options.AddPolicy("JobApplicationRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "jobApplication.read")));

            options.AddPolicy("JobApplicationManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "jobApplication.manage")));

            options.AddPolicy("InterviewRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "interview.read")));

            options.AddPolicy("InterviewManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "interview.manage")));

            options.AddPolicy("OfferLetterRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "offerLetter.read")));

            options.AddPolicy("OfferLetterManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "offerLetter.manage")));

            // ===== PHASE 2: ONBOARDING POLICIES =====

            options.AddPolicy("OnboardingTemplateRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "onboardingTemplate.read")));

            options.AddPolicy("OnboardingTemplateManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "onboardingTemplate.manage")));

            options.AddPolicy("OnboardingRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "onboarding.read")));

            options.AddPolicy("OnboardingManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "onboarding.manage")));

            // ===== PHASE 2: PERFORMANCE POLICIES =====

            options.AddPolicy("PerformanceReviewCycleRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "performanceReviewCycle.read")));

            options.AddPolicy("PerformanceReviewCycleManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "performanceReviewCycle.manage")));

            options.AddPolicy("PerformanceReviewRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "performanceReview.read")));

            options.AddPolicy("PerformanceReviewManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "performanceReview.manage")));

            options.AddPolicy("GoalRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "goal.read")));

            options.AddPolicy("GoalManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "goal.manage")));

            options.AddPolicy("CompetencyFrameworkRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "competencyFramework.read")));

            options.AddPolicy("CompetencyFrameworkManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "competencyFramework.manage")));

            options.AddPolicy("PipRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "pip.read")));

            options.AddPolicy("PipManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "pip.manage")));

            options.AddPolicy("Feedback360Read", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "feedback360.read")));

            options.AddPolicy("Feedback360Management", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "feedback360.manage")));

            // ===== PHASE 3: DOCUMENTS & LETTERS POLICIES =====

            options.AddPolicy("DocumentCategoryRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "documentCategory.read")));

            options.AddPolicy("DocumentCategoryManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "documentCategory.manage")));

            options.AddPolicy("EmployeeDocumentRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "employeeDocument.read")));

            options.AddPolicy("EmployeeDocumentManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "employeeDocument.manage")));

            options.AddPolicy("CompanyPolicyRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.IsInRole("Employee") ||
                    context.User.HasClaim("permission", "companyPolicy.read")));

            options.AddPolicy("CompanyPolicyManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "companyPolicy.manage")));

            options.AddPolicy("LetterTemplateRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "letterTemplate.read")));

            options.AddPolicy("LetterTemplateManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "letterTemplate.manage")));

            options.AddPolicy("LetterRequestRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "letterRequest.read")));

            options.AddPolicy("LetterRequestManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "letterRequest.manage")));

            // ===== PHASE 3: EXPENSE POLICIES =====

            options.AddPolicy("ExpenseCategoryRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "expenseCategory.read")));

            options.AddPolicy("ExpenseCategoryManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "expenseCategory.manage")));

            options.AddPolicy("ExpensePolicyRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "expensePolicy.read")));

            options.AddPolicy("ExpensePolicyManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "expensePolicy.manage")));

            options.AddPolicy("ExpenseClaimRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "expenseClaim.read")));

            options.AddPolicy("ExpenseClaimManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "expenseClaim.manage")));

            // ===== PHASE 3: LOAN POLICIES =====

            options.AddPolicy("LoanTypeRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "loanType.read")));

            options.AddPolicy("LoanTypeManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "loanType.manage")));

            options.AddPolicy("LoanPolicyRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "loanPolicy.read")));

            options.AddPolicy("LoanPolicyManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "loanPolicy.manage")));

            options.AddPolicy("LoanApplicationRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "loanApplication.read")));

            options.AddPolicy("LoanApplicationManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "loanApplication.manage")));

            options.AddPolicy("SalaryAdvanceRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "salaryAdvance.read")));

            options.AddPolicy("SalaryAdvanceManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "salaryAdvance.manage")));

            // ===== PHASE 4: ANNOUNCEMENT POLICIES =====

            options.AddPolicy("AnnouncementCategoryRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "announcementCategory.read")));

            options.AddPolicy("AnnouncementCategoryManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "announcementCategory.manage")));

            options.AddPolicy("AnnouncementRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "announcement.read")));

            options.AddPolicy("AnnouncementManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "announcement.manage")));

            // ===== PHASE 4: TRAINING & DEVELOPMENT POLICIES =====

            options.AddPolicy("TrainingCategoryRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingCategory.read")));

            options.AddPolicy("TrainingCategoryManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingCategory.manage")));

            options.AddPolicy("TrainingCourseRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingCourse.read")));

            options.AddPolicy("TrainingCourseManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingCourse.manage")));

            options.AddPolicy("TrainingProgramRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingProgram.read")));

            options.AddPolicy("TrainingProgramManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingProgram.manage")));

            options.AddPolicy("TrainingSessionRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingSession.read")));

            options.AddPolicy("TrainingSessionManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingSession.manage")));

            options.AddPolicy("TrainingEnrollmentRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingEnrollment.read")));

            options.AddPolicy("TrainingEnrollmentManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingEnrollment.manage")));

            options.AddPolicy("TrainingEvaluationRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingEvaluation.read")));

            options.AddPolicy("TrainingEvaluationManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingEvaluation.manage")));

            options.AddPolicy("EmployeeCertificationRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "employeeCertification.read")));

            options.AddPolicy("EmployeeCertificationManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "employeeCertification.manage")));

            options.AddPolicy("TrainingBudgetRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingBudget.read")));

            options.AddPolicy("TrainingBudgetManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "trainingBudget.manage")));
            // ===== PHASE 4: EMPLOYEE RELATIONS POLICIES =====

            options.AddPolicy("GrievanceRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "grievance.read")));

            options.AddPolicy("GrievanceManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "grievance.manage")));

            options.AddPolicy("DisciplinaryActionRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "disciplinaryAction.read")));

            options.AddPolicy("DisciplinaryActionManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "disciplinaryAction.manage")));

            options.AddPolicy("InvestigationRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "investigation.read")));

            options.AddPolicy("InvestigationManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "investigation.manage")));

            options.AddPolicy("CounselingRecordRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "counselingRecord.read")));

            options.AddPolicy("CounselingRecordManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "counselingRecord.manage")));

            // ===== PHASE 5: ASSET MANAGEMENT POLICIES =====

            options.AddPolicy("AssetCategoryRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "assetCategory.read")));

            options.AddPolicy("AssetCategoryManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "assetCategory.manage")));

            options.AddPolicy("AssetRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "asset.read")));

            options.AddPolicy("AssetManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "asset.manage")));

            options.AddPolicy("AssetAssignmentRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "assetAssignment.read")));

            options.AddPolicy("AssetAssignmentManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "assetAssignment.manage")));

            options.AddPolicy("AssetMaintenanceRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "assetMaintenance.read")));

            options.AddPolicy("AssetMaintenanceManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "assetMaintenance.manage")));

            // ===== PHASE 5: EMPLOYEE ENGAGEMENT & SURVEYS POLICIES =====

            options.AddPolicy("SurveyTemplateRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "surveyTemplate.read")));

            options.AddPolicy("SurveyTemplateManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "surveyTemplate.manage")));

            options.AddPolicy("SurveyDistributionRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "surveyDistribution.read")));

            options.AddPolicy("SurveyDistributionManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "surveyDistribution.manage")));

            options.AddPolicy("SurveyResponseRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "surveyResponse.read")));

            options.AddPolicy("SurveyResponseManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "surveyResponse.manage")));

            // ===== PHASE 5: ADVANCED ANALYTICS POLICIES =====

            options.AddPolicy("AnalyticsRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "analytics.read")));

            options.AddPolicy("AnalyticsManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "analytics.manage")));

            options.AddPolicy("SavedDashboardRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "savedDashboard.read")));

            options.AddPolicy("SavedDashboardManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "savedDashboard.manage")));

            // ===== PHASE 6: TIMESHEET MANAGEMENT POLICIES =====

            options.AddPolicy("ProjectRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "project.read")));

            options.AddPolicy("ProjectManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "project.manage")));

            options.AddPolicy("ProjectTaskRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "projectTask.read")));

            options.AddPolicy("ProjectTaskManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "projectTask.manage")));

            options.AddPolicy("TimesheetPeriodRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "timesheetPeriod.read")));

            options.AddPolicy("TimesheetPeriodManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "timesheetPeriod.manage")));

            options.AddPolicy("TimesheetRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.IsInRole("Manager") ||
                    context.User.HasClaim("permission", "timesheet.read")));

            options.AddPolicy("TimesheetManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "timesheet.manage")));

            // Phase 6: Succession Planning & Talent Management
            options.AddPolicy("KeyPositionRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "keyPosition.read")));

            options.AddPolicy("KeyPositionManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "keyPosition.manage")));

            options.AddPolicy("TalentProfileRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "talentProfile.read")));

            options.AddPolicy("TalentProfileManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "talentProfile.manage")));

            options.AddPolicy("SuccessionPlanRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "successionPlan.read")));

            options.AddPolicy("SuccessionPlanManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "successionPlan.manage")));

            options.AddPolicy("CareerPathRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "careerPath.read")));

            options.AddPolicy("CareerPathManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "careerPath.manage")));

            // ===== PHASE 6: BENEFITS ADMINISTRATION POLICIES =====

            options.AddPolicy("BenefitPlanRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "benefitPlan.read")));

            options.AddPolicy("BenefitPlanManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "benefitPlan.manage")));

            options.AddPolicy("BenefitEnrollmentRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "benefitEnrollment.read")));

            options.AddPolicy("BenefitEnrollmentManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "benefitEnrollment.manage")));

            options.AddPolicy("OpenEnrollmentPeriodRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "openEnrollmentPeriod.read")));

            options.AddPolicy("OpenEnrollmentPeriodManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "openEnrollmentPeriod.manage")));

            options.AddPolicy("BenefitClaimRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "benefitClaim.read")));

            options.AddPolicy("BenefitClaimManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "benefitClaim.manage")));

            // Phase 7: Enhancements
            options.AddPolicy("ShiftSwapRequestRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "shiftSwapRequest.read")));

            options.AddPolicy("ShiftSwapRequestManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "shiftSwapRequest.manage")));

            options.AddPolicy("OnCallScheduleRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "onCallSchedule.read")));

            options.AddPolicy("OnCallScheduleManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "onCallSchedule.manage")));

            options.AddPolicy("CompensatoryOffRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "compensatoryOff.read")));

            options.AddPolicy("CompensatoryOffManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "compensatoryOff.manage")));

            options.AddPolicy("LeaveEncashmentRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "leaveEncashment.read")));

            options.AddPolicy("LeaveEncashmentManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "leaveEncashment.manage")));

            options.AddPolicy("CustomReportRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "customReport.read")));

            options.AddPolicy("CustomReportManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "customReport.manage")));

            options.AddPolicy("ScheduledReportRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "scheduledReport.read")));

            options.AddPolicy("ScheduledReportManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("HR") ||
                    context.User.HasClaim("permission", "scheduledReport.manage")));
        });
        services.AddHttpContextAccessor();

        return services;
    }

    /// <summary>
    /// Configures PostgreSQL database with connection resiliency and performance optimizations.
    /// </summary>
    /// <param name="services">Service collection for dependency injection</param>
    /// <param name="configuration">Application configuration</param>
    private static void ConfigureDatabase(IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? configuration.GetConnectionString("PostgreSqlConnection")
            ?? throw new InvalidOperationException(
                "PostgreSQL connection string not found. " +
                "Please ensure 'DefaultConnection' is configured in appsettings.json");

        services.AddDbContext<TecAxleDbContext>(options =>
        {
            options.UseNpgsql(connectionString, npgsqlOptions =>
            {
                npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorCodesToAdd: null);
                npgsqlOptions.CommandTimeout(30);
                npgsqlOptions.MigrationsAssembly(typeof(TecAxleDbContext).Assembly.FullName);
            });
            options.ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning));
        });
    }
}