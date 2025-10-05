using MediatR;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.CreateRemoteWorkPolicy;
using TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.UpdateRemoteWorkPolicy;
using TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.DeleteRemoteWorkPolicy;
using TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.ToggleRemoteWorkPolicyStatus;
using TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Queries.GetRemoteWorkPolicies;
using TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Queries.GetRemoteWorkPolicyById;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for managing remote work policies.
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
public class RemoteWorkPoliciesController : ControllerBase
{
    private readonly IMediator _mediator;

    public RemoteWorkPoliciesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Gets all remote work policies with optional filtering.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] long? branchId, [FromQuery] bool? isActive)
    {
        var query = new GetRemoteWorkPoliciesQuery
        {
            BranchId = branchId,
            IsActive = isActive
        };

        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Gets a remote work policy by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var query = new GetRemoteWorkPolicyByIdQuery { Id = id };
        var result = await _mediator.Send(query);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    /// <summary>
    /// Creates a new remote work policy.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateRemoteWorkPolicyCommand command)
    {
        var id = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }

    /// <summary>
    /// Updates an existing remote work policy.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateRemoteWorkPolicyCommand command)
    {
        if (id != command.Id)
            return BadRequest("ID mismatch");

        await _mediator.Send(command);
        return NoContent();
    }

    /// <summary>
    /// Deletes a remote work policy (soft delete).
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var command = new DeleteRemoteWorkPolicyCommand { Id = id };
        await _mediator.Send(command);
        return NoContent();
    }

    /// <summary>
    /// Toggles the active status of a remote work policy.
    /// </summary>
    [HttpPost("{id}/toggle-status")]
    public async Task<IActionResult> ToggleStatus(long id)
    {
        var command = new ToggleRemoteWorkPolicyStatusCommand { Id = id };
        await _mediator.Send(command);
        return NoContent();
    }
}