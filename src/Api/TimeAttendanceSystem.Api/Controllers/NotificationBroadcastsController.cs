using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Notifications.Commands.CreateBroadcast;
using TimeAttendanceSystem.Application.Notifications.Queries.GetBroadcasts;
using TimeAttendanceSystem.Domain.Notifications;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for managing notification broadcasts.
/// Allows administrators to send targeted notifications to employees.
/// </summary>
[ApiController]
[Route("api/v1/notification-broadcasts")]
[Authorize]
public class NotificationBroadcastsController : ControllerBase
{
    private readonly IMediator _mediator;

    public NotificationBroadcastsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get a paginated list of notification broadcasts.
    /// </summary>
    [HttpGet]
    [Authorize(Policy = "NotificationManagement")]
    public async Task<IActionResult> GetBroadcasts(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetBroadcastsQuery(page, pageSize);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Create and send a new notification broadcast.
    /// </summary>
    [HttpPost]
    [Authorize(Policy = "NotificationManagement")]
    public async Task<IActionResult> CreateBroadcast([FromBody] CreateBroadcastRequest request)
    {
        var command = new CreateBroadcastCommand(
            request.Title,
            request.TitleAr,
            request.Message,
            request.MessageAr,
            request.TargetType,
            request.TargetIds,
            request.Channel,
            request.ActionUrl
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new 
        { 
            broadcastId = result.Value.BroadcastId,
            totalRecipients = result.Value.TotalRecipients,
            message = result.Value.Message
        });
    }

    /// <summary>
    /// Send a quick notification to all employees.
    /// </summary>
    [HttpPost("send-to-all")]
    [Authorize(Policy = "NotificationManagement")]
    public async Task<IActionResult> SendToAll([FromBody] QuickBroadcastRequest request)
    {
        var command = new CreateBroadcastCommand(
            request.Title,
            request.TitleAr,
            request.Message,
            request.MessageAr,
            BroadcastTargetType.All,
            null,
            request.Channel,
            request.ActionUrl
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new 
        { 
            broadcastId = result.Value.BroadcastId,
            totalRecipients = result.Value.TotalRecipients,
            message = result.Value.Message
        });
    }

    /// <summary>
    /// Send a notification to specific branches.
    /// </summary>
    [HttpPost("send-to-branches")]
    [Authorize(Policy = "NotificationManagement")]
    public async Task<IActionResult> SendToBranches([FromBody] BranchBroadcastRequest request)
    {
        var command = new CreateBroadcastCommand(
            request.Title,
            request.TitleAr,
            request.Message,
            request.MessageAr,
            BroadcastTargetType.Branch,
            request.BranchIds,
            request.Channel,
            request.ActionUrl
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new 
        { 
            broadcastId = result.Value.BroadcastId,
            totalRecipients = result.Value.TotalRecipients,
            message = result.Value.Message
        });
    }
}

public record CreateBroadcastRequest(
    string Title,
    string TitleAr,
    string Message,
    string MessageAr,
    BroadcastTargetType TargetType,
    List<long>? TargetIds,
    NotificationChannel Channel,
    string? ActionUrl
);

public record QuickBroadcastRequest(
    string Title,
    string TitleAr,
    string Message,
    string MessageAr,
    NotificationChannel Channel,
    string? ActionUrl
);

public record BranchBroadcastRequest(
    string Title,
    string TitleAr,
    string Message,
    string MessageAr,
    List<long> BranchIds,
    NotificationChannel Channel,
    string? ActionUrl
);
