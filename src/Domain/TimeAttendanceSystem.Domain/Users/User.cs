using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Users;

/// <summary>
/// Represents a user account in the Time Attendance System.
/// This aggregate root encapsulates user identity, authentication credentials,
/// security settings, and relationships with roles and branches.
/// 
/// Security Features:
/// - PBKDF2-SHA256 password hashing with salt
/// - Progressive lockout mechanism (5/10/15+ failed attempts)
/// - Two-factor authentication support
/// - Password history tracking
/// - Session management and device tracking
/// - Audit trail for login attempts
/// </summary>
/// <remarks>
/// The User entity follows Domain-Driven Design principles and serves as an aggregate root.
/// It maintains invariants around security policies and user state consistency.
/// 
/// Password Policy:
/// - Minimum 8 characters with complexity requirements
/// - Password history prevents reuse of last 5 passwords
/// - Forced password changes for new users or security incidents
/// 
/// Lockout Policy:
/// - 5 failed attempts: 15-minute lockout
/// - 10 failed attempts: 1-hour lockout  
/// - 15+ failed attempts: 24-hour lockout
/// </remarks>
public class User : BaseEntity
{
    /// <summary>
    /// Unique username for login. Must be unique across the system.
    /// Used for authentication and audit logging.
    /// </summary>
    /// <remarks>
    /// Username is case-insensitive but stored in original case.
    /// Validated for length (3-50 characters) and allowed characters.
    /// </remarks>
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Email address for notifications and password recovery.
    /// Must be unique and properly formatted.
    /// </summary>
    /// <remarks>
    /// Email verification is required for password reset functionality.
    /// Used for sending security notifications and system alerts.
    /// </remarks>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Optional phone number for SMS notifications and 2FA backup.
    /// </summary>
    public string? Phone { get; set; }

    /// <summary>
    /// PBKDF2-SHA256 hashed password using 10,000 iterations.
    /// Never stored in plain text for security compliance.
    /// </summary>
    /// <remarks>
    /// Hash is generated using PBKDF2 with SHA256 and a unique salt.
    /// This provides resistance against rainbow table and brute force attacks.
    /// </remarks>
    public string PasswordHash { get; set; } = string.Empty;

    /// <summary>
    /// Cryptographically secure random salt for password hashing.
    /// Each user has a unique salt to prevent rainbow table attacks.
    /// </summary>
    /// <remarks>
    /// Salt is generated using cryptographically secure random number generator.
    /// Base64 encoded for storage efficiency.
    /// </remarks>
    public string PasswordSalt { get; set; } = string.Empty;

    /// <summary>
    /// Indicates if two-factor authentication is enabled for this user.
    /// When true, TOTP verification is required after password validation.
    /// </summary>
    public bool TwoFactorEnabled { get; set; }

    /// <summary>
    /// Base32-encoded secret key for TOTP (Time-based One-Time Password) generation.
    /// Used with authenticator apps like Google Authenticator or Authy.
    /// </summary>
    /// <remarks>
    /// Key is generated during 2FA setup and remains constant until regenerated.
    /// Must be kept secure and is encrypted at rest.
    /// </remarks>
    public string? TwoFactorSecretKey { get; set; }

    /// <summary>
    /// UTC timestamp when the user lockout expires.
    /// Null indicates the user is not locked out.
    /// </summary>
    /// <remarks>
    /// Implements progressive lockout based on failed login attempts:
    /// - 5 failures: 15 minutes
    /// - 10 failures: 1 hour
    /// - 15+ failures: 24 hours
    /// </remarks>
    public DateTime? LockoutEndUtc { get; set; }

    /// <summary>
    /// Counter for consecutive failed login attempts.
    /// Reset to zero upon successful authentication.
    /// </summary>
    /// <remarks>
    /// Used to calculate progressive lockout duration.
    /// Tracked per user account regardless of IP address.
    /// </remarks>
    public int FailedLoginAttempts { get; set; }

    /// <summary>
    /// UTC timestamp of the most recent failed login attempt.
    /// Used for security monitoring and audit trails.
    /// </summary>
    public DateTime? LastFailedLoginAtUtc { get; set; }

    /// <summary>
    /// Forces the user to change their password on next login.
    /// Used for security incidents or initial account setup.
    /// </summary>
    /// <remarks>
    /// Automatically set for new users and after password resets.
    /// Can be manually set by administrators for security compliance.
    /// </remarks>
    public bool MustChangePassword { get; set; }

    /// <summary>
    /// UTC timestamp when the current password was set.
    /// Used for password aging policies and security audits.
    /// </summary>
    public DateTime? PasswordChangedAtUtc { get; set; }

    /// <summary>
    /// Indicates if the user's email address has been verified.
    /// Required for password reset and sensitive operations.
    /// </summary>
    public bool EmailConfirmed { get; set; }

    /// <summary>
    /// Token used for email address verification.
    /// Single-use, time-limited token sent via email.
    /// </summary>
    /// <remarks>
    /// Token expires after 24 hours for security.
    /// Null when email is confirmed or token is consumed.
    /// </remarks>
    public string? EmailConfirmationToken { get; set; }

    /// <summary>
    /// Token used for password reset functionality.
    /// Single-use, time-limited token sent via secure email.
    /// </summary>
    /// <remarks>
    /// Token is cryptographically secure and expires quickly (15 minutes).
    /// Invalidated after use or upon successful password change.
    /// </remarks>
    public string? PasswordResetToken { get; set; }

    /// <summary>
    /// UTC expiration timestamp for the password reset token.
    /// Tokens expire after 15 minutes for security.
    /// </summary>
    public DateTime? PasswordResetTokenExpiresAtUtc { get; set; }

    /// <summary>
    /// User's preferred language for localized UI and notifications.
    /// ISO 639-1 language code (e.g., "en", "es", "fr").
    /// </summary>
    /// <remarks>
    /// Defaults to "en" (English) for new users.
    /// Used by the frontend for interface localization.
    /// </remarks>
    public string PreferredLanguage { get; set; } = "en";

    /// <summary>
    /// Indicates if the user account is active and can authenticate.
    /// Inactive users cannot login but data is preserved.
    /// </summary>
    /// <remarks>
    /// Used for soft deletion - preserves audit trails and relationships.
    /// Can be reactivated by administrators if needed.
    /// </remarks>
    public bool IsActive { get; set; } = true;

    // Navigation Properties - Define relationships with other entities

    /// <summary>
    /// Collection of roles assigned to this user.
    /// Defines the user's permissions and access levels within the system.
    /// </summary>
    /// <remarks>
    /// Many-to-many relationship through UserRole join entity.
    /// Supports multiple roles per user for flexible permission management.
    /// </remarks>
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

    /// <summary>
    /// Collection of branches this user has access to.
    /// Implements branch-level security and data segregation.
    /// </summary>
    /// <remarks>
    /// Many-to-many relationship through UserBranchScope join entity.
    /// Empty collection means access to all branches (super admin).
    /// </remarks>
    public ICollection<UserBranchScope> UserBranchScopes { get; set; } = new List<UserBranchScope>();

    /// <summary>
    /// Collection of active refresh tokens for this user.
    /// Enables secure token refresh without re-authentication.
    /// </summary>
    /// <remarks>
    /// Multiple tokens support multiple concurrent sessions/devices.
    /// Tokens are automatically cleaned up upon expiration.
    /// </remarks>
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    /// <summary>
    /// Historical record of all login attempts (successful and failed).
    /// Provides security monitoring and forensic capabilities.
    /// </summary>
    /// <remarks>
    /// Includes IP addresses, timestamps, and failure reasons.
    /// Used for security analytics and suspicious activity detection.
    /// </remarks>
    public ICollection<LoginAttempt> LoginAttempts { get; set; } = new List<LoginAttempt>();

    /// <summary>
    /// Historical record of user's previous password hashes.
    /// Prevents password reuse and enforces password history policy.
    /// </summary>
    /// <remarks>
    /// Stores last 5 password hashes to prevent reuse.
    /// Hashes are never decrypted, only compared during password changes.
    /// </remarks>
    public ICollection<PasswordHistory> PasswordHistory { get; set; } = new List<PasswordHistory>();

    /// <summary>
    /// Collection of backup codes for two-factor authentication recovery.
    /// Single-use codes for when TOTP device is unavailable.
    /// </summary>
    /// <remarks>
    /// Generated during 2FA setup (typically 10 codes).
    /// Each code can only be used once and should be stored securely by user.
    /// </remarks>
    public ICollection<TwoFactorBackupCode> TwoFactorBackupCodes { get; set; } = new List<TwoFactorBackupCode>();

    /// <summary>
    /// Collection of active user sessions across different devices.
    /// Enables session management and concurrent login monitoring.
    /// </summary>
    /// <remarks>
    /// Tracks device information, IP addresses, and session activity.
    /// Supports selective session termination for security.
    /// </remarks>
    public ICollection<UserSession> UserSessions { get; set; } = new List<UserSession>();
}