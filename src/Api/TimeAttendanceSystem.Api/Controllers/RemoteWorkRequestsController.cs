using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Features.RemoteWorkRequests.Commands.CreateRemoteWorkRequest;
using TecAxle.Hrms.Application.Features.RemoteWorkRequests.Commands.CancelRemoteWorkRequest;
using TecAxle.Hrms.Application.Features.RemoteWorkRequests.Commands.UpdateRemoteWorkRequest;
using TecAxle.Hrms.Application.Features.RemoteWorkRequests.Commands.ApproveRemoteWorkRequest;
using TecAxle.Hrms.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequests;
using TecAxle.Hrms.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequestById;
using TecAxle.Hrms.Domain.RemoteWork;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Api.Controllers;

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
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public RemoteWorkRequestsController(
        IMediator mediator,
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _mediator = mediator;
        _context = context;
        _currentUser = currentUser;
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

    /// <summary>
    /// Gets the remaining remote work days for the current user in the current month.
    /// Returns the policy limit, used days, and remaining days.
    /// </summary>
    /// <returns>Remaining days information for the current month</returns>
    /// <response code="200">Remaining days data retrieved successfully</response>
    /// <response code="401">Unauthorized - user not authenticated</response>
    /// <response code="404">Employee profile or remote work policy not found</response>
    [HttpGet("remaining-days")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRemainingDays()
    {
        if (_currentUser.UserId == null)
        {
            return Unauthorized(new { error = "User not authenticated" });
        }

        // Get current employee from user context through EmployeeUserLink
        var employeeLink = await _context.EmployeeUserLinks
            .Include(eul => eul.Employee)
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

        if (employeeLink?.Employee == null)
        {
            return NotFound(new { error = "Employee profile not found for current user" });
        }

        var employeeId = employeeLink.EmployeeId;
        var branchId = employeeLink.Employee.BranchId;

        // Find the active remote work policy for the employee's branch
        var policy = await _context.RemoteWorkPolicies
            .Where(p => p.IsActive && (p.BranchId == branchId || p.BranchId == null))
            .OrderByDescending(p => p.BranchId) // Prefer branch-specific over company-wide
            .FirstOrDefaultAsync();

        if (policy == null)
        {
            return NotFound(new { error = "No active remote work policy found for your branch" });
        }

        var maxDaysPerMonth = policy.MaxDaysPerMonth ?? 0;

        // Calculate the current month boundaries
        var now = DateTime.UtcNow;
        var monthStart = new DateOnly(now.Year, now.Month, 1);
        var monthEnd = monthStart.AddMonths(1).AddDays(-1);

        // Count approved remote work request days in the current month
        var usedDaysThisMonth = await _context.RemoteWorkRequests
            .Where(r => r.EmployeeId == employeeId
                && r.Status == RemoteWorkRequestStatus.Approved
                && !r.IsDeleted
                && r.StartDate <= monthEnd
                && r.EndDate >= monthStart)
            .SumAsync(r => r.WorkingDaysCount);

        var remainingDays = Math.Max(0, maxDaysPerMonth - usedDaysThisMonth);

        return Ok(new
        {
            remainingDays,
            maxDaysPerMonth,
            usedDaysThisMonth
        });
    }
}