using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Commands.CreateRemoteWorkRequest;
using TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Commands.CancelRemoteWorkRequest;
using TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Commands.UpdateRemoteWorkRequest;
using TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Commands.ApproveRemoteWorkRequest;
using TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequests;
using TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequestById;
using TimeAttendanceSystem.Domain.RemoteWork;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for managing remote work requests.
/// Provides comprehensive remote work request management functionality with proper authorization.
/// </summary>
[ApiController]
[Route("api/v1/remote-work-requests")]
[Authorize]
public class RemoteWorkRequestsController : ControllerBase
{
    private readonly IMediator _mediator;

    public RemoteWorkRequestsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Gets all remote work requests with optional filtering.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId,
        [FromQuery] RemoteWorkRequestStatus? status,
        [FromQuery] DateOnly? startDate,
        [FromQuery] DateOnly? endDate)
    {
        var query = new GetRemoteWorkRequestsQuery
        {
            EmployeeId = employeeId,
            Status = status,
            StartDate = startDate,
            EndDate = endDate
        };

        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Gets a remote work request by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var query = new GetRemoteWorkRequestByIdQuery { Id = id };
        var result = await _mediator.Send(query);

        if (!result.IsSuccess)
            return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Creates a remote work request for an employee.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateRemoteWorkRequestCommand command)
    {
        var result = await _mediator.Send(command);
        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }

    /// <summary>
    /// Updates an existing remote work request.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateRemoteWorkRequestCommand command)
    {
        command.Id = id;
        var result = await _mediator.Send(command);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }

    /// <summary>
    /// Cancels a remote work request.
    /// </summary>
    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id)
    {
        var command = new CancelRemoteWorkRequestCommand { Id = id };
        var result = await _mediator.Send(command);

        if (!result.IsSuccess)
            return BadRequest(new { error = result.Error });

        return NoContent();
    }

    /// <summary>
    /// Approves or rejects a remote work request.
    /// </summary>
    /// <param name="id">Request ID</param>
    /// <param name="command">Approval decision details</param>
    /// <returns>Success result</returns>
    [HttpPatch("{id}/approve")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ApproveRemoteWorkRequest(long id, [FromBody] ApproveRemoteWorkRequestCommand command)
    {
        // Ensure the ID matches
        if (command.RequestId != id)
        {
            return BadRequest(new { error = "Route ID does not match command ID" });
        }

        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        // Check if it's a not found error
        if (result.Error?.Contains("not found", StringComparison.OrdinalIgnoreCase) == true)
        {
            return NotFound(result);
        }

        return BadRequest(result);
    }
}