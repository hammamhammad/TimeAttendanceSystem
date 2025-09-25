using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.PublicHolidays.Commands.CreatePublicHoliday;
using TimeAttendanceSystem.Application.PublicHolidays.Commands.UpdatePublicHoliday;
using TimeAttendanceSystem.Application.PublicHolidays.Commands.DeletePublicHoliday;
using TimeAttendanceSystem.Application.PublicHolidays.Queries.GetPublicHolidays;
using TimeAttendanceSystem.Application.PublicHolidays.Queries.GetPublicHolidayById;
using TimeAttendanceSystem.Application.PublicHolidays.Queries.GetHolidayCalendar;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Settings;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TimeAttendanceSystem.Api.Converters;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for managing public holidays.
/// Provides comprehensive endpoints for CRUD operations, calendar generation, and holiday management workflows.
/// </summary>
/// <remarks>
/// Controller Features:
/// - Complete CRUD operations for public holiday management
/// - Advanced filtering and pagination for large holiday datasets
/// - Calendar generation for yearly and monthly views
/// - Import/export functionality for holiday templates
/// - Holiday validation and conflict detection
/// - Branch-specific and national holiday support
/// - Integration with overtime calculation systems
///
/// Security:
/// - Requires authentication for all endpoints
/// - Role-based authorization for administrative operations
/// - Branch-level access control for regional holidays
/// - Audit logging for all holiday modifications
/// - Permission validation for sensitive operations
///
/// API Design:
/// - RESTful endpoint design with standard HTTP methods
/// - Comprehensive OpenAPI documentation with examples
/// - Consistent error handling and response formats
/// - Pagination support for large datasets
/// - Content negotiation for various response formats
/// - Versioning support for API evolution
/// </remarks>
[ApiController]
[Route("api/v1/public-holidays")]
[Authorize]
public class PublicHolidaysController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IPublicHolidayService _publicHolidayService;

    public PublicHolidaysController(IMediator mediator, IPublicHolidayService publicHolidayService)
    {
        _mediator = mediator;
        _publicHolidayService = publicHolidayService;
    }

    /// <summary>
    /// Gets a paginated list of public holidays with comprehensive filtering options.
    /// </summary>
    /// <param name="page">Page number (1-based, default: 1)</param>
    /// <param name="pageSize">Number of items per page (1-100, default: 10)</param>
    /// <param name="searchTerm">Optional search term to filter holidays by name or description</param>
    /// <param name="year">Optional year filter to show holidays effective for specific year</param>
    /// <param name="branchId">Optional branch filter for regional holiday management</param>
    /// <param name="holidayType">Optional filter by holiday type (OneTime, Annual, Monthly, Floating)</param>
    /// <param name="isActive">Optional filter to show only active or inactive holidays</param>
    /// <param name="isNational">Optional filter to show national vs regional holidays</param>
    /// <param name="countryCode">Optional country code filter for international organizations</param>
    /// <returns>Paginated list of public holidays with metadata</returns>
    /// <response code="200">Returns the paginated list of holidays</response>
    /// <response code="400">Invalid request parameters</response>
    /// <response code="401">Unauthorized access</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    [HttpGet]
    [Authorize(Policy = "PublicHolidayRead")]
    [ProducesResponseType(typeof(GetPublicHolidaysResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetPublicHolidays(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? searchTerm = null,
        [FromQuery] int? year = null,
        [FromQuery] long? branchId = null,
        [FromQuery] HolidayType? holidayType = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] bool? isNational = null,
        [FromQuery] string? countryCode = null)
    {
        // Validate parameters
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 10;

        var query = new GetPublicHolidaysQuery(
            page, pageSize, searchTerm, year, branchId,
            holidayType, isActive, isNational, countryCode);

        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Gets a specific public holiday by its unique identifier.
    /// </summary>
    /// <param name="id">Holiday unique identifier</param>
    /// <param name="includeConflicts">Whether to include conflict analysis with other holidays</param>
    /// <param name="year">Optional year for calculating conflicts and next occurrence</param>
    /// <returns>Detailed holiday information</returns>
    /// <response code="200">Returns the holiday details</response>
    /// <response code="404">Holiday not found</response>
    /// <response code="400">Invalid request parameters</response>
    /// <response code="401">Unauthorized access</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    [HttpGet("{id}")]
    [Authorize(Policy = "PublicHolidayRead")]
    [ProducesResponseType(typeof(PublicHolidayDto), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetPublicHolidayById(
        long id,
        [FromQuery] bool includeConflicts = false,
        [FromQuery] int? year = null)
    {
        if (id <= 0)
        {
            return BadRequest(new { error = "Invalid holiday ID" });
        }

        var query = new GetPublicHolidayByIdQuery(id, includeConflicts, year);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        if (result.Value == null)
        {
            return NotFound(new { error = "Holiday not found" });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Creates a new public holiday with comprehensive validation.
    /// </summary>
    /// <param name="request">Holiday creation request with all required information</param>
    /// <returns>Created holiday ID</returns>
    /// <response code="201">Holiday created successfully</response>
    /// <response code="400">Invalid request data or validation failure</response>
    /// <response code="401">Unauthorized access</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    /// <response code="409">Conflict with existing holiday</response>
    [HttpPost]
    [Authorize(Policy = "PublicHolidayManagement")]
    [ProducesResponseType(typeof(object), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    [ProducesResponseType(409)]
    public async Task<IActionResult> CreatePublicHoliday([FromBody] CreatePublicHolidayRequest request)
    {
        // Debug logging
        Console.WriteLine($"CreatePublicHoliday called - Request received: {request?.Name ?? "NULL"}");
        Console.WriteLine($"ModelState IsValid: {ModelState.IsValid}");
        Console.WriteLine($"Request is null: {request == null}");

        if (request != null)
        {
            Console.WriteLine($"Request.Name: {request.Name}");
            Console.WriteLine($"Request.HolidayType: {request.HolidayType}");
            Console.WriteLine($"Request.SpecificDate: {request.SpecificDate}");
        }

        if (!ModelState.IsValid)
        {
            Console.WriteLine("ModelState errors:");
            foreach (var error in ModelState)
            {
                Console.WriteLine($"  {error.Key}: {string.Join(", ", error.Value.Errors.Select(e => e.ErrorMessage))}");
            }
            return BadRequest(ModelState);
        }

        var command = new CreatePublicHolidayCommand(
            request.Name,
            request.NameAr,
            request.SpecificDate,
            request.Month,
            request.Day,
            request.HolidayType,
            request.IsActive,
            request.IsNational,
            request.BranchId,
            request.Description,
            request.EffectiveFromYear,
            request.EffectiveToYear,
            request.DayOfWeek,
            request.WeekOccurrence,
            request.CountryCode,
            request.Priority);

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            // Check if it's a conflict error
            if (result.Error.Contains("conflict", StringComparison.OrdinalIgnoreCase))
            {
                return Conflict(new { error = result.Error });
            }
            return BadRequest(new { error = result.Error });
        }

        return CreatedAtAction(
            nameof(GetPublicHolidayById),
            new { id = result.Value },
            new { id = result.Value, message = "Holiday created successfully" });
    }

    /// <summary>
    /// Updates an existing public holiday with validation and conflict checking.
    /// </summary>
    /// <param name="id">Holiday unique identifier</param>
    /// <param name="request">Holiday update request with modified information</param>
    /// <returns>Updated holiday information</returns>
    /// <response code="200">Holiday updated successfully</response>
    /// <response code="400">Invalid request data or validation failure</response>
    /// <response code="404">Holiday not found</response>
    /// <response code="401">Unauthorized access</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    /// <response code="409">Conflict with existing holiday</response>
    [HttpPut("{id}")]
    [Authorize(Policy = "PublicHolidayManagement")]
    [ProducesResponseType(typeof(PublicHolidayDto), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    [ProducesResponseType(409)]
    public async Task<IActionResult> UpdatePublicHoliday(long id, [FromBody] UpdatePublicHolidayRequest request)
    {
        if (id <= 0)
        {
            return BadRequest(new { error = "Invalid holiday ID" });
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var command = new UpdatePublicHolidayCommand(
            id,
            request.Name,
            request.NameAr,
            request.SpecificDate,
            request.Month,
            request.Day,
            request.HolidayType,
            request.IsActive,
            request.IsNational,
            request.BranchId,
            request.Description,
            request.EffectiveFromYear,
            request.EffectiveToYear,
            request.DayOfWeek,
            request.WeekOccurrence,
            request.CountryCode,
            request.Priority);

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
            {
                return NotFound(new { error = result.Error });
            }
            if (result.Error.Contains("conflict", StringComparison.OrdinalIgnoreCase))
            {
                return Conflict(new { error = result.Error });
            }
            return BadRequest(new { error = result.Error });
        }

        return Ok();
    }

    /// <summary>
    /// Deletes a public holiday with safety checks and impact assessment.
    /// </summary>
    /// <param name="id">Holiday unique identifier</param>
    /// <returns>Deletion confirmation</returns>
    /// <response code="200">Holiday deleted successfully</response>
    /// <response code="404">Holiday not found</response>
    /// <response code="400">Invalid request or deletion not allowed</response>
    /// <response code="401">Unauthorized access</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    [HttpDelete("{id}")]
    [Authorize(Policy = "PublicHolidayManagement")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> DeletePublicHoliday(long id)
    {
        if (id <= 0)
        {
            return BadRequest(new { error = "Invalid holiday ID" });
        }

        var command = new DeletePublicHolidayCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
            {
                return NotFound(new { error = result.Error });
            }
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "Holiday deleted successfully" });
    }

    /// <summary>
    /// Generates a comprehensive holiday calendar for a specific year with optional branch filtering.
    /// </summary>
    /// <param name="year">Year to generate the calendar for</param>
    /// <param name="branchId">Optional branch ID for regional holiday filtering</param>
    /// <param name="includeInactive">Whether to include inactive holidays in the calendar</param>
    /// <param name="format">Optional format specification for specialized calendar layouts</param>
    /// <returns>Holiday calendar data optimized for display</returns>
    /// <response code="200">Returns the holiday calendar</response>
    /// <response code="400">Invalid request parameters</response>
    /// <response code="401">Unauthorized access</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    [HttpGet("calendar/{year}")]
    [Authorize(Policy = "PublicHolidayRead")]
    [ProducesResponseType(typeof(GetHolidayCalendarResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetHolidayCalendar(
        int year,
        [FromQuery] long? branchId = null,
        [FromQuery] bool includeInactive = false,
        [FromQuery] string? format = null)
    {
        if (year < 1900 || year > 2100)
        {
            return BadRequest(new { error = "Year must be between 1900 and 2100" });
        }

        var query = new GetHolidayCalendarQuery(year, branchId, includeInactive, format);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Gets holiday dates for a specific month with efficient filtering.
    /// </summary>
    /// <param name="year">Year</param>
    /// <param name="month">Month (1-12)</param>
    /// <param name="branchId">Optional branch ID for regional holidays</param>
    /// <returns>List of holiday dates in the specified month</returns>
    /// <response code="200">Returns the holiday dates</response>
    /// <response code="400">Invalid request parameters</response>
    /// <response code="401">Unauthorized access</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    [HttpGet("dates/{year}/{month}")]
    [Authorize(Policy = "PublicHolidayRead")]
    [ProducesResponseType(typeof(IEnumerable<DateTime>), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> GetHolidayDatesForMonth(
        int year,
        int month,
        [FromQuery] long? branchId = null)
    {
        if (year < 1900 || year > 2100)
        {
            return BadRequest(new { error = "Year must be between 1900 and 2100" });
        }

        if (month < 1 || month > 12)
        {
            return BadRequest(new { error = "Month must be between 1 and 12" });
        }

        try
        {
            var dates = await _publicHolidayService.GetHolidayDatesForMonthAsync(year, month, branchId);
            return Ok(dates);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    /// <summary>
    /// Imports holidays from predefined templates for common countries.
    /// </summary>
    /// <param name="countryCode">Country code for holiday template (US, UK, SA, etc.)</param>
    /// <param name="year">Year to import holidays for</param>
    /// <param name="branchId">Optional branch ID for regional holidays</param>
    /// <returns>Number of holidays imported</returns>
    /// <response code="200">Returns the number of imported holidays</response>
    /// <response code="400">Invalid request parameters or unsupported country</response>
    /// <response code="401">Unauthorized access</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    [HttpPost("import")]
    [Authorize(Policy = "PublicHolidayImport")]
    [ProducesResponseType(typeof(object), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> ImportHolidayTemplate(
        [FromQuery] string countryCode,
        [FromQuery] int year,
        [FromQuery] long? branchId = null)
    {
        if (string.IsNullOrWhiteSpace(countryCode))
        {
            return BadRequest(new { error = "Country code is required" });
        }

        if (year < DateTime.Now.Year - 1 || year > DateTime.Now.Year + 10)
        {
            return BadRequest(new { error = "Year must be within reasonable range" });
        }

        try
        {
            var importedCount = await _publicHolidayService.ImportHolidayTemplateAsync(
                countryCode.ToUpper(), year, branchId);

            return Ok(new
            {
                message = $"Successfully imported {importedCount} holidays for {countryCode.ToUpper()} {year}",
                importedCount,
                countryCode = countryCode.ToUpper(),
                year,
                branchId
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    /// <summary>
    /// Exports holidays to various formats for external integration.
    /// </summary>
    /// <param name="year">Year to export</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="format">Export format: json, csv, ical (default: json)</param>
    /// <returns>Exported holiday data</returns>
    /// <response code="200">Returns the exported data</response>
    /// <response code="400">Invalid request parameters</response>
    /// <response code="401">Unauthorized access</response>
    /// <response code="403">Forbidden - insufficient permissions</response>
    [HttpGet("export/{year}")]
    [Authorize(Policy = "PublicHolidayExport")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> ExportHolidays(
        int year,
        [FromQuery] long? branchId = null,
        [FromQuery] string format = "json")
    {
        if (year < 1900 || year > 2100)
        {
            return BadRequest(new { error = "Year must be between 1900 and 2100" });
        }

        var validFormats = new[] { "json", "csv", "ical" };
        if (!validFormats.Contains(format.ToLower()))
        {
            return BadRequest(new { error = $"Unsupported format. Valid formats: {string.Join(", ", validFormats)}" });
        }

        try
        {
            var exportData = await _publicHolidayService.ExportHolidaysAsync(year, branchId, format.ToLower());

            var contentType = format.ToLower() switch
            {
                "csv" => "text/csv",
                "ical" => "text/calendar",
                _ => "application/json"
            };

            var fileName = $"holidays_{year}" + (branchId.HasValue ? $"_branch_{branchId}" : "") +
                          format.ToLower() switch
                          {
                              "csv" => ".csv",
                              "ical" => ".ics",
                              _ => ".json"
                          };

            return File(exportData, contentType, fileName);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

}

/// <summary>
/// Request model for creating a new public holiday.
/// </summary>
public record CreatePublicHolidayRequest
{
    /// <summary>The name of the public holiday</summary>
    [Required(ErrorMessage = "Holiday name is required")]
    [StringLength(100, ErrorMessage = "Holiday name must not exceed 100 characters")]
    public string Name { get; init; } = string.Empty;

    /// <summary>The Arabic name of the public holiday (optional)</summary>
    public string? NameAr { get; init; }

    /// <summary>Specific date for one-time holidays</summary>
    public DateTime? SpecificDate { get; init; }

    /// <summary>Month for recurring holidays (1-12)</summary>
    public int? Month { get; init; }

    /// <summary>Day of the month for annual holidays (1-31)</summary>
    public int? Day { get; init; }

    /// <summary>Type of holiday recurrence pattern</summary>
    [JsonConverter(typeof(HolidayTypeJsonConverter))]
    public HolidayType HolidayType { get; init; }

    /// <summary>Whether this holiday is currently active</summary>
    public bool IsActive { get; init; } = true;

    /// <summary>Whether this holiday applies to all branches</summary>
    public bool IsNational { get; init; } = true;

    /// <summary>Specific branch ID for regional holidays</summary>
    public long? BranchId { get; init; }

    /// <summary>Optional description or notes about the holiday</summary>
    public string? Description { get; init; }

    /// <summary>Year from which this holiday becomes effective</summary>
    public int? EffectiveFromYear { get; init; }

    /// <summary>Year until which this holiday is valid</summary>
    public int? EffectiveToYear { get; init; }

    /// <summary>Day of the week for floating holidays</summary>
    public DayOfWeek? DayOfWeek { get; init; }

    /// <summary>Week occurrence for floating holidays (1-5, -1 for last)</summary>
    public int? WeekOccurrence { get; init; }

    /// <summary>Country code for international holiday support</summary>
    public string? CountryCode { get; init; }

    /// <summary>Priority when multiple holidays fall on same date</summary>
    public int Priority { get; init; } = 1;
}

/// <summary>
/// Request model for updating an existing public holiday.
/// </summary>
public record UpdatePublicHolidayRequest
{
    /// <summary>The updated name of the public holiday</summary>
    public string Name { get; init; } = string.Empty;

    /// <summary>The updated Arabic name of the public holiday (optional)</summary>
    public string? NameAr { get; init; }

    /// <summary>Updated specific date for one-time holidays</summary>
    public DateTime? SpecificDate { get; init; }

    /// <summary>Updated month for recurring holidays (1-12)</summary>
    public int? Month { get; init; }

    /// <summary>Updated day of the month for annual holidays (1-31)</summary>
    public int? Day { get; init; }

    /// <summary>Updated type of holiday recurrence pattern</summary>
    [JsonConverter(typeof(HolidayTypeJsonConverter))]
    public HolidayType HolidayType { get; init; }

    /// <summary>Updated active status of the holiday</summary>
    public bool IsActive { get; init; }

    /// <summary>Updated scope - whether this holiday applies to all branches</summary>
    public bool IsNational { get; init; }

    /// <summary>Updated specific branch ID for regional holidays</summary>
    public long? BranchId { get; init; }

    /// <summary>Updated description or notes about the holiday</summary>
    public string? Description { get; init; }

    /// <summary>Updated year from which this holiday becomes effective</summary>
    public int? EffectiveFromYear { get; init; }

    /// <summary>Updated year until which this holiday is valid</summary>
    public int? EffectiveToYear { get; init; }

    /// <summary>Updated day of the week for floating holidays</summary>
    public DayOfWeek? DayOfWeek { get; init; }

    /// <summary>Updated week occurrence for floating holidays (1-5, -1 for last)</summary>
    public int? WeekOccurrence { get; init; }

    /// <summary>Updated country code for international holiday support</summary>
    public string? CountryCode { get; init; }

    /// <summary>Updated priority when multiple holidays fall on same date</summary>
    public int Priority { get; init; } = 1;
}

