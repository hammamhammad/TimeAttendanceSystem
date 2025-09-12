using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Authorization.Commands.Login;

namespace TimeAttendanceSystem.Application.Authorization.Commands.RefreshToken;

/// <summary>
/// CQRS command for refreshing expired JWT access tokens using refresh token rotation.
/// Implements secure token refresh mechanism with automatic token rotation and device tracking
/// for maintaining user sessions without requiring re-authentication.
/// </summary>
/// <param name="RefreshToken">The current refresh token to exchange for new tokens</param>
/// <param name="DeviceInfo">Optional device information for session tracking and security monitoring</param>
/// <remarks>
/// Token Refresh Security Features:
/// - Refresh token rotation: new refresh token issued with each refresh
/// - Single-use refresh tokens prevent replay attacks
/// - Device information tracking for session security
/// - Automatic old token revocation for security
/// - Comprehensive audit logging for token operations
/// 
/// Refresh Token Characteristics:
/// - Long-lived tokens (typically 7-30 days) for user convenience
/// - Cryptographically secure opaque tokens stored in database
/// - Device-specific tokens enable multi-device session management
/// - Revocable tokens for immediate security response
/// - Automatic cleanup of expired tokens
/// 
/// Security Benefits:
/// - Reduces password authentication frequency
/// - Enables immediate token revocation for security incidents
/// - Device fingerprinting prevents cross-device token abuse
/// - Token rotation limits exposure window for compromised tokens
/// - Audit trail for all token operations and security events
/// 
/// Usage Scenarios:
/// - Automatic access token refresh in client applications
/// - Session extension without user interaction
/// - Cross-device authentication and session management
/// - API client authentication with long-term access
/// - Mobile application background token refresh
/// 
/// Error Conditions:
/// - Invalid or expired refresh tokens result in authentication failure
/// - Revoked tokens require complete re-authentication
/// - User account lockout prevents token refresh
/// - Device mismatch may trigger security alerts
/// - Rate limiting prevents token refresh abuse
/// 
/// Response Format:
/// - Returns complete LoginResponse with new tokens and user information
/// - Includes new access token with updated expiration
/// - Provides new refresh token for next refresh cycle
/// - Contains current user information and permissions
/// - Indicates if password change is required
/// 
/// Device Tracking:
/// - DeviceInfo parameter enables device fingerprinting
/// - Tracks user sessions across multiple devices
/// - Enables selective session termination for security
/// - Supports suspicious device detection and alerting
/// - Facilitates user session management and monitoring
/// 
/// Integration Points:
/// - Called by authentication interceptors when access tokens expire
/// - Used by client applications for seamless session continuation
/// - Integrated with session management and device tracking systems
/// - Part of comprehensive authentication and authorization framework
/// </remarks>
public record RefreshTokenCommand(string RefreshToken, string? DeviceInfo = null) : IRequest<Result<LoginResponse>>;