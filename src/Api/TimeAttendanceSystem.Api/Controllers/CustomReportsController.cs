using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.CustomReports.Commands.CreateCustomReport;
using TecAxle.Hrms.Application.CustomReports.Commands.CreateScheduledReport;
using TecAxle.Hrms.Application.CustomReports.Commands.DeleteCustomReport;
using TecAxle.Hrms.Application.CustomReports.Commands.DeleteScheduledReport;
using TecAxle.Hrms.Application.CustomReports.Commands.UpdateCustomReport;
using TecAxle.Hrms.Application.CustomReports.Commands.UpdateScheduledReport;
using TecAxle.Hrms.Application.CustomReports.Queries.GetCustomReportById;
using TecAxle.Hrms.Application.CustomReports.Queries.GetCustomReports;
using TecAxle.Hrms.Application.CustomReports.Queries.GetDataSources;
using TecAxle.Hrms.Application.CustomReports.Queries.GetScheduledReports;
using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Controller for managing custom report definitions and their scheduled executions.
/// Provides CRUD operations for report definitions and scheduling configuration.
/// </summary>
[ApiController]
[Route("api/v1/custom-reports")]
[Authorize]
public class CustomReportsController : ControllerBase
{
    private readonly IMediator _mediator;

    public CustomReportsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // ─── Report Definition Endpoints ───────────────────────────────────

    /// <summary>
    /// Gets a paginated list of custom report definitions.
    /// Returns reports created by the current user or public reports in the user's branch.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetCustomReports(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] long? branchId = null,
        [FromQuery] bool? isPublic = null,
        [FromQuery] ReportDataSource? dataSource = null)
    {
        var query = new GetCustomReportsQuery(page, pageSize, branchId, isPublic, dataSource);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Gets a specific custom report definition by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCustomReportById(long id)
    {
        var query = new GetCustomReportByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Gets metadata about available data sources and their columns for report building.
    /// </summary>
    [HttpGet("data-sources")]
    public async Task<IActionResult> GetDataSources()
    {
        var query = new GetDataSourcesQuery();
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Creates a new custom report definition.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateCustomReport([FromBody] CreateCustomReportRequest request)
    {
        var command = new CreateCustomReportCommand(
            request.Name,
            request.NameAr,
            request.Description,
            request.DescriptionAr,
            request.DataSource,
            request.ColumnsJson,
            request.FiltersJson,
            request.SortingJson,
            request.BranchId,
            request.IsPublic
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return CreatedAtAction(nameof(GetCustomReportById), new { id = result.Value }, new { id = result.Value });
    }

    /// <summary>
    /// Updates an existing custom report definition.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomReport(long id, [FromBody] UpdateCustomReportRequest request)
    {
        var command = new UpdateCustomReportCommand(
            id,
            request.Name,
            request.NameAr,
            request.Description,
            request.DescriptionAr,
            request.DataSource,
            request.ColumnsJson,
            request.FiltersJson,
            request.SortingJson,
            request.BranchId,
            request.IsPublic
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Soft-deletes a custom report definition.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomReport(long id)
    {
        var command = new DeleteCustomReportCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    // ─── Scheduled Report Endpoints ────────────────────────────────────

    /// <summary>
    /// Gets all scheduled reports for a specific custom report definition.
    /// </summary>
    [HttpGet("{id}/schedules")]
    public async Task<IActionResult> GetScheduledReports(long id)
    {
        var query = new GetScheduledReportsQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Creates a new scheduled report for a custom report definition.
    /// </summary>
    [HttpPost("{id}/schedules")]
    public async Task<IActionResult> CreateScheduledReport(long id, [FromBody] CreateScheduledReportRequest request)
    {
        var command = new CreateScheduledReportCommand(
            id,
            request.CronExpression,
            request.EmailRecipients,
            request.Format,
            request.IsActive
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return CreatedAtAction(nameof(GetScheduledReports), new { id }, new { id = result.Value });
    }

    /// <summary>
    /// Updates an existing scheduled report.
    /// </summary>
    [HttpPut("schedules/{scheduleId}")]
    public async Task<IActionResult> UpdateScheduledReport(long scheduleId, [FromBody] UpdateScheduledReportRequest request)
    {
        var command = new UpdateScheduledReportCommand(
            scheduleId,
            request.CronExpression,
            request.EmailRecipients,
            request.Format,
            request.IsActive
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Deletes a scheduled report.
    /// </summary>
    [HttpDelete("schedules/{scheduleId}")]
    public async Task<IActionResult> DeleteScheduledReport(long scheduleId)
    {
        var command = new DeleteScheduledReportCommand(scheduleId);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }
}

// ─── Request DTOs ──────────────────────────────────────────────────────

public record CreateCustomReportRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    ReportDataSource DataSource,
    string ColumnsJson,
    string? FiltersJson,
    string? SortingJson,
    long? BranchId,
    bool IsPublic
);

public record UpdateCustomReportRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    ReportDataSource DataSource,
    string ColumnsJson,
    string? FiltersJson,
    string? SortingJson,
    long? BranchId,
    bool IsPublic
);

public record CreateScheduledReportRequest(
    string CronExpression,
    string EmailRecipients,
    ReportFormat Format,
    bool IsActive
);

public record UpdateScheduledReportRequest(
    string CronExpression,
    string EmailRecipients,
    ReportFormat Format,
    bool IsActive
);
