using Microsoft.EntityFrameworkCore;
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
using TimeAttendanceSystem.Domain.FingerprintRequests;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Database context abstraction for the Time Attendance System Application layer.
/// Provides access to all domain entities through Entity Framework DbSets
/// while maintaining clean architecture separation between Application and Infrastructure layers.
/// </summary>
/// <remarks>
/// Architecture Benefits:
/// - Abstracts Entity Framework implementation from Application layer
/// - Enables dependency inversion principle for testability
/// - Allows Infrastructure layer to implement database-specific optimizations
/// - Supports multiple database providers through abstraction
/// - Facilitates unit testing with in-memory or mock implementations
/// 
/// Entity Organization:
/// - Organizational entities: Branches, Departments for multi-tenant structure
/// - User entities: Users, Roles, Permissions for identity and authorization
/// - Employee entities: Employees, EmployeeUserLinks for HR management
/// - Security entities: RefreshTokens, LoginAttempts, PasswordHistory
/// - Session entities: UserSessions, TwoFactorBackupCodes for session management
/// - Audit entities: AuditLogs, BlacklistedTokens for compliance and security
/// 
/// Data Access Patterns:
/// - Repository pattern implementation through DbSets
/// - Unit of Work pattern through SaveChangesAsync method
/// - Change tracking for audit trails and concurrency control
/// - Lazy loading and eager loading support for performance optimization
/// - Transaction management for data consistency
/// 
/// Multi-tenancy Support:
/// - Branch-scoped entities for tenant data isolation
/// - Cross-tenant relationships properly defined
/// - Security boundaries enforced through entity relationships
/// - Tenant-specific queries supported through filtering
/// 
/// Security Features:
/// - Comprehensive audit logging through AuditLogs entity
/// - Token management for authentication and authorization
/// - Password security through PasswordHistory tracking
/// - Session management for concurrent user monitoring
/// - Blacklisted tokens for security incident response
/// </remarks>
public interface IApplicationDbContext
{
    /// <summary>
    /// Gets the database set for Branch entities representing organizational locations.
    /// Supports multi-tenant architecture and geographical organization structure.
    /// </summary>
    /// <value>DbSet for querying and managing Branch entities</value>
    /// <remarks>
    /// Branch Entity Features:
    /// - Multi-tenant data isolation boundary
    /// - Hierarchical organization structure support
    /// - Geographical location and timezone information
    /// - Employee assignment and access control scope
    /// - Department and resource organization container
    /// </remarks>
    DbSet<Branch> Branches { get; }

    /// <summary>
    /// Gets the database set for Department entities representing organizational units within branches.
    /// Enables departmental organization and reporting structures.
    /// </summary>
    /// <value>DbSet for querying and managing Department entities</value>
    /// <remarks>
    /// Department Entity Features:
    /// - Organizational structure within branches
    /// - Employee grouping and management
    /// - Hierarchical department relationships
    /// - Cost center and reporting organization
    /// - Manager assignment and delegation
    /// </remarks>
    DbSet<Department> Departments { get; }

    /// <summary>
    /// Gets the database set for User entities representing system authentication accounts.
    /// Central entity for identity, authentication, and authorization management.
    /// </summary>
    /// <value>DbSet for querying and managing User entities</value>
    /// <remarks>
    /// User Entity Features:
    /// - Authentication credentials and security settings
    /// - Role and permission assignments
    /// - Multi-tenant branch scope assignments
    /// - Two-factor authentication configuration
    /// - Account lockout and security policies
    /// </remarks>
    DbSet<User> Users { get; }

    /// <summary>
    /// Gets the database set for Role entities defining authorization roles within the system.
    /// Enables role-based access control and permission management.
    /// </summary>
    /// <value>DbSet for querying and managing Role entities</value>
    /// <remarks>
    /// Role Entity Features:
    /// - Role-based access control implementation
    /// - Permission aggregation and assignment
    /// - Hierarchical role relationships
    /// - System-wide and branch-specific roles
    /// - User group management and organization
    /// </remarks>
    DbSet<Role> Roles { get; }

    /// <summary>
    /// Gets the database set for Permission entities defining specific system permissions.
    /// Enables fine-grained authorization control and security management.
    /// </summary>
    /// <value>DbSet for querying and managing Permission entities</value>
    /// <remarks>
    /// Permission Entity Features:
    /// - Fine-grained authorization control
    /// - Modular permission system design
    /// - Resource and action-based permissions
    /// - Permission inheritance and delegation
    /// - Security policy enforcement
    /// </remarks>
    DbSet<Permission> Permissions { get; }

    /// <summary>
    /// Gets the database set for RolePermission entities linking roles to specific permissions.
    /// Junction table for many-to-many relationship between roles and permissions.
    /// </summary>
    /// <value>DbSet for querying and managing RolePermission associations</value>
    /// <remarks>
    /// RolePermission Features:
    /// - Many-to-many relationship management
    /// - Dynamic permission assignment to roles
    /// - Permission inheritance through role hierarchy
    /// - Efficient permission checking and validation
    /// - Role-based security policy implementation
    /// </remarks>
    DbSet<RolePermission> RolePermissions { get; }

    /// <summary>
    /// Gets the database set for UserRole entities linking users to assigned roles.
    /// Junction table for many-to-many relationship between users and roles.
    /// </summary>
    /// <value>DbSet for querying and managing UserRole associations</value>
    /// <remarks>
    /// UserRole Features:
    /// - User role assignment management
    /// - Multiple role support per user
    /// - Temporal role assignments with date ranges
    /// - Role delegation and inheritance
    /// - User authorization context building
    /// </remarks>
    DbSet<UserRole> UserRoles { get; }

    /// <summary>
    /// Gets the database set for UserBranchScope entities defining user access to specific branches.
    /// Implements multi-tenant security through branch-scoped user access control.
    /// </summary>
    /// <value>DbSet for querying and managing UserBranchScope associations</value>
    /// <remarks>
    /// UserBranchScope Features:
    /// - Multi-tenant data access control
    /// - Branch-scoped user permissions
    /// - Cross-branch access management
    /// - Tenant data isolation enforcement
    /// - Geographic access control support
    /// </remarks>
    DbSet<UserBranchScope> UserBranchScopes { get; }

    /// <summary>
    /// Gets the database set for Employee entities representing staff members within the organization.
    /// Central entity for HR management and time attendance tracking.
    /// </summary>
    /// <value>DbSet for querying and managing Employee entities</value>
    /// <remarks>
    /// Employee Entity Features:
    /// - HR information and personal data management
    /// - Organizational hierarchy and reporting relationships
    /// - Time attendance and scheduling integration
    /// - Employment status and lifecycle tracking
    /// - Performance and evaluation data support
    /// </remarks>
    DbSet<Employee> Employees { get; }

    /// <summary>
    /// Gets the database set for EmployeeUserLink entities connecting employees to system user accounts.
    /// Enables separation of HR data from authentication accounts.
    /// </summary>
    /// <value>DbSet for querying and managing EmployeeUserLink associations</value>
    /// <remarks>
    /// EmployeeUserLink Features:
    /// - Separation of HR data from authentication
    /// - Optional user account assignment for employees
    /// - Multiple employee profiles per user support
    /// - Account delegation and proxy management
    /// - Self-service portal access control
    /// </remarks>
    DbSet<EmployeeUserLink> EmployeeUserLinks { get; }

    /// <summary>
    /// Gets the database set for RefreshToken entities managing JWT refresh tokens.
    /// Enables secure token refresh and session management functionality.
    /// </summary>
    /// <value>DbSet for querying and managing RefreshToken entities</value>
    /// <remarks>
    /// RefreshToken Features:
    /// - JWT refresh token storage and validation
    /// - Token rotation security implementation
    /// - Device-specific token management
    /// - Token expiration and cleanup automation
    /// - Session security and revocation support
    /// </remarks>
    DbSet<RefreshToken> RefreshTokens { get; }

    /// <summary>
    /// Gets the database set for LoginAttempt entities tracking authentication attempts.
    /// Provides security monitoring and brute force attack prevention.
    /// </summary>
    /// <value>DbSet for querying and managing LoginAttempt entities</value>
    /// <remarks>
    /// LoginAttempt Features:
    /// - Authentication event logging and monitoring
    /// - Brute force attack detection and prevention
    /// - Security incident investigation support
    /// - User behavior analysis and anomaly detection
    /// - Compliance and audit trail requirements
    /// </remarks>
    DbSet<LoginAttempt> LoginAttempts { get; }

    /// <summary>
    /// Gets the database set for PasswordHistory entities tracking previous user passwords.
    /// Implements password reuse prevention and security policy enforcement.
    /// </summary>
    /// <value>DbSet for querying and managing PasswordHistory entities</value>
    /// <remarks>
    /// PasswordHistory Features:
    /// - Password reuse prevention enforcement
    /// - Password aging and rotation policies
    /// - Security compliance requirements
    /// - Password strength evolution tracking
    /// - Account security audit trails
    /// </remarks>
    DbSet<PasswordHistory> PasswordHistory { get; }

    /// <summary>
    /// Gets the database set for BlacklistedToken entities managing revoked authentication tokens.
    /// Enables immediate token revocation and security incident response.
    /// </summary>
    /// <value>DbSet for querying and managing BlacklistedToken entities</value>
    /// <remarks>
    /// BlacklistedToken Features:
    /// - Immediate token revocation capability
    /// - Security incident response support
    /// - Compromised account protection
    /// - Token-based session management
    /// - Audit trail for token revocation events
    /// </remarks>
    DbSet<BlacklistedToken> BlacklistedTokens { get; }

    /// <summary>
    /// Gets the database set for TwoFactorBackupCode entities managing 2FA recovery codes.
    /// Provides backup authentication methods for two-factor authentication.
    /// </summary>
    /// <value>DbSet for querying and managing TwoFactorBackupCode entities</value>
    /// <remarks>
    /// TwoFactorBackupCode Features:
    /// - Two-factor authentication backup and recovery
    /// - Single-use recovery code management
    /// - Account lockout prevention mechanisms
    /// - Emergency access procedures
    /// - Security code generation and validation
    /// </remarks>
    DbSet<TwoFactorBackupCode> TwoFactorBackupCodes { get; }

    /// <summary>
    /// Gets the database set for UserSession entities tracking active user sessions.
    /// Enables concurrent session management and security monitoring.
    /// </summary>
    /// <value>DbSet for querying and managing UserSession entities</value>
    /// <remarks>
    /// UserSession Features:
    /// - Concurrent session tracking and management
    /// - Device fingerprinting and recognition
    /// - Session security and anomaly detection
    /// - Remote session termination capabilities
    /// - Multi-device user experience support
    /// </remarks>
    DbSet<UserSession> UserSessions { get; }

    /// <summary>
    /// Gets the database set for AuditLog entities providing comprehensive system audit trails.
    /// Ensures compliance, security monitoring, and change tracking across the system.
    /// </summary>
    /// <value>DbSet for querying and managing AuditLog entities</value>
    /// <remarks>
    /// AuditLog Features:
    /// - Comprehensive system change tracking
    /// - Regulatory compliance and audit requirements
    /// - Security event monitoring and analysis
    /// - Data modification history and forensics
    /// - User activity tracking and accountability
    /// </remarks>
    DbSet<AuditLog> AuditLogs { get; }

    /// <summary>
    /// Gets the database set for AuditChange entities providing field-level change tracking.
    /// Captures old and new values for each modified field within audit logs.
    /// </summary>
    /// <value>DbSet for querying and managing AuditChange entities</value>
    /// <remarks>
    /// AuditChange Features:
    /// - Field-level change detection and tracking
    /// - Old value and new value capture for compliance
    /// - Integration with parent AuditLog entries
    /// - Support for forensic analysis and data recovery
    /// - Detailed change history for regulatory requirements
    /// </remarks>
    DbSet<AuditChange> AuditChanges { get; }

    /// <summary>
    /// Gets the database set for Shift entities representing work shift definitions.
    /// Enables comprehensive shift management with flexible, multi-period, and hours-only support.
    /// </summary>
    /// <value>DbSet for querying and managing Shift entities</value>
    /// <remarks>
    /// Shift Entity Features:
    /// - Time-based and hours-only shift types
    /// - Flexible working hours with grace periods
    /// - Night shift support spanning midnight
    /// - Multi-period shifts with break scheduling
    /// - Branch-scoped shift definitions
    /// </remarks>
    DbSet<Shift> Shifts { get; }

    /// <summary>
    /// Gets the database set for ShiftPeriod entities representing working time blocks within shifts.
    /// Enables detailed time period management for complex shift patterns.
    /// </summary>
    /// <value>DbSet for querying and managing ShiftPeriod entities</value>
    /// <remarks>
    /// ShiftPeriod Entity Features:
    /// - Detailed working time block definitions
    /// - Start and end time management with hour calculations
    /// - Night period detection for midnight-spanning shifts
    /// - Multi-period shift support with ordering
    /// - Automatic total hours calculation
    /// </remarks>
    DbSet<ShiftPeriod> ShiftPeriods { get; }


    /// <summary>
    /// Gets the database set for ShiftAssignment entities representing shift assignments to employees, departments, or branches.
    /// Enables comprehensive shift assignment management with effective date tracking and hierarchical assignment support.
    /// </summary>
    /// <value>DbSet for querying and managing ShiftAssignment entities</value>
    /// <remarks>
    /// ShiftAssignment Entity Features:
    /// - Multi-level assignment support: Employee, Department, and Branch levels
    /// - Effective date management for future and historical assignments
    /// - Assignment priority and override capabilities for conflict resolution
    /// - Comprehensive audit trail and status tracking
    /// - Automatic inheritance from department/branch to employee level
    /// - Flexible assignment patterns supporting various business needs
    /// </remarks>
    DbSet<ShiftAssignment> ShiftAssignments { get; }

    /// <summary>
    /// Gets the database set for AttendanceRecord entities representing daily attendance records for employees.
    /// Aggregates all attendance transactions for a specific date and calculates attendance status.
    /// </summary>
    /// <value>DbSet for querying and managing AttendanceRecord entities</value>
    /// <remarks>
    /// AttendanceRecord Entity Features:
    /// - Daily attendance aggregation and status calculation
    /// - Integration with assigned shifts for rule-based calculations
    /// - Comprehensive working hours tracking and overtime calculation
    /// - Break time management and tracking
    /// - Late arrival and early departure detection
    /// </remarks>
    DbSet<AttendanceRecord> AttendanceRecords { get; }

    /// <summary>
    /// Gets the database set for AttendanceTransaction entities representing individual attendance events.
    /// Records specific time-stamped events in an employee's daily attendance tracking.
    /// </summary>
    /// <value>DbSet for querying and managing AttendanceTransaction entities</value>
    /// <remarks>
    /// AttendanceTransaction Entity Features:
    /// - Precise timestamp recording for all attendance events
    /// - Support for manual and automatic transaction entry
    /// - Location and device tracking for compliance and security
    /// - Comprehensive audit trail with user attribution
    /// - Integration with attendance calculation engine
    /// </remarks>
    DbSet<AttendanceTransaction> AttendanceTransactions { get; }

    /// <summary>
    /// Gets the database set for WorkingDay entities representing calculated working day analysis.
    /// Provides comprehensive analysis of an employee's working time including core hours and break periods.
    /// </summary>
    /// <value>DbSet for querying and managing WorkingDay entities</value>
    /// <remarks>
    /// WorkingDay Entity Features:
    /// - Detailed time period breakdown and analysis
    /// - Core hours compliance tracking for flexible shifts
    /// - Break time analysis and policy compliance
    /// - Overtime calculations with different rates
    /// - Working time distribution across periods
    /// </remarks>
    DbSet<WorkingDay> WorkingDays { get; }

    /// <summary>
    /// Gets the database set for PublicHoliday entities representing public holidays that affect overtime calculations.
    /// Supports both one-time and recurring holidays with flexible configuration patterns.
    /// </summary>
    /// <value>DbSet for querying and managing PublicHoliday entities</value>
    /// <remarks>
    /// PublicHoliday Entity Features:
    /// - One-time and recurring holiday patterns (annual, monthly, floating)
    /// - National and regional holiday support with branch-specific configurations
    /// - Active/inactive status for scheduling and overtime calculations
    /// - Complex recurrence patterns including floating holidays
    /// - Integration with overtime rate calculations and attendance processing
    /// </remarks>
    DbSet<PublicHoliday> PublicHolidays { get; }

    /// <summary>
    /// Gets the database set for VacationType entities representing vacation type configurations.
    /// Enables comprehensive vacation policy management with flexible accrual and carryover rules.
    /// </summary>
    /// <value>DbSet for querying and managing VacationType entities</value>
    /// <remarks>
    /// VacationType Entity Features:
    /// - Complete vacation policy configuration with approval workflows
    /// - Flexible accrual systems supporting annual, monthly, and pro-rata calculations
    /// - Carryover management with expiration and maximum limits
    /// - Multi-tenant isolation through branch-based organization
    /// - Bilingual support for English and Arabic organizational environments
    /// </remarks>
    DbSet<VacationType> VacationTypes { get; }

    /// <summary>
    /// Gets the database set for EmployeeVacation entities representing employee vacation periods.
    /// Enables tracking of approved vacation periods and integration with attendance calculations.
    /// </summary>
    /// <value>DbSet for querying and managing EmployeeVacation entities</value>
    /// <remarks>
    /// EmployeeVacation Entity Features:
    /// - Simple vacation period tracking with start/end dates
    /// - Integration with VacationTypes for categorization
    /// - Approved status control for attendance integration
    /// - Historical vacation records support (past dates allowed)
    /// - Conflict detection to prevent overlapping vacations
    /// - Business days calculation excluding weekends
    /// </remarks>
    DbSet<EmployeeVacation> EmployeeVacations { get; }

    /// <summary>
    /// Gets the database set for ExcusePolicy entities representing organizational excuse management policies.
    /// Enables comprehensive policy configuration for personal excuses while exempting official duties.
    /// </summary>
    /// <value>DbSet for querying and managing ExcusePolicy entities</value>
    /// <remarks>
    /// ExcusePolicy Entity Features:
    /// - Branch-scoped or organization-wide policy configuration
    /// - Comprehensive limits for personal excuse usage
    /// - Flexible configuration for partial hour excuses
    /// - Active/inactive status for policy lifecycle management
    /// - Role-based security through permission system
    /// </remarks>
    DbSet<ExcusePolicy> ExcusePolicies { get; }

    /// <summary>
    /// Gets the database set for EmployeeExcuse entities representing employee excuse requests.
    /// Supports both personal excuses (subject to policy limits) and official duties (exempt from limits).
    /// </summary>
    /// <value>DbSet for querying and managing EmployeeExcuse entities</value>
    /// <remarks>
    /// EmployeeExcuse Entity Features:
    /// - Comprehensive excuse request management with approval workflow
    /// - Integration with attendance calculations and working hour adjustments
    /// - Support for both personal excuses and official duties
    /// - File attachment support for documentation requirements
    /// - Audit trail for approval decisions and status changes
    /// - Automatic duration calculation from start/end times
    /// </remarks>
    DbSet<EmployeeExcuse> EmployeeExcuses { get; }

    /// <summary>
    /// Gets the database set for RemoteWorkPolicy entities representing remote work policy configurations.
    /// Manages remote work rules, quotas, and restrictions with branch-level organization.
    /// </summary>
    /// <value>DbSet for querying and managing RemoteWorkPolicy entities</value>
    /// <remarks>
    /// RemoteWorkPolicy Entity Features:
    /// - Branch-scoped policy configuration for multi-tenant isolation
    /// - Flexible quota system (weekly/monthly/yearly limits)
    /// - Consecutive days restrictions and blackout periods
    /// - Optional manager approval workflow
    /// - Attendance integration settings (overtime and shift enforcement)
    /// </remarks>
    DbSet<RemoteWorkPolicy> RemoteWorkPolicies { get; }

    /// <summary>
    /// Gets the database set for RemoteWorkRequest entities representing remote work requests for employees.
    /// Similar to vacation requests - individual, date-based requests managed by HR with approval workflow.
    /// </summary>
    /// <value>DbSet for querying and managing RemoteWorkRequest entities</value>
    /// <remarks>
    /// RemoteWorkRequest Entity Features:
    /// - Individual employee requests (not bulk)
    /// - Date range based (StartDate to EndDate)
    /// - Status workflow (Pending, Approved, Rejected, Cancelled)
    /// - Policy-based quota validation and tracking
    /// - Affects attendance calculations when approved
    /// - Integration with remote work policies and attendance records
    /// </remarks>
    DbSet<RemoteWorkRequest> RemoteWorkRequests { get; }

    /// <summary>
    /// Gets the database set for FingerprintRequest entities representing fingerprint enrollment or update requests.
    /// Enables employees to request fingerprint re-enrollment or report fingerprint reader issues.
    /// </summary>
    /// <value>DbSet for querying and managing FingerprintRequest entities</value>
    /// <remarks>
    /// FingerprintRequest Entity Features:
    /// - Employee self-service fingerprint management
    /// - Multiple request types (NewEnrollment, Update, Issue, AdditionalFingers, LocationChange)
    /// - Status workflow (Pending, Scheduled, Completed, Cancelled, Rejected)
    /// - Scheduling system with preferred and scheduled date/time
    /// - Technician assignment and notes for completion tracking
    /// - One active request limit per employee for process control
    /// </remarks>
    DbSet<FingerprintRequest> FingerprintRequests { get; }

    /// <summary>
    /// Asynchronously saves all pending changes to the database.
    /// Implements Unit of Work pattern for transaction management and data consistency.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token for async operation control</param>
    /// <returns>Task containing the number of entities written to the database</returns>
    /// <remarks>
    /// SaveChanges Features:
    /// - Transactional data persistence with rollback capability
    /// - Change tracking and automatic audit trail generation
    /// - Optimistic concurrency control and conflict resolution
    /// - Entity validation and business rule enforcement
    /// - Performance optimization through batched operations
    /// 
    /// Implementation Notes:
    /// - Called by command handlers after business logic execution
    /// - Triggers entity validation and domain event publishing
    /// - Manages database transactions and connection lifecycle
    /// - Handles concurrency conflicts and retry policies
    /// - Supports distributed transactions for complex operations
    /// </remarks>
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}