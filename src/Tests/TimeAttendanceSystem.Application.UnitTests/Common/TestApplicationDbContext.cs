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

namespace TimeAttendanceSystem.Application.UnitTests.Common;

public class TestApplicationDbContext : DbContext, IApplicationDbContext
{
    public TestApplicationDbContext(DbContextOptions<TestApplicationDbContext> options) : base(options) { }

    public DbSet<Branch> Branches { get; set; }
    public DbSet<Department> Departments => Set<Department>();
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
    public DbSet<WorkingDay> WorkingDays => Set<WorkingDay>();
    public DbSet<PublicHoliday> PublicHolidays => Set<PublicHoliday>();
    public DbSet<VacationType> VacationTypes => Set<VacationType>();
    public DbSet<EmployeeVacation> EmployeeVacations => Set<EmployeeVacation>();
    public DbSet<ExcusePolicy> ExcusePolicies => Set<ExcusePolicy>();
    public DbSet<EmployeeExcuse> EmployeeExcuses => Set<EmployeeExcuse>();
    public DbSet<RemoteWorkPolicy> RemoteWorkPolicies => Set<RemoteWorkPolicy>();
    public DbSet<RemoteWorkRequest> RemoteWorkRequests => Set<RemoteWorkRequest>();
    public DbSet<WorkflowDefinition> WorkflowDefinitions => Set<WorkflowDefinition>();
    public DbSet<WorkflowStep> WorkflowSteps => Set<WorkflowStep>();
    public DbSet<WorkflowInstance> WorkflowInstances => Set<WorkflowInstance>();
    public DbSet<WorkflowStepExecution> WorkflowStepExecutions => Set<WorkflowStepExecution>();
    public DbSet<ApprovalDelegation> ApprovalDelegations => Set<ApprovalDelegation>();
    public DbSet<LeaveEntitlement> LeaveEntitlements => Set<LeaveEntitlement>();
    public DbSet<LeaveBalance> LeaveBalances => Set<LeaveBalance>();
    public DbSet<LeaveTransaction> LeaveTransactions => Set<LeaveTransaction>();
    public DbSet<LeaveAccrualPolicy> LeaveAccrualPolicies => Set<LeaveAccrualPolicy>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<EmployeeUserLink>()
            .HasKey(e => new { e.EmployeeId, e.UserId });

        modelBuilder.Entity<UserRole>()
            .HasKey(e => new { e.UserId, e.RoleId });

        modelBuilder.Entity<RolePermission>()
            .HasKey(e => new { e.RoleId, e.PermissionId });
            
        // UserBranchScope usually has composite key too
        modelBuilder.Entity<UserBranchScope>()
             .HasKey(e => new { e.UserId, e.BranchId });
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return base.SaveChangesAsync(cancellationToken);
    }
}
