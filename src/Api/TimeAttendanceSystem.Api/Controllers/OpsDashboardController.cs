using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Lifecycle;
using TecAxle.Hrms.Domain.Operations;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Phase 2 (v14.2): HR/admin operations dashboard — practical, production-useful
/// cross-module summaries that let operators spot problems without hand-querying tables.
/// Not a BI system; all queries are simple counts + small top-N lists.
///
/// The single <c>/summary</c> endpoint returns everything a daily ops standup needs:
/// - unresolved operational alerts (by category + severity)
/// - lifecycle automation failures (last 7 days)
/// - payroll processing exceptions (open / recent)
/// - approved-but-not-executed Phase 1 targets
/// - overdue onboarding tasks
/// - overdue clearance items
/// - overdue workflow approvals
/// </summary>
[ApiController]
[Route("api/v1/ops-dashboard")]
[Authorize]
public sealed class OpsDashboardController : ControllerBase
{
    private readonly IApplicationDbContext _db;

    public OpsDashboardController(IApplicationDbContext db) => _db = db;

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary(CancellationToken ct)
    {
        var sevenDaysAgo = DateTime.UtcNow.AddDays(-7);
        var overdueCutoff = DateTime.UtcNow.Date;

        // ---- Operational alerts (unresolved) ----
        var alertsByCategory = await _db.OperationalFailureAlerts
            .Where(a => !a.IsDeleted && !a.IsResolved)
            .GroupBy(a => a.Category)
            .Select(g => new { Category = g.Key, Count = g.Count() })
            .ToListAsync(ct);

        var alertsBySeverity = await _db.OperationalFailureAlerts
            .Where(a => !a.IsDeleted && !a.IsResolved)
            .GroupBy(a => a.Severity)
            .Select(g => new { Severity = g.Key, Count = g.Count() })
            .ToListAsync(ct);

        var totalUnresolvedAlerts = alertsByCategory.Sum(a => a.Count);

        // ---- Lifecycle failures (last 7d, latest audit per source key) ----
        var recentAudits = await _db.LifecycleAutomationAudits
            .Where(a => !a.IsDeleted && a.TriggeredAtUtc >= sevenDaysAgo
                     && (a.Status == LifecycleAutomationStatus.Failed
                         || a.Status == LifecycleAutomationStatus.MissingPrerequisite))
            .GroupBy(a => new { a.AutomationType })
            .Select(g => new { AutomationType = g.Key.AutomationType, Count = g.Count() })
            .ToListAsync(ct);

        // ---- Payroll processing exceptions (open alerts + recent run-audit errors) ----
        var openPayrollAlerts = alertsByCategory
            .FirstOrDefault(a => a.Category == OperationalFailureCategory.PayrollProcessing)?.Count ?? 0;
        var recentPayrollRunErrors = await _db.PayrollRunAudits
            .Where(r => !r.IsDeleted
                     && r.StartedAtUtc >= sevenDaysAgo
                     && r.EmployeesFailed > 0)
            .CountAsync(ct);

        // ---- Approved-but-not-executed Phase 1 targets (all 6) ----
        var approvedNotExecuted = new
        {
            allowanceRequests = await _db.AllowanceRequests.CountAsync(
                x => !x.IsDeleted && x.Status == AllowanceRequestStatus.Approved && !x.IsExecuted, ct),
            loanApplications = await _db.LoanApplications.CountAsync(
                x => !x.IsDeleted && x.Status == LoanApplicationStatus.Approved && !x.IsExecuted, ct),
            salaryAdvances = await _db.SalaryAdvances.CountAsync(
                x => !x.IsDeleted && x.Status == SalaryAdvanceStatus.Approved && !x.IsExecuted, ct),
            expenseClaims = await _db.ExpenseClaims.CountAsync(
                x => !x.IsDeleted && x.Status == ExpenseClaimStatus.Approved && !x.IsExecuted, ct),
            benefitEnrollments = await _db.BenefitEnrollments.CountAsync(
                x => !x.IsDeleted && x.Status == BenefitEnrollmentStatus.Active && !x.IsExecuted, ct),
            letterRequests = await _db.LetterRequests.CountAsync(
                x => !x.IsDeleted && x.Status == LetterRequestStatus.Approved && !x.IsExecuted, ct)
        };

        // ---- Overdue onboarding tasks ----
        var overdueOnboardingTasks = await _db.OnboardingTasks
            .Where(t => !t.IsDeleted
                     && t.Status != OnboardingTaskStatus.Completed
                     && t.Status != OnboardingTaskStatus.Skipped
                     && t.DueDate < overdueCutoff)
            .CountAsync(ct);

        // ---- Overdue clearance items (no DueDate column; use 14-day SLA from checklist creation) ----
        var clearanceCutoff = DateTime.UtcNow.AddDays(-14);
        var overdueClearanceItems = await _db.ClearanceItems
            .Where(i => !i.IsDeleted
                     && !i.IsCompleted
                     && i.CreatedAtUtc <= clearanceCutoff)
            .CountAsync(ct);

        // ---- Overdue workflow approvals (pending steps past DueAt) ----
        var overdueApprovals = await _db.WorkflowStepExecutions
            .Where(e => !e.IsDeleted
                     && !e.Action.HasValue
                     && e.DueAt != null
                     && e.DueAt < DateTime.UtcNow)
            .CountAsync(ct);

        return Ok(new
        {
            generatedAtUtc = DateTime.UtcNow,
            alerts = new
            {
                totalUnresolved = totalUnresolvedAlerts,
                byCategory = alertsByCategory.ToDictionary(a => a.Category.ToString(), a => a.Count),
                bySeverity = alertsBySeverity.ToDictionary(a => a.Severity.ToString(), a => a.Count)
            },
            lifecycle = new
            {
                failuresLast7Days = recentAudits.Sum(a => a.Count),
                byAutomationType = recentAudits.ToDictionary(a => a.AutomationType.ToString(), a => a.Count)
            },
            payroll = new
            {
                openAlerts = openPayrollAlerts,
                runsWithFailuresLast7Days = recentPayrollRunErrors
            },
            approvedNotExecuted,
            overdue = new
            {
                onboardingTasks = overdueOnboardingTasks,
                clearanceItems = overdueClearanceItems,
                workflowApprovals = overdueApprovals
            }
        });
    }

    /// <summary>
    /// Phase 3 (v14.3): Actionable work queues for HR/admin. Each queue is a concrete
    /// list of items the operator needs to act on — ids, key fields, and sortable timestamps.
    /// Use <paramref name="queue"/> to select the queue; omit it to get all queues at once
    /// (capped). Designed to feed a single unified "work queue" UI page.
    ///
    /// Queues:
    ///   - <c>overdue-approvals</c>: pending workflow step executions past their <c>DueAt</c>.
    ///   - <c>overdue-onboarding-tasks</c>: non-terminal onboarding tasks past their due date.
    ///   - <c>overdue-clearance-items</c>: non-completed clearance items past their due date.
    ///   - <c>unresolved-alerts</c>: operational alerts open for HR action.
    ///   - <c>auto-checkout-review</c>: recent AutoCheckOut transactions for HR spot-check.
    ///   - <c>pip-follow-through</c>: PIPs with <c>CompletedUnsuccessful</c> that the job
    ///     either already followed up on (has a resignation link) or couldn't (resignation
    ///     link still null — something's wrong or the job hasn't run yet).
    /// </summary>
    [HttpGet("queues/{queue}")]
    public async Task<IActionResult> GetQueue(string queue, [FromQuery] int limit = 100, CancellationToken ct = default)
    {
        if (limit < 1 || limit > 500) limit = 100;
        var now = DateTime.UtcNow;

        return queue.ToLowerInvariant() switch
        {
            "overdue-approvals" => Ok(await _db.WorkflowStepExecutions.AsNoTracking()
                .Include(e => e.WorkflowInstance)
                .Where(e => !e.IsDeleted && !e.Action.HasValue && e.DueAt != null && e.DueAt < now)
                .OrderBy(e => e.DueAt).Take(limit)
                .Select(e => new {
                    e.Id,
                    workflowInstanceId = e.WorkflowInstanceId,
                    entityType = e.WorkflowInstance!.EntityType.ToString(),
                    entityId = e.WorkflowInstance.EntityId,
                    stepId = e.StepId,
                    assignedToUserId = e.AssignedToUserId,
                    dueAt = e.DueAt,
                    overdueDays = (int)((now - e.DueAt!.Value).TotalDays)
                })
                .ToListAsync(ct)),

            "overdue-onboarding-tasks" => Ok(await _db.OnboardingTasks.AsNoTracking()
                .Where(t => !t.IsDeleted
                         && t.Status != OnboardingTaskStatus.Completed
                         && t.Status != OnboardingTaskStatus.Skipped
                         && t.DueDate < now.Date)
                .OrderBy(t => t.DueDate).Take(limit)
                .Select(t => new {
                    t.Id, t.OnboardingProcessId,
                    title = t.TaskName,
                    status = t.Status.ToString(),
                    dueDate = t.DueDate,
                    overdueDays = (int)((now.Date - t.DueDate.Date).TotalDays)
                })
                .ToListAsync(ct)),

            "overdue-clearance-items" => Ok(await _db.ClearanceItems.AsNoTracking()
                // ClearanceItem has no structured DueDate — use checklist age as the overdue proxy.
                // Anything not completed more than 14 days after its checklist's creation is
                // considered overdue. This matches the typical 2-week clearance SLA.
                .Where(i => !i.IsDeleted && !i.IsCompleted
                         && i.CreatedAtUtc <= now.AddDays(-14))
                .OrderBy(i => i.CreatedAtUtc).Take(limit)
                .Select(i => new {
                    i.Id, i.ClearanceChecklistId,
                    i.ItemName,
                    i.Description,
                    createdAtUtc = i.CreatedAtUtc,
                    overdueDays = (int)((now - i.CreatedAtUtc).TotalDays) - 14
                })
                .ToListAsync(ct)),

            "unresolved-alerts" => Ok(await _db.OperationalFailureAlerts.AsNoTracking()
                .Where(a => !a.IsDeleted && !a.IsResolved)
                .OrderByDescending(a => a.Severity).ThenByDescending(a => a.FailedAtUtc)
                .Take(limit)
                .Select(a => new {
                    a.Id, a.Category, a.SourceEntityType, a.SourceEntityId, a.EmployeeId,
                    a.FailureCode, a.Reason, a.Severity, a.FailedAtUtc, a.IsRetryable, a.RetryCount
                })
                .ToListAsync(ct)),

            "auto-checkout-review" => Ok(await _db.AttendanceTransactions.AsNoTracking()
                .Where(t => !t.IsDeleted
                         && t.TransactionType == TecAxle.Hrms.Domain.Attendance.TransactionType.AutoCheckOut
                         && t.TransactionTimeUtc >= now.AddDays(-7))
                .OrderByDescending(t => t.TransactionTimeUtc)
                .Take(limit)
                .Select(t => new {
                    t.Id, t.EmployeeId, t.AttendanceDate,
                    t.TransactionTimeUtc, t.TransactionTimeLocal,
                    notes = t.Notes,
                    source = t.DeviceId
                })
                .ToListAsync(ct)),

            "pip-follow-through" => Ok(await _db.PerformanceImprovementPlans.AsNoTracking()
                .Where(p => !p.IsDeleted && p.Status == PipStatus.CompletedUnsuccessful)
                .OrderByDescending(p => p.ModifiedAtUtc ?? p.CreatedAtUtc)
                .Take(limit)
                .Select(p => new {
                    p.Id, p.EmployeeId,
                    p.StartDate, p.EndDate, p.Status,
                    relatedResignationRequestId = p.RelatedResignationRequestId,
                    followThroughProcessedAt = p.FollowThroughProcessedAt,
                    requiresAttention = p.RelatedResignationRequestId == null
                })
                .ToListAsync(ct)),

            _ => BadRequest(new { error = $"Unknown queue '{queue}'. Supported: overdue-approvals, overdue-onboarding-tasks, overdue-clearance-items, unresolved-alerts, auto-checkout-review, pip-follow-through." })
        };
    }

    /// <summary>
    /// Approved-but-not-executed drill-down: list ids per target type so HR can take action.
    /// Capped at <paramref name="limit"/> per type (default 50) to keep the response bounded.
    /// </summary>
    [HttpGet("approved-not-executed")]
    public async Task<IActionResult> GetApprovedNotExecuted(
        [FromQuery] int limit = 50,
        CancellationToken ct = default)
    {
        if (limit < 1 || limit > 500) limit = 50;

        return Ok(new
        {
            allowanceRequests = await _db.AllowanceRequests.AsNoTracking()
                .Where(x => !x.IsDeleted && x.Status == AllowanceRequestStatus.Approved && !x.IsExecuted)
                .OrderByDescending(x => x.ApprovedAt).Take(limit)
                .Select(x => new { x.Id, x.EmployeeId, x.ApprovedAt, x.ExecutionError })
                .ToListAsync(ct),
            loanApplications = await _db.LoanApplications.AsNoTracking()
                .Where(x => !x.IsDeleted && x.Status == LoanApplicationStatus.Approved && !x.IsExecuted)
                .OrderByDescending(x => x.ApprovedAt).Take(limit)
                .Select(x => new { x.Id, x.EmployeeId, x.ApprovedAt, x.ApprovedAmount, x.ExecutionError })
                .ToListAsync(ct),
            salaryAdvances = await _db.SalaryAdvances.AsNoTracking()
                .Where(x => !x.IsDeleted && x.Status == SalaryAdvanceStatus.Approved && !x.IsExecuted)
                .OrderByDescending(x => x.ApprovedAt).Take(limit)
                .Select(x => new { x.Id, x.EmployeeId, x.ApprovedAt, x.Amount, x.ExecutionError })
                .ToListAsync(ct),
            expenseClaims = await _db.ExpenseClaims.AsNoTracking()
                .Where(x => !x.IsDeleted && x.Status == ExpenseClaimStatus.Approved && !x.IsExecuted)
                .OrderByDescending(x => x.ApprovedAt).Take(limit)
                .Select(x => new { x.Id, x.ClaimNumber, x.EmployeeId, x.ApprovedAt, x.TotalAmount, x.ExecutionError })
                .ToListAsync(ct),
            benefitEnrollments = await _db.BenefitEnrollments.AsNoTracking()
                .Where(x => !x.IsDeleted && x.Status == BenefitEnrollmentStatus.Active && !x.IsExecuted)
                .OrderByDescending(x => x.EffectiveDate).Take(limit)
                .Select(x => new { x.Id, x.EmployeeId, x.EffectiveDate, x.EmployeeMonthlyContribution, x.ExecutionError })
                .ToListAsync(ct),
            letterRequests = await _db.LetterRequests.AsNoTracking()
                .Where(x => !x.IsDeleted && x.Status == LetterRequestStatus.Approved && !x.IsExecuted)
                .OrderByDescending(x => x.ApprovedAt).Take(limit)
                .Select(x => new { x.Id, x.EmployeeId, x.LetterType, x.ApprovedAt, x.ExecutionError })
                .ToListAsync(ct)
        });
    }
}
