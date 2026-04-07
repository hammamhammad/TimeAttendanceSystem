using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Notifications.Commands.UnregisterPushToken;

/// <summary>
/// Command to unregister/deactivate a push notification token.
/// Used when user logs out or disables notifications.
/// </summary>
public record UnregisterPushTokenCommand(string DeviceId) : IRequest<Result>;
