using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Coravel;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Infrastructure.BackgroundJobs;
using TimeAttendanceSystem.Infrastructure.Persistence;
using TimeAttendanceSystem.Infrastructure.Persistence.Repositories;
using TimeAttendanceSystem.Infrastructure.Security;
using TimeAttendanceSystem.Infrastructure.Services;

namespace TimeAttendanceSystem.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Configure database based on provider selection
        ConfigureDatabase(services, configuration);


        services.AddScoped<IApplicationDbContext, ApplicationDbContextAdapter>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddScoped<ICurrentUser, CurrentUser>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IPasswordService, PasswordService>();
        services.AddScoped<ITwoFactorService, TwoFactorService>();
        services.AddScoped<IDeviceService, DeviceService>();
        services.AddScoped<IPublicHolidayService, PublicHolidayService>();
        services.AddScoped<IAttendanceRepository, AttendanceRepository>();
        services.AddScoped<IAttendanceTransactionRepository, AttendanceTransactionRepository>();
        services.AddScoped<ISettingsRepository, SettingsRepository>();

        // Add Coravel for background jobs
        services.AddScheduler();
        services.AddTransient<DailyAttendanceGenerationJob>();

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
            options.AddPolicy("VacationTypeRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.IsInRole("Admin") ||
                    context.User.IsInRole("Manager") ||
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
        services.AddDbContext<TimeAttendanceDbContext>(options =>
        {
            var connectionString = configuration.GetConnectionString("PostgreSqlConnection")
                ?? configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException(
                    "PostgreSQL connection string not found. " +
                    "Please ensure 'PostgreSqlConnection' or 'DefaultConnection' is configured in appsettings.json");
            }

            // Configure Npgsql to handle DateTime without timezone automatically
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            options.UseNpgsql(connectionString, npgsqlOptions =>
            {
                // Enable connection resiliency (automatic retry on transient failures)
                npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorCodesToAdd: null);

                // Set command timeout (30 seconds)
                npgsqlOptions.CommandTimeout(30);

                // Specify migrations assembly
                npgsqlOptions.MigrationsAssembly(typeof(TimeAttendanceDbContext).Assembly.FullName);
            });

            // Common options
            var enableSensitiveDataLogging = configuration.GetValue<bool>("Logging:EnableSensitiveDataLogging");
            var enableDetailedErrors = configuration.GetValue<bool>("Logging:EnableDetailedErrors");

            if (enableSensitiveDataLogging)
            {
                options.EnableSensitiveDataLogging();
            }

            if (enableDetailedErrors)
            {
                options.EnableDetailedErrors();
            }
        });
    }
}