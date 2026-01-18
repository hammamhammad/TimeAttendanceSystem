using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TimeAttendanceSystem.Application.Excuses.Commands.CreateEmployeeExcuse;
using TimeAttendanceSystem.Application.Excuses.Commands.ApproveEmployeeExcuse;
using TimeAttendanceSystem.Application.Excuses.Commands.UpdateEmployeeExcuse;
using TimeAttendanceSystem.Application.Excuses.Commands.DeleteEmployeeExcuse;
using TimeAttendanceSystem.Application.Excuses.Commands.ValidateExcuse;
using TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuses;
using TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuseById;
using TimeAttendanceSystem.Application.Excuses.Queries.GetExcuseStatistics;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Request model for creating an employee excuse.
/// </summary>
public class CreateEmployeeExcuseRequest
{
    public long EmployeeId { get; set; }
    public DateTime ExcuseDate { get; set; }
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public Domain.Excuses.ExcuseType ExcuseType { get; set; } = Domain.Excuses.ExcuseType.PersonalExcuse;
}

/// <summary>
/// Request model for updating an employee excuse.
/// </summary>
public class UpdateEmployeeExcuseRequest
{
    public DateTime ExcuseDate { get; set; }
    public ExcuseType ExcuseType { get; set; }
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public ApprovalStatus ApprovalStatus { get; set; }
    public string? ReviewerComments { get; set; }
}

/// <summary>
/// API controller for managing employee excuse requests.
/// Provides comprehensive excuse management functionality with proper authorization.
/// </summary>
[ApiController]
[Route("api/v1/employee-excuses")]
[Authorize]
public class EmployeeExcusesController : ControllerBase
{
    private readonly IMediator _mediator;

    public EmployeeExcusesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves employee excuse requests with filtering and pagination.
    /// </summary>
    /// <param name="employeeId">Filter by specific employee</param>
    /// <param name="startDate">Filter excuses starting from this date</param>
    /// <param name="endDate">Filter excuses ending before this date</param>
    /// <param name="excuseType">Filter by excuse type (Personal/Official)</param>
    /// <param name="approvalStatus">Filter by approval status</param>
    /// <param name="branchId">Filter by specific branch</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of employee excuse DTOs</returns>
    [HttpGet]
    [Authorize(Policy = "ExcuseRead")]
    [ProducesResponseType(typeof(Result<PagedResult<EmployeeExcuseDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetEmployeeExcuses(
        [FromQuery] long? employeeId = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] ExcuseType? excuseType = null,
        [FromQuery] ApprovalStatus? approvalStatus = null,
        [FromQuery] long? branchId = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetEmployeeExcusesQuery(
            employeeId,
            startDate,
            endDate,
            excuseType,
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
    /// Creates a new employee excuse request.
    /// </summary>
    /// <param name="employeeId">Employee identifier</param>
    /// <param name="excuseDate">Date of the excuse</param>
    /// <param name="startTime">Start time of the excuse</param>
    /// <param name="endTime">End time of the excuse</param>
    /// <param name="reason">Reason for the excuse</param>
    /// <param name="excuseType">Type of excuse (Personal/Official), defaults to Personal</param>
    /// <param name="attachmentFile">Optional attachment file</param>
    /// <returns>Created excuse ID</returns>
    [HttpPost]
    [Authorize(Policy = "ExcuseCreate")]
    [ProducesResponseType(typeof(Result<long>), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> CreateEmployeeExcuse(
        [FromBody] CreateEmployeeExcuseRequest request)
    {
        // Parse time strings to TimeOnly
        if (!TimeOnly.TryParse(request.StartTime, out var startTime))
        {
            return BadRequest(Result<long>.Failure("Invalid start time format. Use HH:mm format."));
        }
        if (!TimeOnly.TryParse(request.EndTime, out var endTime))
        {
            return BadRequest(Result<long>.Failure("Invalid end time format. Use HH:mm format."));
        }

        // TODO: File upload functionality will be implemented later
        string? attachmentPath = null;

        var command = new CreateEmployeeExcuseCommand(
            request.EmployeeId,
            request.ExcuseDate,
            request.ExcuseType,
            startTime,
            endTime,
            request.Reason,
            attachmentPath
        );

        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return CreatedAtAction(
                nameof(GetEmployeeExcuseById),
                new { id = result.Value },
                result.Value);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Approves or rejects an employee excuse request.
    /// </summary>
    /// <param name="id">Excuse ID</param>
    /// <param name="command">Approval decision details</param>
    /// <returns>Success result</returns>
    [HttpPatch("{id}/approve")]
    [Authorize(Policy = "ExcuseApprove")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ApproveEmployeeExcuse(long id, [FromBody] ApproveEmployeeExcuseCommand command)
    {
        // Ensure the ID matches
        if (command.ExcuseId != id)
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
    /// Gets excuse statistics for an employee within a specific period.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="year">Year for statistics</param>
    /// <param name="month">Month for statistics (optional)</param>
    /// <returns>Excuse usage statistics</returns>
    [HttpGet("statistics")]
    [Authorize(Policy = "ExcuseRead")]
    [ProducesResponseType(typeof(Result<ExcuseStatisticsDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetExcuseStatistics(
        [FromQuery] long employeeId,
        [FromQuery] int year,
        [FromQuery] int? month = null)
    {
        var command = new GetExcuseStatisticsQuery(employeeId, year, month);
        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(result);
        }

        return BadRequest(result);
    }

    /// <summary>
    /// Validates if an excuse can be created for the specified parameters.
    /// </summary>
    /// <param name="request">Validation request parameters</param>
    /// <returns>Validation result</returns>
    [HttpPost("validate")]
    [Authorize(Policy = "ExcuseCreate")]
    [ProducesResponseType(typeof(Result<ExcuseValidationDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> ValidateExcuse([FromBody] JsonElement request)
    {
        try
        {
            // Extract values from the JsonElement
            long employeeId = request.GetProperty("EmployeeId").GetInt64();
            DateTime excuseDate = DateTime.Parse(request.GetProperty("ExcuseDate").GetString()!);
            string excuseTypeStr = request.GetProperty("ExcuseType").GetString()!;
            string startTime = request.GetProperty("StartTime").GetString()!;
            string endTime = request.GetProperty("EndTime").GetString()!;

            // Parse excuse type
            ExcuseType excuseType = excuseTypeStr == "PersonalExcuse" ? ExcuseType.PersonalExcuse : ExcuseType.OfficialDuty;

            var command = new ValidateExcuseCommand(
                employeeId,
                excuseDate,
                excuseType,
                startTime,
                endTime
            );

            var result = await _mediator.Send(command);

            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = $"Invalid request format: {ex.Message}" });
        }
    }

    /// <summary>
    /// Gets pending excuse requests for approval.
    /// </summary>
    /// <param name="branchId">Filter by branch (optional)</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of pending excuses</returns>
    [HttpGet("pending")]
    [Authorize(Policy = "ExcuseApprove")]
    [ProducesResponseType(typeof(Result<PagedResult<EmployeeExcuseDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetPendingExcuses(
        [FromQuery] long? branchId = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetEmployeeExcusesQuery(
            null, // No specific employee
            null, // No start date
            null, // No end date
            null, // No excuse type filter
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
    /// Gets a specific employee excuse by ID.
    /// </summary>
    /// <param name="id">Excuse ID</param>
    /// <returns>Employee excuse details</returns>
    [HttpGet("{id}")]
    [Authorize(Policy = "ExcuseRead")]
    [ProducesResponseType(typeof(Result<EmployeeExcuseDetailDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetEmployeeExcuseById(long id)
    {
        var query = new GetEmployeeExcuseByIdQuery(id);
        var result = await _mediator.Send(query);

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
    /// Updates an existing employee excuse.
    /// HR can update all fields except employee assignment.
    /// </summary>
    /// <param name="id">Excuse ID</param>
    /// <param name="request">Update request details</param>
    /// <returns>Success result</returns>
    [HttpPut("{id}")]
    [Authorize(Policy = "ExcuseUpdate")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateEmployeeExcuse(
        long id,
        [FromBody] UpdateEmployeeExcuseRequest request)
    {
        // Parse time strings to TimeOnly
        if (!TimeOnly.TryParse(request.StartTime, out var startTime))
        {
            return BadRequest(Result<bool>.Failure("Invalid start time format. Use HH:mm format."));
        }
        if (!TimeOnly.TryParse(request.EndTime, out var endTime))
        {
            return BadRequest(Result<bool>.Failure("Invalid end time format. Use HH:mm format."));
        }

        // TODO: File upload functionality will be implemented later
        string? attachmentPath = null;

        var command = new UpdateEmployeeExcuseCommand(
            id,
            request.ExcuseDate,
            request.ExcuseType,
            startTime,
            endTime,
            request.Reason,
            request.ApprovalStatus,
            request.ReviewerComments,
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
    /// Deletes an employee excuse.
    /// </summary>
    /// <param name="id">Excuse ID</param>
    /// <returns>Success result</returns>
    [HttpDelete("{id}")]
    [Authorize(Policy = "ExcuseDelete")]
    [ProducesResponseType(typeof(Result<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteEmployeeExcuse(long id)
    {
        var command = new DeleteEmployeeExcuseCommand(id);
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

/// <summary>
/// Request DTO for validating excuse parameters
/// </summary>
public class ValidateExcuseRequest
{
    public long EmployeeId { get; set; }
    public DateTime ExcuseDate { get; set; }
    public ExcuseType ExcuseType { get; set; }
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
}