namespace TimeAttendanceSystem.Application.Authorization.Commands.Login;

/// <summary>
/// Response model for successful authentication operations containing JWT tokens and user information.
/// Provides complete authentication context for client applications with security tokens,
/// user details, and session management information.
/// </summary>
/// <param name="AccessToken">JWT access token for API authentication and authorization</param>
/// <param name="RefreshToken">Long-lived refresh token for token renewal operations</param>
/// <param name="ExpiresAt">UTC timestamp when the access token expires</param>
/// <param name="MustChangePassword">Indicates if user must change password before accessing system</param>
/// <param name="User">Complete user information including roles, permissions, and preferences</param>
/// <remarks>
/// Authentication Response Features:
/// - Complete JWT token pair (access + refresh) for secure session management
/// - User context information for authorization and personalization
/// - Password policy enforcement through mandatory change flags
/// - Token expiration information for proactive refresh handling
/// - Role and permission data for client-side authorization decisions
/// 
/// Token Management:
/// - AccessToken: Short-lived (15-60 minutes) for API requests
/// - RefreshToken: Long-lived (7-30 days) for session continuation
/// - ExpiresAt: Client can proactively refresh before expiration
/// - Token rotation security implemented on refresh operations
/// - HTTP-only cookie storage recommended for refresh tokens
/// 
/// Security Features:
/// - Comprehensive user context for authorization enforcement
/// - Password policy compliance through MustChangePassword flag
/// - Role and permission embedding for client-side security decisions
/// - Multi-tenant branch scope information for data filtering
/// - Session management integration with device tracking
/// 
/// Client Integration:
/// - Direct API authentication using AccessToken in Authorization header
/// - Automatic token refresh using RefreshToken when AccessToken expires
/// - User interface customization based on roles and permissions
/// - Localization support through user preferred language
/// - Multi-tenant data filtering using branch scope information
/// 
/// Usage Scenarios:
/// - Web application single sign-on and session management
/// - Mobile application authentication and offline token storage
/// - API client authentication for system integration
/// - Microservice authentication token propagation
/// - Cross-domain authentication with secure token handling
/// </remarks>
public record LoginResponse(
    string AccessToken,
    string RefreshToken,
    DateTime ExpiresAt,
    bool MustChangePassword,
    UserInfo User
);

/// <summary>
/// User information model containing identity, authorization, and personalization data.
/// Provides comprehensive user context for client applications including roles,
/// permissions, and multi-tenant access scope information.
/// </summary>
/// <param name="Id">Unique user identifier for entity relationships and audit logging</param>
/// <param name="Username">Unique username for display and identification purposes</param>
/// <param name="Email">User email address for communications and notifications</param>
/// <param name="PreferredLanguage">ISO 639-1 language code for localization preferences</param>
/// <param name="Roles">Collection of role names assigned to the user for authorization</param>
/// <param name="Permissions">Collection of specific permission keys granted to the user</param>
/// <param name="BranchIds">Collection of branch IDs defining user's multi-tenant access scope</param>
/// <remarks>
/// User Context Features:
/// - Complete identity information for user recognition and audit trails
/// - Authorization context with roles and permissions for access control
/// - Personalization data for user interface customization
/// - Multi-tenant scope definition for data access boundaries
/// - Localization preferences for international application support
/// 
/// Authorization Model:
/// - Roles: High-level user categories (Admin, Manager, Employee, etc.)
/// - Permissions: Fine-grained action-based access rights
/// - BranchIds: Multi-tenant data access scope boundaries
/// - Hierarchical permission inheritance through role assignments
/// - Cross-branch access control for administrative operations
/// 
/// Role-Based Access Control (RBAC):
/// - Roles define broad user categories and responsibilities
/// - Permissions provide specific action authorization
/// - Multiple role assignment supported for complex organizations
/// - Role inheritance and delegation patterns supported
/// - Permission aggregation from all assigned roles
/// 
/// Multi-tenant Architecture:
/// - BranchIds define accessible organizational units
/// - Empty BranchIds list indicates system administrator privileges
/// - Branch-scoped data filtering enforced throughout application
/// - Cross-branch operations controlled by role permissions
/// - Tenant data isolation maintained through scope enforcement
/// 
/// Personalization Features:
/// - PreferredLanguage enables localized user interfaces
/// - Cultural formatting for dates, numbers, and currencies
/// - Right-to-Left (RTL) text support for Arabic language
/// - Timezone considerations for multi-location organizations
/// - User preference persistence across sessions
/// 
/// Security Considerations:
/// - User ID enables secure entity ownership validation
/// - Role and permission data cached for performance optimization
/// - Branch scope prevents unauthorized cross-tenant data access
/// - Sensitive personal information excluded from general user context
/// - Regular permission refresh ensures up-to-date authorization
/// 
/// Client Application Usage:
/// - User interface customization based on roles and permissions
/// - Feature availability determination through permission checks
/// - Data filtering implementation using branch scope
/// - Localization and internationalization based on language preference
/// - Audit logging and user activity tracking using user ID
/// </remarks>
public record UserInfo(
    long Id,
    string Username,
    string Email,
    string PreferredLanguage,
    List<string> Roles,
    List<string> Permissions,
    List<long> BranchIds,
    string? FullName = null,
    string? FullNameAr = null,
    long? EmployeeId = null,
    bool IsManager = false
);