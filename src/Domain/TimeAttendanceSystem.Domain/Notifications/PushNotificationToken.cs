using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Domain.Notifications;

/// <summary>
/// Domain entity representing a registered device token for push notifications.
/// Stores Firebase Cloud Messaging (FCM) tokens for each user's device to enable
/// push notification delivery when the app is in the background or closed.
/// </summary>
/// <remarks>
/// Push Notification Features:
/// - Multi-device support (users can have multiple registered devices)
/// - Platform-specific token storage (Android/iOS)
/// - Token lifecycle management with registration and last-used tracking
/// - Automatic cleanup of stale/invalid tokens
/// 
/// Token Management:
/// - Tokens are registered on app login/startup
/// - Tokens are refreshed automatically by FCM
/// - Tokens are removed on logout or app uninstall
/// - Invalid tokens are detected and deactivated during send attempts
/// </remarks>
public class PushNotificationToken : BaseEntity
{
    /// <summary>
    /// Gets or sets the ID of the user this device token belongs to.
    /// </summary>
    public long UserId { get; set; }

    /// <summary>
    /// Gets or sets the Firebase Cloud Messaging device token.
    /// This token is used to target push notifications to specific devices.
    /// </summary>
    public string DeviceToken { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the unique identifier for the device.
    /// Used to prevent duplicate token registrations from the same device.
    /// </summary>
    public string DeviceId { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the platform/OS of the device.
    /// </summary>
    /// <value>"android" or "ios"</value>
    public string Platform { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the device model/name for administrative purposes.
    /// </summary>
    public string? DeviceModel { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when this token was registered.
    /// </summary>
    public DateTime RegisteredAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when this token was last used to send a notification.
    /// Used to identify and clean up stale tokens.
    /// </summary>
    public DateTime? LastUsedAt { get; set; }

    /// <summary>
    /// Gets or sets the app version when the token was registered.
    /// Helps track which app versions are in use.
    /// </summary>
    public string? AppVersion { get; set; }

    /// <summary>
    /// Gets or sets whether this token is active and should receive notifications.
    /// Tokens are deactivated when they become invalid or user logs out.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Navigation property to the user who owns this device.
    /// </summary>
    public virtual User User { get; set; } = null!;
}
