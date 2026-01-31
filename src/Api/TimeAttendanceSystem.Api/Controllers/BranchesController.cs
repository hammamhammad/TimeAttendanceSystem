using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Branches.Queries.GetBranches;
using TimeAttendanceSystem.Application.Branches.Queries.GetBranchById;
using TimeAttendanceSystem.Application.Branches.Commands.CreateBranch;
using TimeAttendanceSystem.Application.Branches.Commands.UpdateBranch;
using TimeAttendanceSystem.Application.Branches.Commands.UpdateBranchCoordinates;
using TimeAttendanceSystem.Application.Branches.Commands.DeleteBranch;

namespace TimeAttendanceSystem.Api.Controllers;

[ApiController]
[Route("api/v1/branches")]
[Authorize]
public class BranchesController : ControllerBase
{
    private readonly IMediator _mediator;

    public BranchesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [Authorize(Policy = "BranchRead")]
    public async Task<IActionResult> GetBranches(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] bool? isActive = null)
    {
        var query = new GetBranchesQuery(page, pageSize, search, isActive);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "BranchRead")]
    public async Task<IActionResult> GetBranchById(long id)
    {
        var query = new GetBranchByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpPost]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> CreateBranch([FromBody] CreateBranchRequest request)
    {
        var command = new CreateBranchCommand(
            request.Code,
            request.Name,
            request.TimeZone,
            request.IsActive
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return CreatedAtAction(nameof(GetBranches), new { id = result.Value }, new { id = result.Value });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> UpdateBranch(long id, [FromBody] UpdateBranchRequest request)
    {
        var command = new UpdateBranchCommand(
            id,
            request.Code,
            request.Name,
            request.TimeZone,
            request.IsActive
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> DeleteBranch(long id)
    {
        var command = new DeleteBranchCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpGet("dropdown")]
    [Authorize(Policy = "BranchRead")]
    public async Task<IActionResult> GetBranchesDropdown()
    {
        var query = new GetBranchesQuery(1, 1000, null, true); // Get all active branches
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        var dropdown = result.Value.Items.Select(b => new { id = b.Id, name = b.Name }).ToList();
        return Ok(dropdown);
    }

    /// <summary>
    /// Updates the GPS coordinates and geofence radius for a branch.
    /// Used for configuring mobile check-in location validation.
    /// </summary>
    [HttpPut("{id}/coordinates")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> UpdateBranchCoordinates(long id, [FromBody] UpdateBranchCoordinatesRequest request)
    {
        var command = new UpdateBranchCoordinatesCommand(
            id,
            request.Latitude,
            request.Longitude,
            request.GeofenceRadiusMeters
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }
}

public record CreateBranchRequest(
    string Code,
    string Name,
    string TimeZone,
    bool IsActive = true
);

public record UpdateBranchRequest(
    string Code,
    string Name,
    string TimeZone,
    bool IsActive
);

public record UpdateBranchCoordinatesRequest(
    double? Latitude,
    double? Longitude,
    int GeofenceRadiusMeters = 100
);