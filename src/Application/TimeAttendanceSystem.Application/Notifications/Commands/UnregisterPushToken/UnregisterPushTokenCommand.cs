using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Notifications.Commands.UnregisterPushToken;

/// <summary>
/// Command to unregister/deactivate a push notification token.
/// Used when user logs out or disables notifications.
/// </summary>
public record UnregisterPushTokenCommand(string DeviceId) : IRequest<Result>;
