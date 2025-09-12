using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Abstraction for JWT (JSON Web Token) generation and management services.
/// Provides secure token generation for authentication and authorization
/// with role-based access control and multi-tenant support.
/// </summary>
/// <remarks>
/// JWT Token Features:
/// - Secure access token generation with user claims
/// - Cryptographically secure refresh token creation
/// - Configurable token expiration management
/// - Role and permission embedding for authorization
/// - Multi-tenant branch scope inclusion
/// - Industry-standard JWT format compliance
/// 
/// Security Implementation:
/// - Uses strong cryptographic signing algorithms (RS256/HS256)
/// - Includes essential security claims (iss, aud, exp, nbf, iat)
/// - Embeds user identity and authorization data
/// - Supports token refresh rotation for enhanced security
/// - Implements proper token expiration policies
/// - Prevents token tampering through digital signatures
/// 
/// Token Types:
/// - Access Token: Short-lived (15-60 minutes) for API authentication
/// - Refresh Token: Long-lived (7-30 days) for token renewal
/// - Both tokens follow JWT standard with different purposes
/// 
/// Claims Structure:
/// - Standard claims: sub (user ID), username, email, roles
/// - Custom claims: permissions, branch IDs, preferred language
/// - Security claims: issued at, expiration, not before
/// - Issuer and audience validation for token verification
/// 
/// Integration Points:
/// - Used by Authentication services for login flows
/// - Consumed by Authorization middleware for request validation
/// - Integrated with refresh token rotation mechanisms
/// - Supports various JWT libraries and frameworks
/// </remarks>
public interface IJwtTokenGenerator
{
    /// <summary>
    /// Generates a JWT access token containing user identity, roles, permissions, and branch scope.
    /// Creates a signed token with all necessary claims for authentication and authorization.
    /// </summary>
    /// <param name="user">Domain user entity containing identity information</param>
    /// <param name="roles">Collection of role names assigned to the user</param>
    /// <param name="permissions">Collection of permission keys granted to the user</param>
    /// <param name="branchIds">Collection of branch IDs for multi-tenant access scope</param>
    /// <returns>Base64-encoded JWT access token string</returns>
    /// <remarks>
    /// Access Token Claims:
    /// - sub: User ID for unique identification
    /// - username: Username for display and logging
    /// - email: Email address for notifications
    /// - roles: Array of assigned role names
    /// - permissions: Array of granted permission keys  
    /// - branch_ids: Array of accessible branch IDs
    /// - preferred_language: User's localization preference
    /// - exp: Token expiration timestamp (UTC)
    /// - iat: Token issued at timestamp (UTC)
    /// - iss: Token issuer identification
    /// - aud: Target audience for token validation
    /// 
    /// Security Features:
    /// - Digital signature prevents token tampering
    /// - Short expiration time limits exposure window
    /// - Contains all data needed for authorization decisions
    /// - Can be verified without database lookup
    /// - Includes user context for audit logging
    /// 
    /// Usage Scenarios:
    /// - API request authentication via Authorization header
    /// - Role-based access control in middleware
    /// - Permission validation in business logic
    /// - Multi-tenant data filtering by branch scope
    /// - User context extraction for audit trails
    /// 
    /// Token Format: "Bearer {access_token}"
    /// Lifetime: Configurable, typically 15-60 minutes
    /// </remarks>
    string GenerateAccessToken(User user, IReadOnlyList<string> roles, IReadOnlyList<string> permissions, IReadOnlyList<long> branchIds);

    /// <summary>
    /// Generates a cryptographically secure refresh token for token renewal operations.
    /// Creates an opaque token stored in database for secure access token refresh.
    /// </summary>
    /// <returns>Base64-encoded cryptographically secure random string</returns>
    /// <remarks>
    /// Refresh Token Characteristics:
    /// - Cryptographically secure random generation (256+ bits entropy)
    /// - Opaque format (not JWT) - meaning stored in database
    /// - Longer lifetime than access tokens (7-30 days)
    /// - Single-use with rotation security model
    /// - Associated with specific user and device
    /// - Can be revoked immediately for security
    /// 
    /// Security Features:
    /// - High entropy prevents guessing attacks
    /// - Database storage enables immediate revocation
    /// - Device binding for session management
    /// - Rotation on each use prevents replay attacks
    /// - Independent of access token for security separation
    /// - Automatic cleanup on expiration
    /// 
    /// Refresh Token Flow:
    /// 1. Generated during login and stored in database
    /// 2. Sent to client as HTTP-only cookie (recommended)
    /// 3. Used to request new access token when expired
    /// 4. New refresh token issued (rotation) and old one invalidated
    /// 5. Process continues until logout or token expiration
    /// 
    /// Storage Recommendations:
    /// - HTTP-only cookies prevent XSS attacks
    /// - Secure flag ensures HTTPS-only transmission
    /// - SameSite policy prevents CSRF attacks
    /// - Database storage enables server-side revocation
    /// 
    /// Lifetime: Configurable, typically 7-30 days
    /// Format: Opaque random string, not JWT
    /// </remarks>
    string GenerateRefreshToken();

    /// <summary>
    /// Gets the configured expiration time for newly generated access tokens.
    /// Provides consistent token lifetime across the application.
    /// </summary>
    /// <returns>DateTime representing when new access tokens will expire (UTC)</returns>
    /// <remarks>
    /// Token Expiration Policy:
    /// - Short-lived tokens reduce security risk exposure
    /// - Configurable lifetime based on security requirements
    /// - Typically 15-60 minutes for access tokens
    /// - Consistent across all token generation operations
    /// - UTC time prevents timezone-related issues
    /// 
    /// Configuration Sources:
    /// - Application settings (appsettings.json)
    /// - Environment variables for different environments
    /// - Security policies and compliance requirements
    /// - Performance considerations for token refresh frequency
    /// 
    /// Security Considerations:
    /// - Shorter expiration = better security, more refresh requests
    /// - Longer expiration = fewer refreshes, higher risk if compromised
    /// - Balance between security and user experience
    /// - Consider network latency and offline scenarios
    /// 
    /// Usage Context:
    /// - Login responses include expiration time for client
    /// - Token refresh operations use same expiration policy
    /// - Client applications can proactively refresh before expiration
    /// - Monitoring and alerting on token usage patterns
    /// 
    /// Time Format: UTC DateTime for timezone independence
    /// Typical Values: 15 minutes (high security) to 60 minutes (balanced)
    /// </remarks>
    DateTime GetTokenExpiration();
}