using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Notifications.Commands.RegisterPushToken;

/// <summary>
/// Command to register or update a push notification token for a device.
/// </summary>
public record RegisterPushTokenCommand(
    string DeviceToken,
    string DeviceId,
    string Platform,
    string? DeviceModel,
    string? AppVersion
) : IRequest<Result>;
