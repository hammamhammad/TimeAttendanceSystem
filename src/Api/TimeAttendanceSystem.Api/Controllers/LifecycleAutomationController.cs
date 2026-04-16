using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Read-only queries over the v13.5 <c>LifecycleAutomationAudits</c> table.
/// Lets HR see what the automation layer did, is doing, or failed to do for any given
/// source entity (offer, resignation, termination, clearance, settlement, contract).
/// </summary>
[ApiController]
[Route("api/v1/lifecycle-automation")]
[Authorize]
public class LifecycleAutomationController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public LifecycleAutomationController(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Paginated audit-row list. All filters optional.
    /// </summary>
    [HttpGet("audit")]
    public async Task<IActionResult> GetAudits(
        [FromQuery] LifecycleAutomationType? automationType,
        [FromQuery] string? sourceEntityType,
        [FromQuery] long? sourceEntityId,
        [FromQuery] LifecycleAutomationStatus? status,
        [FromQuery] DateTime? from,
        [FromQuery] DateTime? to,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 25,
        CancellationToken ct = default)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 200) pageSize = 25;

        var query = _context.LifecycleAutomationAudits.AsNoTracking();

        if (automationType.HasValue) query = query.Where(a => a.AutomationType == automationType.Value);
        if (!string.IsNullOrEmpty(sourceEntityType)) query = query.Where(a => a.SourceEntityType == sourceEntityType);
        if (sourceEntityId.HasValue) query = query.Where(a => a.SourceEntityId == sourceEntityId.Value);
        if (status.HasValue) query = query.Where(a => a.Status == status.Value);
        if (from.HasValue) query = query.Where(a => a.TriggeredAtUtc >= from.Value);
        if (to.HasValue) query = query.Where(a => a.TriggeredAtUtc <= to.Value);

        var total = await query.CountAsync(ct);
        var items = await query
            .OrderByDescending(a => a.TriggeredAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new
            {
                a.Id,
                a.AutomationType,
                a.SourceEntityType,
                a.SourceEntityId,
                a.TargetEntityType,
                a.TargetEntityId,
                a.Status,
                a.Reason,
                a.ErrorMessage,
                a.TriggeredAtUtc,
                a.CompletedAtUtc,
                a.TriggeredByUserId
            })
            .ToListAsync(ct);

        return Ok(new { total, page, pageSize, items });
    }

    /// <summary>Single audit entry including <c>ContextJson</c> (not returned by list).</summary>
    [HttpGet("audit/{id:long}")]
    public async Task<IActionResult> GetAuditById(long id, CancellationToken ct)
    {
        var row = await _context.LifecycleAutomationAudits
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id, ct);

        if (row == null)
            return NotFound(new { error = "Audit entry not found." });

        return Ok(row);
    }

    /// <summary>All audits for a given source entity — used by detail pages to render an
    /// "Automation History" card.</summary>
    [HttpGet("audit/by-entity")]
    public async Task<IActionResult> GetByEntity(
        [FromQuery] string entityType,
        [FromQuery] long entityId,
        CancellationToken ct = default)
    {
        if (string.IsNullOrEmpty(entityType))
            return BadRequest(new { error = "entityType is required." });

        var rows = await _context.LifecycleAutomationAudits
            .AsNoTracking()
            .Where(a => a.SourceEntityType == entityType && a.SourceEntityId == entityId)
            .OrderByDescending(a => a.TriggeredAtUtc)
            .Select(a => new
            {
                a.Id,
                a.AutomationType,
                a.SourceEntityType,
                a.SourceEntityId,
                a.TargetEntityType,
                a.TargetEntityId,
                a.Status,
                a.Reason,
                a.ErrorMessage,
                a.TriggeredAtUtc,
                a.CompletedAtUtc,
                a.TriggeredByUserId
            })
            .ToListAsync(ct);

        return Ok(rows);
    }
}
