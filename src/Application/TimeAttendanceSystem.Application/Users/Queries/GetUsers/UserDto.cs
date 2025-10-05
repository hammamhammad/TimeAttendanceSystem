namespace TimeAttendanceSystem.Application.Users.Queries.GetUsers;

/// <summary>
/// Data Transfer Object representing user information for list views and administrative operations.
/// Contains essential user details, security status, and organizational relationships
/// with sensitive information filtered out for security and privacy compliance.
/// </summary>
/// <param name="Id">Unique identifier for the user account</param>
/// <param name="Username">Unique username for login and identification</param>
/// <param name="Email">User's email address for communication and notifications</param>
/// <param name="Phone">User's phone number for contact and SMS notifications (optional)</param>
/// <param name="TwoFactorEnabled">Indicates if two-factor authentication is enabled for enhanced security</param>
/// <param name="LockoutEndUtc">UTC timestamp when account lockout expires (null if not locked)</param>
/// <param name="MustChangePassword">Indicates if user must change password on next login</param>
/// <param name="PreferredLanguage">User's preferred language for localization (ISO 639-1 code)</param>
/// <param name="IsActive">Indicates if the user account is active and can authenticate</param>
/// <param name="CreatedAtUtc">UTC timestamp when the user account was created</param>
/// <param name="Roles">List of role names assigned to the user for authorization</param>
/// <param name="Branches">List of branch names the user has access to (multi-tenant scope)</param>
/// <remarks>
/// DTO Design Principles:
/// - Contains only data necessary for user list displays and basic operations
/// - Excludes sensitive information (password hashes, security tokens, etc.)
/// - Includes security status information for administrative monitoring
/// - Provides role and branch information for authorization context
/// - Optimized for serialization and network transmission
/// - Immutable record type prevents accidental data modification
/// 
/// Security Considerations:
/// - No password-related sensitive data included
/// - Security status information helps administrators identify risks
/// - Lockout information enables proactive security monitoring
/// - Two-factor status visible for security compliance reporting
/// - Personal information limited to what's necessary for operations
/// 
/// Administrative Features:
/// - Account status (Active/Inactive) for user management
/// - Security flags (TwoFactorEnabled, MustChangePassword) for monitoring
/// - Lockout status with expiration time for incident response
/// - Creation timestamp for audit trails and user lifecycle tracking
/// - Role assignments for permission verification and troubleshooting
/// - Branch associations for multi-tenant access validation
/// 
/// Localization Support:
/// - PreferredLanguage enables personalized user interface
/// - Role and branch names can be localized in presentation layer
/// - Timezone considerations handled through UTC timestamps
/// - Cultural formatting applied in UI based on language preference
/// 
/// Performance Optimization:
/// - Lightweight object for efficient serialization
/// - Role and branch names pre-loaded to avoid N+1 query problems
/// - Essential fields only to minimize network payload
/// - Compatible with JSON serialization for API responses
/// - Suitable for caching in distributed scenarios
/// 
/// Usage Contexts:
/// - User management dashboards and administrative interfaces
/// - User selection dropdowns and lookup operations
/// - Security monitoring and compliance reporting
/// - API responses for user listing endpoints
/// - Export operations for HR and audit purposes
/// 
/// Data Privacy:
/// - Contains only business-necessary personal information
/// - Excludes highly sensitive data (passwords, tokens, etc.)
/// - Phone numbers and emails handled according to privacy regulations
/// - Audit trail information preserved for compliance requirements
/// - Role and access information necessary for system operation
/// </remarks>
public record UserDto(
    long Id,
    string Username,
    string Email,
    string? Phone,
    string? FirstName,
    string? LastName,
    bool TwoFactorEnabled,
    DateTime? LockoutEndUtc,
    bool MustChangePassword,
    string PreferredLanguage,
    bool IsActive,
    DateTime CreatedAtUtc,
    DateTime? LastLoginAt,
    List<string> Roles,
    List<string> Branches
);