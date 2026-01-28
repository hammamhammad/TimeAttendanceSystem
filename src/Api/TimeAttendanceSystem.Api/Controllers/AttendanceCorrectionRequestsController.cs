using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.AttendanceCorrections.Commands.CreateAttendanceCorrectionRequest;
using TimeAttendanceSystem.Application.AttendanceCorrections.Commands.ApproveAttendanceCorrectionRequest;
using TimeAttendanceSystem.Application.AttendanceCorrections.Commands.UpdateAttendanceCorrectionRequest;
using TimeAttendanceSystem.Application.AttendanceCorrections.Commands.DeleteAttendanceCorrectionRequest;
using TimeAttendanceSystem.Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequests;
using TimeAttendanceSystem.Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequestById;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Request model for creating an attendance correction request.
/// </summary>
public class CreateAttendanceCorrectionRequestDto
{
    public long EmployeeId { get; set; }
    public DateTime CorrectionDate { get; set; }
    public string CorrectionTime { get; set; } = string.Empty;
    public AttendanceCorrectionType CorrectionType { get; set; }
    public string Reason { get; set; } = string.Empty;
}

/// <summary>
/// Request model for updating an attendance correction request.
/// </summary>
public class UpdateAttendanceCorrectionRequestDto
{
    public DateTime CorrectionDate { get; set; }
    public string CorrectionTime { get; set; } = string.Empty;
    public AttendanceCorrectionType CorrectionType { get; set; }
    public string Reason { get; set; } = string.Empty;
}

/// <summary>
/// Request model for approving or rejecting an attendance correction request.
/// </summary>
public class ApproveAttendanceCorrectionRequestDto
{
    public long ApproverId { get; set; }
    public ApprovalStatus Decision { get; set; }
    public string? RejectionReason { get; set; }
    public string? ProcessingNotes { get; set; }
}

/// <summary>
/// API controller for managing attendance correction requests.
/// Provides endpoints for employees to request corrections for missed clock-in/clock-out.
/// </summary>
[ApiController]
[Route("api/v1/attendance-corrections")]
[Authorize]
public class AttendanceCorrectionRequestsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AttendanceCorrectionRequestsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves attendance correction requests with filtering and pagination.
    /// </summary>
    /// <param name="employeeId">Filter by specific employee</param>
    /// <param name="startDate">Filter requests from this date</param>
    /// <param name="endDate">Filter requests until this date</param>
    /// <param name="correctionType">Filter by correction type (CheckIn/CheckOut)</param>
    /// <param name="approvalStatus">Filter by approval status</param>
    /// <param name="branchId">Filter by specific branch</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of attendance correction request DTOs</returns>
    [HttpGet]
    [Authorize(Policy = "AttendanceRead")]
    [ProducesResponseType(typeof(Result<PagedResult<AttendanceCorrectionRequestDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetAttendanceCorrectionRequests(
        [FromQuery] long? employeeId = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] AttendanceCorrectionType? correctionType = null,
        [FromQuery] ApprovalStatus? approvalStatus = null,
        [FromQuery] long? branchId = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetAttendanceCorrectionRequestsQuery(
            employeeId,
            startDate,
            endDate,
            correctionType,
            approvalStatus,
            branchId,
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
    /// Gets my attendance correction requests (for current employee).
    /// Used by the self-service portal.
    /// </summary>
    /// <param name="employeeId">The current employee's ID</param>
    /// <param name="startDate">Filter requests from this date</param>
    /// <param name="endDate">Filter requests until this date</param>
    /// <param name="approvalStatus">Filter by approval status</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of the employee's correction requests</returns>
    [HttpGet("my-requests")]
    [ProducesResponseType(typeof(Result<PagedResult<AttendanceCorrectionRequestDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMyAttendanceCorrectionRequests(
        [FromQuery] long employeeId,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] ApprovalStatus? approvalStatus = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetAttendanceCorrectionRequestsQuery(
            employeeId,
            startDate,
            endDate,
            null, // No correction type filter
            approvalStatus,
            null, // No branch filter (current employee only)
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
    /// Gets a specific attendance correction request by ID.
    /// </summary>
    /// <param name="id">Correction request ID</param>
    /// <returns>Correction request details</returns>
    [HttpGet("{id}")]
    [Authorize(Policy = "AttendanceRead")]
    [ProducesResponseType(typeof(Result<AttendanceCorrectionRequestDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAttendanceCorrectionRequestById(long id)
    {
        var query = new GetAttendanceCorrectionRequestByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsSuccess)
        {
            if (result.Value == null)
            {
                return NotFound(Result<AttendanceCorrectionRequestDto?>.Failure("Correction request not found"));
            }
            return Ok(result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Creates a new attendance correction request.
    /// </summary>
    /// <param name="request">Correction request details</param>
    /// <returns>Created correction request ID</returns>
    [HttpPost]
    [Authorize(Policy = "AttendanceCreate")]
    [ProducesResponseType(typeof(Result<long>), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> CreateAttendanceCorrectionRequest(
        [FromBody] CreateAttendanceCorrectionRequestDto request)
    {
        // Parse time string to TimeOnly
        if (!TimeOnly.TryParse(request.CorrectionTime, out var correctionTime))
        {
            return BadRequest(Result<long>.Failure("Invalid correction time format. Use HH:mm format."));
        }

        // TODO: File upload functionality will be implemented later
        string? attachmentPath = null;

        var command = new CreateAttendanceCorrectionRequestCommand(
            request.EmployeeId,
            request.CorrectionDate,
            correctionTime,
            request.CorrectionType,
            request.Reason,
            attachmentPath
        );

        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return CreatedAtAction(
                nameof(GetAttendanceCorrectionRequestById),
                new { id = result.Value },
                result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Updates an existing attendance correction request.
    /// Only pending requests can be updated.
    /// </summary>
    /// <param name="id">Correction request ID</param>
    /// <param name="request">Update request details</param>
    /// <returns>Success result</returns>
    [HttpPut("{id}")]
    [Authorize(Policy = "AttendanceUpdate")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateAttendanceCorrectionRequest(
        long id,
        [FromBody] UpdateAttendanceCorrectionRequestDto request)
    {
        // Parse time string to TimeOnly
        if (!TimeOnly.TryParse(request.CorrectionTime, out var correctionTime))
        {
            return BadRequest(Result<bool>.Failure("Invalid correction time format. Use HH:mm format."));
        }

        // TODO: File upload functionality will be implemented later
        string? attachmentPath = null;

        var command = new UpdateAttendanceCorrectionRequestCommand(
            id,
            request.CorrectionDate,
            correctionTime,
            request.CorrectionType,
            request.Reason,
            attachmentPath
        );

        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Approves or rejects an attendance correction request.
    /// </summary>
    /// <param name="id">Correction request ID</param>
    /// <param name="request">Approval decision details</param>
    /// <returns>Success result</returns>
    [HttpPatch("{id}/approve")]
    [Authorize(Policy = "AttendanceApprove")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ApproveAttendanceCorrectionRequest(
        long id,
        [FromBody] ApproveAttendanceCorrectionRequestDto request)
    {
        var command = new ApproveAttendanceCorrectionRequestCommand(
            id,
            request.ApproverId,
            request.Decision,
            request.RejectionReason,
            request.ProcessingNotes
        );

        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Gets pending correction requests for approval.
    /// </summary>
    /// <param name="branchId">Filter by branch (optional)</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of pending correction requests</returns>
    [HttpGet("pending")]
    [Authorize(Policy = "AttendanceApprove")]
    [ProducesResponseType(typeof(Result<PagedResult<AttendanceCorrectionRequestDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetPendingCorrectionRequests(
        [FromQuery] long? branchId = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetAttendanceCorrectionRequestsQuery(
            null, // No specific employee
            null, // No start date
            null, // No end date
            null, // No correction type filter
            ApprovalStatus.Pending, // Only pending
            branchId,
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
    /// Deletes (cancels) an attendance correction request.
    /// Only pending requests can be deleted.
    /// </summary>
    /// <param name="id">Correction request ID</param>
    /// <returns>Success result</returns>
    [HttpDelete("{id}")]
    [Authorize(Policy = "AttendanceDelete")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAttendanceCorrectionRequest(long id)
    {
        var command = new DeleteAttendanceCorrectionRequestCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result);
        }

        return BadRequest(result);
    }
}
