using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TimeAttendanceSystem.Application.Authorization.Commands.Login;
using TimeAttendanceSystem.Application.Authorization.Commands.RefreshToken;
using TimeAttendanceSystem.Application.Authorization.Commands.Logout;
using TimeAttendanceSystem.Application.Authorization.Commands.RequestPasswordReset;
using TimeAttendanceSystem.Application.Authorization.Commands.ResetPassword;
using TimeAttendanceSystem.Application.Authorization.Commands.EnableTwoFactor;
using TimeAttendanceSystem.Application.Authorization.Commands.ConfirmTwoFactor;
using TimeAttendanceSystem.Application.Authorization.Commands.VerifyTwoFactor;
using TimeAttendanceSystem.Application.Authorization.Commands.Register;
using TimeAttendanceSystem.Application.Authorization.Commands.VerifyEmail;
using TimeAttendanceSystem.Application.Authorization.Commands.ResendEmailVerification;
using TimeAttendanceSystem.Application.Authorization.Commands.ChangePassword;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for authentication and authorization operations.
/// Provides comprehensive security endpoints including login, registration, 2FA,
/// password management, and session control with enterprise-grade security features.
/// </summary>
/// <remarks>
/// Security Features:
/// - JWT-based authentication with refresh token rotation
/// - Two-factor authentication (TOTP) with backup codes
/// - Progressive lockout and brute force protection
/// - Secure password reset with time-limited tokens
/// - Email verification for account activation
/// - HTTP-only cookies for refresh token security
/// - Device fingerprinting and session management
/// 
/// Authentication Flow:
/// 1. User registration with email verification
/// 2. Login with username/password authentication
/// 3. Optional 2FA verification for enhanced security
/// 4. JWT token issuance with refresh capability
/// 5. Automatic token refresh for session continuity
/// 
/// Password Security:
/// - PBKDF2-SHA256 hashing with unique salts
/// - Password history tracking (prevents reuse)
/// - Secure password reset with email verification
/// - Password strength requirements enforcement
/// - Account lockout after failed attempts
/// 
/// Cookie Security:
/// - HTTP-only refresh tokens prevent XSS attacks
/// - Secure flag for HTTPS-only transmission
/// - SameSite strict policy prevents CSRF
/// - Path-specific cookies limit exposure
/// - Automatic cleanup on logout/expiration
/// 
/// API Design:
/// - RESTful endpoints with proper HTTP verbs
/// - Consistent error response format
/// - Request/response DTOs for type safety
/// - CQRS pattern with MediatR for command handling
/// - Comprehensive input validation and sanitization
/// </remarks>
[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <summary>
    /// Initializes the authentication controller with MediatR for CQRS pattern implementation.
    /// </summary>
    /// <param name="mediator">MediatR instance for dispatching commands and queries</param>
    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Authenticates a user with username and password credentials.
    /// Supports two-factor authentication and secure session establishment.
    /// </summary>
    /// <param name="request">Login credentials including username, password, and device info</param>
    /// <returns>JWT tokens and user information on success, or error details on failure</returns>
    /// <response code="200">Login successful - returns access token and user info</response>
    /// <response code="400">Invalid credentials or validation errors</response>
    /// <remarks>
    /// Authentication Process:
    /// 1. Validates username and password against database
    /// 2. Checks account status (active, not locked)
    /// 3. Verifies 2FA if enabled for the user
    /// 4. Generates JWT access and refresh tokens
    /// 5. Sets secure HTTP-only cookie for refresh token
    /// 6. Returns access token and user information
    /// 
    /// Security Features:
    /// - Progressive lockout after failed attempts
    /// - Device fingerprinting for session tracking
    /// - Refresh token stored as secure HTTP-only cookie
    /// - Comprehensive audit logging
    /// - Protection against brute force attacks
    /// 
    /// Two-Factor Authentication:
    /// - If 2FA is enabled, login returns requiresTwoFactor flag
    /// - User must complete 2FA verification separately
    /// - Supports TOTP authenticator apps and backup codes
    /// </remarks>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var command = new LoginCommand(request.Username, request.Password, request.DeviceInfo, request.RememberMe);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            // Check if 2FA is required
            if (result.Error.Contains("Two-factor authentication required"))
            {
                return Ok(new
                {
                    requiresTwoFactor = true,
                    message = "Two-factor authentication required. Please provide your verification code."
                });
            }
            
            return BadRequest(new { error = result.Error });
        }

        var response = result.Value;
        
        // Set refresh token as HTTP-only cookie for security
        SetRefreshTokenCookie(response.RefreshToken);

        return Ok(new
        {
            accessToken = response.AccessToken,
            expiresAt = response.ExpiresAt,
            mustChangePassword = response.MustChangePassword,
            user = response.User
        });
    }

    /// <summary>
    /// Refreshes expired access tokens using refresh token rotation.
    /// Maintains session continuity without requiring re-authentication.
    /// </summary>
    /// <param name="request">Refresh token request with optional device info</param>
    /// <returns>New access token and rotated refresh token</returns>
    /// <response code="200">Token refresh successful - returns new access token</response>
    /// <response code="400">Invalid or expired refresh token</response>
    /// <remarks>
    /// Token Refresh Process:
    /// 1. Extracts refresh token from HTTP-only cookie or request body
    /// 2. Validates refresh token against database
    /// 3. Generates new access token with current user claims
    /// 4. Issues new refresh token (rotation security)
    /// 5. Updates secure cookie with new refresh token
    /// 6. Invalidates old refresh token
    /// 
    /// Security Benefits:
    /// - Refresh token rotation prevents replay attacks
    /// - Short-lived access tokens minimize exposure window
    /// - HTTP-only cookies protect against XSS attacks
    /// - Automatic cleanup of expired tokens
    /// - Device tracking for suspicious activity detection
    /// 
    /// Error Handling:
    /// - Invalid tokens trigger automatic logout
    /// - Expired tokens are gracefully handled
    /// - Device mismatches logged for security analysis
    /// </remarks>
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        // Try to get refresh token from cookie first, then from request body
        var refreshToken = Request.Cookies["refreshToken"] ?? request.RefreshToken;
        
        if (string.IsNullOrEmpty(refreshToken))
        {
            return BadRequest(new { error = "Refresh token is required." });
        }

        var command = new RefreshTokenCommand(refreshToken, request.DeviceInfo);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            // Clear the refresh token cookie on failure
            ClearRefreshTokenCookie();
            return BadRequest(new { error = result.Error });
        }

        var response = result.Value;
        
        // Set new refresh token as HTTP-only cookie
        SetRefreshTokenCookie(response.RefreshToken);

        return Ok(new
        {
            accessToken = response.AccessToken,
            expiresAt = response.ExpiresAt,
            mustChangePassword = response.MustChangePassword,
            user = response.User
        });
    }

    /// <summary>
    /// Logs out the current user and invalidates authentication tokens.
    /// Supports selective logout from current device or all devices.
    /// </summary>
    /// <param name="request">Logout request with optional bulk logout flag</param>
    /// <returns>Success confirmation message</returns>
    /// <response code="200">Logout successful</response>
    /// <response code="400">Logout request validation errors</response>
    /// <remarks>
    /// Logout Process:
    /// 1. Extracts refresh token from cookie or request
    /// 2. Invalidates current refresh token in database
    /// 3. Optionally invalidates all user sessions
    /// 4. Clears HTTP-only refresh token cookie
    /// 5. Logs security event for audit trail
    /// 6. Prevents further API access with invalidated tokens
    /// 
    /// Security Features:
    /// - Complete token invalidation prevents reuse
    /// - Bulk logout for security incidents
    /// - Audit logging for compliance
    /// - Secure cookie cleanup
    /// - Session termination across all devices
    /// 
    /// Use Cases:
    /// - Normal user logout from current device
    /// - Security response (logout from all devices)
    /// - Account compromise recovery
    /// - Password change cleanup
    /// </remarks>
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
    {
        var refreshToken = Request.Cookies["refreshToken"] ?? request.RefreshToken;
        var command = new LogoutCommand(refreshToken, request.LogoutFromAllDevices);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        // Clear the refresh token cookie
        ClearRefreshTokenCookie();

        return Ok(new { message = "Logged out successfully." });
    }

    [HttpPost("request-password-reset")]
    public async Task<IActionResult> RequestPasswordReset([FromBody] PasswordResetRequest request)
    {
        var command = new RequestPasswordResetCommand(request.Email);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "If the email exists, a password reset link has been sent." });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        var command = new ResetPasswordCommand(request.Email, request.Token, request.NewPassword);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "Password has been reset successfully." });
    }

    [HttpPost("debug-login")]
    public async Task<IActionResult> DebugLogin([FromBody] LoginRequest request)
    {
        // FOR TESTING ONLY - bypasses password verification
        var command = new LoginCommand("test_debug_user", "", request.DeviceInfo);
        
        // Create a mock test user response for 2FA testing
        var mockUser = new UserInfo(1, "testuser", "test@example.com", "en", new List<string> { "Admin" }, new List<string> { "user.read" }, new List<long> { 1 });
        var mockResponse = new LoginResponse("mock_access_token", "mock_refresh_token", DateTime.UtcNow.AddMinutes(15), false, mockUser);
        
        SetRefreshTokenCookie(mockResponse.RefreshToken);
        return Ok(new
        {
            accessToken = mockResponse.AccessToken,
            expiresAt = mockResponse.ExpiresAt,
            mustChangePassword = mockResponse.MustChangePassword,
            user = mockResponse.User
        });
    }

    /// <summary>
    /// Initiates two-factor authentication setup for the authenticated user.
    /// Generates TOTP secret key, QR code, and backup codes for enhanced security.
    /// </summary>
    /// <returns>2FA setup information including secret key, QR code URI, and backup codes</returns>
    /// <response code="200">2FA setup initiated - returns setup information</response>
    /// <response code="400">2FA setup failed or already enabled</response>
    /// <response code="401">User not authenticated</response>
    /// <remarks>
    /// Two-Factor Authentication Setup:
    /// 1. Generates cryptographically secure TOTP secret key
    /// 2. Creates QR code URI for authenticator app setup
    /// 3. Generates single-use backup codes for recovery
    /// 4. Stores encrypted secret key in database
    /// 5. Returns setup information to client
    /// 
    /// Security Features:
    /// - Base32-encoded secret keys compatible with standard authenticators
    /// - QR code generation for easy mobile app setup
    /// - 10 unique backup codes for emergency access
    /// - Secret key encryption at rest
    /// - Audit logging for security compliance
    /// 
    /// Supported Authenticators:
    /// - Google Authenticator
    /// - Microsoft Authenticator
    /// - Authy
    /// - Any RFC 6238 compliant TOTP app
    /// 
    /// Next Steps:
    /// - User scans QR code or manually enters secret
    /// - User calls confirm-2fa endpoint with verification code
    /// - 2FA becomes active after successful confirmation
    /// </remarks>
    [HttpPost("enable-2fa")]
    [Authorize]
    public async Task<IActionResult> EnableTwoFactor()
    {
        var command = new EnableTwoFactorCommand();
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        var response = result.Value;
        return Ok(new
        {
            secretKey = response.SecretKey,
            qrCodeUri = response.QrCodeUri,
            backupCodes = response.BackupCodes
        });
    }

    [HttpPost("confirm-2fa")]
    [Authorize]
    public async Task<IActionResult> ConfirmTwoFactor([FromBody] ConfirmTwoFactorRequest request)
    {
        var command = new ConfirmTwoFactorCommand(request.Code);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "Two-factor authentication has been enabled successfully." });
    }

    /// <summary>
    /// Completes two-factor authentication verification during login process.
    /// Validates TOTP code or backup code to finalize user authentication.
    /// </summary>
    /// <param name="request">2FA verification request with username, code, and device info</param>
    /// <returns>Complete authentication response with JWT tokens</returns>
    /// <response code="200">2FA verification successful - returns tokens and user info</response>
    /// <response code="400">Invalid 2FA code or verification failed</response>
    /// <remarks>
    /// 2FA Verification Process:
    /// 1. Validates username and retrieves user 2FA settings
    /// 2. Verifies TOTP code against user's secret key
    /// 3. Alternatively accepts single-use backup codes
    /// 4. Generates JWT tokens upon successful verification
    /// 5. Sets secure refresh token cookie
    /// 6. Marks backup codes as used if applicable
    /// 
    /// Code Validation:
    /// - TOTP codes valid for 30-second time window
    /// - Allows for clock skew (±1 time step tolerance)
    /// - Backup codes are single-use and invalidated
    /// - Rate limiting prevents brute force attacks
    /// - Failed attempts contribute to account lockout
    /// 
    /// Security Features:
    /// - Time-based one-time password validation
    /// - Backup code consumption tracking
    /// - Device fingerprinting for session security
    /// - Comprehensive audit logging
    /// - Replay attack prevention
    /// 
    /// Error Scenarios:
    /// - Invalid or expired TOTP codes
    /// - Already used backup codes
    /// - Account lockout due to failed attempts
    /// - User not found or 2FA not enabled
    /// </remarks>
    [HttpPost("verify-2fa")]
    public async Task<IActionResult> VerifyTwoFactor([FromBody] VerifyTwoFactorRequest request)
    {
        var command = new VerifyTwoFactorCommand(request.Username, request.Code, request.DeviceInfo);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        var response = result.Value;
        
        // Set refresh token as HTTP-only cookie for security
        SetRefreshTokenCookie(response.RefreshToken);

        return Ok(new
        {
            accessToken = response.AccessToken,
            expiresAt = response.ExpiresAt,
            mustChangePassword = response.MustChangePassword,
            user = response.User
        });
    }

    /// <summary>
    /// Registers a new user account with email verification requirement.
    /// Creates user account and sends verification email for account activation.
    /// </summary>
    /// <param name="request">Registration request with user details and credentials</param>
    /// <returns>Registration confirmation with user ID and verification instructions</returns>
    /// <response code="200">Registration successful - verification email sent</response>
    /// <response code="400">Registration failed due to validation errors</response>
    /// <remarks>
    /// Registration Process:
    /// 1. Validates username uniqueness and email format
    /// 2. Enforces password strength requirements
    /// 3. Creates user account in inactive state
    /// 4. Generates secure email verification token
    /// 5. Sends verification email to provided address
    /// 6. Returns registration confirmation
    /// 
    /// Password Security:
    /// - Minimum 8 characters with complexity requirements
    /// - PBKDF2-SHA256 hashing with unique salt
    /// - Password confirmation validation
    /// - History tracking to prevent reuse
    /// - Secure storage with encryption at rest
    /// 
    /// Email Verification:
    /// - Cryptographically secure verification tokens
    /// - 24-hour token expiration for security
    /// - Account remains inactive until verified
    /// - Resend capability for lost emails
    /// - Automatic cleanup of expired tokens
    /// 
    /// Validation Rules:
    /// - Username: 3-50 characters, alphanumeric + underscore
    /// - Email: Valid format, unique across system
    /// - Password: Complexity requirements enforced
    /// - Preferred language: ISO 639-1 language codes
    /// 
    /// Security Features:
    /// - Prevents enumeration attacks with generic responses
    /// - Rate limiting on registration attempts
    /// - Input sanitization and validation
    /// - Audit logging for compliance
    /// </remarks>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var command = new RegisterCommand(
            request.Username, 
            request.Email, 
            request.Password, 
            request.ConfirmPassword,
            request.PreferredLanguage ?? "en"
        );
        
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new
        {
            message = result.Value.Message,
            userId = result.Value.UserId,
            username = result.Value.Username,
            email = result.Value.Email
        });
    }

    [HttpPost("verify-email")]
    public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailRequest request)
    {
        var command = new VerifyEmailCommand(request.Email, request.Token);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "Email verified successfully. Your account is now active." });
    }

    [HttpPost("resend-email-verification")]
    public async Task<IActionResult> ResendEmailVerification([FromBody] ResendEmailVerificationRequest request)
    {
        var command = new ResendEmailVerificationCommand(request.Email);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "If the email exists and is not verified, a new verification email has been sent." });
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        var command = new ChangePasswordCommand(request.CurrentPassword, request.NewPassword);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "Password changed successfully." });
    }

    /// <summary>
    /// Sets a secure HTTP-only cookie containing the refresh token.
    /// Implements multiple security layers to protect against token theft.
    /// </summary>
    /// <param name="refreshToken">JWT refresh token to store in cookie</param>
    /// <remarks>
    /// Cookie Security Features:
    /// - HttpOnly: Prevents JavaScript access (XSS protection)
    /// - Secure: HTTPS-only transmission when available
    /// - SameSite: Strict policy prevents CSRF attacks
    /// - Path-specific: Limited to auth endpoints only
    /// - Expires: 7-day lifetime with automatic cleanup
    /// 
    /// Security Benefits:
    /// - Token not accessible to client-side scripts
    /// - Protection against cross-site scripting attacks
    /// - CSRF prevention through SameSite policy
    /// - Automatic HTTPS detection and enforcement
    /// - Minimal exposure through path restrictions
    /// </remarks>
    private void SetRefreshTokenCookie(string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = Request.IsHttps,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddDays(7),
            Path = "/api/v1/auth"
        };

        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }

    /// <summary>
    /// Clears the refresh token cookie by setting it to expire immediately.
    /// Ensures complete cleanup during logout or token invalidation.
    /// </summary>
    /// <remarks>
    /// Cookie Cleanup Process:
    /// - Sets cookie value to empty
    /// - Forces immediate expiration
    /// - Maintains same security options for consistency
    /// - Prevents token reuse after logout
    /// 
    /// Called During:
    /// - User logout (manual or automatic)
    /// - Token refresh failures
    /// - Security incidents requiring token revocation
    /// - Account lockout or deactivation
    /// </remarks>
    private void ClearRefreshTokenCookie()
    {
        Response.Cookies.Delete("refreshToken", new CookieOptions
        {
            HttpOnly = true,
            Secure = Request.IsHttps,
            SameSite = SameSiteMode.Strict,
            Path = "/api/v1/auth"
        });
    }
}

/// <summary>
/// Request model for user authentication with username and password.
/// Includes optional device information for session tracking and security.
/// </summary>
/// <param name="Username">User's unique username for authentication</param>
/// <param name="Password">User's password in plain text (encrypted in transit via HTTPS)</param>
/// <param name="DeviceInfo">Optional device/browser information for session fingerprinting</param>
/// <param name="RememberMe">Flag indicating whether to use extended token expiration for persistent sessions</param>
public record LoginRequest(string Username, string Password, string? DeviceInfo = null, bool RememberMe = false);

/// <summary>
/// Request model for refreshing expired access tokens.
/// Supports both cookie-based and body-based refresh token transmission.
/// </summary>
/// <param name="RefreshToken">JWT refresh token (optional if sent via HTTP-only cookie)</param>
/// <param name="DeviceInfo">Optional device information for security validation</param>
public record RefreshTokenRequest(string? RefreshToken = null, string? DeviceInfo = null);

/// <summary>
/// Request model for user logout operations.
/// Supports selective logout from current device or all devices.
/// </summary>
/// <param name="RefreshToken">Refresh token to invalidate (optional if sent via cookie)</param>
/// <param name="LogoutFromAllDevices">Flag to logout from all devices (security feature)</param>
public record LogoutRequest(string? RefreshToken = null, bool LogoutFromAllDevices = false);

/// <summary>
/// Request model for initiating password reset process.
/// Contains email address for sending reset instructions.
/// </summary>
/// <param name="Email">Email address associated with the user account</param>
public record PasswordResetRequest(string Email);

/// <summary>
/// Request model for completing password reset with verification token.
/// Contains email, reset token, and new password for validation.
/// </summary>
/// <param name="Email">Email address for account identification</param>
/// <param name="Token">Time-limited password reset token from email</param>
/// <param name="NewPassword">New password meeting strength requirements</param>
public record ResetPasswordRequest(string Email, string Token, string NewPassword);

/// <summary>
/// Request model for confirming two-factor authentication setup.
/// Contains TOTP verification code from authenticator app.
/// </summary>
/// <param name="Code">6-digit TOTP code from authenticator app</param>
public record ConfirmTwoFactorRequest(string Code);

/// <summary>
/// Request model for two-factor authentication verification during login.
/// Contains username, verification code, and optional device information.
/// </summary>
/// <param name="Username">Username for account identification</param>
/// <param name="Code">6-digit TOTP code or single-use backup code</param>
/// <param name="DeviceInfo">Optional device information for session tracking</param>
public record VerifyTwoFactorRequest(string Username, string Code, string? DeviceInfo = null);

/// <summary>
/// Request model for new user registration.
/// Contains all required information for account creation and verification.
/// </summary>
/// <param name="Username">Unique username (3-50 characters, alphanumeric + underscore)</param>
/// <param name="Email">Valid email address for verification and communication</param>
/// <param name="Password">Password meeting complexity requirements</param>
/// <param name="ConfirmPassword">Password confirmation for validation</param>
/// <param name="PreferredLanguage">ISO 639-1 language code (default: "en")</param>
public record RegisterRequest(string Username, string Email, string Password, string ConfirmPassword, string? PreferredLanguage = null);

/// <summary>
/// Request model for email address verification.
/// Contains email and verification token from registration email.
/// </summary>
/// <param name="Email">Email address to verify</param>
/// <param name="Token">Verification token from email link</param>
public record VerifyEmailRequest(string Email, string Token);

/// <summary>
/// Request model for resending email verification.
/// Contains email address for sending new verification email.
/// </summary>
/// <param name="Email">Email address requiring verification</param>
public record ResendEmailVerificationRequest(string Email);

/// <summary>
/// Request model for changing user password.
/// Contains current password for verification and new password.
/// </summary>
/// <param name="CurrentPassword">Current password for authentication</param>
/// <param name="NewPassword">New password meeting strength requirements</param>
public record ChangePasswordRequest(string CurrentPassword, string NewPassword);