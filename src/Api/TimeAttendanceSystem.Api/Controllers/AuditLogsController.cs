using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.AuditLogs.Queries.GetAuditLogs;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Api.Controllers;

[ApiController]
[Route("api/v1/audit-logs")]
[Authorize(Policy = "AuditAccess")]
public class AuditLogsController : ControllerBase
{
    private readonly ISender _mediator;

    public AuditLogsController(ISender mediator)
    {
        _mediator = mediator;
    }
    /// <summary>
    /// Gets audit logs with filtering and pagination
    /// </summary>
    /// <param name="startDate">Filter by start date</param>
    /// <param name="endDate">Filter by end date</param>
    /// <param name="actions">Filter by audit actions (comma-separated)</param>
    /// <param name="entityName">Filter by entity name</param>
    /// <param name="actorUserId">Filter by actor user ID</param>
    /// <param name="searchTerm">Search term for entity ID, IP address, or user agent</param>
    /// <param name="pageNumber">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 20, max: 100)</param>
    /// <param name="sortBy">Sort field (default: CreatedAtUtc)</param>
    /// <param name="sortDirection">Sort direction: asc or desc (default: desc)</param>
    /// <returns>Paginated list of audit logs</returns>
    [HttpGet]
    [ProducesResponseType(typeof(GetAuditLogsResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetAuditLogs(
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] string? actions,
        [FromQuery] string? entityName,
        [FromQuery] long? actorUserId,
        [FromQuery] string? searchTerm,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? sortBy = "CreatedAtUtc",
        [FromQuery] string? sortDirection = "desc",
        CancellationToken cancellationToken = default)
    {
        // Parse actions from comma-separated string
        List<AuditAction>? actionList = null;
        if (!string.IsNullOrWhiteSpace(actions))
        {
            actionList = actions
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(a => Enum.TryParse<AuditAction>(a.Trim(), true, out var action) ? action : (AuditAction?)null)
                .Where(a => a.HasValue)
                .Select(a => a!.Value)
                .ToList();
        }

        // Limit page size to prevent abuse
        if (pageSize > 100) pageSize = 100;
        if (pageSize < 1) pageSize = 20;
        if (pageNumber < 1) pageNumber = 1;

        var query = new GetAuditLogsQuery
        {
            StartDate = startDate,
            EndDate = endDate,
            Actions = actionList,
            EntityName = entityName,
            ActorUserId = actorUserId,
            SearchTerm = searchTerm,
            PageNumber = pageNumber,
            PageSize = pageSize,
            SortBy = sortBy,
            SortDirection = sortDirection
        };

        var result = await _mediator.Send(query, cancellationToken);

        return result.IsSuccess
            ? Ok(result.Value)
            : BadRequest(result.Error);
    }
}
