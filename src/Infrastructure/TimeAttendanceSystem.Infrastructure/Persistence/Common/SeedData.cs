using TecAxle.Hrms.Domain.Users;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Shifts;
using TecAxle.Hrms.Domain.Settings;
using TecAxle.Hrms.Domain.Excuses;
using TecAxle.Hrms.Domain.RemoteWork;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;
using TecAxle.Hrms.Domain.VacationTypes;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace TecAxle.Hrms.Infrastructure.Persistence;

public static class SeedData
{
    public static async Task SeedAsync(TecAxleDbContext context)
    {
        // Always ensure all permissions are created and up-to-date
        await SeedPermissionsAsync(context);

        if (!await context.Roles.AnyAsync())
        {
            await SeedRolesAsync(context);
        }

        if (!await context.Users.AnyAsync())
        {
            await SeedUsersAsync(context);
        }

        // Always ensure SystemAdmin has all permissions (including newly added ones)
        await EnsureSystemAdminHasAllPermissionsAsync(context);

        if (!await context.Shifts.AnyAsync())
        {
            await SeedDefaultShiftAsync(context);
        }

        if (!await context.RemoteWorkPolicies.AnyAsync())
        {
            await SeedDefaultRemoteWorkPolicyAsync(context);
        }

        if (!await context.WorkflowDefinitions.AnyAsync())
        {
            await SeedDefaultWorkflowsAsync(context);
        }

        if (!await context.VacationTypes.AnyAsync())
        {
            await SeedDefaultVacationTypesAsync(context);
        }

        if (!await context.ExcusePolicies.AnyAsync())
        {
            await SeedDefaultExcusePolicyAsync(context);
        }

        if (!await context.AllowanceTypes.AnyAsync())
        {
            await SeedDefaultAllowanceTypesAsync(context);
        }

        // v13.3: Default End-of-Service policy (Saudi-standard formula) if none exists.
        if (!await context.EndOfServicePolicies.AnyAsync())
        {
            await SeedDefaultEndOfServicePolicyAsync(context);
        }

        await context.SaveChangesAsync();

        Console.WriteLine("Tenant database seeding completed (permissions, roles, systemadmin user, default shift, remote work policy, default workflows, vacation types, excuse policy, allowance types, end-of-service policy)");
    }

    private static Task SeedDefaultEndOfServicePolicyAsync(TecAxleDbContext context)
    {
        var effectiveFrom = new DateTime(2000, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        var policy = new Domain.Offboarding.EndOfServicePolicy
        {
            Name = "SA Standard EOS",
            Description = "Default end-of-service policy seeded at first run. Replaces hardcoded Saudi labor-law formula in v13.3.",
            CountryCode = "SA",
            IsActive = true,
            EffectiveFromDate = effectiveFrom,
            MinimumServiceYearsForEligibility = 0m,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };
        policy.Tiers.Add(new Domain.Offboarding.EndOfServicePolicyTier
        {
            MinYearsInclusive = 0m, MaxYearsExclusive = 5m, MonthsPerYearMultiplier = 0.5m,
            SortOrder = 1, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "SYSTEM"
        });
        policy.Tiers.Add(new Domain.Offboarding.EndOfServicePolicyTier
        {
            MinYearsInclusive = 5m, MaxYearsExclusive = null, MonthsPerYearMultiplier = 1.0m,
            SortOrder = 2, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "SYSTEM"
        });
        policy.ResignationDeductions.Add(new Domain.Offboarding.EndOfServiceResignationDeductionTier
        {
            MinYearsInclusive = 0m, MaxYearsExclusive = 2m, DeductionFraction = 1.0m,
            SortOrder = 1, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "SYSTEM"
        });
        policy.ResignationDeductions.Add(new Domain.Offboarding.EndOfServiceResignationDeductionTier
        {
            MinYearsInclusive = 2m, MaxYearsExclusive = 5m, DeductionFraction = 2m / 3m,
            SortOrder = 2, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "SYSTEM"
        });
        policy.ResignationDeductions.Add(new Domain.Offboarding.EndOfServiceResignationDeductionTier
        {
            MinYearsInclusive = 5m, MaxYearsExclusive = 10m, DeductionFraction = 1m / 3m,
            SortOrder = 3, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "SYSTEM"
        });
        policy.ResignationDeductions.Add(new Domain.Offboarding.EndOfServiceResignationDeductionTier
        {
            MinYearsInclusive = 10m, MaxYearsExclusive = null, DeductionFraction = 0m,
            SortOrder = 4, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "SYSTEM"
        });
        context.EndOfServicePolicies.Add(policy);
        return Task.CompletedTask;
    }

    private static async Task SeedPermissionsAsync(TecAxleDbContext context)
    {
        var permissions = new List<Permission>();

        // User Management - Extended CRUD with specialized actions
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.User, "User Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.User, "User Management",
            PermissionActions.AssignRole, PermissionActions.RemoveRole, PermissionActions.ResetPassword,
            PermissionActions.Lock, PermissionActions.Unlock, PermissionActions.Activate, PermissionActions.Deactivate));

        // Role Management - Extended CRUD with permission assignment
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Role, "Role Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Role, "Role Management",
            PermissionActions.AssignPermission, PermissionActions.RemovePermission, PermissionActions.Manage));

        // Employee Management - Full CRUD with import/export
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Employee, "Employee Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Employee, "Employee Management",
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Assign, PermissionActions.Unassign, PermissionActions.Manage));

        // Branch Management - Standard operations
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Branch, "Branch Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Branch, "Branch Management",
            PermissionActions.Activate, PermissionActions.Deactivate));

        // Department Management - Standard operations
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Department, "Department Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Department, "Department Management",
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Assign, PermissionActions.Unassign));

        // Shift Management - Full CRUD with assignment capabilities
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Shift, "Shift Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Shift, "Shift Management",
            PermissionActions.Assign, PermissionActions.Unassign));

        // Attendance Management - Extended CRUD with approval
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Attendance, "Attendance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Attendance, "Attendance Management",
            PermissionActions.Approve, PermissionActions.Reject));

        // Report Management - Read and view focused
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Report, "Reporting",
            PermissionActions.Read, PermissionActions.View, PermissionActions.Export));

        // System Administration - Core system functions
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.System, "System Administration",
            PermissionActions.Configure, PermissionActions.Manage, PermissionActions.Restore));

        // Audit Management - Read-only with export
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Audit, "Audit Management",
            PermissionActions.Read, PermissionActions.Export));

        // Settings Management - Configuration and preferences
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Settings, "Settings Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Settings, "Settings Management",
            PermissionActions.Configure, PermissionActions.Manage));

        // Schedule Management - Work schedules and planning
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Schedule, "Schedule Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Schedule, "Schedule Management",
            PermissionActions.Assign, PermissionActions.Unassign, PermissionActions.Approve, PermissionActions.Reject));

        // Dashboard Management - Views and widgets
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Dashboard, "Dashboard Management",
            PermissionActions.Read, PermissionActions.View, PermissionActions.Configure));

        // Permission Management - Direct permission control
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Permission, "Permission Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Permission, "Permission Management",
            PermissionActions.Assign, PermissionActions.Unassign, PermissionActions.Manage));

        // Notification Management - System alerts and messages
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Notification, "Notification Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Notification, "Notification Management",
            PermissionActions.Activate, PermissionActions.Deactivate));

        // Overtime Management - Settings for overtime calculation and configuration
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions("settings.overtime", "Overtime Management",
            PermissionActions.Read, PermissionActions.Create, PermissionActions.Update, PermissionActions.Delete,
            PermissionActions.Configure, PermissionActions.Manage, PermissionActions.Activate));

        // Public Holiday Management - Managing public holidays and calendar
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.PublicHoliday, "Public Holiday Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.PublicHoliday, "Public Holiday Management",
            PermissionActions.Configure, PermissionActions.Manage,
            PermissionActions.Activate, PermissionActions.Deactivate));

        // Vacation Type Management - Managing vacation types and leave policies
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.VacationType, "Vacation Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.VacationType, "Vacation Management",
            PermissionActions.Configure, PermissionActions.Manage,
            PermissionActions.Activate, PermissionActions.Deactivate));

        // Employee Vacation Management - Managing employee vacation records
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Vacation, "Employee Vacation Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Vacation, "Employee Vacation Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.View, PermissionActions.BulkCreate));

        // Leave Balance Management - Managing leave balances, entitlements and accruals
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.LeaveBalance, "Leave Balance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.LeaveBalance, "Leave Balance Management",
            PermissionActions.View, PermissionActions.Manage, PermissionActions.Configure, "adjust", "accrue"));

        // Excuse Policy Management - Settings for excuse policies
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions("settings.excusePolicy", "Excuse Policy Management",
            PermissionActions.Read, PermissionActions.Create, PermissionActions.Update, PermissionActions.Delete,
            PermissionActions.Configure, PermissionActions.Manage, PermissionActions.Activate, PermissionActions.Deactivate));

        // Employee Excuse Management - Managing employee excuse requests
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Excuse, "Employee Excuse Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Excuse, "Employee Excuse Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.View, PermissionActions.BulkCreate));

        // Remote Work Policy Management - Settings for remote work policies
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions("remoteWork.policy", "Remote Work Policy Management",
            PermissionActions.Read, PermissionActions.Create, PermissionActions.Update, PermissionActions.Delete,
            PermissionActions.Configure, PermissionActions.Manage, PermissionActions.Activate, PermissionActions.Deactivate));

        // Remote Work Request Management - Managing remote work requests
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions("remoteWork.request", "Remote Work Request Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions("remoteWork.request", "Remote Work Request Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.View, "cancel"));

        // Session Management - Managing user sessions and security
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Session, "Session Management",
            PermissionActions.Read, PermissionActions.Delete, PermissionActions.Manage));

        // Workflow Management - Managing approval workflow definitions
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Workflow, "Workflow Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Workflow, "Workflow Management",
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Manage));

        // Approval Management - Managing approval queue and actions
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Approval, "Approval Management",
            PermissionActions.Read, PermissionActions.Approve, PermissionActions.Reject, "delegate"));

        // Phase 1: Employee Lifecycle
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Contract, "Contract Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Contract, "Contract Management",
            PermissionActions.Approve, PermissionActions.Manage, PermissionActions.Activate, PermissionActions.Deactivate));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Transfer, "Transfer Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Transfer, "Transfer Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Promotion, "Promotion Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Promotion, "Promotion Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.SalaryAdjustment, "Salary Adjustment Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.SalaryAdjustment, "Salary Adjustment Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.JobGrade, "Job Grade Management"));

        // Phase 1: Payroll
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Payroll, "Payroll Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Payroll, "Payroll Management",
            PermissionActions.Approve, PermissionActions.Manage, PermissionActions.View, "process"));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.SalaryStructure, "Salary Structure Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.SalaryStructure, "Salary Structure Management",
            PermissionActions.Manage, PermissionActions.Activate, PermissionActions.Deactivate));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.TaxConfiguration, "Tax Configuration Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.TaxConfiguration, "Tax Configuration Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.SocialInsurance, "Social Insurance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.SocialInsurance, "Social Insurance Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Insurance, "Insurance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Insurance, "Insurance Management",
            PermissionActions.Manage));

        // Phase 1: Offboarding
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Resignation, "Resignation Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Resignation, "Resignation Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Termination, "Termination Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Termination, "Termination Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Clearance, "Clearance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Clearance, "Clearance Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.EndOfService, "End of Service Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.EndOfService, "End of Service Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.FinalSettlement, "Final Settlement Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.FinalSettlement, "Final Settlement Management",
            PermissionActions.Approve, PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.ExitInterview, "Exit Interview Management"));

        // Allowance Management
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.AllowanceType, "Allowance Type Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.AllowancePolicy, "Allowance Policy Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.AllowancePolicy, "Allowance Policy Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.AllowanceAssignment, "Allowance Assignment Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.AllowanceAssignment, "Allowance Assignment Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.AllowanceRequest, "Allowance Request Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.AllowanceRequest, "Allowance Request Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));

        // Phase 2: Recruitment
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.JobRequisition, "Job Requisition Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.JobRequisition, "Job Requisition Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.JobPosting, "Job Posting Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.JobPosting, "Job Posting Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Candidate, "Candidate Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.JobApplication, "Job Application Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.JobApplication, "Job Application Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Interview, "Interview Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.OfferLetter, "Offer Letter Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.OfferLetter, "Offer Letter Management",
            PermissionActions.Approve, PermissionActions.Manage));

        // Phase 2: Onboarding
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.OnboardingTemplate, "Onboarding Template Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.OnboardingTemplate, "Onboarding Template Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.OnboardingProcess, "Onboarding Process Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.OnboardingProcess, "Onboarding Process Management",
            PermissionActions.Manage));

        // Phase 2: Performance
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.PerformanceReviewCycle, "Performance Review Cycle Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.PerformanceReviewCycle, "Performance Review Cycle Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.PerformanceReview, "Performance Review Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.PerformanceReview, "Performance Review Management",
            PermissionActions.Approve, PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Goal, "Goal Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.CompetencyFramework, "Competency Framework Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.CompetencyFramework, "Competency Framework Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Pip, "PIP Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Pip, "PIP Management",
            PermissionActions.Approve, PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Feedback360, "360 Feedback Management"));

        // Phase 3: Documents & Letters
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.DocumentCategory, "Document Category Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.EmployeeDocument, "Employee Document Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.EmployeeDocument, "Employee Document Management",
            PermissionActions.Manage, "verify"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.CompanyPolicy, "Company Policy Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.CompanyPolicy, "Company Policy Management",
            PermissionActions.Manage, "publish", "acknowledge"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.LetterTemplate, "Letter Template Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.LetterTemplate, "Letter Template Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.LetterRequest, "Letter Request Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.LetterRequest, "Letter Request Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));

        // Phase 3: Expenses
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.ExpenseCategory, "Expense Category Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.ExpensePolicy, "Expense Policy Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.ExpensePolicy, "Expense Policy Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.ExpenseClaim, "Expense Claim Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.ExpenseClaim, "Expense Claim Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));

        // Phase 3: Loans
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.LoanType, "Loan Type Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.LoanPolicy, "Loan Policy Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.LoanPolicy, "Loan Policy Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.LoanApplication, "Loan Application Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.LoanApplication, "Loan Application Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.SalaryAdvance, "Salary Advance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.SalaryAdvance, "Salary Advance Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));

        // Phase 4: Announcements
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.AnnouncementCategory, "Announcement Category Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Announcement, "Announcement Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Announcement, "Announcement Management",
            "publish", "archive", "acknowledge", PermissionActions.Manage));

        // Phase 4: Training & Development
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.TrainingCategory, "Training Category Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.TrainingCourse, "Training Course Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.TrainingProgram, "Training Program Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.TrainingSession, "Training Session Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.TrainingSession, "Training Session Management",
            "complete", "cancel", PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.TrainingEnrollment, "Training Enrollment Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.TrainingEnrollment, "Training Enrollment Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.TrainingEvaluation, "Training Evaluation Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.EmployeeCertification, "Employee Certification Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.TrainingBudget, "Training Budget Management"));

        // Phase 4: Employee Relations
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.GrievanceResource, "Grievance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.GrievanceResource, "Grievance Management",
            PermissionActions.Assign, "escalate", "resolve", PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.DisciplinaryAction, "Disciplinary Action Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.DisciplinaryAction, "Disciplinary Action Management",
            PermissionActions.Approve, "acknowledge", PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Investigation, "Investigation Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Investigation, "Investigation Management",
            PermissionActions.Assign, "complete", PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.CounselingRecord, "Counseling Record Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.CounselingRecord, "Counseling Record Management",
            PermissionActions.Manage));

        // Phase 5: Asset Management
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.AssetCategory, "Asset Category Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Asset, "Asset Management"));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.AssetAssignment, "Asset Assignment Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.AssetAssignment, "Asset Assignment Management",
            PermissionActions.Approve, PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.AssetMaintenance, "Asset Maintenance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.AssetMaintenance, "Asset Maintenance Management",
            PermissionActions.Manage));

        // Phase 5: Employee Engagement & Surveys
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.SurveyTemplate, "Survey Template Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.SurveyTemplate, "Survey Template Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.SurveyDistribution, "Survey Distribution Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.SurveyDistribution, "Survey Distribution Management",
            "distribute", "close", PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.SurveyResponse, "Survey Response Management",
            PermissionActions.Read, PermissionActions.Export));

        // Phase 5: Advanced Analytics
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Analytics, "HR Analytics & Reporting",
            PermissionActions.Read, PermissionActions.Export, PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.SavedDashboard, "Saved Dashboard Management",
            PermissionActions.Read, PermissionActions.Create, PermissionActions.Update, PermissionActions.Delete, PermissionActions.Manage));

        // Phase 6: Timesheet Management
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.Project, "Project Management"));
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.ProjectTask, "Project Task Management"));
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.TimesheetPeriod, "Timesheet Period Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.TimesheetPeriod, "Timesheet Period Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.TimesheetResource, "Timesheet Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.TimesheetResource, "Timesheet Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Manage));

        // Phase 6: Succession Planning & Talent Management
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.KeyPosition, "Key Position Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.KeyPosition, "Key Position Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.TalentProfile, "Talent Profile Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.TalentProfile, "Talent Profile Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.SuccessionPlan, "Succession Plan Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.SuccessionPlan, "Succession Plan Management",
            PermissionActions.Manage));
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.CareerPath, "Career Path Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.CareerPath, "Career Path Management",
            PermissionActions.Manage));

        // Phase 6: Benefits Administration
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.BenefitPlan, "Benefit Plan Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.BenefitPlan, "Benefit Plan Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.BenefitEnrollment, "Benefit Enrollment Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.BenefitEnrollment, "Benefit Enrollment Management",
            PermissionActions.Approve, PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.OpenEnrollmentPeriod, "Open Enrollment Period Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.OpenEnrollmentPeriod, "Open Enrollment Period Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.BenefitClaim, "Benefit Claim Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.BenefitClaim, "Benefit Claim Management",
            PermissionActions.Approve, PermissionActions.Manage));

        // Phase 7: Attendance & Leave Enhancements
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.ShiftSwapRequest, "Shift Swap Request Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.ShiftSwapRequest, "Shift Swap Request Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.OnCallSchedule, "On-Call Schedule Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.OnCallSchedule, "On-Call Schedule Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.CompensatoryOff, "Compensatory Off Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.CompensatoryOff, "Compensatory Off Management",
            PermissionActions.Approve, PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.LeaveEncashment, "Leave Encashment Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.LeaveEncashment, "Leave Encashment Management",
            PermissionActions.Approve, PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.CustomReport, "Custom Report Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.CustomReport, "Custom Report Management",
            PermissionActions.Manage));

        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.ScheduledReport, "Scheduled Report Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.ScheduledReport, "Scheduled Report Management",
            PermissionActions.Manage));

        // Get existing permission keys
        var existingKeys = await context.Permissions
            .Where(p => !p.IsDeleted)
            .Select(p => p.Key)
            .ToListAsync();

        // Filter out existing permissions
        var newPermissions = permissions.Where(p => !existingKeys.Contains(p.Key)).ToList();

        if (newPermissions.Any())
        {
            Console.WriteLine($"Adding {newPermissions.Count} new permissions");

            // Insert in batches to avoid PostgreSQL parameter limit (each permission has ~8 properties)
            const int batchSize = 20;
            for (int i = 0; i < newPermissions.Count; i += batchSize)
            {
                var batch = newPermissions.Skip(i).Take(batchSize).ToList();
                await context.Permissions.AddRangeAsync(batch);
                await context.SaveChangesAsync();
                Console.WriteLine($"Inserted {Math.Min(i + batchSize, newPermissions.Count)}/{newPermissions.Count} permissions");
            }
        }
    }

    private static async Task SeedRolesAsync(TecAxleDbContext context)
    {
        var roles = new List<Role>
        {
            new Role
            {
                Name = "SystemAdmin",
                IsSystem = true,
                IsEditable = false,
                IsDeletable = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Role
            {
                Name = "Admin",
                IsSystem = true,
                IsEditable = false,
                IsDeletable = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Role
            {
                Name = "Manager",
                IsSystem = false,
                IsEditable = true,
                IsDeletable = true,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Role
            {
                Name = "Employee",
                IsSystem = false,
                IsEditable = true,
                IsDeletable = true,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            }
        };

        await context.Roles.AddRangeAsync(roles);
        await context.SaveChangesAsync();
    }

    private static async Task SeedUsersAsync(TecAxleDbContext context)
    {
        var (taHash, taSalt) = HashPassword("TempP@ssw0rd123!");
        var (saHash, saSalt) = HashPassword("TempP@ssw0rd123!");

        var tecaxleAdmin = new User
        {
            Username = "tecaxleadmin",
            Email = "tecaxleadmin@system.local",
            PasswordHash = taHash,
            PasswordSalt = taSalt,
            TwoFactorEnabled = false,
            EmailConfirmed = true,
            IsActive = true,
            IsSystemUser = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        var systemAdmin = new User
        {
            Username = "systemadmin",
            Email = "systemadmin@system.local",
            PasswordHash = saHash,
            PasswordSalt = saSalt,
            TwoFactorEnabled = false,
            EmailConfirmed = true,
            IsActive = true,
            IsSystemUser = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Users.AddRangeAsync(tecaxleAdmin, systemAdmin);
        await context.SaveChangesAsync();

        // Assign SystemAdmin role to both users
        var systemAdminRole = await context.Roles.FirstAsync(r => r.Name == "SystemAdmin");
        await context.UserRoles.AddRangeAsync(
            new UserRole { UserId = tecaxleAdmin.Id, RoleId = systemAdminRole.Id },
            new UserRole { UserId = systemAdmin.Id, RoleId = systemAdminRole.Id }
        );
        await context.SaveChangesAsync();
    }

    private static async Task EnsureSystemAdminHasAllPermissionsAsync(TecAxleDbContext context)
    {
        // Get SystemAdmin and Admin roles
        var systemAdminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "SystemAdmin");
        var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");

        if (systemAdminRole == null && adminRole == null)
        {
            Console.WriteLine("No protected roles found, skipping permission sync");
            return;
        }

        // Get all permissions
        var allPermissions = await context.Permissions.Where(p => !p.IsDeleted).ToListAsync();

        // Get system permissions (to exclude from Admin role)
        var systemPermissions = allPermissions
            .Where(p => p.Key.StartsWith(PermissionResources.System + "."))
            .ToList();

        // Handle SystemAdmin role - gets ALL permissions
        if (systemAdminRole != null)
        {
            await AssignPermissionsToRole(context, systemAdminRole, allPermissions, "SystemAdmin");
        }

        // Handle Admin role - gets all permissions EXCEPT system permissions
        if (adminRole != null)
        {
            var adminPermissions = allPermissions
                .Where(p => !p.Key.StartsWith(PermissionResources.System + "."))
                .ToList();

            await AssignPermissionsToRole(context, adminRole, adminPermissions, "Admin");
        }
    }

    private static async Task AssignPermissionsToRole(TecAxleDbContext context, Role role, List<Permission> permissionsToAssign, string roleName)
    {
        // Get existing role permissions for this role
        var existingRolePermissionIds = await context.RolePermissions
            .Where(rp => rp.RoleId == role.Id)
            .Select(rp => rp.PermissionId)
            .ToListAsync();

        // Find missing permissions
        var missingPermissions = permissionsToAssign
            .Where(p => !existingRolePermissionIds.Contains(p.Id))
            .ToList();

        if (missingPermissions.Any())
        {
            var newRolePermissions = missingPermissions.Select(p => new RolePermission
            {
                RoleId = role.Id,
                PermissionId = p.Id
            }).ToList();

            await context.RolePermissions.AddRangeAsync(newRolePermissions);
            await context.SaveChangesAsync();

            Console.WriteLine($"Added {newRolePermissions.Count} missing permissions to {roleName} role");
        }
        else
        {
            Console.WriteLine($"{roleName} role already has all required permissions");
        }
    }

    private static async Task SeedDefaultShiftAsync(TecAxleDbContext context)
    {
        // Create the default shift with extracted data from the current database
        var defaultShift = new Shift
        {
            Name = "Flexible hour 7:30 - 9:00",
            Description = "The default shift to all newly created employees",
            ShiftType = ShiftType.TimeBased,
            Status = ShiftStatus.Active,
            RequiredHours = null,
            IsCheckInRequired = true,
            IsAutoCheckOut = false,
            AllowFlexibleHours = true,
            FlexMinutesBefore = 30,
            FlexMinutesAfter = 60,
            GracePeriodMinutes = null,
            RequiredWeeklyHours = null,
            HasCoreHours = false,
            CoreStart = null,
            CoreEnd = null,
            IsSunday = true,
            IsMonday = true,
            IsTuesday = true,
            IsWednesday = true,
            IsThursday = true,
            IsFriday = false,
            IsSaturday = false,
            IsNightShift = false,
            IsDefault = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Shifts.AddAsync(defaultShift);
        await context.SaveChangesAsync();

        // Create the shift period
        var shiftPeriod = new ShiftPeriod
        {
            ShiftId = defaultShift.Id,
            PeriodOrder = 1,
            StartTime = new TimeOnly(8, 0), // 08:00
            EndTime = new TimeOnly(16, 0),  // 16:00
            Hours = 8.00m,
            IsNightPeriod = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.ShiftPeriods.AddAsync(shiftPeriod);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Default shift created: 'Flexible hour 7:30 - 9:00' (8:00-16:00)");
    }

    private static async Task SeedDefaultRemoteWorkPolicyAsync(TecAxleDbContext context)
    {
        // Create a company-wide default remote work policy
        var defaultPolicy = new RemoteWorkPolicy
        {
            BranchId = null, // Company-wide policy
            MaxDaysPerWeek = 3,
            MaxDaysPerMonth = 10,
            MaxDaysPerYear = 120,
            RequiresManagerApproval = false,
            AllowConsecutiveDays = true,
            MaxConsecutiveDays = 3,
            MinAdvanceNoticeDays = 1,
            BlackoutPeriods = null,
            CountForOvertime = true,
            EnforceShiftTimes = false,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.RemoteWorkPolicies.AddAsync(defaultPolicy);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Default remote work policy created: Company-wide (3 days/week, 10 days/month, 120 days/year)");
    }

    private static async Task SeedDefaultWorkflowsAsync(TecAxleDbContext context)
    {
        Console.WriteLine("Creating default workflows for Vacation, Excuse, Remote Work, and Attendance Correction requests...");

        var workflows = new List<WorkflowDefinition>();

        // 1. Vacation Request Workflow
        var vacationWorkflow = new WorkflowDefinition
        {
            Name = "Default Vacation Approval",
            NameAr = "موافقة الإجازة الافتراضية",
            Description = "Default workflow for vacation requests - requires direct manager approval",
            DescriptionAr = "مسار العمل الافتراضي لطلبات الإجازة - يتطلب موافقة المدير المباشر",
            EntityType = WorkflowEntityType.Vacation,
            IsActive = true,
            IsDefault = true,
            BranchId = null, // Organization-wide
            Version = 1,
            Priority = 10,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        };

        vacationWorkflow.Steps.Add(new WorkflowStep
        {
            StepOrder = 1,
            Name = "Direct Manager Approval",
            NameAr = "موافقة المدير المباشر",
            StepType = WorkflowStepType.Approval,
            ApproverType = ApproverType.DirectManager,
            TimeoutHours = 48, // 2 days
            NotifyOnAction = true,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        });

        workflows.Add(vacationWorkflow);

        // 2. Excuse Request Workflow
        var excuseWorkflow = new WorkflowDefinition
        {
            Name = "Default Excuse Approval",
            NameAr = "موافقة العذر الافتراضية",
            Description = "Default workflow for excuse requests - requires direct manager approval",
            DescriptionAr = "مسار العمل الافتراضي لطلبات الأعذار - يتطلب موافقة المدير المباشر",
            EntityType = WorkflowEntityType.Excuse,
            IsActive = true,
            IsDefault = true,
            BranchId = null,
            Version = 1,
            Priority = 10,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        };

        excuseWorkflow.Steps.Add(new WorkflowStep
        {
            StepOrder = 1,
            Name = "Direct Manager Approval",
            NameAr = "موافقة المدير المباشر",
            StepType = WorkflowStepType.Approval,
            ApproverType = ApproverType.DirectManager,
            TimeoutHours = 24, // 1 day
            NotifyOnAction = true,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        });

        workflows.Add(excuseWorkflow);

        // 3. Remote Work Request Workflow
        var remoteWorkWorkflow = new WorkflowDefinition
        {
            Name = "Default Remote Work Approval",
            NameAr = "موافقة العمل عن بعد الافتراضية",
            Description = "Default workflow for remote work requests - requires direct manager approval",
            DescriptionAr = "مسار العمل الافتراضي لطلبات العمل عن بعد - يتطلب موافقة المدير المباشر",
            EntityType = WorkflowEntityType.RemoteWork,
            IsActive = true,
            IsDefault = true,
            BranchId = null,
            Version = 1,
            Priority = 10,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        };

        remoteWorkWorkflow.Steps.Add(new WorkflowStep
        {
            StepOrder = 1,
            Name = "Direct Manager Approval",
            NameAr = "موافقة المدير المباشر",
            StepType = WorkflowStepType.Approval,
            ApproverType = ApproverType.DirectManager,
            TimeoutHours = 48, // 2 days
            NotifyOnAction = true,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        });

        workflows.Add(remoteWorkWorkflow);

        // 4. Attendance Correction Request Workflow
        var attendanceCorrectionWorkflow = new WorkflowDefinition
        {
            Name = "Default Attendance Correction Approval",
            NameAr = "موافقة تصحيح الحضور الافتراضية",
            Description = "Default workflow for attendance correction requests - requires direct manager approval",
            DescriptionAr = "مسار العمل الافتراضي لطلبات تصحيح الحضور - يتطلب موافقة المدير المباشر",
            EntityType = WorkflowEntityType.AttendanceCorrection,
            IsActive = true,
            IsDefault = true,
            BranchId = null,
            Version = 1,
            Priority = 10,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        };

        attendanceCorrectionWorkflow.Steps.Add(new WorkflowStep
        {
            StepOrder = 1,
            Name = "Direct Manager Approval",
            NameAr = "موافقة المدير المباشر",
            StepType = WorkflowStepType.Approval,
            ApproverType = ApproverType.DirectManager,
            TimeoutHours = 24, // 1 day
            NotifyOnAction = true,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        });

        workflows.Add(attendanceCorrectionWorkflow);

        await context.WorkflowDefinitions.AddRangeAsync(workflows);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Created 4 default workflows: Vacation, Excuse, Remote Work, and Attendance Correction - all with direct manager approval");
    }

    private static async Task SeedDefaultVacationTypesAsync(TecAxleDbContext context)
    {
        var vacationTypes = new List<VacationType>
        {
            new VacationType
            {
                Name = "Annual Leave",
                NameAr = "إجازة سنوية",
                IsActive = true,
                BranchId = null, // Applies to all branches
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Sick Leave",
                NameAr = "إجازة مرضية",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Unpaid Leave",
                NameAr = "إجازة بدون راتب",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Emergency Leave",
                NameAr = "إجازة طارئة",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Maternity Leave",
                NameAr = "إجازة أمومة",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Paternity Leave",
                NameAr = "إجازة أبوة",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Bereavement Leave",
                NameAr = "إجازة عزاء",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Marriage Leave",
                NameAr = "إجازة زواج",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            }
        };

        await context.VacationTypes.AddRangeAsync(vacationTypes);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Created 8 default vacation types: Annual, Sick, Unpaid, Emergency, Maternity, Paternity, Bereavement, Marriage Leave");
    }

    private static async Task SeedDefaultExcusePolicyAsync(TecAxleDbContext context)
    {
        // Create a company-wide default excuse policy
        var defaultPolicy = new ExcusePolicy
        {
            BranchId = null, // Organization-wide policy
            MaxPersonalExcusesPerMonth = 5,
            MaxPersonalExcuseHoursPerMonth = 8.0m,
            MaxPersonalExcuseHoursPerDay = 4.0m,
            MaxHoursPerExcuse = 2.0m,
            RequiresApproval = true,
            AllowPartialHourExcuses = true,
            MinimumExcuseDuration = 0.5m,
            IsActive = true,
            MaxRetroactiveDays = 7,
            AllowSelfServiceRequests = true,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow
        };

        await context.ExcusePolicies.AddAsync(defaultPolicy);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Default excuse policy created: Organization-wide (5 excuses/month, 8h/month, 2h max per excuse)");
    }

    private static (string hash, string salt) HashPassword(string password)
    {
        // Generate a random salt
        var saltBytes = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(saltBytes);
        }
        var salt = Convert.ToBase64String(saltBytes);

        // Hash the password with the salt using PBKDF2-SHA256 (same as login verification)
        using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256))
        {
            var hashBytes = pbkdf2.GetBytes(32);
            var hash = Convert.ToBase64String(hashBytes);
            return (hash, salt);
        }
    }

    private static async Task SeedDefaultAllowanceTypesAsync(TecAxleDbContext context)
    {
        var now = DateTime.UtcNow;
        var allowanceTypes = new[]
        {
            new Domain.Payroll.AllowanceType { Code = "BASIC", Name = "Basic Salary", NameAr = "الراتب الأساسي", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, IsTaxable = true, IsSocialInsurable = true, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "HOUSING", Name = "Housing Allowance", NameAr = "بدل سكن", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.PercentageOfBasic, DefaultPercentage = 25, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "TRANSPORT", Name = "Transport Allowance", NameAr = "بدل نقل", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, DefaultAmount = 500, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "PHONE", Name = "Phone Allowance", NameAr = "بدل هاتف", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, DefaultAmount = 200, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "FOOD", Name = "Food Allowance", NameAr = "بدل طعام", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, DefaultAmount = 300, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "OTHER_ALLOW", Name = "Other Allowance", NameAr = "بدل آخر", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "TAX", Name = "Tax Deduction", NameAr = "خصم ضريبي", Category = Domain.Common.AllowanceCategory.Deduction, DefaultCalculationType = Domain.Common.CalculationType.PercentageOfBasic, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "GOSI", Name = "Social Insurance (GOSI)", NameAr = "تأمينات اجتماعية", Category = Domain.Common.AllowanceCategory.Deduction, DefaultCalculationType = Domain.Common.CalculationType.PercentageOfBasic, DefaultPercentage = 9.75m, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "LOAN", Name = "Loan Deduction", NameAr = "خصم قرض", Category = Domain.Common.AllowanceCategory.Deduction, DefaultCalculationType = Domain.Common.CalculationType.Fixed, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "OTHER_DED", Name = "Other Deduction", NameAr = "خصم آخر", Category = Domain.Common.AllowanceCategory.Deduction, DefaultCalculationType = Domain.Common.CalculationType.Fixed, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "MEDICAL", Name = "Medical Insurance", NameAr = "تأمين طبي", Category = Domain.Common.AllowanceCategory.Benefit, DefaultCalculationType = Domain.Common.CalculationType.Fixed, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "OVERTIME", Name = "Overtime Pay", NameAr = "أجر عمل إضافي", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, IsTaxable = true, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "COMMISSION", Name = "Commission", NameAr = "عمولة", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, IsTaxable = true, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "BONUS", Name = "Bonus", NameAr = "مكافأة", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, IsTaxable = true, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "REMOTE", Name = "Remote Work Allowance", NameAr = "بدل عمل عن بعد", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, DefaultAmount = 300, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new Domain.Payroll.AllowanceType { Code = "HARDSHIP", Name = "Hardship Allowance", NameAr = "بدل مشقة", Category = Domain.Common.AllowanceCategory.Allowance, DefaultCalculationType = Domain.Common.CalculationType.Fixed, IsTaxable = false, IsSocialInsurable = false, IsActive = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" }
        };

        await context.AllowanceTypes.AddRangeAsync(allowanceTypes);
        await context.SaveChangesAsync();
        Console.WriteLine($"Seeded {allowanceTypes.Length} default allowance types");
    }


    // Platform-level seeds (subscription plans, policy templates, platform admin, tenant user emails)
    // have been moved to MasterSeedData.cs — they belong in the master database only.
}
