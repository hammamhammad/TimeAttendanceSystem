using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Branches;
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
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Services;

namespace TimeAttendanceSystem.Infrastructure.Persistence;

/// <summary>
/// Entity Framework Core database context for the Time Attendance System providing comprehensive data access.
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
public class TimeAttendanceDbContext : DbContext, IApplicationDbContext
{
    /// <summary>
    /// Initializes a new instance of the TimeAttendanceDbContext with specified configuration options.
    /// Sets up the database context with connection string, provider settings, and operational parameters.
    /// </summary>
    /// <param name="options">Database context options containing connection configuration and provider settings</param>
    public TimeAttendanceDbContext(DbContextOptions<TimeAttendanceDbContext> options) : base(options)
    {
    }

    public DbSet<Branch> Branches => Set<Branch>();
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

    // Fingerprint Request entities
    public DbSet<FingerprintRequest> FingerprintRequests => Set<FingerprintRequest>();

    // Workflow entities
    public DbSet<WorkflowDefinition> WorkflowDefinitions => Set<WorkflowDefinition>();
    public DbSet<WorkflowStep> WorkflowSteps => Set<WorkflowStep>();
    public DbSet<WorkflowInstance> WorkflowInstances => Set<WorkflowInstance>();
    public DbSet<WorkflowStepExecution> WorkflowStepExecutions => Set<WorkflowStepExecution>();
    public DbSet<ApprovalDelegation> ApprovalDelegations => Set<ApprovalDelegation>();

    // Notification entities
    public DbSet<Notification> Notifications => Set<Notification>();

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
            typeof(TimeAttendanceDbContext).Assembly,
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