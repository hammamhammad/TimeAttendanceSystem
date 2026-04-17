using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Features.ApprovalExecution;
using TecAxle.Hrms.Application.Features.ApprovalExecution.Commands;
using TecAxle.Hrms.Domain.Operations;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Phase 1 (v14.1): HR/admin operations around <see cref="OperationalFailureAlert"/> —
/// unresolved failure list, resolve, and retry.
/// Backed by <see cref="IFailureAlertService"/>.
/// </summary>
[ApiController]
[Route("api/v1/operational-alerts")]
[Authorize]
public sealed class OperationalAlertsController : ControllerBase
{
    private readonly IApplicationDbContext _db;
    private readonly IFailureAlertService _alerts;
    private readonly IMediator _mediator;
    private readonly ICurrentUser _currentUser;

    public OperationalAlertsController(
        IApplicationDbContext db,
        IFailureAlertService alerts,
        IMediator mediator,
        ICurrentUser currentUser)
    {
        _db = db;
        _alerts = alerts;
        _mediator = mediator;
        _currentUser = currentUser;
    }

    /// <summary>
    /// HR dashboard query: list alerts with flexible filters. Default: unresolved only, newest first.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isResolved = false,
        [FromQuery] OperationalFailureCategory? category = null,
        [FromQuery] OperationalFailureSeverity? minSeverity = null,
        [FromQuery] string? sourceEntityType = null,
        [FromQuery] long? sourceEntityId = null,
        [FromQuery] long? employeeId = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50,
        CancellationToken ct = default)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 500) pageSize = 50;

        var q = _db.OperationalFailureAlerts.AsNoTracking().Where(a => !a.IsDeleted);
        if (isResolved.HasValue) q = q.Where(a => a.IsResolved == isResolved.Value);
        if (category.HasValue) q = q.Where(a => a.Category == category.Value);
        if (minSeverity.HasValue) q = q.Where(a => a.Severity >= minSeverity.Value);
        if (!string.IsNullOrWhiteSpace(sourceEntityType)) q = q.Where(a => a.SourceEntityType == sourceEntityType);
        if (sourceEntityId.HasValue) q = q.Where(a => a.SourceEntityId == sourceEntityId.Value);
        if (employeeId.HasValue) q = q.Where(a => a.EmployeeId == employeeId.Value);

        var total = await q.CountAsync(ct);
        var items = await q
            .OrderByDescending(a => a.FailedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        return Ok(new { total, page, pageSize, items });
    }

    /// <summary>Get a single alert by id.</summary>
    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id, CancellationToken ct)
    {
        var a = await _db.OperationalFailureAlerts.AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, ct);
        if (a == null) return NotFound();
        return Ok(a);
    }

    /// <summary>Mark an alert as resolved with optional notes.</summary>
    [HttpPost("{id:long}/resolve")]
    public async Task<IActionResult> Resolve(long id, [FromBody] ResolveAlertRequest? body, CancellationToken ct)
    {
        var userId = _currentUser.UserId ?? 0;
        if (userId <= 0) return Forbid();
        await _alerts.ResolveAsync(id, userId, body?.Notes, ct);
        return NoContent();
    }

    /// <summary>
    /// Retry the original action for ApprovalExecution alerts. For other categories this only
    /// bumps the retry counter; the actual retry logic is specific to the source system.
    /// </summary>
    [HttpPost("{id:long}/retry")]
    public async Task<IActionResult> Retry(long id, CancellationToken ct)
    {
        var alert = await _db.OperationalFailureAlerts.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, ct);
        if (alert == null) return NotFound();
        if (alert.IsResolved) return BadRequest(new { error = "Alert already resolved." });
        if (!alert.IsRetryable) return BadRequest(new { error = "Alert is not marked retryable." });

        await _alerts.RecordRetryAsync(id, ct);

        // For approval-execution failures, re-run the executor if we can decode the target type.
        if (alert.Category == OperationalFailureCategory.ApprovalExecution
            && Enum.TryParse<ApprovalExecutionTargetType>(alert.SourceEntityType, out var target))
        {
            var result = await _mediator.Send(new ExecuteApprovalCommand(target, alert.SourceEntityId), ct);
            if (result.IsSuccess && result.Value!.Outcome
                is ExecutionOutcome.Succeeded
                or ExecutionOutcome.AlreadyExecuted)
            {
                await _alerts.ResolveAsync(id, _currentUser.UserId ?? 0,
                    $"Auto-resolved by retry: {result.Value.Message}", ct);
                return Ok(new { resolved = true, message = result.Value.Message });
            }
            return StatusCode(500, new
            {
                resolved = false,
                outcome = result.Value?.Outcome.ToString(),
                message = result.Value?.Message ?? result.Error
            });
        }

        return Accepted(new
        {
            message = "Retry counter incremented. Re-driven execution is only wired for ApprovalExecution category."
        });
    }

    /// <summary>
    /// Phase 2 (v14.2): Bulk mark multiple alerts as resolved in one call.
    /// Skips alerts that are already resolved (returns <c>AlreadyProcessed</c> per item).
    /// Ids that don't exist return <c>Skipped</c>. Max 500 ids per call to keep the
    /// transaction bounded; callers with larger sets must page.
    /// </summary>
    [HttpPost("bulk-resolve")]
    public async Task<IActionResult> BulkResolve([FromBody] BulkAlertOperationRequest body, CancellationToken ct)
    {
        if (body == null || body.AlertIds.Count == 0)
            return BadRequest(new { error = "AlertIds is required." });
        if (body.AlertIds.Count > 500)
            return BadRequest(new { error = "Bulk operation limited to 500 ids per call." });

        var userId = _currentUser.UserId ?? 0;
        if (userId <= 0) return Forbid();

        var result = new BulkAlertOperationResult { Attempted = body.AlertIds.Count };
        var distinctIds = body.AlertIds.Distinct().ToList();

        var alerts = await _db.OperationalFailureAlerts
            .Where(a => distinctIds.Contains(a.Id) && !a.IsDeleted)
            .ToListAsync(ct);

        foreach (var id in distinctIds)
        {
            var a = alerts.FirstOrDefault(x => x.Id == id);
            if (a == null)
            {
                result.Skipped++;
                result.Items.Add(new BulkAlertItemResult { AlertId = id, Outcome = "Skipped", Message = "Not found." });
                continue;
            }
            if (a.IsResolved)
            {
                result.AlreadyProcessed++;
                result.Items.Add(new BulkAlertItemResult { AlertId = id, Outcome = "AlreadyProcessed" });
                continue;
            }

            try
            {
                await _alerts.ResolveAsync(id, userId, body.Notes, ct);
                result.Succeeded++;
                result.Items.Add(new BulkAlertItemResult { AlertId = id, Outcome = "Succeeded" });
            }
            catch (Exception ex)
            {
                result.Failed++;
                result.Items.Add(new BulkAlertItemResult { AlertId = id, Outcome = "Failed", Message = ex.Message });
            }
        }

        return Ok(result);
    }

    /// <summary>
    /// Phase 2 (v14.2): Bulk retry multiple <c>ApprovalExecution</c> alerts in one call.
    /// Only retryable ApprovalExecution alerts are re-run via <c>ExecuteApprovalCommand</c>.
    /// Other categories return <c>Skipped</c>. On success the alert is auto-resolved.
    /// </summary>
    [HttpPost("bulk-retry")]
    public async Task<IActionResult> BulkRetry([FromBody] BulkAlertOperationRequest body, CancellationToken ct)
    {
        if (body == null || body.AlertIds.Count == 0)
            return BadRequest(new { error = "AlertIds is required." });
        if (body.AlertIds.Count > 200)
            return BadRequest(new { error = "Bulk retry limited to 200 ids per call." });

        var userId = _currentUser.UserId ?? 0;
        if (userId <= 0) return Forbid();

        var result = new BulkAlertOperationResult { Attempted = body.AlertIds.Count };
        var distinctIds = body.AlertIds.Distinct().ToList();

        var alerts = await _db.OperationalFailureAlerts
            .Where(a => distinctIds.Contains(a.Id) && !a.IsDeleted)
            .ToListAsync(ct);

        foreach (var id in distinctIds)
        {
            var a = alerts.FirstOrDefault(x => x.Id == id);
            if (a == null)
            {
                result.Skipped++;
                result.Items.Add(new BulkAlertItemResult { AlertId = id, Outcome = "Skipped", Message = "Not found." });
                continue;
            }
            if (a.IsResolved)
            {
                result.AlreadyProcessed++;
                result.Items.Add(new BulkAlertItemResult { AlertId = id, Outcome = "AlreadyProcessed" });
                continue;
            }
            if (!a.IsRetryable || a.Category != OperationalFailureCategory.ApprovalExecution)
            {
                result.Skipped++;
                result.Items.Add(new BulkAlertItemResult
                {
                    AlertId = id,
                    Outcome = "Skipped",
                    Message = "Not a retryable ApprovalExecution alert."
                });
                continue;
            }
            if (!Enum.TryParse<ApprovalExecutionTargetType>(a.SourceEntityType, out var target))
            {
                result.Skipped++;
                result.Items.Add(new BulkAlertItemResult
                {
                    AlertId = id,
                    Outcome = "Skipped",
                    Message = $"Unknown target type '{a.SourceEntityType}'."
                });
                continue;
            }

            try
            {
                await _alerts.RecordRetryAsync(id, ct);
                var cmd = await _mediator.Send(new ExecuteApprovalCommand(target, a.SourceEntityId), ct);
                if (cmd.IsSuccess && cmd.Value!.Outcome
                    is ExecutionOutcome.Succeeded or ExecutionOutcome.AlreadyExecuted)
                {
                    await _alerts.ResolveAsync(id, userId,
                        $"Auto-resolved via bulk-retry: {cmd.Value.Message}", ct);
                    result.Succeeded++;
                    result.Items.Add(new BulkAlertItemResult
                    {
                        AlertId = id, Outcome = "Succeeded", Message = cmd.Value.Message
                    });
                }
                else
                {
                    result.Failed++;
                    result.Items.Add(new BulkAlertItemResult
                    {
                        AlertId = id,
                        Outcome = "Failed",
                        Message = cmd.Value?.Message ?? cmd.Error
                    });
                }
            }
            catch (Exception ex)
            {
                result.Failed++;
                result.Items.Add(new BulkAlertItemResult { AlertId = id, Outcome = "Failed", Message = ex.Message });
            }
        }

        return Ok(result);
    }
}

public sealed class ResolveAlertRequest
{
    public string? Notes { get; set; }
}

public sealed class BulkAlertOperationRequest
{
    public List<long> AlertIds { get; set; } = new();
    public string? Notes { get; set; }
}

public sealed class BulkAlertOperationResult
{
    public int Attempted { get; set; }
    public int Succeeded { get; set; }
    public int AlreadyProcessed { get; set; }
    public int Skipped { get; set; }
    public int Failed { get; set; }
    public List<BulkAlertItemResult> Items { get; set; } = new();
}

public sealed class BulkAlertItemResult
{
    public long AlertId { get; set; }
    public string Outcome { get; set; } = string.Empty; // Succeeded | AlreadyProcessed | Skipped | Failed
    public string? Message { get; set; }
}

