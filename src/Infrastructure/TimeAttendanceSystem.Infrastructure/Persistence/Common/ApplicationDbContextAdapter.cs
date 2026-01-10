using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Settings;
using TimeAttendanceSystem.Domain.VacationTypes;
using TimeAttendanceSystem.Domain.Vacations;
using TimeAttendanceSystem.Domain.Excuses;
using TimeAttendanceSystem.Domain.RemoteWork;
using TimeAttendanceSystem.Domain.Workflows;
using TimeAttendanceSystem.Domain.LeaveManagement;
using TimeAttendanceSystem.Domain.FingerprintRequests;
using TimeAttendanceSystem.Domain.Notifications;

namespace TimeAttendanceSystem.Infrastructure.Persistence;

public class ApplicationDbContextAdapter : IApplicationDbContext
{
    private readonly TimeAttendanceDbContext _context;

    public ApplicationDbContextAdapter(TimeAttendanceDbContext context)
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

    // Fingerprint Request entities
    public DbSet<FingerprintRequest> FingerprintRequests => _context.FingerprintRequests;

    // Notification entities
    public DbSet<Notification> Notifications => _context.Notifications;

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }
}