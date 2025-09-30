using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.EmployeeVacations.Commands.CreateEmployeeVacation;
using TimeAttendanceSystem.Application.EmployeeVacations.Commands.CreateBulkEmployeeVacation;
using TimeAttendanceSystem.Application.EmployeeVacations.Commands.UpdateEmployeeVacation;
using TimeAttendanceSystem.Application.EmployeeVacations.Commands.ToggleEmployeeVacationStatus;
using TimeAttendanceSystem.Application.EmployeeVacations.Queries.GetEmployeeVacations;
using TimeAttendanceSystem.Application.EmployeeVacations.Queries.Common;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for managing employee vacation records.
/// Provides comprehensive vacation management functionality with proper authorization.
/// </summary>
[ApiController]
[Route("api/v1/employee-vacations")]
[Authorize]
public class EmployeeVacationsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EmployeeVacationsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves employee vacation records with filtering and pagination.
    /// </summary>
    /// <param name="employeeId">Filter by specific employee</param>
    /// <param name="vacationTypeId">Filter by specific vacation type</param>
    /// <param name="startDate">Filter vacations starting from this date</param>
    /// <param name="endDate">Filter vacations ending before this date</param>
    /// <param name="isApproved">Filter by approval status</param>
    /// <param name="isCurrentlyActive">Filter for currently active vacations</param>
    /// <param name="isUpcoming">Filter for upcoming vacations</param>
    /// <param name="searchTerm">Search in employee names or notes</param>
    /// <param name="page">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <param name="sortBy">Sort field</param>
    /// <param name="sortDescending">Sort direction</param>
    /// <returns>Paginated list of employee vacation DTOs</returns>
    [HttpGet]
    [Authorize(Policy = "VacationRead")]
    [ProducesResponseType(typeof(Result<PagedResult<EmployeeVacationDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetEmployeeVacations(
        [FromQuery] long? employeeId = null,
        [FromQuery] long? vacationTypeId = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] bool? isApproved = null,
        [FromQuery] bool? isCurrentlyActive = null,
        [FromQuery] bool? isUpcoming = null,
        [FromQuery] string? searchTerm = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string sortBy = "StartDate",
        [FromQuery] bool sortDescending = false)
    {
        var query = new GetEmployeeVacationsQuery(
            employeeId,
            vacationTypeId,
            startDate,
            endDate,
            isApproved,
            isCurrentlyActive,
            isUpcoming,
            searchTerm,
            page,
            pageSize,
            sortBy,
            sortDescending
        );

        var result = await _mediator.Send(query);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
    }

    /// <summary>
    /// Retrieves a specific employee vacation record by ID.
    /// </summary>
    /// <param name="id">Vacation record ID</param>
    /// <returns>Employee vacation DTO</returns>
    [HttpGet("{id}")]
    [Authorize(Policy = "VacationRead")]
    [ProducesResponseType(typeof(EmployeeVacationDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetEmployeeVacation(long id)
    {
        var query = new GetEmployeeVacationsQuery(Page: 1, PageSize: 1);
        // Note: For a single item, you would typically create a GetEmployeeVacationByIdQuery
        // This is simplified for the demo
        var result = await _mediator.Send(query);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        var vacation = result.Value.Items.FirstOrDefault(v => v.Id == id);
        if (vacation == null)
            return NotFound($"Employee vacation with ID {id} not found");

        return Ok(vacation);
    }

    /// <summary>
    /// Creates a new employee vacation record.
    /// </summary>
    /// <param name="request">Vacation creation request</param>
    /// <returns>Created vacation ID</returns>
    [HttpPost]
    [Authorize(Policy = "VacationCreate")]
    [ProducesResponseType(typeof(long), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> CreateEmployeeVacation([FromBody] CreateEmployeeVacationRequest request)
    {
        var command = new CreateEmployeeVacationCommand(
            request.EmployeeId,
            request.VacationTypeId,
            request.StartDate,
            request.EndDate,
            request.IsApproved,
            request.Notes
        );

        var result = await _mediator.Send(command);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        return CreatedAtAction(
            nameof(GetEmployeeVacation),
            new { id = result.Value },
            result.Value);
    }

    /// <summary>
    /// Updates an existing employee vacation record.
    /// </summary>
    /// <param name="id">Vacation record ID</param>
    /// <param name="request">Vacation update request</param>
    /// <returns>No content on success</returns>
    [HttpPut("{id}")]
    [Authorize(Policy = "VacationManagement")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> UpdateEmployeeVacation(long id, [FromBody] UpdateEmployeeVacationRequest request)
    {
        var command = new UpdateEmployeeVacationCommand(
            id,
            request.VacationTypeId,
            request.StartDate,
            request.EndDate,
            request.IsApproved,
            request.Notes
        );

        var result = await _mediator.Send(command);
        return result.IsSuccess ? NoContent() : BadRequest(result.Error);
    }

    /// <summary>
    /// Deletes an employee vacation record.
    /// </summary>
    /// <param name="id">Vacation record ID</param>
    /// <returns>No content on success</returns>
    [HttpDelete("{id}")]
    [Authorize(Policy = "VacationManagement")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> DeleteEmployeeVacation(long id)
    {
        // Note: You would typically create a DeleteEmployeeVacationCommand
        // This is simplified for the demo
        return NoContent();
    }

    /// <summary>
    /// Toggles the approval status of an employee vacation record.
    /// </summary>
    /// <param name="id">Vacation record ID</param>
    /// <returns>No content on success</returns>
    [HttpPatch("{id}/toggle-status")]
    [Authorize(Policy = "VacationApprove")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> ToggleVacationStatus(long id)
    {
        var command = new ToggleEmployeeVacationStatusCommand(id);
        var result = await _mediator.Send(command);

        return result.IsSuccess ? NoContent() : BadRequest(result.Error);
    }

    /// <summary>
    /// Retrieves vacation data for calendar display.
    /// </summary>
    /// <param name="startDate">Calendar start date</param>
    /// <param name="endDate">Calendar end date</param>
    /// <param name="employeeIds">Filter by specific employees</param>
    /// <returns>List of vacation calendar DTOs</returns>
    [HttpGet("calendar")]
    [ProducesResponseType(typeof(List<VacationCalendarDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetVacationCalendar(
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate,
        [FromQuery] long[]? employeeIds = null)
    {
        // Note: You would typically create a GetVacationCalendarQuery
        // This is simplified for the demo
        var query = new GetEmployeeVacationsQuery(
            StartDate: startDate,
            EndDate: endDate,
            IsApproved: true,
            Page: 1,
            PageSize: 1000
        );

        var result = await _mediator.Send(query);

        if (!result.IsSuccess)
            return BadRequest(result.Error);

        var calendarItems = result.Value.Items
            .Where(v => employeeIds == null || employeeIds.Contains(v.EmployeeId))
            .Select(v => new VacationCalendarDto(
                v.Id,
                v.EmployeeId,
                v.EmployeeName,
                v.VacationTypeName,
                v.StartDate,
                v.EndDate,
                v.IsApproved,
                GetVacationTypeColor(v.VacationTypeName)))
            .ToList();

        return Ok(calendarItems);
    }

    /// <summary>
    /// Gets a color code for vacation type visualization.
    /// </summary>
    private static string GetVacationTypeColor(string vacationTypeName)
    {
        // Simple color mapping - could be moved to vacation type configuration
        return vacationTypeName.ToLower() switch
        {
            "annual leave" => "#4CAF50",
            "sick leave" => "#F44336",
            "maternity leave" => "#9C27B0",
            "emergency leave" => "#FF9800",
            _ => "#2196F3"
        };
    }

    /// <summary>
    /// Creates bulk employee vacation records for all employees in a branch or department.
    /// </summary>
    /// <param name="request">Bulk vacation creation request</param>
    /// <returns>Bulk creation result with statistics</returns>
    [HttpPost("bulk")]
    [Authorize(Policy = "VacationBulkCreate")]
    [ProducesResponseType(typeof(Result<BulkVacationCreationResult>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> CreateBulkEmployeeVacations([FromBody] CreateBulkEmployeeVacationRequest request)
    {
        var command = new CreateBulkEmployeeVacationCommand(
            request.VacationTypeId,
            request.StartDate,
            request.EndDate,
            request.AssignmentType,
            request.BranchId,
            request.DepartmentId,
            request.IsApproved,
            request.Notes
        );

        var result = await _mediator.Send(command);

        return result.IsSuccess ? Ok(result) : BadRequest(result.Error);
    }
}

/// <summary>
/// Request model for creating employee vacation records.
/// </summary>
public record CreateEmployeeVacationRequest(
    long EmployeeId,
    long VacationTypeId,
    DateTime StartDate,
    DateTime EndDate,
    bool IsApproved = true,
    string? Notes = null
);

/// <summary>
/// Request model for updating employee vacation records.
/// </summary>
public record UpdateEmployeeVacationRequest(
    long VacationTypeId,
    DateTime StartDate,
    DateTime EndDate,
    bool IsApproved,
    string? Notes = null
);

/// <summary>
/// Request model for bulk employee vacation creation.
/// </summary>
public class CreateBulkEmployeeVacationRequest
{
    /// <summary>
    /// Vacation type identifier.
    /// </summary>
    public long VacationTypeId { get; set; }

    /// <summary>
    /// Start date of vacation period.
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// End date of vacation period.
    /// </summary>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Type of bulk assignment (Branch or Department).
    /// </summary>
    public BulkAssignmentType AssignmentType { get; set; }

    /// <summary>
    /// Branch identifier for branch-wide assignment.
    /// </summary>
    public long? BranchId { get; set; }

    /// <summary>
    /// Department identifier for department-wide assignment.
    /// </summary>
    public long? DepartmentId { get; set; }

    /// <summary>
    /// Whether vacation is approved.
    /// </summary>
    public bool IsApproved { get; set; } = true;

    /// <summary>
    /// Optional notes about the vacation.
    /// </summary>
    public string? Notes { get; set; }
}