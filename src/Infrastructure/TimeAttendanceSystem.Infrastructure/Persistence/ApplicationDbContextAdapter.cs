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
    public DbSet<Shift> Shifts => _context.Shifts;
    public DbSet<ShiftPeriod> ShiftPeriods => _context.ShiftPeriods;
    public DbSet<ShiftAssignment> ShiftAssignments => _context.ShiftAssignments;
    public DbSet<AttendanceRecord> AttendanceRecords => _context.AttendanceRecords;
    public DbSet<AttendanceTransaction> AttendanceTransactions => _context.AttendanceTransactions;
    public DbSet<WorkingDay> WorkingDays => _context.WorkingDays;
    public DbSet<PublicHoliday> PublicHolidays => _context.PublicHolidays;
    public DbSet<VacationType> VacationTypes => _context.VacationTypes;

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }
}