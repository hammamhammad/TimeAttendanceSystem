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
    
    // System Actions
    SystemStartup = 100,
    SystemShutdown = 101,
    DatabaseMigration = 102,
    
    // Generic CRUD Operations
    Created = 200,
    Updated = 201,
    Deleted = 202,
    Viewed = 203
}