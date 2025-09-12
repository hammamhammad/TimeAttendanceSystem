namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Abstraction for accessing current user context within the Application layer.
/// Provides secure access to authenticated user information, roles, permissions,
/// and branch scope for authorization and business logic operations.
/// </summary>
/// <remarks>
/// User Context Features:
/// - Secure access to current user identity and authentication status
/// - Role-based authorization support with multiple role assignment
/// - Permission-based fine-grained access control
/// - Multi-tenant branch scope for data segregation
/// - Localization support through preferred language
/// - Integration with JWT token claims and security context
/// 
/// Security Design:
/// - Read-only access prevents unauthorized modification
/// - Null-safe design handles unauthenticated scenarios
/// - Branch scope enforcement for multi-tenant security
/// - Permission validation for fine-grained authorization
/// - Role hierarchies support through multiple role assignment
/// 
/// Usage Patterns:
/// - Command/Query handlers use this for authorization checks
/// - Business logic validates user permissions before operations
/// - Audit logging captures user context for compliance
/// - Multi-tenant filtering based on branch scope
/// - Localization services use preferred language setting
/// 
/// Implementation Notes:
/// - Typically implemented by Infrastructure layer
/// - Populated from JWT token claims or session context
/// - Thread-safe and request-scoped in web applications
/// - Supports both authenticated and anonymous access patterns
/// - Integrates with ASP.NET Core Identity and authorization
/// </remarks>
public interface ICurrentUser
{
    /// <summary>
    /// Gets the unique identifier of the currently authenticated user.
    /// Returns null for unauthenticated requests or anonymous access.
    /// </summary>
    /// <value>
    /// User ID as long integer, or null if user is not authenticated.
    /// Used for entity ownership validation and audit logging.
    /// </value>
    long? UserId { get; }

    /// <summary>
    /// Gets the username of the currently authenticated user.
    /// Returns null for unauthenticated requests or anonymous access.
    /// </summary>
    /// <value>
    /// Username string, or null if user is not authenticated.
    /// Used for display purposes and audit trail logging.
    /// </value>
    string? Username { get; }

    /// <summary>
    /// Gets a value indicating whether the current request is from an authenticated user.
    /// Provides quick authentication status check without null checking UserId.
    /// </summary>
    /// <value>
    /// True if user is authenticated with valid credentials, false otherwise.
    /// Used for early authorization checks and conditional business logic.
    /// </value>
    bool IsAuthenticated { get; }

    /// <summary>
    /// Gets a value indicating whether the current user has system administrator privileges.
    /// System admins have elevated permissions across all tenants and branches.
    /// </summary>
    /// <value>
    /// True if user has system administrator role, false otherwise.
    /// Used for system-wide administrative operations and unrestricted access.
    /// </value>
    bool IsSystemAdmin { get; }

    /// <summary>
    /// Gets the collection of roles assigned to the current user.
    /// Roles define broad categories of permissions and access levels.
    /// </summary>
    /// <value>
    /// Read-only list of role names assigned to the user.
    /// Empty collection for users with no assigned roles.
    /// Used for role-based authorization and UI customization.
    /// </value>
    /// <remarks>
    /// Role Examples:
    /// - "Admin": Administrative access within assigned branches
    /// - "Manager": Management operations for specific departments
    /// - "HR": Human resources operations and employee management
    /// - "Employee": Basic time attendance and personal data access
    /// - "SystemAdmin": System-wide administrative privileges
    /// </remarks>
    IReadOnlyList<string> Roles { get; }

    /// <summary>
    /// Gets the collection of specific permissions granted to the current user.
    /// Permissions provide fine-grained authorization control for specific operations.
    /// </summary>
    /// <value>
    /// Read-only list of permission keys granted to the user.
    /// Empty collection for users with no assigned permissions.
    /// Used for detailed authorization checks before sensitive operations.
    /// </value>
    /// <remarks>
    /// Permission Examples:
    /// - "users.create": Create new user accounts
    /// - "employees.read": View employee information
    /// - "reports.export": Export system reports
    /// - "branches.manage": Manage branch settings
    /// - "roles.assign": Assign roles to other users
    /// 
    /// Permission Aggregation:
    /// - Combines permissions from all assigned roles
    /// - Includes directly assigned user permissions
    /// - Automatically updated when roles change
    /// </remarks>
    IReadOnlyList<string> Permissions { get; }

    /// <summary>
    /// Gets the collection of branch IDs that the current user has access to.
    /// Implements multi-tenant data segregation and branch-scoped authorization.
    /// </summary>
    /// <value>
    /// Read-only list of branch IDs where user has access.
    /// Empty collection indicates access to all branches (system admin).
    /// Used for data filtering and branch-scoped operations.
    /// </value>
    /// <remarks>
    /// Multi-tenancy Implementation:
    /// - Users are scoped to specific branches for data isolation
    /// - Empty list means unrestricted access (system administrators)
    /// - Filters queries to only return data from accessible branches
    /// - Prevents cross-branch data access and unauthorized operations
    /// 
    /// Branch Scope Examples:
    /// - Single branch: [1] - User only sees data from branch 1
    /// - Multiple branches: [1, 3, 5] - User sees data from branches 1, 3, and 5
    /// - All branches: [] - System admin with unrestricted access
    /// </remarks>
    IReadOnlyList<long> BranchIds { get; }

    /// <summary>
    /// Gets the preferred language/locale of the current user for localization.
    /// Used for displaying localized content, messages, and date/time formats.
    /// </summary>
    /// <value>
    /// ISO 639-1 language code (e.g., "en", "ar", "es").
    /// Defaults to system default language if not specified by user.
    /// Used for internationalization and localized user experience.
    /// </value>
    /// <remarks>
    /// Localization Features:
    /// - UI text and labels displayed in user's preferred language
    /// - Error messages and notifications localized
    /// - Date, time, and number formats adjusted for locale
    /// - Email notifications sent in preferred language
    /// - Report headers and content localized
    /// 
    /// Supported Languages:
    /// - "en": English (default)
    /// - "ar": Arabic with RTL support
    /// - Additional languages configurable in system settings
    /// </remarks>
    string PreferredLanguage { get; }
}