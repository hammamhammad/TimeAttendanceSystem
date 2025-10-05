using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Excuses.Commands.CreateExcusePolicy;
using TimeAttendanceSystem.Application.Excuses.Commands.UpdateExcusePolicy;
using TimeAttendanceSystem.Application.Excuses.Commands.ToggleExcusePolicyStatus;
using TimeAttendanceSystem.Application.Excuses.Commands.DeleteExcusePolicy;
using TimeAttendanceSystem.Application.Excuses.Queries.GetExcusePolicies;
using TimeAttendanceSystem.Application.Excuses.Queries.GetExcusePolicyById;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for managing excuse policies.
/// Provides comprehensive excuse policy management functionality with proper authorization.
/// </summary>
[ApiController]
[Route("api/v1/excuse-policies")]
[Authorize]
public class ExcusePoliciesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ExcusePoliciesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves excuse policies with filtering and pagination.
    /// </summary>
    /// <param name="branchId">Filter by specific branch (null for organization-wide)</param>
    /// <param name="isActive">Filter by active status</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of excuse policy DTOs</returns>
    [HttpGet]
    [Authorize(Policy = "SettingsExcusePolicyRead")]
    [ProducesResponseType(typeof(Result<PagedResult<ExcusePolicyDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetExcusePolicies(
        [FromQuery] long? branchId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetExcusePoliciesQuery(
            branchId,
            isActive,
            pageNumber,
            pageSize
        );

        var result = await _mediator.Send(query);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Retrieves a single excuse policy by ID.
    /// </summary>
    /// <param name="id">Excuse policy ID</param>
    /// <returns>Excuse policy details</returns>
    [HttpGet("{id}")]
    [Authorize(Policy = "SettingsExcusePolicyRead")]
    [ProducesResponseType(typeof(Result<ExcusePolicyDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetExcusePolicyById(long id)
    {
        var query = new GetExcusePolicyByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        // Check if it's a not found error
        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Creates a new excuse policy.
    /// </summary>
    /// <param name="command">Excuse policy creation details</param>
    /// <returns>Created excuse policy ID</returns>
    [HttpPost]
    [Authorize(Policy = "SettingsExcusePolicyCreate")]
    [ProducesResponseType(typeof(Result<long>), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> CreateExcusePolicy([FromBody] CreateExcusePolicyCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return CreatedAtAction(
                nameof(GetExcusePolicies),
                new { },
                result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Updates an existing excuse policy.
    /// </summary>
    /// <param name="id">Excuse policy ID</param>
    /// <param name="command">Updated excuse policy details</param>
    /// <returns>Success result</returns>
    [HttpPut("{id}")]
    [Authorize(Policy = "SettingsExcusePolicyUpdate")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateExcusePolicy(long id, [FromBody] UpdateExcusePolicyCommand command)
    {
        // Ensure the ID matches
        if (command.Id != id)
        {
            return BadRequest("Route ID does not match command ID");
        }

        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        // Check if it's a not found error
        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Toggles the active status of an excuse policy.
    /// </summary>
    /// <param name="id">Excuse policy ID</param>
    /// <returns>Success result</returns>
    [HttpPatch("{id}/toggle-status")]
    [Authorize(Policy = "SettingsExcusePolicyUpdate")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ToggleExcusePolicyStatus(long id)
    {
        var command = new ToggleExcusePolicyStatusCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        // Check if it's a not found error
        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Deletes an excuse policy (soft delete).
    /// </summary>
    /// <param name="id">Excuse policy ID</param>
    /// <returns>Success result</returns>
    [HttpDelete("{id}")]
    [Authorize(Policy = "SettingsExcusePolicyDelete")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteExcusePolicy(long id)
    {
        var command = new DeleteExcusePolicyCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        // Check if it's a not found error
        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result);
        }

        return BadRequest(result);
    }
}