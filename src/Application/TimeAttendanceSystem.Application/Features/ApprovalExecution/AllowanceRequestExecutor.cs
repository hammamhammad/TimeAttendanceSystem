using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution;

/// <summary>
/// Phase 1 (v14.1): On <see cref="AllowanceRequest"/> approval, creates (or updates) the
/// corresponding <see cref="AllowanceAssignment"/>. Respects:
/// <list type="bullet">
///   <item>Effective-from/to dates (temporary vs permanent).</item>
///   <item>RequestType (NewAllowance/Increase/Decrease/Remove/Temporary) — Remove suspends existing assignment.</item>
///   <item>AllowanceType.DefaultCalculationType if request specifies amount-only.</item>
///   <item>Idempotency: if <c>ResultingAssignmentId</c> is set OR <c>IsExecuted</c> is true, no duplicate.</item>
/// </list>
/// </summary>
public sealed class AllowanceRequestExecutor : IApprovalExecutor
{
    private readonly IApplicationDbContext _db;
    public ApprovalExecutionTargetType TargetType => ApprovalExecutionTargetType.AllowanceRequest;

    public AllowanceRequestExecutor(IApplicationDbContext db) => _db = db;

    public async Task<ExecutionResult> ExecuteAsync(long requestId, long? executingUserId, CancellationToken ct = default)
    {
        var req = await _db.AllowanceRequests
            .FirstOrDefaultAsync(r => r.Id == requestId && !r.IsDeleted, ct);

        if (req == null)
            return ExecutionResult.NotReady("AllowanceRequest not found.");

        if (req.IsExecuted && req.ResultingAssignmentId.HasValue)
            return ExecutionResult.AlreadyExecuted(req.ResultingAssignmentId);

        if (req.Status != AllowanceRequestStatus.Approved)
            return ExecutionResult.NotReady($"Request status is {req.Status}, must be Approved.");

        var allowanceType = await _db.AllowanceTypes
            .FirstOrDefaultAsync(t => t.Id == req.AllowanceTypeId && !t.IsDeleted, ct);
        if (allowanceType == null)
            return ExecutionResult.ValidationFailed("MissingAllowanceType",
                $"AllowanceType {req.AllowanceTypeId} not found.");

        // Handle Remove request: suspend any overlapping active assignment for this employee+type.
        if (req.RequestType == AllowanceRequestType.Remove)
        {
            var toSuspend = await _db.AllowanceAssignments
                .Where(a => a.EmployeeId == req.EmployeeId
                            && a.AllowanceTypeId == req.AllowanceTypeId
                            && a.Status == AllowanceAssignmentStatus.Active
                            && !a.IsDeleted)
                .ToListAsync(ct);
            foreach (var a in toSuspend)
            {
                a.Status = AllowanceAssignmentStatus.Cancelled;
                a.EffectiveToDate ??= req.EffectiveFromDate.Date.AddDays(-1);
                a.ModifiedAtUtc = DateTime.UtcNow;
                a.ModifiedBy = executingUserId?.ToString() ?? "SYSTEM";
            }
            MarkExecuted(req, null, executingUserId);
            await _db.SaveChangesAsync(ct);
            return ExecutionResult.Succeeded(null, $"Removed {toSuspend.Count} active assignment(s).");
        }

        // For Increase/Decrease/NewAllowance/Temporary — close prior active assignments of the same type,
        // then create a new one starting at the request's effective date.
        var prior = await _db.AllowanceAssignments
            .Where(a => a.EmployeeId == req.EmployeeId
                        && a.AllowanceTypeId == req.AllowanceTypeId
                        && a.Status == AllowanceAssignmentStatus.Active
                        && (a.EffectiveToDate == null || a.EffectiveToDate.Value.Date >= req.EffectiveFromDate.Date)
                        && !a.IsDeleted)
            .ToListAsync(ct);

        foreach (var p in prior)
        {
            // Close the overlap: set effective-to the day before the new assignment starts.
            p.EffectiveToDate = req.EffectiveFromDate.Date.AddDays(-1);
            if (p.EffectiveToDate < p.EffectiveFromDate)
                p.Status = AllowanceAssignmentStatus.Cancelled;
            p.ModifiedAtUtc = DateTime.UtcNow;
            p.ModifiedBy = executingUserId?.ToString() ?? "SYSTEM";
        }

        decimal amount = req.RequestedAmount ?? allowanceType.DefaultAmount ?? 0m;
        decimal? percentage = req.RequestedPercentage ?? allowanceType.DefaultPercentage;
        var calcType = percentage.HasValue && percentage.Value > 0
            ? (allowanceType.DefaultCalculationType == CalculationType.Fixed
                ? CalculationType.PercentageOfBasic
                : allowanceType.DefaultCalculationType)
            : CalculationType.Fixed;

        var assignment = new AllowanceAssignment
        {
            EmployeeId = req.EmployeeId,
            AllowanceTypeId = req.AllowanceTypeId,
            Amount = amount,
            CalculationType = calcType,
            Percentage = percentage,
            Currency = "SAR",
            EffectiveFromDate = req.EffectiveFromDate,
            EffectiveToDate = req.EffectiveToDate,
            Status = AllowanceAssignmentStatus.Active,
            AssignedByUserId = executingUserId,
            AssignedAt = DateTime.UtcNow,
            Reason = req.Reason,
            ReasonAr = req.ReasonAr,
            AllowanceRequestId = req.Id,
            Notes = $"Auto-created from AllowanceRequest #{req.Id} ({req.RequestType}).",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = executingUserId?.ToString() ?? "SYSTEM"
        };

        _db.AllowanceAssignments.Add(assignment);
        await _db.SaveChangesAsync(ct);

        MarkExecuted(req, assignment.Id, executingUserId);
        await _db.SaveChangesAsync(ct);

        return ExecutionResult.Succeeded(assignment.Id, $"Assignment #{assignment.Id} created.");
    }

    private static void MarkExecuted(AllowanceRequest req, long? assignmentId, long? executingUserId)
    {
        req.IsExecuted = true;
        req.ExecutedAtUtc = DateTime.UtcNow;
        req.ExecutedByUserId = executingUserId;
        req.ExecutionError = null;
        req.ResultingAssignmentId = assignmentId;
        req.Status = AllowanceRequestStatus.Applied;
        req.ModifiedAtUtc = DateTime.UtcNow;
        req.ModifiedBy = executingUserId?.ToString() ?? "SYSTEM";
    }
}
