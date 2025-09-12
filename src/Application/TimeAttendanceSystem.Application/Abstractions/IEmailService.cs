namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Email service abstraction for sending system-generated emails and notifications.
/// Provides secure email functionality for authentication, security, and user communication
/// while maintaining clean architecture separation from Infrastructure layer implementations.
/// </summary>
/// <remarks>
/// Email Service Features:
/// - Secure email communication for authentication workflows
/// - Template-based email generation with localization support
/// - Asynchronous email sending for performance optimization
/// - Error handling and retry mechanisms for reliability
/// - Security-focused email content and token management
/// 
/// Security Considerations:
/// - Email content sanitization to prevent injection attacks
/// - Secure token transmission in password reset and verification emails
/// - Rate limiting and throttling to prevent abuse
/// - Email address validation and verification
/// - Audit logging for email communications and security events
/// 
/// Authentication Use Cases:
/// - Password reset workflows with secure token delivery
/// - Email address verification for new account activation
/// - Two-factor authentication code delivery for enhanced security
/// - Account security notifications and alerts
/// - System maintenance and security update communications
/// 
/// Template Management:
/// - Professional HTML email templates with branding
/// - Multi-language email templates for internationalization
/// - Responsive email design for mobile and desktop clients
/// - Personalized email content with user-specific information
/// - Consistent messaging and branding across all communications
/// 
/// Implementation Guidelines:
/// - Infrastructure layer implements actual email sending logic
/// - Supports multiple email providers (SMTP, SendGrid, AWS SES, etc.)
/// - Configuration-driven email settings and templates
/// - Error handling and dead letter queue for failed emails
/// - Performance monitoring and email delivery tracking
/// 
/// Compliance and Privacy:
/// - GDPR compliance for user data handling in emails
/// - CAN-SPAM compliance for commercial email communications
/// - Email preference management and unsubscribe functionality
/// - Data retention policies for email logs and communications
/// - Privacy protection for sensitive information in emails
/// </remarks>
public interface IEmailService
{
    /// <summary>
    /// Sends a password reset email containing a secure reset token to the specified user.
    /// Enables users to securely reset their passwords through email verification.
    /// </summary>
    /// <param name="email">Recipient email address for password reset</param>
    /// <param name="username">Username for email personalization and identification</param>
    /// <param name="resetToken">Secure, time-limited password reset token</param>
    /// <param name="cancellationToken">Cancellation token for async operation control</param>
    /// <returns>Task representing the async email sending operation</returns>
    /// <remarks>
    /// Password Reset Email Features:
    /// - Secure reset token embedded in email link or displayed as code
    /// - Time-limited token validity (typically 15 minutes) for security
    /// - Professional email template with clear instructions
    /// - Personalized greeting using username
    /// - Security warnings about password reset requests
    /// 
    /// Security Implementation:
    /// - Reset token should be cryptographically secure and unique
    /// - Email should include warnings about suspicious activity
    /// - Token should expire after short time period for security
    /// - Multiple concurrent reset requests should invalidate previous tokens
    /// - Rate limiting applied to prevent abuse and spam
    /// 
    /// Email Content Elements:
    /// - Clear subject line indicating password reset request
    /// - Personalized greeting with username
    /// - Secure reset link or token code for password reset
    /// - Expiration time information for user guidance
    /// - Contact information for suspicious activity reporting
    /// - Company branding and professional formatting
    /// 
    /// Error Handling:
    /// - Invalid email addresses handled gracefully
    /// - Email delivery failures logged for monitoring
    /// - Retry mechanisms for temporary delivery issues
    /// - Dead letter queue for persistent failures
    /// - User feedback for successful email sending
    /// 
    /// Usage Context:
    /// - Triggered by forgot password requests from login page
    /// - Initiated by password reset commands in user management
    /// - Part of account security incident response procedures
    /// - Integration with password policy enforcement systems
    /// </remarks>
    Task SendPasswordResetEmailAsync(string email, string username, string resetToken, CancellationToken cancellationToken = default);

    /// <summary>
    /// Sends an email verification message containing a verification token to confirm email ownership.
    /// Enables secure email address verification for new account activation and email changes.
    /// </summary>
    /// <param name="email">Email address to be verified</param>
    /// <param name="username">Username for email personalization</param>
    /// <param name="verificationToken">Secure email verification token</param>
    /// <param name="cancellationToken">Cancellation token for async operation control</param>
    /// <returns>Task representing the async email sending operation</returns>
    /// <remarks>
    /// Email Verification Features:
    /// - Secure verification token for email ownership confirmation
    /// - Professional welcome message for new users
    /// - Clear verification instructions and call-to-action
    /// - Account activation workflow integration
    /// - Resend capability for verification emails
    /// 
    /// Verification Process:
    /// - Email sent immediately after user registration
    /// - Account remains inactive until email verification
    /// - Verification link or token provided for confirmation
    /// - Token expiration (typically 24 hours) for security
    /// - Multiple verification attempts tracked and limited
    /// 
    /// Email Content Structure:
    /// - Welcome message for new user registration
    /// - Clear verification link or token display
    /// - Step-by-step verification instructions
    /// - Account benefits and feature overview
    /// - Contact information for support and assistance
    /// 
    /// Security Considerations:
    /// - Verification token should be cryptographically secure
    /// - Email address validation before sending
    /// - Rate limiting to prevent verification spam
    /// - Token uniqueness and expiration enforcement
    /// - Audit logging for verification attempts
    /// 
    /// User Experience:
    /// - Immediate email delivery for quick verification
    /// - Mobile-friendly email design and links
    /// - Clear success confirmation after verification
    /// - Helpful error messages for expired tokens
    /// - Option to resend verification email
    /// </remarks>
    Task SendEmailVerificationAsync(string email, string username, string verificationToken, CancellationToken cancellationToken = default);

    /// <summary>
    /// Sends a two-factor authentication code via email for enhanced security verification.
    /// Provides alternative 2FA delivery method when TOTP apps are unavailable.
    /// </summary>
    /// <param name="email">Recipient email address for 2FA code delivery</param>
    /// <param name="code">Time-limited two-factor authentication code</param>
    /// <param name="cancellationToken">Cancellation token for async operation control</param>
    /// <returns>Task representing the async email sending operation</returns>
    /// <remarks>
    /// Two-Factor Authentication Email Features:
    /// - Secure delivery of time-sensitive authentication codes
    /// - Short-lived codes (typically 5-10 minutes) for security
    /// - Clear code presentation for easy manual entry
    /// - Security warnings about code confidentiality
    /// - Alternative to TOTP authenticator applications
    /// 
    /// 2FA Code Characteristics:
    /// - Numeric code (typically 6-8 digits) for user convenience
    /// - Short expiration time to limit exposure window
    /// - Single-use code that expires after successful verification
    /// - Rate limiting to prevent code generation abuse
    /// - Integration with existing 2FA security policies
    /// 
    /// Email Design Elements:
    /// - Prominent code display for easy reading
    /// - Expiration time clearly indicated
    /// - Security warnings about code confidentiality
    /// - Instructions for code entry and verification
    /// - Alternative contact methods for assistance
    /// 
    /// Security Implementation:
    /// - Code should be cryptographically random
    /// - Email delivery tracked for security monitoring
    /// - Failed delivery attempts logged and alerted
    /// - Code generation rate limiting per user
    /// - Integration with account lockout policies
    /// 
    /// User Experience Considerations:
    /// - Fast email delivery for time-sensitive codes
    /// - Clear, readable code formatting
    /// - Mobile-optimized email for easy access
    /// - Helpful instructions for first-time users
    /// - Support contact information for issues
    /// 
    /// Backup Authentication Method:
    /// - Used when primary TOTP device unavailable
    /// - Fallback option for lost or broken authenticators
    /// - Temporary 2FA method during device setup
    /// - Emergency access for critical account recovery
    /// - Integration with backup code systems
    /// </remarks>
    Task SendTwoFactorCodeAsync(string email, string code, CancellationToken cancellationToken = default);
}