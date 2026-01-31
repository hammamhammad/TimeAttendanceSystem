using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Notifications.Commands.RegisterPushToken;
using TimeAttendanceSystem.Application.Notifications.Commands.UnregisterPushToken;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for managing push notification tokens (FCM).
/// Used by the Flutter ESS app to register/unregister for push notifications.
/// </summary>
[ApiController]
[Route("api/v1/push-tokens")]
[Authorize]
public class PushTokensController : ControllerBase
{
    private readonly IMediator _mediator;

    public PushTokensController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Register or update a push notification token for the current device.
    /// Should be called on app startup and when FCM token is refreshed.
    /// </summary>
    [HttpPost("register")]
    public async Task<IActionResult> RegisterToken([FromBody] RegisterTokenRequest request)
    {
        var command = new RegisterPushTokenCommand(
            request.DeviceToken,
            request.DeviceId,
            request.Platform,
            request.DeviceModel,
            request.AppVersion
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "Push notification token registered successfully" });
    }

    /// <summary>
    /// Unregister the push notification token for the current device.
    /// Should be called on logout.
    /// </summary>
    [HttpPost("unregister")]
    public async Task<IActionResult> UnregisterToken([FromBody] UnregisterTokenRequest request)
    {
        var command = new UnregisterPushTokenCommand(request.DeviceId);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "Push notification token unregistered successfully" });
    }
}

public record RegisterTokenRequest(
    string DeviceToken,
    string DeviceId,
    string Platform,
    string? DeviceModel,
    string? AppVersion
);

public record UnregisterTokenRequest(string DeviceId);
