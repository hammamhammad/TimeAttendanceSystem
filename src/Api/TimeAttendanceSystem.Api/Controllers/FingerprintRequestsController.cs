using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Features.Portal.FingerprintRequests.Commands;
using TimeAttendanceSystem.Application.Features.Portal.FingerprintRequests.Queries;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.FingerprintRequests;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Request model for creating a fingerprint request.
/// </summary>
public class CreateFingerprintRequestRequest
{
    public FingerprintRequestType RequestType { get; set; }
    public string IssueDescription { get; set; } = string.Empty;
    public string? AffectedFingers { get; set; }
    public DateTime? PreferredDate { get; set; }
    public TimeSpan? PreferredTime { get; set; }
}

/// <summary>
/// Request model for updating a fingerprint request.
/// </summary>
public class UpdateFingerprintRequestRequest
{
    public FingerprintRequestType RequestType { get; set; }
    public string IssueDescription { get; set; } = string.Empty;
    public string? AffectedFingers { get; set; }
    public DateTime? PreferredDate { get; set; }
    public TimeSpan? PreferredTime { get; set; }
}

/// <summary>
/// Request model for completing a fingerprint request (admin only).
/// </summary>
public class CompleteFingerprintRequestRequest
{
    public string? TechnicianNotes { get; set; }
}

/// <summary>
/// API controller for managing fingerprint enrollment and update requests.
/// Provides CRUD operations for fingerprint requests with proper authorization.
/// </summary>
[ApiController]
[Route("api/v1/fingerprint-requests")]
[Authorize]
public class FingerprintRequestsController : ControllerBase
{
    private readonly IMediator _mediator;

    public FingerprintRequestsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves fingerprint requests with filtering and pagination.
    /// Non-admin users only see their own requests.
    /// </summary>
    /// <param name="employeeId">Filter by specific employee (admin only)</param>
    /// <param name="status">Filter by request status</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of fingerprint request DTOs</returns>
    [HttpGet]
    [ProducesResponseType(typeof(Result<PagedResult<FingerprintRequestDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetFingerprintRequests(
        [FromQuery] long? employeeId = null,
        [FromQuery] FingerprintRequestStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetFingerprintRequestsQuery
        {
            EmployeeId = employeeId,
            Status = status?.ToString(),
            Page = pageNumber,
            PageSize = pageSize
        };

        var result = await _mediator.Send(query);

        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result);
    }

    /// <summary>
    /// Retrieves a specific fingerprint request by ID.
    /// Non-admin users can only view their own requests.
    /// </summary>
    /// <param name="id">Fingerprint request ID</param>
    /// <returns>Fingerprint request details</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Result<FingerprintRequestDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetFingerprintRequestById(long id)
    {
        var query = new GetFingerprintRequestByIdQuery { Id = id };
        var result = await _mediator.Send(query);

        if (!result.IsSuccess)
            return NotFound(result);

        return Ok(result);
    }

    /// <summary>
    /// Creates a new fingerprint request for the current user's employee profile.
    /// Validates that employee doesn't have an active request already.
    /// </summary>
    /// <param name="request">Fingerprint request details</param>
    /// <returns>Created fingerprint request ID</returns>
    [HttpPost]
    [ProducesResponseType(typeof(Result<long>), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> CreateFingerprintRequest([FromBody] CreateFingerprintRequestRequest request)
    {
        var command = new CreateFingerprintRequestCommand
        {
            RequestType = request.RequestType.ToString(),
            IssueDescription = request.IssueDescription,
            AffectedFingers = request.AffectedFingers,
            PreferredDate = request.PreferredDate,
            PreferredTime = request.PreferredTime
        };

        var result = await _mediator.Send(command);

        if (!result.IsSuccess)
            return BadRequest(result);

        return CreatedAtAction(
            nameof(GetFingerprintRequestById),
            new { id = result.Value },
            result);
    }

    /// <summary>
    /// Updates an existing fingerprint request.
    /// Only the request owner can update, and only if status is Pending.
    /// </summary>
    /// <param name="id">Fingerprint request ID</param>
    /// <param name="request">Updated request details</param>
    /// <returns>Success result</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateFingerprintRequest(
        long id,
        [FromBody] UpdateFingerprintRequestRequest request)
    {
        var command = new UpdateFingerprintRequestCommand
        {
            Id = id,
            RequestType = request.RequestType.ToString(),
            IssueDescription = request.IssueDescription,
            AffectedFingers = request.AffectedFingers,
            PreferredDate = request.PreferredDate,
            PreferredTime = request.PreferredTime
        };

        var result = await _mediator.Send(command);

        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result);
    }

    /// <summary>
    /// Marks a fingerprint request as completed (admin only).
    /// Records the technician and completion details.
    /// </summary>
    /// <param name="id">Fingerprint request ID</param>
    /// <param name="request">Completion details</param>
    /// <returns>Success result</returns>
    [HttpPost("{id}/complete")]
    [Authorize(Policy = "AdminAccess")]
    [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CompleteFingerprintRequest(
        long id,
        [FromBody] CompleteFingerprintRequestRequest request)
    {
        var command = new CompleteFingerprintRequestCommand
        {
            Id = id,
            TechnicianNotes = request.TechnicianNotes
        };

        var result = await _mediator.Send(command);

        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result);
    }
}
