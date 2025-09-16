namespace TimeAttendanceSystem.Domain.Common;

public enum EmploymentStatus
{
    FullTime = 1,
    PartTime = 2,
    Contract = 3,
    Intern = 4,
    Consultant = 5,
    Terminated = 6
}

public enum Gender
{
    Male = 1,
    Female = 2
}

public enum WorkLocationType
{
    OnSite = 1,
    Remote = 2,
    Hybrid = 3
}

public enum ShiftStatus
{
    Active = 1,
    Inactive = 2,
    Draft = 3,
    Archived = 4
}

public enum AuditAction
{
    // Authentication & Authorization
    Login = 1,
    Logout = 2,
    LogoutAllDevices = 3,
    TokenRefresh = 4,
    PasswordChange = 5,
    PasswordReset = 6,
    PasswordResetRequest = 7,
    AccountLockout = 8,
    AccountUnlock = 9,
    TwoFactorEnabled = 10,
    TwoFactorDisabled = 11,
    TwoFactorVerified = 12,
    SessionCreated = 13,
    SessionTerminated = 14,
    SessionExpired = 15,

    // User Management
    UserCreated = 20,
    UserUpdated = 21,
    UserDeleted = 22,
    UserActivated = 23,
    UserDeactivated = 24,
    UserRoleAssigned = 25,
    UserRoleRevoked = 26,
    UserBranchScopeAssigned = 27,
    UserBranchScopeRevoked = 28,

    // Employee Management
    EmployeeCreated = 40,
    EmployeeUpdated = 41,
    EmployeeDeleted = 42,
    EmployeeActivated = 43,
    EmployeeDeactivated = 44,

    // Shift Management
    ShiftCreated = 60,
    ShiftUpdated = 61,
    ShiftDeleted = 62,

    // System Actions
    SystemStartup = 100,
    SystemShutdown = 101,
    DatabaseMigration = 102,

    // Shift Assignment Management
    ShiftAssignmentCreated = 80,
    ShiftAssignmentUpdated = 81,
    ShiftAssignmentDeleted = 82,
    ShiftAssignmentActivated = 83,
    ShiftAssignmentDeactivated = 84,

    // Generic CRUD Operations
    Created = 200,
    Updated = 201,
    Deleted = 202,
    Viewed = 203
}

/// <summary>
/// Defines the type of shift assignment indicating the organizational level.
/// Determines whether the shift is assigned to an individual employee,
/// department, or entire branch.
/// </summary>
public enum ShiftAssignmentType
{
    /// <summary>
    /// Shift assigned to an individual employee.
    /// Highest priority assignment that overrides department and branch assignments.
    /// </summary>
    Employee = 1,

    /// <summary>
    /// Shift assigned to all employees within a department.
    /// Medium priority that overrides branch assignments but is overridden by employee assignments.
    /// </summary>
    Department = 2,

    /// <summary>
    /// Shift assigned to all employees within a branch.
    /// Lowest priority assignment that applies organization-wide but can be overridden.
    /// </summary>
    Branch = 3
}

/// <summary>
/// Defines the status of a shift assignment controlling its lifecycle and activation.
/// Manages assignment states from creation through activation to expiration.
/// </summary>
public enum ShiftAssignmentStatus
{
    /// <summary>
    /// Assignment is pending approval or future activation.
    /// Not currently effective but scheduled for future activation.
    /// </summary>
    Pending = 1,

    /// <summary>
    /// Assignment is currently active and in effect.
    /// Employees are working under this shift schedule.
    /// </summary>
    Active = 2,

    /// <summary>
    /// Assignment has been temporarily suspended.
    /// Can be reactivated without creating a new assignment.
    /// </summary>
    Inactive = 3,

    /// <summary>
    /// Assignment has expired based on end date.
    /// Historical record maintained for audit and reporting purposes.
    /// </summary>
    Expired = 4,

    /// <summary>
    /// Assignment has been cancelled before becoming active.
    /// Cancelled assignments are retained for audit trails.
    /// </summary>
    Cancelled = 5
}